# Shinobi Chronicles — Academy Team Formation Presentation Contract

**Status:** BINDING ALPHA UI PRESENTATION CONTRACT — BACKEND SEMANTICS CLOSED / UI IMPLEMENTATION + RUNTIME VALIDATION SEPARATE  
**Owner:** UI / Assets  
**Scope:** Initial Academy Team Formation only

---

## 1. Purpose

This contract defines the Alpha player-facing presentation and interaction surface for the initial Academy Team Formation step.

It does not redefine acquisition, eligibility, ownership, Registry identity, Rank, Progression, or persistence semantics.

Authoritative upstream formation rule remains:

`1 Origin protagonist + exactly 2 distinct eligible Academy teammates`

Formation occurs after the committed Origin/Active-Konoha entry boundary and before ordinary Academy free play.

Preserve:

**candidate eligibility ≠ ownership**

**selection ≠ acquisition / commit**

**UI presentation ≠ semantic authority**

**Origin protagonist ≠ teammate slot**

**formation complete ≠ free-play UI merely rendered**

---

## 2. Alpha journey placement

The initial Academy Team Formation surface is a mandatory transitional step in the opening journey.

Required journey order:

`Origin completion`

→ committed Active-Konoha entry boundary

→ `YOUR CHRONICLE BEGINS` presentation / continuation

→ **ACADEMY TEAM FORMATION**

→ authoritative formation commit

→ formation confirmation receipt

→ authoritative first Konoha map/tutorial continuation

→ ordinary Academy free play

The player must not be able to bypass incomplete formation into ordinary Academy free play.

If the application reloads while formation remains incomplete, the journey should resume into the required formation step rather than silently opening ordinary Academy free play.

UI must not recommit Origin completion merely because it renders or resumes the formation surface.

---

## 3. Surface type

Alpha uses one dedicated full-page / full-shell transitional surface titled:

# ACADEMY TEAM FORMATION

This is not My Clan, not Acquisition, not a generic roster-management screen, and not a permanent team-reform menu.

It may reuse the established Shinobi Chronicles dark navy / black / metallic gold UI family and approved collectible Character Card presentation, but it must remain visually focused on one decision:

**choose exactly two Academy teammates for the initial team.**

No separate bespoke semantic state model is permitted.

---

## 4. Required layout hierarchy

The surface must clearly present four areas.

### A. Fixed Origin protagonist

Show the already-authoritative Origin protagonist as the fixed first member of the three-person Academy team.

Recommended label:

**YOUR SHINOBI**

The protagonist slot is visually locked/fixed and cannot be removed, swapped, or counted as one of the two teammate selections.

Use the authoritative representation identity and approved collectible-card/presentation projection supplied by Registry/Assets/runtime.

Do not infer the protagonist from card order, most-recent acquisition, portrait filename, or current UI focus.

### B. Two teammate slots

Show exactly two initially empty selectable formation slots:

`TEAMMATE 1`

`TEAMMATE 2`

As the player selects candidates, those slots project the pending selected identities.

The slots represent pending UI selection until authoritative confirmation succeeds.

### C. Eligible Academy candidate roster

Show only the authoritative eligible teammate candidates supplied by the existing backend/selection authority.

Each candidate entry should use its approved Academy representation/card presentation and display sufficient identity information to make the choice unambiguous.

The UI must not manufacture, broaden, narrow, rank, or recalculate eligibility.

The UI must not treat a displayed candidate as already owned merely because the candidate is selectable here.

### D. Selection / confirmation controls

Always show a clear count equivalent to:

`0 / 2 SELECTED`

`1 / 2 SELECTED`

`2 / 2 SELECTED`

Primary commit control:

**CONFIRM TEAM**

`CONFIRM TEAM` remains disabled until exactly two distinct valid candidates are pending-selected.

---

## 5. Selection interaction

Candidate selection is reversible until commit.

Expected Alpha interaction:

- selecting an eligible candidate adds that candidate to the next available teammate slot;
- selecting an already-selected candidate again, or using an explicit remove action on that slot, removes that pending selection;
- selecting a third candidate while two are already selected must not silently replace an existing selection unless the UI explicitly requires the player to remove one first;
- the same Registry identity cannot fill both teammate slots;
- the fixed Origin protagonist cannot fill a teammate slot.

Preferred behavior is explicit removal before replacement because it preserves clarity and avoids accidental substitution.

Selection highlighting should be clearly visible by mouse, keyboard, and other supported input methods.

Do not expose internal raw Registry IDs to the ordinary player-facing UI.

---

## 6. Candidate card interaction

The candidate roster is a selection surface, not proof of ownership.

A candidate card may optionally support a separate preview/info affordance using the approved collectible Character Card presentation.

If preview exists, it must not imply acquisition and must not trigger selection/commit merely by closing or inspecting the card.

If Alpha implementation needs to remain minimal, candidate selection may be the only card action.

Do not route candidates through My Clan merely to preview them; My Clan represents recruited/under-command ownership and is not the correct source surface for uncommitted eligible candidates.

---

## 7. No optimisation dashboard

Initial Team Formation must not become a hidden-combat optimiser or Rank gate dashboard.

Do not show or calculate:

- aggregate Team PL;
- Average PL;
- hidden compatibility scores;
- predicted Promotion probability;
- secret relationship checks;
- hidden mission eligibility;
- automatic 'best team' recommendations;
- fake role requirements not supplied by authority.

If runtime supplies ordinary authorised character information that already belongs to the approved card/presentation contract, UI may display it normally.

