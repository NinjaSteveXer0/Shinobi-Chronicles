// ============================================================================
// ISSUE #188 — ACADEMY KAKASHI W2C CONFIRMED-KILL ENDING — 35770
//
// Exact Writing authorities:
// Scene 06 confirmed kill: 820917031000c15e62f0a4cea7535397d3ad9e50
// Scene 07 rooftop ANBU report: 2bcb6bb07dc862cb6f259b784782850619a08a4f
// Scene 08 Hokage office: 275667ff8b65d5d7e9252164f7552676339a9086
//
// This consumes only LETHAL_ATTEMPT_KILLED. Non-kill resolver outcomes remain
// fail-closed pending separate Writing authority (#226).
// ============================================================================
(function installAcademyKakashiW2CEnding35770(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_W2C_ENDING_35770)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const TERMINAL=globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100;
if(!A||!CORE||!TERMINAL)throw new Error("kakashi_w2c_ending_35770_dependencies_missing");

const PATCH_ID="alpha_kakashi_w2c_ending_35770_v7_2026_09_18";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const SOURCE_HOLD="kak_scene06a_w2c_scene7_pending";
const AFTERMATH="kak_scene06a_w2c_confirmed_kill_aftermath";
const SCENE07="kak_scene07a_w2c_k_anbu_report";
const SCENE08="kak_scene08a_w2c_k_hokage_office";
const RECEIPT="kak_w2c_chronicle_receipt_hold_35770";
const EXIT="kak_w2c_origin_exit_35770";
const REPORT_OBJECTIVE="Report to ANBU.";
const CURSOR_A="__kakashiW2CAftermath35770";
const CURSOR_7="__kakashiW2CScene0735770";
const CURSOR_8="__kakashiW2CScene0835770";
const STYLE_ID="sc-kakashi-w2c-ending-35770-style";
const BOARD_CLASS="sc-kakashi-w2c-ending-35770-board";
const RECEIPT_ID="sc-kakashi-origin-receipt-35770";
const QA_OUTCOME_ID="sc-kakashi-w2c-outcome-qa-35770";
const AUTHORITY=Object.freeze({
  scene06:"820917031000c15e62f0a4cea7535397d3ad9e50",
  scene07:"2bcb6bb07dc862cb6f259b784782850619a08a4f",
  scene08:"275667ff8b65d5d7e9252164f7552676339a9086"
});
const MI="academy_kakashi_origin_masked_interceptor";
const ANBU="konoha_anbu_contact";
const AMT="anbu_marked_target";
const PS="package_smuggler";
const MINATO="kage_minato";
const SAKURA_BG="Kakashi Origin Backdrop/fight_at_sakura_tree.png";
const ROOFTOP_BG="Kakashi Origin Backdrop/rooftop_night.png";
const OFFICE_BG="Kakashi Origin Backdrop/hokage_administration_interior_night.png";

const AFTERMATH_CUES=Object.freeze([
  {kind:"narration",text:"Petals drift across the stone.",focus:"academy_kakashi"},
  {kind:"narration",text:"Masked Interceptor remains where she fell.",focus:MI},
  {kind:"narration",text:"Her weapon rests a short distance from her hand.",focus:MI},
  {kind:"narration",text:"Kakashi straightens.",focus:"academy_kakashi"},
  {kind:"narration",text:"The kunai stays in his grip for another moment.",focus:"academy_kakashi"},
  {kind:"narration",text:"Then he lowers it.",focus:"academy_kakashi"},
  {kind:"narration",text:"His eye passes over the road beyond the Sakura tree.",focus:"academy_kakashi"},
  {kind:"narration",text:"Whatever chance existed to recover the package is gone now.",focus:"academy_kakashi"},
  {kind:"narration",text:"Kakashi puts the kunai away.",focus:"academy_kakashi"},
  {kind:"narration",text:"There is only one place left to go.",focus:"academy_kakashi"},
  {kind:"narration",text:"Kakashi leaves the Sakura tree behind.",focus:"academy_kakashi",objective:REPORT_OBJECTIVE}
]);
const SCENE07_CUES=Object.freeze([
  {kind:"narration",text:"Kakashi returns to the rooftop.",focus:"academy_kakashi"},
  {kind:"narration",text:"The ANBU operative is already waiting.",focus:ANBU},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Report.",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"The target made the handoff.",focus:"academy_kakashi"},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"To whom?",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"Another man. He left with the package.",focus:"academy_kakashi"},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"You let him go?",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"A masked shinobi went after him.",focus:"academy_kakashi"},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"And you intervened.",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"Yes.",focus:"academy_kakashi"},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"The original target?",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"Gone.",focus:"academy_kakashi"},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"The package?",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"Gone with the receiver.",focus:"academy_kakashi"},
  {kind:"narration",text:"A short silence.",focus:ANBU},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"The masked shinobi?",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"I killed her.",focus:"academy_kakashi"},
  {kind:"narration",text:"Another silence.",focus:ANBU},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Those weren’t your orders.",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"That was my choice.",focus:"academy_kakashi"},
  {kind:"narration",text:"No other explanation was offered to the ANBU operative.",focus:"academy_kakashi"},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Very well, you may go.",focus:ANBU},
  {kind:"dialogue",speaker:"KAKASHI",text:"Understood.",focus:"academy_kakashi"}
]);
const SCENE08_CUES=Object.freeze([
  {kind:"dialogue",speaker:"MINATO",text:"Did he explain why?",focus:MINATO},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"I asked.",focus:ANBU},
  {kind:"narration",text:"Minato waits.",focus:MINATO},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"He said, ‘That was my choice.’",focus:ANBU},
  {kind:"narration",text:"Package Smuggler stares at him.",focus:PS},
  {kind:"dialogue",speaker:"PACKAGE SMUGGLER",text:"That’s it?",focus:PS},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"That’s it.",focus:ANBU},
  {kind:"narration",text:"Package Smuggler looks away.",focus:PS},
  {kind:"narration",text:"His eyes settle on the empty place beside ANBU Marked Target.",focus:PS},
  {kind:"dialogue",speaker:"PACKAGE SMUGGLER",text:"She should be standing here.",focus:PS},
  {kind:"narration",text:"No one answers.",focus:MINATO},
  {kind:"narration",text:"ANBU Marked Target watches him for a moment before looking toward Minato.",focus:AMT},
  {kind:"dialogue",speaker:"ANBU MARKED TARGET",text:"Does Kakashi know?",focus:AMT},
  {kind:"dialogue",speaker:"MINATO",text:"About the operation?",focus:MINATO},
  {kind:"dialogue",speaker:"ANBU MARKED TARGET",text:"Any of it.",focus:AMT},
  {kind:"dialogue",speaker:"MINATO",text:"No.",focus:MINATO},
  {kind:"narration",text:"Package Smuggler gives a humourless shake of his head.",focus:PS},
  {kind:"dialogue",speaker:"PACKAGE SMUGGLER",text:"So he went home thinking he lost everything.",focus:PS},
  {kind:"dialogue",speaker:"ANBU OPERATIVE",text:"Yes.",focus:ANBU},
  {kind:"narration",text:"Package Smuggler looks toward Minato.",focus:PS},
  {kind:"dialogue",speaker:"PACKAGE SMUGGLER",text:"And killed one of us on the way.",focus:PS},
  {kind:"narration",text:"Minato holds his gaze.",focus:MINATO},
  {kind:"dialogue",speaker:"MINATO",text:"Yes.",focus:MINATO},
  {kind:"narration",text:"Silence.",focus:MINATO},
  {kind:"narration",text:"ANBU Marked Target turns toward the recovered package on the desk.",focus:AMT},
  {kind:"dialogue",speaker:"ANBU MARKED TARGET",text:"What happens now?",focus:AMT},
  {kind:"narration",text:"Minato looks down at Kakashi’s report.",focus:MINATO},
  {kind:"dialogue",speaker:"MINATO",text:"With Kakashi?",focus:MINATO},
  {kind:"dialogue",speaker:"ANBU MARKED TARGET",text:"With all of this.",focus:AMT},
  {kind:"narration",text:"Minato is quiet for a moment.",focus:MINATO},
  {kind:"dialogue",speaker:"MINATO",text:"We remember what happened.",focus:MINATO},
  {kind:"narration",text:"Package Smuggler’s expression hardens.",focus:PS},
  {kind:"dialogue",speaker:"PACKAGE SMUGGLER",text:"I won’t have trouble with that.",focus:PS}
]);

