// ALPHA ORIGIN 32900-C — Academy Obito #331 runtime + owner-required fresh player-facing rewrite successor.
// Issue #331 / CE timing authority 2026-09-23.
// Academy Kakashi remains intentionally absent here; Kakashi V2 owns its own clean-room line.
(function installAlphaOrigin32900C(){
"use strict";
const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)throw new Error("alpha_origin_32900_core_required");
const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);
const ORIGIN_ID="academy_obito";
const SCENE_ID=A.sceneByVariant.academy_obito;
const TIMING_AUTHORITY="Academy_Obito_Final_Journey_Timing_and_Runtime_Replacement_Reconciliation_2026-09-23";
const FINAL_STORY_AUTHORITY="Academy_Obito_Origin_Fresh_Player_Facing_Rewrite_2026-09-30";
const PERFORMANCE={
  "obi_depart": [
    {
      "cueId": "obi_depart_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito tears into the morning street with one hand still pulling his goggles into place. The Academy bell carries over the roofs."
    },
    {
      "cueId": "obi_depart_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "His foot catches the edge of a paving stone. He turns the stumble into three faster steps and keeps going. The Hokage Monument appears between the buildings ahead."
    },
    {
      "cueId": "obi_depart_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "No. Not today. I'm making it."
    },
    {
      "cueId": "obi_depart_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "He points toward the Monument as he runs."
    },
    {
      "cueId": "obi_depart_fresh_box_05",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "And I'm getting up there too. Just not before training."
    }
  ],
  "obi_furniture_intro": [
    {
      "cueId": "obi_furniture_intro_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "A wardrobe blocks half a residential lane. One corner is jammed in a doorway while a woman braces the other side with her shoulder. Every shove makes the furniture lean farther toward the street."
    },
    {
      "cueId": "obi_furniture_intro_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito slows before he means to."
    },
    {
      "cueId": "obi_furniture_intro_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "CIVILIAN",
      "singlePage": true,
      "text": "If you're going to stand there, pick a side."
    }
  ],
  "obi_furniture_help": [
    {
      "cueId": "obi_furniture_help_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito drops his bag and gets under the lower edge before the woman can organise him. He changes the angle, counts them into one hard lift and nearly follows the wardrobe through the doorway when it finally clears."
    },
    {
      "cueId": "obi_furniture_help_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "His grin lasts until the Academy bell reaches the lane again. He snatches up his bag and bolts."
    }
  ],
  "obi_furniture_continue": [
    {
      "cueId": "obi_furniture_continue_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito's hands rise before he catches himself. He forces them back to his sides, slips around the wardrobe and calls an apology over his shoulder without stopping."
    },
    {
      "cueId": "obi_furniture_continue_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "By the end of the lane he is running hard enough that turning back would take a decision of its own."
    }
  ],
  "obi_vegetables_intro": [
    {
      "cueId": "obi_vegetables_intro_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Something round clips Obito's sandal. A daikon rolls past him, followed by two onions and a tomato escaping from a split market basket."
    },
    {
      "cueId": "obi_vegetables_intro_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The vegetable vendor is already on one knee, catching what she can before the lane carries the rest away."
    },
    {
      "cueId": "obi_vegetables_intro_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "VENDOR",
      "singlePage": true,
      "text": "If you're keeping that one, you still have to pay for it."
    }
  ],
  "obi_vegetables_help": [
    {
      "cueId": "obi_vegetables_help_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito lunges after the produce as if the vegetables have personally challenged him. He traps an onion with his heel, catches the tomato before it reaches a cart wheel and sends the daikon back into the basket from farther away than necessary."
    },
    {
      "cueId": "obi_vegetables_help_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The vendor gives him one sharp nod. Obito is already running again."
    }
  ],
  "obi_vegetables_continue": [
    {
      "cueId": "obi_vegetables_continue_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "The daikon rolls beyond him. Obito watches it for one extra step, jaw tight, then keeps his eyes on the road."
    },
    {
      "cueId": "obi_vegetables_continue_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Behind him, the vendor is still moving quickly enough to make it obvious she has not stopped working just because he did not."
    }
  ],
  "obi_equipment_intro": [
    {
      "cueId": "obi_equipment_intro_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Near the Academy approach, an equipment custodian has two training bundles open on the pavement and an empty strap in his hands. Obito recognises the Academy markings immediately."
    },
    {
      "cueId": "obi_equipment_intro_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The custodian is checking the road behind him instead of the bundles now."
    },
    {
      "cueId": "obi_equipment_intro_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "CUSTODIAN",
      "singlePage": true,
      "text": "If you saw a bundle of practice weapons on this road, now would be an excellent time to remember."
    }
  ],
  "obi_equipment_help": [
    {
      "cueId": "obi_equipment_help_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito doubles back along the route the custodian points out. A strip of Academy cloth shows beneath a low delivery platform where the missing bundle slid out of sight."
    },
    {
      "cueId": "obi_equipment_help_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "He drops flat, drags it free and thrusts it at the custodian with a look that clearly expects this to count for something. Then he notices the Academy roof beyond the lane and takes off before he can start arguing his case."
    }
  ],
  "obi_equipment_continue": [
    {
      "cueId": "obi_equipment_continue_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito recognises how easily he could start searching. That is exactly why he does not."
    },
    {
      "cueId": "obi_equipment_continue_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "He shakes his head, points himself toward the Academy again and runs while the custodian keeps working the route behind him."
    }
  ],
  "obi_delivery_intro": [
    {
      "cueId": "obi_delivery_intro_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "A handcart has tipped onto its side across the main street. Crates have spilled into the lane. The delivery worker is already braced against the frame, trying to lever the cart upright without sending the load over with it."
    },
    {
      "cueId": "obi_delivery_intro_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "There is just enough room to pass on the right."
    },
    {
      "cueId": "obi_delivery_intro_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "DELIVERY WORKER",
      "singlePage": true,
      "text": "Lane's open. Don't make this harder."
    }
  ],
  "obi_delivery_help": [
    {
      "cueId": "obi_delivery_help_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito ignores the open lane, drops his bag and gets his shoulder under the lower rail. The worker starts to wave him off, sees the leverage and changes position instead."
    },
    {
      "cueId": "obi_delivery_help_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Together they heave the cart upright. Before the last crate settles, the worker jerks a thumb toward the Academy. Obito grabs his bag and runs."
    }
  ],
  "obi_delivery_continue": [
    {
      "cueId": "obi_delivery_continue_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito takes the open side exactly as the worker told him to. For once, the problem has room around it and somebody already handling it."
    },
    {
      "cueId": "obi_delivery_continue_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "He uses the gap. The scrape of the cart fades behind him as the Academy gets closer."
    }
  ],
  "obi_cart_intro": [
    {
      "cueId": "obi_cart_intro_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "The Academy gate is finally in sight when a handcart breaks loose higher on the slope. Its owner sprints after it, but the cart is gaining speed."
    },
    {
      "cueId": "obi_cart_intro_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito can reach the gate in seconds. He can also reach the rear rail before the cart hits the turn."
    },
    {
      "cueId": "obi_cart_intro_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "CIVILIAN",
      "singlePage": true,
      "text": "Grab the brake!"
    }
  ],
  "obi_cart_help": [
    {
      "cueId": "obi_cart_help_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito catches the rear rail with both hands. His sandals skid, the cart drags him two ugly steps downhill, and then the owner reaches the other side."
    },
    {
      "cueId": "obi_cart_help_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Together they wrench it straight and stop it before the turn. The Academy bell rings. Obito's head snaps toward the gate. He lets go and runs."
    }
  ],
  "obi_cart_continue": [
    {
      "cueId": "obi_cart_continue_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito turns for the Academy gate. The cart rattles down the slope behind him while its owner keeps chasing."
    },
    {
      "cueId": "obi_cart_continue_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "He does not look back again. The training yard is directly ahead now."
    }
  ],
  "arrival_FULL": [
    {
      "cueId": "arrival_FULL_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito reaches the training ground while the class is still forming up. He slows inside the gate, checks the untouched equipment racks and realises he has not actually missed anything."
    },
    {
      "cueId": "arrival_FULL_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The relief comes out as a grin he cannot hide."
    },
    {
      "cueId": "arrival_FULL_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "ACADEMY INSTRUCTOR",
      "singlePage": true,
      "text": "Line up. You can celebrate after conditioning."
    },
    {
      "cueId": "arrival_FULL_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito is in line before the sentence finishes."
    }
  ],
  "arrival_SUBSTANTIAL": [
    {
      "cueId": "arrival_SUBSTANTIAL_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito reaches the yard as the conditioning group breaks formation. Students are catching their breath while the weapons racks come forward."
    },
    {
      "cueId": "arrival_SUBSTANTIAL_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "He looks from the finished circuit to the next drill and straightens."
    },
    {
      "cueId": "arrival_SUBSTANTIAL_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "ACADEMY INSTRUCTOR",
      "singlePage": true,
      "text": "Conditioning's over. Weapons line."
    },
    {
      "cueId": "arrival_SUBSTANTIAL_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito moves before there is anything else to say."
    }
  ],
  "arrival_REDUCED": [
    {
      "cueId": "arrival_REDUCED_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "The weapons are already being returned when Obito reaches the yard. Scuffed target marks and tired arms tell him exactly how much of the session happened without him."
    },
    {
      "cueId": "arrival_REDUCED_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "He drops his bag beside the line."
    },
    {
      "cueId": "arrival_REDUCED_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "ACADEMY INSTRUCTOR",
      "singlePage": true,
      "text": "Ninjutsu line. Move."
    },
    {
      "cueId": "arrival_REDUCED_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito moves."
    }
  ],
  "arrival_MINIMAL": [
    {
      "cueId": "arrival_MINIMAL_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito reaches the gate to find the class pairing off for the closing drill. The equipment is away. The Ninjutsu markers are already dark from use."
    },
    {
      "cueId": "arrival_MINIMAL_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "His face falls once. Then he pulls his bag off his shoulder."
    },
    {
      "cueId": "arrival_MINIMAL_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "ACADEMY INSTRUCTOR",
      "singlePage": true,
      "text": "Last block. Taijutsu."
    },
    {
      "cueId": "arrival_MINIMAL_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito drops the bag and steps onto the yard."
    }
  ],
  "training_stamina": [
    {
      "cueId": "training_stamina_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito attacks the first conditioning lap as if finishing first will erase the fact that he nearly arrived late. By the next circuit his breathing exposes the plan."
    },
    {
      "cueId": "training_stamina_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The instructor signals him to settle the pace. Obito hates the correction, follows it anyway, and finishes stronger than he started."
    }
  ],
  "training_bukijutsu": [
    {
      "cueId": "training_bukijutsu_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito's first wooden throw is all force and poor placement. He stares at where it lands, resets his feet and this time lets the weapon go cleanly instead of trying to overpower the target."
    },
    {
      "cueId": "training_bukijutsu_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The next strike sits much closer to centre. He reaches for another before anyone praises him."
    }
  ],
  "training_ninjutsu": [
    {
      "cueId": "training_ninjutsu_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "The first Academy-scale Fire attempt flares too fast and collapses. Obito's embarrassment is immediate; being Uchiha makes the weak flame sting more, not less."
    },
    {
      "cueId": "training_ninjutsu_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "He starts again with less force. The second flame holds. Small, controlled and real. His grin appears before the heat is gone."
    }
  ],
  "training_taijutsu": [
    {
      "cueId": "training_taijutsu_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito commits too early in the first exchange and gets sent into the dirt. He is back on his feet immediately."
    },
    {
      "cueId": "training_taijutsu_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The second time he waits. When the opening comes, he steps inside it instead of charging through it and completes the exchange cleanly. The final whistle catches him still ready for another round."
    }
  ],
  "obi_end_day": [
    {
      "cueId": "obi_end_day_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "The yard empties around Obito. He ties his bag more slowly than he usually does, arms heavy from whatever training he managed to reach."
    },
    {
      "cueId": "obi_end_day_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "There is no lecture waiting for him. The drills are simply over."
    },
    {
      "cueId": "obi_end_day_fresh_box_03",
      "kind": "narration",
      "singlePage": true,
      "text": "On the walk home, Konoha feels quieter than it did that morning. Obito passes corners that look ordinary again. He remembers them anyway."
    }
  ],
  "home_common": [
    {
      "cueId": "home_common_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito drops his bag by the wall and pulls off his goggles. Through the window, the Hokage Monument sits above the village exactly where it was this morning."
    },
    {
      "cueId": "home_common_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "He looks at it, then at his tired hands. Nobody is waiting for an answer from him now."
    }
  ],
  "home_all_help": [
    {
      "cueId": "home_all_help_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "He stopped every time. The wardrobe, the produce, the missing equipment, the delivery, the cart — each one took a piece of the morning, and most of the training was gone when he finally arrived."
    },
    {
      "cueId": "home_all_help_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito rubs his palms together and keeps thinking."
    }
  ],
  "home_no_help": [
    {
      "cueId": "home_no_help_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "He kept moving every time and reached the whole training session. That part feels good."
    },
    {
      "cueId": "home_no_help_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The five places where he chose not to stop still come back clearly enough that he cannot simply fall asleep and call the day finished."
    }
  ],
  "home_mixed": [
    {
      "cueId": "home_mixed_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Some problems stopped him. Some did not. At the time, each choice ended as soon as he started running again."
    },
    {
      "cueId": "home_mixed_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Sitting here, Obito finds himself replaying both kinds."
    }
  ],
  "ending_helping": [
    {
      "cueId": "ending_helping_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito reaches for his goggles and turns them over once in his hands. Missing training annoyed him."
    },
    {
      "cueId": "ending_helping_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "So did the idea of teaching himself to stop seeing people just because he was in a hurry. He puts the goggles back on."
    },
    {
      "cueId": "ending_helping_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "I'm not going to stop helping people."
    },
    {
      "cueId": "ending_helping_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "His mouth twists."
    },
    {
      "cueId": "ending_helping_fresh_box_05",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "Tomorrow I just leave earlier. A lot earlier."
    }
  ],
  "ending_training": [
    {
      "cueId": "ending_training_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito looks at the Monument again. Wanting to become Hokage is easy when he is shouting it at a mountain."
    },
    {
      "cueId": "ending_training_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "The training yard was less impressed. He pulls his bag closer and starts checking it for tomorrow."
    },
    {
      "cueId": "ending_training_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "I need to take training more seriously."
    },
    {
      "cueId": "ending_training_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "He tightens one loose strap."
    },
    {
      "cueId": "ending_training_fresh_box_05",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "Next time, I get there."
    }
  ],
  "ending_balance": [
    {
      "cueId": "ending_balance_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito counts the morning back on his fingers, gets halfway through and gives up on the fingers. The village will keep having problems."
    },
    {
      "cueId": "ending_balance_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Training will keep starting without asking where he is. He frowns at both facts as if they have teamed up against him."
    },
    {
      "cueId": "ending_balance_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "I need to get better at both."
    },
    {
      "cueId": "ending_balance_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "He points at himself."
    },
    {
      "cueId": "ending_balance_fresh_box_05",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "Earlier start. Better judgement. Easy."
    },
    {
      "cueId": "ending_balance_fresh_box_06",
      "kind": "narration",
      "singlePage": true,
      "text": "His expression says he knows it will not be easy."
    }
  ],
  "ending_question": [
    {
      "cueId": "ending_question_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Obito looks up at the Hokage Monument. Usually he imagines his own face there before anything else."
    },
    {
      "cueId": "ending_question_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Tonight he studies the faces that are already carved into the mountain. The question bothers him enough that he does not try to outrun it."
    },
    {
      "cueId": "ending_question_fresh_box_03",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "Maybe I'm looking at this wrong."
    },
    {
      "cueId": "ending_question_fresh_box_04",
      "kind": "narration",
      "singlePage": true,
      "text": "He pulls his goggles back on."
    },
    {
      "cueId": "ending_question_fresh_box_05",
      "kind": "dialogue",
      "speakerName": "OBITO",
      "singlePage": true,
      "text": "Fine. Then I'll figure out what matters most."
    }
  ],
  "obi_close": [
    {
      "cueId": "obi_close_fresh_box_01",
      "kind": "narration",
      "singlePage": true,
      "text": "Before bed, Obito leaves his bag packed beside the door instead of wherever it lands. Outside, Konoha settles beneath the Monument."
    },
    {
      "cueId": "obi_close_fresh_box_02",
      "kind": "narration",
      "singlePage": true,
      "text": "Tomorrow the village will still be there. So will training. Obito intends to meet both of them awake."
    }
  ],
  "training_intro": []
};

