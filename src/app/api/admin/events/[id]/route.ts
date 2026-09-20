import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateEventsCache } from "@/lib/cache"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const { id } = await params
    const body = await request.json()

    const updated = await prisma.event.update({
      where: { id },
      data: {
        slug: body.slug ? body.slug.trim().toLowerCase() : undefined,
        tab: body.tab,
        filter: body.filter,
        isoDate: body.isoDate,
        displayDateEn: body.displayDateEn,
        displayDateJa: body.displayDateJa,
        categoryEn: body.categoryEn,
        categoryJa: body.categoryJa,
        titleEn: body.titleEn,
        titleJa: body.titleJa,
        descriptionEn: body.descriptionEn,
        descriptionJa: body.descriptionJa,
        fullDescriptionEn: body.fullDescriptionEn,
        fullDescriptionJa: body.fullDescriptionJa,
        images: Array.isArray(body.images) ? body.images : undefined,
        locationEn: body.locationEn,
        locationJa: body.locationJa,
        timeEn: body.timeEn,
        timeJa: body.timeJa,
        isUpcoming: typeof body.isUpcoming === "boolean" ? body.isUpcoming : undefined,
        registrationOpen: typeof body.registrationOpen === "boolean" ? body.registrationOpen : undefined,
        isFeatured: typeof body.isFeatured === "boolean" ? body.isFeatured : undefined,
        statusEn: body.statusEn,
        statusJa: body.statusJa,
        posterSrc: body.posterSrc,
        displayOrder: typeof body.displayOrder === "number" ? body.displayOrder : undefined,
      },
    })

    // Revalidate public cache and routes
    await revalidateEventsCache(updated.slug)

    return NextResponse.json({ success: true, event: updated })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update event"
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
    const deleted = await prisma.event.delete({
      where: { id },
    })

    // Revalidate public cache and routes
    await revalidateEventsCache(deleted.slug)

    return NextResponse.json({ success: true, event: deleted })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete event"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
