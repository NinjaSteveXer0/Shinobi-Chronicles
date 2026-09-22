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

const PATCH_ID="story_scene_board_33900_2026_09_22_shared_choreography";
const STYLE_ID="sc-story-scene-board-33900-style";
const PERFORMANCE_KEY="__storyPerformanceCursor33900";
const registry=new Map();
let rendering=false,transitioning=false;
const OBSERVER_DRIVEN_RENDERING=false;
const choreographyControllers=new WeakMap();
const SEMANTIC_STAGE_ANCHORS=Object.freeze({PLAYER_LEFT:8,INNER_LEFT:27,CENTER:46,CENTER_OBJECT:50,INNER_RIGHT:61,OPPONENT_RIGHT:78,FAR_ENTRY_LEFT:-18,FAR_ENTRY_RIGHT:108});
const CHOREOGRAPHY_CLASSES=Object.freeze(["ENTER","EXIT","FOCUS","REPOSITION","APPROACH","RETREAT","LUNGE","STRIKE","EVADE","RECOIL","COLLAPSE","FLEE","RESTRAIN","RELEASE","HANDOFF","OBJECT_TRANSFER","SURPRISE_ENTRY"]);
const CHOREOGRAPHY_DURATION_MS=Object.freeze({ENTER:310,EXIT:260,FOCUS:150,REPOSITION:300,APPROACH:320,RETREAT:300,LUNGE:190,STRIKE:130,EVADE:220,RECOIL:180,COLLAPSE:390,FLEE:360,RESTRAIN:330,RELEASE:260,HANDOFF:370,OBJECT_TRANSFER:370,SURPRISE_ENTRY:285});

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

