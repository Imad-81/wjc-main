"use client"

import { useCallback, useEffect, useRef } from "react"

/**
 * 風鈴 — hanging character chimes.
 *
 * Each strand carries Japanese characters from poetry clauses hanging down
 * from the Torii crossbeam. Every strand is modeled as a physics-based
 * multi-node Verlet string with distance constraints, tension, gravity, and
 * continuous traveling waves.
 *
 * Strands fluidly move along with the cursor when hovered or swept, parting
 * around it like a bead curtain without sticking or dragging.
 *
 * Rendered using a hardware-accelerated Canvas 2D engine at 60-120 FPS.
 */

const CLAUSES = [
  "古き山寺の鐘は静かに響き、",
  "深い森を渡る風は",
  "四季の香りを運ぶ。",
  "月は雲間より",
  "柔らかな光を注ぎ、",
  "人は花鳥風月の美を",
  "静かに愛でる。",
  "朝霧は湖面に漂い、",
  "鳥居は水辺に佇む。",
  "遠き峰に雪は残り、",
  "春はまた巡り来る。",
]

const STEPS = 16

interface StringNode {
  x: number
  y: number
  px: number
  py: number
  char: string
  energy: number
}

interface Strand {
  nodes: StringNode[]
  pivotX: number
  pivotY: number
  spacing: number
  totalLength: number
  phase: number
  naturalFreq: number
  windSens: number
  ring: number
  lastRing: number
  idx: number
}

interface Ripple {
  x: number
  y: number
  start: number
  duration: number
}

export interface Aperture {
  /** Natural size of the plate the rect was measured against. */
  image: { w: number; h: number }
  /** Archway rect in source pixels. */
  rect: { x: number; y: number; w: number; h: number }
  /** Fallback fit, used only if the plate cannot be read from the DOM. */
  fit: "cover" | "contain"
  /** Fallback object-position X, 0..1. Same caveat. */
  objectPositionX: number
  /** Fallback object-position Y, 0..1. Same caveat. */
  objectPositionY: number
}

/** Class of the gate plate this layer registers against. */
const PLATE_SELECTOR = ".wjc-hero-plate-front"

function parsePosition(value: string, axis: "x" | "y", fallback: number) {
  if (value.endsWith("%")) {
    const n = Number.parseFloat(value)
    return Number.isFinite(n) ? n / 100 : fallback
  }
  if (value === "center") return 0.5
  if (axis === "x") {
    if (value === "left") return 0
    if (value === "right") return 1
  } else {
    if (value === "top") return 0
    if (value === "bottom") return 1
  }
  return fallback
}

export const GATE_APERTURE: Aperture = {
  image: { w: 1536, h: 998 },
  rect: { x: 487, y: 356, w: 562, h: 524 },
  fit: "contain",
  objectPositionX: 1,
  objectPositionY: 1,
}

function buildPalette(_accent: string, _highlight: string) {
  const from: [number, number, number] = [238, 48, 42]   // bright Japanese vermilion #EE302A
  const mid: [number, number, number] = [255, 78, 65]    // radiant vivid red
  const to: [number, number, number] = [255, 145, 120]   // luminous hot red glow
  const out: string[] = []
  for (let i = 0; i < STEPS; i++) {
    const t = i / (STEPS - 1)
    const a = t < 0.5 ? from : mid
    const b = t < 0.5 ? mid : to
    const u = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5
    out.push(
      `rgb(${Math.round(a[0] + (b[0] - a[0]) * u)},${Math.round(
        a[1] + (b[1] - a[1]) * u,
      )},${Math.round(a[2] + (b[2] - a[2]) * u)})`,
    )
  }
  return out
}

