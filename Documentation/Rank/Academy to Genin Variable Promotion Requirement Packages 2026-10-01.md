# Shinobi Chronicles — Academy -> Genin Variable Promotion Requirement Packages

**Date:** 2026-10-01  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING RANK AUTHORITY — ISSUE #445 CLOSURE**  
**Assessment family:** `academy_to_genin_field_readiness_assessment`  
**Upstream CE direction:** `Documentation/Coordination/Academy_to_Genin_CE_World_Promotion_Assessment_Phase_2_Direction_2026-10-01.md`  
**Difficulty boundary:** `Documentation/Rank/Promotion Difficulty Boundary Academy to Genin Exception 2026-09-11.md`

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

## 3. Package selection and scenario compatibility

Package selection occurs only at a legitimate committed assessment-lineage boundary.

The authoritative state must include:

- `promotionRequirementLineageId`;
- `promotionRequirementPackageId`;
- `promotionRequirementPackageVersion`;
- `assessmentSubjectOwnedCharacterId`;
- `assessmentScenarioId`;
- package/scenario compatibility provenance;
- selection/commit provenance.

Selection may be randomised only among packages that are prevalidated as compatible with the committed Academy assessment scenario and current institutional rules.

Randomness chooses only among already-valid packages. Randomness does not decide whether an impossible requirement becomes valid.

The selection method/seed implementation belongs to CE/Coding, but after the package ID is committed it is persistent authority.

UI reopen, save/load, browser refresh, rerender, retry button inspection or Records inspection must never reroll it.

## 4. Retry, alternate scenario and supersession

The committed package belongs to the **Promotion requirement lineage**, not to one screen visit and not to one Battle.

It persists across:

- retry of the same assessment scenario;
- a new occurrence of that assessment after a resolved unsuccessful attempt;
- selection of a different authorised Academy -> Genin scenario within the same Promotion lineage.

When the player chooses a different authorised scenario, that scenario must support the already-committed package.

If a scenario does not support the current package, it is not a valid alternate for that lineage.

Changing scenario therefore does **not** grant a package reroll.

A package may be superseded only by an explicit institutional/new-lineage authority that:
- is not player-triggered rerolling;
- records the prior package/lineage historically;
- records the exact supersession reason;
- occurs only after any active attempt has resolved;
- preserves all already-committed Chronicle/evidence/history;
- passes current Rank compatibility validation.

A content/version migration may explicitly remap an obsolete package to a valid successor, but must record provenance and must not be used as save-scum reroll.

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

> **Academy -> Genin uses a persisted hidden Rank package that selects exactly two of the four existing secondary Field Readiness domains. Mission comprehension and judgement under pressure remain mandatory; the formal mission objective and safety/integrity rule remain fixed. The package is selected once from a prevalidated scenario-compatible six-package pool, persists across retries and alternate authorised scenarios, cannot be save-scummed, may remain partly or wholly hidden from the player, and may be superseded only by explicit institutional/new-lineage authority. This preserves the existing four-domain Academy difficulty while allowing different Chronicles to face different exact Promotion requirements.**
