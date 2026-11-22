import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#ffffff" };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.title, template: "%s — Jintongyang" },
    description: dict.meta.description,
    alternates: { languages: Object.fromEntries(locales.map((l) => [htmlLang[l], "/" + l])) },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      images: [siteConfig.basePath + "/images/products/708.jpg"],
      locale: htmlLang[locale],
      type: "website",
    },
    // Keep the proposal out of search results until it is approved for launch.
    robots: siteConfig.showPreviewNotice ? { index: false, follow: false } : undefined,
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
