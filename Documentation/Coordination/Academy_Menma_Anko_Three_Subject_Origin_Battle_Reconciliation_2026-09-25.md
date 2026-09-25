# Shinobi Chronicles — Academy Menma + Anko vs Three Test Subjects Origin Battle Reconciliation

**Date:** 2026-09-25  
**Owner:** CE / Codex / Coordination, preserving Writing, Combat, World, Registry and Coding ownership  
**Source handoff:** #358  
**Status:** **CE SUCCESSOR CONTRACT CLOSED / COMBAT PACKAGE REQUIRED / RUNTIME NOT YET IMPLEMENTED OR VALIDATED**  
**Primary priority:** Finish Shinobi Chronicles Alpha without reopening the held six-shinobi Battle redesign.

---

## 1. Collision being resolved

Current Writing authority for Academy Menma Scene 7 is:

> **Menma + Anko vs three former Orochimaru test subjects.**

Exact opposition identities:

- `test_subject_altered_shinobi`
- `test_subject_brute`
- `test_subject_unstable`

This supersedes the older intended Scene 7 composition in which:

- Menma directly fought only `test_subject_altered_shinobi`;
- Anko remained occupied with Brute + Unstable outside Menma's direct Battle deployment;
- the tutorial Battle was one-on-one.

This reconciliation changes only the Scene 7 Battle seam and its directly dependent Combat/World evidence.

It does not reopen Menma's Story motive, Nine-Tails boundary, Anko's characterization, Orochimaru relevance, final ambition choice, or backdrop mapping.

---

## 2. Relationship to the held six-shinobi Battle redesign

This Scene 7 correction is **not** authorization to implement the new six-shinobi relay / alternating-side-turn redesign.

The standing redesign state remains:

~~~text
SIX-SHINOBI BATTLE DESIGN = LOCKED
FAILURE/RECOVERY SAFEGUARDS = LOCKED
NEW BATTLE REDESIGN IMPLEMENTATION = HOLD
~~~

Academy Menma Scene 7 must be implemented, when authorised downstream, as a **scoped current-runtime multi-participant Story Battle**.

Do not import unfinished future semantics such as:

- new Active/Benched/Reserve relay action economy;
- future replacement rules;
- future PvP ordering;
- new reaction/interrupt systems merely to make this Origin work.

---

## 3. Current framework capability finding

### Structurally supported now

Current live Battle source already provides:

- six semantic deployment slots per side through `createBattleDeploymentSlots`;
- participant-backed multi-enemy storage through `currentBattle.enemyParticipants` and `enemyParticipantOrder`;
- exact participant identity lookup for multiple enemy participants;
- explicit Story Battle participant envelopes / side assignments in existing runtime patterns;
- current Battle presentation projection for slots 1–4, which is sufficient to display this 2-v-3 encounter without implementing the future Reserve line.

Therefore the requested composition does **not** require a brand-new general Battle engine merely to exist.

### Not production-ready by configuration alone

Current ordinary player-side deployment resolves participants through `getPlayerCharacter(...)` / `playerTeam`.

`sj_anko` is a live Registry Character with portrait authority, but she is not the player's owned My Clan teammate merely because she participates in this Story Battle.

Therefore:

> **Do not solve Anko participation by silently granting ownership, assigning her to My Clan, or leaving a permanent player-team materialization behind.**

The existing runtime contains precedent for scoped/transient Story Battle participant materialization and cleanup. Menma Scene 7 requires the same ownership-safe principle.

Conclusion:

> **CURRENT FRAMEWORK = STRUCTURALLY CAPABLE, BUT MENMA SCENE 7 REQUIRES A SCOPED ALLIED-NPC PARTICIPANT ADAPTER / ACTION PACKAGE BEFORE IT IS IMPLEMENTED.**

---

## 4. Exact participant contract

### Allied side

1. `academy_menma`
   - Origin protagonist;
   - player-controlled Battle actor;
   - required tutorial-performance subject;
   - no automatic Nine-Tails/Kurama help.

2. `sj_anko`
   - exact Registry representation for Special Jōnin Anko;
   - autonomous allied NPC participant;
   - **not player-controlled**;
   - **not My Clan ownership/assignment**;
   - **not an acquisition grant**;
   - no transformation inference;
   - preserve Registry guard: untransformed `sj_anko`, not `cs_anko` or `l2_anko`.

### Opposition side

1. `test_subject_altered_shinobi`
2. `test_subject_brute`
3. `test_subject_unstable`

No additional test subject or generic replacement may be inferred.

---

## 5. Current-runtime deployment order

For this scoped Origin encounter, use this authored deployment order:

~~~text
ALLIED
slot 1 = academy_menma
slot 2 = sj_anko
slots 3–6 = empty

OPPOSITION
slot 1 = test_subject_altered_shinobi
slot 2 = test_subject_brute
slot 3 = test_subject_unstable
slots 4–6 = empty
~~~

Why Altered Shinobi remains opposition slot 1:

- it preserves continuity with the previously authored focal tutorial opponent;
- its existing action/reward/evidence lineage remains identifiable;
- no new lore meaning is inferred from slot order.

This slot order is a **current-runtime encounter projection**, not a new general rule about future Active/Benched/Reserve action economy.

---

## 6. Encounter identity and objective

The old encounter identity:

`origin_academy_menma_prologue:altered_shinobi`

is superseded for new Scene 7 executions.

Successor encounter identity:

`origin_academy_menma_prologue:three_test_subjects`

Semantic objective:

> **Stop the Test Subjects.**

Objective completion requires the encounter to resolve all three exact hostile participants as withdrawn/defeated under Combat truth.

0 Battle PL remains **withdrawal**, not factual death or injury.

### Menma-specific failure boundary

Academy Menma is the required tutorial subject.

If Menma reaches withdrawal before the three-subject objective is completed:

- the Menma tutorial is not completed;
- MEN-03 performance cannot become a completed bucket;
- Anko remaining capable of fighting does not convert Menma's personal tutorial result into success.

This prevents the player from losing Menma and then receiving a successful Menma performance result because an autonomous NPC finished the encounter.

Anko withdrawal by itself does not invalidate Menma victory if Menma remains active and legitimately completes the three-subject objective.

---

## 7. Anko control and action ownership

Anko is an **autonomous allied participant**.

The player controls Menma only.

Do not expose Anko's action palette as a second player-controlled action dock.

Combat owns the exact autonomous Anko action package and current-runtime scheduling rule.

Requirements for that package:

- consume established Anko capability authority;
- do not derive generic damage from Rank/PL;
- do not invent a transformation;
- do not use `cs_anko` / `l2_anko` capability packages as if active;
- preserve her ability to restrain/control/intercept where current authority supports it;
- do not make Anko a passive decorative portrait;
- do not let Anko's actions count as Menma's tutorial actions;
- do not let Anko trivially replace Menma as the actual subject of the tutorial.

The exact autonomous action cadence / scheduler integration remains **Combat-owned downstream closure** because current source does not yet expose a canonical ordinary allied-NPC scheduler for this Origin.

This is a current-runtime content seam, not permission to invent the future Battle redesign's general ally-turn architecture.

---

## 8. Opposition action packages

The three opposition identities and existing calibrated Base PL remain:

- `test_subject_altered_shinobi` — Base PL 11;
- `test_subject_brute` — Base PL 13;
- `test_subject_unstable` — Base PL 12.

Their already-authored enemy action packages remain the starting Combat authority.

The new encounter changes **deployment/participation**, not their identity.

Combat must verify that:

- each currently deployed hostile can receive an authorised action opportunity under the scoped encounter;
- target legality works with Menma + Anko both present;
- no slot-1-only assumption silently makes Brute/Unstable decorative;
- one hostile withdrawal does not prematurely end the three-subject objective.

Do not infer a shared pooled enemy PL.

Each test subject retains its own participant identity and Battle PL ledger.

---

## 9. Menma capability identity

Writing's capability benchmark remains binding at the Story -> Battle seam:

- Menma is especially strong in **Kinjutsu** and **Fuinjutsu**;
- he must not become a generic fighter merely because the old five-action tutorial palette was narrow.

Current ordinary Menma tutorial actions are not, by themselves, Kinjutsu observation-qualifying.

Therefore Combat must verify the Origin-scoped legal action package against current Menma capability authority before implementation.

If current durable capability authority supplies a legitimate Kinjutsu/Fuinjutsu technique or action for Academy Menma, the Scene 7 package should expose it where contextually legal.

If exact capability authority is missing, Combat must return the missing authority rather than invent a technique from later Menma variants.

No ANBU/Genin/Kage Menma technique may leak backward merely because another representation has it.

---

## 10. MEN-01 / MEN-02 action evidence

MEN-01 and MEN-02 remain exact Combat-action-sourced evidence.

### MEN-02 remains Kinjutsu-specific

Do **not** silently redefine MEN-02 into "Kinjutsu or Fuinjutsu observed."

A qualifying MEN-02 observation still requires:

- an actual committed Menma action;
- the action to be authored as Kinjutsu or explicitly observation-qualifying under existing authority;
- exact Menma actor identity;
- legitimate Anko observer access;
- perceptibility;
- no explicit observation blocker.

### Fuinjutsu observation

