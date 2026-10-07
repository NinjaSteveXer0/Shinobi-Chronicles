# Shinobi Chronicles — Academy-Origin Base Stat Identity Recalibration

**Date:** 2026-10-07  
**Owner:** PL / Registry / Rank  
**Incoming handoff:** #582  
**Parent coordination:** #519  
**Upstream firewall:** `Documentation/Coordination/Academy_Identity_Post15_Curriculum_Starting_Skill_and_Combat_Domain_Firewall_2026-10-07.md`  
**Status:** **BINDING REGISTRY / PL CLOSURE ON MERGE TO `main`**

## 1. Scope

This closes #582 by recalibrating the ten Academy-Origin Base Stat identities against canonical PL Formula v1.0 while preserving the CE firewall between:

- Academy-Origin **Base identity / Base Stats**;
- post-15 curriculum and learned **Knowledge / Competence**;
- starting-Skill persistence packages;
- Combat-owned mechanics, action numerics and equipment semantics.

The audit is representation-first. It does **not** manufacture artificial non-overlap between Origins and does **not** inflate Stats merely to preserve a stale displayed PL.

Owner review after the first #582 pass identified two additional under-represented Academy identities: **Hinata** and **Mirai**. Their rows are therefore deliberately recalibrated here alongside Menma rather than being preserved merely because they were Formula-valid.

## 2. Canonical Stat and PL authority

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Canonical PL Formula v1.0:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

No hidden or direct PL bonus is authorised.

## 3. Final ten-Origin Base matrix — CLOSED

| Academy Origin | NIN | TAI | BUK | FŪI | KIN | GEN | STA | Raw Formula PL | Base PL |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **Hinata** | **8** | **13** | **6** | 5 | 5 | **6** | **10** | 11.519047... | **12** |
| Izuno | 10 | 9 | 6 | 5 | 6 | 5 | 8 | 9.300000... | **9** |
| **Mirai** | **9** | **9** | **12** | **6** | **6** | **13** | **10** | 12.109523... | **12** |
| **Menma** | 10 | 8 | 6 | 5 | **13** | 7 | 11 | 11.919047... | **12** |
| Kushina | 8 | 9 | 5 | 8 | 5 | 5 | 14 | 12.140476... | **12** |
| Kurenai | 9 | 7 | 8 | 6 | 5 | 14 | 8 | 12.204761... | **12** |
| Iwabee | 14 | 11 | 13 | 6 | 5 | 5 | 14 | 13.273809... | **13** |
| Metal Lee | 6 | 13 | 9 | 5 | 5 | 5 | 14 | 12.621428... | **13** |
| Kakashi | 16 | 14 | 15 | 8 | 9 | 10 | 14 | 15.192857... | **15** |
| Obito | 11 | 12 | 10 | 5 | 5 | 6 | 13 | 12.128571... | **12** |

## 4. Deliberate Base-identity recalibrations

### 4.1 Hinata — Hyūga / Taijutsu identity strengthened

Pre-audit Hinata:

`6 / 9 / 5 / 5 / 5 / 5 / 7` → raw Formula PL `8.133333...` → **PL8**.

That row technically satisfied the Formula but under-represented the intended Academy Hinata identity. Taijutsu 9 was only a mild lead over an otherwise very low row and did not make her Hyūga physical/chakra-control foundation read as a meaningful strength.

Final Hinata:

`8 / 13 / 6 / 5 / 5 / 6 / 10` → raw Formula PL `11.519047...` → **PL12**.

Changes:

- Ninjutsu `6 → 8`;
- Taijutsu `9 → 13`;
- Bukijutsu `5 → 6`;
- Genjutsu `5 → 6`;
- Stamina `7 → 10`;
- Fūinjutsu and Kinjutsu remain 5.

The row keeps **Taijutsu 13** as the unmistakable defining Base axis, with Stamina 10 and Ninjutsu 8 as supporting foundations. This strengthens Hinata without turning her into a broad Kakashi-style prodigy or inventing unrelated Fūinjutsu/Kinjutsu competence.

### 4.2 Mirai — Genjutsu / Bukijutsu dual identity strengthened

Pre-audit Mirai:

`8 / 8 / 9 / 5 / 6 / 7 / 8` → raw Formula PL `8.576190...` → **PL9**.

That row was too generalist to communicate the intended Mirai identity. Bukijutsu 9 barely led the row, while Genjutsu 7 was not meaningfully specialist at all.

Final Mirai:

`9 / 9 / 12 / 6 / 6 / 13 / 10` → raw Formula PL `12.109523...` → **PL12**.

Changes:

- Ninjutsu `8 → 9`;
- Taijutsu `8 → 9`;
- Bukijutsu `9 → 12`;
- Fūinjutsu `5 → 6`;
- Genjutsu `7 → 13`;
- Stamina `8 → 10`;
- Kinjutsu remains 6.

