import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { CursorOrchestra } from "@/components/animation/CursorOrchestra";
import { IntroCurtain, introBootScript } from "@/components/animation/IntroReveal";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/siteUrl";
import "./globals.css";

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

const ogImage = {
  url: "/images/portrait-1080.webp",
  width: 1080,
  height: 1080,
  alt: portfolio.profile.portrait.alt,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: portfolio.site.title,
  description: portfolio.site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: portfolio.profile.fullName,
    title: portfolio.site.title,
    description: portfolio.site.description,
    locale: "pt_BR",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.site.title,
    description: portfolio.site.description,
    images: [ogImage.url],
  },
};

const person = portfolio.site.person;
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.alternateName,
  jobTitle: person.jobTitle,
  url: `${siteUrl}/`,
  // Privacy: no e-mail nor city in machine-readable data; contact via sameAs.
  address: { "@type": "PostalAddress", addressCountry: person.country },
  sameAs: person.sameAs,
  alumniOf: person.alumniOf.map((name) => ({ "@type": "EducationalOrganization", name })),
  knowsAbout: person.knowsAbout,
  knowsLanguage: person.knowsLanguage,
};

export const viewport: Viewport = {
  themeColor: "#09080b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        {children}
        <IntroCurtain />
        <CursorOrchestra />
        <RevealObserver />
      </body>
    </html>
  );
}
