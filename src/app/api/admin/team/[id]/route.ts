import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        roleEn: body.roleEn,
        roleJa: body.roleJa,
        subtitleEn: body.subtitleEn,
        subtitleJa: body.subtitleJa,
        image: body.image,
        bioEn: body.bioEn,
        bioJa: body.bioJa,
        category: body.category,
        scale: body.scale,
        hoverScale: body.hoverScale,
        position: body.position,
        displayOrder: typeof body.displayOrder === "number" ? body.displayOrder : undefined,
      },
    })

    revalidatePath("/[locale]/team", "page")
    revalidatePath("/team")
    revalidatePath("/ja/team")

    return NextResponse.json({ success: true, member: updated })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update team member"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const deleted = await prisma.teamMember.delete({
      where: { id },
    })

    revalidatePath("/[locale]/team", "page")
    revalidatePath("/team")
    revalidatePath("/ja/team")

    return NextResponse.json({ success: true, member: deleted })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete team member"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
