import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Chip, Section } from "@/components/Section";
import { about, contact, education, experience, languages, profile, projects, skills } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />

        <Section id="sobre" title="Sobre">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 text-[17px] leading-relaxed">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ul className="space-y-3">
              {about.principles.map((p) => (
                <li key={p.title} className="card px-5 py-4">
                  <h3 className="text-[17px] font-semibold">{p.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-mute">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="experiencia" title="Experiência">
          <ol className="space-y-4">
            {experience.map((job) => (
              <li key={job.company} className="card p-5 md:p-8">
                <article>
                  <header className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                    <h3 className="text-[21px] font-semibold tracking-tight">
                      {job.role} <span className="block font-normal text-mute md:inline">
                        <span className="hidden md:inline">· </span>
                        {job.company}
                      </span>
                    </h3>
                    <p className="shrink-0 text-[14px] text-mute">{job.period}</p>
                  </header>
                  <p className="mt-1 text-[14px] text-mute">{job.place}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-[16px] leading-relaxed marker:text-mute md:pl-5">
                    {job.highlights.map((h) => (
                      <li key={h.slice(0, 32)}>{h}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projetos" title="Projetos" lead="Seleção de projetos pessoais e de estudo.">
          <ul className="grid gap-4 lg:grid-cols-3">
            {projects.map((p) => (
              <li key={p.title} className="card flex flex-col p-6">
                <h3 className="text-[19px] leading-snug font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-mute">{p.description}</p>
                <ul aria-label="Tecnologias" className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="competencias" title="Competências">
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((g) => (
              <div key={g.title} className="card p-6">
                <h3 className="text-[17px] font-semibold">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <Chip key={i}>{i}</Chip>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="formacao" title="Formação e idiomas">
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="card divide-y divide-line/60 px-6">
              {education.map((e) => (
                <li key={e.course} className="py-5">
                  <h3 className="text-[17px] font-semibold">{e.course}</h3>
                  <p className="mt-1 text-[15px] text-mute">
                    {e.school} · {e.period}
                  </p>
                </li>
              ))}
            </ul>
            <dl className="card divide-y divide-line/60 px-6">
              {languages.map((l) => (
                <div key={l.name} className="flex items-baseline justify-between gap-4 py-5">
                  <dt className="text-[17px] font-semibold">{l.name}</dt>
                  <dd className="text-[15px] text-mute">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section id="contato" title="Contato" lead={contact.text}>
          <ul className="card divide-y divide-line/60 px-6">
            <li className="flex flex-wrap items-baseline justify-between gap-2 py-5">
              <span className="text-[15px] text-mute">E-mail</span>
              <a href={`mailto:${contact.email}`} className="rounded-sm text-[17px] font-medium break-all text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent sm:break-normal">
                {contact.email}
              </a>
            </li>
            {contact.links.map((l) => (
              <li key={l.href} className="flex flex-wrap items-baseline justify-between gap-2 py-5">
                <span className="text-[15px] text-mute">{l.label}</span>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm text-[17px] font-medium break-all text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent sm:break-normal"
                >
                  {l.href.replace(/^https:\/\/(www\.)?/, "")}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
            <li className="flex flex-wrap items-baseline justify-between gap-2 py-5">
              <span className="text-[15px] text-mute">Local</span>
              <span className="text-[17px]">{profile.location.label}</span>
            </li>
          </ul>
        </Section>
      </main>

      <footer className="shell border-t border-line/60 py-8 text-[14px] text-mute">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
