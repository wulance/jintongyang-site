import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="shell grid gap-x-14 gap-y-7 pt-12 pb-12 md:pt-20 md:pb-16 lg:grid-cols-2">
      <div>
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="display text-[clamp(2.125rem,4.15vw,3.75rem)]">{title}</h1>
      </div>
      {(lead || children) && (
        <div className="flex max-w-[30rem] flex-col items-start gap-7 lg:pt-[2.6rem]">
          {lead && <p className="text-ink/80">{lead}</p>}
          {children}
        </div>
      )}
    </section>
  );
}
