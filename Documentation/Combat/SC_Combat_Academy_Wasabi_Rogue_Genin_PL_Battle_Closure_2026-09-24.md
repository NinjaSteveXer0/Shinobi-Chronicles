# Shinobi Chronicles — Academy Wasabi Izuno Rogue Genin PL Battle Closure

**Date:** 2026-09-24  
**Owner:** Combat / Skills / Items / Weapons / Equipment / Summons  
**Status:** **DESIGN CLOSED — EXECUTABLE COMBAT CONTRACT FOR #342**  
**Combat master:** #235  
**Incoming handoff:** #342  
**Source baseline inspected:** `8630dda2523ddf6994dbedf114c11fcc4447b81f`

## 1. Scope

This closure authorises the smallest executable PL Battle package required by Academy Wasabi Izuno's WRITING GOLDEN **STEP IN** branch.

It does not rewrite Story, World truth, Registry/PL, rewards progression, morality, acquisition, or collectible identity.

Consumed authority:

- `Documentation/Story/Academy_Wasabi_Izuno_Origin_WRITING_GOLDEN_2026-09-24.md`;
- `Documentation/Coordination/Academy_Wasabi_WRITING_GOLDEN_Rogue_Genin_Battle_and_World_Classification_Reconciliation_2026-09-24.md`;
- `Documentation/Registry/Awaiting Placement Character and Enemy Calibration Wave.md`;
- current shared Battle / Story return architecture in `game.js`;
- current compressed Wasabi runtime in `runtime/alpha-origin-scenes-32900-a.js` as implementation archaeology only.

Writing remains GOLDEN and is not reopened.

---

## 2. Exact identities

### Story / World source occurrence

`occ_origin_izuno_rogue_genin_interruption_resolution`

### Historical Rogue Genin participant

`wasabi_origin_rogue_genin_01`

### Affected Academy student

`wasabi_origin_interference_student`

### Combat opposition template

`rogue_genin`

### Player combatant

`academy_izuno`

### Battle config / caller ID

`academy_izuno_origin_rogue_genin_step_in_battle`

### Encounter ID

`origin_academy_izuno_rogue_genin_step_in`

The historical participant and Combat template are two address layers for the **same opponent occurrence**:

```text
Battle participant id:
wasabi_origin_rogue_genin_01

oppositionTemplateId:
rogue_genin
```

Do not create:

- a collectible Character;
- a collectible Entity;
- a second persistent Rogue Genin identity;
- a replacement World occurrence.

---

## 3. Exact 1v1 deployment

This Battle is:

```text
PLAYER SLOT 1
academy_izuno

ENEMY SLOT 1
wasabi_origin_rogue_genin_01
  consumes oppositionTemplateId: rogue_genin

ALL OTHER PLAYER / ENEMY SLOTS
empty
```

The Story caller must supply this exact deployment.

The current persistent Clan queue must **not** silently add teammates to this Origin occurrence.

Implementation may reuse the shared Battle engine, but must initialise the exact supplied 1v1 participant envelope before Remaining Battle PL / contribution / action runtime is committed.

This is an occurrence-specific deployment snapshot, not a mutation of My Clan formation.

---

## 4. Rogue Genin PL / Stats

Registry/PL authority is already closed and is consumed unchanged.

Canonical Stat order:

`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Stats:

`23 / 22 / 21 / 10 / 14 / 15 / 24`

Base PL:

**23**

Battle entry rules:

- Rogue Genin underlying Battle PL starts at **23**;
- no encounter multiplier;
- no random Battle-entry variation;
- Stamina **24** mitigates incoming Attack-PL packets under the current shared Stamina formula;
- Base PL is not mutated by this Origin;
- no hidden Speed, Defense, accuracy, evasion or difficulty scalar.

Wasabi uses her current legal `academy_izuno` Character / Effective / Battle state under shared rules. Combat does not fabricate a Story-only PL bonus for her.

---

## 5. Exact Rogue Genin action package

The authorised action palette contains exactly three actions.

### 5.1 `enemy_rogue_genin_kunai_rush` — Kunai Rush

Class:

**ATTACK / BUKIJUTSU**

Target:

current legal player target — in this exact Battle, `academy_izuno`.

Authored Attack PL:

**9**

Resolution:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- `mechanicalPacketCount = 1`;
- rush/flurry presentation does not create additional packets;
- no automatic Bleed;
- no automatic Stun;
- no automatic displacement;
- no hidden Speed / initiative modifier.

The numeric value is consistent with the existing grounded rogue-scout Bukijutsu direct baseline and the Rogue Genin's closed Bukijutsu identity without deriving damage from Rank or PL at runtime.

### 5.2 `enemy_rogue_genin_shuriken_spread` — Shuriken Spread

Class:

**ATTACK / BUKIJUTSU**

Target:

current legal player target.

Authored Attack PL:

**7**

Resolution:

- one direct Attack-PL packet;
- ordinary Stamina mitigation;
- `mechanicalPacketCount = 1`;
- visible shuriken count is presentation only;
- no random per-projectile rolls;
- no hidden accuracy / miss check;
- no automatic Bleed, Stun or pin.

### 5.3 `enemy_rogue_genin_substitution_feint` — Substitution Feint

Class:

**NINJUTSU / DEFENSIVE SETUP**

Limit:

**once per Battle**

Target:

self.

State:

`rogue_genin_substitution_feint_ready`

Effect:

- creates one explicit one-use defensive state;
- the next qualifying **single-target direct mitigable Attack-PL packet** against this Rogue Genin is reduced by **40% before Stamina**;
- after that packet resolves, the state is consumed;
- if no qualifying packet consumes it before the Rogue Genin's next action opportunity begins, the state expires;
- choosing the action marks Substitution Feint spent for this Battle, whether the state is later consumed or expires;
- no damage packet;
- no counterattack;
- no automatic attacker miss;
- no automatic belief / deception success;
- no forced target change;
- no free reposition;
- no hidden Speed, Defense, accuracy or evasion Stat.

Player-observable meaning:

> **The Rogue Genin prepares a substitution feint. His next direct hit taken before his next turn is reduced by 40%.**

This is explicit mitigation, not a disguised random miss mechanic.

---

## 6. Enemy AI / action-selection legality

Use the current shared enemy scheduler discipline:

1. determine semantically eligible authored actions first;
2. apply randomness only among eligible actions;
3. no invented fallback action.

Exact eligibility:

### Kunai Rush

Eligible when:

- Battle active;
- Rogue Genin active in Enemy Slot 1;
- Wasabi active in Player Slot 1;
- no exact shared condition independently forbids that action.

### Shuriken Spread

Same eligibility as Kunai Rush.

### Substitution Feint

Eligible only when:

- Battle active;
- Rogue Genin active;
- not already spent this Battle;
- `rogue_genin_substitution_feint_ready` is not already active.

Once selected, it is spent and cannot be selected again in the same Battle.

### Selection

Among currently eligible actions:

- shared equal-weight random selection after eligibility is acceptable;
- no hidden weighting from PL, Rank, health percentage, Speed, accuracy, morality, pursuit state or staged/external provenance;
- repeat Kunai Rush / Shuriken Spread selections are legal;
- Substitution Feint remains bounded once-per-Battle.

If no exact action is eligible, fail visibly under the shared scheduler. Do not invent a Basic Attack.

---

## 7. Battle outcome semantics

### Victory

Battle victory occurs when:

- `wasabi_origin_rogue_genin_01` reaches **0 Remaining Battle PL**;
- no enemy participant remains.

Result:

`victory`

Meaning:

- the Rogue Genin is Battle-depleted / forced out of effective combat for this occurrence;
- **not death**;
- **not injury**;
- **not custody**;
- **not moral judgment**;
- **not proof the event was staged or external**.

### Defeat

Battle defeat occurs when:

- `academy_izuno` reaches **0 Remaining Battle PL**;
- no player participant remains.

Result:

`defeat`

Meaning:

- Wasabi is Battle-depleted / cannot continue this fight;
- **not injury by itself**;
- **not death**;
- **not morality**;
- does not erase the fact that she chose to intervene.

### Withdraw

There is **no terminal Withdraw result** in this exact 1v1 package.

Current shared WITHDRAW means rotating the active fighter out to a legal successor.

This Battle has no Player Slot 2 successor.

Therefore:

- `canWithdrawActiveBattleFighter()` is false;
- WITHDRAW must be unavailable/disabled;
- a programmatic withdrawal attempt must fail without mutating the Battle outcome or Story history;
- no bespoke flee/escape outcome is invented;
- the Rogue Genin has no authored enemy break-contact / flee action in this package.

Thus the executable terminal result set is exactly:

`victory | defeat`

---

## 8. Rewards boundary

No standalone Rogue Genin reward has been authored by the incoming authority.

Combat therefore closes this Origin Battle with an explicit **zero-value Battle reward entitlement**:

- Ryō: **0**
- visible EXP: **0**
- items: **none**
- rare drops: **none**

This does not suppress any separately authorised Origin-completion reward.

The shared global law remains:

`CLAIM != CONTINUE`

If the shared Victory screen requires reward entitlement before caller return, the zero-value entitlement is still generated/claimed through the ordinary lifecycle. Combat does not create a hidden reward to make the screen interesting.

Defeat grants no Battle reward.

---

## 9. Exact Battle occurrence receipt for IZU-04

The STEP IN Battle must own one exact Battle occurrence receipt distinct from the World source occurrence.

### ID derivation

For one active Wasabi Story scene instance:

```text
battleOccurrenceId =
  "battle_occ_origin_izuno_rogue_genin_step_in:" + sceneInstanceId
