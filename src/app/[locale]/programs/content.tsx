"use client"

import Link from "next/link"

import AppImage from "@/components/wjc/app-image"
import { useReveal } from "@/components/wjc/use-reveal"
import { CATEGORY_COLORS, programs } from "@/data/programs"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

interface SectionProps {
  locale: Locale
  dict: Dictionary
}

function HeroPrograms({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "70vh", paddingTop: "72px" }}
      aria-label={dict.programs.metaTitle}
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/images/events/japanese-cultural-immersion/event3.jpg"
          alt={
            locale === "ja"
              ? "ウォクセン日本センターのプログラム風景"
              : "A Woxsen Japan Centre programme session"
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
              "linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.48) 50%, var(--theme-bg) 100%)",
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
            className="section-label text-gold"
            style={{ display: "block", marginBottom: "20px" }}
          >
            {dict.programs.heroLabel}
          </span>
        </div>
        <h1
          className="fade-up text-ivory font-serif"
          style={{
            fontSize: "clamp(48px, 5.5vw, 72px)",
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: "-0.015em",
            maxWidth: "700px",
            marginBottom: "24px",
            opacity: 0,
          }}
        >
          {dict.programs.heroTitle}
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>
            {dict.programs.heroTitleEmphasis}
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
          {dict.programs.heroSubtitle}
        </p>
      </div>
    </section>
  )
}

function ProgramsList({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(80, 0.05)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#F8F7F4", padding: "120px 0 140px" }}
      aria-labelledby="programs-list-heading"
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
              {dict.programs.listLabel}
            </span>
          </div>
          <h2
            id="programs-list-heading"
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
            {dict.programs.listTitle}
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {programs.map((program, i) => {
            const accent = CATEGORY_COLORS[program.category]
            const imageFirst = i % 2 === 0

            return (
              <article
                key={program.id}
                className="fade-up grid grid-cols-1 lg:grid-cols-12"
                style={{
                  opacity: 0,
                  transitionDelay: `${(i % 3) * 0.08}s`,
                  border: "1px solid rgba(35,35,35,0.12)",
                  backgroundColor: "rgba(248,247,244,0.6)",
                  overflow: "hidden",
                }}
              >
                <div
                  className={`image-hover-zoom lg:col-span-5 ${
                    imageFirst ? "" : "lg:order-2"
                  }`}
                  style={{
                    position: "relative",
                    minHeight: "320px",
                    overflow: "hidden",
                  }}
                >
                  <AppImage
                    src={program.image}
                    alt={program.title[locale]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  {program.featured && (
                    <span
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "5px 12px",
                        backgroundColor: accent,
                        color: "#F8F7F4",
                        fontWeight: 600,
                      }}
                    >
                      {dict.programs.featured}
                    </span>
                  )}
                </div>

                <div
                  className={`lg:col-span-7 ${imageFirst ? "" : "lg:order-1"}`}
                  style={{ padding: "48px 44px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: accent,
                        border: `1px solid ${accent}`,
                        padding: "4px 12px",
                        fontWeight: 600,
                      }}
                    >
                      {program.level[locale]}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#5B5B5B",
                      }}
                    >
                      {program.subtitle[locale]}
                    </span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(24px, 2.4vw, 32px)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      marginBottom: "16px",
                      color: "#232323",
                    }}
                  >
                    {program.title[locale]}
                  </h3>

                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.8,
                      fontWeight: 300,
                      color: "#5B5B5B",
                      marginBottom: "28px",
                    }}
                  >
                    {program.description[locale]}
                  </p>

                  {/* Facts row */}
                  <div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-3"
                    style={{
                      paddingTop: "24px",
                      paddingBottom: "24px",
                      borderTop: "1px solid rgba(35,35,35,0.12)",
                      borderBottom: "1px solid rgba(35,35,35,0.12)",
                      marginBottom: "28px",
                    }}
                  >
                    {[
                      { label: dict.programs.duration, value: program.duration[locale] },
                      { label: dict.programs.schedule, value: program.schedule[locale] },
                      {
                        label: dict.programs.eligibility,
                        value: program.eligibility[locale],
                      },
                    ].map((fact) => (
                      <div key={fact.label}>
                        <div
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "rgba(35,35,35,0.45)",
                            marginBottom: "6px",
                          }}
                        >
                          {fact.label}
                        </div>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#232323",
                            lineHeight: 1.6,
                          }}
                        >
                          {fact.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Curriculum + outcomes */}
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {[
                      {
                        label: dict.programs.curriculum,
                        items: program.curriculum[locale],
                      },
                      {
                        label: dict.programs.outcomes,
                        items: program.outcomes[locale],
                      },
                    ].map((col) => (
                      <div key={col.label}>
                        <div
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: accent,
                            marginBottom: "12px",
                          }}
                        >
                          {col.label}
                        </div>
                        {col.items.map((item) => (
                          <div
                            key={item}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              fontSize: "13px",
                              lineHeight: 1.7,
                              color: "#5B5B5B",
                              marginBottom: "5px",
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                width: "3px",
                                height: "3px",
                                borderRadius: "50%",
                                backgroundColor: accent,
                                flexShrink: 0,
                                marginTop: "9px",
                              }}
                            />
                            {item}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={localizePath("/join-us", locale)}
                    className="btn-lift"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "32px",
                      backgroundColor: accent,
                      color: "#F8F7F4",
                      padding: "14px 32px",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    {dict.programs.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function ProgramsContent({ locale, dict }: SectionProps) {
  return (
    <>
      <HeroPrograms locale={locale} dict={dict} />
      <ProgramsList locale={locale} dict={dict} />
    </>
  )
}
