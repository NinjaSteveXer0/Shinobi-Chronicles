# Shinobi Chronicles — Approved Dialogue Pre-GitHub Approval and Verbatim Consumption Protocol

**Date:** 2026-09-18  
**Owner:** CE / Codex / Coordination  
**Status:** **BINDING PROJECT-WIDE AUTHORING / IMPLEMENTATION GUARDRAIL**  
**Source issue:** #220  
**Primary priority:** Finish Shinobi Chronicles Alpha

## 1. Core rule

Once Shinobi Chronicles player-facing dialogue has been explicitly approved by Stephen, no specialist may change that dialogue in GitHub authority or runtime before Stephen has seen and explicitly approved the exact replacement wording.

Canonical flow:

```text
approved dialogue
-> proposed exact changed wording shown to Stephen
-> Stephen approves / edits / rejects
-> only approved exact wording may be committed
-> runtime consumes that wording without paraphrase
```

This is a pre-GitHub approval boundary.

It is not merely a Writing preference.

It binds every current and future specialist that can touch player-facing dialogue, including:

- Writing / Story;
- Coding / Runtime;
- UI / Assets;
- localisation preparation;
- CE / Codex / Coordination;
- refactoring / consolidation work;
- cue-manifest generation;
- compatibility migration;
- bug fixing;
- content archaeology / restoration.

## 2. Forbidden silent changes

Without Stephen's explicit prior approval of the exact replacement wording, do not:

- paraphrase approved dialogue;
- condense it;
- expand it;
- substitute synonyms;
- reorder spoken lines;
- merge two approved spoken lines into one;
- split one approved spoken line into several different lines;
- change contractions;
- change profanity/intensity;
- change speaker ownership;
- turn narration/action into dialogue;
- turn dialogue into narration/action;
- modernise voice;
- "clean up" grammar;
- alter punctuation where that punctuation materially expresses cadence/intonation;
- replace exact dialogue merely to fit a component/layout;
- rewrite dialogue during localisation preparation;
- rewrite dialogue because a legacy runtime copy is easier to edit.

"Mechanically equivalent" is not sufficient for approved dialogue.

If exact wording is approved, exact wording is authority.

## 3. Narration / action / presentation boundary

Narration, physical action, camera/presentation staging and UI layout may sometimes change independently under their own authority.

That does not grant permission to rewrite approved dialogue.

Preserve:

> **presentation edit != dialogue authority**

> **narration change != permission to paraphrase speech**

> **runtime refactor != new Writing authority**

If a presentation constraint genuinely makes approved dialogue unusable, surface the exact problem and proposed exact replacement to Stephen before committing changed dialogue.

## 4. Stable semantic identity

Runtime must not use literal dialogue text as semantic identity.

Approved dialogue is presentation data attached to stable semantic/cue/state identity.

Routing, consequences, resolver selection, Knowledge, rewards, save/load and occurrence identity must consume stable IDs / explicit metadata rather than comparing literal prose.

Therefore a future approved dialogue change should not require semantic rewiring merely because the words changed.

Canonical rule:

> **displayText != semantic ID**

## 5. Stale duplicate runtime copies

When current approved dialogue conflicts with an older runtime/presentation copy:

1. current approved GitHub authority wins;
2. remove/de-load or replace the stale duplicate;
3. do not reconcile them by inventing a third paraphrase;
4. preserve one canonical live dialogue projection where practical.

The presence of stale dialogue in runtime is a defect, not competing authority.

## 6. Proposal format when a change is actually needed

A specialist requesting a dialogue change should present Stephen with:

- current approved exact line(s);
- proposed exact replacement line(s);
- why the change is needed;
- whether speaker, order or surrounding staging changes;
- what semantic/cue IDs remain unchanged.

Do not commit the proposal as authority before approval.

Stephen may:

- approve exactly;
- edit the proposal;
- reject it;
- ask for alternatives.

Only the resulting approved wording may be committed.

## 7. New dialogue vs already-approved dialogue

This protocol does not require Stephen to personally pre-approve every first draft ever written unless another workflow says so.

The hard gate activates when:

- Stephen already approved the dialogue; or
- a durable verbatim lock explicitly marks wording approved/frozen; or
- a current scene-by-scene approval workflow requires approval before GitHub publication.

Once approved, later specialists cannot silently revise it.

## 8. Localisation boundary

Localisation may translate approved dialogue into another language under localisation authority, but it must not silently rewrite the source-language approved line.

Source-language authority remains intact.

If localisation reveals a genuine source-language problem that requires changing the approved original, route that exact source-language change through this protocol first.

Translation != permission to overwrite source dialogue.

## 9. Archaeology / restoration boundary

When recovering historical dialogue:

- exact recoverable approved text should be preserved as recovered provenance;
- uncertain reconstruction must not be labelled exact/verbatim;
- current approved dialogue is not replaced by a guessed historical variant;
- if Stephen chooses the recovered historical wording as the new current line, that explicit approval creates the new authority.

## 10. Coding / Runtime acceptance

Coding must treat approved dialogue changes as data-consumption work, not authoring freedom.

When implementing a verbatim lock:

- consume the exact approved wording;
- preserve exact speaker ownership;
- preserve approved order;
- preserve stable semantic/cue IDs;
- remove/de-load conflicting stale copies;
- add regression checks where practical against known rejected stale lines;
- never claim browser Golden until the installed browser projects the approved wording.

A source/headless test that only proves semantic routing does not prove dialogue Golden.

## 11. Current benchmark

Academy Kakashi Scene 1 remains a concrete benchmark:

`Documentation/Story/Academy_Kakashi_Origin_Scene_01_Rooftop_Verbatim_Lock_2026-09-17.md`

commit:

`d11aa0f4f8e1ee203d3b63cee9a1b0d2fa88ea91`

Conflicting stale Scene 1 dialogue copies are superseded by that exact approved authority.

The broader rule in this protocol is not Kakashi-specific.

## 12. Preserve

- approved dialogue != mutable implementation filler;
- dialogue wording != semantic identity;
- narration/action != dialogue;
- speaker ownership != renderer convenience;
- source language != localisation output;
- stale runtime copy != competing authority;
- proposed wording != approved wording;
- documentation landed != runtime implemented;
- runtime implemented != installed-browser validated;
- installed-browser correct != unrelated Golden automatically.

# Canonical lock

> **No already-approved Shinobi Chronicles dialogue may be changed in GitHub authority or runtime until Stephen has first seen and explicitly approved the exact replacement wording. Consumers implement approved dialogue verbatim and bind semantics to stable IDs rather than literal prose.**
