// ============================================================================
// ISSUE #155 — ANBU + ROOT STORY-CONTAINED LOCAL AREA BINDING
// Authority:
// - Documentation/World/ANBU Root Contained Local Area Final Hotspot Calibration
//   and Runtime Binding 2026-09-13.md
// - Documentation/World/Story-Gated Local Area Access Persistent Discovery and
//   Opportunity Eligibility Contract 2026-09-11.md
//
// Reuses the existing LOCAL_MISSION_AREA_REGISTRY + World opportunity projection
// and existing mission-area caller/return/save machinery. This file does not
// create a second World, Story, discovery or history subsystem.
//
// Hard boundary: interior visit != exterior Konoha-location confirmation.
// ============================================================================
(function installIssue155ContainedLocalAreas(){
  "use strict";

  const PATCH_ID="issue155_anbu_root_contained_local_areas_2026_09_13";
  const STATE_SCHEMA="sc.containedLocalAreaRuntime.issue155.v1";
  const ACTIVE_ACCESS=new Set(["STORY_TEMPORARY","ESCORTED_TEMPORARY"]);
  const ACTIONABILITY=new Set(["STORY_ONLY","LIMITED","GENERAL"]);

  const AREA_DEFINITIONS=Object.freeze({
    konoha_anbu_hq:Object.freeze({
      areaId:"konoha_anbu_hq",
      name:"ANBU Headquarters",
      mapImage:"Konoha Locations/anbu_hq.png",
      assetBlobSha:"af1d79954715510b07415cbca71c4feb7a70b5e5",
      nativeWidth:1536,nativeHeight:1024,parentRegionKey:"fire",
      exteriorReservationRef:"KON-S03",
      interiorVisitedFactRef:"anbu_hq_interior_visited",
      exteriorLocationConfirmedFactRef:"anbu_hq_exterior_location_confirmed",
      hotspots:Object.freeze([
        Object.freeze({hotspotId:"anbu_hq_hotspot_secure_threshold",label:"Secure Threshold",region:{x1:500,y1:675,x2:835,y2:955},anchor:{x:665,y:815,xPct:43.29,yPct:79.59}}),
        Object.freeze({hotspotId:"anbu_hq_hotspot_transit_hall",label:"Transit Hall",region:{x1:460,y1:295,x2:860,y2:470},anchor:{x:660,y:380,xPct:42.97,yPct:37.11}}),
        Object.freeze({hotspotId:"anbu_hq_hotspot_operations_concourse",label:"Operations Concourse",region:{x1:560,y1:100,x2:930,y2:330},anchor:{x:755,y:235,xPct:49.15,yPct:22.95}}),
        Object.freeze({hotspotId:"anbu_hq_hotspot_briefing_chamber",label:"Briefing Chamber",region:{x1:845,y1:285,x2:1115,y2:460},anchor:{x:985,y:370,xPct:64.13,yPct:36.13}}),
        Object.freeze({hotspotId:"anbu_hq_hotspot_records_annex",label:"Records Annex",region:{x1:1170,y1:300,x2:1505,y2:500},anchor:{x:1350,y:400,xPct:87.89,yPct:39.06}}),
        Object.freeze({hotspotId:"anbu_hq_hotspot_equipment_bay",label:"Equipment Bay",region:{x1:35,y1:300,x2:390,y2:525},anchor:{x:220,y:415,xPct:14.32,yPct:40.53}}),
        Object.freeze({hotspotId:"anbu_hq_hotspot_observation_gallery",label:"Observation Gallery",region:{x1:1110,y1:70,x2:1515,y2:270},anchor:{x:1295,y:170,xPct:84.31,yPct:16.60}}),
        Object.freeze({hotspotId:"anbu_hq_hotspot_lower_service_junction",label:"Lower Service Junction",region:{x1:535,y1:455,x2:930,y2:690},anchor:{x:735,y:575,xPct:47.85,yPct:56.15}})
      ])
    }),
    konoha_root_hq:Object.freeze({
      areaId:"konoha_root_hq",
      name:"Root Headquarters",
      mapImage:"Konoha Locations/root_hq.png",
      assetBlobSha:"1e321a3ac16b44ff8f12b54afcf36dc6f81f836a",
      nativeWidth:1536,nativeHeight:1024,parentRegionKey:"fire",
      exteriorReservationRef:"KON-S04",
      interiorVisitedFactRef:"root_hq_interior_visited",
      exteriorLocationConfirmedFactRef:"root_hq_exterior_location_confirmed",
      hotspots:Object.freeze([
        Object.freeze({hotspotId:"root_hq_hotspot_concealed_threshold",label:"Concealed Threshold",region:{x1:185,y1:20,x2:420,y2:210},anchor:{x:295,y:105,xPct:19.21,yPct:10.25}}),
        Object.freeze({hotspotId:"root_hq_hotspot_silent_concourse",label:"Silent Concourse",region:{x1:560,y1:320,x2:930,y2:560},anchor:{x:750,y:445,xPct:48.83,yPct:43.46}}),
        Object.freeze({hotspotId:"root_hq_hotspot_training_assessment_hall",label:"Training / Assessment Hall",region:{x1:300,y1:320,x2:570,y2:550},anchor:{x:440,y:435,xPct:28.65,yPct:42.48}}),
        Object.freeze({hotspotId:"root_hq_hotspot_records_vault",label:"Records Vault",region:{x1:835,y1:125,x2:1105,y2:315},anchor:{x:970,y:220,xPct:63.15,yPct:21.48}}),
        Object.freeze({hotspotId:"root_hq_hotspot_interview_chamber",label:"Interview Chamber",region:{x1:385,y1:145,x2:625,y2:310},anchor:{x:505,y:225,xPct:32.88,yPct:21.97}}),
        Object.freeze({hotspotId:"root_hq_hotspot_operations_gallery",label:"Operations Gallery",region:{x1:500,y1:540,x2:850,y2:735},anchor:{x:675,y:625,xPct:43.95,yPct:61.04}}),
        Object.freeze({hotspotId:"root_hq_hotspot_command_chamber",label:"Command Chamber",region:{x1:610,y1:125,x2:890,y2:340},anchor:{x:750,y:235,xPct:48.83,yPct:22.95}}),
        Object.freeze({hotspotId:"root_hq_hotspot_sealed_lower_junction",label:"Sealed Lower Junction",region:{x1:700,y1:650,x2:1015,y2:930},anchor:{x:860,y:805,xPct:55.99,yPct:78.61}})
      ])
    })
  });

  const clone=value=>{
    try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
    catch(_error){return value&&typeof value==="object"?{...value}:value;}
  };
  const save=()=>{try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}};

  function ensureState(){
    if(typeof playerData==="undefined"||!playerData)return{schemaVersion:STATE_SCHEMA,areas:{}};
    if(!playerData.containedLocalAreaRuntime155||typeof playerData.containedLocalAreaRuntime155!=="object"||Array.isArray(playerData.containedLocalAreaRuntime155)){
      playerData.containedLocalAreaRuntime155={schemaVersion:STATE_SCHEMA,areas:{}};
    }
    const state=playerData.containedLocalAreaRuntime155;
    state.schemaVersion=STATE_SCHEMA;
    if(!state.areas||typeof state.areas!=="object"||Array.isArray(state.areas))state.areas={};
    return state;
  }

  function getAreaDefinition(areaId){return AREA_DEFINITIONS[String(areaId||"")]||null;}
  function getAreaRuntime(areaId){
    const state=ensureState();
    const row=state.areas[String(areaId||"")];
    return row&&typeof row==="object"?row:null;
  }
  function validHotspotSet(area,ids){
    const authored=new Set(area.hotspots.map(h=>h.hotspotId));
    const unique=[...new Set((Array.isArray(ids)?ids:[]).map(String).filter(Boolean))];
    return unique.length>0&&unique.every(id=>authored.has(id))?unique:null;
  }
  function isAreaAccessLive(areaId){
    const row=getAreaRuntime(areaId);
    return !!(row&&ACTIVE_ACCESS.has(String(row.accessState||""))&&row.expired!==true);
  }
  function isHotspotAuthorised(areaId,hotspotId){
    const row=getAreaRuntime(areaId);
    return !!(isAreaAccessLive(areaId)&&row&&Array.isArray(row.storyAuthorizedHotspotIds)&&row.storyAuthorizedHotspotIds.includes(String(hotspotId||"")));
  }

  function validateEnvelope(areaId,envelope){
    const area=getAreaDefinition(areaId);
    if(!area)return{success:false,reason:"contained_area_not_authorised",areaId};
    if(!envelope||typeof envelope!=="object")return{success:false,reason:"contained_area_story_envelope_required",areaId};
    if(String(envelope.missionAreaId||"")!==area.areaId)return{success:false,reason:"contained_area_mission_area_mismatch",areaId};
    if(!envelope.worldInstanceRef)return{success:false,reason:"contained_area_world_instance_ref_required",areaId};
    if(!envelope.entryRouteRef)return{success:false,reason:"contained_area_entry_route_ref_required",areaId};
    const ids=validHotspotSet(area,envelope.storyAuthorizedHotspotIds);
    if(!ids)return{success:false,reason:"contained_area_authorised_hotspot_subset_invalid",areaId};
    if(!ACTIVE_ACCESS.has(String(envelope.accessState||"")))return{success:false,reason:"contained_area_story_access_state_invalid",areaId};
    if(!ACTIONABILITY.has(String(envelope.localActionability||"")))return{success:false,reason:"contained_area_actionability_invalid",areaId};
    if(!envelope.returnCallerRef||typeof envelope.returnCallerRef!=="object")return{success:false,reason:"contained_area_return_caller_required",areaId};
    return{success:true,area,storyAuthorizedHotspotIds:ids};
  }

  function canonicalEnvelope(areaId,envelope,ids){
    return{
      missionAreaId:areaId,
      worldInstanceRef:String(envelope.worldInstanceRef),
      entryRouteRef:String(envelope.entryRouteRef),
      storyAuthorizedHotspotIds:[...ids],
      accessState:String(envelope.accessState),
      localActionability:String(envelope.localActionability),
      returnCallerRef:clone(envelope.returnCallerRef),
      authorityOccurrenceId:envelope.authorityOccurrenceId?String(envelope.authorityOccurrenceId):null
    };
  }

  function sameSemanticEnvelope(a,b){
    if(!a||!b)return false;
    const keys=["missionAreaId","worldInstanceRef","entryRouteRef","accessState","localActionability","authorityOccurrenceId"];
    return keys.every(key=>(a[key]||null)===(b[key]||null))
      &&JSON.stringify(a.storyAuthorizedHotspotIds||[])===JSON.stringify(b.storyAuthorizedHotspotIds||[])
      &&JSON.stringify(a.returnCallerRef||null)===JSON.stringify(b.returnCallerRef||null);
  }

  function persistEnvelope(areaId,envelope,{saveState=true}={}){
    const state=ensureState();
    const existing=state.areas[areaId]||null;
    if(existing&&existing.expired!==true&&sameSemanticEnvelope(existing,envelope))return{success:true,idempotent:true,state:clone(existing)};
    const next={
      ...clone(envelope),
      enteredAt:existing&&existing.enteredAt?existing.enteredAt:Date.now(),
      lastAuthorisedAt:Date.now(),
      expired:false,
      // Operational physical-entry record only. This never establishes the
      // separately-owned exterior-location-confirmed fact.
      interiorVisitObserved:true,
      interiorVisitedFactRef:getAreaDefinition(areaId).interiorVisitedFactRef,
      exteriorLocationConfirmedFactRef:getAreaDefinition(areaId).exteriorLocationConfirmedFactRef,
      exteriorLocationConfirmed:false
    };
    state.areas[areaId]=next;
    if(saveState)save();
    return{success:true,idempotent:false,state:clone(next)};
  }

  function buildReturnContext(envelope){
    const caller=clone(envelope.returnCallerRef)||{};
    return{...caller,containedLocalArea155:{
      missionAreaId:envelope.missionAreaId,
      worldInstanceRef:envelope.worldInstanceRef,
      entryRouteRef:envelope.entryRouteRef,
      storyAuthorizedHotspotIds:[...envelope.storyAuthorizedHotspotIds],
      accessState:envelope.accessState,
      localActionability:envelope.localActionability,
      authorityOccurrenceId:envelope.authorityOccurrenceId||null
    }};
  }

  function evaluateAreaEntry({area,returnContext}){
    const embedded=returnContext&&returnContext.containedLocalArea155;
    if(embedded){
      const candidate={...embedded,returnCallerRef:(()=>{const c=clone(returnContext);delete c.containedLocalArea155;return c;})()};
      const valid=validateEnvelope(area.areaId,candidate);
      return valid.success?{available:true}:{available:false,reason:valid.reason};
    }
    return isAreaAccessLive(area.areaId)?{available:true}:{available:false,reason:"contained_area_story_access_required"};
  }

  function onAreaEnter({area,returnContext}){
    const embedded=returnContext&&returnContext.containedLocalArea155;
    if(!embedded){
      return isAreaAccessLive(area.areaId)?{success:true,idempotent:true}:{success:false,reason:"contained_area_story_access_required"};
    }
    const caller=clone(returnContext);delete caller.containedLocalArea155;
    const raw={...embedded,returnCallerRef:caller};
    const valid=validateEnvelope(area.areaId,raw);
    if(!valid.success)return valid;
    return persistEnvelope(area.areaId,canonicalEnvelope(area.areaId,raw,valid.storyAuthorizedHotspotIds));
  }

  function registerArea(area){
    const result=registerLocalMissionArea({
      areaId:area.areaId,name:area.name,description:"",mapImage:area.mapImage,parentRegionKey:area.parentRegionKey,
      assetBlobSha:area.assetBlobSha,nativeWidth:area.nativeWidth,nativeHeight:area.nativeHeight,
      exteriorReservationRef:area.exteriorReservationRef,interiorVisitedFactRef:area.interiorVisitedFactRef,
      exteriorLocationConfirmedFactRef:area.exteriorLocationConfirmedFactRef,calibratedHotspots:clone(area.hotspots),
      evaluateEntry:evaluateAreaEntry,onEnter:onAreaEnter
    });
    if(!result||result.success!==true)return result;
    for(const hotspot of area.hotspots){
      const opportunityId=`issue155_projection:${hotspot.hotspotId}`;
      const registered=registerWorldEventOpportunity({
        opportunityId,
        missionAreaId:area.areaId,
        hotspotId:hotspot.hotspotId,
        eventId:null,
        locationId:area.areaId,
        regionKey:area.parentRegionKey,
        sourceKind:"story_contained_area_projection",
        randomPoolEligible:false,
        defaultDiscoveryLevel:"discovered",
        presentation:{family:"Local Area",category:"OTHER",label:hotspot.label,summary:"Story-authorised local area context.",showUnknownMarker:false},
        anchor:{x:hotspot.anchor.xPct,y:hotspot.anchor.yPct},
        calibratedRegion:clone(hotspot.region),
        calibratedAnchorPixels:{x:hotspot.anchor.x,y:hotspot.anchor.y},
        revealPredicate:()=>isHotspotAuthorised(area.areaId,hotspot.hotspotId),
        interactions:[]
      });
      if(!registered||registered.success!==true)return registered;
    }
    return{success:true,areaId:area.areaId,hotspotCount:area.hotspots.length};
  }

  Object.values(AREA_DEFINITIONS).forEach(registerArea);

  function openStoryContainedLocalArea155(envelope={}){
    const areaId=String(envelope.missionAreaId||"");
    const valid=validateEnvelope(areaId,envelope);
    if(!valid.success)return valid;
    const canonical=canonicalEnvelope(areaId,envelope,valid.storyAuthorizedHotspotIds);
    const returnContext=buildReturnContext(canonical);
    const requestedFocus=canonical.storyAuthorizedHotspotIds.includes(canonical.entryRouteRef)?canonical.entryRouteRef:null;
    const opened=openLocalMissionArea(areaId,{returnContext,hotspotId:requestedFocus,restoring:false});
    if(!opened||opened.success!==true)return opened||{success:false,reason:"contained_area_open_failed"};
    return{...opened,issue155:true,areaId,accessState:canonical.accessState,localActionability:canonical.localActionability,storyAuthorizedHotspotIds:[...canonical.storyAuthorizedHotspotIds]};
  }

  function expireStoryContainedLocalAreaAccess155({missionAreaId,worldInstanceRef,sourceOccurrenceId}={}){
    const areaId=String(missionAreaId||"");
    const area=getAreaDefinition(areaId);
    if(!area)return{success:false,reason:"contained_area_not_authorised",areaId};
    if(!sourceOccurrenceId)return{success:false,reason:"contained_area_access_expiry_occurrence_required",areaId};
    const state=ensureState();
    const row=state.areas[areaId];
    if(!row)return{success:false,reason:"contained_area_access_state_missing",areaId};
    if(worldInstanceRef&&String(worldInstanceRef)!==String(row.worldInstanceRef||""))return{success:false,reason:"contained_area_world_instance_mismatch",areaId};
    if(row.expired===true&&row.expiredByOccurrenceId===String(sourceOccurrenceId))return{success:true,idempotent:true,state:clone(row)};
    row.expired=true;
    row.accessState="NO_ACCESS";
    row.localActionability="NONE";
    row.storyAuthorizedHotspotIds=[];
    row.expiredByOccurrenceId=String(sourceOccurrenceId);
    row.expiredAt=Date.now();
    save();
    return{success:true,idempotent:false,state:clone(row)};
  }

  function getIssue155ContainedAreaReadModel(areaId){
    const area=getAreaDefinition(areaId);
    if(!area)return null;
    const row=getAreaRuntime(area.areaId);
    return{
      areaId:area.areaId,mapImage:area.mapImage,assetBlobSha:area.assetBlobSha,nativeWidth:area.nativeWidth,nativeHeight:area.nativeHeight,
      exteriorReservationRef:area.exteriorReservationRef,interiorVisitedFactRef:area.interiorVisitedFactRef,
      exteriorLocationConfirmedFactRef:area.exteriorLocationConfirmedFactRef,
      accessState:row&&row.accessState||"NO_ACCESS",localActionability:row&&row.localActionability||"NONE",
      worldInstanceRef:row&&row.worldInstanceRef||null,entryRouteRef:row&&row.entryRouteRef||null,
      storyAuthorizedHotspotIds:row&&Array.isArray(row.storyAuthorizedHotspotIds)?[...row.storyAuthorizedHotspotIds]:[],
      interiorVisitObserved:!!(row&&row.interiorVisitObserved),
      exteriorLocationConfirmed:false,
      hotspotCount:area.hotspots.length
    };
  }

  function runIssue155ContainedLocalAreaDiagnostics(){
    const prior=typeof playerData!=="undefined"?clone(playerData.containedLocalAreaRuntime155||null):null;
    const had=typeof playerData!=="undefined"&&Object.prototype.hasOwnProperty.call(playerData,"containedLocalAreaRuntime155");
    const checks={};
    try{
      if(typeof playerData!=="undefined")playerData.containedLocalAreaRuntime155={schemaVersion:STATE_SCHEMA,areas:{}};
      const anbu=AREA_DEFINITIONS.konoha_anbu_hq,root=AREA_DEFINITIONS.konoha_root_hq;
      checks.exactAssets=anbu.mapImage==="Konoha Locations/anbu_hq.png"&&anbu.assetBlobSha==="af1d79954715510b07415cbca71c4feb7a70b5e5"&&root.mapImage==="Konoha Locations/root_hq.png"&&root.assetBlobSha==="1e321a3ac16b44ff8f12b54afcf36dc6f81f836a";
      checks.exactCounts=anbu.hotspots.length===8&&root.hotspots.length===8;
      checks.registryReused=!!getLocalMissionAreaDefinition("konoha_anbu_hq")&&!!getLocalMissionAreaDefinition("konoha_root_hq");
      checks.noAccessNoProjection=getMissionAreaHotspotProjections("konoha_anbu_hq").length===0&&getMissionAreaHotspotProjections("konoha_root_hq").length===0;
      const fakeCaller={type:"story_scene",sceneId:"diagnostic_story",beatId:"diagnostic_beat"};
      const env={missionAreaId:"konoha_anbu_hq",worldInstanceRef:"diag_anbu_instance",entryRouteRef:"anbu_hq_hotspot_secure_threshold",storyAuthorizedHotspotIds:["anbu_hq_hotspot_secure_threshold","anbu_hq_hotspot_briefing_chamber"],accessState:"ESCORTED_TEMPORARY",localActionability:"STORY_ONLY",returnCallerRef:fakeCaller,authorityOccurrenceId:"diag_occ_anbu_access"};
      const valid=validateEnvelope(env.missionAreaId,env);persistEnvelope(env.missionAreaId,canonicalEnvelope(env.missionAreaId,env,valid.storyAuthorizedHotspotIds),{saveState:false});
      const visible=getMissionAreaHotspotProjections("konoha_anbu_hq").map(h=>h.hotspotId).sort();
      checks.strictSubsetProjection=visible.join("|")==="anbu_hq_hotspot_briefing_chamber|anbu_hq_hotspot_secure_threshold";
      checks.rootIndependent=getMissionAreaHotspotProjections("konoha_root_hq").length===0;
      checks.accessDoesNotBecomeGeneral=getAreaRuntime("konoha_anbu_hq").accessState==="ESCORTED_TEMPORARY";
      checks.exteriorRemainsSeparate=getIssue155ContainedAreaReadModel("konoha_anbu_hq").exteriorLocationConfirmed===false&&getIssue155ContainedAreaReadModel("konoha_root_hq").exteriorLocationConfirmed===false;
      checks.returnUsesExistingCaller=typeof leaveLocalMissionArea==="function"&&leaveLocalMissionArea.toString().includes("resumeStorySceneReturnContext(returnContext)");
      checks.noHotspotActions=[...anbu.hotspots,...root.hotspots].every(h=>{const d=getRegisteredWorldEventOpportunity(`issue155_projection:${h.hotspotId}`);return d&&Array.isArray(d.interactions)&&d.interactions.length===0&&d.randomPoolEligible===false;});
      checks.pixelAuthorityPreserved=anbu.hotspots[0].anchor.x===665&&anbu.hotspots[0].anchor.y===815&&root.hotspots[7].region.x2===1015&&root.hotspots[7].region.y2===930;
      checks.patchId=PATCH_ID==="issue155_anbu_root_contained_local_areas_2026_09_13";
    }catch(error){checks.exceptionFree=false;checks.error=String(error&&error.message||error);}finally{
      if(typeof playerData!=="undefined"){
        if(had)playerData.containedLocalAreaRuntime155=prior;else delete playerData.containedLocalAreaRuntime155;
      }
    }
    const failed=Object.entries(checks).filter(([key,value])=>key!=="error"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,patchId:PATCH_ID};
  }

  globalThis.SC_ISSUE155_CONTAINED_AREAS=AREA_DEFINITIONS;
  globalThis.openStoryContainedLocalArea155=openStoryContainedLocalArea155;
  globalThis.expireStoryContainedLocalAreaAccess155=expireStoryContainedLocalAreaAccess155;
  globalThis.getIssue155ContainedAreaReadModel=getIssue155ContainedAreaReadModel;
  globalThis.runIssue155ContainedLocalAreaDiagnostics=runIssue155ContainedLocalAreaDiagnostics;
})();