const ENV=Object.freeze({
  mainStreet:Object.freeze({environmentId:"obito_origin_konoha_main_street_day"}),
  residential:Object.freeze({environmentId:"obito_origin_quiet_residential_lane_day"}),
  academyApproach:Object.freeze({environmentId:"obito_origin_academy_approach_day"}),
  streetLate:Object.freeze({environmentId:"obito_origin_konoha_street_late_afternoon"}),
  streetEvening:Object.freeze({environmentId:"obito_origin_konoha_street_early_evening"}),
  trainingDay:Object.freeze({environmentId:"obito_origin_training_day"}),
  trainingLate:Object.freeze({environmentId:"obito_origin_training_late_afternoon"}),
  trainingDusk:Object.freeze({environmentId:"obito_origin_training_dusk"}),
  home:Object.freeze({environmentId:"obito_origin_home"})
});
const BACKDROPS=Object.freeze({
  obito_origin_konoha_main_street_day:"Obito Origin Backdrop/konoha_main_street.png",
  obito_origin_quiet_residential_lane_day:"Obito Origin Backdrop/quiet_residential_lane.png",
  obito_origin_academy_approach_day:"Obito Origin Backdrop/academy_approach_sloped_lane.png",
  obito_origin_konoha_street_late_afternoon:"Obito Origin Backdrop/konoha_street_late_afternoon.png",
  obito_origin_konoha_street_early_evening:"Obito Origin Backdrop/konoha_street_early_evening.png",
  obito_origin_training_day:"Obito Origin Backdrop/training_grounds_day.png",
  obito_origin_training_late_afternoon:"Obito Origin Backdrop/training_grounds_late_afternoon.png",
  obito_origin_training_dusk:"Obito Origin Backdrop/training_grounds_dusk.png",
  obito_origin_home:"Obito Origin Backdrop/obito_home_interior.png"
});
const diversions=Object.freeze([
  Object.freeze({key:"furniture",occurrenceId:"occ_origin_obito_furniture_assistance_resolution",diversionType:"furniture_assistance",beneficiaryRef:"obito_origin_furniture_civilian",delay:7,oldHelp:"furniture_carry_full",oldContinue:"furniture_continue",oldAmbiguous:["furniture_stabilize"]}),
  Object.freeze({key:"vegetables",occurrenceId:"occ_origin_obito_scattered_vegetables_resolution",diversionType:"scattered_vegetables",beneficiaryRef:"obito_origin_vegetable_vendor",delay:5,oldHelp:"vegetables_collect_all",oldContinue:"vegetables_continue",oldAmbiguous:["vegetables_clear_lane"]}),
  Object.freeze({key:"equipment",occurrenceId:"occ_origin_obito_lost_academy_equipment_resolution",diversionType:"lost_academy_equipment",beneficiaryRef:"obito_origin_academy_equipment_custodian",delay:8,oldHelp:"equipment_search_full",oldContinue:"equipment_continue",oldAmbiguous:["equipment_check_likely_route"]}),
  Object.freeze({key:"delivery",occurrenceId:"occ_origin_obito_overturned_delivery_resolution",diversionType:"overturned_delivery",beneficiaryRef:"obito_origin_delivery_worker",delay:9,oldHelp:"delivery_right_and_reload",oldContinue:"delivery_continue",oldAmbiguous:["delivery_clear_passage"]}),
  Object.freeze({key:"cart",occurrenceId:"occ_origin_obito_runaway_cart_resolution",diversionType:"runaway_cart",beneficiaryRef:"obito_origin_runaway_cart_civilian",delay:6,oldHelp:"cart_intercept",oldContinue:"cart_continue",oldAmbiguous:["cart_warn_and_redirect"]})
]);
const entitlementOccurrenceId="occ_origin_obito_formal_training_entitlement_resolution";
const entitlementRows=Object.freeze({FULL:"OBI-02",SUBSTANTIAL:"OBI-03",REDUCED:"OBI-04",MINIMAL:"OBI-05"});
const eligibleBlocks=Object.freeze({
  FULL:Object.freeze(["stamina","bukijutsu","ninjutsu","taijutsu"]),
  SUBSTANTIAL:Object.freeze(["bukijutsu","ninjutsu","taijutsu"]),
  REDUCED:Object.freeze(["ninjutsu","taijutsu"]),
  MINIMAL:Object.freeze(["taijutsu"])
});
const interpretationText=Object.freeze({
  KEEP_HELPING:"I'm not going to stop helping people.",
  TAKE_TRAINING_SERIOUSLY:"I need to take training more seriously.",
  FIND_BALANCE:"I need to get better at both.",
  QUESTION_FRAME:"Maybe I'm looking at this wrong. I need to figure out what matters most to me."
});
const LEGACY_IDS=Object.freeze([
  "furniture_carry_full","furniture_stabilize","furniture_continue",
  "vegetables_collect_all","vegetables_clear_lane","vegetables_continue",
  "equipment_search_full","equipment_check_likely_route","equipment_continue",
  "delivery_right_and_reload","delivery_clear_passage","delivery_continue",
  "cart_intercept","cart_warn_and_redirect","cart_continue",
  "accept_full_training","timing_pending","hokage_still","faster_next","people_mattered","prove_it"
]);

