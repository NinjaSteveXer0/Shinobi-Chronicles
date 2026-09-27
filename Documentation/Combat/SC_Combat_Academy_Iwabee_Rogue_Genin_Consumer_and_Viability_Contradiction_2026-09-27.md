# Shinobi Chronicles — Academy Iwabee Rogue Genin Consumer + Viability Contradiction

**Date:** 2026-09-27  
**Owner:** Combat / Skills / Items / Weapons  
**Incoming handoff:** #395  
**Status:** **CONSUMER SEMANTICS CLOSED / VIABILITY RED / CE RECONCILIATION REQUIRED BEFORE CODING RELEASE**  
**Authority order:** GitHub live source > durable CE/SC documents > current specialist decisions > Project memory.

## 1. Scope

This document consumes the exact Academy Iwabee Rogue Genin Battle request from #395.

It answers:

1. whether the already-closed reusable `rogue_genin` Combat package can be consumed unchanged;
2. whether an Iwabee-specific action-selection wrapper is required;
3. the one-on-one action economy and terminal envelope;
4. whether the current encounter is actually winnable for fresh Academy Iwabee under current GOLDEN Battle semantics;
5. whether the Earth-Release escape-block branch authorises a Battle modifier.

The result is intentionally split:

- **semantic reuse:** CLOSED / compatible;
- **fresh-Iwabee Battle viability:** **RED / contradiction confirmed**.

Combat does **not** hide that contradiction by weakening the Rogue, mutating PL, inventing pre-damage, or fabricating an Origin-only bonus.

---

# 2. Upstream authority consumed

CE:

`Documentation/Coordination/Academy_Iwabee_Rogue_Genin_Battle_and_Escape_Block_Reconciliation_2026-09-27.md`

PL / Registry:

`Documentation/Registry/Academy Iwabee Origin Rogue Genin Registry and PL Mapping 2026-09-27.md`

Story:

`Documentation/Story/Academy_Iwabee_Origin_2026-09-27_Scene_Authority_and_Backdrop_Contract.md`

Reusable Rogue Combat package:

`Documentation/Combat/SC_Combat_Academy_Wasabi_Rogue_Genin_PL_Battle_Closure_2026-09-24.md`

Current live source inspected:

`game.js` blob `05e014efc8a77705c53f0ec9d8f143703ad91da8`

Current fail-closed Story runtime inspected:

`runtime/alpha-origin-scenes-32900-b.js`

---

# 3. Exact identity / deployment layers

Battle config:

`academy_iwabee_origin_rogue_confrontation`

Encounter:

`origin_academy_iwabee:rogue_genin_confrontation`

Player:

`academy_iwabee`

Historical opposition participant:

`iwabee_origin_rogue_genin_01`

Reusable opposition template:

`rogue_genin`

Exact identity pair:

`historicalParticipantRef = iwabee_origin_rogue_genin_01`

`oppositionTemplateId = rogue_genin`

Do not collapse these addresses.

The same `rogue_genin` template used by Wasabi does **not** mean the same historical person.

Exact deployment remains strict 1v1:

- Player Slot 1: `academy_iwabee`
- Enemy Slot 1: `iwabee_origin_rogue_genin_01` consuming `rogue_genin`
- all other Battle slots empty unless later authority explicitly changes the encounter

No Clan teammate, instructor, or other Story observer is silently injected.

---

# 4. Registry / PL inputs — unchanged

## Academy Iwabee

Base Stats:

`14 / 11 / 13 / 6 / 5 / 5 / 14`

Base PL:

**13**

Current prepared palette:

- `academy_iwabee_iron_staff_smash`
- `academy_iwabee_staff_sweep`
- `academy_iwabee_earth_style_rising_wall`
- `academy_iwabee_stone_snare`
- `academy_iwabee_grounded_stance`

## Rogue Genin reusable template

Base / entry Stats:

`23 / 22 / 21 / 10 / 14 / 15 / 24`

Base / entry PL:

**23**

No encounter-specific Current-PL suppression, hidden handicap, parity multiplier or pre-damage is authorised.

---

