import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Reveal } from './Motion.jsx'

// Compact editorial index row: one line on md+ (index · title · summary ·
// year · stack), stacked on mobile. No containers, no decorations.
export default function ProjectRow({ project, index }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <Reveal>
      <Link
        to={`/projects/${project.slug}`}
        className="group block border-b border-white/10 py-5 transition-colors duration-300 hover:border-brand-500/40 md:py-6"
      >
        <div className="flex flex-col gap-3 md:grid md:grid-cols-12 md:items-baseline md:gap-x-6">
          {/* index + title — contents wrapper dissolves into the grid on md */}
          <div className="flex items-baseline gap-4 md:contents">
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-600 transition-colors duration-300 group-hover:text-brand-400 md:col-span-1">
              {number}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:text-brand-400 md:col-span-3 md:text-3xl">
              {project.title}
            </h3>
          </div>

          {/* summary — middle, ellipsized when long */}
          <p className="line-clamp-1 text-sm leading-relaxed text-zinc-400 md:col-span-3">
            {project.summary}
          </p>

          {/* stack + year — end */}
          <div className="flex flex-wrap items-baseline gap-2 md:col-span-4 md:justify-end">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] border-white/10 text-zinc-400"
              >
                {s}
              </span>
            ))}
            <span className="font-mono text-xs tracking-[0.15em] text-brand-400">
              {project.year}
            </span>
          </div>

          <div className="flex justify-end md:col-span-1">
            <ArrowUpRight
              size={16}
              className="text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-400"
            />
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
