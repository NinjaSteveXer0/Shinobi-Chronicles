// ============================================================================
// ISSUE #188 / #201 — ACADEMY KAKASHI OBSERVE STORY->BATTLE CONSUMER — 34410 v3
//
// Canonical Kakashi Observe Battle consumer. It currently owns:
// - released sequential DEAL WITH HER FIRST, THEN CHASE THE PACKAGE route;
// - prepared-but-guarded GO FOR THE PACKAGE exact 2-v-1 Battle seam.
//
// Both routes preserve the neutral 34000 semantic-intent transaction and the
// factual 34300 Battle receipt. GO FOR THE PACKAGE is deliberately NOT released
// until AK_SA_025 post-resolution classification/custody commit exists; this
// file must not invent package custody, participant custody, death, rewards or
// Story success from Battle victory/defeat alone.
// ============================================================================
(function installAcademyKakashiSequentialConsumer34410(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410)return;

const PATCH_ID="alpha_kakashi_final_sequential_consumer_34410_v3_2026_09_16";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const STORY_UNIT_REF="academy_kakashi";
const OBSERVE_BEAT="kak_get_closer_handoff_observe_escalation";
const SEQUENTIAL_CHOICE="defeat_assassin_then_secure";
const SECURE_PACKAGE_CHOICE="secure_package";
const SEQUENTIAL_INTENT_REQUEST="kakashi_observe_sequential_intent_34410";
const SEQUENTIAL_BATTLE_RETURN_REQUEST="kakashi_observe_sequential_mi_battle_return_34410";
const SECURE_PACKAGE_INTENT_REQUEST="kakashi_observe_secure_package_intent_34410";
const SECURE_PACKAGE_BATTLE_RETURN_REQUEST="kakashi_observe_secure_package_battle_return_34410";
const SAKURA={assetId:"kakashi_origin_sakura_tree_night"};
const CONFIG=Object.freeze({
  securePackage:"academy_kakashi_origin_battle_ps_mi_2v1",
  mi:"academy_kakashi_origin_battle_seq_mi",
  ps:"academy_kakashi_origin_battle_seq_ps",
  amt:"academy_kakashi_origin_battle_seq_amt_pakkun"
});
const BINDING=Object.freeze({
  sequential:"academy_kakashi.battle.defeat_assassin_then_secure",
  securePackage:"academy_kakashi.battle.secure_package"
});
const INTENT_SPECS=Object.freeze({
  [SEQUENTIAL_CHOICE]:Object.freeze({
    bindingRef:BINDING.sequential,
    receiptKey:"kakashiObserveSequentialStoryDecisionReceiptId",
    intentKey:"kakashiObserveSequentialIntentCommitRef"
  }),
  [SECURE_PACKAGE_CHOICE]:Object.freeze({
    bindingRef:BINDING.securePackage,
    receiptKey:"kakashiObserveSecurePackageStoryDecisionReceiptId",
    intentKey:"kakashiObserveSecurePackageIntentCommitRef"
  })
});

function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_e){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function latestResult(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function isVictory(result){return !!result&&result.resultState==="player_side_victory";}
function within(result,max){return isVictory(result)&&Number(result.playerActionOpportunityCount)<=max;}
function available(value,knownBlocker=null){return()=>({available:value===true,knownBlocker:value===true?null:knownBlocker});}
function dynamicAvailability(test,blocker){return()=>({available:test()===true,knownBlocker:test()===true?null:blocker});}
function normalizedBeat(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}

function launchStage(stage,{active:rt,returnContext}={}){
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_sequential_story_occurrence_missing"};
  if(typeof launchAcademyKakashiOriginPlBattle!=="function")return{success:false,reason:"kakashi_combat_deployment_34300_missing"};
  const spec=stage==="mi"
    ?{anchor:"AK_SA_015",config:CONFIG.mi,pakkun:false}
    :stage==="ps"
      ?{anchor:"AK_SA_022",config:CONFIG.ps,pakkun:false}
      :stage==="amt"
        ?{anchor:"AK_SA_022",config:CONFIG.amt,pakkun:true}
        :null;
  if(!spec)return{success:false,reason:"kakashi_sequential_stage_unknown"};
  return launchAcademyKakashiOriginPlBattle({
    storyOccurrenceId:rt.instanceId,
    sourceAnchorRef:spec.anchor,
    bindingRef:BINDING.sequential,
    battleConfigId:spec.config,
    returnToken:`${rt.instanceId}:sequential:${stage}`,
    returnContext,
    pakkunAuthorized:spec.pakkun
  });
}
function launchSecurePackage34410({active:rt,returnContext}={}){
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_secure_package_story_occurrence_missing"};
  if(typeof launchAcademyKakashiOriginPlBattle!=="function")return{success:false,reason:"kakashi_combat_deployment_34300_missing"};
  return launchAcademyKakashiOriginPlBattle({
    storyOccurrenceId:rt.instanceId,
    sourceAnchorRef:"AK_SA_014",
    bindingRef:BINDING.securePackage,
    battleConfigId:CONFIG.securePackage,
    returnToken:`${rt.instanceId}:observe:secure_package`,
    returnContext,
    pakkunAuthorized:false
  });
}
function projector(){return typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult():null;}

function ensureObserveIntentForChoice34410(choiceId){
  const rt=active();
  if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==OBSERVE_BEAT)return{success:false,reason:"kakashi_observe_choice_context_missing"};
  const spec=INTENT_SPECS[String(choiceId||"")];
  if(!spec)return{success:false,reason:"kakashi_observe_choice_intent_spec_missing"};
  const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
  const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
  if(!CORE||typeof CORE.commitStoryIntent!=="function"||!KAK||typeof KAK.openDecisionPoint!=="function")return{success:false,reason:"kakashi_observe_semantic_authority_missing"};
  const existingId=String(rt.localContext&&rt.localContext[spec.receiptKey]||"");
  if(existingId){
    const snap=CORE.getStoryUnitSnapshot(STORY_UNIT_REF)||{};
    const existing=snap.decisionReceipts&&snap.decisionReceipts[existingId];
    if(existing&&existing.selectedChoiceId===choiceId&&existing.resolverBindingRef===spec.bindingRef)return{success:true,idempotent:true,receipt:existing};
  }
  const committedStateRef=String(rt.localContext&&rt.localContext.kakashiGetCloserHandoffOccurrenceId||"");
  if(!committedStateRef)return{success:false,reason:"kakashi_observe_handoff_occurrence_missing"};
  let choiceSetId=String(rt.localContext&&rt.localContext.kakashiObserveEscalationChoiceSetId||"");
  if(!choiceSetId){
    const opened=KAK.openDecisionPoint("OBSERVE_ESCALATION",{committedStateRef,beatRef:OBSERVE_BEAT,sourceOccurrenceRefs:[committedStateRef]});
    if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_observe_choice_set_open_failed"};
    choiceSetId=opened.choiceSet.choiceSetId;
  }
  const committed=CORE.commitStoryIntent({storyUnitRef:STORY_UNIT_REF,choiceSetId,choiceId});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_observe_intent_commit_failed"};
  rt.localContext={
    ...(rt.localContext||{}),
    kakashiObserveEscalationChoiceSetId:choiceSetId,
    [spec.receiptKey]:committed.receipt.storyDecisionReceiptId,
    [spec.intentKey]:committed.receipt.intentCommitRef
  };
  save();
  return{success:true,receipt:committed.receipt,choiceSetId};
}
function ensureObserveIntent34410(){return ensureObserveIntentForChoice34410(SEQUENTIAL_CHOICE);}
function ensureSecurePackageObserveIntent34410(){return ensureObserveIntentForChoice34410(SECURE_PACKAGE_CHOICE);}

function closeObserveBattleIntent34410({choiceId,bindingRef,battleConfigId,receiptKey,successorSituationRef,resolvedContextPatch}={}){
  const rt=active();
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_observe_battle_return_story_missing"};
  const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
  if(!CORE||typeof CORE.dispatchCommittedIntent!=="function")return{success:false,reason:"kakashi_observe_semantic_dispatch_missing"};
  const receiptId=String(rt.localContext&&rt.localContext[receiptKey]||"");
  if(!receiptId)return{success:false,reason:"kakashi_observe_story_decision_receipt_missing"};
  const result=latestResult();
  if(!result||!result.battleOccurrenceId)return{success:false,reason:"kakashi_observe_factual_battle_receipt_missing"};
  if(String(result.bindingRef||"")!==bindingRef||String(result.battleConfigId||"")!==battleConfigId)return{success:false,reason:"kakashi_observe_battle_receipt_mismatch"};
  const bridge={
    success:true,
    resolverResultRef:String(result.battleOccurrenceId),
    consequenceRefs:[String(result.battleOccurrenceId)],
    stateDeltaRefs:[],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],
    successorSituationRef,
    result
  };
  const dispatched=CORE.dispatchCommittedIntent({
    storyUnitRef:STORY_UNIT_REF,
    receiptId,
    state:{resolverResults:{[bindingRef]:bridge}},
    context:{sceneRef:SCENE_ID,originId:STORY_UNIT_REF,storySceneInstanceId:String(rt.instanceId||""),battleOccurrenceId:String(result.battleOccurrenceId),selectedChoiceId:choiceId}
  });
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_observe_battle_semantic_dispatch_failed"};
  rt.localContext={...(rt.localContext||{}),...(resolvedContextPatch||{}),kakashiObserveLastBattleOccurrenceId:String(result.battleOccurrenceId)};
  save();
  return{success:true,idempotent:dispatched.idempotent===true,battleOccurrenceId:String(result.battleOccurrenceId),storyDecisionReceiptId:receiptId};
}
function closeObserveIntentFromMiBattle34410(){
  return closeObserveBattleIntent34410({
    choiceId:SEQUENTIAL_CHOICE,
    bindingRef:BINDING.sequential,
    battleConfigId:CONFIG.mi,
    receiptKey:"kakashiObserveSequentialStoryDecisionReceiptId",
    successorSituationRef:"kak_seq_mi_return",
    resolvedContextPatch:{kakashiObserveSequentialIntentResolved:true}
  });
}
function closeSecurePackageIntentFromBattle34410(){
  return closeObserveBattleIntent34410({
    choiceId:SECURE_PACKAGE_CHOICE,
    bindingRef:BINDING.securePackage,
    battleConfigId:CONFIG.securePackage,
    receiptKey:"kakashiObserveSecurePackageStoryDecisionReceiptId",
    successorSituationRef:"kak_observe_secure_package_return",
    resolvedContextPatch:{kakashiObserveSecurePackageBattleIntentResolved:true}
  });
}

