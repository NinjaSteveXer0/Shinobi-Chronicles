# Shinobi Chronicles — Unique Mechanics Design Standard

**Date:** 2026-09-19  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING GLOBAL COMBAT/SKILLS DESIGN STANDARD — ALL MECHANICALLY MEANINGFUL EFFECTS**  
**Source baseline:** `b97807c95125b59deede8d5c789195c12bf3648b`

---

# 1. Core law

Shinobi Chronicles is **not** to inherit generic RPG mechanics simply because those mechanics are familiar.

The project may borrow:

- foundations;
- broad ideas;
- recognisable tactical concepts;
- genre vocabulary;
- familiar implementation primitives.

But the final authored mechanic must be rebuilt into a **Shinobi Chronicles mechanic**.

Canonical rule:

> **Use generic RPG ideas as bones, never as the finished body.**

And:

> **If a mechanic could be copied unchanged into almost any RPG, it is not finished.**

---

# 2. Scope

This rule applies to **all mechanically meaningful authored effects**, including but not limited to:

- Skills;
- Techniques;
- Abilities;
- passive abilities;
- active abilities;
- hybrid/contextual abilities;
- Buffs;
- Debuffs;
- Status Effects;
- Conditions;
- Damage-over-time effects;
- Healing-over-time effects;
- Enhancement packages;
- Summon enhancements;
- Tailed-Beast relationship effects;
- Hosted-Entity effects;
- Bloodline effects;
- Transformation effects;
- Equipment effects;
- Weapon effects;
- Item effects;
- seals / Fūinjutsu effects;
- Kinjutsu effects;
- Genjutsu effects;
- elemental interactions;
- defensive reactions;
- counters;
- control effects;
- movement/reposition effects;
- battlefield states;
- source-owned Stat modifiers;
- temporary capacity effects;
- collection/set bonuses;
- environmental mechanical interactions;
- contextual Story/World/Mission capability effects;
- any future mechanic that materially changes what a Character, Entity, target, battlefield or resolver can do.

A mechanic does not escape this rule because it is labelled "passive", "utility", "support", "proc", "aura", "trait", "perk", "status", "bonus", "penalty", "effect", or another category.

---

# 3. Generic RPG patterns are primitives, not final designs

The following ideas may be used as implementation primitives, but **must not automatically become the final authored mechanic**:

- "+X% damage";
- "-X% damage";
- "+X Stat";
- "-X Stat";
- "Poison = tiny damage for N turns";
- "Burn = tiny damage for N turns";
- "Bleed = tiny damage for N turns";
- "Stun = skip a turn";
- "Slow = generic Speed reduction";
- "Taunt = target must attack me";
- "Shield = generic X% damage reduction";
- "Regeneration = heal X each turn";
- "Crit chance";
- "Dodge chance";
- "accuracy chance";
- generic cooldowns;
- generic mana/chakra-cost analogues;
- generic stack counters;
- generic combo points;
- generic elemental weakness charts;
- generic resistance percentages;
- generic "gain power when low HP";
- generic "deal more damage to poisoned/burning/stunned targets";
- generic "once per turn proc";
- generic "every third hit";
- generic passive auras;
- generic permanent collection bonuses with no source identity;
- generic cleanse-all / immunity-all;
- generic hard crowd control;
- generic "boss immunity" exceptions;
- filler skills that exist only to occupy a palette slot.

These primitives are not banned.

They are **insufficient by themselves**.

The final design must answer why this mechanic belongs specifically in Shinobi Chronicles and why it belongs specifically to this source.

---

# 4. Shinobi Chronicles mechanical fingerprint

Every meaningful mechanic should have a clear **mechanical fingerprint**.

At least one of the following should materially shape it, and important/named mechanics should usually use several:

- exact shinobi discipline;
- source identity;
- technique identity;
- elemental nature;
- weapon identity;
- body/biological property;
- seal/formula property;
- Bloodline property;
- Summon identity;
- Tailed-Beast relationship;
- Hosted-Entity relationship;
- terrain;
- positioning;
- observer Knowledge;
- source/target relationship;
- prior action/history;
- current Battle state;
- movement/reposition state;
- chakra-expression state;
- control/resistance state;
- authored risk;
- authored counterplay;
- transformation stage;
- exact condition established;
- exact interaction with another known mechanic;
- Chronicle/context eligibility;
- meaningful action-economy choice.

The mechanic should express **what the source is**, not merely which numerical bonus category was available.

---

# 5. The name-swap test

Before closing a mechanic, ask:

> **If I changed only the name and visual description, could this exact mechanic belong to ten unrelated Skills/Summons/Bloodlines/items in another RPG?**

If yes:

**FAIL — redesign it.**

Examples:

- "Poison Cloud: 3 damage for 3 turns" fails for a signature poison specialist.
- "Fire Aura: +10% Fire damage" may fail if nothing about the source changes how Fire is played.
- "Ancient Sword: +5% damage" fails if the weapon's identity contributes nothing else.
- "Legendary Beast: +10 Stamina" fails if that is merely a rarity tax.

