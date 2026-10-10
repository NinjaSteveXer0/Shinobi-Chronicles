// ============================================================================
// ISSUE #603 / #608 — STEP-7 PROMOTION INSTALLED INTEGRATION — 60330
// Canonical installed adapter only. Core owns Promotion truth; Courier owns the
// factual mission occurrence; #60320 owns presentation; game.js owns Battle
// caller dispatch; #63/game.js owns the authorised Genin transition.
// ============================================================================
(function installPromotionInstalledIntegration60330(){
"use strict";
if(globalThis.SC_PROMOTION_INSTALLED_60330)return;
const PATCH_ID="academy_genin_promotion_installed_60330_v4_2026_10_10_player_route_rehydrate";
const SCENARIO="academy_genin_missing_courier_dispatch_v1";
const TRANSITION="academy_to_genin";
const COURIER_STATE_KEY="promotionCourierAssessment60310";
const HOST_LABELS=Object.freeze({"KON-P01":"Hokage Administration","KON-P10":"Konoha Village Gate",whisper_woods:"Whisper Woods",fire_whisper_woods_north_ravine:"North Ravine"});
const controllers=new Map();
const clone=v=>{try{return v==null?v:JSON.parse(JSON.stringify(v));}catch(_){return v;}};
function pd(){return typeof playerData!=="undefined"&&playerData?playerData:null;}
function acquisition(){try{return typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():null;}catch(_){return null;}}
function variantForOwned(ownedId){const a=acquisition();if(!a||!a.ownedCharactersByVariantId)return null;for(const [variant,record] of Object.entries(a.ownedCharactersByVariantId)){if(record&&record.ownedCharacterId===ownedId)return variant;}return null;}
function resolveSubject(requested=null){
  const a=acquisition();if(!a)return{success:false,reason:"acquisition_state_unavailable"};
  const ownedId=requested||a.chronicleOriginOwnedCharacterId||a.chronicleOrigin?.ownedCharacterId||null;
  if(!ownedId)return{success:false,reason:"promotion_subject_missing"};
  const record=typeof getOwnedCharacterRecordById==="function"?getOwnedCharacterRecordById(ownedId):null;
  if(!record)return{success:false,reason:"promotion_subject_not_owned"};
  const rank=typeof getOwnedCharacterFormalRank==="function"?String(getOwnedCharacterFormalRank(ownedId)||"").toLowerCase():"";
  if(rank!=="academy"&&rank!=="genin")return{success:false,reason:"promotion_subject_rank_invalid",formalRank:rank};
  return{success:true,ownedCharacterId:ownedId,variantId:variantForOwned(ownedId),record,formalRank:rank};
}
function immutableSeed(){
  let identity=typeof getChronicleRunIdentity43600==="function"?getChronicleRunIdentity43600():null;
  if(!identity&&typeof ensureChronicleRunIdentity43600==="function"){const ensured=ensureChronicleRunIdentity43600();identity=ensured&&ensured.success?ensured.identity:null;}
  return identity&&identity.runId?`chronicle_seed_ref_v1::${identity.runId}`:null;
}
function phase2Root(create=false){
  const player=pd();if(!player)return null;
  if(player.phase2ChronicleState&&typeof player.phase2ChronicleState==="object")return player.phase2ChronicleState;
  if(create&&typeof ensurePhase2ChronicleState43600==="function")return ensurePhase2ChronicleState43600({save:false});
  return null;
}
function persistence(){return{
  load(){const root=phase2Root(false);return root&&root.promotionState?clone(root.promotionState):null;},
  save(next){const root=phase2Root(true);if(!root)return false;const existing=root.promotionState&&typeof root.promotionState==="object"?root.promotionState[COURIER_STATE_KEY]:null;const merged=clone(next);if(existing&&typeof existing==="object")merged[COURIER_STATE_KEY]=clone(existing);root.promotionState=merged;if(typeof savePlayerData!=="function")return false;savePlayerData();return true;}
};}
function geninAdapter(payload){
  if(!payload||payload.rankTransitionId!==TRANSITION)return{success:false,reason:"promotion_transition_id_mismatch"};
  if(typeof recordOwnedCharacterGeninPromotion!=="function")return{success:false,reason:"authorised_genin_transition_missing"};
  return recordOwnedCharacterGeninPromotion(payload.stableCharacterId,[`promotion_assessment::${payload.assessmentAttemptId}`,payload.idempotenceKey].filter(Boolean));
}
function makeCore(subject){
  const seed=immutableSeed();if(!seed)return{success:false,reason:"immutable_chronicle_seed_unavailable"};
  const factory=globalThis.SC_PROMOTION_CORE_60300;if(!factory||typeof factory.create!=="function")return{success:false,reason:"promotion_core_missing"};
  return{success:true,core:factory.create({identity:{immutableChronicleSeed:seed,stableCharacterId:subject.ownedCharacterId,rankTransitionId:TRANSITION},persistence:persistence(),geninTransitionAdapter:geninAdapter})};
}
function materializePersistedCore60330(core,subject){
  let persisted=null;
  try{persisted=persistence().load();}catch(error){return{success:false,reason:"promotion_persisted_state_read_failed",error:String(error&&error.message||error)};}
  const ownsPersistedState=!!(persisted&&typeof persisted==="object"&&Array.isArray(persisted.attempts)&&persisted.stableCharacterId===subject.ownedCharacterId&&persisted.rankTransitionId===TRANSITION);
  if(!ownsPersistedState)return{success:true,loaded:false};
  try{
    const diagnostic=core.getDiagnosticSnapshot();
    if(!diagnostic||diagnostic.success===false||!diagnostic.state)return{success:false,reason:String(diagnostic&&diagnostic.reason||"promotion_persisted_state_materialization_failed")};
    return{success:true,loaded:true};
  }catch(error){return{success:false,reason:"promotion_persisted_state_materialization_failed",error:String(error&&error.message||error)};}
}
function getController(subjectId){
  const subject=resolveSubject(subjectId);if(!subject.success)return subject;
  let row=controllers.get(subject.ownedCharacterId);
  if(!row){
    const made=makeCore(subject);if(!made.success)return made;
    const materialized=materializePersistedCore60330(made.core,subject);if(!materialized.success)return materialized;
    row={subject,core:made.core,lastAttemptId:null,persistedStateLoaded:materialized.loaded===true};controllers.set(subject.ownedCharacterId,row);
  }
  return{success:true,row};
}
function teamSnapshot(subject){
  const team=typeof getChronicleCurrentTeam43600==="function"?getChronicleCurrentTeam43600():null;
  if(!team||!Array.isArray(team.teamVariantIds)||!team.teamVariantIds.length)return{success:false,reason:"promotion_current_team_unavailable"};
  const refs=Array.isArray(team.teamRuntimeIds)&&team.teamRuntimeIds.length===team.teamVariantIds.length?[...team.teamRuntimeIds]:[...team.teamVariantIds];
  const index=team.teamVariantIds.indexOf(subject.variantId);if(index<0)return{success:false,reason:"promotion_subject_not_in_current_team"};
  const subjectRef=refs[index]||subject.variantId;if(!subjectRef)return{success:false,reason:"promotion_subject_battle_ref_missing"};
  const states={};refs.forEach(ref=>{states[ref]={controlClass:"player",positionRef:"KON-P01",present:true};});
  return{success:true,participantRefs:refs,subjectBattleRef:subjectRef,participantStateByRef:states};
}
function attemptState(row){try{const snap=row.core.getDiagnosticSnapshot();return snap&&snap.state&&typeof snap.state==="object"?snap.state:null;}catch(_){return null;}}
function latestAttemptId(row){
  if(row.lastAttemptId)return row.lastAttemptId;
  const state=attemptState(row),attempts=state&&Array.isArray(state.attempts)?state.attempts:[],latest=attempts.length?attempts[attempts.length-1]:null;
  return latest&&latest.assessmentAttemptId||null;
}
function activeAttemptId(row){
  const state=attemptState(row);if(!state)return null;
  if(state.activeAttemptId)return state.activeAttemptId;
  const attempts=Array.isArray(state.attempts)?state.attempts:[],active=[...attempts].reverse().find(x=>x&&x.status==="COMMITTED");
  return active&&active.assessmentAttemptId||null;
}
function courier(){return globalThis.SC_PROMOTION_COURIER_ASSESSMENT_60310||null;}
function beginAssessment(row){
  const team=teamSnapshot(row.subject);if(!team.success)return team;
  const started=row.core.beginAssessment({assessmentScenarioId:SCENARIO});if(!started||!started.success)return started;
  const attemptId=started.attempt&&started.attempt.assessmentAttemptId;if(!attemptId)return{success:false,reason:"promotion_attempt_id_missing_after_commit"};
  const c=courier();if(!c||typeof c.createOccurrence!=="function")return{success:false,reason:"promotion_courier_authority_missing"};
  const world=c.createOccurrence({assessmentAttemptId:attemptId,assessmentSubjectStableId:row.subject.ownedCharacterId,assessmentSubjectBattleParticipantRef:team.subjectBattleRef,attemptParticipantRefs:team.participantRefs,participantStateByRef:team.participantStateByRef});
  if(!world||!world.success){row.core.abortAssessment({assessmentAttemptId:attemptId,disqualified:false});return{success:false,reason:"promotion_world_occurrence_commit_failed",worldResult:world||null};}
  row.lastAttemptId=attemptId;return{...started,worldOccurrence:world.occurrence};
}
function factsFor(row,attemptId=null){const id=attemptId||latestAttemptId(row);const c=courier();return id&&c&&typeof c.getOccurrence==="function"?c.getOccurrence(id):null;}
function syncQualifiedEvidence(row,attemptId=null){
  const id=attemptId||latestAttemptId(row),o=factsFor(row,id);if(!id||!o)return{success:false,reason:"promotion_occurrence_missing"};
  const facts=o.factsById||{},values=Object.values(facts),has=k=>!!facts[k],ids=Object.keys(facts),first=pred=>ids.find(pred)||null;
  const participantFact=values.find(x=>x&&x.eventType==="participant_factual_action"&&x.participantRef&&x.participantRef!==o.assessmentSubjectBattleParticipantRef&&x.observedBySubject===true)||null;
  const rules={
    mission_comprehension:has("agen_m01_briefing_received_v1")&&has("agen_m01_dispatch_returned_to_examiner_v1")&&has("agen_m01_debrief_committed_v1")?"agen_m01_debrief_committed_v1":null,
    judgement_under_pressure:first(x=>x.startsWith("agen_m01_priority_"))&&first(x=>x.startsWith("agen_m01_contact_"))&&has("agen_m01_debrief_committed_v1")?(first(x=>x.startsWith("agen_m01_contact_"))||"agen_m01_debrief_committed_v1"):null,
    information_use:first(x=>x==="agen_m01_search_follow_fresh_sign_v1"||x==="agen_m01_search_check_waypoint_v1")&&has("agen_m01_courier_located_v1")?(first(x=>x.startsWith("agen_m01_search_"))||"agen_m01_courier_located_v1"):null,
    team_coordination:participantFact?participantFact.receiptId:first(x=>x.startsWith("agen_m01_participant_fact::")),
    combat_readiness:o.battle&&o.battle.returnEnvelope&&o.battle.returnEnvelope.subjectCombatEvidenceSummary&&Array.isArray(o.battle.returnEnvelope.subjectCombatEvidenceSummary.subjectCommittedActionRefs)&&o.battle.returnEnvelope.subjectCombatEvidenceSummary.subjectCommittedActionRefs.length?o.battle.returnEnvelope.subjectCombatEvidenceSummary.subjectCommittedActionRefs[0]:null,
    objective_protection:has("agen_m01_dispatch_returned_to_examiner_v1")&&o.dispatch&&o.dispatch.integrityState==="agen_m01_dispatch_sealed_intact_v1"?"agen_m01_dispatch_returned_to_examiner_v1":null
  };
  let snap=null;try{snap=row.core.getDiagnosticSnapshot();}catch(_error){snap=null;}
  const required=new Set(Object.values(snap&&snap.state&&snap.state.readinessSlots||{}).map(slot=>slot&&slot.domain).filter(Boolean));
  if(!required.size)return{success:false,reason:"promotion_required_domains_unavailable",assessmentAttemptId:id};
  const results=[];for(const [domain,ref] of Object.entries(rules)){if(!ref||!required.has(domain))continue;results.push({domain,ref,result:row.core.recordQualifiedReadinessEvidence({domain,evidenceRef:`${o.occurrenceId}::${ref}`})});}
  return{success:results.every(x=>x.result&&x.result.success!==false),assessmentAttemptId:id,requiredDomains:[...required],qualified:results};
}
function receiptFor(row){
  const o=factsFor(row);if(!o)return null;const rewards=Object.values(o.rewardTransactionsByKey||{}).map(x=>x&&x.playerFacingLine).filter(Boolean),projection=row.core.getObserverProjection();if(!projection||!projection.outcome)return null;
  return{title:"Promotion Chronicle Receipt",causeLabel:"Field Readiness Assessment",provenanceLabel:"Committed mission, Battle and Rank facts",rewardLines:rewards,historyLines:(o.factOrder||[]).slice(-8),publicSummary:projection.outcomeSummary||""};
}
function action(id,label,detail="",kind="standard"){return{actionId:id,label,detail,kind};}
function missionProjection(row){
  const id=activeAttemptId(row)||latestAttemptId(row),c=courier();if(!id||!c||typeof c.getOccurrence!=="function"||typeof c.projectJourney!=="function")return null;
  const o=c.getOccurrence(id),journey=c.projectJourney(id);if(!o||!journey||!journey.success)return null;
  const actions=[],phase=o.phase,host=o.currentHost,facts=o.factsById||{},pressure=o.hostile&&o.hostile.pressureState;
  if(phase===c.phases.ATTEMPT)actions.push(action("receive_briefing","Receive examiner briefing","Hear the formal mission before leaving Konoha.","primary"));
  else if(phase===c.phases.BRIEFING)actions.push(action("travel_gate","Leave for the Village Gate","Move from Administration to the registered Konoha gate host.","primary"));
  else if(phase===c.phases.OUTBOUND&&host==="KON-P10")actions.push(action("travel_woods","Enter Whisper Woods","Cross the gate and follow the authorised mission route.","primary"));
  else if(phase===c.phases.SEARCH&&host==="whisper_woods"&&!o.courier?.located)actions.push(action("travel_ravine","Continue to the North Ravine","Reach the last confirmed northern-route search area.","primary"));
  else if(phase===c.phases.SEARCH&&host==="fire_whisper_woods_north_ravine"&&!o.courier?.located){
    actions.push(action("search_fresh","Follow the fresh trail.","Treat the fresh deviation as the strongest current lead.","primary"));
    actions.push(action("search_waypoint","Check the north waypoint first.","Verify whether the courier reached the scheduled waypoint."));
  }else if(phase===c.phases.COURIER){
    actions.push(action("priority_dispatch","Secure the dispatch first.","Establish controlled custody of the sealed objective.","primary"));
    actions.push(action("priority_courier","Stabilize the courier first.","Prioritise the courier's immediate condition before custody transfer."));
    actions.push(action("priority_cover","Cover the approach.","Take a position oriented toward the route and treeline."));
  }else if(phase===c.phases.PRESSURE&&pressure==="agen_m01_hostile_searching_outer_area_v1"){
    actions.push(action("confirm_contact","Respond to the approaching rogue","The courier identifies the approaching pursuer; establish the factual contact boundary.","primary"));
  }else if(phase===c.phases.PRESSURE&&pressure==="agen_m01_hostile_contact_confirmed_v1"){
    actions.push(action("hold_line","Hold the line.","Enter the authorised optional PL Battle when direct combat is factual.","primary"));
    actions.push(action("extract_cover","Get the courier moving.","Attempt the authored non-Battle extraction route under current cover."));
    actions.push(action("ravine_route","Break contact through the ravine path.","Use current geography to deny a clean approach."));
  }else if((phase===c.phases.PRESSURE||phase===c.phases.EXTRACTION)&&pressure!=="agen_m01_hostile_contact_confirmed_v1"&&o.routeLeg!=="return"){
    actions.push(action("begin_return","Begin extraction to Konoha","Move the courier and dispatch onto the authorised return route.","primary"));
  }else if((phase===c.phases.EXTRACTION||phase===c.phases.RETURN)&&o.routeLeg==="return"){
    if(host==="fire_whisper_woods_north_ravine")actions.push(action("return_woods","Return through Whisper Woods","Leave the ravine and follow the same physical route back.","primary"));
    else if(host==="whisper_woods")actions.push(action("return_gate","Return to the Village Gate","Bring the field party back to Konoha.","primary"));
    else if(host==="KON-P10")actions.push(action("return_admin","Report back to Administration","Return to the examiner at the authorised Konoha host.","primary"));
  }else if(phase===c.phases.HANDOFF){
    if(o.dispatch?.custodyState!=="agen_m01_dispatch_examiner_custody_v1")actions.push(action("handoff_dispatch","Return the sealed dispatch","Hand the same occurrence-bound sealed dispatch to the examiner.","primary"));
    else if(!facts.agen_m01_debrief_committed_v1)actions.push(action("debrief","Report what happened","Give the factual debrief; this does not itself decide Promotion.","primary"));
    else actions.push(action("conclude","Receive the examiner decision","Close the World occurrence and let Rank evaluate the committed evidence.","primary"));
  }else if(phase===c.phases.DEBRIEF)actions.push(action("conclude","Receive the examiner decision","Close the World occurrence and let Rank evaluate the committed evidence.","primary"));
  else if(phase===c.phases.TERMINAL&&!row.core.getObserverProjection()?.outcome)actions.push(action("resolve_result","Receive the examiner decision","Project the authoritative Rank result from the terminal assessment.","primary"));
  return{title:journey.missionTitle,objective:journey.objective,currentTask:journey.currentTask,locationLabel:HOST_LABELS[host]||host,statusLabel:journey.status==="terminal"?"Assessment concluded":"Assessment in progress",actions};
}
function truth(row){const base=row.core.getObserverProjection();return{...base,canAbort:false,receipt:receiptFor(row),mission:missionProjection(row)};}
function occurrenceRef(id){return`occ_${SCENARIO}::${id}`;}
function finalize(row,attemptId=null){
  const id=attemptId||latestAttemptId(row);if(!id)return{success:false,reason:"promotion_attempt_not_active"};const c=courier();if(!c)return{success:false,reason:"promotion_courier_authority_missing"};
  const ranked=c.projectRankEvidence(id);if(!ranked||!ranked.success)return ranked||{success:false,reason:"promotion_rank_evidence_unavailable"};
  const sync=syncQualifiedEvidence(row,id);if(!sync||!sync.success)return sync||{success:false,reason:"promotion_readiness_evidence_sync_failed"};
  const safety=[c.terminalStates.INTEGRITY,c.terminalStates.SAFETY].includes(ranked.terminalWorldState);
  const resolved=row.core.resolveAssessment({assessmentAttemptId:id,missionObjectiveCompleted:ranked.missionObjectiveCompleted===true,safetyIntegrityAbort:safety,disqualified:false});if(!resolved||!resolved.success)return resolved;
  for(const slotId of globalThis.SC_PROMOTION_CORE_60300.readinessSlotIds||[])row.core.revealReadinessSlot(slotId,{revealRef:`${occurrenceRef(id)}::examiner_debrief`});
  let promotion=null;if(resolved.attempt&&resolved.attempt.status==="PASS")promotion=row.core.commitAuthorisedGeninTransition({assessmentAttemptId:id});
  return{...resolved,promotion,projection:truth(row)};
}
function withdraw(row){const id=activeAttemptId(row);if(!id)return{success:false,reason:"promotion_attempt_not_active"};const c=courier();if(c&&typeof c.commitTerminal==="function")c.commitTerminal(id,c.terminalStates.WITHDRAWN);return row.core.withdrawAssessment({assessmentAttemptId:id});}
function directContactRefs(o){
  const subject=o&&o.assessmentSubjectBattleParticipantRef;if(!subject)return[];
  return[subject];
}
function resolveNonBattleResult(o,choice){
  if(choice==="agen_m01_contact_extract_under_cover_v1"){
    const protectedDispatch=o.dispatch?.custodyState==="agen_m01_dispatch_team_controlled_custody_v1",stabilized=o.courier?.state==="agen_m01_courier_stabilized_extractable_v1";
    return protectedDispatch||stabilized?"clean_extraction":"pressured_extraction";
  }
  return"pressured_extraction";
}
function executeMissionAction(row,actionId){
  const id=activeAttemptId(row)||latestAttemptId(row),c=courier();if(!id||!c)return{success:false,reason:"promotion_scenario_action_unavailable"};
  const o=typeof c.getOccurrence==="function"?c.getOccurrence(id):null;if(!o)return{success:false,reason:"promotion_occurrence_missing"};
  switch(String(actionId||"")){
    case"receive_briefing":return c.commitBriefing(id);
    case"travel_gate":return c.advanceJourney(id,"KON-P10");
    case"travel_woods":return c.advanceJourney(id,"whisper_woods");
    case"travel_ravine":return c.advanceJourney(id,"fire_whisper_woods_north_ravine");
    case"search_fresh":return c.resolveSearch(id,"agen_m01_search_follow_fresh_sign_v1");
    case"search_waypoint":return c.resolveSearch(id,"agen_m01_search_check_waypoint_v1");
    case"priority_dispatch":return c.resolvePriority(id,"agen_m01_priority_secure_dispatch_v1");
    case"priority_courier":return c.resolvePriority(id,"agen_m01_priority_stabilize_courier_v1",{resolverResult:"stabilized_extractable"});
    case"priority_cover":return c.resolvePriority(id,"agen_m01_priority_cover_approach_v1");
    case"confirm_contact":return c.confirmHostileContact(id,{directContactParticipantRefs:directContactRefs(o)});
    case"hold_line":return c.launchHoldLineBattle(id);
    case"extract_cover":return c.resolveNonBattleContact(id,"agen_m01_contact_extract_under_cover_v1",resolveNonBattleResult(o,"agen_m01_contact_extract_under_cover_v1"));
    case"ravine_route":return c.resolveNonBattleContact(id,"agen_m01_contact_use_ravine_route_v1",resolveNonBattleResult(o,"agen_m01_contact_use_ravine_route_v1"));
    case"begin_return":return c.beginExtraction(id,{courierOutcome:"recovered_with_team"});
    case"return_woods":return c.advanceJourney(id,"whisper_woods");
    case"return_gate":return c.advanceJourney(id,"KON-P10");
    case"return_admin":return c.advanceJourney(id,"KON-P01");
    case"handoff_dispatch":return c.handoffDispatch(id);
    case"debrief":return c.commitDebrief(id,{reportRef:`player_report::${id}`});
    case"conclude":{
      let terminal=c.commitTerminal(id,c.terminalStates.COMPLETE);
      if(!terminal?.success&&terminal?.reason==="promotion_courier_completion_facts_incomplete")terminal=c.commitTerminal(id,c.terminalStates.FAILED);
      if(!terminal?.success)return terminal||{success:false,reason:"promotion_terminal_commit_failed"};
      return finalize(row,id);
    }
    case"resolve_result":return finalize(row,id);
    default:return{success:false,reason:"promotion_player_action_unknown",actionId};
  }
}
function returnToKonoha(){
  if(typeof openOverlay!=="function")return{success:false,reason:"konoha_return_authority_missing"};
  const overlayResult=openOverlay("village");
  return{success:true,destination:"village",reason:"promotion_return_to_konoha",overlayResult:overlayResult||null};
}
function mount(row){
  if(typeof openOverlay==="function")openOverlay("arena_promotion");
  const host=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
  const ui=globalThis.SC_PROMOTION_ARENA_UI_60320;if(!host||!ui||typeof ui.mount!=="function")return{success:false,reason:"promotion_ui_host_or_adapter_missing"};
  host.replaceChildren();const controller=ui.mount(host,{getTruth:()=>truth(row),actions:{beginInspection:()=>row.core.beginInspection(),beginAssessment:()=>beginAssessment(row),withdrawAssessment:()=>withdraw(row),executeMissionAction:actionId=>executeMissionAction(row,actionId),returnToKonoha}});
  return{success:true,destination:"promotion",ownedCharacterId:row.subject.ownedCharacterId,controller};
}
function openInstalledPromotion60330(subjectId=null){const got=getController(subjectId);if(!got.success)return got;return mount(got.row);}
function rehydratePromotionAfterBattleReturn60330(returnContext){
  if(!returnContext||returnContext.assessmentScenarioId!==SCENARIO)return{success:false,reason:"promotion_battle_return_context_mismatch"};
  const reopened=openInstalledPromotion60330(returnContext.assessmentSubjectStableId||null);
  return{success:!!(reopened&&reopened.success===true),destination:"promotion",assessmentAttemptId:returnContext.assessmentAttemptId||null,openResult:reopened||null};
}
function registerPromotionBattleReturnPresentation60330(){
  const c=courier();
  if(!c||typeof c.registerBattleReturnPresentation!=="function")return{success:false,reason:"promotion_battle_return_presentation_hook_missing"};
  return c.registerBattleReturnPresentation(rehydratePromotionAfterBattleReturn60330);
}
function activeRow(subjectId=null){const got=getController(subjectId);return got.success?got.row:null;}
function activeAttempt(subjectId=null){const row=activeRow(subjectId);return row?activeAttemptId(row):null;}
function scenarioCall(method,args=[],subjectId=null){const row=activeRow(subjectId);if(!row)return{success:false,reason:"promotion_controller_unavailable"};const id=activeAttemptId(row);const c=courier();if(!id||!c||typeof c[method]!=="function")return{success:false,reason:"promotion_scenario_action_unavailable"};return c[method](id,...args);}
const battleReturnPresentationRegistration=registerPromotionBattleReturnPresentation60330();
const api=Object.freeze({
  patchId:PATCH_ID,open:openInstalledPromotion60330,getController,activeAttempt,
  projectJourney:(subjectId=null)=>scenarioCall("projectJourney",[],subjectId),commitBriefing:(subjectId=null)=>scenarioCall("commitBriefing",[],subjectId),advanceJourney:(destination,subjectId=null)=>scenarioCall("advanceJourney",[destination],subjectId),resolveSearch:(choice,subjectId=null)=>scenarioCall("resolveSearch",[choice],subjectId),recordParticipantFact:(spec,subjectId=null)=>scenarioCall("recordParticipantFact",[spec],subjectId),resolvePriority:(choice,spec={},subjectId=null)=>scenarioCall("resolvePriority",[choice,spec],subjectId),confirmHostileContact:(spec,subjectId=null)=>scenarioCall("confirmHostileContact",[spec],subjectId),launchHoldLineBattle:(subjectId=null)=>scenarioCall("launchHoldLineBattle",[],subjectId),resolveNonBattleContact:(choice,result,subjectId=null)=>scenarioCall("resolveNonBattleContact",[choice,result],subjectId),beginExtraction:(spec={},subjectId=null)=>scenarioCall("beginExtraction",[spec],subjectId),handoffDispatch:(subjectId=null)=>scenarioCall("handoffDispatch",[],subjectId),commitDebrief:(spec={},subjectId=null)=>scenarioCall("commitDebrief",[spec],subjectId),commitTerminal:(state,subjectId=null)=>scenarioCall("commitTerminal",[state],subjectId),
  getPlayerMission:(subjectId=null)=>{const row=activeRow(subjectId);return row?clone(missionProjection(row)):null;},executePlayerMissionAction:(actionId,subjectId=null)=>{const row=activeRow(subjectId);return row?executeMissionAction(row,actionId):{success:false,reason:"promotion_controller_unavailable"};},returnToKonoha,
  syncQualifiedEvidence:(subjectId=null)=>{const row=activeRow(subjectId);return row?syncQualifiedEvidence(row):{success:false,reason:"promotion_controller_unavailable"};},finalize:(subjectId=null)=>{const row=activeRow(subjectId);return row?finalize(row):{success:false,reason:"promotion_controller_unavailable"};},getTruth:(subjectId=null)=>{const row=activeRow(subjectId);return row?truth(row):null;},battleReturnPresentationRegistered:!!(battleReturnPresentationRegistration&&battleReturnPresentationRegistration.success===true),browserGoldenClaimed:false
});
globalThis.SC_PROMOTION_INSTALLED_60330=api;globalThis.openInstalledPromotion60330=openInstalledPromotion60330;
})();
