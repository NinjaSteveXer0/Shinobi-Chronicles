# Shinobi Chronicles — Mission 7 Sanitisation Trio Combat Encounter Closure

**Date:** 2026-09-08  
**Status:** **COMBAT / SKILLS / ITEMS / WEAPONS — CLOSED FOR CURRENT ALPHA ENCOUNTER**  
**Source handoff:** GitHub issue #30  
**Upstream Registry/PL authority:** `Documentation/Registry/Mission 7 Sanitisation Trio Identity and PL Ratification.md`

---

## 1. Scope and authority consumed

This document closes the exact Combat package required to launch the current Arc 1 Mission 7 — **The Dead Transfer** Battle after `CHAIN SANITISATION ACTIVE`.

Combat consumes without alteration:

- `arc1_m7_sanitisation_sealer_01` — PL47 — Stats `42/31/34/50/42/37/44`;
- `arc1_m7_sanitisation_breacher_01` — PL47 — Stats `36/46/49/22/29/25/46`;
- `arc1_m7_sanitisation_warden_01` — PL46 — Stats `40/44/42/31/35/37/48`.

All three are separate persistent human Enemy/Opposition participants. Their observer projections remain presentation only.

No encounter multiplier, trio PL addition, random Battle-entry variation, mission-number scaling, player-relative scaling or hidden narrative invulnerability is authorised.

Preserve:

**three participants ≠ one additive PL pool**  
**observer projection ≠ stable participant identity**  
**role label ≠ faction proof**

---

## 2. Encounter package

Exact encounter package ID:

`arc1_m7_chain_sanitisation_active_encounter`

Opposition participant set is exactly:

- `arc1_m7_sanitisation_sealer_01`
- `arc1_m7_sanitisation_breacher_01`
- `arc1_m7_sanitisation_warden_01`

Story supplies the exact allied/other active participant set for the current occurrence. Combat must not infer attackers or defenders from scene presence, team membership, relationship, disagreement or nearby characters.

Story/World also supplies any exact evidence/object targets currently present and legally interactable in the encounter.

No generic hidden Battle formation bonus exists for the trio. Their danger emerges from distinct prepared Actions and factual interaction between independently committed occurrences.

There is **no Alpha combined-trio super-action** and no passive coordination multiplier.

---

## 3. Sealer prepared Action package

Actor:

`arc1_m7_sanitisation_sealer_01`

### 3.1 `arc1_m7_sanitisation_sealer_seal_shock`

Display: **Seal Shock**

- discipline: Ninjutsu / Fūinjutsu-assisted direct action;
- target: one valid hostile Battle participant;
- authored Attack PL: **20**;
- packet: one direct Battle-PL damage packet;
- ordinary Stamina mitigation: **yes**;
- no automatic Stun, Burning, chakra suppression, seal lock, displacement or injury;
- does not itself establish a sanitisation tag.

### 3.2 `arc1_m7_sanitisation_sealer_binding_script`

Display: **Binding Script**

- discipline: Fūinjutsu control;
- target: one valid hostile Battle participant;
- Attack PL: **none**;
- on valid committed resolution establishes exact-source state:

`sanitisation_binding`

- source: `arc1_m7_sanitisation_sealer_01`;
- lifetime: through the target's **next action opportunity**;
- blocks voluntary movement/reposition/disengage actions and any Action whose declared primary execution requires that blocked movement;
- does **not** block ordinary non-movement attacks, defensive actions, Items, dialogue/evidence events, chakra use generally or Transformation activation merely because they are actions;
- is **not Stun**;
- same-source reapplication refreshes the existing stream rather than stacking independent copies;
- other-source control remains independently addressable;
- expiration/removal never erases the establishment occurrence from history.

### 3.3 `arc1_m7_sanitisation_sealer_sanitisation_tag`

Display: **Sanitisation Tag**

This is the current Alpha evidence-targeting setup Action.

- discipline: Fūinjutsu / technical procedure;
- Attack PL: **none**;
- target type: one exact **Story/World-supplied non-living evidence/object target**;
- target must be present, stably addressable, and explicitly exposed as sanitisation-eligible by the current encounter contract;
- Combat must not infer eligibility from an object's name, art, rarity, inventory category or narrative importance;
- a carried object such as Menma's stabiliser tube is targetable only when the caller supplies that exact object reference as currently legal/exposed to this interaction;
- the hosted living carrier inside Menma is **not** automatically an evidence-object target and cannot be inferred as targetable from attachment alone;
- successful resolution establishes exact source-owned object state:

