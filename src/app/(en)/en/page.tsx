import { HomePage } from "@/components/layout/HomePage";
import { portfolioEn } from "@/data/portfolio.en";

export default function Page() {
  return <HomePage portfolio={portfolioEn} />;
}
