# Academy Kakashi Origin — Post-Restraint Collection and Multi-Captive Transfer — Verbatim Lock

**Date:** 2026-09-19  
**Owner:** Stephen / Writing / Story — Konoha  
**Status:** **STEPHEN-APPROVED / LOCKED VERBATIM — IMPLEMENTATION READY**  
**Source handoff:** GitHub #281  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## Consumed authority

This package consumes:

- `Documentation/Coordination/Field_Secured_Participant_Persistence_Collection_and_Group_Transfer_Contract_2026-09-19.md`
- global post-Battle disposition simplification;
- restraint-method projection clarification;
- current Kakashi STOP THE ASSASSIN timing;
- current character personality / voice registry;
- exact Kakashi Origin backdrop inventory.

Current restraint method for Academy Kakashi:

- internal Skill: `academy_kakashi_wire_snare`
- player-facing Skill: **Wire Snare**
- physical method: ninja wire.

Canonical rule:

> **The player chooses RESTRAIN after Battle victory. Kakashi then uses Wire Snare / ninja wire to secure the defeated target. Wire Snare does not need to have been used during the Battle or remain active when Battle ends.**

---

# 1. MI — RESTRAIN HER AND CONTINUE

**Backdrop:** `Kakashi Origin Backdrop/fight_at_sakura_tree.png`

## Narration

Kakashi looks toward the route the package took.

Then back to Masked Interceptor.

Going after it means leaving her here.

Leaving her free is not an option.

He reaches for the ninja wire at his side.

Masked Interceptor notices immediately.

## Dialogue

**MASKED INTERCEPTOR:**  
“So you're still going after them.”

**KAKASHI:**  
“Yes.”

## Narration

He moves before she can reposition.

The wire passes around her wrists, tightens, and folds her arms into a secure bind.

A second length fixes the restraint against the Sakura tree.

Kakashi checks the tension.

Then checks it again.

Masked Interceptor looks at the wire.

Then at him.

## Dialogue

**MASKED INTERCEPTOR:**  
“You're leaving me tied to a tree.”

**KAKASHI:**  
“I'm leaving you here while I finish what I started.”

## Narration

There is the smallest shift behind her mask.

Not amusement exactly.

Close.

## Dialogue

**MASKED INTERCEPTOR:**  
“That's a very confident use of the word finish.”

## Narration

Kakashi rises.

His eye moves toward the rooftops.

## Dialogue

**KAKASHI:**  
“I'll let you know.”

## Narration

He leaves her beneath the Sakura tree.

## System / Resolver

Commit Masked Interceptor as:

`FIELD_SECURED_PENDING_COLLECTION`

with:

- restraint method/source: **Wire Snare / ninja wire**;
- exact secured location: Sakura-tree fight location;
- alive;
- not travelling with Kakashi;
- not ANBU custody;
- not Uchiha Police custody;
- no passive escape timer;
- no hidden restraint reroll.

Then re-evaluate the existing pursuit window.

If both are still legal, expose:

- **GO AFTER PACKAGE SMUGGLER**
- **GO AFTER ANBU MARKED TARGET**

No restraint timing penalty is added.

---

# 2. PS — RESTRAIN HIM AND CONTINUE

This is available after Kakashi defeats Package Smuggler and the existing PS <=3 timing still leaves ANBU Marked Target reachable.

**Backdrop:** `Kakashi Origin Backdrop/konoha_alleyway_alt_night.png`

## Narration

The package is secure against Kakashi.

Package Smuggler is not going anywhere quickly.

But ANBU Marked Target still might.

Kakashi pulls another length of ninja wire free.

Package Smuggler watches him.

## Dialogue

**PACKAGE SMUGGLER:**  
“First you take the package.”

## Narration

Kakashi brings his arms behind him.

## Dialogue

**PACKAGE SMUGGLER:**  
“Now you're tying me up.”

## Narration

The wire tightens around his wrists.

Kakashi runs the remaining length through a fixed street post and locks it down.

## Dialogue

**PACKAGE SMUGGLER:**  
“You have a very unfriendly definition of success.”

**KAKASHI:**  
“You're still alive.”

## Narration

Package Smuggler considers that.

## Dialogue

**PACKAGE SMUGGLER:**  
“Annoyingly difficult to argue with.”

## Narration

Kakashi checks the restraint once.

His attention is already shifting toward the route ahead.

Package Smuggler notices.

## Dialogue

**PACKAGE SMUGGLER:**  
“You're going after him too?”

**KAKASHI:**  
“If he's still there.”

**PACKAGE SMUGGLER:**  
“And if he isn't?”