function normalizeStageAnchor33900(anchor,fallback="CENTER"){
  const value=String(anchor||fallback).toUpperCase();
  return Object.prototype.hasOwnProperty.call(SEMANTIC_STAGE_ANCHORS,value)?value:fallback;
}
function applyStoryStageAnchor33900(node,anchor){
  if(!node||!node.style)return null;
  const exact=normalizeStageAnchor33900(anchor);
  node.dataset.scStageAnchor=exact;
  node.style.setProperty("--sc-stage-anchor-x",SEMANTIC_STAGE_ANCHORS[exact]+"%");
  return exact;
}
function storyChoreographyReducedMotion33900(){
  try{return typeof matchMedia==="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(_error){return false;}
}
function normalizeStoryChoreographyCue33900(raw={}){
  const kind=String(raw.kind||raw.class||"").toUpperCase();
  if(!CHOREOGRAPHY_CLASSES.includes(kind))return null;
  const requested=Number(raw.durationMs);
  const bounded=Number.isFinite(requested)?Math.max(0,Math.min(650,requested)):CHOREOGRAPHY_DURATION_MS[kind];
  return{
    kind,
    actorId:raw.actorId?String(raw.actorId):null,
    targetId:raw.targetId?String(raw.targetId):null,
    objectId:raw.objectId?String(raw.objectId):null,
    fromAnchor:raw.fromAnchor?normalizeStageAnchor33900(raw.fromAnchor):null,
    toAnchor:raw.toAnchor?normalizeStageAnchor33900(raw.toAnchor):null,
    resultLabel:raw.resultLabel?String(raw.resultLabel):null,
    removeOnComplete:raw.removeOnComplete===true,
    durationMs:storyChoreographyReducedMotion33900()?Math.min(100,bounded):bounded
  };
}
function cancelStoryChoreography33900(root,reason="superseded"){
  if(!root)return{success:false,reason:"story_choreography_root_missing"};
  const controller=choreographyControllers.get(root);
  if(controller){
    controller.cancelled=true;
    for(const id of controller.timerIds||[])try{clearTimeout(id);}catch(_error){}
  }
  for(const node of root.querySelectorAll?root.querySelectorAll("[data-sc-choreography-active]"):[]){
    delete node.dataset.scChoreographyActive;
    node.classList.remove(...CHOREOGRAPHY_CLASSES.map(k=>"sc-choreo-"+k.toLowerCase().replaceAll("_","-")));
    node.style.removeProperty("--sc-choreo-from-x");
    node.style.removeProperty("--sc-choreo-to-x");
    node.style.removeProperty("--sc-choreo-duration");
  }
  for(const node of root.querySelectorAll?root.querySelectorAll("[data-sc-choreography-target]"):[])delete node.dataset.scChoreographyTarget;
  for(const node of root.querySelectorAll?root.querySelectorAll("[data-sc-choreography-pending-entry]"):[])delete node.dataset.scChoreographyPendingEntry;
  for(const node of root.querySelectorAll?root.querySelectorAll("[data-sc-choreography-remove-on-complete]"):[])try{node.remove();}catch(_error){}
  root.dataset.scChoreographyState="settled";
  root.dataset.scChoreographyCancelReason=String(reason);
  choreographyControllers.delete(root);
  return{success:true,reason};
}
function storyChoreographyActorNode33900(root,id){
  if(!root||!id)return null;
  const safe=String(id).replace(/\\/g,"\\\\").replace(/"/g,'\\"');
  return root.querySelector&&(
    root.querySelector('[data-actor-id="'+safe+'"]')||
    root.querySelector('[data-participant-id="'+safe+'"]')
  );
}
function storyChoreographyObjectNode33900(root,id){
  if(!root||!id)return null;
  const safe=String(id).replace(/\\/g,"\\\\").replace(/"/g,'\\"');
  return root.querySelector&&root.querySelector('[data-story-object-id="'+safe+'"]');
}
function applyStoryChoreographyCue33900(root,cue){
  const row=normalizeStoryChoreographyCue33900(cue);if(!root||!row)return{success:false,reason:"story_choreography_cue_invalid"};
  const actor=storyChoreographyActorNode33900(root,row.actorId);
  const target=storyChoreographyActorNode33900(root,row.targetId);
  const object=storyChoreographyObjectNode33900(root,row.objectId);
  const node=row.kind==="OBJECT_TRANSFER"||row.kind==="HANDOFF"?object:actor;
  if(!node)return{success:false,reason:"story_choreography_subject_missing",cue:row};
  const className="sc-choreo-"+row.kind.toLowerCase().replaceAll("_","-");
  if((row.kind==="ENTER"||row.kind==="SURPRISE_ENTRY")&&node.dataset)delete node.dataset.scChoreographyPendingEntry;
  node.dataset.scChoreographyActive=row.kind;
  if(row.removeOnComplete&&node.dataset)node.dataset.scChoreographyRemoveOnComplete="true";
  node.style.setProperty("--sc-choreo-duration",row.durationMs+"ms");
  if(row.fromAnchor)node.style.setProperty("--sc-choreo-from-x",SEMANTIC_STAGE_ANCHORS[row.fromAnchor]+"%");
  if(row.toAnchor)node.style.setProperty("--sc-choreo-to-x",SEMANTIC_STAGE_ANCHORS[row.toAnchor]+"%");
  if(row.toAnchor&&row.kind==="REPOSITION")applyStoryStageAnchor33900(node,row.toAnchor);
  if(target&&["APPROACH","LUNGE","STRIKE"].includes(row.kind))target.dataset.scChoreographyTarget="true";
  node.classList.remove(className);void node.offsetWidth;node.classList.add(className);
  return{success:true,cue:row,node,target};
}
function playStoryChoreography33900({root,scopeKey,cues=[]}={}){
  if(!root)return{success:false,reason:"story_choreography_root_missing"};
  const scope=String(scopeKey||"unscoped");
  const normalized=(Array.isArray(cues)?cues:[]).map(normalizeStoryChoreographyCue33900).filter(Boolean);
  if(root.dataset&&root.dataset.scChoreographyScope===scope){
    const current=getStoryChoreographyState33900(root);
    return{success:true,scopeKey:scope,cueCount:normalized.length,lastKinds:current.lastKinds,reused:true,settled:current.state==="settled"};
  }
  cancelStoryChoreography33900(root,"new_scope");
  root.dataset.scChoreographyScope=scope;
  root.dataset.scChoreographyLastKinds=normalized.map(row=>row.kind).join(",");
  root.dataset.scChoreographyCompletedKinds="";
  if(!normalized.length){root.dataset.scChoreographyState="settled";return{success:true,scopeKey:scope,cueCount:0,lastKinds:[],completedKinds:[],settled:true};}
  for(const row of normalized){
    if(row.kind!=="ENTER"&&row.kind!=="SURPRISE_ENTRY")continue;
    const actor=storyChoreographyActorNode33900(root,row.actorId);
    if(actor&&actor.dataset)actor.dataset.scChoreographyPendingEntry="true";
  }
  const controller={scopeKey:scope,cancelled:false,timerIds:[],cueIndex:-1};
  choreographyControllers.set(root,controller);root.dataset.scChoreographyState="playing";
  const later=(fn,ms)=>{const id=setTimeout(()=>{controller.timerIds=controller.timerIds.filter(x=>x!==id);if(!controller.cancelled)fn();},ms);controller.timerIds.push(id);};
  const run=index=>{
    if(controller.cancelled)return;
    if(index>=normalized.length){
      for(const node of root.querySelectorAll?root.querySelectorAll("[data-sc-choreography-pending-entry]"):[])delete node.dataset.scChoreographyPendingEntry;
      for(const node of root.querySelectorAll?root.querySelectorAll("[data-sc-choreography-target]"):[])delete node.dataset.scChoreographyTarget;
      root.dataset.scChoreographyState="settled";choreographyControllers.delete(root);return;
    }
    controller.cueIndex=index;
    const applied=applyStoryChoreographyCue33900(root,normalized[index]);
    const duration=applied.success?applied.cue.durationMs:0;
    later(()=>{
      if(applied.success&&applied.cue){
        const completed=root.dataset.scChoreographyCompletedKinds?root.dataset.scChoreographyCompletedKinds.split(",").filter(Boolean):[];
        completed.push(applied.cue.kind);
        root.dataset.scChoreographyCompletedKinds=completed.join(",");
      }
      if(applied.node){
        applied.node.classList.remove("sc-choreo-"+applied.cue.kind.toLowerCase().replaceAll("_","-"));
        delete applied.node.dataset.scChoreographyActive;
        if(applied.cue.removeOnComplete){
          delete applied.node.dataset.scChoreographyRemoveOnComplete;
          try{applied.node.remove();}catch(_error){}
        }
      }
      if(applied.target&&applied.target.isConnected)delete applied.target.dataset.scChoreographyTarget;
      run(index+1);
    },duration);
  };
  run(0);
  return{success:true,scopeKey:scope,cueCount:normalized.length,settled:false};
}
function getStoryChoreographyState33900(root){
  const controller=root&&choreographyControllers.get(root);
  const lastKinds=root&&root.dataset&&root.dataset.scChoreographyLastKinds?root.dataset.scChoreographyLastKinds.split(",").filter(Boolean):[];
  const completedKinds=root&&root.dataset&&root.dataset.scChoreographyCompletedKinds?root.dataset.scChoreographyCompletedKinds.split(",").filter(Boolean):[];
  return{active:!!controller,scopeKey:controller&&controller.scopeKey||root&&root.dataset&&root.dataset.scChoreographyScope||null,cueIndex:controller?controller.cueIndex:null,state:root&&root.dataset&&root.dataset.scChoreographyState||"settled",lastKinds,completedKinds};
}

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
#story-scene-presentation-layer[data-sc-presentation-hidden="true"]{display:none!important;pointer-events:none!important;}\n#story-scene-presentation-layer[data-sc-scene-board="true"]{background:transparent!important;}
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
/* #312 shared choreography primitives. These classes are presentation-only and may be consumed by any Story renderer. */
[data-sc-stage-anchor]{left:var(--sc-stage-anchor-x)!important;}
[data-sc-choreography-active]{will-change:transform,opacity,filter;animation-duration:var(--sc-choreo-duration,220ms)!important;animation-fill-mode:both!important;}
[data-sc-choreography-pending-entry="true"]{opacity:0!important;pointer-events:none!important;}
.sc-choreo-focus{animation-name:scChoreoFocus33900}.sc-choreo-enter{animation-name:scChoreoEnter33900}.sc-choreo-surprise-entry{animation-name:scChoreoSurprise33900}
.sc-choreo-approach{animation-name:scChoreoApproach33900}.sc-choreo-lunge{animation-name:scChoreoLunge33900}.sc-choreo-retreat{animation-name:scChoreoRetreat33900}
.sc-choreo-reposition{animation-name:scChoreoReposition33900}.sc-choreo-strike{animation-name:scChoreoStrike33900}.sc-choreo-evade{animation-name:scChoreoEvade33900}
.sc-choreo-recoil{animation-name:scChoreoRecoil33900}.sc-choreo-collapse{animation-name:scChoreoCollapse33900}.sc-choreo-flee{animation-name:scChoreoFlee33900}.sc-choreo-exit{animation-name:scChoreoExit33900}
.sc-choreo-restrain{animation-name:scChoreoRestrain33900}.sc-choreo-release{animation-name:scChoreoRelease33900}
.sc-choreo-handoff,.sc-choreo-object-transfer{animation-name:scChoreoObjectTransfer33900}
@keyframes scChoreoFocus33900{0%{transform:translateY(0) scale(1);filter:brightness(.82)}60%{transform:translateY(-12px) scale(1.045);filter:brightness(1.1)}100%{transform:translateY(-8px) scale(1.035);filter:brightness(1.06)}}
@keyframes scChoreoEnter33900{from{opacity:0;transform:translateX(7vw) scale(.96)}to{opacity:1;transform:translateX(0) scale(1)}}
@keyframes scChoreoSurprise33900{0%{opacity:0;transform:translateX(13vw) scale(.92);filter:brightness(.5)}70%{opacity:1;transform:translateX(-1.2vw) scale(1.04);filter:brightness(1.14)}100%{opacity:1;transform:translateX(0) scale(1)}}
@keyframes scChoreoApproach33900{0%{transform:translateX(0)}70%{transform:translateX(5vw)}100%{transform:translateX(4vw)}}
@keyframes scChoreoLunge33900{0%{transform:translateX(0)}58%{transform:translateX(9vw) scale(1.025)}100%{transform:translateX(6.5vw) scale(1)}}
@keyframes scChoreoRetreat33900{from{transform:translateX(0)}to{transform:translateX(-5vw)}}
@keyframes scChoreoReposition33900{from{left:var(--sc-choreo-from-x,var(--sc-stage-anchor-x))}to{left:var(--sc-choreo-to-x,var(--sc-stage-anchor-x))}}
@keyframes scChoreoStrike33900{0%{transform:translateX(0)}50%{transform:translateX(2.2vw) scale(1.02)}100%{transform:translateX(0)}}
@keyframes scChoreoEvade33900{0%{transform:translateX(0)}55%{transform:translateX(4.5vw)}100%{transform:translateX(2.5vw)}}
@keyframes scChoreoRecoil33900{0%{transform:translateX(0)}42%{transform:translateX(2.2vw) rotate(1deg)}100%{transform:translateX(.6vw)}}
@keyframes scChoreoCollapse33900{from{opacity:1;transform:translateY(0) rotate(0)}to{opacity:.38;transform:translateY(18%) rotate(4deg);filter:saturate(.35) brightness(.55)}}
@keyframes scChoreoFlee33900{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(var(--sc-choreo-flee-x,22vw)) scale(.93)}}
@keyframes scChoreoExit33900{from{opacity:1}to{opacity:0;transform:translateX(8vw)}}
@keyframes scChoreoRestrain33900{0%{transform:scale(1)}55%{transform:scale(.96);filter:brightness(.78)}100%{transform:scale(.98);filter:brightness(.84)}}
@keyframes scChoreoRelease33900{from{transform:scale(.98);filter:brightness(.84)}to{transform:scale(1);filter:none}}
@keyframes scChoreoObjectTransfer33900{0%{left:var(--sc-choreo-from-x);transform:translate(-50%,0) scale(.92)}65%{transform:translate(-50%,-12px) scale(1.08)}100%{left:var(--sc-choreo-to-x);transform:translate(-50%,0) scale(1)}}
[data-sc-choreography-target="true"]{filter:brightness(1.08)}
@media(prefers-reduced-motion:reduce){[data-sc-choreography-active]{animation-duration:80ms!important}.sc-choreo-approach,.sc-choreo-lunge,.sc-choreo-retreat,.sc-choreo-reposition,.sc-choreo-evade,.sc-choreo-recoil,.sc-choreo-flee,.sc-choreo-exit,.sc-choreo-handoff,.sc-choreo-object-transfer{animation-name:scChoreoReduced33900!important}@keyframes scChoreoReduced33900{from{opacity:.72}to{opacity:1}}}
.sc-scene-board-wipe-33900{position:absolute;inset:0;z-index:9999;background:#000;transform:translateX(100%);pointer-events:auto;transition:transform .28s cubic-bezier(.7,0,.3,1)}.sc-scene-board-wipe-33900.is-covering{transform:translateX(0)}.sc-scene-board-wipe-33900.is-revealing{transform:translateX(-100%)}
@media(prefers-reduced-motion:reduce){.sc-scene-board-33900__actor.is-entering{animation:none!important}.sc-scene-board-wipe-33900{transition:none!important}}
@media(max-width:820px){.sc-scene-board-33900__actors{left:1.5%;right:1.5%;gap:1%;bottom:31%}.sc-scene-board-33900__actors[data-count="2"]{column-gap:20px}.sc-scene-board-33900__actor{width:90%;max-height:290px}.sc-scene-board-33900__objective{max-width:58%;font-size:8px}#story-scene-presentation-layer[data-sc-scene-mode="encounter"] .sc-chronicle-actions{grid-template-columns:1fr}}
`;
  document.head.appendChild(style);return true;
}
function actorMarkup(actor){
  const image=actor.image?`<img src="${escapeHTML(actor.image)}" alt="">`:`<div class="sc-scene-board-33900__actor-silhouette" aria-hidden="true"></div>`;
  return `<figure class="sc-scene-board-33900__actor ${actor.focus?"is-focus":""} ${actor.entering?"is-entering":""}" data-actor-id="${escapeHTML(actor.id||"")}"><div class="sc-scene-board-33900__actor-frame"></div>${image}<figcaption class="sc-scene-board-33900__actor-tag"><strong>${escapeHTML(actor.label||"UNKNOWN")}</strong>${actor.state?`<small>${escapeHTML(actor.state)}</small>`:""}</figcaption></figure>`;
}
function boardMarkup(projection){
  const actors=Array.isArray(projection.actors)?projection.actors.slice(0,3):[];
  const objects=(projection.objects||[]).map(row=>`<span class="sc-scene-board-33900__object sc-live-state-callout-33900${row&&row.committed?" is-committed":""}"><b>${escapeHTML(row.label||"OBJECT")}</b>${escapeHTML(row.state||"")}</span>`).join("");
  return `<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">${escapeHTML(projection.location||"STORY SCENE")}</div>${projection.objective?`<div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(projection.objective)}</div>`:""}</div>${projection.reaction?`<div class="sc-scene-board-33900__reaction">${escapeHTML(projection.reaction)}</div>`:""}${projection.committed?`<div class="sc-scene-board-33900__receipt">CHRONICLE FACT COMMITTED</div>`:""}<div class="sc-scene-board-33900__actors" data-count="${actors.length}">${actors.map(actorMarkup).join("")}</div>${objects?`<div class="sc-scene-board-33900__objects sc-live-state-callouts-33900">${objects}</div>`:""}`;
}
function clearBoard(layer){if(!layer)return;try{delete layer.dataset.scSceneBoard;delete layer.dataset.scSceneMode;delete layer.dataset.scPerformance;}catch(_error){};for(const node of layer.querySelectorAll?layer.querySelectorAll(".sc-scene-board-33900"):[]){if(typeof cancelStoryChoreography33900==="function")cancelStoryChoreography33900(node,"scene_board_teardown");if(node&&typeof node.remove==="function")node.remove();}}
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
  const kicker=layer.querySelector&&layer.querySelector(".sc-story-kicker");const kickerText=String(cue.kind||"narration").toUpperCase();if(kicker&&kicker.textContent!==kickerText)kicker.textContent=kickerText;
  const primary=layer.querySelector&&layer.querySelector(".sc-chronicle-primary");if(primary){if(primary.textContent!=="›")primary.textContent="›";primary.setAttribute("aria-label","Advance scene");primary.title="Advance scene";}
  return true;
}
function renderStorySceneBoard33900(){
  if(rendering||typeof document==="undefined")return false;const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const runtime=currentRuntime(),projection=runtime?resolveStorySceneBoardProjection(runtime.sceneId,runtime.beatId,runtime):null;if(!projection){clearBoard(layer);return false;}
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  rendering=true;try{installStyle();layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode=projection.mode||"conversation";applyBoardBackdrop(stage,runtime);let board=stage.querySelector?stage.querySelector(".sc-scene-board-33900"):null;if(!board){board=document.createElement("section");board.className="sc-scene-board-33900";board.setAttribute("aria-hidden","true");stage.appendChild(board);}const signature=JSON.stringify(projection);if(board.dataset&&board.dataset.signature!==signature){board.innerHTML=boardMarkup(projection);board.dataset.signature=signature;}updatePerformancePanel(layer,runtime);return true;}finally{rendering=false;}
}
function scheduleBoardRender(){if(typeof queueMicrotask==="function")queueMicrotask(renderStorySceneBoard33900);else if(typeof setTimeout==="function")setTimeout(renderStorySceneBoard33900,0);}

const PRE_HIDE=typeof hideStoryScenePresentationLayer==="function"?hideStoryScenePresentationLayer:null;
const PRE_RENDER=typeof renderStoryScenePresentationLayer==="function"?renderStoryScenePresentationLayer:null;
function markStoryPresentationHidden33900(reason="hidden"){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  layer.dataset.scPresentationHidden="true";layer.dataset.scPresentationHiddenReason=String(reason);
  layer.style.setProperty("display","none","important");
  return true;
}
function clearStoryPresentationHidden33900(){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const wasHidden=layer.dataset.scPresentationHidden==="true";
  delete layer.dataset.scPresentationHidden;delete layer.dataset.scPresentationHiddenReason;
  if(wasHidden&&layer.style.getPropertyPriority("display")==="important")layer.style.removeProperty("display");
  return true;
}
function storyPresentationBattleSuspended33900(){
  try{
    if(typeof currentOverlayType==="undefined"||currentOverlayType!=="combat")return false;
    const battle=typeof currentBattle!=="undefined"?currentBattle:null,rc=battle&&battle.returnContext||null;
    return !!(battle&&rc&&rc.type==="story_scene");
  }catch(_error){return false;}
}
if(PRE_HIDE){
  globalThis.hideStoryScenePresentationLayer=function storySceneBoard33900HideWrapper(options={}){
    const result=PRE_HIDE.apply(this,arguments);
    markStoryPresentationHidden33900(options&&options.preserveRuntime===true?"preserved_runtime_hidden":"hidden");
    return result;
  };
  try{hideStoryScenePresentationLayer=globalThis.hideStoryScenePresentationLayer;}catch(_error){}
}
let RENDER_WRAPPER_33900=null;
if(PRE_RENDER){
  RENDER_WRAPPER_33900=function storySceneBoard33900RenderWrapper(){
    const result=PRE_RENDER.apply(this,arguments);
    if(storyPresentationBattleSuspended33900()){markStoryPresentationHidden33900("caller_owned_battle");return result;}
    clearStoryPresentationHidden33900();renderStorySceneBoard33900();return result;
  };
  globalThis.renderStoryScenePresentationLayer=RENDER_WRAPPER_33900;
  try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}
}

function reducedMotion(){return storyChoreographyReducedMotion33900();}
function performSceneCut(){
  if(typeof document==="undefined"||reducedMotion())return{success:true,type:"story_scene_cinematic_cut",skippedMotion:true};
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return{success:true,type:"story_scene_cinematic_cut",skippedMotion:true};
  if(transitioning)return{success:false,reason:"story_scene_transition_in_progress"};
  transitioning=true;
  const wipe=document.createElement("div");wipe.className="sc-scene-board-wipe-33900";layer.appendChild(wipe);
  requestAnimationFrame(()=>wipe.classList.add("is-covering"));
  setTimeout(()=>{wipe.classList.remove("is-covering");wipe.classList.add("is-revealing");setTimeout(()=>{wipe.remove();transitioning=false;},320);},120);
  return{success:true,type:"story_scene_cinematic_cut",pending:true,presentationOnly:true};
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
  // #312: semantic Story advancement commits first. Choreography may illustrate
  // that committed transition afterwards, but animation completion never owns it.
  const result=PRE_ADVANCE.apply(this,arguments);
  if(result&&result.success===true&&transition==="wipe_right_to_left")performSceneCut();
  return result;
}
if(PRE_ADVANCE){globalThis.advanceStoryScene=advanceStoryScene33900;try{advanceStoryScene=advanceStoryScene33900;}catch(_error){}}

if(typeof document!=="undefined"){
  document.addEventListener("click",event=>{const panel=event.target&&event.target.closest?event.target.closest("#story-scene-presentation-layer[data-sc-performance='true'] .sc-story-panel"):null;if(!panel||event.target.closest("button,a,input,select,textarea"))return;event.preventDefault();advanceStoryScene33900();});
  document.addEventListener("keydown",event=>{if(event.defaultPrevented||!(event.key==="Enter"||event.key===" "))return;const tag=String(event.target&&event.target.tagName||"").toLowerCase();if(["input","textarea","select","button","a"].includes(tag))return;const runtime=currentRuntime(),p=performanceCursor(runtime,currentBeat(runtime));if(!p)return;event.preventDefault();advanceStoryScene33900();});
}

// Origin-specific board definitions are registered by their own consumers.
// The generic Scene Board must not embed Origin-specific actors, cues, routes or assets.

function runStorySceneBoard33900Diagnostics(){
  const checks={
    patchId:PATCH_ID==="story_scene_board_33900_2026_09_22_shared_choreography",
    compactLiveStateCallout:installStyle.toString().includes("width:max-content")&&installStyle.toString().includes("height:auto!important")&&installStyle.toString().includes("align-items:flex-start")&&installStyle.toString().includes("left:3.2%;right:auto"),
    reusableRegistry:typeof registerStorySceneBoardDefinition==="function"&&typeof unregisterStorySceneBoardDefinition==="function"&&typeof resolveStorySceneBoardProjection==="function",
    genericPerformanceLifecycle:typeof performanceSequenceFor==="function"&&typeof advanceStoryScene33900==="function"&&typeof performSceneCut==="function",
    performanceAdvanceCommitsNoOccurrence:advanceStoryScene33900.toString().includes("performanceCursor")&&!advanceStoryScene33900.toString().includes("commitOccurrence"),
    semanticAdvancePrecedesWipe:advanceStoryScene33900.toString().indexOf("PRE_ADVANCE.apply")<advanceStoryScene33900.toString().indexOf("performSceneCut"),
    semanticAnchorVocabulary:["PLAYER_LEFT","INNER_LEFT","CENTER","CENTER_OBJECT","INNER_RIGHT","OPPONENT_RIGHT","FAR_ENTRY_LEFT","FAR_ENTRY_RIGHT"].every(key=>Object.prototype.hasOwnProperty.call(SEMANTIC_STAGE_ANCHORS,key)),
    boundedChoreographyVocabulary:CHOREOGRAPHY_CLASSES.length===17&&Object.values(CHOREOGRAPHY_DURATION_MS).every(ms=>ms<=650),
    scopedCancellableQueue:String(playStoryChoreography33900).includes("scopeKey")&&String(cancelStoryChoreography33900).includes("cancelled=true"),
    sameScopeDoesNotReplay:String(playStoryChoreography33900).includes("reused:true"),
    entryPreflightPreventsFlash:String(playStoryChoreography33900).includes("scChoreographyPendingEntry")&&installStyle.toString().includes("data-sc-choreography-pending-entry"),
    presentationOnlySubjectCleanup:String(normalizeStoryChoreographyCue33900).includes("removeOnComplete")&&String(playStoryChoreography33900).includes("applied.cue.removeOnComplete"),
    completionReceipt:String(playStoryChoreography33900).includes("scChoreographyCompletedKinds")&&String(getStoryChoreographyState33900).includes("completedKinds"),
    teardownCancelsChoreography:String(clearBoard).includes("cancelStoryChoreography33900"),
    noMutationObserver:OBSERVER_DRIVEN_RENDERING===false,
    authoritativePresentationHide:!!PRE_HIDE&&String(globalThis.hideStoryScenePresentationLayer).includes("markStoryPresentationHidden33900"),
    battleSuspensionKeepsLayerHidden:
      typeof RENDER_WRAPPER_33900==="function"&&
      String(RENDER_WRAPPER_33900).includes("storyPresentationBattleSuspended33900")&&
      String(RENDER_WRAPPER_33900).includes("markStoryPresentationHidden33900")&&
      String(markStoryPresentationHidden33900).includes("scPresentationHidden")&&
      String(markStoryPresentationHidden33900).includes('setProperty("display","none","important")')&&
      installStyle.toString().includes("data-sc-presentation-hidden"),
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
globalThis.applyStoryStageAnchor33900=applyStoryStageAnchor33900;
globalThis.playStoryChoreography33900=playStoryChoreography33900;
globalThis.cancelStoryChoreography33900=cancelStoryChoreography33900;
globalThis.getStoryChoreographyState33900=getStoryChoreographyState33900;
globalThis.normalizeStoryChoreographyCue33900=normalizeStoryChoreographyCue33900;
globalThis.markStoryPresentationHidden33900=markStoryPresentationHidden33900;
globalThis.clearStoryPresentationHidden33900=clearStoryPresentationHidden33900;
globalThis.storyPresentationBattleSuspended33900=storyPresentationBattleSuspended33900;
globalThis.runStorySceneBoard33900Diagnostics=runStorySceneBoard33900Diagnostics;
globalThis.SC_STORY_SCENE_BOARD_33900=Object.freeze({patchId:PATCH_ID,semanticStageAnchors:SEMANTIC_STAGE_ANCHORS,choreographyClasses:CHOREOGRAPHY_CLASSES,browserGoldenClaimed:false});
try{renderStorySceneBoard33900();}catch(_error){}
})();