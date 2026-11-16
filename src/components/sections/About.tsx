import type { About as AboutType } from "@/types/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";

function SubHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <Reveal className="flex flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 id={id} className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink">
        {title}
      </h3>
    </Reveal>
  );
}

export function About({ about }: { about: AboutType }) {
  const { experience, skills } = about;
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="shell">
        <SectionHeading id="about" marker={about.marker} eyebrow={about.eyebrow} title={about.title} />

        {/* Biography + principles */}
        <div className="mt-14 grid gap-14 md:mt-20 xl:grid-cols-12 xl:gap-10">
          <div className="xl:col-span-6">
            <div className="flex max-w-[62ch] flex-col gap-5 text-[16px] leading-[1.75] text-mute">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={paragraph} delay={i * 0.08}>
                  <p data-cursor-target="text" className={i === 0 ? "text-ink/90" : undefined}>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <blockquote data-cursor-target="quote" className="mt-12 max-w-[52ch] border-l-2 border-red pl-6">
                <p className="text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium italic leading-snug tracking-[-0.01em] text-ink">
                  “{about.quote}”
                </p>
              </blockquote>
            </Reveal>
          </div>

          <ol className="flex flex-col xl:col-span-5 xl:col-start-8">
            {about.principles.map((principle, i) => (
              <li key={principle.index} className="border-t border-line transition-colors last:border-b hover:border-t-line-red">
                <Reveal delay={i * 0.1} data-cursor-target="principle" className="grid grid-cols-[3rem_1fr] gap-x-4 py-7">
                  <span className="font-mono text-[13px] font-medium text-red">{principle.index}</span>
                  <div>
                    <h3 className="text-[19px] font-bold tracking-[-0.015em] text-ink">{principle.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-mute">{principle.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Experience timeline */}
        <div className="mt-24 grid gap-10 md:mt-32 xl:grid-cols-12 xl:gap-10">
          <div className="xl:col-span-4">
            <div className="flex flex-col gap-8 xl:sticky xl:top-28">
              <SubHeading eyebrow={experience.eyebrow} title={experience.title} id="experience-title" />
              <Reveal delay={0.1}>
                <div data-cursor-target="education" className="border border-line bg-surface p-5">
                  <p className="micro text-[10px] text-dim">{experience.educationLabel}</p>
                  <ul className="flex flex-col">
                    {experience.education.map((edu, i) => (
                      <li key={edu.course} className={i > 0 ? "mt-4 border-t border-line pt-4" : "mt-2"}>
                        <p className="text-[16px] font-bold tracking-[-0.01em] text-ink">{edu.course}</p>
                        <p className="mt-1 text-[13px] text-mute">
                          {edu.institution}
                          <span className="mx-2 text-dim">·</span>
                          <span className="font-mono text-[12px]">{edu.period}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          <ol aria-labelledby="experience-title" className="flex flex-col xl:col-span-8">
            {experience.items.map((item, i) => (
              <li key={`${item.company}-${item.role}`} className="border-t border-line last:border-b">
                <Reveal
                  delay={Math.min(i * 0.06, 0.24)}
                  data-cursor-target="timeline"
                  className="grid gap-x-8 gap-y-3 py-7 md:grid-cols-[11rem_1fr]"
                >
                  <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-red">{item.period}</p>
                  <div>
                    <h4 className="text-[19px] font-bold leading-tight tracking-[-0.015em] text-ink">
                      {item.role}
                      <span className="text-mute"> — {item.company}</span>
                    </h4>
                    <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-mute">{item.summary}</p>
                    {item.highlights.length > 0 ? (
                      <ul className="mt-3 flex flex-col gap-1.5 text-[13px] text-ink/80">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-red" aria-hidden="true" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Skills, grouped */}
        <div className="mt-24 md:mt-32">
          <SubHeading eyebrow={skills.eyebrow} title={skills.title} id="skills-title" />
          <ul aria-labelledby="skills-title" className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {skills.groups.map((group, i) => (
              <li key={group.label}>
                <Reveal delay={(i % 3) * 0.08} data-cursor-target="skills" className="border-t border-line pt-5">
                  <p className="micro text-red">{group.label}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={group.label}>
                    {group.items.map((item) => (
                      <li key={item}>
                        <TechBadge>{item}</TechBadge>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
