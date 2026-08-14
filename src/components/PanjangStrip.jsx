import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { Reveal } from './Motion.jsx'

// Panjang: the personality entry. Full-width band, playful copy, no image.
export default function PanjangStrip() {
  return (
    <Reveal>
      <Link
        to="/projects/panjang"
        className="group flex flex-col gap-3 border-y py-10 transition-colors hover:border-brand-500/40 md:flex-row md:items-center md:justify-between md:py-12 border-white/10"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-600">
            04
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            bonus project
          </span>
        </div>
        <p className="text-xl font-medium tracking-tight md:text-2xl">
          Ever used a link shortener?{' '}
          <span className="transition-colors group-hover:text-brand-500 text-zinc-500">
            Now try the opposite.
          </span>
        </p>
        <span className="flex items-center gap-2 font-mono text-sm text-brand-400">
          panjang
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </Reveal>
  )
}
