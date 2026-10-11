import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateGalleryCache } from "@/lib/cache"
import { galleryUpdateSchema } from "@/lib/validations"
import { handleApiError } from "@/lib/api-errors"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const { id } = await params
    const body = await request.json()
    const validated = galleryUpdateSchema.parse(body)

    const updated = await prisma.galleryItem.update({
      where: { id },
      data: {
        src: validated.src,
        category: validated.category,
        titleEn: validated.titleEn,
        titleJa: validated.titleJa,
        dateEn: validated.dateEn,
        dateJa: validated.dateJa,
        altEn: validated.altEn,
        altJa: validated.altJa,
        span: validated.span,
        displayOrder: validated.displayOrder,
      },
    })

    // Revalidate public cache and routes
    await revalidateGalleryCache()

    return NextResponse.json({ success: true, item: updated })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to update gallery item")
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const { id } = await params
    const deleted = await prisma.galleryItem.delete({
      where: { id },
    })

    // Revalidate public cache and routes
    await revalidateGalleryCache()

    return NextResponse.json({ success: true, item: deleted })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to delete gallery item")
  }
}
