type TechBadgeProps = {
  children: string;
  tone?: "neutral" | "red" | "solid";
};

const tones = {
  neutral: "border-line text-mute",
  red: "border-line-red text-red",
  solid: "border-red bg-red text-bg",
} as const;

export function TechBadge({ children, tone = "neutral" }: TechBadgeProps) {
  return (
    <span
      className={`micro inline-flex items-center border px-2 py-[3px] text-[10px] leading-none ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
