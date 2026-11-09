"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * One IntersectionObserver for every `[data-reveal=""]` element on the page.
 * Also releases the hero immediately when the intro is not armed.
 */
export function RevealObserver() {
  useEffect(() => {
    window.__revealReady = true;
    const root = document.documentElement;
    if (!root.classList.contains("intro-armed")) root.classList.add("hero-revealed");
    // Safety net: the intro is armed but the cursor orchestra did not mount
    // (disabled, reduced motion toggled, error) → never leave the hero hidden.
    const safety = window.setTimeout(() => {
      if (root.classList.contains("intro-armed") && !document.querySelector("[data-orchestra]")) {
        root.classList.remove("intro-armed");
        root.classList.add("hero-revealed");
      }
    }, 400);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll('[data-reveal=""]:not([data-revealed])').forEach((el) => io.observe(el));
    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, []);

  return null;
}
