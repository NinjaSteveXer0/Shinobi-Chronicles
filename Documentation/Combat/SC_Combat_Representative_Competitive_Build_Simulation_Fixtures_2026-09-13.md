# Shinobi Chronicles — Representative Competitive Build Simulation Fixtures

**Date:** 2026-09-13  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING CALCULATION FIXTURES / PAPER-SIMULATION AUTHORITY — RUNTIME SIMULATION AND FINAL RETUNES SEPARATE**

## 1. Purpose

This document begins the actual calculation phase of the whole-build competitive audit using current durable Combat values.

It does **not** invent a hidden Combat Rating and does not assume an undocumented formula from Effective Stats directly into authored Skill Attack PL.

Where current authority supplies exact math, this document calculates it. Where the relationship is not yet explicitly authored, it records the interaction rather than fabricating a conversion.

Current Stamina mitigation:

`finalBattlePLDamage = max(1, floor(resolvedAttackPL * 100 / (100 + EffectiveStamina)))`

All values below assume no pre-Stamina prevention unless a fixture explicitly says otherwise.

---

## 2. Direct-packet damage reference table

| Resolved Attack PL | Stamina 20 | Stamina 40 | Stamina 60 | Stamina 80 | Stamina 100 |
|---:|---:|---:|---:|---:|---:|
| 20 | 16 | 14 | 12 | 11 | 10 |
| 24 | 20 | 17 | 15 | 13 | 12 |
| 28 | 23 | 20 | 17 | 15 | 14 |
| 30 | 25 | 21 | 18 | 16 | 15 |
| 32 | 26 | 22 | 20 | 17 | 16 |
| 34 | 28 | 24 | 21 | 18 | 17 |
| 40 | 33 | 28 | 25 | 22 | 20 |
| 48 | 40 | 34 | 30 | 26 | 24 |
| 56 | 46 | 40 | 35 | 31 | 28 |
| 64 | 53 | 45 | 40 | 35 | 32 |
| 72 | 60 | 51 | 45 | 40 | 36 |

### Finding

Stamina remains meaningful across the current high-end authored attack range without zeroing damage. For example:
- PL40 falls from 33 damage at Stamina20 to 20 at Stamina100;
- PL56 falls from 46 to 28;
- PL72 falls from 60 to 36.

This reinforces why Stamina gear/recovery compositions must be evaluated with actual attack bands rather than a generic `tankiness percentage`.

---

## 3. Team-AoE fixture — ordinary elemental corridor/capstone rows

Current elemental catalogue contains rare three-target rows at **PL34 each** and legendary three-target rows at **PL40 each**.

If all three targets happen to have the same Stamina, the nominal team-wide Battle-PL loss is:

| Skill packet | Stamina 20 team total | Stamina 40 | Stamina 60 | Stamina 80 | Stamina 100 |
|---|---:|---:|---:|---:|---:|
| PL34 × 3 | 84 | 72 | 63 | 54 | 51 |
| PL40 × 3 | 99 | 84 | 75 | 66 | 60 |

### Finding

These rows are much more threatening in 3v3/4v4 than their duel profile suggests. That is expected and not an automatic nerf trigger.

Required future test questions:
- how often can three valid hostiles actually be selected in PvP modes;
- what preparation/opportunity cost accompanies the capstone;
- whether team prevention/control can reasonably answer it;
- whether a high-end elemental Bloodline/Summon/Fūin stack adds another output source to these packets or replaces/changes the action instead.

Do **not** balance these rows from 1v1 data alone.

---

## 4. High-end Menma/Echo/Kurama output fixture

Current catalogue anchor:

`skill_menma_echo_kurama_triple_thread_burst`

- base authored Attack PL: **56**;
- one packet despite Menma + Echo + Kurama provenance;
- exact relationship/source predicates required.

Current setup candidate:

`skill_menma_echo_three_source_sync`

- next exact Echo+Kurama-loan direct/support action: **+8 Attack PL/effect marker** where compatible.

Therefore a legitimately prepared Triple-Thread Burst may reach:

`56 + 8 = PL64`

before any one separately compatible generic external amplifier.

Under the new setup-stacking safety gate, a hypothetical Character who also legitimately knows and can use one compatible external `+8` Chakra Overclock could reach:

`56 + 8 same-source preparation + 8 one external amplifier = PL72`

with Chakra Overclock's authored **-4 underlying Battle PL self-cost after the attack commits**.

This is a **simulation ceiling candidate**, not automatic Menma access and not a universal combination grant.

| Legal candidate state | Attack PL | Dmg vs Sta20 | Sta40 | Sta60 | Sta80 | Sta100 |
|---|---:|---:|---:|---:|---:|---:|
| Triple-Thread base | 56 | 46 | 40 | 35 | 31 | 28 |
| + Three-Source Sync | 64 | 53 | 45 | 40 | 35 | 32 |
| + one compatible external +8 | 72 | 60 | 51 | 45 | 40 | 36 |

### Finding

