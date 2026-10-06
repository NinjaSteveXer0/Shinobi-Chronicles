# Shinobi Chronicles — UI Master Classification Supersession: My Clan

**Date:** 2026-10-07  
**Owner:** UI / Assets  
**Status:** **BINDING SUPERSESSION — #543 / #561**  
**Supersedes only the two My Clan rows in:** `Documentation/UI/UI Master Asset Classification and Consumption Registry 2026-10-05.md`

---

## 1. Why this supersession exists

The #526 asset-consumption audit correctly recorded the production state that existed on 2026-10-05. It classified:

- `UI/my_clan_browse.png`;
- `UI/my_clan_inspection.png`;

as ACTIVE PRODUCTION MASTERS.

Subsequent owner browser review in #543 closed a stronger current direction:

> **My Clan remains a code-first live surface. Do not restore the old Browse / Inspection PNGs as literal full-screen live backgrounds.**

The PNGs remain useful design lineage and composition references, but they are no longer mandatory bitmap-consumption authority for the current My Clan implementation.

This is a presentation-authority supersession only. It does not change any My Clan gameplay/state semantics.

---

## 2. New classification

| Asset | New classification | Current authority | Required action |
|---|---|---|---|
| `UI/my_clan_browse.png` | **REFERENCE / COMPOSITION MASTER** | #543 + `Pre-Alpha First-Hour Visual Coherence Contract 2026-10-07.md` | Keep as composition/reference lineage. Do not restore it as a literal live background. Current Browse remains code-first. |
| `UI/my_clan_inspection.png` | **REFERENCE / COMPOSITION MASTER** | #543 + `Pre-Alpha First-Hour Visual Coherence Contract 2026-10-07.md` | Keep as composition/reference lineage. Do not restore it as a literal live background. Current Inspection remains code-first. |

All other rows in the 2026-10-05 registry remain unchanged unless separately superseded.

---

## 3. Semantic firewall

This supersession does not alter:

- roster ownership;
- formation assignment;
- deployment;
- staged/committed formation state;
- unsaved-change confirmation;
- return context;
- current Stats/PL projection;
- Skills/Techniques authority;
- Loadout/Equipment authority.

Canonical:

> **reference artwork may guide composition without becoming a runtime state owner.**

---

## 4. Conformance effect

#528 must no longer fail current My Clan merely because these two PNGs are not literally rendered as full-screen masters.

Conformance should instead prove:

- Browse and Inspection remain reachable;
- their current code-first visual hierarchy satisfies #543/#561;
- current live state is truthful;
- no obsolete bitmap is required for correctness;
- Character Cards, formation and inspection hierarchy remain owner-visible at 1366×768 and 1920×1080.
