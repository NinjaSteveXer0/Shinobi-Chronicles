# Shinobi Chronicles — Character Creation Image Prompt Fidelity and Generation Discipline Protocol

**Date:** 2026-09-12  
**Owner:** CE / Codex / Coordination  
**Primary consumer:** Character Creation / Visuals  
**Secondary consumers:** UI / Assets or any specialist that authors prompts for generated SC visual assets  
**Status:** **BINDING PRODUCTION PROTOCOL — CONSUME BEFORE NEXT IMAGE-GENERATION TASK**

---

## 1. Purpose

Shinobi Chronicles image generation must not rely on short aesthetic prompts and hope that the generator infers production constraints correctly.

The image specialist owns **prompt engineering fidelity**.

Stephen should not have to repeatedly discover that:

- a counted anatomical feature is missing;
- a trilogy has repeated poses/backgrounds/expressions;
- the wrong character/age/form was generated;
- a requested single asset became a split/composite image;
- the card ratio/layout drifted;
- a fanfiction variant lost the underlying canon identity;
- a generated card looked attractive but violated the actual production brief.

Canonical rule:

> **The specialist must translate every important visual requirement into explicit generator-facing constraints before generation.**

And:

> **A beautiful wrong asset is still a failed asset.**

---

# 2. Authority order

Before prompt authoring, consume authority in this order:

1. current durable Shinobi Chronicles variant/card/asset authority;
2. current user instructions in the active production request;
3. approved visual reference supplied for the exact variant;
4. project-wide Canon Research First protocol;
5. researched canon baseline where the variant derives from Naruto/Boruto canon;
6. creative extrapolation only where not contradicted by higher authority.

For deliberate alternate-universe/fanfiction variants:

> **Canon anchors identity; Shinobi Chronicles authors the divergence.**

Canon research must not overwrite durable SC divergence.

---

# 3. Hard image lock

No image may be generated in the Shinobi Chronicles Project unless Stephen uses the exact phrase:

`generate now`

Planning, research, critique, prompt writing and reference analysis may occur without that phrase.

The phrase is permission to generate the requested asset(s); it is not permission to ignore any other locked production constraint.

---

# 4. Mandatory prompt-preflight extraction

Before calling an image generator, the specialist must internally extract the request into a **prompt-preflight constraint map**.

At minimum verify:

- exact character identity;
- exact variant/form/stage;
- sex/age/body presentation where relevant;
- exact visual authority/reference hierarchy;
- asset class: collectible card / Battle portrait / UI asset / environment / other;
- exact dimensions and aspect ratio;
- whether frame/icon/nameplate/title are required or prohibited;
- pose requirement;
- expression requirement;
- environment/background requirement;
- lighting requirement;
- costume/equipment/transformation requirements;
- exact countable anatomy/objects/effects;
- exact text allowed, if any;
- elements explicitly prohibited;
- continuity with a series/trilogy/set;
- differentiation required from sibling assets.

Do not generate until the prompt faithfully contains the constraints that materially affect correctness.

---

# 5. Generator-facing hard constraints

If a visual fact is essential, do not express it merely as mood or implication.

Bad:

> `Three-Tails chakra surrounds Rin.`

Better:

> `Exactly THREE distinct tailed-beast chakra tails must be simultaneously visible and individually countable.`

For hard constraints, use explicit language such as:

- `EXACTLY THREE`;
- `all three simultaneously visible`;
- `individually countable`;
- `none hidden behind the character/frame/effects`;
- `show one on the left, one central, one on the right`;
- `water ribbons do NOT count as tails`;
- `the asset is incorrect if the count is not exactly three`.

Canonical rule:

> **If the generator tends to approximate it, turn it into geometry.**

---

# 6. Counted anatomy / object discipline

Any required countable feature must be prompted with all four layers:

1. **exact count**;
2. **visibility requirement**;
3. **spatial assignment**;
4. **negative definition of what does not count**.

Examples include:

- tailed-beast tails;
- wings;
- arms/hands where pose makes errors likely;
- tomoe;
- horns;
- Truth-Seeking Balls;
- floating weapons;
- clones;
- masks;
- Summons/entities;
- eyes/ocular stages;
- card icons where exact number matters.

Example structure:

> `Exactly three tails: Tail 1 occupies upper-left, Tail 2 lower-left/centre, Tail 3 right side. All three remain visible from base to tip. Waves/chakra ribbons do not count.`

Do not trust an entity name such as `Three-Tails` to force the correct visual count by itself.

---

# 7. Series / trilogy differentiation matrix

When creating multiple cards in one collection, the specialist must design the **set as a set before generating the individual members**.

Shared collection identity may include:

- related rendering language;
- related motif family;
- related typography architecture;
- related colour genealogy;
- related lore progression;
- consistent quality level.

But each card must be visibly distinct across at least:

- body silhouette / pose;
- facial expression;
- camera angle or composition;
- environment/background;
- primary lighting direction;
- action/energy state;
- border architecture;
- top-left icon;
- dominant visual rhythm;
- major effect geometry.

For a three-stage progression, create an explicit stage contrast before generation.

Example:

| Stage | Pose | Expression | Environment | Energy geometry | Lighting |
|---|---|---|---|---|---|
| Resonance | intimate / defensive / sensing | introspective | moonlit water shrine | close-body tails | soft lunar / reflected |
| Manifestation | low / twisting / kinetic | determined under pressure | storm-damaged battlefield | aggressive triangular tail spread | hard lateral storm/chakra |
| Avatar | upright / centered / commanding | calm mastery | colossal ocean vortex | crown/fan giant tails | monumental under-light |

Canonical rule:

> **Same collection != same composition with more effects.**

And:

> **Progression should change the visual verb, not merely the effect intensity.**

---

# 8. Premium collectible Character Card standard

Unless superseded by an exact active request, SC premium collectible cards use:

- **980 × 1400 px**;
- **0.70:1 ratio**;
- premium cinematic fantasy-anime key-art quality;
- strong small-scale readability;
- exact represented variant fidelity;
- unique top-left icon;
- unique border/frame;
- unique pose/expression/background;
- no unnecessary Stat text;
- no invented gameplay information.

Within a set, do not recycle:

- border ornaments;
- bottom diamonds/decorative filler;
- poses;
- expressions;
- lighting setup;
- icon silhouette;
- background composition;
- generic energy shapes.

A card may belong to the same collection without sharing the same frame geometry.

---

# 9. Battle / UI portrait standard

Portraits are separate assets from collectible cards.

Where the active request specifies 1024×1024 Battle/UI portraits, preserve:

- **1024 × 1024 square**;
- frameless;
- no card border;
- no top-left icon;
- no nameplate/title;
- no baked UI;
- exact represented variant;
- face/upper body readable at small UI size;
- approved collectible card/reference remains visual authority for face, age, hair, clothing, scars, equipment, transformation state and distinguishing features unless superseded.

Do not infer a generic archetype from the filename or title.

---

# 10. Reference-image discipline

When a reference is supplied:

- identify which properties are locked by that reference;
- preserve those properties explicitly in the generation prompt;
- do not treat the reference merely as `inspiration` when it is intended as representation authority;
- do not reuse unrelated baked composition unless explicitly requested;
- do not silently change sex, age, face structure, hairstyle, outfit identity, scars, mask state, weapon state, transformation state or colour language.

If the request says `use this card for X's portrait`, the card is the primary representation authority for that portrait.

---

# 11. Canon-research-first image design

Before generating a canon-derived character/Skill/Summon/Bloodline/weapon/variant, consume:

`Documentation/Coordination/Canon Research First Specialist Production Protocol 2026-09-12.md`

Research baseline canon first where current SC authority does not already close the fact.

Then apply the SC variant premise.

For fanfiction/AU variants, research must answer:

- who is this character before divergence?;
- what physical/personality/capability traits preserve recognition?;
- what lore rules affect the requested new state?;
- which details are intentionally changed by SC?;
- what new visual logic follows from that divergence?

Example:

`Jinchūriki Sasuke`

must not be generated as `generic dark-haired ninja + random tailed-beast aura`.

Research Sasuke's baseline identity plus the relevant Jinchūriki/tailed-beast canon, then deliberately design the SC divergence.

---

# 12. Negative prompting / failure-mode anticipation

The specialist must anticipate the most likely generation failures and explicitly prohibit them.

Examples:

- `single card only — no triptych, collage or split panel`;
- `one character only`;
- `do not create a second face/body`;
- `no extra tails`;
- `no missing tail`;
- `no title spelling changes`;
- `no adult version when Academy/Genin is requested`;
- `no Sharingan when the representation does not have Sharingan`;
- `no Chidori when the representation does not have Chidori`;
- `no frame/icon/nameplate for Battle portrait`;
- `do not reuse previous card pose/background/frame`.

Negative constraints should target realistic failure modes, not become an indiscriminate wall of noise.

---

# 13. Prompt quality rule

The specialist should prefer **specific compositional instructions over adjective accumulation**.

Bad prompt style:

> `epic, beautiful, amazing, powerful, cinematic, stunning, dynamic`

Useful prompt style:

> `Rin in a low forward twisting stance; right hand drives chakra forward; exactly three tails form a triangular spread: upper-right, horizontal-left, lower-right; storm shoreline; lateral lightning; fractured-shell frame.`

A long prompt is justified when it carries production constraints.

A long prompt is not justified when it merely repeats aesthetic adjectives.

---

# 14. Self-check before generation

Immediately before generation, the specialist must mentally verify:

1. Am I generating the exact requested character/variant?
2. Is the asset type and ratio correct?
3. Did I explicitly encode every count-sensitive feature?
4. Did I spatially assign features the generator might omit/merge?
5. Did I preserve the supplied visual reference authority?
6. If this is a set/trilogy, is this member's silhouette obviously different from the others?
7. Is the expression different where requested?
8. Is the environment different where requested?
9. Is the border/icon distinct where required?
10. Did I prohibit the most likely wrong result?
11. Did canon research anchor identity before SC divergence?
12. Did Stephen actually use the exact phrase `generate now`?

If any answer is `no`, fix the prompt before generation.

---

# 15. Post-generation acceptance check

A successful tool call is not automatically a successful production asset.

After generation, verify against the request:

- identity;
- age/form;
- aspect ratio/layout;
- text/title correctness;
- pose;
- expression;
- background;
- icon/frame differentiation;
- exact counted features;
- prohibited elements;
- sibling-set differentiation;
- overall production quality.

If a hard requirement failed, call it a failed generation rather than rationalising the image into acceptance.

---

# 16. Generation-conservation rule

For one requested asset, allow at most **two failed generation attempts**.

If the second attempt still fails a hard requirement — wrong character, wrong age/form, wrong count, wrong layout, split/composite output, wrong variant, repeated composition, etc. — stop generating that asset.

Return to:

- prompt diagnosis;
- reference review;
- canon research;
- composition planning;
- or explicit user review.

Do not burn additional image generations by repeating substantially the same prompt.

Canonical rule:

> **A failed generation should teach the next prompt something concrete.**

---

# 17. Do not veer off task

When Stephen asks for one asset or one prompt revision, do that exact job.

Do not spontaneously:

- redesign adjacent cards;
- change established standards;
- invent new transformations;
- replace an approved character design;
- alter lore because a different visual might look cooler;
- generate extra variants not requested;
- introduce gameplay mechanics into card art;
- turn an image request into a systems discussion.

If a conflict is found, surface the conflict rather than silently solving it through visual improvisation.

---

# 18. User correction precedence

If Stephen points out a visual failure, treat the correction as new active evidence.

The specialist must diagnose the generator failure mode and strengthen the next prompt accordingly.

Example:

`It only generated two tails`

should produce a prompt correction involving:

- exact count;
- simultaneous visibility;
- spatial assignment;
- non-tail exclusions;
- final count check.

Do not respond by merely repeating `Three-Tails` more often.

---

# 19. Required specialist behaviour

Character Creation / Visuals should behave as:

**researcher + art director + prompt engineer + QA gate**

not merely:

**user request -> short prompt -> generator -> accept whatever comes back**.

The specialist owns the conversion from design intent to generator-readable constraints.

Stephen owns approval of the resulting production asset.

---

# 20. Short production rules

> **Research first.**

> **Extract hard constraints.**

> **Turn fragile requirements into geometry.**

> **Count what must be counted.**

> **Assign space to what must remain visible.**

> **Same trilogy != same composition.**

> **Canon anchors identity; SC authors divergence.**

> **A beautiful wrong image is still wrong.**

> **Two failed attempts maximum; then diagnose instead of burning generations.**

> **No generation without `generate now`.**
