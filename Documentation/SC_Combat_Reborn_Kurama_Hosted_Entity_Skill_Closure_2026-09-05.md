# Shinobi Chronicles — Reborn Kurama Hosted Entity / Skill Closure

Date: 2026-09-05

Status: **COMBAT / SKILLS AUTHORITY — CLOSED**

This document consumes PL / Registry / Rank authority from:

`Documentation/Registry/Reborn Kurama Hosted Entity Calibration.md`

Registry authority consumed exactly:

- stable Entity ID: `reborn_kurama`;
- lifecycle: Hosted Entity;
- same persistent Kurama being in a distinct reborn representation;
- Base Stats: `110 / 84 / 30 / 48 / 118 / 76 / 116`;
- Base PL: **112**;
- authoritative Hosted Entity source for `black_sun_himawari` (Chakra Mode Himawari) and `kurama_resonance_himawari`;
- no additive PL/Stat transfer;
- no second deployment slot, recurring turn, or separate Battle-PL ledger while hosted by default;
- no independent manifestation lifecycle merely because the Entity has Base PL112.

This closure defines:

1. Reborn Kurama's canonical own-action repertoire;
2. hosted-action availability semantics;
3. Chakra Mode Himawari's exact Reborn-Kurama-assisted palette;
4. exact source/provenance reconciliation for Kurama Resonance Himawari's already-closed palette.

---

## 1. Hosted Entity Combat lifecycle

While `reborn_kurama` is hosted by an authorised Himawari representation:

- Reborn Kurama does not occupy a second deployment slot;
- Reborn Kurama does not receive an independent recurring action opportunity;
- Reborn Kurama does not create a separate hosted Battle-PL damage ledger;
- Reborn Kurama's Base PL112 is not added to the host Character's PL;
- Reborn Kurama's Stats are not projected wholesale into the host Character;
- Character-owned assisted Actions consume the Character's normal action opportunity;
- successful assisted occurrences may record `reborn_kurama` as a legitimate causal/source participant in provenance/evidence without giving the Entity a separate turn;
- a hosted source requirement is checked before commit; if the required hosted relationship/source is not legitimately present, the assisted Action is invalid and creates no false action history.

Preserve:

**Hosted Entity presence ≠ independent Battle participant**

**source participation ≠ second turn**

**Reborn Kurama PL ≠ Himawari PL**

**synergy ≠ generic multiplier**

---

## 2. Reborn Kurama — canonical own-action repertoire

Reborn Kurama receives a five-action canonical repertoire for identity completeness and future lifecycle use.

**Important Alpha/runtime boundary:** these Actions are NOT independently selectable merely because the Entity is hosted. They become executable only if a future exact lifecycle explicitly manifests/deploys `reborn_kurama` as an acting Battle participant. This document does not author that manifestation mode.

### 2.1 `reborn_kurama_tailed_beast_bomb`

Display: **Tailed Beast Bomb**

- discipline: Ninjutsu / tailed-beast chakra;
- target mode: hostile area;
- maximum targets: **3** valid hostile participants;
- authored Attack PL: **60 per target**;
- packet structure: one direct packet per affected target;
- ordinary Stamina mitigation: yes, independently per target;
- no Alpha Excess branch;
- no automatic Burning, Stun, displacement, restraint, or environment destruction.

### 2.2 `reborn_kurama_chakra_claw`

Display: **Chakra Claw**

- discipline: Taijutsu / Ninjutsu-assisted direct action;
- target: one hostile participant;
- authored Attack PL: **40**;
- packet structure: one direct packet;
- ordinary Stamina mitigation: yes;
- no automatic Stun, displacement, Guard break, restraint, or Bleeding.

### 2.3 `reborn_kurama_roaring_chakra_wave`

Display: **Roaring Chakra Wave**

- discipline: Ninjutsu;
- target mode: hostile area;
- maximum targets: **2** valid hostile participants;
- authored Attack PL: **46 per target**;
- packet structure: one packet per affected target;
- ordinary Stamina mitigation: yes;
- visible force does not automatically create displacement, interruption, Stun, or terrain mutation.

### 2.4 `reborn_kurama_reborn_shroud`

