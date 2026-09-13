# Shinobi Chronicles — Origin Prologue Screen-First Scene Performance Rewrite v2

**Date:** 2026-09-13  
**Owner:** Writing — Konoha  
**Source issue:** #170  
**Status:** **ACTIVE WRITING AUTHORITY — ORIGIN PERFORMANCE REWRITE IN PROGRESS; KAKASHI REWRITE CLOSED; OTHER NINE ORIGINS REMAIN OPEN**

## 1. Why v2 exists

Live installed-browser screenshots from Stephen proved that the first Origin modernization pass improved wording but did not yet achieve the Story quality established later in Arc 2 / Arc 3.

The remaining defect is not primarily vocabulary. It is **scene performance**.

Current early Origin text still too often:

- explains what a scene means instead of letting the scene happen;
- uses abstract nouns where a person could move, look, hesitate, interrupt or react;
- gives one block of narration, one choice block, one block of narration, producing a mechanical cadence;
- underuses contractions in spoken dialogue;
- underuses facial expression, posture, gesture, silence and spatial behaviour;
- underuses reaction beats after player choices;
- turns evaluators/instructors into exposition devices;
- asks the player what the protagonist “thinks” in abstract language rather than presenting an immediate human response;
- has strong semantic choices but weak dramatic framing around those choices.

Canonical screen-first rule:

> **The player should feel that a scene is happening in front of them, not that the game is summarising a design document about what happened.**

Preserve:

> **Expression may become richer without changing factual history.**

---

# 2. Screen-first writing standard

Every Origin rewrite should use a compact mixture of:

- **physical action** — turning, pausing, gripping, stepping, leaning, glancing, flinching, breathing, setting something down;
- **facial reaction** — narrowed eyes, a glance held too long, jaw tightening, a brief smile, embarrassment, uncertainty;
- **spoken cadence** — contractions, fragments, interruptions and character-specific sentence length;
- **subtext** — characters do not explain everything they feel;
- **environmental response** — dust, rain, paper, stone, crowd movement, training noise, silence after a line;
- **reaction to choice** — the world visibly answers what the player just did;
- **bounded narration** — describe what can be observed rather than explaining system intent;
- **choice timing** — present choices at moments where the protagonist genuinely has to decide, not after every sentence.

Avoid overcorrecting into prose bloat. A production Story card should normally contain one strong visual/emotional beat, not a novel paragraph.

## Dialogue rule

Spoken lines should normally sound spoken.

Prefer:
- `I don't know.`
- `That's not what I said.`
- `You're late.`
- `You saw him take it?`

over formal explanatory forms unless that character genuinely speaks formally.

## Narration rule

Avoid phrases like:

- `the retrieval fractures into three problems`;
- `the exercise separates physical protection from identity verification`;
- `the debrief separates package disposition and retrieval intelligence`;
- `the instructor evaluates what was demonstrated`.

Those are designer summaries.

Instead dramatize the facts through what the character sees, what somebody says, and what physically remains after the choice.

---

# 3. Canon-first Kakashi voice anchor

Official Naruto material confirms that Kakashi was already an exceptional Academy prodigy and advanced through the shinobi ranks extraordinarily young. Sakumo was an accomplished shinobi and formative influence. Shinobi Chronicles diverges by preserving living Sakumo in this Origin and by keeping Academy Kakashi pre-Sharingan and pre-Chidori.

For this scene Kakashi should read as:

- unnervingly observant for his age;
- concise;
- controlled rather than emotionless;
- confident enough not to narrate his own cleverness;
- interested in proof and responsibility because he notices operational detail, not because a narrator explains those themes;
- young enough that Sakumo can still read what he will not say aloud.

Do not write adult Copy-Ninja cynicism into Academy Kakashi.

---

# 4. `academy_kakashi` — exact v2 screen-first replacement package

**Scene ID remains unchanged.**  
**Choice IDs remain unchanged.**  
**Consequence/source-occurrence/Battle boundaries remain unchanged.**  
**Only player-facing presentation is replaced.**

