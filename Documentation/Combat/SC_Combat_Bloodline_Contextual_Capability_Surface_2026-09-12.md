# Shinobi Chronicles — Bloodline Contextual Capability Surface

**Date:** 2026-09-12  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT / SKILLS BLOODLINE CONTEXTUAL AUTHORITY — ISSUE #128 CONSUMED / IMPLEMENTATION SEPARATE**

## 1. Purpose

This contract closes the Combat / Skills side of capability-responsive Bloodline use for Story / World / Mission / Event consumers.

It consumes and extends, without replacing:

- `Documentation/Combat/SC_Combat_Contextual_Passive_Active_Skill_Surface_2026-09-10.md`;
- `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave4_151-200.md`;
- `Documentation/Combat/Alpha_Skill_Catalogue_v1_Wave7_261-290_Passive_Contextual.md`;
- `Documentation/Coordination/Capability Responsive Story Outcome Families and Cross-Discipline Affordance Contract 2026-09-12.md`;
- `Documentation/World/Capability Responsive Story Affordance and Outcome Consumer Pack v1 2026-09-12.md`;
- the Wood Release possession / Access correction consumed through #85;
- the Mukai single-Byakugan possession / Access boundary consumed through #64;
- the Genin anti-backpropagation closure from #104;
- `Documentation/Combat/SC_Combat_Chronicle_Reaper_Chronicle_Scar_Bloodline_Lock_2026-09-12.md`.

Canonical purpose:

> **When an exact Bloodline capability is already legitimately possessed, accessible and—where required—active, Story / World may ask Combat to resolve bounded capability-specific observations, contextual actions, compatibility checks and factual evidence without creating a second Bloodline/event engine.**

This contract does **not** grant Bloodlines, unlock Access, create Progression gates, invent Stats/PL modifiers, author Story events or guarantee Story outcomes.

Preserve:

**representation possession != capability Access**  
**Bloodline possession != Access**  
**Access != Competence != Power != Mastery**  
**Stats != Bloodline Skills**  
**card art != runtime authority**  
**contextual query != automatic success**

---

## 2. Existing contextual architecture remains the engine surface

Bloodline contextual use reuses the already-closed modes:

- `battle_active`;
- `passive_contextual`;
- `active_contextual`;
- `hybrid_contextual`.

No universal `bloodline_check` is authorised.

A Bloodline route must address an exact capability / state / Skill / context, for example:

```text
capability.byakugan.access
+ exact active observation context
+ exact compatible Skill/effect
+ caller-supplied factual target/query
```

rather than:

```text
actorHasAnyBloodline == true -> special success
```

### 2.1 Generic Bloodline contextual request

A Story / World / Mission / Event caller may ask Combat to evaluate a Bloodline affordance using an envelope equivalent to:

```js
{
  actorRef,
  bloodlineFamily,
  capabilityRef,
  possessionRef?,
  accessRef,
  activationStateRef?,
  stageStateRef?,
  skillId?,
  executionMode,
  callerContextRef,
  targetRef?,
  queryRef?,
  factualEvidenceRefs: [],
  geometryOrSystemRef?,
  observerRefs: []
}
```

Runtime property names may adapt to existing implementation. The semantic separation may not be collapsed.

### 2.2 Evaluation order

A Bloodline contextual route resolves in this order:

1. **Possession / identity fact** where possession itself is relevant.
2. **Executable Access** must be legitimate when the effect requires use.
3. **Exact activation/stage state** must match where the Bloodline has multiple active states/forms.
4. **Skill/effect access** must be legitimate where a specific Skill is required.
5. The caller must supply a real factual context / target / query / object / route / system.
6. The Bloodline effect must be compatible with that exact context.
7. Resolve only the bounded capability effect.
8. Commit factual Bloodline/Skill history only if the capability materially participates in resolution.

If any required predicate fails, reject before commit.

Invalid selection / invalid target / missing Access / incompatible state:

- consumes no Battle action if rejected precommit;
- consumes no contextual opportunity if rejected precommit;
- creates no false Bloodline-use occurrence;
- creates no observer evidence merely because the UI offered or inspected an option.

### 2.3 Passive contextual Bloodline use

Passive Bloodline observation follows the existing passive contract:

- polling is side-effect-free;
- UI refresh does not create history;
- a passive does not create its own clue, target, observer, seal, chakra trace, person or terrain feature;
- the passive may expose bounded information / compatibility / warning / option only from caller-supplied facts;
- no compatible context means dormant, not failed.

### 2.4 Active contextual Bloodline use

Active use requires deliberate invocation against a caller-supplied context.

Outside Battle:

- no Battle action is consumed;
- one contextual interaction/action opportunity may be consumed where the caller models one.

Inside Battle:

- normal Character action consumption applies unless exact authority says otherwise.

An active Bloodline action cannot fabricate a route, material, target, system, seal, obstruction, witness or environmental state merely to make itself useful.

### 2.5 Battle-to-Story carryover

Story may consume committed factual Battle consequences created by Bloodline use, including where supported:

- a target was restrained through an exact Bloodline effect;
- a barrier/construct existed during a committed Battle state;
- a visible Bloodline activation was observed;
- a chakra pattern / motion / environmental response was legitimately recorded;
- an exact object/location/participant state was materially changed by an authored effect.

Story must not infer:

- custody from Battle victory;
- identity from observed eye activation;
- permanent terrain change from a temporary Battle construct;
- Mastery from one successful action;
- hidden Skill inventory from one observed Technique;
- permanent Stat/PL change from a temporary effect.

### 2.6 Save/load and idempotence

Persist exact committed facts, not UI evaluation noise.

Where applicable preserve:

- stable actor/person/representation ref;
- exact Bloodline/capability ref;
- exact activation/stage state ref;
- exact Skill/effect ref;
- caller/context/target refs;
- factual result/evidence refs;
- observer refs that genuinely had access;
- provenance/occurrence refs;
- persistent source-owned states only where their owning authority says they survive save/load.

Reloading, inspecting, reopening UI or re-running eligibility against unchanged committed history must not create a second occurrence or reroll a result.

---

# 3. Observer evidence from Bloodline use

Visible/material Bloodline use may create bounded observer evidence.

The evidence chain is:

```text
committed Bloodline activation/effect
-> legitimate observer access/perceptibility
-> bounded observation fact
-> optional observer belief/inference under Knowledge authority
```

Safe observation facts may include:

- `distinctive_eye_activation_observed`;
- `unusual_ocular_chakra_state_observed`;
- `wood_forming_technique_observed`;
- `bloodline_material_interaction_observed`;
- `unusual_chakra_perception_behavior_observed`;
- `chronicle_scar_expression_manifestation_observed` where an exact expression later authorises visible manifestation.

An observer may identify a Bloodline family only where that observer has legitimate comparison/Knowledge authority.

Observed Bloodline use does **not** automatically prove:

- true identity;
- clan membership;
- parentage;
- formal Rank;
- allegiance;
- institutional affiliation;
- complete Bloodline stage;
- Mastery;
- all owned Skills;
- every hidden Bloodline capability;
- motive/personality.

A witness may legitimately know only:

> “I saw an unusual eye/chakra/wood-forming technique.”

while a specialist with prior Knowledge may legitimately know:

> “That activation is consistent with Byakugan / Sharingan / Wood Release.”

Those are different observer Knowledge states.

---

# 4. Cost / exposure hooks

Bloodline routes are not universally superior routes.

Where factual use supports it, Combat may emit hooks that Story / World can later consume, such as:

- rare capability visibly exposed;
- exact activation/use witnessed;
- distinctive physical/chakra residue left by an authored technique;
- known observer now has capability-family evidence;
- prior Bloodline use becomes legitimate future counter-preparation evidence;
- current activation exhausted/limited **only if exact Bloodline mechanics already author that cost**;
- Bloodline use altered an object/location/participant state in a way that remains factual after the event.

