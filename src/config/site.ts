export const siteConfig = {
  /** Set NEXT_PUBLIC_SITE_URL once a domain is chosen. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Shows the "concept preview" bar. Turn off only after the factory has approved content and image rights. */
  showPreviewNotice: process.env.NEXT_PUBLIC_PREVIEW_NOTICE !== "off",
};
