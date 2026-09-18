// ============================================================================
// ISSUE #249 — ACADEMY KAKASHI STOP THE ASSASSIN LOSS ENDING — 35820
//
// Writing authorities:
// Scene 06A-L rooftop ANBU report:
//   8e1d18cdc2b1e2ca0c6d0d0b56dd3c3b5fd5d623
// Scene 07A-L hidden Hokage Office:
//   d0d29a18ae2104b0cd29c1ca29b1f5a88fef71ab
//
// Chronology:
// MI defeats Kakashi -> RETURN TO ANBU -> rooftop report -> black wipe ->
// hidden Hokage Office -> Chronicle Receipt -> Origin closure.
// ============================================================================
(function installAcademyKakashiLossEnding35820(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_LOSS_ENDING_35820)return;
const A=globalThis.SC_ALPHA_ORIGIN_32900;
const TERMINAL=globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
if(!A||!TERMINAL||!CORE)throw new Error("kakashi_loss_ending_35820_dependencies_missing");

const PATCH_ID="alpha_kakashi_loss_ending_35820_v1_2026_09_19";
const AUTH_REPORT="8e1d18cdc2b1e2ca0c6d0d0b56dd3c3b5fd5d623";
const AUTH_OFFICE="d0d29a18ae2104b0cd29c1ca29b1f5a88fef71ab";
const ORIGIN_ID="academy_kakashi",SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_BEAT="kak_scene05a_l_choice",SOURCE_CHOICE="scene05al_return_to_anbu";
const REPORT_BEAT="kak_scene06a_l_anbu_report_35820",OFFICE_BEAT="kak_scene07a_l_hokage_office_35820";
const RECEIPT_BEAT="kak_loss_chronicle_receipt_35820",EXIT_BEAT="kak_loss_origin_exit_35820";
const CURSOR_REPORT="__kakashiLossReport35820",CURSOR_OFFICE="__kakashiLossOffice35820";
const REPORT_OBJECTIVE="Return to ANBU.";
const STYLE_ID="sc-kakashi-loss-ending-35820-style",BOARD_CLASS="sc-kakashi-loss-ending-35820-board",RECEIPT_ID="sc-kakashi-loss-receipt-35820";
const ROOFTOP="Kakashi Origin Backdrop/rooftop_night.png",OFFICE="Kakashi Origin Backdrop/hokage_administration_interior_night.png";
const KAK="academy_kakashi",ANBU="konoha_anbu_contact",MI="academy_kakashi_origin_masked_interceptor",AMT="anbu_marked_target",PS="package_smuggler",MINATO="kage_minato";

const REPORT=Object.freeze([
 {kind:"narration",text:"Kakashi returns to the rooftop.",focusActorRef:KAK},
 {kind:"narration",text:"The ANBU operative is already there.",focusActorRef:ANBU},
 {kind:"narration",text:"He turns as Kakashi lands.",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Report.",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"The target made the handoff.",focusActorRef:KAK},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"To whom?",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"Another man.",focusActorRef:KAK},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"The package?",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"Gone with him.",focusActorRef:KAK},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"The masked shinobi?",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"I tried to stop her.",focusActorRef:KAK},
 {kind:"narration",text:"The operative's mask remains fixed on him.",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Result?",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"She beat me.",focusActorRef:KAK},
 {kind:"narration",text:"The answer sits between them.",focusActorRef:KAK},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Then what?",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"She went after the receiver.",focusActorRef:KAK},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Could you follow?",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"No.",focusActorRef:KAK},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"The original target?",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"Gone.",focusActorRef:KAK},
 {kind:"narration",text:"The operative gives a small nod.",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Understood.",focusActorRef:ANBU},
 {kind:"narration",text:"Kakashi waits.",focusActorRef:KAK},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"You may go.",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"KAKASHI",text:"Understood.",focusActorRef:KAK}
]);
const OFFICE_CUES=Object.freeze([
 {kind:"narration",text:"The recovered package rests on Minato’s desk.",focusActorRef:MINATO},
 {kind:"narration",text:"ANBU Marked Target stands near the window.",focusActorRef:AMT},
 {kind:"narration",text:"Package Smuggler is beside him.",focusActorRef:PS},
 {kind:"narration",text:"Masked Interceptor stands across from them.",focusActorRef:MI},
 {kind:"narration",text:"The ANBU operative faces Minato.",focusActorRef:ANBU},
 {kind:"narration",text:"Minato looks down at Kakashi’s report.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MINATO",text:"He couldn’t follow?",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"No.",focusActorRef:ANBU},
 {kind:"narration",text:"Masked Interceptor folds her arms.",focusActorRef:MI},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"I made sure of that.",focusActorRef:MI},
 {kind:"narration",text:"Package Smuggler looks toward her.",focusActorRef:PS},
 {kind:"dialogue",speaker:"PACKAGE SMUGGLER",text:"He actually tried to stop you.",focusActorRef:PS},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"Yes.",focusActorRef:MI},
 {kind:"dialogue",speaker:"ANBU MARKED TARGET",text:"Did he know who she was?",focusActorRef:AMT},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"No.",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"ANBU MARKED TARGET",text:"Did he know who any of us were?",focusActorRef:AMT},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"No.",focusActorRef:ANBU},
 {kind:"narration",text:"Minato lifts his eyes from the report.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MINATO",text:"What did he tell you?",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"The target made the handoff.",focusActorRef:ANBU},
 {kind:"narration",text:"He looks toward Package Smuggler.",focusActorRef:PS},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"The receiver escaped with the package.",focusActorRef:ANBU},
 {kind:"narration",text:"Then toward Masked Interceptor.",focusActorRef:MI},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"She pursued him.",focusActorRef:ANBU},
 {kind:"narration",text:"Masked Interceptor says nothing.",focusActorRef:MI},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Kakashi intervened.",focusActorRef:ANBU},
 {kind:"dialogue",speaker:"MINATO",text:"And the fight?",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"He reported that she beat him.",focusActorRef:ANBU},
 {kind:"narration",text:"Package Smuggler glances at Masked Interceptor.",focusActorRef:PS},
 {kind:"dialogue",speaker:"PACKAGE SMUGGLER",text:"Just like that?",focusActorRef:PS},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Just like that.",focusActorRef:ANBU},
 {kind:"narration",text:"Minato looks down at the report again.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MINATO",text:"No excuse?",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"None.",focusActorRef:ANBU},
 {kind:"narration",text:"Masked Interceptor studies Minato.",focusActorRef:MI},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"He knew he lost.",focusActorRef:MI},
 {kind:"dialogue",speaker:"MINATO",text:"Yes.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"And came back anyway.",focusActorRef:MI},
 {kind:"dialogue",speaker:"MINATO",text:"He was ordered to report.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"That isn’t what I meant.",focusActorRef:MI},
 {kind:"narration",text:"Minato looks at her.",focusActorRef:MINATO},
 {kind:"narration",text:"She nods toward the report.",focusActorRef:MI},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"He didn’t know this was ours.",focusActorRef:MI},
 {kind:"narration",text:"Her eyes move to the recovered package.",focusActorRef:MI},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"He didn’t know I was chasing the right man.",focusActorRef:MI},
 {kind:"dialogue",speaker:"ANBU MARKED TARGET",text:"He saw you attack him.",focusActorRef:AMT},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"And acted on what he saw.",focusActorRef:MI},
 {kind:"narration",text:"Package Smuggler leans back slightly.",focusActorRef:PS},
 {kind:"dialogue",speaker:"PACKAGE SMUGGLER",text:"And got put into the street for it.",focusActorRef:PS},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"Yes.",focusActorRef:MI},
 {kind:"narration",text:"Minato closes the report.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MINATO",text:"He made a decision with incomplete information.",focusActorRef:MINATO},
 {kind:"narration",text:"No one interrupts him.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MINATO",text:"Then he lost the fight.",focusActorRef:MINATO},
 {kind:"narration",text:"His eyes move briefly across the room.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MINATO",text:"Both are part of what happened.",focusActorRef:MINATO},
 {kind:"narration",text:"Masked Interceptor looks toward the recovered package.",focusActorRef:MI},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"He’ll remember the second part.",focusActorRef:MI},
 {kind:"narration",text:"Minato’s expression does not change.",focusActorRef:MINATO},
 {kind:"dialogue",speaker:"MINATO",text:"He should.",focusActorRef:MINATO},
 {kind:"narration",text:"She looks back at him.",focusActorRef:MI},
 {kind:"dialogue",speaker:"MASKED INTERCEPTOR",text:"So will I.",focusActorRef:MI}
]);