## Narration

Kakashi looks down the street.

## Dialogue

**KAKASHI:**  
“Then I come back sooner.”

## Narration

Package Smuggler exhales through his nose.

## Dialogue

**PACKAGE SMUGGLER:**  
“I was afraid you'd say that.”

## Narration

Kakashi leaves.

## System / Resolver

Commit Package Smuggler as:

`FIELD_SECURED_PENDING_COLLECTION`

with:

- restraint source: Kakashi **Wire Snare / ninja wire**;
- exact PS street location;
- package custody remains whatever the separately committed package occurrence says — normally Kakashi at this point;
- no institutional custody;
- no hidden escape roll;
- no hidden time penalty.

Then consume the existing PS <=3 pursuit result.

If AMT remains reachable:

-> AMT pursuit  
-> Pakkun appears on legitimate AMT reach.

---

# 3. Final AMT live-capture boundary

Where one or more earlier captives remain `FIELD_SECURED_PENDING_COLLECTION` and Kakashi/Pakkun defeat ANBU Marked Target, expose:

**RESTRAIN HIM AND COLLECT THE OTHERS**

If selected:

**Backdrop:** `Kakashi Origin Backdrop/alleyway_konoha_night.png`

## Narration

ANBU Marked Target remains on the ground.

Kakashi looks back the way they came.

There are still people waiting behind him.

Pakkun follows his eye.

## Dialogue

**PAKKUN:**  
“We're going back.”

**KAKASHI:**  
“I left prisoners behind.”

**PAKKUN:**  
“I noticed.”

## Narration

Kakashi draws out the ninja wire.

ANBU Marked Target sees it.

## Dialogue

**ANBU MARKED TARGET:**  
“You've been doing this all night?”

## Narration

Kakashi secures his wrists.

## Dialogue

**KAKASHI:**  
“More than I expected.”

## Narration

Pakkun gives the wire a look.

## Dialogue

**PAKKUN:**  
“You're going to need more of that.”

## Narration

Kakashi checks what remains.

## Dialogue

**KAKASHI:**  
“I know.”

## Narration

Pakkun starts down the street.

## Dialogue

**PAKKUN:**  
“Good. I wasn't offering mine.”

## Narration

Kakashi looks at him.

Pakkun keeps walking.

## System / Resolver

ANBU Marked Target enters `COLLECTED_ACTIVE_ESCORT` with Kakashi.

He is not left field-secured because Kakashi is taking him with him while collecting earlier captives.

Pakkun remains present and autonomous.

---

# 4. Collection sequence

This sequence is state-driven.

Derive which earlier participants remain:

`FIELD_SECURED_PENDING_COLLECTION`

and visit only their exact recorded locations.

Normal all-live reverse route:

`AMT alley -> Package Smuggler street -> Sakura tree`

because this retraces Kakashi's pursuit.

---

## 4A. Collect Package Smuggler

**Backdrop:** `Kakashi Origin Backdrop/konoha_alleyway_alt_night.png`

## Narration

Package Smuggler is exactly where Kakashi left him.

His eyes move first to Kakashi.

Then to ANBU Marked Target under restraint.

Then to Pakkun.

## Dialogue

**PACKAGE SMUGGLER:**  
“You actually came back.”

**KAKASHI:**  
“I said I would.”

## Narration

Package Smuggler looks at ANBU Marked Target.

## Dialogue

**PACKAGE SMUGGLER:**  
“And you brought company.”

**ANBU MARKED TARGET:**  
“Don't.”

**PACKAGE SMUGGLER:**  
“I haven't said anything yet.”

**ANBU MARKED TARGET:**  
“That was the warning.”

## Narration

Pakkun looks between them.

## Dialogue

**PAKKUN:**  
“This is going well.”

## Narration

Kakashi releases Package Smuggler from the fixed anchor without removing his restraints.

He brings him into the escort.

## Dialogue

**PACKAGE SMUGGLER:**  
“I'm starting to miss the tree.”

**KAKASHI:**  
“You weren't at the tree.”

## Narration

Package Smuggler looks at him.

## Dialogue

**PACKAGE SMUGGLER:**  
“You know what I mean.”

## System / Resolver

Package Smuggler becomes:

`COLLECTED_ACTIVE_ESCORT`

If PS is dead, escaped, released, already transferred, or otherwise unavailable, this entire collection component is skipped.

---

## 4B. Collect Masked Interceptor

**Backdrop:** `Kakashi Origin Backdrop/fight_at_sakura_tree.png`

## Narration

Masked Interceptor is still beneath the Sakura tree.

