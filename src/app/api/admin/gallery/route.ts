import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateGalleryCache } from "@/lib/cache"
import { galleryCreateSchema } from "@/lib/validations"
import { handleApiError } from "@/lib/api-errors"

export async function GET() {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const items = await prisma.galleryItem.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    })
    return NextResponse.json({ success: true, items })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to fetch gallery items")
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const validated = galleryCreateSchema.parse(body)

    const newItem = await prisma.galleryItem.create({
      data: {
        src: validated.src,
        category: validated.category,
        titleEn: validated.titleEn,
        titleJa: validated.titleJa || validated.titleEn,
        dateEn: validated.dateEn,
        dateJa: validated.dateJa,
        altEn: validated.altEn || validated.titleEn,
        altJa: validated.altJa || validated.titleJa || validated.titleEn,
        span: validated.span,
        displayOrder: validated.displayOrder,
      },
    })

    // Revalidate public cache and routes
    await revalidateGalleryCache()

    return NextResponse.json({ success: true, item: newItem })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to create gallery item")
  }
}
