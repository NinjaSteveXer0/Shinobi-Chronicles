# Shinobi Chronicles — UI Master Asset Classification and Consumption Registry

**Date:** 2026-10-05  
**Owner:** UI / Assets  
**Status:** **BINDING UI / ASSETS CONSUMPTION CLASSIFICATION — #526 AUDIT OUTPUT**  
**Source issue:** #526  
**Project-wide safety authority:** `Documentation/Coordination/Production_Authority_Consumption_Traceability_and_Continuous_Conformance_Gate_2026-10-05.md`  
**Audited main baseline:** `154cb288fa11a4b43ddbcc66b04a1c4b646d3b6b`

---

# 1. Purpose

This registry removes ambiguity from the current root `UI/*.png` production-master folder.

Physical presence in `UI/` is not implementation proof.

Every current UI master is classified as exactly one of:

- **ACTIVE PRODUCTION MASTER** — current production is expected to visibly consume the approved visual master/design;
- **REFERENCE / COMPOSITION MASTER** — current runtime is code-first and may consume the master as optional/reference composition; the bitmap is not mandatory semantic/runtime furniture;
- **QUEUED CONCEPT** — preserved design direction, not current implementation authority;
- **SUPERSEDED / HISTORICAL** — retained only for history and must not be consumed as current direction.

This registry classifies presentation authority only. It does not create gameplay state or replace domain ownership.

Canonical safety rule:

> **approved asset != active consumer != observable effect != owner-visible proof != Golden**

---

# 2. Current root UI master matrix

