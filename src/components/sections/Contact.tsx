import { Download } from "lucide-react";
import { withBase } from "@/lib/basePath";
import type { Contact as ContactType } from "@/types/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionMarkerLine } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CopyEmailButton } from "./CopyEmailButton";

export function Contact({ contact }: { contact: ContactType }) {
  const socials = contact.socials.filter(
    (s): s is typeof s & { href: string } => typeof s.href === "string" && s.href.length > 0,
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden pb-24 pt-24 md:pb-32 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_55%_60%_at_50%_100%,rgba(255,59,69,0.10),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="shell relative">
        <SectionMarkerLine marker={contact.marker} />

        <Reveal className="mx-auto mt-24 flex max-w-[72rem] flex-col items-center text-center md:mt-36">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2
            id="contact-title"
            data-cursor-target="headline"
            className="mt-6 text-[clamp(2.4rem,5.6vw,4.9rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink"
          >
            <span className="block">{contact.headline[0]}</span>
            <span className="block">{contact.headline[1]}</span>
          </h2>
          <p className="mt-7 max-w-[52ch] text-[16px] leading-relaxed text-mute">{contact.body}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-6">
          <a
            href={`mailto:${contact.email}`}
            data-cursor-target="email"
            className="inline-block break-all py-2 font-mono text-[clamp(1rem,2vw,1.35rem)] text-ink underline decoration-line-strong underline-offset-8 transition-colors hover:text-red hover:decoration-red"
          >
            {contact.email}
          </a>
          <CopyEmailButton
            email={contact.email}
            label={contact.copyLabel}
            copiedLabel={contact.copiedLabel}
            errorLabel={contact.copyErrorLabel}
          />
          <div className="flex flex-col items-center gap-3">
            <a
              href={withBase(contact.cv.href)}
              download
              type="application/pdf"
              className="inline-flex min-w-[16rem] items-center justify-center gap-3 border border-line-strong px-6 py-4 text-[14px] font-semibold tracking-[-0.005em] text-ink transition-colors hover:border-red hover:text-red"
            >
              <Download size={16} strokeWidth={2} aria-hidden="true" />
              <span>{contact.cv.label}</span>
            </a>
            <a
              href={withBase(contact.cv.alternate.href)}
              hrefLang={contact.cv.alternate.lang}
              lang={contact.cv.alternate.lang}
              download
              type="application/pdf"
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-mute underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-red"
            >
              {contact.cv.alternate.label}
            </a>
          </div>
        </Reveal>

        {socials.length > 0 ? (
          <Reveal delay={0.25}>
            <ul className="mt-14 flex items-center justify-center gap-2" aria-label={contact.socialsLabel}>
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center border border-line text-mute transition-colors hover:border-red hover:text-ink"
                  >
                    <SocialIcon platform={social.platform} className="h-4 w-4" />
                    <span className="sr-only">{social.label} (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
