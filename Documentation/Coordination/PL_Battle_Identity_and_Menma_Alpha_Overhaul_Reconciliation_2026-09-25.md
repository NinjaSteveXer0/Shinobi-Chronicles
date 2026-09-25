# Shinobi Chronicles — PL Battle Identity + Menma Alpha Overhaul Reconciliation

**Date:** 2026-09-25  
**Corrected:** 2026-09-26  
**Owner:** CE / Codex / Coordination  
**Incoming handoffs:** #365, #377  
**Status:** **DESIGN CLOSED / ALPHA IMPLEMENTATION RELEASED / MENMA FIRST PROVING GROUND**  
**Successor note (2026-09-26):** Academy Menma Scene 7 is now governed by `Documentation/Coordination/Academy_Menma_Half_Scripted_Three_Subject_Battle_Successor_2026-09-26.md`. The generic Active-relay law in this document remains valid globally, but the Scene 7 ordinary-relay-only application is superseded by the scoped half-scripted Anko → Anko → Menma phase structure.

---

## 1. Product identity lock

The Shinobi Chronicles **PL System is the combat identity of the game**.

> **THE NEW BATTLE SYSTEM IS THE EVOLVED PL BATTLE SYSTEM. IT NEVER REPLACES PL.**

The overhaul improves formation, tactics, readability, choreography and Battle expression while preserving participant PL / Battle PL as the authoritative combat language.

Do not substitute HP, generic health bars or a parallel health identity.

---

## 2. First Alpha proving ground

Academy Menma Scene 7 remains:

> **Academy Menma + Special Jōnin Anko vs Altered Shinobi + Brute + Unstable.**

Exact identities:

Player side:
1. `academy_menma`
2. `sj_anko`

Enemy side:
1. `test_subject_altered_shinobi` — PL11
2. `test_subject_brute` — PL13
3. `test_subject_unstable` — PL12

Battle config:

`academy_menma_origin_three_test_subjects_with_anko`

Encounter:

`origin_academy_menma_prologue:three_test_subjects`

Objective:

`stop_three_test_subjects`

Environment:

`Scene backdrops/forest_clearing_day.png`

---

## 3. Canonical Alpha turn law

Normal Alpha PvE uses alternating **side action opportunities**.

Player side starts first.

~~~text
PLAYER ACTIVE acts
-> result / settle

ENEMY ACTIVE acts
-> result / settle

PLAYER ACTIVE acts
-> result / settle

ENEMY ACTIVE acts
-> ...
~~~

Only the current **Active** participant spends that side's normal action opportunity.

Benched and Reserve participants do **not** receive ordinary turns merely because they are present.

Team size does not create one action per participant.

There is no Beta #366 team-command batch in Alpha.

---

## 4. Menma Origin opening cadence

Initial formation:

~~~text
PLAYER
Active  = Menma
Benched = Anko

ENEMY
Active  = Altered Shinobi
Benched = Brute
Benched = Unstable
~~~

Therefore the opening cadence is exactly:

~~~text
Menma
-> Altered Shinobi
-> Menma
-> Altered Shinobi
-> Menma
-> Altered Shinobi
...
~~~

until one current Active reaches 0 Battle PL and withdraws.

There is **no alternating Menma -> Anko -> Menma -> Anko allied entitlement**.

There is **no autonomous Anko assist turn while Menma remains Active**.

The earlier CE exception `menma_origin_anko_autonomous_assist` is superseded and must not survive in the evolved Alpha Battle runtime.

---

## 5. Withdrawal and relay — canonical rule

0 Battle PL means **withdrawal**, not injury or death.

When an Active withdraws:

1. the committed action/result remains authoritative;
2. the outgoing Active clears the center;
3. the next eligible Benched participant promotes into Active;
4. an available Reserve may refill the Benched line where applicable;
5. formation settles;
6. the ordinary alternating side sequence continues.

Promotion does **not** create or erase an action opportunity.

The next side to act is determined by ordinary side alternation from the **last committed action**, not by who just promoted.

Canonical rule:

