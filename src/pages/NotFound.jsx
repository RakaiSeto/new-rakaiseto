import { Link } from 'react-router-dom'
import { Reveal } from '../components/Motion.jsx'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80dvh] max-w-[1400px] flex-col items-center justify-center px-5 text-center">
      <Reveal>
        <p className="font-mono text-6xl font-medium tracking-tighter md:text-8xl text-zinc-700">
          404
        </p>
        <p className="mt-6 max-w-[45ch] leading-relaxed text-zinc-400">
          This page doesn't exist. If you came from an old blog link — the
          writings section was retired in the redesign. The work survived.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-brand-500 px-6 py-3 font-mono text-sm font-medium text-zinc-950 transition-all hover:bg-brand-400 active:scale-[0.98]"
          >
            back home
          </Link>
          <Link
            to="/projects"
            className="rounded-full border px-6 py-3 font-mono text-sm transition-all hover:border-brand-500/60 active:scale-[0.98] border-white/15 text-zinc-300 hover:text-brand-400"
          >
            view projects
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
