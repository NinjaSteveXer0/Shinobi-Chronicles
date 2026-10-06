# Shinobi Chronicles — Pre-Alpha First-Hour Visual Coherence Contract

**Date:** 2026-10-07  
**Owner:** UI / Assets  
**Status:** **BINDING PRE-ALPHA PRESENTATION AUTHORITY — #561**  
**Primary priority:** Finish Shinobi Chronicles Alpha.  
**Source issue:** #561  
**Consumes:** #543, #490, #519, #533, #555, #559 and current live runtime authority.  
**Audited main baseline:** `1bea1ea8f8c67fc3014433d63c7f45ffd00745d9`

---

## 1. Purpose

This contract closes the current first-hour presentation gap without reopening gameplay semantics.

The Alpha has largely recovered functional authority across World / Region / Village navigation, My Clan, Exams, the Hokage Office / Chronicle Dispatch, Battle, Story and first-hour transitions. The remaining pre-Alpha problem is that several surfaces still read as prototype-era assemblies even when their underlying behavior is correct.

Canonical rule:

> **Visual coherence may reorganise presentation, hierarchy, spacing, emphasis and authored composition. It may not become a new semantic owner.**

This contract covers four connected presentation workstreams:

1. Hokage Office / Chronicle Dispatch visual recomposition;
2. Shinobi Exams notification/result redesign and higher-curriculum presentation seam;
3. My Clan inspector visual-hierarchy rethink;
4. one reusable Shinobi Chronicles live-interface grammar for first-hour service/management surfaces.

Story Scene Board expressive choreography is activated under companion #490 and its own durable UI authority. It is not duplicated here.

---

# 2. Global non-negotiables

The following existing semantic separations remain binding:

- identity != ownership;
- ownership != assignment;
- assignment != deployment;
- Rank != Progression;
- Promotion != Battle victory;
- Battle victory != Story completion;
- mission availability != mission assignment != mission launch;
- Knowledge != Access != Competence != Power != Mastery;
- presentation state != gameplay state;
- UI affordance != semantic permission.

Runtime owns dynamic values and actions. Static visual masters provide composition/reference only unless a current durable contract explicitly makes their visible raster consumption mandatory.

No visual redesign may:

- create a second state store;
- invent Ryō, Rank, mission availability, party membership, rewards, progress, callbacks, curriculum eligibility or result truth;
- bypass fail-closed runtime checks;
- bake mutable runtime facts into static art;
- change current caller-return/navigation semantics;
- replace domain-owned mechanics with inferred UI behavior.

---

# 3. Shared Shinobi Chronicles live-interface grammar

This is a **shared visual language**, not one universal layout template.

## 3.1 Composition law

A major first-hour surface should normally contain:

1. **one dominant authored field** — environment, character subject, or task surface;
2. **one primary interaction hierarchy** — the current thing the player is doing;
3. **subordinate live-state slots** — dynamic values and controls integrated into the composition rather than floating as unrelated admin cards;
4. **one obvious primary action** when current runtime semantics permit one;
5. **secondary controls grouped by task**, not by implementation module.

Avoid the repeated prototype pattern:

`header box -> info box -> second info box -> button box -> empty black space`.

## 3.2 Visual tokens

For code-owned surfaces, use one coherent token family rather than per-screen improvised browns/greys:

- deep ink / graphite base: `#0E141A` / `#17222B`;
- warm paper / readable light text: `#E7E0D2`;
- restrained bronze structural accent: `#A9874E`;
- Chronicle / active-focus cyan: `#45C5D9`;
- success accent: runtime theme success token where already established;
- warning / failure accent: use current semantic warning/failure token; do not invent consequence from colour.

Bronze is structural, not the permanent identity of every panel. Cyan indicates focus/interaction, not semantic truth by itself.

## 3.3 Frame language

Prefer:

- one outer composition;
- thin internal separators;
- inset paper/dossier regions;
- rails, folds, seals, dividers, shallow translucent shells;
- selective ornament around headings/actions;
- asymmetric composition where the subject/environment benefits from it.

Avoid:

- every region receiving a full rectangular border;
- generic black cards repeated at equal weight;
- deep nested boxes;
- giant empty black margins created merely to look clean.

## 3.4 Information hierarchy

Default visual levels:

- **Level 1 — Subject / place / task:** strongest anchor;
- **Level 2 — Current state / selected object:** primary live information;
- **Level 3 — Supporting facts / readiness / requirements:** subordinate;
- **Level 4 — utility controls / filters:** compact and de-emphasised.

A filter toolbar must never visually outrank the Character Card, mission briefing or current Exam stage.

## 3.5 Notification grammar

Notifications have three presentation modes without inventing semantic severity:

- **quiet notice** — compact inline/ribbon treatment for informational runtime copy;
- **active notice** — expanded but bounded callout when runtime says the notice is currently relevant/actionable;
- **result communication** — dedicated result treatment for a completed current occurrence.

If runtime supplies no severity/priority metadata, UI must not infer one from wording.

Notifications must not push the screen's core primary action into unsafe bottom-edge space.

## 3.6 Result / reward emphasis

A result is a completed occurrence, not another generic notification.

Result presentation should:

- occupy a deliberately reserved result region;
- appear as one coherent result card/stamp/dossier treatment;
- visually separate outcome from supporting reward/provenance lines;
- preserve all runtime-owned values exactly;
- collapse back to the normal screen hierarchy when no result exists rather than leaving a giant permanent hole.

## 3.7 Interactive affordances

- primary action: strongest interactive contrast and clear hit area;
- secondary action: visibly subordinate;
- destructive/reset action: separated from primary save/continue action;
- selected state: cyan/focus treatment plus shape/position change where useful; colour alone is insufficient;
- disabled state: visibly disabled but still readable;
- no essential control flush to the physical browser/taskbar edge.

## 3.8 Responsive rule

At 1920×1080, surfaces may use wider spatial separation and more atmosphere.

At 1366×768:

- reduce gutters before shrinking the primary subject;
- compact secondary utility rows before compressing Character Cards;
- keep primary action, close/return and current task visible/reachable;
- never depend on one fragile scroll position to access the core action.

## 3.9 Raster/reference-master rule

An existing raster may be:

- literal active atmosphere/background;
- composition reference;
- historical reference;
- queued concept.

Do not infer which from filename presence.

When a current code-first surface supersedes literal raster use, the raster may remain useful as composition language without being restored as a flat live screenshot.

---

# 4. Hokage Office / Chronicle Dispatch — art-directed componentized live UI

## 4.1 Current problem

Current implementation through `renderChronicleDispatchHub43110` is functionally integrated but visually reads as multiple adjacent technical slabs:

- mission/backlog panel;
- briefing panel;
- party/assignment controls;
- launch/action controls.

The owner-facing defect is not missing functionality. It is that the room does not yet read as **one coherent place where dispatch work happens**.

## 4.2 `hokage_office.png` reference status

#559/#561 explicitly establish Stephen's preferred `hokage_office.png` experience as the immediate **quality/composition target**.

Current repository audit did not establish a canonical production path named `hokage_office.png` on main.

Therefore:

> **Use `hokage_office.png` as owner-approved composition/reference direction, not as assumed runtime file authority until a canonical asset path is durably established.**

Coding must not guess a filename or fabricate a mutable bitmap.

## 4.3 Selected composition

The Hokage Office becomes one spatially coherent Chronicle Dispatch hub with five integrated regions:

1. **Office / place field** — dominant environmental treatment;
2. **Dispatch rail** — mission backlog/available work;
3. **Briefing dossier** — selected mission owns the strongest reading zone;
4. **Party/readiness strip** — adjacent to the briefing/action relationship;
5. **Primary dispatch action** — assign/launch/continue only when runtime says legal.

These are regions of one interface, not separate mini-applications.

Desktop target:

- environment remains visible around/behind functional components;
- dispatch rail uses a narrow edge treatment rather than a full competing dashboard;
- briefing dossier occupies the central authored surface;
- party/readiness sits as a compact attached strip or fold beneath/alongside the dossier;
- primary legal action sits inside the dossier/action composition, not in a detached footer;
- separators, seals, paper edges, tabs or thin rails are preferred over four independent black boxes;
- no large dead black void is introduced merely to make the screen sparse.

## 4.4 Component contract

UI / Assets authorises these visual components:

- `office_environment_field` — static/code-owned atmosphere only;
- `dispatch_backlog_rail` — dynamic mission rows projected by runtime;
- `dispatch_briefing_dossier` — dynamic selected mission title/body/objectives;
- `dispatch_readiness_strip` — current party/assignment/readiness projection;
- `dispatch_primary_action` — current legal primary action;
- `dispatch_secondary_action` — subordinate return/inspect actions;
- `dispatch_status_seal` — optional presentation of runtime-supplied status only.

