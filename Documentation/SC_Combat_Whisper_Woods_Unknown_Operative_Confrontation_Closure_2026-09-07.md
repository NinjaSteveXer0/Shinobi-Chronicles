# Shinobi Chronicles — Whisper Woods Unknown Operative Combat / Confrontation Closure

**Date:** 2026-09-07  
**Status:** **COMBAT / SKILLS / ITEMS / WEAPONS — AUTHORITATIVE / ALPHA IMPLEMENTATION-READY**  
**Source handoff:** GitHub issue #7  
**Registry authority:** `Documentation/Registry/Whisper Woods Unknown Operative Identity and PL Ratification.md`  
**CE authority:** `Documentation/Coordination/Unknown Operative Projection and Lethal Encounter Coordination Contract.md`

---

## 1. Consumed authority

Stable Enemy/Opposition identity:

`arc1_m1_unknown_operative`

Observer-safe projection:

`observer_projection_unknown_operative`

Player-facing concealed label:

**UNKNOWN OPERATIVE**

Canonical Base Stats:

`58 / 66 / 54 / 38 / 46 / 56 / 62`

Canonical Base PL:

**63**

Formal Rank remains unknown/not authorised.

This Combat closure does not admit the operative as a collectible Character/Entity and does not reveal concealed affiliation/name truth.

No encounter scaling, hidden capacity multiplier, player-relative scaling, map-tier bonus, random Battle-entry PL variation or narrative invulnerability is authorised.

---

## 2. Combat identity / intended feel

The operative is a disciplined, surgical single-target combatant.

Combat intent:

- materially above a fresh Genin one-on-one;
- plausibly overwhelming against ordinary lower-tier opposition in close control;
- dangerous to a fresh Genin team if isolated or poorly coordinated;
- not a boss and not automatically unbeatable by a legitimate Jōnin-level leader plus capable allies;
- threat comes from strong direct attacks, short control, defence and a legal break-contact option rather than hidden multipliers or area wipe mechanics.

His prepared Battle package is intentionally **single-target**. Do not add an area attack merely because several opponents may confront him.

---

## 3. Prepared Battle actions

Prepared selectable Battle actions for `arc1_m1_unknown_operative`:

1. `arc1_m1_unknown_operative_crushing_palm`
2. `arc1_m1_unknown_operative_chakra_edge`
3. `arc1_m1_unknown_operative_counter_lock`
4. `arc1_m1_unknown_operative_guarded_read`
5. `arc1_m1_unknown_operative_break_contact`

There is no inferred generic Basic/Guard fallback. If `break_contact` is currently ineligible, the other four actions remain available.

### 3.1 `arc1_m1_unknown_operative_crushing_palm`

Display: **Crushing Palm**

- owner: `arc1_m1_unknown_operative`;
- discipline: Taijutsu;
- target mode: one hostile active Battle participant;
- Attack PL: **32**;
- packet: one direct Battle-PL damage packet;
- ordinary Stamina mitigation: **yes**;
- no automatic Stun, displacement, fracture, restraint, Guard break or persistent injury.

This is the operative's strongest ordinary close-range Taijutsu damage action. The authored wrist-break scene beat is **not** inferred from ordinary use of Crushing Palm.

### 3.2 `arc1_m1_unknown_operative_chakra_edge`

Display: **Chakra Edge**

- owner: `arc1_m1_unknown_operative`;
- discipline: Bukijutsu / Ninjutsu-assisted direct action;
- target mode: one hostile active Battle participant;
- Attack PL: **36**;
- packet: one direct Battle-PL damage packet;
- ordinary Stamina mitigation: **yes**;
- no automatic Bleeding, severing, Guard break, armour penetration or persistent injury.

`Chakra Edge` is the operative's highest prepared direct-damage action for this confrontation.

### 3.3 `arc1_m1_unknown_operative_counter_lock`

Display: **Counter Lock**