function observeBeatAndChoice(choiceId){
  const def=scene();
  const beat=def&&def.beatMap instanceof Map?def.beatMap.get(OBSERVE_BEAT):null;
  const choice=beat&&Array.isArray(beat.choices)?beat.choices.find(row=>row&&row.choiceId===choiceId):null;
  return{def,beat,choice};
}
function bindObserveEscalationChoice34410(){
  const {beat,choice}=observeBeatAndChoice(SEQUENTIAL_CHOICE);
  if(!beat)return{success:false,reason:"kakashi_observe_escalation_beat_missing"};
  if(!choice)return{success:false,reason:"kakashi_observe_sequential_choice_missing"};
  choice.label="DEAL WITH HER FIRST, THEN CHASE THE PACKAGE";
  choice.nextBeatId="kak_seq_mi_battle";
  choice.availability=available(true);
  choice.knownBlocker=null;
  choice.consequenceRequests=[{requestId:SEQUENTIAL_INTENT_REQUEST,kind:"domain",resolve:()=>ensureObserveIntent34410()}];
  return{success:true,choiceId:SEQUENTIAL_CHOICE,nextBeatId:choice.nextBeatId};
}
function bindObserveSecurePackageChoice34410(options={}){
  const {beat,choice}=observeBeatAndChoice(SECURE_PACKAGE_CHOICE);
  if(!beat)return{success:false,reason:"kakashi_observe_escalation_beat_missing"};
  if(!choice)return{success:false,reason:"kakashi_observe_secure_package_choice_missing"};
  if(options.release!==true){
    return{success:true,prepared:true,released:false,choiceId:SECURE_PACKAGE_CHOICE,nextBeatId:"kak_observe_secure_package_battle"};
  }
  choice.label="GO FOR THE PACKAGE";
  choice.nextBeatId="kak_observe_secure_package_battle";
  choice.availability=available(true);
  choice.knownBlocker=null;
  choice.consequenceRequests=[{requestId:SECURE_PACKAGE_INTENT_REQUEST,kind:"domain",resolve:()=>ensureSecurePackageObserveIntent34410()}];
  return{success:true,prepared:true,released:true,choiceId:SECURE_PACKAGE_CHOICE,nextBeatId:choice.nextBeatId};
}

