"use client"

import { useReveal } from "../use-reveal"
import { testimonials } from "@/data/testimonials"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function TestimonialsSection({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const sectionRef = useReveal<HTMLElement>(120, 0.1)

  return (
    <section
      ref={sectionRef}
      className="theme-transition"
      style={{
        backgroundColor: "#E8E2D7",
        padding: "120px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16">
          <div className="fade-up" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "16px",
                color: "var(--theme-accent)",
              }}
            >
              {dict.home.testimonials.label}
            </span>
          </div>
          <h2
            id="testimonials-heading"
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
            {dict.home.testimonials.title}{" "}
            {dict.home.testimonials.titleEmphasis}
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: "1px solid rgba(35,35,35,0.12)" }}
        >
          {testimonials.map((t, index) => (
            <article
              key={t.id}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${index * 0.12}s`,
                padding: "48px 40px",
                borderRight:
                  index < testimonials.length - 1
                    ? "1px solid rgba(35,35,35,0.12)"
                    : "none",
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: "80px",
                  lineHeight: 0.8,
                  color: "var(--theme-accent)",
                  fontWeight: 400,
                  marginBottom: "16px",
                  opacity: 0.5,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </p>

              <blockquote>
                <p
                  className="font-serif"
                  style={{
                    fontSize: "18px",
                    fontStyle: "italic",
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: "#232323",
                    marginBottom: "32px",
                  }}
                >
                  {t.quote[locale]}
                </p>

                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(35,35,35,0.12)",
                    marginBottom: "24px",
                  }}
                  aria-hidden="true"
                />

                <footer>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#232323",
                      marginBottom: "4px",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#5B5B5B",
                      letterSpacing: "0.06em",
                      fontWeight: 400,
                    }}
                  >
                    {t.affiliation[locale]}
                  </p>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
