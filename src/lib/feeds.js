// Live feeds for the appendix pages.
//
// /vibes — last.fm, fetched client-side from the public API.
//   Configure with VITE_LASTFM_USER + VITE_LASTFM_KEY (get a key at
//   https://www.last.fm/api/account/create). VITE_LASTFM_API overrides
//   the endpoint (useful for proxies).

const LASTFM_USER = import.meta.env.VITE_LASTFM_USER
const LASTFM_KEY = import.meta.env.VITE_LASTFM_KEY
const LASTFM_API = import.meta.env.VITE_LASTFM_API || 'https://ws.audioscrobbler.com/2.0/'

export const lastfmConfig = {
  configured: Boolean(LASTFM_USER && LASTFM_KEY),
  user: LASTFM_USER,
}

const PERIODS = ['1month', '12month', 'overall']

async function lfm(method, params = {}) {
  const qs = new URLSearchParams({
    method,
    api_key: LASTFM_KEY,
    user: LASTFM_USER,
    format: 'json',
    ...params,
  })
  const res = await fetch(`${LASTFM_API}?${qs}`)
  if (!res.ok) throw new Error(`last.fm responded ${res.status}`)
  const json = await res.json()
  if (json.error) throw new Error(json.message)
  return json
}

// last.fm serves covers at http sometimes; the site is https.
function pickImage(images = []) {
  for (const size of ['extralarge', 'large', 'medium']) {
    const img = images.find((i) => i.size === size)
    if (img?.['#text']) return img['#text'].replace(/^http:\/\//, 'https://')
  }
  return null
}

function mapChart(periodRes, field, key) {
  const items = periodRes[field]?.[key]
  return (items || []).map((a) => ({
    name: a.name,
    plays: Number(a.playcount),
    url: a.url,
    ...(key === 'track' ? { artist: a.artist?.name || a.artist?.['#text'] } : {}),
  }))
}

// One request per dataset, run in parallel.
export async function fetchLastfmSnapshot() {
  const [info, recent, ...periods] = await Promise.all([
    lfm('user.getinfo'),
    lfm('user.getrecenttracks', { limit: '20' }),
    ...PERIODS.flatMap((p) => [
      lfm('user.gettopartists', { limit: '6', period: p }),
      lfm('user.gettoptracks', { limit: '5', period: p }),
    ]),
  ])

  const nowPlaying = recent.recenttracks.track.find((t) => t['@attr']?.nowplaying === '1')
  const last = recent.recenttracks.track.find((t) => t.date?.uts)

  const topArtists = {}
  const topTracks = {}
  PERIODS.forEach((p, i) => {
    topArtists[p] = mapChart(periods[i * 2], 'topartists', 'artist')
    topTracks[p] = mapChart(periods[i * 2 + 1], 'toptracks', 'track')
  })

  return {
    info: info.user,
    nowPlaying: nowPlaying
      ? { track: nowPlaying.name, artist: nowPlaying.artist['#text'] }
      : null,
    lastScrobbleAt: last ? Number(last.date.uts) * 1000 : null,
    history: recent.recenttracks.track
      .filter((t) => !t['@attr']?.nowplaying)
      .map((t) => ({
        track: t.name,
        artist: t.artist['#text'],
        album: t.album['#text'],
        image: pickImage(t.image),
        url: t.url,
        at: t.date ? Number(t.date.uts) * 1000 : null,
      })),
    topArtists,
    topTracks,
  }
}

export function timeAgo(ms) {
  if (!ms) return 'unknown'
  const s = Math.max(1, Math.floor((Date.now() - ms) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `${mo}mo ago`
  return `${Math.floor(mo / 12)}y ago`
}
