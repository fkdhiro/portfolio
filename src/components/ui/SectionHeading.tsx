import type { SectionMarker } from "@/types/portfolio";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  id: string;
  marker: SectionMarker;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionMarkerLine({ marker }: { marker: SectionMarker }) {
  return (
    <div className="micro flex items-center gap-3 text-dim" aria-hidden="true">
      <span className="text-mute">{marker.code}</span>
      <span>{marker.name}</span>
      <span className="h-px flex-1 bg-line" />
      <span>
        <span className="hidden sm:inline">{`${marker.indexLabel} `}</span>
        <span className="text-mute">[{marker.position}]</span>
      </span>
    </div>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="micro flex items-center gap-2 font-medium text-red">
      <span className="inline-block h-px w-5 bg-red" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  marker,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <header className="flex flex-col gap-10 md:gap-14">
      <SectionMarkerLine marker={marker} />
      <Reveal className={`flex flex-col gap-4 ${centered ? "items-center text-center" : ""}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={`${id}-title`}
          data-cursor-target="heading"
          className="text-[clamp(2.25rem,5vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink"
        >
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-[15px] leading-relaxed text-mute">{description}</p>
        ) : null}
      </Reveal>
    </header>
  );
}
