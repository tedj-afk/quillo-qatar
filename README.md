# Quillo Qatar

An independent, English-first product-studio website for startups and businesses in Qatar. This repository was imported from the Hippo working checkout on 22 September 2026. It has its own Git history and is maintained at [tedj-afk/quillo-qatar](https://github.com/tedj-afk/quillo-qatar). No hosted deployment is configured.

## Run locally

```sh
npm ci
npm run dev -- --port 4175
```

For the verified production-style static preview:

```sh
npm run build
npm run preview
```

The preview runs at http://127.0.0.1:4175. Stop a running preview before starting a development server on the same port.

On a nearly full disk, use `QUILLO_LOW_DISK=true npm run build` to disable webpack's disk cache. The initial local dependency installation uses independent macOS copy-on-write files of the exact locked versions; it does not link to Hippo. A fresh machine can use `npm ci` normally.

## Content and identity

- Homepage: `app/page.tsx`; shared header/footer: `app/components/agero-chrome.tsx`.
- Quillo styling: `app/quillo.css`. Warm paper, near-black, acid lime, Cal Sans and Inter.
- Offers: `data/services.ts`. Numeric amounts, QAR currency, and explicit project/month billing intervals.
- Process, FAQs, and testimonials: `data/`. Testimonial quotations remain unchanged and attributed to work under Hippo.
- Seven original case-study routes and their source assets remain available. The learning product called Quillo is explicitly distinguished from this studio.
- Brand artwork: `public/quillo-wordmark.svg`, `public/favicon.svg`, and `public/og.svg`. These contain the exact outlined local fonts. `npm run brand:build` regenerates PNG/ICO files without depending on system fonts. The optional Python vector-refresh script uses fonttools and brotli; normal builds do not require Python.
- Earlier Hippo design and performance documents remain as historical references, not Quillo measurements.

## Preview defaults

This version is a local review, not a public launch:

- Prices are visibly provisional: discovery QAR 5,000, scoped MVP QAR 25,000, and support QAR 2,500/month. A scoped MVP does not include every platform by default.
- The existing Cal.com calendar is retained temporarily. The inline calendar is loaded only when opened, and a direct booking link is available.
- No production domain is assumed. Metadata omits canonical URLs until a domain is configured.
- Search indexing and production analytics are disabled by default. Analytics events log locally to verify interactions and QAR amounts.
- Existing deployment bindings and environment secrets were excluded. The generic Vercel cache-header configuration is retained but does not attach a deployment.

## Later launch configuration

Copy `.env.example` to `.env.local` and set the new HTTPS origin in `NEXT_PUBLIC_SITE_URL`. Do not use a URL path. Supply a Quillo booking URL and a separate analytics project token if analytics is wanted.

After final prices, booking, content, and the domain have been reviewed, set `NEXT_PUBLIC_LAUNCH_READY=true` for indexing and sitemap generation. Analytics additionally requires `NEXT_PUBLIC_ANALYTICS_ENABLED=true`, a token, and the exact configured production hostname. Rebuild after environment changes.

The source is stored in a private GitHub repository. Connecting DNS and creating a hosted deployment remain separate launch steps; pushing source code does not publish the website.

## Checks

```sh
npm run lint
npm test
npm run build
npm run check:preview
```

The tests cover deferred analytics, early-event persistence, navigation transport, disabled preview behavior, domain validation, indexing/sitemap defaults, and QAR offer data. The static preview check verifies local links/assets and anchors across the homepage and every case study.
