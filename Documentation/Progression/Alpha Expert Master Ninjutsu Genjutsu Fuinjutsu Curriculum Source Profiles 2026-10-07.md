# Shinobi Chronicles — Alpha Expert / Master Ninjutsu, Genjutsu and Fūinjutsu Curriculum Source Profiles

**Date:** 2026-10-07  
**Owner:** Progression / Development  
**Source:** #568  
**Status:** **BINDING ALPHA PROGRESSION CONTRACT — IMPLEMENTATION / BROWSER VALIDATION STILL REQUIRED**  
**Priority:** **ALPHA BLOCKER**

Consumes durable authority:
- `Documentation/Coordination/Academy_Identity_Post15_Curriculum_Starting_Skill_and_Combat_Domain_Firewall_2026-10-07.md`;
- `Documentation/Progression/Phase 2 Discipline Development to Persistent Stat Growth Trial Contract 2026-10-01.md`;
- merged #448 runtime semantics for `academy_foundation_discipline_activity_v1`.

Preserve:

> **FOUNDATION CURRICULUM -> EXPERT CURRICULUM -> MASTER CURRICULUM**

> **same UI lane != same development source**

> **source exhausted != Character development exhausted**

> **Promotion is not the owner of Stat growth and is not the sole gate to post-15 development.**

---

## 1. Scope

This contract closes the exact higher structured curriculum/source profiles required for Alpha for:

- Ninjutsu (`nin`);
- Genjutsu (`gen`);
- Fūinjutsu (`fuin`).

It does not create Expert/Master structured curricula for:

- Taijutsu;
- Bukijutsu;
- Kinjutsu;
- Stamina.

Those disciplines may still develop through any separately authorised Battle / Story / World / mentor / route source.

This contract also does not create:

- universal personal `Expert` or `Master` titles;
- formal Rank;
- automatic Skills;
- a global Stat cap;
- a second Discipline EXP currency;
- generic Skill XP;
- a generic Training Grounds Discipline writer.

---

# 2. Existing Foundation profile remains unchanged

Existing profile:

`academy_foundation_discipline_activity_v1`

remains authoritative for the current generic Academy Exams + Practical discipline-development lanes.

Foundation source limit:

`developmentCeilingStat = 15`

Meaning:

- while Current Stat is below 15, a valid registered Foundation attempt may award primary Discipline Development EXP;
- at Current Stat 15 or above, Foundation awards 0 primary Discipline Development EXP;
- already-earned overflow is preserved;
- Character development is not globally capped;
- the player must transition to another legitimate source for continued structured development.

Foundation is not silently extended.

---

# 3. Exact Alpha curriculum bands

The Alpha structured curriculum bands are now:

| Curriculum | Effective Current-Stat band | Source ceiling | Meaning |
|---|---:|---:|---|
| Foundation | `< 15` | 15 | introductory structured source |
| Expert | `15–29` | 30 | post-Foundation advanced structured source |
| Master | `30–49` | 50 | highest implemented Alpha structured source |

Exact rule:

- Foundation is effective only while `Current Stat < 15`;
- Expert is effective only while `15 <= Current Stat < 30`;
- Master is effective only while `30 <= Current Stat < 50`.

At Current Stat 50 or above, the Alpha Master curriculum becomes ineffective for primary Discipline Development EXP.

This does **not** mean Stat 50 is a global discipline cap.

Battle / Story / World / route-specific / future higher curricula may continue development above 50 where separately authorised.

---

# 4. Exact Expert profile IDs

## 4.1 Ninjutsu

Stable source/profile ID:

`discipline_curriculum_nin_expert_v1`

Supported discipline:

`nin`

Player-facing label:

`EXPERT NINJUTSU CURRICULUM`

Development floor:

`developmentFloorStat = 15`

Development ceiling:

`developmentCeilingStat = 30`

## 4.2 Genjutsu

Stable source/profile ID:

`discipline_curriculum_gen_expert_v1`

Supported discipline:

`gen`

Player-facing label:

`EXPERT GENJUTSU CURRICULUM`

Development floor:

`developmentFloorStat = 15`

Development ceiling:

`developmentCeilingStat = 30`

## 4.3 Fūinjutsu

Stable source/profile ID:

`discipline_curriculum_fuin_expert_v1`

Supported discipline:

`fuin`

Player-facing label:

`EXPERT FŪINJUTSU CURRICULUM`

Development floor:

`developmentFloorStat = 15`

Development ceiling:

`developmentCeilingStat = 30`

---

# 5. Exact Master profile IDs

## 5.1 Ninjutsu

Stable source/profile ID:

`discipline_curriculum_nin_master_v1`

Supported discipline:

`nin`

Player-facing label:

`MASTER NINJUTSU CURRICULUM`

Development floor:

`developmentFloorStat = 30`

Development ceiling:

`developmentCeilingStat = 50`

## 5.2 Genjutsu

Stable source/profile ID:

`discipline_curriculum_gen_master_v1`

Supported discipline:

`gen`

Player-facing label:

`MASTER GENJUTSU CURRICULUM`

Development floor:

`developmentFloorStat = 30`

Development ceiling:

`developmentCeilingStat = 50`

## 5.3 Fūinjutsu

Stable source/profile ID:

`discipline_curriculum_fuin_master_v1`

Supported discipline:

`fuin`

Player-facing label:

`MASTER FŪINJUTSU CURRICULUM`

Development floor:

`developmentFloorStat = 30`

Development ceiling:

`developmentCeilingStat = 50`

---

# 6. Exact access / entry predicates

For normal player-mode Academy-stage use, an Expert or Master curriculum attempt requires all of the following before commit:

1. the selected subject resolves to one exact stable persistent Character;
2. the selected subject is in the exact currently committed Academy team;
3. the selected discipline is exactly one of `nin`, `gen`, `fuin`;
4. the selected activity host is a registered curriculum-capable **Exam** or **Practical** lane;
5. the subject's Current persistent Stat satisfies the selected profile's lower bound;
6. the subject's Current persistent Stat is below the selected profile's `developmentCeilingStat` for primary Discipline Development;
7. the activity/profile mapping is explicitly registered; UI label alone is insufficient;
8. any ordinary activity-specific legality check already owned by Exams/Practical also passes.

No formal Rank predicate is required for these Alpha profiles.

No Genin predicate is required.

No Promotion predicate is required.

No Skill predicate is required merely to enter the curriculum.

No random discovery roll is required.

No curriculum-unlock token is required.

Curriculum availability in Alpha is derived from factual Current Stat + current-team/activity legality rather than stored as a second progression truth.

---

# 7. Academy-stage reachability proof

The Alpha continuation is deliberately reachable before Promotion.

## 7.1 Foundation-developed Character

A Character may use Foundation while below Stat 15.

When legitimate development raises that Current Stat to 15:

- Foundation becomes ineffective;
- the matching Expert curriculum becomes immediately eligible in the same player-facing Exam/Practical lane;
- no Promotion is required;
- no Stat is granted for switching source.

## 7.2 Academy Kakashi above the Foundation ceiling

Academy Kakashi may already begin with Ninjutsu above 15 under current representation authority.

If his Current Ninjutsu is 16:

- Foundation Ninjutsu is already ineffective;
- `discipline_curriculum_nin_expert_v1` is immediately eligible;
- Kakashi does not need to regress to 15;
- he does not need to fake Foundation history;
- he does not need to become Genin first.

## 7.3 Character developed by other sources

A Character may reach 15 or 30 through legitimate Battle / Story / World / route development without using the lower structured curriculum.

The next structured curriculum remains available based on Current Stat.

Expert attendance is therefore not a mandatory prerequisite for Master access.

This preserves:

> **curriculum source history != monopoly over Character development**

and prevents Battle / Story / World development from becoming second-class progression.

---

# 8. Source selection / transition law

For one selected Character + discipline:

- if Current Stat `< 15`, Foundation is the highest effective structured Alpha source;
- if Current Stat is `15–29`, Expert is the highest effective structured Alpha source;
- if Current Stat is `30–49`, Master is the highest effective structured Alpha source;
- if Current Stat is `>= 50`, no currently implemented Alpha structured curriculum is effective for primary Discipline Development.

The UI may allow the player to inspect older exhausted curricula, but it must not present them as effective sources.

Default source resolution should prefer the highest currently effective authorised curriculum for that discipline.

A source transition does not:

- reset Discipline Development EXP;
- reset Current Stat;
- grant a Current Stat;
- grant PL directly;
- grant a Skill;
- erase prior source/provenance receipts;
- alter Base Stats.

---

# 9. Development EXP law inside Expert / Master

The existing action-derived law remains authoritative.

For registered Expert / Master Exam or Practical attempts:

### Committed material failure

A legitimate attempt that materially occurs but fails to achieve the activity's intended effective outcome:

`+1 Discipline Development EXP`

### Effective execution

A legitimate attempt that achieves the authored effective outcome:

`+2 Discipline Development EXP`

### Exceptional execution

`+3 Discipline Development EXP` remains available only when an exact activity/action package separately authors an exceptional predicate.

The generic Expert and Master profiles do **not** automatically emit +3.

Hard rule:

> **Master curriculum != automatic +3 farm.**

The ordinary non-Battle causal cap of 3 EXP per discipline per causal root remains unchanged.

The persistent curve remains:

`discipline_stat_curve_v1`

with:

`EXP_TO_NEXT_STAT(S) = 5 + (5 × ceil(S / 10))`

Expert / Master do not introduce a second curve or multiplier.

---

# 10. Exact qualifying activity hosts

For Alpha v1, the structured curriculum profiles are authorised only on the current registered discipline-development hosts:

- **Exams**;
- **Practical**.

These may remain on the same screens/lanes used by Foundation.

The selected profile changes the development source/provenance and permitted efficacy band.

## Exams

A valid curriculum Exam attempt may produce:

- +1 for committed material failure;
- +2 for effective execution;
- +3 only if a separate exact exceptional Exam predicate is authored later.

Exam pass/fail / assessment facts remain activity-owned.

Exam != Promotion.

## Practical

A valid curriculum Practical attempt may produce:

- +1 for committed material failure;
- +2 for effective execution;
- +3 only if a separate exact exceptional Practical predicate is authored later.

Practical remains an applied-development activity.

## Training Grounds

Current Training Grounds routes such as Weapons Training / Sparring / Mentorship are **not** silently registered as generic Expert/Master Nin/Gen/Fūin writers by this contract.

They remain fail-closed for primary Discipline Development unless a later exact activity/source mapping authorises them.

This contract does not create a fake generic `Discipline Training` action.

---

# 11. Difficulty / challenge boundary

Expert and Master are distinct source profiles even when hosted on the same screen.

Implementation must not merely relabel Foundation while continuing to commit Foundation provenance.

The selected attempt must carry the exact Expert/Master `activityProfileId`.

Existing Exam/Practical result resolution may continue to own pass/fail mechanics.

Progression does not invent a second Battle resolver here.

If UI/Coding exposes curriculum-specific challenge presentation, it must remain consistent with the selected source profile.

Hard rule:

> **harder curriculum may change challenge / efficacy / access; it does not automatically multiply EXP.**

---

# 12. Resource cost

Alpha v1 curriculum-source surcharge:

- Foundation: `0 Ryō`, `0 Energy` from the curriculum profile itself;
- Expert: `0 Ryō`, `0 Energy` from the curriculum profile itself;
- Master: `0 Ryō`, `0 Energy` from the curriculum profile itself.

This is deliberate.

Energy authority is not activated by this contract.

The curriculum system must not invent a new Ryō sink merely to differentiate higher source labels.

If an Exam / Practical package separately has an authorised activity-specific cost, that cost remains activity-owned and must be preflighted normally.

## Preflight rule

Before any resource-bearing attempt commits:

1. resolve subject;
2. resolve exact discipline;
3. resolve exact curriculum profile;
4. verify Current Stat lies in the profile's effective band;
5. verify current-team assignment has not gone stale;
6. verify activity legality;
7. verify any separately authorised resource balance;
8. only then spend resource and resolve the attempt.

If the curriculum is already ineffective, spend nothing for primary-development mode.

---

# 13. Batch behavior

For x5 / x10 or any future batch control:

- preflight each repetition semantically;
- commit each factual attempt with its own idempotent occurrence identity;
- after every breakthrough, recompute the Current Stat and next EXP threshold;
- after every breakthrough, re-evaluate the selected source's ceiling;
- stop the primary-development batch immediately when the source becomes ineffective;
- do not consume remaining authorised resource costs for dead repetitions;
- preserve legitimate EXP overflow.

If the Character crosses:

- 15 during Foundation -> remaining Foundation repetitions stop;
- 30 during Expert -> remaining Expert repetitions stop;
- 50 during Master -> remaining Master repetitions stop.

No silent automatic conversion of remaining batch repetitions into another curriculum or Technique Practice.

The player-facing state may offer the next curriculum after the current batch ends.

---

# 14. Save / load / idempotence

