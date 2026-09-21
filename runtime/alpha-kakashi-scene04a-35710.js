// ============================================================================
// ISSUE #188 / #201 — ACADEMY KAKASHI SCENE 04A: STOP THE ASSASSIN — 35710
//
// Binding Writing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_04A_Stop_The_Assassin_Verbatim_Lock_2026-09-18.md
// commit 64966fb33590d09e7ae16a33d51d0e7262b5891d
//
// Battle authority:
// - AK_SA_019 Observe -> Stop Assassin
// - binding academy_kakashi.battle.stop_assassin
// - direct/non-sequential config academy_kakashi_origin_battle_mi_1v1
// - Kakashi Hatake vs Masked Interceptor, 1-v-1
//
// Scope:
// - wire only the already-authored STOP THE ASSASSIN Scene 03A choice;
// - play exact Scene 04A narration with no invented dialogue or choices;
// - commit protagonist intent before Battle;
// - launch the exact 1-v-1 PL Battle through the canonical 34300 deployment;
// - return to the same Scene 04A branch and consume the factual Battle result;
// - do not infer death, custody, package recovery, reward or later Story prose.
// ============================================================================
(function installAcademyKakashiScene04A35710(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SCENE04A_35710)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const SCENE03A=globalThis.SC_ALPHA_KAKASHI_SCENE03A_35700;
if(!A||!CORE||!KAK||!SCENE03A)throw new Error("kakashi_scene04a_runtime_dependencies_missing");

const PATCH_ID="alpha_kakashi_scene04a_35710_v10_2026_09_22";
const AUTHORITY="64966fb33590d09e7ae16a33d51d0e7262b5891d";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const MAJOR_BEAT="kak_original_major_choice";
const SCENE04A_BEAT="kak_scene04a_stop_assassin";
const BATTLE_BEAT="kak_scene04a_stop_assassin_battle";
const RETURN_BEAT="kak_scene04a_stop_assassin_return";
const CHOICE_ID="stop_assassin";
const BINDING="academy_kakashi.battle.stop_assassin";
const SOURCE_ANCHOR="AK_SA_019";
const BATTLE_CONFIG="academy_kakashi_origin_battle_mi_1v1";
const INTENT_REQUEST="kakashi_scene04a_stop_assassin_intent_35710";
const RETURN_REQUEST="kakashi_scene04a_stop_assassin_return_35710";
const CURSOR_KEY="__kakashiScene04A35710Cursor";
const OBJECTIVE="Retrieve the package.";
const FIGHT_BACKDROP_ID="kakashi_origin_fight_at_sakura_tree";
const FIGHT_BACKDROP_PATH="Kakashi Origin Backdrop/fight_at_sakura_tree.png";
const FIGHT_BACKDROP=Object.freeze({assetId:FIGHT_BACKDROP_ID});
const STYLE_ID="sc-kakashi-scene04a-35710-style";
const BOARD_CLASS="sc-kakashi-scene04a-board-35710";

try{
  const register=typeof registerSceneBackdropAssetPath==="function"?registerSceneBackdropAssetPath:globalThis.registerSceneBackdropAssetPath;
  if(typeof register==="function")register(FIGHT_BACKDROP_ID,FIGHT_BACKDROP_PATH);
}catch(_error){}

const CUES=Object.freeze([
  Object.freeze({cueId:"scene04a_01",kind:"narration",text:"Kakashi moves.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene04a_02",kind:"narration",text:"Not toward ANBU Marked Target.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene04a_03",kind:"narration",text:"Not toward the package.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene04a_04",kind:"narration",text:"Toward Masked Interceptor.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene04a_05",kind:"narration",text:"She is already closing on Package Smuggler when Kakashi drops between them.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene04a_06",kind:"narration",text:"Package Smuggler sees the opening immediately.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene04a_07",kind:"narration",text:"He turns and runs.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene04a_08",kind:"narration",text:"The package goes with him.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene04a_09",kind:"narration",text:"Kakashi does not follow.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene04a_10",kind:"narration",text:"Masked Interceptor changes direction without hesitation.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene04a_11",kind:"narration",text:"Her attention settles on Kakashi.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene04a_12",kind:"narration",text:"He has made himself the obstacle now.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene04a_13",kind:"narration",text:"She comes straight through him.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene04a_14",kind:"narration",text:"Kakashi meets her head-on.",focusActorRef:"academy_kakashi"})
]);

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function isScene04A(rt=active()){return!!rt&&rt.sceneId===SCENE_ID&&rt.beatId===SCENE04A_BEAT;}
function isScene04AFamily(rt=active()){return!!rt&&rt.sceneId===SCENE_ID&&[SCENE04A_BEAT,BATTLE_BEAT,RETURN_BEAT].includes(rt.beatId);}
function cursor(rt=active()){const raw=rt&&rt.localContext?Number(rt.localContext[CURSOR_KEY]):0;return Number.isInteger(raw)?Math.max(0,Math.min(CUES.length-1,raw)):0;}
function performance(rt=active()){const index=cursor(rt);return{sequence:CUES,index,cue:CUES[index],atEnd:index>=CUES.length-1};}
function escapeHTML(value){return String(value??"").replace(/[&<>\"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;","'":"&#39;"}[ch]));}
function cssUrlValue(value){return `url("${String(value||"").replace(/\\/g,"\\\\").replace(/\"/g,'\\\"')}")`;}

