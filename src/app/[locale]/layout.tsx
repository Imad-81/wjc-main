import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

import { LOCALES, isLocale, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n"
import Navigation from "@/components/wjc/navigation"
import Footer from "@/components/wjc/footer"
import LoadingScreen from "@/components/wjc/loading-screen"
import ThemeSwitcher from "@/components/wjc/theme-switcher"
import { ThemeProvider } from "@/components/wjc/theme-provider"
import LocaleHtmlLang from "@/components/wjc/locale-html-lang"

const SITE_URL = "https://japancentre.woxsen.edu.in"

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${dict.home.metaTitle} | ${locale === "ja" ? "Woxsen Japan Centre" : "ウォクセン日本センター"}`,
      template: `%s | ${dict.home.metaTitle}`,
    },
    description: dict.home.metaDescription,
    // Canonical/hreflang are deliberately NOT set here — they must be
    // per-page. See `alternatesFor()` in src/i18n/metadata.ts.
    openGraph: {
      type: "website",
      siteName: dict.home.metaTitle,
      locale: locale === "ja" ? "ja_JP" : "en_IN",
      images: ["/assets/images/app_logo.webp"],
    },
    icons: {
      icon: "/images/logos/white-logo.png",
      apple: "/images/logos/white-logo.png",
    },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#232323",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const locale = raw as Locale
  const dict = getDictionary(locale)

  return (
    <ThemeProvider>
      <LocaleHtmlLang locale={locale} />
      <LoadingScreen locale={locale} />
      <Navigation locale={locale} dict={dict} />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
      <ThemeSwitcher locale={locale} />
    </ThemeProvider>
  )
}

