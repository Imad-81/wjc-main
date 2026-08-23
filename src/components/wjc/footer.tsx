"use client"

import Image from "next/image"
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

  const quickLinks = [
    { label: locale === "ja" ? "当センターについて" : "About Us", href: L("/about") },
    { label: locale === "ja" ? "イベント" : "Events", href: L("/events") },
    { label: locale === "ja" ? "チーム" : "Team", href: L("/team") },
    { label: locale === "ja" ? "JLPT プログラム" : "JLPT Program", href: L("/jlpt") },
    { label: locale === "ja" ? "参加する" : "Join Us", href: L("/join-us") },
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
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <Image
                  src="/wjc-logo.png"
                  alt="Woxsen Japan Centre logo"
                  width={52}
                  height={52}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
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

          {/* Quick Links */}
          <div className="flex flex-col">
            <p
              className="section-label"
              style={{
                color: "var(--theme-muted-text)",
                opacity: 0.5,
                marginBottom: "18px",
              }}
            >
              {dict.footer.quickLinks}
            </p>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
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
                    (e.currentTarget.style.color = "var(--theme-muted-text)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Our Partners */}
          <div className="flex flex-col">
            <p
              className="section-label"
              style={{
                color: "var(--theme-muted-text)",
                opacity: 0.5,
                marginBottom: "18px",
              }}
            >
              {locale === "ja" ? "パートナー機関" : "Our Partners"}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {[
                {
                  name: "Woxsen University",
                  logo: "/images/logos/woxsen.jpg",
                  href: "https://woxsen.edu.in",
                },
                {
                  name: "Indobox Inc.",
                  logo: "/images/logos/indobox.webp",
                  href: "https://indobox.co.jp",
                },
                {
                  name: "Nara Japan Hub",
                  logo: "/images/logos/nara-japan.png",
                  href: "https://narajapanhub.com/",
                },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "110px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    transition: "transform 0.25s ease, border-color 0.25s ease",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.borderColor = "var(--theme-accent)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
                  }}
                  aria-label={p.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={p.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </a>
              ))}
            </div>
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
