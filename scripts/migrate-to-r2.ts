import { readdir, readFile, stat } from "fs/promises"
import path from "path"
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"

const R2_BUCKET = process.env.R2_BUCKET_NAME || "wjc-main-website"
const R2_ENDPOINT = process.env.R2_ENDPOINT || ""
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || ""
const R2_SECRET_ACCESS_KEY_ID = process.env.R2_SECRET_ACCESS_KEY_ID || ""

if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY_ID) {
  console.error("Missing Cloudflare R2 credentials in environment!")
  process.exit(1)
}

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY_ID,
  },
})

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

async function uploadFileIfNotExists(localPath: string, key: string) {
  try {
    // Check if already in R2
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }))
    console.log(`[Skipped] ${key} (already exists in R2)`)
    return
  } catch {
    // Not found, proceed to upload
  }

  const buffer = await readFile(localPath)
  const ext = path.extname(localPath)
  const contentType = getMimeType(ext)

  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  )
  console.log(`[Uploaded] ${key} -> R2`)
}

async function scanAndUpload(dir: string, baseDir: string) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await scanAndUpload(fullPath, baseDir)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if ([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"].includes(ext)) {
        const relativeKey = path.relative(baseDir, fullPath).replace(/\\/g, "/")
        await uploadFileIfNotExists(fullPath, relativeKey)
      }
    }
  }
}

async function main() {
  const imagesDir = path.join(process.cwd(), "public", "images")
  console.log(`Starting Cloudflare R2 migration from ${imagesDir}...`)
  try {
    const s = await stat(imagesDir)
    if (!s.isDirectory()) {
      console.log("public/images does not exist. Nothing to migrate.")
      return
    }
  } catch {
    console.log("public/images does not exist. Nothing to migrate.")
    return
  }

  await scanAndUpload(imagesDir, imagesDir)
  console.log("✓ Cloudflare R2 migration completed successfully!")
}

main().catch(console.error)
