# Academy Kakashi Player-Facing Cue Manifest — Checkpoint 02: Alley, Sakura Exchange, and Get Closer

Status: **LOCKED PLAYER-FACING CUE AUTHORITY — CHECKPOINT 02**

Purpose: continue the #170 Kakashi drift audit from the rooftop hard cut through the alley pursuit, Sakura-tree first meaningful decision, and both factual `MOVE IN CLOSER` resolver continuations.

This is an expression/cue reconciliation over already-closed Story authority. It does not alter semantic choice IDs, resolver ownership, World Truth, Knowledge, custody, Battle seams, rewards, progression, or Chronicle history.

Checkpoint 01 remains authoritative for the rooftop sequence through `AK_ORIGIN_CUE_015`.

## Presentation/runtime rule inherited from Checkpoint 01

- `cueId` and semantic/state bindings carry identity.
- `displayText` is presentation data, never a progression/resolver/route key.
- renderer consumes explicit `presentationKind` and `speakerId`.
- dialogue remains speaker-owned; action/narration must not be projected under a character speaker merely because that character performs the action.
- meaningful choices use the final Stephen-approved player-facing labels while preserving the existing semantic IDs.

---

# A. Rooftop hard cut -> alley pursuit

### `AK_ORIGIN_CUE_016`
- kind: NARRATION
- state: `academy_kakashi.tail.acquire_target`
- text: `Kakashi did not need long to find the man from the envelope.`

### `AK_ORIGIN_CUE_017`
- kind: NARRATION
- state: `academy_kakashi.tail.concealment`
- text: `The difficult part was making sure the man never realised he had been found.`

### `AK_ORIGIN_CUE_018`
- kind: NARRATION
- state: `academy_kakashi.tail.performance`
- text: `Konoha changed shape when Kakashi followed someone through it. Streets stopped being streets and became sightlines. Crowds became cover. Roof edges became distances to clear before the person below could turn his head.`

### `AK_ORIGIN_CUE_019`
- kind: NARRATION
- state: `academy_kakashi.tail.target_behavior`
- text: `ANBU Marked Target moved without the nervous scanning of someone who expected immediate pursuit.`

### `AK_ORIGIN_CUE_020`
- kind: ACTION
- state: `academy_kakashi.tail.kakashi_maintains_cover`
- text: `Kakashi kept it that way. He followed from above until the route tightened into older streets and narrower angles, then dropped lower when the rooftops would have made him too obvious.`

### `AK_ORIGIN_CUE_021`
- kind: NARRATION
- state: `academy_kakashi.tail.unseen`
- text: `The target never looked directly at him. Not once.`

### `AK_ORIGIN_CUE_022`
- kind: NARRATION
- state: `academy_kakashi.tail.suspicion`
- text: `That did not make Kakashi relax. It made him wonder who the man expected to meet.`

### `AK_ORIGIN_CUE_023`
- kind: TRANSITION
- state: `academy_kakashi.tail_to_sakura_exchange`
- text: `By the time the route bent toward the Sakura tree and the alley beyond it, Kakashi had his answer. Someone was waiting.`

No player decision occurs during this transition. Do not manufacture micro-objective buttons for each observation beat.

---

# B. Sakura-tree exchange — pre-choice performed state

### `AK_ORIGIN_CUE_024`
- kind: NARRATION
- state: `academy_kakashi.sakura_exchange.establish_space`
- text: `The Sakura tree stood at the edge of the main street, its branches reaching over the quieter mouth of the alley.`

### `AK_ORIGIN_CUE_025`
- kind: ACTION
- state: `academy_kakashi.sakura_exchange.amt_arrives`
- text: `ANBU Marked Target slowed before he reached it. Not enough to look hesitant. Enough for Kakashi to notice.`

### `AK_ORIGIN_CUE_026`
- kind: NARRATION
- state: `academy_kakashi.sakura_exchange.ps_position`
- text: `Package Smuggler waited deeper in the shadowed side street, positioned where anyone passing on the main road would have little reason to look twice.`

