# Shinobi Chronicles — Story Choreography and Battle Presentation Benchmark Specification

**Date:** 2026-09-22  
**Owner:** UI / Assets  
**Status:** **DESIGN CLOSED FOR REPRESENTATIVE BENCHMARK / QUEUED RUNTIME IMPLEMENTATION / BROWSER GOLDEN SEPARATE**  
**Source issue:** #308  
**Upstream CE contract:** `Documentation/Coordination/Story_Stage_Choreography_and_Battle_Presentation_Performance_Contract_2026-09-22.md` @ `51f01586b3b7a4c22ccd450998d8e9342623f76b`

## 1. Purpose

This specification closes the UI / Assets-owned visual direction requested by #308 without creating another Story engine, another Battle renderer, or another Kakashi-only presentation stack.

Canonical visual objective:

> **Committed action should read as action, not as prose plus a number change.**

The same high-level performance grammar may be reused by Story and Battle, but Story assets, Battle assets, semantic ownership and factual state remain separate.

Preserve:

- presentation choreography != action authority;
- Story Scene Board != Battle renderer;
- Story actor asset != Battle portrait;
- Battle PL != animation;
- visible result != resolver;
- card visible != ownership / assignment / Battle participation;
- defeat != death;
- object presentation != custody authority;
- observer-safe masking remains mandatory;
- reduced motion must preserve all information.

## 2. Benchmark selection

### Story benchmark

Use the current Academy Kakashi Sakura-tree / Stop-the-Assassin sequence as the representative Story-stage benchmark.

Why this benchmark is suitable:

- multiple actors can be present simultaneously;
- the package can change holder state;
- Kakashi performs a physical intervention;
- targets can react or leave;
- Masked Interceptor can enter as a surprise participant;
- the scene can transition Story -> Battle -> same Story context;
- follow-up actions are resolver-driven rather than presentation-owned.

### Battle benchmark

Use `academy_kakashi_origin_battle_seq_mi` — Kakashi versus `academy_kakashi_origin_masked_interceptor` — as the representative Battle playback benchmark.

The current clean-room Battle adapter already exposes a Masked Interceptor decoy/substitution guard path (`enemy_decoy_assassin_decoy_substitution`) and therefore provides a real current-system target for ordinary hit, alternate response, PL/state change, defeat/settle and Story return presentation.

## 3. Exact existing benchmark assets

### Story / Scene Board

- backdrop: `Kakashi Origin Backdrop/fight_at_sakura_tree.png`;
- Kakashi scene actor: `Assets/Academy Student/academy_kakashi.png`;
- ANBU Marked Target scene actor: `NPC/anbu_marked_target.png`;
- Package Smuggler scene actor: `NPC/package_smuggler.png`;
- Masked Interceptor scene actor: `NPC/masked_interceptor.png`;
- optional Pakkun scene actor when the authored beat includes him: `Assets/Summons/pakkun.png`.

These are Story/scene assets. Do not replace them with Battle Portraits.

### Battle

- existing Battle shell/master reference: `UI/battle.png`;
- Masked Interceptor Battle asset: `NPC portrait/masked_interceptor.png`;
- other Kakashi-origin enemy Battle assets remain `NPC portrait/anbu_marked_target.png` and `NPC portrait/package_smuggler.png` where those exact participants are present;
- Kakashi player-side Battle image must continue to resolve through the current approved Battle portrait resolver/manifest for `academy_kakashi`; UI / Assets does not hard-code a new path here.

### New-image requirement

**NONE for this benchmark.**

No new backdrop, character card, Battle portrait or effect art is required to prove the presentation grammar. Effects should be CSS/runtime composition primitives for Alpha.

## 4. Story stage layout hierarchy

The benchmark uses one full-stage composition with five layers:

1. **Backdrop plane** — approved 16:9 physical place, cover-fitted without changing scene truth.
2. **Top information safe lane** — location, objective and one Live State Callout where needed.
3. **Actor plane** — large scene cards with stable spatial anchors.
4. **Dialogue / narration lane** — compact, speaker-owned, never the dominant visual mass.
5. **Encounter action rail** — 2–4 meaningful actions while the scene remains visible.

