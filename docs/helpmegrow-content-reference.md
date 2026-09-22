# HelpMeGrow case study

Source: `/Users/tedjouc1/Downloads/HelpMeGrow_Landing_Page_Case_Study.pdf` (12 pages), supplied on 2026-09-13.

The PDF supplies the narrative and product imagery. Its page geometry and navy document backgrounds are adapted to the existing Hippo site: AG Cal / AG Inter, gray and charcoal surfaces, orange accents, rounded panels, viewport reveals, and reduced-motion support. HelpMeGrow's navy and purple product palette stays inside its authentic interface images.

Implementation: `app/components/helpmegrow-story.tsx`, scoped by `app/case-studies/helpmegrow-story.css`. The existing case-study route and shell select this story for `/case-studies/helpmegrow`.

Sequence: opening, project, business challenge, audience reality, strategic angle, page journey, above the fold, features to outcomes, four product workflows, conversion, next iteration, outcome, booking outro, next project, shared footer.

The six next-iteration recommendations are published as future opportunities. They are not claims of completed integrations, testimonials, or a product animation. The early-access form is shown inside the product screenshot and described as part of the case study; this portfolio page uses the existing Hippo booking link. No performance metrics, customer quotes, project dates, or live HelpMeGrow URL were invented.

Images in `public/helpmegrow` are extracted from the PDF, preserving the embedded JPEGs without recompression. The source images are small (265-435 px wide), so product details are accompanied by readable HTML explanations. Higher-resolution originals can replace the same filenames later.

The homepage now features Stackray, HelpMeGrow, Atlas Mode, and Northstar Sync. Existing concept entries remain available. `projectVisuals` centralizes the image mapping so adding a project does not shift other projects' artwork. Stackray's next-project link now opens HelpMeGrow; HelpMeGrow continues to Atlas Mode. The static route, metadata, and sitemap include the new project.

## Validation

- Production build and TypeScript passed; 11 static pages generated.
- Viewed desktop layouts and responsive states at 1440, 768, 390, and 320 px. No page or case-study text overflow at these sizes.
- Corrected missing spaces at hidden mobile line breaks and fitted every chapter label inside the 320 px navigation pill.
- Verified all four workflow tabs, matching loaded images and panel copy, pointer navigation, ArrowRight, Home, and End. No automatic playback.
- Verified chapter links, homepage entry, Stackray -> HelpMeGrow -> Atlas Mode navigation, canonical metadata, and existing booking URLs.
- Reduced motion shows the heading and selected panel without entrance motion. No page runtime errors observed.
- Verified local analytics events for project navigation and workflow selection; production ingestion was not exercised.
- Evidence: `docs/helpmegrow-evidence`.

## Local preview

The original checkout contains offloaded dependencies and legacy assets. Validation used the same source and lockfile in `/tmp/hippo-helpmegrow-preview`, with dependencies installed there and available assets restored from the original template sources. The generated export was also copied to this checkout's ignored `out` folder. The retained preview runs at `http://127.0.0.1:3000/case-studies/helpmegrow`.

The existing Next font fallback warning for Stack Sans Headline remains; the case study uses the site's local AG fonts.

No public deployment was performed. The existing `.openai/hosting.json` resolves to an unrelated, unpublished AÉLLA GYM project, so it was preserved and not used to publish Hippo.
