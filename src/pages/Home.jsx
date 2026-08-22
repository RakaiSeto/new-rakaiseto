import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText } from '@phosphor-icons/react';
import BreathingDot from '../components/BreathingDot.jsx';
import Marquee from '../components/Marquee.jsx';
import ProjectRow from '../components/ProjectRow.jsx';
import Contact from '../components/Contact.jsx';
import About from '../components/About.jsx';
import Magnetic from '../components/Magnetic.jsx';
import { Reveal } from '../components/Motion.jsx';
import { projects } from '../lib/projects.js';
import { usePageMeta } from '../lib/seo.js';

const LOG_ITEMS = [
    'GO · LARAVEL · REACT · NODE.JS · POSTGRESQL · RABBITMQ · REDIS',
    'STEALTH TELECOM SAAS — MAJOR INDONESIAN RIDE-HAILING CLIENT',
    'FINAL YEAR INFORMATICS STUDENT — STATE POLYTECHNIC OF MALANG',
    '3+ YEARS ACROSS POS, INTERNAL FACTORY SYSTEMS & TELECOM SYSTEMS',
    'JAKARTA & MALANG, ID · UTC+7',
];

export default function Home() {
    usePageMeta(
        'Rakai Seto Sembodo — Fullstack Developer',
        'Fullstack developer in Jakarta. Backend-heavy systems in Go, Laravel, and React that survive production.',
    );

    // All four chapters render as editorial index rows — Panjang keeps its
    // personality as the final row instead of a special-case strip.

    return (
        <>
            {/* HERO — proof first: identity, current role, evidence ledger */}
            <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] items-center gap-10 overflow-x-clip px-5 pt-32 pb-12 md:grid-cols-12 md:gap-8 md:pt-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="order-2 md:order-1 md:col-span-7"
                >
                    <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                        rakai seto sembodo — jakarta &amp; malang, id
                    </p>

                    <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
                        Fullstack &amp; <span className="text-brand-400">Backend</span> Developer
                    </h1>

                    <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-zinc-400">
                        I build systems that survive production.
                    </p>

                    <p className="mt-5 flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-zinc-300">
                        <BreathingDot className="bg-brand-500" />
                        open to work — fullstack &amp; backend roles
                    </p>

                    {/* evidence ledger — now / before, divided lines, no cards */}
                    <div className="mt-8 max-w-[56ch] border-t border-white/10">
                        <div className="grid gap-2 py-4 sm:grid-cols-12 sm:gap-6">
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-400 sm:col-span-2">
                                now
                            </span>
                            <div className="sm:col-span-8">
                                <p className="text-sm font-medium text-zinc-200">Fullstack Developer Intern — PT Intelix Global Crossing</p>
                                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                                    Final-year informatics student at State Polytechnic of Malang.
                                </p>
                            </div>
                            <span className="font-mono text-[11px] tracking-[0.15em] text-zinc-600 sm:col-span-2 sm:text-right">
                                Jul 2026 – now
                            </span>
                        </div>

                        <div className="grid gap-2 border-t border-white/10 py-4 sm:grid-cols-12 sm:gap-6">
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 sm:col-span-2">
                                before
                            </span>
                            <div className="sm:col-span-8">
                                <p className="text-sm font-medium text-zinc-200">
                                    Co-founder / Backend Developer — stealth telecom SaaS
                                </p>
                                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                                    Go microservices used by a major Indonesian ride-hailing company. PostgreSQL, RabbitMQ, Redis, Docker CI/CD.
                                </p>
                            </div>
                            <span className="font-mono text-[11px] tracking-[0.15em] text-zinc-600 sm:col-span-2 sm:text-right">
                                Sep 2024 – Sep 2025
                            </span>
                        </div>

                        <p className="border-t border-white/10 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-600">
                            3+ years of experiences
                        </p>
                    </div>

                    {/* CTAs — equal weight, no primary */}
                    <div className="mt-8 flex flex-wrap items-center gap-5">
                        <Magnetic>
                            <a
                                href="#work"
                                className="group flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-mono text-sm text-zinc-300 transition-all hover:border-brand-500/60 hover:text-brand-400 active:scale-[0.98]"
                            >
                                view the work
                                <ArrowDown
                                    size={15}
                                    weight="bold"
                                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                                />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="/CV_RAKAI.pdf"
                                className="group flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-mono text-sm text-zinc-300 transition-all hover:border-brand-500/60 hover:text-brand-400 active:scale-[0.98]"
                            >
                                <FileText size={16} />
                                download cv
                            </a>
                        </Magnetic>
                        <a
                            href="mailto:rakaiseto@gmail.com"
                            className="group flex items-center gap-2 font-mono text-sm transition-colors hover:text-brand-500 text-zinc-400"
                        >
                            or email me directly
                            <ArrowUpRight
                                size={15}
                                weight="bold"
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </div>
                </motion.div>

                {/* ID card — the image earns its space */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="order-1 md:order-2 flex justify-center md:col-span-5 md:justify-end"
                >
                    <figure className="relative w-full rounded-2xl border border-white/10 bg-zinc-950 md:max-w-[28rem]">
                        {/* photo plate — the full-body shot is taller than the card:
                            hair pokes over the top edge, feet dangle below the bottom.
                            The image is anchored so its hips (54.7% down) sit exactly
                            on the seam; the thighs run behind the opaque panel. */}
                        <div className="relative aspect-[7/5]">
                            <img
                                src="/images/hero.png"
                                alt="Rakai Seto Sembodo"
                                className="absolute inset-x-0 top-0 h-auto w-full select-none -translate-y-[7.1%]"
                            />

                            {/* spine — fills the dead left flank, editorial index */}
                            <span
                                aria-hidden="true"
                                className="absolute left-3.5 top-1/2 hidden -translate-y-1/2 rotate-180 select-none whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600 [writing-mode:vertical-rl] md:block"
                            >
                                rakaiseto — fullstack developer
                            </span>
                        </div>

                        {/* info panel — image now renders OVER this layer (legs cross
                            the text); identity block left, meta right; no cards */}
                        <figcaption className="rounded-b-2xl border-t border-white/10 bg-zinc-950 px-5 pb-4 pt-4">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-lg font-semibold leading-tight tracking-tight text-zinc-100 md:text-xl">
                                        Rakai Seto Sembodo
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                                        backend-leaning fullstack developer
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="flex items-center justify-end gap-2 font-mono text-xs tracking-[0.1em] text-brand-400">
                                        <BreathingDot className="bg-brand-500" />
                                        open to work
                                    </p>
                                    <p className="mt-2 font-mono text-xs tracking-[0.1em] text-zinc-500">
                                        jakarta &amp; malang, id
                                    </p>
                                    <p className="font-mono text-xs tracking-[0.1em] text-zinc-500">
                                        utc+7
                                    </p>
                                </div>
                            </div>

                            {/* CTA footer row */}
                            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                                <a
                                    href="/CV_RAKAI.pdf"
                                    className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-brand-400"
                                >
                                    <FileText size={13} />
                                    download cv
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/rakaiseto"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-brand-400"
                                >
                                    linkedin
                                    <ArrowUpRight size={13} weight="bold" />
                                </a>
                            </div>
                        </figcaption>
                    </figure>
                </motion.div>
            </section>

            <Marquee items={LOG_ITEMS} />
            <About />

            {/* THE CHAPTERS — sneak peek */}
            <section id="work" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:py-32">
                <Reveal className="mb-16 flex items-end justify-between md:mb-20">
                    <div>
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">the chapters</p>
                        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                            Shipped, maintained,
                            <br />
                            or painfully learned from.
                        </h2>
                    </div>
                    <Link
                        to="/projects"
                        className="hidden font-mono text-sm transition-colors hover:text-brand-500 md:block text-zinc-400"
                    >
                        all chapters →
                    </Link>
                </Reveal>

                <div className="border-t border-white/10">
                    {projects.map((project, i) => (
                        <ProjectRow key={project.slug} project={project} index={i} />
                    ))}
                </div>
            </section>

            <Contact />
        </>
    );
}
