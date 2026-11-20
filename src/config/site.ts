export const siteConfig = {
  /** Sub-path the site is served from, e.g. "/jintongyang-site" on GitHub Pages. */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  /** Form endpoint that accepts a JSON POST (e.g. Formspree). Unset: the form validates but sends nothing. */
  inquiryEndpoint: process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT ?? "",
  /** Set NEXT_PUBLIC_SITE_URL once a domain is chosen. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Shows the "concept preview" bar. Turn off only after the factory has approved content and image rights. */
  showPreviewNotice: process.env.NEXT_PUBLIC_PREVIEW_NOTICE !== "off",
};
