import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, localizePath, type Locale } from "@/i18n/config"
import { activities } from "@/data/activities"
import { leadershipPreview } from "@/data/team"

import PageHeader from "@/components/wjc/page-header"
import FadeUp from "@/components/wjc/fade-up"
import ComingSoon from "@/components/wjc/coming-soon"
import {
  AccentRule,
  ButtonLink,
  KanjiGhost,
  SectionLabel,
} from "@/components/wjc/primitives"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    alternates: alternatesFor("/about", locale),
  }
}

export default async function AboutPage({
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
        label={dict.about.heroLabel}
        title={dict.about.heroTitle}
        titleEmphasis={dict.about.heroTitleEmphasis}
        subtitle={dict.about.heroSubtitle}
        image="/images/hero/hero3.webp"
        imageAlt={
          locale === "ja"
            ? "ウォクセン大学キャンパスの風景"
            : "Woxsen University campus"
        }
        watermark="概要"
      />

      {/* ── Our story ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-beige)] py-24 md:py-32">
        <div className="max-w-content mx-auto grid gap-12 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <FadeUp>
            <SectionLabel>{dict.about.story.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--warm-text)] md:text-5xl">
              {dict.about.story.title}
              <span className="block italic">
                {dict.about.story.titleEmphasis}
              </span>
            </h2>
            <AccentRule className="mt-7" />
          </FadeUp>

          <FadeUp delay={1} className="space-y-6">
            <p className="text-justify text-sm leading-[1.9] text-[rgba(35,35,35,0.82)] md:text-[15px]">
              {dict.about.story.paragraph1}
            </p>
            <p className="text-justify text-sm leading-[1.9] text-[rgba(35,35,35,0.82)] md:text-[15px]">
              {dict.about.story.paragraph2}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Mission / Vision ──────────────────────────────────────────── */}
      <section className="section-bg">
        <div className="max-w-content mx-auto grid divide-y divide-[var(--theme-divider)] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {[
            { kanji: "使", ...dict.about.mission },
            { kanji: "視", ...dict.about.vision },
          ].map((block, index) => (
            <FadeUp
              key={block.label}
              delay={index === 0 ? 0 : 2}
              className="relative overflow-hidden px-6 py-20 md:px-14 md:py-24"
            >
              <KanjiGhost char={block.kanji} className="-top-6 left-4" />
              <div className="relative">
                <SectionLabel>{block.label}</SectionLabel>
                <h2 className="mt-5 font-serif text-3xl leading-[1.16] text-[var(--theme-ivory)] md:text-4xl">
                  {block.title}
                </h2>
                <AccentRule className="mt-6" />
                <p className="mt-7 max-w-md text-sm leading-[1.9] text-[var(--theme-muted-text)]">
                  {block.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Core activities ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-paper)] py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp>
            <SectionLabel>{dict.about.activities.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl text-[var(--warm-text)] md:text-5xl">
              {dict.about.activities.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-px border border-[var(--warm-border)] bg-[var(--warm-border)] md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <FadeUp
                key={activity.number}
                delay={((index % 3) + 1) as 1 | 2 | 3}
                className="group relative overflow-hidden bg-[var(--section-paper)] p-8 transition-colors hover:bg-[rgba(232,226,215,0.45)]"
              >
                <span
                  aria-hidden="true"
                  className="font-jp absolute -top-2 right-3 text-6xl text-[var(--theme-accent)] opacity-10 transition-opacity group-hover:opacity-20"
                >
                  {activity.kanji}
                </span>

                <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--theme-accent)]">
                  {activity.number}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-[var(--warm-text)]">
                  {activity.title[locale]}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--warm-text-muted)]">
                  {activity.description[locale]}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Director's message ────────────────────────────────────────── */}
      <section className="section-bg-alt">
        <div className="max-w-content mx-auto grid lg:grid-cols-[0.9fr_1.1fr]">
          <FadeUp className="relative min-h-[420px]">
            <Image
              src="/images/team/faculty-leadership/dr-brundaban-mishra.jpg"
              alt={
                locale === "ja"
                  ? "ウォクセン日本センター所長 ブルンダバン・ミシュラ博士"
                  : "Dr. Brundaban Mishra, Director of the Woxsen Japan Centre"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top"
            />
          </FadeUp>

          <FadeUp delay={1} className="px-6 py-20 md:px-14 md:py-24">
            <SectionLabel>{dict.about.director.label}</SectionLabel>

            <blockquote className="mt-8">
              <span
                aria-hidden="true"
                className="font-serif text-5xl leading-none text-[var(--theme-accent)] opacity-50"
              >
                “
              </span>
              <p className="mt-4 font-serif text-3xl italic leading-snug text-[var(--theme-ivory)] md:text-4xl">
                {dict.about.director.quote}
              </p>
              <footer className="mt-10 border-t border-[var(--theme-divider)] pt-6">
                <p className="text-sm text-[var(--theme-ivory)]">
                  {dict.about.director.name}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--theme-muted-text)]">
                  {dict.about.director.role}
                </p>
              </footer>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* ── Leadership preview ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-beige)] py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp>
            <SectionLabel>{dict.about.people.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl text-[var(--warm-text)] md:text-5xl">
              {dict.about.people.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipPreview.map((member, index) => (
              <FadeUp
                key={member.id}
                delay={((index % 3) + 1) as 1 | 2 | 3}
                className="group"
              >
                <div className="image-hover-zoom relative aspect-[4/5] overflow-hidden bg-[var(--section-wood)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl text-[var(--warm-text)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--theme-accent)]">
                  {member.role[locale]}
                </p>
                <p className="mt-1 text-xs text-[var(--warm-text-muted)]">
                  {member.subtitle[locale]}
                </p>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-14">
            <ButtonLink href={localizePath("/team", locale)} variant="outline" className="!text-[var(--warm-text)] !border-[var(--warm-border-strong)]">
              {dict.about.people.cta}
              <span aria-hidden="true">→</span>
            </ButtonLink>
          </FadeUp>
        </div>
      </section>

      {/* ── Timeline (horizontal, content pending) ────────────────────── */}
      <section className="section-bg relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="歴" className="-right-6 top-10" />

        <div className="max-w-content relative mx-auto px-6 md:px-10">
          <FadeUp>
            <SectionLabel>{dict.about.timeline.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl text-[var(--theme-ivory)] md:text-5xl">
              {dict.about.timeline.title}
            </h2>
          </FadeUp>

          {/*
            Rebuilt as a horizontal rail per the Centre's request. The
            milestone content is still being prepared, so the rail renders
            its placeholder state rather than the prototype's invented dates.
          */}
          <FadeUp delay={1} className="mt-12">
            <div
              aria-hidden="true"
              className="mb-10 h-px w-full"
              style={{ background: "var(--theme-timeline-line)" }}
            />
            <ComingSoon
              locale={locale}
              kanji="歴"
              note={dict.about.timeline.comingSoon}
            />
          </FadeUp>
        </div>
      </section>
    </>
  )
}
