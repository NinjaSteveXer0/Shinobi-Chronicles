# Shinobi Chronicles — Action-Derived Discipline and Fieldcraft Development Contract

**Date:** 2026-09-15  
**Owner:** Progression / Development  
**Status:** **BINDING ALPHA PROGRESSION AUTHORITY — REUSABLE STORY/WORLD/BATTLE ACTION DEVELOPMENT CONTRACT**  
**Activation:** GitHub #199 / parent #197

## 1. Purpose

This contract closes the Progression / Development owner fields requested by GitHub #199 after the Academy Kakashi Origin reward/development audit.

It is intentionally reusable beyond Kakashi and beyond Origins. It defines what legitimate committed actions may contribute to persistent development without creating generic quest XP, hidden specialization XP, automatic Skill ownership, direct PL rewards, or action-label inference.

It consumes without reopening:

- `Documentation/World/Academy Kakashi Origin Choice Battle Reward and Development Audit v1 2026-09-15.md`;
- `Documentation/Combat/SC_Combat_Academy_Kakashi_Reward_Action_Evidence_and_Item_Weapon_Source_Closure_2026-09-15.md`;
- `Documentation/Coordination/Specialist Action Progression and Special Jonin Evidence Reconciliation 2026-09-10.md`;
- `Documentation/Progression/Special Jonin Contextual Evidence Producer Projection Contract.md`;
- `Documentation/PL_Registry_Rank_Alpha_Authority.md`.

Preserve throughout:

**Story choice != Progression**  
**legal action != automatic success**  
**failed action != zero development automatically**  
**discipline EXP != Skill ownership/access/mastery**  
**fieldcraft evidence != discipline EXP**  
**Special Jōnin evidence != specialization XP**  
**development != direct PL reward**  
**Battle loss != erased earned development**

---

## 2. Canonical discipline-development resource

Progression authorises persistent **Discipline Development EXP** for the seven canonical Stat disciplines:

- `ninjutsu`
- `taijutsu`
- `genjutsu`
- `bukijutsu`
- `fuinjutsu`
- `kinjutsu`
- `stamina`

This is seven discipline-specific development ledgers, not one generic Character XP currency.

It is not:

- quest XP;
- Skill XP;
- Special Jōnin specialization XP;
- Rank XP;
- direct Stat gain from each action;
- direct PL gain from each action.

The resource records persistent earned discipline development. Any downstream mastery/milestone/Stat conversion must consume the authoritative discipline-development system separately. This contract does not invent or alter a Stat-up threshold merely to close Kakashi rewards.

If a runtime surface currently lacks an authoritative EXP-to-Stat/mastery conversion, Coding must not invent one from these action values. The action-derived EXP itself may still be persisted and projected truthfully.

---

## 3. Six technical disciplines — exact action values

Combat has closed the only canonical action discipline tags Progression may consume from Battle actions:

`ninjutsu | taijutsu | genjutsu | bukijutsu | fuinjutsu | kinjutsu`

Progression never infers a discipline from a Story button, animation, weapon appearance, kill result, objective label, or prose verb.

For each exact authored discipline tag on one materially executed action, award exactly one of these mutually exclusive values:

| Development class | Discipline EXP | Predicate |
|---|---:|---|
| `committed_attempt` | **+1** | The action passed legality/access checks and materially executed far enough for Combat/owning resolver to commit its attempt evidence, but the intended downstream effect was resisted, blocked, missed, interrupted after material execution, or otherwise failed. |
| `effective_execution` | **+2** | The legal action materially executed and the owning resolver committed a non-trivial intended factual effect/result attributable to that action. |
| `exceptional_execution` | **+3** | The action materially executed and the authoritative source/resolver separately classifies that exact execution as an exceptional authored benchmark. Exceptional is never inferred from damage size, enemy rarity, Battle victory, mission tier, kill, or UI wording. |

These values do **not** stack for the same discipline/action. Use the highest exact class factually authorised for that one action.

