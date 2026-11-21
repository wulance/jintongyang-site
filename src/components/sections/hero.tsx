import { cutoutImage, getCategory, itemCode, products } from "@/content";
import { stageLineup } from "@/content/lineup";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Puff } from "@/components/ui/puff";
import { HeroStage, type StageItem } from "./hero-stage";

/** First screen: the claim in stuffed letters across a dark stage, and the designs taking turns in front of it. */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const [first, second, third] = t.lines;
  const zh = locale === "zh";
  const gap = zh ? "" : " ";

  const items: StageItem[] = stageLineup.map((design) => {
    const product = products.find((p) => p.id === design.id)!;
    return {
      id: design.id,
      name: product.name[locale],
      code: itemCode(product),
      category: getCategory(product.category).name[locale],
      details: design.details.map((detail) => detail[locale]),
      href: routes.product(locale, product.slug),
      light: design.light,
      image: cutoutImage(design.id),
    };
  });

  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[calc(100svh-7.25rem)] flex-col pt-6 pb-8 md:pt-8 md:pb-10">
        <ul className="note shell relative z-20 flex flex-wrap justify-between gap-x-8 gap-y-1 text-ink/70">
          {t.meta.map((item, i) => (
            <li key={item} className={i === 1 ? "max-md:hidden" : ""}>
              {item}
            </li>
          ))}
        </ul>

        {/* The toy in the spotlight stands in front of the headline. */}
        <h1
          aria-label={t.lines.join(gap)}
          className={
            "display pointer-events-none relative mt-5 text-center md:mt-6 " +
            (zh
              ? "text-[clamp(3.5rem,21vw,7rem)] leading-[1.06] md:text-[min(11.5vw,24svh)]"
              : "text-[clamp(3.25rem,17vw,6.5rem)] leading-[0.86] md:text-[min(11vw,24svh)]")
          }
        >
          <Puff text={first + gap + second} />
          <br className="md:hidden" />
          <span className="max-md:hidden">{gap}</span>
          <em>
            <Puff text={third} start={first.length + second.length} />
          </em>
        </h1>

        <div className="relative z-10 -mt-[4vw] flex flex-1 flex-col md:-mt-[2vw]">
          <HeroStage items={items} labels={{ prev: t.prev, next: t.next, view: t.view, squeeze: t.drag }} />
        </div>

        <div className="shell relative z-20 mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <p className="max-w-md text-[1.0625rem] leading-snug font-medium text-ink/85 max-lg:order-last md:text-lg lg:max-w-[34rem]">{t.lead}</p>
          <div className="flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">
            <ButtonLink href={routes.contact(locale)} variant="primary" size="lg">
              {dict.cta.brief}
            </ButtonLink>
            <ButtonLink href={routes.products(locale)} variant="ink" size="lg" arrow={false}>
              {dict.cta.browse}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
