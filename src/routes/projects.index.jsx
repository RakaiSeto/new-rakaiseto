import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Reveal } from '../components/Motion.jsx';
import { projects } from '../lib/projects.js';
import { pageHead } from '../lib/route-meta.js';

// Cell anatomy shared by both sections: title · one-line summary · year +
// stack. Hairline divider, no box, no index number.
function ProjectCell({ project }) {
    return (
        <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="group block border-t border-white/10 py-4 transition-colors duration-300 hover:border-brand-500/40 md:py-5"
        >
            <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-brand-400 md:text-2xl">
                    {project.title}
                </h3>
                <ArrowUpRight
                    size={16}
                    className="shrink-0 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-400"
                />
            </div>

            <p className="mt-2 line-clamp-1 text-[14px] leading-relaxed text-zinc-400">
                {/* NBSP keeps the one-line slot when a work has no summary, so the
            year chip below stays aligned with its grid-row neighbor */}
                {project.summary || '\u00A0'}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[12px] tracking-[0.15em] text-brand-400">{project.year}</span>
                <span className="h-3 w-px bg-white/15" aria-hidden />
                {project.stack.map((s) => (
                    <span
                        key={s}
                        className="rounded-full border px-2.5 py-0.5 font-mono text-[14px] border-white/20 text-zinc-300"
                    >
                        {s}
                    </span>
                ))}
            </div>
        </Link>
    );
}

// Plain symmetric 2-column grid for both groups — no stagger, no numbers.
// School assignments sit in their own labeled grid at the bottom.
export const Route = createFileRoute('/projects/')({
    head: () =>
        pageHead({
            title: 'Projects — Rakai Seto Sembodo',
            path: '/projects',
            ogKey: 'projects',
        }),
    component: Projects,
});

function Projects() {
    const main = projects.filter((p) => p.category !== 'school');
    const school = projects.filter((p) => p.category === 'school');

    return (
        <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-28">
            <Reveal className="mb-14">
                <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">Every works, told as it is.</h1>
            </Reveal>

            <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                {main.map((project, i) => (
                    <Reveal key={project.slug} delay={i * 0.05}>
                        <ProjectCell project={project} />
                    </Reveal>
                ))}
            </div>

            {school.length > 0 && (
                <div className="mt-16 md:mt-20">
                    <Reveal className="border-t border-white/10 pt-8">
                        <p className="font-mono text-[14px] uppercase tracking-[0.25em] text-zinc-300">school assignments</p>
                    </Reveal>
                    <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                        {school.map((project, i) => (
                            <Reveal key={project.slug} delay={i * 0.05}>
                                <ProjectCell project={project} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
