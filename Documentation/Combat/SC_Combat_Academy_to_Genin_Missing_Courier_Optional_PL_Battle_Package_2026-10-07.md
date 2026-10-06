# Shinobi Chronicles — Academy → Genin Missing Courier Optional PL Battle Package

**Date:** 2026-10-07  
**Owner:** Combat / Skills / Items / Weapons  
**Source handoff:** GitHub #583  
**Promotion tracker:** #446 / #449 Step 7  
**Status:** **COMBAT DESIGN CLOSED — UI / RUNTIME / OWNER-BROWSER VALIDATION SEPARATE**

---

## 1. Purpose

This document closes the smallest exact PL Battle package required by the first real Academy → Genin Field Readiness benchmark:

`academy_genin_missing_courier_dispatch_v1`.

It consumes without reopening:

- `Documentation/Coordination/Academy_to_Genin_Promotion_Benchmark_Consolidation_and_Step7_Activation_2026-10-07.md`;
- `Documentation/Story/Academy_to_Genin_Missing_Field_Courier_Benchmark_2026-10-06.md`;
- `Documentation/World/Academy to Genin Missing Courier Assessment World Occurrence and Reward Package 2026-10-07.md`;
- `Documentation/Rank/Academy to Genin Variable Promotion Requirement Packages 2026-10-01.md`;
- `Documentation/Registry/Academy Iwabee Origin Rogue Genin Registry and PL Mapping 2026-09-27.md`;
- `Documentation/Combat/SC_Combat_Academy_Wasabi_Rogue_Genin_PL_Battle_Closure_2026-09-24.md`;
- `Documentation/World/Origin Starting Purse Battle Ryō Baseline and Hidden CE Reward Projection Rule 2026-09-27.md`;
- `Documentation/World/Battle Reward Full Disclosure and Causal Attribution Rule 2026-09-19.md`.

This package does **not** author a second Promotion resolver, a new hostile person, a new Rogue Genin numerical template, courier/dispatch custody truth, a morality consequence, a full Arena UI redesign, or a new Battle system.

Canonical:

> **Story/World participant identity != reusable opposition template. Battle occurrence != mission occurrence. Battle victory != Promotion. Battle result != courier/dispatch custody truth.**

---

# PART I — EXACT BATTLE IDENTITY

## 2. Battle trigger

The Battle is legal only from the already-authored hostile-contact intent:

`agen_m01_contact_hold_line_v1` — **Hold the line.**

It is optional.

The other hostile-contact intents remain capable of non-Battle resolution where factual state permits:

- `agen_m01_contact_extract_under_cover_v1`;
- `agen_m01_contact_use_ravine_route_v1`.

Combat must not open this encounter merely because the hostile exists in the occurrence.

Battle launch requires the Story/World caller to commit that the protagonist's hold-line intent plus current participant positions/current factual pressure require direct combat.

## 3. Stable Combat IDs

Battle config:

`battle_cfg_academy_genin_missing_courier_hold_line_v1`

Encounter:

`enc_academy_genin_missing_courier_rogue_hold_line_v1`

Battle objective:

`battle_obj_academy_genin_hold_line_repel_rogue_v1`

Battle occurrence:

`battle_occ_academy_genin_missing_courier_hold_line_v1::<assessmentAttemptId>`

Source World hostile-pressure occurrence:

`occ_academy_genin_missing_courier_hostile_pressure_v1::<assessmentAttemptId>`

Parent mission occurrence:

`occ_academy_genin_missing_courier_dispatch_v1::<assessmentAttemptId>`

A retry/new assessment attempt creates a new Battle occurrence because it has a new `assessmentAttemptId`.

The Battle occurrence ID may never reuse an Arc-1 North Ravine occurrence ID.

---

## 4. Historical hostile identity vs Combat template

Historical Story/World participant:

`academy_genin_missing_courier_dispatch_rogue_01`

Combat opposition template:

`rogue_genin`

Exact mapping:

```text
historicalParticipantRef = academy_genin_missing_courier_dispatch_rogue_01
oppositionTemplateId = rogue_genin
```

The project already owns `rogue_genin` as a reusable Enemy/Opposition template. It is the same template already consumed by distinct Wasabi/Iwabee historical Rogue Genin participants.

Therefore:

- do not create `academy_genin_missing_courier_rogue_template`;
- do not create a new persistent person merely for Combat;
- do not substitute Wasabi's or Iwabee's historical Rogue participant;
- do not substitute the Arc-1 North Ravine Rogue Shinobi;
- do not infer clan, Bloodline, special lineage, morality or collectible admission.

