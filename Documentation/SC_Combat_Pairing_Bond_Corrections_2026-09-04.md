# Shinobi Chronicles — Pairing & Bond Corrections

Date: 2026-09-04

Status: **REGISTRY / PL AUTHORITY CONSUMED BY COMBAT**

This document records the final Alpha-facing pairing and bonded-companion corrections for Kiba + Akamaru, Sannin Hinata, Sumire + Nue, and Akatsuki Kakuzu.

## 1. `sj_kiba` — Kiba + Akamaru integrated one-slot representation

`sj_kiba` is the integrated Kiba + Akamaru one-slot representation.

Final composite Stats, in canonical seven-stat order:

`50 / 66 / 52 / 20 / 34 / 22 / 70`

Base PL: **64**

Akamaru remains a stable underlying causal/participant source. He is **not**:

- a separate collectible card requirement;
- an ordinary Summon;
- a Hosted Entity;
- a second deployment slot;
- a second independent PL contribution.

Do not calculate Kiba PL + Akamaru PL. Do not add a relationship/bond PL bonus on top of the authored composite PL. The composite Stats/Base PL already describe the production representation.

Combat provenance may still identify Akamaru as an exact causal source for authored actions, protection, tracking, bites, combination techniques, or other mechanics that explicitly involve him. Source addressability does not imply an independent Battle turn or deployment slot.

Preserve:

- integrated representation ≠ erased causal participant;
- source participation ≠ independent Battle participant;
- one-slot composite PL ≠ additive participant PL;
- relationship/bond history ≠ hidden numeric bonus.

## 2. `sannin_hinata` — PL supersession

`sannin_hinata` is the Road-to-Ninja alternate-growth representation.

Final Stats:

`96 / 118 / 62 / 70 / 48 / 82 / 108`

Base PL: **110**

This supersedes the previous PL 94 calibration. Combat must consume PL 110 and the supplied Stats without inventing additional alternate-growth modifiers.

## 3. `sannin_sumire` + `nue` — paired acquisition with independent Summon identity

Acquiring/instantiating `sannin_sumire` automatically ensures `nue` is acquired/available and default-attached/equipped to her.

Authoritative numerics remain:

- `sannin_sumire` — Base PL **93**
- `nue` — independent Entity/Summon Base PL **100**

No relationship/bond PL bonus and no PL transfer occurs between them. Do not add Sumire PL + Nue PL to derive Sumire's PL or Effective PL.

Acquisition must be idempotent:

- if Nue is not already owned/available, ensure it exactly once;
- if Nue is already owned/available, do not create a duplicate;
- default attachment/equipment should point Sumire to the existing authoritative Nue identity.

Automatic acquisition/default attachment does **not** necessarily mean Nue is already manifested at Battle start. Existing Summon manifestation/action semantics still govern whether and when Nue becomes an active Battle participant/source.

Preserve:

- paired acquisition ≠ merged identity;
- default attachment ≠ automatic manifestation;
- relationship/bond ≠ PL transfer;
- Entity ownership ≠ duplicate Entity instantiation;
- exact idempotent acquisition/projection.

## 4. `akatsuki_kakuzu` — Alpha mask boundary

For Alpha, Kakuzu's masks are elemental attack sources/presentation only.

Do **not** create Alpha mechanics for:

- separate mask Battle participants;
- independent mask turns;
- independent mask or heart PL ledgers;
- per-mask destruction/loss lifecycle;
- heart-count survival;
- elemental-access gating based on surviving masks/hearts;
- hidden additive PL from mask count.

Authored Kakuzu actions may retain exact mask/source provenance or presentation where relevant, but the masks do not become independent production participants merely because they are causally involved in an attack.

Kakuzu's authored elemental Actions remain Character-owned.

Deeper heart/mask mechanics are **POST-ALPHA / DEFERRED** and require fresh owning-authority ratification before implementation.

Preserve:

- causal source ≠ independent participant;
- presentation source ≠ independent participant;
- parent Character validity ≠ autonomous sub-entity runtime;
- deferred heart/mask mechanics ≠ concept deletion.

## 5. Production-admission boundary

The Combat semantics above are closed, but `sj_kiba` and `akatsuki_kakuzu` remain **awaiting live production admission** in the current Alpha source wave.

Combat closure does **not** by itself:

- add either identity to the current Alpha Registry;
- expand the current collectible/portrait production gate;
- author asset mappings;
- create deployment availability;
- create Acquisition routes;
- imply that existing 102-wide collectible/portrait authority has already expanded.

When Registry/Assets later admits these identities into live production, a new explicit handoff must expand the relevant Registry/asset/portrait authority. Assets must not invent those mappings before that admission.

Preserve:

- semantic closure ≠ production admission;
- production identity definition ≠ current Registry membership;
- Combat authority ≠ asset/portrait authority.

## 6. Cross-system implementation doctrine

These locks intentionally support two different bonded-companion patterns without flattening them into one generic system:

1. **Integrated one-slot representation** — Kiba + Akamaru: one deployable Character representation, one authored composite PL/Stats package, while Akamaru remains causally addressable inside that representation.
2. **Paired acquisition + independent Summon identity** — Sumire + Nue: acquiring the Character ensures the independent Entity/Summon is available and default-associated, but runtime manifestation remains governed by Summon semantics.

Do not generalize either pattern to every animal companion, partner, hosted being, or Summon without explicit Registry/Combat authority.
