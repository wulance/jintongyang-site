import type { Fact } from "@/content/company";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Company-stated figures on one ruled row, with the note that they await confirmation. */
export function Facts({ items, note, locale, title, className }: { items: Fact[]; note: string; locale: Locale; title?: string; className?: string }) {
  return (
    <section className={cn("shell", className)}>
      {title && <h2 className="eyebrow mb-4">{title}</h2>}
      <dl className="grid grid-cols-2 border-t border-ink lg:grid-cols-4">
        {items.map((fact, i) => (
          <div
            key={fact.label.en}
            className={cn("flex flex-col-reverse justify-end gap-1 border-line py-6 lg:py-8", i % 2 ? "pl-5" : "pr-5", i > 1 && "max-lg:border-t", i > 0 && "lg:border-l lg:pl-8", i % 2 && "max-lg:border-l")}
          >
            <dt className="text-[0.9375rem] leading-snug text-ink/80">{fact.label[locale]}</dt>
            <dd className="font-display text-[clamp(2.5rem,4.6vw,4rem)] leading-[1.15] font-semibold">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className="note border-t border-line pt-3 !text-xs">{note}</p>
    </section>
  );
}
