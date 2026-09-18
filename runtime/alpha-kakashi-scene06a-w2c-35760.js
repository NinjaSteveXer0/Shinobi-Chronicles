// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI SCENE 06A-W2C: ATTEMPT TO KILL HER — 35760
//
// Verbatim Writing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_06A_W2C_Attempt_To_Kill_Her_Verbatim_Lock_2026-09-18.md
// commit 671e04042debafccead2c41ab31fc4ebf99a75b1
//
// Entry is ONLY STOP THE ASSASSIN -> Kakashi victory -> turn 4+ -> Scene 05A-W2
// ATTEMPT TO KILL HER. The player choice commits lethal intent first. The
// neutral factual resolver then chooses and durably commits one exact authorised
// factual result. Scene 7 presentation remains fail-closed until Writing locks it.
// ============================================================================
(function installAcademyKakashiScene06AW2C35760(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SCENE06AW2C_35760)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
const SCENE05AW=globalThis.SC_ALPHA_KAKASHI_SCENE05AW_35730;
if(!A||typeof A.commitOccurrence!=="function"||typeof A.findOccurrence!=="function"||!CORE||!PROVIDER||!SCENE05AW)throw new Error("kakashi_scene06aw2c_runtime_dependencies_missing");

const PATCH_ID="alpha_kakashi_scene06aw2c_35760_v1_2026_09_18";
const AUTHORITY="671e04042debafccead2c41ab31fc4ebf99a75b1";
const ACTION_CONTRACT="778fc612d21beae9d3b96d8ace70ab10ad467237";
const PROVIDER_AUTHORITY="f2291162085cb3a35fc2a8e49df7ed905c214c85";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_BEAT="kak_scene05a_w_choice";
const SOURCE_CHOICE="scene05aw_lethal";
const SCENE_BEAT="kak_scene06a_w2c_attempt_kill";
const HOLD_BEAT="kak_scene06a_w2c_scene7_pending";
const DECISION_POINT="SCENE_06A_W2C_LETHAL_COMMITMENT";
const INTENT_CHOICE="scene06aw2c_attempt_kill_intent";
const BINDING="academy_kakashi.lethal.attempt_kill";
const MI_REF="academy_kakashi_origin_masked_interceptor";
const WORLD_OBJECT_REF="kakashi_origin_outer_route_packet";
const BACKDROP_ID="kakashi_origin_fight_at_sakura_tree";
const BACKDROP_PATH="Kakashi Origin Backdrop/fight_at_sakura_tree.png";
const OBJECTIVE="Retrieve the package.";
const CURSOR_KEY="__kakashiScene06AW2C35760Cursor";
const STYLE_ID="sc-kakashi-scene06aw2c-35760-style";
const BOARD_CLASS="sc-kakashi-scene06aw2c-board-35760";

const CUES=Object.freeze([
  Object.freeze({cueId:"scene06aw2c_01",kind:"narration",text:"Kakashi looks once toward the empty street.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_02",kind:"narration",text:"Nothing.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_03",kind:"narration",text:"Package Smuggler is gone.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_04",kind:"narration",text:"The package with him.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_05",kind:"narration",text:"He turns back toward Masked Interceptor.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_06",kind:"narration",text:"She has forced herself partway up from the stone.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_07",kind:"narration",text:"Not recovered.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_08",kind:"narration",text:"Not helpless either.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_09",kind:"narration",text:"Her head lifts as Kakashi approaches.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_10",kind:"narration",text:"His hand moves to his kunai.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_11",kind:"narration",text:"This is not an arrest.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_12",kind:"narration",text:"Not a return to ANBU.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_13",kind:"narration",text:"Not the Police Force.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_14",kind:"narration",text:"Masked Interceptor sees the decision before Kakashi makes the first step.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_15",kind:"narration",text:"Her body tightens.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_16",kind:"narration",text:"Kakashi moves.",focusActorRef:"academy_kakashi"})
]);

const OUTCOMES=Object.freeze([
  Object.freeze({outcomeRef:"LETHAL_ATTEMPT_KILLED",resultPayloadTemplate:Object.freeze({outcomeClass:"LETHAL_ATTEMPT_KILLED",targetRef:MI_REF,deathState:"CONFIRMED_DEAD"})}),
  Object.freeze({outcomeRef:"LETHAL_ATTEMPT_SURVIVED",resultPayloadTemplate:Object.freeze({outcomeClass:"LETHAL_ATTEMPT_SURVIVED",targetRef:MI_REF,survivalState:"SURVIVED_ATTEMPT"})}),
  Object.freeze({outcomeRef:"LETHAL_ATTEMPT_INTERRUPTED",resultPayloadTemplate:Object.freeze({outcomeClass:"LETHAL_ATTEMPT_INTERRUPTED",targetRef:MI_REF,attemptState:"INTERRUPTED"})}),
  Object.freeze({outcomeRef:"LETHAL_ATTEMPT_ESCAPED",resultPayloadTemplate:Object.freeze({outcomeClass:"LETHAL_ATTEMPT_ESCAPED",targetRef:MI_REF,escapeState:"ESCAPED"})})
]);

function clone(value){return CORE.clone(value);}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function escapeHTML(value){return String(value==null?"":value).replace(/[&<>\"']/g,function(ch){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];});}
function cssUrlValue(value){return 'url("'+String(value||"").replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'")';}
function currentMiStateClass(){
  try{const snap=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};const row=snap.participantStates&&snap.participantStates[MI_REF]||null;return row&&row.stateClass?String(row.stateClass):null;}catch(_error){return null;}
}
function lateEntryEligible(rt=active()){
  return !!rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&rt.localContext&&rt.localContext.kakashiScene05AWPursuitEligible===false&&Number(rt.localContext.kakashiScene05AWTurnCount)>=4&&currentMiStateClass()==="DEFEATED_BUT_NOT_CONTROLLED";
}
function contextStateRef(rt){
  return PROVIDER.stableRef("sc35760-entry",{storySceneInstanceId:String(rt&&rt.instanceId||""),battleOccurrenceId:String(rt&&rt.localContext&&rt.localContext.kakashiScene05AWBattleOccurrenceId||""),turnCount:Number(rt&&rt.localContext&&rt.localContext.kakashiScene05AWTurnCount||0),miStateClass:currentMiStateClass()});
}
function existingIntent(contextRef){
  const snap=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};
  return Object.values(snap.decisionReceipts||{}).find(function(row){return row&&row.storyDecisionContextId===contextRef&&row.selectedChoiceId===INTENT_CHOICE&&row.resolverBindingRef===BINDING;})||null;
}
function ensureLethalIntent(rt=active()){
  if(!lateEntryEligible(rt))return{success:false,reason:"kakashi_scene06aw2c_late_uncontrolled_entry_required"};
  const contextRef=contextStateRef(rt);
  const existing=existingIntent(contextRef);
  if(existing){
    rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CIntentReceiptId:existing.storyDecisionReceiptId,kakashiScene06AW2CIntentCommitRef:existing.intentCommitRef,kakashiScene06AW2CContextStateRef:contextRef};save();
    return{success:true,idempotent:true,receipt:existing,contextStateRef:contextRef};
  }
  const opened=CORE.openSemanticChoiceSet({
    storyUnitRef:ORIGIN_ID,storyUnitType:"origin",decisionPointRef:DECISION_POINT,contextStateRef:contextRef,sceneRef:SCENE_ID,beatRef:SOURCE_BEAT,
    authorityVersionRefs:[AUTHORITY,ACTION_CONTRACT,PROVIDER_AUTHORITY],sourceOccurrenceRefs:[String(rt.localContext.kakashiScene05AWBattleOccurrenceId||"")],observerRef:ORIGIN_ID,
    choices:[{choiceId:INTENT_CHOICE,intentType:"ATTEMPT_TO_KILL",intentPayload:{semanticClass:"ATTEMPT TO KILL — RESOLVER-DETERMINED",targetRef:MI_REF},resolverBindingRef:BINDING,presentationLabel:"ATTEMPT TO KILL HER",authoredOrder:0}]
  });
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_scene06aw2c_choice_set_open_failed"};
  const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId:opened.choiceSet.choiceSetId,choiceId:INTENT_CHOICE});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_scene06aw2c_intent_commit_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CIntentReceiptId:committed.receipt.storyDecisionReceiptId,kakashiScene06AW2CIntentCommitRef:committed.receipt.intentCommitRef,kakashiScene06AW2CContextStateRef:contextRef};save();
  return{success:true,receipt:committed.receipt,contextStateRef:contextRef};
}
function enterScene06AW2C(){
  const rt=active();const intent=ensureLethalIntent(rt);if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_scene06aw2c_intent_missing"};
  rt.beatId=SCENE_BEAT;rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CEntered:true,[CURSOR_KEY]:0};save();
  return{success:true,type:"kakashi_scene06aw2c_entered",beatId:SCENE_BEAT,intentCommitRef:intent.receipt.intentCommitRef,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId};
}
function bridgeResolverResult(bindingRef){
  return function(spec){
    const state=spec&&spec.state||{},table=state.resolverResults&&typeof state.resolverResults==="object"?state.resolverResults:null,result=table&&table[bindingRef]||null;
    if(!result||result.success!==true)return{success:false,reason:"owning_resolver_result_not_supplied",bindingRef:bindingRef};
    return{success:true,resolverResultRef:result.resolverResultRef||null,consequenceRefs:result.consequenceRefs||[],stateDeltaRefs:result.stateDeltaRefs||[],knowledgeDeltaRefs:result.knowledgeDeltaRefs||[],relationshipHistoryRefs:result.relationshipHistoryRefs||[],objectiveDeltaRefs:result.objectiveDeltaRefs||[],successorSituationRef:result.successorSituationRef||null,result:clone(result.result||result.outcome||null)};
  };
}
function participantStateForOutcome(selected){
  if(selected==="LETHAL_ATTEMPT_KILLED")return"DEAD";
  if(selected==="LETHAL_ATTEMPT_SURVIVED")return"SURVIVED_LETHAL_ATTEMPT";
  if(selected==="LETHAL_ATTEMPT_ESCAPED")return"ESCAPED_AFTER_LETHAL_ATTEMPT";
  return null;
}
function factOf(row){return row&&(row.fact||row.data)||{};}
function commitLethalResult(spec){
  const receipt=spec&&spec.receipt||{},request=spec&&spec.request||{},result=spec&&spec.result||{};
  const rt=active(),instance=String(request&&request.context&&request.context.storySceneInstanceId||"");
  if(!rt||rt.sceneId!==SCENE_ID||String(rt.instanceId||"")!==instance)return{success:false,reason:"kakashi_scene06aw2c_story_instance_mismatch"};
  const selected=String(receipt.selectedOutcomeRef||"");
  if(!OUTCOMES.some(function(row){return row.outcomeRef===selected;}))return{success:false,reason:"kakashi_scene06aw2c_outcome_not_authorised"};
  const occurrenceId=String(request.committedAtOccurrenceRef||PROVIDER.stableRef("occ_origin_kakashi_scene06aw2c",{storySceneInstanceId:instance,storyDecisionReceiptId:String(receipt.storyDecisionReceiptId||""),selectedOutcomeRef:selected}));
  const fact={
    factClass:"academy_kakashi_scene06aw2c_lethal_attempt_resolution",
    sceneId:"SCENE_06A_W2C",storySceneInstanceId:instance,authorityCommit:AUTHORITY,
    semanticClass:"ATTEMPT TO KILL — RESOLVER-DETERMINED",lethalIntentCommitted:true,targetRef:MI_REF,
    storyDecisionReceiptId:String(receipt.storyDecisionReceiptId||""),storyFactualResolverReceiptId:String(receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,
    targetDeathConfirmed:selected==="LETHAL_ATTEMPT_KILLED",targetSurvivalConfirmed:selected==="LETHAL_ATTEMPT_SURVIVED"||selected==="LETHAL_ATTEMPT_ESCAPED",
    attemptInterrupted:selected==="LETHAL_ATTEMPT_INTERRUPTED",targetEscapeConfirmed:selected==="LETHAL_ATTEMPT_ESCAPED",
    packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:"PACKAGE_SMUGGLER",recovered:false,available:false},
    worldFacts:{packageSmugglerAvailable:false,packageAvailable:false,anbuMarkedTargetAvailable:false,pursuitAvailable:false,pakkunPresent:false},
    resolverResult:clone(result)
  };
  const existing=A.findOccurrence(occurrenceId);
  if(existing){
    const prior=factOf(existing);
    if(String(prior.selectedOutcomeRef||"")!==selected||String(prior.storyDecisionReceiptId||"")!==String(receipt.storyDecisionReceiptId||""))return{success:false,reason:"kakashi_scene06aw2c_occurrence_replay_mismatch"};
  }else{
    const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:selected,participantRefs:[ORIGIN_ID,MI_REF],sourceRefs:[{type:"battle_occurrence",id:String(rt.localContext&&rt.localContext.kakashiScene05AWBattleOccurrenceId||"")},{type:"story_decision_receipt",id:String(receipt.storyDecisionReceiptId||"")},{type:"story_factual_resolver_receipt",id:String(receipt.storyFactualResolverReceiptId||"")},{type:"world_object",id:WORLD_OBJECT_REF}]});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_scene06aw2c_occurrence_commit_failed"};
  }
  const participantState=participantStateForOutcome(selected),participantRefs=[];
  if(participantState){
    const participantResultRef=PROVIDER.stableRef("sc35760-mi-state",{occurrenceId:occurrenceId,selectedOutcomeRef:selected,stateClass:participantState});
    const classified=CORE.recordParticipantClassification({storyUnitRef:ORIGIN_ID,participantRef:MI_REF,stateClass:participantState,resultRef:participantResultRef});
    if(!classified||classified.success!==true)return classified||{success:false,reason:"kakashi_scene06aw2c_participant_classification_failed"};
    participantRefs.push(participantResultRef);
  }
  const stateRef=PROVIDER.stableRef("sc35760-state",{occurrenceId:occurrenceId,selectedOutcomeRef:selected});
  rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CResolutionOccurrenceId:occurrenceId,kakashiScene06AW2COutcomeRef:selected,kakashiScene06AW2CPackageAvailable:false,kakashiScene06AW2CAMTAvailable:false,kakashiScene06AW2CPursuitAvailable:false,kakashiScene06AW2CPakkunInvolved:false};save();
  return{success:true,occurrenceId:occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[stateRef],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],participantStateDeltaRefs:participantRefs,successorSituationRef:null};
}
function providerBridge(factual){
  const receipt=factual&&factual.receipt||{};
  return{success:true,resolverResultRef:receipt.storyFactualResolverReceiptId||null,consequenceRefs:receipt.consequenceRefs||[],stateDeltaRefs:receipt.stateDeltaRefs||[],knowledgeDeltaRefs:receipt.knowledgeDeltaRefs||[],relationshipHistoryRefs:receipt.relationshipHistoryRefs||[],objectiveDeltaRefs:receipt.objectiveDeltaRefs||[],successorSituationRef:null,result:clone(factual&&factual.result||receipt.result||null)};
}
function resolveLethalAttempt(rt=active()){
  if(!rt||rt.sceneId!==SCENE_ID||![SCENE_BEAT,HOLD_BEAT].includes(rt.beatId))return{success:false,reason:"kakashi_scene06aw2c_resolution_context_missing"};
  const receiptId=String(rt.localContext&&rt.localContext.kakashiScene06AW2CIntentReceiptId||"");
  if(!receiptId)return{success:false,reason:"kakashi_scene06aw2c_intent_receipt_missing"};
  const snap=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{},intentReceipt=snap.decisionReceipts&&snap.decisionReceipts[receiptId]||null;
  if(!intentReceipt)return{success:false,reason:"kakashi_scene06aw2c_intent_receipt_not_persisted"};
  const existingOccurrenceId=String(rt.localContext&&rt.localContext.kakashiScene06AW2CResolutionOccurrenceId||"");
  if(intentReceipt.status==="resolved"&&existingOccurrenceId&&A.findOccurrence(existingOccurrenceId)){
    rt.beatId=HOLD_BEAT;save();
    return{success:true,idempotent:true,selectedOutcomeRef:String(rt.localContext.kakashiScene06AW2COutcomeRef||""),occurrenceId:existingOccurrenceId,beatId:HOLD_BEAT,scene7Pending:true};
  }
  const occurrenceId=PROVIDER.stableRef("occ_origin_kakashi_scene06aw2c",{storySceneInstanceId:String(rt.instanceId||""),storyDecisionReceiptId:receiptId});
  const factual=PROVIDER.resolveStoryFactualAction({
    storyDecisionReceiptId:receiptId,bindingRef:BINDING,actorRef:ORIGIN_ID,intentCommitRef:String(intentReceipt.intentCommitRef||""),attemptOrdinal:1,
    idempotenceKey:PROVIDER.stableRef("sc35760-idempotence",{storySceneInstanceId:String(rt.instanceId||""),storyDecisionReceiptId:receiptId,bindingRef:BINDING}),
    authorityVersionRefs:[AUTHORITY,ACTION_CONTRACT,PROVIDER_AUTHORITY],inputStateRefs:[String(rt.localContext&&rt.localContext.kakashiScene06AW2CContextStateRef||"")],
    continuityLineageRef:String(rt.instanceId||""),committedAtOccurrenceRef:occurrenceId,
    context:{storySceneInstanceId:String(rt.instanceId||""),sceneId:SCENE_ID,beatId:SCENE_BEAT,targetRef:MI_REF}
  });
  if(!factual||factual.success!==true)return factual||{success:false,reason:"kakashi_scene06aw2c_factual_resolution_failed"};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:receiptId,state:{resolverResults:{[BINDING]:providerBridge(factual)}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId||"")}});
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_scene06aw2c_semantic_dispatch_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CFactualReceiptId:String(factual.receipt&&factual.receipt.storyFactualResolverReceiptId||""),kakashiScene06AW2COutcomeRef:String(factual.receipt&&factual.receipt.selectedOutcomeRef||""),[CURSOR_KEY]:CUES.length-1};
  rt.beatId=HOLD_BEAT;save();
  return{success:true,type:"kakashi_scene06aw2c_resolved_scene7_pending",selectedOutcomeRef:String(factual.receipt&&factual.receipt.selectedOutcomeRef||""),occurrenceId:String(rt.localContext.kakashiScene06AW2CResolutionOccurrenceId||occurrenceId),storyFactualResolverReceiptId:String(factual.receipt&&factual.receipt.storyFactualResolverReceiptId||""),beatId:HOLD_BEAT,scene7Pending:true};
}
function cursor(rt=active()){const raw=rt&&rt.localContext?Number(rt.localContext[CURSOR_KEY]):0;return Number.isInteger(raw)?Math.max(0,Math.min(CUES.length-1,raw)):0;}
function performance(rt=active()){
  const index=rt&&rt.beatId===HOLD_BEAT?CUES.length-1:cursor(rt);
  return{sequence:CUES,index:index,cue:CUES[index],atEnd:index>=CUES.length-1};
}
function isSceneBeat(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&rt.beatId===SCENE_BEAT;}
function isFamily(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&(rt.beatId===SCENE_BEAT||rt.beatId===HOLD_BEAT);}

