# Shinobi Chronicles — Weapon Proficiency Five-Star Development Doctrine Recovery

**Date:** 2026-10-03  
**Owner:** CE / Codex / Coordination  
**Status:** **RECOVERED CLOSED SC DOCTRINE — DURABLE RESTORATION / RUNTIME IMPLEMENTATION NOT CLAIMED**  
**Primary consumer:** Progression / Development  
**Related current work:** #470 signature Chronicle routes

---

## 1. Why this recovery exists

A source-first audit on 2026-10-03 found that current live `main` preserved multiple references to **weapon proficiency** and the Training Grounds weapons-proficiency service context, but did **not** durably preserve the full Shinobi Chronicles five-star proficiency doctrine that earlier project authority had explicitly closed.

Current live authority already preserves:

- Training Grounds as a legitimate host for weapons proficiency;
- weapon-proficiency mentorship as separately owned by Weapons / Progression authority;
- weapon proficiency as distinct from ordinary discipline development;
- proficiency/acclimation as distinct from weapon rarity;
- the CE non-collapse **general competence != specific familiarity**.

What was missing from durable SC authority was the explicit game-specific five-star ladder and its training-route constraints.

This document restores only recovered closed doctrine. It does not invent new thresholds, multipliers or runtime behaviour.

---

## 2. Core non-collapse

### Bukijutsu != Weapon Proficiency

**Bukijutsu** is the general weapon discipline.

**Weapon Proficiency** is one Character's persistent familiarity/development relationship with one particular weapon.

Canonical:

> **Bukijutsu = general weapon discipline.**

> **Weapon Proficiency = experience with one particular weapon.**

Therefore:

- high Bukijutsu does not automatically grant high proficiency with every weapon;
- gaining proficiency with one weapon does not automatically copy that proficiency to another weapon;
- a weapon does not own one universal proficiency level shared by every Character;
- Character A's proficiency with Weapon X does not become Character B's proficiency with Weapon X.

Reusable CE correspondence:

> **general competence != entity-specific familiarity.**

---

## 3. Persistent relationship-owned state

Weapon Proficiency is persistent **Character ↔ exact weapon** development state.

Canonical shape:

> **Character A ↔ Weapon X = A's proficiency history with X.**

This relationship may legitimately retain:

- current proficiency star level;
- meaningful training history;
- mentorship history;
- sparring/practice evidence;
- exact technique interaction evidence;
- provenance/affinity interaction where separately authorised.

Do not collapse:

- weapon identity != weapon instance ownership;
- weapon ownership != proficiency;
- proficiency != Bukijutsu;
- proficiency != Technique Access;
- proficiency != Skill ownership;
- proficiency != Mastery;
- provenance != proficiency;
- rarity != proficiency.

---

## 4. Five-level doctrine and five-star projection

Stephen clarified the recovered doctrine directly on 2026-10-03:

> **Untrained -> Standard -> Proficient -> Expert -> Master is exactly the correct five-level Weapon Proficiency doctrine.**

The stars are the player-facing projection of those same five semantic levels, not a replacement system.

Canonical mapping:

- ★ = **Untrained**
- ★★ = **Standard**
- ★★★ = **Proficient**
- ★★★★ = **Expert**
- ★★★★★ = **Master**

Therefore:

> **named proficiency level == corresponding star projection.**

**★★★★★ / Master is the normal global maximum Weapon Proficiency.**

This is a Shinobi Chronicles game rule, not a universal Chronicle Engine ladder.

The five named states and the five-star presentation describe the same persistent Character ↔ weapon relationship.

Do not create two competing proficiency systems.

The ladder must not be silently replaced by:

- raw Bukijutsu;
- generic Character level;
- weapon rarity;
- weapon price;
- an item's own universal "level";
- a second independent mastery ladder.

---

## 5. Training-route constraints recovered from Training Grounds authority

### Mentorship

Recovered closed rule:

> **Mentorship caps purely instructed Weapon Proficiency at ★.**

Meaning:

- teaching may establish knowledge, form, handling, drills and initial familiarity;
- mentorship does not simply clone the instructor's mastery;
- a five-star mentor cannot directly grant five-star proficiency to a trainee;
- purely instructed proficiency alone cannot carry the trainee beyond the recovered ★ mentorship ceiling.

This does not prohibit mentorship from contributing other legitimate evidence, technique knowledge, relationship history or later training opportunities.

### Sparring

Recovered closed rule:

> **Sparring can support one further proficiency star.**

This is an additional development route beyond purely instructed handling.

Do not extrapolate an unlimited sparring-only ladder from this rule.

### Direct meaningful weapon practice

Specific practice with the exact weapon is the primary general route for developing the Character ↔ weapon relationship beyond basic instruction.

Recovered Training Grounds doctrine allowed specific weapon practice to contribute primarily to:

- exact weapon proficiency;
- technique proficiency;
- equipment synergy;
- weapon mastery / mastery evidence;

