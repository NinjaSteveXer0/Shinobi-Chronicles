# Shinobi Chronicles — Alpha UI Pre-Freeze Fix List

**Status:** CLOSED — CURRENTLY NO OPEN UI / ASSETS ITEMS IN THIS LIST  
**Owner:** UI / Assets  
**Purpose:** Preserve the presentation defects that were required to be corrected before Shinobi Chronicles Alpha UI freeze, together with their final closure state. A closed item must not be reopened without new runtime evidence or a genuine regression.

---

## 1. Practical Training desktop geometry drift — CLOSED / BROWSER VALIDATED

### Historical defect

Practical Training previously rendered materially narrower than Shinobi Exams at the same desktop viewport because the two screens were using different outer scaffold geometry.

Observed before correction:

- Shinobi Exams outer desktop shell: approximately 1210–1220 px wide;
- Practical Training outer desktop shell: approximately 930 px wide;
- Practical therefore rendered at roughly 76–77% of the Exams width;
- Practical showed substantially larger black side gutters and visibly undersized dossier, PL module, discipline panels, typography and artwork.

This was correctly classified as **layout/geometry drift**, not an intentional stylistic difference.

### Closed correction authority

**Shinobi Exams remains the sibling desktop outer-scaffold geometry authority.**

Practical Training uses the same intended desktop page-scale family for:

- overall outer width / max-width;
- horizontal centering;
- left dossier architecture and equivalent visual scale;
- primary content-column bounds;
- header scale/alignment;
- footer/action-row alignment;
- equivalent internal presentation scale.

Content remains distinct:

- Exams: Ninjutsu / Genjutsu / Fūinjutsu;
- Practical: Taijutsu / Bukijutsu / Stamina.

Preserve:

**Shinobi Exams scaffold authority ≠ clone every internal Practical element**

**geometry correction ≠ visual redesign**

### Physical asset / implementation closure

The accepted Practical production asset is bound at:

`UI/practical.png`

GitHub Issue #9 records the completed physical-master and runtime integration loop:

- the Practical physical master landed at the production path under the locked wide-scaffold reframe contract;
- the accepted integration path remained `UI/practical.png` through subsequent UI / Assets refinements;
- Coding recalibrated Practical to the 1536×1102 sibling scaffold family;
- card / PL / mastery / EXP geometry, independent batch controls, result routing, Special Notifications and visible character navigation were integrated through the final Practical polish loop;
- Stephen browser-validated the completed Practical screen in runtime.

No further Practical remaster, geometry correction or UI / Assets action is required for Alpha.

### Final state

**Design:** CLOSED  
**Production asset:** LANDED  
**Coding integration:** COMPLETE  
**Runtime/browser validation:** GREEN  
**Alpha UI / Assets status:** **100% COMPLETE FOR THIS ITEM**

Do not reopen this item because of historical references to the old 16:15 / narrow Practical geometry. Those references are superseded by the completed production/runtime result.

---

## Completion gate

The Practical Training pre-freeze blocker is fully consumed and closed.

This file currently contains **no open UI / Assets Alpha pre-freeze defect**.

Future defects belong here only when supported by new current-source/runtime evidence.
