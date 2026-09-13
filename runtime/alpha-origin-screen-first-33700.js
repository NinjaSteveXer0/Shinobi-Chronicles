// ============================================================================
// ALPHA ORIGIN SCREEN-FIRST PERFORMANCE — 33700
//
// Coding / Runtime consumption of final Writing authority:
// - Academy_Origins_Screen_First_Player_Facing_Story_Rewrite_2026-09-13.md
//   a08dcf50f67d264497944af761475865dff8dc81
// - Origin_Prologue_Screen_First_Scene_Performance_Rewrite_v2_2026-09-13.md
//   c774cd1582b267fb5afbc67bc3bb8556bea71449 (Kakashi v2 override)
// - Storywide_Interactive_Presence_Consequence_and_Screen_First_Authoring_Doctrine_2026-09-13.md
//   7b646d8697879506f0421af01d6083f8482b828c
//
// This is a terminal presentation/performance layer over the existing Story
// graphs. It does not create a second Story engine or change Origin facts,
// consequence rows, World Truth, Knowledge, PL, Progression, Acquisition,
// Battle results/callers, or continuity completion authority.
// ============================================================================
(function installAlphaOriginScreenFirst33700(){
"use strict";
if(globalThis.SC_ALPHA_ORIGIN_SCREEN_FIRST_33700)return;

const PATCH_ID="alpha_origin_screen_first_33700_2026_09_13";
const AUTHORITY_ORIGINS="a08dcf50f67d264497944af761475865dff8dc81";
const AUTHORITY_KAKASHI_V2="c774cd1582b267fb5afbc67bc3bb8556bea71449";
const AUTHORITY_DOCTRINE="7b646d8697879506f0421af01d6083f8482b828c";
const patched=[];

function definition(id){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(id):null;}catch(_){return null;}}
function editable(id){
  const d=definition(id);if(!d)return null;
  const beats=Array.isArray(d.beats)?d.beats.map(b=>({...b,choices:Array.isArray(b.choices)?b.choices.map(c=>({...c,contextPatch:c.contextPatch&&typeof c.contextPatch==="object"?{...c.contextPatch}:c.contextPatch})):b.choices}))
    :d.beatMap instanceof Map?Array.from(d.beatMap.values()).map(b=>({...b,choices:Array.isArray(b.choices)?b.choices.map(c=>({...c,contextPatch:c.contextPatch&&typeof c.contextPatch==="object"?{...c.contextPatch}:c.contextPatch})):b.choices})):[];
  if(!beats.length)return null;const copy={...d,beats};delete copy.beatMap;return copy;
}
function beat(d,id){return d&&Array.isArray(d.beats)?d.beats.find(b=>b&&b.beatId===id)||null:null;}
function choice(d,bid,cid){const b=beat(d,bid);return b&&Array.isArray(b.choices)?b.choices.find(c=>c&&c.choiceId===cid)||null:null;}
function setText(d,id,value,mode){const b=beat(d,id);if(!b)return null;b.text=value;delete b.presentationResolver;if(mode)b.mode=mode;return b;}
function setResolver(d,id,fn){const b=beat(d,id);if(!b)return null;b.presentationResolver=fn;return b;}
function setLabel(d,bid,cid,label){const c=choice(d,bid,cid);if(c)c.label=label;return c;}
function add(d,row){const old=beat(d,row.beatId);if(old)Object.assign(old,row);else d.beats.push(row);return row;}
function commit(d){if(!d||typeof registerStoryScene!=="function")return false;try{if(typeof unregisterStoryScene==="function")unregisterStoryScene(d.sceneId);}catch(_){}const r=registerStoryScene(d);if(r&&r.success===false)return false;patched.push(d.sceneId);return true;}
function local(){try{const A=globalThis.SC_ALPHA_ORIGIN_32900;return A&&typeof A.local==="function"?A.local():{};}catch(_){return {};}}
function conciseUnavailable(c,label="Route unavailable in this Alpha build."){if(c&&typeof c.availability==="function"){const prior=c.availability;c.availability=()=>{const a=prior()||{};return{...a,knownBlocker:label};};}return c;}
function narration(b){if(!b)return;b.mode="narration";delete b.speakerName;}
function ensureStyle(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function"||document.getElementById("sc-origin-screen-first-33700-style"))return;
  const s=document.createElement("style");s.id="sc-origin-screen-first-33700-style";
  s.textContent=`
    #story-scene-presentation-layer{background:#030b10!important;}
    #story-scene-presentation-layer .sc-story-stage{max-width:1040px!important;}
    #story-scene-presentation-layer .sc-story-copy{white-space:pre-line;}
  `;
  document.head.appendChild(s);
}

function patchHinata(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_hinata);if(!d)return false;
  setText(d,"hin_practice","Morning mist still clings to the Hyūga courtyard. Hinata's bare heel turns exactly where it turned the last six times. Palm. Step. Breathe. Again.\n\nThe instructor waits until she finishes. \"Again won't tell me anything new. Use it.\"\n\nAcross the courtyard, her sparring partner settles into stance.","narration");
  setText(d,"hin_1","The other student's weight shifts forward. Hinata has a heartbeat before they move.");
  setLabel(d,"hin_1","attack_immediately","Move first. Don't give them time to settle.");
  setLabel(d,"hin_1","wait_for_opening","Wait. Let them show the opening.");
  setLabel(d,"hin_1","defensive_stance","Set her guard and make them come through it.");
  setLabel(d,"hin_1","study_movement","Watch their feet. Learn the rhythm before committing.");
  setText(d,"hin_2","The first exchange breaks the neat Academy rhythm. Sand scratches under sandals. A sleeve snaps past Hinata's cheek. Her next breath comes faster than the last.\n\nHer opponent adjusts.\n\nSo does she.");
  setLabel(d,"hin_2","press_advantage","Stay on them before they can reset.");
  setLabel(d,"hin_2","redirect_attack","Meet the next strike and turn it away.");
  setLabel(d,"hin_2","create_distance","Give herself room. Reset the exchange.");
  setLabel(d,"hin_2","change_approach","Break the pattern before they read her.");
  setText(d,"hin_3","For one instant their guard opens.\n\nHinata sees it.\n\nThe instructor sees her see it.");
  setLabel(d,"hin_3","commit_strike","Take the opening.");
  setLabel(d,"hin_3","counter","Invite the attack, then answer it.");
  setLabel(d,"hin_3","remain_patient","Don't chase it. Make them open again.");
  setLabel(d,"hin_3","trust_observation","Move where the pattern says they'll be.");
  setText(d,"hin_eval","\"Enough.\"\n\nHinata stops with one foot still half-raised. Her opponent exhales first. The instructor's eyes travel from the scuffed ground to Hinata's stance.\n\n\"You noticed more than you used.\"\n\nHinata lowers her hands. \"...I know.\"","narration");
  setText(d,"hin_young","At the gate, a younger Hyūga student is still practising the same turn. Their palm keeps arriving a fraction too late. They glance at Hinata, immediately look away, and try again.");
  setLabel(d,"hin_young","show_movement","\"Here. Watch my feet.\"");
  setLabel(d,"hin_young","explain_error","\"You're turning after your weight moves.\"");
  setLabel(d,"hin_young","leave_them_to_figure_it_out","Let them work it out without hovering.");
  setLabel(d,"hin_young","stay_and_watch","Stay quiet and watch one more attempt.");
  setResolver(d,"hin_end",()=>{const y=local().young;
    if(y==="show_movement"||y==="explain_error")return{text:"The younger student tries again. Better this time.\n\nHinata almost smiles before she catches herself.\n\n\"Again.\""};
    if(y==="stay_and_watch")return{text:"The student misses the turn, resets, then catches it on the next attempt. Hinata notices why before the instructor says anything.\n\nShe looks back toward the courtyard.\n\n\"Tomorrow... I'll try again.\""};
    return{text:"Hinata reaches the gate, pauses at the sound of another failed step behind her, then keeps walking.\n\nHer own fingers quietly repeat the corrected hand position at her side."};
  });
  return commit(d);
}

