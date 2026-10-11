import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { LOCALES, isLocale, localizePath, type Locale } from "@/i18n/config"
import { getEventBySlug as getDbEventBySlug } from "@/lib/db/events"
import { pastEvents } from "@/data/events"

import FadeUp from "@/components/wjc/fade-up"
import { KanjiGhost, SectionLabel } from "@/components/wjc/primitives"

import { prisma } from "@/lib/prisma"

export async function generateStaticParams() {
  try {
    const dbEvents = await prisma.event.findMany({
      select: { slug: true },
    })
    const slugs = dbEvents.length > 0 ? dbEvents.map((e) => e.slug) : pastEvents.map((e) => e.slug)
    return LOCALES.flatMap((locale) =>
      slugs.map((slug) => ({ locale, slug })),
    )
  } catch {
    return LOCALES.flatMap((locale) =>
      pastEvents.map((event) => ({ locale, slug: event.slug })),
    )
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const event = await getDbEventBySlug(slug)
  if (!event) return {}

  return {
    title: event.title[locale],
    description: event.description[locale],
    alternates: alternatesFor(`/events/${slug}`, locale),
    openGraph: {
      title: event.title[locale],
      description: event.description[locale],
      images: event.images[0] ? [event.images[0]] : undefined,
    },
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const dict = getDictionary(locale)

  const event = await getDbEventBySlug(slug)
  if (!event) notFound()

  const hero = event.images?.[0] || "/images/events/kizuna-matsuri/1.webp"
  const rest = (event.images || []).slice(1)

  const meta = [
    { icon: Calendar, label: dict.events.detail.date, value: event.displayDate[locale] },
    event.location && {
      icon: MapPin,
      label: dict.events.detail.location,
      value: event.location[locale],
    },
    event.time && {
      icon: Clock,
      label: dict.events.detail.time,
      value: event.time[locale],
    },
  ].filter(Boolean) as { icon: typeof Calendar; label: string; value: string }[]

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt={event.title[locale]}
            fill
            priority
            sizes="100vw"
            quality={82}
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, var(--theme-hero-overlay) 10%, rgba(20,18,16,0.55) 60%, rgba(20,18,16,0.30) 100%)",
            }}
          />
        </div>

        <div className="max-w-content relative mx-auto w-full px-6 pb-20 pt-36 md:px-10">
          <Link
            href={localizePath("/events", locale)}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--theme-muted-text)] transition-colors hover:text-[var(--theme-accent)]"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            {dict.events.detail.backToEvents}
          </Link>

          <p className="section-label mt-8">{event.category[locale]}</p>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] text-[var(--theme-ivory)] md:text-6xl">
            {event.title[locale]}
          </h1>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {meta.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <item.icon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[var(--theme-accent)]"
                />
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.22em] text-[var(--theme-muted-text)]">
                    {item.label}
                  </dt>
                  <dd className="text-[13px] text-[var(--theme-ivory)]">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Body */}
      <section className="section-bg relative overflow-hidden py-24 md:py-32">
        <KanjiGhost char="記" className="-left-8 top-10" />

        <div className="max-w-content relative mx-auto px-6 md:px-10">
          <FadeUp className="max-w-3xl">
            <SectionLabel>{dict.events.detail.about}</SectionLabel>
            <div className="mt-8 space-y-5">
              {event.fullDescription[locale]
                .split("\n\n")
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p
                    key={i}
                    className="whitespace-pre-line text-sm leading-[1.95] text-[var(--theme-muted-text)] md:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Photo set */}
      {rest.length > 0 && (
        <section className="relative bg-[var(--section-paper)] py-24 md:py-32">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <FadeUp>
              <SectionLabel>{dict.events.detail.gallery}</SectionLabel>
            </FadeUp>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((src, index) => (
                <FadeUp
                  key={src}
                  delay={((index % 3) + 1) as 1 | 2 | 3}
                  className="image-hover-zoom relative aspect-[4/3] overflow-hidden bg-[var(--section-beige)]"
                >
                  <Image
                    src={src}
                    alt={`${event.title[locale]} — ${index + 2}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={74}
                    className="object-cover"
                  />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
