/**
 * Seasonal themes.
 *
 * Each season maps to a CSS class on <html> that overrides the `--theme-*`
 * custom properties defined in globals.css, plus its own hero image. The
 * default season ("original") uses the bare `:root` token set, so its
 * `className` is intentionally empty.
 */

export const SEASONS = [
  {
    id: "original",
    className: "",
    kanji: "和",
    label: { en: "Original", ja: "オリジナル" },
    hero: "/assets/images/hero_original_v2_wjc.webp",
  },
  {
    id: "natsu",
    className: "theme-natsu",
    kanji: "夏",
    label: { en: "Natsu Matsuri", ja: "夏祭り" },
    hero: "/assets/images/hero_natsu_v2_wjc.webp",
  },
  {
    id: "tanabata",
    className: "theme-tanabata",
    kanji: "七",
    label: { en: "Tanabata", ja: "七夕" },
    hero: "/assets/images/hero_tanabata_v2_wjc.webp",
  },
  {
    id: "setsubun",
    className: "theme-setsubun",
    kanji: "節",
    label: { en: "Setsubun", ja: "節分" },
    hero: "/assets/images/hero_setsubun_v2_wjc.webp",
  },
  {
    id: "hikari",
    className: "theme-hikari",
    kanji: "光",
    label: { en: "Hikari Matsuri", ja: "光祭り" },
    hero: "/assets/images/hero_hikari_v2_wjc.webp",
  },
] as const

export type SeasonId = (typeof SEASONS)[number]["id"]
export type Season = (typeof SEASONS)[number]

export const DEFAULT_SEASON: SeasonId = "original"

export const STORAGE_KEY = "wjc-season"

/** All theme class names, so the provider can clear them before applying one. */
export const SEASON_CLASSNAMES = SEASONS.map((s) => s.className).filter(Boolean)

export function getSeason(id: SeasonId): Season {
  return SEASONS.find((s) => s.id === id) ?? SEASONS[0]
}

export function isSeasonId(value: unknown): value is SeasonId {
  return SEASONS.some((s) => s.id === value)
}
