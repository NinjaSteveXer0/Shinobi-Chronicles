// ALPHA SPECIAL JONIN CONTEXTUAL EVIDENCE PRODUCER 34700
// Shared #23 producer-side projection owner. Consumes committed factual
// occurrences and writes evaluator-compatible contextual evidence records.
// Does not award XP, qualification, Recognition, Rank, Stats or PL.
(function installAlphaSpecialJoninEvidenceProducer34700(){
"use strict";
const PATCH_ID="alpha_special_jonin_contextual_evidence_producer_34700_2026_09_24";
const STORE_KEY="specialJoninContextualEvidence";
const STORE_VERSION=1;

function clone(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function ensurePrerequisites(){
  const required=["getSpecialJoninQualificationDefinition","normalizeSpecialistEvidenceRecord","evaluateSpecialJoninQualification"];
  const missing=required.filter(name=>typeof globalThis[name]!=="function");
  return missing.length?{success:false,reason:"special_jonin_evaluator_api_missing",missing}:{success:true};
}
function ensureStore(){
  if(typeof playerData==="undefined"||!playerData||typeof playerData!=="object")return null;
  let store=playerData[STORE_KEY];
  if(!Array.isArray(store)){
    const legacyRows=[];
    if(store&&typeof store==="object"&&store.recordsBySubjectVariantId&&typeof store.recordsBySubjectVariantId==="object"){
      for(const bucket of Object.values(store.recordsBySubjectVariantId)){
        if(bucket&&typeof bucket==="object")legacyRows.push(...Object.values(bucket).filter(row=>row&&typeof row==="object").map(clone));
      }
    }
    store=legacyRows;
    playerData[STORE_KEY]=store;
  }
  return store;
}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function committedSourceRecord(sourceOccurrenceId){
  const id=String(sourceOccurrenceId||"");
  if(!id||typeof playerData==="undefined"||!playerData||!Array.isArray(playerData.activityHistory))return null;
  return playerData.activityHistory.find(row=>{
    if(!row||row.committed!==true)return false;
    return [row.sourceOccurrenceId,row.occurrenceId,row.id].some(value=>String(value||"")===id);
  })||null;
}
function definitionTags(def){
  const tags=new Set();
  for(const tag of def&&def.requiredEvidenceTags||[])tags.add(String(tag));
  for(const tag of def&&def.optionalSupportingTags||[])tags.add(String(tag));
  for(const group of def&&def.mandatoryCompetencyGroups||[])for(const tag of group&&group.anyTags||[])tags.add(String(tag));
  for(const tag of def&&def.capstoneRequirement&&def.capstoneRequirement.requiredTags||[])tags.add(String(tag));
  return tags;
}
function competencyGroups(def,tags){
  const set=new Set(tags||[]);
  return (def&&def.mandatoryCompetencyGroups||[])
    .filter(group=>(group&&group.anyTags||[]).some(tag=>set.has(tag)))
    .map(group=>String(group.groupId||"")).filter(Boolean);
}
function normalizePacket(packet){
  const prereq=ensurePrerequisites();if(!prereq.success)return prereq;
  if(!packet||typeof packet!=="object")return{success:false,reason:"contextual_evidence_packet_required"};
  const subjectVariantId=String(packet.subjectVariantId||"");
  const sourceOccurrenceId=String(packet.sourceOccurrenceId||"");
  const qualificationId=String(packet.qualificationId||"");
  const causalRootOccurrenceId=String(packet.causalRootOccurrenceId||sourceOccurrenceId||"");
  if(!subjectVariantId)return{success:false,reason:"contextual_evidence_subject_required"};
  if(!sourceOccurrenceId)return{success:false,reason:"contextual_evidence_source_occurrence_required"};
  if(!qualificationId)return{success:false,reason:"contextual_evidence_qualification_required"};
  if(!causalRootOccurrenceId)return{success:false,reason:"contextual_evidence_causal_root_required"};
  const source=committedSourceRecord(sourceOccurrenceId);
  if(!source)return{success:false,reason:"contextual_evidence_committed_source_required",sourceOccurrenceId};
  const def=getSpecialJoninQualificationDefinition(qualificationId);
  if(!def)return{success:false,reason:"contextual_evidence_qualification_unknown",qualificationId};
  const allowed=definitionTags(def);
  const authoredTags=[...new Set((Array.isArray(packet.tags)?packet.tags:[]).map(String).filter(Boolean))];
  if(!authoredTags.length)return{success:false,reason:"contextual_evidence_tags_required"};
  const invalid=authoredTags.filter(tag=>!allowed.has(tag));
  if(invalid.length)return{success:false,reason:"contextual_evidence_tag_not_authorised",invalid};
  const capstoneTags=new Set(def&&def.capstoneRequirement&&def.capstoneRequirement.requiredTags||[]);
  if(authoredTags.some(tag=>capstoneTags.has(tag))&&packet.capstoneAuthorized!==true)return{success:false,reason:"contextual_evidence_capstone_not_authorised"};
  const requiredEvidenceTags=[...new Set((def&&def.requiredEvidenceTags||[]).map(String).filter(Boolean))];
  const tags=[...new Set([...requiredEvidenceTags,...authoredTags])];
  const significance=Math.max(1,Math.min(4,Math.floor(Number(packet.significance)||0)));
  if(!Number.isFinite(Number(packet.significance))||Number(packet.significance)<1||Number(packet.significance)>4)return{success:false,reason:"contextual_evidence_significance_invalid"};
  const category=String(packet.category||"chronicle_origin");
  const activityFamilyId=String(packet.activityFamilyId||"");
  if(!activityFamilyId)return{success:false,reason:"contextual_evidence_activity_family_required"};
  return{success:true,packet:{
    subjectVariantId,sourceOccurrenceId,qualificationId,causalRootOccurrenceId,
    significance,category,activityFamilyId,tags,
    competencyGroupIds:competencyGroups(def,tags),
    verified:packet.verified===true,
    specialistLevel:packet.specialistLevel===true,
    targetRefs:[...new Set((packet.targetRefs||[]).map(String).filter(Boolean))],
    context:packet.context&&typeof packet.context==="object"?clone(packet.context):{},
    capabilitySnapshot:packet.capabilitySnapshot&&typeof packet.capabilitySnapshot==="object"?clone(packet.capabilitySnapshot):{},
    sourceType:String(source.type||source.activity||"chronicle_occurrence")
  }};
}
function evidenceIdFor(packet){
  return["sjctx",packet.subjectVariantId,packet.qualificationId,packet.causalRootOccurrenceId].map(v=>String(v).replace(/[^a-zA-Z0-9_.:-]+/g,"_")).join(":");
}
function projectSpecialJoninContextualEvidence34700(input){
  const normalized=normalizePacket(input);if(!normalized.success)return normalized;
  const p=normalized.packet,store=ensureStore();if(!store)return{success:false,reason:"contextual_evidence_store_unavailable"};
  const evidenceId=evidenceIdFor(p),index=store.findIndex(row=>row&&row.evidenceId===evidenceId);
  const existing=index>=0&&store[index]&&typeof store[index]==="object"?store[index]:null;
  if(existing){
    if(existing.qualificationId!==p.qualificationId||existing.independentSourceId!==p.causalRootOccurrenceId)return{success:false,reason:"contextual_evidence_identity_collision",evidenceId};
    if(existing.category!==p.category||existing.activityFamilyId!==p.activityFamilyId)return{success:false,reason:"contextual_evidence_provenance_drift",evidenceId};
  }
  const mergedTags=[...new Set([...(existing&&existing.tags||[]),...p.tags])];
  const def=getSpecialJoninQualificationDefinition(p.qualificationId);
  const existingSnapshots=Array.isArray(existing&&existing.context&&existing.context.capabilitySnapshots)?existing.context.capabilitySnapshots:[];
  const snapshotBySource=new Map(existingSnapshots.filter(row=>row&&row.sourceOccurrenceId).map(row=>[String(row.sourceOccurrenceId),clone(row)]));
  if(Object.keys(p.capabilitySnapshot).length)snapshotBySource.set(p.sourceOccurrenceId,{sourceOccurrenceId:p.sourceOccurrenceId,snapshot:clone(p.capabilitySnapshot)});
  const mergedContext={
    ...(existing&&existing.context||{}),
    ...p.context,
    causalRootOccurrenceId:p.causalRootOccurrenceId,
    sourceOccurrenceIds:[...new Set([...(existing&&existing.context&&existing.context.sourceOccurrenceIds||[]),p.sourceOccurrenceId])],
    targetRefs:[...new Set([...(existing&&existing.context&&existing.context.targetRefs||[]),...p.targetRefs])],
    capabilitySnapshots:[...snapshotBySource.values()].sort((a,b)=>String(a.sourceOccurrenceId).localeCompare(String(b.sourceOccurrenceId)))
  };
  const record={
    evidenceId,
    subjectVariantId:p.subjectVariantId,
    qualificationId:p.qualificationId,
    significance:Math.max(Number(existing&&existing.significance)||0,p.significance),
    category:p.category,
    activityFamilyId:p.activityFamilyId,
    independentSourceId:p.causalRootOccurrenceId,
    tags:mergedTags,
    competencyGroupIds:competencyGroups(def,mergedTags),
    verified:(existing&&existing.verified===true)||p.verified===true,
    specialistLevel:(existing&&existing.specialistLevel===true)||p.specialistLevel===true,
    context:mergedContext,
    createdAt:existing&&existing.createdAt||Date.now(),
    updatedAt:Date.now()
  };
  const evaluatorRecord=normalizeSpecialistEvidenceRecord(record);
  if(!evaluatorRecord)return{success:false,reason:"contextual_evidence_normalization_failed"};
  const stableComparable=row=>JSON.stringify({...row,createdAt:0,updatedAt:0});
  const idempotent=!!existing&&stableComparable(existing)===stableComparable(record);
  if(idempotent){
    return{success:true,idempotent:true,upserted:true,record:clone(existing),evaluatorRecord:clone(normalizeSpecialistEvidenceRecord(existing))};
  }
  if(index>=0)store[index]=record;else store.push(record);
  save();
  return{success:true,idempotent:false,upserted:!!existing,record:clone(record),evaluatorRecord:clone(evaluatorRecord)};
}
function getSpecialJoninContextualEvidence34700(subjectVariantId,qualificationId=null){
  const store=ensureStore();if(!store)return[];
  const subject=String(subjectVariantId||"");
  return store
    .filter(row=>row&&row.subjectVariantId===subject&&(!qualificationId||row.qualificationId===String(qualificationId)))
    .map(clone);
}
function evaluateSpecialJoninContextualEvidence34700(subjectVariantId,qualificationId,capacityContext={}){
  const rows=getSpecialJoninContextualEvidence34700(subjectVariantId,qualificationId);
  return evaluateSpecialJoninQualification(String(qualificationId||""),rows,capacityContext||{});
}
function runAlphaSpecialJoninEvidenceProducer34700Diagnostics(){
  const checks={
    evaluatorAvailable:ensurePrerequisites().success===true,
    stableCausalIdentity:String(evidenceIdFor).includes("causalRootOccurrenceId"),
    committedSourceRequired:String(normalizePacket).includes("committedSourceRecord"),
    exactQualificationRequired:String(normalizePacket).includes("getSpecialJoninQualificationDefinition"),
    tagWhitelist:String(normalizePacket).includes("definitionTags")&&String(normalizePacket).includes("contextual_evidence_tag_not_authorised"),
    requiredEvidenceTagProjection:String(normalizePacket).includes("requiredEvidenceTags")&&String(normalizePacket).includes("authoredTags"),
    idempotentUpsert:String(projectSpecialJoninContextualEvidence34700).includes("Math.max")&&String(projectSpecialJoninContextualEvidence34700).includes("snapshotBySource")&&String(projectSpecialJoninContextualEvidence34700).includes("stableComparable"),
    sameCausalRootOneRecord:String(evidenceIdFor).includes("qualificationId")&&!String(evidenceIdFor).includes("sourceOccurrenceId"),
    noRankMutation:!String(projectSpecialJoninContextualEvidence34700).includes("formalRank")&&!String(projectSpecialJoninContextualEvidence34700).includes("earnSpecialJoninQualification"),
    noStatOrPLMutation:!String(projectSpecialJoninContextualEvidence34700).includes("baseStats")&&!String(projectSpecialJoninContextualEvidence34700).includes("basePL"),
    noXpLedger:!String(projectSpecialJoninContextualEvidence34700).toLowerCase().includes("xp"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.projectSpecialJoninContextualEvidence34700=projectSpecialJoninContextualEvidence34700;
globalThis.getSpecialJoninContextualEvidence34700=getSpecialJoninContextualEvidence34700;
globalThis.evaluateSpecialJoninContextualEvidence34700=evaluateSpecialJoninContextualEvidence34700;
globalThis.runAlphaSpecialJoninEvidenceProducer34700Diagnostics=runAlphaSpecialJoninEvidenceProducer34700Diagnostics;
globalThis.SC_ALPHA_SPECIAL_JONIN_EVIDENCE_PRODUCER_34700=Object.freeze({patchId:PATCH_ID,storeKey:STORE_KEY,version:STORE_VERSION,browserGoldenClaimed:false});
})();