Combat does not author political/reputation consequences from those hooks.

World / Story / Relationship / Institution authority decides whether a later actor actually reacts.

No generic Bloodline fatigue, reputation penalty, persecution score or rarity multiplier is introduced here.

---

# 5. BYAKUGAN contextual surface

## 5.1 Access boundary

Executable Byakugan effects require legitimate active Byakugan Access.

Current hard preserves:

- `genin_mukai` visibly possesses a single Byakugan as representation/possession fact, but this does not grant executable Access;
- `genin_hiashi` Hyūga identity does not automatically grant active Byakugan;
- card art / clan identity / Stats do not establish Access;
- this contract does not unlock Mukai or Hiashi.

Exact Progression / Bloodline / Development activation gates remain their owner’s authority.

## 5.2 Existing Skill surfaces

### `skill_byakugan_chakra_read`

Existing catalogue effect:

- bounded chakra-network read;
- legitimate sensory access required;
- no omniscient identity.

This contract authorises that same effect as an `active_contextual` information query when:

- `capability.byakugan.access` is true;
- the actor legitimately has the Skill/effect available;
- the caller supplies one exact accessible subject/system/area of observation;
- the current Byakugan state/geometry allows observation.

It may expose bounded facts such as:

- presence / absence of observable chakra pathways;
- coarse flow disturbance / blockage / concentration patterns;
- localised chakra anomalies;
- whether a visible/accessible seal or chakra-system interaction appears to alter local flow;
- comparison against an exact prior known chakra-network pattern where comparison authority exists.

It does not automatically diagnose medicine, name a Bloodline, infer identity or solve a seal.

### `skill_byakugan_peripheral_detail`

Existing mode remains:

`passive_contextual`

Requirements remain:

`capability.byakugan.access + learned_skill_access`

It may expose additional bounded peripheral visual/chakra detail that is genuinely within the current authorised Byakugan observation field.

It cannot create information outside that field.

## 5.3 Observation geometry / obstruction semantics

Byakugan is not ordinary eyesight, but this contract does not invent one universal numeric radius or one universal “sees through everything” flag.

Story/World must supply or reference the current authorised observation geometry/state.

A contextual Byakugan query may legitimately observe a concealed participant / chakra source through ordinary visual obstruction **only where the current active Byakugan state and caller geometry mark that target as within Byakugan sensory reach**.

Therefore:

- ordinary visual occlusion does not automatically equal Byakugan occlusion;
- distance / geometry / specialised barriers / chakra suppression / authored anti-sensory materials or systems may still limit the read where their own authority says so;
- no global wall-truth, whole-building scan or map-wide reveal is authorised;
- no numeric range is invented here where representation/Progression authority has not authored one.

If the caller cannot establish whether a target is inside legitimate Byakugan observation scope, the result is `insufficient_observation_authority`, not silent omniscience.

## 5.4 Attention

Active chakra-network inspection is directed attention.

The user does not automatically receive every possible detail in the entire observation field at all times.

`skill_byakugan_peripheral_detail` may supplement an authorised active observation with bounded peripheral cues, but it still does not turn the Character into an always-on omniscient sensor.

## 5.5 Seal / chakra-system anomalies

Where a seal/barrier/chakra system produces an actually visible chakra-flow effect within authorised scope, Byakugan may expose:

- that chakra flow is being altered;
- where a flow discontinuity/concentration appears;
- whether an accessible system has a visible chakra-fed component;
- comparison evidence with a previously observed pattern.

It does **not** by itself provide:

- seal formula literacy;
- release key;
- counterseal authority;
- ownership/permission;
- hidden room truth;
- automatic bypass.

Fūinjutsu Skills remain separate.

## 5.6 Byakugan does NOT automatically provide

