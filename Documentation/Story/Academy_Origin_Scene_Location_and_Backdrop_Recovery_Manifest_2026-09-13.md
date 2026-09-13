# Shinobi Chronicles — Academy Origin Scene Location + Backdrop Recovery Manifest

**Date:** 2026-09-13  
**Owner:** Writing — Konoha  
**Status:** **RECOVERY AUTHORITY / DO NOT GUESS UNKNOWN SCENE MAPPINGS**  
**Coordination owner:** GitHub #181

## Purpose

Origin expression drift has contaminated the relationship between Story scenes and the Scene Backdrops Stephen created for those scenes.

Recovery must therefore proceed in this order:

> **recover original/approved Story scene → recover/approve scene location and time → identify the intended existing backdrop → bind runtime presentation**

Never reverse this into:

> **asset exists → invent or reshape Story so the asset fits**

Status vocabulary:

- **APPROVED** — direct durable setting/backdrop authority exists.
- **RECOVERED** — original/accepted Story geography is recoverable; exact asset mapping may still require UI/Assets confirmation.
- **UNKNOWN** — evidence is not strong enough. Runtime must leave the mapping unbound rather than guess.

A `CONFLICT` note under a recovered row means competing historical environment evidence exists and must be reconciled before Golden.

Physical asset existence is never by itself mapping authority.

---

## 1. `academy_hinata`

**Status:** RECOVERED

Recovered Story location family:
- Hyūga compound / Hyūga training courtyard rather than the Academy.

Recovered Story function:
- clan-observed Taijutsu / counter-response training and evaluation.

Existing physical asset:
- `Scene backdrops/hyuga_compound.png`

Mapping ruling:
- strong intended candidate for the Hyūga compound scene;
- exact environmentRef/path binding remains UI/Assets confirmation unless already separately approved.

Do not relocate Hinata to a generic Academy courtyard merely because one exists.

---

## 2. `academy_izuno` — Wasabi Izuno

**Status:** RECOVERED / PARTIAL

Recovered Story geography:
- Academy pursuit trial distributed across Konoha traversal;
- route families include environmental tracking, false trail, cooperation, Rogue-Genin interruption, river long route and inference/intercept route;
- the map/traversal itself is part of the tutorial experience.

Existing physical asset:
- `Scene backdrops/river_route_day.png`

Mapping ruling:
- `river_route_day.png` is a strong candidate for the actual river-route beat;
- it is NOT authority to render the entire Wasabi Origin on the river;
- exact locations/backdrops for the non-river route beats remain UNKNOWN until recovered.

---

## 3. `academy_mirai`

**Status:** UNKNOWN for exact backdrop mapping

Recovered Story concept:
- escort assessment;
- target identity/deception becomes questionable through conversation/inconsistency;
- possible reveal/confrontation;
- checkpoint resolution.

Historical UI reuse suggestions include Konoha main street and main gate/checkpoint coverage, but those are not strong enough to promote to original Story mapping on their own.

Existing likely reusable assets include:
- `Scene backdrops/konoha_main_street.png`
- `Scene backdrops/konoha_main_gate.png`

Mapping ruling:
- preserve these as candidates only;
- do not bind Mirai’s sequence solely because they visually fit an escort story.

---

## 4. `academy_menma`

**Status:** RECOVERED WITH CONFLICT

Recovered accepted sequence:
- Academy classroom;
- Academy departure;
- forest path;
- internal Nine-Tails dialogue;
- forest clearing;
- Anko / hostile-group scene;
- tutorial Battle;
- return to the same clearing;
- post-Battle continuation;
- Origin resolution.

Historical Writing direction explicitly described the forest-path movement as **night**.

Historical runtime backups instead project:
- `konoha_forest_path_day`;
- `konoha_forest_clearing_day`.

Existing physical assets include day/night forest coverage.

**CONFLICT:** time-of-day is not safe to infer from the current runtime because current runtime may itself reflect drift.

Mapping ruling:
- classroom location is recovered;
- path and clearing geography are recovered;
- final day/night asset selection must remain unresolved until the stronger original Story/environment authority is reconciled.

Do not silently normalize Menma to day merely because old runtime IDs say `day`.

---

## 5. `academy_kushina`

**Status:** APPROVED

Exact Story setting:
- **Konoha Ninja Academy — exterior practical training courtyard — daytime.**

Exact environment:
- `konoha_academy_courtyard_day`

Approved physical backdrop:
- `Scene backdrops/academy_training_ground_courtyard.png`

Applies through:
- opening seal incident;
- ordinary branch closures;
- `correct_formula` reverse-summon route;
- Gerotora first-contact/closure.

No second environment is required by current Writing authority.

Do not reopen this mapping absent genuine contradictory evidence.

---

## 6. `academy_kurenai`

**Status:** UNKNOWN for exact location/backdrop

Recovered Story structure:
- Battle of Illusions / Bell Test;
- bell objective;
- tutorial Battle / deceptive exchange;
- player-selected illusion/deception approach;
- instructor counter-trick / layered reveal.

What is NOT recovered strongly enough:
- exact physical location for the complete sequence.

Historical suggestions to reuse a forest clearing or Academy courtyard are presentation candidates only.

Mapping ruling:
- leave exact Origin backdrop unbound until original/approved scene-location evidence is recovered.

