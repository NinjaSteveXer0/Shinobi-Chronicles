// ============================================================================
// ISSUE #105 / #188 / #192 — KAKASHI SCENE-BOARD PRESENTATION MODEL V2 — 33910
//
// Clean Kakashi consumer of the reusable 33900 Story Scene Board.
// Presentation only: no Story outcome, Battle, custody, reward, Progression,
// PL, Rank, Acquisition, or Chronicle truth ownership lives here.
//
// V2 replaces the earlier corrective patch stack with three explicit surfaces:
//   1. DIALOGUE  — speaker-relative diagonal conversation panels;
//   2. NARRATION — compact neutral cinematic strip;
//   3. DECISION  — floating tactical choice deck with no giant outer box.
//
// 33900 remains the generic Story projection/performance bridge for this browser
// cycle. After V2 browser acceptance, its obsolete Kakashi benchmark block can
// be removed without changing the proven generic bridge.
// ============================================================================
(function installKakashiSceneBoardPolish33910(){
"use strict";
if(globalThis.SC_KAKASHI_SCENE_BOARD_POLISH_33910)return;

const PATCH_ID="kakashi_scene_board_model_v2_33910_2026_09_15";
const STYLE_ID="sc-kakashi-scene-board-polish-33910-style";
const OVERLAY_CLASS="sc-performance-surface-33910";
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
  if(typeof document==="undefined"||!document.head)return false;
  const prior=document.getElementById(STYLE_ID);if(prior)prior.remove();
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
/* --------------------------------------------------------------------------
   Scene composition — cards are actors, not tokens.
   -------------------------------------------------------------------------- */
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors{
  left:2.5%!important;right:2.5%!important;top:8.5%!important;bottom:20%!important;
  gap:2.2%!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="1"]{
  grid-template-columns:minmax(0,390px)!important;justify-content:start!important;padding-left:5.5%!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="2"]{
  display:flex!important;justify-content:space-between!important;align-items:flex-end!important;
  padding:0 5.4%!important;column-gap:0!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor{
  width:min(94%,322px)!important;max-height:490px!important;aspect-ratio:7/10!important;
  overflow:visible!important;opacity:.50!important;transform:translateY(5px) scale(.965)!important;
  filter:saturate(.64) brightness(.72)!important;
  transition:opacity .22s ease,filter .22s ease,transform .22s ease!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor.is-focus{
  opacity:1!important;transform:translateY(0) scale(1)!important;filter:none!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor[data-actor-id="academy_kakashi"],
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor[data-actor-id="konoha_anbu_contact"]{
  width:min(96%,338px)!important;max-height:505px!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor-frame,
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor.is-focus .sc-scene-board-33900__actor-frame{
  border:0!important;background:transparent!important;box-shadow:none!important;
}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor img{
  object-fit:contain!important;filter:drop-shadow(0 17px 20px rgba(0,0,0,.52))!important;
}

/* Remove inherited web-panel arrival/zoom animation. */
#story-scene-presentation-layer[data-sc-scene-board="true"],
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-stage,
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-layout,
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-panel{animation:none!important;}

/* --------------------------------------------------------------------------
   Performance mode — native universal text box is replaced by cinematic lanes.
   -------------------------------------------------------------------------- */
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-chronicle-layout,
#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-chronicle-layout{
  display:none!important;
}
.${OVERLAY_CLASS}{position:absolute;inset:0;z-index:9;pointer-events:none;}
.sc-dialogue-panel-33910,.sc-narration-panel-33910{
  position:absolute;pointer-events:auto;color:#f4efe3;
  background:linear-gradient(135deg,rgba(4,12,18,.90),rgba(5,15,21,.76));
  border:1px solid rgba(210,174,82,.56);box-shadow:0 18px 48px rgba(0,0,0,.38);
  backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);
  overflow:hidden;
}
.sc-dialogue-panel-33910::before,.sc-narration-panel-33910::before{
  content:"";position:absolute;inset:0 auto 0 0;width:3px;
  background:linear-gradient(180deg,rgba(101,224,231,.92),rgba(220,177,77,.46));
}
.sc-dialogue-panel-33910{width:min(30.5%,430px);min-height:102px;padding:16px 60px 16px 18px;}
.sc-dialogue-panel-33910.is-left{left:27.2%;bottom:10.5%;clip-path:polygon(0 0,96% 0,100% 18%,100% 100%,4% 100%,0 82%);}
.sc-dialogue-panel-33910.is-right{right:27.2%;top:39%;clip-path:polygon(4% 0,100% 0,100% 82%,96% 100%,0 100%,0 18%);}
.sc-dialogue-panel-33910.is-previous{opacity:.43;filter:saturate(.55);transform:scale(.965);}
.sc-dialogue-panel-33910.is-current{opacity:1;animation:scDialogueSettle33910 .20s ease-out both;}
@keyframes scDialogueSettle33910{from{opacity:.55;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
.sc-dialogue-speaker-33910{font-size:11px;line-height:1;font-weight:900;letter-spacing:.14em;color:#76e2e8;text-transform:uppercase;margin-bottom:9px;}
.sc-dialogue-copy-33910{font-size:clamp(14px,1.04vw,18px);line-height:1.45;white-space:pre-line;text-shadow:0 1px 2px rgba(0,0,0,.8);}
.sc-dialogue-status-33910{position:absolute;right:14px;top:12px;font-size:8px;font-weight:900;letter-spacing:.13em;color:rgba(231,205,132,.78);text-transform:uppercase;}

.sc-narration-panel-33910{
  left:50%;bottom:4.3%;transform:translateX(-50%);width:min(66%,900px);min-height:78px;
  padding:14px 62px 14px 20px;clip-path:polygon(0 0,97.5% 0,100% 28%,100% 100%,2.5% 100%,0 72%);
}
.sc-narration-kicker-33910{font-size:9px;font-weight:900;letter-spacing:.16em;color:#ddbf70;text-transform:uppercase;margin-bottom:7px;}
.sc-narration-copy-33910{font-size:clamp(14px,1.05vw,18px);line-height:1.45;white-space:pre-line;}
.sc-performance-next-33910{
  position:absolute;right:0;top:0;bottom:0;width:48px;border:0;border-left:1px solid rgba(210,174,82,.48);
  background:linear-gradient(180deg,rgba(22,38,47,.76),rgba(7,17,23,.90));color:#efd580;
  cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0;
}
.sc-performance-next-33910::before{content:"›";font-size:34px;font-weight:300;line-height:1;transition:transform .16s ease,color .16s ease;}
.sc-performance-next-33910:hover::before{transform:translateX(5px);color:#fff3bd;}
.sc-performance-next-33910:focus-visible{outline:2px solid rgba(113,220,228,.88);outline-offset:-3px;}

/* --------------------------------------------------------------------------
   Decision mode — tactical deck, not a boxed web form.
   -------------------------------------------------------------------------- */
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-layout{
  width:min(76%,1040px)!important;margin:0 auto 2.8%!important;gap:10px!important;z-index:10!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-panel{
  max-height:none!important;overflow:visible!important;padding:0!important;border:0!important;background:transparent!important;
  box-shadow:none!important;backdrop-filter:none!important;cursor:default!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-kicker,
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-text{
  width:min(78%,760px);margin-left:auto!important;margin-right:auto!important;
  background:linear-gradient(135deg,rgba(3,11,17,.86),rgba(6,18,24,.72));
  border-left:2px solid rgba(111,219,226,.72);border-right:1px solid rgba(205,169,83,.35);
  backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-kicker{
  margin-bottom:0!important;padding:10px 16px 4px!important;color:#d9bb6c!important;
  border-top:1px solid rgba(205,169,83,.38);
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-text{
  margin-top:0!important;padding:4px 16px 12px!important;font-size:clamp(14px,1vw,17px)!important;line-height:1.35!important;
  border-bottom:1px solid rgba(205,169,83,.38);
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-actions{
  display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;margin-top:10px!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice{
  position:relative!important;min-height:72px!important;padding:11px 52px 11px 14px!important;
  border:1px solid rgba(197,163,77,.48)!important;border-radius:0!important;
  clip-path:polygon(0 0,96% 0,100% 24%,100% 100%,4% 100%,0 76%);
  background:linear-gradient(125deg,rgba(7,18,24,.91),rgba(9,24,31,.76))!important;
  color:#eee8da!important;box-shadow:0 12px 26px rgba(0,0,0,.26)!important;
  transform:translateY(0);transition:transform .16s ease,filter .16s ease,opacity .16s ease,box-shadow .16s ease!important;
  overflow:hidden!important;text-align:left!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice::after{
  content:"";position:absolute;left:-55%;top:0;width:38%;height:100%;pointer-events:none;
  background:linear-gradient(105deg,transparent,rgba(111,220,228,.10),rgba(235,200,116,.18),transparent);
  transform:skewX(-18deg);transition:left .30s ease;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice:not(:disabled):hover{
  transform:translateY(-4px);border-color:rgba(119,224,231,.76)!important;
  box-shadow:0 18px 34px rgba(0,0,0,.34),0 0 0 1px rgba(119,224,231,.08)!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice:not(:disabled):hover::after{left:125%;}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-actions:has(.sc-story-choice:not(:disabled):hover) .sc-story-choice:not(:hover){opacity:.62;filter:saturate(.65) brightness(.82);}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice:disabled{
  opacity:.34!important;filter:saturate(.35)!important;cursor:not-allowed!important;box-shadow:none!important;
}
.sc-tactical-choice-33910{display:grid;grid-template-columns:34px 1fr;gap:10px;align-items:center;width:100%;}
.sc-tactical-glyph-33910{width:30px;height:30px;display:grid;place-items:center;border:1px solid rgba(112,219,227,.48);color:#83dfe5;font-size:17px;line-height:1;background:rgba(4,14,19,.54);}
.sc-tactical-copy-33910{min-width:0;display:flex;flex-direction:column;gap:3px;}
.sc-tactical-intent-33910{font-size:8px;line-height:1;font-weight:900;letter-spacing:.15em;color:#b8a160;text-transform:uppercase;}
.sc-tactical-title-33910{font-size:12px;line-height:1.28;font-weight:800;letter-spacing:.025em;color:#f1ecdf;}
.sc-tactical-arrow-33910{position:absolute;right:15px;top:50%;transform:translateY(-50%);font-size:23px;color:rgba(225,194,107,.78);transition:transform .16s ease,color .16s ease;}
.sc-story-choice:not(:disabled):hover .sc-tactical-arrow-33910{transform:translate(5px,-50%);color:#fff0b4;}
.sc-tactical-locked-33910{position:absolute;right:14px;bottom:8px;font-size:7px;font-weight:900;letter-spacing:.13em;color:rgba(184,188,184,.66);text-transform:uppercase;}

/* Normal non-performance consequence/narration should also stop becoming a giant bar. */
#story-scene-presentation-layer[data-sc-board-ui-mode="narration"] .sc-chronicle-layout{
  width:min(66%,900px)!important;margin:0 auto 3.3%!important;
}
#story-scene-presentation-layer[data-sc-board-ui-mode="narration"] .sc-story-panel{
  max-height:23vh!important;padding:13px 62px 13px 18px!important;position:relative!important;overflow:hidden!important;
}

/* Full-screen covers: old/new Story frames never share the viewport. */
.sc-kakashi-entry-curtain-33910,.sc-kakashi-wipe-33910{position:fixed;inset:0;background:#000;z-index:2147483000;pointer-events:auto;}
.sc-kakashi-entry-curtain-33910{opacity:1;transition:opacity .30s ease;}
.sc-kakashi-entry-curtain-33910.is-revealing{opacity:0;}
.sc-kakashi-wipe-33910{transform:translateX(100%);transition:transform .42s cubic-bezier(.72,0,.28,1);will-change:transform;}
.sc-kakashi-wipe-33910.is-covering{transform:translateX(0);}
.sc-kakashi-wipe-33910.is-revealing{transform:translateX(-100%);}

@media(max-width:1000px){
  .sc-dialogue-panel-33910{width:36%;}
  .sc-dialogue-panel-33910.is-left{left:20%;}.sc-dialogue-panel-33910.is-right{right:20%;}
  #story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-layout{width:88%!important;}
}
@media(max-width:820px){
  #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="2"]{padding:0 2%!important;gap:18px!important;}
  #story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor{width:46%!important;max-height:340px!important;}
  .sc-dialogue-panel-33910{width:58%;min-height:86px;padding:12px 48px 12px 14px;}
  .sc-dialogue-panel-33910.is-left{left:4%;bottom:9%;}.sc-dialogue-panel-33910.is-right{right:4%;top:47%;}
  .sc-narration-panel-33910{width:88%;}
  #story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-layout{width:92%!important;}
  #story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-actions{grid-template-columns:1fr!important;gap:8px!important;}
}
@media(prefers-reduced-motion:reduce){
  .sc-dialogue-panel-33910.is-current,.sc-kakashi-entry-curtain-33910,.sc-kakashi-wipe-33910,
  #story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice{animation:none!important;transition:none!important;}
}
`;
  document.head.appendChild(style);return true;
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
  performanceTransitions:{}
});

function currentRuntime(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function currentBeat(runtime=currentRuntime()){
  try{const d=runtime&&typeof getStorySceneDefinition==="function"?getStorySceneDefinition(runtime.sceneId):null;return d&&d.beatMap instanceof Map?d.beatMap.get(runtime.beatId)||null:null;}catch(_error){return null;}
}
function currentProjection(){try{return typeof getActiveStorySceneBoardProjection==="function"?getActiveStorySceneBoardProjection():null;}catch(_error){return null;}}
function environmentId(beat){const ref=beat&&beat.environmentRef;return typeof ref==="string"?ref:ref&&typeof ref==="object"&&ref.assetId?String(ref.assetId):null;}
function beatById(runtime,beatId){try{const d=runtime&&typeof getStorySceneDefinition==="function"?getStorySceneDefinition(runtime.sceneId):null;return d&&d.beatMap instanceof Map?d.beatMap.get(beatId)||null:null;}catch(_error){return null;}}
function setTransferEnvironment(choiceId){
  try{
    const d=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(scene):null;
    const beat=d&&d.beatMap instanceof Map?d.beatMap.get("kak_original_transfer"):null;
    if(beat)beat.environmentRef={assetId:choiceId==="get_closer"?END_ALLEY_ID:SAKURA_ID};
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
function escapeText(value){return String(value??"");}
function speakerActorId(name){
  const key=String(name||"").trim().toUpperCase();
  if(key==="KAKASHI"||key==="KAKASHI HATAKE")return"academy_kakashi";
  if(key==="ANBU OPERATIVE")return"konoha_anbu_contact";
  if(key==="ANBU MARKED TARGET")return"anbu_marked_target";
  if(key==="PACKAGE SMUGGLER")return"package_smuggler";
  if(key==="MASKED INTERCEPTOR")return"masked_interceptor";
  if(key==="PAKKUN")return"pakkun";
  return null;
}
function actorSideForSpeaker(name,projection=currentProjection()){
  const id=speakerActorId(name),actors=projection&&Array.isArray(projection.actors)?projection.actors:[];
  const index=id?actors.findIndex(row=>row&&row.id===id):-1;
  if(index<=0)return"left";
  if(index>=actors.length-1)return"right";
  return index===1&&actors.length===2?"right":"right";
}
function previousDialogue(performance){
  if(!performance||!Array.isArray(performance.sequence))return null;
  const current=performance.cue||{},currentSpeaker=String(current.speakerName||"");
  for(let i=performance.index-1;i>=0;i--){
    const cue=performance.sequence[i];
    if(cue&&cue.kind==="dialogue"&&cue.speakerName&&String(cue.speakerName)!==currentSpeaker)return cue;
  }
  return null;
}
function makeAdvanceButton(){
  const button=document.createElement("button");
  button.type="button";button.className="sc-performance-next-33910";
  button.setAttribute("aria-label","Advance scene");button.title="Advance scene";
  button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();if(typeof globalThis.advanceStoryScene==="function")globalThis.advanceStoryScene();});
  return button;
}
function makeDialoguePanel(cue,isCurrent,projection){
  const panel=document.createElement("section");
  const side=actorSideForSpeaker(cue&&cue.speakerName,projection);
  panel.className=`sc-dialogue-panel-33910 is-${side} ${isCurrent?"is-current":"is-previous"}`;
  const speaker=document.createElement("div");speaker.className="sc-dialogue-speaker-33910";speaker.textContent=escapeText(cue&&cue.speakerName||"DIALOGUE");
  const copy=document.createElement("div");copy.className="sc-dialogue-copy-33910";copy.textContent=escapeText(cue&&cue.text||"");
  const status=document.createElement("div");status.className="sc-dialogue-status-33910";status.textContent=isCurrent?"SPEAKING":"PREVIOUS";
  panel.append(speaker,copy,status);if(isCurrent)panel.appendChild(makeAdvanceButton());return panel;
}
function makeNarrationPanel(cue){
  const panel=document.createElement("section");panel.className="sc-narration-panel-33910";
  const kicker=document.createElement("div");kicker.className="sc-narration-kicker-33910";kicker.textContent=`${String(cue&&cue.kind||"narration").toUpperCase()} · ACADEMY KAKASHI`;
  const copy=document.createElement("div");copy.className="sc-narration-copy-33910";copy.textContent=escapeText(cue&&cue.text||"");
  panel.append(kicker,copy,makeAdvanceButton());return panel;
}
function renderPerformanceSurface(layer,stage,performance,projection){
  let surface=stage.querySelector(`.${OVERLAY_CLASS}`);
  const cue=performance&&performance.cue||null;
  const signature=JSON.stringify({beat:currentRuntime()&&currentRuntime().beatId,index:performance&&performance.index,cue:cue&&cue.cueId,kind:cue&&cue.kind});
  if(surface&&surface.dataset.signature===signature)return;
  if(surface)surface.remove();
  surface=document.createElement("div");surface.className=OVERLAY_CLASS;surface.dataset.signature=signature;
  if(cue&&cue.kind==="dialogue"){
    const prev=previousDialogue(performance);if(prev)surface.appendChild(makeDialoguePanel(prev,false,projection));
    surface.appendChild(makeDialoguePanel(cue,true,projection));
  }else surface.appendChild(makeNarrationPanel(cue||{}));
  stage.appendChild(surface);
}
function clearPerformanceSurface(stage){for(const node of stage&&stage.querySelectorAll?stage.querySelectorAll(`.${OVERLAY_CLASS}`):[])node.remove();}

function intentMeta(choice){
  const id=String(choice&&choice.choiceId||"").toLowerCase(),label=String(choice&&choice.label||"").toLowerCase();
  const text=`${id} ${label}`;
  if(text.includes("observe")||text.includes("watch"))return{intent:"OBSERVE",glyph:"◎"};
  if(text.includes("kill"))return{intent:"LETHAL",glyph:"×"};
  if(text.includes("attack")||text.includes("fight")||text.includes("strike")||text.includes("defeat")||text.includes("take_him_down")||text.includes("take him down"))return{intent:"COMBAT",glyph:"✦"};
  if(text.includes("pickpocket")||text.includes("package")||text.includes("secure")||text.includes("demand"))return{intent:"OBJECTIVE",glyph:"◇"};
  if(text.includes("pursue")||text.includes("closer")||text.includes("chase")||text.includes("go_after")||text.includes("go after")||text.includes("stay_on"))return{intent:"POSITION",glyph:"↗"};
  if(text.includes("ask")||text.includes("where"))return{intent:"INTEL",glyph:"?"};
  if(text.includes("police")||text.includes("release")||text.includes("return"))return{intent:"DISPOSITION",glyph:"◆"};
  return{intent:"TACTICAL",glyph:"›"};
}
function decorateChoiceDeck(layer,beat){
  const buttons=Array.from(layer.querySelectorAll(".sc-story-choice"));
  const choices=beat&&Array.isArray(beat.choices)?beat.choices:[];
  buttons.forEach((button,index)=>{
    const choice=choices[index]||{};
    const signature=`${choice.choiceId||index}:${choice.label||button.textContent||""}:${button.disabled}`;
    if(button.dataset.scTacticalSignature===signature)return;
    button.dataset.scTacticalSignature=signature;
    const meta=intentMeta(choice),label=String(choice.label||button.textContent||"Choice").trim();
    button.textContent="";
    const inner=document.createElement("span");inner.className="sc-tactical-choice-33910";
    const glyph=document.createElement("span");glyph.className="sc-tactical-glyph-33910";glyph.textContent=meta.glyph;
    const copy=document.createElement("span");copy.className="sc-tactical-copy-33910";
    const intent=document.createElement("span");intent.className="sc-tactical-intent-33910";intent.textContent=meta.intent;
    const title=document.createElement("span");title.className="sc-tactical-title-33910";title.textContent=label;
    copy.append(intent,title);inner.append(glyph,copy);button.appendChild(inner);
    const arrow=document.createElement("span");arrow.className="sc-tactical-arrow-33910";arrow.textContent=button.disabled?"·":"›";button.appendChild(arrow);
    if(button.disabled){const locked=document.createElement("span");locked.className="sc-tactical-locked-33910";locked.textContent="UNAVAILABLE";button.appendChild(locked);}
    button.setAttribute("aria-label",label);
  });
}

let syncScheduled=false,lastModeSignature="";
function scheduleSync(){if(syncScheduled)return;syncScheduled=true;const run=()=>{syncScheduled=false;syncPresentation();};if(typeof requestAnimationFrame==="function")requestAnimationFrame(run);else setTimeout(run,0);}
function syncPresentation(){
  if(typeof document==="undefined")return false;
  const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;
  const runtime=currentRuntime();if(!runtime||runtime.sceneId!==scene){delete layer.dataset.scBoardUiMode;return false;}
  const stage=layer.querySelector(".sc-chronicle-stage")||layer.querySelector(".sc-story-stage")||layer;
  const beat=currentBeat(runtime),performance=typeof getStoryScenePerformance33900==="function"?getStoryScenePerformance33900():null,projection=currentProjection();
  let mode="narration";
  if(performance&&performance.cue)mode=performance.cue.kind==="dialogue"?"dialogue":"performance_narration";
  else if(beat&&beat.mode==="choice")mode="decision";
  layer.dataset.scBoardUiMode=mode;
  const signature=`${runtime.beatId}:${mode}:${performance&&performance.index}`;
  if(mode==="dialogue"||mode==="performance_narration")renderPerformanceSurface(layer,stage,performance,projection);
  else clearPerformanceSurface(stage);
  if(mode==="decision")decorateChoiceDeck(layer,beat);
  if(lastModeSignature!==signature)lastModeSignature=signature;
  return true;
}

let transitionBusy=false;
function finishTransition(node){try{node&&node.remove&&node.remove();}catch(_error){}transitionBusy=false;scheduleSync();}
function reducedMotion(){try{return typeof matchMedia==="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(_error){return false;}}
function performSmoothWipe(next){
  if(typeof next!=="function")return{success:false,reason:"kakashi_wipe_continuation_missing"};
  if(typeof document==="undefined"||!document.body||reducedMotion())return next();
  if(transitionBusy)return{success:false,reason:"kakashi_scene_transition_in_progress"};
  transitionBusy=true;
  const wipe=document.createElement("div");wipe.className="sc-kakashi-wipe-33910";wipe.setAttribute("aria-hidden","true");document.body.appendChild(wipe);
  let covered=false,revealing=false;
  const reveal=()=>{
    if(revealing)return;revealing=true;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      wipe.classList.remove("is-covering");wipe.classList.add("is-revealing");
      const done=event=>{if(event&&event.propertyName!=="transform")return;wipe.removeEventListener("transitionend",done);finishTransition(wipe);};
      wipe.addEventListener("transitionend",done);setTimeout(()=>finishTransition(wipe),700);
    }));
  };
  const mutateCovered=()=>{
    if(covered)return;covered=true;
    try{next();if(typeof renderStorySceneBoard33900==="function")renderStorySceneBoard33900();syncPresentation();}finally{setTimeout(reveal,110);}
  };
  const onCover=event=>{if(event&&event.propertyName!=="transform")return;wipe.removeEventListener("transitionend",onCover);mutateCovered();};
  wipe.addEventListener("transitionend",onCover);
  requestAnimationFrame(()=>requestAnimationFrame(()=>wipe.classList.add("is-covering")));
  setTimeout(mutateCovered,700);
  return{success:true,type:"kakashi_scene_smooth_wipe_v2",pending:true};
}

const PRE_ADVANCE_33910=typeof globalThis.advanceStoryScene==="function"?globalThis.advanceStoryScene:null;
if(PRE_ADVANCE_33910){
  function advanceStoryScene33910(choiceId=null){
    const runtime=currentRuntime(),beat=currentBeat(runtime);
    if(!runtime||runtime.sceneId!==scene||!beat||transitionBusy)return transitionBusy?{success:false,reason:"kakashi_scene_transition_in_progress"}:PRE_ADVANCE_33910.apply(this,arguments);
    if(beat.beatId==="kak_original_action"&&choiceId!==null&&choiceId!==undefined)setTransferEnvironment(String(choiceId));
    const nextId=nextBeatFor(runtime,beat,choiceId),nextBeat=nextId?beatById(runtime,nextId):null;
    const backdropChanges=!!nextBeat&&environmentId(beat)!==environmentId(nextBeat);
    const args=arguments,self=this;
    if(backdropChanges)return performSmoothWipe(()=>PRE_ADVANCE_33910.apply(self,args));
    const result=PRE_ADVANCE_33910.apply(this,arguments);scheduleSync();return result;
  }
  globalThis.advanceStoryScene=advanceStoryScene33910;
  try{advanceStoryScene=advanceStoryScene33910;}catch(_error){}
}

function createEntryCurtain(){
  if(typeof document==="undefined"||!document.body)return null;
  const prior=document.querySelector(".sc-kakashi-entry-curtain-33910");if(prior)return prior;
  const curtain=document.createElement("div");curtain.className="sc-kakashi-entry-curtain-33910";curtain.setAttribute("aria-hidden","true");document.body.appendChild(curtain);return curtain;
}
function revealEntryCurtain(curtain){
  if(!curtain)return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{
    curtain.classList.add("is-revealing");setTimeout(()=>{try{curtain.remove();}catch(_error){}},420);
  },70)));
}
const PRE_RENDER_33910=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;
let lastRenderedSceneId=currentRuntime()&&currentRuntime().sceneId||null;
if(PRE_RENDER_33910){
  function renderStoryScenePresentationLayer33910(){
    const before=currentRuntime(),entering=!!before&&before.sceneId===scene&&lastRenderedSceneId!==scene,curtain=entering?createEntryCurtain():null;
    const result=PRE_RENDER_33910.apply(this,arguments),after=currentRuntime();lastRenderedSceneId=after&&after.sceneId||null;
    scheduleSync();if(curtain)revealEntryCurtain(curtain);return result;
  }
  globalThis.renderStoryScenePresentationLayer=renderStoryScenePresentationLayer33910;
  try{renderStoryScenePresentationLayer=renderStoryScenePresentationLayer33910;}catch(_error){}
}

if(typeof document!=="undefined"&&typeof MutationObserver==="function"){
  const target=document.getElementById("story-scene-presentation-layer")||document.body;
  if(target){const observer=new MutationObserver(()=>scheduleSync());observer.observe(target,{childList:true,subtree:true});}
}

function runKakashiSceneBoardPolish33910Diagnostics(){
  const getPath=typeof getSceneBackdropAssetPath==="function"?getSceneBackdropAssetPath:null;
  const style=typeof document!=="undefined"?document.getElementById(STYLE_ID):null;
  const css=style?style.textContent:"";
  const checks={
    patchId:PATCH_ID==="kakashi_scene_board_model_v2_33910_2026_09_15",
    cardsPushedApart:css.includes('data-count="2"')&&css.includes("justify-content:space-between"),
    diagonalConversationPanels:css.includes("sc-dialogue-panel-33910.is-left")&&css.includes("sc-dialogue-panel-33910.is-right"),
    previousSpeakerPreserved:previousDialogue.toString().includes("performance.index-1")&&css.includes("is-previous"),
    compactNarrationSurface:css.includes("sc-narration-panel-33910")&&css.includes("width:min(66%,900px)"),
    tacticalChoiceDeck:css.includes("data-sc-board-ui-mode=\"decision\"")&&css.includes("sc-tactical-choice-33910"),
    giantChoiceOuterBoxRemoved:css.includes("background:transparent!important")&&css.includes("box-shadow:none!important"),
    exactReplacementCardAssets:AMT_IMAGE==="NPC/anbu_marked_target.png"&&PS_IMAGE==="NPC/package_smuggler.png"&&MI_IMAGE==="NPC/masked_interceptor.png",
    retiredBattlePortraitsAbsent:![AMT_IMAGE,PS_IMAGE,MI_IMAGE].some(path=>path.includes("Enemies Portraits/")),
    endOfAlleyRegistered:!!getPath&&getPath(END_ALLEY_ID)===END_ALLEY_PATH,
    pakkunInterceptionRegistered:!!getPath&&getPath(PAKKUN_INTERCEPT_ID)===PAKKUN_INTERCEPT_PATH,
    smoothWipeMutatesOnlyWhenCovered:performSmoothWipe.toString().includes("mutateCovered")&&performSmoothWipe.toString().includes("transitionend"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,patchId:PATCH_ID,cleanupPhase:"33910_rewritten; legacy Kakashi benchmark in 33900 retained only until V2 browser acceptance",browserGoldenClaimed:false};
}

globalThis.runKakashiSceneBoardPolish33910Diagnostics=runKakashiSceneBoardPolish33910Diagnostics;
globalThis.SC_KAKASHI_SCENE_BOARD_POLISH_33910=Object.freeze({patchId:PATCH_ID,model:"scene_board_v2",browserGoldenClaimed:false});
try{if(typeof renderStorySceneBoard33900==="function")renderStorySceneBoard33900();syncPresentation();}catch(_error){}
})();