The difference between PL56 and a fully prepared candidate PL72 is substantial but it requires:
- exact Menma/Echo/Kurama state;
- current authorised voluntary Kurama source;
- learned access to both relevant setup/action packages;
- setup action(s);
- compatibility under the new amplifier gate;
- self-cost for Overclock.

This is the shape SC wants: frightening payoff from an expensive, legible build chain rather than hidden free multiplication.

Required runtime simulation later:
- can the opponent interrupt preparation;
- does the source state persist long enough to make the chain realistic;
- whether one setup action should be enough or the build becomes too telegraphed;
- whether team protection turns that telegraph into an unavoidable kill setup.

---

## 5. Recovery-wall fixture

Use a representative incoming **PL40** direct packet.

Damage after Stamina:
- Sta20 → 33;
- Sta40 → 28;
- Sta60 → 25;
- Sta80 → 22;
- Sta100 → 20.

Current recovery examples include:
- Field Recovery Pill: +4;
- Mystical Palm Advanced: +16 once/Battle;
- Emergency Chakra Transfer: +12 to ally once/Battle;
- Hosted Beast Regenerative Surge: +14 once/Battle;
- several Echo/Kinjutsu packages: +8 to +12.

At **Stamina60**, one PL40 packet deals **25**. Relative recovery of that one packet:
- pill +4 recovers 16%;
- +8 recovery recovers 32%;
- +12 recovers 48%;
- +14 recovers 56%;
- +16 recovers 64%.

At **Stamina100**, the same attack deals **20**:
- +12 recovers 60%;
- +14 recovers 70%;
- +16 recovers 80%.

### Finding

Recovery becomes proportionally more powerful on already-high-Stamina characters. This is the first concrete evidence for the previously flagged `Stamina + prevention + recovery` wall risk.

However, every listed recovery normally costs an action or is tightly authored/once-per-Battle. Therefore the correct question is **tempo**, not only amount.

Do not invent a blanket healing cap yet. Runtime/team simulations need to test whether a tank spending actions to recover can still meaningfully threaten objectives/opponents or merely delays an inevitable loss.

---

## 6. Weapon proficiency fixture — rarity does not erase compatibility

Current proficiency multipliers:
- gap0 1.00;
- gap1 0.90;
- gap2 0.75;
- gap3 0.55;
- gap4+ 0.35.

A legendary +5 Bukijutsu weapon has realised contribution:

| Proficiency gap | +5 weapon realised | +4 weapon realised | +3 weapon realised |
|---:|---:|---:|---:|
| 0 | 5.00 | 4.00 | 3.00 |
| 1 | 4.50 | 3.60 | 2.70 |
| 2 | 3.75 | 3.00 | 2.25 |
| 3 | 2.75 | 2.20 | 1.65 |
| 4+ | 1.75 | 1.40 | 1.05 |

### Direct competitive comparison

A fully compatible **+3 rare** weapon at gap0 provides **+3.00** realised Bukijutsu.

A poorly compatible **+5 legendary** weapon at gap3 provides **+2.75**.

Therefore the lesser-rarity weapon can legitimately provide the larger raw realised Stat contribution before any special Skill/Provenance package.

This is desirable. It means legendary ownership does not automatically delete weapon-specialisation decisions.

### Provenance implication

A player's old +3 weapon may become more strategically valuable still when an exact Provenance-aware Skill asks a bounded question about its history.

That payoff must be authored specifically; no generic `old weapon bonus` exists.

---

## 7. Bukijutsu setup-chain fixture

Current catalogue examples include:
- Weapon Feint: next equipped-weapon direct action +5;
- Chakra Focus: next direct authored attack +4;
- Team Signal: next coordination-tagged action +3;
- Kinjutsu Chakra Overclock: next direct +8, then self -4;
- weapon/Fūin/Provenance effects may also exist independently.

Without the newly closed amplifier gate, one could attempt to collect multiple setup markers and claim all apply to a single weapon attack.

Illustrative accidental stack against a PL24 Precision Throw:

`24 + 5 + 4 + 3 + 8 = PL44`

before any exact weapon/Fūin/Provenance action modifier.

The new default prevents that unreviewed combination.

Legal default would instead be:
- exact same-source branch/prerequisite where the resolving action has one; plus
- **one** compatible external output amplifier.

For example, PL24 + Weapon Feint +5 = PL29, **or** PL24 + Overclock +8 = PL32 unless an exact combination contract deliberately authorises more.

This is not a nerf to tactical preparation; it makes combination-building an authored strategy rather than a loophole in marker wording.

---

## 8. Percentage-prevention fixture

Current catalogue contains 20%, 25%, 30%, 35%, 40% and 45% one-packet pre-Stamina prevention states.

Without arbitration, a Character could eventually carry several independent prevention sources from:
- Skill;
- ally support;
- Hosted state;
- Fūin/gear;
- item.

The newly closed default is **strongest eligible percentage prevention only** for that packet unless an exact layered-defence package explicitly authors a different order.

