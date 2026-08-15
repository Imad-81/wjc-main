"use client"

import Link from "next/link"
import AppImage from "../app-image"
import { useReveal } from "../use-reveal"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

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
            <div
              className="fade-up select-none font-serif"
              style={{
                fontSize: "clamp(80px, 10vw, 130px)",
                fontWeight: 300,
                lineHeight: 1,
                color: "rgba(35,35,35,0.06)",
                marginBottom: "-24px",
                letterSpacing: "-0.04em",
                opacity: 0,
              }}
              aria-hidden="true"
            >
              01
            </div>

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
                marginBottom: "20px",
                fontWeight: 300,
                color: "#5B5B5B",
                opacity: 0,
              }}
            >
              {dict.home.about.body}
            </p>

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

            {/* Inline stat row */}
            <div
              className="fade-up mb-10 flex flex-wrap gap-8"
              style={{
                paddingTop: "28px",
                borderTop: "1px solid rgba(35,35,35,0.12)",
                opacity: 0,
              }}
            >
              {dict.home.about.inlineStats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "24px",
                      fontWeight: 500,
                      lineHeight: 1,
                      color: "#232323",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      marginTop: "4px",
                      fontWeight: 400,
                      color: "#5B5B5B",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

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

          {/* Right — asymmetric image grid */}
          <div
            className="fade-up relative"
            style={{ opacity: 0 }}
            aria-label={
              locale === "ja"
                ? "ウォクセン日本センターの活動写真"
                : "Images from the Woxsen Japan Centre"
            }
          >
            <div className="grid grid-cols-5 gap-4" style={{ height: "560px" }}>
              <div
                className="image-hover-zoom col-span-3"
                style={{ overflow: "hidden", height: "100%" }}
              >
                <AppImage
                  src="/images/events/kizuna-matsuri/DSC09428-compressed-compressed-compressed.jpg"
                  alt={
                    locale === "ja"
                      ? "絆祭りの様子"
                      : "Kizuna Matsuri at the Woxsen Japan Centre"
                  }
                  width={480}
                  height={560}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>

              <div className="col-span-2 flex flex-col gap-4">
                <div className="image-hover-zoom flex-1" style={{ overflow: "hidden" }}>
                  <AppImage
                    src="/images/events/konnichiwa-woxsen/event5.jpeg"
                    alt={
                      locale === "ja"
                        ? "こんにちはウォクセンの様子"
                        : "Konnichiwa Woxsen student community launch"
                    }
                    width={300}
                    height={270}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "center" }}
                  />
                </div>

                {/* Director quote card */}
                <div
                  style={{
                    flex: "0 0 auto",
                    padding: "24px",
                    backgroundColor: "#232323",
                    border: "1px solid var(--theme-border-dark)",
                  }}
                >
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "15px",
                      color: "#F8F7F4",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      fontWeight: 300,
                      marginBottom: "12px",
                    }}
                  >
                    &ldquo;{dict.home.about.quote}&rdquo;
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(248,247,244,0.50)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {dict.home.about.quoteAuthor}
                    <br />
                    {dict.home.about.quoteRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
