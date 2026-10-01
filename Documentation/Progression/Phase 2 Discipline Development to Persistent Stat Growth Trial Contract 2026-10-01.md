# Shinobi Chronicles — Phase 2 Discipline Development → Persistent Stat Growth Trial Contract

**Date:** 2026-10-01  
**Owner:** Progression / Development  
**Status:** **BINDING PHASE-2 TRIAL AUTHORITY — #434 CLOSED / BROWSER TUNING STILL REQUIRED**  
**Source:** GitHub #434  
**Phase:** Phase 2 Top-10 item #2  
**Runtime status:** semantic contract only; implementation / browser GREEN / Stephen GOLDEN are separate.

## 1. Purpose

This contract closes the missing bridge:

`legitimate action -> Discipline Development EXP -> permanent Current Stat growth -> formula-derived Current PL -> persistent Chronicle development`

It ratifies the bounded Phase-2 trial requested by Stephen and consumes:

- `Documentation/Progression/Action Derived Discipline and Fieldcraft Development Contract 2026-09-15.md`;
- `Documentation/Coordination/Persistent_Development_Current_Team_Skill_Learning_and_Chronicle_Trial_v1_2026-09-30.md`;
- `Documentation/Coordination/Phase_2_Elemental_Training_Nature_Development_Potential_Skill_and_Shinobi_Record_Direction_2026-09-30.md`;
- `Documentation/Coordination/Phase_2_Persistent_Chronicle_Safety_Constitution_2026-10-01.md`;
- #436 Chronicle State Manifest;
- current PL / Registry Current-Stat + formula authority.

It does **not** implement Nature Development, advanced Bloodline taxonomy, Energy, complete mentor trees, resistance numerics, or the full Potential Skill Roster.

Preserve:

**Character development belongs to the exact persistent Character**  
**Base != Current != Effective != Battle state**  
**Discipline EXP != Skill XP**  
**Stat threshold != Skill unlock**  
**Stat gain != direct PL grant**  
**activity ceiling != global Stat cap**  
**current team != activity participants != Battle deployment**  
**failure may develop != invalid precommit action develops**  
**Technique Practice != generic Skill XP**  
**training receipt != personality label**

---

# 2. Existing seven Discipline Development ledgers remain authoritative

The seven persistent discipline ledgers remain:

- `nin` — Ninjutsu;
- `tai` — Taijutsu;
- `gen` — Genjutsu;
- `buki` — Bukijutsu;
- `fuin` — Fūinjutsu;
- `kin` — Kinjutsu;
- `stamina` — Stamina.

Human-readable long names may be used in UI, but machine persistence must use one canonical discipline ID mapping.

Existing action-derived values remain unchanged:

- committed material attempt: **+1 Discipline Development EXP**;
- effective execution: **+2**;
- separately authored exceptional execution: **+3**.

Existing source idempotence and causal caps remain authoritative unless an exact later activity contract deliberately imposes a smaller cap.

Training / Practical / Exams do not create a second XP currency. They feed these same ledgers when their factual actions qualify.

---

# 3. Exact Phase-2 trial curve

## 3.1 Ratified formula

For one exact discipline with current persistent Stat value `S`:

`EXP_TO_NEXT_STAT(S) = 5 + (5 × ceil(S / 10))`

This is **Phase-2 Trial Curve v1**.

Stable curve ID:

`discipline_stat_curve_v1`

Examples:

| Current persistent Stat | EXP required for next +1 |
|---:|---:|
| 1–10 | 10 |
| 11–20 | 15 |
| 21–30 | 20 |
| 31–40 | 25 |
| 41–50 | 30 |
| 51–60 | 35 |
| 61–70 | 40 |
| 71–80 | 45 |
| 81–90 | 50 |
| 91–100 | 55 |
| 101–110 | 60 |

Stats remain globally uncapped. Continue the same formula above 110.

This curve is binding for the first Phase-2 browser trial, but is explicitly **tuning authority**, not immutable final balance. Stephen browser feedback may later produce a successor curve ID. Existing receipts must record which curve resolved each breakthrough.

## 3.2 Meaning of `S`

`S` means the exact Character's **current persistent Stat** immediately before the breakthrough check.

It includes legitimate permanent Current-Stat development already committed from any authoritative source.