### Desktop geometry target

Primary Alpha target remains a landscape browser stage. At 1366×768 through 1920×1080:

- actor plane: approximately top 12% to bottom 28%;
- ordinary actor card width: approximately 18–22vw, hard-capped around 250px unless the canonical renderer uses equivalent proportional sizing;
- actor card height: approximately 46–56vh, preserving full card aspect/identity;
- dialogue lane: approximately 18–24vh maximum;
- encounter controls: one compact lower rail or 2×2 action grid, never a full-screen modal;
- top HUD: content-sized only; no tall sidebars over the scene.

### Actor anchors

Use semantic stage anchors rather than participant-specific absolute coordinates:

- `PLAYER_LEFT`
- `INNER_LEFT`
- `CENTER` / `CENTER_OBJECT`
- `INNER_RIGHT`
- `OPPONENT_RIGHT`
- `FAR_ENTRY_LEFT`
- `FAR_ENTRY_RIGHT`

The renderer may map these anchors responsively. The Story package supplies participant/state truth; UI only composes it.

## 5. Story conversation state

Conversation state must read as a staged exchange, not a text page.

### Speaker focus

Active speaker treatment:

- +3% to +5% scale;
- 8–14px visual raise;
- brightness approximately 1.05–1.10;
- normal saturation;
- bounded cyan edge/focus accent.

Listener treatment:

- no disappearance;
- brightness approximately 0.70–0.82;
- saturation approximately 0.82–0.92;
- no blur strong enough to hide identity/state.

Focus transition target: 120–180ms.

### Dialogue

- compact lower dialogue surface;
- ideal reading width 55–72% of stage, with a sensible max-width rather than edge-to-edge text;
- 1–4 short lines before natural advance;
- actual speaker is identified in the dialogue header/accessibility text;
- do not add a persistent coded name box over a Character Card's baked nameplate;
- ordinary advance uses click/Enter/Space with a subtle indicator;
- no giant CONTINUE button for routine dialogue.

### Narration

- visually distinct from character dialogue;
- typically centered or lower-left in a compact dark-glass strip;
- should carry meaning, nuance, observer-safe sensory detail or internal thought;
- should not restate an obvious movement the stage has just shown.

## 6. Story encounter state

Encounter state keeps the physical situation visible and changes only the lower interaction treatment.

Composition:

`Backdrop + present actors + visible object/state + objective/problem + legal semantic intents`

Rules:

- 2–4 primary actions visible without scrolling where practical;
- controls are explicit semantic intents, not result promises;
- actor cards remain on stage while the player decides;
- current package/participant state stays readable;
- action buttons never imply success before the resolver returns;
- after input, controls lock only for the minimum submit/playback window;
- changed authoritative state is visibly staged before the next decision surface appears.

## 7. Story state strips and Live State Callouts

Retain the Scene Board addendum distinction:

- baked card nameplate = participant identity;
- card state strip = visible local participant state;
- Live State Callout = wider scene/object/custody fact not already readable from a participant.

Examples for the Kakashi benchmark:

- `HAS PACKAGE` beneath Package Smuggler only while that fact is authoritative and observer-safe;
- `RESTRAINED` beneath an actor only after authoritative restraint;
- `PACKAGE — EXCHANGE IN PROGRESS` as a transient scene-wide callout during an authorised transfer;
- do not simultaneously show a detached `PACKAGE SMUGGLER HAS PACKAGE` box when the Smuggler card already carries `HAS PACKAGE`.

Active/changing state uses cyan emphasis; committed/pivotal state uses gold emphasis.

## 8. Story object-transfer presentation

The package does not require new image art for Alpha.

Use a neutral UI object token when the package is legitimately visible:

- small sealed-parcel silhouette/tile;
- label `PACKAGE` only when observer Knowledge permits it;
- no invented contents or ownership text;
- positioned in the stage/object lane, never inside dialogue.

