// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI DIRECT OPENING CONSUMER — 34710 v2
//
// Owns only the Scene 02 direct Attack / direct Pickpocket consumption seam.
// Direct Attack remains resolver-driven and fail-closed after its factual
// return until the resolver supplies the position/resistance/Battle state that
// final AK_SA_003 authority requires. Direct Pickpocket has complete final
// authority here: clean success -> debrief; detected failure -> exact 3-v-1 ->
// factual package/participant return -> debrief. No route may fall through the
// obsolete kak_original_transfer beat and no Pakkun state is created here.
// ============================================================================
(function installAcademyKakashiDirectOpeningConsumer34710(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_DIRECT_OPENING_34710)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const GUARD=globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
if(!A||typeof A.commitOccurrence!=="function"||typeof A.findOccurrence!=="function")throw new Error("kakashi_direct_opening_origin_ledger_missing");
if(!CORE||!KAK||!GUARD||!PROVIDER)throw new Error("kakashi_direct_opening_dependency_missing");

const PATCH_ID="alpha_kakashi_direct_opening_consumer_34710_v2_2026_09_17";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const ACTION_BEAT="kak_original_action";
const DEBRIEF_PENDING="kak_seq_debrief_pending";
const WORLD_OBJECT_REF="kakashi_origin_outer_route_packet";
const AMT="academy_kakashi_origin_amt";
const PS="academy_kakashi_origin_package_smuggler";
const MI="academy_kakashi_origin_masked_interceptor";
const ATTACK_CHOICE="attack";
const PICKPOCKET_CHOICE="attempt_pickpocket";
const ATTACK_BINDING="academy_kakashi.resolver.attack";
const PICKPOCKET_BINDING="academy_kakashi.resolver.pickpocket_direct";
const ATTACK_REQUEST="kakashi_direct_attack_factual_commit_34710";
const PICKPOCKET_REQUEST="kakashi_direct_pickpocket_factual_commit_34710";
const PICKPOCKET_BATTLE_RETURN_REQUEST="kakashi_direct_pickpocket_3v1_return_34710";
const ATTACK_BOUNDARY="kak_scene03c_attack_authoring_boundary_34710";
const PICKPOCKET_BATTLE="kak_scene03d_pickpocket_failure_3v1_battle_34710";
const PICKPOCKET_BATTLE_RETURN="kak_scene03d_pickpocket_failure_3v1_return_34710";
const PICKPOCKET_3V1_CONFIG="academy_kakashi_origin_battle_amt_ps_mi_3v1";
const FINAL_WRITING="176ce76feef3e67d4c24644e3d7443a04dcf7d6b";
const DECISION_MATRIX="0e0f99e688701ce9985ac715aa2041b1e2b49070";
const FACTUAL_PROVIDER_AUTHORITY="f2291162085cb3a35fc2a8e49df7ed905c214c85";
const SAKURA={assetId:"kakashi_origin_sakura_tree_night"};
const registrations=[];

function clone(value){return CORE.clone(value);}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function normalizedBeat(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function latestResult(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function entryStateRef(rt){return PROVIDER.stableRef("sc34120-kakashi-get-closer-entry",{sceneId:SCENE_ID,storySceneInstanceId:String(rt&&rt.instanceId||""),beatId:ACTION_BEAT});}
function occurrenceRef(rt,decisionReceipt,bindingRef){return PROVIDER.stableRef("occ_origin_kakashi_direct_opening",{storySceneInstanceId:String(rt&&rt.instanceId||""),storyDecisionReceiptId:String(decisionReceipt&&decisionReceipt.storyDecisionReceiptId||""),bindingRef:String(bindingRef||"")});}
function existingDecisionReceipt(contextStateRef,choiceId,bindingRef){const snap=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};return Object.values(snap.decisionReceipts||{}).find(row=>row&&row.storyDecisionContextId===contextStateRef&&row.selectedChoiceId===choiceId&&row.resolverBindingRef===bindingRef)||null;}
function bridgeResult(factual){const receipt=factual&&factual.receipt||{};return{success:true,resolverResultRef:receipt.storyFactualResolverReceiptId||null,consequenceRefs:receipt.consequenceRefs||[],stateDeltaRefs:receipt.stateDeltaRefs||[],knowledgeDeltaRefs:receipt.knowledgeDeltaRefs||[],relationshipHistoryRefs:receipt.relationshipHistoryRefs||[],objectiveDeltaRefs:receipt.objectiveDeltaRefs||[],successorSituationRef:receipt.successorSituationRef||null,result:clone(factual&&factual.result||receipt.result||null)};}
function outcome(outcomeRef,result,successorSituationRef=null){return Object.freeze({outcomeRef,resultPayloadTemplate:Object.freeze({...result}),successorSituationRef});}

const ATTACK_OUTCOMES=Object.freeze([
  outcome("ATTACK_RETURN_PACKAGE_KAKASHI",{outcomeClass:"ATTACK_RETURN_PACKAGE_KAKASHI",handoffInterrupted:true,packageStateClass:"KAKASHI"},"academy_kakashi.post_attack_classification"),
  outcome("ATTACK_RETURN_PACKAGE_AMT",{outcomeClass:"ATTACK_RETURN_PACKAGE_AMT",handoffInterrupted:true,packageStateClass:"ANBU_MARKED_TARGET"},"academy_kakashi.post_attack_classification"),
  outcome("ATTACK_RETURN_PACKAGE_SMUGGLER",{outcomeClass:"ATTACK_RETURN_PACKAGE_SMUGGLER",handoffInterrupted:true,packageStateClass:"PACKAGE_SMUGGLER"},"academy_kakashi.post_attack_classification"),
  outcome("ATTACK_RETURN_PACKAGE_NEUTRAL_CONTESTED",{outcomeClass:"ATTACK_RETURN_PACKAGE_NEUTRAL_CONTESTED",handoffInterrupted:true,packageStateClass:"NEUTRAL_CONTESTED"},"academy_kakashi.post_attack_classification"),
  outcome("ATTACK_RETURN_IMMEDIATE_BATTLE",{outcomeClass:"ATTACK_RETURN_IMMEDIATE_BATTLE",handoffInterrupted:true,packageStateClass:"RESOLVER_COMMITTED",battleRequired:true},"battle_transition")
]);
const PICKPOCKET_OUTCOMES=Object.freeze([
  outcome("PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION",{outcomeClass:"PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION",packageCustody:"KAKASHI",handoffCompleted:false,withdrawalCompletedUndetected:true,maskedInterceptorVisible:false,pakkunPresent:false,battleRequired:false},"academy_kakashi.debrief"),
  outcome("PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1",{outcomeClass:"PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1",cleanExtractionSucceeded:false,maskedInterceptorVisible:true,pakkunPresent:false,battleRequired:true,battleConfigId:PICKPOCKET_3V1_CONFIG,battleEntryPackageHolderDefaultRef:AMT},"battle_transition")
]);

function holderFromAttack(result){const value=String(result&&result.packageStateClass||"");return ["KAKASHI","ANBU_MARKED_TARGET","PACKAGE_SMUGGLER"].includes(value)?value:null;}
function commitDirect({receipt,request,result},bindingRef){
  const rt=active(),requestedInstance=String(request&&request.context&&request.context.storySceneInstanceId||"");
  if(!rt||rt.sceneId!==SCENE_ID||String(rt.instanceId||"")!==requestedInstance)return{success:false,reason:"kakashi_direct_opening_story_instance_mismatch"};
  const selected=String(receipt&&receipt.selectedOutcomeRef||"");
  const isAttack=bindingRef===ATTACK_BINDING,isPick=bindingRef===PICKPOCKET_BINDING;
  if(!isAttack&&!isPick)return{success:false,reason:"kakashi_direct_opening_binding_unknown"};
  if(isAttack&&!ATTACK_OUTCOMES.some(row=>row.outcomeRef===selected))return{success:false,reason:"kakashi_direct_attack_outcome_not_authorised"};
  if(isPick&&!PICKPOCKET_OUTCOMES.some(row=>row.outcomeRef===selected))return{success:false,reason:"kakashi_direct_pickpocket_outcome_not_authorised"};
  const occurrenceId=String(request&&request.committedAtOccurrenceRef||PROVIDER.stableRef("occ_origin_kakashi_direct_opening",{requestedInstance,selected,bindingRef}));
  const attackHolder=isAttack?holderFromAttack(result):null;
  const pickSuccess=selected==="PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION";
  const pickFailure=selected==="PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1";
  const packageState=isAttack
    ?{objectRef:WORLD_OBJECT_REF,currentHolderClass:attackHolder,custodyClass:attackHolder||String(result&&result.packageStateClass||"UNRESOLVED"),handoffCompleted:false}
    :pickSuccess
      ?{objectRef:WORLD_OBJECT_REF,currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",handoffCompleted:false}
      :{objectRef:WORLD_OBJECT_REF,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",handoffCompleted:false};
  const fact={
    factClass:isAttack?"academy_kakashi_direct_attack_factual_state":"academy_kakashi_direct_pickpocket_factual_state",
    anchorRef:isAttack?"AK_SA_003":"AK_SA_004",
    storyDecisionReceiptId:String(receipt&&receipt.storyDecisionReceiptId||""),storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,storySceneInstanceId:String(rt.instanceId||""),
    packageState,
    participantStateByRole:{academy_kakashi:{detectionState:pickSuccess?"UNDETECTED":pickFailure?"DETECTED":"RESOLVER_COMMITTED"},masked_interceptor:{visibilityState:pickFailure?"VISIBLE_DIRECT_PICKPOCKET_EXCEPTION":"UNSEEN"}},
    knowledgeStateByObserver:{academy_kakashi:{maskedInterceptorVisible:pickFailure}},
    worldFacts:{handoffInterrupted:isAttack?result&&result.handoffInterrupted===true:false,cleanExtractionSucceeded:pickSuccess,withdrawalCompletedUndetected:pickSuccess,maskedInterceptorVisible:pickFailure,pakkunPresent:false,battleRequired:result&&result.battleRequired===true,battleConfigId:result&&result.battleConfigId||null,battleEntryPackageHolderClass:pickFailure?"ANBU_MARKED_TARGET":null},
    nextSituationRef:String(receipt&&receipt.successorSituationRef||"")
  };
  let existing=A.findOccurrence(occurrenceId);
  if(existing){const ef=factOf(existing);if(String(existing.storySceneInstanceId||ef.storySceneInstanceId||"")!==requestedInstance||String(ef.selectedOutcomeRef||"")!==selected)return{success:false,reason:"kakashi_direct_opening_occurrence_replay_mismatch"};}
  else{
    const participants=isPick&&pickFailure?[ORIGIN_ID,AMT,PS,MI]:[ORIGIN_ID];
    const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:selected,participantRefs:participants,sourceRefs:[{type:"world_object",id:WORLD_OBJECT_REF},{type:"story_decision_receipt",id:String(receipt&&receipt.storyDecisionReceiptId||"")},{type:"story_factual_resolver_receipt",id:String(receipt&&receipt.storyFactualResolverReceiptId||"")}]});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_direct_opening_occurrence_commit_failed"};
    existing=committed.record;
  }
  const worldStateRef=PROVIDER.stableRef("sc34710-world-state",{occurrenceId,selected});
  const participantStateRef=PROVIDER.stableRef("sc34710-participant-state",{occurrenceId,selected});
  const custodyRefs=[];
  if(pickSuccess)custodyRefs.push(PROVIDER.stableRef("sc34710-custody",{occurrenceId,objectRef:WORLD_OBJECT_REF,to:"KAKASHI"}));
  const knowledgeRefs=pickFailure?[PROVIDER.stableRef("sc34710-knowledge",{occurrenceId,observerRef:ORIGIN_ID,knowledgeClass:"MASKED_INTERCEPTOR_VISIBLE_DIRECT_PICKPOCKET_EXCEPTION"})]:[];
  return{success:true,occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[worldStateRef],knowledgeDeltaRefs:knowledgeRefs,relationshipHistoryRefs:[],objectiveDeltaRefs:[],objectCustodyDeltaRefs:custodyRefs,participantStateDeltaRefs:[participantStateRef],successorSituationRef:String(receipt&&receipt.successorSituationRef||"")};
}
function commitAttack(args){return commitDirect(args,ATTACK_BINDING);}
function commitPickpocket(args){return commitDirect(args,PICKPOCKET_BINDING);}

function upgradeBindings(){
  const base={ownerRef:"academy_kakashi.final_writing",authorityVersionRefs:[FINAL_WRITING,DECISION_MATRIX,FACTUAL_PROVIDER_AUTHORITY]};
  const attack=PROVIDER.registerStoryFactualResolverBinding(ATTACK_BINDING,{...base,outcomes:ATTACK_OUTCOMES,commitResult:commitAttack,metadata:{storyUnitRef:ORIGIN_ID,selectionOnly:false,authoritativeCommitOwnerRef:PATCH_ID,anchorRefs:["AK_SA_003"],maskedInterceptorNotImplied:true,requiresFullPositionResistanceBattleStateForContinuation:true}});
  const pick=PROVIDER.registerStoryFactualResolverBinding(PICKPOCKET_BINDING,{...base,outcomes:PICKPOCKET_OUTCOMES,commitResult:commitPickpocket,metadata:{storyUnitRef:ORIGIN_ID,selectionOnly:false,authoritativeCommitOwnerRef:PATCH_ID,anchorRefs:["AK_SA_004","AK_SA_028"],branchSpecificMaskedInterceptorException:true}});
  registrations.push(attack,pick);return{success:!!(attack&&attack.success&&pick&&pick.success),attack,pick};
}
function ensureOpeningIntent(rt,choiceId,bindingRef){
  const contextStateRef=entryStateRef(rt);let receipt=existingDecisionReceipt(contextStateRef,choiceId,bindingRef);
  if(receipt)return{success:true,idempotent:true,contextStateRef,receipt};
  const opened=KAK.openDecisionPoint("AK_SA_001",{committedStateRef:contextStateRef,beatRef:ACTION_BEAT,sourceOccurrenceRefs:[]});
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_direct_opening_choice_set_open_failed"};
  const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId:opened.choiceSet.choiceSetId,choiceId});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_direct_opening_intent_commit_failed"};
  receipt=committed.receipt;return{success:true,contextStateRef,receipt};
}
function resolveDirectChoice(choice,choiceId,bindingRef){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==ACTION_BEAT)return{success:false,reason:"kakashi_direct_opening_context_missing"};
  const intent=ensureOpeningIntent(rt,choiceId,bindingRef);if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_direct_opening_intent_unavailable"};
  const occurrenceId=occurrenceRef(rt,intent.receipt,bindingRef);
  const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef,actorRef:ORIGIN_ID,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:PROVIDER.stableRef("sc34710-direct-opening-idempotence",{storySceneInstanceId:String(rt.instanceId),storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef}),authorityVersionRefs:[FINAL_WRITING,DECISION_MATRIX,FACTUAL_PROVIDER_AUTHORITY],inputStateRefs:[intent.contextStateRef],continuityLineageRef:String(rt.instanceId),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId),sceneId:SCENE_ID,beatId:rt.beatId}});
  if(!factual||factual.success!==true)return factual||{success:false,reason:"kakashi_direct_opening_factual_resolution_failed"};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:intent.receipt.storyDecisionReceiptId,state:{resolverResults:{[bindingRef]:bridgeResult(factual)}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId)}});
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_direct_opening_semantic_dispatch_failed"};
  const selected=String(factual.receipt&&factual.receipt.selectedOutcomeRef||"");
  let nextBeatId=ATTACK_BOUNDARY;
  if(bindingRef===PICKPOCKET_BINDING)nextBeatId=selected==="PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1"?PICKPOCKET_BATTLE:DEBRIEF_PENDING;
  choice.nextBeatId=nextBeatId;
  const patch={kakashiDirectOpeningChoiceId:choiceId,kakashiDirectOpeningBindingRef:bindingRef,kakashiDirectOpeningOccurrenceId:occurrenceId,kakashiDirectOpeningOutcomeRef:selected,kakashiDirectOpeningStoryDecisionReceiptId:intent.receipt.storyDecisionReceiptId,kakashiDirectOpeningFactualReceiptId:String(factual.receipt&&factual.receipt.storyFactualResolverReceiptId||"")};
  if(bindingRef===PICKPOCKET_BINDING&&selected==="PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION")patch.kakashiDirectPickpocketPackageOccurrenceId=occurrenceId;
  if(bindingRef===ATTACK_BINDING)patch.kakashiDirectAttackContinuationBlocker=selected==="ATTACK_RETURN_IMMEDIATE_BATTLE"?"ATTACK_RESOLVER_BATTLE_CONFIG_AND_PARTICIPANT_STATE_REQUIRED":"ATTACK_RESOLVER_POSITION_RESISTANCE_STATE_REQUIRED";
  rt.localContext={...(rt.localContext||{}),...patch};
  save();
  return{success:true,occurrenceId,selectedOutcomeRef:selected,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,storyFactualResolverReceiptId:String(factual.receipt&&factual.receipt.storyFactualResolverReceiptId||""),nextBeatId};
}
function launchDirectPickpocket3v1({active:rt,returnContext}={}){
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_direct_pickpocket_story_occurrence_missing"};
  if(String(rt.localContext&&rt.localContext.kakashiDirectOpeningOutcomeRef||"")!=="PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1")return{success:false,reason:"kakashi_direct_pickpocket_failure_fact_required"};
  if(typeof launchAcademyKakashiOriginPlBattle!=="function")return{success:false,reason:"kakashi_combat_deployment_34300_missing"};
  return launchAcademyKakashiOriginPlBattle({storyOccurrenceId:rt.instanceId,sourceAnchorRef:"AK_SA_028",bindingRef:PICKPOCKET_BINDING,battleConfigId:PICKPOCKET_3V1_CONFIG,returnToken:`${rt.instanceId}:direct_pickpocket:3v1`,returnContext,pakkunAuthorized:false});
}
function classifyDirectPickpocketParticipant(result,participantRef){
  const participant=Array.isArray(result&&result.participants)?result.participants.find(row=>row&&row.participantRef===participantRef)||null:null;
  if(!participant)return{success:false,reason:"kakashi_direct_pickpocket_3v1_participant_missing",participantRef};
  if(participant.battleStatus!=="defeated")return{success:false,reason:"kakashi_direct_pickpocket_3v1_defeated_fact_required",participantRef};
  if(participant.lifeState!=="unresolved"||participant.custodyState!=="unresolved")return{success:false,reason:"kakashi_direct_pickpocket_3v1_story_state_not_unresolved",participantRef};
  const resultRef=PROVIDER.stableRef("sc34710-ak-sa-028-classification",{battleOccurrenceId:String(result.battleOccurrenceId||""),participantRef});
  const classified=CORE.recordParticipantClassification({storyUnitRef:ORIGIN_ID,participantRef,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef});
  return classified&&classified.success===true?{success:true,participantRef,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef}:classified||{success:false,reason:"kakashi_direct_pickpocket_3v1_classification_failed",participantRef};
}
function consumeDirectPickpocket3v1Return(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_direct_pickpocket_return_story_missing"};
  if(String(rt.localContext&&rt.localContext.kakashiDirectOpeningOutcomeRef||"")!=="PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1")return{success:false,reason:"kakashi_direct_pickpocket_return_failure_fact_missing"};
  const result=latestResult();if(!result||!result.battleOccurrenceId)return{success:false,reason:"kakashi_direct_pickpocket_3v1_battle_receipt_missing"};
  if(String(result.battleConfigId||"")!==PICKPOCKET_3V1_CONFIG||String(result.bindingRef||"")!==PICKPOCKET_BINDING)return{success:false,reason:"kakashi_direct_pickpocket_3v1_battle_receipt_mismatch"};
  if(result.rewardGranted===true||result.lootGranted===true)return{success:false,reason:"kakashi_direct_pickpocket_3v1_battle_illegal_reward"};
  const victory=result.resultState==="player_side_victory",defeat=result.resultState==="opposition_side_victory";
  if(!victory&&!defeat)return{success:false,reason:"kakashi_direct_pickpocket_3v1_battle_result_unresolved",resultState:String(result.resultState||"")};
  const openingId=String(rt.localContext&&rt.localContext.kakashiDirectOpeningOccurrenceId||"");
  const opening=openingId?A.findOccurrence(openingId):null,openingFact=factOf(opening),openingPackage=openingFact&&openingFact.packageState||{};
  if(!opening||String(openingPackage.currentHolderClass||"")!=="ANBU_MARKED_TARGET")return{success:false,reason:"kakashi_direct_pickpocket_3v1_entry_package_holder_not_committed"};
  const participantRefs=[AMT,PS,MI];
  const classifications=[];
  if(victory){
    for(const participantRef of participantRefs){const classified=classifyDirectPickpocketParticipant(result,participantRef);if(!classified||classified.success!==true)return classified;classifications.push(classified);}
  }
  const occurrenceId=PROVIDER.stableRef("occ_origin_kakashi_direct_pickpocket_3v1_return",{storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(result.battleOccurrenceId),resultState:String(result.resultState)});
  const existing=A.findOccurrence(occurrenceId);
  const holderClass=victory?"KAKASHI":"ANBU_MARKED_TARGET";
  const fact={factClass:"academy_kakashi_direct_pickpocket_3v1_post_battle_factual_state",anchorRef:"AK_SA_028",storySceneInstanceId:String(rt.instanceId||""),parentOpeningOccurrenceId:openingId,battleOccurrenceId:String(result.battleOccurrenceId),battleConfigId:PICKPOCKET_3V1_CONFIG,resultState:String(result.resultState),packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:holderClass,custodyClass:holderClass,handoffCompleted:false},packageRecovered:victory,participantClassifications:classifications.map(row=>({participantRef:row.participantRef,stateClass:row.stateClass,resultRef:row.resultRef})),participantCustodyCommitted:false,participantDeathCommitted:false,worldFacts:{maskedInterceptorVisible:true,pakkunPresent:false,amtEscapesWithPackage:defeat,cleanExtractionSucceeded:false}};
  if(existing){const ef=factOf(existing);if(String(ef.battleOccurrenceId||"")!==String(result.battleOccurrenceId)||String(ef.resultState||"")!==String(result.resultState))return{success:false,reason:"kakashi_direct_pickpocket_3v1_return_replay_mismatch"};}
  else{
    const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_post_battle_factual_occurrence",outcome:victory?"direct_pickpocket_3v1_victory":"direct_pickpocket_3v1_defeat",participantRefs:[ORIGIN_ID,...participantRefs],sourceRefs:[{type:"origin_occurrence",id:openingId,role:"pickpocket_failure_entry"},{type:"battle_occurrence",id:String(result.battleOccurrenceId),role:"battle_fact"},{type:"world_object",id:WORLD_OBJECT_REF}]});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_direct_pickpocket_3v1_return_commit_failed"};
  }
  rt.localContext={...(rt.localContext||{}),kakashiDirectPickpocketPostBattleOccurrenceId:occurrenceId,kakashiDirectPickpocketPackageOccurrenceId:occurrenceId,kakashiDirectPickpocketBattleOutcome:String(result.resultState)};
  save();
  return{success:true,idempotent:!!existing,occurrenceId,battleOccurrenceId:String(result.battleOccurrenceId),resultState:String(result.resultState),packageHolderClass:holderClass,participantClassifications:clone(classifications)};
}
function installBeatsAndChoices(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null;if(!map)return{success:false,reason:"kakashi_direct_opening_scene_missing"};
  const action=map.get(ACTION_BEAT);if(!action||!Array.isArray(action.choices))return{success:false,reason:"kakashi_direct_opening_action_missing"};
  if(!map.has(DEBRIEF_PENDING))return{success:false,reason:"kakashi_direct_opening_debrief_pending_missing"};
  const attack=action.choices.find(row=>row&&row.choiceId===ATTACK_CHOICE),pick=action.choices.find(row=>row&&row.choiceId===PICKPOCKET_CHOICE);if(!attack||!pick)return{success:false,reason:"kakashi_direct_opening_choices_missing"};
  const beats=[
    {beatId:ATTACK_BOUNDARY,mode:"narration",environmentRef:action.environmentRef||SAKURA,text:"",exitScene:false,allowPresentationClose:false},
    {beatId:PICKPOCKET_BATTLE,mode:"battle_transition",environmentRef:action.environmentRef||SAKURA,text:"",battle:{encounterId:PICKPOCKET_3V1_CONFIG,launchResolver:ctx=>launchDirectPickpocket3v1(ctx),postBattleBeatId:PICKPOCKET_BATTLE_RETURN,resultProjector:typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult:null,actionLabel:"SURVIVE THE INTERCEPTION"}},
    {beatId:PICKPOCKET_BATTLE_RETURN,mode:"narration",environmentRef:action.environmentRef||SAKURA,text:"The confrontation returns to Story for factual package and participant-state resolution.",onEnterConsequences:[{requestId:PICKPOCKET_BATTLE_RETURN_REQUEST,kind:"domain",resolve:()=>consumeDirectPickpocket3v1Return()}],nextBeatId:DEBRIEF_PENDING,exitScene:false,allowPresentationClose:false}
  ];
  beats.forEach((row,index)=>{const beat=normalizedBeat(row,970+index);if(beat)map.set(beat.beatId,beat);});
  attack.nextBeatId=ATTACK_BOUNDARY;attack.consequenceRequests=[{requestId:ATTACK_REQUEST,kind:"domain",resolve:()=>resolveDirectChoice(attack,ATTACK_CHOICE,ATTACK_BINDING)}];
  pick.nextBeatId=DEBRIEF_PENDING;pick.consequenceRequests=[{requestId:PICKPOCKET_REQUEST,kind:"domain",resolve:()=>resolveDirectChoice(pick,PICKPOCKET_CHOICE,PICKPOCKET_BINDING)}];
  const releaseAttack=GUARD.releaseInitialChoice(ATTACK_CHOICE,{successorProofRef:PATCH_ID,ownerRef:PATCH_ID,requiredConsequenceRequestId:ATTACK_REQUEST});
  const releasePick=GUARD.releaseInitialChoice(PICKPOCKET_CHOICE,{successorProofRef:PATCH_ID,ownerRef:PATCH_ID,requiredConsequenceRequestId:PICKPOCKET_REQUEST});
  if(!releaseAttack||releaseAttack.success!==true)return releaseAttack||{success:false,reason:"kakashi_direct_attack_guard_release_failed"};
  if(!releasePick||releasePick.success!==true)return releasePick||{success:false,reason:"kakashi_direct_pickpocket_guard_release_failed"};
  return{success:true,releaseAttack,releasePick,beatIds:beats.map(row=>row.beatId)};
}

