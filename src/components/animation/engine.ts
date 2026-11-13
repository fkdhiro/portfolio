/**
 * Cursor orchestra engine — framework-free, imperative.
 *
 * One requestAnimationFrame loop drives every sprite through a queue of
 * segments (wait → move along a Bézier → hold), writing only transform and
 * opacity. Two "directors" fill those queues:
 *   - the intro director (phases A–D, scheduled once at start), and
 *   - the live director (phase E, section scenes driven by the viewport).
 * Element rects are read at the start of a frame (before any write).
 */

import { BOX, INTRO, MAX_SPEED, type Profile } from "./animationTimeline";
import {
  IDLE_PATHS,
  INTRO_GROUPS,
  INTRO_HERO_INSPECT,
  INTRO_SCAN_ORDER,
  SCENES,
  SEED,
  type SectionKey,
} from "./cursorPaths";
import { HEADER_SAFE, introTargets, isUsableRect, visibleTargets } from "./sectionTargets";

/* ─────────────────────────── math helpers ─────────────────────────── */

type Vec = { x: number; y: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Rng = () => number;
const range = (rng: Rng, a: number, b: number) => a + rng() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const EASE = {
  inOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
  outQuart: (t: number) => 1 - (1 - t) ** 4, // decelerates onto a target
  inOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  outCubic: (t: number) => 1 - (1 - t) ** 3,
  inCubic: (t: number) => t * t * t, // accelerating exit
};
type EaseName = keyof typeof EASE;

function curve(from: Vec, to: Vec, bend: number, t: number): Vec {
  const cx = (from.x + to.x) / 2 - (to.y - from.y) * bend;
  const cy = (from.y + to.y) / 2 + (to.x - from.x) * bend;
  const u = 1 - t;
  return {
    x: u * u * from.x + 2 * u * t * cx + t * t * to.x,
    y: u * u * from.y + 2 * u * t * cy + t * t * to.y,
  };
}

/* ─────────────────────────── types ─────────────────────────── */

type Target =
  | { kind: "point"; x: number; y: number }
  | { kind: "el"; el: Element; fx: number; fy: number; ox: number; oy: number };

type Seg = {
  /** Absolute earliest start (engine seconds). */
  at?: number;
  /** Extra wait after the previous segment. */
  delay?: number;
  to?: Target;
  dur?: number;
  ease?: EaseName;
  bend?: number;
  /** Opacity reached at the end of the move (0..1 of the cursor's max). */
  alpha?: number;
  /** Dwell after arriving. */
  hold?: number;
  onArrive?: () => void;
  onDone?: () => void;
  /** Becomes invisible / unused after this segment. */
  hide?: boolean;
};

type Stage =
  | { name: "wait"; since: number }
  | { name: "move"; start: number; dur: number; from: Vec; a0: number }
  | { name: "hold"; start: number; anchor: Vec };

type Role = "swarm" | "ambient" | "helper" | "reserve" | "spare";

type Agent = {
  el: HTMLDivElement;
  rng: Rng;
  role: Role;
  group: number;
  scale: number;
  baseRot: number;
  maxAlpha: number;
  alpha: number;
  /** Desired opacity fraction (0..1) of maxAlpha. */
  vis: number;
  speed: number;
  wob: { ax: number; ay: number; fx: number; fy: number; px: number; py: number };
  scrollGain: number;
  drift: number;
  driftTarget: number;
  pos: Vec;
  render: Vec;
  lean: number;
  pressAt: number;
  wp: number;
  stride: number;
  queue: Seg[];
  seg: Seg | null;
  stage: Stage | null;
  written: boolean;
};

type Box = {
  el: HTMLDivElement;
  rect: SVGRectElement | null;
  label: HTMLElement | null;
  target: Element | null;
  until: number;
  anims: Animation[];
};

export type EngineOptions = {
  profile: Profile;
  sprites: HTMLDivElement[];
  boxes: HTMLDivElement[];
  layer: HTMLDivElement;
  playIntro: boolean;
  onIntroCommitted: () => void;
};

/* ─────────────────────────── engine ─────────────────────────── */

export function createCursorEngine(opts: EngineOptions) {
  const { profile, layer } = opts;
  /** Intro clock speed-up for this device profile (engine seconds per real second). */
  const tScale = profile.timeScale;
  const root = document.documentElement;
  const curtain = document.getElementById("intro-curtain");

  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let time = 0;
  let lastTs: number | null = null;
  let raf = 0;
  let destroyed = false;
  /** Real (unscaled) seconds of the current frame — the speed cap uses real time. */
  let frameRealDt = 1 / 60;
  let mode: "intro" | "live" = opts.playIntro ? "intro" : "live";
  let lastScrollY = window.scrollY;
  let scrollDelta = 0;
  let lastScrollAt = -10;
  let section: SectionKey = "top";
  let committed = false;
  const curtainAnims: Animation[] = [];

  const master = mulberry32(SEED);

  /* ── agents ── */
  const agents: Agent[] = opts.sprites.map((el, i) => {
    const rng = mulberry32(SEED + (i + 1) * 7919);
    return {
      el,
      rng,
      role: "spare",
      group: -1,
      scale: profile.scale * range(rng, 0.84, 1.1),
      baseRot: range(rng, -9, 5),
      maxAlpha: range(rng, 0.82, 1),
      alpha: 0,
      vis: 0,
      speed: range(rng, 650, 1050),
      wob: {
        ax: range(rng, 1, 3.5),
        ay: range(rng, 1, 3.5),
        fx: range(rng, 0.5, 1.7),
        fy: range(rng, 0.45, 1.5),
        px: rng() * Math.PI * 2,
        py: rng() * Math.PI * 2,
      },
      scrollGain: range(rng, 0.06, 0.26),
      drift: 0,
      driftTarget: 0,
      pos: { x: -40, y: -40 },
      render: { x: -40, y: -40 },
      lean: 0,
      pressAt: -10,
      wp: Math.floor(rng() * 7),
      stride: 1 + Math.floor(rng() * 2),
      queue: [],
      seg: null,
      stage: null,
      written: false,
    };
  });

  /** Instantly relocate a cursor — only ever while it is invisible, so a
   *  re-used sprite can never be seen jumping. */
  const place = (a: Agent, p: Vec) => {
    a.pos = { ...p };
    a.render = { ...p };
    a.alpha = 0;
    a.vis = 0;
  };

  /* ── geometry ── */
  const frameRects = new Map<Element, DOMRect>();
  const rectOf = (el: Element) => {
    let r = frameRects.get(el);
    if (!r) {
      r = el.getBoundingClientRect();
      frameRects.set(el, r);
    }
    return r;
  };
  const resolve = (t: Target): Vec | null => {
    if (t.kind === "point") return { x: t.x, y: t.y };
    if (!t.el.isConnected) return null;
    const r = rectOf(t.el);
    return { x: r.left + r.width * t.fx + t.ox, y: r.top + r.height * t.fy + t.oy };
  };
  const norm = (nx: number, ny: number): Target => ({
    kind: "point",
    x: clamp(nx * vw, 12, vw - 20),
    y: clamp(ny * vh, HEADER_SAFE + 10, vh - 26),
  });
  /** Off-screen point continuing the direction from the centre through `p`. */
  const edgeExit = (p: Vec, rng: Rng): Target => {
    const ang = Math.atan2(p.y - vh / 2, p.x - vw / 2) + range(rng, -0.3, 0.3);
    const r = Math.hypot(vw, vh) * 0.62;
    return { kind: "point", x: vw / 2 + Math.cos(ang) * r, y: vh / 2 + Math.sin(ang) * r };
  };
  const nearestEdgeSpawn = (p: Vec, rng: Rng): Vec => {
    const opts2 = [
      { x: -30, y: clamp(p.y + range(rng, -120, 120), 80, vh - 40) },
      { x: vw + 30, y: clamp(p.y + range(rng, -120, 120), 80, vh - 40) },
      { x: clamp(p.x + range(rng, -160, 160), 20, vw - 20), y: vh + 30 },
    ];
    opts2.sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y));
    return opts2[0];
  };

  /** Anchor around an element. Leader parks at the bottom-right corner (tip on
   *  the corner handle, body outside the text); others spread along edges. */
  const anchorAround = (el: Element, idx: number, count: number, rng: Rng): Target => {
    if (idx === 0) return { kind: "el", el, fx: 1, fy: 1, ox: -2, oy: -2 };
    const r = rectOf(el);
    const wide = r.width > 280;
    if (wide) {
      const f = count <= 2 ? 0.55 : 0.08 + 0.8 * ((idx - 1) / Math.max(1, count - 2));
      const below = idx % 2 === 1;
      return { kind: "el", el, fx: f, fy: below ? 1 : 0, ox: range(rng, -6, 6), oy: below ? range(rng, 8, 16) : range(rng, -26, -18) };
    }
    const ang = 0.15 + idx * 0.9;
    const rad = range(rng, 18, 38);
    return { kind: "el", el, fx: 1, fy: 1, ox: 6 + Math.cos(ang) * rad, oy: 4 + Math.sin(ang) * rad };
  };

  const moveDur = (a: Agent, to: Vec, from: Vec = a.pos) =>
    clamp((Math.hypot(to.x - from.x, to.y - from.y) / a.speed) * range(a.rng, 0.9, 1.15), 0.32, 1.4);

  /* ── inspection boxes ── */
  const boxes: Box[] = opts.boxes.map((el) => ({
    el,
    rect: el.querySelector("rect"),
    label: el.querySelector("[data-box-label]"),
    target: null,
    until: 0,
    anims: [],
  }));
  let introBoxCount = 0;
  const hudTargets = curtain?.querySelector<HTMLElement>("[data-hud='targets']") ?? null;
  const hudAgents = curtain?.querySelector<HTMLElement>("[data-hud='agents']") ?? null;
  let introTargetTotal = 0;
  const inspectedAt = new Map<Element, number>();

  const placeBox = (b: Box) => {
    if (!b.target?.isConnected) return;
    const r = rectOf(b.target);
    const pad = 5;
    const w = Math.round(r.width + pad * 2);
    const h = Math.round(r.height + pad * 2);
    b.el.style.width = `${w}px`;
    b.el.style.height = `${h}px`;
    b.el.style.transform = `translate3d(${Math.round(r.left - pad)}px,${Math.round(r.top - pad)}px,0)`;
    b.rect?.setAttribute("width", String(Math.max(0, w - 1)));
    b.rect?.setAttribute("height", String(Math.max(0, h - 1)));
  };

  const showBox = (target: Element) => {
    const limit = mode === "intro" ? profile.introBoxes : profile.liveBoxes;
    if (boxes.filter((b) => b.until > time).length >= limit) return;
    const b = boxes.find((x) => x.until <= time);
    if (!b || !target.isConnected) return;
    const r = rectOf(target);
    if (!isUsableRect(r, vw, vh) && mode !== "intro") return;
    // Engine-time lifetime; the WAAPI duration is real time (intro runs faster on small screens).
    const engineDur = (mode === "intro" ? BOX.introDuration : BOX.liveDuration) / 1000;
    const duration = engineDur * 1000 * (mode === "intro" ? tScale : 1);
    b.anims.forEach((x) => x.cancel());
    b.target = target;
    b.until = time + engineDur;
    inspectedAt.set(target, time);
    placeBox(b);
    if (b.label) b.label.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
    b.el.style.visibility = "visible";
    b.anims = [
      b.el.animate(
        [{ opacity: 0 }, { opacity: 1, offset: 0.06 }, { opacity: 1, offset: 0.78 }, { opacity: 0 }],
        { duration, fill: "forwards" },
      ),
    ];
    if (b.rect) {
      b.anims.push(
        b.rect.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
          duration: Math.min(380, duration * 0.35),
          easing: "cubic-bezier(.22,1,.36,1)",
          fill: "forwards",
        }),
      );
    }
    if (b.label) {
      b.anims.push(
        b.label.animate([{ opacity: 0, transform: "translateY(3px)" }, { opacity: 1, transform: "none" }], {
          duration: 220,
          delay: 140,
          fill: "both",
        }),
      );
    }
    if (mode === "intro" && hudTargets) {
      introBoxCount += 1;
      hudTargets.textContent = `${String(introBoxCount).padStart(2, "0")}/${String(introTargetTotal).padStart(2, "0")} alvos`;
    }
  };

  /* ── segment helpers ── */
  const push = (a: Agent, ...segs: Seg[]) => a.queue.push(...segs);
  const clear = (a: Agent) => {
    a.queue = [];
    a.seg = null;
    a.stage = null;
  };
  const busy = (a: Agent) => a.seg !== null || a.queue.length > 0;

  /** approach → dwell → outline → release */
  const inspect = (a: Agent, el: Element, at: number, withBox: boolean, idx = 0, count = 1) => {
    const dwell = range(a.rng, BOX.dwell[0], BOX.dwell[1]);
    const anchor = anchorAround(el, idx, count, a.rng);
    push(
      a,
      {
        at,
        to: anchor,
        ease: "outQuart",
        bend: range(a.rng, 0.08, 0.3) * (a.rng() < 0.5 ? -1 : 1),
        alpha: 1,
        hold: dwell,
        onArrive: () => (a.pressAt = time),
        onDone: withBox ? () => showBox(el) : undefined,
      },
      // release: drift a little away from the element
      {
        delay: withBox ? range(a.rng, 0.12, 0.28) : range(a.rng, 0.05, 0.2),
        to: {
          kind: "el",
          el,
          fx: anchor.kind === "el" ? anchor.fx : 1,
          fy: anchor.kind === "el" ? anchor.fy : 1,
          ox: (anchor.kind === "el" ? anchor.ox : 0) + range(a.rng, 18, 54),
          oy: (anchor.kind === "el" ? anchor.oy : 0) + range(a.rng, 10, 40),
        },
        dur: range(a.rng, 0.3, 0.45),
        ease: "inOutSine",
        hold: range(a.rng, 0.1, 0.35),
      },
    );
  };

  const exit = (a: Agent, at?: number) => {
    push(a, {
      at,
      to: edgeExit(a.pos, a.rng),
      dur: range(a.rng, 0.7, 1.1),
      ease: "inCubic",
      bend: range(a.rng, -0.25, 0.25),
      alpha: 0,
      hide: true,
    });
  };

  const crowded = (p: Vec, self: Agent) =>
    agents.some((o) => {
      if (o === self || (o.role !== "ambient" && o.role !== "helper")) return false;
      return Math.hypot(o.pos.x - p.x, o.pos.y - p.y) < 90;
    });

  const idleTarget = (a: Agent): Target => {
    const list = IDLE_PATHS[section];
    let t: Target = norm(list[0][0], list[0][1]);
    for (let i = 0; i < 4; i++) {
      a.wp = (a.wp + a.stride) % list.length;
      const [nx, ny] = list[a.wp];
      t = norm(nx + range(a.rng, -0.02, 0.02), ny + range(a.rng, -0.02, 0.02));
      if (t.kind === "point" && !crowded(t, a)) break;
    }
    return t;
  };

  /* ───────────────────── intro director (A–D) ───────────────────── */

  function scheduleIntro() {
    const groupCount = Math.min(profile.groups, INTRO_GROUPS.length);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const members: Agent[][] = Array.from({ length: groupCount }, () => []);
    agents.forEach((a, i) => {
      a.role = "swarm";
      a.group = i % groupCount;
      members[a.group].push(a);
    });
    if (hudAgents) hudAgents.textContent = `${agents.length} agentes`;

    // Formation offsets (+ 1–2 stragglers per group that drift out and back).
    const offsets = new Map<Agent, Vec>();
    const stragglers = new Set<Agent>();
    members.forEach((list, g) => {
      list.forEach((a, i) => {
        const straggler = i === list.length - 1 || (i === 2 && list.length > 5);
        if (straggler) stragglers.add(a);
        const ang = i * golden + g * 0.7;
        const rad = straggler ? range(a.rng, 34, 48) : 6 + 22 * Math.sqrt(i / list.length) + range(a.rng, 0, 6);
        offsets.set(a, { x: Math.cos(ang) * rad, y: Math.sin(ang) * rad });
      });
    });
    const rot = (v: Vec, th: number): Vec => ({
      x: v.x * Math.cos(th) - v.y * Math.sin(th),
      y: v.x * Math.sin(th) + v.y * Math.cos(th),
    });
    const at = (nx: number, ny: number, off: Vec): Target => ({ kind: "point", x: nx * vw + off.x, y: ny * vh + off.y });

    // Scan plan first: each group's wander must end before its first scan.
    const scan = introTargets(INTRO_SCAN_ORDER, vw, vh);
    const step = scan.length > 1 ? Math.min(0.2, (INTRO.scanEnd - 0.55 - INTRO.scanStart) / (scan.length - 1)) : 0;
    const TRAVEL = 0.38;
    const firstScan = (g: number) => (g < scan.length ? INTRO.scanStart + g * step : INTRO.revealStart);

    // Phase A — appear in groups, coordinated wander with individual offsets.
    members.forEach((list, g) => {
      const pathDeadline = firstScan(g) - BOX.dwell[1] - TRAVEL - 0.04;
      const G = INTRO_GROUPS[g];
      list.forEach((a, i) => {
        const off = offsets.get(a)!;
        const start = at(G.start[0], G.start[1], off);
        if (start.kind === "point") place(a, start);
        push(a, { at: 0.02 + g * 0.05 + i * 0.018, alpha: 1, to: start, dur: 0.22 });
        G.path.forEach(([nx, ny], k) => {
          const startT = 0.14 + k * 0.36 + g * 0.025 + range(a.rng, 0, 0.07);
          const dur = range(a.rng, 0.26, 0.34);
          if (startT + dur > pathDeadline) return; // this group goes to work first
          const spread = stragglers.has(a) ? (k === 0 ? 1.55 : 0.75) : 1;
          const o = rot(off, (k + 1) * 0.35 * (g % 2 ? 1 : -1));
          push(a, {
            at: startT,
            to: at(nx, ny, { x: o.x * spread, y: o.y * spread }),
            dur,
            ease: "inOutSine",
            bend: range(a.rng, -0.3, 0.3),
            hold: stragglers.has(a) && k === 0 ? range(a.rng, 0.08, 0.2) : 0,
          });
        });
      });
    });

    // Phase B — scan the real hero elements (boxes match their rects).
    introTargetTotal = scan.length;
    if (hudTargets) hudTargets.textContent = `00/${String(scan.length).padStart(2, "0")} alvos`;
    const lastScanOf = new Map<number, number>();
    scan.forEach(({ el }, j) => {
      const g = j % groupCount;
      const list = members[g];
      const boxAt = INTRO.scanStart + j * step;
      const squad = list.slice(0, Math.min(list.length, 4));
      squad.forEach((a, idx) => {
        const lead = idx === 0;
        const travel = TRAVEL;
        const dwell = lead ? range(a.rng, BOX.dwell[0], BOX.dwell[1]) : 0;
        inspect(a, el, boxAt - dwell - travel + (lead ? 0 : range(a.rng, -0.04, 0.08)), lead, idx, squad.length);
        a.queue[a.queue.length - 2].dur = travel + (lead ? 0 : range(a.rng, -0.05, 0.08));
        a.queue[a.queue.length - 2].hold = lead ? dwell : range(a.rng, 0.15, 0.4);
      });
      // Non-squad members shadow the group loosely near the element.
      list.slice(squad.length).forEach((a) => {
        push(a, {
          at: boxAt - 0.35 + range(a.rng, 0, 0.15),
          to: anchorAround(el, 2 + Math.floor(a.rng() * 3), 5, a.rng),
          dur: range(a.rng, 0.45, 0.6),
          ease: "outCubic",
          bend: range(a.rng, -0.3, 0.3),
          hold: range(a.rng, 0.1, 0.3),
        });
      });
      lastScanOf.set(g, boxAt);
    });

    // Phase C — while the page is revealed, groups drift to empty regions.
    const idle = IDLE_PATHS.top;
    members.forEach((list, g) => {
      const spot = idle[(g * 2 + 1) % idle.length];
      const after = Math.max(INTRO.revealStart + 0.5, (lastScanOf.get(g) ?? INTRO.scanStart) + 0.55);
      list.forEach((a) => {
        const off = rot(offsets.get(a)!, g * 0.5);
        push(a, {
          at: after + range(a.rng, 0, 0.25),
          to: at(spot[0], spot[1], { x: off.x * 1.3, y: off.y * 1.3 }),
          dur: range(a.rng, 0.75, 1.05),
          ease: "inOutCubic",
          bend: range(a.rng, -0.35, 0.35),
        });
      });
    });

    // Phase D — 2–3 quick inspections on separate, now visible elements.
    const heroEls = introTargets(INTRO_HERO_INSPECT, vw, vh);
    heroEls.forEach(({ el }, k) => {
      const list = members[(k * 2 + 1) % groupCount];
      const squad = list.slice(0, 2);
      squad.forEach((a, idx) =>
        inspect(a, el, INTRO.heroInspectStart + 0.1 + k * 0.55 + (idx ? range(a.rng, 0, 0.1) : 0), idx === 0, idx, 2),
      );
    });

    // Ambient survivors: one per group (not the leaders), the rest leave.
    const survivors = new Set<Agent>();
    for (let g = 0; survivors.size < profile.ambient && g < groupCount * 2; g++) {
      const list = members[g % groupCount];
      const pick = list[Math.min(list.length - 1, 1 + Math.floor(g / groupCount))];
      if (pick) survivors.add(pick);
    }
    const leaving = agents.filter((a) => !survivors.has(a));
    leaving.forEach((a, k) => {
      const t = INTRO.exitStart + (k / leaving.length) * (INTRO.exitEnd - INTRO.exitStart - 0.9) + range(a.rng, 0, 0.2);
      exit(a, t);
    });
    [...survivors].forEach((a, k) => {
      push(a, {
        at: INTRO.exitStart + 0.3 + k * 0.25,
        to: idleTarget(a),
        dur: range(a.rng, 0.9, 1.3),
        ease: "inOutCubic",
        bend: range(a.rng, -0.3, 0.3),
        hold: range(a.rng, 0.4, 1.4),
        onDone: () => (a.role = "ambient"),
      });
    });

    // Curtain + layered page reveal.
    curtain?.animate([{ opacity: 1 }, { opacity: INTRO.scanCurtainOpacity }], {
      duration: 600 * tScale,
      delay: INTRO.scanStart * 1000 * tScale,
      fill: "forwards",
    });
  }

  function startReveal() {
    if (committed) return;
    committed = true;
    opts.onIntroCommitted();
    root.classList.add("hero-revealed");
    if (!curtain) return;
    const dur = INTRO.curtainClipDuration * 1000 * tScale;
    curtainAnims.push(
      curtain.animate(
        [{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(100% 0 0 0)" }],
        { duration: dur, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" },
      ),
    );
    const line = curtain.querySelector<HTMLElement>(".intro-scanline");
    if (line) {
      curtainAnims.push(
        line.animate(
          [
            { transform: "translateY(0)", opacity: 1 },
            { transform: `translateY(${vh}px)`, opacity: 1, offset: 0.92 },
            { transform: `translateY(${vh}px)`, opacity: 0 },
          ],
          { duration: dur, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" },
        ),
      );
    }
    window.setTimeout(endCurtain, dur + 80);
  }

  function endCurtain() {
    if (destroyed) return;
    root.classList.remove("intro-armed");
    curtainAnims.forEach((a) => a.cancel());
    curtain?.getAnimations().forEach((a) => a.cancel());
  }

  /** Fast-forward on interaction: reveal now, swarm leaves, survivors stay. */
  function skipIntro(instant = false) {
    if (mode !== "intro") return;
    mode = "live";
    root.classList.add("hero-revealed");
    if (!committed) {
      committed = true;
      opts.onIntroCommitted();
    }
    if (curtain && !instant) {
      curtain.getAnimations().forEach((a) => a.cancel());
      const fade = curtain.animate([{ opacity: getComputedStyle(curtain).opacity }, { opacity: 0 }], {
        duration: 260,
        fill: "forwards",
      });
      fade.onfinish = endCurtain;
    } else endCurtain();
    for (const b of boxes) {
      b.anims.forEach((x) => x.cancel());
      b.until = 0;
      b.el.style.visibility = "hidden";
    }
    let kept = 0;
    agents.forEach((a, k) => {
      clear(a);
      if (a.alpha < 0.05) {
        a.role = "spare";
        a.vis = 0;
        return;
      }
      if (kept < profile.ambient && a.role === "swarm" && k % 3 === 1) {
        kept += 1;
        a.role = "ambient";
        return;
      }
      a.role = "spare";
      exit(a, time + (instant ? 0 : range(a.rng, 0, 0.35)));
    });
  }

  /* ───────────────────── live director (E) ───────────────────── */

  let sceneSection: SectionKey | null = null;
  let sceneBusyUntil = 0;
  let lastSceneInspect = -10;
  let contactClosed = false;

  /** Cursors on stage, including ones still gliding in (queued, not yet visible). */
  const actors = () => agents.filter((a) => (a.role === "ambient" || a.role === "helper") && (a.vis > 0 || busy(a)));

  function rebalance(max: number) {
    const live = actors();
    // Too many → the extra ambient cursors step out (kept in reserve).
    live.slice(max).forEach((a) => {
      if (a.role !== "ambient") return;
      clear(a);
      a.role = "reserve";
      exit(a);
    });
    // Too few → reserves come back from the nearest edge.
    let missing = Math.min(max, profile.ambient) - Math.min(live.length, max);
    for (const a of agents) {
      if (missing <= 0) break;
      if (a.role !== "reserve" || busy(a)) continue;
      const to = idleTarget(a);
      if (to.kind === "point") place(a, nearestEdgeSpawn(to, a.rng));
      a.role = "ambient";
      push(a, { to, dur: range(a.rng, 0.8, 1.2), ease: "outCubic", alpha: 1, hold: range(a.rng, 0.3, 1) });
      missing -= 1;
    }
  }

  function runScene(full: boolean) {
    const cfg = SCENES[section];
    const scope = document.getElementById(section);
    if (!scope) return;
    const now = time;
    let found = visibleTargets(scope, vw, vh).filter(
      (t) => now - (inspectedAt.get(t.el) ?? -999) > cfg.targetCooldown,
    );
    if (found.length === 0) return;
    const prefer = cfg.prefer ?? [];
    const rank = (kind: string) => {
      const i = prefer.indexOf(kind);
      return i === -1 ? prefer.length : i;
    };
    // Preferred kinds first, but interleave so a scene visits different kinds.
    found = found
      .map((t, i) => ({ t, k: rank(t.kind) + (master() * 0.9), i }))
      .sort((p, q) => p.k - q.k || p.i - q.i)
      .map((x) => x.t);
    const count = Math.min(full ? cfg.inspections : 1, found.length);
    const chosen = found.slice(0, count);

    let cast = actors().filter((a) => a.role === "ambient");
    // Ambient cursors drop their idle drift once, at the start of the scene.
    for (const a of cast) clear(a);
    // Helpers: temporary extra cursors for busier scenes.
    const wantCast = Math.min(cfg.maxCursors, profile.squad, Math.max(1, count));
    for (const a of agents) {
      if (cast.length >= wantCast) break;
      if (a.role !== "spare" || busy(a)) continue;
      const first = resolve(anchorAround(chosen[0].el, 0, 1, a.rng)) ?? { x: vw / 2, y: vh / 2 };
      place(a, nearestEdgeSpawn(first, a.rng));
      a.role = "helper";
      a.vis = 0;
      cast.push(a);
    }
    cast = cast.slice(0, wantCast);
    if (cast.length === 0) return;
    // Nearest cursor to the first target leads; targets go round-robin.
    const r0 = rectOf(chosen[0].el);
    const c0 = { x: r0.right, y: r0.bottom };
    cast.sort((p, q) => Math.hypot(p.pos.x - c0.x, p.pos.y - c0.y) - Math.hypot(q.pos.x - c0.x, q.pos.y - c0.y));

    chosen.forEach((t, k) => {
      const lead = cast[k % cast.length];
      inspect(lead, t.el, now + 0.15 + k * cfg.spacing + range(lead.rng, 0, 0.15), true);
      // A companion follows the first inspection (group feel).
      if (k === 0 && cast.length > 2) {
        const mate = cast[cast.length - 1];
        inspect(mate, t.el, now + 0.25 + range(mate.rng, 0, 0.12), false, 1, 2);
      }
    });

    const end = now + 0.15 + count * cfg.spacing + 1.2;
    sceneBusyUntil = end;
    lastSceneInspect = now;
    // Helpers leave after the scene; closing section: everyone leaves cleanly.
    for (const a of cast) {
      if (a.role === "helper") exit(a, end - 0.4 + range(a.rng, 0, 0.3));
    }
    if (cfg.exitAfter) {
      contactClosed = true;
      for (const a of actors()) {
        if (a.role === "ambient") a.role = "reserve";
        exit(a, end + range(a.rng, 0, 0.4));
      }
    }
  }

  function liveTick() {
    // Scenes wait until scrolling settles, so fast scrolling never queues work.
    if (time - lastScrollAt < 0.35 || time < sceneBusyUntil) return;
    if (section !== sceneSection) {
      sceneSection = section;
      if (section !== "contact") contactClosed = false;
      // Cursor budget follows the section (fewer in Contact, back afterwards).
      rebalance(SCENES[section].maxCursors);
      runScene(true);
      return;
    }
    if (contactClosed) return;
    if (time - lastSceneInspect > 4.2) runScene(false);
  }

  /* ───────────────────── frame loop ───────────────────── */

  function step(a: Agent, dt: number) {
    if (!a.seg && a.queue.length) {
      a.seg = a.queue.shift()!;
      a.stage = { name: "wait", since: time };
    }
    const seg = a.seg;
    const st = a.stage;
    let x = a.pos.x;
    let y = a.pos.y;
    let locked = false;

    if (seg && st) {
      if (st.name === "wait") {
        const startAt = Math.max(seg.at ?? 0, st.since + (seg.delay ?? 0));
        x += Math.sin(time * a.wob.fx + a.wob.px) * a.wob.ax * dt * 4;
        if (time >= startAt) {
          if (seg.to) {
            const to = resolve(seg.to);
            if (!to) {
              a.seg = null; // element vanished: skip this segment
              return;
            }
            a.stage = { name: "move", start: time, dur: seg.dur ?? moveDur(a, to), from: { ...a.pos }, a0: a.vis };
          } else {
            if (seg.alpha !== undefined) a.vis = seg.alpha;
            a.stage = { name: "hold", start: time, anchor: { ...a.pos } };
          }
        }
      } else if (st.name === "move") {
        const to = seg.to ? resolve(seg.to) : null;
        locked = seg.to?.kind === "el";
        if (!to) {
          a.seg = null;
        } else {
          const t = clamp((time - st.start) / st.dur, 0, 1);
          const p = curve(st.from, to, seg.bend ?? 0.15, EASE[seg.ease ?? "inOutCubic"](t));
          x = p.x;
          y = p.y;
          if (seg.alpha !== undefined) a.vis = lerp(st.a0, seg.alpha, Math.min(1, t * 1.6));
          if (t >= 1) {
            seg.onArrive?.();
            a.stage = { name: "hold", start: time, anchor: to };
          }
        }
      } else {
        let anchor = st.anchor;
        if (seg.to?.kind === "el") {
          locked = true;
          const p = resolve(seg.to);
          if (p) anchor = st.anchor = p;
        }
        x = anchor.x + Math.sin(time * a.wob.fx + a.wob.px) * a.wob.ax;
        y = anchor.y + Math.sin(time * a.wob.fy * 1.3 + a.wob.py) * a.wob.ay;
        if (time - st.start >= (seg.hold ?? 0)) {
          seg.onDone?.();
          if (seg.hide) {
            a.vis = 0;
            if (a.role === "swarm" || a.role === "helper") a.role = "spare";
          }
          a.seg = null;
          a.stage = null;
        }
      }
    } else if (mode === "live" && a.role === "ambient" && a.vis > 0) {
      // Idle: rest a little, then glide to another empty region.
      push(a, { delay: range(a.rng, 0.8, 2.8), to: idleTarget(a), ease: "inOutCubic", bend: range(a.rng, -0.35, 0.35) });
    } else {
      x = a.pos.x + Math.sin(time * a.wob.fx + a.wob.px) * a.wob.ax * 0.05;
    }

    // Scroll coupling for free-floating cursors; locked ones follow elements.
    if (!locked) a.driftTarget = clamp(a.driftTarget - scrollDelta * a.scrollGain, -100, 100);
    a.driftTarget *= Math.exp(-dt / (locked ? 0.1 : 0.45));
    a.drift = lerp(a.drift, a.driftTarget, 1 - Math.exp(-dt / 0.14));

    a.pos = { x, y };
    // Speed cap on drawn motion → no teleports, whatever happens upstream.
    const wx = x;
    const wy = y + a.drift;
    const dx = wx - a.render.x;
    const dy = wy - a.render.y;
    const len = Math.hypot(dx, dy);
    const maxStep = MAX_SPEED * frameRealDt; // same visual ceiling on every device
    const k = len > maxStep ? maxStep / len : 1;
    const rx = a.render.x + dx * k;
    const ry = a.render.y + dy * k;
    const vx = (rx - a.render.x) / Math.max(dt, 1e-3);
    a.lean = lerp(a.lean, clamp(vx * 0.012, -12, 12), 1 - Math.exp(-dt / 0.12));
    a.render = { x: rx, y: ry };
    a.alpha = lerp(a.alpha, a.vis * a.maxAlpha, 1 - Math.exp(-dt / 0.1));
  }

  function write(a: Agent) {
    if (a.alpha < 0.004 && a.vis === 0) {
      if (a.written) {
        a.el.style.opacity = "0";
        a.written = false;
      }
      return;
    }
    const press = 1 - 0.16 * Math.max(0, 1 - Math.abs(time - a.pressAt - 0.08) / 0.08);
    a.el.style.transform = `translate3d(${a.render.x.toFixed(1)}px,${a.render.y.toFixed(1)}px,0) rotate(${(a.baseRot + a.lean).toFixed(1)}deg) scale(${(a.scale * press).toFixed(3)})`;
    a.el.style.opacity = a.alpha.toFixed(3);
    a.written = true;
  }

  function tick(ts: number) {
    raf = requestAnimationFrame(tick);
    const realDt = lastTs === null ? 1 / 60 : Math.min((ts - lastTs) / 1000, 1 / 20);
    lastTs = ts;
    frameRealDt = realDt;
    const dt = mode === "intro" ? realDt / tScale : realDt;
    time += dt;

    // ── reads first: every element rect this frame needs ──
    frameRects.clear();
    for (const b of boxes) if (b.until > time && b.target?.isConnected) rectOf(b.target);
    for (const a of agents) {
      const t = a.seg?.to;
      if (t?.kind === "el" && t.el.isConnected) rectOf(t.el);
    }

    if (mode === "intro") {
      if (time >= INTRO.revealStart) startReveal();
      if (time >= INTRO.done) {
        mode = "live";
        agents.forEach((a) => {
          if (a.role === "swarm" && a.vis > 0 && !busy(a)) a.role = "ambient";
        });
      }
    } else {
      liveTick();
    }

    for (const a of agents) step(a, dt);
    scrollDelta = 0;

    // ── writes ──
    for (const a of agents) write(a);
    let boxesActive = false;
    for (const b of boxes) {
      if (b.until > time) {
        placeBox(b);
        boxesActive = true;
      } else if (b.target) {
        b.target = null;
        b.el.style.visibility = "hidden";
      }
    }

    // Nothing on screen and nothing scheduled (e.g. after the Contact exit):
    // stop the loop; the next scroll / resize wakes it up.
    if (
      mode === "live" &&
      !boxesActive &&
      time - lastScrollAt > 1 &&
      time >= sceneBusyUntil &&
      agents.every((a) => a.vis === 0 && a.alpha < 0.004 && !busy(a))
    ) {
      stop();
    }
  }

  /* ───────────────────── lifecycle ───────────────────── */

  const onScroll = () => {
    const y = window.scrollY;
    scrollDelta += y - lastScrollY;
    lastScrollY = y;
    lastScrollAt = time;
    if (mode === "intro" && y > INTRO.skipScrollPx) skipIntro();
    if (!raf && document.visibilityState !== "hidden") start(); // wake from idle
  };
  const onKey = () => skipIntro();
  const onResize = () => {
    vw = window.innerWidth;
    vh = window.innerHeight;
    if (!raf && document.visibilityState !== "hidden") start();
    // Free-floating idle cursors pick a fresh spot from where they are.
    for (const a of agents) {
      if (a.role === "ambient" && a.seg && a.seg.to?.kind === "point" && !a.seg.onDone) clear(a);
    }
  };
  const start = () => {
    if (!raf && !destroyed) {
      lastTs = null;
      raf = requestAnimationFrame(tick);
    }
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };
  const onVisibility = () => (document.visibilityState === "hidden" ? stop() : start());

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) section = e.target.id as SectionKey;
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  (["top", "about", "flagships", "matrix", "contact"] as SectionKey[]).forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", start);
  document.addEventListener("visibilitychange", onVisibility);
  if (mode === "intro") window.addEventListener("keydown", onKey, { once: true });

  if (mode === "intro") {
    layer.style.zIndex = "60";
    scheduleIntro();
  } else {
    // No intro: make sure the page is revealed, then bring in ambient cursors.
    root.classList.add("hero-revealed");
    root.classList.remove("intro-armed");
    agents.slice(0, profile.ambient).forEach((a) => {
      a.role = "reserve";
    });
    rebalance(profile.ambient);
  }
  if (document.visibilityState !== "hidden") start();

  // Lower the layer under the header once the intro hands over.
  const zTimer = window.setInterval(() => {
    if (mode === "live" && !root.classList.contains("intro-armed")) {
      layer.style.zIndex = "40";
      window.clearInterval(zTimer);
    }
  }, 250);

  return {
    /** Skip the intro immediately (used when the page loads scrolled). */
    skip: () => skipIntro(true),
    destroy() {
      destroyed = true;
      stop();
      window.clearInterval(zTimer);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("pageshow", start);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const b of boxes) b.anims.forEach((x) => x.cancel());
      curtainAnims.forEach((x) => x.cancel());
      // If torn down before the reveal ran (e.g. React Strict Mode in dev),
      // leave the DOM exactly as the next mount expects it.
      if (!committed) curtain?.getAnimations().forEach((x) => x.cancel());
    },
  };
}