On committed holder change:

1. old holder state strip clears/updates;
2. object token travels toward the new holder anchor;
3. new holder state strip appears;
4. scene-wide `EXCHANGE IN PROGRESS` callout resolves/disappears once the transfer is settled.

Target transfer duration: 320–420ms.

If runtime does not expose holder state or observer Knowledge, the object token must not guess.

## 9. Story choreography grammar

Alpha should use one bounded vocabulary. Recommended default timings are visual targets, not semantic timers:

| Class | Presentation | Default timing | Truth boundary |
| --- | --- | ---: | --- |
| `ENTER` | slide/fade from authored side | 280–340ms | participant already Present |
| `EXIT` | fade/slide to authored side | 220–300ms | participant already absent/leaving |
| `FOCUS` | raise/scale/brightness | 120–180ms | speaker/attention already supplied |
| `REPOSITION` | move between stage anchors | 260–340ms | no new location/state truth |
| `APPROACH` | controlled move toward target | 280–360ms | approach authorised |
| `RETREAT` | controlled move away | 280–360ms | retreat authorised |
| `LUNGE` | fast 6–10vw forward burst + settle | 150–220ms | action already chosen/authorised; no hit implied |
| `STRIKE` | bounded contact pulse + target response | 80–180ms | only after contact/hit fact exists |
| `EVADE` | target lateral offset / actor passes focus | 180–260ms | evade already resolved |
| `RECOIL` | brief target offset + recover | 140–220ms | impact already resolved |
| `COLLAPSE` | lower/tilt/fade to inactive state | 320–450ms | defeat/withdrawal already resolved; not death |
| `FLEE` | accelerating off-stage exit | 300–420ms | escape/flee already resolved |
| `RESTRAIN` | actor spacing closes + state strip | 280–380ms | restraint already resolved |
| `RELEASE` | spacing opens + state clears | 220–300ms | release already resolved |
| `HANDOFF` | source/recipient focus + object move | 320–420ms | holder transition already resolved |
| `OBJECT_TRANSFER` | token moves source -> target | 320–420ms | same as above |
| `SURPRISE_ENTRY` | faster edge entry + bounded focus pulse | 240–330ms | participant is already Present |

Global cue rules:

- no single ordinary cue should trap input for more than roughly 650ms;
- compatible cues may overlap when readability improves;
- no choreography completion callback may commit Story state;
- save/load may restore settled presentation without replaying/duplicating the fact;
- skip/fast may collapse motion but never skip semantic receipts.

## 10. Kakashi Story benchmark sequence

The benchmark should prove the grammar using current authorised state, not hard-coded outcomes.

### A. Establish

- `fight_at_sakura_tree.png` fills the stage;
- Kakashi at `PLAYER_LEFT`;
- current opposition occupies `INNER_RIGHT` / `OPPONENT_RIGHT` according to exact present refs;
- package token appears only if observer-safe;
- compact objective remains visible.

### B. Exchange / object state

When runtime commits a package transfer, play `OBJECT_TRANSFER` and update the holder state strip. Presentation does not determine the holder.

### C. Kakashi intervention

After the authorised Stop-the-Assassin intent is accepted:

- Kakashi receives `FOCUS`;
- play `APPROACH` or `LUNGE` toward the exact target supplied by runtime;
- do **not** play hit/recoil/collapse merely because Kakashi lunged;
- if this action enters Battle, transition to Battle at the existing caller boundary.

### D. Battle return

On return, consume exact Battle/Story result:

- defeated/withdrawn refs may `RECOIL` then `COLLAPSE` or settle inactive;
- living/present actors stay visible;
- package state updates from authoritative Story state, not from Battle damage;
- no death presentation without death truth.

### E. Complication

When Masked Interceptor becomes Present, use `SURPRISE_ENTRY` from `FAR_ENTRY_RIGHT`, then speaker `FOCUS`.

If Package Smuggler is authoritatively gone/escaping, use `FLEE`; if still present/reachable, leave the card staged. Timing/presence comes from runtime.

