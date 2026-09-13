# Shinobi Chronicles — Scene Backdrop Physical Coverage and Alpha Origin Gap Audit

**Date:** 2026-09-13  
**Owner:** CE / Codex / Coordination  
**Status:** **PHYSICAL-COVERAGE AUDIT / GENERATION-GUARD — NOT NEW WORLD OR STORY AUTHORITY**  
**Repository HEAD inspected:** `4405bd62053b1ec69103947503f8c44ced3ae1cd`

## Purpose

Prevent duplicate Scene Environment generation by separating:

- physical asset already exists;
- existing asset can plausibly cover the authored scene pending exact UI binding;
- mapping/runtime mismatch only;
- genuinely missing presentation coverage;
- optional visual-specificity upgrade that is not an Alpha semantic requirement.

This document does **not** invent locations, Story facts, World identity or new environment IDs.

Preserve:

**physical asset exists != exact semantic binding approved**  
**environment backdrop != World location identity**  
**presentation variant != new location**  
**event-specific state != reusable background art**  
**missing runtime mapping != missing image**

---

## 1. Physical `Scene backdrops/` inventory on current main

The repository already contains these 19 general Scene backdrop masters:

1. `Scene backdrops/academy_classroom.png`
2. `Scene backdrops/academy_training_ground_courtyard.png`
3. `Scene backdrops/arena_concourse.png`
4. `Scene backdrops/arena_ring.png`
5. `Scene backdrops/civilian_common_room.png`
6. `Scene backdrops/covert_interior.png`
7. `Scene backdrops/forest_clearing_day.png`
8. `Scene backdrops/forest_clearing_night.png`
9. `Scene backdrops/forest_path_night.png`
10. `Scene backdrops/hokage_administration_interior.png`
11. `Scene backdrops/hokage_district_exterior.png`
12. `Scene backdrops/institutional_archive_interior.png`
13. `Scene backdrops/konoha_main_gate.png`
14. `Scene backdrops/konoha_main_street.png`
15. `Scene backdrops/konoha_village_street_night.png`
16. `Scene backdrops/medical_interior.png`
17. `Scene backdrops/quiet_residential_lane.png`
18. `Scene backdrops/torii_path.png`
19. `Scene backdrops/whisper_woods_forest_route.png`

Do not regenerate any of these merely because an environment ID, Story label or UI discussion uses different wording.

---

## 2. Existing Arc 1 backdrop assets outside the generic folder

The repository also already contains these seven physical masters under `Arc 1 Backdrops/`:

- `Arc 1 Backdrops/barrier_relay_four.png`
- `Arc 1 Backdrops/better_host_chamber.png`
- `Arc 1 Backdrops/dead_transfer_site.png`
- `Arc 1 Backdrops/recall_site.png`
- `Arc 1 Backdrops/storm_drain.png`
- `Arc 1 Backdrops/veterinary_ward.png`
- `Arc 1 Backdrops/warehouse_investigation.png`

A different folder does not make these missing. Resolver/mapping work must be distinguished from image-generation work.

---

## 3. Alpha Origin coverage audit

### Academy Menma

**Physical coverage:** PRESENT / no new backdrop currently proven necessary.

Existing `forest_clearing_day.png` is already available for the clearing presentation family. `forest_clearing_night.png` also exists if an authorised night scene actually calls it.

Do not regenerate a generic clearing merely because the Origin scene is named differently.

### Academy Hinata

**Physical coverage:** GENUINE UNIQUE-SETTING GAP.

Current runtime Story explicitly opens at the **Hyūga compound** in early morning and later reaches the compound/gate context. No Hyūga-compound Scene backdrop exists in the current physical inventory.

`quiet_residential_lane.png` or `torii_path.png` may potentially cover a later exterior threshold beat, but neither should be silently declared the Hyūga compound spar/training environment.

**Generation need if dedicated Origin visual coverage is required:** one reusable Hyūga compound / training-courtyard environment, designed to remain useful beyond this single Origin where semantically legitimate.

### Academy Wasabi Izuno

**Physical coverage:** GENUINE ROUTE-PRESENTATION GAP for full authored-fidelity coverage.

The Origin is an Academy pursuit/tracking trial with divergent route context including a river route, stronger/false trail, interception route and extraction-point pursuit. Current generic assets provide a clearing and a Whisper-Woods-specific route, but there is no general daytime Konoha-outskirts pursuit / river-route environment in `Scene backdrops/`.

Do not relabel `whisper_woods_forest_route.png` as a generic Academy pursuit environment merely because both contain forest geography.

**Generation need if branch-appropriate visual coverage is required:** one reusable daytime Konoha-outskirts pursuit environment designed to support trail/river/extraction context without baking a branch result into the image.

Do not generate separate images for every pursuit choice unless later Story/UI authority actually requires a scene switch.

### Academy Mirai

**Physical coverage:** PRESENT.

Current physical coverage already includes:

- `konoha_main_street.png`
- `konoha_main_gate.png`

These cover the ordinary Konoha escort/checkpoint presentation family. No new Mirai-specific backdrop is presently proven necessary.

### Academy Kushina

**Physical coverage:** PRESENT.

Current physical coverage already includes:

- `academy_training_ground_courtyard.png`
- `academy_classroom.png`

Current runtime HEAD directly registers the courtyard asset for `konoha_academy_courtyard_day` and projects the newly authored ordinary endings there.

