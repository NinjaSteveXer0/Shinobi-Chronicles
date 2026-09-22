# Shinobi Chronicles — Academy Kakashi Contextual Special Jōnin Evidence Significance Mapping

**Date:** 2026-09-23  
**Owner:** Progression / Development  
**Status:** **BINDING ALPHA PROGRESSION AUTHORITY — KAKASHI V2 CONTEXTUAL EVIDENCE VALUES CLOSED**  
**Source:** GitHub #321  
**Downstream producer implementation:** #23 / Coding queue #322

## 1. Purpose

This contract closes the Progression-owned significance, tag-combination, causal-root and capstone fields requested for executable Academy Kakashi V2 contextual Special Jōnin evidence.

It consumes without reopening:

- `Documentation/Coordination/Academy_Kakashi_V2_Two_Outcome_Disposition_Reward_Evidence_and_Restraint_Reconciliation_2026-09-23.md`;
- `Documentation/Progression/Special Jonin Contextual Evidence Producer Projection Contract.md`;
- `Documentation/Rank/Special Jonin Contextual Development Evidence Contract.md`;
- current Academy Kakashi V2 Story disposition authority.

This is not a Kakashi-only progression system. It is an exact content mapping into the existing 11-family / 33-path evidence architecture.

Preserve:

**evidence != XP**  
**evidence != qualification**  
**qualification != Recognition != Rank**  
**Story choice != committed specialist work**  
**Battle victory != specialist evidence**  
**same causal root != independent-source breadth**  
**partial failure != zero evidence automatically**  
**KILLED != Assassin evidence automatically**  
**RESTRAINED != Extraction evidence automatically**

---

## 2. Global Kakashi V2 evidence envelope

Every evidence projection under this contract requires:

- exact subject: `academy_kakashi`;
- stable committed `sourceOccurrenceId`;
- preserved parent / causal-root occurrence identity;
- exact current Alpha `qualificationId`;
- only exact namespaced competency tags factually demonstrated;
- existing evaluator-recognised evidence category semantics;
- commit-time capability snapshot where required by the reusable producer contract;
- retry / save-load / replay idempotence;
- no Base Stat, PL, formal Rank, ownership or Skill-access mutation.

### 2.1 Consolidation rule

One continuous Kakashi Origin causal task projects **one consolidated qualification evidence record per exact qualification path**, even when:

- several child actions occur;
- several exact targets are involved;
- several competency tags are demonstrated.

Participant / target children remain provenance/context, but they do not mint additional distinct evidence records or independent sources.

A later factual stage inside the same causal root may **upgrade** the existing consolidated record to the higher authorised significance and/or add another supported competency tag. It must not add a duplicate record merely because the route advanced.

### 2.2 Significance scale used here

- **1 — limited / partial demonstrated specialist work**
- **2 — clear competent contextual execution**
- **3 — unusually strong multi-stage or multi-target execution within this authored Origin**
- **4 — not authorised by any current Academy Kakashi V2 producer**

Significance is not derived from Ryō, enemy count by itself, Battle difficulty, kill count, UI wording or desired qualification progress.

### 2.3 specialistLevel / capstone

For **every mapping in this Academy Kakashi V2 contract**:

- `specialistLevel = false`;
- no qualification `:capstone` tag is emitted.

The current Origin does not explicitly author any of these occurrences as a verified Special Jōnin specialist-level capstone.

Even a significance-3 occurrence is therefore **not** a capstone and cannot satisfy the existing capstone requirement by itself.

---

## 3. Route intercept / Sakura cutoff

### Exact path

`reconnaissance.tracker_nin`

Exact tag:

`reconnaissance.tracker_nin:route_intercept_execution`

### Predicate

Project only when committed facts establish that Kakashi:

1. legitimately predicts the authored route / cutoff from information available to him; and
2. actually executes the Sakura cutoff / intercept.

Simply reaching Sakura, following a visible participant, receiving a route from UI, or entering the resulting Battle does not qualify.

### Significance

| Factual result | Evidence |
|---|---|
| prediction or movement attempt does not produce an actual authored intercept | **no `route_intercept_execution` evidence** |
| Kakashi legitimately predicts and executes the authored cutoff / intercept | **significance 2** |

The later 2v1 Battle result does not raise or erase this evidence.

No current Kakashi route-intercept occurrence is significance 3 or 4.

