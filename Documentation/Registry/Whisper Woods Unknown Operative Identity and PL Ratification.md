# Shinobi Chronicles — Whisper Woods Unknown Operative Identity and PL Ratification

**Date:** 2026-09-07  
**Status:** **PL / REGISTRY / RANK — IDENTITY + BASE CALIBRATION CLOSED**  
**Source handoff:** GitHub issue #6  
**Parent CE authority:** `Documentation/Coordination/Unknown Operative Projection and Lethal Encounter Coordination Contract.md`

---

## 1. Stable Registry identity

Registry ratifies the exact stable Enemy/Opposition identity:

`arc1_m1_unknown_operative`

Classification:

**Enemy/Opposition — persistent human operative**

This is one factual person, not a generic spawn and not the reusable observer projection.

The ID remains stable through later:

- identity/faction reveal;
- detention;
- injury;
- escape;
- survival;
- death;
- later recurrence if and only if the same person factually survived.

Later Knowledge/presentation changes must not mutate this stable ID.

This identity does **not** increment the collectible Character/Entity production gate and is not player-obtainable merely because it has Registry authority. A future collectible representation would require separate explicit Registry/Assets/Acquisition admission authority.

---

## 2. Observer-safe presentation separation

CE/Codex presentation authority remains:

`observer_projection_unknown_operative`

Player-facing concealed label:

**UNKNOWN OPERATIVE**

That projection is presentation-only and carries no Stats, PL, capability, persistence or participant identity.

Preserve:

**observer-safe projection ≠ stable participant identity**

**presentation reveal ≠ Registry identity mutation**

**Enemy/Opposition identity ≠ collectible admission**

---

## 3. Formal Rank / affiliation metadata

Formal Rank:

**NOT AUTHORISED / UNKNOWN**

Registry does not infer a shinobi Rank from Base PL, combat competence, mystery, clothing, affiliation or narrative importance.

Affiliation:

**concealed / not player-facing under current Knowledge state**

No hidden faction/name truth is encoded into the stable ID or default presentation.

---

## 4. Base Stats and Base PL

Canonical seven-Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Ratified Base Stats:

`58 / 66 / 54 / 38 / 46 / 56 / 62`

Named fields:

- Ninjutsu: **58**
- Taijutsu: **66**
- Bukijutsu: **54**
- Fūinjutsu: **38**
- Kinjutsu: **46**
- Genjutsu: **56**
- Stamina: **62**

Formula v1.0:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

Calculation:

- highest Stat = `66`
- top-three average = `(66 + 62 + 58) / 3 = 62`
- all-seven average = `(58 + 66 + 54 + 38 + 46 + 56 + 62) / 7 = 54.285714...`
- raw PL = `39.6 + 15.5 + 8.142857... = 63.242857...`

Canonical Base PL:

# **63**

No direct PL bonus is granted for mystery, narrative importance, concealed affiliation, hostility, morality or plot role.

---

## 5. Calibration rationale / relative band

The authored factual constraints require a participant materially above a fresh Genin's ordinary one-on-one capability while remaining defeatable by a legitimate Jōnin-level leader plus capable allies under an authored encounter.

PL63 satisfies that requirement without introducing narrative invulnerability or retired encounter multipliers.

The Stat shape deliberately supports the authored wrist-break fact through strong Taijutsu and overall combat competence while avoiding invention of a hidden faction-specific bloodline, transformation or forbidden package.

The wrist-break interaction itself remains Combat/action authority. Registry does not convert that scene beat into a free damage multiplier or instant-win rule.

Current comparison context already places ordinary calibrated opposition such as `rogue_chunin` materially below this band and `elite_missing_nin` below this operative's Base PL. This calibration therefore makes the scene's overwhelming control of the Rogue Shinobi plausible without making the operative an automatic boss-tier participant.

---

## 6. Encounter-state boundary

For the Whisper Woods major-contact occurrence, the canonical starting package is this exact Base package unless Combat/World later authors a legitimate occurrence-owned Effective-State projection.

Do not apply or rename any retired scaling systems:

- random ±10% Battle-entry variation;
- `elite ×1.25`;
- `groupBoss ×8`;
- `guardBoss ×50`;
- player-level scaling;
- map-tier scaling;
- difficulty-label PL bonuses.

Preserve:

**Base participant ≠ encounter occurrence**

**encounter projection ≠ Base mutation**

---

## 7. Life-state / Chronicle continuity boundary

Death, survival, detention, escape and persistent injury attach to the stable participant:

`arc1_m1_unknown_operative`

They do not attach to `observer_projection_unknown_operative`.

The CE contract remains authoritative for lethal/capture persistence semantics. Registry/PL does not redesign those outcomes.

---

## 8. Coding-facing semantic record

```js
{
  id: "arc1_m1_unknown_operative",
  type: "enemy_opposition",
  classification: "persistent_human_operative",
  observerProjectionKey: "observer_projection_unknown_operative",
  defaultObserverLabel: "UNKNOWN OPERATIVE",
  formalRank: null,
  stats: {
    ninjutsu: 58,
    taijutsu: 66,
    bukijutsu: 54,
    fuinjutsu: 38,
    kinjutsu: 46,
    genjutsu: 56,
    stamina: 62
  },
  basePL: 63,
  collectibleProductionGate: false
}
```

Property names may be adapted only to the existing runtime schema. Stable ID, Stat values, Base PL and identity semantics must not be changed by schema convenience.

---

## 9. Final Registry status

- stable Enemy/Opposition ID: **CLOSED — `arc1_m1_unknown_operative`**
- seven Stats: **CLOSED — `58/66/54/38/46/56/62`**
- Base PL: **CLOSED — 63**
- formal Rank: **not authorised / unknown**
- collectible Character/Entity admission: **NO**
- observer projection: **separate CE/Codex presentation authority**
- Combat capability/action package: **DOWNSTREAM OWNER — COMBAT / SKILLS / ITEMS / WEAPONS**
- new PL/Registry blocker before Combat begins: **NONE**

> **Registry/PL is closed for the Whisper Woods Unknown Operative. Combat may now author the exact confrontation package against PL63 authority.**
