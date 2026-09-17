// ============================================================================
// ISSUE #188 — KAKASHI TERMINAL SCENE BOARD ASSET BINDING — 35610
//
// Presentation-only completion for the existing 35100 terminal sequence.
// Reuses the existing Story Scene Board DOM/CSS and the same Story occurrence.
// It binds approved repository assets; it owns no World Truth, reward, custody,
// promotion, relationship, or Knowledge state.
// ============================================================================
(function installAcademyKakashiTerminalSceneBoard35610(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_TERMINAL_SCENE_BOARD_35610)return;

const PATCH_ID="alpha_kakashi_terminal_scene_board_35610_v1_2026_09_17";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const HOKAGE_ENV_ID="kakashi_origin_hokage_administration_interior_night";
const HOKAGE_ENV_PATH="Kakashi Origin Backdrop/hokage_administration_interior_night.png";
const KAKASHI_IMAGE="Assets/Academy Student/academy_kakashi.png";
const ANBU_IMAGE="NPC/konoha_anbu.png";
const MINATO_IMAGE="Portraits/Kage/kage_minato.png";
const DEBRIEF_BEAT="kak_terminal_debrief_report_35100";
const SUMMARY_BEAT="kak_terminal_debrief_summary_35100";
const PAKKUN_BEATS=new Set([
  "kak_terminal_pakkun_departure_1_35100",
  "kak_terminal_pakkun_departure_2_35100",
  "kak_terminal_pakkun_departure_3_35100",
  "kak_terminal_pakkun_departure_exit_35100"
]);
const MINATO_BEAT="kak_terminal_minato_private_evaluation_35100";
const RECEIPT_BEAT="kak_terminal_chronicle_receipt_35100";
const FINAL_BEAT="kak_terminal_chronicle_begins_35100";
const TERMINAL_BEATS=new Set([DEBRIEF_BEAT,SUMMARY_BEAT,...PAKKUN_BEATS,MINATO_BEAT,RECEIPT_BEAT,FINAL_BEAT]);
const ENV_REF=Object.freeze({assetId:HOKAGE_ENV_ID});
let scheduled=false,observer=null;

function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function escapeHTML(value){return String(value??"").replace(/[&<>\"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function actorMarkup(actor){
  return `<figure class="sc-scene-board-33900__actor ${actor.focus?"is-focus":""}" data-actor-id="${escapeHTML(actor.id)}"><div class="sc-scene-board-33900__actor-frame"></div><img src="${escapeHTML(actor.image)}" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>${escapeHTML(actor.label)}</strong>${actor.state?`<small>${escapeHTML(actor.state)}</small>`:""}</figcaption></figure>`;
}
function terminalSpec(beatId){
  if(beatId===DEBRIEF_BEAT)return{location:"HOKAGE ADMINISTRATION · NIGHT",objective:"Report the committed field facts.",actors:[
    {id:"academy_kakashi",image:KAKASHI_IMAGE,label:"KAKASHI",state:"FIELD REPORT",focus:false},
    {id:"konoha_anbu_contact",image:ANBU_IMAGE,label:"ANBU OPERATIVE",state:"RECEIVING REPORT",focus:true}
  ]};
  if(beatId===SUMMARY_BEAT)return{location:"HOKAGE ADMINISTRATION · NIGHT",objective:"Preserve the mission record exactly as committed.",actors:[
    {id:"academy_kakashi",image:KAKASHI_IMAGE,label:"KAKASHI",state:"REPORT COMPLETE",focus:true},
    {id:"konoha_anbu_contact",image:ANBU_IMAGE,label:"ANBU OPERATIVE",state:"MISSION RECORD",focus:false}
  ]};
  if(beatId===MINATO_BEAT)return{location:"HOKAGE ADMINISTRATION · PRIVATE OFFICE",objective:"Private evaluation of the sealed field record.",actors:[
    {id:"minato_private_evaluation",image:MINATO_IMAGE,label:"MINATO NAMIKAZE",state:"PRIVATE EVALUATION",focus:true}
  ]};
  return null;
}

function bindTerminalEnvironment(){
  try{
    const reg=typeof registerSceneBackdropAssetPath==="function"?registerSceneBackdropAssetPath:globalThis.registerSceneBackdropAssetPath;
    if(typeof reg==="function")reg(HOKAGE_ENV_ID,HOKAGE_ENV_PATH);
  }catch(_error){}
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_terminal_scene_board_story_definition_missing"};
  for(const beatId of TERMINAL_BEATS){
    const beat=def.beatMap.get(beatId);
    if(beat)beat.environmentRef=ENV_REF;
  }
  return{success:true};
}

function renderTerminalActors(){
  scheduled=false;
  if(typeof document==="undefined")return false;
  const rt=active();
  if(!rt||rt.sceneId!==SCENE_ID)return false;
  const spec=terminalSpec(String(rt.beatId||""));
  if(!spec)return false;
  const layer=document.getElementById("story-scene-presentation-layer");
  if(!layer)return false;
  const stage=layer.querySelector&&layer.querySelector(".sc-chronicle-stage");
  if(!stage)return false;

  let board=stage.querySelector&&stage.querySelector('.sc-scene-board-33900[data-sc-kakashi-terminal="true"]');
  // 33900 can legitimately have no registered projection for 35100-added beats.
  // Add only the standard Scene Board markup/classes; no second Story runtime.
  if(!board){
    board=document.createElement("div");
    board.className="sc-scene-board-33900";
    board.dataset.scKakashiTerminal="true";
    stage.appendChild(board);
  }
  const actors=spec.actors.slice(0,3);
  board.innerHTML=`<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">${escapeHTML(spec.location)}</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(spec.objective)}</div></div><div class="sc-scene-board-33900__actors" data-count="${actors.length}">${actors.map(actorMarkup).join("")}</div>`;
  if(layer.dataset){layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode="terminal";}
  return true;
}

function scheduleRender(){
  if(scheduled)return;
  scheduled=true;
  const run=()=>{try{renderTerminalActors();}catch(_error){scheduled=false;}};
  if(typeof queueMicrotask==="function")queueMicrotask(run);else if(typeof setTimeout==="function")setTimeout(run,0);else run();
}

function installRenderHook(){
  if(typeof document==="undefined")return false;
  const prior=globalThis.renderStorySceneBoard33900;
  if(typeof prior==="function"&&!prior.__kakashiTerminal35610){
    const wrapped=function(...args){const result=prior.apply(this,args);scheduleRender();return result;};
    wrapped.__kakashiTerminal35610=true;
    wrapped.__prior33900=prior;
    globalThis.renderStorySceneBoard33900=wrapped;
  }
  try{
    if(typeof MutationObserver==="function"&&document.body&&!observer){
      observer=new MutationObserver(()=>scheduleRender());
      observer.observe(document.body,{childList:true,subtree:true});
    }
  }catch(_error){}
  scheduleRender();
  return true;
}

function diagnostics(){
  const def=scene(),get=id=>def&&def.beatMap instanceof Map?def.beatMap.get(id):null;
  const minato=get(MINATO_BEAT),report=get(DEBRIEF_BEAT),summary=get(SUMMARY_BEAT);
  const minatoSpec=terminalSpec(MINATO_BEAT);
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_terminal_scene_board_35610_v1_2026_09_17",
    backdropExact:HOKAGE_ENV_PATH==="Kakashi Origin Backdrop/hokage_administration_interior_night.png",
    minatoPortraitExact:MINATO_IMAGE==="Portraits/Kage/kage_minato.png",
    reportBackdropBound:!!report&&report.environmentRef&&report.environmentRef.assetId===HOKAGE_ENV_ID,
    summaryBackdropBound:!!summary&&summary.environmentRef&&summary.environmentRef.assetId===HOKAGE_ENV_ID,
    minatoBackdropBound:!!minato&&minato.environmentRef&&minato.environmentRef.assetId===HOKAGE_ENV_ID,
    anbuReportProjectsKakashiAndAnbu:terminalSpec(DEBRIEF_BEAT).actors.map(x=>x.id).join("|")==="academy_kakashi|konoha_anbu_contact",
    minatoPrivateCutawayOnly:!!minatoSpec&&minatoSpec.actors.length===1&&minatoSpec.actors[0].id==="minato_private_evaluation",
    kakashiAbsentFromMinatoCutaway:!!minatoSpec&&!minatoSpec.actors.some(x=>x.id==="academy_kakashi"),
    presentationOwnsNoFacts:!renderTerminalActors.toString().includes("commitOccurrence")&&!renderTerminalActors.toString().includes("savePlayerData"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const environment=bindTerminalEnvironment();
const renderHook=installRenderHook();
globalThis.runAcademyKakashiTerminalSceneBoard35610Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_TERMINAL_SCENE_BOARD_35610=Object.freeze({
  patchId:PATCH_ID,environment,renderHook,backdropPath:HOKAGE_ENV_PATH,minatoPortraitPath:MINATO_IMAGE,browserGoldenClaimed:false
});
})();
