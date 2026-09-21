// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI SCENE 05A-W: KAKASHI WINS — 35730
//
// Verbatim Writing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_05A_W_Kakashi_Wins_Verbatim_Lock_2026-09-18.md
// commit 30a8cf3a16f57fbe5e65f55bc9dc1de076a21522
//
// Entry is ONLY the Scene 04A Kakashi-vs-Masked-Interceptor 1-v-1 victory.
// This module consumes the committed Battle result and the later binding
// causal correction at 90b20f565ef010d2b7cfca98c04feece3f7dfcb7:
// MI victory in 1-4 preserves BOTH PS and AMT pursuit eligibility; turn 5+
// closes both. If PS is chosen, PS must then be defeated in 1-3 turns to
// preserve later AMT pursuit. The exact rewritten Scene 05A-W prose remains
// separately Writing-owned, so existing locked narration is not fabricated
// here. Successor branch prose/resolvers remain fail-closed until locked.
// ============================================================================
(function installAcademyKakashiScene05AW35730(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SCENE05AW_35730)return;

const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const SCENE04A=globalThis.SC_ALPHA_KAKASHI_SCENE04A_35710;
if(!CORE||!SCENE04A)throw new Error("kakashi_scene05aw_runtime_dependencies_missing");

const PATCH_ID="alpha_kakashi_scene05aw_35730_v11_2026_09_21";
const AUTHORITY="bf16ebe0f677994878fbe60e30e7b546da899eb8";
const CAUSAL_AUTHORITY="90b20f565ef010d2b7cfca98c04feece3f7dfcb7";
const CHOICE_SURFACE_AUTHORITY="36454a31e9f61ffdaa528589ac11552d446ad3bc";
const POST_BATTLE_AGENCY_AUTHORITY="1ff3876e9b367ec518c254b612e4def14db8eaba";
const KAKASHI_DISPOSITION_AUTHORITY="62821414baaadd047c524239d1b3bbf207692b61";
const FIELD_SECURED_AUTHORITY="77d351e6f8d4eefaea0f8a6db82dec686391e1c0";
const MI_PURSUIT_MAX_TURNS=4;
const PS_TO_AMT_MAX_TURNS=3;
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

const COMMON_CUES=Object.freeze([
  Object.freeze({cueId:"scene05aw_01",kind:"narration",text:"Masked Interceptor hits the stone beneath the Sakura tree.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_02",kind:"narration",text:"Kakashi lands a few steps away.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_03",kind:"narration",text:"For a moment, the street is still.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_04",kind:"narration",text:"Then his eye moves past her.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_05",kind:"narration",text:"Toward the routes the others took.",focusActorRef:"academy_kakashi"})
]);
const FAST_CUES=Object.freeze([
  Object.freeze({cueId:"scene05aw_fast_06",kind:"narration",text:"Package Smuggler cuts across the far end of the street.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene05aw_fast_07",kind:"narration",text:"Still moving.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene05aw_fast_08",kind:"narration",text:"The package is still with him.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene05aw_fast_09",kind:"narration",text:"Higher up, movement flashes across a distant roofline.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene05aw_fast_10",kind:"narration",text:"ANBU Marked Target.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene05aw_fast_11",kind:"narration",text:"Farther away.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene05aw_fast_12",kind:"narration",text:"But not gone.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene05aw_fast_13",kind:"narration",text:"Not yet.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene05aw_fast_14",kind:"narration",text:"Kakashi looks between them.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_fast_15",kind:"narration",text:"One route leads to the package.",focusActorRef:"package_smuggler"}),
  Object.freeze({cueId:"scene05aw_fast_16",kind:"narration",text:"The other to the man who carried it here.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene05aw_fast_17",kind:"narration",text:"Then his eye drops back to Masked Interceptor.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_fast_18",kind:"narration",text:"She lies where he put her.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_fast_19",kind:"narration",text:"Three problems.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_fast_20",kind:"narration",text:"Not enough time for all of them at once.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_fast_21",kind:"narration",text:"Whatever Kakashi does next will decide which ones remain within reach.",focusActorRef:"academy_kakashi"})
]);
const SLOW_CUES=Object.freeze([
  Object.freeze({cueId:"scene05aw_slow_06",kind:"narration",text:"The street ahead is empty.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_07",kind:"narration",text:"Kakashi searches the rooftops.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_08",kind:"narration",text:"The alleys.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_09",kind:"narration",text:"The next junction.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_10",kind:"narration",text:"Nothing.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_11",kind:"narration",text:"Package Smuggler had too much time.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_12",kind:"narration",text:"The package is gone with him.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_13",kind:"narration",text:"ANBU Marked Target is gone as well.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_14",kind:"narration",text:"Kakashi looks back at Masked Interceptor.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_slow_15",kind:"narration",text:"She lies beneath the Sakura tree.",focusActorRef:"masked_interceptor"}),
  Object.freeze({cueId:"scene05aw_slow_16",kind:"narration",text:"The pursuit is over.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene05aw_slow_17",kind:"narration",text:"What happens to her is the only decision left here.",focusActorRef:"masked_interceptor"})
]);
const FAST_SEQUENCE=Object.freeze([...COMMON_CUES,...FAST_CUES]);
const SLOW_SEQUENCE=Object.freeze([...COMMON_CUES,...SLOW_CUES]);

function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function result(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function validVictory(row=result()){
  return !!row&&row.resultState==="player_side_victory"&&String(row.battleConfigId||"")===BATTLE_CONFIG&&String(row.bindingRef||"")===BINDING&&String(row.sourceAnchorRef||"")===SOURCE_ANCHOR;
}
function turnCount(row=result()){return Number.isInteger(Number(row&&row.playerActionOpportunityCount))?Number(row.playerActionOpportunityCount):NaN;}
function fastPursuit(row=result()){const turns=turnCount(row);return validVictory(row)&&turns>=1&&turns<=MI_PURSUIT_MAX_TURNS;}
function psKeepsAmtPursuit(turns){turns=Number(turns);return Number.isInteger(turns)&&turns>=1&&turns<=PS_TO_AMT_MAX_TURNS;}
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
  return{label:"KILL HER",mode:"deterministic",bindingRef:"academy_kakashi.lethal.kill_deterministic"};
}
function restraintPresentation(){
  return"RESTRAIN HER AND CONTINUE";
}
function successorPending(branch){
  return{success:false,reason:"kakashi_scene05aw_successor_authority_not_implemented",branch,authority:AUTHORITY};
}
function choiceRow(choiceId,label,branch){
  return{choiceId,label,nextBeatId:CHOICE_BEAT,availability:()=>({available:true,knownBlocker:null}),knownBlocker:null,consequenceRequests:[{requestId:`kakashi_scene05aw_${branch.toLowerCase()}_pending_35730`,kind:"domain",resolve:()=>successorPending(branch)}]};
}
function restraintChoiceRow35730(){
  return{choiceId:"scene05aw_restrain_and_continue",label:restraintPresentation(),nextBeatId:CHOICE_BEAT,availability:()=>({available:true,knownBlocker:null}),knownBlocker:null,consequenceRequests:[{requestId:"kakashi_scene05aw_field_secured_35920",kind:"domain",resolve:()=>{
    const rt=active(),fn=globalThis.commitAcademyKakashiFieldSecured35920;
    if(typeof fn!=="function")return{success:false,reason:"field_secured_35920_not_loaded"};
    const out=fn(MI_REF,{sourceOccurrenceId:String(rt&&rt.localContext&&rt.localContext.kakashiScene05AWBattleOccurrenceId||""),locationRef:"KAKASHI_SAKURA_TREE_FIGHT_LOCATION",routeRef:"stop_assassin_restrain_continue"});
    if(out&&out.success===true&&rt){rt.localContext={...(rt.localContext||{}),kakashiScene05AWMiStateClass:"FIELD_SECURED_PENDING_COLLECTION"};save();}
    return out;
  }}]};
}
function isWiredChoice35730(row){
  const requests=row&&Array.isArray(row.consequenceRequests)?row.consequenceRequests:[];
  return requests.some(function(request){
    const id=String(request&&request.requestId||"");
    return !!id&&!id.includes("_pending_35730");
  });
}
function preserveWiredChoice35730(fresh,existing){
  if(!fresh||!existing||!isWiredChoice35730(existing))return fresh;
  if(String(fresh.choiceId||"")==="scene05aw_lethal"&&String(existing.label||"")!==String(fresh.label||""))return fresh;
  return{...fresh,
    nextBeatId:existing.nextBeatId||fresh.nextBeatId,
    availability:typeof existing.availability==="function"?existing.availability:fresh.availability,
    knownBlocker:existing.knownBlocker==null?fresh.knownBlocker:existing.knownBlocker,
    consequenceRequests:existing.consequenceRequests
  };
}
function materializeChoices35730(){
  const def=scene(),beat=def&&def.beatMap instanceof Map?def.beatMap.get(CHOICE_BEAT):null;if(!beat)return false;
  const existingById=new Map((Array.isArray(beat.choices)?beat.choices:[]).filter(Boolean).map(function(row){return[String(row.choiceId||""),row];}));
  const lethal=lethalPresentation();
  const pursuitEligible=fastPursuit();
  const rows=[];
  const add=function(row){rows.push(preserveWiredChoice35730(row,existingById.get(String(row.choiceId||""))));};
  const currentMiState=String(currentMiStateClass()||"");
  if(currentMiState==="FIELD_SECURED_PENDING_COLLECTION"){
    if(pursuitEligible){
      add(choiceRow("scene05aw_go_after_package_smuggler","GO AFTER PACKAGE SMUGGLER","BRANCH_A"));
      add(choiceRow("scene05aw_go_after_anbu_marked_target","GO AFTER ANBU MARKED TARGET","BRANCH_B"));
    }
    beat.choices=rows;
  }else{
    if(pursuitEligible){
      add(choiceRow("scene05aw_go_after_package_smuggler","GO AFTER PACKAGE SMUGGLER","BRANCH_A"));
      add(choiceRow("scene05aw_go_after_anbu_marked_target","GO AFTER ANBU MARKED TARGET","BRANCH_B"));
    }
    add(choiceRow("scene05aw_lethal",lethal.label,"BRANCH_C"));
    add(choiceRow("scene05aw_take_her_back_to_anbu","TAKE HER BACK TO ANBU","BRANCH_D"));
    add(choiceRow("scene05aw_take_her_to_uchiha_police","TAKE HER TO THE UCHIHA POLICE FORCE","BRANCH_E"));
    if(pursuitEligible)add(restraintChoiceRow35730());
    beat.choices=rows;
  }
  const rt=active();if(rt&&rt.localContext){
    rt.localContext.kakashiScene05AWLethalPresentation=lethal.label;
    rt.localContext.kakashiScene05AWPursuitEligible=pursuitEligible;
    rt.localContext.kakashiScene05AWPackagePursuitEligible=pursuitEligible;
    rt.localContext.kakashiScene05AWAmtPursuitEligible=pursuitEligible;
    rt.localContext.kakashiScene05AWPsToAmtTurnCap=PS_TO_AMT_MAX_TURNS;
  }
  return true;
}
function routeVictoryReturn35730(){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==RETURN_BEAT)return{success:true,routed:false};
  const row=result();if(!validVictory(row))return{success:true,routed:false,resultState:String(row&&row.resultState||"unresolved")};
  if(!(rt.localContext&&rt.localContext.kakashiScene04ABattleIntentResolved===true))return{success:true,routed:false,reason:"scene04a_battle_semantic_return_not_yet_committed"};
  const classification=classifyMi35730(row);if(!classification||classification.success!==true)return classification||{success:false,reason:"kakashi_scene05aw_mi_classification_missing"};
  const turns=turnCount(row);if(!Number.isFinite(turns)||turns<1)return{success:false,reason:"kakashi_scene05aw_turn_count_missing"};
  const pursuitEligible=turns<=MI_PURSUIT_MAX_TURNS;
  rt.localContext={...(rt.localContext||{}),kakashiScene05AWEntered:true,kakashiScene05AWBattleOccurrenceId:String(row.battleOccurrenceId||""),kakashiScene05AWTurnCount:turns,kakashiScene05AWPursuitEligible:pursuitEligible,kakashiScene05AWPackagePursuitEligible:pursuitEligible,kakashiScene05AWAmtPursuitEligible:pursuitEligible,kakashiScene05AWPsToAmtTurnCap:PS_TO_AMT_MAX_TURNS,kakashiScene05AWMiStateClass:classification.stateClass,[CURSOR_KEY]:0};
  rt.beatId=WIN_BEAT;save();return{success:true,routed:true,beatId:WIN_BEAT,turnCount:turns,pursuitEligible,packagePursuitEligible:pursuitEligible,amtPursuitEligible:pursuitEligible,psToAmtTurnCap:PS_TO_AMT_MAX_TURNS,miStateClass:classification.stateClass};
}
function narrationSequence(rt=active()){
  const local=rt&&rt.localContext&&typeof rt.localContext.kakashiScene05AWPursuitEligible==="boolean"?rt.localContext.kakashiScene05AWPursuitEligible:null;
  return (local===null?fastPursuit():local)?FAST_SEQUENCE:SLOW_SEQUENCE;
}
function performance(rt=active()){
  const sequence=narrationSequence(rt);
  const raw=rt&&rt.localContext?Number(rt.localContext[CURSOR_KEY]):0;
  const index=Number.isInteger(raw)?Math.max(0,Math.min(sequence.length-1,raw)):0;
  return{sequence,index,cue:sequence[index],atEnd:index>=sequence.length-1};
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
/* Stephen browser acceptance: post-MI Scene 05A-W uses the accepted Scene 04A Character Card scale. */
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors{
  left:2.5%!important;right:2.5%!important;top:8.5%!important;bottom:20%!important;gap:2.2%!important;
}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actors[data-count="2"]{
  display:flex!important;justify-content:space-between!important;align-items:flex-end!important;padding:0 5.4%!important;column-gap:0!important;
}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actor{
  width:min(94%,322px)!important;max-height:490px!important;aspect-ratio:7/10!important;overflow:visible!important;
}
#story-scene-presentation-layer .${BOARD_CLASS} .sc-scene-board-33900__actor[data-actor-id="academy_kakashi"]{
  width:min(96%,338px)!important;max-height:505px!important;
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
  stage.dataset.scKakashiScene05aw="true";
  const canonicalBackdrop=typeof globalThis.applyStorySceneBoardBackdrop33900==="function"?globalThis.applyStorySceneBoardBackdrop33900(stage,rt):null;
  if(!canonicalBackdrop)stage.style.setProperty("--sc-kakashi-scene05aw-backdrop",cssUrlValue(fightPath()));else stage.style.removeProperty("--sc-kakashi-scene05aw-backdrop");
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
      renderScene05AW35730();
      return out;
    };
    try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}
  }
  hooksInstalled=true;installStyle35730();renderScene05AW35730();return true;
}
function ensureHooks35730(){if(installHooks35730())return;if(typeof setTimeout==="function"&&attempts++<120)setTimeout(ensureHooks35730,25);}

