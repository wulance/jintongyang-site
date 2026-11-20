"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { switchLocalePath } from "@/lib/routes";

export function LocaleSwitcher({ current, className }: { current: Locale; className?: string }) {
  const pathname = usePathname();
  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-30">/</span>}
          <Link
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "rounded-full px-1.5 py-1 transition-opacity",
              locale === current ? "font-semibold" : "opacity-50 hover:opacity-100",
            )}
          >
            {localeLabels[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
