# Shinobi Chronicles — Origin Story Expression Approval Gate and Rewrite Containment

**Date:** 2026-09-13  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING COORDINATION CORRECTION — STEPHEN APPROVAL REQUIRED FOR WHOLESALE PLAYER-FACING STORY REPLACEMENT**

## 1. Why this correction exists

Stephen has explicitly clarified that his instructions about proper storytelling, cadence, body language, facial expression, natural dialogue, screen-first presentation and player presence were **quality requirements**, not blanket consent for Writing to publish wholesale replacement Origin prose as final production authority without his review.

Current GitHub archaeology shows that this distinction was not preserved strongly enough in #170.

The relevant recent Writing work is:

- `Documentation/Story/Academy_Origins_Screen_First_Player_Facing_Story_Rewrite_2026-09-13.md`
  - commit `a08dcf50f67d264497944af761475865dff8dc81`
  - rewrites the player-facing expression for **10/10 Origins**;
- `Documentation/Story/Origin_Prologue_Screen_First_Scene_Performance_Rewrite_v2_2026-09-13.md`
  - commit `c774cd1582b267fb5afbc67bc3bb8556bea71449`
  - closes a deeper v2 rewrite for **Academy Kakashi only** and leaves the other nine Origins open for equivalent work.

Coding has already consumed/projected the first-pass screen-first Origin layer into runtime through commits including:

- `7eae581bcddf00c132555cfd97ce543d23fe59bb` — `runtime: project screen-first Origin story authority`;
- later activation/QA commits such as `706e8b59f28ee379d95d3d3c150737b66005a008` and `608868e84238fd421b2f7bbae8c007164320914f`.

This does **not** mean the underlying Origin stories/semantics were destroyed.

The recent Writing packages explicitly preserved semantic IDs, branch facts, World Truth, Knowledge, Battle seams, consequence/source-occurrence bindings, PL/Progression/Acquisition/reward boundaries and the shared opening continuity.

Therefore the correct response is containment and review — **not restarting Story from the beginning**.

---

## 2. Immediate authority correction

The following status overrides any `FINAL`, `ACTIVE` or equivalent wording inside the recent replacement-expression documents where that wording implies Stephen-approved player-facing prose:

### 2.1 Ten-Origin screen-first rewrite

`a08dcf50f67d264497944af761475865dff8dc81`

Status is now:

> **CANDIDATE PLAYER-FACING EXPRESSION / REVIEW MATERIAL — NOT STEPHEN-APPROVED FINAL PROSE**

### 2.2 Kakashi v2 scene-performance rewrite

`c774cd1582b267fb5afbc67bc3bb8556bea71449`

Status is now:

> **CANDIDATE KAKASHI PLAYER-FACING EXPRESSION / REVIEW MATERIAL — NOT STEPHEN-APPROVED FINAL PROSE**

The work must be preserved. Do not delete it. It may contain good lines, choreography, body language, cadence, connective material and scene framing worth accepting later.

But it may not supersede previously accepted player-facing Story solely because Writing authored it.

---

## 3. Semantic Story authority remains intact

This correction does **not** reopen or discard closed Origin semantics.

Preserve all current exact authority for:

- production Origin IDs;
- scene/choice IDs;
- branch meanings;
- World Truth;
- observer Knowledge;
- factual custody/evidence/intelligence results;
- Battle callers/returns;
- consequence/source-occurrence IDs;
- PL / Stats boundaries;
- Progression boundaries;
- Acquisition / ownership boundaries;
- rewards;
- continuity into `YOUR CHRONICLE BEGINS`;
- Academy Team Formation/opening journey.

Canonical distinction:

> **Story/history spine remains closed; player-facing expression is under review.**

Do not solve an expression dispute by rebuilding the semantic Origin graph.

---

## 4. Approval rule going forward

Stephen remains executive/taste authority for substantial player-facing Story replacement.

Canonical rule:

> **Quality instruction != consent to wholesale replacement.**

Writing may autonomously:

- identify weak prose;
- identify mechanical/design-summary language;
- propose improved lines;
- propose body language / facial reaction / cadence / connective performance;
- prepare a complete candidate scene for efficient review;
- verify semantic invariants.