It excludes:

- temporary Effective modifiers;
- equipment-only bonuses;
- Summon/Hosted-Entity temporary modifiers;
- Transformation-only modifiers;
- Battle-state buffs/debuffs;
- Remaining Battle PL;
- UI preview values.

Direct permanent Current-Stat packages such as Academy Obito's already-closed formal-training deltas remain valid permanent Stat history. They do not become Discipline EXP retroactively.

---

# 4. Exact EXP -> Stat breakthrough transaction

For one accepted Discipline Development EXP grant:

1. resolve exact persistent subject identity;
2. dedupe the incoming development receipt;
3. apply existing causal/activity cap;
4. verify the source is currently allowed to award primary Stat-development EXP;
5. add the granted EXP to the exact discipline ledger;
6. evaluate `EXP_TO_NEXT_STAT(currentPersistentStat)`;
7. while ledger EXP is at least the current threshold:
   - subtract that threshold;
   - increment that exact Current Stat by **+1**;
   - commit one breakthrough receipt;
   - recompute the next threshold from the newly increased Current Stat;
8. preserve all remaining overflow;
9. recompute Current PL from the canonical seven-Stat PL formula after the final Stat state;
10. persist the development receipt, remaining discipline EXP, permanent Stat state, breakthrough receipt(s), and derived Current PL atomically;
11. project observer-safe result(s) to UI / Shinobi Record.

No direct PL reward is ever emitted.

A +1 Stat may or may not change rounded Current PL.

## 4.1 Canonical PL recomputation

After all Stat changes in the atomic transaction:

`Current PL = round(0.60 × highest Current Stat + 0.25 × average(top 3 Current Stats) + 0.15 × average(all 7 Current Stats))`

There is no rule such as:

- four Stat gains = +1 PL;
- one breakthrough = +1 PL;
- one training tier = fixed PL.

## 4.2 Multi-breakthrough handling

A migration or large legitimate accumulated ledger may cross more than one threshold.

Process thresholds sequentially from the exact Stat value at each step.

Example:

- current Ninjutsu = 10;
- accumulated Ninjutsu EXP = 27.

Then:

- threshold at 10 = 10 -> Ninjutsu 11, EXP 17;
- threshold at 11 = 15 -> Ninjutsu 12, EXP 2;
- stop.

Do not calculate one threshold once and reuse it across several Stat increases.

## 4.3 Atomicity

A failed persistence transaction must not leave:

- EXP spent but no Stat;
- Stat increased but no receipt;
- PL changed while Stats are unchanged;
- duplicate breakthrough history.

Rollback to the exact pre-transaction persistent state if the atomic write fails.

---

# 5. Stable identity and subject boundary

Persistent development attaches to:

`ownedCharacterId / progressionCharacterId`

or the exact existing stable persistent Character identity that Coding resolves to that meaning.

It does **not** attach semantically to:

- a card/representation ID alone;
- current team slot;
- portrait;
- player account;
- protagonist globally.

Representation/variant ID may remain in provenance for display and source validation, but cannot be the sole persistent identity where an exact owned Character identity exists.

If a normal-player activity selector cannot resolve its selected team entry to one exact persistent Character, the activity must fail closed before resource spend.

---

# 6. Current-team / single-subject law

At Academy stage, ordinary player-mode:

- Training;
- Practical;
- Exams;

must consume the exact current committed Academy team supplied by #436 / Team Formation authority.

Default activity subject count:

**one selected persistent Character.**

No passive team-wide Discipline EXP sharing.

If the selected subject is AI-controlled during a legitimate Battle/World occurrence, that exact persistent subject may still earn their own action-derived development from their own qualifying actions.

A mentor, sparring partner or observer does not copy the trainee's development merely for participating.

Future paired/team Exams or Practical packages require separate authored authority.

## 6.1 Stale-team guard

The activity preflight must snapshot:

- current-team assignment identity;
- exact selected subject stable identity.

Before commit, if the authoritative team assignment changed and the activity no longer has a valid selected subject, fail closed and require reselection.

Do not silently train an old slot occupant.

---

# 7. Development effectiveness ceilings

## 7.1 Meaning

A repeatable dedicated activity that can directly award Discipline Development EXP must declare an exact per-discipline **development effectiveness ceiling**.

