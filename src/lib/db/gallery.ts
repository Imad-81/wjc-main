import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import { galleryImages, type GalleryCategory, type GalleryItem } from "@/data/gallery"
import { CACHE_TAGS } from "@/lib/cache"

/**
 * Raw DB query for public gallery items.
 */
async function fetchGalleryItemsFromDb(): Promise<GalleryItem[]> {
  try {
    const dbItems = await prisma.galleryItem.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    })

    if (dbItems.length === 0) {
      return galleryImages
    }

    return dbItems.map((item) => ({
      id: item.id,
      src: item.src,
      category: item.category as GalleryCategory,
      title: { en: item.titleEn, ja: item.titleJa },
      date: { en: item.dateEn, ja: item.dateJa },
      alt: { en: item.altEn, ja: item.altJa },
      span: item.span as "tall" | "wide" | "square",
    }))
  } catch (err) {
    console.error("Error fetching gallery from DB, falling back to static data:", err)
    return galleryImages
  }
}

/**
 * Cached public gallery items (in-memory, TTL: 1 hr, purged on-demand via CACHE_TAGS.GALLERY).
 */
const getCachedGalleryItems = unstable_cache(
  fetchGalleryItemsFromDb,
  ["public-gallery-list"],
  {
    tags: [CACHE_TAGS.GALLERY],
    revalidate: 3600,
  }
)

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return getCachedGalleryItems()
}