with a **smaller Bukijutsu EXP contribution** where separately authorised.

Canonical direction:

> **specific practice -> primarily specific growth + smaller general-domain growth.**

This does not mean every training repetition automatically grants every category above.

The owning Progression / Weapons rules still decide whether an occurrence was developmentally meaningful and what it actually earned.

---

## 6. Training Grounds host != automatic progression

Current World authority already establishes the Training Grounds weapons range / target lane as a legitimate service context for weapons-proficiency training.

Opening or visiting that context does not itself grant proficiency.

Preserve:

> **location != activity != occurrence != development gain.**

A valid proficiency transition requires the correct Character, exact weapon, legitimate training/action context and authorised developmental result.

---

## 7. Rarity / ownership / Skill firewall

Current Combat authority already preserves:

> **proficiency/acclimation remains separate from item rarity.**

and:

> **catalogue rarity never bypasses proficiency.**

Therefore:

- owning a Legendary weapon does not grant stars;
- purchasing/equipping a weapon does not grant stars;
- a proficiency star does not automatically unlock every associated Skill;
- Skill Access remains separately owned;
- weapon proficiency may affect later execution/access only where exact Combat/Skill authority consumes it.

---

## 8. Recovered named tiers are current doctrine; old automatic derivation is not

Project archaeology contains the same correct five named Weapon Proficiency levels:

- Untrained;
- Standard;
- Proficient;
- Expert;
- Master.

Those names are **not obsolete**. They are the semantic levels currently projected to the player as ★ through ★★★★★.

What remains historical/prototype-specific is any old implementation assumption that the persistent Character ↔ weapon proficiency state should be automatically derived from raw Bukijutsu / weapon-class difficulty rather than developed and persisted as its own relationship state.

Therefore:

> **Untrained -> Standard -> Proficient -> Expert -> Master == ★ -> ★★ -> ★★★ -> ★★★★ -> ★★★★★.**

and separately:

> **Current persistent Weapon Proficiency is not automatically identical to raw Bukijutsu.**

Bukijutsu may legitimately influence weapon capability and exact progression rules where the owning systems authorise it, but general Bukijutsu and exact-weapon proficiency remain distinct state.

---

## 9. Exceptional sixth-star boundary

The restored normal rule is:

> **Weapon Proficiency caps at ★★★★★.**

A signature Chronicle route may create an explicit named exception if Progression closes one.

Such an exception must:

- belong to an exact Character / route / weapon relationship or otherwise explicitly scoped capability;
- have authored causal provenance;
- not silently raise the global cap for everyone;
- not imply every weapon can reach six stars;
- not be granted merely from high Bukijutsu;
- remain separately persisted and projected.

The currently discussed Iwabee Living Strata route may therefore use an explicit **★★★★★★** exception only if #470 deliberately closes that route contract.

Until that closure:

> **★★★★★★ is not part of the normal Weapon Proficiency ladder.**

---

## 10. Ownership boundary

### Progression / Development owns

- persistent proficiency development;
- developmental evidence;
- star advancement;
- route gates;
- exceptional cap-breaking progression where explicitly authored.

### Combat / Skills / Items / Weapons owns

- exact weapon semantics;
- execution effects;
- any proficiency-dependent Skill / damage / handling consequence;
- weapon-class and technique interaction rules.

### World / Training Grounds owns

- legitimate training locations / service contexts;
- contextual opportunity;
- mentor / sparring / practice availability where authored.

### CE / Codex / Coordination owns

- non-collapse;
- terminology;
- cross-system consistency;
- durable recovery when authority has drifted or been lost.

### Coding owns

- persistence / runtime implementation / save-load / tests only after exact contracts are committed.

---

## 11. What is NOT closed by this recovery

This recovery does **not** invent or close:

- exact EXP/point thresholds for ★ -> ★★ -> ★★★ -> ★★★★ -> ★★★★★;
- universal session counts;
- universal damage multipliers per star;
- universal crit bonuses;
- automatic Skill unlocks;
- Energy costs;
- instructor percentage bonuses;
- a generic numeric `0-100` meter;
- a universal weapon-difficulty formula;
- the Iwabee ★★★★★★ exception itself.

Those require exact owning-domain authority if/when Alpha needs them.

---

## 12. Final restored rule

> **Weapon Proficiency is a persistent Character ↔ exact-weapon relationship, not Bukijutsu and not an item level. The five semantic levels are Untrained -> Standard -> Proficient -> Expert -> Master and Shinobi Chronicles projects those same levels as ★ -> ★★ -> ★★★ -> ★★★★ -> ★★★★★. ★★★★★ / Master is the normal global cap. Pure mentorship can instruct only to ★; sparring can support one further star; meaningful exact-weapon practice is the primary route for deeper proficiency and may contribute smaller general Bukijutsu development where authorised. Rarity, ownership and proficiency do not collapse into one another. Any ★★★★★★ state is an explicit route-specific exception, never the default ladder.**
