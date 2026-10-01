# Shinobi Chronicles — Academy -> Genin Variable Promotion Requirement Packages

**Date:** 2026-10-01  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING RANK AUTHORITY — ISSUE #445 CLOSURE**  
**Assessment family:** `academy_to_genin_field_readiness_assessment`  
**Upstream CE direction:** `Documentation/Coordination/Academy_to_Genin_CE_World_Promotion_Assessment_Phase_2_Direction_2026-10-01.md`  
**Difficulty boundary:** `Documentation/Rank/Promotion Difficulty Boundary Academy to Genin Exception 2026-09-11.md`  
**New-Game seed amendment:** `Documentation/Rank/Academy to Genin Promotion Package New Game Seed Amendment 2026-10-01.md`

## 1. Rank decision

PL / Registry / Rank selects **Option A** from #445.

Academy -> Genin keeps the current Field Readiness institutional anchors, but the exact two supporting readiness domains required for a committed Promotion lineage are selected from a strict Rank-authored package pool.

The package does **not** add requirements on top of the former `any two of four` rule.

It replaces that variable interpretation with an exact committed pair.

A valid Academy -> Genin PASS requires all of:

1. `missionObjectiveCompleted=true`;
2. qualifying `mission_comprehension` evidence;
3. qualifying `judgement_under_pressure` evidence;
4. qualifying evidence in the **exact two secondary readiness domains named by the committed `promotionRequirementPackageId`**;
5. no authored examiner safety/integrity abort or disqualification.

Therefore every Academy package still requires exactly **four readiness domains total**:

- `mission_comprehension`;
- `judgement_under_pressure`;
- exactly two of:
  - `information_use`;
  - `team_coordination`;
  - `combat_readiness`;
  - `objective_protection`.

This preserves the current Academy difficulty floor and avoids a second additive resolver.

## 2. Closed Academy package pool

The initial Rank-authored package pool contains exactly six packages:

| promotionRequirementPackageId | Required secondary domains |
|---|---|
| `academy_genin_fr_pkg_information_team_v1` | `information_use` + `team_coordination` |
| `academy_genin_fr_pkg_information_combat_v1` | `information_use` + `combat_readiness` |
| `academy_genin_fr_pkg_information_objective_v1` | `information_use` + `objective_protection` |
| `academy_genin_fr_pkg_team_combat_v1` | `team_coordination` + `combat_readiness` |
| `academy_genin_fr_pkg_team_objective_v1` | `team_coordination` + `objective_protection` |
| `academy_genin_fr_pkg_combat_objective_v1` | `combat_readiness` + `objective_protection` |

No Academy package may currently require:
- three or four secondary readiness domains;
- a fifth/sixth readiness domain beyond the six authored Field Readiness domains;
- numeric PL/Stat floors;
- EXP/training/mission-count grind;
- Battle victory;
- a future Rank/role/title;
- post-Genin-only ownership, Skill, Bloodline, item, location or system access.

## 3. Package derivation and scenario compatibility — amended by #447

Package identity is rooted in the immutable New Game / Chronicle playthrough.

Binding semantic key:

`immutableChronicleSeed + stableCharacterId + rankTransitionId -> promotionRequirementPackageId`

For Academy -> Genin:

`rankTransitionId = academy_to_genin`

The exact hashing/PRNG implementation belongs to Coding, but the result must be deterministic over the immutable Chronicle root, stable Character identity, exact Rank transition, and Rank-authored package-pool/version authority.

The package is therefore **effectively determined from New Game**, even if runtime materialises/caches the record only when that Character/transition first needs it.

Materialisation time != semantic determination time.

The authoritative state must include or be able to deterministically recover:

- `immutableChronicleSeed` or its authoritative stable reference;
- `stableCharacterId`;
- `rankTransitionId`;
- `promotionRequirementPackageId`;
- `promotionRequirementPackageVersion`;
- `assessmentSubjectOwnedCharacterId` where an owned assessment subject exists;
- `assessmentScenarioId` for the current attempt;
- package/scenario compatibility provenance;
- derivation/materialisation provenance.

A Character acquired later in the same playthrough derives from the same immutable Chronicle seed. Acquisition time does not create a new package roll.

Every authorised scenario offered to that Character/transition must support the already-fixed package. Scenario choice does not participate in package selection and cannot reroll it.

## 4. Playthrough lock / retry / alternate scenario — amended by #447

The package belongs to the **Chronicle playthrough + stable Character + Rank transition**.

It is immutable for that playthrough.

The following do not reroll it:

- retry of the same assessment scenario;
- a new occurrence after an unsuccessful attempt;
- failure;
- withdrawal;
- selection of a different authorised Academy -> Genin scenario;
- team changes;
- assignment changes;
- requirement discovery;
- requirement satisfaction;
- examiner disclosure;
- UI reopen/rerender;
- save/load;
- browser refresh;
- Records or Promotion-screen inspection.

When the player chooses a different authorised scenario, that scenario must support the already-fixed package.

If a scenario does not support that package, it is not a valid alternate for that Character/transition in that playthrough.

A new package may arise only from:
- a genuinely new Chronicle / New Game with a new authoritative Chronicle seed; or
- a separately authorised post-completion restart/new-Chronicle mode that explicitly creates a new Chronicle root.

The earlier allowance for an ordinary in-play institutional/new-lineage package supersession is superseded for Academy -> Genin.

A content/version migration may map an obsolete package/version only for compatibility. It must preserve semantic identity where possible and must never expose a reroll path.

## 5. Reveal-state semantics

Requirement truth and player Knowledge are separate.

Each institutional requirement slot must persist at minimum:

