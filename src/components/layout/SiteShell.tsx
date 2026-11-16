import type { ReactNode } from "react";
import { Anton, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { CursorOrchestra } from "@/components/animation/CursorOrchestra";
import { IntroCurtain, introBootScript } from "@/components/animation/IntroReveal";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { siteUrl } from "@/lib/siteUrl";
import type { Portfolio } from "@/types/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Not needed for the first frame (micro labels appear after the intro):
// skipping the preload frees bandwidth for the critical fonts, JS and photo.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// Static (non-variable) condensed face for the giant outlined wordmark:
// clean single contours, so the stroke shows no overlapping glyph parts.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  preload: false,
});
function personJsonLd(portfolio: Portfolio) {
  const person = portfolio.site.person;
  return {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.alternateName,
  jobTitle: person.jobTitle,
  url: `${siteUrl}${portfolio.site.path}`,
  // Privacy: no e-mail nor city in machine-readable data; contact via sameAs.
  address: { "@type": "PostalAddress", addressCountry: person.country },
  sameAs: person.sameAs,
  alumniOf: person.alumniOf.map((name) => ({ "@type": "EducationalOrganization", name })),
  knowsAbout: person.knowsAbout,
  knowsLanguage: person.knowsLanguage,
};
}

export function SiteShell({ portfolio, children }: { portfolio: Portfolio; children: ReactNode }) {
  return (
    <html
      lang={portfolio.site.lang}
      // The boot script adds classes (js, intro-armed) before hydration.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <script
          type="application/ld+json"
          // JSON.stringify output from static data; "<" escaped to keep the tag closed.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(portfolio)).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        {children}
        <IntroCurtain intro={portfolio.site.ui.intro} />
        <CursorOrchestra />
        <RevealObserver />
      </body>
    </html>
  );
}
