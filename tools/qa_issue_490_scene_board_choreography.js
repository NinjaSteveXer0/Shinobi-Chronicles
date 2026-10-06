#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert"),vm=require("vm");
const ROOT=path.resolve(__dirname,"..");
const runtimePath=path.join(ROOT,"runtime/alpha-story-scene-board-expressive-49000.js");
const source=fs.readFileSync(runtimePath,"utf8");

assert(source.includes('BENCHMARK_SCENE_ID="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1"'),"#490 benchmark scene drifted");
for(const actor of ["academy_menma","academy_hinata","academy_kakashi","academy_kakashi_origin_masked_interceptor"]){
  assert(source.includes(actor),"#490 benchmark actor missing: "+actor);
}
for(const primitive of ["TEAM_ENTER_LEFT","SQUAD_WEDGE_LEFT","STEP_BACK","SHORT_PACE","ATTENTION_SHIFT","SMALL_RECOIL","DOUBLE_BOUNCE","TILT","OPPOSING_GROUP_TILT","SHORT_SHAKE","RECOMPOSE_GROUP"]){
  assert(source.includes('"'+primitive+'"'),"#490 expressive primitive missing: "+primitive);
}
assert(source.includes('actorAnimations=new WeakMap()'),"#490 lacks one-active-motion-owner tracking");
assert(source.includes('cancelActorMotion49000(node,"new_cue")'),"#490 cue supersession does not cancel prior actor motion");
assert(source.includes('translate:"-7vw 0"'),"#490 entry does not use compositor-safe translate longhand");
assert(source.includes('rotate:"0deg"'),"#490 acting does not use rotate longhand");
const frameSource=source.slice(source.indexOf("function animationFrames49000"),source.indexOf("function playActorPrimitive49000"));
assert(!/transform\s*:/.test(frameSource),"#490 expressive frames must not animate transform");
assert(source.includes('prefers-reduced-motion: reduce'),"#490 reduced-motion branch missing");
assert(source.includes('Math.min(100,bounded)'),"#490 reduced-motion duration must be <=100ms");
assert(source.includes('benchmarkEligible49000'),"#490 benchmark authorisation guard missing");
assert(source.includes('teamVariantIds'),"#490 presentation actor must derive from authorised current team");
assert(!source.includes("MutationObserver"),"#490 must not install MutationObserver ownership");
for(const forbidden of ["activityHistory.push","setOpportunityResolution","registerStoryScene(","registerWorldEventOpportunity(","addItemToInventory","completeChronicleOriginPrologue","resolveStoryChoice("]){
  assert(!source.includes(forbidden),"#490 presentation runtime illegally contains semantic writer: "+forbidden);
}
assert(!source.includes("removeOnComplete"),"#490 benchmark must not persistently remove actors");
assert(!source.includes('kind:"FLEE"'),"#490 benchmark must not manufacture a flee state");
assert(!source.includes('kind:"EXIT"'),"#490 benchmark must not manufacture an exit state");

const fakeGlobal={
  console,
  SC_STORY_SCENE_BOARD_33900:{patchId:"qa_shared_owner"},
  renderStoryScenePresentationLayer(){return true;},
  getActiveStorySceneRuntime(){return null;},
  getStoryScenePerformance33900(){return null;},
  matchMedia(){return{matches:false};},
  setTimeout,clearTimeout,
};
fakeGlobal.globalThis=fakeGlobal;
vm.runInNewContext(source,fakeGlobal,{filename:runtimePath});
const diag=fakeGlobal.runStorySceneBoardExpressive49000Diagnostics();
assert.strictEqual(diag.pass,true,"#490 source diagnostics failed: "+JSON.stringify(diag.failed));
assert.strictEqual(diag.browserGoldenClaimed,false,"#490 must not claim Browser Golden from source QA");
assert.deepStrictEqual(Array.from(diag.benchmarkActors),["academy_menma","academy_hinata","academy_kakashi","academy_kakashi_origin_masked_interceptor"]);

console.log(JSON.stringify({pass:true,patchId:diag.patchId,benchmarkSceneId:diag.benchmarkSceneId,benchmarkActors:Array.from(diag.benchmarkActors),browserGoldenClaimed:false},null,2));
