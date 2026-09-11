# Shinobi Chronicles — Arc 2 Mission 2 Unknown Boy Alley Encounter Closure

**Date:** 2026-09-11  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT AUTHORITY — ISSUE #119 CONSUMED / RUNTIME IMPLEMENTATION REQUIRED**

## 1. Scope / upstream authority

This closure consumes:

- GitHub issue **#119**;
- `Documentation/Registry/Arc 2 Mission 2 Unknown Boy Persistent Identity and PL Ratification 2026-09-11.md`, commit `acabd94daaa36d27e3570b63d1766782099ac22e`;
- `Documentation/Story/Arc2_Mission2_Unknown_Boy_Battle_and_Visual_Requirement_2026-09-11.md`, commit `1d8229ab3e9dfc0331dbbffdf7f4bfa93bebf45b`;
- `Documentation/Story/Arc2_Mission2_Unknown_Boy_Timed_PL_Battle_Outcome_Authority_2026-09-11.md`, commit `b123c4fc45124dd9c0501ce1fd456db39877623e`;
- current Combat damage / Battle-PL / control / observer-Knowledge doctrine;
- current text-first Skill catalogue as reusable semantic reference only.

Exact opponent remains:

- participant: `arc2_unknown_boy_01`;
- stable person: `person_arc2_unknown_boy_01`;
- observer projection: `observer_projection_arc2_unknown_boy`;
- display: **Unknown Boy**;
- Base Stats N/T/B/F/K/G/S: `55 / 59 / 52 / 62 / 54 / 49 / 57`;
- Base PL: **60**;
- formal Rank: `null`;
- affiliation: `null`.

This closure does not reveal or infer true identity, clan, ROOT/Danzō allegiance, Bloodline or formal Rank.

---

## 2. Encounter identity

Encounter ID:

`arc2_m2_unknown_boy_alley_confrontation`

Story mission:

`arc2_m2_the_leak`

Story objective:

`capture_alive_if_legitimately_resolved`

Player participant:

**exact current legitimate Menma representation supplied by Chronicle/Registry state at Battle entry.**

Combat must not hard-code one universal Menma representation, Base PL, Stats, prepared palette, Hosted-Entity package or transformation state.

Opponent:

`arc2_unknown_boy_01`

No additional combatants are inferred from Story speculation, Danzō/ROOT suspicion, extraction possibility, scene geography or later identity authority.

No hidden Battle-entry randomisation, elite/groupBoss/guardBoss multiplier, mission-number scaling or desired-outcome scaling is authorised.

---

## 3. Alley topology / Menma tactical choice

Writing established the narrow service alley and Menma's committed tactical priority:

`block_alley_exit_and_force_close_combat`

At Battle initialisation establish encounter-owned contextual state:

`arc2_m2_alley_exit_contested`

Meaning:

- Menma has committed to physically contesting the immediate alley exit;
- Unknown Boy cannot commit a legal early escape while the exit remains contested and no valid opening exists;
- this is encounter topology / tactical positioning, not custody, restraint, Stun, guaranteed initiative or a Speed modifier;
- it does not prevent ordinary movement/reposition actions inside the encounter unless an exact action also establishes a movement restriction.

This state does **not** mean Menma has already won the contest. Unknown Boy has exact actions capable of creating an exit opening.

### Menma encounter-context action

Stable contextual action ID:

`arc2_m2_reassert_exit_denial`

Display:

**Reassert Exit Denial**

Semantics:

- actor: current Menma representation only;
- type: encounter-context action, **not** a learned Character Skill;
- Attack PL: none;
- consumes one normal Menma action opportunity when committed;
- valid only while `arc2_m2_alley_exit_opening` is live;
- invalid if Menma is currently under a state that blocks movement/reposition;
- on valid commit removes `arc2_m2_alley_exit_opening` and restores the uncontested meaning of `arc2_m2_alley_exit_contested`;
- does not damage Unknown Boy;
- does not apply Stun, restraint or capture;
- does not modify Stats/PL;
- invalid selection rejects precommit, consumes no action and creates no false history.

This is the mechanical expression of Stephen's chosen tactical priority. It is available regardless of which legitimate Menma representation is current because it belongs to this encounter context, not to Menma's permanent repertoire.

---

