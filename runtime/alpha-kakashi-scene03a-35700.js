// ============================================================================
// ISSUE #105 / #188 — ACADEMY KAKASHI SCENE 03A: WATCH THE EXCHANGE — 35700
//
// Player-facing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_03A_Watch_The_Exchange_Verbatim_Lock_2026-09-17.md
// commit ebc5f9ed1575ac01f72fd24487c3e38f09112117
//
// Scope:
// - exact Scene 03A narration on the existing Sakura-tree transfer beat;
// - exact five-way Scene 03A choice surface;
// - direct Observe intent provenance and factual handoff/escalation commit;
// - no unauthorised successor-scene prose;
// - no Battle, reward, custody inference beyond the locked completed handoff;
// - presentation-only objective projection follows the committed handoff state.
// ============================================================================
(function installAcademyKakashiScene03A35700(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SCENE03A_35700)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
if(!A||typeof A.commitOccurrence!=="function"||typeof A.findOccurrence!=="function")throw new Error("kakashi_scene03a_origin_occurrence_authority_missing");
if(!CORE||typeof CORE.commitStoryIntent!=="function"||!KAK||typeof KAK.openDecisionPoint!=="function"||!PROVIDER||typeof PROVIDER.stableRef!=="function")throw new Error("kakashi_scene03a_semantic_authority_missing");

const PATCH_ID="alpha_kakashi_scene03a_35700_2026_09_17";
const AUTHORITY="ebc5f9ed1575ac01f72fd24487c3e38f09112117";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const OPENING_BEAT="kak_original_action";
const TRANSFER_BEAT="kak_original_transfer";
const MAJOR_BEAT="kak_original_major_choice";
const OBSERVE_CHOICE="observe";
const OBSERVE_BINDING="academy_kakashi.story_fixed.observe_transfer";
const OBSERVE_REQUEST="kakashi_scene03a_observe_intent_35700";
const COMMIT_REQUEST="kakashi_scene03a_handoff_escalation_35700";
const WORLD_OBJECT_REF="kakashi_origin_outer_route_packet";
const CUSTOM_CURSOR="__kakashiScene03A35700Cursor";
const NATIVE_CURSOR="__storyPerformanceCursor33900";
const SAKURA=Object.freeze({assetId:"kakashi_origin_sakura_tree_night"});
const INITIAL_OBJECTIVE="Stop the package from falling into the wrong hands.";
const POST_HANDOFF_OBJECTIVE="Retrieve the package.";

const CUES=Object.freeze([
  Object.freeze({cueId:"scene03a_01",kind:"narration",text:"Kakashi stays where he is.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene03a_02",kind:"narration",text:"Not passive.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene03a_03",kind:"narration",text:"Watching.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene03a_04",kind:"narration",text:"ANBU Marked Target shifts the package from beneath his clothing and places it into Package Smuggler's hand.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene03a_05",kind:"narration",text:"The moment custody changes, the whole problem changes with it.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene03a_06",kind:"narration",text:"Kakashi's eye follows the package.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene03a_07",kind:"narration",text:"ANBU Marked Target is already moving away.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene03a_08",kind:"narration",text:"Package Smuggler turns in the opposite direction.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene03a_09",kind:"narration",text:"Kakashi has one additional fact now—who received the package—and less control over the situation than he had a few seconds earlier.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene03a_10",kind:"narration",text:"The trade was information for escalation.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene03a_11",kind:"narration",text:"Then the darkness beside the alley moved.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene03a_12",kind:"narration",text:"Not slowly.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene03a_13",kind:"narration",text:"A figure tore out of it like a lightning streak.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene03a_14",kind:"narration",text:"Masked Interceptor hit the new situation at speed, driving straight toward Package Smuggler and forcing him to react before he had properly cleared the exchange.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene03a_15",kind:"narration",text:"ANBU Marked Target broke away.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene03a_16",kind:"narration",text:"Package Smuggler tightened around the package.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene03a_17",kind:"narration",text:"Masked Interceptor cut across his escape line.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene03a_18",kind:"narration",text:"And Kakashi, still unseen for one more heartbeat, had to choose what mattered most now.",focusActorRef:"academy_kakashi"})
]);

const CHOICE_SPECS=Object.freeze([
  Object.freeze({choiceId:"stop_assassin",label:"STOP THE ASSASSIN"}),
  Object.freeze({choiceId:"secure_package",label:"SECURE THE PACKAGE"}),
  Object.freeze({choiceId:"secure_package_before_assassin",label:"SECURE THE PACKAGE BEFORE THE ASSASSIN"}),
  Object.freeze({choiceId:"defeat_assassin_then_secure",label:"DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE"}),
  Object.freeze({choiceId:"go_after_original_target",label:"GO AFTER THE ORIGINAL TARGET"})
]);

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function isScene03A(rt=active()){return!!rt&&rt.sceneId===SCENE_ID&&rt.beatId===TRANSFER_BEAT&&String(rt.localContext&&rt.localContext.kakashiOriginalAction||"")===OBSERVE_CHOICE;}
function cursor(rt=active()){const raw=rt&&rt.localContext?Number(rt.localContext[CUSTOM_CURSOR]):0;return Number.isInteger(raw)?Math.max(0,Math.min(CUES.length-1,raw)):0;}
function performance(rt=active()){const index=cursor(rt);return{sequence:CUES,index,cue:CUES[index],atEnd:index>=CUES.length-1};}
function coarseNativeIndex(index){if(index<=2)return 0;if(index<=9)return 1;return 2;}
function syncNativeCursor(rt,index){if(!rt)return;rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};rt.localContext[NATIVE_CURSOR]={beatId:TRANSFER_BEAT,index:coarseNativeIndex(index)};}
function availableChoice(){return{available:true,knownBlocker:null};}
function objectiveForState35700(rt=active()){
  if(!rt||rt.sceneId!==SCENE_ID)return null;
  if(String(rt.localContext&&rt.localContext.kakashiOriginalAction||"")!==OBSERVE_CHOICE)return INITIAL_OBJECTIVE;
  if(rt.beatId===MAJOR_BEAT)return POST_HANDOFF_OBJECTIVE;
  if(rt.beatId===TRANSFER_BEAT&&cursor(rt)>=3)return POST_HANDOFF_OBJECTIVE;
  return INITIAL_OBJECTIVE;
}

