import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/get-dictionary";

/** The five steps of a custom order, side by side under one rule. */
export function Process({ dict, action }: { dict: Dictionary; action?: ReactNode }) {
  const t = dict.process;
  return (
    <section className="shell pb-20 md:pb-28">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} action={action} />
      <ol className="mt-10 grid gap-x-8 border-t border-ink sm:grid-cols-2 md:mt-14 lg:grid-cols-5">
        {t.steps.map((step, i) => (
          <li key={step.title} className="border-b border-line py-6 lg:border-b-0 lg:pb-0">
            <span className="note">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 text-[1.0625rem] font-bold">{step.title}</h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink/75">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