`sanitisation_tagged`

with at minimum:

- source participant ID;
- target evidence/object ID;
- establishing occurrence ID;
- current encounter ID.

The tag:

- does not itself destroy, delete, transfer or erase the target;
- does not erase prior Knowledge, Chronicle history or evidence already legitimately observed;
- does not automatically fire later without another authored Action;
- persists as a factual established mark until consumed, exactly removed, or the occurrence/object lifecycle legitimately ends;
- same source + same target refreshes rather than stacks.

There is no universal free `remove tag` command. Exact future anti-seal effects may remove it only if their own authority explicitly supports this state.

### 3.4 `arc1_m7_sanitisation_sealer_purge_commit`

Display: **Purge Commit**

This is the current Alpha sanitisation payoff Action.

- discipline: Fūinjutsu / technical procedure;
- Attack PL: **none**;
- target: one exact evidence/object target carrying a live `sanitisation_tagged` state established by this same Sealer;
- consumes the Sealer's normal action opportunity;
- requires the target to remain present/addressable and the Sealer to remain capable of taking the Action;
- if the Sealer is neutralised, withdrawn, captured or otherwise unable to act before this Action commits, **no automatic purge occurs**;
- invalid selection consumes no action and creates no purge history.

On valid successful resolution:

1. consume the live same-source sanitisation tag for execution purposes while preserving its historical establishment provenance;
2. emit factual occurrence:

`sanitisation_purge_completed`

against the exact target ID;
3. mark the target's **current encounter evidentiary payload** as sanitised/unavailable for the current objective;
4. emit the target/object consequence request for the owning World/Story/object authority to persist the corresponding factual sanitised state.

Important boundary:

- purge completion does **not** retroactively erase previously committed Chronicle evidence, prior observer Knowledge, prior possession history or the target's historical identity;
- purge does not imply physical annihilation of the object unless the object's owning authority separately defines its sanitised state that way;
- Battle UI/Story must not silently convert `sanitisation_purge_completed` into unrelated mission failure, death, ownership transfer or hidden faction reveal.

The two-step **Tag → Purge Commit** structure is deliberate. It creates a real intervention window without introducing random rolls or an invisible progress timer.

---

## 4. Breacher prepared Action package

Actor:

`arc1_m7_sanitisation_breacher_01`

### 4.1 `arc1_m7_sanitisation_breacher_breach_blade`

Display: **Breach Blade**

- discipline: Bukijutsu direct action;
- target: one valid hostile participant;
- Attack PL: **25**;
- one direct packet;
- ordinary Stamina mitigation: **yes**;
- no automatic Guard break, Bleeding, displacement, restraint or injury.

### 4.2 `arc1_m7_sanitisation_breacher_driving_knee`

Display: **Driving Knee**

- discipline: Taijutsu direct action;
- target: one valid hostile participant;
- Attack PL: **22**;
- one direct packet;
- ordinary Stamina mitigation: **yes**;
- no automatic Stun, knockback, fracture or restraint.

### 4.3 `arc1_m7_sanitisation_breacher_pursuit_cut`

Display: **Pursuit Cut**

- discipline: Bukijutsu pursuit action;
- target: one valid hostile participant;
- Attack PL: **24**;
- one direct packet;
- ordinary Stamina mitigation: **yes**;
- eligibility requires a committed factual voluntary movement/reposition/disengage occurrence by that target since the Breacher's previous action opportunity;
- the qualifying movement occurrence must be supplied/resolved by the live encounter state; Combat does not invent movement from animation or UI position;
- if no qualifying committed movement occurrence exists, selection is invalid and consumes no action;
- Pursuit Cut creates no hidden Speed/Evasion/accuracy Stat and does not rewind or cancel the prior movement occurrence.

### 4.4 `arc1_m7_sanitisation_breacher_guarded_entry`

Display: **Guarded Entry**

- discipline: close-range defensive setup;
- target: self;
- Attack PL: **none**;
- establishes source-owned defensive state:

`breacher_guarded_entry`

- prevents **25%** of the next qualifying direct Attack-PL packet before Stamina mitigation;
- consumed by the first qualifying packet;
- expires at the start of the Breacher's next action opportunity if unused;
- does not create a Defense/Speed/Evasion Stat or permanent resistance.

---

