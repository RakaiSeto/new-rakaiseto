import { useEffect, useRef } from 'react'

// Ambient background — one canvas owning its pixels, no pointer coupling.
// Two particle classes:
// - Orbs: 2 large soft radial gradients (brand-500 top-right, glow-violet
//   mid-left) carrying the color depth the old CSS glow had, wandering
//   ultra-slowly.
// - Motes: ~80 white specks drifting upward with sway and twinkle; ~1 in 20
//   is a larger, brighter brand/violet accent.
// The rAF loop runs while the tab is visible; `prefers-reduced-motion`
// renders a single static frame instead (still colored, via the orbs).
const FALLBACK_BRAND = '#46befd'
const FALLBACK_VIOLET = '#8b5cf6'
const BASE_MOTES = 80
const MIN_MOTES = 40
const ORBS = [
  { x: 0.8, y: 0.15, r: 224, a: 0.07, hue: 'brand', amp: 40, speed: 0.06, phase: 0 },
  { x: 0.18, y: 0.55, r: 192, a: 0.05, hue: 'violet', amp: 34, speed: 0.045, phase: 2.1 },
]
const MAX_DT = 0.05 // clamp dt so tab-switch/resume never jumps the field

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export default function ParticleField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let last = 0
    let t = 0
    let motes = []
    const cssVar = (name, fallback) => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
      return v ? hexToRgb(v) : fallback
    }
    const brand = cssVar('--color-brand-500', hexToRgb(FALLBACK_BRAND))
    const violet = cssVar('--color-glow-violet', hexToRgb(FALLBACK_VIOLET))

    const rand = (a, b) => a + Math.random() * (b - a)

    const makeMote = (y) => {
      const accent = Math.random() < 0.05
      return {
        x0: rand(0, w),
        y: y ?? rand(-20, h + 20),
        r: accent ? rand(1.3, 2) : rand(0.5, 1.5),
        a: accent ? rand(0.45, 0.7) : rand(0.2, 0.5),
        speed: rand(8, 20), // px/s upward
        sway: rand(10, 30), // px horizontal wander
        swayFreq: rand(0.1, 0.25), // rad/s
        phase: rand(0, Math.PI * 2),
        twinkle: rand(0.25, 0.75), // rad/s
        color: accent ? (Math.random() < 0.5 ? brand : violet) : [255, 255, 255],
      }
    }

    const build = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(
        MIN_MOTES,
        Math.round((BASE_MOTES * (w * h)) / (1440 * 900)),
      )
      motes = Array.from({ length: count }, () => makeMote())
    }

    const drawOrb = (o, time) => {
      const cx = o.x * w + Math.sin(time * o.speed + o.phase) * o.amp
      const cy = o.y * h + Math.cos(time * o.speed * 1.3 + o.phase) * o.amp
      const rgb = o.hue === 'violet' ? violet : brand
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r)
      g.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${o.a})`)
      g.addColorStop(0.55, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${o.a * 0.45})`)
      g.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, o.r, 0, Math.PI * 2)
      ctx.fill()
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const o of ORBS) drawOrb(o, time)
      for (const m of motes) {
        const x = m.x0 + Math.sin(time * m.swayFreq + m.phase) * m.sway
        const tw = 1 + 0.15 * Math.sin(time * m.twinkle + m.phase * 2)
        ctx.globalAlpha = Math.max(0, m.a * tw)
        ctx.fillStyle = `rgb(${m.color[0]}, ${m.color[1]}, ${m.color[2]})`
        ctx.beginPath()
        ctx.arc(x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, MAX_DT)
      last = now
      t += dt
      for (const m of motes) {
        m.y -= m.speed * dt
        if (m.y < -4) Object.assign(m, makeMote(h + 4)) // wrap: respawn at bottom
      }
      draw(t)
      raf = requestAnimationFrame(step)
    }

    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    const onVis = () => (document.hidden ? stop() : start())
    const onResize = () => {
      build()
      if (!running) draw(t)
    }

    build()
    draw(0)
    if (!reduceMotion) {
      start()
      document.addEventListener('visibilitychange', onVis)
    }
    window.addEventListener('resize', onResize)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
}
