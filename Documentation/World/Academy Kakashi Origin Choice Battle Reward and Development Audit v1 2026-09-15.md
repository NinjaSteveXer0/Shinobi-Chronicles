# Shinobi Chronicles — Academy Kakashi Origin Choice, Battle Reward and Development Audit v1

**Date:** 2026-09-15  
**2026-09-18 BATTLE-REWARD TIMING SUPERSESSION:** For the solo Academy Kakashi vs Masked Interceptor PL Battle, current authority is `Documentation/World/Academy Kakashi Masked Interceptor Immediate PL Battle Victory Reward Lock 2026-09-18.md`. A Kakashi VICTORY now creates an immediate Victory-screen material entitlement of **50 Ryō + Field Recovery Pill ×1**, claimed before Story return. Terminal ANBU-debrief / Origin rewards remain a separate reward class. The older terminal-debrief timing for that exact MI-victory fight reward is superseded; the once-per-Origin pill source must not double-grant at debrief after immediate claim.  

**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING WORLD REWARD-SOURCE AUTHORITY — WORLD VALUES CLOSED; EXACT PROGRESSION NUMBERS / ITEM-GRANT ACTIVATION / RUNTIME IMPLEMENTATION SEPARATE**

## 1. Purpose

This document is the concrete Rewards consumer for the closed `academy_kakashi` Origin.

It implements Stephen's direction that the Origin is **not** one flat `complete Origin -> receive reward` transaction.

Reward/development evaluation occurs from committed factual history at the level of:

- player choice / intent;
- resolver action and result;
- Battle participation and actual actions used;
- package/objective custody;
- participant capture / release / death / escape;
- useful surveillance / intelligence / reporting;
- pursuit / tracking / covert activity where actually demonstrated;
- relationship / observer / institutional history;
- terminal debrief and Chronicle Receipt.

This consumes current Writing closure:

- `Documentation/Story/Academy_Kakashi_Final_Writing_Closure_Audit_Runtime_and_Rewards_Consumption_Authority_2026-09-15.md`;
- `Documentation/Story/Academy_Kakashi_Decision_Continuation_Matrix_and_Pickpocket_Route_Lock_2026-09-15.md`;
- current runtime adapter `runtime/alpha-kakashi-final-origin-adapter-34100.js`.

Current runtime contains 32 Structured Autonomy anchors `AK_SA_001..AK_SA_032` and the current machine-addressable decision families. This audit consumes that current graph rather than relying on an older reduced anchor summary.

## 2. Non-collapse / reward law

Preserve:

- choice clicked != reward earned;
- intent != factual outcome;
- Battle victory != mission success;
- Battle loss != zero development;
- mission failure != zero reward;
- package success != capture success;
- capture success != kill;
- kill != better reward;
- no kill != mercy automatically;
- PL Battle != direct Base PL grant;
- discipline action != automatic Skill ownership/mastery;
- specialist evidence != universal hidden score;
- participant presence != relationship improvement;
- Pakkun participation != Summon ownership/contract;
- package custody != Inventory ownership;
- participant equipment != loot;
- reward entitlement != UI presentation;
- repeated UI/save/load/retry != repeated grant.

Development is participant-attributable and occurrence-provenanced. A later loss/failure does not erase legitimate action/development already committed before it.

## 3. Visible material reward package — World authority

The Origin has a modest terminal debrief award, but that is only one layer.

### 3.1 Ryō

All Ryō rows are one-shot per sealed Origin occurrence.

| Reward source | Ryō | Exact condition |
|---|---:|---|
| `kak_origin_ryo_terminal_debrief` | **100** | A terminal factual ANBU debrief / equivalent report and Chronicle Receipt commits, regardless of package success/failure. This is the minimum completed-assignment/debrief award. |
| `kak_origin_ryo_package_recovered` | **+75** | Package custody is factually secured for Kakashi / the authorised Konoha side at terminal evaluation. Choice label alone is insufficient. |
| `kak_origin_ryo_actionable_intelligence` | **+25** | Kakashi returns genuinely new, verified, actionable intelligence beyond the assignment baseline. Merely asking a question or watching longer does not qualify unless new factual intelligence commits. |
| `kak_origin_ryo_live_custody` | **+25** | At least one materially relevant participant is delivered alive into legitimate authority custody through Kakashi's occurrence. Paid once, not per body. |
| `kak_origin_ryo_exceptional_field_execution` | **+25** | One authored exceptional benchmark is factually met: clean undetected package extraction; failed direct-pickpocket 3-v-1 victory; qualifying sequential MI->PS->AMT turn-gate benchmark; or a future resolver-return explicitly classified by the same authority as exceptional field execution. Paid once. |