function patchIzuno(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_izuno);if(!d)return false;
  setText(d,"izu_start","The instructor drops a wooden marker into Wasabi's palm.\n\n\"Target leaves now. Extraction gate closes when they reach it.\"\n\nA figure disappears over the Academy wall.\n\nWasabi is already leaning forward. \"You could've just said go.\"","narration");
  setText(d,"izu_initial","At the wall, the obvious trail bends left. Dust hangs in the alley. A roof tile on the right is freshly chipped.");
  setLabel(d,"izu_initial","obvious_trail","Take the trail before it cools.");
  setLabel(d,"izu_initial","environmental_signs","Ignore the footprints. Read what the runner disturbed.");
  setLabel(d,"izu_initial","cooperate_students","Pull the nearest students in and split the search.");
  setLabel(d,"izu_initial","predict_destination","Forget the trail. Beat the target to where they have to end up.");
  setText(d,"izu_split","The pursuit tears across Konoha in pieces: wet stone near the river, a doubled-back footprint, a shout from another student, movement where no movement should be.\n\nWasabi skids to a stop at the next junction and makes the call.");
  setLabel(d,"izu_split","river_route","Cut along the river. It's faster if the bank holds.");
  setLabel(d,"izu_split","stronger_trail","Follow the freshest marks. Somebody made them for a reason.");
  setLabel(d,"izu_split","rogue_interruption","Break off. Something's wrong with that student.");
  setLabel(d,"izu_split","intercept_prediction","Keep the prediction. Get ahead of the target.");
  setText(d,"izu_rogue","A boy in a scratched forehead protector has an Academy student backed against a fence. He isn't part of the exercise. The student's eyes find Wasabi first.\n\nWasabi's jaw tightens.");
  setLabel(d,"izu_rogue","intervene","\"Hey. Pick on somebody looking at you.\"");
  setLabel(d,"izu_rogue","call_for_help","Signal the instructor and keep herself between them.");
  setLabel(d,"izu_rogue","keep_pursuing","Keep moving. The target is getting farther away.");
  conciseUnavailable(choice(d,"izu_rogue","intervene"),"Battle route unavailable.");
  setResolver(d,"izu_eval",()=>{const c=local();
    if(c.route==="river_route")return{text:"Wasabi reaches the extraction point just in time to see the target slap the marker down. She bends over with her hands on her knees, annoyed enough to laugh once through her breath.\n\nThe instructor folds his arms. \"Tell me what you missed.\"\n\n\"Depends. You want the short list?\""};
    if(c.route==="stronger_trail")return{text:"The footprints end too cleanly. Wasabi crouches, rubs the edge of one print with her thumb, and sees where somebody pressed it into the mud from the wrong angle.\n\nThe instructor looks down at it. \"Tell me what you missed.\"\n\nWasabi clicks her tongue. \"Yeah. I see it.\""};
    if(c.route==="intercept_prediction")return{text:"Wasabi is already waiting when the target vaults the final wall. Their expression changes before their feet hit the ground.\n\nWasabi rolls the wooden marker across her knuckles. \"You took your time.\""};
    return{text:c.rogueResponse==="call_for_help"?"The instructor's signal answers hers. Wasabi keeps herself between the Rogue Genin and the Academy student until help arrives. By the time she looks back toward the trial route, the target is gone.":"Wasabi keeps moving. Behind her, the Rogue Genin occurrence remains somebody else's immediate problem while the pursuit stays hers."};
  });
  setText(d,"izu_reflect","The instructor tosses the wooden marker back to her.");
  setLabel(d,"izu_reflect","trust_trail","\"Next time I won't second-guess a trail that's still good.\"");
  setLabel(d,"izu_reflect","trust_notice","\"Next time I'm trusting the thing that doesn't fit.\"");
  setLabel(d,"izu_reflect","fastest_not_obvious","\"Fastest route isn't always the one in front of you.\"");
  setLabel(d,"izu_reflect","catch_not_only","\"Catching one person isn't much use if you run past everything else.\"");
  setText(d,"izu_end","Wasabi rolls the marker across her knuckles and starts back toward the Academy before the instructor dismisses her.\n\n\"Izuno.\"\n\nShe looks over one shoulder.\n\n\"You're still being graded.\"\n\n\"Then keep up.\"","narration");
  return commit(d);
}

