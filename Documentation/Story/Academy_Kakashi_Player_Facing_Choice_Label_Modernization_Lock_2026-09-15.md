# Academy Kakashi Origin — Player-Facing Choice Label Modernization Lock

**Date:** 2026-09-15  
**Owner:** Stephen / Writing — Konoha  
**Status:** **STEPHEN-DIRECTED PLAYER-FACING EXPRESSION LOCK — SEMANTIC INTENTS UNCHANGED**

## Purpose

Stephen approved the current Observe-choice rewrite and directed the same presentation treatment across Academy Kakashi's Origin.

The problem being corrected is expression, not causality: several existing buttons read like route/debug/database labels (`Fight Assassin`, `Secure Package`, `Pursue Original Target`) rather than Kakashi making a live tactical decision.

This lock modernizes **player-facing choice labels only**.

It does not change:

- semantic choice IDs / intent classes;
- resolver ownership;
- Battle callers or outcomes;
- participant presence or Structured Autonomy;
- package / participant custody;
- Knowledge;
- pursuit gates;
- lethal eligibility;
- Chronicle history;
- Rewards entitlement.

Canonical rule:

> **The button should sound like the action Kakashi is deciding to take, not the name of the branch the engine is about to enter.**

Choice wording remains presentation. Runtime semantic intent remains authority.

---

# 1. Sakura exchange — first decision

| Existing / semantic shorthand | Locked player-facing label |
| --- | --- |
| `OBSERVE` | **WATCH THE EXCHANGE** |
| `GET CLOSER` | **MOVE IN CLOSER** |
| `ATTACK` | **STRIKE BEFORE THE HANDOFF** |
| `ATTEMPT PICKPOCKET` | **SLIP IN FOR THE PACKAGE** |

Notes:

- `STRIKE BEFORE THE HANDOFF` expresses intervention timing without promising Battle victory, custody or injury.
- `SLIP IN FOR THE PACKAGE` expresses stealth intent without claiming the Pickpocket resolver succeeds.

---

# 2. Get Closer — resolver SUCCESS

| Existing / semantic shorthand | Locked player-facing label |
| --- | --- |
| `LET THE HANDOFF HAPPEN` | **LET THEM MAKE THE HANDOFF** |
| `STRIKE BEFORE THE HANDOFF` | **STRIKE BEFORE THE HANDOFF** |
| `ATTEMPT THE PICKPOCKET` | **SLIP IN FOR THE PACKAGE** |

These reuse the same semantic-expression grammar as the first exchange where the underlying intent is the same.

---

# 3. Get Closer — resolver FAILURE

| Existing / semantic shorthand | Locked player-facing label |
| --- | --- |
| `STAY ON THE PACKAGE` | **STAY WITH THE PACKAGE** |
| `STOP PACKAGE SMUGGLER` | **STOP THE MAN WHO SPOTTED YOU** |
| `CUT THEM OFF AT THE SAKURA TREE` | **CUT THEM OFF AT THE SAKURA TREE** |

`Package Smuggler` remains an implementation/Story authority term. Kakashi's button should use what is naturally available in the moment: **the man who spotted you**.

---

# 4. Successful pursuit / Pakkun interception

| Existing / semantic shorthand | Locked player-facing label |
| --- | --- |
| `DEMAND THE PACKAGE` | **TELL HIM TO HAND IT OVER** |
| `TAKE HIM DOWN` | **TAKE HIM DOWN** |
| `ASK WHERE THE PACKAGE WAS GOING` | **ASK WHERE IT WAS GOING** |

`TAKE HIM DOWN` remains unchanged because it already reads like direct tactical intent rather than a system label.

`TELL HIM TO HAND IT OVER` intentionally does not say `MAKE HIM`; voluntary surrender is not guaranteed and current authority leads into refusal / Battle.

---

# 5. Observe — package / Masked Interceptor / first-man priority split

Stephen-approved set, including his exact wording correction:

| Existing / semantic shorthand | Locked player-facing label |
| --- | --- |
| `STOP/FIGHT THE ASSASSIN` | **CUT HER OFF** |
| `SECURE THE PACKAGE` | **GO FOR THE PACKAGE** |
| `SECURE THE PACKAGE BEFORE THE ASSASSIN` | **BEAT HER TO THE PACKAGE** |
| `DEFEAT THE ASSASSIN, THEN SECURE/RECOVER THE PACKAGE` | **DEAL WITH HER FIRST, THEN CHASE THE PACKAGE** |
| `GO AFTER / PURSUE ORIGINAL TARGET` | **STAY ON THE FIRST MAN** |

The current four-button Scene Board surface should therefore read:

1. **CUT HER OFF**
2. **GO FOR THE PACKAGE**
3. **DEAL WITH HER FIRST, THEN CHASE THE PACKAGE**
4. **STAY ON THE FIRST MAN**

Where the distinct `SECURE THE PACKAGE BEFORE THE ASSASSIN` interception route is surfaced, use **BEAT HER TO THE PACKAGE**.

