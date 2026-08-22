import { memo } from 'react'
import { motion } from 'framer-motion'

// Perpetual breathing dot — isolated leaf, memoized, never re-renders parent.
// Scale-only pulse: opacity stays constant so the dot reads as a solid
// marker against the rail, not a fading one.
const BreathingDot = memo(function BreathingDot({ className = '' }) {
  return (
    <motion.span
      aria-hidden
      className={`inline-block h-1.5 w-1.5 rounded-full ${className}`}
      animate={{ scale: [0.85, 1.1, 0.85] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
})

export default BreathingDot