function openingContextRef(rt){return PROVIDER.stableRef("sc35700-kakashi-observe-entry",{sceneId:SCENE_ID,storySceneInstanceId:String(rt&&rt.instanceId||""),beatId:OPENING_BEAT});}
function existingDecisionReceipt(contextStateRef){
  const snapshot=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};
  return Object.values(snapshot.decisionReceipts||{}).find(row=>row&&row.storyDecisionContextId===contextStateRef&&row.selectedChoiceId===OBSERVE_CHOICE&&row.resolverBindingRef===OBSERVE_BINDING)||null;
}
function ensureObserveIntent35700(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_scene03a_story_instance_missing"};
  const contextStateRef=openingContextRef(rt);let receipt=existingDecisionReceipt(contextStateRef);
  if(!receipt){
    const opened=KAK.openDecisionPoint("AK_SA_001",{committedStateRef:contextStateRef,beatRef:OPENING_BEAT,sourceOccurrenceRefs:[]});
    if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_scene03a_opening_choice_set_failed"};
    const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId:opened.choiceSet.choiceSetId,choiceId:OBSERVE_CHOICE});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_scene03a_observe_intent_commit_failed"};
    receipt=committed.receipt;
  }
  rt.localContext={...(rt.localContext||{}),kakashiObserveScene03AContextStateRef:contextStateRef,kakashiObserveScene03AStoryDecisionReceiptId:receipt.storyDecisionReceiptId,kakashiObserveScene03AIntentCommitRef:receipt.intentCommitRef};
  save();return{success:true,idempotent:!!existingDecisionReceipt(contextStateRef),contextStateRef,receipt};
}
function scene03AOccurrenceId(rt,receipt){return PROVIDER.stableRef("occ_origin_kakashi_scene03a_observe_exchange",{storySceneInstanceId:String(rt&&rt.instanceId||""),storyDecisionReceiptId:String(receipt&&receipt.storyDecisionReceiptId||""),authority:AUTHORITY});}
function ensureObserveEscalationChoiceSet(rt,occurrenceId){
  const snapshot=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};const existingId=String(rt.localContext&&rt.localContext.kakashiObserveEscalationChoiceSetId||"");
  const existing=snapshot.choiceSets&&snapshot.choiceSets[existingId]||null;
  if(existing&&existing.decisionPointRef==="OBSERVE_ESCALATION"&&String(existing.contextStateRef||"")===String(occurrenceId))return{success:true,idempotent:true,choiceSet:existing};
  const opened=KAK.openDecisionPoint("OBSERVE_ESCALATION",{committedStateRef:String(occurrenceId),beatRef:MAJOR_BEAT,sourceOccurrenceRefs:[String(occurrenceId)]});
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_scene03a_escalation_choice_set_failed"};
  return opened;
}
function commitScene03A35700(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==MAJOR_BEAT)return{success:false,reason:"kakashi_scene03a_commit_context_missing"};
  const intent=ensureObserveIntent35700();if(!intent||intent.success!==true)return intent;
  const receipt=intent.receipt,occurrenceId=scene03AOccurrenceId(rt,receipt);
  let occurrence=A.findOccurrence(occurrenceId);
  if(!occurrence){
    const fact={
      factClass:"academy_kakashi_observe_exchange_scene03a_factual_state",
      storyDecisionReceiptId:String(receipt.storyDecisionReceiptId),storySceneInstanceId:String(rt.instanceId),
      packageState:{objectRef:WORLD_OBJECT_REF,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"PACKAGE_SMUGGLER",handoffCompleted:true},
      participantStateByRole:{academy_kakashi:{detectionState:"UNDETECTED"},anbu_marked_target:{roleState:"BREAKING_AWAY"},package_smuggler:{roleState:"CURRENT_PACKAGE_HOLDER"},masked_interceptor:{visibilityState:"VISIBLE_AFTER_COMPLETED_TRANSFER"}},
      knowledgeStateByObserver:{academy_kakashi:{packageRecipientObserved:true,maskedInterceptorVisible:true}},
      worldFacts:{handoffCompleted:true,maskedInterceptorVisible:true},
      nextDecisionPointRef:"OBSERVE_ESCALATION"
    };
    const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{participantRefs:["kakashi_origin_logistics_clerk","kakashi_origin_information_broker","kakashi_origin_decoy_assassin_01"],sourceRefs:[{type:"world_object",id:WORLD_OBJECT_REF}]});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_scene03a_occurrence_commit_failed"};
    occurrence=A.findOccurrence(occurrenceId)||committed.record||null;
  }
  const result={outcomeClass:"OBSERVE_TRANSFER_ESCALATION",handoffCompleted:true,packageCustody:"PACKAGE_SMUGGLER",packageRecipientObserved:true,maskedInterceptorVisible:true,nextDecisionPointRef:"OBSERVE_ESCALATION"};
  const bridge={success:true,resolverResultRef:occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[occurrenceId],knowledgeDeltaRefs:[occurrenceId],relationshipHistoryRefs:[],objectiveDeltaRefs:[occurrenceId],successorSituationRef:"academy_kakashi.decision.observe_escalation",result};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:String(receipt.storyDecisionReceiptId),state:{resolverResults:{[OBSERVE_BINDING]:bridge}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId),selectedChoiceId:OBSERVE_CHOICE,committedStateRef:occurrenceId}});
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_scene03a_semantic_dispatch_failed"};
  const opened=ensureObserveEscalationChoiceSet(rt,occurrenceId);if(!opened||opened.success!==true)return opened;
  rt.localContext={...(rt.localContext||{}),kakashiObserveScene03AOccurrenceId:occurrenceId,kakashiObserveEscalationChoiceSetId:opened.choiceSet.choiceSetId};save();
  return{success:true,idempotent:!!A.findOccurrence(occurrenceId),occurrenceId,storyDecisionReceiptId:String(receipt.storyDecisionReceiptId),choiceSetId:opened.choiceSet.choiceSetId};
}