const upgraded=upgradeBindings();if(!upgraded.success)throw new Error("kakashi_direct_opening_binding_upgrade_failed");
const installed=installBeatsAndChoices();if(!installed.success)throw new Error(`kakashi_direct_opening_install_failed:${installed.reason||"unknown"}`);

function diagnostics(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null,action=map&&map.get(ACTION_BEAT);
  const attack=action&&action.choices.find(row=>row.choiceId===ATTACK_CHOICE),pick=action&&action.choices.find(row=>row.choiceId===PICKPOCKET_CHOICE),battleReturn=map&&map.get(PICKPOCKET_BATTLE_RETURN);
  const guard=GUARD.getGuardState();
  const checks={patchId:PATCH_ID==="alpha_kakashi_direct_opening_consumer_34710_v2_2026_09_17",bindingsUpgraded:registrations.length===2&&registrations.every(row=>row&&row.success===true),attackSelectable:!!attack&&typeof attack.availability==="function"&&attack.availability().available===true,pickpocketSelectable:!!pick&&typeof pick.availability==="function"&&pick.availability().available===true,noLegacyAttackSuccessor:!!attack&&attack.nextBeatId!=="kak_original_transfer",noLegacyPickpocketSuccessor:!!pick&&pick.nextBeatId!=="kak_original_transfer",attackProofRequest:!!attack&&attack.consequenceRequests.some(row=>row&&row.requestId===ATTACK_REQUEST),pickpocketProofRequest:!!pick&&pick.consequenceRequests.some(row=>row&&row.requestId===PICKPOCKET_REQUEST),attackFailsClosedAtMissingState:resolveDirectChoice.toString().includes("ATTACK_RESOLVER_POSITION_RESISTANCE_STATE_REQUIRED")&&resolveDirectChoice.toString().includes("ATTACK_RESOLVER_BATTLE_CONFIG_AND_PARTICIPANT_STATE_REQUIRED"),pickpocketSuccessToDebrief:DEBRIEF_PENDING==="kak_seq_debrief_pending",pickpocketFailureEntryHolderAmt:commitDirect.toString().includes('currentHolderClass:"ANBU_MARKED_TARGET"'),pickpocket3v1ReturnConsumed:!!battleReturn&&Array.isArray(battleReturn.onEnterConsequences)&&battleReturn.onEnterConsequences.some(row=>row.requestId===PICKPOCKET_BATTLE_RETURN_REQUEST)&&battleReturn.nextBeatId===DEBRIEF_PENDING,direct3v1ClassifiesIndependently:consumeDirectPickpocket3v1Return.toString().includes("classifyDirectPickpocketParticipant")&&classifyDirectPickpocketParticipant.toString().includes('stateClass:"DEFEATED_BUT_NOT_CONTROLLED"'),direct3v1NoPakkun:launchDirectPickpocket3v1.toString().includes("pakkunAuthorized:false")&&consumeDirectPickpocket3v1Return.toString().includes("pakkunPresent:false"),guardRecordedBoth:guard.releasedInitialChoiceIds.includes(ATTACK_CHOICE)&&guard.releasedInitialChoiceIds.includes(PICKPOCKET_CHOICE),exactDirectPickpocket3v1:PICKPOCKET_3V1_CONFIG==="academy_kakashi_origin_battle_amt_ps_mi_3v1",scene03aUntouched:!!map&&map.has("kak_original_major_choice"),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,installed:{...installed},browserGoldenClaimed:false};
}

const api=Object.freeze({patchId:PATCH_ID,attackRequestId:ATTACK_REQUEST,pickpocketRequestId:PICKPOCKET_REQUEST,pickpocketBattleReturnRequestId:PICKPOCKET_BATTLE_RETURN_REQUEST,attackBoundaryBeatId:ATTACK_BOUNDARY,pickpocketSuccessBoundaryBeatId:DEBRIEF_PENDING,pickpocketBattleBeatId:PICKPOCKET_BATTLE,pickpocketBattleReturnBeatId:PICKPOCKET_BATTLE_RETURN,pickpocketBattleConfigId:PICKPOCKET_3V1_CONFIG,consumeDirectPickpocket3v1Return,diagnostics,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_DIRECT_OPENING_34710=api;
globalThis.runAcademyKakashiDirectOpening34710Diagnostics=diagnostics;
})();