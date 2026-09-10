# Shinobi Chronicles — Genin Expansion v2 Asset Gate and Activation Sequence

**Date:** 2026-09-10  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING ALPHA COORDINATION — REGISTRY/PL CLOSED / ASSET PROJECTION GATE ACTIVE / V2 CANDIDATE AUTHORITY NOT YET PUBLISHED**  
**Source handoff:** GitHub issue #73  
**Upstream:** #70 ← #69

## 1. Purpose

This document consumes the completed 25-row Registry / PL / Rank admission and fixes the next production sequence for the commissioned historical-Konoha Genin expansion.

Registry/PL authority is closed in:

`Documentation/Registry/Alpha Genin Expansion 25 Row Registry and PL Admission 2026-09-10.md`

commit:

`fc8281fd81c92cf47e63c20dd097b7402d17a492`

All 25 rows now have exact stable-person linkage, exact `genin_*` representation IDs, baseline formal Rank, seven Base Stats and Formula-v1.0 Base PL.

That closure does **not** activate the rows in the current candidate universe by itself.

Preserve:

**Registry admission ≠ production activation**  
**Registry admission ≠ candidate inclusion**  
**candidate universe ≠ concrete snapshot**  
**candidate eligibility ≠ ownership ≠ assignment ≠ deployment**  
**current v1 ≠ rewritten by v2**

---

## 2. Current candidate-content authority remains v1

Until the asset gate in this document closes, the active first-production policy remains:

`alpha_genin_roster_first_production_content_v1`

Its existing 13 Genin replacement-candidate universe and existing leader/teacher universe remain valid for current runtime work.

Do not mutate that policy in place.

Historical snapshots created under v1 must remain interpretable as v1 snapshots after a future expanded policy is published.

The commissioned 25-row expansion will be introduced through a **new versioned candidate-content authority** after production-ready collectible and `uiPortrait` projection is complete.

---

## 3. Exact 25 admitted expansion IDs

The intended full-wave expansion is exactly:

1. `genin_hashirama`
2. `genin_hiruzen`
3. `genin_mito`
4. `genin_tsunade`
5. `genin_sakumo`
6. `genin_duy`
7. `genin_guy`
8. `genin_rin`
9. `genin_dan`
10. `genin_nawaki`
11. `genin_shizune`
12. `genin_yamato`
13. `genin_sai`
14. `genin_kagami`
15. `genin_danzo`
16. `genin_torifu`
17. `genin_inoichi`
18. `genin_choza`
19. `genin_shibi`
20. `genin_tsume`
21. `genin_hiashi`
22. `genin_yugao`
23. `genin_hayate`
24. `genin_mukai`
25. `genin_kosuke`

All stable-person linkage, Stats and Base PL remain owned by the Registry / PL document rather than duplicated here.

---

## 4. Current source/asset facts

Source commit:

`5b75fa2c8d3f1a3841dc0007523116a22a55b09d` — `brand new genin cards`

Current Registry audit establishes:

- 23/25 intended expansion targets have physically present collectible-card binaries with no row-specific rejection yet recorded;
- `Assets/Genin/genin_choza.png` exists but remains **rejected / non-authoritative**;
- `genin_kosuke` is semantically admitted but its intended collectible card path is not yet backed by an approved binary;
- the same upload changed existing-v1 `Assets/Genin/genin_menma.png`; Menma is not one of the 25 expansion rows and no new identity/PL/admission is created by that same-path binary change;
- the expansion does not yet have a complete explicit 1024×1024 frameless `uiPortrait` projection.

Therefore physical file presence is not enough to publish the expanded candidate-content policy.

---

## 5. Asset gate

The next owner is UI / Assets through GitHub issue #74.

UI / Assets must publish one exact 25-row production projection/QA authority that closes, for every admitted representation:

- approved `collectibleCard` path;
- collectible physical/QC status;
- approved `uiPortrait` path;
- portrait physical/QC status;
- exact unresolved reason where not ready;
- source/provenance reference where required;
- confirmation that `collectibleCard != uiPortrait` remains preserved.

