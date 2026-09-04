# Shinobi Chronicles — Field Readiness Assessment Presentation Contract

Date: 4 September 2026

Status: **BINDING ALPHA UI PRESENTATION CONTRACT — PRODUCTION SEMANTICS CLOSED / REUSABLE CONSUMER CODING-REPORTED READY / ARENA→PROMOTION ENTRY LOCKED / FIELD CONTENT + END-TO-END GOLDEN VALIDATION REMAIN**

---

# Owning production contract

Current Rank/Registry + Combat production authority lives in the Chronicle Engine Design Bible at:

`Games/Shinobi Chronicles/Academy to Genin Promotion - Field Readiness Production Contract.md`

The Bible contract is semantically closed.

> **Bible closed ≠ source patched ≠ runtime Golden.**

UI consumes that contract; it does not create a second Promotion resolver.

---

# Current implementation status

Coding has reported the backend assessment/evidence/result contract implemented at **Brick 878** and now reports the reusable player-facing assessment consumer plus Battle-return bridge ready.

Runtime entry:

`openFieldReadinessAssessmentUI(ownedCharacterId?)`

The consumer reads existing authoritative assessment state and exposes only observer-safe presentation including the formal mission, assessment subject, known objective progress and authoritative completed result.

Coding also reports that a Battle launched from the assessment can return to the same Field Readiness assessment context through the dedicated return bridge.

This status is recorded as a Coding report, not as an independent UI source audit of every runtime path.

Therefore remaining Alpha work is not another Rank or Combat adjudication pass and not another assessment-state model. It is:

- final field/map/story content orchestration for the assessment;
- controlled assessment content/opposition where authored;
- player-facing polish around the already implemented reusable consumer;
- end-to-end runtime validation;
- SC-specific Golden regression.

Canonical boundary:

> **Combat/Rank authority closed ≠ reusable consumer implemented ≠ authored field orchestration complete ≠ Golden Regression passed.**

Do not reopen Rank/Combat criteria merely because later integration stages remain incomplete.

---

# Alpha player entry route — LOCKED

The permanent Alpha player entry route for the Field Readiness Assessment is the existing **Arena → Promotion** surface.

Player flow:

`Arena Main`

→ `Promotion`

→ `FIELD READINESS ASSESSMENT`

→ explicit player entry/commit

→ `openFieldReadinessAssessmentUI(ownedCharacterId?)`

The Promotion surface is therefore the navigation/presentation owner of assessment entry for Alpha. It does not become assessment-state, Rank, Evidence or Promotion authority.

Preserve:

> **UI entry point ≠ assessment authority.**

> **Promotion availability ≠ forced entry.**

> **inspecting the Promotion surface ≠ committing an assessment attempt.**

> **mission progress presentation ≠ readiness scoring.**

> **Battle ≠ Promotion.**

The player must deliberately enter/commit the assessment after viewing the Promotion surface. UI must not automatically start the assessment merely because eligibility becomes true or because the player opens Arena.

For Alpha, do not create a second direct assessment launcher in Shinobi Records, My Clan, the ordinary regional map event drawer, or another parallel navigation model. Other surfaces may legitimately communicate that Promotion is available or navigate the player toward the Arena/Promotion destination where authorised, but the actual assessment-launch affordance remains on the Arena → Promotion surface.

If the Promotion surface can represent more than one eligible owned Academy subject, it must consume authoritative eligible-subject state. UI must not manufacture eligibility. When an exact subject is selected/known, pass that owned character identity to the existing runtime entry rather than infer another subject from portrait order, team position or Registry similarity.

Battle launched during the assessment must return through Coding's Field Readiness Battle-return bridge to the **same ongoing assessment context**, not to Arena Main and not to a new assessment instance.

On completed assessment resolution:

- the result remains the authoritative Rank/assessment result;
- success may continue into the authoritative Genin Roster Transition flow;
- failure preserves the attempt/history and follows authoritative re-attempt/continuation state;
- UI does not decide either result from Battle outcome.

