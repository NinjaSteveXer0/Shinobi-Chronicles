# Shinobi Chronicles — Academy Origins Screen-First Player-Facing Story Rewrite

**Date:** 2026-09-13  
**Owner:** Writing — Konoha  
**Source issue:** #170  
**Status:** **FINAL WRITING EXPRESSION AUTHORITY — 10/10 ORIGIN SCREEN-FIRST REWRITE; SEMANTICS PRESERVED; CODING/RUNTIME IMPLEMENTATION + BROWSER GOLDEN SEPARATE**

## 1. Purpose

Live installed-browser review proved that the first #170 modernization pass was not enough. The production Origins still carried correct semantic state through prose that often sounded like a designer explaining a scene rather than characters living through it.

This package supplies the replacement **player-facing expression layer** for all ten Academy Origins.

Binding target:

> **Every Origin beat must read as a scene first and a semantic carrier second.**

Do not project engine-language such as `performance bucket`, `confirmed packet`, `apparent carrier`, `outcome class`, `entitlement`, `participant ref`, `no morality score`, `no stat created`, or similar implementation notes into player-facing prose.

This package does **not** reopen the Origin semantic contracts. Existing semantic/choice IDs, consequence/source-occurrence bindings, Battle callers/returns, World Truth, Knowledge, PL/Stats, Progression, Acquisition, rewards and factual outcomes remain authoritative.

Choice labels below are player-facing expression. The machine choice ID shown in backticks remains stable.

---

# 2. ACADEMY HINATA

## Voice / physical anchor

Hinata is quiet and hesitant under clan scrutiny, but not empty or passive. She notices detail, controls herself physically, and can act with considerable resolve once she decides. Pressure should appear through breath, hands, stance and eye contact rather than narration declaring that she is shy.

### Opening — replace `hin_practice`

[NARRATION]

Morning mist still clings to the stones of the Hyūga courtyard. Hinata's bare heel turns exactly where it turned the last six times. Palm. Step. Breathe. Again.

The instructor says nothing until she finishes the form.

[INSTRUCTOR]

"Again won't tell me anything new."

Hinata's fingers tighten once at her side.

[INSTRUCTOR]

"Use it."

Across the courtyard, her sparring partner settles into stance.

### First choice — `hin_1`

Prompt:

The other student's weight shifts forward. Hinata has a heartbeat before they move.

- `attack_immediately` — **Move first. Don't give them time to settle.**
- `wait_for_opening` — **Wait. Let them show the opening.**
- `defensive_stance` — **Set her guard and make them come through it.**
- `study_movement` — **Watch their feet. Learn the rhythm before committing.**

### Mid-spar — replace `hin_2`

[NARRATION]

The first exchange breaks the neat Academy rhythm. Sand scratches under sandals. A sleeve snaps past Hinata's cheek. Her next breath comes faster than the last.

Her opponent adjusts.

So does she.

Choices retain IDs:

- `press_advantage` — **Stay on them before they can reset.**
- `redirect_attack` — **Meet the next strike and turn it away.**
- `create_distance` — **Give herself room. Reset the exchange.**
- `change_approach` — **Break the pattern before they read her.**

### Decisive beat — replace `hin_3`

[NARRATION]

For one instant their guard opens.

Hinata sees it.

The instructor sees her see it.

- `commit_strike` — **Take the opening.**
- `counter` — **Invite the attack, then answer it.**
- `remain_patient` — **Don't chase it. Make them open again.**
- `trust_observation` — **Move where the pattern says they'll be.**

### Evaluation — replace `hin_eval`

[INSTRUCTOR]

"Enough."

Hinata stops with one foot still half-raised. Her opponent exhales first.

The instructor's eyes travel from the scuffed ground to Hinata's stance.

[INSTRUCTOR]

"You noticed more than you used."

Hinata lowers her hands.

[HINATA]

"...I know."

No destiny/personality explanation follows. Existing consequence commit remains unchanged.

### Younger student — replace `hin_young`

[NARRATION]

At the gate, a younger Hyūga student is still practising the same turn. Their palm keeps arriving a fraction too late. They glance at Hinata, immediately look away, and try again.

- `show_movement` — **"Here. Watch my feet."**
- `explain_error` — **"You're turning after your weight moves."**
- `leave_them_to_figure_it_out` — **Let them work it out without hovering.**
- `stay_and_watch` — **Stay quiet and watch one more attempt.**

### Closing — replace `hin_end`

If `show_movement` / `explain_error`:

The younger student tries again. Better this time.

Hinata almost smiles before she catches herself.

[HINATA]

"Again."

If `stay_and_watch`:

The student misses the turn, resets, then catches it on the next attempt. Hinata notices why before the instructor says anything.

She looks back toward the courtyard.

[HINATA]

"Tomorrow... I'll try again."

If `leave_them_to_figure_it_out`:

Hinata reaches the gate, pauses at the sound of another failed step behind her, then keeps walking.

Her own fingers quietly repeat the corrected hand position at her side.

---

# 3. ACADEMY WASABI IZUNO

## Voice / physical anchor

Wasabi is quick, competitive and impatient with wasted motion. She can bicker, commit hard and trust instinct, but her speed should not become generic recklessness. Her Origin should feel like movement.

### Opening — replace `izu_start`

[NARRATION]

The instructor drops a wooden marker into Wasabi's palm.

[INSTRUCTOR]

"Target leaves now. Extraction gate closes when they reach it."

A figure disappears over the Academy wall.

Wasabi is already leaning forward.

[WASABI]

"You could've just said go."

### Initial choice — `izu_initial`

At the wall, the obvious trail bends left. Dust hangs in the alley. A roof tile on the right is freshly chipped.

- `obvious_trail` — **Take the trail before it cools.**
- `environmental_signs` — **Ignore the footprints. Read what the runner disturbed.**
- `cooperate_students` — **Pull the nearest students in and split the search.**
- `predict_destination` — **Forget the trail. Beat the target to where they have to end up.**

### Route divergence — replace `izu_split`

[NARRATION]

The pursuit tears across Konoha in pieces: wet stone near the river, a doubled-back footprint, a shout from another student, movement where no movement should be.

Wasabi skids to a stop at the next junction and makes the call.

- `river_route` — **Cut along the river. It's faster if the bank holds.**
- `stronger_trail` — **Follow the freshest marks. Somebody made them for a reason.**
- `rogue_interruption` — **Break off. Something's wrong with that student.**
- `intercept_prediction` — **Keep the prediction. Get ahead of the target.**

### Rogue interruption — replace `izu_rogue`

[NARRATION]

A boy in a scratched forehead protector has an Academy student backed against a fence. He isn't part of the exercise. The student's eyes find Wasabi first.

Wasabi's jaw tightens.

- `intervene` — **"Hey. Pick on somebody looking at you."** *(Battle remains fail-closed until exact caller exists.)*
- `call_for_help` — **Signal the instructor and keep herself between them.**
- `keep_pursuing` — **Keep moving. The target is getting farther away.**

### Evaluation — replace `izu_eval`

Never display an outcome taxonomy.

Branch presentation should describe only what happened:

- river late: Wasabi reaches the extraction point just in time to see the target slap the marker down. She bends over with hands on knees, annoyed enough to laugh once through her breath.
- false trail: the footprints end too cleanly. Wasabi crouches, rubs the edge of one print with her thumb, and sees where somebody pressed it into the mud from the wrong angle.
- prediction success: Wasabi is already waiting when the target vaults the final wall. Their expression changes before their feet hit the ground.
- rogue branch: resolve the actual secondary occurrence first, then show the pursuit consequence without moral commentary.

[INSTRUCTOR] where appropriate:

"Tell me what you missed."

[WASABI]

"Depends. You want the short list?"

### Reflection — replace `izu_reflect`

The instructor tosses the wooden marker back to her.

- `trust_trail` — **"Next time I won't second-guess a trail that's still good."**
- `trust_notice` — **"Next time I'm trusting the thing that doesn't fit."**
- `fastest_not_obvious` — **"Fastest route isn't always the one in front of you."**
- `catch_not_only` — **"Catching one person isn't much use if you run past everything else."**

### Closing — replace `izu_end`

Wasabi rolls the marker across her knuckles and starts back toward the Academy before the instructor dismisses her.

[INSTRUCTOR]

"Izuno."

She looks over one shoulder.

[INSTRUCTOR]

"You're still being graded."

[WASABI]

"Then keep up."

---

# 4. ACADEMY MIRAI SARUTOBI

## Voice / physical anchor

Mirai is conscientious, observant and serious about responsibility. Suspicion should build from memory and inconsistency, not omniscient narration. She can be young without becoming naive.

### Opening — replace `mir_start`

[NARRATION]

The civilian bows too many times when the escort begins.

[CIVILIAN]

"Sorry. First time being assigned an Academy escort. I expected someone taller."

Mirai checks the road, then the travel papers, then gives them back.

[MIRAI]

"You got me. Try not to look devastated."

They start walking.

### Ordinary conversation — replace `mir_talk`

Let each question occur as real walking dialogue:

- `ask_origin` — **"You said you're from outside Fire Country. Where?"**
- `ask_route` — **"Which gate did you come through this morning?"**
- `ask_family` — **"Anyone waiting for you when this is over?"**
- `ask_trip` — **"Long trip into Konoha?"**

The civilian answers naturally. Runtime preserves the selected topic as the memory anchor.

### Inconsistency — replace `mir_inconsistent`

[NARRATION]

Three streets later, the civilian points toward a lane they claimed they never used.

"That market was quieter this morning," they say.

