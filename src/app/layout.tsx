import type { Metadata, Viewport } from "next";
import { about, contact, education, languages, profile, siteUrl, skills } from "@/data/portfolio";
import "./globals.css";

const title = `${profile.name} — ${profile.title}`;
const description = profile.summary;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    siteName: profile.name,
    title,
    description,
  },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Dados estruturados (schema.org) para buscadores e ferramentas de triagem.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteUrl,
  inLanguage: "pt-BR",
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    alternateName: [profile.legalName, profile.brand],
    jobTitle: profile.title,
    description: about.paragraphs[0],
    email: `mailto:${contact.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.country,
    },
    sameAs: contact.links.map((l) => l.href),
    knowsAbout: skills.flatMap((g) => g.items).slice(0, 30),
    knowsLanguage: languages.map((l) => l.name),
    alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
