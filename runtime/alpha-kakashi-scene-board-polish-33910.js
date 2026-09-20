// ============================================================================
// ISSUE #105 / #188 / #192 — KAKASHI SCENE-BOARD PRESENTATION MODEL V4 — 33910
//
// Canonical Kakashi consumer of the reusable 33900 Story Scene Board.
// Presentation only: no Story outcome, Battle, custody, reward, Progression,
// PL, Rank, Acquisition, or Chronicle truth ownership lives here.
//
// Scene 1 player-facing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_01_Rooftop_Verbatim_Lock_2026-09-17.md
// commit d11aa0f4f8e1ee203d3b63cee9a1b0d2fa88ea91
// Scene 2 player-facing authority:
// Documentation/Story/Academy_Kakashi_Origin_Scene_02_The_Tail_Verbatim_Lock_2026-09-17.md
// commit 6e87a8c3364e22e696e0a9c120c51bc0c57e9881
// ============================================================================
(function installKakashiSceneBoardPolish33910(){
"use strict";
if(globalThis.SC_KAKASHI_SCENE_BOARD_POLISH_33910)return;

const PATCH_ID="kakashi_scene_board_model_v13_33910_2026_09_21";
const SCENE_01_AUTHORITY="d11aa0f4f8e1ee203d3b63cee9a1b0d2fa88ea91";
const SCENE_02_AUTHORITY="6e87a8c3364e22e696e0a9c120c51bc0c57e9881";
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
const PAKKUN_IMAGE="Assets/Summons/pakkun.png";
const MINATO_IMAGE="Assets/Kage/kage_minato.png";
const HOKAGE_INTERIOR_ID="kakashi_origin_hokage_administration_interior_night";
const HOKAGE_INTERIOR_PATH="Kakashi Origin Backdrop/hokage_administration_interior_night.png";
const kakashiOccurrence="occ_origin_kakashi_anbu_retrieval_resolution";

try{
  const reg=typeof registerSceneBackdropAssetPath==="function"?registerSceneBackdropAssetPath:globalThis.registerSceneBackdropAssetPath;
  if(typeof reg==="function"){
    reg(END_ALLEY_ID,END_ALLEY_PATH);
    reg(PAKKUN_INTERCEPT_ID,PAKKUN_INTERCEPT_PATH);
    reg(HOKAGE_INTERIOR_ID,HOKAGE_INTERIOR_PATH);
  }
}catch(_error){}

function installStyle(){
  if(typeof document==="undefined"||!document.head)return false;
  const prior=document.getElementById(STYLE_ID);if(prior)prior.remove();
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=`
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors{left:2.5%!important;right:2.5%!important;top:8.5%!important;bottom:20%!important;gap:2.2%!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="1"]{grid-template-columns:minmax(0,390px)!important;justify-content:start!important;padding-left:5.5%!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="2"]{display:flex!important;justify-content:space-between!important;align-items:flex-end!important;padding:0 5.4%!important;column-gap:0!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor{width:min(94%,322px)!important;max-height:490px!important;aspect-ratio:7/10!important;overflow:visible!important;opacity:.50!important;transform:translateY(5px) scale(.965)!important;filter:saturate(.64) brightness(.72)!important;transition:opacity .22s ease,filter .22s ease,transform .22s ease!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="4"] .sc-scene-board-33900__actor{width:min(92%,220px)!important;max-height:405px!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="5"] .sc-scene-board-33900__actor{width:min(94%,188px)!important;max-height:365px!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actors[data-count="6"] .sc-scene-board-33900__actor{width:min(96%,166px)!important;max-height:340px!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor.is-focus{opacity:1!important;transform:translateY(0) scale(1)!important;filter:none!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor[data-actor-id="academy_kakashi"],#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor[data-actor-id="konoha_anbu_contact"]{width:min(96%,338px)!important;max-height:505px!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor-frame,#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor.is-focus .sc-scene-board-33900__actor-frame{border:0!important;background:transparent!important;box-shadow:none!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor img{object-fit:contain!important;filter:drop-shadow(0 17px 20px rgba(0,0,0,.52))!important;}
#story-scene-presentation-layer[data-sc-scene-board="true"],#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-stage,#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-chronicle-layout,#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-story-panel{animation:none!important;}
#story-scene-presentation-layer[data-sc-board-ui-mode="dialogue"] .sc-chronicle-layout,#story-scene-presentation-layer[data-sc-board-ui-mode="performance_narration"] .sc-chronicle-layout{display:none!important;}
.${OVERLAY_CLASS}{position:absolute;inset:0;z-index:9;pointer-events:none;}
.sc-dialogue-panel-33910,.sc-narration-panel-33910{position:absolute;pointer-events:auto;color:#f4efe3;background:linear-gradient(135deg,rgba(4,12,18,.90),rgba(5,15,21,.76));border:1px solid rgba(210,174,82,.56);box-shadow:0 18px 48px rgba(0,0,0,.38);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);overflow:hidden;}
.sc-dialogue-panel-33910::before,.sc-narration-panel-33910::before{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:linear-gradient(180deg,rgba(101,224,231,.92),rgba(220,177,77,.46));}
.sc-dialogue-panel-33910{width:min(30.5%,430px);min-height:102px;padding:16px 60px 16px 18px;}
.sc-dialogue-panel-33910.is-left{left:27.2%;bottom:10.5%;}.sc-dialogue-panel-33910.is-right{right:27.2%;top:39%;}
.sc-dialogue-panel-33910.is-previous{opacity:.43;filter:saturate(.55);transform:scale(.965);}.sc-dialogue-panel-33910.is-current{opacity:1;}
.sc-dialogue-speaker-33910{font-size:11px;line-height:1;font-weight:900;letter-spacing:.14em;color:#76e2e8;text-transform:uppercase;margin-bottom:9px;}.sc-dialogue-copy-33910{font-size:clamp(14px,1.04vw,18px);line-height:1.45;white-space:pre-line;text-shadow:0 1px 2px rgba(0,0,0,.8);}.sc-dialogue-status-33910{position:absolute;right:14px;top:12px;font-size:8px;font-weight:900;letter-spacing:.13em;color:rgba(231,205,132,.78);text-transform:uppercase;}
.sc-narration-panel-33910{left:50%;bottom:4.3%;transform:translateX(-50%);width:min(66%,900px);min-height:78px;padding:14px 62px 14px 20px;}.sc-narration-kicker-33910{font-size:9px;font-weight:900;letter-spacing:.16em;color:#ddbf70;text-transform:uppercase;margin-bottom:7px;}.sc-narration-copy-33910{font-size:clamp(14px,1.05vw,18px);line-height:1.45;white-space:pre-line;}
.sc-performance-next-33910{position:absolute;right:0;top:0;bottom:0;width:48px;border:0;border-left:1px solid rgba(210,174,82,.48);background:linear-gradient(180deg,rgba(22,38,47,.76),rgba(7,17,23,.90));color:#efd580;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0;}.sc-performance-next-33910::before{content:"›";font-size:34px;font-weight:300;line-height:1;}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-layout{width:min(76%,1040px)!important;margin:0 auto 2.8%!important;gap:10px!important;z-index:10!important;}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-panel{max-height:none!important;overflow:visible!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;backdrop-filter:none!important;cursor:default!important;}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-kicker,#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-text{width:min(78%,760px);margin-left:auto!important;margin-right:auto!important;background:linear-gradient(135deg,rgba(3,11,17,.86),rgba(6,18,24,.72));border-left:2px solid rgba(111,219,226,.72);border-right:1px solid rgba(205,169,83,.35);backdrop-filter:blur(7px);}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-kicker{margin-bottom:0!important;padding:10px 16px 4px!important;color:#d9bb6c!important;border-top:1px solid rgba(205,169,83,.38);}#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-text{margin-top:0!important;padding:4px 16px 12px!important;font-size:clamp(14px,1vw,17px)!important;line-height:1.35!important;border-bottom:1px solid rgba(205,169,83,.38);}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;margin-top:10px!important;}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice{position:relative!important;min-height:72px!important;padding:11px 52px 11px 14px!important;border:1px solid rgba(197,163,77,.48)!important;background:linear-gradient(125deg,rgba(7,18,24,.91),rgba(9,24,31,.76))!important;color:#eee8da!important;box-shadow:0 12px 26px rgba(0,0,0,.26)!important;text-align:left!important;overflow:hidden!important;min-width:0!important;}
#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-story-choice:disabled{opacity:.34!important;filter:saturate(.35)!important;cursor:not-allowed!important;box-shadow:none!important;}
.sc-tactical-choice-33910{display:grid;grid-template-columns:34px 1fr;gap:10px;align-items:center;width:100%;}.sc-tactical-glyph-33910{width:30px;height:30px;display:grid;place-items:center;border:1px solid rgba(112,219,227,.48);color:#83dfe5;font-size:17px;line-height:1;background:rgba(4,14,19,.54);}.sc-tactical-copy-33910{min-width:0;display:flex;flex-direction:column;gap:3px;}.sc-tactical-intent-33910{font-size:8px;line-height:1;font-weight:900;letter-spacing:.15em;color:#b8a160;text-transform:uppercase;}.sc-tactical-title-33910{font-size:12px;line-height:1.28;font-weight:800;letter-spacing:.025em;color:#f1ecdf;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;max-width:100%!important;}.sc-tactical-arrow-33910{position:absolute;right:15px;top:50%;transform:translateY(-50%);font-size:23px;color:rgba(225,194,107,.78);}.sc-tactical-locked-33910{position:absolute;right:14px;bottom:8px;font-size:7px;font-weight:900;letter-spacing:.13em;color:rgba(184,188,184,.66);text-transform:uppercase;}
#story-scene-presentation-layer[data-sc-board-ui-mode="narration"] .sc-chronicle-layout{width:min(66%,900px)!important;margin:0 auto 3.3%!important;}#story-scene-presentation-layer[data-sc-board-ui-mode="narration"] .sc-story-panel{max-height:23vh!important;padding:13px 62px 13px 18px!important;position:relative!important;overflow:hidden!important;}
.sc-kakashi-entry-curtain-33910,.sc-kakashi-wipe-33910{position:fixed;inset:0;background:#000;z-index:2147483000;pointer-events:auto;}.sc-kakashi-entry-curtain-33910{opacity:1;transition:opacity .30s ease;}.sc-kakashi-entry-curtain-33910.is-revealing{opacity:0;}.sc-kakashi-wipe-33910{transform:translateX(100%);transition:transform .42s cubic-bezier(.72,0,.28,1);will-change:transform;}.sc-kakashi-wipe-33910.is-covering{transform:translateX(0);}.sc-kakashi-wipe-33910.is-revealing{transform:translateX(-100%);}
@media(max-width:820px){#story-scene-presentation-layer[data-sc-scene-board="true"] .sc-scene-board-33900__actor{width:46%!important;max-height:340px!important;}.sc-dialogue-panel-33910{width:58%;}.sc-narration-panel-33910{width:88%;}#story-scene-presentation-layer[data-sc-board-ui-mode="decision"] .sc-chronicle-actions{grid-template-columns:1fr!important;}}
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
function pakkun(state="PRESENT",focus=false,entering=false){return actor("pakkun","PAKKUN",PAKKUN_IMAGE,state,focus,entering);}
function minato(state="REVIEWING SEALED RECORD",focus=false,entering=false){return actor("hokage_minato","HOKAGE MINATO",MINATO_IMAGE,state,focus,entering);}
function terminalPakkunPresent33910(context){
 return !!(context&&(context.kakashiPostMiPakkunPresent===true||context.kakashiKonohaPakkunPresent===true||context.kakashiTerminalSequentialAmtReached35100===true)&&!context.kakashiPostMiPakkunDepartureOccurrenceId);
}
function terminalReportProjection33910(beatId,context){
 const reportBeat=beatId==="kak_terminal_debrief_report_35100",actors=[kakashi("REPORTING",!reportBeat),anbu(reportBeat?"SPEAKING":"RECEIVING REPORT",reportBeat)];
 if(terminalPakkunPresent33910(context))actors.push(pakkun("PRESENT"));
 return{mode:"conversation",location:"KONOHA ROOFTOP · NIGHT",objective:"Report the mission outcome to ANBU.",actors,objects:[]};
}
function terminalHokageProjection33910(){
 return{mode:"conversation",location:"HOKAGE ADMINISTRATION · NIGHT",objective:"Private review of the sealed field record.",actors:[anbu("REPORTING"),minato("REVIEWING SEALED RECORD",true)],objects:[{label:"SEALED FIELD RECORD",state:"UNDER HOKAGE REVIEW"}]};
}
function terminalMinatoPerformance33910(){
 try{
  const mod=globalThis.SC_ALPHA_KAKASHI_DYNAMIC_TERMINAL_35940;
  return mod&&typeof mod.minatoPerformance==="function"?mod.minatoPerformance():null;
 }catch(_error){return null;}
}
function currentEscortRefs33910(){try{const m=globalThis.SC_ALPHA_KAKASHI_FIELD_SECURED_35920;return m&&typeof m.escortRefs==="function"?m.escortRefs():[];}catch(_e){return[];}}
function escortActors33910(focus=null){const refs=currentEscortRefs33910(),out=[];for(const ref of refs){if(ref==="academy_kakashi_origin_amt")out.push(amt("RESTRAINED",focus==="anbu_marked_target"));else if(ref==="academy_kakashi_origin_package_smuggler")out.push(smuggler("RESTRAINED",focus==="package_smuggler"));else if(ref==="academy_kakashi_origin_masked_interceptor")out.push(interceptor("RESTRAINED",focus==="masked_interceptor"));}return out;}
function committedFact(){try{return A&&typeof A.findOccurrence==="function"?A.findOccurrence(kakashiOccurrence):null;}catch(_error){return null;}}

// Stephen-approved Scene 1 — exact wording and exact order. Do not paraphrase.
const rooftopPerformance=Object.freeze([
  Object.freeze({cueId:"scene01_01",kind:"narration",text:"Kakashi stands alone on a Konoha rooftop, the village lights spread out below him. A masked ANBU operative lands behind him without warning.",focusActorRef:"academy_kakashi",actorEntrance:"konoha_anbu_contact"}),
  Object.freeze({cueId:"scene01_02",kind:"dialogue",speakerName:"ANBU OPERATIVE",text:"Kakashi Hatake.",focusActorRef:"konoha_anbu_contact"}),
  Object.freeze({cueId:"scene01_03",kind:"narration",text:"Kakashi turns to face him.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene01_04",kind:"dialogue",speakerName:"ANBU OPERATIVE",text:"You have orders. Stop this package from falling into the wrong hands.",focusActorRef:"konoha_anbu_contact"}),
  Object.freeze({cueId:"scene01_05",kind:"narration",text:"The operative holds out a sealed envelope.",focusActorRef:"konoha_anbu_contact",objectState:"raised"}),
  Object.freeze({cueId:"scene01_06",kind:"narration",text:"Kakashi crosses the rooftop and takes it.",focusActorRef:"academy_kakashi",objectState:"held"}),
  Object.freeze({cueId:"scene01_07",kind:"dialogue",speakerName:"KAKASHI",text:"Why are you coming to me with this?",focusActorRef:"academy_kakashi",objectState:"held"}),
  Object.freeze({cueId:"scene01_08",kind:"dialogue",speakerName:"ANBU OPERATIVE",text:"Hokage's orders.",focusActorRef:"konoha_anbu_contact",objectState:"held"}),
  Object.freeze({cueId:"scene01_09",kind:"narration",text:"Kakashi looks down at the seal.",focusActorRef:"academy_kakashi",objectState:"held"}),
  Object.freeze({cueId:"scene01_10",kind:"narration",text:"He breaks it. A target photograph waits inside.",focusActorRef:"academy_kakashi",objectState:"opened"})
]);

// Stephen-approved Scene 2 — exact wording and exact order. Narration only.
const tailPerformance=Object.freeze([
  Object.freeze({cueId:"scene02_01",kind:"narration",text:"Kakashi did not need long to find the man from the envelope.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene02_02",kind:"narration",text:"The difficult part was making sure the man never realised he had been found.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene02_03",kind:"narration",text:"Konoha changed shape when Kakashi followed someone through it. Streets stopped being streets and became sightlines. Crowds became cover. Roof edges became distances to clear before the person below could turn his head.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene02_04",kind:"narration",text:"ANBU Marked Target moved without the nervous scanning of someone who expected immediate pursuit.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene02_05",kind:"narration",text:"Kakashi kept it that way.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene02_06",kind:"narration",text:"He followed from above until the route tightened into older streets and narrower angles, then dropped lower when the rooftops would have made him too obvious.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene02_07",kind:"narration",text:"The target never looked directly at him.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene02_08",kind:"narration",text:"Not once.",focusActorRef:"anbu_marked_target"}),
  Object.freeze({cueId:"scene02_09",kind:"narration",text:"That did not make Kakashi relax.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene02_10",kind:"narration",text:"It made him wonder who the man expected to meet.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene02_11",kind:"narration",text:"By the time the route bent toward the Sakura tree and the alley beyond it, Kakashi had his answer.",focusActorRef:"academy_kakashi"}),
  Object.freeze({cueId:"scene02_12",kind:"narration",text:"Someone was waiting.",focusActorRef:"academy_kakashi"})
]);
const observeTransferPerformance=[
  {cueId:"observe_01",kind:"narration",text:"Kakashi stays still and watches the exchange unfold.",focusActorRef:"academy_kakashi"},
  {cueId:"observe_02",kind:"action",text:"ANBU Marked Target hands the package to Package Smuggler.",focusActorRef:"package_smuggler",objectState:"smuggler"},
  {cueId:"observe_03",kind:"narration",text:"Masked Interceptor comes out of the darkness as ANBU Marked Target breaks away from the exchange.",focusActorRef:"masked_interceptor",actorEntrance:"masked_interceptor",objectState:"smuggler"}
];

function roofProjection(performance){
  const cue=performance&&performance.cue||rooftopPerformance[0],idx=performance?performance.index:0,focus=cue.focusActorRef;
  const actors=[kakashi(idx===0?"WATCHING KONOHA":focus==="academy_kakashi"?"FOCUSED":"PRESENT",focus==="academy_kakashi")];
  if(idx>=1||cue.actorEntrance==="konoha_anbu_contact")actors.push(anbu(focus==="konoha_anbu_contact"?"SPEAKING":"PRESENT",focus==="konoha_anbu_contact",cue.actorEntrance==="konoha_anbu_contact"));
  const objects=[];
  if(cue.objectState==="raised")objects.push({label:"SEALED ENVELOPE",state:"OFFERED"});
  if(cue.objectState==="held")objects.push({label:"SEALED ENVELOPE",state:"HELD BY KAKASHI"});
  if(cue.objectState==="opened")objects.push({label:"TARGET PHOTOGRAPH",state:"REVEALED INSIDE ENVELOPE"});
  return{mode:"conversation",location:"KONOHA ROOFTOP",objective:OBJECTIVE,actors,objects};
}
function tailProjection(performance){
  const cue=performance&&performance.cue||tailPerformance[0],focus=cue.focusActorRef;
  return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors:[kakashi("TAILING",focus==="academy_kakashi"),amt("UNAWARE",focus==="anbu_marked_target")],objects:[]};
}
function transferProjection(performance,context){
  if(context.kakashiOriginalAction!=="observe")return{mode:"encounter",location:context.kakashiOriginalAction==="get_closer"?"END OF ALLEY":"KONOHA ALLEY",objective:OBJECTIVE,reaction:String(context.kakashiOriginalAction||"").toUpperCase(),actors:[kakashi("ACTION COMMITTED",true),amt("RESPONDING"),smuggler("RESPONDING")],objects:[{label:"PACKAGE",state:"OUTCOME REQUIRES OWNING RESOLVER"}]};
  const cue=performance&&performance.cue||observeTransferPerformance[0],idx=performance?performance.index:0,focus=cue.focusActorRef;
  const expanded=!!performance&&Array.isArray(performance.sequence)&&performance.sequence.length>=18;
  if(expanded){
    const psState=idx>=16?"HAS PACKAGE · ESCAPE BLOCKED":idx>=3?"HAS PACKAGE":"AT EXCHANGE";
    let actors=[];
    if(idx<=11){
      actors=[amt(idx>=6?"LEAVING EXCHANGE":"AT EXCHANGE",focus==="anbu_marked_target"),smuggler(psState,focus==="package_smuggler")];
    }else if(idx===12){
      actors=[amt("BREAKING AWAY",false),interceptor("BURSTING FROM SHADOW",true,true),smuggler(psState,false)];
    }else{
      const miState=idx>=16?"CUTTING OFF ESCAPE":"PRESSING PACKAGE SMUGGLER";
      actors=[interceptor(miState,focus==="masked_interceptor"),smuggler(psState,focus==="package_smuggler")];
    }
    return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors,objects:idx>=3?[]:[{label:"PACKAGE",state:"EXCHANGE IN PROGRESS"}]};
  }
  if(idx<2){
    return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors:[amt(idx>=1?"LEAVING":"AT EXCHANGE",focus==="anbu_marked_target"),smuggler(idx>=1?"HAS PACKAGE":"AT EXCHANGE",focus==="package_smuggler",cue.actorEntrance==="package_smuggler")],objects:idx>=1?[]:[{label:"PACKAGE",state:"EXCHANGE IN PROGRESS"}]};
  }
  return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors:[amt("BREAKING AWAY"),interceptor("BURSTING FROM SHADOW",true,cue.actorEntrance==="masked_interceptor"),smuggler("HAS PACKAGE")],objects:[]};
}
function kakashiBoardResolver({beatId,context,performance}){
  if(beatId==="kak_original_rooftop"||beatId==="kak_original_anbu"||beatId==="kak_original_envelope"||beatId==="kak_original_order")return roofProjection(performance);
  if(beatId==="kak_original_tail")return tailProjection(performance);
  if(beatId==="kak_original_action")return{mode:"encounter",location:"KONOHA ALLEY",objective:OBJECTIVE,actors:[kakashi("UNDETECTED POSITION",true),amt("CURRENT CARRIER"),smuggler("RECEIVING CONTACT")],objects:[{label:"PACKAGE",state:"EXCHANGE IN PROGRESS"}]};
  if(beatId==="kak_original_transfer")return transferProjection(performance,context);
  if(beatId==="kak_original_major_choice")return{mode:"encounter",location:"KONOHA ALLEY",objective:"Choose which problem Kakashi prioritizes.",actors:[interceptor("BLOCKING ESCAPE"),smuggler("HAS PACKAGE")],objects:[]};
  if(beatId==="kak_original_secured"){const r=committedFact(),fact=r&&r.fact||{};return{mode:"consequence",location:"KONOHA ALLEY",objective:"Return with the retrieval result.",committed:fact.packageDisposition==="secured",actors:[kakashi("PACKAGE SECURED",true),smuggler("PACKAGE RELINQUISHED"),interceptor("SEPARATE COMPLICATION")],objects:[{label:"PACKAGE",state:fact.packageDisposition==="secured"?"SECURED BY KAKASHI":"RESOLVING"}]};}
  if(beatId==="kak_original_pursue"){const r=committedFact(),fact=r&&r.fact||{};return{mode:"consequence",location:"KONOHA ALLEY",objective:"Return with the retrieval result.",committed:fact.packageDisposition==="lost",actors:[kakashi("IN PURSUIT",true),amt("PURSUED"),smuggler("RETAINS PACKAGE")],objects:[{label:"PACKAGE",state:fact.packageDisposition==="lost"?"NOT RECOVERED BY KAKASHI":"RESOLVING"}]};}
  if(beatId==="kak_get_closer_success"||beatId==="kak_get_closer_failure")return{mode:"encounter",location:"KONOHA ALLEY",objective:"Choose how Kakashi handles the exchange.",actors:[kakashi("UNDETECTED",true),amt("PACKAGE CARRIER"),smuggler("CONTACT")],objects:[{label:"PACKAGE",state:"IN PLAY"}]};
  if(beatId==="kak_get_closer_handoff_observe_escalation")return{mode:"encounter",location:"KONOHA ALLEY",objective:"Choose which problem Kakashi prioritizes.",actors:[interceptor("BLOCKING ESCAPE"),smuggler("HAS PACKAGE")],objects:[]};
  if(beatId==="kak_get_closer_failure_stay_package_chase_34120"){
   const early=performance&&Number(performance.index||0)<33;
   return{mode:"encounter",location:early?"SAKURA TREE · MAIN STREET":"KONOHA · PACKAGE PURSUIT",objective:"Recover the package.",actors:early?[kakashi("PURSUING",true),amt("HAS PACKAGE"),smuggler("LEFT BEHIND")]:[kakashi("PURSUING",true),amt("HAS PACKAGE")],objects:[]};
  }
  if(beatId==="kak_get_closer_failure_stay_package_failed_34120")return{mode:"consequence",location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:[kakashi("TARGET LOST",true)],objects:[{label:"PACKAGE",state:"ESCAPED WITH ANBU MARKED TARGET"}]};
  if(beatId==="kak_get_closer_failure_stay_package_intercept")return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Recover the package.",actors:[kakashi("INTERCEPTING",true),amt("HAS PACKAGE"),pakkun("BLOCKING EXIT")],objects:[]};
  if(beatId==="kak_intercept_ask_destination_return_35300")return{mode:"conversation",location:"KONOHA ALLEY · NIGHT",objective:"Recover the package.",actors:[kakashi("QUESTIONING",true),amt("HAS PACKAGE"),pakkun("BLOCKING EXIT")],objects:[]};
  if(beatId==="kak_intercept_demand_battle_35300")return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Recover the package.",actors:[kakashi("DEMANDING PACKAGE",true),amt("REFUSING"),pakkun("TEMPORARY ALLY")],objects:[]};
  if(beatId==="kak_intercept_demand_return_35300"){
   const won=context&&context.kakashiInterceptDemandPostBattleOutcome==="player_side_victory";
   return{mode:"consequence",location:"KONOHA ALLEY · NIGHT",objective:won?"Decide what happens to the original target.":"Return to ANBU.",actors:won?[kakashi("PACKAGE SECURED",true),amt("DEFEATED"),pakkun("PRESENT")]:[kakashi("DEFEATED",true),amt("ESCAPING WITH PACKAGE"),pakkun("PRESENT")],objects:[]};
  }
  if(beatId==="kak_intercept_take_him_down_setup_35300"||beatId==="kak_intercept_take_him_down_battle_35300")return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Recover the package.",actors:[kakashi("ATTACKING",true),amt("CONTESTING"),pakkun("SECURING OBJECTIVE")],objects:[{label:"PACKAGE",state:"EXPOSED · KONOHA-SIDE CONTROL"}]};
  if(beatId==="kak_intercept_take_him_down_return_35300"){
   const won=context&&context.kakashiInterceptTakePostBattleOutcome==="player_side_victory";
   return{mode:"consequence",location:"KONOHA ALLEY · NIGHT",objective:won?"Decide what happens to the original target.":"Return to ANBU.",actors:won?[kakashi("PACKAGE SECURED",true),amt("DEFEATED"),pakkun("PRESENT")]:[kakashi("DEFEATED",true),pakkun("PACKAGE SECURED")],objects:[{label:"PACKAGE",state:"SECURED"}]};
  }
  if(beatId==="kak_intercept_disposition_pending_35300")return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Decide what happens to the original target.",actors:[kakashi("PACKAGE SECURED",true),amt("DEFEATED · CONTROLLED"),pakkun("PRESENT")],objects:[]};
  if(beatId==="kak_intercept_disposition_police_escort_35300")return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Take the original target to the Uchiha Police Force.",actors:[kakashi("ESCORTING",true),amt("RESTRAINED"),pakkun("PRESENT")],objects:[{label:"PACKAGE",state:"HELD BY KAKASHI"}]};
  if(beatId==="kak_intercept_disposition_police_handoff_35300")return{mode:"conversation",location:"UCHIHA POLICE FORCE · NIGHT",objective:"Transfer the original target to the Uchiha Police Force.",actors:[kakashi("REPORTING",true),amt("RESTRAINED"),pakkun("PRESENT")],objects:[{label:"PACKAGE",state:"HELD BY KAKASHI"}]};
  if(beatId==="kak_intercept_disposition_police_anbu_return_35300")return{mode:"conversation",location:"KONOHA ROOFTOP · NIGHT",objective:"Return the package to ANBU.",actors:[anbu("RECEIVING PACKAGE",true),kakashi("REPORTING")],objects:[{label:"PACKAGE",state:"RETURNING TO ANBU"}]};
  if(beatId==="kak_intercept_disposition_release_35300"){
   const released=context&&context.__kakashiInterceptionCueEffects35300&&context.__kakashiInterceptionCueEffects35300.release===true;
   return{mode:"consequence",location:"KONOHA ALLEY · NIGHT",objective:"Return to ANBU.",actors:released?[kakashi("PACKAGE SECURED",true),amt("RELEASED"),pakkun("PRESENT")]:[kakashi("PACKAGE SECURED",true),amt("CONTROLLED"),pakkun("PRESENT")],objects:[]};
  }
  if(beatId==="kak_intercept_disposition_kill_35300")return{mode:"consequence",location:"KONOHA ALLEY · NIGHT",objective:"Resolve the original target.",actors:[kakashi("FINAL DECISION",true),amt("DEFEATED"),pakkun("PRESENT")],objects:[{label:"PACKAGE",state:"SECURED"}]};
  if(beatId==="kak_intercept_disposition_anbu_escort_35300")return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Return to ANBU with the original target.",actors:[kakashi("ESCORTING",true),amt("RESTRAINED"),pakkun("PRESENT")],objects:[{label:"PACKAGE",state:"HELD BY KAKASHI"}]};
  if(beatId==="kak_intercept_disposition_anbu_handoff_35300")return{mode:"conversation",location:"KONOHA ROOFTOP · NIGHT",objective:"Transfer the original target to ANBU.",actors:[anbu("RECEIVING CUSTODY",true),kakashi("REPORTING"),amt("RESTRAINED"),pakkun("PRESENT")],objects:[{label:"PACKAGE",state:"RETURNING TO ANBU"}]};
  if(beatId==="kak_move_closer_success_strike_prelude_35930")return{mode:"encounter",location:"SAKURA TREE · MAIN STREET",objective:"Stop the handoff.",actors:[kakashi("HIDDEN POSITION",true),amt("PACKAGE CARRIER"),smuggler("WAITING")],objects:[{label:"PACKAGE",state:"HANDOFF WINDOW"}]};
  if(beatId==="kak_move_closer_failure_ps_anbu_handoff_35930")return{mode:"conversation",location:"KONOHA ROOFTOP · NIGHT",objective:"Transfer Package Smuggler to ANBU.",actors:[anbu("RECEIVING CUSTODY",true),kakashi("REPORTING"),smuggler("RESTRAINED")],objects:[]};
  if(beatId==="kak_move_closer_failure_ps_police_handoff_35930")return{mode:"conversation",location:"UCHIHA POLICE FORCE · NIGHT",objective:"Transfer Package Smuggler to the Uchiha Police Force.",actors:[kakashi("REPORTING",true),smuggler("RESTRAINED")],objects:[]};
  if(beatId==="kak_move_closer_two_target_anbu_handoff_35930"){const pa=context&&context.kakashiMoveCloserFailurePakkunPresent===true?[pakkun("PRESENT")]:[];return{mode:"conversation",location:"KONOHA ROOFTOP · NIGHT",objective:"Transfer both captives to ANBU.",actors:[anbu("RECEIVING CUSTODY",true),kakashi("REPORTING"),amt("RESTRAINED"),smuggler("RESTRAINED"),...pa],objects:[{label:"PACKAGE",state:"HELD BY KAKASHI"}]};}
  if(beatId==="kak_move_closer_two_target_police_handoff_35930"){const pa=context&&context.kakashiMoveCloserFailurePakkunPresent===true?[pakkun("PRESENT")]:[];return{mode:"conversation",location:"UCHIHA POLICE FORCE · NIGHT",objective:"Transfer both captives to the Uchiha Police Force.",actors:[kakashi("REPORTING",true),amt("RESTRAINED"),smuggler("RESTRAINED"),...pa],objects:[{label:"PACKAGE",state:"HELD BY KAKASHI"}]};}
  if(String(beatId||"").startsWith("kak_move_closer_two_target_")){const pa=context&&context.kakashiMoveCloserFailurePakkunPresent===true?[pakkun("PRESENT")]:[];return{mode:"encounter",location:"SAKURA TREE · MAIN STREET",objective:"Resolve the two-target disposition.",actors:[kakashi("ACTIVE",true),amt("DEFEATED"),smuggler("DEFEATED"),...pa],objects:[{label:"PACKAGE",state:"SECURED BY KAKASHI"}]};}
  if(String(beatId||"").startsWith("kak_move_closer_improved_pickpocket_"))return{mode:"encounter",location:"SAKURA TREE · MAIN STREET",objective:"Retrieve the package.",actors:[kakashi("ACTIVE",true),amt("PACKAGE CARRIER"),smuggler("PRESENT")],objects:[{label:"PACKAGE",state:"CONTESTED"}]};
  if(String(beatId||"").startsWith("kak_move_closer_failure_ps_"))return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Resolve the Package Smuggler confrontation.",actors:[kakashi("ACTIVE",true),smuggler("PRESENT")],objects:[]};
  if(String(beatId||"").startsWith("kak_move_closer_failure_cutoff_"))return{mode:"encounter",location:"SAKURA TREE · MAIN STREET",objective:"Cut off the escape.",actors:[kakashi("ACTIVE",true),amt("PRESENT"),smuggler("PRESENT"),...(context&&context.kakashiMoveCloserFailurePakkunPresent===true?[pakkun("PRESENT")]:[])],objects:[{label:"PACKAGE",state:"IN PLAY"}]};
  if(beatId==="kak_konoha_direct_strike_police_handoff_35910")return{mode:"conversation",location:"UCHIHA POLICE FORCE · NIGHT",objective:"Transfer all three captives to the Uchiha Police Force.",actors:[kakashi("REPORTING",true),amt("RESTRAINED"),smuggler("RESTRAINED"),interceptor("RESTRAINED")],objects:[{label:"PACKAGE",state:"HELD BY KAKASHI"}]};
  if(beatId==="kak_konoha_direct_strike_anbu_handoff_35910")return{mode:"conversation",location:"KONOHA ROOFTOP · NIGHT",objective:"Transfer all three captives to ANBU.",actors:[anbu("RECEIVING CUSTODY",true),kakashi("REPORTING"),amt("RESTRAINED"),smuggler("RESTRAINED"),interceptor("RESTRAINED")],objects:[{label:"PACKAGE",state:"HELD BY KAKASHI"}]};
  if(beatId==="kak_konoha_direct_strike_group_disposition_35910"||beatId==="kak_konoha_direct_strike_kill_all_35910"||beatId==="kak_konoha_direct_strike_release_all_35910"||beatId==="kak_konoha_direct_strike_police_escort_35910"||beatId==="kak_konoha_direct_strike_anbu_escort_35910")return{mode:"encounter",location:"SAKURA TREE · MAIN STREET",objective:"Resolve what happens to the three defeated shinobi.",actors:[kakashi("ACTIVE",true),amt("DEFEATED"),smuggler("DEFEATED"),interceptor("DEFEATED")],objects:[{label:"PACKAGE",state:"SECURED BY KAKASHI"}]};
  if(String(beatId||"").startsWith("kak_konoha_direct_strike_")){const mi=String(beatId).includes("_mi_");return{mode:"encounter",location:"SAKURA TREE · MAIN STREET",objective:"Resolve the confrontation.",actors:mi?[kakashi("ACTIVE",true),interceptor("PRESENT"),amt("DEFEATED"),smuggler("DEFEATED")]:[kakashi("ACTIVE",true),amt("PRESENT"),smuggler("PRESENT")],objects:[{label:"PACKAGE",state:"CONTESTED"}]};}
  if(String(beatId||"").startsWith("kak_konoha_secure_before_"))return{mode:"encounter",location:"SAKURA TREE · MAIN STREET",objective:"Retrieve the package.",actors:[kakashi("ACTIVE",true),smuggler("PRESENT"),interceptor("PRESENT")],objects:[{label:"PACKAGE",state:"CONTESTED"}]};
  if(beatId==="kak_konoha_original_target_failure_35910")return{mode:"consequence",location:"KONOHA · NIGHT",objective:"Return to ANBU.",actors:[kakashi("TARGET LOST",true)],objects:[{label:"PACKAGE",state:"STILL WITH PACKAGE SMUGGLER"}]};
  if(beatId==="kak_konoha_original_target_anbu_handoff_35910")return{mode:"conversation",location:"KONOHA ROOFTOP · NIGHT",objective:"Transfer ANBU Marked Target to ANBU.",actors:[anbu("RECEIVING CUSTODY",true),kakashi("REPORTING"),amt("RESTRAINED"),pakkun("PRESENT")],objects:[{label:"PACKAGE",state:"MISSING"}]};
  if(beatId==="kak_konoha_original_target_police_handoff_35910")return{mode:"conversation",location:"UCHIHA POLICE FORCE · NIGHT",objective:"Transfer ANBU Marked Target to the Uchiha Police Force.",actors:[kakashi("REPORTING",true),amt("RESTRAINED"),pakkun("PRESENT")],objects:[{label:"PACKAGE",state:"MISSING"}]};
  if(beatId==="kak_konoha_original_target_disposition_35910"||beatId==="kak_konoha_original_target_kill_35910"||beatId==="kak_konoha_original_target_restrain_35910"||beatId==="kak_konoha_original_target_anbu_escort_35910"||beatId==="kak_konoha_original_target_police_escort_35910")return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Resolve ANBU Marked Target's disposition.",actors:[kakashi("ACTIVE",true),amt("DEFEATED"),pakkun("PRESENT")],objects:[{label:"PACKAGE",state:"MISSING"}]};
  if(beatId==="kak_move_closer_success_handoff_performance_35910")return{mode:"encounter",location:"SAKURA TREE · MAIN STREET",objective:"Watch the handoff from the closer position.",actors:[kakashi("HIDDEN",true),amt("PACKAGE CARRIER"),smuggler("RECEIVING CONTACT")],objects:[{label:"PACKAGE",state:"HANDOFF IN PROGRESS"}]};
  if(String(beatId||"").startsWith("kak_konoha_original_target_"))return{mode:"encounter",location:"KONOHA ALLEY · NIGHT",objective:"Catch the original target.",actors:[kakashi("ACTIVE",true),amt("PRESENT"),...(String(beatId).includes("_pakkun_")||String(beatId).includes("_amt_")?[pakkun("PRESENT")]:[])],objects:[]};
  if(beatId==="kak_konoha_collect_ps_35920")return{mode:"encounter",location:"KONOHA STREET · NIGHT",objective:"Collect the field-secured captives.",actors:[kakashi("ESCORTING",true),amt("RESTRAINED"),smuggler("FIELD-SECURED"),pakkun("PRESENT")],objects:[]};
  if(beatId==="kak_konoha_collect_mi_35920")return{mode:"encounter",location:"SAKURA TREE · NIGHT",objective:"Collect the field-secured captives.",actors:[kakashi("ESCORTING",true),...escortActors33910(),interceptor("FIELD-SECURED"),pakkun("PRESENT")],objects:[]};
  if(beatId==="kak_konoha_collection_disposition_35920")return{mode:"encounter",location:"SAKURA TREE · NIGHT",objective:"Choose where to transfer the collected captives.",actors:[kakashi("ESCORTING",true),...escortActors33910(),pakkun("PRESENT")],objects:[]};
  if(beatId==="kak_konoha_group_anbu_journey_35920")return{mode:"encounter",location:"KONOHA · NIGHT",objective:"Take them all back to ANBU.",actors:[kakashi("ESCORTING",true),...escortActors33910(),pakkun("PRESENT")],objects:[]};
  if(beatId==="kak_konoha_group_anbu_handoff_35920")return{mode:"conversation",location:"KONOHA ROOFTOP · NIGHT",objective:"Transfer the captives to ANBU.",actors:[anbu("RECEIVING CUSTODY",true),kakashi("REPORTING"),...escortActors33910(),pakkun("PRESENT")],objects:[]};
  if(beatId==="kak_konoha_group_police_handoff_35920")return{mode:"conversation",location:"UCHIHA POLICE FORCE · NIGHT",objective:"Transfer the captives to the Uchiha Police Force.",actors:[kakashi("REPORTING",true),...escortActors33910(),pakkun("PRESENT")],objects:[]};
  if(["kak_seq_debrief_pending","kak_terminal_debrief_report_35100","kak_terminal_debrief_summary_35100","kak_terminal_pakkun_departure_1_35100","kak_terminal_pakkun_departure_2_35100","kak_terminal_pakkun_departure_3_35100","kak_terminal_pakkun_departure_exit_35100"].includes(beatId))return terminalReportProjection33910(beatId,context);
  if(["kak_terminal_minato_private_evaluation_35100","kak_terminal_chronicle_receipt_35100"].includes(beatId))return terminalHokageProjection33910();
  return null;
}

try{
  const definition=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(scene):null;
  const root=definition&&definition.beatMap instanceof Map?definition.beatMap.get("kak_original_rooftop"):null;
  if(root)root.nextBeatId="kak_original_tail";
}catch(_error){}
registerStorySceneBoardDefinition(scene,{benchmark:true,resolve:kakashiBoardResolver,performanceSequences:{kak_original_rooftop:rooftopPerformance,kak_original_tail:tailPerformance,kak_original_transfer:({context})=>context.kakashiOriginalAction==="observe"?observeTransferPerformance:null,kak_terminal_minato_private_evaluation_35100:()=>terminalMinatoPerformance33910()},performanceTransitions:{}});

function currentRuntime(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function currentBeat(runtime=currentRuntime()){try{const d=runtime&&typeof getStorySceneDefinition==="function"?getStorySceneDefinition(runtime.sceneId):null;return d&&d.beatMap instanceof Map?d.beatMap.get(runtime.beatId)||null:null;}catch(_error){return null;}}
function currentProjection(){try{return typeof getActiveStorySceneBoardProjection==="function"?getActiveStorySceneBoardProjection():null;}catch(_error){return null;}}
function environmentId(beat){const ref=beat&&beat.environmentRef;return typeof ref==="string"?ref:ref&&typeof ref==="object"&&ref.assetId?String(ref.assetId):null;}
function beatById(runtime,beatId){try{const d=runtime&&typeof getStorySceneDefinition==="function"?getStorySceneDefinition(runtime.sceneId):null;return d&&d.beatMap instanceof Map?d.beatMap.get(beatId)||null:null;}catch(_error){return null;}}
function setTransferEnvironment(choiceId){try{const d=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(scene):null;const beat=d&&d.beatMap instanceof Map?d.beatMap.get("kak_original_transfer"):null;if(beat)beat.environmentRef={assetId:choiceId==="get_closer"?END_ALLEY_ID:SAKURA_ID};}catch(_error){}}
function nextBeatFor(runtime,beat,choiceId){
  if(!runtime||!beat)return null;
  if(choiceId!==null&&choiceId!==undefined&&Array.isArray(beat.choices)){const row=beat.choices.find(choice=>String(choice&&choice.choiceId||"")===String(choiceId));return row&&row.nextBeatId?String(row.nextBeatId):null;}
  const performance=typeof getStoryScenePerformance33900==="function"?getStoryScenePerformance33900():null;if(performance&&!performance.atEnd)return null;return beat.nextBeatId?String(beat.nextBeatId):null;
}
function escapeText(value){return String(value??"");}
function speakerActorId(name){const key=String(name||"").trim().toUpperCase();if(key==="KAKASHI"||key==="KAKASHI HATAKE")return"academy_kakashi";if(key==="ANBU OPERATIVE")return"konoha_anbu_contact";if(key==="ANBU MARKED TARGET")return"anbu_marked_target";if(key==="PACKAGE SMUGGLER")return"package_smuggler";if(key==="MASKED INTERCEPTOR")return"masked_interceptor";if(key==="MINATO"||key==="MINATO NAMIKAZE")return"hokage_minato";if(key==="PAKKUN")return"pakkun";return null;}
function cueSpeaker33910(cue){return String(cue&&(cue.speakerName||cue.speaker)||"");}
function actorSideForSpeaker(name,projection=currentProjection()){const id=speakerActorId(name),actors=projection&&Array.isArray(projection.actors)?projection.actors:[];const index=id?actors.findIndex(row=>row&&row.id===id):-1;return index<=0?"left":"right";}
function previousDialogue(performance){if(!performance||!Array.isArray(performance.sequence))return null;const current=performance.cue||{},currentSpeaker=cueSpeaker33910(current);for(let i=performance.index-1;i>=0;i--){const cue=performance.sequence[i];if(!cue)continue;if(cue.kind!=="dialogue")break;const priorSpeaker=cueSpeaker33910(cue);if(priorSpeaker&&priorSpeaker!==currentSpeaker)return cue;}return null;}
function makeAdvanceButton(){const button=document.createElement("button");button.type="button";button.className="sc-performance-next-33910";button.setAttribute("aria-label","Advance scene");button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();if(typeof globalThis.advanceStoryScene==="function")globalThis.advanceStoryScene();});return button;}
function makeDialoguePanel(cue,isCurrent,projection){const speakerName=cueSpeaker33910(cue)||"DIALOGUE",speakerId=speakerActorId(speakerName)||"unknown",panel=document.createElement("section"),side=actorSideForSpeaker(speakerName,projection);panel.className=`sc-dialogue-panel-33910 is-${side} ${isCurrent?"is-current":"is-previous"}`;panel.dataset.speakerId=speakerId;const speaker=document.createElement("div");speaker.className="sc-dialogue-speaker-33910";speaker.textContent=escapeText(speakerName);const copy=document.createElement("div");copy.className="sc-dialogue-copy-33910";copy.textContent=escapeText(cue&&cue.text||"");const status=document.createElement("div");status.className="sc-dialogue-status-33910";status.textContent=isCurrent?"SPEAKING":"PREVIOUS";panel.append(speaker,copy,status);if(isCurrent)panel.appendChild(makeAdvanceButton());return panel;}
function makeNarrationPanel(cue){const panel=document.createElement("section");panel.className="sc-narration-panel-33910";const kicker=document.createElement("div");kicker.className="sc-narration-kicker-33910";kicker.textContent=`${String(cue&&cue.kind||"narration").toUpperCase()} · ACADEMY KAKASHI`;const copy=document.createElement("div");copy.className="sc-narration-copy-33910";copy.textContent=escapeText(cue&&cue.text||"");panel.append(kicker,copy,makeAdvanceButton());return panel;}
function isDialogueCue33910(cue){return!!cue&&String(cue.kind||"").trim().toLowerCase()==="dialogue";}
function renderPerformanceSurface(layer,stage,performance,projection){let surface=stage.querySelector(`.${OVERLAY_CLASS}`);const cue=performance&&performance.cue||null,signature=JSON.stringify({beat:currentRuntime()&&currentRuntime().beatId,index:performance&&performance.index,cue:cue&&cue.cueId,kind:cue&&cue.kind});if(surface&&surface.dataset.signature===signature)return;if(surface)surface.remove();surface=document.createElement("div");surface.className=OVERLAY_CLASS;surface.dataset.signature=signature;if(isDialogueCue33910(cue)){const prev=previousDialogue(performance);if(prev)surface.appendChild(makeDialoguePanel(prev,false,projection));surface.appendChild(makeDialoguePanel(cue,true,projection));}else surface.appendChild(makeNarrationPanel(cue||{}));stage.appendChild(surface);}
function clearPerformanceSurface(stage){for(const node of stage&&stage.querySelectorAll?stage.querySelectorAll(`.${OVERLAY_CLASS}`):[])node.remove();}
function intentMeta(choice){const text=`${String(choice&&choice.choiceId||"").toLowerCase()} ${String(choice&&choice.label||"").toLowerCase()}`;if(text.includes("observe")||text.includes("watch"))return{intent:"OBSERVE",glyph:"◎"};if(text.includes("attack")||text.includes("fight")||text.includes("strike")||text.includes("defeat")||text.includes("take him down"))return{intent:"COMBAT",glyph:"✦"};if(text.includes("package")||text.includes("secure")||text.includes("pickpocket")||text.includes("demand"))return{intent:"OBJECTIVE",glyph:"◇"};if(text.includes("closer")||text.includes("pursue")||text.includes("chase")||text.includes("stay"))return{intent:"POSITION",glyph:"↗"};if(text.includes("ask")||text.includes("where"))return{intent:"INTEL",glyph:"?"};return{intent:"TACTICAL",glyph:"›"};}
function decorateChoiceDeck(layer,beat){const buttons=Array.from(layer.querySelectorAll(".sc-story-choice")),choices=beat&&Array.isArray(beat.choices)?beat.choices:[];buttons.forEach((button,index)=>{const choice=choices[index]||{},signature=`${choice.choiceId||index}:${choice.label||button.textContent||""}:${button.disabled}`;if(button.dataset.scTacticalSignature===signature)return;button.dataset.scTacticalSignature=signature;const meta=intentMeta(choice),label=String(choice.label||button.textContent||"Choice").trim();button.textContent="";const inner=document.createElement("span");inner.className="sc-tactical-choice-33910";const glyph=document.createElement("span");glyph.className="sc-tactical-glyph-33910";glyph.textContent=meta.glyph;const copy=document.createElement("span");copy.className="sc-tactical-copy-33910";const intent=document.createElement("span");intent.className="sc-tactical-intent-33910";intent.textContent=meta.intent;const title=document.createElement("span");title.className="sc-tactical-title-33910";title.textContent=label;copy.append(intent,title);inner.append(glyph,copy);button.appendChild(inner);const arrow=document.createElement("span");arrow.className="sc-tactical-arrow-33910";arrow.textContent=button.disabled?"·":"›";button.appendChild(arrow);if(button.disabled){const locked=document.createElement("span");locked.className="sc-tactical-locked-33910";locked.textContent="UNAVAILABLE";button.appendChild(locked);}button.setAttribute("aria-label",label);});}

let syncScheduled=false;
function scheduleSync(){if(syncScheduled)return;syncScheduled=true;const run=()=>{syncScheduled=false;syncPresentation();};if(typeof requestAnimationFrame==="function")requestAnimationFrame(run);else setTimeout(run,0);}
function syncPresentation(){if(typeof document==="undefined")return false;const layer=document.getElementById("story-scene-presentation-layer");if(!layer)return false;const runtime=currentRuntime();if(!runtime||runtime.sceneId!==scene){delete layer.dataset.scBoardUiMode;return false;}const stage=layer.querySelector(".sc-chronicle-stage")||layer.querySelector(".sc-story-stage")||layer;const beat=currentBeat(runtime),performance=typeof getStoryScenePerformance33900==="function"?getStoryScenePerformance33900():null,projection=currentProjection();let mode="narration";if(performance&&performance.cue)mode=isDialogueCue33910(performance.cue)?"dialogue":"performance_narration";else if(beat&&beat.mode==="choice")mode="decision";layer.dataset.scBoardUiMode=mode;if(mode==="dialogue"||mode==="performance_narration")renderPerformanceSurface(layer,stage,performance,projection);else clearPerformanceSurface(stage);if(mode==="decision")decorateChoiceDeck(layer,beat);return true;}

let transitionBusy=false;
function finishTransition(node){try{node&&node.remove&&node.remove();}catch(_error){}transitionBusy=false;scheduleSync();}
function reducedMotion(){try{return typeof matchMedia==="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(_error){return false;}}
function performSmoothWipe(next){if(typeof next!=="function")return{success:false,reason:"kakashi_wipe_continuation_missing"};if(typeof document==="undefined"||!document.body||reducedMotion())return next();if(transitionBusy)return{success:false,reason:"kakashi_scene_transition_in_progress"};transitionBusy=true;const wipe=document.createElement("div");wipe.className="sc-kakashi-wipe-33910";document.body.appendChild(wipe);let covered=false,revealing=false;const reveal=()=>{if(revealing)return;revealing=true;requestAnimationFrame(()=>requestAnimationFrame(()=>{wipe.classList.remove("is-covering");wipe.classList.add("is-revealing");setTimeout(()=>finishTransition(wipe),700);}));};const mutateCovered=()=>{if(covered)return;covered=true;try{next();}finally{setTimeout(reveal,110);}};wipe.addEventListener("transitionend",event=>{if(event.propertyName==="transform")mutateCovered();},{once:true});requestAnimationFrame(()=>requestAnimationFrame(()=>wipe.classList.add("is-covering")));setTimeout(mutateCovered,700);return{success:true,type:"kakashi_scene_smooth_wipe_v3",pending:true};}
globalThis.performKakashiSceneWipe33910=performSmoothWipe;
const PRE_ADVANCE_33910=typeof globalThis.advanceStoryScene==="function"?globalThis.advanceStoryScene:null;
if(PRE_ADVANCE_33910){function advanceStoryScene33910(choiceId=null){const runtime=currentRuntime(),beat=currentBeat(runtime);if(!runtime||runtime.sceneId!==scene||!beat||transitionBusy)return transitionBusy?{success:false,reason:"kakashi_scene_transition_in_progress"}:PRE_ADVANCE_33910.apply(this,arguments);if(beat.beatId==="kak_original_action"&&choiceId!==null&&choiceId!==undefined)setTransferEnvironment(String(choiceId));const nextId=nextBeatFor(runtime,beat,choiceId),nextBeat=nextId?beatById(runtime,nextId):null,backdropChanges=!!nextBeat&&environmentId(beat)!==environmentId(nextBeat),semanticChoice=choiceId!==null&&choiceId!==undefined,sceneChanges=!!nextId&&nextId!==beat.beatId,args=arguments,self=this;if(semanticChoice||sceneChanges||backdropChanges)return performSmoothWipe(()=>PRE_ADVANCE_33910.apply(self,args));const result=PRE_ADVANCE_33910.apply(this,arguments);scheduleSync();return result;}globalThis.advanceStoryScene=advanceStoryScene33910;try{advanceStoryScene=advanceStoryScene33910;}catch(_error){}}
function createEntryCurtain(){if(typeof document==="undefined"||!document.body)return null;const prior=document.querySelector(".sc-kakashi-entry-curtain-33910");if(prior)return prior;const curtain=document.createElement("div");curtain.className="sc-kakashi-entry-curtain-33910";document.body.appendChild(curtain);return curtain;}
function revealEntryCurtain(curtain){if(!curtain)return;requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{curtain.classList.add("is-revealing");setTimeout(()=>{try{curtain.remove();}catch(_error){}},420);},70)));}
const PRE_RENDER_33910=typeof globalThis.renderStoryScenePresentationLayer==="function"?globalThis.renderStoryScenePresentationLayer:null;let lastRenderedSceneId=currentRuntime()&&currentRuntime().sceneId||null;
if(PRE_RENDER_33910){function renderStoryScenePresentationLayer33910(){const before=currentRuntime(),entering=!!before&&before.sceneId===scene&&lastRenderedSceneId!==scene,curtain=entering?createEntryCurtain():null,result=PRE_RENDER_33910.apply(this,arguments),after=currentRuntime();lastRenderedSceneId=after&&after.sceneId||null;scheduleSync();if(curtain)revealEntryCurtain(curtain);return result;}globalThis.renderStoryScenePresentationLayer=renderStoryScenePresentationLayer33910;try{renderStoryScenePresentationLayer=renderStoryScenePresentationLayer33910;}catch(_error){}}
// Gen87: no presentation-layer MutationObserver here. The Story render/advance
// wrappers below/above already schedule the single synchronization pass. Keeping
// a second DOM observer made presentation ownership asynchronous and could
// re-enter terminal rendering while a black wipe was still covering the screen.

function runKakashiSceneBoardPolish33910Diagnostics(){
  const scene01Texts=rooftopPerformance.map(row=>row.text);
  const scene01Expected=["Kakashi stands alone on a Konoha rooftop, the village lights spread out below him. A masked ANBU operative lands behind him without warning.","Kakashi Hatake.","Kakashi turns to face him.","You have orders. Stop this package from falling into the wrong hands.","The operative holds out a sealed envelope.","Kakashi crosses the rooftop and takes it.","Why are you coming to me with this?","Hokage's orders.","Kakashi looks down at the seal.","He breaks it. A target photograph waits inside."];
  const scene02Texts=tailPerformance.map(row=>row.text);
  const scene02Expected=["Kakashi did not need long to find the man from the envelope.","The difficult part was making sure the man never realised he had been found.","Konoha changed shape when Kakashi followed someone through it. Streets stopped being streets and became sightlines. Crowds became cover. Roof edges became distances to clear before the person below could turn his head.","ANBU Marked Target moved without the nervous scanning of someone who expected immediate pursuit.","Kakashi kept it that way.","He followed from above until the route tightened into older streets and narrower angles, then dropped lower when the rooftops would have made him too obvious.","The target never looked directly at him.","Not once.","That did not make Kakashi relax.","It made him wonder who the man expected to meet.","By the time the route bent toward the Sakura tree and the alley beyond it, Kakashi had his answer.","Someone was waiting."];
  let tailBeat=null;try{const d=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(scene):null;tailBeat=d&&d.beatMap instanceof Map?d.beatMap.get("kak_original_tail")||null:null;}catch(_error){}
  const checks={patchId:PATCH_ID==="kakashi_scene_board_model_v13_33910_2026_09_21",singleExplicitPresentationOwner:performSmoothWipe.toString().includes("try{next();}finally")&&!performSmoothWipe.toString().includes("renderStorySceneBoard33900")&&!performSmoothWipe.toString().includes("syncPresentation"),multiActorKakashiLayouts:installStyle.toString().includes('data-count="6"')&&PAKKUN_IMAGE==="Assets/Summons/pakkun.png"&&kakashiBoardResolver({beatId:"kak_konoha_group_anbu_handoff_35920",context:{},performance:null}).actors.length>=3,terminalReportStagesAnbu:(()=>{const q=kakashiBoardResolver({beatId:"kak_seq_debrief_pending",context:{},performance:null});return q&&q.location==="KONOHA ROOFTOP · NIGHT"&&q.actors.some(row=>row.id==="konoha_anbu_contact")&&q.actors.some(row=>row.id==="academy_kakashi");})(),terminalHokageSceneStaged:(()=>{const q=kakashiBoardResolver({beatId:"kak_terminal_minato_private_evaluation_35100",context:{},performance:null});return q&&q.location==="HOKAGE ADMINISTRATION · NIGHT"&&q.actors.some(row=>row.id==="hokage_minato")&&q.actors.some(row=>row.id==="konoha_anbu_contact")&&MINATO_IMAGE==="Assets/Kage/kage_minato.png"&&HOKAGE_INTERIOR_PATH==="Kakashi Origin Backdrop/hokage_administration_interior_night.png";})(),
    terminalMinatoPerformanceBridge:terminalMinatoPerformance33910.toString().includes("SC_ALPHA_KAKASHI_DYNAMIC_TERMINAL_35940")&&speakerActorId("MINATO")==="hokage_minato",
    expandedWatchExchangeProjection:(()=>{const seq=Array.from({length:18},(_,index)=>({cueId:"qa_"+index,kind:"narration",text:"qa",focusActorRef:index===12?"masked_interceptor":"academy_kakashi"}));const q11=transferProjection({sequence:seq,index:11,cue:seq[11]},{kakashiOriginalAction:"observe"}),q12=transferProjection({sequence:seq,index:12,cue:seq[12]},{kakashiOriginalAction:"observe"}),q13=transferProjection({sequence:seq,index:13,cue:seq[13]},{kakashiOriginalAction:"observe"}),q16=transferProjection({sequence:seq,index:16,cue:seq[16]},{kakashiOriginalAction:"observe"});const ids=row=>row.actors.map(actor=>actor.id).join("|");return q11.actors.length===2&&ids(q11)==="anbu_marked_target|package_smuggler"&&!q11.actors.some(row=>row.id==="academy_kakashi")&&q12.actors.length===3&&ids(q12)==="anbu_marked_target|masked_interceptor|package_smuggler"&&q12.actors.some(row=>row.id==="anbu_marked_target"&&row.state==="BREAKING AWAY")&&q12.actors.some(row=>row.id==="masked_interceptor"&&row.entering===true)&&q13.actors.length===2&&ids(q13)==="masked_interceptor|package_smuggler"&&!q13.actors.some(row=>row.id==="anbu_marked_target"||row.id==="academy_kakashi")&&q16.actors.some(row=>row.id==="package_smuggler"&&row.state==="HAS PACKAGE · ESCAPE BLOCKED")&&q16.objects.length===0;})(),holderStateUsesParticipantStrip:(()=>{const seq=Array.from({length:18},(_,index)=>({cueId:"qa_"+index,kind:"narration",text:"qa",focusActorRef:"package_smuggler"}));const q=transferProjection({sequence:seq,index:8,cue:seq[8]},{kakashiOriginalAction:"observe"}),major=kakashiBoardResolver({beatId:"kak_original_major_choice",context:{},performance:null});return q.actors.some(row=>row.id==="package_smuggler"&&row.state==="HAS PACKAGE")&&q.objects.length===0&&major.actors.some(row=>row.id==="package_smuggler"&&row.state==="HAS PACKAGE")&&major.actors.some(row=>row.id==="masked_interceptor"&&row.state==="BLOCKING ESCAPE")&&!major.actors.some(row=>row.id==="anbu_marked_target"||row.id==="academy_kakashi")&&major.objects.length===0;})(),scene01AuthorityPinned:SCENE_01_AUTHORITY==="d11aa0f4f8e1ee203d3b63cee9a1b0d2fa88ea91",scene01TenCues:rooftopPerformance.length===10,scene01Verbatim:JSON.stringify(scene01Texts)===JSON.stringify(scene01Expected),scene01OnlyFourSpoken:rooftopPerformance.filter(row=>row.kind==="dialogue").map(row=>`${row.speakerName}:${row.text}`).join("|")==="ANBU OPERATIVE:Kakashi Hatake.|ANBU OPERATIVE:You have orders. Stop this package from falling into the wrong hands.|KAKASHI:Why are you coming to me with this?|ANBU OPERATIVE:Hokage's orders.",prohibitedStaleRooftopCopyAbsent:!["What do you want?","Why bring this to me?","The Hokage approved you to assist us."].some(text=>scene01Texts.includes(text)),narrationNotPromotedToDialogue:rooftopPerformance.filter(row=>row.kind==="dialogue").every(row=>!!row.speakerName),previousDialogueStopsAtNarrationBoundary:previousDialogue.toString().includes('cue.kind!=="dialogue"'),scene02AuthorityPinned:SCENE_02_AUTHORITY==="6e87a8c3364e22e696e0a9c120c51bc0c57e9881",scene02TwelveCues:tailPerformance.length===12,scene02Verbatim:JSON.stringify(scene02Texts)===JSON.stringify(scene02Expected),scene02NarrationOnly:tailPerformance.every(row=>row.kind==="narration"&&!row.speakerName),scene02NoChoices:!!tailBeat&&tailBeat.mode==="narration"&&(!Array.isArray(tailBeat.choices)||tailBeat.choices.length===0),scene02AlleyBackdrop:!!tailBeat&&environmentId(tailBeat)==="kakashi_origin_konoha_alleyway",scene02NoPrematureExchangeReveal:tailProjection({cue:tailPerformance[11],index:11}).actors.every(row=>row.id!=="package_smuggler")&&tailProjection({cue:tailPerformance[11],index:11}).objects.length===0,exactReplacementCardAssets:AMT_IMAGE==="NPC/anbu_marked_target.png"&&PS_IMAGE==="NPC/package_smuggler.png"&&MI_IMAGE==="NPC/masked_interceptor.png",browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,patchId:PATCH_ID,scene01Authority:SCENE_01_AUTHORITY,scene02Authority:SCENE_02_AUTHORITY,browserGoldenClaimed:false};
}
globalThis.runKakashiSceneBoardPolish33910Diagnostics=runKakashiSceneBoardPolish33910Diagnostics;
globalThis.SC_KAKASHI_SCENE_BOARD_POLISH_33910=Object.freeze({patchId:PATCH_ID,model:"scene_board_v9",scene01Authority:SCENE_01_AUTHORITY,scene02Authority:SCENE_02_AUTHORITY,browserGoldenClaimed:false});
try{if(typeof renderStorySceneBoard33900==="function")renderStorySceneBoard33900();syncPresentation();}catch(_error){}
})();