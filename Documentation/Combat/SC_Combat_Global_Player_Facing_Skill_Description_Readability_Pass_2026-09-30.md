# Shinobi Chronicles — Global Player-Facing Skill Description Readability Pass

**Date:** 2026-09-30  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons / Tailed Beasts  
**Status:** **DESIGN CLOSED — GLOBAL PLAYER-FACING DESCRIPTION AUTHORITY / CODING CONSUMPTION REQUIRED**  
**Parent domains:** Combat #235 / Battle UI polish #421  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

---

# 1. Purpose

This closes the player-facing language standard for Shinobi Chronicles Skill descriptions.

The goal is:

> **A 12/13-year-old should understand what a Skill does without the game talking down to them.**

This consumes the Writing clarification recorded on #333:

> **Write for understanding at roughly age 12/13, not for the vocabulary of a 12/13-year-old.**

Therefore:

- readable does NOT mean childish;
- interesting vocabulary is allowed;
- cool technique names stay cool;
- uncommon words may remain where context makes them understandable;
- the description underneath the name must explain the actual gameplay clearly.

Examples of acceptable richer vocabulary in names/concepts include:

- Kinetic;
- Resonance;
- Dominion;
- Vector;
- Catalyst;
- Severance;
- Convergence.

The description exists to make the mechanic understandable, not to flatten the vocabulary.

---

# 2. Writing authorities consumed

This pass consumes the player-facing principles from:

- `Documentation/Story/Universal_Player_Facing_Story_Narration_Dialogue_and_Conversation_Quality_Gate_2026-09-23.md`;
- `Documentation/Story/Writing_Anti_Flattening_Character_Voice_and_Conversation_Hard_Gate_2026-09-30.md`;
- #333 comment **STEPHEN CLARIFICATION — YOUTH READABILITY != DUMBED-DOWN VOCABULARY**.

Relevant inherited rules:

- player-facing prose must not read like developer documentation;
- system safeguards belong in implementation notes, not player copy;
- trust the player;
- use compact sentences;
- make cause/effect clear;
- avoid jargon density;
- youth-readable != childish;
- rich vocabulary != jargon overload;
- teach meaning through context instead of defining every interesting word.

The Story anti-flattening voice rules do not require every Skill description to sound like character dialogue.

Skill descriptions are functional UI copy.

Their personality comes mainly from:
- the Skill name;
- the technique identity;
- concise physical wording.

---

# 3. Current live problem

Current shared Battle presentation already targets:

`YOUTH_READING_TARGET = "12-13"`

in:

`runtime/alpha-battle-modern-33000.js`

but the current player-facing formatter still contains developer-facing phrases such as:

- `Use this authored Battle technique.`;
- `qualifying direct hit`;
- `authored Skill`;
- `temporary setup state`;
- `categorical evidence`;
- `follow-up rule`;
- `current eligible target`.

Those phrases may be precise for implementation, but they are not good player copy.

Current live `game.js` contains at least **324 factory-built Skill registrations**, plus bespoke resolution types.

The correct fix is therefore GLOBAL:

> **one shared readable description grammar + exact overrides where a Skill has unusual mechanics**

not hundreds of disconnected prose patches.

---

# 4. Player-facing format — LOCKED

A Battle Skill description should normally contain:

## A. One short summary

Prefer:

**one sentence**

Target:

**roughly 6–18 words**

The summary answers:

> **What does this move actually do?**

## B. Zero to two short detail lines

Use details only for information the player needs to make a decision, such as:

- exact ATK;
- target count;
- guard percentage;
- recovery amount;
- once-per-Battle limit;
- important setup/follow-up;
- important condition;
- whether Stamina still reduces damage;
- whether the effect is temporary;
- whether the Skill needs a real environmental route.

Do not use a second detail line merely because the UI has space.

## C. Tags

Short Battle tags may remain useful:

- DAMAGE
- DEFENSE
- CONTROL
- SETUP
- RECOVERY
- MOVEMENT
- ONE ENEMY
- AREA
- ONCE PER BATTLE
- CONTEXT REQUIRED

Tags supplement the description.

They do not replace it.

---

# 5. Player vocabulary

## Good ordinary gameplay language

Use freely where accurate:

- ATK;
- Battle PL;
- Stamina;
- damage;
- guard;
- bind;
- poison;
- burn;
- enemy;
- ally;
- Active;
- Benched;
- Reserve;
- movement;
- counter;
- setup;
- follow-up;
- once per Battle;
- next turn;
- condition;
- target;
- Chakra;
- Genjutsu;
- Fūinjutsu;
- Taijutsu;
- Bukijutsu.

A 12/13-year-old playing this game can learn the game's vocabulary.

## Keep richer technique vocabulary

Do not flatten names merely because a word is uncommon.

Good:

**Kinetic Read**

> Read the enemy's movement pattern. If they repeat the same move, cut its ATK in half.

The description teaches the name through context.

---

# 6. FORBIDDEN player-facing implementation language

Do not expose these words/phrases merely because they exist in runtime authority:

- authored;
- resolver;
- predicate;
- source predicate;
- stateKey;
- semanticClass;
- informationBoundary;
- categorical evidence;
- categorical interaction;
- transient state;
- scalar;
- packet;
- mechanical packet;
- qualifying packet;
- action opportunity;
- committed occurrence;
- caller-defined;
- source-owned;
- current authoritative;
- exact source;
- Battle resolver;
- history rollback;
- effect marker;
- reapplication refresh/replace.

Translate them into the thing the player experiences.

Examples:

`next qualifying direct packet`

becomes:

> **the next direct hit**

`restore underlying Battle PL`

becomes:

> **restore Battle PL**

`blocks substantial_free_movement`

becomes:

> **blocks moves that need free movement**

`requires legitimate traversable route`

becomes:

> **works only when there is a real route to move through**

`temporary_battle_capacity`

becomes:

> **temporary Battle PL**

---

# 7. Global structured-description grammar — LOCKED

Coding should use the actual Skill object as the source of truth.

Descriptions never alter mechanics.

## 7.1 Direct damage

For a one-target direct attack:

> **Deals {ATK} ATK to one enemy. Stamina reduces the damage.**

If normal Stamina does not apply:

> **Deals {ATK} ATK to one enemy. This attack ignores normal Stamina reduction.**

Do not say:
- direct packet;
- authored Attack PL;
- resolver damage.

---

## 7.2 Area damage

> **Deals {ATK} ATK to up to {N} enemies. Stamina reduces each hit.**

If each target is independently mitigated, that sentence already explains enough.

Do not say:
- independent packets;
- each target resolves separately by Battle rules.

---

## 7.3 Guard / prevention

Self:

> **Reduce the next direct hit against you by {PERCENT}%.**

Ally:

> **Protect one ally and reduce their next direct hit by {PERCENT}%.**

If it works once:

> **Works once.**

If once per Battle:

> **Can be used once per Battle.**

Do not say:
- pre-Stamina prevention;
- qualifying packet;
- attackMultiplier.

If it matters that Stamina applies afterward:

> **Stamina still reduces the remaining damage.**

---

## 7.4 Recovery

> **Restore {AMOUNT} Battle PL to {TARGET}.**

When relevant:

> **This does not heal injuries.**

or:

> **This does not raise Base PL.**

Do not say:
- restore underlying Battle PL;
- capacity mutation.

---

## 7.5 Temporary Battle capacity

> **Gain {AMOUNT} temporary Battle PL for this Battle.**

Then:

> **This is extra fighting capacity, not healing.**

Do not call temporary capacity Stamina.

---

## 7.6 Simple setup / Attack bonus

If a setup gives the next qualifying damage Skill +N:

> **Your next damaging Skill gains +{N} ATK.**

If it is consumed:

> **The bonus is used by that attack.**

Do not say:
- transient state;
- resolver-local bonus;
- consumeOn.

---

## 7.7 Named setup -> named follow-up

When the exact follow-up is known, NAME IT.

Better:

> **Create a false opening. Mirage Kunai can exploit it.**

than:

> Create a temporary state for an authored follow-up effect.

---

## 7.8 Contextual enhanced attack

If an attack has normal and enhanced values:

> **Deals {NORMAL} ATK, or {ENHANCED} ATK after {SETUP NAME}.**

If the setup is consumed:

> **Using the opening consumes it.**

---

## 7.9 Physical restraint

Where the Skill blocks movement/free-body actions:

> **Bind one enemy so moves that need free movement are blocked.**

If exact duration is known in player terms:

> **The bind lasts until the target acts again.**

Do not describe a restraint as Stun unless it actually blocks all actions.

---

## 7.10 Other control

Translate the exact restriction.

Examples:

Perception control:

> **Disrupt how one enemy reads your movement.**