Machine semantic:

`developmentCeilingStat`

Meaning:

> the activity may award primary Discipline Development EXP only while the subject's current persistent value in that discipline is **below** the declared ceiling at that repetition's preflight.

The ceiling is a property of the activity/curriculum, not the Character and not the discipline globally.

Reaching a ceiling does not cap the Stat itself. Harder activities, Battles, Story/World actions, mentors and later curricula may continue development.

## 7.2 Preflight

Before a resource-bearing repetition commits, evaluate:

- selected subject valid;
- discipline/action legal;
- current persistent Stat;
- activity ceiling;
- primary Stat-development availability;
- any exact post-ceiling Technique Practice availability;
- exact resource cost if active.

Player-visible state must be truthful before Energy / Ryō / limited resource is consumed.

## 7.3 Ceiling check

If:

`currentPersistentStat >= developmentCeilingStat`

then that activity awards **0 primary Discipline Development EXP** for that discipline.

It may still run only if an explicitly authorised secondary purpose exists and the player is told what that purpose is.

## 7.4 Final eligible repetition and overflow

If the subject is below the ceiling when a repetition legitimately commits, that repetition may award its full authorised +1/+2/+3 grant.

If the grant causes a breakthrough that reaches the ceiling:

- keep the full legitimate grant;
- carry legitimate EXP overflow in the shared discipline ledger;
- do not delete or clip already-earned overflow;
- block subsequent primary-development repetitions from that activity once the persistent Stat is at/above the ceiling.

Thus:

**activity ceiling gates future source eligibility; it does not destroy earned global EXP.**

## 7.5 Batch controls

For x5/x10 or other batch repetition:

- preflight each repetition semantically;
- stop the Stat-development batch immediately once the activity ceiling becomes active;
- do not consume remaining resource cost for dead Stat-development repetitions;
- if an exact Technique Practice route is active, switching the remaining batch to that purpose requires explicit player-facing acknowledgement / mode indication.

No silent conversion of unused Stat-training repetitions into Technique Practice.

---

# 8. Academy Foundation Trial profile

To permit one narrow end-to-end browser slice without turning an example into a permanent global law, Progression authorises one bounded activity profile:

`academy_foundation_discipline_activity_v1`

This profile may be attached only to the current generic Academy-stage Training / Practical / Exam discipline activities that CE/Coding explicitly registers to it for the Phase-2 trial.

Profile:

- subject: one current committed Academy-team Character;
- discipline: exact selected discipline;
- primary action values: existing +1 / +2 / +3 law;
- ordinary non-Battle causal cap: existing **3 EXP per discipline per causal root**;
- **developmentCeilingStat = 15**;
- no paired/team sharing;
- no automatic Skill unlock;
- no numeric Mastery;
- no Energy requirement until Energy authority is activated;
- Activity/Exam-specific pass/fail logic remains separately owned and is not invented by this profile.

This **15 ceiling is a browser-trial tuning value for the explicitly registered Academy Foundation profile only.**

It is not:

- a universal Academy Character Stat cap;
- a universal Training cap;
- a cap on Battle/Story/World development;
- a cap on mentor curricula;
- a cap on advanced Practical/Exam packages;
- immutable final balance.

An activity not explicitly registered to this profile and lacking its own authored ceiling must not silently inherit 15.

For a resource-consuming normal-player activity with no authored ceiling, fail closed rather than inventing one.

---

# 9. Exams / Practical / Training roles

## Exams

Primary semantic role:

**validation / examination**

One selected subject.

Real committed actions may still create action-derived Discipline EXP.

Exam result/pass/fail may create separate assessment/Recognition/eligibility facts where authored.

Exam != Promotion.

An Exam is not permitted to add an extra generic "Exam XP" reward.

## Practical

Primary semantic role:

**applied development / hands-on execution**

One selected subject by default.

Practical may use the Foundation profile for the trial or a later exact curriculum profile.

## Training

Primary semantic role:

**deliberate targeted development**

One selected trainee by default.

Training is the most controllable accelerator, not the only source of development.

Weak/simple Training eventually becomes ineffective for Stat development through its authored ceiling.

---

# 10. Post-ceiling Technique Practice

## 10.1 Separate persistent channel

Technique Practice is not Discipline EXP and not generic Skill XP.

