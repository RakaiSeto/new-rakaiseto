import { useCallback, useEffect, useState } from 'react'
import { MusicNotes } from '@phosphor-icons/react'
import BreathingDot from '../components/BreathingDot.jsx'
import Magnetic from '../components/Magnetic.jsx'
import { Reveal, MaskWords } from '../components/Motion.jsx'
import { usePageMeta } from '../lib/seo.js'
import {
  fetchLastfmSnapshot,
  lastfmConfig,
  timeAgo,
} from '../lib/feeds.js'

const PERIOD_TABS = [
  ['1month', '1M'],
  ['12month', '1Y'],
  ['overall', 'ALL'],
]

function Stat({ label, value }) {
  return (
    <div className="border-t py-6 border-white/10">
      <p className="font-mono text-2xl tracking-tight md:text-3xl">{value}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
        {label}
      </p>
    </div>
  )
}

// Album cover card. The img error state falls back to a placeholder —
// last.fm occasionally loses art, and a broken image is a broken promise.
// Whole card is magnetic and links to the track on last.fm.
function TrackCard({ item }) {
  const [imgOk, setImgOk] = useState(true)
  return (
    <Magnetic className="block h-full" strength={0.06} scale={1.04}>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.05]"
        >
          {item.image && imgOk ? (
            <img
              src={item.image}
              alt={`${item.track} — ${item.artist}`}
              loading="lazy"
              decoding="async"
              onError={() => setImgOk(false)}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="grid aspect-square w-full place-items-center bg-zinc-900">
              <MusicNotes size={26} className="text-zinc-700" />
            </div>
          )}
          <div className="p-3">
            <p className="truncate text-sm font-medium">{item.track}</p>
            <p className="truncate text-xs text-zinc-400">{item.artist}</p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
              {timeAgo(item.at)}
            </p>
          </div>
        </a>
      </Magnetic>
  )
}

function RankRow({ rank, name, plays, url }) {
  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-baseline justify-between gap-4 border-t py-3.5 border-white/10 transition-colors duration-200 hover:text-brand-400"
      >
        <span className="flex min-w-0 items-baseline gap-3">
          <span className="font-mono text-[11px] text-zinc-600">
            {String(rank).padStart(2, '0')}
          </span>
          <span className="truncate text-sm font-medium">{name}</span>
        </span>
        <span className="shrink-0 font-mono text-xs text-zinc-400">
          {plays}
        </span>
      </a>
    </li>
  )
}

