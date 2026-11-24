# Tasks: Playable city portfolio
Input: spec.md, plan.md, research.md, data-model.md and contracts/ui.md. All constitutional gates passed.

## Phase 1: Setup
- [x] T001 Create static dist directory and vendor pinned Three.js self-contained module, license and fonts in dist/vendor/.
- [x] T002 Capture public snapshot and verified six-project catalog in dist/data.json, enforcing data-model.md Snapshot.login, Snapshot.capturedAt, Snapshot.totalContributions, Snapshot.days and Project.id/title/description/url.

## Phase 2: Foundation
- [x] T003 Write tests/domain.test.mjs for data-model.md Day.date, Day.contributionCount, Project.url and Visitor.x/z/heading constraints; prove failing before domain implementation.
- [x] T004 Implement pure tower mapping, input movement and collision/bounds rules in dist/domain.mjs according to data-model.md Day and Visitor fields.

## Phase 3: US1 — Explore
- [x] T005 [US1] Implement original purple/pink waterfront city, car, contribution towers and camera in dist/world.js, based on data-model.md Day.date/contributionCount and Visitor coordinates.
- [x] T006 [US1] Implement identity, controls, touch input, motion setting, fallback and activity inspection in dist/index.html, dist/styles.css and dist/app.js, following contracts/ui.md.

## Phase 4: US2 — Projects
- [x] T007 [US2] Add six project landmarks and accessible directory/dialogs in dist/world.js, dist/index.html and dist/app.js, enforcing data-model.md Project.id/title/description/url and focus restoration contract.

## Phase 5: US3 — Profile
- [x] T008 [US3] Capture original built scene into profile/banner.jpg and create profile/README.md with factual portfolio description and project links.
- [x] T009 [US3] Publish profile README/assets to NiltonBarross/NiltonBarross and static site files to a separate public portfolio repository with GitHub Pages; verify source and live links.

## Phase 6: Polish and publication
- [x] T010 Verify Node checks and desktop/mobile browser journeys; record observations in docs/QA.md and fix material defects.
- [x] T011 Run Impeccable detector and independent finish review; record shipped tokens in DESIGN.md and .impeccable/design.json.
- [ ] T012 Register and publish a Sites preview using .openai/hosting.json and verified source package; report any environmental publication limitation.

T012 status: source synchronized and exact archive submitted successfully; Sites returned asynchronous publication pending. Public GitHub Pages publication is independently verified and complete. Do not claim the private Sites copy is live until a terminal deployment result is observed.

## Dependencies & execution
T001–T002 precede T003–T004. T005–T007 share foundation and integrate in sequence. T008 needs the rendered city. T009 follows QA. T010–T012 verify and publish. Independent opportunity: asset/data acquisition; no shared-file worker edits required.

## Independent tests
US1: enter, move, reset, select a dated tower, exit on desktop and mobile. US2: every project accessible in two selections without driving. US3: profile banner and public site link resolve. MVP is US1 plus the project directory; complete all stories for delivery.
