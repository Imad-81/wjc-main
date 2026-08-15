"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { useReveal } from "../use-reveal"
import { impactStats, type ImpactStat } from "@/data/membership-tiers"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let frame = 0

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [start, target, duration])

  return count
}

function StatItem({
  stat,
  locale,
  animate,
}: {
  stat: ImpactStat
  locale: Locale
  animate: boolean
}) {
  const count = useCountUp(stat.value, 1800, animate)

  return (
    <div className="flex flex-col items-center px-8 text-center" style={{ flex: 1 }}>
      <p
        className="font-serif"
        style={{
          fontSize: "clamp(48px, 4.5vw, 68px)",
          fontWeight: 300,
          color: "#232323",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          marginBottom: "12px",
        }}
      >
        {stat.prefix}
        {animate ? count : 0}
        {stat.suffix}
      </p>
      <p
        style={{
          fontSize: "12px",
          letterSpacing: "0.12em",
          color: "#5B5B5B",
          textTransform: "uppercase",
          fontWeight: 400,
          lineHeight: 1.5,
        }}
      >
        {stat.label[locale]}
      </p>
    </div>
  )
}

export default function StatsSection({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const sectionRef = useReveal<HTMLElement>(100, 0.3)
  const [animate, setAnimate] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="theme-transition relative"
      style={{
        background: "#F8F7F4",
        padding: "100px 0",
        borderTop: "1px solid rgba(35,35,35,0.08)",
        borderBottom: "1px solid rgba(35,35,35,0.08)",
      }}
      aria-label={dict.home.impact.label}
    >
      <div className="max-w-content mx-auto px-8">
        <div className="mb-12 text-center">
          <span className="section-label" style={{ color: "var(--theme-accent)" }}>
            {dict.home.impact.label}
          </span>
        </div>

        <div
          ref={innerRef}
          className="fade-up"
          style={{
            opacity: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {impactStats.map((stat, index) => (
            <Fragment key={stat.label.en}>
              <StatItem stat={stat} locale={locale} animate={animate} />
              {index < impactStats.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "60px",
                    backgroundColor: "rgba(35,35,35,0.12)",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
