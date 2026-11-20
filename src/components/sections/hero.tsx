import Image from "next/image";
import Link from "next/link";
import { getProduct, itemCode, productImage } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";

function Tile({ slug, locale, sizes, priority }: { slug: string; locale: Locale; sizes: string; priority?: boolean }) {
  const product = getProduct(slug)!;
  const image = productImage(product.images[0]);
  return (
    <Link href={routes.product(locale, product.slug)} className="group relative block size-full overflow-hidden rounded-card bg-sky">
      <Image
        src={image.src}
        alt={product.name[locale]}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
      />
      <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-paper/90 py-1.5 pr-4 pl-3 text-xs font-medium backdrop-blur">
        <span className="size-1.5 rounded-full bg-persimmon" />
        {product.name[locale]}
        <span className="text-ink-soft max-sm:hidden">{itemCode(product)}</span>
      </span>
    </Link>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute -top-14 -left-4 z-10 hidden size-32 md:block lg:-top-16 lg:-left-8 lg:size-36">
      <svg viewBox="0 0 120 120" className="size-full animate-spin-slow">
        <circle cx="60" cy="60" r="60" className="fill-butter" />
        <defs>
          <path id="badge-arc" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" />
        </defs>
        <text className="fill-ink text-[10.5px] font-semibold tracking-[0.19em] uppercase">
          <textPath href="#badge-arc" textLength="266">
            {text}
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 32 32" className="absolute inset-0 m-auto size-11 text-ink">
        <circle cx="8.5" cy="9" r="5" fill="currentColor" />
        <circle cx="23.5" cy="9" r="5" fill="currentColor" />
        <circle cx="16" cy="18" r="11" fill="currentColor" />
        <circle cx="16" cy="20.5" r="1.9" className="fill-persimmon" />
      </svg>
    </div>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;
  return (
    <section className="shell pt-12 pb-16 md:pt-20 md:pb-24">
      <p className="eyebrow mb-7">{t.eyebrow}</p>
      <h1 className="display text-[clamp(2.875rem,8.2vw,7.75rem)]">
        {t.titleA}
        <br />
        {t.titleB} <em>{t.titleEm}</em>
      </h1>

      <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">{t.lead}</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contact(locale)} variant="primary" size="lg">
            {dict.cta.brief}
          </ButtonLink>
          <ButtonLink href={routes.products(locale)} variant="ghost" size="lg" arrow={false}>
            {dict.cta.browse}
          </ButtonLink>
        </div>
      </div>

      <div className="relative mt-16 grid gap-4 md:mt-20 lg:grid-cols-12">
        <Badge text={t.badge} />
        <div className="aspect-[4/3] lg:col-span-7">
          <Tile slug="persimmon-lamb" locale={locale} sizes="(min-width: 1024px) 56vw, 92vw" priority />
        </div>
        <div className="grid gap-4 lg:col-span-5 lg:grid-rows-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex aspect-square flex-col justify-between rounded-card bg-persimmon p-6 text-white lg:aspect-auto">
              <p className="text-sm font-medium text-white/80">{t.tileLabel}</p>
              <p>
                <span className="display block text-[clamp(3rem,6vw,5.5rem)] leading-none whitespace-nowrap">{t.tileValue}</span>
                <span className="mt-2 block text-sm text-white/80">{t.tileUnit}*</span>
              </p>
            </div>
            <div className="aspect-square lg:aspect-auto">
              <Tile slug="birthday-monkey" locale={locale} sizes="(min-width: 1024px) 20vw, 46vw" />
            </div>
          </div>
          <div className="aspect-[2/1] lg:aspect-auto">
            <Tile slug="cloud-cushion" locale={locale} sizes="(min-width: 1024px) 40vw, 92vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
