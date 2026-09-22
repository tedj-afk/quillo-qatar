# Quillo Qatar preview verification

Verified 22 September 2026. Local production export served on port 4175.

## Build and automated checks

- TypeScript: `npm run lint` passed.
- Analytics and preview configuration: `npm test` passed.
- Static production build: `QUILLO_LOW_DISK=true npm run build` passed.
- Eight exported content pages (homepage plus seven case studies): `npm run check:preview` passed for local links, image/script assets, anchors, noindex metadata, and absence of the old canonical domain.
- `git diff --check` passed.
- Every locked dependency version matches the original project.

## Browser checks

- In-app browser: 320 × 740, 390 × 844, 820 × 1180, and 1440 × 1000.
- No horizontal document overflow or out-of-viewport text at those widths.
- Visually inspected the desktop opening, work, and pricing; mobile opening and pricing; tablet process; and mobile Quillo case-study opening.
- Mobile menu opens, closes after navigation, and closes with Escape while returning focus to its button.
- Service details and FAQs expand correctly. The app-store answer explains approval timing accurately.
- Calendar loads on demand, shows available dates/times, and has a direct-link fallback. It is explicitly identified as the temporary Hippo calendar. No appointment was submitted.
- Observed pricing analytics events contain numeric amounts, `currency: QAR`, and the appropriate billing interval, logged only as local preview events.
- No external analytics script before the calendar is opened; no application warnings or errors in the observed browser console.
- Preview has `noindex, nofollow` and no canonical URL.
- Quillo learning-product case study clearly distinguishes the product from the studio.

## Accessibility and assets

- Core foreground/background contrast: body 15.75:1, muted copy 5.13:1, dark-section copy 10.06:1, and lime callouts 15.14:1.
- Keyboard focus styles, semantic headings, native disclosure controls, and a skip link are present.
- Reduced-motion support was checked in CSS and MotionConfig; browser OS preference emulation was unavailable in this session.
- Favicons and social artwork use exact outlines from the local Cal Sans/Inter fonts, avoiding system-font substitution.
- Fixed five inherited full-size image links in the Quillo case study to use generated image URLs.

## Independence and launch boundary

- All 524 tracked original Hippo files match their pre-copy SHA-256 checksums; original Git status remains clean.
- Quillo has its own `.git` directory, no remote, no copied environment secrets, and no old hosting-project binding.
- Complete source, assets, case studies, and supporting documentation were retained. Historical reports are not presented as new Quillo measurements.
- Pricing remains provisional, the calendar is temporary, and no website deployment or domain change was performed.
