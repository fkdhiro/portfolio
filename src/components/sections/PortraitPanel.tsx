import Image from "next/image";
import type { Portrait } from "@/types/portfolio";

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-4 w-4 border-white/60 ${className}`} aria-hidden="true" />;
}

/** Nodes of the abstract topology (viewBox 200 × 240). */
const NODES: [number, number, number][] = [
  [100, 98, 5],
  [52, 64, 3],
  [150, 58, 3],
  [44, 132, 3],
  [158, 128, 3],
  [76, 176, 2.5],
  [128, 182, 2.5],
  [100, 34, 2.5],
];
const LINKS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [1, 7], [2, 7], [3, 5], [4, 6], [1, 3], [2, 4],
];

/**
 * Editorial green/black portrait panel. Without a real photo it shows an
 * abstract distributed-system topology — never a stock face.
 */
export function PortraitPanel({ portrait }: { portrait: Portrait }) {
  return (
    <figure
      data-cursor-target="portrait"
      data-cursor-intro="portrait"
      className="group relative aspect-[4/5] w-full overflow-hidden border border-line-red bg-[linear-gradient(180deg,#33ff33_0%,#1a8c1a_38%,#0a2e0a_72%,#09080b_100%)] xl:aspect-[5/6]"
    >
      {portrait.src ? (
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1200px) 30vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-[50%_32%]"
        />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="blueprint absolute inset-0 opacity-60" />
          <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
            <g fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.5">
              <circle cx="100" cy="98" r="78" strokeDasharray="1.5 3" />
              <circle cx="100" cy="98" r="50" />
            </g>
            <g stroke="rgba(255,255,255,0.42)" strokeWidth="0.6">
              {LINKS.map(([a, b]) => (
                <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
              ))}
            </g>
            {NODES.map(([x, y, r], i) => (
              <rect
                key={i}
                x={x - r}
                y={y - r}
                width={r * 2}
                height={r * 2}
                fill={i === 0 ? "#fff" : "#09080b"}
                stroke="#fff"
                strokeWidth="0.7"
              />
            ))}
          </svg>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,11,0.6)_0%,transparent_16%,transparent_55%,rgba(9,8,11,0.85)_100%)]" />

      <Corner className="left-3 top-3 border-l border-t" />
      <Corner className="right-3 top-3 border-r border-t" />

      <div className="micro absolute inset-x-3 top-3 flex justify-between px-6 text-[10px] text-white/75" aria-hidden="true">
        <span>Perfil</span>
        <span>01</span>
      </div>

      <figcaption className="micro absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-line bg-bg/90 px-4 py-3 text-[10px]">
        <span className="flex items-center gap-2 text-ink">
          <span className="status-dot" aria-hidden="true" />
          {portrait.caption.title}
        </span>
        <span className="text-red">{portrait.caption.subtitle}</span>
      </figcaption>
    </figure>
  );
}
