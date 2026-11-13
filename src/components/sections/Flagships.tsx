import type { Flagships as FlagshipsType } from "@/types/portfolio";
import { Metric } from "@/components/ui/Metric";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { LayerTabs } from "./LayerTabs";

export function Flagships({ flagships }: { flagships: FlagshipsType }) {
  const { flagship } = flagships;

  return (
    <section
      id="flagships"
      aria-labelledby="flagships-title"
      className="ambient py-24 md:py-32"
    >
      <div className="shell">
        <SectionHeading
          id="flagships"
          marker={flagships.marker}
          eyebrow={flagships.eyebrow}
          title={flagships.title}
          description={flagships.description}
        />

        <Reveal className="mt-14 md:mt-20">
          <article className="relative overflow-hidden border border-line-red bg-[#0c0a0d] p-5 md:p-10 xl:p-14">
            <div
              className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[640px] bg-[radial-gradient(closest-side,rgba(255,59,69,0.09),transparent)]"
              aria-hidden="true"
            />

            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <TechBadge tone="solid">{flagship.badge}</TechBadge>
              <span className="micro text-[10px] text-dim">{flagship.context}</span>
            </div>

            <h3 data-cursor-target="flagship" className="relative mt-7 max-w-[20ch] text-[clamp(30px,4.4vw,60px)] font-extrabold leading-[1] tracking-[-0.04em] text-ink">
              {flagship.title}
            </h3>
            <p className="relative mt-5 max-w-[62ch] text-[15px] leading-relaxed text-mute">
              {flagship.description}
            </p>

            <dl data-cursor-target="metrics" className="relative mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
              {flagship.metrics.map((metric) => (
                <Metric key={metric.label} {...metric} />
              ))}
            </dl>

            <div className="relative mt-14">
              <p className="micro mb-5 flex items-center gap-3 text-ink">
                <span className="h-2 w-2 bg-red" aria-hidden="true" />
                {flagship.stackLabel}
              </p>
              <LayerTabs layers={flagship.layers} label={flagship.stackLabel} />
              <p className="mt-8 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-dim">
                {flagship.stackNote}
              </p>
            </div>
          </article>
        </Reveal>

        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {flagships.projects.map((project, i) => (
            <li key={project.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <ProjectCard project={project} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
