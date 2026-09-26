# Shinobi Chronicles — Battle Participant Control + First PL Battle Tutorial Contract

**Date:** 2026-09-26  
**Owner:** CE / Codex / Coordination  
**Incoming handoff:** #385  
**Status:** **CONTROL TAXONOMY CLOSED / MENMA GUEST-ALLY SUCCESSOR CLOSED / FIRST-PL-BATTLE TUTORIAL CLOSED / CODING IMPLEMENTATION REQUIRED**

## 1. Stable participant/control taxonomy

Battle participant relationship and control are distinct from ownership.

| Participant class | Relationship | Normal Active control |
| --- | --- | --- |
| **My Clan / owned** | Your shinobi | **Player** |
| **Guest Ally** | Temporary Story/context ally | **Player** |
| **Independent Ally** | Temporary autonomous ally | **AI** |

Enemy affiliation remains separate and is not inferred from AI control.

Preserve:
- Guest Ally != ownership;
- Independent Ally != ownership;
- Registry identity != ownership;
- temporary Battle participation != My Clan assignment;
- player control authority != acquisition;
- AI control != enemy affiliation;
- Battle slot != ownership;
- Story formation assignment != My Clan formation mutation.

A Guest Ally can be fully player-controlled without entering characterOwnership, My Clan, acquisition or the permanent roster.

## 2. Control follows the current Active

Normal Battle input is owned by the current player-side Active's control authority.

~~~text
owned/My Clan Active    -> player action dock
Guest Ally Active       -> player action dock
Independent Ally Active -> AI action selection
~~~

Benched / Reserve participants do not receive ordinary action input merely because they are present.

When relay or an authorised Story formation transition changes Active, Battle resolves the new Active identity and its control authority. No second simultaneous player action dock is created.

## 3. Temporary Story formations

My Clan remains the normal formation-order authority for owned teams.

A Story / mission / event may author a temporary Battle participant set and starting formation containing Guest or Independent Allies.

That temporary formation:
- is Battle occurrence state;
- does not rewrite My Clan;
- does not grant ownership;
- is cleaned when the authored participation window ends;
- persists only as needed to resume the same Battle safely across save/load.

# Academy Menma Scene 7 successor

## 4. Supersession of automated Anko

For new Academy Menma Scene 7 executions, #385 supersedes the automated half-scripted Anko premise from #376/#380.

Superseded:
- guaranteed scripted Anko withdrawals;
- forced Hidden Shadow Snake Hands -> Altered withdrawal;
- forced Fire Style: Dragon Flame -> Brute withdrawal;
- scripted result logic that bypasses genuine player choice;
- Anko being treated as an autonomous/Independent Ally for those phases.

Still authoritative from #380:
- Anko's exact legal nonlethal Origin Skill palette;
- exact Skill IDs;
- exact authored Attack-PL values;
- Stamina mitigation / normal PL math;
- Twin Snakes Mutual Death prohibition;
- no CS/L2 leakage;
- no invented Basic Attack;
- no generic Rank/PL-derived attack;
- save/load/idempotence / semantic ownership safeguards;
- 0 Battle PL = withdrawal.

The #380 scripted outcomes are superseded; its legitimate Skill packages/numerics remain Combat authority.

## 5. Menma starting formation

Exact participants remain:

### Allied
- sj_anko — **Guest Ally**
- academy_menma — owned/Origin protagonist

### Enemy
1. test_subject_altered_shinobi
2. test_subject_brute
3. test_subject_unstable

Starting formation:

~~~text
ALLIED
Active  = sj_anko
Benched = academy_menma

ENEMY
Active  = test_subject_altered_shinobi
Benched = test_subject_brute
Benched = test_subject_unstable
~~~

Anko is player-controlled from the first normal player-side action opportunity.

## 6. Anko legal player palette

While Anko is Active, expose her exact current Origin-legal actions:

- sj_anko_hidden_shadow_snake_hands — Hidden Shadow Snake Hands
- sj_anko_snake_bind — Snake Bind
- sj_anko_fire_style_dragon_flame — Fire Style: Dragon Flame
- sj_anko_serpent_evasion — Serpent Evasion

Unavailable:
- sj_anko_twin_snakes_mutual_death

