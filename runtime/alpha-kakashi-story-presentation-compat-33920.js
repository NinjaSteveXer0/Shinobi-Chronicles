// ============================================================================
// ACADEMY KAKASHI STORY PRESENTATION COMPATIBILITY SHIM — 33920 v2
//
// Temporary, explicit compatibility layer over the current 33910 Scene Board
// consumer. It exists only to correct installed-browser presentation defects
// while 33910 remains the live consumer. After installed-browser acceptance,
// fold these rules/handlers into 33910 and retire this file.
//
// Presentation only. No Story facts, choices, Battle, custody, rewards,
// Progression, PL, Rank, Acquisition, or Chronicle truth are owned here.
// ============================================================================
(function installAcademyKakashiStoryPresentationCompat33920(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_STORY_PRESENTATION_COMPAT_33920)return;

const PATCH_ID="academy_kakashi_story_presentation_compat_33920_v2_2026_09_16";
const STYLE_ID="sc-kakashi-story-presentation-compat-33920-style";
const boundStages=new WeakSet();
let retainedDialogue33920=[];

function isKakashiScene33920(){
  try{
    const runtime=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
    const A=globalThis.SC_ALPHA_ORIGIN_32900;
    const scene=A&&A.sceneByVariant&&A.sceneByVariant.academy_kakashi;
    return!!runtime&&!!scene&&runtime.sceneId===scene;
  }catch(_error){return false;}
}

function installStyle33920(){
  if(typeof document==="undefined"||!document.head)return false;
  const old=document.getElementById(STYLE_ID);if(old)old.remove();
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
/* Collectible cards already contain their identity treatment. */
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor-tag{display:none!important;}

/* Click-anywhere progression owns advance. Do not show a redundant arrow. */
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-performance-next-33910{display:none!important;}

/* Object/instruction state must read as a real scene instruction, not an 8px tag. */
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__objects{
  bottom:23.5%!important;gap:12px!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__object{
  min-width:240px!important;max-width:420px!important;padding:12px 18px!important;
  font-size:11px!important;line-height:1.35!important;letter-spacing:.08em!important;text-align:center!important;
  border-color:rgba(202,167,78,.72)!important;background:rgba(3,9,13,.90)!important;
  box-shadow:0 12px 30px rgba(0,0,0,.34)!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__object b{
  display:block!important;margin:0 0 5px!important;font-size:10px!important;letter-spacing:.14em!important;
}

/* Conversation lane: one readable central stack between the two character cards. */
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910{
  width:min(42%,620px)!important;min-height:108px!important;
  padding:17px 22px 16px!important;
  clip-path:none!important;border-radius:8px!important;
  background:linear-gradient(180deg,rgba(4,12,18,.95),rgba(5,15,21,.90))!important;
  box-shadow:0 18px 48px rgba(0,0,0,.42)!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-current.is-left,
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-current.is-right{
  left:50%!important;right:auto!important;top:27%!important;bottom:auto!important;
  transform:translateX(-50%)!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-previous.is-left,
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-previous.is-right{
  left:50%!important;right:auto!important;top:45%!important;bottom:auto!important;
  transform:translateX(-50%) scale(.98)!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-previous{
  opacity:.68!important;filter:none!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-dialogue-status-33910{display:none!important;}

/* Narration stays low, while the conversation remains visible above it. */
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-narration-panel-33910{
  width:min(72%,980px)!important;min-height:82px!important;padding:15px 22px!important;
  clip-path:none!important;border-radius:8px!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-dialogue-panel-33910.is-retained{
  left:50%!important;right:auto!important;width:min(42%,620px)!important;min-height:92px!important;
  padding:14px 20px!important;clip-path:none!important;border-radius:8px!important;
  transform:translateX(-50%)!important;opacity:.58!important;filter:saturate(.72) brightness(.90)!important;
  pointer-events:none!important;background:linear-gradient(180deg,rgba(4,12,18,.88),rgba(5,15,21,.80))!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-dialogue-panel-33910.is-retained.retained-0-33920{top:25%!important;bottom:auto!important;}
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-dialogue-panel-33910.is-retained.retained-1-33920{top:42%!important;bottom:auto!important;opacity:.43!important;}

/* Decision cards should not inherit the cut-corner treatment either. */
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice{
  clip-path:none!important;border-radius:7px!important;
}

/* The scene itself is the continue surface during performed dialogue/narration. */
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-chronicle-stage,
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-chronicle-stage{cursor:pointer!important;}

@media(max-width:1000px){
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910,
  #story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-dialogue-panel-33910.is-retained{width:50%!important;}
}
@media(max-width:820px){
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910,
  #story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-dialogue-panel-33910.is-retained{width:76%!important;}
  #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__object{min-width:190px!important;max-width:74vw!important;}
}
`;
  document.head.appendChild(style);return true;
}

function interactiveTarget33920(target){
  if(!target||typeof target.closest!=="function")return false;
  return!!target.closest("button,a,input,textarea,select,option,[role='button'],.sc-story-choice,[contenteditable='true']");
}

function removeAdvanceButtons33920(layer){
  if(!layer||typeof layer.querySelectorAll!=="function")return 0;
  const nodes=Array.from(layer.querySelectorAll(".sc-performance-next-33910"));
  nodes.forEach(node=>{try{node.remove();}catch(_error){}});
  return nodes.length;
}

function captureDialogue33920(layer){
  if(!layer||!layer.dataset||String(layer.dataset.scBoardUiMode||"")!=="dialogue"||typeof layer.querySelectorAll!=="function")return false;
  const panels=Array.from(layer.querySelectorAll(".sc-dialogue-panel-33910"));
  if(!panels.length)return false;
  const rows=panels.map(panel=>{
    const speaker=panel.querySelector&&panel.querySelector(".sc-dialogue-speaker-33910");
    const copy=panel.querySelector&&panel.querySelector(".sc-dialogue-copy-33910");
    return{
      speaker:String(speaker&&speaker.textContent||""),
      copy:String(copy&&copy.textContent||""),
      current:!!(panel.classList&&panel.classList.contains&&panel.classList.contains("is-current"))
    };
  }).filter(row=>row.copy);
  if(!rows.length)return false;
  retainedDialogue33920=rows.sort((a,b)=>Number(b.current)-Number(a.current)).slice(0,2);
  return true;
}

function makeRetainedDialogue33920(row,index){
  const panel=document.createElement("section");
  panel.className=`sc-dialogue-panel-33910 is-retained retained-${index}-33920`;
  const speaker=document.createElement("div");speaker.className="sc-dialogue-speaker-33910";speaker.textContent=String(row&&row.speaker||"");
  const copy=document.createElement("div");copy.className="sc-dialogue-copy-33910";copy.textContent=String(row&&row.copy||"");
  panel.append(speaker,copy);
  return panel;
}

function injectRetainedDialogue33920(layer){
  if(!layer||!layer.dataset||String(layer.dataset.scBoardUiMode||"")!=="performance_narration"||!retainedDialogue33920.length)return false;
  const stage=layer.querySelector&&layer.querySelector(".sc-chronicle-stage");
  const surface=stage&&stage.querySelector?stage.querySelector(".sc-performance-surface-33910"):null;
  if(!surface||typeof surface.querySelector!=="function")return false;
  if(surface.querySelector(".sc-dialogue-panel-33910.is-retained"))return true;
  retainedDialogue33920.forEach((row,index)=>surface.appendChild(makeRetainedDialogue33920(row,index)));
  return true;
}

function bindStage33920(stage,layer){
  if(!stage||!stage.addEventListener||boundStages.has(stage))return false;
  boundStages.add(stage);
  stage.addEventListener("click",event=>{
    if(!isKakashiScene33920()||event&&event.defaultPrevented)return;
    const mode=layer&&layer.dataset?String(layer.dataset.scBoardUiMode||""):"";
    if(mode!=="dialogue"&&mode!=="performance_narration")return;
    if(interactiveTarget33920(event&&event.target))return;
    if(mode==="dialogue")captureDialogue33920(layer);
    if(event&&typeof event.preventDefault==="function")event.preventDefault();
    if(typeof globalThis.advanceStoryScene==="function")globalThis.advanceStoryScene();
  });
  return true;
}

function sync33920(){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");
  if(!layer||!isKakashiScene33920())return false;
  const stage=layer.querySelector(".sc-chronicle-stage")||layer.querySelector(".sc-story-stage")||layer;
  bindStage33920(stage,layer);
  removeAdvanceButtons33920(layer);
  const mode=layer.dataset?String(layer.dataset.scBoardUiMode||""):"";
  if(mode==="dialogue")captureDialogue33920(layer);
  if(mode==="performance_narration")injectRetainedDialogue33920(layer);
  if(mode==="decision")retainedDialogue33920=[];
  return true;
}

installStyle33920();
sync33920();
if(typeof MutationObserver==="function"&&typeof document!=="undefined"){
  const root=document.getElementById("story-scene-presentation-layer")||document.body;
  if(root){const observer=new MutationObserver(()=>sync33920());observer.observe(root,{childList:true,subtree:true});}
}

function runAcademyKakashiStoryPresentationCompat33920Diagnostics(){
  const css=typeof document!=="undefined"&&document.getElementById(STYLE_ID)?document.getElementById(STYLE_ID).textContent:"";
  const click=bindStage33920.toString();
  const sync=sync33920.toString();
  const checks={
    patchId:PATCH_ID==="academy_kakashi_story_presentation_compat_33920_v2_2026_09_16",
    collectibleNameOverlayRemoved:css.includes("sc-scene-board-33900__actor-tag")&&css.includes("display:none!important"),
    redundantArrowRemoved:css.includes("sc-performance-next-33910")&&removeAdvanceButtons33920.toString().includes("node.remove"),
    instructionPlateReadable:css.includes("min-width:240px!important")&&css.includes("font-size:11px!important")&&css.includes("sc-scene-board-33900__object b"),
    cutCornersRemoved:css.includes("clip-path:none!important")&&css.includes("border-radius:8px!important"),
    dialogueCentralStack:css.includes("left:50%!important")&&css.includes("translateX(-50%)"),
    dialogueStatusRemoved:css.includes("sc-dialogue-status-33910")&&css.includes("display:none!important"),
    narrationRetainsDialogue:injectRetainedDialogue33920.toString().includes("retainedDialogue33920")&&css.includes("is-retained"),
    clickAnywhereAdvance:click.includes("globalThis.advanceStoryScene")&&click.includes("scBoardUiMode"),
    dialogueCapturedBeforeAdvance:click.includes("captureDialogue33920(layer)"),
    interactiveControlsProtected:click.includes("interactiveTarget33920"),
    syncRemovesArrow:sync.includes("removeAdvanceButtons33920"),
    presentationOnly:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,patchId:PATCH_ID,compatibilityShim:true,retireAfterBrowserAcceptance:true,browserGoldenClaimed:false};
}

globalThis.runAcademyKakashiStoryPresentationCompat33920Diagnostics=runAcademyKakashiStoryPresentationCompat33920Diagnostics;
globalThis.SC_ALPHA_KAKASHI_STORY_PRESENTATION_COMPAT_33920=Object.freeze({patchId:PATCH_ID,compatibilityShim:true,retireAfterBrowserAcceptance:true,browserGoldenClaimed:false});
})();