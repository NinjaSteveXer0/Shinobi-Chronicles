# Shinobi Chronicles — Origin Environment Backdrop Preservation During Expression Rewrite

**Date:** 2026-09-13  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING COORDINATION GUARD — EXPRESSION REWRITE MAY NOT INVALIDATE LOCKED SCENE GEOGRAPHY/TIME WITHOUT APPROVAL**

## Purpose

Current Origin prose is under review after installed-browser evidence showed that the player-facing scene expression was too skeletal. Writing has produced candidate replacement prose. This created a new risk: previously created/approved Scene Environment art could be stranded if candidate prose casually changes scene geography, time-of-day or environment identity.

That is not authorised.

The correct authority order for this lane is:

`closed Origin factual/scene-setting authority + approved UI environment/backdrop authority`
>
`candidate expression rewrite`.

Canonical rule:

> **A player-facing expression rewrite must fit the already-authorised scene geography/time unless Stephen explicitly approves changing that scene setting.**

If candidate prose conflicts with a locked backdrop/scene anchor, the candidate prose is corrected. The existing asset is not automatically declared obsolete.

## Existing preserved backdrop work

Current repository `Scene backdrops/` physically includes the established general masters plus later Origin-support assets including:

- `Scene backdrops/hyuga_compound.png`
- `Scene backdrops/river_route_day.png`
- `Scene backdrops/training_grounds_day.png`
- `Scene backdrops/training_grounds_late_afternoon.png`
- `Scene backdrops/training_grounds_dusk.png`
- `Scene backdrops/broken_exchange_lane.png`

These files are physical production assets and must not be discarded or regenerated merely because candidate Story prose uses different wording.

Preserve:

**physical asset exists != exact mapping approved**  
**candidate prose != new World location**  
**expression rewrite != geography rewrite**  
**body-language/cadence rewrite != time-of-day rewrite**  
**different wording != different environment**.

## Origin preservation expectations

### Academy Hinata

The Hyūga compound / training-courtyard setting remains the intended environment family. Candidate prose should be written to this setting unless Stephen explicitly changes the Origin location.

`Scene backdrops/hyuga_compound.png` is preserved as the relevant physical asset candidate.

### Academy Wasabi Izuno

The daytime Konoha-outskirts pursuit / river-route setting remains the intended environment family for the route presentation where applicable.

`Scene backdrops/river_route_day.png` is preserved as the relevant physical asset candidate.

### Academy Obito

The authorised temporal progression remains a presentation concern with DAY / LATE_AFTERNOON / DUSK coverage where required by the existing scene sequence.

Current physical assets include:

- `training_grounds_day.png`
- `training_grounds_late_afternoon.png`
- `training_grounds_dusk.png`

Candidate prose must not erase or relocate the temporal progression merely for stylistic convenience.

### Academy Kakashi

The Origin remains a Konoha logistics / exchange / Academy-debrief / Hatake-home-threshold sequence under existing factual authority.

`broken_exchange_lane.png` now physically exists and must be preserved as a candidate exact/reusable exchange-lane presentation asset. Existing general Konoha street/route/interior assets remain valid reusable coverage candidates where semantically appropriate.

Writing may improve scene choreography and dialogue without relocating the operation simply because a different location is easier to write.

### Other Origins

For Menma, Mirai, Kushina, Kurenai, Iwabee and Metal Lee, existing approved/reuse-first environment families remain protected. Expression rewriting may add physical movement **within** the authorised environment but may not create a new location/time requirement without explicit authority.

Kushina's courtyard/classroom mapping remains a UI/Coding binding question; a prose rewrite does not make either physical asset missing.

Iwabee occurrence-specific terrain damage remains event state and must not be baked into a new reusable environment solely because revised prose dramatizes the damage more vividly.

## Rewrite acceptance check

Every substantial Origin expression candidate must now answer:

1. What is the authoritative scene environment/location for this beat?
2. What approved physical backdrop or reusable environment family already covers it?
3. Did the candidate prose change only expression/performance, or did it silently change geography/time?
4. If geography/time changed, where is Stephen/owner approval for that change?
5. If no approval exists, revise the prose back to the existing scene anchor.

No new asset backlog may be created by unauthorised expression drift.

## Coding / UI boundary

Coding may continue implementing existing environment IDs / backdrop mappings against the preserved scene anchors.

Coding does **not** need to wait for every prose sentence to be final before implementing a scene backdrop whose geography/time is already independently closed.

However:

- candidate prose must not be treated as authority for a new environment;
- exact mapping remains UI/Assets authority where not already closed;
- browser validation remains required to prove the backdrop actually renders and occludes underlying World presentation correctly;
- no backdrop is Golden merely because its file exists.

## Current coordination consequence

Issue #181 remains the central containment lane for unapproved Origin expression rewrites.

This guard extends that containment:

> **Freeze prose drift, not asset implementation. Preserve the backdrop investment.**

Do not restart backdrop generation. Do not discard existing Origin art. Do not make Coding wait on stylistic recovery when the underlying scene-setting authority is already closed.

Stephen relay: NONE.
