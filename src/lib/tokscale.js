// Maps the tokscale public API payload (https://tokscale.ai/api/users/<user>)
// to the snapshot shape feeds.js consumes:
//   { syncedAt, cost, tokens, cacheHitRate, activeDays, submissionCount, models }

export function tokscaleSnapshotFromApi(d) {
  const stats = d.stats
  if (!stats?.totalTokens || !Array.isArray(d.modelUsage)) {
    throw new Error('unexpected tokscale payload shape')
  }
  return {
    syncedAt: d.updatedAt ? new Date(d.updatedAt).getTime() : Date.now(),
    cost: stats.totalCost,
    tokens: stats.totalTokens,
    cacheHitRate:
      stats.totalTokens > 0 ? (stats.cacheReadTokens / stats.totalTokens) * 100 : null,
    activeDays: stats.activeDays,
    submissionCount: stats.submissionCount,
    models: d.modelUsage.map((m) => ({
      name: m.model,
      cost: m.cost,
      tokens: m.tokens,
    })),
  }
}
