# Shinobi Chronicles — Awaiting Placement Pairing and Bond Clarifications

**Status:** Registry / PL / Acquisition implementation authority  
**Date:** 2026-09-04

This addendum supersedes the relevant Kiba, Hinata, Sumire/Nue, and Kakuzu notes in `Documentation/Registry/Awaiting Placement Expansion - Ten Ninja and Nue.md` and incorporates the later Combat/Registry/PL pairing implementation lock.

Canonical Stat order remains:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Formula v1.0 remains unchanged. No hidden direct PL bonus is introduced.

---

## 1. `sj_kiba` — Kiba + Akamaru integrated pair

The authoritative Registry ID is exactly:

`sj_kiba`

Do not create aliases such as `s_jkiba` from prose/display wording.

Kiba + Akamaru use the same integrated-pair architecture previously established for tightly linked pairs such as Sakon/Ukon:

- one selectable collectible representation: `sj_kiba`;
- one deployment/team position;
- two underlying causal/participant identities: Kiba and Akamaru;
- no separate Akamaru collectible requirement for Alpha;
- Akamaru is not a Summon and not a Hosted Entity;
- Akamaru does not consume a second team/deployment slot;
- Akamaru does not receive an independent Battle turn or independent Battle-PL pool;
- paired actions may preserve Kiba/Akamaru source attribution without splitting the playable representation.

### Composite PL rule

The pair does **not** receive an additive `Kiba PL + Akamaru PL` value and does not receive a hidden friendship/companion bonus.

`sj_kiba` has authored **composite Base Stats/Base PL** representing the fighting capability of Kiba + Akamaru as one integrated playable unit.

Final `sj_kiba` Base Stats:

`50 / 66 / 52 / 20 / 34 / 22 / 70`

Final Base PL:

**64**

This supersedes the provisional PL58 calibration.

The increase is embodied in the pair's Base Stats rather than a post-formula bonus.

If a future mechanic separates, incapacitates, or removes one member of the pair, that may project a source-owned Effective/Battle-state change. It must not rewrite the canonical composite Base PL.

Stable underlying source/participant identity:

`akamaru`

may be used for causality/history/action attribution without registering Akamaru as a separate collectible Character/Entity.

Preserve:

**integrated representation ≠ erased causal participant**

**causal source ≠ independent turn**

**one-slot composite PL ≠ additive participant PL**

---

## 2. `sannin_hinata` — Road-to-Ninja alternate growth authority

The `sannin_hinata` representation is deliberately an extremely developed Road-to-Ninja alternate-growth Hinata, not canon Hinata with a Sannin title applied.

Final Base Stats:

`96 / 118 / 62 / 70 / 48 / 82 / 108`

Final Base PL:

**110**

This supersedes PL94 completely. Do not retain, layer, project, or reapply the old PL94 state underneath the final calibration.

No additional alternate-growth runtime modifier is implied.

Core emphasis:

- elite Gentle Fist / Taijutsu dominance;
- substantially improved physical confidence/endurance;
- highly developed Byakugan-enabled combat reading;
- major Ninjutsu/air-palm capability;
- meaningful Genjutsu resistance/awareness development;
- no hidden Road-to-Ninja bonus outside the authored seven Stats.

Existing prepared Skill palette remains valid for Combat closure unless Combat identifies a semantic conflict.

---

## 3. `sannin_sumire` + `nue` — intrinsic paired acquisition, independent Summon lifecycle

Sumire and Nue are intrinsically linked and begin a newly instantiated Chronicle together for this representation.

They do **not** receive a friendship bonus, relationship PL bonus, or hidden Stat package merely for being bonded.

### Acquisition transaction — binding Alpha contract

Acquiring/instantiating:

`sannin_sumire`

must idempotently ensure the stable Entity/Summon identity:

`nue`

is owned/available exactly once and default-attached/equipped to Sumire.

Required transaction semantics:

1. acquire/instantiate `sannin_sumire` through its legitimate route;
2. query authoritative ownership for `nue` by stable Registry identity;
3. if `nue` is absent, acquire/ensure `nue` exactly once;
4. if `nue` already exists, reuse that exact existing identity and do not create a duplicate;
5. establish/reaffirm the legitimate Sumire↔Nue default attachment/access relation;
6. persist the transaction atomically enough that retry/load recovery cannot mint duplicate Nue identities.

Their starting bond is authored initial provenance/current relationship state. It does not require replaying or fabricating source-era Chronicle events in Active Konoha history.

