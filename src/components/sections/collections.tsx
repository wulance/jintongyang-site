import Image from "next/image";
import Link from "next/link";
import { categories, getByCategory, productImage } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function Collections({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.collections;
  return (
    <section className="shell py-24 md:py-32">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        action={
          <ButtonLink href={routes.products(locale)} variant="ghost">
            {dict.cta.all}
          </ButtonLink>
        }
      />
      <ul className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => {
          const image = productImage(category.cover);
          return (
            <li key={category.id} className="reveal">
              <Link href={routes.products(locale, category.id)} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sky">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.045]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="flex items-baseline gap-3">
                      <span className="text-xs font-semibold tracking-widest text-ink-soft">0{i + 1}</span>
                      <span className="display text-[1.75rem]">{category.name[locale]}</span>
                    </p>
                    <p className="mt-2 max-w-xs text-[0.9375rem] text-ink-soft">{category.blurb[locale]}</p>
                  </div>
                  <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                    <Arrow className="-rotate-45" />
                  </span>
                </div>
                <p className="sr-only">
                  {getByCategory(category.id).length} {t.count}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
