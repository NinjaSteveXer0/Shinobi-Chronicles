# Shinobi Chronicles — Stale Eight-Card PL Tail Reconciliation

**Date:** 2026-09-13  
**Owner:** PL / Registry / Rank  
**Status:** **BINDING SUCCESSOR RECONCILIATION — RETIRED EIGHT-CARD AUDIT TAIL CLOSED**  
**Parent successor audit:** `Documentation/PL_Registry_Rank_Max_Length_Successor_Deep_Sweep_Audit_2026-09-13.md`  
**Current `main` inspected before writeback:** `00033ae0d225e221aa2ee1e6e23f86a95ac8dc91`

## 1. Purpose

The retired PL / Registry / Rank workspace preserved an eight-item list described as physical cards with **likely missing PL**:

1. Genin Hinata;
2. Sharingan Mikoto;
3. Reika;
4. Jōnin Kushina;
5. Kage Minato;
6. Mizukage’s Aide Obito;
7. Jōnin Commander Shikaku;
8. Sannin Jiraiya.

That wording is no longer safe as a production backlog. It mixed three different states:

- representations that are already live and numerically closed;
- authored candidate/presentation representations that are not current live-production Registry rows;
- physical assets for which no separate durable Registry/Base-PL package is currently established.

This reconciliation closes that stale tail without inventing Stats, promoting asset filenames into Registry authority, or changing the current live **97 Characters + 18 Entities = 115** production gate.

Canonical boundary:

> **physical art != Registry admission != Base calibration != candidate inclusion != ownership != runtime activation**

and:

> **candidate-content authority != live-production Registry authority != automatic PL/Stats authority**

---

## 2. Current disposition

| Historical tail item | Current machine-facing referent / evidence | Current PL / Registry disposition | Live-115 effect |
|---|---|---|---|
| Genin Hinata | authored candidate representation `genin_hinata`; physical Genin art exists | **STAGED / NON-LIVE.** Candidate-content identity is durable, but no separate seven-Stat/Base-PL package is established by the evidence consumed here. Candidate inclusion itself grants no PL/Stats. | none |
| Sharingan Mikoto | physical `Assets/Transformations/sharingan_mikoto.png`; current live Registry has `genin_mikoto` as the calibrated Mikoto Genin row | **PRESENTATION/EXPRESSION ASSET ONLY UNDER CURRENT EVIDENCE.** No separate live Registry/Base package for `sharingan_mikoto` is established. Do not clone `genin_mikoto` PL23 into a second Base identity merely because transformation art exists. | none |
| Reika | physical card/portrait evidence; prior PL audit explicitly found no durable Registry/Stats/Base-PL authority | **UNADMITTED / UNCALIBRATED UNDER CURRENT DURABLE EVIDENCE.** Preserve as source/presentation evidence only until an actual runtime/persistent caller requires Registry authority. | none |
| Jōnin Kushina | authored leader/teacher candidate representation `jonin_kushina`; physical Jōnin art exists | **STAGED / NON-LIVE.** Candidate identity is durable; no separate Base calibration is established by the evidence consumed here. Do not inherit Academy Kushina Stats/PL automatically. | none |
| Kage Minato | physical `Assets/Kage/kage_minato.png` | **ASSET/PRESENTATION ONLY UNDER CURRENT EVIDENCE.** No current live-production Registry row or separate seven-Stat/Base-PL authority was found in the current successor/live ledger chain. Do not infer PL or formal Rank from the Kage title/card. | none |
| Mizukage’s Aide Obito | live Registry row `mizukage_aide_obito` | **CLOSED / LIVE.** Base Stats `76 / 72 / 68 / 58 / 70 / 66 / 74`; Formula-v1.0 Base PL **74**. The physical card was a later presentation addition, not a missing calibration. | already inside 115 |
| Jōnin Commander Shikaku | authored leader/teacher candidate representation `jonin_shikaku`; physical Jōnin art exists | **STAGED / NON-LIVE.** Candidate identity is durable; no separate Base calibration is established by the evidence consumed here. Card wording `Jōnin Commander` does not grant any formal-rank truth beyond separately authored Rank authority. | none |
| Sannin Jiraiya | live Registry row `sannin_jiraiya` | **CLOSED / LIVE.** Base Stats `104 / 92 / 78 / 76 / 98 / 70 / 108`; Formula-v1.0 Base PL **103**. The later physical card did not create the numerical package. | already inside 115 |

---

## 3. Candidate-representation boundary

Current first-production Genin-roster candidate authority explicitly includes:

- `genin_hinata` in the teammate universe;
- `jonin_kushina` in the leader/teacher universe;
- `jonin_shikaku` in the leader/teacher universe.

That same authority explicitly preserves that candidate inclusion does **not** grant PL/Stats, ownership, Rank or Battle deployment and that the candidate universe must not be derived from the Registry, Rank scans, asset folders or filenames.

Therefore these three rows are **real authored representation addresses** but their candidate status is not evidence that they are live-production Character rows or already calibrated Battle packages.

No new Stats are invented in this reconciliation.

---

## 4. Sharingan Mikoto boundary

Current live production authority contains:

`genin_mikoto` — Base Stats `24 / 20 / 19 / 11 / 14 / 22 / 21` — Base PL **23** — formal Rank `genin`.

Separate physical art exists at:

`Assets/Transformations/sharingan_mikoto.png`.

The asset upload itself does not establish a second persistent person, a second live Registry representation, or a second Base PL package.

Until exact Registry authority says otherwise:

- `sharingan_mikoto` physical art does not create a new production row;
- do not duplicate `genin_mikoto` as another person;
- do not copy PL23 automatically into a second Base package;
- do not add a hidden/direct Sharingan PL bonus;
- any future dedicated Sharingan representation must be separately admitted/calibrated, or exact Bloodline/Effective-state authority must define it as a state of the existing participant.

This preserves:

**person != representation != expression state != physical art**.

---

## 5. Reika boundary

A prior PL / Registry / Rank source audit explicitly recorded:

> physical Reika card exists, but no durable Registry/Stats/Base-PL authority was found.

No later current live-production calibration/admission for Reika was recovered during this successor re-audit.

That is not permission to guess a package from artwork, Story importance, another character, or an old role label.

If a future Alpha/runtime caller requires Reika as a persistent Battle-capable participant, return that exact caller/provenance to PL / Registry / Rank and author the minimum legitimate identity + seven-Stat Base package then.

Until such a caller exists, this is **not an Alpha blocker**.

---

## 6. Kage Minato boundary

Current source history proves a physical card at:

`Assets/Kage/kage_minato.png`.

The current reconstructed/live 97-Character ledger does not establish a `kage_minato` production row, and no separate durable seven-Stat/Base-PL package was recovered for this representation during this audit.

Therefore:

- physical Kage Minato art remains presentation evidence;
- `Kage` remains title/office/presentation language, not automatic `formalRank` or PL authority;
- Stats/PL may not be inherited from another Minato representation;
- no live-cardinality change is authorised.

---

## 7. Already-closed rows

### Mizukage’s Aide Obito

Current successor/live ledger:

- ID: `mizukage_aide_obito`
- Stats N/T/B/F/K/G/S: `76 / 72 / 68 / 58 / 70 / 66 / 74`
- Base PL: **74**
- formula difference: `0`

The later asset commit adding `Others/mizukage_aide_obito.png` does not reopen calibration.

### Sannin Jiraiya

Current successor/live ledger:

- ID: `sannin_jiraiya`
- Stats N/T/B/F/K/G/S: `104 / 92 / 78 / 76 / 98 / 70 / 108`
- Base PL: **103**
- formula difference: `0`

The later asset commit adding `Assets/Sannin/sannin_jiraiya.png` does not reopen calibration.

These two items are removed from the old “likely missing PL” tail completely.

---

## 8. Alpha consequence

The eight-item historical tail is **CLOSED AS A STALE AUDIT BACKLOG**.

That does **not** mean every item is now calibrated/live. It means every item now has an explicit safe classification:

- live + calibrated: **2** (`mizukage_aide_obito`, `sannin_jiraiya`);
- authored candidate representation, staged/non-live, no Base package proven here: **3** (`genin_hinata`, `jonin_kushina`, `jonin_shikaku`);
- asset/presentation/referent only under current evidence, no live Base package proven: **3** (`sharingan_mikoto`, Reika, Kage Minato).

No current live 115 Registry correction follows.

No current Alpha blocker follows solely from these six non-live/non-calibrated rows.

If any of those six becomes an actual live-production/Battle-capable admission, PL / Registry / Rank must first publish exact stable representation authority where needed plus seven Base Stats and Formula-v1.0 Base PL. Existing representations of the same fictional person do not transfer their Stats/PL automatically.

---

## 9. Final lock

> **The old eight-card “likely missing PL” list is retired. Do not treat it as an instruction to bulk-calibrate art. Two rows were already closed live representations; three are candidate representations without PL authority from candidacy alone; three remain asset/presentation evidence without a proven live Base package. Current production remains 97 Characters + 18 Entities = 115.**

Routing: **RECORD ONLY**
