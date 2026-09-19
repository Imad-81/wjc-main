import { NextRequest, NextResponse } from "next/server"
import { readdir, stat } from "fs/promises"
import path from "path"

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"])

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder") || ""

    const basePublicDir = path.join(process.cwd(), "public", "images")
    const foldersToScan = folder ? [folder] : ["events", "gallery", "team", "uploads", "hero-banner"]

    const mediaList: { url: string; name: string; folder: string; size: number; mtime: number }[] = []

    for (const f of foldersToScan) {
      const folderPath = path.join(basePublicDir, f)
      try {
        const files = await readdir(folderPath, { withFileTypes: true })
        for (const file of files) {
          if (file.isFile()) {
            const ext = path.extname(file.name).toLowerCase()
            if (ALLOWED_EXTENSIONS.has(ext)) {
              const filePath = path.join(folderPath, file.name)
              const fileStat = await stat(filePath)
              mediaList.push({
                url: `/images/${f}/${file.name}`,
                name: file.name,
                folder: f,
                size: fileStat.size,
                mtime: fileStat.mtimeMs,
              })
            }
          } else if (file.isDirectory()) {
            // Scan 1 level deep (e.g., faculty-leadership, student-community)
            const subFolderPath = path.join(folderPath, file.name)
            try {
              const subFiles = await readdir(subFolderPath, { withFileTypes: true })
              for (const sf of subFiles) {
                if (sf.isFile()) {
                  const ext = path.extname(sf.name).toLowerCase()
                  if (ALLOWED_EXTENSIONS.has(ext)) {
                    const filePath = path.join(subFolderPath, sf.name)
                    const fileStat = await stat(filePath)
                    mediaList.push({
                      url: `/images/${f}/${file.name}/${sf.name}`,
                      name: `${file.name}/${sf.name}`,
                      folder: `${f}/${file.name}`,
                      size: fileStat.size,
                      mtime: fileStat.mtimeMs,
                    })
                  }
                }
              }
            } catch {
              // skip unreadable directory
            }
          }
        }
      } catch {
        // folder doesn't exist yet, ignore
      }
    }

    // Sort newest first
    mediaList.sort((a, b) => b.mtime - a.mtime)

    return NextResponse.json({ success: true, items: mediaList })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to scan media"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
