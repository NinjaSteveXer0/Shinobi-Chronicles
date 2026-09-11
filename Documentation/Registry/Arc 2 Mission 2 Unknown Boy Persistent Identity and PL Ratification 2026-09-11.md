# Shinobi Chronicles — Arc 2 Mission 2 Unknown Boy Persistent Identity and PL Ratification

**Date:** 2026-09-11  
**Owner:** PL / Registry / Rank  
**Status:** **PL / REGISTRY / RANK CLOSED — ARC 2 M2 UNKNOWN BOY BATTLE PARTICIPANT AUTHORISED**  
**Source handoff:** GitHub issue #118  
**Writing authority:** `Documentation/Story/Arc2_Mission2_Unknown_Boy_Battle_and_Visual_Requirement_2026-09-11.md`  
**Writing commit:** `1d8229ab3e9dfc0331dbbffdf7f4bfa93bebf45b`

---

## 1. Scope

This document closes the Registry / PL / Rank authority required for the unidentified young shinobi currently presented to Menma/player as **Unknown Boy** in:

- Arc: `arc2`
- Mission: `arc2_m2_the_leak`
- title: `THE LEAK`

It authorises one persistent human participant, one observer-safe current projection, one Base Stat / Base PL package, and the identity-masking rules required for Story / Combat / save-load continuity.

It does **not** author:

- his eventual true name;
- clan;
- faction;
- ROOT allegiance;
- Danzō allegiance;
- Bloodline;
- exact formal Rank;
- Skills / prepared palette;
- Battle outcome;
- capture / escape / custody result;
- later collectible acquisition;
- Character Card art;
- runtime implementation / Golden proof.

Preserve:

**Registry identity != observer display name**  
**hidden true identity != absent stable identity**  
**World Truth != observer Knowledge != presentation**

---

## 2. Stable person / participant identity

### Stable Registry participant ID

`arc2_unknown_boy_01`

### Stable person continuity key

`person_arc2_unknown_boy_01`

Classification:

**Enemy/Opposition — persistent human shinobi**

This is one historical person.

`arc2_unknown_boy_01` is not an Entity, Summon, Hosted Entity, Construct, projection-only phantom or disposable encounter token.

Any later legitimate identity reveal must resolve onto:

`person_arc2_unknown_boy_01`

and must not create a second embodied historical person merely because the observer-facing name changes.

A future identified Character representation may use a new representation ID only if separately authorised, but it must retain this same `stablePersonKey` and obey ordinary same-person collision rules.

Preserve:

**unknown identity != new person on reveal**  
**representation change != ontological duplication**

---

## 3. Observer-safe projection

Current observer projection key:

`observer_projection_arc2_unknown_boy`

Current display label:

**Unknown Boy**

Current observer-safe projection deliberately exposes no:

- true name;
- clan;
- faction;
- ROOT status;
- Danzō association;
- formal Rank;
- Bloodline;
- hidden institutional role.

Story-established visible facts may still be presented normally, including that he is a young/adolescent shinobi, dark-haired, pale, controlled, observant and currently without an established visible forehead protector.

Resemblance to Anko's remembered youth near Danzō remains inference only.

Suspected ROOT relevance remains inference only.

Neither may be promoted into Registry truth or player Knowledge by this document.

---

## 4. Base Stats / Base PL

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Authorised Base Stats:

**`55 / 59 / 52 / 62 / 54 / 49 / 57`**

Formula v1.0:

`round(0.60 × highest Stat + 0.25 × average(top 3 Stats) + 0.15 × average(all 7 Stats))`

Calculation:

- highest Stat = `62`
- top three = `62 / 59 / 57`
- top-three average = `59.333333...`
- all-seven total = `388`
- all-seven average = `55.428571...`
- raw PL = `60.347619...`

### Base PL

**`60`**

No direct or hidden PL bonus exists.

No mission-number, plot-importance, hidden-identity, suspected-ROOT, Danzō-association or desired-Battle-outcome multiplier is authorised.

### Calibration rationale

The package reflects the current authored representation as a highly capable young shinobi who:

- successfully participated in counter-surveillance / evasive movement;
- deliberately led Menma into constrained terrain before confrontation;
- remains controlled and observant under pressure;
- is associated with the observable remote/linked destruction of the recovered seal strip;
- is prepared to use force while prioritising escape.

Accordingly:

- Fūinjutsu is the strongest Base Stat;
- Taijutsu and Stamina are strong enough to support close-range escape / resistance pressure;
- Ninjutsu, Kinjutsu and Bukijutsu support broad professional capability;
- Genjutsu is competent but not authored as his defining domain.

These Stats do **not** grant any named Skill, seal technique, ROOT technique, Bloodline, equipment, transformation, affiliation or mastery package by themselves.

The calibration is representation-based, not outcome-scripted. Combat must resolve Menma vs Unknown Boy from lawful current participant state, actions, tactics and encounter context.

Preserve:

**Stats != Skills**  
**Base PL != desired Battle outcome**

---

## 5. Formal Rank / public Rank treatment

### Formal Rank authority

`formalRank = null`

Meaning:

**exact formal Rank is currently NOT AUTHORISED / NOT ESTABLISHED by durable source authority.**