Player-facing opponent label may use:

**ROGUE GENIN**

where the current presentation owner legitimately projects the existing opposition template.

---

# PART II — PL / ACTION PACKAGE

## 5. Exact Rogue Genin PL package

Registry/PL authority is reused unchanged.

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Base Stats:

`23 / 22 / 21 / 10 / 14 / 15 / 24`

Base PL:

**23**

For this occurrence:

- Current Stats initialise from the template Base Stats;
- Current PL = **23**;
- absent separately authorised state, Effective Stats initialise equal to Current Stats;
- underlying Battle PL maximum = **23**;
- Remaining Battle PL at ordinary entry = **23**;
- Stamina = **24** for the current shared Stamina mitigation stage;
- no hidden assessment scaling;
- no candidate-level scaling;
- no Rank multiplier;
- no team-size multiplier;
- no random PL variation;
- no hidden Speed/accuracy/evasion/Defense scalar.

The assessment subject and any legitimate allied Battle participants enter using their current canonical Character / Current / Effective / Battle state at call time. Combat does not reset them to Academy Base values and does not grant an assessment-only buff.

## 6. Exact Rogue Genin action palette

Reuse the already-closed three-action `rogue_genin` package. Do not fork it for Promotion.

### `enemy_rogue_genin_kunai_rush` — Kunai Rush

- class: **ATTACK / BUKIJUTSU**;
- target: current legal active player-side Battle target;
- Attack PL: **9**;
- one direct mitigable packet;
- ordinary Stamina mitigation;
- no automatic Bleed, Stun, displacement or extra packet;
- no hidden Speed/accuracy/evasion modifier.

### `enemy_rogue_genin_shuriken_spread` — Shuriken Spread

- class: **ATTACK / BUKIJUTSU**;
- target: current legal active player-side Battle target;
- Attack PL: **7**;
- one direct mitigable packet despite multi-projectile presentation;
- ordinary Stamina mitigation;
- no per-projectile random rolls;
- no automatic Bleed, Stun or pin;
- no hidden hit/miss system.

### `enemy_rogue_genin_substitution_feint` — Substitution Feint

- class: **NINJUTSU / DEFENSIVE SETUP**;
- target: self;
- once per Battle;
- establishes `rogue_genin_substitution_feint_ready`;
- next qualifying single-target direct mitigable Attack-PL packet against the Rogue before its next action opportunity is reduced by **40% before Stamina**;
- state consumes on that qualifying packet or expires at the start of the Rogue's next action opportunity;
- selecting the action spends its once-per-Battle use whether consumed or expired;
- no damage/counterattack/free reposition/forced target change/random miss.

## 7. Enemy action selection

Preserve the current shared eligibility-first scheduler:

1. establish exact eligible actions;
2. apply randomness only among eligible actions;
3. never invent a fallback Basic Attack.

Kunai Rush / Shuriken Spread are eligible while the Rogue is Battle-capable and has a legal current player-side target.

Substitution Feint is eligible only while unspent and no same-source Feint state is already live.

Equal-weight random selection among currently eligible Rogue actions is acceptable under the existing reusable template contract.

No hidden weighting from assessment package, Promotion requirements, candidate Rank, mission reward state, courier state, dispatch holder, morality or participant provenance is authorised.

---

# PART III — CALLER / PARTICIPANT ENVELOPE

## 8. Participant snapshot is caller-supplied

The Battle must consume the exact participant/position truth already established by Story/World at the moment direct contact commits.

The caller must supply a stable snapshot equivalent to:

```text
assessmentAttemptId
assessmentSubjectStableId
historicalHostileParticipantRef
sourceOccurrenceId
directContactParticipantRefs[]
participantControlClassByRef{}
participantPositionRefs{}
participantBattleSideByRef{}
currentDispatchCustodyRef
currentCourierStateRef
```

The custody/courier refs are read-only context for return continuity. They are not Battle targets or mutable Combat ownership state.

## 9. Required player-side participant

Because the protagonist chose **Hold the line**, the assessment subject is a direct-contact Battle participant when this seam opens.

The subject enters through its current legitimate representation/state supplied by the caller.

Combat may not swap the assessment subject for another current-team member merely because that Character is stronger.

## 10. Additional allied Battle participants

A current teammate/ally joins the Battle **only** when the committed pre-Battle Story/World state places that participant in the direct hostile contact envelope.

Examples that may legitimately keep a teammate outside this Battle:

- actively extracting/supporting the injured courier away from direct contact;
- guarding/transporting the dispatch outside the contact line;
- physically repositioned to another route by an already-committed autonomous action;
- otherwise factually outside the direct-contact participant set.

A teammate factually standing with the subject in the direct contact may join according to the caller snapshot.

Therefore:

> **current team != automatic Battle participant set.**

The Battle runtime must not enumerate all currentTeam entries and insert them after the caller has committed the direct-contact snapshot.

## 11. Control ownership

Preserve existing control taxonomy.

- a legal player-controlled My Clan/current-team Battle participant uses the current shared player-control semantics;
- a Guest Ally / Independent Ally remains governed by its current authorised controller/autonomy semantics;
- participant presence does not manufacture player control;
- Battle inclusion does not create My Clan ownership, team assignment or deployment persistence;
- Battle exit does not remove a Character from My Clan/currentTeam.

## 12. Explicit exclusions

The following are **not** Combat participants/targets in this benchmark:

- `academy_genin_missing_courier_dispatch_courier_01`;
- `academy_genin_missing_courier_dispatch_packet_01`;
- `academy_genin_field_readiness_examiner_role_v1`.

The courier remains Story/World state.

The sealed dispatch remains an occurrence-bound mission object/custody state.

The Rogue's reusable attack palette cannot target the courier or dispatch through this Battle package.

---

# PART IV — OBJECTIVE / TERMINAL STATES

## 13. Exact Battle objective

Objective:

**Stop the Rogue's immediate direct advance long enough to break the current combat pressure.**

Machine ID:

`battle_obj_academy_genin_hold_line_repel_rogue_v1`

Combat resolves only the direct fight.

It does not resolve:

- courier extraction;
- dispatch custody transfer;
- mission completion;
- Promotion;
- examiner satisfaction;
- Rogue long-term escape/capture/death;
- whether a later World route remains safe.

## 14. Victory

Battle victory occurs when:

`academy_genin_missing_courier_dispatch_rogue_01`

reaches **0 Remaining Battle PL** and no enemy Battle participant remains.

Return:

```text
battleResult = victory
rogueBattlePLDepleted = true
rogueCombatContactState = forced_withdrawal_from_effective_combat
```

Meaning:

- the Rogue is no longer an effective Combat participant in this direct encounter;
- 0 Battle PL = withdrawal from effective combat;
- not automatic death;
- not automatic injury;
- not automatic capture/custody;
- not automatic permanent escape;
- not automatic mission success;
- not automatic Promotion/pass;
- not automatic dispatch security.

World/Story may legitimately map the returned Combat fact into the next hostile-pressure state, such as contact broken/disengaged, only after consuming all current factual state.

## 15. Defeat

Battle defeat occurs when no player-side Battle participant remains capable of continuing under current shared Battle semantics.

Return:

```text
battleResult = defeat
rogueBattlePLDepleted = false
rogueCombatContactState = still_combat_capable_at_return
```

Each player participant that reaches 0 Remaining Battle PL returns factual `battlePLDepleted=true` / withdrew-from-effective-combat evidence.

Defeat does **not** mean:

- death/injury;
- mission failure automatically;
- dispatch transfer to the Rogue;
- courier capture;
- integrity/safety abort automatically;
- Promotion failure automatically.

Story/World resumes from the actual courier/custody/team positions and decides what remains possible.

## 16. Withdraw / rotation

Current shared `WITHDRAW` semantics remain a fighter rotation to a legal successor where one exists.

It is not a bespoke total-flee button for this encounter.

Therefore:

- if a legal successor exists in the committed Battle participant set, shared fighter rotation may operate normally;
- if none exists, `WITHDRAW` must not manufacture a successor or silently terminate the encounter;
- Combat does not author a new full-party flee result here;
- Story/World owns any later break-contact/extraction route after Battle return.

Executable terminal Battle results for this package remain:

`victory | defeat`.

---

# PART V — POST-BATTLE RETURN ENVELOPE

## 17. Required factual return

The Battle caller must receive at minimum:

```text
battleOccurrenceId
battleConfigId
encounterId
sourceOccurrenceId
assessmentAttemptId
assessmentSubjectStableId
historicalHostileParticipantRef
oppositionTemplateId
battleResult
participantRefs[]
participantControlClassByRef{}
participantBattleSideByRef{}
participantTerminalBattleStateByRef{}
rogueBattlePLDepleted
rogueCombatContactState
committedActionOccurrenceRefs[]
subjectCombatEvidenceSummary
participantCombatEvidenceByRef{}
battleRewardEntitlementRef?
```

