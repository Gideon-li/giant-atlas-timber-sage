import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CareerSwitch({ compact }: { compact?: boolean }) {
  const careerTrack = useAppStore((s) => s.careerTrack);
  const setCareerTrack = useAppStore((s) => s.setCareerTrack);
  return (
    <span
      className={cn("inline-flex shrink-0 rounded-md border border-border bg-elevated p-0.5", compact && "text-xs")}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {(
        [
          ["career", "事业"],
          ["study", "学业"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => setCareerTrack(id)}
          className={cn(
            "h-8 rounded-sm px-2 text-xs",
            careerTrack === id ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
          )}
        >
          {label}
        </button>
      ))}
    </span>
  );
}
