# Shinobi Chronicles — Chronicle Protagonist, Lineage, Promotion and Team Separation

**Date:** 2026-10-05
**Owner:** CE / Codex / Coordination + Stephen
**Status:** BINDING SC CONTRACT — DESIGN CLOSED
**Source:** #522

## Core separation

`person identity != representation definition != owned Character lineage != card title != formal Rank != currentTeam != activity participants != Battle deployment`

Origin selection establishes one exact **Chronicle protagonist lineage**. Changing team, mission participants, Battle deployment, card representation or formal Rank does not replace the protagonist.

## Current Rank

On protagonist / Chronicle identity surfaces:

> **Current Rank = the Origin protagonist lineage's authoritative current formal Rank.**

It is not team Rank, highest teammate Rank, card title or Battle-deployment Rank.

## Name, title and Rank

> **Person Name != Card / Representation Title != Formal Rank.**

Ordinary identity UI must not treat shorthand such as `Academy Menma` or `Kage Naruto` as the person's literal name.

## Current Team

Opening/onboarding authority may require the protagonist temporarily. After that exact restriction is lifted:

> **currentTeam may contain any legal owned/available Character lineages and need not include the Chronicle protagonist.**

An all-Jōnin team with no Origin card is conceptually legal.

`Chronicle protagonist != currentTeam member`.

## Activity participants and Battle deployment

Story / World / Mission authority declares who is present for an exact occurrence and may require, allow, or legitimately omit the protagonist without rewriting persistent `currentTeam`.

Battle deployment consumes the exact legal participants for that Battle. The protagonist is not silently injected into every Battle.

`currentTeam != activity participants != Battle deployment`.

Player presentation through another participant does not automatically grant that participant's observations to an absent protagonist.

## Same person, multiple representations

Multiple distinct Character Cards of the same fictional person remain one person identity while carrying separate representation/lineage histories.

Default collectible cardinality:

> **one owned copy per exact representation ID unless an explicit future exception says otherwise.**

Distinct representations of the same person may coexist, including at the same broad rank-stage, while mutable Chronicle history remains lineage-local.

## Promotion is lineage-preserving and universal

Promotion is not Origin-only. Any legally promotable owned Character lineage may advance formal Rank and may advance into an authorised rank-stage representation.

Promotion does not reset Current Stats/PL, replace learned Skills, erase Knowledge/relationships/history/provenance, reinitialize from a fresh catalogue card, or consume Evolution merely to change Rank.

> **fresh higher-rank representation package = initialization authority**

> **promotion into a higher-rank representation = lineage-preserving transition**

A Chronicle-grown Genin Hinata and a directly acquired Genin Hinata may therefore be different exact representations/lineages while remaining the same person.

## Starting Skill breadth

Fresh representation starting-package breadth does not become a Promotion grant. A promoted Character keeps legitimately learned Skills.

## Evolution remains separate

Evolution does not perform Rank advancement.

> **one Evolution entitlement per authorised playthrough/difficulty completion; target one eligible owned exact lineage.**

> **an exact owned lineage may consume Evolution at most once.**

## #405 supersession

This contract supersedes only conflicting older #405 assumptions:
1. blanket same-person simultaneous-representation prohibition for ordinary distinct Character Cards;
2. special mandatory Origin Evolution entitlement plus extra non-Origin entitlement;
3. the rule that Promotion cannot advance an Origin lineage into a rank-stage representation.

Unrelated #405 provenance/source-acquisition/anti-duplication safeguards remain active.

## Singular-source anti-duplication

Multiple same-person cards do not authorise duplication of singular external sources. Hosted Entities, exact Tailed Beast partitions, unique Summon instances and other provenance-bound sources obey their own reservation/compatibility rules.

> **same-person representation multiplicity may be legal; singular-source duplication is not thereby legal.**

## Step-5 implementation closure

For #449 Step 5 deliberate team assignment:
- purchase remains ownership-only;
- assignment is deliberate;
- protagonist is not mandatory after opening restrictions;
- exact representation/lineage ID is the assignment key;
- distinct same-person representations may be assigned together unless an exact source/deployment rule blocks them;
- one exact representation cannot be duplicated into multiple team slots;
- assignment does not mutate Rank, Story participants or Battle deployment;
- save/load preserves exact assigned lineage IDs and order.

This is sufficient to unblock Step 5 without implementing the future full Promotion presentation system.

## Final lock

> **The Chronicle protagonist is one exact history-bearing Origin lineage, not a permanent team slot. Multiple distinct representations of one person may coexist with separate histories. Promotion advances the exact lineage and may change its rank-stage representation without resetting its history. Evolution remains a separate one-time lineage-development system.**
