# Stackray full case-study QA — 2026-09-11

final result: passed

## Source and comparison
Blueprint: /Users/tedjouc1/Downloads/Stackray_Case_Study_Hippo.pdf (14 pages, 960 × 540 PDF points, rendered at 1600 × 900 pixels).
Copy: /Users/tedjouc1/.codex/attachments/ee9411b9-f97c-4157-8096-a6acffd09118/pasted-text.txt.
Implementation: http://127.0.0.1:3000/case-studies/stackray.
Evidence folder: docs/stackray-content-evidence.

The PDF provides structure; the user explicitly requested the current Hippo design system. Its fixed slide geometry and type are intentionally adapted to Cal Sans / Inter, gray / charcoal / white / orange, rounded panels, and responsive web sections.

Opened PDF page 2 with desktop-snapshot.png, page 5 with desktop-evidence.png, and page 7 with desktop-messaging.png together in comparison inputs. Compared corresponding content regions, accounting for the fixed slide versus scrolling page; no claim of identical slide geometry. Desktop captures are 1440 × 1000 CSS/image pixels, 1:1 density. Mobile has no supplied source layout: responsive checks use 390 × 844 and 320 × 740. Native receipt crop separately inspected for readable, correct evidence.

## Iterations and resolved findings
- P1: Shared homepage resets flattened spacing and made chapter text dark on dark. Scoped selectors and corrected import order. Rechecked actual color and heading margins. Final desktop-snapshot.png shows the fix.
- P1: Clipped browser capture returned incorrect regions. Saved verified full viewport captures, cropped them, and replaced receipt/evidence/security/waitlist assets. Final desktop-evidence.png and mobile-experience.png show correct imagery.
- P2: Mobile story preview was too far below its selected step. It now opens inline directly beneath that step; mobile-architecture.png records the working state.
- P2: Chapter links exceeded the pill at 320px. Reduced narrow-screen padding; final bar spans x20.34–299.65 and page scroll width is 320px. Evidence: mobile-narrow.png.
- P2: White directional arrows lacked contrast on light surfaces. Dark filtering now applies there, retaining white on dark panels; verified computed filter and rendered layout.

No unresolved P0/P1/P2 issue remains.

## Required fidelity surfaces
- Typography: existing AG Cal display and AG Inter body fonts; hierarchy and wrapping remain inside tested widths.
- Spacing/layout: blueprint sequence retained, two-column snapshot/evidence, three messaging cards, dark strategy/trust/delivery chapters, mobile stacking, and sticky chapter navigation.
- Colors/tokens: Hippo palette used for the case-study shell; Stackray product palette is limited to the visual-direction swatches and real screenshots.
- Images: authentic Stackray captures with preserved aspect ratios and readable HTML captions. No broken loaded images. Small screenshot UI is supported by a live-site link.
- Copy: all 14 story sections represented. Removed editorial asset instructions, kept future cancellation explicitly future-facing, omitted the unconfirmed 31% placeholder, and separated future measurements from outcomes.

## Validation
- Next production build and TypeScript passed; all 10 static routes exported, including all five case-study routes. Existing Stack Sans Headline fallback warning did not block compilation.
- Final CSS-only narrow navigation and arrow-color refinements applied to source and the successful static export, then verified in-browser.
- Walkthrough clicks, ArrowRight keyboard navigation, automatic progression, and stop at final slide verified.
- Desktop story selection updates preview; mobile selection opens the matching inline preview.
- Overview, Strategy, Experience, Outcome chapter clicks work; all chapter targets exist.
- Next Project navigates to Atlas Mode; other case studies retain the generic design.
- All Book a call links retain https://cal.com/shippedbyhippo/30min; zero contact forms.
- No console warnings/errors observed during final mobile review.
- No page overflow at 1440px, 390px, or 320px.
- Existing reduced-motion handling retained. Playback requires a user click.
- PostHog events for new interactions are typed and documented. Live ingestion not tested.

## Open item
No video was supplied; the hero uses a clearly labeled interactive screenshot walkthrough. It can be replaced when a recording is available.

## Local environment
Preview serves /tmp/hippo-agero-preview/out on port 3000. Low disk space required clearing temporary build caches and mirror node_modules after the build. Future mirror builds need dependencies restored. Original next.config.ts restored; no deployment performed.
