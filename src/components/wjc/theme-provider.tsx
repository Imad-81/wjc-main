"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  DEFAULT_SEASON,
  SEASON_CLASSNAMES,
  STORAGE_KEY,
  getSeason,
  isSeasonId,
  type Season,
  type SeasonId,
} from "@/lib/themes"

interface ThemeContextValue {
  season: Season
  seasonId: SeasonId
  setSeason: (id: SeasonId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Applies the seasonal theme class to <html> and persists the choice.
 *
 * The initial paint always uses the default season so server and client
 * markup agree; the stored preference is applied in an effect immediately
 * after hydration. `ThemeScript` below removes the resulting flash.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [seasonId, setSeasonId] = useState<SeasonId>(DEFAULT_SEASON)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isSeasonId(stored)) setSeasonId(stored)
    } catch {
      // localStorage unavailable (private mode, blocked cookies) — keep default.
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove(...SEASON_CLASSNAMES)
    const { className } = getSeason(seasonId)
    if (className) root.classList.add(className)
  }, [seasonId])

  const setSeason = useCallback((id: SeasonId) => {
    setSeasonId(id)
    try {
      window.localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // Preference simply won't persist; the theme still applies this session.
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{ season: getSeason(seasonId), seasonId, setSeason }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>")
  return ctx
}

/**
 * Inlined in <head> so the stored theme class lands on <html> before first
 * paint. Without this the page renders in the default palette for a frame
 * and then snaps to the user's season.
 */
export function ThemeScript() {
  const script = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
    STORAGE_KEY,
  )});var m=${JSON.stringify(
    Object.fromEntries(
      SEASON_CLASSNAMES.map((c) => [c.replace("theme-", ""), c]),
    ),
  )};if(s&&m[s]){document.documentElement.classList.add(m[s])}}catch(e){}})()`

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
