# Shinobi Chronicles — Special Jōnin Contextual Evidence Producer Projection Contract

**Date:** 2026-09-07  
**Status:** **PROGRESSION / DEVELOPMENT — ALPHA PRODUCER PROJECTION AUTHORITY**  
**Source issue:** GitHub issue #20  
**Consumes:** `Documentation/Rank/Special Jonin Contextual Development Evidence Contract.md` and `Documentation/Rank/Special Jonin Alpha Production Catalogue.md`

---

## 1. Purpose

This document closes the producer-side binding from ordinary authored Story / Mission / World / Combat history into the existing Special Jōnin qualification-evidence architecture.

It does **not** create:

- Special Jōnin XP;
- a Special Jōnin-only mission type;
- a hidden Progression score;
- automatic qualification from mission completion;
- automatic Rank from qualification;
- Base Stat / Base PL mutation;
- a second specialist-path catalogue.

Canonical flow:

`authored contextual action`

→ `authoritative committed occurrence`

→ `participant-attributable factual contribution`

→ `producer projection to one exact Alpha qualification path`

→ `existing qualification evidence record`

→ `existing evaluator`

→ possible earned qualification

→ separate institutional Recognition

→ possible formal Special Jōnin Rank.

Preserve:

**Story choice ≠ committed action**  
**mission completion ≠ specialist evidence automatically**  
**factual contribution ≠ qualification automatically**  
**qualification ≠ Recognition ≠ Rank**  
**contextual evidence ≠ hidden XP**  
**PL ≠ Progression**

---

## 2. Current Alpha catalogue is the hard projection boundary

Producer projection may target only the current Alpha production catalogue:

- **11 family IDs**;
- **33 exact qualification IDs**;
- exact namespaced specialist-work / competency / supporting / capstone tags already defined by Rank authority.

A contextual action must not manufacture a missing family or path simply because its prose sounds specialist-like.

In particular, the current Alpha catalogue does **not** contain generic executable families named:

- protection;
- corpses / forensics;
- administration;
- logistics;
- guard / defence;
- anti-infiltration;
- monk / scholar / spiritual seal.

`Escort / Protective Detail` remains a legitimate specialist direction but is explicitly **POST-ALPHA / DEFERRED** from the executable Alpha qualification catalogue.

Therefore:

> **contextual specialist value ≠ Alpha Special Jōnin qualification evidence automatically.**

A protection, corpse-work, logistics, administration or defensive occurrence may still be valuable Chronicle history. It becomes Alpha Special Jōnin evidence only where the factual contribution also satisfies an exact competency from one of the 33 currently executable paths.

---

## 3. Producer projection envelope

Exact runtime field names remain Coding-owned. Semantically, every producer projection must supply or preserve the following information for the existing evidence evaluator:

- `subjectVariantId` — exact participant receiving the evidence;
- `sourceOccurrenceId` — exact committed factual occurrence;
- `qualificationId` — one exact Alpha qualification path;
- exact qualification namespaced evidence tag(s) justified by the occurrence;
- an existing evaluator-recognised evidence category;
- `significance` under the existing 1–4 normalization, determined from actual scope/contribution rather than reward value;
- activity-family provenance for the existing 50% activity-family cap;
- causal / independent-source provenance sufficient to prevent one causal event from masquerading as several independent sources;
- commit-time specialist-capability snapshot where relevant;
- `specialistLevel=true` only when the occurrence factually demonstrates specialist-level work under the existing evaluator semantics;
- exact target / beneficiary / relation / object / context where needed to explain what the subject actually did;
- capstone tag only where separately authored and verified as the exact qualification-specific capstone.

This contract does not create new evidence-category names. Producers must use the existing evaluator vocabulary already accepted by the Special Jōnin evidence architecture.

If no existing evidence category honestly describes the committed contribution, do **not** mint one inside Story/Mission content merely to award qualification progress. Record the Chronicle history normally and leave Special Jōnin projection absent.

---

## 4. Universal qualification predicate

A contextual occurrence may project Special Jōnin evidence only when all are true:

1. `sourceOccurrenceId` identifies committed Chronicle history;
2. the exact `subjectVariantId` actually contributed the qualifying work;
3. the work is attributable beyond mere presence, mission membership or team victory;
4. one exact current Alpha `qualificationId` is factually supported;
5. at least one exact namespaced tag for that qualification is factually demonstrated;
6. evidence category and activity-family provenance describe the real work rather than a desired score outcome;
7. significance is based on actual scope/consequence/difficulty/responsibility, not on rarity, reward value or UI emphasis;
8. commit-time capability is captured without later retroactive inflation;
9. no duplicate record already exists for the same factual projection;
10. any claimed independent-source breadth is causally legitimate.

