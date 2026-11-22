import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, getByCategory, productImage } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";

/** The product lines as a ruled index: name, what is in it, how many styles, one photograph. */
export function CollectionIndex({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.collections;
  return (
    <section className="shell pb-20 md:pb-28">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <ul className="mt-10 border-b border-line md:mt-14">
        {categories.map((category, i) => (
          <li key={category.id}>
            <Link
              href={routes.products(locale, category.id)}
              className="group grid grid-cols-[1fr_5.5rem] items-center gap-x-5 border-t border-line py-4 md:grid-cols-[2.5rem_minmax(0,4fr)_minmax(0,5fr)_5rem_7rem_1.5rem] md:gap-x-8"
            >
              <span className="note max-md:hidden">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="display block text-[1.375rem] underline-offset-[6px] group-hover:underline md:text-[1.625rem]">{category.name[locale]}</span>
                <span className="note mt-1 block md:hidden">
                  {getByCategory(category.id).length} {t.count} · {category.blurb[locale]}
                </span>
              </span>
              <span className="text-[0.9375rem] leading-snug text-ink/75 max-md:hidden">{category.blurb[locale]}</span>
              <span className="note whitespace-nowrap max-md:hidden">
                {getByCategory(category.id).length} {t.count}
              </span>
              <span className="relative block aspect-[4/3] bg-paper-deep">
                <Image src={productImage(category.cover).src} alt="" fill sizes="112px" className="object-cover" />
              </span>
              <Arrow className="transition-transform duration-300 ease-soft group-hover:translate-x-1 max-md:hidden" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
