"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type CSSProperties } from "react"

import { localizePath, stripLocale, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"
import { useTheme } from "./theme-provider"

export default function Navigation({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname() || "/"
  const currentPath = stripLocale(pathname)
  const { season } = useTheme()
  const accent = season.accent

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLinks = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.events, href: "/events" },
    { label: dict.nav.gallery, href: "/gallery" },
    { label: dict.nav.team, href: "/team" },
    { label: dict.nav.jlpt, href: "/jlpt" },
    { label: dict.nav.joinUs, href: "/join-us" },
  ]

  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href)

  const otherLocale: Locale = locale === "en" ? "ja" : "en"

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50"
        style={{
          height: "70px",
          backgroundColor: scrolled ? "rgba(35,35,35,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(22px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          transition:
            "background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
        role="banner"
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 40px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo — left */}
          <Link
            href={localizePath("/", locale)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            aria-label={`${dict.footer.tagline} — ${dict.nav.home}`}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: `1.5px solid ${accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "border-color 0.7s ease",
              }}
              aria-hidden="true"
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: `1px solid ${accent}`,
                  opacity: 0.4,
                  transition: "border-color 0.7s ease",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                Woxsen
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                  marginTop: "2px",
                }}
              >
                {dict.nav.brandSub}
              </span>
            </div>
          </Link>

          {/* Desktop nav — centre */}
          <nav
            className="hidden items-center md:flex"
            style={{ gap: 0 }}
            aria-label={dict.nav.primary}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={localizePath(link.href, locale)}
                  className={`nav-link-underline${active ? " active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  style={
                    {
                      fontSize: "12px",
                      fontWeight: active ? 500 : 400,
                      letterSpacing: "0.03em",
                      color: active ? "#FFFFFF" : "rgba(255,255,255,0.60)",
                      textDecoration: "none",
                      padding: "6px 14px",
                      fontFamily: "var(--font-dm-sans)",
                      position: "relative",
                      transition: "color 0.22s ease",
                      "--theme-accent": accent,
                    } as CSSProperties
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFFFFF"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = active
                      ? "#FFFFFF"
                      : "rgba(255,255,255,0.60)"
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right — language switch. Unlike the prototype's inert button,
              this is a real link to the same page in the other locale. */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={localizePath(currentPath, otherLocale)}
              hrefLang={otherLocale}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.65)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                padding: "7px 14px",
                textDecoration: "none",
                fontFamily: "var(--font-dm-sans)",
                transition:
                  "background 0.22s ease, border-color 0.22s ease, color 0.22s ease",
              }}
              aria-label={
                locale === "en" ? "日本語に切り替える" : "Switch to English"
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"
                e.currentTarget.style.borderColor = accent
                e.currentTarget.style.color = "#FFFFFF"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
                e.currentTarget.style.color = "rgba(255,255,255,0.65)"
              }}
            >
              <span
                className={locale === "en" ? "font-jp" : undefined}
                style={{ fontSize: "12px" }}
              >
                {locale === "en" ? "日本語" : "EN"}
              </span>
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            style={{ color: "#FFFFFF" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            <span
              className="block h-px w-6 bg-current"
              style={{
                transition: "transform 0.3s ease",
                transform: mobileOpen
                  ? "translateY(6px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block h-px w-6 bg-current"
              style={{
                transition: "opacity 0.3s ease",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-6 bg-current"
              style={{
                transition: "transform 0.3s ease",
                transform: mobileOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col"
          style={{
            backgroundColor: "rgba(4,3,2,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            paddingTop: "70px",
          }}
          role="dialog"
          aria-label={dict.nav.primary}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "24px",
              top: "80px",
              fontFamily: "var(--font-noto-serif-jp), 'Noto Serif JP', serif",
              fontSize: "120px",
              fontWeight: 300,
              color: accent,
              opacity: 0.04,
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              transition: "color 0.7s ease",
            }}
          >
            和
          </div>

          <nav
            className="flex flex-col gap-1 px-8 py-12"
            aria-label={dict.nav.primary}
          >
            {navLinks.map((link, i) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={localizePath(link.href, locale)}
                  aria-current={active ? "page" : undefined}
                  style={{
                    fontSize: "clamp(28px, 6vw, 40px)",
                    fontFamily:
                      "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontWeight: 300,
                    color: active ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "color 0.22s ease",
                    animationDelay: `${i * 0.05}s`,
                  }}
                  className="shoji-enter"
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: accent,
                        transition: "color 0.7s ease",
                      }}
                    >
                      →
                    </span>
                  )}
                </Link>
              )
            })}

            <Link
              href={localizePath(currentPath, otherLocale)}
              hrefLang={otherLocale}
              className="shoji-enter"
              style={{
                marginTop: "24px",
                fontSize: "14px",
                letterSpacing: "0.1em",
                color: accent,
                textDecoration: "none",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              {locale === "en" ? "日本語" : "English"}
            </Link>
          </nav>

          <div className="mt-auto px-8 pb-12">
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Woxsen Japan Centre · 和敬清寂
            </p>
          </div>
        </div>
      )}
    </>
  )
}
