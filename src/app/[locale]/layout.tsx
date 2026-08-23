import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Cormorant_Garamond, DM_Mono, DM_Sans, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google"

import { LOCALES, isLocale, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n"
import Navigation from "@/components/wjc/navigation"
import Footer from "@/components/wjc/footer"
import LoadingScreen from "@/components/wjc/loading-screen"
import ThemeSwitcher from "@/components/wjc/theme-switcher"
import { ThemeProvider, ThemeScript } from "@/components/wjc/theme-provider"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  weight: ["300", "400", "500"],
  display: "swap",
})

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700"],
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  display: "swap",
})

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
    <html
      lang={locale}
      className={`${dmSans.variable} ${cormorant.variable} ${notoSerifJp.variable} ${notoSansJp.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider>
          <LoadingScreen locale={locale} />
          <Navigation locale={locale} dict={dict} />
          <main id="main">{children}</main>
          <Footer locale={locale} dict={dict} />
          <ThemeSwitcher locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  )
}