function clone(v){try{return CORE.clone(v);}catch(_error){return v==null?v:JSON.parse(JSON.stringify(v));}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function factOf(row){return row&&(row.fact||row.data)||{};}
function occurrence(id){return id?A.findOccurrence(String(id)):null;}
function stable(prefix,extra={}){const rt=active();const raw=JSON.stringify({prefix,instanceId:String(rt&&rt.instanceId||""),...extra});let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619);}return prefix+"::"+(h>>>0).toString(16);}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function resolverOccurrence(){const rt=active();return occurrence(rt&&rt.localContext&&rt.localContext.kakashiScene06AW2CResolutionOccurrenceId);}
function confirmedKill(){const f=factOf(resolverOccurrence());return String(f.selectedOutcomeRef||"")==="LETHAL_ATTEMPT_KILLED"&&f.targetDeathConfirmed===true;}
function cursor(key,length){const rt=active(),n=Number(rt&&rt.localContext&&rt.localContext[key]||0);return Number.isInteger(n)?Math.max(0,Math.min(length-1,n)):0;}
function sequence(rt=active()){
  if(!rt)return null;
  if(rt.beatId===AFTERMATH){const i=cursor(CURSOR_A,AFTERMATH_CUES.length);return{rows:AFTERMATH_CUES,index:i,cue:AFTERMATH_CUES[i],atEnd:i===AFTERMATH_CUES.length-1};}
  if(rt.beatId===SCENE07){const i=cursor(CURSOR_7,SCENE07_CUES.length);return{rows:SCENE07_CUES,index:i,cue:SCENE07_CUES[i],atEnd:i===SCENE07_CUES.length-1};}
  if(rt.beatId===SCENE08){const i=cursor(CURSOR_8,SCENE08_CUES.length);return{rows:SCENE08_CUES,index:i,cue:SCENE08_CUES[i],atEnd:i===SCENE08_CUES.length-1};}
  return null;
}
function killLedger(){
  const rt=active(),source=resolverOccurrence();if(!rt||!source||!confirmedKill())return{success:false,reason:"confirmed_kill_resolver_fact_required"};
  const old=rt.localContext&&rt.localContext.kakashiScene06W2CKillLedgerOccurrenceId;if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_scene06_w2c_confirmed_kill",{resolver:source.occurrenceId});
  const fact={factClass:"academy_kakashi_scene06_w2c_confirmed_kill",sceneId:"SCENE_06A_W2C",authorityCommit:AUTHORITY.scene06,maskedInterceptorState:"DEAD",lethalIntentCommitted:true,lethalAttemptResult:"SUCCESS / CONFIRMED KILL",packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",recovered:false,available:false},packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,pursuitClosed:true,pakkunPresent:false,lethalTrajectoryHistory:{targetRef:MI,outcome:"CONFIRMED_KILL"},sourceResolverOccurrenceId:source.occurrenceId};
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_confirmed_kill_ledger",outcome:"confirmed_kill",participantRefs:[ORIGIN_ID,MI],sourceRefs:[{type:"origin_occurrence",id:source.occurrenceId,role:"factual_resolver"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"confirmed_kill_ledger_commit_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiScene06W2CKillLedgerOccurrenceId:id};save();return{success:true,occurrenceId:id};
}
function commitReport(){
  const rt=active(),kill=killLedger();if(!rt||!kill||kill.success!==true)return kill||{success:false,reason:"kill_ledger_required"};
  const old=rt.localContext&&rt.localContext.kakashiScene07W2CKReportOccurrenceId;if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_scene07_w2c_k_report",{kill:kill.occurrenceId});
  const fact={factClass:"academy_kakashi_scene07_w2c_k_anbu_report",sceneId:"SCENE_07A_W2C_K",authorityCommit:AUTHORITY.scene07,packageHandoffOccurred:true,packageSmugglerEscapedWithPackage:true,anbuMarkedTargetEscaped:true,kakashiIntervenedAgainstMaskedInterceptor:true,kakashiDefeatedMaskedInterceptor:true,kakashiSubsequentlyKilledMaskedInterceptor:true,confirmedKillTruthfullyReported:true,lethalDecisionExplanation:"That was my choice.",additionalExplanationGiven:false,pakkunPresent:false,objectiveRemovedAtSceneEnd:true};
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_anbu_report",outcome:"w2c_confirmed_kill_reported",participantRefs:[ORIGIN_ID,ANBU,MI],sourceRefs:[{type:"origin_occurrence",id:kill.occurrenceId,role:"confirmed_kill"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"anbu_report_commit_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiScene07W2CKReportOccurrenceId:id};save();
  const terminal=TERMINAL.commitTerminalDebrief();if(!terminal||terminal.success!==true)return terminal||{success:false,reason:"terminal_debrief_commit_failed"};
  return{success:true,occurrenceId:id};
}
function commitHiddenReview(){
  const rt=active(),report=rt&&occurrence(rt.localContext&&rt.localContext.kakashiScene07W2CKReportOccurrenceId);if(!rt||!report)return{success:false,reason:"anbu_report_required"};
  const old=rt.localContext&&rt.localContext.kakashiScene08W2CKOccurrenceId;if(old&&occurrence(old))return{success:true,idempotent:true,occurrenceId:old};
  const id=stable("occ_origin_kakashi_scene08_w2c_k",{report:report.occurrenceId});
  const fact={factClass:"academy_kakashi_scene08_w2c_k_hidden_review",sceneId:"SCENE_08A_W2C_K",authorityCommit:AUTHORITY.scene08,stopAssassin:true,maskedInterceptorState:"DEAD",maskedInterceptorPresent:false,anbuMarkedTargetSurvived:true,packageSmugglerSurvived:true,hiddenOperationPackageRecoveredAfterward:true,kakashiMissionPackageRecovered:false,kakashiPostBattlePursuitAvailable:false,kakashiPresent:false,kakashiKnowledgeGranted:false,kakashiLearnsHiddenOperationTruth:false};
  const out=A.commitOccurrence(ORIGIN_ID,id,fact,[],{type:"origin_story_hidden_operation_review",outcome:"hidden_review_committed",participantRefs:[MINATO,ANBU,AMT,PS],sourceRefs:[{type:"origin_occurrence",id:report.occurrenceId,role:"anbu_report"}]});
  if(!out||out.success!==true)return out||{success:false,reason:"hidden_review_commit_failed"};
  rt.localContext={...(rt.localContext||{}),kakashiScene08W2CKOccurrenceId:id};save();return{success:true,occurrenceId:id};
}
function installBeats(){
  const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null;if(!m)return false;
  m.set(AFTERMATH,{beatId:AFTERMATH,mode:"narration",text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(SCENE07,{beatId:SCENE07,mode:"narration",environmentRef:{assetId:"kakashi_origin_rooftop_night"},text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(SCENE08,{beatId:SCENE08,mode:"narration",environmentRef:{assetId:"kakashi_origin_hokage_administration_interior_night"},text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(RECEIPT,{beatId:RECEIPT,mode:"narration",text:"",exitScene:false,allowPresentationClose:false,choices:[]});
  m.set(EXIT,{beatId:EXIT,mode:"narration",text:"YOUR CHRONICLE BEGINS",exitScene:true,allowPresentationClose:true,choices:[]});
  return true;
}
function installStyle(){
  if(typeof document==="undefined"||!document.head||document.getElementById(STYLE_ID))return;
  const s=document.createElement("style");s.id=STYLE_ID;s.textContent=
  "."+BOARD_CLASS+"{position:absolute;inset:0;z-index:4;pointer-events:none}"+
  "."+BOARD_CLASS+" .sc-scene-board-33900__actors{left:2.5%!important;right:2.5%!important;top:8%!important;bottom:20%!important;display:flex!important;justify-content:space-between!important;align-items:flex-end!important;gap:2%!important;padding:0 4%!important}"+
  "."+BOARD_CLASS+" .sc-scene-board-33900__actor{width:min(22vw,310px)!important;max-height:490px!important;aspect-ratio:7/10!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-w2c-stage=\"office\"] .sc-chronicle-layout{position:absolute!important;left:3.4%!important;top:13%!important;width:min(37%,455px)!important;margin:0!important;align-self:start!important}"+
  "#story-scene-presentation-layer[data-sc-kakashi-w2c-stage=\"office\"] .sc-story-panel{max-height:34vh!important}"+
  "."+BOARD_CLASS+"[data-w2c-stage=\"office\"] .sc-scene-board-33900__actors{left:0!important;right:0!important;top:0!important;bottom:0!important;display:block!important;padding:0!important}"+
  "."+BOARD_CLASS+"[data-w2c-stage=\"office\"] .sc-scene-board-33900__actor{position:absolute!important;width:min(13.5vw,180px)!important;max-height:320px!important}"+
  "."+BOARD_CLASS+"[data-w2c-stage=\"office\"] .sc-scene-board-33900__actor[data-actor-id=\""+MINATO+"\"]{left:40.5%!important;top:3%!important;width:min(19vw,260px)!important;max-height:440px!important;z-index:5}"+
  "."+BOARD_CLASS+"[data-w2c-stage=\"office\"] .sc-scene-board-33900__actor[data-actor-id=\""+ANBU+"\"]{left:22%!important;bottom:16.8%!important;z-index:4}"+
  "."+BOARD_CLASS+"[data-w2c-stage=\"office\"] .sc-scene-board-33900__actor[data-actor-id=\""+AMT+"\"]{left:60%!important;bottom:16.8%!important;z-index:3}"+
  "."+BOARD_CLASS+"[data-w2c-stage=\"office\"] .sc-scene-board-33900__actor[data-actor-id=\""+PS+"\"]{left:74%!important;bottom:16.8%!important;z-index:3}"+
  ".sc-kakashi-w2c-package-status{position:absolute;left:50%;right:auto;bottom:13.2%;transform:translateX(-50%);padding:8px 12px;border:1px solid rgba(214,169,58,.55);background:rgba(4,8,12,.9);color:#e6c65e;font-size:10px;font-weight:900;letter-spacing:.12em;z-index:6;white-space:nowrap}"+
  "."+BOARD_CLASS+" .sc-kakashi-mi-death-drop-35770{animation:miCardDrop35770 620ms cubic-bezier(.42,.05,.86,.24) both!important;transform-origin:52% 82%!important}"+
  ".sc-kakashi-kill-35770{position:absolute;inset:0;z-index:90;pointer-events:none;overflow:hidden}.sc-kakashi-kill-35770 img{position:absolute;bottom:13%;height:min(58vh,510px);filter:drop-shadow(0 18px 24px #000)}"+
  ".sc-kakashi-kill-35770 .kak{left:12%;animation:kak35770 900ms cubic-bezier(.18,.75,.2,1) forwards}.sc-kakashi-kill-35770 .mi{right:12%;animation:mi35770 900ms ease-out forwards}.sc-kakashi-kill-35770 .slash{position:absolute;left:-12%;top:47%;width:130%;height:12%;background:#000;transform:rotate(-17deg) scaleX(0);transform-origin:left center;animation:slash35770 900ms forwards}.sc-kakashi-kill-35770 .flash{position:absolute;inset:0;background:#fff;opacity:0;animation:flash35770 900ms forwards}.sc-kakashi-kill-35770 .black{position:absolute;inset:0;background:#000;opacity:0;animation:black35770 900ms forwards}"+
  "@keyframes kak35770{0%{transform:translateX(0)}38%{transform:translateX(8vw)}52%,100%{transform:translateX(42vw)}}@keyframes mi35770{0%,48%{transform:translateX(0)}60%,100%{transform:translateX(-3vw) rotate(-4deg)}}@keyframes slash35770{0%,48%{transform:rotate(-17deg) scaleX(0)}58%,100%{transform:rotate(-17deg) scaleX(1)}}@keyframes flash35770{0%,48%,57%,100%{opacity:0}52%{opacity:.92}}@keyframes black35770{0%,62%{opacity:0}72%,90%{opacity:1}100%{opacity:0}}@keyframes miCardDrop35770{0%{opacity:.82;transform:translateY(0) rotate(0deg) scale(.96)}18%{opacity:.78;transform:translateY(10px) rotate(1deg) scale(.955)}100%{opacity:0;transform:translateY(115vh) rotate(7deg) scale(.92)}}"+
  "#"+RECEIPT_ID+"{position:fixed;inset:0;z-index:120000;display:grid;place-items:center;padding:32px;background:radial-gradient(circle at 50% 12%,rgba(35,56,70,.42),rgba(2,6,10,.98) 60%);color:#eee6d2}#"+RECEIPT_ID+" .card{width:min(980px,94vw);max-height:90vh;overflow:auto;padding:32px;border:1px solid rgba(214,169,58,.55);background:linear-gradient(155deg,rgba(9,16,22,.99),rgba(3,7,11,.99));box-shadow:0 30px 100px #000}#"+RECEIPT_ID+" .eye{color:#60d7e1;font-size:10px;font-weight:900;letter-spacing:.2em}#"+RECEIPT_ID+" h1{font:400 38px Georgia,serif;color:#efdba4;margin:8px 0 4px}#"+RECEIPT_ID+" .sub{color:#ae9654;font-size:11px;letter-spacing:.16em}#"+RECEIPT_ID+" .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:25px 0}#"+RECEIPT_ID+" section{padding:15px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.025)}#"+RECEIPT_ID+" h2{margin:0 0 10px;color:#e0bf63;font-size:11px;letter-spacing:.12em}#"+RECEIPT_ID+" li{margin-bottom:8px;color:#cfd4d2;line-height:1.45;font-size:13px}#"+RECEIPT_ID+" button{min-height:46px;padding:0 22px;border:1px solid rgba(214,169,58,.65);background:#48370f;color:#f5d877;font-weight:900;letter-spacing:.1em;cursor:pointer}@media(max-width:900px){#"+RECEIPT_ID+" .grid{grid-template-columns:1fr}}";
  document.head.appendChild(s);
}
function card(id,label,img,state,focus){return '<figure class="sc-scene-board-33900__actor '+(focus?"is-focus":"")+'" data-actor-id="'+esc(id)+'"><div class="sc-scene-board-33900__actor-frame"></div><img src="'+esc(img)+'" alt=""><figcaption class="sc-scene-board-33900__actor-tag"><strong>'+esc(label)+'</strong><small>'+esc(state)+'</small></figcaption></figure>';}
function board(rt,p){
  const f=p&&p.cue&&p.cue.focus||null;
  if(rt.beatId===AFTERMATH){
    const removed=!!(rt.localContext&&rt.localContext.kakashiScene06W2CMiCardRemoved);
    const actors=card("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","PRESENT",f==="academy_kakashi")+(removed?"":card(MI,"MASKED INTERCEPTOR","NPC/masked_interceptor.png","DEAD",f===MI));
    return '<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">SAKURA TREE · MAIN STREET</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+esc(p&&p.cue&&p.cue.objective||"Retrieve the package.")+'</div></div><div class="sc-scene-board-33900__actors" data-count="'+(removed?1:2)+'">'+actors+'</div>';
  }
  if(rt.beatId===SCENE07)return '<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">KONOHA ROOFTOP · NIGHT</div><div class="sc-scene-board-33900__objective"><b>OBJECTIVE</b>'+REPORT_OBJECTIVE+'</div></div><div class="sc-scene-board-33900__actors" data-count="2">'+card("academy_kakashi","KAKASHI","Assets/Academy Student/academy_kakashi.png","REPORTING",f==="academy_kakashi")+card(ANBU,"ANBU OPERATIVE","NPC/konoha_anbu.png","RECEIVING REPORT",f===ANBU)+'</div>';
  return '<div class="sc-scene-board-33900__top"><div class="sc-scene-board-33900__location">HOKAGE ADMINISTRATION · NIGHT</div></div><div class="sc-scene-board-33900__actors" data-count="4">'+card(MINATO,"MINATO","Assets/Kage/kage_minato.png","HOKAGE",f===MINATO)+card(ANBU,"ANBU OPERATIVE","NPC/konoha_anbu.png","PRESENT",f===ANBU)+card(AMT,"ANBU MARKED TARGET","NPC/anbu_marked_target.png","ALIVE",f===AMT)+card(PS,"PACKAGE SMUGGLER","NPC/package_smuggler.png","ALIVE",f===PS)+'</div><div class="sc-kakashi-w2c-package-status">RECOVERED PACKAGE · HIDDEN OPERATION</div>';
}
function setBackdrop(stage,path){stage.style.backgroundImage='linear-gradient(180deg,rgba(2,5,8,.03),rgba(2,5,8,.08) 55%,rgba(2,5,8,.62)),url("'+path.replace(/"/g,'%22')+'")';stage.style.backgroundPosition="center";stage.style.backgroundSize="cover";stage.style.backgroundRepeat="no-repeat";}
function render(){
  if(typeof document==="undefined")return false;
  const rt=active();if(!rt||![AFTERMATH,SCENE07,SCENE08].includes(rt.beatId))return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer,p=sequence(rt);if(!p)return false;installStyle();
  const stageKey=rt.beatId===SCENE08?"office":rt.beatId===SCENE07?"report":"aftermath";
  layer.dataset.scKakashiW2cStage=stageKey;
  setBackdrop(stage,rt.beatId===AFTERMATH?SAKURA_BG:rt.beatId===SCENE07?ROOFTOP_BG:OFFICE_BG);
  let b=stage.querySelector("."+BOARD_CLASS);if(!b){b=document.createElement("section");b.className=BOARD_CLASS;b.setAttribute("aria-hidden","true");stage.appendChild(b);}b.dataset.w2cStage=stageKey;b.innerHTML=board(rt,p);
  const text=layer.querySelector(".sc-story-text");if(text)text.textContent=p.cue.text;const name=layer.querySelector(".sc-story-name");if(name){name.textContent=p.cue.kind==="dialogue"?p.cue.speaker||"":"NARRATION";name.style.display="block";}const kicker=layer.querySelector(".sc-story-kicker");if(kicker)kicker.textContent=rt.beatId===SCENE07?"ANBU REPORT · ACADEMY KAKASHI":rt.beatId===SCENE08?"HOKAGE'S OFFICE · HIDDEN OPERATION":"NARRATION · ACADEMY KAKASHI";return true;
}
let animationRunning=false;
function removeQaOutcome(){
  if(typeof document==="undefined")return;
  const old=document.getElementById(QA_OUTCOME_ID);if(old)old.remove();
}
function localQaHost(){
  try{return typeof location!=="undefined"&&(location.hostname==="127.0.0.1"||location.hostname==="localhost");}catch(_error){return false;}
}
function showQaOutcome(rt=active()){
  if(typeof document==="undefined"||!localQaHost()||!rt||rt.beatId!==SOURCE_HOLD)return false;
  const selected=String(rt.localContext&&rt.localContext.kakashiScene06AW2COutcomeRef||"");
  if(!selected||selected==="LETHAL_ATTEMPT_KILLED"){removeQaOutcome();return false;}
  let n=document.getElementById(QA_OUTCOME_ID);if(!n){n=document.createElement("div");n.id=QA_OUTCOME_ID;n.style.cssText="position:fixed;right:18px;bottom:18px;z-index:119999;padding:10px 12px;border:1px solid rgba(97,220,229,.68);background:rgba(2,8,12,.94);color:#d6edf0;font:700 11px/1.35 system-ui,sans-serif;letter-spacing:.05em;box-shadow:0 10px 30px rgba(0,0,0,.45);pointer-events:none";document.body.appendChild(n);}n.textContent="QA · "+selected.replace(/^LETHAL_ATTEMPT_/,"")+" · presentation owner unavailable";return true;
}
function removeDeadMiCardAfterKill(rt,stage){
  if(!rt||!confirmedKill()||typeof document==="undefined")return false;
  const boardNode=stage&&stage.querySelector?stage.querySelector("."+BOARD_CLASS):null;
  const mi=boardNode&&boardNode.querySelector?boardNode.querySelector('[data-actor-id="'+MI+'"]'):null;
  if(!mi){rt.localContext={...(rt.localContext||{}),kakashiScene06W2CMiCardRemoved:true};save();return false;}
  setTimeout(function(){
    if(!confirmedKill())return;
    mi.classList.add("sc-kakashi-mi-death-drop-35770");
    setTimeout(function(){
      rt.localContext={...(rt.localContext||{}),kakashiScene06W2CMiCardRemoved:true};save();
      try{mi.remove();}catch(_error){}
    },640);
  },180);
  return true;
}
function playLethalAttemptAnimation35770(onComplete){
  if(typeof document==="undefined"){if(typeof onComplete==="function")onComplete(null);return true;}
  if(animationRunning)return true;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer;installStyle();animationRunning=true;
  const old=stage.querySelector(".sc-kakashi-kill-35770");if(old)old.remove();
  const n=document.createElement("div");n.className="sc-kakashi-kill-35770";n.innerHTML='<img class="kak" src="Assets/Academy Student/academy_kakashi.png" alt=""><img class="mi" src="NPC/masked_interceptor.png" alt=""><div class="flash"></div><div class="slash"></div><div class="black"></div>';stage.appendChild(n);
  setTimeout(function(){try{n.remove();}catch(_error){}animationRunning=false;if(typeof onComplete==="function")onComplete(stage);},940);
  return true;
}
function beginConfirmedKill(){
  const rt=active();if(!rt||rt.beatId!==SOURCE_HOLD||!confirmedKill())return false;
  removeQaOutcome();
  const ledger=killLedger();if(!ledger||ledger.success!==true)return false;
  rt.localContext={...(rt.localContext||{}),[CURSOR_A]:0,kakashiScene06W2CMiCardRemoved:false};save();
  if(typeof document==="undefined"){rt.localContext.kakashiScene06W2CMiCardRemoved=true;rt.beatId=AFTERMATH;save();return true;}
  return playLethalAttemptAnimation35770(function(stage){
    rt.beatId=AFTERMATH;save();try{renderStoryScenePresentationLayer();}catch(_error){}
    removeDeadMiCardAfterKill(rt,stage);
  });
}
function wipe(next){
  if(typeof document==="undefined")return next();
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return next();const stage=(layer.querySelector&&layer.querySelector(".sc-chronicle-stage"))||layer,n=document.createElement("div");n.style.cssText="position:absolute;inset:0;z-index:99;background:#000;opacity:0;transition:opacity 260ms ease;pointer-events:none";stage.appendChild(n);if(typeof requestAnimationFrame==="function")requestAnimationFrame(()=>n.style.opacity="1");else n.style.opacity="1";setTimeout(()=>{next();n.style.opacity="0";setTimeout(()=>n.remove(),280);},280);return{success:true,pending:true};
}
function enter07(){const rt=active();if(!rt||!confirmedKill())return{success:false,reason:"confirmed_kill_required"};rt.beatId=SCENE07;rt.localContext={...(rt.localContext||{}),[CURSOR_7]:0};save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:SCENE07};}
function enter08(){const rt=active(),r=commitReport();if(!r||r.success!==true)return r;const h=commitHiddenReview();if(!h||h.success!==true)return h;rt.beatId=SCENE08;rt.localContext={...(rt.localContext||{}),[CURSOR_8]:0};save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:SCENE08};}
function receiptRows(){const rt=active(),kill=factOf(resolverOccurrence()),report=factOf(occurrence(rt&&rt.localContext&&rt.localContext.kakashiScene07W2CKReportOccurrenceId));return{decisions:["Stopped Masked Interceptor after the package handoff.","Chose to attempt to kill Masked Interceptor."],outcomes:["Package Smuggler escaped with the package.","ANBU Marked Target escaped.","Kakashi defeated Masked Interceptor in PL Battle.",kill.targetDeathConfirmed?"The lethal attempt resolved as a confirmed kill.":"The lethal attempt did not resolve as a confirmed kill.",report.confirmedKillTruthfullyReported?"Kakashi reported the confirmed kill to ANBU.":null].filter(Boolean),history:["Masked Interceptor is dead on this Chronicle.","Kakashi has prior Chronicle history with the ANBU operative, ANBU Marked Target, Package Smuggler and Masked Interceptor.","No Pakkun involvement was created on this route."]};}
function openReceipt(){
  const rt=active(),h=commitHiddenReview();if(!rt||!h||h.success!==true)return h||{success:false,reason:"hidden_review_required"};
  const receipt=TERMINAL.commitChronicleReceiptAndRewards();if(!receipt||receipt.success!==true)return receipt||{success:false,reason:"chronicle_receipt_commit_failed"};rt.beatId=RECEIPT;save();
  if(typeof document==="undefined")return{success:true,headless:true};
  installStyle();const old=document.getElementById(RECEIPT_ID);if(old)old.remove();const rows=receiptRows(),li=a=>a.map(x=>"<li>"+esc(x)+"</li>").join(""),n=document.createElement("div");n.id=RECEIPT_ID;n.innerHTML='<div class="card"><div class="eye">YOUR ORIGIN</div><h1>ACADEMY KAKASHI</h1><div class="sub">RECORDED IN YOUR CHRONICLE</div><div class="grid"><section><h2>YOUR DECISIONS</h2><ul>'+li(rows.decisions)+'</ul></section><section><h2>WHAT HAPPENED</h2><ul>'+li(rows.outcomes)+'</ul></section><section><h2>HISTORY CREATED</h2><ul>'+li(rows.history)+'</ul></section></div><button type="button">ENTER KONOHA</button><div class="err" hidden></div></div>';document.body.appendChild(n);const b=n.querySelector("button"),e=n.querySelector(".err");b.addEventListener("click",()=>{b.disabled=true;const out=completeToKonoha();if(!out||out.success!==true){b.disabled=false;e.hidden=false;e.textContent=String(out&&out.reason||"Origin completion is not ready.");}});return{success:true};
}
function completeToKonoha(){
  const rt=active();if(!rt||rt.beatId!==RECEIPT)return{success:false,reason:"chronicle_receipt_not_active"};
  const done=TERMINAL.guardedOriginCompletion();if(!done||done.success!==true)return done||{success:false,reason:"origin_completion_failed"};
  if(typeof document!=="undefined"){const n=document.getElementById(RECEIPT_ID);if(n)n.remove();}rt.beatId=EXIT;save();let adv={success:true};try{adv=globalThis.advanceStoryScene();}catch(_error){}
  const open=()=>{try{if(typeof openOverlay==="function")return openOverlay("village");if(typeof globalThis.openOverlay==="function")return globalThis.openOverlay("village");}catch(_error){}return null;};if(typeof setTimeout==="function")setTimeout(open,40);else open();return{success:adv&&adv.success!==false,destination:"konoha_village",completion:clone(done)};
}
if(!installBeats())throw new Error("kakashi_w2c_ending_35770_beats_missing");
let hooked=false,tries=0;
function hooks(){
  if(hooked)return true;if(typeof globalThis.advanceStoryScene!=="function"||typeof globalThis.getStoryScenePerformance33900!=="function")return false;
  const PA=globalThis.advanceStoryScene,PG=globalThis.getStoryScenePerformance33900,PR=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
  globalThis.getStoryScenePerformance33900=function(){const rt=active(),p=sequence(rt);return p||PG.apply(this,arguments);};
  globalThis.advanceStoryScene=function(choiceId=null){
    const rt=active();
    if(rt&&rt.beatId===SOURCE_HOLD&&String(rt.localContext&&rt.localContext.kakashiScene06AW2COutcomeRef||"")==="LETHAL_ATTEMPT_KILLED"){beginConfirmedKill();return{success:true,type:"confirmed_kill_presentation_started"};}
    if(rt&&[AFTERMATH,SCENE07,SCENE08].includes(rt.beatId)&&choiceId==null){const p=sequence(rt);if(!p)return{success:false,reason:"w2c_sequence_missing"};if(!p.atEnd){const key=rt.beatId===AFTERMATH?CURSOR_A:rt.beatId===SCENE07?CURSOR_7:CURSOR_8;rt.localContext={...(rt.localContext||{}),[key]:p.index+1};save();try{renderStoryScenePresentationLayer();}catch(_error){}return{success:true,beatId:rt.beatId,cueIndex:p.index+1};}if(rt.beatId===AFTERMATH)return wipe(enter07);if(rt.beatId===SCENE07)return wipe(enter08);return wipe(openReceipt);}
    const delegated=PA.apply(this,arguments);
    const after=active();
    if(after&&after.beatId===SOURCE_HOLD&&String(after.localContext&&after.localContext.kakashiScene06AW2COutcomeRef||"")==="LETHAL_ATTEMPT_KILLED"){
      const started=beginConfirmedKill();
      if(started)return{...(delegated&&typeof delegated==="object"?delegated:{success:true}),success:true,confirmedKillPresentationStarted:true};
    }
    return delegated;
  };
  try{advanceStoryScene=globalThis.advanceStoryScene;getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;}catch(_error){}
  if(PR){globalThis.renderStoryScenePresentationLayer=function(){const out=PR.apply(this,arguments);const rt=active();if(rt&&rt.beatId===SOURCE_HOLD&&String(rt.localContext&&rt.localContext.kakashiScene06AW2COutcomeRef||"")==="LETHAL_ATTEMPT_KILLED"){if(typeof queueMicrotask==="function")queueMicrotask(beginConfirmedKill);}else if(typeof queueMicrotask==="function")queueMicrotask(render);return out;};try{renderStoryScenePresentationLayer=globalThis.renderStoryScenePresentationLayer;}catch(_error){}}
  hooked=true;return true;
}
function installBrowserFinalCueCapture(){
  if(typeof document==="undefined"||document.__scKakashiW2CFinalCueCapture35770)return false;
  document.__scKakashiW2CFinalCueCapture35770=true;
  document.addEventListener("click",function(event){
    const rt=active();
    if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!=="kak_scene06a_w2c_attempt_kill")return;
    let p=null;try{p=typeof globalThis.getStoryScenePerformance33900==="function"?globalThis.getStoryScenePerformance33900():null;}catch(_error){}
    if(!p||p.atEnd!==true)return;
    const target=event&&event.target&&typeof event.target.closest==="function"?event.target.closest("#story-scene-presentation-layer .sc-chronicle-primary, #story-scene-presentation-layer .sc-story-panel"):null;
    if(!target)return;
    if(event&&typeof event.preventDefault==="function")event.preventDefault();
    if(event&&typeof event.stopImmediatePropagation==="function")event.stopImmediatePropagation();
    const out=globalThis.advanceStoryScene();
    if(out&&out.success===true&&typeof globalThis.renderStoryScenePresentationLayer==="function"){
      try{globalThis.renderStoryScenePresentationLayer();}catch(_error){}
    }
  },true);
  return true;
}
let watchdogId=null;
function installOutcomeWatchdog(){
  if(typeof document==="undefined"||typeof setInterval!=="function"||watchdogId!==null)return false;
  watchdogId=setInterval(function(){
    const rt=active();
    if(!rt||rt.sceneId!==SCENE_ID){removeQaOutcome();return;}
    if(rt.beatId===SOURCE_HOLD){
      const selected=String(rt.localContext&&rt.localContext.kakashiScene06AW2COutcomeRef||"");
      if(selected==="LETHAL_ATTEMPT_KILLED"){removeQaOutcome();beginConfirmedKill();}
      else{
        const fn=globalThis.beginAcademyKakashiResolvedOutcome35780;
        if(typeof fn==="function"&&fn(selected)===true)removeQaOutcome();
        else showQaOutcome(rt);
      }
    }else removeQaOutcome();
  },120);
  return true;
}
function ensure(){if(hooks()){installBrowserFinalCueCapture();installOutcomeWatchdog();return;}if(typeof setTimeout==="function"&&tries++<120)setTimeout(ensure,25);}ensure();
function diagnostics(){const d=scene(),m=d&&d.beatMap instanceof Map?d.beatMap:null,checks={patchId:PATCH_ID==="alpha_kakashi_w2c_ending_35770_v7_2026_09_18",authorities:AUTHORITY.scene06==="820917031000c15e62f0a4cea7535397d3ad9e50"&&AUTHORITY.scene07==="2bcb6bb07dc862cb6f259b784782850619a08a4f"&&AUTHORITY.scene08==="275667ff8b65d5d7e9252164f7552676339a9086",aftermathExact:AFTERMATH_CUES.length===11&&AFTERMATH_CUES[0].text==="Petals drift across the stone."&&AFTERMATH_CUES[10].text==="Kakashi leaves the Sakura tree behind.",scene07Exact:SCENE07_CUES.length===23&&SCENE07_CUES[16].text==="I killed her."&&SCENE07_CUES[18].text==="Those weren’t your orders."&&SCENE07_CUES[19].text==="That was my choice.",scene08Exact:SCENE08_CUES.length===33&&SCENE08_CUES[20].text==="And killed one of us on the way."&&SCENE08_CUES[32].text==="I won’t have trouble with that.",beats:!!m&&[AFTERMATH,SCENE07,SCENE08,RECEIPT,EXIT].every(x=>m.has(x)),deathBeforeAnimation:killLedger.toString().includes("confirmedKill")&&beginConfirmedKill.toString().includes("killLedger"),sharedAttemptAnimation:playLethalAttemptAnimation35770.toString().includes("sc-kakashi-kill-35770")&&typeof globalThis.playAcademyKakashiLethalAttemptAnimation35770==="function",miPostKillCardDrop:removeDeadMiCardAfterKill.toString().includes("sc-kakashi-mi-death-drop-35770")&&installStyle.toString().includes("miCardDrop35770"),officeNarrativeStaging:installStyle.toString().includes('data-sc-kakashi-w2c-stage=\\\"office\\\"')&&installStyle.toString().includes('data-w2c-stage=\\\"office\\\"')&&installStyle.toString().includes("left:22%!important")&&installStyle.toString().includes("left:50%;right:auto;bottom:13.2%")&&board.toString().includes("sc-kakashi-w2c-package-status"),speakerQuickRead:render.toString().includes('name.style.display="block"')&&render.toString().includes('"NARRATION"'),hiddenKnowledgeBoundary:commitHiddenReview.toString().includes("kakashiKnowledgeGranted:false"),receiptSeparate:openReceipt.toString().includes("document.body.appendChild"),konohaExit:completeToKonoha.toString().includes('openOverlay("village")'),finalCuePostDelegate:globalThis.advanceStoryScene.toString().includes("confirmedKillPresentationStarted"),browserFinalCueCapture:installBrowserFinalCueCapture.toString().includes("stopImmediatePropagation")&&installBrowserFinalCueCapture.toString().includes("p.atEnd!==true"),directScene06Entrypoint:typeof globalThis.beginAcademyKakashiConfirmedKill35770==="function",confirmedKillWatchdog:installOutcomeWatchdog.toString().includes("beginConfirmedKill")&&installOutcomeWatchdog.toString().includes("120"),nonKillOutcomeDispatch:installOutcomeWatchdog.toString().includes("beginAcademyKakashiResolvedOutcome35780")&&showQaOutcome.toString().includes("presentation owner unavailable"),browserGoldenClaimed:false};const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};}
globalThis.playAcademyKakashiLethalAttemptAnimation35770=playLethalAttemptAnimation35770;
globalThis.beginAcademyKakashiConfirmedKill35770=beginConfirmedKill;
globalThis.showAcademyKakashiW2CResolverOutcomeQa35770=showQaOutcome;
globalThis.enterAcademyKakashiScene07W2CK35770=enter07;
globalThis.openAcademyKakashiChronicleReceipt35770=openReceipt;
globalThis.completeAcademyKakashiReceiptToKonoha35770=completeToKonoha;
globalThis.runAcademyKakashiW2CEnding35770Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_W2C_ENDING_35770=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,aftermathBeatId:AFTERMATH,scene07BeatId:SCENE07,scene08BeatId:SCENE08,receiptBeatId:RECEIPT,exitBeatId:EXIT,playLethalAttemptAnimation:playLethalAttemptAnimation35770,beginConfirmedKill,showQaOutcome,commitReport,commitHiddenReview,openReceipt,completeToKonoha,diagnostics,browserGoldenClaimed:false});
})();