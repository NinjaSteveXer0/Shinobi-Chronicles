# Shinobi Chronicles — Arc 1 Missions 2–10 Runtime Reconciliation

**Owner:** CE / Codex / Coordination  
**Date:** 2026-09-09  
**Parent:** GitHub issue #36  
**Status:** **COORDINATION ACTIVE — FIRST REAL ARC-1 RUN BLOCKER**

## 1. Purpose

Writing has durably closed the Arc 1 Story skeleton through Mission 12, but current runtime authority is uneven. This reconciliation narrows GitHub issue #36 to the exact remaining work for Missions 2–10 and prevents Coding from deriving machine IDs, Battle packages, Progression grants, Registry identities or World occurrences from prose.

Current authority order remains:

**GitHub source > durable SC/CE documents > current specialist decisions > Project memory**.

Preserve:

**design closed != implementation-ready != implemented != runtime validated != Golden GREEN**.

## 2. Current production baseline inspected

Current `main` at reconciliation start:

`e80032e89a198873a2da1812e71e3eac1e260dec`

Current `game.js` blob remains:

`62b98639d1aad530e0b80723e417eb68edaa7080`

Therefore the current runtime remains the Post-2500 lineage while later Story / Registry / Combat / World authority has moved ahead of executable source.

Primary Writing authority:

`Documentation/Story/Arc1_Konoha_Story_Skeleton_and_Choice_Authority_2026-09-09.md`

commit:

`a3f855b6addd0de1757516367c264f64b50e0525`

Current Coding archaeology authority:

`Documentation/Implementation/Coding Runtime Legacy Workspace Audit 2026-09-09.md`

commit:

`e0e88bd743d7ed11e69a9ba9d67c314815838d33`

## 3. What #36 has already closed / routed

Do not duplicate:

- Mission 1 Story caller is already Coding issue #35.
- Complete Academy Origin source bindings are already Coding issue #34.
- Mission 7 sanitisation trio Registry / PL / Combat / Coding chain is closed through #29 → #30 → #31.
- Menma multiple Hosted Entity semantics are closed under `Documentation/Coordination/Menma Multiple Hosted Entity and Echo Arc 1 Contract 2026-09-09.md`, commit `6020deb4f81b74d84c0c9acf28b6cfb920c0f10a`.
- Mission 11 / 12 Registry and Combat authority is closed upstream and implementation is already Coding issue #41.
- Arc-entry continuity is separately queued under #42 and must not interrupt this work.

The remaining #36 coordination target is therefore:

**Missions 2–10 machine-addressable Story / World / Progression / Registry / Combat implementation authority, excluding already-implemented Mission 7 Combat.**

## 4. Current Mission 2–10 authority matrix

### Mission 2 — Warehouse

Writing-authoritative Story facts currently include:

- ledger links `ACADEMY / HOSPITAL / BARRIER / ARCHIVE`;
- minor Sarutobi logistics/insider involvement;
- evidence establishes a distributed operation without proving one universal conspiracy owner.

Separate durable World authoring doctrine includes the Mission-2 example where a player may deliberately permit a dangerous Fūinjutsu/Kinjutsu purge process to execute for observation, potentially producing source-bounded Knowledge/evidence without automatic Skill, PL, Stat or mastery gain.

Current gap:

- no exact Mission-2 Story Scene/caller IDs found on current `main`;
- no exact World transition/source occurrence IDs found for the Mission-2 Story path;
- no exact participant-instance contract for the Sarutobi participant or purge source found;
- no exact Progression/Skills contract says observation automatically becomes a technique unlock — and it must not.

**Conclusion:** Story must publish the exact machine-addressed Mission-2 causal package first. World/Progression follow only where that package exposes real owner-specific source boundaries.

### Mission 3 — Hospital

Writing-authoritative Story facts currently include:

- female med-nin contact/operator thread;
- sample/reference material;
- Menma retains/steals a case in the explored route;
- Sarutobi-related participant surrenders in the explored route;
- hospital material later supports identity/recognition experimentation.

Current gap:

- no exact Mission-3 Story Scene/caller IDs found;
- no exact stable source/participant IDs for the med-nin, Sarutobi participant or retained case found;
- no exact custody/object transfer consequence contract found for this Mission.

**Conclusion:** do not force the med-nin or Sarutobi participant through Registry/PL unless the executable Mission consumes them as persistent/Battle participants. Story must first publish exact causal/participant/object boundaries.

### Mission 4 — Barrier

Writing-authoritative Story facts currently include:

- Relay Four compromised;
- Menma becomes a body-inscribed receiver in the explored route;
- barrier systems expose recognition/identity behaviour.

Current gap:

- no exact Mission-4 Story Scene/caller/source occurrence IDs found;
- no exact persistent state occurrence for `receiver` / body-inscribed recognition state found;
- no exact Progression/Development contract identifies what factual evidence from this Mission is later consumed by False Identity technique development.

**Conclusion:** Story must machine-address the factual receiver/recognition occurrences. Progression then decides what development they legitimately support.

### Mission 5 — Academy

Writing-authoritative Story facts currently include:

- Female Operator confrontation;
- Menma may redirect calibration into the receiver;
- Third Bell propagation/acceptance demonstrates trusted systems accepting the changed identity state.

Current PL / Registry review already found:

- physical `female_operator` and `female_operator_unleashed` assets exist;
- there is **no durable stable Registry ID + seven-Stat/Base-PL authority** for the woman;
- `Female Operator — Unleashed` is the same woman at full commitment, not a second person or automatic second Base PL.

Current gap:

- no exact Mission-5 Story Scene/caller IDs found;
- current Story skeleton says `confrontation` but does not yet provide an implementation-ready declaration of whether/when an exact Battle package is required;
- if Battle is required, Female Operator needs PL/Registry first, then Combat;
- Third Bell / redirected calibration need exact factual occurrence boundaries before Progression or later Knowledge consumers can use them.

**Conclusion:** Writing must first declare the exact confrontation/Battle seam and factual Third-Bell/calibration occurrences. Only then route Female Operator to PL/Registry if runtime Battle consumption is real.

### Mission 6 — Archive

Writing-authoritative Story facts currently include:

- archive teaches accepted legitimate identity-change propagation;
- Menma creates/develops the `Identity Rebinding Seal` within `False Identity Seals`;
- Chronicle-specific sealed representation is `Cipher Menma`;
- Dead Transfer lead opens Mission 7.

Current Registry/Combat downstream authority already recognises `cipher_menma` as the same Menma person and requires legitimate False Identity / Identity Rebinding capability access where consumed later.

Current gap:

- no exact Mission-6 Story Scene/caller/source IDs found;
- no exact Progression/Development commit contract currently found for the creation/development event that authorises the persistent capability/state;
- no exact source occurrence currently binds the `Cipher Menma` state/unlock to this Chronicle history.

**Conclusion:** this is a genuine first-run dependency. Writing must provide exact factual development/creation occurrence(s); Progression/Development must then close what becomes persistent capability/representation access. Coding must not infer `mission6Complete => cipher_menma`.

### Mission 7 — The Dead Transfer

Already closed upstream:

- Hosted Entity semantics;
- sanitisation trio identities/Base PL;
- exact Combat package `arc1_m7_chain_sanitisation_active_encounter`;
- current runtime implementation of the encounter.

Still missing for whole-Mission execution:

- exact Mission-7 Story registration/caller/entry/return orchestration;
- exact source occurrence for deliberate carrier acceptance/attachment;
- exact caller-supplied object/evidence target IDs consumed by sanitisation Combat;
- exact Story continuation after factual Battle/sanitisation outcome.

**Conclusion:** do not reopen trio Combat. Only Story/World orchestration remains.

### Mission 8 — The Sanitisation Chain

Writing-authoritative Story facts currently include:

- Collector recruitment and sponsor trail;
- white-thread material;
- Daichi Moroboshi signed reassignment paperwork;
- network sanitisation/escalation evidence.

Current gap:

- no exact Mission-8 Story Scene/caller/source IDs found;
- no exact object/evidence identities for white-thread/paperwork found;
- no exact Battle requirement is established by the current durable skeleton.

**Conclusion:** do not invent a Battle package merely because earlier #36 language said `unresolved Mission 8–12 Battles`. Writing must explicitly identify any actual Battle seam. Otherwise this may remain Story/investigation only.

### Mission 9 — Ashes of the Chain

Writing explicitly says the explored developer Battle return was **provisional** and runtime owns final Battle facts.

The explored continuation may consume outcomes such as Sealer captured / Breacher incapacitated / Warden escaped, but those are not hard-coded runtime truth.

Current gap:

- no exact Mission-9 Story Scene/caller IDs found;
- no exact Mission-9 Battle package found;
- no durable declaration currently establishes whether Mission 9 launches a new Battle, consumes the factual result of Mission 7, or both;
- no exact sanitisation/evidence cleanup source occurrence/owner boundary found.

**Conclusion:** Writing must explicitly close the causal relationship between Mission 7 Battle history and Mission 9. CE/Coding must not create a second Battle from the provisional prose by assumption.

### Mission 10 — Beneath the Veterinary Ward

Writing-authoritative Story facts currently include:

- storm-drain/service-tunnel entry;
- carrier recognition/direction behaviour but not perfect GPS;
- hidden facility and six detected people in explored route;
- Byakugan observation without automatic medical competence;
- transfer-operator information about carrier purpose, Sazan, survival numbers and Recall;
- current team split in explored route is not automatically universal choreography.

Current gap:

- no exact Mission-10 Story Scene/caller/source IDs found;
- no exact stable participant/source identity for the fleeing transfer operator found;
- no exact Story-owned participant decision rule for the split has been published as implementation input;
- no exact Battle requirement is currently established by the durable skeleton;
- Dr. Sazan is information/testimony at this point, not a direct Mission-10 Combat participant by default.

**Conclusion:** Writing must machine-address the facility/operator/communication facts and explicitly mark any Battle seam. Do not invent PL/Combat merely from pursuit language.

## 5. Coordination decision

The immediate blocker common to **all Missions 2–10** is not Coding and is not one giant multi-owner implementation request.

It is:

> **Writing must convert the closed Arc-1 skeleton for Missions 2–10 into exact machine-addressable Story runtime contracts so downstream owners can distinguish factual Story occurrences, World-owned source boundaries, Progression evidence, Registry participants and actual Battle seams.**

This is not a request to rewrite Arc 1 or author exhaustive dialogue. It is a machine-addressability / caller-return pass over already-closed Story.

Only after that pass should CE route the minimum exact owner-specific work.

This avoids premature traffic such as:

- inventing PL for noncombat role-only participants;
- authoring Combat packages for confrontations that may not become Battles;
- turning observation into automatic Technique ownership;
- fabricating World occurrence IDs from Story Scene names;
- hard-coding explored team splits/outcomes;
- treating Mission completion as Progression.

## 6. Writing return contract

For each Mission 2–10, Writing should publish at minimum:

1. exact Mission/Story Scene registration IDs;
2. exact Story-owned committed occurrence IDs + commit boundaries for mandatory historical anchors;
3. exact legal entry/continuation/termination points;
4. exact player intent/choice seams that must remain player-owned;
5. exact points where autonomous participant intent is resolved before/around player intent;
6. exact caller participant/object refs Writing expects to receive rather than fabricate;
7. exact Battle transition(s), if any, and whether Battle is mandatory / optional / branch-dependent;
8. exact post-Battle return/continuation requirements when Battle exists;
9. exact factual Knowledge/evidence/development observations that downstream systems may consume, without assigning Progression itself;
10. exact persistent representation/history anchors, especially Mission 4 receiver state, Mission 5 Third Bell/calibration, Mission 6 Identity Rebinding creation/Cipher state, Mission 7 carrier attachment;
11. explicit `NONE` where a Mission has no new Battle, no new PL-relevant persistent participant or no World-owned source dependency.

Where a required factual source boundary is actually World-owned, Writing should identify the exact missing fact but must not manufacture the World `sourceOccurrenceId`.

## 7. Expected next routing after Writing return

CE will then classify only actual remaining owner work, likely among:

- **Progression / Development** — Mission 4–6 evidence chain → Identity Rebinding / Cipher access and any later Recognition Substitution prerequisites;
- **PL / Registry / Rank** — Female Operator only if Mission 5 executable Battle consumes her; other persistent role participants only when exact runtime need exists;
- **Combat / Skills / Items / Weapons** — only exact Battle seams returned by Writing; Mission 7 trio must not be reopened;
- **World / Missions / Events** — only exact factual World occurrence/instance/object bindings Writing cannot own;
- **Coding** — one or more implementation-ready packages after the upstream authority above is exact.

## 8. Hard preserves

- Story historical anchor != fixed verbatim dialogue
- Story Scene ID != sourceOccurrenceId automatically
- World occurrence != Story occurrence != Battle occurrence
- player intent != guaranteed occurrence
- protagonist intent != party-wide command
- NPC intent != random branch sabotage
- presence != participation
- observation != Knowledge automatically
- Knowledge != Access != Competence != Power != Mastery
- technique evidence != technique ownership
- Battle result != Mission result automatically
- Battle defeat != death/custody automatically
- Base != Effective/Battle state
- Female Operator != Female Operator Unleashed as a second person
- Mission 7 Combat already implemented != whole Mission 7 executable
- Sazan testimony != Sazan Mission-10 Battle participation
- provisional developer route != hard-coded runtime outcome
- mission completion != Progression automatically
- design closed != implemented != runtime validated != Golden GREEN

## 9. Current coordination state

**WAITING ON WRITING** for the implementation-ready Missions 2–10 Story runtime contract.

No Stephen relay is required. The dependency is routed through GitHub Issues under the active Specialist GitHub Handoff Protocol.
