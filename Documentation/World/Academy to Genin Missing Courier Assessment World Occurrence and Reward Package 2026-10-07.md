# Shinobi Chronicles — Academy → Genin Missing Courier Assessment World Occurrence and Reward Package

**Date:** 2026-10-07  
**Owner:** World / Missions / Events / Rewards  
**Source handoff:** GitHub #577  
**Status:** **WORLD / REWARDS CLOSED — DOWNSTREAM COMBAT / UI / RUNTIME CONSUMPTION REQUIRED**

---

# 1. Purpose

This document closes the World / Missions / Events / Rewards package for the first real Academy → Genin Promotion benchmark.

It consumes without reopening:

- `Documentation/Coordination/Academy_to_Genin_Promotion_Benchmark_Consolidation_and_Step7_Activation_2026-10-07.md`;
- `Documentation/Story/Academy_to_Genin_Missing_Field_Courier_Benchmark_2026-10-06.md`;
- `Documentation/Coordination/Academy_to_Genin_CE_World_Promotion_Assessment_Phase_2_Direction_2026-10-01.md`;
- `Documentation/Rank/Academy to Genin Variable Promotion Requirement Packages 2026-10-01.md`;
- `Documentation/Rank/Academy to Genin Promotion Package New Game Seed Amendment 2026-10-01.md`;
- `Documentation/World/Decision Sensitive Mission Arc Debrief Reward Evaluation and Arc 1 Calibration 2026-09-13.md`;
- `Documentation/World/Battle Reward Full Disclosure and Causal Attribution Rule 2026-09-19.md`;
- `Documentation/Coordination/World_Reward_Portfolio_Authoring_Firewall_and_Reward_Spectrum_Contract_2026-09-27.md`;
- `Documentation/World/Origin Starting Purse Battle Ryō Baseline and Hidden CE Reward Projection Rule 2026-09-27.md`;
- current Origin/Promotion Chronicle Receipt presentation law.

This package does **not** author Rank result logic, hidden requirement identities, Battle opposition, UI layout, Story prose, teammate intent semantics or Genin roster-transition implementation.

Canonical:

> **One real Promotion assessment occurrence produces one factual World history. Rank evaluates that history; Rewards compensates exact operational results; UI projects committed truth. None of those layers owns the others.**

---

# 2. Stable benchmark identity

Assessment family:

`academy_to_genin_field_readiness_assessment`

Scenario:

`academy_genin_missing_courier_dispatch_v1`

Player-facing mission:

> **Locate the missing field courier, recover the sealed dispatch, and return it to the examiner.**

Stable occurrence-local participants/objects:

- courier: `academy_genin_missing_courier_dispatch_courier_01`;
- sealed dispatch: `academy_genin_missing_courier_dispatch_packet_01`;
- optional hostile Story/World ref: `academy_genin_missing_courier_dispatch_rogue_01`;
- examiner role: `academy_genin_field_readiness_examiner_role_v1`.

These refs are occurrence addresses. They do not imply Registry ownership, acquisition or a named canon identity.

---

# 3. Attempt and occurrence identity

The Promotion institution / Rank layer supplies the committed `assessmentAttemptId` after the player explicitly begins the assessment.

World does not create an attempt from inspection/UI activity.

World mission instance:

`mission_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>`

Authoritative World occurrence root:

`occ_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>`

Reward snapshot identity:

`reward_snapshot_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>`

The World occurrence carries at minimum:

- `assessmentFamilyId`;
- `assessmentScenarioId`;
- `assessmentAttemptId`;
- `assessmentSubjectStableId`;
- exact current-team participant refs at attempt commit;
- parent Promotion-lineage / Rank-transition ref supplied by the owning system;
- current mission phase;
- courier state;
- dispatch holder/custody state;
- dispatch seal/integrity state;
- hostile-pressure state;
- Battle occurrence/result refs where a legal Battle later occurs;
- current objective state;
- safety/integrity abort state;
- return/debrief state;
- terminal World result;
- reward transaction refs;
- Rank result ref as read-only downstream authority once available.

One attempt = one immutable occurrence lineage.

---

