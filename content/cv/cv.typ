// The CV. Edit this file and the PDF the site serves follows: `npm run dev`
// recompiles it on save, `npm run build` bakes it into the deploy.
//
// Layout lives in template.typ — a content change should never need it. One
// call per position: `entry` takes the header line and a `points` array for the
// bullets. Work and organisation dates read "Mon YYYY – Mon YYYY" to match
// content/about.json; education keeps to years, which is all a CV needs.
//
// A current role ends in "Present", never "now": applicant tracking systems
// parse "Present" as the open-ended end date and drop or guess at anything
// else. Same for the degree still in progress.

#import "template.typ": *

// Hands the whole document to the layout in template.typ, which is where the
// page size, margins, fonts, and spacing live.
#show: cv

// Contact separators, so the header line reads as one sentence instead of a
// wall of pipes.
//
// Spaces rather than `h()` gaps on either side of the pipe: a wide gap makes
// pdfminer-class extractors split the line, and on some entries reorder the
// location above the dates. Plain spaces keep the whole line one text run.
#let sep = [ #text(fill: hairline)[|] ]

#masthead(
  name: [Rakai Seto Sembodo],
  contact: [
    Jakarta, Indonesia
    #sep #link("mailto:rakaiseto@gmail.com")[rakaiseto\@gmail.com]
    #sep #link("https://rakaiseto.com")[rakaiseto.com]
  ],
)

// Its own heading, not a paragraph under the contact line: an unheaded block of
// prose at the top is what parsers hand back as the first work experience entry.
#section("Summary")

#block(above: 0em)[
  Fullstack developer with 3+ years of working experience, specialising in Go, PostgreSQL,
  Node.js, Laravel, and RabbitMQ. Driven to keep learning new skills and technologies.
]

// ── experience ───────────────────────────────────────────────────

#section("Work Experience")

#entry(
  title: "Fullstack Developer Intern",
  org: "PT Intelix Global Crossing",
  when: "Jul 2026 – Present",
  where: "Malang, Indonesia",
  points: (
    [Creating responsive and creative UI for internal support application while implementing backend API and Web Socket], 
    [Improve and maintain performance across multiple application to ensure good user experience]
  ),
)

#entry(
  title: "Fullstack Developer Intern",
  org: "PT Surabaya Autocomp Indonesia",
  when: "Jan 2026 – Jun 2026",
  where: "Mojokerto, Indonesia",
  points: (
    [Maintain and develop new web apps for the Safety, Health, and Environment team, speeding up
      the digitalisation of the team's paperwork and keeping the tools available on the factory
      floor.],
  ),
)

#entry(
  title: "Backend Developer",
  org: "Sekawan Media",
  when: "Sep 2025 – Jan 2026",
  where: "Malang, Indonesia (remote)",
  points: (
    [Part of the team behind HaloGigi, a dental self-screening and telemedicine platform.],
    [Built fast and efficient backend APIs for the platform in Laravel and MySQL, giving the
      mobile developers clean data and keeping the app stable and quick.],
  ),
)

#entry(
  title: "Co-Founder / Backend Developer",
  org: "Stealth Startup (Undisclosed Company)",
  when: "Sep 2024 – Sep 2025",
  where: "Jakarta, Indonesia (remote)",
  points: (
    // `#box` keeps "ride-hailing" on one line. Left bare, Typst breaks it at the
    // hyphen, and every extractor drops a line-end hyphen — the PDF then reads
    // "ridehailing", one nonsense token, which is exactly the kind of thing an
    // ATS keyword match misses.
    [Co-founded and built the backend of a confidential SaaS telecommunication platform used by a
      major #box[ride-hailing] company in Indonesia.],
    [Designed scalable microservices in Go, PostgreSQL, RabbitMQ, and Redis to handle high-load
      operations.],
    [Set up and maintained CI/CD pipelines with Docker and Git.],
    [Collaborated cross-functionally on product design, architecture, and feature rollout
      strategy.],
  ),
)

