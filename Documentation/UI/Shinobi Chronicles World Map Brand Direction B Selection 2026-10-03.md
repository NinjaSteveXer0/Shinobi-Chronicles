# Shinobi Chronicles — World Map Brand Direction B Selection

**Date:** 2026-10-03  
**Owner:** UI / Assets  
**Status:** **OWNER-SELECTED / PRODUCTION LOCKUP DIRECTION CLOSED — FINAL FILE EXPORT STILL PENDING**  
**Source issue:** #508  
**Upstream:** #505 / #499 / master #449 Step 4  
**Brand authority:** `Documentation/Visual Identity/Masterbrand Authority.md`

---

# 1. Owner selection

Stephen selected:

> **Direction B**

from the three World Map top-left brand lockup directions produced for #508.

For durable production interpretation, Direction B is now named:

> **Dual Path / Precision Chronicle**

The selected treatment is the Direction B **title / lockup / proportion / readability direction**.

---

# 2. Masterbrand authority is NOT reopened

This selection does **not** replace the current franchise master mark.

Current binding franchise identity remains:

> **Concept 5 — THE DUAL PATH + SHINOBI CHRONICLES**

Therefore:

- preserve the existing **Dual Path** franchise mark;
- consume Direction B as the selected **wordmark/title-treatment and horizontal lockup language**;
- do not promote the generated Direction B brushstroke crest into the franchise master mark;
- do not replace Dual Path merely because the concept board used a different exploratory emblem;
- generic Chronicle / Chronicle Engine emblem remains separate;
- Chronicle Reaper-specific identity remains separate.

Canonical:

> **Direction B treatment + existing Dual Path mark = selected production direction.**

---

# 3. Production visual characteristics

The final World Map brand unit should preserve the selected Direction B qualities:

- compact horizontal silhouette;
- premium, restrained wordmark;
- strong readability at HUD scale;
- clear hierarchy between emblem and exact title;
- dark / gold primary compatibility;
- subtle cool-blue compatibility with Chronicle Compass HUD accents;
- sufficiently distinctive to read as Shinobi Chronicles rather than generic fantasy UI;
- minimal enough not to compete with the World Map;
- no Japanese subtitle;
- no runtime state embedded in the mark.

Exact title:

> **SHINOBI CHRONICLES**

The title spelling must be reproducible and must not depend on image-generation typography.

---

# 4. World Map scope

Current approved placement scope for this lockup round is:

> **World Map top-left brand zone only.**

This selection does not automatically authorize the same brand placement on:
- Region Map;
- Village Map;
- Story Scene Board;
- Battle;
- menus;
- other global application surfaces.

Those may consume the same masterbrand asset later through separate presentation decisions.

The World Map placement must:
- own the top-left brand zone;
- remain visually separate from Current Team;
- preserve map dominance;
- avoid obscuring meaningful geography;
- remain readable at 1366×768;
- remain elegant at 1920×1080;
- avoid becoming a large banner/frame.

---

# 5. Required durable production assets

Final production outputs remain:

- `UI/brand/shinobi_chronicles_dual_path_lockup.svg`
- `UI/brand/shinobi_chronicles_dual_path_mark.svg`

Optional exact raster fallbacks where useful:

- `UI/brand/shinobi_chronicles_dual_path_lockup.png`
- `UI/brand/shinobi_chronicles_dual_path_mark.png`

The SVG/vector source is preferred for:
- exact spelling;
- deterministic scaling;
- long-term reproducibility;
- clean Git history;
- safe HUD implementation.

Coding must consume the committed exact production asset. Coding must not recreate the logo in CSS, substitute another icon, crop it from concept art, or infer the master mark from a map raster.

---

# 6. Source recovery status

Source-first audit confirms the repository durably records **Dual Path** as the franchise master mark but does not currently expose a standalone production asset/path containing exact Dual Path geometry.

UI / Assets has, however, recovered the original historic **Shinobi Chronicles Logo Concept Board** from Project/Library history. That board visibly contains:

> **Concept 5 — THE DUAL PATH**

and therefore provides the correct visual provenance for the approved emblem geometry.

This is materially stronger than trying to infer the emblem from the World Map raster.

However:

- the concept board is still a concept-sheet source, not a standalone production logo;
- current file tooling did not expose an authorised raw-byte materialisation path for direct production promotion;
- the historic World Map raster remains unsuitable as a standalone brand source;
- no crop from a map or arbitrary recreation may be treated as exact franchise authority.

Therefore:

> **Use the recovered Concept 5 board as visual provenance for the exact Dual Path geometry, but do not call the concept board itself the production asset.**

The final standalone lockup must preserve that approved geometry through a legitimate exact production/export path, then be frozen and committed.

No new masterbrand invention is authorised by this selection.

---

# 7. Final production acceptance

#508 is complete only when:

1. the exact Dual Path master mark is represented in a standalone reproducible asset;
2. Direction B / Precision Chronicle title treatment is applied to the exact words `SHINOBI CHRONICLES`;
3. horizontal SVG is committed;
4. mark-only SVG is committed;
5. transparent PNG fallbacks are committed if required;
6. exact dimensions are recorded;
7. clear-space / safe-margin rule is recorded;
8. minimum readable display size is recorded;
9. 1366×768 World Map placement is proven;
10. 1920×1080 World Map placement is proven;
11. Coding receives exact committed paths only after those files exist.

Until then:

> **owner selection = CLOSED**  
> **production asset = NOT YET CLOSED**  
> **Coding consumption = NOT YET AUTHORISED**

---

# 8. Final lock

> **Stephen selected Direction B.**

> **Direction B is the production wordmark/lockup language.**

> **The franchise master emblem remains Dual Path.**

> **No generated exploratory crest supersedes the master mark.**

> **The recovered Concept 5 board is visual provenance, not the production file.**

> **The final logo must exist as standalone committed SVG/PNG authority before Coding consumes it.**
