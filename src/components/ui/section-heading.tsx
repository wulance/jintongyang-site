import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  className?: string;
}

/** Label and headline on the left, the supporting sentence and its link on the right. */
export function SectionHeading({ eyebrow, title, lead, action, className }: Props) {
  return (
    <div className={cn("grid gap-x-14 gap-y-6 lg:grid-cols-2", className)}>
      <div>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 className="display text-[clamp(1.75rem,3.1vw,2.625rem)]">{title}</h2>
      </div>
      {(lead || action) && (
        <div className={cn("flex max-w-[30rem] flex-col items-start gap-6", eyebrow ? "lg:pt-[2.3rem]" : "lg:pt-2")}>
          {lead && <p className="text-ink/80">{lead}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
