# Shinobi Chronicles — Battle Reward Full Disclosure and Causal Attribution Rule

**Date:** 2026-09-19  
**Owner:** World / Missions / Events / Rewards  
**Status:** **BINDING GLOBAL BATTLE-REWARD PRESENTATION / EXPLANATION RULE**

## Purpose

Stephen has locked a global player-facing rule for Battle rewards:

> **When a Character wins a Battle, Shinobi Chronicles must show or be able to tell the player exactly what that Character received from that Battle and why each earned development/stat-related reward was earned.**

A Battle result must not hide meaningful earned rewards behind a generic total, a vague "development" label, a later debrief, or unexplained hidden EXP.

This rule is about **disclosure and causal attribution**. It does not change Battle resolution, reward values, development formulas, loot law, Story consequences, custody, package state, or other owning-system semantics.

## 1. Required Battle Victory disclosure

For the winning Character, the Battle result / Chronicle result must disclose every Battle-derived reward category that actually applies:

- **Money / currency**
  - exact Ryō amount earned from this Battle;
  - whether it is immediate, claimable, already claimed, or separately deferred.
- **Items / equipment / material grants**
  - exact item/equipment identity;
  - exact quantity;
  - whether it is an entitlement, an already-committed Inventory grant, or a later separate reward.
- **Technical-discipline development**
  - exact discipline;
  - exact EXP earned in this Battle;
  - exact causal action evidence that produced it.
- **Stamina development**
  - exact EXP earned;
  - exact qualifying mitigation event(s) that produced it.
- **Other persistent development / hidden development**
  - exact development family / path / proficiency / evidence source where one exists;
  - amount or significance if that owning system uses a numeric/significance value;
  - the exact player action/result that produced it.
- **Generic Character EXP**
  - exact amount if the Battle genuinely awards it;
  - otherwise explicitly none / zero where the surface presents that category.
- **Battle-specific unlocks / entitlements / reward receipts**
  - any immediate unlock, entitlement, source receipt or other persistent Battle reward that materially changes the Character/player state.
- **Deferred rewards**
  - clearly separate rewards earned/evaluated later from rewards earned by this Battle now.
  - A deferred Story/Origin/mission reward must never be presented as though it were the Battle's current reward.

Do not manufacture a category merely to fill the screen. Zero/none may be shown where useful for clarity, but a nonexistent reward must not be invented.

## 2. Causal attribution is mandatory for development

If Battle development increases because of what the Character did, the player-facing result or an immediately available details surface must answer:

**"What did I do to earn this?"**

At minimum, each development award must trace to authoritative Battle evidence.

Examples:

- **Bukijutsu +2 EXP**
  - reason: an exact Bukijutsu-tagged action was effectively executed.
- **Bukijutsu +1 EXP**
  - reason: an exact legitimate Bukijutsu execution was materially attempted but did not produce an effective result.
- **Stamina +1 EXP**
  - reason: the Character's legitimate Effective Stamina actually mitigated a positive hostile damage packet at the Stamina stage.

Where multiple actions contribute to one displayed total, the result/details surface must preserve enough causal information to explain the total rather than merely state it.

Preferred player-facing detail shape:

`BUKIJUTSU +6 EXP`  
`Earned from:`
- `Kunai Quickdraw — effective execution +2`
- `[exact second action] — effective execution +2`
- `[exact third action] — effective execution +2`

Or the exact factual combination that actually occurred.

Do not infer the reason from:
- opponent identity;
- Battle victory;
- Story branch label;
- animation;
- finishing blow;
- weapon appearance;
- route name.

The reason must come from committed action/result evidence.

## 3. Current action-derived discipline law preserved

Current Progression authority remains unchanged:

### Technical disciplines

For authorised action-derived technical-discipline development:

- legitimate material failed execution / attempt = **+1 EXP**;
- effective execution = **+2 EXP**;
- explicitly authored exceptional execution = **+3 EXP** where separately authorised;
- the values are mutually exclusive for one action/tag;
- current cap = **6 EXP per technical discipline per causal Battle**.

Applicable technical disciplines remain:

- Ninjutsu;
- Taijutsu;
- Genjutsu;
- Bukijutsu;
- Fūinjutsu;
- Kinjutsu.

### Stamina

Stamina is not granted merely because the Character was attacked or won.

Current rule:

- **+1 Stamina EXP** when legitimate Effective Stamina actually mitigates a positive hostile packet at the Stamina stage;
- current cap = **2 Stamina EXP per causal Battle**.

The result must tell the player that the Stamina development came from mitigation, not from victory.

## 4. Fixed Battle reward != action-derived development

Preserve the distinction:

- **fixed Battle reward** = reward authored for satisfying the exact Battle-outcome predicate;
- **action-derived development** = reward earned from exact actions/effects performed during the Battle;
- **Story/Origin/debrief reward** = separately evaluated later facts;
- **loot** = only exists when separately authorised.

These may all appear on the same Battle result, but they must remain semantically separate.

Example:

A Battle may award:

- **50 Ryō** for the exact victory;
- **Bukijutsu +6 EXP** because Kakashi used qualifying Bukijutsu actions;
- **Stamina +2 EXP** because two hostile packets were legitimately mitigated;
- **no Item**;
- while later Origin/debrief Ryō remains separately evaluated.

The Battle result must not collapse those into one generic "reward" number.

## 5. Kakashi Origin — current concrete examples

These examples consume current Kakashi Alpha authority and do not alter any Story/Battle semantics.

### Masked Interceptor

Exact solo MI victory fixed Battle reward:

- **50 Ryō**
- **Field Recovery Pill ×1**

Plus whatever exact action-derived technical-discipline / Stamina development Kakashi legitimately earned during that Battle.

MI's existing reward package is otherwise unchanged.

### Package Smuggler

Exact solo PS victory fixed Battle reward under Stephen's 2026-09-19 lock:

- **50 Ryō**
- **no Item / loot**

Plus whatever exact action-derived technical-discipline / Stamina development Kakashi legitimately earned during that Battle.

Current regression example demonstrates:

- **Bukijutsu +2 EXP**
- cause: an exact Kakashi Bukijutsu action produced an effective resolved result.

That QA example is evidence of the development law, not a fixed PS-specific +2 reward.

### ANBU Marked Target

Exact solo AMT victory fixed Battle reward under Stephen's 2026-09-19 lock:

- **50 Ryō**
- **no Item / loot**

Plus whatever exact action-derived technical-discipline / Stamina development Kakashi legitimately earned during that Battle.

Current regression example demonstrates:

- **Ninjutsu +2 EXP**
  - cause: Kakashi's exact Ninjutsu-tagged action produced an effective resolved result;
- **Stamina +1 EXP**
  - cause: one hostile AMT damage packet was positively mitigated by Kakashi's Stamina.

Current installed-browser evidence has also shown a result displaying **Bukijutsu +6 EXP** and **Stamina +2 EXP**. Those totals are not fixed AMT rewards. They must be explained from that Battle's actual committed evidence:
- the Bukijutsu total must trace to the exact qualifying Bukijutsu actions/execution classes;
- the Stamina +2 must trace to two qualifying mitigation packets under the current cap.

If the exact causal evidence is unavailable to the presentation layer, the UI must not fabricate an explanation. It must consume/preserve the authoritative Battle evidence needed to explain it.

## 6. Hidden development must be reportable

"Hidden" means it may not need to dominate the main Victory layout. It does **not** mean unknowable.

If a Battle commits hidden persistent development/evidence, the game must be able to surface:

- what development family changed;
- how much/significance if applicable;
- exact source action/result;
- whether it is persistent;
- whether it grants no immediate Skill/Rank/PL by itself.

Knowledge != Access != Competence != Power != Mastery remains preserved.

## 7. No-reward ambiguity

A player should not have to guess whether a zero means:

- no Battle cash;
- cash deferred;
- cash failed to commit;
- only action-derived development;
- reward already claimed;
- reward not applicable.

The result must distinguish those states explicitly.

## 8. Implementation contract

For each Battle Victory, runtime should project one complete reward explanation object/surface sourced from committed authority, covering:

- immediate money;
- immediate Items/equipment;
- technical-discipline EXP;
- Stamina EXP;
- other persistent/hidden development;
- generic Character EXP where applicable;
- other Battle-specific entitlements/unlocks;
- deferred reward classes separately;
- causal evidence for each development gain.

Presentation may use a concise main Victory summary with a **details / earned from** expansion, but the information must be available without requiring the player to reverse-engineer game rules.

## 9. Non-regression

This rule does not change:

- Battle outcome;
- opponent state;
- Story continuation;
- package/custody truth;
- pursuit eligibility;
- Rank/Promotion;
- Base PL;
- Skill ownership;
- loot eligibility;
- current development values/caps;
- existing MI reward contents;
- existing PS/AMT Story/Battle semantics.

It changes only **reward disclosure / causal explanation requirements**, plus consuming separately-authorised reward-value changes such as the 50-Ryō PS/AMT lock.

## Final lock

> **A Battle Victory must tell the player exactly what the Character received and why. Money, Items, technical/stat-development EXP, hidden persistent development, generic EXP, entitlements and deferred reward classes must remain distinct. Any development increase must be causally attributable to the exact committed action/effect that earned it.**
