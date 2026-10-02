// ============================================================================
// PHASE 2 — FIRST LIVE CE HOTSPOT — #469 / #432
//
// Bounded Kakashi-Origin benchmark:
// frozen Origin truth -> participant continuity -> KON-P01 occurrence ->
// participant-first autonomy -> Kakashi intent -> observer-safe Chronicle record.
//
// This module deliberately does NOT create a second World, Story, Knowledge,
// relationship, team, Battle, or Shinobi Record authority.
// ============================================================================
(function installPhase2CeHotspot46900(){
"use strict";
if(globalThis.SC_PHASE2_CE_HOTSPOT_46900)return;

const PATCH_ID="phase2_ce_hotspot_46900_2026_10_02";
const EVENT_ID="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const OPPORTUNITY_ID=EVENT_ID;
const ACTION_ID="observe_masked_interceptor_admin_crossing";
const OCCURRENCE_ID="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const SCENE_ID="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const STORY_UNIT_REF=EVENT_ID;
const HOST_ID="KON-P01";
const ORIGIN_ID="academy_kakashi";
const MI_ID="academy_kakashi_origin_masked_interceptor";
const CONTINUITY_KEY=ORIGIN_ID+"::"+MI_ID;
const D=globalThis.SC_STORY_DECISION_REALISATION_34000;

if(!D)throw new Error("phase2_ce_hotspot_469_requires_story_decision_realisation_34000");
if(typeof globalThis.registerWorldEventOpportunity!=="function")throw new Error("phase2_ce_hotspot_469_requires_world_opportunity_runtime");
if(typeof globalThis.registerStoryScene!=="function")throw new Error("phase2_ce_hotspot_469_requires_story_scene_runtime");

const MI_BATTLE_CONFIGS=new Set([
  "academy_kakashi_origin_battle_amt_ps_mi_3v1",
  "academy_kakashi_origin_battle_ps_mi_2v1",
  "academy_kakashi_origin_battle_mi_1v1",
  "academy_kakashi_origin_battle_seq_mi"
]);

const TEAMMATE_AUTHORED_ORDER=Object.freeze([
  "academy_hinata",
  "academy_izuno",
  "academy_mirai",
  "academy_menma",
  "academy_kushina",
  "academy_kurenai",
  "academy_iwabee",
  "academy_metal_lee",
  "academy_obito"
]);

const TEAMMATE_LABELS=Object.freeze({
  academy_hinata:"HINATA",
  academy_izuno:"WASABI",
  academy_mirai:"MIRAI",
  academy_menma:"MENMA",
  academy_kushina:"KUSHINA",
  academy_kurenai:"KURENAI",
  academy_iwabee:"IWABEE",
  academy_metal_lee:"METAL",
  academy_obito:"OBITO"
});

const REACTIONS=Object.freeze({
  academy_hinata:Object.freeze({
    redundancyClass:"recognition_observation",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Hinata's eyes follow the exchange."}),
      Object.freeze({kind:"dialogue",speakerName:"HINATA",text:"She recognised you."})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Hinata looks from Masked Interceptor to Kakashi and keeps watching."})
    ])
  }),
  academy_izuno:Object.freeze({
    redundancyClass:null,
    noStrong:true,
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Wasabi shifts half a step, ready without making it a challenge. She says nothing."})
    ])
  }),
  academy_mirai:Object.freeze({
    redundancyClass:"recognition_observation",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Mirai watches the masked woman pass the intake window, then looks to Kakashi."}),
      Object.freeze({kind:"dialogue",speakerName:"MIRAI",text:"She changed pace when she saw you."})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Mirai checks the stamped receipt, the public intake window, and then Kakashi."})
    ])
  }),
  academy_menma:Object.freeze({
    redundancyClass:null,
    noStrong:true,
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Menma looks from the receipt to the Administration doors, then from Masked Interceptor to Kakashi. He stays quiet."})
    ])
  }),
  academy_kushina:Object.freeze({
    redundancyClass:"identity_question",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Kushina catches the recognition between them immediately."}),
      Object.freeze({kind:"dialogue",speakerName:"KUSHINA",text:"Kakashi. Who is she?"})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Kushina raises her brows at Kakashi and folds her arms, waiting."})
    ])
  }),
  academy_kurenai:Object.freeze({
    redundancyClass:null,
    noStrong:true,
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Kurenai tracks Masked Interceptor's eye-line, then watches Kakashi instead. She does not speak."})
    ])
  }),
  academy_iwabee:Object.freeze({
    redundancyClass:"threat_check",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Iwabee tips his chin toward the masked woman."}),
      Object.freeze({kind:"dialogue",speakerName:"IWABEE",text:"Problem?"})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Iwabee plants his feet and waits for Kakashi to decide whether this matters."})
    ])
  }),
  academy_metal_lee:Object.freeze({
    redundancyClass:null,
    noStrong:true,
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Metal straightens when the woman notices Kakashi, then lets his hands settle when no hostility follows."})
    ])
  }),
  academy_obito:Object.freeze({
    redundancyClass:"recognition_observation",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Obito looks from Kakashi to the mask."}),
      Object.freeze({kind:"dialogue",speakerName:"OBITO",text:"Wait—you know her?"})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Obito's eyebrows lift. He looks at Kakashi, but does not interrupt."})
    ])
  })
});

const HISTORY_CUES=Object.freeze({
  lethal_attempt:Object.freeze([
    Object.freeze({kind:"narration",text:"Masked Interceptor stops outside arm's reach. Her hands remain empty."}),
    Object.freeze({kind:"dialogue",speakerName:"MASKED INTERCEPTOR",text:"Not here."}),
    Object.freeze({kind:"narration",text:"She makes no move toward a weapon."})
  ]),
  police_transfer:Object.freeze([
    Object.freeze({kind:"narration",text:"Her eyes move to the Administration doors, then back to Kakashi. She takes half a step outside his edge of reach. Her hands stay still."})
  ]),
  restraint_or_anbu:Object.freeze([
    Object.freeze({kind:"narration",text:"Her gaze drops once to Kakashi's hands. One wrist turns inside her sleeve, then stills. She looks back at him."})
  ]),
  deliberate_release:Object.freeze([
    Object.freeze({kind:"narration",text:"Recognition settles behind the mask. She leaves the lane between them open and gives Kakashi a small inclination of the head."})
  ]),
  mi_defeated_kakashi:Object.freeze([
    Object.freeze({kind:"narration",text:"Her eyes flick once to the shoulder she pinned before returning to Kakashi's face. She does not slow further."})
  ]),
  kakashi_defeated_mi:Object.freeze([
    Object.freeze({kind:"narration",text:"She changes her path just enough to keep a clear arm's length between them and continues to assess him as she passes."})
  ]),
  material_encounter:Object.freeze([
    Object.freeze({kind:"narration",text:"Her attention lands on Kakashi before it reaches either of his teammates. The recognition is mutual. She says nothing."})
  ])
});