Writing may **not** automatically promote a substantial replacement package to final production prose merely because it satisfies the requested quality standard.

For Origin and comparable major Story rewrites, use this review-first sequence:

`CURRENT ACCEPTED AUTHORITY`
→ `PROPOSED EXPRESSION DIFF / CANDIDATE PACKAGE`
→ `SEMANTIC INVARIANTS CHECK`
→ `STEPHEN APPROVE / EDIT / REJECT`
→ `FINAL WRITING AUTHORITY`
→ `CODING PROJECTION`
→ `INSTALLED-BROWSER REVIEW`.

Small typo/grammar corrections that clearly do not alter voice, scene meaning, cadence or player-facing creative direction do not require individual executive review.

---

## 5. Current Origin containment state

### Academy Kakashi

- underlying semantic/factual Story package remains preserved;
- first screen-first rewrite exists as candidate material;
- deeper v2 scene-performance rewrite exists as candidate material;
- Coding projection may be used as a development preview for Stephen review;
- it is **not final player-facing authority until Stephen approves/edits it**.

### Other nine Origins

The first-pass `a08dcf...` document contains replacement expression for all nine as well as Kakashi.

However the deeper v2 issue state last explicitly recorded:

- Kakashi v2 CLOSED by Writing;
- Hinata, Wasabi, Mirai, Menma, Kushina, Kurenai, Iwabee, Metal Lee and Obito still OPEN for equivalent v2 rewrite.

Those nine must now **stop at candidate/review status**. Do not continue automatic wholesale v2 replacement until Stephen explicitly authorises that mode or approves the relevant candidate units.

### Arc 1

#170 also carried Arc 1 M1–M12 expression modernisation.

The same approval rule applies: Writing may prepare candidate improvements, but a broad scene-performance replacement pass must not silently become final production prose without Stephen review/approval.

---

## 6. Coding / Runtime containment

Coding has already projected candidate screen-first Origin prose into current runtime.

Do not blindly revert or delete that implementation. It is useful as a review surface and may contain accepted implementation machinery.

But preserve this status distinction:

- candidate expression projected in runtime = **DEVELOPMENT PREVIEW**;
- source/headless tests on candidate expression = **implementation evidence only**;
- installed-browser presentation of candidate expression = **review evidence**;
- none of the above = Stephen-approved Story prose;
- none of the above = Golden content approval.

Coding must not claim an Origin Story row Golden based on unapproved replacement prose.

If Stephen rejects or edits candidate lines, Coding should surgically replace the expression content while preserving the semantic/runtime graph.

Do not rebuild the Origin engine merely because prose changes.

---

## 7. Why this does not reset a week of work

The expensive work that must be preserved includes:

- Origin semantic structures;
- branch IDs and causal history;
- consequence contracts;
- Battle integration seams;
- environment/backdrop authority;
- opening continuity;
- team-formation handoff;
- runtime scene registration;
- save/load/idempotence machinery;
- screen-first presentation capability;
- useful candidate dialogue/choreography already authored.

Only the **approval status of the new player-facing expression** is being corrected.

The recovery strategy is therefore:

> **review, cherry-pick, edit and approve over the existing closed Story spine — do not restart Story authoring from zero.**

---

## 8. Acceptance test

An Origin is not final merely because:

- Writing marked it `FINAL`;
- Coding projected it;
- tests passed;
- it contains body language/contractions;
- it is more cinematic than the prior version.

For substantial revised player-facing Story, final acceptance requires:

1. semantic/history invariants preserved;
2. candidate prose available for review;
3. Stephen approves/edits the creative result;
4. Coding projects the approved expression;
5. installed-browser traversal proves the approved story is actually shown correctly.

Preserve:

**quality requirement != replacement consent**  
**candidate rewrite != approved prose**  
**Writing closed != Stephen approved**  
**semantic Story != expression layer**  
**expression rejection != semantic restart**  
**runtime projection != Golden approval**

---

## 9. Coordination lane

GitHub issue `#181` is the central coordination enforcement lane for this correction.

Existing #170 remains the Writing quality/modernisation lane, subject to this approval gate.

Existing #105 remains the Coding Origin/onboarding runtime/Golden lane, subject to the rule that candidate prose may not be treated as final accepted Story.

Stephen relay: NONE.