function clone(v){return A.clone(v);}
function local(){return A.local();}
function cueFallback(key){return (PERFORMANCE[key]||[]).map(c=>(c.kind==="dialogue"&&c.speakerName?c.speakerName+": ":"")+c.text).join("\n\n");}
function intentKey(spec){return "obito_"+spec.key+"Intent";}
function exactIntentFromLegacy(spec,value){
  if(value==="HELP"||value==="CONTINUE")return value;
  if(value===spec.oldHelp)return "HELP";
  if(value===spec.oldContinue)return "CONTINUE";
  if(spec.oldAmbiguous.includes(value))return "AMBIGUOUS";
  return null;
}
function selectedAcquisition(){
  try{return typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():playerData&&playerData.acquisition||null;}catch(_error){return null;}
}
function relevantHistory(){
  if(!playerData||!Array.isArray(playerData.activityHistory))return[];
  const ids=new Set([...diversions.map(d=>d.occurrenceId),entitlementOccurrenceId]);
  return playerData.activityHistory.filter(row=>row&&ids.has(row.sourceOccurrenceId||row.occurrenceId));
}
function restartAmbiguousLegacyProgress(reason){
  if(playerData&&Array.isArray(playerData.activityHistory)){
    const ids=new Set([...diversions.map(d=>d.occurrenceId),entitlementOccurrenceId]);
    playerData.activityHistory=playerData.activityHistory.filter(row=>!row||!ids.has(row.sourceOccurrenceId||row.occurrenceId));
    try{activityHistory=playerData.activityHistory;}catch(_error){}
  }
  const rt=A.active();
  if(rt&&rt.sceneId===SCENE_ID){
    rt.beatId="obi_depart";
    rt.localContext={obitoFinalMigration:{action:"restart",reason:String(reason||"ambiguous_pre_final_choice"),authority:TIMING_AUTHORITY}};
    for(const key of ["processed","processedConsequences","processedRequests","resolvedConsequences"])if(rt[key]&&typeof rt[key].clear==="function")rt[key].clear();
  }
  try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
  return{success:true,restarted:true,reason};
}
function migrateLegacyObitoState(){
  const acq=selectedAcquisition(),rt=A.active();
  if((!acq||acq.chronicleOriginVariantId!==ORIGIN_ID)&&(!rt||rt.sceneId!==SCENE_ID))return{success:true,skipped:true};
  let ambiguous=null,migrated=0;
  for(const spec of diversions){
    const record=A.findOccurrence(spec.occurrenceId);
    if(record){
      const fact=record.fact&&typeof record.fact==="object"?record.fact:{};
      let intent=fact.selectedIntent;
      if(intent!=="HELP"&&intent!=="CONTINUE")intent=exactIntentFromLegacy(spec,fact.selectedResponse);
      if(intent==="AMBIGUOUS"||!intent){ambiguous=spec.key;break;}
      const finalFact={
        sourceOccurrenceId:spec.occurrenceId,
        selectedIntent:intent,
        journeyDelayMinutes:intent==="HELP"?spec.delay:0,
        obitoCausalContributionEstablished:intent==="HELP",
        obitoContribution:intent==="HELP"?"material":null,
        beneficiaryRefs:[spec.beneficiaryRef],
        worldOutcome:intent==="HELP"?"resolved_with_obito_material_contribution":"left_to_authored_world_lifecycle",
        committed:true,
        timingAuthorityVersion:TIMING_AUTHORITY
      };
      if(fact.selectedIntent!==intent||Number(fact.journeyDelayMinutes)!==finalFact.journeyDelayMinutes){
        finalFact.migratedFromObitoPreFinalChoiceId=fact.selectedResponse||null;
        record.fact=clone(finalFact);record.data=clone(finalFact);migrated++;
      }
    }
    if(rt&&rt.sceneId===SCENE_ID){
      const ctx=rt.localContext||(rt.localContext={});
      const current=ctx[intentKey(spec)]||ctx["obito_"+spec.key];
      if(current){
        const mapped=exactIntentFromLegacy(spec,current);
        if(mapped==="AMBIGUOUS"){ambiguous=spec.key;break;}
        if(mapped==="HELP"||mapped==="CONTINUE"){ctx[intentKey(spec)]=mapped;delete ctx["obito_"+spec.key];migrated++;}
      }
    }
  }
  if(ambiguous)return restartAmbiguousLegacyProgress("ambiguous_pre_final_"+ambiguous);
  if(rt&&rt.sceneId===SCENE_ID){
    const map={
      obi_furniture:"obi_furniture_choice",obi_vegetables:"obi_vegetables_choice",obi_equipment:"obi_equipment_choice",
      obi_delivery:"obi_delivery_choice",obi_cart:"obi_cart_choice",obi_entitlement:"obi_arrival",obi_training:"obi_arrival"
    };
    if(["obi_reflect","obi_reflection_result","obi_end"].includes(rt.beatId))return restartAmbiguousLegacyProgress("superseded_pre_final_reflection");
    if(map[rt.beatId]){rt.beatId=map[rt.beatId];migrated++;}
    let contiguous=0;
    for(const spec of diversions){if(A.findOccurrence(spec.occurrenceId))contiguous++;else break;}
    const resume=["obi_furniture_intro","obi_vegetables_intro","obi_equipment_intro","obi_delivery_intro","obi_cart_intro","obi_arrival"][contiguous];
    const legacyOrEntry=new Set(["obi_depart","obi_furniture_choice","obi_vegetables_choice","obi_equipment_choice","obi_delivery_choice","obi_cart_choice"]);
    if(contiguous>0&&resume&&legacyOrEntry.has(rt.beatId)){rt.beatId=resume;migrated++;}
  }
  if(migrated)try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
  return{success:true,migrated,restarted:false};
}
function diversionFact(spec,intent){
  return{
    sourceOccurrenceId:spec.occurrenceId,
    selectedIntent:intent,
    journeyDelayMinutes:intent==="HELP"?spec.delay:0,
    obitoCausalContributionEstablished:intent==="HELP",
    obitoContribution:intent==="HELP"?"material":null,
    beneficiaryRefs:[spec.beneficiaryRef],
    worldOutcome:intent==="HELP"?"resolved_with_obito_material_contribution":"left_to_authored_world_lifecycle",
    committed:true,
    timingAuthorityVersion:TIMING_AUTHORITY
  };
}
function diversionRequest(spec){
  return{requestId:"obito_final_"+spec.key+"_331",kind:"domain",resolve:()=>{
    const ctx=local(),intent=ctx[intentKey(spec)];
    if(intent!=="HELP"&&intent!=="CONTINUE")return{success:false,reason:"obito_final_intent_missing",key:spec.key};
    const existing=A.findOccurrence(spec.occurrenceId);
    if(existing&&existing.fact&&existing.fact.selectedIntent&&existing.fact.selectedIntent!==intent)return{success:false,reason:"obito_final_committed_intent_mismatch",key:spec.key,committed:existing.fact.selectedIntent,requested:intent};
    return A.commitOccurrence(ORIGIN_ID,spec.occurrenceId,diversionFact(spec,intent),intent==="HELP"?["OBI-01"]:[],{participantRefs:[spec.beneficiaryRef]});
  }};
}
function committedJourneyFacts(){
  const rows=[];
  for(const spec of diversions){
    const record=A.findOccurrence(spec.occurrenceId);
    const fact=record&&record.fact||null;
    if(!fact||!["HELP","CONTINUE"].includes(fact.selectedIntent))return{success:false,reason:"obito_final_diversion_fact_missing",key:spec.key};
    const expected=fact.selectedIntent==="HELP"?spec.delay:0;
    if(Number(fact.journeyDelayMinutes)!==expected)return{success:false,reason:"obito_final_delay_fact_invalid",key:spec.key,expected,actual:fact.journeyDelayMinutes};
    rows.push({key:spec.key,occurrenceId:spec.occurrenceId,selectedIntent:fact.selectedIntent,journeyDelayMinutes:expected});
  }
  const arrivalDelayMinutes=rows.reduce((sum,row)=>sum+row.journeyDelayMinutes,0);
  return{success:true,rows,arrivalDelayMinutes};
}
function entitlementForDelay(delay){
  const n=Number(delay);
  if(n>=0&&n<=5)return"FULL";
  if(n<=14)return"SUBSTANTIAL";
  if(n<=24)return"REDUCED";
  if(n<=35)return"MINIMAL";
  return"NONE";
}
function entitlementFact(){
  const journey=committedJourneyFacts();if(!journey.success)throw new Error(journey.reason+":"+journey.key);
  const formalTrainingEntitlement=entitlementForDelay(journey.arrivalDelayMinutes);
  return{
    sourceOccurrenceId:entitlementOccurrenceId,
    arrivalDelayMinutes:journey.arrivalDelayMinutes,
    timingAuthorityVersion:TIMING_AUTHORITY,
    formalTrainingEntitlement,
    eligibleTrainingBlocks:formalTrainingEntitlement==="NONE"?[]:[...eligibleBlocks[formalTrainingEntitlement]],
    sourceOccurrenceRefs:journey.rows.map(r=>r.occurrenceId),
    committed:true
  };
}
const entitlementRequest=R("obito_final_entitlement_331",ORIGIN_ID,entitlementOccurrenceId,()=>entitlementFact(),()=>{
  const fact=entitlementFact(),row=entitlementRows[fact.formalTrainingEntitlement];
  return row?[row]:[];
});
function currentEntitlement(){
  const record=A.findOccurrence(entitlementOccurrenceId),value=record&&record.fact&&record.fact.formalTrainingEntitlement;
  return ["FULL","SUBSTANTIAL","REDUCED","MINIMAL","NONE"].includes(value)?value:null;
}
function countHelpFromFacts(){
  const journey=committedJourneyFacts();if(!journey.success)return null;
  return journey.rows.filter(r=>r.selectedIntent==="HELP").length;
}
function historyStore(){if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];return playerData.activityHistory;}
function commitInterpretationRequest(){
  return{requestId:"obito_final_interpretation_331",kind:"domain",resolve:()=>{
    const rt=A.active(),ctx=local(),id=ctx.obitoFinalInterpretation,text=interpretationText[id];
    if(!rt||rt.sceneId!==SCENE_ID||!text)return{success:false,reason:"obito_final_interpretation_missing"};
    const key="academy_obito_final_self_interpretation";
    const history=historyStore(),existing=history.find(row=>row&&row.historyKey===key&&row.actorVariantId===ORIGIN_ID);
    if(existing){
      if(existing.fact&&existing.fact.interpretationId===id)return{success:true,idempotent:true,historyKey:key};
      return{success:false,reason:"obito_final_interpretation_already_committed"};
    }
    const fact={interpretationId:id,interpretationText:text,selfInterpretationOnly:true,behaviourRewritten:false,committed:true,authority:FINAL_STORY_AUTHORITY};
    history.push({historyKey:key,type:"origin_self_interpretation",activity:"story_scene",completed:true,committed:true,actorVariantId:ORIGIN_ID,protagonistParticipantId:ORIGIN_ID,sceneId:SCENE_ID,storySceneInstanceId:rt.instanceId||null,fact:clone(fact),data:clone(fact),timestamp:Date.now()});
    try{activityHistory=playerData.activityHistory;}catch(_error){}
    try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
    return{success:true,historyKey:key,fact:clone(fact)};
  }};
}

