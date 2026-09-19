"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import AppImage from "@/components/wjc/app-image"
import { useReveal } from "@/components/wjc/use-reveal"
import {
  galleryImages,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export default function GalleryGrid({
  locale,
  dict,
  items,
}: {
  locale: Locale
  dict: Dictionary
  items?: GalleryItem[]
}) {
  const sectionRef = useReveal<HTMLElement>(60, 0.05)
  const [active] = useState<"all" | GalleryCategory>("all")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const imageList = items && items.length > 0 ? items : galleryImages

  const filtered = useMemo(
    () =>
      active === "all"
        ? imageList
        : imageList.filter((item) => item.category === active),
    [active, imageList],
  )

  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? null : i === 0 ? filtered.length - 1 : i - 1,
      ),
    [filtered.length],
  )
  const next = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? null : i === filtered.length - 1 ? 0 : i + 1,
      ),
    [filtered.length],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [lightbox, close, prev, next])

  const current = lightbox !== null ? filtered[lightbox] : null

  return (
    <>
      <section
        ref={sectionRef}
        style={{ backgroundColor: "#F8F7F4", padding: "80px 0 140px" }}
        aria-labelledby="gallery-heading"
      >
        <div className="max-w-content mx-auto px-8">
          <h2 id="gallery-heading" className="sr-only">
            {dict.gallery.metaTitle}
          </h2>



          {/* Masonry grid */}
          <div className="masonry-gallery" role="list">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="fade-up masonry-item"
                style={{
                  opacity: 0,
                  transitionDelay: `${(i % 6) * 0.06}s`,
                  breakInside: "avoid",
                  marginBottom: "16px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setLightbox(i)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setLightbox(i)
                  }
                }}
                aria-label={`${item.title[locale]} — ${item.date[locale]}`}
              >
                <div
                  className="image-hover-zoom"
                  style={{
                    aspectRatio:
                      item.span === "tall"
                        ? "3/4"
                        : item.span === "wide"
                          ? "16/9"
                          : "4/3",
                    overflow: "hidden",
                  }}
                >
                  <AppImage
                    src={item.src}
                    alt={item.alt[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={72}
                    className="object-cover"
                  />
                </div>

                <div
                  className="gallery-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)",
                    opacity: 0,
                    transition: "opacity 0.35s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--theme-accent)",
                      marginBottom: "4px",
                    }}
                  >
                    {item.date[locale]}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#F7F5F0",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title[locale]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {current && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.title[locale]}
        >
          <button
            onClick={close}
            aria-label={dict.gallery.close}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "none",
              color: "rgba(247,245,240,0.6)",
              fontSize: "28px",
              cursor: "pointer",
              lineHeight: 1,
              padding: "8px",
            }}
          >
            ×
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label={dict.gallery.previous}
            style={{
              position: "absolute",
              left: "24px",
              background: "none",
              border: "none",
              color: "rgba(247,245,240,0.6)",
              fontSize: "32px",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            ‹
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "90vw",
              maxWidth: "1100px",
              height: "80vh",
            }}
          >
            <AppImage
              src={current.src}
              alt={current.alt[locale]}
              fill
              sizes="90vw"
              quality={88}
              className="object-contain"
              style={{ objectFit: "contain" }}
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label={dict.gallery.next}
            style={{
              position: "absolute",
              right: "24px",
              background: "none",
              border: "none",
              color: "rgba(247,245,240,0.6)",
              fontSize: "32px",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            ›
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "28px",
              textAlign: "center",
              width: "100%",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#F7F5F0",
                marginBottom: "4px",
              }}
            >
              {current.title[locale]}
            </div>
            <div
              className="font-mono"
              style={{ fontSize: "11px", color: "rgba(247,245,240,0.45)" }}
            >
              {lightbox !== null ? lightbox + 1 : 0} / {filtered.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
