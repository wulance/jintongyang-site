import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Puff } from "@/components/ui/puff";
import { HeroStage } from "./hero-stage";

/** First screen: the claim in stuffed letters on pattern paper, the red sun, and both actions in view. */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const [first, second, third] = t.lines;
  const zh = locale === "zh";
  return (
    <section className="sheet relative overflow-hidden">
      <div className="shell relative flex min-h-[calc(100svh-7.25rem)] flex-col pt-6 pb-8 md:pt-8 md:pb-10">
        <ul className="note relative z-20 flex flex-wrap justify-between gap-x-8 gap-y-1 text-ink/70">
          {t.meta.map((item, i) => (
            <li key={item} className={i === 1 ? "max-md:hidden" : ""}>
              {item}
            </li>
          ))}
        </ul>

        <div className="relative flex flex-col justify-center py-6 max-lg:contents lg:flex-1 lg:py-4">
          <h1
            aria-label={t.lines.join(zh ? "" : " ")}
            className={
              "display pointer-events-none relative z-20 max-lg:mt-6 max-lg:mb-7 " +
              (zh
                ? "text-[clamp(4rem,min(21vw,19svh),13rem)] leading-[1.06] lg:text-[clamp(4rem,min(13.5vw,18.5svh),13rem)]"
                : "text-[clamp(4.5rem,min(24vw,21svh),15rem)] leading-[0.82] lg:text-[clamp(4.5rem,min(15vw,22.5svh),15rem)]")
            }
          >
            <span className="block">
              <Puff text={first} />
            </span>
            <span className="block lg:pl-[0.5em]">
              <Puff text={second} start={first.length} />
            </span>
            <em className="block">
              <Puff text={third} start={first.length + second.length} />
            </em>
          </h1>

          <div className="relative z-10 mx-auto mt-8 w-[min(78vw,24rem)] max-lg:order-last lg:absolute lg:top-1/2 lg:right-[5%] lg:mt-0 lg:w-[min(42vw,66svh,44rem)] lg:-translate-y-1/2">
            <HeroStage locale={locale} hint={t.drag} sizesLabel={t.sizes} />
          </div>
        </div>

        <div className="relative z-20 flex flex-col gap-5 max-lg:contents lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <p className="max-w-md text-[1.0625rem] leading-snug font-medium text-ink max-lg:order-last max-lg:mt-8 md:text-xl lg:max-w-[34rem] lg:text-lg xl:text-xl">{t.lead}</p>
          <div className="flex flex-wrap gap-3 max-lg:order-1 lg:shrink-0 lg:flex-nowrap">
            <ButtonLink href={routes.contact(locale)} variant="primary" size="lg">
              {dict.cta.brief}
            </ButtonLink>
            <ButtonLink href={routes.products(locale)} variant="ink" size="lg" arrow={false}>
              {dict.cta.browse}
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="stitch text-ink/35" />
    </section>
  );
}
