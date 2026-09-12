# Shinobi Chronicles — Whole-Build Competitive Audit Ledger

**Date:** 2026-09-13  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **ACTIVE ALPHA/PvP AUDIT LEDGER — INVENTORY + CALCULATION METHOD CLOSED / PER-ROW REBALANCE ONGOING**

## 1. Purpose

Stephen has directed that the competitive game be evaluated as the **assembled Character/team**, not as isolated catalogue rows.

This ledger begins the full revisit of:

- Skills;
- weapons;
- gear;
- consumables;
- Fūin attachments;
- Summons and Summon Enhancements;
- Bloodlines / advanced lineage expressions;
- transformations / Curse Mark / Hosted Entity states;
- Provenance-bearing created weapons/gear;
- team composition;
- action economy;
- battlefield/context dependencies.

Canonical balance unit:

`Character + Effective Stats/PL + prepared Skills + Bloodline/lineage + weapon + gear + Summon + consumables + Fūin + Provenance + transformation/Hosted Entity + teammates + action economy + battlefield context`

This is **not** a new hidden Combat Rating or second PL.

---

## 2. Competitive audit dimensions

Every row/package is evaluated on the following independent dimensions rather than collapsed into one score:

1. burst output;
2. sustained output;
3. mitigation;
4. recovery;
5. control;
6. mobility;
7. range/reach;
8. information;
9. setup burden;
10. action-economy burden;
11. resource efficiency;
12. reliability;
13. flexibility;
14. team enablement;
15. counter vulnerability;
16. scaling ceiling;
17. Provenance payoff;
18. contextual/Hotspot value;
19. stacking sensitivity;
20. ownership/access burden.

A package can be intentionally exceptional in several dimensions if it pays elsewhere and remains answerable.

---

## 3. Calculation model — decompose before comparing

For any exact Battle action/build, calculate the contribution chain in order rather than adding every bonus into one vague total.

### 3.1 Character layer

Record:
- Base Stats / Base PL from Registry authority;
- current legitimate representation;
- Developed state supplied by Progression;
- no inference from Rank/card art.

### 3.2 Effective Stat layer

Record every source separately:

```text
EffectiveStat = Base/Developed authorised value
              + equipment source-owned modifiers
              + weapon source-owned modifiers
              + Bloodline source-owned modifiers
              + Summon enhancement source-owned modifiers
              + transformation/Hosted source-owned modifiers
              + exact Fūin source-owned modifiers
              + other exact authored sources
```

This notation does **not** imply every modifier is additive. Exact source authority controls operation/order.

Required audit output per source:
- source ID;
- affected Stat;
- operation;
- duration;
- coexistence/stack rule;
- removal rule.

### 3.3 Weapon proficiency layer

Current proficiency realisation remains:

- gap 0 → `1.00`;
- gap 1 → `0.90`;
- gap 2 → `0.75`;
- gap 3 → `0.55`;
- gap 4+ → `0.35`.

Weapon-facing Effective-stat contribution must therefore be audited both **before** and **after** proficiency realisation.

A legendary weapon with a large raw modifier is not automatically the best competitive choice for a poorly compatible wielder.

### 3.4 Action output layer

Separate:
- authored Attack PL / output;
- conditional authored branch;
- pre-action/setup bonus;
- exact weapon/gear/Fūin/Summon rider;
- transformation/lineage effect;
- resolver-only effects;
- packet count.

Never infer multiple packets from animation, multiple projectiles, dual weapons or multiple causal sources.

### 3.5 Defence/damage layer

Current order remains:

`authored output -> pre-Stamina defence -> resolved Attack PL -> Stamina mitigation -> Battle-PL damage -> capacity`

Current Stamina mitigation:

`max(1, floor(resolvedAttackPL * 100 / (100 + Effective Stamina)))`

Therefore a +Stamina gear package must be measured against actual incoming Attack-PL bands rather than described as a generic percentage defence increase.

