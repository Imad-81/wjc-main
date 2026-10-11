import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateEventsCache } from "@/lib/cache"
import { eventUpdateSchema } from "@/lib/validations"
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
    const validated = eventUpdateSchema.parse(body)

    const updated = await prisma.event.update({
      where: { id },
      data: {
        slug: validated.slug ? validated.slug.trim().toLowerCase() : undefined,
        tab: validated.tab,
        filter: validated.filter,
        isoDate: validated.isoDate,
        displayDateEn: validated.displayDateEn,
        displayDateJa: validated.displayDateJa,
        categoryEn: validated.categoryEn,
        categoryJa: validated.categoryJa,
        titleEn: validated.titleEn,
        titleJa: validated.titleJa,
        descriptionEn: validated.descriptionEn,
        descriptionJa: validated.descriptionJa,
        fullDescriptionEn: validated.fullDescriptionEn,
        fullDescriptionJa: validated.fullDescriptionJa,
        images: validated.images,
        locationEn: validated.locationEn,
        locationJa: validated.locationJa,
        timeEn: validated.timeEn,
        timeJa: validated.timeJa,
        isUpcoming: validated.isUpcoming,
        registrationOpen: validated.registrationOpen,
        isFeatured: validated.isFeatured,
        statusEn: validated.statusEn,
        statusJa: validated.statusJa,
        posterSrc: validated.posterSrc,
        displayOrder: validated.displayOrder,
      },
    })

    // Revalidate public cache and routes
    await revalidateEventsCache(updated.slug)

    return NextResponse.json({ success: true, event: updated })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to update event")
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
    return handleApiError(error, "Failed to delete event")
  }
}