It is route-specific persistent progress/evidence for one exact Skill-learning route.

Stable semantic identity:

`(subjectStableId, techniquePracticeRouteId)`

A route may also reference an exact `skillId` where that identity is legitimate Knowledge.

## 10.2 Activation rule

An activity may contribute Technique Practice only when an exact authorised route is already active/eligible.

At minimum the route must identify:

- `techniquePracticeRouteId`;
- exact persistent subject;
- exact curriculum/source/mentor/opportunity;
- exact Skill target or observer-safe hidden target reference;
- current prerequisite predicate result;
- which factual practice outcomes count;
- route-specific progress threshold/resolver;
- access-commit authority.

No route record -> no Technique Practice progress.

## 10.3 Deterministic progress

Once admitted to an exact Technique Practice route:

- valid committed practice contributes deterministic persistent progress/evidence according to that route;
- an authored material failure may still contribute where the route says the attempt teaches something;
- invalid/precommit rejection contributes nothing;
- retry/reload does not duplicate;
- ordinary learning must not be `spend Energy -> random unlock chance`.

Randomness may choose among already-eligible opportunities only where another owner authorises that.

## 10.4 No universal numeric Technique threshold

#434 deliberately does **not** invent:

- universal `5 practice = Skill`;
- generic Technique XP;
- universal Skill mastery levels.

Exact curriculum/practice thresholds belong to the later exact Skill route closure with Combat / Skills + Progression.

## 10.5 Skill-access boundary

Reaching a Technique Practice threshold is not permission for Progression to fabricate Combat mechanics.

The exact Skill-access transaction must consume:

- current route eligibility;
- practice completion;
- exact source/mentor/curriculum requirements;
- prerequisites;
- representation/stage legality;
- any Nature/Bloodline/Hosted-Entity requirements;

and then commit through the authorised Skill-access owner.

Preserve:

**Potential != Eligible != Training in Progress != Learned != Prepared != Mastered**

---

# 11. Mentor-training boundary

Mentor training may legitimately alter:

- available curriculum;
- development ceiling;
- eligible Technique Practice routes;
- exact learning efficiency only where authored;
- Chronicle mentor/student history.

It does not imply:

- trainee inherits mentor Stats;
- trainee gains every mentor Skill;
- mentor earns trainee EXP;
- higher Rank/card rarity creates generic bonus XP;
- relationship automatically increases from attendance;
- formal Rank transfer.

Ordinary current-roster mentor training still has one exact development subject/trainee.

Major mentor/Sannin/Hokage side-mission chains remain World/Story opportunity packages feeding this same Progression model.

---

# 12. Resistance / exposure boundary

#434 does not activate a numeric Resistance Development system.

It locks the boundary for later work:

- resistance development comes from meaningful **received/exposure-side** facts or exact defensive conditioning;
- casting Fire does not grant Fire resistance;
- poisoning an enemy does not grant poison resistance;
- controlled training exposure may be minor evidence;
- hostile/material exposure may be stronger evidence where legitimately challenging;
- zero-damage immunity pings / trivial self-damage / repeated ticks cannot be infinite farming;
- exact numeric weights and caps require separate Progression + Combat closure before `resistanceDevelopment` is registered in the Chronicle State Manifest.

A legitimate failed training occurrence may preserve exposure/failure Chronicle history now without inventing resistance points.

---

# 13. Attached-but-locked source boundary

Persistent Bloodline / Hosted-Entity possession or attachment remains separate from executable access.

#434 does not unlock or develop these sources automatically.

Preserve:

`attachment/possession != current Access != Skill Access != Competence != Power != Mastery`

Discipline Stat growth may later satisfy one predicate in an exact source-capability route, but cannot manufacture the source or bypass its authored requirements.

---

# 14. Development Chronicle facts

The canonical granular source remains committed development/activity receipts.

CE may consume factual development history including:

- first legitimate attempt in a discipline/activity;
- first material failure;
- first effective success;
- returned to the same curriculum after prior failure;
- later success after prior failed sessions;
- Stat breakthrough;
- activity development ceiling reached;
- repeated development in one discipline across distinct committed sessions;
- broad development across several disciplines;
- later sustained shift toward another discipline;
- exact mentor/curriculum participation;
- exact Technique Practice started/completed;
- Skill learned through an exact route;
- exceptional execution;
- legitimate training exposure.

