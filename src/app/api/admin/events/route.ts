import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateEventsCache } from "@/lib/cache"
import { eventCreateSchema } from "@/lib/validations"
import { handleApiError } from "@/lib/api-errors"

export async function GET() {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const events = await prisma.event.findMany({
      orderBy: [
        { isFeatured: "desc" },
        { displayOrder: "asc" },
        { isoDate: "desc" },
      ],
    })
    return NextResponse.json({ success: true, events })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to fetch events")
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const body = await request.json()
    const validated = eventCreateSchema.parse(body)

    const newEvent = await prisma.event.create({
      data: {
        slug: validated.slug.trim().toLowerCase(),
        tab: validated.tab,
        filter: validated.filter,
        isoDate: validated.isoDate,
        displayDateEn: validated.displayDateEn || validated.isoDate,
        displayDateJa: validated.displayDateJa || validated.isoDate,
        categoryEn: validated.categoryEn,
        categoryJa: validated.categoryJa,
        titleEn: validated.titleEn,
        titleJa: validated.titleJa || validated.titleEn,
        descriptionEn: validated.descriptionEn,
        descriptionJa: validated.descriptionJa || validated.descriptionEn,
        fullDescriptionEn: validated.fullDescriptionEn || validated.descriptionEn,
        fullDescriptionJa: validated.fullDescriptionJa || validated.descriptionJa || validated.descriptionEn,
        images: validated.images,
        locationEn: validated.locationEn || null,
        locationJa: validated.locationJa || validated.locationEn || null,
        timeEn: validated.timeEn || null,
        timeJa: validated.timeJa || validated.timeEn || null,
        isUpcoming: validated.isUpcoming,
        registrationOpen: validated.registrationOpen,
        isFeatured: validated.isFeatured,
        statusEn: validated.statusEn || null,
        statusJa: validated.statusJa || null,
        posterSrc: validated.posterSrc || null,
        displayOrder: validated.displayOrder,
      },
    })

    // Revalidate public cache and routes
    await revalidateEventsCache(newEvent.slug)

    return NextResponse.json({ success: true, event: newEvent })
  } catch (error: unknown) {
    return handleApiError(error, "Failed to create event")
  }
}