# 5. Reusable Rogue action package — CONSUME UNCHANGED

Combat confirms that the existing Wasabi Rogue Genin package is semantically reusable for Iwabee's historical Rogue participant.

Do **not** duplicate, rename or fork these actions.

### `enemy_rogue_genin_kunai_rush`

**Kunai Rush**

- Bukijutsu direct Attack PL **9**
- one mechanical packet
- ordinary Stamina mitigation
- no automatic Bleed/Stun/displacement
- no hidden Speed/accuracy/evasion

### `enemy_rogue_genin_shuriken_spread`

**Shuriken Spread**

- Bukijutsu direct Attack PL **7**
- one mechanical packet
- ordinary Stamina mitigation
- visible projectile count does not create extra packets
- no hidden hit/miss roll

### `enemy_rogue_genin_substitution_feint`

**Substitution Feint**

- Ninjutsu defensive setup
- once per Battle
- creates `rogue_genin_substitution_feint_ready`
- next qualifying single-target direct mitigable Attack-PL packet before the Rogue's next action is reduced by **40% pre-Stamina**
- then consumed
- otherwise expires when the Rogue's next action opportunity begins
- no damage
- no counterattack
- no automatic miss
- no free reposition
- no belief state
- no hidden Speed/Defense/evasion

---

# 6. Iwabee occurrence-local AI legality

No new Iwabee-specific action weights or hidden scheduler modifiers are authorised.

Consume the reusable Rogue package's existing scheduler discipline unchanged:

1. determine eligible authored actions first;
2. randomness only among eligible authored actions;
3. no invented Basic Attack or fallback;
4. Kunai Rush and Shuriken Spread may repeat;
5. Substitution Feint is eligible only while unspent and no ready state already exists;
6. once selected, Substitution Feint is spent for this Battle.

Do not introduce:

- Iwabee-specific attack throttling;
- forced repeated Feints;
- health-sensitive mercy logic;
- hidden Rank scaling;
- reduced Rogue aggression;
- escape-block-derived Battle weighting.

Those would be new encounter tuning, not package reuse.

---

# 7. One-on-one action economy / terminal envelope

Consume the current evolved 1v1 PL Battle action economy unchanged.

No occurrence-local free actions or bonus turns are authorised.

WITHDRAW remains unavailable as a terminal player choice when there is no legal allied successor slot under the shared meaning of WITHDRAW.

Terminal factual result set:

`victory | defeat`

### Rogue reaches 0 first

- factual player Battle victory;
- Rogue Battle withdrawal;
- not death;
- not injury;
- not capture/custody;
- not surrender;
- not IWA-02 by implication.

### Iwabee reaches 0 first

- factual Battle defeat;
- Iwabee Battle withdrawal;
- not injury/death;
- Rogue post-Battle escape/custody/surrender remains World-owned.

Return seam remains:

caller after `iwa_confront_05`

return to `iwa_confront_return_01`

then Story continues to the authored evaluation lineage.

Battle result != World disposition.

---

# 8. Reward boundary

No reward is authorised.

Exact Battle reward entitlement remains zero-value:

- Ryō: **0**
- visible EXP: **0**
- Items: **none**
- drops: **none**
- hidden Origin development payout: **none**

IWA-02 remains separate historical/progression evidence and is not a Battle reward.

---

# 9. Escape-block branch — NO Combat modifier

Combat confirms the existing CE / PL default:

> **NO hidden Battle modifier.**

The environmental Earth-Release block means the authored escape route was physically constrained.

It does not automatically grant:

- PL damage;
- reduced Rogue starting PL;
- Attack PL bonus;
- first action;
- Stun;
- restraint;
- capture;
- action denial;
- guard penalty;
- accuracy/evasion modifier.

If World later routes the escape-block branch into PL Battle, it must consume the same `rogue_genin` PL23 package at ordinary entry state unless a new exact contextual state is separately reconciled and authored.

Combat authors no such state here.

IWA-02 remains qualified only by the exact environmental fact:

`earthReleaseUsedToConstrainRogueGenin = true`

Battle victory != IWA-02.

---

# 10. Fresh-Iwabee viability proof — RED

