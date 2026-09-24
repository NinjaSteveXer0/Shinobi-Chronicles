# Academy Menma Origin — Altered Shinobi Tutorial Victory Reward Lock

**Date:** 2026-09-25  
**Owner:** World / Missions / Events / Rewards  
**Status:** **WORLD CLOSED — IMPLEMENTATION REQUIRED**

## 1. Scope

This contract closes the remaining World/Rewards authority requested by GitHub issue #224 from #166.

It applies only to the Academy Menma Origin tutorial PL Battle against the exact current Altered Shinobi / Test Subject opponent identity:

`test_subject_altered_shinobi`

It does not rewrite Menma Story, Combat action legality, Registry/PL, asset authority, Kurama/Echo semantics, or Origin completion.

## 2. Reward class

The tutorial victory reward is **Battle-result-owned and immediate**.

A committed Academy Menma victory over the exact Altered Shinobi tutorial Battle creates the reward entitlement before Story resumes.

Stable World reward source:

`menma_origin_battle_altered_shinobi_victory_ryo_01`

The reward receipt must also preserve the exact committed Battle occurrence/caller provenance so retry/save/load cannot duplicate it.

## 3. Fixed material reward

Exact fixed victory reward:

**50 Ryō**

No fixed Item, Weapon, equipment, material, common drop, or rare drop is granted by this Battle.

Reasoning/calibration:

- this is a genuine early-Origin one-opponent Battle;
- Stephen explicitly requires the new-player tutorial victory to produce a meaningful reward;
- 50 Ryō matches the currently approved early-Origin one-opponent cash scale without inventing a richer loot package for a tutorial opponent.

## 4. Generic Character EXP

**Generic Character EXP: none / 0 from this fixed reward source.**

Do not invent a generic quest/Battle Character-EXP payout merely to populate the Victory screen.

## 5. Action-derived development remains separate

Menma may separately earn persistent action-derived technical-discipline development and/or Stamina development from exact committed Battle actions where current Progression/Combat authority supports those signals.

Preserve the global law:

- fixed Battle reward != action-derived development;
- victory does not multiply action-derived EXP;
- failed/effective/exceptional action values come from the existing development contract;
- Battle loss does not erase development already legitimately committed before the loss.

No fixed discipline EXP amount is authored by this World contract.

## 6. Victory / loss / withdrawal

### Victory

Battle victory is sufficient for the **50 Ryō** entitlement.

It does not require Origin completion, a later debrief, or a second Story predicate.

Story return/continuation remains a separate caller-continuity operation after the reward claim.

### Loss / withdrawal

If Menma does not win the exact tutorial Battle:

- no 50-Ryō victory entitlement;
- no fixed material consolation payout from this source;
- already-earned legitimate action-derived development remains intact;
- Story/World loss handling consumes the actual Battle result under existing authority.

## 7. Idempotence

The fixed reward is one-shot per exact committed tutorial Battle occurrence.

Runtime must dedupe using stable reward-source + exact Battle/source occurrence provenance.

The following must not pay twice:

- save/load;
- browser refresh;
- reopening Victory presentation;
- retrying reward claim;
- Story return;
- presentation rerender.

A genuinely new authorised Origin occurrence may create its own new exact Battle occurrence and reward receipt under normal replay/new-game authority.

## 8. Player-facing disclosure

The Victory/result surface must show or be able to explain:

- **Ryō +50** — fixed Altered Shinobi tutorial victory reward;
- Items/materials: **none**;
- generic Character EXP: **none**;
- exact action-derived discipline/Stamina development earned in this Battle, if any, with causal attribution;
- any deferred Origin/Story reward separately, not as though granted by this Battle.

Do not hide the 50 Ryō until Origin completion.

## 9. No-loot boundary

The Altered Shinobi's equipment, possessions, visual gear, altered condition, experimental materials, or body are **not automatic loot**.

Nothing on the enemy card/portrait implies Inventory ownership or drop entitlement.

No Item/material may be added without separate World/Acquisition authority.

## 10. Non-collapse

Preserve:

- Battle victory != Origin completion;
- reward entitlement != reward presentation;
- fixed Battle cash != action-derived development;
- opponent equipment != loot;
- no reward != punishment;
- 50 Ryō != PL/Stat/Rank gain;
- Battle reward != Kurama access;
- Battle reward != Skill ownership;
- Battle reward != Character acquisition.

## Final lock

> **Academy Menma's exact Altered Shinobi tutorial victory pays 50 Ryō immediately and once. It has no fixed Item/loot and no generic Character EXP. Legitimate action-derived development remains separately earned and must be causally disclosed.**
