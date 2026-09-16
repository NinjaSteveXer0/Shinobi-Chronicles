# Shinobi Chronicles — Academy Kakashi Analyze Opponent Replacement: Substitution Jutsu

**Date:** 2026-09-16  
**Owner:** Combat / Skills / Items / Weapons  
**Status:** **BINDING COMBAT SUPERSESSION — CODING CONSUMPTION REQUIRED**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Decision

`academy_kakashi_prodigys_read` / player-facing `Analyze Opponent` is removed from Academy Kakashi's prepared Battle palette.

Reason: its current implementation consumes a full controller action but provides no concrete Battle payoff beyond bounded observable information. That is not a meaningful player choice for the Alpha Battle tutorial deck.

Do not attempt to disguise the old action with stronger tooltip copy. Replace the prepared-Battle slot.

The replacement is:

- **Stable Skill ID:** `academy_kakashi_substitution_jutsu`
- **Player-facing name:** `Substitution Jutsu`
- **Category:** `DEFENSE`
- **Target:** self
- **Use limit:** once per Battle
- **Action economy:** consumes Kakashi's normal controller action opportunity; no free action and no extra turn

## 2. Exact player-facing effect

**Card summary:**

> Cut the damage of the next direct attack against Kakashi by 50%.

**Expanded Skill Guide:**

> Prepare a substitution to soften the next direct hit against Kakashi.
>
> - The next qualifying direct attack is reduced by 50% before Stamina reduces the damage.
> - Works once, then the defense ends.
> - Can be used once per Battle.
> - Deals no damage.

Preferred compact card badges:

`DEFENSE` · `NEXT DIRECT HIT -50%` · `ONCE PER BATTLE`

The primary player copy must not mention resolver vocabulary such as `ratio_guard_state`, `pre-Stamina packet`, `transient state`, or `authored rule`.

## 3. Binding resolver semantics

This Skill creates a one-use, self-owned defensive guard state on Academy Kakashi.

A **qualifying hit** is the next hostile **direct damaging packet** whose target is Kakashi.

When that packet resolves:

1. calculate the prevented Attack PL as `floor(incomingAttackPL × 0.50)`;
2. subtract that amount from the incoming Attack PL;
3. resolve ordinary Stamina mitigation against the reduced Attack PL;
4. consume the Substitution Jutsu guard state.

Examples before Stamina mitigation:

- incoming Attack PL 5 -> prevent 2 -> resolve as PL 3;
- incoming Attack PL 6 -> prevent 3 -> resolve as PL 3;
- incoming Attack PL 7 -> prevent 3 -> resolve as PL 4;
- incoming Attack PL 8 -> prevent 4 -> resolve as PL 4.

The state does **not** trigger on:

- setup-only actions;
- control-only actions;
- information/analysis actions;
- non-damaging utility actions;
- damage aimed at another participant.

If no qualifying hit occurs before Battle ends, the state expires with the Battle.

## 4. What this Skill does NOT do

Substitution Jutsu does not:

- grant automatic evasion;
- make Kakashi untargetable;
- cancel the enemy's action;
- create a free counterattack;
- grant an extra action;
- alter Base, Current, Effective, or Battle PL directly;
- change Kakashi's Stats;
- heal Battle PL;
- block all damage for a turn;
- automatically remove control/status effects;
- alter Story custody, injury, death, escape, or outcome facts.

Any secondary state attached to an incoming attack remains governed by that attack's own exact rules. This defensive Skill only changes the qualifying direct damage packet unless separate authority explicitly says otherwise.

## 5. Prepared palette supersession

Academy Kakashi's Alpha prepared Battle palette becomes:

1. `academy_kakashi_kunai_quickdraw` — `Quick Kunai Strike` — ATTACK
2. `academy_kakashi_clone_feint` — `Clone Feint` — SETUP
3. `academy_kakashi_opening_exploit` — `Opening Strike` — ATTACK
4. `academy_kakashi_wire_snare` — `Wire Snare` — CONTROL
5. `academy_kakashi_substitution_jutsu` — `Substitution Jutsu` — DEFENSE

`academy_kakashi_prodigys_read` must not appear as a selectable prepared Skill in new Academy Kakashi Battles after this supersession.

The old ID may remain in code/data only where needed for legacy diagnostics, save compatibility, or historical Battle log interpretation. It is no longer an active prepared-palette authority.

## 6. Save/load compatibility

For an unresolved saved Academy Kakashi Battle created before this supersession:

- if the active prepared palette still contains `academy_kakashi_prodigys_read`, runtime may deterministically replace that uncommitted palette slot with `academy_kakashi_substitution_jutsu` on load/reprojection;
- do not reroll or alter any other Battle state;
- if `academy_kakashi_prodigys_read` was already committed earlier in that Battle's history, preserve that historical action exactly as the old no-damage observable-analysis result;
- do not retroactively convert a previously committed Analyze Opponent action into Substitution Jutsu or grant a defensive state from it.

## 7. Relationship to #214 viability

This replacement does **not** reopen the closed Academy Kakashi MI / PS / AMT viability calibration.

The closed offensive proof lines rely on:

- Quick Kunai Strike PL5;
- Clone Feint;
- Opening Strike PL5 / enhanced PL7;
- Pakkun Nipping Bite PL7 where Pakkun is authorised.

`Analyze Opponent` was not required by those proofs. Replacing it with an optional once-per-Battle defensive action therefore does not change the established offensive damage values, enemy PL, Stamina, timing gates, Pakkun action economy, or Story reachability authority.

Using Substitution Jutsu still consumes a controller action. A player who chooses defense instead of offense can therefore take longer and may miss an existing Story timing gate. That is a legitimate tactical tradeoff, not a hidden timing exemption.

## 8. Coding/runtime consumption

Coding / Runtime issue `#188` should implement this as the smallest extension of the existing Battle system:

- add exact prepared Skill definition `academy_kakashi_substitution_jutsu`;
- use the existing one-use ratio/guard machinery if compatible with the semantics above rather than creating a Kakashi-only damage system;
- remove `academy_kakashi_prodigys_read` from the live Kakashi prepared palette;
- update the Kakashi 34500 exact Skill allow-list from the old ID to the new ID;
- add exact 33000 player-facing name/category/summary for the new Skill;
- preserve click-to-act / hover-to-learn behavior;
- preserve native Battle targeting, damage, Stamina, logs, save/load, result return, and Story boundaries;
- add deterministic proof that the guard consumes only on the next qualifying direct damaging packet and cannot fire twice;
- prove once-per-Battle availability survives rerender/save-load without resetting;
- prove a previously committed legacy Analyze Opponent action is not rewritten into defense.

Browser Golden remains Coding-owned and unclaimed until installed-browser validation.

## 9. Supersession

This document supersedes the `Analyze Opponent` prepared-slot portion of:

`Documentation/Combat/SC_Combat_Academy_Kakashi_Player_Facing_Skill_Clarity_2026-09-16.md`

That prior document remains authoritative for Quick Kunai Strike, Clone Feint, Opening Strike, Wire Snare, and the general youth-facing clarity rules.

**Routing:** Combat decision CLOSED -> Coding / Runtime `#188` SEND NOW.
