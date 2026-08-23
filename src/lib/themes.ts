/**
 * Seasonal themes.
 *
 * Each season maps to a CSS class on <html> that overrides the `--theme-*`
 * custom properties defined in globals.css, plus its own hero image. The
 * default season ("original") uses the bare `:root` token set, so its
 * `className` is intentionally empty.
 *
 * `accent` mirrors the `--theme-accent` value each class sets, for the few
 * places that need the colour in JS (inline styles in the header and theme
 * switcher) rather than through the cascade.
 */

export const SEASONS = [
  {
    id: "original",
    className: "",
    kanji: "絆",
    accent: "#A63A2B",
    swatch: "#1C1C1C",
    label: { en: "Original", ja: "オリジナル" },
    labelJp: "絆",
    hero: "/assets/images/hero_original_v2_wjc.webp",
  },
  {
    id: "natsu",
    className: "theme-natsu",
    kanji: "夏",
    accent: "#E46C2B",
    swatch: "#0A0F1E",
    label: { en: "Natsu Matsuri", ja: "夏祭り" },
    labelJp: "夏祭り",
    hero: "/assets/images/hero_natsu_v2_wjc.webp",
  },
  {
    id: "tanabata",
    className: "theme-tanabata",
    kanji: "七夕",
    accent: "#5A4FCF",
    swatch: "#0D0D2B",
    label: { en: "Tanabata", ja: "七夕" },
    labelJp: "七夕",
    hero: "/assets/images/hero_tanabata_v2_wjc.webp",
  },
  {
    id: "setsubun",
    className: "theme-setsubun",
    kanji: "節分",
    accent: "#A63A2B",
    swatch: "#2A1F14",
    label: { en: "Setsubun", ja: "節分" },
    labelJp: "節分",
    hero: "/assets/images/hero_setsubun_v2_wjc.webp",
  },
  {
    id: "hikari",
    className: "theme-hikari",
    kanji: "光",
    accent: "#D4A94D",
    swatch: "#0A0A0A",
    label: { en: "Hikari Matsuri", ja: "光祭り" },
    labelJp: "光祭り",
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
