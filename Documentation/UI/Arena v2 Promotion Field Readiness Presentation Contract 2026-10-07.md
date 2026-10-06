# Shinobi Chronicles — Arena v2 Promotion / Field Readiness Presentation Contract

**Date:** 2026-10-07  
**Owner:** UI / Assets  
**Status:** **BINDING STEP-7 UI PRESENTATION CONTRACT — DESIGN CLOSED / GRAPHICAL PRODUCTION ASSETS NOT YET OWNER-APPROVED / CODING HANDOFF NOT YET RELEASED**  
**Source issue:** #591  
**Upstream:** CE #446; World/Rewards #577; Combat #583 / PR #588  

---

# 1. Purpose

This contract closes the player-facing **Arena → Promotion → Academy-to-Genin Field Readiness Assessment** presentation for the first Step-7 benchmark.

The benchmark is:

`academy_genin_missing_courier_dispatch_v1`

Formal mission:

> **Locate the missing field courier, recover the sealed dispatch, and return it to the examiner.**

The real World / Story mission remains the primary gameplay. Promotion UI is the safe inspection, commitment, record, result and history surface around that mission.

Canonical:

> **Promotion UI frames the assessment. It does not replace the assessment with a checklist.**

> **GRAPHICS BUILD THE INTERFACE BODY; CODE FILLS THE LIVE TRUTH SLOTS.**

---

# 2. Supersession of stale readiness wording

This document **supersedes in part** `Documentation/UI/Field Readiness Assessment Presentation Contract.md`.

The older document's fixed resolver wording:

> qualifying evidence in at least two of `information_use`, `team_coordination`, `combat_readiness`, `objective_protection`

is no longer current production authority for player-facing readiness presentation.

Current Rank authority uses one immutable assessment package that selects **exactly two secondary readiness domains** for the assessment subject. Those selected secondary domains are part of committed assessment truth and do not reroll on refresh, retry, save/load or re-entry.

The stable presentation slots are:

- `academy_genin_req_mission_comprehension`
- `academy_genin_req_judgement_under_pressure`
- `academy_genin_req_secondary_1`
- `academy_genin_req_secondary_2`

The older document remains valid for all non-conflicting boundaries, including Arena→Promotion entry, explicit commitment, Battle-return continuity, single-subject Promotion mutation, hidden-information protection and UI non-ownership of Rank adjudication.

---

# 3. Presentation architecture

The Promotion experience has six presentation states:

1. **Promotion Inspection** — safe/read-only; no attempt committed.
2. **Attempt Confirmation** — explicit deliberate commit gate.
3. **Assessment Record** — compact committed record while the real World/Journey mission is primary.
4. **Battle Interruption / Return** — shared Battle presentation with Promotion context preserved but not adjudicated by Battle.
5. **Examiner Debrief + Result** — authoritative PASS/FAIL projected only after Rank resolves.
6. **Promotion Chronicle Receipt / History** — committed facts, causes, development, rewards and newly actionable follow-up.

Opening Arena or Promotion must never create an attempt.

---

# 4. State A — Promotion Inspection

## Composition

At 1920×1080:

- left / centre: **candidate bay** containing the selected subject's full Character Card as the hero object;
- upper-right: institutional **Promotion header / target-rank band**;
- right-centre: compact **Assessment Brief dossier**;
- lower-right but safely above the physical bottom edge: primary **Begin Field Assessment** action plaque;
- subordinate History affordance only when authoritative history exists.

At 1366×768:

- preserve full-card readability;
- reduce decorative gutters and optional explanatory copy before shrinking the Character Card;
- keep mission summary and primary legal action visible without taskbar overlap.

## Live truth slots

Code supplies only authoritative values:

- assessment subject identity;
- current formal Rank;
- target Rank where authoritative;
- eligibility / availability state;
- formal mission title/brief;
- prior-attempt/history availability;
- exact legal primary action.

UI must not infer subject eligibility from portrait order, current team, Registry similarity or visual placement.

---

# 5. State B — explicit attempt confirmation

Selecting Begin Field Assessment opens an authored confirmation dossier.

The confirmation must make clear that the player is deliberately committing an assessment attempt for the selected subject.

It may state, in observer-safe language, that the assessment evaluates field readiness beyond simply completing the mission.

It must **not** reveal:

- immutable package ID;
- selected hidden secondary-domain identities unless legitimately disclosed elsewhere;
- hidden satisfaction state;
- scoring thresholds;
- pass prediction.

Actions:

- **Confirm / Begin** — runtime/Rank owner creates or commits the attempt;
- **Cancel / Return** — leaves the inspection surface with no commitment.

UI never creates the attempt merely by rendering this confirmation.

---

