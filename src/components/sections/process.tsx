import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process({ dict, action }: { dict: Dictionary; action?: ReactNode }) {
  const t = dict.process;
  return (
    <section className="shell py-24 md:py-32">
      <div className="rounded-[2.25rem] bg-ink px-6 py-16 text-paper md:px-14 md:py-24">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} tone="paper" action={action} />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-card bg-paper/10 md:grid-cols-5">
          {t.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-ink p-6 md:min-h-[17rem] md:p-7">
              <span className="display text-5xl text-butter">0{i + 1}</span>
              <h3 className="mt-auto pt-8 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
