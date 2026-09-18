# Shinobi Chronicles — Story-Wide Action-Derived Development, Reward and Capability-Choice Reconciliation

**Date:** 2026-09-18  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING REUSABLE CE RECONCILIATION — STORY / WORLD / BATTLE ACTION CONSEQUENCE PIPELINE CLOSED; CALLER-SPECIFIC CONTENT + IMPLEMENTATION SEPARATE**  
**Source issue:** #197  
**Primary priority:** Finish Shinobi Chronicles Alpha

## 1. Purpose

This contract closes the reusable cross-system rule requested by #197 after the Academy Kakashi reward/development audit proved the model in one concrete Origin.

The rule is intentionally **not Origin-specific**.

It applies wherever current/future Shinobi Chronicles Story, World Events, Formal Missions, side content or Battle occurrences expose legitimate Character actions that may create:

- Discipline Development EXP;
- provenance-bearing fieldcraft evidence;
- exact Special Jōnin qualification evidence;
- Knowledge / relationship / access / future-opportunity facts;
- material reward entitlement;
- Inventory ownership after a legitimate transaction.

It does not create a generic quest-XP system, universal hidden performance score, or automatic reward from button labels.

Canonical pipeline:

```text
authorised factual situation
-> eligible semantic action / capability affordance
-> player commits intent
-> owning resolver validates + materially executes action
-> committed factual action/result evidence
-> each owning consequence system independently evaluates that same provenance
-> idempotent receipts / factual history
-> presentation
```

Preserve:

> **choice visible != action committed**

> **action committed != guaranteed success**

> **action result != every consequence channel automatically**

> **mission complete != generic Progression**

---

## 2. Authority consumed

This reconciliation consumes, without reopening:

### World / Rewards
`Documentation/World/Academy Kakashi Origin Choice Battle Reward and Development Audit v1 2026-09-15.md`

### Progression / Development
`Documentation/Progression/Action Derived Discipline and Fieldcraft Development Contract 2026-09-15.md`

commit:
`54314cc29e1374783cae0a0d90654cc9a2316a45`

### Combat / Skills / Items / Weapons
`Documentation/Combat/SC_Combat_Academy_Kakashi_Reward_Action_Evidence_and_Item_Weapon_Source_Closure_2026-09-15.md`

commit:
`e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8`

### Acquisition / Inventory
`Documentation/Acquisition/Academy Kakashi Origin Reward Entitlement and Inventory Transaction Contract 2026-09-15.md`

commit:
`b83884adb70f1e74e62f96ab96848c1ec33704f9`

### Existing Special Jōnin evidence architecture
- `Documentation/Progression/Special Jonin Contextual Evidence Producer Projection Contract.md`
- `Documentation/Coordination/Specialist Action Progression and Special Jonin Evidence Reconciliation 2026-09-10.md`

Kakashi remains the first concrete consumer, not a one-off exception.

---

## 3. Story / Writing authoring rule

Writing may expose a capability-aware action as a player-facing decision when the Character legitimately has the relevant Knowledge / Access / capability and the situation causally supports it.

Examples:

- `Track the courier`;
- `Read the seal architecture`;
- `Stabilise the wound before pursuit`;
- `Use Genjutsu to separate the false memory`;
- `Close silently and disable him before he can call out`;
- `Throw a wire-guided kunai to pin the mechanism`.

Writing owns:

- the factual situation;
- the semantic protagonist intent;
- scene choreography;
- player-facing wording;
- what the Character can reasonably attempt from current Story/Knowledge context.

Writing does **not** own:

- Skill legality/effect;
- discipline tags;
- numeric Discipline EXP;
- Special Jōnin qualification;
- Inventory grant;
- item definition;
- Battle math;
- material reward amount unless separately acting under World/Rewards authority.

Canonical rule:

> **Story authors the opportunity/action seam; owning systems author what that action actually does and what persistent consequence it can create.**

A Story label such as `ATTACK`, `TRACK`, `PICKPOCKET`, `INTERROGATE`, `SEAL` or `KILL` never by itself identifies a discipline, Skill, qualification or reward.

