export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-8 font-mono text-[11px] tracking-[0.15em] text-zinc-500 md:flex-row">
        <span>© 2026 RAKAI SETO SEMBODO</span>
        <span className="hidden md:block">JAKARTA & MALANG, ID — UTC+7</span>
        <span>BUILT WITH REACT AND A LOT OF ☕ </span>
      </div>
    </footer>
  )
}