const BRANCH_CUES=Object.freeze({
  tell_remember:Object.freeze([
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"I remember you."}),
    Object.freeze({kind:"dialogue",speakerName:"MASKED INTERCEPTOR",text:"I know."}),
    Object.freeze({kind:"narration",text:"She goes down the steps, the stamped receipt already folded away. No member of staff calls after her. Kakashi looks once at the Administration doors and lets her go."})
  ]),
  ask_business:Object.freeze([
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"What are you doing here?"}),
    Object.freeze({kind:"narration",text:"Masked Interceptor touches two fingers to the folded receipt inside her sleeve."}),
    Object.freeze({kind:"dialogue",speakerName:"MASKED INTERCEPTOR",text:"Delivery. Finished."}),
    Object.freeze({kind:"narration",text:"She steps around the team and keeps walking. Kakashi watches the retreating mask, then the public intake window that has already moved on to the next piece of business."})
  ]),
  watch_pass:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi says nothing and leaves the path open. Masked Interceptor passes the team, folds the receipt fully into her sleeve, and keeps the same steady pace. The crowd takes her. Kakashi looks back to the Administration doors."})
  ]),
  keep_moving:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi turns away before she reaches them. The team keeps moving. Her steps do not change behind him, and he does not look back."})
  ])
});

const CHOICES=Object.freeze([
  Object.freeze({id:"tell_remember",label:"Tell her you remember her.",intentType:"ACKNOWLEDGE_RECOGNITION"}),
  Object.freeze({id:"ask_business",label:"Ask what she is doing here.",intentType:"ASK_WHY_SHE_IS_HERE"}),
  Object.freeze({id:"watch_pass",label:"Watch her pass.",intentType:"OBSERVE_LET_PASS"}),
  Object.freeze({id:"keep_moving",label:"Keep moving.",intentType:"DISENGAGE_KEEP_MOVING"})
]);

