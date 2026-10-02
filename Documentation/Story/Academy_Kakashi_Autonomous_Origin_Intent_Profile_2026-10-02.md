# Shinobi Chronicles — Academy Kakashi Autonomous Origin Intent Profile

**Date:** 2026-10-02  
**Owner:** Writing / Story — Konoha  
**Tracker:** #474  
**Live CE expansion:** #478  
**Status:** **KAKASHI-FIRST AUTONOMOUS ORIGIN INTENT AUTHORITY — MACHINE-FACING / FROZEN-STORY GRAPH PRESERVED**  
**Source-first main:** \`701022f49d5477bb2f2b711b2a0ded4a2dde74d4\`

---

# 1. Purpose

This profile determines **which currently-authored Kakashi Origin choices Academy Kakashi may choose autonomously when Kakashi is not the player-controlled Origin**.

It does not:

- rewrite the frozen Kakashi Origin;
- create new choices;
- remove legal choices;
- predetermine Battle victory;
- optimise rewards;
- infer morality;
- use one generic aggression/helpfulness score;
- use one fixed “canon route”;
- reveal Kakashi's private history to the active protagonist.

It annotates the frozen graph with Character/context intent.

Canonical:

> **Kakashi's autonomous Origin is one real private history selected from the same legal Story graph the player can experience.**

> **Eligibility comes first. Character/context priority comes second. Stable seeded tie-selection is allowed only among genuinely equally plausible already-eligible intents.**

---

# 2. Binding source authority

This profile consumes:

- private-Origin architecture:  
  \`Documentation/Coordination/Parallel_Origin_Private_History_and_Active_Konoha_Convergence_Contract_2026-10-02.md\`  
  blob \`da10e83caf41b6cb46b1af902821e0e8d14599fa\`;

- live CE expansion:  
  \`Documentation/Coordination/First_Live_CE_Hotspot_Private_History_Emergence_Expansion_2026-10-02.md\`  
  blob \`67aa9662828afbe4a28ba4d68b446a387abd8165\`;

- final Kakashi Structured Autonomy reconciliation:  
  \`Documentation/Story/Academy_Kakashi_Final_Structured_Autonomy_Anchor_Reconciliation_2026-09-15.md\`  
  blob \`36099e68b3f5bcea5e6cb2b124b68b55ca16d51a\`;

- Kakashi current Character anchor:  
  \`Documentation/Story/Academy_Kakashi_Active_Cast_Character_Voice_and_Personality_Anchors_2026-09-22.md\`  
  blob \`fb047dde4ac4a30d4ee497b1cc187b923af8bdee\`;

- current executable Kakashi V2 graph:  
  \`runtime/alpha-kakashi-v2-core-36020.js\`  
  blob \`07d22bbb55aedef87771f074d5e94d6bed6a390d\`.

Runtime source contains **115 total choice entries**, of which **23 boundaries / 93 entries are meaningful player-facing intent choices**. Machine-only \`RESOLVE RESULT\` gates are not Character decisions and must never be selected through this profile.

---

# 3. Kakashi Character decision basis

Current Academy Kakashi is:

- observant before expressive;
- unusually self-possessed for his age;
- proud of competence without being showy;
- sensitive to being underestimated;
- task-focused;
- willing to become faster and more decisive under pressure;
- still young enough for frustration and competitiveness to affect judgement.

Current values, in practical order when relevant:

1. **complete the task correctly;**
2. **avoid being manipulated / preserve initiative;**
3. **gather information that materially changes the tactical problem;**
4. **prove his judgement through effective action rather than approval-seeking;**
5. **resolve controlled participants through a legitimate disposition once the live objective no longer requires immediate pursuit.**

These are not numeric weights.

Different facts can change which value is most urgent.

---

# 4. Context inputs allowed to change priority

The autonomous selector may consume exact committed facts including:

- package custody: Kakashi / AMT / PS / neutral / unknown;
- package recovered: yes/no;
- concealment: intact/compromised;
- whether handoff completed;
- exact participant presence;
- exact participant Battle state;
- exact Kakashi Battle result;
- exact Battle action/turn window where current Story already uses it;
- pursuit availability;
- whether target remains reachable;
- whether Pakkun is present;
- exact prior choices in this same Origin;
- exact participant violence/resistance Kakashi directly observed;
- whether participant is controlled, defeated-but-not-controlled, escaped or dead;
- whether earlier participants remain restrained for collection;
- Kakashi's current Knowledge;
- current objective status;
- factual failure/success immediately preceding the choice.

Do not consume:

- future rewards;
- reward rarity;
- hidden Minato evaluation;
- hidden test truth Kakashi does not know;
- player achievement value;
- “best ending” metadata;
- arbitrary random aggression;
- morality;
- friendship score.

---

# 5. Intent families

These families are authoring shorthand, not runtime Trait scores.

## \`OBSERVE_FOR_INFORMATION\`

Kakashi delays intervention because one more beat may reveal something useful without surrendering the objective.

Raised by:
- intact concealment;
- incomplete tactical Knowledge;
- no immediate objective loss.

Lowered by:
- package about to leave reach;
- immediate violence;
- compromised position.

## \`IMPROVE_POSITION\`

Kakashi closes distance / improves information while trying to preserve control of the situation.

Raised by:
- concealment intact;
- uncertainty still high;
- confidence he can move without committing the whole route.

## \`CLEAN_OBJECTIVE_EXTRACTION\`

Kakashi acts directly for the package with minimum unnecessary entanglement.

Raised by:
- clear package location;
- viable stealth/interception;
- objective still recoverable.

## \`DIRECT_CONTROL\`

Kakashi interrupts or takes an opponent down because delay or negotiation is no longer useful.

Raised by:
- compromised position;
- repeated resistance;
- immediate escape pressure;
- current participant physically blocking the objective.

## \`INFORMATION_FIRST\`

Kakashi asks a bounded question only when the answer can materially change what he does next.

Raised by:
- target temporarily contained;
- downstream destination/role genuinely unknown;
- no immediate loss caused by asking.

## \`PURSUE_OBJECTIVE\`

Kakashi prioritises a still-reachable package/target over disposition of a defeated participant.

Raised by:
- pursuit window open;
- mission object still moving;
- current defeated participant can be restrained quickly or safely left under exact route authority.

## \`REPORT_AND_SECURE\`

Kakashi stops extending the route and returns to the originating authority.

Raised by:
- package recovered;
- remaining pursuit is optional/riskier;
- current objective already met;
- useful factual report exists.

## \`INSTITUTIONAL_CUSTODY\`

Kakashi transfers controlled participant(s) to ANBU or Uchiha Police.

ANBU rises when:
- the event remains primarily covert/mission-owned;
- originating command needs the participant;
- package is missing and the controlled participant is useful evidence/lead.

Police rises when:
- public/civic custody is a legitimate alternative;
- the immediate covert objective is already resolved;
- Kakashi chooses not to keep the participant inside the originating covert chain.

Where neither context strongly distinguishes them, **ANBU and Police may be genuinely equal-priority intents** and stable seeded tie-selection is permitted.

## \`RELEASE_CONTROLLED\`

Kakashi lets a defeated/controlled participant leave.

Raised by:
- mission objective already secure;
- participant no longer materially blocks the mission;
- no current Knowledge makes continued custody necessary.

Lowered by:
- package still missing;
- participant remains the only live lead;
- participant is still actively dangerous.

Release does not mean compassion and must not be stored as a morality label.

## \`SEVERE_LETHAL_DISPOSITION\`

Kakashi chooses an authored KILL intent.

This is **never default aggression**.

It may enter the plausible top set only when all of the following are true:

- the frozen graph currently presents the KILL choice;
- the participant/group is in the exact state required by the resolver;
- Kakashi's current Knowledge still frames them as hostile actors in the live operation;
- the immediate history contains concrete severe pressure such as direct violent resistance, repeated dangerous escalation, a route Kakashi himself already escalated into direct force, or an opponent who materially endangered Kakashi/another participant;
- no hidden test truth is used to soften or intensify the decision.

KILL is lowered by:
- clean objective recovery;
- stable custody already available;
- high information value in returning the participant alive;
- no recent severe pressure.

When \`SEVERE_LETHAL_DISPOSITION\` is genuinely equal to another legal disposition after exact context evaluation, stable seeded tie-selection is permitted.

This is the mechanism by which one Chronicle may produce a severe Kakashi history without making lethality his universal route.

---

# 6. Global autonomous selection procedure

For every choice boundary:

1. Load exact committed state.
2. Remove choices the current runtime says are unavailable.
3. Remove any choice blocked by a NEVER-autoselect rule below.
4. Determine which Character intent families are currently supported.
5. Compare only supported legal intents.
6. If one intent is materially stronger, select it.
7. If two or more are genuinely equivalent after Character/context evaluation, select by a stable Chronicle seed.
8. Commit the choice once.
9. Never reroll it on save/load, Team Formation, map open, hotspot open or Record inspection.
10. Battle owns Battle outcome.
11. Return factual result to Story and continue from the next legal boundary.

No reward lookup is permitted during steps 1–7.

---

# 7. NEVER-autoselect rules

The following are hard guards:

- any \`RESOLVE RESULT\` machine gate: **NEVER** a Character choice;
- unavailable pursuit choice: **NEVER**;
- unavailable restraint/collection choice: **NEVER**;
- KILL without the \`SEVERE_LETHAL_DISPOSITION\` evidence above: **NEVER**;
- group KILL if exact group control/result does not authorise it: **NEVER**;
- RELEASE while a participant still physically possesses the mission package: **NEVER**, unless current frozen authority explicitly says package custody is already separate/secure;
- collection choice for a participant who is not actually restrained/collected: **NEVER**;
- Pakkun-dependent continuation before legitimate Pakkun entry: **NEVER**;
- hidden-test Knowledge as a reason to spare, kill, trust or distrust: **NEVER**;
- choice because it yields better money/EXP/reward: **NEVER**.

---

# 8. Boundary-by-boundary profile

## B01 — \`v2_scene02_tail\`

Exact legal choices:

- \`watch_exchange\` — **WATCH THE HANDOFF**
- \`move_in_closer\` — **GET CLOSER**
- \`strike_before_handoff\` — **INTERRUPT THE HANDOFF**
- \`slip_for_package\` — **SLIP IN AND TAKE IT**

Knowledge:
- Kakashi has the ANBU assignment and target photograph;
- package is still with AMT;
- PS is waiting;
- Kakashi remains concealed;
- downstream destination and hidden test truth are unknown.

Priority:
- \`watch_exchange\` rises under \`OBSERVE_FOR_INFORMATION\`;
- \`move_in_closer\` rises under \`IMPROVE_POSITION\`;
- \`slip_for_package\` rises under \`CLEAN_OBJECTIVE_EXTRACTION\` when Kakashi judges concealment/extraction viable;
- \`strike_before_handoff\` rises under \`DIRECT_CONTROL\` when Kakashi appraises the transfer as too close to losing the objective.

Tie:
- WATCH / GET CLOSER may be equal by default;
- SLIP may join the equal top set when current capability/confidence supports a clean extraction;
- INTERRUPT joins the top set only when immediate-loss pressure is materially high.

Downstream:
- this choice determines whether the clean handoff occurs, whether concealment survives and which participant set Kakashi later encounters.

---

## B02 — \`v2_watch_exchange\`

Exact legal choices:

- \`stop_assassin\` — **INTERCEPT THE MASKED ATTACKER**
- \`secure_package\` — **GO FOR THE PACKAGE**
- \`secure_before_assassin\` — **BEAT HER TO THE PACKAGE**
- \`assassin_then_package\` — **DEAL WITH HER FIRST**
- \`go_original_target\` — **CHASE THE MAN FROM THE PHOTO**

Knowledge:
- handoff completed;
- PS has package;
- AMT is leaving;
- MI has entered violently toward PS;
- Kakashi does not know the hidden test truth.

Priority:
- package-centred intents normally outrank abandoning the package;
- \`secure_package\` rises when direct recovery is best;
- \`secure_before_assassin\` rises when Kakashi believes speed can avoid a longer fight;
- \`stop_assassin\` / \`assassin_then_package\` rise when MI's immediate violence is appraised as the dominant blocker/threat;
- \`go_original_target\` rises only if Kakashi judges the photographed target's continued movement as more operationally valuable than the current package holder.

Tie:
- GO FOR PACKAGE / BEAT HER TO PACKAGE may be equal;
- STOP / DEAL WITH HER FIRST may be equal where immediate violent interruption dominates.

---

## B03 — \`v2_mi_stop_win\`

Exact legal choices:

- \`mi_pursue_ps\` — **CHASE THE PACKAGE** — only if current MI Battle action window preserves pursuit;
- \`mi_kill\` — **KILL HER**
- \`mi_anbu\` — **BRING HER TO ANBU**
- \`mi_police\` — **TAKE HER TO THE UCHIHA POLICE**
- \`mi_restrain\` — **RESTRAIN HER AND KEEP MOVING** — only if pursuit remains open.

Knowledge:
- Kakashi just fought MI;
- PS has the package and may still be reachable;
- AMT is already farther away;
- MI's hidden role remains unknown.

Priority:
- if pursuit is open, CHASE PACKAGE and RESTRAIN-AND-CONTINUE are normally top mission-preserving intents;
- RESTRAIN-AND-CONTINUE rises when Kakashi wants both control and pursuit;
- institutional custody rises when pursuit has closed;
- KILL enters top plausibility only through the severe-lethal gate.

Tie:
- CHASE PACKAGE / RESTRAIN-AND-CONTINUE may be equal;
- ANBU / Police may be equal after pursuit closure.

Downstream:
- this boundary is a primary source of later MI private history.

---

## B04 — \`v2_ps_seq_win\`

Exact legal choices:

- \`ps_go_amt\` — **CHASE THE MAN FROM THE PHOTO** — only if PS Battle <= current authored continuation gate;
- \`ps_kill\` — **KILL HIM**
- \`ps_restrain_continue\` — **RESTRAIN HIM AND KEEP MOVING** — only while AMT continuation remains open;
- \`ps_anbu\` — **BRING HIM TO ANBU**
- \`ps_police\` — **TAKE HIM TO THE UCHIHA POLICE**
- \`ps_report\` — **RETURN TO ANBU**

Priority:
- while AMT remains reachable, CHASE / RESTRAIN-AND-CONTINUE rise;
- RETURN TO ANBU rises once package recovery has satisfied the core objective and Kakashi judges further extension unnecessary;
- institutional custody rises when Kakashi chooses participant control over continued pursuit;
- KILL requires severe-lethal evidence.

Tie:
- CHASE / RESTRAIN-AND-CONTINUE may tie;
- RETURN / ANBU transfer may tie when objective is secure and AMT pursuit is optional.

---

## B05 — \`v2_amt_seq_win\`

Exact legal choices:

- \`amt_seq_police\` — **TAKE HIM TO THE UCHIHA POLICE**
- \`amt_seq_release\` — **LET HIM GO**
- \`amt_seq_kill\` — **KILL HIM**
- \`amt_seq_anbu\` — **BRING HIM TO ANBU**
- \`amt_seq_collect\` — **RESTRAIN HIM AND GO BACK FOR THE OTHERS** — only if earlier restrained participants actually exist.

Priority:
- collection rises strongly when earlier restrained participants remain;
- otherwise ANBU/Police are normal top custody intents;
- RELEASE may join top plausibility when package/objective is secure and AMT no longer changes the mission;
- KILL requires severe-lethal evidence.

---

## B06 — \`v2_group_collect_choice\`

Exact conditional legal choices:

- \`collect_one_mi_anbu\` — **BRING HER TO ANBU**
- \`collect_one_mi_police\` — **TAKE HER TO THE UCHIHA POLICE**
- \`collect_one_ps_anbu\` — **BRING HIM TO ANBU**
- \`collect_one_ps_police\` — **TAKE HIM TO THE UCHIHA POLICE**
- \`collect_one_amt_anbu\` — **BRING HIM TO ANBU**
- \`collect_one_amt_police\` — **TAKE HIM TO THE UCHIHA POLICE**
- \`collect_group_anbu\` — **BRING THEM TO ANBU**
- \`collect_group_police\` — **TAKE THEM TO THE UCHIHA POLICE**

Eligibility:
- exact collected participant set only.

Priority:
- ANBU rises from originating covert command;
- Police rises when Kakashi chooses civic custody and no current fact requires ANBU specifically.

Tie:
- ANBU/Police may be genuine seeded equals when both are lawful and current evidence does not materially distinguish them.

No other choice family is authorised here.

---

## B07 — \`v2_amt_missing_win\`

Exact legal choices:

- \`amt_missing_kill\` — **KILL HIM**
- \`amt_missing_restrain\` — **RESTRAIN HIM**
- \`amt_missing_anbu\` — **BRING HIM TO ANBU**
- \`amt_missing_police\` — **TAKE HIM TO THE UCHIHA POLICE**

Knowledge:
- package remains missing;
- Kakashi/Pakkun have defeated AMT.

Priority:
- ANBU / RESTRAIN normally outrank other intents because the mission objective is unresolved and AMT is the most useful controlled participant;
- Police remains plausible as lawful custody;
- KILL requires severe-lethal evidence and is lowered by AMT's information/evidence value.

---

## B08 — \`v2_ps_mi_win\`

Exact legal choices:

- \`secure_stay_first\` — **CHASE THE MAN FROM THE PHOTO**
- \`secure_return\` — **RETURN TO ANBU**

Knowledge:
- package is recovered;
- PS + MI are defeated;
- AMT remains ahead.

Priority:
- CHASE rises from competence/proof-of-judgement and a clean continuation opportunity;
- RETURN rises because the primary package objective is already secure.

Tie:
- these are explicitly allowed as equal-priority Kakashi intents when current risk/capability does not distinguish them.

This boundary is a primary source of divergent private histories.

---

## B09 — \`v2_secure_amt_win\`

Exact legal choices:

- \`secure_amt_police\` — **TAKE HIM TO THE UCHIHA POLICE**
- \`secure_amt_release\` — **LET HIM GO**
- \`secure_amt_kill\` — **KILL HIM**
- \`secure_amt_anbu\` — **BRING HIM TO ANBU**

Package is secure.

Priority:
- ANBU/Police normally top;
- RELEASE may be equally plausible if objective is complete and Kakashi sees no operational value in continued custody;
- KILL requires severe-lethal evidence.

---

## B10 — \`v2_ps_package_second_win\`

Exact legal choices:

- \`package_second_stay_amt\` — **CHASE THE MAN FROM THE PHOTO** — only if PS Battle preserved AMT reach;
- \`package_second_return\` — **RETURN TO ANBU**

Priority:
- same logic as B08;
- pursuit availability is an eligibility fact, never a personality roll.

Tie:
- CHASE / RETURN may be equal when both are legal.

---

## B11 — \`v2_amt_package_second_win\`

Exact legal choices:

- \`package_second_amt_police\` — **TAKE HIM TO THE UCHIHA POLICE**
- \`package_second_amt_release\` — **LET HIM GO**
- \`package_second_amt_kill\` — **KILL HIM**
- \`package_second_amt_anbu\` — **BRING HIM TO ANBU**

Priority:
- same package-secured final-AMT disposition policy as B09.

---

## B12 — \`v2_get_closer_success\`

Exact legal choices:

- \`closer_handoff\` — **WAIT FOR THE HANDOFF**
- \`closer_strike\` — **INTERRUPT THE HANDOFF**
- \`closer_pick\` — **SLIP IN AND TAKE IT**

Knowledge:
- Kakashi improved his position while staying concealed;
- package still with AMT;
- handoff pending.

Priority:
- WAIT rises if better information is still worth preserving concealment;
- SLIP rises if improved position makes clean extraction look viable;
- INTERRUPT rises if Kakashi judges the transfer window too dangerous to wait through.

Tie:
- WAIT / SLIP may be equal;
- INTERRUPT joins only when current urgency materially rises.

---

## B13 — \`v2_closer_handoff\`

Exact legal choices:

- \`closer_watch_stop\` — **INTERCEPT THE MASKED ATTACKER**
- \`closer_watch_secure\` — **GO FOR THE PACKAGE**
- \`closer_watch_before\` — **BEAT HER TO THE PACKAGE**
- \`closer_watch_sequence\` — **DEAL WITH HER FIRST**
- \`closer_watch_amt\` — **CHASE THE MAN FROM THE PHOTO**

Priority:
- same family logic as B02, but Kakashi's closer position raises confidence in package interception.

Tie:
- GO FOR PACKAGE / BEAT HER TO PACKAGE are more likely to share top priority here than at B02.

---

## B14 — \`v2_get_closer_failure\`

Exact legal choices:

- \`failure_stay\` — **CHASE THE PACKAGE**
- \`failure_stop_ps\` — **CONFRONT THE RECEIVER**
- \`failure_cutoff\` — **CUT THEM OFF**

Knowledge:
- concealment is compromised;
- AMT is moving with the package;
- PS remains behind/active.

Priority:
- CHASE PACKAGE normally leads because the mission object is moving;
- CUT THEM OFF rises when Kakashi judges he can regain control of both participants through position;
- CONFRONT RECEIVER rises only if PS is the immediate blocker/threat that makes clean pursuit unsound.

Tie:
- CHASE / CUT OFF may be equal under strong interception confidence.

---

## B15 — \`v2_stay_package_intercept\`

Exact legal choices:

- \`demand_package\` — **DEMAND THE PACKAGE**
- \`take_him_down\` — **TAKE HIM DOWN**
- \`ask_where\` — **ASK WHERE IT WAS GOING**

Knowledge:
- Kakashi legitimately reached AMT;
- Pakkun is present;
- package remains central;
- downstream destination remains unknown.

Priority:
- DEMAND rises when immediate objective recovery is the cleanest next action;
- ASK WHERE rises when information could materially change the route and Kakashi believes he can afford one exchange;
- TAKE HIM DOWN rises when Kakashi expects refusal or judges direct physical control more reliable than speech.

Tie:
- DEMAND / ASK WHERE may be equal;
- TAKE HIM DOWN joins the top set only under stronger control/escalation pressure.

---

## B16 — \`v2_ask_where\`

Exact legal choices:

- \`ask_then_demand\` — **DEMAND THE PACKAGE**
- \`ask_then_take\` — **TAKE HIM DOWN**

Knowledge gained:
- AMT says his role was the handoff;
- he does not know downstream destination;
- PS did not tell him.

Priority:
- DEMAND is normal top because the information path is exhausted and package recovery remains the objective;
- TAKE HIM DOWN rises when Kakashi reads further compliance as unlikely or wants immediate control.

Tie:
- seeded tie is permitted only if current confrontation pressure leaves both equally credible.

---

## B17 — \`v2_demand_win\`

Exact legal choices:

- \`demand_police\` — **TAKE HIM TO THE UCHIHA POLICE**
- \`demand_release\` — **LET HIM GO**
- \`demand_kill\` — **KILL HIM**
- \`demand_anbu\` — **BRING HIM TO ANBU**

Priority:
- use package-secured single-target disposition policy;
- direct refusal/Battle may raise severe pressure, but does not automatically author KILL.

---

## B18 — \`v2_take_down_win\`

Exact legal choices:

- \`take_police\` — **TAKE HIM TO THE UCHIHA POLICE**
- \`take_release\` — **LET HIM GO**
- \`take_kill\` — **KILL HIM**
- \`take_anbu\` — **BRING HIM TO ANBU**

Priority:
- same as B17;
- Kakashi's own earlier direct-control choice is legitimate severe-pressure evidence, but KILL still requires current controlled-state legality and must not be automatic.

---

## B19 — \`v2_ps_missing_win\`

Exact legal choices:

- \`ps_missing_kill\` — **KILL HIM**
- \`ps_missing_restrain\` — **RESTRAIN HIM**
- \`ps_missing_anbu\` — **BRING HIM TO ANBU**
- \`ps_missing_police\` — **TAKE HIM TO THE UCHIHA POLICE**

Knowledge:
- package remains with/escaped through AMT route;
- PS is defeated/controlled.

Priority:
- ANBU / RESTRAIN normally top because objective failure remains unresolved and PS is useful evidence;
- Police remains plausible;
- KILL requires severe-lethal evidence and is lowered by information value.

---

## B20 — \`v2_cutoff_win\`

Exact legal choices:

- \`cutoff_police\` — **TAKE THEM TO THE UCHIHA POLICE**
- \`cutoff_anbu\` — **BRING THEM TO ANBU**
- \`cutoff_kill\` — **KILL THEM**
- \`cutoff_release\` — **LET THEM GO**

Priority:
- ANBU/Police normal top;
- RELEASE may rise if package/objective is secure and neither participant remains operationally necessary;
- KILL requires severe group-lethal evidence for the exact controlled group.

---

## B21 — \`v2_improved_2v1_win\`

Exact legal choices:

- \`improved_police\` — **TAKE THEM TO THE UCHIHA POLICE**
- \`improved_anbu\` — **BRING THEM TO ANBU**
- \`improved_kill\` — **KILL THEM**
- \`improved_release\` — **LET THEM GO**

Priority:
- same group-disposition policy as B20;
- failed/improved pickpocket path may increase frustration/pressure, but reward/difficulty never affects intent.

---

## B22 — \`v2_direct_mi_win\`

Exact legal choices:

- \`direct_group_police\` — **TAKE THEM TO THE UCHIHA POLICE**
- \`direct_group_anbu\` — **BRING THEM TO ANBU**
- \`direct_group_kill\` — **KILL THEM**
- \`direct_group_release\` — **LET THEM GO**

Context:
- Kakashi's direct interruption escalated into a three-participant confrontation including MI.

Priority:
- ANBU/Police remain normal control outcomes;
- KILL may enter the top plausible set more readily here than on a clean objective route because Kakashi deliberately entered direct-force escalation and all three resisted, but it is still not mandatory;
- RELEASE remains plausible only if exact package/control state means the mission is no longer endangered.

This is one legitimate route to a severe private Kakashi history.

---

## B23 — \`v2_pickpocket_3v1_win\`

Exact legal choices:

- \`pick_group_police\` — **TAKE THEM TO THE UCHIHA POLICE**
- \`pick_group_anbu\` — **BRING THEM TO ANBU**
- \`pick_group_kill\` — **KILL THEM**
- \`pick_group_release\` — **LET THEM GO**

Context:
- Kakashi attempted stealth extraction;
- Pickpocket failed;
- MI entered under the locked exception;
- Kakashi then won the intentionally difficult 3-v-1.

Priority:
- ANBU/Police remain normal high-priority custody;
- RELEASE may be plausible if package objective is secured;
- KILL may enter the top plausible set because the route contains extreme direct resistance and a high-pressure multi-opponent fight, but no difficulty/reward metadata may influence that decision.

This is another legitimate source of radically different private history.

---

# 9. Battle boundary

Writing selects only legal Story intent before/after Battle.

Battle/runtime owns:

- victory;
- defeat;
- withdrawal if authorised;
- exact tactical turns/actions;
- exact Battle-owned package/participant consequences.

Autonomous Writing must never select:

> “win Battle”

or:

> “lose Battle.”

After Battle:

1. factual Battle result commits;
2. Story applies current frozen result mapping;
3. next legal choice boundary is evaluated from that factual state.

---

# 10. Stable seeded tie policy

Stable seeded tie-selection is authorised only for the exact choice IDs remaining in an equal top set after all Character/context evaluation.

Seed inputs should include stable Chronicle/Character/boundary identity, for example:

- Chronicle ID;
- \`academy_kakashi\`;
- choice-boundary ID;
- prior committed private-Origin occurrence lineage.

Do not use UI order.

Do not reseed on load.

Do not reroll because the Character later joins the active team.

The selected intent is historical fact once committed.

---

# 11. Private-history output

The autonomous Kakashi Origin must seal enough factual history for later events to consume, including where applicable:

- every selected choice ID;
- every resolver result;
- every Battle result;
- Battle action windows used by Story gates;
- package history;
- exact MI encounter state;
- exact MI material-history refs;
- lethal attempt/result history;
- restraint/custody/release history;
- participant final states;
- Kakashi Knowledge;
- Development / Stats / derived PL owned by Kakashi;
- exact actor-local persistent rewards/provenance that #471 permits;
- hidden post-test truth separately from Kakashi Knowledge.

Do not expose this private ledger to the active protagonist merely because Kakashi joins their team.

---

# 12. MI continuity outputs required for the live benchmark

For \`academy_kakashi_origin_masked_interceptor\`, seal at minimum:

- encountered by Kakashi;
- UNSEEN vs materially encountered;
- survived vs KILLED;
- Battle result(s);
- Kakashi lethal attempt/result if any;
- Kakashi Police transfer if any;
- Kakashi ANBU transfer if any;
- restraint/collection history if any;
- deliberate release if any;
- MI defeated Kakashi if any;
- Kakashi defeated MI with no later control action if applicable;
- other material encounter fallback;
- exact occurrence refs.

Current live MI reaction precedence remains:

1. lethal attempt;
2. Police transfer;
3. restraint / ANBU transfer / collection;
4. deliberate release;
5. MI defeated Kakashi;
6. Kakashi defeated MI with no later lethal/control treatment;
7. other material encounter.

\`KILLED\` blocks the current recognition hotspot.

\`UNSEEN\` blocks the current recognition hotspot.

---

# 13. No best-route guarantee

This profile intentionally allows autonomous Kakashi to:

- succeed cleanly;
- fail;
- lose Battles;
- overextend;
- stop after objective recovery;
- pursue further;
- transfer participants;
- release participants;
- make severe lethal choices when exact pressure/history supports them.

There is no guarantee that autonomous Kakashi receives:

- highest rewards;
- maximum Development;
- maximum money;
- maximum survivors;
- minimum casualties;
- the “most complete” route.

The target is:

> **surprising histories that remain legible in hindsight as something this Kakashi could have chosen from what he knew and what had just happened.**

---

# 14. Completion audit

- all 23 meaningful current Kakashi choice boundaries covered: **YES**;
- all 93 current player-facing legal choice IDs represented: **YES**;
- machine-only \`RESOLVE RESULT\` gates excluded from personality selection: **YES**;
- Battle result predetermined: **NO**;
- reward optimisation used: **NO**;
- generic morality/aggression score used: **NO**;
- lethal history possible: **YES, only through exact authored choice + severe-pressure eligibility**;
- nonlethal/release/custody/failure histories possible: **YES**;
- stable seeded tie-selection bounded to equal eligible intents: **YES**;
- frozen Story prose/outcomes changed: **NO**;
- private history automatically disclosed to active protagonist: **NO**.

---

# Final lock

> **Autonomous Kakashi does not follow one canonical route. He follows the same frozen legal graph from his own Knowledge, competence, pressure and current objective. The engine may choose stably among genuinely equal plausible intents, but it may never use reward value, arbitrary RNG over all buttons, hidden test truth or a universal aggression score to decide who Kakashi was.**