The player chooses among currently legal actions. Do not fake agency by selecting a predetermined attack behind the UI.

## 7. Ordinary Anko cadence

While Anko and the current enemy Active remain:

~~~text
ANKO player action
-> result / presentation / settle
ENEMY ACTIVE action
-> result / presentation / settle
ANKO player action
-> ...
~~~

All ordinary results are legitimate Combat results. No hostile is forced to 0 PL merely because the Story expects Anko to perform well.

On enemy Active withdrawal:
- it withdraws normally;
- next eligible enemy Benched participant relays;
- Anko remains allied Active unless she withdrew or the authored Menma handoff condition is reached.

## 8. Intended Anko -> Menma teaching handoff

The intended success path remains:

~~~text
Anko handles the first two hostile Actives
-> final hostile relays
-> Anko yields allied Active
-> Menma becomes allied Active
-> player applies the same Battle controls with Menma
~~~

Exact authored handoff condition:
- Altered Shinobi is withdrawn;
- Brute is withdrawn;
- Unstable remains eligible;
- Anko remains eligible/current allied Active;
- Menma remains eligible;
- Battle is not terminal.

After Brute withdrawal and Unstable relay semantically commit and presentation settles:

~~~text
Anko yields Active
-> Menma promotes from Benched into Active
-> Anko becomes Benched
-> formation settles
~~~

This yield:
- is not withdrawal;
- consumes no normal side action opportunity;
- does not grant ownership;
- is scoped to this Story encounter;
- is not a generic voluntary-switch system;
- does **not** reset side alternation.

Because the player-side Anko action caused Brute's withdrawal, the ordinary next side remains **ENEMY**.

Therefore:

~~~text
Unstable acts against newly Active Menma
-> then Menma receives the next player-side action
-> ordinary alternation continues
~~~

Do not silently grant Menma a bonus opening turn.

## 9. Legitimate divergence — Anko can lose

Anko is not protected by scripted immortality.

If Anko reaches 0 Battle PL before the authored handoff condition:

~~~text
Anko withdraws normally
-> Anko exits
-> Menma relays from Benched to allied Active
-> side alternation continues from the action that caused withdrawal
-> player controls Menma
~~~

The Battle continues against the current surviving enemy formation.

The later scripted Anko-yield trigger is cancelled.

Menma may therefore enter earlier than the intended teaching path because of legitimate play.

## 10. Menma can also withdraw

After Menma becomes Active, whether through authored yield or emergency relay, Menma is subject to normal withdrawal.

If Menma reaches 0 while Anko is still eligible/Benched:

~~~text
Menma withdraws
-> Anko relays back into allied Active
-> player controls Anko as Guest Ally
-> Battle continues
~~~

Menma withdrawal alone is not party defeat.

If Anko is already withdrawn and Menma then withdraws, allied side is exhausted and Battle commits defeat.

Canonical rule:

> **PARTY DEFEAT = NO ELIGIBLE ALLIED PARTICIPANT REMAINS BEFORE THE OBJECTIVE IS COMPLETE.**

No tutorial rescue/reset is fabricated.

## 11. Enemy relay

Enemy order remains:

~~~text
Altered Shinobi
-> Brute
-> Unstable
~~~

Each has an independent Remaining Battle PL ledger and exact Combat package.

No hidden forced-zero is used to preserve choreography.

## 12. MEN-03 reconciliation

MEN-03 remains strictly Menma-attributable.

Start MEN-03 measurement when Menma first becomes allied Active, whether through:
- intended authored yield after Anko handles two hostiles; or
- earlier emergency relay because Anko withdrew.

Count only Menma's:
- normal action opportunities;
- meaningful resolved actions;
- PL damage received;
- pressure ratio;
- critical exposure;
- exact supporting evidence.

Exclude every Anko action/damage/result.

If the allied side ultimately wins:
- MEN-03 may commit from Menma's actual contribution;
- Menma withdrawal counts as critical exposure;
- a legitimate LOW result may occur if the party later wins after Menma was depleted.

This is evidence-derived, not a fabricated LOW.

If the allied side ultimately loses:
- tutorialResult = not_completed;
- MEN-03 performanceBucket = null.