Do not persist or infer universal personality labels such as:

- determined;
- quitter;
- reckless;
- disciplined;
- obsessed;
- talented.

NPCs may interpret factual history according to their own Knowledge/personality.

## 14.1 Milestone receipt types

Progression authorises these semantic milestone types for Phase-2 projection:

- `discipline_stat_breakthrough`;
- `activity_development_ceiling_reached`;
- `technique_practice_started`;
- `technique_practice_completed`.

Retry/failure/success/focus patterns should normally be **derived from ordered factual receipts** rather than duplicated as free-floating labels.

If a cached pattern summary is persisted for performance, it must retain exact source receipt refs and remain a derived projection, not a new semantic truth.

---

# 15. Display-safe progression fields

The existing UI fossil:

- `MASTERY 1`;
- `DISCIPLINE EXP 0 / 50`;

is **not semantic authority** and is superseded for this Phase-2 trial.

## 15.1 Remove numeric Mastery

Do not display a universal numeric `MASTERY` level for ordinary discipline Stat development.

Mastery remains a separately authored concept.

## 15.2 Required normal-player fields

For the selected discipline/activity, UI may show:

- **CURRENT STAT** — exact current persistent Stat;
- **DEVELOPMENT X / Y** — exact Discipline EXP toward the next Stat under the current curve;
- **DEVELOPMENT EFFECTIVE THROUGH [STAT]** — exact activity ceiling where applicable;
- **RECENT RESULT** / natural-language development result;
- **TECHNIQUE PRACTICE** only when an exact route is active/known enough to project safely.

Example:

`CURRENT STAT 12`  
`DEVELOPMENT 7 / 15`  
`DEVELOPMENT EFFECTIVE THROUGH 15`

If the ceiling is reached:

`STAT DEVELOPMENT COMPLETE FOR THIS ACTIVITY`

If a legitimate post-ceiling route exists:

`TECHNIQUE PRACTICE ACTIVE`

or the exact known Skill name / safe progress when observer Knowledge permits.

## 15.3 Hidden Skill safety

Do not leak:

- undiscovered Skill names;
- hidden thresholds;
- secret mentor identities;
- hidden prerequisites;
- future event requirements.

If the route's exact target is not legitimate player Knowledge, UI may show an observer-safe purpose such as:

- `TECHNIQUE PRACTICE ACTIVE`;
- `TECHNIQUE INSIGHT IN PROGRESS`;

only when the player's resource is genuinely contributing to that route.

No invisible zero-value grind.

---

# 16. Resource-spend preflight

Before committing Energy / Ryō / a limited repetition / material for development activity:

1. validate current subject;
2. validate current team where applicable;
3. validate activity/curriculum access;
4. validate discipline-development ceiling;
5. validate Technique Practice route if primary Stat development is unavailable;
6. calculate visible cost;
7. expose observer-safe purpose;
8. only then commit spend and occurrence.

If primary development is dead and no authorised secondary purpose exists:

**do not consume the limited resource.**

Energy is not activated by this contract. When Energy activates, it must consume this preflight.

---

# 17. Chronicle State Manifest registration requirements

#436 already established the manifest scaffold.

The Phase-2 implementation of #434 must extend it rather than invent another save root.

## 17.1 `disciplineDevelopment`

Required manifest semantics:

- `stateDomainId = disciplineDevelopment`
- semanticOwner: `Progression / Development`
- canonicalWritePath: one shared Discipline Development receipt + breakthrough transaction;
- stableIdentityKey: `ownedCharacterId + disciplineId`;
- savePath: the existing canonical persistent Character discipline-progression record; **do not duplicate the ledger under a second Phase-2 path**;
- schemaVersion: explicit Phase-2 registered version;
- sourceOccurrenceIdFormat: authoritative owner occurrence / action occurrence;
- idempotenceKeyFormat: exact existing development receipt key including stable subject + source + action/progression slot + discipline;
- derivedFields: next threshold, progress ratio, activity eligibility;
- projectionConsumers: Training, Practical, Exams, Battle/Story/World development adapters, Shinobi Record;
- migrationRule: preserve legitimate persisted EXP exactly; no UI-counter inference;
- resetRule: new Chronicle / explicit authorised reset only;
- difficultyScope: difficulty-aware, Academy active now;
- inheritanceRule: exact persistent Character development survives representation/team changes where inheritance authority permits;
- devOverridePolicy: explicit dev mode only;
- qaRefs: #434 focused regression + #311 compatibility.