function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=[
    "."+BOARD_CLASS+"{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}",
    "#story-scene-presentation-layer .sc-chronicle-stage[data-sc-kakashi-scene06aw2c='true']{background-image:linear-gradient(180deg,rgba(2,5,8,.02),rgba(2,5,8,.05) 50%,rgba(2,5,8,.40) 82%,rgba(2,5,8,.68)),var(--sc-kakashi-scene06aw2c-backdrop)!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important}",
    "#story-scene-presentation-layer ."+BOARD_CLASS+" .sc-scene-board-33900__actors{left:2.5%!important;right:2.5%!important;top:8.5%!important;bottom:20%!important;gap:2.2%!important}",
    "#story-scene-presentation-layer ."+BOARD_CLASS+" .sc-scene-board-33900__actors[data-count='2']{display:flex!important;justify-content:space-between!important;align-items:flex-end!important;padding:0 5.4%!important;column-gap:0!important}",
    "#story-scene-presentation-layer ."+BOARD_CLASS+" .sc-scene-board-33900__actor{width:min(94%,322px)!important;max-height:490px!important;aspect-ratio:7/10!important;overflow:visible!important}",
    "#story-scene-presentation-layer ."+BOARD_CLASS+" .sc-scene-board-33900__actor[data-actor-id='academy_kakashi']{width:min(96%,338px)!important;max-height:505px!important}"
  ].join("");
  document.head.appendChild(style);return true;
}
function backdropPath(){
  try{if(typeof getSceneBackdropAssetPath==="function")return getSceneBackdropAssetPath(BACKDROP_ID)||BACKDROP_PATH;}catch(_error){}
  try{if(typeof globalThis.getSceneBackdropAssetPath==="function")return globalThis.getSceneBackdropAssetPath(BACKDROP_ID)||BACKDROP_PATH;}catch(_error){}
  return BACKDROP_PATH;
}
function actorMarkup(id,label,image,state,focus){
  return '<figure class="sc-scene-board-33900__actor '+(focus?"is-focus":"")+'" data-actor-id="'+escapeHTML(id)+'"><div class="sc-scene-board-33900__actor-frame"></div><img src="'+escapeHTML(image)+'" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>'+escapeHTML(label)+'</strong><small>'+escapeHTML(state)+'</small></figcaption></figure>';
}
function boardMarkup(rt){
  const p=performance(rt),focus=p&&p.cue&&p.cue.focusActorRef||"academy_kakashi";
  const actors=[
    actorMarkup("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","PRESENT",focus==="academy_kakashi"),
    actorMarkup("masked_interceptor","MASKED INTERCEPTOR","NPC/masked_interceptor.png","BATTLE-DEFEATED · NOT CONTROLLED",focus==="masked_interceptor")
  ];
  return '<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+escapeHTML(OBJECTIVE)+'</div></div><div class="sc-scene-board-33900__actors" data-count="2">'+actors.join("")+'</div>';
}
function renderScene(){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  const rt=active();
  for(const old of stage.querySelectorAll?stage.querySelectorAll("."+BOARD_CLASS):[])if(!isFamily(rt))old.remove();
  if(!isFamily(rt)){try{delete stage.dataset.scKakashiScene06aw2c;}catch(_error){}if(stage.style)stage.style.removeProperty("--sc-kakashi-scene06aw2c-backdrop");return false;}
  installStyle();stage.dataset.scKakashiScene06aw2c="true";stage.style.setProperty("--sc-kakashi-scene06aw2c-backdrop",cssUrlValue(backdropPath()));
  layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode="encounter";layer.dataset.scPerformance="true";
  let board=stage.querySelector&&stage.querySelector("."+BOARD_CLASS);if(!board){board=document.createElement("section");board.className=BOARD_CLASS;board.setAttribute("aria-hidden","true");stage.appendChild(board);}
  const markup=boardMarkup(rt);if(board.innerHTML!==markup)board.innerHTML=markup;
  const p=performance(rt),cue=p.cue||{},text=layer.querySelector&&layer.querySelector(".sc-story-text");if(text&&text.textContent!==cue.text)text.textContent=cue.text;
  const name=layer.querySelector&&layer.querySelector(".sc-story-name");if(name){name.textContent="";name.style.display="none";}
  const kicker=layer.querySelector&&layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent="NARRATION · ACADEMY KAKASHI";
  const primary=layer.querySelector&&layer.querySelector(".sc-chronicle-primary");if(primary){primary.textContent="›";primary.setAttribute("aria-label","Advance scene");primary.title="Advance scene";}
  return true;
}
function installBeats(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null;if(!map)return{success:false,reason:"kakashi_scene06aw2c_story_definition_missing"};
  map.set(SCENE_BEAT,{beatId:SCENE_BEAT,mode:"narration",environmentRef:{assetId:BACKDROP_ID},text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,onEnterConsequences:[],onAdvanceConsequences:[],choices:[]});
  map.set(HOLD_BEAT,{beatId:HOLD_BEAT,mode:"narration",environmentRef:{assetId:BACKDROP_ID},text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,onEnterConsequences:[],onAdvanceConsequences:[],choices:[]});
  return{success:true,sceneBeatId:SCENE_BEAT,holdBeatId:HOLD_BEAT};
}