function installSemanticSurface35700(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_scene03a_story_definition_missing"};
  const action=def.beatMap.get(OPENING_BEAT),transfer=def.beatMap.get(TRANSFER_BEAT),major=def.beatMap.get(MAJOR_BEAT);
  if(!action||!transfer||!major||!Array.isArray(action.choices))return{success:false,reason:"kakashi_scene03a_required_beats_missing"};
  const observe=action.choices.find(row=>row&&row.choiceId===OBSERVE_CHOICE);if(!observe)return{success:false,reason:"kakashi_scene03a_observe_choice_missing"};
  observe.label="WATCH THE EXCHANGE";observe.nextBeatId=TRANSFER_BEAT;observe.contextPatch={...(observe.contextPatch||{}),kakashiOriginalAction:OBSERVE_CHOICE};
  observe.consequenceRequests=Array.isArray(observe.consequenceRequests)?observe.consequenceRequests:[];
  if(!observe.consequenceRequests.some(row=>row&&row.requestId===OBSERVE_REQUEST))observe.consequenceRequests.push({requestId:OBSERVE_REQUEST,kind:"domain",resolve:()=>ensureObserveIntent35700()});
  transfer.environmentRef=SAKURA;transfer.text="";transfer.nextBeatId=MAJOR_BEAT;
  major.mode="choice";major.environmentRef=SAKURA;major.text="";major.presentationResolver=null;major.exitScene=false;major.allowPresentationClose=false;major.nextBeatId=null;
  major.onEnterConsequences=Array.isArray(major.onEnterConsequences)?major.onEnterConsequences.filter(row=>row&&row.requestId!==COMMIT_REQUEST):[];
  major.onEnterConsequences.push({requestId:COMMIT_REQUEST,kind:"domain",resolve:()=>commitScene03A35700()});
  major.choices=CHOICE_SPECS.map(spec=>({choiceId:spec.choiceId,label:spec.label,nextBeatId:MAJOR_BEAT,availability:availableChoice,knownBlocker:null}));
  return{success:true,observeChoiceId:OBSERVE_CHOICE,majorChoiceIds:major.choices.map(row=>row.choiceId)};
}

