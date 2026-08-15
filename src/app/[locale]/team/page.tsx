import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, localizePath, type Locale } from "@/i18n/config"
import { faculty, studentLeadership, type TeamMember } from "@/data/team"

import PageHeader from "@/components/wjc/page-header"
import FadeUp from "@/components/wjc/fade-up"
import { ButtonLink, KanjiGhost, SectionLabel } from "@/components/wjc/primitives"
import { cn } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.team.metaTitle, description: dict.team.metaDescription,
    alternates: alternatesFor("/team", locale),
  }
}

function MemberCard({
  member,
  locale,
  dark,
}: {
  member: TeamMember
  locale: Locale
  dark?: boolean
}) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--section-wood)]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-cover object-top transition-transform duration-700",
            member.scale ?? "",
            member.hoverScale ?? "group-hover:scale-[1.04]",
            member.position ?? "",
          )}
        />
        {/* Corner bracket accent on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 size-5 border-l border-t border-[var(--theme-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <h3
        className={cn(
          "mt-5 font-serif text-xl",
          dark ? "text-[var(--theme-ivory)]" : "text-[var(--warm-text)]",
        )}
      >
        {member.name}
      </h3>
      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--theme-accent)]">
        {member.role[locale]}
      </p>
      <p
        className={cn(
          "mt-1 text-xs",
          dark ? "text-[var(--theme-muted-text)]" : "text-[var(--warm-text-muted)]",
        )}
      >
        {member.subtitle[locale]}
      </p>
    </div>
  )
}

export default async function TeamPage({
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
        label={dict.team.heroLabel}
        title={dict.team.heroTitle}
        titleEmphasis={dict.team.heroTitleEmphasis}
        subtitle={dict.team.heroSubtitle}
        image="/images/hero/hero5.webp"
        imageAlt={
          locale === "ja"
            ? "ウォクセン日本センターのメンバー"
            : "The Woxsen Japan Centre community"
        }
        watermark="人"
      />

      {/*
        The prototype's standalone "Director" hero section was removed at the
        Centre's request; the Director now appears within Faculty & Leadership.
      */}

      {/* ── Faculty & Leadership ──────────────────────────────────────── */}
      <section className="section-bg relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="師" className="-left-8 top-12" />

        <div className="max-w-content relative mx-auto px-6 md:px-10">
          <FadeUp>
            <SectionLabel>{dict.team.faculty.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl text-[var(--theme-ivory)] md:text-5xl">
              {dict.team.faculty.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((member, index) => (
              <FadeUp key={member.id} delay={((index % 3) + 1) as 1 | 2 | 3}>
                <MemberCard member={member} locale={locale} dark />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Student community ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--section-beige)] py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <FadeUp className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <SectionLabel>{dict.team.students.label}</SectionLabel>
              <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[var(--warm-text)] md:text-5xl">
                {dict.team.students.title}
                <span className="block italic">
                  {dict.team.students.titleEmphasis}
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--warm-text-muted)] lg:pb-2">
              {dict.team.students.body}
            </p>
          </FadeUp>

          {/*
            Three department heads (Media & Promotion, Outreach & Partnerships,
            Creative Studio) are intentionally omitted — the Centre is
            supplying replacements for those roles.
          */}
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {studentLeadership.map((member, index) => (
              <FadeUp key={member.id} delay={((index % 3) + 1) as 1 | 2 | 3}>
                <MemberCard member={member} locale={locale} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/*
        The prototype's "How We're Organized" structure section was removed
        at the Centre's request.
      */}

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="section-bg-alt relative overflow-hidden py-24 md:py-32">
        <KanjiGhost
          char="参"
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <FadeUp className="max-w-content relative mx-auto px-6 text-center md:px-10">
          <SectionLabel>{dict.team.cta.label}</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-[1.12] text-[var(--theme-ivory)] md:text-5xl">
            {dict.team.cta.title}
            <span className="block italic">{dict.team.cta.titleEmphasis}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-[1.9] text-[var(--theme-muted-text)]">
            {dict.team.cta.body}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href={localizePath("/join-us", locale)}>
              {dict.team.cta.primary}
              <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink href={localizePath("/about", locale)} variant="outline">
              {dict.team.cta.secondary}
            </ButtonLink>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