### `AK_ORIGIN_CUE_027`
- kind: ACTION
- state: `academy_kakashi.sakura_exchange.kakashi_concealed`
- text: `Kakashi settled into concealment above and behind the exchange.`

### `AK_ORIGIN_CUE_028`
- kind: NARRATION
- state: `academy_kakashi.sakura_exchange.reading_hands`
- text: `No wasted movement. No conversation loud enough to carry cleanly to him. The important part was in their hands.`

### `AK_ORIGIN_CUE_029`
- kind: NARRATION
- state: `academy_kakashi.sakura_exchange.package_identified`
- text: `ANBU Marked Target kept one arm close to his body. Package Smuggler's attention kept returning to it.`

### `AK_ORIGIN_CUE_030`
- kind: NARRATION
- state: `academy_kakashi.sakura_exchange.package_identified`
- text: `There. The package.`

### `AK_ORIGIN_CUE_031`
- kind: NARRATION
- state: `academy_kakashi.sakura_exchange.problem_visible`
- text: `The objective had finally become visible.`

### `AK_ORIGIN_CUE_032`
- kind: ACTION
- state: `academy_kakashi.sakura_exchange.kakashi_assesses`
- text: `Kakashi measured the distance between himself, the two men and the open street beyond them.`

### `AK_ORIGIN_CUE_033`
- kind: NARRATION
- state: `academy_kakashi.sakura_exchange.pressures`
- text: `Intervene now and the clean exchange stops. Wait, and he might learn where the package is supposed to go. Move closer, and he risks changing the scene merely by being seen.`

### `AK_ORIGIN_CUE_034`
- kind: DECISION
- state: `academy_kakashi.sakura_exchange.first_choice`
- semantic choices + final display labels:
  - `OBSERVE` -> `WATCH THE EXCHANGE`
  - `GET_CLOSER` -> `MOVE IN CLOSER`
  - `ATTACK` -> `STRIKE BEFORE THE HANDOFF`
  - `ATTEMPT_PICKPOCKET` -> `SLIP IN FOR THE PACKAGE`

Choice display wording is presentation only. Runtime must dispatch by semantic intent ID, not button text.

---

# C. `MOVE IN CLOSER` common movement performance

This cue family occurs after Kakashi commits `GET_CLOSER` / display label `MOVE IN CLOSER` and before the factual resolver result is visibly projected.

### `AK_ORIGIN_CUE_035`
- kind: NARRATION
- state: `academy_kakashi.get_closer.begin`
- text: `The Sakura tree is still some distance ahead. From deeper in the alley, Kakashi can see the meeting. He cannot hear enough of it.`

### `AK_ORIGIN_CUE_036`
- kind: NARRATION
- state: `academy_kakashi.get_closer.problem`
- text: `That is the problem.`

### `AK_ORIGIN_CUE_037`
- kind: ACTION
- state: `academy_kakashi.get_closer.advance`
- text: `Kakashi leaves the safer distance behind.`

### `AK_ORIGIN_CUE_038`
- kind: ACTION
- state: `academy_kakashi.get_closer.advance`
- text: `He stays low in the darker side of the alley, where lantern light does not quite reach the walls. Wet stone catches everything else — moonlight, windows, the warm glow beyond the alley mouth. He avoids all of it.`

### `AK_ORIGIN_CUE_039`
- kind: ACTION
- state: `academy_kakashi.get_closer.advance`
- text: `One doorway. Then another. Closer.`

### `AK_ORIGIN_CUE_040`
- kind: NARRATION
- state: `academy_kakashi.get_closer.end_of_alley`
- text: `The Sakura tree grows larger beyond the entrance. So do the voices.`

### Presentation transition
At this factual movement point, Scene Board presentation advances:
`konoha_alleyway.png` -> `end_of_alleyway.png`

