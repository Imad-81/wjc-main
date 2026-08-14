"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { localizePath, stripLocale, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"
import LanguageToggle from "./language-toggle"

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/events", key: "events" },
  { href: "/gallery", key: "gallery" },
  { href: "/team", key: "team" },
  { href: "/jlpt", key: "jlpt" },
  { href: "/join-us", key: "joinUs" },
] as const

export default function Navigation({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const pathname = usePathname() || "/"
  const currentPath = stripLocale(pathname)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile panel on navigation.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-colors duration-500",
        scrolled || mobileOpen
          ? "bg-[var(--theme-surface-dark)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label={dict.nav.primary}
        className="max-w-content mx-auto flex h-[72px] items-center justify-between gap-6 px-6 md:px-10"
      >
        {/* Brand */}
        <Link
          href={localizePath("/", locale)}
          className="flex shrink-0 items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full border border-[var(--theme-accent)]"
          >
            <span className="font-jp text-[11px] text-[var(--theme-accent)]">
              和
            </span>
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-semibold tracking-[0.16em] text-[var(--theme-ivory)]">
              WOXSEN
            </span>
            <span className="block text-[9px] tracking-[0.22em] text-[var(--theme-muted-text)]">
              {dict.nav.brandSub}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={localizePath(item.href, locale)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "nav-link-underline block px-3.5 py-2 text-[12px] tracking-[0.06em] transition-colors",
                  isActive(item.href)
                    ? "active text-[var(--theme-ivory)]"
                    : "text-[var(--theme-muted-text)] hover:text-[var(--theme-ivory)]",
                )}
              >
                {dict.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} />

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="wjc-mobile-nav"
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className="text-[var(--theme-ivory)] lg:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          id="wjc-mobile-nav"
          className="shoji-enter border-t border-[var(--theme-border-light)] bg-[var(--theme-surface-dark)] backdrop-blur-xl lg:hidden"
        >
          <ul className="px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizePath(item.href, locale)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block border-b border-[var(--theme-divider)] py-4 text-sm tracking-[0.08em] transition-colors",
                    isActive(item.href)
                      ? "text-[var(--theme-accent)]"
                      : "text-[var(--theme-muted-text)]",
                  )}
                >
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
