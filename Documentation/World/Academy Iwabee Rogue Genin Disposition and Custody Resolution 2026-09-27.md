# Academy Iwabee Origin — Rogue Genin Disposition and Custody Resolution

**Date:** 2026-09-27  
**Owner:** World / Missions / Events / Rewards  
**Source handoff:** GitHub #398  
**Status:** **WORLD CLOSED — IMPLEMENTATION REQUIRED**

## 1. Purpose

This contract closes the World-owned Rogue Genin disposition seam for Academy Iwabee after CE #397 accepted the direct confrontation as an intentionally overmatched fresh-Origin Battle.

Consume:

- `Documentation/Coordination/Academy_Iwabee_Rogue_Genin_Fresh_Origin_Overmatch_Reconciliation_2026-09-27.md` @ `dc06fa24f9fe97cbd4be13d132ab4adeb2005df3`;
- `Documentation/Coordination/Academy_Iwabee_Rogue_Genin_Battle_and_Escape_Block_Reconciliation_2026-09-27.md`;
- `Documentation/Story/Academy_Iwabee_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`;
- `Documentation/Combat/SC_Combat_Academy_Iwabee_Rogue_Genin_Consumer_and_Viability_Contradiction_2026-09-27.md`;
- `Documentation/Registry/Academy Iwabee Origin Rogue Genin Registry and PL Mapping 2026-09-27.md`.

This contract does not rebalance Iwabee or the Rogue, change PL Battle semantics, manufacture injury/death, create morality scoring, or add a material reward.

## 2. Stable World participants

Existing Rogue participant:

`iwabee_origin_rogue_genin_01`

Existing World source occurrence:

`occ_origin_iwabee_rogue_genin_response_resolution`

World now assigns the supervising practical instructor an occurrence-local stable World/Story participant ref:

`iwabee_origin_practical_instructor_01`

This is the same physically present Academy instructor already authored throughout Iwabee's practical.

It is **not** a new collectible/Registry Character, My Clan member, acquisition target, Battle participant, or named canon identity.

## 3. Instructor authority boundary

For this exact Academy-ground occurrence, the supervising instructor is authorised to:

- place themself between Academy students and the exposed hostile;
- order the Rogue to stop/back away;
- protect or recover Iwabee after Battle withdrawal;
- establish **temporary on-scene detention/control** over the Rogue when the Rogue is factually no longer contesting the scene;
- hold that temporary control pending ordinary offscreen Konoha handoff after the Origin scene.

The instructor does **not** automatically gain institutional custody merely by being present.

Use:

`custodyState = TEMPORARY_INSTRUCTOR_DETENTION`

with:

`custodyActorRef = iwabee_origin_practical_instructor_01`

when that temporary detention is factually established.

Do not invent a named ANBU, Police, Chūnin-response team or other institutional recipient merely to close this Origin. The later offscreen village handoff is outside the required Alpha scene and is not a second player-facing disposition.

## 4. Branch A — CONFRONT HIM

Battle identity remains:

- config: `academy_iwabee_origin_rogue_confrontation`;
- encounter: `origin_academy_iwabee:rogue_genin_confrontation`;
- player: `academy_iwabee`;
- opponent: `iwabee_origin_rogue_genin_01` consuming `rogue_genin` PL23;
- caller after `iwa_confront_05`;
- return: `iwa_confront_return_01`.

### A1. Expected fresh-Iwabee defeat

When Iwabee reaches 0 Remaining Battle PL before the Rogue:

1. Combat commits Iwabee withdrawal normally.
2. World does not infer injury, death, unconsciousness or Origin failure.
3. The Rogue uses the still-open exit rather than remaining to fight the supervising instructor.
4. The instructor's immediate priority is the withdrawn Academy student, not pursuit.
5. The Rogue escapes the Academy-ground occurrence.
6. No custody is established.

World result:

`rogueDisposition = ESCAPED_AFTER_IWABEE_WITHDRAWAL`

`custodyState = NONE`

`custodyActorRef = null`

`instructorIntervened = true`

`instructorIntervention = PROTECT_WITHDRAWN_STUDENT_NO_PURSUIT`

`earthReleaseUsedToConstrainRogueGenin = false`

The already-completed practical remains complete.

### A2. Legitimate Iwabee victory

If a legitimate current/inherited/developed state allows Iwabee to reduce the Rogue to 0 Remaining Battle PL first:

1. Combat commits Rogue withdrawal normally.
2. PL0 still does not mean injury/death/capture.
3. After Battle settlement, the supervising instructor steps in before the withdrawn Rogue can re-open the confrontation.
4. The Rogue is placed under temporary instructor detention pending ordinary offscreen Konoha handoff.
5. Iwabee does not personally become the custody actor.

World result:

`rogueDisposition = DETAINED_AFTER_ROGUE_BATTLE_WITHDRAWAL`

`custodyState = TEMPORARY_INSTRUCTOR_DETENTION`

`custodyActorRef = iwabee_origin_practical_instructor_01`

`instructorIntervened = true`

`instructorIntervention = SECURE_WITHDRAWN_ROGUE`

`earthReleaseUsedToConstrainRogueGenin = false`

Direct Battle victory does **not** satisfy IWA-02.

## 5. Branch B — BLOCK HIS ESCAPE WITH EARTH RELEASE

Player intent:

`BLOCK HIS ESCAPE WITH EARTH RELEASE`

At the already-closed factual boundary, Iwabee's Earth Release successfully raises/reshapes terrain across the authored open escape route and commits:

`earthReleaseUsedToConstrainRogueGenin = true`

`rogueGeninParticipantRef = iwabee_origin_rogue_genin_01`

This commits IWA-02 once.

### Current Alpha World outcome

For this authored branch:

- the open escape route is successfully blocked/narrowed;
- no second equally open escape route is available inside the authored Academy-yard occurrence;
- the constraint causes no PL damage, Stun, first-turn bonus or hidden Battle state;
- Iwabee does not need to win the overmatched PL Battle to make the environmental action matter;
- the supervising instructor is already present and closes on the now-constrained Rogue;
- the Rogue yields rather than initiating a second PL Battle against Iwabee under the current Alpha branch.

World result:

`rogueDisposition = SURRENDERED_AFTER_EARTH_ROUTE_CONSTRAINT`

`custodyState = TEMPORARY_INSTRUCTOR_DETENTION`

`custodyActorRef = iwabee_origin_practical_instructor_01`

`instructorIntervened = true`

`instructorIntervention = ACCEPT_SURRENDER_AND_SECURE`

`alternateEscapeRouteAvailable = false`

`followupBattleOccurred = false`

This is a factual World resolution, not a hidden Combat debuff.

### Anti-collapse

- constrained != Stunned;
- constrained != damaged;
- constrained != captured automatically;
- IWA-02 commits from Iwabee's factual Earth-Release constraint;
- temporary detention commits only when the instructor subsequently secures the surrendered Rogue;
- surrender != morality reward;
- no material reward is created.

## 6. Branch C — CALL THE INSTRUCTOR

Although #398's principal blocker concerns direct confrontation and escape-block, Coding needs one complete Rogue-response matrix for the current four-choice Story surface.

When Iwabee calls the instructor:

1. Iwabee keeps the Rogue in view and alerts the supervising adult.
2. The instructor moves between the students and the Rogue.
3. Because the escape route has not been constrained, the Rogue disengages and uses the open route to leave rather than contest the instructor.
4. The instructor does not abandon the students to pursue.

World result:

`rogueDisposition = ESCAPED_AFTER_INSTRUCTOR_ESCALATION`

`custodyState = NONE`

`custodyActorRef = null`

`instructorIntervened = true`

`instructorIntervention = SHIELD_STUDENTS_NO_PURSUIT`

`earthReleaseUsedToConstrainRogueGenin = false`

IWA-02 remains false.

Calling the instructor is a legitimate response and carries no cowardice/incompetence/morality flag.

## 7. Branch D — FINISH THE PRACTICAL

When Iwabee deliberately stays with the assigned practical instead of diverting to the Rogue:

- the Rogue uses the still-open route and leaves the occurrence;
- the instructor remains responsible for the Academy ground/students rather than creating an offscreen chase;
- Iwabee does not receive Rogue-resolution credit.

World result:

`rogueDisposition = ESCAPED_WHILE_IWABEE_FINISHED_PRACTICAL`

`custodyState = NONE`

`custodyActorRef = null`

`instructorIntervened = false`

`instructorIntervention = NONE`

`earthReleaseUsedToConstrainRogueGenin = false`

IWA-01 remains complete. IWA-02 remains false.

This is not a morality/personality failure.

## 8. World commit boundary

Use the existing source occurrence:

`occ_origin_iwabee_rogue_genin_response_resolution`

Commit it **once**, when the selected Rogue-response branch has reached stable factual resolution.

The occurrence must carry at minimum:

- `actorVariantId = academy_iwabee`;
- `rogueGeninParticipantRef = iwabee_origin_rogue_genin_01`;
- `academyInstructorRef = iwabee_origin_practical_instructor_01`;
- `responseRoute`;
- `earthReleaseUsedToConstrainRogueGenin`;
- `battleOccurrenceId` or null;
- `battleResult` or null;
- `iwabeeBattleWithdrawn`;
- `rogueBattleWithdrawn`;
- `rogueDisposition`;
- `custodyState`;
- `custodyActorRef` or null;
- `instructorIntervened`;
- `instructorIntervention`;
- `alternateEscapeRouteAvailable` where relevant;
- `followupBattleOccurred`;
- `trainingGroundReshapeObjectiveCompletedByIwabee = true`;
- `originFailure = false`;
- `injuryInferred = false`;
- `deathInferred = false`.

The exact Battle occurrence ID is supporting Combat ancestry; it does not replace this World occurrence.

## 9. Story-safe result envelope

Story may consume only factual result fields. Recommended projection:

```text
sourceOccurrenceId
rogueGeninParticipantRef
responseRoute
earthReleaseUsedToConstrainRogueGenin
battleResult
iwabeeBattleWithdrawn
rogueBattleWithdrawn
rogueDisposition
custodyState
custodyActorRef
instructorIntervened
instructorIntervention
trainingGroundReshapeObjectiveCompletedByIwabee
originFailure
```

Story must not infer:

- injury/death from Battle PL;
- capture merely from Rogue withdrawal;
- IWA-02 from direct Battle victory;
- morality/personality from route selection;
- material reward from Rogue resolution.

## 10. Reward

**Non-Battle Rogue-response material reward: NONE.**

The later Stephen-approved global Battle-money rule supersedes the old implication that the embedded direct PL Battle itself can pay nothing.

For new executions:

- non-Battle Rogue-response choices do not mint route cash;
- a legitimate victory in `academy_iwabee_origin_rogue_confrontation` pays **50 Ryō** from `iwabee_origin_rogue_genin_battle_victory_ryo_01`;
- Battle defeat pays 0 Battle Ryō;
- the universal sealed-Origin Starting Purse remains a separate **100 Ryō** source;
- no Item, Weapon, loot or generic Character EXP is added by this disposition occurrence.

Current successor reward-spectrum authority:

`Documentation/World/Academy Origins Reward Spectrum Respec Wave 2 2026-10-01.md`

This is not a punishment. The meaningful non-cash route outputs remain:

- IWA-01 practical completion and Earth-Release development;
- IWA-02 adaptive Earth-Release evidence when the escape constraint is used;
- exact Rogue disposition/history;
- instructor observer/history;
- exact Battle/action-derived development where separately earned under Combat/Progression authority.

## 11. Save/load and idempotence

The World resolution must not reroll on:

- save/load;
- browser refresh;
- Story re-entry;
- Battle Victory/Defeat presentation reopen;
- repeated result projection.

Once `occ_origin_iwabee_rogue_genin_response_resolution` commits its route outcome, later presentation consumes the committed facts.

A Battle retry that belongs to the same unresolved Story occurrence must not produce two final Rogue dispositions.

## 12. QA minimum

Coding must prove:

1. fresh direct confrontation can end in Iwabee withdrawal without Origin failure;
2. expected Iwabee withdrawal commits Rogue escape, not custody/injury/death;
3. legitimate direct Battle victory commits Rogue withdrawal first, then instructor detention;
4. direct Battle victory leaves IWA-02 false;
5. escape-block commits IWA-02 before final detention;
6. escape-block does not mutate PL, Stun, initiative or starting Battle state;
7. current Alpha escape-block branch does not launch a second PL Battle;
8. CALL THE INSTRUCTOR commits Rogue escape with student-shielding intervention;
9. FINISH THE PRACTICAL commits Rogue escape without Iwabee Rogue-resolution credit;
10. IWA-01 remains complete on every route;
11. no route grants fixed material reward;
12. save/load/re-entry does not reroll or duplicate the World resolution.

## Final lock

> **Fresh Academy Iwabee is expected to lose the direct PL confrontation, after which the Rogue escapes while the supervising instructor protects Iwabee. A legitimate Iwabee victory leaves the Rogue Battle-withdrawn and allows the supervising instructor to establish temporary detention. Blocking the escape route with Earth Release commits IWA-02 and, in the current Alpha branch, leads to Rogue surrender and temporary instructor detention without a second Battle. Calling the instructor or finishing the practical leaves the unconstrained Rogue able to escape. Terrain success, Battle result, IWA-02, custody and material rewards remain separate facts.**
