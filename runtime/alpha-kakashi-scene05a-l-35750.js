// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI SCENE 05A-L: KAKASHI LOSES — 35750
//
// Verbatim Writing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_05A_L_Kakashi_Loses_Verbatim_Lock_2026-09-18.md
// commit aa88db471b71a305ec34e01ff0e094ac26f1638f
//
// Entry is ONLY the Scene 04A Kakashi-vs-Masked-Interceptor 1-v-1 defeat.
// This module consumes the committed Battle result, commits the exact factual
// loss closure and package-holder state, presents the locked narration, then
// switches the Objective to Return to ANBU. It never skips the player-facing
// board, invents pursuit, Pakkun, custody/death, or unknown downstream outcome.
// ============================================================================
(function installAcademyKakashiScene05AL35750(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SCENE05AL_35750)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const SCENE04A=globalThis.SC_ALPHA_KAKASHI_SCENE04A_35710;
if(!A||typeof A.findOccurrence!=="function"||typeof A.commitOccurrence!=="function"||!CORE||!SCENE04A)throw new Error("kakashi_scene05al_runtime_dependencies_missing");

const PATCH_ID="alpha_kakashi_scene05al_35750_v1_2026_09_18";
const AUTHORITY="aa88db471b71a305ec34e01ff0e094ac26f1638f";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const RETURN_BEAT="kak_scene04a_stop_assassin_return";
const LOSS_BEAT="kak_scene05a_l_defeat";
const CHOICE_BEAT="kak_scene05a_l_choice";
const PENDING_BEAT="kak_seq_debrief_pending";
const BATTLE_CONFIG="academy_kakashi_origin_battle_mi_1v1";
const BINDING="academy_kakashi.battle.stop_assassin";
const SOURCE_ANCHOR="AK_SA_019";
const MI_REF="academy_kakashi_origin_masked_interceptor";
const PS_REF="academy_kakashi_origin_package_smuggler";
const AMT_REF="academy_kakashi_origin_amt";
const PACKAGE_REF="kakashi_origin_outer_route_packet";
const FIGHT_BACKDROP_ID="kakashi_origin_fight_at_sakura_tree";
const FIGHT_BACKDROP=Object.freeze({assetId:FIGHT_BACKDROP_ID});
const OBJECTIVE_INITIAL="Retrieve the package.";
const OBJECTIVE_AFTER="Return to ANBU.";
const CURSOR_KEY="__kakashiScene05AL35750Cursor";
const ENTRY_REQUEST="kakashi_scene05al_defeat_entry_35750";
const RETURN_REQUEST="kakashi_scene05al_return_to_anbu_35750";
const STYLE_ID="sc-kakashi-scene05al-35750-style";
const BOARD_CLASS="sc-kakashi-scene05al-board-35750";
const FACT_CLASS="academy_kakashi_stop_assassin_defeat_closure";

const CUES=Object.freeze([
  Object.freeze({cueId:"scene05al_01",kind:"narration",text:"The opening is small.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_02",kind:"narration",text:"Masked Interceptor takes it.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_03",kind:"narration",text:"Kakashi hits the stone beneath the Sakura tree.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_04",kind:"narration",text:"Before he can recover, she is on him.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_05",kind:"narration",text:"His arm is forced behind his back.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_06",kind:"narration",text:"His shoulder pinned.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_07",kind:"narration",text:"Kakashi twists once.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_08",kind:"narration",text:"She tightens the hold.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_09",kind:"narration",text:"Enough to stop him.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_10",kind:"narration",text:"Then her attention shifts.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_11",kind:"narration",text:"Not to Kakashi.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_12",kind:"narration",text:"Down the street.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_13",kind:"narration",text:"Toward the route Package Smuggler took.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_14",kind:"narration",text:"The pressure disappears.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_15",kind:"narration",text:"Kakashi turns his head just in time to see Masked Interceptor break away.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_16",kind:"narration",text:"She runs.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_17",kind:"narration",text:"Fast.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_18",kind:"narration",text:"After Package Smuggler.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05al_19",kind:"narration",text:"Kakashi forces himself back to his feet.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_20",kind:"narration",text:"By then she is gone.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_21",kind:"narration",text:"So is Package Smuggler.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_22",kind:"narration",text:"The package went with him.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_23",kind:"narration",text:"ANBU Marked Target disappeared even earlier.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_24",kind:"narration",text:"Kakashi looks down the empty street.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_25",kind:"narration",text:"No trail.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_26",kind:"narration",text:"No one left to follow.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05al_27",kind:"narration",text:"The package is beyond his reach now.",focusActorRef:"academy_kakashi"})
]);

function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function result(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function validDefeat(row=result()){
  return !!row&&String(row.resultState||"")==="opposition_side_victory"&&String(row.battleConfigId||"")===BATTLE_CONFIG&&String(row.bindingRef||"")===BINDING&&String(row.sourceAnchorRef||"")===SOURCE_ANCHOR;
}
function occurrenceId(row=result()){
  const rt=active(),instance=rt&&rt.sceneId===SCENE_ID?String(rt.instanceId||""):"",battle=String(row&&row.battleOccurrenceId||"");
  return instance&&battle?`occ_origin_kakashi_scene05al_loss_35750::${instance}::${battle}`:"";
}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function cssUrlValue(value){return `url("${String(value||"").replace(/\\/g,"\\\\").replace(/"/g,'\\"')}")`; }

function commitLossClosure35750(row=result()){
  if(!validDefeat(row))return{success:false,reason:"kakashi_scene05al_exact_defeat_required"};
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_scene05al_story_instance_missing"};
  const id=occurrenceId(row);if(!id)return{success:false,reason:"kakashi_scene05al_occurrence_identity_missing"};
  let record=A.findOccurrence(id);
  const existed=!!record;
  if(!record){
    const fact={
      factClass:FACT_CLASS,
      storySceneInstanceId:String(rt.instanceId||""),
      battleOccurrenceId:String(row.battleOccurrenceId||""),
      battleConfigId:BATTLE_CONFIG,
      battleResultState:"opposition_side_victory",
      sourceAnchorRef:SOURCE_ANCHOR,
      kakashiDefeated:true,
      kakashiRestrainedByMaskedInterceptor:true,
      packageSmugglerEscapedWithPackage:true,
      anbuMarkedTargetEscaped:true,
      maskedInterceptorLeftKakashiSight:true,
      maskedInterceptorPursuingPackageSmuggler:true,
      maskedInterceptorPackageSmugglerOutcomeKnownToKakashi:false,
      packageRecoveryAvailable:false,
      pursuitAvailable:false,
      pakkunInvolved:false,
      packageState:{objectRef:PACKAGE_REF,currentHolderClass:"PACKAGE_SMUGGLER",recovered:false},
      authority:AUTHORITY
    };
    const committed=A.commitOccurrence(ORIGIN_ID,id,fact,[],{
      type:"origin_story_factual_occurrence",
      outcome:"STOP_ASSASSIN_MI_VICTORY_PACKAGE_LOST_RETURN_TO_ANBU",
      participantRefs:[ORIGIN_ID,MI_REF,PS_REF,AMT_REF],
      sourceRefs:[
        {type:"battle_occurrence",id:String(row.battleOccurrenceId||"")},
        {type:"story_autonomy_anchor",id:SOURCE_ANCHOR},
        {type:"story_authority",id:AUTHORITY},
        {type:"world_object",id:PACKAGE_REF}
      ]
    });
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_scene05al_occurrence_commit_failed"};
    record=committed.record;
  }
  const material=CORE.recordMaterialState({
    storyUnitRef:ORIGIN_ID,materialRef:PACKAGE_REF,resolved:true,stateRef:id,
    value:{holderClass:"PACKAGE_SMUGGLER",recovered:false,factClass:FACT_CLASS,sourceAnchorRef:SOURCE_ANCHOR}
  });
  if(!material||material.success!==true)return material||{success:false,reason:"kakashi_scene05al_package_material_commit_failed"};
  rt.localContext={...(rt.localContext||{}),
    kakashiScene05ALPackageOccurrenceId:id,
    kakashiScene05ALBattleOccurrenceId:String(row.battleOccurrenceId||""),
    kakashiScene05ALPackageHolderClass:"PACKAGE_SMUGGLER",
    kakashiScene05ALPursuitAvailable:false,
    kakashiScene05ALPakkunInvolved:false
  };
  save();
  return{success:true,idempotent:existed,occurrenceId:id,record,materialState:material.state};
}

function routeDefeatReturn35750(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==RETURN_BEAT)return{success:true,routed:false};
  const row=result();if(!validDefeat(row))return{success:true,routed:false,resultState:String(row&&row.resultState||"unresolved")};
  if(!(rt.localContext&&rt.localContext.kakashiScene04ABattleIntentResolved===true))return{success:true,routed:false,reason:"scene04a_battle_semantic_return_not_yet_committed"};
  const committed=commitLossClosure35750(row);if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_scene05al_loss_closure_missing"};
  rt.localContext={...(rt.localContext||{}),kakashiScene05ALEntered:true,kakashiScene05ALObjective:OBJECTIVE_INITIAL,[CURSOR_KEY]:0};
  rt.beatId=LOSS_BEAT;save();
  return{success:true,routed:true,beatId:LOSS_BEAT,occurrenceId:committed.occurrenceId,objective:OBJECTIVE_INITIAL};
}
function performance(rt=active()){
  const raw=rt&&rt.localContext?Number(rt.localContext[CURSOR_KEY]):0;
  const index=Number.isInteger(raw)?Math.max(0,Math.min(CUES.length-1,raw)):0;
  return{sequence:CUES,index,cue:CUES[index],atEnd:index>=CUES.length-1};
}
function isLossNarration(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&rt.beatId===LOSS_BEAT;}
function isLossFamily(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&(rt.beatId===LOSS_BEAT||rt.beatId===CHOICE_BEAT);}
function objectiveFor(rt=active()){return rt&&rt.beatId===CHOICE_BEAT?OBJECTIVE_AFTER:OBJECTIVE_INITIAL;}

function returnToAnbu35750(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==CHOICE_BEAT)return{success:false,reason:"kakashi_scene05al_return_choice_context_missing"};
  const committed=commitLossClosure35750();if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_scene05al_return_choice_fact_missing"};
  rt.localContext={...(rt.localContext||{}),kakashiScene05ALReturnToAnbuChosen:true,kakashiScene05ALObjective:OBJECTIVE_AFTER};
  save();return{success:true,occurrenceId:committed.occurrenceId,nextBeatId:PENDING_BEAT};
}
function materializeChoice35750(){
  const def=scene(),beat=def&&def.beatMap instanceof Map?def.beatMap.get(CHOICE_BEAT):null;if(!beat)return false;
  beat.choices=[{choiceId:"scene05al_return_to_anbu",label:"RETURN TO ANBU",nextBeatId:PENDING_BEAT,availability:()=>({available:true,knownBlocker:null}),knownBlocker:null,consequenceRequests:[{requestId:RETURN_REQUEST,kind:"domain",resolve:returnToAnbu35750}]}];
  return true;
}
function installSurface35750(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_scene05al_story_definition_missing"};
  const ret=def.beatMap.get(RETURN_BEAT);if(!ret)return{success:false,reason:"kakashi_scene05al_return_beat_missing"};
  ret.onEnterConsequences=Array.isArray(ret.onEnterConsequences)?ret.onEnterConsequences.filter(row=>row&&row.requestId!==ENTRY_REQUEST):[];
  ret.onEnterConsequences.push({requestId:ENTRY_REQUEST,kind:"domain",resolve:()=>routeDefeatReturn35750()});
  def.beatMap.set(LOSS_BEAT,{beatId:LOSS_BEAT,mode:"narration",environmentRef:FIGHT_BACKDROP,text:"",nextBeatId:CHOICE_BEAT,exitScene:false,allowPresentationClose:false,onEnterConsequences:[],onAdvanceConsequences:[],choices:[]});
  def.beatMap.set(CHOICE_BEAT,{beatId:CHOICE_BEAT,mode:"choice",environmentRef:FIGHT_BACKDROP,text:"",objectiveText:OBJECTIVE_AFTER,nextBeatId:null,exitScene:false,allowPresentationClose:false,onEnterConsequences:[],onAdvanceConsequences:[],choices:[]});
  materializeChoice35750();
  return{success:true,returnBeatId:RETURN_BEAT,lossBeatId:LOSS_BEAT,choiceBeatId:CHOICE_BEAT};
}

