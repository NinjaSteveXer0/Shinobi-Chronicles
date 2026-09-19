# Shinobi Chronicles — Global Post-Battle Disposition Player Agency and Control-State Simplification

**Date:** 2026-09-19  
**Owner:** Stephen / CE-Codex-Coordination / Writing / Combat  
**Status:** **STEPHEN-APPROVED — BINDING GLOBAL SUPERSESSION AUTHORITY — ALL PRESENT AND FUTURE FIGHTS**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Purpose

Stephen has directed that the Academy Kakashi post-Battle simplification is not a route-specific exception.

It is a **global Shinobi Chronicles rule for all present and future fights**.

The project must not require a player to understand or manufacture a hidden post-Battle control classification before they can use ordinary authored post-Battle choices.

The old pattern:

`Battle victory -> hidden CONTROLLED_DEFEATED check -> maybe direct action / maybe ATTEMPT TO action`

is rejected as unnecessary gameplay complexity.

Canonical replacement:

> **Battle decides who won the fight.**
>
> **Then the player chooses an authored post-Battle disposition.**
>
> **No hidden control-state puzzle sits between those two things.**

---

## 2. Global scope

This authority applies to:

- all currently implemented Battles;
- all Alpha Battles not yet implemented;
- all future Story Battles;
- mission Battles;
- optional Battles;
- boss Battles;
- Origin Battles;
- multi-target Battles;
- PvE encounters that transition into authored Story disposition;
- future routes, villages, arcs, side stories and expansions.

It is not limited to Academy Kakashi.

Any future specialist, successor chat or implementation must consume this authority before creating post-Battle player-facing disposition logic.

---

## 3. Battle victory and Story disposition

A factual Battle victory establishes that the relevant opponent has been **defeated for the resolved Battle**.

Where Story/World has authored a post-Battle choice, Battle victory is sufficient to enter that choice surface unless a separate already-committed factual event makes the target unavailable.

Examples of legitimate unavailability include:

- the target escaped as part of the actual Battle/result;
- the target died from an already-committed factual cause;
- a third party removed the target;
- the environment separated the participants;
- another exact authored occurrence made the target physically unavailable.

The generic absence of a hidden `CONTROLLED_DEFEATED` classification is **not** sufficient reason to block, rename or downgrade the choice.

---

## 4. Direct player-facing intent

Where authored and factually available, use direct player-facing intent such as:

- **KILL**
- **RESTRAIN**
- **CAPTURE**
- **TAKE TO ANBU**
- **TURN OVER TO POLICE**
- **LET GO**
- **INTERROGATE**
- **CONTINUE PURSUIT**
- other exact Story-authored disposition labels.

Do not automatically rewrite a direct choice into:

- `ATTEMPT TO KILL`;
- `ATTEMPT TO RESTRAIN`;
- `ATTEMPT TO CAPTURE`;

solely because an internal post-Battle control/custody classification is unresolved.

If an action is genuinely uncertain for a specific scene, the uncertainty must come from an explicit authored factual condition or resolver — not from a generic invisible control-state gate.

---

## 5. Restraint and capture

When Story offers a post-Battle **RESTRAIN / CAPTURE** choice after a valid Battle victory, selecting that choice commits the authored immediate restraint/capture result unless the scene already contains a separate explicit factual complication.

The player does not need to:

- finish with Ninja Wire;
- end the Battle while an immobilisation debuff is active;
- use a specific bind/stun/control Skill;
- satisfy an invisible control predicate.

Combat control effects may still matter **inside Battle** for their own Combat mechanics.

They do not become a hidden prerequisite for ordinary post-Battle Story agency.

Post-Battle restraint/capture remains separate from:

- institutional custody;
- transport;
- later escape;
- later rescue/intervention;
- field-secured persistence;
- package/object custody;
- mission success;
- target allegiance;
- Knowledge.

---

## 6. Lethal disposition

Where Story offers a direct post-Battle **KILL** choice after a valid Battle victory and the target is factually present/alive, selecting **KILL** means kill.

Do not downgrade the action to `ATTEMPT TO KILL` solely because the target lacks a hidden secure-control classification.

A genuinely uncertain lethal action remains possible only when the scene itself establishes a factual reason for uncertainty, such as:

- active third-party intervention;
- target escape already in progress;
- environmental separation;
- another authored resolver-owned complication.

The uncertainty must be visible in the factual Story situation, not derived from an invisible generic classification.

---

## 7. Internal control classifications

Existing classifications such as:

- `CONTROLLED_DEFEATED`;
- `DEFEATED_BUT_NOT_CONTROLLED`;

may remain internally where another system legitimately consumes them.

However, globally:

> **They must not gate, rename or hide ordinary authored post-Battle player choices.**

They also must not require a player to engineer a particular Battle finisher in order to access post-Battle Story agency.

Internal classification may still be useful for:

- AI;
- diagnostics;
- save compatibility;
- historical receipts;
- internal state analysis;
- another domain-owned mechanic that does not alter the ordinary post-Battle choice surface.

---

## 8. What Battle victory still does NOT mean

This simplification does **not** collapse result layers.

Preserve:

- Battle victory != mission success;
- Battle defeat != mission failure;
- Battle victory != institutional custody;
- Battle victory != package/object custody;
- Battle victory != automatic death;
- Battle victory != automatic interrogation success;
- Battle victory != permanent prisoner state;
- Battle victory != automatic relationship/allegiance change.

Battle gives the player the earned post-Battle interaction window.

The selected Story disposition then commits the next authored fact.

---

## 9. Present-content audit requirement

All currently implemented Battles that expose post-Battle Story choices must be audited for the obsolete control-state gate.

Search for logic equivalent to:

- `CONTROLLED_DEFEATED ? KILL : ATTEMPT TO KILL`;
- `CONTROLLED_DEFEATED ? RESTRAIN : ATTEMPT TO RESTRAIN`;
- hidden custody/control state blocking an otherwise authored post-Battle choice;
- special Battle-finisher requirements whose only purpose is to create post-Battle control;
- control-state labels shown to the player solely to explain choice availability.

Where found, remove the gate while preserving the actual authored factual availability of the target.

Do not blindly alter a route where a separate explicit escape/death/interruption fact already makes the target unavailable.

---

## 10. Future-content acceptance rule

No future Battle-to-Story implementation is complete if it requires:

> `win -> discover hidden control requirement -> replay Battle using special restraint condition -> unlock ordinary disposition`

unless that entire special-control mechanic is itself explicitly designed, player-visible, and deliberately approved as the point of that encounter.

The normal standard is:

> **win -> post-Battle choice -> consequence**

This rule must be included in future Battle/Story implementation reviews and regression coverage.

---

## 11. Supersession of prior reusable rule

This authority supersedes the **player-facing gating consequences** of:

`Documentation/Coordination/Post_Battle_Control_State_Classification_and_AK_SA_025_Resolver_Addendum_2026-09-16.md`

where that document generalised:

> `CONTROLLED_DEFEATED` requires an independent secure-control basis

and downstream implementations used that classification to decide whether a direct post-Battle action was available or became an `ATTEMPT TO...` action.

The older document remains valid for:

- factual classification provenance;
- separation of Battle status from life/custody/object state;
- preventing Battle from inventing institutional custody;
- internal compatibility where classification remains useful.

It is no longer valid as authority to place a hidden control prerequisite between Battle victory and ordinary authored post-Battle player dispositions.

---

## 12. Academy Kakashi relationship

The Kakashi-specific authority remains a concrete application:

`Documentation/Story/Academy_Kakashi_Post_Battle_Disposition_Simplification_2026-09-19.md`

This global authority broadens that rule across the entire game.

Where wording conflicts on scope:

> **this global authority wins.**

---

## 13. Regression expectations

Current and future QA should verify:

1. Battle victory enters the authored post-Battle choice surface;
2. direct choices are not silently renamed by hidden control state;
3. no binding Skill/finisher is required merely to unlock restraint/capture;
4. direct KILL means kill where factually available and authored;
5. direct RESTRAIN/CAPTURE commits the authored immediate restraint/capture result;
6. institutional custody remains separate;
7. object/package custody remains separate;
8. explicit escape/death/interruption facts still legitimately remove unavailable choices;
9. save/load does not resurrect the obsolete gate;
10. new Battles cannot reintroduce the gate through copied legacy code.

---

## Final lock

> **This applies to every fight in Shinobi Chronicles — present and future.**
>
> **Battle victory earns the post-Battle decision window.**
>
> **The player chooses the disposition; hidden control-state bookkeeping does not choose it for them.**


---

## 14. Restraint-method projection

Stephen clarification, 2026-09-19:

A deterministic post-Battle **RESTRAIN / CAPTURE** disposition does not mean the Story invents invisible rope or generic handcuffs.

The physical method must project from a restraint-capable Skill, technique, tool or item the acting character actually has available under current capability / Inventory authority.

Examples:
- Academy Kakashi -> **Wire Snare** (`academy_kakashi_wire_snare`) using ninja wire;
- Anko -> **Shadow Snake Binding** where that exact capability is currently owned/available.

Canonical rule:

> **The player chooses RESTRAIN. The character uses an actually available restraint method from their legitimate kit to perform it.**

This is **not** a Battle-finisher requirement.

The target does not need to already be bound when Battle ends.

Do not require:
- the restraint Skill to have been used during the Battle;
- an active control condition to survive the Battle boundary;
- a specific Skill when another legitimate restraint-capable method is available.

Where multiple legitimate restraint methods exist, presentation/resolver may use the current authored/default appropriate method without turning that choice into a hidden minigame.

Where no legitimate restraint-capable Skill/tool/item exists, do not fabricate one. The owning capability/Inventory/Story authority must determine whether a RESTRAIN disposition is available or whether another authored method is supplied.

This capability check is distinct from the removed `CONTROLLED_DEFEATED` gate:
- **old rejected gate:** enemy must already be controlled;
- **current rule:** defeated enemy may be restrained after Battle using the actor's legitimate restraint method.

The restraint occurrence should preserve the method/source reference where material so later Chronicle history can say how the participant was secured.

> **Post-Battle restraint is capability-driven, not pre-existing-control-driven.**
