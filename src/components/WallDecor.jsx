// Decor layer for the wall zones — Phosphor fill icons (pre-existing icon
// set, no hand-drawn SVGs) placed on a deterministic brick lattice behind
// the items, rendered at low opacity in the board's accent color.

import {
  AirplaneTilt,
  Basketball,
  Cards,
  CassetteTape,
  Compass,
  DiceFive,
  Disc,
  Football,
  GameController,
  Headphones,
  Joystick,
  Microphone,
  MusicNote,
  PaperPlaneTilt,
  PianoKeys,
  PuzzlePiece,
  Sailboat,
  SoccerBall,
  Suitcase,
  Ticket,
  TreePalm,
  Trophy,
  VinylRecord,
  Volleyball,
} from '@phosphor-icons/react'

function hexA(hex, a) {
  return hex + Math.round(a * 255).toString(16).padStart(2, '0')
}

const DECOR = {
  paperplane: PaperPlaneTilt,
  airplane: AirplaneTilt,
  suitcase: Suitcase,
  treepalm: TreePalm,
  sailboat: Sailboat,
  compass: Compass,
  soccerball: SoccerBall,
  basketball: Basketball,
  volleyball: Volleyball,
  football: Football,
  ticket: Ticket,
  trophy: Trophy,
  vinyl: VinylRecord,
  note: MusicNote,
  headphones: Headphones,
  disc: Disc,
  microphone: Microphone,
  piano: PianoKeys,
  controller: GameController,
  joystick: Joystick,
  cassette: CassetteTape,
  dice: DiceFive,
  cards: Cards,
  puzzle: PuzzlePiece,
}

export function ZoneDecoration({ d, color }) {
  const Comp = DECOR[d.variant]
  if (!Comp) return null
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${d.left}%`,
        top: `${d.top}%`,
        zIndex: 0,
        opacity: d.opacity,
        color,
        transform: `rotate(${d.rotate}deg)`,
      }}
    >
      <Comp size={d.size} weight="fill" />
    </div>
  )
}

export function ZoneLabel({ board, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${className}`}
      style={{
        color: board.color,
        borderColor: hexA(board.color, 0.45),
        backgroundColor: hexA(board.color, 0.07),
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: board.color }} />
      {board.label}
    </span>
  )
}
