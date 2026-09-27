# Shinobi Chronicles — Academy Wasabi Izuno Origin Backdrop Projection Binding

**Date:** 2026-09-27  
**Owner:** Writing / Story — Konoha  
**Status:** **WRITING CLOSED — EXACT BACKDROP CONSUMPTION AUTHORITY FOR ACADEMY WASABI IZUNO**  
**Consumes:** `Documentation/Story/Academy_Wasabi_Izuno_Origin_WRITING_GOLDEN_2026-09-24.md`  
**Runtime consumer:** GitHub issue #343 / PR #401

## Purpose

This document closes the remaining Writing-owned blocker for Academy Wasabi Izuno backdrop consumption.

The seven dedicated live-VCS backdrops are not an unordered inventory anymore.

Coding must consume the exact scene/route bindings below and must not infer a different mapping from filenames.

This document changes presentation binding only.

It does **not** reopen:
- WRITING GOLDEN prose;
- IZU-01..04 semantics;
- route outcomes;
- Rogue Genin Battle semantics;
- rewards;
- Registry / PL;
- World provenance.

---

# Exact backdrop table

| Story scene / route | Exact backdrop |
|---|---|
| Scene 1 — **HEAD START** | `Izuno Origin Backdrop/practical_ground_day.png` |
| Scene 2 — **THE TRAIL** | `Izuno Origin Backdrop/konoha_rooftop_pursuit_day.png` |
| Scene 2 — **TAKE THE OBVIOUS TRAIL** | continue `konoha_rooftop_pursuit_day.png` |
| Scene 2 — **LOOK FOR SOMETHING BETTER** | continue `konoha_rooftop_pursuit_day.png` |
| Scene 2 — **WORK WITH THE OTHERS** | continue `konoha_rooftop_pursuit_day.png` |
| Scene 2 — **FORGET THE TRAIL — WHERE ARE THEY GOING?** | continue `konoha_rooftop_pursuit_day.png` |
| Scene 3 — **THE SPLIT** | `Izuno Origin Backdrop/konoha_main_street.png` |
| Scene 4A — **THE RIVER** | `Izuno Origin Backdrop/river_route_day.png` |
| Scene 4B — **THE STRONGER TRAIL** | `Izuno Origin Backdrop/konoha_narrow_yard.png` |
| Scene 4C — **THE SHOUTING** | `Izuno Origin Backdrop/konoha_alleyway_day.png` |
| Scene 4C — **STEP IN** pre-Battle | continue `konoha_alleyway_day.png` |
| Scene 4C — **CALL FOR HELP** | continue `konoha_alleyway_day.png` |
| Scene 4C — **KEEP PURSUING** | continue `konoha_alleyway_day.png` |
| Scene 4D — **THE INTERCEPT** | `Izuno Origin Backdrop/konoha_main_street.png` |
| Scene 5 — **THE FINISH** — all endpoint variants | `Izuno Origin Backdrop/training_grounds_day.png` |
| Scene 6 — **WHAT THE INSTRUCTOR SAW** — all contextual variants | continue `training_grounds_day.png` |
| Scene 7 — **AFTER** + final reflection choice | continue `training_grounds_day.png` |
| **ORIGIN CLOSE** | `Izuno Origin Backdrop/konoha_main_street.png` |

---

# Continue-same-backdrop boundaries

## Opening practical

Scene 1 remains entirely on:

`Izuno Origin Backdrop/practical_ground_day.png`

Do not change backdrop between dialogue beats inside HEAD START.

The transition to Scene 2 is the first environment change.

## Trail sequence

Scene 2 and all four first pursuit-choice resolutions remain entirely on:

`Izuno Origin Backdrop/konoha_rooftop_pursuit_day.png`

The branch text may move between roof/street/drainage details, but it is one continuous pursuit presentation space.

Do not flash through multiple environment files inside those short route beats.

Scene 3 begins the next backdrop.