function clone(value){
  if(value===undefined)return undefined;
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function pd(){try{return typeof playerData!=="undefined"&&playerData?playerData:globalThis.playerData||null;}catch(_error){return globalThis.playerData||null;}}
function history(){const p=pd();return p&&Array.isArray(p.activityHistory)?p.activityHistory:[];}
function acquisition(){const p=pd();return p&&p.acquisition&&typeof p.acquisition==="object"?p.acquisition:null;}
function recordId(row){return row&&String(row.sourceOccurrenceId||row.occurrenceId||row.id||"")||"";}
function continuityStore(create=false){
  if(typeof globalThis.getOriginParticipantContinuityStore43600!=="function")return null;
  return globalThis.getOriginParticipantContinuityStore43600({create:create===true});
}
function storedContinuity(){
  const store=continuityStore(false);
  const row=store&&store.byKey&&store.byKey[CONTINUITY_KEY];
  return row&&typeof row==="object"?clone(row):null;
}
function saveContinuity(row){
  if(!row||typeof row!=="object")return{success:false,reason:"continuity_row_missing"};
  const store=continuityStore(true);
  if(!store||!store.byKey)return{success:false,reason:"continuity_store_missing"};
  const existing=store.byKey[CONTINUITY_KEY];
  if(existing&&existing.originOccurrenceRef&&row.originOccurrenceRef&&existing.originOccurrenceRef!==row.originOccurrenceRef){
    return{success:false,reason:"continuity_origin_occurrence_conflict",existing:clone(existing)};
  }
  store.byKey[CONTINUITY_KEY]=clone(row);
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,idempotent:!!existing,continuity:clone(store.byKey[CONTINUITY_KEY])};
}
function currentTeam(){
  try{return typeof globalThis.getChronicleCurrentTeam43600==="function"?globalThis.getChronicleCurrentTeam43600():null;}
  catch(_error){return null;}
}
function originCompletionEvidence(){
  const a=acquisition(),origin=a&&a.chronicleOrigin;
  const ids=origin&&Array.isArray(origin.completionEvidenceIds)?origin.completionEvidenceIds:[];
  return ids.find(id=>/^kakashi_v2:/.test(String(id||"")))||null;
}
function instanceFromCompletionEvidence(ref){
  const raw=String(ref||"");
  return raw.startsWith("kakashi_v2:")?raw.slice("kakashi_v2:".length):null;
}
function isMiBattleConfig(configId){
  const id=String(configId||"");
  if(MI_BATTLE_CONFIGS.has(id))return true;
  const configs=globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010&&globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010.configs;
  const row=configs&&configs[id];
  return !!(row&&Array.isArray(row.opposition)&&row.opposition.includes(MI_ID));
}
function exactMiOriginRecords(instanceId){
  const instance=String(instanceId||"");
  return history().filter(row=>row&&row.committed===true&&(
    String(row.storySceneInstanceId||"")===instance||
    String(row.sourceOccurrenceId||row.occurrenceId||row.id||"").includes(instance)
  )).filter(row=>{
    const d=row.data&&typeof row.data==="object"?row.data:{};
    const refs=[d.targetParticipantRef,...(Array.isArray(d.participantRefs)?d.participantRefs:[]),...(Array.isArray(d.targetRefs)?d.targetRefs:[])].map(String);
    return refs.includes("MI")||refs.includes(MI_ID);
  });
}
function rewardReceiptsForInstance(instanceId){
  const p=pd(),root=p&&p.kakashiV2RewardReceipts36015&&p.kakashiV2RewardReceipts36015.receipts;
  return root&&typeof root==="object"?Object.values(root).filter(row=>row&&row.committed===true&&String(row.storyOccurrenceId||"")===String(instanceId||"")):[];
}
function materialHistoryFromCapturedState(state){
  const s=state&&typeof state==="object"?state:{};
  const row=s.participants&&s.participants.MI||{};
  const battles=Object.values(s.battles||{}).filter(b=>b&&isMiBattleConfig(b.encounterId));
  const miDefeatedKakashi=battles.some(b=>b.outcome==="defeat");
  const kakashiDefeatedMi=battles.some(b=>b.outcome==="victory");
  const lethalAttempt=row.disposition==="KILL"||row.lethalIntent===true;
  const policeTransfer=row.state==="POLICE_CUSTODY"||row.deliveredInstitution==="POLICE";
  const restraintOrAnbu=["RESTRAINED","ANBU_CUSTODY"].includes(row.state)||row.disposition==="RESTRAIN"||row.restrainIntent===true||row.deliveredInstitution==="ANBU"||row.collected===true;
  const deliberateRelease=row.state==="RELEASED"||row.disposition==="RELEASE";
  return{lethalAttempt,policeTransfer,restraintOrAnbu,deliberateRelease,miDefeatedKakashi,kakashiDefeatedMi,otherMaterialEncounter:row.state!=="UNSEEN"};
}
function exactRefsForCapturedState(instanceId,state){
  const refs=exactMiOriginRecords(instanceId).map(recordId).filter(Boolean);
  const battles=Object.values(state&&state.battles||{}).filter(b=>b&&isMiBattleConfig(b.encounterId));
  for(const b of battles){
    if(b.battleId)refs.push(String(b.battleId));
    if(b.encounterId)refs.push(String(b.encounterId));
  }
  return [...new Set(refs)];
}
function latestFieldRef(records){
  const preferred=[...records].reverse().find(row=>{
    const d=row.data||{};
    return row.type==="academy_kakashi_v2_disposition"||row.type==="academy_kakashi_v2_delivery"||d.intent||d.institution;
  });
  return preferred?recordId(preferred):null;
}
function continuityFromCapturedState(state,instanceId){
  const s=state&&typeof state==="object"?state:null;
  if(!s||!instanceId)return null;
  const row=s.participants&&s.participants.MI||{state:"UNSEEN"};
  const records=exactMiOriginRecords(instanceId);
  const survived=row.state!=="KILLED";
  const encountered=row.state!=="UNSEEN";
  return{
    schemaVersion:1,
    originId:ORIGIN_ID,
    stableParticipantId:MI_ID,
    observerLabel:"Masked Interceptor",
    originOccurrenceRef:"kakashi_v2:"+instanceId,
    storySceneInstanceId:String(instanceId),
    encounteredByProtagonist:encountered,
    fieldDispositionState:String(row.state||"UNSEEN"),
    fieldDispositionOccurrenceRef:latestFieldRef(records),
    survivedOrigin:survived,
    hiddenPostTestReviewReached:!!(s.terminal&&s.terminal.hiddenTestReviewReached===true),
    postTestTruthClass:survived&&s.terminal&&s.terminal.hiddenTestReviewReached===true?"staged_konoha_test_participant":null,
    protagonistKnowsTestTruth:false,
    materialHistory:materialHistoryFromCapturedState(s),
    materialHistoryRefs:exactRefsForCapturedState(instanceId,s),
    captureMode:"exact_terminal_boundary",
    capturedAt:Date.now()
  };
}
function legacyContinuity(){
  const a=acquisition(),origin=a&&a.chronicleOrigin;
  if(!a||a.chronicleOriginVariantId!==ORIGIN_ID||!origin||origin.prologueCompleted!==true)return null;
  const evidence=originCompletionEvidence(),instance=instanceFromCompletionEvidence(evidence);
  if(!instance)return null;
  const records=exactMiOriginRecords(instance);
  const receipts=rewardReceiptsForInstance(instance);
  const disposition=records.filter(row=>row.type==="academy_kakashi_v2_disposition");
  const delivery=records.filter(row=>row.type==="academy_kakashi_v2_delivery");
  const killed=disposition.some(row=>row.data&&row.data.targetParticipantRef==="MI"&&row.data.outcome==="KILLED");
  const lethalAttempt=disposition.some(row=>row.data&&row.data.targetParticipantRef==="MI"&&row.data.intent==="KILL");
  const policeTransfer=delivery.some(row=>row.data&&row.data.institution==="POLICE"&&Array.isArray(row.data.participantRefs)&&row.data.participantRefs.includes("MI"));
  const anbuTransfer=delivery.some(row=>row.data&&row.data.institution==="ANBU"&&Array.isArray(row.data.participantRefs)&&row.data.participantRefs.includes("MI"));
  const restrained=disposition.some(row=>row.data&&row.data.targetParticipantRef==="MI"&&row.data.intent==="RESTRAIN");
  const victoryReceipts=receipts.filter(row=>{
    const cfg=row.metadata&&row.metadata.battleConfigId;
    return row.sourceId==="kak_origin_battle_mi_victory_ryo_01"||isMiBattleConfig(cfg);
  });
  const battleHistory=history().filter(row=>row&&row.type==="battle"&&row.character===ORIGIN_ID&&row.success===true&&isMiBattleConfig(row.encounterId));
  const kakashiDefeatedMi=victoryReceipts.length>0||battleHistory.length>0;
  const encountered=killed||lethalAttempt||policeTransfer||anbuTransfer||restrained||kakashiDefeatedMi;
  if(!encountered)return null;
  const refs=[...records.map(recordId),...victoryReceipts.map(row=>String(row.address||row.sourceId||"")),...battleHistory.map(row=>String(row.battleId||""))].filter(Boolean);
  let fieldDispositionState="MATERIAL_ENCOUNTER";
  if(killed)fieldDispositionState="KILLED";
  else if(policeTransfer)fieldDispositionState="POLICE_CUSTODY";
  else if(anbuTransfer)fieldDispositionState="ANBU_CUSTODY";
  else if(restrained)fieldDispositionState="RESTRAINED";
  else if(lethalAttempt)fieldDispositionState="ESCAPED";
  else if(kakashiDefeatedMi)fieldDispositionState="BATTLE_DEFEATED";
  return{
    schemaVersion:1,
    originId:ORIGIN_ID,
    stableParticipantId:MI_ID,
    observerLabel:"Masked Interceptor",
    originOccurrenceRef:evidence,
    storySceneInstanceId:instance,
    encounteredByProtagonist:true,
    fieldDispositionState,
    fieldDispositionOccurrenceRef:latestFieldRef(records),
    survivedOrigin:!killed,
    hiddenPostTestReviewReached:true,
    postTestTruthClass:killed?null:"staged_konoha_test_participant",
    protagonistKnowsTestTruth:false,
    materialHistory:{
      lethalAttempt:lethalAttempt&&!killed,
      policeTransfer,
      restraintOrAnbu:anbuTransfer||restrained,
      deliberateRelease:false,
      miDefeatedKakashi:false,
      kakashiDefeatedMi,
      otherMaterialEncounter:true
    },
    materialHistoryRefs:[...new Set(refs)],
    captureMode:"deterministic_durable_history_projection",
    capturedAt:null
  };
}
function getContinuity(){
  return storedContinuity()||legacyContinuity();
}
function laterParticipantUnavailabilityRefs(continuity){
  if(!continuity)return[];
  const originTime=Number(continuity.capturedAt)||0;
  return history().filter(row=>{
    if(!row||row.committed!==true||String(row.type||"").startsWith("academy_kakashi_v2_"))return false;
    if(originTime&&Number(row.timestamp||0)&&Number(row.timestamp)<originTime)return false;
    const d=row.data&&typeof row.data==="object"?row.data:{};
    const refs=[d.stableParticipantId,d.participantId,d.targetParticipantId,...(Array.isArray(d.participants)?d.participants:[]),...(Array.isArray(d.participantRefs)?d.participantRefs:[])].filter(Boolean).map(String);
    if(!refs.includes(MI_ID))return false;
    const semantic=(String(row.type||"")+" "+String(row.outcome||"")+" "+String(d.state||"")).toLowerCase();
    return d.currentWorldAvailable===false||d.deceased===true||d.killed===true||/\b(killed|dead|death|deceased|permanently unavailable)\b/.test(semantic);
  }).map(recordId).filter(Boolean);
}
function historyFamily(continuity){
  if(!continuity)return null;
  const m=continuity.materialHistory||{};
  if(m.lethalAttempt===true)return"lethal_attempt";
  if(m.policeTransfer===true||continuity.fieldDispositionState==="POLICE_CUSTODY")return"police_transfer";
  if(m.restraintOrAnbu===true||["RESTRAINED","ANBU_CUSTODY"].includes(continuity.fieldDispositionState))return"restraint_or_anbu";
  if(m.deliberateRelease===true||continuity.fieldDispositionState==="RELEASED")return"deliberate_release";
  if(m.miDefeatedKakashi===true)return"mi_defeated_kakashi";
  if(m.kakashiDefeatedMi===true||continuity.fieldDispositionState==="BATTLE_DEFEATED")return"kakashi_defeated_mi";
  return continuity.encounteredByProtagonist===true?"material_encounter":null;
}
function resolvedRecord(){
  return history().find(row=>row&&row.committed===true&&recordId(row)===OCCURRENCE_ID)||null;
}
function isResolved(){
  if(resolvedRecord())return true;
  try{
    const state=typeof getWorldEventDimensionState==="function"?getWorldEventDimensionState("resolutionByOpportunityId",OPPORTUNITY_ID):{};
    return !!(state&&state.resolved===true);
  }catch(_error){return false;}
}
function eligibility(){
  const a=acquisition(),team=currentTeam(),continuity=getContinuity();
  if(!a||a.chronicleOriginVariantId!==ORIGIN_ID)return{available:false,reason:"academy_kakashi_origin_required"};
  if(!a.chronicleOrigin||a.chronicleOrigin.prologueCompleted!==true)return{available:false,reason:"academy_kakashi_origin_incomplete"};
  if(typeof isAcademyFreePlayAvailable==="function"&&isAcademyFreePlayAvailable()!==true)return{available:false,reason:"academy_free_play_required"};
  if(!team||team.originVariantId!==ORIGIN_ID||!Array.isArray(team.teamVariantIds)||team.teamVariantIds.length!==3)return{available:false,reason:"exact_current_academy_team_required"};
  if(!continuity)return{available:false,reason:"masked_interceptor_continuity_unproven"};
  if(continuity.encounteredByProtagonist!==true||continuity.fieldDispositionState==="UNSEEN")return{available:false,reason:"masked_interceptor_unseen"};
  if(continuity.survivedOrigin!==true||continuity.fieldDispositionState==="KILLED")return{available:false,reason:"masked_interceptor_killed"};
  if(continuity.hiddenPostTestReviewReached!==true||continuity.postTestTruthClass!=="staged_konoha_test_participant")return{available:false,reason:"hidden_post_test_continuity_unproven"};
  const unavailableRefs=laterParticipantUnavailabilityRefs(continuity);
  if(unavailableRefs.length)return{available:false,reason:"masked_interceptor_later_unavailable",sourceRefs:unavailableRefs};
  if(isResolved())return{available:false,reason:"hotspot_already_resolved"};
  return{available:true,team:clone(team),continuity:clone(continuity),historyFamily:historyFamily(continuity)};
}
function eventPlan(){
  const gate=eligibility();
  if(!gate.available)return{success:false,reason:gate.reason};
  const teammates=gate.team.teamVariantIds.filter(id=>id!==ORIGIN_ID);
  const order=new Map(TEAMMATE_AUTHORED_ORDER.map((id,index)=>[id,index]));
  const teammateOrder=[...teammates].sort((a,b)=>(order.has(a)?order.get(a):999)-(order.has(b)?order.get(b):999));
  if(teammateOrder.length!==2||teammateOrder.some(id=>!REACTIONS[id]))return{success:false,reason:"authored_teammate_reaction_missing",teammates};
  return{
    success:true,
    occurrenceId:OCCURRENCE_ID,
    eventId:EVENT_ID,
    opportunityId:OPPORTUNITY_ID,
    hostId:HOST_ID,
    stableParticipantId:MI_ID,
    teamAssignmentId:gate.team.assignmentId,
    teamVariantIds:[...gate.team.teamVariantIds],
    teammateOrder,
    historyFamily:gate.historyFamily,
    historySourceRefs:[...(gate.continuity.materialHistoryRefs||[])],
    continuityOriginOccurrenceRef:gate.continuity.originOccurrenceRef,
    continuityCaptureMode:gate.continuity.captureMode
  };
}

