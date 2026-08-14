import type { L } from "@/i18n/config"

export interface GalleryImage {
  src: string
  alt: L
}

/**
 * Gallery images.
 *
 * The Centre asked for the category sub-tabs to be removed, so these are a
 * single flat set with no filtering. The `DSC*` files are Kizuna Matsuri
 * photographs; the timestamp-named files are general Centre activity.
 */

const KIZUNA_FILES = [
  "DSC00027",
  "DSC00122",
  "DSC00164",
  "DSC00181",
  "DSC00493",
  "DSC00509",
  "DSC00575",
  "DSC00582",
  "DSC09354",
  "DSC09428",
  "DSC09430",
  "DSC09444",
  "DSC09500-1",
  "DSC09647",
  "DSC09704",
]

const ACTIVITY_FILES = [
  "1770309840004-237969352",
  "1770309848480-141067322",
  "1770309855813-516985966",
  "1770309865220-546228310",
  "1770309887871-486464792",
  "1770309891588-818860072",
  "1770309895224-283965575",
  "1770309898683-653592496",
  "1770309901847-150513624",
  "1770309905455-830631177",
  "1770309906756-372615299",
  "1770309912468-28173631",
  "1770309918135-477737323",
  "1770309924864-236834199",
  "1770309929727-327170501",
  "1770309933220-104443486",
  "1770309938202-570815785",
  "1770309938438-291486830",
  "1770309938680-645573079",
  "1770309941945-746835150",
]

export const galleryImages: GalleryImage[] = [
  ...KIZUNA_FILES.map((name, i) => ({
    src: `/images/gallery/${name}-compressed.webp`,
    alt: {
      en: `Kizuna Matsuri at the Woxsen Japan Centre — photograph ${i + 1}`,
      ja: `ウォクセン日本センター 絆祭り — 写真 ${i + 1}`,
    },
  })),
  ...ACTIVITY_FILES.map((name, i) => ({
    src: `/images/gallery/${name}.webp`,
    alt: {
      en: `Woxsen Japan Centre activities — photograph ${i + 1}`,
      ja: `ウォクセン日本センターの活動 — 写真 ${i + 1}`,
    },
  })),
]