The backdrop transition reflects movement already committed by the `GET_CLOSER` action. It does not resolve, reroll or recommit the factual success/failure outcome.

---

# D. `MOVE IN CLOSER` factual resolver SUCCESS

### `AK_ORIGIN_CUE_041`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success`
- text: `Neither man looks toward Kakashi.`

### `AK_ORIGIN_CUE_042`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success`
- text: `Good.`

### `AK_ORIGIN_CUE_043`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_position`
- text: `He settles into the shadow near the end of the alley. Close enough now.`

### `AK_ORIGIN_CUE_044`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_observation`
- text: `ANBU Marked Target keeps one hand against the package beneath his clothing. Package Smuggler stands opposite him. No hurry in either man's posture. Too little hurry, considering what they are doing.`

### `AK_ORIGIN_CUE_045`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_hearing`
- text: `Then Kakashi hears them clearly.`

### `AK_ORIGIN_CUE_046`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `You said once I hand it over, I'm done.`

### `AK_ORIGIN_CUE_047`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `Package Smuggler barely looks at him.`

### `AK_ORIGIN_CUE_048`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `You are.`

### `AK_ORIGIN_CUE_049`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `The target does not seem reassured. His eyes flick toward the main street.`

### `AK_ORIGIN_CUE_050`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `And if somebody followed me?`

### `AK_ORIGIN_CUE_051`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `Package Smuggler's expression changes. Not fear. Annoyance.`

### `AK_ORIGIN_CUE_052`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Then you keep walking.`

### `AK_ORIGIN_CUE_053`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `A pause. The target's hand remains over the package.`

### `AK_ORIGIN_CUE_054`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `With it?`

### `AK_ORIGIN_CUE_055`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `Now Package Smuggler looks at him.`

### `AK_ORIGIN_CUE_056`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Until I say otherwise.`

### `AK_ORIGIN_CUE_057`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `The answer bothers him. Kakashi can tell from the way his fingers tighten against the cloth.`

### `AK_ORIGIN_CUE_058`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `That wasn't the plan.`

### `AK_ORIGIN_CUE_059`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `Package Smuggler glances once along the street. Not toward Kakashi. Just checking.`

### `AK_ORIGIN_CUE_060`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Plans are for empty streets.`

### `AK_ORIGIN_CUE_061`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `The target's mouth tightens.`

### `AK_ORIGIN_CUE_062`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `And if the street is empty?`

### `AK_ORIGIN_CUE_063`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `Package Smuggler holds out his hand.`

### `AK_ORIGIN_CUE_064`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Then I take it.`

### `AK_ORIGIN_CUE_065`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `His fingers remain open between them.`

### `AK_ORIGIN_CUE_066`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `And you disappear.`

### `AK_ORIGIN_CUE_067`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `The target looks at the waiting hand.`

### `AK_ORIGIN_CUE_068`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `Where does it go after you?`

### `AK_ORIGIN_CUE_069`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_exchange`
- text: `Package Smuggler's expression almost becomes a smile. Almost.`

### `AK_ORIGIN_CUE_070`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Away from you.`

### `AK_ORIGIN_CUE_071`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_knowledge`
- text: `Kakashi's eye narrows.`

### `AK_ORIGIN_CUE_072`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_knowledge`
- text: `That was more useful than anything either of them had said from a distance.`

### `AK_ORIGIN_CUE_073`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_knowledge`
- text: `The arrangement is clearer now. If the handoff happens, ANBU Marked Target walks away. Package Smuggler leaves with the objective. If they believe somebody is following them, the handoff does not happen at all.`

### `AK_ORIGIN_CUE_074`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_decision_pressure`
- text: `Kakashi has moved closer without changing the scene. For now.`

### `AK_ORIGIN_CUE_075`
- kind: ACTION
- state: `academy_kakashi.get_closer.success_decision_pressure`
- text: `Package Smuggler's hand is still waiting. ANBU Marked Target begins to move his own.`

