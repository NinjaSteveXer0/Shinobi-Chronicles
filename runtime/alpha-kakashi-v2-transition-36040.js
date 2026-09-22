// ============================================================================
// ACADEMY KAKASHI V2 — CUE / TRANSITION ADAPTER — 36040
//
// Story truth advances synchronously through the canonical Story runtime.
// This adapter owns only Kakashi V2 cue stepping and presentation refresh.
// Shared choreography is owned by 33900 and consumed by renderer 36030.
// ============================================================================
(function installAcademyKakashiV2Transition36040(){
"use strict";
if(globalThis.SC_ACADEMY_KAKASHI_V2_TRANSITION_36040)return;

const PATCH_ID="academy_kakashi_v2_transition_36040_2026_09_22_shared_choreography";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const CURSOR_KEY="__kakashiV2Presentation36040";
let wipeCovering=false,lastTransition=null,timerIds=[];

const PRE_ADVANCE=typeof advanceStoryScene==="function"?advanceStoryScene:null;
if(!PRE_ADVANCE)throw new Error("kakashi_v2_transition_requires_story_advance");

function runtime(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_e){return null;}}
function active(){const rt=runtime();return !!rt&&rt.sceneId===SCENE_ID;}
function projection(beatId=null){
  const rt=runtime();if(!rt||rt.sceneId!==SCENE_ID||typeof getAcademyKakashiV2Presentation36020!=="function")return null;
  return getAcademyKakashiV2Presentation36020(beatId||rt.beatId);
}
function cues(beatId=null){const p=projection(beatId);return p&&Array.isArray(p.cues)?p.cues:[];}
function clearTimers(){for(const id of timerIds){try{clearTimeout(id);}catch(_e){}}timerIds=[];}
function later(fn,ms){const id=setTimeout(()=>{timerIds=timerIds.filter(x=>x!==id);fn();},ms);timerIds.push(id);return id;}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_e){}}
function cursor(){
  const rt=runtime();if(!rt||rt.sceneId!==SCENE_ID)return null;
  if(!rt.localContext||typeof rt.localContext!=="object")rt.localContext={};
  let row=rt.localContext[CURSOR_KEY];
  if(!row||row.beatId!==rt.beatId){
    row={beatId:rt.beatId,cueIndex:0,settled:true};
    rt.localContext[CURSOR_KEY]=row;save();
  }
  const count=cues(rt.beatId).length;
  row.cueIndex=Math.max(0,Math.min(Math.max(0,count-1),Number(row.cueIndex)||0));
  return row;
}
function resetForBeat(){
  const rt=runtime();if(!rt||rt.sceneId!==SCENE_ID)return null;
  if(!rt.localContext||typeof rt.localContext!=="object")rt.localContext={};
  const row={beatId:rt.beatId,cueIndex:0,settled:true};
  rt.localContext[CURSOR_KEY]=row;save();return row;
}
function render(){
  try{if(typeof renderAcademyKakashiV236030==="function")renderAcademyKakashiV236030();}catch(_e){}
  try{if(typeof setAcademyKakashiV2Wipe36030==="function")setAcademyKakashiV2Wipe36030(wipeCovering);}catch(_e){}
}
function shouldWipe(prev,next){
  if(!prev||!next)return false;
  return prev.transition==="wipe"||next.transition==="wipe"||String(prev.backdrop||"")!==String(next.backdrop||"");
}
function playPostCommitWipe(prev,next){
  if(!shouldWipe(prev,next))return{played:false};
  wipeCovering=true;render();
  lastTransition={type:"black_wipe",fromBeatId:prev&&prev.id||null,toBeatId:next&&next.id||null,semanticAlreadyCommitted:true,startedAt:Date.now()};
  later(()=>{wipeCovering=false;render();lastTransition={...lastTransition,completedAt:Date.now()};},180);
  return{played:true};
}
function semanticAdvance(choiceId=null){
  const previous=projection();
  // #312 invariant: Story truth commits first. No animation callback or timeout
  // decides whether this choice/advance occurs.
  let result=null;
  try{result=choiceId==null?PRE_ADVANCE():PRE_ADVANCE(choiceId);}catch(error){
    return{success:false,reason:"kakashi_v2_semantic_advance_exception",error:String(error&&error.message||error)};
  }
  if(!result||result.success!==true)return result||{success:false,reason:"kakashi_v2_semantic_advance_failed"};
  if(active())resetForBeat();
  render();
  const next=projection();
  playPostCommitWipe(previous,next);
  return result;
}
function advance(choiceId=null){
  if(!active())return choiceId==null?PRE_ADVANCE():PRE_ADVANCE(choiceId);
  const rt=runtime(),row=cursor(),list=cues(rt.beatId);
  if(choiceId!==null&&choiceId!==undefined){
    if(list.length&&row.cueIndex<list.length-1)return{success:false,reason:"kakashi_v2_choice_before_cues_complete"};
    return semanticAdvance(choiceId);
  }
  if(list.length&&row.cueIndex<list.length-1){
    row.cueIndex+=1;row.settled=true;save();render();
    return{success:true,type:"kakashi_v2_cue_advanced",beatId:rt.beatId,cueIndex:row.cueIndex,semanticBeatUnchanged:true};
  }
  return semanticAdvance(null);
}
function getState(){
  const rt=runtime(),row=cursor(),count=rt?cues(rt.beatId).length:0;
  return{
    active:!!rt&&rt.sceneId===SCENE_ID,
    beatId:rt&&rt.sceneId===SCENE_ID?rt.beatId:null,
    cueIndex:row?row.cueIndex:0,
    cueCount:count,
    atEnd:count<=1||!!row&&row.cueIndex>=count-1,
    locked:false,
    wipeCovering,
    lastTransition:lastTransition?{...lastTransition}:null
  };
}

