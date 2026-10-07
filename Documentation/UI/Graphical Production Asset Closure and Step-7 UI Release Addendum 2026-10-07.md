# Shinobi Chronicles — Graphical Production Asset Closure + Step-7 UI Release Addendum

**Date:** 2026-10-07  
**Owner:** UI / Assets  
**Status:** **BINDING SUCCESSOR ADDENDUM — OWNER-APPROVED GRAPHICAL ASSETS PRESENT / UI GRAPHICAL-PRODUCTION GATE CLOSED**  
**Source issues:** #561, #590  
**Duplicate / no independent authority:** #591  
**Audited current `main`:** `d91d145aca8b4d8de34acfa2bca2aff0f0105da7`  
**Supersedes only stale asset-status / release-gate wording in:**
- `Documentation/UI/Graphical Interface Body and Live Truth Slots Production Packet 2026-10-07.md`;
- `Documentation/UI/Arena v2 Promotion Field Readiness Presentation Contract 2026-10-07.md`.

This addendum does **not** reopen Promotion, Rank, World, Combat, reward, roster-transition, Current Team, Exam, My Clan, Chronicle Dispatch or Scene Board semantics.

---

# 1. Owner-approved graphical production assets are now present

Stephen has supplied and approved the current graphical-body direction on PR #581.

The following exact files are current UI / Assets graphical production authority on the #581 branch:

| Asset | Exact blob SHA | Production role |
|---|---|---|
| `UI/arena_promotion.png` | `5f984efe70c76cc139bba399f10799de617b3236` | **ACTIVE GRAPHICAL BODY MASTER — Step-7 Promotion / Field Readiness** |
| `UI/exams.png` | `ba2576dac80aff7879879c38a05a2b4f7aaa6f37` | **ACTIVE GRAPHICAL BODY MASTER — Shinobi Examinations** |
| `UI/hokage_office.png` | `1a2abc4a7e06a60d92951051b87262f9e3836915` | **ACTIVE GRAPHICAL BODY MASTER — Hokage Office / Chronicle Dispatch** |
| `UI/my_clan.png` | `3f944538ae1de4252dc8d055caaed0ba7d62ba62` | **ACTIVE GRAPHICAL BODY MASTER — My Clan adaptive surface** |
| `UI/ui_components.png` | `038bddbfbc43a85409ca8881f1a697d44d742546` | **ACTIVE COMPONENT ATLAS / AUTHORED GRAPHICAL LIBRARY** |

These are graphical presentation authority, **not semantic state owners**.

Canonical law remains:

> **GRAPHICS BUILD THE INTERFACE BODY; CODE FILLS THE LIVE TRUTH SLOTS.**

> **Componentized does not mean code-only.**

---

# 2. Step-7 Promotion — smallest remaining graphical-production question CLOSED

For Alpha Step 7, **no additional generated image or pre-Coding export of fourteen individual SVG/PNG component files is required**.

The approved combination of:

- `UI/arena_promotion.png` as the authored Promotion graphical-body master; and
- `UI/ui_components.png` as the approved reusable component atlas / shell library

is sufficient durable UI / Assets authority for Coding to implement the six already-closed Promotion presentation states.

The proposed individual paths previously listed in the Promotion presentation contract remain useful **optional extraction targets / future component-file refinements**, but they are **not a Step-7 release gate**.

Coding may consume the approved master and component atlas through crop/slice/mask/background-position/transparent-layer assembly or equivalent bounded implementation technique. That implementation may use CSS for placement, scaling, masking, accessibility and motion, but must not replace the approved graphical body with generic CSS rectangles.

If implementation proves that one exact neutral graphical piece genuinely cannot be isolated or reused from the approved masters without baking mutable truth, Coding must fail closed and return **one exact asset requirement** to UI / Assets. It must not silently downgrade the surface to programmer panels.

---

# 3. Promotion live-slot map — binding implementation boundary

The graphical body may permanently contain only fixed/non-semantic authored art, ornament and fixed franchise/institutional decoration that does not assert mutable runtime truth.

Coding / owning runtime authority must keep these values live:

- assessment subject identity / Character Card;
- current formal Rank and target Rank;
- eligibility / availability;
- mission title, briefing, objective and observer-safe Journey state;
- attempt-commit state;
- four readiness-slot labels/state/disclosure;
- examiner disclosures;
- optional Battle factual return state;
- PASS / FAIL / abort / withdrawal result truth;
- disclosed rationale;
- reward lines and exact causes;
- Chronicle Receipt sections;
- retry/history state;
- `geninRosterTransition` actionability;
- all buttons, callbacks and legal/disabled state.

The graphical master / atlas must never be read as authority for those values.

## Hidden readiness non-leak remains absolute

`hidden + unsatisfied` and `hidden + satisfied` must remain presentation- and accessibility-indistinguishable.

No crop, component, tint, icon, seal, animation, DOM attribute, tooltip, focus state or accessibility metadata may leak hidden satisfaction.

---

# 4. Step-7 responsive proof moves downstream to runtime validation

UI / Assets has closed the graphical production authority needed to begin implementation.

