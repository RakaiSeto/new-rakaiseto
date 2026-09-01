import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, FileText, LinkedinLogo, List, X } from '@phosphor-icons/react';

const NAV_ITEMS = [
    { to: '/projects', label: 'Works' },
    { to: '/vibes', label: 'Vibes' },
    { to: '/ai', label: 'AI usage' },
    { to: '/wall', label: 'The wall' },
];

const CV_URL = '/CV_RAKAI.pdf';

const linkClass = ({ isActive }) =>
    `text-[14px] transition-colors hover:text-brand-400 ${isActive ? 'text-brand-400' : 'text-zinc-500'}`;

const menuLinkClass = ({ isActive }) =>
    `group flex items-baseline gap-5 py-5 transition-colors ${isActive ? 'text-brand-400' : 'text-zinc-200'}`;

// Bottom sheet for <lg. Sits as a sibling of the pill — never inside it (the
// pill's backdrop-blur creates a containing block that would trap a fixed
// child). Spring in from the bottom edge, swipe-down to dismiss, Escape /
// backdrop / link all close, body scroll locks while open.
function MenuSheet({ open, onClose }) {
    const panelRef = useRef(null);
    // Off-screen offset in pixels, measured from the sheet's own height.
    // A percentage initial (y: '100%') never starts animating when framer's
    // drag system is also attached, so the panel is offset by a measured
    // pixel value instead.
    const [offset, setOffset] = useState(600);

    useEffect(() => {
        if (open && panelRef.current) setOffset(panelRef.current.offsetHeight);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="sheet"
                    className="fixed inset-0 z-30 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* dim + blur; tap to close */}
                    <div aria-hidden onClick={onClose} className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" />

                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="menu"
                        className="absolute inset-x-0 bottom-0 rounded-t-[2rem] border-t border-white/10 bg-zinc-950/90 px-6 pt-3 pb-[max(env(safe-area-inset-bottom),1.25rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_-24px_48px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                        initial={{ y: offset }}
                        animate={{ y: 0 }}
                        exit={{ y: offset }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15" aria-hidden />
                        <p className="mb-3 font-mono text-[14px] uppercase tracking-[0.25em] text-zinc-500">menu</p>

                        <nav aria-label="mobile" className="border-t border-white/10">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.to}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.4, delay: 0.06 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <NavLink to={item.to} onClick={onClose} className={menuLinkClass}>
                                        <span className="font-mono text-[12px] tracking-[0.2em] text-zinc-500 transition-colors group-hover:text-brand-400">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-2xl font-semibold tracking-tight">{item.label}</span>
                                        <ArrowUpRight
                                            size={18}
                                            weight="bold"
                                            className="ml-auto self-center text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-400"
                                        />
                                    </NavLink>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-5 border-t border-white/10 pt-5">
                            <a
                                href="mailto:rakaiseto@gmail.com"
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 py-4 font-mono text-[14px] font-medium text-zinc-950 transition-transform active:scale-[0.98]"
                            >
                                rakaiseto@gmail.com
                                <ArrowUpRight size={15} weight="bold" />
                            </a>
                            <div className="mt-4 flex items-center justify-center gap-6">
                                <a
                                    href="https://www.linkedin.com/in/rakaiseto"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-brand-400"
                                >
                                    <LinkedinLogo size={13} />
                                    linkedin
                                </a>
                                <a
                                    href={CV_URL}
                                    className="flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-brand-400"
                                >
                                    <FileText size={13} />
                                    download cv
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="fixed inset-x-0 top-4 z-40 px-4">
                <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-4 rounded-full border px-5 backdrop-blur-xl border-white/10 bg-zinc-900/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 font-mono text-[14px] font-medium tracking-tight"
                    >
                        <img src="/images/logo.png" alt="" className="h-5 w-auto select-none" />
                        rakaiseto
                    </Link>

                    <div className="hidden items-center gap-6 lg:flex">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.to} to={item.to} className={linkClass}>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href="mailto:rakaiseto@gmail.com"
                            className="hidden items-center gap-1 rounded-full border border-brand-500/40 px-4 py-1.5 font-mono text-[12px] transition-all hover:border-brand-500 hover:bg-brand-500/10 active:scale-[0.98] sm:flex text-brand-400"
                        >
                            email me
                            <ArrowUpRight size={13} weight="bold" />
                        </a>

                        {/* hamburger / close — <lg only */}
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-label={open ? 'close menu' : 'open menu'}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all hover:border-brand-500/40 hover:text-brand-400 active:scale-[0.96] lg:hidden"
                        >
                            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
                        </button>
                    </div>
                </nav>
            </header>

            <MenuSheet open={open} onClose={() => setOpen(false)} />
        </>
    );
}