---

## 4. Capability availability vs factual action

A Character capability may influence the scene in several distinct ways:

1. **eligibility** — the action appears because the capability/history makes the affordance legitimate;
2. **approach** — the action changes how the Character attempts the problem;
3. **resolver inputs** — capability/competence modifies legality, threshold, outcome set or effectiveness where the owning resolver permits;
4. **result** — the resolver commits success/failure/partial/interruption/etc.;
5. **development evidence** — the exact committed action/result may produce persistent development through the relevant owner;
6. **later history** — Story/World may remember that factual action/result.

Do not collapse these.

> **capability available != action selected**

> **action selected != material execution**

> **material execution != success**

> **success != mastery**

> **development evidence != ownership/access**

---

## 5. Canonical technical Discipline Development

Progression closes seven persistent discipline-development ledgers:

- Ninjutsu;
- Taijutsu;
- Genjutsu;
- Bukijutsu;
- Fūinjutsu;
- Kinjutsu;
- Stamina.

There is no generic Character/quest XP created by this contract.

### 5.1 Six technical disciplines

Only exact Combat / owning-resolver discipline tags may create action-derived technical Discipline EXP.

For one materially executed tagged action:

- `committed_attempt` = **+1**;
- `effective_execution` = **+2**;
- `exceptional_execution` = **+3** only where an authoritative source separately classifies that exact execution as exceptional.

These are mutually exclusive per exact action + discipline.

Do not infer exceptional status from:

- Battle victory;
- target rarity;
- damage amount;
- kill;
- mission tier;
- visible choice wording.

### 5.2 Technical discipline causal caps

Per subject, per causal Battle:

- maximum **6 EXP per technical discipline**.

Per subject, per ordinary non-Battle causal task/scene root:

- maximum **3 EXP per technical discipline** unless a separately authorised Training/Progression session defines another cap.

### 5.3 No-development cases

Zero action-derived Discipline EXP for:

- hover/selection only;
- precommit legality failure;
- cancelled action before material execution evidence;
- observer-only participation;
- teammate action attributed to the wrong participant;
- mission/Battle completion used as a substitute for missing action evidence;
- deterministic post-defeat KILL with no discipline-tagged method action;
- UI/save-load replay of an already-consumed source.

---

## 6. Stamina

Stamina is not granted for merely entering Battle, surviving turns, taking damage, winning, healing or completing a mission.

Battle Stamina development requires exact committed mitigation participation:

- positive hostile/direct packet reaches the Stamina stage;
- legitimate Effective Stamina actually participates;
- mitigation amount > 0.

Grant:

- **+1 Stamina Discipline Development EXP** per qualifying packet;
- maximum **2 Stamina EXP per subject per causal Battle**.

Non-Battle Stamina:

- only an explicitly authored genuine endurance occurrence;
- ordinary qualifying exertion = **+1**;
- separately authored high-exertion benchmark = **+2**;
- maximum **2 per subject per non-Battle causal root**.

---

## 7. Fieldcraft evidence

Persistent fieldcraft evidence is not a generic XP bar.

Current reusable evidence families include:

### `fieldcraft.stealth_approach`

Possible exact evidence:

- `covert_approach_attempt`;
- `undetected_positioning`;
- `covert_route_execution`.

### `fieldcraft.covert_acquisition`

Possible exact evidence:

- `covert_acquisition_attempt`;
- `unnoticed_transfer_execution`;
- `sleight_of_hand_control`.

Significance pattern:

- 1 = legitimate material attempt;
- 2 = effective demonstrated execution;
- 3 = exact separately-authored exceptional benchmark.

One causal source root creates at most one evidence record per subject + fieldcraft family. Later stronger facts inside that same root strengthen the same record rather than counterfeiting extra independent-source breadth.

Fieldcraft evidence does not automatically grant:

- a named Skill;
- Stats;
- PL;
- ownership;
- Rank;
- a Special Jōnin qualification.

---

## 8. Special Jōnin specialist evidence

Special Jōnin development remains provenance-bearing qualification evidence, not specialization XP.

