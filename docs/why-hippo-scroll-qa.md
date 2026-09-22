# Why Hippo scroll interaction — 2026-09-11

The existing three cards now follow the scroll position. The carousel remains sticky during three equal intervals over 150svh of scrolling, then releases into Recent Works. Desktop metrics stay alongside it; on mobile the metrics scroll above and only the card stays below the 116px header. The arrows still select cards manually. Scrolling back through the intervals reverses the sequence. Reduced motion removes the crossfade.

Validated in the in-app browser at 1440 × 900 and 390 × 844:
- All three cards appear in sequence while scrolling down.
- Reverse scrolling revisits earlier cards; arrow selection still works.
- Card position remains fixed during its sequence: 220px desktop and 132px mobile.
- After the third card, the carousel releases and Recent Works enters normally.
- All three images load; no horizontal overflow or browser console errors observed.
- Local analytics logs distinguish scroll and button transitions with input_method and record changes only when a different card is selected.
- Production build and TypeScript checks passed, including all case-study routes.

Only the Why Hippo interaction, supporting CSS, and event documentation changed. Existing card copy, visuals, number typography, pricing, booking links, and case-study content are preserved.
