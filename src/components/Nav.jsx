import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'

const linkClass = ({ isActive }) =>
  `text-sm transition-colors hover:text-brand-400 ${
    isActive ? 'text-brand-400' : 'text-zinc-500'
  }`

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-4 rounded-full border px-5 backdrop-blur-xl border-white/10 bg-zinc-900/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
        >
          <img
            src="/images/logo.png"
            alt=""
            className="h-5 w-auto select-none"
          />
          rakaiseto
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/projects" className={linkClass}>
            Works
          </NavLink>
          <NavLink to="/vibes" className={linkClass}>
            Vibes
          </NavLink>
          <NavLink to="/ai" className={linkClass}>
            AI usage
          </NavLink>
          <NavLink to="/wall" className={linkClass}>
            The wall
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="mailto:rakaiseto@gmail.com"
            className="hidden items-center gap-1 rounded-full border border-brand-500/40 px-4 py-1.5 font-mono text-xs transition-all hover:border-brand-500 hover:bg-brand-500/10 active:scale-[0.98] sm:flex text-brand-400"
          >
            email me
            <ArrowUpRight size={13} weight="bold" />
          </a>
        </div>
      </nav>
    </header>
  )
}
