import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}

export function SectionHeading({ eyebrow, title, lead, action, tone = "ink", className }: Props) {
  return (
    <div className={cn("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        {eyebrow && <p className={cn("eyebrow mb-5", tone === "paper" && "text-paper/60")}>{eyebrow}</p>}
        <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)]">{title}</h2>
        {lead && (
          <p className={cn("mt-6 max-w-xl text-lg leading-relaxed", tone === "paper" ? "text-paper/70" : "text-ink-soft")}>
            {lead}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
