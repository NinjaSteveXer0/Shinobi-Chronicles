// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI FACTUAL STATE COMMIT OWNER — 34120
//
// Canonical Kakashi Origin adapter child for authoritative non-Battle factual
// commits. 34600 selects an authorised factual outcome; this owner commits that
// outcome through the existing 32900 Origin occurrence ledger before Story may
// advance. It does not replace playerData/savePlayerData, 32900 history, 34000,
// 34600, Battle, or the native Story engine.
//
// Released routes:
// - opening MOVE IN CLOSER;
// - Get Closer SUCCESS -> LET THEM MAKE THE HANDOFF.
// ============================================================================
(function installAcademyKakashiFactualStateCommit34120(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_FACTUAL_STATE_34120)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const GUARD=globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
if(!A||typeof A.commitOccurrence!=="function"||typeof A.findOccurrence!=="function")throw new Error("alpha_origin_32900_occurrence_authority_required");
if(!CORE||!KAK||!GUARD||!PROVIDER)throw new Error("kakashi_factual_state_34120_dependency_missing");

const PATCH_ID="alpha_kakashi_factual_state_commit_34120_2026_09_16";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const GET_CLOSER_BINDING="academy_kakashi.resolver.get_closer";
const GET_CLOSER_CHOICE_ID="get_closer";
const GET_CLOSER_REQUEST_ID="kakashi_get_closer_factual_commit_34120";
const HANDOFF_BINDING="academy_kakashi.story_fixed.let_handoff_happen";
const HANDOFF_CHOICE_ID="let_handoff_happen";
const HANDOFF_REQUEST_ID="kakashi_get_closer_handoff_factual_commit_34120";
const SUCCESS_BEAT="kak_get_closer_success";
const FAILURE_BEAT="kak_get_closer_failure";
const HANDOFF_BEAT="kak_get_closer_handoff_observe_escalation";
const OBSERVE_DECISION_REF="OBSERVE_ESCALATION";
const HANDOFF_OUTCOME="GET_CLOSER_SUCCESS_HANDOFF_COMPLETED";
const FINAL_WRITING="176ce76feef3e67d4c24644e3d7443a04dcf7d6b";
const DECISION_MATRIX="0e0f99e688701ce9985ac715aa2041b1e2b49070";
const FACTUAL_PROVIDER_AUTHORITY="f2291162085cb3a35fc2a8e49df7ed905c214c85";
const WORLD_OBJECT_REF="kakashi_origin_outer_route_packet";
const PARTICIPANT_REFS=Object.freeze([
  ORIGIN_ID,
  "kakashi_origin_logistics_clerk",
  "kakashi_origin_information_broker",
  "kakashi_origin_decoy_assassin_01"
]);

function clone(value){return CORE.clone(value);}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function available(value,knownBlocker=null){return()=>({available:value===true,knownBlocker:value===true?null:knownBlocker});}
function normalizedBeat(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function factOf(row){return row&&(row.fact||row.data)||{};}

function entryStateRef(rt){
  return PROVIDER.stableRef("sc34120-kakashi-get-closer-entry",{
    sceneId:SCENE_ID,
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    beatId:"kak_original_action"
  });
}
function getCloserOccurrenceRef(rt,decisionReceipt){
  return PROVIDER.stableRef("occ_origin_kakashi_get_closer",{
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    storyDecisionReceiptId:String(decisionReceipt&&decisionReceipt.storyDecisionReceiptId||"")
  });
}
function handoffOccurrenceRef(rt,parentOccurrenceId,decisionReceipt){
  return PROVIDER.stableRef("occ_origin_kakashi_get_closer_handoff",{
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    parentOccurrenceId:String(parentOccurrenceId||""),
    storyDecisionReceiptId:String(decisionReceipt&&decisionReceipt.storyDecisionReceiptId||"")
  });
}
function existingDecisionReceipt(contextStateRef,choiceId,bindingRef){
  const snapshot=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};
  const receipts=Object.values(snapshot.decisionReceipts||{});
  return receipts.find(row=>
    row&&row.storyDecisionContextId===contextStateRef&&
    row.selectedChoiceId===choiceId&&row.resolverBindingRef===bindingRef
  )||null;
}
function ensureOpeningIntent(rt){
  const contextStateRef=entryStateRef(rt);
  let receipt=existingDecisionReceipt(contextStateRef,GET_CLOSER_CHOICE_ID,GET_CLOSER_BINDING);
  if(receipt)return{success:true,idempotent:true,contextStateRef,receipt};

  const opened=KAK.openDecisionPoint("AK_SA_001",{
    committedStateRef:contextStateRef,
    beatRef:"kak_original_action",
    sourceOccurrenceRefs:[]
  });
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_get_closer_choice_set_open_failed"};

  const committed=CORE.commitStoryIntent({
    storyUnitRef:ORIGIN_ID,
    choiceSetId:opened.choiceSet.choiceSetId,
    choiceId:GET_CLOSER_CHOICE_ID
  });
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_get_closer_intent_commit_failed"};

  receipt=committed.receipt;
  rt.localContext={
    ...(rt.localContext||{}),
    kakashiGetCloserContextStateRef:contextStateRef,
    kakashiGetCloserStoryDecisionReceiptId:receipt.storyDecisionReceiptId,
    kakashiGetCloserIntentCommitRef:receipt.intentCommitRef
  };
  save();
  return{success:true,contextStateRef,receipt};
}
function requireGetCloserSuccessParent(rt){
  const parentOccurrenceId=String(rt&&rt.localContext&&rt.localContext.kakashiGetCloserOccurrenceId||"");
  if(!parentOccurrenceId)return{success:false,reason:"kakashi_get_closer_success_parent_ref_missing"};
  const parent=A.findOccurrence(parentOccurrenceId);
  if(!parent)return{success:false,reason:"kakashi_get_closer_success_parent_occurrence_missing"};
  const fact=factOf(parent);
  if(String(parent.storySceneInstanceId||"")!==String(rt.instanceId||"")||String(fact.storySceneInstanceId||"")!==String(rt.instanceId||"")){
    return{success:false,reason:"kakashi_get_closer_success_parent_story_instance_mismatch"};
  }
  if(String(fact.selectedOutcomeRef||"")!=="GET_CLOSER_SUCCESS")return{success:false,reason:"kakashi_get_closer_handoff_requires_success_parent"};
  if(fact.packageState&&fact.packageState.handoffCompleted===true)return{success:false,reason:"kakashi_get_closer_parent_handoff_already_completed"};
  return{success:true,parentOccurrenceId,parent,fact};
}
function ensureHandoffIntent(rt,parentOccurrenceId){
  const contextStateRef=String(parentOccurrenceId||"");
  let receipt=existingDecisionReceipt(contextStateRef,HANDOFF_CHOICE_ID,HANDOFF_BINDING);
  if(receipt)return{success:true,idempotent:true,contextStateRef,receipt};

  const opened=KAK.openDecisionPoint("AK_SA_005",{
    committedStateRef:contextStateRef,
    beatRef:SUCCESS_BEAT,
    sourceOccurrenceRefs:[contextStateRef]
  });
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_get_closer_handoff_choice_set_open_failed"};
  const committed=CORE.commitStoryIntent({
    storyUnitRef:ORIGIN_ID,
    choiceSetId:opened.choiceSet.choiceSetId,
    choiceId:HANDOFF_CHOICE_ID
  });
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_get_closer_handoff_intent_commit_failed"};

  receipt=committed.receipt;
  rt.localContext={
    ...(rt.localContext||{}),
    kakashiGetCloserHandoffContextStateRef:contextStateRef,
    kakashiGetCloserHandoffStoryDecisionReceiptId:receipt.storyDecisionReceiptId,
    kakashiGetCloserHandoffIntentCommitRef:receipt.intentCommitRef
  };
  save();
  return{success:true,contextStateRef,receipt};
}

function getCloserFact(selectedOutcomeRef,result,rt,decisionReceipt,factualReceipt){
  const success=selectedOutcomeRef==="GET_CLOSER_SUCCESS";
  const failure=selectedOutcomeRef==="GET_CLOSER_FAILURE";
  if(!success&&!failure)return null;
  return{
    factClass:"academy_kakashi_get_closer_factual_state",
    selectedOutcomeRef,
    storyDecisionReceiptId:decisionReceipt.storyDecisionReceiptId,
    storyFactualResolverReceiptId:factualReceipt.storyFactualResolverReceiptId,
    storySceneInstanceId:String(rt.instanceId),
    packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:"ANBU_MARKED_TARGET",handoffCompleted:false},
    participantStateByRole:success?{
      academy_kakashi:{positionClass:"IMPROVED_CONCEALED_POSITION",detectionState:"UNDETECTED"},
      anbu_marked_target:{roleState:"CURRENT_PACKAGE_HOLDER"},
      package_smuggler:{roleState:"HANDOFF_PENDING"},
      masked_interceptor:{visibilityState:"UNSEEN"}
    }:{
      academy_kakashi:{positionClass:"APPROACH_COMPROMISED",detectionState:"DETECTED"},
      anbu_marked_target:{roleState:"CURRENT_PACKAGE_HOLDER"},
      package_smuggler:{positionClass:"REMAINS_AT_EXCHANGE"},
      masked_interceptor:{visibilityState:"UNSEEN"}
    },
    knowledgeStateByObserver:{academy_kakashi:{fullerContingencyKnowledge:success===true,maskedInterceptorVisible:false}},
    worldFacts:success?{concealmentPreserved:true,improvedPosition:true,handoffCompleted:false,maskedInterceptorVisible:false}:{approachDetected:true,handoffAborted:true,packageSmugglerRemainsBehind:true,maskedInterceptorVisible:false},
    nextDecisionPointRef:String(result&&result.nextDecisionPointRef||"")
  };
}
function handoffFact(result,rt,parentOccurrenceId,decisionReceipt,factualReceipt){
  if(String(factualReceipt&&factualReceipt.selectedOutcomeRef||"")!==HANDOFF_OUTCOME)return null;
  return{
    factClass:"academy_kakashi_get_closer_handoff_factual_state",
    selectedOutcomeRef:HANDOFF_OUTCOME,
    parentOccurrenceRef:String(parentOccurrenceId||""),
    storyDecisionReceiptId:decisionReceipt.storyDecisionReceiptId,
    storyFactualResolverReceiptId:factualReceipt.storyFactualResolverReceiptId,
    storySceneInstanceId:String(rt.instanceId),
    packageState:{objectRef:WORLD_OBJECT_REF,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"PACKAGE_SMUGGLER",handoffCompleted:true},
    participantStateByRole:{
      academy_kakashi:{positionClass:"IMPROVED_CONCEALED_POSITION",detectionState:"UNDETECTED"},
      anbu_marked_target:{roleState:"HANDOFF_COMPLETED_SOURCE"},
      package_smuggler:{roleState:"CURRENT_PACKAGE_HOLDER"},
      masked_interceptor:{visibilityState:"VISIBLE_AFTER_COMPLETED_TRANSFER"}
    },
    knowledgeStateByObserver:{academy_kakashi:{fullerContingencyKnowledge:true,maskedInterceptorVisible:true}},
    worldFacts:{concealmentPreserved:true,improvedPosition:true,handoffCompleted:true,packageHolderClass:"PACKAGE_SMUGGLER",observeEscalationActive:true,maskedInterceptorVisible:true},
    nextDecisionPointRef:String(result&&result.nextDecisionPointRef||OBSERVE_DECISION_REF)
  };
}

