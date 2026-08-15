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

import CountUp from "@/components/ui/count-up"
import { localizePath, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"
import type { SeasonId } from "@/lib/themes"
import { useTheme } from "./theme-provider"

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
      "linear-gradient(108deg, rgba(5,3,2,0.94) 0%, rgba(5,3,2,0.80) 30%, rgba(5,3,2,0.40) 58%, rgba(5,3,2,0.06) 100%)",
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
      "linear-gradient(108deg, rgba(3,5,14,0.95) 0%, rgba(3,5,14,0.82) 30%, rgba(3,5,14,0.40) 58%, rgba(3,5,14,0.06) 100%)",
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
      "linear-gradient(108deg, rgba(2,2,14,0.96) 0%, rgba(2,2,14,0.84) 30%, rgba(2,2,14,0.44) 58%, rgba(2,2,14,0.08) 100%)",
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
      "linear-gradient(108deg, rgba(16,7,3,0.95) 0%, rgba(16,7,3,0.82) 30%, rgba(16,7,3,0.42) 58%, rgba(16,7,3,0.08) 100%)",
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
      "linear-gradient(108deg, rgba(2,2,2,0.96) 0%, rgba(2,2,2,0.84) 30%, rgba(2,2,2,0.44) 58%, rgba(2,2,2,0.08) 100%)",
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

function StatIcon({ type, color }: { type: string; color: string }) {
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
      className="pointer-events-none absolute inset-0 z-10"
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
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    setImgLoaded(false)
  }, [seasonId])

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

  /**
   * Hero stats. Per HOME.pdf this is the only stats block on the page — the
   * prototype's two other instances were removed — and it carries the
   * odometer count-up.
   */
  const stats = [
    { icon: "flag", value: "2025", label: dict.home.stats.inaugurated },
    { icon: "users", value: "7+", label: dict.home.stats.faculty },
    { icon: "building", value: "18+", label: dict.home.stats.studentLeaders },
    { icon: "calendar", value: "150+", label: dict.home.stats.members },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "720px", cursor: "crosshair" }}
      aria-label={dict.home.metaTitle}
      onClick={handleClick}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- cross-fading
            between five season images; next/image adds no benefit here and
            complicates the opacity transition. */}
        <img
          src={season.hero}
          alt={
            locale === "ja"
              ? "ウォクセン日本センターの中庭 — 季節ごとの表情"
              : "Woxsen Japan Centre architectural courtyard — the same location across all seasonal themes"
          }
          onLoad={() => setImgLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 38%",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.9s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: cfg.overlay }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "220px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)",
          }}
          aria-hidden="true"
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
        className="relative z-20 flex h-full flex-col justify-center"
        style={{
          paddingTop: "72px",
          paddingBottom: "110px",
          paddingRight: "130px",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 52px",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: "560px" }}>
            {/*
              The prototype's "Woxsen University · Japan Centre" eyebrow was
              removed at the Centre's request (HOME.pdf §A).
            */}

            <h1
              className="fade-up is-visible font-serif"
              style={{
                fontSize: "clamp(44px, 5vw, 68px)",
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
                fontSize: "clamp(44px, 5vw, 68px)",
                fontWeight: 300,
                lineHeight: 1.06,
                letterSpacing: "-0.018em",
                color: cfg.accent,
                transitionDelay: "0.26s",
                marginBottom: "16px",
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
                marginBottom: "30px",
                transitionDelay: "0.32s",
                transition: "background-color 0.7s ease",
              }}
              aria-hidden="true"
            />

            <p
              className="fade-up is-visible"
              style={{
                fontSize: "15px",
                lineHeight: 1.85,
                maxWidth: "400px",
                color: "rgba(245,242,238,0.76)",
                transitionDelay: "0.38s",
                marginBottom: "48px",
                fontWeight: 300,
                letterSpacing: "0.01em",
              }}
            >
              {dict.home.heroTaglines[seasonId]}
            </p>

            <div
              className="fade-up is-visible flex flex-wrap gap-4"
              style={{ transitionDelay: "0.46s" }}
            >
              <Link
                href={localizePath("/jlpt", locale)}
                className="btn-lift inline-flex items-center gap-3"
                style={{
                  backgroundColor: cfg.accent,
                  color: "#FFFFFF",
                  padding: "15px 36px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
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
                  padding: "15px 36px",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  transition: "transform 0.25s ease, border-color 0.25s ease",
                }}
              >
                {dict.home.heroCtaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          backgroundColor: cfg.statsBarBg,
          borderTop: `1px solid ${cfg.statsBarBorder}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transition: "background-color 0.7s ease, border-color 0.7s ease",
        }}
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 52px",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "0 18px",
                height: "84px",
                borderRight:
                  i < stats.length - 1
                    ? `1px solid ${cfg.statsBarBorder}`
                    : "none",
                transition: "border-color 0.7s ease",
              }}
            >
              <div style={{ flexShrink: 0, opacity: 0.8 }}>
                <StatIcon type={stat.icon} color={cfg.accent} />
              </div>
              <div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: "21px",
                    fontWeight: 400,
                    color: cfg.statsText,
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    transition: "color 0.7s ease",
                  }}
                >
                  <CountUp end={stat.value} duration={1800} />
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: cfg.statsLabel,
                    letterSpacing: "0.07em",
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 400,
                    marginTop: "2px",
                    transition: "color 0.7s ease",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollRef}
        className="absolute z-20 hidden lg:block"
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