Movement/reposition control:

> **Stop one enemy from using moves that require repositioning.**

Action-family restriction:

> **Block the named type of action until the effect ends.**

If the structured data cannot be translated without guessing, the Skill requires an exact description override.

Never fall back to:

> Use a control technique to limit the target in the way this Skill allows.

That is developer-safe but player-useless.

---

## 7.11 Movement

> **Move to a new position when a real route is available.**

Where relevant:

> **This is movement, not teleportation.**

Do not claim Speed/evasion bonuses unless the Skill actually has them.

---

## 7.12 Sensing / analysis / evidence

Use the actual sense.

Examples:

> **Read the Chakra you can detect right now. It does not reveal hidden identity automatically.**

> **Study what you can actually see. This does not copy the enemy's technique.**

> **Track a known Chakra signature when you have enough information to recognise it.**

Do not say:

> categorical evidence

or:

> information boundary.

---

## 7.13 Deception / feints

> **Create a feint or false opening for a later move.**

When appropriate:

> **It does not guarantee the enemy is fooled.**

Do not claim automatic belief.

---

## 7.14 Condition removal

> **Remove an eligible {CONDITION}.**

When relevant:

> **This does not undo damage already taken.**

---

## 7.15 Persistent damage/effect

> **Deals {ATK} ATK now and leaves an ongoing effect.**

Then state the actual ongoing effect in plain language.

Do not say:

> later pressure resolves only when the authored persistence opportunity says so.

If the ongoing effect cannot be explained exactly from current structured fields, require an override.

---

## 7.16 Mode / branch attack

Describe the actual choice.

Preferred:

> **Choose Focus for 40 ATK to one enemy, or Sweep for 28 ATK to up to 3 enemies.**

Avoid:

> Different modes can change the target or Attack PL.

The player needs to know HOW they change it.

---

# 8. Unknown/special resolution kinds — HARD GATE

A player-visible Skill with an unusual/bespoke `resolutionKind` must have one of:

1. an exact player-facing description override; or
2. a structured formatter that explains every decision-relevant effect.

Production must NOT silently fall back to:

> **Use this authored Battle technique.**

or:

> **Availability, target and result still follow the normal Battle rules.**

Those are implementation placeholders.

QA should treat a prepared/player-visible Skill that reaches the generic developer fallback as a **description coverage failure**.

This is important for bespoke:

- Tailed-Beast;
- Hosted Entity;
- transformation;
- Kinjutsu;
- multi-stage;
- source-specific;
- condition-heavy;
- mode-heavy

Skills.

Complex mechanics are allowed.

Complex wording is not required merely because the mechanic is complex.

---

# 9. Current Academy Alpha — exact 50 player-facing descriptions

These exact descriptions apply to the ten current Academy prepared palettes.

Stable IDs/names/mechanics remain unchanged.

## 9.1 Academy Hinata

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Gentle Fist: Flowing Palm** | Deals **5 ATK** to one enemy. | Stamina reduces the damage. |
| **Gentle Fist: Twin Palm Ward** | Reduce the next direct hit against you by **30%**. | Works once. |
| **Gentle Fist: Reversal Palm** | Use a reactive palm counter when an enemy attack gives you an opening. | No direct damage by itself. |
| **Silent Arc Shuriken** | Deals **4 ATK** to one enemy with a shuriken throw. | Stamina reduces the damage. |
| **Gentle Step: Flowing Circle** | Move to a new position when a real route is available. | Movement, not teleportation. |

## 9.2 Academy Wasabi Izuno

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Cat Fang Palm** | Deals **5 ATK** to one enemy with a fast palm strike. | Stamina reduces the damage. |
| **Prowling Shuriken** | Deals **5 ATK** to one enemy with a moving shuriken attack. | Stamina reduces the damage. |
| **Cat's Paw Feint** | Use quick footwork to set up a feint when the situation allows it. | No direct damage. |
| **Clawstep Rebound** | Spring off a nearby surface to move to a new position. | Needs a real surface or route. Not teleportation. |
| **Phantom Pounce** | Use a clone-assisted feint against one enemy. | No direct damage and no automatic deception. |

