// Layout for the CV — the whole look lives in this file.
//
// Content is in cv.typ, which does `#show: cv` and then calls these helpers.
// Restyling the CV means editing this file only; editing your history means
// touching cv.typ only. `build/typst-plugin.js` compiles cv.typ into the
// /CV_RAKAI.pdf the site links to, in both `npm run dev` and `npm run build`,
// so the PDF it serves is always built from here.
//
// Why `cv(body)` instead of plain `#set` rules in this file: set rules are
// scoped to the module that declares them, so a `#set page(...)` here would be
// silently dropped when cv.typ imports this module. Wrapping the document body
// in a function puts the set rules in the body's own scope, which is the
// standard Typst template shape.

// ── palette ──────────────────────────────────────────────────────
// brand-600 from src/index.css, so the CV matches the site it ships with.
#let ink = rgb("#111111")
#let muted = rgb("#5f5f5f")
#let hairline = rgb("#b5b5b5")
#let brand = rgb("#0e85cf")

// ── density ──────────────────────────────────────────────────────
// One knob per visual transition, named for the two things it separates.
//
// That one-knob rule is the whole point of this block. Typst takes the *larger*
// of two neighbouring blocks' `above`/`below`, so a gap written as "a bit here
// plus a bit there" silently becomes a `max()` of two unrelated numbers and
// stops tracking either one. Giving every transition a single owner means
// widening the gap between entries cannot move the gap between bullets.
//
// The knobs are ordered the way the page reads, tightest first. Keeping that
// order is what makes the hierarchy legible: a wrapped line belongs to its
// bullet, the next bullet is a new point, the next entry is a new job, and a
// section heading is the biggest break of all.
//
// The current content runs to two A4 pages: the first is full, the second ends
// about three quarters down. That ragged tail is fine — the alternative is
// stretching the entries to fill it, which is exactly what made an earlier pass
// read as one long column with no grouping. Let the last page end where the
// content ends; spend the slack on the gaps between entries, not on the gaps
// inside them.
#let margin-x = 2.2cm
#let margin-top = 1.8cm
#let margin-bottom = 1.4cm
#let body-size = 10pt
// Baseline distance inside a paragraph. Also the gap from a bullet to its own
// wrapped line, which is why it sits below `bullet-gap` in the scale.
#let leading = 0.90em

// These are em-relative so the whole scale follows `body-size`, but the numbers
// that actually matter are the baseline distances they produce, because those
// are what the eye reads as "same group" or "new group". Each knob is the
// baseline distance minus the line height it already inherits, hence the
// awkward decimals. Measured on the built PDF, all uniform:
//
//   title -> date line        16.0pt   title-meta
//   date line -> first bullet 16.0pt   meta-points
//   bullet -> wrapped line    15.3pt   leading
//   bullet -> next bullet     17.0pt   leading + bullet-gap
//   last bullet -> next item  25.0pt   entry-gap
//   item -> next category     35.0pt   section-gap
//   category -> first item    17.9pt   section-below
//
// Tune by picking the target in pt, subtracting what the transition already
// inherits, and converting back at 10pt = 1em.
#let title-meta = 1.021em
#let meta-points = 0.955em
// bullet -> next bullet, on top of `leading`. See the `set list` note below.
#let bullet-gap = 0.177em

// between entries, and around a section heading
#let entry-gap = 1.829em
#let section-gap = 2.739em
// heading -> whatever follows it. Entries carry their spacing on `below`, so
// the first entry under a heading reports `above: 0em` and this is the only
// number in play — a heading followed by a title and one followed by prose now
// land on the same baseline distance.
#let section-below = 0.95em

// ── document ─────────────────────────────────────────────────────
// `#show: cv` in cv.typ hands the whole document body to this function.
#let cv(body) = {
  set document(title: "Rakai Seto Sembodo — CV", author: "Rakai Seto Sembodo")
  set page(
    paper: "a4",
    margin: (x: margin-x, top: margin-top, bottom: margin-bottom),
    // "Page n / N" quietly in the corner. `both: true` reads the final page
    // count, which Typst knows by the time the footer is laid out.
    footer: context align(right)[
      #set text(size: 7.4pt, fill: muted)
      #counter(page).display("1 / 1", both: true)
    ],
  )

  // Libertinus Serif ships with Typst, so the PDF renders identically on every
  // machine with no font to install or download.
  set text(font: "Libertinus Serif", size: body-size, fill: ink, lang: "en", hyphenate: false)
  set par(leading: leading, spacing: 0.8em, justify: false)
  // Headings are real `heading` elements, so the PDF's tag tree carries them as
  // /H2. Their spacing and look are zeroed here and re-applied in `section`, so
  // the visible layout is unchanged.
  show heading: set block(above: 0em, below: 0em)
  show heading: set text(size: 11.8pt, weight: "bold", tracking: 0.01em, fill: ink)
  // Typst adds `spacing` on top of the natural line height for the gap between
  // two list items, but a bullet's own wrapped line only gets `leading`. Setting
  // a bare `spacing` therefore puts a continuation line *further* from its
  // bullet than the next bullet sits — the wrapped text reads as if it belonged
  // to the item below. Adding `leading` keeps the two directions the same way
  // round, so wrapped lines get their line height plus `bullet-gap` and the gap
  // between items is always the larger of the two.
  set list(
    marker: [•],
    indent: 0.6em,
    body-indent: 0.6em,
    spacing: leading + bullet-gap,
    tight: true,
  )

  // Links read as links in the PDF; the colour is the only hint, so they still
  // look like text when printed.
  show link: it => text(fill: brand, it)

  body
}

