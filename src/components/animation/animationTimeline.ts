/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  INTRO TIMELINE + DEVICE PROFILES
 * ─────────────────────────────────────────────────────────────────────────────
 *  Times are seconds from mount. They are guides derived from the written
 *  description of the reference recording (no measurable DOM original).
 *
 *  A  0.00–1.20  black screen, groups of micro-cursors, coordinated motion
 *  B  1.05–2.80  cyan inspection boxes on the real hero elements (still dark)
 *  C  2.15–4.80  curtain clipped away top → bottom, hero revealed in layers
 *  D  4.50–8.00  2–3 quick hero inspections, then most cursors leave
 *  E  after       section scenes driven by the viewport (no autoplay scroll)
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const INTRO = {
  enabled: true,
  /** Phase A — cursors wander in their groups. */
  groupsUntil: 1.2,
  /** Phase B — first / last scan box start. */
  scanStart: 1.05,
  scanEnd: 2.8,
  /** Curtain opacity while scanning (content is still hidden underneath). */
  scanCurtainOpacity: 0.94,
  /** Phase C — curtain clip + hero layered reveal. */
  revealStart: 2.15,
  curtainClipDuration: 1.25,
  revealEnd: 4.8,
  /** Phase D — hero inspections, then the swarm thins out. */
  heroInspectStart: 4.5,
  exitStart: 5.9,
  exitEnd: 7.6,
  done: 8,
  /** If the app never boots, everything is made visible after this. */
  failsafeMs: 6000,
  /** Scrolling further than this during the intro fast-forwards it. */
  skipScrollPx: 120,
} as const;

/** Stagger (s) of each hero layer after `revealStart` — see Hero.tsx. */
export const HERO_REVEAL = {
  wordmark: 0,
  greeting: 0.28,
  name: 0.42,
  text: 0.62,
  ctas: 0.78,
  portrait: 0.92,
  cards: 1.08,
  cardStep: 0.12,
  stats: 1.55,
} as const;

export type Profile = {
  key: "desktop" | "tablet" | "mobile";
  /** Total sprites (intro swarm). */
  cursors: number;
  /** How many intro groups are used (from cursorPaths.introGroups). */
  groups: number;
  /** Cursors that stay after the intro. */
  ambient: number;
  /** Max cursors a section scene may use (ambient + temporary helpers). */
  squad: number;
  /** Max inspection boxes on screen during the intro / afterwards. */
  introBoxes: number;
  liveBoxes: number;
  scale: number;
  /** Intro speed: 1 = reference timing; < 1 plays the same choreography faster
   *  (smaller screens / slower devices reach the content sooner). Keep in sync
   *  with `--intro-scale` in globals.css. */
  timeScale: number;
};

export const PROFILES: Record<Profile["key"], Profile> = {
  desktop: { key: "desktop", cursors: 32, groups: 6, ambient: 5, squad: 4, introBoxes: 5, liveBoxes: 2, scale: 1, timeScale: 1 },
  tablet: { key: "tablet", cursors: 24, groups: 5, ambient: 4, squad: 3, introBoxes: 4, liveBoxes: 2, scale: 0.95, timeScale: 0.9 },
  mobile: { key: "mobile", cursors: 14, groups: 4, ambient: 2, squad: 2, introBoxes: 3, liveBoxes: 1, scale: 0.85, timeScale: 0.8 },
};

export const BREAKPOINTS = { tablet: 768, desktop: 1200 } as const;

/** Inspection box look & timing. */
export const BOX = {
  color: "#5ee7ff",
  labelBg: "#0a2a3d",
  /** Lifetime in ms during the intro scan / during section scenes. */
  introDuration: 1050,
  liveDuration: 1200,
  /** Dwell before the outline appears (approach → dwell → outline → release). */
  dwell: [0.15, 0.35] as [number, number],
  pool: 6,
} as const;

/** Drawn-motion speed cap (px/s): discontinuities become glides, never jumps. */
export const MAX_SPEED = 3200;
