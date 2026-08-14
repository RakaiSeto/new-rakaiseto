const QR = [
  1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1,
  0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1,
  1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1,
  1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0,
  0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,
  1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1,
  0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1,
  1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1,
  1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1,
]

const ORDER = [
  { id: 'ORD-1042', item: 'Karaoke Suite 04', qty: 1, price: 185000 },
  { id: 'ORD-1042', item: 'French Fries', qty: 2, price: 32000 },
  { id: 'ORD-1042', item: 'Iced Tea', qty: 3, price: 12000 },
]

function formatIDR(n) {
  return `Rp${n.toLocaleString('id-ID')}`
}

// CSS-drawn POS interface — the real screenshots no longer exist on the
// server, so the case study renders a faithful stand-in instead.
export default function PosMock() {
  return (
    <figure className="overflow-hidden rounded-xl border p-3 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)] border-white/10 bg-zinc-900">
      <div className="rounded-lg border border-white/10 bg-zinc-950">
        {/* title bar */}
        <div className="flex items-center justify-between border-b px-4 py-2.5 border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-brand-500" />
          </div>
          <span className="font-mono text-[11px] tracking-[0.15em] text-zinc-400">
            MONETA POS
          </span>
          <span className="font-mono text-[11px] text-zinc-400">14:32</span>
        </div>

        <div className="grid grid-cols-2">
          {/* order panel */}
          <div className="border-r p-4 border-white/10">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
              <span>order / 1042</span>
              <span className="text-brand-400">open</span>
            </div>
            <div className="space-y-2">
              {ORDER.map((row) => (
                <div
                  key={row.item}
                  className="flex items-center justify-between rounded-md border px-3 py-2 border-white/5"
                >
                  <div>
                    <p className="text-xs font-medium text-zinc-200">
                      {row.item}
                    </p>
                    <p className="font-mono text-[10px] text-zinc-400">
                      {row.qty} × {formatIDR(row.price)}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-zinc-300">
                    {formatIDR(row.qty * row.price)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t pt-3 border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
                total
              </span>
              <span className="font-mono text-sm font-medium text-brand-400">
                {formatIDR(277000)}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {['PAY', 'QR', 'REFUND'].map((b) => (
                <span
                  key={b}
                  className={`rounded-md py-1.5 text-center font-mono text-[10px] tracking-wider ${
                    b === 'PAY'
                      ? 'bg-brand-500 text-zinc-950'
                      : 'border border-white/10 text-zinc-400'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* QR panel */}
          <div className="flex flex-col items-center justify-center gap-3 p-6">
            <div className="grid grid-cols-15 gap-[2px] bg-white p-2" style={{ gridTemplateColumns: 'repeat(15, 1fr)' }}>
              {QR.map((cell, i) => (
                <span
                  key={i}
                  className="aspect-square"
                  style={{ backgroundColor: cell ? '#18181b' : '#ffffff' }}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              customer qr — scan to pay
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        interface mock — the real screen stays with the client
      </figcaption>
    </figure>
  )
}