| Asset | Durable authority / design basis | Current production consumer | Current owner-visible state | Classification | Exact action |
|---|---|---|---|---|---|
| `UI/convo.png` | `Chronicle Interaction Shell Presentation Contract.md` + `Chronicle Interaction Interactive Scene Board Addendum 2026-09-13.md` | Base Chronicle Interaction shell in `game.js`; current Story Scene Board loaded through `runtime/alpha-traversal-bridge-33200.js` → `runtime/alpha-story-scene-board-33900.js` | Architecture implemented, but current Scene Board flattens/hides the original Full / Standard / Quick visual-depth distinction; browser Golden not closed | **REFERENCE / COMPOSITION MASTER** | Preserve the Scene Board evolution; do not render the bitmap literally. Restore meaningful depth-aware presentation in the one current Scene Board renderer and prove Full / Standard / Quick in browser. Route corrective implementation through existing #32. |
| `UI/victory.png` | `Victory Presentation Contract.md` | `runtime/alpha-alpha-sprint-33100.js` Victory result CSS; claimed-state support also exists in current Battle browser chain | Source visibly wires art beneath code-owned result semantics; current #526 owner-visible quality/recognisability not yet proven | **ACTIVE PRODUCTION MASTER** | Keep dynamic result/reward/history UI code-owned. Add conformance/browser proof that the art is recognisable and not effectively erased by scrims. Only tune presentation if browser evidence fails. |
| `UI/setback.png` | Battle defeat/Setback presentation authority recorded through #141 + current result implementation | `runtime/alpha-alpha-sprint-33100.js` `.alpha331-result-art` | Source visibly wires art beneath code-owned Setback semantics; current #526 owner-visible quality/recognisability not yet proven | **ACTIVE PRODUCTION MASTER** | Add browser proof. Do not infer death/injury/Story failure from the art. If visually lost, correct only presentation opacity/scrim/composition. |
| `UI/loadout.png` | `Selected Shinobi Loadout Pre-Alpha Queue.md` | **No current authoritative deep-loadout consumer**; My Clan exposes summary/route only | Preserved concept exists, but final geometry/runtime contract is explicitly not closed | **QUEUED CONCEPT** | Promote to an active **pre-Alpha UI design closure** task, using current Inventory / Equipment / Skills / Summons / Battle Pouch authorities. Do not hand to Coding until a real UI contract is closed. |
| `UI/battle.png` | current Battle presentation lineage + #312/#316 benchmark authority | Current Battle is code-owned; current CSS explicitly contains a production code surface with no `UI/battle.png` dependency | Runtime Battle is active code-first; raster remains a reference to presentation lineage, not required shell authority | **REFERENCE / COMPOSITION MASTER** | Do not force the old bitmap back into production. Preserve it as a composition/reference asset while current Battle presentation evolves through canonical renderer. |
| `UI/exams.png` | current Exams presentation/runtime authority | `style.css` `#konoha-activity-screen[data-service-id="exams"]` and live Exams DOM overlays | Current source directly consumes the raster as the screen master; current conformance proof belongs in the browser ledger | **ACTIVE PRODUCTION MASTER** | Keep raster + dynamic overlays. Add/maintain exact browser canary under #528; no redesign from this audit. |
| `UI/practical.png` | `Practical Training 1536x1102 Asset Reframe Contract.md` + closed #9 | current Practical activity + `style.css` 1536×1102 integration | #9 records owner browser validation after physical-master and runtime calibration; later watched-path changes may stale that proof | **ACTIVE PRODUCTION MASTER** | No redesign. Register in #528 with exact watched paths and rerun only when material dependencies change. |
| `UI/my_clan_browse.png` | `My Clan Adaptive Presentation Contract.md` + #32 | My Clan adaptive renderer / master-on stage | Implemented/source validated; #32 remains open for installed-browser layout/interaction Golden | **ACTIVE PRODUCTION MASTER** | Keep exact master projection and code-owned runtime content. Browser conformance remains #32/#528 work. |
| `UI/my_clan_inspection.png` | `My Clan Adaptive Presentation Contract.md` + #32 | My Clan adaptive renderer / master-on inspection stage | Implemented/source validated; #32 remains open for installed-browser layout/interaction Golden | **ACTIVE PRODUCTION MASTER** | Same as Browse: preserve exact master + runtime overlays; prove browser conformance. |
| `UI/arena_promotion.png` | Arena presentation lineage / #141 | code-owned Arena surface; master art can be projected but functional shell survives without bitmap | Arena semantics are code-owned and not permitted to depend on baked state | **REFERENCE / COMPOSITION MASTER** | Preserve as visual composition/reference. Do not treat baked raster as gameplay authority. Add canary if/when this surface is part of Alpha Golden matrix. |
| `UI/pvp.png` | Arena presentation lineage / current fail-closed PvP shell | code-owned Arena/PvP surface | PvP gameplay authority remains intentionally fail-closed where no legitimate match authority exists | **REFERENCE / COMPOSITION MASTER** | No implementation inference from artwork. Keep as reference until gameplay authority activates. |
| `UI/staged_battles.png` | Arena presentation lineage / current staged-Battle shell | code-owned Arena staged-Battle surface | Surface exists code-first; authored encounter authority remains separate | **REFERENCE / COMPOSITION MASTER** | Preserve as reference/composition master; no fake opponent/reward/state from bitmap. |
| `UI/village_tournament.png` | Arena presentation lineage / current tournament shell | code-owned Arena tournament surface | Presentation shell may exist while bracket/result/reward authority remains separate | **REFERENCE / COMPOSITION MASTER** | Preserve as reference; do not infer live tournament state. |
| `UI/training_grounds.png` | Training Grounds presentation lineage | code-owned Training hub with optional master projection | Code-owned Training shell remains authoritative for live controls/state | **REFERENCE / COMPOSITION MASTER** | Preserve art as composition/reference. Browser proof should validate intended appearance when the master is used, but gameplay must survive without it. |
| `UI/weapons_training.png` | Training Grounds / Weapons Training presentation lineage | code-owned Weapons Training surface | Runtime consumes real proficiency/equipment authority; raster does not own it | **REFERENCE / COMPOSITION MASTER** | Preserve as visual reference/optional master; no semantics inferred from baked UI. |
| `UI/sparring.png` | Training Grounds / Sparring presentation lineage | code-owned Sparring surface | Live semantics are separate and fail closed where consequence contract is unavailable | **REFERENCE / COMPOSITION MASTER** | Preserve as visual reference; do not fabricate spar result/history from artwork. |
| `UI/mentorship.png` | Training Grounds / Mentorship presentation lineage | code-owned Mentorship surface | Live semantics are separate and fail closed where transfer authority is unavailable | **REFERENCE / COMPOSITION MASTER** | Preserve as visual reference; do not infer mastery/proficiency transfer from artwork. |

Current root count at audited baseline: **17 UI PNG masters**.

Current classification totals:

- **ACTIVE PRODUCTION MASTER:** 6
- **REFERENCE / COMPOSITION MASTER:** 10
- **QUEUED CONCEPT:** 1
- **SUPERSEDED / HISTORICAL:** 0