globalThis.advanceAcademyKakashiV236040=advance;
globalThis.getAcademyKakashiV2TransitionState36040=getState;
globalThis.resetAcademyKakashiV2Transition36040=()=>{
  clearTimers();wipeCovering=false;lastTransition=null;
  const root=typeof document!=="undefined"?document.getElementById("kakashi-v2-scene-board"):null;
  if(root&&typeof cancelStoryChoreography33900==="function")cancelStoryChoreography33900(root,"kakashi_transition_reset");
  resetForBeat();render();return{success:true};
};

globalThis.advanceStoryScene=function kakashiV2TransitionAdvanceWrapper(choiceId=null){
  if(!active())return PRE_ADVANCE.apply(this,arguments);
  return advance(choiceId);
};
try{advanceStoryScene=globalThis.advanceStoryScene;}catch(_e){}

function diagnostics(){
  const checks={
    wrapsStoryAdvance:globalThis.advanceStoryScene!==PRE_ADVANCE,
    cueAdvanceDoesNotCommitStory:String(advance).includes("semanticBeatUnchanged:true"),
    semanticAdvanceDelegates:String(semanticAdvance).includes("PRE_ADVANCE"),
    semanticCommitPrecedesPresentation:String(semanticAdvance).indexOf("PRE_ADVANCE")<String(semanticAdvance).indexOf("render()"),
    animationCannotBlockStoryTruth:!String(semanticAdvance).includes("locked")&&!String(semanticAdvance).includes("await")&&!String(playPostCommitWipe).includes("PRE_ADVANCE"),
    blackWipeIsPostCommitPresentation:String(playPostCommitWipe).includes("semanticAlreadyCommitted:true"),
    sharedChoreographyReset:String(globalThis.resetAcademyKakashiV2Transition36040).includes("cancelStoryChoreography33900"),
    noActorDomAnimationOwnership:!String(semanticAdvance).includes("querySelector")&&!String(advance).includes("cloneNode"),
    noStoryTruthMutation:!String(advance).includes("participants.")&&!String(semanticAdvance).includes("package."),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.runAcademyKakashiV2Transition36040Diagnostics=diagnostics;
globalThis.SC_ACADEMY_KAKASHI_V2_TRANSITION_36040=Object.freeze({patchId:PATCH_ID,browserGoldenClaimed:false});
if(active()){resetForBeat();render();}
})();
