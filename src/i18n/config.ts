export const LOCALES = ["en", "ja"] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"

/**
 * English lives at the root (`/about`), Japanese under a prefix (`/ja/about`).
 * Middleware rewrites the unprefixed paths to `/en/*` internally, so every
 * existing URL keeps working while Japanese gets its own indexable routes.
 */
export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale)
}

/** Strips the locale prefix from a pathname: `/ja/about` -> `/about`. */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return "/"
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1)
    }
  }
  return pathname
}

/** Builds the public URL for a path in a given locale. */
export function localizePath(pathname: string, locale: Locale): string {
  const bare = stripLocale(pathname)
  if (locale === DEFAULT_LOCALE) return bare
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`
}

/**
 * Localized value helper. Structured data (events, team, FAQs) carries both
 * languages inline rather than living in the flat UI dictionary.
 */
export type L<T = string> = { en: T; ja: T }

export function pick<T>(value: L<T>, locale: Locale): T {
  return value[locale]
}
