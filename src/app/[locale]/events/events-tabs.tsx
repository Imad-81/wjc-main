"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { MapPin } from "lucide-react"

import Tabs, { type TabDefinition } from "@/components/wjc/tabs"
import ComingSoon from "@/components/wjc/coming-soon"
import { pastEvents, type Event, type EventTab } from "@/data/events"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

/**
 * Past-events browser.
 *
 * The Centre replaced the prototype's six category chips with four editorial
 * tabs. The written content for each tab is still being prepared, so a tab
 * with no matching events shows a placeholder rather than an empty grid.
 */
export default function EventsTabs({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const [active, setActive] = useState<EventTab>("culture")

  const tabs: TabDefinition[] = [
    {
      id: "culture",
      label: dict.events.tabs.culture,
      blurb: dict.events.tabs.cultureBlurb,
    },
    {
      id: "delegations",
      label: dict.events.tabs.delegations,
      blurb: dict.events.tabs.delegationsBlurb,
    },
    {
      id: "outreach",
      label: dict.events.tabs.outreach,
      blurb: dict.events.tabs.outreachBlurb,
    },
    {
      id: "next",
      label: dict.events.tabs.next,
      blurb: dict.events.tabs.nextBlurb,
    },
  ]

  const visible: Event[] = pastEvents.filter((event) => event.tab === active)

  return (
    <Tabs
      tabs={tabs}
      active={active}
      onChange={(id) => setActive(id as EventTab)}
      className="mt-10"
    >
      {visible.length === 0 ? (
        <div className="mt-10">
          <ComingSoon
            locale={locale}
            kanji="祭"
            note={tabs.find((t) => t.id === active)?.blurb}
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-px border border-[var(--theme-divider)] bg-[var(--theme-divider)] md:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <article
              key={event.slug}
              className="group section-bg flex flex-col p-7"
            >
              <div className="image-hover-zoom relative aspect-[16/10] overflow-hidden">
                <Image
                  src={event.images[0]}
                  alt={event.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--theme-accent)]">
                {event.category[locale]}
              </p>

              <h3 className="mt-3 font-serif text-2xl text-[var(--theme-ivory)]">
                {event.title[locale]}
              </h3>

              <time
                dateTime={event.isoDate}
                className="mt-2 block text-xs text-[var(--theme-muted-text)]"
              >
                {event.displayDate[locale]}
              </time>

              <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--theme-muted-text)]">
                {event.description[locale]}
              </p>

              {event.location && (
                <p className="mt-5 flex items-center gap-2 text-xs text-[var(--theme-muted-text)]">
                  <MapPin
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-[var(--theme-accent)]"
                  />
                  {event.location[locale]}
                </p>
              )}

              <Link
                href={localizePath(`/events/${event.slug}`, locale)}
                className="mt-6 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.16em] text-[var(--theme-accent)] transition-opacity hover:opacity-70"
              >
                {dict.common.viewDetails}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </Tabs>
  )
}