## 9.3 Academy Mirai

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Twin Fang Kunai** | Deals **5 ATK** to one enemy with a twin-kunai attack. | Stamina reduces the damage. |
| **Crosswire Bind** | Bind one enemy with wire so moves needing free movement are blocked. | Control, not a full Stun. |
| **Phantom Footfall** | Use Genjutsu to confuse how your movement is read. | It does not automatically fool the enemy. |
| **Crossblade Guard** | Reduce the next direct hit against you by **25%**. | Works once. |
| **Crossing Fang** | Deals **6 ATK** to one enemy. | Stamina reduces the damage. |

## 9.4 Academy Kushina

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Crimson Whirlwind** | Deals **6 ATK** to one enemy with a forceful spinning attack. | Stamina reduces the damage. |
| **Uzumaki Binding Script** | Use a sealing formula to bind one enemy. | Control, not a full Stun. |
| **Iron-Heart Guard** | Reduce the next direct hit against you by **30%**. | Works once. |
| **Crimson Reversal** | Deals **6 ATK** to one enemy. | Stamina reduces the damage. |
| **Spiral Seal Tag** | Place a seal tag on one enemy for a compatible follow-up. | No direct damage. |

## 9.5 Academy Kurenai

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Petal Mirage** | Create a false opening around one enemy. | **Mirage Kunai** can exploit it. No direct damage. |
| **Mirage Kunai** | Deals **4 ATK**, or **6 ATK** after **Petal Mirage**. | Using the opening consumes it. Stamina reduces damage. |
| **Phantom Petal Step** | Use Genjutsu to make your movement harder to read. | It does not automatically fool the enemy. |
| **Petal Veil** | Reduce the next direct hit against you by **25%**. | Works once. |
| **Veilbreak** | Attempt to break a compatible Genjutsu effect on yourself. | Works only when there is a valid effect to release. |

## 9.6 Academy Iwabee

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Stonebreaker Staff** | Deals **6 ATK** to one enemy with a heavy staff strike. | Stamina reduces the damage. |
| **Bedrock Sweep** | Deals **4 ATK** to up to **2 enemies** with a staff sweep. | Stamina reduces each hit. |
| **Earth Style: Rising Rampart** | Reduce the next direct hit against you by **35%**. | Works once. |
| **Earth Style: Stone Grasp** | Trap one enemy with stone to restrict them. | Control, not a full Stun. |
| **Bedrock Stance** | Brace yourself against forced movement when there is something to resist. | No direct damage. |

## 9.7 Academy Metal Lee

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Leaf Rising Heel** | Deals **6 ATK** to one enemy with a rising kick. | Stamina reduces the damage. |
| **Leaf Driving Barrage** | Deals **5 ATK** to one enemy with a rapid barrage. | The barrage counts as one damage hit. |
| **Fighting Spirit** | Your next damaging Skill gains **+2 ATK**. | The bonus is used by that attack. |
| **Iron Footwork** | Reduce the next direct hit against you by **25%**. | Works once. |
| **Ironbody Conditioning** | Gain **4 temporary Battle PL** for this Battle. | Extra fighting capacity, not healing. |

## 9.8 Academy Obito

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Fire Style: Cinder Burst** | Deals **5 ATK** to one enemy with Fire Release. | Stamina reduces the damage. |
| **Hot-Blooded Charge** | Deals **6 ATK** to one enemy with a headlong rush. | Stamina reduces the damage. |
| **Uchiha Shuriken Storm** | Deals **5 ATK** to one enemy with a shuriken barrage. | The barrage counts as one damage hit. |
| **Comrade Guard** | Protect one ally and reduce their next direct hit by **30%**. | Works once. |
| **Uchiha Resolve** | Gain **3 temporary Battle PL** for this Battle. | Extra fighting capacity, not healing. |

## 9.9 Academy Menma

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Driving Chakra Fist** | Deals **6 ATK** to one enemy with a chakra-powered punch. | Stamina reduces the damage. |
| **Crescent Fang** | Deals **5 ATK** to one enemy with a fast kunai strike. | Stamina reduces the damage. |
| **Shattering Blow** | Deals **7 ATK** to one enemy and can pressure a compatible guard. | It does not break every defence automatically. |
| **Shadow Clone Ambush** | Create a shadow-clone feint for a later opening. | No direct damage and no extra fighter. |
| **Vanishing Step** | Move to a new position when a real route is available. | Movement, not teleportation. |

## 9.10 Academy Kakashi

Current prepared palette consumes the already-closed Substitution Jutsu replacement.