# 4. Eligibility and actionability

Assessment availability is not owned by World.

World registers/starts this mission only when all are true:

1. Arena / Promotion authority has established that Academy → Genin assessment is available for the selected subject;
2. the player has explicitly committed a new assessment attempt;
3. a stable `assessmentAttemptId` exists;
4. `assessmentScenarioId = academy_genin_missing_courier_dispatch_v1`;
5. the current subject's immutable Promotion package is one of the six package IDs this scenario supports;
6. no terminal World occurrence already exists for the same `assessmentAttemptId`.

Opening Promotion, inspecting the Assessment Record, changing team presentation, opening a Receipt, save/load or UI refresh does not start the mission.

World does not read hidden requirement identities to decide reward value.

---

# 5. World registration / route

Exact host chain:

`KON-P01`

→ `KON-P10`

→ `whisper_woods`

→ `fire_whisper_woods_north_ravine`

→ `whisper_woods`

→ `KON-P10`

→ `KON-P01`

Required World phases:

1. `agen_m01_phase_attempt_committed_v1`;
2. `agen_m01_phase_briefing_v1`;
3. `agen_m01_phase_outbound_konoha_v1`;
4. `agen_m01_phase_field_search_v1`;
5. `agen_m01_phase_courier_contact_v1`;
6. `agen_m01_phase_hostile_pressure_v1` where triggered;
7. `agen_m01_phase_extraction_v1`;
8. `agen_m01_phase_return_konoha_v1`;
9. `agen_m01_phase_examiner_handoff_v1`;
10. `agen_m01_phase_debrief_v1`;
11. `agen_m01_phase_terminal_v1`.

No assessment-panel teleport from `KON-P01` to the ravine is authorised.

---

# 6. Arc-1 North Ravine collision firewall

`fire_whisper_woods_north_ravine` is reused geography only.

The Promotion occurrence must never activate, clone, satisfy, mutate or masquerade as:

- `arc1_m1_whisper_major_contact`;
- `arc1_m1_whisper_major_contact_event`;
- `scene_arc1_m1_whisper_major_contact`;
- the Arc-1 Rogue Shinobi / Smuggler / Unknown Operative participant lineage;
- any Arc-1 completion/reward state.

Hard rules:

- host/location lookup may be shared;
- occurrence IDs may not be shared;
- participant IDs may not be silently substituted;
- Promotion state is scoped to `assessmentAttemptId`;
- Arc-1 state is never a fallback for missing Promotion state;
- Promotion rewards do not consume Arc-1 reward receipts;
- opening/closing one occurrence cannot close the other.

Canonical:

> **Same place != same event.**

---

# 7. Courier factual lifecycle

Initial state:

`agen_m01_courier_overdue_unlocated_v1`

Allowed authored states:

- `agen_m01_courier_overdue_unlocated_v1`;
- `agen_m01_courier_found_injured_stable_v1`;
- `agen_m01_courier_found_injured_worsened_v1`;
- `agen_m01_courier_stabilized_extractable_v1`;
- `agen_m01_courier_extraction_active_v1`;
- `agen_m01_courier_recovered_with_team_v1`;
- `agen_m01_courier_transferred_to_konoha_assistance_v1`;
- `agen_m01_courier_unrecovered_at_terminal_closure_v1`.

Search result mapping:

- `agen_m01_search_follow_fresh_sign_v1` successful authored route -> `agen_m01_courier_found_injured_stable_v1`;
- `agen_m01_search_check_waypoint_v1` authored delayed route -> `agen_m01_courier_found_injured_worsened_v1`.

Stabilisation may move either located-injured state to `agen_m01_courier_stabilized_extractable_v1` only when the owning field/medical resolver says the action succeeded.

The benchmark does not infer courier death from delay, Battle or failure.

A later owner may commit injury/death only through exact separate authority.

---

# 8. Sealed dispatch object / custody lifecycle

Object ref:

`academy_genin_missing_courier_dispatch_packet_01`

Initial holder:

`academy_genin_missing_courier_dispatch_courier_01`

Allowed custody states:

- `agen_m01_dispatch_courier_custody_v1`;
- `agen_m01_dispatch_team_controlled_custody_v1` with exact `custodyActorRef`;
- `agen_m01_dispatch_hostile_custody_v1` where a legal resolver commits transfer;
- `agen_m01_dispatch_examiner_custody_v1` after valid handoff;
- `agen_m01_dispatch_lost_beyond_current_recovery_v1`.

Seal/integrity states:

- `agen_m01_dispatch_sealed_intact_v1`;
- `agen_m01_dispatch_seal_broken_unauthorised_v1`;
- `agen_m01_dispatch_integrity_altered_v1`;
- `agen_m01_dispatch_substitution_attempted_v1`.

The dispatch is an occurrence-bound mission object.

It is **not** generic player Inventory ownership merely because the subject carries it.

Controlled custody survives Story → Battle → Story transitions without teleporting holder state.

If another teammate has custody outside the protagonist's Battle participation, protagonist Battle defeat does not transfer the dispatch by implication.

---

# 9. Hostile-pressure World occurrence

Optional hostile-pressure child occurrence:

`occ_academy_genin_missing_courier_hostile_pressure_v1::<assessmentAttemptId>`

World pressure states:

- `agen_m01_hostile_searching_outer_area_v1`;
- `agen_m01_hostile_contact_confirmed_v1`;
- `agen_m01_hostile_contact_broken_v1`;
- `agen_m01_hostile_battle_requested_v1`;
- `agen_m01_hostile_disengaged_without_dispatch_v1`;
- `agen_m01_hostile_escaped_with_dispatch_v1` where exact owning resolvers commit that fact.

World may make the hostile contact actionable from current Story/participant/geography state.

World does not define:

- PL;
- Stats;
- Skills;
- Battle AI;
- Battle participants;
- Victory/defeat mechanics;
- Battle reward amount.

A PL Battle may open only after Combat publishes the legal package/caller envelope.

---

# 10. Return / handoff / debrief

A viable return proceeds:

field area

→ `whisper_woods`

→ `KON-P10`

→ `KON-P01`.

Dispatch handoff receipt:

`agen_m01_dispatch_returned_to_examiner_v1`

Courier recovery receipts where factual:

- `agen_m01_courier_returned_alive_v1`;
- `agen_m01_courier_transferred_to_konoha_assistance_v1`.

Debrief receipt:

`agen_m01_debrief_committed_v1`

The debrief records what the assessment subject legitimately knows and reports.

A slower search, Battle loss, retreat or mistaken route reported accurately does not create an integrity abort.

---

# 11. Terminal World states

Exactly one terminal World state commits per assessment attempt:

### `agen_m01_terminal_objective_completed_v1`

Requires the Writing-authorised full mission-success facts:

- courier located;
- dispatch secured;
- same dispatch returned to examiner;
- seal intact;
- courier recovered/extracted alive or transferred to legitimate Konoha assistance;
- factual debrief completed;
- no safety/integrity abort.

Sets:

`missionObjectiveCompleted = true`

Rank still resolves Promotion separately.

### `agen_m01_terminal_objective_failed_v1`

Formal mission objective cannot be completed in the current attempt and the attempt closes.

Sets:

`missionObjectiveCompleted = false`

Preserve all factual history/rewards already legitimately earned.

### `agen_m01_terminal_withdrawn_unresolved_v1`

Subject/assessment attempt withdraws while the formal objective remains unresolved and the occurrence closes.

Sets:

`missionObjectiveCompleted = false`

### `agen_m01_terminal_integrity_abort_v1`

A Writing-authorised integrity violation is factually committed by the owning resolver.

### `agen_m01_terminal_safety_abort_v1`

A Writing-authorised safety violation is factually committed by the owning resolver.

World terminal state does not decide the Rank result.

---

# 12. Retry / new-attempt identity

Retry creates:

- a new `assessmentAttemptId`;
- a new `mission_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>`;
- a new `occ_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>`;
- a new courier/dispatch occurrence instance;
- a new reward snapshot identity.

Retry does **not**:

- reroll `promotionRequirementPackageId`;
- erase previous failed/withdrawn/aborted attempt history;
- reuse previous one-shot reward keys;
- reuse previous participant-action receipts as new facts;
- resurrect the prior occurrence as though it never happened.

Same playthrough + same Character + same Academy → Genin transition keeps the same immutable requirement package.

---

# 13. Journey / Mission projection

Player-facing mission title:

**MISSING FIELD COURIER**

Player-facing objective:

**Locate the missing field courier, recover the sealed dispatch, and return it to the examiner.**

Current-task projection may advance through these factual stages:

1. **Report to the field-readiness examiner.**
2. **Leave Konoha through the village gate.**
3. **Search the northern Whisper Woods route.**
4. **Locate the missing courier.**
5. **Secure the sealed dispatch.**
6. **Get the courier and dispatch back to Konoha.**
7. **Return the sealed dispatch to the examiner.**
8. **Report what happened.**

Only show a task when the protagonist legitimately knows it is current/actionable.

Do not expose:

- hidden package ID;
- hidden requirement identity;
- hidden satisfaction state;
- examiner score;
- pass probability;
- sourceOccurrence IDs;
- internal reward IDs.

---

# 14. Reward philosophy for this assessment

This is a real Konoha field operation used as a Promotion assessment.

Rewards therefore acknowledge **operational value actually returned to Konoha**, not hidden Rank boxes.

The package has two independently factual mission-payment components plus one full-completion resupply entitlement.

No reward amount depends on:

- which hidden requirement package the Character has;
- which hidden slot was satisfied;
- whether the examiner later reveals a slot;
- Promotion PASS/FAIL by itself;
- morality;
- taking the combat route rather than a non-combat route.

Canonical:

> **Reward the courier/dispatch result. Rank judges readiness separately.**

---

# 15. Exact mission reward table

## A. Sealed dispatch return

Reward source:

`agen_m01_reward_dispatch_return_ryo_01`

Eligibility:

- the same occurrence-bound dispatch reaches `agen_m01_dispatch_examiner_custody_v1`;
- seal state is `agen_m01_dispatch_sealed_intact_v1`;
- no substitution/alteration fact exists;
- the reward source has not already committed for this attempt.

Reward:

**150 Ryō**

Player-facing Receipt line:

> **150 Ryō — Returned the sealed dispatch to the examiner.**

This may pay on an unsuccessful assessment if the dispatch was legitimately returned intact but another required mission objective failed.

It does not pay for merely holding the dispatch once.

---

## B. Courier recovery

Reward source:

`agen_m01_reward_courier_recovery_ryo_01`

Eligibility:

- exact courier reaches `agen_m01_courier_recovered_with_team_v1` or `agen_m01_courier_transferred_to_konoha_assistance_v1`;
- recovery is legitimate and occurrence-bound;
- the reward source has not already committed for this attempt.

Reward:

**100 Ryō**

Player-facing Receipt line when returned with team:

> **100 Ryō — Brought the missing courier back alive.**

Player-facing Receipt line when transferred to care:

> **100 Ryō — Got the missing courier safely into Konoha care.**

This may pay on an unsuccessful assessment when the courier was genuinely recovered but the dispatch objective was lost.

---

## C. Full-completion field resupply

Reward source:

`agen_m01_reward_full_completion_resupply_01`

Eligibility:

- terminal state = `agen_m01_terminal_objective_completed_v1`;
- both A and B factual predicates are satisfied;
- no safety/integrity abort;
- the entitlement has not already committed for this attempt.

Reward:

**Field Recovery Pill ×1**

Existing Item ID:

`field_recovery_pill`

Current rarity:

**Common**

This is a Konoha post-field resupply entitlement, not hostile loot.

Player-facing Receipt line:

> **Field Recovery Pill ×1 — Konoha replenished your field kit after the courier run.**

Inventory/Acquisition runtime owns the exact ownership transaction. World owns the entitlement and cause.

---

# 16. Full-success material package

A full mission-objective completion therefore grants exactly:

- **250 Ryō total** from two independently factual sources;
- **Field Recovery Pill ×1**.

Do not display this as one unexplained `250 Ryō` lump if the Receipt supports causal lines.

