# Shinobi Chronicles — Early-Game Origin + Arc 1 Player-Facing Writing Modernization

**Date:** 2026-09-13  
**Owner:** Writing — Konoha  
**Source issue:** #170  
**Status:** **FINAL WRITING MODERNIZATION AUTHORITY — 10/10 ORIGINS + ARC 1 M1–M12 REVIEWED; SEMANTICS/HISTORY UNCHANGED; CODING/CE CONSUMPTION SEPARATE**

## 1. Purpose

The earliest Shinobi Chronicles Origin and Arc-1 writing predates the project's current standards for character voice, personality, natural dialogue, scene physicality, NPC autonomy, concise cinematic pacing, meaningful player decisions and canon-first characterisation.

This package closes the Writing quality pass requested by #170.

It is an **expression modernization only**.

Preserve:

> **Story semantics closed != prose quality frozen.**

> **Rewrite expression != rewrite history.**

No Mission fact, World Truth, Knowledge fact, relationship occurrence, Battle result/caller, Rank, PL, Skill, Progression, ownership, reward, Origin consequence row, Echo/Kurama/False-Identity semantic, Mission completion condition or 12×12 structure is changed by this document.

Where current runtime exposes internal guardrail language such as `No personality or alignment label is assigned`, `No Speed/Agility stat ... is created`, `the debrief separates ...`, or similar system-facing wording, that language is **not production Story prose** and must be removed from the player-facing surface.

---

# 2. Current voice standard consumed

The final target is the later Arc-2 / Arc-3 Story standard:

- cinematic but compact;
- physical reactions and environmental grounding;
- one character does not sound like another;
- humour only where personality/history supports it;
- NPCs possess their own intent;
- player intent does not command the party;
- important decisions breathe; trivial connective actions do not demand a button;
- exposition should normally emerge from action, evidence, disagreement or a character who has a reason to explain it;
- observer Knowledge remains bounded;
- internal implementation language never appears as narration.

Canonical rule:

> **Player agency requires meaningful decisions, not constant decisions.**

Character test:

> **If several named characters' dialogue can be swapped without noticeably changing the scene, characterisation has failed.**

---

# 3. Canon-first voice anchors

Current official Naruto material was rechecked before this pass.

## Hinata Hyūga

Baseline anchor: shy, low-profile, burdened by Hyūga expectations, but persistent and capable of acting through fear rather than being defined by passivity.

SC expression: soft-spoken does not mean vague. When Hinata has observed something with Byakugan or made up her mind, she can state it precisely.

## Kushina Uzumaki

Baseline anchor: assertive, proud, blunt, physically decisive, resistant to being underestimated; outward fire can coexist with anxiety and uncertainty.

SC expression: immediate, forceful, technically engaged where seals are involved; protective without becoming saintly.

## Kakashi Hatake

Baseline anchor: prodigious, highly analytical and already unusually capable as a child. SC divergence preserves living Sakumo, no Sharingan and no Chidori.

SC expression: economical, observant, slightly aloof; dry only when *Kakashi* would be dry, not because the project has a dry-house voice.

## Obito Uchiha

Baseline anchor: earnest, emotional, kind, ambitious, proud of being Uchiha, loudly determined to become Hokage.

SC expression: messy sincerity, frustration and hope. He is allowed to care visibly.

## Kurenai Yūhi

Baseline anchor: genjutsu specialist, composed and perceptive. Avoid reducing her to mystical riddles.

SC expression: deliberate, self-possessed, observant; understands deception as control of perception rather than vague philosophy.

## Mirai Sarutobi

SC-era interpretation must preserve current Origin premise rather than importing a future/adult Mirai wholesale. Voice should read conscientious, attentive and duty-aware, with enough self-possession to question a situation rather than merely obey.

## Wasabi Izuno

SC-era interpretation: energetic, practical, quick-reading and competitive without reducing her to a generic speedster. Tracking/prediction choices should feel instinctive and observational.

## Iwabee Yuino

SC-era interpretation: blunt, physically confident, easily irritated by evaluation systems that do not reflect what he values, but not stupid and not one-note anti-school comedy.

## Metal Lee

SC-era interpretation: earnest, disciplined and capable; public pressure changes performance, not underlying competence. Anxiety is situational rather than his only personality trait.

## Menma

