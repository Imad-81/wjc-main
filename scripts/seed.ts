import { PrismaClient } from "@prisma/client"
import { pastEvents } from "../src/data/events"
import { upcomingEvents } from "../src/data/events-extra"
import { galleryImages } from "../src/data/gallery"
import { faculty, studentLeadership } from "../src/data/team"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding Woxsen Japan Centre database from static files...")

  // 1. Events
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
    displayOrder: i,
  }))

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
  console.log(`✓ Seeded ${eventsData.length + upcomingData.length} events`)

  // 2. Gallery
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
  console.log(`✓ Seeded ${galleryData.length} gallery images`)

  // 3. Faculty & Students
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
  console.log(`✓ Seeded ${facultyData.length + studentData.length} team members`)

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
