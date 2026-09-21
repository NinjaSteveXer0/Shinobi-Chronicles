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

const PATCH_ID="story_scene_board_33900_2026_09_20_multi_actor";
const STYLE_ID="sc-story-scene-board-33900-style";
const PERFORMANCE_KEY="__storyPerformanceCursor33900";
const registry=new Map();
const renderHooks=new Map();
let rendering=false,transitioning=false,lastBackdropSignature33900=null;
const actorIdsByBoard33900=new WeakMap();

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
function registerStorySceneBoardRenderHook(hookId,hook){
  if(!hookId||typeof hook!=="function")return{success:false,reason:"story_scene_board_render_hook_required"};
  renderHooks.set(String(hookId),hook);return{success:true,hookId:String(hookId)};
}
function unregisterStorySceneBoardRenderHook(hookId){return renderHooks.delete(String(hookId||""));}
function runStorySceneBoardRenderHooks(runtime,layer,stage,projection){
  let handled=false;
  for(const [hookId,hook] of renderHooks){
    try{if(hook({hookId,runtime,beat:currentBeat(runtime),layer,stage,projection})===true)handled=true;}catch(error){try{console.error("Story Scene Board render hook failed",hookId,error);}catch(_e){}}
  }
  return handled;
}
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
function backdropSignature33900(runtime=currentRuntime(),beat=currentBeat(runtime)){
  const path=resolveBoardBackdropPath(runtime,beat);if(path)return "path:"+String(path);
  const asset=requestedAssetIdFromBeat(beat);return asset?"asset:"+asset:"";
}
function targetBeat33900(runtime,beat,choiceId=null){
  const def=sceneDefinition(runtime);if(!def||!(def.beatMap instanceof Map)||!beat)return null;
  let nextId=null;
  if(choiceId!==null&&choiceId!==undefined&&Array.isArray(beat.choices)){const row=beat.choices.find(x=>x&&x.choiceId===choiceId);nextId=row&&row.nextBeatId||null;}
  else nextId=beat.nextBeatId||null;
  return nextId?def.beatMap.get(nextId)||null:null;
}
function shouldSceneCut33900(runtime,beat,target,choiceId=null){
  if(!runtime||!beat||!target)return false;
  if(choiceId!==null&&choiceId!==undefined&&Array.isArray(beat.choices)){
    const row=beat.choices.find(x=>x&&x.choiceId===choiceId);
    if(row&&row.presentationTransition==="wipe_right_to_left")return true;
  }
  const from=backdropSignature33900(runtime,beat),to=backdropSignature33900(runtime,target);
  return !!from&&!!to&&from!==to;
}
function installFallbackBackdropCut33900(layer,runtime=currentRuntime(),beat=currentBeat(runtime)){
  const sig=backdropSignature33900(runtime,beat);if(!sig)return false;
  const prior=lastBackdropSignature33900;lastBackdropSignature33900=sig;
  if(!prior||prior===sig||transitioning||typeof document==="undefined"||reducedMotion()||!layer)return false;
  const wipe=document.createElement("div");wipe.className="sc-scene-board-wipe-33900 is-covering";layer.appendChild(wipe);transitioning=true;
  requestAnimationFrame(()=>{wipe.classList.remove("is-covering");wipe.classList.add("is-revealing");setTimeout(()=>{try{wipe.remove();}catch(_e){}transitioning=false;},320);});
  return true;
}
function applyBoardBackdrop(stage,runtime=currentRuntime()){
  if(!stage||!stage.style)return null;
  const path=resolveBoardBackdropPath(runtime,currentBeat(runtime));
  const layer=typeof document!=="undefined"?document.getElementById("story-scene-presentation-layer"):null;
  if(layer&&layer.style){
    if(layer.dataset)layer.dataset.scSceneBoardBackdrop=path?"dedicated":"fallback";
    if(path)layer.style.setProperty("--sc-scene-board-backdrop",cssUrlValue(path));
    else layer.style.removeProperty("--sc-scene-board-backdrop");
  }
  if(path){if(stage.dataset)stage.dataset.scSceneBoardBackdrop="dedicated";stage.style.setProperty("--sc-scene-board-backdrop",cssUrlValue(path));return path;}
  if(stage.dataset)delete stage.dataset.scSceneBoardBackdrop;stage.style.removeProperty("--sc-scene-board-backdrop");return null;
}

