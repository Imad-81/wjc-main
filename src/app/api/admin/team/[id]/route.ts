import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateTeamCache } from "@/lib/cache"
import { teamUpdateSchema } from "@/lib/validations"
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
    const validated = teamUpdateSchema.parse(body)

    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name: validated.name?.trim(),
        roleEn: validated.roleEn,
        roleJa: validated.roleJa,
        subtitleEn: validated.subtitleEn,
        subtitleJa: validated.subtitleJa,
        image: validated.image,
        bioEn: validated.bioEn,
        bioJa: validated.bioJa,
        category: validated.category,
        scale: validated.scale,
        hoverScale: validated.hoverScale,
        position: validated.position,
        displayOrder: validated.displayOrder,
      },
    })

    // Revalidate public cache and routes
    await revalidateTeamCache()

    return NextResponse.json({ success: true, member: updated })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to update team member")
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
    const deleted = await prisma.teamMember.delete({
      where: { id },
    })

    // Revalidate public cache and routes
    await revalidateTeamCache()

    return NextResponse.json({ success: true, member: deleted })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to delete team member")
  }
}
