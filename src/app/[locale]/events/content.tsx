"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

import AppImage from "@/components/wjc/app-image"
import { useReveal } from "@/components/wjc/use-reveal"
import { pastEvents, type Event } from "@/data/events"
import { delegations, eventStats, upcomingEvents } from "@/data/events-extra"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

type ActiveTab = "culture" | "delegations" | "outreach" | "next"

interface SectionProps {
  locale: Locale
  dict: Dictionary
  events?: Event[]
}

function HeroEvents({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "70vh", paddingTop: "72px" }}
      aria-label={dict.events.metaTitle}
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/images/events/kizuna-matsuri/DSC09428-compressed-compressed-compressed.jpg"
          alt={
            locale === "ja"
              ? "絆祭りの様子"
              : "Kizuna Matsuri at the Woxsen Japan Centre"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.68) 0%, rgba(8,8,8,0.45) 50%, var(--theme-bg) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div
        className="max-w-content relative z-10 mx-auto flex flex-col justify-end px-8"
        style={{ minHeight: "70vh", paddingBottom: "90px" }}
      >
        <div className="fade-up" style={{ opacity: 0 }}>
          <span
            className="section-label"
            style={{
              color: "rgba(247,245,240,0.5)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            {dict.events.heroLabel}
          </span>
        </div>
        <h1
          className="fade-up font-serif"
          style={{
            fontSize: "clamp(48px, 5.5vw, 72px)",
            fontWeight: 300,
            lineHeight: 1.04,
            color: "#F7F5F0",
            letterSpacing: "-0.015em",
            maxWidth: "700px",
            marginBottom: "24px",
            opacity: 0,
          }}
        >
          {dict.events.heroTitle}
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>
            {dict.events.heroTitleEmphasis}
          </em>
        </h1>
        <p
          className="fade-up"
          style={{
            fontSize: "17px",
            color: "rgba(247,245,240,0.55)",
            lineHeight: 1.75,
            maxWidth: "500px",
            fontWeight: 300,
            opacity: 0,
          }}
        >
          {dict.events.heroSubtitle}
        </p>
      </div>
    </section>
  )
}