**Maximum current Ryō package: 250.**

No Ryō is awarded merely for:

- killing a participant;
- number of kills;
- number of Battles entered;
- Battle turn count by itself outside an authored benchmark;
- taking the violent route instead of a clean route;
- selecting a harder-looking button without obtaining the factual result.

This keeps clean stealth, intelligence, custody and combat routes economically competitive without making violence the dominant money strategy.

### 3.2 Item reward — PL Battle field resupply

World authors one optional tangible Battle-linked entitlement:

`kak_origin_item_field_recovery_resupply`

If Kakashi **materially participated in at least one PL Battle** during the sealed Origin occurrence and reaches terminal debrief, he is eligible for:

- `field_recovery_pill` × **1**.

The catalogue identity/effect is Combat authority. The actual Inventory transaction remains Acquisition/Inventory/Coding work.

This is **one per Origin occurrence**, not one per Battle and not one per defeated opponent. It is field resupply after an operationally costly route, not loot from an enemy.

A clean non-Battle route is not penalised: it avoided the Battle cost and remains eligible for its own stealth/intelligence/development value.

### 3.3 Weapon reward — exceptional evaluation candidate

World authors one high-performance source opportunity:

`kak_origin_weapon_exceptional_training_tanto`

A Character meeting `kak_origin_ryo_exceptional_field_execution` becomes **eligible for a one-time Academy/field-evaluation equipment award candidate**:

- preferred stable catalogue identity: `academy_training_tanto`.

This is not automatically owned merely because World names the source. Combat owns the weapon definition; Acquisition/Inventory owns the grant transaction. If current ownership or source policy makes that exact grant invalid, the owning systems must return an explicit alternate/fallback rather than World inventing one.

Explicit exclusions:

- `white_fang_tanto` is **not** an Origin reward under this authority;
- opponent weapons/equipment are not automatic loot;
- Pakkun does not grant equipment;
- kill count does not improve weapon rarity.

## 4. Discipline development — action-derived, not branch-derived

World does **not** invent numeric Ninjutsu / Taijutsu / Genjutsu / Bukijutsu / Fūinjutsu / Kinjutsu / Stamina EXP values here because no current Progression authority found by this audit defines the exact action-level numeric projection.

Instead this document closes the source law that Progression must consume:

> **Every exact legal action that materially executes a discipline may emit that discipline's development once from its committed source occurrence, whether the larger Battle/mission is later won or lost.**

Examples:

- legal Ninjutsu used materially -> Ninjutsu development candidate;
- legal Taijutsu used materially -> Taijutsu development candidate;
- legal Genjutsu used materially -> Genjutsu development candidate;
- legal Bukijutsu / weapon technique used materially -> Bukijutsu development candidate;
- legal Fūinjutsu used materially -> Fūinjutsu development candidate;
- legal Kinjutsu used materially -> Kinjutsu development candidate;
- authorised Stamina-relevant exertion/development action -> Stamina development candidate under Progression's exact rules.

The branch label cannot manufacture a discipline:

- `Attack` is not automatically Taijutsu;
- `Pickpocket` is not automatically Bukijutsu;
- `Observe` is not automatically Genjutsu;
- `Demand Package` is not automatically Ninjutsu;
- killing someone is not automatically Kinjutsu;
- a package/objective result does not imply Fūinjutsu.

Battle must provide the actual action identity/tags used by Kakashi. Progression then resolves exact development amount/caps/anti-farm semantics.

## 5. Specialist / hidden development evidence

This is development/evidence, not a generic hidden XP score. Exact reusable capability paths remain owned by Progression / Skills / CE.

Existing provenance pattern remains:

`committed source occurrence -> participant-attributable factual contribution -> exact development/evidence producer`.

Where current Progression authority already exposes a producer, World may project into it only when the factual contribution matches. Otherwise this document records a candidate family for owner closure.

### 5.1 Current exact producer families usable when demonstrated