`participantTerminalBattleStateByRef` may report Battle facts such as remaining Battle PL, Battle PL depletion and current Battle-active/withdrawn status.

It may not fabricate Story facts such as injury/death/custody/location transfer.

## 18. Facts Combat must not return as authored conclusions

Combat must not manufacture:

- `courierRecovered=true/false`;
- dispatch holder changes;
- dispatch seal/integrity changes;
- `missionObjectiveCompleted`;
- Rank PASS/FAIL;
- hidden readiness-slot satisfaction;
- `rogueCaptured`;
- `rogueKilled`;
- `rogueEscapedPermanently`;
- safety/integrity abort;
- morality/alignment result.

Those remain owning-system decisions from factual evidence.

---

# PART VI — RANK-EVIDENCE COMPATIBILITY

## 19. Combat emits facts, not a Rank verdict

The Battle must preserve enough exact action/result evidence for Rank to evaluate `combat_readiness` where legitimate.

Combat must **not** emit:

`combatReadinessSatisfied = true`

merely because:

- the Battle launched;
- the subject attacked;
- the team won;
- the subject landed the finishing packet.

## 20. Exact subject evidence envelope

For the assessment subject, return an evidence summary derived only from committed Battle action records:

```text
subjectWasBattleParticipant
subjectCommittedActionRefs[]
subjectEffectiveTechnicalActionRefs[]
subjectMaterialFailedActionRefs[]
subjectPositiveDamageActionRefs[]
subjectDefensiveControlSupportActionRefs[]
subjectUnderlyingBattlePLDamageDealt
subjectStaminaMitigationEvidenceRefs[]
subjectBattlePLDepleted
subjectRemainingBattlePLAtReturn
subjectPresentAtVictory
battleResult
```

A technical action counts as effective/failed only under the current action-derived development semantics already used by Combat/Progression.

Teammate evidence is preserved separately by participant ref. Team performance may not be silently credited to the subject.

## 21. Candidate evidence refs

Where current evidence contracts need a stable source address, each committed subject action/result may expose an observer-hidden machine ref under the Battle occurrence, for example:

`battle_evidence::<battleOccurrenceId>::<actionOccurrenceId>`.

This is **candidate factual evidence**, not a readiness-domain success flag.

Rank may consume:

- actual hostile contact;
- exact subject actions/results;
- mitigation/control/support facts;
- subject withdrawal/depletion;
- Battle result;
- teammate-attributed facts;

according to its own evidence authority.

The normal player-facing Promotion surface must not expose hidden evidence counts/weights/package identity merely because Combat recorded them.

---

# PART VII — DEVELOPMENT / REWARD PACKAGE

## 22. Action-derived development remains normal Battle development

This assessment Battle does not invent fixed Skill/discipline EXP merely because it is a Promotion assessment.

The current action-derived development contract remains active:

- legitimate material failed technical execution: current authorised +1 EXP where applicable;
- effective technical execution: current authorised +2 EXP where applicable;
- exact separately-authorised exceptional execution: +3 where applicable;
- current technical-discipline cap remains 6 EXP per discipline per causal Battle;
- Stamina development remains +1 EXP for each legitimate positive hostile packet actually mitigated at the Stamina stage, current cap 2 per causal Battle.

Development belongs to the Character who performed/received the qualifying action. It is not pooled across the team.

These are action-derived development receipts, not fixed victory rewards and not Promotion-result rewards.

## 23. Exact fixed Battle victory reward

Global World/Rewards authority requires every player-facing PL Battle victory to award non-zero Ryō, and sets **50 Ryō** as the standard qualifying one-opponent Academy Battle anchor where no exact higher value exists.

This encounter uses that anchor.

Reward source:

`agen_m01_reward_optional_battle_victory_ryo_01`

Eligibility:

- exact Battle occurrence exists for the current `assessmentAttemptId`;
- `battleResult = victory`;
- this reward source has not already committed for that Battle occurrence.

Fixed Battle reward:

**50 Ryō**

Player-facing causal line:

> **50 Ryō — Repelled the rogue during the courier assessment.**

This is one Battle-level player-currency reward per committed victory, **not 50 Ryō per allied participant**.

Defeat grants no fixed Battle Ryō.

No Item/Weapon/Equipment/material drop is authored by this package.

No generic Character EXP is authored by this package.

## 24. Reward transaction boundary

Combat supplies the exact fixed Battle reward entitlement/fact.