> **RELAY CHANGES WHO REPRESENTS THE SIDE. IT DOES NOT RESET THE TURN ORDER.**

---

## 6. Exact Menma-withdrawal example

If Altered Shinobi lands the hit that reduces Menma to 0 Battle PL:

~~~text
Menma withdraws
-> Menma clears the Active position
-> Anko promotes from Benched to Active
-> formation settles
-> PLAYER side is next because ENEMY just acted
-> Anko acts
-> Altered Shinobi acts
-> Anko acts
-> Altered Shinobi acts
...
~~~

Menma's withdrawal does **not** end the Battle while Anko remains eligible.

Anko is no longer Benched after this relay. She is the new semantic Active.

Her normal Battle action package is then available because she is Active.

---

## 7. Exact enemy-withdrawal example

If Menma lands the hit that reduces Altered Shinobi to 0 Battle PL:

~~~text
Altered Shinobi withdraws
-> Altered clears the enemy Active position
-> Brute promotes from Benched to Active
-> formation settles
-> ENEMY side is next because PLAYER just acted
-> Brute acts
-> Menma acts
-> Brute acts
-> Menma acts
...
~~~

When Brute later withdraws, Unstable promotes by the same rule.

If a future relay candidate has already been legitimately withdrawn by an authorised off-slot mechanic, normalization skips that participant and promotes the next eligible survivor.

---

## 8. Side exhaustion / Battle completion

A side loses the Battle when it has **no eligible surviving participant left to relay into Active**.

For the Menma Origin allied side:

- Menma withdrawal alone != defeat;
- Anko may promote and continue;
- defeat occurs when the allied side is exhausted.

For the enemy side:

- Altered withdrawal alone != victory;
- Brute promotes if eligible;
- then Unstable promotes if eligible;
- victory requires all three exact hostiles to be resolved/withdrawn.

No pooled PL exists.

Each participant retains an independent Battle PL ledger.

---

## 9. Anko semantics

Before Menma withdraws:

- Anko is Benched;
- she does not take normal turns;
- she does not receive a special autonomous assist entitlement;
- she does not step into confrontation focus merely to act;
- she remains a visible part of the formation.

After Menma withdraws:

- Anko promotes to Active;
- she becomes the allied side's normal action bearer;
- she acts under her existing Combat-authored Anko package;
- she remains autonomous NPC-controlled for this Origin unless separate authority says otherwise;
- promotion does not grant ownership / My Clan acquisition.

Registry identity != ownership != My Clan assignment != temporary Story Battle participation.

---

## 10. Menma control / Anko control

Menma is player-controlled while Menma is Active.

Anko is an autonomous allied NPC participant.

When Anko promotes after Menma withdrawal, the Battle continues using autonomous Anko actions rather than converting Anko into a newly owned/player-controlled Character.

No second player action dock is created.

This is a Story Battle NPC-control rule, not a generic statement that every promoted ally is always AI-controlled.

---

## 11. Enemy targeting

Preserve current authored hostile target law only while legally meaningful.

Altered Shinobi begins against Menma.

After Menma withdraws and Anko becomes Active, Altered's normal legal target becomes the surviving allied Active unless an exact action authorises otherwise.

Brute and Unstable likewise act against the current legal allied Battle target under their authored action legality once promoted.

Do not retain stale target locks to a withdrawn participant.

No hidden threat/aggro system is invented.

---

## 12. Menma performance / MEN-03

MEN-03 remains strictly **Menma-attributable**.

Count only Menma's own:

- action opportunities;
- resolved actions;
- PL damage received;
- pressure ratio;
- critical exposure;
- exact supporting evidence.

Do not count Anko's later actions/damage/control as Menma performance.

Menma withdrawal does **not** erase Menma's performance evidence.

If the allied side later completes the whole encounter, MEN-03 may resolve from Menma's own contribution.

A Menma withdrawal is critical exposure for the Menma performance read and therefore naturally satisfies the existing **low**-bucket condition under the current threshold contract.

This preserves the three performance reactions without pretending Menma personally completed every hostile.

MEN-03 remains distinct from the whole-side Battle result.

---

## 13. Whole-encounter victory / reward collision

