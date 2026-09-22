import type { Metadata } from "next";
import fonts from "@/lib/generated/fonts.json";
import type { ReactNode } from "react";
import "./globals.css";
import "./generated-media.css";
import { SiteAnalytics } from "./components/site-analytics";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shipped by Hippo | Landing pages built to make your product obvious",
  description:
    "Shipped by Hippo builds strategy-led SaaS landing pages and website refreshes with positioning, copy, design, and launch-ready build in one focused sprint.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shipped by Hippo",
    description: "Landing pages built to make your product the obvious choice.",
    url: siteUrl,
    siteName: "Shipped by Hippo",
    type: "website",
    images: [{ url: "/og.png", width: 2400, height: 1260, type: "image/png", alt: "Shipped by Hippo — Great products deserve to be obvious." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipped by Hippo",
    description: "Landing pages built to make your product the obvious choice.",
    images: [{ url: "/og.png", alt: "Shipped by Hippo — Great products deserve to be obvious." }],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Shipped by Hippo",
      url: siteUrl,
      description: "Strategy-led landing page and website refresh sprints for SaaS and AI companies.",
      areaServed: "Worldwide",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href={fonts["cal-sans"]} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={fonts["inter-regular"]} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <noscript><style>{".ag-deferred-image{display:none!important}"}</style></noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