## Split / branch handoff

Scene 3 uses:

`Izuno Origin Backdrop/konoha_main_street.png`

Once the player commits to River / Stronger Trail / Shouting / Intercept, change once into that route's exact Scene-4 backdrop.

Do not swap again until that branch reaches its authored endpoint or Battle handoff.

## Rogue Genin branch

The entire Scene 4C encounter is one continuous physical location:

`Izuno Origin Backdrop/konoha_alleyway_day.png`

This includes:
- Academy student discovery;
- Rogue Genin reveal;
- STEP IN choice;
- CALL FOR HELP;
- KEEP PURSUING;
- any immediate Story text before leaving the confrontation.

No route selection inside Scene 4C changes the Story backdrop.

## Finish / evaluation / reflection

All Scene-5 endpoint variants converge visually onto:

`Izuno Origin Backdrop/training_grounds_day.png`

This backdrop then remains through:
- Scene 6 instructor evaluation;
- all Scene-6 conditional evaluation families;
- Scene 7 AFTER;
- the final reflection choice.

This is one continuous return/evaluation presentation stretch.

## Origin close

At the start of ORIGIN CLOSE, Wasabi has left the practical/training area and is back on the village street.

Switch to:

`Izuno Origin Backdrop/konoha_main_street.png`

Keep it through the final chase/passing-student beat and Origin completion boundary.

---

# STEP IN PL Battle environment

Exact Story/Battle environment:

`Izuno Origin Backdrop/konoha_alleyway_day.png`

The authorised Battle:

`academy_izuno_origin_rogue_genin_step_in_battle`

occurs in the same alley where Scene 4C establishes the Rogue Genin confrontation.

Do **not** substitute:
- generic training ground;
- Arena;
- practical ground;
- another Konoha alley;
- a Battle-only invented environment.

Battle portraits/cards remain owned by the Battle presentation authority.

Backdrop/environment continuity remains Writing-owned and is closed here.

---

# Post-Battle return backdrop

Both terminal Battle outcomes return first to:

`Izuno Origin Backdrop/konoha_alleyway_day.png`

Recommended existing return beat:

`izu_rogue_step_in_return`

The post-Battle Story must visibly resume in the same alley before Wasabi leaves the secondary occurrence and the pursuit endpoint resolves.

Do not jump directly from the Battle result screen to `training_grounds_day.png`.

Required flow:

`konoha_alleyway_day.png`
→ STEP IN Battle
→ Battle result / CLAIM-then-CONTINUE boundary
→ `konoha_alleyway_day.png` Story return
→ authored pursuit continuation / endpoint resolution
→ Scene 5 convergence
→ `training_grounds_day.png`

Victory and defeat use the **same** post-Battle return environment.

PL depletion does not create a different backdrop or imply injury.

---

# Backdrop-change rule

A backdrop changes because the physical Story environment changes.

It does not change:
- for every dialogue box;
- for every choice;
- merely because a branch ID changes;
- merely because Battle begins and ends in the same physical place.

Preserve the current Story benchmark:

> one physical scene can contain many readable dramatic beats without visually teleporting between them.

---

# Actor projection boundary

This backdrop closure does not change the current actor/card inventory.

Existing live bindings remain:
- Academy instructor — `NPC/izuno_instructor.png`
- Rogue Genin Story card — `Enemies/rogue_genin.png`
- Rogue Genin Battle portrait — `Enemies Portraits/rogue_genin.png`

Academy Student / Academy Student 2 / Proctor / Target card gaps remain separate projection work and do not block backdrop consumption.

---

# Final closure

**Wasabi backdrop consumption: WRITING CLOSED.**

Coding / Runtime may now consume the exact table without inference.

Preserve:

**WRITING GOLDEN != runtime implemented != installed-browser validated != Browser GOLDEN.**

**Backdrop binding closed != Browser GOLDEN.**

**Story location continuity != per-box backdrop swapping.**
