import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="shell pt-14 pb-12 md:pt-24 md:pb-16">
      {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
      <h1 className="display max-w-5xl text-[clamp(2.75rem,7vw,6.25rem)]">{title}</h1>
      {lead && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">{lead}</p>}
      {children}
    </section>
  );
}
