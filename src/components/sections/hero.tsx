import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { company, cutoutImage, factoryImage, factoryPhotos, products } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/** The workshop photograph beside the statement. Replace with an original from the factory when one arrives. */
const PHOTO = 748;

/** Current styles under the statement: product id and the height it is shown at, in px, so the toys keep their relative sizes. */
const lineup: [id: number, height: number][] = [
  [708, 104],
  [730, 100],
  [719, 116],
  [720, 108],
  [717, 104],
  [707, 104],
  [731, 78],
  [718, 98],
];

/** First screen: what the factory does in one sentence, the workshop it happens in, and what comes out of it. */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const zh = locale === "zh";
  const count = String(products.length);
  const photo = factoryPhotos.find((p) => p.id === PHOTO)!;

  return (
    <section className="shell flex flex-col pt-7 lg:min-h-[min(calc(100svh-6rem),52rem)] lg:pt-11">
      <div className="grid flex-1 gap-x-14 gap-y-6 lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-6 lg:pb-9">
          <div>
            <p className="eyebrow">
              {company.legalName[locale]} · {t.label}
            </p>
            <h1
              className={cn(
                "display mt-3 lg:mt-5",
                zh ? "text-[clamp(2.125rem,4.15vw,3.75rem)]" : "text-[clamp(1.75rem,2.9vw,2.625rem)] max-sm:text-balance max-sm:whitespace-normal max-lg:sm:text-[2.25rem]",
              )}
            >
              {t.title}
            </h1>
          </div>
          <div>
            <p className="mb-7 max-w-[28rem] text-ink/80 max-lg:hidden">{t.lead}</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <ButtonLink href={routes.contact(locale)} size="lg">
                {dict.cta.brief}
              </ButtonLink>
              <Link href={routes.products(locale)} className="textlink text-[0.9375rem]">
                {t.seeAll.replace("{count}", count)}
              </Link>
            </div>
          </div>
        </div>

        <figure className="flex flex-col pb-5 lg:pb-9">
          <div className="relative aspect-[6/5] flex-1 bg-paper-deep sm:aspect-[16/10] lg:aspect-auto lg:min-h-80">
            <Image
              src={factoryImage(PHOTO).src}
              alt={photo.caption[locale]}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <figcaption className="note flex justify-between gap-4 pt-2.5 !text-xs">
            <span>{photo.caption[locale]}</span>
            <span>{t.photoCredit}</span>
          </figcaption>
        </figure>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-line pt-4 pb-4 lg:pt-[1.125rem]">
        <p className="w-40 shrink-0 self-center text-[0.8125rem] leading-relaxed max-lg:hidden">
          <span className="block text-[0.9375rem] font-bold">{t.stylesTitle.replace("{count}", count)}</span>
          {t.stylesNote}
        </p>
        {lineup.map(([id, height], i) => {
          const product = products.find((p) => p.id === id)!;
          const image = cutoutImage(id);
          return (
            <Link
              key={id}
              href={routes.product(locale, product.slug)}
              aria-label={product.name[locale]}
              style={{ "--h": height + "px" } as CSSProperties}
              className={cn("group flex flex-col items-center gap-2", i > 3 && "max-sm:hidden", i > 5 && "max-lg:hidden")}
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt=""
                sizes="160px"
                className="h-[calc(var(--h)*0.82)] w-auto transition-transform duration-500 ease-soft group-hover:-translate-y-1 lg:h-(--h)"
              />
              <span className="note !text-[0.71875rem] whitespace-nowrap group-hover:text-ink">No. {id}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
