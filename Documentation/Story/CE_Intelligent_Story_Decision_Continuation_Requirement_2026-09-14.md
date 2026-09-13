# Shinobi Chronicles — CE Intelligent Story Decision Continuation Requirement

**Date:** 2026-09-14  
**Owner:** Writing / Story — Konoha  
**Status:** **BINDING STORY REQUIREMENT — CE / CODEX / COORDINATION IMPLEMENTATION CONTRACT REQUIRED**  
**Parent doctrine:** `Documentation/Story/Interactive_Scene_Performance_and_Branch_Realization_Doctrine_2026-09-14.md`

## 1. Core correction

Stephen has explicitly clarified a crucial authoring boundary:

> **If Stephen did not choose a branch, Stephen should not have to author what happened on that branch.**

A recovered/approved playthrough proves one realised Chronicle history. It does not provide the factual continuation for choices that were never taken.

Therefore unplayed branches must not be filled by copying the selected route, by Writing inventing arbitrary flavour outcomes, or by hard-coding every possible future continuation in advance merely to preserve the illusion of choice.

The Chronicle Engine must be capable of taking the chosen intent plus the authoritative current state and intelligently determining the next legitimate Story situation and next meaningful decision set.

Canonical rule:

> **Author the world, actors, constraints and meaningful intents.**  
> **Let CE determine the legitimate continuation from committed history.**

This does not mean unrestricted generative fiction. CE remains bounded by authoritative Story facts, World Truth, actor Knowledge, capability, ownership, relationships, available resolvers and authored route constraints.

---

# 2. Choice is the start of reasoning, not the end of a branch lookup

When the player chooses an option such as:

- Observe;
- Get Closer;
- Attack;
- Attempt to Pickpocket;

that selection commits **intent / attempted action**.

The runtime must not simply map:

`choice ID -> prewritten paragraph -> next fixed choice menu`

unless the relevant continuation is itself already historically/semantically fixed.

Instead, CE should evaluate the changed Story state and answer the questions required to determine what can legitimately happen next.

---

# 3. Required CE continuation questions

After every meaningful decision and factual resolver result, CE must evaluate at least the following categories before producing the next Story decision set.

## A. What actually changed?

- Did the attempted action succeed, partially succeed or fail?
- Who moved?
- Who was detected?
- Who escaped?
- Who was injured?
- Did object custody change?
- Did evidence appear, disappear or become compromised?
- Did a Battle begin/end?
- Did a route or opportunity open/close?

CE must consume committed factual resolver output rather than infer success from the choice label.

## B. What does the protagonist now legitimately know?

- What did they personally observe?
- What did another actor tell them?
- What remains suspicion rather than fact?
- What information from another possible branch must remain unknown?

Preserve:

> **World Truth != protagonist Knowledge.**

## C. What do the other actors now know?

For every materially relevant actor:

- Did they notice the protagonist?
- Did they witness the attempted action?
- Do they know the package/object has moved?
- Do they know another actor is present?
- Do they know who caused the event?

NPC Knowledge must remain actor-relative.

## D. What does each actor want now?

Re-evaluate goals after the changed state:

- finish the exchange;
- flee;
- hide evidence;
- recover an object;
- attack;
- protect somebody;
- call for help;
- mislead;
- negotiate;
- wait;
- exploit distraction;
- preserve cover;
- obey an institution/order;
- abandon a failed objective.

NPCs do not wait passively for the next player menu.

## E. What can each actor actually do?

Use authoritative capability/access:

- Skills / Techniques;
- Battle capability;
- movement/position;
- equipment/items;
- relationships/support;
- rank/authority where relevant;
- environment;
- current injury/resource state;
- known escape routes;
- available World opportunities.

Do not invent competence or remove legitimate competence merely to force a preferred plot.

## F. What unresolved pressures remain?

Determine what still matters now:

- original objective;
- new threat;
- package/object custody;
- intelligence opportunity;
- fleeing actor;
- endangered person;
- time pressure;
- political consequence;
- relationship tension;
- hidden evidence;
- competing duty.

A resolved pressure should disappear from the next decision set unless new events make it relevant again.

## G. What would happen without protagonist intervention?

This question is mandatory.

CE should determine the likely autonomous World/NPC continuation if the protagonist does nothing further.

This prevents Story from behaving as though everyone freezes while waiting for the player.

## H. What new meaningful decisions now exist?

Only after A–G are answered should CE derive the next choice set.

Candidate next choices should come from real unresolved pressures and legitimate protagonist capability.

They must represent distinct intents, not cosmetic wording variants.

## I. Which candidate choices are actually eligible?

Filter by:

- protagonist Knowledge;
- capability/access;
- physical position;
- actor availability;
- World state;
- route/history;
- ownership;
- prior choices/outcomes;
- authored Story constraints;
- legal resolver seams.

The UI must not offer choices the protagonist cannot legitimately conceive or attempt.