## 4. Unknown Boy exact prepared package

Unknown Boy receives **no generic Basic Attack / Guard fallback**. The exact encounter package below is sufficient.

### 4.1 `arc2_unknown_boy_precision_palm`

Display: **Precision Palm**  
Primary discipline: Taijutsu  
Target: one hostile  
Attack PL: **28**

Resolution:

- one direct Battle-PL damage packet;
- ordinary defence / Stamina ordering;
- no automatic Stun, displacement, injury, guard break, seal effect or identity clue;
- observer-safe evidence may establish that Unknown Boy is a trained close-quarters combatant, but not Rank/faction/clan.

### 4.2 `arc2_unknown_boy_binding_tag`

Display: **Binding Tag**  
Primary discipline: Fūinjutsu  
Target: one hostile  
Attack PL: none

Resolution:

- establishes source-owned `arc2_unknown_boy_binding_tag_control` through the end of the target's next action opportunity;
- blocks voluntary movement/reposition-required actions only;
- does not block direct attacks, ordinary Skills, Hosted routes, chakra use or setup actions unless those exact actions themselves require movement/reposition;
- not Stun;
- not universal seal lock;
- same-source reapplication refreshes/replaces and does not stack;
- invalid target/state rejects precommit with no action/history.

Catalogue semantic reference: equivalent bounded movement-control shape to `skill_fuinjutsu_binding_tag`; this encounter action does not by itself grant catalogue ownership or reveal a named school/affiliation.

A committed, perceptible use may support observer Knowledge that Unknown Boy can perform **Fūinjutsu binding**, but nothing more specific about identity/allegiance.

### 4.3 `arc2_unknown_boy_line_breaking_strike`

Display: **Line-Breaking Strike**  
Primary discipline: Taijutsu  
Target: current Menma participant  
Attack PL: **25**

Resolution:

- one direct Battle-PL damage packet;
- ordinary defence / Stamina ordering;
- if committed `finalDamage > 0` while `arc2_m2_alley_exit_contested` is live, establish encounter state:

`arc2_m2_alley_exit_opening`

Opening lifecycle:

- remains live through the end of Unknown Boy's next action opportunity;
- may be consumed by `arc2_unknown_boy_slip_the_gap`;
- may be removed by valid `arc2_m2_reassert_exit_denial`;
- same-source recreation refreshes/replaces, never stacks.

The hit does **not** automatically displace Menma. The opening is a contextual factual opportunity created by forcing Menma to give ground / lose perfect line control, not a hidden knockback system.

### 4.4 `arc2_unknown_boy_barrier_knot`

Display: **Barrier Knot**  
Primary discipline: Fūinjutsu  
Target: self  
Attack PL: none

Resolution:

- source-owned guard setup;
- **30% pre-Stamina prevention** against the next qualifying direct damage packet;
- one packet only;
- consumed when applied;
- expires at the start of Unknown Boy's next action opportunity if unused;
- no aura, reflection, Stun or universal seal defence.

Catalogue semantic reference: exact bounded prevention shape of `skill_fuinjutsu_barrier_knot`; no catalogue ownership or school/faction inference is created merely from this encounter action.

### 4.5 `arc2_unknown_boy_slip_the_gap`

Display: **Slip the Gap**  
Primary discipline: contextual movement / escape  
Attack PL: none

Validity requires all of:

- encounter unresolved;
- `arc2_m2_alley_exit_opening` live;
- Unknown Boy capable of acting;
- Unknown Boy not currently under a movement/reposition-blocking state;
- no already committed capture/custody result.

On valid commit:

- consumes one normal Unknown Boy action opportunity;
- consumes `arc2_m2_alley_exit_opening`;
- commits factual early escape;
- encounter ends immediately with `unknownBoyEscapeResult = escaped_early`;
- `unknownBoyCaptureResult = failed`;
- Battle result is an opponent escape / unresolved-custody result, **not** automatic Menma death/defeat/injury;
- no identity, allegiance or Rank reveal follows.

Invalid selection rejects precommit with no action/history.

This is an encounter escape action, not a reusable global escape Skill and not hidden Speed/Evasion.

---

## 5. Unknown Boy tactical selection policy

Runtime may use deterministic authored tactical priority rather than random action selection.