---

## 4. Information extraction

### Exact path

`intelligence.interrogator`

Exact tags:

- `intelligence.interrogator:information_extraction`
- `intelligence.interrogator:credibility_assessment`

A question, threatening line, volunteered information, or player/world omniscience is not evidence.

### 4.1 Information extraction

| Factual result | Evidence |
|---|---|
| Kakashi materially performs interrogation work but obtains no attributable relevant information | **no `information_extraction` tag** |
| attributable interrogation work obtains relevant but limited / incomplete information | `information_extraction` — **significance 1** |
| attributable interrogation work obtains materially useful new information | `information_extraction` — **significance 2** |

The World `actionable intelligence` reward predicate may support the factual usefulness of the result, but Ryō eligibility itself is not what creates the evidence.

### 4.2 Credibility assessment

| Factual result | Evidence |
|---|---|
| Kakashi asks questions but performs no factual reliability / contradiction analysis | **no `credibility_assessment` tag** |
| Kakashi performs a legitimate but preliminary reliability / contradiction assessment that materially informs the interaction | `credibility_assessment` — **significance 1** |
| Kakashi materially establishes or resolves a relevant reliability / contradiction judgement from legitimate evidence | `credibility_assessment` — **significance 2** |

### 4.3 Both competencies in one interrogation

When one committed interrogation genuinely demonstrates both competencies:

- use **one** `intelligence.interrogator` evidence record;
- include both exact tags;
- significance is the **highest authorised significance actually demonstrated**, not the sum of the two tag values;
- independent-source count remains one.

No current Academy Kakashi interrogation mapping reaches significance 3 or 4.

---

## 5. Restrain / extraction

### Exact path

`covert_operations.extraction_specialist`

Exact tags:

- `covert_operations.extraction_specialist:extraction_planning`
- `covert_operations.extraction_specialist:subject_recovery`

Field restraint by itself is not subject recovery. Institutional delivery by itself is not proof that Kakashi planned the extraction.

### 5.1 Extraction planning

Project `extraction_planning` only when the factual route shows a real tactical extraction plan, such as restraining an exact target while preserving the authorised continuation and a later collection / recovery intention.

| Factual result | Evidence |
|---|---|
| RESTRAIN chosen, but no genuine tactical extraction plan is demonstrated | **no `extraction_planning` evidence** |
| Kakashi materially executes a genuine restrain-and-continue extraction plan but the target escapes before restraint / recovery completes | `extraction_planning` — **significance 1** |
| Kakashi successfully restrains the exact target under a genuine plan that preserves later continuation / collection | `extraction_planning` — **significance 2** |

A later Battle loss or another participant escaping does not erase already-demonstrated planning.

### 5.2 Subject recovery

Project `subject_recovery` only when Kakashi actually returns to / collects / escorts / transfers an exact living restrained subject as part of the extraction trajectory.

| Factual result | Evidence |
|---|---|
| target merely remains RESTRAINED at the field location | **no `subject_recovery` evidence yet** |
| Kakashi returns to and materially collects / begins recovery of an exact restrained subject, but the full transfer trajectory is not yet completed | `subject_recovery` — **significance 1** |
| Kakashi successfully recovers and delivers one or two exact living restrained subjects through the authored transfer trajectory | `subject_recovery` — **significance 2** |
| Kakashi completes the authored all-three trajectory: MI RESTRAINED -> PS RESTRAINED -> AMT RESTRAINED -> exact collection -> exact ANBU or Uchiha Police delivery | `subject_recovery` — **significance 3** |

### 5.3 Combined all-three extraction

The complete all-three restrain -> collect -> deliver trajectory may support:

- `extraction_planning`;
- `subject_recovery`;

on **one consolidated `covert_operations.extraction_specialist` evidence record** at **significance 3**.

It remains:

- one distinct evidence record for this qualification path;
- one independent source;
- one causal Origin source;
- `specialistLevel=false`;
- **not a capstone**.

If the record was first committed at significance 1 or 2 earlier in the same causal trajectory, later completion upgrades that same record to significance 3 idempotently.

---

## 6. Kill / Assassination

### Exact path

`covert_operations.assassin`

Exact tags:

- `covert_operations.assassin:target_isolation`
- `covert_operations.assassin:covert_execution`

### 6.1 Hard no-inference rule

None of the following creates Assassin evidence by itself:

- selecting KILL;
- Battle victory;
- a defeated target being available for disposition;
- `KILLED`;
- number of kills;
- a group KILL THEM button;
- a lethal animation;
- Kinjutsu / Bukijutsu / Taijutsu discipline use.

The producer requires committed method facts showing the exact Assassin competency.

### 6.2 Target isolation

Project `target_isolation` only when Kakashi's attributable lethal method genuinely creates or exploits controlled target isolation as part of the assassination work.

| Factual result | Evidence |
|---|---|
| no exact isolation method fact | **no `target_isolation` evidence** |
| a genuine isolation attempt materially commits but does not establish a controlled lethal opportunity | `target_isolation` — **significance 1** |
| Kakashi genuinely establishes / exploits target isolation as part of the committed lethal trajectory | `target_isolation` — **significance 2** |

A later ESCAPED outcome does not erase target-isolation work already factually demonstrated.

### 6.3 Covert execution

Project `covert_execution` only when the resolver / authoritative action facts prove a covert-lethal method, not merely lethal intent.

| Factual result | Evidence |
|---|---|
| KILL intent exists but no qualifying covert-execution method materially commits | **no `covert_execution` evidence** |
| qualifying covert-lethal execution materially commits, but the target escapes | `covert_execution` — **significance 1** |
| qualifying covert-lethal execution materially commits and the exact target is KILLED | `covert_execution` — **significance 2** |

Thus:

**KILL -> ESCAPED may produce significance-1 Assassin evidence only when the method fact itself qualifies.**  
**KILL -> KILLED may produce significance-2 execution evidence only when the method fact itself qualifies.**

The disposition result never manufactures the method predicate.

### 6.4 Both Assassin competencies

If one causal lethal occurrence genuinely demonstrates both target isolation and covert execution:

- use one consolidated `covert_operations.assassin` record;
- include both exact tags;
- significance is the highest exact value authorised by the factual work;
- do not sum tag values.

### 6.5 Group KILL THEM

Group KILL THEM is one causal parent occurrence with participant-level result children.

It must project at most **one consolidated Assassin evidence record** for the causal parent.

Participant child outcomes remain exact target provenance inside that record.

Rules:

- three target children do not become three evidence records;
- three target children do not become three independent sources;
- kill count alone does not raise significance;
- mixed KILLED / ESCAPED results may preserve partial work for qualifying method facts;
- target-isolation tags remain participant-fact-sensitive and are not inferred from group size.

A controlled multi-target covert-lethal sequence may reach **significance 3** only when the authoritative resolver/action facts separately establish that Kakashi performed a genuinely coordinated multi-target covert execution, and at least two exact target children satisfy successful qualifying `covert_execution` facts.

Merely resolving two or three participants as KILLED is insufficient.

No current group route reaches significance 4.

### 6.6 Group significance summary

| Qualifying group facts | Consolidated Assassin significance |
|---|---:|
| only material qualifying covert attempts, with no successful qualifying execution | **1** |
| at least one successful qualifying covert execution, but no separately established coordinated multi-target execution | **2** |
| separately established coordinated multi-target covert execution with >=2 successful qualifying target executions | **3** |
| any state lacking the required Assassin method facts | **no Assassin evidence** |

All group variants remain `specialistLevel=false` and non-capstone.

---

## 7. Significance-4 boundary

No Academy Kakashi V2 producer covered by #321 authorises significance 4.

Coding must not promote a record to 4 from:

- all-three completion alone;
- all-three kills alone;
- perfect Battle record;
- low turn count;
- high Ryō;
- exceptional equipment eligibility;
- UI route rarity;
- Academy Kakashi's canon reputation.

A future significance-4 or capstone occurrence requires separate explicit Progression/content authority.

---

## 8. Idempotent evidence evolution

Where one causal route develops through several factual stages, use deterministic upsert/merge semantics for the same subject + qualification + causal-root evidence identity.

Examples:

- extraction planning significance 1 -> successful restraint significance 2 -> all-three delivery significance 3;
- Assassin qualifying attempt significance 1 -> qualifying successful execution significance 2;
- interrogation record gains `credibility_assessment` after earlier `information_extraction` in the same causal interaction.

The later stage updates:

- supported tag set;
- significance to the highest authorised committed value;
- target/context provenance;

without creating a duplicate historical source.

