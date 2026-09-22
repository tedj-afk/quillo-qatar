# Performance audit — 20 September 2026

## Results

Fresh production-build Lighthouse measurements (13.5.0, Chrome 153; MB means 1,000,000 bytes):

| Metric | Mobile before | Mobile after | Desktop before | Desktop after |
|---|---:|---:|---:|---:|
| Performance score | 71 | **94** | 74 | **100** |
| LCP | 5.55 s | **3.07 s** | 4.78 s | **0.75 s** |
| CLS | 0.0101 | **0** | 0.000038 | **0** |
| Total Blocking Time | 121 ms | **58 ms** | 8 ms | **0 ms** |
| Initial transferred size | 5.84 MB | **0.35 MB** | 5.84 MB | **0.38 MB** |
| Initial image transfer | 5.38 MB | **0.041 MB** | 5.38 MB | **0.073 MB** |
| Initial HTTP requests | 47 | **19** | 47 | **22** |

A separate full-scroll network capture includes deferred images and uses a 1440 × 1000 desktop viewport at DPR 1 and 390 × 844 mobile viewport at DPR 3:

| Metric | Desktop before → after | Mobile before → after |
|---|---:|---:|
| Full-scroll page transfer | 6.94 → **1.21 MB** | 6.94 → **1.66 MB** |
| Full-scroll image transfer | 6.48 → **0.90 MB** | 6.48 → **1.35 MB** |
| Full-scroll HTTP requests | 53 → **38** | 53 → **35** |
| Failed requests / console errors | 0 → **0** | 0 → **0** |

Data URLs make no HTTP requests and are excluded from request counts. Transfer numbers include response overhead; asset inventory sizes are exact file bytes. Different viewports and DPRs produce different responsive image choices. Full scrolls do not include every possible hidden carousel state or playing the video.

**Remaining target gap:** mobile simulated LCP is 3.07 seconds, above the 2.5-second good threshold. Client-side JavaScript and rendering on the throttled mobile profile remain areas for future improvement; the existing animation timings were preserved. Field INP and real mobile p75 LCP still need post-deployment observation. A Lighthouse score is not a field Core Web Vitals certification.

Build, TypeScript and the dedicated analytics behavior test pass. Browser checks exercise navigation, menus, services, FAQs, accordions, carousel/walkthrough controls and video playback with animations enabled. Geometry/copy/link/font/color comparisons cover the homepage at 320, 390, 768, 1440 and 1920 pixels and all seven case-study routes at 390 and 1440 pixels. Settled-state comparison excludes transient entrance transforms; image resampling may cause subpixel rounding. See [regression results](regression.json) and [interaction results](interactions.json).

Visual comparisons of the saved full-page desktop screenshots found differing pixels below 0.31% for the homepage and three expanded case studies at a 0.15 comparison threshold, including changed raster encoding and the live footer clock. These numbers support visual inspection; they do not establish mathematically lossless encoding of photographs.

[Mobile before](lighthouse/baseline-mobile-lighthouse.report.html) · [Mobile after](lighthouse/final-mobile-lighthouse.report.html) · [Desktop before](lighthouse/baseline-desktop-lighthouse.report.html) · [Desktop after](lighthouse/final-desktop-lighthouse.report.html)

## Largest assets before editing

| Original asset | Exact bytes | Dimensions / role |
|---|---:|---|
| `agero/hero-design-original.png` | 4,178,566 | 1994 × 1400; rendered at 82 × 64 on desktop and downloaded even when hidden on mobile |
| `helpmegrow/audience-conversations.png` | 4,035,241 | Case-study illustration |
| `helpmegrow/product-answer.png` | 2,956,225 | Case-study illustration |
| `helpmegrow/product-engage.png` | 2,241,836 | Case-study illustration |
| `helpmegrow/conversion-early-access.png` | 1,459,154 | Case-study illustration |
| `helpmegrow/product-understand.png` | 1,248,685 | Case-study illustration |
| `helpmegrow/hero.jpg` | 579,748 | 2880px original used in the homepage card and case study |
| `agero/texture.avif` | 532,779 | Decorative grain |
| Two unused embedded-raster SVG aliases | 5,571,887 each | Removed; neither was part of the active page network |

