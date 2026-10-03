import { createFileRoute, Link } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, GlobeHemisphereWest, SquaresFour } from '@phosphor-icons/react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import PosMock from '../components/PosMock.jsx';
import Magnetic from '../components/Magnetic.jsx';
import TechChip from '../components/TechChip.jsx';
import { Reveal, MaskWords } from '../components/Motion.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import { getProject, nextProject, projects } from '../lib/projects.js';
import { pageHead } from '../lib/route-meta.js';
import NotFound from '../components/NotFound.jsx';

function SectionTitle({ children }) {
    return (
        <h2 className="mb-6 flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.25em] text-brand-400">
            <span className="h-px w-10 bg-brand-500/50" aria-hidden />
            {children}
        </h2>
    );
}

const mdComponents = {
    h2: ({ children }) => <SectionTitle>{children}</SectionTitle>,
    h3: ({ children }) => <h3 className="mb-3 mt-8 text-xl font-semibold tracking-tight">{children}</h3>,
    p: ({ children }) => (
        // div, not p: markdown images render as <figure> blocks, and a figure
        // inside a <p> is invalid HTML — browsers would break the paragraph.
        <div className="mb-6 max-w-[65ch] leading-relaxed text-zinc-400">{children}</div>
    ),
    ul: ({ children }) => <ul className="mb-6 space-y-2 max-w-[65ch]">{children}</ul>,
    li: ({ children }) => (
        <li className="flex gap-3 leading-relaxed text-zinc-400">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden />
            <span>{children}</span>
        </li>
    ),
    // Screenshots are withheld site-wide — every project leads with type.
    // The captures stay in the markdown source as the content record, but
    // nothing renders them.
    img: () => null,
    a: ({ href, children }) => (
        <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="underline decoration-brand-500/40 underline-offset-4 transition-colors hover:text-brand-500 text-brand-400"
        >
            {children}
        </a>
    ),
};

function MetaRow({ label, value }) {
    return (
        <div className="flex items-baseline justify-between gap-6 border-b py-3 last:border-0 border-white/10">
            <span className="font-mono text-[14px] uppercase tracking-[0.18em] text-zinc-500">{label}</span>
            <span className="text-right font-mono text-[14px] text-zinc-200">{value}</span>
        </div>
    );
}

function RailItem({ project, index, current }) {
    const active = project.slug === current;
    return (
        <li className="shrink-0 md:shrink">
            <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                aria-current={active ? 'page' : undefined}
                className={`flex items-baseline gap-2.5 border-l-2 py-1.5 pl-3 transition-colors duration-200 ${
                    active ? 'border-brand-500 bg-brand-500/[0.04]' : 'border-white/10 hover:border-white/40'
                }`}
            >
                <span className={`font-mono text-[12px] tracking-[0.15em] ${active ? 'text-brand-400' : 'text-zinc-600'}`}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`truncate text-[14px] ${active ? 'font-medium text-zinc-100' : 'text-zinc-500'}`}>
                    {project.title}
                </span>
            </Link>
        </li>
    );
}

export const Route = createFileRoute('/projects/$slug')({
    loader: ({ params }) => getProject(params.slug) ?? null,
    head: ({ loaderData, params }) =>
        pageHead({
            title: loaderData ? `${loaderData.title} — Rakai Seto Sembodo` : 'Project — Rakai Seto Sembodo',
            description: loaderData?.summary,
            path: `/projects/${params.slug}`,
            ogKey: loaderData ? `projects/${params.slug}` : undefined,
            ogType: 'article',
        }),
    component: ProjectDetail,
});

