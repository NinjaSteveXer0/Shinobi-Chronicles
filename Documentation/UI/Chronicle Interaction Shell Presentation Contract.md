# Shinobi Chronicles — Chronicle Interaction Shell Presentation Contract

Date: 8 September 2026

Status: **BINDING ALPHA UI PRESENTATION CONTRACT — DESIGN CLOSED / ASSET LANDED / EXACT RUNTIME INTEGRATION + BROWSER GOLDEN SEPARATE**

Production asset:

`UI/convo.png`

Asset commit:

`6b12b71949604212a9a6d4dad9393c3d683f29ec`

---

# 1. Purpose

Shinobi Chronicles uses one reusable Chronicle Interaction presentation system with three presentation depths:

1. **Full Chronicle Interaction**
2. **Standard Conversation**
3. **Quick Exchange**

These are presentation-depth variants of the same underlying Story / Chronicle interaction semantics.

Canonical rule:

> **same occurrence semantics → different presentation depth**

Presentation density must not create duplicate Story, Knowledge, Battle, choice, consequence or history systems.

---

# 2. Presentation depths

## Full Chronicle Interaction

Maximum-density presentation for scenes that genuinely require the richest contextual surface.

It may expose more available context, source/participant presentation, action/choice space and consequence/record feedback when the authoritative caller supplies them.

Full mode is **not** the mandatory default for ordinary dialogue and must not acquire permanent tutorial/legend furniture merely because the largest shell has room for it.

## Standard Conversation

The primary Story workhorse.

Use for ordinary authored narrative interaction where a full maximum-density shell would be unnecessary but the scene still needs clear speaker/source, environment, dialogue/action text and legitimate contextual interaction.

## Quick Exchange

Lightweight presentation for brief contextual communication or interaction.

Quick Exchange is not a weaker semantic event type. It is a shallower presentation of legitimate underlying interaction state.

---

# 3. Presentation depth ≠ semantic mode

The three depths are orthogonal to semantic interaction modes.

The underlying Story/Chronicle runtime may still present, where authorised:

- dialogue;
- internal voice;
- remote voice/source;
- narration/action;
- meaningful choice;
- Battle transition;
- post-Battle continuation;
- consequence/record receipt;
- another explicitly authorised Story Scene mode.

Preserve:

> **presentation depth ≠ dialogue type**

> **presentation depth ≠ occurrence identity**

> **presentation depth ≠ separate resolver**

---

# 4. Environment remains the scene foundation

The environment/backdrop is the scene foundation.

Reusable Scene Backdrops contain environment. They do not silently bake in assumed teammates, protagonists, enemies or other runtime participants unless an exact authored asset is explicitly scene-specific.

Foreground character composition is an optional presentation slot supplied by scene context. It is **not** a permanent protagonist slot.

Preserve:

> **environment ≠ participant roster**

> **foreground composition ≠ protagonist ownership**

---

# 5. Source / participant / Knowledge distinctions

The shell must support observer-safe source presentation without collapsing epistemic or participant state.

Preserve permanently:

> **speaker/source ≠ physical participant**

> **Present ≠ Heard ≠ Knows ≠ Battle participant**

A voice may legitimately come from an internal source, remote source, projection, recording, memory, concealed source or other authorised origin without asserting that source is physically present or Battle-eligible.

UI display of a speaker/source does not grant Knowledge to every visible participant and does not establish world truth beyond the authoritative semantic payload.

---

# 6. Context and actions are authority-supplied

The Chronicle Interaction shell consumes legitimate context/actions from Story / World / CE / domain authority.

The shell must not invent:

- available choices;
- Battle legality;
- participant presence;
- Knowledge;
- relationship state;
- consequences;
- opportunity eligibility;
- history merely because a control can be visually represented.

Preserve:

> **player-visible response ≠ resolver legality calculation**

> **choice display ≠ historical mutation**

> **UI context ≠ semantic authority**

---

# 7. Record update / consequence receipt

A Record update or consequence notice is a transient presentation receipt.

It is not ordinary dialogue and it is not the causal event itself.

Preserve:

> **Record notification ≠ occurrence**

> **presentation receipt ≠ consequence authority**

The receipt may present an already-authorised change; it must not create that change by being shown.

---

# 8. Generated/contextual expression boundary

Where later Chronicle Engine contextual-expression systems are used, generated wording remains a presentation consumer of already-authorised semantic meaning.

The shell does not permit generated prose to create World Truth, Knowledge, relationship change or a committed communication occurrence by itself.

Any historical communication write-back requires an authorised resolved communication occurrence through CE/domain authority.

---

# 9. Runtime ownership

The existing reusable Story Scene/runtime architecture remains semantic authority for scene lifecycle, meaningful choice, Battle transition and post-Battle continuation.

This contract adds/locks the **three-depth presentation architecture** only.

Canonical rule:

> **existing Story Scene runtime ≠ proof that this newer presentation contract is implemented**

Coding must bind this shell to existing Story Scene semantics rather than creating a second dialogue/Story subsystem.

---

# 10. Validation requirements

Implementation closure requires evidence for the exact production source/asset showing:

- Full / Standard / Quick presentation states are reachable through one semantic interaction system;
- semantic modes remain available independently of presentation depth where authorised;
- source ≠ physical participant is preserved;
- Present / Heard / Knows / Battle participant are not inferred from UI visibility;
- environment/backdrop remains participant-neutral unless explicitly scene-authored;
- context/actions come from authoritative caller state;
- Record update is presentation-only receipt;
- Story Scene → Battle → same caller/scene continuation is preserved;
- save/load does not fabricate/recommit a displayed interaction;
- browser layout is validated at Alpha target viewports;
- no duplicate Story/choice/history engine is introduced.

Until those checks are proven:

**design closed ≠ implemented ≠ browser validated ≠ Golden GREEN**.

---

# Final contract

> **Shinobi Chronicles uses one Chronicle Interaction semantic system projected through Full, Standard and Quick presentation depths. Presentation may vary in density; occurrence identity, participant truth, Knowledge, resolver authority and committed history do not.**
