# Shinobi Chronicles — PL Battle Identity + Menma Alpha Overhaul Reconciliation

**Date:** 2026-09-25  
**Owner:** CE / Codex / Coordination  
**Incoming handoff:** #365  
**Status:** **DESIGN CLOSED / ALPHA IMPLEMENTATION RELEASED / MENMA FIRST PROVING GROUND**  
**Beta exclusion:** #366 remains queued and is not Alpha authority.

---

## 1. Product identity lock

The Shinobi Chronicles **PL System is the combat identity of the game**.

Canonical product rule:

> **THE NEW BATTLE SYSTEM IS THE EVOLVED PL BATTLE SYSTEM. IT NEVER REPLACES PL.**

The overhaul exists to make PL Battle more kinetic, tactical, readable and expressive.

It does not replace:

- participant PL;
- Battle PL;
- PL depletion;
- PL withdrawal;
- PL/Registry semantics;
- Skills / Items / Summons resolving into the PL-based Combat model.

Do not introduce HP, generic health bars or a parallel non-PL combat identity as the successor Battle language.

PL/Registry remains the authority for identity / Stats / PL semantics.

Combat consumes those facts at Battle runtime.

---

## 2. Implementation hold supersession

The old general Battle implementation hold was:

> wait for Academy Kakashi Browser Golden.

That condition has now been satisfied.

Academy Kakashi is **ALPHA GOLDEN and FROZEN**.

Stephen has explicitly reprioritised:

1. Obito Origin -> Browser Golden;
2. PL Battle System overhaul.

Therefore:

> **THE OLD KAKASHI-GATED BATTLE IMPLEMENTATION HOLD IS RELEASED.**

The previously locked Battle safeguards remain mandatory.

Release of the implementation lane does not reopen Kakashi.

Kakashi must **not** be the first Battle-overhaul proving ground.

Kakashi receives controlled Battle migration only after the successor PL Battle runtime is proven elsewhere.

---

## 3. First real Alpha proving ground

The first real Origin proving ground is:

> **Academy Menma + Special Jōnin Anko vs Altered Shinobi + Brute + Unstable.**

Consume the existing exact identities and Combat package:

- `academy_menma`;
- `sj_anko`;
- `test_subject_altered_shinobi` — PL11;
- `test_subject_brute` — PL13;
- `test_subject_unstable` — PL12.

Battle config:

`academy_menma_origin_three_test_subjects_with_anko`

Encounter:

`origin_academy_menma_prologue:three_test_subjects`

Objective:

`stop_three_test_subjects`

Environment:

`Scene backdrops/forest_clearing_day.png`

Reward authority remains the already-implemented exact whole-encounter reward:

> **100 Ryō once on valid complete three-subject victory.**

No payout after one hostile.

No payout after two.

No 50 Ryō per hostile.

No generic Character EXP/items are inferred.

---

## 4. Alpha side-action law remains intact

Normal Alpha PvE remains:

~~~text
PLAYER SIDE ACTION OPPORTUNITY
-> authoritative result
-> presentation / settle

ENEMY SIDE ACTION OPPORTUNITY
-> authoritative result
-> presentation / settle

repeat
~~~

Only **one normal action is committed per side action opportunity**.

Team size does not automatically create one ordinary action per deployed participant.

There is no twelve-action 6v6 initiative round.

There is no Beta command batch in Alpha.

---

## 5. Active remains the default action bearer

The **Active** participant remains the formation's default normal action bearer and confrontation anchor.

Benched participants do not automatically receive turns merely because they are deployed.

However, an explicitly authored Combat assist may consume the side's **existing single action opportunity** instead of the Active.

This creates:

- no second action opportunity;
- no extra turn;
- no automatic entitlement for every Benched participant;
- no semantic promotion;
- no formation reorder;
- no second player action dock.

Canonical distinction:

> **ASSIST CONSUMPTION OF THE EXISTING SIDE OPPORTUNITY != AN EXTRA TURN.**

This is an explicit authorised exception to the default Active action-bearer rule.

Generic Benched/Reserve assist mechanics remain closed unless separately authorised.

---

## 6. Menma / Anko exact Alpha allied-side cadence

Menma remains:

- Active;
- sole player-controlled actor;
- tutorial-performance subject.

Anko remains:

- Benched allied participant;
- autonomous NPC;
- targetable where Combat legality permits;
- non-owned;
- not My Clan assignment;
- not acquisition;
- not player-controlled.

This encounter grants Anko one exact authored semantic entitlement:

`menma_origin_anko_autonomous_assist`

### Player-side opportunity sequence

While both Menma and Anko remain active/present:

~~~text
PLAYER OPPORTUNITY 1 -> MENMA
PLAYER OPPORTUNITY 2 -> ANKO AUTONOMOUS ASSIST
PLAYER OPPORTUNITY 3 -> MENMA
PLAYER OPPORTUNITY 4 -> ANKO AUTONOMOUS ASSIST
...repeat
~~~

Therefore:

- Menma always receives the first player-side action opportunity;
- Menma opportunities expose the player action dock;
- Anko opportunities resolve autonomously from her exact Combat package;
- one player-side opportunity produces at most one committed ordinary/assist action;
- an Anko assist opportunity does not also permit a Menma action;
- a Menma opportunity does not also grant a free Anko action.

This is deterministic.

Persist the exact allied-side opportunity index/entitlement so reload cannot change who owns the next player-side opportunity.

### If Anko withdraws

Menma receives every later player-side opportunity.

No empty Anko turn remains.

### If Menma withdraws

The tutorial commits defeat immediately under existing Menma authority.

Anko does not promote to Active and does not continue to manufacture Menma tutorial success.

---

## 7. Anko action semantics remain the existing Combat package

No action values are changed by this CE cadence reconciliation.

Consume the Combat-closed package:

### Hidden Shadow Snake Hands
`sj_anko_hidden_shadow_snake_hands`
- direct Ninjutsu;
- authored Attack PL 20.

### Snake Bind
`sj_anko_snake_bind`
- Ninjutsu control;
- no Attack PL;
- physical restraint;
- not Stun.

### Fire Style: Dragon Flame
`sj_anko_fire_style_dragon_flame`
- direct ranged Ninjutsu;
- authored Attack PL 24.

### Serpent Evasion
`sj_anko_serpent_evasion`
- defensive reposition;
- once per Battle;
- deterministic next qualifying direct-attack avoidance.

### Twin Snakes Mutual Death
`sj_anko_twin_snakes_mutual_death`
- **NOT LEGAL** in this Origin;
- no death/self-consequence authority exists here.

The existing autonomous selection/eligibility rules remain Combat authority.

If no exact Anko action is semantically legal for an Anko assist opportunity:

- do not invent Basic Attack;
- do not substitute a Menma action;
- fail/skip that assist opportunity visibly under Combat evidence;
- continue to the enemy-side opportunity.

---

## 8. Anko target legality

Preserve Combat's authored Anko target priority:

~~~text
1. test_subject_brute
2. test_subject_unstable
3. test_subject_altered_shinobi
~~~

Anko's authored assist actions may legally address her exact eligible target even when that hostile is not the enemy Active.

This is an explicit encounter-authored off-slot target permission.

It does not create generic off-slot targeting for all Skills.

Menma's ordinary current package remains Active-hostile focused unless an exact Menma action separately authorises off-slot targeting.

Formation position does not by itself decide target legality.

Combat does.

---

## 9. Enemy-side Alpha cadence

The old current-runtime participant cadence:

~~~text
Menma -> Altered -> Anko -> Brute -> Unstable
~~~

is **superseded for the new PL Battle overhaul**.

It remains valid historical/current-runtime design genealogy only.

Under the Alpha overhaul:

- the enemy side receives exactly one action opportunity after each player-side opportunity;
- the enemy **Active** spends that opportunity;
- the currently Benched hostiles do not automatically receive separate enemy turns;
- when the enemy Active withdraws, normal withdrawal / relay normalization promotes the next eligible hostile;
- encounter opposition priority is:
  1. Altered Shinobi;
  2. Brute;
  3. Unstable.

Thus the enemy action bearer is:

~~~text
ALTERED while active
-> BRUTE after Altered withdrawal
-> UNSTABLE after Brute withdrawal
~~~

Each promoted enemy consumes its already-closed exact authored action package.

No package numerics are changed.

No pooled enemy PL is created.

Anko's off-slot assist may damage/control Brute or Unstable before their promotion.

If a Benched hostile is already withdrawn before its promotion point, formation normalization skips it and promotes the next surviving eligible hostile.

---

## 10. Existing hostile target law

When Active, preserve the Combat-closed target laws:

### Altered Shinobi
Primary:
`academy_menma`

### Brute
Primary while Anko remains present:
`sj_anko`

Fallback:
`academy_menma`

### Unstable
Primary while Anko remains present:
`sj_anko`

Fallback:
`academy_menma`

These are authored encounter target rules, not a generic threat/aggro system.

---

## 11. Withdrawal and victory

0 Battle PL remains **withdrawal**, not injury/death.

All three exact hostiles must be resolved for victory.

Withdrawing one or two hostiles never ends the encounter.

Menma withdrawal before whole-encounter completion means tutorial defeat.

Anko withdrawal does not itself invalidate later Menma victory.

No death, injury, custody or morality is inferred from Battle PL depletion.

---

## 12. MEN-03 remains Menma-only

Preserve:

`combat_academy_menma_tutorial_performance_resolved`

and:

`academy_menma_tutorial_performance_evidence`

MEN-03 remains strictly attributable to Menma.

Do not count:

- Anko actions;
- Anko assist opportunities;
- Anko damage;
- Anko control;
- Anko defensive actions;
- damage received by Anko;
- enemies withdrawn by Anko.

Preserve the existing Menma-only metrics and Alpha thresholds.

Completed MEN-03 requires:

- the whole three-subject objective completed;
- all three exact hostiles resolved;
- Menma not withdrawn before completion.

The already-implemented 100-Ryō reward is independent of MEN-03 bucket.