Display: **Reborn Shroud**

- class: self defensive state;
- target: self;
- no Attack PL;
- establish source-owned state `reborn_kurama_shroud`;
- prevent **45%** of the next qualifying incoming direct authored Attack-PL packet;
- prevention occurs at the existing pre-Stamina defence stage;
- ordinary Stamina then mitigates the reduced Attack PL;
- consumed by the first qualifying packet;
- if unused, expires at the start of Reborn Kurama's next legitimate action opportunity;
- does not protect against bypass-Stamina Condition ticks, control-only occurrences, already-committed self-damage, or unrelated world consequences.

### 2.5 `reborn_kurama_vital_chakra_renewal`

Display: **Vital Chakra Renewal**

- class: self restoration/support;
- target: self;
- no Attack PL;
- restore **16 underlying Remaining Battle PL**;
- capped at the authoritative underlying Battle maximum;
- availability: **once per Battle**;
- full underlying Battle PL = invalid precommit; no occurrence and no use consumed;
- valid commit consumes the once-per-Battle availability even when cap reduces the restored amount below 16;
- does not heal persistent Injury, modify Stamina, create temporary capacity, or rewrite Base/Current/Effective Stats.

---

## 3. Chakra Mode Himawari (`black_sun_himawari`) — hosted assisted palette

Registry display terminology now treats `black_sun_himawari` as **Chakra Mode Himawari**. Stable machine ID remains `black_sun_himawari` unless Registry explicitly changes it.

This representation expresses a controlled hosted relationship with `reborn_kurama`, below the deeper synchronization expressed by `kurama_resonance_himawari`.

The following Actions are Character-owned by `black_sun_himawari`. They use the Character's action opportunity and require the legitimate hosted `reborn_kurama` source. They do not instantiate Reborn Kurama as a second Battle participant.

### 3.1 `black_sun_himawari_chakra_mode_strike`

Display: **Chakra Mode Strike**

- discipline: Taijutsu / Ninjutsu-assisted direct action;
- target: one hostile participant;
- authored Attack PL: **38**;
- packet: one direct packet;
- ordinary Stamina mitigation: yes;
- no automatic Stun, Guard break, displacement, restraint, or secondary Kurama packet.

### 3.2 `black_sun_himawari_reborn_chakra_burst`

Display: **Reborn Chakra Burst**

- discipline: Ninjutsu;
- target mode: hostile area;
- maximum targets: **2** valid hostile participants;
- authored Attack PL: **44 per target**;
- one packet per affected target;
- ordinary Stamina independently per target;
- no automatic Burning, Stun, displacement, or Excess.

### 3.3 `black_sun_himawari_hosted_guard`

Display: **Hosted Chakra Guard**

- class: self defensive state;
- target: self;
- no Attack PL;
- establish source-owned state `black_sun_hosted_guard`;
- prevent **30%** of the next qualifying incoming direct authored Attack-PL packet at the pre-Stamina stage;
- then ordinary Stamina applies;
- consumed by the first qualifying packet;
- if unused, expires at the start of Himawari's next action opportunity;
- no hidden Defense or Stamina rewrite.

### 3.4 `black_sun_himawari_reborn_recovery`

Display: **Reborn Recovery**

- class: self restoration/support;
- target: self;
- no Attack PL;
- restore **10 underlying Remaining Battle PL**;
- capped to authoritative underlying Battle maximum;
- availability: **once per Battle**;
- full underlying Battle PL = invalid precommit and does not consume availability;
- not Injury healing, not Stamina restoration, not temporary capacity, not regeneration-over-time.

### 3.5 `black_sun_himawari_reborn_sensory_link`

Display: **Reborn Sensory Link**

- class: information / hosted sensory cooperation;
- no Attack PL;
- consumes Himawari's normal action opportunity when used as an active analysis/read;
- may establish legitimate encounter-local sensory evidence concerning a currently perceptible/traceable hostile presence, chakra disturbance, or immediate threat only where the resolver/context provides actual evidence;
- does not create omniscience, automatic hidden-target revelation, future prediction, universal Knowledge, accuracy, Evasion, Speed, or PL modifiers;
- successful evidence records both Himawari and `reborn_kurama` as causal sources while the action remains Character-owned.

