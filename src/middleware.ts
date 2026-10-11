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

  // 1. Admin API routes protection
  if (pathname.startsWith("/api/admin")) {
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__Secure-better-auth.session_token")

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized: Administrator session required" },
        { status: 401 }
      )
    }
  }

  // API routes and static files are untouched
  if (pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // 2. Admin routes protection and bypassing locale rewrites
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const isAuthPage = pathname === "/admin/login" || pathname === "/admin/setup"
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__Secure-better-auth.session_token")

    if (!isAuthPage && !sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("returnUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (isAuthPage && sessionCookie && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-pathname", pathname)
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // 3. Already locale-prefixed — serve as-is.
  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocalePrefix) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next internals and anything with a file extension.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
