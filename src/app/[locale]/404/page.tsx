import type { Metadata } from "next";
import NotFound from "../not-found";

export const metadata: Metadata = { title: "404", robots: { index: false } };

/** Exported as /en/404/ and copied to /404.html after the build, which is what static hosts serve for unknown URLs. */
export default NotFound;