Mirai's next step lands normally.

Her eyes do not.

They flick once to the travel papers tucked inside the civilian's coat.

- `challenge_direct` — **Stop walking. "You weren't on that street this morning."** *(Battle fail-closed.)*
- `test_question` — **Ask the same thing sideways and see if the answer changes.**
- `pretend_not_notice` — **Keep the pace. Let them believe she missed it.**
- `change_route` — **Turn down a different street without warning. Watch what they recognise.**

### Suspicion deepens — replace `mir_deeper`

The civilian catches Mirai looking and smiles a fraction too late.

Mirai keeps one hand loose near her pouch.

- `challenge_now` — **"Enough. Who are you?"** *(Battle fail-closed.)*
- `continue_guard_up` — **Finish the escort, but don't give them another blind angle.**
- `scan_changed_chakra` — **Try to verify whether the chakra in front of her matches what it should.** *(Fail-closed into unresolved confrontation package.)*
- `investigate_quietly` — **Keep them talking. Build proof before showing suspicion.**

### Checkpoint reveal — replace `mir_checkpoint`

The checkpoint guard reaches for the papers.

The civilian exhales.

Their face ripples first.

Mirai's hand snaps to her pouch as the substitution releases in a curl of chakra.

[INSTRUCTOR]

"Protected all the way here."

Mirai stares at the person she escorted.

[MIRAI]

"...Wrong person."

[INSTRUCTOR]

"Both facts count."

### Quiet-verification success — replace `mir_verified`

Mirai asks one last harmless question.

The answer contradicts the first one word for word.

She stops walking.

[MIRAI]

"You remembered the lie. You forgot the conversation."

For the first time, the civilian stops smiling.

### Closing — replace `mir_eval` + `mir_end`

At the Academy gate, the instructor takes back the exercise papers.

[INSTRUCTOR]

"What were you protecting?"

Mirai looks at the papers, then at the person beside them.

Branch-aware response:

- checkpoint reveal: **"A person. I assumed the name came with them."**
- verified early: **"The person first. The identity once I could prove it."**

The instructor folds the papers once.

[INSTRUCTOR]

"Good. Don't confuse those again."

Mirai does not answer immediately. She watches the next escort pair leave the gate instead.

---

# 5. ACADEMY KUSHINA

## Voice / physical anchor

The #169 ordinary endings already moved Kushina closest to the correct standard. Preserve the existing courtyard setting and strong lines. Add only enough physical continuity that the scene reads as one event rather than linked text cards.

### Opening — replace `kus_crisis`

[NARRATION]

The practice scroll gives a sharp, ugly hiss.

One line of ink crawls past the instructor's guide marks. A classmate kneeling beside it freezes as chakra lifts the paper off the stone.

Kushina is moving before the instructor finishes shouting her name.

Choices retain IDs:

- `correct_formula` — **Drop to the seal and correct the formula before it cascades.**
- `protect_student` — **Get the classmate out. The scroll can wait.**
- `contain_damaged_seal` — **Forget the original exercise. Close the leak.**
- `move_unstable_object` — **Move the dangerous scroll into the cleared lane.**

### Ordinary endings

Preserve #169 dialogue exactly where already strong:

`protect_student`

CLASSMATE: "I could've moved."

KUSHINA: "You were still staring at it."

`contain_damaged_seal`

INSTRUCTOR: "That's not the original formula."

KUSHINA: "It doesn't need to be pretty. It needs to stop leaking."

`move_unstable_object`

INSTRUCTOR: "That was not the assignment."

KUSHINA: "Neither was exploding."

### Gerotora branch

Keep the accidental reverse summon in the same courtyard.

When the formula folds inward, show Kushina shielding her eyes with one forearm, then lowering it to find Gerotora sitting where the scroll was.

Preserve:

GEROTORA: "...That is not where I was."

KUSHINA: "You're a toad."

GEROTORA: "Excellent observation."

At closure preserve:

GEROTORA: "Next time you touch a formula you don't understand, try not to drag somebody through it."

KUSHINA: "I understood it."

GEROTORA: "That's what worries me."

Kushina's final visible action: she looks down at the damaged formula as Gerotora disappears, then quietly redraws the line that caused the whole problem before the screen closes.

---

# 6. ACADEMY KURENAI

## Voice / physical anchor

Kurenai's Origin should make perception itself feel unreliable. She is deliberate, controlled and interested in what another person believes they have perceived. Avoid explaining illusion layers to the player.

### Opening — replace `kur_bell`

The instructor hooks a brass bell onto his belt.

[INSTRUCTOR]

"Take it."

Kurenai looks from the bell to his eyes.

[KURENAI]

"That's the whole instruction?"

[INSTRUCTOR]

"If you need more, you've already made my job easier."

The bell rings once as he steps back.

### First layer — `kur_layer1`

The courtyard stays perfectly ordinary for half a second too long.