### Chakra Mode non-inference

Do not infer:

- Tailed Beast Bomb access from this palette;
- automatic transformation into Kurama Resonance Himawari;
- passive regeneration;
- a second Kurama turn;
- Kurama PL transfer;
- generic synergy multiplier;
- cross-representation inheritance of the stronger `kurama_resonance_himawari` Actions.

---

## 4. Kurama Resonance Himawari — source reconciliation

The five Actions already closed in:

`Documentation/SC_Combat_Kurama_Resonance_Himawari_Closure_2026-09-04.md`

remain numerically and mechanically unchanged:

- `kurama_resonance_himawari_resonant_chakra_strike` — Attack PL **44**;
- `kurama_resonance_himawari_tailed_beast_bomb` — Attack PL **56 per target**, maximum 3 hostile participants;
- `kurama_resonance_himawari_regenerative_resonance` — restore **18 underlying Remaining Battle PL**, once per Battle;
- `kurama_resonance_himawari_chakra_hair_rescue` — exact compatible physical-control release using current legitimate Effective Ninjutsu;
- `kurama_resonance_himawari_resonant_guard` — **40%** prevention of next qualifying direct authored Attack-PL packet at pre-Stamina stage.

### Exact source authority added by this closure

For all five Actions above:

- exact Hosted Entity source/prerequisite: `reborn_kurama`;
- Action owner: `kurama_resonance_himawari`;
- action opportunity consumed: Himawari's;
- no Reborn Kurama independent turn;
- no Reborn Kurama Base PL or Stat addition;
- no second Kurama damage packet;
- successful occurrence/evidence may record `reborn_kurama` as the exact hosted causal source;
- if the authoritative hosted source is not legitimately present, a source-required assisted Action is invalid before commit and creates no false action history.

This source reconciliation supersedes any earlier generic/unspecified Kurama-resonance source reference while preserving all previously closed numerical/action semantics.

---

## 5. Relationship / synergy semantics

The exceptional Himawari ↔ Reborn Kurama synergy is represented through exact authored capability/access differences, not a universal multiplier.

For Alpha-facing Combat semantics:

- Chakra Mode Himawari receives a bounded lower-expression hosted palette;
- Kurama Resonance Himawari receives the already-closed stronger/deeper-synchronization palette;
- the progression from one representation to another does not add Reborn Kurama's PL112 to either Character;
- no generic `synergyMultiplier`, `bondBonus`, friendship PL, or hidden Stat transfer exists;
- relationship strength may legitimately control which exact representation/Action package is accessible when the owning Progression/Acquisition authority later defines those gates.

Preserve:

**relationship expression ≠ PL arithmetic**

**access to stronger Actions ≠ source PL donation**

**same Hosted Entity source ≠ identical Character repertoire**

**Character-owned assisted Action ≠ Entity-owned independent turn**

---

## 6. Standalone manifestation boundary

No independent manifestation/deployment mode for `reborn_kurama` is authored here.

Therefore:

- Reborn Kurama's canonical own-action repertoire exists as identity/Combat authority;
- those Actions are dormant while the Entity remains hosted under the default lifecycle;
- Coding must not make the Entity independently selectable merely because the repertoire and Base PL exist;
- if a future mission, transformation, event, or progression stage explicitly manifests Reborn Kurama as an acting participant, that lifecycle must separately define deployment, Battle PL ledger, action opportunities, exit/cleanup, and history semantics before the own-action repertoire becomes executable.

---

## 7. Combat closure status

Combat/Skills authority is now closed for:

- Reborn Kurama's five canonical own Actions;
- hosted non-independent lifecycle consumption;
- Chakra Mode Himawari's five Reborn-Kurama-assisted Actions;
- exact Reborn-Kurama source reconciliation for Kurama Resonance Himawari's existing five Actions;
- relationship synergy expressed through exact access/repertoire rather than generic PL/Stat multiplication;
- no independent manifestation by inference.

This document does not itself alter production admission, acquisition, progression gating, card/portrait assets, or runtime implementation status.
