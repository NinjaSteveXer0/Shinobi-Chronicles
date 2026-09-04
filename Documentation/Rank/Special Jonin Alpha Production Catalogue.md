# Shinobi Chronicles — Special Jōnin Alpha Production Catalogue

**Status:** RANK / REGISTRY / PROGRESSION — ALPHA PRODUCTION LOCK  
**Date:** 2026-09-04

This document closes the Special Jōnin production-catalogue blocker for Alpha without falsifying archaeological provenance.

---

## 1. Provenance ruling

Preserve three separate truths:

- **13 families / 39 paths** = historical aggregate claim recovered from older design authority;
- **11 families / 33 paths** = exact family/path catalogue material actually recovered and name-stable;
- **2 families / 6 paths** = unrecovered archaeology gap.

For **Alpha production**, Registry/Rank deliberately adopts the exact recovered **11 families / 33 paths** as the production baseline.

This is a current production decision, not a claim that the missing historical 2/6 never existed.

The historical 13/39 aggregate remains design genealogy only until additional evidence is recovered or a later catalogue expansion is deliberately authored.

### Escort / Protective Detail

Escort / Protective Detail remains a legitimate, ratified specialist direction and is **not deleted**.

However, because its exact historical family/path position and machine-ID lineage are not recoverable, it is **POST-ALPHA / DEFERRED from the executable Alpha qualification catalogue**.

Its existing evidence doctrine remains valid:

- combat victory ≠ successful escort;
- protected principal survives ≠ automatic Escort competence;
- escort mission participation ≠ Escort qualification;
- self-performance ≠ protective performance.

Any later Escort catalogue entry must be explicitly authored with fresh provenance. It must not be inserted into one of the missing historical slots and presented as archaeological recovery.

---

## 2. Formal rank topology

The ordering `special_jonin → jonin` under `SHINOBI_DIFFICULTIES` is difficulty/presentation ordering only.

**difficulty ordering ≠ formal rank topology**

No formal-rank patch is authorised merely from that ordering.

Special Jōnin formal rank remains independently persisted and adjudicated.

---

## 3. Alpha evaluator policy — unchanged

All 33 production definitions use the existing generic evaluator and current Alpha policy:

- `requiredWeightedPoints: 12`
- `minimumDistinctEvidenceRecords: 4`
- `minimumEvidenceCategories: 2`
- `minimumIndependentSources: 2`
- `activityFamilyPointCapRatio: 0.50`
- `requiresVerifiedSpecialistCapstone: true`
- evidence significance normalised to 1–4.

The capstone is one verified `specialistLevel=true` qualifying evidence record carrying the exact qualification-specific capstone tag. It may also contribute ordinary weighted/diversity evidence if it otherwise qualifies; the evaluator does not require a separate fifth record.

No Alpha definition below uses a direct Stat/PL threshold:

`capacityRequirements: []`

This preserves:

**Stats ≠ automatic qualification**

A future exact path may add a genuine safety/capacity prerequisite only through separate Rank/PL authority.

---

## 4. Definition-record factory contract

Every Alpha path below is registered as one declarative record consumed by the existing evaluator.

For a path with `qualificationId = Q`, `familyId = F`, and the two competency tags shown in the catalogue, the authoritative record shape is:

```js
{
  qualificationId: Q,
  familyId: F,
  requiredEvidenceTags: [`${Q}:specialist_work`],
  mandatoryCompetencyGroups: [
    { groupId: `${Q}:competency_a`, anyTags: [`${Q}:<competency_a_tag>`] },
    { groupId: `${Q}:competency_b`, anyTags: [`${Q}:<competency_b_tag>`] }
  ],
  optionalSupportingTags: [`${Q}:supporting`],
  permittedEvidenceCategories: [],
  capacityRequirements: [],
  capstoneRequirement: { requiredTags: [`${Q}:capstone`] }
}
```

`permittedEvidenceCategories: []` intentionally allows the evaluator to accept any legitimate specialist-evidence category while the global policy still requires at least two distinct categories. Qualification-specific tags and competencies determine relevance; category names do not become a second ontology.

Evidence producers may set either the exact namespaced competency `groupId` or the exact namespaced tag. Unrelated qualification evidence must not satisfy another path's competency coverage merely because it uses generic words such as `analysis` or `execution`.

---

## 5. Alpha production catalogue — 11 families / 33 paths

### Family 1 — Reconnaissance

