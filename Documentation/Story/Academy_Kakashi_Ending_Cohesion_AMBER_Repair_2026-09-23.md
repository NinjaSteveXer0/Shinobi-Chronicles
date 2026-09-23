# Academy Kakashi Origin — Ending Cohesion AMBER Repair

**Date:** 2026-09-23  
**Owner:** Stephen / Writing — Konoha  
**Status:** **WRITING AMBER — TERMINAL STORY REWRITE IN PROGRESS / SOURCE REPAIRED, BROWSER ACCEPTANCE PENDING**  
**Scope:** Academy Kakashi Origin V2 endings from final field consequence through ANBU report, private Hokage/Minato evaluation, and Chronicle Receipt transition.

## 1. Stephen's direction

Stephen has explicitly placed Academy Kakashi Writing in **AMBER** until the Origin reads as a better, cohesive Story rather than a mechanically complete route tree.

The immediate failure identified is the terminal stretch:

`field consequence -> report -> Hokage/Minato -> Receipt`

Several endings reached the report with only a handful of dialogue/narration boxes, then reached Minato with another very short exchange. This made high-investment routes — including multiple Battles, package recovery/loss, custody, release, lethal choice, restraint, Pakkun intervention and acquired intelligence — collapse into nearly the same short administrative closure.

Writing AMBER is therefore intentional.

Source/semantic correctness does not make these endings Writing GREEN.

## 2. Current authority consumed

This repair consumes:

- `Documentation/Story/Storywide_Player_Facing_Performance_and_Narrative_Craft_Successor_Authority_2026-09-14.md`;
- `Documentation/Story/Writing_Konoha_Production_Workflow_Benchmark_and_Change_Control_2026-09-19.md`;
- `Documentation/Story/Academy_Kakashi_Active_Cast_Character_Voice_and_Personality_Anchors_2026-09-22.md`;
- `Documentation/Story/Academy_Kakashi_Player_Facing_Story_Dialogue_Quality_Pass_2026-09-22.md`;
- current live V2 route/state truth.

The active Storywide authority requires:
- cinematic observer-bounded close prose;
- expansion when a Battle aftermath or choice consequence is meant to land;
- debrief scenes using hierarchy, reaction, physical setting, consequential questions and withheld information;
- no information-terminal dialogue;
- no state-report prose where Story should be happening.

The Kakashi quality successor additionally says a debrief must not simply enumerate:
`target -> handoff -> fight -> recovery -> prisoners`.

## 3. Audit result — terminal writing failures

### A. ANBU report was too often only a factual adapter

The old shared builder could reduce a route to:
- one rooftop arrival line;
- `REPORT`;
- two or three package lines;
- one participant outcome line;
- immediate transition.

A clean or narrow route could therefore reach Minato after roughly five meaningful cues.

This was factually correct but dramatically insufficient.

### B. Participant outcomes were reported as fields, not consequences

Examples of the old shape:
- `The masked shinobi got away.`
- `He's in ANBU custody.`
- `I handed him to the Uchiha Police.`
- `He was alive when I left. Unrestrained.`

These statements preserve facts but do not make the operative react to what Kakashi chose, what changed, or what the result means operationally.

### C. High-investment routes were flattened

A route such as:

`STRIKE BEFORE THE HANDOFF -> win AMT+PS 2v1 -> recover package -> MI arrives -> win MI 1v1 -> final disposition`

could be compressed into a recap rather than allowing the report to register:
- Kakashi's early intervention;
- two separate Battles;
- objective recovery;
- the second threat;
- final participant disposition;
- the fact that an Academy-age shinobi returned from an adult operation with an unusually large consequence set.

### D. Group outcomes became repetitive questionnaires

When two or three participants shared one disposition, the old dynamic report risked asking about each person independently even when the natural conversation would treat the group outcome together.

### E. Minato/Hokage scenes were particularly thin

Some nonlethal routes could reach a private Minato evaluation consisting of:
- `The ANBU operative finishes the report.`
- one package statement;
- one Minato response.

This violated the active Minato anchor.

Minato must separate:
1. what happened;
2. what Kakashi actually knew;
3. what Kakashi chose;
4. what consequence followed;
5. command responsibility for placing a young shinobi in the situation.

He must not be a bureaucratic one-line-question machine.

### F. The ending lacked connective tissue

The old report often had no satisfying closing beat explaining why Kakashi leaves and why the next scene belongs to Minato privately.

The result felt like:
`report complete -> next screen`
instead of one Story scene handing naturally into another.

## 4. Repair implemented in live source

Live runtime expression owner:
`runtime/alpha-kakashi-v2-core-36020.js`

Rewrites:

- `cd62803e061215398594a9345ea757a4eef8c996` — **Rewrite Kakashi terminal report and Hokage evaluation**
- `1afa2f1ea7e2e080c1a78b80146659fa0d693441` — **Make Kakashi terminal dispositions conversational**

Current source blob after the second pass:
`a06e8c539348c18b99d6ce6c1659d02eabb55d2f`

Source parse: **GREEN**.

## 5. New ANBU report structure

The report now has a stable dramatic shape while remaining state-derived:

```
arrival / atmosphere
-> operative notices what Kakashi brought back
-> REPORT
-> first-decision / route-specific account
-> package consequence
-> participant disposition consequence
-> verified intelligence / Knowledge boundary where present
-> Pakkun account/departure where present
-> operative completeness check
-> explicit handoff upward to command
```

### Route-relative first-decision treatment

The report now differentiates:
- WATCH THE EXCHANGE;
- MOVE IN CLOSER;
- STRIKE BEFORE THE HANDOFF;
- SLIP IN FOR THE PACKAGE.

Examples:
- direct strike discusses Kakashi interrupting the handoff and the actual 2v1 / MI sequence when those Battles occurred;
- clean pickpocket acknowledges that Kakashi recovered the package without turning success into a Battle;
- failed pickpocket reports detection and the resulting 3v1;
- move-closer preserves whether Kakashi actually obtained the contingency information;
- watch preserves the fact that he allowed the exchange to develop before committing.

### Package consequence

Recovered package:
- physically handed over;
- seal checked;
- responsibility visibly leaves Kakashi.

Lost package:
- operative asks where it is;
- exact last known holder is preserved;
- failure is allowed to land instead of being skipped.

### Participant consequences

Individual outcomes now receive a short exchange rather than one field-like sentence.

Supported expression includes:
- ESCAPED;
- RESTRAINED / compatibility with current field-secured runtime until Coding completes the 2026-09-23 simplification;
- ANBU custody;
- Uchiha Police custody;
- RELEASED;
- defeated/left without completed custody;
- lethal intent with KILLED or ESCAPED.

### Group outcomes

When multiple participants share the same ANBU custody / Police custody / release / restraint fact, the report now speaks about the group naturally rather than repeating the same questionnaire three times.

Exact participant state remains the semantic source of truth underneath that presentation.

## 6. New Minato/Hokage evaluation structure

The private Minato scene now uses:

```
setting / report handoff
-> first decision
-> what Kakashi knew
-> objective result
-> cost / Battle burden
-> participant disposition
-> intelligence boundaries
-> Minato's command-responsibility conclusion
```

Minato now behaves according to his current anchor:
- measured;
- complete thoughts;
- synthesis rather than interrogation;
- separates result from judgement;
- notices the distinction between capability and readiness;
- recognises that placing a young shinobi in an adult problem also creates responsibility above him.

The shared closing now includes the principle:

> Kakashi's capability does not automatically mean readiness for every problem command can place in front of him.

and preserves Minato's responsibility for the assignment rather than making the whole night a verdict on Kakashi.

## 7. What did NOT change

This pass does **not** change:

- root choices;
- Scene 03A choices;
- Battle callers/results;
- package mutations;
- participant factual mutations;
- current pursuit timing;
- Pakkun eligibility;
- Knowledge;
- reward entitlement;
- Receipt commit timing;
- Origin completion;
- route topology.

The existing beats remain:

`v2_report -> v2_minato -> v2_receipt -> v2_complete`.

This is expression repair over the existing terminal contract.

## 8. Interaction with new KILL / RESTRAIN authority

Current Writing authority remains:

```
KILL     -> KILLED | ESCAPED
RESTRAIN -> RESTRAINED | ESCAPED
```

The new terminal expression already understands:
- lethal intent separate from death;
- `KILL -> ESCAPED` as failed lethal consequence, not mercy/release;
- `RESTRAINED` as a simple living restrained fact;
- compatibility with the old field-secured state only until Coding removes it from Kakashi V2.

Coding still owns the runtime resolver migration.

## 9. Remaining AMBER work

Writing remains **AMBER**, not GREEN.

Before Academy Kakashi Writing is considered cohesive enough for final acceptance:

1. installed-browser replay must prove the expanded report/Hokage scenes actually read well at Scene Board cadence;
2. representative short, medium and high-consequence endings must be watched start-to-finish;
3. the new KILL / RESTRAIN resolver work must project the correct terminal prose after Coding wires it;
4. any old route-specific terminal prose that can still leak around the shared current terminal owner must be removed/superseded;
5. the whole Origin must be judged as one Story, not only as isolated improved scenes;
6. pacing must be trimmed if any ending becomes verbose without adding character/consequence.

Representative browser acceptance routes should include at minimum:

- clean direct Pickpocket success / no Battle;
- direct Strike -> lose 2v1;
- direct Strike -> win 2v1 -> lose MI;
- direct Strike -> win 2v1 -> win MI -> three live custody;
- one Police-custody ending;
- one deliberate Release ending;
- one package-loss ending;
- one Pakkun/AMT ending;
- one KILL->KILLED ending after new resolver wiring;
- one KILL->ESCAPED ending after new resolver wiring;
- one RESTRAIN->RESTRAINED continuation;
- one RESTRAIN->ESCAPED continuation.

## 10. Acceptance rule

Academy Kakashi Writing returns to GREEN only when:

> the Origin feels like one night of escalating decisions and consequences, not a set of technically connected route endpoints.

The terminal scenes must make the player's path matter emotionally and conversationally without bloating routine logistics.

**Writing status: AMBER.**