#entry(
  title: "Full Stack Developer",
  org: "Ardora Cipta Kreasi Teknologi",
  when: "Mar 2024 – Sep 2024",
  where: "Jakarta, Indonesia (remote)",
  points: (
    [Introduced Docker and Docker Compose, streamlining how the application is deployed and run.],
    [Rewrote the Go backend, cutting RAM usage by more than half.],
    [Developed the client and admin web applications in Laravel.],
    [Built vendor APIs for messaging, payment gateway, and biller integrations in Go.],
    [Helped develop an e-commerce dashboard in Laravel.],
  ),
)

#entry(
  title: "Full Stack Developer",
  org: "Artamaya Makmur Abadi",
  when: "Jan 2023 – Mar 2024",
  where: "Jakarta, Indonesia (remote)",
  points: (
    [Built the POS system: a Laravel web application for the cashier dashboard and client orders
      that streamlined the transaction process.],
    [Developed backend features in Go and gRPC to keep data secure in transit.],
    [Kept more than 5 servers running, holding application uptime.],
    [Created several transmitters that connect vendors to clients.],
  ),
)

#entry(
  title: "Software Developer Intern",
  org: "PT Pintar Cari Usaha",
  when: "May 2022 – Oct 2022",
  where: "Jakarta, Indonesia",
  points: (
    [Supported troubleshooting and optimisation of the internal backend code.],
  ),
)

// ── leadership ───────────────────────────────────────────────────

#section("Leadership")

#entry(
  title: "Web (Frontend & Backend) Miniclass Mentor",
  org: "Workshop Riset Informatika",
  when: "Oct 2023 – Jan 2025",
  where: "Malang, Indonesia",
  points: (
    [Shared frontend and backend knowledge with fellow students.],
    [Taught HTML, CSS, JS, and backend concepts to interested new students.],
    [Sat on the committee of Workshop Riset Informatika's events.],
  ),
)

#entry(
  title: "Lead Public Relation",
  org: "Workshop Riset Informatika",
  when: "Jan 2025 – Jan 2026",
  where: "Malang, Indonesia",
  points: (
    [Crafted announcement messages for WRI's affairs, keeping communications clear and impactful.],
    [Led and trained junior PR staff, building a collaborative and results-driven work
      environment.],
    [Opened strategic collaborations by building partnerships with key stakeholders and partner
      organisations.],
  ),
)

// ── education ────────────────────────────────────────────────────

#section("Education")

#entry(
  title: "State Polytechnic of Malang",
  field: "Informatics Engineering",
  when: "2023 – Present",
  where: "Malang, Indonesia",
  points: (
    [Class president of the Information Technology Department, coordinating students for
      department activities and events.],
  ),
)

#entry(
  title: "State Vocational High School 7 Jakarta",
  field: "Multimedia",
  when: "2020 – 2023",
  where: "Jakarta, Indonesia",
  points: (
    [Part of the school's documentation team, operating the drone that collected event footage.],
    [Stood in as the Web Design substitute teacher on several occasions.],
  ),
)

// ── skills + languages ───────────────────────────────────────────
// Side by side so the closing band stays a short block instead of two long
// stacked lists.
//
// A `grid` swallows the `above` spacing of the blocks inside it, so a heading
// placed straight into a cell would collide with whatever comes before the
// grid. Space the grid itself instead, and let the headings inside start flush.
//
// `block(above:)` rather than `v()`: a block's `above` collapses with the
// previous block's `below` the same way every other section heading does, so
// this one lands on the same baseline distance as the rest. A bare `v()` adds
// on top of that space instead, which pushed this heading 8.5pt too low.

#block(above: section-gap)[
  #grid(
    columns: (11.4cm, 1fr),
    gutter: 1.6em,
    [
      #section("Skills", above: 0em)
      #inline-list((
        [Go],
        [Laravel],
        [PostgreSQL],
        [MySQL],
        [Docker],
        [Redis],
        [RabbitMQ],
        [gRPC],
        [Ubuntu],
      ))
    ],
    [
      #section("Language", above: 0em)
      // One language per line: the pair does not fit on one line in this
      // column, and a wrap through "English — / Professional" reads like a
      // typo.
      #line-list((
        [Indonesian — Native],
        [English — Professional],
      ))
    ],
  )
]
