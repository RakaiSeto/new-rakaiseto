import {
  SiGo,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiRedis,
  SiVuedotjs,
} from '@icons-pack/react-simple-icons'

// Brand marks for the stack list. Simple Icons covers the brands; anything
// without a mark (gRPC, SAW, MOORA…) gets a neutral diamond so chips keep
// their visual rhythm. Marks are monochrome on purpose — a rainbow of brand
// colors would fight the zinc palette; the glyph just needs to read.
const LOGOS = {
  Laravel: SiLaravel,
  Go: SiGo,
  Redis: SiRedis,
  MySQL: SiMysql,
  Vue: SiVuedotjs,
  'Node.js': SiNodedotjs,
}

function FallbackMark() {
  return <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-zinc-500" />
}

export default function TechChip({ name, compact = false }) {
  const Logo = LOGOS[name]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono border-white/20 text-zinc-300 ${
        compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-[12px]'
      }`}
    >
      {Logo ? (
        <Logo className={`text-zinc-300 ${compact ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />
      ) : (
        <FallbackMark />
      )}
      <span>{name}</span>
    </span>
  )
}
