// ============================================================================
// KAKASHI ORIGIN GEN70 BROWSER ACCEPTANCE FINALISER — 35950
// Surgical final-load integration after the closed gen69 Story/CE owners.
// Rebinds only choices that earlier Story materialisers can replace and does not
// own factual resolution, Battle semantics, custody, package state, or rewards.
// ============================================================================
(function installAcademyKakashiBrowserAcceptance35950(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_BROWSER_ACCEPTANCE_35950)return;

const PATCH_ID="alpha_kakashi_browser_acceptance_35950_v1_2026_09_20";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const OBSERVE_BEAT="kak_original_major_choice";
const SUCCESS_BEAT="kak_get_closer_success";
const FAILURE_BEAT="kak_get_closer_failure";
const SEQ=globalThis.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410;
const ROUTE=globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910;
const MOVE=globalThis.SC_ALPHA_KAKASHI_MOVE_CLOSER_CLOSURE_35930;
if(!SEQ||!ROUTE||!MOVE)throw new Error("kakashi_browser_acceptance_35950_dependencies_missing");

function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function available(){return{available:true,knownBlocker:null};}
function choice(beatId,choiceId){
 const d=scene(),beat=d&&d.beatMap instanceof Map?d.beatMap.get(beatId):null;
 return beat&&Array.isArray(beat.choices)?beat.choices.find(row=>row&&row.choiceId===choiceId)||null:null;
}
function bindObserve(){
 const secure=SEQ.bindObserveSecurePackageChoice({release:true});
 const sequential=SEQ.bindObserveEscalationChoice();
 if(!secure||secure.success!==true||!sequential||sequential.success!==true)return{success:false,reason:"observe_shared_choice_owner_rebind_failed",secure,sequential};

 const secureBefore=choice(OBSERVE_BEAT,"secure_package_before_assassin");
 const original=choice(OBSERVE_BEAT,"go_after_original_target");
 if(!secureBefore||!original)return{success:false,reason:"observe_gen69_choice_missing"};
 secureBefore.label="SECURE THE PACKAGE BEFORE THE ASSASSIN";
 secureBefore.nextBeatId=ROUTE.beats.secureBeforeIntro;
 secureBefore.availability=available;
 secureBefore.knownBlocker=null;
 secureBefore.consequenceRequests=[{requestId:"kakashi_secure_before_resolve_35950",kind:"domain",resolve:()=>ROUTE.resolveSecureBeforeChoice(secureBefore)}];

 original.label="GO AFTER THE ORIGINAL TARGET";
 original.nextBeatId=ROUTE.beats.originalIntro;
 original.availability=available;
 original.knownBlocker=null;
 original.consequenceRequests=[{requestId:"kakashi_original_target_resolve_35950",kind:"domain",resolve:()=>ROUTE.resolveOriginalTargetChoice(original)}];

 return{success:true,secure, sequential};
}
function bindMoveCloser(){
 if(ROUTE.patchGetCloserHandoff()!==true)return{success:false,reason:"move_closer_handoff_rebind_failed"};
 const strike=choice(SUCCESS_BEAT,"strike_before_handoff");
 const pick=choice(SUCCESS_BEAT,"attempt_pickpocket");
 const stop=choice(FAILURE_BEAT,"stop_package_smuggler");
 const cut=choice(FAILURE_BEAT,"cut_off_sakura");
 if(!strike||!pick||!stop||!cut)return{success:false,reason:"move_closer_gen69_choice_missing"};

 strike.label="STRIKE BEFORE THE HANDOFF";strike.nextBeatId=ROUTE.beats.directIntro;strike.availability=available;strike.knownBlocker=null;
 strike.consequenceRequests=[{requestId:"kakashi_move_closer_strike_35950",kind:"domain",resolve:()=>MOVE.resolveSuccessStrike(strike)}];

 pick.label="ATTEMPT THE PICKPOCKET";pick.nextBeatId=MOVE.beats.improvedIntro;pick.availability=available;pick.knownBlocker=null;
 pick.consequenceRequests=[{requestId:"kakashi_move_closer_improved_pickpocket_35950",kind:"domain",resolve:()=>MOVE.resolveImprovedPickpocket(pick)}];

 stop.label="STOP PACKAGE SMUGGLER";stop.nextBeatId=MOVE.beats.psIntro;stop.availability=available;stop.knownBlocker=null;
 stop.consequenceRequests=[{requestId:"kakashi_move_closer_stop_ps_35950",kind:"domain",resolve:()=>MOVE.beginFailureBattle(stop,"stop_ps")}];

 cut.label="CUT THEM OFF AT THE SAKURA TREE";cut.nextBeatId=MOVE.beats.cutIntro;cut.availability=available;cut.knownBlocker=null;
 cut.consequenceRequests=[{requestId:"kakashi_move_closer_cutoff_35950",kind:"domain",resolve:()=>MOVE.beginFailureBattle(cut,"cut_off")}];

 return{success:true};
}
function install(){
 const d=scene();if(!d||!(d.beatMap instanceof Map))return{success:false,reason:"kakashi_scene_missing"};
 const observe=bindObserve();if(!observe.success)return observe;
 const move=bindMoveCloser();if(!move.success)return move;
 return{success:true,observe:true,moveCloser:true};
}
const installed=install();
if(!installed||installed.success!==true)throw new Error("kakashi_browser_acceptance_35950_install_failed:"+(installed&&installed.reason||"unknown"));

function diagnostics(){
 const secure=choice(OBSERVE_BEAT,"secure_package");
 const sequential=choice(OBSERVE_BEAT,"defeat_assassin_then_secure");
 const secureBefore=choice(OBSERVE_BEAT,"secure_package_before_assassin");
 const original=choice(OBSERVE_BEAT,"go_after_original_target");
 const handoff=choice(SUCCESS_BEAT,"let_handoff_happen");
 const strike=choice(SUCCESS_BEAT,"strike_before_handoff");
 const pick=choice(SUCCESS_BEAT,"attempt_pickpocket");
 const checks={
  patchId:PATCH_ID==="alpha_kakashi_browser_acceptance_35950_v1_2026_09_20",
  securePackageRebound:!!secure&&secure.nextBeatId==="kak_observe_secure_package_battle"&&Array.isArray(secure.consequenceRequests)&&secure.consequenceRequests.length>0,
  sequentialRebound:!!sequential&&sequential.nextBeatId==="kak_seq_mi_battle"&&Array.isArray(sequential.consequenceRequests)&&sequential.consequenceRequests.length>0,
  secureBeforeRebound:!!secureBefore&&secureBefore.nextBeatId===ROUTE.beats.secureBeforeIntro&&Array.isArray(secureBefore.consequenceRequests)&&secureBefore.consequenceRequests.length>0,
  originalTargetRebound:!!original&&original.nextBeatId===ROUTE.beats.originalIntro&&Array.isArray(original.consequenceRequests)&&original.consequenceRequests.length>0,
  handoffReconverges:!!handoff&&handoff.nextBeatId===OBSERVE_BEAT,
  moveCloserActionsRebound:!!strike&&!!pick&&Array.isArray(strike.consequenceRequests)&&strike.consequenceRequests.length>0&&Array.isArray(pick.consequenceRequests)&&pick.consequenceRequests.length>0,
  browserGoldenClaimed:false
 };
 const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
 return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.runAcademyKakashiBrowserAcceptance35950Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_BROWSER_ACCEPTANCE_35950=Object.freeze({patchId:PATCH_ID,installed,bindObserve,bindMoveCloser,diagnostics,browserGoldenClaimed:false});
})();