- owner: `arc1_m1_unknown_operative`;
- discipline: Taijutsu / physical control;
- target mode: one hostile active Battle participant;
- Attack PL: **22**;
- packet: one direct Battle-PL damage packet;
- ordinary Stamina mitigation: **yes**;
- restraint rider requires resolved `finalDamage > 0` from this exact action;
- on qualifying success, establish exact-source `physical_restraint` on that target;
- lifetime: through the target's **next action opportunity**, then expires;
- while active, the target cannot commit actions whose declared execution requires free bodily movement/repositioning;
- it is **not Stun**: actions that remain factually executable while restrained are not universally blocked;
- same-source reapplication refreshes the remaining lifetime rather than stacking parallel restraint streams;
- removing/expiring the restraint does not erase establishment provenance.

Do not convert this to a universal limb-break or injury effect.

### 3.4 `arc1_m1_unknown_operative_guarded_read`

Display: **Guarded Read**

- owner: `arc1_m1_unknown_operative`;
- discipline: combat-read / defensive setup;
- target: self;
- Attack PL: none;
- consumes the operative's normal action opportunity;
- establishes `unknown_operative_guarded_read`;
- prevents **30%** of the next qualifying direct Attack-PL packet that would hit the operative;
- prevention occurs before Stamina mitigation;
- consumed by the first qualifying direct packet whether or not the prevented amount is large;
- expires unused at the start of the operative's next action opportunity;
- no hidden Evasion, Speed, accuracy, Defence Stat or omniscient read is created.

### 3.5 `arc1_m1_unknown_operative_break_contact`

Display: **Break Contact**

- owner: `arc1_m1_unknown_operative`;
- discipline: tactical disengagement;
- Attack PL: none;
- target: encounter/self;
- once per confrontation occurrence;
- valid only when all of the following are true at action commit:
  - the current Story/Battle occurrence permits escape as a factual outcome;
  - the operative's remaining underlying Battle PL is **25% or less** of his starting underlying Battle PL;
  - the operative is not currently under a movement-preventing physical restraint/control state;
  - the operative has not already resolved `break_contact` in this confrontation;
- consumes the operative's normal action opportunity;
- on valid resolution, commits factual encounter outcome `operative_escaped` and ends this operative's participation in the confrontation;
- escape is a survival outcome, not victory over the opposing side and not retroactive erasure of damage/history;
- invalid selection creates no escape fact and must not consume the action opportunity.

`Break Contact` is **not automatic** at low Battle PL and is never triggered merely because the operative loses the Battle. It must be selected and validly resolved before defeat/capture/death resolution.

---

## 4. Authored Whisper Woods wrist-break capability

The authored fact that the operative breaks the Rogue Shinobi's wrist with overwhelming ease is represented by a separate contextual action/evidence contract:

`arc1_m1_unknown_operative_wrist_break`

This is **not** a prepared general-purpose Battle action.

It may resolve only when the exact Whisper Woods Story occurrence explicitly commits the authored scene beat and supplies the actual stable target participant.

Required occurrence context:

- scene: `scene_arc1_m1_whisper_major_contact`;
- opportunity: `arc1_m1_whisper_major_contact`;
- event: `arc1_m1_whisper_major_contact_event`;
- actor: `arc1_m1_unknown_operative`;
- target: exact stable Rogue Shinobi participant supplied by Story/World.

Resolver semantics:

- discipline/source: Taijutsu / close physical control;
- no reusable Attack-PL number is inferred from this scripted factual beat;
- if Writing/World legally commits the beat, emit one factual injury occurrence for the supplied target: `fractured_wrist`;
- injury persistence attaches to the real stable target participant, not a presentation label;
- later medical/recovery effects are owned by their proper systems; this action does not invent a universal Stat penalty, Health subsystem or treatment duration;
- no other target may receive `fractured_wrist` merely because the operative used Crushing Palm or Counter Lock.

This preserves the authored overwhelming control fact without turning scene prose into a global random-maiming mechanic.

---

## 5. Whisper Woods confrontation package

Encounter package ID:

`arc1_m1_unknown_operative_confrontation`

Legal caller context:

- scene `scene_arc1_m1_whisper_major_contact`;
- opportunity `arc1_m1_whisper_major_contact`;
- event `arc1_m1_whisper_major_contact_event`.

Story supplies the **exact active participant set and side assignment** for the chosen branch.

Combat must not infer participation from:

- team membership;
- majority vote;
- agreement/disagreement;
- physical presence alone;
- relationship status.