The final row makes **Genjutsu 13** the lead axis and **Bukijutsu 12** the clear second specialist lane. Ninjutsu/Taijutsu 9 and Stamina 10 give her a credible Academy combat foundation without erasing Kurenai's stronger Genjutsu 14 specialist spike.

### 4.3 Menma — Kinjutsu identity strengthened

Pre-audit Menma:

`10 / 8 / 6 / 5 / 9 / 7 / 11` → raw Formula PL `10.3` → **PL10**.

#519 / #582 specifically identified Menma's Kinjutsu lane as under-represented, with owner direction accepting **12–13 Kinjutsu** as plausible and asking whether Kinjutsu should become his strongest or near-strongest rare-potential axis.

Final Menma:

`10 / 8 / 6 / 5 / 13 / 7 / 11` → raw Formula PL `11.919047...` → **PL12**.

Only Kinjutsu changes:

`9 → 13`

Kinjutsu 13 is now Menma's strongest Base axis, above Stamina 11 and Ninjutsu 10, without unrelated Stat inflation.

These three recalibrations are **Base-identity corrections**, not later-progression rewards and not Combat bonuses.

## 5. Remaining seven rows remain Stat-stable

The audit does **not** change Izuno, Kushina, Kurenai, Iwabee, Metal Lee, Kakashi or Obito. Their existing Base distributions remain coherent after owner review.

- **Izuno:** Ninjutsu 10 / Taijutsu 9 preserves a mixed physical-ninjutsu base.
- **Kushina:** Stamina 14 remains the defining Base spike, with Taijutsu 9 and Ninjutsu/Fūinjutsu 8 behind it.
- **Kurenai:** Genjutsu 14 remains an unmistakable specialist spike.
- **Iwabee:** Ninjutsu 14 / Stamina 14 / Bukijutsu 13 expresses his durable Earth/weapon-forward Academy identity.
- **Metal Lee:** Stamina 14 / Taijutsu 13 remains a clear physical-development identity.
- **Kakashi:** 16 / 14 / 15 across Ninjutsu/Taijutsu/Bukijutsu preserves the intentionally broad Academy-prodigy package.
- **Obito:** Stamina 13 / Taijutsu 12 / Ninjutsu 11 gives a coherent durable physical-ninjutsu base.

## 6. Formula-conformance corrections to stale PL labels

The Stat audit also exposed two stale displayed PL labels that must not be preserved by changing otherwise-valid Stats:

- **Kushina:** existing row computes raw `12.140476...` → **PL12**, not PL13.
- **Kurenai:** existing row computes raw `12.204761...` → **PL12**, not PL13.

Formula-valid final Base PLs:

- Hinata **12**;
- Izuno **9**;
- Mirai **12**;
- Menma **12**;
- Kushina **12**;
- Kurenai **12**;
- Iwabee **13**;
- Metal Lee **13**;
- Kakashi **15**;
- Obito **12**.

Changed rows:

- Hinata: **PL8 → PL12** because the Base Stat row is deliberately strengthened;
- Mirai: **PL9 → PL12** because the Base Stat row is deliberately strengthened;
- Menma: **PL10 → PL12** because Kinjutsu changes 9 → 13.

## 7. Collision / overlap audit

No harmful collision is created.

- Two Origins may legitimately be strong in the same Stat.
- Base Stat identity does not reserve a Stat exclusively to one character.
- Hinata's Taijutsu 13 may equal Metal Lee's Taijutsu 13 because their complete representations are different; equal lane values do not make them equivalent characters.
- Mirai Genjutsu 13 remains below Kurenai Genjutsu 14 while Mirai's Bukijutsu 12 creates a materially different dual-specialist shape.
- Menma Kinjutsu 13 remains a separate rare-potential axis rather than an overall-PL claim.
- Starting-Skill specialty does not automatically author Base Stats; these changes are explicit owner-approved Base representation corrections.
- Kakashi's broad high baseline coexists with narrower specialist identities rather than invalidating them.

The correct safeguard is **causal provenance and representation fidelity**, not forced numerical non-overlap.

## 8. Runtime / implementation boundary

This document closes the Registry / PL design dependency only.

It does **not** claim:

- Coding implementation;
- runtime admission;
- save/load migration;
- browser validation;
- Golden/regression GREEN.

Any consumer must use this final matrix as Base authority and independently prove implementation/runtime status.

## Final lock

> **The ten Academy-Origin Base Stat matrix above is the binding PL / Registry authority on merge. Hinata, Mirai and Menma receive deliberate Base-identity recalibrations: Hinata becomes a Taijutsu-led PL12 Hyūga prospect; Mirai becomes a Genjutsu/Bukijutsu dual-specialist PL12 prospect; Menma becomes a Kinjutsu-led PL12 prospect. The remaining seven Stat rows stay unchanged. Kushina and Kurenai's stale PL13 labels are corrected to Formula-valid PL12 rather than inflating Stats to preserve those labels. Starting Skills, later curriculum and Combat mechanics do not retroactively rewrite Base Stats. Overlap between Origins is permitted when representation supports it.**
