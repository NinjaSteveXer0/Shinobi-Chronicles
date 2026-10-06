# Shinobi Chronicles — Graphical Interface Body + Live Truth Slots Production Packet

**Date:** 2026-10-07  
**Owner:** UI / Assets  
**Status:** **BINDING OWNER-CORRECTED PRODUCTION MODEL — #561 REOPENED**  
**Supersedes:** any interpretation of PR #572 / merge `c8bcc4bd30a346394bddd50c3a65326602ad73e7` that treats code/CSS rectangles as the final visual body of authored first-hour surfaces.  
**Audited main:** `627b6942d413a63e949e8d5e1089d55c09c66a52`  
**Downstream Coding issue:** #575 — sections A / B / D remain **HOLD FOR UI CORRECTION** until the graphical bodies are approved and durably committed.

---

# 1. Owner correction — canonical production law

Stephen's correction is binding:

> **GRAPHICS BUILD THE INTERFACE BODY; CODE FILLS THE LIVE TRUTH SLOTS.**

And:

> **Componentized does not mean code-only.**

The desired model is the deliberate third option between two rejected extremes:

1. **REJECTED:** one fully baked screenshot containing mutable runtime truth;
2. **REJECTED:** background + generic dark CSS divs/cards + borders + text presented as finished game UI;
3. **REQUIRED:** authored graphical environment/UI components form the visible interface body, while live code inserts mutable truth and actions into designed open slots.

For major authored first-hour surfaces, CSS is an assembly/support layer. It may position, scale, clip, animate, mask, tint for accessibility, handle responsive layout and provide resilience fallbacks. It is **not** the default source of the final authored frame language.

---

# 2. Global asset/live-slot architecture

## 2.1 Layer stack

All affected surfaces should use the same ownership model:

| Layer | Owner | Purpose |
|---|---|---|
| `z0 environment` | UI / Assets | location/subject atmosphere; raster or approved environment art |
| `z10 graphical body` | UI / Assets | authored frames, dossiers, rails, tabs, seals, dividers, textures, sockets, icon plates |
| `z20 live truth slots` | Coding / Runtime | mutable text, numbers, lists, Character Cards/portraits, state, buttons/actions |
| `z30 focus/interaction` | shared | hover/focus/selected/reveal animation; CSS may support graphical pieces |
| `z40 modal/transient` | Coding + UI shell | confirmations, expanded notices, temporary result overlays |

No graphical asset may become a second gameplay state owner.

## 2.2 The body test

A surface passes the **graphical body test** only if:

> hiding live text/data still leaves a recognisable authored Shinobi Chronicles interface body;

and:

> hiding the graphical assets leaves an obviously incomplete fallback, not something that looks like the intended final production UI.

If generic CSS boxes alone still look like the finished surface, the owner correction has not been consumed strongly enough.

## 2.3 Text and accessibility rule

Production graphical components should normally be **textless** where the text is mutable or localisation-sensitive.

Allowed in art:
- ornamental motifs;
- non-semantic texture;
- fixed franchise marks where already approved;
- decorative seals/symbols that do not assert runtime truth.

Keep live in DOM/code:
- mission names/body/objectives;
- Rank/current Hokage/player identity;
- Ryō/PL/Stats;
- notice/result wording;
- status labels;
- buttons/actions;
- curriculum names when sourced from runtime;
- roster/team/assignment state;
- counts/progress/rewards.

## 2.4 Responsive rule

Graphical components must be authored with scalable/open centres and protected edge ornament.

Prefer:
- SVG for geometric frames/ornament where practical;
- transparent PNG/WebP for painterly/tactile pieces;
- 9-slice or equivalent scalable edge treatment where the frame must stretch;
- CSS only for placement/responsive assembly, not as the substitute art.

At **1366×768**, reduce gutters and spacing before shrinking the primary subject/card/mission dossier. Keep all primary actions above the browser/taskbar danger zone.

At **1920×1080**, allow more environment and breathing room without enlarging chrome into a dashboard.

---

# 3. Hokage Office / Chronicle Dispatch — corrected graphical body

## 3.1 Existing reusable authority

Current repository already contains legitimate environment masters:

- `Scene backdrops/hokage_administration_interior.png`
- `Scene backdrops/hokage_administration_interior_night.png`

For the current first-hour dispatch surface, use the day interior unless existing runtime authority explicitly selects another truthful lighting state.

Stephen's Library reference **`Hokage’s Office Dashboard.png`** remains the quality/composition exemplar. It is not a production raster because it bakes mutable information and a specific Hokage into one image.

The owner-approved quality to preserve from that reference is:
- the office feels like a place first;
- the desk/administrative environment and authored furniture carry the composition;
- interaction surfaces feel embedded into that place;
- mission/business areas look designed, tactile and deliberate rather than like developer panels.

## 3.2 Required visible graphical layers

The production office requires these authored graphical layers/components:

### A. Environment
**Reuse candidate:**
`Scene backdrops/hokage_administration_interior.png`

Role:
- full-screen or safely cropped office field;
- never contains live current-Hokage identity or mission truth;
- provides physical visual body behind dispatch work.

### B. Dispatch backlog rail shell — NEW GRAPHICAL ASSET REQUIRED

Proposed path after approval:
`UI/components/hokage_office/dispatch_backlog_rail.png` or `.svg`

Visual role:
- narrow vertical administrative rail;
- tactile wood/paper/metal/scroll language integrated with office;
- open central slot for live mission rows;
- authored header ornament, separators and selection bracket geometry;
- no baked mission names/counts.

### C. Briefing dossier shell — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/hokage_office/dispatch_briefing_dossier.png` or `.svg`

Visual role:
- dominant paper/dossier/scroll surface;
- clear title slot, briefing body slot, objective/provenance slot;
- optional physical fold/seal/clip motif;
- visually connected to the desk/office rather than floating as a black card.

### D. Readiness / party strip shell — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/hokage_office/dispatch_readiness_strip.png` or `.svg`

Visual role:
- attached lower/side strip on the dossier;
- 1–4 open roster/assignment sockets;
- graphical dividers and readiness markers with no baked names/state.

### E. Primary action plaque — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/hokage_office/dispatch_action_plaque.svg`

Visual role:
- authored interactive plaque/seal/desk control;
- live label and disabled/legal state supplied by code;
- visually integrated with dossier, not detached footer.

### F. Status seal family — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/hokage_office/dispatch_status_seal.svg`

One neutral graphical family; runtime supplies label/state. CSS/runtime may tint only from existing semantic state tokens.

## 3.3 Live code slots

Coding owns:
- mission/backlog row text;
- selected mission title/body/objective/reward/provenance where current authority exposes it;
- team/assignment occupants;
- readiness values;
- legal action text and enabled/disabled state;
- current status labels;
- return/close controls;
- all callbacks/state transitions.

## 3.4 Composition relationship

Desktop composition:
- environment remains visible across the full stage;
- backlog rail occupies roughly the left 18–23% safe region;
- briefing dossier occupies the central/right 45–55% authored work zone;
- readiness strip is physically attached to the dossier rather than becoming another detached panel;
- primary action plaque is part of the dossier composition;
- secondary utility controls remain compact and visually subordinate.

The visual target is:

`office environment + authored rail/dossier/readiness/action graphics + transparent live slots + runtime truth`

not:

`office background + black divs + borders + text`.

## 3.5 Exact Hokage Office image-generation request — WAITING ON IMAGE LOCK

New graphics are genuinely required.

When Stephen uses exact phrase `generate now`, first produce a **Hokage Office production concept/component sheet** that:
- uses the existing Hokage Administration interior as environmental direction;
- contains NO specific Hokage Character baked into the environment;
- contains NO mutable mission/player/rank/count text;
- shows the dispatch rail, briefing dossier, readiness strip, action plaque and neutral status seal as authored graphical pieces;
- demonstrates the complete 1920×1080 composition;
- demonstrates the same composition at 1366×768;
- includes transparent-background isolated component views suitable for later extraction/export.

This is the first graphical benchmark because Hokage Office is the clearest current owner quality gap.

---

# 4. Shinobi Examinations — corrected graphical body

## 4.1 Existing reusable authority

`UI/exams.png` remains an **ACTIVE PRODUCTION MASTER** and already provides a graphical body for the base Exams surface.