There is a **mapping/authority reconciliation issue, not a missing-image issue**: the UI binding document separately distinguishes an Academy courtyard family and Academy classroom family, while current runtime HEAD projects the full Gerotora sequence through the courtyard reference. Do not generate either image again. Resolve the exact branch/environment mapping in code/UI authority instead.

### Academy Kurenai

**Physical coverage:** PRESENT / reuse-first.

The Bell Test / Battle-of-Illusions package does not currently prove a need for a unique Kurenai-only environment. Existing `forest_clearing_day.png` and/or `academy_training_ground_courtyard.png` are available reusable presentation candidates.

No new backdrop should be generated until exact semantic binding proves those are insufficient.

### Academy Iwabee

**Physical coverage:** PRESENT / reuse-first.

The current package is an Academy practical-ground terrain-reshaping occurrence. `academy_training_ground_courtyard.png` already exists.

The authored damaged/reshaped terrain is occurrence-specific state. Under the Scene Environment contract, occurrence-specific damage/obstruction must not be silently baked into the reusable generic background merely to make this Origin look unique.

Therefore **a bespoke damaged Iwabee training-ground image is not currently an Alpha generation requirement**.

### Academy Metal Lee

**Physical coverage:** PRESENT / reuse-first.

Current Academy training/performance context is coverable by `academy_training_ground_courtyard.png`. No unique Metal-Lee-only backdrop is presently proven necessary.

### Academy Kakashi

**Physical coverage:** NO PROVEN ALPHA GENERATION BLOCKER; exact binding still required.

Writing explicitly authors:

- a Konoha logistics lane;
- a broker exchange point;
- an Academy debrief;
- the Hatake threshold end beat.

However Writing does **not** require that the logistics lane be a unique World location or unique image identity. Current physical candidates already include:

- `konoha_main_street.png`
- `konoha_main_gate.png`
- `quiet_residential_lane.png`
- `covert_interior.png`
- `academy_classroom.png`

UI/Assets must choose/bind semantically correct existing coverage before authorising new image work.

A dedicated `Konoha Logistics / Broker Exchange Lane` master may be a worthwhile visual-specificity upgrade, but current authority does not prove it is required for Alpha execution.

**Classification:** mapping/quality decision first; generation only if UI determines no existing Konoha route/street master is semantically acceptable.

### Academy Obito

**Base physical coverage:** PRESENT.

Existing Konoha street + Academy training-ground assets cover the journey/training geography family.

**Temporal presentation coverage:** INCOMPLETE / needs exact presentation solution.

The binding Scene Environment Time-of-Day contract requires Obito-supporting presentation bands:

- `DAY`
- `LATE_AFTERNOON`
- `DUSK`

Current physical tree contains ordinary/day-capable Konoha street art and `konoha_village_street_night.png`, but no physical asset whose filename/provenance establishes `LATE_AFTERNOON` or `DUSK` coverage.

This does **not automatically mean two new full paintings are required**. UI/Assets may satisfy the contract through approved temporal variants/treatments of the same environment while preserving geometry. What is missing is the approved presentation coverage, not necessarily two new location identities.

No automatic project-wide day/night simulation is authorised.

---

## 4. Corrected Origin generation workload

Based on current physical main and current Story/runtime authority, the Origin batch should **not** be treated as four unquestionably missing images.

### Genuinely missing unique presentation coverage

1. **Academy Hinata — Hyūga compound / training courtyard**
2. **Academy Wasabi Izuno — daytime Konoha-outskirts pursuit / river-route environment**

### Existing art present; binding/mapping first

- Menma
- Mirai
- Kushina
- Kurenai
- Iwabee
- Metal Lee
- Kakashi
- Obito base geography

### Additional presentation gap, but not automatically a new-location painting

- **Obito temporal progression:** `LATE_AFTERNOON` / `DUSK` approved presentation coverage.

### Optional quality upgrade, not proven Alpha blocker

- **Kakashi dedicated Konoha logistics / broker exchange lane** if existing Konoha street/route masters are judged semantically inadequate after UI binding review.

Therefore the safe generation-planning count is:

> **2 definite new Origin environment masters + Obito temporal presentation work; Kakashi dedicated art is optional pending reuse/binding review.**

Do not quote `4 missing` as a current physical truth.

---

## 5. Generation guard

Before any Scene Environment image request:

1. search current physical repository tree;
2. search existing mapping/asset provenance;
3. check whether an existing generic environment is semantically valid;
4. distinguish event-state art from reusable environment art;
5. distinguish resolver/mapping work from physical image work;
6. generate only after the Project image lock is satisfied by Stephen using the exact phrase `generate now`.

A different label does not justify a duplicate image.

---

## 6. Current actionable corrections

- **Kushina:** resolve courtyard-vs-classroom branch mapping; no image generation needed.
- **Iwabee:** reuse Academy training-ground family unless new authority proves otherwise; do not bake occurrence damage into generic art.
- **Kakashi:** bind existing Konoha route/street coverage first; dedicated logistics-lane art is optional until proven necessary.
- **Obito:** close temporal projection coverage for `LATE_AFTERNOON` / `DUSK` without inventing new World locations.
- **Hinata / Wasabi:** these remain the two clear physical Origin-environment gaps under current main.

Routing: **RECORD ONLY**
