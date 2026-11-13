import type { Project } from "@/types/portfolio";
import { TechBadge } from "./TechBadge";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article data-cursor-target="project" className="group flex h-full flex-col border border-line bg-surface p-6 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-line-red hover:bg-surface-2 md:p-7">
      <div className="flex items-center justify-between">
        <p className="micro text-red">{project.eyebrow}</p>
        <span className="micro text-dim transition-colors group-hover:text-mute" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
        {project.title}
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-mute">{project.description}</p>
      <ul className="mb-7 mt-5 flex flex-col gap-2 text-[13px] text-ink/80">
        {project.details.map((detail) => (
          <li key={detail} className="flex gap-3">
            <span className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-red" aria-hidden="true" />
            {detail}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-5">
        {project.tech.map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </div>
    </article>
  );
}
