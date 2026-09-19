import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    })
    return NextResponse.json({ success: true, members })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch team members"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, roleEn, roleJa, subtitleEn, subtitleJa, image, bioEn, bioJa, category, scale, hoverScale, position, displayOrder } = body

    if (!name || !roleEn || !image) {
      return NextResponse.json({ error: "Name, English Role, and Portrait Image are required" }, { status: 400 })
    }

    const memberId = id ? id.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-") : name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-")

    const newMember = await prisma.teamMember.create({
      data: {
        id: memberId,
        name,
        roleEn,
        roleJa: roleJa || roleEn,
        subtitleEn: subtitleEn || "Woxsen University",
        subtitleJa: subtitleJa || "ウォクセン大学",
        image,
        bioEn: bioEn || null,
        bioJa: bioJa || null,
        category: category || "faculty",
        scale: scale || null,
        hoverScale: hoverScale || null,
        position: position || null,
        displayOrder: Number(displayOrder) || 0,
      },
    })

    revalidatePath("/[locale]/team", "page")
    revalidatePath("/team")
    revalidatePath("/ja/team")

    return NextResponse.json({ success: true, member: newMember })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create team member"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
