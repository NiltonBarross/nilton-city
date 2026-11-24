# Quickstart validation
Prerequisite: Node 24; static HTTP server; WebGL2 browser for gameplay.
Run `node --test tests/domain.test.mjs` and syntax checks for app.js/world.js.
Serve dist through HTTP, then open the page.
Desktop: enter exploration; WASD/arrows move; reset returns to start; Escape exits. Open a project from scene and directory; close using Escape and check focus return.
Mobile 390px: enter; hold/release touch controls; switch to directory; open and scroll details. No horizontal page overflow.
Reduced motion: overview remains still until enabled explicitly. Losing focus must stop held input.
Data: activity totals equal source; tower count equals positive days; every dated tower has a matching count. Directory links point only to public repositories.
Published: verify README banner, profile link, site response and JavaScript assets.
