# Shinobi Chronicles — Development Decision Log

## Purpose

This document records major design, technical, gameplay, and architectural decisions made during the development of Shinobi Chronicles.

The purpose of this log is to preserve:

- The reasoning behind important choices
- The evolution of game systems
- The philosophy behind player progression
- The structure of the Chronicle Engine implementation
- Future development guidance

A decision should be recorded when it affects:

- Core gameplay systems
- Player experience
- Character design
- Progression philosophy
- Technical architecture
- World structure
- Commercial direction


---

# Decision Entry Template


# Decision [NUMBER]

## Date

YYYY-MM-DD


## Category

Choose one:

- Architecture
- Gameplay System
- Character Design
- Progression
- Combat
- World Design
- User Experience
- Technical
- Business/IP


## Title

Short description of the decision.


---

# Decision Summary

## What was decided?

Describe the final decision clearly.


---

# Reasoning

## Why was this decision made?

Explain:

- The problem being solved
- The intended player experience
- The long-term benefit
- The alternatives avoided


---

# Alternatives Considered

## Option A

Description:

Advantages:

Disadvantages:


## Option B

Description:

Advantages:

Disadvantages:


---

# Final Choice

Chosen:

[Selected option]


Reason:

Why this decision was considered the strongest direction.


---

# Impact

## Systems affected:

List affected systems.


## Development impact:

Explain how this affects future development.


---

# Future Considerations

Possible future improvements or areas to revisit.


---

# Related Documents

References:

- Chronicle Engine Bible
- Architecture Map
- Development Milestones
- System Documentation



---

# Existing Decisions


# Decision 001

## Date

2026-08-23


## Category

Architecture


## Title

Shinobi Chronicles will be built using Chronicle Engine principles.


---

# Decision Summary

Shinobi Chronicles will not be developed as a collection of isolated features.

Instead, gameplay systems will be connected through reusable engine architecture.

The game serves as an implementation of Chronicle Engine concepts.


---

# Reasoning

Early development focused on individual gameplay features.

As the project expanded, systems began naturally connecting:

- Locations
- Activities
- Battles
- Characters
- Progression
- Rewards

The decision was made to formalise these connections into a reusable architecture.


---

# Final Choice

Chosen:

Develop Shinobi Chronicles as a Chronicle Engine implementation.


Reason:

This allows the game to become more scalable, maintainable, and expandable while preserving the original gameplay vision.


---

# Impact

Systems affected:

- Location Engine
- Activity Engine
- Progression Engine
- Reward Systems
- Future Chronicle Systems


Development impact:

Future systems should be designed around shared engine principles rather than isolated feature code.



---

# Decision 002

## Date

2026-08-23


## Category

Character Design


## Title

Characters should be collected through progression, not random chance.


---

# Decision Summary

Shinobi Chronicles will not use a gacha-style character acquisition system.

Characters and variants should be obtained through intentional gameplay progression.


---

# Reasoning

The goal is for characters to feel meaningful because of player achievement.

Obtaining a character should represent:

- Completion
- Discovery
- Progression
- Accomplishment

rather than artificial scarcity.


---

# Final Choice

Chosen:

Intentional character acquisition.


Examples:

- Story progression
- Shops
- Major battles
- Achievements
- Kage progression


---

# Impact

Systems affected:

- Character Collection
- Progression
- Rewards
- World Exploration


---

# Decision 003

## Date

2026-08-23


## Category

Character Design


## Title

Character variants must have unique identities.


---

# Decision Summary

Character variants should not be simple recolours or minor edits.

Each variant should represent a meaningful stage, timeline, transformation, or interpretation of the character.


---

# Reasoning

A character card should communicate identity immediately.

Differences should include:

- Visual design
- Pose
- Composition
- Expression
- Equipment
- Background
- Theme


---

# Final Choice

Chosen:

Every character variant receives a distinct visual identity.


---

# Impact

Systems affected:

- Character Cards
- Collection System
- Future Variant Design
- Player Recognition



---

# Decision 004

## Date

2026-08-23


## Category

Combat


## Title

Power Level should represent capability, not replace character identity.


---

# Decision Summary

Power Level is a useful measurement system but should not determine every aspect of combat.

Characters should remain differentiated through:

- Stats
- Elements
- Weapons
- Abilities
- Synergy


---

# Reasoning

A lower Power Level character can still be valuable through:

- Strategic advantages
- Unique abilities
- Equipment synergy
- Team composition


---

# Final Choice

Chosen:

Power Level is one factor in character strength, not the entire identity.


---

# Impact

Systems affected:

- Combat Formula
- Character Stats
- Equipment
- Team Building



---

# Decision 005

## Date

2026-08-23


## Category

Progression


## Title

Legendary equipment requires synergy, not only rarity.


---

# Decision Summary

Weapons and equipment should gain value from history, ownership, compatibility, and character relationships.


---

# Reasoning

A legendary weapon should feel legendary because of its connection to the world and characters.

Example:

A weapon's value may change depending on:

- Previous wielder
- Character compatibility
- Fighting style
- Elemental alignment


---

# Final Choice

Chosen:

Equipment progression will focus on meaning and synergy.


---

# Impact

Systems affected:

- Equipment Engine
- Character Progression
- Combat Systems



---

# Decision 006

## Date

2026-08-23


## Category

World Design


## Title

Maps should be functional gameplay spaces, not decorative backgrounds.


---

# Decision Summary

World maps must communicate exploration, progression, and discovery.


---

# Reasoning

A map should answer:

- Where can the player go?
- What is discovered?
- What is locked?
- What exists beyond current progression?


---

# Final Choice

Chosen:

Maps will combine visual identity with gameplay information.


---

# Impact

Systems affected:

- World Map
- Location Engine
- Exploration
- Progression



---

# Decision 007

## Date

2026-08-23


## Category

Development


## Title

Code development will follow header-anchored incremental changes.


---

# Decision Summary

All code modifications must reference the current system headers.

Changes must specify:

- Exact location
- Insert or replacement method
- Testing requirements


---

# Reasoning

Rapid development caused systems to overlap and created duplicate functions.

A structured workflow improves:

- Maintainability
- Debugging
- Future expansion


---

# Final Choice

Chosen:

Controlled incremental development.


---

# Impact

# Decision 008

## Date

2026-08-23


## Category

Architecture


## Title

Activities use a shared result and reward pipeline.


## Decision Summary

All gameplay activities should generate a standardised result object before rewards are processed.


## Reasoning

Previously, different gameplay systems could handle rewards independently.

The Chronicle Engine approach centralises this process so future systems can share:

- Rewards
- Progression
- History
- Events


## Impact

Systems affected:

- Training
- Exams
- Missions
- Battles
- Future Events


## Final Choice

Chosen:

Universal Activity Result Pipeline

Systems affected:

- Entire codebase
- Chronicle Engine development workflow


---

# Decision 009

## Date

2026-09-04

## Category

World Design / User Experience

## Title

World Map artwork is separated from global HUD and runtime map truth.

## Decision Summary

The production World Map uses a clean reusable artwork layer. Application branding, navigation, resources, region/location labels, locks, Knowledge-sensitive hotspots, Story/event/threat presentation, hover state and selection state are runtime UI and must not be baked into the map artwork.

`world_map_clean.png` is the approved clean-world-art direction.

Genuine cartographic/environmental decoration such as the compass, ships, birds, clouds, coastlines, terrain and physical landmarks may remain baked into the artwork.

## Reasoning

The former map baked global HUD and runtime semantics into the art, causing duplication, stale state and conflict with Chronicle-aware Knowledge-sensitive presentation.

The clean separation allows the world artwork to remain visually stable while runtime state changes safely above it.

## Final Choice

Chosen:

**world/map artwork ≠ application HUD ≠ runtime map presentation.**

## Impact

Systems affected:

- World Map
- global HUD
- Knowledge-sensitive hotspots
- Story/event presentation
- map labels and locks
- responsive UI
- future regional-map presentation


---

# Decision 010

## Date

2026-09-04

## Category

Business/IP / User Experience

## Title

Concept #18 is the universal Shinobi Chronicles master franchise emblem.

## Decision Summary

Logo concept #18 is the preferred/winning universal **SHINOBI CHRONICLES** franchise master emblem.

The global brand unit is:

**#18 + SHINOBI CHRONICLES**

No Japanese subtitle is used in the Alpha global HUD treatment.