### F. Continuation

After the stage settles, expose the current legal follow-up semantic choices. Do not hard-code a generic action menu if the Story package supplies a different legal set.

This one sequence proves multi-actor conversation, entry, reposition, physical action, reaction, exit/flee, object transfer and choice/continuation without creating any Story truth.

## 11. Battle visual hierarchy

The Battle benchmark should make the committed result readable in causal order:

> **ACTOR -> ACTION -> TARGET -> IMPACT/RESPONSE -> RESULT -> UPDATED STATE -> NEXT ACTOR**

Use the current Battle shell as the framing surface, but create a clear central performance lane.

### Battle composition

- player/active actor zone on the left;
- exact target zone on the right;
- non-active participants remain visible but reduced in prominence;
- action/technique label appears near the top-center performance lane;
- Battle PL/state remains adjacent to each participant, not floating as the only central event;
- result delta appears near the affected target before/while the authoritative PL readout updates;
- next-actor focus occurs only after the result is visually settled.

Recommended active participant portrait scale: 1.0. Non-active participants: approximately 0.78–0.86 scale/brightness treatment without hiding them.

## 12. Battle playback timing

Default readable playback target for an ordinary resolved action:

1. active actor focus — 100–150ms;
2. action label / wind-up — 120–180ms;
3. actor motion or ranged emphasis — 160–240ms;
4. target response — 160–260ms;
5. result/delta feedback — 160–220ms;
6. PL/state transition — 200–300ms;
7. settle / next actor — 100–160ms.

Typical total should feel around 0.7–1.2 seconds, with overlap where readable. It must not become long animation theatre.

Fast/skip mode may compress the visual sequence to a short focus + result receipt. No semantic action depends on the animation finishing.

## 13. Battle result grammar

### `HIT`

- actor movement/action emphasis;
- target impact/recoil;
- factual delta appears;
- PL/state readout animates from before -> after;
- settle.

### `MISS`

- action still reads;
- no direct-impact pulse on target;
- compact `MISS` receipt;
- no invented PL change.

### `EVADE`

- target shifts out of contact lane;
- compact `EVADE` receipt;
- actor settles without fake contact.

### `GUARD` / `BLOCK`

- target braces/locks position;
- bounded shield/impact pulse built from CSS primitives;
- receipt uses the exact resolver class/label;
- any actual damage/PL delta still comes only from the committed result.

### `SUBSTITUTION` / decoy guard

For the current Masked Interceptor benchmark:

- use a brief duplicate/afterimage of the **same approved Battle portrait**;
- original target fades/shifts and recenters;
- show the exact current action/result label (`enemy_decoy_assassin_decoy_substitution` may receive player-facing label text from Combat/Coding authority);
- do not introduce a log, clone, smoke entity or other lore object unless the committed Battle result/asset authority supplies it;
- do not show a direct-hit recoil that contradicts the substitution/guard.

### `CRITICAL`

- use stronger bounded gold/cyan impact emphasis;
- the actual delta remains Combat-owned;
- no gore requirement.

### `DEFEAT`

- only after `defeatRefs[]`/equivalent authoritative result;
- target lowers/desaturates/fades or moves into an inactive lane;
- label may say `DEFEATED` / `WITHDRAWN` only if that is the supplied Battle state;
- never translate generic defeat into death.

## 14. Battle presentation classes

One reusable class system should cover Alpha:

- `PHYSICAL_STRIKE`: short actor burst + impact/recoil;
- `HEAVY_STRIKE`: slower wind-up + stronger bounded impact;
- `PROJECTILE`: source emphasis -> target travel line/trace -> response;
- `CHAKRA_RANGED`: source pulse -> neutral energy trace -> response;
- `AREA_ATTACK`: stage-wide source emphasis + all exact target refs react;
- `GUARD`: stance/brace + state chip;
- `EVADE`: target displacement without contact;
- `SUBSTITUTION`: target afterimage/shift from same approved asset;
- `HEAL`: source/target focus + positive state/delta receipt;
- `BUFF`: participant state chip enters/updates;
- `DEBUFF`: affected participant state chip enters/updates;
- `RESTRAINT`: spacing/brace + restraint state;
- `SUMMON`: exact authorised summon participant enters the Battle stage;
- `ENVIRONMENTAL`: environment lane pulses/highlights only when Combat supplies such an action;
- `TRANSFORMATION`: approved representation swap/focus only after runtime state changes;
- `DEFEAT`: inactive settle/exit after authoritative defeat.

Do not infer elemental affinity, technique colour or hidden mechanics from presentationClass alone. Technique-specific art may override later through the same canonical owner.

## 15. Multi-target and off-slot targeting

Battle presentation must consume exact target refs.

For multi-target/off-slot actions:

- promote the exact target(s) into the performance focus;
- non-target participants remain secondary;
- never assume the active opposing slot is the target;
- area actions may use simultaneous bounded reactions on all exact target refs;
- target focus is presentation only and cannot change legality.

## 16. PL/state presentation

PL remains visible continuously but changes in the causal result phase rather than acting as the whole animation.

Preferred order:

`impact/alternate response -> delta receipt -> PL/state interpolation -> settled value`

Do not animate PL downward on miss/evade unless Combat actually supplied a delta.

Status chips should be compact and near the relevant participant. They display supplied state only.

## 17. Story -> Battle -> Story visual continuity

Benchmark continuity should feel like one occurrence:

- Story Scene Board holds the Sakura-tree situation;
- Battle enters through the current caller contract;
- Battle action playback uses Battle assets only;
- Battle settles and returns through the existing result/return seam;
- the Scene Board restores the same physical place and consumes exact post-Battle Story state;
- Story then stages only those presence/custody/reaction changes that are authoritative.

The UI specification does not decide whether a standalone Victory surface appears in any specific caller path. That remains current runtime/caller behaviour. If shown, it must remain a Battle receipt and must not invent Story success, custody, death or reward.

## 18. Accessibility and reduced motion

### Keyboard / focus

- ordinary Story advance: Enter/Space/click;
- meaningful choices are real focusable controls;
- focus order follows visible top-to-bottom / left-to-right interaction order;
- Battle actions remain keyboard reachable before submission;
- during playback, focus remains stable and returns to the correct next interactive control.

### Reduced motion

With `prefers-reduced-motion: reduce` or an equivalent game option:

- remove translation-heavy entry/lunge/flee motion;
- use instantaneous anchor changes plus 80–120ms focus/opacity transitions or none;
- keep all state strips, result labels, deltas and dialogue;
- object transfer becomes old-holder clear -> new-holder set with a textual/state receipt;
- Battle uses actor highlight -> result receipt -> updated PL/state with no required travel animation.

### Screen-reader / textual result

Every Battle result must have a concise textual equivalent derived from the committed result envelope, for example:

`Kakashi used [action] on Masked Interceptor. Guarded. Battle PL 14 -> 11.`

Exact action/result labels come from authoritative runtime data. Unknown identities must not leak through accessible names.

## 19. Responsive behaviour

The benchmark is designed first for the Alpha landscape browser target.

On narrower layouts:

- reduce actor/card scale before reducing information;
- permit shallow card staggering while preserving all Present participants;
- top HUD wraps into two compact rows if required;
- dialogue may grow to approximately 26vh but must not cover the whole actor plane;
- encounter actions may become a 2×2 full-width lower grid;
- do not hide a participant merely to make the layout fit;
- do not switch to a separate mobile Story/Battle semantic system.

## 20. Visual styling

Retain the existing Shinobi Chronicles presentation language:

- dark neutral glass for text/control surfaces;
- cyan = active/changing/interaction focus;
- gold = committed/pivotal/settled emphasis;
- restrained bloom and drop shadow;
- readable card art remains the primary visual actor;
- avoid large opaque panels that erase the backdrop;
- avoid excessive shake, flash or screen-filling particles.

