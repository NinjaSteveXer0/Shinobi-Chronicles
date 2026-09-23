# Academy Wasabi Izuno — WRITING GOLDEN / Rogue Genin Battle + World Classification Reconciliation

**Date:** 2026-09-24  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CROSS-SYSTEM RECONCILIATION — COMBAT CLOSURE PENDING**  
**Production Origin:** `academy_izuno`  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Authority consumed

WRITING GOLDEN:

`Documentation/Story/Academy_Wasabi_Izuno_Origin_WRITING_GOLDEN_2026-09-24.md`

latest approved commit:

`138a5722342eb8b1d8054f794e6e2d4649eea7b4`

Existing World source authority:

`Documentation/World/Academy Origin and Whisper Woods World Source Instance Bindings.md`

Existing opposition PL/Registry authority:

`Documentation/Registry/Awaiting Placement Character and Enemy Calibration Wave.md`

Current live main consumed at reconciliation start:

`836a36e0b3519b32d2280d31c68bf931ca0472d4`

## 2. Story remains closed

Preserve the Academy pursuit trial, route families, optional Rogue Genin interruption/Battle, contextual evaluation, final reflection and exact approved player-facing prose.

Source occurrences remain:

- IZU-01 `occ_origin_izuno_pursuit_tracking_resolution`
- IZU-02 `occ_origin_izuno_intercept_prediction_resolution`
- IZU-03 `occ_origin_izuno_pursuit_cooperation_resolution`
- IZU-04 `occ_origin_izuno_rogue_genin_interruption_resolution`

Stable World refs remain:

- Rogue Genin: `wasabi_origin_rogue_genin_01`
- affected Academy student: `wasabi_origin_interference_student`

## 3. Staged-vs-external Rogue Genin truth

Current authority does **not** close whether the Rogue Genin interruption was deliberately staged by the Academy or was a genuine external interruption.

That classification is **not materially required for Alpha runtime implementation** of the current GOLDEN Story.

Reason:

- IZU-04 already has a stable World occurrence and participant refs;
- its commit boundary depends on Wasabi's actual response/outcome, not on staged-vs-external classification;
- Battle support is carried by exact `battleOccurrenceIds` when Battle occurs;
- the GOLDEN player-facing Story no longer asserts “not part of the exercise”;
- all three player responses remain valid without morality scoring;
- instructor evaluation can consume the factual response/pursuit outcome without deciding the event's hidden provenance.

Therefore the correct Alpha status is:

> **staged-vs-external = intentionally unresolved World Truth / NOT an Alpha blocker.**

Do not:

- infer “external” because the participant is called Rogue Genin;
- infer “staged” because the occurrence happens during an Academy trial;
- write either classification into Story/runtime as fact;
- create a morality/personality score to replace the missing classification.

If future World content genuinely needs this provenance, World may author it later as an explicit fact without recommitting IZU-04.

## 4. Non-morality boundary

Locked:

```text
intervene != moral superiority
call_for_help != cowardice
keep_pursuing != selfishness / moral failure
Rogue Genin outcome != pursuit outcome
formal pursuit result != total Chronicle value
```

No alignment, virtue, personality, Protector/Escort specialisation or punitive moral score is created by these choices.

Final reflection remains player-authored interpretation, not inferred morality.

## 5. Rogue Genin identity mapping

World historical participant:

`wasabi_origin_rogue_genin_01`

consumes the existing opposition archetype/package identity:

`rogue_genin`

This is one participant viewed through two legitimate address layers:

```text
World historical occurrence ref:
wasabi_origin_rogue_genin_01

Combat/Registry opposition template:
rogue_genin
```

The Combat occurrence must preserve the exact World participant ref.

Combat does not replace the World occurrence.

The opposition template does not become a collectible Character/Entity identity merely because it is used in this Origin.

## 6. Existing PL/Registry authority

`rogue_genin` already has closed Registry/PL calibration:

Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Stats:

`23 / 22 / 21 / 10 / 14 / 15 / 24`

Base PL:

**23**

No new PL / Registry handoff is required.

Encounter/runtime presentation must not mutate Base PL.

## 7. Existing Combat palette — not yet executable closure

