import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText, LinkedinLogo } from '@phosphor-icons/react';
import BreathingDot from '../components/BreathingDot.jsx';
import Marquee from '../components/Marquee.jsx';
import ProjectRow from '../components/ProjectRow.jsx';
import Contact from '../components/Contact.jsx';
import About from '../components/About.jsx';
import Magnetic from '../components/Magnetic.jsx';
import { Reveal } from '../components/Motion.jsx';
import { projects } from '../lib/projects.js';
import { pageHead } from '../lib/route-meta.js';

const LOG_ITEMS = [
    'GO · LARAVEL · REACT · NODE.JS · POSTGRESQL · RABBITMQ · REDIS',
    'STEALTH TELECOM SAAS — MAJOR INDONESIAN RIDE-HAILING CLIENT',
    'FINAL YEAR INFORMATICS STUDENT — STATE POLYTECHNIC OF MALANG',
    '3+ YEARS ACROSS POS, INTERNAL FACTORY SYSTEMS & TELECOM SYSTEMS',
    'JAKARTA & MALANG, ID · UTC+7',
];

export const Route = createFileRoute('/')({
    head: () =>
        pageHead({
            title: 'Rakai Seto Sembodo — Fullstack Developer',
            description: 'Fullstack developer in Jakarta. Backend-heavy systems in Go, Laravel, and React that survive production.',
            path: '/',
            // No ogKey: the homepage keeps its hand-made static card.
        }),
    component: Home,
});

