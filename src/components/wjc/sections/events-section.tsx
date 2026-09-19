"use client"

import Link from "next/link"
import { useReveal } from "../use-reveal"
import { pastEvents, type Event } from "@/data/events"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

/** Month abbreviations, so the date badge reads correctly in both locales. */
const MONTHS_EN = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
]

export default function EventsSection({
  locale,
  dict,
  items,
}: {
  locale: Locale
  dict: Dictionary
  items?: Event[]
}) {
  const sectionRef = useReveal<HTMLElement>(120, 0.1)

  // Take the top prioritized events (e.g. Hero #1 + top cards)
  const sourceEvents = items && items.length > 0 ? items : pastEvents
  const events = sourceEvents.slice(0, 3)

  return (
    <section
      id="events"
      ref={sectionRef}
      className="theme-transition relative"
      style={{ backgroundColor: "var(--theme-dark)", padding: "120px 0" }}
      aria-labelledby="events-heading"
    >
      <div className="hairline-h-dark" aria-hidden="true" />

      <div className="max-w-content mx-auto px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label text-gold"
                style={{ display: "block", marginBottom: "16px" }}
              >
                {dict.home.events.label}
              </span>
            </div>
            <h2
              id="events-heading"
              className="fade-up text-ivory font-serif"
              style={{
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "0.01em",
                opacity: 0,
              }}
            >
              {dict.home.events.title}
              <br />
              {dict.home.events.titleEmphasis}
            </h2>
          </div>

          <div className="fade-up" style={{ opacity: 0 }}>
            <Link
              href={localizePath("/events", locale)}
              className="inline-flex items-center gap-2"
              style={{
                fontSize: "13px",
                color: "var(--theme-gold)",
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
            >
              {dict.common.allEvents} →
            </Link>
          </div>
        </div>

        {/* Event cards */}
        <div
          className="grid grid-cols-1 gap-px md:grid-cols-3"
          style={{ border: "1px solid var(--theme-border-dark)" }}
        >
          {events.map((event, index) => {
            const date = new Date(event.isoDate)
            const month = MONTHS_EN[date.getUTCMonth()]
            const day = String(date.getUTCDate()).padStart(2, "0")
            const year = date.getUTCFullYear()
            // The category field is "FLAGSHIP | CULTURAL" — the first token
            // is enough for the badge.
            const badge = event.category[locale].split("|")[0].trim()

            return (
              <article
                key={event.slug}
                className="fade-up group flex flex-col"
                style={{
                  opacity: 0,
                  transitionDelay: `${index * 0.12}s`,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  padding: "40px 36px",
                  borderRight:
                    index < events.length - 1
                      ? "1px solid var(--theme-border-dark)"
                      : "none",
                  transition:
                    "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                {/* Date badge */}
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        color: "rgba(247,245,240,0.4)",
                        fontWeight: 500,
                        marginBottom: "4px",
                      }}
                    >
                      {month} {year}
                    </p>
                    <p
                      className="font-serif"
                      style={{
                        fontSize: "52px",
                        fontWeight: 300,
                        color: "var(--theme-ivory)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {day}
                    </p>
                  </div>

                  <span
                    className="wjc-tag"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      fontWeight: 500,
                      padding: "5px 10px",
                      border: "1px solid var(--theme-border-dark)",
                      textTransform: "uppercase",
                      alignSelf: "flex-start",
                    }}
                  >
                    {badge}
                  </span>
                </div>

                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--theme-border-dark)",
                    marginBottom: "28px",
                  }}
                  aria-hidden="true"
                />

                <h3
                  className="font-serif"
                  style={{
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "var(--theme-ivory)",
                    lineHeight: 1.3,
                    marginBottom: "14px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {event.title[locale]}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(247,245,240,0.45)",
                    lineHeight: 1.7,
                    marginBottom: "28px",
                    fontWeight: 300,
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {event.description[locale]}
                </p>

                {/*
                  "Register →" became "View Details" deep-linking to the event
                  page, per HOME.pdf §D.
                */}
                <Link
                  href={localizePath(`/events/${event.slug}`, locale)}
                  style={{
                    fontSize: "12px",
                    color: "var(--theme-gold)",
                    letterSpacing: "0.08em",
                    fontWeight: 500,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    alignSelf: "flex-start",
                    transition: "gap 0.3s ease",
                  }}
                  aria-label={`${dict.common.viewDetails} — ${event.title[locale]}`}
                >
                  {dict.common.viewDetails} →
                </Link>
              </article>
            )
          })}
        </div>
      </div>

      <div className="hairline-h-dark" aria-hidden="true" />
    </section>
  )
}
