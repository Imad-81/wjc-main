import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateGalleryCache } from "@/lib/cache"

export async function GET() {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const items = await prisma.galleryItem.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    })
    return NextResponse.json({ success: true, items })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch gallery"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const { src, category, titleEn, titleJa, dateEn, dateJa, altEn, altJa, span, displayOrder } = body

    if (!src || !titleEn) {
      return NextResponse.json({ error: "Image source and English title are required" }, { status: 400 })
    }

    const newItem = await prisma.galleryItem.create({
      data: {
        src,
        category: category || "festivals",
        titleEn,
        titleJa: titleJa || titleEn,
        dateEn: dateEn || "2026",
        dateJa: dateJa || "2026年",
        altEn: altEn || titleEn,
        altJa: altJa || titleJa || titleEn,
        span: span || "square",
        displayOrder: Number(displayOrder) || 0,
      },
    })

    // Revalidate public cache and routes
    await revalidateGalleryCache()

    return NextResponse.json({ success: true, item: newItem })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create gallery item"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