export default function FurinChimes({
  accent = "#C0392B",
  highlight = "#E8C271",
  aperture = GATE_APERTURE,
}: {
  accent?: string
  highlight?: string
  aperture?: Aperture
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const strandsRef = useRef<Strand[]>([])
  const ripplesRef = useRef<Ripple[]>([])
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    vx: 0,
    vy: 0,
    active: false,
  })
  const scrollPhysRef = useRef({ prevY: 0, vel: 0, smoothVel: 0 })
  const rafRef = useRef(0)
  const visibleRef = useRef(true)

  const paletteRef = useRef(buildPalette(accent, highlight))
  useEffect(() => {
    paletteRef.current = buildPalette(accent, highlight)
  }, [accent, highlight])

  const positionStage = useCallback(() => {
    const host = hostRef.current
    const stage = stageRef.current
    if (!host || !stage) return false

    const plate = document.querySelector<HTMLImageElement>(PLATE_SELECTOR)
    const box = (plate ?? host).getBoundingClientRect()
    const W = box.width
    const H = box.height
    if (!W || !H) return false

    const { image, rect } = aperture
    const style = plate ? getComputedStyle(plate) : null
    const fit =
      style?.objectFit === "cover" || style?.objectFit === "contain"
        ? style.objectFit
        : aperture.fit
    const axes = style ? style.objectPosition.split(/\s+/) : []
    const positionX = style
      ? parsePosition(axes[0] ?? "", "x", aperture.objectPositionX)
      : aperture.objectPositionX
    const positionY = style
      ? parsePosition(axes[1] ?? "", "y", aperture.objectPositionY)
      : aperture.objectPositionY

    const scale =
      fit === "contain"
        ? Math.min(W / image.w, H / image.h)
        : Math.max(W / image.w, H / image.h)
    const offsetX = (W - image.w * scale) * positionX
    const offsetY = (H - image.h * scale) * positionY

    const hostBox = host.getBoundingClientRect()

    stage.style.left = `${box.left - hostBox.left + offsetX + rect.x * scale}px`
    stage.style.top = `${box.top - hostBox.top + offsetY + rect.y * scale}px`
    stage.style.width = `${rect.w * scale}px`
    stage.style.height = `${rect.h * scale}px`
    return true
  }, [aperture])

  useEffect(() => {
    const host = hostRef.current
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!host || !stage || !canvas) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const build = () => {
      if (!positionStage()) return

      const W = stage.clientWidth
      const H = stage.clientHeight
      if (!W || !H) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)

      // Increased text density with smaller, more delicate typography
      const compact = W < 240
      const size = compact ? 8 : 9.5
      const gap = compact ? 10.5 : 13
      const top = 0
      const usable = W - (compact ? 6 : 10)
      const count = Math.max(5, Math.floor(usable / gap))
      const rightEdge = W - (W - (count - 1) * gap) / 2

      const room = H * 0.98
      const spacing = size * 1.12
      const maxChars = Math.max(6, Math.floor(room / spacing))

      let cursor = 0
      const newStrands: Strand[] = []

      for (let i = 0; i < count; i++) {
        const rr = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1)
        const target = Math.max(6, Math.round(maxChars * (0.8 + rr * 0.2)))

        let text = ""
        while (text.length < target - 2) text += CLAUSES[cursor++ % CLAUSES.length]
        text = text.slice(0, Math.max(target, 6))

        const pivotX = rightEdge - i * gap
        const pivotY = top
        const numNodes = text.length + 2 // 0: anchor, 1..len: chars, len+1: clapper bead

        const nodes: StringNode[] = []
        for (let k = 0; k < numNodes; k++) {
          const char = k === 0 || k === numNodes - 1 ? "" : text[k - 1]
          const y = pivotY + k * spacing
          nodes.push({
            x: pivotX,
            y,
            px: pivotX,
            py: y,
            char,
            energy: 0,
          })
        }

        newStrands.push({
          nodes,
          pivotX,
          pivotY,
          spacing,
          totalLength: (numNodes - 1) * spacing,
          phase: i * 0.32 + rr * 1.2,
          naturalFreq: 0.95 + rr * 0.25,
          windSens: 0.8 + rr * 0.6,
          ring: 0,
          lastRing: 0,
          idx: i,
        })
      }

      strandsRef.current = newStrands
    }

    build()
    void document.fonts?.ready.then(build)

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(host)

    let windPhase = Math.random() * 100
    let last = performance.now()

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick)
      if (!visibleRef.current) {
        last = now
        return
      }

      const dt = Math.min(34, now - last) / 16.667
      last = now
      windPhase += 0.02 * dt

      const m = mouseRef.current
      const palette = paletteRef.current

      // Inertial decay on mouse velocity
      m.vx *= 0.88
      m.vy *= 0.88

      // Scroll velocity impulse
      const sp = scrollPhysRef.current
      sp.smoothVel += (sp.vel - sp.smoothVel) * 0.28
      sp.vel = 0
      sp.smoothVel *= 0.84
      const scrollImpulse =
        Math.abs(sp.smoothVel) > 0.8 ? sp.smoothVel * 0.00008 : 0

      // Physics update for every strand
      for (const s of strandsRef.current) {
        const numNodes = s.nodes.length
        s.ring *= Math.pow(0.97, dt)

        for (let k = 1; k < numNodes; k++) {
          const node = s.nodes[k]
          const depth = k / (numNodes - 1)

          // 1. Continuous sinusoidal S-wave dynamics:
          // A full S-curve requires a ~2.2 * PI spatial frequency along the strand length (depth 0..1),
          // with an upper lobe (0.1..0.45), an inflection point (~0.5), and a lower lobe (0.55..1.0).
          const envelope = Math.pow(depth, 0.48) * (0.7 + 0.3 * depth)
          const sWave1 = Math.sin(windPhase * 1.6 - depth * Math.PI * 2.2 + s.phase) * 0.32
          const sWave2 = Math.sin(windPhase * 2.5 - depth * Math.PI * 3.8 + s.phase * 1.5) * 0.10
          const windMag = reduced ? 0.01 : (sWave1 + sWave2) * envelope * s.windSens

          // Lateral restoring tension towards vertical anchor line
          const restoringX = -(node.x - s.pivotX) * 0.015 * (1 - depth * 0.25)

          // Scroll impulse wave
          const scrollForce =
            scrollImpulse !== 0
              ? scrollImpulse * 320 * Math.sin(s.idx * 0.45 - k * 0.22 + now * 0.003) * (0.25 + depth * 0.75)
              : 0

          // Cursor interaction: fluidly moves along with the cursor, parts around it, zero stickiness!
          let cursorForceX = 0
          if (m.active) {
            const dx = node.x - m.x
            const dy = node.y - m.y
            const dist = Math.hypot(dx, dy)
            const radius = 55
            if (dist < radius) {
              const proximity = 1 - dist / radius
              const f = proximity * proximity // smooth quadratic falloff

              // Repulsion AWAY from cursor (strings part around the cursor like beads)
              const dirX = Math.abs(dx) > 1 ? dx / dist : (m.vx ? Math.sign(m.vx) : (node.x >= s.pivotX ? 1 : -1))
              const repel = dirX * f * 3.4

              // Wake force: carries the string in the direction the cursor is sweeping
              const wake = m.vx * f * 0.38

              cursorForceX = repel + wake

              // Excitation glow
              node.energy = Math.min(1, node.energy + f * 0.65)
              s.ring = Math.min(1, s.ring + f * 0.4)
              if (now - s.lastRing > 100) {
                s.lastRing = now
              }
            }
          }

          // Ambient excitement from wave motion
          const motionGlow = Math.abs(windMag) * 2.2
          node.energy = Math.min(1, node.energy * Math.pow(0.965, dt) + motionGlow * 0.04)

          // Verlet integration
          const vx = (node.x - node.px) * 0.945
          const vy = (node.y - node.py) * 0.945
          node.px = node.x
          node.py = node.y

          node.x += vx + (windMag + restoringX + scrollForce + cursorForceX) * dt
          node.y += vy + 0.38 * dt // downward gravity maintains string tension
        }

        // Diffuse excitation glow to neighbor nodes
        for (let k = 1; k < numNodes - 1; k++) {
          const avg = (s.nodes[k - 1].energy + s.nodes[k + 1].energy) * 0.5
          s.nodes[k].energy += (avg - s.nodes[k].energy) * 0.1 * dt
        }

        // Verlet distance constraints (Relaxation iterations to ensure rope inextensibility)
        const stiffness = 0.94
        for (let iter = 0; iter < 4; iter++) {
          s.nodes[0].x = s.pivotX
          s.nodes[0].y = s.pivotY

          for (let k = 0; k < numNodes - 1; k++) {
            const n1 = s.nodes[k]
            const n2 = s.nodes[k + 1]
            const dx = n2.x - n1.x
            const dy = n2.y - n1.y
            const dist = Math.hypot(dx, dy)
            if (dist > 0.0001) {
              const diff = (dist - s.spacing) / dist
              if (k === 0) {
                n2.x -= dx * diff * stiffness
                n2.y -= dy * diff * stiffness
              } else {
                const half = diff * 0.5 * stiffness
                n1.x += dx * half
                n1.y += dy * half
                n2.x -= dx * half
                n2.y -= dy * half
              }
            }
          }
        }

        // Gentle curvature damping (smooths sharp angles into organic string bends)
        for (let k = 1; k < numNodes - 1; k++) {
          const midX = (s.nodes[k - 1].x + s.nodes[k + 1].x) * 0.5
          s.nodes[k].x += (midX - s.nodes[k].x) * 0.055 * dt
        }
      }

      // ── Canvas 2D Rendering ──────────────────────────────────────────────
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const W = stage.clientWidth
        const H = stage.clientHeight
        const dpr = Math.min(window.devicePixelRatio || 1, 2)

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, W, H)

        const compact = W < 240
        const fontSize = compact ? 8 : 9.5

        ctx.font = `600 ${fontSize}px var(--font-noto-sans-jp), "Noto Sans JP", sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Draw each string strand
        for (const s of strandsRef.current) {
          const nodes = s.nodes
          const numNodes = nodes.length
          if (numNodes < 3) continue

          // 1. Draw smooth continuous spline string cord
          ctx.beginPath()
          ctx.moveTo(nodes[0].x, nodes[0].y)
          for (let k = 1; k < numNodes - 1; k++) {
            const xc = (nodes[k].x + nodes[k + 1].x) * 0.5
            const yc = (nodes[k].y + nodes[k + 1].y) * 0.5
            ctx.quadraticCurveTo(nodes[k].x, nodes[k].y, xc, yc)
          }
          ctx.lineTo(nodes[numNodes - 1].x, nodes[numNodes - 1].y)
          ctx.lineWidth = 0.8
          ctx.strokeStyle = `rgba(238, 48, 42, ${(0.32 + s.ring * 0.35).toFixed(2)})`
          ctx.stroke()

          // 2. Draw Japanese glyphs along the string curve
          for (let k = 1; k < numNodes - 1; k++) {
            const n = nodes[k]
            if (!n.char) continue

            const prev = nodes[k - 1]
            const next = nodes[k + 1]
            const dx = next.x - prev.x
            const dy = next.y - prev.y
            // Counter-clockwise rotation aligns glyph vertical axis with string
            const angle = -Math.atan2(dx, dy)
            const clampedAngle = Math.max(-0.4, Math.min(0.4, angle))

            ctx.save()
            ctx.translate(n.x, n.y)
            ctx.rotate(clampedAngle)

            const tone = Math.min(STEPS - 1, Math.round(n.energy * (STEPS - 1)))
            ctx.fillStyle = palette[tone]

            if (n.energy > 0.22) {
              ctx.shadowColor = palette[tone]
              ctx.shadowBlur = n.energy * 6
            }

            ctx.fillText(n.char, 0, 0)
            ctx.restore()
          }

          // 3. Draw clapper weight / bead at the bottom
          const tail = nodes[numNodes - 1]
          ctx.save()
          ctx.beginPath()
          ctx.arc(tail.x, tail.y, 2.0, 0, Math.PI * 2)
          ctx.fillStyle = palette[Math.min(STEPS - 1, Math.round(s.ring * (STEPS - 1)))]
          if (s.ring > 0.2) {
            ctx.shadowColor = palette[STEPS - 1]
            ctx.shadowBlur = s.ring * 6
          }
          ctx.fill()
          ctx.restore()
        }

        // Draw interactive click ripples
        const ripples = ripplesRef.current
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r]
          const p = (now - rip.start) / rip.duration
          if (p >= 1) {
            ripples.splice(r, 1)
            continue
          }
          const radius = p * 110
          const alpha = (1 - p) * 0.5
          ctx.save()
          ctx.beginPath()
          ctx.arc(rip.x, rip.y, radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(238, 48, 42, ${alpha.toFixed(3)})`
          ctx.lineWidth = 1.0
          ctx.stroke()
          ctx.restore()
        }
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    let resizeTimer = 0
    const onResize = () => {
      positionStage()
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 180)
    }
    window.addEventListener("resize", onResize)

    const ro = new ResizeObserver(onResize)
    ro.observe(host)

    // Global pointer move listener ensures uninterrupted tracking across the archway
    const onWindowPointerMove = (e: PointerEvent) => {
      const stageEl = stageRef.current
      if (!stageEl || !visibleRef.current) return
      const rect = stageEl.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const m = mouseRef.current
      // Track within archway and surrounding margin
      if (x >= -40 && x <= rect.width + 40 && y >= -20 && y <= rect.height + 40) {
        if (m.x < -1000) {
          m.prevX = x
          m.prevY = y
        } else {
          m.prevX = m.x
          m.prevY = m.y
        }
        m.vx = x - m.prevX
        m.vy = y - m.prevY
        m.x = x
        m.y = y
        m.active = true
      } else {
        m.active = false
        m.x = -9999
        m.y = -9999
      }
    }
    window.addEventListener("pointermove", onWindowPointerMove, { passive: true })

    const onScrollPhys = () => {
      const sp = scrollPhysRef.current
      const y = window.scrollY
      sp.vel += y - sp.prevY
      sp.prevY = y
    }
    scrollPhysRef.current.prevY = window.scrollY
    window.addEventListener("scroll", onScrollPhys, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", onScrollPhys)
      window.removeEventListener("pointermove", onWindowPointerMove)
      ro.disconnect()
      io.disconnect()
      strandsRef.current = []
      ripplesRef.current = []
    }
  }, [positionStage])

  // ── Pointer Interaction ──────────────────────────────────────────────────
  const handleDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top

    // Add visual ripple
    ripplesRef.current.push({
      x: cx,
      y: cy,
      start: performance.now(),
      duration: 750,
    })

    // Send radial shockwave pulse to nearby strings (velocity impulse)
    const now = performance.now()
    for (const s of strandsRef.current) {
      for (let k = 1; k < s.nodes.length; k++) {
        const node = s.nodes[k]
        const dx = node.x - cx
        const dy = node.y - cy
        const dist = Math.hypot(dx, dy)
        if (dist < 150) {
          const push = (1 - dist / 150) * 2.4
          node.px -= Math.sign(dx || 1) * push
          node.energy = Math.min(1, node.energy + (1 - dist / 150) * 0.8)
          s.ring = Math.min(1, s.ring + (1 - dist / 150) * 0.5)
        }
      }
      if (now - s.lastRing > 90) {
        s.lastRing = now
      }
    }
  }, [])

  return (
    <div ref={hostRef} className="wjc-chime-host" aria-hidden="true">
      <div
        ref={stageRef}
        className="wjc-chime-stage"
        onPointerDown={handleDown}
      >
        <canvas
          ref={canvasRef}
          className="wjc-chime-canvas"
        />
      </div>
    </div>
  )
}
