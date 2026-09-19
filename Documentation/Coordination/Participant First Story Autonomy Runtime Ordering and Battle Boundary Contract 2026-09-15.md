# Shinobi Chronicles — Participant-First Story Autonomy Runtime Ordering and Battle Boundary Contract

**Date:** 2026-09-15  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING CE / STORY RUNTIME ADDENDUM — FIRST REQUIRED CONSUMER: ACADEMY KAKASHI**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

> **2026-09-20 CE research-integration extension**  
> This contract is extended by `Documentation/Coordination/CE_Interactive_Narrative_Affordance_Intention_Reincorporation_and_Causal_Presentation_Doctrine_2026-09-20.md` (commit `64399463d1870b752954ffceaaf31629a5961691`).  
> Participant intention revision is now explicitly **Knowledge-gated**: a participant may revise intent when legitimate participant-side Knowledge/belief changes, not merely because omniscient World Truth changed.

## 1. Purpose

GitHub issue #194 routed Stephen-approved Writing authority into CE for reusable generalisation.

Primary source:

- `Documentation/Story/Participant_First_Structured_Autonomy_and_Kakashi_Take_Him_Down_Correction_2026-09-15.md`
- Writing commit `7434e9e571ad9c1d9c76138d1ee4b7dea261456b`

This contract consumes that authority and closes the reusable runtime ordering semantics required by:

- `Documentation/Coordination/Structured Story Autonomy Arc 1-3 Route History and Authored Geography Contract 2026-09-10.md`;
- `Documentation/Coordination/Neutral Story Decision Realisation Runtime Contract 2026-09-14.md`;
- current participant-autonomy / protagonist-intent / Knowledge doctrine;
- current Story→Battle→same-Story return authority.

The new reusable rule is:

> **At a Story decision boundary, due autonomous participant windows resolve from committed state before the next protagonist choice set is derived.**

This is a Story/CE ordering rule. It is **not** authority for CE to steal in-Battle initiative, turn order, action economy, Summon action semantics, damage, custody or other facts from their owning resolvers.

Canonical two-part shorthand:

> **Story decision boundary: due participants resolve before the next protagonist decision.**  
> **Battle boundary: Combat owns in-Battle action order and action economy.**

---

## 2. Successor neutral Story loop

The neutral Story Decision Realisation Core is extended to use this ordering:

`committed Story state`
→ `identify due participant-autonomy windows`
→ `evaluate eligible autonomous participants`
→ `select legitimate participant intent`
→ `dispatch owning resolver / transition where required`
→ `commit participant result + consequence provenance`
→ `reevaluate newly due participant windows`
→ `when no due participant window remains, derive protagonist choice set from the updated state`
→ `player commits protagonist intent`
→ `owning resolver commits factual result`
→ `state updates`
→ `participant-autonomy phase runs again before the next meaningful protagonist choice`

The participant phase is therefore a **state-update phase**, not a presentation flourish.

A participant action may:

- change object custody;
- change position or access;
- create/remove threat;
- leave or enter where independently authorised;
- reveal/refuse/disclose where Knowledge permits;
- assist, oppose, guard, wait, withdraw or do nothing;
- open/close protagonist affordances;
- trigger an owning domain such as Battle when explicit authority permits.

The participant phase does not choose the protagonist's next intent.

---

## 3. What makes an autonomy window due

A materially present participant should receive an autonomy opportunity only when a legitimate action/reaction window is due from current state.

Equivalent runtime conditions should include:

1. the actor is factually present/available for the relevant context;
2. the actor can perceive enough of the triggering state to form the eligible intent;
3. the actor is capable of the action class being considered;
4. the actor's role, objective, relationship/history, Disposition/personality and current state permit the intent;
5. the trigger has actually occurred and is committed;
6. the same autonomy window has not already been consumed;
7. the action is not currently owned by another active domain phase that forbids out-of-band resolution;
8. Story-authored invariants do not prohibit the action.

Presence alone does not create an autonomy window.

A participant can legitimately resolve the window as:

- `hold`;
- `watch`;
- `wait`;
- `guard`;
- `refuse`;
- `withdraw`;
- `do_nothing`;
- another context-legitimate non-intervention.

Therefore:

> **participant-first != every NPC visibly acts every beat**

and:

> **autonomy opportunity != mandatory intervention**

---

## 4. Participant intent selection — eligibility before selection

Participant autonomy is not unrestricted procedural behaviour and is not random NPC theatre.