# 6. State C — Assessment Record during the field mission

After commitment, the real Konoha / World / Story / Journey mission becomes the primary gameplay surface.

The Promotion screen remains re-openable as a compact **Assessment Record**, not a giant persistent exam dashboard.

The record contains:

- formal mission objective;
- current observer-safe mission/Journey state;
- four stable readiness sockets;
- examiner disclosures legitimately known to the subject;
- attempt status / history pointer.

Normal Journey projection owns the current field task.

Promotion UI must not duplicate the World mission engine or invent a parallel route map.

---

# 7. Four readiness sockets — non-leaking grammar

The four sockets are stable in identity and order:

1. Mission Comprehension
2. Judgement Under Pressure
3. Secondary Readiness I
4. Secondary Readiness II

The UI supports two independent axes:

- **Knowledge:** hidden / revealed
- **Institutional satisfaction:** unsatisfied / satisfied

This yields four machine combinations, but hidden satisfaction is protected.

## Hidden state

Player-facing label:

`??????`

**Hidden + unsatisfied** and **Hidden + satisfied** MUST be presentation-indistinguishable.

They must share the same:

- text;
- colour;
- icon;
- frame;
- seal;
- glow;
- opacity;
- motion;
- hover response;
- cursor;
- focus style;
- tooltip behavior;
- accessibility name/description/state;
- DOM/data attributes exposed to player-facing inspection where applicable.

No hidden-satisfaction leak is permitted through presentation or accessibility metadata.

## Revealed + unsatisfied

Use a disclosed/neutral institutional treatment. It means the criterion is now legitimately known, **not** that the UI adjudicated failure.

## Revealed + satisfied

Use the approved restrained positive treatment. It represents authoritative disclosed satisfaction only.

Do not show:

- percentages;
- points;
- hidden scores;
- `2/4` logic;
- package IDs;
- inferred readiness from visible choices.

---

# 8. World / Journey integration

The committed assessment must physically/narratively leave the Arena/Administration entry context and proceed through the real authored mission route.

Known Journey objectives are projected through the normal Journey system, including the authored progression from examiner briefing through Konoha gate, Whisper Woods, courier/dispatch recovery, return and debrief.

Promotion UI may show only the current observer-safe objective/known state supplied by World/Journey.

Canonical:

> **Assessment Record ≠ World mission state owner.**

---

# 9. Optional Battle presentation

If the authored hostile contact enters Battle:

- use the shared Battle presentation;
- preserve the same assessment attempt/context across entry and return;
- return factual Battle result/evidence to the ongoing mission;
- do not show Promotion PASS because Battle was won;
- do not show Promotion FAIL merely because Battle was lost/withdrawn;
- do not create a second assessment instance.

The separate optional Battle-victory reward is:

> **+50 Ryō — Optional PL Battle victory**

It is a separate Battle transaction and must not be merged visually into a fake single Promotion reward.

---

# 10. Examiner debrief + result state

The player returns to the examiner through the real mission/debrief sequence.

Only after owning Rank authority resolves the assessment may UI project the official Promotion result.

## Result composition

Use a strong institutional **Result Dossier**:

- candidate Character Card remains visible;
- official result seal/body is graphical;
- PASS / FAIL text is live code-owned truth;
- disclosed rationale occupies a bounded live slot;
- the UI must never derive result from Battle outcome, mission completion alone or visible readiness sockets.

Result treatment must be visually distinct from generic Battle Victory/Setback.

On success:

- project authoritative Promotion success;
- project the subject's Academy → Genin recognition;
- expose the existing `geninRosterTransition` follow-up only when owning authority marks it actionable.

On failure:

- preserve the attempt/history;
- show only disclosed rationale;
- do not mutate Rank/PL/Stats;
- expose retry only when authoritative state allows it.

Canonical:

> **Promotion PASS ≠ roster-transition completion.**

---

# 11. Promotion Chronicle Receipt

The terminal receipt uses an authored **Promotion Receipt Folio** with live truth slots.

Render only non-empty authoritative sections equivalent to:

- YOUR DECISIONS
- TEAM / PARTICIPANT ACTIONS
- WHAT HAPPENED
- PROMOTION RESULT
- HISTORY CREATED
- DEVELOPMENT / EVIDENCE
- REWARDS
- NEWLY ACTIONABLE

The Receipt is a projection of already-committed facts. It does not grant Rank, rewards, history or progression.

## Reward cause copy

Where earned, preserve each transaction and its cause separately:

- `+150 Ryō — Sealed dispatch returned intact`
- `+100 Ryō — Courier recovered safely`
- `Field Recovery Pill ×1 — Full mission objective completed`
- `+50 Ryō — Optional PL Battle victory` only when the optional Battle occurred and was won