- `false_kurenai` — **Give him a Kurenai to watch that isn't real.**
- `conceal_movement` — **Hide the movement that matters.**
- `distort_position` — **Make distance lie to him.**
- `fake_clumsy` — **Give him an obvious mistake and let him believe it.**

### Branch expression

`false_kurenai`:

The false Kurenai breaks first. The instructor's gaze follows it—and returns to the real one sooner than she wanted.

`conceal_movement`:

The bell rings somewhere to his left. Kurenai is moving somewhere else.

`distort_position`:

The bell looks two steps away. Then four. Then close enough to touch. The instructor's heel shifts to compensate for a distance that never changed.

`fake_clumsy`:

Kurenai lets her shoulder turn too early. Lets her foot scrape. Lets irritation flash across her face.

The instructor relaxes by one degree.

That is what she wanted.

Keep existing follow-up IDs, but phrase immediate choices as actions rather than design layers.

### Result — replace `kur_result`

Do not display `complete_loss`, `partial_loss`, `partial_win`, `complete_win` language.

Resolve physically from committed route:

- loss: Kurenai closes her fingers on empty air as the real bell rings behind her.
- partial loss: she reaches the right space one exchange too early and the instructor catches the deception.
- partial win: the instructor turns away believing she has withdrawn; the bell gives one surprised chime under Kurenai's fingertips before he recovers.
- complete win: his hand closes around the false Kurenai while the real one lifts the bell from his belt.

### Closing — replace `kur_lesson`

The instructor looks at his empty belt, then at Kurenai.

[INSTRUCTOR]

"What did you change?"

[KURENAI]

"What you trusted."

A pause.

The corner of the instructor's mouth moves.

[INSTRUCTOR]

"Better answer than 'what you saw.'"

Kurenai turns the bell once between two fingers. It rings softly as the scene closes.

---

# 7. ACADEMY IWABEE

## Voice / physical anchor

Iwabee is blunt, physically confident and frustrated by an institution that keeps measuring him where he struggles. He should not sound stupid; he knows exactly what he is good at and resents having it discounted.

### Opening — replace `iwa_task`

A section of the practice ground has collapsed into cracked shelves of stone and packed earth.

The instructor points at it with a clipboard.

[INSTRUCTOR]

"Make it usable again."

Iwabee looks at the clipboard, then at the ground.

[IWABEE]

"Finally, a test that knows what dirt looks like."

### Terrain choice — `iwa_reshape`

Iwabee crouches and presses one palm to the fractured ground.

- `raise_collapsed` — **Raise the collapsed section back into place.**
- `flatten_ground` — **Flatten the whole mess and start clean.**
- `build_path` — **Cut a stable path through the damage.**
- `reinforce_weakest` — **Find the weak point and brace it first.**

### Rogue reveal — replace `iwa_expose`

Stone grinds. The reshaped earth peels concealment away from a figure crouched where nobody from the Academy should be.

The Rogue Genin jerks upright.

Iwabee does too.

[IWABEE]

"Well. You're not part of the test."

The Rogue's eyes jump toward the nearest exit.

### Response — `iwa_response`

- `confront_immediately` — **Step between him and the exit. "Then let's make this practical."** *(Battle fail-closed.)*
- `block_escape` — **Raise earth across the escape route.** *(Fail-closed until exact resolution authority.)*
- `call_instructor` — **"Sensei. Found something that's definitely not on the worksheet."**
- `ignore_finish` — **Keep working. The instructor is standing right there.**

### Instructor exchange — preserve but stage physically

After the secondary occurrence resolves, the instructor taps the clipboard against one palm.

[INSTRUCTOR]

"You know what your problem is, Iwabee?"

Iwabee wipes dirt from his knuckles.

[IWABEE]

"Yeah. Written tests."

[INSTRUCTOR]

"No. You keep acting like the only things that count are the things you're bad at."

Iwabee stops wiping his hands.

That lands harder than he expected.

### Reflection / ending

Keep existing reflection IDs, but present them as Iwabee's reply:

- `know_good_at` — **"I know what I'm good at."**
- `better_rest` — **"Then I'll get better at the rest too."**
- `academy_tests_wrong` — **"Maybe the Academy should learn how to test shinobi."**
- `dont_care` — **"I don't care. I finished the job."**

The instructor snorts once and looks over the repaired ground.

[INSTRUCTOR]

"Yeah. You did."

No personality/stat explanation follows.

---

# 8. ACADEMY METAL LEE

## Voice / physical anchor

Metal is earnest and technically capable, but attention changes his body. Show pressure through breath, shoulders, grip and rhythm—not by repeatedly telling the player he is nervous.

### Private opening

Preserve the empty practice court premise, but make it sensory:

[NARRATION]

Metal's heel hits the chalk mark exactly.

Again.

