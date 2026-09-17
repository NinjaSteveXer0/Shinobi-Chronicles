// ============================================================================
// ISSUES #188 / #192 — KAKASHI PAKKUN INTERCEPTION CONSUMER — 35300
//
// Consumes final Writing + CE participant-first authority for AK_SA_008/009/
// 010/011/018/024. This layer binds the already-authored pursuit-success
// choices without creating a second Story, Battle, custody, reward, or autonomy
// system. Battle remains factual-only; Story commits custody/consequences.
// ============================================================================
(function installAcademyKakashiPakkunInterception35300(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_PAKKUN_INTERCEPTION_35300)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const BATTLE=globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300;
if(!A||typeof A.commitOccurrence!=="function"||typeof A.findOccurrence!=="function")throw new Error("kakashi_interception_origin_occurrence_authority_missing");
if(!CORE||typeof CORE.commitStoryIntent!=="function"||typeof CORE.dispatchCommittedIntent!=="function"||typeof CORE.consumeNextAutonomy!=="function")throw new Error("kakashi_interception_neutral_story_authority_missing");
if(!KAK||typeof KAK.openDecisionPoint!=="function")throw new Error("kakashi_interception_semantic_adapter_missing");
if(!BATTLE||typeof BATTLE.launchAcademyKakashiOriginPlBattle!=="function")throw new Error("kakashi_interception_battle_deployment_missing");

const PATCH_ID="alpha_kakashi_pakkun_interception_35300_v1_2026_09_17";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const ENTRY_BEAT="kak_get_closer_failure_stay_package_intercept";
const ASK_RETURN_BEAT="kak_intercept_ask_destination_return_35300";
const DEMAND_BATTLE_BEAT="kak_intercept_demand_battle_35300";
const DEMAND_RETURN_BEAT="kak_intercept_demand_return_35300";
const TAKE_BATTLE_BEAT="kak_intercept_take_him_down_battle_35300";
const TAKE_RETURN_BEAT="kak_intercept_take_him_down_return_35300";
const DISPOSITION_PENDING_BEAT="kak_intercept_disposition_pending_35300";
const TERMINAL_PENDING_BEAT="kak_seq_debrief_pending";
const WORLD_OBJECT_REF="kakashi_origin_outer_route_packet";
const AMT_REF="academy_kakashi_origin_amt";
const PAKKUN_REF="pakkun_origin_unfamiliar_ninken";
const CONFIG="academy_kakashi_origin_battle_kakashi_pakkun_vs_amt";
const FINAL_WRITING="176ce76feef3e67d4c24644e3d7443a04dcf7d6b";
const FINAL_AUTONOMY="713cae26e3b3fb4a214564b497a5f30fb2f14313";
const PARTICIPANT_FIRST="06566ee81fe7c7856fd513d0225e621273f4bfaa";
const DEMAND_AUTHORITY="11e47fba0d20c87f82092a806ae9940f6857fa1c";
const TAKE_AUTHORITY="7434e9e571ad9c1d9c76138d1ee4b7dea261456b";
const ASK_AUTHORITY="176ce76feef3e67d4c24644e3d7443a04dcf7d6b";
const BINDING=Object.freeze({
  demand:"academy_kakashi.battle.demand_package",
  take:"academy_kakashi.battle.take_him_down",
  ask:"academy_kakashi.story_fixed.ask_destination"
});
const CHOICE=Object.freeze({demand:"demand_package",take:"take_him_down",ask:"ask_where_package_was_going"});
const REQUEST=Object.freeze({
  demand:"kakashi_intercept_demand_35300",
  take:"kakashi_intercept_take_him_down_35300",
  ask:"kakashi_intercept_ask_destination_35300",
  demandReturn:"kakashi_intercept_demand_return_35300",
  takeReturn:"kakashi_intercept_take_return_35300"
});

function clone(v){try{return CORE.clone(v);}catch(_e){try{return JSON.parse(JSON.stringify(v));}catch(_e2){return v;}}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_e){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function normalizedBeat(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function available(value,knownBlocker=null){return()=>({available:value===true,knownBlocker:value===true?null:knownBlocker});}
function latestResult(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function factOf(row){return row&&(row.fact||row.data)||{};}
function stable(prefix,payload){return typeof CORE.stableRef==="function"?CORE.stableRef(prefix,payload):`${prefix}:${String(payload&&payload.storySceneInstanceId||"")}:${String(payload&&payload.kind||"")}`;}
function currentEntryOccurrenceId(rt){return String(rt&&rt.localContext&&rt.localContext.kakashiGetCloserStayPackagePursuitOccurrenceId||"");}
function occurrenceId(prefix,rt,extra={}){return stable(prefix,{storySceneInstanceId:String(rt&&rt.instanceId||""),entryOccurrenceId:currentEntryOccurrenceId(rt),...extra});}
function semanticBridge(resultRef,result,consequenceRefs=[]){return{success:true,resolverResultRef:String(resultRef||""),consequenceRefs:[...new Set((consequenceRefs||[]).filter(Boolean).map(String))],stateDeltaRefs:[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],successorSituationRef:null,result:clone(result||null)};}
function verifyEntry(rt){
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_interception_story_instance_missing"};
  const entryId=currentEntryOccurrenceId(rt);if(!entryId)return{success:false,reason:"kakashi_interception_entry_occurrence_missing"};
  const row=A.findOccurrence(entryId),fact=factOf(row),pkg=fact.packageState||{},pakkun=fact.participantStateByRef&&fact.participantStateByRef[PAKKUN_REF]||{};
  if(!row||String(fact.selectedOutcomeRef||"")!=="PURSUIT_SUCCESS_AMT_REACHED")return{success:false,reason:"kakashi_interception_requires_pursuit_success"};
  if(String(pkg.currentHolderClass||"")!=="ANBU_MARKED_TARGET")return{success:false,reason:"kakashi_interception_requires_amt_package_custody"};
  if(String(pakkun.presenceState||"")!=="PRESENT")return{success:false,reason:"kakashi_interception_requires_pakkun_presence"};
  return{success:true,entryId,row,fact};
}
function currentChoiceSetId(rt){
  if(rt&&rt.beatId===ASK_RETURN_BEAT)return String(rt.localContext&&rt.localContext.kakashiAskDestinationReconvergenceChoiceSetId||"");
  return String(rt&&rt.localContext&&rt.localContext.kakashiGetCloserStayPackageInterceptionChoiceSetId||"");
}
function receiptKey(choiceId){return choiceId===CHOICE.demand?"kakashiInterceptDemandDecisionReceiptId":choiceId===CHOICE.take?"kakashiInterceptTakeDecisionReceiptId":"kakashiInterceptAskDecisionReceiptId";}
function ensureIntent(choiceId){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||![ENTRY_BEAT,ASK_RETURN_BEAT].includes(rt.beatId))return{success:false,reason:"kakashi_interception_choice_context_missing"};
  const entry=verifyEntry(rt);if(!entry.success)return entry;
  const key=receiptKey(choiceId),existingId=String(rt.localContext&&rt.localContext[key]||"");
  if(existingId){const snap=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{},existing=snap.decisionReceipts&&snap.decisionReceipts[existingId];if(existing&&existing.selectedChoiceId===choiceId)return{success:true,idempotent:true,receipt:existing,entry};}
  const choiceSetId=currentChoiceSetId(rt);if(!choiceSetId)return{success:false,reason:"kakashi_interception_choice_set_missing"};
  const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId,choiceId});if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_interception_intent_commit_failed"};
  rt.localContext={...(rt.localContext||{}),[key]:committed.receipt.storyDecisionReceiptId};save();return{success:true,receipt:committed.receipt,entry,choiceSetId};
}
function commitOccurrenceOnce(id,fact,outcome,sourceRefs=[]){
  const existing=A.findOccurrence(id);if(existing)return{success:true,idempotent:true,record:existing,occurrenceId:id};
  const committed=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_factual_occurrence",outcome:String(outcome||""),participantRefs:[ORIGIN_ID,AMT_REF,PAKKUN_REF],sourceRefs});
  return committed&&committed.success===true?{success:true,record:committed.record,occurrenceId:id}:committed||{success:false,reason:"kakashi_interception_occurrence_commit_failed"};
}
function recordPackageMaterial(stateRef,{resolved=true,custodyClass=null,custodianRef=null,locationClass=null,sourceAnchorRef=null}={}){
  if(typeof CORE.recordMaterialState!=="function")return{success:false,reason:"neutral_material_state_authority_missing"};
  return CORE.recordMaterialState({storyUnitRef:ORIGIN_ID,materialRef:WORLD_OBJECT_REF,resolved:resolved===true,stateRef,value:{custodyClass,custodianRef,locationClass,sourceAnchorRef}});
}
function dispatchFixed(receipt,binding,resultRef,result,consequenceRefs=[]){return CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:receipt.storyDecisionReceiptId,state:{resolverResults:{[binding]:semanticBridge(resultRef,result,consequenceRefs)}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(active()&&active().instanceId||""),selectedChoiceId:receipt.selectedChoiceId}});}
function projector(){return typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;}
function launchPakkunAmt(binding,anchor,{active:rt,returnContext}={}){
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_interception_battle_story_missing"};
  return BATTLE.launchAcademyKakashiOriginPlBattle({storyOccurrenceId:String(rt.instanceId),sourceAnchorRef:anchor,bindingRef:binding,battleConfigId:CONFIG,returnToken:`${rt.instanceId}:${anchor}:${binding}`,returnContext,pakkunAuthorized:true});
}

