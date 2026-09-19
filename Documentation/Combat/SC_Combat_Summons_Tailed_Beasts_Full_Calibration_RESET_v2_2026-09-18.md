# Shinobi Chronicles — Summons + Tailed Beasts Full Calibration RESET v2

**Date:** 2026-09-18  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **ACTIVE RESET AUTHORITY — PRIOR WAVE 1/2/3 CALIBRATION CLOSURES SUPERSEDED FOR RECALIBRATION**  
**Parent:** #235  
**Source baseline at reset:** `ad4573a05c78f5255c7fea2008e5fe371712039a`

Stephen has explicitly directed that the Summons + Tailed Beasts calibration restart **from the beginning**.

Reason:

The earlier pass over-weighted Battle action palettes and under-weighted the actual **Enhancement** layer Stephen intended.

Examples supplied by Stephen:

- Kakashi Ninja Dogs: **+5 percentage points Item Find per distinct dog recruited**;
- Ibuse may provide **Poison Immunity**;
- Baku may increase **Wind and Fire damage**.

Therefore:

> **A Summon/Tailed-Beast is not calibrated just because its attacks are calibrated.**

The full source package must explain what owning, attaching, hosting, bonding with, or manifesting that source actually changes for the player.

---

## 0A. Global Unique Mechanics Standard

This recalibration is subordinate to the binding global rule:

`Documentation/Combat/SC_Combat_Unique_Shinobi_Chronicles_Mechanics_Design_Standard_2026-09-19.md`

Every Summon / Tailed-Beast / Hosted-source Skill, ability, buff, debuff, status effect, enhancement, drawback, reaction, collection bonus and related mechanic must be authored as a **Shinobi Chronicles mechanic**, not as a generic RPG template with Naruto-flavoured naming.

Generic RPG concepts may be used as foundations, but the final package must have a source-specific mechanical fingerprint and pass the name-swap / decision / attractiveness tests in the global standard.

## 1. Supersession

The following earlier documents remain historical records but are no longer final calibration authority:

- `SC_Combat_Summon_Calibration_Wave_1_Baku_Gamakichi_Ibuse_2026-09-18.md`
- `SC_Combat_Summon_Calibration_Wave_2_Proposal_Gerotora_Giant_Clam_Enma_2026-09-18.md`
- `SC_Combat_Summon_Calibration_Wave_3_Proposal_Nue_Pakkun_Kamatari_2026-09-18.md`

Their individual ideas may be reused after fresh review, but nothing from those waves is preserved automatically merely because it was previously signed off.

This reset does **not** alter current runtime by itself.

---

## 2. New mandatory calibration sheet for every source

Each exact Summon / Tailed-Beast representation must now be reviewed through ALL of these sections.

### A. IDENTITY / PL

- stable Registry ID;
- display identity;
- ontology/lifecycle;
- seven Base Stats;
- Base PL;
- live/staged/non-live status.

### B. BATTLE ROLE

- attacker / tank / support / control / tracker / specialist / hybrid;
- attached vs manifested behavior;
- action economy;
- own Battle PL ledger or shared/controller action;
- targetability.

### C. OWN SKILL KIT

- exact player-readable actions;
- exact Attack PL / guard / recovery / control values;
- cooldown / once-per-Battle limits;
- no dead setup buttons;
- no jargon-only actions.

### D. ENHANCEMENT PACKAGE — REQUIRED

Every source must explicitly answer:

> **What does this Summon / Tailed Beast enhance for the player?**

Enhancement may include:

- elemental damage;
- elemental affinity;
- Stat modifiers;
- poison/status immunity or resistance;
- Item Find / loot chance;
- tracking / discovery;
- recovery;
- mitigation;
- seal control;
- technique access;
- crafting / gathering;
- travel / access;
- collection-set progression;
- relationship-specific effects.

For every enhancement, state exact activation ownership:

- **OWNED** — active simply because the source is legitimately acquired;
- **ATTACHED** — active only while equipped/attached;
- **MANIFESTED** — active only while physically active in Battle;
- **BONDED/HOSTED** — active only for an exact relationship;
- **COLLECTION** — scales from distinct acquired family members.

### E. MODE TRADE-OFF

If a source can be attached OR manifested:

- state whether attached enhancement remains while manifested;
- avoid accidental double benefit unless deliberately authorised;
- mode switches must not duplicate PL, Stats, actions, or enhancement.

### F. COUNTER / DRAWBACK

Where identity supports it:

- elemental vulnerability;
- cooldown;
- loss of control;
- self-risk;
- restricted eligibility;
- required relationship;
- incompatibility.

Do not add drawbacks merely for symmetry.

### G. PERSISTENT / COLLECTION PROGRESSION

Explicitly check:

- family collection bonus;
- recruit-count progression;
- Codex/achievement synergy;
- non-Battle utility.

Standing Ninken rule remains:

**+5 percentage points eligible Item Find per distinct Kakashi Ninja Dog recruited, max +40% for all eight.**

### H. DOUBLE-COUNT / REPRESENTATION EXCLUSIONS

- dedicated Character forms that already embody the source;
- transformations that must not receive the same enhancement twice;
- same persistent Entity vs exact representation distinction.

### I. PLAYER TEXT

A 12–13 year old should understand:

1. what the source does;
2. what bonus it gives;
3. when that bonus is active;
4. what its main drawback is.

If the explanation needs architecture vocabulary, the design is not finished.

---

## 3. Numeric enhancement rules

### Percentage damage bonuses

