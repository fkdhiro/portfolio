import type { Metric as MetricType } from "@/types/portfolio";

type MetricProps = MetricType & {
  size?: "md" | "lg";
};

export function Metric({ value, label, size = "md" }: MetricProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="micro order-2 text-mute">{label}</dt>
      <dd
        className={`order-1 font-extrabold leading-none tracking-[-0.04em] text-red tabular-nums ${
          size === "lg" ? "whitespace-nowrap text-[clamp(1.4rem,6.2vw,3.5rem)] md:text-[clamp(1.6rem,3.6vw,2.5rem)] xl:text-[clamp(2.25rem,3.6vw,3.25rem)]" : "whitespace-nowrap text-[clamp(1.75rem,2.6vw,2.5rem)]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