This route reuses the already-approved Arena/Promotion architecture and avoids creating another Promotion-specific state model.

---

# Assessment identity

Stable assessment ID:

`academy_to_genin_field_readiness_assessment`

Player-facing title:

**FIELD READINESS ASSESSMENT**

Player-facing mission:

> **Locate the missing field courier, recover the sealed dispatch, and return it to the examiner.**

---

# UI ownership boundary

UI presents authoritative, observer-safe assessment state.

UI does not own Promotion eligibility, readiness-domain interpretation, pass/fail weighting, Battle evidence semantics, examiner observations, or Chronicle occurrence truth.

Canonical rules:

> **mission outcome ≠ readiness interpretation ≠ institutional Promotion.**

> **UI presentation ≠ Promotion authority.**

> **assessment criterion existence ≠ player Knowledge.**

> **examiner observation ≠ player-facing metric.**

> **Battle result ≠ Promotion result.**

> **Battle victory ≠ Promotion.**

> **team participation ≠ team-wide Promotion.**

> **personal performance ≠ protective performance.**

> **protective Promotion evidence ≠ Escort Special Jōnin evidence automatically.**

> **failed Promotion ≠ erased attempt.**

Battle is not mandatory.

---

# Legitimately presentable information

UI may present only information the player/candidate is legitimately allowed to know, including where supplied by runtime:

- the formal mission objective;
- discovered trail/evidence;
- known route/opportunity state;
- current sealed-dispatch possession/status where legitimately observable;
- known courier state/location information;
- controlled-opposition information actually discovered;
- authored examiner instructions;
- disclosed result rationale after assessment resolution;
- authoritative Promotion outcome.

Do not expose machine truth merely because it exists in runtime.

---

# Hidden information that must not leak

Do not expose:

- hidden examiner scoring;
- omniscient decoy truth before legitimate discovery;
- internal readiness-domain counters;
- Rank weighting;
- hidden criterion failure;
- percentage Combat-readiness thresholds;
- `Need +3 Teamwork`-style diagnostics;
- aggregate Team PL gates;
- undiscovered opponent or route truth;
- success prediction based on PL or hidden assessment state.

Unknown information must remain non-leaking through visible labels, controls, hover/focus state, accessibility metadata, pointer interception or other presentation channels.

---

# Formal objective chain

The formal mission chain is:

courier located
→ sealed dispatch recovered
→ sealed dispatch returned to examiner.

UI may show objective progression only as each stage becomes legitimately known/committed.

Formal objective completion is required by Rank for Promotion success but is not sufficient by itself.

Canonical rule:

> **mission completion ≠ every assessment criterion satisfied.**

---

# Closed Rank resolver — UI consumer boundary

Rank's ratified readiness domains are:

- `mission_comprehension`
- `information_use`
- `team_coordination`
- `combat_readiness`
- `objective_protection`
- `judgement_under_pressure`

The production PASS contract is already closed by Rank/Registry:

- formal mission objective complete;
- qualifying `mission_comprehension` evidence;
- qualifying `judgement_under_pressure` evidence;
- qualifying evidence in at least two of `information_use`, `team_coordination`, `combat_readiness`, `objective_protection`;
- no authored examiner safety/integrity abort/disqualification.

This resolver exists as machine/institutional authority and is **not automatically a live player-facing checklist**.

Unless Rank explicitly exposes a particular domain/status through legitimate examiner or institutional Knowledge, UI must not render its internal satisfied/failed state.

UI does not calculate the four-domain minimum, duplicate the evaluator, or infer result from visible player actions.

---

# Battle presentation boundary

Battle is supporting content where legitimately encountered.

Battle victory is not the assessment objective.

The UI must preserve the ongoing assessment context across Battle transitions:

assessment field / route context
→ Battle
→ Battle resolves
→ return to the same continuing assessment context.

Do not present each Battle as though the entire Promotion assessment has been won or lost.

Legitimate Combat outcomes may include:

- `neutralized`
- `repelled`
- `evaded`
- `disengaged`
- `team_withdrew`
- `team_defeated`

UI may present the factual Combat outcome where observer-safe, but must not map one of those outcomes directly to Genin Promotion.

An authored disengage/withdrawal may be valid mission behavior where preserving the actual objective requires it.

---

# Combat evidence consumer boundary

When Battle occurs, Coding/Rank may consume Combat's closed evidence envelope including where applicable:

- `assessmentContextId`;
- `battleEncounterId`;
- participant IDs;
- `battleCompleted`;
- `battleResult`;
- `oppositionOutcome`;
- committed Battle occurrence IDs;
- personal-performance evidence by participant;
- protective-performance evidence separately;
- explicit cooperation/joint-action evidence where present;
- dispatch/objective Battle events where present;
- pursuit/disengage Battle occurrences where present.

UI may present authorised factual outcomes/receipts from that envelope, but does not reinterpret it into Promotion scoring.

Do not infer teamwork merely because multiple teammates took turns.

---

# Dispatch / objective presentation

Where the sealed dispatch is relevant to the current assessment or Battle context, UI consumes authoritative state rather than owning it.

Potential observer-safe presentation includes:

- current holder where legitimately known;
- possession maintained/lost/recovered;
- dispatch integrity change where authored and observable;
- objective-safe disengagement/pursuit consequences;
- examiner/extraction return state.

UI must not become persistent dispatch ownership authority.

---

# Promotion subject

Promotion mutation belongs to one explicit:

`assessmentSubjectOwnedCharacterId`

Team participation does not imply team-wide promotion.

A successful assessment may promote only the authoritative subject Academy → Genin and unlock that subject's `geninRosterTransition` flow.

UI must not promote teammates by visual association.

---

# Result presentation

After Rank resolves the assessment, UI presents the authoritative result.

On success:

- present Promotion success;
- present only disclosed/observer-safe rationale;
- surface the subject's Academy → Genin recognition;
- continue into the authoritative Genin progression/roster transition flow.

On failure:

- present failure without erasing the attempt;
- show only legitimately disclosed rationale;
- do not mutate Rank/PL/Stats from the UI;
- preserve the attempt/history state supplied by runtime;
- re-attempt availability is authoritative, not inferred.

Canonical regression truths:

> **winning every Battle may coexist with Promotion failure.**

> **Promotion success may coexist with imperfect individual evidence when Rank's authored readiness standard is still legitimately satisfied.**

> **same assessment ≠ same Chronicle history.**

---

# Regression ownership

No new CE semantic family is required.

This assessment should be covered through existing CE semantics plus an SC-specific Golden/release regression after Coding integration.

At minimum, the SC gate should prove:

1. Battle victory alone cannot produce Promotion;
2. Promotion can succeed without Battle where the required evidence is otherwise legitimately satisfied;
3. mission completion without required readiness evidence can fail Promotion;
4. failed Promotion preserves the attempt/history;
5. only `assessmentSubjectOwnedCharacterId` receives Rank mutation;
6. personal and protective evidence remain distinct;
7. objective-protection evidence does not automatically mint Escort Special Jōnin qualification;
8. UI does not expose or manufacture hidden scoring;
9. assessment entry from Arena/Promotion does not itself commit an attempt until the explicit entry action;
10. Battle returns to the same assessment context instead of creating a second attempt or returning to Arena prematurely.

---

# Non-goals

Do not build:

- an omniscient exam-score HUD;
- a universal Team PL gate;
- a Promotion-only parallel map/event engine;
- automatic Promotion after Battle victory;
- one fixed route/choreography;
- a Menma-tutorial clone;
- hidden personality/morality scoring from route choices;
- a second UI-owned readiness evaluator;
- a second Alpha navigation route that bypasses the Arena/Promotion entry surface.

Reuse existing Chronicle-aware map/event, Story Scene, Battle, Records/Knowledge and Promotion surfaces.
