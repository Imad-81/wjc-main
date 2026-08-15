import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, localizePath, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

import { partners } from "@/data/partners"
import { testimonials } from "@/data/testimonials"
import { centreFaqs } from "@/data/faqs"
import { pastEvents } from "@/data/events"

import Hero from "@/components/wjc/hero"
import StatBar from "@/components/wjc/stat-bar"
import FadeUp from "@/components/wjc/fade-up"
import Accordion from "@/components/wjc/accordion"
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
  return { alternates: alternatesFor("/", locale) }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const dict = getDictionary(locale)

  const featuredEvents = pastEvents.slice(0, 3)

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <StatBar dict={dict} />

      {/* ── About ─────────────────────────────────────────────────────── */}
      <section className="section-bg relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="橋" className="-left-10 top-10" />

        <div className="max-w-content relative mx-auto grid gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <SectionLabel>{dict.home.about.label}</SectionLabel>

            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
              {dict.home.about.title}
              <span className="block italic">
                {dict.home.about.titleEmphasis}
              </span>
            </h2>

            <AccentRule className="mt-7" />

            {/* Justified per the Centre's specification. */}
            <p className="mt-7 text-justify text-sm leading-[1.9] text-[var(--theme-muted-text)] md:text-[15px]">
              {dict.home.about.body}
            </p>

            <div className="mt-10">
              <ButtonLink
                href={localizePath("/about", locale)}
                variant="outline"
              >
                {dict.home.about.cta}
                <span aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </FadeUp>

          <FadeUp delay={2} className="flex flex-col gap-5">
            <div className="image-hover-zoom relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/others/woxsen-japan-center.jpg"
                alt={
                  locale === "ja"
                    ? "ウォクセン日本センターの活動風景"
                    : "Woxsen Japan Centre activities on campus"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Director pull-quote */}
            <blockquote className="washi-glass p-7">
              <p className="font-serif text-xl italic leading-snug text-[var(--theme-ivory)]">
                “{dict.home.about.quote}”
              </p>
              <footer className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--theme-accent)]">
                  {dict.home.about.quoteAuthor}
                </p>
                <p className="mt-1 text-[11px] text-[var(--theme-muted-text)]">
                  {dict.home.about.quoteRole}
                </p>
              </footer>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* ── Partnerships ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-wood)] py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="section-label !text-[rgba(35,35,35,0.55)]">
                {dict.home.partners.label}
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--wood-text)] md:text-5xl">
                {dict.home.partners.title}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--wood-text-muted)] lg:pb-2">
              {dict.home.partners.subtitle}
            </p>
          </FadeUp>

          <div className="mt-14 grid gap-px border border-[var(--wood-border)] bg-[var(--wood-border)] md:grid-cols-3">
            {partners.map((partner, index) => (
              <FadeUp
                key={partner.id}
                delay={((index + 1) % 5) as 1 | 2 | 3}
                className="bg-[var(--section-wood)] p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center bg-[rgba(248,247,244,0.9)] p-2">
                  <Image
                    src={partner.logo}
                    alt=""
                    aria-hidden="true"
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>

                <h3 className="mt-6 font-serif text-2xl text-[var(--wood-text)]">
                  {partner.name[locale]}
                </h3>
                <p className="mt-1 text-xs text-[var(--wood-text-muted)]">
                  {partner.location[locale]}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-[rgba(35,35,35,0.78)]">
                  {partner.description[locale]}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {partner.benefits[locale].map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-[13px] text-[rgba(35,35,35,0.82)]"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-[#7A2E22]"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/*
                  Nara Japan Hub has no public URL from the Centre yet, so the
                  link is omitted rather than rendered as a dead anchor.
                */}
                {partner.url && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 border-b border-[rgba(35,35,35,0.3)] pb-1 text-[11px] uppercase tracking-[0.16em] text-[var(--wood-text)] transition-colors hover:border-[#7A2E22] hover:text-[#7A2E22]"
                  >
                    {dict.common.visitWebsite}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ────────────────────────────────────────────────────── */}
      <section className="section-bg-alt relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="祭" className="-right-8 top-16" />

        <div className="max-w-content relative mx-auto px-6 md:px-10">
          <FadeUp className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>{dict.home.events.label}</SectionLabel>
              <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
                {dict.home.events.title}
                <span className="block italic">
                  {dict.home.events.titleEmphasis}
                </span>
              </h2>
            </div>

            <Link
              href={localizePath("/events", locale)}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--theme-muted-text)] transition-colors hover:text-[var(--theme-accent)]"
            >
              {dict.common.allEvents}
              <span aria-hidden="true">→</span>
            </Link>
          </FadeUp>

          <div className="mt-14 grid gap-px border border-[var(--theme-divider)] bg-[var(--theme-divider)] md:grid-cols-3">
            {featuredEvents.map((event, index) => {
              const [month, day] = event.displayDate.en.split(" ")
              const year = event.isoDate.slice(0, 4)

              return (
                <FadeUp
                  key={event.slug}
                  delay={((index + 1) % 5) as 1 | 2 | 3}
                  className="group section-bg-alt flex flex-col p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--theme-muted-text)]">
                        {month.slice(0, 3)} {year}
                      </p>
                      <p className="mt-2 font-serif text-4xl text-[var(--theme-ivory)]">
                        {day.replace(",", "").padStart(2, "0")}
                      </p>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--theme-accent)]">
                      {event.category[locale].split("|")[0].trim()}
                    </p>
                  </div>

                  <div className="image-hover-zoom relative mt-7 aspect-[16/10] overflow-hidden">
                    <Image
                      src={event.images[0]}
                      alt={event.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl text-[var(--theme-ivory)]">
                    {event.title[locale]}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--theme-muted-text)]">
                    {event.description[locale]}
                  </p>

                  <Link
                    href={localizePath(`/events/${event.slug}`, locale)}
                    className="mt-7 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.16em] text-[var(--theme-accent)] transition-opacity hover:opacity-70"
                  >
                    {dict.common.viewDetails}
                    <span aria-hidden="true">→</span>
                  </Link>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-paper)] py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp className="text-center">
            <p className="section-label">{dict.home.testimonials.label}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--warm-text)] md:text-5xl">
              {dict.home.testimonials.title}
              <span className="block italic">
                {dict.home.testimonials.titleEmphasis}
              </span>
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <FadeUp
                key={testimonial.id}
                delay={((index + 1) % 5) as 1 | 2 | 3}
                as="figure"
                className="flex flex-col border border-[var(--warm-border)] bg-white/40 p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl leading-none text-[var(--theme-accent)] opacity-40"
                >
                  “
                </span>
                <blockquote className="mt-4 flex-1 text-sm leading-[1.85] text-[rgba(35,35,35,0.82)]">
                  {testimonial.quote[locale]}
                </blockquote>
                <figcaption className="mt-6 border-t border-[var(--warm-border)] pt-5">
                  <p className="text-sm text-[var(--warm-text)]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--warm-text-muted)]">
                    {testimonial.affiliation[locale]}
                  </p>
                </figcaption>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-bg relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="問" className="-left-8 bottom-0" />

        <div className="max-w-content relative mx-auto grid gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <FadeUp>
            <SectionLabel>{dict.home.faq.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
              {dict.home.faq.title}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--theme-muted-text)]">
              {dict.home.faq.subtitle}
            </p>
            <a
              href={`mailto:${dict.common.email}`}
              className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--theme-accent)] transition-opacity hover:opacity-70"
            >
              {dict.common.email}
              <span aria-hidden="true">→</span>
            </a>
          </FadeUp>

          <FadeUp delay={1}>
            <Accordion
              items={centreFaqs.map((faq) => ({
                question: faq.question[locale],
                answer: faq.answer[locale],
              }))}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── Newsletter / contact ──────────────────────────────────────── */}
      <section className="section-bg-alt relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="連" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        <FadeUp className="max-w-content relative mx-auto px-6 text-center md:px-10">
          <SectionLabel>{dict.home.newsletter.label}</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
            {dict.home.newsletter.title}
            <span className="block italic">
              {dict.home.newsletter.titleEmphasis}
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-[var(--theme-muted-text)]">
            {dict.home.newsletter.body}
          </p>

          {/*
            The prototype had a subscribe form with no backend — it silently
            discarded input. Until a mailing-list endpoint exists this is a
            plain mailto so the action actually does something.
          */}
          <div className="mt-10">
            <ButtonLink href={`mailto:${dict.common.email}`}>
              {dict.home.newsletter.cta}
              <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