```

This gives:

- one stable Battle receipt across save/load;
- no duplicate receipt on presentation rerender;
- no duplicate receipt on caller resume;
- a distinct receipt for a genuine later Origin replay with a different scene instance.

### Required Battle-start evidence

At successful Battle launch, record one committed Battle evidence entry containing:

- `battleOccurrenceId`;
- `sourceOccurrenceId = occ_origin_izuno_rogue_genin_interruption_resolution`;
- `historicalParticipantRef = wasabi_origin_rogue_genin_01`;
- `affectedParticipantRef = wasabi_origin_interference_student`;
- `oppositionTemplateId = rogue_genin`;
- `battleConfigId = academy_izuno_origin_rogue_genin_step_in_battle`;
- `encounterId = origin_academy_izuno_rogue_genin_step_in`.

The Battle receipt supports IZU-04.

It does **not replace** IZU-04's World source occurrence.

---

## 10. Observer-safe Story return envelope

Use the current shared Story `battle_transition` / `story_scene` return architecture.

Registered Battle beat must route both terminal outcomes to one authored post-Battle continuation beat.

Exact recommended beat IDs for Coding:

- Battle transition beat: `izu_rogue_step_in_battle`
- Post-Battle beat: `izu_rogue_step_in_return`

Both victory and defeat use:

`postBattleBeatId = izu_rogue_step_in_return`

The Story-safe authored Battle projection must expose only:

```text
battleOccurrenceId
sourceOccurrenceId
historicalParticipantRef
oppositionTemplateId
battleResult
rogueGeninBattlePLDepleted
wasabiBattlePLDepleted
```

Exact values:

### Victory

```text
battleResult = "victory"
rogueGeninBattlePLDepleted = true
wasabiBattlePLDepleted = false
```

### Defeat

```text
battleResult = "defeat"
rogueGeninBattlePLDepleted = false
wasabiBattlePLDepleted = true
```

Do not expose:

- hidden AI rolls;
- unobserved World provenance;
- morality;
- staged/external classification;
- hidden Knowledge;
- fabricated injury/custody facts.

---

## 11. IZU-04 Story-consumption contract

After either terminal Battle result returns successfully to Story:

- `rogueGeninResponse = "intervene"`;
- `rogueGeninInterruptionResolvedByWasabiAction = true`;
- `battleOccurrenceIds = [battleOccurrenceId]`;
- preserve the exact participant refs already owned by IZU-04.

Here, **resolved** means the player's chosen intervention has reached its factual Battle resolution.

It does **not** mean:

- Wasabi necessarily won;
- the Rogue Genin died;
- the Rogue Genin was captured;
- the affected student suffered or avoided an injury;
- the pursuit succeeded or failed.

The Battle result remains an independent fact.

### Critical separation

```text
Battle victory != pursuit victory
Battle defeat != pursuit failure automatically
Battle result != morality
Battle result != staged/external provenance
```

Combat must not write `pursuitOutcome`.

The authored Wasabi Story continuation owns whether time spent on the interruption changes the pursuit endpoint.

---

## 12. Save/load and idempotence

Coding must preserve:

- Story scene instance ID;
- exact Battle return context;
- exact `battleOccurrenceId`;
- World participant ref;
- Battle config / encounter IDs;
- Battle Remaining PL;
- Substitution Feint spent/active state;
- post-Battle observer-safe result.

Required guards:

- STEP IN cannot launch a second Battle while `active.pendingBattle` already points to this Battle;
- restoring during Battle resumes the same Battle, not a new Rogue Genin;
- restoring after terminal Battle but before Story continuation does not duplicate the Battle occurrence receipt;
- IZU-04's existing consequence consumer remains idempotent;
- `battleOccurrenceIds` contains the exact receipt once.

---

## 13. No-authority boundaries

This closure does not author or infer:

- staged vs external Rogue Genin provenance;
- alignment;
- virtue;
- personality score;
- Protector/Escort specialisation;
- Speed / Agility;
- hidden Defense;
- hit chance / miss chance;
- hidden evasion;
- fear/belief state from Substitution Feint;
- death;
- injury;
- custody;
- acquisition;
- collectible ownership;
- reward beyond explicit zero-value Battle entitlement.

---

## 14. Implementation status

At closure time:

- Story design: **CLOSED**
- Writing: **GOLDEN**
- World occurrence/ref identity: **CLOSED**
- Rogue Genin Stats / Base PL: **CLOSED — PL23**
- Rogue Genin Combat action semantics/numerics: **CLOSED HERE**
- Wasabi STEP IN Battle caller/config: **CLOSED HERE**
- Coding implementation: **NOT YET IMPLEMENTED**
- runtime validated: **NO**
- installed-browser validated: **NO**
- Browser Golden: **NO**

Current `runtime/alpha-origin-scenes-32900-a.js` still contains the old compressed Wasabi expression and fail-closed STEP IN choice.

Coding must REPLACE that compressed production expression with the exact WRITING GOLDEN content and bind this closed Battle contract.

---

## 15. Final lock

> **Academy Wasabi's STEP IN route launches one strict 1v1 PL Battle: `academy_izuno` vs historical participant `wasabi_origin_rogue_genin_01`, consuming the `rogue_genin` PL23 opposition template. Kunai Rush is ATK9 / one Bukijutsu packet. Shuriken Spread is ATK7 / one Bukijutsu packet despite multiple visible projectiles. Substitution Feint is a once-per-Battle explicit 40% pre-Stamina guard against the next qualifying direct packet before the Rogue Genin's next action, with no automatic miss or belief effect. Shared AI chooses only among semantically eligible authored actions. Terminal results are victory or defeat; WITHDRAW is unavailable because the 1v1 has no player successor. One deterministic Battle receipt supports IZU-04 and returns factual Battle outcome to Story without deciding pursuit result, morality, injury, custody, or staged-vs-external World provenance.**

**DESIGN CLOSED != IMPLEMENTED != RUNTIME VALIDATED != BROWSER GOLDEN.**