- Tracking / route work: `reconnaissance.tracker_nin`
  - `trail_analysis`
  - `route_intercept_execution`
- Surveillance: `reconnaissance.surveillance_specialist`
  - `observation_integrity`
  - `surveillance_reporting`
- Extraction / subject recovery: `covert_operations.extraction_specialist`
  - `extraction_planning`
  - `subject_recovery`
- Counter-intelligence only where actually demonstrated:
  - `intelligence.counter_intelligence_analyst`
  - `deception_detection`
  - `counter_intelligence_response`
- Interrogation only where actual extraction/credibility work occurs:
  - `intelligence.interrogator`
  - `information_extraction`
  - `credibility_assessment`

### 5.2 Candidate families requiring owner closure

The Kakashi Origin also needs reusable development semantics for:

- Stealth / covert approach;
- covert acquisition / pickpocket / sleight-of-hand fieldcraft;
- assassination / lethal covert fieldcraft;
- tactical interception / threat prioritisation where not already Tracking;
- operational custody / evidence-objective handling where not Extraction;
- Battle tactical performance / multi-target pressure where not a discipline action itself.

**Assassination is not invented here as a current Special Jōnin path or Skill ID.** A deterministic post-Battle kill proves a lethal fact; it becomes assassination development only if the method and owning capability contract say it demonstrates that capability.

## 6. Choice-by-choice source ledger

### 6.1 `AK_SA_001` — first intervention

#### `observe`
Reward source: `kak_origin_dev_observe_01`

Commits development only when useful surveillance facts are actually obtained.

Eligible hidden value:

- Surveillance `observation_integrity`;
- Knowledge from actually observed exchange facts;
- later `surveillance_reporting` if those facts are accurately reported.

No material reward and no discipline EXP from observation alone.

#### `get_closer`
Reward source: `kak_origin_dev_get_closer_attempt_01`

The attempt itself may produce covert/stealth development evidence. Success may support a stronger factual covert-approach contribution; failure still remains a real attempted action and must not be erased.

No automatic Tracking/Bukijutsu/Taijutsu EXP.

#### `attack`
Reward source: `kak_origin_dev_direct_attack_01`

The choice commits direct-intervention intent. Development comes from the actual resolver/Battle actions used and the factual intervention result, not from the button.

Potential later values include package recovery, custody, Battle discipline actions and tactical history.

#### `attempt_pickpocket`
Reward source: `kak_origin_dev_pickpocket_direct_01`

- success: strong covert-acquisition / stealth execution evidence; package custody; exceptional-field benchmark; no Battle required;
- failure: attempted covert-acquisition evidence remains; subsequent 3-v-1 actions earn their own Battle development sources.

Failure does not erase the attempted-action evidence. Success does not automatically grant Bukijutsu.

### 6.2 Observe escalation family

#### `stop_assassin`
Reward source: `kak_origin_dev_observe_stop_assassin_01`

Development from actual interception/Battle actions. May create protective/threat-priority history. No kill bonus.

#### `secure_package`
Reward source: `kak_origin_dev_observe_secure_package_01`

If custody actually commits, qualifies for package-recovery Ryō. Battle actions earn their own discipline development. Package recovery is objective/custody evidence, not Inventory ownership.

#### `secure_package_before_assassin`
Reward source: `kak_origin_dev_secure_before_assassin_01`

Objective-priority history plus any actual movement/interception development. If package is secured, package-recovery Ryō applies. Assassin remains an independent participant/history problem.

#### `defeat_assassin_then_secure`
Reward source: `kak_origin_dev_assassin_then_package_01`

Battle actions earn discipline development even if Kakashi later fails to recover the package. Meeting the package result separately earns package-recovery Ryō. Lethal history is separate from defeating the assassin.

#### `go_after_original_target`
Reward source: `kak_origin_dev_pursue_original_target_01`

Tracking development applies only when route/trail analysis or route-intercept execution was actually demonstrated. Simply running after a visible target is not automatically Tracking EXP.

Legitimate downstream Pakkun involvement creates shared operational history, not ownership.

### 6.3 Get Closer SUCCESS — `AK_SA_005`

#### `let_handoff_happen`
Reward source: `kak_origin_dev_deliberate_handoff_observation_01`

