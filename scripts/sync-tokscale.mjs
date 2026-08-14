// Syncs the tokscale public API into public/ai.json — the offline fallback
// for the /ai page (the page fetches live via the /toks proxy; this
// snapshot keeps a committed copy for deployments without the proxy).
//
// Usage:  bun run sync:ai   (or: node scripts/sync-tokscale.mjs)
// Source: https://tokscale.ai/api/users/<user>  (TOKSCALE_USER env or --user arg)

import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tokscaleSnapshotFromApi } from '../src/lib/tokscale.js'

const USER =
  process.env.TOKSCALE_USER ||
  process.argv.find((a, i) => process.argv[i - 1] === '--user') ||
  'RakaiSeto'

const res = await fetch(`https://tokscale.ai/api/users/${USER}`)
if (!res.ok) throw new Error(`tokscale API responded ${res.status}`)

const snapshot = tokscaleSnapshotFromApi(await res.json())

const out = join(process.cwd(), 'public', 'ai.json')
writeFileSync(out, JSON.stringify(snapshot, null, 2) + '\n')
console.log(
  `✓ synced tokscale.ai/u/${USER} → ${out} ` +
    `($${snapshot.cost.toFixed(2)}, ${(snapshot.tokens / 1e9).toFixed(2)}B tokens, ${snapshot.models.length} models)`,
)
