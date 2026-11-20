import Link from "next/link";
import { company } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { Logo } from "@/components/ui/logo";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: routes.products(locale), label: dict.nav.collections },
    { href: routes.custom(locale), label: dict.nav.custom },
    { href: routes.factory(locale), label: dict.nav.factory },
    { href: routes.contact(locale), label: dict.nav.contact },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="shell grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="text-paper" />
          <p className="mt-6 max-w-sm text-paper/60">{dict.footer.blurb}</p>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-5 text-paper/50">{dict.footer.explore}</p>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-paper/80 transition-colors hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow mb-5 text-paper/50">{dict.footer.contact}</p>
          <ul className="space-y-3 text-paper/80">
            <li>{company.contact.person[locale]}</li>
            <li>
              <a href={company.contact.phoneHref} className="transition-colors hover:text-paper">
                {company.contact.phoneDisplay}
              </a>
            </li>
            <li className="text-paper/60">{company.contact.address[locale]}</li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-5 text-paper/50">{dict.footer.brands}</p>
          <ul className="space-y-3 text-paper/80">
            {company.brands[locale].map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName[locale]} {dict.footer.rights}
          </p>
          <p>{dict.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
