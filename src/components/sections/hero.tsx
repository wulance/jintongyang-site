import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { ToyStickers } from "./toy-stickers";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const [first, second, third] = t.lines;
  return (
    <section className="px-2 pt-3 md:px-3">
      <div
        className="relative overflow-hidden rounded-[2rem] bg-persimmon md:rounded-[2.75rem]"
        style={{ "--em": "var(--color-butter)" } as CSSProperties}
      >
        <div className="shell relative flex min-h-[calc(100svh-8.5rem)] flex-col py-7 md:py-9">
          <ul className="relative z-20 flex flex-wrap justify-between gap-x-8 gap-y-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-ink/80 uppercase md:text-xs">
            {t.meta.map((item, i) => (
              <li key={item} className={i === 1 ? "max-md:hidden" : ""}>
                {item}
              </li>
            ))}
          </ul>

          <h1 className="hero-title display relative z-10 my-auto py-10 text-[clamp(5.25rem,17.5vw,17.5rem)] leading-[0.8] text-paper">
            <span className="block">{first}</span>
            <span className="block md:pl-[0.55em]">{second}</span>
            <span className="block">
              <em>{third}</em>
            </span>
          </h1>

          <div className="relative z-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-snug font-medium text-ink md:text-xl">{t.lead}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={routes.contact(locale)} variant="ink" size="lg">
                {dict.cta.brief}
              </ButtonLink>
              <ButtonLink href={routes.products(locale)} variant="paper" size="lg" arrow={false}>
                {dict.cta.browse}
              </ButtonLink>
            </div>
          </div>

          <ToyStickers locale={locale} hint={t.drag} />
        </div>
      </div>
    </section>
  );
}
