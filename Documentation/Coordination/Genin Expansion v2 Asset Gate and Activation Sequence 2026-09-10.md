# Shinobi Chronicles — Genin Expansion v2 Asset Gate and Activation Sequence

**Date:** 2026-09-10  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING ALPHA COORDINATION — REGISTRY/PL CLOSED / ASSET PROJECTION GATE ACTIVE / COMBAT-READINESS GATE QUEUED / V2 CANDIDATE AUTHORITY NOT YET PUBLISHED**  
**Source handoff:** GitHub issue #73; sequencing amendment from #81; capability correction from #85  
**Upstream:** #70 ← #69

## 1. Purpose

This document consumes the completed 25-row Registry / PL / Rank admission and fixes the production sequence for the commissioned historical-Konoha Genin expansion.

Registry/PL authority is closed in:

`Documentation/Registry/Alpha Genin Expansion 25 Row Registry and PL Admission 2026-09-10.md`

commit:

`fc8281fd81c92cf47e63c20dd097b7402d17a492`

All 25 rows now have exact stable-person linkage, exact `genin_*` representation IDs, baseline formal Rank, seven Base Stats and Formula-v1.0 Base PL.

That closure does **not** activate the rows in the current candidate universe by itself. Issue #81 further establishes that production-ready Assets also do **not** prove Battle readiness: the 25 rows must pass an explicit Combat / Skills readiness gate before CE publishes them as playable v2 teammate candidates.

Issue #85 corrects one capability example inside that gate: `genin_hashirama` and `genin_yamato` **possess Wood Release from representation start**, but possession does not grant executable Access, Competence, Power, Mastery or prepared Wood Release Skills.

Preserve:

**Registry admission ≠ production activation**  
**Registry admission ≠ candidate inclusion**  
**Assets readiness ≠ Combat readiness**  
**Stats ≠ Skills**  
**possession ≠ Access ≠ Competence ≠ Power ≠ Mastery**  
**candidate universe ≠ concrete snapshot**  
**candidate eligibility ≠ ownership ≠ assignment ≠ deployment**  
**current v1 ≠ rewritten by v2**

---

## 2. Current candidate-content authority remains v1

Until both the asset gate and Combat-readiness gate in this document close, the active first-production policy remains:

`alpha_genin_roster_first_production_content_v1`

Its existing 13 Genin replacement-candidate universe and existing leader/teacher universe remain valid for current runtime work.

Do not mutate that policy in place.

Historical snapshots created under v1 must remain interpretable as v1 snapshots after a future expanded policy is published.

The commissioned 25-row expansion will be introduced through a **new versioned candidate-content authority** only after production-ready collectible / `uiPortrait` projection **and** representation-level Battle readiness are both closed.

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

The current active owner is UI / Assets through GitHub issue #74.

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

## 6. Combat / Skills readiness gate — queued behind #74

Issue #81 establishes a second required production gate before the 25-row wave becomes playable.

This gate does **not** interrupt active #74 and does **not** block current-v1 runtime work. It activates after #74 returns to CE.

Before CE publishes the expanded candidate-content authority, CE must inspect current durable Combat / Skills / Progression / Bloodline authority for all 25 admitted representations and determine whether each row has an exact currently legal Alpha Battle repertoire.

The audit must not infer executable capability from:

- seven Base Stats;
- adult/future versions of the same person;
- famous canon reputation;
- clan/lineage name;
- card art or visible eye/state;
- Registry admission;
- candidate eligibility.

Where exact representation-level repertoire authority already exists, consume it rather than duplicating it.

Where it is absent, CE will create **one consolidated SEND NOW Combat / Skills handoff** for the missing rows after #74 closes. Combat may author only the legitimate baseline prepared palette supported by current capability authority. If a particular technique, bloodline, transformation or source requires separate Progression/Bloodline Access, that gate remains authoritative and Combat must not silently grant it.

### Possession / Access correction from #85

For `genin_hashirama` and `genin_yamato`, current authority is now explicit:

```text
capability.wood_release.possessed = true
capability.wood_release.access = false by default
```

Their Wood Release is therefore a **possessed capability/source from representation start**, not an absent capability. However, no Wood Release action is executable until legitimate Development/Bloodline/Progression authority satisfies the Access requirement. Possession alone does not grant starting Wood Release Skills, prepared-palette membership, Competence, Power, Mastery, Stat modifiers or hidden PL.

