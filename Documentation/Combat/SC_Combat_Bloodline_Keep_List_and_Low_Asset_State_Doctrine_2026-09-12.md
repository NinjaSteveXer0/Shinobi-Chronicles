# Shinobi Chronicles — Bloodline Keep List and Low-Asset / Low-State Doctrine

**Date:** 2026-09-12  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING PLAYER SELECTION + IMPLEMENTATION-COST DOCTRINE / EXACT SKILL PACKAGES SEPARATE**

## 1. Player-selected Bloodlines to keep

Stephen has explicitly selected the following original Bloodline concepts to retain in Shinobi Chronicles substantially as conceived:

- **Ink Blood**
- **Grave Pulse**
- **Stormheart**
- **Chakra Palimpsest**
- **Echo Flesh**

These join the already locked **Chronicle Scar** Bloodline concept.

Exact Registry owners, inheritance, access gates, Skills, values, progression and runtime activation remain separate authority unless already closed elsewhere.

## 2. Core production concern

These Bloodlines must not create an Alpha implementation burden requiring one bespoke UI image and one bespoke persistent status effect for every small mechanic.

Canonical production rule:

> **Bloodline identity should primarily live in capability predicates, contextual effects, exact Skills, source-owned transient markers and committed Chronicle provenance—not in a proliferation of permanent status icons.**

And:

> **A Bloodline effect needs a dedicated user-facing Condition only when the player must reason about that state across action opportunities and existing generic state primitives cannot express it safely.**

## 3. Image doctrine

No dedicated image is required per Bloodline Skill, passive, marker, scar, adaptation or contextual effect for Alpha.

Alpha may remain text-first using:
- Bloodline name;
- Skill/effect name;
- rarity/text treatment where relevant;
- ordinary Battle log / contextual option presentation;
- existing Character/card/portrait representation where already authorised.

Optional future presentation may add one Bloodline emblem/icon per family, but this is not an Alpha semantic dependency.

Transient Battle markers and contextual evidence do not require individual art assets.

## 4. State taxonomy

Prefer this hierarchy:

1. **Persistent capability facts**
   - possession;
   - Access;
   - exact developed expressions;
   - committed provenance/history.

2. **Contextual evidence / occurrence facts**
   - observations;
   - compatibility results;
   - preserved pattern/reference evidence;
   - factual residues/traces.

3. **Source-owned transient markers**
   - next-action setup;
   - one-packet guard;
   - temporary route/control marker;
   - one-use adaptation reference;
   - bounded pressure/resource scalar.

4. **User-facing Conditions**
   - reserve for materially persistent adverse/beneficial states that survive long enough and matter enough that the player must track them explicitly.

Do not promote every marker into a Condition.

## 5. Bloodline-specific low-state direction

### Ink Blood
Primary identity should live in contextual symbol/drawing/map/seal interaction, source-owned ink constructs/provenance and exact authored Skills.

Possible temporary markers such as an ink mark, bound sketch or animated construct relationship should remain source-owned exact states unless a genuinely persistent Condition is required.

No generic `inked`, `painted`, `drawn_on`, `ink_slow`, `ink_blind`, etc. status family is authorised merely to make the Bloodline feel complex.

### Grave Pulse
Primary identity should be passive/contextual perception of residual chakra disturbance tied to death, severe injury, broken seals or major committed events.

Most use should create bounded evidence, not Conditions.

Combat may reference an already factual damaged/destabilised state or exact committed residue rather than applying a generic `grave_mark` to everything.

### Stormheart
Prefer one exact source-owned pressure/charge scalar or stage marker if the eventual package needs accumulation.

Do not model each pressure threshold as a separate status icon.

Exact release, overextension, defence or movement Skills may consume/read that scalar directly.

No generic rage system is implied.

### Chakra Palimpsest
Primary identity should live in committed historical references to exact prior chakra structures/effects experienced by the actor.

Familiarity/adaptation should be represented as provenance-backed comparison/access evidence or exact developed expressions, not dozens of `resistant_to_X` Conditions.

It does not copy Skills or Bloodlines automatically.

### Echo Flesh
Primary identity should be a small current adaptation record referencing an exact previously survived physical/environmental pressure.

Prefer one active adaptation slot/record or a tightly bounded set of exact developed adaptations rather than one permanent Condition per hazard.

It does not copy Skills or Bloodlines and does not become a generic immunity list.

## 6. Reusable Battle primitives

Bloodline Skills should reuse existing Combat primitives where possible:

- direct Attack PL packet;
- pre-Stamina guard/prevention;
- next-action Attack PL/effect marker;
- movement/reposition restriction;
- visibility/precision interference;
- recovery of underlying Battle PL where legitimately authored;
- source-owned temporary restraint/control;
- exact evidence/provenance references;
- contextual passive/active/hybrid execution modes.

A new primitive or Condition family requires a real semantic need, not aesthetic variety.

## 7. Persistent history is not a status effect

Chronicle Scar, Chakra Palimpsest, Grave Pulse residue reads and Echo Flesh adaptation provenance all rely heavily on committed history.

Historical references should remain Chronicle/provenance facts, not runtime Conditions merely because future Skills can query them.

Preserve:

**history != Condition**  
**evidence != Condition**  
**capability possession != active state**  
**transient marker != persistent Condition**  
**visual feedback != semantic authority**

## 8. Alpha production rule

Before adding a new Bloodline status/icon, ask in order:

1. Can the effect be represented by an existing Combat primitive?
2. Can it be a source-owned transient marker with text/log feedback only?
3. Can it be committed evidence/history rather than runtime state?
4. Can one scalar/record replace several named statuses?
5. Does the player genuinely need to track this state across multiple opportunities?

Only if the answer still requires explicit persistent player-facing state should a new Condition be authored.

## Final lock

> **Ink Blood, Grave Pulse, Stormheart, Chakra Palimpsest and Echo Flesh are retained Bloodline concepts. Their implementation should be deliberately low-asset and low-status: use contextual capability, exact Skills, reusable Combat primitives, provenance/history and source-owned transient markers first; dedicated images and bespoke Conditions are exceptions, not the default.**
