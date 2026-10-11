import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { pastEvents } from "@/data/events"
import { upcomingEvents } from "@/data/events-extra"
import { galleryImages } from "@/data/gallery"
import { faculty, studentLeadership } from "@/data/team"
import { requireAdminSession } from "@/lib/auth-guard"
import { revalidateAllCache } from "@/lib/cache"

export async function POST() {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    // 1. Seed Flagship / Past Events
    const eventsData = pastEvents.map((e, i) => ({
      slug: e.slug,
      tab: e.tab,
      filter: e.filter,
      isoDate: e.isoDate,
      displayDateEn: e.displayDate.en,
      displayDateJa: e.displayDate.ja,
      categoryEn: e.category.en,
      categoryJa: e.category.ja,
      titleEn: e.title.en,
      titleJa: e.title.ja,
      descriptionEn: e.description.en,
      descriptionJa: e.description.ja,
      fullDescriptionEn: e.fullDescription.en,
      fullDescriptionJa: e.fullDescription.ja,
      images: e.images,
      locationEn: e.location?.en || null,
      locationJa: e.location?.ja || null,
      timeEn: e.time?.en || null,
      timeJa: e.time?.ja || null,
      isUpcoming: false,
      isFeatured: e.slug === "kizuna-matsuri",
      displayOrder: i + 1,
    }))

    // 2. Seed Upcoming Events
    const upcomingData = upcomingEvents.map((ue, i) => ({
      slug: `upcoming-${ue.title.en.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      tab: "next",
      filter: "academic",
      isoDate: "2026-08-24",
      displayDateEn: ue.date.en,
      displayDateJa: ue.date.ja,
      categoryEn: ue.category.en,
      categoryJa: ue.category.ja,
      titleEn: ue.title.en,
      titleJa: ue.title.ja,
      descriptionEn: ue.description.en,
      descriptionJa: ue.description.ja,
      fullDescriptionEn: ue.description.en,
      fullDescriptionJa: ue.description.ja,
      images: ue.poster?.src ? [ue.poster.src] : [],
      isUpcoming: true,
      registrationOpen: ue.registrationOpen,
      statusEn: ue.status?.en || null,
      statusJa: ue.status?.ja || null,
      posterSrc: ue.poster?.src || null,
      displayOrder: 100 + i,
    }))

    await prisma.event.createMany({
      data: [...eventsData, ...upcomingData],
      skipDuplicates: true,
    })

    // 3. Seed Gallery Images
    const galleryData = galleryImages.map((item, i) => ({
      id: item.id,
      src: item.src,
      category: item.category,
      titleEn: item.title.en,
      titleJa: item.title.ja,
      dateEn: item.date.en,
      dateJa: item.date.ja,
      altEn: item.alt.en,
      altJa: item.alt.ja,
      span: item.span,
      displayOrder: i,
    }))

    await prisma.galleryItem.createMany({
      data: galleryData,
      skipDuplicates: true,
    })

    // 4. Seed Faculty
    const facultyData = faculty.map((m, i) => ({
      id: m.id,
      name: m.name,
      roleEn: m.role.en,
      roleJa: m.role.ja,
      subtitleEn: m.subtitle.en,
      subtitleJa: m.subtitle.ja,
      image: m.image,
      bioEn: m.bio?.en || null,
      bioJa: m.bio?.ja || null,
      category: "faculty",
      scale: m.scale || null,
      hoverScale: m.hoverScale || null,
      position: m.position || null,
      displayOrder: i,
    }))

    // 5. Seed Students
    const studentData = studentLeadership.map((m, i) => ({
      id: m.id,
      name: m.name,
      roleEn: m.role.en,
      roleJa: m.role.ja,
      subtitleEn: m.subtitle.en,
      subtitleJa: m.subtitle.ja,
      image: m.image,
      category: "student",
      scale: m.scale || null,
      hoverScale: m.hoverScale || null,
      position: m.position || null,
      displayOrder: 50 + i,
    }))

    await prisma.teamMember.createMany({
      data: [...facultyData, ...studentData],
      skipDuplicates: true,
    })

    const counts = {
      events: await prisma.event.count(),
      gallery: await prisma.galleryItem.count(),
      team: await prisma.teamMember.count(),
    }

    // Revalidate all public in-memory cache and routes
    await revalidateAllCache()

    return NextResponse.json({
      success: true,
      message: `Database sync complete. Total items: ${counts.events} events, ${counts.gallery} gallery photos, and ${counts.team} team members.`,
      counts,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Seeding failed"
    console.error("Seed error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { error: authError } = await requireAdminSession()
    if (authError) return authError

    const eventsCount = await prisma.event.count()
    const galleryCount = await prisma.galleryItem.count()
    const teamCount = await prisma.teamMember.count()
    return NextResponse.json({
      seeded: eventsCount > 0 || galleryCount > 0 || teamCount > 0,
      counts: { events: eventsCount, gallery: galleryCount, team: teamCount },
    })
  } catch (error: unknown) {
    return NextResponse.json({ seeded: false, error: (error as Error).message }, { status: 500 })
  }
}
