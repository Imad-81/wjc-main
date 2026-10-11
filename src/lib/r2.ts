import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3"

const R2_BUCKET = process.env.R2_BUCKET_NAME || "wjc-main-website"
const R2_ENDPOINT = process.env.R2_ENDPOINT || ""
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || ""
const R2_SECRET_ACCESS_KEY_ID = process.env.R2_SECRET_ACCESS_KEY_ID || ""
const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL || "").replace(/\/+$/, "")

export const isR2Configured = Boolean(
  R2_ENDPOINT && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY_ID && R2_BUCKET
)

const globalForR2 = globalThis as unknown as {
  r2Client: S3Client | undefined
}

export const r2Client =
  globalForR2.r2Client ??
  new S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY_ID,
    },
  })

if (process.env.NODE_ENV !== "production") {
  globalForR2.r2Client = r2Client
}

export function getR2PublicUrl(key: string): string {
  const cleanKey = key.replace(/^\/+/, "")
  if (R2_PUBLIC_URL) {
    return `${R2_PUBLIC_URL}/${cleanKey}`
  }
  // Fallback to internal media proxy route if no public domain is set
  return `/api/media/${cleanKey}`
}

export async function uploadToR2({
  key,
  buffer,
  contentType,
}: {
  key: string
  buffer: Buffer
  contentType: string
}): Promise<{ url: string; key: string }> {
  const cleanKey = key.replace(/^\/+/, "")
  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: cleanKey,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  )

  return {
    key: cleanKey,
    url: getR2PublicUrl(cleanKey),
  }
}

export async function deleteFromR2(key: string): Promise<void> {
  const cleanKey = key.replace(/^\/+/, "")
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET,
      Key: cleanKey,
    })
  )
}

export async function listR2Objects(prefix?: string) {
  const cleanPrefix = prefix ? prefix.replace(/^\/+/, "") : undefined
  const response = await r2Client.send(
    new ListObjectsV2Command({
      Bucket: R2_BUCKET,
      Prefix: cleanPrefix,
    })
  )

  const items = (response.Contents || []).map((item) => {
    const key = item.Key || ""
    const parts = key.split("/")
    const folder = parts.length > 1 ? parts[0] : "uploads"
    const name = parts[parts.length - 1]

    return {
      key,
      url: getR2PublicUrl(key),
      name,
      folder,
      size: item.Size || 0,
      mtime: item.LastModified ? item.LastModified.getTime() : Date.now(),
    }
  })

  // Sort descending by mtime (newest first)
  items.sort((a, b) => b.mtime - a.mtime)
  return items
}

export async function getR2ObjectStream(key: string) {
  const cleanKey = key.replace(/^\/+/, "")
  return r2Client.send(
    new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: cleanKey,
    })
  )
}
