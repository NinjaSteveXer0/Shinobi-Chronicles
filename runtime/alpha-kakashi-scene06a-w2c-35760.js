// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI SCENE 06A-W2C: ATTEMPT TO KILL HER — 35760
//
// Verbatim Writing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_06A_W2C_Attempt_To_Kill_Her_Verbatim_Lock_2026-09-18.md
// commit 820917031000c15e62f0a4cea7535397d3ad9e50
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

const PATCH_ID="alpha_kakashi_scene06aw2c_35760_v8_2026_09_19";
const AUTHORITY="bef78d90ccdea0206199ca0cdd06593ce3a0adb1";
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
const SOURCE_REQUEST="kakashi_scene06aw2c_source_choice_35760";

const COMMON_OPEN=Object.freeze([
  Object.freeze({cueId:"scene06aw2c_01",kind:"narration",text:"Kakashi watches Masked Interceptor push herself upright.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_02",kind:"narration",text:"One hand braces against the stone.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_03",kind:"narration",text:"The other stays close to her weapon.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_04",kind:"narration",text:"She is hurt.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_05",kind:"narration",text:"Still dangerous.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_06",kind:"narration",text:"Kakashi studies her for a heartbeat.",focusActorRef:"academy_kakashi"})
]);
const PURSUIT_OPEN_CUES=Object.freeze([
  Object.freeze({cueId:"scene06aw2c_open_07",kind:"narration",text:"His eye shifts toward the street.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_open_08",kind:"narration",text:"Package Smuggler is still moving.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene06aw2c_open_09",kind:"narration",text:"Somewhere beyond him, ANBU Marked Target is getting farther away.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene06aw2c_open_10",kind:"narration",text:"Kakashi could move now.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_open_11",kind:"narration",text:"Instead, he looks back at Masked Interceptor.",focusActorRef:"masked_interceptor"})
]);
const COMMON_CLOSE=Object.freeze([
  Object.freeze({cueId:"scene06aw2c_12",kind:"narration",text:"Masked Interceptor steadies herself.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_13",kind:"narration",text:"Kakashi reaches for his kunai.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_14",kind:"narration",text:"She sees his hand move.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_15",kind:"narration",text:"Whatever she expected him to do next, this was not it.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_16",kind:"narration",text:"Her stance changes.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene06aw2c_17",kind:"narration",text:"Kakashi lowers his centre of gravity.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene06aw2c_18",kind:"narration",text:"Then disappears from where he was standing.",focusActorRef:"academy_kakashi"})
]);
const CUES_OPEN=Object.freeze([...COMMON_OPEN,...PURSUIT_OPEN_CUES,...COMMON_CLOSE]);
const CUES_CLOSED=Object.freeze([...COMMON_OPEN,...COMMON_CLOSE]);

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
  return !!rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&rt.localContext&&rt.localContext.kakashiScene05AWEntered===true&&Number(rt.localContext.kakashiScene05AWTurnCount)>=1&&currentMiStateClass()==="DEFEATED_BUT_NOT_CONTROLLED";
}
function contextStateRef(rt){
  return PROVIDER.stableRef("sc35760-entry",{storySceneInstanceId:String(rt&&rt.instanceId||""),battleOccurrenceId:String(rt&&rt.localContext&&rt.localContext.kakashiScene05AWBattleOccurrenceId||""),turnCount:Number(rt&&rt.localContext&&rt.localContext.kakashiScene05AWTurnCount||0),miStateClass:currentMiStateClass()});
}
function existingIntent(contextRef){
  const snap=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};
  return Object.values(snap.decisionReceipts||{}).find(function(row){return row&&row.storyDecisionContextId===contextRef&&row.selectedChoiceId===INTENT_CHOICE&&row.resolverBindingRef===BINDING;})||null;
}
function ensureLethalIntent(rt=active()){
  if(!lateEntryEligible(rt))return{success:false,reason:"kakashi_scene06aw2c_uncontrolled_entry_required"};
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
function prepareScene06AW2CSourceChoice(choice){
  const rt=active();if(!lateEntryEligible(rt))return{success:false,reason:"kakashi_scene06aw2c_uncontrolled_entry_required"};
  const intent=ensureLethalIntent(rt);if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_scene06aw2c_intent_missing"};
  if(choice)choice.nextBeatId=SCENE_BEAT;
  rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CEntered:true,kakashiScene06AW2CPursuitWasOpenAtIntent:rt.localContext&&rt.localContext.kakashiScene05AWPursuitEligible===true,kakashiScene06AW2CPreLethalPackagePursuitEligible:rt.localContext&&rt.localContext.kakashiScene05AWPackagePursuitEligible===true,kakashiScene06AW2CPreLethalAmtPursuitEligible:rt.localContext&&rt.localContext.kakashiScene05AWAmtPursuitEligible===true,[CURSOR_KEY]:0};save();
  return{success:true,type:"kakashi_scene06aw2c_source_choice_prepared",nextBeatId:SCENE_BEAT,intentCommitRef:intent.receipt.intentCommitRef,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId};
}
function wireSourceChoice(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null,beat=map&&map.get(SOURCE_BEAT);if(!beat||!Array.isArray(beat.choices))return false;
  const choice=beat.choices.find(function(row){return row&&row.choiceId===SOURCE_CHOICE;});if(!choice)return false;
  const original=Array.isArray(choice.consequenceRequests)?choice.consequenceRequests.find(function(row){return row&&row.requestId!==SOURCE_REQUEST;})||null:null;
  choice.nextBeatId=SOURCE_BEAT;
  choice.consequenceRequests=[{requestId:SOURCE_REQUEST,kind:"domain",resolve:function(){
    if(lateEntryEligible())return prepareScene06AW2CSourceChoice(choice);
    return original&&typeof original.resolve==="function"?original.resolve():{success:false,reason:"kakashi_scene05aw_successor_authority_not_implemented",branch:"BRANCH_C"};
  }}];
  return true;
}
function enterScene06AW2C(){
  const rt=active();const prepared=prepareScene06AW2CSourceChoice(null);if(!prepared||prepared.success!==true)return prepared;
  rt.beatId=SCENE_BEAT;save();
  return{success:true,type:"kakashi_scene06aw2c_entered",beatId:SCENE_BEAT,intentCommitRef:prepared.intentCommitRef,storyDecisionReceiptId:prepared.storyDecisionReceiptId};
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
function pursuitWasOpenAtIntent(rt=active()){return !!(rt&&rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitWasOpenAtIntent===true);}
function derivePostLethalPursuit35760(rt,selected){
  const turns=Number(rt&&rt.localContext&&rt.localContext.kakashiScene05AWTurnCount||0);
  const fast=Number.isInteger(turns)&&turns>=1&&turns<=4&&pursuitWasOpenAtIntent(rt);
  if(!fast||String(selected)!=="LETHAL_ATTEMPT_KILLED")return{pursuitAvailable:false,packageSmugglerAvailable:false,anbuMarkedTargetAvailable:false,reason:"resolved_lethal_result_consumed_or_closed_window"};
  return{
    pursuitAvailable:true,
    packageSmugglerAvailable:rt.localContext&&rt.localContext.kakashiScene06AW2CPreLethalPackagePursuitEligible!==false,
    anbuMarkedTargetAvailable:rt.localContext&&rt.localContext.kakashiScene06AW2CPreLethalAmtPursuitEligible!==false,
    reason:"fast_confirmed_kill_preserves_committed_pursuit_window"
  };
}
function postLethalChoiceRows35760(rt=active()){
  if(!rt||!rt.localContext||rt.localContext.kakashiScene06AW2CPursuitAvailable!==true)return[];
  const rows=[];
  if(rt.localContext.kakashiScene06AW2CPackageAvailable===true)rows.push({choiceId:"scene06aw2c_postlethal_go_after_package_smuggler",label:"GO AFTER PACKAGE SMUGGLER",nextBeatId:HOLD_BEAT,availability:function(){return{available:true,knownBlocker:null};},knownBlocker:null,consequenceRequests:[{requestId:"kakashi_scene06aw2c_postlethal_ps_pending_35760",kind:"domain",resolve:function(){return{success:false,reason:"kakashi_stop_assassin_postlethal_ps_successor_scene_not_yet_locked",pursuitStatePreserved:true};}}]});
  if(rt.localContext.kakashiScene06AW2CAMTAvailable===true)rows.push({choiceId:"scene06aw2c_postlethal_go_after_anbu_marked_target",label:"GO AFTER ANBU MARKED TARGET",nextBeatId:HOLD_BEAT,availability:function(){return{available:true,knownBlocker:null};},knownBlocker:null,consequenceRequests:[{requestId:"kakashi_scene06aw2c_postlethal_amt_pending_35760",kind:"domain",resolve:function(){return{success:false,reason:"kakashi_stop_assassin_postlethal_amt_successor_scene_not_yet_locked",pursuitStatePreserved:true};}}]});
  return rows;
}
function materializePostLethalChoices35760(){
  const def=scene(),beat=def&&def.beatMap instanceof Map?def.beatMap.get(HOLD_BEAT):null,rt=active();
  if(!beat)return false;
  beat.mode=rt&&rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitAvailable===true?"choice":"narration";
  beat.objectiveText=rt&&rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitAvailable===true?OBJECTIVE:null;
  beat.choices=postLethalChoiceRows35760(rt);
  return true;
}
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
    packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:"PACKAGE_SMUGGLER",recovered:false,available:derivePostLethalPursuit35760(rt,selected).packageSmugglerAvailable},
    worldFacts:{packageSmugglerAvailable:derivePostLethalPursuit35760(rt,selected).packageSmugglerAvailable,packageAvailable:derivePostLethalPursuit35760(rt,selected).packageSmugglerAvailable,anbuMarkedTargetAvailable:derivePostLethalPursuit35760(rt,selected).anbuMarkedTargetAvailable,pursuitAvailable:derivePostLethalPursuit35760(rt,selected).pursuitAvailable,pakkunPresent:false},
    pursuitRecalculation:{battleTurns:Number(rt.localContext&&rt.localContext.kakashiScene05AWTurnCount||0),pursuitWasOpenAtIntent:pursuitWasOpenAtIntent(rt),selectedOutcomeRef:selected,result:derivePostLethalPursuit35760(rt,selected)},
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
  const pursuit=derivePostLethalPursuit35760(rt,selected);
  rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CResolutionOccurrenceId:occurrenceId,kakashiScene06AW2COutcomeRef:selected,kakashiScene06AW2CPackageAvailable:pursuit.packageSmugglerAvailable,kakashiScene06AW2CAMTAvailable:pursuit.anbuMarkedTargetAvailable,kakashiScene06AW2CPursuitAvailable:pursuit.pursuitAvailable,kakashiScene06AW2CPakkunInvolved:false,kakashiScene06AW2CPursuitResolutionCommitted:true,kakashiScene05AWPursuitEligible:pursuit.pursuitAvailable,kakashiScene05AWPackagePursuitEligible:pursuit.packageSmugglerAvailable,kakashiScene05AWAmtPursuitEligible:pursuit.anbuMarkedTargetAvailable};save();
  materializePostLethalChoices35760();
  return{success:true,occurrenceId:occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[stateRef],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],participantStateDeltaRefs:participantRefs,successorSituationRef:null};
}
function providerBridge(factual){
  const receipt=factual&&factual.receipt||{};
  return{success:true,resolverResultRef:receipt.storyFactualResolverReceiptId||null,consequenceRefs:receipt.consequenceRefs||[],stateDeltaRefs:receipt.stateDeltaRefs||[],knowledgeDeltaRefs:receipt.knowledgeDeltaRefs||[],relationshipHistoryRefs:receipt.relationshipHistoryRefs||[],objectiveDeltaRefs:receipt.objectiveDeltaRefs||[],successorSituationRef:null,result:clone(factual&&factual.result||receipt.result||null)};
}
function beginPursuitPreservedOutcome35760(rt,selected){
  if(!rt||rt.beatId!==HOLD_BEAT||rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitAvailable!==true)return false;
  if(String(selected)!=="LETHAL_ATTEMPT_KILLED")return false;
  const finish=function(){
    rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CPursuitPresentationReady:true,kakashiScene06AW2CMiCardRemoved:true};
    materializePostLethalChoices35760();save();
    try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}
  };
  if(typeof document==="undefined"){finish();return true;}
  const animate=globalThis.playAcademyKakashiLethalAttemptAnimation35770;
  if(typeof animate==="function")return animate(function(){
    try{
      const layer=document.getElementById("story-scene-presentation-layer"),stage=layer&&((layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer),mi=stage&&stage.querySelector&&stage.querySelector("."+BOARD_CLASS+" [data-actor-id='masked_interceptor']");
      if(mi){mi.classList.add("sc-kakashi-mi-death-drop-35760");setTimeout(finish,620);return;}
    }catch(_error){}
    finish();
  });
  finish();return true;
}
function triggerResolvedOutcomePresentation(rt,selected){
  if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==HOLD_BEAT)return false;
  selected=String(selected||"");
  try{
    if(rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitAvailable===true)return beginPursuitPreservedOutcome35760(rt,selected);
    const resolved=globalThis.beginAcademyKakashiResolvedOutcome35780;
    if(typeof resolved==="function")return resolved(selected)===true;
    if(selected==="LETHAL_ATTEMPT_KILLED"){
      const kill=globalThis.beginAcademyKakashiConfirmedKill35770;
      return typeof kill==="function"?kill()===true:false;
    }
  }catch(_error){}
  return false;
}