The 4.18 MB headline PNG now serves a 1,492-byte 82px WebP, 4,136-byte 164px WebP, or 6,888-byte 246px WebP. It makes no image request on mobile. All source/variant dimensions and byte counts are in [image-variants.json](image-variants.json). The untouched source inventory is in [assets-before.json](assets-before.json).

## Scope and measurement

Implementation is in this checkout; no live deployment was made. The baseline is a fresh production build of the original checkout, not the supplied third-party grade of C/79. Chrome/Lighthouse use their standard mobile and desktop simulated throttling. TBT is the lab responsiveness measurement; field INP requires real-user data after deployment.

Both builds were served from static exports by the same gzip-enabled local server. This models Vercel's compressed text delivery and immutable Next assets. Local previews intentionally suppress analytics traffic in both versions. The original eagerly bundled the analytics SDK; the optimized version loads it only on production hosts. Production analytics network overhead is therefore documented separately, not hidden in the local comparison.

The live canonical site, https://www.byhippo.design, was also inspected independently. A full desktop and mobile scroll completed with no HTTP errors, failed requests, or console errors. The original report's four failures were not reproduced and their URLs were not provided; their exact causes cannot be established from that report alone.

## Framework and hosting

- Next.js 16.3.4 installed, React 19, webpack production builds, `output: "export"` into `out/`.
- The original implementation used raw image elements with no responsive sources; Next's runtime image optimization is disabled because this is a static export.
- Live responses identify Vercel (`server`, `x-vercel-id`, `x-vercel-cache`). `.openai/hosting.json` is older static-host metadata and does not describe the current custom-domain host.
- Live HTML, JS, CSS and PostHog scripts already negotiate Brotli/gzip. Next's hashed assets already have a one-year immutable cache policy. Original unversioned images and local fonts had `max-age=0, must-revalidate`.
- `vercel.json` extends immutable caching to the new fingerprinted `/media/` and `/fonts/` assets. HTML continues to use Vercel's safe revalidation policy. No unsupported `_headers`, runtime Next headers, or precompressed raster files were added.

## Implementation

1. `scripts/optimize-images.mjs` generates responsive WebP/AVIF assets from 46 source images kept outside `public/`. The build runs it automatically. Source pixels, encoder settings and encoder versions participate in URL fingerprints. Efficient existing full-size AVIF/WebP files are retained when recompression would increase size. Alpha is preserved; the Hippo logo uses lossless WebP.
2. Responsive image props provide `srcset`, contextual `sizes`, intrinsic dimensions and asynchronous decoding. Below-fold rasters are lazy. The measured homepage LCP is the showcase banner; it remains eager/high priority and is the only image preloaded on the homepage. Desktop-only headline images select an inline transparent source on mobile and create no desktop image downloads there.
3. Large Why Hippo decorations wait until they are within 400px of the viewport. Native lazy loading alone was still fetching these hundreds of kilobytes on initial mobile load. Frames retain their existing fixed geometry; a no-JavaScript fallback is included.
4. Small SVG illustrations/icons keep their exact vector artwork as shared data URLs. This removes separate icon requests without changing the `img` elements, selectors or animation behavior.
5. Removed unused hashed aliases, duplicate embedded-raster SVGs, obsolete screenshots and unused global style rules. Retained all global resets, heading rules, responsive rules that affect the current pages, and reduced-motion behavior.
6. Removed the unused Stack Sans download. Kept the existing Cal Sans, Inter regular and Inter medium. WOFF2 subsets retain Latin-1, punctuation, currency symbols, arrows and ligatures with original glyph outlines, hinting and kerning. Only the two above-fold faces are preloaded. Source fonts and an optional refresh script are included.
7. PostHog is dynamically imported after `load`/idle, with the existing configuration retained. Early events retain timestamps, original URLs and a session-storage queue across same-tab navigation; navigation events still use beacon transport. The dedicated test verifies these behaviors. Local previews continue to log rather than sending production events.
8. Motion uses its smaller `m` components with synchronous `domAnimation` features. Unused drag and layout-animation features are omitted. All durations, delays, easing, scroll transforms, reveals, crossfades, interactions and reduced-motion settings remain unchanged.
9. Quillo's video fetches media when played rather than downloading metadata on initial render; its poster and controls remain. Its below-video screenshot is lazy.

