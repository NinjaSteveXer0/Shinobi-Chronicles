# Shinobi Chronicles — Field Readiness Assessment Presentation Contract

Date: 4 September 2026

Status: **BINDING ALPHA UI PRESENTATION CONTRACT — WRITING / RANK / REGISTRY / COMBAT AUTHORITIES EXTERNAL**

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

> **UI presentation ≠ Promotion authority.**

> **assessment criterion existence ≠ player Knowledge.**

> **examiner observation ≠ player-facing metric.**

> **Battle result ≠ Promotion result.**

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

# Readiness domains

Rank's ratified readiness domains are:

- `mission_comprehension`
- `information_use`
- `team_coordination`
- `combat_readiness`
- `objective_protection`
- `judgement_under_pressure`

The existence of these domains is production authority, but they are not automatically a live player-facing checklist.

Unless Rank explicitly exposes a particular domain/status through legitimate examiner or institutional Knowledge, UI must not render internal pass/fail state for it.

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

Canonical rule:

> **Battle victory ≠ Promotion.**

> **authored disengagement can be valid mission behavior.**

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

Canonical rule:

> **team participation ≠ team-wide Promotion.**

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

Canonical rules:

> **failed Promotion ≠ erased attempt.**

> **same assessment ≠ same Chronicle history.**

> **Promotion success may coexist with imperfect individual evidence when Rank's authored readiness standard is still satisfied.**

> **winning every Battle may coexist with Promotion failure.**

---

# Non-goals

Do not build:

- an omniscient exam-score HUD;
- a universal Team PL gate;
- a Promotion-only parallel map/event engine;
- automatic Promotion after Battle victory;
- one fixed route/choreography;
- a Menma-tutorial clone;
- hidden personality/morality scoring from route choices.

Reuse existing Chronicle-aware map/event, Story Scene, Battle, Records/Knowledge and Promotion surfaces.
