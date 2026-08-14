import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import PosMock from './PosMock.jsx'
import { Reveal } from './Motion.jsx'

// Parallax tilt card: springs + transforms only, no re-renders during hover.
function TiltImage({ src, alt }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rX = useSpring(useTransform(py, [0, 1], [5, -5]), {
    stiffness: 120,
    damping: 18,
  })
  const rY = useSpring(useTransform(px, [0, 1], [-5, 5]), {
    stiffness: 120,
    damping: 18,
  })

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rX, rotateY: rY, transformPerspective: 1100 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
    </motion.div>
  )
}

export default function ProjectRow({ project, index }) {
  const flip = index % 2 === 1
  const number = String(index + 1).padStart(2, '0')

  return (
    <Reveal className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className={`md:col-span-5 ${flip ? 'md:order-2' : ''}`}>
        <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-zinc-600">
          <span className="text-brand-400">{number}</span>
          <span className="h-px w-8 bg-white/15" />
          <span>{project.status ?? 'case study'}</span>
        </div>

        <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
          <Link
            to={`/projects/${project.slug}`}
            className="transition-colors hover:text-brand-500"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-4 max-w-[52ch] leading-relaxed text-zinc-400">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border px-3 py-1 font-mono text-[11px] border-white/10 text-zinc-400"
            >
              {s}
            </span>
          ))}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="group/link mt-7 inline-flex items-center gap-2 font-mono text-sm transition-colors hover:text-brand-500 text-brand-400"
        >
          read case study
          <ArrowRight
            size={15}
            weight="bold"
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link>
      </div>

      <div className={`md:col-span-7 ${flip ? 'md:order-1' : ''}`}>
        {project.image ? (
          <TiltImage src={project.image} alt={`${project.title} screenshot`} />
        ) : (
          <PosMock />
        )}
      </div>
    </Reveal>
  )
}