May strengthen surveillance/Knowledge evidence because Kakashi deliberately preserves the exchange long enough to learn additional factual information. It is not automatically better than intervention.

No material reward unless later actions secure package/intelligence/custody.

#### `strike_before_handoff`
Reward source: `kak_origin_dev_improved_position_strike_01`

Consumes the actual Attack resolver from a better factual position. Development derives from exact resolver/Battle actions and resulting custody/intelligence, not the label.

#### `attempt_pickpocket`
Reward source: `kak_origin_dev_pickpocket_improved_01`

- success: covert-acquisition / stealth evidence, package recovery, exceptional-field benchmark, retained extra Knowledge from successful approach;
- failure: covert-acquisition attempt remains valid; subsequent 2-v-1 Battle actions independently earn development.

### 6.4 Get Closer FAILURE — `AK_SA_006`

The failed approach itself remains `kak_origin_dev_get_closer_attempt_01`; no duplicate award is created merely because the branch presents a second decision.

#### `stay_on_package`
Reward source: `kak_origin_dev_stay_on_package_01`

Pursuit/objective persistence. Tracking applies only if the pursuit actually includes trail/route analysis rather than continuous visual chase.

#### `stop_package_smuggler`
Reward source: `kak_origin_dev_stop_package_smuggler_01`

Battle/action development from what Kakashi actually uses. If AMT escapes with package, package reward remains failed even after Battle victory. Live custody of Package Smuggler can qualify for the once-per-Origin custody Ryō if delivered to authority.

#### `cut_off_sakura`
Reward source: `kak_origin_dev_cutoff_sakura_01`

A route-intercept contribution may qualify for Tracking `route_intercept_execution` **only if the factual route prediction/intercept was actually performed**, not merely because the scene occurs at the Sakura tree.

Battle actions then earn their own development.

### 6.5 Downstream Pakkun / AMT window — `AK_SA_008`

#### `demand_package`
Reward source: `kak_origin_dev_demand_package_01`

The demand itself creates confrontation/observer history. If it yields genuine actionable information, that information can qualify separately. Refusal -> Battle does not erase the choice history.

No automatic interrogation/coercion Skill development from one demand.

#### `take_him_down`
Reward source: `kak_origin_dev_take_him_down_01`

The opening intervention and subsequent Battle are separate sources. Actual Battle actions emit discipline development. If Pakkun independently secures the neutral package, package-recovery Ryō may still apply even if Kakashi loses the Battle. Battle defeat therefore does not imply zero reward.

#### `ask_where_package_was_going`
Reward source: `kak_origin_dev_ask_destination_01`

If the question yields new factual destination/intelligence Knowledge, it may qualify for actionable-intelligence Ryō and information-extraction evidence only where the exact exchange meets Progression's producer requirements.

Asking without gaining/assessing useful information does not generate Interrogator development automatically.

### 6.6 Package-secured disposition — `AK_SA_013`

#### `turn_over_to_police`
Reward source: `kak_origin_dev_disposition_police_01`

If Kakashi actually transports/transfers a live controlled participant, this may project `covert_operations.extraction_specialist.subject_recovery` and qualifies for the once-per-Origin live-custody Ryō.

Creates Police/participant observer history. No morality bonus.

#### `release`
Reward source: `kak_origin_dev_disposition_release_01`

No EXP penalty and no clawback of prior development. Commits release/observer/shared-history facts and preserves the participant as a possible future World/Story actor where still alive/available.

No custody Ryō.

#### `kill`
Reward source: `kak_origin_dev_disposition_kill_01`

Commits deterministic death when the current CE lethal contract authorises it.

- **no kill Ryō**;
- no loot explosion;
- no automatic Assassination development;
- no automatic Kinjutsu development;
- prior action/Battle development remains intact;
- death may close future participant opportunities and create lethal-history callbacks.

Assassination/covert-lethal evidence is eligible only if the exact method satisfies the future owning capability contract.

#### `return_to_anbu`
Reward source: `kak_origin_dev_disposition_anbu_01`

If a live controlled participant is actually recovered/escorted to ANBU, may project `covert_operations.extraction_specialist.subject_recovery` and qualifies for live-custody Ryō once.

Creates ANBU institutional/observer history; does not make Kakashi ANBU.

## 7. Resolver/outcome reward sources

Choice sources above are supplemented by factual outcome sources. These are not duplicates: intent/action and outcome may both matter.

