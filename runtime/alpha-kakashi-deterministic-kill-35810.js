// ============================================================================
// ISSUE #249 — ACADEMY KAKASHI — DETERMINISTIC KILL HER — 35810
//
// Writing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_06A_W2C_Kill_Her_Deterministic_Verbatim_Lock_2026-09-19.md
// commit 0d4aa441e4ef6d566f3d1df23c198940bdc559dd
//
// KILL is a direct authored post-Battle disposition after a valid living-target
// victory. Hidden CONTROLLED_DEFEATED classification no longer gates player
// agency. Death still commits before cinematic realization, then pursuit is
// recalculated from the already committed fast-win state.
// ============================================================================
(function installAcademyKakashiDeterministicKill35810(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_DETERMINISTIC_KILL_35810)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
if(!A||typeof A.commitOccurrence!=="function"||typeof A.findOccurrence!=="function"||!CORE||!PROVIDER)throw new Error("kakashi_deterministic_kill_35810_dependencies_missing");

const PATCH_ID="alpha_kakashi_deterministic_kill_35810_v2_2026_09_19";
const AUTHORITY="0d4aa441e4ef6d566f3d1df23c198940bdc559dd";
const POST_BATTLE_AGENCY_AUTHORITY="1ff3876e9b367ec518c254b612e4def14db8eaba";
const KAKASHI_DISPOSITION_AUTHORITY="62821414baaadd047c524239d1b3bbf207692b61";
const STORY_UNIT_REF="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_BEAT="kak_scene05a_w_choice";
const SOURCE_CHOICE="scene05aw_lethal";
const SCENE_BEAT="kak_scene06a_w2c_deterministic_kill_35810";
const AFTERMATH_BEAT="kak_scene06a_w2c_deterministic_kill_aftermath_35810";
const PURSUIT_BEAT="kak_scene06a_w2c_deterministic_kill_pursuit_35810";
const REPORT_PENDING_BEAT="kak_scene06a_w2c_deterministic_kill_report_pending_35810";
const MI="academy_kakashi_origin_masked_interceptor";
const PACKAGE="kakashi_origin_outer_route_packet";
const BINDING="academy_kakashi.lethal.kill_deterministic";
const INTENT_CHOICE="scene06aw2c_kill_deterministic_intent";
const SOURCE_REQUEST="kakashi_scene06aw2c_deterministic_kill_35810";
const CURSOR_SCENE="__kakashiDeterministicKillScene35810";
const CURSOR_AFTER="__kakashiDeterministicKillAfter35810";
const STYLE_ID="sc-kakashi-deterministic-kill-35810-style";
const BOARD_CLASS="sc-kakashi-deterministic-kill-35810-board";
const BACKDROP_ID="kakashi_origin_fight_at_sakura_tree";
const BACKDROP_PATH="Kakashi Origin Backdrop/fight_at_sakura_tree.png";
const OBJECTIVE="Retrieve the package.";
const REPORT_OBJECTIVE="Report to ANBU.";

const COMMON_SCENE=Object.freeze([
  Object.freeze({kind:"narration",text:"Masked Interceptor does not get back up.",focusActorRef:MI}),
  Object.freeze({kind:"narration",text:"Kakashi stands over her.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"Her weapon is out of reach.",focusActorRef:MI}),
  Object.freeze({kind:"narration",text:"The fight is finished.",focusActorRef:"academy_kakashi"})
]);
const OPEN_SCENE=Object.freeze([
  Object.freeze({kind:"narration",text:"Kakashi looks once toward the street.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"Package Smuggler is still within reach.",focusActorRef:"package_smuggler"}),
  Object.freeze({kind:"narration",text:"ANBU Marked Target is farther ahead.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({kind:"narration",text:"There is still time to move.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"Kakashi looks back down.",focusActorRef:MI}),
  Object.freeze({kind:"narration",text:"He makes his decision.",focusActorRef:"academy_kakashi"})
]);
const COMMON_FINISH=Object.freeze([
  Object.freeze({kind:"narration",text:"His hand closes around the kunai.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"Masked Interceptor sees it.",focusActorRef:MI}),
  Object.freeze({kind:"narration",text:"There is no second fight.",focusActorRef:MI}),
  Object.freeze({kind:"narration",text:"No opening left for her to take.",focusActorRef:MI}),
  Object.freeze({kind:"narration",text:"Kakashi moves.",focusActorRef:"academy_kakashi"})
]);
const AFTER_COMMON=Object.freeze([
  Object.freeze({kind:"narration",text:"Petals drift across the stone.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"Masked Interceptor remains where she fell.",focusActorRef:MI}),
  Object.freeze({kind:"narration",text:"Her weapon rests a short distance from her hand.",focusActorRef:MI}),
  Object.freeze({kind:"narration",text:"Kakashi straightens.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"The kunai stays in his grip for another moment.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"Then he lowers it.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"His eye returns to the road.",focusActorRef:"academy_kakashi"})
]);
const AFTER_OPEN=Object.freeze([
  Object.freeze({kind:"narration",text:"The others are still moving.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"So is Kakashi.",focusActorRef:"academy_kakashi"})
]);
const AFTER_CLOSED=Object.freeze([
  Object.freeze({kind:"narration",text:"The road ahead is empty.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"Whatever chance remained to recover the package is gone.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"Kakashi puts the kunai away.",focusActorRef:"academy_kakashi"}),
  Object.freeze({kind:"narration",text:"There is only one place left to go.",focusActorRef:"academy_kakashi"})
]);

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(ch){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];});}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_error){return null;}}
function stable(prefix,payload){return typeof PROVIDER.stableRef==="function"?PROVIDER.stableRef(prefix,payload):prefix+"::"+JSON.stringify(payload||{});}
function currentMiState(){try{const s=CORE.getStoryUnitSnapshot(STORY_UNIT_REF)||{},r=s.participantStates&&s.participantStates[MI]||null;return String(r&&r.stateClass||"");}catch(_error){return"";}}
function eligible(rt=active()){
  const state=currentMiState();
  return !!rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&rt.localContext&&rt.localContext.kakashiScene05AWEntered===true&&["CONTROLLED_DEFEATED","DEFEATED_BUT_NOT_CONTROLLED"].includes(state);
}
function prePursuit(rt=active()){return !!(rt&&rt.localContext&&rt.localContext.kakashiScene05AWPursuitEligible===true&&Number(rt.localContext.kakashiScene05AWTurnCount)>=1&&Number(rt.localContext.kakashiScene05AWTurnCount)<=4);}
function sceneSequence(rt=active()){return Object.freeze(prePursuit(rt)?[...COMMON_SCENE,...OPEN_SCENE,...COMMON_FINISH]:[...COMMON_SCENE,...COMMON_FINISH]);}
function afterSequence(rt=active()){const open=!!(rt&&rt.localContext&&rt.localContext.kakashiDeterministicKillPursuitAvailable===true);return Object.freeze(open?[...AFTER_COMMON,...AFTER_OPEN]:[...AFTER_COMMON,...AFTER_CLOSED]);}
function cursor(key,sequence,rt=active()){const raw=Number(rt&&rt.localContext&&rt.localContext[key]);return Number.isInteger(raw)?Math.max(0,Math.min(sequence.length-1,raw)):0;}
function performance(rt=active()){if(!rt)return null;if(rt.beatId===SCENE_BEAT){const s=sceneSequence(rt),i=cursor(CURSOR_SCENE,s,rt);return{sequence:s,index:i,cue:s[i],atEnd:i>=s.length-1,key:CURSOR_SCENE};}if(rt.beatId===AFTERMATH_BEAT){const s=afterSequence(rt),i=cursor(CURSOR_AFTER,s,rt);return{sequence:s,index:i,cue:s[i],atEnd:i>=s.length-1,key:CURSOR_AFTER};}return null;}
function family(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&[SCENE_BEAT,AFTERMATH_BEAT,PURSUIT_BEAT,REPORT_PENDING_BEAT].includes(rt.beatId);}

function registerSemantic(){
  if(typeof CORE.registerResolver!=="function")return{success:false,reason:"semantic_resolver_registry_missing"};
  return CORE.registerResolver(BINDING,function(spec){const state=spec&&spec.state||{},r=state.resolverResults&&state.resolverResults[BINDING];if(!r||r.success!==true)return{success:false,reason:"deterministic_kill_result_missing"};return r;},{owner:PATCH_ID});
}
function ensureIntent(rt=active()){
  if(!eligible(rt))return{success:false,reason:"post_battle_defeated_living_target_required"};
  const stateRef=stable("sc35810-deterministic-kill-entry",{instance:String(rt.instanceId||""),battle:String(rt.localContext.kakashiScene05AWBattleOccurrenceId||""),turns:Number(rt.localContext.kakashiScene05AWTurnCount||0)});
  const existingId=String(rt.localContext.kakashiDeterministicKillIntentReceiptId||"");
  if(existingId){const snap=CORE.getStoryUnitSnapshot(STORY_UNIT_REF)||{},existing=snap.decisionReceipts&&snap.decisionReceipts[existingId];if(existing)return{success:true,idempotent:true,receipt:existing,stateRef};}
  const opened=CORE.openSemanticChoiceSet({storyUnitRef:STORY_UNIT_REF,storyUnitType:"origin",decisionPointRef:"SCENE_06A_W2C_DETERMINISTIC_KILL",contextStateRef:stateRef,sceneRef:SCENE_ID,beatRef:SOURCE_BEAT,authorityVersionRefs:[AUTHORITY,POST_BATTLE_AGENCY_AUTHORITY,KAKASHI_DISPOSITION_AUTHORITY],sourceOccurrenceRefs:[String(rt.localContext.kakashiScene05AWBattleOccurrenceId||"")],observerRef:STORY_UNIT_REF,choices:[{choiceId:INTENT_CHOICE,intentType:"KILL",intentPayload:{semanticClass:"KILL — GUARANTEED",targetRef:MI,outcomeMode:"deterministic"},resolverBindingRef:BINDING,presentationLabel:"KILL HER",authoredOrder:0}]});
  if(!opened||opened.success!==true)return opened||{success:false,reason:"deterministic_kill_choice_set_failed"};
  const committed=CORE.commitStoryIntent({storyUnitRef:STORY_UNIT_REF,choiceSetId:opened.choiceSet.choiceSetId,choiceId:INTENT_CHOICE});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"deterministic_kill_intent_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiDeterministicKillIntentReceiptId:committed.receipt.storyDecisionReceiptId,kakashiDeterministicKillIntentCommitRef:committed.receipt.intentCommitRef,kakashiDeterministicKillEntryStateRef:stateRef,kakashiDeterministicKillPursuitWasOpen:prePursuit(rt),kakashiDeterministicKillPrePackageEligible:rt.localContext.kakashiScene05AWPackagePursuitEligible===true,kakashiDeterministicKillPreAmtEligible:rt.localContext.kakashiScene05AWAmtPursuitEligible===true};save();
  return{success:true,receipt:committed.receipt,stateRef};
}
function pursuitAfterKill(rt=active()){
  const open=!!(rt&&rt.localContext&&rt.localContext.kakashiDeterministicKillPursuitWasOpen===true&&Number(rt.localContext.kakashiScene05AWTurnCount)>=1&&Number(rt.localContext.kakashiScene05AWTurnCount)<=4);
  return{pursuitAvailable:open,packageSmugglerAvailable:open&&rt.localContext.kakashiDeterministicKillPrePackageEligible!==false,anbuMarkedTargetAvailable:open&&rt.localContext.kakashiDeterministicKillPreAmtEligible!==false};
}
function commitDeath(rt=active()){
  if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==SCENE_BEAT)return{success:false,reason:"deterministic_kill_scene_required"};
  const receiptId=String(rt.localContext&&rt.localContext.kakashiDeterministicKillIntentReceiptId||"");if(!receiptId)return{success:false,reason:"deterministic_kill_intent_receipt_missing"};
  const id=stable("occ_origin_kakashi_scene06_w2c_deterministic_kill",{instance:String(rt.instanceId||""),receipt:receiptId,battle:String(rt.localContext.kakashiScene05AWBattleOccurrenceId||"")});
  let record=occurrence(id),existed=!!record;const pursuit=pursuitAfterKill(rt);
  if(!record){
    const fact={factClass:"academy_kakashi_scene06_w2c_deterministic_kill",sceneId:"SCENE_06A_W2C_KILL_HER",storySceneInstanceId:String(rt.instanceId||""),authorityCommit:AUTHORITY,semanticClass:"KILL — GUARANTEED",outcomeMode:"deterministic",lethalIntentCommitted:true,targetRef:MI,targetDeathConfirmed:true,selectedOutcomeRef:"DETERMINISTIC_KILL_KILLED",confirmedKillCountDelta:1,failedLethalAttemptCountDelta:0,battleOccurrenceId:String(rt.localContext.kakashiScene05AWBattleOccurrenceId||""),battleTurns:Number(rt.localContext.kakashiScene05AWTurnCount||0),packageState:{objectRef:PACKAGE,currentHolderClass:"PACKAGE_SMUGGLER",recovered:false,available:pursuit.packageSmugglerAvailable},worldFacts:{packageSmugglerAvailable:pursuit.packageSmugglerAvailable,anbuMarkedTargetAvailable:pursuit.anbuMarkedTargetAvailable,pursuitAvailable:pursuit.pursuitAvailable,pakkunPresent:false},lethalTrajectoryHistory:{targetRef:MI,semanticClass:"deterministic_kill",outcome:"CONFIRMED_KILL"},kakashiKnowledge:{targetDeathKnown:true,hiddenOperationKnown:false}};
    const out=A.commitOccurrence(STORY_UNIT_REF,id,fact,[],{type:"origin_story_deterministic_kill",outcome:"confirmed_kill",participantRefs:[STORY_UNIT_REF,MI],sourceRefs:[{type:"battle_occurrence",id:String(rt.localContext.kakashiScene05AWBattleOccurrenceId||"")},{type:"story_decision_receipt",id:receiptId},{type:"writing_authority",id:AUTHORITY}]});
    if(!out||out.success!==true)return out||{success:false,reason:"deterministic_kill_occurrence_failed"};record=out.record||occurrence(id);
  }
  const resultRef=stable("sc35810-mi-dead",{occurrenceId:id});
  const classified=CORE.recordParticipantClassification({storyUnitRef:STORY_UNIT_REF,participantRef:MI,stateClass:"DEAD",resultRef});
  if(!classified||classified.success!==true)return classified||{success:false,reason:"deterministic_kill_dead_classification_failed"};
  const snap=CORE.getStoryUnitSnapshot(STORY_UNIT_REF)||{},receipt=snap.decisionReceipts&&snap.decisionReceipts[receiptId];if(!receipt)return{success:false,reason:"deterministic_kill_receipt_not_persisted"};
  const bridge={success:true,resolverResultRef:id,consequenceRefs:[id],stateDeltaRefs:[resultRef],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],participantStateDeltaRefs:[resultRef],successorSituationRef:pursuit.pursuitAvailable?"academy_kakashi.stop_assassin.post_lethal_pursuit":"academy_kakashi.stop_assassin.report",result:{outcomeClass:"DETERMINISTIC_KILL_KILLED",targetRef:MI,targetDeathConfirmed:true,pursuit}};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:STORY_UNIT_REF,receiptId,state:{resolverResults:{[BINDING]:bridge}},context:{sceneRef:SCENE_ID,originId:STORY_UNIT_REF,storySceneInstanceId:String(rt.instanceId||"")}});
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"deterministic_kill_semantic_dispatch_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiDeterministicKillOccurrenceId:id,kakashiDeterministicKillOutcomeRef:"DETERMINISTIC_KILL_KILLED",kakashiDeterministicKillPursuitAvailable:pursuit.pursuitAvailable,kakashiDeterministicKillPackageAvailable:pursuit.packageSmugglerAvailable,kakashiDeterministicKillAmtAvailable:pursuit.anbuMarkedTargetAvailable,kakashiScene05AWPursuitEligible:pursuit.pursuitAvailable,kakashiScene05AWPackagePursuitEligible:pursuit.packageSmugglerAvailable,kakashiScene05AWAmtPursuitEligible:pursuit.anbuMarkedTargetAvailable,kakashiDeterministicKillMiCardRemoved:false};save();
  return{success:true,idempotent:existed,occurrenceId:id,pursuit};
}

function sourceChoice(){const d=scene(),b=d&&d.beatMap instanceof Map?d.beatMap.get(SOURCE_BEAT):null;return b&&Array.isArray(b.choices)?b.choices.find(x=>x&&x.choiceId===SOURCE_CHOICE):null;}
function wireSource(){
  const row=sourceChoice();if(!row)return false;
  if(!eligible())return false;
  row.label="KILL HER";row.nextBeatId=SCENE_BEAT;row.availability=function(){return{available:eligible(),knownBlocker:eligible()?null:"POST-BATTLE DEFEAT REQUIRED"};};row.knownBlocker=null;
  row.consequenceRequests=[{requestId:SOURCE_REQUEST,kind:"domain",resolve:function(){const rt=active(),intent=ensureIntent(rt);if(!intent||intent.success!==true)return intent;rt.beatId=SCENE_BEAT;rt.localContext={...(rt.localContext||{}),[CURSOR_SCENE]:0};save();return{success:true,beatId:SCENE_BEAT,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId};}}];
  return true;
}
function pursuitChoices(rt=active()){
  const rows=[];
  if(rt&&rt.localContext&&rt.localContext.kakashiDeterministicKillPackageAvailable===true)rows.push({choiceId:"scene06aw2c_dkill_go_after_package_smuggler",label:"GO AFTER PACKAGE SMUGGLER",nextBeatId:PURSUIT_BEAT,availability:function(){return{available:true,knownBlocker:null};},knownBlocker:null,consequenceRequests:[{requestId:"kakashi_dkill_ps_successor_pending_35810",kind:"domain",resolve:function(){return{success:false,reason:"kakashi_stop_assassin_postkill_ps_successor_scene_not_yet_locked",pursuitStatePreserved:true};}}]});
  if(rt&&rt.localContext&&rt.localContext.kakashiDeterministicKillAmtAvailable===true)rows.push({choiceId:"scene06aw2c_dkill_go_after_anbu_marked_target",label:"GO AFTER ANBU MARKED TARGET",nextBeatId:PURSUIT_BEAT,availability:function(){return{available:true,knownBlocker:null};},knownBlocker:null,consequenceRequests:[{requestId:"kakashi_dkill_amt_successor_pending_35810",kind:"domain",resolve:function(){return{success:false,reason:"kakashi_stop_assassin_postkill_amt_successor_scene_not_yet_locked",pursuitStatePreserved:true};}}]});
  return rows;
}
function materializePursuit(){
  const d=scene(),b=d&&d.beatMap instanceof Map?d.beatMap.get(PURSUIT_BEAT):null;if(!b)return false;
  b.choices=pursuitChoices();return true;
}
function installBeats(){
  const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return false;
  m.set(SCENE_BEAT,{beatId:SCENE_BEAT,mode:"narration",environmentRef:{assetId:BACKDROP_ID},text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(AFTERMATH_BEAT,{beatId:AFTERMATH_BEAT,mode:"narration",environmentRef:{assetId:BACKDROP_ID},text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(PURSUIT_BEAT,{beatId:PURSUIT_BEAT,mode:"choice",environmentRef:{assetId:BACKDROP_ID},objectiveText:OBJECTIVE,text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(REPORT_PENDING_BEAT,{beatId:REPORT_PENDING_BEAT,mode:"narration",environmentRef:{assetId:BACKDROP_ID},objectiveText:REPORT_OBJECTIVE,text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
  return true;
}
function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;
  const s=document.createElement("style");s.id=STYLE_ID;s.textContent=
    "."+BOARD_CLASS+"{position:absolute;inset:0;z-index:6;pointer-events:none;overflow:hidden}"+
    "."+BOARD_CLASS+" .sc-scene-board-33900__actors{left:2.5%!important;right:2.5%!important;top:8.5%!important;bottom:20%!important;display:flex!important;justify-content:space-between!important;align-items:flex-end!important;padding:0 5.4%!important}"+
    "."+BOARD_CLASS+" .sc-scene-board-33900__actor{width:min(94%,322px)!important;max-height:490px!important;aspect-ratio:7/10!important}"+
    "."+BOARD_CLASS+" .sc-scene-board-33900__actor[data-actor-id='academy_kakashi']{width:min(96%,338px)!important;max-height:505px!important}"+
    "."+BOARD_CLASS+" .sc-kakashi-mi-death-drop-35810{animation:kakashiMiDeathDrop35810 .60s cubic-bezier(.35,.05,.75,.2) both!important}"+
    "@keyframes kakashiMiDeathDrop35810{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(72vh) rotate(8deg)}}";
  document.head.appendChild(s);return true;
}
function backdrop(){try{if(typeof getSceneBackdropAssetPath==="function")return getSceneBackdropAssetPath(BACKDROP_ID)||BACKDROP_PATH;}catch(_error){}return BACKDROP_PATH;}
function actor(id,label,img,state,focus){return'<figure class="sc-scene-board-33900__actor '+(focus?"is-focus":"")+'" data-actor-id="'+esc(id)+'"><div class="sc-scene-board-33900__actor-frame"></div><img src="'+esc(img)+'" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>'+esc(label)+'</strong><small>'+esc(state)+'</small></figcaption></figure>';}
function render(){
  wireSource();materializePursuit();
  if(typeof document==="undefined")return false;const rt=active(),layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer;
  for(const old of stage.querySelectorAll?stage.querySelectorAll("."+BOARD_CLASS):[])if(!family(rt))old.remove();
  if(!family(rt))return false;
  installStyle();stage.style.backgroundImage='linear-gradient(180deg,rgba(2,5,8,.02),rgba(2,5,8,.05) 50%,rgba(2,5,8,.40) 82%,rgba(2,5,8,.68)),url("'+String(backdrop()).replace(/"/g,"%22")+'")';stage.style.backgroundSize="cover";stage.style.backgroundPosition="center";
  let board=stage.querySelector("."+BOARD_CLASS);if(!board){board=document.createElement("section");board.className=BOARD_CLASS;stage.appendChild(board);}
  const p=performance(rt),focus=p&&p.cue&&p.cue.focusActorRef||"academy_kakashi",removed=rt.localContext&&rt.localContext.kakashiDeterministicKillMiCardRemoved===true;
  const actors=[actor("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png",rt.beatId===PURSUIT_BEAT?"PURSUIT DECISION":"PRESENT",focus==="academy_kakashi")];
  if(!removed)actors.push(actor(MI,"MASKED INTERCEPTOR","NPC/masked_interceptor.png",rt.localContext&&rt.localContext.kakashiDeterministicKillOutcomeRef?"DEAD":"CONTROLLED · DEFEATED",focus===MI));
  const objective=rt.beatId===REPORT_PENDING_BEAT?REPORT_OBJECTIVE:OBJECTIVE;
  board.innerHTML='<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+esc(objective)+'</div></div><div class="sc-scene-board-33900__actors" data-count="'+actors.length+'">'+actors.join("")+'</div>';
  if(p){const text=layer.querySelector(".sc-story-text");if(text)text.textContent=p.cue.text;const name=layer.querySelector(".sc-story-name");if(name){name.textContent="";name.style.display="none";}const kicker=layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent="NARRATION · ACADEMY KAKASHI";}
  return true;
}
function playCommittedKill(rt){
  const enterAfter=function(){
    rt.beatId=AFTERMATH_BEAT;rt.localContext={...(rt.localContext||{}),[CURSOR_AFTER]:0};save();try{renderStoryScenePresentationLayer();}catch(_error){}
    if(typeof document==="undefined"){rt.localContext.kakashiDeterministicKillMiCardRemoved=true;save();return;}
    try{const layer=document.getElementById("story-scene-presentation-layer"),stage=layer&&((layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer),mi=stage&&stage.querySelector&&stage.querySelector("."+BOARD_CLASS+" [data-actor-id='"+MI+"']");if(mi){mi.classList.add("sc-kakashi-mi-death-drop-35810");setTimeout(function(){rt.localContext.kakashiDeterministicKillMiCardRemoved=true;save();try{mi.remove();}catch(_error){}},620);}}catch(_error){}
  };
  if(typeof document==="undefined"){enterAfter();return true;}
  const animate=globalThis.playAcademyKakashiLethalAttemptAnimation35770;if(typeof animate==="function")return animate(enterAfter);enterAfter();return true;
}
function transitionAftermath(rt){
  if(rt.localContext&&rt.localContext.kakashiDeterministicKillPursuitAvailable===true){materializePursuit();rt.beatId=PURSUIT_BEAT;}else rt.beatId=REPORT_PENDING_BEAT;
  save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:rt.beatId,pursuitAvailable:rt.beatId===PURSUIT_BEAT};
}

const registered=registerSemantic();if(!registered||registered.success!==true)throw new Error("kakashi_deterministic_kill_semantic_registration_failed");
if(!installBeats())throw new Error("kakashi_deterministic_kill_beats_missing");

let hooked=false,tries=0;
function hooks(){
  if(hooked)return true;if(typeof globalThis.advanceStoryScene!=="function"||typeof globalThis.getStoryScenePerformance33900!=="function")return false;
  const PA=globalThis.advanceStoryScene,PG=globalThis.getStoryScenePerformance33900,PR=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  globalThis.getStoryScenePerformance33900=function(){const p=performance(active());return p||PG.apply(this,arguments);};
  globalThis.advanceStoryScene=function(choiceId=null){
    const rt=active();
    if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&choiceId===SOURCE_CHOICE&&eligible(rt)){const intent=ensureIntent(rt);if(!intent||intent.success!==true)return intent;rt.beatId=SCENE_BEAT;rt.localContext={...(rt.localContext||{}),[CURSOR_SCENE]:0};save();try{if(typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:SCENE_BEAT};}
    if(rt&&rt.beatId===SCENE_BEAT&&choiceId==null){const p=performance(rt);if(!p.atEnd){rt.localContext={...(rt.localContext||{}),[CURSOR_SCENE]:p.index+1};save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:SCENE_BEAT,cueIndex:p.index+1};}const killed=commitDeath(rt);if(!killed||killed.success!==true)return killed;playCommittedKill(rt);return{success:true,type:"deterministic_kill_committed_before_presentation",occurrenceId:killed.occurrenceId,pursuit:killed.pursuit};}
    if(rt&&rt.beatId===AFTERMATH_BEAT&&choiceId==null){const p=performance(rt);if(!p.atEnd){rt.localContext={...(rt.localContext||{}),[CURSOR_AFTER]:p.index+1};save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:AFTERMATH_BEAT,cueIndex:p.index+1};}return transitionAftermath(rt);}
    if(rt&&rt.beatId===PURSUIT_BEAT&&choiceId!=null){materializePursuit();return PA.apply(this,arguments);}
    if(rt&&rt.beatId===REPORT_PENDING_BEAT)return{success:false,reason:"deterministic_kill_report_scene_not_yet_locked",confirmedKill:true};
    return PA.apply(this,arguments);
  };
  try{advanceStoryScene=globalThis.advanceStoryScene;getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;}catch(_error){}
  if(PR){globalThis.renderStoryScenePresentationLayer=function(){const out=PR.apply(this,arguments);const settle=function(){wireSource();render();};if(typeof queueMicrotask==="function")queueMicrotask(settle);else setTimeout(settle,0);return out;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}}
  hooked=true;wireSource();render();return true;
}
function ensure(){if(hooks())return;if(typeof setTimeout==="function"&&tries++<120)setTimeout(ensure,25);}ensure();

function browserCapture(){
  if(typeof document==="undefined"||document.__scKakashiDkill35810)return false;document.__scKakashiDkill35810=true;
  document.addEventListener("click",function(event){const t=event&&event.target&&typeof event.target.closest==="function"?event.target.closest(".sc-story-choice"):null;if(!t||!eligible())return;const label=String(t.textContent||"").replace(/\s+/g," ").trim().toUpperCase();if(label!=="KILL HER")return;if(event.preventDefault)event.preventDefault();if(event.stopImmediatePropagation)event.stopImmediatePropagation();const rt=active(),intent=ensureIntent(rt);if(!intent||intent.success!==true)return;rt.beatId=SCENE_BEAT;rt.localContext={...(rt.localContext||{}),[CURSOR_SCENE]:0};save();try{renderStoryScenePresentationLayer();}catch(_error){}},true);return true;
}browserCapture();

function diagnostics(){
  const openExpected=["Masked Interceptor does not get back up.","Kakashi stands over her.","Her weapon is out of reach.","The fight is finished.","Kakashi looks once toward the street.","Package Smuggler is still within reach.","ANBU Marked Target is farther ahead.","There is still time to move.","Kakashi looks back down.","He makes his decision.","His hand closes around the kunai.","Masked Interceptor sees it.","There is no second fight.","No opening left for her to take.","Kakashi moves."];
  const afterOpenExpected=["Petals drift across the stone.","Masked Interceptor remains where she fell.","Her weapon rests a short distance from her hand.","Kakashi straightens.","The kunai stays in his grip for another moment.","Then he lowers it.","His eye returns to the road.","The others are still moving.","So is Kakashi."];
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_deterministic_kill_35810_v2_2026_09_19",
    authorityPinned:AUTHORITY==="0d4aa441e4ef6d566f3d1df23c198940bdc559dd",
    postBattleAgencyNotControlGated:eligible.toString().includes('"CONTROLLED_DEFEATED","DEFEATED_BUT_NOT_CONTROLLED"')&&!wireSource.toString().includes(["CONTROLLED_DEFEATED"," REQUIRED"].join("")),
    deterministicSemantic:ensureIntent.toString().includes('"KILL — GUARANTEED"')&&ensureIntent.toString().includes('outcomeMode:"deterministic"'),
    exactOpenScene:JSON.stringify([...COMMON_SCENE,...OPEN_SCENE,...COMMON_FINISH].map(x=>x.text))===JSON.stringify(openExpected),
    exactOpenAftermath:JSON.stringify([...AFTER_COMMON,...AFTER_OPEN].map(x=>x.text))===JSON.stringify(afterOpenExpected),
    deathBeforePresentation:globalThis.advanceStoryScene.toString().includes("commitDeath(rt)")&&globalThis.advanceStoryScene.toString().indexOf("commitDeath(rt)")<globalThis.advanceStoryScene.toString().indexOf("playCommittedKill(rt)"),
    deathClassification:commitDeath.toString().includes('stateClass:"DEAD"'),
    killLedgerFields:commitDeath.toString().includes("confirmedKillCountDelta:1")&&commitDeath.toString().includes("failedLethalAttemptCountDelta:0"),
    turnAndPackagePreserved:commitDeath.toString().includes("battleTurns")&&commitDeath.toString().includes('currentHolderClass:"PACKAGE_SMUGGLER"'),
    qualifyingKillPreservesPursuit:pursuitAfterKill({localContext:{kakashiDeterministicKillPursuitWasOpen:true,kakashiScene05AWTurnCount:4,kakashiDeterministicKillPrePackageEligible:true,kakashiDeterministicKillPreAmtEligible:true}}).packageSmugglerAvailable===true,
    successfulKillCardDrop:installStyle.toString().includes("kakashiMiDeathDrop35810")&&playCommittedKill.toString().includes("sc-kakashi-mi-death-drop-35810"),
    stateDerivedPursuitChoices:pursuitChoices.toString().includes("GO AFTER PACKAGE SMUGGLER")&&pursuitChoices.toString().includes("GO AFTER ANBU MARKED TARGET"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.runAcademyKakashiDeterministicKill35810Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_DETERMINISTIC_KILL_35810=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,bindingRef:BINDING,sceneBeatId:SCENE_BEAT,aftermathBeatId:AFTERMATH_BEAT,pursuitBeatId:PURSUIT_BEAT,reportPendingBeatId:REPORT_PENDING_BEAT,wireSource,commitDeath,pursuitAfterKill,diagnostics,browserGoldenClaimed:false});
})();