The existing action-ID palette is:

1. `enemy_rogue_genin_kunai_rush`
   - Bukijutsu direct.

2. `enemy_rogue_genin_shuriken_spread`
   - Bukijutsu direct;
   - projectile count is presentation, not automatic packet multiplication.

3. `enemy_rogue_genin_substitution_feint`
   - Ninjutsu defensive/setup;
   - no automatic miss/belief.

However, the Registry authority explicitly classifies `rogue_genin` among opposition identities that **must go to Combat before Coding** for exact resolution semantics / action-local numerics.

Therefore the Wasabi STEP IN Battle is not yet a safe Coding caller.

## 8. Combat closure required

Combat / Skills / Items / Weapons must now close the smallest executable package for this specific Alpha consumer.

Required output:

- exact Battle config/caller identity;
- one enemy participant based on `rogue_genin`;
- exact historical participant binding `wasabi_origin_rogue_genin_01`;
- PL23 consumption under current Battle rules;
- exact Attack PL / packet semantics for Kunai Rush;
- exact Attack PL / packet semantics for Shuriken Spread;
- exact bounded defensive/setup semantics for Substitution Feint;
- AI/action-selection legality sufficient for this Battle;
- exact win/loss/withdraw Battle result envelope under current shared Battle architecture;
- exact Story-return contract so Wasabi can resume the authored pursuit/result flow;
- exact battleOccurrenceId support for IZU-04;
- no morality or staged-vs-external inference.

Combat may not rewrite the GOLDEN Story.

## 9. Coding replacement — waits on Combat only

After Combat closes the executable package, Coding must replace the superseded compressed Wasabi expression in:

`runtime/alpha-origin-scenes-32900-a.js`

with the exact GOLDEN Story.

This is **REPLACE**, not additive patch.

Coding must preserve:

- IZU-01..04;
- exact participant refs;
- route history;
- pursuit outcome separate from Rogue Genin outcome;
- optional STEP IN Battle;
- CALL FOR HELP and KEEP PURSUING non-Battle routes;
- post-Battle return;
- contextual instructor evaluation;
- final reflection independence;
- save/load/idempotence;
- current shared Scene Board/choreography ownership;
- exact approved prose/choice labels.

Coding must not write staged-vs-external provenance because Alpha authority intentionally leaves it unresolved.

## 10. Runtime validation minimum

Before Browser Golden prove:

- each four-way opening approach;
- river route;
- stronger/false trail route;
- intercept route;
- Rogue interruption -> STEP IN -> Battle -> return;
- Rogue interruption -> CALL FOR HELP;
- Rogue interruption -> KEEP PURSUING;
- pursuit result remains separate from Rogue occurrence result;
- IZU-04 commits only when its existing factual predicate is satisfied;
- exact World participant ref survives Battle call/return;
- exact battleOccurrenceId is retained when Battle occurs;
- save/load before Rogue choice;
- save/load around Battle;
- retry does not duplicate IZU-04 or Combat occurrence;
- no morality/personality/alignment write;
- no staged/external fact invented;
- old compressed Wasabi prose cannot regain production control;
- installed-browser validation remains separate from source/headless GREEN.

## 11. Status

- Story design: **CLOSED**
- player-facing Writing: **GOLDEN**
- morality semantics: **CLOSED — NONE**
- staged-vs-external provenance: **INTENTIONALLY UNRESOLVED / NOT ALPHA BLOCKER**
- World occurrence identity: **CLOSED**
- Rogue Genin Registry/PL: **CLOSED — PL23**
- Combat executable package: **OPEN**
- Coding replacement: **WAITING ON COMBAT**
- Browser Golden: **NOT CLAIMED**

## 12. Final lock

> **Academy Wasabi's Rogue Genin interruption does not require an Alpha decision about whether the event was staged or external. The exact World occurrence and participant identity already exist. Where STEP IN launches Battle, the historical participant `wasabi_origin_rogue_genin_01` consumes the existing `rogue_genin` opposition template at Base PL23. Combat must close that template's executable action/result package before Coding replaces the superseded Wasabi runtime with the exact WRITING GOLDEN Story.**
