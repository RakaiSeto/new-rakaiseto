// The social card, rendered by takumi inside the Worker. Layout is variant D:
// brand lockup pinned top-left, page content centred on both axes. Deliberately
// flat — no illustration, so the PNG stays small enough for WhatsApp previews.

const BG = '#09090b'
const TEXT = '#fafafa'
const MUTED = '#a1a1aa'
const DIM = '#8b8b93'
const BRAND = '#46befd'

// Long titles step down a size instead of wrapping to three lines.
function titleSize(title) {
  if (title.length > 34) return 50
  if (title.length > 24) return 56
  return 64
}

export function OgCard({ eyebrow, title, description, meta, logo }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '56px 72px',
        backgroundColor: BG,
        color: TEXT,
        fontFamily: 'Plus Jakarta Sans',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ambient brand glow, bottom-centre — echoes the site's particle field */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-280px',
          marginLeft: '-500px',
          width: '1000px',
          height: '640px',
          backgroundImage:
            'radial-gradient(circle, rgba(70,190,253,0.15) 0%, rgba(70,190,253,0) 68%)',
        }}
      />

      {/* brand lockup — top-left, smaller than the original card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
        <img src={logo} width={22} height={29} alt="" />
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 19,
            color: MUTED,
            letterSpacing: '0.01em',
          }}
        >
          rakaiseto.com
        </span>
      </div>

      {/* dynamic page content, centred */}
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '18px',
          marginTop: '-16px',
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 17,
            color: BRAND,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </span>

        <span
          style={{
            fontSize: titleSize(title),
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            fontVariationSettings: "'wght' 700",
            maxWidth: '980px',
          }}
        >
          {title}
        </span>

        {description ? (
          <span style={{ fontSize: 25, color: MUTED, lineHeight: 1.4, maxWidth: '820px' }}>
            {description}
          </span>
        ) : null}

        {meta ? (
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 17,
              color: DIM,
              marginTop: '4px',
            }}
          >
            {meta}
          </span>
        ) : null}
      </div>
    </div>
  )
}