function patchMirai(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_mirai);if(!d)return false;
  setText(d,"mir_start","The civilian bows too many times when the escort begins.\n\n\"Sorry. First time being assigned an Academy escort. I expected someone taller.\"\n\nMirai checks the road, then the travel papers, then gives them back.\n\n\"You got me. Try not to look devastated.\"\n\nThey start walking.","narration");
  setText(d,"mir_talk","Conversation fills the walk.");
  setLabel(d,"mir_talk","ask_origin","\"You said you're from outside Fire Country. Where?\"");
  setLabel(d,"mir_talk","ask_route","\"Which gate did you come through this morning?\"");
  setLabel(d,"mir_talk","ask_family","\"Anyone waiting for you when this is over?\"");
  setLabel(d,"mir_talk","ask_trip","\"Long trip into Konoha?\"");
  setResolver(d,"mir_inconsistent",()=>{const t=local().talk;const detail={
    origin:"Three streets later, something about the civilian's story no longer fits where they said they came from.",
    route:"Three streets later, the civilian points toward a market lane they claimed they never used. \"That market was quieter this morning,\" they say.",
    family:"Three streets later, a family detail comes back differently from the first time.",
    trip:"Three streets later, the timing of the trip no longer fits the account Mirai heard earlier."
  }[t]||"Three streets later, one small detail no longer fits.";return{text:`${detail}\n\nMirai's next step lands normally.\n\nHer eyes do not. They flick once to the travel papers tucked inside the civilian's coat.`};});
  setLabel(d,"mir_inconsistent","challenge_direct","Stop walking. \"That isn't what you told me.\"");
  setLabel(d,"mir_inconsistent","test_question","Ask the same thing sideways and see if the answer changes.");
  setLabel(d,"mir_inconsistent","pretend_not_notice","Keep the pace. Let them believe she missed it.");
  setLabel(d,"mir_inconsistent","change_route","Turn down a different street without warning. Watch what they recognise.");
  conciseUnavailable(choice(d,"mir_inconsistent","challenge_direct"),"Confrontation route unavailable.");
  for(const id of ["test_question","pretend_not_notice","change_route"]){const c=choice(d,"mir_inconsistent",id);if(c)c.contextPatch={...(c.contextPatch||{}),miraiSuspicionResponse:id};}
  setResolver(d,"mir_deeper",()=>{const r=local().miraiSuspicionResponse;const follow={
    test_question:"The answer changes by half a sentence. The civilian smiles as though nothing happened.",
    pretend_not_notice:"Mirai keeps escort formation. A second contradiction arrives because the civilian thinks the first one passed.",
    change_route:"The civilian turns toward the new lane before Mirai names it, then catches the movement too late."
  }[r]||"The civilian catches Mirai looking and smiles a fraction too late.";return{text:`${follow}\n\nMirai keeps one hand loose near her pouch.`};});
  setLabel(d,"mir_deeper","challenge_now","\"Enough. Who are you?\"");
  setLabel(d,"mir_deeper","continue_guard_up","Finish the escort, but don't give them another blind angle.");
  setLabel(d,"mir_deeper","scan_changed_chakra","Try to verify whether the chakra in front of her matches what it should.");
  setLabel(d,"mir_deeper","investigate_quietly","Keep them talking. Build proof before showing suspicion.");
  conciseUnavailable(choice(d,"mir_deeper","challenge_now"),"Confrontation route unavailable.");
  conciseUnavailable(choice(d,"mir_deeper","scan_changed_chakra"),"Verification route unavailable.");
  const checkpointChoice=choice(d,"mir_deeper","continue_guard_up");if(checkpointChoice)checkpointChoice.contextPatch={...(checkpointChoice.contextPatch||{}),miraiResolution:"checkpoint"};
  const verifiedChoice=choice(d,"mir_deeper","investigate_quietly");if(verifiedChoice)verifiedChoice.contextPatch={...(verifiedChoice.contextPatch||{}),miraiResolution:"verified"};
  setText(d,"mir_checkpoint","The checkpoint guard reaches for the papers.\n\nThe civilian exhales.\n\nTheir face ripples first. Mirai's hand snaps to her pouch as the substitution releases in a curl of chakra.\n\n\"Protected all the way here,\" the instructor says.\n\nMirai stares at the person she escorted. \"...Wrong person.\"\n\n\"Both facts count.\"","narration");
  setText(d,"mir_verified","Mirai asks one last harmless question.\n\nThe answer contradicts the first one word for word.\n\nShe stops walking. \"You remembered the lie. You forgot the conversation.\"\n\nFor the first time, the civilian stops smiling.","narration");
  setResolver(d,"mir_eval",()=>({text:"At the Academy gate, the instructor takes back the exercise papers.\n\n\"What were you protecting?\"\n\nMirai looks at the papers, then at the person beside them."}));
  setResolver(d,"mir_end",()=>({text:local().miraiResolution==="verified"?"\"The person first. The identity once I could prove it.\"\n\nThe instructor folds the papers once. \"Good. Don't confuse those again.\"\n\nMirai watches the next escort pair leave the gate instead of answering.":"\"A person. I assumed the name came with them.\"\n\nThe instructor folds the papers once. \"Good. Don't confuse those again.\"\n\nMirai watches the next escort pair leave the gate instead of answering."}));
  narration(beat(d,"mir_end"));
  return commit(d);
}

function patchKushina(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_kushina);if(!d)return false;
  setText(d,"kus_crisis","The practice scroll gives a sharp, ugly hiss.\n\nOne line of ink crawls past the instructor's guide marks. A classmate kneeling beside it freezes as chakra lifts the paper off the stone.\n\nKushina is moving before the instructor finishes shouting her name.");
  setLabel(d,"kus_crisis","correct_formula","Drop to the seal and correct the formula before it cascades.");
  setLabel(d,"kus_crisis","protect_student","Get the classmate out. The scroll can wait.");
  setLabel(d,"kus_crisis","contain_damaged_seal","Forget the original exercise. Close the leak.");
  setLabel(d,"kus_crisis","move_unstable_object","Move the dangerous scroll into the cleared lane.");
  setText(d,"kus_protect_student_01","The scroll bucks off the stone. Kushina catches the classmate by the arm and yanks them clear before the next pulse reaches where they were kneeling.");
  setText(d,"kus_contain_seal_01","Kushina drops beside the scroll. The original pattern is already torn, so she stops trying to make the exercise pretty and closes the broken boundary around the leaking chakra.");
  setText(d,"kus_move_object_01","Kushina snatches the unstable scroll off the stand and throws it into the cleared safety lane before the next discharge can catch the student beside it.");
  setText(d,"kus_reverse","The corrected formula flashes white and folds inward.\n\nKushina throws one forearm over her eyes. When she lowers it, a toad is sitting where the scroll was.");
  setText(d,"kus_contact_choice","Gerotora studies the damaged formula, then looks up at Kushina.");
  setLabel(d,"kus_contact_choice","ask_what_happened","\"What just happened?\"");
  setLabel(d,"kus_contact_choice","ask_who","\"Who are you?\"");
  setLabel(d,"kus_contact_choice","help_close","Drop back to the seal and help close the residual connection.");
  setLabel(d,"kus_contact_choice","send_back","\"Then go back before this gets worse.\"");
  const result=beat(d,"kus_contact_result");if(result)setResolver(d,"kus_contact_result",()=>{const x=local().kushinaGerotoraChoice;
    return{text:{ask_what_happened:"Gerotora taps one webbed finger beside the corrected line. \"You fixed the seal. You also connected it somewhere it had no business reaching.\"",ask_who:"The toad blinks at her. \"Gerotora.\"\n\nKushina looks him over again, as if the name has not improved the situation.",help_close:"Kushina drops beside the scroll again. Gerotora braces the connection from his side while she closes the line she opened.",send_back:"Kushina reaches for the formula. Gerotora catches the movement. \"Not like that. Unless you'd like to bring something else through.\""}[x]||"Gerotora's answer follows the question Kushina actually asked."};});
  const last=beat(d,"kus_last");if(last){last.exitScene=false;last.nextBeatId="kus_redraw";}
  add(d,{beatId:"kus_redraw",mode:"narration",environmentRef:last&&last.environmentRef,text:"Gerotora disappears.\n\nKushina looks down at the damaged formula for a long moment, then kneels and quietly redraws the line that caused the whole problem.",exitScene:true});
  return commit(d);
}

