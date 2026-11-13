import { nav, profile } from "@/data/portfolio";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="shell flex min-h-[var(--header-h)] flex-wrap items-center justify-between gap-x-6">
        <a href="#inicio" className="rounded-sm py-3 text-[17px] font-semibold tracking-tight">
          {profile.brand}
        </a>
        <nav
          aria-label="Seções"
          className="order-last -mx-5 w-[calc(100%+2.5rem)] overflow-x-auto px-5 pb-3 md:order-none md:m-0 md:w-auto md:overflow-visible md:p-0"
        >
          <ul className="flex gap-5 text-[14px] whitespace-nowrap text-mute md:gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-sm hover:text-ink hover:underline underline-offset-4">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#contato"
          className="rounded-full bg-accent px-4 py-2 text-[14px] font-medium text-on-accent hover:opacity-90"
        >
          Contato
        </a>
      </div>
    </header>
  );
}