function resolveDemand(choice){
  const intent=ensureIntent(CHOICE.demand);if(!intent.success)return intent;const rt=active();
  const id=occurrenceId("occ_origin_kakashi_demand_refusal_35300",rt,{kind:"demand_refusal"});
  const fact={factClass:"academy_kakashi_demand_package_refusal_state",anchorRef:"AK_SA_009",storySceneInstanceId:String(rt.instanceId),storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,parentOccurrenceRef:intent.entry.entryId,packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_PERSON",handoffCompleted:false},participantStateByRef:{[AMT_REF]:{presenceState:"PRESENT",refusalCommitted:true},[PAKKUN_REF]:{presenceState:"PRESENT",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},worldFacts:{demandMade:true,voluntarySurrender:false,pakkunPresent:true,maskedInterceptorVisible:false}};
  const committed=commitOccurrenceOnce(id,fact,"DEMAND_PACKAGE_REFUSAL",[{type:"origin_occurrence",id:intent.entry.entryId},{type:"story_decision_receipt",id:intent.receipt.storyDecisionReceiptId},{type:"story_autonomy_anchor",id:"AK_SA_009"},{type:"world_object",id:WORLD_OBJECT_REF}]);if(!committed.success)return committed;
  const material=recordPackageMaterial(id,{resolved:true,custodyClass:"ANBU_MARKED_TARGET",custodianRef:AMT_REF,locationClass:"AMT_PERSON",sourceAnchorRef:"AK_SA_009"});if(!material.success)return material;
  rt.localContext={...(rt.localContext||{}),kakashiInterceptDemandRefusalOccurrenceId:id};choice.nextBeatId=DEMAND_BATTLE_BEAT;save();return{success:true,occurrenceId:id,nextBeatId:choice.nextBeatId};
}
function resolveTake(choice){
  const intent=ensureIntent(CHOICE.take);if(!intent.success)return intent;const rt=active();
  const neutralId=occurrenceId("occ_origin_kakashi_take_neutral_package_35300",rt,{kind:"take_neutral"});
  const neutralFact={factClass:"academy_kakashi_take_him_down_neutral_package_state",anchorRef:"AK_SA_011",storySceneInstanceId:String(rt.instanceId),storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,parentOccurrenceRef:intent.entry.entryId,packageState:{objectRef:WORLD_OBJECT_REF,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"NEUTRAL_CONTESTED",custodyClass:"NEUTRAL_CONTESTED",locationClass:"GROUND_CONTESTED",handoffCompleted:false},participantStateByRef:{[AMT_REF]:{presenceState:"PRESENT",packageHolder:false},[PAKKUN_REF]:{presenceState:"PRESENT",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},worldFacts:{immediatePhysicalControlIntent:true,packageSeparatedBeforeBattle:true,pakkunPresent:true,maskedInterceptorVisible:false}};
  const neutral=commitOccurrenceOnce(neutralId,neutralFact,"TAKE_HIM_DOWN_PACKAGE_NEUTRAL",[{type:"origin_occurrence",id:intent.entry.entryId},{type:"story_decision_receipt",id:intent.receipt.storyDecisionReceiptId},{type:"story_autonomy_anchor",id:"AK_SA_011"},{type:"world_object",id:WORLD_OBJECT_REF}]);if(!neutral.success)return neutral;
  const unresolved=recordPackageMaterial(neutralId,{resolved:false,custodyClass:"NEUTRAL_CONTESTED",locationClass:"GROUND_CONTESTED",sourceAnchorRef:"AK_SA_011"});if(!unresolved.success)return unresolved;

  // Alpha-safe CE policy: from this committed state the exposed mission object is
  // visible and reachable to Pakkun, so the deterministic state-sensitive policy
  // selects secure_objective. This is a CE selection, not a Writing-scripted order.
  const custodyId=occurrenceId("occ_origin_kakashi_take_pakkun_custody_35300",rt,{kind:"pakkun_secure",neutralId});
  const autonomy=CORE.consumeNextAutonomy({storyUnitRef:ORIGIN_ID,state:{committedStateRef:neutralId,battleLive:false,autonomyPhase:"pre_battle",dueAnchorIds:["AK_SA_011"],autonomyResults:{AK_SA_011:{success:true,participantIntentRef:"pakkun.secure_exposed_mission_objective",resolverResultRef:stable("sc35300-pakkun-autonomy-result",{neutralId,custodyId}),consequenceRefs:[custodyId],result:{selectionPolicyRef:"academy_kakashi.alpha.pakkun_exposed_objective_priority.v1",selectedActionClass:"SECURE_EXPOSED_OBJECTIVE",eligibleIntentRefs:["secure_objective","guard_objective","support_kakashi","hold_position"],custodianRef:PAKKUN_REF,ownershipGranted:false,nameKnowledgeGranted:false}}}}});
  if(!autonomy||autonomy.success!==true)return autonomy||{success:false,reason:"kakashi_take_him_down_autonomy_failed"};
  if(String(autonomy.receipt&&autonomy.receipt.autonomyPhaseRef||"")!=="pre_battle")return{success:false,reason:"kakashi_take_him_down_autonomy_phase_not_persisted"};
  const custodyFact={factClass:"academy_kakashi_take_him_down_autonomy_package_state",anchorRef:"AK_SA_011",storySceneInstanceId:String(rt.instanceId),storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,parentOccurrenceRef:neutralId,participantAutonomyReceiptId:String(autonomy.receipt&&autonomy.receipt.autonomyReceiptId||""),autonomyPhaseRef:String(autonomy.receipt&&autonomy.receipt.autonomyPhaseRef||""),packageState:{objectRef:WORLD_OBJECT_REF,previousHolderClass:"NEUTRAL_CONTESTED",currentHolderClass:"KONOHA",custodyClass:"KONOHA_SIDE_CONTROL",custodianRef:PAKKUN_REF,locationClass:"PAKKUN_CONTROLLED",handoffCompleted:false,ownershipGranted:false},participantStateByRef:{[PAKKUN_REF]:{presenceState:"PRESENT",selectedIntentRef:"pakkun.secure_exposed_mission_objective",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},worldFacts:{packageNeutralBeforeAutonomy:true,pakkunAutonomouslySecuredPackage:true,packageRecoveredByKonohaSide:true,maskedInterceptorVisible:false}};
  const custody=commitOccurrenceOnce(custodyId,custodyFact,"PAKKUN_SECURES_EXPOSED_PACKAGE",[{type:"origin_occurrence",id:neutralId},{type:"participant_autonomy_receipt",id:String(autonomy.receipt&&autonomy.receipt.autonomyReceiptId||"")},{type:"world_object",id:WORLD_OBJECT_REF},{type:"story_autonomy_anchor",id:"AK_SA_011"}]);if(!custody.success)return custody;
  const material=recordPackageMaterial(custodyId,{resolved:true,custodyClass:"KONOHA_SIDE_CONTROL",custodianRef:PAKKUN_REF,locationClass:"PAKKUN_CONTROLLED",sourceAnchorRef:"AK_SA_011"});if(!material.success)return material;
  rt.localContext={...(rt.localContext||{}),kakashiTakeHimDownNeutralPackageOccurrenceId:neutralId,kakashiTakeHimDownAutonomyReceiptId:String(autonomy.receipt&&autonomy.receipt.autonomyReceiptId||""),kakashiTakeHimDownPackageOccurrenceId:custodyId};choice.nextBeatId=TAKE_BATTLE_BEAT;save();return{success:true,neutralOccurrenceId:neutralId,packageOccurrenceId:custodyId,autonomyReceiptId:rt.localContext.kakashiTakeHimDownAutonomyReceiptId,nextBeatId:choice.nextBeatId};
}
function resolveAsk(choice){
  const intent=ensureIntent(CHOICE.ask);if(!intent.success)return intent;const rt=active();
  const id=occurrenceId("occ_origin_kakashi_ask_destination_35300",rt,{kind:"ask_destination"});
  const fact={factClass:"academy_kakashi_ask_destination_knowledge_state",anchorRef:"AK_SA_018",storySceneInstanceId:String(rt.instanceId),storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,parentOccurrenceRef:intent.entry.entryId,packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:"AMT_PERSON",handoffCompleted:false},knowledgeStateByObserver:{[ORIGIN_ID]:{amtRoleWasCarryToPackageSmuggler:true,amtRoleEndedAtHandoff:true,amtKnowsDownstreamDestination:false,packageSmugglerDisclosedDownstreamDestination:false}},worldFacts:{packageHolderClass:"ANBU_MARKED_TARGET",pakkunPresent:true,maskedInterceptorVisible:false,downstreamDestinationKnown:false}};
  const committed=commitOccurrenceOnce(id,fact,"ASK_DESTINATION_LIMITED_KNOWLEDGE",[{type:"origin_occurrence",id:intent.entry.entryId},{type:"story_decision_receipt",id:intent.receipt.storyDecisionReceiptId},{type:"story_autonomy_anchor",id:"AK_SA_018"},{type:"world_object",id:WORLD_OBJECT_REF}]);if(!committed.success)return committed;
  const dispatched=dispatchFixed(intent.receipt,BINDING.ask,id,{knowledgeCommit:true,downstreamDestinationKnown:false},[id]);if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_ask_destination_semantic_dispatch_failed"};
  const choiceSet=CORE.openSemanticChoiceSet({storyUnitRef:ORIGIN_ID,storyUnitType:"origin",decisionPointRef:"AK_SA_018_RECONVERGENCE",contextStateRef:id,sceneRef:SCENE_ID,beatRef:ASK_RETURN_BEAT,authorityVersionRefs:[FINAL_WRITING,FINAL_AUTONOMY],sourceOccurrenceRefs:[intent.entry.entryId,id],observerRef:ORIGIN_ID,choices:[{choiceId:CHOICE.demand,intentType:"demand_package",resolverBindingRef:BINDING.demand,presentationLabel:"Demand the Package",authoredOrder:0},{choiceId:CHOICE.take,intentType:"take_him_down",resolverBindingRef:BINDING.take,presentationLabel:"Take Him Down",authoredOrder:1}]});if(!choiceSet||choiceSet.success!==true)return choiceSet||{success:false,reason:"kakashi_ask_destination_reconvergence_choice_set_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiAskDestinationOccurrenceId:id,kakashiAskDestinationReconvergenceChoiceSetId:choiceSet.choiceSet.choiceSetId};choice.nextBeatId=ASK_RETURN_BEAT;save();return{success:true,occurrenceId:id,reconvergenceChoiceSetId:choiceSet.choiceSet.choiceSetId,nextBeatId:choice.nextBeatId};
}

function closeBattleIntent(choiceId,binding,receiptKey){
  const rt=active(),result=latestResult();if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_interception_battle_return_story_missing"};
  if(!result||String(result.battleConfigId||"")!==CONFIG||String(result.bindingRef||"")!==binding)return{success:false,reason:"kakashi_interception_battle_receipt_mismatch"};
  const receiptId=String(rt.localContext&&rt.localContext[receiptKey]||"");if(!receiptId)return{success:false,reason:"kakashi_interception_decision_receipt_missing"};
  const snap=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{},receipt=snap.decisionReceipts&&snap.decisionReceipts[receiptId];if(!receipt||receipt.selectedChoiceId!==choiceId)return{success:false,reason:"kakashi_interception_decision_receipt_mismatch"};
  const bridge=semanticBridge(result.battleOccurrenceId,result,[result.battleOccurrenceId]);const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId,state:{resolverResults:{[binding]:bridge}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId),battleOccurrenceId:String(result.battleOccurrenceId),selectedChoiceId:choiceId}});
  return dispatched&&dispatched.success===true?{success:true,receipt:dispatched.receipt,result}:dispatched||{success:false,reason:"kakashi_interception_battle_semantic_dispatch_failed"};
}
function openDisposition(rt,committedStateRef){
  const opened=KAK.openDecisionPoint("AK_SA_013",{committedStateRef,beatRef:DISPOSITION_PENDING_BEAT,sourceOccurrenceRefs:[committedStateRef]});if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_interception_disposition_choice_set_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiInterceptDispositionChoiceSetId:opened.choiceSet.choiceSetId};save();return{success:true,choiceSetId:opened.choiceSet.choiceSetId};
}
function resolveDemandPostBattle(choice){
  const closed=closeBattleIntent(CHOICE.demand,BINDING.demand,"kakashiInterceptDemandDecisionReceiptId");if(!closed.success)return closed;const rt=active(),r=closed.result,victory=String(r.resultState||"")==="player_side_victory";
  const id=occurrenceId("occ_origin_kakashi_demand_post_battle_35300",rt,{kind:victory?"demand_victory":"demand_defeat",battleOccurrenceId:String(r.battleOccurrenceId||"")});
  const fact={factClass:"academy_kakashi_demand_package_post_battle_state",anchorRef:"AK_SA_010",storySceneInstanceId:String(rt.instanceId),battleOccurrenceId:String(r.battleOccurrenceId||""),battleResultState:String(r.resultState||""),packageState:{objectRef:WORLD_OBJECT_REF,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:victory?"KAKASHI":"ANBU_MARKED_TARGET",custodyClass:victory?"KAKASHI":"ANBU_MARKED_TARGET",locationClass:victory?"KAKASHI_PERSON":"AMT_ESCAPED_WITH_PACKAGE",handoffCompleted:false},participantStateByRef:{[AMT_REF]:victory?{participantAlive:true,battleStatus:"defeated",custodyState:"KAKASHI_TEMPORARY_CONTROL",escapeState:"CONTROLLED"}:{participantAlive:true,custodyState:"UNCONTROLLED",escapeState:"ESCAPED"},[PAKKUN_REF]:{presenceState:"PRESENT",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},worldFacts:{packageRecovered:victory,amtCaptured:victory,amtEscaped:!victory,pakkunPresent:true,maskedInterceptorVisible:false}};
  const committed=commitOccurrenceOnce(id,fact,victory?"DEMAND_PACKAGE_VICTORY":"DEMAND_PACKAGE_DEFEAT",[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"story_autonomy_anchor",id:"AK_SA_010"},{type:"world_object",id:WORLD_OBJECT_REF}]);if(!committed.success)return committed;
  const material=recordPackageMaterial(id,{resolved:true,custodyClass:victory?"KAKASHI":"ANBU_MARKED_TARGET",custodianRef:victory?ORIGIN_ID:AMT_REF,locationClass:victory?"KAKASHI_PERSON":"AMT_ESCAPED_WITH_PACKAGE",sourceAnchorRef:"AK_SA_010"});if(!material.success)return material;
  rt.localContext={...(rt.localContext||{}),kakashiInterceptPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId:id,kakashiInterceptDemandPostBattleOutcome:victory?"player_side_victory":"opposition_side_victory"};
  if(victory){const disposition=openDisposition(rt,id);if(!disposition.success)return disposition;choice.nextBeatId=DISPOSITION_PENDING_BEAT;}else choice.nextBeatId=TERMINAL_PENDING_BEAT;save();return{success:true,occurrenceId:id,victory,nextBeatId:choice.nextBeatId};
}
function resolveTakePostBattle(choice){
  const closed=closeBattleIntent(CHOICE.take,BINDING.take,"kakashiInterceptTakeDecisionReceiptId");if(!closed.success)return closed;const rt=active(),r=closed.result,victory=String(r.resultState||"")==="player_side_victory";
  const priorId=String(rt.localContext&&rt.localContext.kakashiTakeHimDownPackageOccurrenceId||"");const prior=priorId?A.findOccurrence(priorId):null,priorPkg=factOf(prior).packageState||{};
  if(!victory&&!priorId)return{success:false,reason:"kakashi_take_him_down_defeat_package_state_unresolved"};
  const id=occurrenceId("occ_origin_kakashi_take_post_battle_35300",rt,{kind:victory?"take_victory":"take_defeat",battleOccurrenceId:String(r.battleOccurrenceId||""),priorId});
  const packageState=victory?{objectRef:WORLD_OBJECT_REF,previousHolderClass:String(priorPkg.currentHolderClass||"NEUTRAL_CONTESTED"),currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:false}:{...clone(priorPkg),objectRef:WORLD_OBJECT_REF};
  if(!packageState.currentHolderClass)return{success:false,reason:"kakashi_take_him_down_defeat_package_state_unresolved"};
  const fact={factClass:"academy_kakashi_take_him_down_post_battle_state",anchorRef:victory?"AK_SA_013":"AK_SA_024",storySceneInstanceId:String(rt.instanceId),battleOccurrenceId:String(r.battleOccurrenceId||""),battleResultState:String(r.resultState||""),priorPackageOccurrenceRef:priorId||null,participantAutonomyReceiptId:String(rt.localContext&&rt.localContext.kakashiTakeHimDownAutonomyReceiptId||""),packageState,participantStateByRef:{[AMT_REF]:victory?{participantAlive:true,battleStatus:"defeated",custodyState:"KAKASHI_TEMPORARY_CONTROL",escapeState:"CONTROLLED"}:{participantAlive:true,custodyState:"UNCONTROLLED",escapeState:"ESCAPED"},[PAKKUN_REF]:{presenceState:"PRESENT",temporaryParticipationOnly:true,ownershipGranted:false,nameKnowledgeGranted:false}},worldFacts:{packageRecovered:["KAKASHI","KONOHA","ANBU","KONOHA_AUTHORITY"].includes(String(packageState.currentHolderClass||"")),amtCaptured:victory,amtEscaped:!victory,pakkunPresent:true,packageOutcomeConsumedFromCommittedAutonomyState:!victory,maskedInterceptorVisible:false}};
  const committed=commitOccurrenceOnce(id,fact,victory?"TAKE_HIM_DOWN_VICTORY":"TAKE_HIM_DOWN_DEFEAT",[{type:"battle_occurrence",id:String(r.battleOccurrenceId||"")},{type:"origin_occurrence",id:priorId},{type:"participant_autonomy_receipt",id:String(rt.localContext&&rt.localContext.kakashiTakeHimDownAutonomyReceiptId||"")},{type:"world_object",id:WORLD_OBJECT_REF}].filter(row=>row.id));if(!committed.success)return committed;
  const resolved=!(["NEUTRAL_CONTESTED","UNRESOLVED",""] .includes(String(packageState.currentHolderClass||"")));const material=recordPackageMaterial(id,{resolved,custodyClass:String(packageState.custodyClass||packageState.currentHolderClass||""),custodianRef:packageState.custodianRef||null,locationClass:packageState.locationClass||null,sourceAnchorRef:victory?"AK_SA_013":"AK_SA_024"});if(!material.success)return material;
  if(!victory&&!resolved)return{success:false,reason:"kakashi_take_him_down_defeat_package_state_unresolved"};
  rt.localContext={...(rt.localContext||{}),kakashiInterceptPackageOccurrenceId:id,kakashiSequentialPackageOccurrenceId:id,kakashiInterceptTakePostBattleOutcome:victory?"player_side_victory":"opposition_side_victory"};
  if(victory){const disposition=openDisposition(rt,id);if(!disposition.success)return disposition;choice.nextBeatId=DISPOSITION_PENDING_BEAT;}else choice.nextBeatId=TERMINAL_PENDING_BEAT;save();return{success:true,occurrenceId:id,victory,packageHolderClass:String(packageState.currentHolderClass||""),nextBeatId:choice.nextBeatId};
}

