# PostHog event contract

Updated September 17, 2026. The existing PostHog project/host and automatic page views/page leaves remain configured in `instrumentation-client.ts`. Generic autocapture is disabled; interactions use the explicit events below.

## Common properties

Every custom event includes `page` (`landing` or `case_study`), `page_path`, `schema_version: 3`, and `environment`. Case-study events also include `case_study`, the slug of the **source page**. `project` identifies the **destination project** on card impressions/clicks, so next-project navigation retains both ends of the journey. This is an additive property change; existing event names remain available.

Localhost previews print `[Hippo analytics]` JSON to the console and never initialize or send to PostHog. Production captures use the existing project token. Custom link `target` properties omit query strings. No new visitor identity, form values, or personal properties are collected.

## Home page and shared navigation

| Event | When it fires | Useful properties |
| --- | --- | --- |
| `booking clicked` | A Cal.com booking link is activated | `location`, `label`, `target`, `input_method`, `link_type`; pricing CTAs also include `plan`, `price`, `currency` |
| `navigation clicked` | Internal navigation, including same-page story links outside the chapter menu | `location`, `label`, `target`, `section`, `input_method`, `link_type` |
| `navigation menu toggled` | Mobile menu opens/closes | `location`, `expanded`, `reason` |
| `case study clicked` | A link to a case-study page is activated | `location`, `label`, `target`, `project`, `input_method`, `link_type` (`image` or `text`) |
| `case study card viewed` | A project's card heading becomes at least 50% visible | `project`, `location` (`recent_work` or `next_project`) |
| `testimonial viewed` | A testimonial's attribution becomes at least 50% visible | `testimonial` (`featured`, `second`, `third`), `location: testimonials` |
| `section viewed` | A section heading becomes at least 50% visible | `section`; includes the hero, current/new sections, and footer |
| `plan viewed` | A pricing amount becomes at least 50% visible | `section`, `plan`, `price`, `currency` |
| `page scrolled` | The scroll position reaches 25%, 50%, 75%, or the bottom | `depth_percent` |
| `service selected` | The service tab changes | `location`, `label`, `service_index`, `input_method` |
| `studio slide changed` | The Why Hippo principle changes by scrolling or using a button | `location`, `label`, `direction`, `slide`, `input_method` (`scroll` or `button`) |
| `faq toggled` | A FAQ opens/closes | `location`, `question`, `question_index`, `expanded` |
| `process step toggled` | A process row opens/closes | `location`, `step`, `label`, `expanded` |

Impressions and scroll milestones fire once per page visit, not every time someone scrolls back. Background tabs do not emit impressions or scroll milestones until visible. Scrolling or jumping to an anchor can cross several milestones; scroll depth measures position reached, not proof that the content was read. Testimonial views measure exposure to the attribution, not proof that the quote was read.

Link tracking covers pointer, keyboard, and middle-click activation, including mobile menu links before the menu closes. Downloads and non-HTTP links are excluded. Navigation captures use immediate beacon delivery following the [PostHog JavaScript documentation](https://posthog.com/docs/libraries/js/usage#sending-events-before-a-page-unload).

## Case studies

| Event | When it fires | Useful properties |
| --- | --- | --- |
| `case study viewed` | A case-study page mounts or the route changes to it | `case_study`, `page_path` |
| `case study chapter clicked` | Overview, Strategy, Experience, Delivery, or Outcome in a chapter menu is activated | `case_study`, `section`, `location: case_study_chapters`, `label`, `target`, `input_method` |
| `case study image opened` | A full-size image link is activated | `case_study`, `location`, `image`, `target`, `label`, `input_method` |
| `project website clicked` | An external project/live-site link is activated | `case_study`, `location`, `label`, `target`, `input_method` |
| `case study walkthrough selected` | A visitor selects a different viewer tab | `case_study`, `location`, `step` (one-based), `label`, `input_method` |
| `case study walkthrough playback` | Stackray's slideshow starts/stops | `case_study`, `location`, `playing`, `reason` (`toggle`, `selection`, `completed`); manual actions also have `input_method` |
| `case study story step selected` | A different Stackray page-architecture step is selected | `case_study`, `location`, `step`, `label`, `input_method` |

Case-study chapter and same-page links no longer inflate `case study clicked`. This classification correction applies from schema version 3 onward. Re-selecting an already active tab/step emits no selection event. Automatic Stackray slideshow advancement does not count as a visitor selecting a tab.

Walkthrough locations: `stackray_hero`, `helpmegrow_product_proof`, and `quillo_landing_page_proof`. The Stackray architecture uses `stackray_architecture`. Booking, section, scroll, and next-project card events are also available on all case studies.

## Quillo video

All video events include `case_study: quillo`, `location: quillo_explainer`, `video: quillo_platform_introduction`, `current_time_seconds`, `duration_seconds`, and `watched_percent`.

| Event | Meaning |
| --- | --- |
| `case study video started` | First actual playback, once per page visit |
| `case study video playback` | Play/resume or pause, with `playing: true/false` |
| `case study video progress` | 25%, 50%, or 75% watched, once per milestone; `progress_percent` identifies the milestone |
| `case study video completed` | Playback reaches the end, once per page visit |

Progress uses the video's played time ranges: seeking ahead does not claim skipped footage was watched, and replaying a portion does not count that portion twice. Completion means playback reached the end; use its `watched_percent` to distinguish a full watch from a seek to the end. Buffering's repeated `playing` events do not inflate play counts. Ending does not emit a manual pause.

## Useful PostHog reports

- Home-page project engagement: `case study card viewed` → `case study clicked`, filtered to `page: landing`, broken down by `project`.
- Case-study conversion: `case study viewed` → `booking clicked`, filtered to `page: case_study`, broken down by `case_study`.
- Pricing intent: `plan viewed` → `booking clicked`, filtered to `location: pricing` on the booking step, broken down by `plan`.
- Video engagement: `case study video started` → `case study video progress` → `case study video completed`, using milestone and watched-percent filters.
- Reading depth: `page scrolled` broken down by `page_path` and `depth_percent`.

Booking clicks measure intent to schedule, not confirmed appointments. Reports above are suggested configurations; no PostHog dashboard changes are made by this code.

## Verification — September 17, 2026

- TypeScript check and production static build passed (12 generated pages).
- Ten isolated checks passed against the exported pages and actual tracking modules: link classification, source/destination project context, keyboard/middle-click support, mobile-menu removal, impression/scroll deduplication, effect cleanup, local/server suppression, provider failure isolation, and video seeking/replay semantics.
- Local browser console confirmed home-page Quillo-card/testimonial impressions and scroll milestones; Quillo chapter clicks, pointer/keyboard tab selection without duplicate reselection, and a complete video watch through all three milestones; HelpMeGrow pointer/keyboard workflow selection; and Stackray play/selection/pause events.
- Production ingestion and PostHog dashboards were not changed or exercised. Local checks intentionally generated no production traffic.
