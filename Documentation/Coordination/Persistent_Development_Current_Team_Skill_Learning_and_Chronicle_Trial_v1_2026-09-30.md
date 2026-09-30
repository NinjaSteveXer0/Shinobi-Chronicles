# Shinobi Chronicles — Persistent Development, Current-Team Truth, Skill Learning + Chronicle Trial v1

**Date:** 2026-09-30  
**Owner direction:** Stephen  
**Coordination:** CE / Codex / Coordination  
**Required semantic owner:** Progression / Development, with Combat / Skills consumption for exact Skill access  
**Status:** **OWNER-APPROVED PHASE-2 DIRECTION / TRIAL CURVE CANDIDATE — PROGRESSION RATIFICATION + RUNTIME IMPLEMENTATION REQUIRED**  
**Phase-2 board:** Top 10 item #2

## 1. Core purpose

Close the missing bridge between:

`legitimate action -> Discipline Development EXP -> permanent Stat development -> derived PL -> persistent Character growth`

while also making:

- current team authoritative across team-aware surfaces;
- single-subject Exams/Practical meaningful;
- AI-controlled participants develop naturally from their own actions;
- Training useful without becoming an infinite Stat farm;
- Skill learning emerge from legitimate training/development sources;
- Chronicle/CE remember meaningful development patterns.

## 2. One persistent Character-development truth

Persistent development belongs to the exact owned/persistent Character instance.

It does not belong to:
- a team slot;
- a screen;
- the protagonist globally;
- the player's account as a generic XP pool.

If Hinata performs the action, Hinata develops.

If Kushina performs the action, Kushina develops.

If an AI-controlled teammate performs the action legitimately, that exact teammate develops from their own action.

Do not redirect teammate development to the protagonist merely because the player controls the Chronicle.

## 3. Current-team truth

There must be one authoritative committed Chronicle team assignment for the current stage.

At Academy stage:

`Origin protagonist + two committed Academy teammates`

All team-aware screens consume that same assignment.

Preserve:

`current team != activity participants`

`current team != My Clan formation`

`current team != Battle deployment`

`current team != Guest Allies`

`activity participants != silent team mutation`.

### Player-facing subject selection

For ordinary player-mode Academy Exams / Practical / Training selection:
- cycle/select only legitimate members of the current committed Academy team unless exact authority permits another participant;
- a dev/owner testing mode may expose wider roster selection, but it must be clearly a test override rather than normal game semantics.

## 4. Single-subject default

Stephen locks the Alpha default:

### Exams
One selected Character is the assessment subject.

### Practical
One selected Character is the development subject.

No passive team-wide Stat/EXP sharing.

### Training Grounds
Single-subject development remains default.

Sparring / Mentorship / Weapons Proficiency may involve multiple participants where the exact activity requires them, but:
- only the actor/trainee who factually earns development receives it;
- merely acting as partner/mentor/observer does not clone the trainee's Stat gain;
- weapon-proficiency mentorship remains separately owned by exact Weapons/Progression authority.

Future paired/team Exams or Practical exercises are supported in principle but require deliberate pre-Alpha authoring and must not be inferred from current single-subject screens.

## 5. Existing Discipline Development EXP remains authoritative

Seven persistent discipline ledgers remain:

- Ninjutsu
- Taijutsu
- Genjutsu
- Bukijutsu
- Fūinjutsu
- Kinjutsu
- Stamina

Existing action values remain:

- committed material attempt = +1
- effective execution = +2
- separately authored exceptional execution = +3

Existing causal caps/idempotence remain unless Progression explicitly supersedes them.

Training is not a second XP system.

Story / Battle / World / Exams / Practical / Training all feed the same discipline ledgers when legitimate action evidence exists.

## 6. Trial v1 EXP -> Stat curve

Stephen has approved testing an EXP-to-next-Stat model rather than leaving development as a permanent ledger with no growth conversion.

Candidate v1:

`EXP needed for next Stat = 5 + (5 × ceil(Current Developed Stat / 10))`

Equivalent bands:

| Current Developed Stat | EXP to next Stat |
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

Continue the same pattern above 100 because Stats are not globally capped.

This curve is a **trial tuning candidate**, not immutable law.

Stephen browser feedback may make it faster/slower.

## 7. Stat-up transaction

When one discipline ledger reaches its threshold:

1. increment that exact Developed/Current Stat by +1;
2. subtract the threshold from that discipline EXP;
3. carry any overflow forward;
4. recalculate Current PL using the canonical PL formula;
5. persist the Stat, remaining EXP and recalculated PL;
6. emit one idempotent development receipt;
7. present the Stat increase to the player.

No direct PL grant occurs.

A Stat increase may or may not change rounded PL.

UI must tell the truth.

Example:

`Ninjutsu 12 -> 13`

may display:
- Stat increase;
- updated Current PL only if formula result actually changed.

