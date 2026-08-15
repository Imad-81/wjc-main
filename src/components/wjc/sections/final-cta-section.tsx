"use client"

import Link from "next/link"
import AppImage from "../app-image"
import { useReveal } from "../use-reveal"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function FinalCtaSection({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const sectionRef = useReveal<HTMLElement>(120, 0.2)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "500px" }}
      aria-label={dict.home.finalCta.label}
    >
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/images/events/kizuna-matsuri/DSC00575-compressed-compressed-compressed.jpg"
          alt={
            locale === "ja"
              ? "ウォクセン日本センターの行事の様子"
              : "A Woxsen Japan Centre gathering"
          }
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 60%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.5) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div
        className="max-w-content relative z-10 mx-auto flex flex-col items-start justify-center px-8 py-32"
        style={{ minHeight: "500px" }}
      >
        <div className="fade-up" style={{ opacity: 0 }}>
          <span
            className="section-label"
            style={{
              color: "var(--theme-accent)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            {dict.home.finalCta.label}
          </span>
        </div>

        <h2
          className="fade-up font-serif"
          style={{
            fontSize: "clamp(40px, 4.5vw, 64px)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "#F7F5F0",
            letterSpacing: "-0.01em",
            maxWidth: "680px",
            marginBottom: "32px",
            opacity: 0,
          }}
        >
          {dict.home.finalCta.title}
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>
            {dict.home.finalCta.titleEmphasis}
          </em>
        </h2>

        <p
          className="fade-up"
          style={{
            fontSize: "17px",
            color: "rgba(247,245,240,0.65)",
            lineHeight: 1.75,
            maxWidth: "480px",
            marginBottom: "44px",
            fontWeight: 300,
            opacity: 0,
          }}
        >
          {dict.home.finalCta.body}
        </p>

        <div className="fade-up flex flex-wrap gap-4" style={{ opacity: 0 }}>
          <Link
            href={localizePath("/join-us", locale)}
            className="btn-lift inline-flex items-center"
            style={{
              backgroundColor: "var(--theme-accent)",
              color: "#F7F5F0",
              padding: "16px 40px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {dict.home.finalCta.primary}
          </Link>
          <Link
            href={localizePath("/jlpt", locale)}
            className="btn-lift inline-flex items-center"
            style={{
              border: "1px solid rgba(247,245,240,0.4)",
              color: "#F7F5F0",
              padding: "16px 40px",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}
          >
            {dict.home.finalCta.secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