Writing may react to legitimately observed Menma Fuinjutsu use if exact committed action evidence exists.

That evidence does **not** automatically become MEN-02 unless MEN-02 is separately re-authorised.

Therefore:

> **observed Fuinjutsu evidence != MEN-02 Kinjutsu observation evidence**

---

## 11. Anko observer eligibility inside the same Battle

Anko participating in the Battle does not remove her observer eligibility.

For a Menma action to be legitimately observable by Anko:

- `sj_anko` must be an active/present allied participant at the time of the committed Menma action;
- she must not already have withdrawn from the encounter;
- the exact action must be perceptible under its action/evidence contract;
- no explicit observer blocker may be active;
- the observation must point to the exact committed Menma action occurrence/evidence.

Being in the same Battle establishes possible legitimate access.

It does **not** mean Anko automatically knows every capability Menma owns.

Machine-known capability remains distinct from observer Knowledge.

The old `anko_peripheral_clearing` framing should be superseded for this Scene 7 execution by same-Battle participant observation provenance.

---

## 12. MEN-03 successor performance contract

Preserve the stable aggregate source occurrence ID:

`combat_academy_menma_tutorial_performance_resolved`

Preserve MEN-03 consequence identity:

`academy_menma_tutorial_performance_evidence`

Do **not** create a second MEN-03 merely because the encounter now has more participants.

### Encounter binding

New executions bind MEN-03 to:

`origin_academy_menma_prologue:three_test_subjects`

and the exact opposition set:

~~~text
test_subject_altered_shinobi
test_subject_brute
test_subject_unstable
~~~

A new MEN-03 source record should represent an encounter/opposition set rather than semantically claiming Altered Shinobi was the sole opponent.

Supported old saves containing the already-committed legacy MEN-03 occurrence remain historical truth and must not be rewritten/rerolled.

### Menma-only attribution

MEN-03 continues to measure **Menma's performance**, not side performance.

Count only Menma-attributable evidence for:

- `startingUnderlyingBattlePLMaximum`;
- `grossFinalPLDamageReceived`;
- `pressureRatio`;
- `criticalExposure`;
- `committedMenmaActionOpportunities`;
- `meaningfullyResolvedMenmaActions`;
- `actionExecutionRatio`.

Do not count as Menma performance:

- Anko actions;
- Anko damage;
- damage received by Anko;
- Anko control/restraint;
- the number of enemies Anko personally withdraws.

### Completion

`tutorialResult = completed` only when:

- the three-subject objective is committed complete;
- all three exact hostile participants are resolved under the encounter victory condition;
- Menma did not already fail the tutorial through his own withdrawal.

Otherwise:

- `tutorialResult = not_completed`;
- `performanceBucket = null`.

### Alpha bucket thresholds

The current Alpha thresholds remain the minimum-change calibration because they are ratios over Menma's own Battle state/action evidence rather than opponent count:

- **high**: pressure ratio <= 0.30, no critical exposure, action execution ratio >= 0.75;
- **low**: pressure ratio > 0.65, or critical exposure, or action execution ratio < 0.50;
- otherwise **middle**.

Do not change those numbers merely because the encounter became 2-v-3.

Combat/browser evidence may justify a later calibration change, but that would be a separate authority change with explicit evidence.

### Supporting ancestry

MEN-03 supporting occurrence/evidence ancestry should include exact Menma action/damage evidence and the committed three-subject encounter result needed to prove completion.

Anko evidence may exist in the Battle journal/history, but it must not inflate Menma's performance metrics.

---

## 13. Reward seam

Current World authority grants a fixed immediate **50 Ryō** reward for victory over the old exact Altered Shinobi tutorial Battle.

That trigger is no longer safe as written.

Under the new three-subject encounter:

> **WITHDRAWING / DEFEATING ALTERED SHINOBI ALONE MUST NOT FIRE THE OLD 50-RYŌ REWARD WHILE THE BATTLE CONTINUES.**

World / Missions / Events owns the successor reward decision.

World must decide whether to:

- preserve 50 Ryō as the fixed reward for whole three-subject encounter victory;
- replace/recalibrate the reward;
- or otherwise supersede the old reward source.

Until World closes that successor authority:

- do not claim the 50 Ryō reward is valid for the new encounter;
- do not add per-subject money/loot by inference;
- preserve no generic Character EXP unless World separately authorises it.

The downstream sequence should route through Combat first so World receives the final encounter identity/result contract rather than designing against an unstable Battle package.

---

## 14. Environment

Battle environment remains exactly:

`Scene backdrops/forest_clearing_day.png`

Story before Battle, Battle presentation and Story after Battle refer to the same physical clearing.

No new location is created by entering Battle.