Do not fabricate `+1 PL` merely because a Stat increased.

## 8. PL relationship

There is no fixed rule:

`4 Stat gains = +1 PL`

or:

`4 Ninjutsu gains = +1 PL`.

Historical Academy Obito calibration demonstrates that four +1 gains across:
- Ninjutsu;
- Taijutsu;
- Bukijutsu;
- Stamina

can move Current PL 12 -> 13, while smaller packages do not.

That is a formula outcome, not a hidden conversion counter.

Current PL must always be recomputed from current Stats under the canonical formula.

## 9. Development ceilings

Every repeatable dedicated Training / Practical / Exam activity that can directly award discipline growth must declare an observer-safe **development effectiveness ceiling** or equivalent progression range.

Example presentation:

**STAT DEVELOPMENT EFFECTIVE THROUGH: NINJUTSU 15**

or a clearer final UI equivalent.

Once the selected subject reaches/exceeds that ceiling:
- that activity grants no further Stat-development EXP for that discipline;
- UI must disclose this **before** Energy/payment/attempt is committed;
- no player may unknowingly spend Energy for zero primary development.

### Batch controls

For ×5 / ×10 repeated runs:
- preview total cost later when Energy is active;
- automatically stop the Stat-development portion when the ceiling is reached;
- do not silently burn remaining repetitions for zero Stat growth;
- if post-ceiling Technique Practice is available, explicitly ask/indicate that continued repetitions now serve that different purpose.

## 10. Post-ceiling practice can still matter

Stephen explicitly wants continued practice after a Stat-development ceiling to remain potentially meaningful.

Therefore an activity may offer:
- Technique Practice;
- weapon proficiency;
- mentor-specific learning;
- exact Chronicle history/pattern evidence;
- other separately authored development.

But only if current authority explicitly supports it.

Do not keep charging Energy for a dead activity.

## 11. Skill learning — no generic Stat auto-unlock

Existing Skill catalogue rows already contain acquisition families such as:
- `academy_or_general_training`;
- `mentor_or_training`;
- `element_training`;
- `mission_mentor_or_scroll`;
- `legendary_mentor_or_chronicle_gate`.

Catalogue presence does not grant access.

Persistent Stat growth may make a Skill route eligible, but:

`Stat threshold != automatic Skill ownership`.

Exact Skill learning must consume an authorised source/curriculum/mentor/training route.

## 12. Technique Practice trial

A Training / Practical / Exam opportunity may explicitly reference one or more exact teachable Skills.

A Skill-learning route may require combinations of:
- relevant developed Stat;
- prerequisite Skill(s);
- elemental/natural capability;
- exact weapon/equipment source;
- mentor access;
- location/service access;
- prior Chronicle evidence;
- repeated successful/attempted practice.

When the Skill route is legitimate, post-ceiling practice may contribute **Technique Practice evidence** toward that exact Skill.

Do not create one generic global Skill XP pool.

Final numeric technique-practice thresholds remain Combat/Skills + Progression work.

## 13. Player-visible counter and mystery boundary

Stephen requires that the player is not tricked into wasting Energy.

Therefore:

### Stat development
Exact progress to next Stat should be visible:

**DEVELOPMENT: 7 / 15**

### Ceiling
The player must know when an activity no longer increases that Stat.

### Technique route
If exact Skill identity is legitimately known:
show the named Skill / technique practice progress.

If a Skill route exists but the exact Skill identity is not yet legitimate Knowledge:
UI may show an observer-safe state such as:

**TECHNIQUE PRACTICE: POSSIBLE**

or:

**TECHNIQUE INSIGHT: 2 / 5**

without leaking the hidden technique name.

But the player must still know what their Energy is contributing toward.

No invisible zero-value grind.

## 14. NPC hints

NPC dialogue may naturally teach deeper mechanics.

Example semantic intent:

> repeating an exercise after ordinary Stat growth has plateaued can sometimes be how a ninja refines or discovers a technique.

Exact player-facing wording remains Writing-owned.

NPC hints are flavour/learning support.

They do not replace UI honesty about:
- Stat ceiling;
- current development gain;
- Energy cost;
- whether Technique Practice is actually active.

## 15. Chronicle development history

Underlying receipts may preserve granular action history.

Player-facing Chronicle should not spam one row per repeated rep.

Meaningful development milestones may include:

- first legitimate attempt in a discipline/activity;
- first failure;
- first success;
- first Exam pass;
- Stat breakthrough;
- development ceiling reached;
- returned to the same activity after a prior failure;
- success after repeated prior failure;
- sustained focus over multiple distinct sessions;
- sustained shift toward a different discipline;
- Skill/Technique learned;
- mentor/proficiency milestone;
- major exceptional execution.

## 16. Development-pattern evidence — facts, not personality labels

CE may consume persistent factual patterns such as:

- repeated retry after failure;
- repeated development in the same discipline across distinct sessions;
- broad development across several disciplines;
- a later sustained focus shift;
- breakthrough after prior failure history.

Do NOT automatically store moral/personality labels such as:
- `never_gives_up=true`;
- `quitter=true`;
- `distracted=true`;
- `disciplined=true`.

Store factual history.

Characters/NPCs may interpret that history differently according to observer Knowledge/personality.

## 17. CE / NPC conversation use

Once persistent development history exists, authorised NPCs may naturally react to it.

Examples:
- trainer recognises repeated returns after failed Ninjutsu attempts;
- mentor notices the Character keeps changing disciplines;
- teammate comments on a recent breakthrough;
- examiner recognises prior failure only if that examiner/institution legitimately has access to the record;
- later hotspot opportunities respond to demonstrated capability/history.

Preserve:

`recorded development fact != universal observer Knowledge`.

## 18. Exams role

Primary function:

**validation / examination of a discipline or capability**

Exams may still generate action-derived development because real actions occurred.

They should not become the optimal generic Stat farm.

An Exam result may create:
- pass/fail record;
- recognition/access;
- skill eligibility;
- exact future opportunity;
- Chronicle history;

only where exact owner authority supports it.

Exam != Promotion.

## 19. Practical role

Primary function:

**applied development / hands-on execution**

Practical should become a strong single-subject development surface.

Future pair/team Practical activities are permitted only through explicit authored activity packages.

## 20. Training role

Primary function:

**deliberate targeted development**

Training should normally be the most controllable way for a player to target a discipline, but not the only place development exists.

Weak/simple training cannot scale one Stat forever because of development ceilings.

Better development requires:
- harder exercises;
- mentors;
- higher access;
- new locations;
- Story/World opportunities;
- advanced Practical;
- appropriate Exams;
- real Battles/actions.

## 21. Current Exams / Practical UI correction

Current UI currently presents:
- `MASTERY 1`;
- `DISCIPLINE EXP 0 / 50`.

Current durable Progression authority does not define that exact 50-point Stat conversion or a universal numeric Mastery level.

Therefore those labels must not become semantic authority merely because they exist in UI.

Candidate Phase-2 replacement:

- **CURRENT STAT**
- **DEVELOPMENT X / Y**
- **DEVELOPMENT EFFECTIVE THROUGH [STAT]**
- optional **TECHNIQUE PRACTICE / INSIGHT**
- Recent Results / Development Record

The existing UI reframe contract's instruction to preserve "discipline EXP/mastery presentation" remains presentation-history authority only and must be reconciled if Progression ratifies this successor semantic model.

## 22. UI evolution direction

Current screenshots show useful structural foundations but excessive unused space.

Candidate reuse:

### Left dossier
- selected current-team subject;
- Current PL;
- key current Stats / selected discipline context;
- recent development notification;
- team selector limited to current team in player mode.

### Main discipline panel
For each discipline/activity:
- Current Stat;
- EXP to next Stat;
- progress bar;
- activity growth ceiling;
- eligible/known Technique Practice;
- last result / pass-fail where relevant.

### Empty lower/right space
Use for:
- recent attempts/results;
- Technique discovery/practice;
- activity explanation;
- current eligibility;
- Chronicle-relevant milestones.

Do not fill empty space with decorative noise merely to make the screen busy.

## 23. Energy integration

When Energy activates later:
- each committed repetition shows/consumes exact cost;
- batch controls show total potential cost;
- if development ceiling is reached mid-batch, stop/branch rather than consume useless Energy;
- dev/owner unlimited-Energy mode remains available for testing.

## 24. Trial acceptance

Before promoting this model from candidate to Golden progression authority, prove:

1. one selected current-team Character trains alone;
2. teammate receives no passive copied gain;
3. AI-controlled teammate receives their own gain from their own legitimate action;
4. +1/+2/+3 receipts accumulate correctly;
5. threshold converts exact discipline EXP into +1 Stat;
6. overflow carries;
7. PL recalculates rather than receiving direct bonus;
8. save/load preserves Stat/EXP/PL;
9. activity ceiling prevents further Stat EXP;
10. UI warns before spending Energy;
11. post-ceiling Technique Practice works only when authorised;
12. learned Skill access is exact and persistent;
13. Chronicle records meaningful milestone without spam;
14. CE can later query factual development history safely;
15. Exams/Practical select from current team rather than arbitrary global roster in normal player mode.

## 25. Final candidate principle

> **The Character develops from what that Character actually does. One shared discipline-development system runs through Battle, Story, World, Exams, Practical and Training. Dedicated training targets growth deliberately; it does not monopolise growth. Discipline EXP converts into permanent Stats through a visible tuned threshold, PL is always recalculated from Stats, weak activities eventually stop increasing the Stat, continued authorised practice can instead teach exact Skills or build meaningful Chronicle history, and the game never consumes Energy for hidden zero-value repetition.**
