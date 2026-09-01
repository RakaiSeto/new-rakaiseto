import { Reveal } from '../components/Motion.jsx';
import { usePageMeta } from '../lib/seo.js';
import WallCanvas from '../components/WallCanvas.jsx';

export default function Wall() {
    usePageMeta('the wall — rakaiseto', 'Pinned by hand — the other side of the resume. Music, sport, travel, games.');

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