## Beat `kak_brief`

**ACADEMY EVALUATOR**

The evaluator sets a sealed packet on the table between them, then slides it into the hands of a waiting logistics clerk.

> “Recover it.”

Kakashi looks from the packet to the clerk, then back to the evaluator.

The evaluator raises one finger.

> “And Kakashi? Bring me what you can prove. Not what you guessed correctly.”

`CONTINUE`

---

## Beat `kak_clerk`

The clerk leaves the Academy quarter and folds into the morning market traffic.

Kakashi keeps far enough back that the man never sees him directly. Even so, the clerk checks the same shop-window reflection twice and keeps one hand close to the sealed packet.

Nervous.

Or trained.

Kakashi does not need to decide which yet.

**Choices — semantic IDs unchanged:**

- `shadow_the_clerk` → **Stay out of sight. See who takes the packet.**
- `question_the_clerk` → **Step in now. Make him explain the route.**
- `cut_ahead` → **Cut ahead. Be where the packet is going.**

---

## Beat `kak_exchange` — shadow route

The clerk stops beside a produce stall without looking at it.

A second man reaches past him for a basket.

For less than a second, both hands disappear behind hanging cloth.

When they separate, the clerk's sleeve sits flat.

The other man's does not.

Kakashi's eye follows the new weight under the broker's arm.

Across the lane, somebody else starts moving toward him too quickly to be a shopper.

And farther ahead, a third figure breaks from the crowd carrying a package that looks exactly right from a distance.

`CONTINUE`

### `question_the_clerk` variant

Kakashi steps into the clerk's path.

The man's surprise is good. His answer is better—too quick, too complete, and just vague enough around the destination.

Then his eyes flick once past Kakashi's shoulder.

Kakashi turns only after the clerk does.

A man is already moving through the crowd toward them. Another figure farther ahead breaks away with what looks like the sealed packet.

The clerk has given Kakashi information.

He has not given him certainty.

`CONTINUE`

### `cut_ahead` variant

Kakashi leaves the clerk behind and takes the roofs for two blocks.

He reaches the likely transfer lane first.

That means he sees the problem before he understands the whole chain: one man carrying something under his sleeve, another moving toward Kakashi with the deliberate pace of someone who has already chosen violence, and a third figure slipping away with an obvious packet.

Kakashi knows where the packet *might* be.

He does not pretend he saw how it got there.

`CONTINUE`

---

## Beat `kak_choice`

The man approaching Kakashi shifts his shoulder and frees his weapon hand.

The apparent carrier is almost at the corner.

The broker stays where he is, one arm tight against his side.

Three problems.

Only one of them can get Kakashi's full attention first.

**Choices — semantic IDs unchanged:**

- `secure_package` → **Stay on the confirmed packet. Take it from the broker.**
- `fight_assassin` → **Stop the assassin first.**
- `pursue_apparent_carrier` → **Follow the apparent carrier before he disappears.**

The unavailable Battle branch may still show the current fail-closed implementation note in developer/debug presentation, but that note is **not Story dialogue/narration** and should not visually compete with authored prose in release presentation.

---

## Beat `kak_debrief`

### If packet secured / witnessed transfer

The packet lands on the evaluator's table with a soft wooden knock.

The evaluator does not touch it.

> “Start from the clerk.”

Kakashi does.

No embellishment. No theory presented as fact. He describes the repeated reflection check, the covered handoff, the broker's sleeve and the moment he chose the packet over the other moving threats.

The evaluator finally looks down at the seal.

> “So you saw the transfer.”

Kakashi gives a small nod.

> “Yes.”

> “And the other carrier?”

A pause.

> “Looked right.”

The evaluator's mouth shifts—not quite a smile.

> “Good. You know the difference.”

`CONTINUE`

### If mixed intelligence / other legal non-Battle route

The chair across from the evaluator stays empty. Kakashi remains standing.

The evaluator lets him finish, then taps one finger against the tabletop.

> “What did you actually see?”