function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function occurrence(id){try{return id?A.findOccurrence(String(id)):null;}catch(_error){return null;}}
function stable(prefix,payload){return typeof CORE.stableRef==="function"?CORE.stableRef(prefix,payload):prefix+"::"+JSON.stringify(payload||{});}
function family(rt=active()){return !!rt&&rt.sceneId===SCENE_ID&&[REPORT_BEAT,OFFICE_BEAT,RECEIPT_BEAT,EXIT_BEAT].includes(rt.beatId);}
function sequence(rt=active()){if(!rt)return null;const s=rt.beatId===REPORT_BEAT?REPORT:rt.beatId===OFFICE_BEAT?OFFICE_CUES:null;if(!s)return null;const key=rt.beatId===REPORT_BEAT?CURSOR_REPORT:CURSOR_OFFICE,raw=Number(rt.localContext&&rt.localContext[key]),i=Number.isInteger(raw)?Math.max(0,Math.min(s.length-1,raw)):0;return{sequence:s,index:i,cue:s[i],atEnd:i>=s.length-1,key};}
function lossOccurrence(rt=active()){return occurrence(rt&&rt.localContext&&rt.localContext.kakashiScene05ALPackageOccurrenceId);}

function commitReport(){
  const rt=active(),loss=lossOccurrence(rt);if(!rt||!loss)return{success:false,reason:"scene05al_loss_occurrence_required"};
  const old=rt.localContext&&rt.localContext.kakashiScene06ALReportOccurrenceId;if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_scene06a_l_report",{instance:String(rt.instanceId||""),loss:String(loss.occurrenceId||rt.localContext.kakashiScene05ALPackageOccurrenceId||"")});
  const fact={factClass:"academy_kakashi_scene06a_l_anbu_report",sceneId:"SCENE_06A_L",authorityCommit:AUTH_REPORT,packageHandoffOccurred:true,packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,kakashiIntervenedAgainstMaskedInterceptor:true,maskedInterceptorDefeatedKakashi:true,maskedInterceptorLeftSightPursuingPackageSmuggler:true,kakashiCouldNotReacquire:true,maskedInterceptorPackageSmugglerAftermathKnownToKakashi:false,kakashiMissionPackageRecovered:false,participantCustodyCommitted:false,lethalActionCommitted:false,pakkunPresent:false,missionObjectiveResultFromKakashiKnowledge:"FAILED",truthfulReport:true,excusesGiven:false,objectiveRemovedAtSceneEnd:true};
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_anbu_report",outcome:"stop_assassin_loss_truthfully_reported",participantRefs:[ORIGIN_ID,ANBU],sourceRefs:[{type:"origin_occurrence",id:String(loss.occurrenceId||rt.localContext.kakashiScene05ALPackageOccurrenceId),role:"loss_closure"},{type:"writing_authority",id:AUTH_REPORT}]});
  if(!out||out.success!==true)return out||{success:false,reason:"loss_anbu_report_commit_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiScene06ALReportOccurrenceId:id,kakashiScene05ALObjective:null};save();
  const terminal=TERMINAL.commitTerminalDebrief();if(!terminal||terminal.success!==true)return terminal||{success:false,reason:"loss_terminal_debrief_commit_failed"};
  return{success:true,occurrenceId:id};
}
function commitHidden(){
  const rt=active(),report=occurrence(rt&&rt.localContext&&rt.localContext.kakashiScene06ALReportOccurrenceId);if(!rt||!report)return{success:false,reason:"loss_anbu_report_required"};
  const old=rt.localContext&&rt.localContext.kakashiScene07ALHiddenOccurrenceId;if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_scene07a_l_hidden_review",{report:String(report.occurrenceId||rt.localContext.kakashiScene06ALReportOccurrenceId)});
  const fact={factClass:"academy_kakashi_scene07a_l_hidden_review",sceneId:"SCENE_07A_L",authorityCommit:AUTH_OFFICE,stopAssassin:true,kakashiMissionResult:"FAILURE",kakashiPresent:false,kakashiKnowledgeGranted:false,kakashiLearnsHiddenOperationTruth:false,hiddenOperationPackageRecoveredAfterward:true,kakashiMissionPackageRecovered:false,maskedInterceptorState:"ALIVE",packageSmugglerState:"ALIVE",anbuMarkedTargetState:"ALIVE",maskedInterceptorPresent:true,packageSmugglerPresent:true,anbuMarkedTargetPresent:true,participantCustodyCommitted:false,lethalActionCommitted:false,pakkunPresent:false,minatoEvaluation:{incompleteInformationIntervention:true,factualBattleDefeat:true,moralScoreCollapsed:false}};
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_hidden_operation_review",outcome:"stop_assassin_loss_hidden_review",participantRefs:[MINATO,ANBU,MI,AMT,PS],sourceRefs:[{type:"origin_occurrence",id:String(report.occurrenceId||rt.localContext.kakashiScene06ALReportOccurrenceId),role:"anbu_report"},{type:"writing_authority",id:AUTH_OFFICE}]});
  if(!out||out.success!==true)return out||{success:false,reason:"loss_hidden_review_commit_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiScene07ALHiddenOccurrenceId:id};save();return{success:true,occurrenceId:id};
}
function sourceChoice(){
  const d=scene(),b=d&&d.beatMap instanceof Map?d.beatMap.get(SOURCE_BEAT):null;return b&&Array.isArray(b.choices)?b.choices.find(x=>x&&x.choiceId===SOURCE_CHOICE):null;
}
function wireSource(){
  const row=sourceChoice();if(!row)return false;
  const original=Array.isArray(row.consequenceRequests)?row.consequenceRequests.find(x=>x&&x.requestId!=="kakashi_loss_report_route_35820")||null:null;
  row.nextBeatId=REPORT_BEAT;
  row.consequenceRequests=[{requestId:"kakashi_loss_report_route_35820",kind:"domain",resolve:function(){const rt=active();if(!rt||rt.beatId!==SOURCE_BEAT)return{success:false,reason:"loss_return_choice_context_required"};let out={success:true};if(original&&typeof original.resolve==="function")out=original.resolve();if(!out||out.success!==true)return out||{success:false,reason:"loss_return_choice_fact_commit_failed"};rt.localContext={...(rt.localContext||{}),[CURSOR_REPORT]:0};save();return{success:true,nextBeatId:REPORT_BEAT,lossOccurrenceId:String(rt.localContext.kakashiScene05ALPackageOccurrenceId||"")};}}];
  return true;
}
function installBeats(){
 const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return false;
 m.set(REPORT_BEAT,{beatId:REPORT_BEAT,mode:"narration",environmentRef:{assetId:"kakashi_origin_rooftop_night"},objectiveText:REPORT_OBJECTIVE,text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
 m.set(OFFICE_BEAT,{beatId:OFFICE_BEAT,mode:"narration",environmentRef:{assetId:"kakashi_origin_hokage_administration_interior_night"},text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
 m.set(RECEIPT_BEAT,{beatId:RECEIPT_BEAT,mode:"narration",text:"",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]});
 m.set(EXIT_BEAT,{beatId:EXIT_BEAT,mode:"narration",text:"YOUR CHRONICLE BEGINS",exitScene:true,allowPresentationClose:true,choices:[]});
 return true;
}
function installStyle(){
 if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return false;const s=document.createElement("style");s.id=STYLE_ID;s.textContent=
 "."+BOARD_CLASS+"{position:absolute;inset:0;z-index:6;pointer-events:none;overflow:hidden}"+
 "."+BOARD_CLASS+" .sc-scene-board-33900__actors{left:2.5%!important;right:2.5%!important;top:8%!important;bottom:20%!important;display:flex!important;justify-content:space-between!important;align-items:flex-end!important;padding:0 7%!important}"+
 "."+BOARD_CLASS+" .sc-scene-board-33900__actor{width:min(22vw,310px)!important;max-height:485px!important;aspect-ratio:7/10!important}"+
 "#story-scene-presentation-layer[data-sc-kakashi-loss-stage='report'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-previous{display:none!important}"+
 "#story-scene-presentation-layer[data-sc-kakashi-loss-stage='report'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current{left:50%!important;right:auto!important;top:22%!important;bottom:auto!important;transform:translateX(-50%)!important;width:min(31%,430px)!important}"+
 "."+BOARD_CLASS+"[data-loss-stage='office'] .sc-scene-board-33900__actors{left:0!important;right:0!important;top:0!important;bottom:0!important;display:block!important;padding:0!important}"+
 "."+BOARD_CLASS+"[data-loss-stage='office'] .sc-scene-board-33900__actor{position:absolute!important;width:min(11.5vw,158px)!important;max-height:286px!important;bottom:23.5%!important}"+
 "."+BOARD_CLASS+"[data-loss-stage='office'] [data-actor-id='"+MINATO+"']{left:41%!important;top:1%!important;bottom:auto!important;width:min(18vw,252px)!important;max-height:430px!important;z-index:6}"+
 "."+BOARD_CLASS+"[data-loss-stage='office'] [data-actor-id='"+AMT+"']{left:28%!important}"+
 "."+BOARD_CLASS+"[data-loss-stage='office'] [data-actor-id='"+MI+"']{left:41%!important;z-index:5}"+
 "."+BOARD_CLASS+"[data-loss-stage='office'] [data-actor-id='"+ANBU+"']{left:54%!important}"+
 "."+BOARD_CLASS+"[data-loss-stage='office'] [data-actor-id='"+PS+"']{left:67%!important}"+
 "#story-scene-presentation-layer[data-sc-kakashi-loss-stage='office'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-previous{display:none!important}"+
 "#story-scene-presentation-layer[data-sc-kakashi-loss-stage='office'] .sc-performance-surface-33910 .sc-dialogue-panel-33910.is-current{left:auto!important;right:7.5%!important;top:14.5%!important;bottom:auto!important;transform:none!important;width:min(25.5%,390px)!important}"+
 "#"+RECEIPT_ID+"{position:fixed;inset:0;z-index:120000;display:grid;place-items:center;padding:32px;background:rgba(2,6,10,.98);color:#eee6d2}#"+RECEIPT_ID+" .card{width:min(980px,94vw);max-height:90vh;overflow:auto;padding:32px;border:1px solid rgba(214,169,58,.55);background:#091016}#"+RECEIPT_ID+" .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:25px 0}#"+RECEIPT_ID+" button{min-height:46px;padding:0 22px}";
 document.head.appendChild(s);return true;
}
function img(id){return id===KAK?"Assets/Academy Student/academy_kakashi.png":id===ANBU?"NPC/konoha_anbu.png":id===MI?"NPC/masked_interceptor.png":id===AMT?"NPC/anbu_marked_target.png":id===PS?"NPC/package_smuggler.png":"Assets/Kage/kage_minato.png";}
function label(id){return id===KAK?"KAKASHI":id===ANBU?"ANBU OPERATIVE":id===MI?"MASKED INTERCEPTOR":id===AMT?"ANBU MARKED TARGET":id===PS?"PACKAGE SMUGGLER":"MINATO";}
function card(id,state,focus){return'<figure class="sc-scene-board-33900__actor '+(focus?"is-focus":"")+'" data-actor-id="'+esc(id)+'"><div class="sc-scene-board-33900__actor-frame"></div><img src="'+esc(img(id))+'" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>'+esc(label(id))+'</strong><small>'+esc(state)+'</small></figcaption></figure>';}
function backdrop(stage,path){stage.style.backgroundImage='linear-gradient(180deg,rgba(2,5,8,.03),rgba(2,5,8,.08) 55%,rgba(2,5,8,.62)),url("'+String(path).replace(/"/g,"%22")+'")';stage.style.backgroundSize="cover";stage.style.backgroundPosition="center";}
function render(){
 wireSource();if(typeof document==="undefined")return false;const rt=active(),p=sequence(rt),layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer;
 for(const old of stage.querySelectorAll?stage.querySelectorAll("."+BOARD_CLASS):[])if(!family(rt))old.remove();
 if(!family(rt))return false;if(!p)return false;installStyle();const office=rt.beatId===OFFICE_BEAT;layer.dataset.scKakashiLossStage=office?"office":"report";backdrop(stage,office?OFFICE:ROOFTOP);
 let b=stage.querySelector("."+BOARD_CLASS);if(!b){b=document.createElement("section");b.className=BOARD_CLASS;stage.appendChild(b);}b.dataset.lossStage=office?"office":"report";
 const focus=p.cue&&p.cue.focusActorRef||"";let actors;
 if(office)actors=[card(MINATO,"PACKAGE RECOVERED · HIDDEN OPERATION",focus===MINATO),card(AMT,"ALIVE",focus===AMT),card(MI,"ALIVE",focus===MI),card(ANBU,"PRESENT",focus===ANBU),card(PS,"ALIVE",focus===PS)];
 else actors=[card(KAK,"REPORTING",focus===KAK),card(ANBU,"RECEIVING REPORT",focus===ANBU)];
 b.innerHTML='<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">'+(office?"HOKAGE ADMINISTRATION · NIGHT":"KONOHA ROOFTOP · NIGHT")+'</div>'+(office?"":'<div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+REPORT_OBJECTIVE+'</div>')+'</div><div class="sc-scene-board-33900__actors" data-count="'+actors.length+'">'+actors.join("")+'</div>';
 const text=layer.querySelector(".sc-story-text");if(text)text.textContent=p.cue.text;const name=layer.querySelector(".sc-story-name");if(name){name.textContent=p.cue.kind==="dialogue"?p.cue.speaker:"NARRATION";name.style.display="block";}const kicker=layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent=office?"HOKAGE'S OFFICE · HIDDEN OPERATION":"ANBU REPORT · ACADEMY KAKASHI";return true;
}
function wipe(next){if(typeof document==="undefined")return next();const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return next();const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer,n=document.createElement("div");n.style.cssText="position:absolute;inset:0;z-index:99;background:#000;opacity:0;transition:opacity 260ms ease;pointer-events:none";stage.appendChild(n);requestAnimationFrame?requestAnimationFrame(()=>n.style.opacity="1"):n.style.opacity="1";setTimeout(()=>{next();n.style.opacity="0";setTimeout(()=>{try{n.remove();}catch(_error){}},280);},280);return{success:true,pending:true};}
function enterOffice(){const rt=active(),r=commitReport();if(!r||r.success!==true)return r;rt.beatId=OFFICE_BEAT;rt.localContext={...(rt.localContext||{}),[CURSOR_OFFICE]:0};save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:OFFICE_BEAT};}
function receiptRows(){return{decisions:["Chose STOP THE ASSASSIN after the package handoff.","Returned to ANBU and reported the loss without making excuses."],outcomes:["Masked Interceptor defeated Kakashi in PL Battle.","Package Smuggler escaped Kakashi with the package.","ANBU Marked Target escaped Kakashi.","Kakashi did not recover the package."],history:["Kakashi’s mission result is recorded as a failure.","Kakashi performed no lethal action and established no participant custody.","No Pakkun involvement occurred.","Kakashi did not learn the hidden operation or its later package recovery."]};}
function openReceipt(){
 const rt=active(),h=commitHidden();if(!rt||!h||h.success!==true)return h||{success:false,reason:"loss_hidden_review_required"};const receipt=TERMINAL.commitChronicleReceiptAndRewards();if(!receipt||receipt.success!==true)return receipt||{success:false,reason:"loss_chronicle_receipt_commit_failed"};rt.beatId=RECEIPT_BEAT;save();
 if(typeof document==="undefined")return{success:true,headless:true};installStyle();const old=document.getElementById(RECEIPT_ID);if(old)old.remove();const rows=receiptRows(),li=a=>a.map(x=>"<li>"+esc(x)+"</li>").join(""),n=document.createElement("div");n.id=RECEIPT_ID;n.innerHTML='<div class="card"><div class="eye">YOUR ORIGIN</div><h1>ACADEMY KAKASHI</h1><div class="sub">RECORDED IN YOUR CHRONICLE</div><div class="grid"><section><h2>YOUR DECISIONS</h2><ul>'+li(rows.decisions)+'</ul></section><section><h2>WHAT HAPPENED</h2><ul>'+li(rows.outcomes)+'</ul></section><section><h2>HISTORY CREATED</h2><ul>'+li(rows.history)+'</ul></section></div><button type="button">ENTER KONOHA</button><div class="err" hidden></div></div>';document.body.appendChild(n);const b=n.querySelector("button"),e=n.querySelector(".err");b.addEventListener("click",()=>{b.disabled=true;const out=complete();if(!out||out.success!==true){b.disabled=false;e.hidden=false;e.textContent=String(out&&out.reason||"Origin completion is not ready.");}});return{success:true};
}
function complete(){const rt=active();if(!rt||rt.beatId!==RECEIPT_BEAT)return{success:false,reason:"loss_receipt_not_active"};const done=TERMINAL.guardedOriginCompletion();if(!done||done.success!==true)return done||{success:false,reason:"origin_completion_failed"};if(typeof document!=="undefined"){const n=document.getElementById(RECEIPT_ID);if(n)n.remove();}rt.beatId=EXIT_BEAT;save();let adv={success:true};try{adv=globalThis.advanceStoryScene();}catch(_error){}const open=()=>{try{if(typeof openOverlay==="function")return openOverlay("village");if(typeof globalThis.openOverlay==="function")return globalThis.openOverlay("village");}catch(_error){}return null;};if(typeof setTimeout==="function")setTimeout(open,40);else open();return{success:adv&&adv.success!==false,destination:"konoha_village",completion:done};}

if(!installBeats())throw new Error("kakashi_loss_ending_35820_beats_missing");
let hooked=false,tries=0;
function hooks(){
 if(hooked)return true;if(typeof globalThis.advanceStoryScene!=="function"||typeof globalThis.getStoryScenePerformance33900!=="function")return false;const PA=globalThis.advanceStoryScene,PG=globalThis.getStoryScenePerformance33900,PR=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
 globalThis.getStoryScenePerformance33900=function(){const p=sequence(active());return p||PG.apply(this,arguments);};
 globalThis.advanceStoryScene=function(choiceId=null){const rt=active();
  if(rt&&rt.sceneId===SCENE_ID&&rt.beatId===SOURCE_BEAT&&choiceId===SOURCE_CHOICE){wireSource();return PA.apply(this,arguments);}
  if(rt&&[REPORT_BEAT,OFFICE_BEAT].includes(rt.beatId)&&choiceId==null){const p=sequence(rt);if(!p)return{success:false,reason:"loss_sequence_missing"};if(!p.atEnd){rt.localContext={...(rt.localContext||{}),[p.key]:p.index+1};save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:rt.beatId,cueIndex:p.index+1};}if(rt.beatId===REPORT_BEAT){const r=commitReport();if(!r||r.success!==true)return r;rt.localContext.kakashiScene05ALObjective=null;save();return wipe(enterOffice);}const h=commitHidden();if(!h||h.success!==true)return h;return wipe(openReceipt);}
  return PA.apply(this,arguments);
 };
 try{advanceStoryScene=globalThis.advanceStoryScene;getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;}catch(_error){}
 if(PR){globalThis.renderStoryScenePresentationLayer=function(){wireSource();const out=PR.apply(this,arguments);if(typeof queueMicrotask==="function")queueMicrotask(function(){wireSource();render();});else setTimeout(function(){wireSource();render();},0);return out;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}}
 hooked=true;wireSource();render();return true;
}
function ensure(){if(hooks())return;if(typeof setTimeout==="function"&&tries++<120)setTimeout(ensure,25);}ensure();

function diagnostics(){
 const reportExpected=["Kakashi returns to the rooftop.","The ANBU operative is already there.","He turns as Kakashi lands.","Report.","The target made the handoff.","To whom?","Another man.","The package?","Gone with him.","The masked shinobi?","I tried to stop her.","The operative's mask remains fixed on him.","Result?","She beat me.","The answer sits between them.","Then what?","She went after the receiver.","Could you follow?","No.","The original target?","Gone.","The operative gives a small nod.","Understood.","Kakashi waits.","You may go.","Understood."];
 const officeExpectedFirst=["The recovered package rests on Minato’s desk.","ANBU Marked Target stands near the window.","Package Smuggler is beside him.","Masked Interceptor stands across from them.","The ANBU operative faces Minato.","Minato looks down at Kakashi’s report.","He couldn’t follow?"];
 const checks={patchId:PATCH_ID==="alpha_kakashi_loss_ending_35820_v1_2026_09_19",authorities:AUTH_REPORT==="8e1d18cdc2b1e2ca0c6d0d0b56dd3c3b5fd5d623"&&AUTH_OFFICE==="d0d29a18ae2104b0cd29c1ca29b1f5a88fef71ab",reportExact:REPORT.length===26&&JSON.stringify(REPORT.map(x=>x.text))===JSON.stringify(reportExpected),officeExactAnchor:JSON.stringify(OFFICE_CUES.slice(0,7).map(x=>x.text))===JSON.stringify(officeExpectedFirst)&&OFFICE_CUES[OFFICE_CUES.length-1].text==="So will I.",sourceChoiceRewired:wireSource.toString().includes("nextBeatId=REPORT_BEAT"),truthfulFailureReport:commitReport.toString().includes('missionObjectiveResultFromKakashiKnowledge:"FAILED"')&&commitReport.toString().includes("truthfulReport:true"),hiddenKnowledgeBoundary:commitHidden.toString().includes("kakashiPresent:false")&&commitHidden.toString().includes("kakashiKnowledgeGranted:false"),allThreeAliveHidden:commitHidden.toString().includes('maskedInterceptorState:"ALIVE"')&&commitHidden.toString().includes('packageSmugglerState:"ALIVE"')&&commitHidden.toString().includes('anbuMarkedTargetState:"ALIVE"'),noLethalCustodyPakkun:commitHidden.toString().includes("participantCustodyCommitted:false")&&commitHidden.toString().includes("lethalActionCommitted:false")&&commitHidden.toString().includes("pakkunPresent:false"),missionFailureSeparateFromHiddenRecovery:commitHidden.toString().includes('kakashiMissionResult:"FAILURE"')&&commitHidden.toString().includes("hiddenOperationPackageRecoveredAfterward:true"),blackWipe:globalThis.advanceStoryScene.toString().includes("wipe(enterOffice)")&&globalThis.advanceStoryScene.toString().includes("wipe(openReceipt)"),safeDialogueZones:installStyle.toString().includes("top:22%!important")&&installStyle.toString().includes("right:7.5%!important"),receiptAndClosure:openReceipt.toString().includes("commitChronicleReceiptAndRewards")&&complete.toString().includes("guardedOriginCompletion"),browserGoldenClaimed:false};
 const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.runAcademyKakashiLossEnding35820Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_LOSS_ENDING_35820=Object.freeze({patchId:PATCH_ID,authorities:Object.freeze({report:AUTH_REPORT,office:AUTH_OFFICE}),reportBeatId:REPORT_BEAT,officeBeatId:OFFICE_BEAT,receiptBeatId:RECEIPT_BEAT,exitBeatId:EXIT_BEAT,wireSource,commitReport,commitHidden,openReceipt,complete,diagnostics,browserGoldenClaimed:false});
})();
