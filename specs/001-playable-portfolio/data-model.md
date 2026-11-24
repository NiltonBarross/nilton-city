# Data model
## Snapshot
- Snapshot.login: literal NiltonBarross.
- Snapshot.capturedAt: ISO date from actual API read.
- Snapshot.totalContributions: nonnegative integer from public calendar.
- Snapshot.days: list of Day records.
## Day
- Day.date: unique ISO date.
- Day.contributionCount: integer at least zero.
- Positive days become activity towers; height is monotonic in contributionCount. Zero days remain paving.
## Project
- Project.id: unique slug.
- Project.title and Project.description: factual nonempty strings from public README evidence.
- Project.url: HTTPS GitHub repository under NiltonBarross.
- Project.color and position: decorative world placement, not activity.
## Visitor
- Visitor.x and Visitor.z: finite coordinates inside the road boundaries.
- Visitor.heading: finite radians.
- Visitor.keys: transient input set, cleared on blur, modal opening, stop and visibility change.
- Visitor.mode: overview or drive; reduced-motion preference starts with orbit disabled.
