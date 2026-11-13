export type NavItem = {
  id: string;
  label: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type HeroCard = {
  index: string;
  title: string;
  /** Short technical tags shown as chips (e.g. "DDD", "EDA", "gRPC"). */
  chips: string[];
  description: string;
};

export type Portrait = {
  /** Path inside /public, e.g. "/images/portrait.webp". `null` renders the abstract panel. */
  src: string | null;
  alt: string;
  caption: { title: string; subtitle: string };
};

export type Profile = {
  fullName: string;
  wordmark: string;
  greeting: string;
  name: string;
  headline: string;
  microheadline: string;
  intro: string;
  status: { label: string; detail: string };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  portrait: Portrait;
  heroCards: HeroCard[];
  heroStats: Metric[];
};

export type SectionMarker = {
  code: string;
  name: string;
  position: string;
};

export type Principle = {
  index: string;
  title: string;
  body: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Education = {
  course: string;
  institution: string;
  period: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type About = {
  marker: SectionMarker;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  quote: string;
  principles: Principle[];
  experience: {
    eyebrow: string;
    title: string;
    items: Experience[];
    education: Education[];
  };
  skills: {
    eyebrow: string;
    title: string;
    groups: SkillGroup[];
  };
};

export type Layer = {
  id: string;
  code: string;
  name: string;
  headline: string;
  body: string;
  specs: { label: string; value: string }[];
  tags: string[];
};

export type FlagshipProject = {
  badge: string;
  context: string;
  title: string;
  description: string;
  metrics: Metric[];
  stackLabel: string;
  stackNote: string;
  layers: Layer[];
};

export type Project = {
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
  tech: string[];
};

export type Flagships = {
  marker: SectionMarker;
  eyebrow: string;
  title: string;
  description: string;
  flagship: FlagshipProject;
  projects: Project[];
};

export type MatrixCategory = {
  id: string;
  label: string;
};

export type MatrixSystem = {
  id: string;
  /** Category ids; the first one is shown as the card label. */
  categories: string[];
  title: string;
  description: string;
  meta: { label: string; value: string }[];
};

export type Matrix = {
  marker: SectionMarker;
  eyebrow: string;
  title: string;
  description: string;
  allLabel: string;
  categories: MatrixCategory[];
  systems: MatrixSystem[];
};

export type SocialPlatform = "github" | "x" | "linkedin" | "instagram";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  /** Leave `null` until a confirmed profile URL exists — unconfigured links are not rendered. */
  href: string | null;
};

export type Contact = {
  marker: SectionMarker;
  eyebrow: string;
  headline: [string, string];
  body: string;
  email: string;
  copyLabel: string;
  copiedLabel: string;
  copyErrorLabel: string;
  /** Web CV (no phone number), served from public/cv. */
  cv: CvDownload;
  socials: SocialLink[];
};

export type CvDownload = {
  label: string;
  href: string;
  alternate: { label: string; href: string; lang: string };
};

export type Footer = {
  copyright: string;
  signature: string;
  build: string;
};

/** Machine-readable identity (schema.org Person JSON-LD); not rendered visually. */
export type SitePerson = {
  name: string;
  alternateName: string[];
  jobTitle: string;
  country: string;
  sameAs: string[];
  alumniOf: string[];
  knowsAbout: string[];
  knowsLanguage: string[];
};

export type Site = {
  title: string;
  description: string;
  lang: string;
  person: SitePerson;
};

export type Portfolio = {
  site: Site;
  nav: NavItem[];
  profile: Profile;
  about: About;
  flagships: Flagships;
  matrix: Matrix;
  contact: Contact;
  footer: Footer;
};
