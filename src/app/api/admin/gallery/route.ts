import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
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

    revalidatePath("/[locale]/gallery", "page")
    revalidatePath("/gallery")
    revalidatePath("/ja/gallery")

    return NextResponse.json({ success: true, item: newItem })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create gallery item"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
