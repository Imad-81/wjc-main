"use client"

import { useState } from "react"

import AppImage from "@/components/wjc/app-image"
import { useReveal } from "@/components/wjc/use-reveal"
import InterestForm from "./interest-form"
import {
  joinSteps,
  membershipBenefits,
  tiers,
} from "@/data/membership"
import { testimonials } from "@/data/testimonials"
import { joinFaqs } from "@/data/faqs"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

interface SectionProps {
  locale: Locale
  dict: Dictionary
}

function HeroJoinUs({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "80vh", paddingTop: "72px" }}
      aria-label={dict.joinUs.metaTitle}
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/images/events/konnichiwa-woxsen/event5.jpeg"
          alt={
            locale === "ja"
              ? "キャンパスの文化行事に集まる学生たち"
              : "Students gathered at a Woxsen Japan Centre cultural event"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 45%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.3) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div
        className="max-w-content relative z-10 mx-auto flex flex-col justify-end px-8"
        style={{ minHeight: "80vh", paddingBottom: "96px" }}
      >
        <div className="max-w-2xl">
          <div className="fade-up" style={{ opacity: 0, marginBottom: "16px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 16px",
                border: "1px solid rgba(201,168,76,0.5)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#C9A84C",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {/* "和 · WA COMMUNITY" replaced per HOME.pdf */}
              {dict.joinUs.heroLabel}
            </span>
          </div>

          <h1
            className="fade-up font-serif"
            style={{
              fontSize: "clamp(44px, 5.5vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#F7F5F0",
              letterSpacing: "-0.01em",
              marginBottom: "28px",
              opacity: 0,
            }}
          >
            {dict.joinUs.heroTitle}
            <br />
            <em style={{ fontStyle: "italic" }}>
              {dict.joinUs.heroTitleEmphasis}
            </em>
          </h1>

          <p
            className="fade-up"
            style={{
              fontSize: "18px",
              color: "rgba(247,245,240,0.65)",
              lineHeight: 1.75,
              maxWidth: "540px",
              fontWeight: 300,
              marginBottom: "48px",
              opacity: 0,
            }}
          >
            {dict.joinUs.heroSubtitle}
          </p>

          <div className="fade-up flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <a
              href="#apply"
              className="btn-lift inline-flex items-center gap-3"
              style={{
                backgroundColor: "var(--theme-accent)",
                color: "var(--theme-ivory)",
                fontSize: "13px",
                letterSpacing: "0.1em",
                fontWeight: 600,
                padding: "16px 40px",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans)",
                textDecoration: "none",
              }}
            >
              {dict.joinUs.heroCtaPrimary}
              <span style={{ fontSize: "16px" }} aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#tiers"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                letterSpacing: "0.08em",
                fontWeight: 500,
                padding: "16px 32px",
                border: "1px solid rgba(247,245,240,0.25)",
                color: "rgba(247,245,240,0.75)",
                fontFamily: "var(--font-dm-sans)",
                textDecoration: "none",
              }}
            >
              {dict.joinUs.heroCtaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function BenefitsSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="theme-transition"
      style={{ backgroundColor: "#E8E2D7", padding: "120px 0" }}
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-16 grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="fade-up lg:col-span-5" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "12px",
                color: "var(--theme-accent)",
              }}
            >
              {dict.joinUs.benefits.label}
            </span>
            <h2
              id="benefits-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(32px, 3vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "0.01em",
                color: "#232323",
              }}
            >
              {dict.joinUs.benefits.title}
              <br />
              <em style={{ fontStyle: "italic" }}>
                {dict.joinUs.benefits.titleEmphasis}
              </em>
            </h2>
          </div>
          <div className="fade-up lg:col-span-7" style={{ opacity: 0 }}>
            <p
              style={{
                fontSize: "17px",
                color: "#5B5B5B",
                lineHeight: 1.8,
                fontWeight: 300,
                paddingTop: "8px",
              }}
            >
              {dict.joinUs.benefits.subtitle}
            </p>
          </div>
        </div>

        {/* Bento grid — first cell spans two columns */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "1px", backgroundColor: "rgba(35,35,35,0.10)" }}
        >
          {membershipBenefits.map((benefit, index) => (
            <div
              key={benefit.kanji}
              className="fade-up theme-transition"
              style={{
                opacity: 0,
                transitionDelay: `${index * 70}ms`,
                padding: "48px 40px",
                backgroundColor:
                  index % 2 === 0
                    ? "rgba(248,247,244,0.60)"
                    : "rgba(232,226,215,0.80)",
                gridColumn: index === 0 ? "span 2" : "span 1",
              }}
            >
              <div
                className="font-serif font-jp"
                style={{
                  fontSize: "48px",
                  color: "var(--theme-accent)",
                  opacity: 0.3,
                  lineHeight: 1,
                  marginBottom: "24px",
                }}
                aria-hidden="true"
              >
                {benefit.kanji}
              </div>
              <h3
                className="font-serif"
                style={{
                  fontSize: "22px",
                  fontWeight: 400,
                  lineHeight: 1.25,
                  marginBottom: "12px",
                  color: "#232323",
                }}
              >
                {benefit.title[locale]}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#5B5B5B",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {benefit.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TiersSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      id="tiers"
      className="theme-transition"
      style={{ backgroundColor: "#232323", padding: "120px 0" }}
      aria-labelledby="tiers-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div
          className="fade-up text-center"
          style={{ opacity: 0, marginBottom: "80px" }}
        >
          <span
            className="section-label"
            style={{
              color: "rgba(247,245,240,0.4)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            {dict.joinUs.tiers.label}
          </span>
          <h2
            id="tiers-heading"
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 300,
              color: "#F7F5F0",
              lineHeight: 1.15,
              letterSpacing: "0.01em",
              marginBottom: "20px",
            }}
          >
            {dict.joinUs.tiers.title}
            <br />
            <em style={{ fontStyle: "italic" }}>
              {dict.joinUs.tiers.titleEmphasis}
            </em>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(247,245,240,0.45)",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
              fontWeight: 300,
            }}
          >
            {dict.joinUs.tiers.subtitle}
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${index * 80}ms`,
                padding: "48px 32px",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.01)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="font-serif font-jp"
                style={{
                  fontSize: "72px",
                  fontWeight: 300,
                  color: tier.color,
                  opacity: 0.4,
                  lineHeight: 1,
                  marginBottom: "24px",
                }}
                aria-hidden="true"
              >
                {tier.kanji}
              </div>

              <div
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  border: `1px solid ${tier.color}`,
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  color: tier.color,
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 600,
                  marginBottom: "16px",
                  width: "fit-content",
                  textTransform: "uppercase",
                }}
              >
                {dict.joinUs.tiers.level} {tier.level}
              </div>

              <h3
                className="font-serif"
                style={{
                  fontSize: "24px",
                  fontWeight: 400,
                  color: "#F7F5F0",
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}
              >
                {tier.name}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(247,245,240,0.4)",
                  marginBottom: "20px",
                  fontFamily: "var(--font-dm-sans)",
                  letterSpacing: "0.04em",
                }}
              >
                {tier.title[locale]}
              </p>

              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(247,245,240,0.55)",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                  fontWeight: 300,
                  flex: 1,
                }}
              >
                {tier.description[locale]}
              </p>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  marginBottom: "24px",
                }}
                aria-hidden="true"
              />

              <div className="mb-6 flex flex-col gap-2.5">
                {tier.benefits[locale].map((perk) => (
                  <div key={perk} className="flex items-start gap-2.5">
                    <div
                      style={{
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        backgroundColor: tier.color,
                        flexShrink: 0,
                        marginTop: "7px",
                      }}
                      aria-hidden="true"
                    />
                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(247,245,240,0.5)",
                        lineHeight: 1.5,
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {perk}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "10px 16px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "12px",
                  color: "rgba(247,245,240,0.35)",
                  fontFamily: "var(--font-dm-sans)",
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    color: "rgba(247,245,240,0.2)",
                    letterSpacing: "0.08em",
                    fontSize: "10px",
                    display: "block",
                    marginBottom: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  {dict.joinUs.tiers.requirement}
                </span>
                {tier.requirement[locale]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MemberStoriesSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="theme-transition"
      style={{ backgroundColor: "#E8E2D7", padding: "120px 0" }}
      aria-labelledby="member-stories-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="fade-up" style={{ opacity: 0, marginBottom: "64px" }}>
          <span
            className="section-label"
            style={{
              display: "block",
              marginBottom: "12px",
              color: "var(--theme-accent)",
            }}
          >
            {dict.home.testimonials.label}
          </span>
          <h2
            id="member-stories-heading"
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 3vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "0.01em",
              color: "#232323",
            }}
          >
            {dict.home.testimonials.title}
            <br />
            <em style={{ fontStyle: "italic" }}>
              {dict.home.testimonials.titleEmphasis}
            </em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${index * 100}ms`,
                padding: "48px 40px",
                border: "1px solid rgba(35,35,35,0.10)",
                backgroundColor: "rgba(248,247,244,0.60)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: "80px",
                  color: "var(--theme-accent)",
                  opacity: 0.2,
                  lineHeight: 0.8,
                  marginBottom: "24px",
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <p
                className="font-serif"
                style={{
                  fontSize: "18px",
                  color: "#232323",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  fontWeight: 300,
                  flex: 1,
                  marginBottom: "32px",
                }}
              >
                {t.quote[locale]}
              </p>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "rgba(35,35,35,0.10)",
                  marginBottom: "24px",
                }}
                aria-hidden="true"
              />

              {/*
                The prototype pairs each quote with an AI-generated portrait.
                These are real students who have not supplied photographs, so
                the avatar is a monogram rather than a stock face.
              */}
              <div className="flex items-center gap-4">
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    border: "1px solid rgba(35,35,35,0.12)",
                    backgroundColor: "rgba(35,35,35,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="font-serif"
                    style={{ fontSize: "18px", color: "var(--theme-accent)" }}
                  >
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: "#232323",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#5B5B5B",
                      fontFamily: "var(--font-dm-sans)",
                      marginTop: "2px",
                    }}
                  >
                    {t.affiliation[locale]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ApplicationSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(80, 0.1)

  return (
    <section
      ref={ref}
      id="apply"
      className="theme-transition"
      style={{ backgroundColor: "#0F0F0F", padding: "120px 0" }}
      aria-labelledby="apply-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left — process */}
          <div className="lg:col-span-5">
            <div className="fade-up" style={{ opacity: 0, marginBottom: "48px" }}>
              <span
                className="section-label"
                style={{
                  color: "rgba(247,245,240,0.4)",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                {dict.joinUs.steps.label}
              </span>
              <h2
                id="apply-heading"
                className="font-serif"
                style={{
                  fontSize: "clamp(28px, 2.5vw, 40px)",
                  fontWeight: 300,
                  color: "#F7F5F0",
                  lineHeight: 1.2,
                  letterSpacing: "0.01em",
                }}
              >
                {dict.joinUs.steps.title}
                <br />
                <em style={{ fontStyle: "italic" }}>
                  {dict.joinUs.steps.titleEmphasis}
                </em>
              </h2>
            </div>

            <div className="flex flex-col">
              {joinSteps.map((step, index) => (
                <div
                  key={step.number}
                  className="fade-up"
                  style={{
                    opacity: 0,
                    transitionDelay: `${index * 80}ms`,
                    display: "flex",
                    gap: "24px",
                    paddingBottom:
                      index < joinSteps.length - 1 ? "40px" : "0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        border: "1px solid var(--theme-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        color: "var(--theme-accent)",
                        flexShrink: 0,
                      }}
                    >
                      {step.number}
                    </div>
                    {index < joinSteps.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          flex: 1,
                          backgroundColor: "rgba(255,255,255,0.06)",
                          marginTop: "8px",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div style={{ paddingTop: "6px", paddingBottom: "8px" }}>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: "20px",
                        fontWeight: 400,
                        color: "#F7F5F0",
                        lineHeight: 1.2,
                        marginBottom: "8px",
                      }}
                    >
                      {step.title[locale]}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "rgba(247,245,240,0.45)",
                        lineHeight: 1.65,
                        fontWeight: 300,
                      }}
                    >
                      {step.description[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="fade-up lg:col-span-7" style={{ opacity: 0 }}>
            <InterestForm locale={locale} dict={dict} />
          </div>
        </div>
      </div>
    </section>
  )
}

function JoinFaqSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(60, 0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="theme-transition"
      style={{
        backgroundColor: "#F8F7F4",
        padding: "120px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="join-faq-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="fade-up lg:col-span-4" style={{ opacity: 0 }}>
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "12px",
                color: "var(--theme-accent)",
              }}
            >
              {dict.joinUs.faq.label}
            </span>
            <h2
              id="join-faq-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 2.5vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "0.01em",
                color: "#232323",
              }}
            >
              {dict.joinUs.faq.title}
              <br />
              {dict.joinUs.faq.titleEmphasis}
            </h2>
          </div>

          <div className="lg:col-span-8">
            {joinFaqs.map((faq, index) => {
              const isOpen = openIndex === index
              const panelId = `join-faq-panel-${index}`
              const buttonId = `join-faq-button-${index}`

              return (
                <div
                  key={faq.question.en}
                  className="fade-up"
                  style={{
                    opacity: 0,
                    transitionDelay: `${index * 60}ms`,
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
                      onClick={() => setOpenIndex(isOpen ? null : index)}
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

export default function JoinUsContent({ locale, dict }: SectionProps) {
  return (
    <>
      <HeroJoinUs locale={locale} dict={dict} />
      <BenefitsSection locale={locale} dict={dict} />
      <TiersSection locale={locale} dict={dict} />
      <MemberStoriesSection locale={locale} dict={dict} />
      <ApplicationSection locale={locale} dict={dict} />
      <JoinFaqSection locale={locale} dict={dict} />
    </>
  )
}