function patchKurenai(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_kurenai);if(!d)return false;
  setText(d,"kur_bell","The instructor hooks a brass bell onto his belt.\n\n\"Take it.\"\n\nKurenai looks from the bell to his eyes. \"That's the whole instruction?\"\n\n\"If you need more, you've already made my job easier.\"\n\nThe bell rings once as he steps back.","narration");
  setText(d,"kur_layer1","The courtyard stays perfectly ordinary for half a second too long.");
  setLabel(d,"kur_layer1","false_kurenai","Give him a Kurenai to watch that isn't real.");
  setLabel(d,"kur_layer1","conceal_movement","Hide the movement that matters.");
  setLabel(d,"kur_layer1","distort_position","Make distance lie to him.");
  setLabel(d,"kur_layer1","fake_clumsy","Give him an obvious mistake and let him believe it.");
  setText(d,"kur_loss_attack","The false Kurenai breaks first. The instructor's gaze follows it—and returns to the real one sooner than she wanted.");
  setText(d,"kur_partial_loss_2","The bell rings somewhere to his left. Kurenai is moving somewhere else.");
  setText(d,"kur_partial_loss_3","For one beat, the bell looks unguarded enough to be real.");
  setText(d,"kur_partial_win_2","The bell looks two steps away. Then four. Then close enough to touch. The instructor's heel shifts to compensate for a distance that never changed.");
  setText(d,"kur_partial_win_3","The instructor starts to dismiss the attempt. That certainty is another surface Kurenai can use.");
  setText(d,"kur_complete_2","Kurenai lets her shoulder turn too early. Lets her foot scrape. Lets irritation flash across her face.\n\nThe instructor relaxes by one degree.\n\nThat is what she wanted.");
  setText(d,"kur_complete_3","He believes he has caught Kurenai.");
  setResolver(d,"kur_result",()=>{const o=local().kurenaiOutcome;return{text:{
    complete_loss:"Kurenai closes her fingers on empty air as the real bell rings behind her.",
    partial_loss:"She reaches the right space one exchange too early. The instructor catches the deception before her hand reaches the bell.",
    partial_win:"The instructor turns away believing she has withdrawn. The bell gives one surprised chime under Kurenai's fingertips before he recovers.",
    complete_win:"His hand closes around the false Kurenai while the real one lifts the bell from his belt."
  }[o]||"The illusion breaks, leaving only the positions that were real."};});
  setText(d,"kur_lesson","The instructor looks at his empty belt, then at Kurenai.\n\n\"What did you change?\"\n\n\"What you trusted.\"\n\nA pause. The corner of his mouth moves.\n\n\"Better answer than 'what you saw.'\"\n\nKurenai turns the bell once between two fingers. It rings softly.","narration");
  return commit(d);
}

function patchIwabee(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_iwabee);if(!d)return false;
  setText(d,"iwa_task","A section of the practice ground has collapsed into cracked shelves of stone and packed earth.\n\nThe instructor points at it with a clipboard. \"Make it usable again.\"\n\nIwabee looks at the clipboard, then at the ground. \"Finally, a test that knows what dirt looks like.\"","narration");
  setText(d,"iwa_reshape","Iwabee crouches and presses one palm to the fractured ground.");
  setLabel(d,"iwa_reshape","raise_collapsed","Raise the collapsed section back into place.");
  setLabel(d,"iwa_reshape","flatten_ground","Flatten the whole mess and start clean.");
  setLabel(d,"iwa_reshape","build_path","Cut a stable path through the damage.");
  setLabel(d,"iwa_reshape","reinforce_weakest","Find the weak point and brace it first.");
  setResolver(d,"iwa_expose",()=>{const t=local().iwabeeTerrainChoice;const move={raise_collapsed:"The collapsed shelf heaves upward and locks back into place.",flatten_ground:"The broken ground settles flat under Iwabee's palm.",build_path:"Stone rises into a stable path through the damaged section.",reinforce_weakest:"The weakest shelf thickens and braces against the ground around it."}[t]||"The damaged ground shifts under Iwabee's Earth Release.";return{text:`${move}\n\nStone grinds. The reshaped earth peels concealment away from a figure crouched where nobody from the Academy should be.\n\nThe Rogue Genin jerks upright.\n\nIwabee does too. \"Well. You're not part of the test.\"\n\nThe Rogue's eyes jump toward the nearest exit.`};});
  setText(d,"iwa_response","The Rogue Genin shifts toward the open route.");
  setLabel(d,"iwa_response","confront_immediately","Step between him and the exit. \"Then let's make this practical.\"");
  setLabel(d,"iwa_response","block_escape","Raise earth across the escape route.");
  setLabel(d,"iwa_response","call_instructor","\"Sensei. Found something that's definitely not on the worksheet.\"");
  setLabel(d,"iwa_response","ignore_finish","Keep working. The instructor is standing right there.");
  conciseUnavailable(choice(d,"iwa_response","confront_immediately"),"Battle route unavailable.");
  conciseUnavailable(choice(d,"iwa_response","block_escape"),"Capture route unavailable.");
  setText(d,"iwa_eval","After the secondary occurrence settles, the instructor taps the clipboard against one palm.\n\n\"You know what your problem is, Iwabee?\"\n\nIwabee wipes dirt from his knuckles. \"Yeah. Written tests.\"\n\n\"No. You keep acting like the only things that count are the things you're bad at.\"\n\nIwabee stops wiping his hands.","narration");
  setText(d,"iwa_reflect","The instructor waits.");
  setLabel(d,"iwa_reflect","know_good_at","\"I know what I'm good at.\"");
  setLabel(d,"iwa_reflect","better_rest","\"Then I'll get better at the rest too.\"");
  setLabel(d,"iwa_reflect","academy_tests_wrong","\"Maybe the Academy should learn how to test shinobi.\"");
  setLabel(d,"iwa_reflect","dont_care","\"I don't care. I finished the job.\"");
  for(const id of ["know_good_at","better_rest","academy_tests_wrong","dont_care"]){const c=choice(d,"iwa_reflect",id);if(c)c.contextPatch={...(c.contextPatch||{}),iwabeeReflection:id};}
  setText(d,"iwa_end","The instructor snorts once and looks over the repaired ground.\n\n\"Yeah. You did.\"","narration");
  return commit(d);
}