A failed-but-legitimate action therefore normally earns **+1** in every exact discipline Combat authored on that action. Failure after material execution is still practice/history; precommit rejection is not.

A successful action normally earns **+2**. Success does not become +3 merely because the larger Battle is difficult or later won.

### Multi-discipline actions

If Combat explicitly authors multiple discipline tags on the same action, each exact tag may receive the same resolved action-development class. Progression does not invent a hidden `primaryDiscipline` hierarchy and does not add untagged disciplines.

The per-discipline causal caps below prevent hybrid actions from becoming an unlimited farming surface.

---

## 4. No-development conditions

Award **0** action-derived Discipline Development EXP when any of the following is true:

- selection/hover without committed execution;
- access/legality failure before material execution;
- target/query/object invalid before execution;
- action cancelled before the owning resolver emits its committed attempt evidence;
- Story label exists but no discipline-tagged action actually occurred;
- participant merely observed another participant's action;
- teammate succeeded but this subject did not perform the action;
- deterministic post-defeat `KILL` with no discipline-tagged action source;
- Battle/mission completion used as a surrogate for missing action history;
- replay/load/UI refresh attempts to reproject an already-consumed source.

---

## 5. Discipline anti-farm / causal caps

### 5.1 Exact-source idempotence

One exact action source may grant at most one development amount per exact discipline tag.

Semantic dedupe key:

`(subjectStableId, sourceOccurrenceId, actionOccurrenceId, disciplineId)`

Retry/save/load/replay must project the existing receipt rather than mint a new one.

### 5.2 Battle causal cap

Within one causal Battle occurrence, one subject may earn at most:

**6 Discipline Development EXP per technical discipline**

from action-derived grants.

This cap is per discipline, not one shared six-point pool.

Examples:

- three effective Ninjutsu executions: `2 + 2 + 2 = 6`;
- two exceptional Bukijutsu executions: `3 + 3 = 6`;
- later otherwise-valid grants in that same Battle may remain factual action history but add no further Bukijutsu EXP after the cap is reached.

A new genuinely separate committed Battle occurrence receives its own cap. Child rounds/phases/retry IDs under the same causal Battle do not reset it unless authoritative Battle semantics establish a new independent Battle occurrence.

### 5.3 Non-Battle causal cap

Within one non-Battle causal task/opportunity/scene root, one subject may earn at most:

**3 Discipline Development EXP per technical discipline**

unless a separately authored Training/Progression contract explicitly defines that occurrence as a development/training session with its own cap.

Repeated dialogue/action nodes under one causal task do not create independent farming roots.

### 5.4 No whole-Origin multiplier

There is no hidden Origin-completion multiplier and no victory multiplier over action-derived Discipline Development EXP.

Independent factual Battle/task occurrences may each contribute under their own causal caps. Later mission failure or Battle loss does not erase already committed receipts.

---

## 6. Stamina development — exact semantics

Stamina remains the canonical mitigation Stat. It is **not** automatically trained by every Battle action, Battle turn, remaining-Battle-PL loss, victory, defeat, healing, or mission completion.

Combat has closed the exact packet-level signal available to Progression:

- resolved Attack PL entering the Stamina stage;
- Effective Stamina used by the resolver;
- post-Stamina damage;
- mitigation amount.

### 6.1 Battle Stamina EXP

For one exact subject in one causal Battle occurrence:

- award **+1 Stamina Discipline Development EXP** for an exact hostile/direct packet occurrence where:
  1. resolved Attack PL entering the Stamina stage is greater than zero;
  2. the subject's legitimate Effective Stamina is actually consumed by the mitigation calculation;
  3. mitigation amount is greater than zero;
  4. the packet occurrence is committed and source-addressable.

- maximum **2 Stamina EXP per subject per causal Battle occurrence** from packet-level mitigation participation.

This means two qualifying packets can yield `+1 +1 = 2`; further qualifying packets in the same Battle remain factual history but give no more Stamina EXP.