Her attention settles on Kakashi first.

Then the restrained people with him.

Package Smuggler, if present, notices the look.

## Dialogue

**PACKAGE SMUGGLER:**  
“Don't.”

## Narration

Masked Interceptor says nothing.

## Dialogue

**PACKAGE SMUGGLER:**  
“You were going to say something.”

**MASKED INTERCEPTOR:**  
“I didn't need to.”

## Narration

Pakkun gives Package Smuggler a brief look.

## Dialogue

**PAKKUN:**  
“She really didn't.”

## Narration

Kakashi removes the line fixing Masked Interceptor to the tree.

The restraint around her remains.

She joins the escort.

Her eyes move to Kakashi.

## Dialogue

**MASKED INTERCEPTOR:**  
“You got all the way back.”

**KAKASHI:**  
“I said I would.”

**MASKED INTERCEPTOR:**  
“No.”

## Narration

She looks over the group.

## Dialogue

**MASKED INTERCEPTOR:**  
“You said you'd finish what you started.”

## Narration

A moment.

## Dialogue

**MASKED INTERCEPTOR:**  
“This is certainly one interpretation.”

## Narration

Kakashi starts walking.

## Dialogue

**KAKASHI:**  
“Keep moving.”

## Narration

This time the faint amusement behind her mask is obvious.

## System / Resolver

Masked Interceptor becomes:

`COLLECTED_ACTIVE_ESCORT`

If MI is dead, escaped, released, already transferred, or otherwise unavailable, this entire collection component is skipped.

---

# 5. Final disposition surface

Once every still-legitimate field-secured captive has been collected, derive the actual escort set.

If two or more captives are present, expose:

- **TAKE THEM ALL BACK TO ANBU**
- **TAKE THEM ALL TO THE UCHIHA POLICE FORCE**

If only one remains, project the appropriate singular disposition instead.

No dead, escaped, released, or uncollected participant is silently included in “THEM”.

---

# 6. Group handoff — ANBU

**Backdrop:** `Kakashi Origin Backdrop/rooftop_night.png`

## Narration

Kakashi reaches the rooftop with the prisoners behind him.

Pakkun comes up beside the group.

The ANBU operative waiting there looks at Kakashi.

Then at the restrained shinobi.

Then back at Kakashi.

For the first time tonight, the pause lasts.

## Dialogue

**ANBU OPERATIVE:**  
“You were expected to report.”

## Narration

His eyes move across the prisoners again.

## Dialogue

**ANBU OPERATIVE:**  
“Not arrive with a procession.”

## Narration

Package Smuggler shifts.

## Dialogue

**PACKAGE SMUGGLER:**  
“In my defence—”

**MASKED INTERCEPTOR:**  
“Don't.”

## Narration

He looks at her.

## Dialogue

**PACKAGE SMUGGLER:**  
“I've been hearing that a lot.”

## Narration

The ANBU operative ignores them.

His attention returns to Kakashi.

## Dialogue

**ANBU OPERATIVE:**  
“Start from the exchange.”

## Narration

Kakashi does.

Not as a checklist.

He gives him the sequence.

The original target.

The handoff.

The intervention.

The pursuit.

The fights.

Who he restrained.

Who he could still reach.

And who is standing on the rooftop now.

The operative listens without interrupting.

When Kakashi finishes, his attention moves to the package state.

### If Kakashi recovered the package

Kakashi takes it out.

**KAKASHI:**  
“I recovered this from the receiver.”

The operative accepts it.

### If the package is still missing

**KAKASHI:**  
“The package is still missing.”

The operative absorbs that without allowing the prisoners to read anything from him.

Then he looks over the group again.

## Dialogue

**ANBU OPERATIVE:**  
“You restrained all of them yourself?”

## Narration

Pakkun's ears lift.

## Dialogue

**PAKKUN:**  
“Careful.”

## Narration

The operative looks at him.

## Dialogue

**PAKKUN:**  
“I was there for the last one.”

## Narration

A short pause.

## Dialogue

**ANBU OPERATIVE:**  
“Noted.”

## Narration

Kakashi almost looks at Pakkun.

Almost.

The operative steps forward.

## Dialogue

**ANBU OPERATIVE:**  
“We'll take custody from here.”

## Narration

Kakashi transfers each restrained participant separately.

One restraint line.

Then the next.

Then the next, if present.

No one becomes “the prisoner group” as a factual shortcut.

Each person enters ANBU custody separately.

When the final transfer is complete, Pakkun looks toward Kakashi.

## Dialogue

**PAKKUN:**  
“That's your collection finished.”

