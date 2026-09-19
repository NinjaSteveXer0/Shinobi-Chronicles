#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const source=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-browser-acceptance-35950.js"),"utf8");

const observe={beatId:"kak_original_major_choice",choices:[
 {choiceId:"secure_package",label:"SECURE THE PACKAGE",nextBeatId:null,consequenceRequests:[]},
 {choiceId:"defeat_assassin_then_secure",label:"DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE",nextBeatId:null,consequenceRequests:[]},
 {choiceId:"secure_package_before_assassin",label:"SECURE THE PACKAGE BEFORE THE ASSASSIN",nextBeatId:null,consequenceRequests:[]},
 {choiceId:"go_after_original_target",label:"GO AFTER THE ORIGINAL TARGET",nextBeatId:null,consequenceRequests:[]}
]};
const success={beatId:"kak_get_closer_success",choices:[
 {choiceId:"let_handoff_happen",label:"LET THE HANDOFF HAPPEN",nextBeatId:"legacy",consequenceRequests:[{requestId:"handoff",resolve(){return{success:true};}}]},
 {choiceId:"strike_before_handoff",label:"STRIKE BEFORE THE HANDOFF",nextBeatId:null,consequenceRequests:[]},
 {choiceId:"attempt_pickpocket",label:"ATTEMPT THE PICKPOCKET",nextBeatId:null,consequenceRequests:[]}
]};
const failure={beatId:"kak_get_closer_failure",choices:[
 {choiceId:"stay_on_package",label:"STAY ON THE PACKAGE",nextBeatId:"legacy",consequenceRequests:[]},
 {choiceId:"stop_package_smuggler",label:"STOP PACKAGE SMUGGLER",nextBeatId:null,consequenceRequests:[]},
 {choiceId:"cut_off_sakura",label:"CUT THEM OFF AT THE SAKURA TREE",nextBeatId:null,consequenceRequests:[]}
]};
const definition={beatMap:new Map([[observe.beatId,observe],[success.beatId,success],[failure.beatId,failure]])};
const ctx={
 console,Map,Object,Array,String,Boolean,Number,JSON,Set,Error,
 getStorySceneDefinition:id=>id==="origin_academy_kakashi_anbu_retrieval"?definition:null
};
ctx.globalThis=ctx;
ctx.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410={
 bindObserveSecurePackageChoice({release}={}){
  const row=observe.choices.find(x=>x.choiceId==="secure_package");row.nextBeatId="kak_observe_secure_package_battle";row.availability=()=>({available:release===true,knownBlocker:null});row.consequenceRequests=[{requestId:"secure_owner",resolve:()=>({success:true})}];return{success:true};
 },
 bindObserveEscalationChoice(){
  const row=observe.choices.find(x=>x.choiceId==="defeat_assassin_then_secure");row.nextBeatId="kak_seq_mi_battle";row.availability=()=>({available:true,knownBlocker:null});row.consequenceRequests=[{requestId:"seq_owner",resolve:()=>({success:true})}];return{success:true};
 }
};
ctx.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910={
 beats:{secureBeforeIntro:"kak_konoha_secure_before_intro_35910",originalIntro:"kak_konoha_original_target_intro_35910",directIntro:"kak_konoha_direct_strike_intro_35910"},
 beginSharedObserveBattleChoice:()=>({success:true}),
 resolveSecureBeforeChoice:()=>({success:true}),
 resolveOriginalTargetChoice:()=>({success:true}),
 patchGetCloserHandoff(){const row=success.choices.find(x=>x.choiceId==="let_handoff_happen");row.nextBeatId="kak_original_major_choice";return true;}
};
ctx.SC_ALPHA_KAKASHI_MOVE_CLOSER_CLOSURE_35930={
 beats:{improvedIntro:"kak_move_closer_improved_pickpocket_intro_35930",psIntro:"kak_move_closer_failure_ps_intro_35930",cutIntro:"kak_move_closer_failure_cutoff_intro_35930"},
 resolveSuccessStrike:()=>({success:true}),
 resolveImprovedPickpocket:()=>({success:true}),
 beginFailureBattle:()=>({success:true})
};
vm.createContext(ctx);vm.runInContext(source,ctx,{filename:"alpha-kakashi-browser-acceptance-35950.js"});
const report=JSON.parse(JSON.stringify(ctx.runAcademyKakashiBrowserAcceptance35950Diagnostics()));
assert.strictEqual(report.pass,true,`35950 diagnostics failed: ${report.failed.join(",")}`);
assert.strictEqual(observe.choices.find(x=>x.choiceId==="secure_package").nextBeatId,"kak_observe_secure_package_battle");
assert.strictEqual(observe.choices.find(x=>x.choiceId==="defeat_assassin_then_secure").nextBeatId,"kak_seq_mi_battle");
assert.strictEqual(observe.choices.find(x=>x.choiceId==="secure_package_before_assassin").nextBeatId,"kak_konoha_secure_before_intro_35910");
assert.strictEqual(observe.choices.find(x=>x.choiceId==="go_after_original_target").nextBeatId,"kak_konoha_original_target_intro_35910");
assert.strictEqual(success.choices.find(x=>x.choiceId==="let_handoff_happen").nextBeatId,"kak_original_major_choice");
assert.strictEqual(success.choices.find(x=>x.choiceId==="strike_before_handoff").nextBeatId,"kak_konoha_direct_strike_intro_35910");
assert.strictEqual(success.choices.find(x=>x.choiceId==="attempt_pickpocket").nextBeatId,"kak_move_closer_improved_pickpocket_intro_35930");
assert.strictEqual(failure.choices.find(x=>x.choiceId==="stop_package_smuggler").nextBeatId,"kak_move_closer_failure_ps_intro_35930");
assert.strictEqual(failure.choices.find(x=>x.choiceId==="cut_off_sakura").nextBeatId,"kak_move_closer_failure_cutoff_intro_35930");
console.log(JSON.stringify({pass:true,patch:"35950-v1",observeRebound:true,moveCloserRebound:true,browserGoldenClaimed:false},null,2));