The wooden post shudders under his palm. No classmates. No instructor at his shoulder. Just his breathing and the soft scrape of sandals on packed dirt.

His next sequence is cleaner than the last.

### No-pressure choice

- `keep_steady` — **Keep the rhythm exactly where it is.**
- `push_faster` — **Add speed while nobody is here to break his focus.**
- `repeat_precise` — **Repeat the clean sequence until every step lands.**
- `change_rhythm` — **Change the cadence and make himself adapt.**

### Spectators arrive

A classroom door bangs open.

Voices spill into the yard.

Metal's next breath catches halfway in.

Someone says his name.

His shoulders climb toward his ears before he can stop them.

### Pressure choice

- `force_ignore` — **Don't look at them. Force the sequence through.**
- `slow_breathing` — **Reset his breathing before the next movement.**
- `repeat_sequence` — **Start the sequence again from the first step.**
- `request_reset` — **Raise a hand. "Can I reset?"**

Branch narration should show the physical consequence of the selected coping response without assigning a Trait.

### Falling equipment

A badly stacked practice rack gives a wooden crack behind the watching students.

Metal sees the student's face change before he hears the shout.

The rack is already coming down.

- `grab_student` — **Break form and pull the student clear.**
- `block_equipment` — **Get under the rack and stop it.**
- `shout_warning` — **Shout now—give them the second they need.**
- `keep_form` — **Trust someone closer to handle it and finish the sequence.**

### Closing — replace designer summary

After the rack is secured, Metal notices his hands are shaking.

Not during the movement.

Now.

A classmate looks at the damaged chalk line, then at him.

[CLASSMATE]

"You were doing way better before we came out."

Metal shuts his eyes for one second.

[METAL]

"I know."

He opens them, walks back to the first chalk mark and places his heel on it again.

[METAL]

"So... stay."

---

# 9. ACADEMY KAKASHI — SCREEN-FIRST BENCHMARK

## Voice / physical anchor

Young Kakashi is a prodigy: observant, controlled, economical and confident. He should not explain his intelligence to the player. Let the player inhabit it through what he notices and what he chooses not to say. Living Sakumo is calm, perceptive and warm without becoming sentimental or lecturing.

This Origin remains a restricted Academy retrieval assessment. Kakashi has **no Sharingan and no Chidori**. It is not ANBU membership.

### Beat `kak_brief` — REPLACE

The Academy evaluator lays a small route map on the table. A thumb-sized seal marks the packet.

He slides both toward Kakashi.

[ACADEMY EVALUATOR]

"Recover the packet."

Kakashi looks at the map once.

The evaluator keeps one finger on it.

[ACADEMY EVALUATOR]

"And Hatake? Bring back what you can prove. Not what you assume."

Kakashi lifts his eyes to him.

[KAKASHI]

"Those are usually the same thing."

The evaluator releases the map.

[ACADEMY EVALUATOR]

"Today would be a good day to learn the difference."

### Beat `kak_clerk` — REPLACE

Market noise hides footsteps badly if you know which ones to ignore.

The logistics clerk keeps one hand close to the sealed packet under his coat. At the next stall, he checks a shop-window reflection.

Ten steps later, he checks the same reflection again.

Kakashi stays inside the crowd and watches his shoulders instead of his face.

The clerk is expecting someone.

He might also be expecting Kakashi.

Choices preserve IDs:

- `shadow_the_clerk` — **Stay in his blind spot. See who receives the packet.**
- `question_the_clerk` — **Step out now. Make him explain the route.**
- `cut_ahead` — **Leave him behind. Get ahead of the handoff.**

### Beat `kak_exchange` — REPLACE branch presentation

If `shadow_the_clerk`:

The clerk enters a narrow service lane and scratches twice at his wrist.

A woman sorting invoices at a tea stall does not look up. She only extends one hand beneath the counter.

The packet changes hands.

Kakashi sees the clerk leave empty-handed.

He also hears a roof tile click above him.

Steel flashes in the reflection of a rain barrel.

At the far end of the lane, another figure suddenly breaks into a run carrying a packet-shaped bundle in plain sight.

Too obvious.

Possibly the point.

If `question_the_clerk`:

Kakashi steps into the clerk's path.

[KAKASHI]

"You're off the assigned route."

The clerk's hand twitches toward the packet.

[CLERK]

"And you're early."

Not a denial.

The clerk shifts sideways toward a tea stall while answering. Kakashi catches the movement but not the full transfer cleanly.

A roof tile clicks overhead.

Someone at the far end of the lane runs with a packet-shaped bundle.

If `cut_ahead`:

Kakashi leaves the clerk before the custody chain resolves and cuts across two roofs to the predicted exchange point.

He arrives first.

That gives him position.

It does not give him proof of what happened behind him.

A figure enters the lane carrying an obvious packet-shaped bundle just as steel whispers free somewhere above.

