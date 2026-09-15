#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const assert=require("assert");
function load(path){vm.runInThisContext(fs.readFileSync(path,"utf8"),{filename:path});}

// 34100 is now the stable loader. In headless QA it synchronously loads the
// byte-identical semantic core and 34200 guard.
globalThis.playerData={};
globalThis.savePlayerData=()=>{};
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100.js");

const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const GUARD=globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200;
assert(KAK,"34100 semantic core missing through loader");
assert(GUARD,"34200 final-authority guard missing through loader");
assert.strictEqual(runAlphaKakashiFinal34100Diagnostics().pass,true,"preserved 34100 diagnostics regressed");

const choice=(choiceId,nextBeatId)=>({choiceId,label:choiceId,nextBeatId,availability:null,knownBlocker:null,consequenceRequests:[],contextPatch:null});
const action={beatId:"kak_original_action",mode:"choice",choices:[
  choice("observe","kak_original_transfer"),
  choice("get_closer","kak_original_transfer"),
  choice("attack","kak_original_transfer"),
  choice("attempt_pickpocket","kak_original_transfer")
]};
const major={beatId:"kak_original_major_choice",mode:"choice",choices:[
  choice("fight_assassin","kak_original_major_choice"),
  choice("secure_package","kak_original_secured"),
  choice("defeat_assassin_then_recover","kak_original_major_choice"),
  choice("pursue_original_target","kak_original_pursue")
]};
const secured={beatId:"kak_original_secured",mode:"narration",onEnterConsequences:[{requestId:"old-secured"}],exitScene:true,nextBeatId:null};
const pursue={beatId:"kak_original_pursue",mode:"narration",onEnterConsequences:[{requestId:"old-pursue"}],exitScene:true,nextBeatId:null};
const definition={
  sceneId:"origin_academy_kakashi_anbu_retrieval",
  beatMap:new Map([[action.beatId,action],[major.beatId,major],[secured.beatId,secured],[pursue.beatId,pursue]]),
  onCompleteConsequences:[{requestId:"old-complete"}]
};
globalThis.getStorySceneDefinition=sceneId=>sceneId===definition.sceneId?definition:null;

assert.strictEqual(GUARD.detectLegacyGraph(definition),true,"stale 33800 shape not detected");
const applied=GUARD.applyLegacyGuard();
assert.strictEqual(applied.success,true);
assert.strictEqual(applied.applied,true,"stale graph was not guarded");
assert.strictEqual(action.choices[0].availability,null,"Observe should remain usable until the final-authority boundary");
for(const row of action.choices.slice(1)){
  const availability=row.availability();
  assert.strictEqual(availability.available,false,`${row.choiceId} should fail closed`);
  assert.strictEqual(availability.knownBlocker,GUARD.blocker);
}
for(const row of major.choices){
  const availability=row.availability();
  assert.strictEqual(availability.available,false,`${row.choiceId} legacy continuation should fail closed`);
  assert.strictEqual(availability.knownBlocker,GUARD.blocker);
}
assert.deepStrictEqual(secured.onEnterConsequences,[]);
assert.deepStrictEqual(pursue.onEnterConsequences,[]);
assert.strictEqual(secured.exitScene,false);
assert.strictEqual(pursue.exitScene,false);
assert.strictEqual(secured.nextBeatId,"kak_original_major_choice");
assert.strictEqual(pursue.nextBeatId,"kak_original_major_choice");
assert.deepStrictEqual(definition.onCompleteConsequences,[]);

// After guard application the shape is intentionally no longer recognised as
// the untouched legacy terminal graph, so replay becomes a no-op rather than
// repeatedly mutating runtime state.
const replay=GUARD.applyLegacyGuard();
assert.strictEqual(replay.success,true);
assert.strictEqual(replay.applied,false);
assert.strictEqual(replay.reason,"final_or_nonlegacy_graph_present");

// A future final graph with the distinct fifth Observe route must be left alone.
const futureMajor={...major,choices:[...major.choices,choice("secure_package_before_assassin","future") ]};
const futureDefinition={...definition,beatMap:new Map(definition.beatMap)};
futureDefinition.beatMap.set("kak_original_major_choice",futureMajor);
assert.strictEqual(GUARD.detectLegacyGraph(futureDefinition),false,"future nonlegacy graph would be incorrectly guarded");

const report={
  pass:true,
  kakashiPatch:KAK.patchId,
  guardPatch:GUARD.patchId,
  staleCompletionBlocked:true,
  unresolvedOwnerRoutesFailClosed:true,
  futureGraphNoOp:true,
  browserGoldenClaimed:false
};
console.log(JSON.stringify(report,null,2));
