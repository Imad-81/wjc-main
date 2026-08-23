"use client"

import Link from "next/link"
import { useState } from "react"

import AppImage from "@/components/wjc/app-image"
import { useReveal } from "@/components/wjc/use-reveal"
import { faculty, studentLeadership } from "@/data/team"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

interface SectionProps {
  locale: Locale
  dict: Dictionary
}

/** The Director card is drawn from the real faculty list. */
const DIRECTOR_ID = "brundaban-mishra"

function HeroTeam({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "70vh", paddingTop: "72px" }}
      aria-label={dict.team.metaTitle}
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/images/events/kizuna-matsuri/DSC09354-compressed-compressed-compressed.jpg"
          alt={
            locale === "ja"
              ? "ウォクセン日本センターに集う学生と教員"
              : "Students and faculty of the Woxsen Japan Centre"
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
              "linear-gradient(to bottom, rgba(8,8,8,0.65) 0%, rgba(8,8,8,0.45) 50%, var(--theme-bg) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div
        className="max-w-content relative z-10 mx-auto flex flex-col justify-end px-8"
        style={{ minHeight: "70vh", paddingBottom: "100px" }}
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
            {dict.team.heroLabel}
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
          {dict.team.heroTitle}
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>
            {dict.team.heroTitleEmphasis}
          </em>
        </h1>
        <p
          className="fade-up"
          style={{
            fontSize: "17px",
            color: "rgba(247,245,240,0.55)",
            lineHeight: 1.75,
            maxWidth: "480px",
            fontWeight: 300,
            opacity: 0,
          }}
        >
          {dict.team.heroSubtitle}
        </p>
      </div>
    </section>
  )
}


function FacultySection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(120, 0.1)
  const [hovered, setHovered] = useState<number | null>(null)

  // Everyone except the Director, who has their own feature above.
  const instructors = faculty.filter((p) => p.id !== DIRECTOR_ID)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#232323", padding: "140px 0" }}
      aria-labelledby="faculty-heading"
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
              {dict.team.faculty.label}
            </span>
          </div>
          <h2
            id="faculty-heading"
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
            {dict.team.faculty.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {instructors.map((person, i) => {
            const isHovered = hovered === i
            return (
              <div
                key={person.id}
                className="fade-up"
                style={{
                  opacity: 0,
                  transitionDelay: `${i * 0.12}s`,
                  position: "relative",
                  overflow: "hidden",
                }}
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
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "32px 28px",
                    background: isHovered
                      ? "linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.75) 60%, transparent 100%)"
                      : "linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.25) 60%, transparent 100%)",
                    transition: "background 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--theme-accent)",
                      marginBottom: "6px",
                    }}
                  >
                    {person.subtitle[locale]}
                  </div>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#F7F5F0",
                      marginBottom: "2px",
                    }}
                  >
                    {person.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(247,245,240,0.45)",
                      marginBottom: isHovered && person.bio ? "16px" : "0",
                      transition: "margin 0.3s ease",
                    }}
                  >
                    {person.role[locale]}
                  </div>

                  {person.bio && (
                    <div
                      style={{
                        maxHeight: isHovered ? "200px" : "0",
                        overflow: "hidden",
                        transition:
                          "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.7,
                          color: "rgba(247,245,240,0.6)",
                        }}
                      >
                        {person.bio[locale]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StudentLeadersSection({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F8F7F4",
        padding: "140px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-labelledby="community-leaders-heading"
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
                {dict.team.students.label}
              </span>
            </div>
            <h2
              id="community-leaders-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "#232323",
                opacity: 0,
              }}
            >
              {dict.team.students.title}
              <br />
              <em style={{ fontStyle: "italic" }}>
                {dict.team.students.titleEmphasis}
              </em>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-8">
            <p
              className="fade-up"
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                fontWeight: 300,
                color: "#5B5B5B",
                opacity: 0,
              }}
            >
              {dict.team.students.body}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {studentLeadership.map((student, i) => (
            <div
              key={student.id}
              className="fade-up"
              style={{
                opacity: 0,
                transitionDelay: `${i * 0.1}s`,
                border: "1px solid rgba(35,35,35,0.10)",
                overflow: "hidden",
                backgroundColor: "rgba(232,226,215,0.40)",
              }}
            >
              <div
                className="image-hover-zoom"
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  overflow: "hidden",
                }}
              >
                <AppImage
                  src={student.image}
                  alt={student.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
                {/*
                  The prototype badges each student with a Wa tier
                  (Taishi/Senpai/Nakama). These are real students and the
                  Centre has not published tier standings for them, so the
                  badge is the Centre's 和 mark rather than a rank.
                */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="font-serif font-jp"
                    style={{
                      fontSize: "18px",
                      color: "var(--theme-accent)",
                      fontWeight: 300,
                    }}
                  >
                    和
                  </span>
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--theme-accent)",
                    marginBottom: "6px",
                  }}
                >
                  {student.subtitle[locale]}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#232323",
                    marginBottom: "2px",
                  }}
                >
                  {student.name}
                </div>
                <div style={{ fontSize: "12px", color: "#5B5B5B" }}>
                  {student.role[locale]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


function TeamCta({ locale, dict }: SectionProps) {
  const ref = useReveal<HTMLElement>(100, 0.2)

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#E8E2D7", padding: "140px 0" }}
      aria-labelledby="team-cta-heading"
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
            {dict.team.cta.label}
          </span>
        </div>
        <h2
          id="team-cta-heading"
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
          {dict.team.cta.title}
          <br />
          <em style={{ fontStyle: "italic" }}>{dict.team.cta.titleEmphasis}</em>
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
          {dict.team.cta.body}
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
            {dict.team.cta.primary}
          </Link>
          <Link
            href={localizePath("/about", locale)}
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
            {dict.team.cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function TeamContent({ locale, dict }: SectionProps) {
  return (
    <>
      <HeroTeam locale={locale} dict={dict} />
      <FacultySection locale={locale} dict={dict} />
      <StudentLeadersSection locale={locale} dict={dict} />
      <TeamCta locale={locale} dict={dict} />
    </>
  )
}
