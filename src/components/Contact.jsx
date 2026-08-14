import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, FileText, LinkedinLogo } from '@phosphor-icons/react'
import Magnetic from './Magnetic.jsx'
import { MaskWords, Reveal } from './Motion.jsx'

const CV_URL = '/CV_RAKAI.pdf'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-5 py-28 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          the desk
        </p>
        <h2 className="text-4xl font-semibold tracking-tighter leading-[1.05] md:text-6xl">
          <MaskWords text="Want to build something spectacular with me?" delay={0.15} />
        </h2>
        <Reveal delay={0.5}>
          <p className="mx-auto mt-6 max-w-[52ch] leading-relaxed text-zinc-400">
            Or are you just here for the{' '}
            <Link
              to="/vibes"
              className="underline decoration-brand-500/40 underline-offset-4 transition-colors hover:decoration-brand-500 text-brand-400"
            >
              music taste
            </Link>
            ? Either way — give me a nudge. I answer fast.
          </p>
        </Reveal>

        <Reveal delay={0.65} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="mailto:rakaiseto@gmail.com"
              className="flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-mono text-sm font-medium text-zinc-950 shadow-[0_12px_32px_-12px_rgba(70,190,253,0.55)] transition-transform hover:bg-brand-400 active:scale-[0.98]"
            >
              rakaiseto@gmail.com
              <ArrowRight size={16} weight="bold" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://www.linkedin.com/in/rakaiseto"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border px-7 py-3.5 font-mono text-sm transition-all hover:border-brand-500/60 active:scale-[0.98] border-white/15 text-zinc-300 hover:text-brand-400"
            >
              <LinkedinLogo size={16} />
              linkedin
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={CV_URL}
              className="flex items-center gap-2 rounded-full border px-7 py-3.5 font-mono text-sm transition-all hover:border-brand-500/60 active:scale-[0.98] border-white/15 text-zinc-300 hover:text-brand-400"
            >
              <FileText size={16} />
              download cv
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.8}>
          <Link
            to="/vibes"
            className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] transition-colors hover:text-brand-500 text-zinc-600"
          >
            or just like me for my music taste?
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
