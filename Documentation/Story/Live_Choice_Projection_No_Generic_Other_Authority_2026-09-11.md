# Shinobi Chronicles — Live Choice Projection / No Generic `Other` Authority

**Date:** 2026-09-11  
**Owner:** Writing — Konoha  
**Status:** **BINDING WRITING / STORY CHOICE-PROJECTION CORRECTION**

## 1. Correction

The generic player-facing option **`Other` / `Something else` / `Menma has another idea`** is not a valid normal live-game choice.

Shinobi Chronicles does not assume a free-text natural-language action box that can safely turn arbitrary player prose into authoritative runtime intent.

Therefore Writing must not use a generic `Other` option as an escape hatch for incomplete choice authoring.

## 2. Live-game choice rule

At a meaningful protagonist decision seam, the live game should present only choices that are:

- currently legitimate from committed Chronicle state;
- semantically understood by the Story / CE / owning resolver;
- executable by the runtime;
- observer-safe and Knowledge-valid;
- distinct enough to represent genuinely different available intents.

CE may select/project different eligible choices for different Chronicles from current Knowledge, relationships, capabilities, inventory, location, history and other authorised state.

A choice being contextually generated/selected does **not** mean CE may invent eligibility. Eligibility must already exist.

## 3. Developer-authoring chat vs shipped game

During developer authoring with Stephen, Stephen may type a custom protagonist action that is not in the displayed examples. The authoring session can then determine whether that proposed intent is legitimate and route it through the owning authority.

That developer freedom does **not** imply a shipped `Other` button.

Authoring examples are therefore not automatically the final UI option set.

## 4. Choice count / presentation

Prefer a compact set of meaningful live choices, normally around **3–5** when that many genuinely distinct eligible intents exist.

Do not pad the menu to reach a target count.
Do not add `Other` merely to imply unlimited agency.
Do not show an option that the runtime cannot actually resolve.

If only two legitimate meaningful actions exist, show two.
If five exist and are useful, show five.

## 5. Relationship to existing authority

This document narrows the wording in:

`Documentation/Story/Interactive_Story_Player_Agency_Character_Autonomy_Cadence_and_Earned_Possibility_Authority_2026-09-11.md`

Specifically, its allowance for a player-authored alternative applies only **where an actual interface/runtime capability exists to accept and resolve that alternative**. Current normal live-game design must not assume such a free-text pathway.

Preserve:

> **The player chooses the Origin Character. NPCs choose themselves. CE resolves what the world permits.**

But player agency is expressed through legitimate executable choices, not a fake universal `Other` button.

## 6. State boundary

This is a Story / choice-projection semantic correction.

It does not claim:

- that dynamic CE option projection is already implemented;
- that UI choice rendering is runtime validated;
- that arbitrary natural-language intent parsing exists;
- Golden/regression GREEN.

**design closed != implemented != runtime validated != Golden/regression GREEN**