Kakashi's eyes narrow.

### Beat `kak_choice` — REPLACE

The real problem arrives all at once.

The broker's hand is near the packet Kakashi can actually account for. A blade gleams on the roofline. The runner is disappearing into the crowd.

Kakashi cannot watch all three directions and pretend that counts as a decision.

- `secure_package` — **Stay on the packet he can account for. Take it from the broker.**
- `fight_assassin` — **Turn toward the blade. Stop the attacker first.** *(Battle remains fail-closed until exact opposition package is available.)*
- `pursue_apparent_carrier` — **Let the packet go. Chase the runner before they vanish.**

### Beat `kak_debrief` — REPLACE

Do **not** summarize the rubric.

If packet secured, place the recovered packet physically on the evaluator's table. If lost, leave that space empty and place only the route map / notes / recovered evidence supported by the branch.

The evaluator does not look at Kakashi first.

He looks at the evidence.

[ACADEMY EVALUATOR]

"Start where you knew."

Kakashi is silent for a moment.

Branch-aware answer:

- `shadow_the_clerk` + secure: **"The clerk transferred it to the broker. I watched both hands. I stayed on that packet."**
- `shadow_the_clerk` + pursue: **"The broker had the packet. I left it to follow the runner."**
- `question_the_clerk`: **"I knew the clerk was off-route. I didn't see enough of the handoff to call the rest certainty."**
- `cut_ahead`: **"I predicted the exchange point. I didn't witness the custody chain."**

The evaluator finally looks up.

[ACADEMY EVALUATOR]

"And the thing you guessed correctly?"

Kakashi's gaze shifts once to the route map.

[KAKASHI]

"Still a guess."

No designer explanation follows.

### Reflection semantics — preserve IDs but REMOVE questionnaire presentation

Do not show `What does Kakashi think mattered most?` as a free-floating survey.

Instead, the evaluator asks:

[ACADEMY EVALUATOR]

"One answer before you go. What did the exercise punish?"

Choices:

- `objective` — **"Losing sight of the objective."**
- `proof` — **"Treating an inference like evidence."**
- `responsibility` — **"Trying to own every problem in the street."**

The selected line is Kakashi's spoken answer. Do **not** make him repeat it again on the next screen.

### Beat `kak_sakumo` — REPLACE ENTIRE ENDING

Evening at the Hatake home.

Sakumo is at the low table repairing a strap on his field pack when Kakashi comes in. He glances up once, then at Kakashi's hands.

If packet secured, Kakashi's hands are empty now but carry the faint red pressure mark left by the seal cord. If packet lost, use another branch-neutral sign of the day: dust at the knee, scraped glove, folded route map.

[SAKUMO]

"Assessment?"

[KAKASHI]

"Finished."

Sakumo waits.

Kakashi starts past him.

[SAKUMO]

"That good, huh?"

Kakashi stops.

Branch response consumes `kakashiReflection` without repeating the menu line mechanically:

- `objective`: Kakashi glances toward Sakumo. **"I had the job in front of me. Everything else kept trying to become the job."**
- `proof`: **"I was right about something I couldn't prove."** A beat. **"I don't like that those are different."**
- `responsibility`: **"There were three things to do and one of me."**

Sakumo puts the strap down.

If `objective`:

[SAKUMO]

"Objectives are useful."

Kakashi raises an eyebrow at the pause.

[SAKUMO]

"So is noticing what they cost you."

If `proof`:

[SAKUMO]

"Good."

[KAKASHI]

"I said I was wrong."

[SAKUMO]

"No. You said you noticed the difference."

If `responsibility`:

[SAKUMO]

"That's going to keep happening."

Kakashi's eyes narrow slightly.

[KAKASHI]

"Helpful."

Sakumo smiles.

[SAKUMO]

"I thought so."

Final beat for all branches:

Kakashi drops his pouch beside the door and sits across from his father.

Sakumo pushes the half-repaired strap toward him.

[SAKUMO]

"Since you're here. Hold that."

Kakashi takes the strap without complaint.

The scene closes on the two of them working at the same table.

---

# 10. ACADEMY OBITO

## Voice / physical anchor

Young Obito is earnest, expressive, ambitious and chronically vulnerable to the fact that other people need things while he is trying to get somewhere. His Hokage dream is sincere, not a punchline. The route should accumulate urgency through the street itself.

### Opening — replace `obi_depart`

Obito nearly trips over his own sandal tying it too fast.

From the street, a distant Academy bell rings once.

[OBITO]

"Plenty of time."

He says it while already running.

The fundamentals session matters. He knows the order. Stamina, weapons, fire practice, taijutsu. If he gets there cleanly, he gets all of it.

Then somebody calls for help from the next street.

Obito squeezes his eyes shut for half a second.

[OBITO]

"Of course."

### Five diversions

Keep all existing machine choice IDs. Present each as a brief lived encounter, not an abstract diversion ledger.