const PRE_COMPLETE_ORIGIN=typeof globalThis.completeChronicleOriginPrologue==="function"?globalThis.completeChronicleOriginPrologue:null;
function completeChronicleOriginPrologue46900(originVariantId,evidenceIds=[]){
  let capturedState=null,capturedInstance=null;
  if(originVariantId===ORIGIN_ID&&typeof globalThis.getAcademyKakashiV2State36020==="function"){
    try{
      capturedState=clone(globalThis.getAcademyKakashiV2State36020());
      const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
      capturedInstance=active&&active.sceneId==="origin_academy_kakashi_anbu_retrieval"?active.instanceId:null;
    }catch(_error){}
  }
  const result=PRE_COMPLETE_ORIGIN?PRE_COMPLETE_ORIGIN.apply(this,arguments):{success:false,reason:"origin_completion_authority_missing"};
  if(result&&result.success===true&&originVariantId===ORIGIN_ID&&capturedState&&capturedInstance){
    const row=continuityFromCapturedState(capturedState,capturedInstance);
    if(row&&row.hiddenPostTestReviewReached===true)saveContinuity(row);
  }
  return result;
}
if(PRE_COMPLETE_ORIGIN){
  globalThis.completeChronicleOriginPrologue=completeChronicleOriginPrologue46900;
  try{completeChronicleOriginPrologue=completeChronicleOriginPrologue46900;}catch(_error){}
}