function patchMetal(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_metal_lee);if(!d)return false;
  const priv=beat(d,"met_private");if(!priv)return false;
  priv.text="Metal's heel hits the chalk mark exactly.\n\nAgain.\n\nThe wooden post shudders under his palm. No classmates. No instructor at his shoulder. Just his breathing and the soft scrape of sandals on packed dirt.\n\nHis next sequence is cleaner than the last.";
  delete priv.presentationResolver;priv.nextBeatId="met_private_choice";
  add(d,{beatId:"met_private_choice",mode:"choice",text:"Nobody is watching yet. Metal chooses what to do with the clean rhythm.",choices:[
    {choiceId:"keep_steady",label:"Keep the rhythm exactly where it is.",nextBeatId:"met_spectators",contextPatch:{metalPrivateChoice:"keep_steady"}},
    {choiceId:"push_faster",label:"Add speed while nobody is here to break his focus.",nextBeatId:"met_spectators",contextPatch:{metalPrivateChoice:"push_faster"}},
    {choiceId:"repeat_precise",label:"Repeat the clean sequence until every step lands.",nextBeatId:"met_spectators",contextPatch:{metalPrivateChoice:"repeat_precise"}},
    {choiceId:"change_rhythm",label:"Change the cadence and make himself adapt.",nextBeatId:"met_spectators",contextPatch:{metalPrivateChoice:"change_rhythm"}}
  ]});
  add(d,{beatId:"met_spectators",mode:"narration",text:"A classroom door bangs open.\n\nVoices spill into the yard.\n\nMetal's next breath catches halfway in. Someone says his name.\n\nHis shoulders climb toward his ears before he can stop them.",nextBeatId:"met_pressure_choice"});
  add(d,{beatId:"met_pressure_choice",mode:"choice",text:"The same sequence suddenly feels different.",choices:[
    {choiceId:"force_ignore",label:"Don't look at them. Force the sequence through.",nextBeatId:"met_invite",contextPatch:{metalPressureChoice:"force_ignore"}},
    {choiceId:"slow_breathing",label:"Reset his breathing before the next movement.",nextBeatId:"met_invite",contextPatch:{metalPressureChoice:"slow_breathing"}},
    {choiceId:"repeat_sequence",label:"Start the sequence again from the first step.",nextBeatId:"met_invite",contextPatch:{metalPressureChoice:"repeat_sequence"}},
    {choiceId:"request_reset",label:"Raise a hand. \"Can I reset?\"",nextBeatId:"met_invite",contextPatch:{metalPressureChoice:"request_reset"}}
  ]});
  setResolver(d,"met_invite",()=>{const p=local().metalPressureChoice;const reaction={force_ignore:"Metal fixes his eyes on the post. His shoulder is still too high.",slow_breathing:"Metal exhales slowly until his shoulders drop back where they belong.",repeat_sequence:"Metal steps back to the first chalk mark and resets his feet.",request_reset:"Metal raises one hand. \"Can I reset?\" The watching Genin grins. \"Again.\""}[p]||"The Genin who noticed him grins. \"Again.\"";return{text:reaction};});
  setLabel(d,"met_invite","spar","Spar. If they're watching anyway, make it count.");
  setLabel(d,"met_invite","demonstrate","Do the combination again on the training dummy.");
  setLabel(d,"met_invite","back_out","No. End the session here.");
  conciseUnavailable(choice(d,"met_invite","spar"),"Sparring route unavailable.");
  setText(d,"met_dummy","The next combination starts clean. Then Metal notices the eyes on him. His shoulder tightens. His heel lands a fraction too wide.\n\nBehind the watching students, a badly stacked practice rack gives a wooden crack.\n\nMetal sees the nearest student's face change before he hears the shout.\n\nThe rack is already coming down.");
  setText(d,"met_protect","Embarrassment can wait. The falling rack cannot.");
  setLabel(d,"met_protect","redirect_dummy","Redirect it away from the student.");
  setLabel(d,"met_protect","take_impact","Get between them and take the impact.");
  setLabel(d,"met_protect","destroy_dummy","Break it before it reaches them.");
  setText(d,"met_backout","Metal lowers his hands and ends the session before the watching turns into another performance.\n\nThe decision stings more than the training did.");
  setResolver(d,"met_end",()=>{const r=local().metalProtectiveResponse;
    if(!r)return{text:"Metal leaves the yard with the clean private sequence and the moment he backed out both still sitting in his head. Neither one erases the other."};
    const first={redirect_dummy:"The rack crashes aside instead of into the student.",take_impact:"Metal gets between the student and the falling rack. The impact drives his heel through the chalk line.",destroy_dummy:"Metal strikes first. Wood breaks before the rack can reach the student."}[r]||"The student gets clear because Metal acted.";
    return{text:`${first}\n\nWhen everything is secured, Metal notices his hands are shaking.\n\nNot during the movement. Now.\n\nA classmate looks at the damaged chalk line. \"You were doing way better before we came out.\"\n\nMetal shuts his eyes for one second. \"I know.\"\n\nHe walks back to the first chalk mark and places his heel on it again.\n\n\"So... stay.\"`};
  });
  return commit(d);
}

