"use client"

import Link from "next/link"
import { useState } from "react"

import AppImage from "@/components/wjc/app-image"
import { useReveal } from "@/components/wjc/use-reveal"
import { jlptLevels, jlptPathway } from "@/data/jlpt"
import { whyJapanese } from "@/data/jlpt-why"
import { jlptFaqs } from "@/data/faqs"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

interface SectionProps {
  locale: Locale
  dict: Dictionary
}

function HeroJlpt({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "80vh", paddingTop: "72px" }}
      aria-label={dict.jlpt.metaTitle}
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/images/events/language-course/event6.jpg"
          alt={
            locale === "ja"
              ? "ウォクセン日本センターの日本語クラス"
              : "A Japanese language class at the Woxsen Japan Centre"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.5) 50%, var(--theme-bg) 100%)",
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
              color: "rgba(247,245,240,0.5)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            {dict.jlpt.heroLabel}
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
            marginBottom: "28px",
            opacity: 0,
          }}
        >
          {dict.jlpt.heroTitle}
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>
            {dict.jlpt.heroTitleEmphasis}
          </em>
        </h1>
        <p
          className="fade-up"
          style={{
            fontSize: "18px",
            color: "rgba(247,245,240,0.55)",
            lineHeight: 1.75,
            maxWidth: "520px",
            fontWeight: 300,
            marginBottom: "48px",
            opacity: 0,
          }}
        >
          {dict.jlpt.heroSubtitle}
        </p>
        <div className="fade-up flex flex-wrap gap-4" style={{ opacity: 0 }}>
          <a
            href="#courses"
            className="btn-lift inline-flex items-center gap-2"
            style={{
              backgroundColor: "var(--theme-accent)",
              color: "var(--theme-ivory)",
              padding: "15px 40px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {dict.jlpt.heroCtaPrimary}
          </a>
          <Link
            href={localizePath("/join-us", locale)}
            className="btn-lift inline-flex items-center gap-2"
            style={{
              border: "1px solid rgba(247,245,240,0.25)",
              color: "var(--theme-ivory)",
              padding: "15px 40px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}
          >
            {dict.jlpt.heroCtaSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhySection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#E8E2D7", padding: "140px 0" }}
      aria-labelledby="why-japanese-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label"
                style={{
                  display: "block",
                  marginBottom: "20px",
                  color: "var(--theme-accent)",
                }}
              >
                {dict.jlpt.why.label}
              </span>
            </div>
            <h2
              id="why-japanese-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#232323",
                opacity: 0,
              }}
            >
              {dict.jlpt.why.title}
              <br />
              <em style={{ fontStyle: "italic" }}>
                {dict.jlpt.why.titleEmphasis}
              </em>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-8">
            <p
              className="fade-up"
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "#5B5B5B",
                fontWeight: 300,
                opacity: 0,
              }}
            >
              {dict.jlpt.why.subtitle}
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-px md:grid-cols-2"
          style={{ border: "1px solid rgba(35,35,35,0.10)" }}
        >
          {whyJapanese.map((item, i) => (
            <div
              key={item.kanji}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${i * 0.1}s`,
                padding: "48px 44px",
                border: "1px solid rgba(35,35,35,0.10)",
                backgroundColor: "rgba(248,247,244,0.45)",
              }}
            >
              <div
                className="font-serif font-jp"
                style={{
                  fontSize: "48px",
                  fontWeight: 300,
                  color: "rgba(166,58,43,0.25)",
                  lineHeight: 1,
                  marginBottom: "24px",
                }}
                aria-hidden="true"
              >
                {item.kanji}
              </div>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#232323",
                  marginBottom: "12px",
                  lineHeight: 1.35,
                }}
              >
                {item.title[locale]}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.8,
                  color: "#5B5B5B",
                  fontWeight: 300,
                }}
              >
                {item.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoursesSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(120, 0.1)
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      id="courses"
      style={{
        backgroundColor: "#232323",
        padding: "140px 0",
        scrollMarginTop: "72px",
      }}
      aria-labelledby="courses-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16">
          <div className="fade-up" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                color: "var(--theme-accent)",
                display: "block",
                marginBottom: "20px",
              }}
            >
              {dict.jlpt.levels.label}
            </span>
          </div>
          <h2
            id="courses-heading"
            className="fade-up font-serif"
            style={{
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "var(--theme-ivory)",
              letterSpacing: "-0.01em",
              opacity: 0,
            }}
          >
            {dict.jlpt.levels.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {jlptLevels.map((course, i) => {
            const isOpen = selected === i
            return (
              <div
                key={course.id}
                className="fade-up"
                style={{
                  opacity: 0,
                  transitionDelay: `${i * 0.12}s`,
                  padding: "48px 40px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderTop: `3px solid ${course.accent}`,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: isOpen
                    ? "rgba(255,255,255,0.03)"
                    : "transparent",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => setSelected(isOpen ? null : i)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setSelected(isOpen ? null : i)
                  }
                }}
              >
                <div
                  className="font-serif font-jp"
                  style={{
                    fontSize: "80px",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.03)",
                    position: "absolute",
                    top: "16px",
                    right: "20px",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {course.numeral}
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: course.accent,
                    marginBottom: "12px",
                  }}
                >
                  {course.code}
                </div>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "28px",
                    fontWeight: 300,
                    color: "var(--theme-ivory)",
                    marginBottom: "4px",
                  }}
                >
                  {course.title[locale]}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(247,245,240,0.4)",
                    marginBottom: "24px",
                    fontStyle: "italic",
                  }}
                >
                  {course.tagline[locale]}
                </p>



                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "rgba(247,245,240,0.5)",
                    fontWeight: 300,
                    marginBottom: "24px",
                  }}
                >
                  {course.description[locale]}
                </p>

                <div
                  style={{
                    maxHeight: isOpen ? "320px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(247,245,240,0.3)",
                        marginBottom: "12px",
                      }}
                    >
                      {dict.jlpt.levels.whatYouLearn}
                    </div>
                    {course.outcomes[locale].map((skill) => (
                      <div
                        key={skill}
                        style={{
                          fontSize: "13px",
                          color: "rgba(247,245,240,0.6)",
                          marginBottom: "6px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "3px",
                            height: "3px",
                            borderRadius: "50%",
                            backgroundColor: course.accent,
                            flexShrink: 0,
                          }}
                        />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "5px 14px",
                      border: `1px solid ${course.accent}`,
                      color: course.accent,
                    }}
                  >
                    {course.status === "open"
                      ? dict.jlpt.levels.statusOpen
                      : dict.jlpt.levels.statusSoon}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "rgba(247,245,240,0.3)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {isOpen
                      ? `${dict.jlpt.levels.less} ↑`
                      : `${dict.jlpt.levels.details} ↓`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="fade-up" style={{ opacity: 0 }}>
            <Link
              href={localizePath("/join-us", locale)}
              className="btn-lift inline-flex items-center gap-2"
              style={{
                backgroundColor: "var(--theme-accent)",
                color: "var(--theme-ivory)",
                padding: "16px 52px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {dict.jlpt.levels.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function PathwaySection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(80, 0.1)

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F8F7F4",
        padding: "140px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="pathway-heading"
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
              {dict.jlpt.pathway.label}
            </span>
          </div>
          <h2
            id="pathway-heading"
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
            {dict.jlpt.pathway.title}{" "}
            <em style={{ fontStyle: "italic" }}>
              {dict.jlpt.pathway.titleEmphasis}
            </em>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-5"
          style={{ border: "1px solid rgba(35,35,35,0.10)" }}
        >
          {jlptPathway.map((step, i) => (
            <div
              key={step.number}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${i * 0.08}s`,
                padding: "40px 32px",
                border: "1px solid rgba(35,35,35,0.10)",
                backgroundColor: "rgba(248,247,244,0.5)",
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: "36px",
                  fontWeight: 300,
                  color: "rgba(166,58,43,0.35)",
                  lineHeight: 1,
                  marginBottom: "20px",
                }}
              >
                {step.number}
              </div>
              <h3
                className="font-serif"
                style={{
                  fontSize: "19px",
                  fontWeight: 400,
                  color: "#232323",
                  marginBottom: "10px",
                }}
              >
                {step.title[locale]}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.75,
                  color: "#5B5B5B",
                  fontWeight: 300,
                }}
              >
                {step.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection({ locale, dict }: SectionProps) {
  return (
    <section
      style={{ backgroundColor: "#232323", padding: 0 }}
      aria-labelledby="experience-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="image-hover-zoom"
          style={{ position: "relative", minHeight: "500px", overflow: "hidden" }}
        >
          <AppImage
            src="/images/events/language-course/event7.jpg"
            alt={
              locale === "ja"
                ? "日本語を書く受講生の手元"
                : "A student writing Japanese characters in class"
            }
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div
          style={{
            padding: "80px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span
            className="section-label"
            style={{
              color: "var(--theme-accent)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            {dict.jlpt.experience.label}
          </span>
          <h2
            id="experience-heading"
            className="font-serif"
            style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 300,
              lineHeight: 1.15,
              color: "#F8F7F4",
              marginBottom: "28px",
            }}
          >
            {dict.jlpt.experience.title}
            <br />
            <em style={{ fontStyle: "italic" }}>
              {dict.jlpt.experience.titleEmphasis}
            </em>
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.85,
              color: "rgba(248,247,244,0.55)",
              fontWeight: 300,
              marginBottom: "24px",
            }}
          >
            {dict.jlpt.experience.body1}
          </p>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.85,
              color: "rgba(248,247,244,0.45)",
              fontWeight: 300,
              marginBottom: "40px",
            }}
          >
            {dict.jlpt.experience.body2}
          </p>
          <Link
            href={localizePath("/join-us", locale)}
            className="btn-lift inline-flex items-center gap-2"
            style={{
              backgroundColor: "var(--theme-accent)",
              color: "#F8F7F4",
              padding: "15px 40px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              alignSelf: "flex-start",
              textDecoration: "none",
            }}
          >
            {dict.jlpt.experience.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}

function JlptFaqSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(60, 0.1)
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F8F7F4",
        padding: "140px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="jlpt-faq-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="fade-up lg:col-span-4" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "20px",
                color: "var(--theme-accent)",
              }}
            >
              {dict.jlpt.faq.label}
            </span>
            <h2
              id="jlpt-faq-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 2.5vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#232323",
              }}
            >
              {dict.jlpt.faq.title}
              <br />
              <em style={{ fontStyle: "italic" }}>
                {dict.jlpt.faq.titleEmphasis}
              </em>
            </h2>
          </div>

          <div className="lg:col-span-8">
            {jlptFaqs.map((faq, i) => {
              const isOpen = open === i
              const panelId = `jlpt-faq-panel-${i}`
              const buttonId = `jlpt-faq-button-${i}`
              return (
                <div
                  key={faq.question.en}
                  className="fade-up"
                  style={{
                    opacity: 0,
                    transitionDelay: `${i * 0.06}s`,
                    borderTop: "1px solid rgba(35,35,35,0.12)",
                  }}
                >
                  <h3>
                    <button
                      id={buttonId}
                      className="flex w-full items-start justify-between gap-6 text-left"
                      style={{
                        padding: "28px 0",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                      }}
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span
                        style={{
                          fontSize: "17px",
                          color: isOpen ? "var(--theme-accent)" : "#232323",
                          fontFamily: "var(--font-dm-sans)",
                          fontWeight: 500,
                          lineHeight: 1.4,
                          transition: "color 0.3s ease",
                        }}
                      >
                        {faq.question[locale]}
                      </span>
                      <span
                        style={{
                          fontSize: "22px",
                          color: isOpen
                            ? "var(--theme-accent)"
                            : "rgba(35,35,35,0.35)",
                          flexShrink: 0,
                          lineHeight: 1,
                          transition: "color 0.3s ease, transform 0.3s ease",
                          transform: isOpen ? "rotate(45deg)" : "none",
                          marginTop: "2px",
                        }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    style={{ paddingBottom: "28px" }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#5B5B5B",
                        lineHeight: 1.75,
                        fontWeight: 300,
                      }}
                    >
                      {faq.answer[locale]}
                    </p>
                  </div>
                </div>
              )
            })}
            <div style={{ borderTop: "1px solid rgba(35,35,35,0.12)" }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function JlptCta({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.2)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#E8E2D7", padding: "140px 0" }}
      aria-labelledby="jlpt-cta-heading"
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
            {dict.jlpt.cta.label}
          </span>
        </div>
        <h2
          id="jlpt-cta-heading"
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
          {dict.jlpt.cta.title}
          <br />
          <em style={{ fontStyle: "italic" }}>{dict.jlpt.cta.titleEmphasis}</em>
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
          {dict.jlpt.cta.body}
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
            {dict.jlpt.cta.primary}
          </Link>
          <a
            href={`mailto:${dict.common.email}`}
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
            {dict.jlpt.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  )
}

export default function JlptContent({ locale, dict }: SectionProps) {
  return (
    <>
      <HeroJlpt locale={locale} dict={dict} />
      <WhySection locale={locale} dict={dict} />
      <CoursesSection locale={locale} dict={dict} />
      <PathwaySection locale={locale} dict={dict} />
      <ExperienceSection locale={locale} dict={dict} />
      <JlptFaqSection locale={locale} dict={dict} />
      <JlptCta locale={locale} dict={dict} />
    </>
  )
}