First establish the eligible intent/action set from authoritative state.

Only then may an explicit selection policy choose among eligible possibilities.

Permitted selection families include, where separately authorised:

1. an exact authored participant action/invariant;
2. an owning-domain policy;
3. a deterministic state-sensitive priority rule;
4. bounded randomness among already-eligible possibilities;
5. legitimate non-intervention.

The policy used should be stable/versioned enough for replay diagnostics.

Randomness may never create:

- Knowledge;
- motive;
- capability;
- relationship;
- presence;
- access;
- ownership;
- history;
- factual eligibility.

Canonical rule remains:

> **Semantic eligibility first. Selection second.**

---

## 5. Multiple autonomous participants and ordering collisions

When multiple participants have due autonomy windows, their ordering can itself become factual history.

If the order can materially change the outcome, runtime must obtain ordering from legitimate authority such as:

- explicit Story timing;
- owning-domain initiative/priority;
- an already-committed causal sequence;
- another explicit resolver-owned ordering rule.

Do **not** decide contested factual history merely by arbitrary array order, DOM order, display slot, actor name or stable ID sorting.

If no legitimate ordering authority exists and order materially matters, that is an **authority/resolver gap** and must fail closed or be routed to the owner.

A deterministic technical order may be used for evaluation/diagnostics where participant resolutions are genuinely commutative or non-contending, but it must not masquerade as causal authority.

---

## 6. Autonomy-phase draining and loop safety

One participant action may create a new due window for another participant before the protagonist should act.

The runtime may therefore continue the autonomy phase until the current decision boundary is stable.

However, this must be bounded by semantic windows, not an unconstrained simulation loop.

Required guardrails:

- each autonomy window has a stable identity/trigger basis;
- a consumed window is not rerun merely because presentation refreshes;
- new windows require new committed state/trigger facts;
- the same actor does not repeatedly receive the same semantic window without a new trigger;
- if an autonomous chain itself reaches an authored transition, Battle, scene closure or other owning domain, hand off rather than simulating indefinitely;
- if no meaningful protagonist decision remains, do not fabricate one solely to return control.

Canonical rule:

> **Drain due autonomy windows; do not simulate the world forever before giving control back.**

---

## 7. Participant-autonomy receipt

A material autonomy result that can affect state, later eligibility, replay or diagnostics must preserve provenance equivalent to:

```text
participantAutonomyReceiptId
storyDecisionContextId
autonomyWindowId
triggerOccurrenceRefs[]
actorRef
observerContextRef?              // presentation/Knowledge context, not owner of truth
actorKnowledgeBasisRefs[]
eligibleIntentRefs[]
selectedIntent
selectionPolicyRef
resolverBindingRef?
resolverRequestRef?
resolverResultRef?
stateDeltaRefs[]
knowledgeDeltaRefs[]
relationshipHistoryRefs[]
objectCustodyDeltaRefs[]
objectiveDeltaRefs[]
autonomyPhaseRef                 // pre_story | pre_battle | battle_owned | post_battle | other authorised phase
windowConsumedRef
successorStateRef
```

Exact field names are Coding-owned.

The receipt is provenance, not a duplicate owner of the facts it references.

Not every facial expression or body-language beat needs a Chronicle-grade autonomy receipt. Pure expression remains presentation unless it is itself intended to be durable factual action/history.

A `wait` / `hold` / `do nothing` result requires persistence when that non-action materially determines later availability or prevents rerolling into a different action after save/load.

---

## 8. Choice-set stability and participant-first invalidation

A protagonist choice set must be derived only after all due participant windows for that decision boundary have resolved.

Therefore:

- a participant result may add/remove/change protagonist choices before display;
- UI refresh may not rerun participant autonomy;
- save/load must reconstruct the same committed autonomy result;
- reopening the Scene Board may not select a different participant action;
- presentation wording may vary only downstream of the same semantic result;
- if new committed history legitimately changes state before a protagonist intent is committed, the old unresolved choice set may be explicitly superseded with provenance.

A runtime state in which a protagonist menu is displayed while an already-due participant action remains unresolved is a sequencing defect unless an owning domain explicitly authorises simultaneous decision semantics.

---

# 9. Battle boundary — no free CE actions inside Combat

Participant-first Story ordering must not create extra Battle actions or bypass Combat.

## 9.1 Pre-Battle Story/autonomy phase

Before Battle is entered, a due participant autonomy window may resolve through Story/World/objective/custody/other legitimate ownership.