function patchKakashi(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_kakashi);if(!d)return false;
  setText(d,"kak_brief","The evaluator sets a sealed packet on the table between them, then slides it into the hands of a waiting logistics clerk.\n\n\"Recover it.\"\n\nKakashi looks from the packet to the clerk, then back.\n\nThe evaluator raises one finger. \"And Kakashi? Bring me what you can prove. Not what you guessed correctly.\"","narration");
  setText(d,"kak_clerk","The clerk leaves the Academy quarter and folds into the morning market traffic.\n\nKakashi keeps far enough back that the man never sees him directly. Even so, the clerk checks the same shop-window reflection twice and keeps one hand close to the sealed packet.\n\nNervous.\n\nOr trained.\n\nKakashi doesn't need to decide which yet.");
  setLabel(d,"kak_clerk","shadow_the_clerk","Stay out of sight. See who takes the packet.");
  setLabel(d,"kak_clerk","question_the_clerk","Step in now. Make him explain the route.");
  setLabel(d,"kak_clerk","cut_ahead","Cut ahead. Be where the packet is going.");
  setResolver(d,"kak_exchange",()=>{const r=local().kakashiFirstChoice;
    if(r==="shadow_the_clerk")return{text:"The clerk stops beside a produce stall without looking at it.\n\nA second man reaches past him for a basket. For less than a second, both hands disappear behind hanging cloth.\n\nWhen they separate, the clerk's sleeve sits flat. The other man's does not.\n\nKakashi's eye follows the new weight under the broker's arm.\n\nAcross the lane, somebody else starts moving toward him too quickly to be a shopper.\n\nFarther ahead, a third figure breaks from the crowd carrying a package that looks exactly right from a distance."};
    if(r==="question_the_clerk")return{text:"Kakashi steps into the clerk's path.\n\nThe man's surprise is good. His answer is better—too quick, too complete, and just vague enough around the destination.\n\nThen his eyes flick once past Kakashi's shoulder.\n\nA man is already moving through the crowd toward them. Another figure farther ahead breaks away with what looks like the sealed packet.\n\nThe clerk has given Kakashi information. He has not given him certainty."};
    return{text:"Kakashi leaves the clerk behind and takes the roofs for two blocks.\n\nHe reaches the likely transfer lane first.\n\nThat means he sees the problem before he understands the whole chain: one man carrying something under his sleeve, another moving toward Kakashi with the deliberate pace of someone who has already chosen violence, and a third figure slipping away with an obvious packet.\n\nKakashi knows where the packet might be. He doesn't pretend he saw how it got there."};
  });
  setText(d,"kak_choice","The man approaching Kakashi shifts his shoulder and frees his weapon hand.\n\nThe apparent carrier is almost at the corner.\n\nThe broker stays where he is, one arm tight against his side.\n\nThree problems. Only one of them can get Kakashi's full attention first.");
  setLabel(d,"kak_choice","secure_package","Stay on the packet he can account for. Take it from the broker.");
  setLabel(d,"kak_choice","fight_assassin","Stop the assassin first.");
  setLabel(d,"kak_choice","pursue_apparent_carrier","Follow the apparent carrier before he disappears.");
  conciseUnavailable(choice(d,"kak_choice","fight_assassin"),"Battle route unavailable.");
  const db=beat(d,"kak_debrief");if(db){db.nextBeatId="kak_debrief_answer";db.text="";db.presentationResolver=()=>({text:local().kakashiRetrievalChoice==="secure_package"?"The packet lands on the evaluator's table with a soft wooden knock.\n\nThe evaluator does not touch it.\n\n\"Start from the clerk.\"":"The space where the packet should be stays empty. The evaluator leaves it that way.\n\n\"Start where you knew.\""});}
  add(d,{beatId:"kak_debrief_answer",mode:"narration",presentationResolver:()=>{const c=local();const line=c.kakashiFirstChoice==="shadow_the_clerk"?(c.kakashiRetrievalChoice==="secure_package"?"\"The clerk transferred it to the broker. I watched both hands. I stayed on that packet.\"":"\"The broker had the packet. I left it to follow the runner.\""):c.kakashiFirstChoice==="question_the_clerk"?"\"I knew the clerk was off-route. I didn't see enough of the handoff to call the rest certainty.\"":"\"I predicted the exchange point. I didn't witness the custody chain.\"";return{text:`Kakashi answers without adding anything he can't support.\n\n${line}`};},nextBeatId:"kak_debrief_probe"});
  add(d,{beatId:"kak_debrief_probe",mode:"narration",text:"The evaluator finally looks up.\n\n\"And the thing you guessed correctly?\"\n\nKakashi's gaze shifts once to the route map.\n\n\"Still a guess.\"\n\nThe evaluator's mouth moves—not quite a smile.",nextBeatId:"kak_reflect"});
  setText(d,"kak_reflect","The evaluator closes the file.\n\n\"One answer before you go. What did the exercise punish?\"");
  setLabel(d,"kak_reflect","objective","\"Losing sight of the objective.\"");
  setLabel(d,"kak_reflect","proof","\"Treating an inference like evidence.\"");
  setLabel(d,"kak_reflect","responsibility","\"Trying to own every problem in the street.\"");
  for(const c of beat(d,"kak_reflect").choices||[])c.nextBeatId="kak_sakumo";
  const sak=beat(d,"kak_sakumo");if(sak){sak.exitScene=false;sak.nextBeatId="kak_sakumo_branch";delete sak.presentationResolver;sak.mode="narration";delete sak.speakerName;sak.text="Evening has settled by the time Kakashi gets home.\n\nSakumo is at the low table repairing a strap on his field pack when Kakashi comes in. He glances up once, then at Kakashi's hands.\n\n\"Assessment?\"\n\n\"Finished.\"\n\nSakumo waits. Kakashi starts past him.\n\n\"That good, huh?\"\n\nKakashi stops.";}
  add(d,{beatId:"kak_sakumo_branch",mode:"narration",presentationResolver:()=>{const r=local().kakashiReflection;
    if(r==="objective")return{text:"Kakashi glances toward Sakumo. \"I had the job in front of me. Everything else kept trying to become the job.\"\n\nSakumo puts the strap down. \"Objectives are useful.\"\n\nKakashi raises an eyebrow at the pause.\n\n\"So is noticing what they cost you.\""};
    if(r==="proof")return{text:"\"I was right about something I couldn't prove.\" Kakashi pauses. \"I don't like that those are different.\"\n\n\"Good.\"\n\nKakashi's brow tightens. \"I said I was wrong.\"\n\n\"No. You said you noticed the difference.\""};
    return{text:"\"There were three things happening. I could only take one.\"\n\nSakumo's expression loses its humour. \"That part doesn't get easier.\"\n\nKakashi looks at him properly then."};
  },nextBeatId:"kak_sakumo_close"});
  add(d,{beatId:"kak_sakumo_close",mode:"narration",text:"Kakashi drops his pouch beside the door and sits across from his father.\n\nSakumo pushes the half-repaired strap toward him.\n\n\"Since you're here. Hold that.\"\n\nKakashi takes the strap without complaint.\n\nThe two of them work at the same table.",exitScene:true});
  return commit(d);
}