- true identity;
- clan;
- affiliation;
- formal Rank;
- motive;
- personality;
- exact Stats / Battle PL;
- all Bloodlines;
- all transformations;
- universal lie detection;
- universal medical diagnosis;
- universal barrier solution;
- omniscience;
- permanent Knowledge of things never legitimately observed.

## 5.7 CE / World outcome-family compatibility

Current Byakugan surface may legitimately feed, where an event is authored for it:

- **Perception / Knowledge** — primary;
- **Access / Position / Reach** — only indirectly through better route/safety information, never by teleport/bypass;
- **Preservation / Recovery / Evidence** — by identifying observable chakra/anomaly evidence before destructive interaction;
- **Development / Capability Evidence** — legitimate use evidence only;
- **Future Eligibility / Opportunity Lineage** — later follow-up based on actually observed anomaly/capability;
- **Cost / Risk / Observer Exposure** — visible activation can expose the capability.

Byakugan alone does not establish Control/Custody, transformation of World state, relationship consequence or reward entitlement.

---

# 6. SHARINGAN contextual surface

## 6.1 Access and stage/state boundary

Sharingan use requires legitimate Sharingan Access.

Current Genin hard preserve:

- `genin_kagami` Uchiha identity does not grant Sharingan;
- Uchiha surname / card art / famous future capability does not back-propagate active Sharingan;
- this contract does not unlock Sharingan for any representation.

Any contextual Sharingan request that depends on a specific stage/form must carry an exact `sharinganStateRef` / equivalent current state.

Do not collapse:

- one-tomoe / later-tomoe / Mangekyō / Eternal Mangekyō / other separately authored forms;
- ordinary Sharingan Access and a future advanced state;
- visible activation and Mastery.

If the exact state is not known/authorised, only semantics common to the currently proven state may resolve.

## 6.2 Existing Skill surfaces

### `skill_sharingan_motion_read`

Existing effect:

- bounded motion-read evidence from observable target actions;
- no future sight.

This contract authorises the same effect as an `active_contextual` information query when:

- `capability.sharingan.access` is true;
- the exact current Sharingan state permits the read;
- the actor legitimately has the Skill/effect available;
- the caller provides a currently observable movement/action/technique execution.

Possible bounded outputs include:

- movement sequence/order evidence;
- repeated stance/gesture/hand-sign pattern evidence;
- observable timing/trajectory differences;
- comparison with an exact prior observed pattern.

It does not reveal an unperformed next move.

### `skill_sharingan_pattern_retention`

Existing mode remains:

`passive_contextual`

Requirements remain:

`capability.sharingan.access + learned_skill_access`

It may preserve one exact legitimately observed motion / hand-sign / visible execution-pattern evidence reference for later comparison.

It does **not**:

- copy the Skill;
- grant learned access;
- grant elemental affinity;
- grant equipment/source prerequisites;
- reproduce hidden steps;
- grant Competence/Mastery;
- bypass capability gates.

## 6.3 Genjutsu / perception interaction

Sharingan does not receive a universal `break_genjutsu` contextual power from this contract.

If an exact Sharingan state / Skill / Progression authority later grants:

- perception-disruption recognition;
- Genjutsu resistance;
- Genjutsu casting;
- ocular control/countermeasure;

then that exact effect may participate through the existing contextual Skill architecture.

The current closed baseline Sharingan rows authorise motion analysis and retained observed-pattern evidence only.

Do not infer additional ocular powers merely from `capability.sharingan.access`.

## 6.4 Recognition / technique evidence

A legitimate Sharingan observation may preserve evidence that:

- a visible hand-sign sequence occurred;
- a visible movement pattern matched/differed from a prior observed pattern;
- a specific observable execution detail was seen.

It does not automatically establish:

- the Skill’s hidden mechanics;
- the user's internal chakra method;
- ownership/mastery of that Skill by the observer;
- the target’s identity/allegiance/Rank;
- a copied Technique.

## 6.5 Sharingan does NOT automatically provide