The current exact package is **not winnable by fresh Academy Iwabee using the guaranteed authored Origin Battle loadout under current mechanics**.

This is not a judgement based on PL numbers alone. It follows from exact current damage and action semantics.

## 10.1 Iwabee damage into Rogue Stamina 24

Locked Stamina mitigation:

`max(1, floor(resolvedAttackPL * 100 / (100 + Effective Stamina)))`

### Iron Staff Smash

Attack PL6 against Stamina24:

`floor(600 / 124) = 4`

Final damage:

**4**

This is Iwabee's best guaranteed direct damage packet in the prepared palette.

Rogue Remaining Battle PL starts at 23.

Minimum required unmitigated Staff Smashes:

`ceil(23 / 4) = 6`

### Staff Sweep

Attack PL4 against Stamina24:

`floor(400 / 124) = 3`

Final damage:

**3**

It is strictly slower in this 1v1.

## 10.2 Current Iwabee non-damage Skills do not create a winning acceleration

### Earth Style: Rising Wall

Current live semantics:

- 35% one-use pre-Stamina ratio guard;
- consumes Iwabee's normal action opportunity to prepare;
- deals no damage.

It can reduce one incoming packet but cannot accelerate the six required damaging actions.

### Stone Snare

Current live definition is:

`makeFactoryDynamicControlSkill("academy_iwabee_stone_snare","academy_iwabee","Ninjutsu",{semanticClass:"stone_snare"})`

The shared `resolveFactoryDynamicControl` establishes an actual Battle condition **only when `dynamicControl.conditionKey` is authored**.

Iwabee's current Stone Snare has no:

- `conditionKey`;
- `conditionType`;
- blocked action traits;
- duration.

Therefore current runtime resolves/logs the live Ninjutsu control strength but creates **no condition and no action denial**.

It cannot be counted as a hidden skip-turn mechanic for viability.

### Grounded Stance

Current live semantics are categorical displacement resistance only.

It creates no damage packet and no generic enemy action denial.

## 10.3 Rogue damage into Iwabee Stamina 14

### Kunai Rush

Attack PL9:

`floor(900 / 114) = 7`

Final damage:

**7**

### Shuriken Spread

Attack PL7:

`floor(700 / 114) = 6`

Final damage:

**6**

Iwabee starts at PL13.

Two damaging Rogue packets therefore produce:

- Shuriken + Shuriken = **12**, leaving 1;
- Kunai + Shuriken = **13**, withdrawal;
- Kunai + Kunai = **14**, withdrawal.

A third unguarded damaging packet is always terminal.

## 10.4 Best-case action lower bound still fails

Grant Iwabee the most favourable ordinary opening assumption: he receives the first player action.

To reach six direct damaging actions, the Rogue receives at least **five** action opportunities before Iwabee's sixth attack can resolve.

Substitution Feint is non-damaging but can occur at most once per Battle.

Therefore even under a maximally favourable Rogue sequence, at least **four** of those five Rogue opportunities are damaging attacks.

The minimum authored damaging Rogue packet is Shuriken Spread at **6 final damage** before any Iwabee guard.

Without guard:

`4 × 6 = 24 > Iwabee PL13`

Could Rising Wall make this possible?

No.

Each Rising Wall:

- consumes an additional Iwabee action;
- therefore introduces another Rogue action opportunity before the six required damage actions are completed;
- can protect only one incoming packet.

Against the lowest Rogue attack, ATK7:

- 35% guard -> `round(7 × 0.65) = 5` resolved Attack PL;
- Stamina14 -> `floor(500 / 114) = 4` final damage.

So each inserted Wall can at best reduce one minimum incoming packet from 6 to 4, saving 2, while the additional player action needed to create that Wall also permits another Rogue action opportunity. After the single Feint is spent, that added Rogue opportunity is another authored damage action.

A guard-heavy line therefore cannot bridge the action deficit.

Substitution Feint can additionally reduce one Iwabee qualifying direct packet, making the player damage race worse rather than better.

## 10.5 Conclusion

Under the guaranteed current Origin loadout:

> **No legitimate player action sequence reaches Rogue PL0 before Academy Iwabee is forced to withdraw.**

This remains true without assuming hostile RNG.

The contradiction is structural:

- Iwabee needs too many damaging action opportunities;
- Rogue pressure is too high;
- Iwabee's current control Skill does not establish executable action denial;
- his guard spends the same action economy needed to close the damage gap.

External inventory, future development, later Skills or unrelated Summons cannot be used as the guaranteed fresh-Origin viability basis.

---

# 11. What Combat explicitly refuses to fabricate

Combat does not resolve the contradiction by introducing:

- `rogue_genin_easy`;
- a weaker Iwabee-only Rogue template;
- hidden Rogue pre-damage;
- hidden Starting-PL suppression;
- direct/hidden Iwabee PL bonus;
- Origin-only damage multiplier;
- fake Stone Snare Stun;
- forced repeated Substitution Feints;
- concealed AI mercy;
- escape-block Battle advantage;
- Story-only Stats;
- future/developed Iwabee techniques;
- assumed Item/Summon access.

Any real fix must be explicitly owned and durable.

---

# 12. Required reconciliation before Coding release

The semantic consumer is closed, but Coding must **not** implement the direct confrontation as a supposedly fair/winnable current Origin Battle until the viability contradiction is reconciled.

This is now a CE / Codex / Coordination collision because current durable authorities jointly imply:

- Story offers a genuine direct confrontation Battle;
- Registry requires the reusable PL23 Rogue unchanged;
- Combat requires reuse of its established ATK9 / ATK7 / once-Feint package;
- CE forbids a hidden occurrence modifier;
- fresh Iwabee's current executable palette cannot win.

CE must reconcile which authority changes, if any.

Examples of legitimate owner-routed solution families include, without preselecting one:

- explicitly author a visible occurrence context that lawfully changes Battle state;
- reopen/recalibrate an Iwabee Combat capability through its owning authority;
- change participant/action structure through explicit Story/CE authority;
- intentionally author the branch as a knowingly unwinnable factual confrontation and make that intent explicit across Story/World/runtime.

What is **not** legitimate is silently changing runtime values.

World post-confrontation disposition remains downstream after this collision is resolved.

---

# 13. Current implementation archaeology

Current `runtime/alpha-origin-scenes-32900-b.js` correctly fail-closes:

- `CONFRONT HIM` because its exact Battle caller is not installed;
- `BLOCK HIS ESCAPE WITH EARTH RELEASE` because World response is unresolved.

Current `game.js` contains Academy Iwabee's exact prepared palette and current semantics described above.

The reusable Wasabi Rogue action package is durably Combat-closed, but the searched current `game.js` does not yet expose the three `enemy_rogue_genin_*` action IDs. That remains implementation work after the design collision is resolved; it does not alter the numerical contradiction.

---

# 14. Final lock

> **Iwabee's historical participant `iwabee_origin_rogue_genin_01` should consume the existing `rogue_genin` PL23 template and the already-closed Kunai Rush ATK9 / Shuriken Spread ATK7 / once-per-Battle 40% Substitution Feint package unchanged. No Iwabee-specific scheduler weighting or escape-block Battle modifier is authorised. However, fresh Academy Iwabee PL13 cannot legitimately win the resulting strict 1v1 under his current guaranteed executable palette: Iron Staff Smash deals only 4 into Rogue Stamina24 and requires six damaging actions, while the Rogue can supply at least four damaging actions before that point even under the most favourable Feint schedule. Current Stone Snare creates no Battle condition because no conditionKey is authored, and Rising Wall cannot overcome the action-economy deficit. Combat therefore closes package reuse but returns the direct confrontation as a confirmed viability contradiction rather than fabricating hidden scaling. CE reconciliation is required before Coding release.**

## Status distinction

- reusable Rogue package semantics: **CLOSED**
- Iwabee consumer identity/config semantics: **CLOSED**
- direct-confrontation viability: **RED / CONTRADICTION**
- Coding implementation release: **BLOCKED**
- runtime validation: **NOT PROVEN**
- Golden/regression: **NOT PROVEN**
