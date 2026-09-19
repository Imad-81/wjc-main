import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

interface ReorderItem {
  id: string
  displayOrder: number
  isFeatured?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const items: ReorderItem[] = body.items

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing or invalid items array" }, { status: 400 })
    }

    // Execute batch update in an atomic transaction
    await prisma.$transaction(
      items.map((item) =>
        prisma.event.update({
          where: { id: item.id },
          data: {
            displayOrder: Number(item.displayOrder) || 0,
            ...(typeof item.isFeatured === "boolean" ? { isFeatured: item.isFeatured } : {}),
          },
        })
      )
    )

    // Revalidate public pages immediately so live site updates
    revalidatePath("/[locale]/events", "page")
    revalidatePath("/events")
    revalidatePath("/ja/events")
    revalidatePath("/[locale]", "page")
    revalidatePath("/")
    revalidatePath("/ja")

    return NextResponse.json({ success: true, count: items.length })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reorder events"
    console.error("Event reorder error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