Current SC voice remains binding: analytical, ambitious, literal, technically curious, confident/arrogant, dry/profane where appropriate, capable of deception and inconvenient questions. Do not make Academy Menma as dark or politically sophisticated as later Arc-3 Menma; the later person grows from this earlier one.

---

# 4. ORIGIN MODERNIZATION — 10/10 REVIEW

## 4.1 `academy_hinata`

### Current defect

The runtime structure is semantically sound but several beats are abstract UI-language:
- `Controlled spar. Choose the opening approach.`
- `The spar changes. Adapt.`
- `Decisive moment.`
- `The instructor evaluates what Hinata actually demonstrated...`

### Modernized presentation

Keep all existing semantic choice IDs and consequence bindings.

**`hin_practice` narration**

> Dawn has barely reached the Hyūga compound when Hinata's palms begin to sting. The same form. Again. Feet placed exactly where they were placed yesterday. The instructor watches her finish it without comment, then steps aside and calls another student forward.  
>  
> “Enough repetition. Show me what you do when the other person moves.”

**`hin_1` choice prompt**

> Her opponent settles into stance. Hinata can feel the familiar urge to wait until she is completely certain. The instructor is already watching.

Choice labels preserve intent but become:
- `attack_immediately` → **Move first. Don't give them the tempo.**
- `wait_for_opening` → **Let them show the opening.**
- `defensive_stance` → **Make them come through her guard.**
- `study_movement` → **Watch the shoulders and feet before committing.**

**`hin_2` prompt**

> The first exchange breaks the neat Academy rhythm. Her opponent adjusts. So does Hinata.

**`hin_3` prompt**

> One clean opening appears—and begins to close.

**`hin_eval` narration**

> The instructor does not praise the choice itself. They correct her footing, point out the moment she hesitated—or the moment she committed—and make her repeat the decisive exchange once. Hinata listens without looking away.

**`hin_young` narration**

> At the compound gate, a younger Hyūga student is still trying the same turn of the hip. They stop the instant they realise Hinata has noticed.

Choice labels:
- **Show them once. Slowly.**
- **Tell them where the movement is going wrong.**
- **Leave them the space to work it out.**
- **Stay long enough to see what they're missing.**

**`hin_end`** remains close to current line but sharpen to:

> **HINATA:** “Tomorrow... I'll do it cleaner.”

No new personality occurrence is created.

---

## 4.2 `academy_izuno` — Wasabi Izuno

### Current defect

The current scene often reads like a test specification rather than a chase.

### Modernized presentation

**`izu_start`**

> The Academy target gets a head start and vanishes into the village training routes. A flare at the extraction point marks the only thing Wasabi knows for certain: if it goes up before she gets there, she was too slow—or followed the wrong story.

**`izu_initial` prompt**

> The obvious trail is almost *too* obvious. Scuffed dirt points east. A snapped reed points toward the drainage path. Two other students are already arguing over which one matters.

Choices:
- **Take the trail at face value and move.**
- **Check what the environment says before trusting footprints.**
- **Use the other students instead of racing them.**
- **Forget the trail. Predict the extraction route.**

**`izu_split` prompt**

> A second set of signs appears and the pursuit stops being clean. Wasabi has enough information to commit—but not enough to know she is right.

**Rogue interruption**

> Another Academy student skids into view with a Rogue Genin crowding their escape. That is not part of the trial. The target is still moving.

Do not expose `This is a separate occurrence` to the player.

**`izu_eval` replacement**

> By the time the instructor calls the exercise, Wasabi has an answer—and a trail of reasons behind it. Whether she caught the target, found the false trail, helped another student or arrived seconds late, the instructor makes her account for what she actually saw rather than what she wanted the trail to mean.

**`izu_reflect`** remains a player interpretation seam, but labels become more Wasabi-specific:
- **Next time, commit faster.**
- **Next time, trust what I notice before what they leave for me.**
- **The obvious route is obvious for a reason—and that's the problem.**
- **Catching the target wasn't the only thing happening out there.**

Remove the current final system narration about Speed/Agility/morality/specialization. End on Wasabi physically re-entering the village route, already replaying the chase.

---

## 4.3 `academy_mirai`

### Current defect

Semantics are strong, but the current prose tells the player what the lesson is before the scene earns it.

### Modernized presentation

**`mir_start`**

> The escort begins badly only in hindsight. The civilian is polite, knows the route, thanks Mirai for walking on the road-side of the path and asks ordinary questions about the Academy. Nothing about them demands suspicion.

**`mir_talk`**