Failure of any predicate means **no Special Jōnin evidence projection** from that occurrence. The underlying Chronicle occurrence still exists.

---

## 5. Persistence, dedupe and causal independence

### 5.1 Stable factual source

`sourceOccurrenceId` is mandatory.

UI option IDs, scene-node IDs, mission-completion booleans, retry counters and presentation messages are not substitutes for factual occurrence identity.

Retry/save/load must reuse the same source occurrence and must not duplicate specialist evidence.

### 5.2 Same occurrence, multiple legitimate tags

One committed occurrence may legitimately demonstrate more than one competency tag, and in rare cases more than one exact qualification path.

That does **not** make it multiple independent sources.

Example:

A shinobi analyses an enemy seal and then executes the correct containment response in one continuous committed crisis occurrence.

The same factual source may support both:

- `fuinjutsu_operations.sealing_specialist:seal_analysis`;
- `fuinjutsu_operations.sealing_specialist:seal_execution`.

It remains one source occurrence for independent-source counting unless durable causal authority establishes genuinely independent occurrences.

### 5.3 Child occurrences and shared causal roots

Separate child Action IDs inside one parent mission do not automatically create independent-source breadth.

Where child occurrences share the same causal task, target and immediate problem, producers must preserve their parent/causal ancestry so the evaluator cannot treat machine granularity as real experiential diversity.

Conversely, genuinely separate occurrences — for example two independently committed missions on different days with different causal problems — may count independently even if they exercise the same competency.

### 5.4 No category laundering

The same source occurrence must not be copied into several records with cosmetic category or activity-family labels merely to satisfy:

- minimum evidence categories;
- minimum independent sources;
- the activity-family cap;
- weighted-point thresholds.

Canonical rule:

> **record multiplicity ≠ causal independence.**

---

## 6. Commit-time capability snapshot

Specialist evidence records what the subject demonstrated **then**.

The producer must not later re-evaluate an old occurrence using the character's newer Stats, Techniques, Rank or equipment and silently upgrade its specialist value.

Preserve:

**later development ≠ retroactive evidence inflation**

**temporary encounter modifier ≠ permanent specialist capability**

**Effective-state advantage ≠ Developed-state expertise automatically**

A temporary contextual modifier may explain why the occurrence succeeded, but it must not be converted into a permanent specialist-level snapshot unless the owning capability/progression authority explicitly supports that conclusion.

Age and formal-Rank gates belong to the qualification/Recognition evaluator, not to the evidence producer. A legitimate earlier occurrence may remain historical evidence; producer code must not discard it merely because the subject was not yet eligible for formal Special Jōnin Recognition at the time.

---

# 7. Exact contextual projection matrix

The mappings below describe when common Story/Mission contexts may produce evidence for **existing Alpha paths**. They do not guarantee evidence merely because the scene has the corresponding theme.

## 7.1 Protection / rescue / escort

### Alpha projection possibilities

**A. Subject recovery / extraction**

Exact path:

`covert_operations.extraction_specialist`

Relevant exact tags:

- `extraction_planning`;
- `subject_recovery`.

Projection is legitimate only when the subject actually performs extraction planning or recovers/removes a person from a hostile or constrained situation in a way that demonstrates the path competency.

**B. Conflict de-escalation protecting people from escalation**

Exact path:

`diplomacy_and_negotiation.conflict_mediator`

Relevant exact tags:

- `conflict_analysis`;
- `mediation_execution`.

Protection by talking people down can qualify when actual mediation work occurs. Merely choosing a peaceful dialogue option is not enough.

### Explicit no-projection

- simply winning a Battle while an ally/civilian survives;
- taking damage for someone once without specialist context;
- completing a generic escort objective;
- being assigned as bodyguard;
- receiving praise for protecting someone.

Pure `Escort / Protective Detail` qualification is **not executable in Alpha** and must not be invented here.

---

## 7.2 Barrier / sealing / containment

### Primary exact path

`fuinjutsu_operations.sealing_specialist`

Exact tags:

- `seal_analysis`;
- `seal_execution`.

Examples:

- diagnose the structure/failure condition of a committed seal occurrence → `seal_analysis`;
- correctly establish, repair, suppress or close a seal/containment state → `seal_execution`;
- analyse then execute in the same crisis may produce both tags from the same source occurrence, but still only one independent source.