Mutable facts remain live DOM/text/state. Decorative paper, borders, seals, icons and environmental texture may be componentized assets/CSS.

## 4.5 Interaction requirements

Preserve current runtime authority exactly:

- mission/backlog content comes from the existing mission source;
- briefing is projection of selected mission authority;
- party/assignment reads existing assignment/team state;
- primary action remains fail-closed;
- at least one executable action is visibly discoverable whenever current semantics allow one;
- closing or leaving the office uses current navigation authority;
- no decorative room state may manufacture mission state.

## 4.6 Hokage Office acceptance

At 1366×768 and 1920×1080:

- the interface reads as one room / one dispatch surface within three seconds;
- mission -> briefing -> party/readiness -> action has a visible spatial relationship;
- authored atmosphere is visibly stronger than generic admin chrome;
- no required action is flush to the physical bottom edge;
- no live information is baked into presentation art;
- no panel exists solely because the prototype had a box there;
- current #555 functional diagnostics remain GREEN;
- Stephen browser review confirms the surface no longer reads as unrelated slabs.

---

# 5. Shinobi Exams — notification/result redesign

## 5.1 Current state

Current Exams are functional and materially improved by the recent Character Card rebalance. Practical Exercises are owner-GREEN and serve as a regression control.

The Exams problem is presentation hierarchy and prototype residue, especially `SPECIAL NOTIFICATIONS` and latest/significant-result communication.

## 5.2 Selected presentation direction

The Exams screen should read as:

> **one authored assessment surface centred on the selected shinobi and their current Exam stage**

rather than:

> **a technical panel around a list of systems**.

Required hierarchy:

1. **Selected shinobi / Character Card** — strongest human anchor;
2. **Current Exam stage / discipline lane**;
3. **Stage path / progression read**;
4. **Current stage detail / eligibility** — runtime-owned;
5. **BEGIN EXAM** — stable primary action where legal;
6. **Result communication** — dedicated, deliberate result region;
7. **Special Notifications** — subordinate unless runtime makes a current notice actionable.

## 5.3 Character Card rule

The full collectible Character Card remains visually prominent.

Do not regress to a tiny identity thumbnail when one shinobi is the subject of the entire screen.

Current large preview treatment is the lower bound for desktop prominence.

## 5.4 `SPECIAL NOTIFICATIONS` redesign

Replace the prototype-like permanent notification slab with a bounded **Exam Notice ribbon**:

- collapsed state: compact title + one-line current message/count where supplied;
- expanded state: anchored panel opening inward from the ribbon, not downward over the primary action;
- no notification: ribbon may collapse to a minimal dormant affordance or disappear if current runtime has nothing to show;
- runtime text stays exact;
- no UI-authored severity if runtime does not supply one;
- the ribbon must never displace `BEGIN EXAM` from its stable safe-zone position.

## 5.5 Result Stage redesign

The result region becomes a deliberate **Result Dossier** rather than “latest significant result” copy floating among controls.

When active it contains only runtime-authorised data such as:

- outcome/state label;
- exact stage/discipline context;
- earned result/reward/development lines;
- any exact Chronicle/source provenance already authorised;
- next legal action where applicable.

Presentation:

- one strong result heading/stamp;
- concise outcome first;
- supporting facts below;
- no giant permanent empty box when inactive;
- animation may reveal the dossier, but cannot create/rewrite result truth.

## 5.6 Layout rules

- `UI/exams.png` remains current presentation authority unless explicitly superseded;
- live Character Card, values, result lines, progress and action states remain overlays;
- remove/mask duplicate labels where baked raster copy competes with live copy;
- reduce box-inside-box treatment;
- keep Result Dossier visibly reserved only when current result exists;
- stage dots/list remain legible and spatially related to the selected stage;
- `BEGIN EXAM` retains a stable safe-zone position across notification expansion;
- no redesign may imply stage completion automatically grants Rank, Promotion, Skill ownership or Progression.

## 5.7 Higher-curriculum presentation seam

Current CE #519 direction has reached **design-closed PR-head state on PR #566 but is not yet merged to main** at this audit. UI therefore prepares the seam without inventing source profiles.

