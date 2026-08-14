import about from '../../content/about.json'
import BreathingDot from './BreathingDot.jsx'
import { Reveal } from './Motion.jsx'

function CurrentRow({ item }) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-12 sm:gap-6">
      <div className="flex gap-4 sm:col-span-10">
        <BreathingDot className="mt-1.5 shrink-0 bg-brand-500" />
        <div>
          <p className="font-medium">{item.company}</p>
          <p className="text-sm text-zinc-500">{item.role}</p>
          <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-zinc-400">
            {item.line}
          </p>
        </div>
      </div>
      <span className="font-mono text-[11px] tracking-[0.15em] text-zinc-600 sm:col-span-2 sm:pt-1 sm:text-right">
        {item.period}
      </span>
    </div>
  )
}

function TimelineRow({ item }) {
  return (
    <div className="grid gap-2 border-t border-white/10 py-5 sm:grid-cols-12 sm:gap-6">
      <div className="sm:col-span-10">
        <p className="font-medium">{item.company ?? item.org}</p>
        <p className="text-sm text-zinc-500">{item.role}</p>
        <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-zinc-400">
          {item.line}
        </p>
      </div>
      <span className="font-mono text-[11px] tracking-[0.15em] text-zinc-600 sm:col-span-2 sm:pt-1 sm:text-right">
        {item.period}
      </span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:py-32">
      <Reveal className="mb-14">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          now / about
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Where I work, and what else I've done.
        </h2>
      </Reveal>

      {/* career — current */}
      <Reveal delay={0.1}>
        <div className="divide-y divide-white/10">
          {about.current.map((item) => (
            <CurrentRow key={item.company} item={item} />
          ))}
        </div>
      </Reveal>

      {/* career — previously */}
      <Reveal delay={0.2} className="mt-10">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          previously
        </p>
        {about.timeline.map((item) => (
          <TimelineRow key={item.company + item.period} item={item} />
        ))}
      </Reveal>

      {/* education + other work */}
      <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
        <Reveal delay={0.3} className="md:col-span-4">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            education
          </p>
          <div className="border-t border-white/10 pt-5">
            <p className="font-medium">{about.education.school}</p>
            <p className="mt-0.5 text-sm text-zinc-500">{about.education.field}</p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.15em] text-zinc-600">
              {about.education.period}
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.15em] text-zinc-600">
              GPA {about.education.gpa} / 4.00
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.35} className="md:col-span-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            other experiences
          </p>
          {about.other.map((item) => (
            <TimelineRow key={item.org + item.role} item={item} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
