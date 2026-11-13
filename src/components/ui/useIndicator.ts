"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

type Options = {
  /** Shrink the indicator horizontally by this many px on each side. */
  insetX?: number;
  /** Only track width/x; keep the indicator's own CSS height/bottom. */
  horizontalOnly?: boolean;
};

/**
 * Sliding active-item indicator without an animation library.
 * The indicator is an absolutely positioned element inside `container`
 * (which must be `relative`); it is moved with transform/width and a CSS
 * transition. The active item carries `data-indicator-active="true"`.
 * Re-measured on resize (ResizeObserver) and once web fonts are ready.
 * The first placement is instant so it never slides in from the corner.
 */
export function useIndicator(
  container: RefObject<HTMLElement | null>,
  activeKey: string | number | null,
  { insetX = 0, horizontalOnly = false }: Options = {},
) {
  const indicator = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  useLayoutEffect(() => {
    const root = container.current;
    const bar = indicator.current;
    if (!root || !bar) return;
    let alive = true;

    const place = () => {
      if (!alive) return;
      const active = root.querySelector<HTMLElement>('[data-indicator-active="true"]');
      if (!active) {
        bar.style.opacity = "0";
        return;
      }
      const x = active.offsetLeft + insetX;
      const w = Math.max(0, active.offsetWidth - insetX * 2);
      const instant = !placed.current;
      if (instant) bar.style.transition = "none";
      bar.style.opacity = "1";
      bar.style.width = `${w}px`;
      bar.style.transform = horizontalOnly
        ? `translate3d(${x}px,0,0)`
        : `translate3d(${x}px,${active.offsetTop}px,0)`;
      if (!horizontalOnly) bar.style.height = `${active.offsetHeight}px`;
      if (instant) {
        void bar.offsetWidth; // commit the instant placement before re-enabling transitions
        bar.style.transition = "";
        placed.current = true;
      }
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(root);
    for (const child of Array.from(root.children)) ro.observe(child);
    document.fonts?.ready.then(place);
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [container, activeKey, insetX, horizontalOnly]);

  return indicator;
}
