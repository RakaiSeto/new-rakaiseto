import { Link, useLocation } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Briefcase,
    EnvelopeSimple,
    House,
    Wall,
    Waveform,
} from '@phosphor-icons/react';

// `tab` is the short label the bottom bar uses; desktop has room for the full one.
const NAV_ITEMS = [
    { to: '/', label: 'Home', tab: 'Home', icon: House },
    { to: '/projects', label: 'Works', tab: 'Works', icon: Briefcase },
    { to: '/vibes', label: 'Vibes', tab: 'Vibes', icon: Waveform },
    { to: '/wall', label: 'The wall', tab: 'Wall', icon: Wall },
];

const DESKTOP_ITEMS = NAV_ITEMS.filter((item) => item.to !== '/');
const MAIL_HREF = 'mailto:rakaiseto@gmail.com';

// TanStack's Link concatenates `className` with the active/inactive variant
// className, so the colour lives only in the variant props — never in both,
// or two conflicting text-colour utilities end up on the element.
const linkClass = 'text-[14px] transition-colors hover:text-brand-400';
const ACTIVE_PROPS = { className: 'text-brand-400' };

// Active state is derived from the pathname rather than Link's own variant
// props: /projects/<slug> should still light up Works, and the sliding pill
// needs the boolean in JS anyway.
function useActivePath() {
    const pathname = useLocation({ select: (location) => location.pathname });
    return (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));
}

export default function Nav() {
    const isActive = useActivePath();

    return (
        <>
            {/* desktop — floating pill up top */}
            <header className="fixed inset-x-0 top-4 z-40 hidden px-4 lg:block">
                <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-zinc-900/70 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                    <Link
                        to="/"
                        className="flex items-center gap-2 font-mono text-[14px] font-medium tracking-tight"
                    >
                        <img src="/images/logo.png" alt="" className="h-5 w-auto select-none" />
                        rakaiseto
                    </Link>

                    <div className="flex items-center gap-6">
                        {DESKTOP_ITEMS.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={linkClass}
                                activeProps={ACTIVE_PROPS}
                                inactiveProps={{ className: 'text-zinc-500' }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <a
                        href={MAIL_HREF}
                        className="flex items-center gap-1 rounded-full border border-brand-500/40 px-4 py-1.5 font-mono text-[12px] text-brand-400 transition-all hover:border-brand-500 hover:bg-brand-500/10 active:scale-[0.98]"
                    >
                        email me
                        <ArrowUpRight size={13} weight="bold" />
                    </a>
                </nav>
            </header>

            {/* mobile — a dock along the bottom edge, where thumbs actually are.
                It spans the full width instead of floating: a floating pill leaves
                page content readable in the gaps either side of it. */}
            <nav aria-label="primary" className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
                {/* Fade the page out above the dock so text scrolls under it rather
                    than being sliced off at the border. */}
                <div
                    aria-hidden
                    className="pointer-events-none h-6 bg-gradient-to-t from-zinc-950 to-transparent"
                />
                <div className="border-t border-white/10 bg-zinc-950/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
                    <div className="mx-auto flex max-w-md items-center gap-1 px-2 pt-1 pb-1.5">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.to);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
                                        active ? 'text-brand-400' : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                                >
                                    {active && (
                                        <motion.span
                                            aria-hidden
                                            layoutId="tab-pill"
                                            className="absolute inset-0 rounded-2xl bg-brand-500/10 ring-1 ring-inset ring-brand-500/20"
                                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                        />
                                    )}
                                    <Icon
                                        size={20}
                                        weight={active ? 'fill' : 'regular'}
                                        className="relative"
                                    />
                                    <span className="relative">{item.tab}</span>
                                </Link>
                            );
                        })}

                        {/* Mail is an action, not a route, so it gets no active
                            treatment and the same muted icon as an inactive tab —
                            a brand-coloured icon here reads as a second active tab. */}
                        <a
                            href={MAIL_HREF}
                            aria-label="email me"
                            className="group relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-500 transition-colors hover:text-brand-400 active:scale-[0.96]"
                        >
                            <EnvelopeSimple
                                size={20}
                                className="relative transition-transform group-hover:-translate-y-0.5"
                            />
                            <span className="relative">email</span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
