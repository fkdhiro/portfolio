import { ArrowRight } from "lucide-react";
import { HERO_REVEAL } from "@/components/animation/animationTimeline";
import { Metric } from "@/components/ui/Metric";
import { Reveal } from "@/components/ui/Reveal";
import type { HeroCard, Profile } from "@/types/portfolio";
import { HeroWordmark } from "./HeroWordmark";
import { PortraitPanel } from "./PortraitPanel";

function TechCard({ card }: { card: HeroCard }) {
  return (
    <article
      data-cursor-target="card"
      data-cursor-intro={`card-${Number(card.index)}`}
      className="group relative h-full border border-line-red/70 bg-surface p-4 transition-[border-color,transform,background-color] duration-300 hover:-translate-x-1 hover:border-red hover:bg-surface-2 xl:px-5 xl:py-4"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[12px] font-medium text-red">{card.index}</span>
        <ul className="flex flex-wrap justify-end gap-1.5" aria-label="Tecnologias">
          {card.chips.map((chip, i) => (
            <li
              key={chip}
              className={`micro border px-1.5 py-px text-[9px] ${
                i === 0 ? "border-line-red text-red" : "border-line text-mute"
              }`}
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-[18px] font-bold leading-tight tracking-[-0.02em] text-ink xl:text-[19px]">
        {card.title}
      </p>
      <p className="mt-1.5 text-[13px] leading-snug text-mute">{card.description}</p>
    </article>
  );
}

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-[72px] md:pt-[76px]">
      {/* Ambient wine light behind the portrait. */}
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-[640px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,59,69,0.10),transparent)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <HeroWordmark />

        <div className="relative z-10 -mt-[clamp(20px,5.8vw,84px)] grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)_minmax(0,0.9fr)] xl:gap-8">
          {/* Left — name block overlapping the base of the giant word. */}
          <div className="flex flex-col">
            <h1 id="hero-title" className="flex flex-col items-start">
              <Reveal as="span" intro delay={HERO_REVEAL.greeting} y={10} className="block">
                <span className="font-serif text-[clamp(30px,3.2vw,46px)] italic leading-none text-ink">
                  {profile.greeting}
                </span>
              </Reveal>
              <Reveal as="span" intro delay={HERO_REVEAL.name} y={14} className="block">
                <span
                  data-cursor-target="name"
                  data-cursor-intro="name"
                  className="mt-2 inline-block bg-red px-3 pb-1 pt-2 text-[clamp(48px,6vw,88px)] font-black leading-[0.86] tracking-[-0.045em] text-white"
                >
                  {profile.name}
                </span>
              </Reveal>
              <span className="sr-only"> — {profile.fullName}, {profile.headline}</span>
            </h1>

            <Reveal intro delay={HERO_REVEAL.text} className="mt-7">
              <div data-cursor-target="text" data-cursor-intro="text" className="flex flex-col gap-5">
                <p className="micro flex items-center gap-2.5 font-semibold text-ink">
                  <span className="status-dot shrink-0" aria-hidden="true" />
                  {profile.microheadline}
                </p>
                <p className="max-w-[44ch] text-[15px] leading-relaxed text-mute">{profile.intro}</p>
              </div>
            </Reveal>

            <Reveal intro delay={HERO_REVEAL.ctas} className="mt-8 flex flex-col items-start gap-3 sm:flex-row md:flex-col">
              <a
                href={profile.primaryCta.href}
                data-cursor-target="cta"
                data-cursor-intro="cta"
                className="group inline-flex items-center gap-3 whitespace-nowrap bg-red px-5 py-3.5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-deep"
              >
                <span className="text-white/70" aria-hidden="true">&gt;_</span>
                {profile.primaryCta.label}
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href={profile.secondaryCta.href}
                className="micro inline-flex items-center whitespace-nowrap border border-line-strong bg-surface px-5 py-3.5 font-medium text-ink transition-colors hover:border-red hover:text-white"
              >
                {profile.secondaryCta.label}
              </a>
            </Reveal>
          </div>

          {/* Centre — portrait panel. */}
          <Reveal intro delay={HERO_REVEAL.portrait} y={28} className="w-full">
            <PortraitPanel portrait={profile.portrait} />
          </Reveal>

          {/* Right — three focus areas. */}
          <div className="grid gap-3 md:col-span-2 md:grid-cols-3 xl:col-span-1 xl:grid-cols-1 xl:content-start xl:pt-[clamp(0px,5.8vw,84px)]">
            {profile.heroCards.map((card, i) => (
              <Reveal intro key={card.index} delay={HERO_REVEAL.cards + i * HERO_REVEAL.cardStep} y={14} className="h-full">
                <TechCard card={card} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal intro delay={HERO_REVEAL.stats} y={12}>
          <dl
            data-cursor-target="stats"
            data-cursor-intro="stats"
            className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-line pb-14 pt-6 md:grid-cols-4 md:gap-8 xl:mt-10 xl:pt-5"
          >
            {profile.heroStats.map((stat) => (
              <Metric key={stat.label} {...stat} size="lg" />
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
