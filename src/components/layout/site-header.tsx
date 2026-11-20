import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
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
        <p className="bg-ink px-5 py-2 text-center text-xs tracking-wide text-paper/80">{dict.preview}</p>
      )}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <Link href={routes.home(locale)} aria-label="Jintongyang" className="relative z-50">
            <Logo sub={locale === "zh" ? "金彤阳玩具" : "PLUSH MANUFACTURER"} />
          </Link>

          <nav className="hidden items-center gap-9 text-[0.9375rem] lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-soft hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <LocaleSwitcher current={locale} />
            <ButtonLink href={cta.href} variant="ink">
              {cta.label}
            </ButtonLink>
          </div>

          <MobileMenu locale={locale} links={links} cta={cta} labels={{ menu: dict.cta.menu, close: dict.cta.close }} />
        </div>
      </header>
    </>
  );
}