### 3.6 Action economy layer

Record whether a benefit consumes:
- no action after legitimate passive setup;
- current Character action;
- future action opportunity;
- controller action for a Summon action;
- Battle-pouch item action;
- setup action plus later payoff action;
- one-time trigger;
- persistent slot/opportunity cost.

No effect receives an invisible action-economy discount because it is rare or a Bloodline.

### 3.7 Provenance layer

Record exact predicates queried by an effect.

Never calculate:

`more history = more power`

unless an exact authored effect defines a bounded relationship. There is no universal Provenance score.

---

## 4. Stacking-risk classes

Every active definition receives one or more risk flags.

- **S0 — low:** mostly self-contained utility/presentation; little amplification potential.
- **S1 — additive stat stack:** can combine with other Effective-stat sources.
- **S2 — action-output stack:** increases Attack PL/output or creates an output branch.
- **S3 — mitigation/recovery stack:** can compound survivability.
- **S4 — control/information stack:** can create denial or knowledge loops.
- **S5 — access stack:** grants/enables actions that may combine with other packages.
- **S6 — action-economy stack:** creates/changes action opportunities or source timing.
- **S7 — elemental/environmental stack:** grows strongly when terrain/affinity/team setup aligns.
- **S8 — Provenance/history stack:** exact historical predicates may unlock special expression.
- **S9 — transformation/Hosted stack:** temporary state can combine with equipment/Skills/lineage.
- **S10 — team amplifier:** value grows nonlinearly with ally packages.

Risk flag != nerf requirement. It tells us what must be tested in combination.

---

# PART A — CURRENT ITEM / WEAPON / GEAR AUDIT

## 5. Alpha-live consumables

### `field_recovery_pill`

Current effect: restore **4** underlying Remaining Battle PL, capped; action + quantity on success.

Risk: `S3`.

Audit:
- bounded by Battle Pouch quantity and action cost;
- does not scale with Stats/PL maximum;
- strongest interaction is stalling/recovery composition, not burst;
- must be tested with other once-per-Battle recoveries and high-Stamina builds.

Current disposition: **KEEP CURRENT VALUE pending full recovery-stack simulations**.

### `standard_antidote`

Generic poison cure. Risk: low/S3 condition answer.

Current disposition: **KEEP**. It is important counterplay infrastructure rather than a power spike.

### `burn_treatment`

Generic burning cure. Risk: low/S3 condition answer.

Current disposition: **KEEP**.

---

## 6. Catalogue consumable risk pass

These remain catalogue-only unless separately activated. This pass does not activate them.

### Recovery cluster

- `field_bandage` +2 — S3;
- `chakra_ration` +5 — S3;
- `concentrated_recovery_pill` +8 — S3;
- `clotting_powder` +3 — S3;
- `emergency_recovery_pill` +12 — S3;
- `soldier_medicine_pill` +8 + next direct action +3 Attack PL — **S2 + S3**;
- `phoenix_salve` cure burning +10 — S3;
- `nine_herb_elixir` +16 + selected poison/burning cure — **high S3**.

Audit priority:
1. total pouch recovery possible per Battle;
2. action cost vs damage tempo;
3. interaction with Character/Summon/Transformation recovery;
4. whether one optimal pouch crowds out tactical utility items.

No universal potion cooldown is invented here.

### Control/information cluster

- `smoke_bomb` — visibility interference up to 2 hostiles: S4/S10;
- `flash_bomb` — one-hostile flash interference: S4;
- `sensor_powder` — bounded trace evidence: S4 contextual;
- `chakra_anchor_talisman` — 25% next-packet pre-Stamina prevention: S3;
- `poison_coating_kit` — next compatible positive-damage hit applies poison: S2/S4;
- `chakra_conductive_oil` — +4 Attack PL to next compatible Lightning-tagged equipped-weapon direct action: **S2/S7**.

