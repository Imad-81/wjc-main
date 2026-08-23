"use client"

import AppImage from "@/components/wjc/app-image"
import { useReveal } from "@/components/wjc/use-reveal"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function GalleryHero({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const ref = useReveal<HTMLElement>(100, 0.1)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "65vh", paddingTop: "72px" }}
      aria-label={dict.gallery.metaTitle}
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/images/events/kizuna-matsuri/DSC09647-compressed-compressed-compressed.jpg"
          alt={
            locale === "ja"
              ? "ウォクセン日本センターの文化行事の様子"
              : "A cultural event at the Woxsen Japan Centre"
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
        style={{ minHeight: "65vh", paddingBottom: "80px" }}
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
            {dict.gallery.heroLabel}
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
          {dict.gallery.heroTitle}
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>
            {dict.gallery.heroTitleEmphasis}
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
          {dict.gallery.heroSubtitle}
        </p>
      </div>
    </section>
  )
}