let presentationHooksInstalled=false;let hookAttempts=0;
function setObjectiveText35700(node,text){
  if(!node||!text)return false;
  const label=node.querySelector&&node.querySelector("b");
  if(!label){
    if(node.textContent===text)return false;
    node.textContent=text;
    return true;
  }
  let current="";
  for(let sibling=label.nextSibling;sibling;sibling=sibling.nextSibling)current+=String(sibling.textContent||"");
  if(current===text)return false;
  while(label.nextSibling)label.nextSibling.remove();
  node.appendChild(document.createTextNode(text));
  return true;
}
function syncObjective35700(){
  if(typeof document==="undefined")return false;const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const node=layer.querySelector&&layer.querySelector(".sc-scene-board-33900__objective");if(!node)return false;
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID){return false;}
  const objective=objectiveForState35700(rt)||INITIAL_OBJECTIVE;setObjectiveText35700(node,objective);
  if(rt.beatId!=="kak_original_rooftop"){node.style.removeProperty("display");return true;}
  const p=typeof globalThis.getStoryScenePerformance33900==="function"?globalThis.getStoryScenePerformance33900():null;
  const reveal=!!p&&Number(p.index)>=8;node.style.setProperty("display",reveal?"":"none",reveal?"":"important");if(reveal)node.style.removeProperty("display");return true;
}
function installPresentationHooks35700(){
  if(presentationHooksInstalled)return true;
  if(typeof globalThis.getStoryScenePerformance33900!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
  const PRE_GET=globalThis.getStoryScenePerformance33900,PRE_ADVANCE=globalThis.advanceStoryScene,PRE_RENDER=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  globalThis.getStoryScenePerformance33900=function getStoryScenePerformance35700(){const rt=active();return isScene03A(rt)?performance(rt):PRE_GET.apply(this,arguments);};
  globalThis.advanceStoryScene=function advanceStoryScene35700(choiceId=null){
    const rt=active();if(!isScene03A(rt)||choiceId!==null&&choiceId!==undefined)return PRE_ADVANCE.apply(this,arguments);
    const p=performance(rt);if(!p.atEnd){const next=p.index+1;rt.localContext={...(rt.localContext||{}),[CUSTOM_CURSOR]:next};syncNativeCursor(rt,next);save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();else if(typeof renderStorySceneBoard33900==="function")renderStorySceneBoard33900();}catch(_error){}return{success:true,type:"kakashi_scene03a_performance_cue_advanced",beatId:TRANSFER_BEAT,cueIndex:next,semanticBeatUnchanged:true};}
    syncNativeCursor(rt,CUES.length-1);save();const result=PRE_ADVANCE.apply(this,arguments);const after=active();if(!after||after.sceneId!==SCENE_ID||after.beatId!==TRANSFER_BEAT){try{if(rt.localContext){delete rt.localContext[CUSTOM_CURSOR];delete rt.localContext[NATIVE_CURSOR];}save();}catch(_error){}}return result;
  };
  try{getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  if(PRE_RENDER){globalThis.renderStoryScenePresentationLayer=function renderStoryScenePresentationLayer35700(){const result=PRE_RENDER.apply(this,arguments);if(typeof queueMicrotask==="function")queueMicrotask(syncObjective35700);else setTimeout(syncObjective35700,0);return result;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}}
  presentationHooksInstalled=true;syncObjective35700();return true;
}
function ensurePresentationHooks35700(){if(installPresentationHooks35700())return;if(typeof setTimeout==="function"&&hookAttempts++<80)setTimeout(ensurePresentationHooks35700,25);}

function diagnostics(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null,action=map&&map.get(OPENING_BEAT),observe=action&&Array.isArray(action.choices)?action.choices.find(row=>row&&row.choiceId===OBSERVE_CHOICE):null,major=map&&map.get(MAJOR_BEAT);
  const exactTexts=["Kakashi stays where he is.","Not passive.","Watching.","ANBU Marked Target shifts the package from beneath his clothing and places it into Package Smuggler's hand.","The moment custody changes, the whole problem changes with it.","Kakashi's eye follows the package.","ANBU Marked Target is already moving away.","Package Smuggler turns in the opposite direction.","Kakashi has one additional fact now—who received the package—and less control over the situation than he had a few seconds earlier.","The trade was information for escalation.","Then the darkness beside the alley moved.","Not slowly.","A figure tore out of it like a lightning streak.","Masked Interceptor hit the new situation at speed, driving straight toward Package Smuggler and forcing him to react before he had properly cleared the exchange.","ANBU Marked Target broke away.","Package Smuggler tightened around the package.","Masked Interceptor cut across his escape line.","And Kakashi, still unseen for one more heartbeat, had to choose what mattered most now."];
  const beforeHandoff={sceneId:SCENE_ID,beatId:TRANSFER_BEAT,localContext:{kakashiOriginalAction:OBSERVE_CHOICE,[CUSTOM_CURSOR]:2}};
  const atHandoff={sceneId:SCENE_ID,beatId:TRANSFER_BEAT,localContext:{kakashiOriginalAction:OBSERVE_CHOICE,[CUSTOM_CURSOR]:3}};
  const afterHandoff={sceneId:SCENE_ID,beatId:MAJOR_BEAT,localContext:{kakashiOriginalAction:OBSERVE_CHOICE}};
  const checks={patchId:PATCH_ID==="alpha_kakashi_scene03a_35700_2026_09_17",authorityPinned:AUTHORITY==="ebc5f9ed1575ac01f72fd24487c3e38f09112117",scene03AEighteenCues:CUES.length===18,scene03AVerbatim:JSON.stringify(CUES.map(row=>row.text))===JSON.stringify(exactTexts),scene03ANarrationOnly:CUES.every(row=>row.kind==="narration"&&!row.speakerName),observeIntentProvenance:!!observe&&Array.isArray(observe.consequenceRequests)&&observe.consequenceRequests.some(row=>row&&row.requestId===OBSERVE_REQUEST),scene03AFiveChoices:!!major&&major.choices.map(row=>row.choiceId).join("|")==="stop_assassin|secure_package|secure_package_before_assassin|defeat_assassin_then_secure|go_after_original_target",scene03AChoiceLabelsExact:!!major&&major.choices.map(row=>row.label).join("|")==="STOP THE ASSASSIN|SECURE THE PACKAGE|SECURE THE PACKAGE BEFORE THE ASSASSIN|DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE|GO AFTER THE ORIGINAL TARGET",scene03AFiveChoicesAvailable:!!major&&major.choices.every(row=>typeof row.availability==="function"&&row.availability().available===true&&row.knownBlocker===null),unauthorisedSuccessorsRemainContained:!!major&&major.choices.every(row=>row.nextBeatId===MAJOR_BEAT&&(!Array.isArray(row.consequenceRequests)||row.consequenceRequests.length===0)),objectiveWordingExact:INITIAL_OBJECTIVE==="Stop the package from falling into the wrong hands."&&POST_HANDOFF_OBJECTIVE==="Retrieve the package.",objectiveChangesAtPackageTransfer:objectiveForState35700(beforeHandoff)===INITIAL_OBJECTIVE&&objectiveForState35700(atHandoff)===POST_HANDOFF_OBJECTIVE&&objectiveForState35700(afterHandoff)===POST_HANDOFF_OBJECTIVE,factualCommitBeforeChoice:!!major&&Array.isArray(major.onEnterConsequences)&&major.onEnterConsequences.some(row=>row&&row.requestId===COMMIT_REQUEST),objectiveDeltaBridged:commitScene03A35700.toString().includes("objectiveDeltaRefs:[occurrenceId]"),noScene03ADialogue:CUES.every(row=>row.kind!=="dialogue"),rooftopObjectiveRevealAfterEnvelopeTaken:syncObjective35700.toString().includes("Number(p.index)>=8"),objectiveTextMutationIdempotent:setObjectiveText35700.toString().includes("if(current===text)return false"),noGlobalMutationObserver:!installPresentationHooks35700.toString().includes("MutationObserver"),presentationHookReadyOrHeadless:typeof document==="undefined"||presentationHooksInstalled,browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);return{pass:failed.length===0,checks,failed,authority:AUTHORITY,choiceIds:CHOICE_SPECS.map(row=>row.choiceId),objectives:Object.freeze({initial:INITIAL_OBJECTIVE,postHandoff:POST_HANDOFF_OBJECTIVE}),browserGoldenClaimed:false};
}

const installed=installSemanticSurface35700();if(!installed||installed.success!==true)throw new Error(`kakashi_scene03a_surface_install_failed:${installed&&installed.reason||"unknown"}`);
ensurePresentationHooks35700();
globalThis.runAcademyKakashiScene03A35700Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SCENE03A_35700=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,installed,cueCount:CUES.length,choiceIds:CHOICE_SPECS.map(row=>row.choiceId),objectives:Object.freeze({initial:INITIAL_OBJECTIVE,postHandoff:POST_HANDOFF_OBJECTIVE}),browserGoldenClaimed:false});
})();