### Separate PL / lifecycle

Sumire remains:

`90 / 72 / 66 / 82 / 96 / 80 / 90` — Base PL **93**

Nue remains:

`92 / 98 / 60 / 55 / 96 / 65 / 105` — Base PL **100**

Do **not**:

- add Nue's PL to Sumire's PL;
- calculate Sumire + Nue as Sumire Effective/Battle PL;
- project Nue's Stats wholesale onto Sumire;
- create a relationship/bond PL bonus;
- duplicate Nue because a second acquisition route refers to the same Entity.

The similarity to Kiba/Akamaru is the intrinsic bond and starting-together authority. The ontology differs:

- Kiba/Akamaru = one integrated collectible representation / one deployment position / composite PL;
- Sumire/Nue = two stable Registry identities; paired acquisition/default attachment; Nue retains independent Summon/Entity PL and lifecycle.

Nue may later be legitimately usable with other characters if future Acquisition/Summon/relationship authority permits it. Sumire's intrinsic bond does not make Nue ontologically exclusive to her.

Default attachment means Sumire begins with Nue associated/available through the authorised Summon relationship. It does **not** necessarily mean Nue begins every Battle already manifested. Exact Battle manifestation/action-opportunity semantics remain Combat/Summon authority.

Preserve:

**paired acquisition ≠ merged identity**

**default attachment ≠ automatic manifestation**

**relationship ≠ PL transfer**

**ownership ≠ duplicate instantiation**

---

## 4. `akatsuki_kakuzu` — Alpha mask scope simplified

For Alpha, Kakuzu's masks are **embedded elemental attack sources/presentation only**.

Do not implement:

- autonomous mask participants;
- mask turns;
- separate mask PL;
- separate heart PL;
- mask/heart destruction tracking;
- per-mask Battle defeat;
- elemental-access loss from mask destruction;
- hidden additive PL from masks/hearts.

Authored Actions may identify a particular mask/source for provenance or presentation. That does **not** make the mask an independent Battle participant.

`earth_grudge_fear` / stitched thread-body provenance remains intrinsic to `akatsuki_kakuzu`.

The existing prepared palette remains:

- `akatsuki_kakuzu_earth_style_earth_spear`
- `akatsuki_kakuzu_earth_grudge_fear_threads`
- `akatsuki_kakuzu_wind_style_pressure_damage`
- `akatsuki_kakuzu_lightning_style_false_darkness`
- `akatsuki_kakuzu_fire_style_searing_migraine`

Any deeper mask/heart destruction lifecycle is **POST-ALPHA / DEFERRED** and requires fresh owning-authority ratification.

---

## 5. Alpha bonded-companion pattern taxonomy

Alpha explicitly supports two different bonded-companion patterns:

### A. Integrated one-slot representation

Kiba + Akamaru

→ one deployable Character  
→ one authored composite Base Stats/PL package  
→ causally addressable companion inside that representation.

### B. Paired acquisition + independent Summon

Sumire + Nue

→ Character acquisition guarantees associated Entity availability  
→ Entity remains independently identified/calibrated  
→ default attachment is authored  
→ actual manifestation remains governed by Summon/Combat mechanics.

Do **not** generalise either pattern to every animal companion, partner, Hosted Entity, bound source, or Summon without explicit authority.

---

## 6. Coding implementation handoff

Coding should implement only after consuming the final Combat semantic closure for the awaiting-placement wave.

Required implementation tests include:

- exact Registry ID is `sj_kiba`; no `s_jkiba` alias;
- acquiring/deploying `sj_kiba` creates one playable participant/slot and one composite PL64 ledger;
- Akamaru may appear as causal source without independent turn/PL/collectible requirement;
- `sannin_hinata` resolves PL110 only, with no stale PL94 stacking;
- acquiring `sannin_sumire` idempotently ensures/reuses one `nue` identity and establishes default attachment;
- repeated Sumire acquisition/load retry cannot duplicate Nue;
- Nue PL100 never transfers to Sumire PL93;
- default attachment does not automatically bypass Summon manifestation rules;
- Kakuzu masks cannot become autonomous Alpha participants or PL ledgers.

Durable Combat provenance for this lock is recorded separately in:

`Documentation/SC_Combat_Pairing_Bond_Corrections_2026-09-04.md`

Combat commit:

`14a11d3ded878c2459c51e330adaf826174532f1`