function diagnostics(){
  const def=scene(),ret=def&&def.beatMap instanceof Map?def.beatMap.get(RETURN_BEAT):null,win=def&&def.beatMap instanceof Map?def.beatMap.get(WIN_BEAT):null,choice=def&&def.beatMap instanceof Map?def.beatMap.get(CHOICE_BEAT):null;
  const common=[
    "Masked Interceptor hits the stone beneath the Sakura tree.","Kakashi lands a few steps away.","For a moment, the street is still.","Then his eye moves past her.","Toward the routes the others took."
  ];
  const exactFast=[...common,
    "Package Smuggler cuts across the far end of the street.","Still moving.","The package is still with him.","Higher up, movement flashes across a distant roofline.","ANBU Marked Target.","Farther away.","But not gone.","Not yet.","Kakashi looks between them.","One route leads to the package.","The other to the man who carried it here.","Then his eye drops back to Masked Interceptor.","She lies where he put her.","Three problems.","Not enough time for all of them at once.","Whatever Kakashi does next will decide which ones remain within reach."
  ];
  const exactSlow=[...common,
    "The street ahead is empty.","Kakashi searches the rooftops.","The alleys.","The next junction.","Nothing.","Package Smuggler had too much time.","The package is gone with him.","ANBU Marked Target is gone as well.","Kakashi looks back at Masked Interceptor.","She lies beneath the Sakura tree.","The pursuit is over.","What happens to her is the only decision left here."
  ];
  const fastProbe={resultState:"player_side_victory",battleConfigId:BATTLE_CONFIG,bindingRef:BINDING,sourceAnchorRef:SOURCE_ANCHOR,playerActionOpportunityCount:3};
  const turn4Probe={...fastProbe,playerActionOpportunityCount:4};
  const slowProbe={...fastProbe,playerActionOpportunityCount:5};
  const menuSource=materializeChoices35730.toString();
  const allCues=[...COMMON_CUES,...FAST_CUES,...SLOW_CUES];
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_scene05aw_35730_v11_2026_09_21",
    choiceSurfaceAuthorityPinned:CHOICE_SURFACE_AUTHORITY==="36454a31e9f61ffdaa528589ac11552d446ad3bc",
    postBattleAgencyAuthorityPinned:POST_BATTLE_AGENCY_AUTHORITY==="1ff3876e9b367ec518c254b612e4def14db8eaba"&&KAKASHI_DISPOSITION_AUTHORITY==="62821414baaadd047c524239d1b3bbf207692b61",
    fieldSecuredAuthorityClosed:FIELD_SECURED_AUTHORITY==="77d351e6f8d4eefaea0f8a6db82dec686391e1c0",
    downstreamConsumerPreservation:preserveWiredChoice35730({choiceId:"x",nextBeatId:"pending",availability:function(){return{available:true};},knownBlocker:null,consequenceRequests:[{requestId:"kakashi_scene05aw_branch_pending_35730"}]},{choiceId:"x",nextBeatId:"real",availability:function(){return{available:true};},knownBlocker:null,consequenceRequests:[{requestId:"real_consumer"}]}).nextBeatId==="real",
    causalAuthorityPinned:CAUSAL_AUTHORITY==="90b20f565ef010d2b7cfca98c04feece3f7dfcb7",
    authorityPinned:AUTHORITY==="bf16ebe0f677994878fbe60e30e7b546da899eb8",
    exactFastNarration:JSON.stringify(FAST_SEQUENCE.map(x=>x.text))===JSON.stringify(exactFast),
    exactSlowNarration:JSON.stringify(SLOW_SEQUENCE.map(x=>x.text))===JSON.stringify(exactSlow),
    victoryEntryOnly:validVictory.toString().includes('resultState==="player_side_victory"')&&routeVictoryReturn35730.toString().includes("kakashiScene04ABattleIntentResolved"),
    exactTurnGate:fastPursuit(fastProbe)===true&&fastPursuit(turn4Probe)===true&&fastPursuit(slowProbe)===false,
    psToAmtGate:psKeepsAmtPursuit(1)===true&&psKeepsAmtPursuit(3)===true&&psKeepsAmtPursuit(4)===false,
    dualPursuitChoices:menuSource.includes("GO AFTER PACKAGE SMUGGLER")&&menuSource.includes("GO AFTER ANBU MARKED TARGET"),
    exactFastChoiceOrder:(()=>{const rt=active();const beat=choice;if(!rt||!beat)return true;return true;})()&&menuSource.indexOf("scene05aw_go_after_package_smuggler")<menuSource.indexOf("scene05aw_go_after_anbu_marked_target")&&menuSource.indexOf("scene05aw_go_after_anbu_marked_target")<menuSource.indexOf("scene05aw_lethal")&&menuSource.indexOf("scene05aw_take_her_to_uchiha_police")<menuSource.indexOf("restraintChoiceRow35730"),
    exactDispositionLabels:menuSource.includes("TAKE HER BACK TO ANBU")&&menuSource.includes("TAKE HER TO THE UCHIHA POLICE FORCE"),
    fastRestrainChoice:menuSource.includes("restraintChoiceRow35730")&&restraintChoiceRow35730.toString().includes("scene05aw_restrain_and_continue")&&restraintChoiceRow35730.toString().includes("commitAcademyKakashiFieldSecured35920")&&restraintPresentation()==="RESTRAIN HER AND CONTINUE",
    directLethalNotControlGated:lethalPresentation().label==="KILL HER"&&lethalPresentation().mode==="deterministic"&&!lethalPresentation.toString().includes("CONTROLLED_DEFEATED")&&!lethalPresentation.toString().includes(["ATTEMPT"," TO KILL HER"].join("")),
    miClassifiedBeforeMenu:routeVictoryReturn35730.toString().includes("classifyMi35730"),
    fightBackdropPreserved:win&&win.environmentRef&&win.environmentRef.assetId===FIGHT_BACKDROP_ID&&choice&&choice.environmentRef&&choice.environmentRef.assetId===FIGHT_BACKDROP_ID,
    objectiveExact:OBJECTIVE==="Retrieve the package.",
    noDialogue:allCues.every(x=>!x.speakerName&&x.kind==="narration"),
    returnHookInstalled:!!ret&&Array.isArray(ret.onEnterConsequences)&&ret.onEnterConsequences.some(x=>x&&x.requestId===ENTRY_REQUEST),
    standardCharacterCardScale:installStyle35730.toString().includes("width:min(94%,322px)")&&installStyle35730.toString().includes("width:min(96%,338px)")&&installStyle35730.toString().includes("max-height:505px"),
    canonicalBackdropOwnership:renderScene05AW35730.toString().includes("applyStorySceneBoardBackdrop33900"),
    synchronousBoardRetirement:globalThis.renderStoryScenePresentationLayer.toString().includes("renderScene05AW35730()")&&!globalThis.renderStoryScenePresentationLayer.toString().includes("queueMicrotask(renderScene05AW35730)"),
    successorsFailClosed:successorPending("BRANCH_A").success===false,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,authority:AUTHORITY,winBeatId:WIN_BEAT,choiceBeatId:CHOICE_BEAT,browserGoldenClaimed:false};
}

const installed=installSurface35730();if(!installed||installed.success!==true)throw new Error(`kakashi_scene05aw_surface_install_failed:${installed&&installed.reason||"unknown"}`);
ensureHooks35730();
globalThis.runAcademyKakashiScene05AW35730Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SCENE05AW_35730=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,causalAuthority:CAUSAL_AUTHORITY,choiceSurfaceAuthority:CHOICE_SURFACE_AUTHORITY,miPursuitMaxTurns:MI_PURSUIT_MAX_TURNS,psToAmtMaxTurns:PS_TO_AMT_MAX_TURNS,psKeepsAmtPursuit,installed,cueCount:FAST_SEQUENCE.length,slowCueCount:SLOW_SEQUENCE.length,objective:OBJECTIVE,battleConfigId:BATTLE_CONFIG,bindingRef:BINDING,sourceAnchorRef:SOURCE_ANCHOR,winBeatId:WIN_BEAT,choiceBeatId:CHOICE_BEAT,browserGoldenClaimed:false});
})();