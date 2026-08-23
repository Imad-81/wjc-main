"use client"

import { useEffect, useRef } from "react"

/**
 * Staggered scroll reveal.
 *
 * Returns a ref to attach to a section. Once that section intersects, every
 * descendant carrying `.fade-up` gets `.is-visible` added in sequence.
 *
 * Sections set inline `opacity: 0` on their `.fade-up` elements so nothing
 * flashes before hydration — which is why `.fade-up.is-visible` carries
 * `!important` in globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  stagger = 120,
  threshold = 0.15,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target
            .querySelectorAll(".fade-up")
            .forEach((child, i) =>
              setTimeout(() => child.classList.add("is-visible"), i * stagger),
            )
          observer.unobserve(entry.target)
        })
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stagger, threshold])

  return ref
}
