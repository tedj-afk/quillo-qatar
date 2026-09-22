# Case-study design QA — 2026-09-11

final result: passed

## Scope and reference
Refreshed the five existing case-study routes using https://agero.framer.website/works/archin and existing Hippo content. Preserved the homepage brand, logo, navigation, booking destination, pricing typography, and footer blur. Source measurements and intentional content adaptations are recorded in docs/case-study-reference.md.

## Evidence and comparison
Captured the source at 1440 × 900 and 390 × 844. Compared source and implementation screenshots together for the hero, mobile article, outcome panel, and desktop next-project card. Checked implementation at 900 × 1000 as well. Evidence is in /tmp/hippo-case-study-evidence and copied to docs/case-study-evidence.

Final implementation captures: stackray-desktop-top.png, stackray-desktop-story.png, stackray-desktop-next.png, stackray-mobile-top.png, stackray-mobile-creation.png, stackray-mobile-outcome.png, stackray-tablet-top.png.

## Iteration
- Replaced the Stackray hero backdrop with a neutral texture so another project's imagery does not show behind the actual Stackray website image.
- Matched the source's approximately 652px desktop hero frame and mobile intro spacing.
- Kept Cal Sans headings, Inter prose, rounded imagery, faded oversized outcome heading, entrance/reveal motion, and the three-column desktop next-project card with mobile stacking.
- The reference testimonial slot uses the existing founder takeaway; no client quotation or date was invented. Existing concept-project imagery remains consistent with the homepage pending the later content pass.

## Validation
- Production build and TypeScript validation passed; all five case-study routes exported.
- Browser: Stackray → Atlas Mode next-project link passed; case-study mobile Services → homepage #services passed with the section visible; footer Back to home passed.
- All five exported pages checked for working local assets, homepage section targets, next-project destinations, booking URL, and zero contact forms.
- Desktop, tablet, and mobile: no horizontal overflow. No broken loaded images or browser console errors observed on Stackray.
- Every booking link points to https://cal.com/shippedbyhippo/30min.
- Motion honors the existing reduced-motion preference. Existing delegated analytics covers case-study links and sections; live PostHog ingestion was outside this local design check.

No unresolved P0/P1/P2 visual or interaction defects were found in the reviewed scope. Content and project visuals can be refined in the next content pass.
