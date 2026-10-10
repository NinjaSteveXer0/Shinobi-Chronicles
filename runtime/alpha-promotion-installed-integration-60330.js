// ============================================================================
// ISSUE #603 / #608 — STEP-7 PROMOTION INSTALLED INTEGRATION — 60330
// Canonical installed adapter only. Core owns Promotion truth; Courier owns the
// factual mission occurrence; #60320 owns presentation; game.js owns Battle
// caller dispatch; #63/game.js owns the authorised Genin transition.
// ============================================================================
(function installPromotionInstalledIntegration60330(){
"use strict";
if(globalThis.SC_PROMOTION_INSTALLED_60330)return;
const PATCH_ID="academy_genin_promotion_installed_60330_v1_2026_10_09";
const SCENARIO="academy_genin_missing_courier_dispatch_v1";
const TRANSITION="academy_to_genin";
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
  if(!identity&&typeof ensureChronicleRunIdentity43600==="function"){
    const ensured=ensureChronicleRunIdentity43600();identity=ensured&&ensured.success?ensured.identity:null;
  }
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
  save(next){const root=phase2Root(true);if(!root)return false;root.promotionState=clone(next);if(typeof savePlayerData!=="function")return false;savePlayerData();return true;}
};}
function geninAdapter(payload){
  if(!payload||payload.rankTransitionId!==TRANSITION)return{success:false,reason:"promotion_transition_id_mismatch"};
  if(typeof recordOwnedCharacterGeninPromotion!=="function")return{success:false,reason:"authorised_genin_transition_missing"};
  return recordOwnedCharacterGeninPromotion(payload.stableCharacterId,[`promotion_assessment::${payload.assessmentAttemptId}`,payload.idempotenceKey].filter(Boolean));
}
function makeCore(subject){
  const seed=immutableSeed();if(!seed)return{success:false,reason:"immutable_chronicle_seed_unavailable"};
  const factory=globalThis.SC_PROMOTION_CORE_60300;
  if(!factory||typeof factory.create!=="function")return{success:false,reason:"promotion_core_missing"};
  return{success:true,core:factory.create({identity:{immutableChronicleSeed:seed,stableCharacterId:subject.ownedCharacterId,rankTransitionId:TRANSITION},persistence:persistence(),geninTransitionAdapter:geninAdapter})};
}
function getController(subjectId){
  const subject=resolveSubject(subjectId);if(!subject.success)return subject;
  let row=controllers.get(subject.ownedCharacterId);
  if(!row){const made=makeCore(subject);if(!made.success)return made;row={subject,core:made.core,lastAttemptId:null};controllers.set(subject.ownedCharacterId,row);}
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
function latestAttemptId(row){
  if(row.lastAttemptId)return row.lastAttemptId;
  try{const snap=row.core.getDiagnosticSnapshot();const attempts=snap&&snap.state&&Array.isArray(snap.state.attempts)?snap.state.attempts:[];const active=[...attempts].reverse().find(x=>x&&x.status==="COMMITTED");return active&&active.assessmentAttemptId||null;}catch(_){return null;}
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
  const facts=o.factsById||{},values=Object.values(facts);const has=k=>!!facts[k];const ids=Object.keys(facts);
  const first=pred=>ids.find(pred)||null;
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
  const results=[];
  for(const [domain,ref] of Object.entries(rules)){
    if(!ref||!required.has(domain))continue;
    results.push({domain,ref,result:row.core.recordQualifiedReadinessEvidence({domain,evidenceRef:`${o.occurrenceId}::${ref}`})});
  }
  return{success:results.every(x=>x.result&&x.result.success!==false),assessmentAttemptId:id,requiredDomains:[...required],qualified:results};
}
function receiptFor(row){
  const o=factsFor(row);if(!o)return null;const rewards=Object.values(o.rewardTransactionsByKey||{}).map(x=>x&&x.playerFacingLine).filter(Boolean);
  const projection=row.core.getObserverProjection();if(!projection||!projection.outcome)return null;
  return{title:"Promotion Chronicle Receipt",causeLabel:"Field Readiness Assessment",provenanceLabel:"Committed mission, Battle and Rank facts",rewardLines:rewards,historyLines:(o.factOrder||[]).slice(-8),publicSummary:projection.outcomeSummary||""};
}
function truth(row){const base=row.core.getObserverProjection();return{...base,canAbort:false,receipt:receiptFor(row)};}
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
function withdraw(row){const id=latestAttemptId(row);if(!id)return{success:false,reason:"promotion_attempt_not_active"};const c=courier();if(c&&typeof c.commitTerminal==="function")c.commitTerminal(id,c.terminalStates.WITHDRAWN);return row.core.withdrawAssessment({assessmentAttemptId:id});}
function mount(row){
  if(typeof openOverlay==="function")openOverlay("arena_promotion");
  const host=typeof document!=="undefined"?document.getElementById("overlay-content-container"):null;
  const ui=globalThis.SC_PROMOTION_ARENA_UI_60320;if(!host||!ui||typeof ui.mount!=="function")return{success:false,reason:"promotion_ui_host_or_adapter_missing"};
  host.replaceChildren();const controller=ui.mount(host,{getTruth:()=>truth(row),actions:{beginInspection:()=>row.core.beginInspection(),beginAssessment:()=>beginAssessment(row),withdrawAssessment:()=>withdraw(row)}});
  return{success:true,destination:"promotion",ownedCharacterId:row.subject.ownedCharacterId,controller};
}
function openInstalledPromotion60330(subjectId=null){const got=getController(subjectId);if(!got.success)return got;return mount(got.row);}
function activeRow(subjectId=null){const got=getController(subjectId);return got.success?got.row:null;}
function activeAttempt(subjectId=null){const row=activeRow(subjectId);return row?latestAttemptId(row):null;}
function scenarioCall(method,args=[],subjectId=null){const row=activeRow(subjectId);if(!row)return{success:false,reason:"promotion_controller_unavailable"};const id=latestAttemptId(row);const c=courier();if(!id||!c||typeof c[method]!=="function")return{success:false,reason:"promotion_scenario_action_unavailable"};return c[method](id,...args);}
const api=Object.freeze({patchId:PATCH_ID,open:openInstalledPromotion60330,getController,activeAttempt,projectJourney:(subjectId=null)=>scenarioCall("projectJourney",[],subjectId),commitBriefing:(subjectId=null)=>scenarioCall("commitBriefing",[],subjectId),advanceJourney:(destination,subjectId=null)=>scenarioCall("advanceJourney",[destination],subjectId),resolveSearch:(choice,subjectId=null)=>scenarioCall("resolveSearch",[choice],subjectId),recordParticipantFact:(spec,subjectId=null)=>scenarioCall("recordParticipantFact",[spec],subjectId),resolvePriority:(choice,spec={},subjectId=null)=>scenarioCall("resolvePriority",[choice,spec],subjectId),confirmHostileContact:(spec,subjectId=null)=>scenarioCall("confirmHostileContact",[spec],subjectId),launchHoldLineBattle:(subjectId=null)=>scenarioCall("launchHoldLineBattle",[],subjectId),resolveNonBattleContact:(choice,result,subjectId=null)=>scenarioCall("resolveNonBattleContact",[choice,result],subjectId),beginExtraction:(spec={},subjectId=null)=>scenarioCall("beginExtraction",[spec],subjectId),handoffDispatch:(subjectId=null)=>scenarioCall("handoffDispatch",[],subjectId),commitDebrief:(spec={},subjectId=null)=>scenarioCall("commitDebrief",[spec],subjectId),commitTerminal:(state,subjectId=null)=>scenarioCall("commitTerminal",[state],subjectId),syncQualifiedEvidence:(subjectId=null)=>{const row=activeRow(subjectId);return row?syncQualifiedEvidence(row):{success:false,reason:"promotion_controller_unavailable"};},finalize:(subjectId=null)=>{const row=activeRow(subjectId);return row?finalize(row):{success:false,reason:"promotion_controller_unavailable"};},getTruth:(subjectId=null)=>{const row=activeRow(subjectId);return row?truth(row):null;},browserGoldenClaimed:false});
globalThis.SC_PROMOTION_INSTALLED_60330=api;
globalThis.openInstalledPromotion60330=openInstalledPromotion60330;
})();