> Conversation fills the walk. Mirai asks something ordinary—not because she is interrogating them, but because silence for the whole escort would be strange.

Existing four semantic questions remain.

**`mir_inconsistent`**

> Later, one small detail refuses to fit. Then another. The route they said they used does not match the timing. A family detail comes back differently. Nothing proves anything yet. It is simply wrong enough to stay in Mirai's head.

Choice labels:
- **Stop them and ask directly.**
- **Ask again from a different angle.**
- **Act like she didn't notice. Watch what changes.**
- **Change the route without warning and see how they react.**

**`mir_deeper`**

> Suspicion has become a pattern. It still is not proof.

**`mir_checkpoint`**

> At the checkpoint the transformation releases. The person Mirai protected is still standing exactly where she delivered them—safe, cooperative and not the person she thought she was escorting. For one ugly second, both facts are true at once.

**`mir_verified`**

> Mirai never accuses them. She changes one question, then one route detail, then watches the answer arrive half a beat too late. By the time she acts, she has enough to expose the substitution without pretending she knows who is underneath it.

**Instructor closing line**

Replace stiff lesson with:

> **INSTRUCTOR:** “You kept your client alive.”  
> The instructor lets that sit for a moment.  
> **INSTRUCTOR:** “Next time, make sure the client is the person you were assigned.”

---

## 4.4 `academy_menma`

### Review verdict

Menma's pre-existing Origin remains structurally authoritative and is already the closest early Origin to the later SC characterisation because it was repeatedly consumed by later Menma/Kurama work.

**No Story restructuring is authorised by #170.**

Modernization requirements for the current Menma Origin presentation:

- remove any system-facing explanation of stat/capability legality from narration;
- keep Academy Menma younger and less politically hardened than Arc-2/3 Menma;
- allow dry technical curiosity and inconvenient questions, but do not make every line a joke;
- Kurama, if heard internally in the exact existing Origin authority, must remain proud/sardonic and must not become tutorial narration;
- replace generic choice verbs with Menma-intent wording while keeping semantic IDs stable;
- preserve the exact existing Battle/tutorial caller and current five-action Alpha Combat palette;
- no automatic Kurama relationship/cooperation rewrite;
- no later Echo/False-Identity knowledge may leak backward into Origin Menma.

Any existing Menma line that already meets those criteria is intentionally unchanged.

This row is therefore **REVIEWED / SELECTIVE MODERNIZATION**, not missing authoring.

---

## 4.5 `academy_kushina`

Issue #169 already closed the largest quality defect and is incorporated here.

Durable authority:
`Documentation/Story/Academy_Kushina_Ordinary_Branch_Production_Endings_and_Setting_2026-09-13.md`

Preserve the new courtyard setting and branch-specific endings.

Further #170 expression replacements:

**Opening crisis**

Replace:
> `An Academy sealing exercise destabilises around another student. Choose a response to the unstable formula.`

with:

> The practice formula should have gone dark three strokes ago. Instead, chakra crawls past the boundary line and snaps across the courtyard stone toward the student kneeling beside it. The instructor moves—but Kushina is closer.

Choice labels:
- **Fix the formula before it tears itself apart.**
- **Get the student out first.**
- **Close the broken boundary around the leak.**
- **Move the damned scroll somewhere empty.**

Gerotora branch remains semantically unchanged; current closing exchange remains strong and should be retained.

---

## 4.6 `academy_kurenai`

### Current defect

Current beats sound like nested UI instructions (`Choose the first deception layer`, `The instructor reacts to the false image`, etc.).

### Modernized presentation

**Opening**

> A brass bell hangs from the instructor's belt. No weapons. No spectators. One rule.  
>  
> **INSTRUCTOR:** “Take it.”

**Layer-one prompt**

> Kurenai watches the instructor's eyes instead of the bell. If he believes the first lie, the second one will not need to be bigger—only better placed.

Choice labels keep existing IDs:
- **Give him a Kurenai he can see.**
- **Hide the real movement behind the obvious one.**
- **Make distance lie.**
- **Let him believe she came straight at him.**

Branch prompts should describe the instructor's *perception* rather than system state.

Replace `kur_result` system narration with:

> The illusion peels away in the order Kurenai built it. For a moment the courtyard contains the bell, the instructor, and the version of the exchange he thought happened. Then only the real positions remain.

Replace closing line with:

> **INSTRUCTOR:** “Genjutsu isn't making someone see something strange.”  
> He turns the bell once between two fingers.  
> **INSTRUCTOR:** “It's deciding which part of reality they stop checking.”

---

## 4.7 `academy_iwabee`

### Modernized presentation

**Opening**

> Half the training ground has slumped after a failed Earth Release exercise. One lane is cracked, one wall is leaning and everyone has spent five minutes explaining why it is somebody else's fault. The instructor points at the mess.  
>  
> **INSTRUCTOR:** “Make it usable.”

**Reshape prompt**

> Iwabee looks at the ground once. Written tests take him forever. This does not.

Keep semantic terrain choices.

**Rogue reveal**

> Stone shifts. Something underneath the collapsed edge shifts with it. A Genin in travel-stained gear rolls out of the newly exposed hollow and freezes when he sees the Academy group. He was hiding here. He was not part of the lesson.

Remove explicit `The Rogue was not part of the Academy exercise` system phrasing; the scene makes it obvious.

**Instructor evaluation sequence**

Keep:
> **INSTRUCTOR:** “You know what your problem is, Iwabee?”  
> **IWABEE:** “Yeah. Written tests.”

Keep instructor rebuttal because it is characterful:
> **INSTRUCTOR:** “No. You keep acting like the only things that count are the things you're bad at.”

Remove final system narration. End on Iwabee looking back at the repaired ground and the consequences of whichever Rogue response actually occurred.

---

## 4.8 `academy_metal_lee`

### Current defect

The current source correctly separates private capability from pressured performance, but repeatedly states that semantic distinction to the player instead of dramatising it.

### Modernized presentation

**Private training**

> Metal is good when nobody is watching. His feet land where he wants them. His breathing stays measured. The training post shudders on the final strike and Metal immediately resets his stance to do it again.  
>  
> Then someone claps from behind him.

Do not narrate `later public performance cannot erase earlier evidence`; that remains runtime semantics only.

**Genin invitation**

> The Genin who saw him grins like the answer is obvious.  
> **GENIN:** “Again.”

Choices preserve Spar / Demonstrate / Back Out semantics.

**Pressure deterioration**

> The next combination starts clean. Then Metal notices the eyes on him. His shoulder tightens. His heel lands a fraction too wide. The dummy jerks off-line hard enough to become a real problem for the student beside it.

**Protective response prompt**

> Embarrassment can wait. The dummy cannot.

Remove all player-facing explanation such as `Contextual performance is not underlying capability` and final no-trait/no-morality system statements.

Closing reflection should focus on Metal's interpretation of the day, not a rules explanation.

---

## 4.9 `academy_kakashi`

### Current defect

Strong semantics; weakest beats are debrief/system explanations and a generic reflection menu.

### Modernized presentation

**Opening evaluator** — retain current line; it is good:
> **ACADEMY EVALUATOR:** “Recover the packet. Bring back what you can prove, not what you assume.”

**Clerk observation prompt**

> The logistics clerk keeps one hand near the sealed packet and checks the same reflection twice while crossing the market lane. Either he is nervous or he knows someone is following him. Kakashi does not need to decide which yet.

Keep current three semantic options, wording sharpened:
- **Stay invisible. Watch who receives it.**
- **Step in now and force the route into the open.**
- **Cut ahead. Be where the packet is going.**

**Competing responsibility prompt**

> Then the retrieval fractures into three problems at once: a confirmed packet, an assassin creating pressure and an apparent carrier moving away. Kakashi can pursue all three badly or choose which fact matters most.

**`kak_debrief` replacement**

> The evaluator makes Kakashi reconstruct the operation in order: what he saw, what he inferred, where the packet actually went, and what was lost when he chose one responsibility over another. Nobody gives him credit for information he never witnessed.

**Reflection**

Choices become:
- **The objective mattered. Everything else was noise.**
- **Proof mattered. Guessing correctly is still guessing.**
- **The hard part was deciding which responsibility was actually mine.**

**Sakumo end beat**

> Sakumo is at the Hatake threshold when Kakashi gets home. He takes one look at his son's face and does not ask whether he passed.  
>  
> **SAKUMO:** “You picked one.”  
>  
> Kakashi's eyes narrow slightly.  
>  
> **KAKASHI:** “I had to.”  
>  
> **SAKUMO:** “That's usually when the choice matters.”

This preserves living-Sakumo SC history and does not import canon Sakumo death psychology.

---

## 4.10 `academy_obito`

