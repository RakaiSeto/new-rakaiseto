import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, X } from '@phosphor-icons/react'
import { WallArtifact } from './WallArtifact.jsx'

export default function WallPopup({ item, slot, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />
      <motion.div
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-10"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 10, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
        >
          <X size={18} />
        </button>

        <div className="mx-auto w-64 md:w-96">
          <WallArtifact slot={slot} item={item} show inline />
        </div>

        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-full border border-brand-500/40 px-4 py-2 font-mono text-xs text-brand-400 transition-colors hover:bg-brand-500/10"
          >
            open
            <ArrowUpRight size={13} weight="bold" />
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}
