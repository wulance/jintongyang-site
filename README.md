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
                      subset-fonts.py: cuts the Chinese fonts down to the characters in src/
src/app/[locale]/     pages: home, products, products/[slug], custom, factory, contact
src/components/       layout / sections / product / inquiry / ui
src/content/          typed data: company, categories, products, factory photos
src/fonts/            Chinese web fonts, subset (see below)
src/i18n/             locale config and the en / zh dictionaries
src/lib/              routes, inquiry schema, helpers
public/index.html     sends "/" to /en/ or /zh/ by browser language
.github/workflows/    builds and publishes to GitHub Pages on every push to main
```

To add a product: put the image in `assets/source/products/<id>.jpg`, add it to
`scripts/prepare-images.mjs`, run `npm run images`, then add an entry in `src/content/products.ts`.

## Design

One idea runs through the site: soft things, made seriously. The soft half is the stuffed type and
the toys, which give when pressed. The serious half is the spec-sheet layer: pattern-paper grid,
monospaced annotations, running-stitch rules, call-out lines. The red disc is the sun in the
company name (彤阳).

Colour is paper, ink and persimmon, with butter and sky as the only supporting tones.

## Chinese fonts

Chinese text is set in Resource Han Rounded CN (SIL OFL 1.1). The full fonts are about 14 MB a
weight, so `src/fonts/` holds subsets with only the characters used in `src/` (about 85 KB each).
After changing Chinese copy or product names, download the fonts from
https://github.com/CyanoHao/Resource-Han-Rounded/releases and run
`python3 scripts/subset-fonts.py <folder with the .ttf files>`. A character missing from the subset
falls back to the system font.

## Story toys

The toys in the home page story (`public/images/story/`) are 3D renders, not photographs of factory
products: a lamb, a bear and a bunny modelled and lit in `scripts/render-toys.py`. To change them,
install Blender 4.2 and render each frame (about 10 minutes on 8 CPU cores, no GPU needed):

```
blender -b -P scripts/render-toys.py -- toy  renders/lamb-toy.png  1100 64 lamb
blender -b -P scripts/render-toys.py -- tag  renders/lamb-tag.png  1100 64 lamb
blender -b -P scripts/render-toys.py -- flat renders/lamb-flat.png 1100 80 lamb
blender -b -P scripts/render-toys.py -- toy  renders/bear-toy.png  1100 80 bear
blender -b -P scripts/render-toys.py -- toy  renders/bunny-toy.png 1100 80 bunny
python3 scripts/pack-toys.py renders    # needs Pillow and numpy
```

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
