import type { Metadata } from "next"
import { localizePath, type Locale } from "./config"

/**
 * Per-page canonical + hreflang alternates.
 *
 * These must be built per page: setting them once on the layout makes every
 * route claim the homepage as its canonical, which tells search engines the
 * whole site is duplicate content.
 *
 * @param path Unlocalized route, e.g. "/about" or "/events/kizuna-matsuri".
 */
export function alternatesFor(path: string, locale: Locale): Metadata["alternates"] {
  return {
    canonical: localizePath(path, locale),
    languages: {
      en: localizePath(path, "en"),
      ja: localizePath(path, "ja"),
      "x-default": localizePath(path, "en"),
    },
  }
}
