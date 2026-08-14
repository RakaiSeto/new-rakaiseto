import { useState } from 'react'
import { motion } from 'framer-motion'
import { WallArtifact } from './WallArtifact.jsx'

const SIZE_CLASSES = {
  hero: 'w-40 md:w-64',
  center: 'w-40 md:w-88',
  md: 'w-36 md:w-48',
  lg: 'w-32 md:w-52',
  xl: 'w-40 md:w-72',
}

// One wall item: image/ghost + hover choreography + tap-to-open.
// Hovering lifts the whole tile above its grid siblings so the caption
// is never covered — z-index is on the button itself, which is the
// positioned stacking context.
export function WallTile({ slot, item, onOpen, angle = 0, offset }) {
  const [hovered, setHovered] = useState(false)
  const isGhost = !item
  const widthClass = SIZE_CLASSES[slot.size] ?? (slot.hero ? SIZE_CLASSES.hero : SIZE_CLASSES.md)

  return (
    <motion.button
      type="button"
      disabled={isGhost}
      onClick={() => item && onOpen(item, slot)}
      className={`relative block ${widthClass} cursor-pointer bg-transparent p-0 text-left disabled:cursor-default`}
      style={{ rotate: angle, translate: offset, zIndex: hovered ? 10 : 0 }}
      whileHover={item ? { rotate: 0, scale: 1.04, y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      aria-label={item ? `${item.title} — ${item.note}` : undefined}
    >
      <WallArtifact slot={slot} item={item} show={hovered} />
    </motion.button>
  )
}
