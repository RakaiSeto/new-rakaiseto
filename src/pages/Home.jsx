import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText } from '@phosphor-icons/react';
import BreathingDot from '../components/BreathingDot.jsx';
import Marquee from '../components/Marquee.jsx';
import ProjectRow from '../components/ProjectRow.jsx';
import PanjangStrip from '../components/PanjangStrip.jsx';
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

    const featured = projects.filter((p) => p.slug === 'monetapos');

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
                            3+ years fullstack
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
                    <figure className="relative w-full rounded-2xl border border-white/10 bg-zinc-950 @container md:max-w-[min(26rem,calc((100dvh-9.5rem)*0.6))]">
                        {/* Composition locked to card width via cqw: the seam always
                            crosses the image at ~52% (hip line), feet dangle a fixed
                            fraction below the card, on every device. */}
                        <div className="h-[46.2cqw] w-full" aria-hidden />
                        <img
                            src="/images/hero.png"
                            alt="Rakai Seto Sembodo"
                            className="absolute inset-0 z-10 h-auto w-full select-none -translate-y-[30.8cqw] translate-x-[11.5cqw]"
                        />
                        <figcaption className="relative z-0 border-t border-white/10 px-[3.8cqw] pb-[3.8cqw] pt-[30.8cqw]">
                            <p className="text-[3.4cqw] font-semibold leading-[1.43] text-zinc-100">Rakai Seto Sembodo</p>
                            <p className="mt-[0.5cqw] font-mono text-[2.6cqw] uppercase leading-[1.5] tracking-[0.15em] text-zinc-400">
                                backend-leaning fullstack developer
                            </p>
                            <p className="mt-[2.4cqw] flex items-center gap-[1.9cqw] font-mono text-[2.6cqw] leading-[1.5] tracking-[0.15em] text-brand-400">
                                <BreathingDot className="bg-brand-500" />
                                open to work
                            </p>
                            <p className="mt-[1.4cqw] font-mono text-[2.6cqw] leading-[1.5] tracking-[0.15em] text-zinc-500">
                                jakarta &amp; malang, id · utc+7
                            </p>
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

                <div className="space-y-24 md:space-y-32">
                    {featured.map((project, i) => (
                        <ProjectRow key={project.slug} project={project} index={i} />
                    ))}
                    <PanjangStrip />
                </div>

                {/* CURRENTLY WRITING — the present tense */}
                <Reveal className="mt-24 border-t pt-10 md:mt-32 border-white/10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                            <motion.span
                                animate={{ opacity: [1, 0.35, 1] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500"
                                aria-hidden
                            />
                            <div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                                    currently writing
                                </p>
                                <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                                    Chapter 3: something new, with a friend.
                                </h3>
                                <p className="mt-2 max-w-[52ch] leading-relaxed text-zinc-400">
                                    Can't tell you what it is yet — but it's the reason this biography has a future tense. Details
                                    when it's ready to be shown.
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/vibes"
                            className="group flex shrink-0 items-center gap-2 font-mono text-sm transition-colors hover:text-brand-500 text-zinc-400"
                        >
                            meanwhile, check the vibes
                            <ArrowUpRight
                                size={15}
                                weight="bold"
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>
                    </div>
                </Reveal>
            </section>

            <Contact />
        </>
    );
}
