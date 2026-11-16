import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Flagships } from "@/components/sections/Flagships";
import { Hero } from "@/components/sections/Hero";
import { SystemsMatrix } from "@/components/sections/SystemsMatrix";
import type { Portfolio } from "@/types/portfolio";

export function HomePage({ portfolio }: { portfolio: Portfolio }) {
  return (
    <>
      <a
        href="#main"
        className="micro sr-only z-[60] bg-red px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {portfolio.site.ui.skipLink}
      </a>
      <Header nav={portfolio.nav} wordmark={portfolio.profile.wordmark} status={portfolio.profile.status} ui={portfolio.site.ui} />
      <main id="main">
        <Hero profile={portfolio.profile} />
        <About about={portfolio.about} />
        <Flagships flagships={portfolio.flagships} />
        <SystemsMatrix matrix={portfolio.matrix} />
        <Contact contact={portfolio.contact} />
      </main>
      <Footer footer={portfolio.footer} wordmark={portfolio.profile.wordmark} />
    </>
  );
}
