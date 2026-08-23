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