---

## 7. `academy_iwabee`

**Status:** RECOVERED location family / UNKNOWN exact asset

Recovered Story geography/function:
- theoretical/written Academy frustration;
- practical **damaged training ground**;
- Iwabee uses Earth Release to reshape the practical problem;
- the solution exposes another situation/person;
- possible Rogue Genin interaction;
- contextual Academy assessment.

Mapping ruling:
- `damaged training ground` is a recovered scene family;
- a generic clean courtyard must not be treated as exact merely because it is available;
- occurrence-specific terrain damage is event state and must not automatically be baked into a reusable master backdrop;
- exact physical backdrop remains UNKNOWN.

---

## 8. `academy_metal_lee`

**Status:** RECOVERED structure / UNKNOWN exact location/backdrop

Recovered locked structure:
- moving training-dummy apparatus;
- player-selected training approach;
- private capability established;
- unnamed stable Genin observes Metal;
- invitation: Spar / Demonstrate / Back Out;
- demonstration may create dummy hazard and protective response.

What is NOT recovered strongly enough:
- exact physical environment/backdrop for this sequence.

Mapping ruling:
- do not automatically map Metal to the generic Academy courtyard;
- character-card scenery is not sufficient Story-backdrop authority;
- exact backdrop remains UNKNOWN.

---

## 9. `academy_kakashi`

**Status:** RECOVERED Story geography / exact backdrop mapping PARTIAL

Final recovered original sequence authority:
`Documentation/Story/Academy_Kakashi_Original_Rooftop_ANBU_Hokage_Order_Restoration_2026-09-13.md`

Recovered locations:
1. Konoha rooftop — ANBU operative / sealed envelope / Hokage-authorised assignment.
2. Pursuit through Konoha — Kakashi tails the pictured target.
3. Konoha alley — target meets second man; package exchange; decoy-assassin complication.

The rejected replacement sequence containing Academy evaluator / logistics-assessment / Academy debrief / Hatake threshold is NOT location authority.

Existing physical assets / current reuse:
- current Coding provisionally reuses `Scene backdrops/hokage_district_exterior.png` for the rooftop;
- `Scene backdrops/broken_exchange_lane.png` exists and is a plausible candidate for the real alley exchange.

Mapping ruling:
- rooftop LOCATION = RECOVERED, exact intended backdrop = UNKNOWN / provisional reuse only;
- pursuit geography = RECOVERED, exact beat-by-beat backdrop = UNKNOWN;
- alley exchange LOCATION = RECOVERED, `broken_exchange_lane.png` = strong salvage candidate but not automatically Stephen-approved exact mapping.

No Kakashi browser Golden until both Story and approved environment projection match the recovered original.

---

## 10. `academy_obito`

**Status:** UNKNOWN ORIGINAL CHOREOGRAPHY / CONTAMINATED RECONSTRUCTION

Critical provenance finding:

The September 12 Kakashi/Obito production package explicitly classified both rows as **NEW FINAL PRODUCTION AUTHORING — replaces missing durable package, not recovered original**.

Therefore the later Obito journey-to-training choreography and its DAY → LATE_AFTERNOON → DUSK presentation must NOT be described as recovered original Story merely because it was implemented or because assets were generated for it.

Physical assets to preserve, but not yet bind as original-story authority:
- `Scene backdrops/training_grounds_day.png`
- `Scene backdrops/training_grounds_late_afternoon.png`
- `Scene backdrops/training_grounds_dusk.png`

Mapping ruling:
- do not delete/regenerate these assets;
- do not claim they map to Stephen’s original Obito Origin until original choreography is recovered or Stephen explicitly approves the reconstructed sequence;
- exact original Obito scene/backdrop mapping remains UNKNOWN.

---

# Contaminated downstream authority that must not outrank this recovery

The current coordination file:
`Documentation/Coordination/Origin Environment Backdrop Preservation During Expression Rewrite 2026-09-13.md`
commit `e5ae4b9f1da76547b26fb92e11bdfe393591362d`
contains two provenance errors that require CE correction:

1. **Kakashi:** it describes the rejected replacement `logistics / exchange / Academy-debrief / Hatake-home-threshold` sequence as existing factual authority. The recovered original is rooftop → pursuit → alley exchange.
2. **Obito:** it describes DAY / LATE_AFTERNOON / DUSK as authorised temporal progression without distinguishing that this progression came from the September 12 reconstructed package, which was explicitly not recovered original.

The general preservation doctrine in that file remains sound; these two game-specific assumptions do not.

---

# Runtime / UI acceptance rule

For every Origin scene beat:

`APPROVED` → UI/Coding may bind the approved exact backdrop.

`RECOVERED` → UI/Coding may bind only an independently approved/recovered matching asset; otherwise keep the location known but asset mapping pending.

`UNKNOWN` → **leave unbound. Do not invent.**

A blank/pending scene is preferable during recovery to permanently hardening the wrong artwork into the wrong Story.

Stephen is not required to reconstruct all ten Origins from memory. Archaeology must do the first pass; Stephen only needs to approve/edit genuinely unresolved survivors.

Preserve:

**Story scene != backdrop asset**  
**asset existence != scene authority**  
**candidate expression != accepted Story**  
**runtime binding != approval**  
**source/headless GREEN != browser Golden**
