"use client"

import Link from "next/link"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react"

import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"
import type { SeasonId } from "@/lib/themes"
import { useTheme } from "./theme-provider"
import FurinChimes from "./furin-chimes"

type ParticleType = "none" | "fireflies" | "lanterns" | "sparks" | "seeds"

interface SeasonVisuals {
  overlay: string
  accent: string
  statsBarBg: string
  statsBarBorder: string
  statsText: string
  statsLabel: string
  particleType: ParticleType
  particleColor: string
  shojiPanelBg: string
  shojiBorder: string
}

/**
 * Per-season hero treatment. The layout is identical across all seasons —
 * only colour, overlay and particle behaviour change, so the hero reads as
 * the same place photographed in a different season.
 */
const VISUALS: Record<SeasonId, SeasonVisuals> = {
  original: {
    overlay:
      "linear-gradient(108deg, rgba(5,3,2,0.68) 0%, rgba(5,3,2,0.58) 30%, rgba(5,3,2,0.28) 58%, rgba(5,3,2,0.04) 100%)",
    accent: "#C0392B",
    statsBarBg: "rgba(8,5,3,0.92)",
    statsBarBorder: "rgba(192,57,43,0.20)",
    statsText: "#F5F0E8",
    statsLabel: "rgba(245,240,232,0.48)",
    particleType: "none",
    particleColor: "#C0392B",
    shojiPanelBg: "rgba(18,10,6,0.52)",
    shojiBorder: "rgba(192,57,43,0.30)",
  },
  natsu: {
    overlay:
      "linear-gradient(108deg, rgba(3,5,14,0.68) 0%, rgba(3,5,14,0.59) 30%, rgba(3,5,14,0.28) 58%, rgba(3,5,14,0.04) 100%)",
    accent: "#E85D04",
    statsBarBg: "rgba(3,5,14,0.93)",
    statsBarBorder: "rgba(232,93,4,0.20)",
    statsText: "#F5E6D3",
    statsLabel: "rgba(245,230,211,0.48)",
    particleType: "sparks",
    particleColor: "#FF8C42",
    shojiPanelBg: "rgba(3,5,14,0.52)",
    shojiBorder: "rgba(232,93,4,0.30)",
  },
  tanabata: {
    overlay:
      "linear-gradient(108deg, rgba(2,2,14,0.69) 0%, rgba(2,2,14,0.60) 30%, rgba(2,2,14,0.31) 58%, rgba(2,2,14,0.05) 100%)",
    accent: "#9B59B6",
    statsBarBg: "rgba(2,2,14,0.93)",
    statsBarBorder: "rgba(155,89,182,0.20)",
    statsText: "#E8E4F0",
    statsLabel: "rgba(232,228,240,0.48)",
    particleType: "fireflies",
    particleColor: "#C9B8E8",
    shojiPanelBg: "rgba(2,2,14,0.52)",
    shojiBorder: "rgba(155,89,182,0.30)",
  },
  setsubun: {
    overlay:
      "linear-gradient(108deg, rgba(16,7,3,0.68) 0%, rgba(16,7,3,0.59) 30%, rgba(16,7,3,0.30) 58%, rgba(16,7,3,0.05) 100%)",
    accent: "#C45A1A",
    statsBarBg: "rgba(16,7,3,0.93)",
    statsBarBorder: "rgba(196,90,26,0.20)",
    statsText: "#F5E8D4",
    statsLabel: "rgba(245,232,212,0.48)",
    particleType: "seeds",
    particleColor: "#D4A574",
    shojiPanelBg: "rgba(16,7,3,0.52)",
    shojiBorder: "rgba(196,90,26,0.30)",
  },
  hikari: {
    overlay:
      "linear-gradient(108deg, rgba(2,2,2,0.69) 0%, rgba(2,2,2,0.60) 30%, rgba(2,2,2,0.31) 58%, rgba(2,2,2,0.05) 100%)",
    accent: "#C9A84C",
    statsBarBg: "rgba(2,2,2,0.93)",
    statsBarBorder: "rgba(201,168,76,0.20)",
    statsText: "#F5EED8",
    statsLabel: "rgba(245,238,216,0.48)",
    particleType: "lanterns",
    particleColor: "#C9A84C",
    shojiPanelBg: "rgba(2,2,2,0.52)",
    shojiBorder: "rgba(201,168,76,0.30)",
  },
}

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speedX: number
  speedY: number
  life: number
  maxLife: number
  wobble: number
  wobbleSpeed: number
}