A pre-Battle participant action may establish factual initial conditions such as:

- object custody;
- guard/position state where the owning authority supports it;
- departure/presence;
- a declared autonomous intent that causes Battle eligibility;
- observer-safe Knowledge/reaction state.

It may **not** resolve Battle-owned damage, defeat, injury, turn consumption or tactical success as a free Story action.

If an autonomous participant intent itself begins combat, commit the participant intent/caller state and hand off to Battle. Do not grant free pre-Battle damage merely because the intent was selected before Battle.

## 9.2 Battle entry

Once the Battle caller/opposition/return package is committed and Combat takes ownership:

- Battle owns initiative / turn ordering;
- Battle owns action economy;
- Battle owns legal Battle actions;
- Battle owns target legality;
- Battle owns damage / depletion / withdrawal / victory/defeat facts;
- Battle owns any in-Battle Summon action frequency or control semantics.

CE/Story may supply factual initial state and authored outcome constraints where current authority legitimately fixes them. It may not schedule an extra autonomous action outside the Battle model.

## 9.3 During Battle

CE must not run its ordinary Story participant-first phase *inside an unresolved Battle* unless Battle explicitly exposes an authorised interrupt/reaction/autonomy hook.

If Battle itself supports autonomous temporary participants, companions or Summons, their in-Battle actions must occur through Battle's own ordering/action rules.

No double action:

> **one semantic autonomy window may be consumed by the pre-Battle Story phase OR by an authorised Battle action/interrupt seam, not both.**

## 9.4 Post-Battle return

Battle commits its result first.

Story then consumes the Battle receipt and restored caller context.

Before the next meaningful protagonist Story choice, CE runs the participant-autonomy phase again against the new committed post-Battle state.

Canonical sequence:

`pre-Battle Story state`
→ `due participant autonomy`
→ `Battle caller + initial state`
→ `Battle-owned action order/result`
→ `same Story caller restored`
→ `post-Battle state commit`
→ `due participant autonomy`
→ `next protagonist Story choice`

---

## 10. Temporary participant / Summon semantics

A temporary Story/Battle participant remains distinct from ownership/acquisition.

Preserve:

- presence != ownership;
- temporary participation != acquisition;
- temporary Summon use != permanent Summon unlock;
- temporary participation != assignment;
- temporary participation != name Knowledge;
- temporary participation != universal obedience;
- Story participant != guaranteed Battle participant;
- Battle participant != guaranteed independent turn unless Combat authority grants one.

Where a temporary participant acquires physical custody of an object, custody should remain actor-precise where the runtime model permits it.

For example:

`custodianRef = pakkun`

is semantically preferable to silently mutating the object into Kakashi's personal ownership.

If the Battle/objective model only exposes side-level control, that control remains **custody/objective state**, never ownership/acquisition.

Later departure must consume the actual custody state; it may require transfer, handoff, drop or another legitimate consequence rather than teleporting the object to the protagonist.

---

# 11. Academy Kakashi — `TAKE HIM DOWN` reconciliation

This contract consumes Stephen-approved Writing correction commit `7434e9e...` over superseded scripted detail in `93d91d9e...`.

The route remains materially distinct from `DEMAND THE PACKAGE`.

## 11.1 Locked Story entry state

Current branch lineage:

`GET CLOSER`
→ resolver `FAILURE`
→ `STAY ON THE PACKAGE`
→ pursuit `SUCCESS`
→ Pakkun legitimately present
→ protagonist chooses `TAKE HIM DOWN`.

Still locked:

- Kakashi skips negotiation;
- Kakashi's opening intervention separates ANBU Marked Target from the package;
- package becomes neutral/contested before the main Battle state;
- Pakkun is materially present;
- current Battle caller remains **Kakashi Hatake with Pakkun as a temporary Summon vs ANBU Marked Target** where current Battle authority is consumed;
- route history remains distinct from `DEMAND THE PACKAGE`.

## 11.2 Pakkun autonomy window

After Kakashi's opening intervention commits the package-neutral state and before the protagonist's next actionable Battle/Story decision where the seam permits, Pakkun receives a due autonomy opportunity from the actual state.

Writing does **not** hard-code:

`Pakkun must secure/guard the package`.

Legitimate results may include securing/guarding/blocking/supporting/holding/another eligible action, but only after state-derived eligibility.

If Pakkun chooses an objective/custody action that can legitimately resolve before Battle, commit that state before Battle entry.

