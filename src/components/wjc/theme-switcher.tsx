"use client"

import { useEffect, useRef, useState } from "react"
import { SEASONS } from "@/lib/themes"
import { useTheme } from "./theme-provider"
import type { Locale } from "@/i18n/config"

export default function ThemeSwitcher({ locale }: { locale: Locale }) {
  const { season, seasonId, setSeason } = useTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click / Escape — the prototype leaves the panel open.
  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
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
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
      role="region"
      aria-label={locale === "ja" ? "季節のテーマ切り替え" : "Seasonal theme switcher"}
    >
      {open && (
        <div
          style={{
            background: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "20px",
            minWidth: "200px",
            animation: "wjcFadeInUp 0.25s ease",
          }}
          role="listbox"
          aria-label={locale === "ja" ? "季節のテーマを選択" : "Select seasonal theme"}
        >
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            {locale === "ja" ? "季節のテーマ" : "Seasonal Theme"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {SEASONS.map((theme) => {
              const isActive = seasonId === theme.id
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setSeason(theme.id)
                    setOpen(false)
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 10px",
                    background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    transition: "background 0.2s ease",
                  }}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent"
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: theme.swatch,
                      border: isActive
                        ? `1.5px solid ${theme.accent}`
                        : "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <span
                      className="font-jp"
                      style={{
                        fontSize: theme.kanji.length > 1 ? "9px" : "13px",
                        color: theme.accent,
                        lineHeight: 1,
                      }}
                    >
                      {theme.kanji}
                    </span>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                        fontWeight: isActive ? 500 : 400,
                        fontFamily: "var(--font-dm-sans)",
                        lineHeight: 1.2,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {theme.label[locale]}
                    </p>
                    <p
                      className="font-jp"
                      style={{
                        fontSize: "10px",
                        color: isActive ? theme.accent : "rgba(255,255,255,0.3)",
                        marginTop: "2px",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {theme.labelJp}
                    </p>
                  </div>

                  {isActive && (
                    <div
                      style={{
                        marginLeft: "auto",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: theme.accent,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "rgba(10,10,10,0.88)",
          border: `1px solid ${open ? season.accent : "rgba(255,255,255,0.15)"}`,
          color: open ? season.accent : "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition:
            "border-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
        aria-label={
          open
            ? locale === "ja"
              ? "テーマ切り替えを閉じる"
              : "Close theme switcher"
            : locale === "ja"
              ? "テーマ切り替えを開く"
              : "Open theme switcher"
        }
        aria-expanded={open}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        <span
          className="font-jp"
          style={{
            fontSize: season.kanji.length > 1 ? "11px" : "16px",
            color: season.accent,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {season.kanji}
        </span>
      </button>
    </div>
  )
}