const CORE_RESOLVER_REGISTRATION=CORE.registerResolver(BINDING,bridgeResolverResult(BINDING),{owner:"authorised lethal-result owner",battleOwned:false});
if(!CORE_RESOLVER_REGISTRATION||CORE_RESOLVER_REGISTRATION.success!==true)throw new Error("kakashi_scene06aw2c_core_resolver_registration_failed");
const FACTUAL_REGISTRATION=PROVIDER.registerStoryFactualResolverBinding(BINDING,{ownerRef:"academy_kakashi.scene06a_w2c",authorityVersionRefs:[AUTHORITY,ACTION_CONTRACT,PROVIDER_AUTHORITY],outcomes:OUTCOMES,commitResult:commitLethalResult,metadata:{storyUnitRef:ORIGIN_ID,sceneId:"SCENE_06A_W2C",targetRef:MI_REF,resolverDetermined:true,noBranchLabelOutcomeInference:true,scene7ExpressionPending:true}});
if(!FACTUAL_REGISTRATION||FACTUAL_REGISTRATION.success!==true)throw new Error("kakashi_scene06aw2c_factual_binding_registration_failed");
const INSTALLED=installBeats();if(!INSTALLED||INSTALLED.success!==true)throw new Error("kakashi_scene06aw2c_surface_install_failed");

