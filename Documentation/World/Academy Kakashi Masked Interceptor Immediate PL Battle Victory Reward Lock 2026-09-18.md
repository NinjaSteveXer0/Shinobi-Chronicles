# Shinobi Chronicles — Academy Kakashi Masked Interceptor Immediate PL Battle Victory Reward Lock

**Date:** 2026-09-18  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING REWARD-TIMING CORRECTION — IMMEDIATE BATTLE ENTITLEMENT; CODING / RUNTIME IMPLEMENTATION AND BROWSER GOLDEN SEPARATE**

## 1. Purpose / precedence

Stephen has corrected the Academy Kakashi Origin reward timing for the solo Kakashi-vs-Masked-Interceptor PL Battle.

Binding rule:

> **A Kakashi victory over Masked Interceptor generates its own immediate Battle reward entitlement on the Victory result screen. The player claims that Battle reward before returning to Story. Terminal ANBU-debrief / Origin rewards are a separate reward class and must not swallow or defer the fight reward.**

This addendum supersedes only conflicting timing/projection language in:

- `Documentation/World/Academy Kakashi Origin Choice Battle Reward and Development Audit v1 2026-09-15.md`;
- the prior runtime projection that showed `RYŌ — DEBRIEF` / `ORIGIN REWARDS — Evaluated at terminal debrief` as though the MI fight itself had no immediate material reward.

It does **not** reopen Kakashi Story, Battle resolution, Progression action-development values, terminal debrief reward predicates, or Inventory semantics.

Preserve:

- Battle reward != Origin/debrief reward;
- Battle victory != mission success;
- Battle reward claim != Story continuation;
- action-derived development != generic quest XP;
- reward entitlement != ownership until the transaction commits;
- same Battle occurrence != repeated reward on reload;
- kill != extra money;
- opponent equipment != loot.

## 2. Exact qualifying Battle

The immediate package applies when all of the following are true:

1. Story unit = `academy_kakashi`;
2. a committed PL Battle occurrence has Kakashi as the player-side combatant;
3. Masked Interceptor is the opposing combatant;
4. the Battle is the **solo Kakashi vs Masked Interceptor** fight — no additional hostile participant is part of that Battle occurrence;
5. the authoritative Battle result is `VICTORY` for Kakashi.

This includes any current Kakashi Origin branch that reaches that exact solo MI Battle state. It does not apply merely because Masked Interceptor was present in a multi-target Battle.

Stable parent entitlement family:

`kak_origin_battle_mi_victory_reward_v1`

Recommended deterministic entitlement identity:

`kak_origin_battle_mi_victory_reward_v1::<sealedOriginOccurrenceId>::<battleOccurrenceId>`

The entitlement is generated from the committed Battle result, never from the button label, result-screen render, opponent portrait, or inferred branch name.

## 3. Exact immediate reward package

On a qualifying Kakashi victory, the Victory result screen must expose:

### Material Battle reward

- **50 Ryō**
- **Field Recovery Pill ×1** — catalogue ID `field_recovery_pill`

Stable component sources:

- `kak_origin_battle_mi_victory_ryo_01` -> **50 Ryō**
- existing item source `kak_origin_item_field_recovery_resupply` -> **`field_recovery_pill` ×1**, but for this exact MI-victory occurrence its entitlement timing is now **immediate at Battle victory**, not deferred to terminal debrief.

### Battle development summary

The same result screen also projects the exact already-earned action-derived development from that Battle:

- Ninjutsu / Taijutsu / Genjutsu / Bukijutsu / Fūinjutsu / Kinjutsu Discipline Development EXP actually earned from committed tagged actions;
- Stamina Discipline Development EXP actually earned from qualifying mitigation evidence.

This development remains governed by the binding Progression contract:

- committed failed execution: +1 per exact authored discipline tag;
- effective execution: +2;
- explicitly exceptional execution: +3;
- maximum 6 EXP per technical discipline per causal Battle;
- maximum 2 Stamina EXP per causal Battle.

The development receipts are **not** delayed until the material-reward claim and are not granted a second time by the claim button. The result screen is a projection of development already earned from factual Battle actions.

### Explicitly absent from this immediate package

The MI Victory Battle reward grants **no**:

- Academy Training Tantō;
- White Fang Tantō;
- opponent weapon/equipment loot;
- generic Character/quest EXP;
- direct PL;
- direct Base Stat;
- Rank/Promotion;
- kill bounty;
- bonus Ryō for killing/spare disposition after the Battle;
- generic Assassination/Kinjutsu credit by virtue of winning.

The Academy Training Tantō remains a separately evaluated exceptional **Origin/debrief-class** reward under existing authority.

## 4. Entitlement creation and Victory-screen state

Required order:

`Battle victory commits`
-> `kak_origin_battle_mi_victory_reward_v1 entitlement commits`
-> Victory result screen renders the exact package
-> player claims the material Battle reward
-> claim receipt commits
-> Story return becomes available.

The Victory result must therefore no longer present this fight as a zero-material-reward result or say that its Ryō/item reward is deferred to debrief.

Minimum result projection:

**BATTLE REWARD**
- **50 RYŌ**
- **FIELD RECOVERY PILL ×1**

**BATTLE DEVELOPMENT**
- exact discipline/Stamina development earned in this Battle, including zero-value omission where a discipline earned nothing.

Primary action before claim:

**CLAIM BATTLE REWARD**

After successful claim:

**REWARD CLAIMED**

and the continuation action becomes:

**RETURN TO STORY**

Equivalent coded presentation is acceptable only if the semantic two-stage boundary remains unmistakable: material Battle reward is claimed on the Victory surface before Story continuation.

