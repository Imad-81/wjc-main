import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const { id } = await params
    const body = await request.json()

    const updated = await prisma.galleryItem.update({
      where: { id },
      data: {
        src: body.src,
        category: body.category,
        titleEn: body.titleEn,
        titleJa: body.titleJa,
        dateEn: body.dateEn,
        dateJa: body.dateJa,
        altEn: body.altEn,
        altJa: body.altJa,
        span: body.span,
        displayOrder: typeof body.displayOrder === "number" ? body.displayOrder : undefined,
      },
    })

    revalidatePath("/[locale]/gallery", "page")
    revalidatePath("/gallery")
    revalidatePath("/ja/gallery")

    return NextResponse.json({ success: true, item: updated })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update gallery item"
    return NextResponse.json({ error: message }, { status: 500 })
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

    revalidatePath("/[locale]/gallery", "page")
    revalidatePath("/gallery")
    revalidatePath("/ja/gallery")

    return NextResponse.json({ success: true, item: deleted })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete gallery item"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
