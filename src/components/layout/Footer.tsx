import type { Footer as FooterType } from "@/types/portfolio";

export function Footer({ footer, wordmark }: { footer: FooterType; wordmark: string }) {
  return (
    <footer className="border-t border-line">
      <div className="shell micro flex flex-col gap-3 py-7 text-[10px] text-dim md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2.5">
          <span className="block h-2 w-2 bg-red" aria-hidden="true" />
          <span className="font-sans text-[12px] font-extrabold normal-case tracking-[-0.01em] text-ink">
            {wordmark}
          </span>
          <span>{footer.copyright}</span>
        </p>
        <p>{footer.signature}</p>
        <p className="text-mute">{footer.build}</p>
      </div>
    </footer>
  );
}
