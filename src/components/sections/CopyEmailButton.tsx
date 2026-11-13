"use client";

import { Check, CircleAlert, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type State = "idle" | "copied" | "error";

type CopyEmailButtonProps = {
  email: string;
  label: string;
  copiedLabel: string;
  errorLabel: string;
};

async function copyText(text: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for insecure contexts (e.g. LAN IP during development).
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  if (!ok) throw new Error("Copy command was rejected");
}

export function CopyEmailButton({ email, label, copiedLabel, errorLabel }: CopyEmailButtonProps) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onClick = async () => {
    try {
      await copyText(email);
      setState("copied");
    } catch {
      setState("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  };

  const Icon = state === "copied" ? Check : state === "error" ? CircleAlert : Copy;
  const text = state === "copied" ? copiedLabel : state === "error" ? errorLabel : label;

  return (
    <>
      <button
        type="button"
        data-cursor-target="copy"
        onClick={onClick}
        className="group inline-flex min-w-[16rem] items-center justify-center gap-3 bg-red px-6 py-4 text-[14px] font-semibold tracking-[-0.005em] text-bg transition-colors hover:bg-red-deep"
      >
        <Icon size={16} strokeWidth={2} aria-hidden="true" />
        <span>{text}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? `${copiedLabel} ${email}` : state === "error" ? errorLabel : ""}
      </span>
    </>
  );
}
