# Shinobi Chronicles — Bloodline Contextual Use, Representation and Battle Access Non-Collapse

**Date:** 2026-10-01
**Owner:** Stephen
**Coordination:** CE / Codex / Coordination
**Status:** BINDING PHASE-2 SEMANTIC CORRECTION / EXACT MECHANICAL REQUIREMENTS REMAIN OWNER-SPECIALIST WORK

## 1. Purpose

Phase 2 requires Bloodline / Hosted-Entity truth to work consistently across Character representations, Story dialogue/actions, World/Hotspot choices, Shinobi Record, Battle, Skill learning and persistent development.

The project must stop treating one boolean unlock as though it means all of those things.

## 2. Required capability layers

For persistent Character capability, preserve separate questions:

1. Possession / lineage truth — does this Character factually possess the source/capability?
2. Awakening / manifestation truth — has a capability that requires an awakening event actually awakened?
3. Contextual Story/World Access — may this Character legitimately use the capability in non-Battle Story/World/dialogue problem solving?
4. Battle Access — may the executable Battle package/benefits currently be activated?
5. Skill Access — which exact techniques are actually learned/available?
6. Competence
7. Power
8. Mastery
9. Representation / visual state — which Character Card/portrait is being shown?

Canonical non-collapse:

possession != awakening != contextual access != Battle access != Skill access != Competence != Power != Mastery != representation

## 3. Byakugan — Hyūga contextual rule

Stephen explicitly requires:

A legitimate Hyūga such as Hinata who factually possesses the Byakugan must NOT be disqualified from Story/World/dialogue uses merely because the current Battle Bloodline package has not been unlocked.

Therefore for a Character such as Hinata:

- Byakugan possession/lineage = true where continuity says so;
- Story/World contextual Byakugan use may be available where the scene legitimately permits it;
- Battle activation/effects may remain locked behind Progression requirements;
- exact Byakugan Battle Skills remain separately gated;
- observer Knowledge remains required where another participant's awareness matters.

Examples of contextual use may include legitimate observation, chakra-network inspection, long-range/through-obstruction vision, reconnaissance, or dialogue choices based on what the Byakugan can reveal, only within the actual limits authored for that Character/capability.

This contextual availability does NOT grant Battle modifiers.

## 4. No mandatory “Byakugan unlocked” Character Card

Hinata and ordinary Hyūga do not require a second Character Card merely to express that Byakugan is currently usable contextually.

Their stable persistent Character carries the capability truth.

An activated-eye card may exist later as an optional visual/collectible representation if Stephen wants one, but special visual card != semantic requirement for Byakugan use.

## 5. Sharingan is different because awakening matters

Sharingan potential/lineage does not mean an unawakened Uchiha can already use Sharingan in Story/World.

For Sharingan:

Uchiha lineage / potential != Sharingan awakened.

Before the Character's legitimate awakening occurrence:
- no Sharingan contextual use;
- no Sharingan Battle use;
- no Sharingan technique-copy/perception benefits;
- no UI implication that awakening already happened.

Once Sharingan awakening legitimately commits:
- the Character now factually possesses awakened Sharingan;
- contextual Story/World use may become available;
- Battle use is controlled by exact Battle/Progression access rules;
- later Character representations inherit the historical fact unless an exact continuity reset/split says otherwise.

## 6. SC Sharingan tomoe rule

Stephen explicitly closes the ordinary Sharingan presentation/progression rule for this project:

> Shinobi Chronicles does not use a 1-tomoe -> 2-tomoe -> 3-tomoe gameplay progression ladder.

When the ordinary Sharingan is legitimately awakened/unlocked for the persistent Character, its ordinary Sharingan state is treated as three-tomoe Sharingan.

Mangekyō Sharingan and Eternal Mangekyō Sharingan remain separate advanced states with their own exact requirements.

This does not grant Mangekyō/EMS.

## 7. Mikoto representation rule

Current asset families include Genin Mikoto and Sharingan Mikoto.

Stephen's intended continuity:

- base Genin Mikoto may represent Mikoto before Sharingan awakening;
- when Sharingan awakening requirements are met, the stable Character's awakened Sharingan history commits;
- Sharingan Mikoto may be used as the explicit activated/awakened visual representation at the Genin stage;
- Sharingan Mikoto is NOT a second historical person;
- the Sharingan card does not become the only container of the capability.

If Mikoto later has Chūnin / Jōnin / ANBU / other stage representations, a separate Sharingan version of every rank/stage card is NOT mechanically required.

The persistent Character retains awakened Sharingan truth across legitimate later representations.

Stephen may create additional Sharingan-stage cards for collection/presentation reasons, but Coding/Progression must not require them for semantic capability continuity.

## 8. Sasuke uses the same representation law

Genin Sasuke may have ordinary Genin representation and Sharingan Genin representation.

Later Sasuke representations do not need “Sharingan” printed into every card/title/art asset for the stable Character to retain awakened Sharingan.

Representation says what is being shown.

Persistent capability state says what the Character can legitimately access.

## 9. Card rank/stage does not define capability history

A card labelled Genin, Jōnin, ANBU, Sannin, etc. is a representation/stage fact.

Do not infer formal Chronicle Rank, Bloodline awakening, Battle Access, Skill Access or Mastery only from the card title/art.

Likewise, a later-stage card does not erase an already committed Bloodline awakening.

## 10. Contextual-use gate

Story/World/Hotspot systems should consume an exact capability query equivalent to:

canUseCapabilityContextually(characterId, capabilityId, currentContext)

The query may consume:
- possession;
- awakening where required;
- contextual Access;
- exact scene constraints;
- current condition;
- observer Knowledge;
- current suppression/sealing/injury state where authored.

It must NOT simply ask whether Battle Bloodline access is unlocked.

## 11. Battle-use gate

Battle separately asks whether the executable package may activate.

Battle Access may require persistent development, stamina/control, Skill Access, source relationship/stage, specific unlock event, or current Battle legality.

Story contextual access does not bypass that package.

## 12. Hosted Entity analogy

Hosted Entity follows the same non-collapse grammar.

The entity/source may be factually attached to the Character while communication Access, contextual utility, transformation/stage Access and Battle executable Skills differ.

Attachment is history.

Access is current capability.

## 13. Shinobi Record projection

Shinobi Record may project observer-safe states such as Bloodline present, Awakened, Contextual capability known, Battle access locked, Technique access available, or Training route known only when the player Character legitimately knows those facts.

It must not leak hidden awakening requirements or future states.

## 14. Final lock

> A Character may factually possess a Bloodline/Hosted source, be able to use part of it contextually in Story/World, still have Battle benefits locked, and use a normal Character Card representation. Sharingan additionally requires a real awakening occurrence before contextual use exists; once awakened, that history persists across later representations and does not require a Sharingan-labelled version of every rank card.