### Current defect

The five-diversion structure is good Chronicle material, but the current source repeatedly explains delay/entitlement mechanics directly to the player.

### Modernized presentation

**Departure**

> Obito leaves early. Deliberately early. Today is one of the sessions that matters—the kind where nobody can say he only talks about becoming Hokage.  
>  
> He makes it three streets before somebody needs something.

Each diversion should remain factual and independent. Keep existing response semantics but characterise labels:

Furniture:
- **“Hang on. I'll get the other end.”**
- **Brace it, free the doorway, keep moving.**
- **Keep going. Training starts whether he's there or not.**

Vegetables:
- **Get every last one before the carts crush them.**
- **Clear the lane fast, then run.**
- **Keep moving. Somebody else can stop.**

Equipment:
- **Help search until it's found.**
- **Check the obvious drop points on his route.**
- **Academy staff can handle Academy equipment. Keep going.**

Delivery:
- **Right the cart and rebuild the load.**
- **Clear the dangerous obstruction and move.**
- **Go around.**

Runaway cart:
- **Stop it.**
- **Get everyone out of its path.**
- **Keep moving.**

**Arrival**

Remove all player-facing authority language about `FULL`, qualitative delay labels and fail-closed derivation. Runtime may still use those semantics.

Direct/no-delay route narration:

> Obito hits the training approach breathing hard but on time. For once, there is nobody to blame, nobody to wait for and no excuse to make. The whole session is still ahead of him.

Delayed route presentation should truthfully describe that he arrives after helping/acting, while runtime separately determines what training remains available. If exact entitlement is unresolved, show the available authored training content rather than an implementation note.

**Training**

Do not narrate `Progression authority owns the resulting stat receipt.` Show the blocks as actual training:
- conditioning until his legs burn;
- weapon fundamentals until grip/angle stop slipping;
- Academy-scale Fire/Ninjutsu fundamentals;
- Taijutsu closing drill.

**Final reflection** remains four-way but modernize labels:
- **“I'm still becoming Hokage.”**
- **“Next time I get here faster.”**
- **“They mattered too.”**
- **“Fine. I'll prove it again.”**

Remove final system narration about help-count, morality and Traits.

---

# 5. ARC 1 M1–M12 MODERNIZATION PASS

Arc 1's factual skeleton remains closed. This section publishes the current production **expression standard and mandatory player-facing replacements** for each Mission. Coding/CE may realise additional contextual lines from legitimate state, but must not regress into system-note narration.

## M1 — WHISPER WOODS

### Tone

First real field danger. The player should feel that an apparently small smuggling/caravan investigation has stepped into something above fresh-Academy expectations.

### Major-contact entry

> The forest goes quiet before anyone says they are being watched. Not empty—quiet. A second set of movement stops beyond the wounded smuggler's line of sight.  
>  
> The Rogue Shinobi notices it too. His hand moves toward a weapon.  
>  
> A man steps out where none of them expected anyone to be standing.

Observer label remains **UNKNOWN OPERATIVE** until legitimate reveal.

The wrist-break beat should be quick and physical, not narrated as a mechanic:

> The Rogue lunges. The stranger catches the wrist, turns once and the crack is small enough to be worse than shouting. The Rogue hits one knee with the hand already swelling.

Do not explain `fractured_wrist` in prose.

### Resolution choices

Keep semantic Kill / Detain / Release but present as intent:
- **“You're not leaving.” — Detain him.**
- **End the threat here. — Commit to lethal force.**
- **Let him walk. Remember his face.**

NPC intent must surface before protagonist commitment where perceivable.

No party hive reaction.

---

## M2 — WAREHOUSE

### Tone

Investigation becomes system-wide. Discovery should feel like finding four doors at once, not reading a quest log.

### Ledger discovery

> The ledger is boring until it isn't. Supply numbers. Shift marks. Receiver codes. Then the same four headings begin repeating beside transfers that should have nothing to do with one another:  
> **ACADEMY. HOSPITAL. BARRIER. ARCHIVE.**  
>  
> Four places. One pattern. Not yet one owner.

If Sarutobi logistics involvement is observed, characters may react to *the evidence actually present*. Do not narrate clan guilt.

### Dangerous purge branch

Before player choice, an NPC who perceives the risk may object/advise in their own voice.

Menma-style protagonist choice wording where applicable:
- **Stop it. Preserve what we already have.**
- **Let it run long enough to see what it destroys.**
- **Contain the output and record the process.** where capability permits.