let hooksInstalled=false,attempts=0;
function installHooks(){
  if(hooksInstalled)return true;
  if(typeof globalThis.getStoryScenePerformance33900!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
  const PRE_GET=globalThis.getStoryScenePerformance33900,PRE_ADVANCE=globalThis.advanceStoryScene,PRE_RENDER=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  globalThis.getStoryScenePerformance33900=function getStoryScenePerformance35760(){const rt=active();return isFamily(rt)?performance(rt):PRE_GET.apply(this,arguments);};
  globalThis.advanceStoryScene=function advanceStoryScene35760(choiceId=null){
    const rt=active();
    if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&choiceId===SOURCE_CHOICE&&lateEntryEligible(rt)){
      const entered=enterScene06AW2C();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}return entered;
    }
    if(isSceneBeat(rt)&&choiceId===null){
      const p=performance(rt);
      if(!p.atEnd){const next=p.index+1;rt.localContext={...(rt.localContext||{}),[CURSOR_KEY]:next};save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}return{success:true,type:"kakashi_scene06aw2c_performance_cue_advanced",beatId:SCENE_BEAT,cueIndex:next,semanticBeatUnchanged:true};}
      const resolved=resolveLethalAttempt(rt);try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}return resolved;
    }
    if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===HOLD_BEAT)return{success:false,reason:"kakashi_scene06aw2c_scene7_authority_pending",selectedOutcomeRef:String(rt.localContext&&rt.localContext.kakashiScene06AW2COutcomeRef||"")};
    return PRE_ADVANCE.apply(this,arguments);
  };
  try{getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  if(PRE_RENDER){globalThis.renderStoryScenePresentationLayer=function renderStoryScenePresentationLayer35760(){const out=PRE_RENDER.apply(this,arguments);if(typeof queueMicrotask==="function")queueMicrotask(renderScene);else if(typeof setTimeout==="function")setTimeout(renderScene,0);return out;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}}
  hooksInstalled=true;installStyle();renderScene();return true;
}
function ensureHooks(){if(installHooks())return;if(typeof setTimeout==="function"&&attempts++<120)setTimeout(ensureHooks,25);}

