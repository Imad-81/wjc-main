"use client"

import { useReveal } from "../use-reveal"
import { partners } from "@/data/partners"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function PartnersSection({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const sectionRef = useReveal<HTMLElement>(120, 0.1)

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="theme-transition"
      style={{ backgroundColor: "#C9AE84", padding: "120px 0" }}
      aria-labelledby="partners-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label"
                style={{
                  display: "block",
                  marginBottom: "16px",
                  color: "#232323",
                  opacity: 0.65,
                }}
              >
                {dict.home.partners.label}
              </span>
            </div>
            <h2
              id="partners-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "0.01em",
                color: "#232323",
                opacity: 0,
              }}
            >
              {dict.home.partners.title}
            </h2>
          </div>

          <p
            className="fade-up"
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              maxWidth: "360px",
              fontWeight: 300,
              color: "rgba(35,35,35,0.70)",
              opacity: 0,
            }}
          >
            {dict.home.partners.subtitle}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: "1px solid rgba(35,35,35,0.15)" }}
        >
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="fade-up group"
              style={{
                opacity: 0,
                transitionDelay: `${index * 0.12}s`,
                padding: "48px 40px",
                borderRight:
                  index < partners.length - 1
                    ? "1px solid rgba(35,35,35,0.15)"
                    : "none",
                transition: "background-color 0.3s ease",
                backgroundColor: "rgba(248,247,244,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(248,247,244,0.65)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(248,247,244,0.35)"
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "28px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(35,35,35,0.10)",
                  borderRadius: "4px",
                  padding: "10px 14px",
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={`${partner.monogram} logo`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <h3
                className="font-serif"
                style={{
                  fontSize: "22px",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  marginBottom: "6px",
                  letterSpacing: "0.01em",
                  color: "#232323",
                }}
              >
                {partner.name[locale]}
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(35,35,35,0.55)",
                  letterSpacing: "0.08em",
                  marginBottom: "20px",
                  fontWeight: 400,
                }}
              >
                {partner.location[locale]}
              </p>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "rgba(35,35,35,0.12)",
                  marginBottom: "20px",
                }}
                aria-hidden="true"
              />

              <p
                style={{
                  fontSize: "13.5px",
                  color: "rgba(35,35,35,0.75)",
                  lineHeight: 1.75,
                  marginBottom: "20px",
                  fontWeight: 300,
                }}
              >
                {partner.description[locale]}
              </p>

              {/* Highlights checklist */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "24px",
                }}
              >
                {partner.highlights[locale].map((point) => (
                  <div
                    key={point}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontSize: "13px",
                      color: "#232323",
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--theme-accent)",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Visit Website link */}
              {partner.url && (
                <div>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--theme-accent)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "gap 0.2s ease",
                    }}
                  >
                    {locale === "ja" ? "ウェブサイトを見る" : "Visit Website"} →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
