import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { company } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: routes.products(locale), label: dict.nav.collections },
    { href: routes.custom(locale), label: dict.nav.custom },
    { href: routes.factory(locale), label: dict.nav.factory },
    { href: routes.contact(locale), label: dict.nav.contact },
  ];
  const cta = { href: routes.contact(locale), label: dict.cta.brief };

  return (
    <>
      {siteConfig.showPreviewNotice && (
        <p className="bg-ink px-5 py-1.5 text-center text-xs leading-relaxed text-paper">{dict.preview}</p>
      )}
      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link href={routes.home(locale)} className="relative z-50">
            <Logo name={company.shortName[locale]} />
          </Link>

          <div className="hidden items-center gap-8 text-sm lg:flex">
            <nav className="flex items-center gap-8">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="underline-offset-[6px] hover:underline">
                  {link.label}
                </Link>
              ))}
            </nav>
            <LocaleSwitcher current={locale} />
            <ButtonLink href={cta.href} arrow={false}>
              {cta.label}
            </ButtonLink>
          </div>

          <MobileMenu locale={locale} links={links} cta={cta} labels={{ menu: dict.cta.menu, close: dict.cta.close }} />
        </div>
      </header>
    </>
  );
}
