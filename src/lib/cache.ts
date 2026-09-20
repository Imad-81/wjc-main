import { revalidateTag, revalidatePath } from "next/cache"

/**
 * Canonical Next.js Cache Tags
 */
export const CACHE_TAGS = {
  EVENTS: "events",
  GALLERY: "gallery",
  TEAM: "team",
  DASHBOARD: "dashboard-counts",
} as const

/**
 * Revalidates all event-related in-memory caches and public route renders.
 */
export async function revalidateEventsCache(slug?: string) {
  try {
    revalidateTag(CACHE_TAGS.EVENTS, "max")
    revalidateTag(CACHE_TAGS.DASHBOARD, "max")
    if (slug) {
      revalidateTag(`event-${slug}`, "max")
    }

    revalidatePath("/[locale]/events", "page")
    revalidatePath("/events")
    revalidatePath("/ja/events")
    revalidatePath("/[locale]", "page")
    revalidatePath("/")
    revalidatePath("/ja")

    if (slug) {
      revalidatePath(`/[locale]/events/${slug}`, "page")
      revalidatePath(`/events/${slug}`)
      revalidatePath(`/ja/events/${slug}`)
    }
  } catch (error) {
    console.error("Error revalidating events cache:", error)
  }
}

/**
 * Revalidates all gallery-related in-memory caches and public route renders.
 */
export async function revalidateGalleryCache() {
  try {
    revalidateTag(CACHE_TAGS.GALLERY, "max")
    revalidateTag(CACHE_TAGS.DASHBOARD, "max")

    revalidatePath("/[locale]/gallery", "page")
    revalidatePath("/gallery")
    revalidatePath("/ja/gallery")
    revalidatePath("/en/gallery")
  } catch (error) {
    console.error("Error revalidating gallery cache:", error)
  }
}

/**
 * Revalidates all team-related in-memory caches and public route renders.
 */
export async function revalidateTeamCache() {
  try {
    revalidateTag(CACHE_TAGS.TEAM, "max")
    revalidateTag(CACHE_TAGS.DASHBOARD, "max")

    revalidatePath("/[locale]/team", "page")
    revalidatePath("/team")
    revalidatePath("/ja/team")
    revalidatePath("/en/team")
  } catch (error) {
    console.error("Error revalidating team cache:", error)
  }
}

/**
 * Revalidates admin dashboard metrics cache.
 */
export async function revalidateDashboardCache() {
  try {
    revalidateTag(CACHE_TAGS.DASHBOARD, "max")
    revalidatePath("/admin")
  } catch (error) {
    console.error("Error revalidating dashboard cache:", error)
  }
}

/**
 * Revalidates every content cache tag and route (used for database sync/seed).
 */
export async function revalidateAllCache() {
  await Promise.all([
    revalidateEventsCache(),
    revalidateGalleryCache(),
    revalidateTeamCache(),
    revalidateDashboardCache(),
  ])
}
