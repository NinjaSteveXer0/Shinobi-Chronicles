# Shinobi Chronicles — Academy Menma + Anko vs Three Test Subjects Origin Battle Closure

**Date:** 2026-09-25  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Incoming handoff:** #360  
**CE predecessor:** #358  
**Status:** **DESIGN CLOSED — CURRENT-RUNTIME ORIGIN BATTLE CONTRACT / IMPLEMENTATION NOT AUTHORISED BY THIS DOCUMENT**  
**Live source baseline inspected:** `34f14530a5f27e66f2955cad0a17eabe5fad360b`  
**Live `game.js` blob inspected:** `05e014efc8a77705c53f0ec9d8f143703ad91da8`

This document closes only the exact Academy Menma Scene 7 Combat package required by the CE successor contract.

It does **not** release or implement the held general six-shinobi relay / alternating-side-turn Battle redesign.

---

## 1. Consumed authority

Primary inputs:

- `Documentation/Coordination/Academy_Menma_Anko_Three_Subject_Origin_Battle_Reconciliation_2026-09-25.md`;
- `Documentation/Story/Academy_Menma_Origin_2026-09-25_Scene_Authority_and_Backdrop_Contract.md`;
- `Documentation/Combat/SC_Combat_Academy_Menma_Tutorial_Start_State_and_Alpha_Active_Content_Slice_2026-09-11.md`;
- `Documentation/Registry/Awaiting Placement Character and Enemy Calibration Wave.md`;
- current live multi-participant deployment / Battle evidence / Story return machinery in `game.js`;
- current formation-stage presentation in `runtime/alpha-battle-modern-33000.js`.

The CE contract already closes composition, objective, Menma-only tutorial attribution, Anko ownership boundaries, three independent hostile identities, and the successor encounter ID. Combat does not reopen those decisions here.

---

## 2. Exact Battle identity

### Battle config ID

`academy_menma_origin_three_test_subjects_with_anko`

### Encounter ID

`origin_academy_menma_prologue:three_test_subjects`

### Semantic objective

**Stop the Test Subjects.**

### Environment

`Scene backdrops/forest_clearing_day.png`

Entering Battle does not create a new physical location. Story before Battle, Battle presentation and Story after Battle occur in the same clearing.

---

## 3. Exact participant envelope

### Allied side

```text
slot 1 = academy_menma
slot 2 = sj_anko
slots 3–6 = empty
```

- `academy_menma` is the sole player-controlled actor.
- `sj_anko` is an autonomous encounter-local allied NPC participant.
- Anko uses the untransformed Special Jōnin representation only.
- `cs_anko` and `l2_anko` packages are forbidden in this encounter.

### Opposition side

```text
slot 1 = test_subject_altered_shinobi
slot 2 = test_subject_brute
slot 3 = test_subject_unstable
slots 4–6 = empty
```

Each hostile retains an independent participant identity and independent Battle PL ledger.

There is no pooled enemy PL.

### Closed Base PL

- `academy_menma` — current Character authority, no Story-only PL bonus;
- `sj_anko` — Base PL **56**;
- `test_subject_altered_shinobi` — Base PL **11**;
- `test_subject_brute` — Base PL **13**;
- `test_subject_unstable` — Base PL **12**.

Battle entry remains deterministic from current authoritative PL. No encounter multiplier and no random Battle-entry variation are added here.

---

## 4. Ownership-safe Anko participant adapter

Anko's presence is Battle occurrence state, not roster state.

Implementation must resolve `sj_anko` from Registry authority into a scoped allied-NPC Battle participant without:

- granting Character ownership;
- writing her into My Clan;
- acquiring her;
- persisting a permanent player-team materialisation;
- exposing her as a player-selectable Battle actor after this occurrence.

The encounter-local adapter may make `sj_anko` addressable to shared participant/PL/damage/condition/evidence resolvers, but that adapter must be bound to this Battle instance and cleaned after Story return.

Save/load may persist the Battle-local projection necessary to resume the same Battle. It must never convert that projection into ownership.