High-priority combination test:
`Lightning Skill + conductive weapon + conductive oil + Lightning-oriented lineage/Summon/Fūin + team-created wet/conductive terrain`.

The oil is a classic example of a modest individual number becoming dangerous through source stacking.

### Payload/material-in-action cluster

- explosive tags;
- Ninja Wire spool;
- sealing ink capsule.

These are not attacks/access by themselves and are therefore low standalone balance risk but high **S5 dependency value**.

---

## 7. Alpha-live weapons

### `kunai`

No intrinsic Stat modifier. Enables compatible actions.

Risk: S5 only.

Competitive role: low opportunity-cost access tool. It can become strong through Skill, coating, Fūin or Provenance, which is exactly why its base definition should remain mechanically modest.

### `shuriken_set`

No intrinsic Stat modifier. Enables compatible projectile actions; count does not imply packet count.

Risk: S5, with strong Space-Time/Causal interaction potential because projectiles are legitimate redirection/return targets.

### `ninja_wire`

No intrinsic Stat modifier; enables exact wire actions.

Risk: S4/S5/S7. High synergy potential with Lightning routing, traps, Fūinjutsu and team control, but no automatic restraint.

### `bandit_captains_tanto`

+3 Effective Bukijutsu before proficiency realisation.

Risk: S1/S8 potential.

Current raw proficiency-realised contribution by gap:

- gap0: `+3.00` effective contribution;
- gap1: `+2.70`;
- gap2: `+2.25`;
- gap3: `+1.65`;
- gap4+: `+1.05`.

This demonstrates why compatibility can keep a lesser/raw weapon competitively relevant.

---

## 8. Catalogue weapon bands

### Normal/common weapons

Raw pre-proficiency modifiers are mostly +1 to +2 Effective Bukijutsu, with some tool/action-family distinctions.

Expected competitive role:
- low-investment compatible weapon;
- cheap/available platform for coatings/Fūin/Provenance;
- should not become obsolete solely because rare definitions exist.

### Rare weapons

Common raw pattern: +3 Effective Bukijutsu, with family-specific access requirements.

Examples:
- chakra-conductive blade;
- Fūma shuriken;
- twin short blades;
- heavy war fan.

Risk: S1 + S5/S7 depending exact Skill synergy.

### Legendary weapons

Current definitions deliberately separate raw modifier from special authority:
- White Fang Tantō +5 Buki;
- Kusanagi +5 Buki;
- Uchiha Gunbai +4 Buki;
- Samehada +4 Buki;
- Seven-Star Sword +4 Buki;
- Bashōsen +4 Buki;
- Hiramekarei +5 Buki;
- Thunder God's Blade +4 Buki.

Their famous/special mechanics are **not** automatically active from rarity/ownership.

Audit rule:

> **Legendary competitive value should come from exact compatibility, Skills and Provenance expression, not a hidden legendary multiplier.**

High risk: `S1 + S5 + S8`, and potentially S2/S3/S4 depending eventual special Skill packages.

### Proficiency comparison requirement

For every weapon, future simulation records both raw modifier and realised modifier. Example:

`+5 legendary at gap3 = +2.75`

versus

`+3 rare at gap0 = +3.00`

Therefore a mastered/compatible lesser weapon can legitimately outperform a poorly matched legendary weapon before special provenance expression. This is desirable build diversity.

---

## 9. Gear audit by stacking vector

Current gear uses Effective Stats only.

### Ninjutsu-facing

- chakra-control wraps +1 Nin;
- chakra-insulated gloves +1 Nin +1 Buki;
- chakra-channel vest +2 Nin +2 Stamina;
- elemental conductor bracers +2 Nin;
- field medic coat +2 Nin +2 Stamina;
- sage-thread mantle +3 Nin +3 Stamina.

Risk: S1, with S7 when combined with elemental action packages.

Potential concern is **slot-compatible additive stacking**, not any one row alone.