The operative enters with his canonical Base package unless a separately authored occurrence-owned Effective-State source exists. None is added by this closure.

Supported confrontation objectives:

- `kill_arc1_m1_unknown_operative`
- `detain_arc1_m1_unknown_operative`

`Release` does not create Battle through this package.

---

## 6. Kill objective resolver

Objective ID:

`kill_arc1_m1_unknown_operative`

Choosing Kill is lethal intent. It does not itself kill the operative.

### Lethal objective success

The lethal objective succeeds only when:

1. Story legally transitioned the branch into this Battle with Kill as the declared objective;
2. the exact active kill-side participant set wins/neutralises `arc1_m1_unknown_operative` under the normal Battle resolver;
3. the operative has **not** already resolved `arc1_m1_unknown_operative_break_contact`;
4. no authored external interruption/rescue/termination outcome has already ended the confrontation.

On success:

- Battle result records the operative as defeated/neutralised under the lethal objective;
- emit `lethalObjectiveSuccess: true`;
- emit a death consequence request against stable identity `arc1_m1_unknown_operative` with this confrontation occurrence as cause;
- the operative's Chronicle life state becomes dead when the authoritative consequence commit accepts that request;
- no automatic post-defeat escape is permitted;
- no later same-Chronicle recurrence is eligible after committed death unless a separately authorised resurrection/revival mechanism exists.

### Lethal objective failure / survival

If the operative wins, the player side withdraws/forfeits, `break_contact` resolves before defeat, or an authored intervention ends the confrontation before lethal success:

- `lethalObjectiveSuccess: false`;
- do not emit death from kill intent alone;
- emit the factual survival/escape/interruption outcome actually resolved.

Battle PL depletion remains combat-capability defeat semantics. The **death** is the encounter-level lethal-objective consequence, not a conversion of Battle PL into Health.

---

## 7. Detain objective resolver

Objective ID:

`detain_arc1_m1_unknown_operative`

Detain is a living-capture objective, not a relabelled lethal Battle.

The Story caller may expose this Battle branch only when it has already determined the Detain confrontation is legally available in context.

### Stage A — neutralise alive

The active detain side must first win/neutralise the operative under the normal Battle resolver while he remains alive.

This does **not** yet commit custody.

### Stage B — secure detention

After Stage A, the encounter performs an explicit `secure_detention` resolution step.

Capture succeeds only when all are true:

1. `detain_arc1_m1_unknown_operative` was the declared encounter objective;
2. `arc1_m1_unknown_operative` has been neutralised alive;
3. at least one Story-supplied active detain-side participant remains present and capable of completing the encounter resolution (not defeated, withdrawn or escaped);
4. the operative did not resolve `break_contact` before neutralisation;
5. no authored rescue/intervention/scene termination has superseded custody resolution.

On success:

- establish encounter-owned `detention_restraint` on `arc1_m1_unknown_operative`;
- `detention_restraint` is custody/control evidence, not Stun and not a permanent Combat Stat modifier;
- emit `captureOutcome: detained`;
- emit `operativeAlive: true`;
- emit custody/consequence evidence against the stable operative identity;
- do not emit death.

If Stage A succeeds but Stage B cannot legally complete, the Battle result is **not silently rewritten to captured**. Emit `captureOutcome: unresolved` plus the exact blocking reason (`no_active_securer`, `intervention`, or other authored factual reason). Story/World must continue from that factual unresolved state rather than inventing capture or escape.

If `break_contact` resolves before neutralisation, emit `captureOutcome: escaped`, `operativeAlive: true`.

No automatic post-defeat escape is created simply because capture fails.

---

## 8. Outcome / evidence envelope

A completed confrontation must emit enough factual evidence for Story/World/CE to commit consequences without reconstructing Combat from prose.

Required fields/semantics (runtime property names may adapt to existing schema):