- future sight;
- universal technique copying;
- instant Skill learning;
- universal Genjutsu immunity;
- universal Genjutsu casting;
- mind reading;
- truth detection;
- hidden identity recognition;
- exact Stats / PL;
- every later Sharingan-stage ability;
- Mangekyō/Eternal abilities from ordinary Sharingan Access.

## 6.6 CE / World outcome-family compatibility

Current Sharingan surface may feed:

- **Perception / Knowledge** — primary;
- **Preservation / Recovery / Evidence** — exact observed-pattern retention;
- **Development / Capability Evidence** — legitimate observation/use evidence;
- **Future Eligibility / Opportunity Lineage** — later comparison/counter-preparation/follow-up based on committed observations;
- **Cost / Risk / Observer Exposure** — visible ocular activation can expose capability evidence.

Access/Control/Transformation/Relationship consequences require some separate exact technique or downstream authority; they do not arise from baseline Sharingan observation alone.

---

# 7. WOOD RELEASE contextual surface

## 7.1 Possession / Access boundary

Current explicit authority:

- `genin_hashirama` possesses Wood Release from representation start;
- `genin_yamato` possesses Wood Release from representation start;
- `capability.wood_release.access = false` by default for those Genin representations until legitimate Progression / Bloodline / Development authority changes Access;
- possession grants no starting Wood Release Skills, prepared palette, Competence, Power, Mastery, Stat modifier or hidden PL.

This contract does not change those gates.

## 7.2 Passive environmental response

### `skill_wood_release_environmental_response`

Existing mode remains:

`passive_contextual`

Requirements:

`capability.wood_release.access + learned_skill_access`

In a context containing actual plant / wood / chakra interaction evidence, it may expose bounded compatibility/response cues for the user's Wood Release.

Safe outputs may include:

- `compatible_response_present`;
- `partial_response`;
- `no_observable_response`;
- `incompatible_or_blocked`;
- bounded location/material/chakra-response evidence supplied by the actual context.

It cannot create terrain, wood, plants or a route merely by being checked.

## 7.3 Active contextual Wood Release — exact-Technique-only rule

Wood Release has no generic contextual verb such as `make_wood_thing`.

An active Story/World Wood Release action must cite an exact learned/accessible Wood Release Skill whose existing effect is compatible with the caller’s factual pressure.

Current catalogue presence alone is not Access.

### Current contextual-compatible control technique

`skill_wood_release_seeded_snare`

Existing semantics:

- one hostile;
- source-owned root restraint through target next action;
- not Stun.

This contract additionally authorises `active_contextual` invocation where:

- Wood Release Access is legitimate;
- the actor legitimately has this Skill available;
- Story/World exposes one exact physical target / movement / escape interaction;
- the environment is factually compatible with the technique;
- the target is valid for physical restraint.

Contextual result:

- source-owned temporary root restraint may block the exact target’s next caller-defined voluntary movement/escape/reposition opportunity;
- no Battle-PL damage is introduced;
- restraint != custody;
- restraint != unconsciousness;
- restraint != permanent imprisonment;
- invalid material/target/context rejects precommit.

This gives World a real Wood Release control affordance without inventing a new resolver.

### Multi-target contextual restraint

`skill_wood_release_deep_forest_emergence`

Existing semantics:

- control up to 3 hostiles;
- forest restraint through next action;
- no damage;
- not Stun;
- no persistent terrain ownership.

This contract authorises `active_contextual` use only when the caller exposes an exact temporary physical-restraint pressure with up to three valid participants.

The contextual use preserves the same limits:

- temporary restraint only;
- no automatic capture/custody;
- no permanent forest;
- no ownership of transformed geography;
- no hidden damage;
- no mission success automatically.

## 7.4 Wood techniques that remain Battle-only / not generic World verbs

This contract does **not** automatically convert all Wood Release battle rows into free contextual tools.

