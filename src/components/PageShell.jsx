import ParticleField from './ParticleField.jsx'
import Cursor from './Cursor.jsx'

export default function PageShell({ children }) {
  return (
    <div className="relative min-h-[100dvh]">
      {/* ambient particle background — one canvas: soft orbs + drifting dust */}
      <ParticleField />

      {/* film grain — fixed, pointer-events-none, never repainted on scroll */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10">{children}</div>

      <Cursor />
    </div>
  )
}