No generic `Observe purge` button if richer wording can preserve the same semantic intent.

---

## M3 — HOSPITAL

### Tone

Clinical setting with moral discomfort: people and reference material are beginning to blur together.

### Reference discovery

> The sample case has the clean anonymity of hospital storage—labels, dates, nothing personal enough to slow anyone down. That is exactly why the recognition data matters.

If Menma retains/steals the case, teammates may object or assist independently. Nobody should say `this grants reference material`.

### Med-nin communication

Dialogue must remain testimony. Suggested register:

> **MED-NIN:** “I handled samples. I didn't design what they were for.”  
> A pause.  
> **MED-NIN:** “And before you ask—those are not the same sentence.”

Use only if consistent with exact current testimony; otherwise preserve factual envelope and voice pattern.

---

## M4 — BARRIER

### Tone

Technical discovery should feel physical and invasive when the protagonist becomes a body-inscribed receiver.

### Relay Four

> Relay Four answers correctly right up until someone asks it the wrong question. Then the seal-work hesitates—as if the barrier knows the shape of an identity better than it knows the person wearing it.

### Receiver route

If Menma/current eligible protagonist accepts:

> The first line burns cold. The second feels like pressure under the skin. By the third, the barrier is no longer reading something *held* by Menma. It is reading Menma as part of the circuit.

NPC concern/technical curiosity must be character-specific.

Do not call the event `bodyInscribedReceiverEstablished` in player-facing prose.

---

## M5 — ACADEMY / THIRD BELL

### Tone

A familiar place becomes compromised. The Academy should feel wrong because it is familiar.

### Female Operator confrontation

The persistent woman is now Story-authority **Shiori Kuroda**, but observer presentation remains unnamed until legitimate identity Knowledge exists.

Pre-reveal player-facing label remains an observer-safe form such as **FEMALE OPERATOR / UNKNOWN OPERATIVE** according to current presentation authority.

Opening:

> The Academy should have smelled like chalk, wood and old paper. Instead there is hot seal-ink in the corridor and a woman standing where the calibration line disappears into the floor. She does not look surprised to see them. That is the first bad sign.

### Calibration / Third Bell

> The redirected pattern reaches the Third Bell. For one suspended second, nothing happens.  
>  
> Then the bell accepts the answer.

Let characters react before explaining implications.

Menma, where history supports it:
> **MENMA:** “...It believed me.”

A technically minded ally may answer differently; do not force shared interpretation.

---

## M6 — ARCHIVE

### Tone

Breakthrough Mission. This is where scattered observations become something Menma can deliberately build.

### Archive understanding

> The Archive does not teach Menma how to become someone else. It teaches him something more useful: how trusted systems decide that a changed answer is still legitimate.

Then ground it in discovered history:

> Hospital gave him reference material. Relay Four showed him how recognition reads a body. The Third Bell proved that one trusted system can persuade another. The Archive gives him the missing part—the rule connecting them.

### Identity Rebinding creation

Avoid miraculous montage. Show work, failure and commitment.

> Menma ruins the first draft. The second is worse. The third stops behaving like disguise work and starts behaving like a declaration.  
>  
> Not *I look like this.*  
>  
> *For this system, this answer counts.*

If the body-inscribed route becomes `Cipher Menma`, presentation may acknowledge the changed state without treating it as a new person.

---

## M7 — THE DEAD TRANSFER

### Tone

The Arc turns from conspiracy/investigation into intimate body/agency horror.

### Transfer site

> The black tube is smaller than Menma expected. That somehow makes it worse. Nothing about it looks large enough to hold a life—only large enough to make moving one easier.

### Carrier acceptance choice

Do not phrase as `Accept transfer` alone.

Where player is Menma:
- **“Put it in me.” — Accept the transfer deliberately.**
- **No. Find another way.**
- contextual alternatives only where authoritative.

### Attachment

> The carrier does not settle like a seal. It moves. A tiny pressure threads itself through Menma's chakra network, recoils from something deeper inside him, then anchors somewhere it apparently chose on its own.

Kurama reaction, if perceivable and legitimate, must be Kurama's voice—not tutorial explanation.

### Sanitisation activation

> A line of text burns across the active seal array:  
> **CHAIN SANITISATION ACTIVE.**  
>  
> Somewhere above them, three separate sets of footsteps change direction.

---

## M8 — THE SANITISATION CHAIN

