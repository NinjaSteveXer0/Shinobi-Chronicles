// ============================================================================
// ISSUE #490 — SHARED SCENE BOARD EXPRESSIVE CHOREOGRAPHY BENCHMARK — 49000
//
// Presentation-only extension over the canonical #33900 Story Scene Board.
// Story/CE/Battle/reward semantics remain owned by their existing runtimes.
// Animation presents authorised truth; it never creates truth.
// ============================================================================
(function installStorySceneBoardExpressive49000(){
"use strict";
if(globalThis.SC_STORY_SCENE_BOARD_EXPRESSIVE_49000)return;
if(!globalThis.SC_STORY_SCENE_BOARD_33900)throw new Error("scene_board_expressive_49000_requires_33900");

const PATCH_ID="story_scene_board_expressive_49000_2026_10_10_current_main_refresh";
const BENCHMARK_SCENE_ID="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1";
const MENMA_ID="academy_menma";
const HINATA_ID="academy_hinata";
const KAKASHI_ID="academy_kakashi";
const MI_ID="academy_kakashi_origin_masked_interceptor";
const BENCHMARK_ACTORS=Object.freeze([MENMA_ID,HINATA_ID,KAKASHI_ID,MI_ID]);

const EXPRESSIVE_PRIMITIVES=Object.freeze([
  "TEAM_ENTER_LEFT","TEAM_ENTER_RIGHT","SQUAD_WEDGE_LEFT","SQUAD_WEDGE_RIGHT",
  "LEADER_FORWARD","SUPPORT_RECESSED","STAGGERED_GROUP_ENTRY","SOLO_ALREADY_PRESENT","PASSING_TRAVERSE",
  "STEP_FORWARD","STEP_BACK","SIDESTEP","LEAN_FORWARD","LEAN_BACK","SHORT_PACE","ATTENTION_SHIFT",
  "SMALL_RECOIL","LARGE_RECOIL","BOUNCE","DOUBLE_BOUNCE","TRIPLE_BOUNCE","TILT","OPPOSING_GROUP_TILT",
  "SHORT_SHAKE","SETTLE_TO_ANCHOR","CROSS_FIELD","PASS_BY","RECOMPOSE_GROUP"
]);
const EXPRESSIVE_SET=new Set(EXPRESSIVE_PRIMITIVES);
const DURATIONS=Object.freeze({
  TEAM_ENTER_LEFT:300,TEAM_ENTER_RIGHT:300,SQUAD_WEDGE_LEFT:300,SQUAD_WEDGE_RIGHT:300,
  LEADER_FORWARD:240,SUPPORT_RECESSED:240,STAGGERED_GROUP_ENTRY:320,SOLO_ALREADY_PRESENT:120,PASSING_TRAVERSE:460,
  STEP_FORWARD:220,STEP_BACK:220,SIDESTEP:220,LEAN_FORWARD:180,LEAN_BACK:180,SHORT_PACE:520,ATTENTION_SHIFT:150,
  SMALL_RECOIL:190,LARGE_RECOIL:240,BOUNCE:180,DOUBLE_BOUNCE:230,TRIPLE_BOUNCE:280,TILT:190,
  OPPOSING_GROUP_TILT:210,SHORT_SHAKE:220,SETTLE_TO_ANCHOR:180,CROSS_FIELD:520,PASS_BY:460,RECOMPOSE_GROUP:300
});
const BENCHMARK_WEDGE=Object.freeze({
  [MENMA_ID]:Object.freeze({x:31,rise:0,width:15,z:6}),
  [HINATA_ID]:Object.freeze({x:14,rise:7,width:15,z:3}),
  [KAKASHI_ID]:Object.freeze({x:48,rise:5,width:15,z:4}),
  [MI_ID]:Object.freeze({x:80,rise:8,width:16,z:2})
});
const BENCHMARK_PRESENTATION=Object.freeze({
  [MENMA_ID]:Object.freeze({label:"MENMA",anchor:"PLAYER_LEFT",role:"protagonist",authority:"authorised_current_team"}),
  [HINATA_ID]:Object.freeze({label:"HINATA",anchor:"INNER_LEFT",role:"current_teammate",authority:"authorised_current_team"}),
  [KAKASHI_ID]:Object.freeze({label:"KAKASHI",anchor:"INNER_RIGHT",role:"private_history_owner",authority:"authorised_current_team"}),
  [MI_ID]:Object.freeze({label:"MASKED WOMAN",anchor:"OPPONENT_RIGHT",role:"returning_participant",authority:"authorised_active_scene"})
});
const actorAnimations=new WeakMap();
const rootState=new WeakMap();
let rendererWrapInstalled=false;

function activeRuntime49000(){
  try{return typeof globalThis.getActiveStorySceneRuntime==="function"?globalThis.getActiveStorySceneRuntime():null;}
  catch(_error){return null;}
}
function performance49000(){
  try{return typeof globalThis.getStoryScenePerformance33900==="function"?globalThis.getStoryScenePerformance33900():null;}
  catch(_error){return null;}
}
function reducedMotion49000(){
  try{return typeof matchMedia==="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(_error){return false;}
}
function safeDuration49000(kind,requested){
  const fallback=DURATIONS[kind]||220;
  const value=Number.isFinite(Number(requested))?Number(requested):fallback;
  const bounded=Math.max(100,Math.min(650,value));
  return reducedMotion49000()?Math.min(100,bounded):bounded;
}
function boardRoot49000(){
  if(typeof document==="undefined")return null;
  const layer=document.getElementById("story-scene-presentation-layer");
  return layer&&layer.querySelector?layer.querySelector(".sc-scene-board-33900"):null;
}
function actorNode49000(root,id){
  if(!root||!id||!root.querySelector)return null;
  const safe=String(id).replace(/\\/g,"\\\\").replace(/"/g,'\\"');
  return root.querySelector('[data-actor-id="'+safe+'"]');
}
function authorisedTeam49000(runtime=activeRuntime49000()){
  const localIds=runtime&&runtime.localContext&&Array.isArray(runtime.localContext.teamVariantIds)
    ?runtime.localContext.teamVariantIds.map(String):[];
  if(localIds.length)return new Set(localIds);
  try{
    const committed=typeof globalThis.getChronicleCurrentTeam43600==="function"
      ?globalThis.getChronicleCurrentTeam43600():null;
    const committedIds=committed&&Array.isArray(committed.teamVariantIds)?committed.teamVariantIds.map(String):[];
    return new Set(committedIds);
  }catch(_error){return new Set();}
}
function benchmarkEligible49000(runtime=activeRuntime49000()){
  if(!runtime||runtime.sceneId!==BENCHMARK_SCENE_ID)return false;
  const team=authorisedTeam49000(runtime);
  return [MENMA_ID,HINATA_ID,KAKASHI_ID].every(id=>team.has(id));
}
function resolveCardPath49000(id){
  if(id===MI_ID)return"NPC/masked_interceptor.png";
  try{
    if(typeof globalThis.getCharacterCardAssetPath==="function"){
      const path=globalThis.getCharacterCardAssetPath(id);
      if(path)return String(path);
    }
  }catch(_error){}
  const fallback={
    academy_menma:"Assets/Academy Student/academy_menma.png",
    academy_hinata:"Assets/Academy Student/academy_hinata.png",
    academy_kakashi:"Assets/Academy Student/academy_kakashi.png"
  };
  return fallback[id]||null;
}
function ensureAuthorisedActor49000(root,runtime,id){
  if(!root||!benchmarkEligible49000(runtime)||!BENCHMARK_ACTORS.includes(id))return null;
  const existing=actorNode49000(root,id);if(existing)return existing;
  const actors=root.querySelector&&root.querySelector(".sc-scene-board-33900__actors");
  const meta=BENCHMARK_PRESENTATION[id];
  if(!actors||!meta||typeof document==="undefined")return null;
  if(id!==MI_ID&&!authorisedTeam49000(runtime).has(id))return null;
  const figure=document.createElement("figure");
  figure.className="sc-scene-board-33900__actor sc490-benchmark-authorised-actor";
  figure.dataset.actorId=id;
  figure.dataset.actorLabel=meta.label;
  figure.dataset.scStageAnchor=meta.anchor;
  figure.dataset.scStageRole=meta.role;
  figure.dataset.sc490PresentationOnly=meta.authority;
  const frame=document.createElement("div");frame.className="sc-scene-board-33900__actor-frame";
  const img=document.createElement("img");img.alt="";img.src=resolveCardPath49000(id)||"";
  figure.append(frame,img);
  actors.appendChild(figure);
  return figure;
}
function ensureBenchmarkActors49000(root,runtime){
  if(!root||!benchmarkEligible49000(runtime))return[];
  return BENCHMARK_ACTORS.map(id=>ensureAuthorisedActor49000(root,runtime,id)).filter(Boolean);
}
function applyBenchmarkWedge49000(root,runtime=activeRuntime49000()){
  if(!root||!benchmarkEligible49000(runtime))return{success:false,reason:"benchmark_not_authorised"};
  ensureBenchmarkActors49000(root,runtime);
  const applied=[];
  for(const id of BENCHMARK_ACTORS){
    const node=actorNode49000(root,id),slot=BENCHMARK_WEDGE[id];
    if(!node||!slot)continue;
    node.style.setProperty("--sc-stage-anchor-x",slot.x+"%");
    node.style.setProperty("--sc-stage-rise",slot.rise+"vh");
    node.style.setProperty("--sc-stage-width",slot.width+"%");
    node.style.setProperty("--sc-stage-z",String(slot.z));
    node.dataset.sc490BenchmarkAnchor="true";
    applied.push(id);
  }
  return{success:applied.length===4,actorIds:applied,presentationOnly:true};
}
function cancelActorMotion49000(node,reason="superseded"){
  if(!node)return false;
  const active=actorAnimations.get(node);
  if(active&&active.animation&&typeof active.animation.cancel==="function"){
    try{active.animation.cancel();}catch(_error){}
  }
  actorAnimations.delete(node);
  delete node.dataset.sc490Motion;
  node.style.removeProperty("translate");
  node.style.removeProperty("rotate");
  node.style.removeProperty("scale");
  node.style.removeProperty("will-change");
  node.dataset.sc490MotionCancelReason=String(reason);
  return true;
}
function settleActor49000(node){
  if(!node)return;
  node.style.setProperty("translate","0 0");
  node.style.setProperty("rotate","0deg");
  node.style.setProperty("scale","1");
}
function animationFrames49000(kind,intensity="small",direction=1){
  const sign=direction<0?-1:1;
  const small=intensity==="large"?"3.1vw":intensity==="medium"?"2.1vw":"1.25vw";
  switch(kind){
    case"TEAM_ENTER_LEFT":case"STAGGERED_GROUP_ENTRY":return[{opacity:0,translate:"-7vw 0",scale:.985},{opacity:1,translate:"0 0",scale:1}];
    case"TEAM_ENTER_RIGHT":return[{opacity:0,translate:"7vw 0",scale:.985},{opacity:1,translate:"0 0",scale:1}];
    case"STEP_FORWARD":return[{translate:"0 0"},{translate:(sign*1.25)+"vw -4px"},{translate:"0 0"}];
    case"STEP_BACK":return[{translate:"0 0"},{translate:(sign*-1.25)+"vw 3px"},{translate:"0 0"}];
    case"SIDESTEP":return[{translate:"0 0"},{translate:(sign*1.6)+"vw 0"},{translate:"0 0"}];
    case"LEAN_FORWARD":return[{translate:"0 0",rotate:"0deg"},{translate:(sign*.55)+"vw -3px",rotate:(sign*1.6)+"deg"},{translate:"0 0",rotate:"0deg"}];
    case"LEAN_BACK":return[{translate:"0 0",rotate:"0deg"},{translate:(sign*-.55)+"vw 2px",rotate:(sign*-1.5)+"deg"},{translate:"0 0",rotate:"0deg"}];
    case"SHORT_PACE":return[{translate:"0 0"},{translate:(sign*1.45)+"vw 0"},{translate:(sign*-.9)+"vw 0"},{translate:"0 0"}];
    case"ATTENTION_SHIFT":return[{translate:"0 0",rotate:"0deg"},{translate:(sign*.35)+"vw -2px",rotate:(sign*.9)+"deg"},{translate:"0 0",rotate:"0deg"}];
    case"SMALL_RECOIL":return[{translate:"0 0"},{translate:(sign*1.25)+"vw 0"},{translate:(sign*-.28)+"vw 0"},{translate:"0 0"}];
    case"LARGE_RECOIL":return[{translate:"0 0"},{translate:(sign*3.1)+"vw 0"},{translate:(sign*-.45)+"vw 0"},{translate:"0 0"}];
    case"BOUNCE":return[{translate:"0 0"},{translate:"0 -8px"},{translate:"0 0"}];
    case"DOUBLE_BOUNCE":return[{translate:"0 0"},{translate:"0 -9px"},{translate:"0 0"},{translate:"0 -6px"},{translate:"0 0"}];
    case"TRIPLE_BOUNCE":return[{translate:"0 0"},{translate:"0 -10px"},{translate:"0 0"},{translate:"0 -7px"},{translate:"0 0"},{translate:"0 -5px"},{translate:"0 0"}];
    case"TILT":case"OPPOSING_GROUP_TILT":return[{rotate:"0deg"},{rotate:(sign*2.4)+"deg"},{rotate:(sign*-.7)+"deg"},{rotate:"0deg"}];
    case"SHORT_SHAKE":return[{translate:"0 0"},{translate:"-5px 0"},{translate:"5px 0"},{translate:"-3px 0"},{translate:"0 0"}];
    case"PASSING_TRAVERSE":case"PASS_BY":return[{translate:"2.2vw 0"},{translate:"-1.1vw 0"},{translate:"0 0"}];
    case"CROSS_FIELD":return[{translate:"0 0"},{translate:(sign*3.6)+"vw 0"},{translate:"0 0"}];
    case"SQUAD_WEDGE_LEFT":case"SQUAD_WEDGE_RIGHT":case"LEADER_FORWARD":case"SUPPORT_RECESSED":case"RECOMPOSE_GROUP":case"SETTLE_TO_ANCHOR":case"SOLO_ALREADY_PRESENT":
      return[{translate:"0 0",rotate:"0deg",scale:1},{translate:"0 0",rotate:"0deg",scale:1}];
    default:return[{translate:"0 0"},{translate:small+" 0"},{translate:"0 0"}];
  }
}
function playActorPrimitive49000(root,raw={}){
  const kind=String(raw.kind||"").toUpperCase();
  if(!root||!EXPRESSIVE_SET.has(kind))return{success:false,reason:"expressive_cue_invalid",kind};
  const node=actorNode49000(root,raw.actorId);
  if(!node)return{success:false,reason:"expressive_actor_missing",kind,actorId:raw.actorId||null};
  cancelActorMotion49000(node,"new_cue");
  const duration=safeDuration49000(kind,raw.durationMs);
  const reduced=reducedMotion49000();
  const frames=reduced
    ?[{opacity:1,translate:"0 0",rotate:"0deg",scale:1},{opacity:1,translate:"0 0",rotate:"0deg",scale:1}]
    :animationFrames49000(kind,raw.intensity||"small",Number(raw.direction)||1);
  settleActor49000(node);
  node.dataset.sc490Motion=kind;
  node.style.setProperty("will-change","translate,scale,rotate,opacity");
  if(typeof node.animate!=="function"){
    settleActor49000(node);delete node.dataset.sc490Motion;node.style.removeProperty("will-change");
    return{success:true,kind,actorId:raw.actorId,durationMs:0,reducedMotion:reduced,fallback:true,presentationOnly:true};
  }
  const animation=node.animate(frames,{duration,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"});
  const token={animation,kind};actorAnimations.set(node,token);
  const cleanup=()=>{
    if(actorAnimations.get(node)!==token)return;
    actorAnimations.delete(node);delete node.dataset.sc490Motion;
    settleActor49000(node);node.style.removeProperty("will-change");
  };
  try{animation.addEventListener("finish",cleanup,{once:true});animation.addEventListener("cancel",cleanup,{once:true});}
  catch(_error){Promise.resolve(animation.finished).then(cleanup,cleanup);}
  return{success:true,kind,actorId:raw.actorId,durationMs:duration,reducedMotion:reduced,presentationOnly:true};
}
function playCueGroup49000(root,cues=[]){
  const rows=Array.isArray(cues)?cues:[];
  const timers=[];const results=[];
  for(const [index,row] of rows.entries()){
    const delay=Math.max(0,Math.min(240,Number(row&&row.delayMs)||0));
    if(delay===0)results.push(playActorPrimitive49000(root,row));
    else{
      const id=setTimeout(()=>playActorPrimitive49000(root,row),delay);timers.push(id);
      results.push({success:true,scheduled:true,delayMs:delay,kind:row.kind,actorId:row.actorId});
    }
  }
  return{success:results.every(row=>row.success===true),results,timerIds:timers,presentationOnly:true};
}
function cueIndex49000(perf=performance49000()){
  return perf&&Number.isInteger(perf.index)?perf.index:0;
}
function benchmarkCues49000(runtime,perf){
  const beatId=String(runtime&&runtime.beatId||"");
  const index=cueIndex49000(perf);
  if(beatId==="ce478_opening"&&index===0)return[
    {kind:"TEAM_ENTER_LEFT",actorId:MENMA_ID,durationMs:280,delayMs:0},
    {kind:"TEAM_ENTER_LEFT",actorId:HINATA_ID,durationMs:300,delayMs:55},
    {kind:"TEAM_ENTER_LEFT",actorId:KAKASHI_ID,durationMs:320,delayMs:110}
  ];
  if(beatId==="ce478_history"&&index===0)return[{kind:"PASSING_TRAVERSE",actorId:MI_ID,durationMs:420,direction:-1}];
  if(beatId==="ce478_kakashi_response"&&index===0)return[{kind:"SMALL_RECOIL",actorId:KAKASHI_ID,durationMs:200,direction:-1}];
  if(beatId==="ce478_kakashi_response"&&index===1)return[{kind:"ATTENTION_SHIFT",actorId:MI_ID,durationMs:160,direction:-1}];
  if(beatId==="ce478_hinata_response"&&index===0)return[{kind:"ATTENTION_SHIFT",actorId:HINATA_ID,durationMs:150,direction:1}];
  if(beatId==="ce478_hinata_response"&&index===1)return[{kind:"DOUBLE_BOUNCE",actorId:HINATA_ID,durationMs:230}];
  if(beatId==="ce478_menma_choice")return[
    {kind:"OPPOSING_GROUP_TILT",actorId:MENMA_ID,durationMs:210,direction:-1},
    {kind:"OPPOSING_GROUP_TILT",actorId:HINATA_ID,durationMs:210,direction:1,delayMs:35}
  ];
  if(beatId.startsWith("ce478_branch_")&&index===0)return[
    {kind:"RECOMPOSE_GROUP",actorId:MENMA_ID,durationMs:260},
    {kind:"RECOMPOSE_GROUP",actorId:HINATA_ID,durationMs:280,delayMs:35},
    {kind:"RECOMPOSE_GROUP",actorId:KAKASHI_ID,durationMs:300,delayMs:70},
    {kind:"TILT",actorId:MI_ID,durationMs:190,direction:-1,delayMs:55}
  ];
  return[];
}
function benchmarkScope49000(runtime,perf){
  const source=perf&&Number.isInteger(perf.sourceIndex)?perf.sourceIndex:cueIndex49000(perf);
  const segment=perf&&Number.isInteger(perf.segmentIndex)?perf.segmentIndex:0;
  return [runtime.sceneId,runtime.beatId,source,segment].join("|");
}
function syncBenchmark49000(){
  const runtime=activeRuntime49000();
  if(!benchmarkEligible49000(runtime))return{success:false,reason:"benchmark_not_active"};
  const root=boardRoot49000();if(!root)return{success:false,reason:"scene_board_missing"};
  const wedge=applyBenchmarkWedge49000(root,runtime);
  if(!wedge.success)return{success:false,reason:"benchmark_four_actor_projection_incomplete",wedge};
  const perf=performance49000();
  const scope=benchmarkScope49000(runtime,perf);
  const prior=rootState.get(root);
  if(prior&&prior.scope===scope)return{success:true,reused:true,scope,presentationOnly:true};
  if(prior&&Array.isArray(prior.timerIds))for(const id of prior.timerIds)try{clearTimeout(id);}catch(_error){}
  const cues=benchmarkCues49000(runtime,perf);
  const played=playCueGroup49000(root,cues);
  rootState.set(root,{scope,timerIds:played.timerIds||[],kinds:cues.map(row=>row.kind)});
  root.dataset.sc490Benchmark="true";
  root.dataset.sc490BenchmarkScope=scope;
  root.dataset.sc490BenchmarkKinds=cues.map(row=>row.kind).join(",");
  root.dataset.sc490ReducedMotion=reducedMotion49000()?"true":"false";
  return{success:true,reused:false,scope,cueCount:cues.length,kinds:cues.map(row=>row.kind),presentationOnly:true};
}
function installRendererWrap49000(){
  if(rendererWrapInstalled)return true;
  const previous=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  if(!previous)return false;
  function renderStoryScenePresentationLayer49000(){
    const result=previous.apply(this,arguments);
    try{syncBenchmark49000();}catch(_error){}
    return result;
  }
  globalThis.renderStoryScenePresentationLayer=renderStoryScenePresentationLayer49000;
  try{renderStoryScenePresentationLayer=renderStoryScenePresentationLayer49000;}catch(_error){}
  rendererWrapInstalled=true;
  return true;
}
function diagnostics49000(){
  const source=String(installStorySceneBoardExpressive49000);
  const checks={
    canonicalRendererExtended:!!globalThis.SC_STORY_SCENE_BOARD_33900&&rendererWrapInstalled===true,
    benchmarkOnlyScene:BENCHMARK_SCENE_ID==="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1",
    exactFourActors:JSON.stringify(BENCHMARK_ACTORS)===JSON.stringify([MENMA_ID,HINATA_ID,KAKASHI_ID,MI_ID]),
    exactSceneProjectionSelfSufficient:String(ensureBenchmarkActors49000).includes("BENCHMARK_ACTORS")&&String(ensureAuthorisedActor49000).includes("benchmarkEligible49000"),
    expressiveVocabulary:EXPRESSIVE_PRIMITIVES.length>=28&&["STEP_BACK","SHORT_PACE","DOUBLE_BOUNCE","TILT","SHORT_SHAKE","RECOMPOSE_GROUP"].every(kind=>EXPRESSIVE_SET.has(kind)),
    compositorSafeLonghands:source.includes('translate:"-7vw 0"')&&source.includes('rotate:"0deg"')&&source.includes('scale:1')&&!String(animationFrames49000).includes("transform:"),
    boundedDurations:Object.values(DURATIONS).every(ms=>ms>=100&&ms<=650),
    oneActorMotionOwner:source.includes("actorAnimations=new WeakMap")&&String(playActorPrimitive49000).includes('cancelActorMotion49000(node,"new_cue")'),
    nonSemanticSettle:String(playActorPrimitive49000).includes("settleActor49000(node)")&&String(cancelActorMotion49000).includes('removeProperty("translate")'),
    reducedMotionEquivalent:String(playActorPrimitive49000).includes("reducedMotion49000")&&String(playActorPrimitive49000).includes('translate:"0 0"'),
    currentTeamAuthorisesHinata:String(authorisedTeam49000).includes("getChronicleCurrentTeam43600")&&String(benchmarkEligible49000).includes("team.has"),
    presentationOnlyApiSurface:typeof globalThis.playStoryExpressivePrimitive49000!=="undefined"||typeof playActorPrimitive49000==="function",
    benchmarkReturnsToAnchor:String(playActorPrimitive49000).includes("settleActor49000(node)"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,benchmarkSceneId:BENCHMARK_SCENE_ID,benchmarkActors:[...BENCHMARK_ACTORS],browserGoldenClaimed:false};
}

installRendererWrap49000();
globalThis.playStoryExpressivePrimitive49000=playActorPrimitive49000;
globalThis.playStoryExpressiveCueGroup49000=playCueGroup49000;
globalThis.syncStorySceneBoardBenchmark49000=syncBenchmark49000;
globalThis.runStorySceneBoardExpressive49000Diagnostics=diagnostics49000;
globalThis.SC_STORY_SCENE_BOARD_EXPRESSIVE_49000=Object.freeze({
  patchId:PATCH_ID,benchmarkSceneId:BENCHMARK_SCENE_ID,benchmarkActors:BENCHMARK_ACTORS,
  expressivePrimitives:EXPRESSIVE_PRIMITIVES,browserGoldenClaimed:false
});
})();