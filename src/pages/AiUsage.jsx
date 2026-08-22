import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import BreathingDot from '../components/BreathingDot.jsx'
import { MaskWords, Reveal } from '../components/Motion.jsx'
import { EASE } from '../lib/motion.js'
import { usePageMeta } from '../lib/seo.js'
import {
  fetchTokscaleSnapshot,
  timeAgo,
  formatTokens,
  formatCost,
} from '../lib/feeds.js'

const SORTS = ['tokens', 'cost']

function Stat({ label, value, hint }) {
  return (
    <div className="border-t py-6 border-white/10">
      <p className="font-mono text-2xl tracking-tight md:text-3xl">{value}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
        {label}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-zinc-600">{hint}</p>
      ) : null}
    </div>
  )
}

function ModelRow({ rank, name, cost, tokens, share, showBar }) {
  return (
    <li className="grid grid-cols-12 items-baseline gap-3 border-t py-4 border-white/10">
      <span className="col-span-1 font-mono text-[11px] text-zinc-600">
        {String(rank).padStart(2, '0')}
      </span>
      <span className="col-span-7 truncate text-sm font-medium md:col-span-3">{name}</span>
      <div className="col-span-6 hidden self-center md:flex">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-white/25"
            initial={false}
            animate={{ width: showBar ? `${share * 100}%` : '0%' }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>
      </div>
      <span className="col-span-2 text-right font-mono text-xs md:col-span-1 text-zinc-400">
        {formatTokens(tokens)}
      </span>
      <span className="col-span-2 text-right font-mono text-xs md:col-span-1 text-zinc-400">
        {formatCost(cost)}
      </span>
    </li>
  )
}

function Skeleton({ className }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />
}

export default function AiUsage() {
  usePageMeta(
    'AI usage — Rakai Seto Sembodo',
    'Token usage across Rakai\u2019s AI coding agents, tracked by tokscale.',
  )
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [, setLoading] = useState(false)
  const [sort, setSort] = useState('tokens')

  const models = useMemo(() => {
    const rows = (data?.models || []).filter((m) => m.tokens > 0 || m.cost > 0)
    rows.sort(
      sort === 'tokens'
        ? (a, b) => b.tokens - a.tokens || b.cost - a.cost || a.name.localeCompare(b.name)
        : (a, b) => b.cost - a.cost || b.tokens - a.tokens || a.name.localeCompare(b.name),
    )
    return rows
  }, [data, sort])

  const max = useMemo(() => models.reduce((mx, m) => Math.max(mx, m[sort]), 0), [models, sort])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await fetchTokscaleSnapshot())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (error) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">ai usage</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl">
          The snapshot is missing.
        </h1>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-zinc-400">
          {error}. Run{' '}
          <code className="rounded px-1.5 py-0.5 font-mono text-xs bg-white/10">
            bun run sync:ai
          </code>{' '}
          to regenerate the snapshot at /ai.json.
        </p>
        <button
          type="button"
          onClick={load}
          className="mt-8 rounded-full border px-6 py-3 font-mono text-sm transition-all hover:border-brand-500/60 hover:text-brand-600 active:scale-[0.98] border-white/15 text-zinc-300"
        >
          retry
        </button>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-28">
        <Skeleton className="mb-4 h-3 w-24" />
        <Skeleton className="mb-10 h-12 w-80" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <div className="mt-14 space-y-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-28">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            ai usage · tokscale
          </p>
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tighter md:text-6xl">
            <MaskWords text="Tokens, burned." delay={0.1} />
          </h1>
        </div>

        <Reveal delay={0.4} className="shrink-0">
          <div className="flex items-center gap-3 rounded-full border px-5 py-2.5 border-white/10">
            <BreathingDot className="bg-brand-500" />
            <p className="font-mono text-xs tracking-wide text-zinc-400">
              last synced {timeAgo(data?.syncedAt)}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.55}>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-zinc-400">
          Every token my AI coding agents burned through, tracked by tokscale
          from my local session data. Fetched live from my profile every time
          this page opens — the numbers are real, and nothing here is rounded
          to look nicer.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        <Stat label="cost burned" value={formatCost(data?.cost)} />
        <Stat label="tokens counted" value={formatTokens(data?.tokens)} hint={data?.activeDays != null ? `${data.activeDays} active days` : undefined} />
        <Stat
          label="cache hit rate"
          value={data?.cacheHitRate != null ? `${data.cacheHitRate.toFixed(1)}%` : '—'}
          hint="prompt caching, when tokscale reports it"
        />
      </div>

      <div className="mt-16">
        <Reveal>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Where it went</h2>
            <div className="flex items-center gap-0.5 rounded-full border p-0.5 font-mono text-[11px] uppercase tracking-[0.2em] border-white/10">
              {SORTS.map((axis) => (
                <button
                  key={axis}
                  type="button"
                  onClick={() => setSort(axis)}
                  aria-pressed={sort === axis}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    sort === axis ? 'bg-white text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  by {axis}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-12 gap-3 border-b pb-2 font-mono text-[10px] uppercase tracking-[0.2em] border-white/10 text-zinc-600">
          <span className="col-span-1">#</span>
          <span className="col-span-7 md:col-span-3">model</span>
          <span className="col-span-6 hidden md:block" />
          <span className="col-span-2 text-right md:col-span-1">tokens</span>
          <span className="col-span-2 text-right md:col-span-1">cost</span>
        </div>
        <ul>
          {models.map((m, i) => {
            const share = max > 0 ? m[sort] / max : 0
            return (
              <Reveal key={m.name} delay={Math.min(i * 0.04, 0.4)} layout>
                <ModelRow
                  rank={i + 1}
                  name={m.name}
                  cost={m.cost}
                  tokens={m.tokens}
                  share={share}
                  showBar={share >= 0.01}
                />
              </Reveal>
            )
          })}
        </ul>
      </div>

      <Reveal className="mt-20 border-t pt-8 border-white/10">
        <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-600">
          LIVE VIA TOKSCALE.AI · READ FROM LOCAL AGENT SESSIONS · SNAPSHOT FALLBACK IF THE PROXY SLEEPS
        </p>
      </Reveal>
    </section>
  )
}
