import { getFeatured } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { ProductCard } from "@/components/product/product-card";
import { ButtonLink } from "@/components/ui/button";

/** A showroom shelf: scrolls sideways and bleeds off the right edge. */
export function Featured({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.featured;
  return (
    <section className="overflow-hidden pb-20 md:pb-28">
      <div className="shell flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)]">{t.title}</h2>
        </div>
        <ButtonLink href={routes.products(locale)} variant="ghost" className="max-sm:hidden">
          {dict.cta.all}
        </ButtonLink>
      </div>
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pt-2 pb-3 sm:scroll-px-8 sm:px-8 lg:scroll-px-[max(3rem,calc((100vw-85rem)/2+3rem))] lg:px-[max(3rem,calc((100vw-85rem)/2+3rem))]">
        {getFeatured().map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            sizes="(min-width: 1024px) 380px, 76vw"
            className="h-auto w-[76vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]"
          />
        ))}
      </div>
    </section>
  );
}
