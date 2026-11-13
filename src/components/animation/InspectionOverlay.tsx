import type { Ref } from "react";
import { BOX } from "./animationTimeline";

type InspectionBoxProps = {
  ref?: Ref<HTMLDivElement>;
};

/**
 * One cyan inspection box: 1px outline drawn in, corner handles, a centre
 * cross and a dimension label ("320 × 84"). Hidden by default; geometry and
 * animation are applied imperatively by the engine (pool, no re-renders).
 */
export function InspectionBox({ ref }: InspectionBoxProps) {
  const handle = "absolute h-[5px] w-[5px] border bg-[#050507]";
  return (
    <div
      ref={ref}
      data-box=""
      className="absolute left-0 top-0 origin-top-left"
      style={{ opacity: 0, visibility: "hidden", color: BOX.color }}
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <rect
          x="0.5"
          y="0.5"
          pathLength={1}
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1"
          strokeDashoffset="1"
          shapeRendering="crispEdges"
        />
      </svg>
      <span className={`${handle} -left-[2px] -top-[2px]`} style={{ borderColor: BOX.color }} />
      <span className={`${handle} -right-[2px] -top-[2px]`} style={{ borderColor: BOX.color }} />
      <span className={`${handle} -bottom-[2px] -left-[2px]`} style={{ borderColor: BOX.color }} />
      <span className={`${handle} -bottom-[2px] -right-[2px]`} style={{ borderColor: BOX.color }} />
      {/* Centre cross */}
      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 bg-current opacity-60" />
      <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-y-1/2 bg-current opacity-60" />
      <span
        data-box-label=""
        className="absolute -top-[19px] left-[-1px] whitespace-nowrap px-1.5 py-[2px] font-mono text-[10px] leading-none tracking-[0.04em]"
        style={{ background: BOX.labelBg, color: BOX.color }}
      />
    </div>
  );
}
