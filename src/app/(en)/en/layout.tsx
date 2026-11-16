import type { Viewport } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { portfolioEn } from "@/data/portfolio.en";
import { buildMetadata } from "@/lib/metadata";
import "../../globals.css";

export const metadata = buildMetadata(portfolioEn);

export const viewport: Viewport = {
  themeColor: "#09080b",
  colorScheme: "dark",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell portfolio={portfolioEn}>{children}</SiteShell>;
}