function storyBeat(beatId,key,nextBeatId,extra={}){
  return{beatId,mode:"narration",text:cueFallback(key),nextBeatId,...extra};
}
function choiceBeat(beatId,text,choices,environmentRef=ENV.mainStreet){
  return{beatId,mode:"choice",text,choices,environmentRef};
}
const [furniture,vegetables,equipment,delivery,cart]=diversions;
const interpretationRequest=commitInterpretationRequest();

const definition={
  sceneId:SCENE_ID,eventId:SCENE_ID,title:"ACADEMY OBITO",entryBeatId:"obi_depart",participants:[],beats:[
    storyBeat("obi_depart","obi_depart","obi_furniture_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[{requestId:"obito_final_migration_331",kind:"domain",resolve:migrateLegacyObitoState}]}),

    storyBeat("obi_furniture_intro","obi_furniture_intro","obi_furniture_choice",{environmentRef:ENV.residential}),
    choiceBeat("obi_furniture_choice","",[
      C("furniture_help","Help her move it","obi_furniture_help",{[intentKey(furniture)]:"HELP"}),
      C("furniture_continue_final","Keep going","obi_furniture_continue",{[intentKey(furniture)]:"CONTINUE"})
    ],ENV.residential),
    storyBeat("obi_furniture_help","obi_furniture_help","obi_vegetables_intro",{environmentRef:ENV.residential,onEnterConsequences:[diversionRequest(furniture)]}),
    storyBeat("obi_furniture_continue","obi_furniture_continue","obi_vegetables_intro",{environmentRef:ENV.residential,onEnterConsequences:[diversionRequest(furniture)]}),

    storyBeat("obi_vegetables_intro","obi_vegetables_intro","obi_vegetables_choice",{environmentRef:ENV.mainStreet}),
    choiceBeat("obi_vegetables_choice","",[
      C("vegetables_help","Help gather the produce","obi_vegetables_help",{[intentKey(vegetables)]:"HELP"}),
      C("vegetables_continue_final","Keep going","obi_vegetables_continue",{[intentKey(vegetables)]:"CONTINUE"})
    ],ENV.mainStreet),
    storyBeat("obi_vegetables_help","obi_vegetables_help","obi_equipment_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(vegetables)]}),
    storyBeat("obi_vegetables_continue","obi_vegetables_continue","obi_equipment_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(vegetables)]}),

    storyBeat("obi_equipment_intro","obi_equipment_intro","obi_equipment_choice",{environmentRef:ENV.academyApproach}),
    choiceBeat("obi_equipment_choice","",[
      C("equipment_help","Help find the equipment","obi_equipment_help",{[intentKey(equipment)]:"HELP"}),
      C("equipment_continue_final","Keep going","obi_equipment_continue",{[intentKey(equipment)]:"CONTINUE"})
    ],ENV.academyApproach),
    storyBeat("obi_equipment_help","obi_equipment_help","obi_delivery_intro",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(equipment)]}),
    storyBeat("obi_equipment_continue","obi_equipment_continue","obi_delivery_intro",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(equipment)]}),

    storyBeat("obi_delivery_intro","obi_delivery_intro","obi_delivery_choice",{environmentRef:ENV.mainStreet}),
    choiceBeat("obi_delivery_choice","",[
      C("delivery_help","Help right the delivery","obi_delivery_help",{[intentKey(delivery)]:"HELP"}),
      C("delivery_continue_final","Keep going","obi_delivery_continue",{[intentKey(delivery)]:"CONTINUE"})
    ],ENV.mainStreet),
    storyBeat("obi_delivery_help","obi_delivery_help","obi_cart_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(delivery)]}),
    storyBeat("obi_delivery_continue","obi_delivery_continue","obi_cart_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(delivery)]}),

    storyBeat("obi_cart_intro","obi_cart_intro","obi_cart_choice",{environmentRef:ENV.academyApproach}),
    choiceBeat("obi_cart_choice","",[
      C("cart_help","Help stop the cart","obi_cart_help",{[intentKey(cart)]:"HELP"}),
      C("cart_continue_final","Go to training","obi_cart_continue",{[intentKey(cart)]:"CONTINUE"})
    ],ENV.academyApproach),
    storyBeat("obi_cart_help","obi_cart_help","obi_arrival",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(cart)]}),
    storyBeat("obi_cart_continue","obi_cart_continue","obi_arrival",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(cart)]}),

    {beatId:"obi_arrival",mode:"narration",text:"",environmentRef:ENV.trainingDay,onEnterConsequences:[entitlementRequest],nextBeatId:"obi_training"},
    {beatId:"obi_training",mode:"narration",text:"",environmentRef:ENV.trainingDay,nextBeatId:"obi_end_day"},
    storyBeat("obi_end_day","obi_end_day","obi_home",{environmentRef:ENV.trainingLate}),
    {beatId:"obi_home",mode:"narration",text:"",environmentRef:ENV.home,nextBeatId:"obi_reflect"},
    {beatId:"obi_reflect",mode:"choice",text:"",environmentRef:ENV.home,choices:[
      C("reflection_keep_helping",interpretationText.KEEP_HELPING,"obi_ending_helping",{obitoFinalInterpretation:"KEEP_HELPING"}),
      C("reflection_take_training_seriously",interpretationText.TAKE_TRAINING_SERIOUSLY,"obi_ending_training",{obitoFinalInterpretation:"TAKE_TRAINING_SERIOUSLY"}),
      C("reflection_find_balance",interpretationText.FIND_BALANCE,"obi_ending_balance",{obitoFinalInterpretation:"FIND_BALANCE"}),
      C("reflection_question_frame",interpretationText.QUESTION_FRAME,"obi_ending_question",{obitoFinalInterpretation:"QUESTION_FRAME"})
    ]},
    storyBeat("obi_ending_helping","ending_helping","obi_close",{environmentRef:ENV.home,onEnterConsequences:[interpretationRequest]}),
    storyBeat("obi_ending_training","ending_training","obi_close",{environmentRef:ENV.home,onEnterConsequences:[interpretationRequest]}),
    storyBeat("obi_ending_balance","ending_balance","obi_close",{environmentRef:ENV.home,onEnterConsequences:[interpretationRequest]}),
    storyBeat("obi_ending_question","ending_question","obi_close",{environmentRef:ENV.home,onEnterConsequences:[interpretationRequest]}),
    {beatId:"obi_close",mode:"narration",text:cueFallback("obi_close"),environmentRef:ENV.home,nextBeatId:"obi_receipt"},
    {beatId:"obi_receipt",mode:"record",text:"",exitScene:true}
  ],
  onCompleteConsequences:[X(ORIGIN_ID,[...diversions.map(x=>x.occurrenceId),entitlementOccurrenceId])]
};
A.register(definition);

