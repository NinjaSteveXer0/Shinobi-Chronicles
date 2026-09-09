# Shinobi Chronicles — Arc 1 Mission 5 Female Operator Combat Closure

**Date:** 2026-09-09  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **COMBAT AUTHORITY CLOSED — ISSUE #51 CONSUMED**

## 1. Authority consumed

This closure consumes without reopening:

- `Documentation/Registry/Mission 5 Female Operator Identity and PL Ratification.md`
- `Documentation/Story/Arc1_Missions2-10_Machine_Addressable_Story_Runtime_Contract_2026-09-09.md`
- GitHub issue #51

Story seam:

- Mission: `arc1_m5_academy`
- Story Scene: `scene_arc1_m5_academy_third_bell`
- confrontation occurrence: `occ_arc1_m5_female_operator_confrontation_reached`
- Story -> Battle seam: `battle_seam_arc1_m5_female_operator_confrontation`

Registry authority:

- stable participant: `arc1_female_operator`
- Base Stats N/T/B/F/K/G/S: `48 / 44 / 42 / 57 / 58 / 52 / 50`
- Base PL: **56**
- formal Rank: unknown / not authorised
- wider affiliation: concealed
- baseline observer projection: `observer_projection_female_operator`
- full-commitment observer projection: `observer_projection_female_operator_unleashed`

Preserve throughout:

- stable identity != observer projection;
- Female Operator != Female Operator Unleashed as a second person;
- Base PL != Battle state;
- full commitment != automatic Base mutation;
- Battle victory != calibration-redirection success;
- Battle victory != Third Bell propagation/acceptance;
- physical card != Registry identity authority.

---

# 2. Encounter package

Exact encounter package ID:

`arc1_m5_female_operator_confrontation_encounter`

Exact opposition participant:

`arc1_female_operator`

The Story caller supplies the exact current allied/other active participant IDs and side assignments.

Combat must not infer participation from:

- scene presence;
- ordinary team membership;
- My Clan assignment;
- the developer-authoring party;
- observer projection.

`arc1_female_operator` starts from exact Base PL56 authority. No random Battle-entry PL, elite multiplier, groupBoss multiplier, guardBoss multiplier, map-tier scaling, mission-number scaling or player-level scaling is authorised.

No generic enemy Basic Attack / Guard fallback is authorised by this closure.

Encounter objective exposed to Combat:

`resolve_female_operator_hostile_confrontation`

This objective means resolve the current hostile Battle seam factually. It does not encode the later Academy calibration/Third-Bell Story result.

---

# 3. Female Operator prepared Action package

## 3.1 `arc1_female_operator_calibration_lance`

Display: **Calibration Lance**

Classification:

Fūinjutsu/Kinjutsu-supported direct technical attack.

Target:

one valid hostile Battle participant.

Authored Attack PL:

- ordinary state: **30**;
- if the target currently has same-source live `recognition_interference` established by `arc1_female_operator_recognition_bind`: **35**.

Resolution:

- one direct Battle-PL damage packet;
- ordinary pre-Stamina defence then ordinary Stamina mitigation;
- no automatic Condition merely because positive damage occurs;
- the enhanced packet does not consume `recognition_interference`; that state follows its own exact lifetime.

No generic bonus applies against seals, Genin, Menma, hosted entities, Academy participants or low-PL targets.

## 3.2 `arc1_female_operator_recognition_bind`

Display: **Recognition Bind**

Classification:

recognition/calibration-route control.

Attack PL:

none.

Target:

one valid hostile participant only when the current caller/Battle context exposes an exact compatible recognition/receiver/calibration route on that target.

Legitimate context may include an exact caller-supplied receiver/recognition state reference. Combat must not infer such a route merely from identity, card art, Story prose or the fact that the target is Menma.

Valid resolution establishes source-owned:

`recognition_interference`

Lifetime:

through the end of the target's next action opportunity.

Effect:

- blocks voluntary Actions explicitly tagged `requiresRecognitionRoute: true`;
- blocks voluntary Actions explicitly tagged `requiresCalibrationRoute: true`;
- does not block ordinary movement;
- does not block ordinary Ninjutsu/Taijutsu/Genjutsu/Bukijutsu/Fūinjutsu/Kinjutsu merely by category;
- does not disable ordinary Hosted-Entity routes unless that exact Action is also explicitly tagged with one of the two compatible route requirements above;
- is not Stun;
- is not chakra suppression;
- is not a universal seal lock;
- does not change Knowledge or identity truth.

Same source reapplication refreshes the lifetime; it does not create parallel stacking streams.

Invalid/no compatible route -> reject precommit, consume no action and create no history.

## 3.3 `arc1_female_operator_calibration_seize`

Display: **Calibration Seize**

Classification:

Academy-system contextual control action.

Attack PL:

none.

Target:

an exact caller-supplied current Academy calibration/system context reference.

Required validity:

- the caller supplied an exact addressable calibration/system context;
- that context is currently exposed/interactive at this Battle seam;
- Female Operator is still capable of acting.

Valid resolution establishes source-owned:

`operator_calibration_control`

on that exact supplied context.

Lifetime:

until the first of:

- Female Operator is neutralised/incapable;
- an exact owning Story/system occurrence removes or supersedes the state;
- the Battle ends.

Semantics:

- records that the Operator successfully seized/held the current calibration context during the confrontation;
- does **not** itself commit `occ_arc1_m5_calibration_redirected_into_receiver`;
- does **not** itself commit `occ_arc1_m5_third_bell_propagation_accepted`;
- does not rewrite recognition truth;
- does not permanently alter the Academy system;
- does not grant the Operator ownership of the calibration system;
- does not apply damage or a hidden Stat/PL modifier.

The final live/cleared state and supporting occurrence IDs are returned to Story for continuation.

Invalid/missing exact system target -> reject precommit, consume no action and create no history.

## 3.4 `arc1_female_operator_threaded_pulse`

Display: **Threaded Pulse**

Classification:

Ninjutsu/Fūinjutsu area-pressure action.

Targets:

up to **2** valid hostile Battle participants.

Authored Attack PL:

**24 per target**.

Resolution:

- one independent direct Battle-PL packet per selected target;
- ordinary defence/Stamina resolution for each packet;
- no automatic control, Burning, Poison, Stun, displacement or recognition rider.

This is not a hidden multi-projectile combo and does not multiply the Operator's Base PL.

## 3.5 `arc1_female_operator_counterseal_guard`

Display: **Counterseal Guard**

Classification:

self defensive setup.

Attack PL:

none.

Valid resolution establishes source-owned prevention against:

- the next qualifying direct Attack-PL packet against Female Operator;
- **30% pre-Stamina prevention** in ordinary commitment state.

The state:

- applies to one packet only;
- expires at the start of Female Operator's next action opportunity if unused;
- is not a permanent defence aura;
- does not redirect attacks;
- does not grant evasion or Speed.

---

# 4. Female Operator — Unleashed full-commitment state

Exact Combat state ID:

`arc1_female_operator_unleashed_commitment`

This is a same-person Battle commitment state. It is not a Transformation ontology and does not create a second Battle participant or ledger.

## 4.1 Trigger

Once per encounter, at the **start of Female Operator's action opportunity**, if all are true:

- the encounter remains unresolved;
- Female Operator is not neutralised/incapable;
- her current underlying Remaining Battle PL is **<= 50%** of her starting underlying Battle-PL maximum;
- this commitment state has not already committed in the encounter;

Combat commits:

`arc1_female_operator_unleashed_commitment`

and changes observer-facing presentation to:

`observer_projection_female_operator_unleashed`

for observers legitimately receiving that projection.

## 4.2 What Unleashed does NOT do

Unleashed does not:

- alter Base Stats;
- alter Base PL56;
- refill Remaining Battle PL;
- create a second capacity bar;
- remove prior damage;
- create a second person;
- create an extra action opportunity;
- grant generic Speed/Evasion;
- multiply all authored output.

## 4.3 Exact full-commitment authored output changes

While `arc1_female_operator_unleashed_commitment` is live:

### Calibration Lance

`arc1_female_operator_calibration_lance`

Attack PL becomes:

- **34** normally;
- **39** against a target with same-source live `recognition_interference`.

### Threaded Pulse

`arc1_female_operator_threaded_pulse`

Attack PL becomes:

**27 per target**, max 2 targets.

### Counterseal Guard

`arc1_female_operator_counterseal_guard`

pre-Stamina prevention becomes:

**35%** against the next qualifying direct packet.

Recognition Bind and Calibration Seize retain their exact ordinary semantics and do not become broader merely because Unleashed is active.

The commitment state lasts until the encounter ends. Save/load must preserve whether it has already committed; reloading must not retrigger a second transition occurrence.

---

# 5. Recognition / calibration non-collapse

Combat exposes only factual Battle-side technical occurrences.

The following Story-owned occurrences remain outside Combat authority:

`occ_arc1_m5_calibration_redirected_into_receiver`

`occ_arc1_m5_third_bell_propagation_accepted`

Combat must never emit either occurrence merely because:

- Female Operator is defeated;
- Female Operator enters Unleashed;
- `operator_calibration_control` was established or removed;
- Menma survived;
- a recognition-related Action succeeded;
- the Battle returned `victory`.

Story receives Combat facts and evaluates/commits its own later occurrence boundaries.

Preserve:

**Battle technical pressure != Story calibration redirection**  
**recognition interference != identity rewrite**  
**Battle victory != Third Bell acceptance**

---

# 6. Battle outcome and life-state semantics

Combat may resolve factual Battle results including:

- allied-side victory / Female Operator neutralised;
- Female Operator victory;
- allied-side withdrawal;
- Female Operator withdrawal/escape only where an exact committed escape/disengage occurrence actually occurs;
- unresolved/interrupted encounter where Story/World supplies a legitimate interruption.