Canonical money mutation remains the existing Reward/economy transaction owner.

Recommended interface:

```text
battleRewardEntitlement = {
  rewardSourceId: "agen_m01_reward_optional_battle_victory_ryo_01",
  battleOccurrenceId,
  assessmentAttemptId,
  cause: "battle_victory",
  ryo: 50,
  itemEntitlements: [],
  genericCharacterExp: 0
}
```

Stable idempotence key:

`battle_reward::agen_m01_reward_optional_battle_victory_ryo_01::<battleOccurrenceId>`

The World/Rewards transaction commits canonical Ryō exactly once and returns its reward transaction/receipt ref for Battle/Promotion Receipt projection.

Combat does not create a second wallet.

## 25. Mission rewards remain separate

Do not merge the 50-Ryō Battle reward into these already-closed mission rewards:

- **150 Ryō** — same sealed dispatch returned intact to examiner;
- **100 Ryō** — courier recovered alive / transferred safely to Konoha care;
- **Field Recovery Pill ×1** — full mission-objective completion.

Possible factual result:

A player may win this Battle and earn 50 Ryō but later fail the mission objective.

Possible factual result:

A player may avoid this Battle entirely, complete the mission through a legitimate non-Battle route and receive the mission reward package without the 50-Ryō Battle reward.

Canonical:

> **Battle reward != mission reward != Promotion result.**

## 26. Victory disclosure

Battle/Victory presentation must be able to explain separately:

- fixed **50 Ryō** Battle victory reward;
- each Character's action-derived technical-discipline development, with exact cause;
- each Character's Stamina development, with exact mitigating packets;
- no Item reward unless later exact authority adds one;
- mission rewards as separate/deferred mission facts, never disguised as this Battle's immediate reward.

---

# PART VIII — SAVE / LOAD / IDEMPOTENCE

## 27. Stable Battle lineage

For one assessment attempt there is at most one committed Hold-Line Battle occurrence with ID:

`battle_occ_academy_genin_missing_courier_hold_line_v1::<assessmentAttemptId>`.

Starting/resuming the same committed encounter must return/resume this occurrence rather than minting another Battle.

## 28. Persisted Battle facts

Save/load must preserve at minimum:

- `assessmentAttemptId`;
- Battle occurrence/config/encounter IDs;
- historical Rogue participant ref;
- `oppositionTemplateId = rogue_genin`;
- frozen Battle participant/control/side snapshot;
- each participant Remaining Battle PL;
- current active-slot/turn state under shared runtime;
- Substitution Feint spent/live state;
- committed action/result occurrences;
- terminal Battle result once committed;
- Battle reward entitlement/transaction ref once committed;
- caller return context.

Reload may not:

- repopulate participants from the current-team UI;
- reroll already-committed action results;
- reset the Rogue to a different template;
- reset a spent Substitution Feint;
- duplicate the Battle occurrence;
- duplicate the 50-Ryō reward;
- duplicate action-derived development;
- rewrite courier/dispatch state.

## 29. Retry / new attempt

A genuine new Promotion assessment attempt creates a new `assessmentAttemptId`, therefore a new Battle occurrence/reward lineage if this Battle is reached again.

The new attempt does **not** reroll the Character's immutable Academy → Genin requirement package.

Prior Battle/attempt history remains historical truth.

## 30. Arc-1 collision firewall

This package may reuse the physical `fire_whisper_woods_north_ravine` geography only.

It may not activate/reuse/mutate:

- `arc1_m1_whisper_major_contact`;
- `arc1_m1_whisper_major_contact_event`;
- `scene_arc1_m1_whisper_major_contact`;
- Arc-1 Rogue Shinobi / Smuggler / Unknown Operative participant IDs;
- Arc-1 Battle occurrence/reward IDs.

Likewise Arc-1 save/load state may not become a fallback source when this Promotion Battle state is absent.

---

# PART IX — PRESENTATION / IMPLEMENTATION BOUNDARY

## 31. Shared PL Battle runtime only

Implementation must consume the current shared PL Battle engine/control semantics.

This closure does not author:

- HP/health;
- Speed/initiative redesign;
- Beta #366 batch commands;
- new Battle formation architecture;
- new audio requirement;
- special Promotion-only damage math;
- a second Battle resolver.

The existing `rogue_genin` enemy presentation asset may be consumed only through current UI/Assets/runtime authority. Physical asset existence does not create new semantic identity.

## 32. No new opposition calibration dependency