function resolveLethalAttempt(rt=active()){
  if(!rt||rt.sceneId!==SCENE_ID||![SCENE_BEAT,HOLD_BEAT].includes(rt.beatId))return{success:false,reason:"kakashi_scene06aw2c_resolution_context_missing"};
  const receiptId=String(rt.localContext&&rt.localContext.kakashiScene06AW2CIntentReceiptId||"");
  if(!receiptId)return{success:false,reason:"kakashi_scene06aw2c_intent_receipt_missing"};
  const snap=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{},intentReceipt=snap.decisionReceipts&&snap.decisionReceipts[receiptId]||null;
  if(!intentReceipt)return{success:false,reason:"kakashi_scene06aw2c_intent_receipt_not_persisted"};
  const existingOccurrenceId=String(rt.localContext&&rt.localContext.kakashiScene06AW2CResolutionOccurrenceId||"");
  if(intentReceipt.status==="resolved"&&existingOccurrenceId&&A.findOccurrence(existingOccurrenceId)){
    const selected=String(rt.localContext.kakashiScene06AW2COutcomeRef||factOf(A.findOccurrence(existingOccurrenceId)).selectedOutcomeRef||"");
    rt.localContext={...(rt.localContext||{}),kakashiScene06AW2COutcomeRef:selected};
    rt.beatId=HOLD_BEAT;save();
    const presentationStarted=triggerResolvedOutcomePresentation(rt,selected);
    return{success:true,idempotent:true,selectedOutcomeRef:selected,occurrenceId:existingOccurrenceId,beatId:HOLD_BEAT,scene7Pending:!presentationStarted,confirmedKillPresentationStarted:presentationStarted};
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
  const selected=String(factual.receipt&&factual.receipt.selectedOutcomeRef||"");
  rt.localContext={...(rt.localContext||{}),kakashiScene06AW2CFactualReceiptId:String(factual.receipt&&factual.receipt.storyFactualResolverReceiptId||""),kakashiScene06AW2COutcomeRef:selected,[CURSOR_KEY]:sequenceFor35760(rt).length-1};
  rt.beatId=HOLD_BEAT;save();
  const presentationStarted=triggerResolvedOutcomePresentation(rt,selected);
  return{success:true,type:"kakashi_scene06aw2c_resolved_scene7_pending",selectedOutcomeRef:selected,occurrenceId:String(rt.localContext.kakashiScene06AW2CResolutionOccurrenceId||occurrenceId),storyFactualResolverReceiptId:String(factual.receipt&&factual.receipt.storyFactualResolverReceiptId||""),beatId:HOLD_BEAT,scene7Pending:!presentationStarted,confirmedKillPresentationStarted:presentationStarted};
}
function sequenceFor35760(rt=active()){return pursuitWasOpenAtIntent(rt)?CUES_OPEN:CUES_CLOSED;}
function cursor(rt=active()){const sequence=sequenceFor35760(rt),raw=rt&&rt.localContext?Number(rt.localContext[CURSOR_KEY]):0;return Number.isInteger(raw)?Math.max(0,Math.min(sequence.length-1,raw)):0;}
function performance(rt=active()){
  if(rt&&rt.beatId===HOLD_BEAT&&rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitAvailable===true&&rt.localContext.kakashiScene06AW2CPursuitPresentationReady===true)return null;
  const sequence=sequenceFor35760(rt),index=rt&&rt.beatId===HOLD_BEAT?sequence.length-1:cursor(rt);
  return{sequence,index:index,cue:sequence[index],atEnd:index>=sequence.length-1};
}

function isSceneBeat(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&rt.beatId===SCENE_BEAT;}
function isFamily(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&(rt.beatId===SCENE_BEAT||rt.beatId===HOLD_BEAT);}

function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=[
    "."+BOARD_CLASS+"{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}",
    "#story-scene-presentation-layer ."+BOARD_CLASS+" .sc-kakashi-mi-death-drop-35760{animation:kakashiMiDeathDrop35760 .60s cubic-bezier(.35,.05,.75,.2) both!important}",
    "@keyframes kakashiMiDeathDrop35760{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(72vh) rotate(8deg)}}"

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
    actorMarkup("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png",rt.beatId===HOLD_BEAT&&rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitAvailable===true?"PURSUIT DECISION":"PRESENT",focus==="academy_kakashi")
  ];
  if(!(rt.beatId===HOLD_BEAT&&rt.localContext&&rt.localContext.kakashiScene06AW2CMiCardRemoved===true))actors.push(actorMarkup("masked_interceptor","MASKED INTERCEPTOR","NPC/masked_interceptor.png",String(rt.localContext&&rt.localContext.kakashiScene06AW2COutcomeRef||"")==="LETHAL_ATTEMPT_KILLED"?"DEAD":"BATTLE-DEFEATED · NOT CONTROLLED",focus==="masked_interceptor"));
  return '<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+escapeHTML(OBJECTIVE)+'</div></div><div class="sc-scene-board-33900__actors" data-count="2">'+actors.join("")+'</div>';
}
function renderScene(){
  wireSourceChoice();
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  const rt=active();
  for(const old of stage.querySelectorAll?stage.querySelectorAll("."+BOARD_CLASS):[])if(!isFamily(rt))old.remove();
  if(!isFamily(rt))return false;
  installStyle();if(typeof globalThis.applyStorySceneBoardBackdrop33900==="function")globalThis.applyStorySceneBoardBackdrop33900(stage,rt);
  layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode="encounter";
  let board=stage.querySelector&&stage.querySelector("."+BOARD_CLASS);if(!board){board=document.createElement("section");board.className=BOARD_CLASS;board.setAttribute("aria-hidden","true");stage.appendChild(board);}
  const markup=boardMarkup(rt);if(board.innerHTML!==markup)board.innerHTML=markup;
  const p=performance(rt);
  if(p&&p.cue){
    layer.dataset.scPerformance="true";
    const cue=p.cue,text=layer.querySelector&&layer.querySelector(".sc-story-text");if(text&&text.textContent!==cue.text)text.textContent=cue.text;
    const name=layer.querySelector&&layer.querySelector(".sc-story-name");if(name){name.textContent="";name.style.display="none";}
    const kicker=layer.querySelector&&layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent="NARRATION · ACADEMY KAKASHI";
    const primary=layer.querySelector&&layer.querySelector(".sc-chronicle-primary");if(primary){primary.textContent="›";primary.setAttribute("aria-label","Advance scene");primary.title="Advance scene";}
  }else{
    try{delete layer.dataset.scPerformance;}catch(_error){}
    materializePostLethalChoices35760();
  }
  return true;
}
function installBeats(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null;if(!map)return{success:false,reason:"kakashi_scene06aw2c_story_definition_missing"};
  map.set(SCENE_BEAT,{beatId:SCENE_BEAT,mode:"narration",environmentRef:{assetId:BACKDROP_ID},text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,onEnterConsequences:[],onAdvanceConsequences:[],choices:[]});
  map.set(HOLD_BEAT,{beatId:HOLD_BEAT,mode:"choice",environmentRef:{assetId:BACKDROP_ID},text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,onEnterConsequences:[],onAdvanceConsequences:[],choices:[]});
  return{success:true,sceneBeatId:SCENE_BEAT,holdBeatId:HOLD_BEAT};
}

