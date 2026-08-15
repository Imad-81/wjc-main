import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowUpRight, Check } from "lucide-react"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, localizePath, type Locale } from "@/i18n/config"
import {
  REGISTRATION_FORMS,
  joinSteps,
  membershipBenefits,
  tiers,
} from "@/data/membership"
import { testimonials } from "@/data/testimonials"
import { joinFaqs } from "@/data/faqs"

import PageHeader from "@/components/wjc/page-header"
import FadeUp from "@/components/wjc/fade-up"
import Accordion from "@/components/wjc/accordion"
import InterestPanel from "./interest-panel"
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
    title: dict.joinUs.metaTitle,
    description: dict.joinUs.metaDescription,
    alternates: alternatesFor("/join-us", locale),
  }
}

export default async function JoinUsPage({
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
        label={dict.joinUs.heroLabel}
        title={dict.joinUs.heroTitle}
        titleEmphasis={dict.joinUs.heroTitleEmphasis}
        subtitle={dict.joinUs.heroSubtitle}
        image="/images/hero/hero4.webp"
        imageAlt={
          locale === "ja"
            ? "ウォクセン日本センターの学生コミュニティ"
            : "Students at a Woxsen Japan Centre event"
        }
        watermark="参"
        actions={
          <>
            <ButtonLink href={`${localizePath("/join-us", locale)}#apply`}>
              {dict.joinUs.heroCtaPrimary}
              <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink
              href={`${localizePath("/join-us", locale)}#tiers`}
              variant="outline"
            >
              {dict.joinUs.heroCtaSecondary}
            </ButtonLink>
          </>
        }
      />

      {/* ── Benefits ──────────────────────────────────────────────────── */}
      <section className="section-bg relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="縁" className="-left-8 top-12" />

        <div className="max-w-content relative mx-auto px-6 md:px-10">
          <FadeUp className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <SectionLabel>{dict.joinUs.benefits.label}</SectionLabel>
              <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
                {dict.joinUs.benefits.title}
                <span className="block italic">
                  {dict.joinUs.benefits.titleEmphasis}
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--theme-muted-text)] lg:pb-2">
              {dict.joinUs.benefits.subtitle}
            </p>
          </FadeUp>

          <div className="mt-14 grid gap-px border border-[var(--theme-divider)] bg-[var(--theme-divider)] md:grid-cols-2 lg:grid-cols-3">
            {membershipBenefits.map((benefit, index) => (
              <FadeUp
                key={benefit.kanji}
                delay={((index % 3) + 1) as 1 | 2 | 3}
                className="group section-bg relative overflow-hidden p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-jp absolute -top-2 right-4 text-6xl text-[var(--theme-accent)] opacity-10 transition-opacity group-hover:opacity-20"
                >
                  {benefit.kanji}
                </span>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="font-jp block text-2xl text-[var(--theme-accent)]"
                  >
                    {benefit.kanji}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl text-[var(--theme-ivory)]">
                    {benefit.title[locale]}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--theme-muted-text)]">
                    {benefit.description[locale]}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Progression tiers ─────────────────────────────────────────── */}
      <section
        id="tiers"
        className="relative scroll-mt-20 overflow-hidden bg-[var(--section-beige)] py-24 md:py-32"
      >
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <SectionLabel>{dict.joinUs.tiers.label}</SectionLabel>
              <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--warm-text)] md:text-5xl">
                {dict.joinUs.tiers.title}
                <span className="block italic">
                  {dict.joinUs.tiers.titleEmphasis}
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--warm-text-muted)] lg:pb-2">
              {dict.joinUs.tiers.subtitle}
            </p>
          </FadeUp>

          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier, index) => (
              <FadeUp
                key={tier.name}
                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                className="group flex flex-col border border-[var(--warm-border)] bg-[rgba(248,247,244,0.55)] p-8 transition-colors hover:border-[var(--theme-accent)]"
              >
                <span
                  aria-hidden="true"
                  className="font-jp text-3xl text-[var(--theme-accent)]"
                >
                  {tier.kanji}
                </span>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--warm-text-muted)]">
                  {dict.joinUs.tiers.level} {tier.level}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-[var(--warm-text)]">
                  {tier.name}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--theme-accent)]">
                  {tier.title[locale]}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-[var(--warm-text-muted)]">
                  {tier.description[locale]}
                </p>

                <div className="mt-6 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--warm-text-muted)]">
                    {dict.joinUs.apply.benefitsHeading}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {tier.benefits[locale].map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[var(--warm-text)]"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-[var(--theme-accent)]"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-[var(--warm-border)] pt-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--warm-text-muted)]">
                    {dict.joinUs.tiers.requirement}
                  </p>
                  <p className="mt-2 text-[13px] text-[var(--warm-text)]">
                    {tier.requirement[locale]}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Member voices ─────────────────────────────────────────────── */}
      <section className="section-bg-alt relative overflow-hidden py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp className="text-center">
            <SectionLabel>{dict.home.testimonials.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
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
                delay={((index % 3) + 1) as 1 | 2 | 3}
                as="figure"
                className="washi-glass flex flex-col p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl leading-none text-[var(--theme-accent)] opacity-50"
                >
                  “
                </span>
                <blockquote className="mt-4 flex-1 text-sm leading-[1.85] text-[rgba(248,247,244,0.78)]">
                  {testimonial.quote[locale]}
                </blockquote>
                <figcaption className="mt-6 border-t border-[var(--theme-divider)] pt-5">
                  <p className="text-sm text-[var(--theme-ivory)]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--theme-muted-text)]">
                    {testimonial.affiliation[locale]}
                  </p>
                </figcaption>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to join ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-paper)] py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp>
            <SectionLabel>{dict.joinUs.steps.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--warm-text)] md:text-5xl">
              {dict.joinUs.steps.title}
              <span className="block italic">
                {dict.joinUs.steps.titleEmphasis}
              </span>
            </h2>
          </FadeUp>

          <ol className="mt-14 grid gap-px border border-[var(--warm-border)] bg-[var(--warm-border)] sm:grid-cols-2 lg:grid-cols-4">
            {joinSteps.map((step, index) => (
              <FadeUp
                key={step.number}
                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="bg-[var(--section-paper)] p-8"
              >
                <p className="font-serif text-4xl text-[var(--theme-accent)] opacity-40">
                  {step.number}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-[var(--warm-text)]">
                  {step.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--warm-text-muted)]">
                  {step.description[locale]}
                </p>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Apply ─────────────────────────────────────────────────────── */}
      <section
        id="apply"
        className="section-bg relative scroll-mt-20 overflow-hidden py-24 md:py-32"
      >
        <KanjiGhost
          char="申"
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="max-w-content relative mx-auto px-6 md:px-10">
          <FadeUp className="text-center">
            <SectionLabel>{dict.joinUs.apply.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl text-[var(--theme-ivory)] md:text-5xl">
              {dict.joinUs.apply.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--theme-muted-text)]">
              {dict.joinUs.apply.body}
            </p>
          </FadeUp>

          <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
            {[
              {
                title: dict.joinUs.apply.communityTitle,
                body: dict.joinUs.apply.communityBody,
                benefits: dict.joinUs.apply.communityBenefits,
                cta: dict.joinUs.apply.communityCta,
                href: REGISTRATION_FORMS.community,
                kanji: "和",
              },
              {
                title: dict.joinUs.apply.courseTitle,
                body: dict.joinUs.apply.courseBody,
                benefits: dict.joinUs.apply.courseBenefits,
                cta: dict.joinUs.apply.courseCta,
                href: REGISTRATION_FORMS.jlptCourse,
                kanji: "語",
              },
            ].map((card, index) => (
              <FadeUp
                key={card.title}
                delay={((index % 2) + 1) as 1 | 2}
                className="washi-glass-dark glass-reflection flex flex-col p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-jp text-3xl text-[var(--theme-accent)]"
                >
                  {card.kanji}
                </span>
                <h3 className="mt-5 font-serif text-2xl text-[var(--theme-ivory)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--theme-muted-text)]">
                  {card.body}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {card.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-[13px] text-[rgba(248,247,244,0.78)]"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-[var(--theme-accent)]"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em]"
                >
                  {card.cta}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={2} className="mt-14">
            <InterestPanel dict={dict} />
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-bg-alt relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="問" className="-right-6 bottom-0" />

        <div className="max-w-content relative mx-auto grid gap-12 px-6 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <FadeUp>
            <SectionLabel>{dict.joinUs.faq.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
              {dict.joinUs.faq.title}
              <span className="block italic">
                {dict.joinUs.faq.titleEmphasis}
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={1}>
            <Accordion
              items={joinFaqs.map((faq) => ({
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
