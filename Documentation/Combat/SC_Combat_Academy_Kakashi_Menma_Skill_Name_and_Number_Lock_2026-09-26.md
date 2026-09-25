# Shinobi Chronicles — Academy Kakashi + Academy Menma Skill Name and Number Lock

**Date:** 2026-09-26  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** DESIGN CLOSED — Stephen signed off; Coding consumption required.  
**Authority rule:** GitHub live source > durable CE/SC documents > current specialist decisions > Project memory.

## Scope

This document closes the player-facing Skill names for the current Academy Kakashi and Academy Menma prepared Origin palettes and closes the approved Kakashi enhanced Opening Strike numerical recalibration.

It does **not** change:
- character Stats;
- Base PL;
- the global Stamina mitigation formula;
- Menma's current raw attack numbers;
- machine/stable Skill IDs;
- progression or acquisition pathways for later character-authentic techniques;
- Kurama access;
- Story rewards;
- enemy Stats/PL by implication.

## Global character-specific Skill naming rule — LOCKED

Before Combat names or renames a character-specific technique, Combat must check current external character/canon/reference material first, matching the standing Character Creations research-first discipline.

Research is used to identify:
1. the character's established combat motifs, weapons, tactics, naming language and known techniques;
2. what is believable for the character at the **current represented stage**;
3. what belongs in the character's **future learnable/developable technique pool** rather than the current loadout.

Research does **not** authorize automatic access to later signature techniques.

Current-stage loadout != full future technique ceiling.

Character-authentic later techniques may be reached through the proper Progression / World / Exams / Practical / training / repeated-use / hotspot / event / teacher / discovery pathways as separately authored. Combat must not silently grant them in an Origin palette.

## Academy Menma — signed-off display names

Stable machine IDs remain unchanged.

| Stable Skill ID | Locked player-facing display name | Current authored function / number |
|---|---|---|
| `academy_menma_chakra_knuckle` | **Driving Chakra Fist** | Direct attack, ATK **6** |
| `academy_menma_crescent_kunai` | **Crescent Fang** | Direct attack, ATK **5** |
| `academy_menma_guard_breaker` | **Shattering Blow** | Direct attack, ATK **7**, existing conditional guard rider unchanged |
| `academy_menma_shadow_clone_feint` | **Shadow Clone Ambush** | Setup, **0 direct damage**; existing semantics unchanged |
| `academy_menma_shadowstep` | **Vanishing Step** | Reposition/movement, **0 direct damage**; not teleportation; existing semantics unchanged |

### Menma numeric decision

Stephen signed off **no raw-damage increase** to the current Menma Origin attack values at this stage.

The approved half-scripted Menma + Anko encounter structure is the balancing intervention for the Origin encounter. Do not compensate by changing Menma Stats/Base PL, lowering enemies by implication, granting Kurama, or adding hidden Origin-only scaling.

The current known utility gaps for Shadow Clone Ambush / Vanishing Step are **not silently repaired by this naming lock**. Any semantic extension must be separately owned and closed.

## Academy Kakashi — signed-off display names

Stable machine IDs remain unchanged.

| Stable Skill ID | Locked player-facing display name | Locked function / number |
|---|---|---|
| `academy_kakashi_kunai_quickdraw` | **Flash Kunai** | Direct attack, ATK **5** |
| `academy_kakashi_clone_feint` | **Clone Switch** | Setup, **0 direct damage** |
| `academy_kakashi_opening_exploit` | **Precision Strike** | Direct attack, ATK **5** normally; ATK **11** when consuming the exact Clone Switch setup |
| `academy_kakashi_wire_snare` | **Wire Fang** | Control/restraint attempt, **0 direct damage**; existing control semantics remain subject to their separate implementation contract |
| `academy_kakashi_substitution_jutsu` | **Substitution Jutsu** | Defensive self Skill per existing durable Substitution Jutsu replacement authority |

## Kakashi numerical recalibration — LOCKED

Only the enhanced `academy_kakashi_opening_exploit` packet changes:

- normal Precision Strike: ATK **5** — unchanged;
- Clone Switch-enhanced Precision Strike: ATK **7 -> 11**;
- Flash Kunai: ATK **5** — unchanged.

Locked mitigation remains:

`max(1, floor(resolvedAttackPL * 100 / (100 + Effective Stamina)))`

At ATK 11, the enhanced Precision Strike produces the previously reviewed fresh-Origin packets:
- Masked Interceptor, Stamina 13: **9 damage**;
- Package Smuggler, Stamina 10: **10 damage**;
- ANBU Marked Target, Stamina 17: **9 damage**.

This makes the two-action Clone Switch -> Precision Strike sequence meaningfully stronger than simply spending both actions on two ATK-5 attacks, while preserving the existing route timing intent reviewed before sign-off.

## Existing Kakashi supersession remains binding

`academy_kakashi_prodigys_read` / Analyze Opponent is **not** part of the signed-off prepared palette.

The already-closed Substitution Jutsu replacement remains authoritative. This document does not reopen or redesign that replacement.

## Coding consumption requirements

Coding should:
1. preserve every stable machine Skill ID;
2. project the exact locked `displayName` values above;
3. change only Kakashi enhanced Precision Strike from ATK 7 to ATK 11;
4. leave Menma's 6 / 5 / 7 raw attack values unchanged;
5. consume the already-closed Substitution Jutsu replacement instead of retaining Prodigy's Read;
6. avoid factory title-casing of machine IDs when an authored player-facing display name exists;
7. update deterministic diagnostics/tests for the exact display names and Kakashi enhanced damage packets;
8. prove runtime consumption separately.

## Status distinction

- **Design:** CLOSED.
- **Implementation:** NOT PROVEN by this document.
- **Runtime validation:** NOT PROVEN.
- **Golden/regression:** NOT PROVEN.
