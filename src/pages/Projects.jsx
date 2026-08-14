import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Reveal } from '../components/Motion.jsx'
import { projects } from '../lib/projects.js'
import { usePageMeta } from '../lib/seo.js'

export default function Projects() {
  usePageMeta('Projects — Rakai Seto Sembodo')

  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-28">
      <Reveal className="mb-14">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          the chapters
        </p>
        <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          Every project, told straight.
        </h1>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-zinc-400">
          The shipped, the ghosted, and the ones an investor bailed on. No
          highlight reel — each chapter gets the same honesty as the last.
        </p>
      </Reveal>

      <div className="border-t border-white/10">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <Link
              to={`/projects/${project.slug}`}
              className="group grid grid-cols-12 items-baseline gap-4 border-b py-8 transition-colors hover:border-brand-500/40 md:py-10 border-white/10"
            >
              <span className="col-span-2 font-mono text-xs tracking-[0.2em] md:col-span-1 text-zinc-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="col-span-10 text-2xl font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand-500 md:col-span-5 md:text-4xl">
                {project.title}
              </span>
              <span className="col-span-10 col-start-3 text-sm leading-relaxed md:col-span-4 md:col-start-auto text-zinc-400">
                {project.summary}
              </span>
              <span className="col-span-10 col-start-3 flex items-center justify-between gap-3 md:col-span-2 md:col-start-auto md:flex-col md:items-end md:gap-2">
                <span className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border px-2 py-0.5 font-mono text-[10px] border-white/10 text-zinc-400"
                    >
                      {s}
                    </span>
                  ))}
                </span>
                <ArrowUpRight
                  size={18}
                  className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-500 text-zinc-600"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
