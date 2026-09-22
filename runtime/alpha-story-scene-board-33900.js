// ============================================================================
// ISSUE #105 / #175 — REUSABLE STORY SCENE BOARD + CINEMATIC PERFORMANCE — 33900
//
// Presentation-only bridge over the existing Story runtime. Story beats remain
// semantic authority. Performance cues own cinematic delivery inside one mounted
// scene and never create World Truth or Chronicle facts.
// ============================================================================
(function installStorySceneBoard33900(){
"use strict";
if(globalThis.SC_STORY_SCENE_BOARD_33900)return;

const PATCH_ID="story_scene_board_33900_2026_09_22_deterministic_slots";
const STYLE_ID="sc-story-scene-board-33900-style";
const PERFORMANCE_KEY="__storyPerformanceCursor33900";
const registry=new Map();
let rendering=false,observer=null,transitioning=false;

function escapeHTML(value){
  if(typeof escapeStorySceneHTML==="function")return escapeStorySceneHTML(String(value??""));
  return String(value??"").replace(/[&<>\"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function clone(value){
  if(typeof cloneProgressionData==="function")return cloneProgressionData(value);
  if(value===undefined)return undefined;
  try{return JSON.parse(JSON.stringify(value));}catch(_error){return value;}
}
function currentRuntime(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function sceneDefinition(runtime=currentRuntime()){
  if(!runtime||typeof getStorySceneDefinition!=="function")return null;
  try{return getStorySceneDefinition(runtime.sceneId)||null;}catch(_error){return null;}
}
function currentBeat(runtime=currentRuntime()){
  const def=sceneDefinition(runtime);
  if(!runtime||!def)return null;
  try{return def.beatMap instanceof Map?def.beatMap.get(runtime.beatId)||null:null;}catch(_error){return null;}
}
function registerStorySceneBoardDefinition(sceneId,definition){
  if(!sceneId||!definition||typeof definition!=="object")return{success:false,reason:"story_scene_board_definition_required"};
  registry.set(String(sceneId),definition);return{success:true,sceneId:String(sceneId)};
}
function unregisterStorySceneBoardDefinition(sceneId){return registry.delete(String(sceneId||""));}
function boardDefinition(sceneId){return registry.get(String(sceneId||""))||null;}
function performanceSequenceFor(runtime=currentRuntime(),beat=currentBeat(runtime)){
  if(!runtime||!beat)return null;
  const def=boardDefinition(runtime.sceneId),source=def&&def.performanceSequences;
  if(!source)return null;
  let seq=source[beat.beatId];
  if(typeof seq==="function")seq=seq({runtime,beat,context:runtime.localContext||{}});
  return Array.isArray(seq)&&seq.length?seq:null;
}
function performanceCursor(runtime=currentRuntime(),beat=currentBeat(runtime)){
  const seq=performanceSequenceFor(runtime,beat);
  if(!seq)return null;
  const row=runtime.localContext&&runtime.localContext[PERFORMANCE_KEY];
  const index=row&&row.beatId===beat.beatId&&Number.isInteger(row.index)?Math.max(0,Math.min(seq.length-1,row.index)):0;
  return{sequence:seq,index,cue:seq[index],atEnd:index>=seq.length-1};
}
function persistPerformanceCursor(runtime,beat,index){
  if(!runtime||!beat)return;
  if(!runtime.localContext||typeof runtime.localContext!=="object")runtime.localContext={};
  runtime.localContext[PERFORMANCE_KEY]={beatId:beat.beatId,index};
  try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
}
function clearPerformanceCursor(runtime){
  if(runtime&&runtime.localContext&&Object.prototype.hasOwnProperty.call(runtime.localContext,PERFORMANCE_KEY))delete runtime.localContext[PERFORMANCE_KEY];
}
function resolveStorySceneBoardProjection(sceneId,beatId,runtime=currentRuntime()){
  const definition=boardDefinition(sceneId);if(!definition)return null;
  const beat=currentBeat(runtime),context=runtime&&runtime.localContext&&typeof runtime.localContext==="object"?runtime.localContext:{};
  const performance=performanceCursor(runtime,beat);
  const state={sceneId,beatId,runtime,beat,context,performance};
  let projection=null;
  if(typeof definition.resolve==="function")projection=definition.resolve(state);
  else if(definition.beats&&definition.beats[beatId]){const row=definition.beats[beatId];projection=typeof row==="function"?row(state):row;}
  return projection?{sceneId,beatId,...clone(projection)}:null;
}
function getActiveStorySceneBoardProjection(){const runtime=currentRuntime();return runtime?resolveStorySceneBoardProjection(runtime.sceneId,runtime.beatId,runtime):null;}

function requestedAssetIdFromBeat(beat){const ref=beat&&beat.environmentRef;return typeof ref==="string"?ref:ref&&typeof ref==="object"&&ref.assetId?String(ref.assetId):null;}
function resolveBoardBackdropPath(runtime=currentRuntime(),beat=currentBeat(runtime)){
  const def=sceneDefinition(runtime);
  try{if(typeof resolveStorySceneEnvironmentProjection==="function"){const r=resolveStorySceneEnvironmentProjection({},beat,def,runtime);if(r&&r.mode==="dedicated_backdrop"&&r.asset_path)return String(r.asset_path);}}catch(_error){}
  const assetId=requestedAssetIdFromBeat(beat);if(!assetId)return null;
  try{const getPath=typeof getSceneBackdropAssetPath==="function"?getSceneBackdropAssetPath:globalThis.getSceneBackdropAssetPath;const path=typeof getPath==="function"?getPath(assetId):null;return path?String(path):null;}catch(_error){return null;}
}
function cssUrlValue(path){return `url("${String(path).replace(/\\/g,"\\\\").replace(/\"/g,'\\\"')}")`;}
function applyBoardBackdrop(stage,runtime=currentRuntime()){
  if(!stage||!stage.style)return null;const path=resolveBoardBackdropPath(runtime,currentBeat(runtime));
  if(path){if(stage.dataset)stage.dataset.scSceneBoardBackdrop="dedicated";stage.style.setProperty("--sc-scene-board-backdrop",cssUrlValue(path));return path;}
  if(stage.dataset)delete stage.dataset.scSceneBoardBackdrop;stage.style.removeProperty("--sc-scene-board-backdrop");return null;
}

function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
#story-scene-presentation-layer[data-sc-scene-board="true"]{background:transparent!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-environment{z-index:0!important;filter:saturate(1.04) brightness(.94);}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-environment-scrim{z-index:1!important;background:linear-gradient(180deg,rgba(2,5,8,.02),rgba(2,5,8,.06) 48%,rgba(2,5,8,.50) 84%,rgba(2,5,8,.76))!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-stage{width:min(100vw,calc(100vh * 1.7777778))!important;max-width:none!important;aspect-ratio:16/9!important;overflow:hidden;z-index:2!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-stage.is-master-art-off{background:transparent!important;box-shadow:none!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-stage[data-sc-scene-board-backdrop="dedicated"]{background-image:linear-gradient(180deg,rgba(2,5,8,.02),rgba(2,5,8,.05) 50%,rgba(2,5,8,.42) 82%,rgba(2,5,8,.70)),var(--sc-scene-board-backdrop)!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-master-frame{display:none!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-layout{position:relative;z-index:5;width:min(94%,1180px)!important;min-height:0!important;margin:0 0 1.2%!important;display:grid!important;grid-template-columns:1fr!important;gap:8px!important;padding:0!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-context{display:none!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-panel{min-height:0!important;max-height:31vh;padding:13px 18px 12px!important;border:1px solid rgba(205,169,83,.62)!important;background:linear-gradient(180deg,rgba(3,9,14,.76),rgba(2,7,11,.91))!important;backdrop-filter:blur(4px);box-shadow:0 18px 45px rgba(0,0,0,.42)!important;overflow:auto!important;cursor:pointer;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-portrait{display:none!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-text{margin-top:6px!important;font-size:clamp(13px,1.05vw,17px)!important;line-height:1.42!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-name{font-size:11px!important;margin:0 0 2px!important;color:#e8c86e!important;font-weight:900!important;letter-spacing:.12em!important;text-transform:uppercase!important;line-height:1.15!important;}
#story-scene-presentation-layer[data-sc-performance="true"] .sc-chronicle-primary{width:34px!important;height:30px!important;min-height:0!important;padding:0!important;font-size:20px!important;line-height:1!important;float:right;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-actions{margin-top:9px!important;gap:7px!important;}
#story-scene-presentation-layer[data-sc-performance="true"][data-sc-performance-complete="false"] .sc-chronicle-actions{display:none!important;}
#story-scene-presentation-layer[data-sc-hide-unavailable-choices="true"] .sc-story-choice:disabled{display:none!important;}
#story-scene-presentation-layer[data-sc-receipt-mode="true"] .sc-chronicle-layout{display:none!important;}
#story-scene-presentation-layer[data-sc-scene-mode="encounter"] .sc-chronicle-actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));}
#story-scene-presentation-layer[data-sc-scene-mode="encounter"] .sc-story-choice{min-height:42px;align-items:center;background:linear-gradient(180deg,rgba(14,24,30,.91),rgba(7,14,19,.94))!important;border-color:rgba(207,169,76,.68)!important;}
.sc-scene-board-33900{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;}
.sc-scene-board-33900__top{position:absolute;left:3.2%;right:3.2%;top:3.8%;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}
.sc-scene-board-33900__location,.sc-scene-board-33900__objective,.sc-scene-board-33900__receipt{padding:7px 10px;border:1px solid rgba(199,164,77,.52);background:rgba(3,9,14,.68);box-shadow:0 8px 22px rgba(0,0,0,.28);text-shadow:0 1px 2px #000;backdrop-filter:blur(3px);}
.sc-scene-board-33900__location{color:#e7cf82;font-size:9px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;}
.sc-scene-board-33900__objective{max-width:48%;color:#f0eadc;font-size:10px;line-height:1.35;text-align:right;}.sc-scene-board-33900__objective b{display:block;color:#71dce4;font-size:8px;letter-spacing:.14em;margin-bottom:3px;}
.sc-scene-board-33900__actors{position:absolute;left:4%;right:4%;top:13%;bottom:26%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:end;gap:3%;}
.sc-scene-board-33900__actors[data-count="1"]{grid-template-columns:minmax(0,300px);justify-content:start;padding-left:4%;}
.sc-scene-board-33900__actors[data-count="2"]{grid-template-columns:repeat(2,minmax(0,270px));justify-content:center;column-gap:clamp(80px,14vw,240px);}
.sc-scene-board-33900__actors[data-layout="slots"]{display:block;left:3.2%;right:3.2%;top:13%;bottom:25%;padding:0;}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor{position:absolute;width:min(21%,238px);height:min(100%,390px);max-height:none;bottom:0;}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="left"]{left:5%;}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="center-left"]{left:24%;}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="center"]{left:50%;transform:translateX(-50%) translateY(4px) scale(.95);}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="center"].is-focus{transform:translateX(-50%) translateY(0) scale(1);}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="center-right"]{right:24%;}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="right"]{right:5%;}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="upper-left"]{left:10%;bottom:16%;width:min(18%,205px);}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="upper-center"]{left:50%;bottom:16%;width:min(18%,205px);transform:translateX(-50%) translateY(4px) scale(.95);}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="upper-center"].is-focus{transform:translateX(-50%) translateY(0) scale(1);}
.sc-scene-board-33900__actors[data-layout="slots"] .sc-scene-board-33900__actor[data-slot="upper-right"]{right:10%;bottom:16%;width:min(18%,205px);}
.sc-scene-board-33900__actor[data-scale="small"]{width:min(17%,190px)!important;}
.sc-scene-board-33900__actor[data-scale="large"]{width:min(24%,270px)!important;}
.sc-scene-board-33900__actor[data-motion="enter-left"]{animation:scActorEnterLeft33900 .42s cubic-bezier(.2,.75,.25,1) both;}
.sc-scene-board-33900__actor[data-motion="enter-right"]{animation:scActorEnterRight33900 .42s cubic-bezier(.2,.75,.25,1) both;}
.sc-scene-board-33900__actor[data-motion="fall"]{animation:scActorFall33900 .48s cubic-bezier(.55,.05,.75,.35) both;}
@keyframes scActorEnterLeft33900{from{opacity:0;transform:translateX(-70px) scale(.96)}to{opacity:.72;transform:translateX(0) scale(.95)}}
@keyframes scActorEnterRight33900{from{opacity:0;transform:translateX(70px) scale(.96)}to{opacity:.72;transform:translateX(0) scale(.95)}}
@keyframes scActorFall33900{from{opacity:1;transform:translateY(0) rotate(0deg)}to{opacity:0;transform:translateY(110%) rotate(7deg)}}
.sc-scene-board-33900__actor{position:relative;justify-self:center;width:min(74%,238px);aspect-ratio:7/10;max-height:390px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;opacity:.72;transform:translateY(4px) scale(.95);filter:saturate(.78) brightness(.88);}
.sc-scene-board-33900__actor.is-focus{opacity:1;transform:translateY(0) scale(1);filter:none;}
.sc-scene-board-33900__actor-frame{position:absolute;inset:0;border:1px solid rgba(194,158,73,.38);background:linear-gradient(180deg,rgba(7,13,17,.03),rgba(3,7,10,.12) 65%,rgba(3,7,10,.72));box-shadow:0 16px 34px rgba(0,0,0,.30);}
.sc-scene-board-33900__actor.is-focus .sc-scene-board-33900__actor-frame{border-color:rgba(97,220,229,.78);box-shadow:0 0 0 1px rgba(97,220,229,.15),0 18px 38px rgba(0,0,0,.38);}
.sc-scene-board-33900__actor img{position:relative;z-index:1;width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 12px 14px rgba(0,0,0,.52));}
.sc-scene-board-33900__actor.is-entering{animation:scActorEnter33900 .46s cubic-bezier(.2,.75,.25,1) both;}
@keyframes scActorEnter33900{from{opacity:0;transform:translateX(44px) scale(.96);filter:brightness(.35) blur(2px)}to{opacity:.72;transform:translateX(0) scale(.95);filter:saturate(.78) brightness(.88)}}
.sc-scene-board-33900__actor.is-entering.is-focus{animation-name:scActorEnterFocus33900}@keyframes scActorEnterFocus33900{from{opacity:0;transform:translateX(44px) scale(.97)}to{opacity:1;transform:translateX(0) scale(1)}}
.sc-scene-board-33900__actor-silhouette{position:relative;z-index:1;width:58%;height:78%;margin-bottom:24px;border-radius:46% 46% 18% 18%;background:radial-gradient(circle at 50% 18%,rgba(177,191,194,.38) 0 14%,transparent 15%),linear-gradient(180deg,transparent 0 24%,rgba(81,95,101,.38) 25% 100%);filter:blur(.2px);}
.sc-scene-board-33900__actor-tag{position:absolute;z-index:3;left:7%;right:7%;bottom:4%;padding:6px 8px;background:rgba(2,7,10,.84);border:1px solid rgba(194,158,73,.48);text-align:center;backdrop-filter:blur(2px);}.sc-scene-board-33900__actor-tag strong{display:block;color:#efe6cf;font-size:10px;letter-spacing:.1em}.sc-scene-board-33900__actor-tag small{display:table;color:#77dfe7;font-size:8px;font-weight:900;letter-spacing:.07em;margin:4px auto 0;padding:2px 6px;line-height:1.25;border:1px solid rgba(104,219,229,.32);background:rgba(2,17,22,.78);box-shadow:0 0 14px rgba(80,216,228,.09);text-shadow:0 0 8px rgba(93,223,233,.22)}.sc-scene-board-33900__actor.is-focus .sc-scene-board-33900__actor-tag small{color:#f0cf78;border-color:rgba(220,177,77,.54);background:rgba(24,17,5,.72);box-shadow:0 0 16px rgba(220,177,77,.13);text-shadow:0 0 8px rgba(235,199,98,.24)}
/* Live State Callouts: persistent scene-level facts belong in the HUD, not on actor nameplates. */
.sc-scene-board-33900__objects{position:absolute;left:3.2%;right:auto;top:13.5%;bottom:auto;width:max-content;max-width:min(31%,390px);height:auto!important;min-height:0!important;max-height:none!important;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:6px;z-index:7}.sc-scene-board-33900__object{position:relative;display:inline-block;box-sizing:border-box;width:auto;max-width:100%;height:auto!important;min-height:0!important;max-height:none!important;align-self:flex-start;flex:0 0 auto;padding:7px 11px 7px 13px;line-height:1.25;white-space:normal;border:1px solid rgba(214,175,76,.64);background:linear-gradient(120deg,rgba(3,15,21,.93),rgba(12,12,9,.88));font-size:9px;font-weight:800;letter-spacing:.07em;color:#e8ddc4;backdrop-filter:blur(5px);box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 0 1px rgba(98,220,229,.08),0 0 20px rgba(90,214,224,.08)}.sc-scene-board-33900__object::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#76e2e8,#dcb14d)}.sc-scene-board-33900__object b{display:block;color:#76e2e8;margin:0 0 3px;font-size:8px;letter-spacing:.15em;text-transform:uppercase}.sc-scene-board-33900__object.is-committed{border-color:rgba(220,177,77,.78);box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 18px rgba(220,177,77,.14)}
.sc-scene-board-33900__reaction{position:absolute;left:50%;top:12.5%;transform:translateX(-50%);max-width:64%;padding:8px 12px;border:1px solid rgba(102,212,188,.62);background:rgba(3,12,14,.78);color:#d9f1e9;font-size:9px;font-weight:800;letter-spacing:.05em;text-align:center;box-shadow:0 10px 28px rgba(0,0,0,.35)}
.sc-scene-board-33900__receipt{position:absolute;right:3.2%;top:12.5%;border-color:rgba(93,205,162,.62);color:#bfead8;font-size:8px;font-weight:900;letter-spacing:.1em;}
.sc-scene-board-33900__terminal-receipt{position:absolute;z-index:40;left:50%;top:50%;width:min(78%,920px);max-height:78%;transform:translate(-50%,-50%);overflow:auto;pointer-events:auto;padding:22px 26px;border:1px solid rgba(208,173,83,.74);background:linear-gradient(155deg,rgba(3,11,16,.97),rgba(2,6,9,.985));box-shadow:0 28px 90px rgba(0,0,0,.72);}
.sc-scene-board-33900__terminal-receipt>span{display:block;color:#62dce5;font-size:9px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;}
.sc-scene-board-33900__terminal-receipt h2{margin:7px 0 16px;color:#ead39a;font:900 clamp(22px,2.4vw,38px)/1 Georgia,serif;letter-spacing:.05em;}
.sc-scene-board-33900__terminal-receipt section{padding:9px 0;border-top:1px solid rgba(255,255,255,.07);}
.sc-scene-board-33900__terminal-receipt section b{display:block;color:#d7b55d;font-size:8px;letter-spacing:.13em;margin-bottom:4px;}
.sc-scene-board-33900__terminal-receipt section p{margin:3px 0;color:#d8dfdd;font-size:11px;line-height:1.42;}
.sc-scene-board-33900__terminal-receipt button{margin-top:16px;min-width:150px;padding:10px 14px;border:1px solid rgba(88,217,228,.55);background:rgba(9,45,53,.72);color:#91ebf0;font-weight:900;letter-spacing:.1em;cursor:pointer;}
.sc-scene-board-wipe-33900{position:absolute;inset:0;z-index:9999;background:#000;transform:translateX(100%);pointer-events:auto;transition:transform .28s cubic-bezier(.7,0,.3,1)}.sc-scene-board-wipe-33900.is-covering{transform:translateX(0)}.sc-scene-board-wipe-33900.is-revealing{transform:translateX(-100%)}
@media(prefers-reduced-motion:reduce){.sc-scene-board-33900__actor.is-entering{animation:none!important}.sc-scene-board-wipe-33900{transition:none!important}}
@media(max-width:820px){.sc-scene-board-33900__actors{left:1.5%;right:1.5%;gap:1%;bottom:31%}.sc-scene-board-33900__actors[data-count="2"]{column-gap:20px}.sc-scene-board-33900__actor{width:90%;max-height:290px}.sc-scene-board-33900__objective{max-width:58%;font-size:8px}#story-scene-presentation-layer[data-sc-scene-mode="encounter"] .sc-chronicle-actions{grid-template-columns:1fr}}
`;
  document.head.appendChild(style);return true;
}
function actorMarkup(actor){
  const image=actor.image?`<img src="${escapeHTML(actor.image)}" alt="">`:`<div class="sc-scene-board-33900__actor-silhouette" aria-hidden="true"></div>`;
  return `<figure class="sc-scene-board-33900__actor ${actor.focus?"is-focus":""} ${actor.entering?"is-entering":""}" data-actor-id="${escapeHTML(actor.id||"")}" data-slot="${escapeHTML(actor.slot||"")}" data-scale="${escapeHTML(actor.scale||"")}" data-motion="${escapeHTML(actor.motion||"")}"><div class="sc-scene-board-33900__actor-frame"></div>${image}<figcaption class="sc-scene-board-33900__actor-tag"><strong>${escapeHTML(actor.label||"UNKNOWN")}</strong>${actor.state?`<small>${escapeHTML(actor.state)}</small>`:""}</figcaption></figure>`;
}
function terminalReceiptMarkup(receipt){
  if(!receipt||typeof receipt!=="object")return "";
  const sections=Array.isArray(receipt.sections)?receipt.sections:[];
  return `<article class="sc-scene-board-33900__terminal-receipt"><span>${escapeHTML(receipt.kicker||"CHRONICLE RECEIPT")}</span><h2>${escapeHTML(receipt.title||"ACADEMY KAKASHI")}</h2>${sections.map(section=>`<section><b>${escapeHTML(section.label||"RECORD")}</b>${(Array.isArray(section.lines)?section.lines:[section.text]).filter(Boolean).map(line=>`<p>${escapeHTML(line)}</p>`).join("")}</section>`).join("")}<button type="button" onclick="advanceStoryScene()">CONTINUE</button></article>`;
}
function boardMarkup(projection){
  const actors=Array.isArray(projection.actors)?projection.actors.slice(0,6):[];
  const objects=(projection.objects||[]).map(row=>`<span class="sc-scene-board-33900__object sc-live-state-callout-33900${row&&row.committed?" is-committed":""}"><b>${escapeHTML(row.label||"OBJECT")}</b>${escapeHTML(row.state||"")}</span>`).join("");
  return `<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">${escapeHTML(projection.location||"STORY SCENE")}</div>${projection.objective?`<div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(projection.objective)}</div>`:""}</div>${projection.reaction?`<div class="sc-scene-board-33900__reaction">${escapeHTML(projection.reaction)}</div>`:""}${projection.committed?`<div class="sc-scene-board-33900__receipt">CHRONICLE FACT COMMITTED</div>`:""}<div class="sc-scene-board-33900__actors" data-count="${actors.length}" data-layout="${escapeHTML(projection.layout||"grid")}">${actors.map(actorMarkup).join("")}</div>${objects?`<div class="sc-scene-board-33900__objects sc-live-state-callouts-33900">${objects}</div>`:""}${terminalReceiptMarkup(projection.terminalReceipt)}`;
}
function clearBoard(layer){if(!layer)return;try{delete layer.dataset.scSceneBoard;delete layer.dataset.scSceneMode;delete layer.dataset.scPerformance;delete layer.dataset.scPerformanceComplete;delete layer.dataset.scHideUnavailableChoices;delete layer.dataset.scReceiptMode;}catch(_error){};for(const node of layer.querySelectorAll?layer.querySelectorAll(".sc-scene-board-33900"):[])if(node&&typeof node.remove==="function")node.remove();}
function updatePerformancePanel(layer,runtime=currentRuntime()){
  if(!layer||!runtime)return false;
  const beat=currentBeat(runtime),p=performanceCursor(runtime,beat);
  if(beat&&beat.uiHints&&beat.uiHints.hideUnavailableChoices===true)layer.dataset.scHideUnavailableChoices="true";else delete layer.dataset.scHideUnavailableChoices;
  if(!p){delete layer.dataset.scPerformance;delete layer.dataset.scPerformanceComplete;return false;}
  layer.dataset.scPerformance="true";layer.dataset.scPerformanceComplete=p.atEnd?"true":"false";
  const cue=p.cue||{};
  const text=layer.querySelector&&layer.querySelector(".sc-story-text");const cueText=String(cue.text||"");if(text&&text.textContent!==cueText)text.textContent=cueText;
  const panel=layer.querySelector&&layer.querySelector(".sc-story-panel");
  let name=layer.querySelector&&layer.querySelector(".sc-story-name");
  const dialogueSpeaker=cue.kind==="dialogue"?String(cue.speakerName||cue.speaker||""):"";
  const speakerLabel=dialogueSpeaker||(cue.kind==="record"?"SHINOBI RECORD":"NARRATION");
  if(!name&&panel){name=document.createElement("div");name.className="sc-story-name sc-performance-name-33900";}
  if(name&&panel&&!panel.contains(name)){const t=panel.querySelector(".sc-story-text");panel.insertBefore(name,t||null);}
  if(name){if(name.textContent!==speakerLabel)name.textContent=speakerLabel;name.style.display="block";}
  const kicker=layer.querySelector&&layer.querySelector(".sc-story-kicker");const kickerText=String(cue.kind||"narration").toUpperCase();if(kicker&&kicker.textContent!==kickerText)kicker.textContent=kickerText;
  const primary=layer.querySelector&&layer.querySelector(".sc-chronicle-primary");if(primary){if(primary.textContent!=="›")primary.textContent="›";primary.setAttribute("aria-label","Advance scene");primary.title="Advance scene";}
  return true;
}
function renderStorySceneBoard33900(){
  if(rendering||typeof document==="undefined")return false;const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const runtime=currentRuntime(),projection=runtime?resolveStorySceneBoardProjection(runtime.sceneId,runtime.beatId,runtime):null;if(!projection){clearBoard(layer);return false;}
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  rendering=true;try{installStyle();layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode=projection.mode||"conversation";if(projection.terminalReceipt)layer.dataset.scReceiptMode="true";else delete layer.dataset.scReceiptMode;applyBoardBackdrop(stage,runtime);let board=stage.querySelector?stage.querySelector(".sc-scene-board-33900"):null;if(!board){board=document.createElement("section");board.className="sc-scene-board-33900";board.setAttribute("aria-hidden","true");stage.appendChild(board);}const signature=projection.renderKey?String(projection.renderKey):JSON.stringify(projection);if(board.dataset&&board.dataset.signature!==signature){board.innerHTML=boardMarkup(projection);board.dataset.signature=signature;}updatePerformancePanel(layer,runtime);return true;}finally{rendering=false;}
}
function scheduleBoardRender(){if(typeof queueMicrotask==="function")queueMicrotask(renderStorySceneBoard33900);else if(typeof setTimeout==="function")setTimeout(renderStorySceneBoard33900,0);}

const PRE_RENDER=typeof renderStoryScenePresentationLayer==="function"?renderStoryScenePresentationLayer:null;
if(PRE_RENDER){globalThis.renderStoryScenePresentationLayer=function storySceneBoard33900RenderWrapper(){const result=PRE_RENDER.apply(this,arguments);renderStorySceneBoard33900();return result;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}}

function reducedMotion(){try{return typeof matchMedia==="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(_error){return false;}}
function performSceneCut(next){
  if(typeof next!=="function")return{success:false,reason:"scene_cut_continuation_missing"};
  if(typeof document==="undefined"||reducedMotion())return next();
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return next();
  if(transitioning)return{success:false,reason:"story_scene_transition_in_progress"};transitioning=true;
  const wipe=document.createElement("div");wipe.className="sc-scene-board-wipe-33900";layer.appendChild(wipe);
  requestAnimationFrame(()=>wipe.classList.add("is-covering"));
  setTimeout(()=>{try{next();}finally{wipe.classList.remove("is-covering");wipe.classList.add("is-revealing");setTimeout(()=>{wipe.remove();transitioning=false;},320);}},290);
  return{success:true,type:"story_scene_cinematic_cut",pending:true};
}
const PRE_ADVANCE=typeof advanceStoryScene==="function"?advanceStoryScene:null;
function advanceStoryScene33900(choiceId=null){
  if(!PRE_ADVANCE)return{success:false,reason:"story_advance_authority_missing"};
  if(choiceId!==null&&choiceId!==undefined)return PRE_ADVANCE.apply(this,arguments);
  const runtime=currentRuntime(),beat=currentBeat(runtime),p=performanceCursor(runtime,beat);
  if(!runtime||!beat||!p)return PRE_ADVANCE.apply(this,arguments);
  if(transitioning)return{success:false,reason:"story_scene_transition_in_progress"};
  if(!p.atEnd){persistPerformanceCursor(runtime,beat,p.index+1);renderStorySceneBoard33900();return{success:true,type:"story_performance_cue_advanced",beatId:beat.beatId,cueIndex:p.index+1,semanticBeatUnchanged:true};}
  clearPerformanceCursor(runtime);
  const def=boardDefinition(runtime.sceneId),transition=def&&def.performanceTransitions&&def.performanceTransitions[beat.beatId];
  if(transition==="wipe_right_to_left")return performSceneCut(()=>PRE_ADVANCE.call(this));
  return PRE_ADVANCE.apply(this,arguments);
}
if(PRE_ADVANCE){globalThis.advanceStoryScene=advanceStoryScene33900;try{advanceStoryScene=advanceStoryScene33900;}catch(_error){}}

if(typeof document!=="undefined"){
  document.addEventListener("click",event=>{const panel=event.target&&event.target.closest?event.target.closest("#story-scene-presentation-layer[data-sc-performance='true'] .sc-story-panel"):null;if(!panel||event.target.closest("button,a,input,select,textarea"))return;event.preventDefault();advanceStoryScene33900();});
  document.addEventListener("keydown",event=>{if(event.defaultPrevented||!(event.key==="Enter"||event.key===" "))return;const tag=String(event.target&&event.target.tagName||"").toLowerCase();if(["input","textarea","select","button","a"].includes(tag))return;const runtime=currentRuntime(),p=performanceCursor(runtime,currentBeat(runtime));if(!p)return;event.preventDefault();advanceStoryScene33900();});
  if(typeof MutationObserver==="function"){const target=document.getElementById("story-scene-presentation-layer")||document.body;if(target){observer=new MutationObserver(()=>scheduleBoardRender());observer.observe(target,{childList:true,subtree:true});}}
}

// Origin-specific board definitions are registered by their own consumers.
// The generic Scene Board must not embed Origin-specific actors, cues, routes or assets.

function runStorySceneBoard33900Diagnostics(){
  const checks={
    patchId:PATCH_ID==="story_scene_board_33900_2026_09_22_deterministic_slots",
    compactLiveStateCallout:installStyle.toString().includes("width:max-content")&&installStyle.toString().includes("height:auto!important")&&installStyle.toString().includes("align-items:flex-start")&&installStyle.toString().includes("left:3.2%;right:auto"),
    reusableRegistry:typeof registerStorySceneBoardDefinition==="function"&&typeof unregisterStorySceneBoardDefinition==="function"&&typeof resolveStorySceneBoardProjection==="function",
    genericPerformanceLifecycle:typeof performanceSequenceFor==="function"&&typeof advanceStoryScene33900==="function"&&typeof performSceneCut==="function",
    performanceAdvanceCommitsNoOccurrence:advanceStoryScene33900.toString().includes("performanceCursor")&&!advanceStoryScene33900.toString().includes("commitOccurrence"),
    deterministicRenderKey:renderStorySceneBoard33900.toString().includes("projection.renderKey"),
    namedSlotLayout:actorMarkup.toString().includes("data-slot")&&boardMarkup.toString().includes("projection.layout"),
    performanceDefersActions:updatePerformancePanel.toString().includes("scPerformanceComplete"),
    unavailableChoiceSuppression:updatePerformancePanel.toString().includes("hideUnavailableChoices"),
    terminalReceiptOwnsSurface:boardMarkup.toString().includes("terminalReceiptMarkup")&&installStyle.toString().includes("data-sc-receipt-mode"),
    wrapsExistingStoryRenderer:!!PRE_RENDER,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.registerStorySceneBoardDefinition=registerStorySceneBoardDefinition;
globalThis.unregisterStorySceneBoardDefinition=unregisterStorySceneBoardDefinition;
globalThis.resolveStorySceneBoardProjection=resolveStorySceneBoardProjection;
globalThis.getActiveStorySceneBoardProjection=getActiveStorySceneBoardProjection;
globalThis.resolveStorySceneBoardBackdropPath=resolveBoardBackdropPath;
globalThis.renderStorySceneBoard33900=renderStorySceneBoard33900;
globalThis.getStoryScenePerformance33900=()=>performanceCursor(currentRuntime(),currentBeat(currentRuntime()));
globalThis.runStorySceneBoard33900Diagnostics=runStorySceneBoard33900Diagnostics;
globalThis.SC_STORY_SCENE_BOARD_33900=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
try{renderStorySceneBoard33900();}catch(_error){}
})();