---

## 13. Observation / MEN-02

Anko remains a legitimate same-Battle observer while present and not withdrawn.

Exact committed Menma actions may create observer evidence where:

- perceptible;
- not blocked;
- exact action ancestry exists.

MEN-02 remains **Kinjutsu-specific**.

Observed Fūinjutsu is legitimate observed Fūinjutsu evidence.

It does not silently become MEN-02.

No Kinjutsu/Fūinjutsu button is invented merely to satisfy Story wording.

---

## 14. Presentation behaviour

Semantic formation remains:

~~~text
MENMA = Active
ANKO = Benched
~~~

during normal play.

When Anko consumes an authored assist opportunity:

- her Benched portrait may step/slide into temporary confrontation playback focus;
- action resolves;
- target responds;
- result / PL change presents;
- Anko returns to her Benched projection;
- semantic formation is unchanged.

This is **action choreography**, not formation promotion.

Do not visually leave two Active portraits.

Do not rewrite My Clan order.

Do not turn Anko into the player actor.

---

## 15. Save/load and safeguard requirements

The locked catastrophe-containment contract remains mandatory.

At minimum persist:

- Battle ID;
- side action-opportunity ID;
- current side;
- allied entitlement index / Menma-vs-Anko next actor entitlement;
- enemy Active;
- exact participant PL;
- withdrawals;
- Anko one-use state;
- committed target/action/RNG results;
- Battle occurrence receipt;
- MEN-03 ancestry;
- reward receipt.

Reload must never:

- grant a free Menma action;
- duplicate an Anko assist;
- reroll Anko target/action;
- repeat enemy action;
- resurrect a withdrawn participant;
- reactivate the old round-robin cadence;
- duplicate the 100-Ryō reward.

Canonical recovery remains:

> **FALLBACK TO AUTHORITATIVE STATE, NOT TO OLD CODE.**

---

## 16. Beta #366 exclusion

Beta #366 is intentionally separate.

Do **not** implement this for Alpha:

~~~text
select one Skill from every active team member
-> execute the whole player-side batch
-> enemy side batch
~~~

The Alpha Menma proving ground has:

> **ONE ACTION PER SIDE OPPORTUNITY.**

On player-side opportunities, the existing single opportunity belongs either to:

- Menma; or
- the exact authorised Anko autonomous assist.

Never both.

Beta may later supersede this cadence when Beta Battle design is deliberately opened.

---

## 17. Kakashi protection

Academy Kakashi is GOLDEN and frozen.

Do not use Kakashi as the first implementation target.

Do not refactor Kakashi while proving Menma.

After the evolved PL Battle runtime is:

- implemented on Menma;
- source/headless GREEN;
- installed-browser validated;
- regression-stable;

then Kakashi may receive a controlled Battle migration separately.

Golden Kakashi Story/presentation outside the migration seam remains protected.

---

## 18. Implementation order

The released Alpha Battle implementation lane should proceed:

1. preserve PL identity and current PL semantics;
2. establish exactly-once alternating side action opportunities;
3. prove one-action-per-side loop and save/load phase;
4. establish Active / Benched / Reserve semantic formation;
5. implement explicit authored assist consumption of the existing side opportunity;
6. implement Menma/Anko exact entitlement pattern;
7. consume existing Anko package and off-slot target permission;
8. consume enemy Active relay Altered -> Brute -> Unstable;
9. preserve MEN-03 exact attribution;
10. emit the exact whole-encounter receipt required by the already-live 100-Ryō reward adapter;
11. prove installed-browser Menma Story -> Battle -> Story;
12. only then consider later Origin/Kakashi migration.

Do not start with animation.

Semantic loop and containment must be GREEN before choreography polish.

---

## 19. Final lock

> **Shinobi Chronicles' successor Battle runtime is an evolution of the PL Battle System, never a replacement for PL. Alpha PvE keeps exactly one action per alternating side action opportunity. The Active remains the default action bearer, but an explicitly authorised assist may consume that same single side opportunity without creating an extra turn or changing formation. Academy Menma Scene 7 is the first real proving ground: Menma remains Active and player-controlled; Anko remains Benched and autonomous. Player-side opportunities deterministically alternate Menma, Anko assist, Menma, Anko assist while Anko remains present; if Anko withdraws, Menma receives all later player-side opportunities; if Menma withdraws, the tutorial ends in defeat. Anko's assist uses her already-closed Combat action package and may target her authorised off-slot opposition priority without becoming Active. Enemy-side opportunities belong only to the enemy Active; Altered, then Brute, then Unstable relay through Active as prior Active opponents withdraw. The old five-participant round-robin cadence is not carried into the overhaul. MEN-03 stays strictly Menma-attributable, the exact 100-Ryō whole-encounter reward remains unchanged, Beta #366 is excluded from Alpha, and Kakashi remains GOLDEN/frozen until Menma proves the evolved PL Battle runtime.**

**DESIGN CLOSED != IMPLEMENTED != RUNTIME VALIDATED != BROWSER GOLDEN.**
