import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getDictionary } from "@/i18n"
import { alternatesFor } from "@/i18n/metadata"
import { isLocale, type Locale } from "@/i18n/config"

import Hero from "@/components/wjc/hero"
import AboutSection from "@/components/wjc/sections/about-section"
import PartnersSection from "@/components/wjc/sections/partners-section"
import StatsSection from "@/components/wjc/sections/stats-section"
import EventsSection from "@/components/wjc/sections/events-section"
import TestimonialsSection from "@/components/wjc/sections/testimonials-section"
import FaqSection from "@/components/wjc/sections/faq-section"
import NewsletterSection from "@/components/wjc/sections/newsletter-section"
import FinalCtaSection from "@/components/wjc/sections/final-cta-section"

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

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <AboutSection locale={locale} dict={dict} />
      <StatsSection locale={locale} dict={dict} />
      <PartnersSection locale={locale} dict={dict} />
      <EventsSection locale={locale} dict={dict} />
      <TestimonialsSection locale={locale} dict={dict} />
      <FaqSection locale={locale} dict={dict} />
      <NewsletterSection locale={locale} dict={dict} />
      <FinalCtaSection locale={locale} dict={dict} />
    </>
  )
}