## 21. Canonical ownership / implementation guard

This specification must be implemented through the canonical shared owners.

Do **not** create:

- a new Kakashi-only choreography renderer;
- a second Story Scene Board;
- a second Battle result renderer;
- a late CSS patch owner layered over the accepted renderer;
- MutationObserver-based presentation correction;
- timeout-driven semantic progression;
- an animation-owned Story/Battle result writer.

The current Kakashi V2 modules are valid benchmark content/runtime evidence, but they must not become the permanent reusable presentation architecture merely because Kakashi is the first test case.

Shared motion grammar is allowed. Shared semantic state or shared asset-family identity is not automatic.

## 22. Runtime implementation packet

Coding / Runtime should implement one canonical shared presentation slice with the following minimum capabilities:

### Story

- semantic stage anchors;
- focus state;
- bounded choreography queue consuming authoritative cues/state;
- Story actor entry/exit/reposition/lunge/recoil/flee;
- object-transfer token/state-strip update;
- surprise entry;
- compact conversation and encounter layouts;
- reduced-motion/skip-safe playback;
- no cue may commit Story truth.

### Battle

- performance lane over the existing Battle composition;
- actor/action/target/result sequencing;
- hit/miss/evade/guard/substitution truthfulness;
- result delta before/with PL transition;
- exact target ref support including off-slot/multi-target;
- defeat settle;
- fast/skip/reduced motion;
- no animation may commit Combat truth.

### Integration

- one canonical owner per surface;
- existing Story/Battle save-load semantics remain idempotent;
- no replay may duplicate result/history;
- Story caller restored after Battle;
- current Kakashi benchmark consumes shared presentation rather than spawning a second renderer.

## 23. Browser acceptance criteria

### Story benchmark GREEN requires

1. approved Sakura-tree backdrop fills the stage;
2. at least three present actor cards remain readable at once;
3. active speaker is obvious within ~200ms;
4. dialogue occupies less visual weight than place + people;
5. ordinary advance is lightweight;
6. package transfer visibly updates only after holder truth changes;
7. Kakashi can approach/lunge without presentation claiming a hit;
8. post-result reaction/collapse matches exact supplied state;
9. Masked Interceptor surprise entry reads immediately;
10. flee/exit occurs only when runtime says the actor left;
11. choices appear over the still-visible situation;
12. reduced-motion state remains fully understandable;
13. no hidden identity/state leaks through DOM/accessibility.

### Battle benchmark GREEN requires

1. active actor/action/target can be read without watching the PL number;
2. ordinary hit visibly causes response before/with factual PL update;
3. miss/evade does not fake impact;
4. Masked Interceptor decoy/substitution guard receives a distinct truthful playback;
5. result delta and settled PL/state are readable;
6. defeat settle does not imply death;
7. exact target refs work for non-default targets;
8. skip/fast does not duplicate action;
9. reduced-motion remains readable;
10. Battle returns to the same Story occurrence through the existing caller contract.

### Golden gate

`browserGoldenClaimed = false` until Stephen personally approves the installed-browser benchmark.

Do not propagate the choreography/performance pattern across all Origins/Story/Battles before that acceptance.

## 24. Missing asset ledger

**NONE for the representative benchmark.**

If runtime discovers that `academy_kakashi` lacks an approved Battle portrait mapping, that is a separate exact asset-mapping blocker and must return to UI / Assets. Do not substitute the Story card.

## Final lock

> **Story benchmark:** the Sakura-tree scene must visibly perform presence, transfer, intervention, reaction, entry/exit and choice while runtime remains the sole source of truth.

> **Battle benchmark:** Kakashi vs Masked Interceptor must visibly perform actor, action, target, response, result and updated state, including truthful decoy/substitution playback, rather than reading as two portraits and a falling PL value.

> **No new image generation is required. One shared canonical presentation owner per surface; benchmark first, Stephen browser approval second, propagation third.**

Routing: QUEUED -> CODING / RUNTIME benchmark implementation.