**Registry identity != ownership != My Clan assignment != temporary Story Battle participation.**

---

## 5. Scoped current-runtime action cadence

The current generic enemy scheduler is slot-1-centric and there is no ordinary autonomous allied-NPC scheduler suitable for this occurrence.

This encounter therefore owns one bounded fixed actor cadence.

This is a **content-scoped scheduler**, not the future general Battle redesign.

### Round order

```text
1. academy_menma
2. test_subject_altered_shinobi
3. sj_anko
4. test_subject_brute
5. test_subject_unstable
repeat
```

Rules:

1. Menma's phase is the only phase that exposes the player action dock.
2. A valid committed Menma action consumes exactly one Menma action opportunity.
3. Every non-Menma phase resolves autonomously.
4. A withdrawn participant's later phase is skipped.
5. The cadence is keyed by stable participant ID, not current visual slot number. Queue compaction must not duplicate or skip a participant's action.
6. After every committed action and every withdrawal, objective/failure conditions are checked before another phase begins.
7. If all three exact hostile participants are withdrawn, the Battle commits victory immediately; unused later phases do not execute.
8. If Menma withdraws before objective completion, the Battle commits Menma tutorial defeat immediately; Anko does not continue the Battle to manufacture tutorial success.
9. If Anko withdraws, only Anko's future phase is skipped. Menma may continue.
10. Phase/cycle identity and any committed RNG choice must persist atomically. Reload cannot grant a free action, repeat a committed action, reroll a committed target/action choice or skip a committed result.
11. No animation, timer, DOM callback or presentation transition owns semantic phase advancement.

This cadence is authorised only for:

`academy_menma_origin_three_test_subjects_with_anko`

It must not be promoted into the general Alpha Battle turn model by implication.

---

## 6. Manual WITHDRAW boundary

The generic current player WITHDRAW behaviour cannot be reused unchanged here.

Because Anko occupies allied slot 2, ordinary queue withdrawal would incorrectly rotate Menma out and risk promoting an autonomous NPC into the player-controlled actor position.

Therefore for this encounter:

- generic manual WITHDRAW is unavailable/disabled;
- a programmatic generic WITHDRAW request must fail without consuming an action or mutating Story truth;
- Menma reaching 0 Remaining Battle PL commits the authored tutorial defeat immediately;
- Menma is never replaced by Anko as the player-controlled actor;
- Anko reaching 0 Remaining Battle PL withdraws Anko only and leaves Menma as the player actor.

No bespoke voluntary flee result is authored by this closure.

---

# 7. Academy Menma legal Origin package

Current authoritative prepared package remains exactly:

```text
academy_menma_chakra_knuckle
academy_menma_crescent_kunai
academy_menma_guard_breaker
academy_menma_shadow_clone_feint
academy_menma_shadowstep
```

### `academy_menma_chakra_knuckle`

- direct damage;
- authored Attack PL **6**;
- one packet;
- ordinary Stamina mitigation;
- current legal hostile target only;
- not Kinjutsu-observation qualifying.

### `academy_menma_crescent_kunai`

- direct damage;
- authored Attack PL **5**;
- one packet;
- ordinary Stamina mitigation;
- current legal hostile target only;
- not Kinjutsu-observation qualifying.

### `academy_menma_guard_breaker`

- direct damage;
- authored Attack PL **7**;
- one packet;
- ordinary Stamina mitigation;
- existing guard-interaction rider remains separately qualification-gated and is never automatic;
- not Kinjutsu-observation qualifying.

### `academy_menma_shadow_clone_feint`

- Ninjutsu setup;
- no Attack PL;
- source-owned `academy_menma_clone_feint` state;
- clone is not a participant;
- deception evidence does not establish belief;
- not Kinjutsu-observation qualifying.

### `academy_menma_shadowstep`

- self/contextual reposition;
- no Attack PL;
- requires a legitimate traversable/reposition route;
- no teleportation;
- no hidden Speed/Evasion;
- rejected/no-route selection consumes nothing;
- not Kinjutsu-observation qualifying.

### Current targeting