Illustrative reason:
- simple additive 45% + 35% + 30% would exceed 100%;
- multiplicative application would still leave only `0.55 × 0.65 × 0.70 = 25.025%` of the pre-Stamina attack, about 75% prevention, before Stamina.

Neither behaviour was explicitly authored by the individual Skills.

Therefore silent stacking is rejected.

This preserves defensive team strategy because other unused states can remain available through their own authored duration, and distinct non-percentage defensive mechanics may still combine only under explicit ordering.

---

## 9. Pakkun action-economy fixture

Pakkun's verified Battle contract:
- does not receive a recurring independent turn;
- a Pakkun action consumes the controller's normal action opportunity;
- Nipping Bite = PL7;
- Tracking Scent / Field Guide are evidence/support actions.

### Competitive consequence

A controller cannot ordinarily:

`use Pakkun Tracking Scent + also perform their full normal attack in the same action opportunity`

unless future exact authority creates such a combination.

This means Pakkun's information value has a real tempo cost in Battle while retaining substantial contextual value outside Battle.

His separately recorded future `+5% drop chance` Enhancement is not currently Combat output and cannot be counted as Battle power.

This is a useful model for future Summons: a powerful Summon enhancement/action must be measured together with **controller opportunity cost**, not added to the Character as if it were free passive PL.

---

## 10. Lightning network fixture — interaction map, numbers intentionally pending

Current exact pieces already exist that could combine:
- Lightning direct Skills;
- `skill_lightning_style_lightning_wire` requiring compatible conductive/wire source where authored;
- `ninja_wire` / wire payloads;
- `chakra_conductive_oil` gives +4 Attack PL to next compatible Lightning-tagged equipped-weapon direct action;
- chakra-conductive blade definition;
- Water Skills/environment can create wet terrain only where exact action/context actually says so;
- future advanced Lightning can author a prepared conductor network.

Binding calculation boundary:

Do **not** automatically combine all of those merely because the words `Lightning`, `wire`, `water`, and `conductive` appear.

Each edge must be exact:

`source -> compatibility predicate -> affected action -> modifier/rider -> expiry`

This fixture is queued for exact numerical simulation once the advanced Lightning Skill(s), relevant Fūin packages and any Summon enhancement are authored/source-verified.

---

## 11. Dead Air / Yang counter-build fixture — mechanics before numbers

Dead Air threatens air availability and creates suction/pull geometry.

Yang Grade II may author one temporary respiratory adaptation to the exact hazard after legitimate preparation/exposure.

This is **not** a binary counter.

The expected interaction model is:
- Dead Air user spends setup/maintenance to create hazardous zone;
- ordinary target can move, interrupt, range or use equipment;
- Yang user may spend their own development/action/resource route to remain effective longer;
- stronger/larger/longer vacuum can eventually exceed that adaptation;
- Yang choice may sacrifice another function, creating a new weakness.

This is the template for PvP counter-build design: multiple answer families, specialist efficiency, no `equipped counter = immunity`.

---

## 12. Causal Space-Time versus weapon specialist fixture

Grade-II hereditary Space-Time weapon interception is deliberately prepared rather than universal.

Expected exchange:

1. Space-Time player spends action to prepare exact stance/anchor;
2. Bukijutsu opponent sees/knows enough to suspect a weapon-path response where observer Knowledge supports it;
3. opponent can:
   - use disposable projectile;
   - feint;
   - switch to non-weapon action;
   - multi-vector pressure with ally;
   - deliberately trigger the stance with a low-value attack;
4. if qualifying attack resolves into stance, only exact authored avoidance/redirection/return/reflection occurs;
5. Space-Time user enters causal lockout through next action opportunity;
6. weapon team gets punish window.

### Provenance protection

Even if a provenance-bearing thrown weapon is quarantined/redirected, ordinary PvP does not permanently delete its historical object identity.

White Fire + Causal Space-Time can suppress/burn one exact current relationship only under its own high-end predicates; it does not erase the weapon's history or account ownership.

---

## 13. Simulation conclusions from current authority

The first calculations support several design choices:

- high Stamina significantly but not absolutely mitigates the current PL20–72 output band;
- recovery becomes proportionally stronger as Stamina rises, making tank/heal compositions a real test priority;
- team AoE cannot be judged from duel balance;
- compatible lower-rarity weapons can outperform poorly matched legendary raw modifiers;
- high-end multi-source Skills can reach frightening output through deliberate setup while still exposing costs/predicates;
- controller-action Summon semantics prevent free extra-turn inflation;
- silent setup/prevention stacking would create obvious competitive exploits, validating the new arbitration gates.

## 14. Next calculation fixtures

Next source-authorised simulations should add:

- actual created/Fūin/Provenance weapon instances once exact effect packages exist;
- additional Summon enhancement packages after source verification;
- exact Curse Mark L1/L2 state values after they are authored;
- advanced Bloodline Grade I–IV numerical packages after mechanic/PvP review;
- mixed-Stamina team matrices rather than same-Stamina AoE examples;
- objective/turn-count simulations once Coding exposes executable runtime fixtures.

No Golden/runtime result is claimed by this paper simulation.