## 17.2 `characterStats`

Required manifest semantics:

- semantic owner remains PL / Registry / Rank for canonical Stat state;
- Progression breakthrough is an authorised **Current-Stat mutation source**, not a second Stats owner;
- stable identity: exact persistent Character + stat ID;
- savePath: existing canonical persistent Character Stats path;
- Base Stats remain unchanged by ordinary breakthrough;
- Current Stat changes by the committed permanent development delta;
- Effective/Battle fields remain derived/contextual;
- Current PL is derived from final Current Stats.

Do not create `phase2ChronicleState.characterStats` if that would duplicate the existing canonical Stats writer.

## 17.3 `techniquePractice`

Do **not** activate/register a writable Technique Practice save path until the first exact Skill curriculum route is closed.

When activated, it must use:

- exact stable Character identity;
- exact `techniquePracticeRouteId`;
- route-specific progress;
- exact source/curriculum refs;
- observer-safety / known-target state;
- idempotent occurrence receipts.

## 17.4 No new `mastery` domain

#434 creates no universal numeric Mastery state.

---

# 18. Migration / compatibility

## 18.1 UI fossils

Do not migrate semantic state from text such as:

- `MASTERY 1`;
- `0 / 50`.

Presentation text is not history.

## 18.2 Existing legitimate Discipline EXP

Where the canonical persistent Discipline EXP ledger already contains legitimate earned EXP:

- preserve the exact amount;
- do not zero it;
- do not multiply it;
- do not infer additional historical actions.

On first Phase-2 v1 normalization, the ledger may deterministically resolve any already-satisfied v1 breakthrough thresholds using the current persistent Stat as the starting point.

This is permitted only from canonical persisted development state / authoritative receipts, never from a visual counter.

## 18.3 Existing Stats

Do not reverse previously committed permanent Current Stats merely because the new curve did not exist when they were earned.

The v1 curve governs future threshold conversion from the activation baseline.

Direct permanent Stat packages remain separate valid historical sources.

## 18.4 Save fixtures

Add at minimum:

- pre-Phase-2 save with no discipline progress;
- mid-development save;
- exactly-one-EXP-below-threshold save;
- exact-threshold breakthrough save;
- overflow save;
- multi-breakthrough migration save;
- just-after-breakthrough save;
- activity-at-ceiling save;
- current-team subject save;
- stale-team-selection failure save;
- no-authorised-Technique-route post-ceiling save.

Compatibility reader remains pure.

---

# 19. Exact machine-facing receipt envelope

A Discipline Development grant must preserve semantically:

- `receiptId`;
- exact stable Character identity;
- current representation/variant snapshot where useful;
- `sourceOccurrenceId`;
- exact action occurrence / progression slot;
- `causalRootId`;
- canonical `disciplineId`;
- development class;
- requested EXP;
- granted EXP after causal/source cap;
- activity ID / curriculum ID where applicable;
- activity ceiling snapshot where applicable;
- curve ID;
- committed state.

A Stat breakthrough receipt must preserve:

- `receiptType = discipline_stat_breakthrough`;
- stable Character identity;
- discipline ID;
- curve ID;
- prior Stat;
- new Stat;
- threshold consumed;
- EXP before threshold consumption;
- EXP remaining after;
- source development receipt refs that caused the transaction;
- Current PL before;
- Current PL after;
- commit state.

Stable breakthrough idempotence key:

`(stableCharacterId, disciplineId, breakthroughOrdinalOrPriorStat, curveId, causalTransactionId)`

Coding may choose the exact field names, but not weaken the semantic identity.

A rerender / Receipt reopen / save-load must not mint a second breakthrough.

---

# 20. Foundation-trial diagnostics

Before browser handoff, Coding must prove at minimum:

1. normal Academy selector contains only the committed current-team trio;
2. selected team entry resolves to one stable persistent Character;
3. one subject develops; teammates do not receive passive copies;
4. an AI-controlled persistent teammate can earn their own legitimate action development;
5. +1 / +2 / +3 action receipts still work;
6. Stat 10 requires 10 EXP;
7. after 10 -> 11, the next threshold is 15;
8. Stat 20 -> next threshold 15; after 20 -> 21, next threshold becomes 20;
9. overflow carries exactly;
10. a large legitimate ledger can process sequential multi-breakthroughs;
11. PL is recomputed from final Stats, never directly granted;
12. a Stat increase that does not change rounded PL displays no fake PL gain;
13. Academy Foundation registered activity stops primary EXP at Current Stat 15;
14. the final eligible repetition may carry legitimate overflow;
15. the next repetition at/above ceiling cannot spend a limited resource for dead Stat growth;
16. x5/x10 batch stops at the ceiling;
17. no active Technique Practice route -> post-ceiling primary repetition blocked/no resource spend;
18. active exact Technique Practice route -> deterministic route-specific practice may continue;
19. `MASTERY 1` is not projected as semantic state;
20. Development denominator is dynamic from the curve, not hard-coded 50;
21. save/load preserves Stat / EXP / PL / ceiling milestone;
22. reload/reopen does not duplicate development or breakthrough receipts;
23. current-team change invalidates a stale activity subject selection;
24. Origin/Battle FROZEN regression remains GREEN.

---

# 21. Combat / Skills downstream boundary

The basic Discipline EXP -> Stat loop does **not** wait for the full Potential Skill Roster.

The later exact Skill curriculum mapping must be coordinated through existing #382.

Combat / Skills must eventually supply exact Skill-side facts for each activated route, including:

- exact Skill ID and mechanics;
- representation/stage legality;
- acquisition family;
- required source/capability;
- exact prerequisite Skills;
- combat-use prerequisites;
- whether failure/exposure semantics matter to the Skill itself;
- prepared/loadout legality after access.

Progression then owns:

- exact training/development threshold predicates;
- curriculum progress;
- Technique Practice threshold;
- persistent progress receipt;
- development/mentor history.

World/Story owns exact opportunity/mentor/location access where applicable.

No exact route -> no generic Skill auto-unlock.

---

# 22. Resistance / Nature / Bloodline non-blocking boundary

Do not wait for:

- full #382 Skill breadth;
- advanced #435 Bloodline taxonomy;
- complete five-element Nature curricula;
- numeric resistance progression;

to implement this basic seven-discipline Stat-growth loop.

But do not use #434 to invent those systems either.

They must register their own Chronicle State Manifest domains when their first exact production slices activate.

---

# 23. Trial status and tuning

This contract makes the following **binding for the Phase-2 trial implementation**:

- curve formula `discipline_stat_curve_v1`;
- exact breakthrough transaction;
- overflow;
- formula-derived PL;
- stable persistent Character ownership;
- single-subject current-team selection;
- visible ceilings;
- Foundation profile ceiling 15 where explicitly registered;
- no resource burn for known zero primary value;
- dynamic Development denominator;
- no universal numeric Mastery;
- deterministic route-specific Technique Practice only;
- factual development Chronicle history;
- manifest/idempotence/migration requirements.

The following remain tunable after Stephen's browser trial:

- curve pace;
- Foundation ceiling value;
- which exact current activities are registered to the Foundation profile;
- activity-specific higher ceilings;
- Technique Practice thresholds;
- mentor efficiencies;
- resistance values;
- Nature Development scales.

A tuning successor must publish a new curve/profile version. Do not silently mutate old receipt interpretation.

---

# 24. Final lock

> **Phase-2 Trial v1 converts legitimate Discipline Development EXP into permanent Current Stats using `5 + 5 × ceil(Current Stat / 10)`, carries overflow, and recalculates PL strictly from the resulting seven Current Stats. Development belongs to the exact persistent Character, ordinary Academy Training/Practical/Exams select one member of the committed current team, and repeatable activities must expose a development ceiling before limited resources are spent. The explicitly registered Academy Foundation trial profile is effective through Stat 15; this is a trial activity ceiling, not a global Stat cap. Post-ceiling repetition can continue only through an exact authorised Technique Practice or other meaningful route; there is no generic Skill XP and no universal numeric Mastery. Factual development history persists for CE, while personality labels, hidden Skill leakage and duplicate save/reload grants remain prohibited.**
