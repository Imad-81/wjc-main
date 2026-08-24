"use client"

import { useCallback, useEffect, useRef } from "react"

/**
 * 風鈴 — hanging character chimes.
 *
 * Each strand carries one clause of the poem, set vertically, and swings as a
 * single pendulum hinged at the beam. Sweeping the cursor across a strand
 * whips it and lights the glyphs.
 *
 * Ported from a standalone page into a contained layer, with three changes
 * the page version did not need:
 *
 * · Positioned inside the host element rather than fixed to the viewport.
 * · The rAF loop stops when the hero scrolls out of view, so the rest of the
 *   page does not pay for animation nobody can see.
 * · Everything unwinds on unmount — the original assumed it owned the page.
 *
 * The prototype's bell synthesis is deliberately absent: the hero has no
 * audio control, and sound a visitor cannot silence is worse than none.
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

interface Glyph {
  el: HTMLElement
  d: number
  e: number
  tone: number
  /** Lateral displacement from strand axis (chain physics). */
  lx: number
  /** Lateral velocity. */
  lv: number
  /** Last X written to DOM — dirty-check to skip redundant writes. */
  wx: number
  /** Last tilt written to DOM — dirty-check. */
  wt: number
}

interface Strand {
  el: HTMLDivElement
  chars: Glyph[]
  tail: HTMLSpanElement
  len: number
  pivotX: number
  pivotY: number
  a: number
  v: number
  k: number
  damp: number
  windSens: number
  contact: boolean
  lastRing: number
  ring: number
  /** Pre-stored build index — avoids O(n) indexOf every frame. */
  idx: number
}

/**
 * Excitement ramp. Stays in the red family end to end — a resting glyph is a
 * deep, dim red and an excited one is a hot red, rather than travelling to
 * gold as the original did.
 */