### Taijutsu-facing

- sandals +1 Tai;
- light mesh +1 Tai +1 Stamina;
- shin guards +1 Tai +1 Stamina;
- compression wraps +3 Tai;
- Kage armour +2 Tai +3 Stamina.

Risk: S1/S3.

### Bukijutsu-facing

- forearm guards +1 Buki;
- insulated gloves +1 Buki +1 Nin;
- Bukijutsu harness +3 Buki;
- Seven Swords harness +4 Buki;
- plus equipped weapon contribution.

Risk: **high S1** because weapon + gear can stack on the same offensive Stat before proficiency/Skill output.

Required simulation chain:
`Base/Developed Buki -> gear Buki -> weapon pre-proficiency contribution -> proficiency realisation -> exact Skill output`.

### Fūinjutsu-facing

- seal-script bracers +2 Fūin;
- Fūinjutsu-inscribed coat +3 Fūin;
- chakra-ward talisman +2 Fūin +1 Stamina;
- adamantine seal belt +4 Fūin.

Risk: S1/S5, especially when Fūin attachments and contextual seal Skills become active.

Important: none grants Skill/Seal Access by Stat alone.

### Genjutsu-facing

- focus charm +2 Gen;
- mirror charm +3 Gen;
- sensory-thread headband +1 Gen;
- scout cloak +2 Gen.

Risk: S1/S4.

Need ensure future Yin does not make this investment redundant.

### Kinjutsu-facing

- Kinjutsu seal lining +3 Kin.

Risk: S1/S5. Access remains separately gated.

### Stamina-facing

Multiple torso/waist/legs packages add Stamina.

Risk: S3 because Stamina participates directly in mitigation.

Required calculation is nonlinear through the existing formula rather than `+X stamina = Y% defence` globally.

---

# PART B — SUMMON AUDIT

## 10. Verified current Summon authority — Pakkun

Durable Combat authority:

`Documentation/SC_Combat_Pakkun_Summon_Action_Closure_2026-09-05.md`

Key facts:
- Entity/Summon Base PL16;
- no independent recurring Battle turn merely because manifested;
- one Pakkun Battle action consumes controlling Character's normal action opportunity;
- Pakkun remains causal/source owner;
- Entity PL never transfers to controller;
- Battle actions: Tracking Scent, Nipping Bite PL7, Field Guide;
- separate future Enhancement requirement `+5% drop chance` is explicitly **not yet authored into Combat math**.

Competitive audit:
- action-economy cost prevents support evidence + controller attack on same ordinary action;
- direct damage is intentionally modest;
- Tracking/Field Guide value is contextual/information, not hidden accuracy;
- future +5% drop enhancement is primarily reward/economy facing and must not be smuggled into Battle power.

Risk: `S4/S6/S10`, direct damage low.

### Summon-wide mandatory rule

Every Summon audit must record separately:
- Entity PL;
- manifestation/access;
- controller action cost;
- prepared Summon actions;
- enhancement package;
- team/deployment/slot semantics;
- contextual verbs;
- source-owned modifiers to controller if any;
- exact expiry/removal.

Never add Summon PL to controller PL.

### Open Summon audit gap

Pakkun is live-source verified. Other Summon enhancement packages require current durable source discovery/consumption before per-row calculations are treated as production authority.

This is an **audit gap**, not permission to reconstruct them from memory.

---

# PART C — SKILL AUDIT

## 11. 320-Skill catalogue audit plan

Current durable index contains **320 Skills** across eight waves. The catalogue is larger than the currently active runtime slice.

The audit must therefore separate:

- `catalogue_only` authored definition;
- legitimately sourced/learned;
- prepared;
- Battle/context legal;
- implemented;
- runtime validated.

No bulk activation is authorised.

### Per-Skill competitive columns

Each Skill will receive:

```text
skillId
mode
primary discipline
base/authored output
packets
target count
setup predicate
conditional output branch
control state
mitigation interaction
recovery interaction
action cost
resource/payload dependency
weapon dependency
element/nature dependency
Bloodline/lineage dependency
Summon dependency
Fūin dependency
Provenance predicate
team amplification
ordinary counters
specialist counters
stacking risk flags
activation status
runtime status
```

### Audit order

1. currently `alpha_live` / Story-consumed Skills;
2. active Mission encounter actions;
3. contextual/passive Skills needed by Story/World;
4. candidate catalogue Skills most likely to form major offensive/control stacks;
5. remaining catalogue-only rows.

This prevents 320-row paper balancing from delaying actual Alpha paths while still ensuring every definition enters the ledger.

---

# PART D — BLOODLINES / TRANSFORMATIONS / HOSTED ENTITIES

## 12. Bloodline / four-grade lineage risk

Every lineage package is at minimum S5 and can become S1–S10 depending expression.

Required anti-collapse:
- possession != Access;
- Access != active state;
- active state != every Skill;
- capability effect != Base PL mutation;
- high development != extra action opportunity;
- rare lineage != blanket superiority.

The separate Apex PvP Matrix is mandatory before number tuning.

---

## 13. Curse Mark L1 / L2

Both states are KEEP.

Whole-build audit must test:
- L1 as lower-commitment tactical state;
- L2 as higher-commitment transformation;
- interaction with weapon/gear/Summon/lineage/Fūin;
- no hidden Base Stat/PL mutation unless owning state contract says so;
- activation/removal and punish windows;
- whether L2 invalidates all strategic reasons to remain at L1.

Exact values remain open and should be authored only after interaction simulations.

---

## 14. Hosted Entities / temporary loans

Mandatory:
- Entity identity remains distinct;
- Hosted relationship != ownership/mastery;
- no additive Hosted PL;
- no independent turn unless exact authority;
- temporary loan effects are source-owned and removed exactly;
- whole-build simulation includes Equipment and Skills active during the temporary state to catch multiplication/stacking errors.

Arc1 Mission12 temporary Kurama loan is an important regression fixture because it already combines high Effective-state modifiers and additional actions without creating a merged Character.

---

# PART E — PROVENANCE / FŪIN / CRAFTING

## 15. Provenance as competitive build variable

The new Crafting/Provenance contract establishes stable created-object identity and immutable causal history without a generic power score.

Competitive audit therefore asks:

1. what exact effect queries the object's history?
2. what exact provenance predicate must be true?
3. what payoff occurs?
4. does the payoff coexist with ordinary weapon modifier/proficiency/Fūin effects?
5. can two provenance payoffs accidentally query the same fact and double-count it?
6. what happens if the historical relationship is severed/suppressed by Causal Space-Time?
7. what does the opponent legitimately know/read?

### Provenance anti-meta rule

No Bloodline, gear piece or passive may become a universal `all your provenance effects are stronger` percentage amplifier without exceptional justification.

That would create a compulsory hereditary/meta pick and flatten build diversity.

---

## 16. Fūin attachments

Alpha default = one live Fūin attachment per eligible durable host unless exact authority expands capacity.

This slot itself is a major competitive opportunity cost.

Every attachment effect must be tagged by risk class and audited with:
- host weapon/gear modifier;
- proficiency;
- Skill payload;
- Bloodline/transformation;
- Summon enhancement;
- Provenance expression.

A Fūin attachment never creates learned Skill ownership or Base Stat/PL mutation.

---

# PART F — TEAM-BUILD SIMULATION SUITE

## 17. Required archetype stress tests

The balance target is not `all builds equal`; it is strong strategic packages with genuine sacrifices and answers.

Required simulation families:

### A. Provenance Bukijutsu specialist

Stress:
- high Buki gear;
- compatible weapon/proficiency;
- weapon-specific Skill;
- Fūin attachment;
- exact Provenance expression;
- Summon/team support.

