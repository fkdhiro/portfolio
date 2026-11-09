/**
 * Deterministic cursor geometry: palette, intro groups, idle waypoints and
 * per-section scene settings. All coordinates are normalised to the viewport
 * (0..1). Nothing here uses Math.random — the engine seeds a PRNG with `SEED`.
 */

export const SEED = 20261109;

/** Small accents in the reference recording's spirit; never the site's red. */
export const PALETTE = [
  "#5ee7ff", // cyan
  "#8ab4ff", // blue
  "#c3a6ff", // lilac
  "#7cf5a8", // green
  "#ffe066", // yellow
  "#ff9e80", // coral
  "#f5f5f5", // white
];

/** Sprite height in px before per-cursor variation. */
export const CURSOR_SIZE = 15;

export type IntroGroup = {
  /** Where the group appears. */
  start: [number, number];
  /** Short coordinated wander during phase A (centroid waypoints). */
  path: [number, number][];
};

/** Phase A: several groups spread left / centre / right (not one central blob). */
export const INTRO_GROUPS: IntroGroup[] = [
  { start: [0.17, 0.3], path: [[0.22, 0.25], [0.19, 0.37]] },
  { start: [0.5, 0.36], path: [[0.45, 0.43], [0.53, 0.41]] },
  { start: [0.82, 0.29], path: [[0.77, 0.35], [0.81, 0.41]] },
  { start: [0.27, 0.71], path: [[0.32, 0.64], [0.26, 0.6]] },
  { start: [0.76, 0.69], path: [[0.71, 0.62], [0.79, 0.6]] },
  { start: [0.48, 0.77], path: [[0.54, 0.7], [0.47, 0.66]] },
];

/**
 * Hero elements scanned in phase B, in order. Each selector must match a
 * `data-cursor-intro` value in Hero.tsx. Missing / off-screen ones are skipped.
 */
export const INTRO_SCAN_ORDER = [
  "wordmark",
  "name",
  "portrait",
  "text",
  "card-1",
  "cta",
  "card-2",
  "stats",
  "card-3",
];

/** Phase D: quick inspections once the hero is visible. */
export const INTRO_HERO_INSPECT = ["portrait", "text", "card-2"];

export type SectionKey = "top" | "about" | "flagships" | "matrix" | "contact";

/** Idle spots (empty regions) per section for ambient cursors. */
export const IDLE_PATHS: Record<SectionKey, [number, number][]> = {
  top: [
    [0.36, 0.34],
    [0.31, 0.86],
    [0.975, 0.42],
    [0.62, 0.15],
    [0.04, 0.94],
    [0.37, 0.64],
    [0.7, 0.9],
  ],
  about: [
    [0.53, 0.3],
    [0.57, 0.64],
    [0.94, 0.16],
    [0.06, 0.9],
    [0.76, 0.28],
    [0.03, 0.42],
  ],
  flagships: [
    [0.96, 0.24],
    [0.025, 0.52],
    [0.72, 0.12],
    [0.975, 0.8],
    [0.3, 0.14],
    [0.02, 0.86],
  ],
  matrix: [
    [0.76, 0.18],
    [0.62, 0.36],
    [0.975, 0.6],
    [0.02, 0.3],
    [0.86, 0.93],
    [0.9, 0.44],
  ],
  contact: [
    [0.2, 0.42],
    [0.8, 0.36],
    [0.26, 0.76],
    [0.74, 0.8],
  ],
};

export type SceneConfig = {
  /** Cursors allowed in the section (ambient beyond this leave). */
  maxCursors: number;
  /** Inspections when the section first settles in view. */
  inspections: number;
  /** Seconds between two inspections of the same scene. */
  spacing: number;
  /** Seconds before the same element may be inspected again. */
  targetCooldown: number;
  /** After the scene, every cursor leaves cleanly (closing section). */
  exitAfter?: boolean;
  /** Prefer targets whose `data-cursor-target` value is in this list. */
  prefer?: string[];
};

export const SCENES: Record<SectionKey, SceneConfig> = {
  top: { maxCursors: 5, inspections: 2, spacing: 0.8, targetCooldown: 14 },
  about: { maxCursors: 4, inspections: 3, spacing: 0.75, targetCooldown: 14, prefer: ["text", "principle", "quote"] },
  flagships: { maxCursors: 4, inspections: 4, spacing: 0.6, targetCooldown: 12, prefer: ["flagship", "tab", "metrics"] },
  matrix: { maxCursors: 4, inspections: 4, spacing: 0.65, targetCooldown: 12, prefer: ["filter", "card"] },
  contact: { maxCursors: 2, inspections: 2, spacing: 0.9, targetCooldown: 20, exitAfter: true, prefer: ["email", "copy"] },
};
