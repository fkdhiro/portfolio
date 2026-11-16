import type { Metadata } from "next";
import { portfolioEn } from "@/data/portfolio.en";
import { portfolioPt } from "@/data/portfolio.pt";
import { siteUrl } from "@/lib/siteUrl";
import type { Portfolio } from "@/types/portfolio";

/** Metadata (title, Open Graph, canonical, hreflang) de uma versão do site. */
export function buildMetadata(portfolio: Portfolio): Metadata {
  const { site, profile } = portfolio;
  const ogImage = {
    // PNG 1200×630: the size/format LinkedIn, WhatsApp and X previews expect.
    url: "/images/og.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: site.ogAlt,
  };
  return {
    metadataBase: new URL(siteUrl),
    title: site.title,
    description: site.description,
    alternates: {
      canonical: site.path,
      languages: {
        [portfolioPt.site.lang]: portfolioPt.site.path,
        [portfolioEn.site.lang]: portfolioEn.site.path,
        "x-default": portfolioPt.site.path,
      },
    },
    openGraph: {
      type: "profile",
      url: site.path,
      siteName: profile.fullName,
      title: site.title,
      description: site.description,
      locale: site.locale,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      images: [ogImage.url],
    },
  };
}
