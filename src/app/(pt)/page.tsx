import { HomePage } from "@/components/layout/HomePage";
import { portfolioPt } from "@/data/portfolio.pt";

export default function Page() {
  return <HomePage portfolio={portfolioPt} />;
}
