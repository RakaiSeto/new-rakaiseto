import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import wallData from '../../content/wall.json'
import { BOARDS, computeDoodles, SLOT_PLAN } from '../lib/wall.js'
import { WallTile } from './WallItem.jsx'
import { ZoneDecoration, ZoneLabel } from './WallDecor.jsx'
import WallPopup from './WallPopup.jsx'

// Cork grain: fine speckle, cheap, static.
const CORK_GRAIN =
  'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)'

export default function WallCanvas() {
  const itemsBySlot = useMemo(() => {
    const map = {}
    wallData.items.forEach((item) => {
      map[item.slotId] = item
    })
    return map
  }, [])
  const doodles = useMemo(() => computeDoodles(), [])
  const [open, setOpen] = useState(null)
  const openPopup = (item, slot) => setOpen({ item, slot })
  const closePopup = () => setOpen(null)

  return (
    <>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-start justify-center gap-28">
        {BOARDS.map((board, bi) => (
          <motion.div
            key={board.id}
            className="relative w-fit rounded-2xl border border-white/10 bg-[#1e1b17] p-5 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-10"
            style={{ rotate: `${board.tilt}deg` }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: bi * 0.1 }}
          >
            {/* cork texture — behind everything */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ backgroundImage: CORK_GRAIN, backgroundSize: '3px 3px', zIndex: -1 }}
            />

            {/* decor lattice — full board, behind the grid; desktop only */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              {doodles[board.id].map((d, i) => (
                <ZoneDecoration
                  key={`${board.id}-${d.variant}-${i}`}
                  d={d}
                  color={board.decorColor}
                />
              ))}
            </div>

            <ZoneLabel board={board} className="mb-6 md:mb-8" />

            {/* items-start: buttons keep their content height instead of
                stretching to the row's tallest tile — captions (top-full)
                must hang from each item's own bottom, not the row's. */}
            <div
              className={`relative grid grid-cols-[auto_auto] items-start ${
                board.gapX ?? 'gap-x-5 md:gap-x-6'
              } ${board.gapY ?? 'gap-y-9 md:gap-y-12'}`}
            >
              {board.slots.map((slotId, i) => {
                const slot = SLOT_PLAN.find((s) => s.id === slotId)
                const item = itemsBySlot[slotId] || null
                return (
                  <WallTile
                    key={slotId}
                    slot={slot}
                    item={item}
                    onOpen={openPopup}
                    angle={i % 2 ? 2.5 : -2.5}
                    offset={
                      slot.id === 's3'
                        ? '0 48px' // timnas hangs lower in its row, balanced against the polaroid
                        : i % 2
                          ? '0 16px'
                          : undefined
                    }
                  />
                )
              })}
              {board.center && (() => {
                const slot = SLOT_PLAN.find((s) => s.id === board.center)
                const item = itemsBySlot[board.center] || null
                // Cross-center slot (sport's 5th jersey): floats at the
                // intersection of the grid's gutters, above its neighbors.
                // The 2x2 columns/rows are unequal (hero w-64 vs w-48 tiles,
                // polaroids taller than jerseys), so the container center is
                // NOT the cross center — nudge to the gutter intersection.
                // Offsets measured in layout space (offset*): x lands exact
                // at +16/+32; y needed -42 base / -24 md. If tile sizes in
                // SIZE_CLASSES change, re-measure.
                return (
                  <div
                    key={slot.id}
                    className="absolute left-[calc(50%_+_16px)] top-[calc(50%_-_42px)] -translate-x-1/2 -translate-y-1/2 md:left-[calc(50%_+_48px)] md:top-[calc(50%_-_24px)]"
                    style={{ zIndex: 5 }}
                  >
                    <WallTile
                      slot={slot}
                      item={item}
                      onOpen={openPopup}
                      angle={-1.5}
                    />
                  </div>
                )
              })()}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open && <WallPopup item={open.item} slot={open.slot} onClose={closePopup} />}
      </AnimatePresence>
    </>
  )
}
