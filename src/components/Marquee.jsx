function Band({ items, fast = false }) {
  const content = [...items, ...items]
  return (
    <div className="overflow-hidden" aria-hidden>
      <div
        className={`flex w-max items-center gap-8 whitespace-nowrap py-4 font-mono text-sm tracking-[0.2em] text-zinc-600 ${fast ? 'animate-marquee marquee-fast' : 'animate-marquee'}`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8">
            {content.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-8">
                {item}
                <span className="text-brand-500/60">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee({ items }) {
  return (
    <section
      aria-label="Log ticker"
      className="border-y border-white/10"
    >
      <Band items={items} />
    </section>
  )
}
