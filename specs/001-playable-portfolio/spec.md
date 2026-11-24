# Feature Specification: Playable city portfolio

**Feature Branch**: no feature branch; new project
**Created**: 2026-11-24
**Status**: Ready for planning
**Input**: Personalized GitHub profile and portfolio inspired by GTA VI; explore buildings representing contributions and visit real projects. User approved creation.

## User Scenarios & Testing

### User Story 1 - Explore the city (Priority: P1)
A visitor sees Nilton's identity and a sunset city, enters exploration, moves through it and inspects public activity.

**Why this priority**: The playable city is the user's defining request.
**Independent Test**: Enter, move with keyboard and touch, reset the position and inspect a contribution building.
**Acceptance Scenarios**:
1. Given the opening view, when the visitor starts exploring, movement controls and an exit remain available.
2. Given a contribution building, when selected, the date and actual contribution count appear.
3. Given reduced-motion preference, the page does not automatically orbit the camera.

### User Story 2 - Find projects (Priority: P1)
A visitor selects a project landmark or uses a direct project directory to see a factual description and open its public repository.

**Why this priority**: Portfolio usefulness must survive without gameplay.
**Independent Test**: Reach all featured projects via the directory and via city landmarks.
**Acceptance Scenarios**:
1. Given the project list, when any project is selected, its title, summary and repository link are shown.
2. Given a project dialog, when Escape is pressed, it closes and focus returns to its trigger.

### User Story 3 - Personalized GitHub profile (Priority: P2)
A visitor to NiltonBarross's profile sees a coordinated visual introduction, public project links and a link to the playable portfolio.

**Independent Test**: Open the public profile and verify its README and banner links.
**Acceptance Scenarios**:
1. Given the profile, when the portfolio link is selected, the published site opens.
2. Given an image failure, readable text still identifies Nilton and links to projects.

### Edge Cases
- Graphics unavailable: show the project directory and an explanation.
- No contributions: show a quiet district with no fabricated activity towers.
- Hidden tab or lost focus: movement stops; frame time is capped after resume.
- Touch cancel: held movement releases.
- Narrow or short viewport: project list and dialog remain scrollable.
- Calendar snapshot ages: label its date and provide a GitHub source link.

## Requirements

### Functional Requirements
- FR-001: Show Nilton Luan, public GitHub handle and data/automation/AI focus.
- FR-002: Provide a navigable city with desktop and touch controls, reset, exploration exit and motion toggle.
- FR-003: Each activity building must correspond to an identified date with positive public contributions; zero days must not become activity towers.
- FR-004: Show source, capture date and exact public totals. Call activity contributions, not commits.
- FR-005: Provide at least six real public projects, selectable both in the scene and in a normal list.
- FR-006: Project details must include actual repository URLs and factual descriptions.
- FR-007: Provide keyboard focus, accessible controls, readable contrast and reduced motion handling.
- FR-008: Use a purple/pink sunset identity shared by the site and GitHub README.
- FR-009: Create a public profile README repository without changing visibility or content of existing project repositories.
- FR-010: Publish the site and verify the live result; disclose access restrictions if any.

### Key Entities
- Activity snapshot: account, capture date, reporting interval, dated counts and total.
- Project: name, summary, technology and public repository URL.
- Visitor: current exploration position, selected item and movement state, kept only in memory.

## Success Criteria

### Measurable Outcomes
- SC-001: All activity towers match positive days in the snapshot, and displayed totals equal the source.
- SC-002: Each featured project is reachable without movement in no more than two selections.
- SC-003: Keyboard and touch movement, reset, exit and modal dismissal pass a repeatable browser check.
- SC-004: At 390px and 1440px viewport widths, identity, project access and core controls remain available without horizontal page overflow.
- SC-005: Published profile and portfolio links resolve and reference the intended public projects only.

## Assumptions
- The user approved the previously proposed title and static implementation through “Pode criar.”
- A dated snapshot is sufficient; automatic scheduled refresh is not requested.
- This is a small explorable portfolio, not a full commercial driving game.
- Procedural scenery is decorative and visually separated from labeled contribution buildings.
- Browser verification and automated data/geometry checks are required.
