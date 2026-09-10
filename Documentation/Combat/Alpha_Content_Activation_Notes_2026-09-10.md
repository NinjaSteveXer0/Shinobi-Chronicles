# Shinobi Chronicles — Alpha Content Activation Notes

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **IMPLEMENTATION-FACING NOTES — NO AUTOMATIC ACTIVATION**

## Immediate use of the new catalogue

The new 200-Skill and 96-entry Item/Weapon/Gear/Material catalogues are intended to reduce downstream authoring duplication. Consumers should reference stable catalogue IDs rather than retyping mechanically divergent copies of the same generic technique/equipment concept.

## Skills

A Skill may enter an Alpha player's usable state only through legitimate source/access authority. Typical source families named in the catalogue are guidance, not grants:

- Academy/general training;
- elemental training;
- mentor training;
- mission/Chronicle reward;
- scroll/archive/formula discovery;
- specialist training;
- capability/bloodline development gate;
- legendary provenance/Chronicle gate.

World/Story can author the factual source opportunity; Progression/Development can author learned/access state; Combat owns the executable effect; Coding consumes the resulting exact state.

Do not implement `missionComplete => skillUnlocked` unless a specific durable contract explicitly says that exact mission completion is the grant source.

## Items / equipment

Catalogue-only content may later be sourced by:

- shops/services;
- mission/event reward packages;
- crafting recipes;
- world discoveries;
- enemy/object recovery;
- mentor/institution provision;
- provenance-bearing unique rewards.

The catalogue does not decide which source currently offers which item.

## Alpha runtime strategy

Do not make Alpha completion depend on individually bespoke UI art or one-off code path per catalogue row.

Preferred consumption pattern:

1. stable definition registry;
2. generic text-first display with rarity metadata;
3. generic ownership/equip/prepare state;
4. generic resolver families for direct damage, prevention, recovery, bounded control, information and payload requirements;
5. source-specific exceptions only where semantics actually differ;
6. exact acquisition/access bindings as relevant missions/training/content activate.

This is an implementation strategy note, not permission for Combat to mutate Coding architecture unilaterally.

## Future catalogue growth

The initial 200 Skills are a floor for useful breadth, not a hard cap. Add new Skills when a real character, mission, mentor, training branch, bloodline/clan capability or world reward needs a genuinely distinct semantic action.

Do not inflate the catalogue merely to hit a number; prefer distinct gameplay/source identity over near-duplicate names with identical mechanics.