function decisionSnapshot(){
  return D.getStoryUnitSnapshot(STORY_UNIT_REF)||{autonomyReceipts:{},decisionReceipts:{}};
}
function teammateReceipts(){
  const snap=decisionSnapshot();
  return Object.values(snap.autonomyReceipts||{}).filter(row=>row&&row.committedStateRef===OCCURRENCE_ID&&TEAMMATE_AUTHORED_ORDER.includes(row.actorRef));
}
function resolvedTeammateRefs(){
  return teammateReceipts().map(row=>row.actorRef);
}
function reactionKindFromIntentRef(ref){
  const raw=String(ref||"");
  if(raw.includes(":strong:"))return"strong";
  if(raw.includes(":fallback:"))return"fallback";
  return"no_strong";
}
function reactionForReceipt(receipt){
  if(!receipt)return null;
  const authored=REACTIONS[receipt.actorRef];
  if(!authored)return null;
  const kind=reactionKindFromIntentRef(receipt.participantIntentRef);
  const cues=kind==="strong"&&authored.strong?authored.strong:authored.fallback;
  return{actorRef:receipt.actorRef,kind,cues:clone(cues||[]),receiptId:receipt.autonomyReceiptId};
}
function committedTeammateReactions(){
  const order=new Map(TEAMMATE_AUTHORED_ORDER.map((id,index)=>[id,index]));
  return teammateReceipts().map(reactionForReceipt).filter(Boolean).sort((a,b)=>(order.get(a.actorRef)||0)-(order.get(b.actorRef)||0));
}
function priorStrongClasses(){
  const out=new Set();
  for(const reaction of committedTeammateReactions()){
    if(reaction.kind!=="strong")continue;
    const row=REACTIONS[reaction.actorRef];
    if(row&&row.redundancyClass)out.add(row.redundancyClass);
  }
  return out;
}
function autonomyState(){
  const plan=eventPlan();
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const local=active&&active.sceneId===SCENE_ID&&active.localContext&&typeof active.localContext==="object"?active.localContext:null;
  const teamVariantIds=local&&Array.isArray(local.teamVariantIds)?local.teamVariantIds:(plan.success?plan.teamVariantIds:[]);
  return{
    committedStateRef:OCCURRENCE_ID,
    autonomyPhase:"pre_protagonist_choice",
    battleLive:false,
    occurrenceId:OCCURRENCE_ID,
    teamVariantIds:[...teamVariantIds],
    resolvedParticipantRefs:resolvedTeammateRefs()
  };
}
function resolveTeammateReaction(actorRef){
  const authored=REACTIONS[actorRef];
  if(!authored)return{success:false,reason:"teammate_reaction_not_authored"};
  const used=priorStrongClasses();
  const kind=authored.noStrong===true?"no_strong":(authored.redundancyClass&&used.has(authored.redundancyClass)?"fallback":"strong");
  const intentRef=EVENT_ID+":teammate:"+actorRef+":"+kind+":"+(authored.redundancyClass||"no_strong_stance");
  return{
    success:true,
    participantIntentRef:intentRef,
    resolverResultRef:D.stableRef("ce469-teammate-reaction",{occurrenceId:OCCURRENCE_ID,actorRef,kind}),
    result:{actorRef,kind,noStrongStance:authored.noStrong===true}
  };
}
for(const [index,actorRef] of TEAMMATE_AUTHORED_ORDER.entries()){
  const registered=D.registerAutonomyAnchor(STORY_UNIT_REF,{
    anchorId:"teammate_reaction_"+actorRef,
    classes:["PARTICIPANT_AUTONOMY","KONOHA_LIVE_HOTSPOT"],
    actorRef,
    priority:10+index,
    orderRef:"writing_order_"+String(index+1).padStart(2,"0"),
    material:true,
    due:state=>state&&state.occurrenceId===OCCURRENCE_ID&&Array.isArray(state.teamVariantIds)&&state.teamVariantIds.includes(actorRef)&&!(Array.isArray(state.resolvedParticipantRefs)&&state.resolvedParticipantRefs.includes(actorRef)),
    resolve:()=>resolveTeammateReaction(actorRef),
    metadata:{eventId:EVENT_ID,hostId:HOST_ID,observerKnowledgeScope:"direct_current_scene_only"}
  });
  if(!registered||registered.success!==true)throw new Error("ce469_autonomy_anchor_registration_failed:"+actorRef);
}
function consumeNextTeammateReaction(){
  const result=D.consumeNextAutonomy({storyUnitRef:STORY_UNIT_REF,state:autonomyState()});
  if(!result||result.success!==true)return result||{success:false,reason:"teammate_autonomy_failed"};
  return{success:true,idempotent:result.idempotent===true,receipt:result.receipt||null};
}

for(const choice of CHOICES){
  const bindingRef=EVENT_ID+":intent:"+choice.id;
  const reg=D.registerResolver(bindingRef,({receipt})=>({
    success:true,
    resolverResultRef:D.stableRef("ce469-protagonist-intent",{occurrenceId:OCCURRENCE_ID,choiceId:choice.id,receiptId:receipt&&receipt.storyDecisionReceiptId||null}),
    result:{choiceId:choice.id,intentType:choice.intentType},
    consequenceRefs:[],
    knowledgeDeltaRefs:[],
    relationshipHistoryRefs:[],
    successorSituationRef:EVENT_ID+":branch:"+choice.id
  }),{owner:PATCH_ID,battleOwned:false});
  if(!reg||reg.success!==true)throw new Error("ce469_choice_resolver_registration_failed:"+choice.id);
}
function ensureChoiceSet(){
  const state=autonomyState();
  if(state.resolvedParticipantRefs.length!==2)return{success:false,reason:"participant_autonomy_incomplete",resolvedParticipantRefs:state.resolvedParticipantRefs};
  return D.openDecisionAfterAutonomy({
    storyUnitRef:STORY_UNIT_REF,
    storyUnitType:"world_event",
    decisionPointRef:EVENT_ID+":kakashi_intent",
    contextStateRef:OCCURRENCE_ID,
    sceneRef:SCENE_ID,
    beatRef:"ce469_choice",
    authorityVersionRefs:["Kakashi_Masked_Interceptor_First_Live_CE_Hotspot_Production_Scene_2026-10-02"],
    sourceOccurrenceRefs:[OCCURRENCE_ID],
    observerRef:ORIGIN_ID,
    excludedIntentRefs:["ATTACK"],
    state,
    choices:CHOICES.map((choice,index)=>({
      choiceId:choice.id,
      intentType:choice.intentType,
      intentPayload:{stableParticipantId:MI_ID,hostId:HOST_ID},
      eligibilityBasisRefs:[OCCURRENCE_ID],
      resolverBindingRef:EVENT_ID+":intent:"+choice.id,
      presentationLabel:choice.label,
      authoredOrder:index
    }))
  });
}
function resolveProtagonistChoice(choiceId){
  const choice=CHOICES.find(row=>row.id===choiceId);
  if(!choice)return{success:false,reason:"protagonist_choice_unknown"};
  const opened=ensureChoiceSet();
  if(!opened||opened.success!==true)return opened||{success:false,reason:"choice_set_unavailable"};
  const resolved=D.resolveStoryChoice({
    storyUnitRef:STORY_UNIT_REF,
    choiceSetId:opened.choiceSet.choiceSetId,
    choiceId,
    state:autonomyState(),
    context:{occurrenceId:OCCURRENCE_ID,hostId:HOST_ID,stableParticipantId:MI_ID}
  });
  return resolved&&resolved.success===true?{success:true,semanticReceipt:resolved.receipt||null}:resolved;
}
function committedProtagonistChoice(){
  const snap=decisionSnapshot();
  const receipts=Object.values(snap.decisionReceipts||{}).filter(row=>row&&row.status==="resolved"&&row.storyUnitRef===STORY_UNIT_REF);
  const receipt=receipts.find(row=>CHOICES.some(choice=>choice.id===row.selectedChoiceId));
  return receipt?receipt.selectedChoiceId:null;
}

