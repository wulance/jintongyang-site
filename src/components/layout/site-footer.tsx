import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { company } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";

/** The page ends the way it starts: one sentence, one button, then the contact details. */
export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const links = [
    { href: routes.products(locale), label: dict.nav.collections },
    { href: routes.custom(locale), label: dict.nav.custom },
    { href: routes.factory(locale), label: dict.nav.factory },
    { href: routes.contact(locale), label: dict.nav.contact },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="shell pt-16 pb-10 md:pt-24">
        <div className="grid gap-x-14 gap-y-7 lg:grid-cols-2">
          <h2 className="display text-[clamp(1.875rem,3.6vw,3rem)]">{dict.closing.title}</h2>
          <div className="flex max-w-[30rem] flex-col items-start gap-7 lg:pt-3">
            <p className="text-paper/80">{dict.closing.lead}</p>
            <ButtonLink href={routes.contact(locale)} variant="paper" size="lg">
              {dict.cta.brief}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-10 border-t border-paper/20 pt-10 text-[0.9375rem] sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          <div>
            <p className="font-medium">{company.legalName[locale]}</p>
            <p className="mt-2 max-w-xs text-paper/65">{t.blurb}</p>
          </div>
          <div>
            <p className="mb-3 text-[0.8125rem] text-paper/55">{t.explore}</p>
            <ul className="space-y-1.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline-offset-4 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[0.8125rem] text-paper/55">{t.contact}</p>
            <ul className="space-y-1.5">
              <li>{company.contact.person[locale]}</li>
              <li>
                <a href={company.contact.phoneHref} className="underline-offset-4 hover:underline">
                  {company.contact.phoneDisplay}
                </a>
              </li>
              <li className="text-paper/65">{company.contact.address[locale]}</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[0.8125rem] text-paper/55">{t.brands}</p>
            <ul className="space-y-1.5">
              {company.brands[locale].map((brand) => (
                <li key={brand}>{brand}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-1.5 text-xs text-paper/55 md:flex-row md:justify-between md:gap-10">
          <p>
            © {new Date().getFullYear()} {company.legalName[locale]} {t.rights}
          </p>
          <p>{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