Preferred player-facing breakdown:

- **150 Ryō — Returned the sealed dispatch to the examiner.**
- **100 Ryō — Brought the missing courier back alive.** / **Got the missing courier safely into Konoha care.**
- **Field Recovery Pill ×1 — Konoha replenished your field kit after the courier run.**

Promotion PASS does not add another cash reward in this package.

The Rank transition / Genin roster transition is its own consequence, not a Rewards substitute.

---

# 17. Partial / failure / withdrawal rewards

## Dispatch returned, courier not recovered

- dispatch-return reward: **150 Ryō**;
- courier-recovery reward: 0;
- completion resupply: 0;
- mission objective may still be unsuccessful under Writing authority;
- Rank result remains Rank-owned.

## Courier recovered, dispatch lost/unreturned

- dispatch-return reward: 0;
- courier-recovery reward: **100 Ryō**;
- completion resupply: 0;
- mission objective unsuccessful;
- Rank result remains Rank-owned.

## Neither operational value returned

- mission Ryō: 0;
- completion resupply: 0.

## Withdrawal after a legitimate partial result

Already-committed A/B reward facts remain valid if their exact operational predicates were completed before terminal closure.

Merely attempting a route does not pay.

## Safety / integrity abort

A safety/integrity abort authorises **no new assessment-mission material payout after the abort commits**.

Any reward transaction already lawfully committed before the abort remains historical truth and is not clawed back unless a separate explicit institutional authority says otherwise.

No reward is granted for satisfying a hidden requirement slot.

---

# 18. Optional PL Battle reward boundary

The hostile Battle seam is **not yet authored by Combat**.

World therefore does not invent a Battle opponent package or exact Battle Ryō amount here.

When Combat closes a legal PL Battle package:

- a qualifying player Battle victory must award non-zero Ryō under the global Battle-money rule;
- any special Battle Item/Weapon/material reward must be separately causal and authorised;
- Battle reward is separate from the mission A/B/C package above;
- Battle victory does not satisfy Promotion automatically;
- Battle defeat/withdrawal does not cancel mission rewards whose factual predicates were already completed;
- Battle reward must have its own source/occurrence identity and idempotence key.

No runtime may infer a Battle reward from `agen_m01_contact_hold_line_v1` before Combat authorises the Battle.

---

# 19. Development / evidence / hidden EXP boundary

This World package grants **no fixed generic Character EXP, direct Stat points or hidden EXP merely for mission completion, Rank evidence satisfaction or Promotion result**.

Preserve current action-time authority:

- exact Battle technical-discipline/Stamina development when Combat/Progression commits it;
- exact field/medical/tracking/specialist development or Special Jōnin evidence only where the owning resolver and Progression authority establish the factual predicate;
- Rank readiness evidence from this assessment remains Rank-owned and is not converted into XP/cash;
- failure/withdrawal does not erase already-committed legitimate Development/evidence.

A button label such as **Follow the fresh trail**, **Stabilize the courier first** or **Cover the approach** does not by itself mint XP.

The factual action/result does.

---

# 20. Reward Spectrum Audit

## Factual sources

- sealed dispatch custody/integrity/return;
- courier recovery/transfer;
- full mission-objective completion;
- exact participant actions and resolver outcomes;
- optional Battle only after Combat authority exists.

## Economic / Ryō

**YES — AUTHORISED**

- 150 Ryō for intact dispatch return;
- 100 Ryō for courier recovery;
- optional Battle cash later from Combat-authored Battle source.

## Items / materials

**YES — AUTHORISED**

- Field Recovery Pill ×1 on full mission completion as Konoha resupply.

## Weapons / Equipment

**NO — FACTS DO NOT SUPPORT.**

## Skills / technique access

**NO DIRECT UNLOCK.**

Any later training opportunity must come from separate authority.

## Summons / Familiars / Tailed-Beast access

**NOT APPLICABLE.**

## Enhancements / transformations / source powers

**NOT APPLICABLE.**

## Ninjutsu / Taijutsu / Genjutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Stamina

**ACTION-TIME OWNER AUTHORITY ONLY.**

No fixed mission-completion EXP.