function install(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_story_definition_missing"};
  const major=def.beatMap.get("kak_original_major_choice");
  if(!major||!Array.isArray(major.choices))return{success:false,reason:"kakashi_major_choice_missing"};
  const sequential=major.choices.find(c=>c&&c.choiceId==="defeat_assassin_then_recover");
  if(!sequential)return{success:false,reason:"kakashi_sequential_choice_missing"};

  sequential.label="DEAL WITH HER FIRST, THEN CHASE THE PACKAGE";
  sequential.nextBeatId="kak_seq_mi_battle";
  sequential.availability=available(true);
  sequential.knownBlocker=null;

  const beats=[
    {beatId:"kak_observe_secure_package_battle",mode:"battle_transition",environmentRef:SAKURA,
      text:"Kakashi commits to the package. The Masked Interceptor joins the Package Smuggler before he can disengage.",
      battle:{encounterId:CONFIG.securePackage,launchResolver:ctx=>launchSecurePackage34410(ctx),postBattleBeatId:"kak_observe_secure_package_return",resultProjector:projector,actionLabel:"SECURE THE PACKAGE"}},
    {beatId:"kak_observe_secure_package_return",mode:"narration",environmentRef:SAKURA,
      onEnterConsequences:[{requestId:SECURE_PACKAGE_BATTLE_RETURN_REQUEST,kind:"domain",resolve:()=>closeSecurePackageIntentFromBattle34410()}],
      presentationResolver:()=>{const r=latestResult();if(!r)return{text:"The 2-v-1 confrontation has not returned a factual result."};return isVictory(r)?{text:"Kakashi wins the 2-v-1. The Battle receipt is committed; package custody and both defeated participants still require the authorised AK_SA_025 post-resolution classification before another Story choice may open."}:{text:"Kakashi is forced to withdraw from the 2-v-1. Battle defeat is committed, but Story still must consume the exact package and participant state before debrief can proceed."};},
      text:"The package confrontation returns to Story for factual post-resolution classification.",exitScene:false,allowPresentationClose:false},
    {beatId:"kak_seq_mi_battle",mode:"battle_transition",environmentRef:SAKURA,
      text:"The Masked Interceptor cuts across Kakashi's line. If he wants the package trail, he has to get through her now.",
      battle:{encounterId:CONFIG.mi,launchResolver:ctx=>launchStage("mi",ctx),postBattleBeatId:"kak_seq_mi_return",resultProjector:projector,actionLabel:"CUT THROUGH THE INTERCEPTOR"}},
    {beatId:"kak_seq_mi_return",mode:"choice",environmentRef:SAKURA,
      onEnterConsequences:[{requestId:SEQUENTIAL_BATTLE_RETURN_REQUEST,kind:"domain",resolve:()=>closeObserveIntentFromMiBattle34410()}],
      presentationResolver:()=>{const r=latestResult();if(!r)return{text:"The confrontation has not returned a factual result."};if(!isVictory(r))return{text:"Kakashi is forced out of the confrontation. The package trail keeps moving while he withdraws."};if(within(r,4))return{text:`The Masked Interceptor is Battle-defeated in ${Number(r.playerActionOpportunityCount)||0} action opportunities. The Package Smuggler is still within reach.`};return{text:`Kakashi wins, but the fight costs ${Number(r.playerActionOpportunityCount)||0} action opportunities. The Package Smuggler has opened too much distance.`};},
      text:"The first confrontation returns to Story.",choices:[
        {choiceId:"kak_seq_chase_ps",label:"CHASE THE PACKAGE SMUGGLER",nextBeatId:"kak_seq_ps_battle",availability:dynamicAvailability(()=>within(latestResult(),4),"THE PACKAGE SMUGGLER IS NO LONGER WITHIN THE QUALIFYING WINDOW")},
        {choiceId:"kak_seq_report_after_mi",label:"RETURN AND REPORT",nextBeatId:"kak_seq_debrief_pending",availability:dynamicAvailability(()=>{const r=latestResult();return !!r&&!within(r,4);},"THE PACKAGE TRAIL IS STILL REACHABLE")}
      ]},
    {beatId:"kak_seq_ps_battle",mode:"battle_transition",environmentRef:SAKURA,
      text:"Kakashi catches the Package Smuggler before the trail closes.",
      battle:{encounterId:CONFIG.ps,launchResolver:ctx=>launchStage("ps",ctx),postBattleBeatId:"kak_seq_ps_return",resultProjector:projector,actionLabel:"STOP THE PACKAGE SMUGGLER"}},
    {beatId:"kak_seq_ps_return",mode:"choice",environmentRef:SAKURA,
      presentationResolver:()=>{const r=latestResult();if(!r)return{text:"The confrontation has not returned a factual result."};if(!isVictory(r))return{text:"Kakashi is forced to withdraw from the second confrontation. The first man keeps moving."};if(within(r,3))return{text:`The Package Smuggler is Battle-defeated in ${Number(r.playerActionOpportunityCount)||0} action opportunities. The original target is still reachable.`};return{text:`Kakashi wins, but ${Number(r.playerActionOpportunityCount)||0} action opportunities were consumed. The original target gets beyond the qualifying pursuit window.`};},
      text:"The second confrontation returns to Story.",choices:[
        {choiceId:"kak_seq_stay_amt",label:"STAY ON THE FIRST MAN",nextBeatId:"kak_seq_pakkun_arrival",availability:dynamicAvailability(()=>within(latestResult(),3),"THE ORIGINAL TARGET IS NO LONGER WITHIN THE QUALIFYING WINDOW")},
        {choiceId:"kak_seq_report_after_ps",label:"RETURN AND REPORT",nextBeatId:"kak_seq_debrief_pending",availability:dynamicAvailability(()=>{const r=latestResult();return !!r&&!within(r,3);},"THE ORIGINAL TARGET IS STILL REACHABLE")}
      ]},
    {beatId:"kak_seq_pakkun_arrival",mode:"dialogue",environmentRef:SAKURA,speakerName:"PAKKUN",
      text:"You're still on him. Move.",nextBeatId:"kak_seq_amt_battle"},
    {beatId:"kak_seq_amt_battle",mode:"battle_transition",environmentRef:SAKURA,
      text:"Kakashi and the unfamiliar ninken catch the ANBU-marked target. Pakkun is present as a temporary action source, not an owned summon.",
      battle:{encounterId:CONFIG.amt,launchResolver:ctx=>launchStage("amt",ctx),postBattleBeatId:"kak_seq_amt_return",resultProjector:projector,actionLabel:"CONFRONT THE ORIGINAL TARGET"}},
    {beatId:"kak_seq_amt_return",mode:"narration",environmentRef:SAKURA,
      presentationResolver:()=>{const r=latestResult();if(!r)return{text:"The final confrontation has not returned a factual result."};return isVictory(r)?{text:"The original target is Battle-defeated. His life, custody and the package remain separate Story facts; the Battle does not decide them automatically."}:{text:"Kakashi is forced to withdraw from the final confrontation. Battle defeat does not mean injury or death, and no custody or package result is invented."};},
      text:"The final confrontation returns to Story.",nextBeatId:"kak_seq_debrief_pending"},
    {beatId:"kak_seq_debrief_pending",mode:"narration",environmentRef:SAKURA,
      text:"Kakashi turns back toward the ANBU rendezvous. The factual debrief must consume the Battle ledger and separately resolved package and participant states before the Origin can close.",exitScene:false,allowPresentationClose:false}
  ];
  beats.forEach((b,i)=>{const n=normalizedBeat(b,900+i);if(n)def.beatMap.set(n.beatId,n);});
  return{success:true,beatIds:beats.map(b=>b.beatId),choiceId:sequential.choiceId,securePackagePrepared:true};
}