function trainingSequence(){
  const entitlement=currentEntitlement();
  const out=[];
  if(entitlement==="FULL")out.push(...PERFORMANCE.training_stamina);
  if(entitlement==="FULL"||entitlement==="SUBSTANTIAL")out.push(...PERFORMANCE.training_bukijutsu);
  if(entitlement==="FULL"||entitlement==="SUBSTANTIAL"||entitlement==="REDUCED")out.push(...PERFORMANCE.training_ninjutsu);
  if(["FULL","SUBSTANTIAL","REDUCED","MINIMAL"].includes(entitlement))out.push(...PERFORMANCE.training_taijutsu);
  return out;
}
function arrivalSequence(){
  const entitlement=currentEntitlement();
  return clone(PERFORMANCE["arrival_"+entitlement]||[{kind:"narration",text:"No formal training remains available when Obito arrives."}]);
}
function obitoJourneyTailSequence(){
  const count=countHelpFromFacts();
  return count===5?PERFORMANCE.home_all_help:count===0?PERFORMANCE.home_no_help:PERFORMANCE.home_mixed;
}
function endDaySequence(){
  return[...PERFORMANCE.obi_end_day];
}
function homeSequence(){
  return[...PERFORMANCE.home_common,...obitoJourneyTailSequence()];
}
function obitoPerformanceIndex331(performance){
  return performance&&Number.isInteger(performance.sourceIndex)
    ?performance.sourceIndex
    :performance&&Number.isInteger(performance.index)?performance.index:0;
}
function obitoPerformanceSpeaker331(performance){
  return String(performance&&performance.cue&&(performance.cue.speakerName||performance.cue.speaker)||"").trim().toUpperCase();
}
function focusObitoSpeaker331(actors,performance){
  if(!actors.length)return actors;
  const speaker=obitoPerformanceSpeaker331(performance);
  let matched=false;
  for(const actor of actors){
    actor.focus=!!speaker&&String(actor.label||"").trim().toUpperCase()===speaker;
    if(actor.focus)matched=true;
  }
  if(!matched)actors[0].focus=true;
  return actors;
}
function originStartingPurseAmount331(){
  const amount=Number(globalThis.SC_ORIGIN_STARTING_PURSE_409&&globalThis.SC_ORIGIN_STARTING_PURSE_409.amount);
  return Number.isFinite(amount)&&amount>0?amount:100;
}
function buildObitoReceipt331(){
  const journey=committedJourneyFacts(),ctx=local()||{};
  const lines=["YOUR ORIGIN","ACADEMY OBITO","","RECORDED IN YOUR CHRONICLE","","YOUR DECISIONS"];
  const labels={
    furniture:{HELP:"Help her move it",CONTINUE:"Keep going"},
    vegetables:{HELP:"Help gather the produce",CONTINUE:"Keep going"},
    equipment:{HELP:"Help find the equipment",CONTINUE:"Keep going"},
    delivery:{HELP:"Help right the delivery",CONTINUE:"Keep going"},
    cart:{HELP:"Help stop the cart",CONTINUE:"Go to training"}
  };
  const names={furniture:"Furniture",vegetables:"Vegetables",equipment:"Academy equipment",delivery:"Delivery",cart:"Runaway cart"};
  if(journey&&journey.success){
    for(const row of journey.rows){
      const label=labels[row.key]&&labels[row.key][row.selectedIntent];
      if(label)lines.push("• "+names[row.key]+" — "+label+".");
    }
  }
  const reflection=interpretationText[ctx.obitoFinalInterpretation];
  if(reflection)lines.push("• Reflection — "+reflection);
  lines.push("","WHAT HAPPENED","• Reached the Academy and completed the training that remained.","","REWARDS",`• Origin Starting Purse: +${originStartingPurseAmount331()} Ryō.`);
  return lines.join("\n");
}
function boardActors(beatId,performance){
  if(beatId==="obi_receipt")return[];
  const actors=[{id:"academy_obito",image:"Assets/Academy Student/academy_obito.png",label:"OBITO",focus:false}];
  if(beatId.includes("furniture"))actors.push({id:"obito_origin_furniture_civilian",label:"CIVILIAN",image:"NPC/furniture_civilian.png",focus:false});
  else if(beatId.includes("vegetables"))actors.push({id:"obito_origin_vegetable_vendor",label:"VENDOR",image:"NPC/vegetable_vendor.png",focus:false});
  else if(beatId.includes("equipment"))actors.push({id:"obito_origin_academy_equipment_custodian",label:"CUSTODIAN",image:"NPC/equipment_custodian.png",focus:false});
  else if(beatId.includes("delivery"))actors.push({id:"obito_origin_delivery_worker",label:"DELIVERY WORKER",image:"NPC/delivery_worker.png",focus:false});
  else if(beatId.includes("cart"))actors.push({id:"obito_origin_runaway_cart_civilian",label:"CIVILIAN",image:"NPC/runaway_cart_civillian.png",focus:false});
  else if(beatId==="obi_arrival"||beatId==="obi_training"||(beatId==="obi_end_day"&&obitoPerformanceIndex331(performance)<2))actors.push({id:"obito_origin_academy_instructor",label:"ACADEMY INSTRUCTOR",image:"NPC/obito_instructor.png",focus:false});
  return focusObitoSpeaker331(actors,performance);
}
function boardLocation(beatId,performance){
  if(beatId==="obi_receipt")return"YOUR ORIGIN";
  if(beatId==="obi_arrival"||beatId==="obi_training")return"ACADEMY TRAINING GROUND";
  if(beatId==="obi_end_day")return obitoPerformanceIndex331(performance)<2?"ACADEMY TRAINING GROUND":"KONOHA · LATE AFTERNOON";
  if(beatId==="obi_home"||beatId==="obi_reflect"||beatId.startsWith("obi_ending_"))return"OBITO'S HOME";
  if(beatId==="obi_close")return"OBITO'S HOME";
  return"KONOHA · MORNING";
}
function boardBackdropEnvironment331(beatId,performance){
  const id=String(beatId||"");
  if(id==="obi_receipt")return null;
  if(id==="obi_end_day"){
    const cueIndex=obitoPerformanceIndex331(performance);
    return cueIndex>=2?ENV.streetLate.environmentId:ENV.trainingLate.environmentId;
  }
  if(id==="obi_arrival"||id==="obi_training")return ENV.trainingDay.environmentId;
  if(id==="obi_home"||id==="obi_reflect"||id==="obi_close"||id.startsWith("obi_ending_"))return ENV.home.environmentId;
  if(id.includes("furniture"))return ENV.residential.environmentId;
  if(id.includes("equipment")||id.includes("cart"))return ENV.academyApproach.environmentId;
  if(id==="obi_depart"||id.includes("vegetables")||id.includes("delivery"))return ENV.mainStreet.environmentId;
  return null;
}
function registerFinalSceneBoard(){
  if(typeof globalThis.registerStorySceneBoardDefinition!=="function")return{success:false,reason:"story_scene_board_not_loaded"};
  // Obito's fresh opening uses a single tall character card plus the compact
  // narration strip. Keep that card clear of the narration frame without
  // moving the shared Scene Board geometry used by frozen Origins.
  try{
    if(typeof document!=="undefined"&&!document.getElementById("academy-obito-scene-board-331-style")){
      const style=document.createElement("style");
      style.id="academy-obito-scene-board-331-style";
      style.textContent='#story-scene-presentation-layer[data-sc-scene-mode="obito_origin"] .sc-scene-board-33900__actors{bottom:31%!important}';
      (document.head||document.documentElement).appendChild(style);
    }
  }catch(_error){}
  const sequences={
    ...PERFORMANCE,
    obi_arrival:arrivalSequence,
    obi_training:trainingSequence,
    obi_end_day:endDaySequence,
    obi_home:homeSequence,
    obi_ending_helping:PERFORMANCE.ending_helping,
    obi_ending_training:PERFORMANCE.ending_training,
    obi_ending_balance:PERFORMANCE.ending_balance,
    obi_ending_question:PERFORMANCE.ending_question,
    obi_close:PERFORMANCE.obi_close,
    obi_receipt:()=>[{kind:"record",singlePage:true,text:buildObitoReceipt331()}]
  };
  const result=globalThis.registerStorySceneBoardDefinition(SCENE_ID,{
    resolve:({beatId,performance})=>beatId==="obi_receipt"
      ?{mode:"record",location:"YOUR ORIGIN",actors:[]}
      :({
        mode:"obito_origin",
        location:boardLocation(beatId,performance),
        objective:["obi_arrival","obi_training","obi_end_day","obi_home","obi_reflect","obi_close"].includes(beatId)||beatId.startsWith("obi_ending_")?null:"GET TO TRAINING",
        actors:boardActors(beatId,performance)
      }),
    performanceSequences:sequences,
    resolveBackdrop:({beatId,performance})=>{
      const environmentId=boardBackdropEnvironment331(beatId,performance);
      const assetPath=environmentId?BACKDROPS[environmentId]||null:null;
      return assetPath?{assetPath,environmentId}:null;
    }
  });
  try{if(result&&result.success===true&&typeof globalThis.renderStorySceneBoard33900==="function")globalThis.renderStorySceneBoard33900();}catch(_error){}
  return result;
}
globalThis.registerAcademyObitoFinalSceneBoard331=registerFinalSceneBoard;
if(globalThis.SC_STORY_SCENE_BOARD_33900){
  registerFinalSceneBoard();
}else{
  const queue=globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS||(globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS=[]);
  if(!queue.some(row=>row&&row.id==="academy_obito_final_331"))queue.push({id:"academy_obito_final_331",register:registerFinalSceneBoard});
}