function _StatIcon({ type, color }: { type: string; color: string }) {
  const s: CSSProperties & { stroke: string } = {
    width: 18,
    height: 18,
    stroke: color,
    fill: "none",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }

  if (type === "building")
    return (
      <svg viewBox="0 0 24 24" style={s} aria-hidden="true">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
      </svg>
    )
  if (type === "users")
    return (
      <svg viewBox="0 0 24 24" style={s} aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  if (type === "calendar")
    return (
      <svg viewBox="0 0 24 24" style={s} aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" style={s} aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  )
}

/** Right-hand shoji screen. Identical structure across every season. */
function ShojiPanel({
  accentColor,
  panelBg,
  borderColor,
  kanjiLabel,
}: {
  accentColor: string
  panelBg: string
  borderColor: string
  kanjiLabel: string
}) {
  return (
    <div
      className="absolute bottom-0 right-0 top-0 z-10 hidden lg:block"
      style={{ width: "110px", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: panelBg,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderLeft: `1px solid ${borderColor}`,
          transition: "background-color 0.7s ease, border-color 0.7s ease",
        }}
      />

      {[25, 50, 75].map((pct) => (
        <div
          key={`v-${pct}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${pct}%`,
            width: "1px",
            backgroundColor: borderColor,
            opacity: 0.5,
            transition: "background-color 0.7s ease",
          }}
        />
      ))}

      {[12, 24, 36, 48, 60, 72, 84].map((pct) => (
        <div
          key={`h-${pct}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${pct}%`,
            height: "1px",
            backgroundColor: borderColor,
            opacity: 0.3,
            transition: "background-color 0.7s ease",
          }}
        />
      ))}

      {/* Washi paper cell texture */}
      {[0, 1, 2].map((col) =>
        [0, 1, 2, 3, 4, 5, 6].map((row) => (
          <div
            key={`${col}-${row}`}
            style={{
              position: "absolute",
              left: `${col * 25 + 3}%`,
              top: `${row * 12 + 1.5}%`,
              width: "19%",
              height: "9%",
              backgroundColor: "rgba(255,255,255,0.025)",
              borderRadius: "1px",
            }}
          />
        )),
      )}

      {/* Vertical 和敬清寂 */}
      <div
        style={{
          position: "absolute",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {["和", "敬", "清", "寂"].map((char) => (
          <span
            key={char}
            className="font-jp"
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: accentColor,
              lineHeight: 1,
              writingMode: "vertical-rl",
              textOrientation: "upright",
              opacity: 0.8,
              letterSpacing: "3px",
              transition: "color 0.7s ease",
            }}
          >
            {char}
          </span>
        ))}

        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "18px",
              backgroundColor: accentColor,
              opacity: 0.45,
              transition: "background-color 0.7s ease",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "8px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: accentColor,
              opacity: 0.65,
              transition: "color 0.7s ease",
            }}
          >
            WJC
          </span>
        </div>
      </div>

      {/* Season badge */}
      <div
        style={{
          position: "absolute",
          top: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: `1px solid ${borderColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
          transition: "border-color 0.7s ease",
        }}
      >
        <span
          className="font-jp"
          style={{
            fontSize: kanjiLabel.length > 1 ? "10px" : "16px",
            color: accentColor,
            lineHeight: 1,
            transition: "color 0.7s ease",
          }}
        >
          {kanjiLabel}
        </span>
      </div>
    </div>
  )
}

/**
 * Canvas particle field. Each season has its own behaviour — fireflies drift,
 * lanterns rise, sparks fly upward from the base, seeds fall.
 *
 * Skipped entirely when the visitor prefers reduced motion.
 */
function ParticleSystem({ type, color }: { type: ParticleType; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (type === "none") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const resizeObs = new ResizeObserver(resize)
    resizeObs.observe(canvas)

    const hex = color.startsWith("#") ? color : "#C9B8E8"
    const rgb = {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    }

    const spawn = (): Particle => {
      const maxLife =
        type === "fireflies"
          ? 200 + Math.random() * 140
          : type === "lanterns"
            ? 280 + Math.random() * 180
            : type === "sparks"
              ? 50 + Math.random() * 70
              : 220 + Math.random() * 120

      return {
        x: Math.random() * canvas.width,
        y:
          type === "sparks"
            ? canvas.height * 0.65 + Math.random() * canvas.height * 0.35
            : type === "lanterns"
              ? canvas.height + 12
              : Math.random() * canvas.height,
        size:
          type === "fireflies"
            ? 1.8 + Math.random() * 2.2
            : type === "lanterns"
              ? 5 + Math.random() * 7
              : type === "sparks"
                ? 1.2 + Math.random() * 1.8
                : 1 + Math.random() * 1.8,
        opacity: 0,
        speedX: (Math.random() - 0.5) * (type === "sparks" ? 1.8 : 0.5),
        speedY:
          type === "lanterns"
            ? -(0.25 + Math.random() * 0.45)
            : type === "sparks"
              ? -(0.8 + Math.random() * 2.2)
              : type === "seeds"
                ? 0.15 + Math.random() * 0.35
                : (Math.random() - 0.5) * 0.25,
        life: 0,
        maxLife,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      }
    }

    for (let i = 0; i < 28; i++) {
      const p = spawn()
      p.life = Math.random() * p.maxLife
      p.y = Math.random() * canvas.height
      particlesRef.current.push(p)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (particlesRef.current.length < 40 && Math.random() < 0.12) {
        particlesRef.current.push(spawn())
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++
        p.wobble += p.wobbleSpeed
        p.x += Math.sin(p.wobble) * 0.3 + p.speedX
        p.y += p.speedY

        const progress = p.life / p.maxLife
        const fadeIn = Math.min(progress * 5, 1)
        const fadeOut = Math.max(0, 1 - (progress - 0.72) * 3.5)
        p.opacity = Math.min(fadeIn, fadeOut) * 0.7

        if (type === "fireflies") {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5)
          glow.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity * 0.9})`)
          glow.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity * 0.3})`)
          glow.addColorStop(1, "rgba(0,0,0,0)")
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.9})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2)
          ctx.fill()
        } else if (type === "lanterns") {
          ctx.save()
          ctx.globalAlpha = p.opacity
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5)
          glow.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)`)
          glow.addColorStop(1, "rgba(0,0,0,0)")
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity})`
          ctx.beginPath()
          ctx.ellipse(p.x, p.y, p.size * 0.65, p.size, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = "rgba(255,255,220,0.4)"
          ctx.lineWidth = 0.5
          ctx.stroke()
          ctx.restore()
        } else if (type === "sparks") {
          ctx.save()
          ctx.globalAlpha = p.opacity
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},1)`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`
          ctx.lineWidth = 0.8
          ctx.globalAlpha = p.opacity * 0.35
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.speedX * 10, p.y - p.speedY * 10)
          ctx.stroke()
          ctx.restore()
        } else if (type === "seeds") {
          ctx.save()
          ctx.globalAlpha = p.opacity * 0.8
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},1)`
          ctx.beginPath()
          ctx.ellipse(
            p.x,
            p.y,
            p.size * 0.5,
            p.size * 1.5,
            Math.sin(p.wobble) * 0.5,
            0,
            Math.PI * 2,
          )
          ctx.fill()
          ctx.restore()
        }

        return p.life < p.maxLife
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      resizeObs.disconnect()
      particlesRef.current = []
    }
  }, [type, color])

  if (type === "none") return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[4]"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  )
}

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const { season, seasonId } = useTheme()
  const cfg = VISUALS[seasonId]

  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const rippleIdRef = useRef(0)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  /**
   * Scroll parallax. The distant plate drifts slowly, the gate faster, which
   * separates them in depth as the hero leaves the viewport.
   *
   * The offset eases toward the scroll position rather than tracking it
   * exactly — snapping straight to scrollY reads as juddery, especially on
   * trackpads that emit bursts of small deltas. The loop parks itself once
   * it has caught up so idle scrolling costs nothing.
   *
   * Written as CSS variables rather than inline transforms so the chime host
   * can share the gate's exact offset — the strands are clipped to the gate's
   * archway and must move with it.
   */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let current = 0
    let target = 0

    const apply = (v: number) => {
      section.style.setProperty("--wjc-bg-shift", `${(v * 0.14).toFixed(2)}px`)
      section.style.setProperty("--wjc-gate-shift", `${(v * 0.34).toFixed(2)}px`)
    }

    const step = () => {
      // Slower lerp = silkier glide; no overshoot.
      current += (target - current) * 0.07
      apply(current)
      if (Math.abs(target - current) > 0.05) {
        raf = requestAnimationFrame(step)
      } else {
        apply(target)
        current = target
        raf = 0
      }
    }

    const onScroll = () => {
      const h = section.offsetHeight || 1
      target = Math.min(1, Math.max(0, window.scrollY / h)) * h
      if (!raf) raf = requestAnimationFrame(step)
    }

    onScroll()
    current = target
    apply(current)

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const t = setTimeout(() => {
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, 1100)
    return () => clearTimeout(t)
  }, [])

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const id = rippleIdRef.current++
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1400)
  }, [])

  /** Hero stats bar. Figures reproduced from the approved prototype. */
  const _stats = [
    {
      icon: "building",
      value: "12+",
      label: dict.home.stats.partnerInstitutions,
    },
    { icon: "users", value: "300+", label: dict.home.stats.studentsEngaged },
    { icon: "calendar", value: "08", label: dict.home.stats.annualPrograms },
    { icon: "flag", value: "2019", label: dict.home.stats.established },
  ]

  return (
    <section
      ref={sectionRef}
      className="wjc-hero relative w-full overflow-hidden"
      style={{ cursor: "crosshair" }}
      aria-label={dict.home.metaTitle}
      onClick={handleClick}
    >
      {/* Backdrop — the distant plate, so it parallaxes least. */}
      <div className="wjc-parallax-bg absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- paired with
            the gate layer below; both need identical object-fit behaviour to
            stay in register, which next/image complicates. */}
        <img
          className="wjc-hero-plate"
          src="/images/hero-banner/background.webp"
          alt={
            locale === "ja"
              ? "湾を望む展望台から見た富士山"
              : "Mount Fuji seen across the bay from a hilltop lookout"
          }
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // Y past 50% pulls the plate upward through the crop, lifting the
            // peak and letting more of the near shoreline into the frame.
            objectPosition: "right 60%",
          }}
        />
      </div>

      {/*
        風鈴 — the chimes hang between the backdrop and the gate, clipped to
        the gate's archway. The chime host and the gate plate share one
        parallax offset so the strands stay registered inside the doorway
        however far the page has scrolled.
      */}
      <FurinChimes
        accent={cfg.accent}
        highlight={cfg.particleColor}
      />

      {/* Gate — the near plate. Contained rather than cropped, and inset from
          the top, so the roof clears the navigation. Transparent to pointers
          so the chimes stay reachable through the archway. */}
      <div className="wjc-gate-layer pointer-events-none z-[2]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
        <img
          className="wjc-hero-plate wjc-hero-plate-front"
          src="/images/hero-banner/foreground.webp"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            // X parks the gate on the right edge, clearing the copy column.
            // Y pins its base to the floor of the box, which is the floor of
            // the hero. Landscape is height-bound so the plate already fills
            // the box and Y is a no-op; it only bites on portrait, where
            // `contain` is width-bound and the gate would otherwise float.
            //
            // FurinChimes reads both off this element — see GATE_APERTURE.
            objectPosition: "right bottom",
          }}
        />
      </div>

      {/* Depth grading, above both plates — the scrim has to clear the gate,
          not sit under it, or the headline loses the contrast fight. */}
      <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: cfg.overlay }} />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "260px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(0,0,0,0.18) 100%)",
          }}
        />
      </div>

      <ParticleSystem type={cfg.particleType} color={cfg.particleColor} />

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none absolute z-30"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                border: `1px solid ${cfg.accent}`,
                animation: `wjcWaterRipple 1.4s cubic-bezier(0.2,0.6,0.4,1) ${i * 0.22}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      ))}

      <ShojiPanel
        accentColor={cfg.accent}
        panelBg={cfg.shojiPanelBg}
        borderColor={cfg.shojiBorder}
        kanjiLabel={season.kanji}
      />

      {/* Content */}
      <div
        // Transparent to pointers so the chimes behind the gate stay
        // reachable; the inner block takes events back for its own links.
        className="wjc-hero-content pointer-events-none relative z-20 flex h-full flex-col justify-end"
      >
        <div
          className="wjc-hero-inner"
        >
          <div className="pointer-events-auto" style={{ maxWidth: "560px" }}>
            {/*
              Honours card, sitting above the headline in the copy column.
              Sized by height so its 3:4 cannot push the headline off a short
              hero — see .wjc-hero-honours.
            */}
            <div
              className="wjc-hero-honours fade-up is-visible"
              style={{ marginBottom: "20px", transitionDelay: "0.1s" }}
            >
              {/* `#next` opens the What's Next tab, where this award has its
                  own entry — see the hash handler in events/content.tsx. */}
              <Link
                href={`${localizePath("/events", locale)}#next`}
                className="btn-lift"
                style={{ display: "inline-block" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- sized
                    by height here, which next/image fights. */}
                <img
                  src="/images/hero-banner/toshiba-honours.webp"
                  alt={
                    locale === "ja"
                      ? "ウォクセン大学栄誉 — 東芝トランスミッション＆ディストリビューションシステムズ（インド）会長兼マネージングディレクター、古田博氏。ウォクセン・リーダーシップ・ディスティンクション賞2026受賞。詳細を見る。"
                      : "Woxsen University Honours — Mr. Hiroshi Furuta, Chairman & Managing Director, Toshiba Transmission & Distribution Systems (India) Pvt. Ltd., recipient of the Woxsen Leadership Distinction Award 2026. View details."
                  }
                  style={{
                    display: "block",
                    borderRadius: "2px",
                    // The poster is cream on a dark hero, so it needs no scrim —
                    // just a hairline to stop it floating and a soft drop.
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.48)",
                  }}
                />
              </Link>
            </div>

            <h1
              className="fade-up is-visible font-serif"
              style={{
                fontSize: "clamp(28px, 4.2vw, 54px)",
                fontWeight: 300,
                lineHeight: 1.06,
                letterSpacing: "-0.018em",
                color: "#FFFFFF",
                transitionDelay: "0.18s",
                marginBottom: 0,
              }}
            >
              {dict.home.heroTitle}
            </h1>
            <h1
              className="fade-up is-visible font-serif"
              style={{
                fontSize: "clamp(28px, 4.2vw, 54px)",
                fontWeight: 300,
                lineHeight: 1.06,
                letterSpacing: "-0.018em",
                color: cfg.accent,
                transitionDelay: "0.26s",
                marginBottom: "12px",
                transition: "color 0.7s ease",
              }}
            >
              {dict.home.heroTitleEmphasis}
            </h1>

            <div
              className="fade-up is-visible"
              style={{
                width: "44px",
                height: "1.5px",
                backgroundColor: cfg.accent,
                marginBottom: "20px",
                transitionDelay: "0.32s",
                transition: "background-color 0.7s ease",
              }}
              aria-hidden="true"
            />

            {/*
              Tagline and CTAs share a row so the pair costs one block of
              height instead of two — that reclaimed space goes to the poster
              above. Wraps back to stacked below ~560px of column, which is
              what mobile gets.
            */}
            <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
              <p
                className="fade-up is-visible"
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  flex: "1 1 200px",
                  maxWidth: "340px",
                  color: "rgba(245,242,238,0.76)",
                  transitionDelay: "0.38s",
                  marginBottom: 0,
                  fontWeight: 300,
                  letterSpacing: "0.01em",
                }}
              >
                {dict.home.heroTaglines[seasonId]}
              </p>

              {/* One line. The labels are short enough that a trimmed
                  horizontal padding gets the pair under ~300px, which is what
                  lets them sit beside the tagline in a 560px column. */}
              <div
                className="fade-up is-visible flex flex-nowrap items-center gap-3"
                style={{ transitionDelay: "0.46s", flex: "0 0 auto" }}
              >
                <Link
                  href={localizePath("/jlpt", locale)}
                  className="btn-lift inline-flex items-center gap-3"
                  style={{
                    backgroundColor: cfg.accent,
                    color: "#FFFFFF",
                    padding: "15px 28px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition:
                      "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.7s ease",
                  }}
                >
                  {dict.home.heroCtaPrimary}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>

                <Link
                  href={localizePath("/about", locale)}
                  className="btn-lift inline-flex items-center gap-3"
                  style={{
                    border: "1px solid rgba(245,242,238,0.40)",
                    color: "rgba(245,242,238,0.86)",
                    padding: "15px 28px",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "transform 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  {dict.home.heroCtaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Scroll cue */}
      <div
        ref={scrollRef}
        className="pointer-events-none absolute z-20 hidden lg:block"
        style={{
          bottom: "100px",
          right: "150px",
          transform: "translateY(10px)",
          opacity: 0,
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontSize: "8px",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "var(--font-dm-sans)",
              textTransform: "uppercase",
            }}
          >
            {dict.common.scroll}
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: `linear-gradient(to bottom, ${cfg.accent}90, transparent)`,
              animation: "wjcScrollPulse 2.2s ease infinite",
              transition: "background 0.7s ease",
            }}
          />
        </div>
      </div>
    </section>
  )
}
