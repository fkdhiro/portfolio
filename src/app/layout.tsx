import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { CursorOrchestra } from "@/components/animation/CursorOrchestra";
import { IntroCurtain, introBootScript } from "@/components/animation/IntroReveal";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { portfolio } from "@/data/portfolio";
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

export const metadata: Metadata = {
  title: portfolio.site.title,
  description: portfolio.site.description,
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