A simple foundational Academy technique may intentionally be simple, but even simple foundations must use SC's own Battle PL / Stamina / action / context semantics rather than imported RPG assumptions.

---

# 6. Decision test

A good Shinobi Chronicles mechanic should create or sharpen a **decision**.

Examples of useful decisions:

- attack now or preserve a setup;
- cure a condition or fight through its consequence;
- remain attached for an enhancement or manifest for an action package;
- spend an action to reposition for a stronger route;
- exploit a source-specific opening or deny it;
- use a defensive response now or save it;
- accept a transformation risk for increased capability;
- expose a seal for access but create counterplay;
- commit to a powerful technique and risk interruption;
- use environmental/relationship context or choose a safer ordinary action.

Bad target:

> "This icon is lit, so numbers are slightly better."

Not every mechanic must be complicated. It must be **meaningful**.

---

# 7. Status-effect law

Status Effects are not a generic shared template library with different labels.

A status name/classification may provide shared runtime plumbing, but the **source-authored profile** determines what the effect actually means.

Examples:

## Poison

`poison` is a classification.

A specific poison may:

- deal immediate damage;
- punish exertion;
- numb movement;
- disrupt chakra use;
- worsen under repeated action;
- create a finisher prerequisite;
- force antidote timing;
- create an exact susceptibility.

Do not assume every Poison is the same fixed DoT.

## Burn

`burning` may classify fire injury/state, but a named Fire technique may use:

- immediate thermal damage;
- chakra-cost pressure;
- area denial;
- equipment interaction;
- smoke/visibility;
- ignition of authored materials;
- a source-specific escalation.

Do not reduce all Fire to a generic tick.

## Control

Do not default to universal "Stun".

Prefer exact restrictions where the fiction supports them:

- cannot reposition;
- cannot use substantial-free-movement actions;
- direct attacks constrained to a source;
- chakra-expression route blocked;
- weapon arm restrained;
- seal access suppressed;
- escape route denied;
- next precision action disrupted.

"Stun" is only valid if the exact source truly means total action denial.

---

# 8. Buff / enhancement law

A Buff or Enhancement must say:

1. **who owns the source**;
2. **when it is active**;
3. **what exact capability changes**;
4. **why that change expresses the source identity**;
5. **what ends it**;
6. **what does not stack / double-count**.

Activation classes may include:

- OWNED;
- ATTACHED;
- MANIFESTED;
- HOSTED;
- BONDED;
- TRANSFORMED;
- EQUIPPED;
- PREPARED;
- COLLECTION;
- CONTEXTUAL;
- exact authored hybrid conditions.

Do not use generic "+X% everything" where a narrower identity-specific enhancement is available.

Do not turn every rare source into a Stat stick.

---

# 9. Debuff law

A Debuff should create an exact disadvantage, not simply subtract arbitrary percentages from a generic stat.

Prefer:

- capability restriction;
- altered action options;
- source-specific vulnerability;
- target-selection constraint;
- movement constraint;
- chakra-expression interference;
- interaction with exact follow-up techniques;
- evidence/perception consequence;
- explicit Battle-PL pressure;
- conditional output reduction tied to source fiction.

A pure scalar Debuff is allowed only when the scalar itself is the clearest expression of the source and is deliberately authored.

---

# 10. Damage-over-time / repeated-damage law

Repeated damage must not default to:

> **minor damage now + tiny damage every turn for N turns**

For a meaningful named source, define:

- immediate threat;
- trigger model;
- escalation/decay;
- player choice;
- cure/counter;
- interaction with actions;
- source-specific payoff.

Possible patterns include:

- exertion-triggered damage;
- damage when chakra is used;
- escalating ticks unless treated;
- movement-triggered damage;
- repeated exposure increasing severity;
- delayed burst;
- target-controlled risk;
- source-specific finisher setup.

Fixed ticks may still exist for low-importance baseline effects, but they are not the design ceiling and should not be used lazily for signature mechanics.

---

# 11. Cooldown / recharge law

Do not add a generic cooldown because "games need cooldowns".

Recharge should come from the source where possible:

- poison gland replenishment;
- seal reset;
- physical recovery;
- stance recovery;
- chakra stabilisation;
- weapon reload/reset;
- transformation strain;
- environmental reacquisition;
- relationship/source refusal;
- once-per-Battle narrative/tactical commitment.

The player-facing reason should make sense.

---

# 12. Immunity / resistance law

Avoid generic immunity/resistance inflation.

Every immunity/resistance must define:

- exact classification blocked;
- whether immediate damage remains;
- whether secondary effects remain;
- whether Story/World outcomes are covered;
- whether source-specific superior effects can override it;
- activation condition.

"Poison Immunity" does not automatically mean "all toxins, venoms, corrosives, disease and Story poisoning fail."

---

# 13. Elemental design law

Elemental identity is more than a coloured damage type.

Where relevant, elemental mechanics should consider:

- pressure;
- terrain;
- conductivity;
- ignition;
- saturation;
- airflow;
- visibility;
- containment;
- armour/material interaction;
- movement;
- source-specific combination techniques;
- authored counters.

A percentage damage bonus may be part of an elemental package, but the element should not collapse into a generic damage colour.

---