## J. Does the scene need another choice at all?

Sometimes the correct continuation is:

- NPC action;
- automatic consequence;
- Battle;
- transition;
- short dialogue/reaction;
- scene closure.

Do not manufacture a choice merely because the previous beat had one.

Canonical rule:

> **CE asks whether a meaningful decision exists before asking what the options are.**

---

# 4. Next-choice quality test

A generated/resolved next choice set is production-valid only if:

1. every option is causally available from current committed state;
2. every option represents a materially distinct protagonist intent;
3. no option assumes hidden Knowledge the protagonist lacks;
4. no option guarantees an outcome owned by another resolver;
5. NPC autonomy remains intact;
6. at least one option is not merely a paraphrase of another;
7. omitted obvious actions have a defensible eligibility reason;
8. the set remains stable on reopen/save-load while the underlying state is unchanged;
9. choosing one option can legitimately change later possibilities;
10. there is no requirement that all options reconverge immediately.

---

# 5. Kakashi benchmark — `Observe` example

Stephen's recovered Kakashi history did **not** select `Observe` at the Sakura-tree exchange.

Therefore Writing must not pretend to know exactly what happened after `Observe` merely because another route is known.

CE should instead evaluate the branch from the authoritative pre-choice state.

Illustrative reasoning questions — **not a predetermined answer**:

- How long does Kakashi choose to observe?
- What are the target and second actor independently trying to accomplish?
- Does the package change hands while Kakashi remains concealed?
- Does either actor notice surveillance?
- Does the Rogue Chūnin/third actor already have an independent reason/timing to intervene?
- What extra information can Kakashi actually perceive from his current position?
- Does continued observation improve Knowledge while increasing the risk of losing direct control of the package?
- If the actors begin to leave, which pressures now conflict?
- Is the next meaningful decision now `follow one actor`, `secure the package`, `continue surveillance`, `intervene`, `signal for support`, or something else?
- Which of those actions are actually eligible from the resulting state?

The answer must be produced from current authoritative state and resolvers, not copied from Stephen's chosen route.

Preserve:

> **Stephen did not pick Observe -> Stephen does not owe the project an Observe screenplay.**

> **CE continuation reasoning exists specifically so unplayed branches can remain coherent Chronicles.**

---

# 6. Authored structure vs CE-realised continuation

Writing still owns:

- premise;
- major historical/canon constraints;
- character voice;
- important authored set-pieces;
- route themes;
- required or prohibited facts;
- meaningful semantic intent families where deliberately designed;
- mandatory Story beats where the campaign requires them;
- dialogue/narration quality rules;
- approved fixed lines/scenes;
- ending/convergence constraints where genuinely authored.

CE / runtime owns or coordinates:

- current-state evaluation;
- eligibility;
- committed intent;
- resolver dispatch;
- actor-relative Knowledge consumption;
- autonomous NPC/world continuation;
- deriving the legitimate next decision situation from changed state;
- stable unresolved decision sets;
- persistence/save-load identity;
- preserving consequence/history provenance.

This is not `AI improvises the plot`.

It is:

> **Authored world + authored people + authored constraints + committed Chronicle history -> intelligent bounded continuation.**

---

# 7. Deterministic authored scenes remain valid

Not every Story beat must be dynamically derived.

Fixed authored continuation is correct when:

- a historical event is already committed;
- a required set-piece must occur given satisfied conditions;
- an actor has one factual autonomous response;
- no meaningful player decision currently exists;
- a Battle/World resolver must run;
- route structure requires a known transition;
- the scene is presenting the visible aftermath of a committed result.

The goal is not maximum randomness.

Preserve:

> **randomness among eligible possibilities != randomness deciding eligibility.**

> **dynamic continuation != arbitrary continuation.**

---

# 8. Storywide scope

This requirement applies to:

- all Academy Origins;
- Arc 1–3 implementation/repair;
- Arc 4–8 Canon;
- Alt;
- Rogue;
- Non-Conformance;
- Leader / Take-the-Throne;
- Great Nation travel;
- optional World offshoot/reintegration;
- hidden areas;
- future village campaigns;
- All-Route / Ōtsutsuki convergence.

As Story scale increases, the need for state-derived continuation becomes stronger, because hand-authoring every permutation would either become impossible or force fake reconvergence that destroys Chronicle meaning.

---

# 9. Final canonical shorthand

> **Writing defines what the situation means.**  
> **The player chooses what they try.**  
> **The resolver establishes what actually happened.**  
> **CE asks what is now true, known, wanted, possible and unresolved.**  
> **From that state, CE determines whether another meaningful decision exists and what legitimate intents are available.**  
> **Story then performs that continuation through narration, dialogue, reaction and visible consequence.**

And:

> **Do not ask Stephen to screenplay choices he never made merely so the game can pretend they matter. Build the Chronicle Engine so those choices can matter coherently.**