function patchObito(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_obito);if(!d)return false;
  setText(d,"obi_depart","Obito nearly trips over his own sandal tying it too fast.\n\nFrom the street, a distant Academy bell rings once.\n\n\"Plenty of time.\"\n\nHe says it while already running.\n\nThe fundamentals session matters. If he gets there cleanly, he gets all of it.\n\nThen somebody calls for help from the next street.\n\nObito squeezes his eyes shut for half a second. \"Of course.\"");
  const prompts={obi_furniture:"An older civilian is losing a fight with a cabinet wedged diagonally in a doorway.",obi_vegetables:"A basket bursts across a busy lane. Tomatoes roll toward cart wheels.",obi_equipment:"The Academy custodian is muttering while searching under benches for missing practice gear.",obi_delivery:"Crates have spilled across the road beside an overturned delivery cart.",obi_cart:"Wheels hammer against stone. Somebody screams. A runaway cart is already coming down the lane."};
  for(const [id,t] of Object.entries(prompts))setText(d,id,t);
  setLabel(d,"obi_furniture","furniture_carry_full","\"Move. I've got the heavy end.\"");setLabel(d,"obi_furniture","furniture_stabilize","Brace it, free the corner and get moving again.");setLabel(d,"obi_furniture","furniture_continue","Look at the Academy clocktower and keep running.");
  setLabel(d,"obi_vegetables","vegetables_collect_all","Drop down and gather everything.");setLabel(d,"obi_vegetables","vegetables_clear_lane","Kick the nearest produce out of traffic and clear the lane.");setLabel(d,"obi_vegetables","vegetables_continue","Jump the spill and keep going.");
  setLabel(d,"obi_equipment","equipment_search_full","Join the search until the missing gear turns up.");setLabel(d,"obi_equipment","equipment_check_likely_route","Check the likely drop points on his route and call back what he finds.");setLabel(d,"obi_equipment","equipment_continue","Leave it to Academy staff. Training is the other direction.");
  setLabel(d,"obi_delivery","delivery_right_and_reload","Help lift the cart and reload it.");setLabel(d,"obi_delivery","delivery_clear_passage","Drag the dangerous obstruction clear so traffic can move.");setLabel(d,"obi_delivery","delivery_continue","Vault the mess and take the side lane.");
  setLabel(d,"obi_cart","cart_intercept","Plant himself in its path and stop it.");setLabel(d,"obi_cart","cart_warn_and_redirect","Shout people clear and redirect the lane.");setLabel(d,"obi_cart","cart_continue","Keep running. Someone closer is already moving.");
  const keys=["furniture","vegetables","equipment","delivery","cart"];
  function response(key,value){const all={furniture:{furniture_carry_full:"Obito gets the cabinet through the doorway and bolts before the civilian can thank him twice.",furniture_stabilize:"Obito braces the cabinet, frees the corner and is running again before it settles.",furniture_continue:"Obito keeps running. The voice behind him fades with the street."},vegetables:{vegetables_collect_all:"Obito drops to both knees, gathers the last rolling tomato and shoves the basket back into the vendor's hands.",vegetables_clear_lane:"Obito kicks the nearest produce clear of the wheels and darts through the gap.",vegetables_continue:"Obito jumps the spill without breaking stride."},equipment:{equipment_search_full:"Obito joins the search until the missing practice gear turns up under a bench.",equipment_check_likely_route:"Obito checks the drop points along his route, shouts what he finds and keeps moving.",equipment_continue:"Obito leaves the custodian muttering and keeps running."},delivery:{delivery_right_and_reload:"Obito gets his shoulder under the cart, rights it and helps stack the last crate.",delivery_clear_passage:"Obito drags the dangerous obstruction out of the lane and runs on.",delivery_continue:"Obito vaults the crates and disappears down the side lane."},cart:{cart_intercept:"Obito plants himself in the lane. The cart slams into his grip, wheels shrieking before it stops.",cart_warn_and_redirect:"Obito's shout turns heads in time. People scatter and the cart tears through an empty path.",cart_continue:"Obito keeps running while somebody closer moves for the cart."}};return all[key]&&all[key][value]||"";}
  const flow=[["obi_vegetables","furniture"],["obi_equipment","vegetables"],["obi_delivery","equipment"],["obi_cart","delivery"],["obi_arrival","cart"]];
  for(const [bid,prev] of flow){const b=beat(d,bid);if(!b)continue;const base=b.text;const prior=b.presentationResolver;b.presentationResolver=()=>{const reaction=response(prev,local()[`obito_${prev}`]);let current=base;if(bid==="obi_arrival"){const direct=keys.every(k=>String(local()[`obito_${k}`]||"").endsWith("continue"));current=direct?"Obito hits the training gate hard enough that one sandal skids sideways.\n\nThe instructor checks the sun, then Obito. \"You're early.\"\n\nObito straightens so fast it almost becomes a salute. \"Obviously.\"\n\nEvery training block is still ahead of him.":"Obito reaches the training approach breathing hard. Training is already underway beyond the wall.\n\nWhat remains cannot be guessed from how many people he helped; the journey time has to be real.";}else if(typeof prior==="function"){const p=prior();if(p&&p.text&&!String(p.text).includes("authority"))current=p.text;}return{text:reaction?`${reaction}\n\n${current}`:current};};}
  setResolver(d,"obi_entitlement",()=>{const direct=keys.every(k=>String(local()[`obito_${k}`]||"").endsWith("continue"));return{text:direct?"The opening conditioning block has not closed yet. Obito can still make the whole session.":"Training is already in progress. This route is waiting on exact arrival-time resolution before the game can say what training remains."};});
  const full=choice(d,"obi_entitlement","accept_full_training");if(full)full.label="Get inside. The whole session is still open.";
  const pending=choice(d,"obi_entitlement","timing_pending");if(pending){pending.label="Training timing unresolved.";conciseUnavailable(pending,"Arrival-time resolution required.");}
  setText(d,"obi_training","The conditioning lap burns first.\n\nThen wooden weapons knock against Obito's forearms until he stops over-gripping.\n\nAt the fire-practice line, he wipes sweat from his upper lip, makes the sign again and watches the Academy-scale flame finally hold its shape.\n\nBy the taijutsu closing drill, his legs are shaking.\n\nHe grins anyway. \"Again.\"");
  setText(d,"obi_reflect","After training, Obito sits on the outer rail with the Hokage Monument visible between rooftops.");
  setLabel(d,"obi_reflect","hokage_still","\"I'm still going to be Hokage.\"");setLabel(d,"obi_reflect","faster_next","\"Next time I'm getting here faster.\"");setLabel(d,"obi_reflect","people_mattered","\"Those people mattered too.\"");setLabel(d,"obi_reflect","prove_it","\"Fine. I'll prove it next time.\"");
  setText(d,"obi_end","A passing student hears enough to snort. \"You say that every time.\"\n\nObito pushes his goggles up and points at the Monument.\n\n\"Good. Means you'll remember who called it first.\"\n\nHe hops off the rail and starts home before the student can answer.","narration");
  return commit(d);
}

