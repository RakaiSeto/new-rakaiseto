import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Magnetic wrapper: pulls children toward the cursor and optionally scales
// up while hovered. Motion values live outside the React render cycle — no
// re-renders, GPU-only transforms. Defaults to inline-block (buttons/links);
// pass `className` to override the display (e.g. "block h-full" to magnetize
// a full-width card), `strength` to tune the pull (lower = safer in dense
// grids), and `scale` (>1) to grow on hover.
export default function Magnetic({ children, strength = 0.25, scale = 1, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 140, damping: 16, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 140, damping: 16, mass: 0.2 })

  return (
    <motion.div
      ref={ref}
      data-magnetic
      className={className || 'inline-block'}
      style={{ x: sx, y: sy }}
      whileHover={{ scale }}
      transition={{ scale: { type: 'spring', stiffness: 260, damping: 20 } }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