function commitGetCloser({receipt,request,result}={}){
  const rt=active();
  const requestedInstance=String(request&&request.context&&request.context.storySceneInstanceId||"");
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_get_closer_story_instance_missing"};
  if(!requestedInstance||requestedInstance!==String(rt.instanceId||""))return{success:false,reason:"kakashi_get_closer_story_instance_mismatch"};
  const occurrenceId=String(request&&request.committedAtOccurrenceRef||getCloserOccurrenceRef(rt,{storyDecisionReceiptId:receipt&&receipt.storyDecisionReceiptId}));
  const fact=getCloserFact(receipt&&receipt.selectedOutcomeRef,result,rt,{storyDecisionReceiptId:receipt&&receipt.storyDecisionReceiptId},receipt);
  if(!fact)return{success:false,reason:"kakashi_get_closer_outcome_not_authorised"};
  let existing=A.findOccurrence(occurrenceId);
  if(existing){
    const existingFact=factOf(existing);
    if(String(existing.storySceneInstanceId||"")!==requestedInstance||String(existingFact.selectedOutcomeRef||"")!==String(receipt.selectedOutcomeRef||""))return{success:false,reason:"kakashi_get_closer_occurrence_replay_mismatch"};
  }else{
    const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:String(receipt.selectedOutcomeRef||""),participantRefs:[...PARTICIPANT_REFS],sourceRefs:[{type:"world_object",id:WORLD_OBJECT_REF},{type:"story_decision_receipt",id:String(receipt.storyDecisionReceiptId||"")},{type:"story_factual_resolver_receipt",id:String(receipt.storyFactualResolverReceiptId||"")} ]});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_get_closer_occurrence_commit_failed"};
    existing=committed.record;
  }
  const participantStateRef=PROVIDER.stableRef("sc34120-participant-state",{occurrenceId,outcomeRef:receipt.selectedOutcomeRef});
  const worldStateRef=PROVIDER.stableRef("sc34120-world-state",{occurrenceId,outcomeRef:receipt.selectedOutcomeRef});
  const knowledgeRefs=receipt.selectedOutcomeRef==="GET_CLOSER_SUCCESS"?[PROVIDER.stableRef("sc34120-knowledge",{occurrenceId,observerRef:ORIGIN_ID,knowledgeClass:"FULLER_CONTINGENCY_KNOWLEDGE"})]:[];
  return{success:true,occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[worldStateRef],knowledgeDeltaRefs:knowledgeRefs,relationshipHistoryRefs:[],objectiveDeltaRefs:[],objectCustodyDeltaRefs:[],participantStateDeltaRefs:[participantStateRef],successorSituationRef:String(receipt.successorSituationRef||"")};
}
function commitGetCloserHandoff({receipt,request,result}={}){
  const rt=active();
  const requestedInstance=String(request&&request.context&&request.context.storySceneInstanceId||"");
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_get_closer_handoff_story_instance_missing"};
  if(!requestedInstance||requestedInstance!==String(rt.instanceId||""))return{success:false,reason:"kakashi_get_closer_handoff_story_instance_mismatch"};
  const parentId=String(request&&request.context&&request.context.parentOccurrenceRef||rt.localContext&&rt.localContext.kakashiGetCloserOccurrenceId||"");
  const parentCheck=requireGetCloserSuccessParent(rt);
  if(!parentCheck||parentCheck.success!==true)return parentCheck||{success:false,reason:"kakashi_get_closer_handoff_parent_invalid"};
  if(parentId&&parentId!==parentCheck.parentOccurrenceId)return{success:false,reason:"kakashi_get_closer_handoff_parent_ref_mismatch"};
  const occurrenceId=String(request&&request.committedAtOccurrenceRef||handoffOccurrenceRef(rt,parentCheck.parentOccurrenceId,{storyDecisionReceiptId:receipt&&receipt.storyDecisionReceiptId}));
  const fact=handoffFact(result,rt,parentCheck.parentOccurrenceId,{storyDecisionReceiptId:receipt&&receipt.storyDecisionReceiptId},receipt);
  if(!fact)return{success:false,reason:"kakashi_get_closer_handoff_outcome_not_authorised"};
  let existing=A.findOccurrence(occurrenceId);
  if(existing){
    const existingFact=factOf(existing);
    if(String(existing.storySceneInstanceId||"")!==requestedInstance||String(existingFact.selectedOutcomeRef||"")!==HANDOFF_OUTCOME||String(existingFact.parentOccurrenceRef||"")!==parentCheck.parentOccurrenceId)return{success:false,reason:"kakashi_get_closer_handoff_occurrence_replay_mismatch"};
  }else{
    const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:HANDOFF_OUTCOME,participantRefs:[...PARTICIPANT_REFS],sourceRefs:[{type:"origin_occurrence",id:parentCheck.parentOccurrenceId},{type:"world_object",id:WORLD_OBJECT_REF},{type:"story_decision_receipt",id:String(receipt.storyDecisionReceiptId||"")},{type:"story_factual_resolver_receipt",id:String(receipt.storyFactualResolverReceiptId||"")} ]});
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_get_closer_handoff_occurrence_commit_failed"};
    existing=committed.record;
  }
  const worldStateRef=PROVIDER.stableRef("sc34120-handoff-world-state",{occurrenceId,outcomeRef:HANDOFF_OUTCOME});
  const participantStateRef=PROVIDER.stableRef("sc34120-handoff-participant-state",{occurrenceId,outcomeRef:HANDOFF_OUTCOME});
  const custodyRef=PROVIDER.stableRef("sc34120-handoff-custody",{occurrenceId,objectRef:WORLD_OBJECT_REF,from:"ANBU_MARKED_TARGET",to:"PACKAGE_SMUGGLER"});
  const knowledgeRef=PROVIDER.stableRef("sc34120-handoff-knowledge",{occurrenceId,observerRef:ORIGIN_ID,knowledgeClass:"MASKED_INTERCEPTOR_VISIBLE_AFTER_TRANSFER"});
  return{success:true,occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[worldStateRef],knowledgeDeltaRefs:[knowledgeRef],relationshipHistoryRefs:[],objectiveDeltaRefs:[],objectCustodyDeltaRefs:[custodyRef],participantStateDeltaRefs:[participantStateRef],successorSituationRef:String(receipt.successorSituationRef||"academy_kakashi.decision.observe_escalation")};
}