Family ID: `reconnaissance`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Tracker-nin | `reconnaissance.tracker_nin` | `trail_analysis` | `route_intercept_execution` |
| Sensor-nin | `reconnaissance.sensor_nin` | `signal_discrimination` | `sensor_application` |
| Surveillance Specialist | `reconnaissance.surveillance_specialist` | `observation_integrity` | `surveillance_reporting` |

### Family 2 — Intelligence

Family ID: `intelligence`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Interrogator | `intelligence.interrogator` | `information_extraction` | `credibility_assessment` |
| Counter-Intelligence Analyst | `intelligence.counter_intelligence_analyst` | `deception_detection` | `counter_intelligence_response` |
| Strategic Intelligence Analyst | `intelligence.strategic_intelligence_analyst` | `multi_source_analysis` | `strategic_assessment` |

### Family 3 — Covert Operations

Family ID: `covert_operations`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Assassin | `covert_operations.assassin` | `target_isolation` | `covert_execution` |
| Infiltration Specialist | `covert_operations.infiltration_specialist` | `access_planning` | `undetected_penetration` |
| Extraction Specialist | `covert_operations.extraction_specialist` | `extraction_planning` | `subject_recovery` |

### Family 4 — Medical Operations

Family ID: `medical_operations`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Field Medic | `medical_operations.field_medic` | `field_triage` | `stabilisation_execution` |
| Toxicologist | `medical_operations.toxicologist` | `toxin_identification` | `countermeasure_application` |
| Medical-Nin Researcher | `medical_operations.medical_nin_researcher` | `medical_analysis` | `validated_medical_research` |

### Family 5 — Fūinjutsu Operations

Family ID: `fuinjutsu_operations`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Sealing Specialist | `fuinjutsu_operations.sealing_specialist` | `seal_analysis` | `seal_execution` |
| Reverse-Summoning Specialist | `fuinjutsu_operations.reverse_summoning_specialist` | `reverse_summoning_analysis` | `reverse_summoning_execution` |
| Bijū Expert | `fuinjutsu_operations.biju_expert` | `biju_containment_analysis` | `biju_response_execution` |

### Family 6 — Shinobi Engineering and Applied Ninjutsu

Family ID: `shinobi_engineering_and_applied_ninjutsu`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Fūin Toolsmith | `shinobi_engineering_and_applied_ninjutsu.fuin_toolsmith` | `fuin_tool_design` | `fuin_tool_validation` |
| Summoning-Systems Specialist | `shinobi_engineering_and_applied_ninjutsu.summoning_systems_specialist` | `summoning_system_analysis` | `summoning_system_implementation` |
| Ninjutsu Engineer | `shinobi_engineering_and_applied_ninjutsu.ninjutsu_engineer` | `ninjutsu_system_design` | `ninjutsu_system_validation` |

### Family 7 — Instruction and Examination

Family ID: `instruction_and_examination`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Elite Instructor | `instruction_and_examination.elite_instructor` | `instructional_diagnosis` | `advanced_instruction` |
| Team Development Instructor | `instruction_and_examination.team_development_instructor` | `team_diagnosis` | `team_development_execution` |
| Examination Specialist | `instruction_and_examination.examination_specialist` | `assessment_design` | `assessment_adjudication` |

### Family 8 — Demolition and Sabotage

Family ID: `demolition_and_sabotage`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Explosive-Ordnance Specialist | `demolition_and_sabotage.explosive_ordnance_specialist` | `ordnance_assessment` | `ordnance_execution` |
| Trap Specialist | `demolition_and_sabotage.trap_specialist` | `trap_analysis` | `trap_deployment_or_disarmament` |
| Infrastructure Saboteur | `demolition_and_sabotage.infrastructure_saboteur` | `infrastructure_analysis` | `controlled_sabotage_execution` |

### Family 9 — Communications and Cryptography

Family ID: `communications_and_cryptography`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Cryptographer | `communications_and_cryptography.cryptographer` | `cipher_analysis` | `cipher_construction_or_break` |
| Signal-Interception Specialist | `communications_and_cryptography.signal_interception_specialist` | `signal_identification` | `signal_interception_execution` |
| Battlefield Communications Specialist | `communications_and_cryptography.battlefield_communications_specialist` | `communications_planning` | `communications_continuity` |

### Family 10 — Chakra and Technique Research

Family ID: `chakra_and_technique_research`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Bloodline Researcher | `chakra_and_technique_research.bloodline_researcher` | `bloodline_evidence_analysis` | `bloodline_research_validation` |
| Counter-Technique Specialist | `chakra_and_technique_research.counter_technique_specialist` | `technique_analysis` | `counter_technique_validation` |
| Technique Researcher | `chakra_and_technique_research.technique_researcher` | `technique_research_analysis` | `technique_research_validation` |