function buildPalette(_accent: string, _highlight: string) {
  // Rich, bright reddish ramp from vibrant ruby-vermilion to luminous scarlet glow
  const from: [number, number, number] = [238, 48, 42]   // bright Japanese vermilion
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

/**
 * The torii's open span, measured from the alpha channel of foreground.webp
 * (source 1536×1024). The chimes are clipped to this rectangle so they hang
 * inside the gateway and nowhere else.
 */
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

/**
 * Resolves one `object-position` component to a 0..1 fraction. Computed
 * style hands back percentages in every current engine, but keywords are
 * cheap to accept and a px value has no meaningful fraction without knowing
 * the overflow, so that falls back to the configured value.
 */
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
  // The top edge is tucked up into the lower crossbeam (nuki, y 332–392) so
  // the strands read as hanging from behind it rather than starting in mid
  // air — the gate plate sits above this layer and masks the overlap. The
  // pillars splay outward as they descend (inner edges 479→459 left,
  // 1056→1070 right), so the rect stays inside the narrowest part of the span.
  image: { w: 1536, h: 998 },
  rect: { x: 487, y: 356, w: 562, h: 524 },
  fit: "contain",
  objectPositionX: 1,
  // Mirrors the plate's `object-position: right bottom`.
  objectPositionY: 1,
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
  const glowRef = useRef<HTMLDivElement>(null)

  const strandsRef = useRef<Strand[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, vx: 0, active: false })
  const scrollPhysRef = useRef({ prevY: 0, vel: 0, smoothVel: 0 })
  const rafRef = useRef(0)
  const visibleRef = useRef(true)

  const paletteRef = useRef(buildPalette(accent, highlight))
  useEffect(() => {
    paletteRef.current = buildPalette(accent, highlight)
  }, [accent, highlight])

  // ── Ripple on strike ────────────────────────────────────────────────────
  const ripple = useCallback((x: number, y: number) => {
    const stage = stageRef.current
    if (!stage) return
    const el = document.createElement("div")
    el.className = "wjc-chime-ring"
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.width = el.style.height = "0px"
    el.style.transform = "translate(-50%,-50%)"
    stage.appendChild(el)

    const start = performance.now()
    const grow = (now: number) => {
      const p = (now - start) / 900
      if (p >= 1) {
        el.remove()
        return
      }
      const s = p * 260
      el.style.width = el.style.height = `${s}px`
      el.style.opacity = (0.45 * (1 - p)).toFixed(3)
      requestAnimationFrame(grow)
    }
    requestAnimationFrame(grow)
  }, [])

  /**
   * Places the stage over the gate's open span.
   *
   * The plate is letterboxed or cropped depending on the breakpoint, so the
   * aperture's screen position depends on how the browser fitted it. This
   * repeats that calculation rather than guessing with percentages, which
   * would drift the moment the hero's aspect ratio changed.
   *
   * Everything is measured off the plate element itself — its own box, its
   * computed `object-fit` and `object-position`. Mirroring those in CSS on
   * this layer instead is how the two drifted apart before: the host and the
   * gate layer disagreed about their top inset below 720px, and the plate
   * switched to `cover` there while this maths still assumed `contain`.
   */
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
    // Signed either way: letterboxed plates have slack to distribute,
    // cropped ones have overflow to pull back, and the same product works.
    const offsetX = (W - image.w * scale) * positionX
    const offsetY = (H - image.h * scale) * positionY

    // Both layers carry the same parallax transform, so the difference
    // between their client rects is pure layout offset.
    const hostBox = host.getBoundingClientRect()

    stage.style.left = `${box.left - hostBox.left + offsetX + rect.x * scale}px`
    stage.style.top = `${box.top - hostBox.top + offsetY + rect.y * scale}px`
    stage.style.width = `${rect.w * scale}px`
    stage.style.height = `${rect.h * scale}px`
    return true
  }, [aperture])

  // ── Build + animate ─────────────────────────────────────────────────────
  useEffect(() => {
    const host = hostRef.current
    const stage = stageRef.current
    if (!host || !stage) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const build = () => {
      if (!positionStage()) return

      stage.querySelectorAll(".wjc-strand").forEach((n) => n.remove())
      strandsRef.current = []

      const W = stage.clientWidth
      const H = stage.clientHeight
      if (!W || !H) return

      // Sized against the archway, not the viewport.
      const compact = W < 240
      const size = compact ? 10 : 12
      const gap = compact ? 15 : 18
      // Hung from the top of the archway.
      const top = 0
      const usable = W - (compact ? 8 : 14)
      const count = Math.max(4, Math.floor(usable / gap))
      const rightEdge = W - (W - (count - 1) * gap) / 2

      const room = H * 1.15
      const maxChars = Math.max(5, Math.floor(room / size))

      let cursor = 0
      const frag = document.createDocumentFragment()

      for (let i = 0; i < count; i++) {
        // Deterministic wobble keeps the layout stable across resizes.
        const rr = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1)
        const target = Math.max(5, Math.round(maxChars * (0.78 + rr * 0.22)))

        let text = ""
        while (text.length < target - 2) text += CLAUSES[cursor++ % CLAUSES.length]
        text = text.slice(0, Math.max(target, 5))

        const pivotX = rightEdge - i * gap

        const el = document.createElement("div")
        el.className = "wjc-strand"
        el.style.fontSize = `${size}px`
        el.style.left = `${pivotX}px`
        el.style.top = `${top}px`
        el.style.transform = "translateX(-50%) rotate(0rad)"

        const string = document.createElement("span")
        string.className = "wjc-string"
        el.appendChild(string)

        const chars: Glyph[] = []
        for (const ch of text) {
          const b = document.createElement("b")
          b.textContent = ch
          el.appendChild(b)
          chars.push({ el: b, d: 0, e: 0, tone: -1, lx: 0, lv: 0, wx: 0, wt: 0 })
        }

        const tail = document.createElement("span")
        tail.className = "wjc-tail"
        el.appendChild(tail)

        frag.appendChild(el)

        const len = text.length * size
        string.style.height = `${len}px`
        tail.style.top = `${len + 7}px`

        for (let c = 0; c < chars.length; c++) {
          chars[c].d = (c + 0.5) * size + 4
        }

        const norm = len / room
        strandsRef.current.push({
          el,
          chars,
          tail,
          len,
          pivotX,
          pivotY: top,
          a: 0,
          v: 0,
          // Longer strand swings slower and rings lower.
          k: 0.003 + (1 - norm) * 0.0042,
          damp: 0.982,
          windSens: 0.6 + rr * 0.9,
          contact: false,
          lastRing: 0,
          ring: 0,
          idx: i,
        })
      }

      stage.appendChild(frag)
    }

    build()
    // Japanese glyph metrics settle only once the webfont lands.
    void document.fonts?.ready.then(build)

    // Pause entirely when the hero is off-screen.
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
      windPhase += 0.0055 * dt

      const gust =
        Math.sin(windPhase) * 0.00048 +
        Math.sin(windPhase * 0.41 + 1.7) * 0.00031 +
        Math.sin(windPhase * 1.73 + 4.2) * 0.00014

      const mouse = mouseRef.current
      const palette = paletteRef.current

      // ── Scroll-velocity physics ──────────────────────────────────────────
      // vel is accumulated by the passive scroll listener below; we consume
      // it here and reset so each rAF frame only sees its own delta.
      const sp = scrollPhysRef.current
      sp.smoothVel += (sp.vel - sp.smoothVel) * 0.28
      sp.vel = 0
      sp.smoothVel *= 0.82

      // Map smoothed velocity to an impulse magnitude.
      // Threshold below which the chimes feel ambient (ignore micro-jitter).
      const scrollImpulse = Math.abs(sp.smoothVel) > 1.2
        ? sp.smoothVel * 0.000045
        : 0

      for (const s of strandsRef.current) {
        // Pendulum
        s.v += -s.k * s.a * dt
        if (!reduced) s.v += gust * s.windSens * dt
        s.v *= Math.pow(s.damp, dt)
        s.a += s.v * dt

        // Scroll impulse — wave-phase offset per strand so they ripple rather
        // than all lurching together. Faster scroll = larger kick.
        if (scrollImpulse !== 0) {
          const phase = Math.sin(s.idx * 0.55 + now * 0.0008)
          const kick = scrollImpulse * (0.7 + 0.3 * phase)
          s.v += kick * dt
          // Light up glyphs proportional to scroll energy.
          const energy = Math.min(1, Math.abs(scrollImpulse) / 0.005)
          s.ring = Math.min(1, s.ring + energy * 0.35 * (0.5 + 0.5 * Math.abs(phase)))
        }

        // Cursor contact along the strand's swung line
        let touching = false
        if (mouse.active) {
          const dy = mouse.y - s.pivotY
          if (dy > -18 && dy < s.len + 22) {
            const sx = s.pivotX + Math.sin(s.a) * dy
            const dx = mouse.x - sx
            if (Math.abs(dx) < 20) {
              touching = true
              const speed = Math.min(46, Math.abs(mouse.vx))
              s.v += (mouse.vx * 0.00016 - Math.sign(dx) * 0.0016) * dt
              if (!s.contact && now - s.lastRing > 120) {
                s.lastRing = now
                s.ring = Math.min(1, 0.45 + speed / 46)
              }
            }
          }
        }
        s.contact = touching

        s.ring *= Math.pow(0.975, dt)
        const sway = Math.abs(s.v) * 55
        const glow = Math.min(1, s.ring * 0.85 + sway)

        s.el.style.transform = `translateX(-50%) rotate(${s.a.toFixed(5)}rad)`
        s.tail.style.opacity = (0.3 + glow * 0.65).toFixed(2)

        // ── Per-glyph chain physics + colour ────────────────────────────
        // Sleeping optimisation: if the strand has settled and no external
        // forces are active, skip the expensive per-char loop entirely.
        const sleeping =
          Math.abs(s.v) < 0.00004 &&
          scrollImpulse === 0 &&
          !mouse.active &&
          s.ring < 0.01

        if (!sleeping) {
          const sa = Math.sin(s.a)
          const ca = Math.cos(s.a)
          const nChars = s.chars.length
          for (let ci = 0; ci < nChars; ci++) {
            const c = s.chars[ci]

            // ── Lateral chain physics ────────────────────────────────────
            const prevLx = ci === 0 ? 0 : s.chars[ci - 1].lx
            const depth = (ci + 1) / nChars

            c.lv -= (c.lx - prevLx * 0.8) * 0.022 * dt
            c.lv -= c.lx * 0.005 * dt
            c.lv += s.v * depth * depth * 22 * dt

            if (scrollImpulse !== 0) {
              const wavePhase = now * 0.0055 - ci * 0.38
              const waveMag = scrollImpulse * 380 * (0.35 + depth * 0.65)
              c.lv += waveMag * Math.sin(wavePhase) * dt
            }

            c.lv *= Math.pow(0.85 + depth * 0.07, dt)
            c.lx += c.lv * dt
            c.lx = Math.max(-14, Math.min(14, c.lx))

            // ── Colour excitation (proximity + resonance) ────────────────
            let e = glow * 0.55
            if (mouse.active) {
              const cx = s.pivotX + sa * c.d
              const cy = s.pivotY + ca * c.d
              const dx = mouse.x - cx
              const dy = mouse.y - cy
              const d2 = dx * dx + dy * dy
              if (d2 < 16000) e = Math.max(e, Math.exp(-d2 / 5200))
            }

            c.e += (e - c.e) * Math.min(1, 0.22 * dt)
            const exc = c.e

            const tone = Math.min(STEPS - 1, Math.round(exc * (STEPS - 1)))
            if (tone !== c.tone) {
              c.tone = tone
              c.el.style.color = palette[tone]
            }

            // ── Transform: dirty-check before writing ────────────────────
            // Skip the DOM write if the value hasn't changed enough to be
            // visible (~0.1 px / 0.1 deg) — saves the bulk of style recalcs
            // when the strand has nearly settled.
            const tiltDeg = c.lv * 4
            const excShift = exc > 0.004 ? exc * 3 : 0
            const totalX = c.lx + excShift
            const dX = Math.abs(totalX - c.wx)
            const dT = Math.abs(tiltDeg - c.wt)
            if (dX > 0.1 || dT > 0.1) {
              if (Math.abs(totalX) > 0.05 || Math.abs(tiltDeg) > 0.05) {
                c.el.style.transform = `translateX(${totalX.toFixed(2)}px) rotate(${tiltDeg.toFixed(2)}deg)`
              } else if (c.el.style.transform) {
                c.el.style.transform = ''
              }
              c.wx = totalX
              c.wt = tiltDeg
            }
          }
        }
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    let resizeTimer = 0
    const onResize = () => {
      // Reposition immediately so the stage never lags the art, then rebuild
      // once the resize settles.
      positionStage()
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 180)
    }
    window.addEventListener("resize", onResize)

    const ro = new ResizeObserver(onResize)
    ro.observe(host)

    // Accumulate scroll delta in a passive listener so rAF never needs to
    // read window.scrollY — avoids a potential layout read on the main thread.
    const onScrollPhys = () => {
      const sp = scrollPhysRef.current
      const y = window.scrollY
      sp.vel += y - sp.prevY
      sp.prevY = y
    }
    // Initialise prevY to current position so first scroll gives correct delta.
    scrollPhysRef.current.prevY = window.scrollY
    window.addEventListener('scroll', onScrollPhys, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScrollPhys)
      ro.disconnect()
      io.disconnect()
      strandsRef.current = []
    }
  }, [positionStage])

  // ── Pointer ─────────────────────────────────────────────────────────────
  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const m = mouseRef.current
      if (m.px < -1000) m.px = x
      m.vx = x - m.px
      m.px = x
      m.x = x
      m.y = y
      m.active = true

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x}px,${y}px)`
        glowRef.current.style.opacity = "1"
      }
    },
    [],
  )

  const handleLeave = useCallback(() => {
    const m = mouseRef.current
    m.active = false
    m.x = m.y = -9999
    if (glowRef.current) glowRef.current.style.opacity = "0"
  }, [])

  const handleDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      handleMove(e)
      const rect = e.currentTarget.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      ripple(cx, cy)

      const now = performance.now()
      for (const s of strandsRef.current) {
        const dx = s.pivotX - cx
        const dist = Math.abs(dx)
        if (dist >= 220) continue
        const push = 1 - dist / 220
        s.v += (dx > 0 ? 1 : -1) * 0.01 * push
        s.ring = Math.min(1, s.ring + push)
        if (now - s.lastRing > 90) {
          s.lastRing = now
        }
      }
    },
    [handleMove, ripple],
  )

  return (
    <>
      {/* Host spans the hero so the cover maths has the same box the plates
          do; the stage inside is clipped to the archway. */}
      <div ref={hostRef} className="wjc-chime-host" aria-hidden="true">
        <div
          ref={stageRef}
          className="wjc-chime-stage"
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          onPointerDown={handleDown}
        >
        </div>
      </div>

    </>
  )
}