Binding capability authority:

`Documentation/SC_Combat_Genin_Hashirama_Yamato_Wood_Release_Possession_Access_Boundary_2026-09-10.md`

commit `1bc85d3fb16088da72df9712e0b8494b3d2a3b9a`.

The Alpha text-first catalogue may contain Wood Release techniques, but **catalogue presence ≠ learned/prepared Skill ≠ executable Access**.

Other hard examples remain:

- `genin_mukai` single visible Byakugan remains possession/representation only unless Access is separately authorised;
- `genin_hiashi` lineage/representation does not by itself grant executable active Byakugan;
- `genin_kagami` lineage/representation does not by itself grant executable Sharingan;
- `genin_shibi` does not automatically gain an independently acting kikaichū participant/source package;
- Akimichi / Inuzuka / Yamanaka identity does not create hidden modifiers or Skills.

Battle-readiness closure must identify, for every v2 row, an executable baseline palette or an explicit lawful reason a capability remains unavailable. It does not author ownership, assignment, deployment, Rank, Base Stats or PL.

---

## 7. Full-wave activation decision

For this Alpha content pass, CE chooses **full-wave activation** rather than silent partial promotion.

The future v2 candidate-content authority will contain the intended 25-row expansion only after all 25 rows are production-ready under **both** the asset gate and Combat-readiness gate.

Do not silently omit Chōza, Kosuke or another unresolved row while still describing the policy as the full commissioned expansion.

If one row proves impossible to close before Alpha, return that exact blocker to CE. A narrower staged candidate version would require a new explicit content decision and version marker; it cannot be inferred by omission.

This decision does **not** block already-authorised v1 runtime work.

---

## 8. Candidate-policy sequencing

Required sequence:

```text
Registry/PL semantic admission
    CLOSED — fc8281fd...
        ↓
UI/Assets exact production projection + remediation
    ACTIVE — #74
        ↓
CE audits exact representation-level Combat/Skills authority
    including possession-vs-Access boundaries from #85
        ↓
Combat/Skills closes missing baseline prepared palettes
    QUEUED — activation triggered only after #74 returns
        ↓
CE publishes NEW versioned expanded candidate-content authority
        ↓
Coding consumes exact expanded policy + exact Battle packages
    through existing geninRosterTransition / Battle machinery
        ↓
runtime / save-load / browser / Golden validation
```

No new roster system and no generic capability-inference system are authorised.

The existing candidate snapshot contract, same-person collision rules, causal assigned-elsewhere/unavailable handling, retention separation, 2-Genin replacement floor and 1 eligible leader/teacher floor remain unchanged unless a separate durable authority explicitly changes them.

---

## 9. Mukai boundary

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

## 10. Non-collapse and regression guard

Preserve throughout the next steps:

- persistent person ≠ representation;
- representation ≠ Registry admission;
- Registry admission ≠ candidate inclusion;
- Registry admission ≠ Combat readiness;
- Assets GREEN ≠ Combat readiness;
- Stats ≠ Skills;
- possession ≠ Access ≠ Competence ≠ Power ≠ Mastery;
- adult/future repertoire ≠ Genin repertoire;
- card art ≠ Skill authority;
- catalogue presence ≠ learned/prepared Skill;
- Base PL ≠ active capability projection;
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
- Combat closure ≠ ownership/assignment/deployment authority;
- UI/Assets GREEN ≠ runtime/browser/Golden GREEN;
- Combat/Skills GREEN ≠ runtime/browser/Golden GREEN;
- v2 publication ≠ historical v1 snapshot rewrite.

---

## 11. Current coordination state

Registry / PL / Rank work from #70 is consumed.

**WAITING ON UI / ASSETS via #74.**

Issue #81 is consumed as a sequencing correction: the Combat / Skills readiness gate is queued immediately behind #74 and becomes the next CE activation step before v2 publication.

Issue #85 is consumed as a capability-state correction within that queued gate: Hashirama/Yamato Wood Release possession is YES from representation start; executable Access remains gated.

When #74 returns GREEN, CE will **not** publish v2 immediately. CE will first inspect exact repertoire authority and route one consolidated Combat / Skills package only for rows that still need closure. After that gate closes, CE may publish the versioned expanded candidate-content authority and route the minimum Coding consumption directly.

Stephen relay: **NONE**.