function beginOccurrence(){
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const ctx=active&&active.localContext||{};
  if(ctx.occurrenceId!==OCCURRENCE_ID)return{success:false,reason:"ce469_scene_context_missing"};
  if(typeof setWorldEventLifecycle==="function"){
    setWorldEventLifecycle(EVENT_ID,{
      occurrenceId:OCCURRENCE_ID,
      stableParticipantId:MI_ID,
      started:true,
      resolved:false,
      exactTeamVariantIds:Array.isArray(ctx.teamVariantIds)?[...ctx.teamVariantIds]:[],
      projectable:true
    },{save:false});
  }
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,occurrenceId:OCCURRENCE_ID};
}
function finalRecordPayload(choiceId){
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const ctx=active&&active.localContext&&typeof active.localContext==="object"?active.localContext:{};
  const reactions=committedTeammateReactions();
  return{
    id:OCCURRENCE_ID,
    occurrenceId:OCCURRENCE_ID,
    sourceOccurrenceId:OCCURRENCE_ID,
    type:"konoha_ce_shared_history_knowledge_occurrence",
    activity:"world_chronicle_hotspot",
    title:"Hokage Administration Crossing",
    locationId:HOST_ID,
    actorVariantId:ORIGIN_ID,
    protagonistParticipantId:ORIGIN_ID,
    participants:[ORIGIN_ID,MI_ID,...(Array.isArray(ctx.teammateOrder)?ctx.teammateOrder:[])],
    committed:true,
    completed:true,
    outcome:"Seen leaving Hokage Administration after a document handoff. Administration staff did not challenge her presence. Previously encountered during the Academy package incident. Proper name: Unknown.",
    data:{
      eventId:EVENT_ID,
      opportunityId:OPPORTUNITY_ID,
      semanticLocationId:HOST_ID,
      stableParticipantId:MI_ID,
      knownPerson:"Masked Interceptor",
      sharedOccurrence:"Hokage Administration Crossing",
      knownFact:"Seen leaving Hokage Administration after a document handoff. Administration staff did not challenge her presence.",
      priorConnection:"Previously encountered during the Academy package incident.",
      properName:"Unknown",
      sharedHistory:true,
      knowledge:{
        recognisedSamePerson:true,
        recognisedByMaskedInterceptor:true,
        publicAdministrationBusinessObserved:true,
        staffDidNotChallengePresence:true,
        priorModelIncomplete:true
      },
      protagonistIntent:CHOICES.find(row=>row.id===choiceId)?.intentType||null,
      rememberedHistoryFamily:ctx.historyFamily||null,
      originMaterialHistorySourceRefs:Array.isArray(ctx.historySourceRefs)?[...ctx.historySourceRefs]:[],
      storyTeamParticipantRefs:Array.isArray(ctx.teamVariantIds)?[...ctx.teamVariantIds]:[],
      observingParticipantRefs:Array.isArray(ctx.teamVariantIds)?[...ctx.teamVariantIds]:[],
      teammateDirectPerceptionOnly:true,
      participantAutonomyReceiptIds:reactions.map(row=>row.receiptId),
      hiddenTestTruthGranted:false,
      properNameKnowledgeGranted:false,
      anbuMembershipKnowledgeGranted:false,
      moralityScalarCreated:false,
      friendshipScalarCreated:false,
      rewardsGranted:false
    },
    sourceRefs:[
      {type:"world_event",id:EVENT_ID,role:"observer_safe_occurrence"},
      {type:"world_location",id:HOST_ID,role:"directly_observed_host"}
    ],
    timestamp:Date.now()
  };
}
function commitResolution(expectedChoiceId){
  const selected=committedProtagonistChoice();
  if(!selected)return{success:false,reason:"protagonist_intent_receipt_missing"};
  if(expectedChoiceId&&selected!==expectedChoiceId)return{success:false,reason:"protagonist_intent_branch_mismatch",selected,expectedChoiceId};
  const reactions=committedTeammateReactions();
  if(reactions.length!==2)return{success:false,reason:"teammate_autonomy_receipts_incomplete",count:reactions.length};
  const existing=resolvedRecord();
  if(existing)return{success:true,idempotent:true,record:clone(existing)};
  const p=pd();if(!p)return{success:false,reason:"player_state_missing"};
  if(!Array.isArray(p.activityHistory))p.activityHistory=[];
  const record=finalRecordPayload(selected);
  p.activityHistory.push(record);
  try{if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory)&&activityHistory!==p.activityHistory){activityHistory.length=0;activityHistory.push(...p.activityHistory);}}catch(_error){}
  if(typeof setOpportunityResolution==="function")setOpportunityResolution(OPPORTUNITY_ID,{resolved:true,visibleState:"resolved",occurrenceId:OCCURRENCE_ID,selectedIntent:selected},{save:false});
  if(typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(EVENT_ID,{occurrenceId:OCCURRENCE_ID,stableParticipantId:MI_ID,started:true,resolved:true,projectable:false},{save:false});
  if(typeof setOpportunityActionability==="function")setOpportunityActionability(OPPORTUNITY_ID,{available:false,reason:"resolved",reasonVisible:false},{save:false});
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,idempotent:false,record:clone(record)};
}

function cue(kind,text,speakerName=null){
  const row={kind,text,singlePage:true};
  if(speakerName)row.speakerName=speakerName;
  return row;
}
function openingCues(){
  return[
    cue("narration","The public approach to Hokage Administration is busy enough that nobody owns the steps for long."),
    cue("narration","A masked woman leaves the intake side with a stamped receipt in hand. The clerk behind the window has already turned to the next document. No alarm follows her. No one moves to stop her."),
    cue("narration","She folds the receipt into her sleeve."),
    cue("narration","Then she sees Kakashi.")
  ];
}
function historyCues(runtime){
  const family=runtime&&runtime.localContext&&runtime.localContext.historyFamily||"material_encounter";
  return clone(HISTORY_CUES[family]||HISTORY_CUES.material_encounter);
}
function teammateCueSequence(index){
  const reactions=committedTeammateReactions();
  const row=reactions[index]||null;
  return row&&row.cues&&row.cues.length?clone(row.cues):[cue("narration","The teammate notices the exchange and does not manufacture an answer.")];
}
function branchCues(id){return clone(BRANCH_CUES[id]||[]);}