function getCommitResult(bindingRef){const ref=String(bindingRef||"");if(ref===GET_CLOSER_BINDING)return commitGetCloser;if(ref===HANDOFF_BINDING)return commitGetCloserHandoff;return null;}
function bridgeResult(factual){const receipt=factual.receipt||{};return{success:true,resolverResultRef:receipt.storyFactualResolverReceiptId||null,consequenceRefs:receipt.consequenceRefs||[],stateDeltaRefs:receipt.stateDeltaRefs||[],knowledgeDeltaRefs:receipt.knowledgeDeltaRefs||[],relationshipHistoryRefs:receipt.relationshipHistoryRefs||[],objectiveDeltaRefs:receipt.objectiveDeltaRefs||[],successorSituationRef:receipt.successorSituationRef||null,result:clone(factual.result||receipt.result||null)};}
function resolveOpeningGetCloser(choice){
  const rt=active();
  if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!=="kak_original_action")return{success:false,reason:"kakashi_get_closer_opening_context_missing"};
  const intent=ensureOpeningIntent(rt);if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_get_closer_intent_unavailable"};
  const occurrenceId=getCloserOccurrenceRef(rt,intent.receipt);
  const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:GET_CLOSER_BINDING,actorRef:ORIGIN_ID,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:PROVIDER.stableRef("sc34120-get-closer-idempotence",{storySceneInstanceId:String(rt.instanceId),storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[FINAL_WRITING,DECISION_MATRIX,FACTUAL_PROVIDER_AUTHORITY],inputStateRefs:[intent.contextStateRef],continuityLineageRef:String(rt.instanceId),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId),sceneId:SCENE_ID,beatId:rt.beatId}});
  if(!factual||factual.success!==true)return factual||{success:false,reason:"kakashi_get_closer_factual_resolution_failed"};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:intent.receipt.storyDecisionReceiptId,state:{resolverResults:{[GET_CLOSER_BINDING]:bridgeResult(factual)}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId)}});
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_get_closer_semantic_dispatch_failed"};
  const nextDecisionPointRef=String(factual.result&&factual.result.nextDecisionPointRef||"");
  const successor=KAK.openDecisionPoint(nextDecisionPointRef,{committedStateRef:occurrenceId,beatRef:nextDecisionPointRef==="AK_SA_005"?SUCCESS_BEAT:FAILURE_BEAT,sourceOccurrenceRefs:[occurrenceId]});
  if(!successor||successor.success!==true)return successor||{success:false,reason:"kakashi_get_closer_successor_choice_set_failed"};
  const selected=String(factual.receipt&&factual.receipt.selectedOutcomeRef||"");choice.nextBeatId=selected==="GET_CLOSER_SUCCESS"?SUCCESS_BEAT:selected==="GET_CLOSER_FAILURE"?FAILURE_BEAT:null;if(!choice.nextBeatId)return{success:false,reason:"kakashi_get_closer_successor_beat_unknown"};
  rt.localContext={...(rt.localContext||{}),kakashiGetCloserOutcomeRef:selected,kakashiGetCloserOccurrenceId:occurrenceId,kakashiGetCloserSuccessorDecisionPointRef:nextDecisionPointRef,kakashiGetCloserSuccessorChoiceSetId:successor.choiceSet.choiceSetId};save();
  return{success:true,occurrenceId,selectedOutcomeRef:selected,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,storyFactualResolverReceiptId:factual.receipt.storyFactualResolverReceiptId,successorChoiceSetId:successor.choiceSet.choiceSetId,nextBeatId:choice.nextBeatId};
}
function resolveGetCloserHandoff(choice){
  const rt=active();
  if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==SUCCESS_BEAT)return{success:false,reason:"kakashi_get_closer_handoff_context_missing"};
  const parent=requireGetCloserSuccessParent(rt);if(!parent||parent.success!==true)return parent||{success:false,reason:"kakashi_get_closer_handoff_parent_missing"};
  const intent=ensureHandoffIntent(rt,parent.parentOccurrenceId);if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_get_closer_handoff_intent_unavailable"};
  const occurrenceId=handoffOccurrenceRef(rt,parent.parentOccurrenceId,intent.receipt);
  const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:HANDOFF_BINDING,actorRef:ORIGIN_ID,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:PROVIDER.stableRef("sc34120-get-closer-handoff-idempotence",{storySceneInstanceId:String(rt.instanceId),parentOccurrenceId:parent.parentOccurrenceId,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[FINAL_WRITING,DECISION_MATRIX,FACTUAL_PROVIDER_AUTHORITY],inputStateRefs:[parent.parentOccurrenceId],continuityLineageRef:String(rt.instanceId),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId),sceneId:SCENE_ID,beatId:rt.beatId,parentOccurrenceRef:parent.parentOccurrenceId}});
  if(!factual||factual.success!==true)return factual||{success:false,reason:"kakashi_get_closer_handoff_factual_resolution_failed"};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:intent.receipt.storyDecisionReceiptId,state:{resolverResults:{[HANDOFF_BINDING]:bridgeResult(factual)}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId)}});
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_get_closer_handoff_semantic_dispatch_failed"};
  const successor=KAK.openDecisionPoint(OBSERVE_DECISION_REF,{committedStateRef:occurrenceId,beatRef:HANDOFF_BEAT,sourceOccurrenceRefs:[parent.parentOccurrenceId,occurrenceId]});
  if(!successor||successor.success!==true)return successor||{success:false,reason:"kakashi_get_closer_handoff_observe_choice_set_failed"};
  choice.nextBeatId=HANDOFF_BEAT;rt.localContext={...(rt.localContext||{}),kakashiGetCloserHandoffOccurrenceId:occurrenceId,kakashiGetCloserHandoffOutcomeRef:HANDOFF_OUTCOME,kakashiObserveEscalationChoiceSetId:successor.choiceSet.choiceSetId};save();
  return{success:true,occurrenceId,parentOccurrenceId:parent.parentOccurrenceId,selectedOutcomeRef:HANDOFF_OUTCOME,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,storyFactualResolverReceiptId:factual.receipt.storyFactualResolverReceiptId,successorChoiceSetId:successor.choiceSet.choiceSetId,nextBeatId:HANDOFF_BEAT};
}