function patchMenma(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const d=editable(A.sceneByVariant.academy_menma);if(!d)return false;
  const entry=beat(d,d.entryBeatId);if(entry){entry.mode="narration";delete entry.speakerName;entry.text="Iruka drops the marked practice sheet onto Menma's desk. Every line is clean.\n\n\"Again.\"\n\nMenma looks at the sheet, then at him. \"Why?\"\n\n\"Because doing it once isn't mastery.\"\n\nMenma leans back. \"I can do more.\"\n\nIruka's expression softens by exactly enough to irritate him. \"I know. You're still doing this.\"";}
  const forest=d.beats.find(b=>b&&typeof b.text==="string"&&/clear your head|wood|forest/i.test(b.text));
  if(forest){forest.text="Menma gets far enough into the wooded outskirts that the village noise disappears.\n\nA bird launches suddenly from the tree line ahead. Then another.\n\nA dull impact carries through the woods.\n\nInside him, something large pays attention.\n\n\"Interesting.\"\n\nMenma's mouth pulls sideways. \"I don't need your permission.\"\n\nAnother impact. Closer now.";delete forest.presentationResolver;}
  const anko=d.beats.find(b=>b&&typeof b.text==="string"&&/anko/i.test(b.text)&&!b.exitScene);
  if(anko){anko.text="Menma reaches the clearing low behind the roots of a fallen tree.\n\nAnko is already there, being forced backward by an altered subject while another breaks toward the trees.\n\nShe catches movement in Menma's direction. Recognition becomes disbelief.\n\n\"...Menma? What are you doing here?\"\n\nMenma steps out from cover. \"You looked like you needed help.\"";delete anko.presentationResolver;}
  const terminal=[...d.beats].reverse().find(b=>b&&b.exitScene===true);
  if(terminal){terminal.mode="narration";delete terminal.speakerName;terminal.text="Later, with the immediate danger behind him, Menma walks alone beneath the trees again. The adrenaline is finally wearing off.\n\nInside him, the Nine-Tails speaks.\n\n\"You were right.\"\n\nMenma keeps walking. \"About what?\"\n\n\"They were holding you back.\"\n\nMenma slows by half a step.\n\nHe does not answer.";delete terminal.presentationResolver;}
  return commit(d);
}

ensureStyle();
const result={hinata:patchHinata(),izuno:patchIzuno(),mirai:patchMirai(),kushina:patchKushina(),kurenai:patchKurenai(),iwabee:patchIwabee(),metal:patchMetal(),kakashi:patchKakashi(),obito:patchObito(),menma:patchMenma()};

function runAlphaOriginScreenFirst33700Diagnostics(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;
  const kak=A&&definition(A.sceneByVariant.academy_kakashi),hin=A&&definition(A.sceneByVariant.academy_hinata),met=A&&definition(A.sceneByVariant.academy_metal_lee),men=A&&definition(A.sceneByVariant.academy_menma);
  const kakText=kak&&kak.beatMap?String(kak.beatMap.get("kak_brief")?.text||""):"";
  const checks={
    patchId:PATCH_ID==="alpha_origin_screen_first_33700_2026_09_13",
    writingAuthorityPinned:AUTHORITY_ORIGINS==="a08dcf50f67d264497944af761475865dff8dc81"&&AUTHORITY_KAKASHI_V2==="c774cd1582b267fb5afbc67bc3bb8556bea71449"&&AUTHORITY_DOCTRINE==="7b646d8697879506f0421af01d6083f8482b828c",
    tenOriginsPatched:Object.keys(result).length===10&&Object.values(result).every(Boolean),
    kakashiV2SceneProjected:!!kak&&kakText.includes("sealed packet")&&kakText.includes("guessed correctly")&&kak.beatMap.has("kak_debrief_answer")&&kak.beatMap.has("kak_sakumo_close"),
    kakashiDeveloperBlockerHidden:!!kak&&String(kak.beatMap.get("kak_choice")?.choices?.find(c=>c.choiceId==="fight_assassin")?.availability?.().knownBlocker||"")==="Battle route unavailable.",
    hinataPhysicalScene:!!hin&&String(hin.beatMap.get("hin_practice")?.text||"").includes("Morning mist"),
    metalAddsPerformedPressureBeats:!!met&&met.beatMap.has("met_private_choice")&&met.beatMap.has("met_pressure_choice"),
    menmaSceneStillRegisteredAndProjected:!!men&&String(men.beatMap.get(men.entryBeatId)?.text||"").includes("Iruka"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,result:{...result},patched:[...patched],browserGoldenClaimed:false};
}

globalThis.SC_ALPHA_ORIGIN_SCREEN_FIRST_33700=Object.freeze({patchId:PATCH_ID,originAuthorityCommit:AUTHORITY_ORIGINS,kakashiV2AuthorityCommit:AUTHORITY_KAKASHI_V2,doctrineCommit:AUTHORITY_DOCTRINE,result:{...result},browserGoldenClaimed:false});
globalThis.runAlphaOriginScreenFirst33700Diagnostics=runAlphaOriginScreenFirst33700Diagnostics;
})();
