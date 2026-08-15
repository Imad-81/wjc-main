import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, type Locale } from "@/i18n/config"
import ProgramsContent from "./content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.programs.metaTitle,
    description: dict.programs.metaDescription,
    alternates: alternatesFor("/programs", locale),
  }
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  return <ProgramsContent locale={locale} dict={getDictionary(locale)} />
}
