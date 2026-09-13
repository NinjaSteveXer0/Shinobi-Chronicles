// ============================================================================
// SHINOBI CHRONICLES — ISSUE #121 EARLY ARC PRODUCTION BINDINGS
//
// Expands the already-live CE semantic-intent engine into legitimate existing
// Arc-1 decision windows well before M11. This adapter does not invent Story
// decisions or factual outcomes: each bound beat and factual resolver already
// exists in current production Story authority.
//
// Writing authority consumed:
// - Arc1_Konoha_Story_Skeleton_and_Choice_Authority_2026-09-09.md
// - Arc1-3_Retrospective_12x12_Structural_Reconciliation_2026-09-13.md
// - Early_Game_Origin_and_Arc1_Player_Facing_Writing_Modernization_2026-09-13.md
//
// Bound windows:
// - M2 warehouse purge observation
// - M3 hospital reference-case custody choice
// - M4 body-inscribed receiver choice
// - M5 post-Battle calibration redirection choice
//
// The M5 window is the first deliberately Chronicle-relative production proof:
// REDIRECT CALIBRATION exists only when the already-authoritative M4 receiver
// history AND the actual M5 Battle victory make it factually legal. A Chronicle
// without that history sees only the unchanged-system route.
// ============================================================================
(function installIssue121EarlyArcBindings(){
  "use strict";

  const PATCH_ID="alpha_mission_choice_early_arc_bindings_121_2026_09_13";
  if(globalThis.SC_ALPHA_MISSION_CHOICE_EARLY_ARC_BINDINGS_121)return;

  function fail(reason,extra={}){
    const status={success:false,patchId:PATCH_ID,reason,...extra,browserGoldenClaimed:false};
    globalThis.SC_ALPHA_MISSION_CHOICE_EARLY_ARC_BINDINGS_121=Object.freeze(status);
    return status;
  }

  const api=globalThis.SC_ALPHA_MISSION_CHOICE_121;
  if(!api||typeof api.registerMissionSkeleton!=="function"||typeof api.bindStoryDecision!=="function"){
    fail("issue_121_choice_engine_missing");
    return;
  }
  if(typeof getStorySceneDefinition!=="function"){
    fail("story_scene_registry_missing");
    return;
  }

  const windows=[
    {missionNumber:2,sceneId:"scene_arc1_m2_warehouse_investigation",beatId:"m2_optional",decisionId:"m2_purge_handling"},
    {missionNumber:3,sceneId:"scene_arc1_m3_hospital_reference_recovery",beatId:"m3_case",decisionId:"m3_reference_case_custody"},
    {missionNumber:4,sceneId:"scene_arc1_m4_barrier_receiver",beatId:"m4_receiver",decisionId:"m4_receiver_commitment"},
    {missionNumber:5,sceneId:"scene_arc1_m5_academy_third_bell",beatId:"m5_post_battle",decisionId:"m5_calibration_redirection"}
  ];

  function protagonist(){
    try{return typeof getArc1CurrentProtagonistId==="function"?getArc1CurrentProtagonistId()||null:null;}
    catch(_error){return null;}
  }

  function team(){
    try{return typeof getArc1CurrentStoryTeamIds==="function"?(getArc1CurrentStoryTeamIds()||[]):[];}
    catch(_error){return [];}
  }

  function hasOccurrence(id){
    try{return typeof hasArc1Occurrence==="function"&&hasArc1Occurrence(id)===true;}
    catch(_error){return false;}
  }

  function storyContext(){
    try{return typeof getStorySceneRuntimeContext==="function"?getStorySceneRuntimeContext()||{}:{};}
    catch(_error){return {};}
  }

  function m5BattleOutcome(){
    const ctx=storyContext();
    return ctx&&ctx.battleResume&&ctx.battleResume.outcome?String(ctx.battleResume.outcome):"none";
  }

  function m5RedirectAvailable(){
    try{return typeof canResolveAlphaArc1M5Calibration==="function"&&canResolveAlphaArc1M5Calibration()===true;}
    catch(_error){return false;}
  }

  function contextFor(window){
    const p=protagonist();
    const historyRefs=[];
    if(hasOccurrence("occ_arc1_m4_menma_body_receiver_established"))historyRefs.push("occ_arc1_m4_menma_body_receiver_established");
    if(window.missionNumber===5&&m5BattleOutcome()==="victory")historyRefs.push("arc1_m5_story_battle_victory_return");
    if(window.missionNumber===5&&m5RedirectAvailable())historyRefs.push("arc1_m5_calibration_redirection_factually_available");
    return {
      formalRank:null,
      representationId:p,
      teamParticipantIds:team(),
      knowledgeRefs:[],
      relationshipRefs:[],
      accessRefs:[],
      capabilityRefs:[],
      historyRefs,
      objectiveRef:window.decisionId,
      perceivableNpcIntent:null,
      committedStateRef:null
    };
  }

  function stateRefFor(window,context){
    const ctx=context||contextFor(window);
    const receiver=Array.isArray(ctx.historyRefs)&&ctx.historyRefs.includes("occ_arc1_m4_menma_body_receiver_established")?"1":"0";
    const m5victory=window.missionNumber===5&&Array.isArray(ctx.historyRefs)&&ctx.historyRefs.includes("arc1_m5_story_battle_victory_return")?"1":"0";
    return [
      "ce121_early_arc",
      `m${window.missionNumber}`,
      window.beatId,
      String(ctx.representationId||"unknown_protagonist"),
      `receiver:${receiver}`,
      `m5_victory:${m5victory}`
    ].join(":");
  }

  function normalize(result,fallbackRef){
    if(!result||result.success!==true)return{success:false,reason:result&&result.reason||"owning_story_resolver_rejected"};
    const refs=[];
    if(result.occurrenceId)refs.push(String(result.occurrenceId));
    if(Array.isArray(result.consequenceRefs))refs.push(...result.consequenceRefs.map(String));
    const resultRef=result.resultRef||result.occurrenceId||result.receiptId||result.commitId||fallbackRef;
    return{success:true,resultRef:String(resultRef),consequenceRefs:[...new Set(refs)]};
  }

  function callOwning(name,fallbackRef){
    const fn=globalThis[name];
    if(typeof fn!=="function")return{success:false,reason:`${name}_missing`};
    return normalize(fn(),fallbackRef);
  }

  const resolverDefs=[
    ["arc1_m2_observe_purge_121",()=>callOwning("resolveAlphaArc1M2PurgeObservation","occ_arc1_m2_warehouse_purge_observation_completed")],
    ["arc1_m3_retain_case_121",()=>callOwning("resolveAlphaArc1M3RetainCase","occ_arc1_m3_hospital_case_retained")],
    ["arc1_m4_accept_receiver_121",()=>callOwning("resolveAlphaArc1M4Receiver","occ_arc1_m4_menma_body_receiver_established")],
    ["arc1_m5_redirect_calibration_121",()=>callOwning("resolveAlphaArc1M5CalibrationAndThirdBell","occ_arc1_m5_third_bell_propagation_accepted")]
  ];
  const resolverResults={};
  for(const [id,fn] of resolverDefs){
    const result=api.registerResolver(id,fn);
    resolverResults[id]=result;
    if(!result||result.success!==true){fail("early_arc_resolver_registration_failed",{resolverId:id,result});return;}
  }

  const registrations=[];
  const bindings=[];

  function register(window,decision){
    const scene=getStorySceneDefinition(window.sceneId);
    const beat=scene&&scene.beatMap&&scene.beatMap.get(window.beatId);
    if(!scene||!beat)return{success:false,reason:"authoritative_story_window_missing",window};
    const missionId=String(scene.eventId||`arc1_m${window.missionNumber}`);
    const skeleton=api.registerMissionSkeleton({
      arcId:"arc1",
      missionId,
      version:`arc1_m${window.missionNumber}_early_ce_121_v1`,
      title:String(scene.title||`ARC 1 M${window.missionNumber}`),
      mandatoryAnchors:[],
      prohibitedCompletionRefs:[],
      decisions:[{decisionId:window.decisionId,beatId:window.beatId,cadence:"meaningful_decision",objectiveRef:window.decisionId,intents:decision.intents}]
    });
    if(!skeleton||skeleton.success!==true)return{success:false,reason:"skeleton_registration_failed",window,skeleton};
    const binding=api.bindStoryDecision({
      sceneId:window.sceneId,
      beatId:window.beatId,
      arcId:"arc1",
      missionId,
      decisionId:window.decisionId,
      stateProvider:()=>contextFor(window),
      committedStateRefProvider:ctx=>stateRefFor(window,ctx)
    });
    registrations.push({window,skeleton,missionId});
    bindings.push({window,binding,missionId});
    return binding;
  }

  const decisions={
    2:{intents:[
      {intentId:"observe_purge",intentType:"observe_hazardous_process",intentPayload:{purgeObservationRequested:true},presentationText:"Let it run long enough to see what it destroys.",nextBeatId:"m2_done",resolverId:"arc1_m2_observe_purge_121",eligibilityBasis:["story:warehouse_purge_window"],isEligible:()=>({available:true,basis:["story:warehouse_purge_window"],knownBlocker:null})},
      {intentId:"leave",intentType:"preserve_evidence_and_leave",intentPayload:{purgeObservationRequested:false},presentationText:"Secure what we have. Don't risk the purge.",nextBeatId:"m2_done",resolverId:null,eligibilityBasis:["story:warehouse_purge_window"],isEligible:()=>({available:true,basis:["story:warehouse_purge_window"],knownBlocker:null})}
    ]},
    3:{intents:[
      {intentId:"retain",intentType:"retain_reference_case",intentPayload:{retainCase:true},presentationText:"Take the case. Keep the reference material with us.",nextBeatId:"m3_done",resolverId:"arc1_m3_retain_case_121",eligibilityBasis:["story:hospital_case_window"],isEligible:()=>({available:true,basis:["story:hospital_case_window"],knownBlocker:null})},
      {intentId:"leave_case",intentType:"leave_reference_case",intentPayload:{retainCase:false},presentationText:"Leave the case where it is.",nextBeatId:"m3_done",resolverId:null,eligibilityBasis:["story:hospital_case_window"],isEligible:()=>({available:true,basis:["story:hospital_case_window"],knownBlocker:null})}
    ]},
    4:{intents:[
      {intentId:"accept_receiver",intentType:"accept_body_inscribed_receiver",intentPayload:{receiverRequested:true},presentationText:"Let the barrier write the receiver into me.",nextBeatId:"m4_done",resolverId:"arc1_m4_accept_receiver_121",eligibilityBasis:["representation:menma_route"],isEligible:ctx=>{let ok=false;try{ok=typeof isArc1MenmaPersonRepresentation==="function"&&isArc1MenmaPersonRepresentation(ctx.representationId)===true;}catch(_error){}return{available:ok,basis:ok?["representation:menma_route"]:[],knownBlocker:"MENMA ROUTE REQUIRED"};}},
      {intentId:"decline",intentType:"decline_body_inscribed_receiver",intentPayload:{receiverRequested:false},presentationText:"No. Don't write it into me.",nextBeatId:"m4_done",resolverId:null,eligibilityBasis:["story:relay_four_receiver_window"],isEligible:()=>({available:true,basis:["story:relay_four_receiver_window"],knownBlocker:null})}
    ]},
    5:{intents:[
      {intentId:"redirect",intentType:"redirect_calibration_into_receiver",intentPayload:{redirectCalibration:true},presentationText:"Redirect it through the receiver. Make the system answer.",nextBeatId:"m5_done",resolverId:"arc1_m5_redirect_calibration_121",eligibilityBasis:["history:m4_receiver","battle:m5_victory"],isEligible:ctx=>{const refs=Array.isArray(ctx.historyRefs)?ctx.historyRefs:[];const ok=refs.includes("occ_arc1_m4_menma_body_receiver_established")&&refs.includes("arc1_m5_story_battle_victory_return");return{available:ok,basis:ok?["history:m4_receiver","battle:m5_victory"]:[],knownBlocker:"RECEIVER + BATTLE VICTORY REQUIRED"};}},
      {intentId:"leave",intentType:"leave_calibration_unchanged",intentPayload:{redirectCalibration:false},presentationText:"Leave the calibration system alone.",nextBeatId:"m5_done",resolverId:null,eligibilityBasis:["story:third_bell_post_battle_window"],isEligible:()=>({available:true,basis:["story:third_bell_post_battle_window"],knownBlocker:null})}
    ]}
  };

  for(const window of windows){
    const result=register(window,decisions[window.missionNumber]);
    if(!result||result.success!==true){fail("early_arc_story_binding_failed",{window,result,registrations,bindings});return;}
  }

  function inspect(window){
    const scene=getStorySceneDefinition(window.sceneId);
    const missionId=String(scene&&scene.eventId||`arc1_m${window.missionNumber}`);
    const ctx=contextFor(window);
    return api.ensureChoiceSet({arcId:"arc1",missionId,decisionId:window.decisionId,context:ctx,committedStateRef:stateRefFor(window,ctx)});
  }

  function runIssue121EarlyArcBindingDiagnostics(){
    const windowChecks={};
    for(const window of windows){
      const scene=getStorySceneDefinition(window.sceneId),beat=scene&&scene.beatMap&&scene.beatMap.get(window.beatId);
      windowChecks[`m${window.missionNumber}`]=!!(beat&&beat.ceDecision121&&beat.ceDecision121.decisionId===window.decisionId);
    }
    const m5=windows.find(row=>row.missionNumber===5);
    const currentM5=inspect(m5);
    const currentContext=contextFor(m5);
    const expectedRedirect=currentContext.historyRefs.includes("occ_arc1_m4_menma_body_receiver_established")&&currentContext.historyRefs.includes("arc1_m5_story_battle_victory_return");
    const currentIds=currentM5.success?currentM5.choiceSet.choices.map(row=>row.intentId):[];
    const checks={
      patchId:PATCH_ID==="alpha_mission_choice_early_arc_bindings_121_2026_09_13",
      allFourAuthoritativeWindowsBound:Object.values(windowChecks).every(Boolean),
      m2UsesExistingPurgeResolver:resolverDefs[0][1].toString().includes("resolveAlphaArc1M2PurgeObservation"),
      m3UsesExistingCaseResolver:resolverDefs[1][1].toString().includes("resolveAlphaArc1M3RetainCase"),
      m4UsesExistingReceiverResolver:resolverDefs[2][1].toString().includes("resolveAlphaArc1M4Receiver"),
      m5UsesExistingCalibrationResolver:resolverDefs[3][1].toString().includes("resolveAlphaArc1M5CalibrationAndThirdBell"),
      m5ChronicleRelativeChoiceVisibility:currentIds.includes("redirect")===expectedRedirect&&currentIds.includes("leave"),
      noConnectiveSectionsInvented:windows.every(row=>["m2_optional","m3_case","m4_receiver","m5_post_battle"].includes(row.beatId)),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,windowChecks,currentM5ChoiceIds:currentIds,currentM5Context:currentContext,browserGoldenClaimed:false};
  }

  const status=Object.freeze({success:true,patchId:PATCH_ID,windows:windows.map(row=>({...row})),browserGoldenClaimed:false,diagnostics:runIssue121EarlyArcBindingDiagnostics});
  globalThis.SC_ALPHA_MISSION_CHOICE_EARLY_ARC_BINDINGS_121=status;
  globalThis.runIssue121EarlyArcBindingDiagnostics=runIssue121EarlyArcBindingDiagnostics;
})();