// ── blocks ───────────────────────────────────────────────────────

// Name and contact line. Paragraph spacing is zeroed here so the gaps are
// exactly the `v()` calls and nothing else.
//
// `width: 100%` is load-bearing: without it the block shrinks to its widest
// child and `align(center)` has no spare width to centre into, which leaves the
// masthead sitting against the left margin.
//
// The summary deliberately is not part of this block: it belongs under its own
// "Summary" heading, because an unlabelled paragraph wedged under the contact
// line is what a parser reads as the first job entry. See the note in cv.typ.
//
// `below: 0em` on purpose: the gap down to the first section heading belongs to
// `section-gap`, and leaving any space here would make it a `max()` of the two.
#let masthead(name: [], contact: []) = block(below: 0em, width: 100%)[
  #set par(spacing: 0em)
  #align(center)[
    #text(size: 20.5pt, weight: "bold", tracking: 0.01em)[#name]
    #v(0.5em)
    #text(size: 8.7pt, fill: muted)[#contact]
  ]
]

// Section heading: bold title sitting on a full-width rule. `sticky` stops it
// from being stranded alone at the bottom of a page.
//
// `above` and `below` are parameters because a `grid` swallows the `above`
// spacing of the blocks inside it — the Skills/Language band zeroes `above` and
// spaces the grid itself instead. See the note in cv.typ.
//
// The title is a real `heading`, not styled text, so the tag tree a screen
// reader or an ATS's structure-aware parser walks marks it as /H2. Its own
// spacing and styling come from the `show heading` rules in `cv`.
#let section(title, above: section-gap, below: section-below) = block(
  above: above,
  below: below,
  sticky: true,
  width: 100%,
)[
  #set par(spacing: 0em)
  #heading(level: 2, outlined: false)[#title]
  #v(0.18em)
  #line(length: 100%, stroke: 0.7pt + ink)
]

// One position, school, or role. `points` is an array of content blocks and
// renders as bullets hung under the header line.
//
// The whole entry is one unbreakable block: a CV that splits a job's bullets
// across a page boundary reads as a layout bug, so an entry that does not fit
// moves to the next page intact.
//
// The gap that separates it from the next entry rides on `below`, not `above`.
// Typst takes the larger of the two neighbours' spacing, so with the gap on
// `above` the first entry under a heading would report `max(entry-gap,
// section-below)` and the gap under a heading would depend on what followed it.
// On `below`, the entry always contributes exactly `entry-gap` downwards and
// `above: 0em` never competes with the heading.
#let entry(
  title: [],
  org: none,
  field: none,
  when: [],
  where: none,
  points: (),
) = block(above: 0em, below: entry-gap, breakable: false)[
  // Zeroed so `title-meta` and `meta-points` are the only things setting these
  // gaps: the document default is 0.8em, which would otherwise be added to
  // every `v()` below and make the header block read as three loose lines.
  #set par(spacing: 0em)
  #text(size: 10.2pt, weight: "bold")[#title]
  #if org != none [
    #h(0.3em)#text(size: 10.2pt, fill: hairline)[•]#h(0.3em)
    #text(size: 10.2pt, weight: "bold")[#org]
  ]
  #v(title-meta)
  // "Field • dates | place", skipping whichever parts are absent.
  #text(size: 8.8pt, fill: muted)[
    #if field != none [#field #h(0.25em)•#h(0.25em)]
    #when
    #if where != none [ | #where]
  ]
  #if points.len() > 0 [
    #v(meta-points)
    #block(inset: (left: 0.15em))[
      #set text(size: body-size - 0.2pt)
      #list(..points)
    ]
  ]
]

// A comma-separated group (skills, languages): one wrapped paragraph instead
// of a list, which keeps the closing band to two short columns.
//
// `above: 0em` for the same reason as `entry`: the heading's `below` owns the
// gap, so a section followed by a list sits where a section followed by an
// entry sits.
#let inline-list(items) = block(above: 0em)[
  #set text(size: body-size - 0.2pt)
  #items.join([, ])
]

// The same band, one item per line — for a column too narrow to hold its items
// side by side without wrapping through the middle of one.
#let line-list(items) = block(above: 0em)[
  #set text(size: body-size - 0.2pt)
  #items.map(it => [#it]).join(linebreak())
]