const CORE_RESOLVER_REGISTRATION=CORE.registerResolver(BINDING,bridgeResolverResult(BINDING),{owner:"authorised lethal-result owner",battleOwned:false});
if(!CORE_RESOLVER_REGISTRATION||CORE_RESOLVER_REGISTRATION.success!==true)throw new Error("kakashi_scene06aw2c_core_resolver_registration_failed");
const FACTUAL_REGISTRATION=PROVIDER.registerStoryFactualResolverBinding(BINDING,{ownerRef:"academy_kakashi.scene06a_w2c",authorityVersionRefs:[AUTHORITY,ACTION_CONTRACT,PROVIDER_AUTHORITY],outcomes:OUTCOMES,commitResult:commitLethalResult,metadata:{storyUnitRef:ORIGIN_ID,sceneId:"SCENE_06A_W2C",targetRef:MI_REF,resolverDetermined:true,noBranchLabelOutcomeInference:true,scene7ExpressionPending:true}});
if(!FACTUAL_REGISTRATION||FACTUAL_REGISTRATION.success!==true)throw new Error("kakashi_scene06aw2c_factual_binding_registration_failed");
const INSTALLED=installBeats();if(!INSTALLED||INSTALLED.success!==true)throw new Error("kakashi_scene06aw2c_surface_install_failed");
wireSourceChoice();

