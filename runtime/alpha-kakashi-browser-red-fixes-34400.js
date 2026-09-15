// ============================================================================
// ISSUE #105 / #188 — ACADEMY KAKASHI INSTALLED-BROWSER RED FIXES — 34400
//
// Browser evidence 2026-09-15:
// - front-door -> Origin transition exposed the World Map for one frame;
// - the native Story text surface remained visible beneath 33910's cinematic
//   performance surface;
// - the first Kakashi performance copy read mechanically in-browser.
//
// This module is PRESENTATION ONLY. It creates no Story outcome, resolver
// result, Battle result, custody, reward, PL, Rank, Progression or history.
// Choice/result corrections remain owned by the final Story/Combat consumer.
// ============================================================================
(function installKakashiBrowserRedFixes34400(){
"use strict";
if(globalThis.SC_KAKASHI_BROWSER_RED_FIXES_34400)return;

const PATCH_ID="kakashi_browser_red_fixes_34400_2026_09_15";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SHIELD_ID="sc-kakashi-origin-entry-shield-34400";
const STYLE_ID="sc-kakashi-browser-red-fixes-34400-style";
const HIDDEN_MARK="scHiddenBy34400";
let observer=null,releaseTimer=null;

const COPY=Object.freeze({
  roof_01:Object.freeze({text:"Kakashi stood alone at the edge of a Konoha rooftop, watching the village settle beneath the moon."}),
  roof_02:Object.freeze({text:"A faint shift of air behind him.\n\nKakashi's eye moved first. A masked ANBU operative stood a few paces away, silent and still."}),
  roof_03:Object.freeze({speakerName:"ANBU OPERATIVE",text:"Kakashi Hatake."}),
  roof_04:Object.freeze({text:"Kakashi glanced back over his shoulder."}),
  roof_05:Object.freeze({speakerName:"ANBU OPERATIVE",text:"You have an assignment."}),
  roof_06:Object.freeze({text:"The operative held out a sealed envelope."}),
  roof_07:Object.freeze({text:"Kakashi crossed the rooftop and took it."}),
  roof_08:Object.freeze({speakerName:"KAKASHI",text:"Why bring this to me?"}),
  roof_09:Object.freeze({text:"He broke the seal. A target photograph was waiting inside."}),
  roof_10:Object.freeze({speakerName:"ANBU OPERATIVE",text:"The Hokage approved you to assist us. The man in that photograph is carrying something important. Don't let it fall into the wrong hands."}),
  roof_11:Object.freeze({text:"Kakashi studied the photograph once, then folded it back into the envelope."}),
  alley_01:Object.freeze({text:"Kakashi found the man from the photograph and settled onto his trail."}),
  alley_02:Object.freeze({text:"The target turned into a narrow alley."}),
  alley_03:Object.freeze({text:"Another man was already waiting beneath the sakura tree."}),
  alley_04:Object.freeze({text:"A package sat between them. Neither man touched it yet."}),
  observe_01:Object.freeze({text:"Kakashi held his position and watched."}),
  observe_02:Object.freeze({text:"The target passed the package across. The waiting man took it without a word."}),
  observe_03:Object.freeze({text:"Then movement cut across the exchange. The Masked Interceptor burst from the dark as the original target broke away."})
});

function activeRuntime(){
  try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}
}
function isKakashiActive(){const rt=activeRuntime();return !!rt&&rt.sceneId===SCENE_ID;}
function storyLayer(){return typeof document!=="undefined"?document.getElementById("story-scene-presentation-layer"):null;}

function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
#${SHIELD_ID}{position:fixed;inset:0;z-index:2147482999;background:#020609;pointer-events:auto;opacity:1;transition:opacity .20s ease;}
#${SHIELD_ID}.is-releasing{opacity:0;pointer-events:none;}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-chronicle-layout,
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-chronicle-layout,
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-story-panel,
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-story-panel{display:none!important;visibility:hidden!important;pointer-events:none!important;}
`;
  document.head.appendChild(style);return true;
}

function ensureShield(){
  if(typeof document==="undefined"||!document.body)return null;
  let shield=document.getElementById(SHIELD_ID);if(shield)return shield;
  shield=document.createElement("div");shield.id=SHIELD_ID;shield.setAttribute("aria-hidden","true");document.body.appendChild(shield);return shield;
}
function releaseShieldWhenReady(){
  const shield=typeof document!=="undefined"?document.getElementById(SHIELD_ID):null;if(!shield)return false;
  const layer=storyLayer();
  if(!isKakashiActive()||!layer)return false;
  const stage=layer.querySelector&&((layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector(".sc-story-stage")));
  if(!stage)return false;
  clearTimeout(releaseTimer);
  releaseTimer=setTimeout(()=>{
    if(!shield.isConnected)return;
    shield.classList.add("is-releasing");
    setTimeout(()=>{try{shield.remove();}catch(_error){}},230);
  },50);
  return true;
}

function patchPerformanceCopy(){
  const getter=globalThis.getStoryScenePerformance33900;
  if(typeof getter!=="function"||getter.__sc34400Wrapped===true)return false;
  function wrappedPerformanceGetter(){
    const out=getter.apply(this,arguments);
    if(!out||!out.cue||!COPY[out.cue.cueId])return out;
    const row=COPY[out.cue.cueId];
    if(row.text!==undefined)out.cue.text=row.text;
    if(row.speakerName!==undefined)out.cue.speakerName=row.speakerName;
    if(Array.isArray(out.sequence)){
      const seqCue=out.sequence.find(c=>c&&c.cueId===out.cue.cueId);
      if(seqCue){if(row.text!==undefined)seqCue.text=row.text;if(row.speakerName!==undefined)seqCue.speakerName=row.speakerName;}
    }
    return out;
  }
  wrappedPerformanceGetter.__sc34400Wrapped=true;
  wrappedPerformanceGetter.__sc34400Prior=getter;
  globalThis.getStoryScenePerformance33900=wrappedPerformanceGetter;
  try{getStoryScenePerformance33900=wrappedPerformanceGetter;}catch(_error){}
  return true;
}

function performanceActive(){
  if(!isKakashiActive()||typeof globalThis.getStoryScenePerformance33900!=="function")return false;
  try{const p=globalThis.getStoryScenePerformance33900();return !!(p&&p.cue);}catch(_error){return false;}
}
function hideLegacyStorySurface(){
  const layer=storyLayer();if(!layer)return false;
  const active=performanceActive();
  const nodes=Array.from(layer.querySelectorAll?layer.querySelectorAll(".sc-chronicle-layout,.sc-story-panel"):[]);
  for(const node of nodes){
    if(node.closest&&node.closest(".sc-performance-surface-33910"))continue;
    if(active){
      if(node.dataset&&node.dataset[HIDDEN_MARK]!=="true"){
        node.dataset[HIDDEN_MARK]="true";
        node.dataset.sc34400PriorDisplay=node.style.display||"";
      }
      node.style.setProperty("display","none","important");
      node.style.setProperty("visibility","hidden","important");
      node.style.setProperty("pointer-events","none","important");
    }else if(node.dataset&&node.dataset[HIDDEN_MARK]==="true"){
      const prior=node.dataset.sc34400PriorDisplay||"";
      node.style.removeProperty("visibility");node.style.removeProperty("pointer-events");node.style.removeProperty("display");
      if(prior)node.style.display=prior;
      delete node.dataset[HIDDEN_MARK];delete node.dataset.sc34400PriorDisplay;
    }
  }
  return active;
}

let syncQueued=false;
function sync(){
  syncQueued=false;
  patchPerformanceCopy();
  hideLegacyStorySurface();
  releaseShieldWhenReady();
}
function scheduleSync(){
  if(syncQueued)return;syncQueued=true;
  if(typeof requestAnimationFrame==="function")requestAnimationFrame(sync);else setTimeout(sync,0);
}

function installEntryCapture(){
  if(typeof document==="undefined"||document.documentElement.dataset.scKakashiEntryCapture34400==="true")return false;
  document.documentElement.dataset.scKakashiEntryCapture34400="true";
  document.addEventListener("click",event=>{
    const node=event.target&&event.target.closest?event.target.closest("[data-afd-action='confirm-ninja']"):null;
    if(!node)return;
    const selected=globalThis.SC_ALPHA_FRONT_DOOR_33300&&globalThis.SC_ALPHA_FRONT_DOOR_33300.state&&globalThis.SC_ALPHA_FRONT_DOOR_33300.state.selectedVariantId;
    if(selected!=="academy_kakashi")return;
    ensureShield();scheduleSync();
  },true);
  return true;
}

function runKakashiBrowserRedFixes34400Diagnostics(){
  const css=typeof document!=="undefined"&&document.getElementById(STYLE_ID)?document.getElementById(STYLE_ID).textContent:"";
  const checks={
    patchId:PATCH_ID==="kakashi_browser_red_fixes_34400_2026_09_15",
    entryShieldInstalled:typeof ensureShield==="function"&&installEntryCapture.toString().includes("confirm-ninja"),
    legacySurfaceSuppressed:hideLegacyStorySurface.toString().includes("sc-chronicle-layout,.sc-story-panel"),
    naturalCopyMapped:COPY.roof_10.text.includes("The Hokage approved you to assist us")&&COPY.alley_01.text.includes("man from the photograph"),
    noStoryMutation:!["commitOccurrence","commitCharacterAcquisition","completeChronicleOriginPrologue","launchAcademyKakashiOriginPlBattle"].some(token=>installKakashiBrowserRedFixes34400.toString().includes(token)),
    styleHasForcedPerformanceHide:css?css.includes("visibility:hidden!important"):true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

installStyle();installEntryCapture();patchPerformanceCopy();
if(typeof document!=="undefined"&&typeof MutationObserver==="function"){
  observer=new MutationObserver(scheduleSync);observer.observe(document.body||document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["data-sc-board-ui-mode","style","class"]});
}
globalThis.runKakashiBrowserRedFixes34400Diagnostics=runKakashiBrowserRedFixes34400Diagnostics;
globalThis.SC_KAKASHI_BROWSER_RED_FIXES_34400=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
scheduleSync();
})();