## Changed files

- Page/image rendering: `app/page.tsx`, `app/components/{agero-chrome,case-study-view,helpmegrow-story,quillo-story,stackray-story,responsive-image,deferred-image}.tsx`, `lib/image-props.ts`.
- Style and font delivery: `app/{layout.tsx,globals.css,home.css,generated-media.css}`, `app/case-studies/stackray-story.css`, `lib/generated/fonts.json`, `assets/fonts/`, `assets/font-sources/`.
- Image sources/build outputs: `assets/images/`, `public/media/`, `public/fonts/`, `lib/generated/images.json`; removed superseded files under `public/{agero,helpmegrow,quillo,stackray}` and the original public logo.
- Build and hosting: `package.json`, `package-lock.json`, `vercel.json`, `scripts/optimize-images.mjs`, `scripts/subset-fonts.py`.
- Analytics: `instrumentation-client.ts`, `lib/analytics.ts`, `lib/analytics-client.ts`, `tests/analytics-client.test.mjs`.
- Reproducible audit scripts and evidence: `scripts/performance/`, `docs/performance/`.

The [complete changed-file inventory](changed-files.txt) includes every generated asset, moved original, deletion, and report.

## Deployment and remaining external costs

Deploy with the existing Vercel project's root directory pointing at this `site` repository, using `npm run build` and the existing Next static-export setup. The image prebuild step and `vercel.json` must be included. No new environment variables, services, image optimizer, paid integration or manual compression toggle are needed.

After deployment, verify a generated `/media/` and `/fonts/` URL returns `Cache-Control: public, max-age=31536000, immutable`; verify HTML still revalidates and JS/CSS/HTML negotiate `br` or `gzip` in an ordinary GET. Local verification cannot certify headers on an undeployed version.

Live PostHog configuration currently loads its configuration plus dead-click, web-vitals, survey and recorder modules (all returned 200 in the live audit). These add roughly 118 KB of compressed external JavaScript, plus the core SDK and telemetry. They remain controlled by the PostHog project and may be blocked by visitor privacy tools. They were preserved because disabling configured analytics/recordings/surveys would change integration behavior. Vercel edge latency and third-party latency are not reproducible from localhost.

## Reproduce

```sh
npm ci
npm run build
npm run lint
node tests/analytics-client.test.mjs
# Keep audit-only packages separate from application dependencies.
npm install --prefix /tmp/hippo-performance-tools lighthouse playwright
node scripts/performance/serve.mjs "$PWD/out" 4174
```

In another terminal, with Chrome installed:

```sh
/tmp/hippo-performance-tools/node_modules/.bin/lighthouse http://127.0.0.1:4174 \
  --chrome-flags='--headless=new' --only-categories=performance \
  --output=json --output=html --output-path=/tmp/hippo-mobile
# Add --preset=desktop for the desktop run.
PERF_TOOLS_DIR=/tmp/hippo-performance-tools node scripts/performance/capture.mjs http://127.0.0.1:4174 current
PERF_TOOLS_DIR=/tmp/hippo-performance-tools node scripts/performance/interactions.mjs
```

For geometry comparison, serve an untouched baseline export on port 4173 and the current export on 4174, then run `scripts/performance/regression.mjs` with the same `PERF_TOOLS_DIR`. `PERF_OUTPUT_DIR` overrides the evidence directory. The default is `/tmp/hippo-performance-evidence`. The full image inventory before edits is in `assets-before.json`; all generated dimensions, exact sizes and URLs are in `image-variants.json`.

Optional font regeneration requires `fonttools` and `brotli`: run `python scripts/subset-fonts.py` and then `npm run images:build`. Normal production builds use the checked-in font subsets and need no Python.

References: [Next static exports](https://nextjs.org/docs/app/guides/static-exports), [Vercel compression](https://vercel.com/docs/how-vercel-cdn-works/compression), [Vercel project configuration](https://vercel.com/docs/project-configuration), [Motion bundle sizing](https://motion.dev/docs/react-reduce-bundle-size), [Lighthouse scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).
