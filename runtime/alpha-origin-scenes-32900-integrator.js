// ALPHA ORIGIN 32900 — ten-Origin dispatcher, Journey integration and diagnostics.
(function installAlphaOrigin32900Integrator(){
"use strict";
const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)throw new Error("alpha_origin_32900_core_required");
const PRE=typeof beginAlphaChronicleOriginPrologue==="function"?beginAlphaChronicleOriginPrologue:null;
beginAlphaChronicleOriginPrologue=function alpha329BeginOriginPrologue(){
  const acquisition=typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():null;
  const originId=acquisition&&acquisition.chronicleOriginVariantId||null;
  if(!originId)return PRE?PRE.apply(this,arguments):{success:false,reason:"chronicle_origin_required"};
  if(acquisition.chronicleOrigin&&acquisition.chronicleOrigin.prologueCompleted===true)return{success:true,idempotent:true,reason:"origin_prologue_already_completed",originId};
  const sceneId=A.sceneByVariant[originId]||null;
  if(!sceneId)return{success:false,reason:"origin_story_scene_mapping_missing",originId};
  // Academy Kakashi legacy runtime is intentionally demolished while V2 is rebuilt clean-room.
  // Preserve the stable identity/mapping, but make the temporary absence explicit and fail-closed.
  if(originId==="academy_kakashi"&&(typeof getStorySceneDefinition!=="function"||!getStorySceneDefinition(sceneId)))return{success:false,reason:"academy_kakashi_v2_pending",originId,sceneId};
  if(typeof getStorySceneDefinition!=="function"||!getStorySceneDefinition(sceneId))return{success:false,reason:"origin_story_scene_not_registered",originId,sceneId};
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  if(active){
    if(active.sceneId!==sceneId)return{success:false,reason:"different_story_scene_already_active",originId,sceneId,activeSceneId:active.sceneId};
    if(typeof openOverlay==="function")openOverlay("story_scene");
    return{success:true,idempotent:true,sceneId:active.sceneId,beatId:active.beatId};
  }
  return startStoryScene(sceneId,{sourceEventId:sceneId,context:{protagonistParticipantId:originId,physicallyPresentTeamParticipantIds:[originId],chronicleOriginVariantId:originId},returnContext:{type:"alpha_arc1_mission_command",stage:"origin_prologue"}});
};

function getPendingBattleSessionForOriginPresentation32900(){
  if(typeof sessionStorage==="undefined")return null;
  let parsed=null;
  try{
    const raw=sessionStorage.getItem("shinobiTestState");
    if(!raw)return null;
    if(typeof parseAlphaSessionState==="function"){
      const result=parseAlphaSessionState(raw);
      parsed=result&&result.success===true?result.state:null;
    }else parsed=JSON.parse(raw);
  }catch(_error){return null;}
  if(!parsed||typeof parsed!=="object")return null;
  const unresolved=!!String(parsed.battleId||"").trim()
    &&!!String(parsed.encounterId||"").trim()
    &&parsed.battleOver!==true
    &&(parsed.overlayType==="combat"||parsed.menma369BattleActive===true);
  if(!unresolved)return null;
  return{
    battleId:String(parsed.battleId),
    encounterId:String(parsed.encounterId),
    overlayType:parsed.overlayType||null,
    semanticBattlePending:true
  };
}

function restoreActiveOriginStoryPresentation32900(){
  const acquisition=typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():null;
  const originId=acquisition&&acquisition.chronicleOriginVariantId||null;
  if(!originId)return{success:false,reason:"chronicle_origin_required"};
  if(acquisition.chronicleOrigin&&acquisition.chronicleOrigin.prologueCompleted===true)return{success:false,reason:"origin_prologue_already_completed",originId};
  const sceneId=A.sceneByVariant[originId]||null;
  if(!sceneId)return{success:false,reason:"origin_story_scene_mapping_missing",originId};
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  if(!active)return{success:false,reason:"origin_story_scene_not_active",originId,sceneId};
  if(active.sceneId!==sceneId)return{success:false,reason:"different_story_scene_already_active",originId,sceneId,activeSceneId:active.sceneId};
  if(typeof getStorySceneDefinition!=="function"||!getStorySceneDefinition(sceneId))return{success:false,reason:"origin_story_scene_not_registered",originId,sceneId};
  // Presentation rehydration must never overwrite an unresolved semantic Battle
  // snapshot before core Battle restore runs on window.load. In that case the
  // Battle owner restores first; Story resumes through the existing caller
  // envelope only after the Battle reaches its authored terminal boundary.
  const pendingBattle=getPendingBattleSessionForOriginPresentation32900();
  if(pendingBattle)return{
    success:false,
    reason:"origin_story_presentation_deferred_for_pending_battle_restore",
    originId,sceneId,beatId:active.beatId,
    pendingBattleRestore:true,
    pendingBattle
  };
  if(typeof openOverlay!=="function")return{success:false,reason:"story_overlay_api_missing",originId,sceneId};
  openOverlay("story_scene");
  return{success:true,rehydrated:true,originId,sceneId,beatId:active.beatId};
}

// Rehydrate presentation only. Story truth/beat/localContext were already
// restored by the persisted Story runtime and are not rewritten here.
const startupOriginPresentationRestore32900=restoreActiveOriginStoryPresentation32900();

// 32800 had one presentation typo before #135 returned. Fix only the label.
if(typeof renderAlphaTailedBeastMissionCommand==="function"){
  const PRE_RENDER=renderAlphaTailedBeastMissionCommand;
  renderAlphaTailedBeastMissionCommand=function alpha329RenderMissionCommand(){
    const result=PRE_RENDER.apply(this,arguments);
    if(typeof document!=="undefined")document.querySelectorAll(".alpha328-stage span").forEach(node=>{if(node.textContent.trim()==="ACAMY TEAM")node.textContent="ACADEMY TEAM";});
    return result;
  };
}

// 32800 was authored while #135 was unresolved. Once 32900 is present, its
// diagnostic must recognise the now-integrated nine Origins rather than report
// the deliberately old fail-closed state as a regression.
if(typeof runAlphaJourneySurface32800Diagnostics==="function"){
  const PRE328_DIAG=runAlphaJourneySurface32800Diagnostics;
  runAlphaJourneySurface32800Diagnostics=function alpha329Journey32800CompatibilityDiagnostics(){
    const result=PRE328_DIAG();
    if(result&&result.checks){
      result.checks.missingNineFailClosed=true;
      result.checks.nonKakashiOriginPackagesIntegrated=Object.keys(A.sceneByVariant).length===10&&A.registrations.length===8;
      result.failed=Object.entries(result.checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
      result.pass=result.failed.length===0;
      result.coordinationIssue=135;
      result.coordinationIssueResolved=true;
    }
    return result;
  };
}

function getAlphaOriginScene32900Status(){
  return Object.entries(A.sceneByVariant).map(([originId,sceneId])=>({
    originId,sceneId,
    registered:typeof getStorySceneDefinition==="function"&&!!getStorySceneDefinition(sceneId),
    writingAuthority:originId==="academy_menma"?"existing production Menma":originId==="academy_kakashi"?"Academy Kakashi V2 clean-room runtime / current 2026-09-20 durable Writing":originId==="academy_obito"?"#135/#136 final production Writing":"#135 CE-recovered final Writing lock"
  }));
}
function runAlphaOriginScene32900Diagnostics(){
  const status=getAlphaOriginScene32900Status(),src=beginAlphaChronicleOriginPrologue.toString();
  const checks={
    patchId:A.patchId==="alpha_origin_scenes_32900_2026_09_12",
    tenMappings:Object.keys(A.sceneByVariant).length===10,
    nonKakashiNewScenesRegistered:status.filter(r=>r.originId!=="academy_menma"&&r.originId!=="academy_kakashi").every(r=>r.registered),
    kakashiV2RegistrationCoherent:globalThis.SC_ACADEMY_KAKASHI_V2_CORE_36020?status.find(r=>r.originId==="academy_kakashi")?.registered===true:status.find(r=>r.originId==="academy_kakashi")?.registered===false,
    kakashiV2DispatcherFailClosedWhenAbsent:src.includes("academy_kakashi_v2_pending"),
    menmaPreserved:status.find(r=>r.originId==="academy_menma")?.registered===true,
    allEightNonKakashiRegistrationAttemptsGreen:A.registrations.length===8&&A.registrations.every(r=>r&&r.success===true),
    dispatcherNo135FailClosed:!src.includes("origin_story_scene_package_not_projected")&&!src.includes("coordinationIssue:135"),
    exactKakashiPackage:A.sceneByVariant.academy_kakashi==="origin_academy_kakashi_anbu_retrieval",
    exactObitoPackage:A.sceneByVariant.academy_obito==="origin_academy_obito_journey_to_training",
    sourceFirstConsumer:A.commitOccurrence.toString().includes("this.history().push(record)")&&A.commitOccurrence.toString().includes("consumeStaticOriginSourceOccurrence"),
    continuityReused:A.completionRequest.toString().includes("completeChronicleOriginPrologue"),
    activeOriginReloadPresentationRehydrated:String(restoreActiveOriginStoryPresentation32900).includes('active.sceneId!==sceneId')&&String(restoreActiveOriginStoryPresentation32900).includes('openOverlay("story_scene")')&&String(restoreActiveOriginStoryPresentation32900).includes("origin_prologue_already_completed"),
    pendingBattleRestoreOutranksStoryPresentation:String(restoreActiveOriginStoryPresentation32900).includes("origin_story_presentation_deferred_for_pending_battle_restore")&&String(getPendingBattleSessionForOriginPresentation32900).includes('parsed.overlayType==="combat"')&&String(getPendingBattleSessionForOriginPresentation32900).includes("parsed.battleOver!==true"),
    noDirectPLGrant:!A.commitOccurrence.toString().includes("currentPL")&&!A.commitOccurrence.toString().includes("BasePL"),
    nonKakashiOptionalBattleScenesExplicitlyFailClosed:A.battleFailClosedScenes.size>=4,
    browserGoldenClaimed:false
  };
  return{patchId:A.patchId,pass:Object.entries(checks).filter(([k])=>k!=="browserGoldenClaimed").every(([,v])=>v===true),checks,registrations:A.clone(A.registrations),status,browserGolden:false};
}
globalThis.SC_ALPHA_ORIGIN_SCENE_IDS=Object.freeze({...A.sceneByVariant});
globalThis.ALPHA_ORIGIN_SCENE_BY_VARIANT_32900=A.sceneByVariant;
globalThis.getAlphaOriginScene32900Status=getAlphaOriginScene32900Status;
globalThis.runAlphaOriginScene32900Diagnostics=runAlphaOriginScene32900Diagnostics;
globalThis.restoreActiveOriginStoryPresentation32900=restoreActiveOriginStoryPresentation32900;
globalThis.getPendingBattleSessionForOriginPresentation32900=getPendingBattleSessionForOriginPresentation32900;

// #188 neutral Story Decision Realisation loads after the existing Origin
// packages. It is a semantic coordinator only; it does not turn Origins into
// Missions or replace any 32900 source occurrence/completion authority.
(function activateStoryDecisionRealisation34000AfterOrigins(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;
  if(globalThis.SC_STORY_DECISION_REALISATION_34000)return;
  const SCRIPT_ID="sc-story-decision-realisation-34000-script";
  if(document.getElementById(SCRIPT_ID))return;
  const script=document.createElement("script");
  script.id=SCRIPT_ID;script.async=false;
  // Historical delivery-QA markers only; active URL is consolidation generation 6.
  // runtime/alpha-story-decision-realisation-34000.js?sc=story-decision-20260916-4
  // runtime/alpha-story-decision-realisation-34000.js?sc=story-decision-20260917-5
  script.src="runtime/alpha-story-decision-realisation-34000.js?sc=story-decision-20260917-6";
  document.head.appendChild(script);
})();
})();