Do not flatten it into a generic code-only redesign.

The correction targets the places where new live UI currently risks returning to styled black rectangles: **Exam Notice** and **Result Dossier**.

Practical remains owner-GREEN and is a regression control.

## 4.2 Required new graphical layers

### A. Exam Notice ribbon — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/exams/exam_notice_ribbon.svg`

Requirements:
- authored slim ribbon/tab/seal treatment;
- compact closed body;
- open attachment point for live one-line text/count;
- visually belongs to `UI/exams.png` rather than to a browser dashboard.

### B. Expanded Notice frame — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/exams/exam_notice_panel.png` or `.svg`

Requirements:
- opens inward from the ribbon;
- open centre for live runtime text;
- ornament concentrated at edges/corners;
- cannot push `BEGIN EXAM` into unsafe space.

### C. Result Dossier frame — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/exams/exam_result_dossier.png` or `.svg`

Requirements:
- distinct authored paper/dossier/result surface;
- open outcome heading slot;
- open supporting result/reward/development/provenance slots;
- built to collapse/remove cleanly when no result exists.

### D. Neutral result seal/backplate — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/exams/exam_result_seal.svg`

Requirements:
- contains no baked PASS/FAIL text;
- live result text sits above/in the seal;
- any success/warning/failure tint is runtime-driven from existing semantic tokens.

## 4.3 Live code slots

Coding owns:
- selected shinobi/card identity;
- stage path/current stage;
- eligibility and requirements;
- Begin action state/callback;
- Notice text/count/state;
- result/outcome label;
- reward/development/provenance lines;
- next action;
- curriculum/source label from actual runtime authority.

## 4.4 Composition relationship

- `UI/exams.png` remains the base graphical field;
- selected Character Card remains a dominant live/graphical subject;
- Notice ribbon mounts to an upper/right authored edge zone;
- expanded Notice opens inward over reserved air, never by pushing the primary action down;
- Result Dossier occupies the intentional result zone only when result truth exists;
- `BEGIN EXAM` remains spatially stable.

## 4.5 Exact Exams image-generation request — WAITING ON IMAGE LOCK

When authorised with `generate now`, produce an **Exams overlay component sheet + live-placement proof** using `UI/exams.png` as the real base:
- Notice ribbon closed;
- Notice ribbon expanded;
- Result Dossier inactive/absent state;
- Result Dossier active state;
- isolated transparent graphical assets;
- 1920×1080 and 1366×768 proof;
- no invented result values or progression truth.

---

# 5. My Clan — corrected graphical body

## 5.1 Existing reusable authority

Current live My Clan remains the code-first adaptive renderer.

Existing:
- `UI/my_clan_browse.png`
- `UI/my_clan_inspection.png`

remain **REFERENCE / COMPOSITION MASTERS**, not literal full-screen runtime backgrounds.

Owner correction does **not** reverse that rule. Instead it requires extracting/rebuilding their useful graphical vocabulary into componentized art that the adaptive renderer can actually consume.

Neutral decorative motifs may be decomposed from those masters if they do not contain baked live truth. Baked labels/data must not be reused as runtime truth.

## 5.2 Browse graphical layers

### A. Formation field shell — NEW/EXTRACTED GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/my_clan/my_clan_formation_field.png` or `.svg`

Role:
- graphical formation sockets/edge treatment;
- current portraits/cards remain live;
- Save state remains live.

### B. Roster field shell — NEW/EXTRACTED GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/my_clan/my_clan_roster_field.png` or `.svg`

Role:
- authored field around the real roster grid;
- texture/ornament/separators without baked roster content.

### C. Filter rail shell — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/my_clan/my_clan_filter_rail.svg`

Role:
- one compact visual carrier directly beneath `SHINOBI ROSTER`;
- Search / Rank / Village / Filters / Sort remain live controls.

### D. Formation action plaques — NEW GRAPHICAL ASSET REQUIRED

Proposed paths:
- `UI/components/my_clan/my_clan_save_formation_plaque.svg`
- `UI/components/my_clan/my_clan_reset_formation_plaque.svg`

Save remains primary. Clear/reset remains subordinate and visually separated.

## 5.3 Inspection graphical layers