Do not collapse these into a single generic `Promotion Reward` line.

---

# 12. Retry / history

A failed, partial or completed attempt remains historical truth.

History presentation may display only committed observer-safe facts supplied by runtime.

UI refresh, close/reopen, save/load and retry presentation must never:

- reroll the immutable readiness package;
- rewrite the prior attempt;
- turn current state into historical state;
- erase failure;
- duplicate reward projection.

A new legal retry uses the owning authority's continuing immutable package semantics.

---

# 13. Graphical interface body

The owner law from reopened #561 is binding:

> **GRAPHICS BUILD THE INTERFACE BODY; CODE FILLS THE LIVE TRUTH SLOTS.**

`UI/arena_promotion.png` remains composition/reference lineage only. It is not semantic authority and must not simply be restored as a baked full-screen truth surface.

The finished Promotion experience requires authored graphical components.

Proposed stable production paths:

- `UI/components/promotion/promotion_header_frame.svg`
- `UI/components/promotion/promotion_candidate_bay.svg`
- `UI/components/promotion/promotion_assessment_dossier.svg`
- `UI/components/promotion/promotion_readiness_slot_hidden.svg`
- `UI/components/promotion/promotion_readiness_slot_revealed.svg`
- `UI/components/promotion/promotion_attempt_action_plaque.svg`
- `UI/components/promotion/promotion_record_folio.svg`
- `UI/components/promotion/promotion_result_dossier.svg`
- `UI/components/promotion/promotion_result_seal_pass.svg`
- `UI/components/promotion/promotion_result_seal_fail.svg`
- `UI/components/promotion/promotion_receipt_folio.svg`
- `UI/components/promotion/promotion_history_tab.svg`
- `UI/components/promotion/promotion_reward_line_frame.svg`
- `UI/components/promotion/promotion_transition_plaque.svg`

PNG may supplement SVG where material texture/detail requires raster artwork.

No production graphic may permanently bake:

- player name;
- candidate identity;
- current Rank;
- mission state;
- readiness state;
- rewards;
- result;
- retry state;
- team membership;
- Journey text.

Those are live truth slots.

Graphical acceptance test:

> **If all live text/data is hidden, the remaining authored layers must still unmistakably look like a finished Shinobi Chronicles Promotion / field-assessment interface.**

---

# 14. Responsive and safe-area contract

## 1920×1080

- candidate Character Card remains visually dominant;
- assessment dossier/record occupies the secondary field;
- four readiness sockets remain legible as a coherent institutional strip/group;
- primary legal action remains safely above the physical bottom edge;
- Receipt may use a centred folio with side history/result context.

## 1366×768

Reduce in this order:

1. decorative outer gutters;
2. optional explanatory copy;
3. secondary ornament;
4. non-critical history preview.

Do not sacrifice:

- candidate identity/card legibility;
- four readiness sockets;
- known mission objective;
- current result when resolved;
- primary legal action;
- critical reward/result Receipt lines.

Critical controls may not rely on the physical bottom edge because browser/taskbar clipping is an owner-tested constraint.

---

# 15. Semantic firewall

Preserve all of the following:

- Promotion availability ≠ attempt commit;
- attempt commit ≠ mission success;
- mission completion ≠ Promotion automatically;
- Battle victory ≠ Promotion;
- Battle defeat ≠ automatic mission failure;
- hidden satisfaction ≠ player Knowledge;
- teammate participation ≠ teammate Promotion;
- candidate identity ≠ team identity;
- Receipt projection ≠ reward grant;
- result presentation ≠ Rank authority;
- PASS ≠ roster-transition completion;
- UI refresh/save-load ≠ reroll/recommit;
- graphics body ≠ semantic owner;
- world mission ≠ checklist UI.

---

# 16. Production closure gate

**Design is closed by this contract.**

#591 is **not yet implementation-ready** until the graphical-body layer required by #561 is produced, owner-reviewed and committed.

Before a consolidated Coding / Runtime Step-7 handoff is released, UI / Assets must have:

1. owner-approved graphical Promotion direction;
2. decomposed production assets, not one giant generated screenshot;
3. committed exact asset paths;
4. 1920×1080 proof;
5. 1366×768 proof;
6. no-text/no-data proof;
7. live-slot map;
8. hidden-state non-leak proof;
9. exact result/Receipt graphical body;
10. durable asset-consumption authority.

No image generation is authorised by this document itself. Project image generation still requires Stephen's exact phrase `generate now` in the active request.

Until those graphical assets are approved and committed:

> **UI design contract = CLOSED**  
> **graphical production = WAITING ON OWNER GENERATION/APPROVAL LOOP**  
> **Coding handoff = HOLD**