function ensurePresentationStyle35710(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
.${BOARD_CLASS}{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden;}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__objective{box-shadow:0 11px 28px rgba(0,0,0,.36)!important;}
/* Generic actor geometry is owned by canonical 33910. Scene 04A keeps only its authored three-person blocking choreography below. */
/* Scene 04A begins from the final WATCH THE EXCHANGE state: AMT has already broken away and MI is already on-stage. */
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actor:not(.sc-kakashi-state-exit-right-35710):not(.sc-kakashi-state-offstage-right-35710){
  opacity:1!important;filter:none!important;
}

#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-count="3"]{
  display:block!important;padding:0!important;
}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-count="3"] .sc-scene-board-33900__actor{
  position:absolute!important;bottom:0!important;width:min(20vw,252px)!important;max-height:430px!important;
}
/* Kakashi moves out of the observer lane and physically inserts himself between MI and PS. */
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="kakashi-approach"] [data-actor-id="masked_interceptor"]{left:10%!important}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="kakashi-approach"] [data-actor-id="academy_kakashi"]{left:27%!important}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="kakashi-approach"] [data-actor-id="package_smuggler"]{right:6%!important}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="kakashi-blocks-line"] [data-actor-id="masked_interceptor"],
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="smuggler-departure"] [data-actor-id="masked_interceptor"]{left:10%!important}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="kakashi-blocks-line"] [data-actor-id="academy_kakashi"],
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="smuggler-departure"] [data-actor-id="academy_kakashi"]{left:40%!important}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="kakashi-blocks-line"] [data-actor-id="package_smuggler"],
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-stage="smuggler-departure"] [data-actor-id="package_smuggler"]{right:6%!important}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-kakashi-block-entry-35710{
  animation:kakashiBlockEntry35710 520ms cubic-bezier(.18,.76,.24,1) both!important;
}
@keyframes kakashiBlockEntry35710{0%{opacity:1;transform:translateX(-18vw) scale(.96);filter:none}100%{opacity:1;transform:translateX(0) scale(1);filter:none}}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-kakashi-state-exit-right-35710{
  animation:kakashiStateExitRight35710 560ms cubic-bezier(.36,.08,.76,.3) both!important;filter:none!important;
}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-kakashi-state-offstage-right-35710{
  opacity:0!important;transform:translateX(68vw) rotate(3deg) scale(.94)!important;filter:none!important;
}
@keyframes kakashiStateExitRight35710{0%{opacity:1;transform:translateX(0) scale(.95);filter:none}100%{opacity:0;transform:translateX(68vw) rotate(3deg) scale(.94);filter:none}}
@media(prefers-reduced-motion:reduce){
  #story-scene-presentation-layer .${BOARD_CLASS} .sc-kakashi-block-entry-35710{animation:none!important;transform:none!important}
  #story-scene-presentation-layer .${BOARD_CLASS} .sc-kakashi-state-exit-right-35710{animation:none!important;opacity:0!important;transform:translateX(68vw)!important}
}
`;
  document.head.appendChild(style);return true;
}
function fightBackdropPath35710(){
  try{if(typeof getSceneBackdropAssetPath==="function")return getSceneBackdropAssetPath(FIGHT_BACKDROP_ID)||FIGHT_BACKDROP_PATH;}catch(_error){}
  try{if(typeof globalThis.getSceneBackdropAssetPath==="function")return globalThis.getSceneBackdropAssetPath(FIGHT_BACKDROP_ID)||FIGHT_BACKDROP_PATH;}catch(_error){}
  return FIGHT_BACKDROP_PATH;
}
function applyFightBackdrop35710(stage){
  const rt=active();
  return !!(stage&&typeof globalThis.applyStorySceneBoardBackdrop33900==="function"&&globalThis.applyStorySceneBoardBackdrop33900(stage,rt));
}
function clearFightBackdrop35710(stage){
  if(!stage)return false;
  for(const board of stage.querySelectorAll?stage.querySelectorAll("." + BOARD_CLASS):[])board.remove();
  return true;
}

function ensureStopAssassinIntent35710(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==MAJOR_BEAT)return{success:false,reason:"kakashi_scene04a_choice_context_missing"};
  rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
  const existingId=String(rt.localContext.kakashiScene04AStoryDecisionReceiptId||"");
  if(existingId){
    const snapshot=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};
    const existing=snapshot.decisionReceipts&&snapshot.decisionReceipts[existingId]||null;
    if(existing&&existing.selectedChoiceId===CHOICE_ID&&existing.resolverBindingRef===BINDING)return{success:true,idempotent:true,receipt:existing};
  }
  const committedStateRef=String(rt.localContext.kakashiObserveScene03AOccurrenceId||"");
  if(!committedStateRef)return{success:false,reason:"kakashi_scene04a_scene03a_committed_state_missing"};
  let choiceSetId=String(rt.localContext.kakashiObserveEscalationChoiceSetId||"");
  if(!choiceSetId){
    const opened=KAK.openDecisionPoint("OBSERVE_ESCALATION",{committedStateRef,beatRef:MAJOR_BEAT,sourceOccurrenceRefs:[committedStateRef]});
    if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_scene04a_choice_set_open_failed"};
    choiceSetId=opened.choiceSet.choiceSetId;
  }
  const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId,choiceId:CHOICE_ID});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_scene04a_intent_commit_failed"};
  rt.localContext={...rt.localContext,kakashiObserveEscalationChoiceSetId:choiceSetId,kakashiScene04AStoryDecisionReceiptId:committed.receipt.storyDecisionReceiptId,kakashiScene04AIntentCommitRef:committed.receipt.intentCommitRef};
  save();return{success:true,receipt:committed.receipt,choiceSetId};
}

function launchScene04ABattle35710({active:rt,returnContext}={}){
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_scene04a_story_occurrence_missing"};
  if(typeof launchAcademyKakashiOriginPlBattle!=="function")return{success:false,reason:"kakashi_scene04a_battle_deployment_missing"};
  return launchAcademyKakashiOriginPlBattle({
    storyOccurrenceId:String(rt.instanceId||""),sourceAnchorRef:SOURCE_ANCHOR,bindingRef:BINDING,battleConfigId:BATTLE_CONFIG,
    returnToken:`${String(rt.instanceId||"")}:scene04a:stop_assassin`,returnContext,pakkunAuthorized:false
  });
}
function projectScene04ABattle35710(){return typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;}

function consumeScene04ABattleReturn35710(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==RETURN_BEAT)return{success:false,reason:"kakashi_scene04a_return_context_missing"};
  rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
  if(rt.localContext.kakashiScene04ABattleIntentResolved===true)return{success:true,idempotent:true,battleOccurrenceId:rt.localContext.kakashiScene04ABattleOccurrenceId||null};
  const receiptId=String(rt.localContext.kakashiScene04AStoryDecisionReceiptId||"");
  if(!receiptId)return{success:false,reason:"kakashi_scene04a_story_decision_receipt_missing"};
  const authored=rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;
  if(!authored||!authored.battleOccurrenceId)return{success:false,reason:"kakashi_scene04a_factual_battle_result_missing"};
  if(String(authored.bindingRef||"")!==BINDING||String(authored.battleConfigId||"")!==BATTLE_CONFIG||String(authored.sourceAnchorRef||"")!==SOURCE_ANCHOR)return{success:false,reason:"kakashi_scene04a_battle_result_mismatch"};
  const battleOccurrenceId=String(authored.battleOccurrenceId);
  const bridge={success:true,resolverResultRef:battleOccurrenceId,consequenceRefs:[battleOccurrenceId],stateDeltaRefs:[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef:"academy_kakashi.scene04a.stop_assassin_battle_return",result:authored};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId,state:{resolverResults:{[BINDING]:bridge}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId||""),selectedChoiceId:CHOICE_ID,battleOccurrenceId}});
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_scene04a_semantic_battle_dispatch_failed"};
  rt.localContext={...rt.localContext,kakashiScene04ABattleIntentResolved:true,kakashiScene04ABattleOccurrenceId:battleOccurrenceId,kakashiScene04ABattleResultState:String(authored.resultState||"unresolved")};
  save();return{success:true,battleOccurrenceId,resultState:String(authored.resultState||"unresolved"),storyDecisionReceiptId:receiptId};
}

function installSemanticSurface35710(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_scene04a_story_definition_missing"};
  const major=def.beatMap.get(MAJOR_BEAT);if(!major||!Array.isArray(major.choices))return{success:false,reason:"kakashi_scene04a_major_choice_missing"};
  const choice=major.choices.find(row=>row&&row.choiceId===CHOICE_ID);if(!choice)return{success:false,reason:"kakashi_scene04a_stop_assassin_choice_missing"};
  choice.label="STOP THE ASSASSIN";choice.nextBeatId=SCENE04A_BEAT;choice.availability=()=>({available:true,knownBlocker:null});choice.knownBlocker=null;
  choice.consequenceRequests=Array.isArray(choice.consequenceRequests)?choice.consequenceRequests.filter(row=>row&&row.requestId!==INTENT_REQUEST):[];
  choice.consequenceRequests.push({requestId:INTENT_REQUEST,kind:"domain",resolve:()=>ensureStopAssassinIntent35710()});
  def.beatMap.set(SCENE04A_BEAT,{
    beatId:SCENE04A_BEAT,mode:"narration",environmentRef:FIGHT_BACKDROP,text:"",nextBeatId:BATTLE_BEAT,exitScene:false,allowPresentationClose:false,
    onEnterConsequences:[],onAdvanceConsequences:[],choices:[]
  });
  def.beatMap.set(BATTLE_BEAT,{
    beatId:BATTLE_BEAT,mode:"battle_transition",environmentRef:FIGHT_BACKDROP,text:"PL BATTLE: Kakashi Hatake vs Masked Interceptor",nextBeatId:null,exitScene:false,allowPresentationClose:false,
    battle:{encounterId:BATTLE_CONFIG,launchResolver:launchScene04ABattle35710,postBattleBeatId:RETURN_BEAT,resultProjector:projectScene04ABattle35710,exposeFinisher:false,actionLabel:"BEGIN PL BATTLE"},choices:[]
  });
  def.beatMap.set(RETURN_BEAT,{
    beatId:RETURN_BEAT,mode:"post_battle",environmentRef:FIGHT_BACKDROP,text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,
    onEnterConsequences:[{requestId:RETURN_REQUEST,kind:"domain",resolve:()=>consumeScene04ABattleReturn35710()}],choices:[]
  });
  return{success:true,choiceId:CHOICE_ID,scene04ABeatId:SCENE04A_BEAT,battleBeatId:BATTLE_BEAT,returnBeatId:RETURN_BEAT,battleConfigId:BATTLE_CONFIG,fightBackdropId:FIGHT_BACKDROP_ID};
}

function actorMarkup35710(id,label,image,state,focus=false,extraClass=""){return `<figure class="sc-scene-board-33900__actor ${focus?"is-focus":""} ${extraClass}" data-actor-id="${escapeHTML(id)}"><div class="sc-scene-board-33900__actor-frame"></div><img src="${escapeHTML(image)}" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>${escapeHTML(label)}</strong><small>${escapeHTML(state)}</small></figcaption></figure>`;}
function boardMarkup35710(rt){
  const p=isScene04A(rt)?performance(rt):null,index=p?p.index:CUES.length-1,focus=p&&p.cue&&p.cue.focusActorRef||"academy_kakashi";
  const isNarration=rt.beatId===SCENE04A_BEAT;
  const kakClass=isNarration&&index===4?"sc-kakashi-block-entry-35710":"";
  const kak=()=>actorMarkup35710("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png",rt.beatId===BATTLE_BEAT?"ENGAGING MASKED INTERCEPTOR":focus==="academy_kakashi"?"FOCUSED":"PRESENT",focus==="academy_kakashi",kakClass);
  const mi=()=>actorMarkup35710("masked_interceptor","MASKED INTERCEPTOR","NPC/masked_interceptor.png",rt.beatId===RETURN_BEAT?"BATTLE RESULT COMMITTED":index>=9||rt.beatId===BATTLE_BEAT?"ENGAGING KAKASHI":"PRESSING PACKAGE SMUGGLER",focus==="masked_interceptor"||rt.beatId===BATTLE_BEAT);
  const psExit=index===6&&isNarration?"sc-kakashi-state-exit-right-35710":index>=7&&index<=8&&isNarration?"sc-kakashi-state-offstage-right-35710":"";
  const ps=()=>actorMarkup35710("package_smuggler","PACKAGE SMUGGLER","NPC/package_smuggler.png",index>=6?"ESCAPING WITH PACKAGE":"CURRENT PACKAGE HOLDER",focus==="package_smuggler",psExit);
  const actors=[];
  let stage="duel";
  if(isNarration&&index<=3){
    stage="kakashi-approach";actors.push(mi(),kak(),ps());
  }else if(isNarration&&index>=4&&index<=8){
    stage=index>=6?"smuggler-departure":"kakashi-blocks-line";actors.push(mi(),kak(),ps());
  }else{
    actors.push(kak(),mi());
  }
  return `<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(OBJECTIVE)}</div></div><div class="sc-scene-board-33900__actors" data-count="${actors.length}" data-stage="${stage}">${actors.join("")}</div>`;
}
function renderScene04APresentation35710(){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  const rt=active();
  if(!isScene04AFamily(rt)){clearFightBackdrop35710(stage);return false;}
  ensurePresentationStyle35710();
  layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode="encounter";
  let board=stage.querySelector&&stage.querySelector(`.${BOARD_CLASS}`);if(!board){board=document.createElement("section");board.className=BOARD_CLASS;board.setAttribute("aria-hidden","true");stage.appendChild(board);}const markup=boardMarkup35710(rt);if(board.innerHTML!==markup)board.innerHTML=markup;
  if(isScene04A(rt)){
    layer.dataset.scPerformance="true";
    const primary=layer.querySelector&&layer.querySelector(".sc-chronicle-primary");if(primary){primary.textContent="›";primary.setAttribute("aria-label","Advance scene");primary.title="Advance scene";}
  }
  // Generic dialogue/narration visibility and the 33910 performance surface are
  // canonical Scene Board responsibilities. This route hook owns only Scene 04A
  // factual choreography/card staging and must never clear 33910 state or DOM.
  return true;
}

function launchBattleAfterFinalCue35710(transition){
  const after=active();if(!transition||transition.success!==true||!after||after.sceneId!==SCENE_ID||after.beatId!==BATTLE_BEAT)return transition;
  const launcher=typeof globalThis.launchStorySceneBattle==="function"?globalThis.launchStorySceneBattle:(typeof launchStorySceneBattle==="function"?launchStorySceneBattle:null);
  if(typeof launcher!=="function"){
    try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}
    return{...transition,battleLaunchPending:true,battleLaunchReason:"story_battle_launcher_missing"};
  }
  const launched=launcher.call(globalThis);
  if(launched&&launched.success===true)return{...launched,autoLaunchedFromScene04A:true,storyTransition:transition};
  try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}
  return launched||{success:false,reason:"kakashi_scene04a_story_battle_launch_failed",storyTransition:transition};
}

let hooksInstalled=false,hookAttempts=0;
function installPresentationHooks35710(){
  if(hooksInstalled)return true;
  if(typeof globalThis.getStoryScenePerformance33900!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
  const PRE_GET=globalThis.getStoryScenePerformance33900,PRE_ADVANCE=globalThis.advanceStoryScene;
  globalThis.getStoryScenePerformance33900=function getStoryScenePerformance35710(){const rt=active();return isScene04A(rt)?performance(rt):PRE_GET.apply(this,arguments);};
  globalThis.advanceStoryScene=function advanceStoryScene35710(choiceId=null){
    const rt=active();if(!isScene04A(rt)||choiceId!==null&&choiceId!==undefined)return PRE_ADVANCE.apply(this,arguments);
    const p=performance(rt);if(!p.atEnd){const next=p.index+1;rt.localContext={...(rt.localContext||{}),[CURSOR_KEY]:next};save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}return{success:true,type:"kakashi_scene04a_performance_cue_advanced",beatId:SCENE04A_BEAT,cueIndex:next,semanticBeatUnchanged:true};}
    if(rt.localContext)delete rt.localContext[CURSOR_KEY];save();
    const transition=PRE_ADVANCE.apply(this,arguments);
    return launchBattleAfterFinalCue35710(transition);
  };
  try{getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  if(typeof globalThis.registerStorySceneBoardRenderHook==="function")globalThis.registerStorySceneBoardRenderHook("kakashi_scene04a_35710",()=>renderScene04APresentation35710());
  hooksInstalled=true;ensurePresentationStyle35710();renderScene04APresentation35710();return true;
}
function ensurePresentationHooks35710(){if(installPresentationHooks35710())return;if(typeof setTimeout==="function"&&hookAttempts++<80)setTimeout(ensurePresentationHooks35710,25);}

function diagnostics(){
  const def=scene(),major=def&&def.beatMap instanceof Map?def.beatMap.get(MAJOR_BEAT):null,choice=major&&Array.isArray(major.choices)?major.choices.find(row=>row&&row.choiceId===CHOICE_ID):null,battle=def&&def.beatMap instanceof Map?def.beatMap.get(BATTLE_BEAT):null,ret=def&&def.beatMap instanceof Map?def.beatMap.get(RETURN_BEAT):null,scene04=def&&def.beatMap instanceof Map?def.beatMap.get(SCENE04A_BEAT):null;
  const exact=["Kakashi moves.","Not toward ANBU Marked Target.","Not toward the package.","Toward Masked Interceptor.","She is already closing on Package Smuggler when Kakashi drops between them.","Package Smuggler sees the opening immediately.","He turns and runs.","The package goes with him.","Kakashi does not follow.","Masked Interceptor changes direction without hesitation.","Her attention settles on Kakashi.","He has made himself the obstacle now.","She comes straight through him.","Kakashi meets her head-on."];
  const envId=beat=>beat&&beat.environmentRef&&beat.environmentRef.assetId||null;
  const checks={patchId:PATCH_ID==="alpha_kakashi_scene04a_35710_v10_2026_09_22",authorityPinned:AUTHORITY==="64966fb33590d09e7ae16a33d51d0e7262b5891d",exactFourteenNarrationCues:CUES.length===14&&JSON.stringify(CUES.map(row=>row.text))===JSON.stringify(exact)&&CUES.every(row=>row.kind==="narration"&&!row.speakerName),stopAssassinWired:!!choice&&choice.nextBeatId===SCENE04A_BEAT&&Array.isArray(choice.consequenceRequests)&&choice.consequenceRequests.some(row=>row&&row.requestId===INTENT_REQUEST),intentBeforeBattle:ensureStopAssassinIntent35710.toString().includes("commitStoryIntent"),fightBackdropBound:envId(scene04)===FIGHT_BACKDROP_ID&&envId(battle)===FIGHT_BACKDROP_ID&&envId(ret)===FIGHT_BACKDROP_ID&&FIGHT_BACKDROP_PATH==="Kakashi Origin Backdrop/fight_at_sakura_tree.png",persistentScene04ABoard:BOARD_CLASS==="sc-kakashi-scene04a-board-35710"&&renderScene04APresentation35710.toString().includes("BOARD_CLASS"),exactBattleConfig:!!battle&&battle.mode==="battle_transition"&&battle.battle&&battle.battle.encounterId===BATTLE_CONFIG&&BATTLE_CONFIG==="academy_kakashi_origin_battle_mi_1v1",exactBattleBinding:BINDING==="academy_kakashi.battle.stop_assassin"&&SOURCE_ANCHOR==="AK_SA_019",finalCueAutoLaunch:launchBattleAfterFinalCue35710.toString().includes("launchStorySceneBattle")&&globalThis.advanceStoryScene.toString().includes("launchBattleAfterFinalCue35710"),noPakkun:launchScene04ABattle35710.toString().includes("pakkunAuthorized:false"),returnsSameBranch:!!battle&&battle.battle.postBattleBeatId===RETURN_BEAT&&!!ret&&ret.mode==="post_battle",battleReturnConsumed:!!ret&&Array.isArray(ret.onEnterConsequences)&&ret.onEnterConsequences.some(row=>row&&row.requestId===RETURN_REQUEST)&&consumeScene04ABattleReturn35710.toString().includes("dispatchCommittedIntent"),noBattleOutcomeOverreach:consumeScene04ABattleReturn35710.toString().includes("resultState")&&!consumeScene04ABattleReturn35710.toString().includes("participantDeathCommitted:true")&&!consumeScene04ABattleReturn35710.toString().includes("participantCustodyCommitted:true"),objectiveExact:OBJECTIVE==="Retrieve the package.",fieldGeometryDelegatedTo33910:ensurePresentationStyle35710.toString().includes("Generic actor geometry is owned by canonical 33910")&&!ensurePresentationStyle35710.toString().includes("width:min(94%,322px)")&&!ensurePresentationStyle35710.toString().includes("max-height:505px")&&!ensurePresentationStyle35710.toString().includes("bottom:33%!important")&&ensurePresentationStyle35710.toString().includes('data-count="3"'),activeActorsRemainFullColour:ensurePresentationStyle35710.toString().includes("opacity:1!important;filter:none!important"),watchStateNotReplayed:!boardMarkup35710.toString().includes("anbu_marked_target")&&!boardMarkup35710.toString().includes("sc-kakashi-mi-enter-rightward-35710"),orderedStopAssassinChoreography:boardMarkup35710.toString().includes("kakashi-approach")&&boardMarkup35710.toString().includes('index===4?"sc-kakashi-block-entry-35710"')&&boardMarkup35710.toString().includes('index===6&&isNarration?"sc-kakashi-state-exit-right-35710"'),stateDrivenDepartureMotion:ensurePresentationStyle35710.toString().includes("kakashiBlockEntry35710")&&ensurePresentationStyle35710.toString().includes("kakashiStateExitRight35710"),narrativeCardStaging:boardMarkup35710.toString().includes("kakashi-blocks-line")&&boardMarkup35710.toString().includes("smuggler-departure")&&ensurePresentationStyle35710.toString().includes("kakashiBlockEntry35710"),
    narrationProjectionDelegatedTo33910:!renderScene04APresentation35710.toString().includes(".sc-story-text")&&!renderScene04APresentation35710.toString().includes(".sc-story-name"),genericPerformanceSurfaceDelegatedTo33910:!renderScene04APresentation35710.toString().includes("sc-performance-surface-33910")&&!renderScene04APresentation35710.toString().includes("scBoardUiMode"),redundantPackageBadgeRemoved:!boardMarkup35710.toString().includes("sc-scene-board-33900__objects")&&boardMarkup35710.toString().includes("ESCAPING WITH PACKAGE"),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);return{pass:failed.length===0,checks,failed,authority:AUTHORITY,battleConfigId:BATTLE_CONFIG,bindingRef:BINDING,sourceAnchorRef:SOURCE_ANCHOR,fightBackdropId:FIGHT_BACKDROP_ID,fightBackdropPath:FIGHT_BACKDROP_PATH,browserGoldenClaimed:false};
}

const installed=installSemanticSurface35710();if(!installed||installed.success!==true)throw new Error(`kakashi_scene04a_surface_install_failed:${installed&&installed.reason||"unknown"}`);
ensurePresentationHooks35710();
globalThis.runAcademyKakashiScene04A35710Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SCENE04A_35710=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,installed,cueCount:CUES.length,choiceId:CHOICE_ID,battleConfigId:BATTLE_CONFIG,bindingRef:BINDING,sourceAnchorRef:SOURCE_ANCHOR,objective:OBJECTIVE,fightBackdropId:FIGHT_BACKDROP_ID,fightBackdropPath:FIGHT_BACKDROP_PATH,browserGoldenClaimed:false});
})();