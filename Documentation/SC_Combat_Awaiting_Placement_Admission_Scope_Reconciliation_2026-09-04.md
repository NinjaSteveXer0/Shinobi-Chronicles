# Shinobi Chronicles — Combat Awaiting-Placement Admission Scope Reconciliation

Date: 2026-09-04

Status: **COMBAT / CROSS-SYSTEM ADMISSION-BOUNDARY RECONCILIATION**

This document reconciles the Character Creation / Assets admission-scope ruling with the later Combat closure for `kurama_resonance_himawari` without allowing Combat semantics to mutate live Registry or asset authority.

## 1. Current live gate remains authoritative

Current live production gate remains:

**85 Characters + 17 Entities = 102**

No Combat, PL, pairing/bond, Skill, Summon, or awaiting-placement closure changes that count by itself.

Preserve:

- semantic closure ≠ production admission;
- asset approval ≠ production admission;
- production admission ≠ acquisition;
- Registry identity ≠ asset filename;
- awaiting-placement identity ≠ live production membership.

## 2. Assets-selected admission batch

Character Creation / Assets has selected the existing complete awaiting-placement package of:

**12 Characters + 1 Entity/Summon (`nue`)**

Characters:

- `chunin_iruka`
- `sj_anko`
- `chunin_fugaku`
- `chunin_itama`
- `genin_mikoto`
- `genin_orochimaru`
- `akatsuki_kakuzu`
- `sj_kiba`
- `sj_nono`
- `sannin_tenten`
- `sannin_hinata`
- `sannin_sumire`

Entity/Summon:

- `nue`

If and only if that complete Assets-selected batch is later admitted, the live gate becomes:

**97 Characters + 18 Entities = 115**

This batch must not be half-admitted merely because some identities are needed by Coding first.

`sj_kiba` is the valid production identity. Do not create `s_jkiba`.

## 3. `kurama_resonance_himawari` remains separate awaiting-placement scope

`kurama_resonance_himawari` was closed by Registry/PL and Combat after the 12-Character + Nue awaiting-placement package had already been defined.

Its Combat semantics remain authoritative under:

`Documentation/SC_Combat_Kurama_Resonance_Himawari_Closure_2026-09-04.md`

However, the current Character Creation / Assets admission-scope ruling does **not** list `kurama_resonance_himawari` among the selected 13 identities.

Therefore Combat must not treat Himawari's semantic closure as implicit inclusion in the Assets-selected 115 admission package.

Current status:

- `kurama_resonance_himawari` — stable awaiting-placement Character identity;
- Combat semantics — closed;
- PL/Stats — closed;
- live production admission — **not authorised**;
- inclusion in the Assets-selected 12 Characters + Nue batch — **not currently established**;
- exact `collectibleCard` / `uiPortrait` authority — still requires Assets/Registry closure before admission.

If Registry + Assets later explicitly fold Himawari into admission alongside the complete 115 batch, the resulting mathematical production gate would be:

**98 Characters + 18 Entities = 116**

That 116 count is not the current live gate and is not the currently selected Assets admission package.

## 4. Supersession boundary

The admission-count language in the earlier Himawari Combat closure that described a single combined **13 Characters + Nue → 116** awaiting-placement wave is superseded only with respect to **current Assets-selected admission scope**.

It remains valid as a count of all currently known waiting collectible additions if Himawari is considered alongside the existing 12 Characters + Nue, but it must not be read as Asset/Registry permission to admit all fourteen together.

The authoritative release-facing distinction is now:

- **live gate now:** 102;
- **Assets-selected future batch:** 12 Characters + Nue → 115 after complete admission;
- **Himawari:** separately awaiting placement/admission;
- **possible later total if Himawari is also explicitly admitted:** 116.

## 5. Coding boundary

Coding may continue implementing already-closed semantic packages against stable IDs where architecturally appropriate without adding those identities to the live collectible/portrait Registry.

Coding must not:

- flip 102 → 115 before the complete Assets/Registry package is closed;
- flip 102/115 → 116 merely because Himawari Combat semantics exist;
- infer missing portrait/card paths;
- partially admit only the identities immediately needed by runtime work;
- create `s_jkiba`;
- treat semantic implementation as acquisition or roster admission.

Golden Registry/portrait count remains **102** until Registry + Assets explicitly close and hand off a production-admission package.

## 6. Cross-system doctrine

Preserve:

**scope selection ≠ live admission readiness**

**semantic readiness ≠ asset readiness**

**asset readiness ≠ Registry admission**

**Registry admission ≠ acquisition**

**known future roster size ≠ current live gate**

**Combat authority ≠ roster-count authority**
