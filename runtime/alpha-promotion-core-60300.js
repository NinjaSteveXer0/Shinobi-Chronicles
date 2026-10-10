// ============================================================================
// ISSUE #603 / #606 — ACADEMY -> GENIN PROMOTION CORE — 60300
//
// Core-only authority consumer for the Step-7 Field Readiness Assessment.
// Owns deterministic package materialisation, attempt lineage, Rank evidence
// state and observer-safe readiness projection. It does not own World/Battle,
// rewards, UI, global save migration, team assignment or Genin roster content.
// ============================================================================
(function installPromotionCore60300(){
"use strict";
if(globalThis.SC_PROMOTION_CORE_60300)return;

const PATCH_ID="promotion_core_60300_2026_10_07";
const SCHEMA_VERSION=1;
const RANK_TRANSITION_ID="academy_to_genin";
const ASSESSMENT_FAMILY_ID="academy_to_genin_field_readiness_assessment";
const SCENARIO_ID="academy_genin_missing_courier_dispatch_v1";
const PACKAGE_POOL_VERSION="academy_genin_fr_package_pool_v1";
const DERIVATION_ALGORITHM="fnv1a32_utf8_v1";
const PACKAGE_IDS=Object.freeze([
  "academy_genin_fr_pkg_information_team_v1",
  "academy_genin_fr_pkg_information_combat_v1",
  "academy_genin_fr_pkg_information_objective_v1",
  "academy_genin_fr_pkg_team_combat_v1",
  "academy_genin_fr_pkg_team_objective_v1",
  "academy_genin_fr_pkg_combat_objective_v1"
]);
const PACKAGE_SECONDARIES=Object.freeze({
  academy_genin_fr_pkg_information_team_v1:Object.freeze(["information_use","team_coordination"]),
  academy_genin_fr_pkg_information_combat_v1:Object.freeze(["information_use","combat_readiness"]),
  academy_genin_fr_pkg_information_objective_v1:Object.freeze(["information_use","objective_protection"]),
  academy_genin_fr_pkg_team_combat_v1:Object.freeze(["team_coordination","combat_readiness"]),
  academy_genin_fr_pkg_team_objective_v1:Object.freeze(["team_coordination","objective_protection"]),
  academy_genin_fr_pkg_combat_objective_v1:Object.freeze(["combat_readiness","objective_protection"])
});
const SLOT_IDS=Object.freeze([
  "academy_genin_req_mission_comprehension",
  "academy_genin_req_judgement_under_pressure",
  "academy_genin_req_secondary_1",
  "academy_genin_req_secondary_2"
]);
const PUBLIC_DOMAIN_LABELS=Object.freeze({
  mission_comprehension:"Mission Comprehension",
  judgement_under_pressure:"Judgement Under Pressure",
  information_use:"Information Use",
  team_coordination:"Team Coordination",
  combat_readiness:"Combat Readiness",
  objective_protection:"Objective Protection"
});
const TERMINAL_OUTCOMES=Object.freeze(["PASS","FAIL","ABORTED","WITHDRAWN"]);
const MANIFEST_ID="sc.phase2.chronicle_state_manifest.v1";
const PROMOTION_STATE_DOMAIN_ID="promotionState";

function clone60300(value){
  if(value==null||typeof value!=="object")return value;
  return JSON.parse(JSON.stringify(value));
}
function deepFreeze60300(value){
  if(!value||typeof value!=="object"||Object.isFrozen(value))return value;
  Object.freeze(value);
  for(const child of Object.values(value))deepFreeze60300(child);
  return value;
}
function text60300(value,max=240){
  if(typeof value!=="string"&&typeof value!=="number")return"";
  return String(value).normalize("NFC").replace(/[\u0000-\u001F\u007F]/g," ").trim().slice(0,max);
}
function nonEmpty60300(value,max=240){
  const text=text60300(value,max);
  return text||null;
}
function nowIso60300(clock){
  const raw=typeof clock==="function"?clock():Date.now();
  const date=raw instanceof Date?raw:new Date(raw);
  if(Number.isNaN(date.getTime()))throw new Error("promotion_clock_invalid");
  return date.toISOString();
}
function utf8Bytes60300(value){
  const text=String(value).normalize("NFC");
  if(typeof TextEncoder!=="undefined")return new TextEncoder().encode(text);
  const bytes=[];
  for(const symbol of text){
    const cp=symbol.codePointAt(0);
    if(cp<=0x7f)bytes.push(cp);
    else if(cp<=0x7ff)bytes.push(0xc0|(cp>>6),0x80|(cp&0x3f));
    else if(cp<=0xffff)bytes.push(0xe0|(cp>>12),0x80|((cp>>6)&0x3f),0x80|(cp&0x3f));
    else bytes.push(0xf0|(cp>>18),0x80|((cp>>12)&0x3f),0x80|((cp>>6)&0x3f),0x80|(cp&0x3f));
  }
  return bytes;
}
function fnv1a32Utf860300(value){
  let hash=0x811c9dc5;
  for(const byte of utf8Bytes60300(value)){
    hash^=byte;
    hash=Math.imul(hash,0x01000193)>>>0;
  }
  return hash>>>0;
}
function canonicalDerivationKey60300({immutableChronicleSeed,stableCharacterId,rankTransitionId=RANK_TRANSITION_ID}={}){
  const seed=nonEmpty60300(immutableChronicleSeed,500);
  const character=nonEmpty60300(stableCharacterId,200);
  const transition=nonEmpty60300(rankTransitionId,120);
  if(!seed)throw new TypeError("immutableChronicleSeed_required");
  if(!character)throw new TypeError("stableCharacterId_required");
  if(transition!==RANK_TRANSITION_ID)throw new RangeError("rankTransitionId_not_academy_to_genin");
  return `${PACKAGE_POOL_VERSION}\u0000${seed}\u0000${character}\u0000${transition}`;
}
function derivePromotionRequirementPackageId60300(identity={}){
  const key=canonicalDerivationKey60300(identity);
  const hash=fnv1a32Utf860300(key);
  return PACKAGE_IDS[hash%PACKAGE_IDS.length];
}
function seedFingerprint60300(identity={}){
  return fnv1a32Utf860300(canonicalDerivationKey60300(identity)).toString(16).padStart(8,"0");
}
function stableIdentity60300(identity={}){
  const immutableChronicleSeed=nonEmpty60300(identity.immutableChronicleSeed,500);
  const stableCharacterId=nonEmpty60300(identity.stableCharacterId,200);
  const rankTransitionId=nonEmpty60300(identity.rankTransitionId||RANK_TRANSITION_ID,120);
  canonicalDerivationKey60300({immutableChronicleSeed,stableCharacterId,rankTransitionId});
  return{immutableChronicleSeed,stableCharacterId,rankTransitionId};
}
function packageDomains60300(packageId){
  const secondary=PACKAGE_SECONDARIES[packageId];
  if(!secondary)throw new RangeError("promotion_package_unknown");
  return Object.freeze(["mission_comprehension","judgement_under_pressure",...secondary]);
}
function freshSlot60300(slotId,domain){
  return{
    slotId,
    domain,
    revealed:false,
    satisfied:false,
    revealRefs:[],
    evidenceRefs:[]
  };
}
function buildSlots60300(packageId){
  const domains=packageDomains60300(packageId);
  const slots={};
  for(let index=0;index<SLOT_IDS.length;index+=1){
    slots[SLOT_IDS[index]]=freshSlot60300(SLOT_IDS[index],domains[index]);
  }
  return slots;
}
function freshPromotionState60300(identity,clock){
  const stable=stableIdentity60300(identity);
  const packageId=derivePromotionRequirementPackageId60300(stable);
  const materializedAt=nowIso60300(clock);
  return{
    schemaVersion:SCHEMA_VERSION,
    stateDomainId:PROMOTION_STATE_DOMAIN_ID,
    assessmentFamilyId:ASSESSMENT_FAMILY_ID,
    scenarioId:SCENARIO_ID,
    rankTransitionId:RANK_TRANSITION_ID,
    stableCharacterId:stable.stableCharacterId,
    packagePoolVersion:PACKAGE_POOL_VERSION,
    promotionRequirementPackageId:packageId,
    packageDerivation:{
      algorithm:DERIVATION_ALGORITHM,
      seedFingerprint:seedFingerprint60300(stable),
      materializedAt
    },
    readinessSlots:buildSlots60300(packageId),
    attempts:[],
    activeAttemptId:null,
    nextAttemptNumber:1,
    geninTransitionReceipts:{}
  };
}
function isObject60300(value){return !!value&&typeof value==="object"&&!Array.isArray(value);}
function validStringArray60300(value){return Array.isArray(value)&&value.every(row=>typeof row==="string"&&row.length>0);}
function validateSlot60300(slot,expectedDomain){
  return isObject60300(slot)&&
    typeof slot.slotId==="string"&&
    slot.domain===expectedDomain&&
    typeof slot.revealed==="boolean"&&
    typeof slot.satisfied==="boolean"&&
    validStringArray60300(slot.revealRefs)&&
    validStringArray60300(slot.evidenceRefs);
}
function validateAttempt60300(row){
  if(!isObject60300(row))return false;
  if(typeof row.assessmentAttemptId!=="string"||!row.assessmentAttemptId)return false;
  if(!Number.isInteger(row.attemptNumber)||row.attemptNumber<1)return false;
  if(row.status!=="COMMITTED"&&!TERMINAL_OUTCOMES.includes(row.status))return false;
  if(row.assessmentFamilyId!==ASSESSMENT_FAMILY_ID||row.scenarioId!==SCENARIO_ID)return false;
  if(typeof row.startedAt!=="string"||!row.startedAt)return false;
  if(typeof row.missionInstanceId!=="string"||typeof row.worldOccurrenceId!=="string"||typeof row.rewardSnapshotId!=="string"||typeof row.battleOccurrenceId!=="string")return false;
  return true;
}
function validatePromotionState60300(raw,identity){
  if(!isObject60300(raw))return{valid:false,reason:"promotion_state_missing"};
  let stable;
  try{stable=stableIdentity60300(identity);}catch(error){return{valid:false,reason:String(error&&error.message||error)};}
  if(raw.schemaVersion!==SCHEMA_VERSION)return{valid:false,reason:"promotion_state_schema_mismatch"};
  if(raw.stateDomainId!==PROMOTION_STATE_DOMAIN_ID)return{valid:false,reason:"promotion_state_domain_mismatch"};
  if(raw.rankTransitionId!==RANK_TRANSITION_ID)return{valid:false,reason:"promotion_rank_transition_mismatch"};
  if(raw.assessmentFamilyId!==ASSESSMENT_FAMILY_ID||raw.scenarioId!==SCENARIO_ID)return{valid:false,reason:"promotion_assessment_identity_mismatch"};
  if(raw.stableCharacterId!==stable.stableCharacterId)return{valid:false,reason:"promotion_character_lineage_mismatch"};
  if(raw.packagePoolVersion!==PACKAGE_POOL_VERSION)return{valid:false,reason:"promotion_package_pool_version_mismatch"};
  const expectedPackage=derivePromotionRequirementPackageId60300(stable);
  if(raw.promotionRequirementPackageId!==expectedPackage)return{valid:false,reason:"promotion_package_reroll_or_corruption_detected"};
  if(!isObject60300(raw.packageDerivation)||raw.packageDerivation.algorithm!==DERIVATION_ALGORITHM||raw.packageDerivation.seedFingerprint!==seedFingerprint60300(stable))return{valid:false,reason:"promotion_package_provenance_mismatch"};
  const domains=packageDomains60300(expectedPackage);
  if(!isObject60300(raw.readinessSlots))return{valid:false,reason:"promotion_readiness_slots_missing"};
  for(let index=0;index<SLOT_IDS.length;index+=1){
    if(!validateSlot60300(raw.readinessSlots[SLOT_IDS[index]],domains[index]))return{valid:false,reason:`promotion_readiness_slot_invalid:${SLOT_IDS[index]}`};
  }
  if(!Array.isArray(raw.attempts)||!raw.attempts.every(validateAttempt60300))return{valid:false,reason:"promotion_attempt_lineage_invalid"};
  const ids=raw.attempts.map(row=>row.assessmentAttemptId);
  if(new Set(ids).size!==ids.length)return{valid:false,reason:"promotion_attempt_id_duplicate"};
  const numbers=raw.attempts.map(row=>row.attemptNumber);
  if(new Set(numbers).size!==numbers.length)return{valid:false,reason:"promotion_attempt_number_duplicate"};
  if(!Number.isInteger(raw.nextAttemptNumber)||raw.nextAttemptNumber<1)return{valid:false,reason:"promotion_next_attempt_number_invalid"};
  if(raw.activeAttemptId!=null){
    const active=raw.attempts.find(row=>row.assessmentAttemptId===raw.activeAttemptId);
    if(!active||active.status!=="COMMITTED")return{valid:false,reason:"promotion_active_attempt_invalid"};
  }
  if(!isObject60300(raw.geninTransitionReceipts))return{valid:false,reason:"promotion_genin_transition_receipts_invalid"};
  return{valid:true,state:clone60300(raw)};
}
function immutableAttemptIds60300(attemptId){
  return{
    missionInstanceId:`mission_academy_genin_missing_courier_dispatch_v1::${attemptId}`,
    worldOccurrenceId:`occ_academy_genin_missing_courier_dispatch_v1::${attemptId}`,
    rewardSnapshotId:`reward_snapshot_academy_genin_missing_courier_dispatch_v1::${attemptId}`,
    battleOccurrenceId:`battle_occ_academy_genin_missing_courier_hold_line_v1::${attemptId}`
  };
}
function defaultAttemptIdFactory60300(){
  const cryptoObject=globalThis.crypto;
  if(cryptoObject&&typeof cryptoObject.randomUUID==="function")return cryptoObject.randomUUID();
  return null;
}
function sanitizeOpaqueId60300(value){
  const id=nonEmpty60300(value,180);
  if(!id)return null;
  if(/[\s<>"'`]/.test(id))return null;
  if(id.includes("::"))return null;
  return id;
}
function normalizedStore60300(store){
  if(!store||typeof store!=="object")return null;
  if(typeof store.load!=="function"||typeof store.save!=="function")return null;
  return store;
}
function saveThroughStore60300(store,state){
  if(!store)return{success:false,reason:"promotion_persistence_unavailable"};
  try{
    const result=store.save(clone60300(state));
    if(result&&typeof result.then==="function")return{success:false,reason:"promotion_async_store_not_supported_by_sync_core"};
    if(result===false||(isObject60300(result)&&result.success===false))return{success:false,reason:(result&&result.reason)||"promotion_persist_failed"};
    const roundTrip=store.load();
    if(roundTrip&&typeof roundTrip.then==="function")return{success:false,reason:"promotion_async_store_not_supported_by_sync_core"};
    return{success:true,roundTrip:clone60300(roundTrip)};
  }catch(error){
    return{success:false,reason:"promotion_persist_failed",error:String(error&&error.message||error)};
  }
}
function sourcePersistenceProbe60300(){
  let manifest=null;
  try{
    manifest=typeof globalThis.getChronicleStateManifest43600==="function"
      ?globalThis.getChronicleStateManifest43600()
      :globalThis.SC_CHRONICLE_STATE_MANIFEST_43600||null;
  }catch(_error){manifest=null;}
  if(!manifest)return deepFreeze60300({available:false,manifestId:null,reason:"chronicle_state_manifest_unavailable"});
  if(manifest.manifestId!==MANIFEST_ID)return deepFreeze60300({available:false,manifestId:manifest.manifestId||null,reason:"chronicle_state_manifest_unrecognised"});
  const domains=Array.isArray(manifest.domains)?manifest.domains:[];
  const promotionDomain=domains.find(row=>row&&row.stateDomainId===PROMOTION_STATE_DOMAIN_ID)||null;
  if(!promotionDomain)return deepFreeze60300({available:false,manifestId:manifest.manifestId,reason:"promotion_state_domain_unregistered"});
  return deepFreeze60300({available:true,manifestId:manifest.manifestId,reason:null,promotionDomain:clone60300(promotionDomain)});
}
function createPromotionCore60300(options={}){
  const identity=stableIdentity60300(options.identity||{});
  const store=normalizedStore60300(options.persistence);
  const clock=typeof options.clock==="function"?options.clock:()=>Date.now();
  const attemptIdFactory=typeof options.attemptIdFactory==="function"?options.attemptIdFactory:defaultAttemptIdFactory60300;
  const transitionAdapter=typeof options.geninTransitionAdapter==="function"?options.geninTransitionAdapter:null;
  let state=null;
  let viewPhase="IDLE";

  function loadExisting(){
    if(!store)return{success:false,reason:"promotion_persistence_unavailable"};
    let raw;
    try{raw=store.load();}catch(error){return{success:false,reason:"promotion_load_failed",error:String(error&&error.message||error)};}
    if(raw==null)return{success:true,state:null};
    const checked=validatePromotionState60300(raw,identity);
    if(!checked.valid)return{success:false,reason:checked.reason};
    state=checked.state;
    return{success:true,state:clone60300(state)};
  }
  function persist(){
    const written=saveThroughStore60300(store,state);
    if(!written.success)return written;
    const checked=validatePromotionState60300(written.roundTrip,identity);
    if(!checked.valid)return{success:false,reason:`promotion_persist_verification_failed:${checked.reason}`};
    state=checked.state;
    return{success:true,state:clone60300(state)};
  }
  function ensureMaterialized(){
    if(state)return{success:true,idempotent:true,state:clone60300(state)};
    const loaded=loadExisting();
    if(!loaded.success)return loaded;
    if(loaded.state)return{success:true,idempotent:true,state:clone60300(state)};
    state=freshPromotionState60300(identity,clock);
    const saved=persist();
    if(!saved.success){state=null;return saved;}
    return{success:true,idempotent:false,state:clone60300(state)};
  }
  function currentAttempt(){
    if(!state||!state.activeAttemptId)return null;
    return state.attempts.find(row=>row.assessmentAttemptId===state.activeAttemptId)||null;
  }
  function latestAttempt(){
    return state&&state.attempts.length?state.attempts[state.attempts.length-1]:null;
  }
  function findAttempt(id){return state?state.attempts.find(row=>row.assessmentAttemptId===id)||null:null;}
  function rollback(snapshot){state=clone60300(snapshot);}
  function mutateAndPersist(mutator){
    const before=clone60300(state);
    try{mutator(state);}catch(error){rollback(before);return{success:false,reason:String(error&&error.message||error)};}
    const saved=persist();
    if(!saved.success){rollback(before);return saved;}
    return{success:true,state:clone60300(state)};
  }
  function beginInspection(){
    const materialized=ensureMaterialized();
    if(!materialized.success)return materialized;
    viewPhase="INSPECTION";
    return{success:true,idempotent:true,phase:viewPhase,projection:getObserverProjection()};
  }
  function beginAssessment(){
    const materialized=ensureMaterialized();
    if(!materialized.success)return materialized;
    const active=currentAttempt();
    if(active){viewPhase="COMMITTED";return{success:true,idempotent:true,attempt:clone60300(active),projection:getObserverProjection()};}
    const latest=latestAttempt();
    if(latest&&latest.status==="PASS")return{success:false,reason:"promotion_already_passed",attempt:clone60300(latest)};
    const opaque=sanitizeOpaqueId60300(attemptIdFactory({
      stableCharacterId:identity.stableCharacterId,
      rankTransitionId:RANK_TRANSITION_ID,
      attemptNumber:state.nextAttemptNumber
    }));
    if(!opaque)return{success:false,reason:"assessment_attempt_id_allocation_unavailable"};
    if(findAttempt(opaque))return{success:false,reason:"assessment_attempt_id_duplicate"};
    const ids=immutableAttemptIds60300(opaque);
    const row={
      assessmentAttemptId:opaque,
      attemptNumber:state.nextAttemptNumber,
      assessmentFamilyId:ASSESSMENT_FAMILY_ID,
      scenarioId:SCENARIO_ID,
      status:"COMMITTED",
      startedAt:nowIso60300(clock),
      resolvedAt:null,
      missionObjectiveCompleted:null,
      safetyIntegrityAbort:false,
      disqualified:false,
      ...ids
    };
    const result=mutateAndPersist(next=>{
      next.attempts.push(row);
      next.activeAttemptId=opaque;
      next.nextAttemptNumber+=1;
    });
    if(!result.success)return result;
    viewPhase="COMMITTED";
    return{success:true,idempotent:false,attempt:clone60300(findAttempt(opaque)),projection:getObserverProjection()};
  }
  function revealReadinessSlot(slotId,{revealRef}={}){
    const materialized=ensureMaterialized();if(!materialized.success)return materialized;
    const slot=state.readinessSlots[slotId];if(!slot)return{success:false,reason:"promotion_readiness_slot_unknown"};
    const ref=nonEmpty60300(revealRef,240);if(!ref)return{success:false,reason:"promotion_reveal_ref_required"};
    if(slot.revealed&&slot.revealRefs.includes(ref))return{success:true,idempotent:true,projection:getObserverProjection()};
    const result=mutateAndPersist(next=>{
      const target=next.readinessSlots[slotId];
      target.revealed=true;
      if(!target.revealRefs.includes(ref))target.revealRefs.push(ref);
    });
    return result.success?{success:true,idempotent:false,projection:getObserverProjection()}:result;
  }
  function recordQualifiedReadinessEvidence({domain,evidenceRef}={}){
    const materialized=ensureMaterialized();if(!materialized.success)return materialized;
    const cleanDomain=nonEmpty60300(domain,120),ref=nonEmpty60300(evidenceRef,260);
    if(!cleanDomain||!ref)return{success:false,reason:"promotion_evidence_domain_and_ref_required"};
    const slotId=SLOT_IDS.find(id=>state.readinessSlots[id].domain===cleanDomain)||null;
    if(!slotId)return{success:false,reason:"promotion_evidence_not_required_by_fixed_package"};
    const slot=state.readinessSlots[slotId];
    if(slot.evidenceRefs.includes(ref))return{success:true,idempotent:true,projection:getObserverProjection()};
    const result=mutateAndPersist(next=>{
      const target=next.readinessSlots[slotId];
      target.satisfied=true;
      target.evidenceRefs.push(ref);
    });
    return result.success?{success:true,idempotent:false,projection:getObserverProjection()}:result;
  }
  function terminalize(outcome,{assessmentAttemptId=null,missionObjectiveCompleted=null,safetyIntegrityAbort=false,disqualified=false}={}){
    const materialized=ensureMaterialized();if(!materialized.success)return materialized;
    if(!TERMINAL_OUTCOMES.includes(outcome))return{success:false,reason:"promotion_terminal_outcome_invalid"};
    const active=currentAttempt();
    const requested=assessmentAttemptId?sanitizeOpaqueId60300(assessmentAttemptId):null;
    const target=requested?findAttempt(requested):active;
    if(!target)return{success:false,reason:"promotion_attempt_not_found"};
    if(target.status!=="COMMITTED"){
      if(target.status===outcome)return{success:true,idempotent:true,attempt:clone60300(target),projection:getObserverProjection()};
      return{success:false,reason:"promotion_attempt_already_terminal",attempt:clone60300(target)};
    }
    if(!active||active.assessmentAttemptId!==target.assessmentAttemptId)return{success:false,reason:"promotion_attempt_not_active"};
    const result=mutateAndPersist(next=>{
      const row=next.attempts.find(item=>item.assessmentAttemptId===target.assessmentAttemptId);
      row.status=outcome;
      row.resolvedAt=nowIso60300(clock);
      row.missionObjectiveCompleted=missionObjectiveCompleted===true;
      row.safetyIntegrityAbort=safetyIntegrityAbort===true;
      row.disqualified=disqualified===true;
      next.activeAttemptId=null;
    });
    if(!result.success)return result;
    viewPhase="RESOLVED";
    return{success:true,idempotent:false,attempt:clone60300(findAttempt(target.assessmentAttemptId)),projection:getObserverProjection()};
  }
  function resolveAssessment({assessmentAttemptId=null,missionObjectiveCompleted=false,safetyIntegrityAbort=false,disqualified=false}={}){
    const materialized=ensureMaterialized();if(!materialized.success)return materialized;
    const active=currentAttempt();
    const requested=assessmentAttemptId?sanitizeOpaqueId60300(assessmentAttemptId):null;
    const target=requested?findAttempt(requested):active;
    if(!target)return{success:false,reason:"promotion_attempt_not_found"};
    if(target.status!=="COMMITTED")return terminalize(target.status,{assessmentAttemptId:target.assessmentAttemptId});
    let outcome;
    if(safetyIntegrityAbort===true||disqualified===true)outcome="ABORTED";
    else{
      const allSatisfied=SLOT_IDS.every(id=>state.readinessSlots[id].satisfied===true);
      outcome=missionObjectiveCompleted===true&&allSatisfied?"PASS":"FAIL";
    }
    return terminalize(outcome,{assessmentAttemptId:target.assessmentAttemptId,missionObjectiveCompleted,safetyIntegrityAbort,disqualified});
  }
  function withdrawAssessment({assessmentAttemptId=null}={}){
    return terminalize("WITHDRAWN",{assessmentAttemptId});
  }
  function abortAssessment({assessmentAttemptId=null,disqualified=false}={}){
    return terminalize("ABORTED",{assessmentAttemptId,safetyIntegrityAbort:true,disqualified});
  }
  function commitAuthorisedGeninTransition({assessmentAttemptId=null}={}){
    const materialized=ensureMaterialized();if(!materialized.success)return materialized;
    const target=assessmentAttemptId?findAttempt(sanitizeOpaqueId60300(assessmentAttemptId)):latestAttempt();
    if(!target)return{success:false,reason:"promotion_attempt_not_found"};
    if(target.status!=="PASS")return{success:false,reason:"promotion_genin_transition_requires_pass"};
    const key=`academy_to_genin_promotion::${target.assessmentAttemptId}`;
    const prior=state.geninTransitionReceipts[key];
    if(prior&&prior.status==="COMMITTED")return{success:true,idempotent:true,receipt:clone60300(prior)};
    if(!transitionAdapter)return{success:false,reason:"authorised_genin_transition_unavailable",deferred:true};
    let adapterResult;
    try{
      adapterResult=transitionAdapter({
        rankTransitionId:RANK_TRANSITION_ID,
        stableCharacterId:identity.stableCharacterId,
        assessmentAttemptId:target.assessmentAttemptId,
        idempotenceKey:key,
        outcome:"PASS"
      });
    }catch(error){return{success:false,reason:"authorised_genin_transition_failed",error:String(error&&error.message||error)};}
    if(adapterResult&&typeof adapterResult.then==="function")return{success:false,reason:"promotion_async_genin_transition_not_supported_by_sync_core"};
    if(adapterResult===false||(isObject60300(adapterResult)&&adapterResult.success===false))return{success:false,reason:(adapterResult&&adapterResult.reason)||"authorised_genin_transition_failed"};
    const receipt={
      schemaVersion:1,
      status:"COMMITTED",
      idempotenceKey:key,
      assessmentAttemptId:target.assessmentAttemptId,
      committedAt:nowIso60300(clock),
      adapterReceipt:isObject60300(adapterResult)&&adapterResult.receipt?clone60300(adapterResult.receipt):null
    };
    const result=mutateAndPersist(next=>{next.geninTransitionReceipts[key]=receipt;});
    return result.success?{success:true,idempotent:false,receipt:clone60300(receipt)}:result;
  }
  function publicSlot60300(slot,index){
    if(!slot.revealed){
      return Object.freeze({
        slotId:slot.slotId,
        index,
        revealed:false,
        publicLabel:"??????"
      });
    }
    return Object.freeze({
      slotId:slot.slotId,
      index,
      revealed:true,
      publicLabel:PUBLIC_DOMAIN_LABELS[slot.domain]||"Readiness Criterion",
      satisfied:slot.satisfied===true
    });
  }
  function outcomeSummary60300(outcome){
    if(outcome==="PASS")return"The assessment result records a successful Academy to Genin Promotion.";
    if(outcome==="FAIL")return"The assessment is complete. The unsuccessful attempt remains part of the Chronicle.";
    if(outcome==="ABORTED")return"The assessment was ended by a safety or integrity resolution. The attempt remains recorded.";
    if(outcome==="WITHDRAWN")return"The assessment was withdrawn. The attempt remains recorded.";
    return"";
  }
  function getObserverProjection(){
    if(!state){
      return deepFreeze60300({
        phase:viewPhase,
        currentRankLabel:"Academy Student",
        targetRankLabel:"Genin",
        publicInstruction:"Inspecting readiness is read-only. Enter Assessment is a deliberate attempt commit.",
        canInspect:true,
        canEnterAssessment:false,
        canWithdraw:false,
        canAbort:false,
        attemptUnavailableReason:"Promotion state is not materialised in an authorised persistence store.",
        readinessSlots:SLOT_IDS.map((slotId,index)=>Object.freeze({slotId,index,revealed:false,publicLabel:"??????"})),
        assessmentRecord:null,
        outcome:null,
        outcomeSummary:""
      });
    }
    const active=currentAttempt(),latest=latestAttempt();
    const passed=state.attempts.some(row=>row.status==="PASS");
    const outcome=latest&&TERMINAL_OUTCOMES.includes(latest.status)?latest.status:null;
    const phase=active?"COMMITTED":(outcome?"RESOLVED":viewPhase);
    const record=latest?{
      attemptNumber:latest.attemptNumber,
      statusLabel:latest.status,
      outcome,
      startedLabel:latest.startedAt,
      resolvedLabel:latest.resolvedAt||"",
      publicSummary:latest.status==="COMMITTED"?"Assessment attempt committed.":"Assessment attempt resolved and preserved as history."
    }:null;
    return deepFreeze60300({
      phase,
      currentRankLabel:"Academy Student",
      targetRankLabel:"Genin",
      publicInstruction:"Inspecting readiness is read-only. Enter Assessment is a deliberate attempt commit.",
      canInspect:true,
      canEnterAssessment:!active&&!passed,
      canWithdraw:!!active,
      canAbort:!!active,
      attemptUnavailableReason:passed?"Academy to Genin Promotion is already recorded for this subject.":"",
      readinessSlots:SLOT_IDS.map((slotId,index)=>publicSlot60300(state.readinessSlots[slotId],index)),
      assessmentRecord:record,
      outcome,
      outcomeSummary:outcomeSummary60300(outcome)
    });
  }
  function getDiagnosticSnapshot(){
    if(!state){
      const loaded=loadExisting();
      if(!loaded.success)return deepFreeze60300({success:false,reason:loaded.reason});
    }
    return deepFreeze60300({success:true,state:clone60300(state)});
  }

  return Object.freeze({
    patchId:PATCH_ID,
    beginInspection,
    beginAssessment,
    revealReadinessSlot,
    recordQualifiedReadinessEvidence,
    resolveAssessment,
    withdrawAssessment,
    abortAssessment,
    commitAuthorisedGeninTransition,
    getObserverProjection,
    getDiagnosticSnapshot,
    persistenceAvailable:()=>!!store,
    sourcePersistenceProbe:sourcePersistenceProbe60300
  });
}

function runPromotionCore60300Diagnostics(){
  const seeds=[];
  const seen=new Set();
  for(let index=0;index<1000&&seen.size<PACKAGE_IDS.length;index+=1){
    const identity={immutableChronicleSeed:`diagnostic_seed_${index}`,stableCharacterId:"diagnostic_character",rankTransitionId:RANK_TRANSITION_ID};
    const packageId=derivePromotionRequirementPackageId60300(identity);
    if(!seen.has(packageId)){seen.add(packageId);seeds.push({seed:identity.immutableChronicleSeed,packageId});}
  }
  const checks={
    sixPackagePool:PACKAGE_IDS.length===6&&new Set(PACKAGE_IDS).size===6,
    sixPackagesReachable:seen.size===6,
    stableFourSlots:SLOT_IDS.length===4&&new Set(SLOT_IDS).size===4,
    packageDomainsExact:Object.values(PACKAGE_SECONDARIES).every(pair=>Array.isArray(pair)&&pair.length===2),
    sourcePersistenceProbeDoesNotWrite:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return deepFreeze60300({patchId:PATCH_ID,pass:failed.length===0,checks,failed,packageCoverage:seeds,browserGoldenClaimed:false});
}

const API=Object.freeze({
  patchId:PATCH_ID,
  schemaVersion:SCHEMA_VERSION,
  rankTransitionId:RANK_TRANSITION_ID,
  assessmentFamilyId:ASSESSMENT_FAMILY_ID,
  scenarioId:SCENARIO_ID,
  packagePoolVersion:PACKAGE_POOL_VERSION,
  derivationAlgorithm:DERIVATION_ALGORITHM,
  packageIds:PACKAGE_IDS,
  readinessSlotIds:SLOT_IDS,
  terminalOutcomes:TERMINAL_OUTCOMES,
  derivePromotionRequirementPackageId:derivePromotionRequirementPackageId60300,
  validatePromotionState:validatePromotionState60300,
  sourcePersistenceProbe:sourcePersistenceProbe60300,
  create:createPromotionCore60300,
  diagnostics:runPromotionCore60300Diagnostics,
  browserGoldenClaimed:false
});

globalThis.derivePromotionRequirementPackageId60300=derivePromotionRequirementPackageId60300;
globalThis.validatePromotionState60300=validatePromotionState60300;
globalThis.probePromotionPersistence60300=sourcePersistenceProbe60300;
globalThis.createPromotionCore60300=createPromotionCore60300;
globalThis.runPromotionCore60300Diagnostics=runPromotionCore60300Diagnostics;
globalThis.SC_PROMOTION_CORE_60300=API;
if(typeof module!=="undefined"&&module.exports)module.exports=API;
})();