### Tone

Investigation after escalation. The network is now cleaning itself because the protagonist touched it.

### White-thread evidence

> White thread appears wherever paperwork has been made to look ordinary after something stopped being ordinary.

### Moroboshi signature

> The same name sits under more than one reassignment. **DAICHI MOROBOSHI.** Not a mastermind. Not yet even a suspect. A person who signed the paper often enough to become a direction.

Avoid `sponsor trail established` language.

---

## M9 — ASHES OF THE CHAIN

### Tone

Consequences, not a duplicate Battle.

Opening must consume factual persisted outcomes:

> By morning, the fight is over. What remains is less satisfying: whatever the sanitisation team destroyed, whatever they failed to reach, and whatever the surviving participants can still tell them.

Dynamic prose should name only factual Sealer/Breacher/Warden outcomes from runtime.

### Cleanup

> Some chakra traces are simply gone. That does not erase the fact that they were seen before they vanished.

This is the player-facing way to preserve history != current evidence without an engine lecture.

---

## M10 — BENEATH THE VETERINARY WARD

### Tone

Claustrophobic discovery and human cost.

### Entry

> The service tunnel was built for water and maintenance crews, not shinobi. Everyone has to turn sideways at the same cracked section. The carrier becomes restless before the air changes.

### Hinata observation

Where Hinata is present and legitimately uses Byakugan:

> Hinata stops so suddenly the person behind her nearly walks into her.  
>  
> **HINATA:** “Six.”  
> She swallows. Her Byakugan does not drop.  
> **HINATA:** “Four alive.”

If current factual count differs, CE contextualises the exact values. Do not turn her observation into treatment Knowledge.

### Transfer operator testimony

Deliver information under pressure, not as a database dump. The operator can break it across questions/reactions:

> **TRANSFER OPERATOR:** “They carry state.”  
> **MENMA:** “Meaning?”  
> **TRANSFER OPERATOR:** “Chakra pattern. Recognition. Adaptation. What the host teaches them just by surviving inside them.”

Later:

> **TRANSFER OPERATOR:** “Twenty-seven transfers. Nine survived the first attachment.”

Later:

> **TRANSFER OPERATOR:** “Recall brings the learned state back.”

Characters may infer; testimony remains testimony.

---

## M11 — THE MAN WHO SIGNED THE NIGHT SHIFT

### Tone

Morally compromised ordinary man → compromised internal channel → precise trap → Recall experiment.

### Moroboshi

Keep locked line:
> **MOROBOSHI:** “I'm forty-eight. My knees hurt when it rains.”

His confession should not flatten him into victim or villain.

Suggested sequencing:

> **MOROBOSHI:** “The first signature was fear.”  
> He looks at his own hands.  
> **MOROBOSHI:** “The later ones weren't.”

Use only if compatible with the exact closed confession facts; semantic point is that coercion and later paid complicity coexist.

### Kagawa

Mizue Kagawa remains sharp, professional and unwilling to pretend her choices were clean.

Keep:
> **MOROBOSHI:** “You used me.”  
> **KAGAWA:** “Yes.”

Do not soften that line with explanation immediately afterward.

### Recall experiment

When Menma chooses **Try it**, frame the choice as dangerous curiosity:

> **MENMA:** “Let it touch the route.”  
> Anko looks at him.  
> **ANKO:** “That sentence is exactly why you're a pain in my ass.”

Only use if Anko is present and current relationship/voice supports it; otherwise preserve the beat with another autonomous objection.

During Recognition Substitution:

> The system asks for the host state it expects. Menma gives it an answer it recognises.  
>  
> **MENMA NORMAL. NO CARRIER.**  
>  
> The lie is not in the words. The lie is that the system believes those words belong there.

Carrier refusal remains an autonomous entity choice, not obedience.

### Lower chamber

Keep locked beats:
> **HINATA:** “There's someone down there.”

> **KAGAWA:** “I know what that chamber was built to contain.”  
> **ANKO:** “What?”  
> **KAGAWA:** “Not what.”  
> **KAGAWA:** “Who.”

and:
> **KAGAWA:** “There was a better host.”

These lines already meet current standard and are intentionally unchanged.

---

## M12 — THE BETTER HOST

### Tone

Arc climax should be intimate before it becomes powerful: two hosts, two Echo relationships, one programme trying to decide which is better.

### Ren introduction

Do not make Ren a lore dispenser. He has lived inside the programme.