| Source ID | Factual trigger | Reward / development consequence |
|---|---|---|
| `kak_origin_outcome_clean_pickpocket` | Direct or improved-position pickpocket succeeds undetected; package secured; clean withdrawal. | +75 package Ryō; +25 exceptional benchmark; strong covert-acquisition/stealth evidence candidate; no Battle item resupply. |
| `kak_origin_outcome_pickpocket_failure_3v1` | Direct pickpocket fails and 3-v-1 begins. | Attempted covert evidence retained. Battle actions separately emit development. No material penalty merely for failure. |
| `kak_origin_outcome_pickpocket_failure_2v1` | Improved-position pickpocket fails and 2-v-1 begins. | Same action-preservation rule; Battle actions separate. |
| `kak_origin_outcome_package_secured` | Package reaches Kakashi/authorised side at terminal evaluation. | +75 Ryō once. |
| `kak_origin_outcome_actionable_intel` | Verified new actionable intelligence commits. | +25 Ryō once; Knowledge and suitable specialist evidence. |
| `kak_origin_outcome_live_custody` | At least one relevant participant delivered alive to legitimate authority. | +25 Ryō once; Extraction evidence where exact contribution fits. |
| `kak_origin_outcome_battle_participation` | Kakashi materially participates in >=1 PL Battle in this Origin. | `field_recovery_pill` ×1 entitlement at terminal debrief; exact discipline development from actions used; no per-Battle cash. |
| `kak_origin_outcome_battle_loss` | A PL Battle is lost. | Does not erase prior action/discipline/specialist evidence. Package/custody outcomes consume actual state and may still succeed. |
| `kak_origin_outcome_3v1_victory` | Failed direct-pickpocket 3-v-1 is won. | +25 exceptional benchmark; weapon-source candidate; Battle action development. No kill assumptions. |
| `kak_origin_outcome_sequential_turn_benchmark` | MI <=4 turns and PS <=3 turns and AMT legitimately remains reachable. | +25 exceptional benchmark; weapon-source candidate; historical/achievement evidence. Actual Skills/actions still determine discipline development. |
| `kak_origin_outcome_report_complete` | Factual ANBU debrief accounts for known participants/package/Battle/custody/lethal facts without inventing unknowns. | 100 Ryō terminal award; Surveillance `surveillance_reporting` where the report contains substantive observed field facts; institutional observer history. |
| `kak_origin_outcome_report_incomplete_or_bounded` | Report is factually bounded by what Kakashi knows, including honest failure. | Still receives terminal 100 Ryō if the assignment/debrief closes. Honesty does not convert failure to success; no invented penalty for not knowing unknowable facts. |

## 8. PL Battle reward law

A PL Battle is a runtime capability/depletion resolver, not an XP object and not a direct Base PL source.

### Every Battle occurrence should emit a Battle reward/development receipt containing at minimum

- Battle occurrence ID;
- participant variant IDs;
- Kakashi actual action IDs used;
- action discipline/capability tags from Combat authority;
- success/failure of each action where material;
- turn count;
- Battle result;
- post-Battle participant states only after Story/CE classification;
- package/objective custody separately;
- lethal intent/result separately.

### Development

Progression consumes **actual actions**, not `Battle won`.

A Battle loss still awards development from legitimate actions performed before loss.

A Battle victory does not multiply all discipline EXP and does not directly increase Base PL.

### Turn-gate / exceptional performance

The authored turn gates create historical/recognition value because Story explicitly cares about them. They do not multiply every action's EXP.

### Multi-target / triple-kill history

The future triple-kill/three-participant achievement concept is a **historical achievement / recognition candidate**, not a universal XP jackpot.

- three deaths do not grant 3× generic EXP;
- 3-v-1 victory is not automatically the sequential triple-kill achievement;
- exact lethal order/results remain in the lethal ledger;
- any achievement-facing reward must consume the exact future Achievement authority.

## 9. Relationship / Knowledge / recognition rewards

These are factual Chronicle outputs, not hidden numerical reputation.

Potential committed outputs include:

- `kakashi_anbu_limited_assignment_completed`;
- `kakashi_anbu_reported_package_result`;
- `kakashi_anbu_reported_battle_defeat` where true;
- `kakashi_anbu_live_subject_returned` where true;
- `kakashi_anbu_subject_released` where true;
- `kakashi_lethal_result_ledger_present` where true;
- `kakashi_package_recovered` / `kakashi_package_lost`;
- exact participant encounter Knowledge;
- exact package/destination Knowledge legitimately learned;
- Pakkun shared operational occurrence and departure where present;
- private Minato evaluation facts on the World/Story side without leaking them to Kakashi before an authorised reveal.

World may later use those facts for:

- ANBU-related opportunity eligibility;
- mentor/authority reactions;
- participant recurrence where alive/available;
- relationship/shared-history events;
- specialist training opportunities;
- Story callbacks;
- Chronicle Receipt presentation.

None of these create Kakashi's ANBU membership, Rank, Skill ownership or Summon ownership by implication.

## 10. Anti-farm / idempotence

Every source in this document is occurrence-addressed.

Rules:

1. One sealed Origin occurrence grants each material source at most once.
2. Save/load/UI refresh cannot reroll or duplicate rewards.
3. Reopening presentation does not recommit action history.
4. Repeated observation only creates additional development if a genuinely new committed observation occurrence/fact exists; staring at the same state cannot farm Surveillance.
5. Repeated report prompts do not multiply reporting development or Ryō.
6. Multiple defeated/captured participants do not multiply the +25 live-custody Ryō.
7. Multiple Battles do not multiply the one `field_recovery_pill` resupply entitlement.
8. Multiple exceptional criteria in one Origin do not stack the +25 exceptional Ryō or duplicate the weapon-source entitlement.
9. A future Legacy/new playthrough is a new Chronicle occurrence and may earn its own rewards under that playthrough's authority; replaying one saved occurrence is not.

## 11. Owner closures still required

### Progression / Development

Return the exact numeric / bounded development projection for:

- action-level discipline development;
- success vs failed-but-legitimate attempt treatment;
- Stamina development semantics;
- Stealth / covert approach;
- covert acquisition / pickpocket fieldcraft;
- Assassination / covert lethal fieldcraft if such a path exists;
- whether existing Tracking/Surveillance/Extraction producer evidence also maps to persistent Skill/proficiency development and under what exact thresholds/caps.

Do not create one generic hidden XP bucket.

### Combat / Skills / Items / Weapons

Return/confirm:

- exact Battle action -> discipline/capability tags consumed by Progression;
- that `field_recovery_pill` is legal as this one-shot debrief source;
- whether `academy_training_tanto` is approved for the exceptional evaluation source or provide an exact alternative catalogue ID;
- any exact Battle/action facts needed to distinguish covert lethal execution from generic post-defeat deterministic kill.

### Acquisition / Inventory

Return/implement:

- idempotent grant transaction for the approved Item/Weapon entitlement;
- already-owned handling for the exceptional weapon source;
- no duplicate ownership/material grant on load/retry.

### Coding

Only after owner fields are exact:

- bind source IDs to committed Story/Battle/CE receipts;
- persist entitlements and grant receipts;
- project visible reward summary separately from hidden development evidence;
- prove save/load/retry idempotence;
- prove loss/failure keeps prior legitimate development;
- browser/Golden/regression validation.

## 12. Current closure status

- Writing decision graph: **CLOSED / consumable**.
- World reward-source mapping: **CLOSED in this document**.
- World Ryō values: **CLOSED in this document**.
- World no-kill-bounty / no-loot law: **CLOSED**.
- PL Battle reward/development receipt requirements: **CLOSED at World consumer level**.
- Relationship/Knowledge/future-opportunity consequences: **CLOSED at World consumer level**.
- Exact numeric discipline EXP: **PENDING Progression authority**.
- Stealth/pickpocket/assassination persistent development semantics: **PENDING Progression/Skills authority**.
- `field_recovery_pill` source grant activation: **PENDING Combat + Acquisition consumption**.
- `academy_training_tanto` exceptional reward activation: **PENDING Combat + Acquisition confirmation**.
- Runtime implementation: **NOT CLAIMED**.
- Browser validation: **NOT CLAIMED**.
- Golden/regression: **NOT CLAIMED**.

This audit intentionally establishes the reusable direction that later Story/World occurrences must also reward **what the Character actually did**, not only mission completion. Kakashi is the first concrete Origin consumer, not an Origin-only exception.