When selecting an Unknown Boy action, evaluate in this order:

1. if `arc2_unknown_boy_slip_the_gap` is legal, prefer it;
2. if Menma is not currently movement/reposition restricted and no same-source Binding Tag is live, `arc2_unknown_boy_binding_tag` is preferred;
3. if no `arc2_m2_alley_exit_opening` is live, prefer `arc2_unknown_boy_line_breaking_strike`;
4. if Unknown Boy is at or below 50% of starting underlying Battle-PL maximum and no Barrier Knot is live, prefer `arc2_unknown_boy_barrier_knot`;
5. otherwise use `arc2_unknown_boy_precision_palm`.

This policy expresses observable escape intent. It does not guarantee escape, does not add initiative/Speed and does not author hidden intelligence omniscience.

---

## 6. Menma representation / action consumption

At Battle entry runtime must snapshot the exact current legitimate Menma combat representation from Chronicle/Registry state, including where applicable:

- representation ID;
- current Effective Stats / Battle PL source state;
- prepared Skills/actions;
- current capability/access predicates;
- legitimate Hosted-Entity participation;
- equipment / item projection already legally active.

Combat does **not** replace that palette merely because the opponent is Unknown Boy.

The only encounter-added Menma action is:

`arc2_m2_reassert_exit_denial`

All Character/Hosted actions must continue to satisfy their own existing access/source predicates. No Kurama/Echo/Bloodline/Transformation/weapon access is fabricated for this encounter.

---

## 7. Exact timed capture-window counter

Writing authority states:

- clean-capture window: fewer than five turns;
- once Turn 5 begins / `turnsElapsed >= 5`, clean capture is gone.

For this encounter, define `turnsElapsed` exactly as:

> **the 1-based count of Menma action opportunities that have begun in this Battle.**

Therefore:

- first Menma action opportunity opens with `turnsElapsed = 1`;
- second opens with `2`;
- third opens with `3`;
- fourth opens with `4`;
- immediately before a fifth Menma action can be selected, set/check `turnsElapsed = 5` and resolve the timed-departure branch.

Unknown Boy action opportunities do **not** increment this counter.

A Battle result achieved and committed during Menma turns 1–4 is evaluated immediately before any later timer transition.

The counter and all derived outcome flags must persist across save/load without replaying or skipping a turn.

---

## 8. Timed departure at Turn 5

At the point the fifth Menma action opportunity would begin, if the encounter is still unresolved:

- do not present a fifth Menma action selection;
- commit the Story-authorised timed departure outcome;
- `battleResult = opponent_departed_timer` (or canonical runtime equivalent preserving the same meaning);
- `unknownBoyCaptureResult = failed`;
- `unknownBoyEscapeResult = escaped_or_extracted_timer`;
- `unknownBoyExtractionOrRescueResult = not_distinguished_by_current_combat_evidence` unless a separate exact Story/World occurrence identifies the mechanism;
- no automatic identity/allegiance/Rank reveal;
- no automatic injury/death.

Combat must not invent the unseen extractor/rescuer merely because Writing permits "escapes or is extracted".

---

## 9. Outcome matrix

### A. Early Unknown Boy escape before Turn 5

Trigger:

`arc2_unknown_boy_slip_the_gap` legally commits before a Menma victory.

Return:

- `battleResult = opponent_escape`;
- `unknownBoyEscapeResult = escaped_early`;
- `unknownBoyCaptureResult = failed`;
- custody: none;
- survival: alive unless a separate exact occurrence says otherwise;
- no information reward by default;
- Story resumes from continuing cat-and-mouse state.

### B. Menma defeat / withdrawal before Turn 5

If Menma is legitimately defeated/withdrawn before capture is resolved:

- preserve exact Battle result;
- Unknown Boy is not automatically captured;
- `unknownBoyCaptureResult = failed`;
- `unknownBoyEscapeResult = escaped_after_menma_failure` unless an exact separate occurrence prevents departure;
- no automatic Menma injury/death;
- no identity/allegiance/Rank reveal.

### C. Timed failure

Condition:

`turnsElapsed >= 5` while unresolved.

Return the timed-departure package from Section 8.

### D. Fast Menma win, Menma at or below 50%

Conditions:

- Menma legitimately wins with `turnsElapsed < 5`;
- `menmaBattlePLPercentRemaining <= 50`.

Return:

- `battleResult = player_victory`;
- `unknownBoyCaptureResult = failed_costly_win`;
- `unknownBoyEscapeResult = escaped_or_extracted_after_costly_win`;
- custody: none;
- `informationRewardEligible = true`;
- `informationRewardRef` must remain null/pending until Writing/identity/Knowledge authority supplies an exact bounded clue; Combat must not invent a true name, ROOT proof, allegiance or clan;
- survival states remain factual and separate.

This is explicitly **Battle victory with custody failure**.

### E. Fast Menma win, Menma above 50%

Conditions:

- Menma legitimately wins with `turnsElapsed < 5`;
- `menmaBattlePLPercentRemaining > 50`.

Return:

- `battleResult = player_victory`;
- `unknownBoyEscapeResult = prevented`;
- `unknownBoyCaptureResult = secured_for_immediate_story_custody`;
- `custodyState = immediate_story_custody`;
- Unknown Boy remains the same stable person `person_arc2_unknown_boy_01`;
- custody does not imply cooperation, confession, identity reveal, ROOT proof, permanent imprisonment, injury or death;
- Story owns the subsequent interrogation/custody branch.

This conditional conversion is authorised by Writing's timed-outcome contract and must not be generalised into `Battle victory = capture` for other encounters.

---

## 10. Menma Battle-PL percentage

Capture-branch percentage uses Menma's **underlying Battle PL available at this encounter start**.

Persist:

- `menmaBattlePLStart`;
- `menmaBattlePLEnd`;
- `menmaBattlePLPercentRemaining`.

Formula:

`menmaBattlePLPercentRemaining = (menmaBattlePLEnd / menmaBattlePLStart) * 100`

Use the factual current underlying Battle-PL ledger after committed Battle effects. Do not introduce HP, Injury HP, Max HP or any separate health system.

Temporary capacity/source effects remain governed by their existing source ownership and cleanup rules; Coding must not silently redefine the denominator to obtain a preferred Story branch.

---

## 11. Observer-safe Technique evidence

The following committed Unknown Boy actions may be returned as observer-safe technique/capability evidence when Menma had legitimate perceptual access:

- `arc2_unknown_boy_precision_palm` — close-quarters/Taijutsu capability;
- `arc2_unknown_boy_binding_tag` — bounded Fūinjutsu binding capability;
- `arc2_unknown_boy_line_breaking_strike` — close-quarters exit-breaking tactic;
- `arc2_unknown_boy_barrier_knot` — bounded Fūinjutsu defensive capability;
- `arc2_unknown_boy_slip_the_gap` — escape/reposition behaviour.

Evidence may expose the exact action ID internally and an observer-safe display/discipline description externally.

It must **not** infer or expose:

- true name;
- ROOT membership;
- Danzō allegiance;
- clan;
- formal Rank;
- Bloodline;
- institutional training source.

`Fūinjutsu observed` is legitimate where a Fūinjutsu action visibly commits. `ROOT technique observed` is not authorised.

Technique selection/hover/rejected action is not evidence. Only committed/perceptible execution qualifies.

---

## 12. Injury / survival / withdrawal / custody separation

Battle PL depletion remains capability depletion, not physical injury.

This encounter package authors no automatic lethal action, injury table, unconsciousness or execution result.

Therefore:

- Menma or Unknown Boy reaching Battle withdrawal/depletion does not itself create injury/death;
- any injury requires an exact separately authorised action/occurrence rider already valid for the current Menma representation or later Story consequence;
- survival state must remain separate from `battleResult`;
- custody exists only under exact branch E or a later separately authored occurrence;
- escape does not erase prior committed Battle/Technique history.

---

## 13. Story return envelope

Return to the same Arc 2 Mission 2 Story caller with at minimum:

```text
encounterPackageId
missionId
callerSceneRef / continuationRef
currentMenmaRepresentationId
unknownBoyParticipantId = arc2_unknown_boy_01
unknownBoyStablePersonKey = person_arc2_unknown_boy_01
unknownBoyObserverProjection = observer_projection_arc2_unknown_boy
battleResult
turnsElapsed
menmaBattlePLStart
menmaBattlePLEnd
menmaBattlePLPercentRemaining
unknownBoyBattlePLStart = 60
unknownBoyBattlePLEnd
unknownBoyWithdrawalState
unknownBoyEscapeResult
unknownBoyCaptureResult
unknownBoyExtractionOrRescueResult
custodyState
menmaSurvivalState
unknownBoySurvivalState
menmaInjuryRefs[]
unknownBoyInjuryRefs[]
observedTechniqueRefs[]
informationRewardEligible
informationRewardRef
alleyExitContested
alleyExitOpeningLive
supportingBattleOccurrenceIds[]
supportingActionOccurrenceIds[]
```

Identity/allegiance/Rank Knowledge changes must be returned only when an exact separately authorised occurrence establishes them.

---

## 14. Save/load / idempotence

Persist at minimum:

- exact participant/stable-person identity;
- current Menma representation snapshot/source refs;
- starting Battle PL denominators;
- `turnsElapsed`;
- exit-contested/opening states and source occurrences;
- live Binding Tag / Barrier Knot state with lifecycle;
- committed action/Battle occurrence IDs;
- outcome branch if already committed;
- escape/capture/custody result;
- observed Technique evidence already committed;
- information-reward eligibility state.

Reload must not:

- reroll action choice/outcome;
- increment `turnsElapsed` merely from loading/rendering;
- recommit escape/capture;
- duplicate observer evidence;
- reveal identity;
- restore a consumed exit opening;
- replay a consumed Barrier Knot/Binding Tag state.

---

## 15. Minimum runtime regressions

1. Unknown Boy remains `arc2_unknown_boy_01` / `person_arc2_unknown_boy_01` through every branch.
2. Base PL remains exactly 60 with no hidden scaling.
3. Rank/affiliation stay hidden/null unless later authority changes them.
4. Exact prepared package contains only the five Unknown Boy actions in Section 4; no generic Basic/Guard.
5. Precision Palm resolves one PL28 packet with ordinary Stamina.
6. Binding Tag blocks movement/reposition only and is not Stun/global seal lock.
7. Line-Breaking Strike resolves one PL25 packet and only creates exit opening on positive final damage.
8. Barrier Knot prevents exactly 30% pre-Stamina for one qualifying packet and expires correctly.
9. Slip the Gap rejects unless exact opening + mobility predicates pass.
10. Valid Slip the Gap commits factual early escape without identity reveal.
11. Menma current representation/palette is caller-derived, not hard-coded.
12. `arc2_m2_reassert_exit_denial` appears only when opening is live, consumes one Menma action and does no damage.
13. Reassert rejects while Menma is movement/reposition blocked.
14. `turnsElapsed` is 1-based Menma action-opportunity count; Unknown Boy actions do not increment it.
15. Turns 1–4 remain capture-eligible; fifth Menma action is never offered while encounter unresolved.
16. Timer branch at 5 commits departure/custody failure idempotently.
17. Fast win <=50% Menma PL returns Battle victory + custody failure + information eligibility.
18. Fast win >50% Menma PL returns Battle victory + immediate Story custody, with no automatic confession/identity/ROOT proof.
19. Menma loss/withdrawal does not manufacture injury/death.
20. Battle PL depletion is not injury/unconsciousness.
21. Observer evidence only comes from committed/perceptible actions.
22. Observed Fūinjutsu does not reveal faction/school/ROOT.
23. Save/load preserves timer/opening/control/outcome state without duplicate occurrence.
24. Story resumes from returned factual envelope; Combat does not write later interrogation dialogue/outcomes.

---

## 16. Final lock

> **Arc 2 Mission 2 uses `arc2_m2_unknown_boy_alley_confrontation`: current Chronicle Menma versus `arc2_unknown_boy_01` (PL60). The alley begins as an encounter-level contested exit. Unknown Boy uses a bounded five-action escape-oriented package; Menma may spend a normal contextual action to reassert exit denial when an opening is created. The capture window is exactly Menma turns 1–4; before a fifth Menma action can begin, unresolved combat becomes timed custody failure. A fast Menma win at `<=50%` starting Battle PL is still a custody failure with bounded information eligibility; a fast win at `>50%` converts to immediate Story custody. None of these outcomes reveals Unknown Boy's true identity, affiliation or Rank by implication.**
