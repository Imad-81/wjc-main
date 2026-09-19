"use client"

import { useEffect } from "react"
import type { Locale } from "@/i18n/config"

export default function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang = ${JSON.stringify(locale)};`,
      }}
    />
  )
}