### Other exact paths only when their distinct facts are present

`fuinjutsu_operations.reverse_summoning_specialist`

- `reverse_summoning_analysis`;
- `reverse_summoning_execution`.

`fuinjutsu_operations.biju_expert`

- `biju_containment_analysis`;
- `biju_response_execution`.

`shinobi_engineering_and_applied_ninjutsu.fuin_toolsmith`

- `fuin_tool_design`;
- `fuin_tool_validation`.

Do not fan ordinary sealing work into all four paths.

### Explicit no-projection

- possessing a seal Technique;
- casting a seal in an unrelated duel where no path competency is demonstrated;
- being present while another participant performs the containment;
- generic chakra control described as “seal-like.”

---

## 7.3 Medical response

### Field Medic

Exact path:

`medical_operations.field_medic`

Exact tags:

- `field_triage`;
- `stabilisation_execution`.

Examples:

- accurately prioritising multiple wounded participants under field constraints → `field_triage`;
- performing a committed stabilisation that meaningfully prevents deterioration / enables safe extraction → `stabilisation_execution`.

### Toxicologist

Exact path:

`medical_operations.toxicologist`

Exact tags:

- `toxin_identification`;
- `countermeasure_application`.

A generic poison-themed encounter is not sufficient; actual toxin identification or countermeasure work must occur.

### Medical-Nin Researcher

Exact path:

`medical_operations.medical_nin_researcher`

Exact tags:

- `medical_analysis`;
- `validated_medical_research`.

A routine heal does not become research evidence.

### Explicit no-projection

- consuming a healing item;
- restoring Battle PL without medical context;
- standing near a medic;
- mission success where another actor performed treatment.

---

## 7.4 Corpses / forensics / post-event examination

There is **no current Alpha Corpses / Forensics Special Jōnin family or path**.

Therefore corpse or forensic work does not receive generic specialist evidence by theme.

It may project only when the factual work independently demonstrates an existing exact path, for example:

### Medical analysis

`medical_operations.medical_nin_researcher:medical_analysis`

Only where the subject performs legitimate medical/anatomical analysis.

### Technique analysis

`chakra_and_technique_research.counter_technique_specialist:technique_analysis`

or

`chakra_and_technique_research.technique_researcher:technique_research_analysis`

Only where physical evidence is legitimately used to analyse an actual Technique/chakra mechanism.

### Intelligence analysis

`intelligence.strategic_intelligence_analyst:multi_source_analysis`

Only where corpse/scene evidence is one legitimate source in a wider multi-source intelligence synthesis.

No “examined corpse” action by itself qualifies for any of the above.

---

## 7.5 Interrogation

Exact path:

`intelligence.interrogator`

Exact tags:

- `information_extraction`;
- `credibility_assessment`.

Examples:

- obtaining relevant information through an actual committed interrogation interaction → `information_extraction`;
- detecting contradictions / assessing reliability using legitimate evidence rather than omniscience → `credibility_assessment`.

A single conversation may support both if both facts genuinely occur, but it remains one independent source unless separate occurrences exist.

### Explicit no-projection

- asking any question;
- selecting an intimidating line;
- a target volunteering information without attributable interrogation work;
- having Genjutsu capability without using it in a relevant factual contribution;
- knowing the answer from machine/world truth before the character legitimately learns it.

---

## 7.6 Tracking / scouting / surveillance

### Tracker-nin

`reconnaissance.tracker_nin`

- `trail_analysis`;
- `route_intercept_execution`.

Legitimate examples:

- reading a real trail / environmental evidence accurately;
- predicting and executing an intercept route from that analysis.

### Sensor-nin

`reconnaissance.sensor_nin`

- `signal_discrimination`;
- `sensor_application`.

The producer must preserve observer-bounded sensory evidence. Sensing “something changed” does not grant hidden identity truth.

### Surveillance Specialist

`reconnaissance.surveillance_specialist`

- `observation_integrity`;
- `surveillance_reporting`.

Legitimate observation and accurate reporting are separate competencies where the occurrence supports them.

### Explicit no-projection

- simply reaching the target;
- map-marker Knowledge supplied by UI;
- following another character who did the tracking;
- a sensor Technique cast with no meaningful discrimination/application result.

---

## 7.7 Investigation / intelligence analysis

There is no generic `investigationXP` path.

Producer projection must select the exact competency actually demonstrated.

