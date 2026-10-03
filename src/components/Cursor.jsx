import { useEffect, useRef, useState } from 'react'

const DOT_SIZE = 8
const HOVER_SCALE = 3 // 8px → 24px over interactive elements
const PRESS_SCALE = 0.85

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, select, textarea, [data-magnetic]'

// Custom cursor: 8px brand dot replacing the OS cursor entirely, growing to
// 24px over interactive elements and squashing on press. Instant-follow — no
// lerp, no ring. Size is set inline from JS so hover and press compose
// arithmetically; the CSS `scale` property animates it and stays centered on
// the pointer. Gates: fine pointer + no reduced motion; otherwise nothing
// renders and the native cursor stays.
export default function Cursor() {
  const layerRef = useRef(null)
  const holderRef = useRef(null)
  const dotRef = useRef(null)
  // Starts false so the server render and first client render agree — reading
  // matchMedia during render would flip the tree on hydration. Set after mount.
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(
      window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  useEffect(() => {
    if (!enabled) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const layer = layerRef.current
    const dot = dotRef.current // inner: scale only, no translation
    const holder = holderRef.current // outer: translation only, no scale
    let hover = false
    let pressed = false
    let visible = false

    const place = (nx, ny) => {
      holder.style.transform = `translate3d(${nx - DOT_SIZE / 2}px, ${ny - DOT_SIZE / 2}px, 0)`
    }

    // Scale lives on the inner dot, NOT on the holder: the individual CSS
    // `scale` property composes OUTSIDE `transform` (it scales the translation
    // too — the dot visibly jumps toward the viewport origin on press).
    // A scale() function inside the inner's transform applies in local space,
    // about the dot's own center, which sits exactly on the pointer.
    const applyScale = () => {
      let s = hover ? HOVER_SCALE : 1
      if (pressed) s *= PRESS_SCALE
      dot.style.transform = `scale(${s})`
    }

    const setHover = (on) => {
      if (hover === on) return
      hover = on
      applyScale()
    }
    const setPressed = (on) => {
      if (pressed === on) return
      pressed = on
      applyScale()
    }
    const setVisible = (on) => {
      if (visible === on) return
      visible = on
      layer.style.opacity = on ? '1' : '0'
    }

    const onMove = (e) => {
      setVisible(true)
      place(e.clientX, e.clientY)
    }
    const onOver = (e) => {
      setHover(e.target.closest(INTERACTIVE_SELECTOR) != null)
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeaveDoc = () => setVisible(false)
    const onEnterDoc = () => setVisible(true)

    document.documentElement.classList.add('custom-cursor')
    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeaveDoc)
    document.documentElement.addEventListener('mouseenter', onEnterDoc)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
      document.documentElement.removeEventListener('mouseenter', onEnterDoc)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div
      ref={layerRef}
      aria-hidden
      className="cursor-layer"
      style={{ opacity: 0 }}
    >
      <div ref={holderRef} className="cursor-dot">
        <div ref={dotRef} className="cursor-dot-inner" />
      </div>
    </div>
  )
}
