import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "neutral",
  children,
}: {
  className?: string;
  tone?: "neutral" | "good" | "bad" | "warn";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 text-[11px] font-medium tracking-wide",
        tone === "neutral" && "bg-elevated text-muted",
        tone === "good" && "bg-auspicious/15 text-auspicious-fg",
        tone === "bad" && "bg-inauspicious/15 text-inauspicious-fg",
        tone === "warn" && "bg-warn/15 text-warn",
        className,
      )}
    >
      {children}
    </span>
  );
}