function diagnostics(){
  const live=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;
  const choices=live&&live.beats?live.beats.flatMap(b=>b.choices||[]):[];
  const choiceIds=choices.map(c=>c.choiceId);
  const labels=choices.map(c=>c.label);
  const checks={
    exactFiveBinaryChoiceFamilies:[
      {help:"furniture_help",proceed:"furniture_continue_final"},
      {help:"vegetables_help",proceed:"vegetables_continue_final"},
      {help:"equipment_help",proceed:"equipment_continue_final"},
      {help:"delivery_help",proceed:"delivery_continue_final"},
      {help:"cart_help",proceed:"cart_continue_final"}
    ].every(pair=>[pair.help,pair.proceed].every(id=>choiceIds.includes(id))),
    oldChoiceIdsRetired:LEGACY_IDS.every(id=>!choiceIds.includes(id)),
    noTimingPending:!choiceIds.includes("timing_pending"),
    finalReflectionExact:Object.values(interpretationText).every(label=>labels.includes(label)),
    timingNotHelpCount:entitlementForDelay(5)==="FULL"&&entitlementForDelay(7)==="SUBSTANTIAL"&&entitlementForDelay(15)==="REDUCED"&&entitlementForDelay(35)==="MINIMAL",
    exactDelayFacts:diversions.map(d=>d.delay).join(",")==="7,5,8,9,6",
    noBattle:!JSON.stringify(definition).includes('"battle"')&&!JSON.stringify(definition).includes("PL BATTLE"),
    noSharinganGrant:!JSON.stringify(definition).includes("sharinganUnlocked")&&!JSON.stringify(definition).includes("grantSharingan"),
    sharedCompletion:definition.onCompleteConsequences.length===1,
    chronicleReceiptBeforeCompletion:(definition.beatMap instanceof Map?definition.beatMap.get("obi_close"):definition.beats.find(b=>b.beatId==="obi_close"))?.nextBeatId==="obi_receipt"&&(definition.beatMap instanceof Map?definition.beatMap.get("obi_receipt"):definition.beats.find(b=>b.beatId==="obi_receipt"))?.mode==="record"&&(definition.beatMap instanceof Map?definition.beatMap.get("obi_receipt"):definition.beats.find(b=>b.beatId==="obi_receipt"))?.exitScene===true,
    speakerLinkedActorFocus:boardActors("obi_arrival",{cue:{kind:"dialogue",speakerName:"ACADEMY INSTRUCTOR"},sourceIndex:2}).some(actor=>actor.id==="obito_origin_academy_instructor"&&actor.focus===true)&&!boardActors("obi_arrival",{cue:{kind:"dialogue",speakerName:"ACADEMY INSTRUCTOR"},sourceIndex:2}).some(actor=>actor.id==="academy_obito"&&actor.focus===true),
    dedicatedBackdropRegistry:Object.values(BACKDROPS).every(path=>path.startsWith("Obito Origin Backdrop/")),
    firstPageDedicatedBackdrop:BACKDROPS[ENV.mainStreet.environmentId]==="Obito Origin Backdrop/konoha_main_street.png",
    furnitureResidentialBackdrop:BACKDROPS[ENV.residential.environmentId]==="Obito Origin Backdrop/quiet_residential_lane.png",
    academyApproachBackdrop:BACKDROPS[ENV.academyApproach.environmentId]==="Obito Origin Backdrop/academy_approach_sloped_lane.png",
    homeDedicatedBackdrop:BACKDROPS[ENV.home.environmentId]==="Obito Origin Backdrop/obito_home_interior.png",
    endDayPresentationMovesYardToStreet:typeof boardBackdropEnvironment331==="function"&&boardBackdropEnvironment331("obi_end_day",{sourceIndex:0,index:0})===ENV.trainingLate.environmentId&&boardBackdropEnvironment331("obi_end_day",{sourceIndex:2,index:99})===ENV.streetLate.environmentId,
    paragraphPaginationCannotShiftBackdrop:boardBackdropEnvironment331("obi_end_day",{sourceIndex:0,index:99})===ENV.trainingLate.environmentId&&boardBackdropEnvironment331("obi_end_day",{sourceIndex:1,index:99})===ENV.trainingLate.environmentId,
    directBackdropPathProjection:typeof registerFinalSceneBoard==="function"&&registerFinalSceneBoard.toString().includes("return assetPath?{assetPath,environmentId}:null"),
    stableBeatBackdropProjection:boardBackdropEnvironment331("obi_depart")===ENV.mainStreet.environmentId&&boardBackdropEnvironment331("obi_furniture_choice")===ENV.residential.environmentId&&boardBackdropEnvironment331("obi_equipment_choice")===ENV.academyApproach.environmentId&&boardBackdropEnvironment331("obi_arrival")===ENV.trainingDay.environmentId&&boardBackdropEnvironment331("obi_home")===ENV.home.environmentId,
    closeRemainsHome:definition.beatMap instanceof Map?definition.beatMap.get("obi_close")&&definition.beatMap.get("obi_close").environmentRef===ENV.home:definition.beats.some(b=>b.beatId==="obi_close"&&b.environmentRef===ENV.home),
    noGenericBackdropFallback:Object.values(BACKDROPS).every(path=>!path.startsWith("Scene backdrops/")),
    freshRewriteCardinality:PERFORMANCE.obi_depart.length===5&&
      ["furniture","vegetables","equipment","delivery","cart"].every(key=>PERFORMANCE["obi_"+key+"_intro"].length===3&&PERFORMANCE["obi_"+key+"_help"].length===2&&PERFORMANCE["obi_"+key+"_continue"].length===2)&&
      ["FULL","SUBSTANTIAL","REDUCED","MINIMAL"].every(key=>PERFORMANCE["arrival_"+key].length===4)&&
      PERFORMANCE.training_intro.length===0&&
      ["stamina","bukijutsu","ninjutsu","taijutsu"].every(key=>PERFORMANCE["training_"+key].length===2)&&
      PERFORMANCE.obi_end_day.length===3&&PERFORMANCE.home_common.length===2&&
      PERFORMANCE.home_all_help.length===2&&PERFORMANCE.home_no_help.length===2&&PERFORMANCE.home_mixed.length===2&&
      PERFORMANCE.ending_helping.length===5&&PERFORMANCE.ending_training.length===5&&
      PERFORMANCE.ending_balance.length===6&&PERFORMANCE.ending_question.length===5&&PERFORMANCE.obi_close.length===2,
    freshCuesPinnedToSinglePerformancePage:Object.values(PERFORMANCE).flat().every(row=>!row||row.singlePage===true),
    authoredBoxesDoNotStackParagraphs:Object.values(PERFORMANCE).flat().every(row=>!row||!String(row.text||"").includes("\n\n")),
    narrationHasNoSpeakerPrefixes:Object.values(PERFORMANCE).flat().every(row=>!row||row.kind!=="narration"||!/^(OBITO|ACADEMY INSTRUCTOR|CIVILIAN|VENDOR|CUSTODIAN|DELIVERY WORKER):/.test(String(row.text||""))),
    requiredDialogueIsSpeakerOwned:PERFORMANCE.obi_depart[2]?.kind==="dialogue"&&PERFORMANCE.obi_depart[2]?.speakerName==="OBITO"&&
      ["FULL","SUBSTANTIAL","REDUCED","MINIMAL"].every(key=>PERFORMANCE["arrival_"+key][2]?.kind==="dialogue"&&PERFORMANCE["arrival_"+key][2]?.speakerName==="ACADEMY INSTRUCTOR")&&
      PERFORMANCE.ending_helping[2]?.speakerName==="OBITO"&&PERFORMANCE.ending_helping[4]?.speakerName==="OBITO"&&
      PERFORMANCE.ending_training[2]?.speakerName==="OBITO"&&PERFORMANCE.ending_training[4]?.speakerName==="OBITO"&&
      PERFORMANCE.ending_balance[2]?.speakerName==="OBITO"&&PERFORMANCE.ending_balance[4]?.speakerName==="OBITO"&&
      PERFORMANCE.ending_question[2]?.speakerName==="OBITO"&&PERFORMANCE.ending_question[4]?.speakerName==="OBITO",
    exactFreshChoiceLabels:[
      "Help her move it","Keep going","Help gather the produce","Help find the equipment",
      "Help right the delivery","Help stop the cart","Go to training"
    ].every(label=>labels.includes(label)),
    noRetiredCompressionProse:!JSON.stringify(PERFORMANCE).includes("Obito is already running when the Academy bell starts carrying across Konoha.")&&!JSON.stringify(PERFORMANCE).includes("Everybody says that after I stop."),
    compactEndingBeatAliases:["obi_ending_helping","obi_ending_training","obi_ending_balance","obi_ending_question","obi_close"].every(id=>registerFinalSceneBoard.toString().includes(id+":")),
    noGenericBeatPause:!JSON.stringify(PERFORMANCE).includes("A beat."),
    chronicleBeginsNotPreReceipt:!JSON.stringify(PERFORMANCE).includes("YOUR CHRONICLE BEGINS"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,authority:TIMING_AUTHORITY,browserGoldenClaimed:false};
}
globalThis.getAcademyObitoFinalJourneyFacts331=committedJourneyFacts;
globalThis.getAcademyObitoFinalEntitlement331=currentEntitlement;
globalThis.runAcademyObitoFinal331Diagnostics=diagnostics;
globalThis.SC_ACADEMY_OBITO_FINAL_331=Object.freeze({authority:TIMING_AUTHORITY,storyAuthority:FINAL_STORY_AUTHORITY,sceneId:SCENE_ID,delays:Object.freeze(Object.fromEntries(diversions.map(d=>[d.key,d.delay]))),browserGoldenClaimed:false});
migrateLegacyObitoState();
})();