function ProjectDetail() {
    const { slug } = Route.useParams();
    const project = Route.useLoaderData();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24 });

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    // an open switcher must not survive a route change (back/forward, select)
    useEffect(() => setModalOpen(false), [slug]);

    if (!project) return <NotFound />;

    const next = nextProject(project.slug);

    const mainProjects = projects.filter((p) => p.category !== 'school');
    const schoolProjects = projects.filter((p) => p.category === 'school');
    return (
        <article className="mx-auto max-w-[1400px] px-5 pt-32 pb-24">
            <motion.div
                aria-hidden
                className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-brand-500/80"
                style={{ scaleX }}
            />

            {/* rail · header · body — the project rail spans both header and body */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start md:gap-x-10 md:gap-y-16">
                {/* mini project index — jumps between case studies. Sticky on md+;
            horizontal scroll strip on mobile. Not wrapped in Reveal: a
            transformed ancestor would break position:sticky. */}
                <nav aria-label="projects" className="order-2 md:order-none md:col-span-3 md:row-span-2 md:self-stretch">
                    {/* mobile: modal trigger — the desktop rail, hidden below md */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={openModal}
                            aria-haspopup="dialog"
                            aria-expanded={modalOpen}
                            className="flex w-full items-center justify-between gap-4 border-y border-white/10 py-4 text-left font-mono text-[14px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-zinc-100 active:scale-[0.99]"
                        >
                            <span className="flex items-center gap-2">
                                <SquaresFour size={15} weight="bold" className="text-brand-400" />
                                projects
                                <span className="text-zinc-600">({projects.length})</span>
                            </span>
                            <span className="flex items-center gap-1 text-brand-400">
                                browse
                                <ArrowRight size={14} weight="bold" />
                            </span>
                        </button>
                    </div>
                    <div className="hidden md:sticky md:top-28 md:block">
                        <p className="mb-3 font-mono text-[14px] uppercase tracking-[0.25em] text-zinc-500">projects</p>
                        <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:block md:space-y-0.5 md:px-0 md:pb-0">
                            {mainProjects.map((p, i) => (
                                <RailItem key={p.slug} project={p} index={i} current={project.slug} />
                            ))}
                        </ul>
                        {schoolProjects.length > 0 && (
                            <div className="mt-8 border-t border-white/10 pt-4 md:mt-10">
                                <p className="mb-3 font-mono text-[14px] uppercase tracking-[0.25em] text-zinc-500">school</p>
                                <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:block md:space-y-0.5 md:px-0 md:pb-0">
                                    {schoolProjects.map((p, i) => (
                                        <RailItem
                                            key={p.slug}
                                            project={p}
                                            index={mainProjects.length + i}
                                            current={project.slug}
                                        />
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
                {/* header */}
                <header className="order-1 md:order-none md:col-span-9">
                    <Reveal className="mb-8 flex items-center gap-4 font-mono text-[12px] tracking-[0.2em] text-zinc-400">
                        <Link to="/projects" className="flex items-center gap-2 transition-colors hover:text-brand-500">
                            <ArrowLeft size={14} weight="bold" />
                            all projects
                        </Link>
                    </Reveal>

                    <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
                        <MaskWords text={project.title} delay={0.1} />
                    </h1>

                    <Reveal delay={0.35}>
                        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-zinc-400">{project.summary}</p>
                    </Reveal>

                    <Reveal delay={0.5} className="mt-8 flex flex-wrap gap-2">
                        {project.stack.map((s) => (
                            <TechChip key={s} name={s} />
                        ))}
                    </Reveal>

                    {/* actions */}
                    <Reveal delay={0.65} className="mt-10 flex flex-wrap items-center gap-4">
                        {project.demo && (
                            <Magnetic>
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-mono text-[14px] font-medium text-zinc-950 shadow-[0_12px_32px_-12px_rgba(70,190,253,0.55)] transition-all hover:bg-brand-400 active:scale-[0.98]"
                                >
                                    <GlobeHemisphereWest size={15} weight="bold" />
                                    live demo
                                    <ArrowUpRight size={14} weight="bold" />
                                </a>
                            </Magnetic>
                        )}
                        {project.repo && (
                            <Magnetic>
                                <a
                                    href={project.repo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-[14px] transition-all hover:border-brand-500/60 active:scale-[0.98] border-white/20 text-zinc-300 hover:text-brand-400"
                                >
                                    <GithubLogo size={15} />
                                    source
                                </a>
                            </Magnetic>
                        )}
                    </Reveal>
                </header>

                {/* body: prose · meta rail */}
                <div className="order-3 md:order-none md:col-span-9 grid grid-cols-1 gap-12 md:grid-cols-9 md:items-start md:gap-x-10">
                    <div className="md:col-span-6">
                        {project.mock ? (
                            <>
                                <Reveal className="mb-10">
                                    <PosMock />
                                </Reveal>
                                <Markdown components={mdComponents}>{project.body}</Markdown>
                            </>
                        ) : (
                            <Markdown components={mdComponents}>{project.body}</Markdown>
                        )}
                    </div>

                    <aside className="md:col-span-3">
                        <Reveal delay={0.15}>
                            <div className="rounded-xl border px-5 py-2 border-white/10">
                                <MetaRow label="role" value={project.role ?? '—'} />
                                <div className="border-b py-3 last:border-0 border-white/10">
                                    <p className="mb-3 font-mono text-[14px] uppercase tracking-[0.18em] text-zinc-500">stack</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.stack.map((s) => (
                                            <TechChip key={s} name={s} compact />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </aside>
                </div>
            </div>

            {/* next project */}
            <nav className="mt-28 border-t pt-10 border-white/10">
                <Reveal>
                    <Link to="/projects/$slug" params={{ slug: next.slug }} className="group flex items-center justify-between gap-6">
                        <div>
                            <p className="mb-2 font-mono text-[14px] uppercase tracking-[0.25em] text-zinc-500">next project</p>
                            <span className="text-3xl font-semibold tracking-tight transition-colors group-hover:text-brand-500 md:text-5xl">
                                {next.title}
                            </span>
                        </div>
                        <ArrowUpRight
                            size={36}
                            weight="light"
                            className="shrink-0 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-brand-500 text-zinc-600"
                        />
                    </Link>
                </Reveal>
            </nav>
            <AnimatePresence>
                {modalOpen && (
                    <ProjectModal
                        mainProjects={mainProjects}
                        schoolProjects={schoolProjects}
                        currentSlug={project.slug}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>
        </article>
    );
}
