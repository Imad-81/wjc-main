import { NextRequest, NextResponse } from "next/server"
import { getR2ObjectStream, isR2Configured } from "@/lib/r2"

export const dynamic = "force-dynamic"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  if (!isR2Configured) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 })
  }

  try {
    const { key: keyParts } = await params
    const key = keyParts.join("/")

    const object = await getR2ObjectStream(key)

    if (!object.Body) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const headers = new Headers()
    if (object.ContentType) {
      headers.set("Content-Type", object.ContentType)
    }
    if (object.ContentLength) {
      headers.set("Content-Length", object.ContentLength.toString())
    }
    headers.set("Cache-Control", "public, max-age=31536000, immutable")

    // Node.js stream to Web ReadableStream
    const bodyStream = object.Body as unknown as ReadableStream
    return new NextResponse(bodyStream, {
      status: 200,
      headers,
    })
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string }
    if (err.name === "NoSuchKey") {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    console.error("R2 media fetch error:", error)
    return NextResponse.json({ error: "Failed to load media" }, { status: 500 })
  }
}