let hooksInstalled=false,attempts=0;
function installHooks(){
  if(hooksInstalled)return true;
  if(typeof globalThis.getStoryScenePerformance33900!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
  const PRE_GET=globalThis.getStoryScenePerformance33900,PRE_ADVANCE=globalThis.advanceStoryScene;
  globalThis.getStoryScenePerformance33900=function getStoryScenePerformance35760(){const rt=active(),owned=isFamily(rt)?performance(rt):null;return owned||PRE_GET.apply(this,arguments);};
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
    if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===HOLD_BEAT){materializePostLethalChoices35760();if(rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitAvailable===true&&choiceId!==null&&choiceId!==undefined)return PRE_ADVANCE.apply(this,arguments);return{success:false,reason:rt.localContext&&rt.localContext.kakashiScene06AW2CPursuitAvailable===true?"kakashi_scene06aw2c_postlethal_pursuit_choice_required":"kakashi_scene06aw2c_scene7_authority_pending",selectedOutcomeRef:String(rt.localContext&&rt.localContext.kakashiScene06AW2COutcomeRef||"")};}
    return PRE_ADVANCE.apply(this,arguments);
  };
  try{getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  if(typeof globalThis.registerStorySceneBoardRenderHook==="function")globalThis.registerStorySceneBoardRenderHook("kakashi_scene06aw2c_35760",()=>{wireSourceChoice();return renderScene();});
  hooksInstalled=true;installStyle();wireSourceChoice();renderScene();return true;
}
function ensureHooks(){if(installHooks())return;if(typeof setTimeout==="function"&&attempts++<120)setTimeout(ensureHooks,25);}

