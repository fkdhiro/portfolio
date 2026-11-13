type Props = { id: string; title: string; lead?: string; children: React.ReactNode };

export function Section({ id, title, lead, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="shell py-12 md:py-20">
      <h2 id={`${id}-titulo`} className="text-[28px] font-semibold tracking-tight md:text-[34px]">
        {title}
      </h2>
      {lead ? <p className="mt-3 max-w-[640px] text-[17px] leading-relaxed text-mute">{lead}</p> : null}
      <div className="mt-8 md:mt-10">{children}</div>
    </section>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full bg-chip px-3 py-1.5 text-[14px] leading-5 text-ink">{children}</li>
  );
}
