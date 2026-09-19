import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".gif"])
const MAX_FILE_SIZE = 12 * 1024 * 1024 // 12MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "uploads"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 12MB limit" }, { status: 400 })
    }

    const ext = path.extname(file.name).toLowerCase()
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `Unsupported file extension (${ext}). Please use JPG, PNG, WebP, AVIF, or SVG.` },
        { status: 400 }
      )
    }

    // Sanitize folder (only allow specific directories in public/images/)
    const validFolders = ["uploads", "events", "gallery", "team", "hero", "hero-banner"]
    const targetFolder = validFolders.includes(folder) ? folder : "uploads"

    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase()
    const uniqueName = `${baseName}_${Date.now()}${ext}`

    const publicDir = path.join(process.cwd(), "public", "images", targetFolder)
    await mkdir(publicDir, { recursive: true })

    const filePath = path.join(publicDir, uniqueName)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    await writeFile(filePath, buffer)

    const publicUrl = `/images/${targetFolder}/${uniqueName}`
    return NextResponse.json({ success: true, url: publicUrl, filename: uniqueName })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed"
    console.error("Upload error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