---

# 3. Chronicle Interaction — confirmed presentation drift

The original Chronicle Interaction architecture remains binding:

> **one semantic Story system → Full / Standard / Quick presentation depths**

The later Interactive Scene Board is also binding:

> **Story becomes an interactive scene board rather than a textbox.**

Those are compatible. The Scene Board was an extension, not a cancellation of presentation depth.

Current production load is traceable:

`index.html`
→ `runtime/alpha-traversal-bridge-33200.js`
→ `runtime/alpha-origin-screen-first-33700.js`
→ `runtime/alpha-story-scene-board-33900.js`

Current `alpha-story-scene-board-33900.js` demonstrably:
- wraps the existing Story renderer;
- preserves backdrop + staged actor cards + choreography;
- preserves click-anywhere ordinary dialogue progression;
- preserves explicit choices for decisions;
- preserves a separate Record presentation;
- but does **not** read `presentationDepth` / `chroniclePresentationDepth`;
- contains no current Full / Standard / Quick rendering branch;
- force-hides `.sc-chronicle-master-frame`;
- force-hides `.sc-chronicle-context` on Scene Board routes.

Therefore current source establishes:

> **the semantic depth machinery still exists upstream, but the current Scene Board presentation has flattened the three-depth visual architecture into one dominant layout.**

This is a real presentation-consumption drift under the new production-conformance law.

It is **not** authority to:
- remove the Scene Board;
- restore the old full-screen `convo.png`;
- reintroduce giant CONTINUE buttons;
- remove current backdrops / actor cards / choreography;
- create separate Story renderers per depth.

Required correction:

> **make the current shared Scene Board renderer depth-aware again.**

Suggested bounded presentation behavior:
- **Quick** — leanest scene read; minimal context, compact dialogue/action surface;
- **Standard** — current Story workhorse; backdrop + staged actors + compact dialogue/encounter state;
- **Full** — same scene board with richer authoritative context / objective / action / consequence affordances when supplied, without turning into an admin dashboard.

All three remain one semantic Story system.

Existing implementation owner: **#32**.

---

# 4. Victory / Setback — wired, not yet owner-proven under this audit

The current runtime explicitly references both approved masters.

Victory is composed as:
- code-owned result structure;
- heavy dark scrim;
- `UI/victory.png` beneath it.

Setback is composed as:
- code-owned result structure;
- `UI/setback.png` in `.alpha331-result-art`;
- dark scrim;
- atmospheric layer opacity currently bounded below the semantic result panels.

This proves **REFERENCED / LOADED / EFFECTIVE source intent**, but not current owner-visible quality.

The audit must not convert “I did not notice the art during owner play” into “the art is unwired” without browser evidence.

Required browser canary:
- reach one real Victory;
- reach one real Setback/withdrawal;
- verify the exact asset request succeeds;
- verify non-zero rendered size/visibility;
- verify no later layer completely hides it;
- capture visual proof;
- Stephen decides whether the approved atmosphere remains recognisable enough.

If the art is too obscured, the correction is presentation-only:
- scrim opacity;
- image opacity;
- crop/position;
- panel balance.

Do not alter reward, caller, withdrawal, death/injury, Story or history semantics.

---

# 5. Selected Shinobi Loadout — promote design work, not implementation

`UI/loadout.png` is **not** an orphaned final production screen.

Current durable authority explicitly says final UI + runtime were not designed/implemented.

