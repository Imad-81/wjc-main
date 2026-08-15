import type { L } from "@/i18n/config"

export type GalleryCategory = "festivals" | "cultural" | "academic"

export interface GalleryItem {
  id: string
  src: string
  category: GalleryCategory
  title: L
  date: L
  alt: L
  /** Masonry cell shape, as in the prototype. */
  span: "tall" | "wide" | "square"
}

/**
 * Gallery images.
 *
 * Every photograph is from the Centre's own archive. Categories are assigned
 * from what is actually known about each shoot — the DSC* set is Kizuna
 * Matsuri; the timestamp-named set is general Centre activity — rather than
 * spread across the prototype's full category list, so no filter is empty
 * and no photo is mislabelled.
 */

const KIZUNA = [
  "DSC00027", "DSC00122", "DSC00164", "DSC00181", "DSC00493",
  "DSC00509", "DSC00575", "DSC00582", "DSC09354", "DSC09428",
  "DSC09430", "DSC09444", "DSC09500-1", "DSC09647", "DSC09704",
]

const ACTIVITY = [
  "1770309840004-237969352", "1770309848480-141067322",
  "1770309855813-516985966", "1770309865220-546228310",
  "1770309887871-486464792", "1770309891588-818860072",
  "1770309895224-283965575", "1770309898683-653592496",
  "1770309901847-150513624", "1770309905455-830631177",
  "1770309906756-372615299", "1770309912468-28173631",
  "1770309918135-477737323", "1770309924864-236834199",
  "1770309929727-327170501", "1770309933220-104443486",
  "1770309938202-570815785", "1770309938438-291486830",
  "1770309938680-645573079", "1770309941945-746835150",
]

/** Cycles the three masonry shapes so the columns stay visually balanced. */
const SPANS: GalleryItem["span"][] = ["tall", "square", "wide", "square", "tall", "square"]

export const galleryImages: GalleryItem[] = [
  ...KIZUNA.map((name, i) => ({
    id: `kizuna-${i}`,
    src: `/images/gallery/${name}-compressed.webp`,
    category: "festivals" as const,
    title: { en: "Kizuna Matsuri", ja: "絆祭り" },
    date: { en: "February 2026", ja: "2026年2月" },
    alt: {
      en: `Kizuna Matsuri at the Woxsen Japan Centre — photograph ${i + 1}`,
      ja: `ウォクセン日本センター 絆祭り — 写真 ${i + 1}`,
    },
    span: SPANS[i % SPANS.length],
  })),
  ...ACTIVITY.map((name, i) => ({
    id: `activity-${i}`,
    src: `/images/gallery/${name}.webp`,
    category: "cultural" as const,
    title: { en: "Centre Activities", ja: "センターの活動" },
    date: { en: "Woxsen Japan Centre", ja: "ウォクセン日本センター" },
    alt: {
      en: `Woxsen Japan Centre activities — photograph ${i + 1}`,
      ja: `ウォクセン日本センターの活動 — 写真 ${i + 1}`,
    },
    span: SPANS[(i + 2) % SPANS.length],
  })),
]

/** Only categories that actually have photographs behind them. */
export const galleryCategories: { id: "all" | GalleryCategory; label: L }[] = [
  { id: "all", label: { en: "All", ja: "すべて" } },
  { id: "festivals", label: { en: "Festivals", ja: "祭り" } },
  { id: "cultural", label: { en: "Cultural", ja: "文化" } },
]