function diagnostics(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null,sceneBeat=map&&map.get(SCENE_BEAT),hold=map&&map.get(HOLD_BEAT);
  const exact=["Kakashi looks once toward the empty street.","Nothing.","Package Smuggler is gone.","The package with him.","He turns back toward Masked Interceptor.","She has forced herself partway up from the stone.","Not recovered.","Not helpless either.","Her head lifts as Kakashi approaches.","His hand moves to his kunai.","This is not an arrest.","Not a return to ANBU.","Not the Police Force.","Masked Interceptor sees the decision before Kakashi makes the first step.","Her body tightens.","Kakashi moves."];
  const binding=(PROVIDER.getRegisteredStoryFactualBindings()||[]).find(function(row){return row.bindingRef===BINDING;});
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_scene06aw2c_35760_v1_2026_09_18",
    authorityPinned:AUTHORITY==="671e04042debafccead2c41ab31fc4ebf99a75b1",
    exactNarration:JSON.stringify(CUES.map(function(row){return row.text;}))===JSON.stringify(exact)&&CUES.every(function(row){return row.kind==="narration"&&!row.speakerName;}),
    exactEntryGate:lateEntryEligible.toString().includes("kakashiScene05AWPursuitEligible===false")&&lateEntryEligible.toString().includes(">=4")&&lateEntryEligible.toString().includes("DEFEATED_BUT_NOT_CONTROLLED"),
    intentBeforeResolver:enterScene06AW2C.toString().includes("ensureLethalIntent")&&!enterScene06AW2C.toString().includes("resolveStoryFactualAction"),
    exactResolverEnvelope:!!binding&&JSON.stringify(binding.outcomeRefs)===JSON.stringify(OUTCOMES.map(function(row){return row.outcomeRef;})),
    noOutcomeFromButton:ensureLethalIntent.toString().includes("ATTEMPT TO KILL")&&!ensureLethalIntent.toString().includes("LETHAL_ATTEMPT_KILLED"),
    exactBackdrop:!!sceneBeat&&sceneBeat.environmentRef&&sceneBeat.environmentRef.assetId===BACKDROP_ID&&!!hold&&hold.environmentRef&&hold.environmentRef.assetId===BACKDROP_ID,
    objectiveExact:OBJECTIVE==="Retrieve the package.",
    noChoicesAfterCommit:!!sceneBeat&&Array.isArray(sceneBeat.choices)&&sceneBeat.choices.length===0&&!!hold&&Array.isArray(hold.choices)&&hold.choices.length===0,
    packageAmtPursuitStayClosed:commitLethalResult.toString().includes("packageSmugglerAvailable:false")&&commitLethalResult.toString().includes("anbuMarkedTargetAvailable:false")&&commitLethalResult.toString().includes("pursuitAvailable:false"),
    noPakkun:commitLethalResult.toString().includes("pakkunPresent:false"),
    scene7FailClosed:typeof globalThis.advanceStoryScene==="function"&&globalThis.advanceStoryScene.toString().includes("kakashi_scene06aw2c_scene7_authority_pending")&&HOLD_BEAT==="kak_scene06a_w2c_scene7_pending",
    standardCharacterCardScale:installStyle.toString().includes("width:min(94%,322px)")&&installStyle.toString().includes("width:min(96%,338px)")&&installStyle.toString().includes("max-height:505px"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(function(pair){return pair[0]!=="browserGoldenClaimed"&&pair[1]!==true;}).map(function(pair){return pair[0];});
  return{pass:failed.length===0,checks:checks,failed:failed,authority:AUTHORITY,bindingRef:BINDING,outcomeRefs:OUTCOMES.map(function(row){return row.outcomeRef;}),sceneBeatId:SCENE_BEAT,holdBeatId:HOLD_BEAT,browserGoldenClaimed:false};
}

ensureHooks();
const api=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,actionContract:ACTION_CONTRACT,bindingRef:BINDING,sourceChoiceId:SOURCE_CHOICE,sceneBeatId:SCENE_BEAT,holdBeatId:HOLD_BEAT,cueCount:CUES.length,outcomeRefs:Object.freeze(OUTCOMES.map(function(row){return row.outcomeRef;})),objective:OBJECTIVE,enterScene06AW2C:enterScene06AW2C,resolveLethalAttempt:resolveLethalAttempt,diagnostics:diagnostics,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_SCENE06AW2C_35760=api;
globalThis.runAcademyKakashiScene06AW2C35760Diagnostics=diagnostics;
})();