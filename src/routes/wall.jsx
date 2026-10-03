import { createFileRoute } from '@tanstack/react-router';
import { Reveal } from '../components/Motion.jsx';
import WallCanvas from '../components/WallCanvas.jsx';
import { pageHead } from '../lib/route-meta.js';

export const Route = createFileRoute('/wall')({
    head: () =>
        pageHead({
            title: 'the wall — rakaiseto',
            description: 'Pinned by hand — the other side of the resume. Music, sport, travel, games.',
            path: '/wall',
            ogKey: 'wall',
        }),
    component: Wall,
});

function Wall() {
    return (
        <section className="relative min-h-[100dvh] px-5 py-32 md:py-40">
            <div className="mx-auto max-w-[1400px]">
                <Reveal className="mb-16 md:mb-24">
                    <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.25em] text-zinc-300">the wall</p>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                        pinned by hand — the other side of Rakai
                    </h1>
                </Reveal>
            </div>
            <WallCanvas />
        </section>
    );
}
