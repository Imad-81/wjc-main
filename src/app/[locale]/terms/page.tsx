import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, type Locale } from "@/i18n/config"
import { termsSections } from "@/data/legal"
import LegalPage from "@/components/wjc/legal-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return {
    title: getDictionary(locale).legal.termsTitle,
    alternates: alternatesFor("/terms", locale),
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const dict = getDictionary(locale)

  return (
    <LegalPage
      locale={locale}
      dict={dict}
      title={dict.legal.termsTitle}
      sections={termsSections}
      watermark="約"
    />
  )
}