Keep information fragmented around action.

> **REN:** “Sazan called them Echoes.”  
> **MENMA:** “Because they copy?”  
> **REN:** “Because they remember.”

### Comparative retrieval

> The connection opens between the Echoes first. Menma feels that before anything else. Not Ren's thoughts. Not his memories on demand. Something older and heavier rooted through the other boy's chakra while Menma's own carrier shifts like it is looking for somewhere to stand.

System outputs may appear as diegetic programme readouts, but should not replace character reaction.

### Preference test

Keep Ren's wound:
> **REN:** “Mine never did.”

Do not explain it immediately. Let the player understand what he means from the Echo's choice.

### Sazan reveal

> The inner containment opens. Dr. Sazan is alive. Not waiting behind a desk. Restrained inside the architecture he built.

This corrects earlier belief without calling it resurrection.

### Echo manifestation

Keep the comic identity beat compact:

> Menma stares at the narrow four-eyed thing clinging partly outside his chakra network.  
> **MENMA:** “You're weird.”  
> **KURAMA:** “You expected elegance?”  
> **MENMA:** “I host you.”  
> **KURAMA:** “Exactly.”

This beat is retained because it is character-specific rather than generic quipping.

### Final Battle escalation

Do not narrate transformation as stat upgrades. Story describes what changes physically/experientially; Combat owns numbers.

Kurama's temporary voluntary loan must read as a choice from Kurama, not a button unlock.

Suggested transition where Knowledge/history supports it:

> **KURAMA:** “If you're going to prove the point, brat, stop doing it halfway.”  
> Heat moves through Menma's chakra before he can answer.  
> **MENMA:** “That a yes?”  
> **KURAMA:** “Don't make me reconsider.”

No permanent Kurama access follows automatically.

### Arc close

Arc 1 should end on consequence, not a reward-screen tone:

> The programme wanted a better host.  
>  
> It found two boys who survived it differently—and one Echo that learned to choose.

Then return to factual aftermath / next-Arc transition from current Chronicle state.

---

# 6. Before/after quality audit

## Removed from player-facing prose

- engine/guardrail statements about no personality score;
- `no Speed/Agility stat` explanations;
- `no automatic specialization` explanations;
- debrief text that explains semantic ledgers rather than dramatizing evaluation;
- `Progression authority owns...` language;
- `this is a separate occurrence` language where scene context can establish the distinction;
- `Battle does not imply...` language shown as narration;
- generic `Choose response / Adapt / Decisive moment` prompts where a physical situation can carry the same semantic seam.

These rules remain true in runtime; they simply stop being dialogue/narration.

## Intentionally unchanged or protected

- Kushina/Gerotora core first-contact and closing exchange;
- Iwabee `Yeah. Written tests.` exchange;
- Kakashi evaluator opening line;
- Mission-11 lower chamber locked lines;
- Ren `Mine never did.`;
- Menma/Kurama Echo-manifestation banter;
- exact Story/Battle/occurrence IDs and consequence semantics;
- exact Kill/Detain/Release intent classes;
- observer-safe Unknown Operative projection until identity reveal;
- all existing Mission facts and Chronicle history.

---

# 7. Coding / CE consumption contract

Writing modernization is now **CLOSED** for #170.

Coding/CE should:

1. keep current semantic IDs / occurrence IDs / caller seams stable;
2. replace exposed system-note prose with the production expression above;
3. treat choice labels as presentation over existing semantic IDs;
4. contextualise variable names/counts/outcomes from committed state rather than hard-coding the developer Menma path universally;
5. preserve save/load/idempotence and unresolved choice state;
6. preserve Story→Battle→same-Story continuation;
7. never use generated prose to commit facts by itself;
8. keep observer Knowledge bounded;
9. allow participant-specific expression where CE has legitimate personality/history context;
10. do not block current Chronicle Engine implementation while waiting for any additional Writing architecture.

If current runtime hardcodes prose in a way that makes clean expression replacement impossible, that is a Coding implementation defect, not a reason to reopen Story semantics.

---

# 8. Status

**10/10 Origins reviewed:** YES.  
**Arc 1 M1–M12 reviewed:** YES.  
**Canon-first voice grounding consumed:** YES.  
**Story/history redesign:** NO.  
**Writing modernization:** CLOSED.  
**Runtime implementation:** SEPARATE.  
**Installed-browser Golden:** NOT CLAIMED.
