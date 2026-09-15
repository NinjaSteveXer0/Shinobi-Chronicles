# Shinobi Chronicles — Academy Kakashi Origin Runtime Battle Deployment and Result Contract

**Date:** 2026-09-15  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT DEPLOYMENT / ACTION PACKAGE / RESULT CONTRACT — CODING IMPLEMENTATION AND RUNTIME/GOLDEN VALIDATION SEPARATE**

## 1. Purpose

This document closes the Combat-owned fields requested by GitHub issue `#201` so the final Academy Kakashi Origin can launch its authored PL Battles through the existing Battle authority instead of receiving externally fabricated resolver results.

It consumes current durable authority, especially:

- final Kakashi Writing closure `176ce76feef3e67d4c24644e3d7443a04dcf7d6b`;
- final Kakashi decision/continuation and pickpocket-route authority;
- final Kakashi triple-stage timing authority;
- temporary Pakkun participation authority;
- Registry opposition calibration authority in `Documentation/Registry/Awaiting Placement Character and Enemy Calibration Wave.md`;
- Pakkun Combat closure `Documentation/Combat/SC_Combat_Pakkun_Summon_Action_Closure_2026-09-05.md`;
- live Kakashi representation authority in `Documentation/PL_Registry_Rank_Alpha_Authority.md`;
- current neutral Story adapter `runtime/alpha-kakashi-final-origin-adapter-34100-core.js`.

This contract closes Battle configuration, deployment, opponent actions/AI, launch/return semantics and the sequential timing metric. It does **not** modify Story outcomes, grant rewards, invent Inventory ownership, change Progression, or claim implementation/runtime/Golden proof.

Preserve:

- Story label != Combat configuration;
- roster participant != deployed participant;
- Battle victory != Story objective success;
- Battle defeat != death/capture automatically;
- package custody != participant custody;
- participant defeat != KO/death/custody;
- Pakkun temporary participation != Summon ownership/contract/access;
- opponent presentation tool != lootable Inventory instance;
- encounter composition != automatic PL scaling;
- design closed != implemented != runtime validated != Golden GREEN.

---

## 2. Stable Battle configuration IDs

The Academy Kakashi Origin Battle surface uses these stable Combat configuration IDs.

| Config ID | Player side | Opposition side | Purpose |
|---|---|---|---|
| `academy_kakashi_origin_battle_amt_1v1` | Kakashi | ANBU Marked Target | Exact 1v1 AMT confrontation where Story routes to a direct AMT Battle |
| `academy_kakashi_origin_battle_amt_ps_2v1` | Kakashi | ANBU Marked Target + Package Smuggler | Exact failed improved-position pickpocket / equivalent authorised 2v1 route |
| `academy_kakashi_origin_battle_amt_ps_mi_3v1` | Kakashi | ANBU Marked Target + Package Smuggler + Masked Interceptor | Exact failed direct pickpocket / equivalent authorised 3v1 route |
| `academy_kakashi_origin_battle_kakashi_pakkun_vs_amt` | Kakashi + temporary Pakkun action source | ANBU Marked Target | Exact AMT stage where current Story authority authorises Pakkun participation |
| `academy_kakashi_origin_battle_seq_mi` | Kakashi | Masked Interceptor | Sequential benchmark stage 1 |
| `academy_kakashi_origin_battle_seq_ps` | Kakashi | Package Smuggler | Sequential benchmark stage 2 |
| `academy_kakashi_origin_battle_seq_amt_pakkun` | Kakashi + temporary Pakkun action source | ANBU Marked Target | Sequential benchmark stage 3 after both prior timing gates are preserved |

No configuration may silently add another participant from roster, Story presence, card art, package custody or scene prose.

The ordinary no-auto-scaling rule applies. Enemy Base PL/Stats below are fixed source authority for these configurations. Kakashi is resolved from his exact current legitimate representation snapshot; his values are **not** scaled to encounter size or enemy PL.

---

## 3. Stable deployed participant references and source profiles

### 3.1 Kakashi