- stable `promotionRequirementSlotId`;
- authoritative criterion/domain identity;
- `satisfied` boolean;
- `revealedToSubject` boolean;
- reveal provenance when revealed;
- satisfaction/evidence references when satisfied.

Player projection:

- `revealedToSubject=false` -> display **??????** or equivalent hidden slot;
- revealed + unsatisfied -> display the legitimate player-facing requirement label without success styling;
- revealed + satisfied -> display the legitimate label with light-green success styling or final approved equivalent.

A requirement may be satisfied while still hidden.

**satisfied != automatically known**

Valid reveal authority includes only legitimate observer-safe routes such as:
- examiner/institution disclosure;
- authored candidate discovery/briefing;
- an authorised observer-safe satisfaction disclosure;
- post-attempt debrief/rationale;
- another separately authorised Knowledge route.

Do not reveal a hidden criterion merely because the runtime evaluator internally marked it satisfied.

UI must never expose:
- hidden package ID;
- hidden domain identity;
- internal evidence weights/counts;
- pass probability;
- examiner-only diagnostics;
- undisclosed satisfaction state.

## 6. Stable requirement slots

For Academy -> Genin, the institutional requirement model contains:

- disclosed formal mission objective state;
- readiness slot `academy_genin_req_mission_comprehension`;
- readiness slot `academy_genin_req_judgement_under_pressure`;
- package secondary slot `academy_genin_req_secondary_1`;
- package secondary slot `academy_genin_req_secondary_2`;
- safety/integrity abort/disqualification state.

The two secondary slot identities resolve from the committed package.

The slot IDs remain stable even when the underlying secondary domains differ between Chronicles.

This lets UI preserve a stable four-slot readiness presentation without knowing hidden criterion identity.

## 7. Diagnostics and machine-facing contract

Diagnostics may inspect exact machine truth without projecting it to the player.

At minimum diagnostics should be able to report:

- `promotionRequirementLineageId`;
- authoritative Chronicle-seed reference;
- `stableCharacterId`;
- `rankTransitionId`;
- `promotionRequirementPackageId`;
- `promotionRequirementPackageVersion`;
- `assessmentSubjectOwnedCharacterId`;
- `assessmentScenarioId`;
- `requiredSecondaryDomains`;
- package/scenario compatibility result;
- each requirement slot's revealed/satisfied state;
- exact evidence references used by Rank;
- safety/integrity abort/disqualification state;
- final authoritative Rank result;
- supersession provenance if any.

Diagnostics are not player Knowledge.

## 8. Existing Rank boundaries preserved

This contract does not alter Academy -> Genin assessment availability.

Once authored opening prerequisites are complete, the Promotion route remains available without a difficulty-grind gate.

Preserve:

- assessment availability != Promotion success;
- Battle victory != Promotion;
- Battle defeat != automatic Promotion failure;
- mission completion != Promotion automatically;
- Rank != PL;
- Promotion != development automatically;
- Promotion grants no direct PL/Stat increase;
- team participation != team-wide Promotion;
- objective protection evidence != Escort Special Jōnin qualification automatically;
- one committed package != one fixed scenario choreography;
- hidden requirement != hidden difficulty grind gate;
- randomness among eligible packages != randomness deciding eligibility.

## 9. Scenario-authoring requirement

Every authorised Academy -> Genin scenario must declare which package IDs it supports.

A scenario may support all six or a strict subset.

For every supported package, the scenario skeleton/CE realisation must provide reasonable legitimate opportunities to produce qualifying evidence for:
- `mission_comprehension`;
- `judgement_under_pressure`;
- both package-selected secondary domains;
- the formal mission objective.

The scenario does not guarantee success.

It guarantees only that success is legitimately achievable without circular/future requirements or arbitrary grind.

A scenario must not advertise support for a package if one required domain can only be satisfied through unavailable/future content.

## 10. Later Rank transitions

Later formal Rank transitions may use broader, harder or differently structured requirement packages under separate Rank authority.

This Academy contract does **not** automatically authorise later transitions to reuse:
- exactly two secondary domains;
- these six package IDs;
- these reveal rules;
- this difficulty floor;
- this scenario compatibility model unchanged.

Later Rank contracts may legitimately require more breadth, stronger evidence, specialised domains, institutional prerequisites or difficulty-aware requirements when explicitly authored.

They still must preserve Rank/PL/Progression separation unless a separate authority says otherwise.

## 11. Supersession of the former fixed resolver wording

The former Academy Field Readiness wording:

> qualifying evidence in at least two of information_use / team_coordination / combat_readiness / objective_protection

is superseded for newly committed Phase-2 CE-driven Academy -> Genin Promotion lineages.

The replacement is:

> qualifying evidence in the exact two secondary readiness domains named by the committed `promotionRequirementPackageId`.

The mandatory mission objective, `mission_comprehension`, `judgement_under_pressure`, and safety/integrity rule remain unchanged.

Historical attempts resolved under the prior fixed resolver remain historical truth and are not retroactively rerolled.

## Final lock

> **Academy -> Genin uses a hidden Rank package that selects exactly two of the four existing secondary Field Readiness domains. Mission comprehension and judgement under pressure remain mandatory; the formal mission objective and safety/integrity rule remain fixed. Package identity is rooted in the immutable New-Game Chronicle and is stable per Character + Rank transition for that entire playthrough. Runtime may materialise it later, but retry, failure, withdrawal, alternate scenario, team changes, discovery, satisfaction, UI and save/load never reroll it. Hidden/revealed and satisfied/unsatisfied are independent states. A different package requires a genuinely new Chronicle/New Game or separately authorised post-completion new-Chronicle root.**