**KAKASHI:**  
“It wasn't a collection.”

## Narration

Pakkun starts away.

## Dialogue

**PAKKUN:**  
“Whatever helps.”

## System / Resolver

Each exact eligible captive commits **ANBU institutional custody** separately under the group-transfer parent occurrence.

Pakkun's departure commits explicitly after the handoff.

---

# 7. Group handoff — Uchiha Police Force

**Backdrop:** `Kakashi Origin Backdrop/uchiha_police_exterior_night.png`

## Narration

The Police entrance is still lit.

Two officers step forward.

Then stop.

There is considerably more to look at than they expected.

One officer raises a hand.

## Dialogue

**UCHIHA POLICE OFFICER:**  
“Everyone stays exactly where they are.”

## Narration

Package Smuggler looks down at his restraints.

## Dialogue

**PACKAGE SMUGGLER:**  
“I wasn't planning a sprint.”

## Narration

The second officer gives him a flat look.

## Dialogue

**UCHIHA POLICE OFFICER:**  
“Good.”

## Narration

Package Smuggler decides not to continue.

The first officer turns to Kakashi.

## Dialogue

**UCHIHA POLICE OFFICER:**  
“Tell me why you're bringing several restrained shinobi to our door in the middle of the night.”

## Narration

Kakashi looks at the prisoners.

Then back to the officer.

## Dialogue

**KAKASHI:**  
“They were involved in the same exchange.”

## Narration

He gives the officer what he actually knows.

A man he was following.

A package changing hands.

A masked shinobi attacking the receiver.

The pursuits that followed.

The separate fights.

The people he restrained.

He does not invent identities he never learned.

He does not disclose hidden-operation truth he does not possess.

The officer listens.

His expression becomes more serious as the account develops.

When Kakashi finishes, he looks across the prisoners.

## Dialogue

**UCHIHA POLICE OFFICER:**  
“You know who they are?”

**KAKASHI:**  
“No.”

## Narration

Then, after a moment:

## Dialogue

**KAKASHI:**  
“I know what I saw them do.”

## Narration

The officer nods once.

That answer is enough for the question he actually asked.

His partner moves toward the first prisoner.

Package Smuggler watches him approach.

## Dialogue

**PACKAGE SMUGGLER:**  
“I assume there's paperwork.”

**UCHIHA POLICE OFFICER:**  
“A great deal.”

**PACKAGE SMUGGLER:**  
“Cruel.”

**MASKED INTERCEPTOR:**  
“You'll survive.”

## Narration

Package Smuggler glances at her restraints.

## Dialogue

**PACKAGE SMUGGLER:**  
“Apparently that's the plan.”

## Narration

Pakkun sits beside Kakashi.

The second officer finally notices him properly.

## Dialogue

**UCHIHA POLICE OFFICER:**  
“And the ninken?”

**PAKKUN:**  
“Not a prisoner.”

## Narration

The officer looks at Pakkun.

## Dialogue

**UCHIHA POLICE OFFICER:**  
“I gathered that.”

**PAKKUN:**  
“Good start.”

## Narration

Kakashi transfers each captive separately.

The officers secure one.

Then the next.

Then the next, if present.

Only when every legitimate escort member has been individually accepted does the first officer turn back to Kakashi.

## Dialogue

**UCHIHA POLICE OFFICER:**  
“We have them.”

## Narration

He glances toward the entrance.

## Dialogue

**UCHIHA POLICE OFFICER:**  
“You should report the rest to whoever sent you.”

**KAKASHI:**  
“I will.”

## Narration

Pakkun gets to his feet.

## Dialogue

**PAKKUN:**  
“That's my cue.”

## Narration

Kakashi looks down at him.

## Dialogue

**KAKASHI:**  
“You had a cue?”

## Narration

Pakkun starts away.

## Dialogue

**PAKKUN:**  
“I do now.”

## System / Resolver

Each exact eligible captive commits **Uchiha Police institutional custody** separately under the group-transfer parent occurrence.

Pakkun's departure commits explicitly after the handoff.

---

# Final lock

> **Kakashi uses Wire Snare / ninja wire as his physical post-Battle restraint method.**
>
> **Restraint is selected after Battle victory; it is not a Battle-finisher requirement.**
>
> **Field-secured participants persist at their exact locations until collected or changed by another exact factual occurrence.**
>
> **Collection is participant-by-participant.**
>
> **Group transfer is one player intent but exact institutional custody commits separately for every eligible captive.**
>
> **Pakkun remains autonomous and departs only through an explicit authored occurrence.**