- deployed participant ref: `academy_kakashi`
- Battle side: `player`
- Combat source: exact current legitimate `academy_kakashi` representation / Registry projection at Battle entry
- source authority: `Documentation/PL_Registry_Rank_Alpha_Authority.md` plus the current runtime representation record

Combat does **not** invent a duplicate static Kakashi stat block here.

At launch, Battle snapshots the exact current authoritative Kakashi state using ordinary Battle-entry rules, including where applicable:

- Registry-authored Stats / Base PL;
- current representation identity;
- currently authorised prepared Skill/action palette;
- currently equipped weapon/gear instances;
- exact Battle Pouch snapshot;
- current Bloodline/Hosted/relationship/capability states legitimately projected into Battle;
- any other already-authorised entry state.

If the caller cannot resolve a valid authoritative `academy_kakashi` Battle snapshot, launch must reject precommit rather than fabricate fallback Stats/PL/Skills.

### 3.2 ANBU Marked Target

Story participant ref:
`academy_kakashi_origin_amt`

Combat source profile:
`anbu_style_operative`

Canonical Stats order:
`Ninjutsu / Taijutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Genjutsu / Stamina`

Stats:
`50 / 47 / 48 / 34 / 43 / 46 / 49`

Base PL:
`49`

The Story participant remains the ANBU Marked Target. Using `anbu_style_operative` as the Combat source profile does **not** globally merge that Story participant identity with every generic opposition record using the same profile.

### 3.3 Package Smuggler

Story participant ref:
`academy_kakashi_origin_package_smuggler`

Combat source profile:
`fuinjutsu_smuggler`

Stats:
`29 / 24 / 27 / 38 / 33 / 22 / 31`

Base PL:
`36`

### 3.4 Masked Interceptor

Story participant ref:
`academy_kakashi_origin_masked_interceptor`

Combat source profile:
`decoy_assassin`

Stats:
`43 / 44 / 46 / 24 / 38 / 42 / 41`

Base PL:
`45`

### 3.5 Pakkun

Story/Battle participant ref:
`pakkun_origin_unfamiliar_ninken`

Combat source:
Pakkun summon-action closure

Base / Battle PL:
`16`

Pakkun is an exact **temporary Story/Battle action source**, not an Inventory/Summon ownership grant and not a second normal player-side turn.

---

## 4. Opponent action packages — Combat closure

Registry proposed the opposition action identities but left exact Combat semantics to this owner. The following values now close those three profile packages for the Kakashi Origin.

All direct attacks use ordinary current Stamina mitigation unless stated otherwise. No action receives generic crit, hidden Speed, generic elemental advantage, unstated status chance, or extra packet.

### 4.1 `anbu_style_operative` action package

#### `enemy_anbu_style_operative_tanto_flash`

- discipline: `bukijutsu`
- mode: direct
- target: one hostile
- Attack PL: **26**
- ordinary Stamina
- no automatic Crit, Bleed, Stun, displacement or extra packet

#### `enemy_anbu_style_operative_wire_capture`

- discipline: `bukijutsu`
- mode: control
- target: one hostile
- on valid committed resolution establish source-owned `wire_capture`
- duration: through target's next action
- effect: blocks actions whose exact definition requires movement/reposition
- not Stun
- no direct Battle-PL damage
- does not create custody/capture Story fact

#### `enemy_anbu_style_operative_silent_body_flicker`

- discipline: `ninjutsu`
- mode: utility/setup self
- commit one source-owned `silent_body_flicker_position` marker through the user's next action
- if the next action is `enemy_anbu_style_operative_tanto_flash`, that direct attack gains **+4 Attack PL**, then consumes the marker
- otherwise the marker expires after the user's next action
- no Speed stat
- no extra action/turn
- no invisibility or automatic evasion

Deterministic AI priority:

1. if target has no live source-owned `wire_capture` and Wire Capture is legal, use Wire Capture;
2. else if `silent_body_flicker_position` is live, use Tantō Flash and consume the marker;
3. else if Silent Body Flicker is legal and the operative's immediately prior action was a direct attack, use Silent Body Flicker;
4. otherwise use Tantō Flash.

