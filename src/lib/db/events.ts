import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import { pastEvents, type Event, type EventFilter, type EventTab } from "@/data/events"
import { CACHE_TAGS } from "@/lib/cache"

/**
 * Raw DB query for public events list.
 */
async function fetchEventsFromDb(): Promise<Event[]> {
  try {
    const dbEvents = await prisma.event.findMany({
      orderBy: [
        { isFeatured: "desc" },
        { displayOrder: "asc" },
        { isoDate: "desc" },
      ],
    })

    if (dbEvents.length === 0) {
      return pastEvents
    }

    return dbEvents.map((e) => ({
      slug: e.slug,
      isoDate: e.isoDate,
      displayDate: { en: e.displayDateEn, ja: e.displayDateJa },
      category: { en: e.categoryEn, ja: e.categoryJa },
      tab: e.tab as EventTab,
      filter: e.filter as EventFilter,
      title: { en: e.titleEn, ja: e.titleJa },
      description: { en: e.descriptionEn, ja: e.descriptionJa },
      fullDescription: { en: e.fullDescriptionEn, ja: e.fullDescriptionJa },
      images: e.images,
      location: e.locationEn
        ? { en: e.locationEn, ja: e.locationJa || e.locationEn }
        : undefined,
      time: e.timeEn ? { en: e.timeEn, ja: e.timeJa || e.timeEn } : undefined,
      isFeatured: e.isFeatured,
      displayOrder: e.displayOrder,
      isUpcoming: e.isUpcoming,
      registrationOpen: e.registrationOpen,
      status: e.statusEn ? { en: e.statusEn, ja: e.statusJa || e.statusEn } : undefined,
      posterSrc: e.posterSrc || undefined,
    }))
  } catch (err) {
    console.error("Error fetching events from DB, falling back to static data:", err)
    return pastEvents
  }
}

/**
 * Cached public events list (in-memory, TTL: 1 hr, purged on-demand via CACHE_TAGS.EVENTS).
 */
const getCachedEvents = unstable_cache(
  fetchEventsFromDb,
  ["public-events-list"],
  {
    tags: [CACHE_TAGS.EVENTS],
    revalidate: 3600,
  }
)

export async function getEvents(): Promise<Event[]> {
  return getCachedEvents()
}

/**
 * Raw DB query for single event by slug.
 */
async function fetchEventBySlugFromDb(slug: string): Promise<Event | undefined> {
  try {
    const e = await prisma.event.findUnique({
      where: { slug },
    })

    if (e) {
      return {
        slug: e.slug,
        isoDate: e.isoDate,
        displayDate: { en: e.displayDateEn, ja: e.displayDateJa },
        category: { en: e.categoryEn, ja: e.categoryJa },
        tab: e.tab as EventTab,
        filter: e.filter as EventFilter,
        title: { en: e.titleEn, ja: e.titleJa },
        description: { en: e.descriptionEn, ja: e.descriptionJa },
        fullDescription: { en: e.fullDescriptionEn, ja: e.fullDescriptionJa },
        images: e.images,
        location: e.locationEn
          ? { en: e.locationEn, ja: e.locationJa || e.locationEn }
          : undefined,
        time: e.timeEn ? { en: e.timeEn, ja: e.timeJa || e.timeEn } : undefined,
        isFeatured: e.isFeatured,
        displayOrder: e.displayOrder,
        isUpcoming: e.isUpcoming,
        registrationOpen: e.registrationOpen,
        status: e.statusEn ? { en: e.statusEn, ja: e.statusJa || e.statusEn } : undefined,
        posterSrc: e.posterSrc || undefined,
      }
    }
  } catch (err) {
    console.error(`Error fetching event by slug "${slug}", falling back to static data:`, err)
  }

  return pastEvents.find((event) => event.slug === slug)
}

/**
 * Cached event detail by slug (in-memory, TTL: 1 hr, purged on-demand).
 */
export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const getCachedEvent = unstable_cache(
    () => fetchEventBySlugFromDb(slug),
    ["public-event-slug", slug],
    {
      tags: [CACHE_TAGS.EVENTS, `event-${slug}`],
      revalidate: 3600,
    }
  )

  return getCachedEvent()
}
