import type { Fact } from "@/content/company";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Company-stated figures, set large on a dark panel. */
export function Facts({ items, note, locale, className }: { items: Fact[]; note: string; locale: Locale; className?: string }) {
  return (
    <section className={cn("px-2 md:px-3", className)}>
      <div className="rounded-[2rem] bg-ink text-paper md:rounded-[2.75rem]">
        <div className="shell py-14 md:py-20">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {items.map((fact, i) => (
              <div
                key={fact.label.en}
                className={cn("flex flex-col-reverse justify-end gap-3 border-paper/15 py-7 lg:px-8 lg:py-4", i % 2 ? "pl-6" : "pr-6", i % 2 ? "border-l" : "", i > 1 ? "max-lg:border-t" : "", i > 0 ? "lg:border-l" : "lg:pl-0")}
              >
                <dt className="max-w-[14rem] text-sm text-paper/65 md:text-base">{fact.label[locale]}</dt>
                <dd className="display text-[clamp(3.5rem,9vw,8.5rem)] text-butter">
                  {fact.value}
                  {i === 0 && <sup className="ml-1 align-super font-sans text-lg font-medium tracking-normal text-paper/60">*</sup>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-xs text-paper/50">* {note}</p>
        </div>
      </div>
    </section>
  );
}