If Menma never receives a legitimate Active/action opportunity before an allied victory, fail closed rather than inventing a Menma performance bucket.

## 13. Reward reconciliation

World reward remains cadence-independent:
- 100 Ryō once;
- all three exact hostiles resolved;
- terminal authoritative Battle result = victory.

Guest Ally control, Anko survival, Menma survival and handoff path are not independent reward predicates.

Defeat pays 0.

# First legitimate PL Battle tutorial

## 14. Tutorial identity and persistence scope

Canonical tutorial family ID:

pl_battle_tutorial_v1

The tutorial is **player-save onboarding state**, not:
- Story scene state;
- Origin-specific state;
- Character progression;
- Chronicle history;
- Battle reward/progression evidence.

It persists across:
- Story scenes;
- Origins;
- missions;
- hotspots;
- save/reload;
- later Battles;
- Legacy/inheritance cycles within the same continuing player save.

A genuinely fresh player save begins unseen.

Coding owns exact storage schema, but semantic state must preserve equivalent of:
- tutorial family/version;
- whether tutorial has started;
- first qualifying Battle ID;
- whether SKIP TUTORIAL was chosen;
- set of tutorial beat IDs already shown.

## 15. First qualifying Battle trigger

Do not hard-code tutorial ownership to Menma or any Origin ID.

The tutorial starts on the first **production player-actionable PL Battle** in the current player save.

A Battle qualifies when:
- it is a real player-facing production Battle;
- it uses the authoritative PL Battle system;
- it is not QA/diagnostic/preview/replay-only simulation;
- at least one player-side participant is player-controlled (My Clan or Guest Ally);
- the Battle can reach a normal player-controlled action opportunity.

A wholly scripted or wholly AI-vs-AI encounter does not consume the first tutorial claim merely because Battle presentation was visible.

Once the first qualifying Battle is bound, later Battles do not become "first Battle" again.

## 16. Tutorial is event-driven and cross-Battle

The tutorial is not one instruction page and does not require every concept to occur in the first Battle.

Each tutorial beat is shown only on the **first relevant event** after tutorial activation.

Unseen beats remain pending across later Battles.

Already-seen beats do not interrupt later Origins again.

Canonical beat IDs:

1. active_shinobi
2. guest_ally_control
3. independent_ally_control
4. skills_action_dock
5. battle_pl
6. withdrawal
7. relay

Guest/Independent control beats are conditional and appear only if that relationship class is actually encountered.

## 17. Tutorial event triggers

### active_shinobi
Trigger: first settled qualifying Battle formation.

Teach: the Active is the shinobi currently representing that side's normal action opportunity.

### guest_ally_control
Trigger: first relevant Guest Ally presentation/control moment.

Teach: Guest Ally = temporary ally under player control while Active; control does not mean ownership.

For Menma Scene 7 this is relevant immediately because Anko opens Active.

### independent_ally_control
Trigger: first relevant Independent Ally presentation/action moment.

Teach: Independent Ally = temporary allied participant controlled by AI.

Do not show this in Menma merely because the concept exists.

### skills_action_dock
Trigger: first time a player-controlled Active action dock opens.

Teach: SKILLS contains the current Active's legal prepared Battle actions. Tutorial never unlocks a Skill.

### battle_pl
Trigger: after the first committed damaging result is visibly presented and Remaining Battle PL changes.

Teach: Battle PL is current combat capacity for this Battle; reaching 0 means withdrawal, not HP/injury.

### withdrawal
Trigger: first committed 0-Battle-PL withdrawal.

Teach: withdrawal removes that participant from the current Battle; it does not itself mean injury/death.

### relay
Trigger: first committed Active replacement from Benched/Reserve.

Teach: next eligible participant becomes Active; normal Battle ordering continues.

## 18. Tutorial presentation ownership

Tutorial UI is presentation/onboarding only.

It may:
- highlight portraits;
- point at the action dock;
- highlight PL rings;
- display concise explanation;
- temporarily gate player click-through while an explanation is open.

It may not:
- choose a Skill;
- choose a target;
- commit an action;
- change PL;
- cause withdrawal;
- promote a participant;
- rewrite Battle phase;
- reroll results;
- alter reward/history.

Dismissal returns control to the same authoritative Battle state.