## 5. Claim transaction rules

Stable claim family:

`kak_origin_battle_mi_victory_reward_claim_v1`

Recommended deterministic claim key:

`kak_origin_battle_mi_victory_reward_claim_v1::<battleOccurrenceId>`

The claim transaction must:

1. validate the committed qualifying Battle-victory entitlement;
2. validate recipient/player ownership context;
3. commit **+50 Ryō** exactly once;
4. commit **`field_recovery_pill` ×1** to persistent Inventory exactly once using existing Kakashi Origin reward Acquisition semantics;
5. retain component provenance and the parent Battle reward receipt;
6. not auto-use or auto-prepare the pill into the completed Battle's Battle Pouch;
7. not mutate PL, Stats, Rank, Skill access, equipment state or Story outcome;
8. unlock `RETURN TO STORY` only after the material claim is durably resolved.

The two material components form one player-facing Battle reward package. Runtime may use component receipts internally for crash recovery, but presentation must not allow one component to disappear while the package is falsely marked fully claimed.

## 6. Save/load, crash recovery and idempotence

Required behaviour:

- Victory committed but reward unclaimed -> reload/reopen returns to the same Victory reward state with the same entitlement;
- repeated screen rendering creates no new entitlement;
- claim succeeds -> reload shows the same reward as already claimed and allows Story return;
- repeated claim after the receipt exists -> **0 additional Ryō, 0 additional pills**;
- if one component was durably committed immediately before a crash, retry reconciles against component receipts and completes the same parent claim without duplicating the committed component;
- UI refresh, Back, browser reopen or save/load cannot reroll the package;
- a genuinely distinct later Chronicle/Legacy Battle occurrence may earn its own separately keyed reward if it independently satisfies the same qualifying Battle predicate.

Story return must not erase a pending legitimate entitlement. For this locked MI Victory flow, the normal UI should keep Story continuation unavailable until the material claim resolves.

## 7. Relationship to existing terminal ANBU-debrief / Origin rewards

The existing terminal reward class remains separate.

Current terminal/debrief Ryō authority remains:

- 100 Ryō — terminal factual debrief / equivalent report;
- +75 Ryō — package recovered;
- +25 Ryō — verified actionable intelligence;
- +25 Ryō — legitimate live custody, once;
- +25 Ryō — exceptional field execution, once;
- current **debrief-class maximum = 250 Ryō**.

The new **50 Ryō MI Battle reward is outside that 250-Ryō debrief cap**. It is not deducted from, substituted for or delayed into the terminal package.

Therefore a Chronicle may legitimately contain:

`immediate MI Battle reward`
+
`later terminal Origin/debrief reward`

when both independent predicates are satisfied.

### Field Recovery Pill anti-double-grant correction

For a sealed Origin in which the qualifying MI Victory entitlement has already committed the `kak_origin_item_field_recovery_resupply` pill immediately:

- terminal debrief must **not** issue a second pill from that same once-per-Origin resupply source;
- the existing Acquisition receipt/source dedupe remains authoritative.

If a Kakashi Origin contains PL Battle participation but **no qualifying solo MI victory**, the prior terminal-debrief resupply rule remains in force until separately superseded.

## 8. Loss / later Story outcome

If Kakashi loses the qualifying MI Battle:

- no `kak_origin_battle_mi_victory_reward_v1` material entitlement is created;
- no 50-Ryō Battle victory reward is granted;
- no immediate Victory pill is granted;
- legitimate action-derived discipline/Stamina development already earned before defeat remains committed under Progression authority;
- later Origin/debrief rewards still evaluate their own predicates independently.

If Kakashi wins MI, claims the immediate Battle package, and later fails the package objective or loses a later Battle:

- the already-earned MI Battle reward remains his;
- later failure does not claw back the 50 Ryō or pill;
- terminal/debrief rewards evaluate the later final facts separately.

## 9. Coding / Runtime implementation minimum — #188

Coding / Runtime should consume this lock inside the existing Kakashi Story/Battle result flow, not create another reward engine.

Minimum proof:

1. solo Kakashi-vs-MI victory commits one stable immediate entitlement;
2. Victory screen visibly shows **50 Ryō + Field Recovery Pill ×1**;
3. exact Battle development remains visible from the existing development receipts;
4. pre-claim primary action is `CLAIM BATTLE REWARD`;
5. Story return is unavailable until material claim resolves;
6. successful claim adds exactly 50 Ryō and one pill;
7. pill is persistent Inventory ownership, not auto-used/prepared;
8. claim then enables `RETURN TO STORY`;
9. reload before claim preserves the pending entitlement/result screen;
10. reload after claim does not duplicate either material component;
11. terminal debrief does not grant a second pill from `kak_origin_item_field_recovery_resupply` after this immediate claim;
12. terminal/debrief Ryō remains separately evaluated and unchanged;
13. MI loss generates no victory material package while preserving legitimately earned action development;
14. multi-target Battles containing MI do not satisfy this exact solo-Battle entitlement by implication;
15. browser Golden remains unclaimed until installed-browser proof confirms the package, claim, persistence and return-to-Story sequence.

## 10. Closure

World / Rewards correction is **DESIGN CLOSED**:

> **Kakashi vs Masked Interceptor solo PL Battle VICTORY -> immediate Battle reward entitlement -> claim 50 Ryō + Field Recovery Pill ×1 on Victory result -> then return to Story.**

Origin/debrief rewards remain a separate later reward class.

Design closed != implemented != runtime validated != installed-browser Golden GREEN.
