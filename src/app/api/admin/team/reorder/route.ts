import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
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

    const idList = items.map((item) => item.id)

    // Execute single roundtrip SQL batch update
    const orderCases = Prisma.join(
      items.map((i) => Prisma.sql`WHEN id = ${i.id} THEN ${Number(i.displayOrder) || 0}`)
    )

    await prisma.$executeRaw`
      UPDATE team_members
      SET
        "displayOrder" = CASE ${orderCases} ELSE "displayOrder" END,
        "updatedAt" = NOW()
      WHERE id IN (${Prisma.join(idList)})
    `

    // Revalidate public cache and routes
    await revalidateTeamCache()

    return NextResponse.json({ success: true, count: items.length })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reorder team"
    console.error("Team reorder error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
