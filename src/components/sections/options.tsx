import type { OptionId } from "@/content";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SectionHeading } from "@/components/ui/section-heading";

const icons: Record<OptionId, string> = {
  light: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z",
  sound: "M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4",
  washable: "M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3Z",
  frame: "M12 4a2 2 0 1 0 0 .01M12 6v8M6 9l6 1 6-1M12 14l-4 6M12 14l4 6",
  heat: "M8 4c-1.5 2 1.5 3 0 5M12 4c-1.5 2 1.5 3 0 5M16 4c-1.5 2 1.5 3 0 5M5 13h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3Z",
  logo: "M3 12.5V4h8.5l9 9-8.5 8.5-9-9ZM7.5 8.5h.01",
};

export const optionOrder: OptionId[] = ["light", "sound", "washable", "frame", "heat", "logo"];

export function OptionIcon({ id }: { id: OptionId }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-6">
      <path d={icons[id]} />
    </svg>
  );
}

export function Options({ dict }: { dict: Dictionary }) {
  const t = dict.options;
  return (
    <section className="shell pb-24 md:pb-32">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {optionOrder.map((id) => (
          <li key={id} className="reveal flex gap-5 rounded-card bg-paper-deep p-7">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-paper text-persimmon">
              <OptionIcon id={id} />
            </span>
            <div>
              <h3 className="text-lg font-semibold">{t.items[id].title}</h3>
              <p className="mt-1 text-[0.9375rem] text-ink-soft">{t.items[id].body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
