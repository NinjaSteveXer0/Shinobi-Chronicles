// ALPHA ORIGIN BROWSER REALISATION 33500
// Installed-browser repair for #105 / #175.
//
// Scope:
// - fix Story Environment stacking so an authored dedicated backdrop sits above
//   the underlying World surface/markers instead of behind a translucent layer;
// - project already-locked Origin branch choreography instead of collapsing
//   materially different choices onto the same generic player-facing sentence.
//
// This is presentation/Story graph reconciliation only. It creates no new
// World Truth, Rank, PL, Skill, ownership, personality/alignment or Mission
// semantics, and it does not claim installed-browser Golden.
(function installAlphaOriginBrowserRealisation33500(){
"use strict";
if(globalThis.SC_ALPHA_ORIGIN_BROWSER_REALISATION_33500)return;

const PATCH_ID="alpha_origin_browser_realisation_33500_2026_09_13";
const STYLE_ID="sc-alpha-origin-story-presentation-33500-style";
const patchedScenes=[];

function installStoryStackingFix33500(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
    #story-scene-presentation-layer{isolation:isolate}
    #story-scene-presentation-layer .sc-story-environment{
      z-index:0!important;
      pointer-events:none!important;
    }
    #story-scene-presentation-layer .sc-story-environment-scrim{
      z-index:1!important;
      pointer-events:none!important;
    }
    #story-scene-presentation-layer .sc-story-stage{
      position:relative!important;
      z-index:2!important;
    }
  `;
  document.head.appendChild(style);
  return true;
}

function storyDefinition33500(sceneId){
  try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(sceneId):null;}
  catch(_error){return null;}
}

function editableScene33500(sceneId){
  const def=storyDefinition33500(sceneId);
  if(!def)return null;
  const beats=Array.isArray(def.beats)
    ? def.beats.map(beat=>({...beat,choices:Array.isArray(beat.choices)?beat.choices.map(choice=>({...choice})):beat.choices}))
    : def.beatMap instanceof Map
      ? Array.from(def.beatMap.values()).map(beat=>({...beat,choices:Array.isArray(beat.choices)?beat.choices.map(choice=>({...choice})):beat.choices}))
      : [];
  if(!beats.length)return null;
  const base={...def};
  delete base.beatMap;
  base.beats=beats;
  return base;
}

function beat33500(def,beatId){
  return def&&Array.isArray(def.beats)?def.beats.find(row=>row&&row.beatId===beatId)||null:null;
}

function choice33500(def,beatId,choiceId){
  const beat=beat33500(def,beatId);
  return beat&&Array.isArray(beat.choices)?beat.choices.find(row=>row&&row.choiceId===choiceId)||null:null;
}

function addBeat33500(def,beat){
  if(!def||!beat||!beat.beatId)return false;
  const existing=beat33500(def,beat.beatId);
  if(existing)Object.assign(existing,beat);
  else def.beats.push(beat);
  return true;
}

function commitScene33500(def){
  if(!def||!def.sceneId||typeof registerStoryScene!=="function")return false;
  try{if(typeof unregisterStoryScene==="function")unregisterStoryScene(def.sceneId);}catch(_error){}
  const result=registerStoryScene(def);
  if(result&&result.success===false)return false;
  patchedScenes.push(def.sceneId);
  return true;
}

function label(value,map){return map[value]||String(value||"the selected response").replaceAll("_"," ");}

// Hinata: preserve the exact three-decision controlled-spar structure, but make
// the evaluation and younger-student follow-up visibly consume the choices that
// were actually made. No hidden score or personality trait is invented.
function patchHinata33500(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;
  if(!A)return false;
  const sceneId=A.sceneByVariant.academy_hinata;
  const def=editableScene33500(sceneId);if(!def)return false;

  // #340 Writing-GOLDEN owns its complete visible evaluation/younger-student
  // expression natively. The pre-#340 33500 Hinata shim must stand down rather
  // than re-registering compressed prose over the authoritative Story graph.
  const goldenNative=!!(
    beat33500(def,"hin_ex1_choice")&&
    beat33500(def,"hin_ex2_wait_choice")&&
    beat33500(def,"hin_ex2_press_choice")&&
    beat33500(def,"hin_ex2_reset_choice")&&
    beat33500(def,"hin_ex3_changed_choice")&&
    beat33500(def,"hin_young_choice")&&
    beat33500(def,"hin_close_5")
  );
  if(goldenNative)return true;

  // Bounded compatibility for pre-#340 Alpha branches only.
  const evalBeat=beat33500(def,"hin_eval");
  const youngBeat=beat33500(def,"hin_young");
  const endBeat=beat33500(def,"hin_end");
  if(!evalBeat||!youngBeat||!endBeat)return false;

  const h1={attack_immediately:"attacked immediately",wait_for_opening:"waited for an opening",defensive_stance:"opened from a defensive stance",study_movement:"studied the opponent's movement"};
  const h2={press_advantage:"pressed the advantage",redirect_attack:"redirected the attack",create_distance:"created distance",change_approach:"changed approach"};
  const h3={commit_strike:"committed to the strike",counter:"countered",remain_patient:"remained patient",trust_observation:"trusted what she had observed"};
  evalBeat.presentationResolver=()=>{
    const ctx=A.local();
    return{text:`The instructor evaluates the spar as one sequence, not three isolated answers. Hinata ${label(ctx.h1,h1)}, then ${label(ctx.h2,h2)}, and at the decisive moment ${label(ctx.h3,h3)}. What matters is what she actually demonstrated under pressure.`};
  };

  for(const c of youngBeat.choices||[])c.nextBeatId="hin_young_result";
  addBeat33500(def,{
    beatId:"hin_young_result",mode:"narration",
    presentationResolver:()=>{
      const ctx=A.local();
      const text={
        show_movement:"Hinata stops and shows the younger student the movement she had been drilling herself.",
        explain_error:"Hinata stops and explains where the younger student's movement is breaking down.",
        leave_them_to_figure_it_out:"Hinata leaves the younger student to work through the movement without her intervention.",
        stay_and_watch:"Hinata stays and watches. In the younger student's mistakes and hesitation, she recognises parts of her own form that she had not noticed while performing it."
      }[ctx.young];
      return{text:text||"Hinata's choice at the gate becomes part of what actually happened."};
    },
    onEnterConsequences:endBeat.onEnterConsequences||[],
    nextBeatId:"hin_end"
  });
  endBeat.onEnterConsequences=[];
  return commitScene33500(def);
}

// Wasabi: route choice now produces a distinct visible route result before the
// shared evaluation. These are direct projections of the locked pursuit
// choreography, not new success/failure scoring.
function patchIzuno33500(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editableScene33500(A.sceneByVariant.academy_izuno);if(!def)return false;
  // #343 native WRITING GOLDEN owns the full Wasabi graph. The old 33500
  // compatibility shim must stand down rather than re-register compressed prose.
  const goldenNative=!!(
    beat33500(def,"izu_initial_choice")&&
    beat33500(def,"izu_split_choice")&&
    beat33500(def,"izu_rogue_choice")&&
    beat33500(def,"izu_rogue_step_in_battle")&&
    beat33500(def,"izu_reflect_choice")&&
    beat33500(def,"izu_close_1")
  );
  if(goldenNative)return true;
  const split=beat33500(def,"izu_split"),rogue=beat33500(def,"izu_rogue"),evalBeat=beat33500(def,"izu_eval");
  if(!split||!rogue||!evalBeat)return false;

  for(const id of ["river_route","stronger_trail","intercept_prediction"]){
    const c=choice33500(def,"izu_split",id);if(c)c.nextBeatId="izu_route_result";
  }
  addBeat33500(def,{
    beatId:"izu_route_result",mode:"narration",
    presentationResolver:()=>{
      const ctx=A.local();
      return{text:{
        river_route:"Wasabi takes the longer river route. It costs time, but the route remains reliable and preserves positional certainty as the target closes on extraction.",
        stronger_trail:"Wasabi commits to the stronger trail and discovers that the obvious strength of the evidence was the trap: it is a false trail. The lost time is real, but so is the tracking intelligence she just earned.",
        intercept_prediction:"Wasabi stops treating the exercise like a footrace. She predicts the extraction route and reaches the intercept point through inference rather than by mechanically outrunning the target."
      }[ctx.route]||"The route changes what Wasabi actually learns and where the pursuit goes next."};
    },
    nextBeatId:"izu_eval"
  });

  for(const id of ["call_for_help","keep_pursuing"]){
    const c=choice33500(def,"izu_rogue",id);if(c)c.nextBeatId="izu_rogue_result";
  }
  addBeat33500(def,{
    beatId:"izu_rogue_result",mode:"narration",
    presentationResolver:()=>{
      const ctx=A.local();
      return{text:ctx.rogueResponse==="call_for_help"
        ?"Wasabi calls for help instead of pretending the Rogue Genin interruption is the same problem as the pursuit. The secondary occurrence is resolved through that escalation, while the formal chase has continued without waiting for her."
        :"Wasabi keeps pursuing. The Rogue Genin interruption remains a separate occurrence rather than being rewritten as part of the target trial."};
    },
    nextBeatId:"izu_eval"
  });

  evalBeat.presentationResolver=()=>{
    const ctx=A.local();
    const initial={obvious_trail:"the obvious trail",environmental_signs:"environmental signs",cooperate_students:"cooperation with other students",predict_destination:"destination prediction"}[ctx.initial]||"her opening route";
    const route={river_route:"the reliable river route",stronger_trail:"the false stronger trail",rogue_interruption:"the Rogue Genin interruption",intercept_prediction:"the intercept prediction"}[ctx.route]||"the route that followed";
    return{text:`The instructor evaluates the pursuit that actually happened: Wasabi began with ${initial}, then committed to ${route}. Evidence, target result and the secondary occurrence remain separate instead of being flattened into a single catch/fail verdict.`};
  };
  return commitScene33500(def);
}

// Mirai: the earlier conversation now changes the exact inconsistency projected
// later. The player is shown why their ordinary first choice mattered without
// leaking the substitution before Mirai can legitimately suspect it.
function patchMirai33500(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editableScene33500(A.sceneByVariant.academy_mirai);if(!def)return false;
  const inconsistent=beat33500(def,"mir_inconsistent");
  const deeper=beat33500(def,"mir_deeper");
  const evalBeat=beat33500(def,"mir_eval");
  if(!inconsistent||!deeper||!evalBeat)return false;

  inconsistent.presentationResolver=()=>{
    const ctx=A.local();
    const text={
      origin:"Later, Mirai notices that the man's clothing no longer fits the country he previously claimed to be from. The inconsistency exists because of what she actually asked earlier; it is evidence, not omniscient proof of who he is.",
      route:"Later, the route being taken no longer matches the route the escort described when Mirai asked about it earlier. The contradiction is evidence, not confirmation.",
      family:"Later, one of the man's answers no longer fits the family information he gave Mirai earlier. The contradiction is evidence, not confirmation.",
      trip:"Later, one of the man's answers no longer fits the account of his trip to Konoha that he gave Mirai earlier. The contradiction is evidence, not confirmation."
    }[ctx.talk];
    return{text:text||"Later, Mirai notices that details no longer fit what the escort told her earlier. Suspicion begins from her own conversation history."};
  };

  for(const c of inconsistent.choices||[]){
    if(["test_question","pretend_not_notice","change_route"].includes(c.choiceId)){
      c.contextPatch={...(c.contextPatch||{}),miraiSuspicionResponse:c.choiceId};
    }
  }
  deeper.presentationResolver=()=>{
    const ctx=A.local();
    const text={
      test_question:"Mirai tests the inconsistency with another question without yet treating suspicion as proof. The answer gives her more to compare against what she already knows.",
      pretend_not_notice:"Mirai pretends not to notice. She keeps escort formation while watching for another contradiction.",
      change_route:"Mirai changes the route without warning him. His reaction becomes another piece of observable evidence, not an automatic identity reveal."
    }[ctx.miraiSuspicionResponse];
    return{text:text||"Suspicion deepens, but suspicion is not confirmation. Mirai still has to decide what evidence justifies next."};
  };
  evalBeat.presentationResolver=()=>{
    const ctx=A.local();
    return{text:ctx.talk
      ?"The exercise now evaluates two different things from Mirai's actual route: whether she protected the person travelling with her, and whether the conversation and later contradictions led her to verify that person's identity."
      :"The exercise separates physical protection from identity verification."};
  };
  return commitScene33500(def);
}

// Kurenai: restore the four materially different locked illusion outcome
// choreographies before the shared lesson. The consequence resolver stays the
// existing 32900 authority and commits only when kur_result is entered.
function patchKurenai33500(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editableScene33500(A.sceneByVariant.academy_kurenai);if(!def)return false;
  const routes=[
    ["kur_loss_attack","rush_bell","kur_complete_loss_1"],
    ["kur_partial_loss_3","take_bell_now","kur_partial_loss_result_1"],
    ["kur_partial_win_3","pretend_withdraw","kur_partial_win_result_1"],
    ["kur_complete_3","let_him_think_caught","kur_complete_win_result_1"]
  ];
  for(const [beatId,choiceId,next] of routes){const c=choice33500(def,beatId,choiceId);if(c)c.nextBeatId=next;}

  addBeat33500(def,{beatId:"kur_complete_loss_1",mode:"narration",text:"The instructor reads the false Kurenai immediately. The illusion never creates a meaningful reversal, and Kurenai does not obtain the bell.",nextBeatId:"kur_result"});

  addBeat33500(def,{beatId:"kur_partial_loss_result_1",mode:"narration",text:"The instructor appears to have beaten the attempt and begins to dismiss it as over.",nextBeatId:"kur_partial_loss_result_2"});
  addBeat33500(def,{beatId:"kur_partial_loss_result_2",mode:"narration",text:"The training ground distorts. Kurenai is behind him, close enough to jingle the bell beside his ear. She did deceive him — but the apparent victory is still inside a deeper layer he controls.",nextBeatId:"kur_result"});

  addBeat33500(def,{beatId:"kur_partial_win_result_1",mode:"narration",text:"The instructor starts to dismiss the head-on attempt, then stops. Something about the distance he trusted no longer fits.",nextBeatId:"kur_partial_win_result_2"});
  addBeat33500(def,{beatId:"kur_partial_win_result_2",mode:"narration",text:"Kurenai has broken through one of his assumptions. Before she can turn that opening into a complete victory, the instructor appears behind her and takes the bell back.",nextBeatId:"kur_partial_win_result_3"});
  addBeat33500(def,{beatId:"kur_partial_win_result_3",mode:"dialogue",speakerName:"INSTRUCTOR",text:"A strong attempt. I might give you that.",nextBeatId:"kur_result"});

  addBeat33500(def,{beatId:"kur_complete_win_result_1",mode:"narration",text:"The instructor believes he has caught Kurenai.",nextBeatId:"kur_complete_win_result_2"});
  addBeat33500(def,{beatId:"kur_complete_win_result_2",mode:"narration",text:"The scene distorts. Kurenai is standing behind him with the bell.",nextBeatId:"kur_complete_win_result_3"});
  addBeat33500(def,{beatId:"kur_complete_win_result_3",mode:"dialogue",speakerName:"KURENAI",text:"Have you?",nextBeatId:"kur_complete_win_result_4"});
  addBeat33500(def,{beatId:"kur_complete_win_result_4",mode:"narration",text:"The scene distorts again. The instructor is behind Kurenai, the bell visibly back in his hand.",nextBeatId:"kur_complete_win_result_5"});
  addBeat33500(def,{beatId:"kur_complete_win_result_5",mode:"dialogue",speakerName:"INSTRUCTOR",text:"Yes.",nextBeatId:"kur_complete_win_result_6"});
  addBeat33500(def,{beatId:"kur_complete_win_result_6",mode:"narration",text:"The scene distorts one final time. Both of them are standing exactly where the Bell Test began. Only one fact has changed: Kurenai is genuinely holding the bell.",nextBeatId:"kur_result"});

  const result=beat33500(def,"kur_result");
  if(result)result.presentationResolver=()=>{
    const outcome=A.local().kurenaiOutcome||"complete_loss";
    return{text:{
      complete_loss:"The bell stays with the instructor. Kurenai's first deception was read before it could create a reversal.",
      partial_loss:"Kurenai successfully deceived the instructor, but she did not control the deepest layer of the exchange.",
      partial_win:"Kurenai broke one of the instructor's assumptions before he recovered control and took the bell back.",
      complete_win:"The last distortion settles. The complete-win history is real: Kurenai is holding the bell."
    }[outcome]};
  };
  return commitScene33500(def);
}

// Iwabee: make the selected terrain solution and the selected secondary-response
// visible in the same evaluation that consumes them.
function patchIwabee33500(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editableScene33500(A.sceneByVariant.academy_iwabee);if(!def)return false;
  const expose=beat33500(def,"iwa_expose"),evalBeat=beat33500(def,"iwa_eval");
  if(!expose||!evalBeat)return false;
  expose.presentationResolver=()=>{
    const ctx=A.local();
    const change={
      raise_collapsed:"Iwabee raises the collapsed section until the damaged training ground is usable again.",
      flatten_ground:"Iwabee flattens the damaged ground into a usable training surface.",
      build_path:"Iwabee builds a stable path through the damaged section.",
      reinforce_weakest:"Iwabee reinforces the weakest section instead of reshaping the entire area."
    }[ctx.iwabeeTerrainChoice]||"Iwabee's Earth-Release choice materially changes the damaged training ground.";
    return{text:`${change} That physical change exposes a Rogue Genin who had been using the damaged area as concealment. The Rogue was not part of the Academy exercise.`};
  };
  evalBeat.presentationResolver=()=>{
    const ctx=A.local();
    const response=ctx.iwabeeRogueResponse==="call_instructor"
      ?"called the instructor and preserved the practical task instead of treating escalation as cowardice"
      :ctx.iwabeeRogueResponse==="ignore_finish"
        ?"finished the formal practical objective while leaving the secondary Rogue occurrence unresolved by Iwabee"
        :"responded to the unexpected Rogue occurrence";
    return{text:`The instructor evaluates both things that actually happened: Iwabee repaired the ground through ${label(ctx.iwabeeTerrainChoice,{raise_collapsed:"raising the collapsed section",flatten_ground:"flattening the damaged ground",build_path:"building a stable path",reinforce_weakest:"reinforcing the weakest section"})}, and then ${response}.`};
  };
  return commitScene33500(def);
}

// Metal: existing facts are already separate; remove guardrail-style narration
// from the player-facing close and visibly state the selected protective action.
function patchMetal33500(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editableScene33500(A.sceneByVariant.academy_metal_lee);if(!def)return false;
  const end=beat33500(def,"met_end"),backout=beat33500(def,"met_backout");
  if(!end||!backout)return false;
  backout.text="Metal backs out of the public challenge. The private training he already completed still happened; choosing not to perform for the audience does not erase it.";
  end.presentationResolver=()=>{
    const ctx=A.local();
    if(ctx.metalBranch==="back_out")return{text:"Metal leaves with the private work intact and the public challenge declined. That is the history that actually happened."};
    const action={redirect_dummy:"redirected the dummy away from the other student",take_impact:"put himself in the dummy's path and took the impact",destroy_dummy:"destroyed the dummy before it could hit the other student"}[ctx.metalProtectiveResponse];
    return{text:action?`The pressured demonstration became a real hazard, and Metal ${action}. His earlier private capability, the rougher public performance and the protective response remain three different facts.`:"The private training and the later public performance remain separate parts of Metal's actual Origin history."};
  };
  return commitScene33500(def);
}

installStoryStackingFix33500();
const originPatches={
  hinata:patchHinata33500(),
  izuno:patchIzuno33500(),
  mirai:patchMirai33500(),
  kurenai:patchKurenai33500(),
  iwabee:patchIwabee33500(),
  metal:patchMetal33500()
};

function runAlphaOriginBrowserRealisation33500Diagnostics(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;
  const kur=A&&storyDefinition33500(A.sceneByVariant.academy_kurenai);
  const hin=A&&storyDefinition33500(A.sceneByVariant.academy_hinata);
  const checks={
    patchId:PATCH_ID==="alpha_origin_browser_realisation_33500_2026_09_13",
    styleFixInstalled:typeof document==="undefined"?true:!!document.getElementById(STYLE_ID),
    allTargetPatchesApplied:Object.values(originPatches).every(Boolean),
    hinataDecisionAwareEvaluation:!!(hin&&hin.beatMap&&(
      (hin.beatMap.has("hin_ex3_changed_choice")&&["hin_eval_wait_1","hin_eval_press_1","hin_eval_reset_1","hin_eval_changed_1"].every(id=>hin.beatMap.has(id)))||
      (hin.beatMap.get("hin_eval")&&typeof hin.beatMap.get("hin_eval").presentationResolver==="function")
    )),
    hinataYoungChoiceGetsVisibleResult:!!(hin&&hin.beatMap&&(
      ["hin_young_show_1","hin_young_tell_1","hin_young_leave_1","hin_young_watch_1"].every(id=>hin.beatMap.has(id))||
      hin.beatMap.has("hin_young_result")
    )),
    hinataGoldenNativeShimRetired:!!(hin&&hin.beatMap&&hin.beatMap.has("hin_ex1_choice"))?originPatches.hinata===true&&!patchedScenes.includes(A.sceneByVariant.academy_hinata):true,
    kurenaiFourOutcomeChoreographies:!!(kur&&kur.beatMap&&["kur_complete_loss_1","kur_partial_loss_result_2","kur_partial_win_result_3","kur_complete_win_result_6"].every(id=>kur.beatMap.has(id))),
    kurenaiResultIsDecisionAware:!!(kur&&kur.beatMap&&kur.beatMap.get("kur_result")&&typeof kur.beatMap.get("kur_result").presentationResolver==="function"),
    noMissionSemanticReuse:typeof globalThis.SC_ALPHA_MISSION_CHOICE_121==="undefined"||!patchedScenes.some(id=>String(id).startsWith("arc1_")),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,patchedScenes:[...patchedScenes],browserGoldenClaimed:false};
}

globalThis.SC_ALPHA_ORIGIN_BROWSER_REALISATION_33500=Object.freeze({patchId:PATCH_ID,patchedScenes:[...patchedScenes],originPatches:{...originPatches},browserGoldenClaimed:false});
globalThis.runAlphaOriginBrowserRealisation33500Diagnostics=runAlphaOriginBrowserRealisation33500Diagnostics;
})();
