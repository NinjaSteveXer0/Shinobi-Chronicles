// ALPHA ORIGIN 32900-C — Academy Obito final production replacement.
// Issue #331 / CE timing authority 2026-09-23.
// Academy Kakashi remains intentionally absent here; Kakashi V2 owns its own clean-room line.
(function installAlphaOrigin32900C(){
"use strict";
const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)throw new Error("alpha_origin_32900_core_required");
const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);
const ORIGIN_ID="academy_obito";
const SCENE_ID=A.sceneByVariant.academy_obito;
const TIMING_AUTHORITY="Academy_Obito_Final_Journey_Timing_and_Runtime_Replacement_Reconciliation_2026-09-23";
const FINAL_STORY_AUTHORITY="Academy_Obito_Origin_Final_Cohesive_Story_Authority_2026-09-23";
const PERFORMANCE={
  "obi_depart": [
      {
          "kind": "narration",
          "text": "Obito knows he is late before he reaches the end of his street.\n\nThe Academy bell has not rung yet.\n\nThat is the good news.\n\nThe bad news is that he can already hear the village waking up between him and the training ground.\n\nShutters opening.\n\nCarts rolling.\n\nPeople calling to one another.\n\nToo many things happening in the exact direction he needs to run.\n\nObito pulls his goggles into place and accelerates.\n\nToday is supposed to be simple.\n\nGet there.\n\nTrain.\n\nStop giving Kakashi another reason to look smug.\n\nHe clears a low wall, lands badly, catches himself and keeps moving."
      },
      {
          "kind": "narration",
          "text": "The Hokage Monument appears between the rooftops.\n\nObito points at it while running."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "One day."
      },
      {
          "kind": "narration",
          "text": "A shopkeeper looks up."
      },
      {
          "kind": "dialogue",
          "speakerName": "SHOPKEEPER",
          "text": "What?"
      },
      {
          "kind": "narration",
          "text": "Obito drops his hand."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Nothing!"
      },
      {
          "kind": "narration",
          "text": "He turns the corner harder than necessary."
      }
  ],
  "obi_furniture_intro": [
      {
          "kind": "narration",
          "text": "Obito nearly runs into a wardrobe.\n\nNot beside one.\n\nInto one.\n\nThe thing is wedged sideways through a doorway while an older civilian pushes from the other end.\n\nShe catches it before it tips."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "Careful!"
      },
      {
          "kind": "narration",
          "text": "Obito stumbles back."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Why is that in the road?"
      },
      {
          "kind": "narration",
          "text": "The woman leans around the wardrobe."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "Because my doorway has declared war."
      },
      {
          "kind": "narration",
          "text": "Obito looks at the trapped corner.\n\nThen at the Academy road.\n\nThe woman follows his eyes."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "Training?"
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Yes."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "Then go."
      },
      {
          "kind": "narration",
          "text": "She puts her shoulder back against the furniture.\n\nThe wardrobe does not move.\n\nObito takes one step toward the Academy.\n\nBehind him:\n\nWood scrapes.\n\nThe woman mutters something unfriendly at the doorway."
      }
  ],
  "obi_furniture_help": [
      {
          "kind": "narration",
          "text": "Obito turns around.\n\nDrops his bag."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "You're turning it too early."
      },
      {
          "kind": "narration",
          "text": "The woman stops pushing.\n\nVery slowly:"
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "I've moved furniture longer than you've been alive."
      },
      {
          "kind": "narration",
          "text": "Obito points at the wardrobe."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "And it's winning."
      },
      {
          "kind": "narration",
          "text": "She gives him a look.\n\nObito gets both hands under the lower edge before she can send him away."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Lift when I say."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "Bossy."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Efficient."
      },
      {
          "kind": "narration",
          "text": "They lift.\n\nThe wardrobe catches again.\n\nObito shifts his grip."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Wait—back. Back."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "You said lift."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I changed my mind!"
      },
      {
          "kind": "narration",
          "text": "They angle the bottom.\n\nThe corner clears.\n\nThe wardrobe slides through.\n\nObito almost goes with it.\n\nThe woman catches the other side before it falls.\n\nThey stand there for a second.\n\nBreathing.\n\nLooking at the now-defeated furniture."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "You were right."
      },
      {
          "kind": "narration",
          "text": "Obito straightens immediately."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Obviously."
      },
      {
          "kind": "narration",
          "text": "The Academy bell sounds faintly in the distance.\n\nObito's face changes.\n\nThe woman points at the road."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "Go."
      },
      {
          "kind": "narration",
          "text": "Obito grabs his bag."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Already going!"
      },
      {
          "kind": "narration",
          "text": "He runs."
      }
  ],
  "obi_furniture_continue": [
      {
          "kind": "narration",
          "text": "Obito makes himself keep walking.\n\nThen running.\n\nThe woman is not trapped.\n\nNobody is underneath the wardrobe.\n\nIt is annoying.\n\nNot an emergency.\n\nHe knows that.\n\nThat does not stop him looking back once.\n\nThe woman has already changed her grip and is trying another angle.\n\nObito faces forward again."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "She's got it."
      },
      {
          "kind": "narration",
          "text": "He says it like he is arguing with somebody.\n\nThere is nobody beside him.\n\nHe runs faster anyway."
      }
  ],
  "obi_vegetables_intro": [
      {
          "kind": "narration",
          "text": "A daikon rolls across Obito's path.\n\nHe jumps it.\n\nA tomato follows.\n\nHe catches that one by reflex.\n\nThe vegetable vendor kneeling beside a split basket sees him holding it."
      },
      {
          "kind": "dialogue",
          "speakerName": "VENDOR",
          "text": "Good. Start with that."
      },
      {
          "kind": "narration",
          "text": "Obito stares at the tomato.\n\nThen at her."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I didn't volunteer."
      },
      {
          "kind": "narration",
          "text": "Another vegetable rolls toward the gutter.\n\nThe vendor lunges and misses it."
      },
      {
          "kind": "dialogue",
          "speakerName": "VENDOR",
          "text": "Then put it down and break its heart."
      },
      {
          "kind": "narration",
          "text": "Obito looks toward the Academy.\n\nThe tomato is still in his hand."
      }
  ],
  "obi_vegetables_help": [
      {
          "kind": "narration",
          "text": "Obito snatches the runaway vegetable before it reaches the gutter."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "These shouldn't move this fast."
      },
      {
          "kind": "dialogue",
          "speakerName": "VENDOR",
          "text": "Neither should you, apparently."
      },
      {
          "kind": "narration",
          "text": "Obito looks up."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I'm going to training."
      },
      {
          "kind": "dialogue",
          "speakerName": "VENDOR",
          "text": "Eventually."
      },
      {
          "kind": "narration",
          "text": "That earns her a glare.\n\nShe is already smiling.\n\nObito crawls halfway under a bench for the last daikon.\n\nHis bag catches on the seat."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Ow—"
      },
      {
          "kind": "dialogue",
          "speakerName": "VENDOR",
          "text": "Elite shinobi work?"
      },
      {
          "kind": "narration",
          "text": "Obito emerges holding the vegetable."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Exactly."
      },
      {
          "kind": "narration",
          "text": "They get the basket upright.\n\nThe vendor tests the split handle.\n\nIt holds.\n\nObito is already backing away."
      },
      {
          "kind": "dialogue",
          "speakerName": "VENDOR",
          "text": "Thank you."
      },
      {
          "kind": "narration",
          "text": "He stops.\n\nJust long enough."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Yeah."
      },
      {
          "kind": "narration",
          "text": "Then runs.\n\nThe vendor calls after him."
      },
      {
          "kind": "dialogue",
          "speakerName": "VENDOR",
          "text": "Wrong way!"
      },
      {
          "kind": "narration",
          "text": "Obito skids.\n\nLooks.\n\nShe points across the intersection.\n\nHe changes direction without answering.\n\nHer laugh follows him for half a street."
      }
  ],
  "obi_vegetables_continue": [
      {
          "kind": "narration",
          "text": "Obito places the tomato on the edge of the vendor's stall."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Sorry."
      },
      {
          "kind": "narration",
          "text": "She waves him on before he can explain."
      },
      {
          "kind": "dialogue",
          "speakerName": "VENDOR",
          "text": "Run, Academy boy."
      },
      {
          "kind": "narration",
          "text": "That somehow makes it harder.\n\nObito goes anyway.\n\nBehind him, another pedestrian crouches to help gather the vegetables.\n\nHe sees it.\n\nGood.\n\nObito turns forward.\n\nThis time he does not slow."
      }
  ],
  "obi_equipment_intro": [
      {
          "kind": "narration",
          "text": "The Academy custodian is standing beside two equipment bundles.\n\nThere should be three.\n\nObito knows that before the man says anything."
      },
      {
          "kind": "dialogue",
          "speakerName": "CUSTODIAN",
          "text": "Obito."
      },
      {
          "kind": "narration",
          "text": "Obito winces."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "You know I'm late, right?"
      },
      {
          "kind": "dialogue",
          "speakerName": "CUSTODIAN",
          "text": "I know you're going where this was supposed to go."
      },
      {
          "kind": "narration",
          "text": "He holds up an empty binding strap.\n\nAcademy markings.\n\nObito looks down the lane behind him."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "You lost an entire bundle?"
      },
      {
          "kind": "dialogue",
          "speakerName": "CUSTODIAN",
          "text": "I prefer ‘temporarily misplaced.’"
      },
      {
          "kind": "narration",
          "text": "Obito points at the empty strap."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "That's just losing with confidence."
      },
      {
          "kind": "narration",
          "text": "The custodian folds his arms.\n\nObito hears himself."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "...I have to go."
      }
  ],
  "obi_equipment_help": [
      {
          "kind": "narration",
          "text": "Obito crouches by the bindings."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "East storage?"
      },
      {
          "kind": "narration",
          "text": "The custodian nods."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Straight here?"
      },
      {
          "kind": "narration",
          "text": "Another nod.\n\nObito looks down the route.\n\nNot everywhere.\n\nPlaces a bundle could fall and stay hidden.\n\nLow wall.\n\nDrainage turn.\n\nDelivery platform.\n\nHe checks the wall.\n\nNothing.\n\nThe drainage turn.\n\nNothing.\n\nThen spots Academy cloth beneath a loading platform.\n\nObito drops flat and reaches under."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Found it!"
      },
      {
          "kind": "narration",
          "text": "He pulls the bundle free.\n\nDust covers the front of his shirt.\n\nThe custodian takes it."
      },
      {
          "kind": "dialogue",
          "speakerName": "CUSTODIAN",
          "text": "Good eye."
      },
      {
          "kind": "narration",
          "text": "Obito grins.\n\nThen remembers the time.\n\nThe grin dies."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "You owe me."
      },
      {
          "kind": "dialogue",
          "speakerName": "CUSTODIAN",
          "text": "For finding Academy property?"
      },
      {
          "kind": "narration",
          "text": "Obito is already running."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "YES!"
      }
  ],
  "obi_equipment_continue": [
      {
          "kind": "narration",
          "text": "Obito points toward the drainage turn."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Check there."
      },
      {
          "kind": "narration",
          "text": "The custodian looks."
      },
      {
          "kind": "dialogue",
          "speakerName": "CUSTODIAN",
          "text": "Why?"
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Because if it fell off the cart, that's where it would slide."
      },
      {
          "kind": "narration",
          "text": "The custodian starts toward it.\n\nObito starts toward the Academy."
      },
      {
          "kind": "dialogue",
          "speakerName": "CUSTODIAN",
          "text": "You could be right."
      },
      {
          "kind": "narration",
          "text": "Obito runs backward for two steps."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I usually am!"
      },
      {
          "kind": "narration",
          "text": "He turns around before the custodian can answer."
      }
  ],
  "obi_delivery_intro": [
      {
          "kind": "narration",
          "text": "The next cart is not lost.\n\nIt is sideways.\n\nCrates cover half the street.\n\nA delivery worker is trying to hold one stack upright while levering the cart wheel out of a rut.\n\nThere is a clear path around it.\n\nThe worker sees Obito slow."
      },
      {
          "kind": "dialogue",
          "speakerName": "DELIVERY WORKER",
          "text": "You can get through on the left."
      },
      {
          "kind": "narration",
          "text": "Obito looks at the gap.\n\nThen at the worker's arms shaking under the crate."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "You sure?"
      },
      {
          "kind": "dialogue",
          "speakerName": "DELIVERY WORKER",
          "text": "I'm sure you standing there isn't helping."
      },
      {
          "kind": "narration",
          "text": "Fair."
      }
  ],
  "obi_delivery_help": [
      {
          "kind": "narration",
          "text": "Obito drops his bag."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Move your hand."
      },
      {
          "kind": "narration",
          "text": "The worker blinks."
      },
      {
          "kind": "dialogue",
          "speakerName": "DELIVERY WORKER",
          "text": "What?"
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Your right hand. If we lift there, the wheel's going straight back into the rut."
      },
      {
          "kind": "narration",
          "text": "The worker changes position.\n\nTogether they heave.\n\nThe cart rises.\n\nTilts too far."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Other way!"
      },
      {
          "kind": "dialogue",
          "speakerName": "DELIVERY WORKER",
          "text": "You said up!"
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Up isn't supposed to become over!"
      },
      {
          "kind": "narration",
          "text": "They wrestle it level.\n\nOne crate falls.\n\nObito catches it against his chest.\n\nThe worker stares."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "What?"
      },
      {
          "kind": "dialogue",
          "speakerName": "DELIVERY WORKER",
          "text": "Nothing."
      },
      {
          "kind": "narration",
          "text": "They get the last crate aboard.\n\nThe worker points toward the Academy."
      },
      {
          "kind": "dialogue",
          "speakerName": "DELIVERY WORKER",
          "text": "Go."
      },
      {
          "kind": "narration",
          "text": "Obito grabs his bag."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Everybody keeps saying that after I help them."
      },
      {
          "kind": "dialogue",
          "speakerName": "DELIVERY WORKER",
          "text": "Maybe listen faster."
      },
      {
          "kind": "narration",
          "text": "Obito opens his mouth.\n\nDecides he has no time to win this argument.\n\nRuns."
      }
  ],
  "obi_delivery_continue": [
      {
          "kind": "narration",
          "text": "The worker nods toward the open gap again.\n\nObito takes it."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "The wheel's caught on the inside."
      },
      {
          "kind": "narration",
          "text": "The worker looks down.\n\nAdjusts the lever.\n\nThe cart shifts.\n\nObito keeps moving.\n\nHe helped exactly enough to be annoying.\n\nIt is still faster than stopping."
      }
  ],
  "obi_cart_intro": [
      {
          "kind": "narration",
          "text": "The Academy roofs are finally in sight.\n\nObito can see the training-ground wall.\n\nThen somebody screams.\n\nA handcart has broken loose on the slope ahead.\n\nIt bounces once.\n\nTwice.\n\nGains speed.\n\nPeople move.\n\nTwo adults run toward it from one side.\n\nAnother civilian starts clearing the lane.\n\nNobody is standing still waiting for Obito.\n\nThat almost makes the choice easier.\n\nThen the cart hits a rut.\n\nOne adult jumps back.\n\nThe cart turns toward the crowded side of the street.\n\nThe Academy bell rings.\n\nObito hears both sounds at once."
      }
  ],
  "obi_cart_help": [
      {
          "kind": "narration",
          "text": "Obito throws his bag against the wall.\n\nRuns downhill."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "Kid!"
      },
      {
          "kind": "narration",
          "text": "Obito gets beside the cart instead of in front of it.\n\nGrabs the side rail.\n\nThe cart jerks him forward."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Okay—!"
      },
      {
          "kind": "narration",
          "text": "His feet scrape."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Bad idea!"
      },
      {
          "kind": "narration",
          "text": "One of the adults reaches the opposite rail.\n\nTogether they force the front wheel toward the curb.\n\nIt hits.\n\nBounces.\n\nStops.\n\nObito keeps holding it for a second after it is already still.\n\nThen lets go.\n\nHis palms sting.\n\nThe adult beside him looks at them."
      },
      {
          "kind": "dialogue",
          "speakerName": "CIVILIAN",
          "text": "You all right?"
      },
      {
          "kind": "narration",
          "text": "Obito closes his hands."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Obviously."
      },
      {
          "kind": "narration",
          "text": "He opens one.\n\nLooks at the scrape."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Mostly."
      },
      {
          "kind": "narration",
          "text": "The Academy bell rings again.\n\nObito's eyes widen."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Training!"
      },
      {
          "kind": "narration",
          "text": "The adults have the cart now.\n\nObito grabs his bag and runs.\n\nThis time there is nothing left behind him that needs deciding."
      }
  ],
  "obi_cart_continue": [
      {
          "kind": "narration",
          "text": "Obito watches the adults move.\n\nOne takes the rail.\n\nAnother clears the street.\n\nA third reaches the front wheel.\n\nThey have it.\n\nOr they are going to.\n\nObito makes the decision before his feet make it for him."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "They've got it."
      },
      {
          "kind": "narration",
          "text": "He turns toward the Academy.\n\nRuns.\n\nHe hears the cart crash into something behind him.\n\nDoes not turn around.\n\nThe gate is in front of him."
      }
  ],
  "arrival_FULL": [
      {
          "kind": "narration",
          "text": "The training ground tells Obito how late he is before the instructor does.\n\nWhich equipment is still out.\n\nWhich marks are already cut into the dirt.\n\nHow tired everybody else looks.\n\nWhat remains depends on the time he actually spent getting here."
      },
      {
          "kind": "narration",
          "text": "Students are still lining up.\n\nObito skids into the yard.\n\nThe instructor looks at him."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "Cutting it close."
      },
      {
          "kind": "narration",
          "text": "Obito straightens.\n\nChecks the yard.\n\nNo drill has started."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "But I made it."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "That wasn't praise."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Still true."
      },
      {
          "kind": "narration",
          "text": "A whistle sounds."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "Line up."
      },
      {
          "kind": "narration",
          "text": "Obito grins and does."
      }
  ],
  "arrival_SUBSTANTIAL": [
      {
          "kind": "narration",
          "text": "The training ground tells Obito how late he is before the instructor does.\n\nWhich equipment is still out.\n\nWhich marks are already cut into the dirt.\n\nHow tired everybody else looks.\n\nWhat remains depends on the time he actually spent getting here."
      },
      {
          "kind": "narration",
          "text": "Obito reaches the yard as the conditioning group breaks.\n\nThe instructor looks at him.\n\nThen at the students stretching their legs."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "You missed conditioning."
      },
      {
          "kind": "narration",
          "text": "Obito bends forward, catching his breath.\n\nRaises one finger."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I conditioned myself getting here."
      },
      {
          "kind": "narration",
          "text": "The instructor waits.\n\nObito lowers the finger."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Doesn't count."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "No."
      },
      {
          "kind": "narration",
          "text": "The weapon rack rolls out.\n\nObito stands immediately."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I'm here for that."
      }
  ],
  "arrival_REDUCED": [
      {
          "kind": "narration",
          "text": "The training ground tells Obito how late he is before the instructor does.\n\nWhich equipment is still out.\n\nWhich marks are already cut into the dirt.\n\nHow tired everybody else looks.\n\nWhat remains depends on the time he actually spent getting here."
      },
      {
          "kind": "narration",
          "text": "The wooden weapons are already being put away when Obito arrives.\n\nHis eyes follow them.\n\nThen the marks from the finished drills.\n\nThen the instructor."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "You're late."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I noticed."
      },
      {
          "kind": "narration",
          "text": "A few students look over.\n\nObito refuses to look as tired as he is."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "What's next?"
      },
      {
          "kind": "narration",
          "text": "The instructor points toward the Ninjutsu markers."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "Fundamentals."
      },
      {
          "kind": "narration",
          "text": "Obito drops his bag."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Good."
      },
      {
          "kind": "narration",
          "text": "Frustration can wait until after he uses what is left."
      }
  ],
  "arrival_MINIMAL": [
      {
          "kind": "narration",
          "text": "The training ground tells Obito how late he is before the instructor does.\n\nWhich equipment is still out.\n\nWhich marks are already cut into the dirt.\n\nHow tired everybody else looks.\n\nWhat remains depends on the time he actually spent getting here."
      },
      {
          "kind": "narration",
          "text": "Obito smells scorched air before he reaches the gate.\n\nThe Ninjutsu block is over.\n\nStudents are pairing off for Taijutsu.\n\nThe last drill.\n\nThe instructor sees him.\n\nObito sees everything he missed.\n\nNeither needs to say it.\n\nThe instructor does anyway."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "You're here."
      },
      {
          "kind": "narration",
          "text": "Obito swallows whatever excuse arrived first."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "What's left?"
      },
      {
          "kind": "narration",
          "text": "The instructor points at the pairs."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "Closing drill."
      },
      {
          "kind": "narration",
          "text": "Obito drops his bag."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Put me in."
      }
  ],
  "training_intro": [
      {
          "kind": "narration",
          "text": "Only the blocks still available play."
      }
  ],
  "training_stamina": [
      {
          "kind": "narration",
          "text": "Obito attacks the first conditioning lap like the Hokage position is waiting at the finish line.\n\nBy the third lap, his lungs object.\n\nThe instructor passes him."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "You don't win conditioning on the first lap."
      },
      {
          "kind": "narration",
          "text": "Obito pushes harder."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Wasn't trying to."
      },
      {
          "kind": "narration",
          "text": "The instructor looks at him.\n\nObito adjusts his pace.\n\nBarely.\n\nEnough."
      }
  ],
  "training_bukijutsu": [
      {
          "kind": "narration",
          "text": "The first Academy weapon leaves Obito's hand harder than it should.\n\nIt hits worse than he wants.\n\nObito stares at the target."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "It moved."
      },
      {
          "kind": "narration",
          "text": "Nobody answers.\n\nObito looks around."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Fine."
      },
      {
          "kind": "narration",
          "text": "Second throw.\n\nCleaner.\n\nThird.\n\nCleaner again.\n\nBy the end, he has stopped trying to overpower the exercise and started paying attention to it.\n\nHe does not announce that discovery."
      }
  ],
  "training_ninjutsu": [
      {
          "kind": "narration",
          "text": "This is the block Obito wanted.\n\nFire.\n\nUchiha fundamentals.\n\nSomething that feels closer to the person he keeps insisting he will become.\n\nHis first flame bursts too hard and collapses.\n\nObito glares at the empty air."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "Slow down."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I know."
      },
      {
          "kind": "narration",
          "text": "He absolutely did not.\n\nHe tries again.\n\nLess force.\n\nMore control.\n\nThe flame lasts.\n\nNot long.\n\nLonger.\n\nObito watches the last heat fade."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Again."
      },
      {
          "kind": "narration",
          "text": "The instructor is already moving down the line."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "Again."
      },
      {
          "kind": "narration",
          "text": "Obito grins."
      }
  ],
  "training_taijutsu": [
      {
          "kind": "narration",
          "text": "No weapon.\n\nNo fire.\n\nNo future Sharingan to imagine solving the problem for him.\n\nJust another student.\n\nDistance.\n\nTiming.\n\nThe signal comes.\n\nObito goes first.\n\nToo hard.\n\nGets redirected.\n\nHits the ground.\n\nGets up.\n\nAgain.\n\nThe second attempt lasts longer.\n\nThe third makes his opponent actually adjust.\n\nBy the final whistle, Obito is breathing hard and smiling anyway.\n\nHowever much training he reached, this part belongs to him because he was here for it."
      }
  ],
  "obi_end_day": [
      {
          "kind": "narration",
          "text": "The yard empties.\n\nObito sits on the edge of the training space and reties one sandal.\n\nThe instructor passes with the last bundle of equipment.\n\nStops.\n\nLooks at him."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "Tomorrow?"
      },
      {
          "kind": "narration",
          "text": "Obito knows exactly what he means."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Earlier."
      },
      {
          "kind": "narration",
          "text": "The instructor raises an eyebrow.\n\nObito points at him."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I said earlier."
      },
      {
          "kind": "dialogue",
          "speakerName": "ACADEMY INSTRUCTOR",
          "text": "I heard you."
      },
      {
          "kind": "narration",
          "text": "He walks away.\n\nObito waits until he is gone.\n\nThen looks at the road home.\n\nThe same village he crossed this morning.\n\nIt feels much longer now that nobody is timing him.\n\nHe starts walking."
      }
  ],
  "home_common": [
      {
          "kind": "narration",
          "text": "Obito drops his bag beside the wall.\n\nTakes off his goggles.\n\nPuts them down.\n\nThen picks them back up almost immediately and turns them over in his hands.\n\nThrough the window, the Hokage Monument catches the last light.\n\nHe usually knows what to say when he looks at it.\n\nTonight takes longer.\n\nTraining mattered.\n\nHe can feel that in every sore muscle.\n\nThe road mattered too.\n\nHe can still see the moments where he stopped.\n\nAnd the moments where he did not.\n\nObito leans back.\n\nNobody is asking him for an answer.\n\nThat makes it harder."
      }
  ],
  "home_all_help": [
      {
          "kind": "narration",
          "text": "His hands still remember the wardrobe.\n\nThe vegetables left dirt on one knee.\n\nThe cart left a scrape across his palm.\n\nTraining left the rest.\n\nObito turns that hand over as he walks.\n\nThe things he stopped for did not disappear just because they cost him time.\n\nNeither did the things he missed.\n\nHe looks toward the Hokage Monument.\n\nKeeps walking."
      }
  ],
  "home_no_help": [
      {
          "kind": "narration",
          "text": "His clothes are cleaner than they might have been.\n\nHis training day is fuller too.\n\nObito knows exactly why.\n\nOn the road home he passes a delivery worker he recognises.\n\nThe cart is upright now.\n\nFarther on, the vegetable stall is open like nothing happened.\n\nKonoha kept moving without him.\n\nObito looks at both.\n\nThen toward the Monument.\n\nKeeps walking."
      }
  ],
  "home_mixed": [
      {
          "kind": "narration",
          "text": "Some places on the road feel familiar because he stopped there.\n\nOthers because he made himself keep going.\n\nNobody on the street knows those decisions belong together in his head.\n\nObito does.\n\nHe walks past the Academy equipment route.\n\nPast the market.\n\nToward home."
      }
  ],
  "ending_helping": [
      {
          "kind": "narration",
          "text": "Obito looks at the scrape on his palm.\n\nIf he earned it helping, he remembers exactly where.\n\nIf he did not, the hand is still tired from training.\n\nEither way, he closes it into a fist."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I'm not going to stop helping people."
      },
      {
          "kind": "narration",
          "text": "He says it once.\n\nThen immediately frowns.\n\nBecause saying it does not solve the part where training starts at the same time tomorrow.\n\nObito looks toward the Monument."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Fine."
      },
      {
          "kind": "narration",
          "text": "He puts his goggles back on."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Then I leave earlier."
      },
      {
          "kind": "narration",
          "text": "A beat."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "A lot earlier."
      },
      {
          "kind": "narration",
          "text": "That sounds possible.\n\nMore importantly, it sounds like work.\n\nObito knows what to do with work."
      }
  ],
  "ending_training": [
      {
          "kind": "narration",
          "text": "Obito sets the goggles beside him.\n\nLooks at the training marks still visible on his hands."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I need to take training more seriously."
      },
      {
          "kind": "narration",
          "text": "The words annoy him almost as soon as he says them.\n\nNot because they are wrong.\n\nBecause they sound like something an instructor would say.\n\nObito leans forward."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "No."
      },
      {
          "kind": "narration",
          "text": "He tries again."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "If I say I'm becoming Hokage, I have to show up for the part that gets me there."
      },
      {
          "kind": "narration",
          "text": "Better.\n\nHe looks toward the village outside.\n\nThat does not mean he stops seeing people.\n\nIt means seeing a problem does not automatically make it his.\n\nObito puts his goggles back on.\n\nTomorrow, he intends to arrive before anyone can comment on it.\n\nThat alone is motivation enough."
      }
  ],
  "ending_balance": [
      {
          "kind": "narration",
          "text": "Obito counts on his fingers.\n\nLeave earlier.\n\nWaste less time before leaving.\n\nStop when somebody actually needs him.\n\nKeep moving when somebody else already has it.\n\nHe reaches four.\n\nStops."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "This is getting complicated."
      },
      {
          "kind": "narration",
          "text": "Nobody answers.\n\nObito looks toward the Monument.\n\nThen starts counting again."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Fine."
      },
      {
          "kind": "narration",
          "text": "A grin starts."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I'll get better at both."
      },
      {
          "kind": "narration",
          "text": "The statement is probably too confident.\n\nThat has never stopped him before.\n\nThis time, at least, he has an actual plan to fail at first."
      }
  ],
  "ending_question": [
      {
          "kind": "narration",
          "text": "Obito looks at the Hokage Monument.\n\nUsually the answer is immediate.\n\nBecome stronger.\n\nAwaken the Sharingan.\n\nMake the Uchiha take him seriously.\n\nBecome Hokage.\n\nHe has repeated those things so many times that they fit together automatically.\n\nTonight one of them catches.\n\nObito frowns."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Maybe I'm looking at this wrong."
      },
      {
          "kind": "narration",
          "text": "He studies the faces carved into the mountain.\n\nNot his imaginary face.\n\nThe ones already there."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Why do I want it?"
      },
      {
          "kind": "narration",
          "text": "No answer.\n\nObito waits anyway.\n\nThat is new.\n\nHe thinks about training.\n\nAbout being noticed.\n\nAbout helping people.\n\nAbout wanting the village to know his name.\n\nNone of them disappear.\n\nThey just stop arranging themselves for him.\n\nObito picks up his goggles."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Fine."
      },
      {
          "kind": "narration",
          "text": "He puts them on."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "I'll figure it out."
      },
      {
          "kind": "narration",
          "text": "For once, he does not point at the Monument.\n\nHe just looks."
      }
  ],
  "obi_close": [
      {
          "kind": "narration",
          "text": "Morning will come again.\n\nThe Academy will start on time.\n\nKonoha will still put people, problems and distractions between Obito and wherever he thinks he is going.\n\nTonight, Obito opens the window.\n\nThe village noise reaches him.\n\nHe smiles."
      },
      {
          "kind": "dialogue",
          "speakerName": "OBITO",
          "text": "Tomorrow."
      },
      {
          "kind": "narration",
          "text": "Then closes it."
      }
  ]
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
  QUESTION_FRAME:"Maybe I'm looking at this wrong."
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
    choiceBeat("obi_furniture_choice","The wardrobe is still wedged in the doorway.",[
      C("furniture_help","HELP HER","obi_furniture_help",{[intentKey(furniture)]:"HELP"}),
      C("furniture_continue_final","KEEP GOING","obi_furniture_continue",{[intentKey(furniture)]:"CONTINUE"})
    ],ENV.residential),
    storyBeat("obi_furniture_help","obi_furniture_help","obi_vegetables_intro",{environmentRef:ENV.residential,onEnterConsequences:[diversionRequest(furniture)]}),
    storyBeat("obi_furniture_continue","obi_furniture_continue","obi_vegetables_intro",{environmentRef:ENV.residential,onEnterConsequences:[diversionRequest(furniture)]}),

    storyBeat("obi_vegetables_intro","obi_vegetables_intro","obi_vegetables_choice",{environmentRef:ENV.mainStreet}),
    choiceBeat("obi_vegetables_choice","The vendor is already reaching for another rolling vegetable.",[
      C("vegetables_help","HELP HER","obi_vegetables_help",{[intentKey(vegetables)]:"HELP"}),
      C("vegetables_continue_final","KEEP GOING","obi_vegetables_continue",{[intentKey(vegetables)]:"CONTINUE"})
    ],ENV.mainStreet),
    storyBeat("obi_vegetables_help","obi_vegetables_help","obi_equipment_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(vegetables)]}),
    storyBeat("obi_vegetables_continue","obi_vegetables_continue","obi_equipment_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(vegetables)]}),

    storyBeat("obi_equipment_intro","obi_equipment_intro","obi_equipment_choice",{environmentRef:ENV.academyApproach}),
    choiceBeat("obi_equipment_choice","The missing Academy bundle is somewhere along the route.",[
      C("equipment_help","HELP SEARCH","obi_equipment_help",{[intentKey(equipment)]:"HELP"}),
      C("equipment_continue_final","KEEP GOING","obi_equipment_continue",{[intentKey(equipment)]:"CONTINUE"})
    ],ENV.academyApproach),
    storyBeat("obi_equipment_help","obi_equipment_help","obi_delivery_intro",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(equipment)]}),
    storyBeat("obi_equipment_continue","obi_equipment_continue","obi_delivery_intro",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(equipment)]}),

    storyBeat("obi_delivery_intro","obi_delivery_intro","obi_delivery_choice",{environmentRef:ENV.mainStreet}),
    choiceBeat("obi_delivery_choice","Training is still happening without him.",[
      C("delivery_help","HELP WITH THE DELIVERY","obi_delivery_help",{[intentKey(delivery)]:"HELP"}),
      C("delivery_continue_final","KEEP MOVING","obi_delivery_continue",{[intentKey(delivery)]:"CONTINUE"})
    ],ENV.mainStreet),
    storyBeat("obi_delivery_help","obi_delivery_help","obi_cart_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(delivery)]}),
    storyBeat("obi_delivery_continue","obi_delivery_continue","obi_cart_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(delivery)]}),

    storyBeat("obi_cart_intro","obi_cart_intro","obi_cart_choice",{environmentRef:ENV.academyApproach}),
    choiceBeat("obi_cart_choice","His training is right there. The cart is already moving.",[
      C("cart_help","STOP AND HELP","obi_cart_help",{[intentKey(cart)]:"HELP"}),
      C("cart_continue_final","GO TO TRAINING","obi_cart_continue",{[intentKey(cart)]:"CONTINUE"})
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
    {beatId:"obi_close",mode:"narration",text:cueFallback("obi_close"),environmentRef:ENV.home,exitScene:true}
  ],
  onCompleteConsequences:[X(ORIGIN_ID,[...diversions.map(x=>x.occurrenceId),entitlementOccurrenceId])]
};
A.register(definition);

function trainingSequence(){
  const entitlement=currentEntitlement();
  const out=[...PERFORMANCE.training_intro];
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
function homeSequence(){
  const count=countHelpFromFacts(),tail=count===5?PERFORMANCE.home_all_help:count===0?PERFORMANCE.home_no_help:PERFORMANCE.home_mixed;
  return[...tail,...PERFORMANCE.home_common];
}
function boardActors(beatId){
  const actors=[{id:"academy_obito",image:"Assets/Academy Student/academy_obito.png",label:"OBITO",focus:true}];
  if(beatId.includes("furniture"))actors.push({id:"obito_origin_furniture_civilian",label:"CIVILIAN",image:"NPC/furniture_civilian.png"});
  else if(beatId.includes("vegetables"))actors.push({id:"obito_origin_vegetable_vendor",label:"VENDOR",image:"NPC/vegetable_vendor.png"});
  else if(beatId.includes("equipment"))actors.push({id:"obito_origin_academy_equipment_custodian",label:"CUSTODIAN",image:"NPC/equipment_custodian.png"});
  else if(beatId.includes("delivery"))actors.push({id:"obito_origin_delivery_worker",label:"DELIVERY WORKER",image:"NPC/delivery_worker.png"});
  else if(beatId.includes("cart"))actors.push({id:"obito_origin_runaway_cart_civilian",label:"CIVILIAN",image:"NPC/runaway_cart_civillian.png"});
  else if(beatId==="obi_arrival"||beatId==="obi_training")actors.push({id:"obito_origin_academy_instructor",label:"ACADEMY INSTRUCTOR",image:"NPC/obito_instructor.png"});
  return actors;
}
function boardLocation(beatId){
  if(beatId==="obi_arrival"||beatId==="obi_training")return"ACADEMY TRAINING GROUND";
  if(beatId==="obi_end_day")return"KONOHA · LATE AFTERNOON";
  if(beatId==="obi_home"||beatId==="obi_reflect"||beatId.startsWith("obi_ending_"))return"OBITO'S HOME";
  if(beatId==="obi_close")return"KONOHA · DUSK";
  return"KONOHA · MORNING";
}
function boardBackdropEnvironment331(beatId,performance){
  const id=String(beatId||"");
  if(id==="obi_end_day"){
    const cueIndex=performance&&Number.isInteger(performance.sourceIndex)
      ?performance.sourceIndex
      :performance&&Number.isInteger(performance.index)?performance.index:0;
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
  const sequences={...PERFORMANCE,obi_arrival:arrivalSequence,obi_training:trainingSequence,obi_home:homeSequence};
  const result=globalThis.registerStorySceneBoardDefinition(SCENE_ID,{
    resolve:({beatId})=>({
      mode:"conversation",
      location:boardLocation(beatId),
      objective:["obi_arrival","obi_training","obi_end_day","obi_home","obi_reflect","obi_close"].includes(beatId)||beatId.startsWith("obi_ending_")?null:"GET TO TRAINING",
      actors:boardActors(beatId)
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
    dedicatedBackdropRegistry:Object.values(BACKDROPS).every(path=>path.startsWith("Obito Origin Backdrop/")),
    firstPageDedicatedBackdrop:BACKDROPS[ENV.mainStreet.environmentId]==="Obito Origin Backdrop/konoha_main_street.png",
    furnitureResidentialBackdrop:BACKDROPS[ENV.residential.environmentId]==="Obito Origin Backdrop/quiet_residential_lane.png",
    academyApproachBackdrop:BACKDROPS[ENV.academyApproach.environmentId]==="Obito Origin Backdrop/academy_approach_sloped_lane.png",
    homeDedicatedBackdrop:BACKDROPS[ENV.home.environmentId]==="Obito Origin Backdrop/obito_home_interior.png",
    endDayPresentationMovesYardToStreet:typeof boardBackdropEnvironment331==="function"&&boardBackdropEnvironment331("obi_end_day",{sourceIndex:0,index:0})===ENV.trainingLate.environmentId&&boardBackdropEnvironment331("obi_end_day",{sourceIndex:2,index:99})===ENV.streetLate.environmentId,
    paragraphPaginationCannotShiftBackdrop:boardBackdropEnvironment331("obi_end_day",{sourceIndex:1,index:99})===ENV.trainingLate.environmentId,
    directBackdropPathProjection:typeof registerFinalSceneBoard==="function"&&registerFinalSceneBoard.toString().includes("return assetPath?{assetPath,environmentId}:null"),
    stableBeatBackdropProjection:boardBackdropEnvironment331("obi_depart")===ENV.mainStreet.environmentId&&boardBackdropEnvironment331("obi_furniture_choice")===ENV.residential.environmentId&&boardBackdropEnvironment331("obi_equipment_choice")===ENV.academyApproach.environmentId&&boardBackdropEnvironment331("obi_arrival")===ENV.trainingDay.environmentId&&boardBackdropEnvironment331("obi_home")===ENV.home.environmentId,
    closeRemainsHome:definition.beatMap instanceof Map?definition.beatMap.get("obi_close")&&definition.beatMap.get("obi_close").environmentRef===ENV.home:definition.beats.some(b=>b.beatId==="obi_close"&&b.environmentRef===ENV.home),
    noGenericBackdropFallback:Object.values(BACKDROPS).every(path=>!path.startsWith("Scene backdrops/")),
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
