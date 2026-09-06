# Shinobi Chronicles — Practical Training 1536×1102 Asset Reframe Contract

**Status:** BINDING ALPHA UI / ASSETS REFRAME CONTRACT — TARGET CLOSED / PHYSICAL REFRAME NOT YET LANDED  
**Date:** 2026-09-06  
**Owner:** UI / Assets

This contract closes the presentation target required to correct the known Practical Training desktop geometry drift without redesigning the approved Practical Training screen.

Current source facts:

- Shinobi Exams reference scaffold: **1536×1102** (`1536 / 1102 = 1.393829…`);
- current Practical artwork: **1536×1440** (`16 / 15 = 1.066667…`);
- current Practical width at equal viewport height: approximately **76.5278%** of Exams;
- therefore the current Practical master cannot fill the authoritative Exams-width scaffold through a simple fit without either non-uniform stretch or destructive crop.

Both shortcuts are rejected.

---

## 1. Alpha target

The replacement/reframed Practical Training presentation master must use the exact outer canvas:

**1536×1102**

This matches the approved Shinobi Exams desktop reference scaffold.

The intended result is:

**Exams and Practical share the same outer desktop presentation scale while retaining distinct internal content and visual identity.**

Preserve:

**shared sibling scaffold ≠ identical internal layout**

**geometry correction ≠ visual redesign**

---

## 2. Reframe method

The Practical master must be **recomposed**, not globally distorted.

Approved method:

- preserve the existing Practical visual design, palette, typography, ornament family and thematic artwork;
- preserve the existing left dossier / character region, three discipline regions and bottom action region as the same authored UI concepts;
- reposition and tighten those authored regions into the 1536×1102 composition so their visual scale is comparable to the approved Exams sibling;
- reconstruct/extend/rebalance decorative background material where needed to support the new composition;
- preserve panel borders, textures and decorative motifs without visibly stretching them;
- preserve the practical-specific Taijutsu / Bukijutsu / Stamina presentation rather than cloning Exams internals.

Rejected methods:

- non-uniformly stretching the 1536×1440 raster to 1536×1102;
- applying a blunt whole-screen CSS `transform: scale(...)` workaround;
- destructively cropping away required header, dossier, discipline or action content;
- shrinking the old 16:15 master into the centre of a wider canvas while leaving Practical content at the old visibly undersized scale;
- redesigning Practical into a new visual system merely to solve geometry.

---

## 3. Sibling geometry requirements

At the authoritative desktop viewport, the final Practical presentation must visually match Shinobi Exams in:

- intended outer scaffold width;
- horizontal centering;
- overall presentation scale;
- left dossier architectural weight;
- main content-column visual weight;
- header presence/scale;
- bottom action-row/footer alignment.

This does **not** require pixel-for-pixel duplication of internal Exams coordinates.

Practical-specific composition may retain different internal spacing where its approved artwork requires it, provided it no longer reads as a ~76% miniature sibling.

---

## 4. Content preservation

Do not alter the approved Practical meaning or controls.

Preserve the current Practical content family:

- Taijutsu Training;
- Bukijutsu Training;
- Survival / Stamina Training presentation;
- character selector/dossier concept;
- Power Level presentation;
- discipline EXP/mastery presentation;
- Begin Training;
- batch controls.

Do not introduce new mechanics or labels merely as part of the reframe.

Do not bake new runtime character names, PL values, EXP values, selected state, eligibility, notifications or other runtime truth into the replacement master.

---

## 5. Runtime overlay boundary

Coding must recalibrate live Practical overlays against the new 1536×1102 coordinate space after the physical master lands.

The old percentage positions calibrated against the 1536×1440 master are not automatically authoritative for the new master.

Required principle:

**new visual master → new overlay calibration against that master**

not:

**new visual master → blindly preserve old hitbox coordinates**

The existing semantic/runtime model remains unchanged.

---

## 6. Alpha validation gate

Practical Training remains OPEN for Alpha freeze until all of the following are true:

1. an approved physical **1536×1102** Practical master is committed;
2. Coding consumes it without global raster distortion;
3. live dossier, selectors, PL, discipline values/bars, training selection and action controls are recalibrated to the new coordinate space where required;
4. Practical and Exams are compared side-by-side at the same authoritative desktop viewport;
5. outer scaffold widths and sibling visual scale match;
6. no clipping, overflow, blur, hitbox drift or accidental redesign is introduced;
7. supported responsive behavior remains functional.

---

## 7. Current closure state

**UI / Assets target/specification:** CLOSED

**Physical 1536×1102 Practical master:** NOT YET LANDED

**Coding integration:** WAITING ON PHYSICAL MASTER

**Runtime/browser validation:** NOT YET GREEN

The existing `UI/practical.png` remains the current physical source asset until an approved reframed master explicitly supersedes it.