| Skill | Player-facing summary | Detail |
|---|---|---|
| **Flash Kunai** | Deals **5 ATK** to one enemy with a fast kunai strike. | Stamina reduces the damage. |
| **Clone Switch** | Use a clone feint to open the enemy up. | **Precision Strike** can exploit it. No direct damage. |
| **Precision Strike** | Deals **5 ATK**, or **11 ATK** after **Clone Switch**. | Using the opening consumes it. Stamina reduces damage. |
| **Wire Fang** | Bind one enemy with wire and restrict their movement. | Control, not a full Stun. |
| **Substitution Jutsu** | Reduce one direct hit against you by **50%**. | Can be used once per Battle. |

---

# 10. Catalogue / future Skill coverage

The Alpha Skill Catalogue's exact Combat-semantics columns remain machine/author authority.

Do NOT rewrite those technical semantics into vague prose.

Instead:

```text
exact Skill semantics
-> runtime structured Skill object
-> shared youth-readable description formatter
-> optional exact override
-> player-facing Battle UI
```

The current catalogue remains exact.

This new description layer is its player-facing projection.

This rule applies automatically to:

- current Academy Skills;
- current Genin Skills;
- future activated catalogue Skills;
- Summon actions;
- Tailed-Beast actions;
- Hosted Entity actions;
- transformation Skills;
- future village content;
- future Progression-unlocked Skills.

A new complex Skill is not player-facing complete until its description passes this gate.

---

# 11. Description truth rule

A description may simplify LANGUAGE.

It may not simplify away a decision-relevant mechanic.

Must preserve when relevant:

- ATK;
- number of targets;
- guard percentage;
- recovery/capacity amount;
- once-per-Battle limits;
- setup dependencies;
- follow-up dependencies;
- source/environment requirements;
- important control restriction;
- important cost/drawback;
- Stamina bypass if real;
- Stamina mitigation if decision-relevant;
- mode choices;
- whether an effect is temporary.

Do not list implementation safeguards that do not affect the player's decision.

Example:

Internal:

```text
multi_projectile_presentation_one_packet
```

Player-facing only when needed:

> **The barrage counts as one damage hit.**

Internal:

```text
no_hidden_speed_evasion
```

Usually omit.

The player does not need a list of mechanics the Skill does NOT secretly have.

---

# 12. UI-length target

The goal is to reduce dependence on #421's scroll affordance, not remove it.

Preferred visible description size:

- summary: 1 line where practical;
- details: 0–2 short lines/bullets;
- avoid more than about **35–45 words total** for ordinary Skills.

Bespoke high-complexity Skills may exceed this where necessary.

If a Skill needs a paragraph to explain, first ask whether the wording can be reorganised into:

- one clear summary;
- one exact number line;
- one condition/cost line.

Do not hide important mechanics merely to hit a word count.

---

# 13. Coding consumption

Coding / Runtime should update the shared description owner in:

`runtime/alpha-battle-modern-33000.js`

Current function:

`getBattleSkillYouthSummary33000(skill)`

Implementation requirements:

1. preserve all Skill IDs;
2. preserve all display names;
3. preserve all mechanics/numerics;
4. replace developer-language generic summaries with the grammar in this document;
5. add the exact current Academy 50 overrides above;
6. use structured fields for normal Skill families;
7. require exact overrides for unusual player-visible `resolutionKind` values;
8. prepared/player-visible Skills must not fall through to `Use this authored Battle technique.`;
9. do not mutate availability, target legality, damage, guard, state, turn order, PL, rewards or save state;
10. preserve #421 hover/scroll behavior;
11. preserve HOVER = LEARN / CLICK = USE;
12. validate representative direct, area, guard, recovery, setup, control, movement, sensing, capacity, branch and bespoke Skills.

Recommended QA hard gate:

> **No prepared/player-visible Skill may contain player-facing developer terms from Section 6 or hit the generic developer fallback.**

---

# 14. Final lock

> **Shinobi Chronicles Skill names may remain stylish, technical, mythic or vocabulary-rich. Skill descriptions must be compact, concrete and understandable at roughly a 12/13-year-old reading level without talking down to the player. Names carry flavour; descriptions carry understanding. Player-facing descriptions state what happens, who it affects, the important number, and the important condition. Internal resolver vocabulary never leaks merely because the mechanic is complicated.**

> **accessible != simplistic**

> **rich vocabulary != jargon overload**

> **youth-readable != childish**

**DESIGN CLOSED != IMPLEMENTED != RUNTIME VALIDATED != BROWSER GOLDEN.**