Menma's ordinary `current_enemy` actions continue to consume the current live hostile lane under current-runtime deployment semantics.

Combat does **not** grant Menma a generic off-slot targeting bypass merely because three enemies are present.

As the current hostile withdraws, the current deployment exposes the next live hostile through ordinary encounter compaction.

---

## 8. Menma Kinjutsu / Fūinjutsu capability seam

The current inspected production authority contains **no legitimate prepared Academy Menma Kinjutsu or Fūinjutsu action for this Origin Battle**.

The known Menma Nine-Tails / mantle actions are either:

- Ninjutsu;
- Taijutsu;
- Ninjutsu-support;
- or gated behind a transformation/effective package not automatically present here.

They do not solve the Kinjutsu/Fūinjutsu Story benchmark.

Therefore this closure explicitly records:

> **No new Kinjutsu/Fūinjutsu Technique is invented or back-ported for Scene 7.**

Consequences:

- no later Menma representation Technique leaks backward;
- no automatic Nine-Tails help;
- no hidden capability grant;
- Menma's current five-action Origin package remains executable and authoritative;
- MEN-01 / MEN-02 are not manufactured merely because Menma is machine-known to have strong Kinjutsu identity;
- MEN-02 remains absent unless a genuinely qualifying Kinjutsu action is separately authorised, legally executed and observed.

Writing may preserve Menma's capability identity without pretending an un-authored Battle button exists.

A future exact Academy Menma Fūinjutsu action, if separately authorised, may produce ordinary observed-Fūinjutsu evidence. That still does **not** become MEN-02 because MEN-02 remains Kinjutsu-specific.

This recorded capability-expression gap does not block the 2-v-3 Battle itself.

---

# 9. Special Jōnin Anko — exact Origin action package

Registry authority supplies the five named capability anchors. This closure makes four executable in this nonlethal Origin Battle and deliberately holds the mutually lethal fifth.

All values below are **fixed authored action values** for this package. They are not computed from Rank or PL at runtime.

## 9.1 `sj_anko_hidden_shadow_snake_hands`

Display:
**Hidden Shadow Snake Hands**

Class:
**NINJUTSU / DIRECT**

Target:
the exact current autonomous Anko target selected under section 10.

Authored Attack PL:
**20**

Resolution:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- one mechanical packet regardless of visible snakes;
- no automatic Poison;
- no automatic Bleed;
- no automatic Stun;
- no automatic restraint;
- no extra Summon participant.

## 9.2 `sj_anko_snake_bind`

Display:
**Snake Bind**

Class:
**NINJUTSU / CONTROL**

Attack PL:
**none**

Resolution:

- one exact hostile target;
- establishes source-owned `physical_restraint`;
- blocks substantial free movement / reposition / escape actions;
- does not block all ATTACK / DEFENSE / SUPPORT actions;
- not Stun;
- exact escape / anti-restraint authority may remove or override it;
- no hidden damage packet;
- no Poison;
- reapplication does not stack.

Duration:

- through the target's next action opportunity, then release;
- one successful bind establishment per target per Battle under this Origin AI package; the autonomous scheduler does not endlessly re-bind the same target.

## 9.3 `sj_anko_fire_style_dragon_flame`

Display:
**Fire Style: Dragon Flame**

Class:
**NINJUTSU / FIRE / DIRECT RANGED**

Authored Attack PL:
**24**

Resolution:

- one focused direct Attack-PL packet;
- ordinary Stamina mitigation;
- one mechanical packet;
- no automatic Burning;
- no area damage by title inference;
- no hidden projectile accuracy roll.

## 9.4 `sj_anko_serpent_evasion`

Display:
**Serpent Evasion**

Class:
**NINJUTSU / DEFENSIVE REPOSITION**

Limit:
**once per Battle**

State:
`sj_anko_serpent_evasion_ready`

Resolution:

- no damage;
- prepares one deterministic movement-defense state;
- the next qualifying single-target direct mitigable Attack-PL packet targeting Anko is avoided before Stamina and resolves for 0;
- the state is then consumed;
- if unused, it expires at the start of Anko's next autonomous action opportunity;
- using the action marks it spent whether the state is later consumed or expires;
- no counterattack;
- no hidden Speed/Agility/Evasion stat;
- no random miss roll;
- no extra action.

