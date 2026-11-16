import type { Viewport } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { portfolioPt } from "@/data/portfolio.pt";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = buildMetadata(portfolioPt);

export const viewport: Viewport = {
  themeColor: "#09080b",
  colorScheme: "dark",
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell portfolio={portfolioPt}>{children}</SiteShell>;
}
