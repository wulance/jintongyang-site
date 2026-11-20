import { getFeatured } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ProductCard } from "@/components/product/product-card";

/** A showroom shelf: scrolls sideways and bleeds off the right edge. */
export function Featured({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.featured;
  return (
    <section className="overflow-hidden bg-sky/60 py-24 md:py-28">
      <div className="shell">
        <p className="eyebrow mb-5">{t.eyebrow}</p>
        <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)]">{t.title}</h2>
      </div>
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8 lg:scroll-px-[max(3rem,calc((100vw-85rem)/2+3rem))] lg:px-[max(3rem,calc((100vw-85rem)/2+3rem))]">
        {getFeatured().map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            sizes="(min-width: 1024px) 420px, 78vw"
            className="w-[78vw] shrink-0 snap-start sm:w-[24rem] lg:w-[26.25rem]"
          />
        ))}
      </div>
    </section>
  );
}