**Furniture:** an older civilian is losing a fight with a cabinet wedged diagonally in a doorway.

- full: **"Move. I've got the heavy end."**
- bounded: **Brace it, free the corner and get moving again.**
- continue: Obito looks at the Academy clocktower and keeps running.

**Vegetables:** a basket bursts across a busy lane; tomatoes roll toward cart wheels.

- full: **Drop down and gather everything.**
- bounded: **Kick the nearest produce out of traffic and clear the lane.**
- continue: **Jump the spill and keep going.**

**Lost equipment:** the Academy custodian is muttering while searching under benches.

- full: **Join the search until the missing practice gear turns up.**
- bounded: **Check the likely drop points along his route and call back what he finds.**
- continue: **Leave it to Academy staff. Training is the other direction.**

**Overturned delivery:** crates have spilled across the road.

- full: **Help lift the cart and reload it.**
- bounded: **Drag the dangerous obstruction clear so traffic can move.**
- continue: **Vault the mess and take the side lane.**

**Runaway cart:** wheels hammer against stone; somebody screams.

- `cart_intercept`: **Plant himself in its path and stop it.**
- `cart_warn_and_redirect`: **Shout people clear and redirect the lane before it hits them.**
- `cart_continue`: **Keep running. Someone closer is already moving.**

### Arrival — replace `obi_arrival`

If direct/no delays:

Obito hits the training gate hard enough that one sandal skids sideways.

The instructor checks the sun, then Obito.

[INSTRUCTOR]

"You're early."

Obito straightens so fast it almost becomes a salute.

[OBITO]

"Obviously."

Every training block is still ahead of him.

If delayed:

Obito reaches the approach breathing hard, dust on his knees or hands reflecting the actual diversions he chose.

He can hear training already underway beyond the wall.

Do **not** display entitlement classifications or invent the amount of training available. Preserve the truthful fail-closed timing boundary until World/runtime supplies exact elapsed-arrival authority.

### Full training — replace `obi_training`

For the legitimate direct FULL route, show a compact montage as lived beats:

The conditioning lap burns first.

Then wooden weapons knock against his forearms until he stops over-gripping.

At the fire-practice line, Obito wipes sweat from his upper lip, makes the sign again and watches the Academy-scale flame finally hold its shape.

By taijutsu closing drill, his legs are shaking.

He grins anyway.

[OBITO]

"Again."

### Reflection — replace `obi_reflect`

After training, Obito sits on the outer rail with the Hokage Monument visible between rooftops.

Choices become actual internal/spoken thought:

- `hokage_still` — **"I'm still going to be Hokage."**
- `faster_next` — **"Next time I'm getting here faster."**
- `people_mattered` — **"Those people mattered too."**
- `prove_it` — **"Fine. I'll prove it next time."**

### Closing — replace `obi_end`

A passing student hears enough to snort.

[STUDENT]

"You say that every time."

Obito pushes his goggles up and points at the Monument.

[OBITO]

"Good. Means you'll remember who called it first."

He hops off the rail and starts home before the student can answer.

No lateness/personality/morality system explanation is displayed.

---

# 11. ACADEMY MENMA

## Voice / physical anchor

Academy Menma begins gifted, proud, loved and protected. He knows the Nine-Tails is inside him and has acquaintance-level internal contact, but no automatic combat assistance. He enjoys being talented, wants stronger challenges and resents adults deciding he is not ready to demonstrate more.

The Nine-Tails is ancient, amused and interested—not a friendly pet.

### Scene 1 — Academy recognition boundary

Iruka drops the marked practice sheet onto Menma's desk.

Every line is clean.

[IRUKA]

"Again."

Menma looks at the sheet, then at him.

[MENMA]

"Why?"

[IRUKA]

"Because doing it once isn't mastery."

Menma leans back in his chair.

[MENMA]

"I can do more."

Iruka's expression softens by exactly enough to irritate him.

[IRUKA]

"I know. You're still doing this."

Menma glances toward the higher-level practice materials locked in the side cabinet.

[IRUKA]

"Don't."

[MENMA]

"I didn't do anything."

[IRUKA]

"You looked at the lock like it insulted you personally."

A couple of students laugh. Menma stands and shoulders his bag.

[IRUKA]

"Class isn't finished."

Menma reaches the door.

[MENMA]

"Mine is."

### Scene 2 — forest / discovery

Objective remains **Clear your head.**

Menma gets far enough into the wooded outskirts that the village noise disappears.

A bird launches suddenly from a tree line ahead.

Then another.

A dull impact carries through the woods.

Menma stops.

Inside him, something large pays attention.

[NINE-TAILS — INTERNAL]

"Interesting."

[MENMA — INTERNAL]

"What?"

[NINE-TAILS]

"You wanted to test yourself."

Another impact. Closer now.

