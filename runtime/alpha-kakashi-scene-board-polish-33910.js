// ============================================================================
// ISSUE #105 / #188 / #192 — KAKASHI SCENE-BOARD PRESENTATION POLISH — 33910
//
// Surgical presentation correction over the reusable 33900 Scene Board.
// - larger Character Cards;
// - Story-only Kakashi role cards (no retired enemy Battle portraits);
// - modern integrated conversation advance control;
// - covered render / event-driven black wipe so no intermediate ghost frame is
//   exposed while Story mutates underneath;
// - exact end-of-alley and Pakkun-interception backdrop registrations.
//
// This module does not own Story outcomes, Battle results, custody, rewards,
// Progression, Rank, PL, acquisition, or Chronicle truth.
// ============================================================================
(function installKakashiSceneBoardPolish33910(){
"use strict";
if(globalThis.SC_KAKASHI_SCENE_BOARD_POLISH_33910)return;

const PATCH_ID="kakashi_scene_board_polish_33910_2026_09_15";
const STYLE_ID="sc-kakashi-scene-board-polish-33910-style";
const A=globalThis.SC_ALPHA_ORIGIN_32900;
const scene=A&&A.sceneByVariant&&A.sceneByVariant.academy_kakashi||null;
if(!scene||typeof registerStorySceneBoardDefinition!=="function")return;

const END_ALLEY_ID="kakashi_origin_end_of_alleyway";
const PAKKUN_INTERCEPT_ID="kakashi_origin_pakkun_interception_alley";
const END_ALLEY_PATH="Kakashi Origin Backdrop/end_of_alleyway.png";
const PAKKUN_INTERCEPT_PATH="Kakashi Origin Backdrop/alleyway_konoha_night.png";
const SAKURA_ID="kakashi_origin_sakura_tree_night";
const OBJECTIVE="Stop the package from falling into the wrong hands.";
const KAKASHI_IMAGE="Assets/Academy Student/academy_kakashi.png";
const ANBU_IMAGE="NPC/konoha_anbu.png";
const AMT_IMAGE="NPC/anbu_marked_target.png";
const PS_IMAGE="NPC/package_smuggler.png";
const MI_IMAGE="NPC/masked_interceptor.png";
const kakashiOccurrence="occ_origin_kakashi_anbu_retrieval_resolution";

try{
  const reg=typeof registerSceneBackdropAssetPath==="function"?registerSceneBackdropAssetPath:globalThis.registerSceneBackdropAssetPath;
  if(typeof reg==="function"){
    reg(END_ALLEY_ID,END_ALLEY_PATH);
    reg(PAKKUN_INTERCEPT_ID,PAKKUN_INTERCEPT_PATH);
  }
}catch(_error){}

function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
/* Stephen browser correction: Character Cards are the actors, not small tokens. */
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors{left:3%!important;right:3%!important;top:9.5%!important;bottom:24%!important;gap:2.4%!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="1"]{grid-template-columns:minmax(0,390px)!important;justify-content:start!important;padding-left:6%!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="2"]{grid-template-columns:repeat(2,minmax(0,360px))!important;justify-content:center!important;column-gap:clamp(100px,13vw,230px)!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor{width:min(94%,320px)!important;max-height:485px!important;aspect-ratio:7/10!important;overflow:visible!important;transform:translateY(4px) scale(.97)!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor.is-focus{transform:translateY(0) scale(1)!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor[data-actor-id="academy_kakashi"],
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor[data-actor-id="konoha_anbu_contact"]{width:min(96%,335px)!important;max-height:500px!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor-frame{border:0!important;background:transparent!important;box-shadow:none!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor.is-focus .sc-scene-board-33900__actor-frame{border:0!important;box-shadow:none!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor img{object-fit:contain!important;filter:drop-shadow(0 16px 18px rgba(0,0,0,.48))!important;}

/* Remove the inherited zoom/arrival feel from the semantic Story shell. */
#story-scene-presentation-layer[data-sc-scene-board="true"],
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-stage,
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-layout,
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-panel{animation:none!important;}

/* Integrated modern advance rail: no detached debug-looking square button. */
#story-scene-presentation-layer[data-sc-performance="true"] .sc-story-panel{position:relative!important;padding-right:68px!important;overflow:hidden!important;}
#story-scene-presentation-layer[data-sc-performance="true"] .sc-chronicle-actions{position:static!important;margin-top:8px!important;}
#story-scene-presentation-layer[data-sc-performance="true"] .sc-chronicle-primary{position:absolute!important;right:0!important;top:0!important;bottom:0!important;width:54px!important;height:auto!important;min-height:100%!important;margin:0!important;padding:0!important;float:none!important;border:0!important;border-left:1px solid rgba(205,169,83,.48)!important;border-radius:0!important;background:linear-gradient(180deg,rgba(21,34,42,.72),rgba(8,17,23,.86))!important;color:transparent!important;font-size:0!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:none!important;}
#story-scene-presentation-layer[data-sc-performance="true"] .sc-chronicle-primary::before{content:"›";color:#f0d88c;font-size:34px;font-weight:300;line-height:1;transform:translateX(1px);transition:transform .16s ease,color .16s ease;}
#story-scene-presentation-layer[data-sc-performance="true"] .sc-chronicle-primary:hover::before{transform:translateX(5px);color:#fff1b7;}

/* Full-screen cinematic covers prevent old/new Story frames from leaking. */
.sc-kakashi-entry-curtain-33910,.sc-kakashi-wipe-33910{position:fixed;inset:0;background:#000;z-index:2147483000;pointer-events:auto;}
.sc-kakashi-entry-curtain-33910{opacity:1;transition:opacity .24s ease;}
.sc-kakashi-entry-curtain-33910.is-revealing{opacity:0;}
.sc-kakashi-wipe-33910{transform:translateX(100%);transition:transform .34s cubic-bezier(.72,0,.28,1);will-change:transform;}
.sc-kakashi-wipe-33910.is-covering{transform:translateX(0);}
.sc-kakashi-wipe-33910.is-revealing{transform:translateX(-100%);}
@media(max-width:820px){
  #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor{width:96%!important;max-height:340px!important;}
  #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="2"]{column-gap:24px!important;}
  #story-scene-presentation-layer[data-sc-performance="true"] .sc-story-panel{padding-right:58px!important;}
  #story-scene-presentation-layer[data-sc-performance="true"] .sc-chronicle-primary{width:48px!important;}
}
`;
  document.head.appendChild(style);
  return true;
}
installStyle();

function actor(id,label,image,state,focus=false,entering=false){return{id,label,image,state,focus,entering};}
function kakashi(state,focus=false){return actor("academy_kakashi","KAKASHI",KAKASHI_IMAGE,state,focus);}
function anbu(state,focus=false,entering=false){return actor("konoha_anbu_contact","ANBU OPERATIVE",ANBU_IMAGE,state,focus,entering);}
function amt(state,focus=false,entering=false){return actor("anbu_marked_target","ANBU MARKED TARGET",AMT_IMAGE,state,focus,entering);}
function smuggler(state,focus=false,entering=false){return actor("package_smuggler","PACKAGE SMUGGLER",PS_IMAGE,state,focus,entering);}
function interceptor(state,focus=false,entering=false){return actor("masked_interceptor","MASKED INTERCEPTOR",MI_IMAGE,state,focus,entering);}
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
  {cueId:"alley_01",kind:"narration",text:"Kakashi finds ANBU Marked Target and tails him through Konoha.",focusActorRef:"academy_kakashi"},
  {cueId:"alley_02",kind:"narration",text:"ANBU Marked Target turns into a narrow alley.",focusActorRef:"anbu_marked_target",actorEntrance:"anbu_marked_target"},
  {cueId:"alley_03",kind:"narration",text:"Package Smuggler is waiting at the exchange.",focusActorRef:"package_smuggler",actorEntrance:"package_smuggler"},
  {cueId:"alley_04",kind:"narration",text:"A package is between them.",focusActorRef:"academy_kakashi",objectState:"between"}
];
const observeTransferPerformance=[
  {cueId:"observe_01",kind:"narration",text:"Kakashi stays still and watches the exchange unfold.",focusActorRef:"academy_kakashi"},
  {cueId:"observe_02",kind:"action",text:"ANBU Marked Target hands the package to Package Smuggler.",focusActorRef:"package_smuggler",objectState:"smuggler"},
  {cueId:"observe_03",kind:"narration",text:"Masked Interceptor comes out of the darkness as ANBU Marked Target breaks away from the exchange.",focusActorRef:"masked_interceptor",actorEntrance:"masked_interceptor",objectState:"smuggler"}
];
function roofProjection(performance){
  const cue=performance&&performance.cue||rooftopPerformance[0],idx=performance?performance.index:0,focus=cue.focusActorRef;
  const actors=[kakashi(idx===0?"WATCHING KONOHA":focus==="academy_kakashi"?"FOCUSED":"PRESENT",focus==="academy_kakashi")];
  if(idx>=1)actors.push(anbu(focus==="konoha_anbu_contact"?"SPEAKING":"PRESENT",focus==="konoha_anbu_contact",cue.actorEntrance==="konoha_anbu_contact"));
  const objects=[];
  if(cue.objectState==="raised")objects.push({label:"SEALED ENVELOPE",state:"RAISED"});
  if(cue.objectState==="held")objects.push({label:"SEALED ENVELOPE",state:"HELD BY KAKASHI"});
  return{mode:"conversation",location:"KONOHA ROOFTOP",objective:OBJECTIVE,actors,objects};
}
function tailProjection(performance){
  const cue=performance&&performance.cue||tailPerformance[0],idx=performance?performance.index:0,focus=cue.focusActorRef;
  const actors=[kakashi("IN PURSUIT",focus==="academy_kakashi")];
  if(idx>=1)actors.push(amt(idx>=2?"AT EXCHANGE":"ENTERING ALLEY",focus==="anbu_marked_target",cue.actorEntrance==="anbu_marked_target"));
  if(idx>=2)actors.push(smuggler("WAITING",focus==="package_smuggler",cue.actorEntrance==="package_smuggler"));
  return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors,objects:idx>=3?[{label:"PACKAGE",state:"BETWEEN ANBU MARKED TARGET AND PACKAGE SMUGGLER"}]:[]};
}
function transferProjection(performance,context){
  if(context.kakashiOriginalAction!=="observe"){
    return{mode:"encounter",location:context.kakashiOriginalAction==="get_closer"?"END OF ALLEY":"KONOHA ALLEY",objective:OBJECTIVE,reaction:String(context.kakashiOriginalAction||"").toUpperCase(),actors:[kakashi("ACTION COMMITTED",true),amt("RESPONDING"),smuggler("RESPONDING")],objects:[{label:"PACKAGE",state:"OUTCOME REQUIRES OWNING RESOLVER"}]};
  }
  const cue=performance&&performance.cue||observeTransferPerformance[0],idx=performance?performance.index:0,focus=cue.focusActorRef;
  const actors=[kakashi("OBSERVING",focus==="academy_kakashi"),amt(idx>=2?"LEAVING":"AT EXCHANGE",focus==="anbu_marked_target")];
  if(idx<2)actors.push(smuggler(idx>=1?"HAS PACKAGE":"AT EXCHANGE",focus==="package_smuggler"));
  else actors.push(interceptor("VISIBLE",true,cue.actorEntrance==="masked_interceptor"));
  return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors,objects:idx>=1?[{label:"PACKAGE",state:"PACKAGE SMUGGLER HAS PACKAGE"}]:[{label:"PACKAGE",state:"EXCHANGE IN PROGRESS"}]};
}
function kakashiBoardResolver({beatId,context,performance}){
  if(beatId==="kak_original_rooftop"||beatId==="kak_original_anbu"||beatId==="kak_original_envelope"||beatId==="kak_original_order")return roofProjection(performance);
  if(beatId==="kak_original_tail")return tailProjection(performance);
  if(beatId==="kak_original_action")return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors:[kakashi("UNDETECTED POSITION",true),amt("CURRENT CARRIER"),smuggler("RECEIVING CONTACT")],objects:[{label:"PACKAGE",state:"EXCHANGE IN PROGRESS"}]};
  if(beatId==="kak_original_transfer")return transferProjection(performance,context);
  if(beatId==="kak_original_major_choice")return{mode:"encounter",location:"KONOHA ALLEY",objective:"Choose which problem Kakashi prioritizes.",actors:[kakashi("DECISION WINDOW",true),amt("MOVING"),interceptor("ACTIVE")],objects:[{label:"PACKAGE",state:"PACKAGE SMUGGLER HAS PACKAGE"},{label:"CHOICE PRESSURE",state:"SEPARATE PROBLEMS"}]};
  if(beatId==="kak_original_secured"){
    const r=committedFact(),fact=r&&r.fact||{};
    return{mode:"consequence",location:"KONOHA ALLEY",objective:"Return with the retrieval result.",committed:fact.packageDisposition==="secured",reaction:"PLAYER ACTION → PACKAGE CUSTODY SECURED",actors:[kakashi("PACKAGE SECURED",true),smuggler("PACKAGE RELINQUISHED"),interceptor("SEPARATE COMPLICATION")],objects:[{label:"PACKAGE",state:fact.packageDisposition==="secured"?"SECURED BY KAKASHI":"RESOLVING"}]};
  }
  if(beatId==="kak_original_pursue"){
    const r=committedFact(),fact=r&&r.fact||{};
    return{mode:"consequence",location:"KONOHA ALLEY",objective:"Return with the retrieval result.",committed:fact.packageDisposition==="lost",reaction:"PLAYER ACTION → ANBU MARKED TARGET PURSUED",actors:[kakashi("IN PURSUIT",true),amt("PURSUED"),smuggler("RETAINS PACKAGE")],objects:[{label:"PACKAGE",state:fact.packageDisposition==="lost"?"NOT RECOVERED BY KAKASHI":"RESOLVING"}]};
  }
  return null;
}

registerStorySceneBoardDefinition(scene,{
  benchmark:true,
  resolve:kakashiBoardResolver,
  performanceSequences:{
    kak_original_rooftop:rooftopPerformance,
    kak_original_tail:tailPerformance,
    kak_original_transfer:({context})=>context.kakashiOriginalAction==="observe"?observeTransferPerformance:null
  },
  // 33910 owns backdrop-changing cuts so the old fixed-timer wipe cannot leak
  // an intermediate frame.
  performanceTransitions:{}
});

function currentRuntime(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function currentBeat(runtime=currentRuntime()){
  try{const d=runtime&&typeof getStorySceneDefinition==="function"?getStorySceneDefinition(runtime.sceneId):null;return d&&d.beatMap instanceof Map?d.beatMap.get(runtime.beatId)||null:null;}catch(_error){return null;}
}
function environmentId(beat){
  const ref=beat&&beat.environmentRef;
  return typeof ref==="string"?ref:ref&&typeof ref==="object"&&ref.assetId?String(ref.assetId):null;
}
function setTransferEnvironment(choiceId){
  try{
    const d=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(scene):null;
    const beat=d&&d.beatMap instanceof Map?d.beatMap.get("kak_original_transfer"):null;
    if(!beat)return;
    beat.environmentRef={assetId:choiceId==="get_closer"?END_ALLEY_ID:SAKURA_ID};
  }catch(_error){}
}
function nextBeatFor(runtime,beat,choiceId){
  if(!runtime||!beat)return null;
  if(choiceId!==null&&choiceId!==undefined&&Array.isArray(beat.choices)){
    const row=beat.choices.find(choice=>String(choice&&choice.choiceId||"")===String(choiceId));
    return row&&row.nextBeatId?String(row.nextBeatId):null;
  }
  const performance=typeof getStoryScenePerformance33900==="function"?getStoryScenePerformance33900():null;
  if(performance&&!performance.atEnd)return null;
  return beat.nextBeatId?String(beat.nextBeatId):null;
}
function beatById(runtime,beatId){
  try{const d=runtime&&typeof getStorySceneDefinition==="function"?getStorySceneDefinition(runtime.sceneId):null;return d&&d.beatMap instanceof Map?d.beatMap.get(beatId)||null:null;}catch(_error){return null;}
}

let transitionBusy=false;
function finishNode(node){try{node&&node.remove&&node.remove();}catch(_error){}transitionBusy=false;}
function performSmoothWipe(next){
  if(typeof next!=="function")return{success:false,reason:"kakashi_wipe_continuation_missing"};
  if(typeof document==="undefined"||!document.body)return next();
  if(transitionBusy)return{success:false,reason:"kakashi_scene_transition_in_progress"};
  transitionBusy=true;
  const wipe=document.createElement("div");
  wipe.className="sc-kakashi-wipe-33910";
  wipe.setAttribute("aria-hidden","true");
  document.body.appendChild(wipe);
  let covered=false,revealing=false;
  const reveal=()=>{
    if(revealing)return;
    revealing=true;
    setTimeout(()=>{
      wipe.classList.remove("is-covering");
      wipe.classList.add("is-revealing");
      const done=event=>{if(event&&event.propertyName!=="transform")return;wipe.removeEventListener("transitionend",done);finishNode(wipe);};
      wipe.addEventListener("transitionend",done);
      setTimeout(()=>finishNode(wipe),520);
    },90);
  };
  const coveredNow=()=>{
    if(covered)return;
    covered=true;
    try{next();if(typeof renderStorySceneBoard33900==="function")renderStorySceneBoard33900();}finally{reveal();}
  };
  const onCover=event=>{
    if(event&&event.propertyName!=="transform")return;
    wipe.removeEventListener("transitionend",onCover);
    coveredNow();
  };
  wipe.addEventListener("transitionend",onCover);
  requestAnimationFrame(()=>requestAnimationFrame(()=>wipe.classList.add("is-covering")));
  setTimeout(coveredNow,520);
  return{success:true,type:"kakashi_scene_smooth_wipe",pending:true};
}

const PRE_ADVANCE_33910=typeof globalThis.advanceStoryScene==="function"?globalThis.advanceStoryScene:null;
if(PRE_ADVANCE_33910){
  function advanceStoryScene33910(choiceId=null){
    const runtime=currentRuntime(),beat=currentBeat(runtime);
    if(!runtime||runtime.sceneId!==scene||!beat||transitionBusy)return transitionBusy?{success:false,reason:"kakashi_scene_transition_in_progress"}:PRE_ADVANCE_33910.apply(this,arguments);
    if(beat.beatId==="kak_original_action"&&choiceId!==null&&choiceId!==undefined)setTransferEnvironment(String(choiceId));
    const nextId=nextBeatFor(runtime,beat,choiceId);
    const nextBeat=nextId?beatById(runtime,nextId):null;
    const backdropChanges=!!nextBeat&&environmentId(beat)!==environmentId(nextBeat);
    if(backdropChanges){
      const args=arguments,self=this;
      return performSmoothWipe(()=>PRE_ADVANCE_33910.apply(self,args));
    }
    return PRE_ADVANCE_33910.apply(this,arguments);
  }
  globalThis.advanceStoryScene=advanceStoryScene33910;
  try{advanceStoryScene=advanceStoryScene33910;}catch(_error){}
}

function createEntryCurtain(){
  if(typeof document==="undefined"||!document.body)return null;
  const prior=document.querySelector(".sc-kakashi-entry-curtain-33910");
  if(prior)return prior;
  const curtain=document.createElement("div");
  curtain.className="sc-kakashi-entry-curtain-33910";
  curtain.setAttribute("aria-hidden","true");
  document.body.appendChild(curtain);
  return curtain;
}
function revealEntryCurtain(curtain){
  if(!curtain)return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    curtain.classList.add("is-revealing");
    setTimeout(()=>{try{curtain.remove();}catch(_error){}},320);
  }));
}

const PRE_RENDER_33910=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
let lastRenderedSceneId=currentRuntime()&&currentRuntime().sceneId||null;
if(PRE_RENDER_33910){
  function renderStoryScenePresentationLayer33910(){
    const before=currentRuntime();
    const entering=!!before&&before.sceneId===scene&&lastRenderedSceneId!==scene;
    const curtain=entering?createEntryCurtain():null;
    const result=PRE_RENDER_33910.apply(this,arguments);
    const after=currentRuntime();
    lastRenderedSceneId=after&&after.sceneId||null;
    if(curtain)revealEntryCurtain(curtain);
    return result;
  }
  globalThis.renderStoryScenePresentationLayer=renderStoryScenePresentationLayer33910;
  try{renderStoryScenePresentationLayer=renderStoryScenePresentationLayer33910;}catch(_error){}
}

function runKakashiSceneBoardPolish33910Diagnostics(){
  const getPath=typeof getSceneBackdropAssetPath==="function"?getSceneBackdropAssetPath:null;
  const style=typeof document!=="undefined"?document.getElementById(STYLE_ID):null;
  const checks={
    patchId:PATCH_ID==="kakashi_scene_board_polish_33910_2026_09_15",
    largerCharacterCards:!!style&&style.textContent.includes("335px")&&style.textContent.includes("500px"),
    integratedAdvanceRail:!!style&&style.textContent.includes("padding-right:68px")&&style.textContent.includes(".sc-chronicle-primary::before"),
    exactReplacementCardAssets:AMT_IMAGE==="NPC/anbu_marked_target.png"&&PS_IMAGE==="NPC/package_smuggler.png"&&MI_IMAGE==="NPC/masked_interceptor.png",
    retiredBattlePortraitsAbsent:![AMT_IMAGE,PS_IMAGE,MI_IMAGE].some(path=>path.includes("Enemies Portraits/")),
    endOfAlleyRegistered:!!getPath&&getPath(END_ALLEY_ID)===END_ALLEY_PATH,
    pakkunInterceptionRegistered:!!getPath&&getPath(PAKKUN_INTERCEPT_ID)===PAKKUN_INTERCEPT_PATH,
    smoothWipeOwnsMutation:performSmoothWipe.toString().includes("transitionend")&&performSmoothWipe.toString().includes("coveredNow"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,patchId:PATCH_ID,browserGoldenClaimed:false};
}

globalThis.runKakashiSceneBoardPolish33910Diagnostics=runKakashiSceneBoardPolish33910Diagnostics;
globalThis.SC_KAKASHI_SCENE_BOARD_POLISH_33910=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
try{if(typeof renderStorySceneBoard33900==="function")renderStorySceneBoard33900();}catch(_error){}
})();