The following remain mandatory **Coding / Runtime proof**, not pre-implementation asset blockers:

- 1920×1080 Promotion inspection / commit / record / result / Receipt proof;
- 1366×768 proof with the primary legal action safely above browser/taskbar danger space;
- no-text/no-data inspection proving the authored graphical body remains recognisable;
- exact hidden-state non-leak proof;
- Battle → same assessment context return;
- observer-safe World/Journey projection;
- exact reward-cause separation;
- refresh/save-load/retry idempotence;
- Stephen owner-browser verdict before Golden.

Therefore:

> **UI design contract = CLOSED**  
> **UI graphical production authority = CLOSED**  
> **Coding / Runtime Step-7 handoff = READY FOR CE CONSOLIDATION**  
> **implementation = NOT YET CLAIMED**  
> **runtime validation = NOT YET CLAIMED**  
> **Golden = NOT CLAIMED**

---

# 5. #561 first-hour graphical-body correction — asset gate reconciled

The old #561 production packet correctly rejected a CSS-only final presentation, but its `NEW GRAPHICAL ASSET REQUIRED` / `WAITING ON IMAGE LOCK` wording predates Stephen's approved asset sync and is now stale for the covered surfaces.

## Hokage Office / Chronicle Dispatch

Current graphical body authority:
- `UI/hokage_office.png`;
- `UI/ui_components.png`;
- existing truthful environment assets where runtime state permits them.

Live code continues to own mission/backlog text, selected dispatch, objective, team/readiness state, status, actions, counts and all callbacks.

No new image generation is required before #575 section A may resume after this package is durable.

## Shinobi Examinations

Current graphical body authority:
- `UI/exams.png`;
- `UI/ui_components.png`.

The approved graphical master replaces/restores the authored Exams body. The Notice ribbon / expanded notice / Result Dossier may be assembled from the approved graphical library without waiting for separate pre-exported files.

Live code continues to own selected shinobi, discipline/curriculum truth, notice text/state, result/reward/development/provenance and Begin action legality.

Practical remains the visual regression control.

No new image generation is required before #575 section B may resume after this package is durable.

## My Clan

Current graphical body authority:
- `UI/my_clan.png`;
- `UI/ui_components.png`;
- adaptive live My Clan renderer and current My Clan structural contracts.

Live code continues to own roster membership, formation, Character Cards, selected shinobi, filters, dirty/save/reset state, Stats/Techniques/Conditions/Profile data, Loadout summary/route and caller-return state.

No new image generation is required before #575 section D may resume after this package is durable.

---

# 6. My Clan historical reference assets are retained — deletion is NOT part of the new direction

The existing files:

- `UI/my_clan_browse.png` — current-main blob `dd35054cfe00ab312476fd1ba8010584108aa0db`;
- `UI/my_clan_inspection.png` — current-main blob `0811271e6437bfc91235b20dd9149086caebabf7`

remain **REFERENCE / COMPOSITION MASTERS / genealogy**.

They must not be used as literal live runtime backgrounds, but they also must not be deleted merely because the new `UI/my_clan.png` graphical body exists.

This addendum therefore explicitly preserves both historical files while the current adaptive My Clan implementation migrates to the approved new graphical body.

Reference retention != active runtime consumption.

---

# 7. Supersession map

This addendum supersedes only the following stale statements wherever they appear in the two predecessor UI documents:

1. `UI/arena_promotion.png` is only a non-production reference.
   - **SUPERSEDED:** it is now the owner-approved Step-7 graphical-body master, while semantics remain live/code-owned.

2. Step 7 is waiting for owner generation/approval of Promotion graphics.
   - **SUPERSEDED:** owner-approved Promotion graphics are now present on #581.

3. Fourteen separately exported Promotion component files must exist before Coding begins.
   - **SUPERSEDED:** the approved `arena_promotion.png` + `ui_components.png` package is sufficient; individual files are optional extraction/refinement targets unless Coding returns one exact missing-piece blocker.

4. Hokage Office / Exams Notice+Result / My Clan graphical bodies are still waiting for new image generation.
   - **SUPERSEDED:** approved graphical masters/component atlas are present; #575 A/B/D may resume after this authority is durable.

5. `#591` is the live Step-7 UI source issue.
   - **SUPERSEDED:** #590 is the sole authoritative current Step-7 UI handoff; #591 is duplicate/no independent authority.

All semantic, observer-safety, responsive, non-collapse, result, reward-cause and owner-browser acceptance rules in the predecessor documents remain binding unless explicitly superseded above.

---

# 8. No image generation in this closure

This closure uses only Stephen-approved graphical assets already synced to PR #581.

No new image has been generated by this addendum.

---

# 9. Final production lock

> **The approved master/atlas package is sufficient to begin live implementation. “Componentized” means authored graphical body assembled around live truth — not mandatory pre-export of every visible fragment before Coding can start.**

> **Static art never owns candidate, Rank, World, Journey, readiness, result, reward, roster, team or action truth.**

> **#590 graphical-production closure removes the UI asset blocker; it does not claim implementation, runtime validation or Golden.**