Presentation grammar when authorised data exists:

`FOUNDATION [DISCIPLINE] CURRICULUM -> EXPERT [DISCIPLINE] CURRICULUM -> MASTER [DISCIPLINE] CURRICULUM`

The same Exam/Practical lane remains on-screen while the **development source/profile changes**.

UI behavior:

- current curriculum appears as a compact label/chip attached to the discipline lane;
- when an authorised next curriculum becomes available, transition the label/header in place rather than opening a duplicate Exam screen;
- use a short 220–320ms crossfade/slide/seal-change presentation to communicate “new source/profile”; reduced-motion uses an immediate label replacement with focus cue;
- `Foundation exhausted` remains a valid source fact and must not be visually rewritten as “Foundation continues forever”;
- if runtime supplies observer-safe locked requirements, UI may show them;
- if runtime does not supply requirements/availability, UI shows no invented lock reason;
- curriculum selection never grants Stat/Skill/Rank by itself.

Until #519 merges and Progression authors exact Expert/Master profile IDs, gates, efficacy ceilings, costs and qualifying actions, the current runtime must continue to project only real implemented sources. No fake Expert/Master buttons are authorised.

## 5.8 Exams acceptance

At 1920×1080:

- Character Card feels deliberately featured;
- stage/navigation remains visible without dominating the character;
- `BEGIN EXAM`, Result Dossier and Exam Notice are distinct in hierarchy;
- expanded notices do not become a second dashboard.

At 1366×768:

- no critical control is hidden behind browser/taskbar safe area;
- the Character Card remains readable as a card rather than collapsing to an icon;
- stage list and `BEGIN EXAM` remain reachable without fragile scroll-position dependence;
- expanded Exam Notice cannot move the primary action out of reach.

Practical remains visually/functionally unchanged unless a shared token correction is necessary.

---

# 6. My Clan — #543 consumed / immediate pre-Alpha follow-up

## 6.1 Status

#543 is no longer an unconsumed queue item.

Classification:

> **IMMEDIATE PRE-ALPHA FOLLOW-UP inside the same first-hour visual-language pass.**

It must not interrupt current Hokage Office / Exams Golden correction, but it should use the same visual tokens and prototype-exit laws so the three surfaces do not become unrelated design languages.

## 6.2 Architecture remains

My Clan remains one code-first adaptive system with two visual states:

- **Browse** — roster + formation management;
- **Inspection** — selected shinobi operational detail.

No change to roster membership, ownership, assignment, deployment, staged formation, committed formation, save/load, dirty-state confirmation or return-context semantics.

## 6.3 Browse — surgical correction only

Preserve current formation/card geometry.

Required change:

- move Search / Rank / Village-Affiliation / Filters / Sort into one compact row directly beneath `SHINOBI ROSTER`;
- do not rebuild Browse around the toolbar;
- formation remains the upper/primary management zone;
- full Character Cards remain dominant identity objects;
- Save Formation feedback appears immediately adjacent to formation/action controls;
- Clear / Reset remain visually separated from Save.

## 6.4 Inspection — selected production direction

The enlarged drawer remains structurally valid, but the prototype tab hierarchy is superseded.

Use this hierarchy:

1. **Selected full Character Card** — primary visual anchor;
2. **Overview** — identity + current operational facts + Stats summary in one first view;
3. **Techniques** — current authorised technique summary;
4. **Conditions** — current authorised conditions/status where available;
5. **Profile** — biography/history/presentation-safe profile content already authorised;
6. **Loadout** — persistent, clearly surfaced summary/action route separate from the four information sections.

`Stats` is therefore no longer a separate top-level tab; it belongs in Overview.

`Loadout` is not buried as another quiet text tab. It appears as a clear inspection route/summary card while deeper equipment/loadout semantics remain owned elsewhere.

Navigation treatment:

- prominent segmented rail or section selector with text + active indicator;
- active section uses cyan/focus + shape/position cue;
- inactive sections remain readable, not low-contrast brown text;
- selected section does not change ownership/state by itself.

## 6.5 Palette / visual identity

My Clan is the first explicit consumer of the updated live-interface palette:

- graphite/ink base;
- warm readable paper/light text;
- bronze used sparingly for clan/structural ornament;
- cyan for active navigation/focus;
- current semantic warning/failure tokens only where runtime supplies those states.