function installGetCloserStoryConsumer(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_story_definition_missing"};
  const action=def.beatMap.get("kak_original_action");if(!action||!Array.isArray(action.choices))return{success:false,reason:"kakashi_opening_choice_beat_missing"};
  const openingChoice=action.choices.find(row=>row&&row.choiceId===GET_CLOSER_CHOICE_ID);if(!openingChoice)return{success:false,reason:"kakashi_get_closer_choice_missing"};
  const environmentRef=(def.beatMap.get("kak_original_transfer")||{}).environmentRef||action.environmentRef||null;
  const blocker=GUARD.blocker||"This route is not available in the current Alpha build.";const blocked=available(false,blocker);
  const beats=[
    {beatId:SUCCESS_BEAT,mode:"choice",environmentRef,text:"Kakashi closes the distance without giving himself away. From the improved position, he has a clearer read on the exchange before the handoff completes.",choices:[{choiceId:HANDOFF_CHOICE_ID,label:"LET THEM MAKE THE HANDOFF",nextBeatId:HANDOFF_BEAT,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:HANDOFF_REQUEST_ID,kind:"domain",resolve:null}]},{choiceId:"strike_before_handoff",label:"STRIKE BEFORE THE HANDOFF",nextBeatId:SUCCESS_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"attempt_pickpocket",label:"SLIP IN FOR THE PACKAGE",nextBeatId:SUCCESS_BEAT,availability:blocked,knownBlocker:blocker}]},
    {beatId:FAILURE_BEAT,mode:"choice",environmentRef,text:"Kakashi's approach is spotted before the handoff completes. The exchange breaks: the package stays with its current holder while the other man remains behind.",choices:[{choiceId:"stay_on_package",label:"STAY WITH THE PACKAGE",nextBeatId:FAILURE_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"stop_package_smuggler",label:"STOP THE MAN WHO SPOTTED YOU",nextBeatId:FAILURE_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"cut_off_sakura",label:"CUT THEM OFF AT THE SAKURA TREE",nextBeatId:FAILURE_BEAT,availability:blocked,knownBlocker:blocker}]},
    {beatId:HANDOFF_BEAT,mode:"choice",environmentRef,text:"The handoff completes. The second man takes the package. Only then does a masked woman cut into the exchange. Kakashi keeps the fuller read he gained by moving closer.",choices:[{choiceId:"stop_assassin",label:"CUT HER OFF",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"secure_package",label:"GO FOR THE PACKAGE",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"secure_package_before_assassin",label:"BEAT HER TO THE PACKAGE",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"defeat_assassin_then_secure",label:"DEAL WITH HER FIRST, THEN CHASE THE PACKAGE",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"go_after_original_target",label:"STAY ON THE FIRST MAN",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker}]}
  ];
  beats.forEach((beat,index)=>{const normalized=normalizedBeat(beat,920+index);if(normalized)def.beatMap.set(normalized.beatId,normalized);});
  const successBeat=def.beatMap.get(SUCCESS_BEAT);const handoffChoice=successBeat&&successBeat.choices.find(row=>row&&row.choiceId===HANDOFF_CHOICE_ID);if(!handoffChoice)return{success:false,reason:"kakashi_get_closer_handoff_choice_missing"};
  handoffChoice.consequenceRequests=[{requestId:HANDOFF_REQUEST_ID,kind:"domain",resolve:()=>resolveGetCloserHandoff(handoffChoice)}];
  openingChoice.label="MOVE IN CLOSER";openingChoice.nextBeatId=SUCCESS_BEAT;openingChoice.consequenceRequests=[{requestId:GET_CLOSER_REQUEST_ID,kind:"domain",resolve:()=>resolveOpeningGetCloser(openingChoice)}];openingChoice.contextPatch={...(openingChoice.contextPatch||{}),kakashiOriginalAction:"get_closer"};
  const released=typeof GUARD.releaseInitialChoice==="function"?GUARD.releaseInitialChoice(GET_CLOSER_CHOICE_ID,{successorProofRef:PATCH_ID,ownerRef:PATCH_ID,requiredConsequenceRequestId:GET_CLOSER_REQUEST_ID}):{success:false,reason:"kakashi_guard_release_api_missing"};
  if(!released||released.success!==true)return released;
  return{success:true,choiceId:GET_CLOSER_CHOICE_ID,beatIds:beats.map(row=>row.beatId),release:released,handoffChoiceId:HANDOFF_CHOICE_ID};
}

