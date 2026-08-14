"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FadeUpProps {
  children: ReactNode
  /** Stagger step, 1–5, mapped to the .fade-up-delay-* classes. */
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  className?: string
  as?: ElementType
}

/**
 * Reveals its children once they scroll into view by adding `.is-visible`.
 * Reveal is one-way — elements stay visible after the first intersection.
 */
export default function FadeUp({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Already in view on mount (above the fold) — reveal without waiting.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn(
        "fade-up",
        delay > 0 && `fade-up-delay-${delay}`,
        visible && "is-visible",
        className,
      )}
    >
      {children}
    </Tag>
  )
}
