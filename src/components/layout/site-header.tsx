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
      <header className="sticky top-2 z-30 px-2 pt-2 md:top-3 md:px-3 md:pt-3">
        <div className="mx-auto flex h-16 max-w-[85rem] items-center justify-between gap-6 rounded-full bg-paper/85 pr-2.5 pl-5 shadow-[0_14px_34px_-18px_rgb(27_21_18/0.45)] ring-1 ring-ink/10 backdrop-blur-xl md:pl-7">
          <Link href={routes.home(locale)} aria-label="Jintongyang" className="relative z-50">
            <Logo sub={locale === "zh" ? "金彤阳玩具" : "PLUSH MANUFACTURER"} />
          </Link>

          <nav className="hidden items-center gap-1 text-[0.9375rem] font-medium lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <LocaleSwitcher current={locale} />
            <ButtonLink href={cta.href} variant="primary">
              {cta.label}
            </ButtonLink>
          </div>

          <MobileMenu locale={locale} links={links} cta={cta} labels={{ menu: dict.cta.menu, close: dict.cta.close }} />
        </div>
      </header>
    </>
  );
}
