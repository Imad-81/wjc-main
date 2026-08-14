"use client"

import { useEffect, useRef, useState } from "react"
import { SEASONS } from "@/lib/themes"
import { useTheme } from "./theme-provider"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

/**
 * Floating seasonal-theme picker, pinned bottom-right on every page.
 * Collapsed it is a single accent square showing 祭; expanded it lists
 * the five seasons.
 */
export default function ThemeSwitcher({ locale }: { locale: Locale }) {
  const { seasonId, setSeason } = useTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-2"
    >
      {open && (
        <div className="washi-glass-dark shoji-enter min-w-[190px] p-2">
          <p className="section-label px-3 pb-2 pt-1">
            {locale === "ja" ? "季節のテーマ" : "Seasonal Theme"}
          </p>
          <ul>
            {SEASONS.map((season) => {
              const active = season.id === seasonId
              return (
                <li key={season.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSeason(season.id)
                      setOpen(false)
                    }}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2 text-left transition-colors",
                      active
                        ? "bg-[var(--theme-tag-bg)] text-[var(--theme-accent)]"
                        : "text-[var(--theme-muted-text)] hover:text-[var(--theme-ivory)]",
                    )}
                  >
                    <span className="font-jp text-base leading-none">
                      {season.kanji}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.14em]">
                      {season.label[locale]}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={
          locale === "ja" ? "季節のテーマを選ぶ" : "Choose seasonal theme"
        }
        className="btn-accent lantern-glow flex h-10 w-10 items-center justify-center"
      >
        <span className="font-jp text-lg leading-none">祭</span>
      </button>
    </div>
  )
}