The franchise mark belongs to runtime application chrome and is not baked into world/map artwork.

Concept #28 remains a secondary candidate for Chronicle/Renewal-system symbolism rather than the franchise masterbrand.

## Reasoning

#18 has the strongest franchise-level silhouette, scalability, neutrality across future games, small-size legibility and ability to remain recognisable across different Shinobi Chronicles titles.

The franchise identity must remain distinct from game-specific world art and from Chronicle Engine / Chronicle Reaper symbolic identity.

## Final Choice

Chosen:

**#18 = SHINOBI CHRONICLES master franchise mark.**

Preserve:

**Shinobi Chronicles franchise mark ≠ canonical Chronicle architecture emblem ≠ Chronicle Reaper-specific derivative.**

## Impact

Systems affected:

- global HUD
- launcher/icon identity
- future Shinobi Chronicles titles
- visual identity
- World Map application chrome


---

# Decision 011

## Date

2026-09-04

## Category

Combat / User Experience

## Title

Battle Victory reward claim and later continuation are separate lifecycle actions.

## Decision Summary

For the Shinobi Chronicles staged Victory flow, earning a reward, claiming/applying that reward, remaining on the completed Victory presentation, and later navigating away are separate states/actions.

Production UI must preserve:

**Battle victory committed → Victory presentation → CLAIM → claimed/recorded Victory state remains visible → CONTINUE → route away.**

`CLAIM` and `CONTINUE` must not be collapsed into one automatic claim-and-route action.

## Reasoning

The resolved Battle Outcome and reward entitlement already exist before claim. Claim commits persistent reward consequences. Navigation is a later encounter/presentation lifecycle transition and must not reapply or duplicate rewards.

This separation supports reload/retry safety and matches Chronicle Engine reward-entitlement integrity doctrine.

## Final Choice

Chosen:

**CLAIM ≠ CONTINUE.**

Closing/dismissing the Victory presentation must not bypass authoritative claim/continuation state.

## Impact

Systems affected:

- Battle Victory UI
- reward entitlement/claim
- persistence/save-load
- encounter routing
- Chronicle consequence recording


---

# Decision 012

## Date

2026-09-04

## Category

Technical / User Experience

## Title

Battle Portrait assets are distinct from collectible Character Card assets.

## Decision Summary

Square Battle Portrait assets are a separate presentation authority from premium collectible Character Card art.

Battle UI must resolve an approved Battle Portrait for the exact Registry identity rather than silently crop/reuse collectible-card art or depend on an ambiguous generic participant image.

Exact production repository paths remain asset-authority data and must not be invented by Coding before approved files physically exist.

## Reasoning

Battle portraits and collectible cards serve different compositions, crops and UI functions. Treating them as interchangeable creates visual inconsistency and can collapse representation identity into asset convenience.

## Final Choice

Chosen:

**collectible Character Card asset ≠ Battle Portrait asset.**

Use dedicated Registry-ID → approved Battle Portrait asset/path authority once the files are supplied.

## Impact

Systems affected:

- Registry asset projection
- Battle UI
- asset manifests/resolvers
- Character Card presentation


---

# Decision 013

## Date

2026-09-04

## Category

Combat / User Experience

## Title

Persistent Battle formation uses four active/front-queue positions and two reserve positions.

## Decision Summary

The authoritative six-slot formation is:

1. START
2. NEXT 1
3. NEXT 2
4. NEXT 3
5. RESERVE 1
6. RESERVE 2

Runtime status semantics classify slots 1–4 as the active/front queue and slots 5–6 as reserve.

Any legacy filter that treats Active as slots 1–3 and Reserve as slots 4–6 is stale and must not drive UI design or player-facing semantics.

## Reasoning

The permanent Battle UI and My Clan/Battle ordering already use START → NEXT 1 → NEXT 2 → NEXT 3 → RESERVE 1 → RESERVE 2. A stale filter must be corrected to match the production formation rather than causing a redesign around incorrect source behavior.

## Final Choice

Chosen:

**ACTIVE/front queue = slots 1–4.**

**RESERVE = slots 5–6.**

## Impact

Systems affected:

- Battle queue
- My Clan formation filters
- roster presentation
- runtime status/filter helpers
- regression coverage
