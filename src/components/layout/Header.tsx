"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIndicator } from "@/components/ui/useIndicator";
import type { NavItem, Profile } from "@/types/portfolio";

type HeaderProps = {
  nav: NavItem[];
  wordmark: string;
  status: Profile["status"];
};

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        // The first section (in document order) crossing the middle band wins.
        const current = ids.find((id) => visible.get(id));
        setActive(current ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Header({ nav, wordmark, status }: HeaderProps) {
  const [ids] = useState(() => nav.map((item) => item.id));
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navList = useRef<HTMLUListElement>(null);
  const underline = useIndicator(navList, active, { insetX: 12, horizontalOnly: true });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      {/* Backdrop blur only from md up: it is costly to repaint while scrolling on phones. */}
      <div className="mx-auto max-w-[1040px] border border-line bg-bg/95 md:bg-bg/80 md:backdrop-blur-md">
        <div className="flex h-11 items-center justify-between gap-6 pl-4 pr-2 md:pr-4">
          <a href="#top" className="group flex h-11 items-center gap-2.5" aria-label={`${wordmark} — voltar ao topo`}>
            <span
              className="block h-2.5 w-2.5 bg-red transition-transform duration-300 group-hover:rotate-45"
              aria-hidden="true"
            />
            <span className="text-[15px] font-extrabold tracking-[-0.02em] text-ink">{wordmark}</span>
          </a>

          <nav aria-label="Principal" className="hidden md:block">
            <ul ref={navList} className="relative flex items-center gap-1">
              <span
                ref={underline}
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-px left-0 h-px bg-red opacity-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
              />
              {nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      data-indicator-active={isActive}
                      className={`micro block px-3 py-1.5 transition-colors duration-200 ${
                        isActive ? "text-ink" : "text-mute hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <p className="micro hidden items-center gap-2 text-[10px] text-mute lg:flex">
            <span className="status-dot" aria-hidden="true" />
            <span className="text-ink">{status.label}</span>
            <span className="text-dim">/</span>
            <span>{status.detail}</span>
          </p>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-1 flex h-11 w-11 items-center justify-center text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
        </div>

        {/* Always rendered so it can animate both ways (grid rows 0fr → 1fr);
            `inert` + visibility keep it out of reach while closed. */}
        <nav
          id="mobile-nav"
          aria-label="Principal"
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(.22,1,.36,1)] md:hidden ${
            open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-line">
              <ul className="flex flex-col py-2">
                {nav.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? "location" : undefined}
                      className={`flex items-center justify-between px-4 py-3 text-[15px] font-semibold ${
                        active === item.id ? "text-ink" : "text-mute"
                      }`}
                    >
                      {item.label}
                      <span className="micro text-dim">{String(index + 1).padStart(2, "0")}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="micro flex items-center gap-2 border-t border-line px-4 py-3 text-[10px] text-mute">
                <span className="status-dot" aria-hidden="true" />
                <span className="text-ink">{status.label}</span>
                <span className="text-dim">/</span>
                {status.detail}
              </p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