This is an explicit authored defensive Technique, not a generic accuracy system.

## 9.5 `sj_anko_twin_snakes_mutual_death`

Status in this Origin:
**AUTHORED CAPABILITY / NOT PREPARED / NOT LEGAL**

Reason:

- current Registry authority explicitly identifies it as a high-risk Kinjutsu requiring exact self/consequence semantics;
- this Scene 7 contract establishes Battle-PL withdrawal, not death/injury;
- no mutual-death consequence is authorised for this Origin.

Combat must not convert Twin Snakes Mutual Death into ordinary damage merely to complete a five-button palette.

Its absence from the executable package is intentional.

---

# 10. Anko autonomous targeting and action selection

Anko must participate without becoming the tutorial subject.

### Target priority

While alive, select the first live hostile from:

```text
1. test_subject_brute
2. test_subject_unstable
3. test_subject_altered_shinobi
```

This preserves the prior scene continuity that Anko was already occupied with Brute and Unstable while Altered Shinobi remained Menma's focal opponent.

Target priority is encounter authorship, not a universal aggro system.

If a higher-priority hostile has withdrawn, fall through to the next live hostile.

### Action eligibility / selection

At Anko's autonomous phase:

1. If Anko is at or below **40% Remaining Battle PL**, Serpent Evasion is unspent and its state is not active, choose `sj_anko_serpent_evasion`.
2. Otherwise, if the selected target has not yet received a successful Anko Snake Bind in this Battle and can legally receive physical restraint, choose `sj_anko_snake_bind`.
3. Otherwise, determine semantic eligibility for:
   - `sj_anko_hidden_shadow_snake_hands`;
   - `sj_anko_fire_style_dragon_flame`.
4. If both are eligible, choose between them with equal-weight randomness **after** eligibility.
5. If only one is eligible, use that one.
6. If no exact action is semantically legal, fail visibly for that autonomous opportunity. Do not invent a Basic Attack.

Every committed target/action/RNG choice is written once and survives reload.

This policy causes Anko to engage/control the wider threats first while still leaving Menma's focal Altered Shinobi confrontation materially his.

---

# 11. Exact hostile action packages remain valid

The three existing hostile packages are retained with one authority correction:

> the old `wider_clearing_only` restriction on Brute / Unstable is **AUTHORITY_CHANGED** for this successor encounter because CE now places them inside the direct Scene 7 Battle.

No action numerics change.

## Altered Shinobi — PL11

1. `test_subject_altered_shinobi_shinobi_strike` — ATK **5**
2. `test_subject_altered_shinobi_shuriken_cast` — ATK **4**, one projectile packet
3. `test_subject_altered_shinobi_unstable_chakra_burst` — ATK **6**

No automatic condition, self-damage or Curse-Mark escalation is inferred.

## Brute — PL13

1. `test_subject_brute_heavy_swing` — Taijutsu ATK **7**
2. `test_subject_brute_body_rush` — Taijutsu ATK **6**, no automatic Stun/displacement
3. `test_subject_brute_crushing_clinch` — Taijutsu physical restraint/control, **no Attack PL**, not Stun

## Unstable — PL12

1. `test_subject_unstable_frantic_rush` — Taijutsu ATK **5**
2. `test_subject_unstable_chakra_spasm` — Ninjutsu ATK **6**
3. `test_subject_unstable_panicked_burst` — Ninjutsu ATK **7**, one mechanical packet

No automatic self-damage or generic instability condition.

---

# 12. Hostile autonomous targeting

The scoped target law preserves the pre-successor confrontation lanes without hiding a generic aggro scalar.

### Altered Shinobi

Primary legal target:
`academy_menma`

If Menma has withdrawn, the tutorial has already failed and no later Altered action is scheduled.

### Brute

Primary legal target while present:
`sj_anko`

Fallback if Anko has withdrawn:
`academy_menma`

