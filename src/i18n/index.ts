import { en } from "./en"
import { ja } from "./ja"
import type { Dictionary } from "./types"
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config"

const DICTIONARIES: Record<Locale, Dictionary> = { en, ja }

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale]
}

/** Narrows an unvalidated route param to a Locale, falling back to English. */
export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export type { Dictionary }
export * from "./config"