The current World reward amount remains:

> **100 Ryō once for the complete three-subject encounter victory.**

However, the current implemented reward guard also requires `menmaWithdrawn = false`.

That guard was inherited from the now-superseded assumption that Menma withdrawal immediately ended the tutorial Battle.

Under the corrected relay law, a valid whole-encounter victory may occur after:

~~~text
Menma withdraws
-> Anko promotes
-> Anko finishes the remaining opposition
-> enemy side exhausted
-> Battle victory
~~~

Therefore the **reward amount/source remain closed**, but the `Menma must not have withdrawn` trigger condition is now a confirmed downstream World/Coding collision and must be reconciled before Battle Golden.

CE does not silently rewrite World-owned reward authority in this document.

---

## 14. Save/load

Persistence must preserve:

- Battle/session ID;
- current side;
- current Active per side;
- Benched/Reserve survivors;
- participant PL;
- withdrawals;
- exact next side action opportunity;
- committed action/RNG results;
- formation relay state.

Reload must not:

- restore Menma after withdrawal;
- give Anko a pre-withdrawal assist turn;
- reset side alternation after relay;
- repeat the action that caused withdrawal;
- skip the newly promoted Active's rightful next side opportunity;
- resurrect a withdrawn hostile;
- duplicate reward/history.

---

## 15. Presentation law

The semantic relay and presentation relay are separate.

If Menma withdraws:

~~~text
Combat commits Menma withdrawal
-> presentation shows Menma exit
-> only then Anko slides/scales from Benched into Active
-> formation settles
-> next side opportunity is shown
~~~

If Altered withdraws:

~~~text
Combat commits Altered withdrawal
-> presentation shows Altered exit
-> only then Brute slides/scales into enemy Active
-> formation settles
-> next side opportunity is shown
~~~

Canonical visual rule remains:

> **OUTGOING ACTIVE EXITS FIRST. PROMOTION STARTS SECOND.**

No dual-Active overlap.

Animation never decides semantic truth.

---

## 16. Superseded authority

The following Menma-specific statements introduced by the earlier CE reconciliation are now explicitly **SUPERSEDED**:

- `menma_origin_anko_autonomous_assist`;
- player-side Menma / Anko / Menma / Anko entitlement alternation;
- Anko receiving normal side opportunities while Menma remains Active;
- Anko off-slot attack cadence as a built-in Origin entitlement;
- Menma withdrawal = immediate tutorial defeat;
- Anko never promoting to Active;
- Battle ending before Anko can continue.

The general six-shinobi Active/Benched/Reserve relay architecture was not wrong and is not reopened.

---

## 17. Beta exclusion

Beta #366 remains queued.

Do not import:

~~~text
choose one Skill from each active member
-> execute team batch
~~~

Alpha remains:

> **ONE ACTIVE ACTION PER SIDE OPPORTUNITY.**

---

## 18. Kakashi protection

Academy Kakashi remains GOLDEN / frozen.

Menma remains the evolved PL Battle proving ground.

Do not use this correction to reopen Kakashi.

---

## 19. Final lock

> **Academy Menma Scene 7 follows the ordinary evolved PL Battle relay law. Menma begins as allied Active and Altered Shinobi begins as enemy Active. They alternate normal actions — Menma, Altered, Menma, Altered — until one Active reaches 0 Battle PL and withdraws. If Altered knocks Menma out, Menma exits, Anko promotes from Benched into the allied Active slot, and because the enemy side just acted the next action belongs to the player side represented by Anko; Battle continues Anko, Altered, Anko, Altered until another withdrawal. If Menma knocks Altered out, Altered exits, Brute promotes into enemy Active, and because the player side just acted Brute acts next; Brute and later Unstable relay by the same rule. Benched participants do not receive normal turns before promotion. Menma withdrawal alone is not Battle defeat while Anko remains. Relay changes the side's Active participant; it never resets side alternation. The earlier Menma/Anko autonomous-assist cadence is superseded.**

**DESIGN CLOSED != IMPLEMENTED != RUNTIME VALIDATED != BATTLE GOLDEN.**
