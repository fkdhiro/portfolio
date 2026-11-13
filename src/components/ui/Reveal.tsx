import type { CSSProperties, HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  /** Rendered element; use "span" inside phrasing content (e.g. headings). */
  as?: "div" | "span";
  /** Seconds. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /**
   * `true` → part of the hero intro: revealed when `<html>` gets the
   * `hero-revealed` class (set by the intro timeline, or right away when the
   * intro does not play). Otherwise revealed on scroll-into-view.
   */
  intro?: boolean;
};

/**
 * CSS-driven reveal. Content is fully visible in the server HTML; it is only
 * hidden when the boot script has added `html.js`, so the page stays readable
 * without JavaScript. `RevealObserver` toggles `data-revealed`.
 */
export function Reveal({ as: Tag = "div", delay = 0, y = 18, intro = false, style, children, ...rest }: RevealProps) {
  return (
    <Tag
      data-reveal={intro ? "intro" : ""}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