# 14. Summon / Tailed-Beast / Hosted-source law

Every such source must be audited for:

- own action package;
- enhancement package;
- lifecycle;
- action economy;
- source relationship;
- manifestation;
- attached/hosted behavior;
- exact counterplay;
- persistent/collection effect where relevant;
- anti-double-count exclusions.

Do not treat a Summon as "a pet with three attacks".

Do not treat a Tailed Beast as "a large Summon".

Do not treat a Hosted Entity as "a passive stat bonus".

---

# 15. Basic/foundational technique exception

Not every Skill needs a novel subsystem.

Basic/foundational techniques may remain intentionally simple when simplicity is part of their role.

Examples:

- academy strike;
- simple kunai throw;
- basic guard;
- straightforward elemental projectile.

But they still must:

- use SC Battle PL / Stamina / action ordering correctly;
- avoid invented generic RPG Stats such as Speed/Accuracy/Crit unless separately authorised;
- use exact source/discipline identity;
- avoid filler duplication;
- remain clearly understandable.

The exception is for **simplicity**, not for lazy cloning.

---

# 16. No dead buttons

A Skill that consumes an action must ordinarily create immediate understandable gameplay value.

Do not create:

- setup that appears to do nothing;
- information actions with no usable consequence;
- tiny buffs that are dominated by attacking;
- multi-step chains whose first steps have no tactical value;
- decorative mechanics with no meaningful decision.

A deliberate investment/setup action is allowed when its later payoff is strong, clear and worth the opportunity cost.

---

# 17. Player-readable rule

Player-facing text should normally make clear:

- what happens now;
- what state/effect is created;
- what changes next;
- when it ends;
- what the target can do about it.

Avoid architecture language in player-facing copy.

A 12–13 year old should understand the important tactical consequence without reading engine documentation.

---

# 18. Counterplay rule

Powerful mechanics should have source-appropriate counterplay where appropriate.

Counterplay may be:

- action choice;
- positioning;
- cleanse;
- source removal;
- interruption;
- target switch;
- resource/timing choice;
- exact elemental response;
- seal/relationship interaction;
- deliberate defensive play.

Do not create arbitrary hard counters merely to force symmetry.

Do not create universal boss immunity merely to avoid solving a mechanic properly.

---

# 19. No forced symmetry

Not every Skill needs:

- damage;
- defense;
- utility;
- drawback;
- cooldown;
- combo;
- passive bonus.

Not every Summon needs the same number of skills.

Not every status needs a cleanse.

Not every strong mechanic needs a mirrored weakness.

Identity comes before template symmetry.

---

# 20. No rarity tax

Rarity does not mean:

- bigger generic percentage;
- more Stats by default;
- more turns of stun;
- higher arbitrary DoT;
- more unrelated effects.

Rarity may correlate with complexity, access difficulty or capability, but mechanics still require source identity and balance.

---

# 21. Mechanical closure checklist

Before any new or revised mechanic is marked DESIGN CLOSED, answer:

1. **What is the source identity?**
2. **What does the mechanic make the player decide?**
3. **What is unique about its behavior?**
4. **What happens immediately?**
5. **What state persists afterward, if any?**
6. **What ends/counters it?**
7. **What exact SC systems does it use?**
8. **What generic RPG assumption was avoided or transformed?**
9. **Could another unrelated source use this unchanged?**
10. **Can a young player understand the tactical consequence?**
11. **Does it double-count another source/representation?**
12. **Is it worth using compared with the actor's ordinary alternatives?**

If the answer to #9 is "yes" for a signature mechanic, redesign it.

If the answer to #12 is "no", redesign it.

---

# 22. Existing catalogue / legacy-runtime rule

This standard applies to:

- all future design;
- all current recalibration;
- any existing Skill/effect being changed;
- any existing catalogue row being promoted to new runtime importance;
- any existing mechanic found during audit to be generic filler or unattractive.

Existing runtime/catalogue rows are **not automatically rewritten merely by this document**.

However:

> **Existing age does not grandfather a generic mechanic into permanent authority.**

When an existing mechanic is revisited, it must pass this standard.

A dedicated audit may later identify existing rows needing redesign.

---

# 23. Relationship to canon

Canon provides:

- identity;
- capabilities;
- observed interactions;
- limitations;
- relationships;
- thematic/mechanical inspiration.

Shinobi Chronicles is allowed to convert those foundations into a coherent game mechanic.

Do not falsely claim an SC adaptation is literal canon.

When SC intentionally adapts canon into a gameplay enhancement or interaction, state the divergence in durable design authority where material.

---

# 24. Canonical shorthand

> **Shinobi Chronicles does not copy generic RPG mechanics. It rebuilds useful RPG foundations into source-specific Shinobi Chronicles mechanics.**

> **Every important mechanic should feel like it belongs to this source, this world and this ruleset.**

> **A familiar idea is allowed. A generic finished mechanic is not.**

---

# 25. Production status

This document is **binding design authority**.

It does not by itself claim:

- implementation;
- runtime migration;
- balance validation;
- browser validation;
- Golden/regression GREEN.

**design authority != implementation != runtime validated != Golden GREEN**
