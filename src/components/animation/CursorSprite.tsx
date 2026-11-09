import type { Ref } from "react";

export const CURSOR_SYMBOL_ID = "orchestra-cursor";

/** Pointer glyph defined once; sprites reference it with <use>. Tip at (1,1). */
export function CursorSymbolDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <symbol id={CURSOR_SYMBOL_ID} viewBox="0 0 16 22">
          <path
            d="M1 1v15.6l4.1-3.9 2.8 6.4 2.7-1.2-2.7-6.2h5.7z"
            fill="currentColor"
            stroke="#050507"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </symbol>
      </defs>
    </svg>
  );
}

type CursorSpriteProps = {
  ref?: Ref<HTMLDivElement>;
  color: string;
  size: number;
};

/** One pointer. Transform/opacity are written imperatively by the engine. */
export function CursorSprite({ ref, color, size }: CursorSpriteProps) {
  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 origin-top-left will-change-transform"
      style={{ color, opacity: 0, transform: "translate3d(-100px,-100px,0)" }}
    >
      <svg width={(size * 16) / 22} height={size} className="-translate-x-px -translate-y-px">
        <use href={`#${CURSOR_SYMBOL_ID}`} />
      </svg>
    </div>
  );
}