In particular, direct-damage packet techniques and packet-prevention guards retain their authored Battle semantics unless a future exact contextual extension is separately closed.

Current rows such as:

- `skill_wood_release_branching_spear`;
- `skill_wood_release_root_bind` direct packet component;
- `skill_wood_release_forest_burst`;
- `skill_wood_release_wood_dragon`;
- `skill_wood_release_great_tree_domain`;
- Battle packet-prevention semantics of Timber Guard / Flowering Barrier;

must not be reinterpreted as generic Story destruction, permanent architecture, healing, terrain ownership or infrastructure repair.

## 7.5 Environmental stabilisation / transformation boundary

Wood Release **may** participate in environment-state outcomes only where an exact technique actually authors the required physical effect.

The current catalogue does **not** author a generic:

- building repair;
- bridge creation;
- permanent forest creation;
- structural reinforcement;
- ecosystem restoration;
- chakra-seal neutralisation;
- arbitrary terrain reshaping

contextual Skill.

World may author a future opportunity that would logically suit such a capability, but Combat must author/approve the exact technique semantics before execution.

`skill_wood_release_environmental_response` may identify compatibility; it does not perform the transformation.

## 7.6 Seal/environment interaction

Wood Release may interact with a seal/chakra system only when:

- the exact caller context exposes a physical/chakra interaction with wood/living terrain; and
- the exact Wood Release Skill/effect is compatible.

Wood Release Access alone does not grant:

- Fūinjutsu literacy;
- seal decoding;
- seal release;
- counterseal;
- barrier bypass.

## 7.7 Provenance / evidence left by use

Committed Wood Release use may create factual evidence such as:

- source-owned Wood Release construct/restraint occurrence;
- modified local physical state where an exact effect truly changed it;
- visible wood-forming/chakra evidence;
- observer evidence from legitimate witnesses;
- material remnants only if the exact effect/World state says remnants persist.

Do not assume every temporary construct leaves recoverable permanent material.

## 7.8 CE / World outcome-family compatibility

Current Wood Release surface may feed:

- **Perception / Knowledge** — via Environmental Response;
- **Control / Custody / Escape** — temporary restraint may change movement/escape, but does not establish custody;
- **Preservation / Recovery / Evidence** — where exact temporary control protects a person/object or preserves factual evidence;
- **Transformation / State Change** — only when an exact authored Wood technique truly changes World state; current generic permanent transformation remains unclosed;
- **Development / Capability Evidence** — legitimate use;
- **Future Eligibility / Opportunity Lineage** — prior visible/material Wood Release use may seed later consumers;
- **Cost / Risk / Observer Exposure** — Wood Release is materially distinctive when witnessed.

Access / Position / Reach may change only where an exact physical effect creates/denies a route; no generic traversal authority is implied.

---

# 8. CHRONICLE SCAR contextual surface

## 8.1 Bloodline owner and persistence

Chronicle Scar is the canonical Bloodline of persistent identity:

`chronicle_reaper`

It persists across:

`CHRONICLE REAPER -> CHRONICLE WRAITH -> later same-person stages`

Stage transition does not reroll/remove/duplicate the Bloodline.

## 8.2 Core history-responsive mechanism preserved

Existing rule remains:

> **Major legitimate committed life events may leave persistent chakra scars that later Chronicle Scar techniques, passives or compatibility checks can reference.**

But:

`event happened -> automatic power`

is forbidden.

Preserve:

`committed qualifying history -> potential scar fact -> legitimate Progression/access -> exact authored scar expression`.

## 8.3 Contextual compatibility query

Because exact individual scar expressions are intentionally not yet authored, Chronicle Scar currently receives a **compatibility/eligibility surface, not a generic executable power**.

Story/World may ask whether an already-authorised developed scar expression is compatible with a current factual context.

Required inputs:

- actor is the correct persistent Bloodline owner;
- exact scar-expression ref exists;
- exact scar-expression Access is legitimately satisfied by Progression / Development authority;
- exact provenance/qualifying-history refs exist;
- caller supplies a factual current context and compatibility query.

