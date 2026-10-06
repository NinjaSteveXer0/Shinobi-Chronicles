# Shinobi Chronicles — Academy-Origin Base Stat Identity Recalibration

**Date:** 2026-10-07  
**Owner:** PL / Registry / Rank  
**Incoming handoff:** #582  
**Parent coordination:** #519  
**Upstream firewall:** `Documentation/Coordination/Academy_Identity_Post15_Curriculum_Starting_Skill_and_Combat_Domain_Firewall_2026-10-07.md`  
**Status:** **BINDING REGISTRY / PL CLOSURE ON MERGE TO `main`**

## 1. Scope

This closes #582 by recalibrating the ten Academy-Origin Base Stat identities against the canonical PL Formula v1.0 while preserving the CE firewall between:

- Academy-Origin **Base identity / Base Stats**;
- post-15 curriculum and learned **Knowledge / Competence**;
- starting-Skill persistence packages;
- Combat-owned mechanics, action numerics and equipment semantics.

The audit is representation-first. It does **not** manufacture artificial non-overlap between Origins and does **not** inflate Stats merely to preserve a stale displayed PL.

## 2. Canonical Stat and PL authority

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Canonical PL Formula v1.0:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

No hidden or direct PL bonus is authorised.

## 3. Final ten-Origin Base matrix — CLOSED

| Academy Origin | NIN | TAI | BUK | FŪI | KIN | GEN | STA | Raw Formula PL | Base PL |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Hinata | 6 | 9 | 5 | 5 | 5 | 5 | 7 | 8.133333... | **8** |
| Izuno | 10 | 9 | 6 | 5 | 6 | 5 | 8 | 9.300000... | **9** |
| Mirai | 8 | 8 | 9 | 5 | 6 | 7 | 8 | 8.576190... | **9** |
| Menma | 10 | 8 | 6 | 5 | **13** | 7 | 11 | 11.919047... | **12** |
| Kushina | 8 | 9 | 5 | 8 | 5 | 5 | 14 | 12.140476... | **12** |
| Kurenai | 9 | 7 | 8 | 6 | 5 | 14 | 8 | 12.204761... | **12** |
| Iwabee | 14 | 11 | 13 | 6 | 5 | 5 | 14 | 13.273809... | **13** |
| Metal Lee | 6 | 13 | 9 | 5 | 5 | 5 | 14 | 12.621428... | **13** |
| Kakashi | 16 | 14 | 15 | 8 | 9 | 10 | 14 | 15.192857... | **15** |
| Obito | 11 | 12 | 10 | 5 | 5 | 6 | 13 | 12.128571... | **12** |

## 4. Menma correction — deliberate Stat recalibration

The pre-audit Menma row was:

`10 / 8 / 6 / 5 / 9 / 7 / 11` → raw Formula PL `10.3` → **PL10**.

#519 / #582 specifically identified Menma's Kinjutsu lane as under-represented, with owner direction accepting **12–13 Kinjutsu** as plausible and asking whether Kinjutsu should become his strongest or near-strongest rare-potential axis.

The final row therefore changes only Menma's Kinjutsu:

`9 → 13`

Final Menma:

`10 / 8 / 6 / 5 / 13 / 7 / 11` → raw Formula PL `11.919047...` → **PL12**.

**Why 13 rather than 12:** 13 makes the explicitly protected Kinjutsu lane visibly Menma's strongest Base axis, above Stamina 11 and Ninjutsu 10, without inventing unrelated Stat inflation. It stays below Kakashi's Academy Ninjutsu ceiling of 16 and does not turn overlap with other Origins into a prohibited condition.

This is a Base-identity correction, not a later-progression reward and not a Combat bonus.

## 5. The other nine rows remain Stat-stable

The audit does **not** change the other nine Stat rows. Their existing Base distributions already communicate coherent Academy identities, and the upstream firewall forbids using later curriculum / starting-Skill assignment as a reason to rewrite Base Stats.

Representation audit:

- **Hinata:** Taijutsu 9 is the clear highest Base axis; Hyūga physical identity is readable without fake secondary inflation.
- **Izuno:** Ninjutsu 10 / Taijutsu 9 produces a clear mixed physical-ninjutsu base rather than a one-stat caricature.
- **Mirai:** Bukijutsu 9 leads a broad 8/8/8 physical-ninjutsu-stamina support with Genjutsu 7. Her Genjutsu/Bukijutsu starting-skill identity may develop from this base; it does not require retroactive Base-Genjutsu inflation.
- **Kushina:** Stamina 14 is the defining Base spike, with Taijutsu 9 and Ninjutsu/Fūinjutsu 8 behind it. Later/protected Fūinjutsu learning remains distinct from Base identity.
- **Kurenai:** Genjutsu 14 is already an unmistakable specialist spike.
- **Iwabee:** Ninjutsu 14 / Stamina 14 / Bukijutsu 13 expresses his durable Earth/weapon-forward Academy identity without forcing a separate Fūinjutsu Base spike from later curriculum.
- **Metal Lee:** Stamina 14 / Taijutsu 13 remains a clear physical-development identity.
- **Kakashi:** 16 / 14 / 15 across Ninjutsu/Taijutsu/Bukijutsu preserves the intentionally broad Academy-prodigy package; he is not reduced to a single comparative 'winner' lane.
- **Obito:** Stamina 13 / Taijutsu 12 / Ninjutsu 11 gives a coherent durable physical-ninjutsu base without invented specialist inflation.

## 6. Formula-conformance corrections to stale PL labels

The Stat audit exposed two stale displayed PL labels that must not be preserved by changing otherwise-valid Stats:

- **Kushina:** existing row computes raw `12.140476...` → **PL12**, not PL13.
- **Kurenai:** existing row computes raw `12.204761...` → **PL12**, not PL13.

All other unchanged rows retain their Formula-valid Base PL labels:

- Hinata **8**;
- Izuno **9**;
- Mirai **9**;
- Iwabee **13**;
- Metal Lee **13**;
- Kakashi **15**;
- Obito **12**.

Menma is the only Stat-row recalibration and changes from Formula-valid PL10 to Formula-valid **PL12** because Kinjutsu changes 9 → 13.

## 7. Collision / overlap audit

No harmful collision is created.

- Two Origins may legitimately be strong in the same Stat.
- Base Stat identity does not reserve a Stat exclusively to one character.
- A starting-Skill specialty does not require that specialty's Stat to be the character's numerically highest Base Stat.
- Later curriculum, progression, weapon proficiency, learned competence and Combat mechanics may deepen an identity without rewriting historical Academy Base Stats.
- Kakashi's broad high baseline therefore coexists with narrower specialist identities rather than invalidating them.

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

> **The ten Academy-Origin Base Stat matrix above is the binding PL / Registry authority. Menma alone receives a Base Stat recalibration: Kinjutsu 9 → 13, yielding Formula-valid Base PL12. The other nine Stat rows remain unchanged. Kushina and Kurenai's stale PL13 labels are corrected to Formula-valid PL12 rather than inflating Stats to preserve those labels. Starting Skills, later curriculum and Combat mechanics do not retroactively rewrite these Base Stats. Overlap between Origins is permitted when representation supports it.**
