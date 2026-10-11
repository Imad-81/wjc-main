import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateTeamCache } from "@/lib/cache"
import { teamCreateSchema } from "@/lib/validations"
import { handleApiError } from "@/lib/api-errors"

export async function GET() {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const members = await prisma.teamMember.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    })
    return NextResponse.json({ success: true, members })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to fetch team members")
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const validated = teamCreateSchema.parse(body)

    const memberId = validated.id?.trim()
      ? validated.id.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-")
      : undefined

    const newMember = await prisma.teamMember.create({
      data: {
        ...(memberId ? { id: memberId } : {}),
        name: validated.name.trim(),
        roleEn: validated.roleEn,
        roleJa: validated.roleJa || validated.roleEn,
        subtitleEn: validated.subtitleEn,
        subtitleJa: validated.subtitleJa,
        image: validated.image,
        bioEn: validated.bioEn || null,
        bioJa: validated.bioJa || null,
        category: validated.category,
        scale: validated.scale || null,
        hoverScale: validated.hoverScale || null,
        position: validated.position || null,
        displayOrder: validated.displayOrder,
      },
    })

    // Revalidate public cache and routes
    await revalidateTeamCache()

    return NextResponse.json({ success: true, member: newMember })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to create team member")
  }
}
