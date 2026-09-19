import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { requireAdminSession } from "@/lib/auth-guard"

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

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

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
        { error: `Unsupported file extension (${ext || "none"}). Supported formats: JPG, PNG, WebP, AVIF, SVG, GIF.` },
        { status: 400 }
      )
    }

    // Sanitize folder (only allow specific directories in public/images/)
    const validFolders = ["uploads", "events", "gallery", "team", "hero", "hero-banner"]
    const safeFolder = validFolders.includes(folder) ? folder : "uploads"
    const uniqueName = sanitizeFileName(fileName, ext)

    const publicDir = path.join(process.cwd(), "public", "images", safeFolder)
    await mkdir(publicDir, { recursive: true })

    const filePath = path.join(publicDir, uniqueName)
    await writeFile(filePath, fileBuffer)

    const publicUrl = `/images/${safeFolder}/${uniqueName}`
    return NextResponse.json({ success: true, url: publicUrl, filename: uniqueName })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed"
    console.error("Upload route error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