The asset gate may consume existing physical binaries, but must not infer Registry identity or candidate policy from filenames/folders.

### Chōza

`genin_choza` is semantically admitted, but the current collectible visual is rejected. The rejected binary must not become production authority by mere source presence.

If a new visual is required, UI / Assets should route the exact visual-authoring need to Character Creation / Visuals directly rather than asking Stephen to relay it.

### Kosuke

`genin_kosuke` is semantically admitted but has no approved collectible binary under the expected projection. No path or art may be fabricated.

If missing, UI / Assets should route only this exact visual-authoring need to Character Creation / Visuals.

### Menma incidental same-path change

The `genin_menma.png` change from the 25-file upload is outside the 25-row semantic admission set.

UI / Assets must reconcile whether the binary is an approved visual supersession under the existing `genin_menma` representation.

It must **not** create a new Menma identity, Base PL package or candidate row.

### uiPortraits

Every newly playable candidate row requires an explicit standalone 1024×1024 frameless `uiPortrait` projection.

Do not satisfy this by cropping collectible-card art.

---

## 6. Full-wave activation decision

For this Alpha content pass, CE chooses **full-wave activation** rather than silent partial promotion.

The future v2 candidate-content authority will contain the intended 25-row expansion only after all 25 rows are production-ready under the asset gate.

Do not silently omit Chōza, Kosuke or another unresolved row while still describing the policy as the full commissioned expansion.

If one row proves impossible to close before Alpha, return that exact blocker to CE. A narrower staged candidate version would require a new explicit content decision and version marker; it cannot be inferred by omission.

This decision does **not** block already-authorised v1 runtime work.

---

## 7. Candidate-policy sequencing after asset closure

Required sequence:

```text
Registry/PL semantic admission
    CLOSED — fc8281fd...
        ↓
UI/Assets exact production projection + remediation
    ACTIVE — #74
        ↓
CE publishes NEW versioned expanded candidate-content authority
        ↓
Coding consumes exact expanded policy through existing geninRosterTransition machinery
        ↓
runtime / save-load / browser / Golden validation
```

No new roster subsystem is authorised.

The existing candidate snapshot contract, same-person collision rules, causal assigned-elsewhere/unavailable handling, retention separation, 2-Genin replacement floor and 1 eligible leader/teacher floor remain unchanged unless a separate durable authority explicitly changes them.

---

## 8. Mukai boundary

`genin_mukai` is now semantically admitted under Registry/PL authority.

His single visible Byakugan remains representation/possession fact only.

Candidate inclusion, ownership, assignment or deployment does not grant:

- Access;
- Competence;
- Power;
- Mastery;
- active Byakugan Stat modifiers;
- Battle actions/effects;
- hidden PL.

Any later capability activation remains with the proper Progression/Bloodline/Combat owners.

---

## 9. Non-collapse and regression guard

Preserve throughout the next steps:

- persistent person ≠ representation;
- representation ≠ Registry admission;
- Registry admission ≠ candidate inclusion;
- candidate universe ≠ snapshot;
- candidate eligibility ≠ ownership;
- ownership ≠ assignment ≠ deployment;
- same person with multiple representations ≠ multiple embodied people;
- card filename/path ≠ identity authority;
- physical file ≠ approved projection;
- rejected Chōza binary ≠ approved collectible;
- Kosuke semantic admission ≠ fabricated asset;
- same-path Menma visual change ≠ new identity;
- `collectibleCard` ≠ `uiPortrait`;
- 1024×1024 portrait master remains binding;
- UI/Assets GREEN ≠ runtime/browser/Golden GREEN;
- v2 publication ≠ historical v1 snapshot rewrite.

---

## 10. Current coordination state

Registry / PL / Rank work from #70 is consumed.

**WAITING ON UI / ASSETS via #74.**

When #74 returns GREEN with the exact 25-row production projection, CE will publish the new versioned candidate-content authority and route the minimum Coding consumption directly.

Stephen relay: **NONE**.
