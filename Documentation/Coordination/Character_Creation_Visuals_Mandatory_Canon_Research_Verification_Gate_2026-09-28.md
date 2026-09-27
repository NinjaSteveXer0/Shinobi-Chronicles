# Shinobi Chronicles — Character Creation / Visuals Mandatory Canon Research Verification Gate

**Date:** 2026-09-28  
**Owner:** CE / Codex / Coordination  
**Applies to:** Character Creation / Visuals and successor visual workspaces  
**Status:** **BINDING PRE-GENERATION GATE — EXTENDS #134, #138, #207 AND #231**  
**Primary priority:** Finish Shinobi Chronicles Alpha

## 1. Why this gate exists

Stephen has identified repeated Character Creation / Visuals drift where the workspace claims or implies that canon research has been performed, then generates without actually carrying out current online research.

The current project already requires:

- Canon Research First (#134);
- image-prompt fidelity / generation discipline (#138);
- Genin Menma premium benchmark (#207);
- live visual-rule refresh before every generation (#231).

Those rules were not strict enough in execution because Character Creation could treat durable authority or conversation memory as a sufficient canon anchor and skip a real current research pass.

That loophole is now closed for visual generation.

Canonical shorthand:

> **NO FRESH RESEARCH EVIDENCE -> NO CANON-DERIVED GENERATION.**

and:

> **Research must happen before the image call, not after a bad result.**

---

# 2. Hard trigger

This gate applies whenever the requested image or edit materially depicts any Naruto/Boruto-derived:

- person;
- age/era/form;
- outfit;
- transformation;
- Bloodline state;
- Jinchūriki state;
- Tailed Beast;
- Summon;
- weapon;
- technique effect;
- clan/faction symbol;
- canonical location;
- canonical creature/anatomy;
- canon-derived alternate / fanfiction / SC-divergent variant.

It applies to:

- collectible Character Cards;
- Battle/UI portraits;
- NPC cards;
- Entity cards;
- Summon cards;
- Tailed Beast cards;
- Jinchūriki stages;
- transformations;
- remasters;
- edits;
- alternate versions;
- surgical corrections.

It applies even when:
- the previous generation was moments ago;
- the same subject has been generated before;
- a GitHub prompt already exists;
- the user supplies a detailed prompt;
- Project memory contains the character;
- an approved older asset exists.

The only exception is a **purely technical pixel-preserving operation** that does not alter semantic appearance, such as exact resize/canvas normalization when separately authorised.

---

# 3. Fresh same-task research is mandatory

For canon-derived visual generation, Character Creation / Visuals must perform a fresh current web research pass **during the same task cycle before calling image generation**.

Do not satisfy this gate by saying:
- “I know the character”;
- “I researched this earlier”;
- “GitHub already says what it looks like”;
- “the prompt is detailed enough”;
- “Project memory has the canon”;
- “I checked the rules”.

GitHub/SC authority is still mandatory, but it is not a substitute for the fresh canon verification pass.

For Character Creation / Visuals specifically, this rule is stricter than the proportional-research exception in #134 section 14.

> **For generation/edit of canon-derived visuals, fresh research is compulsory rather than optional.**

---

# 4. Minimum research package before generation

Before every canon-derived image call, establish at minimum:

## A. Exact subject identity
Verify:
- exact person/entity;
- exact canon name / aliases where relevant;
- whether the target is a human, creature, Summon, Tailed Beast, construct, form, etc.

## B. Exact era / stage / form
Verify where relevant:
- age;
- Academy / Genin / Chūnin / Jōnin / Kage / other stage;
- pre-timeskip / later era;
- transformed / hosted / cloaked state;
- exact Tailed Beast partition or named representation;
- exact outfit/form relevant to the request.

## C. Visual identity anchors
Verify the relevant subset:
- hair;
- eyes;
- facial markings;
- skin/fur/shell/body colour;
- outfit;
- armour;
- equipment;
- silhouette;
- body scale/build;
- signature anatomy;
- canonical motifs.

## D. Count-sensitive anatomy / objects
Verify exact count and arrangement where relevant:
- tails;
- wings;
- horns;
- limbs;
- eyes;
- tomoe;
- Truth-Seeking Balls;
- blades;
- masks;
- heads;
- floating weapons;
- clones;
- markings.

A number in a character's title/name is never enough by itself.

Example:

**Seven-Tails** requires actual research proving the Seven-Tails' relevant canonical anatomy and how the seven tails are visually represented. Do not simply infer “seven visible appendages” from the name and immediately generate.

## E. Canon signature behaviour / physical language
Where useful for pose/composition, verify:
- flight vs grounded movement;
- posture;
- temperament;
- signature movement;
- environmental association;
- elemental/energy presentation;
- whether the creature/person commonly uses a specific visual mode.

## F. SC divergence
After canon verification, separately state internally:
- what canon anchors remain;
- what exact SC authority changes;
- what must not be “corrected” back to canon.

---

# 5. Source minimum

For each canon-derived generation:

## Preferred minimum
Use at least:
- **one Tier-1 / official source when reasonably available**, AND
- **one independent corroborating source** appropriate to the production question.

Independent corroboration may be:
- another official source;
- an official image/database/manga reference;
- a reputable secondary reference used to consolidate canon.

For highly obscure subjects where no usable official web source is reasonably available:
- use at least **two independent high-quality secondary sources**;
- explicitly record that no suitable Tier-1 web source was found.

Do not use:
- one search-result snippet;
- one uncited fandom image;
- one Pinterest post;
- AI summaries;
- generic image search thumbnails;
- one community comment
as the entire research basis.

Community sources may help identify ambiguity but cannot be the sole canon authority.

---

# 6. Visual-source rule

If the task depends on **appearance**, text-only lore research is not always enough.

Character Creation should seek actual visual reference evidence when reasonably available for:
- unusual anatomy;
- tail/wings/horn arrangement;
- exact costume;
- face markings;
- colour placement;
- creature silhouette;
- special forms.

For count-sensitive creature anatomy, use visual references whenever possible.

Do not assume a textual description fully captures spatial arrangement.

---

# 7. Research receipt — mandatory internal checkpoint

Before generation, Character Creation must have a concrete research receipt containing:

- subject;
- requested form/state;
- exact canon facts relevant to the image;
- exact count-sensitive facts;
- source names/links or source refs;
- ambiguity/conflict notes;
- SC divergence;
- locked visual requirements;
- generation risks.

If there is no research receipt, generation is blocked.

The receipt may be concise, but it must exist as evidence of actual research.

Merely thinking “research complete” is insufficient.

---

# 8. No tool-call theatre

The workspace must not fake compliance by:

- opening one unrelated page;
- searching the subject's name without reading relevant evidence;
- using search snippets without opening/validating the source;
- researching after image generation;
- citing a source that does not support the visual fact being used;
- repeating GitHub text and calling that canon research;
- using a wiki page title as proof without checking the relevant section.

Research must materially inform the prompt.

Canonical:

> **A web call happened != research completed.**

---

# 9. Research-to-prompt traceability

Every important researched fact must map to a prompt constraint.

Examples:

- canon says the beast is primarily airborne -> composition must support airborne presentation;
- canon confirms insect-like body -> preserve insectoid silhouette;
- canon shows specific facial/eye structure -> include it;
- canon confirms exact tail count -> hard geometry must enforce it;
- SC says this is wild numbered-beast state rather than named-partnership state -> environment/expression must reflect that distinction.

Do not research facts and then generate a generic approximation anyway.

---

# 10. Hard-count visual protocol

For any exact-count requirement, research first and then write the prompt as:

1. **exact count**;
2. **all countable simultaneously**;
3. **each one visually separated**;
4. **none occluded by body/frame/effects**;
5. **each assigned a distinct composition region where practical**;
6. **lookalike effects do not count**;
7. **wrong count = automatic rejection**.

For example:

> EXACTLY 7 canonical tails. All seven must be simultaneously visible, individually separable and countable. No wing, leg, chakra ribbon, shell extension, dust plume or environmental effect may substitute for a tail.

Count-sensitive anatomy must be validated against research before this geometry is authored.

---

# 11. Canon anatomy beats aesthetic convenience

A premium composition may not simplify canonical anatomy merely because:
- the frame is crowded;
- another silhouette looks cleaner;
- symmetry is easier;
- the generator tends to omit appendages;
- cinematic effects hide the count.

If correct anatomy cannot fit the proposed composition, change the composition.

Do not change canon anatomy to fit the composition.

---

# 12. Exact-form contamination rule

Research must specifically guard against mixing neighbouring forms.

Forbidden examples include:
- adult traits on Academy representation;
- later outfit on earlier card;
- partnership Kurama visual language on hostile Nine-Tails state;
- transformed markings on base form;
- manga/anime/game-only costume blended without authority;
- one Tailed Beast's anatomy copied onto another because both have shells/wings;
- named-beast personality presentation copied onto wild numbered-beast representation where SC distinguishes them.

When sources show different continuities/forms, choose the one matching current SC authority and record the choice.

---

# 13. SC divergence firewall

Fresh canon research must never erase current SC design.

Use:

`current SC authority -> canon anchor -> deliberate divergence -> prompt`

not:

`canon search -> overwrite SC variant`.

Examples:
- Mizukage's Aide Obito remains the SC divergence;
- Jinchūriki Sakura remains the SC divergence;
- Dark Naruto states remain SC divergences;
- numbered-beast vs true-name presentation remains current SC visual semantics where locked.

Research strengthens identity; it does not veto the fanfiction premise.

---

# 14. Generation authorization remains separate

Research does not authorise image generation.

The existing hard lock remains:

> **No image generation anywhere in Shinobi Chronicles unless Stephen uses the exact phrase `generate now`.**

Correct sequence:

```text
Stephen requests visual
-> live GitHub authority refresh
-> fresh canon web research
-> research receipt
-> SC divergence reconciliation
-> prompt-preflight map
-> hard-count geometry
-> verify exact phrase "generate now"
-> image generation
-> post-generation QA
```

If the phrase is missing, stop before generation even when all research is complete.

---

# 15. Same-message generation rule

When Stephen says `generate now` in the same request as the subject:

Character Creation must still complete:
1. live GitHub refresh;
2. fresh web research;
3. research receipt;
4. preflight;
5. only then generation.

`generate now` means permission to generate **after required research**, not permission to skip it.

Do not interpret urgency as waiver.

---

# 16. Research failure => generation blocked

Generation must stop if:
- exact subject/form cannot be verified;
- canon sources materially conflict and current SC authority does not resolve the conflict;
- count-sensitive anatomy cannot be established confidently;
- the requested form appears to be misidentified;
- current SC authority conflicts with the requested prompt in a way that changes identity;
- the only available evidence is low-quality fan interpretation.

Return the exact unresolved fact rather than gambling a generation.

Exception:
If Stephen explicitly defines the disputed feature as an intentional SC divergence, record that divergence and proceed under it.

---

# 17. Post-generation canon QA

After image generation, verify against both:
- the fresh research receipt;
- current SC visual authority.

Check:
- exact identity;
- era/form;
- count-sensitive anatomy;
- costume;
- markings;
- silhouette;
- SC divergence;
- prohibited contamination;
- card/portrait format;
- premium benchmark.

An attractive result that fails canon research is a failed asset.

**Beautiful wrong = failed.**

---

# 18. Failed-generation rule strengthened

Existing #138 limit remains:
- maximum two failed generation attempts per requested asset before stopping for diagnosis.

Additional rule:

If a failure is caused by a canon/anatomy mistake that proper research should have prevented:
- do not immediately regenerate;
- revisit the research receipt and prompt;
- identify the specific missed/incorrect fact;
- correct the prompt-preflight;
- only then use the next attempt.

Repeated generation without research correction is prohibited.

---

# 19. Research persistence / reuse

A durable research dossier may speed future work, but it does not eliminate the fresh verification requirement for canon-derived generation.

Future work may:
- reuse the existing dossier;
- verify that the relevant canon facts remain correct/current;
- focus fresh research on the exact requested form/feature.

This prevents full re-research from becoming bloated while still proving the workspace actually checked before generation.

---

# 20. Explicit Seven-Tails failure lesson

The current trigger case is the Seven-Tails / Chōmei visual work.

Stephen explicitly instructed the workspace to research before generating because repeated output was failing the exact seven-tail requirement.

The visual workspace generated without performing a substantive research pass first.

That is now classified as a **process failure**, regardless of whether the resulting art looked attractive.

Future Seven-Tails / Chōmei generation must verify before image generation at minimum:
- Chōmei / Seven-Tails identity;
- canon insectoid anatomy;
- wing/tail distinction;
- exact seven-tail representation;
- relevant colour/body/silhouette anchors;
- numbered-beast vs Chōmei presentation under current SC authority.

Do not rely on the phrase “Seven-Tails” as sufficient anatomical research.

---

# 21. Compliance statuses

Before generation, internal status must be one of:

- **RESEARCH GREEN — GENERATION PREFLIGHT MAY PROCEED**
- **RESEARCH AMBER — EXACT FACT UNRESOLVED / GENERATION BLOCKED**
- **RESEARCH RED — SOURCE CONFLICT OR IDENTITY ERROR / GENERATION BLOCKED**

There is no:
- “probably fine”;
- “memory sufficient”;
- “prompt detailed enough”
state.

---

# 22. Auditability

When a visual later fails identity/anatomy review, the workspace must be able to answer:

- what sources were checked;
- what canon facts were extracted;
- what SC divergence was applied;
- how those facts entered the prompt;
- why the generated result was accepted/rejected.

If it cannot answer those questions, the research gate was not satisfied.

---

# 23. Supersession / relationship to existing rules

This contract:

- **extends #134** by making fresh same-task web research mandatory for canon-derived Character Creation generation;
- **extends #138** by adding source verification before prompt geometry;
- **extends #207** by adding research fidelity as a prerequisite to premium benchmark quality;
- **extends #231** by changing:

`READ LIVE RULES FIRST -> PREFLIGHT -> GENERATE`

to:

`READ LIVE RULES -> FRESH CANON RESEARCH -> RESEARCH RECEIPT -> PREFLIGHT -> GENERATE`.

Existing image lock, Menma benchmark, card/portrait separation, series differentiation, two-failure limit and exact SC representation authority remain in force.

---

# 24. Canonical lock

> **Character Creation / Visuals may not generate or materially edit a canon-derived Shinobi Chronicles visual from memory, Project memory, GitHub prompts or prior generations alone. Every canon-derived generation requires a fresh same-task web research pass, a concrete research receipt, exact-form verification, count-sensitive anatomy verification where relevant, reconciliation with current SC divergence, and prompt traceability before the image call. If the research cannot establish the subject confidently, generation is blocked. `generate now` authorises generation only after these gates are GREEN.**
