# Shinobi Chronicles — Kurama Resonance Himawari Combat Closure

Date: 2026-09-04

Status: **COMBAT AUTHORITY / AWAITING PRODUCTION ADMISSION**

This document consumes Registry/PL authority for `kurama_resonance_himawari` and closes the Alpha-facing Combat semantics for her five prepared Actions. It does not itself admit the identity into the current live collectible Registry or asset manifests.

## 1. Representation authority

Stable ID: `kurama_resonance_himawari`

Display: **Kurama Resonance Himawari**

Base Stats, canonical seven-stat order:

`112 / 106 / 48 / 70 / 110 / 76 / 126`

Base PL: **118**

Kurama Resonance is already embodied in this dedicated Character representation's Base Stats / Base PL.

Do **not**:

- add any Kurama Entity PL;
- project `nine_tails`, `yang_kurama`, `yin_kurama`, or `kurama_complete` onto this representation;
- create a second Kurama Battle participant;
- create another Kurama acquisition transaction merely because this Character is acquired or deployed;
- treat the representation as a Sumire/Nue paired-acquisition relation;
- stack a generic Hosted-Entity modifier on top of the authored Base Stats / Base PL.

Combat Actions remain Character-owned. Their provenance may identify the embodied Kurama-resonance state as an authored causal source/context, but that source addressability does not create an independent Entity, turn, PL ledger, or deployment slot.

Preserve:

- embodied resonance ≠ external Entity projection;
- causal source ≠ independent Battle participant;
- dedicated representation Base PL ≠ host PL + Kurama PL;
- acquisition of the representation ≠ acquisition/duplication of a Kurama Entity.

## 2. Prepared Alpha Actions

### 2.1 `kurama_resonance_himawari_resonant_chakra_strike`

Display: **Resonant Chakra Strike**

- primary discipline: Taijutsu / Ninjutsu-assisted direct action;
- target: current hostile target;
- packet structure: one direct Battle-PL damage packet;
- authored Attack PL: **44**;
- ordinary Stamina mitigation: **yes**;
- no automatic Stun, displacement, Guard break, restraint, or Condition;
- Kurama-resonance presentation/provenance does not add a second damage packet or Entity-owned contribution.

### 2.2 `kurama_resonance_himawari_tailed_beast_bomb`

Display: **Tailed Beast Bomb**

- primary discipline: Ninjutsu;
- target mode: hostile area, maximum **3** valid hostile Battle participants;
- packet structure: one authored damage packet per valid affected target;
- authored Attack PL: **56 per affected target**;
- ordinary Stamina mitigation: **yes, independently per target**;
- no Alpha Excess branch;
- no automatic Burning, Stun, displacement, environmental destruction, or control rider;
- visible blast scale does not multiply packets beyond the one-per-target contract;
- the Action is Character-owned by `kurama_resonance_himawari`; do not instantiate a Kurama participant to execute it.

### 2.3 `kurama_resonance_himawari_regenerative_resonance`

Display: **Regenerative Resonance**

- primary class: self restoration/support;
- target: self only;
- no Attack PL;
- on a valid committed resolution, restore **18 underlying Remaining Battle PL**;
- restoration is capped at the authoritative starting/current underlying Battle-PL maximum for this Battle representation;
- this does **not** restore Injury, alter Stamina, grant temporary capacity, rewrite Base/Current/Effective Stats, or create a regeneration-over-time engine;
- availability: **once per Battle** for Alpha;
- a request made while no underlying Battle PL is missing is invalid before commit, creates no false action history, and does not consume the once-per-Battle availability;
- a valid use consumes the once-per-Battle availability when the restoration occurrence commits, even if the amount actually restored is less than 18 because the cap is reached.

This is action-local restoration authority, not a generic Kurama passive-regeneration subsystem.

### 2.4 `kurama_resonance_himawari_chakra_hair_rescue`

Display: **Chakra Hair Rescue**

- primary class: ally rescue / compatible physical-control release;
- target: one active allied Character other than Himawari;
- no Attack PL;
- no generic healing;
- no hidden grid movement, Evasion, Speed, or automatic disengage;
- on resolution, use Himawari's **current legitimate Effective Ninjutsu** as the rescue/control-break strength;
- the Action may remove exactly one active control state on that ally only when that state is explicitly compatible with physical rescue/control-break semantics (for example an authored physical restraint or movement restraint whose lifecycle permits external release);
- it does not remove generic `stun`, `shadow_control`, `shadow_pin`, `tenketsu_disruption`, Fūinjutsu seals, chakra interference, Poison, Burning, Amaterasu, or other Conditions merely because they restrict action;
- if more than one compatible removable control state is present, the exact target state must be identified by the action request/resolver; do not silently choose or clear all controls;
- if no compatible removable control state is present, the request is invalid before commit and creates no false rescue history;
- successful release commits evidence identifying Himawari, the rescued ally, the exact removed control-state instance, its establishing source/provenance, and the rescue occurrence.

This is a support/control-break Action, not a reaction/intercept system and not a new universal cleanse mechanic.

### 2.5 `kurama_resonance_himawari_resonant_guard`

Display: **Resonant Guard**

- primary class: self defensive state;
- target: self;
- no Attack PL;
- on valid use, establish source-owned `resonant_guard`;
- prevention ratio: **40%** of the next qualifying incoming direct authored Attack-PL packet, applied in the existing pre-Stamina defence stage;
- ordinary Stamina mitigation then resolves against the reduced Attack PL;
- the state is consumed by the first qualifying incoming direct damage packet it protects against;
- if unused, it expires at the start of Himawari's next action opportunity;
- it does not protect against bypass-Stamina Condition ticks, already-committed self-damage, control-only occurrences, or unrelated world/environment consequences unless a future exact contract explicitly says otherwise;
- it does not rewrite Stamina or create permanent Effective-Stat defence.

This signature guard is deliberately stronger than ordinary Guard without creating a hidden Defense Stat.

## 3. Alpha non-inference boundaries

Do not infer from the Kurama-resonance presentation:

- passive regeneration every turn;
- infinite chakra or a new chakra-resource subsystem;
- automatic resurrection/defeat prevention;
- automatic Kurama manifestation;
- a second Kurama action opportunity;
- Kurama relationship PL bonuses;
- hidden transformation stages;
- automatic Tailed Beast Bomb access for other Kurama/Jinchūriki representations;
- cross-representation Skill inheritance.

Access to these five Actions belongs to this exact representation unless another authority explicitly grants them elsewhere.

## 4. Production-admission boundary

Registry/PL identifies this as the final awaiting-placement Character addition for the current expansion wave.

Awaiting-placement wave after this addition:

- **13 Characters**;
- **1 Entity/Summon (`nue`)**.

If and only if the full wave is later admitted to live production, the collectible production gate becomes:

**98 Characters + 18 Entities = 116**.

Until explicit Registry/Coding/Assets admission occurs, the current live gate and current portrait/card manifests remain authoritative. Combat semantic closure is not production admission.

Assets must provide exact repository `collectibleCard` and square `uiPortrait` paths for `kurama_resonance_himawari`; Coding must not infer the portrait path from the card asset or filename.

Preserve:

- semantic closure ≠ production admission;
- Registry identity ≠ current live Registry membership;
- Combat authority ≠ asset-path authority;
- awaiting-placement count ≠ live production count.
