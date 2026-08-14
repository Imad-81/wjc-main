"use client"

import { useEffect, useState } from "react"
import type { Locale } from "@/i18n/config"

const SESSION_KEY = "wjc-splash-shown"

/**
 * Intro splash: accent rule, 絆 in Noto Serif JP, accent rule, label.
 * The CSS animation fades it out at 2.2s; this unmounts it just after so it
 * stops trapping pointer events.
 *
 * Shown once per browser session — replaying it on every route change (as the
 * previous implementation did) made in-site navigation feel broken.
 */
export default function LoadingScreen({ locale }: { locale: Locale }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let alreadyShown = false
    try {
      alreadyShown = window.sessionStorage.getItem(SESSION_KEY) === "1"
    } catch {
      // sessionStorage blocked — fall through and show the splash.
    }

    if (alreadyShown) return

    // Honour reduced-motion by skipping the splash entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1")
      } catch {}
      return
    }

    setShow(true)
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1")
    } catch {}

    const timer = window.setTimeout(() => setShow(false), 2900)
    return () => window.clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <span aria-hidden="true" className="loading-scroll-top" />
      <span aria-hidden="true" className="loading-kanji">
        絆
      </span>
      <span aria-hidden="true" className="loading-scroll-bottom" />
      <span className="loading-text">
        {locale === "ja" ? "ウォクセン日本センター" : "Woxsen Japan Centre"}
      </span>
    </div>
  )
}
