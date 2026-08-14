import { NextResponse, type NextRequest } from "next/server"
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config"

/**
 * Locale routing with an "as-needed" prefix.
 *
 * English keeps the bare URLs (`/about`) and is rewritten internally to
 * `/en/about`; Japanese is served from its own real, indexable prefix
 * (`/ja/about`). A rewrite rather than a redirect keeps every pre-existing
 * link working without a round trip.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Already locale-prefixed — serve as-is.
  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocalePrefix) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next internals, the API surface, and anything with a file extension.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