Existing current Alpha catalogue/evaluator remains authoritative.

A committed action may project exact Special Jōnin evidence only if its factual contribution independently satisfies the exact qualification path/tag predicates.

Example:

`covert_operations.assassin`

requires factual competency evidence such as:

- `target_isolation`;
- `covert_execution`.

Therefore:

- open-Battle kill != Assassin evidence automatically;
- deterministic post-defeat KILL != Assassin evidence automatically;
- lethal intent != covert execution;
- an exact covert lethal method may qualify only when the source independently proves the relevant competency.

One factual occurrence may legitimately support both Discipline EXP and specialist evidence when each channel is independently justified.

No `assassinationXP`, `specializationXP` or generic hidden path meter is created.

---

## 9. Failed actions and later failure/loss

A legitimate action that materially executed but failed can still produce development.

For technical disciplines, this normally means `committed_attempt = +1` where the exact tagged action reached committed material execution.

For fieldcraft/specialist evidence, a factual attempt may preserve attempt-level evidence where the owning contract allows it.

A later:

- Battle loss;
- mission failure;
- package loss;
- target escape;
- route failure;

does not erase development already committed from earlier legitimate actions.

Preserve:

> **failure of objective != erasure of practice/history**

But precommit rejection/invalid action creates no development.

---

## 10. Material rewards remain separate

Material reward entitlement is authored by World / Missions / Events / Rewards or another exact owning source.

It may consume committed factual history such as:

- objective state;
- package custody;
- verified intelligence;
- live custody;
- exceptional authored benchmark;
- contractual completion;
- authored Battle result.

Material reward does not derive automatically from Discipline EXP or specialist evidence.

Likewise development does not require a material payout.

Canonical split:

```text
factual action/result
├─ Progression development
├─ fieldcraft / specialist evidence
├─ Knowledge / relationship / future opportunity
└─ World material entitlement
```

Each branch has its own owner and idempotence.

There is no universal morality or “performance” score joining them.

---

## 11. Entitlement -> Inventory ownership

Where a material Item/Weapon entitlement is authorised:

```text
exact reward entitlement
-> idempotent Acquisition / Inventory transaction receipt
-> persistent Inventory ownership
-> optional later preparation/equipment/use
```

Preserve:

- entitlement != ownership;
- ownership != equipped;
- equipped != used;
- item definition != owned instance;
- package/objective custody != Inventory ownership;
- opponent equipment != automatic loot.

Already owning another instance does not erase a legitimate independently sourced entitlement unless the item's own singleton semantics require reusing the existing instance; the entitlement receipt still remains source-scoped and idempotent.

No duplicate-compensation economy is invented by default.

---

## 12. Relationship / Knowledge / access / opportunity consequences

The same factual action/result may also create:

- observer-bounded Knowledge;
- Shared History / relationship facts;
- reputation/recognition evidence;
- custody;
- access;
- future World eligibility;
- later Story callbacks.

These channels are not generic rewards and are not automatically positive.

Examples:

- truthful report may create institutional Knowledge without making mission failure “success”;
- protecting a person may create Shared History without friendship XP;
- releasing/capturing/killing a participant creates factual history without a morality score;
- discovering a clue may create future opportunity without material payout.

---

## 13. Player-facing capability choices

Capability-aware player choices should be authored as **actions the Character can legitimately attempt**, not as passive stat checks disguised as buttons.

Good semantic shape:

```text
current factual situation
+ Character Knowledge/Access/Competence
-> exact capability-aware action becomes eligible
-> player commits it
-> owning resolver resolves it
```

Avoid:

- showing unavailable capabilities merely as teaser buttons unless UI authority explicitly supports disabled explanation;
- allowing a choice label to grant the capability it names;
- making capability possession guarantee success;
- making a successful one-off action permanently grant the capability by implication.

---

## 14. Runtime / persistence contract

Coding should implement this through existing factual occurrence / resolver / reward / Progression / Inventory owners rather than creating a universal quest-reward engine.

Every persistent consequence requires source provenance sufficient to dedupe.

Recommended semantic identities include:

- subject stable identity;
- causal source root;
- exact action occurrence;
- resolver/result occurrence;
- discipline / evidence / reward family;
- entitlement/transaction receipt.

UI reopen, dialogue replay, Story Recall, save/load and renderer refresh are projection boundaries only.

They cannot mint a second development/reward/evidence consequence.

---

## 15. No branch-label inference

Explicitly forbidden:

- `ATTACK` -> Taijutsu automatically;
- `PICKPOCKET` -> Bukijutsu automatically;
- `OBSERVE` -> Genjutsu automatically;
- `SEAL` -> Fūinjutsu automatically;
- `KILL` -> Kinjutsu automatically;
- `TRACK` -> Tracker-nin qualification automatically;
- `HEAL` -> Field Medic qualification automatically.

The actual committed method/action evidence owns the consequence.

---

## 16. Kakashi benchmark

Academy Kakashi remains the benchmark proving the architecture can simultaneously produce, from factual action history:

- Ryō material entitlement;
- field-recovery item entitlement;
- exceptional weapon entitlement;
- technical Discipline EXP;
- Stamina EXP;
- covert-approach evidence;
- covert-acquisition evidence;
- exact Special Jōnin evidence where genuinely demonstrated;
- Knowledge;
- participant disposition/custody history;
- later Story/World hooks.

No future consumer should clone a “Kakashi reward subsystem.”

It should author its own factual sources and consume this reusable architecture.

---

## 17. Ownership

### Writing / Story
Owns:
- scene facts;
- semantic player intent/action affordance;
- participant dialogue/choreography;
- Story continuation.

### World / Missions / Events / Rewards
Owns:
- event/mission factual context;
- contextual material reward entitlement;
- World consequence / opportunity authoring;
- failure/non-action handling.

### Combat / Skills / Items / Weapons
Owns:
- action legality;
- exact action effect;
- discipline/capability tags;
- compatible contextual Skills;
- Item/Weapon definitions.

### Progression / Development
Owns:
- Discipline EXP values/caps;
- fieldcraft evidence;
- development receipts;
- Special Jōnin producer integration where applicable.

### Acquisition / Inventory
Owns:
- entitlement-to-ownership transactions;
- exact persistent item/weapon instances;
- idempotent grant semantics.

### CE / Codex / Coordination
Owns:
- cross-domain non-collapse;
- factual occurrence/provenance integration;
- reusable causal ordering;
- collision resolution.

### Coding / Runtime
Owns:
- implementation;
- persistence;
- adapters;
- save/load;
- diagnostics;
- browser/Golden validation.

---

## 18. Activation rule for future content

No global bulk retrofit is required.

Apply this contract when a current Alpha or later caller actually exposes an exact action/capability/reward seam.

Do not bulk-activate every authored Skill or World seed merely because the generic architecture exists.

When a caller lacks an exact owner predicate:

- fail closed on that consequence;
- preserve the factual occurrence where possible;
- route only the missing exact predicate/value to the owning specialist.

---

## 19. Preserve

- PL != Progression;
- Rank != Progression;
- mission completion != Progression automatically;
- Battle victory != mission success;
- Battle loss != zero earned development;
- choice != action;
- action != success;
- failure != zero development automatically;
- discipline EXP != Skill ownership;
- fieldcraft evidence != discipline EXP;
- specialist evidence != specialization XP;
- evidence != qualification != Recognition != Rank;
- reward entitlement != Inventory ownership;
- custody != Inventory;
- opponent equipment != loot;
- relationship change != morality score;
- player-facing label != method evidence;
- presentation refresh != reroll/recommit;
- design closed != implemented != runtime validated != Golden GREEN.

# Canonical lock

> **Across Shinobi Chronicles, persistent development and rewards come from provenance-bearing committed actions and factual outcomes, not from quest completion labels or button text. Story/World author legitimate capability-aware actions; owning resolvers commit what actually happened; Progression, specialist evidence, Knowledge/relationships and material rewards independently consume that same factual provenance; Acquisition turns exact material entitlement into ownership; Coding preserves idempotence. Kakashi is the first benchmark, not a special-case engine.**