function installBrowserChoiceCapture(){
  if(typeof document==="undefined"||document.__scKakashiScene06AW2CCapture35760)return false;
  document.__scKakashiScene06AW2CCapture35760=true;
  document.addEventListener("click",function(event){
    const target=event&&event.target&&typeof event.target.closest==="function"?event.target.closest(".sc-story-choice"):null;
    if(!target||!lateEntryEligible())return;
    const label=String(target.textContent||"").replace(/\s+/g," ").trim().toUpperCase();
    if(!label.includes("ATTEMPT TO KILL HER"))return;
    if(event&&typeof event.preventDefault==="function")event.preventDefault();
    if(event&&typeof event.stopImmediatePropagation==="function")event.stopImmediatePropagation();
    const entered=enterScene06AW2C();
    if(entered&&entered.success===true){try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}}
  },true);
  return true;
}

function diagnostics(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null,sceneBeat=map&&map.get(SCENE_BEAT),hold=map&&map.get(HOLD_BEAT);
  const exactOpen=[
    "Kakashi watches Masked Interceptor push herself upright.","One hand braces against the stone.","The other stays close to her weapon.","She is hurt.","Still dangerous.","Kakashi studies her for a heartbeat.","His eye shifts toward the street.","Package Smuggler is still moving.","Somewhere beyond him, ANBU Marked Target is getting farther away.","Kakashi could move now.","Instead, he looks back at Masked Interceptor.","Masked Interceptor steadies herself.","Kakashi reaches for his kunai.","She sees his hand move.","Whatever she expected him to do next, this was not it.","Her stance changes.","Kakashi lowers his centre of gravity.","Then disappears from where he was standing."
  ];
  const exactClosed=[
    "Kakashi watches Masked Interceptor push herself upright.","One hand braces against the stone.","The other stays close to her weapon.","She is hurt.","Still dangerous.","Kakashi studies her for a heartbeat.","Masked Interceptor steadies herself.","Kakashi reaches for his kunai.","She sees his hand move.","Whatever she expected him to do next, this was not it.","Her stance changes.","Kakashi lowers his centre of gravity.","Then disappears from where he was standing."
  ];
  const binding=(PROVIDER.getRegisteredStoryFactualBindings()||[]).find(function(row){return row.bindingRef===BINDING;});
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_scene06aw2c_35760_v8_2026_09_19",
    authorityPinned:AUTHORITY==="bef78d90ccdea0206199ca0cdd06593ce3a0adb1",
    exactNarration:JSON.stringify(CUES_OPEN.map(function(row){return row.text;}))===JSON.stringify(exactOpen)&&JSON.stringify(CUES_CLOSED.map(function(row){return row.text;}))===JSON.stringify(exactClosed)&&CUES_OPEN.concat(CUES_CLOSED).every(function(row){return row.kind==="narration"&&!row.speakerName;}),
    exactEntryGate:lateEntryEligible.toString().includes("kakashiScene05AWEntered===true")&&lateEntryEligible.toString().includes(">=1")&&!lateEntryEligible.toString().includes("kakashiScene05AWPursuitEligible===false")&&lateEntryEligible.toString().includes("DEFEATED_BUT_NOT_CONTROLLED"),
    renderDelegatedTo33900:installHooks.toString().includes('registerStorySceneBoardRenderHook("kakashi_scene06aw2c_35760"')&&!installHooks.toString().includes("renderStoryScenePresentationLayer=function"),
    intentBeforeResolver:prepareScene06AW2CSourceChoice.toString().includes("ensureLethalIntent")&&!prepareScene06AW2CSourceChoice.toString().includes("resolveStoryFactualAction"),
    sourceChoiceWired:wireSourceChoice()===true&&wireSourceChoice.toString().includes("SOURCE_REQUEST")&&wireSourceChoice.toString().includes("prepareScene06AW2CSourceChoice"),
    exactResolverEnvelope:!!binding&&JSON.stringify(binding.outcomeRefs)===JSON.stringify(OUTCOMES.map(function(row){return row.outcomeRef;})),
    noOutcomeFromButton:ensureLethalIntent.toString().includes("ATTEMPT TO KILL")&&!ensureLethalIntent.toString().includes("LETHAL_ATTEMPT_KILLED"),
    exactBackdrop:!!sceneBeat&&sceneBeat.environmentRef&&sceneBeat.environmentRef.assetId===BACKDROP_ID&&!!hold&&hold.environmentRef&&hold.environmentRef.assetId===BACKDROP_ID,
    objectiveExact:OBJECTIVE==="Retrieve the package.",
    noChoicesAfterCommit:!!sceneBeat&&Array.isArray(sceneBeat.choices)&&sceneBeat.choices.length===0&&!!hold&&Array.isArray(hold.choices)&&hold.choices.length===0,
    lethalIntentDoesNotClosePursuit:prepareScene06AW2CSourceChoice.toString().includes("kakashiScene06AW2CPursuitWasOpenAtIntent")&&!prepareScene06AW2CSourceChoice.toString().includes("kakashiScene05AWPursuitEligible:false"),
    qualifyingKillCanPreservePursuit:derivePostLethalPursuit35760({localContext:{kakashiScene05AWTurnCount:4,kakashiScene06AW2CPursuitWasOpenAtIntent:true,kakashiScene06AW2CPreLethalPackagePursuitEligible:true,kakashiScene06AW2CPreLethalAmtPursuitEligible:true}},"LETHAL_ATTEMPT_KILLED").packageSmugglerAvailable===true&&derivePostLethalPursuit35760({localContext:{kakashiScene05AWTurnCount:5,kakashiScene06AW2CPursuitWasOpenAtIntent:false}},"LETHAL_ATTEMPT_KILLED").pursuitAvailable===false,
    nonkillOutcomesUseExistingClosedEndings:["LETHAL_ATTEMPT_SURVIVED","LETHAL_ATTEMPT_INTERRUPTED","LETHAL_ATTEMPT_ESCAPED"].every(function(x){return derivePostLethalPursuit35760({localContext:{kakashiScene05AWTurnCount:1,kakashiScene06AW2CPursuitWasOpenAtIntent:true}},x).pursuitAvailable===false;}),
    stateDerivedPostLethalChoices:postLethalChoiceRows35760.toString().includes("GO AFTER PACKAGE SMUGGLER")&&postLethalChoiceRows35760.toString().includes("GO AFTER ANBU MARKED TARGET"),
    noPakkun:commitLethalResult.toString().includes("pakkunPresent:false"),
    directResolvedOutcomeTrigger:resolveLethalAttempt.toString().includes("triggerResolvedOutcomePresentation")&&triggerResolvedOutcomePresentation.toString().includes("beginAcademyKakashiResolvedOutcome35780")&&triggerResolvedOutcomePresentation.toString().includes("beginAcademyKakashiConfirmedKill35770"),
    pursuitPresentationReleasesNarration:performance.toString().includes("kakashiScene06AW2CPursuitPresentationReady===true")&&globalThis.getStoryScenePerformance33900.toString().includes("owned||PRE_GET"),
    settledPursuitRenderDoesNotDereferenceMissingCue:renderScene.toString().includes("if(p&&p.cue)")&&renderScene.toString().includes("materializePostLethalChoices35760()"),
    scene7FailClosedWhenNoPursuit:typeof globalThis.advanceStoryScene==="function"&&globalThis.advanceStoryScene.toString().includes("kakashi_scene06aw2c_scene7_authority_pending")&&HOLD_BEAT==="kak_scene06a_w2c_scene7_pending",
    fieldGeometryDelegatedTo33910:!installStyle.toString().includes("width:min(94%,322px)")&&!installStyle.toString().includes("bottom:20%!important")&&installStyle.toString().includes("kakashiMiDeathDrop35760"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(function(pair){return pair[0]!=="browserGoldenClaimed"&&pair[1]!==true;}).map(function(pair){return pair[0];});
  return{pass:failed.length===0,checks:checks,failed:failed,authority:AUTHORITY,bindingRef:BINDING,outcomeRefs:OUTCOMES.map(function(row){return row.outcomeRef;}),sceneBeatId:SCENE_BEAT,holdBeatId:HOLD_BEAT,browserGoldenClaimed:false};
}

ensureHooks();installBrowserChoiceCapture();
const api=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,actionContract:ACTION_CONTRACT,bindingRef:BINDING,sourceChoiceId:SOURCE_CHOICE,sceneBeatId:SCENE_BEAT,holdBeatId:HOLD_BEAT,cueCount:CUES_OPEN.length,closedCueCount:CUES_CLOSED.length,outcomeRefs:Object.freeze(OUTCOMES.map(function(row){return row.outcomeRef;})),objective:OBJECTIVE,enterScene06AW2C:enterScene06AW2C,wireSourceChoice:wireSourceChoice,resolveLethalAttempt:resolveLethalAttempt,diagnostics:diagnostics,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_SCENE06AW2C_35760=api;
globalThis.runAcademyKakashiScene06AW2C35760Diagnostics=diagnostics;
})();