### 4.2 `fuinjutsu_smuggler` action package

#### `enemy_fuinjutsu_smuggler_binding_tag`

- discipline: `fuinjutsu`
- mode: control
- target: one hostile
- establish source-owned `binding_tag` through target's next action
- blocks movement/reposition-required actions only
- not Stun
- no direct Battle-PL damage

#### `enemy_fuinjutsu_smuggler_contraband_seal_burst`

- discipline: `fuinjutsu`
- mode: direct
- target: one hostile
- Attack PL: **22**
- ordinary Stamina
- no automatic secondary condition

#### `enemy_fuinjutsu_smuggler_seal_release`

- discipline: `fuinjutsu`
- mode: support self
- remove one live adverse state only if that state's exact metadata declares `smuggler_seal_release_compatible`
- no universal cleanse
- no Hosted Entity/Summon implication
- if no compatible state exists, the action is not legal/selectable

Deterministic AI priority:

1. if a compatible releasable adverse state is live, use Seal Release;
2. else if target has no live source-owned `binding_tag`, use Binding Tag;
3. otherwise use Contraband Seal Burst.

### 4.3 `decoy_assassin` action package

#### `enemy_decoy_assassin_concealed_blade`

- discipline: `bukijutsu`
- mode: direct
- target: one hostile
- Attack PL: **26**
- ordinary Stamina
- no automatic Crit/Bleed/Stun

#### `enemy_decoy_assassin_decoy_substitution`

- mode: guard/setup self
- once per Battle
- establish source-owned guard for the next qualifying direct packet
- **25% pre-Stamina prevention** against that packet
- one packet only
- decoy is a technique/presentation construct, not a participant
- no independent PL/turn

#### `enemy_decoy_assassin_false_retreat`

- mode: movement/deception setup self
- establish one source-owned `false_retreat_opening` marker through user's next action
- next `enemy_decoy_assassin_concealed_blade` gains **+4 Attack PL**, then consumes marker
- otherwise marker expires after user's next action
- does not compel pursuit
- does not alter opponent Knowledge/belief automatically
- no Speed stat or extra action

Deterministic AI priority:

1. if Remaining Battle PL is at or below 50% of entry capacity, Decoy Substitution is unused, and no equivalent source-owned guard is live, use Decoy Substitution;
2. else if no live `false_retreat_opening` marker exists, use False Retreat;
3. otherwise use Concealed Blade and consume the marker.

---

## 5. Opposition presentation tools are not lootable equipment instances

For these Kakashi Origin deployments, the opposition action packages use profile-integrated tool sources:

- AMT: `profile_integrated_tanto_wire_tools`
- Package Smuggler: `profile_integrated_seal_tools`
- Masked Interceptor: `profile_integrated_concealed_blade_decoy_tools`

These tool-source refs explain the authored actions and presentation. They are **not** Inventory item instances and they add no extra Effective Stat modifier beyond the action package written above.

Therefore Battle return must not generate:

- weapon loot;
- seal loot;
- equipment ownership;
- crafting provenance instances;
- reward entitlement;
- automatic Inventory transfers.

If Story/World later authors an exact recoverable object, that requires separate source authority.

---

## 6. Pakkun temporary Battle action contract

Where the exact Battle configuration includes `pakkun_origin_unfamiliar_ninken`, Pakkun retains the already-closed action package:

### `pakkun_nipping_bite`

- direct physical
- Attack PL **7**
- ordinary Stamina
- no poison or Stun

### `pakkun_tracking_scent`

- support/information
- requires a valid trackable current context
- emits only bounded tracking clue/evidence supported by that context
- no omniscient location or identity reveal

### `pakkun_field_guide`

- support/information
- emits bounded tactical/environmental guidance from accessible evidence
- no hidden enemy-stat reveal unless independently observable

Action economy:

- Pakkun has no independent initiative/turn;
- the controller chooses a Pakkun action **instead of Kakashi's normal action opportunity**;
- source/provenance remains Pakkun;
- Pakkun's PL is never added to Kakashi;
- no separate Summon capacity donation;
- if Pakkun reaches 0 Remaining Battle PL, no further outgoing Pakkun action occurs without separate explicit re-entry/revival authority.

