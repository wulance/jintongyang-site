import type { Fact } from "@/content/company";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export function Facts({ items, note, locale, className }: { items: Fact[]; note: string; locale: Locale; className?: string }) {
  return (
    <section className={cn("shell", className)}>
      <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {items.map((fact, i) => (
          <div key={i} className={cn("pr-6 lg:pl-8 lg:first:pl-0", i > 0 && "lg:border-l lg:border-line", i % 2 === 1 && "max-lg:border-l max-lg:border-line max-lg:pl-6")}>
            <dd className="display text-[clamp(3rem,6.5vw,5.75rem)]">{fact.value}</dd>
            <dt className="mt-3 max-w-[14rem] text-ink-soft">{fact.label[locale]}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-xs text-ink-soft/80">* {note}</p>
    </section>
  );
}