[NINE-TAILS]

"There's your chance."

Menma's mouth pulls sideways.

[MENMA]

"I don't need your permission."

[NINE-TAILS]

"I didn't give it."

A beat.

Menma turns toward the fighting.

[MENMA]

"...But you're right."

He starts moving.

[MENMA]

"Let's go."

### Scene 3 — clearing / Battle commitment

Menma reaches the clearing low behind the roots of a fallen tree.

Anko is already there.

One altered subject keeps forcing her backward through sheer close-range pressure. Another lashes out unpredictably near the edge of the fight. A third—a woman whose old shinobi movement still shows beneath whatever was done to her—breaks away toward the trees.

Anko catches movement in Menma's direction.

[ANKO]

"...Menma?"

Her expression changes from recognition to disbelief.

[ANKO]

"What are you doing here?"

Menma steps out from cover.

[MENMA]

"You looked like you needed help."

Anko drives an elbow into the Brute and snaps back:

[ANKO]

"I don't."

Menma looks toward the Altered Shinobi breaking away.

[MENMA]

"She does."

Anko's eyes widen.

[ANKO]

"Get back!"

Menma smirks and rushes her.

**TUTORIAL BATTLE STARTS.**

Do not extend pre-Battle dialogue.

### Post-Battle — performance reaction

Return to the same clearing using Combat's real result/evidence.

Anko gets to Menma, grabs his chin or shoulder only as physically appropriate to the returned injury/performance state, and looks him over without asking permission.

[ANKO]

"You're not bad, kid."

She looks past him at the resolved opponent, then back.

[ANKO]

"Still a pretty dangerous situation to throw yourself into."

[MENMA]

"I'm fine."

[MENMA]

"They weren't anything special."

[ANKO]

"Hold still."

Performance expression:

- **high:** Anko checks him, finds less damage/cost than expected and gives him a reluctant, impressed look. **"Okay. That's annoyingly good."**
- **middle:** **"You handled yourself. Don't make me turn that into permission."**
- **low:** Menma says **"I won."** Anko looks him up and down. **"Yeah. I'm looking at the price tag."**

All converge:

[ANKO]

"You had no idea what you were jumping into."

[MENMA]

"I won."

[ANKO]

"That's not what I said."

If and only if Anko legitimately observed qualifying dangerous/Kinjutsu use, preserve the existing evidence-gated exchange:

[ANKO]

"Those are some dangerous skills you've got, kid."

[ANKO]

"I've got some of my own, you know."

[MENMA]

"You'll have to teach me sometime."

[ANKO]

"Maybe. When you learn when not to use yours."

Optional meaningful response may still express interest / deflect / remain silent without morality labels.

### Origin closing

Later, with the immediate danger behind him, Menma walks alone beneath the trees again.

The adrenaline is finally wearing off.

[NINE-TAILS — INTERNAL]

"You were right."

Menma keeps walking.

[MENMA]

"About what?"

[NINE-TAILS]

"They were holding you back."

Menma slows by half a step.

He does not answer.

That silence is the end of the Origin—not agreement, not rejection.

Then transition through the existing **YOUR CHRONICLE BEGINS** boundary.

---

# 12. Implementation projection rules

Coding / Runtime should consume this package as **presentation/expression authority over the existing semantic graph**.

Required:

1. Preserve existing machine scene IDs / choice IDs / consequence bindings wherever already authoritative.
2. Replace exposed designer/system narration with the exact scene-first projection above or a mechanically equivalent transcription approved by Writing.
3. Where this package adds dialogue/narration beats between existing semantic choices, those beats are presentation beats and must not create new Story facts unless an existing occurrence already supports them.
4. Keep paragraphs screen-sized. Do not merge several beats into one wall of text simply because they share a semantic node.
5. Do not show fail-closed developer explanations as in-world prose. Disabled options may have concise UI availability text outside Story presentation.
6. Player-facing choice labels should sound like immediate intent/action, not schema labels.
7. The selected reflection/intent should normally resolve through character dialogue/action. Do not repeat the selected label on the following screen as a one-line pseudo-scene.
8. Use speaker identity only when someone actually speaks. Avoid `NARRATION ACTION` labels that expose implementation vocabulary if UI can present ordinary narration.
9. Origin completion remains the existing continuity boundary. Do not manufacture additional rewards, Progression or Shared History from the expression rewrite.

## 13. Quality acceptance

The Origin expression pass is Writing-complete only when all ten have a player-facing path in which:

- scene action is understandable without system explanation;
- named character voice is distinct;
- at least the meaningful relationship/pressure beats use physical response rather than abstract commentary;
- choices arise from immediate scene problems;
- no exposed engine guardrail prose appears as Story;
- endings resolve as scenes rather than design summaries;
- semantic history remains unchanged.

**Writing authority closed by this file. Runtime implementation and installed-browser Golden remain separate.**