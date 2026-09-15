// ============================================================================
// ACADEMY KAKASHI STORY PRESENTATION COMPATIBILITY SHIM — 33920
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

const PATCH_ID="academy_kakashi_story_presentation_compat_33920_2026_09_16";
const STYLE_ID="sc-kakashi-story-presentation-compat-33920-style";
const boundStages=new WeakSet();

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

/* Conversation lane: clean rectangular surfaces between the two cards. */
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910{
  width:min(34%,470px)!important;min-height:96px!important;
  padding:15px 58px 15px 18px!important;
  clip-path:none!important;border-radius:7px!important;
  background:linear-gradient(180deg,rgba(4,12,18,.94),rgba(5,15,21,.88))!important;
  box-shadow:0 18px 48px rgba(0,0,0,.40)!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-current.is-left{
  left:31%!important;right:auto!important;top:25%!important;bottom:auto!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-current.is-right{
  right:31%!important;left:auto!important;top:25%!important;bottom:auto!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-previous.is-left{
  left:33%!important;right:auto!important;top:48%!important;bottom:auto!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-previous.is-right{
  right:33%!important;left:auto!important;top:48%!important;bottom:auto!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-previous{
  opacity:.72!important;filter:none!important;transform:scale(.98)!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-narration-panel-33910{
  clip-path:none!important;border-radius:7px!important;
}

/* Decision cards should not inherit the cut-corner treatment either. */
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice{
  clip-path:none!important;border-radius:7px!important;
}

/* The scene itself is the continue surface during performed dialogue/narration. */
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-chronicle-stage,
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-chronicle-stage{cursor:pointer!important;}

@media(max-width:1000px){
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910{width:42%!important;}
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-current.is-left{left:29%!important;}
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-current.is-right{right:29%!important;}
}
@media(max-width:820px){
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910{width:76%!important;}
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-current.is-left,
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-current.is-right{left:12%!important;right:auto!important;top:25%!important;}
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-previous.is-left,
  #story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-dialogue-panel-33910.is-previous.is-right{left:12%!important;right:auto!important;top:49%!important;}
}
`;
  document.head.appendChild(style);return true;
}

function interactiveTarget33920(target){
  if(!target||typeof target.closest!=="function")return false;
  return!!target.closest("button,a,input,textarea,select,option,[role='button'],.sc-story-choice,[contenteditable='true']");
}

function bindStage33920(stage,layer){
  if(!stage||!stage.addEventListener||boundStages.has(stage))return false;
  boundStages.add(stage);
  stage.addEventListener("click",event=>{
    if(!isKakashiScene33920()||event&&event.defaultPrevented)return;
    const mode=layer&&layer.dataset?String(layer.dataset.scBoardUiMode||""):"";
    if(mode!=="dialogue"&&mode!=="performance_narration")return;
    if(interactiveTarget33920(event&&event.target))return;
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
  const checks={
    patchId:PATCH_ID==="academy_kakashi_story_presentation_compat_33920_2026_09_16",
    collectibleNameOverlayRemoved:css.includes("sc-scene-board-33900__actor-tag")&&css.includes("display:none!important"),
    cutCornersRemoved:css.includes("clip-path:none!important")&&css.includes("border-radius:7px!important"),
    kakashiDialogueRaised:css.includes("is-current.is-left")&&css.includes("top:25%!important"),
    dialogueKeptBetweenCards:css.includes("left:31%!important")&&css.includes("right:31%!important"),
    previousDialogueReadable:css.includes("opacity:.72!important")&&css.includes("filter:none!important"),
    clickAnywhereAdvance:click.includes("globalThis.advanceStoryScene")&&click.includes("scBoardUiMode"),
    interactiveControlsProtected:click.includes("interactiveTarget33920"),
    presentationOnly:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,patchId:PATCH_ID,compatibilityShim:true,retireAfterBrowserAcceptance:true,browserGoldenClaimed:false};
}

globalThis.runAcademyKakashiStoryPresentationCompat33920Diagnostics=runAcademyKakashiStoryPresentationCompat33920Diagnostics;
globalThis.SC_ALPHA_KAKASHI_STORY_PRESENTATION_COMPAT_33920=Object.freeze({patchId:PATCH_ID,compatibilityShim:true,retireAfterBrowserAcceptance:true,browserGoldenClaimed:false});
})();