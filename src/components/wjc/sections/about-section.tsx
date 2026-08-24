"use client"

import Link from "next/link"
import AppImage from "../app-image"
import { useReveal } from "../use-reveal"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

/** The three pictured at the Centre's inauguration, left to right. */
const ATTENDEES = [
  "Mr. Tetsuya Yamada",
  "Dr. Brundaban Mishra",
  "Mr. Daisuke Tanji",
]

export default function AboutSection({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      id="about"
      ref={sectionRef}
      className="theme-transition relative"
      style={{ backgroundColor: "#E8E2D7", padding: "120px 0" }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — text */}
          <div>

            <div className="fade-up" style={{ opacity: 0 }}>
              <span
                className="section-label"
                style={{
                  display: "block",
                  marginBottom: "16px",
                  color: "var(--theme-accent)",
                }}
              >
                {dict.home.about.label}
              </span>
            </div>

            <h2
              id="about-heading"
              className="fade-up font-serif"
              style={{
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "0.01em",
                marginBottom: "28px",
                color: "#232323",
                opacity: 0,
              }}
            >
              {dict.home.about.title}
              <br />
              {dict.home.about.titleEmphasis}
            </h2>

            <p
              className="fade-up"
              style={{
                fontSize: "17px",
                lineHeight: 1.8,
                maxWidth: "540px",
                marginBottom: dict.home.about.body2 ? "20px" : "44px",
                fontWeight: 300,
                color: "#5B5B5B",
                opacity: 0,
              }}
            >
              {dict.home.about.body}
            </p>

            {dict.home.about.body2 ? (
              <p
                className="fade-up"
                style={{
                  fontSize: "17px",
                  lineHeight: 1.8,
                  maxWidth: "540px",
                  marginBottom: "44px",
                  fontWeight: 300,
                  color: "#5B5B5B",
                  opacity: 0,
                }}
              >
                {dict.home.about.body2}
              </p>
            ) : null}



            <div className="fade-up" style={{ opacity: 0 }}>
              <Link
                href={localizePath("/about", locale)}
                className="inline-flex items-center gap-2"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "var(--theme-accent)",
                  transition: "gap 0.3s ease",
                }}
              >
                {dict.home.about.cta}
                <span style={{ transition: "transform 0.3s ease" }}>→</span>
              </Link>
            </div>
          </div>

          {/* Right — inauguration photograph */}
          <div className="fade-up relative" style={{ opacity: 0 }}>
            <div className="image-hover-zoom relative aspect-[4/3] overflow-hidden">
              <AppImage
                src="/images/others/woxsen-japan-center.jpg"
                alt={
                  locale === "ja"
                    ? "ウォクセン日本センター開設式"
                    : "The inauguration of the Woxsen Japan Centre"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Names of those pictured. The scrim starts well above the text
                  so it fades into the photograph rather than banding across it. */}
              <div
                className="absolute inset-x-0 bottom-0"
                style={{
                  padding: "80px 24px 22px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 45%, transparent 100%)",
                }}
              >
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {ATTENDEES.map((name) => (
                    <span
                      key={name}
                      style={{
                        fontSize: "14px",
                        letterSpacing: "0.03em",
                        color: "rgba(255,255,255,0.90)",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
