import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, type Locale } from "@/i18n/config"
import JlptContent from "./content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.jlpt.metaTitle,
    description: dict.jlpt.metaDescription,
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

  return <JlptContent locale={locale} dict={getDictionary(locale)} />
}