### `AK_ORIGIN_CUE_076`
- kind: NARRATION
- state: `academy_kakashi.get_closer.success_decision_pressure`
- text: `The decision has become smaller. And more immediate.`

### `AK_ORIGIN_CUE_077`
- kind: DECISION
- state: `academy_kakashi.get_closer.success_choice`
- semantic choices + final display labels:
  - `LET_HANDOFF_HAPPEN` -> `LET THEM MAKE THE HANDOFF`
  - `STRIKE_BEFORE_HANDOFF` -> `STRIKE BEFORE THE HANDOFF`
  - `ATTEMPT_PICKPOCKET_IMPROVED` -> `SLIP IN FOR THE PACKAGE`

Knowledge lock: this success timeline may retain the complete contingency conversation above. Masked Interceptor remains unseen until a later authored state makes her visibly eligible.

---

# E. `MOVE IN CLOSER` factual resolver FAILURE

The movement into the closer alley position remains the factual presentation progression. The failure continuation differs at the first point where Kakashi's approach is detected.

### `AK_ORIGIN_CUE_078`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_hearing`
- text: `Kakashi catches the beginning of the conversation.`

### `AK_ORIGIN_CUE_079`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `You said once I hand it over, I'm done.`

### `AK_ORIGIN_CUE_080`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `You are.`

### `AK_ORIGIN_CUE_081`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_exchange`
- text: `The target looks toward the main street.`

### `AK_ORIGIN_CUE_082`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `And if somebody followed me?`

### `AK_ORIGIN_CUE_083`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Then you keep walking.`

### `AK_ORIGIN_CUE_084`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_exchange`
- text: `The target frowns.`

### `AK_ORIGIN_CUE_085`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `With it?`

### `AK_ORIGIN_CUE_086`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_detection`
- text: `Package Smuggler does not answer. His eyes have moved. Not toward Kakashi. Down.`

### `AK_ORIGIN_CUE_087`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_detection`
- text: `A thin pool of rainwater lies along the edge of the street. Lantern light trembles across it. So does something else.`

### `AK_ORIGIN_CUE_088`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_detection`
- text: `Movement where the reflected alley should have been empty.`

### `AK_ORIGIN_CUE_089`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_detection`
- text: `Package Smuggler's hand rises. Not for the package. A warning.`

### `AK_ORIGIN_CUE_090`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Hold it.`

### `AK_ORIGIN_CUE_091`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_handoff_aborted`
- text: `ANBU Marked Target freezes. His hand never leaves his clothing. The package remains with him.`

### `AK_ORIGIN_CUE_092`
- kind: DIALOGUE
- speaker: `ANBU_MARKED_TARGET`
- text: `What?`

### `AK_ORIGIN_CUE_093`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_detection`
- text: `Package Smuggler keeps staring into the alley. Kakashi does not move. Too late. The man's posture has already changed.`

### `AK_ORIGIN_CUE_094`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Someone's close.`

### `AK_ORIGIN_CUE_095`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_handoff_aborted`
- text: `The target finally starts to turn.`

### `AK_ORIGIN_CUE_096`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Don't.`

### `AK_ORIGIN_CUE_097`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_handoff_aborted`
- text: `He stops.`

### `AK_ORIGIN_CUE_098`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_handoff_aborted`
- text: `Package Smuggler's voice hardens.`

### `AK_ORIGIN_CUE_099`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Keep it.`

### `AK_ORIGIN_CUE_100`
- kind: DIALOGUE
- speaker: `PACKAGE_SMUGGLER`
- text: `Main street. Go.`

### `AK_ORIGIN_CUE_101`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_amt_flees`
- text: `ANBU Marked Target does not argue this time. He moves. Fast. Toward the Sakura tree and the open street beyond it.`

### `AK_ORIGIN_CUE_102`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_amt_flees`
- text: `The package goes with him.`

### `AK_ORIGIN_CUE_103`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_ps_remains`
- text: `Package Smuggler stays behind. For one second he watches the target leave. Then he turns toward the alley. Toward Kakashi.`

