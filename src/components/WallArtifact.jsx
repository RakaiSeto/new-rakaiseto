import { motion } from 'framer-motion'
import { PushPin } from '@phosphor-icons/react'

function GhostInterior() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-white/30 bg-white/[0.03] text-zinc-400">
      <PushPin size={20} weight="fill" />
      <p className="font-mono text-[10px] uppercase tracking-wider">to be pinned</p>
    </div>
  )
}

// Speech-bubble caption. On the wall it's hidden at rest and springs out
// from under the image on hover; in the popup it sits inline, always on.
function CaptionDialog({ title, note, show, inline }) {
  // Bubbles cap at 38vw/280px (wall) or the artifact width (popup) and
  // wrap; long titles never spill past the bubble border.
  const text = (
    <>
      <p className="font-semibold text-xs leading-tight text-zinc-100">{title}</p>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">{note}</p>
    </>
  )

  if (inline) {
    return (
      <div className="mx-auto mt-3 w-fit max-w-full rounded-lg border border-white/10 bg-zinc-900/95 px-3 py-2 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.5)]">
        {text}
      </div>
    )
  }

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-full z-20 w-max max-w-[min(280px,38vw)] -translate-x-1/2 rounded-lg border border-white/10 bg-zinc-900/95 px-3 py-2 text-center shadow-[0_12px_24px_-8px_rgba(0,0,0,0.5)]"
      style={{ transformOrigin: 'top center' }}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10, scale: show ? 1 : 0.85 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-zinc-900/95" />
      {text}
    </motion.div>
  )
}

// Pure transparent PNG, no frame, no background. Caption hangs below.
function FloatImage({ item, ghostAspect, show, inline }) {
  return (
    <div className="w-full">
      {item ? (
        <>
          <img src={item.image} alt="" className="w-full" loading="lazy" />
          <CaptionDialog title={item.title} note={item.note} show={show} inline={inline} />
        </>
      ) : (
        <div className={ghostAspect}>
          <GhostInterior />
        </div>
      )}
    </div>
  )
}

// Black vinyl disk with the album art as the center label. The disk gets
// a sheen, a visible rim and engraved grooves so it reads as an object
// against the dark cork instead of a black void.
function VinylDisk({ item, isGhost, show, inline }) {
  if (isGhost) {
    return (
      <div className="w-full">
        <div className="aspect-square w-full">
          <GhostInterior />
        </div>
      </div>
    )
  }
  return (
    <div className="w-full">
      <div className="relative aspect-square w-full rounded-full bg-zinc-900 shadow-[0_18px_36px_-10px_rgba(0,0,0,0.65)]">
        {/* engraved grooves */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at center, rgba(255,255,255,0.06) 0 1.5px, transparent 1.5px 3px)',
          }}
        />
        {/* specular sheen */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 24%, rgba(255,255,255,0.15), transparent 46%)',
          }}
        />
        {/* rim highlight */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
        {/* album art as the center label */}
        <div className="absolute inset-[20%] overflow-hidden rounded-full ring-2 ring-white/15">
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        {/* label depth */}
        <div className="absolute inset-[20%] rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)]" />
        {/* spindle hole */}
        <span className="absolute left-1/2 top-1/2 h-[7%] w-[7%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] ring-1 ring-white/20" />
      </div>
      <CaptionDialog title={item.title} note={item.note} show={show} inline={inline} />
    </div>
  )
}

export function PolaroidArtifact({ item, isGhost }) {
  return (
    <div className="w-full overflow-hidden rounded-sm bg-zinc-100 p-2 pb-4 text-zinc-900 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)]">
      {isGhost ? (
        <div className="aspect-[4/5] w-full">
          <GhostInterior />
        </div>
      ) : (
        <>
          <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-200">
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-3 px-1">
            <p className="font-semibold text-xs leading-tight">{item.title}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              {item.note}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export function VinylArtifact({ item, isGhost, show, inline }) {
  return <VinylDisk item={item} isGhost={isGhost} show={show} inline={inline} />
}

export function CoverArtifact({ item, isGhost, show, inline }) {
  return (
    <FloatImage item={isGhost ? null : item} ghostAspect="aspect-square w-full" show={show} inline={inline} />
  )
}

export function JerseyArtifact({ item, isGhost, show, inline }) {
  return (
    <FloatImage item={isGhost ? null : item} ghostAspect="aspect-[3/4] w-full" show={show} inline={inline} />
  )
}

export function GameArtifact({ item, isGhost, show, inline }) {
  return (
    <FloatImage item={isGhost ? null : item} ghostAspect="aspect-[3/4] w-full" show={show} inline={inline} />
  )
}

export function WallArtifact({ slot, item, show = false, inline = false }) {
  const isGhost = !item
  switch (slot.artifact) {
    case 'polaroid':
      return <PolaroidArtifact item={item} isGhost={isGhost} />
    case 'vinyl':
      return <VinylArtifact item={item} isGhost={isGhost} show={show} inline={inline} />
    case 'cover':
      return <CoverArtifact item={item} isGhost={isGhost} show={show} inline={inline} />
    case 'jersey':
      return <JerseyArtifact item={item} isGhost={isGhost} show={show} inline={inline} />
    case 'game':
      return <GameArtifact item={item} isGhost={isGhost} show={show} inline={inline} />
    default:
      return null
  }
}
