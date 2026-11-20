import Image from "next/image";
import { productImage } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";

export function Closing({ locale, dict, product }: { locale: Locale; dict: Dictionary; product?: string }) {
  const t = dict.closing;
  return (
    <section className="shell pb-24 md:pb-32">
      <div className="grid overflow-hidden rounded-[2.25rem] bg-sky lg:grid-cols-12">
        <div className="px-6 py-14 md:px-14 md:py-20 lg:col-span-7">
          <h2 className="display text-[clamp(2.5rem,5.5vw,4.75rem)]">{t.title}</h2>
          <p className="mt-6 max-w-lg text-lg text-ink/70">{t.lead}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {t.checklist.map((item) => (
              <li key={item} className="rounded-full bg-paper/70 px-4 py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={routes.contact(locale, product)} variant="primary" size="lg" className="mt-10">
            {dict.cta.brief}
          </ButtonLink>
        </div>
        <div className="relative min-h-72 lg:col-span-5">
          <Image
            src={productImage(719).src}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="object-cover object-[60%_50%]"
          />
        </div>
      </div>
    </section>
  );
}
