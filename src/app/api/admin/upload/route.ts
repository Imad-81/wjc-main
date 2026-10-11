import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { requireAdminSession } from "@/lib/auth-guard"
import { uploadToR2, isR2Configured } from "@/lib/r2"
import { checkRateLimit } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"])
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB

function sanitizeFileName(name: string, ext: string): string {
  const base = path
    .basename(name, ext)
    .replace(/[^\w-]/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase() || "upload"
  return `${base}_${Date.now()}${ext}`
}

function getMimeType(ext: string): string {
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".png":
      return "image/png"
    case ".webp":
      return "image/webp"
    case ".avif":
      return "image/avif"
    case ".gif":
      return "image/gif"
    default:
      return "application/octet-stream"
  }
}

function isValidImageBuffer(buffer: Buffer): boolean {
  if (buffer.length < 12) return false
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true
  // GIF: GIF87a or GIF89a
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) return true
  // WEBP: RIFF....WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return true
  }
  // AVIF: ....ftyp (ISO Base Media File Format)
  const headerSlice = buffer.subarray(4, 12).toString("ascii")
  if (headerSlice.includes("ftyp")) return true

  return false
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const clientIp = request.headers.get("x-forwarded-for") || "unknown"
    const limit = checkRateLimit(`upload:${clientIp}`, {
      limit: 60,
      windowMs: 60 * 1000,
    })
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many uploads in a short period. Please wait a minute." },
        { status: 429 }
      )
    }

    const contentType = request.headers.get("content-type") || ""
    let fileBuffer: Buffer
    let fileName: string
    let folder = "uploads"

    if (contentType.includes("application/json")) {
      // JSON Base64 upload
      const body = await request.json()
      const { name, base64, folder: targetFolder } = body

      if (!base64 || !name) {
        return NextResponse.json({ error: "Missing file data or name" }, { status: 400 })
      }

      if (targetFolder) {
        folder = targetFolder
      }

      // Strip data URL prefix if present (e.g. data:image/png;base64,...)
      const commaIdx = base64.indexOf(",")
      const base64Data = commaIdx !== -1 ? base64.slice(commaIdx + 1) : base64
      fileBuffer = Buffer.from(base64Data, "base64")
      fileName = name
    } else {
      // Multipart/form-data upload
      try {
        const formData = await request.formData()
        const file = formData.get("file") as File | null
        const targetFolder = formData.get("folder") as string | null

        if (!file) {
          return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        if (targetFolder) {
          folder = targetFolder
        }

        fileName = file.name
        const arrayBuffer = await file.arrayBuffer()
        fileBuffer = Buffer.from(arrayBuffer)
      } catch (err: unknown) {
        console.error("FormData parse failure:", err)
        return NextResponse.json(
          { error: "Could not parse multipart body. Please try uploading again." },
          { status: 400 }
        )
      }
    }

    if (fileBuffer.length > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 15MB size limit" }, { status: 400 })
    }

    const ext = path.extname(fileName).toLowerCase()
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `Unsupported file extension (${ext || "none"}). Supported formats: JPG, PNG, WebP, AVIF, GIF.` },
        { status: 400 }
      )
    }

    if (!isValidImageBuffer(fileBuffer)) {
      return NextResponse.json(
        { error: "Corrupted or invalid image file. Binary image verification failed." },
        { status: 400 }
      )
    }

    // Sanitize folder
    const validFolders = ["uploads", "events", "gallery", "team", "hero", "hero-banner"]
    const safeFolder = validFolders.includes(folder) ? folder : "uploads"
    const uniqueName = sanitizeFileName(fileName, ext)
    const mimeType = getMimeType(ext)

    // 1. Primary: Upload to Cloudflare R2 if configured
    if (isR2Configured) {
      const r2Key = `${safeFolder}/${uniqueName}`
      const uploadResult = await uploadToR2({
        key: r2Key,
        buffer: fileBuffer,
        contentType: mimeType,
      })

      return NextResponse.json({
        success: true,
        url: uploadResult.url,
        filename: uniqueName,
        storage: "r2",
      })
    }

    // 2. Fallback: Local filesystem (for offline development without R2 credentials)
    const publicDir = path.join(process.cwd(), "public", "images", safeFolder)
    await mkdir(publicDir, { recursive: true })

    const filePath = path.join(publicDir, uniqueName)
    await writeFile(filePath, fileBuffer)

    const publicUrl = `/images/${safeFolder}/${uniqueName}`
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueName,
      storage: "local",
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed"
    console.error("Upload route error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