function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
#story-scene-presentation-layer[data-sc-scene-board="true"]{background:#020508!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"][data-sc-scene-board-backdrop="dedicated"]{background-image:linear-gradient(180deg,rgba(2,5,8,.02),rgba(2,5,8,.05) 50%,rgba(2,5,8,.42) 82%,rgba(2,5,8,.70)),var(--sc-scene-board-backdrop)!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;}
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
.sc-scene-board-33900__actors[data-count="4"]{grid-template-columns:repeat(4,minmax(0,1fr));gap:1.6%;}
.sc-scene-board-33900__actors[data-count="5"]{grid-template-columns:repeat(5,minmax(0,1fr));gap:1.1%;}
.sc-scene-board-33900__actors[data-count="6"]{grid-template-columns:repeat(6,minmax(0,1fr));gap:.8%;}
.sc-scene-board-33900__actors[data-count="4"] .sc-scene-board-33900__actor{width:min(88%,210px);}
.sc-scene-board-33900__actors[data-count="5"] .sc-scene-board-33900__actor{width:min(92%,184px);}
.sc-scene-board-33900__actors[data-count="6"] .sc-scene-board-33900__actor{width:min(94%,164px);}
.sc-scene-board-33900__actor{position:relative;justify-self:center;width:min(74%,238px);aspect-ratio:7/10;max-height:390px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;opacity:.72;transform:translateY(4px) scale(.95);filter:saturate(.78) brightness(.88);}
.sc-scene-board-33900__actor.is-focus{opacity:1;transform:translateY(0) scale(1);filter:none;}
.sc-scene-board-33900__actor-frame{position:absolute;inset:0;border:1px solid rgba(194,158,73,.38);background:linear-gradient(180deg,rgba(7,13,17,.03),rgba(3,7,10,.12) 65%,rgba(3,7,10,.72));box-shadow:0 16px 34px rgba(0,0,0,.30);}
.sc-scene-board-33900__actor.is-focus .sc-scene-board-33900__actor-frame{border-color:rgba(97,220,229,.78);box-shadow:0 0 0 1px rgba(97,220,229,.15),0 18px 38px rgba(0,0,0,.38);}
.sc-scene-board-33900__actor img{position:relative;z-index:1;width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 12px 14px rgba(0,0,0,.52));}
.sc-scene-board-33900__actor[data-actor-id="academy_kakashi"]{width:min(72%,228px);aspect-ratio:7/10;max-height:330px;}
.sc-scene-board-33900__actor[data-actor-id="konoha_anbu_contact"]{width:min(67%,220px);aspect-ratio:7/10;max-height:350px;}
.sc-scene-board-33900__actor.is-entering{animation:scActorEnter33900 .46s cubic-bezier(.2,.75,.25,1) both;}
@keyframes scActorEnter33900{from{opacity:0;transform:translateX(44px) scale(.96);filter:brightness(.35) blur(2px)}to{opacity:.72;transform:translateX(0) scale(.95);filter:saturate(.78) brightness(.88)}}
.sc-scene-board-33900__actor.is-entering.is-focus{animation-name:scActorEnterFocus33900}@keyframes scActorEnterFocus33900{from{opacity:0;transform:translateX(44px) scale(.97)}to{opacity:1;transform:translateX(0) scale(1)}}
.sc-scene-board-33900__actor.is-exiting{animation:scActorExit33900 .42s cubic-bezier(.55,.05,.8,.35) both;}
@keyframes scActorExit33900{from{opacity:.72;transform:translateX(0) scale(.95)}to{opacity:0;transform:translateX(86px) scale(.92)}}
.sc-scene-board-33900__actor.is-falling{transform-origin:50% 92%;animation:scActorFall33900 .48s cubic-bezier(.45,.02,.75,.36) both;}
@keyframes scActorFall33900{from{opacity:.72;transform:translateY(0) rotate(0deg) scale(.95)}to{opacity:0;transform:translateY(72%) rotate(8deg) scale(.92)}}
.sc-scene-board-33900__actor-silhouette{position:relative;z-index:1;width:58%;height:78%;margin-bottom:24px;border-radius:46% 46% 18% 18%;background:radial-gradient(circle at 50% 18%,rgba(177,191,194,.38) 0 14%,transparent 15%),linear-gradient(180deg,transparent 0 24%,rgba(81,95,101,.38) 25% 100%);filter:blur(.2px);}
.sc-scene-board-33900__actor-tag{position:absolute;z-index:3;left:7%;right:7%;bottom:4%;padding:6px 8px;background:rgba(2,7,10,.84);border:1px solid rgba(194,158,73,.48);text-align:center;backdrop-filter:blur(2px);}.sc-scene-board-33900__actor-tag strong{display:block;color:#efe6cf;font-size:10px;letter-spacing:.1em}.sc-scene-board-33900__actor-tag small{display:table;color:#77dfe7;font-size:8px;font-weight:900;letter-spacing:.07em;margin:4px auto 0;padding:2px 6px;line-height:1.25;border:1px solid rgba(104,219,229,.32);background:rgba(2,17,22,.78);box-shadow:0 0 14px rgba(80,216,228,.09);text-shadow:0 0 8px rgba(93,223,233,.22)}.sc-scene-board-33900__actor.is-focus .sc-scene-board-33900__actor-tag small{color:#f0cf78;border-color:rgba(220,177,77,.54);background:rgba(24,17,5,.72);box-shadow:0 0 16px rgba(220,177,77,.13);text-shadow:0 0 8px rgba(235,199,98,.24)}
/* Live State Callouts: persistent scene-level facts belong in the HUD, not on actor nameplates. */
.sc-scene-board-33900__objects{position:absolute;left:3.2%;right:auto;top:13.5%;bottom:auto;width:max-content;max-width:min(31%,390px);height:auto!important;min-height:0!important;max-height:none!important;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:6px;z-index:7}.sc-scene-board-33900__object{position:relative;display:inline-block;box-sizing:border-box;width:auto;max-width:100%;height:auto!important;min-height:0!important;max-height:none!important;align-self:flex-start;flex:0 0 auto;padding:7px 11px 7px 13px;line-height:1.25;white-space:normal;border:1px solid rgba(214,175,76,.64);background:linear-gradient(120deg,rgba(3,15,21,.93),rgba(12,12,9,.88));font-size:9px;font-weight:800;letter-spacing:.07em;color:#e8ddc4;backdrop-filter:blur(5px);box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 0 1px rgba(98,220,229,.08),0 0 20px rgba(90,214,224,.08)}.sc-scene-board-33900__object::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#76e2e8,#dcb14d)}.sc-scene-board-33900__object b{display:block;color:#76e2e8;margin:0 0 3px;font-size:8px;letter-spacing:.15em;text-transform:uppercase}.sc-scene-board-33900__object.is-committed{border-color:rgba(220,177,77,.78);box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 18px rgba(220,177,77,.14)}
.sc-scene-board-33900__reaction{position:absolute;left:50%;top:12.5%;transform:translateX(-50%);max-width:64%;padding:8px 12px;border:1px solid rgba(102,212,188,.62);background:rgba(3,12,14,.78);color:#d9f1e9;font-size:9px;font-weight:800;letter-spacing:.05em;text-align:center;box-shadow:0 10px 28px rgba(0,0,0,.35)}
.sc-scene-board-33900__receipt{position:absolute;right:3.2%;top:12.5%;border-color:rgba(93,205,162,.62);color:#bfead8;font-size:8px;font-weight:900;letter-spacing:.1em;}
.sc-scene-board-wipe-33900{position:absolute;inset:0;z-index:9999;background:#000;transform:translateX(100%);pointer-events:auto;transition:transform .28s cubic-bezier(.7,0,.3,1)}.sc-scene-board-wipe-33900.is-covering{transform:translateX(0)}.sc-scene-board-wipe-33900.is-revealing{transform:translateX(-100%)}
@media(prefers-reduced-motion:reduce){.sc-scene-board-33900__actor.is-entering,.sc-scene-board-33900__actor.is-exiting,.sc-scene-board-33900__actor.is-falling{animation:none!important}.sc-scene-board-wipe-33900{transition:none!important}}
@media(max-width:820px){.sc-scene-board-33900__actors{left:1.5%;right:1.5%;gap:1%;bottom:31%}.sc-scene-board-33900__actors[data-count="2"]{column-gap:20px}.sc-scene-board-33900__actor{width:90%;max-height:290px}.sc-scene-board-33900__objective{max-width:58%;font-size:8px}#story-scene-presentation-layer[data-sc-scene-mode="encounter"] .sc-chronicle-actions{grid-template-columns:1fr}}
`;
  document.head.appendChild(style);return true;
}
function actorMarkup(actor){
  const image=actor.image?`<img src="${escapeHTML(actor.image)}" alt="">`:`<div class="sc-scene-board-33900__actor-silhouette" aria-hidden="true"></div>`;
  const motion=String(actor&&actor.motion||"").toLowerCase(),motionClass=motion==="exit"?"is-exiting":motion==="fall"?"is-falling":"";
  return `<figure class="sc-scene-board-33900__actor ${actor.focus?"is-focus":""} ${actor.entering&&!motionClass?"is-entering":""} ${motionClass}" data-actor-id="${escapeHTML(actor.id||"")}" data-actor-motion="${escapeHTML(motion)}"><div class="sc-scene-board-33900__actor-frame"></div>${image}<figcaption class="sc-scene-board-33900__actor-tag"><strong>${escapeHTML(actor.label||"UNKNOWN")}</strong>${actor.state?`<small>${escapeHTML(actor.state)}</small>`:""}</figcaption></figure>`;
}
function boardMarkup(projection){
  const actors=Array.isArray(projection.actors)?projection.actors.slice(0,6):[];
  const objects=(projection.objects||[]).map(row=>`<span class="sc-scene-board-33900__object sc-live-state-callout-33900${row&&row.committed?" is-committed":""}"><b>${escapeHTML(row.label||"OBJECT")}</b>${escapeHTML(row.state||"")}</span>`).join("");
  return `<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">${escapeHTML(projection.location||"STORY SCENE")}</div>${projection.objective?`<div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(projection.objective)}</div>`:""}</div>${projection.reaction?`<div class="sc-scene-board-33900__reaction">${escapeHTML(projection.reaction)}</div>`:""}${projection.committed?`<div class="sc-scene-board-33900__receipt">CHRONICLE FACT COMMITTED</div>`:""}<div class="sc-scene-board-33900__actors" data-count="${actors.length}">${actors.map(actorMarkup).join("")}</div>${objects?`<div class="sc-scene-board-33900__objects sc-live-state-callouts-33900">${objects}</div>`:""}`;
}
function hasExplicitActorMotion33900(node){
  if(!node||!node.classList)return false;
  if(node.classList.contains("is-entering")||node.classList.contains("is-exiting")||node.classList.contains("is-falling"))return true;
  for(const name of Array.from(node.classList)){if(name==="sc-scene-board-33900__actor"||name==="is-focus")continue;if(/^sc-(?:watch|kakashi|w2c|postmi)-/.test(name))return true;}
  return false;
}
function syncAutomaticActorEntrances33900(stage){
  if(!stage||typeof stage.querySelectorAll!=="function")return false;
  let changed=false;
  for(const lane of Array.from(stage.querySelectorAll(".sc-scene-board-33900__actors"))){
    const owner=lane.closest&&lane.closest("section")||lane,prior=actorIdsByBoard33900.get(owner)||new Set(),current=new Set();
    for(const node of Array.from(lane.querySelectorAll(".sc-scene-board-33900__actor"))){
      const id=String(node&&node.dataset&&node.dataset.actorId||"");if(!id)continue;current.add(id);
      if(!prior.has(id)&&!hasExplicitActorMotion33900(node)){node.classList.add("is-entering");changed=true;}
    }
    actorIdsByBoard33900.set(owner,current);
  }
  return changed;
}
function clearBoard(layer){if(!layer)return;try{delete layer.dataset.scSceneBoard;delete layer.dataset.scSceneMode;delete layer.dataset.scPerformance;delete layer.dataset.scSceneBoardBackdrop;}catch(_error){};try{if(layer.style)layer.style.removeProperty("--sc-scene-board-backdrop");}catch(_error){};for(const node of layer.querySelectorAll?layer.querySelectorAll(".sc-scene-board-33900"):[])if(node&&typeof node.remove==="function")node.remove();}
function updatePerformancePanel(layer,runtime=currentRuntime()){
  if(!layer||!runtime)return false;const p=performanceCursor(runtime,currentBeat(runtime));
  if(!p){delete layer.dataset.scPerformance;return false;}
  layer.dataset.scPerformance="true";const cue=p.cue||{};
  const text=layer.querySelector&&layer.querySelector(".sc-story-text");const cueText=String(cue.text||"");if(text&&text.textContent!==cueText)text.textContent=cueText;
  const panel=layer.querySelector&&layer.querySelector(".sc-story-panel");
  let name=layer.querySelector&&layer.querySelector(".sc-story-name");
  const dialogueSpeaker=cue.kind==="dialogue"?String(cue.speakerName||cue.speaker||""):"";
  const speakerLabel=dialogueSpeaker||(cue.kind==="record"?"SHINOBI RECORD":"NARRATION");
  if(!name&&panel){name=document.createElement("div");name.className="sc-story-name sc-performance-name-33900";}
  if(name&&panel&&!panel.contains(name)){const t=panel.querySelector(".sc-story-text");panel.insertBefore(name,t||null);}
  if(name){if(name.textContent!==speakerLabel)name.textContent=speakerLabel;name.style.display="block";}
  const kicker=layer.querySelector&&layer.querySelector(".sc-story-kicker");const kickerText=`${String(cue.kind||"narration").toUpperCase()} · ACADEMY KAKASHI`;if(kicker&&kicker.textContent!==kickerText)kicker.textContent=kickerText;
  const primary=layer.querySelector&&layer.querySelector(".sc-chronicle-primary");if(primary){if(primary.textContent!=="›")primary.textContent="›";primary.setAttribute("aria-label","Advance scene");primary.title="Advance scene";}
  return true;
}
function renderStorySceneBoard33900(){
  if(rendering||typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const runtime=currentRuntime(),definition=runtime?boardDefinition(runtime.sceneId):null;
  if(!runtime||!definition){clearBoard(layer);return false;}
  const projection=resolveStorySceneBoardProjection(runtime.sceneId,runtime.beatId,runtime);
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  rendering=true;
  try{
    installStyle();
    layer.dataset.scSceneBoard="true";
    layer.dataset.scSceneMode=projection&&projection.mode||"conversation";
    applyBoardBackdrop(stage,runtime);
    installFallbackBackdropCut33900(layer,runtime,currentBeat(runtime));
    let board=stage.querySelector?stage.querySelector(".sc-scene-board-33900"):null;
    if(projection){
      if(!board){board=document.createElement("section");board.className="sc-scene-board-33900";board.setAttribute("aria-hidden","true");stage.appendChild(board);}
      const priorActorIds=new Set(Array.from(board.querySelectorAll?board.querySelectorAll(".sc-scene-board-33900__actor"):[]).map(node=>String(node&&node.dataset&&node.dataset.actorId||"")).filter(Boolean));
      const projectedActors=Array.isArray(projection.actors)?projection.actors.map(row=>{
        const actor={...(row||{})},motion=String(actor.motion||"").toLowerCase();
        if(!motion&&actor.entering!==true&&actor.id&&!priorActorIds.has(String(actor.id)))actor.entering=true;
        return actor;
      }):[];
      const animatedProjection={...projection,actors:projectedActors};
      const signature=JSON.stringify(animatedProjection);
      if(board.dataset&&board.dataset.signature!==signature){board.innerHTML=boardMarkup(animatedProjection);board.dataset.signature=signature;}
    }else if(board&&typeof board.remove==="function")board.remove();
    updatePerformancePanel(layer,runtime);
    const hookHandled=runStorySceneBoardRenderHooks(runtime,layer,stage,projection);
    syncAutomaticActorEntrances33900(stage);
    return !!projection||hookHandled||!!resolveBoardBackdropPath(runtime,currentBeat(runtime));
  }finally{rendering=false;}
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
  if(choiceId!==null&&choiceId!==undefined){
    const runtime=currentRuntime(),beat=currentBeat(runtime),target=targetBeat33900(runtime,beat,choiceId);
    if(shouldSceneCut33900(runtime,beat,target,choiceId))return performSceneCut(()=>PRE_ADVANCE.apply(this,arguments));
    return PRE_ADVANCE.apply(this,arguments);
  }
  const runtime=currentRuntime(),beat=currentBeat(runtime),p=performanceCursor(runtime,beat);
  if(!runtime||!beat||!p)return PRE_ADVANCE.apply(this,arguments);
  if(transitioning)return{success:false,reason:"story_scene_transition_in_progress"};
  if(!p.atEnd){persistPerformanceCursor(runtime,beat,p.index+1);renderStorySceneBoard33900();return{success:true,type:"story_performance_cue_advanced",beatId:beat.beatId,cueIndex:p.index+1,semanticBeatUnchanged:true};}
  clearPerformanceCursor(runtime);
  const def=boardDefinition(runtime.sceneId),transition=def&&def.performanceTransitions&&def.performanceTransitions[beat.beatId],target=targetBeat33900(runtime,beat,null);
  if(transition==="wipe_right_to_left"||shouldSceneCut33900(runtime,beat,target,null))return performSceneCut(()=>PRE_ADVANCE.call(this));
  return PRE_ADVANCE.apply(this,arguments);
}
if(PRE_ADVANCE){globalThis.advanceStoryScene=advanceStoryScene33900;try{advanceStoryScene=advanceStoryScene33900;}catch(_error){}}

if(typeof document!=="undefined"){
  document.addEventListener("click",event=>{const panel=event.target&&event.target.closest?event.target.closest("#story-scene-presentation-layer[data-sc-performance='true'] .sc-story-panel"):null;if(!panel||event.target.closest("button,a,input,select,textarea"))return;event.preventDefault();advanceStoryScene33900();});
  document.addEventListener("keydown",event=>{if(event.defaultPrevented||!(event.key==="Enter"||event.key===" "))return;const tag=String(event.target&&event.target.tagName||"").toLowerCase();if(["input","textarea","select","button","a"].includes(tag))return;const runtime=currentRuntime(),p=performanceCursor(runtime,currentBeat(runtime));if(!p)return;event.preventDefault();advanceStoryScene33900();});
  // Gen88: explicit Story render/advance hooks own projection. No DOM observer re-entry.
}

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const kakashiScene=A&&A.sceneByVariant&&A.sceneByVariant.academy_kakashi||null;
const kakashiOccurrence="occ_origin_kakashi_anbu_retrieval_resolution";
const KAKASHI_IMAGE="Assets/Academy Student/academy_kakashi.png";
const ANBU_IMAGE="NPC/konoha_anbu.png";
const ROGUE_IMAGE="Enemies Portraits/rogue_chunin.png";
const CIPHER_IMAGE="Enemies Portraits/cipher_handler.png";
const DECOY_IMAGE="Enemies Portraits/decoy_assassin.png";
const OBJECTIVE="Stop the package from falling into the wrong hands.";
function actor(id,label,image,state,focus=false,entering=false){return{id,label,image,state,focus,entering};}
function kakashi(state,focus=false){return actor("academy_kakashi","KAKASHI",KAKASHI_IMAGE,state,focus);}
function anbu(state,focus=false,entering=false){return actor("konoha_anbu_contact","ANBU OPERATIVE",ANBU_IMAGE,state,focus,entering);}
function rogue(state,focus=false,entering=false){return actor("kakashi_origin_logistics_clerk","ROGUE CHŪNIN",ROGUE_IMAGE,state,focus,entering);}
function cipher(state,focus=false,entering=false){return actor("kakashi_origin_information_broker","CIPHER HANDLER",CIPHER_IMAGE,state,focus,entering);}
function decoy(state,focus=false,entering=false){return actor("kakashi_origin_decoy_assassin_01","DECOY ASSASSIN",DECOY_IMAGE,state,focus,entering);}
function committedFact(){try{return A&&typeof A.findOccurrence==="function"?A.findOccurrence(kakashiOccurrence):null;}catch(_error){return null;}}
const rooftopPerformance=[
  {cueId:"roof_01",kind:"narration",text:"Kakashi watched Konoha from the rooftop.",focusActorRef:"academy_kakashi"},
  {cueId:"roof_02",kind:"narration",text:"A presence registered behind him.\nHis eye shifted.\nAn ANBU operative stood several paces back, masked and motionless.",focusActorRef:"academy_kakashi",actorEntrance:"konoha_anbu_contact"},
  {cueId:"roof_03",kind:"dialogue",speakerName:"ANBU OPERATIVE",text:"Kakashi Hatake.",focusActorRef:"konoha_anbu_contact"},
  {cueId:"roof_04",kind:"narration",text:"Kakashi turned his head slightly.",focusActorRef:"academy_kakashi"},
  {cueId:"roof_05",kind:"dialogue",speakerName:"ANBU OPERATIVE",text:"You have orders. Stop this package from falling into the wrong hands.",focusActorRef:"konoha_anbu_contact"},
  {cueId:"roof_06",kind:"action",text:"The operative raised a sealed envelope.",focusActorRef:"konoha_anbu_contact",objectState:"raised"},
  {cueId:"roof_07",kind:"narration",text:"Kakashi studied him for a moment, then moved from his position and walked over.",focusActorRef:"academy_kakashi"},
  {cueId:"roof_08",kind:"dialogue",speakerName:"KAKASHI",text:"Why are you coming to me with this?",focusActorRef:"academy_kakashi"},
  {cueId:"roof_09",kind:"action",text:"He took the envelope.",focusActorRef:"academy_kakashi",objectState:"held"},
  {cueId:"roof_10",kind:"dialogue",speakerName:"ANBU OPERATIVE",text:"Hokage's orders.",focusActorRef:"konoha_anbu_contact"},
  {cueId:"roof_11",kind:"narration",text:"Kakashi's attention sharpened.\nHis eye dropped to the seal in his hand.",focusActorRef:"academy_kakashi",objectState:"held"}
];
const tailPerformance=[
  {cueId:"alley_01",kind:"narration",text:"Kakashi finds Rogue Chūnin and tails him through Konoha.",focusActorRef:"academy_kakashi"},
  {cueId:"alley_02",kind:"narration",text:"Rogue Chūnin turns into a narrow alley.",focusActorRef:"kakashi_origin_logistics_clerk",actorEntrance:"kakashi_origin_logistics_clerk"},
  {cueId:"alley_03",kind:"narration",text:"Cipher Handler is waiting at the exchange.",focusActorRef:"kakashi_origin_information_broker",actorEntrance:"kakashi_origin_information_broker"},
  {cueId:"alley_04",kind:"narration",text:"A package is between them.",focusActorRef:"academy_kakashi",objectState:"between"}
];
const observeTransferPerformance=[
  {cueId:"observe_01",kind:"narration",text:"Kakashi stays still and watches the exchange unfold.",focusActorRef:"academy_kakashi"},
  {cueId:"observe_02",kind:"action",text:"Rogue Chūnin hands the package to Cipher Handler.",focusActorRef:"kakashi_origin_information_broker",objectState:"cipher"},
  {cueId:"observe_03",kind:"narration",text:"A Decoy Assassin comes out of the darkness like a lightning streak as Rogue Chūnin breaks away from the exchange.",focusActorRef:"kakashi_origin_decoy_assassin_01",actorEntrance:"kakashi_origin_decoy_assassin_01",objectState:"cipher"}
];
function roofProjection(performance){
  const cue=performance&&performance.cue||rooftopPerformance[0],idx=performance?performance.index:0,focus=cue.focusActorRef;
  const actors=[kakashi(idx===0?"WATCHING KONOHA":focus==="academy_kakashi"?"FOCUSED":"PRESENT",focus==="academy_kakashi")];
  if(idx>=1)actors.push(anbu(focus==="konoha_anbu_contact"?"SPEAKING":"PRESENT",focus==="konoha_anbu_contact",cue.actorEntrance==="konoha_anbu_contact"));
  const objects=[];if(cue.objectState==="raised")objects.push({label:"SEALED ENVELOPE",state:"RAISED"});if(cue.objectState==="held")objects.push({label:"SEALED ENVELOPE",state:"HELD BY KAKASHI"});
  return{mode:"conversation",location:"KONOHA ROOFTOP",objective:OBJECTIVE,actors,objects};
}
function tailProjection(performance){
  const cue=performance&&performance.cue||tailPerformance[0],idx=performance?performance.index:0,focus=cue.focusActorRef;
  const actors=[kakashi("IN PURSUIT",focus==="academy_kakashi")];
  if(idx>=1)actors.push(rogue(idx>=2?"AT EXCHANGE":"ENTERING ALLEY",focus==="kakashi_origin_logistics_clerk",cue.actorEntrance==="kakashi_origin_logistics_clerk"));
  if(idx>=2)actors.push(cipher("WAITING",focus==="kakashi_origin_information_broker",cue.actorEntrance==="kakashi_origin_information_broker"));
  return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors,objects:idx>=3?[{label:"PACKAGE",state:"BETWEEN ROGUE CHŪNIN AND CIPHER HANDLER"}]:[]};
}
function transferProjection(performance,context){
  if(context.kakashiOriginalAction!=="observe")return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,reaction:String(context.kakashiOriginalAction||"").toUpperCase(),actors:[kakashi("ACTION COMMITTED",true),rogue("RESPONDING"),cipher("RESPONDING")],objects:[{label:"PACKAGE",state:"OUTCOME REQUIRES OWNING RESOLVER"}]};
  const cue=performance&&performance.cue||observeTransferPerformance[0],idx=performance?performance.index:0,focus=cue.focusActorRef;
  const actors=[kakashi("OBSERVING",focus==="academy_kakashi"),rogue(idx>=2?"FLEEING":"AT EXCHANGE",focus==="kakashi_origin_logistics_clerk")];
  if(idx<2)actors.push(cipher(idx>=1?"HAS PACKAGE":"AT EXCHANGE",focus==="kakashi_origin_information_broker"));
  else actors.push(decoy("ATTACKING CIPHER HANDLER",true,cue.actorEntrance==="kakashi_origin_decoy_assassin_01"));
  return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors,objects:idx>=1?[{label:"PACKAGE",state:"CIPHER HANDLER HAS PACKAGE"}]:[{label:"PACKAGE",state:"EXCHANGE IN PROGRESS"}]};
}
function kakashiBoardResolver({beatId,context,performance}){
  if(beatId==="kak_original_rooftop"||beatId==="kak_original_anbu"||beatId==="kak_original_envelope"||beatId==="kak_original_order")return roofProjection(performance);
  if(beatId==="kak_original_tail")return tailProjection(performance);
  if(beatId==="kak_original_action")return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors:[kakashi("UNDETECTED POSITION",true),rogue("CURRENT CARRIER"),cipher("RECEIVING CONTACT")],objects:[{label:"PACKAGE",state:"EXCHANGE IN PROGRESS"}]};
  if(beatId==="kak_original_transfer")return transferProjection(performance,context);
  if(beatId==="kak_original_major_choice")return{mode:"encounter",location:"KONOHA ALLEY",objective:"Choose which problem Kakashi prioritizes.",actors:[kakashi("DECISION WINDOW",true),rogue("FLEEING"),decoy("ACTIVE")],objects:[{label:"PACKAGE",state:"CIPHER HANDLER HAS PACKAGE"},{label:"CHOICE PRESSURE",state:"THREE SEPARATE PROBLEMS"}]};
  if(beatId==="kak_original_secured"){const r=committedFact(),fact=r&&r.fact||{};return{mode:"consequence",location:"KONOHA ALLEY",objective:"Return with the retrieval result.",committed:fact.packageDisposition==="secured",reaction:"PLAYER ACTION → PACKAGE CUSTODY SECURED",actors:[kakashi("PACKAGE SECURED",true),cipher("PACKAGE RELINQUISHED"),decoy("SEPARATE COMPLICATION")],objects:[{label:"PACKAGE",state:fact.packageDisposition==="secured"?"SECURED BY KAKASHI":"RESOLVING"}]};}
  if(beatId==="kak_original_pursue"){const r=committedFact(),fact=r&&r.fact||{};return{mode:"consequence",location:"KONOHA ALLEY",objective:"Return with the retrieval result.",committed:fact.packageDisposition==="lost",reaction:"PLAYER ACTION → ROGUE CHŪNIN PURSUED",actors:[kakashi("IN PURSUIT",true),rogue("PURSUED"),cipher("RETAINS PACKAGE")],objects:[{label:"PACKAGE",state:fact.packageDisposition==="lost"?"NOT RECOVERED BY KAKASHI":"RESOLVING"}]};}
  return null;
}
if(kakashiScene){
  try{const d=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(kakashiScene):null;const root=d&&d.beatMap instanceof Map?d.beatMap.get("kak_original_rooftop"):null;if(root)root.nextBeatId="kak_original_tail";}catch(_error){}
  registerStorySceneBoardDefinition(kakashiScene,{benchmark:true,resolve:kakashiBoardResolver,performanceSequences:{kak_original_rooftop:rooftopPerformance,kak_original_tail:tailPerformance,kak_original_transfer:({context})=>context.kakashiOriginalAction==="observe"?observeTransferPerformance:null},performanceTransitions:{kak_original_rooftop:"wipe_right_to_left"}});
}

function runStorySceneBoard33900Diagnostics(){
  const kak=boardDefinition(kakashiScene),rootDef=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(kakashiScene):null,root=rootDef&&rootDef.beatMap instanceof Map?rootDef.beatMap.get("kak_original_rooftop"):null;
  const checks={patchId:PATCH_ID==="story_scene_board_33900_2026_09_20_multi_actor",multiActorBoardSupportsSix:boardMarkup.toString().includes("slice(0,6)")&&installStyle.toString().includes('data-count="6"')&&installStyle.toString().includes("repeat(6"),compactLiveStateCallout:installStyle.toString().includes("width:max-content")&&installStyle.toString().includes("height:auto!important")&&installStyle.toString().includes("align-items:flex-start")&&installStyle.toString().includes("left:3.2%;right:auto"),reusableRegistry:typeof registerStorySceneBoardDefinition==="function"&&typeof resolveStorySceneBoardProjection==="function",renderHookRegistry:typeof registerStorySceneBoardRenderHook==="function"&&typeof runStorySceneBoardRenderHooks==="function",kakashiBenchmarkRegistered:!!kakashiScene&&!!kak&&kak.benchmark===true,academyKakashiUsesCharacterCard:KAKASHI_IMAGE==="Assets/Academy Student/academy_kakashi.png",exactRoleAssets:ROGUE_IMAGE==="Enemies Portraits/rogue_chunin.png"&&CIPHER_IMAGE==="Enemies Portraits/cipher_handler.png"&&DECOY_IMAGE==="Enemies Portraits/decoy_assassin.png",rooftopIsSingleSemanticBeat:!!root&&root.nextBeatId==="kak_original_tail",rooftopPerformanceHasElevenCues:rooftopPerformance.length===11&&rooftopPerformance[2].text==="Kakashi Hatake."&&rooftopPerformance[9].text==="Hokage's orders.",persistentAssignmentObjective:OBJECTIVE==="Stop the package from falling into the wrong hands.",observePerformsDecoyEntrance:observeTransferPerformance.some(c=>c.actorEntrance==="kakashi_origin_decoy_assassin_01"),performanceAdvanceCommitsNoOccurrence:advanceStoryScene33900.toString().includes("performanceCursor")&&!advanceStoryScene33900.toString().includes("commitOccurrence"),wrapsExistingStoryRenderer:!!PRE_RENDER,noDomMutationObserver:true,
automaticBackdropCut:advanceStoryScene33900.toString().includes("shouldSceneCut33900")&&installFallbackBackdropCut33900.toString().includes("lastBackdropSignature33900"),
sharedCutExported:typeof globalThis.performStorySceneCut33900==="function",sharedBackdropOwnerExported:typeof globalThis.applyStorySceneBoardBackdrop33900==="function",fullScreenBackdropFailsClosed:installStyle.toString().includes('#story-scene-presentation-layer[data-sc-scene-board="true"]{background:#020508!important;}')&&applyBoardBackdrop.toString().includes("layer.dataset.scSceneBoardBackdrop")&&applyBoardBackdrop.toString().includes('layer.style.setProperty("--sc-scene-board-backdrop"'),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.registerStorySceneBoardDefinition=registerStorySceneBoardDefinition;
globalThis.unregisterStorySceneBoardDefinition=unregisterStorySceneBoardDefinition;
globalThis.registerStorySceneBoardRenderHook=registerStorySceneBoardRenderHook;
globalThis.unregisterStorySceneBoardRenderHook=unregisterStorySceneBoardRenderHook;
globalThis.resolveStorySceneBoardProjection=resolveStorySceneBoardProjection;
globalThis.getActiveStorySceneBoardProjection=getActiveStorySceneBoardProjection;
globalThis.resolveStorySceneBoardBackdropPath=resolveBoardBackdropPath;
globalThis.applyStorySceneBoardBackdrop33900=applyBoardBackdrop;
globalThis.performStorySceneCut33900=performSceneCut;
globalThis.renderStorySceneBoard33900=renderStorySceneBoard33900;
globalThis.getStoryScenePerformance33900=()=>performanceCursor(currentRuntime(),currentBeat(currentRuntime()));
globalThis.runStorySceneBoard33900Diagnostics=runStorySceneBoard33900Diagnostics;
globalThis.SC_STORY_SCENE_BOARD_33900=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
try{renderStorySceneBoard33900();}catch(_error){}
})();