Battle PL reaching zero/withdrawal threshold means Combat incapability/withdrawal according to existing Battle doctrine. It does not automatically establish:

- death;
- unconsciousness;
- permanent injury;
- custody;
- escape;
- execution;
- faction reveal.

Death, injury, custody or escape must be separately supported by exact committed occurrence/consequence authority.

No automatic Female Operator escape action is authored by this closure. If she escapes, that must come from an existing legal disengage/escape path or exact Story/World consequence rather than a hidden boss escape rule.

---

# 7. Story return envelope

On Battle termination return to the same Story scene:

`scene_arc1_m5_academy_third_bell`

Return at minimum:

- `encounterPackageId: arc1_m5_female_operator_confrontation_encounter`;
- `storyBattleSeamId: battle_seam_arc1_m5_female_operator_confrontation`;
- exact caller-supplied active participant IDs and side assignments;
- stable Female Operator participant ID `arc1_female_operator`;
- final observer projection actually shown where relevant;
- Battle completed/result state;
- Female Operator factual combat outcome;
- remaining/withdrawal Battle state where runtime exposes it;
- `unleashedCommitted` boolean;
- Unleashed transition occurrence ID when committed;
- exact recognition-interference occurrence/state refs;
- exact caller-supplied Academy calibration/system context ref if one was supplied;
- factual calibration-control state `not_applicable | untouched | operator_controlled | cleared` or exact canonical runtime equivalent;
- supporting committed Action/Battle occurrence IDs;
- separately supported injury/death/custody/escape facts if any;
- caller continuation context required to resume `scene_arc1_m5_academy_third_bell`.

Story must not infer its two later mandatory/branch factual occurrences from `battleResult` alone.

---

# 8. Observer / Knowledge boundary

Persistent history always attaches to:

`arc1_female_operator`

not to either observer projection key.

Current Battle does not reveal her wider affiliation, formal Rank or true personal name.

Unleashed presentation proves only observed full commitment in this encounter. It does not prove:

- a Transformation;
- a bloodline;
- a faction;
- a formal Rank;
- a second identity;
- a permanent capability change.

---

# 9. Required Alpha regression

Coding must cover at minimum:

1. exact stable participant remains `arc1_female_operator` before/after Unleashed;
2. Base Stats remain `48/44/42/57/58/52/50` and Base PL56;
3. no retired/random/mission/player/boss scaling occurs;
4. caller active participants/side assignments are preserved rather than inferred;
5. Calibration Lance ordinary PL30;
6. Calibration Lance PL35 only with same-source live `recognition_interference`;
7. Recognition Bind rejects no-compatible-route target precommit with no action/history;
8. Recognition Bind blocks only explicit recognition/calibration route Actions and is not Stun;
9. Calibration Seize requires exact caller-supplied Academy system context;
10. Calibration Seize does not commit Story calibration-redirection or Third-Bell occurrences;
11. Threaded Pulse PL24 each / max2 / ordinary Stamina;
12. Counterseal Guard 30% pre-Stamina / one packet / correct expiry;
13. Unleashed commits once only at start of Operator action opportunity at <=50% starting underlying Battle-PL maximum;
14. Unleashed does not refill capacity or change Base Stats/PL;
15. observer projection switches to `observer_projection_female_operator_unleashed` without changing stable identity;
16. Unleashed Calibration Lance PL34 / PL39 with same-source recognition interference;
17. Unleashed Threaded Pulse PL27 each max2;
18. Unleashed Counterseal Guard 35% one packet;
19. save/load preserves Unleashed commitment idempotently;
20. no generic Basic/Guard fallback is fabricated;
21. Battle result remains separate from `occ_arc1_m5_calibration_redirected_into_receiver`;
22. Battle result remains separate from `occ_arc1_m5_third_bell_propagation_accepted`;
23. Battle defeat does not auto-create death/injury/custody/escape;
24. concealed affiliation/Rank remain concealed;
25. invalid/precommit requests create no false Chronicle history.

---

# 10. Final Combat status

Arc 1 Mission 5 Female Operator Combat authority is **CLOSED**.

Exact encounter:

`arc1_m5_female_operator_confrontation_encounter`

Exact stable opposition participant:

`arc1_female_operator`

Prepared Action IDs:

- `arc1_female_operator_calibration_lance`
- `arc1_female_operator_recognition_bind`
- `arc1_female_operator_calibration_seize`
- `arc1_female_operator_threaded_pulse`
- `arc1_female_operator_counterseal_guard`

Full-commitment state:

`arc1_female_operator_unleashed_commitment`

Unleashed is a bounded authored same-person commitment state with stronger exact Action outputs and presentation change, **not** a second Base package, second person, automatic multiplier or Transformation ontology.

Coding may now implement the exact Mission 5 Story -> Battle -> same Story return against this authority.