### Unstable

Primary legal target while present:
`sj_anko`

Fallback if Anko has withdrawn:
`academy_menma`

This is deterministic encounter targeting.

There is:

- no hidden threat score;
- no hidden Speed stat;
- no hit/miss roll;
- no morality influence;
- no random target reroll on reload.

Each hostile's action is selected only from its own semantically eligible authored package. Randomness may occur among eligible actions after eligibility, using the same committed-RNG safeguard as the encounter cadence.

A restrained Brute cannot choose an action whose exact movement requirement is currently blocked. The scheduler must filter that action before randomness.

---

# 13. Individual withdrawal and objective resolution

Each hostile reaches withdrawal independently when its own Remaining Battle PL reaches 0.

Withdrawing one or two hostile participants never commits Battle victory while another exact hostile remains active.

Victory requires all three exact IDs to be resolved:

```text
test_subject_altered_shinobi
test_subject_brute
test_subject_unstable
```

0 Battle PL means withdrawal/depletion for this occurrence.

It does not author:

- death;
- injury;
- custody;
- kill credit;
- morality.

Anko may personally cause a hostile withdrawal. That fact may exist in Battle evidence, but it never counts as Menma's action/damage for MEN-03.

---

# 14. Battle terminal result contract

## Victory

Commit `victory` only when:

- all three exact hostile participants are withdrawn/resolved; and
- Menma has not already withdrawn/finalised tutorial failure.

The objective is then:

`stop_three_test_subjects = completed`

Anko may be active or withdrawn.

## Defeat

Commit `defeat` immediately when:

- `academy_menma` reaches 0 Remaining Battle PL before all three hostiles are resolved.

Result facts:

- `tutorialResult = not_completed`;
- `performanceBucket = null`;
- Anko remaining active cannot continue and later convert the result into Menma tutorial success.

No second player-controlled Anko phase is opened.

---

# 15. Exact Battle occurrence / Story-return evidence

Use one deterministic Battle occurrence receipt per Story scene instance:

```text
battleOccurrenceId =
  "battle_occ_origin_academy_menma_three_test_subjects:" + sceneInstanceId
```

The receipt survives save/load and is recorded once.

It must contain at minimum:

- `battleOccurrenceId`;
- `battleConfigId = academy_menma_origin_three_test_subjects_with_anko`;
- `encounterId = origin_academy_menma_prologue:three_test_subjects`;
- allied participant IDs;
- exact three hostile participant IDs;
- terminal `battleResult`;
- `objectiveId = stop_three_test_subjects`;
- `objectiveCompleted`;
- `menmaWithdrawn`;
- `ankoWithdrawn`;
- exact `resolvedHostileIds`;
- no inferred death/injury/custody.

This receipt is supporting Combat ancestry. It does not replace the existing Menma Story source occurrences.

Story return should use the shared `story_scene` Battle return architecture and expose factual observer-safe result only.

---

# 16. Same-Battle Anko observation evidence

The old new-execution provenance label `anko_peripheral_clearing` is superseded for this encounter.

For a committed Menma action to become legitimately observed by Anko, all of the following must be true at the time of commitment:

- actor is exactly `academy_menma`;
- observer is exactly `sj_anko`;
- encounter is exactly `origin_academy_menma_prologue:three_test_subjects`;
- Anko remains present and has not withdrawn;
- the exact action is perceptible under its action contract;
- no explicit observation blocker applies;
- the observation references the exact committed Menma action evidence/action ID.

Record an observer evidence projection such as:

`menma_origin_anko_action_observed`

with:

- parent Menma action evidence ID;
- `actorRef = academy_menma`;
- `observerRef = sj_anko`;
- `skillId`;
- `observedDiscipline`;
- `sameBattleParticipantAccess = true`;
- `perceptible = true`;
- `observationBlocked = false`;
- `kinjutsuObservationQualifying`;
- `men02Qualifying`.

### MEN-02 rule

`men02Qualifying = true` only when the exact committed Menma action is:

- authored with primary discipline `Kinjutsu`; or
- explicitly tagged by existing authority as `kinjutsu_observation_qualifying`.

Observed Fūinjutsu is legitimate Fūinjutsu-use observation only.

**Observed Fūinjutsu != MEN-02.**

Under the currently closed five-action Menma package there is no Kinjutsu-qualifying action, so the default Scene 7 execution does not fabricate MEN-02.

---

# 17. MEN-03 successor Combat source

Preserve stable aggregate source occurrence ID:

`combat_academy_menma_tutorial_performance_resolved`

Preserve consequence identity:

`academy_menma_tutorial_performance_evidence`

Do not create MEN-03 v2 or rewrite already-committed legacy MEN-03 history.

## New-execution binding

New MEN-03 source records bind to:

`origin_academy_menma_prologue:three_test_subjects`

and exact opponent set:

```text
test_subject_altered_shinobi
test_subject_brute
test_subject_unstable
```

New records must use encounter/opposition-set semantics rather than claiming Altered Shinobi was the sole opponent.

Recommended exact new fields:

- `encounterId`;
- `opponentIds`;
- `battleOccurrenceId`;
- `objectiveId = stop_three_test_subjects`;
- `objectiveCompleted`.

Legacy committed records keep their historical old shape.

## Menma-only attribution

Count only Menma-attributable evidence for:

- `startingUnderlyingBattlePLMaximum`;
- `grossFinalPLDamageReceived`;
- `pressureRatio`;
- `criticalExposure`;
- `committedMenmaActionOpportunities`;
- `meaningfullyResolvedMenmaActions`;
- `actionExecutionRatio`.

Exclude:

- every Anko action;
- every Anko damage packet;
- damage received by Anko;
- Anko control/restraint;
- Anko defensive actions;
- hostiles withdrawn by Anko;
- Anko observation receipts except as external supporting ancestry where relevant to a separate observation consequence.

## Completion

MEN-03 may commit a completed bucket only when:

- the whole three-subject objective receipt says completed;
- all three exact hostiles are resolved;
- Menma did not withdraw before completion.

Otherwise:

- `tutorialResult = not_completed`;
- `performanceBucket = null`;
- no completed MEN-03 aggregate source is committed.

## Thresholds

Current Alpha thresholds remain unchanged:

- **high** — pressure ratio <= 0.30, no critical exposure, action execution ratio >= 0.75;
- **low** — pressure ratio > 0.65, or critical exposure, or action execution ratio < 0.50;
- **middle** — otherwise.

These remain ratios over Menma's own evidence and therefore do not need a speculative opponent-count multiplier.

## Supporting ancestry

A completed MEN-03 aggregate must include:

- exact Menma action evidence used in the performance read;
- exact Menma damage-received evidence used in the performance read;
- the exact committed whole-encounter `battleOccurrenceId` proving objective completion.

Anko evidence must not inflate the metric calculation.

---

# 18. Reward seam — intentionally unresolved by Combat

The old fixed 50-Ryō authority belongs to the superseded single-Altered-Shinobi tutorial reward trigger.

It is not safe to reuse by implication.

Hard Combat boundary:

> **Altered Shinobi withdrawal alone must not generate or claim the old 50-Ryō reward while Brute or Unstable remain unresolved.**

Combat does not author:

- per-subject Ryō;
- per-subject item drops;
- per-subject EXP;
- a new whole-encounter Ryō amount.

The successor whole-encounter reward is owned by World / Missions / Events.

Implementation must remain fail-closed against the stale single-opponent reward trigger until World publishes the successor reward contract.

---

# 19. Save/load / idempotence / containment requirements

The scoped package must preserve the locked Battle catastrophe safeguards.

At minimum:

- one Battle instance ID;
- one action-opportunity identity per actor phase;
- one committed target/action/RNG result per autonomous action;
- one current scoped phase cursor;
- atomic action commit before presentation;
- reload resumes the same phase/result;
- stale callbacks cannot advance a newer action generation;
- one-pass withdrawal/formation normalization;
- exact Battle invariants after every resolved action;
- Anko temporary participant state does not leak to ownership;
- Story return does not duplicate the Battle occurrence;
- MEN-03 aggregate remains idempotent;
- legacy Battle code is not used as a semantic fallback when scoped authority fails.

