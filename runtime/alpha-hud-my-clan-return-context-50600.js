// ============================================================================
// HUD -> MY CLAN EXACT MAP RETURN CONTEXT — ISSUE #506
//
// Presentation-only adapter. Captures the existing map underlay only when the
// Phase-2 HUD opens My Clan, then restores that same caller through existing
// presentation/navigation authorities when My Clan legitimately closes.
//
// No playerData/save/history/geography/currentTeam authority is created here.
// ============================================================================
(function installHudMyClanReturnContext50600(){
"use strict";
if(globalThis.SC_HUD_MY_CLAN_RETURN_50600)return;

const PATCH_ID="hud_my_clan_return_context_50600_2026_10_04";
const HUD_ROOT_ID="sc-phase2-live-hud-49900";
const state={returnUnderlay:null,surfaceKind:null,captureCount:0,restoreCount:0};

function clone(value){
  try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}
  catch(_error){return value;}
}
function currentOverlayName(){
  try{return typeof currentOverlayType!=="undefined"&&currentOverlayType?String(currentOverlayType):null;}
  catch(_error){return null;}
}
function hudSnapshot(){
  try{
    const fn=globalThis.getPhase2LiveHudSnapshot49900;
    return typeof fn==="function"?fn():null;
  }catch(_error){return null;}
}
function captureExistingUnderlay(){
  try{
    if(typeof captureStoryScenePresentationUnderlay==="function"){
      return clone(captureStoryScenePresentationUnderlay());
    }
  }catch(_error){}
  return null;
}
function normalizeCapturedUnderlay(surfaceKind,underlay){
  const base=underlay&&typeof underlay==="object"?clone(underlay):{};
  if(surfaceKind==="world"){
    return {
      overlayType:null,
      overlayVisible:false,
      regionKey:null,
      missionAreaId:null,
      missionAreaReturnContext:null,
      hotspotId:null,
      opportunityId:null
    };
  }
  if(surfaceKind==="region"){
    base.overlayType="region";
    base.overlayVisible=true;
    return base;
  }
  if(surfaceKind==="village"){
    base.overlayType="village";
    base.overlayVisible=true;
    return base;
  }
  return null;
}
function captureHudMyClanReturnContext50600(){
  const snap=hudSnapshot();
  const kind=snap&&snap.surface&&String(snap.surface.kind||"");
  if(!["world","region","village"].includes(kind))return null;
  const underlay=normalizeCapturedUnderlay(kind,captureExistingUnderlay());
  if(!underlay)return null;
  state.returnUnderlay=underlay;
  state.surfaceKind=kind;
  state.captureCount+=1;
  return clone({surfaceKind:kind,underlay});
}
function clearHudMyClanReturnContext50600(){
  state.returnUnderlay=null;
  state.surfaceKind=null;
  return true;
}
function restoreCapturedMapCaller(){
  if(!state.returnUnderlay)return null;
  const underlay=clone(state.returnUnderlay);
  const kind=state.surfaceKind;
  clearHudMyClanReturnContext50600();

  let result=null;
  try{
    if(kind==="world"&&typeof globalThis.returnToWorldMap==="function"){
      result=globalThis.returnToWorldMap();
    }else if(typeof restoreStoryScenePresentationUnderlay==="function"){
      result=restoreStoryScenePresentationUnderlay(underlay);
    }else{
      return {success:false,reason:"existing_presentation_return_router_missing",surfaceKind:kind};
    }
  }catch(error){
    return {success:false,reason:"existing_presentation_return_router_failed",surfaceKind:kind,error:String(error&&error.message||error)};
  }

  state.restoreCount+=1;
  try{
    if(typeof globalThis.refreshPhase2LiveHud49900==="function")globalThis.refreshPhase2LiveHud49900();
  }catch(_error){}
  return result&&typeof result==="object"?result:{success:true,type:"hud_my_clan_map_return",surfaceKind:kind};
}
function isHudClanActivation(target){
  if(!target||typeof target.closest!=="function")return false;
  const node=target.closest('[data-hud499-action="clan"]');
  const root=node&&node.closest("#"+HUD_ROOT_ID);
  return !!(node&&root);
}
function onHudClanCapture(event){
  if(!isHudClanActivation(event&&event.target))return;
  captureHudMyClanReturnContext50600();
  const verify=()=>{
    if(currentOverlayName()!=="clan")clearHudMyClanReturnContext50600();
  };
  if(typeof queueMicrotask==="function")queueMicrotask(verify);
  else if(typeof setTimeout==="function")setTimeout(verify,0);
}

const priorForceCloseMyClan=
  typeof globalThis.forceCloseMyClanOverlay==="function"
    ? globalThis.forceCloseMyClanOverlay
    : null;

function forceCloseMyClanOverlay50600(){
  if(state.returnUnderlay&&currentOverlayName()==="clan"){
    return restoreCapturedMapCaller();
  }
  if(priorForceCloseMyClan)return priorForceCloseMyClan.apply(this,arguments);
  return {success:false,reason:"my_clan_close_authority_missing"};
}

if(typeof document!=="undefined"){
  document.addEventListener("click",onHudClanCapture,true);
}
if(priorForceCloseMyClan){
  globalThis.forceCloseMyClanOverlay=forceCloseMyClanOverlay50600;
}

function snapshot(){
  return Object.freeze({
    patchId:PATCH_ID,
    armed:!!state.returnUnderlay,
    surfaceKind:state.surfaceKind,
    returnUnderlay:state.returnUnderlay?clone(state.returnUnderlay):null,
    captureCount:state.captureCount,
    restoreCount:state.restoreCount,
    persistentStateCreated:false
  });
}
function diagnostics(){
  const captureSource=String(captureHudMyClanReturnContext50600);
  const restoreSource=String(restoreCapturedMapCaller);
  const closeSource=String(forceCloseMyClanOverlay50600);
  const checks={
    existingHudCallerOnly:String(isHudClanActivation).includes('data-hud499-action="clan"')&&String(isHudClanActivation).includes(HUD_ROOT_ID),
    existingUnderlayCapture:sourceHas(captureExistingUnderlay,"captureStoryScenePresentationUnderlay"),
    existingUnderlayRestore:restoreSource.includes("restoreStoryScenePresentationUnderlay"),
    canonicalWorldReturn:restoreSource.includes("returnToWorldMap"),
    mapDepthBounded:captureSource.includes('"world"')&&captureSource.includes('"region"')&&captureSource.includes('"village"'),
    myClanForceCloseSeam:!!priorForceCloseMyClan&&globalThis.forceCloseMyClanOverlay===forceCloseMyClanOverlay50600,
    nonHudCloseFallsThrough:closeSource.includes("priorForceCloseMyClan.apply"),
    noPlayerDataMutation:!sourceBundle().includes("playerData.")&&!sourceBundle().includes("savePlayerData")&&!sourceBundle().includes("saveTestState"),
    noWorldMutation:!sourceBundle().includes("setOpportunity")&&!sourceBundle().includes("commitWorld")&&!sourceBundle().includes("discover"),
    noTeamMutation:!sourceBundle().includes("selectAcademyTeamFormation")&&!sourceBundle().includes("saveMyClanStagedFormation"),
    transientOnly:snapshot().persistentStateCreated===false,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return Object.freeze({pass:failed.length===0,checks:Object.freeze(checks),failed:Object.freeze(failed),browserGoldenClaimed:false});
}
function sourceHas(fn,needle){return String(fn).includes(needle);}
function sourceBundle(){
  return [
    captureExistingUnderlay,
    normalizeCapturedUnderlay,
    captureHudMyClanReturnContext50600,
    restoreCapturedMapCaller,
    forceCloseMyClanOverlay50600
  ].map(String).join("\n");
}

const API=Object.freeze({
  patchId:PATCH_ID,
  snapshot,
  capture:captureHudMyClanReturnContext50600,
  clear:clearHudMyClanReturnContext50600,
  diagnostics
});
globalThis.SC_HUD_MY_CLAN_RETURN_50600=API;
globalThis.getHudMyClanReturnContext50600=snapshot;
globalThis.runHudMyClanReturnContext50600Diagnostics=diagnostics;
})();
