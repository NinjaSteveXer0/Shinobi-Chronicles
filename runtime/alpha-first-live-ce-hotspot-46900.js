// ============================================================================
// ISSUE #469 — FIRST LIVE CE CHRONICLE-REACTIVE KONOHA HOTSPOT
//
// Event: konoha_ce_kakashi_masked_interceptor_admin_crossing_v1
// Host: KON-P01 — Hokage Administration public approach / forecourt
//
// One bounded production event only. Reuses the existing Chronicle State root,
// World opportunity lifecycle, Story runtime and activityHistory/Shinobi Record.
// ============================================================================
(function installFirstLiveCEHotspot46900(){
"use strict";
if(globalThis.SC_FIRST_LIVE_CE_HOTSPOT_46900)return;

const PATCH_ID="first_live_ce_hotspot_46900_2026_10_02";
const EVENT_ID="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const OPPORTUNITY_ID=EVENT_ID;
const OCCURRENCE_FAMILY="konoha_ce_hotspot_masked_interceptor_admin_crossing";
const OCCURRENCE_ID=OCCURRENCE_FAMILY+"::1";
const SCENE_ID=EVENT_ID+"__scene";
const HOST_ID="KON-P01";
const ORIGIN_ID="academy_kakashi";
const KAKASHI_ID="academy_kakashi";
const MI_ID="academy_kakashi_origin_masked_interceptor";
const CONTINUITY_KEY=MI_ID;
const CONTINUITY_SOURCE_ID="origin_participant_continuity::"+ORIGIN_ID+"::"+MI_ID;
const RECORD_ID=OCCURRENCE_ID+"::shinobi_record";
const RECORD_TITLE="Hokage Administration Crossing";
const RECORD_FACT="Seen leaving Hokage Administration after a document handoff. Administration staff did not challenge her presence.";
const RECORD_PRIOR="Previously encountered during the Academy package incident.";
const MI_PORTRAIT="NPC portrait/masked_interceptor.png";
const MI_CARD="NPC/masked_interceptor.png";
const KAKASHI_CARD="Assets/Academy Student/academy_kakashi.png";

const priorCompleteOrigin=typeof globalThis.completeChronicleOriginPrologue==="function"?globalThis.completeChronicleOriginPrologue:null;
const priorRenderVillage=typeof globalThis.renderAlphaKonohaVillageHotspots==="function"?globalThis.renderAlphaKonohaVillageHotspots:null;
const priorActivatePublic=typeof globalThis.activateAlphaKonohaV3PublicLocation==="function"?globalThis.activateAlphaKonohaV3PublicLocation:null;

function clone(value){
  try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}
  catch(_error){return value;}
}
function history(){
  return typeof playerData!=="undefined"&&playerData&&Array.isArray(playerData.activityHistory)?playerData.activityHistory:[];
}
function acquisition(){
  try{return typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():null;}
  catch(_error){return null;}
}
function currentTeam(){
  try{return typeof globalThis.getChronicleCurrentTeam43600==="function"?globalThis.getChronicleCurrentTeam43600():null;}
  catch(_error){return null;}
}
function worldState(dimension,key=OPPORTUNITY_ID){
  try{return typeof getWorldEventDimensionState==="function"?getWorldEventDimensionState(dimension,key)||{}:{};}
  catch(_error){return {};}
}
function exactId(record){
  return record&&String(record.sourceOccurrenceId||record.occurrenceId||record.id||"");
}
function originComplete(){
  const a=acquisition(),o=a&&a.chronicleOrigin;
  return !!(a&&a.chronicleOriginVariantId===ORIGIN_ID&&o&&o.variantId===ORIGIN_ID&&o.prologueCompleted===true);
}
function freePlay(){
  try{return typeof isAcademyFreePlayAvailable==="function"&&isAcademyFreePlayAvailable()===true;}
  catch(_error){return false;}
}
function continuityRoot(create=false){
  let root=null;
  try{
    if(create&&typeof globalThis.ensurePhase2ChronicleState43600==="function")root=globalThis.ensurePhase2ChronicleState43600({save:false});
    else root=playerData&&playerData.phase2ChronicleState;
  }catch(_error){root=null;}
  if(!root||typeof root!=="object")return null;
  if(create&&(!root.originParticipantContinuity||typeof root.originParticipantContinuity!=="object")){
    root.originParticipantContinuity={schemaVersion:1,byStableParticipantId:{}};
  }
  if(create&&(!root.originParticipantContinuity.byStableParticipantId||typeof root.originParticipantContinuity.byStableParticipantId!=="object")){
    root.originParticipantContinuity.byStableParticipantId={};
  }
  return root.originParticipantContinuity||null;
}
function continuitySnapshot(){
  const root=continuityRoot(false);
  const row=root&&root.byStableParticipantId&&root.byStableParticipantId[CONTINUITY_KEY];
  return row&&typeof row==="object"?clone(row):null;
}
function originMIRecords(storyInstanceId=null){
  return history().filter(record=>{
    if(!record||record.committed!==true)return false;
    if(storyInstanceId&&record.storySceneInstanceId&&String(record.storySceneInstanceId)!==String(storyInstanceId))return false;
    const type=String(record.type||"");
    const data=record.data&&typeof record.data==="object"?record.data:{};
    if(type==="battle"){
      return String(record.enemyId||"")===MI_ID||String(record.encounterId||"").includes("_mi");
    }
    if(!type.startsWith("academy_kakashi_v2_"))return false;
    if(data.targetParticipantRef==="MI"||data.targetParticipantRef===MI_ID)return true;
    if(Array.isArray(data.participantRefs)&&data.participantRefs.some(ref=>ref==="MI"||ref===MI_ID))return true;
    if(Array.isArray(data.targetRefs)&&data.targetRefs.some(ref=>ref==="MI"||ref===MI_ID))return true;
    return false;
  });
}
function battleTouchesMI(row){
  if(!row||typeof row!=="object")return false;
  return String(row.encounterId||"").includes("_mi")||String(row.battleConfigId||"").includes("_mi");
}
function classifyHistory(input={}){
  const state=String(input.fieldDispositionState||"").toUpperCase();
  if(input.lethalAttempt===true||state==="KILLED")return"lethal_attempt";
  if(input.policeTransfer===true||state==="POLICE_CUSTODY")return"uchiha_police_transfer";
  if(input.restraintOrAnbu===true||state==="RESTRAINED"||state==="ANBU_CUSTODY")return"restraint_anbu_collection";
  if(input.deliberateRelease===true||state==="RELEASED")return"deliberate_release";
  if(input.miDefeatedKakashi===true)return"mi_defeated_kakashi";
  if(input.kakashiDefeatedMI===true)return"kakashi_defeated_mi";
  return"other_material_encounter";
}
function captureFromActiveOrigin(){
  if(typeof globalThis.getAcademyKakashiV2State36020!=="function")return{success:false,reason:"kakashi_v2_state_reader_missing"};
  let state=null,active=null;
  try{state=globalThis.getAcademyKakashiV2State36020();active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){}
  if(!state||!active||!active.instanceId)return{success:false,reason:"kakashi_v2_active_origin_state_missing"};
  const mi=state.participants&&state.participants.MI;
  if(!mi)return{success:false,reason:"masked_interceptor_origin_state_missing"};
  const fieldDispositionState=String(mi.state||"UNSEEN").toUpperCase();
  const battles=Object.values(state.battles||{}).filter(battleTouchesMI);
  const refs=originMIRecords(active.instanceId).map(exactId).filter(Boolean);
  const exact={
    lethalAttempt:mi.lethalIntent===true||mi.disposition==="KILL"||mi.dispositionResolution&&mi.dispositionResolution.intent==="KILL",
    policeTransfer:fieldDispositionState==="POLICE_CUSTODY"||mi.deliveredInstitution==="POLICE",
    restraintOrAnbu:fieldDispositionState==="RESTRAINED"||fieldDispositionState==="ANBU_CUSTODY"||mi.disposition==="RESTRAIN"||mi.deliveredInstitution==="ANBU"||mi.collected===true,
    deliberateRelease:fieldDispositionState==="RELEASED"||mi.disposition==="RELEASE",
    miDefeatedKakashi:battles.some(row=>String(row.outcome||"").toLowerCase()==="defeat"),
    kakashiDefeatedMI:battles.some(row=>String(row.outcome||"").toLowerCase()==="victory")
  };
  const snapshot={
    schemaVersion:1,
    originId:ORIGIN_ID,
    stableParticipantId:MI_ID,
    sourceContinuityId:CONTINUITY_SOURCE_ID,
    originStorySceneInstanceId:String(active.instanceId),
    encounteredByProtagonist:fieldDispositionState!=="UNSEEN",
    fieldDispositionState,
    fieldDispositionOccurrenceRef:refs.length?refs[refs.length-1]:null,
    survivedOrigin:fieldDispositionState!=="KILLED",
    hiddenPostTestReviewReached:!!(state.terminal&&state.terminal.hiddenTestReviewReached===true),
    postTestTruthClass:"staged_konoha_test_participant",
    protagonistKnowsTestTruth:false,
    materialHistoryRefs:[...new Set(refs)],
    exactHistorySignals:exact,
    rememberedHistoryFamily:classifyHistory({fieldDispositionState,...exact}),
    capturedAt:Date.now(),
    sourceKind:"frozen_origin_terminal_projection"
  };
  return{success:true,snapshot};
}
function commitContinuitySnapshot(snapshot,{save=true}={}){
  if(!snapshot||snapshot.originId!==ORIGIN_ID||snapshot.stableParticipantId!==MI_ID)return{success:false,reason:"origin_participant_continuity_invalid"};
  const root=continuityRoot(true);if(!root)return{success:false,reason:"phase2_chronicle_state_missing"};
  const existing=root.byStableParticipantId[CONTINUITY_KEY];
  if(existing&&existing.sourceContinuityId===CONTINUITY_SOURCE_ID){
    return{success:true,idempotent:true,snapshot:clone(existing)};
  }
  root.byStableParticipantId[CONTINUITY_KEY]=clone(snapshot);
  if(save&&typeof savePlayerData==="function")savePlayerData();
  return{success:true,idempotent:false,snapshot:clone(snapshot)};
}
function legacyContinuity(){
  if(!originComplete())return null;
  const records=originMIRecords();
  if(!records.length)return null;
  let fieldDispositionState="ENCOUNTERED";
  let fieldDispositionOccurrenceRef=null;
  let lethalAttempt=false,policeTransfer=false,restraintOrAnbu=false,deliberateRelease=false;
  const battleRows=records.filter(row=>row.type==="battle");
  for(const record of records){
    const data=record.data&&typeof record.data==="object"?record.data:{};
    const id=exactId(record);
    if(record.type==="academy_kakashi_v2_disposition"){
      const intent=String(data.intent||"").toUpperCase(),outcome=String(data.outcome||"").toUpperCase();
      if(intent==="KILL"){lethalAttempt=true;fieldDispositionState=outcome||fieldDispositionState;fieldDispositionOccurrenceRef=id;}
      else if(intent==="RESTRAIN"){restraintOrAnbu=true;fieldDispositionState=outcome||fieldDispositionState;fieldDispositionOccurrenceRef=id;}
    }
    if(record.type==="academy_kakashi_v2_delivery"){
      const institution=String(data.institution||"").toUpperCase();
      if(institution==="POLICE"){policeTransfer=true;fieldDispositionState="POLICE_CUSTODY";fieldDispositionOccurrenceRef=id;}
      if(institution==="ANBU"){restraintOrAnbu=true;fieldDispositionState="ANBU_CUSTODY";fieldDispositionOccurrenceRef=id;}
    }
    if(String(data.disposition||"").toUpperCase()==="RELEASE"||String(data.outcome||"").toUpperCase()==="RELEASED"){
      deliberateRelease=true;fieldDispositionState="RELEASED";fieldDispositionOccurrenceRef=id;
    }
  }
  const miDefeatedKakashi=battleRows.some(row=>row.success===false);
  const kakashiDefeatedMI=battleRows.some(row=>row.success===true);
  const signals={lethalAttempt,policeTransfer,restraintOrAnbu,deliberateRelease,miDefeatedKakashi,kakashiDefeatedMI};
  return{
    schemaVersion:1,originId:ORIGIN_ID,stableParticipantId:MI_ID,sourceContinuityId:CONTINUITY_SOURCE_ID,
    originStorySceneInstanceId:null,encounteredByProtagonist:true,fieldDispositionState,
    fieldDispositionOccurrenceRef,survivedOrigin:fieldDispositionState!=="KILLED",
    hiddenPostTestReviewReached:true,postTestTruthClass:"staged_konoha_test_participant",
    protagonistKnowsTestTruth:false,materialHistoryRefs:[...new Set(records.map(exactId).filter(Boolean))],
    exactHistorySignals:signals,rememberedHistoryFamily:classifyHistory({fieldDispositionState,...signals}),
    capturedAt:null,sourceKind:"committed_legacy_evidence_projection"
  };
}
function laterWorldParticipantRefs(snapshot){
  if(!snapshot)return[];
  const cutoff=Number(snapshot.capturedAt)||0;
  return history().filter(record=>{
    if(!record||record.committed!==true)return false;
    if(String(record.type||"").startsWith("academy_kakashi_v2_")||record.type==="battle")return false;
    if(record.id===RECORD_ID||record.occurrenceId===RECORD_ID)return false;
    if(cutoff&&Number(record.timestamp||0)&&Number(record.timestamp)<cutoff)return false;
    const data=record.data&&typeof record.data==="object"?record.data:{};
    const refs=[...(Array.isArray(data.participantRefs)?data.participantRefs:[]),...(Array.isArray(data.participants)?data.participants:[])];
    return data.stableParticipantId===MI_ID||refs.includes(MI_ID);
  }).map(record=>({
    occurrenceRef:exactId(record),
    lifeState:String(record.data&&record.data.lifeState||record.lifeState||"").toUpperCase()||null,
    custodyState:String(record.data&&record.data.currentCustodyState||record.custodyState||"").toUpperCase()||null,
    availabilityState:String(record.data&&record.data.worldAvailabilityState||record.data&&record.data.currentAvailability||"").toUpperCase()||null
  }));
}
function getContinuity(){
  let snapshot=continuitySnapshot();
  if(!snapshot){
    const legacy=legacyContinuity();
    if(legacy){commitContinuitySnapshot(legacy,{save:false});snapshot=legacy;}
  }
  if(!snapshot)return null;
  const later= laterWorldParticipantRefs(snapshot);
  const unavailable=later.some(row=>
    ["KILLED","DEAD"].includes(row.lifeState)||
    ["UNAVAILABLE","DETAINED","INCARCERATED"].includes(row.availabilityState)||
    ["CURRENT_CUSTODY","PERMANENT_CUSTODY"].includes(row.custodyState)
  );
  return Object.freeze({...clone(snapshot),latestLaterWorldRefs:Object.freeze(later.map(row=>Object.freeze(row))),currentWorldAvailable:!unavailable});
}
function wrappedCompleteOrigin46900(originVariantId,evidenceIds){
  let captured=null;
  if(originVariantId===ORIGIN_ID){
    captured=captureFromActiveOrigin();
    if(captured&&captured.success===true)commitContinuitySnapshot(captured.snapshot,{save:false});
  }
  const result=priorCompleteOrigin?priorCompleteOrigin.apply(this,arguments):{success:false,reason:"origin_completion_owner_missing"};
  if(result&&result.success===true&&originVariantId===ORIGIN_ID&&captured&&captured.success===true&&typeof savePlayerData==="function")savePlayerData();
  return result;
}
if(priorCompleteOrigin){
  globalThis.completeChronicleOriginPrologue=wrappedCompleteOrigin46900;
  try{completeChronicleOriginPrologue=wrappedCompleteOrigin46900;}catch(_error){}
}

const TEAM_REACTIONS=Object.freeze({
  academy_hinata:Object.freeze({
    strong:Object.freeze({kind:"spoken",group:"recognition_query",speaker:"HINATA",text:"She recognised you."}),
    fallback:Object.freeze({kind:"narration",text:"Hinata shifts half a step so she can see both Kakashi and the masked woman clearly.\n\nHer mouth closes. She keeps watching."})
  }),
  academy_izuno:Object.freeze({
    strong:null,
    fallback:Object.freeze({kind:"narration",text:"Wasabi turns on one foot before the others finish stopping.\n\nShe keeps Masked Interceptor in view, weight already forward, ready to move if the situation actually changes.\n\nShe stays ready without closing the distance."})
  }),
  academy_mirai:Object.freeze({
    strong:Object.freeze({kind:"spoken",group:"movement_observation",speaker:"MIRAI",text:"She changed pace when she saw you."}),
    fallback:Object.freeze({kind:"narration",text:"Mirai checks the receipt disappearing into the woman's sleeve, then the public intake window.\n\nHer attention stays on the mismatch without claiming an explanation."})
  }),
  academy_menma:Object.freeze({
    strong:null,
    fallback:Object.freeze({kind:"narration",text:"Menma's eyes move from the stamped receipt, to the Administration doors, to Masked Interceptor, and finally to Kakashi.\n\nHe says nothing."})
  }),
  academy_kushina:Object.freeze({
    strong:Object.freeze({kind:"spoken",group:"recognition_query",speaker:"KUSHINA",text:"Kakashi. Who is she?"}),
    fallback:Object.freeze({kind:"narration",text:"Kushina's eyebrows rise.\n\nHer eyebrows stay raised.\n\nWhen Kakashi does not answer immediately, she folds her arms."})
  }),
  academy_kurenai:Object.freeze({
    strong:null,
    fallback:Object.freeze({kind:"narration",text:"Kurenai tracks Masked Interceptor's eye-line instead of studying the mask.\n\nThen she watches Kakashi.\n\nShe says nothing."})
  }),
  academy_iwabee:Object.freeze({
    strong:Object.freeze({kind:"spoken",group:"readiness",speaker:"IWABEE",text:"Problem?"}),
    fallback:Object.freeze({kind:"narration",text:"Iwabee plants his feet and waits.\n\nIf Kakashi keeps moving, he moves too."})
  }),
  academy_metal_lee:Object.freeze({
    strong:null,
    fallback:Object.freeze({kind:"narration",text:"Metal straightens on reflex.\n\nWhen Masked Interceptor makes no hostile move, his hands stay down.\n\nHe keeps watching."})
  }),
  academy_obito:Object.freeze({
    strong:Object.freeze({kind:"spoken",group:"recognition_query",speaker:"OBITO",text:"Wait—you know her?"}),
    fallback:Object.freeze({kind:"narration",text:"Obito's eyebrows climb high enough to say the question without him repeating it aloud."})
  })
});
function teamReactionPlan(team){
  const teammates=team&&Array.isArray(team.teamVariantIds)?team.teamVariantIds.slice(1):[];
  const usedGroups=new Set();
  return teammates.map(id=>{
    const family=TEAM_REACTIONS[id];
    if(!family)return{id,kind:"none",reason:"reaction_family_missing"};
    if(family.strong&&(!family.strong.group||!usedGroups.has(family.strong.group))){
      if(family.strong.group)usedGroups.add(family.strong.group);
      return{id,...clone(family.strong),reactionVariant:"strong"};
    }
    return{id,...clone(family.fallback),reactionVariant:"fallback"};
  });
}
function eligibility(){
  const reasons=[],continuity=getContinuity(),team=currentTeam(),resolution=worldState("resolutionByOpportunityId");
  if(!originComplete())reasons.push("academy_kakashi_origin_incomplete_or_not_selected");
  if(!continuity)reasons.push("participant_continuity_missing");
  else{
    if(continuity.encounteredByProtagonist!==true)reasons.push("masked_interceptor_unseen");
    if(continuity.fieldDispositionState==="UNSEEN")reasons.push("masked_interceptor_unseen");
    if(continuity.survivedOrigin!==true||continuity.fieldDispositionState==="KILLED")reasons.push("masked_interceptor_killed");
    if(continuity.hiddenPostTestReviewReached!==true)reasons.push("hidden_post_test_review_not_proven");
    if(continuity.protagonistKnowsTestTruth!==false)reasons.push("knowledge_firewall_invalid");
    if(continuity.currentWorldAvailable!==true)reasons.push("masked_interceptor_later_unavailable");
  }
  if(!freePlay())reasons.push("konoha_free_play_not_active");
  if(!team||team.committed!==true||team.originVariantId!==ORIGIN_ID||!Array.isArray(team.teamVariantIds)||team.teamVariantIds.length!==3)reasons.push("exact_current_academy_team_missing");
  if(resolution.closed===true||resolution.everClosed===true)reasons.push("hotspot_occurrence_already_resolved");
  return{eligible:reasons.length===0,reasons:[...new Set(reasons)],continuity:clone(continuity),currentTeam:clone(team),resolution:clone(resolution)};
}
function syncOpportunity({save=false}={}){
  const gate=eligibility(),resolution=worldState("resolutionByOpportunityId");
  if(resolution.everClosed===true||resolution.closed===true){
    if(typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(EVENT_ID,{projectable:false,active:false},{save:false});
    if(typeof setOpportunityActionability==="function")setOpportunityActionability(OPPORTUNITY_ID,{available:false,reason:"occurrence_closed",reasonVisible:false},{save:false});
    if(save&&typeof savePlayerData==="function")savePlayerData();
    return{success:true,active:false,resolved:true,gate};
  }
  if(gate.eligible){
    if(typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(EVENT_ID,{projectable:true,active:true,continuityRef:CONTINUITY_SOURCE_ID},{save:false});
    if(typeof setOpportunityDiscovery==="function")setOpportunityDiscovery(OPPORTUNITY_ID,{level:"discovered",observerSafe:true},{save:false});
    if(typeof setOpportunityActionability==="function")setOpportunityActionability(OPPORTUNITY_ID,{available:true,reason:null,reasonVisible:false},{save:false});
    if(typeof setOpportunityTracking==="function")setOpportunityTracking(OPPORTUNITY_ID,{tracked:false,leadState:"available",mandatory:false},{save:false});
    if(typeof setOpportunityResolution==="function")setOpportunityResolution(OPPORTUNITY_ID,{occurrenceId:OCCURRENCE_ID,sequence:1,closed:false,everClosed:false,visibleState:"available"},{save:false});
  }else{
    if(typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(EVENT_ID,{projectable:false,active:false},{save:false});
    if(typeof setOpportunityActionability==="function")setOpportunityActionability(OPPORTUNITY_ID,{available:false,reason:gate.reasons[0]||"not_eligible",reasonVisible:false},{save:false});
  }
  if(save&&typeof savePlayerData==="function")savePlayerData();
  return{success:true,active:gate.eligible,gate};
}
function historyReactionBeats(family){
  switch(family){
    case"lethal_attempt":return[
      {mode:"narration",text:"Masked Interceptor stops outside arm's reach.\n\nHer hands stay empty."},
      {mode:"dialogue",speakerId:MI_ID,speakerName:"MASKED INTERCEPTOR",portrait:MI_PORTRAIT,text:"Not here."}
    ];
    case"uchiha_police_transfer":return[
      {mode:"narration",text:"Her eyes move from Kakashi to the Administration doors.\n\nThen back to him.\n\nShe shifts half a step toward the outside edge of the path and keeps her hands still."}
    ];
    case"restraint_anbu_collection":return[
      {mode:"narration",text:"Her gaze drops once to Kakashi's hands.\n\nOne wrist turns inside her sleeve.\n\nThen it stills.\n\nShe looks back at his face."}
    ];
    case"deliberate_release":return[
      {mode:"narration",text:"She recognises him.\n\nThis time she leaves the lane between them open.\n\nA small inclination of her head is the only acknowledgement."}
    ];
    case"mi_defeated_kakashi":return[
      {mode:"narration",text:"Her eyes flick once to the shoulder she pinned against the stone that night.\n\nThen back to Kakashi.\n\nShe does not slow further."}
    ];
    case"kakashi_defeated_mi":return[
      {mode:"narration",text:"She recognises him and changes her path just enough to keep a clear arm's length between them.\n\nShe keeps the extra space as they cross."}
    ];
    default:return[
      {mode:"narration",text:"Her attention lands on Kakashi before it lands on either teammate.\n\nThat is enough to make the recognition mutual."}
    ];
  }
}
function participantMeta(id){
  if(id===KAKASHI_ID)return{id,label:"KAKASHI",image:KAKASHI_CARD};
  if(id===MI_ID)return{id,label:"MASKED INTERCEPTOR",image:MI_CARD};
  let character=null;
  try{character=typeof getPlayerCharacter==="function"?getPlayerCharacter(id):null;}catch(_error){}
  return{id,label:String(character&&character.name||id).toUpperCase(),image:character&&character.image||null};
}
function narrationBeat(id,text,nextBeatId=null,extra={}){
  return{beatId:id,mode:"narration",text,locationId:HOST_ID,nextBeatId,...extra};
}
function dialogueBeat(id,speakerId,speakerName,text,nextBeatId=null,extra={}){
  return{beatId:id,mode:"dialogue",speakerRef:{sourceId:speakerId,sourceType:"stable_participant",physicalPresence:true,displayName:speakerName,portraitRef:{src:speakerId===MI_ID?MI_PORTRAIT:null}},speakerName,text,locationId:HOST_ID,nextBeatId,...extra};
}
function commitIntent(intent){
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  if(!active||active.sceneId!==SCENE_ID)return{success:false,reason:"hotspot_scene_not_active"};
  active.localContext=active.localContext||{};
  active.localContext.hotspot469=active.localContext.hotspot469||{};
  const existing=active.localContext.hotspot469.protagonistIntent;
  if(existing&&existing!==intent)return{success:false,reason:"hotspot_protagonist_intent_conflict"};
  active.localContext.hotspot469.protagonistIntent=intent;
  const resolution=worldState("resolutionByOpportunityId");
  if(typeof setOpportunityResolution==="function")setOpportunityResolution(OPPORTUNITY_ID,{...resolution,protagonistIntent:intent},{save:false});
  return{success:true,idempotent:existing===intent,intent};
}
function appendSafeRecord(record){
  if(!playerData||!Array.isArray(playerData.activityHistory))return{success:false,reason:"activity_history_missing"};
  const existing=playerData.activityHistory.find(row=>row&&(row.id===record.id||row.occurrenceId===record.occurrenceId));
  if(existing)return{success:true,idempotent:true,record:clone(existing)};
  playerData.activityHistory.push(record);
  try{activityHistory=playerData.activityHistory;}catch(_error){}
  return{success:true,idempotent:false,record:clone(record)};
}
function commitClosure(){
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const ctx=active&&active.localContext&&active.localContext.hotspot469;
  if(!active||active.sceneId!==SCENE_ID||!ctx)return{success:false,reason:"hotspot_scene_context_missing"};
  const intent=ctx.protagonistIntent;
  if(!intent)return{success:false,reason:"hotspot_protagonist_intent_missing"};
  const priorResolution=worldState("resolutionByOpportunityId");
  const teamRefs=Array.isArray(ctx.currentTeamVariantIds)?ctx.currentTeamVariantIds:[KAKASHI_ID];
  const record={
    id:RECORD_ID,occurrenceId:RECORD_ID,sourceOccurrenceId:OCCURRENCE_ID,
    committed:true,completed:true,type:"chronicle_shared_history_knowledge_lead",
    activity:"Hokage Administration Crossing",title:RECORD_TITLE,locationId:HOST_ID,
    outcome:RECORD_FACT,
    data:{
      title:RECORD_TITLE,
      knownPerson:"Masked Interceptor",
      sharedOccurrence:RECORD_TITLE,
      knownFactLead:RECORD_FACT,
      priorConnection:RECORD_PRIOR,
      properName:"Unknown",
      observerParticipantRef:KAKASHI_ID,
      participantRefs:[MI_ID],
      observingParticipantRefs:[...teamRefs],
      storyTeamParticipantRefs:[...teamRefs],
      knowledge:{observerSafe:true,knownFactLead:RECORD_FACT,properName:"Unknown"},
      relationship:{sharedHistory:true,stableParticipantId:MI_ID},
      sharedHistory:{stableParticipantId:MI_ID,priorConnection:RECORD_PRIOR},
      protagonistIntent:intent,
      noHiddenTestTruth:true,
      noAnbuInference:true,
      noMoralityScalar:true
    },
    sourceRefs:[
      {type:"world_opportunity",id:OPPORTUNITY_ID,role:"resolved_occurrence"},
      {type:"location",id:HOST_ID,role:"direct_observation"}
    ],
    timestamp:Date.now()
  };
  const committed=appendSafeRecord(record);if(!committed.success)return committed;
  if(typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(EVENT_ID,{projectable:false,active:false,closed:true},{save:false});
  if(typeof setOpportunityActionability==="function")setOpportunityActionability(OPPORTUNITY_ID,{available:false,reason:"occurrence_closed",reasonVisible:false},{save:false});
  if(typeof setOpportunityTracking==="function")setOpportunityTracking(OPPORTUNITY_ID,{tracked:false,leadState:"closed",mandatory:false},{save:false});
  if(typeof setOpportunityResolution==="function")setOpportunityResolution(OPPORTUNITY_ID,{
    ...priorResolution,
    occurrenceId:OCCURRENCE_ID,sequence:1,closed:true,everClosed:true,visibleState:"closed",
    stableParticipantId:MI_ID,
    currentTeamRefs:[...teamRefs],
    rememberedHistoryFamily:ctx.rememberedHistoryFamily,
    rememberedHistorySourceRefs:[...(ctx.materialHistoryRefs||[])],
    teammateReactionReceipts:clone(ctx.teammateReactionPlan||[]),
    protagonistIntent:intent,
    recordOccurrenceRef:RECORD_ID,
    changedNextSituation:"same_masked_interceptor_legitimate_hokage_administration_business_observed"
  },{save:false});
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,idempotent:committed.idempotent===true,recordOccurrenceRef:RECORD_ID,intent};
}
function buildScene(context){
  const beats=[],push=row=>{beats.push(row);return row;};
  push(narrationBeat("opening_01","The Hokage Administration forecourt is busy enough that nobody owns the whole path.\n\nKakashi and his team are crossing the public approach when a masked woman steps away from the intake side of the building."));
  push(narrationBeat("opening_02","A stamped receipt is passed back through the public counter.\n\nShe folds it once and slips it into her sleeve.\n\nThe public intake has already moved on to the next piece of business."));
  push(narrationBeat("opening_03","Kakashi stops.\n\nSame mask.\n\nSame controlled stride.\n\nThe woman from the package incident."));
  push(narrationBeat("opening_04","She sees him a moment later."));

  const reaction=historyReactionBeats(context.rememberedHistoryFamily);
  reaction.forEach((row,index)=>{
    const id="mi_history_"+String(index+1).padStart(2,"0");
    if(row.mode==="dialogue")push(dialogueBeat(id,row.speakerId,row.speakerName,row.text));
    else push(narrationBeat(id,row.text));
  });
  (context.teammateReactionPlan||[]).forEach((row,index)=>{
    const id="team_reaction_"+String(index+1).padStart(2,"0");
    if(row.kind==="spoken")push(dialogueBeat(id,row.id,row.speaker,row.text));
    else if(row.kind==="narration")push(narrationBeat(id,row.text));
  });

  const choiceBeat={
    beatId:"kakashi_choice",mode:"choice",text:"",locationId:HOST_ID,choices:[
      {choiceId:"acknowledge_recognition",label:"Tell her you remember her.",nextBeatId:"branch_ack_01",consequenceRequests:[{requestId:"469_intent_ack",kind:"custom",resolve:()=>commitIntent("ACKNOWLEDGE_RECOGNITION")}]},
      {choiceId:"ask_why_here",label:"Ask what she is doing here.",nextBeatId:"branch_ask_01",consequenceRequests:[{requestId:"469_intent_ask",kind:"custom",resolve:()=>commitIntent("ASK_WHY_SHE_IS_HERE")}]},
      {choiceId:"observe_pass",label:"Watch her pass.",nextBeatId:"branch_watch_01",consequenceRequests:[{requestId:"469_intent_watch",kind:"custom",resolve:()=>commitIntent("OBSERVE_LET_PASS")}]},
      {choiceId:"keep_moving",label:"Keep moving.",nextBeatId:"branch_move_01",consequenceRequests:[{requestId:"469_intent_move",kind:"custom",resolve:()=>commitIntent("DISENGAGE_KEEP_MOVING")}]}
    ]
  };
  push(choiceBeat);

  push(dialogueBeat("branch_ack_01",KAKASHI_ID,"KAKASHI","I remember you.","branch_ack_02"));
  push(dialogueBeat("branch_ack_02",MI_ID,"MASKED INTERCEPTOR","I know.","branch_ack_03"));
  push(narrationBeat("branch_ack_03","She continues down the steps.\n\nThe folded receipt disappears fully into her sleeve.\n\nNo one from the Administration calls her back.","branch_ack_04"));
  push(narrationBeat("branch_ack_04","Kakashi looks once at the Administration doors.\n\nThen he lets her go.",null,{exitScene:true}));

  push(dialogueBeat("branch_ask_01",KAKASHI_ID,"KAKASHI","What are you doing here?","branch_ask_02"));
  push(dialogueBeat("branch_ask_02",MI_ID,"MASKED INTERCEPTOR","Delivery. Finished.","branch_ask_03"));
  push(narrationBeat("branch_ask_03","That is all she gives him.\n\nShe steps around the team and keeps walking.","branch_ask_04"));
  push(narrationBeat("branch_ask_04","Kakashi's eyes move from the retreating mask to the public intake window.\n\nThe person behind it is already dealing with somebody else.",null,{exitScene:true}));

  push(narrationBeat("branch_watch_01","Kakashi says nothing.\n\nHe shifts just enough to leave the path open.","branch_watch_02"));
  push(narrationBeat("branch_watch_02","Masked Interceptor walks past.\n\nThe stamped receipt is gone inside her sleeve.\n\nHer pace stays even all the way across the forecourt.","branch_watch_03"));
  push(narrationBeat("branch_watch_03","Kakashi watches until the crowd takes her out of sight.\n\nThen his eyes return to the Administration doors.",null,{exitScene:true}));

  push(narrationBeat("branch_move_01","Kakashi turns away before she reaches them.\n\nHe keeps walking.","branch_move_02"));
  push(narrationBeat("branch_move_02","The team keeps moving.\n\nBehind them, Masked Interceptor's footsteps do not change pace.","branch_move_03"));
  push(narrationBeat("branch_move_03","Kakashi does not look back.\n\nThe Hokage Administration falls behind them.",null,{exitScene:true}));

  for(let i=0;i<beats.length-1;i+=1){
    const beat=beats[i];
    if(beat.mode!=="choice"&&!beat.nextBeatId&&!beat.exitScene)beat.nextBeatId=beats[i+1].beatId;
  }
  const participants=[KAKASHI_ID,MI_ID,...context.currentTeamVariantIds.slice(1)].map(id=>{
    const meta=participantMeta(id);
    return{sourceId:id,physicalPresence:true,visible:true,role:id===KAKASHI_ID?"protagonist":id===MI_ID?"returning_participant":"current_teammate",displayName:meta.label,portraitRef:meta.image?{src:meta.image}:null};
  });
  return{
    sceneId:SCENE_ID,eventId:EVENT_ID,title:"Hokage Administration Crossing",entryBeatId:"opening_01",locationId:HOST_ID,
    participants,beats,
    onCompleteConsequences:[{requestId:"469_commit_hotspot_closure",kind:"custom",resolve:()=>commitClosure()}]
  };
}
function registerSceneForContext(context){
  if(typeof registerStoryScene!=="function")return{success:false,reason:"story_scene_registry_missing"};
  try{if(typeof unregisterStoryScene==="function")unregisterStoryScene(SCENE_ID);}catch(_error){}
  const result=registerStoryScene(buildScene(context));
  queueBoardRegistration();
  return result;
}
function sceneContextFromGate(gate){
  const team=gate.currentTeam,continuity=gate.continuity;
  return{
    schemaVersion:1,
    occurrenceId:OCCURRENCE_ID,
    stableParticipantId:MI_ID,
    currentTeamAssignmentId:team.assignmentId,
    currentTeamVariantIds:[...team.teamVariantIds],
    rememberedHistoryFamily:continuity.rememberedHistoryFamily,
    materialHistoryRefs:[...(continuity.materialHistoryRefs||[])],
    teammateReactionPlan:teamReactionPlan(team),
    protagonistIntent:null
  };
}
function startHotspot(){
  const gate=eligibility();if(!gate.eligible)return{success:false,reason:gate.reasons[0]||"hotspot_not_eligible",gate};
  const context=sceneContextFromGate(gate);
  const registered=registerSceneForContext(context);if(!registered||registered.success!==true)return registered;
  const prior=worldState("resolutionByOpportunityId");
  if(typeof setOpportunityResolution==="function")setOpportunityResolution(OPPORTUNITY_ID,{
    ...prior,occurrenceId:OCCURRENCE_ID,sequence:1,closed:false,everClosed:false,visibleState:"in_progress",
    stableParticipantId:MI_ID,currentTeamRefs:[...context.currentTeamVariantIds],
    rememberedHistoryFamily:context.rememberedHistoryFamily,
    rememberedHistorySourceRefs:[...context.materialHistoryRefs],
    teammateReactionReceipts:clone(context.teammateReactionPlan)
  },{save:false});
  const result=startStoryScene(SCENE_ID,{
    sourceEventId:EVENT_ID,sourceOpportunityId:OPPORTUNITY_ID,
    returnContext:{type:"overlay",overlayType:"village"},
    context:{hotspot469:context}
  });
  if(result&&result.success===true&&typeof savePlayerData==="function")savePlayerData();
  return result;
}
function rehydrateActiveScene(){
  const active=playerData&&playerData.storySceneRuntime&&playerData.storySceneRuntime.active;
  const context=active&&active.sceneId===SCENE_ID&&active.localContext&&active.localContext.hotspot469;
  if(!context)return false;
  const result=registerSceneForContext(clone(context));
  return !!(result&&result.success===true);
}
function registerOpportunity(){
  if(typeof registerWorldEventOpportunity!=="function")return{success:false,reason:"world_registry_missing"};
  return registerWorldEventOpportunity({
    opportunityId:OPPORTUNITY_ID,eventId:EVENT_ID,hotspotId:OCCURRENCE_FAMILY,
    locationId:"konohagakure",hostLocationRef:HOST_ID,regionKey:"fire",sourceKind:"authored",randomPoolEligible:false,
    defaultDiscoveryLevel:"undiscovered",
    presentation:{family:"Chronicle Event",category:"STORY",label:"Hokage Administration Crossing",summary:"A familiar masked figure is leaving the Hokage Administration public intake.",showUnknownMarker:false},
    evaluateProjection:()=>eligibility().eligible,
    interactions:[{
      id:"approach_crossing",label:"APPROACH",kind:"custom",
      evaluateAvailability:()=>{const gate=eligibility();return{available:gate.eligible,reason:gate.reasons[0]||null};},
      resolve:()=>startHotspot()
    }]
  });
}
function activateHost46900(event,locationId){
  if(String(locationId||"")===HOST_ID){
    const gate=eligibility();
    if(gate.eligible){
      try{if(event&&typeof event.preventDefault==="function")event.preventDefault();}catch(_error){}
      return typeof routeWorldOpportunityInteraction==="function"
        ?routeWorldOpportunityInteraction(OPPORTUNITY_ID,"approach_crossing")
        :startHotspot();
    }
  }
  return priorActivatePublic?priorActivatePublic.apply(this,arguments):{success:false,reason:"konoha_public_location_owner_missing"};
}
function decorateVillageMarkup(markup){
  if(typeof markup!=="string"||!eligibility().eligible)return markup;
  const marker='data-village-hotspot-id="'+HOST_ID+'"';
  const start=markup.lastIndexOf("<button",markup.indexOf(marker));
  const end=start>=0?markup.indexOf("</button>",start):-1;
  if(start<0||end<0)return markup;
  let button=markup.slice(start,end+9);
  button=button.replace('class="village-golden-halo ','class="village-golden-halo sc-ce-hotspot-469 ');
  button=button.replace("Hokage Administration. Double-click to enter.","Hokage Administration. Chronicle event available. Double-click to approach.");
  button=button.replace(">Hokage Administration</span>",">Hokage Administration · CHRONICLE EVENT</span>");
  return markup.slice(0,start)+button+markup.slice(end+9);
}
function renderVillage46900(){
  syncOpportunity({save:false});
  const markup=priorRenderVillage?priorRenderVillage.apply(this,arguments):"";
  return decorateVillageMarkup(markup);
}
if(priorRenderVillage){
  globalThis.renderAlphaKonohaVillageHotspots=renderVillage46900;
  try{renderAlphaKonohaVillageHotspots=renderVillage46900;}catch(_error){}
}
if(priorActivatePublic){
  globalThis.activateAlphaKonohaV3PublicLocation=activateHost46900;
  try{activateAlphaKonohaV3PublicLocation=activateHost46900;}catch(_error){}
}

function boardActor(id,focusId){
  const meta=participantMeta(id);
  return{id:meta.id,label:meta.label,image:meta.image||null,focus:id===focusId};
}
function boardProjection({runtime,performance,beat}={}){
  const ctx=runtime&&runtime.localContext&&runtime.localContext.hotspot469||{};
  const ids=Array.isArray(ctx.currentTeamVariantIds)?[KAKASHI_ID,MI_ID,...ctx.currentTeamVariantIds.slice(1)]:[KAKASHI_ID,MI_ID];
  const speaker=performance&&performance.cue&&(performance.cue.speakerSourceId||performance.cue.speakerId)||beat&&beat.speakerRef&&beat.speakerRef.sourceId||null;
  return{mode:"conversation",location:"HOKAGE ADMINISTRATION · PUBLIC APPROACH",actors:ids.map(id=>boardActor(id,speaker))};
}
function installBoardRegistration(){
  if(typeof globalThis.registerStorySceneBoardDefinition!=="function")return false;
  globalThis.registerStorySceneBoardDefinition(SCENE_ID,{
    resolveProjection:boardProjection,
    resolveBackdrop:()=>null
  });
  return true;
}
function queueBoardRegistration(){
  if(installBoardRegistration())return true;
  const queue=globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS||(globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS=[]);
  if(!queue.some(row=>row&&row.owner===PATCH_ID))queue.push({owner:PATCH_ID,register:installBoardRegistration});
  return false;
}

registerOpportunity();
rehydrateActiveScene();
queueBoardRegistration();
syncOpportunity({save:false});

function diagnostics(){
  const gate=eligibility(),definition=typeof getRegisteredWorldEventOpportunity==="function"?getRegisteredWorldEventOpportunity(OPPORTUNITY_ID):null;
  const choiceLabels=(()=>{
    const ctx={currentTeamVariantIds:[KAKASHI_ID,"academy_hinata","academy_obito"],rememberedHistoryFamily:"other_material_encounter",teammateReactionPlan:[],materialHistoryRefs:[]};
    const scene=buildScene(ctx),choice=scene.beats.find(row=>row.beatId==="kakashi_choice");
    return choice?choice.choices.map(row=>row.label):[];
  })();
  const checks={
    exactIdentity:EVENT_ID==="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"&&HOST_ID==="KON-P01"&&MI_ID==="academy_kakashi_origin_masked_interceptor",
    registeredExistingWorld:!!definition&&definition.sourceKind==="authored"&&definition.randomPoolEligible===false,
    exactFourChoices:choiceLabels.join("|")==="Tell her you remember her.|Ask what she is doing here.|Watch her pass.|Keep moving.",
    noAttackChoice:!choiceLabels.some(label=>/attack/i.test(label)),
    sevenHistoryFamilies:["lethal_attempt","uchiha_police_transfer","restraint_anbu_collection","deliberate_release","mi_defeated_kakashi","kakashi_defeated_mi","other_material_encounter"].every(id=>typeof historyReactionBeats(id)!=="undefined"),
    recordObserverSafe:RECORD_FACT==="Seen leaving Hokage Administration after a document handoff. Administration staff did not challenge her presence."&&RECORD_PRIOR==="Previously encountered during the Academy package incident.",
    hiddenTruthNotActivityHistory:String(commitContinuitySnapshot).includes("originParticipantContinuity")&&!String(commitContinuitySnapshot).includes("activityHistory.push"),
    noBattleRoute:!String(buildScene).includes("battle_transition")&&!choiceLabels.some(label=>/fight|attack/i.test(label)),
    currentTeamConsumer:String(sceneContextFromGate).includes("currentTeam"),
    finiteClosure:String(commitClosure).includes("everClosed:true"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,currentGate:gate,browserGoldenClaimed:false};
}

globalThis.classifyMaskedInterceptorHistory46900=classifyHistory;
globalThis.getOriginParticipantContinuity46900=getContinuity;
globalThis.commitOriginParticipantContinuity46900=commitContinuitySnapshot;
globalThis.evaluateFirstLiveCEHotspotEligibility46900=eligibility;
globalThis.syncFirstLiveCEHotspot46900=syncOpportunity;
globalThis.startFirstLiveCEHotspot46900=startHotspot;
globalThis.commitFirstLiveCEHotspotClosure46900=commitClosure;
globalThis.runFirstLiveCEHotspot46900Diagnostics=diagnostics;
globalThis.SC_FIRST_LIVE_CE_HOTSPOT_46900=Object.freeze({
  patchId:PATCH_ID,eventId:EVENT_ID,opportunityId:OPPORTUNITY_ID,hostId:HOST_ID,
  stableParticipantId:MI_ID,sceneId:SCENE_ID,browserGoldenClaimed:false
});
})();
