import { contact, profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="shell pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-10">
        <div
          aria-hidden="true"
          className="grid size-24 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e8e8ed] to-[#d2d2d7] text-[32px] font-semibold text-[#424245] md:size-32 md:text-[40px] dark:from-[#3a3a3c] dark:to-[#2c2c2e] dark:text-[#d1d1d6]"
        >
          {profile.initials}
        </div>
        <div>
          <p className="inline-flex items-center gap-2 text-[14px] text-mute">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {profile.status}
          </p>
          <h1 id="inicio-titulo" className="mt-2 text-[44px] leading-[1.05] font-semibold tracking-tight md:text-[64px]">
            {profile.name}
          </h1>
          <p className="mt-3 text-[21px] leading-snug text-ink md:text-[24px]">
            {profile.title}
            <span className="block text-mute">{profile.stack}</span>
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-[700px] text-[19px] leading-relaxed text-ink md:text-[21px]">{profile.summary}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
        <a
          href={`mailto:${contact.email}`}
          className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-[15px] font-medium text-on-accent hover:opacity-90 sm:col-auto"
        >
          Enviar e-mail
        </a>
        {contact.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-[15px] font-medium text-accent hover:border-accent"
          >
            {l.label}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        ))}
      </div>

      <dl className="mt-12 grid gap-4 sm:grid-cols-3">
        {profile.facts.map((f) => (
          <div key={f.label} className="card grid px-5 py-4">
            <dt className="text-[14px] text-mute">{f.label}</dt>
            <dd className="order-first text-[22px] font-semibold tracking-tight">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
