import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateTeamCache } from "@/lib/cache"

export const dynamic = "force-dynamic"

interface ReorderTeamMember {
  id: string
  displayOrder: number
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const items: ReorderTeamMember[] = body.items

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing or invalid items array" }, { status: 400 })
    }

    // Execute atomic transaction to update sequential order
    await prisma.$transaction(
      items.map((item) =>
        prisma.teamMember.update({
          where: { id: item.id },
          data: {
            displayOrder: Number(item.displayOrder) || 0,
          },
        })
      )
    )

    // Revalidate public cache and routes
    await revalidateTeamCache()

    return NextResponse.json({ success: true, count: items.length })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reorder team"
    console.error("Team reorder error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