function Home() {
    // Main page previews the works: top three work entries plus the first
    // school assignment, in site order. The full list lives on /projects.
    const preview = [
        ...projects.filter((p) => p.category === 'work').slice(0, 3),
        ...projects.filter((p) => p.category === 'school').slice(0, 1),
    ];

    return (
        <>
            {/* HERO — identity, role, proof strip, actions */}
            <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] items-center gap-8 overflow-x-clip px-5 pt-24 pb-12 md:grid-cols-12 md:gap-8">
                {/* initial={false} on the hero: it paints straight from the SSR
                    HTML. Gating it on JS would delay LCP and leave the fold blank
                    if the bundle fails. Below-fold Reveals keep their entrance. */}
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="order-1 md:col-span-8"
                >
                    <p className="mb-5 font-mono text-[14px] uppercase tracking-[0.25em] text-zinc-400">
                        rakai seto sembodo — jakarta &amp; malang, id
                    </p>

                    <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
                        <span className="text-brand-400">Fullstack</span> Developer
                    </h1>

                    <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-zinc-400">
                        I build systems that survive production.
                    </p>

                    <p className="mt-5 flex items-center gap-2.5 font-mono text-[14px] tracking-[0.2em] text-zinc-300">
                        <BreathingDot className="bg-brand-500" />
                        open to work — fullstack &amp; backend roles
                    </p>

                    {/* evidence ledger — now / before, divided lines, no cards.
                        Desktop only; mobile gets the compact strip below. */}
                    <div className="mt-8 hidden max-w-[60ch] border-t border-white/10 md:block">
                        <div className="grid gap-2 py-4 sm:grid-cols-12 sm:gap-6">
                            <span className="font-mono text-[14px] uppercase tracking-[0.2em] text-brand-400 sm:col-span-2">
                                now
                            </span>
                            <div className="sm:col-span-7">
                                <p className="text-[14px] font-medium text-zinc-200">
                                    Fullstack Developer Intern — PT Intelix Global Crossing
                                </p>
                                <p className="mt-1 text-[14px] leading-relaxed text-zinc-500">
                                    Final-year informatics student at State Polytechnic of Malang.
                                </p>
                            </div>
                            <span className="font-mono text-[14px] tracking-[0.15em] text-zinc-300 sm:col-span-3 sm:text-right">
                                Jul 2026 – now
                            </span>
                        </div>

                        <div className="grid gap-1 border-t border-white/10 py-4 sm:grid-cols-12 sm:gap-4">
                            <span className="font-mono text-[14px] uppercase tracking-[0.2em] text-zinc-500 sm:col-span-2">
                                before
                            </span>
                            <div className="sm:col-span-7">
                                <p className="text-[14px] font-medium text-zinc-200">
                                    Co-founder / Backend Developer — stealth telecom SaaS
                                </p>
                                <p className="mt-1 text-[14px] leading-relaxed text-zinc-500">
                                    Go microservices used by a major Indonesian ride-hailing company. PostgreSQL, RabbitMQ, Redis,
                                    Docker CI/CD.
                                </p>
                            </div>
                            <span className="font-mono text-[14px] tracking-[0.15em] text-zinc-300 sm:col-span-3 sm:text-right">
                                Sep 2024 – Sep 2025
                            </span>
                        </div>

                        <p className="border-t border-white/10 py-4 font-mono text-[14px] uppercase tracking-[0.15em] text-zinc-300">
                            3+ years of experiences
                        </p>
                    </div>

                    {/* proof strip — the same two facts, compact; mobile only */}
                    <div className="mt-8 max-w-[60ch] border-t border-white/10 md:hidden">
                        <p className="py-4 font-mono text-[14px] uppercase tracking-[0.2em] text-zinc-300">
                            3+ years of experiences
                        </p>
                        <p className="border-t border-white/10 py-4 text-[14px] leading-relaxed text-zinc-500">
                            Fullstack intern at PT Intelix Global Crossing. Previously shipped Go
                            microservices for a major Indonesian ride-hailing company.
                        </p>
                    </div>

                    {/* CTAs — two equal pills, then quieter links */}
                    <div className="mt-8 flex flex-col gap-3">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Magnetic className="w-full sm:w-auto">
                                <a
                                    href="#work"
                                    className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 font-mono text-[14px] text-zinc-300 transition-all hover:border-brand-500/60 hover:text-brand-400 active:scale-[0.98] sm:w-auto sm:px-7"
                                >
                                    view the work
                                    <ArrowDown
                                        size={15}
                                        weight="bold"
                                        className="transition-transform duration-300 group-hover:translate-y-0.5"
                                    />
                                </a>
                            </Magnetic>
                            <Magnetic className="w-full sm:w-auto">
                                <a
                                    href="/CV_RAKAI.pdf"
                                    className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 font-mono text-[14px] text-zinc-300 transition-all hover:border-brand-500/60 hover:text-brand-400 active:scale-[0.98] sm:w-auto sm:px-7"
                                >
                                    <FileText size={16} />
                                    download cv
                                </a>
                            </Magnetic>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <a
                                href="mailto:rakaiseto@gmail.com"
                                className="group flex items-center gap-2 font-mono text-[14px] transition-colors hover:text-brand-500 text-zinc-400"
                            >
                                or email me directly
                                <ArrowUpRight
                                    size={15}
                                    weight="bold"
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/rakaiseto"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-2 font-mono text-[14px] transition-colors hover:text-brand-500 text-zinc-400"
                            >
                                <LinkedinLogo size={15} />
                                linkedin
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* ID card — the image earns its space */}
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="hidden order-2 justify-center md:col-span-4 md:flex md:justify-end"
                >
                    <figure className="relative w-full rounded-2xl border border-white/10 bg-zinc-950 md:max-w-[28rem]">
                        {/* photo plate — the full-body shot is taller than the card:
                            hair pokes over the top edge, feet dangle below the bottom.
                            The image is anchored so its hips (53.7% down) sit exactly
                            on the seam; the thighs run behind the opaque panel. */}
                        <div className="relative @container aspect-[7/5]">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 flex select-none flex-col items-start justify-between gap-1 font-black uppercase leading-none text-white/8 md:gap-2"
                            >
                                <span className="pl-[0.3em] tracking-[0.3em] text-[10.5cqw] md:text-[13cqw]">rakai</span>
                                <span className="pl-[0.3em] tracking-[0.3em] text-[10.5cqw] md:text-[13cqw]">seto</span>
                                <span className="pl-[0.3em] tracking-[0.3em] text-[10.5cqw] md:text-[13cqw]">sembodo</span>
                            </span>
                            <img
                                src="/images/hero.png"
                                alt="Rakai Seto Sembodo"
                                className="absolute inset-x-0 top-0 mx-auto h-auto w-[88%] md:w-[92%] select-none pointer-events-none -translate-y-[1%]"
                            />
                        </div>

                        {/* info panel — image now renders OVER this layer (legs cross
                            the text); identity block left, meta right; no cards */}
                        <figcaption className="rounded-b-2xl border-t border-white/10 bg-zinc-950 px-5 pb-4 pt-4">
                            <div className="text-right w-full">
                                <p className="flex items-center justify-end gap-2 font-mono text-[12px] tracking-[0.1em] text-brand-400">
                                    <BreathingDot className="bg-brand-500" />
                                    open to work
                                </p>
                                <p className="mt-2 font-mono text-[12px] tracking-[0.1em] text-zinc-300">
                                    jakarta &amp; malang, id — utc+7
                                </p>
                                <p className="mt-2 font-mono text-[12px] tracking-[0.1em] text-zinc-300">REMOTE · HYBRID</p>
                            </div>

                        </figcaption>
                    </figure>
                </motion.div>
            </section>

            <Marquee items={LOG_ITEMS} />
            <About />

            {/* THE CHAPTERS — sneak peek */}
            <section id="work" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 md:py-28">
                <Reveal className="mb-16 flex items-end justify-between md:mb-20">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                            Works I shipped, maintained, or learned from.
                        </h2>
                    </div>
                    <Link
                        to="/projects"
                        className="hidden font-mono text-[14px] transition-colors hover:text-brand-500 md:block text-zinc-400"
                    >
                        all works →
                    </Link>
                </Reveal>

                <div className="border-t border-white/10">
                    {preview.map((project, i) => (
                        <ProjectRow key={project.slug} project={project} index={i} />
                    ))}
                </div>
            </section>

            <Contact />
        </>
    );
}
