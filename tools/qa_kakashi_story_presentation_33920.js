#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const compatPath=path.join(root,"runtime","alpha-kakashi-story-presentation-compat-33920.js");
const restorationPath=path.join(root,"runtime","alpha-kakashi-original-origin-restoration-33800.js");
const traversalPath=path.join(root,"runtime","alpha-traversal-bridge-33200.js");
const compat=fs.readFileSync(compatPath,"utf8");
const restoration=fs.readFileSync(restorationPath,"utf8");
const traversal=fs.readFileSync(traversalPath,"utf8");

// Source / ownership contract.
assert(compat.includes("academy_kakashi_story_presentation_compat_33920_v3_2026_09_17"),"33920 must expose the current v3 presentation patch identity");
assert(compat.includes("compatibilityShim:true"),"33920 must identify itself as a compatibility shim");
assert(compat.includes("retireAfterBrowserAcceptance:true"),"33920 must declare its retirement condition");
assert(compat.includes("sc-scene-board-33900__actor-tag")&&compat.includes("display:none!important"),"runtime actor name overlay must be suppressed on collectible cards");
assert(compat.includes("sc-performance-next-33910")&&compat.includes("removeAdvanceButtons33920"),"redundant dialogue/narration arrow must be removed");
assert(compat.includes("min-width:240px!important")&&compat.includes("font-size:11px!important"),"scene object/instruction plate must be materially larger");
assert(compat.includes("clip-path:none!important")&&compat.includes("border-radius:8px!important"),"cut-corner dialogue treatment must be removed");
assert(compat.includes("left:50%!important")&&compat.includes("translateX(-50%)"),"dialogue must use the central conversation stack");
assert(compat.includes("sc-dialogue-status-33910")&&compat.includes("display:none!important"),"SPEAKING/PREVIOUS micro-labels must be removed");
assert(compat.includes("captureDialogue33920")&&compat.includes("injectRetainedDialogue33920")&&compat.includes("is-retained"),"dialogue must persist visually while narration continues");
assert(compat.includes("syncNativeLayoutVisibility33920")&&compat.includes('setProperty("display","none","important")'),"native Story layout must be suppressed while cinematic performance owns the cue surface");
assert(compat.includes("globalThis.advanceStoryScene"),"Story stage click must use the existing Story advance authority");
assert(compat.includes("interactiveTarget33920"),"interactive controls must be protected from stage-wide advance");
for(const forbidden of ["commitStoryIntent","resolveStoryFactualAction","launchAcademyKakashiOriginPlBattle","commitCharacterAcquisition","awardOriginRewards"]){
  assert(!compat.includes(forbidden),`33920 must remain presentation-only: ${forbidden}`);
}

// Production delivery contract.
assert(restoration.includes('alpha-kakashi-story-presentation-compat-33920.js?v=${BUILD}'),"33800 must load 33920 from the Scene Board chain");
assert(restoration.includes('const BUILD="scene-board-20260917-5";'),"33800 Scene Board child identity was not advanced to Scene 1 generation 5");
assert(restoration.includes('polish.addEventListener("load",load33920,{once:true})'),"33920 must wait until the live 33910 consumer is loaded");
assert(traversal.includes('const SCENE_BOARD_BUILD="scene-board-20260917-5";'),"33200 Scene Board parent identity was not advanced to Scene 1 generation 5");
assert(traversal.includes('alpha-kakashi-original-origin-restoration-33800.js?v=${SCENE_BOARD_BUILD}'),"33200 must deliver 33800 through the versioned terminal chain");
assert(!restoration.includes('const BUILD="scene-board-20260916-4";'),"stale Scene Board child identity remains active");
assert(!traversal.includes('const SCENE_BOARD_BUILD="scene-board-20260916-4";'),"stale Scene Board parent identity remains active");

// Minimal installed-DOM semantic harness: non-interactive dialogue/narration
// clicks advance once; actual controls and decision mode do not.
const nodes=new Map();
let stageClick=null,advanceCalls=0;
const stage={
  addEventListener(type,fn){if(type==="click")stageClick=fn;},
  querySelector(){return null;}
};
const layer={
  dataset:{scBoardUiMode:"dialogue"},
  querySelector(selector){return selector===".sc-chronicle-stage"?stage:null;}
};
const head={appendChild(node){if(node&&node.id)nodes.set(node.id,node);return node;}};
const document={
  head,body:{},
  createElement(){return{id:"",className:"",textContent:"",append(){},appendChild(){},remove(){if(this.id)nodes.delete(this.id);}};},
  getElementById(id){if(id==="story-scene-presentation-layer")return layer;return nodes.get(id)||null;}
};
const context={
  console,WeakSet,Object,String,Array,Map,Set,JSON,
  document,MutationObserver:undefined,
  SC_ALPHA_ORIGIN_32900:{sceneByVariant:{academy_kakashi:"origin_academy_kakashi_anbu_retrieval"}},
  getActiveStorySceneRuntime:()=>({sceneId:"origin_academy_kakashi_anbu_retrieval"}),
  advanceStoryScene:()=>{advanceCalls+=1;return{success:true};}
};
context.globalThis=context;context.window=context;
vm.createContext(context);
vm.runInContext(compat,context,{filename:compatPath});
assert.strictEqual(typeof stageClick,"function","33920 must bind the live Story stage");

const plainTarget={closest:()=>null};
stageClick({defaultPrevented:false,target:plainTarget,preventDefault(){}});
assert.strictEqual(advanceCalls,1,"plain dialogue-stage click must advance exactly once");

const controlTarget={closest:()=>({tagName:"BUTTON"})};
stageClick({defaultPrevented:false,target:controlTarget,preventDefault(){}});
assert.strictEqual(advanceCalls,1,"interactive control click must not trigger stage-wide advance");

layer.dataset.scBoardUiMode="decision";
stageClick({defaultPrevented:false,target:plainTarget,preventDefault(){}});
assert.strictEqual(advanceCalls,1,"decision mode must not trigger click-anywhere progression");

layer.dataset.scBoardUiMode="performance_narration";
stageClick({defaultPrevented:false,target:plainTarget,preventDefault(){}});
assert.strictEqual(advanceCalls,2,"performance narration must share click-anywhere progression");

const diag=context.runAcademyKakashiStoryPresentationCompat33920Diagnostics();
assert.strictEqual(diag.pass,true,`33920 diagnostics failed: ${(diag.failed||[]).join(", ")}`);
assert.strictEqual(diag.compatibilityShim,true,"diagnostics must preserve explicit shim classification");
assert.strictEqual(diag.retireAfterBrowserAcceptance,true,"diagnostics must preserve retirement condition");
assert.strictEqual(diag.browserGoldenClaimed,false,"browser Golden must remain unclaimed");

console.log(JSON.stringify({
  pass:true,
  patch:"33920-v3",
  redundantArrowRemoved:true,
  instructionPlateReadable:true,
  dialogueCentralStack:true,
  dialoguePersistsDuringNarration:true,
  duplicateNativePerformanceSurfaceSuppressed:true,
  clickAnywhereDialogueAndNarration:true,
  controlsProtected:true,
  sceneBoardParentCacheIdentityAdvanced:true,
  compatibilityShim:true,
  retireAfterBrowserAcceptance:true,
  browserGoldenClaimed:false
},null,2));