When authored as elemental damage:

- percentage modifies the exact pre-Stamina Attack-PL packet;
- round once at the resolver boundary;
- never modify Base PL directly;
- do not double-apply through both Stat and packet scaling unless explicitly authored.

### Immunity

"Immunity" means the named effect cannot establish its ordinary status/effect state.

It does not automatically negate:

- raw damage from an attack that also carries that status;
- unrelated toxins/statuses;
- Story poisoning;
- environmental outcomes

unless explicitly stated.

### Poison profile law

**Poison is not a generic fixed-tick DoT template in Shinobi Chronicles.**

A damaging poison-delivery action must do two distinct things:

1. resolve meaningful **immediate authored damage**;
2. establish a **source-authored Poison Profile** that creates a real tactical problem if left untreated.

The runtime key `poisoned` / condition type `poison` is a **classification**, not a universal promise that every poison means "2 damage for 3 turns".

Named/specialist poisons may author different profiles, including:

- exertion-triggered Battle-PL loss;
- escalating damage;
- movement numbness;
- attack-output suppression;
- chakra-expression penalties;
- control/finisher prerequisites;
- cure pressure;
- another exact poison-specific consequence.

The source must state:

- immediate damage;
- what being Poisoned actually does;
- how long it lasts;
- what actions make it worse, if any;
- how it is cured/countered;
- whether reapplication refreshes, escalates or is rejected.

Canonical shorthand:

> **Poison should force a decision, not just add tiny numbers to the end of a turn.**

A baseline generic poison resolver may exist for ordinary low-importance sources, but **do not use that baseline as the design ceiling for named poison specialists such as Ibuse**.

Poison Immunity prevents the poison profile / poison condition from establishing, but does **not** erase an attack's immediate raw damage unless that exact immunity separately says so.

### Item Find

- determine eligible random loot table first;
- add percentage points after base eligible chance is known;
- cap final eligible chance at 100%;
- do not affect guaranteed rewards, Ryo, EXP, or authored Story rewards.

---

## 4. New calibration order

Restart in exact order:

1. **Baku**
2. **Gamakichi**
3. **Ibuse**
4. **Gerotora**
5. **Giant Clam**
6. **Monkey King Enma**
7. **Nue**
8. **Pakkun / Kakashi Ninken family**
9. **Kamatari**
10. **Snake**
11. new Tailed-Beast representations
12. Kurama-family reconciliation
13. Jinchūriki/transformation anti-double-count audit

Prefer **one source at a time** until the enhancement language is stable.

---

## 5. Closure law

For this reset:

**old sign-off != current final calibration**

A source is only CLOSED again after Stephen approves the new full sheet including enhancement.

Implementation remains separate:

**design closed != implemented != runtime validated != Golden GREEN**.

---

## 6. Current RESET v2 progress — 2026-09-19

Closed under fresh Stephen sign-off:

- **Source 01 — Baku** — CLOSED
- **Source 02 — Gamakichi** — CLOSED
- **Source 03 — Ibuse** — CLOSED
- **Source 04 — Gerotora** — CLOSED
- **Source 05 — Giant Clam** — CLOSED
- **Source 06 — Monkey King Enma** — CLOSED
- **Source 07 — Nue** — CLOSED
- **Source 08 — Pakkun / Kakashi Ninken family** — CLOSED

Source 03 Ibuse closure preserves the signed-off Neurotoxin package:
- ATTACHED Poison Immunity;
- Poison Mist = up to 2 targets, 8 immediate Battle PL bypassing Stamina, first-action movement/reposition numbness, 6 post-action Battle PL exertion cost on hostile ATTACK or movement/reposition/escape, max 2 exertion triggers, up to 3 action opportunities or cleanse, then 2 Ibuse action opportunities of recharge;
- Venom Bite ATK24 + `ibuse_neurotoxin`;
- Subterranean Ambush ATK28 + ordinary-distance underground traversal;
- Swallow Trap requires `ibuse_neurotoxin`, deals 6 immediate Battle PL bypassing Stamina, then traps through the target's next action opportunity;
- `ibuse_neurotoxin` uses shared `conditionType: poison` classification/cure plumbing without reverting to the legacy generic poison tick profile.

Next ordinary Summon state:

- **Source 09 — Kamatari** — PROPOSED / awaiting Stephen sign-off; PL / Registry numeric reconciliation routed as #258.
- **Source 10 — Snake** — next uncalibrated ordinary source.

Source 09 proposal authority:
`Documentation/Combat/SC_Combat_RESET_v2_Source_09_Kamatari_Proposal_2026-09-19.md`

Kamatari RESET v2 mechanical direction:
- retire generic +6 Bukijutsu Stat-stick in favour of **Sicklewind Route**;
- qualifying controller Wind Release creates one consumable Kamatari wind lane;
- lane can carry the controller's next Bukijutsu attack across ordinary distance / soft cover or empower Kamatari's signature **Quick Beheading Dance**;
- manifested package: Reaping Rush ATK30, Gale Pursuit ATK24 / 32 after enemy movement, Crosswind Cutoff once/Battle target-choice pursuit reaction, Quick Beheading Dance once/Battle ATK32 each up to 3 + destruction of ordinary hiding cover in the authored wind path;
- no generic accuracy roll / Speed Stat / hard Stun / hidden PL scaling.

Then continue into Source 10 Snake, accepted Tailed-Beast representations, Kurama-family reconciliation, and Jinchūriki/transformation anti-double-count audit.