function TabsSection({ locale, dict, events }: SectionProps) {
  const ref = useReveal<HTMLElement>(80, 0.05)
  const [active, setActive] = useState<ActiveTab>("culture")

  const eventList = events && events.length > 0 ? events : pastEvents
  const cultureEvents = useMemo(
    () => eventList.filter((e) => e.tab === "culture"),
    [eventList],
  )
  const outreachEvents = useMemo(
    () => eventList.filter((e) => e.tab === "outreach"),
    [eventList],
  )

  /*
    `useReveal` observes the section once and then unobserves it, so it can
    only ever stamp `.is-visible` on the cards that exist at that moment —
    the default tab's. Every panel opened afterwards mounts fresh, keeps its
    inline `opacity: 0`, and renders blank. Re-stamp on each tab change.

    The first run is skipped deliberately: on mount the observer still owns
    the reveal, and stamping here too would fire the animation before the
    section has been scrolled into view.
  */
  const panelRef = useRef<HTMLDivElement>(null)
  const isFirstRun = useRef(true)

  /*
    Deep link: `/events#next` (used by the home-page honours poster) opens
    that tab. The hash names a tab rather than an element, so nothing scrolls
    on its own — do it here. Reading it in an effect keeps the server and
    first client render identical.
  */
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const tabs: ActiveTab[] = ["culture", "delegations", "outreach", "next"]
    if (!tabs.includes(hash as ActiveTab)) return

    setActive(hash as ActiveTab)
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [ref])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    const el = panelRef.current
    if (!el) return

    const timers = Array.from(el.querySelectorAll(".fade-up")).map((child, i) =>
      setTimeout(() => child.classList.add("is-visible"), i * 80),
    )
    return () => timers.forEach(clearTimeout)
  }, [active])

  const TABS: { id: ActiveTab; label: string; blurb: string }[] = [
    {
      id: "culture",
      label: dict.events.tabs.culture,
      blurb: dict.events.tabs.cultureBlurb,
    },
    {
      id: "delegations",
      label: dict.events.tabs.delegations,
      blurb: dict.events.tabs.delegationsBlurb,
    },
    {
      id: "outreach",
      label: dict.events.tabs.outreach,
      blurb: dict.events.tabs.outreachBlurb,
    },
    {
      id: "next",
      label: dict.events.tabs.next,
      blurb: dict.events.tabs.nextBlurb,
    },
  ]

  const [featured, ...rest] = cultureEvents

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#F8F7F4", padding: "120px 0" }}
      aria-labelledby="events-tabs-heading"
    >
      <div className="max-w-content mx-auto px-8">
        {/* ── Tab bar ── */}
        <div
          className="fade-up mb-6 flex flex-wrap gap-0"
          style={{
            opacity: 0,
            borderBottom: "1px solid rgba(35,35,35,0.12)",
          }}
        >
          {TABS.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                aria-pressed={isActive}
                style={{
                  padding: "14px 28px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  border: "none",
                  borderBottom: isActive
                    ? "2px solid var(--theme-accent)"
                    : "2px solid transparent",
                  color: isActive ? "var(--theme-accent)" : "#5B5B5B",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  marginBottom: "-1px",
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── Tab blurb ── */}
        <div
          className="fade-up mb-16"
          style={{ opacity: 0 }}
        >
          <p
            style={{
              fontSize: "15px",
              color: "#5B5B5B",
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: "560px",
            }}
          >
            {TABS.find((t) => t.id === active)?.blurb}
          </p>
        </div>

        <div ref={panelRef}>
        {/* ── Culture & Festivals tab ── */}
        {active === "culture" && (
          <>
            {featured && (
          <div className="fade-up mb-8" style={{ opacity: 0 }}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <Link
                href={localizePath(`/events/${featured.slug}`, locale)}
                className="image-hover-zoom lg:col-span-7"
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  display: "block",
                }}
              >
                <AppImage
                  src={featured.images?.[0] || "/images/events/kizuna-matsuri/1.webp"}
                  alt={featured.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--theme-accent)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {featured.category[locale]} · {featured.displayDate[locale]}
                  </span>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "28px",
                      fontWeight: 300,
                      color: "#F8F7F4",
                      lineHeight: 1.2,
                    }}
                  >
                    {featured.title[locale]}
                  </h3>
                </div>
              </Link>

              <div
                className="flex flex-col justify-center lg:col-span-5"
                style={{ padding: "0 0 0 24px" }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--theme-accent)",
                    marginBottom: "16px",
                  }}
                >
                  {dict.events.featured}
                </div>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "28px",
                    fontWeight: 300,
                    lineHeight: 1.2,
                    marginBottom: "20px",
                    color: "#232323",
                  }}
                >
                  {featured.title[locale]}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    fontWeight: 300,
                    marginBottom: "24px",
                    color: "#5B5B5B",
                  }}
                >
                  {featured.description[locale]}
                </p>
                {featured.location && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#5B5B5B",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <span aria-hidden="true">📍</span>
                    <span>{featured.location[locale]}</span>
                  </div>
                )}
                <Link
                  href={localizePath(`/events/${featured.slug}`, locale)}
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "var(--theme-accent)",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                  }}
                >
                  {dict.common.viewDetails} →
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((event, i) => (
            <Link
              key={event.slug}
              href={localizePath(`/events/${event.slug}`, locale)}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${i * 0.08}s`,
                border: "1px solid rgba(35,35,35,0.12)",
                overflow: "hidden",
                backgroundColor: "rgba(248,247,244,0.50)",
                textDecoration: "none",
                display: "block",
              }}
            >
              <div
                className="image-hover-zoom"
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <AppImage
                  src={event.images?.[0] || "/images/events/kizuna-matsuri/1.webp"}
                  alt={event.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div style={{ padding: "28px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--theme-accent)",
                    }}
                  >
                    {event.category[locale]}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: "11px", color: "#5B5B5B", flexShrink: 0 }}
                  >
                    {event.displayDate[locale]}
                  </span>
                </div>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    marginBottom: "12px",
                    color: "#232323",
                  }}
                >
                  {event.title[locale]}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    color: "#5B5B5B",
                  }}
                >
                  {event.description[locale]}
                </p>
              </div>
            </Link>
          ))}
          </div>
          </>)}

        {/* ── Delegations & Visits tab ── */}
        {active === "delegations" && (
          <div className="flex flex-col">
            {delegations.map((d, i) => (
              <div
                key={d.org.en}
                className="fade-up grid grid-cols-1 gap-8 lg:grid-cols-12"
                style={{
                  opacity: 0,
                  transitionDelay: `${i * 0.1}s`,
                  padding: "36px 0",
                  borderTop: "1px solid rgba(35,35,35,0.10)",
                  borderBottom:
                    i === delegations.length - 1
                      ? "1px solid rgba(35,35,35,0.10)"
                      : "none",
                }}
              >
                <div className="lg:col-span-3">
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "22px",
                      fontWeight: 400,
                      color: "#232323",
                      marginBottom: "4px",
                    }}
                  >
                    {d.org[locale]}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#5B5B5B",
                      lineHeight: 1.5,
                    }}
                  >
                    {d.fullName[locale]}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "12px",
                      color: "var(--theme-accent)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {d.date[locale]}
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#5B5B5B",
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {d.purpose[locale]}
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#8A8A8A",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      fontStyle: "italic",
                    }}
                  >
                    {d.outcome[locale]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Outreach Initiatives tab ── */}
        {active === "outreach" && (
          outreachEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {outreachEvents.map((event, i) => (
                <Link
                  key={event.slug}
                  href={localizePath(`/events/${event.slug}`, locale)}
                  className="fade-up"
                  style={{
                    opacity: 0,
                    transitionDelay: `${i * 0.08}s`,
                    border: "1px solid rgba(35,35,35,0.12)",
                    overflow: "hidden",
                    backgroundColor: "rgba(248,247,244,0.50)",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  <div
                    className="image-hover-zoom"
                    style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}
                  >
                    <AppImage
                      src={event.images?.[0] || "/images/events/kizuna-matsuri/1.webp"}
                      alt={event.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div style={{ padding: "28px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--theme-accent)", marginBottom: "12px" }}>
                      {event.category[locale]} · {event.displayDate[locale]}
                    </div>
                    <h3 className="font-serif" style={{ fontSize: "20px", fontWeight: 400, lineHeight: 1.3, marginBottom: "12px", color: "#232323" }}>
                      {event.title[locale]}
                    </h3>
                    <p style={{ fontSize: "13px", lineHeight: 1.7, fontWeight: 300, color: "#5B5B5B" }}>
                      {event.description[locale]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "15px", color: "#5B5B5B", fontWeight: 300, fontStyle: "italic" }}>
              {dict.events.noEvents}
            </p>
          )
        )}

        {/* ── What's Next tab ── */}
        {/* No outer frame on the grid: with a single entry a bordered grid
            would leave an empty framed half. Each card carries its own. */}
        {active === "next" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {upcomingEvents.map((event, i) => (
              <div
                key={event.title.en}
                className="fade-up"
                style={{
                  opacity: 0,
                  transitionDelay: `${i * 0.08}s`,
                  padding: "40px 36px",
                  border: "1px solid rgba(35,35,35,0.12)",
                  backgroundColor: "rgba(248,247,244,0.45)",
                }}
              >
                {event.poster && (
                  <div
                    className="image-hover-zoom"
                    style={{
                      display: "inline-block",
                      overflow: "hidden",
                      marginBottom: "24px",
                      border: "1px solid rgba(35,35,35,0.12)",
                    }}
                  >
                    <AppImage
                      src={event.poster.src}
                      alt={event.poster.alt[locale]}
                      width={162}
                      height={216}
                      sizes="162px"
                      style={{ display: "block", width: "162px", height: "auto" }}
                    />
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px" }}>
                  <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--theme-accent)" }}>
                    {event.category[locale]}
                  </span>
                  <span className="font-mono" style={{ fontSize: "11px", color: "#5B5B5B" }}>
                    {event.date[locale]}
                  </span>
                </div>
                <h3 className="font-serif" style={{ fontSize: "22px", fontWeight: 400, lineHeight: 1.3, marginBottom: "12px", color: "#232323" }}>
                  {event.title[locale]}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.75, fontWeight: 300, color: "#5B5B5B", marginBottom: "20px" }}>
                  {event.description[locale]}
                </p>
                {/* A bespoke `status` is always something worth noticing, so
                    it takes the accent treatment like an open registration. */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "5px 14px",
                    border: "1px solid",
                    borderColor:
                      event.status || event.registrationOpen
                        ? "var(--theme-accent)"
                        : "rgba(35,35,35,0.2)",
                    color:
                      event.status || event.registrationOpen
                        ? "var(--theme-accent)"
                        : "#5B5B5B",
                  }}
                >
                  {event.status
                    ? event.status[locale]
                    : event.registrationOpen
                      ? dict.events.upcoming.open
                      : dict.events.upcoming.soon}
                </span>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  )
}

function _REMOVED_DelegationsSection() { return null }
function _REMOVED_UpcomingSection() { return null }

function ImpactNumbers_IMPL({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.2)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#232323", padding: "120px 0" }}
      aria-labelledby="impact-numbers-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16 text-center">
          <div className="fade-up" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                color: "var(--theme-accent)",
                display: "block",
                marginBottom: "20px",
              }}
            >
              {dict.events.impact.label}
            </span>
          </div>
          <h2
            id="impact-numbers-heading"
            className="fade-up font-serif"
            style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 300,
              lineHeight: 1.15,
              color: "var(--theme-ivory)",
              opacity: 0,
            }}
          >
            {dict.events.impact.title}
          </h2>
        </div>

        <div
          className="grid grid-cols-2 gap-px lg:grid-cols-4"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {eventStats.map((stat, i) => (
            <div
              key={stat.label.en}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${i * 0.1}s`,
                padding: "56px 40px",
                textAlign: "center",
                borderRight:
                  i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(48px, 4.5vw, 68px)",
                  fontWeight: 300,
                  color: "var(--theme-ivory)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--theme-ivory)",
                  marginTop: "16px",
                }}
              >
                {stat.label[locale]}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(247,245,240,0.35)",
                  marginTop: "4px",
                  letterSpacing: "0.04em",
                }}
              >
                {stat.sub[locale]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventsCta({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.2)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#E8E2D7", padding: "140px 0" }}
      aria-labelledby="events-cta-heading"
    >
      <div className="max-w-content mx-auto px-8 text-center">
        <div className="fade-up" style={{ opacity: 0 }}>
          <span
            className="section-label"
            style={{
              display: "block",
              marginBottom: "24px",
              color: "var(--theme-accent)",
            }}
          >
            {dict.events.cta.label}
          </span>
        </div>
        <h2
          id="events-cta-heading"
          className="fade-up font-serif"
          style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            marginBottom: "24px",
            color: "#232323",
            opacity: 0,
          }}
        >
          {dict.events.cta.title}
          <br />
          <em style={{ fontStyle: "italic" }}>
            {dict.events.cta.titleEmphasis}
          </em>
        </h2>
        <p
          className="fade-up"
          style={{
            fontSize: "17px",
            lineHeight: 1.75,
            maxWidth: "480px",
            margin: "0 auto 48px",
            fontWeight: 300,
            color: "#5B5B5B",
            opacity: 0,
          }}
        >
          {dict.events.cta.body}
        </p>
        <div
          className="fade-up flex flex-wrap justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <Link
            href={localizePath("/join-us", locale)}
            className="btn-lift inline-flex items-center gap-2"
            style={{
              backgroundColor: "var(--theme-accent)",
              color: "#F8F7F4",
              padding: "16px 48px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {dict.events.cta.primary}
          </Link>
          <Link
            href={localizePath("/gallery", locale)}
            className="btn-lift inline-flex items-center gap-2"
            style={{
              border: "1px solid rgba(35,35,35,0.25)",
              color: "#232323",
              padding: "16px 48px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}
          >
            {dict.events.cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function EventsContent({ locale, dict, events }: SectionProps) {
  return (
    <>
      <HeroEvents locale={locale} dict={dict} />
      <TabsSection locale={locale} dict={dict} events={events} />
      <ImpactNumbers_IMPL locale={locale} dict={dict} />
      <EventsCta locale={locale} dict={dict} />
    </>
  )
}
