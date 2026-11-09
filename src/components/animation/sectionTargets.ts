/**
 * DOM helpers for finding real, visible inspection targets.
 * Elements opt in with `data-cursor-target="<kind>"` (kind: "tab", "card"…),
 * hero elements additionally with `data-cursor-intro="<id>"`.
 * Reads only — called when a scene is planned, never inside a write loop.
 */

export const HEADER_SAFE = 64;

export type FoundTarget = { el: Element; rect: DOMRect; kind: string };

export function isUsableRect(r: DOMRect, vw: number, vh: number) {
  if (r.width < 20 || r.height < 12) return false;
  // Never outline something close to the whole screen.
  if (r.width * r.height > vw * vh * 0.45 || r.height > vh * 0.7) return false;
  return true;
}

/** Targets inside `scope` that are fully inside the readable viewport band. */
export function visibleTargets(scope: ParentNode, vw: number, vh: number): FoundTarget[] {
  const out: FoundTarget[] = [];
  scope.querySelectorAll("[data-cursor-target]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!isUsableRect(r, vw, vh)) return;
    if (r.top < HEADER_SAFE + 6 || r.bottom > vh - 16 || r.left < 0 || r.right > vw) return;
    out.push({ el, rect: r, kind: el.getAttribute("data-cursor-target") || "" });
  });
  return out;
}

/** Hero intro targets by id, in the given order (skips missing/off-screen). */
export function introTargets(ids: string[], vw: number, vh: number): { id: string; el: Element }[] {
  const out: { id: string; el: Element }[] = [];
  for (const id of ids) {
    const el = document.querySelector(`[data-cursor-intro="${id}"]`);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 20 || r.height < 12) continue;
    if (r.bottom < HEADER_SAFE || r.top > vh - 40 || r.right < 0 || r.left > vw) continue;
    out.push({ id, el });
  }
  return out;
}