Because the current reusable `rogue_genin` PL23 template and its three-action package are already closed, #583 creates **no PL / Registry dependency**.

This is a new historical consumer of an existing opposition template, not a new numerical Registry profile.

---

# PART X — REQUIRED RUNTIME REGRESSION

## 33. Minimum acceptance matrix

When Coding is later routed by CE after the UI owner package is closed, runtime must prove at minimum:

1. Battle opens only from the legal Hold-Line direct-contact seam, not merely hostile presence.
2. Historical Rogue ref is `academy_genin_missing_courier_dispatch_rogue_01`.
3. Opposition template is exactly `rogue_genin`.
4. Rogue Base/entry PL is exactly 23 with Stats `23/22/21/10/14/15/24` and no hidden scaling.
5. Rogue palette is exactly Kunai Rush ATK9, Shuriken Spread ATK7, Substitution Feint once/Battle 40% pre-Stamina prevention.
6. No generic fallback Basic Attack is invented.
7. Assessment subject is present when the Battle legally launches.
8. Additional teammates are included only from the committed direct-contact snapshot.
9. A teammate extracting courier/guarding dispatch outside direct contact is not auto-added from currentTeam.
10. Courier and dispatch are not Battle targets.
11. Existing control taxonomy is preserved; presence does not grant player control.
12. Victory at Rogue 0 PL means forced withdrawal from effective combat only.
13. Defeat/participant 0 PL means withdrawal from effective combat, not injury/death.
14. Battle victory does not commit mission success or Promotion.
15. Battle defeat does not commit mission failure or Promotion failure.
16. Battle return does not mutate courier/dispatch custody/integrity.
17. Subject and teammate action evidence remain separately attributable.
18. No `combatReadinessSatisfied` boolean is manufactured from launch/victory.
19. Action-derived discipline/Stamina development remains causal and per-Character.
20. Victory creates exactly one **50 Ryō** Battle entitlement/transaction.
21. Battle reward is separate from 150/100/Pill mission rewards.
22. Defeat creates no fixed Battle Ryō.
23. Save/load preserves the same participant set, PL state, Feint state and action history.
24. Same Battle occurrence/reward key cannot duplicate Battle/reward/development on reload/return/Receipt reopen.
25. New assessment attempt creates a new Battle lineage without rerolling the immutable Rank package.
26. No Arc-1 North Ravine occurrence/reward/participant collision.
27. Promotion Receipt/Victory projection can disclose 50 Ryō plus action-derived development and exact causes without leaking hidden Rank requirements.
28. `browserGoldenClaimed=false` until the later Step-7 player-facing presentation/runtime is actually owner-reviewed.

---

# PART XI — FINAL STATUS

## 34. Closed by Combat

- occurrence-local hostile -> reusable opposition mapping;
- exact PL/Stats source;
- exact action palette/mechanics;
- exact participant-caller boundary;
- objective/terminal Battle semantics;
- exact Story/World return envelope;
- Rank-compatible factual Combat evidence envelope;
- fixed Battle victory reward: **50 Ryō**;
- reward transaction/idempotence interface;
- save/load/retry/Arc-1 collision safeguards;
- no new Registry/PL dependency.

## 35. Still separate

- UI / Assets Promotion presentation package;
- runtime implementation;
- browser validation;
- authoritative Rank evaluation/result;
- World post-Battle continuation from returned facts;
- full Step-7 Golden/regression claim.

## Final lock

> **The Missing Field Courier Hold-Line seam uses the existing `rogue_genin` PL23 opposition template against the exact occurrence-local hostile `academy_genin_missing_courier_dispatch_rogue_01`. The Rogue keeps its closed ATK9 Kunai Rush, ATK7 Shuriken Spread and once-per-Battle 40% Substitution Feint. The assessment subject always joins a legally launched Hold-Line Battle; additional allies join only when Story/World already placed them in direct contact. Courier and dispatch stay outside Combat ownership/targeting. Rogue Battle-PL depletion means forced withdrawal from effective combat, not death/capture; player depletion means withdrawal, not mission failure. Combat returns exact participant/action/result evidence for Rank without declaring `combat_readiness` satisfied. A committed victory grants one separate 50-Ryō Battle reward, while action-derived development remains causal/per-Character and the 150/100/Pill mission rewards remain independently owned. Battle victory != mission success != Promotion, and retry/save/load never reroll or duplicate committed truth.**

**DESIGN CLOSED != IMPLEMENTED != RUNTIME VALIDATED != GOLDEN / REGRESSION GREEN.**