Pre-Stamina prevention that reduces the packet to zero does not create Stamina-development credit because Stamina did not materially participate.

Battle defeat after the qualifying packet does not erase the earned Stamina EXP.

### 6.2 Non-Battle Stamina development

A non-Battle occurrence may award Stamina EXP only when its owning authoritative source explicitly classifies a committed task as genuine physical/chakra endurance exertion rather than ordinary movement or waiting.

- ordinary qualified exertion: **+1 Stamina EXP**;
- separately authored high-exertion benchmark: **+2 Stamina EXP**;
- maximum **2 Stamina EXP per subject per non-Battle causal root**.

Do not infer high exertion from dramatic prose, travel distance, danger label or time elapsed alone.

---

## 7. Reusable fieldcraft development evidence

The Kakashi Origin exposes two recurring fieldcraft domains that deserve persistent development evidence without pretending they are seven-Stat disciplines or Special Jōnin XP.

Progression therefore authorises two **evidence families**, not XP bars and not automatic Skills:

### 7.1 `fieldcraft.stealth_approach`

Permitted exact evidence tags:

- `covert_approach_attempt`
- `undetected_positioning`
- `covert_route_execution`

Evidence significance:

- **1** — legitimate covert approach materially attempted;
- **2** — covert approach materially succeeded and established useful undetected position/route execution;
- **3** — exact authoritative source separately classifies the covert execution itself as an exceptional benchmark.

This evidence does not automatically grant Stealth Skill access, invisibility, detection immunity, infiltration qualification, or Stats.

Where the same facts independently satisfy an existing Special Jōnin path such as `covert_operations.infiltration_specialist`, that separate qualification-evidence projection may also occur under the existing Special Jōnin producer contract. Do not convert this fieldcraft evidence into that qualification automatically.

### 7.2 `fieldcraft.covert_acquisition`

Permitted exact evidence tags:

- `covert_acquisition_attempt`
- `unnoticed_transfer_execution`
- `sleight_of_hand_control`

Evidence significance:

- **1** — legitimate covert acquisition/pickpocket/sleight-of-hand action materially attempted;
- **2** — the action materially succeeded in transferring/securing the exact target through the covert manipulation;
- **3** — the exact source separately classifies the covert acquisition execution itself as an exceptional benchmark.

This evidence does not automatically grant Bukijutsu EXP, theft permission, ownership of unrelated objects, a Pickpocket Skill, or mastery.

Object custody/ownership remains with the owning Story/World/Acquisition systems. The fieldcraft record only says what the subject actually demonstrated.

### 7.3 Fieldcraft dedupe / source breadth

One fieldcraft family receives at most one persistent evidence record from one causal source root for one subject.

Semantic key:

`(subjectStableId, causalSourceRootId, fieldcraftFamilyId)`

Child action records may strengthen/add factually demonstrated tags to that same record but do not counterfeit multiple independent sources.

If an attempt later succeeds within the same causal root, update/project the same root evidence to the strongest factual state rather than minting a second independent source.

---

## 8. Assassination / covert-lethal boundary

Progression does **not** create a new generic `assassinationXP`, `covertLethalXP`, `killXP`, or generic Assassination fieldcraft bar for Alpha.

The reusable Alpha persistent specialist path already exists where facts genuinely satisfy it:

`covert_operations.assassin`

with exact competencies:

- `target_isolation`
- `covert_execution`

That path remains governed by the existing Special Jōnin contextual-evidence producer and evaluator.

Therefore:

- deterministic post-defeat `KILL` alone = lethal history, **no Assassination development**;
- killing an enemy in open Battle alone = no covert-assassin evidence;
- a covert lethal occurrence may project exact assassin evidence only when the subject's factual contribution independently demonstrates the exact authorised competency tag(s);
- a discipline-tagged lethal technique may separately earn its action-derived Discipline Development EXP under sections 3–5 without becoming Assassination evidence automatically;
- pre-Chūnin/pre-Recognition history may remain legitimate evidence where current qualification authority permits, but evidence != qualification != Recognition != Rank.

