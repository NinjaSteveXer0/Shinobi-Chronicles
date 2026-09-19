# Origin Chronicle Receipt — Player History Summary Requirement

**Date:** 2026-09-14  
**Owner:** Writing / Story with CE / Codex / Coordination semantics  
**Status:** **BINDING PLAYER-FACING ORIGIN COMPLETION REQUIREMENT**

> **2026-09-20 CE causal-presentation extension**  
> Consume `Documentation/Coordination/CE_Interactive_Narrative_Affordance_Intention_Reincorporation_and_Causal_Presentation_Doctrine_2026-09-20.md` (commit `64399463d1870b752954ffceaaf31629a5961691`).  
> The Receipt remains read-only and chronological facts remain exact, but presentation should prefer **causal/consequence grouping** over a raw event-log dump where the committed provenance supports that relationship. Never fabricate causality from sequence alone.

## Purpose

After an Origin's final authored scene resolves, the player must see a concise summary of what CE actually entered into that Character's personal Chronicle before `YOUR CHRONICLE BEGINS`.

This requirement does not depend on community telemetry.

Telemetry may be added later as a separate optional comparison layer, but the **personal Chronicle receipt is mandatory**.

## Required sequence

`final Origin scene -> black wipe -> ORIGIN CHRONICLE RECEIPT -> Continue -> YOUR CHRONICLE BEGINS`

The receipt is not another Story scene and does not recommit history. It is a truthful read-only presentation of already committed Chronicle facts.

## Core principle

> **The player should leave the Origin knowing what their decisions and resolved outcomes actually put into their Chronicle.**

The receipt must distinguish:

1. **PLAYER DECISIONS** — intents the player explicitly chose;
2. **RECORDED OUTCOMES** — factual resolver results that actually occurred;
3. **CHRONICLE RELATIONSHIPS / HISTORY** — persistent encounter, acquaintance, hostility, custody, death, assistance, obligation or other legitimate history created by those events.

Do not collapse intent into outcome.

Example:

- `You chose to pursue the Rogue Chūnin.` = player decision.
- `Kakashi and Pakkun defeated the Rogue Chūnin.` = factual resolved outcome only if the Battle resolver says so.
- `Kakashi and Pakkun fought together for the first time.` = Chronicle relationship/history if that event occurred.

## What may be shown

Show only facts the player is legitimately entitled to know from the completed Origin.

Appropriate examples for Academy Kakashi include, depending on the actual route:

### YOUR DECISIONS
- Observed the Sakura-tree exchange.
- Pursued the Rogue Chūnin.
- Prioritised the package before confronting the Decoy Assassin.
- Chose to arrest / release / kill the Cipher Handler.
- Chose to remain and fight or disengage.

### WHAT HAPPENED
- The package was transferred to the Cipher Handler.
- The Decoy Assassin escaped / was defeated / remained unresolved.
- The Rogue Chūnin escaped / was defeated / was taken into ANBU custody.
- The package was recovered / lost / destroyed / disposition unknown to Kakashi.
- Kakashi won / lost a specific PL Battle where that result is player-known.

### ENTERED INTO YOUR CHRONICLE
- Kakashi Hatake met Pakkun.
- Kakashi Hatake and Pakkun fought together.
- Pakkun remains an acquaintance; no Summon acquisition occurred.
- Kakashi Hatake has prior history with the Rogue Chūnin / Cipher Handler / Decoy Assassin / ANBU operative if those actors persist and the encounter occurred.
- A named actor was arrested, released or killed if that fact was committed.

These are examples, not forced universal rows. The receipt is generated from the actual committed history.

## What must NOT be shown

Do not expose:

- hidden NPC Knowledge the player has not earned;
- internal CE IDs, flags, weights, scores or route variables;
- latent future route eligibility;
- hidden disposition values;
- unrevealed identities;
- speculative consequences that have not happened yet;
- impossible branches the player never reached;
- resolver possibilities that did not become fact;
- fake community percentages.

The receipt is a player-facing Chronicle summary, not a debug panel.

## Telemetry

Community comparison telemetry is **optional and non-blocking**.

If legitimate aggregate data exists later, it may be shown separately, for example:

`Other players who reached this decision: Observe 42% | Get Closer 24% | Attack 19% | Pickpocket 15%`

Such percentages must be conditioned on players who actually reached the same decision point. Never fabricate percentages when no real telemetry exists.

The personal Chronicle receipt remains complete and useful without telemetry.

## Presentation guidance

Recommended title:

`YOUR ORIGIN`

Subtitle:

`ACADEMY KAKASHI`

Primary heading:

`RECORDED IN YOUR CHRONICLE`

Suggested grouping:

- `YOUR DECISIONS`
- `WHAT HAPPENED`
- `HISTORY CREATED`

The exact UI composition remains Coding/UI-owned, but the semantic distinction above must remain visible and understandable.

## Persistence / truth requirement

The receipt must be generated from the same committed Chronicle facts that save/load and later Story consume.

It must not reconstruct history from button labels or presentation-only state.

If a later Story actor remembers the event, the receipt and CE history must derive from the same durable authority.

Therefore:

> **Receipt presentation != history commit.**  
> **Receipt must read committed history.**  
> **The player's displayed Origin history must survive reload unchanged.**

## Broader use

Academy Kakashi is the first benchmark.

The pattern should be reusable for the other Origins once their cinematic packages are implemented. Extension to Arc/Mission completion may be considered separately; do not make that post-Alpha/generalisation question an Alpha blocker for the Origin requirement.

## Final lock

> **Before `YOUR CHRONICLE BEGINS`, show the player a truthful read-only receipt of the decisions, outcomes and persistent history CE has actually entered into their personal Chronicle. Community telemetry is optional; personal Chronicle transparency is mandatory.**