If Pakkun's selected intent is inherently a Battle action, do not resolve it as free damage/support. Carry the intent/posture into Battle only through an authorised Combat seam.

## 11.3 Victory

Current authored Story authority may still fix the high-level victory continuation where already closed:

- package recovered by Kakashi's side / ultimately returned through the authorised continuation;
- surviving ANBU Marked Target captured into Kakashi custody where current Story authority says so;
- existing post-capture disposition family becomes eligible.

Participant autonomy does not override an intentionally authored Story invariant.

## 11.4 Defeat — corrected rule

The earlier universal rule from `93d91d9e...`:

`TAKE HIM DOWN defeat = Pakkun guarantees package recovery + target escapes`

is superseded.

Binding successor rule:

> **TAKE HIM DOWN defeat = ANBU Marked Target defeats Kakashi; target custody is lost; package custody is whatever the committed participant/Battle state actually established.**

Therefore:

- if Pakkun legitimately secured the package before/during the authorised resolver flow, Kakashi/Pakkun's side may retain the objective despite losing Battle;
- if Pakkun did not secure it, runtime must not fabricate package recovery after defeat;
- no package result may be inferred merely from the button label, temporary Summon presence or Battle defeat;
- later debrief / Minato evaluation / Origin Chronicle Receipt must read the actual committed package/custody history.

## 11.5 Demand the Package remains separately authored

This correction does not rewrite the separately approved `DEMAND THE PACKAGE` branch.

Current authority for that route establishes its own Battle entry and post-Battle outcomes, including the approved defeat state in which ANBU Marked Target escapes with the package.

Participant-first autonomy operates only inside the authored envelope; it is not permission to invalidate exact Story outcomes that Stephen deliberately fixed.

---

## 12. Presentation and Knowledge

The Scene Board may show a participant's autonomous action only when observer-safe.

Do not expose:

- hidden intent;
- private motive;
- inaccessible Knowledge;
- internal selection scores;
- excluded candidate actions;
- future consequences.

Presentation text does not create the action.

Canonical flow:

`authoritative state`
→ `participant autonomy resolves`
→ `committed receipt`
→ `observer-safe Scene Board performance`
→ `protagonist choice from updated state`.

---

## 13. Alpha-safe implementation contract

For Alpha, this does **not** require:

- unrestricted generative NPC planning;
- a general-purpose autonomous world simulation;
- a new Behaviour engine inside Shinobi Chronicles;
- a rewrite of working Mission #121 machinery merely for abstraction elegance.

A bounded deterministic participant-autonomy layer is sufficient if it preserves the semantics above.

First required consumer remains Academy Kakashi through the active neutral Story Decision Realisation implementation lane.

Do not propagate broadly until the Kakashi benchmark proves:

1. participant windows are evaluated before protagonist Story decisions;
2. eligible state is Knowledge/capability/history safe;
3. selected participant intent persists across save/load;
4. UI refresh does not reroll participant action;
5. participant action can genuinely alter protagonist affordances/state;
6. no arbitrary actor-ordering decides contested history;
7. Battle receives committed initial state without free CE damage/actions;
8. Battle turn/action economy remains Combat-owned;
9. a temporary Summon does not gain ownership/acquisition semantics;
10. no participant action is double-consumed pre-Battle and in-Battle;
11. Kakashi `TAKE HIM DOWN` defeat reads actual committed package custody rather than the superseded universal result;
12. Chronicle Receipt / debrief / later Story consume the same committed result;
13. browser Golden remains unclaimed until installed-browser behaviour is approved.

---

## 14. Final lock

> **At Story decision boundaries, due autonomous participants resolve from committed state before the next protagonist choice is derived.**

> **Participant-first ordering is a phase rule, not a command that every NPC visibly acts and not a universal claim that NPCs always act before the protagonist inside every owning domain.**

> **If participant ordering materially changes history, ordering itself requires legitimate authority.**

> **Combat owns in-Battle initiative and action economy; CE may not manufacture free autonomous Battle actions.**

> **Temporary participant/Summon presence does not create ownership, acquisition, assignment, name Knowledge or automatic obedience.**

> **Academy Kakashi `TAKE HIM DOWN`: package-neutral entry remains locked; Pakkun's exact response is CE-autonomous; defeat loses target custody while package custody follows the actual committed autonomy/Battle state.**

> **Save/load replays committed autonomy; presentation refresh does not reroll it.**