No new assassination Skill access or mastery is authored by this contract.

---

## 9. Relationship between discipline EXP, fieldcraft evidence and specialist evidence

Three persistent channels remain explicitly non-collapsed:

### A. Discipline Development EXP

What exact canonical discipline did the subject materially exercise?

Consumes only exact action discipline tags / Stamina participation.

Does not prove specialist qualification or Skill ownership.

### B. Fieldcraft development evidence

What covert approach/acquisition technique did the subject materially demonstrate?

Stores provenance-bearing evidence, not an XP currency.

Does not directly change Stats, PL, Rank or ownership.

### C. Special Jōnin qualification evidence

Did the factual work satisfy one exact current qualification/competency path under the existing producer contract?

Uses the existing 11-family / 33-path evidence evaluator.

No `specializationXP` exists.

### Same source, multiple legitimate channels

One source occurrence may legitimately support more than one channel when each fact is independently justified.

Example:

A covert weapon technique might legitimately produce:

- exact `bukijutsu` Discipline Development EXP because Combat authored that discipline and the action materially executed;
- `fieldcraft.stealth_approach` evidence if the same source factually demonstrated covert approach;
- exact `covert_operations.assassin` evidence only if it separately demonstrated `target_isolation` / `covert_execution` under the Special Jōnin contract.

These are not duplicate rewards because they record different semantics, but each channel must independently dedupe against the same source provenance.

---

## 10. Academy Kakashi exact Progression consumption

This section closes the concrete #199 Kakashi application without turning Kakashi's Origin into a one-off architecture.

### 10.1 Legal Battle actions

For every exact Academy Kakashi Battle action:

1. consume only Combat-authored discipline tags from:
   `ninjutsu | taijutsu | genjutsu | bukijutsu | fuinjutsu | kinjutsu`;
2. require Combat's committed material-execution evidence;
3. resolve `+1 / +2 / +3` under section 3;
4. enforce the **6 EXP per discipline per causal Battle** cap;
5. preserve the earned receipt even if Kakashi later loses the Battle or Origin route;
6. do not apply a Battle-victory or Origin-completion multiplier.

### 10.2 `get_closer`

The Story choice itself grants nothing.

If the owning resolver commits a legitimate covert-approach attempt:

- `fieldcraft.stealth_approach:covert_approach_attempt`, significance 1.

If the same causal root factually succeeds in useful undetected positioning/route execution:

- add the exact demonstrated tag(s);
- significance becomes 2.

If that exact covert execution is independently the authored exceptional-field benchmark:

- significance may become 3.

No discipline EXP is inferred from `get_closer` unless an actual exact discipline-tagged action materially executes.

### 10.3 `attempt_pickpocket`

The Story choice itself grants nothing until a legitimate covert-acquisition action materially executes.

On materially executed failed attempt:

- `fieldcraft.covert_acquisition:covert_acquisition_attempt`, significance 1.

On successful covert transfer/package acquisition:

- preserve `covert_acquisition_attempt`;
- add `unnoticed_transfer_execution` and/or `sleight_of_hand_control` only where factually demonstrated;
- significance becomes 2.

If the exact successful action also satisfies World's clean undetected exceptional benchmark:

- significance may become 3.

Failure followed by the authored 3-v-1 Battle does not erase the attempt evidence. The subsequent Battle actions independently earn their own Discipline Development EXP.

Pickpocket does not imply Bukijutsu unless Combat actually tags the executed action `bukijutsu`.

### 10.4 Surveillance / Tracking / Extraction / Counter-Intelligence / Interrogation

Where Kakashi factually demonstrates exact existing Special Jōnin competencies, continue to use the existing producer contract and exact qualification IDs/tags.

Do not create parallel family XP.

### 10.5 Lethal outcomes

A deterministic post-defeat `KILL` creates no Discipline Development EXP and no Assassination evidence by itself.

Only the exact prior/method action can provide discipline development or exact covert-assassin evidence.

