# Academy Kakashi Origin — Post-Battle Disposition Simplification

**Date:** 2026-09-19  
**Owner:** Stephen / Writing / Story — Konoha  
**Status:** **STEPHEN-APPROVED — BINDING SIMPLIFICATION / SUPERSESSION AUTHORITY**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Reason for change

The prior Academy Kakashi Origin flow exposed a hidden distinction between:

- `CONTROLLED_DEFEATED`; and
- `DEFEATED_BUT_NOT_CONTROLLED`.

That distinction was then used to change player-facing post-Battle choices such as:

- `KILL HER` vs `ATTEMPT TO KILL HER`;
- `RESTRAIN HER AND CONTINUE` vs `ATTEMPT TO RESTRAIN HER AND CONTINUE`.

In the current playable Origin, however, ordinary Battle victory does not provide the player with a clear, deliberate way to create `CONTROLLED_DEFEATED`. Requiring a hidden control state before the player may choose a post-Battle disposition therefore creates complexity without useful gameplay.

Stephen has directed that this be removed from the playable Kakashi Origin decision surface.

Canonical correction:

> **Win the Battle first. Then choose what Kakashi does with the defeated opponent.**

---

## 2. New playable rule

For Academy Kakashi Origin post-Battle disposition scenes:

> **A valid Kakashi Battle victory is sufficient to open the authored post-Battle disposition choices.**

The player does not need to:

- finish the opponent while bound by Ninja Wire;
- use a specific immobilising skill;
- satisfy a hidden `CONTROLLED_DEFEATED` predicate;
- know or manipulate an internal custody/control classification.

The Battle establishes that the opponent is defeated.

The following Story choice establishes what Kakashi does next.

---

## 3. Player-facing choice labels

Where the Story has already authored the corresponding disposition, do not change the player-facing label solely because an internal control classification differs.

Use the direct intent labels:

- **KILL HER / KILL HIM**
- **RESTRAIN HER AND CONTINUE / RESTRAIN HIM AND CONTINUE**
- **TAKE HER BACK TO ANBU / TAKE HIM BACK TO THE ANBU**
- **TAKE HER TO THE UCHIHA POLICE FORCE / BRING HIM TO THE UCHIHA POLICE FORCE**
- **LET HIM GO**
- other already-approved direct disposition labels where applicable.

Do not expose:

- **ATTEMPT TO KILL HER / HIM**
- **ATTEMPT TO RESTRAIN HER / HIM AND CONTINUE**

merely because the defeated participant lacks an internal secure-control classification.

If a future scene has an independently authored interruption, escape, third-party intervention or other factual reason that makes an action genuinely uncertain, that uncertainty must come from that scene/resolver authority — not from the generic hidden `CONTROLLED_DEFEATED` split.

---

## 4. Restraint semantics

When Kakashi wins the Battle and selects:

**RESTRAIN HER AND CONTINUE**  
or  
**RESTRAIN HIM AND CONTINUE**

the immediate Story result is:

> **Kakashi successfully field-secures that defeated participant alive, then continues whatever pursuit remains legally available.**

This is not institutional custody.

Preserve the distinction between:

- field-secured restraint at the current location;
- later collection;
- active escort;
- ANBU institutional custody;
- Uchiha Police institutional custody;
- package custody;
- participant life/death.

The simplification removes the **pre-restraint control prerequisite**.

It does not collapse all custody states into one.

---

## 5. Lethal semantics

Where an authored post-Battle **KILL HER / KILL HIM** choice is available after Kakashi's Battle victory, the selected action is deterministic for this Origin disposition window.

The player should not need an invisible control classification to know whether `KILL` means kill.

Preserve:

- target death as a separately committed Story fact;
- package custody separately;
- pursuit timing separately;
- participant identity/history separately;
- existing downstream reaction / report consequences.

Legacy lethal-attempt routes may remain as historical provenance for already-authored or already-saved states, but the current player-facing post-Battle menu must not select `ATTEMPT TO KILL` solely from the removed control-state gate.

---

## 6. Internal classification compatibility

Existing reusable CE classification such as `CONTROLLED_DEFEATED` and `DEFEATED_BUT_NOT_CONTROLLED` may remain internally for compatibility with other systems.

For Academy Kakashi Origin, however:

> **Those classifications no longer gate, rename or hide the authored post-Battle disposition choices.**

Do not require Battle to manufacture custody.

Do not require Combat skills to manufacture Story custody.

Do not infer institutional custody from Battle victory.

The Story disposition choice owns the next Story fact.

---

## 7. STOP THE ASSASSIN application

After Kakashi defeats Masked Interceptor within the existing 1–4-turn pursuit window, the current choice family should use direct intent labels:

1. **GO AFTER PACKAGE SMUGGLER**
2. **GO AFTER ANBU MARKED TARGET**
3. **KILL HER**
4. **TAKE HER BACK TO ANBU**
5. **TAKE HER TO UCHIHA POLICE FORCE**
6. **RESTRAIN HER AND CONTINUE**

No `ATTEMPT TO...` substitution is required from MI's control classification.

If Kakashi selects **RESTRAIN HER AND CONTINUE**:

- MI becomes field-secured alive;
- no immediate ANBU/Police transfer occurs;
- legal pursuit is re-evaluated from the existing committed timing/position state;
- later collection / escape-intervention / group-transfer handling continues under the reusable field-custody contract.

---

## 8. Package Smuggler application

After Kakashi defeats Package Smuggler:

- package recovery remains a separate Story occurrence;
- PS life/custody remains separate from package custody;
- where lethal disposition is offered, use **KILL HIM**;
- where continuation remains legal, use **RESTRAIN HIM AND CONTINUE**;
- do not require a hidden control classification for either player-facing choice.

Existing PS <=3 timing for later AMT reach remains unchanged.

---

## 9. ANBU Marked Target application

After Kakashi/Pakkun defeat ANBU Marked Target:

- the approved direct disposition family remains available from Battle victory;
- control classification does not rename `KILL HIM` to `ATTEMPT TO KILL HIM`;
- final restraint-transfer choices remain direct;
- package state remains separate;
- Pakkun remains autonomous.

---

## 10. Effect on existing blockers

This authority removes two previously requested resolver gaps from the active Kakashi Origin design:

1. no separate **MI/PS attempted-restraint success resolver** is required merely to establish initial field restraint after a Battle victory;
2. no separate **PS attempted-lethal resolver** is required merely because PS was Battle-defeated without an internal control classification.

CE #244 remains relevant only for the reusable consequences **after field restraint exists**, including:

- representing field-secured participants while Kakashi is elsewhere;
- later escape/intervention;
- accumulated captive sets;
- later collection;
- participant-by-participant group transfer to ANBU or Uchiha Police.

The field-secure action itself is no longer uncertain.

---

## 11. Supersession

This authority supersedes conflicting Kakashi-Origin-specific rules that say:

- `CONTROLLED_DEFEATED` is required before deterministic restraint;
- `DEFEATED_BUT_NOT_CONTROLLED` must expose `ATTEMPT TO RESTRAIN...`;
- `CONTROLLED_DEFEATED` is required before the authored post-Battle `KILL` label;
- ordinary Battle victory must be converted into a separate hidden control state before the player may select a direct disposition.

It does not globally delete reusable CE classification outside this Origin.

It does not alter Battle victory/loss mechanics.

It does not alter package custody rules.

It does not alter the 1–4 MI pursuit window or 1–3 PS->AMT continuation window.

---

## Final lock

> **Battle decides who won the fight.**
>
> **The player then decides what Kakashi does with the defeated opponent.**
>
> **No hidden control-state puzzle sits between those two things.**
