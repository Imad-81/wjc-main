"use client"

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
        { label: dict.footer.newsletter, href: `${L("/")}#newsletter` },
        { label: dict.nav.gallery, href: L("/gallery") },
      ],
    },
    {
      heading: dict.footer.connect,
      links: [
        { label: dict.footer.contact, href: `mailto:${dict.common.email}` },
        { label: dict.footer.partnerships, href: L("/about") },
        { label: dict.footer.delegations, href: L("/events") },
        { label: dict.footer.jlptEnroll, href: L("/jlpt") },
      ],
    },
  ]

  return (
    <footer
      className="theme-transition"
      style={{
        backgroundColor: "var(--theme-footer-bg)",
        borderTop: "1px solid var(--theme-border-light)",
      }}
      role="contentinfo"
    >
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--theme-accent), transparent)",
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <div className="max-w-content mx-auto px-8 py-20">
        <div
          className="flex flex-col justify-between gap-16 pb-16 lg:flex-row"
          style={{ borderBottom: "1px solid var(--theme-border-light)" }}
        >
          {/* Brand */}
          <div className="flex max-w-xs flex-col gap-6">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1.5px solid var(--theme-accent)",
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
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      border: "1px solid var(--theme-accent)",
                      opacity: 0.4,
                      transition: "border-color 0.7s ease",
                    }}
                  />
                </div>
                <div>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "22px",
                      color: "var(--theme-ivory)",
                      letterSpacing: "0.04em",
                      lineHeight: 1.1,
                      transition: "color 0.7s ease",
                    }}
                  >
                    WJC
                  </p>
                  <p
                    className="font-jp"
                    style={{
                      fontSize: "9px",
                      color: "var(--theme-muted-text)",
                      letterSpacing: "0.10em",
                      marginTop: "2px",
                      transition: "color 0.7s ease",
                    }}
                  >
                    {dict.footer.brandJp}
                  </p>
                </div>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--theme-muted-text)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                  transition: "color 0.7s ease",
                }}
              >
                {dict.footer.tagline}
                <br />
                {dict.footer.address}
              </p>
            </div>

            <div
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "var(--theme-accent)",
                opacity: 0.5,
                transition: "background-color 0.7s ease",
              }}
              aria-hidden="true"
            />

            <div>
              <a
                href={`mailto:${dict.common.email}`}
                style={{
                  fontSize: "13px",
                  color: "var(--theme-muted-text)",
                  transition: "color 0.3s ease",
                  display: "block",
                  marginBottom: "4px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--theme-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--theme-muted-text)")
                }
              >
                {dict.common.email}
              </a>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--theme-muted-text)",
                  opacity: 0.6,
                  lineHeight: 1.6,
                  transition: "color 0.7s ease",
                }}
              >
                {dict.common.location}
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <p
                  className="section-label"
                  style={{
                    color: "var(--theme-muted-text)",
                    opacity: 0.5,
                    marginBottom: "18px",
                  }}
                >
                  {col.heading}
                </p>
                <div className="flex flex-col gap-3">
                  {col.links.map((l) =>
                    l.href.startsWith("mailto:") ? (
                      <a
                        key={`${col.heading}-${l.label}`}
                        href={l.href}
                        style={{
                          fontSize: "14px",
                          color: "var(--theme-muted-text)",
                          fontWeight: 400,
                          textDecoration: "none",
                          transition: "color 0.25s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--theme-ivory)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "var(--theme-muted-text)")
                        }
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        key={`${col.heading}-${l.label}`}
                        href={l.href}
                        style={{
                          fontSize: "14px",
                          color: "var(--theme-muted-text)",
                          fontWeight: 400,
                          textDecoration: "none",
                          transition: "color 0.25s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--theme-ivory)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "var(--theme-muted-text)")
                        }
                      >
                        {l.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p
            style={{
              fontSize: "12px",
              color: "var(--theme-muted-text)",
              opacity: 0.5,
              transition: "color 0.7s ease",
            }}
          >
            {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: dict.footer.privacy, href: L("/privacy") },
              { label: dict.footer.terms, href: L("/terms") },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  fontSize: "12px",
                  color: "var(--theme-muted-text)",
                  opacity: 0.45,
                  textDecoration: "none",
                  transition: "opacity 0.25s ease, color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1"
                  e.currentTarget.style.color = "var(--theme-ivory)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.45"
                  e.currentTarget.style.color = "var(--theme-muted-text)"
                }}
              >
                {l.label}
              </Link>
            ))}
            <span
              className="font-jp"
              style={{
                fontSize: "11px",
                color: "var(--theme-accent)",
                opacity: 0.6,
                transition: "color 0.7s ease",
              }}
            >
              和敬清寂
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