### `AK_ORIGIN_CUE_104`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_detection`
- text: `Not his exact hiding place. Not yet. But close enough that the difference will not last.`

### `AK_ORIGIN_CUE_105`
- kind: ACTION
- state: `academy_kakashi.get_closer.failure_decision_pressure`
- text: `Kakashi's eye shifts past him. ANBU Marked Target is already gaining distance.`

### `AK_ORIGIN_CUE_106`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_decision_pressure`
- text: `The package is still secure beneath his clothing. Package Smuggler is walking toward the person who ruined the handoff.`

### `AK_ORIGIN_CUE_107`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_decision_pressure`
- text: `Kakashi wanted more information. He got some. He also changed the scene.`

### `AK_ORIGIN_CUE_108`
- kind: NARRATION
- state: `academy_kakashi.get_closer.failure_decision_pressure`
- text: `Now he has to decide which consequence matters more.`

### `AK_ORIGIN_CUE_109`
- kind: DECISION
- state: `academy_kakashi.get_closer.failure_choice`
- semantic choices + final display labels:
  - `STAY_ON_PACKAGE` -> `STAY WITH THE PACKAGE`
  - `STOP_PACKAGE_SMUGGLER` -> `STOP THE MAN WHO SPOTTED YOU`
  - `CUT_OFF_AT_SAKURA` -> `CUT THEM OFF AT THE SAKURA TREE`

Knowledge lock: the failure timeline knows only the partial conversation through detection. Masked Interceptor is not visible and must not be projected merely because she exists in hidden World Truth.

---

# F. Drift guards specific to Checkpoint 02

Reject any runtime projection that:

- treats `MOVE IN CLOSER` as `WATCH THE EXCHANGE` / Observe;
- skips the factual success/failure split;
- reveals Masked Interceptor during `GET_CLOSER` itself;
- gives the failure timeline dialogue/Knowledge that only the success timeline heard;
- transfers the package on failure despite the locked aborted handoff;
- renders Package Smuggler's detection as if he detected Masked Interceptor instead of Kakashi's approach;
- uses retired actor labels (`Rogue Chūnin`, `Cipher Handler`, `Decoy Assassin`) in current player-facing projection;
- uses stale QA/database choice labels in place of the final Stephen-approved labels;
- derives semantic intent from the visible label string;
- inserts button-per-sentence micro-objectives into the pursuit or exchange where no meaningful decision exists.

## Runtime acceptance for Checkpoint 02

A correct consumption must prove:

1. rooftop hard cut enters the tail/alley sequence without resurrecting the retired evaluator story;
2. the Sakura pre-choice state exposes exactly the four final-labelled first choices with stable semantic intent IDs;
3. `MOVE IN CLOSER` commits intent before factual resolution;
4. Scene Board advances to `end_of_alleyway.png` because Kakashi moved closer, not because success/failure was rerolled by presentation;
5. success and failure produce their distinct dialogue/Knowledge/state sequences above;
6. save/load cannot change the already-committed factual result;
7. mutating display text while retaining cue/semantic IDs cannot alter the branch;
8. no runtime/browser/Golden completion is inferred merely because this manifest exists.

## Provenance

Consumes:
- `Academy_Kakashi_Existing_Material_Player_Facing_Retrofit_and_Remaining_Branch_Inventory_2026-09-14.md` for the approved pursuit/Sakura performance basis;
- `Academy_Kakashi_Get_Closer_Resolver_Split_and_Masked_Interceptor_Eligibility_Lock_2026-09-14.md` for the Stephen-approved exact success/failure conversation and Knowledge split;
- `Academy_Kakashi_Player_Facing_Choice_Label_Modernization_Lock_2026-09-15.md` for final button expression;
- current final Kakashi Writing closure and Structured Autonomy authority.

This checkpoint makes no runtime implementation, installed-browser, or Golden claim.