## 5. Warden prepared Action package

Actor:

`arc1_m7_sanitisation_warden_01`

### 5.1 `arc1_m7_sanitisation_warden_intercepting_strike`

Display: **Intercepting Strike**

- discipline: Taijutsu/Bukijutsu direct action;
- target: one valid hostile participant;
- Attack PL: **21**;
- one direct packet;
- ordinary Stamina mitigation: **yes**;
- no automatic restraint or escape denial merely from the name.

### 5.2 `arc1_m7_sanitisation_warden_containment_clamp`

Display: **Containment Clamp**

- discipline: Taijutsu control/direct action;
- target: one valid hostile participant;
- Attack PL: **17**;
- one direct packet with ordinary Stamina mitigation;
- only if the committed parent packet resolves `finalDamage > 0`, establish exact-source `physical_restraint`;
- lifetime: through the target's next action opportunity;
- not Stun;
- same-source refresh, no stacking;
- restraint removal/expiry preserves prior establishment provenance.

### 5.3 `arc1_m7_sanitisation_warden_exit_denial`

Display: **Exit Denial**

- discipline: containment/control;
- target: one valid hostile participant;
- Attack PL: **none**;
- establishes exact-source state:

`warden_exit_denial`

- lifetime: through the target's next action opportunity;
- blocks voluntary encounter-exit actions such as `disengage`, `break_contact`, `escape` or an exact route-exit Action while active;
- does **not** block ordinary attacks, defensive actions, Items or non-exit Actions;
- does not create a global arena lock and does not affect participants who were not targeted;
- if an attempted exit is invalid only because this state is active, the rejected pre-commit request consumes no action and creates no false escape occurrence;
- this state is not generic Stun, root or paralysis.

### 5.4 `arc1_m7_sanitisation_warden_braced_intercept`

Display: **Braced Intercept**

- discipline: defensive setup;
- target: self;
- Attack PL: **none**;
- establishes source-owned defensive state:

`warden_braced_intercept`

- prevents **30%** of the next qualifying direct Attack-PL packet before Stamina mitigation;
- consumed by the first qualifying packet;
- expires at the start of the Warden's next action opportunity if unused;
- no passive aura, ally-wide protection or hidden Defense Stat.

---

## 6. Prepared-action boundary

The exact current prepared palettes are the Actions above.

There is **no generic Basic Attack / Guard fallback** to fabricate for any of the three.

No Skill may infer:

- formal Rank;
- wider affiliation;
- bloodline;
- Transformation;
- Summon;
- hidden Speed/Agility;
- generic poison/burning;
- automatic injury;
- hidden capacity multiplier.

---

## 7. Interaction and coordination semantics

No dedicated trio-combination Action is required for current Alpha.

Coordination is factual and emerges only when separately committed Actions interact, for example:

- Warden restricts a participant's exit while Sealer spends a later action completing a purge;
- Breacher pressures a participant who has just repositioned;
- Sealer binds a participant while another operative performs an independently authored attack.

These interactions do not mutate Base Stats/PL and do not generate a generic `teamSynergy` multiplier.

Do not infer coordination merely because all three are alive or selected into the same encounter.

---

## 8. Evidence/object target contract

The current encounter may receive zero or more Story/World-supplied evidence targets.

Each target supplied for Sealer interaction must expose at minimum:

- exact stable/object occurrence reference;
- current presence/addressability;
- current holder/location context where relevant;
- whether it is currently sanitisation-eligible/exposed;
- current sanitisation state.

Combat does not own persistent object identity or mission inventory.

The encounter may report factual changes, but persistent object/world authority consumes those facts.

Menma's black stabiliser tube may use this interface if Story supplies its exact authoritative reference. Combat must not manufacture a tube ID from prose.

The living hosted carrier is a participant/entity relationship, not automatically a non-living evidence object. Sanitisation Tag cannot silently target, detach, kill, suppress or purge the carrier without separate explicit Hosted-Entity/Story/Combat authority.

Preserve:

**object presence ≠ object ownership**  
**evidence sanitised now ≠ prior history erased**  
**Hosted Entity ≠ evidence prop**

---

## 9. Encounter completion / Story-return envelope

Combat resolves Battle facts. It does not decide the entire Mission 7 story outcome.

At encounter completion/interruption, return at minimum:

- `encounterPackageId: arc1_m7_chain_sanitisation_active_encounter`;
- exact active participant IDs and side assignments supplied at Battle start;
- `battleCompleted`;
- `battleResult` using existing Battle-result authority;
- per sanitisation operative factual outcome, including where applicable: `active`, `neutralized`, `withdrawn`, `escaped`, `captured`, `dead` only when separately authorised by actual committed resolver consequences;
- action occurrence IDs;
- control/defence state occurrence IDs;
- exact evidence/object target IDs supplied to the encounter;
- per-target sanitisation state: `untouched`, `tagged`, `purge_completed`, or exact externally supplied/persisted equivalent;
- `sanitisationOutcome`:
  - `none` — no supplied target reached `purge_completed`;
  - `partial` — at least one but not all supplied targets reached `purge_completed`;
  - `complete` — every supplied sanitisation target reached `purge_completed`;
  - `not_applicable` — caller supplied no sanitisation target set;
- any factual exit-denial, restraint, pursuit and purge occurrences;
- supported injury/life/custody facts from the resolver;
- caller/Story continuation context.

`sanitisationOutcome` describes only the supplied target set. It is **not** automatic Mission success/failure.

Battle victory does not automatically mean:

- every evidence target was preserved;
- every operative was captured;
- every operative died;
- every Story objective was solved;
- the transfer chain remains safe;
- the hidden faction has been identified.

Likewise, one successful purge does not automatically mean the whole sanitisation mission succeeded.

---

## 10. Life-state and custody boundary

Each operative's death, survival, injury, custody, withdrawal or escape attaches to its stable participant ID, never its observer projection.

Battle-PL defeat remains capability defeat, not automatic death.

This encounter package does not independently author a blanket lethal objective or automatic capture rule. If current/future Story supplies an exact lethal or detention objective, use existing Combat/CE life-state semantics against the stable participant IDs and emit factual consequence evidence.

No defeated operative automatically escapes.

---

## 11. Required implementation regressions

Coding should verify at minimum:

1. Exact Base Stats/Base PL are consumed with no hidden scaling.
2. Sealer direct Attack resolves at PL20 with ordinary Stamina.
3. Binding Script blocks only its declared movement family and expires correctly; it is not Stun.
4. Sanitisation Tag rejects non-supplied/non-eligible targets without consuming an action or creating false history.
5. Tag alone does not purge evidence.
6. Purge Commit requires the same-source live tag and a capable Sealer, consumes a normal action, and records `sanitisation_purge_completed` only on valid resolution.
7. Purge cannot erase prior committed Chronicle/Knowledge history.
8. Hosted carrier is not implicitly targetable as an evidence object.
9. Breach Blade/Driving Knee/Pursuit Cut resolve exact Attack PL 25/22/24.
10. Pursuit Cut rejects without a qualifying committed target movement occurrence and never invents Speed/Evasion.
11. Guarded Entry prevention is 25% pre-Stamina, one qualifying packet, correct expiry.
12. Intercepting Strike/Containment Clamp resolve exact Attack PL 21/17.
13. Containment Clamp establishes restraint only after positive final damage and is not Stun.
14. Exit Denial blocks only exact encounter-exit Actions for its target and invalid attempts create no false history/no action consumption.
15. Braced Intercept prevention is 30% pre-Stamina, one qualifying packet, correct expiry.
16. No Basic/Guard fallback or trio multiplier appears.
17. Caller-supplied participant set is preserved; scene presence/team membership does not auto-add Combatants.
18. Observer projection keys never become life-state/persistence keys.
19. Per-target sanitisation outcome and Battle result remain separate; Battle victory does not manufacture mission success.
20. Save/load preserves source-owned tags/control/occurrences without duplicate projection or erased provenance.

---

## 12. Final Combat status

- Sealer prepared Action package: **CLOSED**;
- Breacher prepared Action package: **CLOSED**;
- Warden prepared Action package: **CLOSED**;
- sanitisation Tag → Purge semantics: **CLOSED**;
- evidence/object target interface: **CLOSED for current Alpha encounter**;
- Warden containment/exit denial: **CLOSED**;
- Breacher pursuit semantics: **CLOSED**;
- trio hidden multiplier/combo system: **NOT AUTHORISED / NOT REQUIRED**;
- encounter return envelope: **CLOSED**;
- Coding implementation/regression: **DOWNSTREAM SEND NOW**.

> **Combat has no remaining design blocker for the current Mission 7 sanitisation-trio Battle package.**