However its activation relevance has materially increased because current Alpha now has:
- persistent Inventory;
- real Item/Character economy work;
- durable Equipment/Weapon ownership;
- active Skills redevelopment;
- Summons/source systems;
- Battle Pouch discoverability debt (#463);
- My Clan → Selected Shinobi route boundary.

UI / Assets therefore promotes the surface from a passive preserved idea into:

> **PRE-ALPHA UI DESIGN CLOSURE — ACTIVE WHEN CURRENT #526 AUDIT / HIGHER-PRIORITY UI WORK PERMITS**

This is still **QUEUED CONCEPT** until the contract is written.

The future contract must consume, not merge:
- owned Item/Weapon/Equipment instances;
- equipped state;
- learned/available Skills;
- Summon/source access;
- Battle Pouch preparation;
- selected Character identity.

Preserve:

> **ownership != equipped != prepared != learned != access**

No Coding implementation handoff exists yet.

---

# 6. Battle master — historical/composition reference, not a shell rollback target

Current production CSS explicitly labels the active Battle direction:

> **Battle: production code surface; no UI/battle.png dependency**

Later UI benchmark authority also states that the old Battle shell is not sacred and must not be mechanically restored merely because the raster exists.

Therefore `UI/battle.png` remains useful as a visual/composition reference, but it is not an ACTIVE bitmap contract.

Do not use this audit to undo current Battle presentation work.

---

# 7. My Clan, Exams and Practical

## My Clan

`UI/my_clan_browse.png` and `UI/my_clan_inspection.png` remain ACTIVE PRODUCTION MASTERS.

They define the production presentation composition while runtime owns:
- roster membership;
- formation occupants;
- selected shinobi;
- current Stats/PL;
- staged dirty state;
- save/clear behavior;
- loadout summary.

Fallback code-first rendering is resilience, not permission to silently abandon the approved masters.

#32 still owns the unclosed installed-browser Golden.

## Exams

`UI/exams.png` remains an ACTIVE PRODUCTION MASTER. Current CSS directly renders it as the screen master and overlays live state.

## Practical

`UI/practical.png` remains an ACTIVE PRODUCTION MASTER.

#9 is consumed/closed and records:
- exact 1536×1102 production master;
- runtime recalibration;
- owner browser validation.

Under the 2026-10-05 conformance gate, future material watched-path changes may stale the old proof; that does not reopen its visual design automatically.

---

# 8. Arena / Training family

The current Arena and Training architecture deliberately separates:

> **master art / composition**
from
> **code-owned runtime semantics**

The code-owned shells remain functional and fail closed even if optional master art is unavailable.

For that reason, the current Arena and Training PNG family is classified **REFERENCE / COMPOSITION MASTER** rather than ACTIVE semantic/presentation dependency.

The raster may still be displayed in master-on presentation. That does not make it a semantic owner or require all runtime state to be baked into it.

If later owner acceptance explicitly requires one of these exact rasters to be visually mandatory, UI / Assets may promote that individual file to ACTIVE PRODUCTION MASTER with an updated consumption record.

---

# 9. Shop rule

At audited main `154cb288fa11a4b43ddbcc66b04a1c4b646d3b6b`, no root `UI/shop.png` exists.

When Shop art lands:

1. classify it immediately under this registry model;
2. name its durable presentation contract;
3. name exact runtime consumer;
4. state whether bitmap visibility is mandatory or reference-only;
5. register browser acceptance;
6. do not let physical presence in `UI/` imply ACTIVE status.

---

# 10. Downstream consumption

## Existing Coding tracker #32

Use #32 for the confirmed Chronicle Interaction correction.

Do not create a duplicate Story/UI implementation ticket.

Required correction is presentation-bounded:
- one current Story renderer;
- preserve Scene Board;
- restore meaningful Full / Standard / Quick projection;
- preserve backdrop + cards + current choreography;
- preserve click-anywhere ordinary dialogue;
- preserve explicit decision clicks;
- no new state owner;
- no literal full-screen `convo.png`;
- add three-depth browser canary.

## Existing conformance queue #528

#528 must ingest this registry into the machine-readable Production Consumption Manifest.

Minimum UI canaries from this registry:
- Chronicle Interaction Quick;
- Chronicle Interaction Standard;
- Chronicle Interaction Full;
- Victory;
- Setback;
- My Clan Browse;
- My Clan Inspection;
- Exams;
- Practical.

Reference/Composition assets should be validated according to their actual contract, not failed merely because a bitmap is not literally displayed.

Queued `loadout.png` must be represented as QUEUED rather than falsely reported as a broken consumer.

---

# 11. Final lock

> **A UI PNG is not production authority merely because it exists under `UI/`.**

> **ACTIVE masters must be visibly consumed and provable.**

> **REFERENCE / COMPOSITION masters may inform a code-first renderer without becoming mandatory bitmap furniture.**

> **QUEUED concepts are legitimate unfinished work and must not be reported as production regressions.**

> **Current confirmed UI presentation drift is Chronicle Interaction depth flattening: the modern Scene Board remains correct, but Full / Standard / Quick must become visibly meaningful again inside that one renderer.**

> **Victory and Setback are source-wired; their remaining #526 question is observable owner-facing presentation quality, not basic implementation existence.**
