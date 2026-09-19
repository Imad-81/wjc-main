import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"

export const dynamic = "force-dynamic"

interface ReorderGalleryItem {
  id: string
  displayOrder: number
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const items: ReorderGalleryItem[] = body.items

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing or invalid items array" }, { status: 400 })
    }

    // Execute atomic transaction to update sequential order
    await prisma.$transaction(
      items.map((item) =>
        prisma.galleryItem.update({
          where: { id: item.id },
          data: {
            displayOrder: Number(item.displayOrder) || 0,
          },
        })
      )
    )

    // Revalidate public routes
    revalidatePath("/[locale]/gallery", "page")
    revalidatePath("/gallery")
    revalidatePath("/ja/gallery")
    revalidatePath("/en/gallery")

    return NextResponse.json({ success: true, count: items.length })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reorder gallery"
    console.error("Gallery reorder error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