Expert / Master do not create a second Discipline Development ledger.

Persistent development remains attached to the exact persistent Character + discipline under the existing Chronicle State Manifest / #448 authority.

For every committed Expert / Master development grant, persist provenance sufficient to identify:

- stable Character identity;
- representation variant for provenance where useful;
- discipline ID;
- source occurrence ID;
- causal root ID;
- exact `activityProfileId`;
- development floor;
- development ceiling;
- development class (`material_failure`, `effective_execution`, or separately authorised exceptional class);
- requested EXP;
- granted EXP;
- curve ID;
- Current Stat before/after where breakthrough occurs;
- source activity (`exam` / `practical`);
- commit state.

Idempotence continues to use the existing exact source-occurrence / stable-subject transaction law.

Save/load/reopen must not:

- duplicate EXP;
- duplicate breakthrough receipts;
- downgrade an Expert/Master receipt to Foundation;
- reset overflow;
- reset Current Stat;
- fabricate source history from UI text.

Curriculum eligibility itself is derived from Current Stat + current valid activity/subject state in Alpha v1.

No redundant permanent `currentCurriculumLevel` semantic truth is required.

If Coding stores a UI convenience selection, it is presentation/input state only and must be revalidated against canonical Current Stat on load.

---

# 15. Chronicle source / provenance receipts

The Chronicle / Shinobi Record may project factual curriculum history.

At minimum, exact persisted source receipts must support truthful statements such as:

- Character attempted Expert Ninjutsu Practical;
- Character failed an Expert Genjutsu Exam after a material attempt;
- Character succeeded in Master Fūinjutsu Practical;
- Character gained a Ninjutsu Current-Stat breakthrough sourced partly/wholly from Expert curriculum development;
- Expert curriculum became ineffective at Stat 30;
- Master curriculum became ineffective at Stat 50.

The player-facing Record does not need to expose every machine field.

Observer-safe presentation must not invent:

- personal `Master` title;
- formal Rank;
- universal mastery;
- Skill ownership.

Curriculum-source history is provenance, not identity rank.

---

# 16. Source exhaustion behavior

## Foundation exhausted

At Current Stat >= 15:

- Foundation awards 0 primary Discipline Development EXP;
- show Foundation as exhausted for primary development;
- Expert is available when normal subject/activity legality passes.

Suggested safe presentation:

`FOUNDATION DEVELOPMENT COMPLETE — EXPERT CURRICULUM AVAILABLE`

## Expert exhausted

At Current Stat >= 30:

- Expert awards 0 primary Discipline Development EXP;
- preserve all overflow/history;
- Master is available when normal subject/activity legality passes.

Suggested safe presentation:

`EXPERT CURRICULUM NO LONGER EFFECTIVE — MASTER CURRICULUM AVAILABLE`

## Master exhausted

At Current Stat >= 50:

- Master awards 0 primary Discipline Development EXP;
- preserve all overflow/history;
- do not claim global maximum;
- other legitimate development sources remain valid.

Suggested safe presentation:

`MASTER CURRICULUM SOURCE EXHAUSTED — FURTHER DEVELOPMENT REQUIRES ANOTHER LEGITIMATE SOURCE`

Do not display:

`MAX STAT`

or:

`MASTERED DISCIPLINE`

merely because this curriculum source is exhausted.

---

# 17. Technique Practice coexistence

Expert / Master curriculum attendance does not grant a Skill.

The existing Technique Practice firewall remains unchanged.

A curriculum attempt may contribute Technique Practice only when an exact authorised route already exists and identifies:

- one persistent subject;
- one exact `techniquePracticeRouteId`;
- exact Skill or observer-safe hidden target;
- exact source/curriculum dependency;
- exact prerequisite result;
- exact factual practice actions that count;
- exact progress resolver;
- authorised Skill-access commit owner.

No exact route record -> no Technique Practice write.

At a curriculum ceiling, the activity may continue for Technique Practice only when:

- an exact route is active;
- the player is explicitly shown that primary Discipline Development is exhausted;
- the player explicitly selects/acknowledges Technique Practice mode.

No silent conversion.

This contract does not invent a generic Skill writer.

---

# 18. Other development sources remain first-class

Expert / Master are structured repeatable sources, not the definition of development itself.

Battle / Story / World / hotspot / mentor / route-specific occurrences may legitimately award equal or greater Discipline Development when the actual occurrence warrants it under their own authority.

A Character may therefore:

- enter Expert already above Stat 15;
- enter Master already above Stat 30;
- bypass structured curriculum history entirely and still develop through legitimate external history;
- exceed Stat 50 through later legitimate sources.

Do not require curriculum attendance retroactively.

---

# 19. Non-collapse firewall

Preserve:

- Foundation != Expert != Master source;
- same UI lane != same source;
- curriculum label != personal Mastery title;
- curriculum label != formal Rank;
- Rank != Stat-growth ownership;
- Promotion != post-15 prerequisite;
- Current Stat threshold != Skill unlock;
- source transition != Stat grant;
- source transition != PL grant;
- source transition != Skill grant;
- development ceiling != global Stat cap;
- higher curriculum != larger universal EXP award;
- Master curriculum != +3 farm;
- Exam != Promotion;
- Technique Practice != Discipline EXP;
- Technique Practice != generic Skill XP;
- current team != all owned Characters;
- activity host != semantic source;
- source exhaustion != Character exhaustion;
- UI selection != persistent semantic truth.

---

# 20. Exact Alpha machine-readable summary

```text
FOUNDATION
profile: academy_foundation_discipline_activity_v1
supported: existing registered Foundation disciplines
primary Alpha hosts: exam, practical
ceiling: 15

EXPERT NIN
profile: discipline_curriculum_nin_expert_v1
supported: nin
floor: 15
ceiling: 30
hosts: exam, practical
curriculum surcharge: 0 Ryo / 0 Energy

EXPERT GEN
profile: discipline_curriculum_gen_expert_v1
supported: gen
floor: 15
ceiling: 30
hosts: exam, practical
curriculum surcharge: 0 Ryo / 0 Energy

EXPERT FUIN
profile: discipline_curriculum_fuin_expert_v1
supported: fuin
floor: 15
ceiling: 30
hosts: exam, practical
curriculum surcharge: 0 Ryo / 0 Energy

MASTER NIN
profile: discipline_curriculum_nin_master_v1
supported: nin
floor: 30
ceiling: 50
hosts: exam, practical
curriculum surcharge: 0 Ryo / 0 Energy

MASTER GEN
profile: discipline_curriculum_gen_master_v1
supported: gen
floor: 30
ceiling: 50
hosts: exam, practical
curriculum surcharge: 0 Ryo / 0 Energy

MASTER FUIN
profile: discipline_curriculum_fuin_master_v1
supported: fuin
floor: 30
ceiling: 50
hosts: exam, practical
curriculum surcharge: 0 Ryo / 0 Energy

ORDINARY ACTION-DERIVED EXP
material committed failure: +1
effective execution: +2
exceptional execution: +3 only where separately authored
ordinary non-Battle causal cap: 3
curve: discipline_stat_curve_v1
```

---

# 21. Downstream implementation minimum

Coding / Runtime may now implement only the closed Alpha slice:

1. register the six exact Expert/Master profile IDs;
2. map them only to Ninjutsu / Genjutsu / Fūinjutsu;
3. expose them through existing Exam/Practical discipline lanes;
4. resolve effective profile from canonical Current Stat;
5. preserve Foundation below 15;
6. enable Expert from 15 through 29;
7. enable Master from 30 through 49;
8. source-exhaust at 30 / 50 without global-cap language;
9. preserve +1/+2 existing law and +3 firewall;
10. preserve existing curve, overflow, Current-Stat mutation and formula-derived PL;
11. preserve current-team single-subject preflight;
12. persist exact source/profile provenance and idempotence;
13. add no curriculum surcharge in Alpha v1;
14. keep current generic Training Grounds fail-closed for unregistered Discipline Development;
15. keep Technique Practice unwritable absent an exact route.

UI / Assets may consume the same profile labels / transition states but may not invent different thresholds or gates.

---

# 22. Closure statement

**#568 Progression design is CLOSED.**

Exact Alpha continuation:

`Foundation (<15) -> Expert (15–29; ceiling 30) -> Master (30–49; ceiling 50) -> current structured curriculum exhausted, other legitimate sources remain possible`

The continuation is reachable during Academy-stage play.

Promotion is not the sole gate.

Academy Kakashi with Ninjutsu above 15 can enter Expert Ninjutsu immediately through the same authorised Exam/Practical lane.

This means:

- **design closed**;
- **implementation not yet complete**;
- **runtime validation not yet complete**;
- **Golden/regression GREEN not claimed**.
