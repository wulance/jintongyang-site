import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { factoryImage, factoryPhotos } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

// Wide and narrow on the first row, thirds on the second.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

/** Five workshop photographs printed in one ink. Colour comes back under the cursor. */
export function FactoryPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.factory;
  return (
    <section className="shell py-20 md:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 className="display text-[clamp(2.5rem,6.4vw,6rem)]">{t.title}</h2>
        </div>
        <div className="flex max-w-sm flex-col items-start gap-6">
          <p className="text-lg leading-snug text-ink-soft">{t.lead}</p>
          <ButtonLink href={routes.factory(locale)} variant="ink">
            {t.link}
          </ButtonLink>
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-4 lg:grid-cols-12">
        {factoryPhotos.slice(0, 5).map((photo, i) => (
          <li key={photo.id} className={cn("reveal", i === 0 && "max-lg:col-span-2", spans[i])}>
            <figure>
              <div className={cn("duotone relative overflow-hidden rounded-card", i < 2 ? "aspect-[4/3] lg:aspect-auto lg:h-[26rem]" : "aspect-[4/3]")}>
                <Image src={factoryImage(photo.id).src} alt={photo.caption[locale]} fill sizes="(min-width: 1024px) 56vw, 92vw" className="object-cover" />
              </div>
              <figcaption className="note mt-3 flex gap-3 text-ink/70">
                <span className="text-persimmon">{String(i + 1).padStart(2, "0")}</span>
                {photo.caption[locale]}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