### Counter-Intelligence Analyst

`intelligence.counter_intelligence_analyst`

- `deception_detection`;
- `counter_intelligence_response`.

### Strategic Intelligence Analyst

`intelligence.strategic_intelligence_analyst`

- `multi_source_analysis`;
- `strategic_assessment`.

### Surveillance / Tracker / Interrogator

Use the corresponding exact Reconnaissance or Intelligence paths only where those specific facts occur.

### Communications / Cryptography

Cipher/signals investigations may target:

`communications_and_cryptography.cryptographer`

- `cipher_analysis`;
- `cipher_construction_or_break`.

or

`communications_and_cryptography.signal_interception_specialist`

- `signal_identification`;
- `signal_interception_execution`.

### Explicit no-projection

- “investigate” mission label;
- receiving a quest clue;
- reaching a highlighted evidence object;
- correct player guess unsupported by character Knowledge;
- mission completion without attributable analytical work.

---

## 7.8 Teaching / examination / administration

### Elite Instructor

`instruction_and_examination.elite_instructor`

- `instructional_diagnosis`;
- `advanced_instruction`.

Teaching only qualifies where the subject identifies a real learner/training problem and/or performs meaningful advanced instruction.

### Team Development Instructor

`instruction_and_examination.team_development_instructor`

- `team_diagnosis`;
- `team_development_execution`.

### Examination Specialist

`instruction_and_examination.examination_specialist`

- `assessment_design`;
- `assessment_adjudication`.

### Administration boundary

There is no generic Alpha Administration qualification path.

Routine paperwork, scheduling, filing or holding an institutional title does not project evidence by itself. Administrative work may qualify only where the factual action genuinely demonstrates one of the exact existing competencies above or another exact catalogue path.

### Explicit no-projection

- giving one piece of advice;
- being a teacher by title;
- a learner succeeding later without attributable instructional work;
- marking an exam where the subject did not meaningfully design/adjudicate assessment evidence.

---

## 7.9 Logistics / equipment / systems support

There is **no generic Alpha Logistics family/path**.

Routine supply movement, inventory management, carrying equipment or completing a delivery therefore does not itself project Special Jōnin evidence.

It may project where actual specialist work matches a current path, for example:

### Battlefield communications

`communications_and_cryptography.battlefield_communications_specialist`

- `communications_planning`;
- `communications_continuity`.

### Applied engineering

`shinobi_engineering_and_applied_ninjutsu.ninjutsu_engineer`

- `ninjutsu_system_design`;
- `ninjutsu_system_validation`.

### Fūin tool systems

`shinobi_engineering_and_applied_ninjutsu.fuin_toolsmith`

- `fuin_tool_design`;
- `fuin_tool_validation`.

### Extraction logistics

`covert_operations.extraction_specialist`

- `extraction_planning`;
- `subject_recovery`.

Only the specialist contribution receives evidence. “Handled logistics” is not a universal fallback tag.

---

## 7.10 Defensive coordination / anti-infiltration context

There is **no generic Alpha Guard / Defence / Anti-Infiltration qualification path**.

Defensive scenes may nevertheless generate exact current-catalogue evidence when the action demonstrates one of these competencies:

### Battlefield Communications Specialist

`communications_and_cryptography.battlefield_communications_specialist`

- `communications_planning`;
- `communications_continuity`.

Use when the subject actually establishes/maintains command or communications under disruption.

### Counter-Intelligence Analyst

`intelligence.counter_intelligence_analyst`

- `deception_detection`;
- `counter_intelligence_response`.

Use when defensive action actually detects/answers infiltration, deception or hostile information activity.

### Trap Specialist

`demolition_and_sabotage.trap_specialist`

- `trap_analysis`;
- `trap_deployment_or_disarmament`.

Use when perimeter defence includes genuine trap analysis/deployment/disarmament.

### Surveillance Specialist

`reconnaissance.surveillance_specialist`

- `observation_integrity`;
- `surveillance_reporting`.

Use when defensive observation/reporting is the factual contribution.

### Explicit no-projection

- merely Guarding;
- standing watch without meaningful specialist evidence;
- defeating an infiltrator after another system/character identifies them;
- being assigned to a defensive post;
- generic “team coordination” inferred from several characters taking turns.

---

## 7.11 Research / Technique analysis

### Counter-Technique Specialist

`chakra_and_technique_research.counter_technique_specialist`

- `technique_analysis`;
- `counter_technique_validation`.