function diagnostics(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null;const action=map&&map.get("kak_original_action");const openingChoice=action&&Array.isArray(action.choices)?action.choices.find(row=>row&&row.choiceId===GET_CLOSER_CHOICE_ID):null;const successBeat=map&&map.get(SUCCESS_BEAT),failureBeat=map&&map.get(FAILURE_BEAT),handoffBeat=map&&map.get(HANDOFF_BEAT);const handoffChoice=successBeat&&Array.isArray(successBeat.choices)?successBeat.choices.find(row=>row&&row.choiceId===HANDOFF_CHOICE_ID):null;const guardState=typeof GUARD.getGuardState==="function"?GUARD.getGuardState():{};
  const checks={patchId:PATCH_ID==="alpha_kakashi_factual_state_commit_34120_2026_09_16",originOccurrenceOwner:typeof A.commitOccurrence==="function"&&typeof A.findOccurrence==="function",neutralFactualProvider:PROVIDER.providerId==="ce.neutral_story_factual_resolver.v1",getCloserCommitOwner:getCommitResult(GET_CLOSER_BINDING)===commitGetCloser,handoffCommitOwner:getCommitResult(HANDOFF_BINDING)===commitGetCloserHandoff,exactOpeningLabel:!!openingChoice&&openingChoice.label==="MOVE IN CLOSER",exactCommitRequest:!!openingChoice&&Array.isArray(openingChoice.consequenceRequests)&&openingChoice.consequenceRequests.some(row=>row&&row.requestId===GET_CLOSER_REQUEST_ID),openingReleasedThrough34200:!!openingChoice&&typeof openingChoice.availability==="function"&&openingChoice.availability().available===true&&Array.isArray(guardState.releasedInitialChoiceIds)&&guardState.releasedInitialChoiceIds.includes(GET_CLOSER_CHOICE_ID),successorBeatsPresent:!!successBeat&&!!failureBeat&&!!handoffBeat,exactSuccessLabels:!!successBeat&&successBeat.choices.map(row=>row.label).join("|")==="LET THEM MAKE THE HANDOFF|STRIKE BEFORE THE HANDOFF|SLIP IN FOR THE PACKAGE",exactFailureLabels:!!failureBeat&&failureBeat.choices.map(row=>row.label).join("|")==="STAY WITH THE PACKAGE|STOP THE MAN WHO SPOTTED YOU|CUT THEM OFF AT THE SAKURA TREE",handoffReleased:!!handoffChoice&&typeof handoffChoice.availability==="function"&&handoffChoice.availability().available===true&&Array.isArray(handoffChoice.consequenceRequests)&&handoffChoice.consequenceRequests.some(row=>row&&row.requestId===HANDOFF_REQUEST_ID),remainingGetCloserSuccessorsFailClosed:!!successBeat&&successBeat.choices.filter(row=>row.choiceId!==HANDOFF_CHOICE_ID).every(row=>typeof row.availability==="function"&&row.availability().available===false),getCloserFailureSuccessorsFailClosed:!!failureBeat&&failureBeat.choices.every(row=>typeof row.availability==="function"&&row.availability().available===false),exactObserveEscalationLabels:!!handoffBeat&&handoffBeat.choices.map(row=>row.label).join("|")==="CUT HER OFF|GO FOR THE PACKAGE|BEAT HER TO THE PACKAGE|DEAL WITH HER FIRST, THEN CHASE THE PACKAGE|STAY ON THE FIRST MAN",observeEscalationStillFailClosed:!!handoffBeat&&handoffBeat.choices.every(row=>typeof row.availability==="function"&&row.availability().available===false),noBattleInvented:!resolveOpeningGetCloser.toString().includes("launchAcademyKakashiOriginPlBattle")&&!resolveGetCloserHandoff.toString().includes("launchAcademyKakashiOriginPlBattle"),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const api=Object.freeze({patchId:PATCH_ID,bindingRef:GET_CLOSER_BINDING,handoffBindingRef:HANDOFF_BINDING,getCommitResult,commitGetCloser,commitGetCloserHandoff,installGetCloserStoryConsumer,diagnostics,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_FACTUAL_STATE_34120=api;
globalThis.runAcademyKakashiFactualState34120Diagnostics=diagnostics;
})();
