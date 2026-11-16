"use client";

import { ArrowUpRight } from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import type { Matrix } from "@/types/portfolio";

const ALL = "all";

/**
 * Filter change animated with the native View Transitions API (cards move,
 * enter and leave; the red highlight morphs between buttons). Browsers
 * without support — or visitors preferring reduced motion — switch instantly.
 */
function withViewTransition(update: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof document.startViewTransition !== "function") {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}

export function MatrixGrid({ matrix }: { matrix: Matrix }) {
  const [filter, setFilter] = useState<string>(ALL);

  const filters = useMemo(
    () => [{ id: ALL, label: matrix.allLabel }, ...matrix.categories],
    [matrix.allLabel, matrix.categories],
  );
  const categoryLabel = useMemo(
    () => Object.fromEntries(matrix.categories.map((c) => [c.id, c.label])),
    [matrix.categories],
  );
  const counts = useMemo(() => {
    const result: Record<string, number> = { [ALL]: matrix.systems.length };
    for (const system of matrix.systems)
      for (const c of system.categories) result[c] = (result[c] ?? 0) + 1;
    return result;
  }, [matrix.systems]);

  const visible = filter === ALL ? matrix.systems : matrix.systems.filter((s) => s.categories.includes(filter));
  const activeLabel = filters.find((f) => f.id === filter)?.label ?? matrix.allLabel;

  return (
    <div>
      <div
        role="group"
        aria-label={matrix.filterLabel}
        className="no-scrollbar scroll-fade -mx-4 flex gap-1 overflow-x-auto pl-4 md:mx-0 md:flex-wrap md:pl-0"
      >
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              data-cursor-target="filter"
              aria-pressed={active}
              onClick={() => {
                if (f.id !== filter) withViewTransition(() => setFilter(f.id));
              }}
              className={`micro relative flex min-h-11 shrink-0 items-center gap-2 px-4 py-2.5 font-medium md:min-h-0 transition-colors duration-200 ${
                active ? "text-white" : "text-mute hover:text-ink"
              }`}
            >
              {active ? (
                <span
                  className="absolute inset-0 bg-red"
                  style={{ viewTransitionName: "matrix-filter-active" } as CSSProperties}
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative">{f.label}</span>
              <span className={`relative font-mono text-[10px] ${active ? "text-white/70" : "text-dim"}`}>
                {String(counts[f.id] ?? 0).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${visible.length} ${visible.length === 1 ? matrix.shownOne : matrix.shownMany} — ${activeLabel}`}
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((system) => (
          <li
            key={system.id}
            className="matrix-card"
            style={{ viewTransitionName: `matrix-${system.id}` } as CSSProperties}
          >
                <article data-cursor-target="card" className="group flex h-full min-h-[220px] flex-col border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-red hover:bg-surface-2">
                  <div className="flex items-start justify-between gap-4">
                    <span className="micro border border-line-red px-2 py-[3px] text-[10px] text-red">
                      {categoryLabel[system.categories[0]] ?? system.categories[0]}
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="text-dim transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red"
                    />
                  </div>
                  <h3 className="mt-6 text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
                    {system.title}
                  </h3>
                  <p className="mb-6 mt-3 text-[14px] leading-relaxed text-mute">{system.description}</p>
                  <dl className="mt-auto flex gap-6 border-t border-line pt-4">
                    {system.meta.map((m) => (
                      <div key={m.label}>
                        <dt className="micro text-[10px] text-dim">{m.label}</dt>
                        <dd className="mt-0.5 font-mono text-[12px] text-ink/80">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