`first man` is preferred over `original target`: Kakashi has watched the package change hands, and the former carrier is naturally the first man in the exchange rather than a database-style `original target` referent.

---

# 6. Post-capture ANBU Marked Target disposition

| Existing / semantic shorthand | Locked player-facing label |
| --- | --- |
| `BRING HIM TO UCHIHA POLICE FORCE` | **TURN HIM OVER TO THE UCHIHA POLICE** |
| `LET HIM GO` | **LET HIM GO** |
| `KILL HIM` | **KILL HIM** |
| `TAKE HIM BACK TO ANBU` | **TAKE HIM BACK TO ANBU** |

The lethal label remains deliberately blunt because this is the already-locked deterministic Kill semantic. Do not euphemize it into `Deal with him`, `Finish this`, or another label that hides the player's lethal choice.

---

# 7. State-derived continuation choices after Battle / resolver returns

Academy Kakashi now contains state-derived post-resolution affordances rather than one fixed screenplay after every Battle. Their presentation must follow the same grammar.

Use these locked expression families when the corresponding semantic intent is legitimately available:

| Semantic intent | Preferred player-facing expression |
| --- | --- |
| continue pursuing the current package holder | **CHASE THE PACKAGE** |
| continue after ANBU Marked Target after package custody has changed | **GO AFTER THE FIRST MAN** |
| leave the pursuit and return with recovered objective | **GET THE PACKAGE BACK TO ANBU** |
| preserve current package/objective rather than pursue | **STAY WITH THE PACKAGE** |
| return a controlled person to ANBU authority | **TAKE HIM BACK TO ANBU** / **TAKE HER BACK TO ANBU** |
| leave a defeated participant and continue the active mission | **LEAVE HIM AND KEEP MOVING** / **LEAVE HER AND KEEP MOVING** |
| deterministic lethal action against a controlled participant | **KILL HIM** / **KILL HER** |
| resolver-determined lethal intent against a non-controlled participant | **GO FOR THE KILL** |

Important semantic guard:

- **KILL HIM/HER** is reserved for a deterministic kill affordance where current state actually permits guaranteed lethal disposition.
- **GO FOR THE KILL** is the preferred wording for resolver-determined lethal intent where death is not guaranteed.

Do not use the same label for both semantic classes.

For multi-participant post-Battle states, generate the label against the actual current participant/objective. Never show actor IDs such as `AMT`, `PS`, `MI`, `original target`, `controlled_defeated`, or resolver terminology to the player.

---

# 8. Player-facing choice grammar for Academy Kakashi

Apply these rules to every Kakashi Origin button, including state-derived buttons Coding generates from the closed decision-continuation matrix:

1. **Action first.** Use a verb phrase Kakashi could plausibly decide in the moment.
2. **Intent, not promised result.** `GO FOR THE PACKAGE`, not `PACKAGE RECOVERED`; `GO FOR THE KILL`, not `KILL HER`, unless death is deterministic.
3. **Observer-safe referents.** Prefer `her`, `him`, `the first man`, `the package`, `the man who spotted you` over internal actor taxonomy where the taxonomy sounds artificial in-scene.
4. **No route/debug language.** Avoid `original target`, `recover package route`, `battle route`, `resolver`, `choice pressure`, or internal state names in buttons.
5. **Kakashi cadence.** Compact, controlled, tactical. Do not turn buttons into quips or mini-dialogue.
6. **Same intent may reuse same wording.** Reuse is preferable to inventing synonyms that imply a semantic difference which does not exist.
7. **Different intent must remain distinguishable.** `GO FOR THE PACKAGE` and `BEAT HER TO THE PACKAGE` are distinct because one commits direct package priority while the other commits a race/interception-before-her intent.

Canonical quality test:

> **If a button sounds like something QA would name a branch, rewrite it until it sounds like something Kakashi is deciding to do.**

---

# 9. Implementation boundary

Coding should change the player-facing label layer while preserving stable semantic intents / IDs wherever possible.

Do not key Story logic off these English strings.

Changing:

`SECURE_PACKAGE` -> display `GO FOR THE PACKAGE`

must not create a new semantic choice or Chronicle history.

This expression lock is intended to be consumed by the active Kakashi implementation without reopening the Writing-closed Origin graph.

---

## Final lock

> **WATCH THE EXCHANGE / MOVE IN CLOSER / STRIKE BEFORE THE HANDOFF / SLIP IN FOR THE PACKAGE** replace system-like first-choice wording.
>
> **CUT HER OFF / GO FOR THE PACKAGE / DEAL WITH HER FIRST, THEN CHASE THE PACKAGE / STAY ON THE FIRST MAN** is Stephen's approved Observe priority set.
>
> **BEAT HER TO THE PACKAGE** is the distinct interception-before-her expression when that route is surfaced.
>
> **Choice labels express Kakashi's intent; resolvers, Battle and Structured Autonomy still determine what actually happens.**
>
> **This is an expression modernization only. Academy Kakashi remains Writing-closed.**