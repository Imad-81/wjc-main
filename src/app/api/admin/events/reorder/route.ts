import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateEventsCache } from "@/lib/cache"

export const dynamic = "force-dynamic"

interface ReorderItem {
  id: string
  displayOrder: number
  isFeatured?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const items: ReorderItem[] = body.items

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing or invalid items array" }, { status: 400 })
    }

    const idList = items.map((item) => item.id)

    // Execute ultra-fast single roundtrip SQL batch update
    const orderCases = Prisma.join(
      items.map((i) => Prisma.sql`WHEN id = ${i.id} THEN ${Number(i.displayOrder) || 0}`)
    )

    const hasFeatured = items.some((i) => typeof i.isFeatured === "boolean")
    if (hasFeatured) {
      const featuredCases = Prisma.join(
        items.map((i) => Prisma.sql`WHEN id = ${i.id} THEN ${Boolean(i.isFeatured)}`)
      )
      await prisma.$executeRaw`
        UPDATE events
        SET
          "displayOrder" = CASE ${orderCases} ELSE "displayOrder" END,
          "isFeatured" = CASE ${featuredCases} ELSE "isFeatured" END,
          "updatedAt" = NOW()
        WHERE id IN (${Prisma.join(idList)})
      `
    } else {
      await prisma.$executeRaw`
        UPDATE events
        SET
          "displayOrder" = CASE ${orderCases} ELSE "displayOrder" END,
          "updatedAt" = NOW()
        WHERE id IN (${Prisma.join(idList)})
      `
    }

    // Revalidate public cache and routes immediately
    await revalidateEventsCache()

    return NextResponse.json({ success: true, count: items.length })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reorder events"
    console.error("Event reorder error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
