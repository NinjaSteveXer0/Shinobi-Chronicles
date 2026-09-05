# Shinobi Chronicles — Alpha UI Pre-Freeze Fix List

**Status:** ACTIVE UI / ASSETS ALPHA CLEANUP LIST  
**Owner:** UI / Assets  
**Purpose:** Track presentation defects that must be corrected before Shinobi Chronicles Alpha is considered visually/runtime-ready for freeze. This list does not imply Coding implementation is complete until source/runtime validation confirms it.

---

## 1. Practical Training desktop geometry drift — MUST FIX BEFORE ALPHA

### Current defect

The current Practical Training surface renders materially narrower than the Shinobi Exams surface at the same desktop viewport.

Observed comparison from current runtime screenshots:

- Shinobi Exams outer desktop shell: approximately 1210–1220 px wide;
- Practical Training outer desktop shell: approximately 930 px wide;
- Practical therefore renders at roughly 76–77% of the Exams width;
- Practical has substantially larger black side gutters and visibly undersized dossier, PL module, discipline panels, typography and artwork.

This is classified as **layout/geometry drift**, not an intentional stylistic difference.

### Alpha correction authority

**Shinobi Exams is the desktop geometry authority.**

Practical Training must use the same approved desktop page scaffold for:

- overall outer width / max-width;
- horizontal centering;
- left dossier width;
- primary content-column bounds;
- header scale/alignment;
- footer/action-row alignment;
- equivalent internal presentation scale.

Content remains distinct:

- Exams: Ninjutsu / Genjutsu / Fūinjutsu;
- Practical: Taijutsu / Bukijutsu / Stamina.

### Non-redesign rule

Do **not** redesign Practical Training.

Preserve its approved visual identity, artwork family, discipline content, hierarchy and controls.

Do not solve the defect with a blunt whole-screen CSS transform/scale hack if that would introduce blur, interaction-coordinate drift, responsive instability or overlay misalignment.

Preferred implementation direction is to make Practical consume the same desktop scaffold / width geometry as Exams and let its existing content occupy that scaffold correctly.

### Required validation

Before Alpha freeze, verify at minimum:

1. Practical and Exams render with matching outer desktop scaffold width at the same viewport;
2. left dossier widths visually match their sibling architecture;
3. content columns and footer controls align to the same page geometry;
4. no new clipping, overflow, blur or hitbox drift is introduced;
5. responsive behavior remains functional at supported widths;
6. Practical-specific content remains unchanged except where geometry requires proportional layout correction.

Preserve:

**shared sibling scaffold ≠ identical content**

**geometry correction ≠ redesign**

**visual approval ≠ runtime validation**

---

## Completion gate

This item remains **OPEN — MUST FIX BEFORE ALPHA FREEZE** until the corrected Practical Training geometry is implemented and runtime-validated against Shinobi Exams.
