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

### Current source diagnosis

Current `style.css` confirms the visual mismatch is structural rather than incidental.

Shinobi Exams currently uses the wide reference-fit scaffold:

```css
#konoha-activity-screen[data-service-id="exams"]
.konoha-exam-screen {
    width: min(100vw, calc(100dvh * 1.39383));
    aspect-ratio: 1536 / 1102;
    max-width: 100vw;
    max-height: 100dvh;
}
```

Practical Training currently declares an independent narrow reference canvas:

```css
#konoha-activity-screen[data-service-id="practical"]
.konoha-practical-screen {
    width: min(100vw, calc(100dvh * 1.0666667));
    aspect-ratio: 16 / 15;
    max-width: 100vw;
    max-height: 100dvh;
}
```

The Practical block also explicitly documents the underlying `practical.png` reference as **1536 × 1440** and states that Practical owns independent geometry while Exams remains untouched.

That old independence is now superseded for Alpha desktop presentation by this fix-list authority:

**Shinobi Exams is the sibling outer-scaffold geometry authority.**

At a height-limited desktop viewport, `1.0666667 / 1.39383 ≈ 0.765`, which directly explains the observed Practical width of roughly 76–77% of Exams.

### Alpha correction authority

**Shinobi Exams is the desktop geometry authority.**

Practical Training must use the same approved desktop page scaffold for:

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

### Surgical implementation guardrail

Do **not** treat this as permission to mechanically replace Practical's `16 / 15` aspect ratio with `1536 / 1102` while leaving the 1536×1440 baked Practical artwork stretched to `100% × 100%`.

That would remove the side gutters but non-uniformly distort baked typography, ornamentation and artwork, which is not an acceptable Alpha fix.

Likewise, do not solve the problem by:

- whole-screen `transform: scale(...)` enlargement;
- arbitrary horizontal stretching;
- destructive top/bottom cropping that removes the header, footer or discipline presentation;
- cloning every internal Exams coordinate into Practical;
- changing Practical content or semantics.

The implementation must instead establish the **same wide outer desktop scaffold and sibling dossier/content scale** while preserving Practical's approved visual proportions. Practical-specific internal overlays may be recalibrated proportionally against the corrected scaffold where required.

If the current baked `practical.png` cannot be presented at the shared scaffold without unacceptable stretch or clipping, that is a presentation-asset reframing problem and must be returned to UI / Assets rather than hidden with distortion.

### Non-redesign rule

Do **not** redesign Practical Training.

Preserve its approved:

- visual identity;
- artwork family;
- discipline content;
- colours;
- typography;
- controls;
- ornamentation;
- semantic hierarchy.

Practical remains the sibling training surface, not an Exams clone.

Preserve:

**Shinobi Exams scaffold authority ≠ clone every internal Practical element**

**geometry correction ≠ visual redesign**

### Required validation

Before Alpha freeze, verify at minimum:

1. Practical and Exams render with matching intended outer desktop scaffold width at the same viewport;
2. left dossier widths/visual scale align to the approved sibling architecture;
3. content columns and footer controls align to the same page geometry;
4. no new clipping, overflow, blur, non-uniform distortion or hitbox drift is introduced;
5. responsive behavior remains functional at supported widths;
6. Practical-specific content remains unchanged except where geometry requires proportional layout correction;
7. the corrected Practical screen is runtime/browser-validated side-by-side against Exams at the same desktop viewport used for the original defect comparison.

Preserve:

**shared sibling scaffold ≠ identical content**

**geometry correction ≠ redesign**

**visual approval ≠ runtime validation**

---

## Completion gate

UI / Assets has now closed the **diagnosis and correction contract**.

This item remains **OPEN — MUST FIX BEFORE ALPHA FREEZE** until SC Coding implements the corrected Practical geometry and returns runtime/browser evidence showing the side-by-side validation is GREEN.