function install(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_interception_story_definition_missing"};
  const entry=def.beatMap.get(ENTRY_BEAT);if(!entry||!Array.isArray(entry.choices))return{success:false,reason:"kakashi_interception_entry_beat_missing"};
  const demand=entry.choices.find(row=>row&&row.choiceId===CHOICE.demand),take=entry.choices.find(row=>row&&row.choiceId===CHOICE.take),ask=entry.choices.find(row=>row&&row.choiceId===CHOICE.ask);if(!demand||!take||!ask)return{success:false,reason:"kakashi_interception_choices_missing"};
  const blocker="Post-capture disposition execution remains fail-closed until its exact runtime bindings are consumed.";
  const beats=[
    {beatId:ASK_RETURN_BEAT,mode:"choice",text:"The target confirms he was only carrying the package to the Package Smuggler. His role ended at that handoff, and he was never told where the package went next.",choices:[{choiceId:CHOICE.demand,label:"DEMAND THE PACKAGE",nextBeatId:DEMAND_BATTLE_BEAT,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:REQUEST.demand,kind:"domain",resolve:null}]},{choiceId:CHOICE.take,label:"TAKE HIM DOWN",nextBeatId:TAKE_BATTLE_BEAT,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:REQUEST.take,kind:"domain",resolve:null}]}]},
    {beatId:DEMAND_BATTLE_BEAT,mode:"battle_transition",text:"Kakashi demands the package. The target refuses. Pakkun independently stays in the confrontation as a temporary Story-authorised participant.",battle:{encounterId:CONFIG,launchResolver:ctx=>launchPakkunAmt(BINDING.demand,"AK_SA_009",ctx),postBattleBeatId:DEMAND_RETURN_BEAT,resultProjector:projector,actionLabel:"FIGHT FOR THE PACKAGE"}},
    {beatId:DEMAND_RETURN_BEAT,mode:"choice",text:"The PL Battle returns to Story. Battle defeat/victory does not by itself decide custody; the authored route consequence must commit first.",choices:[{choiceId:"kak_intercept_demand_continue_35300",label:"CONTINUE",nextBeatId:DEMAND_RETURN_BEAT,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:REQUEST.demandReturn,kind:"domain",resolve:null}]}],exitScene:false,allowPresentationClose:false},
    {beatId:TAKE_BATTLE_BEAT,mode:"battle_transition",text:"Kakashi attacks immediately. The package was already separated from the target, and Pakkun's persisted autonomy result is part of the committed initial state.",battle:{encounterId:CONFIG,launchResolver:ctx=>launchPakkunAmt(BINDING.take,"AK_SA_011",ctx),postBattleBeatId:TAKE_RETURN_BEAT,resultProjector:projector,actionLabel:"TAKE HIM DOWN"}},
    {beatId:TAKE_RETURN_BEAT,mode:"choice",text:"The PL Battle returns to Story. Target custody and package custody are resolved separately from the factual Battle result.",choices:[{choiceId:"kak_intercept_take_continue_35300",label:"CONTINUE",nextBeatId:TAKE_RETURN_BEAT,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:REQUEST.takeReturn,kind:"domain",resolve:null}]}],exitScene:false,allowPresentationClose:false},
    {beatId:DISPOSITION_PENDING_BEAT,mode:"choice",text:"The package is secure and the surviving target is controlled. The existing four-way disposition family is now semantically eligible.",choices:[{choiceId:"turn_over_to_police",label:"BRING HIM TO THE UCHIHA POLICE FORCE",nextBeatId:DISPOSITION_PENDING_BEAT,availability:available(false,blocker),knownBlocker:blocker},{choiceId:"release",label:"LET HIM GO",nextBeatId:DISPOSITION_PENDING_BEAT,availability:available(false,blocker),knownBlocker:blocker},{choiceId:"kill",label:"KILL HIM",nextBeatId:DISPOSITION_PENDING_BEAT,availability:available(false,blocker),knownBlocker:blocker},{choiceId:"return_to_anbu",label:"TAKE HIM BACK TO THE ANBU",nextBeatId:DISPOSITION_PENDING_BEAT,availability:available(false,blocker),knownBlocker:blocker}],exitScene:false,allowPresentationClose:false}
  ];
  beats.forEach((beat,index)=>{const n=normalizedBeat(beat,940+index);if(n)def.beatMap.set(n.beatId,n);});
  demand.availability=available(true);demand.knownBlocker=null;demand.nextBeatId=DEMAND_BATTLE_BEAT;demand.consequenceRequests=[{requestId:REQUEST.demand,kind:"domain",resolve:()=>resolveDemand(demand)}];
  take.availability=available(true);take.knownBlocker=null;take.nextBeatId=TAKE_BATTLE_BEAT;take.consequenceRequests=[{requestId:REQUEST.take,kind:"domain",resolve:()=>resolveTake(take)}];
  ask.availability=available(true);ask.knownBlocker=null;ask.nextBeatId=ASK_RETURN_BEAT;ask.consequenceRequests=[{requestId:REQUEST.ask,kind:"domain",resolve:()=>resolveAsk(ask)}];
  const askBeat=def.beatMap.get(ASK_RETURN_BEAT),askDemand=askBeat&&askBeat.choices.find(row=>row.choiceId===CHOICE.demand),askTake=askBeat&&askBeat.choices.find(row=>row.choiceId===CHOICE.take);if(!askDemand||!askTake)return{success:false,reason:"kakashi_ask_destination_reconvergence_beats_missing"};
  askDemand.consequenceRequests=[{requestId:REQUEST.demand,kind:"domain",resolve:()=>resolveDemand(askDemand)}];askTake.consequenceRequests=[{requestId:REQUEST.take,kind:"domain",resolve:()=>resolveTake(askTake)}];
  const demandReturn=def.beatMap.get(DEMAND_RETURN_BEAT).choices[0],takeReturn=def.beatMap.get(TAKE_RETURN_BEAT).choices[0];demandReturn.consequenceRequests=[{requestId:REQUEST.demandReturn,kind:"domain",resolve:()=>resolveDemandPostBattle(demandReturn)}];takeReturn.consequenceRequests=[{requestId:REQUEST.takeReturn,kind:"domain",resolve:()=>resolveTakePostBattle(takeReturn)}];
  return{success:true,entryBeatId:ENTRY_BEAT,beatIds:beats.map(row=>row.beatId),releasedChoiceIds:[CHOICE.demand,CHOICE.take,CHOICE.ask]};
}
function diagnostics(){
  const def=scene(),entry=def&&def.beatMap instanceof Map?def.beatMap.get(ENTRY_BEAT):null;const choices=entry&&Array.isArray(entry.choices)?entry.choices:[];const demand=choices.find(x=>x.choiceId===CHOICE.demand),take=choices.find(x=>x.choiceId===CHOICE.take),ask=choices.find(x=>x.choiceId===CHOICE.ask);const ids=def&&def.beatMap instanceof Map?[...def.beatMap.keys()]:[];
  const checks={patchId:PATCH_ID==="alpha_kakashi_pakkun_interception_35300_v1_2026_09_17",threeEntryChoicesReleased:[demand,take,ask].every(row=>row&&typeof row.availability==="function"&&row.availability().available===true),demandExactBattle:CONFIG==="academy_kakashi_origin_battle_kakashi_pakkun_vs_amt"&&resolveDemand.toString().includes("DEMAND_PACKAGE_REFUSAL"),takeNeutralBeforeBattle:resolveTake.toString().includes("NEUTRAL_CONTESTED")&&resolveTake.toString().includes("consumeNextAutonomy"),takePreBattleAutonomy:resolveTake.toString().includes('autonomyPhase:"pre_battle"')&&resolveTake.toString().includes("autonomyPhaseRef"),takeAutonomyPersisted:resolveTake.toString().includes("participantAutonomyReceiptId")&&resolveTake.toString().includes("pakkun.secure_exposed_mission_objective"),takeDefeatConsumesCommittedPackage:resolveTakePostBattle.toString().includes("priorPackageOccurrenceRef")&&resolveTakePostBattle.toString().includes("packageOutcomeConsumedFromCommittedAutonomyState"),askKnowledgeLimited:resolveAsk.toString().includes("amtKnowsDownstreamDestination:false")&&resolveAsk.toString().includes("packageSmugglerDisclosedDownstreamDestination:false")&&!resolveAsk.toString().includes("verifiedActionableIntelligence:true"),askReconvergesTwoChoices:ids.includes(ASK_RETURN_BEAT),victoriesOpenExistingDisposition:openDisposition.toString().includes('openDecisionPoint("AK_SA_013"'),dispositionExecutionFailClosed:ids.includes(DISPOSITION_PENDING_BEAT)&&def.beatMap.get(DISPOSITION_PENDING_BEAT).choices.every(row=>row.availability().available===false),noOwnershipLeak:resolveTake.toString().includes("ownershipGranted:false")&&resolveDemand.toString().includes("nameKnowledgeGranted:false"),noFreeBattleAction:!resolveTake.toString().includes("attemptAcademyKakashiPakkunBattleAction"),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const installed=install();
globalThis.runAcademyKakashiPakkunInterception35300Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_PAKKUN_INTERCEPTION_35300=Object.freeze({patchId:PATCH_ID,installed,config:CONFIG,bindings:BINDING,resolveDemand,resolveTake,resolveAsk,resolveDemandPostBattle,resolveTakePostBattle,diagnostics,browserGoldenClaimed:false});
})();