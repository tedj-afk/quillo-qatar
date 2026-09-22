# Stackray content implementation

The supplied PDF is the structure and pasted-text.txt is the editorial source. Content lives in app/components/stackray-story.tsx; scoped styling is in app/case-studies/stackray-story.css. Shared CaseStudyView selects this expanded story only for Stackray.

Sequence: hero/walkthrough, snapshot, problem, positioning, evidence, conversion architecture, messaging, trust, visual direction, experience, funnel, delivery, outcomes/measurement plan, founder takeaway, booking outro, next project, footer.

Screenshots in public/stackray were captured from https://www.stackray.xyz/ on 2026-09-11. Live product wording has evolved from some historical case-study copy; user copy remains the narrative source. Screenshot figures are illustrative UI examples, not claimed case-study outcomes. The unconfirmed 31% savings placeholder is not published.

Missing video replaced with a four-screen walkthrough and user-initiated playback. New interactions use the existing captureLandingEvent helper; events are documented in docs/analytics-events.md.