UI must not invent comparative mechanics to help the player choose.

---

## 8. Confirmation semantics

`CONFIRM TEAM` is the explicit formation commit action.

On activation:

1. UI sends the two exact pending selected representation IDs to the existing authoritative formation/acquisition backend;
2. UI enters a pending/busy state and prevents duplicate confirmation;
3. UI does not project success until authoritative confirmation returns success;
4. on failure, UI retains/reloads authoritative state and shows an observer-safe error without pretending ownership/formation succeeded;
5. on success, UI stops treating the two selected candidates as merely pending and renders the committed three-person Academy team receipt.

UI must not implement acquisition itself.

UI must not convert selection into ownership before confirmation succeeds.

Preserve:

**selection ≠ acquisition**

**button press ≠ confirmed commit**

**UI receipt ≠ source of truth**

---

## 9. Post-commit confirmation receipt

After successful authoritative confirmation, keep the same surface and transition it into a clear completed state rather than immediately disappearing on the same frame as commit.

Recommended presentation:

**TEAM FORMED**

Display:

- fixed Origin protagonist;
- committed Teammate 1;
- committed Teammate 2.

Pending selection controls are removed/disabled.

Primary navigation control becomes:

**CONTINUE**

`CONTINUE` is navigation/continuation only.

It must not perform acquisition again and must not recommit formation.

Preserve:

**CONFIRM TEAM ≠ CONTINUE**

**formation commit ≠ navigation**

The next destination is supplied by the authoritative opening-flow continuation. Alpha expects the first Konoha map/tutorial continuation before ordinary Academy free play, but UI must not duplicate that journey state in a second local progression model.

---

## 10. Reload / idempotence behavior

Before successful commit:

- pending local selection is not ownership, Chronicle history, or acquisition;
- a reload may clear pending UI selection unless Coding deliberately persists a harmless draft;
- authoritative incomplete formation must still reopen the required formation surface.

After successful commit:

- reload must not reacquire teammates;
- reload must not duplicate team membership;
- the UI should consume the authoritative committed formation state;
- if continuation has not yet occurred, it may show the completed receipt/CONTINUE state or resume the next authoritative journey step according to Coding's persisted flow contract.

UI does not manufacture idempotence; it consumes the authoritative result.

---

## 11. Invalid / insufficient state

The UI must fail closed rather than invent candidates.

If the authoritative runtime cannot supply:

- one exact Origin protagonist;
- an incomplete formation state where formation is required; and
- enough legitimate eligible candidate identities to choose two distinct teammates,

then the production UI must not silently substitute owned characters, Registry neighbours, filename matches, or generic Academy cards.

Show a safe formation-unavailable/error state and preserve diagnostics for Coding.

Do not bypass the required formation gate merely because the candidate payload is malformed.

---

## 12. Accessibility / input requirements

Alpha implementation must support the project's ordinary keyboard/focus interaction expectations.

At minimum:

- all candidate selections are reachable by keyboard;
- selected/unselected state is programmatically distinguishable;
- the fixed protagonist is announced/presented as fixed rather than selectable;
- selection count updates accessibly;
- `CONFIRM TEAM` disabled state is real, not cosmetic;
- pending/busy confirmation prevents duplicate activation;
- focus remains logical after candidate add/remove and after commit.

Do not print debug-state words such as `FOCUSED` into production presentation.

---

## 13. What UI does not own

UI does not decide:

- which Academy representations are eligible;
- whether a candidate is obtainable;
- acquisition rules;
- ownership persistence;
- Registry identity;
- Rank;
- Stats / PL;
- Progression consequences;
- Battle deployment beyond the already-closed team semantics;
- later Genin team reform rules.

Those remain with their owning authorities.

This surface only presents the initial closed formation transaction.

---

## 14. Alpha Golden / runtime acceptance checks

Implementation is not considered runtime-validated until at least these behaviors are proven:

1. exact Origin protagonist is fixed and cannot occupy a teammate slot;
2. only authoritative eligible candidates are shown;
3. displaying a candidate does not acquire it;
4. one selected teammate does not enable confirmation;
5. exactly two distinct selected teammates enables confirmation;
6. duplicate identity cannot fill both teammate slots;
7. selection remains reversible before commit;
8. confirming calls the authoritative backend once for the exact two selected identities;
9. failed confirmation does not create ownership/team membership;
10. successful confirmation produces exactly `1 protagonist + 2 teammates`;
11. `CONTINUE` does not reacquire/recommit;
12. reload after commit does not duplicate acquisition or membership;
13. incomplete formation cannot be bypassed into ordinary Academy free play;
14. My Clan is not used as proof that an eligible but uncommitted candidate is owned;
15. UI never calculates Team PL, compatibility, or hidden eligibility.

---

## 15. Final Alpha lock

For Alpha, the player-facing formation flow is:

**YOUR CHRONICLE BEGINS**

→ **ACADEMY TEAM FORMATION**

→ fixed Origin protagonist + authoritative candidate roster

→ choose exactly two distinct eligible Academy teammates

→ **CONFIRM TEAM**

→ authoritative acquisition/formation result

→ **TEAM FORMED** receipt

→ **CONTINUE**

→ authoritative first Konoha map/tutorial continuation

No alternate initial formation UI is required for Alpha.

Preserve:

**candidate eligibility ≠ ownership**

**selection ≠ acquisition / commit**

**CONFIRM TEAM ≠ CONTINUE**

**UI presentation ≠ semantic authority**

**Origin completion ≠ team formation**

**team formation ≠ ordinary free play until authoritative commit succeeds**