Question: can the opponent attack setup, weapon reliance or action economy without requiring the same Bloodline?

### B. Elemental artillery

Stress:
- high Nin gear;
- advanced elemental lineage/Skill;
- terrain setup;
- elemental Summon/team enabler;
- one-shot consumable/rider;
- Fūin conductor/amplifier if authored.

Question: is its terrifying burst paid for through setup, predictability, resource cost and vulnerability?

### C. Control/information composition

Stress:
- Genjutsu;
- Yin schema support;
- smoke/flash/information items;
- sensory Summon;
- Fūinjutsu control;
- Causal anchor play.

Question: does information/control deny the opposing player all meaningful actions?

### D. Stamina/recovery wall

Stress:
- high Stamina gear;
- prevention effects;
- recovery consumables;
- Character recovery Skills;
- Summon support;
- Yang adaptation.

Question: can the build stall indefinitely, or can burst/control/resource denial overcome it?

### E. Hosted/transformation carry

Stress:
- transformation Effective modifiers;
- additional actions unlocked by source;
- ordinary equipment;
- Bloodline;
- Summon;
- team protection.

Question: are we accidentally multiplying several temporary power systems without opportunity cost?

### F. Causal weapon-denial team

Stress:
- Causal Space-Time interception;
- White Fire relationship burn;
- weapon-heavy opposing build.

Question: can weapon specialist switch routes/feint/team-play, or does one rare capability delete their whole build?

### G. Dead Air pressure team

Stress:
- vacuum control;
- ally pull-zone attacks;
- target movement denial;
- Yang/gear/Space-Time counters.

Question: does `leave the zone` remain a real option, or has allied control quietly removed it?

### H. Lightning network team

Stress:
- wire;
- Water terrain;
- conductive weapon/gear;
- prepared nodes;
- high-Nin Lightning action;
- Summon/Fūin support.

Question: can the opponent break the circuit before payoff, and is the final output still one correctly authored packet/sequence?

---

## 18. Stack review rule

When a test build is too strong, do **not** automatically nerf every contributing system.

Trace the exact chain and identify:

- duplicate contribution;
- missing opportunity cost;
- missing incompatibility;
- action-economy leak;
- unbounded multiplier;
- insufficient tell/counterplay;
- item slot with no real competition;
- Provenance predicate that is too generic;
- Summon enhancement incorrectly acting as passive free power;
- transformation source not cleaning up;
- Skill packet/output authored incorrectly.

Tune the smallest correct source.

---

## 19. Current audit status

### Source inventory consumed

- 96 Item/Weapon/Gear/Material catalogue definitions: **inventory/risk pass begun**;
- Alpha-live consumables/weapons: **first pass complete**;
- current Equipment modifier families: **first stacking-vector pass complete**;
- Pakkun Summon authority: **source verified / first pass complete**;
- 320 Skills: **ledger schema established; per-row pass ongoing**;
- Apex four-grade capability families: **separate PvP matrix complete**;
- Crafting/Fūin/Provenance: **mechanics boundary consumed; per-effect packages depend on exact definitions**;
- Curse Mark / Hosted states: **interaction test requirements established**.

### Not claimed

- all 320 Skills numerically rebalanced: **NOT YET**;
- all catalogue-only definitions activated: **NO**;
- all Summons source-verified: **NO**;
- PvP runtime simulation: **NOT IMPLEMENTED / NOT VALIDATED**;
- Golden: **NOT CLAIMED**.

---

## 20. Final lock

> **SC competitive balance is an interaction audit. Individual rows are only ingredients. We deliberately permit players to assemble brutal, specialised teams, but every amplification chain must expose its source, opportunity cost, action cost, counterplay and cleanup. Provenance is allowed to make two nominally identical weapons meaningfully different, but history only matters mechanically when an exact authored effect asks a bounded question about that history.**
