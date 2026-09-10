# Shinobi Chronicles — Alpha Content Activation Notes

**Date:** 2026-09-10  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **IMPLEMENTATION-FACING NOTES — NO AUTOMATIC ACTIVATION**

## Current catalogue

Current text-first authority contains **320 Skills** and **96 Item/Weapon/Gear/Material definitions**. Consumers should reference stable catalogue IDs rather than create mechanically divergent duplicates.

No dedicated image asset is required for these Alpha content families.

## Skill activation

A Skill becomes usable only through legitimate source/access authority. Catalogue source-family labels are guidance, not grants.

Story/World/Missions can author factual opportunities; Progression/Development authors learned/access state; Combat/Skills authors exact effects/compatibility; Acquisition/Inventory owns object grants where applicable; Coding consumes the resulting state.

Never implement `missionComplete => skillUnlocked` unless an exact durable contract says that mission completion is itself the grant source.

## Contextual Skill modes

Binding contract:
`Documentation/Combat/SC_Combat_Contextual_Passive_Active_Skill_Surface_2026-09-10.md`

Supported semantic modes now include:
- `battle_active`;
- `passive_contextual`;
- `active_contextual`;
- `hybrid_contextual`.

### Passive contextual

- evaluation/polling is side-effect-free;
- no action/turn is consumed merely because a passive is checked;
- no Chronicle occurrence commits from UI refresh/option preview/eligibility polling;
- the passive may participate only when Story/World/Event authority supplies a compatible factual context;
- commit an occurrence only when the passive materially affects an actual resolved query/event/decision.

### Active contextual

- requires an exact current caller-supplied target/query/object/system/route/relationship;
- invalid context rejects before commit;
- outside Battle, consumes only a caller-defined contextual interaction opportunity where such a concept exists;
- inside Battle, consumes the Character's normal action opportunity unless exact authority says otherwise.

### Hybrid contextual

Passive surface may expose bounded eligibility/information; deliberate active use performs the intervention. Showing the option is not the same as using it.

## False Identity

`skill_false_identity` is the flagship `passive_contextual` Skill. For current Arc-1 Menma it is a derived passive surface of legitimately earned Identity Rebinding capability, not a duplicate second unlock.

When an exact compatible recognition query exists and a legitimate current recognised false profile is available, the passive may supply that profile as the presented answer. The target system still resolves accepted/rejected/challenged/partial/incompatible normally.

`skill_false_identity_recognition_substitution` is the separate deliberate active technique. Do not collapse it into the passive.

False Identity never means stable identity rewrite, legal-authority forgery, universal stealth, universal Hosted-Entity hiding or guaranteed security bypass.

## Items/equipment

Catalogue-only content may later be sourced by shops/services, missions/events, crafting, discoveries, recovered objects, mentors/institutions or provenance-bearing rewards. Catalogue presence does not create ownership or availability.

## Preferred Alpha runtime architecture

Prefer reusable registries/evaluators rather than one-off code per row:

1. stable definition registry;
2. generic text/rarity/mode presentation;
3. learned/owned/prepared/equipped state kept separate;
4. generic Battle resolver families for direct damage/prevention/recovery/control/information;
5. generic contextual evaluator for passive/active/hybrid event Skills;
6. exact access/compatibility/source predicates;
7. source-specific exceptions only when semantics genuinely differ;
8. occurrence commit only for factual participation;
9. save/load/idempotence;
10. Golden coverage for activated slices rather than pretending all 416 definitions are implemented.

## Future growth

320 Skills is not a cap. Add distinct Skills when a real character, mission, event, mentor, training route, bloodline, Kinjutsu, Hosted Entity or world interaction needs them. Do not pad counts with renamed duplicates.
