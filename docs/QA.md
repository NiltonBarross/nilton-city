# Verification — 2026-11-24

## Automated
- Node syntax checks: app.js and world.js passed.
- Five domain tests passed: real positive-day mapping and totals, deterministic monotonic heights, movement bounds/time cap, collisions and public project URLs.
- 19 contributions across 8 positive days in the dated bundled snapshot; six featured public projects.

## Browser
Verified the actual HTTP-served build in the in-app browser at 1440×900 and 390×844.
- Scene initialized, rendered and produced no console errors during the checked journeys.
- Start exploration, keyboard movement, exit, reset controls and mobile touch controls available.
- Directory lists six projects. Market Atlas detail shows the correct title, summary and repository URL.
- Escape closes the modal and restores focus to projects-button, confirmed from the active DOM element.
- No horizontal page overflow at 1440px; 390px capture shows identity, navigation, primary actions and activity access.
- Motion toggle was exercised. Reduced-motion initial behavior is implemented through matchMedia; OS-level emulation was not available in this browser tool and was not separately exercised.
- Source inspection verified input clearing on blur/visibility/modal and pointer cancellation.

## Independent finish review
The reviewer requested controlled overlay contrast, visible full identity/handle, focus restoration for activity tower selection, and removal/repositioning of above-heading labels.
All four were corrected and recaptured. The follow-up reviewer scored all four resolved, disposition ship. This verdict covers the scored fixes; publication verification is recorded separately below.

## Assets and dependency
The selected Three.js 0.170.0 archive contains one self-contained build module, not a split core pair; the matching MIT license is included. Barlow/Barlow Condensed font files and OFL licenses are local. Profile banner is a capture of the project's original rendered scene with embedded origin metadata.

## Publication
- GitHub Pages build completed with status built for static commit 2507816fe193e62b817b2221ed08f77c65592f88.
- Public URL https://niltonbarross.github.io/nilton-city/ opened in browser; scene initialized, start and driving worked; no console errors observed in the checked live scene.
- Public profile https://github.com/NiltonBarross shows the new README, full identity and six project links. Banner image loaded at natural width 1440px.
- GitHub source: https://github.com/NiltonBarross/nilton-city.
- Profile bio/name/blog account fields were not changed: account token lacked user scope. No broader scope was requested; the README is the personalized presentation.
- Sites private copy: source commit 2c2d7cba69ce6aaf1fc5cbc9ea5c564ed04b424e and exact packaged archive submitted. Returned asynchronous deployment status pending at last observation. It is separate from the verified public Pages deployment.