Kakashi's eyes narrow slightly.

He starts again.

This time he leaves out every conclusion he cannot support.

`CONTINUE`

The exact factual package disposition/intelligence/custody result still comes from the existing committed consequence request. This prose does not fabricate custody.

---

## Beat `kak_reflect`

The evaluator closes the file.

> “You made one decision that mattered more than the rest.”

Kakashi says nothing.

> “Which one?”

For the first time since the exercise ended, he looks away from the packet.

**Choices — IDs unchanged:**

- `objective` → **“The objective. Everything else was noise.”**
- `proof` → **“Knowing what I could prove.”**
- `responsibility` → **“Deciding which problem was actually mine.”**

The selected line may be projected as **KAKASHI dialogue**, not a detached narration card.

---

## Beat `kak_sakumo`

Evening has settled by the time Kakashi gets home.

Sakumo is at the table with one cup of tea and a second cup already poured.

Kakashi takes off his sandals, sets his Academy pouch down and sits without touching the tea.

Sakumo watches him for a few seconds.

> “Bad mission?”

Kakashi's brow tightens.

> “Assessment.”

> “Mm.”

Sakumo takes a drink.

> “Bad assessment?”

Kakashi finally reaches for the cup.

Depending on the reflection choice, use one short continuation:

### Objective

> **KAKASHI:** “I completed the objective.”

Sakumo's eyes crease slightly at the corners.

> **SAKUMO:** “That's not what I asked.”

Kakashi looks down into the tea.

### Proof

> **KAKASHI:** “I was right about one thing I couldn't prove.”

> **SAKUMO:** “Annoying, isn't it?”

Kakashi gives him a flat look.

Sakumo smiles into his cup.

### Responsibility

> **KAKASHI:** “There were three things happening. I could only take one.”

Sakumo's expression loses its humour.

> **SAKUMO:** “That part doesn't get easier.”

Kakashi looks at him properly then.

End scene.

No permanent Trait/personality result is created. The selected reflection remains the existing bounded Origin interpretation only.

---

# 5. Why this is the new benchmark

The Kakashi v2 package deliberately uses the same semantic spine as the current runtime but changes how it **feels** on screen:

- the evaluator physically handles the packet;
- Kakashi notices behaviour rather than narration calling him analytical;
- the transfer is shown rather than summarised;
- danger enters through movement in the market;
- choice pressure is visible rather than described abstractly;
- the debrief uses dialogue and pauses instead of a design-summary sentence;
- Kakashi's reflection is spoken in his voice;
- Sakumo gives the Origin an actual human ending and relationship beat;
- contractions and conversational rhythm appear where natural;
- facial/postural response exists without becoming purple prose.

This is the quality target for the remaining nine Origins.

---

# 6. Remaining Origin rewrite order

The following remain **OPEN under #170** and require equivalent exact player-facing replacement packages:

1. `academy_hinata`
2. `academy_izuno`
3. `academy_mirai`
4. `academy_menma`
5. `academy_kushina`
6. `academy_kurenai`
7. `academy_iwabee`
8. `academy_metal_lee`
9. `academy_obito`

Recommended production order after Kakashi:

**Obito → Kushina → Hinata → Mirai → Wasabi → Iwabee → Metal → Kurenai → Menma**

Reason: first validate the screen-first form across very different personalities before touching Menma, whose later-character continuity makes over-modernization particularly risky.

---

# 7. Completion gate for #170

Do **not** close #170 again until:

- all 10 Origins have exact screen-first replacement packages or a documented `already meets benchmark` verdict;
- live runtime consumes those packages;
- at least one installed-browser traversal per Origin confirms the prose actually reads naturally in the Story modal;
- no exposed semantic/guardrail text appears as Story narration;
- named-character dialogue is recognisably character-specific;
- body language/facial reaction/action beats are present where useful but not bloated;
- choices arrive at genuine decision moments;
- no semantic IDs, consequence rows, Battle contracts, Knowledge or Progression facts drift.

Writing approval != Coding implementation != browser Golden.