function diagnostics(){
  const def=scene(),major=def&&def.beatMap instanceof Map?def.beatMap.get("kak_original_major_choice"):null;
  const legacy=major&&Array.isArray(major.choices)?major.choices.find(x=>x&&x.choiceId==="defeat_assassin_then_recover"):null;
  const observe=def&&def.beatMap instanceof Map?def.beatMap.get(OBSERVE_BEAT):null;
  const sequential=observe&&Array.isArray(observe.choices)?observe.choices.find(x=>x&&x.choiceId===SEQUENTIAL_CHOICE):null;
  const secure=observe&&Array.isArray(observe.choices)?observe.choices.find(x=>x&&x.choiceId===SECURE_PACKAGE_CHOICE):null;
  const ids=def&&def.beatMap instanceof Map?[...def.beatMap.keys()]:[];
  const secureBound=!secure||typeof secure.availability!=="function"||secure.availability().available!==true||
    secure.nextBeatId==="kak_observe_secure_package_battle"&&Array.isArray(secure.consequenceRequests)&&secure.consequenceRequests.some(r=>r&&r.requestId===SECURE_PACKAGE_INTENT_REQUEST);
  const secureReturn=def&&def.beatMap instanceof Map?def.beatMap.get("kak_observe_secure_package_return"):null;
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_final_sequential_consumer_34410_v3_2026_09_16",
    legacySequentialChoiceStillBound:!!legacy&&legacy.nextBeatId==="kak_seq_mi_battle"&&typeof legacy.availability==="function"&&legacy.availability().available===true,
    factualObserveSequentialEitherNotYetCreatedOrBound:!observe||!!sequential&&sequential.nextBeatId==="kak_seq_mi_battle"&&typeof sequential.availability==="function"&&sequential.availability().available===true,
    securePackageExactConfig:CONFIG.securePackage==="academy_kakashi_origin_battle_ps_mi_2v1",
    securePackageAnchorExact:launchSecurePackage34410.toString().includes('sourceAnchorRef:"AK_SA_014"'),
    securePackageBindingExact:BINDING.securePackage==="academy_kakashi.battle.secure_package",
    securePackageChoiceGuardedOrExact:secureBound,
    securePackageReturnFailClosed:!!secureReturn&&secureReturn.exitScene===false&&secureReturn.allowPresentationClose===false&&!secureReturn.nextBeatId,
    securePackageNoWorldTruthInvented:!closeSecurePackageIntentFromBattle34410.toString().includes("commitOccurrence")&&!closeSecurePackageIntentFromBattle34410.toString().includes("packageCustody"),
    securePackageSemanticIntentBeforeBattle:ensureSecurePackageObserveIntent34410.toString().includes("ensureObserveIntentForChoice34410")&&ensureObserveIntentForChoice34410.toString().includes("commitStoryIntent"),
    securePackageFactualBattleReceiptClosesIntent:closeObserveBattleIntent34410.toString().includes("battleOccurrenceId")&&closeObserveBattleIntent34410.toString().includes("dispatchCommittedIntent"),
    exactThreeSequentialConfigs:[CONFIG.mi,CONFIG.ps,CONFIG.amt].every(Boolean),
    allInserted:["kak_observe_secure_package_battle","kak_observe_secure_package_return","kak_seq_mi_battle","kak_seq_mi_return","kak_seq_ps_battle","kak_seq_ps_return","kak_seq_pakkun_arrival","kak_seq_amt_battle","kak_seq_amt_return","kak_seq_debrief_pending"].every(id=>ids.includes(id)),
    sequentialSemanticIntentBeforeBattle:ensureObserveIntent34410.toString().includes("ensureObserveIntentForChoice34410")&&bindObserveEscalationChoice34410.toString().includes("SEQUENTIAL_INTENT_REQUEST"),
    factualMiBattleReceiptClosesIntent:closeObserveBattleIntent34410.toString().includes("battleOccurrenceId")&&closeObserveBattleIntent34410.toString().includes("dispatchCommittedIntent"),
    miGate4:within({resultState:"player_side_victory",playerActionOpportunityCount:4},4)&&!within({resultState:"player_side_victory",playerActionOpportunityCount:5},4),
    psGate3:within({resultState:"player_side_victory",playerActionOpportunityCount:3},3)&&!within({resultState:"player_side_victory",playerActionOpportunityCount:4},3),
    noTerminalFalseCommit:!JSON.stringify([...(def&&def.beatMap instanceof Map?def.beatMap.values():[]).filter(b=>String(b.beatId||"").startsWith("kak_seq_")||String(b.beatId||"").startsWith("kak_observe_secure_package")).map(b=>({id:b.beatId,exit:b.exitScene,onEnter:b.onEnterConsequences}))]).includes("completeChronicleOriginPrologue"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,securePackageReleased:!!secure&&typeof secure.availability==="function"&&secure.availability().available===true,browserGoldenClaimed:false};
}

const installed=install();
globalThis.runAcademyKakashiSequentialConsumer34410Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410=Object.freeze({
  patchId:PATCH_ID,installed,configs:CONFIG,bindings:BINDING,
  bindObserveEscalationChoice:bindObserveEscalationChoice34410,
  bindObserveSecurePackageChoice:bindObserveSecurePackageChoice34410,
  ensureObserveIntent:ensureObserveIntent34410,
  ensureSecurePackageObserveIntent:ensureSecurePackageObserveIntent34410,
  closeObserveIntentFromMiBattle:closeObserveIntentFromMiBattle34410,
  closeSecurePackageIntentFromBattle:closeSecurePackageIntentFromBattle34410,
  browserGoldenClaimed:false
});
})();
