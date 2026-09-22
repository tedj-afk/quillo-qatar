# Quillo case study

## Content and visual sources

The user-supplied Quillo_Case_Study.pdf and accompanying case-study blueprint are the editorial references. The case study follows the existing Stackray and HelpMeGrow pattern: Hippo header/footer, a project opening, numbered editorial sections, chapter navigation, landing-page evidence, qualitative outcomes, a founder takeaway, and the next project.

The story covers the product, communication challenge, strategic insight, positioning, message hierarchy, opening promise, learning loop, credibility, visual direction, objection handling, conversion, and outcome. It is registered at /case-studies/quillo, included as the third Selected shipments card, and linked from HelpMeGrow. Quillo links onward to Stackray.

The visual source is the user-supplied `landing page 2.pdf` (one 660 × 7983.1196 pt page). It is rendered at 216 dpi (1980 × 23950 pixels), then cropped into nine `landing-*.webp` assets in `public/quillo`. The crops retain each landing-page section's headings, copy, spacing, and framed visuals. They are rendered page sections, not extracted standalone product screenshots. The homepage and next-project card use the opening navigation, headline, copy, and CTAs. The FAQ now shows the actual expanded answer from this design, replacing the explanatory product diagram.

Crop bounds below are full-width pixel ranges from the rendered page, with an inclusive top and exclusive bottom:

| Asset | Top | Bottom |
| --- | ---: | ---: |
| landing-hero | 0 | 3024 |
| landing-preview | 0 | 1404 |
| landing-problem | 3024 | 4678 |
| landing-how-it-works | 4678 | 8314 |
| landing-rigor | 8314 | 11027 |
| landing-differentiation | 11027 | 12823 |
| landing-why-now | 12823 | 14085 |
| landing-faq | 19775 | 21802 |
| landing-conversion | 21802 | 22835 |

The source's unfinished use-case and testimonial placeholders are outside these crops. No claims are inferred from them. The color/typography board illustrates the landing-page visual direction; it is not an exported specification.

The separately supplied `The_30_Seconds_-_16x9_master.mp4` remains the platform introduction before the case-study visuals. `explainer.mp4` is a web-optimized 30-second 1280 × 720 H.264 copy at 30 fps (1,382,370 bytes), with fast-start playback enabled. The supplied 1920 × 1080 master remains unchanged locally. `explainer-poster.webp` is the original opening frame. The player uses native controls and does not autoplay.

Unconfirmed timeline, exact personal role, live URL, performance numbers, customer testimonials, and mobile product screens are omitted. Outcomes describe the design and communication work, not measured business impact. Full-size image links let readers inspect the landing-page layouts, including on smaller screens.

## Validation

- TypeScript check and production static export passed.
- Quillo's route, title, single main heading, asset paths, and sitemap entry checked.
- Homepage links, chapter anchors, landing-page tabs, arrow/Home keyboard navigation, and full-size image links checked.
- Layouts checked at 320, 390, 768, and 1440 pixels without page-level horizontal overflow.
- Stackray and HelpMeGrow routes remain working; navigation follows Stackray -> HelpMeGrow -> Quillo -> Stackray.
- Browser runtime errors: none observed.

## Workspace recovery

The Documents checkout contained iCloud-only placeholders that did not hydrate. Implementation and validation used a fresh checkout of the same GitHub repository at 4151b2c, whose tracked file sizes matched the existing workspace before editing. The changed files and new assets were then copied into the original workspace. Each replaced original is preserved under .design-backup-icloud-20260915-quillo. No original Git index or history was replaced. The retained local development preview runs from /Users/tedjouc1/.codex/tmp/hippo-quillo.

The existing .openai/hosting.json points to an unrelated AELLA GYM project with no live publication. It was not used to publish Hippo, and its configuration was preserved.
