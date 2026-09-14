# Shinobi Chronicles — Pre-Public-Alpha Localisation and es-419 Translation Requirement

**Date:** 2026-09-14  
**Owner:** CE / Codex / Coordination with Coding / UI / Writing consumers  
**Status:** **STEPHEN-APPROVED PRE-PUBLIC-ALPHA PRODUCT REQUIREMENT**  
**Primary priority:** **FINISH SHINOBI CHRONICLES ALPHA**

## 1. Product decision

Shinobi Chronicles should not ship its public Alpha as an English-only experience if the existing coded-text UI direction makes a first localisation pass reasonably achievable without destabilising Alpha.

The minimum first non-English target is:

- **Latin American Spanish — `es-419`**.

This is specifically intended to make Shinobi Chronicles accessible to the large Spanish-speaking Naruto fan audience, including Mexico and wider Latin America.

English remains the canonical authoring language and semantic authority.

Canonical rule:

> **Chronicle truth is language-neutral. Localisation translates presentation, never history.**

## 2. Release boundary

This requirement is **QUEUE / PRE-PUBLIC-ALPHA**:

- it must **not interrupt current critical Alpha functionality / Golden closure work**;
- however, the localisation layer and an `es-419` player-facing translation should be completed **before the public Alpha is uploaded/deployed as the intended player release**, unless Stephen explicitly changes that release decision.

This is therefore a launch-preparation tranche, not a reason to delay active core-runtime work today.

## 3. Architecture direction

All gameplay semantics remain language-neutral.

Examples that must never be translated as authority:

```text
intent = OBSERVE
intent = ATTACK
actorRef = academy_kakashi
objectiveRef = stop_package_transfer
sourceOccurrenceRef = ...
resultRef = ...
```

Player-facing expression should resolve through locale-aware presentation keys / catalogues, conceptually:

```text
common.continue
story.kakashi.observe
story.kakashi.attack
battle.victory
chronicle.receipt.recorded_outcomes
```

with locale resources such as:

```text
en
es-419
```

The exact implementation shape remains Coding-owned. The binding requirement is semantic separation, not a mandated library.

## 4. Coded text vs baked image text

Current production direction increasingly treats UI art as placement / visual-reference material while Coding recreates functional UI in HTML/CSS/runtime presentation.

Preserve that direction.

Functional player-facing text should remain coded / data-driven wherever practical, including:

- buttons;
- menus;
- Story narration;
- dialogue;
- objectives;
- notifications;
- Battle messages;
- Chronicle receipts;
- tooltips;
- Codex descriptions;
- settings;
- World / Mission / Event labels;
- system guidance;
- dynamic state labels.

Do not newly bake reusable functional text into image assets merely for visual convenience.

### Character Card exception

Character Card titles / names that are intentionally part of collectible-card artwork may remain baked into the art for Alpha.

Localisation does not require regenerating collectible card art solely to translate the card name/title.

## 5. Protected Shinobi terminology glossary

Automated translation must not blindly translate established Naruto / Shinobi terminology.

Create and enforce a protected terminology glossary for terms whose recognised fandom identity should remain preserved or follow established local-language convention.

Examples include, subject to final glossary review:

- Hokage;
- Chūnin;
- Jōnin;
- ANBU;
- Konoha;
- Sharingan;
- Ninjutsu;
- Taijutsu;
- Genjutsu;
- Fūinjutsu;
- named characters;
- established technique names;
- village / clan names;
- established rank / organisation terms.

Do not assume every Japanese-derived term should be translated merely because English presentation also uses it unchanged.

Canonical rule:

> **Translate the sentence; protect the established Shinobi term.**

## 6. Translation production model

Stephen is not required to possess Spanish-language authoring skill.

The intended production model is:

`English canonical content`
→ `automated / AI-assisted translation into es-419`
→ `protected glossary enforcement`
→ `automated missing-key / placeholder / interpolation checks`
→ `UI overflow / wrapping checks`
→ `targeted human/community corrections where available`
→ `corrected locale catalogue becomes durable presentation authority`.

Automated translation is therefore legitimate as the first production pass.

It must not be allowed to mutate gameplay semantics, IDs, Chronicle facts, Rank, PL, ownership, Knowledge or resolver outcomes.

## 7. Language selection

The player should have a first-class language selector rather than relying exclusively on browser page translation.

Preferred Alpha behaviour:

- default / canonical locale: English;
- detect browser language as a convenience where safe;
- offer explicit manual override;
- support `es-419`;
- fall back to English when a translation key is missing;
- persist the player's language preference without affecting game-state semantics.

Browser-native translation may remain a fallback, but it is not the primary localisation contract.

## 8. Story / CE boundary

The same Story occurrence, Chronicle history and resolver result must remain identical regardless of language.

Example:

```text
semantic intent: PICKPOCKET
resolver result: TRANSFER_PREVENTED
```

may project differently in English and Spanish, but both languages must consume the same committed semantic state.

Preserve:

- translation != semantic mutation;
- translated wording != new Story authority;
- locale change != Chronicle reroll;
- language preference != Character / account progression state;
- translation refresh != occurrence recommit;
- CE Knowledge boundaries remain identical across locales.

## 9. Character voice

Translation should preserve character-specific voice as far as practical.

Machine translation should consume enough context to avoid flattening all named characters into one generic register.

Where supported, translation metadata may include:

- speaker identity;
- tone / cadence constraints;
- relationship context;
- scene context;
- profanity / formality constraints where appropriate.

Exact Spanish expression may later improve through bilingual community review without changing the English semantic authority.

## 10. UI resilience

Localisation readiness requires layouts that tolerate translated text expansion.

Coding / UI should prefer:

- flexible-width controls where appropriate;
- wrapping where safe;
- minimum rather than brittle fixed heights;
- overflow detection;
- no assumptions that English string length is universal;
- locale-aware punctuation / line-breaking where required.

`es-419` is the first concrete layout stress test.

## 11. Validation target before public Alpha

Minimum acceptance for the `es-419` tranche:

1. language selector exists and persists;
2. English remains canonical/fallback;
3. `es-419` catalogue exists for all intended public-Alpha functional UI and player-facing Story content;
4. protected Shinobi glossary is applied;
5. semantic IDs / Chronicle data are never translated;
6. no locale switch changes game state;
7. missing keys fail visibly to English, not blank UI;
8. placeholders / variables interpolate correctly in both locales;
9. major Alpha browser surfaces have no severe clipping/overflow under `es-419`;
10. Story choices preserve semantic intent under both locales;
11. Chronicle receipts show the same committed facts in both locales;
12. save/load remains locale-independent;
13. no image regeneration is required except if Stephen separately requests an art change;
14. installed-browser smoke pass proves language switching across onboarding, Story, Battle and ordinary UI.

## 12. Future locales

Potential later targets include:

- Brazilian Portuguese (`pt-BR`);
- other languages based on audience demand and production cost.

These are valuable but are not made Alpha blockers by this document.

## 13. Final shorthand

> **English authors the game. Semantic IDs run the game. Locale catalogues present the game.**

> **`es-419` is the first required non-English public-Alpha locale.**

> **Protect Shinobi terminology; translate surrounding player-facing expression.**

> **Keep functional UI text coded. Character Card baked names/titles are exempt for Alpha.**

> **Do not stop current Alpha closure work to implement this prematurely, but do not upload the intended public Alpha and then discover localisation was forgotten.**
