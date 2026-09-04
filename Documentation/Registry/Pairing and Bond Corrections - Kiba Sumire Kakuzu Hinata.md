# Shinobi Chronicles — Pairing & Bond Corrections

**Status:** REGISTRY / PL SUPERSESSION — PRE-ADMISSION CONSUMER AUTHORITY  
**Date:** 2026-09-04

This document records current Registry/PL corrections for selected awaiting-placement identities. It supersedes stale calibrations/relationship assumptions for these identities without, by itself, admitting them into the current live 85 Character + 17 Entity = 102 production gate.

Production admission remains a separate explicit step. Until admission occurs, current 102-wide Character/Entity and `uiPortrait` gates remain unchanged.

---

## `sj_kiba` — Kiba + Akamaru integrated one-slot representation

Stable Character representation ID:

`sj_kiba`

Final composite Stats:

`50 / 66 / 52 / 20 / 34 / 22 / 70`

Base PL:

**64**

Kiba + Akamaru are one integrated collectible/team/deployment-slot representation.

Akamaru remains a stable underlying causal/participant source inside that representation.

Preserve:

- no separate Akamaru collectible card is required;
- Akamaru is not an ordinary Summon;
- Akamaru is not a Hosted Entity;
- Akamaru does not consume a second deployment/team slot;
- do not add Kiba PL + Akamaru PL;
- do not add a flat relationship/bond PL bonus merely because the pair is bonded.

**paired representation ≠ two deployment identities**

**causal/participant source ≠ independent Battle participant**

**relationship/bond ≠ automatic PL transfer**

---

## `sannin_hinata` — Road-to-Ninja alternate-growth representation

Stable Character representation ID:

`sannin_hinata`

Final Stats:

`96 / 118 / 62 / 70 / 48 / 82 / 108`

Base PL:

**110**

This supersedes the earlier PL94 / `80/100/55/64/40/72/94` calibration.

No other Combat/Ability semantics are reopened by this numerical correction.

---

## `sannin_sumire` + `nue` — automatic acquisition/default attachment, no PL transfer

Stable Character representation ID:

`sannin_sumire`

Sumire remains Base PL **93**.

Stable independent Entity/Summon ID:

`nue`

Nue remains independently calibrated at Base PL **100**.

On legitimate acquisition/instantiation of `sannin_sumire`, Acquisition authority should idempotently ensure:

1. `nue` is acquired/available to that player if not already owned/available;
2. no duplicate `nue` ownership record is created if Nue already exists;
3. Nue becomes Sumire's default attached/equipped Summon relationship under the Summon/Acquisition authority.

Preserve:

- Sumire PL does not absorb Nue PL;
- Nue PL remains Entity-owned;
- automatic acquisition/attachment does not imply Nue is already manifested at Battle start;
- attachment/default equipment ≠ active Battle deployment;
- no flat relationship/bond bonus is created merely by the pairing;
- `sannin_sumire_nue_resonance` still does not itself mint Nue ownership or summon deployment outside its authored prerequisites.

**Character acquisition → ensure bonded Entity availability** may be an authored acquisition side effect.

**automatic attachment ≠ active manifestation**

**Summon PL ≠ summoner PL**

---

## `akatsuki_kakuzu` — Alpha mask simplification

Stable Character representation ID:

`akatsuki_kakuzu`

For Alpha, Kakuzu's masks/hearts remain causal/presentation sources supporting his authored elemental Actions only.

Do not create for Alpha:

- separate mask collectible/Entity identities;
- independent mask turns;
- mask/heart PL ledgers;
- per-mask destruction state;
- heart/mask-specific survival bookkeeping;
- elemental access gating based on surviving masks/hearts.

The existing authored Kakuzu elemental Actions remain Character-owned actions whose presentation/provenance may reference the corresponding masks/hearts.

Deeper heart/mask lifecycle mechanics are **POST-ALPHA / DEFERRED** and require fresh Combat/Registry authority before implementation.

Preserve:

**causal source ≠ independent Entity**

**elemental presentation source ≠ separate turn/PL authority**

**deferred heart lifecycle ≠ permission to infer a generic Health subsystem**

---

## Coding / admission boundary

Current production source does not yet contain `sj_kiba`, `sannin_hinata`, `sannin_sumire`, `akatsuki_kakuzu`, or `nue` in the live 102 gate.

Therefore Coding must not silently insert these identities merely because this correction exists.

Before live ingestion, require explicit production admission plus the downstream production mappings/packages needed for whichever identities are admitted, including `uiPortrait` expansion beyond the current 102-wide manifest.

At admission time, Coding should consume this document as the current pairing/bond/numerical authority and reject superseded values/ontologies.