Canonical recovery remains:

**FALLBACK TO AUTHORITATIVE STATE, NOT TO OLD CODE.**

---

# 20. Explicit authority changes from old Menma tutorial

For new Scene 7 executions the following old assertions are superseded under **AUTHORITY_CHANGED**:

- old encounter `origin_academy_menma_prologue:altered_shinobi` as the direct tutorial encounter;
- direct deployment exactly Menma vs Altered only;
- Brute/Unstable being outside the direct Battle;
- `wider_clearing_only` excluding Brute/Unstable from direct Battle action use;
- MEN-03 treating Altered Shinobi as the sole opponent;
- observer provenance `anko_peripheral_clearing`.

Do not simply delete old diagnostics.

Replace them with explicit successor diagnostics proving this exact contract.

Old committed save/history truth is preserved and is never rewritten.

---

# 21. Required successor QA

Before this Battle can be called runtime validated, Coding must later prove:

- exact 2-allied / 3-opposition participant set;
- only Menma exposes player controls;
- Anko is autonomous and never acquired;
- fixed scoped actor cadence persists through reload;
- three independent hostile Battle PL ledgers;
- every hostile authored action package can receive a legal autonomous opportunity;
- exact target lanes function with both allies present;
- Brute/Unstable direct-Battle use is explicitly `AUTHORITY_CHANGED`, not silently unblocked;
- first/second hostile withdrawal does not end Battle;
- all three withdrawals commit victory;
- Menma withdrawal commits immediate tutorial defeat even if Anko remains;
- Anko withdrawal does not promote Anko/player control or invalidate later Menma victory;
- generic manual WITHDRAW cannot rotate Menma into Anko;
- Menma prepared palette remains exact five-action baseline;
- no automatic Nine-Tails package;
- no fabricated Kinjutsu/Fūinjutsu action;
- same-Battle Anko observation points to exact committed Menma actions;
- MEN-02 remains Kinjutsu-only;
- MEN-03 metrics exclude all Anko actions/damage/control/damage-received evidence;
- MEN-03 completes only from whole three-subject victory;
- old 50-Ryō trigger cannot fire on Altered withdrawal;
- same forest-clearing environment projects through Story -> Battle -> Story;
- Battle occurrence / MEN-03 / Story return remain idempotent.

Installed-browser proof remains separate from source diagnostics.

---

# 22. Final lock

> **Academy Menma Scene 7 is a scoped current-runtime 2-v-3 Story Battle: player-controlled `academy_menma` and autonomous untransformed `sj_anko` versus `test_subject_altered_shinobi`, `test_subject_brute` and `test_subject_unstable`. It uses a fixed encounter-local actor cadence of Menma -> Altered -> Anko -> Brute -> Unstable, keyed by participant IDs and persisted atomically. Menma's current five ordinary Academy actions remain his exact legal prepared package; no Kinjutsu/Fūinjutsu action or Nine-Tails help is invented. Anko uses Hidden Shadow Snake Hands ATK20, Snake Bind control, Fire Style: Dragon Flame ATK24 and once-per-Battle Serpent Evasion; Twin Snakes Mutual Death is deliberately not legal because this Origin has no mutual-death consequence authority. Altered targets Menma; Brute and Unstable target Anko while she remains active, then Menma. All three hostile PL ledgers must resolve for victory. Menma withdrawal before that point is immediate tutorial failure even if Anko remains. MEN-03 remains strictly Menma-attributable and becomes three-subject encounter-set aware. Same-Battle Anko observation may support exact committed Menma actions, but MEN-02 remains Kinjutsu-only. The stale 50-Ryō single-opponent reward may not fire on Altered withdrawal and is routed to World for successor whole-encounter authority. This closure does not release the held general Battle redesign.**

**DESIGN CLOSED != IMPLEMENTED != RUNTIME VALIDATED != BROWSER GOLDEN.**