function installStyle35750(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
.${BOARD_CLASS}{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}
#story-scene-presentation-layer .sc-chronicle-stage[data-sc-kakashi-scene05al="true"]{
  background-image:linear-gradient(180deg,rgba(2,5,8,.02),rgba(2,5,8,.05) 50%,rgba(2,5,8,.40) 82%,rgba(2,5,8,.68)),var(--sc-kakashi-scene05al-backdrop)!important;
  background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important
}
`;document.head.appendChild(style);return true;
}
function fightPath(){
  try{if(typeof getSceneBackdropAssetPath==="function")return getSceneBackdropAssetPath(FIGHT_BACKDROP_ID)||"Kakashi Origin Backdrop/fight_at_sakura_tree.png";}catch(_error){}
  return"Kakashi Origin Backdrop/fight_at_sakura_tree.png";
}
function actorMarkup(id,label,image,state,focus=false){
  return `<figure class="sc-scene-board-33900__actor ${focus?"is-focus":""}" data-actor-id="${escapeHTML(id)}"><div class="sc-scene-board-33900__actor-frame"></div><img src="${escapeHTML(image)}" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>${escapeHTML(label)}</strong><small>${escapeHTML(state)}</small></figcaption></figure>`;
}
function boardMarkup(rt){
  const p=isLossNarration(rt)?performance(rt):null,focus=p&&p.cue&&p.cue.focusActorRef||"academy_kakashi";
  const miVisible=isLossNarration(rt)&&p.index<19;
  const actors=[actorMarkup("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png",rt.beatId===CHOICE_BEAT?"RETURN REQUIRED":focus==="academy_kakashi"?"FOCUSED":"PRESENT",focus==="academy_kakashi")];
  if(miVisible)actors.push(actorMarkup("masked_interceptor","MASKED INTERCEPTOR","NPC/masked_interceptor.png","PRESENT",focus==="masked_interceptor"));
  return `<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(objectiveFor(rt))}</div></div><div class="sc-scene-board-33900__actors" data-count="${actors.length}">${actors.join("")}</div>`;
}
function renderScene05AL35750(){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  const rt=active();
  for(const old of stage.querySelectorAll?stage.querySelectorAll(`.${BOARD_CLASS}`):[])if(!isLossFamily(rt))old.remove();
  if(!isLossFamily(rt)){if(stage.style){try{delete stage.dataset.scKakashiScene05al;}catch(_error){}stage.style.removeProperty("--sc-kakashi-scene05al-backdrop");}return false;}
  installStyle35750();materializeChoice35750();
  stage.dataset.scKakashiScene05al="true";stage.style.setProperty("--sc-kakashi-scene05al-backdrop",cssUrlValue(fightPath()));
  layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode="encounter";
  let board=stage.querySelector&&stage.querySelector(`.${BOARD_CLASS}`);if(!board){board=document.createElement("section");board.className=BOARD_CLASS;board.setAttribute("aria-hidden","true");stage.appendChild(board);}
  const markup=boardMarkup(rt);if(board.innerHTML!==markup)board.innerHTML=markup;
  if(isLossNarration(rt)){
    const p=performance(rt),cue=p.cue||{};layer.dataset.scPerformance="true";
    const text=layer.querySelector&&layer.querySelector(".sc-story-text");if(text&&text.textContent!==cue.text)text.textContent=cue.text;
    const name=layer.querySelector&&layer.querySelector(".sc-story-name");if(name){name.textContent="";name.style.display="none";}
    const kicker=layer.querySelector&&layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent="NARRATION · ACADEMY KAKASHI";
    const primary=layer.querySelector&&layer.querySelector(".sc-chronicle-primary");if(primary){primary.textContent="›";primary.setAttribute("aria-label","Advance scene");primary.title="Advance scene";}
  }else{try{delete layer.dataset.scPerformance;}catch(_error){}}
  return true;
}

let hooksInstalled=false,attempts=0;
function installHooks35750(){
  if(hooksInstalled)return true;
  if(typeof globalThis.getStoryScenePerformance33900!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
  const PRE_GET=globalThis.getStoryScenePerformance33900;
  const PRE_ADVANCE=globalThis.advanceStoryScene;
  const PRE_RENDER=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  globalThis.getStoryScenePerformance33900=function getStoryScenePerformance35750(){const rt=active();return isLossNarration(rt)?performance(rt):PRE_GET.apply(this,arguments);};
  globalThis.advanceStoryScene=function advanceStoryScene35750(choiceId=null){
    const rt=active();
    if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===RETURN_BEAT&&validDefeat()){
      const routed=routeDefeatReturn35750();if(routed&&routed.success===true&&routed.routed===true){try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}return routed;}
    }
    if(!isLossNarration(rt)||choiceId!==null&&choiceId!==undefined)return PRE_ADVANCE.apply(this,arguments);
    const p=performance(rt);
    if(!p.atEnd){
      const next=p.index+1;rt.localContext={...(rt.localContext||{}),[CURSOR_KEY]:next,kakashiScene05ALObjective:OBJECTIVE_INITIAL};save();
      try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}
      return{success:true,type:"kakashi_scene05al_performance_cue_advanced",beatId:LOSS_BEAT,cueIndex:next,semanticBeatUnchanged:true};
    }
    if(rt.localContext){delete rt.localContext[CURSOR_KEY];rt.localContext.kakashiScene05ALObjective=OBJECTIVE_AFTER;}save();
    const transition=PRE_ADVANCE.apply(this,arguments);materializeChoice35750();return transition;
  };
  try{getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  if(PRE_RENDER){
    globalThis.renderStoryScenePresentationLayer=function renderStoryScenePresentationLayer35750(){
      const rt=active();
      if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===RETURN_BEAT&&validDefeat()&&rt.localContext&&rt.localContext.kakashiScene04ABattleIntentResolved===true)routeDefeatReturn35750();
      const out=PRE_RENDER.apply(this,arguments);
      if(typeof queueMicrotask==="function")queueMicrotask(renderScene05AL35750);else if(typeof setTimeout==="function")setTimeout(renderScene05AL35750,0);
      return out;
    };
    try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}
  }
  hooksInstalled=true;installStyle35750();renderScene05AL35750();return true;
}
function ensureHooks35750(){if(installHooks35750())return;if(typeof setTimeout==="function"&&attempts++<120)setTimeout(ensureHooks35750,25);}

function diagnostics(){
  const def=scene(),ret=def&&def.beatMap instanceof Map?def.beatMap.get(RETURN_BEAT):null,loss=def&&def.beatMap instanceof Map?def.beatMap.get(LOSS_BEAT):null,choice=def&&def.beatMap instanceof Map?def.beatMap.get(CHOICE_BEAT):null;
  const exact=[
    "The opening is small.","Masked Interceptor takes it.","Kakashi hits the stone beneath the Sakura tree.","Before he can recover, she is on him.","His arm is forced behind his back.","His shoulder pinned.","Kakashi twists once.","She tightens the hold.","Enough to stop him.","Then her attention shifts.","Not to Kakashi.","Down the street.","Toward the route Package Smuggler took.","The pressure disappears.","Kakashi turns his head just in time to see Masked Interceptor break away.","She runs.","Fast.","After Package Smuggler.","Kakashi forces himself back to his feet.","By then she is gone.","So is Package Smuggler.","The package went with him.","ANBU Marked Target disappeared even earlier.","Kakashi looks down the empty street.","No trail.","No one left to follow.","The package is beyond his reach now."
  ];
  const choiceLabels=choice&&Array.isArray(choice.choices)?choice.choices.map(row=>row.label):[];
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_scene05al_35750_v1_2026_09_18",
    authorityPinned:AUTHORITY==="aa88db471b71a305ec34e01ff0e094ac26f1638f",
    exactNarration:CUES.length===27&&JSON.stringify(CUES.map(x=>x.text))===JSON.stringify(exact)&&CUES.every(x=>x.kind==="narration"&&!x.speakerName),
    exactDefeatEntry:validDefeat.toString().includes('opposition_side_victory')&&routeDefeatReturn35750.toString().includes("kakashiScene04ABattleIntentResolved"),
    exactBackdrop:loss&&loss.environmentRef&&loss.environmentRef.assetId===FIGHT_BACKDROP_ID&&choice&&choice.environmentRef&&choice.environmentRef.assetId===FIGHT_BACKDROP_ID,
    objectiveSwitch:OBJECTIVE_INITIAL==="Retrieve the package."&&OBJECTIVE_AFTER==="Return to ANBU."&&choice&&choice.objectiveText===OBJECTIVE_AFTER,
    singleReturnChoice:choiceLabels.length===1&&choiceLabels[0]==="RETURN TO ANBU"&&choice.choices[0].nextBeatId===PENDING_BEAT,
    factualLossCommit:commitLossClosure35750.toString().includes("kakashiRestrainedByMaskedInterceptor")&&commitLossClosure35750.toString().includes("packageSmugglerEscapedWithPackage")&&commitLossClosure35750.toString().includes("anbuMarkedTargetEscaped")&&commitLossClosure35750.toString().includes("maskedInterceptorPackageSmugglerOutcomeKnownToKakashi:false"),
    noPakkun:commitLossClosure35750.toString().includes("pakkunInvolved:false"),
    packageFactCommitted:commitLossClosure35750.toString().includes('currentHolderClass:"PACKAGE_SMUGGLER"')&&commitLossClosure35750.toString().includes("CORE.recordMaterialState"),
    returnHookInstalled:!!ret&&Array.isArray(ret.onEnterConsequences)&&ret.onEnterConsequences.some(x=>x&&x.requestId===ENTRY_REQUEST),
    notAutoDebrief:loss&&loss.nextBeatId===CHOICE_BEAT&&choice&&choice.nextBeatId===null,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,authority:AUTHORITY,lossBeatId:LOSS_BEAT,choiceBeatId:CHOICE_BEAT,browserGoldenClaimed:false};
}

const installed=installSurface35750();if(!installed||installed.success!==true)throw new Error(`kakashi_scene05al_surface_install_failed:${installed&&installed.reason||"unknown"}`);
ensureHooks35750();
globalThis.runAcademyKakashiScene05AL35750Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SCENE05AL_35750=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,installed,cueCount:CUES.length,objectiveInitial:OBJECTIVE_INITIAL,objectiveAfter:OBJECTIVE_AFTER,battleConfigId:BATTLE_CONFIG,bindingRef:BINDING,sourceAnchorRef:SOURCE_ANCHOR,lossBeatId:LOSS_BEAT,choiceBeatId:CHOICE_BEAT,browserGoldenClaimed:false});
})();