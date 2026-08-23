"use client"

import { useId, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface TabDefinition {
  id: string
  label: string
  /** Short descriptive line shown under the tab strip once selected. */
  blurb?: string
}

/**
 * Filter-chip tab strip. Controlled — the parent owns the active id so the
 * selection can drive filtering elsewhere on the page.
 */
export default function Tabs({
  tabs,
  active,
  onChange,
  className,
  children,
}: {
  tabs: TabDefinition[]
  active: string
  onChange: (id: string) => void
  className?: string
  children?: ReactNode
}) {
  const baseId = useId()
  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div className={className}>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel`}
              onClick={() => onChange(tab.id)}
              className={cn(
                "border px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] transition-colors",
                isActive
                  ? "border-[var(--theme-accent)] text-[var(--theme-accent)]"
                  : "border-[var(--theme-border-light)] text-[var(--theme-muted-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text)]",
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab?.blurb && (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--theme-muted-text)]">
          {activeTab.blurb}
        </p>
      )}

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
      >
        {children}
      </div>
    </div>
  )
}
