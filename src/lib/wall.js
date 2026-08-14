// Four cork boards, one per genre. Items are slot-placed inside each board
// (CSS grid cells) so overlap is impossible by construction. Decor is a
// deterministic brick lattice of Phosphor icons across the full board area,
// painted behind the grid — it fills the gutters between items with an
// even, intentional pattern. `center` boards get an extra slot absolutely
// positioned at the cross center of their 2x2 grid (the sport board's 5th
// jersey).

export const SLOT_PLAN = [
  { id: 'm1', artifact: 'vinyl', category: 'music', hero: true, size: 'xl' },
  { id: 'm2', artifact: 'cover', category: 'music', size: 'lg' },
  { id: 'm3', artifact: 'cover', category: 'music', size: 'lg' },
  { id: 'm4', artifact: 'vinyl', category: 'music', size: 'lg' },
  { id: 's1', artifact: 'jersey', category: 'sport', hero: true },
  { id: 's2', artifact: 'jersey', category: 'sport' },
  { id: 's3', artifact: 'jersey', category: 'sport', size: 'xl' },
  { id: 's4', artifact: 'polaroid', category: 'sport' },
  { id: 's5', artifact: 'jersey', category: 'sport', size: 'center' },
  { id: 't1', artifact: 'polaroid', category: 'travel' },
  { id: 't2', artifact: 'polaroid', category: 'travel' },
  { id: 'g1', artifact: 'game', category: 'game' },
  { id: 'g2', artifact: 'game', category: 'game' },
]

export const BOARDS = [
  { id: 'music', label: 'music', color: '#46befd', decorColor: '#a8e2ff', tilt: -1.5, slots: ['m1', 'm2', 'm3', 'm4'] },
  {
    id: 'sport',
    label: 'sport',
    color: '#5fb06b',
    decorColor: '#a6dcae',
    tilt: 1.2,
    slots: ['s1', 's2', 's3', 's4'],
    center: 's5',
    gapX: 'gap-x-5 md:gap-x-20',
    gapY: 'gap-y-14 md:gap-y-28',
  },
  { id: 'travel', label: 'travel', color: '#d3a354', decorColor: '#e8c995', tilt: 2, slots: ['t1', 't2'], cols: 4 },
  { id: 'game', label: 'game', color: '#9788d9', decorColor: '#c5bced', tilt: -1.8, slots: ['g1', 'g2'], cols: 4 },
]

const DECOR_VARIANTS = {
  travel: ['paperplane', 'airplane', 'suitcase', 'treepalm', 'sailboat', 'compass'],
  sport: ['soccerball', 'basketball', 'volleyball', 'football', 'ticket', 'trophy'],
  music: ['vinyl', 'note', 'headphones', 'disc', 'microphone', 'piano'],
  game: ['controller', 'joystick', 'cassette', 'dice', 'cards', 'puzzle'],
}

// Brick lattice: rows of evenly spaced icons, odd rows offset left by half
// a step (offsetting RIGHT would push the last icon past the board edge),
// alternating two sizes, uniform opacity, random rotation (-180..+180 per
// icon for max variation; positions stay deterministic — only facing is
// random). Default 6x4 cells (each of 6 variants appears exactly 4x);
// boards with `cols` set (travel, game) use a smaller 4x4 grid.
const LATTICE = { rows: 4, stepY: 25, sizes: [24, 32], defaultCols: 6 }
const LATTICE_OPACITY = 0.15

export function computeDoodles() {
  const out = {}
  BOARDS.forEach((board) => {
    const variants = DECOR_VARIANTS[board.id]
    const cols = board.cols ?? LATTICE.defaultCols
    const stepX = 100 / cols
    const doodles = []
    for (let r = 0; r < LATTICE.rows; r++) {
      for (let c = 0; c < cols; c++) {
        const odd = r % 2 === 1
        doodles.push({
          variant: variants[(r + c) % variants.length],
          left: c * stepX + (odd ? 0 : stepX / 2),
          top: r * LATTICE.stepY + LATTICE.stepY / 2,
          size: (r + c) % 2 === 0 ? LATTICE.sizes[0] : LATTICE.sizes[1],
          opacity: LATTICE_OPACITY,
          rotate: (Math.random() - 0.5) * 360,
        })
      }
    }
    out[board.id] = doodles
  })
  return out
}