function actorImage(id){
  if(id===MI_ID)return"NPC/masked_interceptor.png";
  try{
    if(typeof getCharacterCardAssetPath==="function"){
      const path=getCharacterCardAssetPath(id);
      if(path)return path;
    }
  }catch(_error){}
  const fallback={
    academy_kakashi:"Assets/Academy Student/academy_kakashi.png",
    academy_hinata:"Assets/Academy Student/academy_hinata.png",
    academy_mirai:"Assets/Academy Student/academy_mirai.png",
    academy_menma:"Assets/Academy Student/academy_menma.png",
    academy_kushina:"Assets/Academy Student/academy_kushina.png",
    academy_kurenai:"Assets/Academy Student/academy_kurenai.png",
    academy_iwabee:"Assets/Academy Student/academy_iwabe.png",
    academy_metal_lee:"Assets/Academy Student/academy_metal.png"
  };
  return fallback[id]||null;
}
function actorLabel(id){
  if(id===ORIGIN_ID)return"KAKASHI";
  if(id===MI_ID)return"MASKED INTERCEPTOR";
  return TEAMMATE_LABELS[id]||String(id||"").replace(/^academy_/,"").replaceAll("_"," ").toUpperCase();
}
function boardActor(id,focus=false){
  return{id,label:actorLabel(id),image:actorImage(id),focus:focus===true};
}
function boardProjection({runtime,beatId,performance}){
  const speaker=String(performance&&performance.cue&&(performance.cue.speakerName||performance.cue.speaker)||"").toUpperCase();
  const context=runtime&&runtime.localContext||{};
  let ids=[ORIGIN_ID,MI_ID];
  if(beatId==="ce469_team_1"||beatId==="ce469_team_2"){
    const reactions=committedTeammateReactions();
    const index=beatId==="ce469_team_1"?0:1;
    if(reactions[index])ids=[ORIGIN_ID,MI_ID,reactions[index].actorRef];
  }
  return{
    mode:beatId==="ce469_choice"?"encounter":"conversation",
    location:"HOKAGE ADMINISTRATION · PUBLIC APPROACH",
    actors:ids.map(id=>boardActor(id,actorLabel(id)===speaker)),
    objects:beatId==="ce469_opening"||beatId==="ce469_history"?[{label:"STAMPED RECEIPT",state:"Folded into sleeve"}]:[]
  };
}

function domainRequest(id,resolve){return{requestId:id,kind:"domain",resolve};}
const beats=[
  {
    beatId:"ce469_opening",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce469_begin_occurrence",beginOccurrence)],
    nextBeatId:"ce469_history"
  },
  {beatId:"ce469_history",mode:"narration",text:"",nextBeatId:"ce469_team_1"},
  {
    beatId:"ce469_team_1",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce469_teammate_autonomy_1",consumeNextTeammateReaction)],
    nextBeatId:"ce469_team_2"
  },
  {
    beatId:"ce469_team_2",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce469_teammate_autonomy_2",consumeNextTeammateReaction)],
    nextBeatId:"ce469_choice"
  },
  {
    beatId:"ce469_choice",mode:"choice",text:"",
    onEnterConsequences:[domainRequest("ce469_open_protagonist_choice",()=>{const r=ensureChoiceSet();return r&&r.success?{success:true,choiceSetId:r.choiceSet&&r.choiceSet.choiceSetId||null}:r;})],
    choices:CHOICES.map(choice=>({
      choiceId:choice.id,
      label:choice.label,
      nextBeatId:"ce469_branch_"+choice.id,
      consequenceRequests:[domainRequest("ce469_protagonist_intent_"+choice.id,()=>resolveProtagonistChoice(choice.id))]
    }))
  },
  ...CHOICES.map(choice=>({
    beatId:"ce469_branch_"+choice.id,
    mode:"narration",text:"",
    exitScene:true,
    onAdvanceConsequences:[
      domainRequest("ce469_commit_resolution_"+choice.id,()=>commitResolution(choice.id)),
      {requestId:"ce469_feedback_"+choice.id,kind:"feedback",feedbackKind:"chronicle_update",label:"Shinobi Record Updated"}
    ]
  }))
];

try{unregisterStoryScene(SCENE_ID);}catch(_error){}
const sceneRegistration=registerStoryScene({
  sceneId:SCENE_ID,
  eventId:EVENT_ID,
  title:"Hokage Administration Crossing",
  entryBeatId:"ce469_opening",
  locationId:HOST_ID,
  participants:[
    {sourceId:ORIGIN_ID,physicalPresence:true,visible:true,role:"protagonist",displayName:"Kakashi"},
    {sourceId:MI_ID,physicalPresence:true,visible:true,role:"returning_participant",displayName:"Masked Interceptor"}
  ],
  beats,
  defaultReturnContext:{type:"overlay",overlayType:"village"}
});
if(!sceneRegistration||sceneRegistration.success!==true)throw new Error("ce469_story_scene_registration_failed");

if(typeof globalThis.registerStorySceneBoardDefinition==="function"){
  const board=globalThis.registerStorySceneBoardDefinition(SCENE_ID,{
    resolve:boardProjection,
    performanceSequences:{
      ce469_opening:openingCues,
      ce469_history:({runtime})=>historyCues(runtime),
      ce469_team_1:()=>teammateCueSequence(0),
      ce469_team_2:()=>teammateCueSequence(1),
      ce469_branch_tell_remember:()=>branchCues("tell_remember"),
      ce469_branch_ask_business:()=>branchCues("ask_business"),
      ce469_branch_watch_pass:()=>branchCues("watch_pass"),
      ce469_branch_keep_moving:()=>branchCues("keep_moving")
    }
  });
  if(!board||board.success!==true)throw new Error("ce469_scene_board_registration_failed");
}

function sceneContext(){
  const plan=eventPlan();
  if(!plan.success)return plan;
  return{
    occurrenceId:plan.occurrenceId,
    eventId:plan.eventId,
    opportunityId:plan.opportunityId,
    hostId:plan.hostId,
    stableParticipantId:plan.stableParticipantId,
    teamAssignmentId:plan.teamAssignmentId,
    teamVariantIds:[...plan.teamVariantIds],
    teammateOrder:[...plan.teammateOrder],
    historyFamily:plan.historyFamily,
    historySourceRefs:[...plan.historySourceRefs],
    continuityOriginOccurrenceRef:plan.continuityOriginOccurrenceRef
  };
}

try{unregisterWorldEventOpportunity(OPPORTUNITY_ID);}catch(_error){}
const worldRegistration=registerWorldEventOpportunity({
  opportunityId:OPPORTUNITY_ID,
  eventId:EVENT_ID,
  hotspotId:"hotspot_konoha_ce_kon_p01_masked_interceptor",
  locationId:HOST_ID,
  regionKey:"konoha",
  sourceKind:"story",
  randomPoolEligible:false,
  defaultDiscoveryLevel:"discovered",
  revealPredicate:()=>eligibility().available===true,
  evaluateProjection:()=>eligibility().available===true,
  presentation:{
    family:"Chronicle Event",
    category:"STORY",
    label:"Hokage Administration",
    summary:"A familiar masked figure is leaving the public intake approach.",
    showUnknownMarker:false
  },
  anchor:{x:52.41,y:20.02},
  interactions:[{
    id:ACTION_ID,
    label:"OBSERVE",
    kind:"story_scene",
    sceneId:SCENE_ID,
    evaluateAvailability:()=>{const gate=eligibility();return{available:gate.available,reason:gate.reason,reasonVisible:false};},
    sceneContextResolver:()=>{
      const context=sceneContext();
      return context&&context.occurrenceId?context:null;
    },
    returnContext:{type:"overlay",overlayType:"village"}
  }]
});
if(!worldRegistration||worldRegistration.success!==true)throw new Error("ce469_world_opportunity_registration_failed");