---

## 15. Runtime ownership / cleanup safeguard

The Anko adapter must preserve:

> **Registry identity != ownership != My Clan assignment != temporary Story Battle participation**

A safe implementation must therefore prove:

- `sj_anko` resolves from current Registry authority;
- temporary Battle participation grants no collectible ownership;
- My Clan formation is not mutated;
- no permanent team assignment is written;
- the temporary runtime projection/adapter is cleaned after Battle/Story return;
- save/reload does not convert the temporary projection into owned roster state;
- repeated Story -> Battle -> Story does not duplicate Anko in `playerTeam` or any equivalent participant store.

Do not use a permanent materialization side effect as the price of making an NPC ally targetable.

Existing #300/#311 ownership, duplicate-writer, save/re-entry and runtime-error safeguards apply.

---

## 16. Existing QA that must be superseded deliberately

Current diagnostics explicitly assert the old 1-v-1 design, including checks equivalent to:

- direct Battle exactly Menma vs Altered;
- Brute/Unstable not in Menma deployment;
- wider clearing opposition separate from direct Battle.

Those assertions become stale when this contract is implemented.

They must be changed under an explicit **AUTHORITY_CHANGED** reason.

Do not simply weaken/delete them to make tests green.

Replacement QA must prove at minimum:

- exact 2 allied / 3 opposition participant set;
- Menma player control only;
- Anko autonomous NPC participation without ownership grant;
- three independent enemy PL ledgers;
- all three opposition action packages reachable;
- no premature victory after first hostile withdrawal;
- Menma withdrawal produces tutorial failure;
- MEN-03 remains Menma-attributable;
- Anko action evidence excluded from MEN-03 metrics;
- Anko exact observation evidence can be produced for qualifying Menma actions;
- same clearing environment bound;
- old single-opponent reward cannot fire mid-Battle;
- Story return consumes exact committed result.

---

## 17. What is closed here

CE closes:

1. Stephen's Scene 7 intent is authoritative: **Menma + Anko vs all three test subjects**.
2. The current framework is structurally capable of a 2-v-3 participant envelope; this does not require releasing the held Battle redesign.
3. Exact participant identities are fixed.
4. Menma is the only player-controlled actor.
5. Anko is an autonomous allied NPC participant, not ownership/My Clan assignment.
6. Current-runtime authored deployment order is fixed.
7. The objective becomes the three-subject encounter, not Altered Shinobi alone.
8. Menma withdrawal means Menma tutorial failure even if Anko remains.
9. Each test subject retains independent identity/PL/action authority.
10. MEN-03 stable occurrence/contract identity is preserved but becomes encounter-set aware.
11. MEN-03 metrics remain strictly Menma-attributable.
12. Existing ratio thresholds remain unchanged for Alpha absent contrary validation evidence.
13. Anko may legitimately observe exact Menma actions while participating, subject to evidence/perceptibility/blocker rules.
14. MEN-02 remains Kinjutsu-specific; observed Fuinjutsu does not silently become MEN-02.
15. Old 50-Ryō single-opponent trigger cannot fire on Altered Shinobi withdrawal alone in the new encounter.
16. Forest clearing backdrop remains unchanged.
17. No new Battle-redesign implementation is authorised by this reconciliation.

---

## 18. What Combat must close next

Combat / Skills / Items / Weapons must now provide the exact current-runtime Battle package for this encounter, specifically:

- the bounded autonomous `sj_anko` Origin action package;
- current-runtime autonomous ally scheduling/action-opportunity handling;
- legal enemy targeting across Menma + Anko;
- three-subject action selection / continuation after individual withdrawals;
- Menma Origin palette reconciliation against current Kinjutsu/Fuinjutsu capability authority;
- exact action/evidence tags needed by Menma observation contracts;
- confirmation that the existing independent test-subject action packages remain valid together.

Combat must not implement or release the future six-shinobi Battle redesign while doing this.

After Combat closure, the next downstream owner is:

`WORLD-MISSIONS-EVENTS`

for the successor whole-encounter reward contract.

Coding follows only after the Combat + World content contracts are closed.

---

## 19. Status

~~~text
WRITING SCENE 7 INTENT = CLOSED
CE COMPOSITION / EVIDENCE RECONCILIATION = CLOSED
COMBAT ORIGIN PACKAGE = REQUIRED
WORLD SUCCESSOR REWARD = REQUIRED AFTER COMBAT
CODING = NOT YET ROUTED
RUNTIME IMPLEMENTED = NO
RUNTIME VALIDATED = NO
BROWSER GOLDEN = NO
NEW SIX-SHINOBI REDESIGN HOLD = UNCHANGED
~~~

