import { memo } from 'react'
import { motion } from 'framer-motion'

// Perpetual breathing dot — isolated leaf, memoized, never re-renders parent.
const BreathingDot = memo(function BreathingDot({ className = '' }) {
  return (
    <motion.span
      aria-hidden
      className={`inline-block h-1.5 w-1.5 rounded-full ${className}`}
      animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.1, 0.85] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
})

export default BreathingDot