### Technique Researcher

`chakra_and_technique_research.technique_researcher`

- `technique_research_analysis`;
- `technique_research_validation`.

### Bloodline Researcher

`chakra_and_technique_research.bloodline_researcher`

- `bloodline_evidence_analysis`;
- `bloodline_research_validation`.

Knowledge remains observer-bounded. Hidden authoritative Technique/Bloodline truth must not be projected into evidence simply because runtime knows it.

---

## 7.12 Demolition / sabotage

### Explosive-Ordnance Specialist

`demolition_and_sabotage.explosive_ordnance_specialist`

- `ordnance_assessment`;
- `ordnance_execution`.

### Trap Specialist

`demolition_and_sabotage.trap_specialist`

- `trap_analysis`;
- `trap_deployment_or_disarmament`.

### Infrastructure Saboteur

`demolition_and_sabotage.infrastructure_saboteur`

- `infrastructure_analysis`;
- `controlled_sabotage_execution`.

Battle damage to scenery is not sabotage expertise automatically. The work must be authored, controlled and attributable.

---

# 8. Failure and partial-success evidence

Success is not universally required for historical evidence.

A failed or partial contextual attempt may still project specialist evidence where:

- the specialist-relevant action actually committed;
- the subject's attributable analysis/execution can be assessed;
- the exact path/tag remains factually demonstrated despite the larger outcome;
- the producer does not mislabel failed execution as successful competency.

Examples:

- correct toxin identification followed by a failed rescue may still support `toxin_identification`, not `countermeasure_application` unless the countermeasure was actually applied meaningfully;
- correct seal analysis followed by failed containment may support `seal_analysis`, not `seal_execution`;
- valid trail analysis followed by a missed intercept may support `trail_analysis`, not `route_intercept_execution`.

Invalid/rejected pre-commit choices are not historical work and project nothing.

Preserve:

**mission failure ≠ zero evidence automatically**  
**attempt ≠ successful competency automatically**  
**committed partial work ≠ erased history**

---

# 9. Participant attribution

Evidence belongs only to the participant whose factual contribution qualifies.

For a team occurrence:

- planner may receive planning/analysis evidence;
- executor may receive execution evidence;
- medic may receive medical evidence;
- tracker may receive tracking evidence;
- communicator may receive communications evidence.

Do not copy the same competency to all teammates because the team succeeded.

A support action may generate its own exact evidence if it independently demonstrates a current catalogue competency. Support does not inherit the primary actor's tag.

---

# 10. Significance rule

The existing evaluator normalises significance to 1–4. This contract does not change that scale.

Producer significance must be derived from the factual specialist contribution, including authored factors such as:

- complexity of the problem actually handled;
- consequence/responsibility borne by the subject;
- degree of successful specialist execution genuinely established;
- novelty or difficulty where supported by source authority;
- scope of beneficiaries/target/system where relevant.

Do not derive significance from:

- Ryo/item reward magnitude;
- enemy rarity;
- card rarity;
- mission UI tier alone;
- number of dialogue clicks;
- number of Techniques cast;
- desired qualification progress.

If content authority has not authored enough information to justify a significance value, producer integration must use the established conservative/default evidence policy rather than inventing a higher value to accelerate qualification.

---

# 11. `specialistLevel` and capstone boundary

`specialistLevel=true` is **not** a reward for doing something specialist-themed.

It may be emitted only when the committed occurrence itself is verified to demonstrate specialist-level work according to the existing qualification semantics.

Likewise, a qualification-specific `:capstone` tag may be emitted only when an owning content contract explicitly authors that occurrence as the verified capstone for that exact qualification.

Ordinary contextual gameplay may accumulate meaningful evidence without being a capstone.

Preserve:

**specialist evidence ≠ specialistLevel automatically**  
**specialistLevel ≠ capstone automatically**  
**capstone ≠ qualification automatically**

---

# 12. Producer examples — complete packets semantically

These examples use semantic envelope names. Coding may map them to existing runtime field names; it must preserve the meanings.

## Example A — tracker interception

Committed facts:

- `academy_izuno` analyses trail evidence;
- predicts target route;
- successfully intercepts through that prediction;
- occurrence has stable `sourceOccurrenceId`.

Projection:

- `qualificationId = reconnaissance.tracker_nin`;
- tags may include:
  - `reconnaissance.tracker_nin:specialist_work`;
  - `reconnaissance.tracker_nin:trail_analysis`;
  - `reconnaissance.tracker_nin:route_intercept_execution`;
