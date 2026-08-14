"use client"

import Image from "next/image"
import { useTheme } from "./theme-provider"
import { ButtonLink } from "./primitives"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

/**
 * Home hero. The background image follows the active seasonal theme, so it
 * has to be a client component.
 *
 * Note: the "Woxsen University · Japan Centre" eyebrow that sat above the
 * title in the prototype was removed at the Centre's request.
 */
export default function Hero({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const { season } = useTheme()

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          key={season.id}
          src={season.hero}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--theme-hero-overlay) 0%, rgba(20,18,16,0.72) 45%, rgba(20,18,16,0.35) 100%)",
          }}
        />
      </div>

      {/* Vertical rail — right edge */}
      <div
        aria-hidden="true"
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block"
      >
        <span className="writing-vertical-rl font-jp text-sm tracking-[0.5em] text-[var(--theme-accent)] opacity-70">
          和敬清寂
        </span>
      </div>

      {/* Corner marks */}
      <span
        aria-hidden="true"
        className="absolute right-6 top-24 hidden font-serif text-sm tracking-[0.3em] text-[var(--theme-muted-text)] lg:block"
      >
        WJC
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-24 right-6 hidden font-jp text-2xl text-[var(--theme-accent)] opacity-80 lg:block"
      >
        絆
      </span>

      {/* Content */}
      <div className="max-w-content relative mx-auto w-full px-6 py-32 md:px-10">
        <div className="max-w-2xl">
          <span
            aria-hidden="true"
            className="mb-8 block h-px w-16 bg-[var(--theme-accent)]"
          />

          <h1 className="font-serif text-5xl leading-[1.06] text-[var(--theme-ivory)] md:text-6xl lg:text-7xl">
            {dict.home.heroTitle}
            <span className="mt-1 block text-[var(--theme-accent)]">
              {dict.home.heroTitleEmphasis}
            </span>
          </h1>

          <span
            aria-hidden="true"
            className="mt-8 block h-px w-10 bg-[var(--theme-accent)] opacity-60"
          />

          <p className="mt-8 max-w-lg text-sm leading-relaxed text-[rgba(248,247,244,0.72)] md:text-base">
            {dict.home.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={localizePath("/jlpt", locale)}>
              {dict.home.heroCtaPrimary}
              <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink href={localizePath("/about", locale)} variant="outline">
              {dict.home.heroCtaSecondary}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.28em] text-[var(--theme-muted-text)]">
          {dict.common.scroll}
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-[var(--theme-accent)] to-transparent" />
      </div>
    </section>
  )
}
