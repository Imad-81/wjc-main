import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Check } from "lucide-react"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, localizePath, type Locale } from "@/i18n/config"
import { jlptLevels, jlptPathway } from "@/data/jlpt"
import { jlptPillars } from "@/data/activities"
import { jlptFaqs } from "@/data/faqs"

import PageHeader from "@/components/wjc/page-header"
import FadeUp from "@/components/wjc/fade-up"
import Accordion from "@/components/wjc/accordion"
import { ButtonLink, KanjiGhost, SectionLabel } from "@/components/wjc/primitives"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.jlpt.metaTitle, description: dict.jlpt.metaDescription,
    alternates: alternatesFor("/jlpt", locale),
  }
}

export default async function JlptPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const dict = getDictionary(locale)

  return (
    <>
      <PageHeader
        label={dict.jlpt.heroLabel}
        title={dict.jlpt.heroTitle}
        titleEmphasis={dict.jlpt.heroTitleEmphasis}
        subtitle={dict.jlpt.heroSubtitle}
        image="/images/hero/hero2.webp"
        imageAlt={
          locale === "ja" ? "日本語のクラス風景" : "A Japanese language class"
        }
        watermark="語"
        actions={
          <>
            <ButtonLink href={`${localizePath("/jlpt", locale)}#courses`}>
              {dict.jlpt.heroCtaPrimary}
            </ButtonLink>
            <ButtonLink href={localizePath("/join-us", locale)} variant="outline">
              {dict.jlpt.heroCtaSecondary}
            </ButtonLink>
          </>
        }
      />

      {/* ── Why Japanese / Gateway to Japan ───────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-beige)] py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <SectionLabel>{dict.jlpt.why.label}</SectionLabel>
              <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--warm-text)] md:text-5xl">
                {dict.jlpt.why.title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--warm-text-muted)] lg:pb-2">
              {dict.jlpt.why.subtitle}
            </p>
          </FadeUp>

          <div className="mt-14 grid gap-px border border-[var(--warm-border)] bg-[var(--warm-border)] md:grid-cols-2">
            {jlptPillars.map((pillar, index) => (
              <FadeUp
                key={pillar.number}
                delay={((index % 2) + 1) as 1 | 2}
                className="group relative overflow-hidden bg-[var(--section-beige)] p-8 md:p-10"
              >
                <span
                  aria-hidden="true"
                  className="font-jp absolute -top-3 right-4 text-7xl text-[var(--theme-accent)] opacity-10 transition-opacity group-hover:opacity-20"
                >
                  {pillar.kanji}
                </span>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="font-jp block text-3xl text-[var(--theme-accent)]"
                  >
                    {pillar.kanji}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl text-[var(--warm-text)]">
                    {pillar.title[locale]}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--warm-text-muted)]">
                    {pillar.description[locale]}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course levels ─────────────────────────────────────────────── */}
      <section
        id="courses"
        className="section-bg relative scroll-mt-20 overflow-hidden py-24 md:py-32"
      >
        <KanjiGhost char="学" className="-left-8 top-16" />

        <div className="max-w-content relative mx-auto px-6 md:px-10">
          <FadeUp>
            <SectionLabel>{dict.jlpt.levels.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl text-[var(--theme-ivory)] md:text-5xl">
              {dict.jlpt.levels.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {jlptLevels.map((level, index) => (
              <FadeUp
                key={level.id}
                delay={((index % 3) + 1) as 1 | 2 | 3}
                className="washi-glass-dark group relative flex flex-col p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: level.accent }}
                />
                <span
                  aria-hidden="true"
                  className="font-jp absolute right-6 top-6 text-5xl text-[var(--theme-ivory)] opacity-[0.07]"
                >
                  {level.numeral}
                </span>

                <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--theme-accent)]">
                  {level.code}
                </p>
                <h3 className="mt-4 font-serif text-3xl text-[var(--theme-ivory)]">
                  {level.title[locale]}
                </h3>
                <p className="mt-1 font-serif text-sm italic text-[var(--theme-muted-text)]">
                  {level.tagline[locale]}
                </p>

                {/*
                  Duration and Schedule were removed at the Centre's request —
                  those details are shared at enrolment.
                */}

                <p className="mt-6 text-sm leading-relaxed text-[var(--theme-muted-text)]">
                  {level.description[locale]}
                </p>

                <div className="mt-7 border-t border-[var(--theme-divider)] pt-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--theme-muted-text)]">
                    {dict.jlpt.levels.whatYouLearn}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {level.outcomes[locale].map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2.5 text-[13px] text-[rgba(248,247,244,0.78)]"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-[var(--theme-accent)]"
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <p
                  className="mt-8 inline-flex self-start border px-4 py-2 text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    borderColor:
                      level.status === "open"
                        ? "var(--theme-border-light)"
                        : "var(--theme-accent)",
                    color:
                      level.status === "open"
                        ? "var(--theme-ivory)"
                        : "var(--theme-accent)",
                  }}
                >
                  {level.status === "open"
                    ? dict.jlpt.levels.statusOpen
                    : dict.jlpt.levels.statusSoon}
                </p>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-14 text-center">
            <ButtonLink href={localizePath("/join-us", locale)}>
              {dict.jlpt.levels.cta}
              <span aria-hidden="true">→</span>
            </ButtonLink>
          </FadeUp>
        </div>
      </section>

      {/* ── Learning pathway ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-paper)] py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp>
            <SectionLabel>{dict.jlpt.pathway.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--warm-text)] md:text-5xl">
              {dict.jlpt.pathway.title}
              <span className="block italic">
                {dict.jlpt.pathway.titleEmphasis}
              </span>
            </h2>
          </FadeUp>

          <ol className="mt-14 grid gap-px border border-[var(--warm-border)] bg-[var(--warm-border)] sm:grid-cols-2 lg:grid-cols-5">
            {jlptPathway.map((step, index) => (
              <FadeUp
                key={step.number}
                delay={((index % 5) + 1) as 1 | 2 | 3 | 4 | 5}
                as="li"
                className="bg-[var(--section-paper)] p-7"
              >
                <p className="font-serif text-3xl text-[var(--theme-accent)] opacity-40">
                  {step.number}
                </p>
                <h3 className="mt-4 font-serif text-xl text-[var(--warm-text)]">
                  {step.title[locale]}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--warm-text-muted)]">
                  {step.description[locale]}
                </p>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-bg-alt relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="問" className="-right-6 bottom-0" />

        <div className="max-w-content relative mx-auto grid gap-12 px-6 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <FadeUp>
            <SectionLabel>{dict.jlpt.faq.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
              {dict.jlpt.faq.title}
              <span className="block italic">
                {dict.jlpt.faq.titleEmphasis}
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={1}>
            <Accordion
              items={jlptFaqs.map((faq) => ({
                question: faq.question[locale],
                answer: faq.answer[locale],
              }))}
            />
          </FadeUp>
        </div>
      </section>
    </>
  )
}