## Fieldcraft / Special Jōnin evidence

**OWNER / ACTION-TIME AUTHORITY ONLY.**

Do not convert hidden Rank evidence into Special Jōnin evidence by implication.

## Knowledge / intelligence

**YES.**

Exact player-known facts may include waypoint absence, courier testimony, hostile identity-as-pursuer, dispatch condition and route result.

## Relationship / Shared History

**YES.**

Exact subject/team/courier/hostile/examiner history persists according to observer Knowledge and participation.

## Reputation / Recognition

**YES, INSTITUTIONAL ASSESSMENT HISTORY.**

The examiner/Promotion institution retains the factual attempt/result and Rank-owned assessment evidence.

## Access / services / training

**RANK-RESULT / SEPARATE AUTHORITY.**

Promotion PASS may make the existing Genin roster transition actionable. Rewards does not grant Rank.

## Future World / Story opportunity

**YES — FACTUAL HISTORY MAY BE CONSUMED LATER.**

No guaranteed callback is fabricated here.

## Acquisition / roster / representation eligibility

**NO REWARD-SIDE OWNERSHIP CHANGE.**

Genin roster transition remains Rank/Acquisition/runtime authority after Promotion success.

## Chronicle factual consequence

**YES — PRIMARY NON-MATERIAL CHANNEL.**

Successful and unsuccessful attempts both persist.

## Duplicate / idempotence key

Every material source dedupes by:

`(worldOccurrenceId, rewardSourceId)`

with the full-completion Item entitlement additionally preserving exact Item ID and quantity.

## Player-facing projection

Show reward + ordinary-language cause.

Never expose raw reward IDs, source IDs, predicates, hidden Rank state or CE machinery.

---

# 21. Reward commit / Receipt timing

At terminal assessment closure:

1. read committed occurrence facts;
2. evaluate A/B/C independently;
3. preserve any already-committed reward source;
4. commit missing eligible reward transactions exactly once;
5. persist `reward_snapshot_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>`;
6. let Rank resolve/attach authoritative Promotion result through its own authority;
7. project the read-only Promotion Chronicle Receipt.

Receipt reopen, Assessment Record reopen, save/load, browser refresh, UI rerender or retry-selection UI cannot recommit rewards.

Reward values never reroll.

---

# 22. Promotion Chronicle Receipt facts supplied by World / Rewards

World/Rewards supplies exact committed facts for the following player-facing sections where non-empty.

## YOUR DECISIONS

Consume Writing intent receipts only; World does not rewrite their meaning.

## TEAM / PARTICIPANT ACTIONS

Observer-safe teammate/courier/hostile facts from the same occurrence.

## WHAT HAPPENED

- route taken;
- courier condition/recovery state;
- dispatch holder/seal/final state;
- hostile-contact/Battle/evasion result;
- return/debrief result.

## PROMOTION RESULT

Rank-owned read-only result only.

## HISTORY CREATED

Shared occurrence/history facts that the subject is entitled to know.

## DEVELOPMENT / EVIDENCE

Only player-visible Development already committed by owning systems and legitimately disclosed assessment rationale.

Do not expose hidden requirement identities/weights/satisfaction.

## REWARDS

Use natural player-facing cause copy:

- `150 Ryō — Returned the sealed dispatch to the examiner.`
- `100 Ryō — Brought the missing courier back alive.`
- or `100 Ryō — Got the missing courier safely into Konoha care.`
- `Field Recovery Pill ×1 — Konoha replenished your field kit after the courier run.`
- later exact Battle reward lines only after Combat closes them.

Do not show internal IDs.

## NEWLY ACTIONABLE

Consume authorised state only:

- successful Rank result -> existing Genin roster transition;
- unsuccessful/withdrawn -> retry / compatible alternate assessment / return to Konoha as authorised;
- newly known World opportunity only if independently created by the occurrence.

---

# 23. Compatibility with all six Academy → Genin packages

This World/Rewards package is package-agnostic.

It supports exactly the same six package IDs already closed by Rank/CE/Writing:

- `academy_genin_fr_pkg_information_team_v1`;
- `academy_genin_fr_pkg_information_combat_v1`;
- `academy_genin_fr_pkg_information_objective_v1`;
- `academy_genin_fr_pkg_team_combat_v1`;
- `academy_genin_fr_pkg_team_objective_v1`;
- `academy_genin_fr_pkg_combat_objective_v1`.

Why:

- reward amount does not depend on hidden package identity;
- no reward pays for hidden requirement satisfaction;
- route/participant facts remain intact for Rank evidence consumption;
- optional Battle is not required for mission success or reward entitlement A/B/C;
- success/failure history remains available to Rank;
- retry preserves package truth while creating a new occurrence/reward lineage.

No package-specific reward optimisation route is created.

---

# 24. Downstream dependencies

## Combat / Skills / Items / Weapons — REQUIRED BEFORE BATTLE ACTIVATION

Close only the optional hostile Battle seam:

- exact opposition package;
- exact Battle participant/caller envelope;
- exact return-state projection;
- exact non-zero victory Ryō source/amount;
- any special Battle reward only if causal;
- no Battle-victory-to-Promotion collapse.

## UI / Assets — REQUIRED FOR PLAYER PRESENTATION

Consume:

- mission/Journey projection;
- Assessment Record;
- courier/dispatch known-state presentation;
- Promotion result/Receipt;
- reward lines above;
- no hidden Rank/source-ID leakage.

## Inventory / Acquisition / Runtime — REQUIRED FOR ITEM MATERIALISATION

Materialise the committed `field_recovery_pill ×1` entitlement exactly once when eligible.

The dispatch remains mission custody, not generic Inventory ownership.

## Coding / Runtime — AFTER OWNER PACKAGES CLOSE

Implement:

- occurrence state machine;
- custody/seal persistence;
- route/return flow;
- reward evaluation/snapshot;
- save/load/idempotence;
- optional Battle caller only after Combat closure;
- Receipt projection;
- Rank result consumption;
- retry/new-attempt lineage;
- Arc-1 collision regressions.

---

# 25. Minimum regression matrix

Runtime must eventually prove:

1. Promotion inspection alone creates no World occurrence;
2. explicit attempt commit creates one occurrence with one `assessmentAttemptId`;
3. route physically uses `KON-P01 -> KON-P10 -> whisper_woods -> north ravine` and returns;
4. Arc-1 North Ravine occurrence is never activated/mutated;
5. fresh-trail vs waypoint-first produces correct courier timing/condition;
6. dispatch custody persists across Story/Battle/Story;
7. protagonist Battle defeat cannot steal dispatch from another factual custodian;
8. full mission success commits 150 + 100 Ryō + Field Recovery Pill ×1 once;
9. dispatch-only partial commits 150 Ryō once;
10. courier-only partial commits 100 Ryō once;
11. neither-value failure commits no mission material reward;
12. hidden requirement satisfaction creates no reward transaction;
13. Promotion PASS/FAIL does not rewrite reward values;
14. Receipt reopen/save-load/refresh cannot duplicate rewards;
15. retry creates new attempt/occurrence/reward lineage while preserving prior history;
16. retry does not reroll immutable Promotion package;
17. optional Battle cannot open before Combat package exists;
18. any later Battle reward remains separate from mission reward;
19. player-facing Receipt uses natural causes and no raw IDs;
20. successful Rank result can continue into the existing Genin roster transition without Rewards owning that mutation.

---

# Final lock

> **The first Academy → Genin assessment is now a fully identified World mission occurrence: one explicit attempt, one courier/dispatch lineage, real travel through Konoha and Whisper Woods, exact custody and terminal state, no Arc-1 North-Ravine collision, persistent unsuccessful history and deterministic retry lineage. Operational reward is equally exact: 150 Ryō for returning the intact sealed dispatch, 100 Ryō for recovering the missing courier alive, and one Common Field Recovery Pill as Konoha resupply on full mission completion. These rewards are independent from hidden readiness requirements and Promotion PASS/FAIL. Optional Battle rewards remain separate and wait on Combat authority. The Promotion Chronicle Receipt projects committed facts and human-readable causes only; it never grants or rerolls them.**