### Family 11 — Diplomacy and Negotiation

Family ID: `diplomacy_and_negotiation`

| Display path | qualificationId | competency A tag | competency B tag |
|---|---|---|---|
| Shinobi Envoy | `diplomacy_and_negotiation.shinobi_envoy` | `diplomatic_briefing` | `formal_negotiation` |
| Conflict Mediator | `diplomacy_and_negotiation.conflict_mediator` | `conflict_analysis` | `mediation_execution` |
| Cultural Liaison | `diplomacy_and_negotiation.cultural_liaison` | `cultural_context_analysis` | `cross_group_facilitation` |

---

## 6. Evidence-tag expansion rule

For example, `reconnaissance.tracker_nin` expands to:

```js
{
  qualificationId: "reconnaissance.tracker_nin",
  familyId: "reconnaissance",
  requiredEvidenceTags: ["reconnaissance.tracker_nin:specialist_work"],
  mandatoryCompetencyGroups: [
    {
      groupId: "reconnaissance.tracker_nin:competency_a",
      anyTags: ["reconnaissance.tracker_nin:trail_analysis"]
    },
    {
      groupId: "reconnaissance.tracker_nin:competency_b",
      anyTags: ["reconnaissance.tracker_nin:route_intercept_execution"]
    }
  ],
  optionalSupportingTags: ["reconnaissance.tracker_nin:supporting"],
  permittedEvidenceCategories: [],
  capacityRequirements: [],
  capstoneRequirement: {
    requiredTags: ["reconnaissance.tracker_nin:capstone"]
  }
}
```

Every other row expands identically using its exact qualification ID, family ID, and two competency tags above.

---

## 7. Recognition transition — qualification ≠ formal rank

Evaluator success and `earnSpecialJoninQualification(...)` establish a **permanent earned specialist qualification record only**.

It does **not** itself mutate formal rank.

A separate institutional Recognition occurrence is required to grant formal **Special Jōnin** rank.

### Alpha Recognition eligibility

Recognition may grant Special Jōnin formal rank when:

1. the exact owned character has at least one permanently earned Alpha-production qualification from this catalogue;
2. the exact character currently has formal rank `chunin`;
3. legitimate institutional authority commits a `special_jonin_recognition` occurrence referencing the earned qualification and its provenance evidence;
4. no authored institutional block prevents Recognition.

On successful Recognition:

- formal rank mutates `chunin → special_jonin`;
- the earned qualification remains a separate permanent credential;
- the Recognition occurrence references the qualification/provenance rather than duplicating it.

If the character is below Chūnin, the qualification may remain earned but does not bypass the minimum formal-rank prerequisite.

If the character is already Jōnin or above, the specialist qualification remains valid evidence/credential but does not downgrade or rewrite formal rank.

Preserve:

**qualification ≠ Recognition ≠ formal rank ≠ department ≠ appointment ≠ clearance/licence ≠ assignment ≠ active practice**

Existing authored Special Jōnin characters (`sj_ebisu`, `sj_genma`, `sj_ibiki`) retain their established rank/qualification history and are not required to replay player-facing Recognition acquisition.

---

## 8. Coding regression requirements

Coding should populate the existing `SPECIAL_JONIN_QUALIFICATION_DEFINITIONS` registry with **exactly 33 Alpha definitions** matching this document.

Required regressions:

- exactly 11 Alpha family IDs;
- exactly 33 unique qualification IDs;
- all 33 definitions pass `validateSpecialJoninQualificationDefinition`;
- the three existing IDs remain exact:
  - `instruction_and_examination.elite_instructor`
  - `instruction_and_examination.examination_specialist`
  - `intelligence.interrogator`;
- no Escort/Protective Detail qualification is exposed in Alpha;
- no missing historical 2/6 placeholders are minted;
- evidence from one qualification cannot satisfy another qualification's namespaced mandatory competency groups accidentally;
- evaluator success records qualification but does not directly mutate formal rank;
- Recognition requires a separate committed institutional occurrence;
- difficulty ordering cannot mutate formal rank;
- qualification/Recognition grants no direct PL.

---

## 9. Supersession summary

For Alpha production:

**11 families / 33 paths = CURRENT PRODUCTION CATALOGUE**

**13 families / 39 paths = HISTORICAL AGGREGATE GENEALOGY**

**missing 2 families / 6 paths = UNRECOVERED, NOT FABRICATED**

**Escort / Protective Detail = RATIFIED SPECIALIST DIRECTION, POST-ALPHA CATALOGUE EXPANSION**
