"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Layer } from "@/types/portfolio";
import { TechBadge } from "@/components/ui/TechBadge";
import { useIndicator } from "@/components/ui/useIndicator";

export function LayerTabs({ layers, label, tagsLabel }: { layers: Layer[]; label: string; tagsLabel: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablist = useRef<HTMLDivElement>(null);
  const highlight = useIndicator(tablist, activeIndex);

  const select = (index: number, focus = false) => {
    const next = (index + layers.length) % layers.length;
    setActiveIndex(next);
    const tab = tabRefs.current[next];
    if (focus) tab?.focus();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tab?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: layers.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  return (
    <div>
      <div
        ref={tablist}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="no-scrollbar scroll-fade relative -mx-5 flex overflow-x-auto border-y border-line pl-5 md:mx-0 md:pl-0"
      >
        <span
          ref={highlight}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bg-red opacity-0 transition-[transform,width,height,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        />
        {layers.map((layer, i) => {
          const selected = i === activeIndex;
          return (
            <button
              key={layer.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${layer.id}`}
              type="button"
              role="tab"
              data-cursor-target="tab"
              aria-selected={selected}
              data-indicator-active={selected}
              aria-controls={`panel-${layer.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={`relative flex shrink-0 items-center gap-2 px-4 py-3.5 text-left transition-colors duration-200 focus-visible:-outline-offset-2 xl:flex-1 xl:shrink ${
                selected ? "text-white" : "text-mute hover:bg-white/[0.03] hover:text-ink"
              }`}
            >
              <span className={`relative font-mono text-[11px] ${selected ? "text-white/80" : "text-red"}`}>
                {layer.code}
              </span>
              <span className="relative whitespace-nowrap text-[13px] font-semibold tracking-[-0.01em]">
                {layer.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* All panels share one grid cell so the container height never jumps. */}
      <div className="grid">
        {layers.map((layer, i) => {
          const selected = i === activeIndex;
          return (
            <div
              key={layer.id}
              id={`panel-${layer.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${layer.id}`}
              tabIndex={selected ? 0 : -1}
              inert={!selected}
              className={`grid gap-8 pt-9 transition-[opacity,transform,visibility] duration-300 ease-out [grid-area:1/1] md:grid-cols-12 md:gap-10 ${
                selected ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
              }`}
            >
              <div className="md:col-span-7">
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-display text-[clamp(64px,8vw,112px)] leading-[0.8] tracking-[-0.01em] text-transparent [-webkit-text-stroke:1.5px_var(--color-red)]"
                    aria-hidden="true"
                  >
                    {layer.code}
                  </span>
                  <div>
                    <p className="micro text-red">{layer.name}</p>
                    <h4 className="mt-1 text-[clamp(22px,2.4vw,30px)] font-bold leading-tight tracking-[-0.025em] text-ink">
                      {layer.headline}
                    </h4>
                  </div>
                </div>
                <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-mute">{layer.body}</p>
              </div>

              <div className="flex flex-col gap-6 md:col-span-5">
                <dl className="grid grid-cols-2 border border-line">
                  {layer.specs.map((spec) => (
                    <div key={spec.label} className="border-line px-4 py-3 [&:not(:first-child)]:border-l">
                      <dt className="micro text-[10px] text-dim">{spec.label}</dt>
                      <dd className="mt-1 text-[14px] font-semibold text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="flex flex-wrap gap-2" aria-label={tagsLabel}>
                  {layer.tags.map((tag) => (
                    <li key={tag}>
                      <TechBadge tone="red">{tag}</TechBadge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
