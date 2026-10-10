# Shinobi Chronicles — Kamatari PL82 Formula Calibration

**Date:** 2026-10-07  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING REGISTRY / PL CLOSURE — ISSUE #258 CONSUMED**  
**Registry identity:** `wr_kamatari`  
**Display:** Kamatari  
**Classification:** Summon  
**Locked Base PL:** **82**

## 1. Scope

This closure supplies the exact Formula-v1.0-valid seven-Stat row required by Combat for Kamatari's already-locked Base PL82.

It does not reopen or alter Combat-owned Kamatari mechanics, action numerics, targeting, access, summon semantics, ownership, assignment, deployment, or presentation.

## 2. Canonical Stat row — CLOSED

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Kamatari (`wr_kamatari`) Base Stats:

`74 / 78 / 88 / 24 / 48 / 30 / 70`

Breakdown:

- Ninjutsu: **74**
- Taijutsu: **78**
- Bukijutsu: **88**
- Fūinjutsu: **24**
- Kinjutsu: **48**
- Genjutsu: **30**
- Stamina: **70**

Base PL:

**82**

## 3. Formula proof

Canonical PL Formula v1.0:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

For Kamatari:

- highest Stat = `88`
- top three Stats = `88 / 78 / 74`
- top-three average = `80`
- all-seven sum = `412`
- all-seven average = `58.857142857...`

Formula:

`0.60 × 88 = 52.8`

`0.25 × 80 = 20`

`0.15 × 58.857142857... = 8.828571428...`

Raw PL:

`52.8 + 20 + 8.828571428... = 81.628571428...`

Rounded Base PL:

**82**

No hidden or direct PL bonus is used.

## 4. Historical invalid row retired

The prior candidate/proxy row:

`74 / 78 / 82 / 24 / 48 / 30 / 70`

is not Formula-valid for locked PL82.

Its Formula result is:

- highest = `82`
- top-three average = `78`
- all-seven average = `58`
- raw PL = `77.4`
- rounded PL = **77**

That row remains archaeology only and must not be consumed as current PL82 authority.

## 5. Calibration rationale

The correction is deliberately minimal:

- Ninjutsu remains **74**;
- Taijutsu remains **78**;
- Fūinjutsu remains **24**;
- Kinjutsu remains **48**;
- Genjutsu remains **30**;
- Stamina remains **70**;
- only Bukijutsu changes, from **82 -> 88**.

Bukijutsu is the correct domain to carry the required Formula correction because current Combat authority already defines Kamatari through a weapon-forward sickle/scythe combat identity. Raising unrelated Stats merely to reach the arithmetic target would create broader semantic drift without evidence.

This is therefore a Formula repair, not a capability redesign.

## 6. Combat boundary

PL / Registry / Rank does not alter the existing Combat package.

Preserve current Combat authority including its already-closed actions and numerics. In particular, this calibration does not reinterpret Attack PL as a Stat, does not grant a hidden weapon bonus, and does not create new Conditions, Stun, targeting rights, actions, or summon access.

Combat may now consume:

- Registry ID: `wr_kamatari`
- Base Stats: `74/78/88/24/48/30/70`
- Base PL: **82**

## 7. Runtime / validation boundary

This document closes the Registry/PL numeric dependency only.

It does **not** claim:

- Coding implementation;
- runtime admission;
- save/load validation;
- browser validation;
- Golden/regression GREEN.

Those statuses remain separately owned and must be proven independently.

## Final lock

> **Kamatari (`wr_kamatari`) has Base Stats `74/78/88/24/48/30/70` in canonical Ninjutsu/Taijutsu/Bukijutsu/Fūinjutsu/Kinjutsu/Genjutsu/Stamina order. Formula v1.0 yields raw PL `81.628571428...`, which rounds to locked Base PL82. The historical `74/78/82/24/48/30/70` row yields PL77 and is retired as formula-invalid archaeology. No hidden PL bonus or Combat-semantic change is authorised.**
