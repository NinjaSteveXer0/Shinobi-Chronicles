# Shinobi Chronicles — Mukai Byakugan Capability and Obito Identity Separation

**Date:** 2026-09-10  
**Owner:** CE / Codex / Coordination — cross-system reconciliation  
**Status:** **BINDING SC IDENTITY/CAPABILITY COORDINATION LOCK — IMPLEMENTATION PACKAGES SEPARATE / NOT AN ALPHA STORY BLOCKER**

## Purpose

This document consumes Writing/Story GitHub issue #64 and makes two anti-drift facts durable before later Registry / Progression / PL / Combat implementation reaches them.

It does not invent Registry IDs, Bloodline unlock requirements, PL modifiers, Combat actions, or new progression systems.

Preserve the existing project separations:

- stable identity != representation;
- Character Card != Registry identity automatically;
- representation fact != semantic unlock;
- Knowledge != Access != Competence != Power != Mastery;
- Base != Developed != Effective != Battle/runtime state;
- visual state != automatic Stat/PL mutation.

---

# 1. Obito identity separation — hard lock

## 1.1 Academy Student Obito

Current SC production authority already uses:

`academy_obito`

as the Academy-stage Origin/representation identity in the opening Academy systems.

This identity belongs to the Academy Student Obito Chronicle person represented by that opening route.

## 1.2 Mizukage's Aide Obito

**Mizukage's Aide Obito is NOT the same Chronicle person as Academy Student Obito.**

This is an SC-specific alternate identity concept for the Obito who:

- refused Madara's deal;
- did not continue along Academy Student Obito's expected Chronicle path;
- left that expected Konoha trajectory;
- later operates in/around Kirigakure as the Mizukage's aide.

The shared name `Obito` is not continuity evidence.

Do not model Mizukage's Aide Obito as:

- a later representation swap of `academy_obito`;
- a Rank/progression evolution of `academy_obito`;
- the same stable person with altered affiliation;
- a visual skin over the Academy Origin person;
- an automatic continuation merely because card art/name/source character resembles Obito.

Exact Registry identity / representation IDs for Mizukage's Aide Obito remain PL / Registry / Rank authority when implementation/admission is actually needed.

Until that owner publishes the exact machine identity, consumers must not invent one.

Canonical non-collapse:

**same displayed name != same Chronicle person**

**shared source-character inspiration != stable-person continuity**

**alternate SC identity != automatic representation progression**

---

# 2. Mukai Kohinata — representation possession versus usable capability

Mukai Kohinata is intended for the Genin candidate/roster space, but exact Registry admission/addressing remains Registry authority.

No current CE/Coordination action in this document creates a production Registry row by itself.

## 2.1 Representation fact

Mukai's represented character/card identity includes **one Byakugan** from the start.

The visible single Byakugan is therefore a representation fact of this intended character identity.

This does not mean the ability is currently activatable or usable.

## 2.2 Capability possession / potential

Mukai legitimately possesses the underlying bloodline capability/potential represented by that single Byakugan.

But possession/potential is not equivalent to runtime access.

Preserve:

**bloodline possession != Access**

**Access != Competence**

**Competence != Power**

**Power != Mastery**

## 2.3 Activation/use is gated

Actual Byakugan activation/use requires strict qualifying requirements from the owning Development / Bloodline / Progression authority.

Those requirements are intentionally **not authored here**.

Therefore none of the following may unlock the Byakugan by themselves:

- card ownership;
- candidate eligibility;
- team selection;
- acquisition;
- assignment;
- deployment;
- visible card art;
- visible eye design;
- UI inspection;
- Registry existence;
- merely being Genin.

No consumer may infer `Byakugan usable = true` from presentation.

## 2.4 World/Story/Knowledge boundary

Story and presentation may acknowledge only what the relevant observer legitimately knows.

A card or portrait containing the eye is not omniscient observer Knowledge.

If an in-world observer has not legitimately learned that Mukai possesses, can activate, or has mastered the Byakugan, UI/Story must not manufacture that Knowledge from asset metadata.

Preserve:

**representation truth != observer Knowledge**

**observer sees eye != observer knows capability state automatically**

**asset metadata != Chronicle evidence**

---

# 3. Downstream mechanical ownership

This document closes semantics only.

When Mukai's Byakugan becomes implementation-relevant, ownership is:

## Progression / Development / Bloodline

Owns:

- exact unlock/activation prerequisites;
- persistent development requirements;
- any staged Access / Competence / Mastery progression;
- whether activation is learned, conditioned, trained, event-gated, relationship-gated, or otherwise earned.

It must not create hidden PL merely to represent unlock progress.

## PL / Registry / Rank

Owns:

- Mukai's stable Registry identity/admission when required;
- Base Stats / Base PL;
- whether active Byakugan creates legitimate Stat modifiers and therefore changes Effective PL;
- formal Rank independently of Byakugan capability;
- exact stable identity for Mizukage's Aide Obito when/if admitted.

No hidden direct PL bonus is authorised by this document.

## Combat / Skills

Owns:

- executable Byakugan runtime effects once Access is legitimate;
- perception/targeting/accuracy/chakra-reading/reaction or other Battle semantics;
- duration/state ownership;
- activation/deactivation behavior;
- exact Action/Technique legality;
- Battle occurrence/provenance.

Combat must not grant the capability because art shows it.

## Coding

Consumes only exact closed upstream contracts.

Coding must not infer identity continuity or capability state from:

- name similarity;
- filenames;
- card folders;
- visual features;
- asset paths;
- Registry adjacency;
- UI selection state.

---

# 4. No current implementation fan-out

Issue #64 is a **QUEUE / durability** handoff, not a current Alpha Story blocker.

Therefore CE / Codex / Coordination does **not** create downstream Registry, Progression, PL or Combat implementation issues now.

Create those only when a current Alpha/Arc consumer actually needs:

- Mizukage's Aide Obito stable Registry admission/addressing;
- Mukai stable Registry admission/addressing;
- Mukai Byakugan unlock requirements;
- Mukai PL projection;
- Mukai Combat/Skills effects.

Until then, this document is the anti-drift authority those future owners must consume.

---

# Final locks

1. **Academy Student Obito (`academy_obito`) and Mizukage's Aide Obito are distinct Chronicle persons.**
2. **Mukai's single Byakugan is part of his represented identity from the start, but representation does not grant runtime use.**
3. **Mukai's Byakugan activation requires separately authored Development/Bloodline/Progression authority.**
4. **PL consequences, if any, come only through legitimate Stat/effective-state authority; no hidden direct PL bonus exists.**
5. **Combat/Skills owns executable effects after capability access is legitimate.**
6. **Card/portrait visibility, ownership, selection, assignment or deployment never bypass capability gating.**

Canonical shorthand:

**Academy Obito != Mizukage's Aide Obito.**

**Mukai possesses one Byakugan in representation; usable Byakugan remains gated.**