Safe result classes may include:

- `compatible`;
- `partial_or_conditional`;
- `incompatible`;
- `insufficient_evidence`;
- `expression_not_accessible`.

The query itself:

- does not create a scar;
- does not grant an expression;
- does not reveal hidden committed history to an observer automatically;
- does not add Stats/PL;
- does not invent a technique.

## 8.4 Character Knowledge / manifestation boundary

A server-side/contextual compatibility result is not automatically Character Knowledge.

The actor may only consciously sense/recognise/use a Chronicle Scar expression when that exact future expression’s semantics authorise it.

Likewise, observers do not automatically see hidden chakra scars.

Observer evidence exists only if an exact scar expression later manifests in a visible/material/perceptible way and the observer legitimately perceives it.

## 8.5 Current no-executable-Skill lock

At the date of this contract, Chronicle Scar has:

- canonical Bloodline owner;
- persistence semantics;
- history/provenance mechanism;
- contextual compatibility grammar;

but **no closed executable passive/active Skill list**.

Therefore World/Story may author future history-responsive eligibility consumers, but may not invent the resulting power/effect.

Exact scar taxonomy, trigger thresholds, inherited rules, individual expressions, Battle values and stage repertoires remain separately deferred.

## 8.6 CE / World outcome-family compatibility

Current Chronicle Scar surface may legitimately feed:

- **Development / Capability Evidence** — primary;
- **Future Eligibility / Opportunity Lineage** — primary;
- **Perception / Knowledge** only where a future exact expression authors conscious recognition;
- **Cost / Risk / Observer Exposure** only where a future exact expression visibly/materially manifests;
- any other family only when the exact scar expression later authorises it.

Chronicle Scar possession by itself currently grants no Control, traversal, transformation, recovery, social authority or reward entitlement.

---

# 9. Audit of other current lineage/capability families

This contract deliberately does **not** relabel every clan/capability package as a Bloodline.

The current catalogue contains capability-specific families including:

- Gentle Fist;
- Nara shadow arts;
- Yamanaka mind arts;
- Akimichi expansion;
- Inuzuka beast arts;
- Kikaichū arts;
- Ink arts;
- Uzumaki sealing chains;
- Eight Gates;
- Hosted-Entity relationships;
- Tailed-Beast/Kurama relationships.

These remain their existing capability/clan/relationship/training categories unless separate durable authority explicitly classifies a given family as a Bloodline.

Likewise:

- Curse/Seal states and Transformations are not silently Bloodlines;
- Hosted Entities are not Bloodlines;
- Summons are not Bloodlines;
- clan surname is not Bloodline Access;
- famous canon future is not current representation authority.

### Current audit result

Beyond Byakugan, Sharingan, Wood Release and the newly locked Chronicle Scar family, this audit found no additional Bloodline family with sufficiently exact current durable possession/access/contextual semantics that must be added to this contract now.

If future Registry/Progression authority establishes another Bloodline, Combat should extend this contract or publish a tightly scoped addendum rather than inferring effects from art/surname/Stats.

---

# 10. Exact current missing-owner dependencies

This contract closes **effect semantics**, not unlock gates.

The following are known unresolved/deferred access dependencies:

### Mukai single Byakugan

- possession/representation fact: established;
- exact activation/use requirements: **not yet closed by Progression / Bloodline / Development**;
- Combat effect surface once active: now closed here.

No downstream SEND NOW issue is required until a concrete playable/current Story consumer actually needs Mukai’s activation gate.

### Genin Hiashi Byakugan

- lineage/name does not grant Access;
- no exact Genin active-Byakugan gate is supplied here;
- Combat effect surface once active: now closed generically.

### Genin Kagami Sharingan

- Uchiha identity does not grant Sharingan;
- no exact Genin Sharingan activation/stage authority is supplied here;
- Combat effect surface once an exact Sharingan state is legitimately active: now closed.

