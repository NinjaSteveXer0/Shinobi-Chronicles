# Shinobi Chronicles — Pakkun Summon Action Closure

Date: 2026-09-05

Status: **COMBAT / SUMMON AUTHORITY — AWAITING PRODUCTION ADMISSION**

This document consumes Registry/PL authority for `pakkun` and closes the current Alpha-facing Combat/Summon semantics for his prepared action palette. It does not itself admit Pakkun into the live production Registry or asset manifests.

## 1. Registry / PL authority consumed

Stable ID: `pakkun`

Display: **Pakkun**

Classification: **Entity / Summon**

Base Stats, canonical seven-stat order:

`13 / 16 / 6 / 4 / 4 / 9 / 18`

Base PL: **16**

Pakkun is a small tracking/scouting/support Summon with modest direct combat capability. His tracking, route-finding and communication competence are action/resolver semantics rather than hidden Stats.

Preserve:

- Pakkun PL ≠ summoner PL;
- association with Kakashi ≠ automatic ownership or attachment;
- Summon ownership ≠ active manifestation;
- Pakkun ≠ generic seven-ninken composite;
- Entity source addressability ≠ independent action opportunity automatically.

## 2. Summon action-opportunity ownership

Pakkun uses the existing ordinary Summon lifecycle unless a future exact contract explicitly supersedes it.

For Alpha-facing Combat semantics:

- Pakkun does **not** receive an independent recurring Battle turn merely because he is manifested;
- invoking one of Pakkun's Battle-legal actions consumes the controlling Character's normal action opportunity through the existing Summon-action path;
- Pakkun remains the exact causal/source owner of his action and its occurrence provenance;
- any Pakkun Battle PL remains Entity-owned and never transfers to the controlling Character;
- manifestation/availability must already be legitimate under Summon authority before a Battle action can resolve.

## 3. Prepared actions

### 3.1 `pakkun_tracking_scent`

Display: **Tracking Scent**

Primary class: tracking / information / route-evidence action.

Attack PL: **none**.

Target/context:

- one exact authorised scent-bearing subject, trace, object, route question or local search context supplied by the encounter/world state;
- the action cannot target an arbitrary unknown hidden identity without legitimate scent/evidence basis.

Validity requirements:

- Pakkun must be legitimately available/manifested for the current context;
- a legitimate scent anchor, trace basis, or authored search context must exist;
- Pakkun must have physical/contextual access sufficient to inspect that evidence.

A valid committed resolution may establish bounded factual tracking evidence such as:

- scent present / absent within the examined scope;
- route continuity or route break;
- relative direction where the authored context supports it;
- relative freshness recency-band where the underlying evidence supports it;
- confirmation that a supplied scent anchor matches or does not match a discovered trace where the resolver has legitimate comparison evidence.

It does **not** automatically provide:

- exact target location beyond available evidence;
- omniscient map revelation;
- true identity when the scent evidence cannot establish identity;
- automatic mission completion;
- automatic hit/accuracy/evasion bonuses;
- automatic Knowledge ownership beyond the committed evidence;
- a hidden Speed, Perception or Genjutsu Stat.

If no legitimate scent/evidence basis exists, reject before commit and create no false tracking history.

When invoked during Battle, it consumes the controlling Character's action opportunity through the Summon-action path. Outside Battle, Mission/World authority may consume the same committed evidence without treating it as Battle damage or a Combat score.

### 3.2 `pakkun_nipping_bite`

Display: **Nipping Bite**

Primary discipline: Taijutsu direct action.

Target: one current valid hostile Battle participant.

Authored Attack PL: **7**.

Packet structure: one direct Battle-PL damage packet.

Stamina mitigation: **ordinary Stamina mitigation applies**.

No automatic:

- Stun;
- restraint;
- displacement;
- Guard break;
- Bleeding/Poison/other Condition;
- multi-hit multiplication because of bite animation/presentation.

This is deliberately modest direct combat output consistent with Pakkun's PL16 support-oriented identity.

### 3.3 `pakkun_field_guide`

Display: **Field Guide**

Primary class: support / navigation / route-context utility.

Attack PL: **none**.

Target/context:

- the controlling allied party/current authorised route or movement context;
- may only resolve where the current Mission/World/encounter state actually exposes a navigational, route-choice, search-path, regroup, pursuit/disengage or terrain-reading problem that Pakkun can legitimately assess.

On valid committed resolution, establish a source-owned **field-guidance evidence occurrence** describing the exact route/context Pakkun assessed and the observable cues supporting his guidance.

The action may support downstream mission/world interpretation of choices such as:

- safer/more plausible route identification;
- route hazard warning;
- regroup direction;
- pursuit/disengage route evidence;
- navigation around a known obstruction;
- confirmation that a route is inconsistent with the available signs.

It does **not** itself:

- guarantee the objectively best route;
- auto-complete movement, escape, pursuit or mission objectives;
- apply a universal accuracy/evasion/Speed modifier;
- change Base/Current/Effective Stats or PL;
- modify loot/drop chance;
- create hidden map knowledge;
- override authored world blockers;
- create a new generic movement subsystem.

If used during Battle, it only has Battle consequence where the encounter exposes a compatible authored route/disengage/navigation context. It never grants automatic escape merely because the action resolved.

If no compatible context exists, reject before commit and create no false guidance history.

## 4. Enhancement boundary

Pakkun has a separately locked future Enhancement requirement:

**+5% drop chance**

That requirement is **not** part of `pakkun_field_guide`, `pakkun_tracking_scent`, his Base Stats, Base PL, Effective PL, Battle PL, Summon manifestation, or Kakashi association.

Exact Enhancement math, stacking, affected loot tables, caps and activation semantics remain deferred until the Enhancement system is actively authored.

Do not smuggle the +5% drop chance into Field Guide or any current Combat resolver.

## 5. Production-admission boundary

Pakkun remains **AWAITING PRODUCTION ADMISSION**.

Combat semantic closure does not change the current live production gate, create asset-path authority, or grant Acquisition ownership.

Before live admission, the owning Registry/Assets/Coding pipeline must still close exact production asset mappings and Registry ingestion according to the current admission rules.

Preserve:

- Combat closed ≠ production admitted;
- production admitted ≠ acquired;
- enhancement requirement ≠ enhancement implemented;
- information/support action ≠ hidden numeric buff;
- Summon source action ≠ independent Summon turn;
- evidence occurrence ≠ omniscience.
