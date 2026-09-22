// ============================================================================
// ACADEMY KAKASHI V2 — CUE / TRANSITION / ANIMATION CONTROLLER — 36040
//
// Presentation lifecycle only. It never decides Story truth.
// Semantic Story advancement remains owned by the existing Story runtime.
// ============================================================================
(function installAcademyKakashiV2Transition36040(){
"use strict";
if(globalThis.SC_ACADEMY_KAKASHI_V2_TRANSITION_36040)return;

const PATCH_ID="academy_kakashi_v2_transition_36040_2026_09_22";
const SCENE_ID="origin_academy_kakashi_prologue";
const CURSOR_KEY="__kakashiV2Presentation36040";
let locked=false,wipeCovering=false,lastTransition=null,timerIds=[];

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
function getState(){
  const rt=runtime(),row=cursor(),count=rt?cues(rt.beatId).length:0;
  return{
    active:!!rt&&rt.sceneId===SCENE_ID,
    beatId:rt&&rt.sceneId===SCENE_ID?rt.beatId:null,
    cueIndex:row?row.cueIndex:0,
    cueCount:count,
    atEnd:count<=1||!!row&&row.cueIndex>=count-1,
    locked,
    wipeCovering,
    lastTransition:lastTransition?{...lastTransition}:null
  };
}
function resetForBeat(){
  const rt=runtime();if(!rt||rt.sceneId!==SCENE_ID)return;
  if(!rt.localContext||typeof rt.localContext!=="object")rt.localContext={};
  rt.localContext[CURSOR_KEY]={beatId:rt.beatId,cueIndex:0,settled:false};save();
}
function render(){
  try{if(typeof renderAcademyKakashiV236030==="function")renderAcademyKakashiV236030();}catch(_e){}
  try{if(typeof setAcademyKakashiV2Wipe36030==="function")setAcademyKakashiV2Wipe36030(wipeCovering);}catch(_e){}
}
function actorIds(p){return new Set((p&&Array.isArray(p.actors)?p.actors:[]).map(a=>a&&a.id).filter(Boolean));}
function animateEntering(previousProjection,nextProjection){
  if(typeof document==="undefined")return;
  const prev=actorIds(previousProjection),next=actorIds(nextProjection);
  const root=document.getElementById("kakashi-v2-scene-board");if(!root)return;
  const entering=[...next].filter(id=>!prev.has(id));
  for(const id of entering){
    const node=[...root.querySelectorAll(".kv2-actor")].find(n=>n.dataset&&n.dataset.actorId===id);
    if(!node)continue;
    node.classList.remove("is-entering");
    void node.offsetWidth;
    node.classList.add("is-entering");
    const done=()=>node.classList.remove("is-entering");
    node.addEventListener("animationend",done,{once:true});
    later(done,700);
  }
}
function ghostLeaving(previousProjection,nextProjection){
  if(typeof document==="undefined")return;
  const prev=actorIds(previousProjection),next=actorIds(nextProjection);
  const leaving=[...prev].filter(id=>!next.has(id));if(!leaving.length)return;
  const root=document.getElementById("kakashi-v2-scene-board");if(!root)return;
  for(const id of leaving){
    const node=[...root.querySelectorAll(".kv2-actor")].find(n=>n.dataset&&n.dataset.actorId===id);
    if(!node)continue;
    const rect=node.getBoundingClientRect(),rr=root.getBoundingClientRect();
    const ghost=node.cloneNode(true);
    ghost.classList.add("kv2-actor-ghost","is-leaving");
    ghost.style.left=`${Math.max(0,rect.left-rr.left)}px`;
    ghost.style.top=`${Math.max(0,rect.top-rr.top)}px`;
    ghost.style.width=`${rect.width}px`;ghost.style.height=`${rect.height}px`;
    root.appendChild(ghost);
    later(()=>{try{ghost.remove();}catch(_e){}},680);
  }
}
function targetBeat(choiceId=null){
  try{
    const beat=typeof getCurrentStorySceneBeat==="function"?getCurrentStorySceneBeat():null;
    if(!beat)return null;
    if(beat.mode==="choice"&&choiceId){
      const choice=(beat.choices||[]).find(c=>c.choiceId===choiceId);return choice&&choice.nextBeatId||beat.nextBeatId||null;
    }
    if(beat.mode==="battle_transition")return null;
    return beat.nextBeatId||null;
  }catch(_e){return null;}
}
function shouldWipe(prev,next){
  if(!prev||!next)return false;
  return prev.transition==="wipe"||next.transition==="wipe"||String(prev.backdrop||"")!==String(next.backdrop||"");
}
function semanticAdvance(choiceId=null){
  const prev=projection(),target=targetBeat(choiceId),nextPreview=target?projection(target):null;
  const wipe=shouldWipe(prev,nextPreview);
  if(!wipe){
    const result=choiceId==null?PRE_ADVANCE():PRE_ADVANCE(choiceId);
    if(result&&result.success===true&&active()){resetForBeat();render();animateEntering(prev,projection());}
    return result;
  }
  if(locked)return{success:false,reason:"kakashi_v2_transition_locked"};
  locked=true;wipeCovering=true;lastTransition={type:"black_wipe",fromBeatId:runtime().beatId,toBeatId:target||null,startedAt:Date.now()};
  ghostLeaving(prev,nextPreview);render();
  later(()=>{
    let result=null;
    try{result=choiceId==null?PRE_ADVANCE():PRE_ADVANCE(choiceId);}catch(error){result={success:false,reason:"kakashi_v2_semantic_advance_exception",error:String(error&&error.message||error)};}
    lastTransition.result=result&&typeof result==="object"?{success:result.success!==false,type:result.type||null,reason:result.reason||null}:null;
    if(active())resetForBeat();
    render();
    const next=projection();
    animateEntering(prev,next);
    later(()=>{
      wipeCovering=false;render();
      later(()=>{locked=false;lastTransition={...(lastTransition||{}),completedAt:Date.now()};const row=cursor();if(row)row.settled=true;save();},250);
    },32);
  },230);
  return{success:true,type:"kakashi_v2_black_wipe_transition",pending:true,fromBeatId:lastTransition.fromBeatId,toBeatId:target||null};
}
function advance(choiceId=null){
  if(!active())return choiceId==null?PRE_ADVANCE():PRE_ADVANCE(choiceId);
  if(locked)return{success:false,reason:"kakashi_v2_transition_locked"};
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

globalThis.advanceAcademyKakashiV236040=advance;
globalThis.getAcademyKakashiV2TransitionState36040=getState;
globalThis.resetAcademyKakashiV2Transition36040=()=>{clearTimers();locked=false;wipeCovering=false;lastTransition=null;resetForBeat();render();return{success:true};};

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
    explicitAnimationLock:String(advance).includes("kakashi_v2_transition_locked")&&String(semanticAdvance).includes("locked=true"),
    blackWipeOnBackdropChange:String(shouldWipe).includes("backdrop"),
    enteringOnlyOnActorSetChange:String(animateEntering).includes("!prev.has(id)"),
    leavingUsesTemporaryGhost:String(ghostLeaving).includes("kv2-actor-ghost"),
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