At Story return, the exact temporary participation state ends for this occurrence unless the continuing Story scene independently retains Pakkun. Battle completion creates no Summon ownership/contract/standing Access.

---

## 7. Battle launch/caller contract

### 7.1 Required launch request

A valid Story-to-Battle launch request must supply:

- `storyOccurrenceId` — exact current sealed/active Academy Kakashi Story occurrence;
- `sourceAnchorRef` — exact Structured Autonomy / continuation anchor that authorised this Battle;
- `bindingRef` — exact Battle-owned resolver binding/return seam registered by the current adapter;
- `battleConfigId` — one stable configuration ID from section 2;
- `returnToken` — exact caller-owned continuation token/state reference needed to resume the same Story occurrence.

These field names are semantic authority; Coding may use equivalent object property names if meaning and idempotence remain exact.

### 7.2 Validation

Before Battle commit, runtime must validate all of the following:

1. `battleConfigId` exists and is authorised by the supplied current Story route/anchor;
2. `bindingRef` belongs to the active Kakashi Origin adapter occurrence and is Battle-owned;
3. required Story participants for the selected config are still factually available for deployment;
4. `academy_kakashi` resolves to a valid authoritative Battle snapshot;
5. Pakkun is included only when current Story authority explicitly authorises temporary participation for that route;
6. no participant is silently added because they exist in Story/roster/history;
7. no player/enemy PL is auto-scaled to match the other side.

A mismatch rejects precommit. Runtime must not fall back to a simpler/different encounter or fabricate missing participants.

### 7.3 Idempotent launch identity

The Story-to-Battle launch is idempotent for:

`(storyOccurrenceId, sourceAnchorRef, bindingRef)`

The first legitimate committed launch creates one `battleOccurrenceId` and exact Battle-entry snapshots.

Re-render, page refresh, save/load resume or repeated bridge evaluation must resume/reuse that same committed Battle occurrence/result rather than spawn a duplicate Battle for the same launch identity.

A genuinely new later sequential stage uses a new source anchor/binding/`battleOccurrenceId`.

### 7.4 Existing adapter integration

The current neutral Kakashi adapter already consumes Battle-owned results through its exact `state.resolverResults[bindingRef]` seam.

Coding may implement launch/return behind that seam, but must preserve:

- Battle owns Battle resolution;
- Story owns continuation/outcome interpretation;
- Battle does not directly mutate reward/Inventory/Progression/Story outcome state;
- Story does not fabricate a Battle result when launch/config resolution exists.

---

## 8. Route/config legality

Battle configuration selection is based on the exact authorised route and Structured Autonomy continuation, never merely on a button caption.

Current locked examples include:

- direct Pickpocket failure (`AK_SA_028` family) → `academy_kakashi_origin_battle_amt_ps_mi_3v1`;
- improved-position/Get-Closer-success Pickpocket failure (`AK_SA_030` family) → `academy_kakashi_origin_battle_amt_ps_2v1`;
- exact direct AMT confrontation route → `academy_kakashi_origin_battle_amt_1v1` unless current Story continuation explicitly includes Pakkun;
- exact AMT confrontation with authorised temporary Pakkun participation → `academy_kakashi_origin_battle_kakashi_pakkun_vs_amt`;
- sequential timed route → the three `academy_kakashi_origin_battle_seq_*` stages in order.

Existing adapter binding refs such as:

- `academy_kakashi.battle.stop_assassin`;
- `academy_kakashi.battle.secure_package`;
- `academy_kakashi.battle.defeat_assassin_then_secure`;
- `academy_kakashi.battle.stop_package_smuggler`;
- `academy_kakashi.battle.cut_off_sakura`;
- `academy_kakashi.battle.demand_package`;
- `academy_kakashi.battle.take_him_down`

remain caller/return seams. Combat does **not** reinterpret those English names as participant composition. The active Story route/anchor must supply the exact config ID authorised by Writing authority.

