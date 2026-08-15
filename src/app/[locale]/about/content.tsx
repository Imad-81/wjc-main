"use client"

import Link from "next/link"
import { useState } from "react"

import AppImage from "@/components/wjc/app-image"
import { useReveal } from "@/components/wjc/use-reveal"
import { coreActivities, collaborations, timeline } from "@/data/about"
import { leadershipPreview } from "@/data/team"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

interface SectionProps {
  locale: Locale
  dict: Dictionary
}

function HeroAbout({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "80vh", paddingTop: "72px" }}
      aria-label={dict.about.metaTitle}
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/images/hero/hero3.webp"
          alt={
            locale === "ja"
              ? "ウォクセン大学キャンパスの風景"
              : "The Woxsen University campus"
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
              "linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.45) 50%, var(--theme-bg) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div
        className="max-w-content relative z-10 mx-auto flex flex-col justify-end px-8"
        style={{ minHeight: "80vh", paddingBottom: "100px" }}
      >
        <div className="fade-up" style={{ opacity: 0 }}>
          <span
            className="section-label"
            style={{
              color: "rgba(247,245,240,0.55)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            {dict.about.heroLabel}
          </span>
        </div>
        <h1
          className="fade-up font-serif"
          style={{
            fontSize: "clamp(48px, 5.5vw, 76px)",
            fontWeight: 300,
            lineHeight: 1.04,
            color: "#F7F5F0",
            letterSpacing: "-0.015em",
            maxWidth: "820px",
            marginBottom: "32px",
            opacity: 0,
          }}
        >
          {dict.about.heroTitle}
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>
            {dict.about.heroTitleEmphasis}
          </em>
        </h1>
        <p
          className="fade-up"
          style={{
            fontSize: "18px",
            color: "rgba(247,245,240,0.6)",
            lineHeight: 1.75,
            maxWidth: "560px",
            fontWeight: 300,
            opacity: 0,
          }}
        >
          {dict.about.heroSubtitle}
        </p>
      </div>
    </section>
  )
}

function AboutStory({ dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="theme-transition"
      style={{ backgroundColor: "#E8E2D7", padding: "140px 0" }}
      aria-labelledby="about-content-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label"
                style={{
                  display: "block",
                  marginBottom: "20px",
                  color: "var(--theme-accent)",
                }}
              >
                {dict.about.story.label}
              </span>
            </div>
            <h2
              id="about-content-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: "28px",
                color: "#232323",
                opacity: 0,
              }}
            >
              {dict.about.story.title}
              <br />
              <em style={{ fontStyle: "italic" }}>
                {dict.about.story.titleEmphasis}
              </em>
            </h2>
            <div
              className="fade-up"
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "var(--theme-accent)",
                marginBottom: "32px",
                opacity: 0,
              }}
              aria-hidden="true"
            />
          </div>

          <div className="lg:col-span-8">
            {[
              dict.about.story.paragraph1,
              dict.about.story.paragraph2,
              dict.about.story.paragraph3,
            ].map((paragraph, i) => (
              <p
                key={i}
                className="fade-up"
                style={{
                  fontSize: i === 0 ? "18px" : "17px",
                  lineHeight: 1.85,
                  marginBottom: i === 2 ? 0 : "28px",
                  fontWeight: 300,
                  color: "#5B5B5B",
                  opacity: 0,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MissionVision({ dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  const panels = [
    { kanji: "使", ...dict.about.mission, id: "mission-heading" },
    { kanji: "視", ...dict.about.vision, id: undefined },
  ]

  return (
    <section
      ref={ref}
      className="theme-transition"
      style={{ backgroundColor: "#232323", padding: "120px 0" }}
      aria-labelledby="mission-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div
          className="grid grid-cols-1 gap-px lg:grid-cols-2"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {panels.map((panel, i) => (
            <div
              key={panel.label}
              className="fade-up"
              style={{
                opacity: 0,
                padding: "72px 64px",
                borderRight:
                  i === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
              }}
            >
              <div
                className="font-serif font-jp"
                style={{
                  fontSize: "80px",
                  fontWeight: 300,
                  color: "var(--theme-border-dark)",
                  lineHeight: 1,
                  marginBottom: "32px",
                }}
                aria-hidden="true"
              >
                {panel.kanji}
              </div>
              <div
                className="section-label"
                style={{ color: "var(--theme-accent)", marginBottom: "20px" }}
              >
                {panel.label}
              </div>
              <h2
                id={panel.id}
                className="font-serif"
                style={{
                  fontSize: "clamp(24px, 2.5vw, 36px)",
                  fontWeight: 300,
                  color: "var(--theme-ivory)",
                  lineHeight: 1.2,
                  marginBottom: "24px",
                }}
              >
                {panel.title}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.85,
                  color: "rgba(247,245,240,0.55)",
                  fontWeight: 300,
                }}
              >
                {panel.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoreActivitiesSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(80, 0.1)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F8F7F4",
        padding: "140px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="activities-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16">
          <div className="fade-up" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "20px",
                color: "var(--theme-accent)",
              }}
            >
              {dict.about.activities.label}
            </span>
          </div>
          <h2
            id="activities-heading"
            className="fade-up font-serif"
            style={{
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#232323",
              opacity: 0,
            }}
          >
            {dict.about.activities.title}
          </h2>
        </div>

        <div
          className="grid grid-cols-1 gap-px md:grid-cols-3"
          style={{ border: "1px solid rgba(35,35,35,0.10)" }}
        >
          {coreActivities.map((activity, i) => {
            const isHovered = hovered === i
            return (
              <div
                key={activity.number}
                className="fade-up"
                style={{
                  opacity: 0,
                  transitionDelay: `${i * 0.08}s`,
                  padding: "48px 40px",
                  borderRight:
                    (i + 1) % 3 !== 0
                      ? "1px solid rgba(35,35,35,0.10)"
                      : "none",
                  borderBottom:
                    i < 3 ? "1px solid rgba(35,35,35,0.10)" : "none",
                  backgroundColor: isHovered ? "#232323" : "transparent",
                  transition:
                    "background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="font-serif font-jp"
                  style={{
                    fontSize: "48px",
                    fontWeight: 300,
                    color: isHovered
                      ? "var(--theme-accent)"
                      : "rgba(166,58,43,0.25)",
                    lineHeight: 1,
                    marginBottom: "24px",
                    transition: "color 0.35s ease",
                  }}
                  aria-hidden="true"
                >
                  {activity.kanji}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--theme-accent)",
                    marginBottom: "12px",
                  }}
                >
                  {activity.number}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: isHovered ? "#F8F7F4" : "#232323",
                    marginBottom: "16px",
                    lineHeight: 1.3,
                    transition: "color 0.35s ease",
                  }}
                >
                  {activity.title[locale]}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: isHovered ? "rgba(248,247,244,0.60)" : "#5B5B5B",
                    fontWeight: 300,
                    transition: "color 0.35s ease",
                  }}
                >
                  {activity.description[locale]}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DirectorMessage({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#232323", padding: "140px 0" }}
      aria-labelledby="director-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div
              className="fade-up image-hover-zoom"
              style={{ opacity: 0, overflow: "hidden", aspectRatio: "3/4" }}
            >
              <AppImage
                src="/images/team/faculty-leadership/dr-brundaban-mishra.jpg"
                alt={
                  locale === "ja"
                    ? "ウォクセン日本センター所長 ブルンダバン・ミシュラ博士"
                    : "Dr. Brundaban Mishra, Director of the Woxsen Japan Centre"
                }
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label"
                style={{
                  color: "var(--theme-accent)",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                {dict.about.director.label}
              </span>
            </div>
            <div
              className="fade-up font-serif"
              style={{
                fontSize: "80px",
                fontWeight: 300,
                color: "rgba(166,58,43,0.12)",
                lineHeight: 1,
                marginBottom: "-20px",
                opacity: 0,
              }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <blockquote
              id="director-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 300,
                lineHeight: 1.5,
                color: "var(--theme-ivory)",
                fontStyle: "italic",
                marginBottom: "32px",
                opacity: 0,
              }}
            >
              {dict.about.director.quote}
            </blockquote>
            <p
              className="fade-up"
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "rgba(247,245,240,0.5)",
                fontWeight: 300,
                marginBottom: "36px",
                opacity: 0,
              }}
            >
              {dict.about.director.body}
            </p>
            <div
              className="fade-up"
              style={{
                opacity: 0,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "28px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--theme-ivory)",
                }}
              >
                {dict.about.director.name}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(247,245,240,0.4)",
                  marginTop: "4px",
                  letterSpacing: "0.04em",
                }}
              >
                {dict.about.director.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LeadershipSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#E8E2D7", padding: "140px 0" }}
      aria-labelledby="leadership-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16">
          <div className="fade-up" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "20px",
                color: "var(--theme-accent)",
              }}
            >
              {dict.about.people.label}
            </span>
          </div>
          <h2
            id="leadership-heading"
            className="fade-up font-serif"
            style={{
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#232323",
              opacity: 0,
            }}
          >
            {dict.about.people.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {leadershipPreview.map((person, i) => {
            const isHovered = hovered === i
            return (
              <div
                key={person.id}
                className="fade-up"
                style={{ opacity: 0, transitionDelay: `${i * 0.1}s` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="image-hover-zoom"
                  style={{ aspectRatio: "3/4", overflow: "hidden" }}
                >
                  <AppImage
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: "center top" }}
                  />
                </div>

                <div
                  style={{
                    backgroundColor: "#232323",
                    padding: "32px 28px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#F8F7F4",
                      marginBottom: "4px",
                    }}
                  >
                    {person.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(248,247,244,0.55)",
                      letterSpacing: "0.04em",
                      marginBottom: isHovered ? "16px" : "0",
                      transition: "margin 0.3s ease",
                    }}
                  >
                    {person.role[locale]} · {person.subtitle[locale]}
                  </div>

                  <div
                    style={{
                      maxHeight: isHovered ? "260px" : "0",
                      opacity: isHovered ? 1 : 0,
                      overflow: "hidden",
                      transition:
                        "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                    }}
                  >
                    {person.bio && (
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.7,
                          color: "rgba(248,247,244,0.65)",
                        }}
                      >
                        {person.bio[locale]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="fade-up" style={{ opacity: 0 }}>
            <Link
              href={localizePath("/team", locale)}
              className="btn-lift inline-flex items-center gap-2"
              style={{
                border: "1px solid rgba(35,35,35,0.25)",
                color: "#232323",
                padding: "14px 40px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                backgroundColor: "transparent",
                textDecoration: "none",
              }}
            >
              {dict.about.people.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CollaborationsSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(80, 0.1)
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="theme-transition"
      style={{ backgroundColor: "#C9AE84", padding: "140px 0" }}
      aria-labelledby="collaborations-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label"
                style={{
                  color: "#232323",
                  opacity: 0.65,
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                {dict.about.people.collaborationsLabel}
              </span>
            </div>
            <h2
              id="collaborations-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#232323",
                opacity: 0,
              }}
            >
              {dict.about.people.collaborationsTitle}
              <br />
              <em style={{ fontStyle: "italic" }}>
                {dict.about.people.collaborationsTitleEmphasis}
              </em>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-12">
            <p
              className="fade-up"
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "rgba(35,35,35,0.65)",
                fontWeight: 300,
                opacity: 0,
              }}
            >
              {dict.about.people.collaborationsBody}
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3"
          style={{ border: "1px solid rgba(35,35,35,0.15)" }}
        >
          {collaborations.map((collab, i) => (
            <div
              key={collab.initial}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${i * 0.07}s`,
                padding: "40px 36px",
                border: "1px solid rgba(35,35,35,0.15)",
                backgroundColor:
                  active === i
                    ? "rgba(248,247,244,0.45)"
                    : "rgba(248,247,244,0.25)",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div
                className="font-serif font-jp"
                style={{
                  fontSize: "40px",
                  fontWeight: 300,
                  color: "var(--theme-accent)",
                  marginBottom: "20px",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {collab.initial}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#232323",
                  marginBottom: "4px",
                }}
              >
                {collab.name[locale]}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--theme-accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {collab.type[locale]} · {collab.country[locale]}
              </div>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "rgba(35,35,35,0.60)",
                  fontWeight: 300,
                }}
              >
                {collab.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(80, 0.1)

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F8F7F4",
        padding: "140px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16">
          <div className="fade-up" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "20px",
                color: "var(--theme-accent)",
              }}
            >
              {dict.about.timeline.label}
            </span>
          </div>
          <h2
            id="timeline-heading"
            className="fade-up font-serif"
            style={{
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#232323",
              opacity: 0,
            }}
          >
            {dict.about.timeline.title}
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* Centre rail (desktop only) */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "rgba(35,35,35,0.12)",
            }}
            aria-hidden="true"
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {timeline.map((item, i) => {
              const left = i % 2 === 0
              const entry = (
                <>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--theme-accent)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      fontFamily: "var(--font-dm-mono)",
                    }}
                  >
                    {item.year[locale]}
                  </div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "22px",
                      fontWeight: 400,
                      color: "#232323",
                      marginBottom: "10px",
                    }}
                  >
                    {item.title[locale]}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "#5B5B5B",
                      fontWeight: 300,
                    }}
                  >
                    {item.description[locale]}
                  </p>
                </>
              )

              return (
                <div
                  key={item.title.en}
                  className="fade-up"
                  style={{
                    opacity: 0,
                    transitionDelay: `${i * 0.08}s`,
                    padding: "40px 0",
                    borderBottom:
                      i < timeline.length - 1
                        ? "1px solid rgba(35,35,35,0.10)"
                        : "none",
                  }}
                >
                  {/* Desktop: alternating zigzag around the centre rail */}
                  <div
                    className="hidden md:grid"
                    style={{
                      gridTemplateColumns: "1fr 48px 1fr",
                      alignItems: "center",
                    }}
                  >
                    {left ? (
                      <>
                        <div style={{ paddingRight: "48px", textAlign: "right" }}>
                          {entry}
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <span className="timeline-node" style={{ borderColor: "#F8F7F4" }} />
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <span className="timeline-node" style={{ borderColor: "#F8F7F4" }} />
                        </div>
                        <div style={{ paddingLeft: "48px" }}>{entry}</div>
                      </>
                    )}
                  </div>

                  {/* Mobile: single column */}
                  <div className="md:hidden">{entry}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutCta({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.2)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "var(--theme-dark)", padding: "140px 0" }}
      aria-labelledby="about-cta-heading"
    >
      <div className="max-w-content mx-auto px-8 text-center">
        <div className="fade-up" style={{ opacity: 0 }}>
          <span
            className="section-label"
            style={{
              color: "var(--theme-accent)",
              display: "block",
              marginBottom: "24px",
            }}
          >
            {dict.about.cta.label}
          </span>
        </div>
        <h2
          id="about-cta-heading"
          className="fade-up font-serif"
          style={{
            fontSize: "clamp(36px, 4.5vw, 64px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--theme-ivory)",
            letterSpacing: "-0.015em",
            marginBottom: "28px",
            opacity: 0,
          }}
        >
          {dict.about.cta.title}
          <br />
          <em style={{ fontStyle: "italic" }}>
            {dict.about.cta.titleEmphasis}
          </em>
        </h2>
        <p
          className="fade-up"
          style={{
            fontSize: "17px",
            lineHeight: 1.75,
            color: "rgba(247,245,240,0.5)",
            maxWidth: "480px",
            margin: "0 auto 48px",
            fontWeight: 300,
            opacity: 0,
          }}
        >
          {dict.about.cta.body}
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
              color: "var(--theme-ivory)",
              padding: "16px 48px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {dict.about.cta.primary}
          </Link>
          <Link
            href={localizePath("/events", locale)}
            className="btn-lift inline-flex items-center gap-2"
            style={{
              border: "1px solid rgba(247,245,240,0.2)",
              color: "var(--theme-ivory)",
              padding: "16px 48px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}
          >
            {dict.about.cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function AboutContent({ locale, dict }: SectionProps) {
  return (
    <>
      <HeroAbout locale={locale} dict={dict} />
      <AboutStory locale={locale} dict={dict} />
      <MissionVision locale={locale} dict={dict} />
      <CoreActivitiesSection locale={locale} dict={dict} />
      <DirectorMessage locale={locale} dict={dict} />
      <LeadershipSection locale={locale} dict={dict} />
      <CollaborationsSection locale={locale} dict={dict} />
      <TimelineSection locale={locale} dict={dict} />
      <AboutCta locale={locale} dict={dict} />
    </>
  )
}