### Hashirama / Yamato Wood Release

- possession = established;
- current Genin Access defaults false under existing authority;
- Progression / Bloodline / Development owns future Access change;
- Combat contextual effects once Access and Skill access are legitimate: now closed.

### Chronicle Reaper / Chronicle Scar

- Bloodline association = established;
- exact scar-expression taxonomy / Access / Skill package intentionally deferred;
- current compatibility grammar is closed, but no executable scar expression should be invented.

These are not contradictions. They are owner boundaries.

---

# 11. Story / World consumer compatibility

This contract is designed to satisfy World consumer families including:

`story_aff_blood_01_exact_perception_or_material_interaction`

and:

`story_aff_blood_02_bloodline_seen_followup`

without making either consumer a grant or guaranteed outcome.

### `story_aff_blood_01_exact_perception_or_material_interaction`

World may supply a factual pressure and exact Bloodline predicate.

Combat resolves only the exact capability effect described in this contract / exact Skill authority.

Possible legal examples:

- active Byakugan reads bounded chakra-flow evidence in an authorised observation volume;
- Sharingan preserves exact observed motion-pattern evidence;
- Wood Release Environmental Response detects compatibility with a real plant/wood/chakra interaction;
- Seeded Snare temporarily blocks one exact escape/reposition opportunity;
- a future authorised Chronicle Scar expression is evaluated against exact qualifying scar provenance.

### `story_aff_blood_02_bloodline_seen_followup`

World may later create an event candidate because a legitimate observer previously witnessed Bloodline use.

Required source:

- committed Bloodline activation/effect occurrence;
- legitimate observer access;
- bounded observation/Knowledge evidence.

The later consequence is World/Story authority.

Combat supplies the factual evidence only.

---

# 12. Hard non-collapse locks

- representation possession != capability Access;
- Bloodline possession != Access;
- Access != Competence != Power != Mastery;
- Bloodline != personality;
- clan identity != active Bloodline;
- Stats != Bloodline Skills;
- card art != runtime authority;
- passive evaluation != committed history;
- contextual query != automatic success;
- Bloodline route != objectively superior route;
- observer saw activation != observer knows true identity;
- observer identified Bloodline != observer knows complete repertoire;
- Bloodline observation != Rank/allegiance/motive Knowledge;
- Battle effect != Story result automatically;
- temporary restraint != custody;
- temporary construct != permanent World state;
- Story/World event existence != Combat-owned;
- Progression unlock/gate != Combat-owned;
- PL/Stat mutation != Combat authority where Base/Effective PL calculation belongs to PL;
- reward entitlement != Combat authority;
- no hidden direct PL bonus;
- catalogue presence != ownership/access/prepared state;
- lineage != Access;
- same Bloodline != same developed repertoire;
- Chronicle Scar history responsiveness != free power from trauma.

---

# 13. Implementation / runtime status

This document is semantic authority only.

It does not claim:

- generic contextual Skill dispatcher implemented;
- Bloodline runtime projection implemented;
- save/load validated;
- current Story consumers wired;
- browser Golden GREEN.

Existing #86 remains the generic contextual Skill runtime lane.

No new Coding handoff is created by this closure because #128 explicitly does not schedule a new implementation lane and no concrete current Alpha consumer requires a separate bespoke engine.

World/Story may now author/consume exact Bloodline affordances against this contract without inventing Bloodline effects.

---

## Final lock

> **Bloodline-responsive Story uses exact capability, exact Access/state, exact caller context and bounded Combat-owned effect semantics. Byakugan can provide bounded chakra/perceptual reads; Sharingan can provide bounded motion/pattern observation and retention; Wood Release can provide exact environmental-response and selected authored restraint interactions; Chronicle Scar can expose provenance-backed compatibility only after exact scar expressions are legitimately developed. Possession, lineage, art, Stats and famous future canon never substitute for Access or effect authority.**