This does not mean the person canonically has no institutional rank. It means PL / Registry / Rank has no legitimate basis to assign one yet.

### Observer projection

Current public/observer Rank presentation is deliberately:

**NONE / HIDDEN**

No Rank badge, label or inferred classification may be shown merely because he is capable, young, hostile, trained or technically sophisticated.

A later factual Rank reveal may update Registry metadata / observer Knowledge without changing `person_arc2_unknown_boy_01`.

Preserve:

**capability != formal Rank**  
**formal Rank != necessarily observer-known Rank**

---

## 6. Affiliation / institutional truth

Current Registry affiliation authority:

`affiliation = null`

Current meaning:

**concealed / not authorised for exposure**

No ROOT, Konoha, Danzō, clan or other institutional allegiance is established by this document.

A later legitimate reveal may attach exact affiliation truth to the same persistent person and separately update observer Knowledge where warranted.

Do not backfill affiliation from:

- resemblance;
- scene geography;
- card art;
- hidden-name speculation;
- technique aesthetics;
- Combat result.

---

## 7. Identity masking / later reveal semantics

Runtime/save-load must persist at minimum:

- `participantId = arc2_unknown_boy_01`;
- `stablePersonKey = person_arc2_unknown_boy_01`;
- current observer projection key `observer_projection_arc2_unknown_boy`;
- current observer display `Unknown Boy`;
- current identity-known / allegiance-known / rank-known state as false unless separately changed by committed authority-bearing history.

A later reveal changes **Knowledge / presentation / authorised metadata**.

It does not replace the historical person and does not rewrite prior occurrences to pretend Menma knew the revealed identity earlier.

Historical Battle, evidence, injury, survival, escape, capture, custody, relationship and encounter occurrences remain attached to the stable person even after identification.

Preserve:

**later reveal != retrospective Knowledge rewrite**  
**display-name change != identity replacement**

---

## 8. Battle-facing Registry handoff

Combat may now consume:

```js
{
  id: "arc2_unknown_boy_01",
  stablePersonKey: "person_arc2_unknown_boy_01",
  type: "enemy_opposition",
  classification: "persistent_human_shinobi",
  observerProjectionKey: "observer_projection_arc2_unknown_boy",
  defaultObserverLabel: "Unknown Boy",
  formalRank: null,
  affiliation: null,
  stats: {
    ninjutsu: 55,
    taijutsu: 59,
    bukijutsu: 52,
    fuinjutsu: 62,
    kinjutsu: 54,
    genjutsu: 49,
    stamina: 57
  },
  basePL: 60,
  collectibleProductionGate: false
}
```

Runtime property names may adapt to the existing schema only. The stable participant/person identity, seven Stats, Base PL and masking semantics must not change for implementation convenience.

Combat owns:

- exact legal actions / Skills;
- Action PL / control / escape / capture-compatible semantics;
- initiative / positioning within current resolver doctrine;
- exact Battle result;
- remaining Battle PL / withdrawal state;
- factual observed-technique outputs safe for Knowledge;
- any lawful Battle-produced injury / survival / custody / escape facts under current owning contracts.

Registry does not script the outcome.

---

## 9. Story return separation

The Battle/Story return must preserve separate factual fields where applicable:

- `battleResult`;
- `escapeResult`;
- `captureResult`;
- remaining Battle PL / withdrawal state;
- survival state;
- injury state only if legitimately produced;
- custody state only if legitimately produced;
- seal/evidence state only if Battle interaction changes it;
- observer-safe newly observed techniques/capabilities;
- identity/allegiance/rank Knowledge only where separately established.

Preserve:

**Battle victory != capture automatically**  
**Battle victory != custody automatically**  
**Battle victory != identity reveal**  
**capture intent != capture result**

---

## 10. Character Card / production boundary

Writing has recorded a future Character Card requirement for the current unidentified presentation.

That future visual must bind to this same stable person/participant authority and preserve observer-safe `Unknown Boy` presentation unless later authority changes the intended card state.

However:

- visual card existence != acquisition;
- visual card existence != collectible admission;
- collectible admission != ownership;
- identified future card != second historical person.

Current `collectibleProductionGate = false` until explicit Assets / Registry / Acquisition authority changes it.

No image generation is authorised by this Registry document.

---

## 11. Status

Persistent identity: **CLOSED**  
Observer-safe projection: **CLOSED**  
Base Stats / Base PL: **CLOSED — PL60**  
Formal Rank: **UNESTABLISHED / HIDDEN**  
Affiliation: **UNESTABLISHED / HIDDEN**  
Combat package: **DOWNSTREAM REQUIRED**  
Character Card visual: **LATER / IMAGE LOCK APPLIES**  
Runtime implementation: **NOT CLAIMED**  
Golden/regression GREEN: **NOT CLAIMED**

## Final lock

> **Arc 2 M2 Unknown Boy is one persistent human participant: `arc2_unknown_boy_01` / `person_arc2_unknown_boy_01`, currently observer-projected only as `Unknown Boy`, with Base Stats `55/59/52/62/54/49/57` and Base PL60. His true name, allegiance and formal Rank remain unestablished and hidden. A later reveal changes Knowledge/presentation, not the underlying person.**
