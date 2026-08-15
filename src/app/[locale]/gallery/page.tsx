import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, type Locale } from "@/i18n/config"

import PageHeader from "@/components/wjc/page-header"
import GalleryGrid from "./gallery-grid"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.gallery.metaTitle,
    description: dict.gallery.metaDescription,
    alternates: alternatesFor("/gallery", locale),
  }
}

export default async function GalleryPage({
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
        label={dict.gallery.heroLabel}
        title={dict.gallery.heroTitle}
        titleEmphasis={dict.gallery.heroTitleEmphasis}
        subtitle={dict.gallery.heroSubtitle}
        image="/images/hero/hero6.webp"
        imageAlt={
          locale === "ja"
            ? "ウォクセン日本センターの活動風景"
            : "Woxsen Japan Centre activities"
        }
        watermark="写真"
      />

      {/*
        The category sub-tabs from the prototype were removed at the Centre's
        request — this is a single unfiltered archive.
      */}
      <section className="relative bg-[var(--section-paper)] py-20 md:py-24">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <GalleryGrid locale={locale} dict={dict} />
        </div>
      </section>
    </>
  )
}
