import Link from "next/link"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const L = (path: string) => localizePath(path, locale)

  const columns = [
    {
      heading: dict.footer.explore,
      links: [
        { label: dict.nav.about, href: L("/about") },
        { label: dict.nav.events, href: L("/events") },
        { label: dict.nav.gallery, href: L("/gallery") },
        { label: dict.nav.team, href: L("/team") },
      ],
    },
    {
      heading: dict.footer.programs,
      links: [
        { label: "JLPT N5", href: L("/jlpt") },
        { label: "JLPT N4", href: L("/jlpt") },
        { label: dict.footer.culturalExchange, href: L("/events") },
        { label: dict.footer.academic, href: L("/about") },
      ],
    },
    {
      heading: dict.footer.community,
      links: [
        { label: dict.nav.joinUs, href: L("/join-us") },
        { label: dict.footer.newsletter, href: `mailto:${dict.common.email}` },
        { label: dict.nav.gallery, href: L("/gallery") },
      ],
    },
    {
      heading: dict.footer.connect,
      links: [
        { label: dict.footer.contact, href: `mailto:${dict.common.email}` },
        { label: dict.footer.partnerships, href: L("/about") },
        { label: dict.footer.delegations, href: L("/events") },
        { label: dict.footer.jlptEnroll, href: L("/join-us") },
      ],
    },
  ]

  return (
    <footer className="footer-bg relative overflow-hidden">
      {/* Decorative ghost glyphs */}
      <span
        aria-hidden="true"
        className="kanji-ghost pointer-events-none absolute -right-4 top-4 text-[7rem] md:text-[11rem]"
      >
        和敬清寂
      </span>

      <div className="max-w-content relative mx-auto px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full border border-[var(--theme-accent)]"
              >
                <span className="font-jp text-xs text-[var(--theme-accent)]">
                  和
                </span>
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-lg text-[var(--theme-ivory)]">
                  WJC
                </span>
                <span className="font-jp block text-[9px] tracking-[0.16em] text-[var(--theme-muted-text)]">
                  {dict.footer.brandJp}
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--theme-muted-text)]">
              {dict.footer.tagline}
              <br />
              {dict.footer.address}
            </p>

            <div className="mt-8 space-y-1">
              <a
                href={`mailto:${dict.common.email}`}
                className="block text-sm text-[var(--theme-ivory)] transition-colors hover:text-[var(--theme-accent)]"
              >
                {dict.common.email}
              </a>
              <p className="text-xs leading-relaxed text-[var(--theme-muted-text)]">
                {dict.common.location}
              </p>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="section-label">{column.heading}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="text-sm text-[var(--theme-muted-text)] transition-colors hover:text-[var(--theme-ivory)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--theme-muted-text)] transition-colors hover:text-[var(--theme-ivory)]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className="mt-16 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--theme-divider)" }}
        >
          <p className="text-xs text-[var(--theme-muted-text)]">
            {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={L("/privacy")}
              className="text-xs text-[var(--theme-muted-text)] transition-colors hover:text-[var(--theme-ivory)]"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={L("/terms")}
              className="text-xs text-[var(--theme-muted-text)] transition-colors hover:text-[var(--theme-ivory)]"
            >
              {dict.footer.terms}
            </Link>
            <span
              aria-hidden="true"
              className="font-jp text-xs text-[var(--theme-accent)]"
            >
              絆
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
