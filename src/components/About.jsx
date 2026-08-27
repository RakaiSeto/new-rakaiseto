import { motion } from 'framer-motion'
import about from '../../content/about.json'
import BreathingDot from './BreathingDot.jsx'
import { EASE } from '../lib/motion.js'
import { Reveal } from './Motion.jsx'

/* ── experience — the history ledger ────────────────────────────
   Rows on a self-drawing rail. No hairline borders, no year ticks:
   the rail alone carries the history. The rail is one segment per
   row — the first row's segment starts at its dot, the last row's
   ends at its dot, so nothing is drawn above the topmost point or
   below the last one. Periods sit on the right at their natural
   width (`shrink-0`) so they never wrap. The current row trades
   the neutral rail for a highlighted brand segment + a breathing
   dot. */

function LedgerRow({ item, current = false, first = false, last = false }) {
  return (
    <div className={`group relative py-6 ${current ? 'pl-4' : ''} md:pl-8`}>
      {current ? (
        <span
          aria-hidden
          className={`absolute left-[-1px] top-[2rem] w-[2px] bg-brand-500/40 ${
            last ? 'bottom-[calc(100%-2rem)]' : 'bottom-0'
          }`}
        />
      ) : (
        <motion.span
          aria-hidden
          className={`absolute left-[-0.5px] hidden w-px bg-white/10 md:block ${
            first ? 'top-[2rem]' : 'top-0'
          } ${last ? 'bottom-[calc(100%-2rem)]' : 'bottom-0'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      )}
      <span
        aria-hidden
        className="absolute left-0 top-[2rem] hidden -translate-x-1/2 md:block"
      >
        {current ? (
          <span className="flex h-2 w-2 items-center justify-center">
            <BreathingDot className="bg-brand-500" />
          </span>
        ) : (
          <span className="block h-2 w-2 rounded-full bg-zinc-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500" />
        )}
      </span>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="font-medium transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-400">
            {item.company ?? item.org}
          </p>
          <p className="text-sm text-zinc-500">{item.role}</p>
          {item.line && (
            <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-zinc-400">{item.line}</p>
          )}
        </div>
        <span className="shrink-0 font-mono text-[12px] tracking-[0.15em] text-zinc-300 sm:text-right">
          {item.period}
        </span>
      </div>
    </div>
  )
}

// Grouped positions at one company render as a block: name on top, one
// sub-row per position, indented under the rail without their own dots.
function LedgerGroup({ name, items, first = false, last = false }) {
  return (
    <div className="group relative py-6 md:pl-8">
      <motion.span
        aria-hidden
        className={`absolute left-[-0.5px] hidden w-px bg-white/10 md:block ${
          first ? 'top-[2rem]' : 'top-0'
        } ${last ? 'bottom-[calc(100%-2rem)]' : 'bottom-0'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px 0px' }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <span
        aria-hidden
        className="absolute left-0 top-[2rem] hidden h-2 w-2 -translate-x-1/2 rounded-full bg-zinc-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500 md:block"
      />
      <div>
        <p className="font-medium transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-400">
          {name}
        </p>
        <div className="mt-4 space-y-5">
          {items.map((item) => (
            <div
              key={item.period + item.role}
              className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-500">{item.role}</p>
                <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-zinc-400">{item.line}</p>
              </div>
              <span className="shrink-0 font-mono text-[12px] tracking-[0.15em] text-zinc-300 sm:text-right">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── other — indexed, quiet ─────────────────────────────────────
   Densest block, lowest hierarchy: a mono index in the gutter, no
   rail, no hover motion. */

function IndexRow({ item, index }) {
  return (
    <div className="border-t border-white/10 py-4 md:grid md:grid-cols-[2.5rem_1fr] md:items-baseline md:gap-4">
      <span className="hidden text-right font-mono text-[12px] tracking-[0.15em] text-zinc-300 md:block">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{item.company ?? item.org}</p>
          <p className="text-sm text-zinc-500">{item.role}</p>
          <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-zinc-400">{item.line}</p>
        </div>
        <span className="shrink-0 font-mono text-[12px] tracking-[0.15em] text-zinc-300 sm:text-right">
          {item.period}
        </span>
      </div>
    </div>
  )
}

function IndexGroup({ name, items, index }) {
  return (
    <div className="border-t border-white/10 py-4 md:grid md:grid-cols-[2.5rem_1fr] md:items-baseline md:gap-4">
      <span className="hidden text-right font-mono text-[12px] tracking-[0.15em] text-zinc-300 md:block">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="font-medium">{name}</p>
        <div className="mt-3 space-y-4">
          {items.map((item) => (
            <div
              key={item.period + item.role}
              className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-500">{item.role}</p>
                <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-zinc-400">{item.line}</p>
              </div>
              <span className="shrink-0 font-mono text-[12px] tracking-[0.15em] text-zinc-300 sm:text-right">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── shared plumbing ──────────────────────────────────────────── */

// Group by company/org name; order follows first appearance, positions
// keep authoring order. A group of one renders as a plain row.
function groupByCompany(items) {
  const groups = new Map()
  for (const item of items) {
    const name = item.company ?? item.org
    if (!groups.has(name)) groups.set(name, [])
    groups.get(name).push(item)
  }
  return [...groups.entries()]
}

function renderRow(row, variant) {
  if (row.type === 'row') {
    return variant === 'ledger' ? (
      <LedgerRow item={row.item} current={row.current} first={row.first} last={row.last} />
    ) : (
      <IndexRow item={row.item} index={row.index} />
    )
  }
  return variant === 'ledger' ? (
    <LedgerGroup name={row.name} items={row.items} first={row.first} last={row.last} />
  ) : (
    <IndexGroup name={row.name} items={row.items} index={row.index} />
  )
}

// variant "ledger" (career history): rail + dots.
// variant "indexed" (auxiliary): mono index, quieter.
function TimelineList({ items, variant = 'ledger' }) {
  const groups = groupByCompany(items)
  const rows = groups.map(([name, groupItems], i) =>
    groupItems.length === 1
      ? {
          type: 'row',
          item: groupItems[0],
          index: i,
          current: groupItems[0].current,
          first: i === 0,
          last: i === groups.length - 1,
        }
      : {
          type: 'group',
          name,
          items: groupItems,
          index: i,
          first: i === 0,
          last: i === groups.length - 1,
        },
  )

  return (
    <div className="relative">
      {rows.map((row) => (
        <Reveal
          key={row.type === 'row' ? row.item.company ?? row.item.org : row.name}
          delay={row.index * 0.05}
        >
          {renderRow(row, variant)}
        </Reveal>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 md:py-28">
      <Reveal className="mb-14">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Where I work(ed), and what else I've done.
        </h2>
      </Reveal>

      {/* experience — two asymmetric columns: jobs | education & other.
          Columns only at lg+ — below that the 12-col/gap math degenerates
          and the "other" periods would have no room, so it stacks. */}
      <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        {/* column 1 — the jobs */}
        <div>
          <Reveal delay={0.1}>
            <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.2em] text-zinc-300">
              experience
            </p>
            <TimelineList items={about.experience} />
          </Reveal>
        </div>

        {/* column 2 — education & other work */}
        <div>
          <Reveal delay={0.2}>
            <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.2em] text-zinc-300">
              education
            </p>
            <div className="border-l-2 border-brand-500/40 pl-4">
              <p className="font-medium">
                {about.education.school}
                <span className="text-zinc-500"> · {about.education.field}</span>
              </p>
              <p className="mt-1.5 font-mono text-[12px] tracking-[0.15em] text-zinc-300">
                {about.education.period} · GPA {about.education.gpa} / 4.00
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="mt-12">
            <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.2em] text-zinc-300">
              other experiences
            </p>
            <TimelineList items={about.other} variant="indexed" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
