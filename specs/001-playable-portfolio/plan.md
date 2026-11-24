# Implementation Plan: Playable city portfolio
**Branch**: new project | **Date**: 2026-11-24 | **Spec**: spec.md

## Summary
Build a static original low-poly sunset city. A small car explores streets; dated public contribution towers and six project landmarks are selectable. An HTML directory duplicates project access. Publish a coordinated GitHub profile and public GitHub Pages site; also deliver a Sites preview when available.

## Technical Context
Language: HTML, CSS, browser ES modules, Node.js 24 checks.
Primary dependency: vendored Three.js 0.170.0 self-contained module and MIT license.
Storage: bundled public JSON snapshot; visitor state in memory.
Testing: Node assert tests of contribution mapping, movement bounds and project URLs; browser desktop/mobile interaction checks.
Platform: modern WebGL2 desktop/mobile browsers; accessible HTML fallback.
Performance: cap DPR at 1.5; reuse geometry/materials, no postprocessing or dynamic shadow maps; cap frame delta, pause on hidden tab.
Scope: one page, six featured projects, public calendar of at most 371 days; no backend.

## Constitution Check
Pre-research: PASS. Public-only evidence, dated snapshot, optional gameplay, static fallback and original art.
Post-design: PASS. One necessary rendering dependency; HTML alternative for every project and contribution. No credentials or private repositories in source. No gate exceptions.

## Project Structure
Documentation in specs/001-playable-portfolio: spec, plan, research, data-model, contracts/ui, quickstart and tasks.
Static files: dist/index.html, dist/styles.css, dist/app.js, dist/world.js, dist/domain.mjs, dist/data.json, dist/vendor/three.module.js, dist/vendor/LICENSE.
Verification: tests/domain.test.mjs.
Profile: profile/README.md and profile/banner.jpg (capture of the original built scene).
Deployment: .openai/hosting.json for Sites; GitHub Pages serves published dist contents in a separate public repository.

## Complexity Tracking
No constitutional violations. Three.js is justified by explorable 3D perspective and raycast interaction; a raster hero or CSS skyline cannot meet gameplay requirements.