```js
{
  encounterPackageId: "arc1_m1_unknown_operative_confrontation",
  sceneId: "scene_arc1_m1_whisper_major_contact",
  opportunityId: "arc1_m1_whisper_major_contact",
  eventId: "arc1_m1_whisper_major_contact_event",
  stableOpponentId: "arc1_m1_unknown_operative",
  observerProjectionKey: "observer_projection_unknown_operative",
  objectiveId: "kill_arc1_m1_unknown_operative" | "detain_arc1_m1_unknown_operative",
  activeParticipantIds: [],
  sideAssignments: {},
  battleResult: "opposing_side_won" | "operative_won" | "withdrawal" | "forfeit" | "escape" | "interrupted" | "invalid",
  lethalObjectiveSuccess: true | false | null,
  captureOutcome: "detained" | "escaped" | "unresolved" | "not_applicable",
  operativeAlive: true | false | "pending_consequence_commit",
  escapeActionOccurrenceId: null,
  detentionControlOccurrenceId: null,
  supportedInjuryFacts: [],
  actionOccurrenceIds: [],
  participantContributionEvidence: []
}
```

For a successful lethal objective, include the exact death consequence request/cause occurrence ID.

For successful detention, include the exact custody/restraint establishment occurrence ID.

For any persistent injury, include exact injury type, target stable participant and causal occurrence.

Do not infer relationship meaning, loyalty, approval, moral judgement, progression or Rank from these facts.

---

## 9. Invalid / false-history protections

- invalid action selection creates no committed action history;
- invalid `break_contact` creates no escape history and consumes no action opportunity;
- Kill choice without lethal victory creates no death;
- Battle victory on Detain without completed Stage B creates no custody fact;
- team membership creates no Battle participation fact;
- observer-safe projection creates no stable participant identity;
- later reveal creates no stable-ID mutation;
- no injury is persisted unless an exact supported occurrence emits it;
- no outcome may silently transform defeat into escape.

---

## 10. Coding-facing action summary

```js
const ARC1_M1_UNKNOWN_OPERATIVE_ACTIONS = [
  {
    id: "arc1_m1_unknown_operative_crushing_palm",
    discipline: "taijutsu",
    targetMode: "single_hostile",
    attackPL: 32,
    ordinaryStamina: true
  },
  {
    id: "arc1_m1_unknown_operative_chakra_edge",
    discipline: "bukijutsu_ninjutsu_assisted",
    targetMode: "single_hostile",
    attackPL: 36,
    ordinaryStamina: true
  },
  {
    id: "arc1_m1_unknown_operative_counter_lock",
    discipline: "taijutsu_physical_control",
    targetMode: "single_hostile",
    attackPL: 22,
    ordinaryStamina: true,
    rider: {
      kind: "physical_restraint",
      requiresPositiveFinalDamage: true,
      lifetime: "through_next_target_action_opportunity",
      stacking: "same_source_refresh"
    }
  },
  {
    id: "arc1_m1_unknown_operative_guarded_read",
    discipline: "combat_read_defence",
    targetMode: "self",
    attackPL: null,
    preventionRatio: 0.30,
    preventionOrder: "pre_stamina",
    consumesOn: "next_qualifying_direct_attack_pl_packet",
    expires: "start_of_next_owner_action_opportunity"
  },
  {
    id: "arc1_m1_unknown_operative_break_contact",
    discipline: "tactical_disengagement",
    targetMode: "encounter_self",
    attackPL: null,
    oncePerEncounter: true,
    maxRemainingUnderlyingBattlePLRatio: 0.25,
    requiresEscapeAllowed: true,
    rejectsWhileMovementRestrained: true,
    onSuccess: "operative_escaped"
  }
];
```

Schema names may adapt to current runtime conventions. IDs, values, ordering semantics and causal distinctions may not be altered by schema convenience.

---

## 11. Final Combat status

- operative prepared Battle palette: **CLOSED**;
- contextual wrist-break capability/evidence: **CLOSED**;
- Kill confrontation resolver: **CLOSED**;
- Detain confrontation resolver: **CLOSED**;
- escape semantics: **CLOSED**;
- participant-set boundary: **CLOSED**;
- death/capture/injury evidence envelope: **CLOSED**;
- new Combat design blocker before implementation: **NONE**.

Preserve:

**kill intent ≠ kill success**  
**detain intent ≠ capture success**  
**Battle PL defeat ≠ Health/death by itself**  
**escape action ≠ automatic defeat escape**  
**presence ≠ participation**  
**observer projection ≠ stable participant**  
**Enemy/Opposition identity ≠ collectible admission**
