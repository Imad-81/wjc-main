import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: [{ isoDate: "desc" }, { displayOrder: "asc" }],
    })
    return NextResponse.json({ success: true, events })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch events"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      slug,
      tab,
      filter,
      isoDate,
      displayDateEn,
      displayDateJa,
      categoryEn,
      categoryJa,
      titleEn,
      titleJa,
      descriptionEn,
      descriptionJa,
      fullDescriptionEn,
      fullDescriptionJa,
      images,
      locationEn,
      locationJa,
      timeEn,
      timeJa,
      isUpcoming,
      registrationOpen,
      statusEn,
      statusJa,
      posterSrc,
      displayOrder,
    } = body

    if (!slug || !titleEn || !isoDate) {
      return NextResponse.json(
        { error: "Slug, English Title, and Date are required" },
        { status: 400 }
      )
    }

    const newEvent = await prisma.event.create({
      data: {
        slug: slug.trim().toLowerCase(),
        tab: tab || "culture",
        filter: filter || "cultural",
        isoDate,
        displayDateEn: displayDateEn || isoDate,
        displayDateJa: displayDateJa || isoDate,
        categoryEn: categoryEn || "Cultural",
        categoryJa: categoryJa || "文化",
        titleEn,
        titleJa: titleJa || titleEn,
        descriptionEn: descriptionEn || "",
        descriptionJa: descriptionJa || descriptionEn || "",
        fullDescriptionEn: fullDescriptionEn || descriptionEn || "",
        fullDescriptionJa: fullDescriptionJa || descriptionJa || descriptionEn || "",
        images: Array.isArray(images) ? images : images ? [images] : [],
        locationEn: locationEn || null,
        locationJa: locationJa || locationEn || null,
        timeEn: timeEn || null,
        timeJa: timeJa || timeEn || null,
        isUpcoming: Boolean(isUpcoming),
        registrationOpen: Boolean(registrationOpen),
        statusEn: statusEn || null,
        statusJa: statusJa || null,
        posterSrc: posterSrc || null,
        displayOrder: Number(displayOrder) || 0,
      },
    })

    // Revalidate public routes
    revalidatePath("/[locale]/events", "page")
    revalidatePath("/events")
    revalidatePath("/ja/events")

    return NextResponse.json({ success: true, event: newEvent })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create event"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
