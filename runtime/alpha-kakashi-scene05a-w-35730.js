// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI SCENE 05A-W: KAKASHI WINS — 35730
//
// Verbatim Writing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_05A_W_Kakashi_Wins_Verbatim_Lock_2026-09-18.md
// commit c1121c588f8fb44393baebe8b9edb5624a38f3e3
//
// Entry is ONLY the Scene 04A Kakashi-vs-Masked-Interceptor 1-v-1 victory.
// This module consumes the committed Battle result, preserves the exact
// 1-4-turn pursuit window / 5+ cutoff, classifies Masked Interceptor before
// exposing the post-Battle lethal/disposition menu, and presents the approved
// text verbatim. Successor branch prose/resolvers remain fail-closed until
// separately locked; no extra dialogue, debrief or terminal inference exists.
// ============================================================================
(function installAcademyKakashiScene05AW35730(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SCENE05AW_35730)return;

const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const SCENE04A=globalThis.SC_ALPHA_KAKASHI_SCENE04A_35710;
if(!CORE||!SCENE04A)throw new Error("kakashi_scene05aw_runtime_dependencies_missing");

const PATCH_ID="alpha_kakashi_scene05aw_35730_v2_2026_09_18";
const AUTHORITY="c1121c588f8fb44393baebe8b9edb5624a38f3e3";
const STORY_UNIT_REF="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const RETURN_BEAT="kak_scene04a_stop_assassin_return";
const WIN_BEAT="kak_scene05a_w_victory";
const CHOICE_BEAT="kak_scene05a_w_choice";
const BATTLE_CONFIG="academy_kakashi_origin_battle_mi_1v1";
const BINDING="academy_kakashi.battle.stop_assassin";
const SOURCE_ANCHOR="AK_SA_019";
const MI_REF="academy_kakashi_origin_masked_interceptor";
const FIGHT_BACKDROP_ID="kakashi_origin_fight_at_sakura_tree";
const FIGHT_BACKDROP=Object.freeze({assetId:FIGHT_BACKDROP_ID});
const OBJECTIVE="Retrieve the package.";
const CURSOR_KEY="__kakashiScene05AW35730Cursor";
const ENTRY_REQUEST="kakashi_scene05aw_victory_entry_35730";
const STYLE_ID="sc-kakashi-scene05aw-35730-style";
const BOARD_CLASS="sc-kakashi-scene05aw-board-35730";

const CUES=Object.freeze([
  Object.freeze({cueId:"scene05aw_01",kind:"narration",text:"Masked Interceptor hits the stone beneath the Sakura tree.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_02",kind:"narration",text:"Kakashi lands a few steps away.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_03",kind:"narration",text:"His eye is already off her.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_04",kind:"narration",text:"Searching.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_05",kind:"narration",text:"Package Smuggler fled with the package while they fought.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_06",kind:"narration",text:"ANBU Marked Target went the other way.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_07",kind:"narration",text:"Kakashi scans the street.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_08",kind:"narration",text:"One trail cuts toward the package.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_09",kind:"narration",text:"The other leads after the original target.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_10",kind:"narration",text:"Neither has vanished yet.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_11",kind:"narration",text:"Not completely.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_12",kind:"narration",text:"But both are getting farther away.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_13",kind:"narration",text:"Kakashi looks back at Masked Interceptor.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_14",kind:"narration",text:"She lies where he put her.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_15",kind:"narration",text:"Every second he spends here makes the choice harder.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_16",kind:"narration",text:"The package.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_17",kind:"narration",text:"The original target.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_18",kind:"narration",text:"Or the woman at his feet.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_19",kind:"narration",text:"He cannot deal with all three.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_20",kind:"narration",text:"Not anymore.",focusActorRef:"academy_kakashi"})
]);

function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function result(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function validVictory(row=result()){
  return !!row&&row.resultState==="player_side_victory"&&String(row.battleConfigId||"")===BATTLE_CONFIG&&String(row.bindingRef||"")===BINDING&&String(row.sourceAnchorRef||"")===SOURCE_ANCHOR;
}
function turnCount(row=result()){return Number.isInteger(Number(row&&row.playerActionOpportunityCount))?Number(row.playerActionOpportunityCount):NaN;}
function fastPursuit(row=result()){const turns=turnCount(row);return validVictory(row)&&turns>=1&&turns<=4;}
function escapeHTML(value){return String(value??"").replace(/[&<>\"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function cssUrlValue(value){return `url("${String(value||"").replace(/\\/g,"\\\\").replace(/\"/g,'\\\"')}")`; }
function currentMiStateClass(){
  try{
    const snap=CORE.getStoryUnitSnapshot(STORY_UNIT_REF)||{};
    const row=snap.participantStates&&snap.participantStates[MI_REF]||null;
    return row&&row.stateClass?String(row.stateClass):null;
  }catch(_error){return null;}
}
function classifyMi35730(row=result()){
  if(!validVictory(row))return{success:false,reason:"kakashi_scene05aw_victory_required"};
  const existing=currentMiStateClass();
  if(existing)return{success:true,idempotent:true,stateClass:existing};
  const participant=Array.isArray(row.participants)?row.participants.find(p=>p&&p.participantRef===MI_REF)||null:null;
  if(!participant)return{success:false,reason:"kakashi_scene05aw_mi_participant_missing"};
  if(String(participant.lifeState||"").toUpperCase()==="DEAD"){
    const committed=CORE.recordParticipantClassification({storyUnitRef:STORY_UNIT_REF,participantRef:MI_REF,stateClass:"DEAD",resultRef:String(row.battleOccurrenceId||"")});
    return committed&&committed.success?{success:true,stateClass:"DEAD",state:committed.state}:committed||{success:false,reason:"kakashi_scene05aw_mi_dead_classification_failed"};
  }
  if(String(participant.battleStatus||"")!=="defeated")return{success:false,reason:"kakashi_scene05aw_mi_defeated_fact_required"};
  const custody=String(participant.custodyState||"").toUpperCase();
  const controlled=["CONTROLLED","SECURED","IN_CUSTODY","CUSTODY_ESTABLISHED"].includes(custody);
  const stateClass=controlled?"CONTROLLED_DEFEATED":"DEFEATED_BUT_NOT_CONTROLLED";
  const ref=typeof CORE.stableRef==="function"?CORE.stableRef("sc35730-ak-sa-023",{battleOccurrenceId:String(row.battleOccurrenceId||""),participantRef:MI_REF,stateClass}):String(row.battleOccurrenceId||"");
  const committed=CORE.recordParticipantClassification({storyUnitRef:STORY_UNIT_REF,participantRef:MI_REF,stateClass,resultRef:ref});
  return committed&&committed.success?{success:true,stateClass,resultRef:ref,state:committed.state}:committed||{success:false,reason:"kakashi_scene05aw_mi_classification_failed"};
}
function lethalPresentation(){
  const stateClass=currentMiStateClass();
  return stateClass==="CONTROLLED_DEFEATED"
    ?{label:"KILL HER",mode:"deterministic",bindingRef:"academy_kakashi.lethal.kill_deterministic"}
    :{label:"ATTEMPT TO KILL HER",mode:"resolver_determined",bindingRef:"academy_kakashi.lethal.attempt_kill"};
}
function successorPending(branch){
  return{success:false,reason:"kakashi_scene05aw_successor_authority_not_implemented",branch,authority:AUTHORITY};
}
function choiceRow(choiceId,label,branch){
  return{choiceId,label,nextBeatId:CHOICE_BEAT,availability:()=>({available:true,knownBlocker:null}),knownBlocker:null,consequenceRequests:[{requestId:`kakashi_scene05aw_${branch.toLowerCase()}_pending_35730`,kind:"domain",resolve:()=>successorPending(branch)}]};
}
function materializeChoices35730(){
  const def=scene(),beat=def&&def.beatMap instanceof Map?def.beatMap.get(CHOICE_BEAT):null;if(!beat)return false;
  const lethal=lethalPresentation();
  const rows=[];
  if(fastPursuit()){
    rows.push(choiceRow("scene05aw_go_after_package_smuggler","GO AFTER PACKAGE SMUGGLER","BRANCH_A"));
    rows.push(choiceRow("scene05aw_go_after_anbu_marked_target","GO AFTER ANBU MARKED TARGET","BRANCH_B"));
  }
  rows.push(choiceRow("scene05aw_lethal",lethal.label,"BRANCH_C"));
  rows.push(choiceRow("scene05aw_take_her_back_to_anbu","TAKE HER BACK TO ANBU","BRANCH_D"));
  rows.push(choiceRow("scene05aw_take_her_to_uchiha_police","TAKE HER TO THE UCHIHA POLICE FORCE","BRANCH_E"));
  beat.choices=rows;
  const rt=active();if(rt&&rt.localContext){
    rt.localContext.kakashiScene05AWLethalPresentation=lethal.label;
    rt.localContext.kakashiScene05AWPursuitEligible=fastPursuit();
  }
  return true;
}
function routeVictoryReturn35730(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==RETURN_BEAT)return{success:true,routed:false};
  const row=result();if(!validVictory(row))return{success:true,routed:false,resultState:String(row&&row.resultState||"unresolved")};
  if(!(rt.localContext&&rt.localContext.kakashiScene04ABattleIntentResolved===true))return{success:true,routed:false,reason:"scene04a_battle_semantic_return_not_yet_committed"};
  const classification=classifyMi35730(row);if(!classification||classification.success!==true)return classification||{success:false,reason:"kakashi_scene05aw_mi_classification_missing"};
  const turns=turnCount(row);if(!Number.isFinite(turns)||turns<1)return{success:false,reason:"kakashi_scene05aw_turn_count_missing"};
  rt.localContext={...(rt.localContext||{}),kakashiScene05AWEntered:true,kakashiScene05AWBattleOccurrenceId:String(row.battleOccurrenceId||""),kakashiScene05AWTurnCount:turns,kakashiScene05AWPursuitEligible:turns<=4,kakashiScene05AWMiStateClass:classification.stateClass,[CURSOR_KEY]:0};
  rt.beatId=WIN_BEAT;save();return{success:true,routed:true,beatId:WIN_BEAT,turnCount:turns,pursuitEligible:turns<=4,miStateClass:classification.stateClass};
}
function performance(rt=active()){
  const raw=rt&&rt.localContext?Number(rt.localContext[CURSOR_KEY]):0;
  const index=Number.isInteger(raw)?Math.max(0,Math.min(CUES.length-1,raw)):0;
  return{sequence:CUES,index,cue:CUES[index],atEnd:index>=CUES.length-1};
}
function isWinNarration(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&rt.beatId===WIN_BEAT;}
function isWinFamily(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&(rt.beatId===WIN_BEAT||rt.beatId===CHOICE_BEAT);}

function installSurface35730(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_scene05aw_story_definition_missing"};
  const ret=def.beatMap.get(RETURN_BEAT);if(!ret)return{success:false,reason:"kakashi_scene05aw_return_beat_missing"};
  ret.onEnterConsequences=Array.isArray(ret.onEnterConsequences)?ret.onEnterConsequences.filter(row=>row&&row.requestId!==ENTRY_REQUEST):[];
  ret.onEnterConsequences.push({requestId:ENTRY_REQUEST,kind:"domain",resolve:()=>routeVictoryReturn35730()});
  def.beatMap.set(WIN_BEAT,{beatId:WIN_BEAT,mode:"narration",environmentRef:FIGHT_BACKDROP,text:"",nextBeatId:CHOICE_BEAT,exitScene:false,allowPresentationClose:false,onEnterConsequences:[],onAdvanceConsequences:[],choices:[]});
  def.beatMap.set(CHOICE_BEAT,{beatId:CHOICE_BEAT,mode:"choice",environmentRef:FIGHT_BACKDROP,text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,onEnterConsequences:[],onAdvanceConsequences:[],choices:[]});
  return{success:true,returnBeatId:RETURN_BEAT,winBeatId:WIN_BEAT,choiceBeatId:CHOICE_BEAT};
}

function installStyle35730(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
.${BOARD_CLASS}{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}
#story-scene-presentation-layer .sc-chronicle-stage[data-sc-kakashi-scene05aw="true"]{
  background-image:linear-gradient(180deg,rgba(2,5,8,.02),rgba(2,5,8,.05) 50%,rgba(2,5,8,.40) 82%,rgba(2,5,8,.68)),var(--sc-kakashi-scene05aw-backdrop)!important;
  background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important
}
`;
  document.head.appendChild(style);return true;
}
function fightPath(){
  try{if(typeof getSceneBackdropAssetPath==="function")return getSceneBackdropAssetPath(FIGHT_BACKDROP_ID)||"Kakashi Origin Backdrop/fight_at_sakura_tree.png";}catch(_error){}
  return"Kakashi Origin Backdrop/fight_at_sakura_tree.png";
}
function actorMarkup(id,label,image,state,focus=false){
  return `<figure class="sc-scene-board-33900__actor ${focus?"is-focus":""}" data-actor-id="${escapeHTML(id)}"><div class="sc-scene-board-33900__actor-frame"></div><img src="${escapeHTML(image)}" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>${escapeHTML(label)}</strong><small>${escapeHTML(state)}</small></figcaption></figure>`;
}
function boardMarkup(rt){
  const p=isWinNarration(rt)?performance(rt):null,focus=p&&p.cue&&p.cue.focusActorRef||"academy_kakashi";
  const miState=String(rt&&rt.localContext&&rt.localContext.kakashiScene05AWMiStateClass||currentMiStateClass()||"DEFEATED_BUT_NOT_CONTROLLED");
  const actors=[
    actorMarkup("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png",rt.beatId===CHOICE_BEAT?"DECISION WINDOW":focus==="academy_kakashi"?"FOCUSED":"PRESENT",focus==="academy_kakashi"),
    actorMarkup("masked_interceptor","MASKED INTERCEPTOR","NPC/masked_interceptor.png",miState==="CONTROLLED_DEFEATED"?"CONTROLLED · DEFEATED":"BATTLE-DEFEATED · NOT CONTROLLED",focus==="masked_interceptor")
  ];
  return `<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>${escapeHTML(OBJECTIVE)}</div></div><div class="sc-scene-board-33900__actors" data-count="2">${actors.join("")}</div>`;
}
function renderScene05AW35730(){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||(layer.querySelector&&layer.querySelector(".sc-story-stage"))||layer;if(!stage)return false;
  const rt=active();
  for(const old of stage.querySelectorAll?stage.querySelectorAll(`.${BOARD_CLASS}`):[])if(!isWinFamily(rt))old.remove();
  if(!isWinFamily(rt)){if(stage.style){try{delete stage.dataset.scKakashiScene05aw;}catch(_error){}stage.style.removeProperty("--sc-kakashi-scene05aw-backdrop");}return false;}
  installStyle35730();materializeChoices35730();
  stage.dataset.scKakashiScene05aw="true";stage.style.setProperty("--sc-kakashi-scene05aw-backdrop",cssUrlValue(fightPath()));
  layer.dataset.scSceneBoard="true";layer.dataset.scSceneMode="encounter";
  let board=stage.querySelector&&stage.querySelector(`.${BOARD_CLASS}`);if(!board){board=document.createElement("section");board.className=BOARD_CLASS;board.setAttribute("aria-hidden","true");stage.appendChild(board);}
  const markup=boardMarkup(rt);if(board.innerHTML!==markup)board.innerHTML=markup;
  if(isWinNarration(rt)){
    const p=performance(rt),cue=p.cue||{};layer.dataset.scPerformance="true";
    const text=layer.querySelector&&layer.querySelector(".sc-story-text");if(text&&text.textContent!==cue.text)text.textContent=cue.text;
    const name=layer.querySelector&&layer.querySelector(".sc-story-name");if(name){name.textContent="";name.style.display="none";}
    const kicker=layer.querySelector&&layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent="NARRATION · ACADEMY KAKASHI";
    const primary=layer.querySelector&&layer.querySelector(".sc-chronicle-primary");if(primary){primary.textContent="›";primary.setAttribute("aria-label","Advance scene");primary.title="Advance scene";}
  }else{
    try{delete layer.dataset.scPerformance;}catch(_error){}
  }
  return true;
}

let hooksInstalled=false,attempts=0;
function installHooks35730(){
  if(hooksInstalled)return true;
  if(typeof globalThis.getStoryScenePerformance33900!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
  const PRE_GET=globalThis.getStoryScenePerformance33900;
  const PRE_ADVANCE=globalThis.advanceStoryScene;
  const PRE_RENDER=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  globalThis.getStoryScenePerformance33900=function getStoryScenePerformance35730(){const rt=active();return isWinNarration(rt)?performance(rt):PRE_GET.apply(this,arguments);};
  globalThis.advanceStoryScene=function advanceStoryScene35730(choiceId=null){
    const rt=active();
    if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===RETURN_BEAT&&validVictory()){
      const routed=routeVictoryReturn35730();if(routed&&routed.success===true&&routed.routed===true){try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}return routed;}
    }
    if(!isWinNarration(rt)||choiceId!==null&&choiceId!==undefined)return PRE_ADVANCE.apply(this,arguments);
    const p=performance(rt);
    if(!p.atEnd){
      const next=p.index+1;rt.localContext={...(rt.localContext||{}),[CURSOR_KEY]:next};save();
      try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}
      return{success:true,type:"kakashi_scene05aw_performance_cue_advanced",beatId:WIN_BEAT,cueIndex:next,semanticBeatUnchanged:true};
    }
    if(rt.localContext)delete rt.localContext[CURSOR_KEY];save();
    const transition=PRE_ADVANCE.apply(this,arguments);materializeChoices35730();return transition;
  };
  try{getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;advanceStoryScene=globalThis.advanceStoryScene;}catch(_error){}
  if(PRE_RENDER){
    globalThis.renderStoryScenePresentationLayer=function renderStoryScenePresentationLayer35730(){
      const rt=active();
      if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===RETURN_BEAT&&validVictory()&&rt.localContext&&rt.localContext.kakashiScene04ABattleIntentResolved===true)routeVictoryReturn35730();
      const out=PRE_RENDER.apply(this,arguments);
      if(typeof queueMicrotask==="function")queueMicrotask(renderScene05AW35730);else if(typeof setTimeout==="function")setTimeout(renderScene05AW35730,0);
      return out;
    };
    try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}
  }
  hooksInstalled=true;installStyle35730();renderScene05AW35730();return true;
}
function ensureHooks35730(){if(installHooks35730())return;if(typeof setTimeout==="function"&&attempts++<120)setTimeout(ensureHooks35730,25);}

function diagnostics(){
  const def=scene(),ret=def&&def.beatMap instanceof Map?def.beatMap.get(RETURN_BEAT):null,win=def&&def.beatMap instanceof Map?def.beatMap.get(WIN_BEAT):null,choice=def&&def.beatMap instanceof Map?def.beatMap.get(CHOICE_BEAT):null;
  const exact=[
    "Masked Interceptor hits the stone beneath the Sakura tree.","Kakashi lands a few steps away.","His eye is already off her.","Searching.","Package Smuggler fled with the package while they fought.","ANBU Marked Target went the other way.","Kakashi scans the street.","One trail cuts toward the package.","The other leads after the original target.","Neither has vanished yet.","Not completely.","But both are getting farther away.","Kakashi looks back at Masked Interceptor.","She lies where he put her.","Every second he spends here makes the choice harder.","The package.","The original target.","Or the woman at his feet.","He cannot deal with all three.","Not anymore."
  ];
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_scene05aw_35730_v2_2026_09_18",
    authorityPinned:AUTHORITY==="c1121c588f8fb44393baebe8b9edb5624a38f3e3",
    exactTwentyNarrationCues:CUES.length===20&&JSON.stringify(CUES.map(x=>x.text))===JSON.stringify(exact)&&CUES.every(x=>x.kind==="narration"),
    victoryEntryOnly:validVictory.toString().includes('resultState==="player_side_victory"')&&routeVictoryReturn35730.toString().includes("kakashiScene04ABattleIntentResolved"),
    exactTurnGate:fastPursuit({resultState:"player_side_victory",battleConfigId:BATTLE_CONFIG,bindingRef:BINDING,sourceAnchorRef:SOURCE_ANCHOR,playerActionOpportunityCount:4})===true&&fastPursuit({resultState:"player_side_victory",battleConfigId:BATTLE_CONFIG,bindingRef:BINDING,sourceAnchorRef:SOURCE_ANCHOR,playerActionOpportunityCount:5})===false,
    pursuitRemovedAtFivePlus:materializeChoices35730.toString().includes("if(fastPursuit())"),
    exactDispositionLabels:materializeChoices35730.toString().includes("TAKE HER BACK TO ANBU")&&materializeChoices35730.toString().includes("TAKE HER TO THE UCHIHA POLICE FORCE"),
    lethalModeFromClassification:lethalPresentation.toString().includes("CONTROLLED_DEFEATED")&&lethalPresentation.toString().includes("ATTEMPT TO KILL HER"),
    miClassifiedBeforeMenu:routeVictoryReturn35730.toString().includes("classifyMi35730"),
    fightBackdropPreserved:win&&win.environmentRef&&win.environmentRef.assetId===FIGHT_BACKDROP_ID&&choice&&choice.environmentRef&&choice.environmentRef.assetId===FIGHT_BACKDROP_ID,
    objectiveExact:OBJECTIVE==="Retrieve the package.",
    noDialogue:CUES.every(x=>!x.speakerName),
    returnHookInstalled:!!ret&&Array.isArray(ret.onEnterConsequences)&&ret.onEnterConsequences.some(x=>x&&x.requestId===ENTRY_REQUEST),
    successorsFailClosed:successorPending("BRANCH_A").success===false,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,authority:AUTHORITY,winBeatId:WIN_BEAT,choiceBeatId:CHOICE_BEAT,browserGoldenClaimed:false};
}

const installed=installSurface35730();if(!installed||installed.success!==true)throw new Error(`kakashi_scene05aw_surface_install_failed:${installed&&installed.reason||"unknown"}`);
ensureHooks35730();
globalThis.runAcademyKakashiScene05AW35730Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SCENE05AW_35730=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,installed,cueCount:CUES.length,objective:OBJECTIVE,battleConfigId:BATTLE_CONFIG,bindingRef:BINDING,sourceAnchorRef:SOURCE_ANCHOR,winBeatId:WIN_BEAT,choiceBeatId:CHOICE_BEAT,browserGoldenClaimed:false});
})();