import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, localizePath, type Locale } from "@/i18n/config"

import PageHeader from "@/components/wjc/page-header"
import FadeUp from "@/components/wjc/fade-up"
import EventsTabs from "./events-tabs"
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
    title: dict.events.metaTitle,
    description: dict.events.metaDescription,
    alternates: alternatesFor("/events", locale),
  }
}

export default async function EventsPage({
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
      {/* Confirmed section — "Every Gathering Tells a Story" */}
      <PageHeader
        label={dict.events.heroLabel}
        title={dict.events.heroTitle}
        titleEmphasis={dict.events.heroTitleEmphasis}
        subtitle={dict.events.heroSubtitle}
        image="/images/events/kizuna-matsuri/DSC09428-compressed-compressed-compressed.jpg"
        imageAlt={
          locale === "ja"
            ? "絆祭りの様子"
            : "Kizuna Matsuri at the Woxsen Japan Centre"
        }
        watermark="行事"
      />

      {/* ── Past events, browsed by the Centre's four tabs ────────────── */}
      <section className="section-bg relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="祭" className="-right-8 top-14" />

        <div className="max-w-content relative mx-auto px-6 md:px-10">
          <FadeUp>
            <SectionLabel>{dict.events.pastLabel}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl text-[var(--theme-ivory)] md:text-5xl">
              {dict.events.pastTitle}
            </h2>
          </FadeUp>

          <FadeUp delay={1}>
            <EventsTabs locale={locale} dict={dict} />
          </FadeUp>
        </div>
      </section>

      {/* Confirmed section — "Be Part of the Next Chapter" */}
      <section className="relative overflow-hidden bg-[var(--section-beige)] py-24 md:py-32">
        <FadeUp className="max-w-content relative mx-auto px-6 text-center md:px-10">
          <SectionLabel>{dict.events.cta.label}</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-[1.12] text-[var(--warm-text)] md:text-5xl">
            {dict.events.cta.title}
            <span className="block italic">{dict.events.cta.titleEmphasis}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-[var(--warm-text-muted)]">
            {dict.events.cta.body}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href={localizePath("/join-us", locale)}>
              {dict.events.cta.primary}
              <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink
              href={localizePath("/gallery", locale)}
              variant="outline"
              className="!border-[var(--warm-border-strong)] !text-[var(--warm-text)]"
            >
              {dict.events.cta.secondary}
            </ButtonLink>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
