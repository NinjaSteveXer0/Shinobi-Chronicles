# Shinobi Chronicles — Academy Menma Half-Scripted Three-Subject Battle Successor

**Date:** 2026-09-26  
**Owner:** CE / Codex / Coordination  
**Incoming handoff:** #376  
**Status:** **SUPERSEDED FOR NEW EXECUTIONS BY GUEST-ALLY SUCCESSOR (#385)**  
**Current successor:** Documentation/Coordination/Battle_Participant_Control_and_First_PL_Battle_Tutorial_Contract_2026-09-26.md  
**Scope:** Academy Menma Origin Scene 7 only.

## 1. Successor authority

Stephen's latest direct Scene 7 intent is:

> **Anko defeats the first two former test subjects as authored Battle beats. Menma then receives the final subject as the genuine player-resolved PL Battle phase.**

This supersedes all earlier Menma-specific Scene 7 cadence variants, including the old five-participant round robin, the mistaken Menma/Anko assist cadence, and the later ordinary unscripted 2-v-3 interpretation for this Origin.

It does **not** change the generic evolved PL Battle law outside this scoped Origin.

## 2. Exact encounter identity

Battle config remains: academy_menma_origin_three_test_subjects_with_anko

Encounter remains: origin_academy_menma_prologue:three_test_subjects

Objective remains: stop_three_test_subjects

Environment remains: Scene backdrops/forest_clearing_day.png

Allied identities:
- academy_menma
- sj_anko

Opposition order remains the durable deployment/relay order:
1. test_subject_altered_shinobi
2. test_subject_brute
3. test_subject_unstable

Therefore the authored sequence is:

~~~text
Anko vs Altered
-> Altered withdraws
-> Brute relays in

Anko vs Brute
-> Brute withdraws
-> Unstable relays in

Menma vs Unstable
-> genuine player-resolved final phase
~~~

No enemy identity or ordering is invented.

## 3. Three-phase encounter model

### Phase A — authored Anko takedown 1

Opening formation:

~~~text
ALLIED ACTIVE  = Anko
ALLIED BENCHED = Menma

ENEMY ACTIVE   = Altered Shinobi
ENEMY BENCHED  = Brute
ENEMY BENCHED  = Unstable
~~~

Anko performs one Combat-authored deterministic scripted Battle beat that resolves Altered Shinobi to 0 Remaining Battle PL / withdrawal.

This is an authored encounter beat, not a normal player action opportunity and not MEN-03 evidence.

Presentation must expose:

~~~text
Anko action
-> Altered response
-> result / PL 0
-> Altered exits
-> Brute promotes to enemy Active
-> formation settles
~~~

### Phase B — authored Anko takedown 2

Anko performs the second Combat-authored deterministic scripted Battle beat against Brute.

Brute resolves to withdrawal.

Presentation must expose:

~~~text
Anko action
-> Brute response
-> result / PL 0
-> Brute exits
-> Unstable promotes to enemy Active
-> formation settles
~~~

Again, this is authored encounter choreography, not Menma performance.

### Phase C — Menma final test

After Brute withdrawal / Unstable relay:

~~~text
Anko yields allied Active
-> Menma moves from Benched into allied Active
-> formation settles
-> player action dock opens
~~~

This one authored handoff is a scoped Story-Battle phase transition, not a generic voluntary-reorder mechanic.

Final phase begins:

~~~text
ALLIED ACTIVE = Menma
ENEMY ACTIVE  = Unstable
~~~

Menma receives the first normal player-side action opportunity.

From that point ordinary Alpha PvE applies:

~~~text
Menma action
-> settle
Unstable action
-> settle
Menma action
-> settle
Unstable action
-> ...
~~~

No Anko normal actions occur during Menma's final phase unless later explicit authority adds a separate failure/aftermath beat.

## 4. Generic Battle law remains unchanged

The first two Anko takedowns are not:
- two ordinary player turns;
- an assist entitlement;
- a general double-action rule;
- Beta command batching.

They are deterministic authored encounter-resolution beats before the genuine player-controlled phase opens.

Canonical distinction:

> **SCRIPTED ENCOUNTER BEAT != NORMAL SIDE ACTION OPPORTUNITY.**

The generic Battle system remains Active/Benched/Reserve relay with one normal Active action per side opportunity.

## 5. PL / lethality

For all three subjects:

> **0 Battle PL = withdrawal, not automatic injury or death.**

Anko's two authored takedowns produce withdrawal.

Menma's successful final-phase result also produces withdrawal.

Stephen's colloquial statement that Menma gets the last subject "to kill" does not create literal lethal authority.

No death, assassination, injury or kill history is inferred.

## 6. Combat-owned scripted-beat seam

CE does not choose the exact two Anko techniques or damage packets.

Combat must close:
- exact Anko action ID for scripted takedown 1;
- exact Anko action ID for scripted takedown 2;
- exact deterministic result receipts;
- exact PL/result projection;
- exact presentation labels/evidence;
- safeguard/idempotence behaviour.

The existing Anko capability package is the allowed source pool:
- sj_anko_hidden_shadow_snake_hands
- sj_anko_snake_bind
- sj_anko_fire_style_dragon_flame
- sj_anko_serpent_evasion
- sj_anko_twin_snakes_mutual_death remains forbidden here.

Do not derive generic damage from Rank/PL.
Do not activate CS/L2 Anko.
Do not invent a new technique merely to force choreography.

## 7. Final Menma opponent

The final genuine player-resolved opponent is:

test_subject_unstable

This follows the existing Altered -> Brute -> Unstable deployment/relay order and avoids unnecessary reordering.

Unstable retains Base PL 12, its independent Remaining Battle PL ledger and its existing authored legal action package.

## 8. Final-phase success

Menma succeeds if the player legally resolves Unstable to withdrawal before Menma withdraws.

Then:
- terminal Battle result = victory;
- stop_three_test_subjects = completed;
- all three exact hostile IDs are resolved;
- MEN-03 may commit from Menma final-phase evidence;
- World reward pays exactly 100 Ryō once;
- Story resumes through the successful post-Battle route.

The first two Anko takedowns count toward whole-encounter hostile resolution but never toward Menma performance.

## 9. Final-phase failure

If Unstable reduces Menma to 0 Remaining Battle PL first:
- Menma withdraws;
- final playable phase commits defeat;
- tutorialResult = not_completed;
- MEN-03 performance bucket = null;
- do not fabricate LOW to force one of the three success reactions;
- whole-encounter reward pays 0 because terminal Battle result is not victory;
- Story returns through the failure continuation.

This contract does not silently convert Menma failure into an Anko-completed Battle victory.

If Writing later wants visible Anko cleanup after Menma failure, that is aftermath presentation/Story authority and must not retroactively rewrite the terminal player Battle result or fabricate MEN-03 completion.

## 10. MEN-03

Preserve source occurrence: combat_academy_menma_tutorial_performance_resolved

Preserve consequence: academy_menma_tutorial_performance_evidence

The existing three success bands remain:
- high
- middle
- low

All metrics now consume **Menma Phase C evidence only**.

Exclude:
- Anko scripted takedown 1;
- Anko scripted takedown 2;
- Anko damage;
- Anko-caused withdrawals;
- scripted relay time;
- scripted phase transitions.

Existing ratio thresholds remain unchanged absent later calibration evidence.

MEN-03 commits only on successful final-phase completion.

Failure produces no completed MEN-03 bucket.

## 11. Anko observation / MEN-02

Anko remains physically present during Menma's final phase.

She may observe exact committed Menma actions where perceptible, unblocked and tied to exact action evidence.

MEN-02 remains Kinjutsu-specific.

Observed Fūinjutsu remains separate evidence and does not silently satisfy MEN-02.

Anko's own scripted actions create no Menma evidence.

## 12. Reward authority

World has already corrected the reward to be cadence-independent.

Durable World correction:
Documentation/World/Academy Menma Three-Subject Origin Whole-Encounter Reward Lock 2026-09-25.md

Commit:
d8afde8b7e499bfbb7d6b0716184f00a76f6f0d9

Closed rule:
- amount remains 100 Ryō;
- source remains menma_origin_battle_three_test_subjects_victory_ryo_01;
- all three exact hostiles must be resolved;
- terminal authoritative Battle result must be victory;
- cadence / Menma survival are not independent World predicates.

No reward redesign is needed here.

## 13. Save/load and safeguards

Persist exact encounter phase:

~~~text
phase_a_anko_vs_altered
phase_b_anko_vs_brute
phase_c_menma_vs_unstable
terminal
~~~

Reload may not:
- replay an already committed Anko takedown;
- withdraw the same hostile twice;
- skip a hostile relay;
- reopen Phase A after Phase B/C;
- grant Menma control before both scripted beats complete;
- duplicate reward/performance/history.

Semantic scripted results may commit before animation.

Presentation consumes immutable committed receipts and may hard-settle on failure without rerunning Combat.

## 14. Presentation acceptance

The Menma Golden candidate must visibly prove:

1. Anko Active at opening.
2. Menma Benched at opening.
3. Altered Active; Brute + Unstable visible Benched.
4. scripted Anko beat 1 visibly readable.
5. Altered withdrawal / Brute relay visible.
6. scripted Anko beat 2 visibly readable.
7. Brute withdrawal / Unstable relay visible.
8. Anko yields Active and Menma promotes visibly.
9. Menma gets the first selectable normal action of Phase C.
10. no Anko scripted beat counts toward MEN-03.
11. Menma success derives high/middle/low only from Phase C.
12. Menma failure creates no fake LOW bucket.
13. victory pays 100 Ryō once.
14. final-phase defeat pays 0.
15. forest clearing remains visible.
16. no simultaneous-looking exchange.
17. terminal playback is visible before Story return.
18. Kakashi Golden regression remains GREEN.

## 15. Superseded Menma-specific authority

For new Scene 7 executions, this successor supersedes:
- #369 Menma-first opening cadence;
- menma_origin_anko_autonomous_assist;
- ordinary unscripted Menma-vs-Altered opening;
- Menma/Anko alternating entitlement;
- the ordinary relay-only interpretation as the complete Scene 7 design.

The generic six-shinobi Battle law itself is not superseded.

## 16. Coding impact

#373 / draft PR #375 must be revised before Stephen visual acceptance.

Coding must consume the exact Combat scripted-beat package before implementing the final three-phase successor.

Do not merge the current candidate as Battle Golden before this successor is implemented and visually tested.

## 17. Final lock

> **Academy Menma Scene 7 is a scoped half-scripted three-subject PL Battle. Anko opens as allied Active and deterministically forces Altered Shinobi to withdrawal through a Combat-authored scripted Battle beat. Brute relays into enemy Active; Anko deterministically forces Brute to withdrawal through the second scripted Battle beat. Unstable then relays into enemy Active. At that phase boundary, Anko yields the allied Active position and Menma promotes from Benched into Active. Menma receives the first normal player-side opportunity and fights Unstable through the ordinary evolved PL Battle loop. The first two Anko takedowns count toward whole-encounter hostile resolution but never toward MEN-03. Menma victory over Unstable produces the existing high/middle/low performance read and the cadence-independent 100-Ryō whole-encounter reward. Menma failure produces terminal defeat, no completed MEN-03 bucket and no 100-Ryō reward. 0 Battle PL remains withdrawal, not death. This authored sequence is specific to Academy Menma Scene 7 and does not rewrite the generic Active/Benched/Reserve Battle law.**