This avoids hard-coding false assumptions such as `stop_assassin == one specific generic Registry profile` when the current Story graph is the actual authority for who is present.

---

## 9. Sequential Masked Interceptor → Package Smuggler → AMT timing contract

The current Story continuation benchmark uses controller action opportunities, not wall-clock time and not enemy turns.

Define:

`stageTurnCount = number of Kakashi/controller normal action opportunities consumed from stage Battle commit through stage resolution`

Rules:

- one Kakashi action consumes one count;
- choosing a Pakkun action consumes Kakashi's normal action opportunity and therefore counts as one controller action if a timing gate ever applies to a Pakkun stage;
- opponent action opportunities do **not** increment this benchmark;
- UI render/animation/save/load/resume/replay projection does not increment it;
- a precommit-rejected action that does not consume the normal action opportunity does not increment it;
- an action that legally commits and consumes the opportunity increments it even if its effect is blocked/resisted/unsuccessful.

### Stage 1 — Masked Interceptor

Config:
`academy_kakashi_origin_battle_seq_mi`

Continuation to Package Smuggler remains preserved when the stage resolves with Kakashi/player side legitimately able to continue and the Masked Interceptor Battle obstacle is factually resolved within:

**`stageTurnCount <= 4`**

The current authored benchmark expects a successful/qualifying stage result; simply surviving four turns does not manufacture continuation success.

### Stage 2 — Package Smuggler

Config:
`academy_kakashi_origin_battle_seq_ps`

The stage counter resets to 0 on this new Battle occurrence.

Continuation to AMT remains preserved when the stage resolves with Kakashi/player side legitimately able to continue and the Package Smuggler Battle obstacle is factually resolved within:

**`stageTurnCount <= 3`**

### Stage 3 — ANBU Marked Target with Pakkun

Config:
`academy_kakashi_origin_battle_seq_amt_pakkun`

There is **no inherited hidden turn deadline** from the two earlier stages unless later Story authority explicitly authors one.

Pakkun participates through the temporary action-source contract above.

### Post-stage dispositions

A deterministic post-Battle Story disposition after the MI or PS stage does not secretly consume additional `stageTurnCount` for an already-resolved Battle and does not impose a hidden timing penalty on the next stage.

If Story explicitly launches a new Battle/action that consumes a normal action opportunity, that new occurrence follows its own authority.

Each sequential stage is a distinct Battle occurrence with a fresh ordinary deterministic Battle-entry snapshot. This contract does not invent hidden Remaining Battle PL carry-over, healing, depletion carry-over or enemy scaling between stages; any such cross-Battle persistence requires existing exact authority.

---

## 10. Deterministic Battle result / return contract

A completed/paused Battle return must provide a factual Battle-owned result object sufficient for Story to resume without inferring unstated states.

Minimum semantic fields:

- `battleConfigId`;
- `battleOccurrenceId`;
- `storyOccurrenceId`;
- `sourceAnchorRef`;
- `bindingRef`;
- `resultState`;
- `playerActionOpportunityCount` / exact stage counter where applicable;
- deployed `participants[]`;
- exact action occurrence refs used during the Battle;
- bounded observer/source evidence needed by the current continuation.

Allowed high-level `resultState` values are factual states such as:

- `player_side_victory`;
- `opposition_side_victory`;
- `withdrawn`;
- `unresolved`.

Do not infer a Story package/custody/mission outcome merely from this field.

### 10.1 Participant return record

Each deployed participant return includes at minimum:

- `participantRef`;
- `combatSourceProfileId` / exact representation source;
- `side`;
- `deploymentRole`;
- `basePLAtEntry`;
- `remainingBattlePL`;
- factual `battleStatus`;
- `lifeState`;
- `custodyState`;
- action occurrence refs attributable to that participant.

Battle-status vocabulary may include exact facts such as:

- `active`;
- `defeated`;
- `withdrawn`;
- `escaped` where the Battle resolver actually resolved an escape.

**`defeated` means Battle capability/action resolution only. It does not mean unconscious, dead, captured or transferred into custody.**

Unless another exact resolver/action committed otherwise:

- `lifeState = unresolved`;
- `custodyState = unresolved`.

Story/CE later resolves release/kill/capture/custody through its own authority.

### 10.2 Package/objective state

Battle return contains `packageCustodyDelta` only when an exact Battle action/resolver explicitly commits a package-custody change.

Default:

`packageCustodyDelta = none`

Battle victory alone does not move the package.

### 10.3 Pakkun return

For Pakkun configs the result additionally records:

`temporaryParticipationEnded = true`

when Battle returns control to Story, unless the exact continuing Story state independently retains temporary Pakkun presence.

This does not write Summon ownership/access.

### 10.4 Forbidden side effects

Battle completion itself must not automatically grant or mutate:

- Inventory loot;
- weapon ownership;
- Summon ownership/contract;
- Ryō/rewards;
- Rank/Promotion;
- persistent Progression/development values beyond emitting already-authorised factual action evidence;
- participant death/KO/custody;
- package custody;
- mission success/failure.

Those belong to their owning systems and consume the factual Battle result.

---

## 11. Multi-opponent Battle semantics

For the 2v1 and 3v1 configs:

- each deployed opposition participant retains its own Base PL, Remaining Battle PL and action package;
- no additive opponent PL pool is created;
- no groupBoss/elite capacity multiplier is added;
- no random Battle-entry variation is added;
- one participant being defeated does not automatically defeat/withdraw the others;
- no participant inherits another participant's action package;
- target selection follows current Battle legality;
- deterministic AI is evaluated independently for each opposition participant on that participant's ordinary opportunity.

The current Kakashi side remains one controller action opportunity per normal Kakashi turn. Pakkun only changes the available action source on exact Pakkun routes; it does not create two normal player-side turns.

---

## 12. Coding acceptance fixtures

Implementation should be considered source/headless complete only when deterministic tests prove at minimum:

1. each of the seven stable config IDs launches only its exact participant composition;
2. AMT/PS/MI resolve with the exact Stats/Base PL/action packages in this contract;
3. Kakashi snapshot comes from current authoritative `academy_kakashi` representation rather than a locally hard-coded fallback;
4. no encounter PL auto-scaling occurs;
5. 2v1/3v1 retain per-participant capacities/actions rather than merged boss PL;
6. Pakkun consumes the Kakashi/controller action opportunity and never receives independent initiative;
7. Pakkun PL is never added to Kakashi and no Summon ownership is written;
8. MI timing gate uses Kakashi/controller consumed opportunities and accepts qualifying resolution at <=4;
9. PS timing gate resets and accepts qualifying resolution at <=3;
10. enemy turns/UI rerenders/save-load resume do not increment those Story benchmark counters;
11. precommit rejected no-cost actions do not increment; committed consumed actions do;
12. Battle result returns participant Battle status separately from life/custody state;
13. Battle victory alone does not mutate package custody, participant custody, death, loot or Story objective completion;
14. repeated launch evaluation for the same `(storyOccurrenceId, sourceAnchorRef, bindingRef)` resumes/reuses one committed Battle occurrence/result;
15. `state.resolverResults[bindingRef]` / equivalent current adapter bridge receives Battle-owned factual result and Story resumes from it.

Browser validation and Golden/regression GREEN remain separate proof layers after source/headless implementation.

---

## 13. #201 closure summary

Combat closes the requested runtime-launchable source package:

- seven stable Battle config IDs;
- exact participant side assignments;
- exact Registry/source projection for AMT/PS/MI;
- current-authority dynamic Kakashi Battle-entry snapshot rather than invented static values;
- exact Pakkun temporary action package and action economy;
- exact AMT/PS/MI action numerics + deterministic AI;
- no opponent loot/equipment-instance invention;
- Story-to-Battle launch validation/idempotence;
- exact sequential turn-window metric: MI <=4, PS <=3, final AMT no inherited timer;
- factual Battle result schema with Battle status separated from life/custody/package state;
- deterministic implementation acceptance fixtures.

**Combat slice for #201: CLOSED. Coding may consume this authority on the existing issue. No duplicate handoff is required.**
