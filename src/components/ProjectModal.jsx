import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, X } from '@phosphor-icons/react';

/* All-project switcher — the desktop rail, rebuilt as a modal for mobile.
   Mirrors WallPopup's overlay/panel conventions; adds a Tab trap and
   trigger-focus restore. Selecting a row navigates and closes. */

const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
};

const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};

function Row({ project, index, current, onSelect }) {
    return (
        <motion.li variants={rowVariants}>
            <Link
                to={`/projects/${project.slug}`}
                onClick={() => onSelect(project.slug)}
                aria-current={current ? 'page' : undefined}
                data-slug={project.slug}
                className={`group flex items-baseline gap-3 border-t border-white/10 py-3.5 transition-colors ${
                    current ? 'cursor-default' : 'hover:bg-white/[0.03]'
                }`}
            >
                <span
                    className={`font-mono text-[12px] tracking-[0.15em] ${
                        current ? 'text-brand-400' : 'text-zinc-600 group-hover:text-brand-400'
                    }`}
                >
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span
                    className={`flex-1 truncate text-[14px] transition-colors ${
                        current ? 'font-medium text-zinc-100' : 'text-zinc-400 group-hover:text-zinc-100'
                    }`}
                >
                    {project.title}
                </span>
                <span className="shrink-0 font-mono text-[12px] text-zinc-600">{project.year}</span>
                {current && (
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-400">current</span>
                )}
            </Link>
        </motion.li>
    );
}

export default function ProjectModal({ mainProjects, schoolProjects, currentSlug, onClose }) {
    const navigate = useNavigate();
    const panelRef = useRef(null);

    useEffect(() => {
        const prevFocus = document.activeElement;
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        // first focusable = close button; announce the dialog, not the page
        panelRef.current?.querySelector('button')?.focus();
        // open at the project the user is reading, not at the top of the list
        panelRef.current?.querySelector(`[data-slug="${currentSlug}"]`)?.scrollIntoView({ block: 'center' });
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            prevFocus?.focus?.();
        };
    }, [currentSlug, onClose]);

    const onPanelKeyDown = (e) => {
        if (e.key !== 'Tab') return;
        const focusables = [...panelRef.current.querySelectorAll('a[href], button:not([disabled])')];
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };

    const select = (slug) => {
        if (slug !== currentSlug) navigate(`/projects/${slug}`);
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="All projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />
            <motion.div
                ref={panelRef}
                onKeyDown={onPanelKeyDown}
                className="relative max-h-[80dvh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="close"
                    className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
                >
                    <X size={18} />
                </button>

                <p className="mb-2 pr-10 font-mono text-[12px] uppercase tracking-[0.25em] text-zinc-500">projects</p>

                <motion.div variants={listVariants} initial="hidden" animate="visible">
                    <motion.ul variants={listVariants}>
                        {mainProjects.map((p, i) => (
                            <Row key={p.slug} project={p} index={i} current={p.slug === currentSlug} onSelect={select} />
                        ))}
                    </motion.ul>
                    {schoolProjects.length > 0 && (
                        <>
                            <p className="mb-1 mt-6 font-mono text-[12px] uppercase tracking-[0.25em] text-zinc-500">school</p>
                            <motion.ul variants={listVariants}>
                                {schoolProjects.map((p, i) => (
                                    <Row
                                        key={p.slug}
                                        project={p}
                                        index={mainProjects.length + i}
                                        current={p.slug === currentSlug}
                                        onSelect={select}
                                    />
                                ))}
                            </motion.ul>
                        </>
                    )}
                </motion.div>

                <Link
                    to="/projects"
                    onClick={onClose}
                    className="mt-4 flex items-center justify-between border-t border-white/10 py-3.5 font-mono text-[14px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-brand-400"
                >
                    <span>view all projects</span>
                    <ArrowUpRight size={14} weight="bold" />
                </Link>
            </motion.div>
        </motion.div>
    );
}
