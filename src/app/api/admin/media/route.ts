import { NextRequest, NextResponse } from "next/server"
import { readdir, stat, unlink } from "fs/promises"
import path from "path"
import { requireAdminSession } from "@/lib/auth-guard"
import { prisma } from "@/lib/prisma"
import { listR2Objects, deleteFromR2, isR2Configured } from "@/lib/r2"

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"])

async function checkMediaReferences(url: string): Promise<string[]> {
  const candidates = new Set<string>([url])

  if (url.startsWith("http")) {
    try {
      const parsed = new URL(url)
      candidates.add(parsed.pathname)
      const subPath = parsed.pathname.replace(/^\/+/, "")
      candidates.add(`/${subPath}`)
      candidates.add(`/images/${subPath}`)
    } catch {
      // ignore parse error
    }
  } else if (url.startsWith("/images/")) {
    const rawPath = url.replace(/^\/images\//, "")
    candidates.add(`/${rawPath}`)
    candidates.add(rawPath)
    if (process.env.R2_PUBLIC_URL) {
      candidates.add(`${process.env.R2_PUBLIC_URL.replace(/\/+$/, "")}/${rawPath}`)
    }
  }

  const candidateList = Array.from(candidates)

  const [referencingEvents, referencingPosters, referencingGallery, referencingTeam] = await Promise.all([
    prisma.event.findMany({
      where: {
        images: { hasSome: candidateList },
      },
      select: { titleEn: true, slug: true },
      take: 5,
    }),
    prisma.event.findMany({
      where: {
        posterSrc: { in: candidateList },
      },
      select: { titleEn: true, slug: true },
      take: 5,
    }),
    prisma.galleryItem.findMany({
      where: {
        src: { in: candidateList },
      },
      select: { titleEn: true },
      take: 5,
    }),
    prisma.teamMember.findMany({
      where: {
        image: { in: candidateList },
      },
      select: { name: true },
      take: 5,
    }),
  ])

  const references: string[] = []
  referencingEvents.forEach((e) => references.push(`Event: "${e.titleEn}" (${e.slug})`))
  referencingPosters.forEach((e) => references.push(`Event Poster: "${e.titleEn}" (${e.slug})`))
  referencingGallery.forEach((g) => references.push(`Gallery Item: "${g.titleEn}"`))
  referencingTeam.forEach((t) => references.push(`Team Member: "${t.name}"`))

  return references
}

export async function GET(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const folderFilter = searchParams.get("folder") || ""

    const mediaMap = new Map<string, { url: string; name: string; folder: string; size: number; mtime: number }>()

    // 1. Fetch Cloudflare R2 objects if configured
    if (isR2Configured) {
      try {
        const r2Items = await listR2Objects(folderFilter || undefined)
        for (const item of r2Items) {
          mediaMap.set(item.key, item)
        }
      } catch (r2Err) {
        console.error("Error reading R2 media:", r2Err)
      }
    }

    // 2. Scan local filesystem in public/images/ (legacy assets)
    const basePublicDir = path.join(process.cwd(), "public", "images")
    const foldersToScan = folderFilter ? [folderFilter] : ["events", "gallery", "team", "uploads", "hero-banner"]

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
              const localKey = `${f}/${file.name}`
              if (!mediaMap.has(localKey)) {
                mediaMap.set(localKey, {
                  url: `/images/${f}/${file.name}`,
                  name: file.name,
                  folder: f,
                  size: fileStat.size,
                  mtime: fileStat.mtimeMs,
                })
              }
            }
          } else if (file.isDirectory()) {
            const subFolderPath = path.join(folderPath, file.name)
            try {
              const subFiles = await readdir(subFolderPath, { withFileTypes: true })
              for (const sf of subFiles) {
                if (sf.isFile()) {
                  const ext = path.extname(sf.name).toLowerCase()
                  if (ALLOWED_EXTENSIONS.has(ext)) {
                    const filePath = path.join(subFolderPath, sf.name)
                    const fileStat = await stat(filePath)
                    const localKey = `${f}/${file.name}/${sf.name}`
                    if (!mediaMap.has(localKey)) {
                      mediaMap.set(localKey, {
                        url: `/images/${f}/${file.name}/${sf.name}`,
                        name: `${file.name}/${sf.name}`,
                        folder: `${f}/${file.name}`,
                        size: fileStat.size,
                        mtime: fileStat.mtimeMs,
                      })
                    }
                  }
                }
              }
            } catch {
              // skip unreadable directory
            }
          }
        }
      } catch {
        // directory does not exist, ignore
      }
    }

    const items = Array.from(mediaMap.values())
    items.sort((a, b) => b.mtime - a.mtime)

    return NextResponse.json({ success: true, items })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to scan media"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const url = body.url as string | undefined

    if (!url) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 })
    }

    // 1. Strict Referential Integrity Check
    const activeReferences = await checkMediaReferences(url)
    if (activeReferences.length > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete image: it is currently referenced by ${activeReferences.length} item(s): ${activeReferences.join(", ")}. Please remove image references before deleting.`,
        },
        { status: 409 }
      )
    }

    let deletedFromR2 = false

    // 2. If it is an R2 URL or R2 is configured, attempt R2 deletion
    if (isR2Configured) {
      try {
        let r2Key = ""
        if (url.startsWith("http")) {
          const parsed = new URL(url)
          r2Key = parsed.pathname.replace(/^\/+/, "")
        } else if (url.startsWith("/api/media/")) {
          r2Key = url.replace(/^\/api\/media\//, "")
        } else if (url.startsWith("/images/")) {
          r2Key = url.replace(/^\/images\//, "")
        }

        if (r2Key) {
          await deleteFromR2(r2Key)
          deletedFromR2 = true
        }
      } catch (r2Err) {
        console.warn("R2 deletion skipped or failed:", r2Err)
      }
    }

    // 3. If local file exists, remove it safely
    if (url.startsWith("/images/")) {
      const basePublicDir = path.resolve(process.cwd(), "public", "images")
      const relativeParts = url.replace(/^\/images\//, "").split("/").filter(Boolean)
      const targetFilePath = path.resolve(basePublicDir, ...relativeParts)

      if (targetFilePath.startsWith(basePublicDir)) {
        try {
          await unlink(targetFilePath)
        } catch {
          // File might not exist locally if it was purely on R2
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
      storage: deletedFromR2 ? "r2" : "local",
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete file"
    console.error("Media delete error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