### 10.6 Stamina

Use Combat's packet-level mitigation signal exactly as section 6 defines.

Kakashi may earn at most **2 Stamina EXP per causal Battle occurrence**. Battle entry, number of turns, victory/loss or a recovery item does not itself grant Stamina development.

---

## 11. Persistence / receipt schema envelope

Exact runtime field names are Coding-owned, but every action-derived discipline receipt must preserve semantically:

- subject stable identity;
- exact source occurrence ID;
- exact action occurrence ID;
- causal Battle/task root;
- exact discipline ID;
- development class;
- numeric EXP granted after cap;
- whether cap suppressed an otherwise-qualified grant;
- provenance of the authoritative action/resolver result;
- commit state.

Every fieldcraft evidence receipt must preserve:

- subject stable identity;
- causal source root;
- fieldcraft family ID;
- exact factually demonstrated tags;
- significance 1–3;
- supporting action/result occurrence refs;
- commit state.

Save/load/retry must be idempotent. Presentation refresh never recommits semantic history.

---

## 12. Required regression coverage

Coding / later integration must prove at minimum:

1. valid materially executed failed Ninjutsu action gives exactly +1 Ninjutsu EXP;
2. successful effective Taijutsu action gives exactly +2 Taijutsu EXP;
3. explicit exceptional Bukijutsu benchmark gives exactly +3, not +1+2+3;
4. precommit illegal/rejected action gives 0;
5. Story `Attack` with no Combat discipline action gives 0 discipline EXP;
6. deterministic `KILL` gives 0 discipline EXP and 0 assassination evidence by itself;
7. later Battle loss preserves already-earned action EXP;
8. one Battle cannot exceed 6 EXP in one technical discipline;
9. child phases/retry do not reset the same causal Battle cap;
10. separate legitimate Battle occurrence has its own cap;
11. Stamina packet with actual positive Stamina mitigation gives +1;
12. third qualifying Stamina packet in the same Battle gives 0 additional Stamina EXP after cap 2;
13. pre-Stamina prevention to zero gives 0 Stamina EXP;
14. failed `get_closer` material attempt may preserve Stealth approach significance 1 without discipline EXP;
15. successful covert positioning upgrades/projects the same causal-root Stealth evidence rather than creating fake independent breadth;
16. failed pickpocket attempt preserves covert-acquisition significance 1;
17. successful pickpocket may project significance 2/3 according to factual benchmark without automatic Bukijutsu;
18. one causal root cannot mint repeated independent fieldcraft records through child actions;
19. exact Special Jōnin evidence may coexist with discipline/fieldcraft history only when independently justified;
20. no specialization-XP ledger is created;
21. no action directly mutates Base PL, formal Rank, ownership or Skill access;
22. terminal debrief does not recommit occurrence-time development;
23. save/load/retry/UI reopen cannot duplicate any receipt.

---

## 13. Final Progression closure for #199

Closed:

- exact action-derived numeric discipline development values: **+1 attempt / +2 effective / +3 explicit exceptional**;
- failed-but-legitimate execution treatment;
- exact Stamina packet/exertion semantics;
- Stealth/covert-approach persistent evidence;
- covert acquisition/pickpocket/sleight-of-hand persistent evidence;
- Assassination/covert-lethal boundary: **no generic XP family; existing exact Special Jōnin assassin evidence only**;
- relationship between discipline EXP, fieldcraft evidence and Special Jōnin evidence;
- causal caps, dedupe and save/load/retry anti-farm law;
- exact Academy Kakashi consumption rules.

Not claimed:

- Combat action definition/effect ownership;
- Inventory transactions;
- new Skill access/mastery;
- new discipline mastery/Stat-up threshold;
- Coding implementation;
- runtime validation;
- Golden/regression GREEN.

> **A Character develops from what they legitimately and materially do, not from the label of the branch they clicked. Failed real practice may count; invalid selection does not; repeated causal history cannot be farmed by replay.**