## 19. SKIP TUTORIAL

SKIP TUTORIAL:
- persists skip state for pl_battle_tutorial_v1 in the current player save;
- dismisses current tutorial presentation;
- suppresses all remaining v1 tutorial beats;
- does not alter Battle state;
- does not count as Battle action;
- does not change rewards/progression/history.

Reload preserves skip state.

## 20. Save/load / exactly-once tutorial behavior

Tutorial prompts are idempotent.

Reload must not:
- re-show a beat already acknowledged/skipped;
- consume a Battle action;
- duplicate an action because tutorial UI reopened;
- change bound first qualifying Battle identity;
- lose pending unseen beats.

Tutorial state is not a semantic Battle scheduler.

# Alpha presentation + Beta audio

## 21. Alpha action readability

Every committed action must visibly communicate:

> **ACTOR -> TECHNIQUE NAME -> TARGET -> IMPACT/RESPONSE -> DAMAGE/CONTROL RESULT -> PL CHANGE -> SETTLE**

This applies to My Clan actions, Guest Ally actions, Independent Ally actions and enemy actions.

Use reusable choreography classes rather than bespoke art for every Skill.

Audio is not an Alpha dependency.

## 22. Beta #366 remains separate

Beta #366 remains queued and is not Alpha authority.

Do not import its multi-member command batching into Alpha.

Battle/UI audio is Beta work:
- impact cues;
- Skill/cast cues;
- UI selection feedback;
- withdrawal/relay cues;
- other later Battle sound treatment.

# Supersession map

## 23. #376 / #380

### Superseded
- Anko as autonomous actor in Menma Scene 7;
- deterministic scripted Anko withdrawals;
- forced exact two-action takedown sequence;
- no player input during Anko phases;
- Menma final phase beginning only after guaranteed scripted results;
- final-phase-only defeat assumptions tied to scripted choreography.

### Preserved
- exact participants;
- Altered -> Brute -> Unstable order;
- Anko legal Origin palette;
- exact Skill IDs;
- exact authored numeric values;
- normal Stamina mitigation / PL math;
- Twin Snakes Mutual Death prohibition;
- no later-form leakage;
- no invented Skill;
- 0 Battle PL withdrawal;
- independent PL ledgers;
- MEN-03 Menma-only attribution;
- cadence-independent 100-Ryō reward;
- save/load/idempotence safeguards;
- shared presentation-queue / Golden requirements.

# Writing boundary

## 24. Party defeat continuation requires Writing

CE closes Battle truth:

> party defeat = allied side exhausted before stop_three_test_subjects completes.

Coding must return factual defeat to Story.

Coding must not invent rescue, reset, recovery dialogue, injury, death, punishment or alternate narrative consequence.

Writing owns the exact player-facing Scene 7 defeat continuation.

## 25. Final lock

> **Battle participant relationship and control are distinct reusable facts: My Clan/owned shinobi are player-controlled, Guest Allies are temporary non-owned allies controlled by the player, and Independent Allies are temporary non-owned allies controlled by AI. Control follows the current Active participant without implying ownership. Academy Menma Scene 7 opens with Guest Ally Anko as player-controlled Active and Menma Benched. The player genuinely chooses among Anko's current legal Origin Skills while fighting Altered -> Brute -> Unstable. If Anko legitimately handles Altered and Brute while remaining Active, the authored handoff occurs after Brute withdrawal and Unstable relay: Anko yields Active to Menma without consuming an action or resetting side order, so the enemy side acts next against Menma. If Anko withdraws earlier, Menma relays normally and the authored yield is cancelled. If Menma later withdraws while Anko remains, Anko can relay back and continue. Party defeat occurs only when no eligible allied participant remains before the objective is complete. MEN-03 measures Menma only from the moment he first becomes Active; an eventual allied victory may produce an evidence-derived LOW after Menma withdrawal, while party defeat produces no completed bucket. The first production player-actionable PL Battle in a player save activates pl_battle_tutorial_v1, whose event-driven beats are persisted per concept and shown only when first relevant; unseen concepts may teach in later Battles, seen concepts never repeat, and SKIP TUTORIAL persistently suppresses remaining v1 prompts. Tutorial UI never owns Battle semantics.**
