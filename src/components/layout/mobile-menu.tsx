"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import { buttonClass } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";

interface Props {
  locale: Locale;
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
  labels: { menu: string; close: string };
}

export function MobileMenu({ locale, links, cta, labels }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-50 -mr-2 flex h-11 items-center gap-2.5 px-2 text-sm font-medium"
      >
        {open ? labels.close : labels.menu}
        <span className="relative block h-2.5 w-4" aria-hidden>
          <span
            className={
              "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 " +
              (open ? "translate-y-[5px] rotate-45" : "")
            }
          />
          <span
            className={
              "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 " +
              (open ? "-translate-y-[4px] -rotate-45" : "")
            }
          />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-menu"
            className="fixed inset-0 z-20 flex flex-col overflow-y-auto bg-paper px-5 pt-32 pb-8 sm:px-8 lg:hidden"
          >
            <nav className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="display border-b border-line py-5 text-[2rem]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex items-center justify-between">
              <LocaleSwitcher current={locale} className="text-base" />
              <Link href={cta.href} className={buttonClass("ink", "lg")}>
                {cta.label}
              </Link>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
