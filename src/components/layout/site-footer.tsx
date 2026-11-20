import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { company, cutoutImage } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";

/** The footer is the closing statement: call to action, contact details, then the name as large as the page allows. */
export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const links = [
    { href: routes.products(locale), label: dict.nav.collections },
    { href: routes.custom(locale), label: dict.nav.custom },
    { href: routes.factory(locale), label: dict.nav.factory },
    { href: routes.contact(locale), label: dict.nav.contact },
  ];
  const penguin = cutoutImage(730);

  return (
    <footer className="mt-20 px-2 pb-2 md:mt-28 md:px-3 md:pb-3">
      <div
        className="relative overflow-hidden rounded-[2rem] bg-persimmon text-ink md:rounded-[2.75rem]"
        style={{ "--em": "var(--color-butter)" } as CSSProperties}
      >
        <div className="shell pt-16 md:pt-24">
          <h2 className="display text-[clamp(3.25rem,10.5vw,10.5rem)] text-paper">
            {t.statement[0]}
            <br />
            <em>{t.statement[1]}</em>
          </h2>
          <div className="mt-9 flex flex-col gap-6 md:mt-12 md:flex-row md:items-center md:gap-10">
            <ButtonLink href={routes.contact(locale)} variant="ink" size="lg">
              {dict.cta.brief}
            </ButtonLink>
            <p className="max-w-md text-lg leading-snug font-medium">{dict.closing.lead}</p>
          </div>

          <div className="mt-16 grid gap-10 border-t border-ink/20 pt-10 sm:grid-cols-2 md:mt-24 md:grid-cols-12">
            <p className="max-w-xs font-medium md:col-span-4">{t.blurb}</p>
            <div className="md:col-span-2">
              <p className="eyebrow mb-4 !text-ink/60">{t.explore}</p>
              <ul className="space-y-2.5 font-medium">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="underline-offset-4 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <p className="eyebrow mb-4 !text-ink/60">{t.contact}</p>
              <ul className="space-y-2.5 font-medium">
                <li>{company.contact.person[locale]}</li>
                <li>
                  <a href={company.contact.phoneHref} className="underline-offset-4 hover:underline">
                    {company.contact.phoneDisplay}
                  </a>
                </li>
                <li className="text-ink/75">{company.contact.address[locale]}</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="eyebrow mb-4 !text-ink/60">{t.brands}</p>
              <ul className="space-y-2.5 font-medium">
                {company.brands[locale].map((brand) => (
                  <li key={brand}>{brand}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 text-xs text-ink/70 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {company.legalName[locale]} {t.rights}
            </p>
            <p>{t.disclaimer}</p>
          </div>
        </div>

        <div aria-hidden className="relative mt-10 select-none md:mt-4">
          <Image
            src={penguin.src}
            width={penguin.width}
            height={penguin.height}
            alt=""
            className="absolute right-[9%] bottom-[46%] h-auto w-[19vw] max-w-64 md:right-[11%]"
          />
          <p lang="en" className="display relative translate-y-[14%] text-center text-[19.2vw] leading-[0.74] whitespace-nowrap text-paper">
            Jintongyang
          </p>
        </div>
      </div>
    </footer>
  );
}
