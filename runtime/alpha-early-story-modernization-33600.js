// ============================================================================
// ALPHA EARLY STORY MODERNIZATION — 33600
//
// Coding consumption of Writing #170 final authority:
// Documentation/Story/Early_Game_Origin_and_Arc1_Player_Facing_Writing_Modernization_2026-09-13.md
// commit 57697fb9dfd7920a2466c64cf7813d99f424f24e
//
// Expression-only pass. Existing semantic IDs, consequence requests, Battle
// seams, World facts, Knowledge, Rank, PL, Progression and acquisition remain
// untouched. 33500/33510 have already restored branch-specific realization;
// this layer removes internal guardrail prose and gives the Origins the final
// production voice/physicality Writing authorised.
// ============================================================================
(function installAlphaEarlyStoryModernization33600(){
"use strict";
if(globalThis.SC_ALPHA_EARLY_STORY_MODERNIZATION_33600)return;

const PATCH_ID="alpha_early_story_modernization_33600_2026_09_13";
const WRITING_AUTHORITY_COMMIT="57697fb9dfd7920a2466c64cf7813d99f424f24e";
const patched=[];

function definition(sceneId){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(sceneId):null;}catch(_error){return null;}}
function editable(sceneId){
  const def=definition(sceneId);if(!def)return null;
  const beats=Array.isArray(def.beats)?def.beats.map(b=>({...b,choices:Array.isArray(b.choices)?b.choices.map(c=>({...c})):b.choices})):
    def.beatMap instanceof Map?Array.from(def.beatMap.values()).map(b=>({...b,choices:Array.isArray(b.choices)?b.choices.map(c=>({...c})):b.choices})):[];
  if(!beats.length)return null;
  const copy={...def,beats};delete copy.beatMap;return copy;
}
function beat(def,id){return def&&Array.isArray(def.beats)?def.beats.find(b=>b&&b.beatId===id)||null:null;}
function choice(def,beatId,choiceId){const row=beat(def,beatId);return row&&Array.isArray(row.choices)?row.choices.find(c=>c&&c.choiceId===choiceId)||null:null;}
function text(def,id,value){const row=beat(def,id);if(row){row.text=value;delete row.presentationResolver;}return row;}
function label(def,beatId,choiceId,value){const row=choice(def,beatId,choiceId);if(row)row.label=value;return row;}
function add(def,row){const existing=beat(def,row.beatId);if(existing)Object.assign(existing,row);else def.beats.push(row);return row;}
function commit(def){
  if(!def||typeof registerStoryScene!=="function")return false;
  try{if(typeof unregisterStoryScene==="function")unregisterStoryScene(def.sceneId);}catch(_error){}
  const result=registerStoryScene(def);if(result&&result.success===false)return false;
  patched.push(def.sceneId);return true;
}
function local(){try{const A=globalThis.SC_ALPHA_ORIGIN_32900;return A&&typeof A.local==="function"?A.local():{};}catch(_error){return {};}}

function patchHinata(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const def=editable(A.sceneByVariant.academy_hinata);if(!def)return false;
  text(def,"hin_practice","Dawn has barely reached the Hyūga compound when Hinata's palms begin to sting. The same form. Again. Feet placed exactly where they were placed yesterday. The instructor watches her finish it without comment, then steps aside and calls another student forward. ‘Enough repetition. Show me what you do when the other person moves.’");
  text(def,"hin_1","Her opponent settles into stance. Hinata can feel the familiar urge to wait until she is completely certain. The instructor is already watching.");
  label(def,"hin_1","attack_immediately","Move first. Don't give them the tempo.");
  label(def,"hin_1","wait_for_opening","Let them show the opening.");
  label(def,"hin_1","defensive_stance","Make them come through her guard.");
  label(def,"hin_1","study_movement","Watch the shoulders and feet before committing.");
  text(def,"hin_2","The first exchange breaks the neat Academy rhythm. Her opponent adjusts. So does Hinata.");
  text(def,"hin_3","One clean opening appears—and begins to close.");
  const evalBeat=beat(def,"hin_eval");if(evalBeat)evalBeat.presentationResolver=()=>{
    const ctx=local();
    const h1={attack_immediately:"moved first",wait_for_opening:"waited until the opening showed itself",defensive_stance:"made the opponent come through her guard",study_movement:"watched the shoulders and feet before committing"}[ctx.h1]||"committed to an opening approach";
    const h2={press_advantage:"pressed when the advantage appeared",redirect_attack:"redirected the return attack",create_distance:"created distance",change_approach:"changed approach when the exchange shifted"}[ctx.h2]||"adapted through the middle exchange";
    const h3={commit_strike:"committed to the strike",counter:"countered",remain_patient:"stayed patient",trust_observation:"trusted what she had observed"}[ctx.h3]||"made the final decision";
    return{text:`The instructor stops the exchange, corrects Hinata's footing and makes her repeat the decisive moment once. She ${h1}, ${h2}, then ${h3}. No speech. Just: “Again.” Hinata resets without looking away.`};
  };
  text(def,"hin_young","At the compound gate, a younger Hyūga student is still trying the same turn of the hip. They stop the instant they realise Hinata has noticed.");
  label(def,"hin_young","show_movement","Show them once. Slowly.");
  label(def,"hin_young","explain_error","Tell them where the movement is going wrong.");
  label(def,"hin_young","leave_them_to_figure_it_out","Leave them the space to work it out.");
  label(def,"hin_young","stay_and_watch","Stay long enough to see what they're missing.");
  text(def,"hin_end","Tomorrow... I'll do it cleaner.");
  return commit(def);
}

function patchIzuno(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const def=editable(A.sceneByVariant.academy_izuno);if(!def)return false;
  text(def,"izu_start","The Academy target gets a head start and vanishes into the village training routes. A flare at the extraction point marks the only thing Wasabi knows for certain: if it goes up before she gets there, she was too slow—or followed the wrong story.");
  text(def,"izu_initial","The obvious trail is almost too obvious. Scuffed dirt points east. A snapped reed points toward the drainage path. Two other students are already arguing over which one matters.");
  label(def,"izu_initial","obvious_trail","Take the trail at face value and move.");
  label(def,"izu_initial","environmental_signs","Check what the environment says before trusting footprints.");
  label(def,"izu_initial","cooperate_students","Use the other students instead of racing them.");
  label(def,"izu_initial","predict_destination","Forget the trail. Predict the extraction route.");
  text(def,"izu_split","A second set of signs appears and the pursuit stops being clean. Wasabi has enough information to commit—but not enough to know she is right.");
  text(def,"izu_rogue","Another Academy student skids into view with a Rogue Genin crowding their escape. That is not part of the trial. The target is still moving.");
  const evalBeat=beat(def,"izu_eval");if(evalBeat)evalBeat.presentationResolver=()=>{const ctx=local();const route={river_route:"the longer river route",stronger_trail:"the stronger trail that turned false",rogue_interruption:"the interruption she chose to answer",intercept_prediction:"the extraction route she predicted"}[ctx.route]||"the route she committed to";return{text:`By the time the instructor calls the exercise, Wasabi has an answer—and a trail of reasons behind it. She has to account for ${route}: what she actually saw, what she assumed and what happened while the target kept moving.`};};
  label(def,"izu_reflect","trust_trail","Next time, commit faster.");
  label(def,"izu_reflect","trust_notice","Next time, trust what I notice before what they leave for me.");
  label(def,"izu_reflect","fastest_not_obvious","The obvious route is obvious for a reason—and that's the problem.");
  label(def,"izu_reflect","catch_not_only","Catching the target wasn't the only thing happening out there.");
  text(def,"izu_end","Wasabi drops back onto the village route at a jog, already replaying the turns she trusted and the ones she didn't.");
  return commit(def);
}

function patchMirai(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const def=editable(A.sceneByVariant.academy_mirai);if(!def)return false;
  text(def,"mir_start","The escort begins badly only in hindsight. The civilian is polite, knows the route, thanks Mirai for walking on the road-side of the path and asks ordinary questions about the Academy. Nothing about them demands suspicion.");
  text(def,"mir_talk","Conversation fills the walk. Mirai asks something ordinary—not because she is interrogating them, but because silence for the whole escort would be strange.");
  const inconsistent=beat(def,"mir_inconsistent");if(inconsistent)inconsistent.presentationResolver=()=>{const ctx=local();const detail={origin:"The clothing no longer fits the country they described.",route:"The route no longer fits the route they described.",family:"A family detail comes back differently.",trip:"A detail about the trip to Konoha comes back differently."}[ctx.talk]||"One small detail refuses to fit.";return{text:`Later, one small detail refuses to fit. Then another. ${detail} Nothing proves anything yet. It is simply wrong enough to stay in Mirai's head.`};};
  label(def,"mir_inconsistent","challenge_direct","Stop them and ask directly.");
  label(def,"mir_inconsistent","test_question","Ask again from a different angle.");
  label(def,"mir_inconsistent","pretend_not_notice","Act like she didn't notice. Watch what changes.");
  label(def,"mir_inconsistent","change_route","Change the route without warning and see how they react.");
  const deeper=beat(def,"mir_deeper");if(deeper)deeper.presentationResolver=()=>{const ctx=local();const reaction={test_question:"The new answer gives Mirai another detail to compare.",pretend_not_notice:"She keeps escort formation and waits for the next contradiction.",change_route:"The unannounced route change produces a reaction she can actually observe."}[ctx.miraiSuspicionResponse]||"Mirai keeps watching.";return{text:`Suspicion has become a pattern. It still is not proof. ${reaction}`};};
  text(def,"mir_checkpoint","At the checkpoint the transformation releases. The person Mirai protected is still standing exactly where she delivered them—safe, cooperative and not the person she thought she was escorting. For one ugly second, both facts are true at once.");
  text(def,"mir_verified","Mirai never accuses them. She changes one question, then one route detail, then watches the answer arrive half a beat too late. By the time she acts, she has enough to expose the substitution without pretending she knows who is underneath it.");
  text(def,"mir_eval","The instructor waits until Mirai has reconstructed the route herself. Protection and identification turned out to be two different jobs.");
  text(def,"mir_end","You kept your client alive. Next time, make sure the client is the person you were assigned.");
  return commit(def);
}

function patchKushina(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const def=editable(A.sceneByVariant.academy_kushina);if(!def)return false;
  text(def,"kus_crisis","The practice formula should have gone dark three strokes ago. Instead, chakra crawls past the boundary line and snaps across the courtyard stone toward the student kneeling beside it. The instructor moves—but Kushina is closer.");
  label(def,"kus_crisis","correct_formula","Fix the formula before it tears itself apart.");
  label(def,"kus_crisis","protect_student","Get the student out first.");
  label(def,"kus_crisis","contain_damaged_seal","Close the broken boundary around the leak.");
  label(def,"kus_crisis","move_unstable_object","Move the damned scroll somewhere empty.");
  return commit(def);
}

function patchKurenai(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const def=editable(A.sceneByVariant.academy_kurenai);if(!def)return false;
  text(def,"kur_bell","A brass bell hangs from the instructor's belt. No weapons. No spectators. One rule. “Take it.”");
  text(def,"kur_layer1","Kurenai watches the instructor's eyes instead of the bell. If he believes the first lie, the second one will not need to be bigger—only better placed.");
  label(def,"kur_layer1","false_kurenai","Give him a Kurenai he can see.");
  label(def,"kur_layer1","conceal_movement","Hide the real movement behind the obvious one.");
  label(def,"kur_layer1","distort_position","Make distance lie.");
  label(def,"kur_layer1","fake_clumsy","Let him believe she came straight at him.");
  text(def,"kur_loss_attack","His eyes follow the false Kurenai exactly where she wanted them. The question is whether she spends that belief now.");
  text(def,"kur_partial_loss_2","The instructor tracks the movement he can see. The real movement stays somewhere else.");
  text(def,"kur_partial_loss_3","For one beat, the bell looks unguarded enough to be real.");
  text(def,"kur_partial_win_2","The distance between Kurenai and the bell stops agreeing with what the instructor thinks he saw.");
  text(def,"kur_partial_win_3","He starts to dismiss the attempt. That certainty is another surface she can use.");
  text(def,"kur_complete_2","He sees exactly what she offered him: a clumsy direct approach.");
  text(def,"kur_complete_3","He believes he has caught her. Kurenai lets the belief settle before touching it.");
  text(def,"kur_result","The illusion peels away in the order Kurenai built it. For a moment the courtyard contains the bell, the instructor, and the version of the exchange he thought happened. Then only the real positions remain.");
  text(def,"kur_lesson","Genjutsu isn't making someone see something strange. It's deciding which part of reality they stop checking.");
  return commit(def);
}

function patchIwabee(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const def=editable(A.sceneByVariant.academy_iwabee);if(!def)return false;
  text(def,"iwa_task","Make it usable.");
  text(def,"iwa_reshape","Half the training ground has slumped after a failed Earth Release exercise. One lane is cracked, one wall is leaning and everyone has spent five minutes explaining why it is somebody else's fault. Iwabee looks at the ground once. Written tests take him forever. This does not.");
  const expose=beat(def,"iwa_expose");if(expose)expose.presentationResolver=()=>{const ctx=local();const terrain={raise_collapsed:"The collapsed section heaves upward and locks into a usable shelf.",flatten_ground:"The broken ground settles under his Earth Release until the lane lies flat again.",build_path:"Stone rises into a stable path through the damaged section.",reinforce_weakest:"The weakest section thickens and braces against the damaged ground around it."}[ctx.iwabeeTerrainChoice]||"The damaged ground changes under Iwabee's Earth Release.";return{text:`${terrain} Then something underneath the collapsed edge moves. A Genin in travel-stained gear rolls out of the newly exposed hollow and freezes when he sees the Academy group. He was hiding here. He was not part of the lesson.`};};
  text(def,"iwa_response","The Rogue Genin glances from Iwabee to the open route. The training problem just became somebody else's real problem too.");
  text(def,"iwa_reflect","Iwabee looks from the repaired ground to the mess the unexpected Genin left behind. What part of the assessment matters to him?");
  text(def,"iwa_end","Iwabee looks back once at the ground he repaired and at whatever his choice about the Rogue Genin left behind, then shoulders past the edge of the training yard.");
  return commit(def);
}

function patchMetal(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const def=editable(A.sceneByVariant.academy_metal_lee);if(!def)return false;
  text(def,"met_private","Metal is good when nobody is watching. His feet land where he wants them. His breathing stays measured. The training post shudders on the final strike and Metal immediately resets his stance to do it again. Then someone claps from behind him.");
  text(def,"met_invite","The Genin who saw him grins like the answer is obvious. “Again.”");
  label(def,"met_invite","spar","Spar. If they're watching anyway, make it count.");
  label(def,"met_invite","demonstrate","Do the combination again on the training dummy.");
  label(def,"met_invite","back_out","No. End the session here.");
  text(def,"met_dummy","The next combination starts clean. Then Metal notices the eyes on him. His shoulder tightens. His heel lands a fraction too wide. The dummy jerks off-line hard enough to become a real problem for the student beside it.");
  text(def,"met_protect","Embarrassment can wait. The dummy cannot.");
  label(def,"met_protect","redirect_dummy","Redirect it away from the student.");
  label(def,"met_protect","take_impact","Get between them and take the impact.");
  label(def,"met_protect","destroy_dummy","Break it before it reaches them.");
  text(def,"met_backout","Metal lowers his hands and ends the session before the watching turns into another performance. The decision stings more than the training did.");
  const end=beat(def,"met_end");if(end)end.presentationResolver=()=>{const ctx=local();const response={redirect_dummy:"The student is clear of the dummy's path because Metal chose to redirect it.",take_impact:"Metal put himself between the student and the impact.",destroy_dummy:"The dummy never reaches the student; Metal chose to break it first."}[ctx.metalProtectiveResponse];return{text:response?`${response} When the yard settles, Metal is still thinking about the first combination—the one he landed clean before anyone clapped.`:"Metal leaves with the private session and the moment he backed out both still sitting in his head. Neither one disappears because the other happened."};};
  return commit(def);
}

// Academy Kakashi legacy expression patch retired for clean-room V2.
// 33600 continues to modernize the other Origins only.

function patchObito(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;const def=editable(A.sceneByVariant.academy_obito);if(!def)return false;
  text(def,"obi_depart","Obito leaves early. Deliberately early. Today is one of the sessions that matters—the kind where nobody can say he only talks about becoming Hokage. He makes it three streets before somebody needs something.");
  label(def,"obi_furniture","furniture_carry_full","“Hang on. I'll get the other end.”");
  label(def,"obi_furniture","furniture_stabilize","Brace it, free the doorway, keep moving.");
  label(def,"obi_furniture","furniture_continue","Keep going. Training starts whether he's there or not.");
  label(def,"obi_vegetables","vegetables_collect_all","Get every last one before the carts crush them.");
  label(def,"obi_vegetables","vegetables_clear_lane","Clear the lane fast, then run.");
  label(def,"obi_vegetables","vegetables_continue","Keep moving. Somebody else can stop.");
  label(def,"obi_equipment","equipment_search_full","Help search until it's found.");
  label(def,"obi_equipment","equipment_check_likely_route","Check the obvious drop points on his route.");
  label(def,"obi_equipment","equipment_continue","Academy staff can handle Academy equipment. Keep going.");
  label(def,"obi_delivery","delivery_right_and_reload","Right the cart and rebuild the load.");
  label(def,"obi_delivery","delivery_clear_passage","Clear the dangerous obstruction and move.");
  label(def,"obi_delivery","delivery_continue","Go around.");
  label(def,"obi_cart","cart_intercept","Stop it.");
  label(def,"obi_cart","cart_warn_and_redirect","Get everyone out of its path.");
  label(def,"obi_cart","cart_continue","Keep moving.");
  const arrival=beat(def,"obi_arrival");if(arrival){const previous=arrival.presentationResolver;arrival.presentationResolver=()=>{const ctx=local();const direct=["furniture","vegetables","equipment","delivery","cart"].every(k=>String(ctx[`obito_${k}`]||"").endsWith("continue"));if(direct)return{text:"Obito hits the training approach breathing hard but on time. For once, there is nobody to blame, nobody to wait for and no excuse to make. The whole session is still ahead of him."};const base=typeof previous==="function"?(previous()||{}).text:"";return{text:"Obito reaches the training approach later than he planned. The session is already underway; what remains must be resolved from the journey time he actually spent, not from whether helping was ‘good’ or ‘bad’."+(base&&base.includes("exact")?"":"")};};}
  const entitlement=beat(def,"obi_entitlement");if(entitlement)entitlement.presentationResolver=()=>{const ctx=local();const direct=["furniture","vegetables","equipment","delivery","cart"].every(k=>String(ctx[`obito_${k}`]||"").endsWith("continue"));return{text:direct?"The opening conditioning block has not closed yet. Obito can still make the whole session.":"Training is already in progress. The exact remaining blocks must follow the authoritative arrival-time result for this journey."};};
  text(def,"obi_training","Obito joins the session: conditioning until his legs burn, weapon fundamentals until his grip stops slipping, Academy-scale Fire work and the Taijutsu closing drill.");
  label(def,"obi_reflect","hokage_still","I'm still becoming Hokage.");
  label(def,"obi_reflect","faster_next","Next time I get here faster.");
  label(def,"obi_reflect","people_mattered","They mattered too.");
  label(def,"obi_reflect","prove_it","Fine. I'll prove it again.");
  const end=beat(def,"obi_end");if(end)end.presentationResolver=()=>({text:"Obito looks toward the Hokage Monument for another second, then turns back toward the village. Whatever the journey cost him, the answer in his head is still his."});
  return commit(def);
}

const originResults={
  hinata:patchHinata(),izuno:patchIzuno(),mirai:patchMirai(),menmaReviewedNotRestructured:true,
  kushina:patchKushina(),kurenai:patchKurenai(),iwabee:patchIwabee(),metal:patchMetal(),obito:patchObito()
};

// #121 early-Arc production consumer. 33600 is already a terminal browser
// extension, so it is also a safe place to activate the independent CE adapter
// without making the Story graph depend on it at parser time.
function activateEarlyArc121(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return false;
  function load(){
    if(globalThis.SC_ALPHA_MISSION_CHOICE_EARLY_ARC_BINDINGS_121||document.getElementById("sc-alpha-mission-choice-early-arc-bindings-121-script"))return true;
    const script=document.createElement("script");
    script.id="sc-alpha-mission-choice-early-arc-bindings-121-script";
    script.src="runtime/alpha-mission-choice-early-arc-bindings-121.js";
    script.async=false;document.head.appendChild(script);return true;
  }
  if(globalThis.SC_ALPHA_MISSION_CHOICE_121)return load();
  const engine=document.getElementById("sc-alpha-mission-choice-121-script");
  if(engine){engine.addEventListener("load",load,{once:true});return true;}
  return false;
}
const earlyArcActivationInstalled=activateEarlyArc121();

function runAlphaEarlyStoryModernization33600Diagnostics(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;
  const kush=A&&definition(A.sceneByVariant.academy_kushina),kur=A&&definition(A.sceneByVariant.academy_kurenai),metal=A&&definition(A.sceneByVariant.academy_metal_lee),obi=A&&definition(A.sceneByVariant.academy_obito);
  const checks={
    patchId:PATCH_ID==="alpha_early_story_modernization_33600_2026_09_13",
    writingAuthorityPinned:WRITING_AUTHORITY_COMMIT==="57697fb9dfd7920a2466c64cf7813d99f424f24e",
    nonKakashiOriginsReviewed:Object.keys(originResults).length===9&&Object.values(originResults).every(Boolean),
    kakashiLegacyExpressionRetired:!Object.prototype.hasOwnProperty.call(originResults,"kakashi"),
    kushinaOpeningModernized:!!(kush&&kush.beatMap&&String(kush.beatMap.get("kus_crisis")?.text||"").includes("three strokes ago")),
    kurenaiSystemGuardrailRemoved:!!(kur&&kur.beatMap&&!String(kur.beatMap.get("kur_result")?.text||"").includes("personality")),
    metalSystemGuardrailRemoved:!!(metal&&metal.beatMap&&!String(metal.beatMap.get("met_private")?.text||"").includes("legitimately demonstrates")),
    obitoAuthorityNarrationRemoved:!!(obi&&obi.beatMap&&!String(obi.beatMap.get("obi_training")?.text||"").includes("Progression authority")),
    earlyArc121ActivationInstalled,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,originResults:{...originResults},patched:[...patched],browserGoldenClaimed:false};
}

globalThis.SC_ALPHA_EARLY_STORY_MODERNIZATION_33600=Object.freeze({patchId:PATCH_ID,writingAuthorityCommit:WRITING_AUTHORITY_COMMIT,originResults:{...originResults},browserGoldenClaimed:false});
globalThis.runAlphaEarlyStoryModernization33600Diagnostics=runAlphaEarlyStoryModernization33600Diagnostics;
})();