function PeriodTabs({ period, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Chart period"
      className="flex shrink-0 rounded-full border p-0.5 border-white/10"
    >
      {PERIOD_TABS.map(([value, label]) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={period === value}
          onClick={() => onChange(value)}
          className={`rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.15em] transition-all active:scale-[0.96] ${
            period === value
              ? 'bg-brand-500/10 text-brand-400'
              : 'text-zinc-400 hover:text-zinc-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function Skeleton({ className }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />
}

function EmptyState() {
  return (
    <Reveal className="mx-auto max-w-xl py-20 text-center">
      <BreathingDot className="mx-auto mb-6 bg-zinc-400" />
      <h2 className="text-2xl font-semibold tracking-tight">No vibes wired up yet.</h2>
      <p className="mt-4 leading-relaxed text-zinc-400">
        This page will stream my last.fm scrobbles the day I connect it. Until
        then it stays honest about its silence — like everything else here.
      </p>
      <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-zinc-600">
        SET VITE_LASTFM_USER + VITE_LASTFM_KEY
      </p>
    </Reveal>
  )
}

export default function Vibes() {
  usePageMeta(
    'Vibes — Rakai Seto Sembodo',
    'What Rakai is listening to, live from last.fm.',
  )
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [period, setPeriod] = useState('1month')
  const [, setLoading] = useState(false)

  const load = useCallback(async () => {
    if (!lastfmConfig.configured) return
    setLoading(true)
    setError(null)
    try {
      setData(await fetchLastfmSnapshot())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (!lastfmConfig.configured) return <EmptyState />

  if (error) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">vibes</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl">
          last.fm said no.
        </h1>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-zinc-400">
          {error} — probably a missing or wrong API key. The page is honest
          about its failures, but this one is mine to fix, not yours.
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
        <Skeleton className="mb-10 h-12 w-72" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="aspect-square" />
              ))}
            </div>
          </div>
          <div className="md:col-span-4 space-y-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        </div>
      </section>
    )
  }

  const scrobbles = Number(data?.info?.playcount) || 0
  const artists = Number(data?.info?.artist_count) || 0
  const history = data.history.slice(0, 20)

  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-28">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-300">
            vibes · last.fm
          </p>
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tighter md:text-6xl">
            <MaskWords text="The vibes, live." delay={0.1} />
          </h1>
        </div>

        <Reveal delay={0.4} className="shrink-0">
          {data?.nowPlaying ? (
            <div className="flex min-w-0 max-w-full items-center gap-3 rounded-full border border-brand-500/30 bg-brand-500/5 px-5 py-2.5">
              <BreathingDot className="shrink-0 bg-brand-500" />
              <p className="truncate font-mono text-xs tracking-wide">
                scrobbling now —{' '}
                <span className="text-brand-400">
                  {data.nowPlaying.track}
                </span>{' '}
                · {data.nowPlaying.artist}
              </p>
            </div>
          ) : (
            <div className="flex min-w-0 max-w-full items-center gap-3 rounded-full border px-5 py-2.5 border-white/10">
              <BreathingDot className="shrink-0 bg-zinc-400" />
              <p className="truncate font-mono text-xs tracking-wide text-zinc-400">
                last scrobble {timeAgo(data?.lastScrobbleAt)}
              </p>
            </div>
          )}
        </Reveal>
      </div>

      <Reveal delay={0.55}>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-zinc-400">
          Songs I've actually listened to, straight from last.fm. No curated
          playlists — just the loop that's been running in my headphones.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        <Stat label="scrobbles" value={scrobbles.toLocaleString('en-US')} />
        <Stat label="unique artists" value={artists.toLocaleString('en-US')} />
        <Stat label="last update" value={timeAgo(data?.lastScrobbleAt)} />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        {/* RECENT HISTORY — album covers, max 20 */}
        <div className="min-w-0 md:col-span-8">
          <Reveal>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Recent history</h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
                live feed
              </span>
            </div>
          </Reveal>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 [&:hover>li:not(:hover)]:opacity-60">
            {history.map((item) => (
              <li key={`${item.at}-${item.track}`} className="transition-opacity duration-300">
                <TrackCard item={item} />
              </li>
            ))}
          </ul>
        </div>

        {/* TOP CHARTS — shared period tabs */}
        <aside className="min-w-0 md:col-span-4">
          <Reveal delay={0.15}>
            <div className="mb-6 flex items-end justify-between gap-3">
              <h2 className="text-xl font-semibold tracking-tight">Top charts</h2>
              <PeriodTabs period={period} onChange={setPeriod} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
              artists
            </p>
            <ul>
              {(data.topArtists[period] || []).map((a, i) => (
                <RankRow
                  key={a.name}
                  rank={i + 1}
                  name={a.name}
                  plays={a.plays}
                  url={a.url}
                />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mb-2 mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
              tracks
            </p>
            <ul>
              {(data.topTracks[period] || []).map((t, i) => (
                <RankRow
                  key={t.name}
                  rank={i + 1}
                  name={`${t.name} — ${t.artist}`}
                  plays={t.plays}
                  url={t.url}
                />
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>

      <Reveal className="mt-20 border-t pt-8 border-white/10">
        <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-600">
          SYNCED VIA LAST.FM · {lastfmConfig.user?.toUpperCase()} · THE FEED IS THE TRUTH, STALENESS INCLUDED
        </p>
      </Reveal>
    </section>
  )
}
