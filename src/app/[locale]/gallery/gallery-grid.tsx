"use client"

import Image from "next/image"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { galleryImages } from "@/data/gallery"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

const GAP = 16

/**
 * Virtualised photo grid.
 *
 * Uses the *window* virtualizer rather than an element scroller: the page
 * scrolls the document body, so there is no inner scroll container to
 * measure against.
 *
 * The Centre asked for the category sub-tabs to be removed, so this is a
 * single unfiltered set.
 */
export default function GalleryGrid({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(4)
  const [offset, setOffset] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  // Responsive column count.
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setColumns(w < 640 ? 2 : w < 1024 ? 3 : 4)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // The virtualizer needs the grid's offset from the top of the document.
  useLayoutEffect(() => {
    const update = () => {
      if (listRef.current) {
        setOffset(listRef.current.getBoundingClientRect().top + window.scrollY)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [columns])

  const rowCount = Math.ceil(galleryImages.length / columns)

  // Square-ish cells: row height tracks the column width.
  const estimateRowHeight = useCallback(() => {
    const width = listRef.current?.offsetWidth ?? 1200
    const cell = (width - GAP * (columns - 1)) / columns
    return cell + GAP
  }, [columns])

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: estimateRowHeight,
    overscan: 3,
    scrollMargin: offset,
  })

  const close = useCallback(() => setSelected(null), [])
  const previous = useCallback(
    () =>
      setSelected((i) =>
        i === null ? null : i === 0 ? galleryImages.length - 1 : i - 1,
      ),
    [],
  )
  const next = useCallback(
    () =>
      setSelected((i) =>
        i === null ? null : i === galleryImages.length - 1 ? 0 : i + 1,
      ),
    [],
  )

  // Lightbox keyboard controls + scroll lock.
  useEffect(() => {
    if (selected === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") previous()
      if (e.key === "ArrowRight") next()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [selected, close, previous, next])

  return (
    <>
      <p className="mb-8 font-mono text-[11px] tracking-[0.2em] text-[var(--theme-muted-text)]">
        {galleryImages.length} {dict.gallery.imageCount}
      </p>

      <div
        ref={listRef}
        style={{ height: virtualizer.getTotalSize(), position: "relative" }}
      >
        {virtualizer.getVirtualItems().map((row) => {
          const start = row.index * columns
          const items = galleryImages.slice(start, start + columns)

          return (
            <div
              key={row.key}
              data-index={row.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${row.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  gap: GAP,
                  paddingBottom: GAP,
                }}
              >
                {items.map((image, i) => {
                  const index = start + i
                  return (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setSelected(index)}
                      className="image-hover-zoom group relative aspect-square overflow-hidden bg-[var(--section-beige)]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt[locale]}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading="lazy"
                        quality={72}
                        className="object-cover"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[rgba(20,18,16,0.35)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={galleryImages[selected].alt[locale]}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(20,18,16,0.96)] p-4"
        >
          <button
            type="button"
            onClick={close}
            aria-label={dict.gallery.close}
            className="absolute right-5 top-5 text-[var(--theme-ivory)] transition-colors hover:text-[var(--theme-accent)]"
          >
            <X aria-hidden="true" className="size-6" />
          </button>

          <button
            type="button"
            onClick={previous}
            aria-label={dict.gallery.previous}
            className="absolute left-4 text-[var(--theme-ivory)] transition-colors hover:text-[var(--theme-accent)] md:left-8"
          >
            <ChevronLeft aria-hidden="true" className="size-8" />
          </button>

          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={galleryImages[selected].src}
              alt={galleryImages[selected].alt[locale]}
              fill
              sizes="100vw"
              quality={88}
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={next}
            aria-label={dict.gallery.next}
            className="absolute right-4 text-[var(--theme-ivory)] transition-colors hover:text-[var(--theme-accent)] md:right-8"
          >
            <ChevronRight aria-hidden="true" className="size-8" />
          </button>

          <p className="absolute bottom-6 font-mono text-[11px] tracking-[0.2em] text-[var(--theme-muted-text)]">
            {selected + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </>
  )
}
