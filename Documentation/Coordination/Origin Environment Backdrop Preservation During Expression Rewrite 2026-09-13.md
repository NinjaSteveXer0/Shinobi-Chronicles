# Shinobi Chronicles — Origin Environment Backdrop Preservation During Expression Rewrite

**Date:** 2026-09-13  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING COORDINATION GUARD — EXPRESSION REWRITE MAY NOT INVALIDATE RECOVERED/APPROVED SCENE GEOGRAPHY/TIME WITHOUT APPROVAL**

## Purpose

Current Origin prose is under review after installed-browser evidence showed that the player-facing scene expression was too skeletal. Writing has produced candidate replacement prose. This created a new risk: previously created/approved Scene Environment art could be stranded if candidate prose casually changes scene geography, time-of-day or environment identity.

That is not authorised.

The correct authority order for this lane is:

`recovered/approved Origin factual + scene-setting authority + approved UI environment/backdrop authority`
>
`candidate expression rewrite`.

For current per-Origin geography/backdrop recovery, consume:

`Documentation/Story/Academy_Origin_Scene_Location_and_Backdrop_Recovery_Manifest_2026-09-13.md`
commit `75fe3a890a75e722d1bb5759fdb9cb5f8a1664c3`.

Canonical rule:

> **A player-facing expression rewrite must fit the recovered/approved scene geography/time unless Stephen explicitly approves changing that scene setting.**

If candidate prose conflicts with recovered/approved scene geography, the candidate prose is corrected. The existing asset is preserved, but asset existence alone never grants Story or mapping authority.

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
**different wording != different environment**  
**reconstructed Story != recovered original Story**.

## Origin preservation expectations

### Academy Hinata

The recovered Hyūga compound / training-courtyard setting remains the Story location family.

`Scene backdrops/hyuga_compound.png` is preserved as the strong intended physical candidate. Exact mapping still follows normal approval where not separately closed.

### Academy Wasabi Izuno

Recovered Story geography is a pursuit/tracking trial distributed across Konoha traversal, including a river-route beat among other route families.

`Scene backdrops/river_route_day.png` is preserved for the river-route presentation where applicable. It is not authority to render the entire Origin on the river.

### Academy Obito — CORRECTED

Original Obito choreography/backdrop mapping remains **UNKNOWN**.

The September 12 Kakashi/Obito package explicitly classified its Obito sequence as **NEW FINAL PRODUCTION AUTHORING — replaces missing durable package, not recovered original**.

Therefore the later `DAY -> LATE_AFTERNOON -> DUSK` training-ground progression must not be described as recovered/authorised original Story merely because it was implemented or because assets were created for it.

Preserve these physical assets:

- `training_grounds_day.png`
- `training_grounds_late_afternoon.png`
- `training_grounds_dusk.png`

Do not delete or regenerate them. Their exact Obito mapping remains candidate/reconstructed presentation until original choreography is recovered or Stephen explicitly approves that reconstructed sequence.

### Academy Kakashi — CORRECTED

The recovered accepted Story geography is:

1. Konoha rooftop — masked ANBU operative, sealed envelope, Hokage-authorised limited assignment;
2. pursuit through Konoha — Kakashi tails the pictured target;
3. Konoha alley — target meets a second man, package exchange, then the later complication.

Authority:

`Documentation/Story/Academy_Kakashi_Original_Rooftop_ANBU_Hokage_Order_Restoration_2026-09-13.md`.

The rejected replacement `Academy evaluator / logistics assessment / Academy debrief / Hatake-home-threshold` sequence is not Story-location authority and must not drive backdrop binding.

Current asset status:

- `Scene backdrops/hokage_district_exterior.png` is only provisional rooftop reuse;
- `Scene backdrops/broken_exchange_lane.png` is a strong alley candidate but is not automatically approved exact mapping;
- pursuit beat-by-beat mapping remains unresolved where not independently recovered.

Writing may improve scene choreography and dialogue without changing rooftop -> pursuit -> alley unless Stephen explicitly changes the Story.

### Other Origins

Consume the Writing recovery manifest rather than assuming every previously suggested reuse family was approved.

Current important states include:

- Mirai: exact backdrop mapping UNKNOWN;
- Menma: sequence recovered but DAY/NIGHT conflict unresolved;
- Kushina: APPROVED exact courtyard/day mapping to `Scene backdrops/academy_training_ground_courtyard.png`;
- Kurenai: exact location/backdrop UNKNOWN;
- Iwabee: damaged-training-ground location family recovered, exact asset UNKNOWN;
- Metal Lee: structure recovered, exact location/backdrop UNKNOWN.

Iwabee occurrence-specific terrain damage remains event state and must not automatically be baked into a reusable generic master backdrop.

## Rewrite acceptance check

Every substantial Origin expression candidate must now answer:

1. What is the authoritative scene environment/location for this beat?
2. Is that state `APPROVED`, `RECOVERED`, or `UNKNOWN`?
3. What independently supported physical backdrop mapping already covers it, if any?
4. Did the candidate prose change only expression/performance, or did it silently change geography/time?
5. If geography/time changed, where is Stephen/owner approval for that change?
6. If mapping remains UNKNOWN, is runtime leaving it unbound rather than guessing?

No new asset backlog may be created by unauthorised expression drift.

## Coding / UI boundary

Coding may continue implementing environment IDs / backdrop mappings where scene geography/time and the mapping are independently closed.

Coding does **not** need to wait for every prose sentence to be final before implementing a scene backdrop whose geography/time and exact mapping are already authoritative.

However:

- candidate or reconstructed prose must not be treated as authority for a new environment;
- exact mapping remains UI/Assets authority where not already closed;
- `UNKNOWN` remains unbound rather than invented;
- browser validation remains required to prove the backdrop actually renders correctly;
- no backdrop is Golden merely because its file exists.

## Current coordination consequence

Issue #181 remains the containment lane for the unapproved Origin-expression incident and approval-gate correction.

Corrected doctrine:

> **Freeze prose drift, not independently valid asset implementation. Preserve the backdrop investment without letting art invent Story.**

Do not restart backdrop generation. Do not discard existing Origin art. Do not make Coding wait on stylistic recovery where underlying scene-setting and exact mapping authority are genuinely closed. Where Story/location/mapping is UNKNOWN, leave it explicitly unresolved rather than hardening a guess.

Stephen relay: NONE.
