import { Coffee } from '@phosphor-icons/react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10">
            {/* extra bottom padding below lg keeps the footer clear of the fixed tab bar */}
            <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 pt-8 pb-[calc(6.5rem+env(safe-area-inset-bottom))] font-mono text-[14px] tracking-[0.15em] text-zinc-500 md:flex-row lg:pb-8">
                <span>© 2026 RAKAI SETO SEMBODO</span>
                <span className="hidden md:block">JAKARTA & MALANG, ID — UTC+7</span>
                <span className="flex items-center gap-1.5">
                    BUILT WITH REACT AND A LOT OF
                    <Coffee size={12} weight="fill" className="inline -mt-0.5 text-zinc-500" />
                </span>
            </div>
        </footer>
    );
}