Save/load, replay and retry must reproduce the same consolidated record.

---

## 9. Exact Coding table

| Kakashi producer | Qualification | Supported tag(s) | Significance | Capstone |
|---|---|---|---:|---|
| authored Sakura route cutoff successfully predicted + executed | `reconnaissance.tracker_nin` | `route_intercept_execution` | **2** | no |
| relevant but limited attributable interrogation extraction | `intelligence.interrogator` | `information_extraction` | **1** | no |
| materially useful attributable interrogation extraction | `intelligence.interrogator` | `information_extraction` | **2** | no |
| preliminary legitimate reliability / contradiction assessment | `intelligence.interrogator` | `credibility_assessment` | **1** | no |
| materially resolved reliability / contradiction assessment | `intelligence.interrogator` | `credibility_assessment` | **2** | no |
| genuine extraction plan commits but restraint / recovery fails | `covert_operations.extraction_specialist` | `extraction_planning` | **1** | no |
| successful planned restraint preserving later collection | `covert_operations.extraction_specialist` | `extraction_planning` | **2** | no |
| partial subject collection / recovery begins | `covert_operations.extraction_specialist` | `subject_recovery` | **1** | no |
| 1–2 exact living restrained subjects recovered + delivered | `covert_operations.extraction_specialist` | `subject_recovery` | **2** | no |
| all-three restrain -> collect -> deliver | `covert_operations.extraction_specialist` | `extraction_planning` + `subject_recovery` | **3** | no |
| qualifying target-isolation attempt | `covert_operations.assassin` | `target_isolation` | **1** | no |
| qualifying target isolation established / exploited | `covert_operations.assassin` | `target_isolation` | **2** | no |
| qualifying covert execution attempt -> target ESCAPED | `covert_operations.assassin` | `covert_execution` | **1** | no |
| qualifying covert execution -> target KILLED | `covert_operations.assassin` | `covert_execution` | **2** | no |
| separately verified coordinated multi-target covert execution with >=2 qualifying successful target executions | `covert_operations.assassin` | exact demonstrated Assassin tags | **3** | no |

All tags above must be persisted in the exact namespaced form required by the existing qualification factory.

---

## 10. Regression requirements

Coding / #23 producer integration must prove at minimum:

1. route-intercept success gives Tracker `route_intercept_execution` significance 2 once;
2. entering the resulting Battle does not independently award Tracker evidence;
3. interrogation without attributable extraction gives no `information_extraction`;
4. limited extraction can give significance 1;
5. useful extraction gives significance 2;
6. credibility assessment appears only from factual reliability / contradiction work;
7. both Interrogator tags in one causal interaction remain one record / one independent source;
8. RESTRAINED alone does not create `subject_recovery`;
9. attempted genuine extraction planning may retain significance 1 after escape;
10. successful planned restraint may reach extraction-planning significance 2;
11. later collection/delivery upgrades the same causal record rather than duplicating it;
12. all-three restrain -> collect -> deliver produces both Extraction tags at significance 3, one source, no capstone;
13. KILL button alone produces no Assassin evidence;
14. KILLED alone produces no Assassin evidence without qualifying method facts;
15. qualifying covert execution -> ESCAPED may retain significance 1;
16. qualifying covert execution -> KILLED may reach significance 2;
17. group KILL target children cannot inflate distinct-record or independent-source breadth;
18. group kill count alone cannot create significance 3;
19. separately verified coordinated multi-target covert execution may reach significance 3 from one consolidated source;
20. no Academy Kakashi V2 mapping emits significance 4, `specialistLevel=true` or a capstone tag;
21. save/load/retry/replay is idempotent;
22. no projection mutates Base Stats, PL, formal Rank, ownership or Skill access.

---

## 11. Final lock

> **Academy Kakashi V2 contextual Special Jōnin evidence is now exact: route intercept tops at significance 2; interrogation uses significance 1–2 by demonstrated extraction/credibility work; extraction uses significance 1–2 for partial/successful stages and significance 3 only for the complete all-three restrain/collect/deliver trajectory; Assassin evidence requires exact method facts, uses significance 1 for qualifying partial attempts, 2 for qualifying successful execution/isolation, and 3 only for separately verified coordinated multi-target covert execution. No current Kakashi V2 producer is significance 4, specialistLevel, or capstone. Same causal roots consolidate rather than counterfeit breadth.**
