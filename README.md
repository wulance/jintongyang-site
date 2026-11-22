# Jintongyang — B2B site proposal

Bilingual (English / 简体中文) inquiry site for Hebei Jintongyang Toys Co., Ltd., built as a proposal.
It is a catalogue and OEM/ODM inquiry site, not a shop: there is no cart or checkout.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Zod

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
npm run lint
npm run typecheck
npm run images     # rebuild public/images from assets/source
```

## Structure

```
assets/source/        original images archived from jintongyang.com (never edited)
scripts/              prepare-images.mjs: crops, removes size-chart stickers, upscales
                      cutouts.py: removes backdrops for the cut-out toys (public/images/cutouts)
                      subset-fonts.py: cuts the web fonts down to the characters in src/
src/app/[locale]/     pages: home, products, products/[slug], custom, factory, contact
src/components/       layout / sections / product / inquiry / ui
src/content/          typed data: company, categories, products, factory photos
src/fonts/            web fonts, subset (see below)
src/i18n/             locale config and the en / zh dictionaries
src/lib/              routes, inquiry schema, helpers
public/index.html     sends "/" to /en/ or /zh/ by browser language
.github/workflows/    builds and publishes to GitHub Pages on every push to main
```

To add a product: put the image in `assets/source/products/<id>.jpg`, add it to
`scripts/prepare-images.mjs`, run `npm run images`, then add an entry in `src/content/products.ts`.

## Design

The site is a white page with black type and hairline rules; the only colour is in the photographs
and the toys. The first screen says what the factory does in one sentence, next to a photograph of
the workshop it happens in, with a row of current styles underneath. Every page below it uses the
same parts: a serif headline, a short supporting sentence, ruled lists, square photographs with a
caption under them.

The workshop photographs are the ones on jintongyang.com. The hero photograph is set by `PHOTO` in
`src/components/sections/hero.tsx` and the four stages on the home page by `stages` in
`src/components/sections/factory-preview.tsx`; swap in originals from the factory there once they exist.

## Fonts

Headlines are set in Source Han Serif CN and everything else in Source Han Sans CN (both SIL OFL
1.1), for English as well as Chinese. The full fonts are 8 to 12 MB a weight, so `src/fonts/` holds
subsets with Latin plus only the Chinese characters used in `src/` (100 to 140 KB each). After
changing Chinese copy or product names, download `SourceHanSansCN-Regular.otf`,
`SourceHanSansCN-Medium.otf` and `SourceHanSerifCN-SemiBold.otf` from
https://github.com/adobe-fonts/source-han-sans/releases and
https://github.com/adobe-fonts/source-han-serif/releases and run
`python3 scripts/subset-fonts.py <folder with the .otf files>`. A character missing from the subset
falls back to the system font.

## Before this goes public

- **Image rights.** All photos come from jintongyang.com. Get written permission, including for
  the workshop photos that show staff.
- **Figures.** Staff, machine and output numbers in `src/content/company.ts` are the company's own
  statements and are unverified.
- **Catalogue.** 26 of the 43 items on the source site are included. The rest are left out because
  their only photo is a multi-product poster, shows a model, or resembles third-party characters.
  English product names are working translations.
- **Inquiry delivery.** The site is a static export, so the form posts JSON to
  `NEXT_PUBLIC_INQUIRY_ENDPOINT` (e.g. a Formspree form URL). It is unset, so the form validates
  and then says clearly that nothing was sent.
- **Logo.** `src/components/ui/logo.tsx` is a placeholder mark.
- **Preview bar and noindex.** Set `NEXT_PUBLIC_PREVIEW_NOTICE=off` and `NEXT_PUBLIC_SITE_URL` at launch.