### A. Inspector shell — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/my_clan/my_clan_inspector_shell.png` or `.svg`

Role:
- authored large side drawer/body;
- designed Character Card bay;
- content region with readable open live slots;
- stronger identity than generic brown/black prototype panel.

### B. Inspection navigation rail — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/my_clan/my_clan_inspector_nav.svg`

Live labels:
- Overview
- Techniques
- Conditions
- Profile
- Loadout

`Stats` is not a top-level tab; it remains inside Overview.

### C. Loadout route plaque — NEW GRAPHICAL ASSET REQUIRED

Proposed path:
`UI/components/my_clan/my_clan_loadout_route.svg`

It is an authored affordance into the separate loadout authority. It does not own equipment state.

## 5.4 Live code slots

Coding owns:
- roster membership;
- Character Cards;
- current formation portraits/occupants;
- search/filter/sort inputs;
- dirty/save/reset state;
- selected Character Card;
- Overview/Stats/Technique/Condition/Profile data;
- Loadout summary and route;
- caller-return state and unsaved-change confirmation.

## 5.5 Responsive relationship

At 1920×1080:
- formation + roster remain the dominant left/centre field;
- open inspector uses roughly 32–38% of safe width;
- full Character Card remains readable and visually important.

At 1366×768:
- inspector may use roughly 38–44% of safe width;
- filters compact before the card shrinks;
- roster grid may reduce visible columns before reducing Character Card legibility;
- primary Save and close/return remain above the bottom danger zone.

## 5.6 Exact My Clan image-generation request — WAITING ON IMAGE LOCK

When authorised with `generate now`, produce a **My Clan componentized graphical-body concept** showing:
- Browse with formation body + roster body + compact filter rail;
- Inspection with authored inspector shell, strong nav, full Character Card and Loadout route;
- no baked roster/Stats/loadout truth;
- isolated transparent component views;
- 1920×1080 and 1366×768 proof;
- clear visual relation to the historical masters without restoring them as flat screenshots.

---

# 6. #490 Scene Board — unaffected by graphical-body HOLD

The owner correction targets #575 sections A / B / D.

#490's expressive Scene Board choreography remains separately valid because its visual body already consists of:
- approved scene backdrops;
- full Character Cards;
- existing authored Story presentation assets;
- live semantic Story text/choices;
- bounded presentation choreography.

Coding may continue the ONE owner-review #490 benchmark if it can remain isolated from the held UI surface implementation.

No broad Origin propagation before Stephen accepts the benchmark.

---

# 7. Coding implementation gate

#575 sections A / B / D are **NOT implementation-ready** merely because layout contracts exist.

They become implementation-ready only after:

1. required graphical assets are produced;
2. Stephen approves the exact visible direction;
3. approved assets are frozen/committed at stable paths;
4. this packet is updated with exact committed paths and dimensions;
5. #575 receives the final asset/live-slot mapping comment.

Coding must then consume those exact assets rather than recreating the look as CSS rectangles.

CSS fallback/resilience may exist, but fallback is not owner-facing Golden presentation.

---

# 8. Current exact status

| Surface | Structural contract | Graphical body | Coding status |
|---|---|---|---|
| Hokage Office / Dispatch | CLOSED | **NEW ASSETS REQUIRED** | **HOLD** |
| Exams base | CLOSED | `UI/exams.png` ACTIVE | base retained |
| Exams Notice / Result | CLOSED | **NEW OVERLAY ASSETS REQUIRED** | **HOLD** |
| My Clan semantics/layout | CLOSED | **NEW/EXTRACTED COMPONENT ASSETS REQUIRED** | **HOLD** |
| #490 Scene Board benchmark | CLOSED grammar | existing Story graphical body sufficient | may proceed isolated |

---

# 9. Final lock

> **GRAPHICS BUILD THE INTERFACE BODY; CODE FILLS THE LIVE TRUTH SLOTS.**

> **Componentized does not mean code-only.**

> **The correct surface is authored game art with live runtime truth embedded into deliberate open slots — not a mutable screenshot, and not programmer panels wearing nicer CSS.**

> **#561 remains OPEN until the graphical bodies are owner-approved and durably committed.**
