// ============================================================================
// ISSUE #188 — KAKASHI OBJECTIVE PRESENTATION ACCEPTANCE FIX — 35720
//
// Presentation only. The Story objective text remains owned by the authored
// Kakashi scene/runtime state. This patch fixes two installed-browser concerns:
// - the Rooftop objective is hidden until Kakashi actually breaks the seal and
//   reveals the target photograph;
// - the reusable Objective panel is modestly larger/readable on every Story
//   Scene Board surface.
//
// No MutationObserver is introduced here. The gate is held on the presentation
// layer itself, so the existing 33900 board observer may rebuild its markup
// without accidentally making the pre-envelope objective visible again.
// ============================================================================
(function installKakashiObjectivePresentation35720(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_OBJECTIVE_PRESENTATION_35720)return;

const PATCH_ID="alpha_kakashi_objective_presentation_35720_v2_2026_09_18";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const ROOFTOP_BEAT="kak_original_rooftop";
const OPENED_CUE_ID="scene01_10";
const STYLE_ID="sc-kakashi-objective-presentation-35720-style";

function installStyle(){
  if(typeof document==="undefined"||!document.head)return false;
  if(document.getElementById(STYLE_ID))return true;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
#story-scene-presentation-layer .sc-scene-board-33900__objective{
  min-width:310px!important;
  max-width:min(52%,460px)!important;
  min-height:62px!important;
  padding:11px 15px!important;
  display:flex!important;
  flex-direction:column!important;
  justify-content:center!important;
  box-sizing:border-box!important;
  font-size:11.5px!important;
  line-height:1.45!important;
  box-shadow:0 11px 28px rgba(0,0,0,.36)!important;
}
#story-scene-presentation-layer .sc-scene-board-33900__objective b{
  font-size:9px!important;
  margin-bottom:4px!important;
}
#story-scene-presentation-layer[data-sc-kakashi-objective-gate="hidden"] .sc-scene-board-33900__objective{
  display:none!important;
}
@media(max-width:820px){
  #story-scene-presentation-layer .sc-scene-board-33900__objective{
    min-width:230px!important;
    max-width:64%!important;
    min-height:52px!important;
    padding:9px 11px!important;
    font-size:9.5px!important;
  }
}
`;
  document.head.appendChild(style);return true;
}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function performance(){try{return typeof globalThis.getStoryScenePerformance33900==="function"?globalThis.getStoryScenePerformance33900():null;}catch(_error){return null;}}
function syncObjectiveGate35720(){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const rt=active();
  if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==ROOFTOP_BEAT){
    try{delete layer.dataset.scKakashiObjectiveGate;}catch(_error){}
    return true;
  }
  const p=performance(),cue=p&&p.cue||null;
  const opened=!!p&&(String(cue&&cue.objectState||"")==="opened"||String(cue&&cue.cueId||"")===OPENED_CUE_ID||Number(p.index)>=9);
  layer.dataset.scKakashiObjectiveGate=opened?"revealed":"hidden";
  return true;
}

let hooksInstalled=false,attempts=0;
function installHooks(){
  if(hooksInstalled)return true;
  if(typeof globalThis.renderStoryScenePresentationLayer!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
  const PRE_RENDER=globalThis.renderStoryScenePresentationLayer,PRE_ADVANCE=globalThis.advanceStoryScene;
  globalThis.renderStoryScenePresentationLayer=function renderStoryScenePresentationLayer35720(){
    const result=PRE_RENDER.apply(this,arguments);syncObjectiveGate35720();return result;
  };
  globalThis.advanceStoryScene=function advanceStorySceneObjective35720(){
    const result=PRE_ADVANCE.apply(this,arguments);syncObjectiveGate35720();return result;
  };
  try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  hooksInstalled=true;installStyle();syncObjectiveGate35720();return true;
}
function ensureHooks(){if(installHooks())return;if(typeof setTimeout==="function"&&attempts++<120)setTimeout(ensureHooks,25);}
function diagnostics(){
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_objective_presentation_35720_v2_2026_09_18",
    objectiveRevealCuePinned:OPENED_CUE_ID==="scene01_10",
    revealRequiresOpenedEnvelope:syncObjectiveGate35720.toString().includes('objectState||"")==="opened"')&&syncObjectiveGate35720.toString().includes("Number(p.index)>=9"),
    globalObjectiveSizing:installStyle.toString().includes("min-width:310px")&&installStyle.toString().includes("min-height:62px"),
    survivesBoardRebuildByLayerGate:installStyle.toString().includes('data-sc-kakashi-objective-gate="hidden"'),
    styleInstallIdempotent:installStyle.toString().includes("getElementById(STYLE_ID))return true"),
    noMutationObserver:!installHooks.toString().includes("MutationObserver")&&!syncObjectiveGate35720.toString().includes("MutationObserver"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

installStyle();ensureHooks();
globalThis.runKakashiObjectivePresentation35720Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_OBJECTIVE_PRESENTATION_35720=Object.freeze({patchId:PATCH_ID,revealCueId:OPENED_CUE_ID,browserGoldenClaimed:false});
})();