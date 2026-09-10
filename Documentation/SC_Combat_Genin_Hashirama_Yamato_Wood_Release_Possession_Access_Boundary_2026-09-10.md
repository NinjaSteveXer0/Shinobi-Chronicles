# Shinobi Chronicles — Genin Hashirama / Yamato Wood Release Possession and Access Boundary

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING PLAYER-DIRECTION CLARIFICATION — POSSESSION CLOSED / ACCESS REQUIREMENTS REMAIN GATED**  
**Related coordination:** GitHub issue #81

## 1. Player-direction lock

Stephen has explicitly decided that both of these Genin representations possess Wood Release from representation start:

- `genin_hashirama`
- `genin_yamato`

This supersedes any interpretation that their Wood Release capability is absent merely because the current Registry/PL admission deliberately did not infer executable Wood Release Skills from Stats or card art.

Exact rule:

> **Wood Release is attached to `genin_hashirama` and `genin_yamato` from the start as a possessed capability/source, but executable access remains locked behind legitimate requirements.**

## 2. Required semantic separation

For both representations, preserve distinct states:

1. **Possession / represented capability** — YES from representation start.
2. **Knowledge that the capability exists** — observer-relative; does not follow automatically for every observer.
3. **Access / activation permission** — LOCKED until the owning Progression/Bloodline/Development authority says the requirements are satisfied.
4. **Competence** — separately earned/authorised.
5. **Power / exact Effective-State contribution** — separately authored when access is live.
6. **Mastery** — separately earned/authorised.
7. **Executable Wood Release Skills** — Combat-authored actions become selectable only when their exact access predicates are satisfied.

Therefore:

**possession != access != competence != power != mastery**

## 3. Registry / PL preservation

Current Genin Registry baselines remain unchanged by this clarification:

- `genin_hashirama` — Base Stats `36/30/25/18/18/21/39`, Base PL **36**.
- `genin_yamato` — Base Stats `31/25/23/22/23/21/32`, Base PL **30**.

This document does not silently add Stats or direct PL merely because Wood Release is possessed.

If later legitimate Wood Release activation owns temporary or developed Stat modifiers, those modifiers must come from exact source-owned PL/Progression authority rather than being back-filled into these Base packages by Combat.

## 4. Combat-facing capability keys

Combat reserves the following capability/access grammar for catalogue actions:

- possession key: `capability.wood_release.possessed`
- access key: `capability.wood_release.access`

For `genin_hashirama` and `genin_yamato`:

```text
capability.wood_release.possessed = true
capability.wood_release.access = false by default
```

until a legitimate owner-produced development/access record changes the second value.

A Wood Release action must reject precommit when `capability.wood_release.access != true`.

Rejected selection:
- consumes no action opportunity;
- creates no Technique-use occurrence;
- creates no false history;
- does not grant access by attempted use.

## 5. Skill catalogue consequence

The Alpha text-first Skill catalogue may contain Wood Release techniques immediately.

Those catalogue rows are valid authored techniques, but being present in the catalogue does not grant them to Hashirama, Yamato, another Character, the player's account, Inventory, roster, or prepared palette.

When access becomes legitimate, exact prepared-palette / learned-Skill authority may expose the appropriate subset.

Do not infer that every Wood Release technique is granted at the first unlock boundary.

## 6. Non-collapse

- Wood Release possession != active Wood Release.
- card art != access.
- Registry Stats != Skill ownership.
- famous future identity != adult repertoire.
- Hashirama Wood Release != Yamato Wood Release mastery/effect equality.
- same capability family != same exact learned techniques.
- attempted use != unlock.
- unlock != mastery.
- capability access != direct hidden PL bonus.
- Skill catalogue presence != prepared palette.

## 7. Cross-owner requirement

Progression / Bloodline / Development still owns the exact requirements that change:

`capability.wood_release.access: false -> true`

and any subsequent competence/mastery development.

Combat owns the exact executable effects after access is legitimate.

This requirement should be coordinated through existing issue #81 rather than creating duplicate traffic.
