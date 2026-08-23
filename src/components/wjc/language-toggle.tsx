"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { localizePath, type Locale } from "@/i18n/config"

/**
 * EN/JA switch. Renders as a link to the same page in the other language so
 * it works without JavaScript and is crawlable as a real alternate URL.
 */
export default function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/"
  const target: Locale = locale === "en" ? "ja" : "en"

  return (
    <Link
      href={localizePath(pathname, target)}
      hrefLang={target}
      aria-label={
        locale === "en" ? "日本語に切り替える" : "Switch to English"
      }
      className="inline-flex items-center gap-1.5 border border-[var(--theme-border-light)] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--theme-ivory)] transition-colors hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)]"
    >
      <Globe aria-hidden="true" className="size-3" />
      <span className={locale === "en" ? "font-jp" : undefined}>
        {locale === "en" ? "日本語" : "EN"}
      </span>
    </Link>
  )
}
