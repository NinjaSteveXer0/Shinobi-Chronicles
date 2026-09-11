# Arc 2 Mission 2 — Unknown Boy Timed PL Battle Outcome Authority

Date: 2026-09-11
Owner: Writing — Konoha
Mission: `arc2_m2_the_leak` / `THE LEAK`
Status: AUTHOR MODE — STORY OUTCOME CONTRACT CLOSED, pending Registry/PL + Combat executable package

## Purpose

This closes the Story-side outcome semantics for the first real Arc 2 PL Battle between Menma and the observer-safe participant `Unknown Boy`.

Writing does not author the Combat resolution itself. Combat remains authoritative for action legality, techniques, PL changes and exact Battle result. Story defines what different legitimate returned Battle states mean for narrative continuation.

## Encounter Intent

Menma's committed objective:

`capture_unknown_boy_alive_for_interrogation`

Menma tactical priority:

`block_alley_exit_and_force_close_combat`

Unknown Boy observable objective:

`escape`

The encounter is deliberately a cat-and-mouse conversion test: Menma may win the fight without winning custody.

## Timed Capture Window

The clean capture window is fewer than five completed turns.

Runtime rule:

- if `turnsElapsed < 5`, Menma can still convert a Battle win into one of the two win branches below;
- once Turn 5 begins / `turnsElapsed >= 5`, the clean capture window is gone and Unknown Boy escapes or is successfully extracted as part of the returned encounter outcome;
- there is no Turn-5 clean-capture branch.

This intentionally removes an off-by-one ambiguity while preserving Stephen's authored rule: **less than five turns wins; taking five or more turns is too slow.**

## Outcome Matrix

### A. TIME FAILURE — Unknown Boy escapes

Condition:

`turnsElapsed >= 5`

Outcome:

- Unknown Boy escapes or is extracted;
- Menma does not secure custody;
- Battle victory, if mechanically achieved too late, does not override the escape consequence;
- Story resumes from failed-custody / continuing-cat-and-mouse state;
- no automatic identity or allegiance reveal.

### B. FAST WIN, MENMA AT OR BELOW 50% BATTLE PL — costly win / information, no custody

Condition:

- Menma legitimately wins while `turnsElapsed < 5`; and
- Menma ends the Battle at `<= 50%` of his Battle PL available at encounter start.

Outcome:

- Menma wins the immediate fight;
- Menma is too depleted to convert that victory into secure custody;
- Unknown Boy escapes or is saved/extracted;
- Menma receives a bounded information reward before separation, such as the boy's name or another equivalent personally identifying clue;
- exact information must be chosen from durable identity/Knowledge authority and must not fabricate allegiance, ROOT membership, Danzō loyalty, clan truth or hidden World Truth;
- this is a **Battle win with custody failure**, not a loss.

### C. FAST WIN, MENMA ABOVE 50% BATTLE PL — custody / interrogation branch

Condition:

- Menma legitimately wins while `turnsElapsed < 5`; and
- Menma ends the Battle at `> 50%` of his Battle PL available at encounter start.

Outcome:

- Menma wins;
- Menma successfully converts the win into immediate custody/control of Unknown Boy;
- Story enters an interrogation/custody branch rather than an automatic return-to-Hokage-office cut;
- custody does not guarantee cooperation, confession, identity reveal, ROOT proof or survival;
- interrogation can become harsh and dangerous. Shinobi Chronicles is not required to preserve a PG outcome. Later player/NPC choices and legitimate CE/Combat/Story consequences may result in serious injury or death, including the possibility that Menma does **not** bring Unknown Boy back alive;
- no death is pre-authored here. It must arise from later legitimate choices/resolution.

## PL Threshold Authority

The 50% threshold refers to **Menma's remaining Battle PL relative to his Battle PL at encounter start**, not a newly invented HP/health system and not Unknown Boy's PL.

This preserves existing PL doctrine and avoids collapsing Battle PL into a separate health resource.

## Required Return Fields

Combat / CE return must keep these facts separate:

- `battleResult`
- `turnsElapsed`
- `menmaBattlePLStart`
- `menmaBattlePLEnd`
- `menmaBattlePLPercentRemaining`
- `unknownBoyEscapeResult`
- `unknownBoyCaptureResult`
- `unknownBoyExtractionOrRescueResult`
- `menmaSurvivalState`
- `unknownBoySurvivalState`
- `observedTechniqueRefs[]`
- `informationRewardRef` when branch B legitimately earns one

## Non-Collapse Locks

- Battle victory != custody automatically.
- Battle victory != interrogation automatically.
- Battle victory != identity reveal automatically.
- Battle victory != allegiance/ROOT proof automatically.
- Capture intent != capture result.
- Escape result != Battle loss necessarily.
- Information reward != omniscient truth reveal.
- Custody != guaranteed survival.
- Interrogation != guaranteed cooperation.
- Story occurrence != Battle occurrence.

## Visual / Registry Continuity

The later Character Card requirement remains `Unknown Boy` until observer Knowledge legitimately changes.

Do not generate an image from this document. Project image lock remains active unless Stephen uses the exact phrase `generate now` in an active visual request.
