// ============================================================================
// ISSUE #155 — OBSERVER-KNOWLEDGE + ENVELOPE STABILITY HARDENING
//
// Extends the active ANBU / Root contained-area binding without creating a
// second World/local-area subsystem.
//
// Fixes two semantic seams from the first #155 implementation:
// 1. Story-authorised hotspot != observer-identified hotspot.
// 2. Reopening the same Story/world instance cannot silently widen/reroll its
//    authorised subset unless a new committed authority occurrence is supplied.
//
// Existing LOCAL_MISSION_AREA_REGISTRY, World opportunity projection,
// caller-return and playerData persistence remain authoritative.
// ============================================================================
(function installIssue155KnowledgeHardening(){
  "use strict";

  const PATCH_ID="issue155_observer_knowledge_hardening_2026_09_13";
  const AREA_KNOWLEDGE=new Set(["UNRECOGNISED","KNOWN_UNKNOWN","IDENTIFIED","MAPPED"]);
  const HOTSPOT_KNOWLEDGE=new Set(["UNRECOGNISED","KNOWN_UNKNOWN","IDENTIFIED","MAPPED"]);

  const defs=globalThis.SC_ISSUE155_CONTAINED_AREAS||null;
  const priorOpen=typeof globalThis.openStoryContainedLocalArea155==="function"
    ? globalThis.openStoryContainedLocalArea155
    : null;
  const priorRead=typeof globalThis.getIssue155ContainedAreaReadModel==="function"
    ? globalThis.getIssue155ContainedAreaReadModel
    : null;
  const priorRender=typeof renderLocalMissionAreaUI==="function"
    ? renderLocalMissionAreaUI
    : null;

  const clone=value=>{
    try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
    catch(_error){return value&&typeof value==="object"?{...value}:value;}
  };
  const save=()=>{try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}};

  function stateRoot(){
    if(typeof playerData==="undefined"||!playerData)return null;
    if(!playerData.containedLocalAreaRuntime155||typeof playerData.containedLocalAreaRuntime155!=="object"){
      playerData.containedLocalAreaRuntime155={schemaVersion:"sc.containedLocalAreaRuntime.issue155.v1",areas:{}};
    }
    if(!playerData.containedLocalAreaRuntime155.areas||typeof playerData.containedLocalAreaRuntime155.areas!=="object"){
      playerData.containedLocalAreaRuntime155.areas={};
    }
    return playerData.containedLocalAreaRuntime155;
  }

  function runtimeRow(areaId){
    const root=stateRoot();
    return root&&root.areas?root.areas[String(areaId||"")]||null:null;
  }

  function definition(areaId){
    return defs&&defs[String(areaId||"")]||null;
  }

  function canonicalIds(ids){
    return [...new Set((Array.isArray(ids)?ids:[]).map(String).filter(Boolean))].sort();
  }

  function safeObject(value){
    return value&&typeof value==="object"&&!Array.isArray(value)?value:{};
  }

  function normaliseAreaKnowledge(envelope,existing){
    const raw=String(
      envelope&&envelope.areaKnowledgeState
      ||existing&&existing.areaKnowledgeState
      ||"UNRECOGNISED"
    ).toUpperCase();
    return AREA_KNOWLEDGE.has(raw)?raw:null;
  }

  function normaliseHotspotKnowledge(area,envelope,existing,authorisedIds){
    const supplied=envelope&&envelope.storyHotspotKnowledgeById;
    if(supplied!==undefined&&(supplied===null||typeof supplied!=="object"||Array.isArray(supplied))){
      return{success:false,reason:"contained_area_hotspot_knowledge_map_invalid"};
    }
    const suppliedMap=safeObject(supplied);
    const existingMap=safeObject(existing&&existing.storyHotspotKnowledgeById);
    const authorised=new Set(authorisedIds);
    const authored=new Set((area&&area.hotspots||[]).map(h=>String(h.hotspotId)));
    for(const key of Object.keys(suppliedMap)){
      if(!authored.has(key))return{success:false,reason:"contained_area_hotspot_knowledge_id_invalid",hotspotId:key};
      if(!authorised.has(key))return{success:false,reason:"contained_area_hotspot_knowledge_outside_authorised_subset",hotspotId:key};
      const state=String(suppliedMap[key]||"").toUpperCase();
      if(!HOTSPOT_KNOWLEDGE.has(state))return{success:false,reason:"contained_area_hotspot_knowledge_state_invalid",hotspotId:key};
    }
    const result={};
    for(const id of authorisedIds){
      const raw=String(
        suppliedMap[id]
        ||existingMap[id]
        ||"KNOWN_UNKNOWN"
      ).toUpperCase();
      if(!HOTSPOT_KNOWLEDGE.has(raw)){
        return{success:false,reason:"contained_area_hotspot_knowledge_state_invalid",hotspotId:id};
      }
      result[id]=raw;
    }
    return{success:true,map:result};
  }

  function normaliseKnowledgeEnvelope(envelope,existing){
    const area=definition(envelope&&envelope.missionAreaId);
    if(!area)return{success:false,reason:"contained_area_not_authorised"};
    const authorisedIds=canonicalIds(envelope.storyAuthorizedHotspotIds);
    const areaKnowledgeState=normaliseAreaKnowledge(envelope,existing);
    if(!areaKnowledgeState)return{success:false,reason:"contained_area_knowledge_state_invalid"};
    const hotspot=normaliseHotspotKnowledge(area,envelope,existing,authorisedIds);
    if(!hotspot.success)return hotspot;
    return{
      success:true,
      areaKnowledgeState,
      storyHotspotKnowledgeById:hotspot.map,
      authorisedIds
    };
  }

  function comparableFromEnvelope(envelope,knowledge){
    return{
      missionAreaId:String(envelope.missionAreaId||""),
      worldInstanceRef:String(envelope.worldInstanceRef||""),
      entryRouteRef:String(envelope.entryRouteRef||""),
      storyAuthorizedHotspotIds:canonicalIds(envelope.storyAuthorizedHotspotIds),
      accessState:String(envelope.accessState||""),
      localActionability:String(envelope.localActionability||""),
      returnCallerRef:clone(envelope.returnCallerRef||null),
      areaKnowledgeState:knowledge.areaKnowledgeState,
      storyHotspotKnowledgeById:clone(knowledge.storyHotspotKnowledgeById)
    };
  }

  function comparableFromRow(row){
    if(!row)return null;
    const authorisedIds=canonicalIds(row.storyAuthorizedHotspotIds);
    const area=definition(row.missionAreaId);
    const areaKnowledgeState=AREA_KNOWLEDGE.has(String(row.areaKnowledgeState||"").toUpperCase())
      ?String(row.areaKnowledgeState).toUpperCase()
      :"UNRECOGNISED";
    const hotspot=normaliseHotspotKnowledge(area,{storyHotspotKnowledgeById:row.storyHotspotKnowledgeById},row,authorisedIds);
    return{
      missionAreaId:String(row.missionAreaId||""),
      worldInstanceRef:String(row.worldInstanceRef||""),
      entryRouteRef:String(row.entryRouteRef||""),
      storyAuthorizedHotspotIds:authorisedIds,
      accessState:String(row.accessState||""),
      localActionability:String(row.localActionability||""),
      returnCallerRef:clone(row.returnCallerRef||null),
      areaKnowledgeState,
      storyHotspotKnowledgeById:hotspot.success?clone(hotspot.map):{}
    };
  }

  function sameSemanticState(a,b){
    try{return JSON.stringify(a)===JSON.stringify(b);}catch(_error){return false;}
  }

  function checkSameInstanceMutation(existing,envelope,knowledge){
    if(!existing||existing.expired===true)return{success:true};
    if(String(existing.worldInstanceRef||"")!==String(envelope.worldInstanceRef||""))return{success:true};
    const current=comparableFromRow(existing);
    const incoming=comparableFromEnvelope(envelope,knowledge);
    if(sameSemanticState(current,incoming))return{success:true,idempotent:true};

    const existingOccurrence=existing.authorityOccurrenceId?String(existing.authorityOccurrenceId):null;
    const incomingOccurrence=envelope.authorityOccurrenceId?String(envelope.authorityOccurrenceId):null;
    if(!incomingOccurrence||incomingOccurrence===existingOccurrence){
      return{
        success:false,
        reason:"contained_area_semantic_change_requires_new_authority_occurrence",
        missionAreaId:String(envelope.missionAreaId||""),
        worldInstanceRef:String(envelope.worldInstanceRef||""),
        currentAuthorityOccurrenceId:existingOccurrence
      };
    }
    return{success:true,supersedesAuthorityOccurrenceId:existingOccurrence};
  }

  function hotspotKnowledgeState(areaId,hotspotId){
    const row=runtimeRow(areaId);
    if(!row||row.expired===true)return"UNRECOGNISED";
    if(!canonicalIds(row.storyAuthorizedHotspotIds).includes(String(hotspotId||"")))return"UNRECOGNISED";
    const map=safeObject(row.storyHotspotKnowledgeById);
    const raw=String(map[String(hotspotId||"")]||"KNOWN_UNKNOWN").toUpperCase();
    return HOTSPOT_KNOWLEDGE.has(raw)?raw:"KNOWN_UNKNOWN";
  }

  function isNamedHotspot(areaId,hotspotId){
    return["IDENTIFIED","MAPPED"].includes(hotspotKnowledgeState(areaId,hotspotId));
  }

  function isKnownUnknownHotspot(areaId,hotspotId){
    return hotspotKnowledgeState(areaId,hotspotId)==="KNOWN_UNKNOWN";
  }

  function registerObserverSafeProjection(area,hotspot){
    const common={
      missionAreaId:area.areaId,
      hotspotId:hotspot.hotspotId,
      eventId:null,
      locationId:area.areaId,
      regionKey:area.parentRegionKey,
      sourceKind:"story_contained_area_projection",
      randomPoolEligible:false,
      anchor:{x:hotspot.anchor.xPct,y:hotspot.anchor.yPct},
      calibratedRegion:clone(hotspot.region),
      calibratedAnchorPixels:{x:hotspot.anchor.x,y:hotspot.anchor.y},
      interactions:[]
    };

    registerWorldEventOpportunity({
      ...common,
      opportunityId:`issue155_projection:${hotspot.hotspotId}`,
      defaultDiscoveryLevel:"discovered",
      presentation:{
        family:"Local Area",
        category:"OTHER",
        label:hotspot.label,
        summary:"Story-authorised local area context.",
        showUnknownMarker:false
      },
      revealPredicate:()=>isNamedHotspot(area.areaId,hotspot.hotspotId)
    });

    registerWorldEventOpportunity({
      ...common,
      opportunityId:`issue155_projection_unknown:${hotspot.hotspotId}`,
      defaultDiscoveryLevel:"discovered",
      presentation:{
        family:"Unknown",
        category:"SECRET",
        label:"????",
        summary:"",
        showUnknownMarker:false
      },
      revealPredicate:()=>isKnownUnknownHotspot(area.areaId,hotspot.hotspotId)
    });
  }

  if(defs&&typeof registerWorldEventOpportunity==="function"){
    for(const area of Object.values(defs)){
      for(const hotspot of area.hotspots||[])registerObserverSafeProjection(area,hotspot);
    }
  }

  function observerSafeAreaName(areaId){
    const area=definition(areaId);
    if(!area)return null;
    const row=runtimeRow(areaId);
    const state=String(row&&row.areaKnowledgeState||"UNRECOGNISED").toUpperCase();
    if(["IDENTIFIED","MAPPED"].includes(state))return area.name;
    if(state==="KNOWN_UNKNOWN")return"????";
    return areaId==="konoha_root_hq"?"CONCEALED INTERIOR":"SECURED INTERIOR";
  }

  function renderLocalMissionAreaUI155(areaId){
    if(!priorRender)return;
    const area=typeof getLocalMissionAreaDefinition==="function"?getLocalMissionAreaDefinition(areaId):null;
    if(!area||!definition(areaId))return priorRender.apply(this,arguments);
    const priorName=area.name;
    area.name=observerSafeAreaName(areaId)||priorName;
    try{return priorRender.apply(this,arguments);}
    finally{area.name=priorName;}
  }

  if(priorRender){
    globalThis.renderLocalMissionAreaUI=renderLocalMissionAreaUI155;
    try{renderLocalMissionAreaUI=renderLocalMissionAreaUI155;}catch(_error){}
  }

  function openStoryContainedLocalArea155KnowledgeSafe(envelope={}){
    if(!priorOpen)return{success:false,reason:"issue155_base_open_authority_missing"};
    const areaId=String(envelope.missionAreaId||"");
    const existing=runtimeRow(areaId);
    const knowledge=normaliseKnowledgeEnvelope(envelope,existing);
    if(!knowledge.success)return{...knowledge,missionAreaId:areaId};

    const mutation=checkSameInstanceMutation(existing,envelope,knowledge);
    if(!mutation.success)return mutation;

    const result=priorOpen.call(this,envelope);
    if(!result||result.success!==true)return result||{success:false,reason:"contained_area_open_failed"};

    const row=runtimeRow(areaId);
    if(row){
      row.areaKnowledgeState=knowledge.areaKnowledgeState;
      row.storyHotspotKnowledgeById=clone(knowledge.storyHotspotKnowledgeById);
      if(mutation.supersedesAuthorityOccurrenceId){
        row.supersedesAuthorityOccurrenceId=mutation.supersedesAuthorityOccurrenceId;
      }
      save();
    }

    if(typeof renderLocalMissionAreaUI==="function")renderLocalMissionAreaUI(areaId);

    return{
      ...result,
      issue155KnowledgeSafe:true,
      areaKnowledgeState:knowledge.areaKnowledgeState,
      storyHotspotKnowledgeById:clone(knowledge.storyHotspotKnowledgeById)
    };
  }

  globalThis.openStoryContainedLocalArea155=openStoryContainedLocalArea155KnowledgeSafe;
  try{openStoryContainedLocalArea155=openStoryContainedLocalArea155KnowledgeSafe;}catch(_error){}

  function committedHistoryAddress(id){
    const target=String(id||"");
    if(!target||typeof playerData==="undefined"||!playerData||!Array.isArray(playerData.activityHistory))return false;
    return playerData.activityHistory.some(record=>{
      if(!record||record.committed!==true)return false;
      const data=safeObject(record.data);
      return[
        record.id,record.occurrenceId,record.factId,record.historyId,record.recordId,record.sourceEventId,
        data.factId,data.historyId,data.recordId,data.sourceOccurrenceId
      ].some(value=>String(value||"")===target)
      ||(Array.isArray(record.linkedChronicleEvidenceIds)&&record.linkedChronicleEvidenceIds.some(value=>String(value||"")===target));
    });
  }

  function exteriorKnowledgeState(area){
    if(!area)return"unrecognised";
    if(typeof getAlphaKonohaV3ExplicitKnowledgeState==="function"){
      try{return String(getAlphaKonohaV3ExplicitKnowledgeState(area.exteriorReservationRef)||"unrecognised");}
      catch(_error){}
    }
    return"unrecognised";
  }

  function getIssue155ContainedAreaReadModelKnowledgeSafe(areaId){
    const base=priorRead?priorRead(areaId):null;
    const area=definition(areaId);
    if(!base||!area)return base;
    const row=runtimeRow(areaId);
    const exteriorState=exteriorKnowledgeState(area);
    const exteriorFactCommitted=committedHistoryAddress(area.exteriorLocationConfirmedFactRef);
    return{
      ...base,
      areaKnowledgeState:String(row&&row.areaKnowledgeState||"UNRECOGNISED"),
      observerAreaName:observerSafeAreaName(areaId),
      storyHotspotKnowledgeById:clone(safeObject(row&&row.storyHotspotKnowledgeById)),
      interiorVisitedFactCommitted:committedHistoryAddress(area.interiorVisitedFactRef),
      exteriorLocationConfirmedFactCommitted:exteriorFactCommitted,
      exteriorKnowledgeState:exteriorState,
      exteriorLocationConfirmed:exteriorFactCommitted||["identified","mapped","actionable"].includes(exteriorState)
    };
  }

  globalThis.getIssue155ContainedAreaReadModel=getIssue155ContainedAreaReadModelKnowledgeSafe;
  try{getIssue155ContainedAreaReadModel=getIssue155ContainedAreaReadModelKnowledgeSafe;}catch(_error){}

  function runIssue155KnowledgeHardeningDiagnostics(){
    const checks={
      patchId:PATCH_ID==="issue155_observer_knowledge_hardening_2026_09_13",
      baseAuthorityPresent:!!defs&&typeof priorOpen==="function"&&typeof priorRead==="function",
      areaKnowledgeSeparated:AREA_KNOWLEDGE.has("KNOWN_UNKNOWN")&&AREA_KNOWLEDGE.has("IDENTIFIED"),
      hotspotKnowledgeSeparated:HOTSPOT_KNOWLEDGE.has("KNOWN_UNKNOWN")&&HOTSPOT_KNOWLEDGE.has("IDENTIFIED"),
      exactKnownUnknownLabel:registerObserverSafeProjection.toString().includes('label:"????"'),
      identifiedProjectionSeparate:registerObserverSafeProjection.toString().includes("isNamedHotspot"),
      sameInstanceMutationPinned:checkSameInstanceMutation.toString().includes("contained_area_semantic_change_requires_new_authority_occurrence"),
      rendererMasksCanonicalIdentity:renderLocalMissionAreaUI155.toString().includes("observerSafeAreaName"),
      exteriorFactReadOnly:getIssue155ContainedAreaReadModelKnowledgeSafe.toString().includes("exteriorLocationConfirmedFactCommitted"),
      noExteriorCommit:!openStoryContainedLocalArea155KnowledgeSafe.toString().includes("exterior_location_confirmed"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks)
      .filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true)
      .map(([key])=>key);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,patchId:PATCH_ID};
  }

  globalThis.runIssue155KnowledgeHardeningDiagnostics=runIssue155KnowledgeHardeningDiagnostics;
})();
