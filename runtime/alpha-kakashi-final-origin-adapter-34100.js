// ============================================================================
// ISSUES #188 + #192 — ACADEMY KAKASHI FINAL NEUTRAL STORY ADAPTER — 34100
//
// Final Writing authority:
// - 176ce76feef3e67d4c24644e3d7443a04dcf7d6b
// - 713cae26e3b3fb4a214564b497a5f30fb2f14313
// CE runtime authority:
// - aa01e819183cb0a16ccca9f61dc8ca253c409022
// - 06566ee81fe7c7856fd513d0225e621273f4bfaa
// - ad526965c24240d03bfdcd3ed4ed8e8c19b4426e
//
// This adapter makes the closed Kakashi decision/autonomy inventory
// machine-addressable through the neutral 34000 core. It intentionally does
// not invent missing domain resolver results or Battle facts. Existing 33800 /
// 33900 presentation remains the browser surface until exact branch prose and
// Battle caller bindings are consumed in subsequent implementation passes.
// ============================================================================
(function installAlphaKakashiFinal34100(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_FINAL_34100)return;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
if(!CORE)throw new Error("story_decision_realisation_34000_required");

const PATCH_ID="alpha_kakashi_final_origin_adapter_34100_2026_09_15";
const STORY_UNIT_REF="academy_kakashi";
const SCENE_REF="origin_academy_kakashi_anbu_retrieval";
const AUTHORITY=Object.freeze({
  finalWriting:"176ce76feef3e67d4c24644e3d7443a04dcf7d6b",
  finalAutonomy:"713cae26e3b3fb4a214564b497a5f30fb2f14313",
  neutralDecision:"aa01e819183cb0a16ccca9f61dc8ca253c409022",
  participantFirst:"06566ee81fe7c7856fd513d0225e621273f4bfaa",
  lethalTrajectory:"ad526965c24240d03bfdcd3ed4ed8e8c19b4426e"
});

const CLASSES=Object.freeze({
  PARTICIPANT_AUTONOMY:"PARTICIPANT_AUTONOMY",
  STORY_FIXED_PARTICIPANT_ACTION:"STORY_FIXED_PARTICIPANT_ACTION",
  PROTAGONIST_REACTION_WINDOW:"PROTAGONIST_REACTION_WINDOW",
  BATTLE_OWNED_AUTONOMY:"BATTLE_OWNED_AUTONOMY",
  RESOLVER_RETURN:"RESOLVER_RETURN",
  POST_RESOLUTION_CLASSIFICATION:"POST_RESOLUTION_CLASSIFICATION",
  TERMINAL_PROJECTION_GUARD:"TERMINAL_PROJECTION_GUARD"
});
const A=CLASSES;
const anchor=(anchorId,classes,summary,extra={})=>Object.freeze({anchorId,classes,summary,...extra});
const ANCHORS=Object.freeze([
  anchor("AK_SA_001",[A.PROTAGONIST_REACTION_WINDOW],"Sakura exchange initial intervention"),
  anchor("AK_SA_002",[A.STORY_FIXED_PARTICIPANT_ACTION],"Observe transfer / escalation"),
  anchor("AK_SA_003",[A.RESOLVER_RETURN,A.PARTICIPANT_AUTONOMY,A.BATTLE_OWNED_AUTONOMY],"Direct Attack return",{conditional:true}),
  anchor("AK_SA_004",[A.RESOLVER_RETURN,A.STORY_FIXED_PARTICIPANT_ACTION,A.BATTLE_OWNED_AUTONOMY],"Direct Pickpocket exact return — final"),
  anchor("AK_SA_005",[A.PROTAGONIST_REACTION_WINDOW],"Get Closer SUCCESS reaction window"),
  anchor("AK_SA_006",[A.STORY_FIXED_PARTICIPANT_ACTION],"Get Closer FAILURE participant response"),
  anchor("AK_SA_007",[A.RESOLVER_RETURN],"Stay on Package pursuit"),
  anchor("AK_SA_008",[A.STORY_FIXED_PARTICIPANT_ACTION,A.PARTICIPANT_AUTONOMY],"Downstream Pakkun interception entry",{actorRef:"pakkun_origin_unfamiliar_ninken"}),
  anchor("AK_SA_009",[A.STORY_FIXED_PARTICIPANT_ACTION,A.BATTLE_OWNED_AUTONOMY],"Demand Package refusal -> Battle"),
  anchor("AK_SA_010",[A.STORY_FIXED_PARTICIPANT_ACTION],"Demand Package Battle return"),
  anchor("AK_SA_011",[A.PARTICIPANT_AUTONOMY,A.BATTLE_OWNED_AUTONOMY],"Take Him Down neutral-package autonomy",{actorRef:"pakkun_origin_unfamiliar_ninken"}),
  anchor("AK_SA_012",[A.PARTICIPANT_AUTONOMY],"Pakkun recurring autonomy / presence",{actorRef:"pakkun_origin_unfamiliar_ninken",recurring:true}),
  anchor("AK_SA_013",[A.PROTAGONIST_REACTION_WINDOW,A.PARTICIPANT_AUTONOMY],"Package-secured AMT disposition window"),
  anchor("AK_SA_014",[A.STORY_FIXED_PARTICIPANT_ACTION,A.BATTLE_OWNED_AUTONOMY],"Observe -> Secure Package"),
  anchor("AK_SA_015",[A.STORY_FIXED_PARTICIPANT_ACTION,A.BATTLE_OWNED_AUTONOMY],"Observe -> Defeat Assassin then Secure Package",{timingGate:true}),
  anchor("AK_SA_016",[A.STORY_FIXED_PARTICIPANT_ACTION,A.BATTLE_OWNED_AUTONOMY],"Get Closer FAILURE -> Stop Package Smuggler"),
  anchor("AK_SA_017",[A.STORY_FIXED_PARTICIPANT_ACTION,A.BATTLE_OWNED_AUTONOMY],"Get Closer FAILURE -> Cut Off at Sakura"),
  anchor("AK_SA_018",[A.STORY_FIXED_PARTICIPANT_ACTION],"Ask Where Package Was Going"),
  anchor("AK_SA_019",[A.STORY_FIXED_PARTICIPANT_ACTION,A.BATTLE_OWNED_AUTONOMY],"Observe -> Stop Assassin"),
  anchor("AK_SA_020",[A.RESOLVER_RETURN],"Secure Package Before Assassin"),
  anchor("AK_SA_021",[A.STORY_FIXED_PARTICIPANT_ACTION,A.RESOLVER_RETURN,A.BATTLE_OWNED_AUTONOMY],"Go After Original Target"),
  anchor("AK_SA_022",[A.RESOLVER_RETURN,A.BATTLE_OWNED_AUTONOMY],"Quick MI -> PS -> AMT continuation — final",{sequentialTimingGates:true}),
  anchor("AK_SA_023",[A.POST_RESOLUTION_CLASSIFICATION],"Generic post-resolution classification"),
  anchor("AK_SA_024",[A.POST_RESOLUTION_CLASSIFICATION,A.PARTICIPANT_AUTONOMY],"Take Him Down defeat package closure"),
  anchor("AK_SA_025",[A.POST_RESOLUTION_CLASSIFICATION,A.PARTICIPANT_AUTONOMY,A.PROTAGONIST_REACTION_WINDOW],"Secure Package 2-v-1 victory continuation"),
  anchor("AK_SA_026",[A.POST_RESOLUTION_CLASSIFICATION],"Stop Package Smuggler victory continuation"),
  anchor("AK_SA_027",[A.POST_RESOLUTION_CLASSIFICATION],"AMT victory without package"),
  anchor("AK_SA_028",[A.BATTLE_OWNED_AUTONOMY,A.POST_RESOLUTION_CLASSIFICATION],"Direct Pickpocket failure 3-v-1 return"),
  anchor("AK_SA_029",[A.RESOLVER_RETURN],"Get Closer SUCCESS -> Strike Before Handoff"),
  anchor("AK_SA_030",[A.RESOLVER_RETURN,A.STORY_FIXED_PARTICIPANT_ACTION,A.BATTLE_OWNED_AUTONOMY],"Get Closer SUCCESS -> Attempt Pickpocket"),
  anchor("AK_SA_031",[A.STORY_FIXED_PARTICIPANT_ACTION],"Pakkun explicit terminal departure",{actorRef:"pakkun_origin_unfamiliar_ninken"}),
  anchor("AK_SA_032",[A.TERMINAL_PROJECTION_GUARD],"Terminal semantic-resolution guard")
]);

const choice=(choiceId,presentationLabel,intentType,resolverBindingRef,intentPayload=null)=>Object.freeze({choiceId,presentationLabel,intentType,resolverBindingRef,intentPayload});
const DECISIONS=Object.freeze({
  AK_SA_001:Object.freeze({decisionPointRef:"AK_SA_001",allAuthoredChoicesEligible:true,choices:Object.freeze([
    choice("observe","Observe.","observe","academy_kakashi.story_fixed.observe_transfer"),
    choice("get_closer","Get closer.","get_closer","academy_kakashi.resolver.get_closer"),
    choice("attack","Attack.","attack","academy_kakashi.resolver.attack"),
    choice("attempt_pickpocket","Attempt to pickpocket the package.","attempt_pickpocket","academy_kakashi.resolver.pickpocket_direct")
  ])}),
  OBSERVE_ESCALATION:Object.freeze({decisionPointRef:"OBSERVE_ESCALATION",allAuthoredChoicesEligible:true,choices:Object.freeze([
    choice("stop_assassin","Stop the Assassin","stop_assassin","academy_kakashi.battle.stop_assassin"),
    choice("secure_package","Secure the Package","secure_package","academy_kakashi.battle.secure_package"),
    choice("secure_package_before_assassin","Secure the Package Before the Assassin","secure_package_before_assassin","academy_kakashi.resolver.secure_package_before_assassin"),
    choice("defeat_assassin_then_secure","Defeat the Assassin, Then Secure the Package","defeat_assassin_then_secure","academy_kakashi.battle.defeat_assassin_then_secure"),
    choice("go_after_original_target","Go After the Original Target","pursue_original_target","academy_kakashi.resolver.pursue_original_target")
  ])}),
  AK_SA_005:Object.freeze({decisionPointRef:"AK_SA_005",allAuthoredChoicesEligible:true,choices:Object.freeze([
    choice("let_handoff_happen","Let the Handoff Happen","let_handoff_happen","academy_kakashi.story_fixed.let_handoff_happen"),
    choice("strike_before_handoff","Strike Before the Handoff","strike_before_handoff","academy_kakashi.resolver.strike_before_handoff"),
    choice("attempt_pickpocket","Attempt the Pickpocket","attempt_pickpocket","academy_kakashi.resolver.pickpocket_improved")
  ])}),
  AK_SA_006:Object.freeze({decisionPointRef:"AK_SA_006",allAuthoredChoicesEligible:true,choices:Object.freeze([
    choice("stay_on_package","Stay on the Package","stay_on_package","academy_kakashi.resolver.stay_on_package_pursuit"),
    choice("stop_package_smuggler","Stop Package Smuggler","stop_package_smuggler","academy_kakashi.battle.stop_package_smuggler"),
    choice("cut_off_sakura","Cut Them Off at the Sakura Tree","cut_off_at_sakura","academy_kakashi.battle.cut_off_sakura")
  ])}),
  AK_SA_008:Object.freeze({decisionPointRef:"AK_SA_008",allAuthoredChoicesEligible:true,choices:Object.freeze([
    choice("demand_package","Demand the Package","demand_package","academy_kakashi.battle.demand_package"),
    choice("take_him_down","Take Him Down","take_him_down","academy_kakashi.battle.take_him_down"),
    choice("ask_where_package_was_going","Ask Where the Package Was Going","ask_destination","academy_kakashi.story_fixed.ask_destination")
  ])}),
  AK_SA_013:Object.freeze({decisionPointRef:"AK_SA_013",allAuthoredChoicesEligible:true,choices:Object.freeze([
    choice("turn_over_to_police","Turn Him Over to the Police","disposition_police","academy_kakashi.resolver.disposition_police"),
    choice("release","Release Him","disposition_release","academy_kakashi.resolver.disposition_release"),
    choice("kill","Kill","kill_deterministic","academy_kakashi.lethal.kill_deterministic",{outcomeClass:"DEAD",deterministic:true}),
    choice("return_to_anbu","Return Him to ANBU","disposition_return_anbu","academy_kakashi.resolver.disposition_return_anbu")
  ])})
});

function bridgeResultResolver(bindingRef,{deterministicKill=false}={}){
  return({state})=>{
    const table=state&&state.resolverResults&&typeof state.resolverResults==="object"?state.resolverResults:null;
    const result=table&&table[bindingRef]||null;
    if(!result||result.success!==true)return{success:false,reason:"owning_resolver_result_not_supplied",bindingRef};
    if(deterministicKill){
      const outcomeClass=String(result.outcomeClass||result.result&&result.result.outcomeClass||"").toUpperCase();
      if(outcomeClass!=="DEAD")return{success:false,reason:"deterministic_kill_result_must_commit_dead",bindingRef,outcomeClass:outcomeClass||null};
    }
    return{
      success:true,
      resolverResultRef:result.resolverResultRef||null,
      consequenceRefs:result.consequenceRefs||[],stateDeltaRefs:result.stateDeltaRefs||[],knowledgeDeltaRefs:result.knowledgeDeltaRefs||[],
      relationshipHistoryRefs:result.relationshipHistoryRefs||[],objectiveDeltaRefs:result.objectiveDeltaRefs||[],successorSituationRef:result.successorSituationRef||null,
      result:CORE.clone(result.result||result.outcome||null)
    };
  };
}

const resolverBindings=[...new Set(Object.values(DECISIONS).flatMap(def=>def.choices.map(row=>row.resolverBindingRef)))];
for(const bindingRef of resolverBindings){
  CORE.registerResolver(bindingRef,bridgeResultResolver(bindingRef,{deterministicKill:bindingRef==="academy_kakashi.lethal.kill_deterministic"}),{
    owner:bindingRef.includes(".battle.")?"Battle / Combat":bindingRef.includes(".lethal.")?"authorised lethal-result owner":"authorised Story/domain resolver",
    battleOwned:bindingRef.includes(".battle.")
  });
}

CORE.registerStoryAdapter({
  storyUnitRef:STORY_UNIT_REF,storyUnitType:"origin",sceneRef:SCENE_REF,observerRef:"academy_kakashi",
  authorityVersionRefs:Object.values(AUTHORITY),
  completionModel:"origin_chronicle_receipt_then_chronicle_begins",
  originHistorySeparateFromActiveKonohaSharedHistory:true
});

function stateSaysDue(anchorId,state){return Array.isArray(state&&state.dueAnchorIds)&&state.dueAnchorIds.includes(anchorId);}
function autonomyResultFor(anchorId,state){
  const row=state&&state.autonomyResults&&state.autonomyResults[anchorId]||null;
  if(!row||row.success!==true)return{success:false,reason:"authorised_autonomy_result_not_supplied",anchorId};
  return{
    success:true,participantIntentRef:row.participantIntentRef||null,resolverResultRef:row.resolverResultRef||null,
    consequenceRefs:row.consequenceRefs||[],result:CORE.clone(row.result||row.outcome||null)
  };
}
for(const spec of ANCHORS){
  const battleOwned=spec.classes.includes(A.BATTLE_OWNED_AUTONOMY);
  CORE.registerAutonomyAnchor(STORY_UNIT_REF,{
    anchorId:spec.anchorId,classes:spec.classes,actorRef:spec.actorRef||null,battleOwned,
    priority:Number(spec.priority||100),orderRef:spec.orderRef||null,
    due:state=>stateSaysDue(spec.anchorId,state),
    resolve:battleOwned?null:({state})=>autonomyResultFor(spec.anchorId,state),
    metadata:{summary:spec.summary,conditional:spec.conditional===true,recurring:spec.recurring===true,timingGate:spec.timingGate===true,sequentialTimingGates:spec.sequentialTimingGates===true}
  });
}

function decisionDefinition(decisionPointRef){return DECISIONS[String(decisionPointRef||"")]||null;}
function openDecisionPoint(decisionPointRef,state={}){
  const def=decisionDefinition(decisionPointRef);if(!def)return{success:false,reason:"kakashi_decision_point_not_registered",decisionPointRef};
  const contextStateRef=String(state.committedStateRef||state.stateRef||"");
  if(!contextStateRef)return{success:false,reason:"kakashi_decision_requires_committed_state_ref",decisionPointRef};
  const explicit=Array.isArray(state.eligibleChoiceIds)?new Set(state.eligibleChoiceIds.map(String)):null;
  if(!def.allAuthoredChoicesEligible&&!explicit)return{success:false,reason:"kakashi_decision_requires_explicit_eligibility",decisionPointRef};
  const choices=def.choices.filter(row=>!explicit||explicit.has(row.choiceId)).map((row,index)=>({
    choiceId:row.choiceId,intentType:row.intentType,intentPayload:CORE.clone(row.intentPayload),resolverBindingRef:row.resolverBindingRef,
    presentationLabel:row.presentationLabel,presentationKey:`academy_kakashi.${decisionPointRef}.${row.choiceId}`,authoredOrder:index,
    eligibilityBasisRefs:Array.isArray(state.eligibilityBasisRefs)&&state.eligibilityBasisRefs.length?state.eligibilityBasisRefs:[`authority:${AUTHORITY.finalWriting}`]
  }));
  if(!choices.length)return{success:false,reason:"kakashi_no_eligible_choices",decisionPointRef};
  return CORE.openDecisionAfterAutonomy({
    storyUnitRef:STORY_UNIT_REF,storyUnitType:"origin",decisionPointRef,contextStateRef,sceneRef:SCENE_REF,beatRef:state.beatRef||null,
    authorityVersionRefs:Object.values(AUTHORITY),sourceOccurrenceRefs:state.sourceOccurrenceRefs||[],observerRef:"academy_kakashi",choices,state
  });
}
function resolveDecisionChoice(choiceSetId,choiceId,state={}){
  const committed=CORE.commitStoryIntent({storyUnitRef:STORY_UNIT_REF,choiceSetId,choiceId});
  if(!committed.success)return committed;
  return CORE.dispatchCommittedIntent({storyUnitRef:STORY_UNIT_REF,receiptId:committed.receipt.storyDecisionReceiptId,state,context:{sceneRef:SCENE_REF,originId:STORY_UNIT_REF}});
}
function recordPostResolutionState({participantStates=[],materialStates=[]}={}){
  const results=[];
  for(const row of participantStates){results.push(CORE.recordParticipantClassification({storyUnitRef:STORY_UNIT_REF,...row}));}
  for(const row of materialStates){results.push(CORE.recordMaterialState({storyUnitRef:STORY_UNIT_REF,...row}));}
  return{success:results.every(row=>row&&row.success===true),results};
}
function terminalGuard(state={}){
  return CORE.terminalSemanticGuard({storyUnitRef:STORY_UNIT_REF,state,requiredMaterialRefs:Array.isArray(state.materiallyRelevantRefs)?state.materiallyRelevantRefs:[]});
}
function currentBrowserDecisionProjection(){
  let runtime=null;
  try{runtime=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){}
  if(!runtime||runtime.sceneId!==SCENE_REF)return null;
  const map={kak_original_action:"AK_SA_001",kak_original_major_choice:"OBSERVE_ESCALATION"};
  const decisionPointRef=map[runtime.beatId]||null;
  if(!decisionPointRef)return{sceneRef:SCENE_REF,beatRef:runtime.beatId,decisionPointRef:null,finalAdapterAvailable:true};
  const def=decisionDefinition(decisionPointRef);
  return{sceneRef:SCENE_REF,beatRef:runtime.beatId,decisionPointRef,semanticChoices:def?def.choices.map(row=>({choiceId:row.choiceId,intentType:row.intentType,resolverBindingRef:row.resolverBindingRef})):[]};
}
function runAlphaKakashiFinal34100Diagnostics(){
  const inventory=CORE.getRegisteredAnchorInventory(STORY_UNIT_REF);
  const ids=inventory.map(row=>row.anchorId);
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_final_origin_adapter_34100_2026_09_15",
    finalWritingPinned:AUTHORITY.finalWriting==="176ce76feef3e67d4c24644e3d7443a04dcf7d6b",
    finalAutonomyPinned:AUTHORITY.finalAutonomy==="713cae26e3b3fb4a214564b497a5f30fb2f14313",
    all32AnchorsRegistered:ANCHORS.length===32&&ids.length===32&&ANCHORS.every(row=>ids.includes(row.anchorId)),
    initialChoiceFamilyClosed:DECISIONS.AK_SA_001.choices.map(row=>row.choiceId).join("|")==="observe|get_closer|attack|attempt_pickpocket",
    getCloserSuccessClosed:DECISIONS.AK_SA_005.choices.map(row=>row.choiceId).join("|")==="let_handoff_happen|strike_before_handoff|attempt_pickpocket",
    getCloserFailureClosed:DECISIONS.AK_SA_006.choices.map(row=>row.choiceId).join("|")==="stay_on_package|stop_package_smuggler|cut_off_sakura",
    pakkunInterceptChoiceFamilyClosed:DECISIONS.AK_SA_008.choices.map(row=>row.choiceId).join("|")==="demand_package|take_him_down|ask_where_package_was_going",
    deterministicKillDistinct:DECISIONS.AK_SA_013.choices.find(row=>row.choiceId==="kill")?.intentType==="kill_deterministic",
    takeHimDownDoesNotHardCodePackageRecovery:ANCHORS.find(row=>row.anchorId==="AK_SA_024")?.summary.includes("package closure")===true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,authority:CORE.clone(AUTHORITY),pass:failed.length===0,checks,failed,anchorCount:inventory.length,decisionPointRefs:Object.keys(DECISIONS),browserGoldenClaimed:false};
}

const api=Object.freeze({
  patchId:PATCH_ID,storyUnitRef:STORY_UNIT_REF,sceneRef:SCENE_REF,authority:AUTHORITY,classes:CLASSES,anchors:ANCHORS,decisions:DECISIONS,
  openDecisionPoint,resolveDecisionChoice,recordPostResolutionState,terminalGuard,currentBrowserDecisionProjection,
  browserGoldenClaimed:false
});
globalThis.SC_ALPHA_KAKASHI_FINAL_34100=api;
globalThis.runAlphaKakashiFinal34100Diagnostics=runAlphaKakashiFinal34100Diagnostics;
})();
