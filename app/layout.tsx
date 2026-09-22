import type { Metadata } from "next";
import fonts from "@/lib/generated/fonts.json";
import type { ReactNode } from "react";
import "./globals.css";
import "./generated-media.css";
import "./quillo.css";
import "./motion.css";
import "./hero-entrance.css";
import { SiteAnalytics } from "./components/site-analytics";
import { siteUrl, siteName, siteDescription, isPublicSite } from "@/lib/site";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: "Quillo Qatar | Product Design Studio for Qatar",
  description: siteDescription,
  openGraph: {
    title: siteName, description: siteDescription, siteName, type: "website", locale: "en_QA",
    ...(siteUrl ? { url: siteUrl, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Quillo Qatar — Stop guessing what to build next." }] } : {}),
  },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription, ...(siteUrl ? { images: ["/og.png"] } : {}) },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }], shortcut: "/favicon.ico" },
  robots: { index: isPublicSite, follow: isPublicSite },
};
const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", name: siteName, description: siteDescription, ...(siteUrl ? { url: siteUrl } : {}), areaServed: { "@type": "Country", name: "Qatar" } };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><head>
    <link rel="preload" href={fonts["cal-sans"]} as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="preload" href={fonts["inter-regular"]} as="font" type="font/woff2" crossOrigin="anonymous" />
  </head><body>
    <noscript><style>{".ag-deferred-image{display:none!important}"}</style></noscript>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    {children}<SiteAnalytics />
  </body></html>;
}
