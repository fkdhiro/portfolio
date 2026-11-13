import { HERO_REVEAL } from "@/components/animation/animationTimeline";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Ink box of "PORTFOLIO" in Anton at 232px, measured with canvas measureText:
 * left bearing 9, ink width 870, cap ascent 201, overshoot descent 2.
 * Using the ink box as the viewBox (with preserveAspectRatio="none") makes the
 * letters touch both edges of the container exactly, at any width.
 * Re-measure if the font or word changes.
 */
const VIEWBOX = "9 -201 870 203";
const GRADIENT_ID = "wordmark-fill-gradient";

/**
 * The giant outlined "PORTFOLIO" — server-rendered, wiped in from the top by
 * CSS when the hero is revealed (see `data-reveal-clip` in globals.css).
 */
export function HeroWordmark({ word = "PORTFOLIO" }: { word?: string }) {
  return (
    <Reveal
      intro
      delay={HERO_REVEAL.wordmark}
      y={24}
      aria-hidden="true"
      data-reveal-clip=""
      data-cursor-target="wordmark"
      data-cursor-intro="wordmark"
      className="relative select-none"
    >
      <svg
        viewBox={VIEWBOX}
        preserveAspectRatio="none"
        className="block h-[clamp(104px,17.5vw,252px)] w-full overflow-visible"
      >
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="52%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.42" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="0"
          fontSize="232"
          fill={`url(#${GRADIENT_ID})`}
          stroke="#ffffff"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="wordmark-fill"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {word}
        </text>
      </svg>
    </Reveal>
  );
}
