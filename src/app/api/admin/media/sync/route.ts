import { NextResponse } from "next/server"
import { readdir, readFile, stat } from "fs/promises"
import path from "path"
import { requireAdminSession } from "@/lib/auth-guard"
import { isR2Configured, r2Client } from "@/lib/r2"
import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"

const R2_BUCKET = process.env.R2_BUCKET_NAME || "wjc-main-website"
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]

function getMimeType(ext: string): string {
  switch (ext.toLowerCase()) {
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

export async function POST() {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    if (!isR2Configured) {
      return NextResponse.json(
        { error: "Cloudflare R2 is not configured in this environment" },
        { status: 400 }
      )
    }

    const imagesDir = path.join(process.cwd(), "public", "images")
    try {
      const s = await stat(imagesDir)
      if (!s.isDirectory()) {
        return NextResponse.json({
          success: true,
          uploaded: 0,
          skipped: 0,
          message: "No public/images directory found",
        })
      }
    } catch {
      return NextResponse.json({
        success: true,
        uploaded: 0,
        skipped: 0,
        message: "No public/images directory found",
      })
    }

    let uploaded = 0
    let skipped = 0
    const errors: string[] = []

    async function scanAndSync(dir: string, baseDir: string) {
      const entries = await readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          await scanAndSync(fullPath, baseDir)
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase()
          if (ALLOWED_EXTENSIONS.includes(ext)) {
            const key = path.relative(baseDir, fullPath).replace(/\\/g, "/")
            try {
              // Check if object already exists in R2
              await r2Client.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }))
              skipped++
            } catch {
              // Not found, upload it
              try {
                const buffer = await readFile(fullPath)
                const contentType = getMimeType(ext)
                await r2Client.send(
                  new PutObjectCommand({
                    Bucket: R2_BUCKET,
                    Key: key,
                    Body: buffer,
                    ContentType: contentType,
                    CacheControl: "public, max-age=31536000, immutable",
                  })
                )
                uploaded++
              } catch (uploadErr) {
                errors.push(`Failed to upload ${key}: ${(uploadErr as Error).message}`)
              }
            }
          }
        }
      }
    }

    await scanAndSync(imagesDir, imagesDir)

    return NextResponse.json({
      success: true,
      uploaded,
      skipped,
      errors: errors.length > 0 ? errors : undefined,
      message: `Sync completed: ${uploaded} files uploaded to R2, ${skipped} already up to date.`,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Sync failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
