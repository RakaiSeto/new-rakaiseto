import { Link, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import { ArrowLeft, ArrowUpRight, GithubLogo, GlobeHemisphereWest } from '@phosphor-icons/react'
import { motion, useScroll, useSpring } from 'framer-motion'
import PosMock from '../components/PosMock.jsx'
import Magnetic from '../components/Magnetic.jsx'
import { Reveal, MaskWords } from '../components/Motion.jsx'
import { getProject, nextProject, projects } from '../lib/projects.js'
import { usePageMeta } from '../lib/seo.js'
import NotFound from './NotFound.jsx'


function SectionTitle({ children }) {
  return (
    <h2 className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-400">
      <span className="h-px w-10 bg-brand-500/50" aria-hidden />
      {children}
    </h2>
  )
}

const mdComponents = {
  h2: ({ children }) => <SectionTitle>{children}</SectionTitle>,
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-xl font-semibold tracking-tight">{children}</h3>
  ),
  p: ({ children }) => (
    // div, not p: markdown images render as <figure> blocks, and a figure
    // inside a <p> is invalid HTML — browsers would break the paragraph.
    <div className="mb-6 max-w-[65ch] leading-relaxed text-zinc-400">
      {children}
    </div>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 space-y-2 max-w-[65ch]">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex gap-3 leading-relaxed text-zinc-400">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden />
      <span>{children}</span>
    </li>
  ),
  img: ({ src, alt }) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        decoding="async"
        className="w-full rounded-xl border border-white/10"
      />
      {alt && (
        <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-600">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="underline decoration-brand-500/40 underline-offset-4 transition-colors hover:text-brand-500 text-brand-400"
    >
      {children}
    </a>
  ),
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b py-3 last:border-0 border-white/10">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
      <span className="text-right font-mono text-sm text-zinc-200">
        {value}
      </span>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24 })

  usePageMeta(
    project ? `${project.title} — Rakai Seto Sembodo` : 'Project — Rakai Seto Sembodo',
    project?.summary,
  )

  if (!project) return <NotFound />

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = nextProject(project.slug)

  return (
    <article className="mx-auto max-w-[1200px] px-5 pt-32 pb-24">
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-brand-500/80"
        style={{ scaleX }}
      />

      {/* header */}
      <header className="mb-16">
        <Reveal className="mb-8 flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-zinc-500">
          <Link
            to="/projects"
            className="flex items-center gap-2 transition-colors hover:text-brand-500"
          >
            <ArrowLeft size={14} weight="bold" />
            all projects
          </Link>
          <span className="h-px w-8 bg-white/15" />
          <span>
            project {String(index + 1).padStart(2, '0')}
          </span>
        </Reveal>

        <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
          <MaskWords text={project.title} delay={0.1} />
        </h1>

        <Reveal delay={0.35}>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-zinc-400">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border px-3 py-1 font-mono text-[11px] border-white/10 text-zinc-400"
            >
              {s}
            </span>
          ))}
        </Reveal>

        {/* actions */}
        <Reveal delay={0.65} className="mt-10 flex flex-wrap items-center gap-4">
          {project.demo && (
            <Magnetic>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-mono text-sm font-medium text-zinc-950 shadow-[0_12px_32px_-12px_rgba(70,190,253,0.55)] transition-all hover:bg-brand-400 active:scale-[0.98]"
              >
                <GlobeHemisphereWest size={15} weight="bold" />
                live demo
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </Magnetic>
          )}
          {project.repo && (
            <Magnetic>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-sm transition-all hover:border-brand-500/60 active:scale-[0.98] border-white/15 text-zinc-300 hover:text-brand-400"
              >
                <GithubLogo size={15} />
                source
              </a>
            </Magnetic>
          )}
        </Reveal>
      </header>

      {/* body: prose + meta rail */}
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-8">
          {project.mock ? (
            <>
              <Reveal className="mb-10">
                <PosMock />
              </Reveal>
              <Markdown components={mdComponents}>{project.body}</Markdown>
            </>
          ) : (
            <Markdown components={mdComponents}>{project.body}</Markdown>
          )}
        </div>

        <aside className="md:col-span-4">
          <Reveal delay={0.15}>
            <div className="rounded-xl border px-5 py-2 border-white/10">
              <MetaRow label="role" value={project.role ?? '—'} />
              <MetaRow label="status" value={project.status ?? '—'} />
              <MetaRow label="stack" value={project.stack.join(' · ')} />
            </div>
          </Reveal>
        </aside>
      </div>

      {/* next project */}
      <nav className="mt-28 border-t pt-10 border-white/10">
        <Reveal>
          <Link
            to={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6"
          >
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                next project
              </p>
              <span className="text-3xl font-semibold tracking-tight transition-colors group-hover:text-brand-500 md:text-5xl">
                {next.title}
              </span>
            </div>
            <ArrowUpRight
              size={36}
              weight="light"
              className="shrink-0 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-brand-500 text-zinc-600"
            />
          </Link>
        </Reveal>
      </nav>
    </article>
  )
}
