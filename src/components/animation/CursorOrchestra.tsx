"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { BOX, BREAKPOINTS, INTRO, PROFILES, type Profile } from "./animationTimeline";
import { CursorSprite, CursorSymbolDefs } from "./CursorSprite";
import { CURSOR_SIZE, PALETTE } from "./cursorPaths";
import { createCursorEngine } from "./engine";
import { InspectionBox } from "./InspectionOverlay";

/* The intro plays once per document load. Module state survives client
   re-mounts (profile change, SPA navigation) and resets on a hard reload.
   `?replayIntro=1` forces it again (handy in development). */
let introPlayed = false;

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
}
const subscribeReduced = subscribe(REDUCED);
const subscribeTablet = subscribe(`(min-width: ${BREAKPOINTS.tablet}px)`);
const subscribeDesktop = subscribe(`(min-width: ${BREAKPOINTS.desktop}px)`);

/**
 * Decorative cursor orchestra (intro swarm, inspection boxes, section scenes).
 * Nothing is rendered on the server or with reduced motion → no hydration
 * mismatch, and the page never depends on it to be visible.
 */
export function CursorOrchestra() {
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => true);
  const tablet = useSyncExternalStore(subscribeTablet, () => window.matchMedia(`(min-width: ${BREAKPOINTS.tablet}px)`).matches, () => false);
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia(`(min-width: ${BREAKPOINTS.desktop}px)`).matches, () => false);

  if (!INTRO.enabled || reduced) return null;
  const profile = desktop ? PROFILES.desktop : tablet ? PROFILES.tablet : PROFILES.mobile;
  return <Orchestra key={profile.key} profile={profile} />;
}

function Orchestra({ profile }: { profile: Profile }) {
  const layer = useRef<HTMLDivElement>(null);
  const sprites = useRef<(HTMLDivElement | null)[]>([]);
  const boxes = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const spriteEls = sprites.current.slice(0, profile.cursors).filter((el): el is HTMLDivElement => !!el);
    const boxEls = boxes.current.filter((el): el is HTMLDivElement => !!el);
    if (!layer.current || spriteEls.length === 0) return;

    const replay = /[?&]replayIntro=1/.test(window.location.search);
    if (replay) window.scrollTo(0, 0);
    const armed = document.documentElement.classList.contains("intro-armed");
    const playIntro = armed && (replay || !introPlayed);

    const engine = createCursorEngine({
      profile,
      sprites: spriteEls,
      boxes: boxEls,
      layer: layer.current,
      playIntro,
      onIntroCommitted: () => {
        introPlayed = true;
      },
    });
    // Reload restored a scrolled position: no intro over the middle of the page.
    if (playIntro && !replay && window.scrollY > window.innerHeight * 0.4) engine.skip();
    return () => engine.destroy();
  }, [profile]);

  return (
    <div
      ref={layer}
      data-orchestra=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden [contain:strict]"
    >
      <CursorSymbolDefs />
      {Array.from({ length: BOX.pool }, (_, i) => (
        <InspectionBox
          key={`box-${i}`}
          ref={(el) => {
            boxes.current[i] = el;
          }}
        />
      ))}
      {Array.from({ length: profile.cursors }, (_, i) => (
        <CursorSprite
          key={`cursor-${i}`}
          color={PALETTE[(i * 3) % PALETTE.length]}
          size={CURSOR_SIZE}
          ref={(el) => {
            sprites.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
