# Shinobi Chronicles — 12×12 Arc / Mission / Section Structure Authority

**Date:** 2026-09-12  
**Owner:** Writing — Konoha  
**Status:** **BINDING STORY STRUCTURE AUTHORITY — IMPLEMENTATION / MACHINE ADDRESSING SEPARATE**

---

## 1. Campaign structure lock

From this point forward, Shinobi Chronicles Story authoring uses this fixed structural grammar:

- **Each Arc contains exactly 12 Missions.**
- **Each Mission contains exactly 12 Sections.**

Canonical shorthand:

> **1 Arc = 12 Missions.**  
> **1 Mission = 12 Sections.**

This is the default Story-authoring structure going forward unless Stephen explicitly supersedes it.

---

## 2. Mission markers

Writing must place explicit mission boundaries during live authoring so long continuous play does not blur multiple missions together.

Use clear markers equivalent to:

- `ARC X / MISSION Y START`
- `ARC X / MISSION Y COMPLETE`

A mission transition must be deliberately identified in Story authority rather than inferred later from prose length.

---

## 3. Section markers

Each Mission is divided into exactly 12 Story Sections.

Writing should track the current section during live authoring so the mission has visible pacing and does not expand indefinitely.

Sections are Story-structure units. This authority does **not** by itself declare that a Section equals:

- one runtime scene;
- one Battle;
- one location;
- one choice;
- one event;
- one occurrence;
- one UI page.

Exact machine-addressable Section IDs / runtime scene mapping remain separate Writing/Coding authority when required.

---

## 4. Pacing function

The 12-Section structure exists to force deliberate pacing.

A Mission may contain investigation, dialogue, Battle, travel, aftermath and relationship beats, but those beats must be shaped within the twelve-section envelope rather than allowing one Mission to absorb an uncontrolled portion of an Arc.

Mission completion remains Story authority and must not be inferred from:

- Battle victory;
- location change;
- mission reward;
- Progression;
- Promotion;
- arbitrary prose length.

---

## 5. Section 12 — Mission Closing Window

**Section 12 is where the mission ending becomes available.**

Reaching Section 12 does **not** forcibly eject the player from the current mission context.

Instead, Section 12 should normally expose an explicit mission-exit choice equivalent to:

> **Finish the Mission and [leave / go home / report / depart / continue onward].**

At the same time, other contextually valid closing actions may remain playable.

Examples include:

- interrogate Sai further;
- confide in Anko;
- ask a final question of a prisoner;
- inspect evidence already recovered;
- speak privately with a teammate;
- make one final disclosure or concealment choice;
- complete another bounded conversation or aftermath interaction that naturally belongs to the current mission context.

### 5.1 Optional linger does not create Section 13

If the player chooses one of these residual actions instead of the mission-exit choice, the Mission does **not** gain a thirteenth Section.

Those actions remain part of the **Section-12 Closing Window**.

The player may continue taking remaining valid closing actions while they remain contextually available.

Each action may still:

- create Chronicle history;
- change observer Knowledge;
- affect relationships;
- reveal evidence;
- close or open future eligibility;
- alter what the player takes into the next Mission.

But it does not extend the mission's numbered Section count.

### 5.2 Mission completion commits when the exit is chosen

The Mission is formally complete when the player selects/executes the explicit mission-exit action or an equivalent factual exit occurs.

Then Writing records:

`ARC X / MISSION Y COMPLETE`

and the next Mission begins only when its own start condition/marker is reached.

Therefore:

> **Section 12 reached != player forced to stop.**

> **Section 12 = mission ending available.**

> **Finish-Mission choice = mission completion committed.**

### 5.3 Closing actions are bounded, not infinite freeplay

The Section-12 Closing Window is not an infinite grind loop.

Closing options should exhaust naturally when:

- the conversation has been meaningfully resolved;
- the NPC has no further legitimate information/intent to provide;
- the evidence has already been examined;
- the action is no longer contextually possible;
- the player has left the location/context;
- a new primary dramatic problem begins.

If an optional action creates a **new primary dramatic problem, major escalation, new operation, or distinct mission objective**, that content should normally belong to the next Mission rather than being hidden indefinitely inside Section 12.

This preserves both player freedom and the 12×12 pacing discipline.

---

## 6. Current Arc 2 boundary

Current live segmentation remains:

### Arc 2 Mission 2 — THE LEAK

Starts with Menma and Mikoto at the shop hearing rumours.

Ends immediately before Menma descends into the concealed underground facility.

### Arc 2 Mission 3

Starts when Menma begins making his way down into the underground facility.

Current Mission-3 history includes the underground operation, Battle, recovery/custody consequences, Hokage-office aftermath, private follow-up conversations and the current home/Jinchūriki conversation.

Exact retrospective assignment of the already-played A2M3 beats to Sections 1–12 has not yet been committed. When that assignment is performed, Section 12 must provide the explicit Mission-3 closing window described above rather than allowing numbered sections to continue indefinitely.

This document does not rewrite or reorder already-played factual Chronicle history.

---

## 7. Arc-3 retrospective pass

Once forward authoring reaches **Arc 3**, Writing will perform a retrospective structural pass across **Arc 1 through Arc 3**.

Purpose:

- map existing valid Story history into the 12-Mission / 12-Section grammar;
- add missing mission/section markers;
- identify where earlier continuous authoring crossed natural structural boundaries;
- preserve committed Chronicle causality and legitimate player/NPC choices;
- avoid rewriting correct history merely to make the numbering look neat.

The retrospective pass is a **structural reconciliation**, not permission to erase or fabricate past Chronicle events.

Preserve:

> **structure reconciliation ≠ history rewrite**

and:

> **design closed ≠ implemented ≠ runtime validated ≠ Golden/regression GREEN**

---

## 8. Ownership boundary

Writing owns Arc / Mission / Section narrative segmentation.

This authority does not automatically define:

- World locations or travel;
- Battle packages;
- Progression rewards;
- Rank/Promotion;
- Registry identity;
- runtime persistence implementation;
- UI presentation;
- Golden/regression status.

Those remain with their owning systems.