This supersedes treating brown/gold as the permanent universal My Clan identity.

## 6.6 My Clan raster-master supersession

The 2026-10-05 #526 registry classified:

- `UI/my_clan_browse.png`;
- `UI/my_clan_inspection.png`;

as ACTIVE PRODUCTION MASTERS.

#543 subsequently closed a stronger direction:

> **The current live My Clan remains code-first; do not restore those PNGs as literal full-screen backgrounds.**

Therefore for the current code-first My Clan surface, #561/#543 supersede the earlier literal-consumption implication:

- `UI/my_clan_browse.png` -> **REFERENCE / COMPOSITION MASTER**;
- `UI/my_clan_inspection.png` -> **REFERENCE / COMPOSITION MASTER**.

They remain valuable design lineage/reference. Runtime truth and live layout remain code-owned.

A separate durable registry supersession is recorded with this contract.

## 6.7 Exit and unsaved state

- close control always obvious in a consistent top-right safe area;
- Escape routes through the same unsaved-change confirmation as visible close;
- Save / Discard / Keep Editing authority unchanged;
- exact map return context from the current functional repair remains untouched;
- no visual shortcut bypasses confirmation or caller restoration.

## 6.8 My Clan acceptance

At 1366×768 and 1920×1080:

- Browse vs Inspection is obvious without reading a debug label;
- Character Cards are primary visual objects;
- formation remains prominent/editable;
- Browse filter row is aligned beneath `SHINOBI ROSTER` and visually secondary;
- Inspection navigation is unmistakable and readable;
- Overview includes Stats summary without a separate Stats tab;
- Loadout is visibly surfaced without becoming a second equipment state owner;
- close is obvious;
- Escape cannot bypass unsaved confirmation;
- no large autogenerated flavour block;
- no ownership/assignment/deployment semantic drift.

---

# 7. Prototype-exit failure/pass rules

A first-hour surface fails this contract if its primary visual read is any of:

- “browser form”;
- “terminal/debug panel” where not intentionally thematic;
- “several unrelated bordered boxes”;
- “large black area with controls floating in it”;
- “small character thumbnail plus lots of interface furniture” when a character is the subject;
- “static raster labels plus duplicate live labels fighting each other”;
- “important action sitting at the physical bottom edge.”

A surface passes when:

- the user can identify the place/task/subject quickly;
- the hierarchy follows the actual gameplay relationship;
- dynamic state feels integrated into authored presentation;
- decorative structure supports rather than competes with interaction;
- current semantics remain traceable to their canonical owner.

---

# 8. Runtime ownership map

| Surface | Existing canonical implementation owner | UI / Assets instruction |
|---|---|---|
| Hokage Office / Chronicle Dispatch | `renderChronicleDispatchHub43110` in `runtime/alpha-phase2-konoha-player-surfaces-43110.js` | Recompose current hub only; no second office/dispatch renderer |
| Shinobi Exams | current Exams renderer + `style.css` Exam presentation | Reframe current screen only; no second Exam system |
| My Clan | current adaptive Browse/Inspection renderer | Retrofit current code-first renderer only; preserve formation/return/unsaved state |
| Scene Board | `runtime/alpha-story-scene-board-33900.js` | Expressive grammar/benchmark under companion #490 authority; no second Story renderer |

---

# 9. Conformance / Golden requirements

Coding implementation must register watched paths under #528 and provide browser evidence.

Minimum viewport proof:

- 1366×768;
- 1920×1080.

Minimum routes:

- Konoha -> Hokage Office / Chronicle Dispatch;
- Konoha -> Exams with no notice, expanded notice and one real result;
- World/Village caller -> My Clan Browse -> Inspection -> return;
- one dirty formation close attempt;
- one four-participant Scene Board choreography benchmark through #490.

Automated GREEN does not replace Stephen's visual/taste acceptance where Golden requires it.

---

# 10. Final lock

> **The first-hour Alpha must look like one authored game, not a collection of successful prototypes.**

> **Recomposition may change hierarchy, spacing, framing, emphasis and visual language; it may not change semantic ownership.**

> **Hokage Office becomes one art-directed live dispatch place, Exams becomes one authored assessment surface with deliberate notice/result communication, and My Clan becomes a readable code-first roster/inspection interface using the same visual language without restoring obsolete full-screen masters.**