- one source occurrence unless source authority separately commits independent analysis/intercept occurrences;
- activity-family provenance remains the actual authored tracking/pursuit activity;
- no Speed/Agility Stat inference;
- no automatic qualification.

## Example B — emergency field treatment

Committed facts:

- subject identifies the most urgent casualty;
- performs actual stabilisation;
- beneficiary and medical context are preserved.

Projection:

- `qualificationId = medical_operations.field_medic`;
- tags may include:
  - `medical_operations.field_medic:specialist_work`;
  - `medical_operations.field_medic:field_triage`;
  - `medical_operations.field_medic:stabilisation_execution`;
- beneficiary/context retained;
- Battle PL restoration alone is not the evidence authority.

## Example C — containment seal during hazard

Committed facts:

- subject analyses unstable containment;
- performs correct sealing response;
- same crisis occurrence authorises both facts.

Projection:

- `qualificationId = fuinjutsu_operations.sealing_specialist`;
- tags:
  - `fuinjutsu_operations.sealing_specialist:specialist_work`;
  - `fuinjutsu_operations.sealing_specialist:seal_analysis`;
  - `fuinjutsu_operations.sealing_specialist:seal_execution`;
- both tags may share one source occurrence;
- they do not count as two independent sources merely because two tags exist.

## Example D — civilian protection with no exact Alpha specialist competency

Committed facts:

- subject blocks an attack and civilian survives;
- no extraction planning, mediation, communications, intelligence, trap, seal, medical or other exact Alpha competency occurred.

Projection:

- **NO Special Jōnin evidence**.

The protection remains legitimate Chronicle/protective-performance history and may support future systems, including post-Alpha Escort/Protective Detail if later authority deliberately consumes it. Alpha producer code must not force it into an unrelated qualification.

---

# 13. Implementation requirements

Coding may implement this contract as a reusable projection helper or producer adapter, but must not create a generic reward system.

Minimum behavior:

1. receive an authoritative committed occurrence / owner-domain evidence packet;
2. require exact participant attribution and `sourceOccurrenceId`;
3. evaluate only explicitly authored projection mappings;
4. target an exact current Alpha `qualificationId`;
5. emit only factually supported namespaced tags;
6. preserve existing evidence category and activity-family semantics;
7. preserve causal ancestry / independent-source semantics;
8. capture commit-time specialist capability without retroactive inflation;
9. persist idempotently through save/load/retry;
10. allow no projection when the occurrence lacks an exact catalogue match;
11. never mutate Base Stats, Base PL, formal Rank or ownership;
12. leave qualification evaluation and Recognition to existing authorities.

Do not implement a global rule such as:

`if missionTag contains "medical" then award medical evidence`.

Do not infer qualification from Technique discipline alone.

Do not infer qualification from mission category alone.

Do not infer qualification from Battle victory alone.

Projection must be authored against actual committed facts.

---

# 14. Golden / regression requirements

At minimum verify:

1. a legitimate Tracker occurrence projects exact tracker evidence;
2. a medical stabilization occurrence projects Field Medic evidence only to the actual medic;
3. a sealing analysis + execution in one occurrence can satisfy both exact competency tags but remains one independent source;
4. duplicate retry/save-load does not duplicate evidence;
5. two child actions under one causal task do not counterfeit two independent sources;
6. a Battle victory with no specialist contribution projects nothing;
7. pure civilian protection with no current 33-path competency projects no Alpha Special Jōnin evidence;
8. routine corpse examination with no exact current-path competency projects nothing;
9. routine logistics/delivery with no exact current-path competency projects nothing;
10. later character development does not retroactively raise an old evidence snapshot;
11. one teammate's specialist action does not award the whole team;
12. qualification evaluation may advance while formal Rank remains unchanged;
13. no direct PL/Stat mutation occurs;
14. no generic specialization XP ledger is created.

---

# 15. Progression verdict

**PRODUCER-SIDE CONTEXTUAL SPECIAL JŌNIN EVIDENCE PROJECTION: CLOSED FOR ALPHA.**

The producer rule is:

> **Record what actually happened first. Project Special Jōnin evidence only when that committed participant contribution genuinely demonstrates an exact current Alpha qualification competency.**

There is no fallback specialist reward for “good” behavior, mission success, Battle victory, protection, corpse work, administration, logistics or defence when no exact current Alpha path applies.

Current Rank catalogue, evaluator thresholds and Recognition semantics remain unchanged.