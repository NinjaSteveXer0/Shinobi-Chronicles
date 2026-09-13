// ============================================================================
// ISSUE #105 / #175 — REUSABLE STORY SCENE BOARD + KAKASHI BENCHMARK — 33900
//
// Presentation-only bridge over the existing Story runtime. It does not create
// a second Story/Encounter engine and never commits semantic history. The active
// Story beat/local context remains authority; this module only projects it as a
// staged environment with visible actors, objects, objectives and consequence
// state. Kakashi is the first benchmark consumer before any wider Origin rollout.
// ============================================================================
(function installStorySceneBoard33900(){
"use strict";
if(globalThis.SC_STORY_SCENE_BOARD_33900)return;

const PATCH_ID="story_scene_board_33900_2026_09_14";
const STYLE_ID="sc-story-scene-board-33900-style";
const registry=new Map();
let rendering=false;
let observer=null;

function escapeHTML(value){
  if(typeof escapeStorySceneHTML==="function")return escapeStorySceneHTML(String(value??""));
  return String(value??"").replace(/[&<>\"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function clone(value){
  if(typeof cloneProgressionData==="function")return cloneProgressionData(value);
  if(value===undefined)return undefined;
  try{return JSON.parse(JSON.stringify(value));}catch(_error){return value;}
}
function currentRuntime(){
  try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}
}
function currentBeat(runtime=currentRuntime()){
  if(!runtime||typeof getStorySceneDefinition!=="function")return null;
  try{
    const def=getStorySceneDefinition(runtime.sceneId);
    if(!def)return null;
    if(def.beatMap instanceof Map)return def.beatMap.get(runtime.beatId)||null;
    return Array.isArray(def.beats)?def.beats.find(row=>row&&row.beatId===runtime.beatId)||null:null;
  }catch(_error){return null;}
}
function registerStorySceneBoardDefinition(sceneId,definition){
  if(!sceneId||!definition||typeof definition!=="object")return{success:false,reason:"story_scene_board_definition_required"};
  registry.set(sceneId,definition);
  return{success:true,sceneId};
}
function unregisterStorySceneBoardDefinition(sceneId){return registry.delete(sceneId);}
function resolveStorySceneBoardProjection(sceneId,beatId,runtime=currentRuntime()){
  const definition=registry.get(sceneId);
  if(!definition)return null;
  const beat=currentBeat(runtime);
  const context=runtime&&runtime.localContext&&typeof runtime.localContext==="object"?runtime.localContext:{};
  const state={sceneId,beatId,runtime,beat,context};
  let projection=null;
  if(typeof definition.resolve==="function")projection=definition.resolve(state);
  else if(definition.beats&&definition.beats[beatId]){
    const row=definition.beats[beatId];
    projection=typeof row==="function"?row(state):row;
  }
  if(!projection)return null;
  return{sceneId,beatId,...clone(projection)};
}
function getActiveStorySceneBoardProjection(){
  const runtime=currentRuntime();
  return runtime?resolveStorySceneBoardProjection(runtime.sceneId,runtime.beatId,runtime):null;
}

function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
    #story-scene-presentation-layer[data-sc-scene-board="true"]{background:transparent!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-environment{z-index:0!important;filter:saturate(1.04) brightness(.92);}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-environment-scrim{z-index:1!important;background:linear-gradient(180deg,rgba(2,5,8,.08),rgba(2,5,8,.12) 46%,rgba(2,5,8,.72) 83%,rgba(2,5,8,.92))!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-stage{width:min(100vw,calc(100vh * 1.7777778))!important;max-width:none!important;aspect-ratio:16/9!important;overflow:hidden;z-index:2!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-master-frame{display:none!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-layout{position:relative;z-index:4;width:min(94%,1180px)!important;min-height:0!important;margin:0 0 2.1%!important;display:grid!important;grid-template-columns:1fr!important;gap:8px!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-context{display:none!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-panel{min-height:0!important;max-height:34vh;padding:14px 18px 13px!important;border:1px solid rgba(205,169,83,.62)!important;background:linear-gradient(180deg,rgba(3,9,14,.82),rgba(2,7,11,.94))!important;backdrop-filter:blur(5px);box-shadow:0 18px 45px rgba(0,0,0,.48)!important;overflow:auto!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-portrait{display:none!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-text{margin-top:6px!important;font-size:clamp(13px,1.05vw,17px)!important;line-height:1.42!important;}
    #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-actions{margin-top:9px!important;gap:7px!important;}
    #story-scene-presentation-layer[data-sc-scene-mode="encounter"] .sc-chronicle-actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));}
    #story-scene-presentation-layer[data-sc-scene-mode="encounter"] .sc-story-choice{min-height:42px;align-items:center;background:linear-gradient(180deg,rgba(14,24,30,.95),rgba(7,14,19,.96))!important;border-color:rgba(207,169,76,.68)!important;}
    #story-scene-presentation-layer[data-sc-scene-mode="consequence"] .sc-story-panel{border-color:rgba(92,205,162,.62)!important;}
    .sc-scene-board-33900{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;}
    .sc-scene-board-33900__top{position:absolute;left:3.2%;right:3.2%;top:3.8%;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}
    .sc-scene-board-33900__location,.sc-scene-board-33900__objective,.sc-scene-board-33900__receipt{padding:7px 10px;border:1px solid rgba(199,164,77,.44);background:rgba(3,9,14,.72);box-shadow:0 8px 22px rgba(0,0,0,.28);text-shadow:0 1px 2px #000;}
    .sc-scene-board-33900__location{color:#d8c484;font-size:9px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;}
    .sc-scene-board-33900__objective{max-width:48%;color:#e7e0cf;font-size:10px;line-height:1.35;text-align:right;}
    .sc-scene-board-33900__objective b{display:block;color:#71dce4;font-size:8px;letter-spacing:.14em;margin-bottom:3px;}
    .sc-scene-board-33900__actors{position:absolute;left:3.5%;right:3.5%;top:12%;bottom:27%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:end;gap:2.2%;}
    .sc-scene-board-33900__actor{position:relative;justify-self:center;width:min(78%,260px);height:min(92%,430px);display:flex;align-items:flex-end;justify-content:center;opacity:.67;transform:translateY(4px) scale(.94);transition:opacity .16s ease,transform .16s ease,filter .16s ease;filter:saturate(.72) brightness(.82);}
    .sc-scene-board-33900__actor.is-focus{opacity:1;transform:translateY(0) scale(1);filter:none;}
    .sc-scene-board-33900__actor-frame{position:absolute;inset:0;border:1px solid rgba(194,158,73,.34);background:linear-gradient(180deg,rgba(7,13,17,.18),rgba(3,7,10,.72));box-shadow:0 16px 34px rgba(0,0,0,.34),inset 0 0 35px rgba(0,0,0,.23);}
    .sc-scene-board-33900__actor.is-focus .sc-scene-board-33900__actor-frame{border-color:rgba(97,220,229,.74);box-shadow:0 0 0 1px rgba(97,220,229,.16),0 18px 38px rgba(0,0,0,.42);}
    .sc-scene-board-33900__actor img{position:relative;z-index:1;width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 12px 14px rgba(0,0,0,.65));}
    .sc-scene-board-33900__actor-fallback{position:relative;z-index:1;width:64%;aspect-ratio:3/4;margin-bottom:22px;border:1px dashed rgba(190,177,145,.35);display:flex;align-items:center;justify-content:center;background:rgba(4,8,11,.52);color:#b7b09e;font-size:30px;font-weight:900;}
    .sc-scene-board-33900__actor-tag{position:absolute;z-index:3;left:8%;right:8%;bottom:4%;padding:6px 8px;background:rgba(2,7,10,.88);border:1px solid rgba(194,158,73,.48);text-align:center;}
    .sc-scene-board-33900__actor-tag strong{display:block;color:#efe6cf;font-size:10px;letter-spacing:.1em;}
    .sc-scene-board-33900__actor-tag small{display:block;color:#91a7aa;font-size:8px;margin-top:2px;line-height:1.25;}
    .sc-scene-board-33900__objects{position:absolute;left:4%;right:4%;bottom:25.4%;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;}
    .sc-scene-board-33900__object{padding:6px 9px;border:1px solid rgba(202,167,78,.5);background:rgba(3,9,13,.82);font-size:8px;letter-spacing:.07em;color:#d8ceb8;}
    .sc-scene-board-33900__object b{color:#6dd7df;margin-right:6px;}
    .sc-scene-board-33900__reaction{position:absolute;left:50%;top:12.5%;transform:translateX(-50%);max-width:64%;padding:8px 12px;border:1px solid rgba(102,212,188,.62);background:rgba(3,12,14,.82);color:#d9f1e9;font-size:9px;font-weight:800;letter-spacing:.05em;text-align:center;box-shadow:0 10px 28px rgba(0,0,0,.35);}
    .sc-scene-board-33900__receipt{position:absolute;right:3.2%;top:12.5%;border-color:rgba(93,205,162,.62);color:#bfead8;font-size:8px;font-weight:900;letter-spacing:.1em;}
    @media(max-width:820px){
      #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-stage{width:100vw!important;min-width:0!important;}
      .sc-scene-board-33900__actors{left:1.5%;right:1.5%;gap:1%;bottom:31%;}
      .sc-scene-board-33900__actor{width:94%;}
      .sc-scene-board-33900__objective{max-width:58%;font-size:8px;}
      #story-scene-presentation-layer[data-sc-scene-mode="encounter"] .sc-chronicle-actions{grid-template-columns:1fr;}
    }
  `;
  document.head.appendChild(style);
  return true;
}
function actorMarkup(actor){
  const image=actor.image?`<img src="${escapeHTML(actor.image)}" alt="">`:`<div class="sc-scene-board-33900__actor-fallback">?</div>`;
  return `<figure class="sc-scene-board-33900__actor ${actor.focus?"is-focus":""}" data-actor-id="${escapeHTML(actor.id||"")}">
    <div class="sc-scene-board-33900__actor-frame"></div>${image}
    <figcaption class="sc-scene-board-33900__actor-tag"><strong>${escapeHTML(actor.label||"UNKNOWN")}</strong>${actor.state?`<small>${escapeHTML(actor.state)}</small>`:""}</figcaption>
  </figure>`;
}
function boardMarkup(projection){
  const actors=Array.isArray(projection.actors)?projection.actors.slice(0,3):[];
  while(actors.length<3)actors.push(null);
  const objects=(projection.objects||[]).map(row=>`<span class="sc-scene-board-33900__object"><b>${escapeHTML(row.label||"OBJECT")}</b>${escapeHTML(row.state||"")}</span>`).join("");
  return `<div class="sc-scene-board-33900__top">
      <div class="sc-scene-board-33900__location">${escapeHTML(projection.location||"STORY SCENE")}</div>
      ${projection.objective?`<div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(projection.objective)}</div>`:""}
    </div>
    ${projection.reaction?`<div class="sc-scene-board-33900__reaction">${escapeHTML(projection.reaction)}</div>`:""}
    ${projection.committed?`<div class="sc-scene-board-33900__receipt">CHRONICLE FACT COMMITTED</div>`:""}
    <div class="sc-scene-board-33900__actors">${actors.map(row=>row?actorMarkup(row):"<span></span>").join("")}</div>
    ${objects?`<div class="sc-scene-board-33900__objects">${objects}</div>`:""}`;
}
function clearBoard(layer){
  if(!layer)return;
  try{delete layer.dataset.scSceneBoard;delete layer.dataset.scSceneMode;}catch(_error){}
  const nodes=layer.querySelectorAll?layer.querySelectorAll(".sc-scene-board-33900"):[];
  for(const node of nodes)if(node&&typeof node.remove==="function")node.remove();
}
function renderStorySceneBoard33900(){
  if(rendering||typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");
  if(!layer)return false;
  const projection=getActiveStorySceneBoardProjection();
  if(!projection){clearBoard(layer);return false;}
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;
  if(!stage)return false;
  rendering=true;
  try{
    installStyle();
    layer.dataset.scSceneBoard="true";
    layer.dataset.scSceneMode=projection.mode||"conversation";
    if(stage.dataset)stage.dataset.scSceneBoard33900="true";
    let board=stage.querySelector?stage.querySelector(".sc-scene-board-33900"):null;
    if(!board){board=document.createElement("section");board.className="sc-scene-board-33900";board.setAttribute("aria-hidden","true");stage.appendChild(board);}
    const signature=JSON.stringify(projection);
    if(board.dataset&&board.dataset.signature!==signature){board.innerHTML=boardMarkup(projection);board.dataset.signature=signature;}
    return true;
  }finally{rendering=false;}
}
function scheduleBoardRender(){
  if(typeof queueMicrotask==="function")queueMicrotask(renderStorySceneBoard33900);
  else if(typeof setTimeout==="function")setTimeout(renderStorySceneBoard33900,0);
}

// Reuse the existing Story renderer. This wrapper is projection-only and always
// delegates first so Story remains the production authority for beats/choices.
const PRE_RENDER=typeof renderStoryScenePresentationLayer==="function"?renderStoryScenePresentationLayer:null;
if(PRE_RENDER){
  renderStoryScenePresentationLayer=function storySceneBoard33900RenderWrapper(){
    const result=PRE_RENDER.apply(this,arguments);
    renderStorySceneBoard33900();
    return result;
  };
}

// DOM observation is a safety net for overlay rebuilds that replace the stage
// after a Story render. Signature checks prevent our own board mutation looping.
if(typeof document!=="undefined"&&typeof MutationObserver==="function"){
  const target=document.getElementById("story-scene-presentation-layer")||document.body;
  if(target){observer=new MutationObserver(()=>scheduleBoardRender());observer.observe(target,{childList:true,subtree:true});}
}

// ---------------------------------------------------------------------------
// FIRST BENCHMARK CONSUMER — accepted Academy Kakashi rooftop/ANBU Origin.
// Unknown exchange participants stay generic; no identity is invented.
// ---------------------------------------------------------------------------
const A=globalThis.SC_ALPHA_ORIGIN_32900;
const kakashiScene=A&&A.sceneByVariant&&A.sceneByVariant.academy_kakashi||null;
const kakashiOccurrence="occ_origin_kakashi_anbu_retrieval_resolution";
const KAKASHI_IMAGE="Portraits/Academy Student/academy_student_kakashi.png";
const ANBU_IMAGE="NPC/konoha_anbu.png";
function kakashiActor(state,focus=false){return{id:"academy_kakashi",label:"KAKASHI",image:KAKASHI_IMAGE,state,focus};}
function anbuActor(state,focus=false){return{id:"konoha_anbu_contact",label:"ANBU OPERATIVE",image:ANBU_IMAGE,state,focus};}
function unknownActor(id,label,state,focus=false){return{id,label,state,focus};}
function kakashiCommittedFact(){
  try{return A&&typeof A.findOccurrence==="function"?A.findOccurrence(kakashiOccurrence):null;}catch(_error){return null;}
}
function kakashiBoardResolver({beatId,context}){
  const rooftop="KONOHA ROOFTOP",alley="KONOHA ALLEY";
  switch(beatId){
    case "kak_original_rooftop":return{mode:"conversation",location:rooftop,objective:"Identify why the masked operative has approached Kakashi.",actors:[kakashiActor("WAITING",true),anbuActor("ARRIVED")]};
    case "kak_original_anbu":return{mode:"conversation",location:rooftop,objective:"Hear the operative out.",actors:[kakashiActor("LISTENING"),anbuActor("SPEAKING",true)]};
    case "kak_original_envelope":return{mode:"conversation",location:rooftop,objective:"Inspect the Hokage-authorised assignment material.",actors:[kakashiActor("OPENING ENVELOPE",true),anbuActor("OBSERVING")],objects:[{label:"SEALED ENVELOPE",state:"OPENED"},{label:"TARGET IMAGE",state:"REVEALED"}]};
    case "kak_original_order":return{mode:"conversation",location:rooftop,objective:"Find the pictured target and keep the package from the wrong hands.",actors:[kakashiActor("ASSIGNMENT RECEIVED"),anbuActor("GIVING ORDERS",true)],objects:[{label:"TARGET IMAGE",state:"KNOWN TO KAKASHI"}]};
    case "kak_original_tail":return{mode:"encounter",location:alley,objective:"Tail the pictured target without losing the exchange.",actors:[kakashiActor("IN PURSUIT",true),unknownActor("kakashi_origin_logistics_clerk","TARGET","MEETING CONTACT"),unknownActor("kakashi_origin_information_broker","SECOND FIGURE","AT EXCHANGE")],objects:[{label:"PACKAGE",state:"BETWEEN BOTH MEN"}]};
    case "kak_original_action":return{mode:"encounter",location:alley,objective:"Choose Kakashi's approach before the handoff completes.",actors:[kakashiActor("UNDETECTED POSITION",true),unknownActor("kakashi_origin_logistics_clerk","TARGET","CURRENT CARRIER"),unknownActor("kakashi_origin_information_broker","SECOND FIGURE","RECEIVING CONTACT")],objects:[{label:"PACKAGE",state:"EXCHANGE IN PROGRESS"}]};
    case "kak_original_transfer":{
      const response={observe:"KAKASHI WATCHES THE HANDOFF",get_closer:"KAKASHI CLOSES THE DISTANCE",attack:"BOTH MEN REACT EARLY",attempt_pickpocket:"PICKPOCKET ATTEMPT — PACKAGE STILL REACHES SECOND MAN"}[context.kakashiOriginalAction]||"KAKASHI COMMITS TO THE OPENING";
      return{mode:"encounter",location:alley,objective:"Reassess: package, assassin and original target have separated.",reaction:response,actors:[kakashiActor("REASSESSING",true),unknownActor("kakashi_origin_logistics_clerk","ORIGINAL TARGET","FLEEING"),unknownActor("kakashi_origin_decoy_assassin_01","DECOY ASSASSIN","ATTACKING HOLDER")],objects:[{label:"PACKAGE",state:"SECOND MAN HAS PACKAGE"}]};
    }
    case "kak_original_major_choice":return{mode:"encounter",location:alley,objective:"Choose which problem Kakashi prioritizes.",actors:[kakashiActor("DECISION WINDOW",true),unknownActor("kakashi_origin_logistics_clerk","ORIGINAL TARGET","FLEEING"),unknownActor("kakashi_origin_decoy_assassin_01","DECOY ASSASSIN","ACTIVE")],objects:[{label:"PACKAGE",state:"SECOND MAN HAS PACKAGE"},{label:"CHOICE PRESSURE",state:"THREE SEPARATE PROBLEMS"}]};
    case "kak_original_secured":{
      const record=kakashiCommittedFact(),fact=record&&record.fact||{};
      return{mode:"consequence",location:alley,objective:"The retrieval result is now part of Kakashi's Chronicle.",committed:fact.packageDisposition==="secured",reaction:"PLAYER ACTION → PACKAGE CUSTODY SECURED",actors:[kakashiActor("PACKAGE SECURED",true),unknownActor("kakashi_origin_information_broker","SECOND MAN","PACKAGE RELINQUISHED"),unknownActor("kakashi_origin_decoy_assassin_01","DECOY ASSASSIN","SEPARATE COMPLICATION")],objects:[{label:"PACKAGE",state:fact.packageDisposition==="secured"?"SECURED BY KAKASHI":"RESOLVING"},{label:"ORIGINAL TARGET",state:"NOT PURSUED"}]};
    }
    case "kak_original_pursue":{
      const record=kakashiCommittedFact(),fact=record&&record.fact||{};
      return{mode:"consequence",location:alley,objective:"The retrieval result is now part of Kakashi's Chronicle.",committed:fact.packageDisposition==="lost",reaction:"PLAYER ACTION → ORIGINAL TARGET PURSUED",actors:[kakashiActor("IN PURSUIT",true),unknownActor("kakashi_origin_logistics_clerk","ORIGINAL TARGET","PURSUED"),unknownActor("kakashi_origin_information_broker","SECOND MAN","RETAINS PACKAGE")],objects:[{label:"PACKAGE",state:fact.packageDisposition==="lost"?"NOT RECOVERED BY KAKASHI":"RESOLVING"}]};
    }
    default:return null;
  }
}
if(kakashiScene)registerStorySceneBoardDefinition(kakashiScene,{benchmark:true,resolve:kakashiBoardResolver});

function runStorySceneBoard33900Diagnostics(){
  const source=renderStorySceneBoard33900.toString();
  const kak=registry.get(kakashiScene);
  const action=kak&&kak.resolve({beatId:"kak_original_action",context:{},runtime:null,beat:null});
  const transfer=kak&&kak.resolve({beatId:"kak_original_transfer",context:{kakashiOriginalAction:"attack"},runtime:null,beat:null});
  const checks={
    patchId:PATCH_ID==="story_scene_board_33900_2026_09_14",
    reusableRegistry:typeof registerStorySceneBoardDefinition==="function"&&typeof resolveStorySceneBoardProjection==="function",
    kakashiBenchmarkRegistered:!!kakashiScene&&!!kak&&kak.benchmark===true,
    exactAcademyKakashiPortrait:KAKASHI_IMAGE==="Portraits/Academy Student/academy_student_kakashi.png",
    exactAnbuNpcAsset:ANBU_IMAGE==="NPC/konoha_anbu.png",
    encounterHasThreeActors:!!action&&action.mode==="encounter"&&action.actors.length===3,
    playerIntentHasVisibleRuntimeResponse:!!transfer&&transfer.reaction==="BOTH MEN REACT EARLY"&&transfer.objects.some(row=>row.state==="SECOND MAN HAS PACKAGE"),
    projectionCommitsNoAuthority:!source.includes("commitOccurrence")&&!source.includes("savePlayerData")&&!source.includes("consumeStaticOriginSourceOccurrence"),
    wrapsExistingStoryRenderer:!!PRE_RENDER,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.registerStorySceneBoardDefinition=registerStorySceneBoardDefinition;
globalThis.unregisterStorySceneBoardDefinition=unregisterStorySceneBoardDefinition;
globalThis.resolveStorySceneBoardProjection=resolveStorySceneBoardProjection;
globalThis.getActiveStorySceneBoardProjection=getActiveStorySceneBoardProjection;
globalThis.renderStorySceneBoard33900=renderStorySceneBoard33900;
globalThis.runStorySceneBoard33900Diagnostics=runStorySceneBoard33900Diagnostics;
globalThis.SC_STORY_SCENE_BOARD_33900=Object.freeze({patchId:PATCH_ID,kakashiSceneId:kakashiScene,browserGoldenClaimed:false});

installStyle();
renderStorySceneBoard33900();
})();