const PRE_SHINOBI_RECORD_PARTICIPANTS=typeof globalThis.getShinobiRecordParticipants==="function"?globalThis.getShinobiRecordParticipants:null;
function getShinobiRecordParticipants46900(record){
  if(record&&recordId(record)===OCCURRENCE_ID){
    const d=record.data&&typeof record.data==="object"?record.data:{};
    const team=Array.isArray(d.storyTeamParticipantRefs)?d.storyTeamParticipantRefs:[ORIGIN_ID];
    const teammateNames=team.filter(id=>id!==ORIGIN_ID).map(id=>TEAMMATE_LABELS[id]||String(id).replace(/^academy_/,"").replaceAll("_"," ").toUpperCase());
    return["Kakashi","Masked Interceptor",...teammateNames];
  }
  return PRE_SHINOBI_RECORD_PARTICIPANTS?PRE_SHINOBI_RECORD_PARTICIPANTS.apply(this,arguments):[];
}
if(PRE_SHINOBI_RECORD_PARTICIPANTS){
  globalThis.getShinobiRecordParticipants=getShinobiRecordParticipants46900;
  try{getShinobiRecordParticipants=getShinobiRecordParticipants46900;}catch(_error){}
}

const PRE_RENDER_KONOHA_ANCHOR=typeof globalThis.renderAlphaKonohaV3IdentifiedAnchor==="function"?globalThis.renderAlphaKonohaV3IdentifiedAnchor:null;
function renderAlphaKonohaV3IdentifiedAnchor46900(location,options={}){
  if(PRE_RENDER_KONOHA_ANCHOR&&location&&location.id===HOST_ID&&eligibility().available===true){
    return PRE_RENDER_KONOHA_ANCHOR({...location,route:"ce_hotspot_469"},options);
  }
  return PRE_RENDER_KONOHA_ANCHOR?PRE_RENDER_KONOHA_ANCHOR.apply(this,arguments):"";
}
if(PRE_RENDER_KONOHA_ANCHOR){
  globalThis.renderAlphaKonohaV3IdentifiedAnchor=renderAlphaKonohaV3IdentifiedAnchor46900;
  try{renderAlphaKonohaV3IdentifiedAnchor=renderAlphaKonohaV3IdentifiedAnchor46900;}catch(_error){}
}

const PRE_ACTIVATE_KONOHA_LOCATION=typeof globalThis.activateAlphaKonohaV3PublicLocation==="function"?globalThis.activateAlphaKonohaV3PublicLocation:null;
function activateAlphaKonohaV3PublicLocation46900(event,locationId){
  if(String(locationId||"")===HOST_ID){
    const gate=eligibility();
    if(gate.available===true){
      if(event&&typeof event.preventDefault==="function")event.preventDefault();
      if(event&&typeof event.stopPropagation==="function")event.stopPropagation();
      const result=routeWorldOpportunityInteraction(OPPORTUNITY_ID,ACTION_ID);
      return result&&result.success===true?result:(result||{success:false,reason:"ce469_hotspot_route_failed"});
    }
  }
  return PRE_ACTIVATE_KONOHA_LOCATION?PRE_ACTIVATE_KONOHA_LOCATION.apply(this,arguments):{success:false,reason:"konoha_location_route_missing"};
}
if(PRE_ACTIVATE_KONOHA_LOCATION){
  globalThis.activateAlphaKonohaV3PublicLocation=activateAlphaKonohaV3PublicLocation46900;
  try{activateAlphaKonohaV3PublicLocation=activateAlphaKonohaV3PublicLocation46900;}catch(_error){}
}

function diagnostics(){
  const continuity=getContinuity(),gate=eligibility();
  const labels=CHOICES.map(row=>row.label).join("|");
  const checks={
    exactEventIdentity:EVENT_ID==="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"&&HOST_ID==="KON-P01"&&MI_ID==="academy_kakashi_origin_masked_interceptor",
    continuitySchemaBounded:typeof globalThis.getOriginParticipantContinuityStore43600==="function",
    frozenOriginWrappedNotRewritten:!!PRE_COMPLETE_ORIGIN&&String(completeChronicleOriginPrologue46900).includes("PRE_COMPLETE_ORIGIN.apply"),
    killedTerminal:String(eligibility).includes('fieldDispositionState==="KILLED"'),
    unseenIneligible:String(eligibility).includes('fieldDispositionState==="UNSEEN"'),
    hiddenReviewRequired:String(eligibility).includes("hiddenPostTestReviewReached"),
    sevenHistoryFamilies:Object.keys(HISTORY_CUES).length===7,
    deterministicPrecedence:String(historyFamily).indexOf("lethalAttempt")<String(historyFamily).indexOf("policeTransfer")&&String(historyFamily).indexOf("policeTransfer")<String(historyFamily).indexOf("restraintOrAnbu"),
    participantFirstAuthority:D.getRegisteredAnchorInventory(STORY_UNIT_REF).length===9,
    exactFourChoices:labels==="Tell her you remember her.|Ask what she is doing here.|Watch her pass.|Keep moving.",
    noAttackChoice:!CHOICES.some(row=>/attack/i.test(row.label+" "+row.intentType)),
    oneObserverSafeRecord:String(finalRecordPayload).includes("Hokage Administration Crossing")&&String(finalRecordPayload).includes('properName:"Unknown"')&&String(finalRecordPayload).includes("hiddenTestTruthGranted:false"),
    recordParticipantProjection:!!PRE_SHINOBI_RECORD_PARTICIPANTS&&String(getShinobiRecordParticipants46900).includes('"Masked Interceptor"'),
    noRewardWriter:!String(commitResolution).includes("addItemToInventory")&&!String(commitResolution).includes("ryo"),
    finiteResolution:String(commitResolution).includes("resolvedRecord")&&String(commitResolution).includes("setOpportunityResolution"),
    p01OnlyWhileEligible:!!PRE_RENDER_KONOHA_ANCHOR&&String(renderAlphaKonohaV3IdentifiedAnchor46900).includes("eligibility().available===true"),
    storyBoardRegistered:typeof globalThis.resolveStorySceneBoardProjection==="function",
    currentTeamAuthority:String(currentTeam).includes("getChronicleCurrentTeam43600")&&String(eligibility).includes("currentTeam()"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,currentContinuity:clone(continuity),currentEligibility:clone(gate),browserGoldenClaimed:false};
}

globalThis.getOriginParticipantContinuity46900=getContinuity;
globalThis.getKonohaCeHotspotEligibility46900=eligibility;
globalThis.getKonohaCeHotspotPlan46900=eventPlan;
globalThis.getKonohaCeHotspotTeammateReactions46900=()=>clone(committedTeammateReactions());
globalThis.getKonohaCeHotspotResolvedRecord46900=()=>clone(resolvedRecord());
globalThis.runPhase2CeHotspot46900Diagnostics=diagnostics;
globalThis.SC_PHASE2_CE_HOTSPOT_46900=Object.freeze({
  patchId:PATCH_ID,eventId:EVENT_ID,opportunityId:OPPORTUNITY_ID,occurrenceId:OCCURRENCE_ID,sceneId:SCENE_ID,hostId:HOST_ID,stableParticipantId:MI_ID,browserGoldenClaimed:false
});
})();
