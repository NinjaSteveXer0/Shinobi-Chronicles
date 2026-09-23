#!/usr/bin/env node
"use strict";
const fs=require("fs");
const assert=require("assert");

const STORY="runtime/alpha-story-scene-board-33900.js";
const RENDERER="runtime/alpha-kakashi-v2-renderer-36030.js";
const TRANSITION="runtime/alpha-kakashi-v2-transition-36040.js";
const REGISTRY="tools/fixtures/runtime_responsibility_registry_300.json";
const DECLARATIONS="tools/fixtures/runtime_change_declarations_300.json";
const story=fs.readFileSync(STORY,"utf8");
const renderer=fs.readFileSync(RENDERER,"utf8");
const transition=fs.readFileSync(TRANSITION,"utf8");
const registry=JSON.parse(fs.readFileSync(REGISTRY,"utf8"));
const declarations=JSON.parse(fs.readFileSync(DECLARATIONS,"utf8"));

function fn(source,name){
  let start=source.indexOf("function "+name+"(");
  if(start<0)throw new Error("missing function "+name);
  let i=source.indexOf("{",start),depth=0,quote=null,escaped=false;
  for(;i<source.length;i++){
    const c=source[i];
    if(quote){
      if(escaped){escaped=false;continue;}
      if(c==="\\"){escaped=true;continue;}
      if(c===quote)quote=null;
      continue;
    }
    if(c==="\""||c==="\'"||c==="`"){quote=c;continue;}
    if(c==="{")depth++;
    else if(c==="}"&&--depth===0)return source.slice(start,i+1);
  }
  throw new Error("unterminated function "+name);
}

const sharedPlayStart=story.indexOf("function playStoryHardSceneTransition33900(");
const sharedPlayEnd=story.indexOf("function performSceneCut(",sharedPlayStart);
assert(sharedPlayStart>=0&&sharedPlayEnd>sharedPlayStart,"shared hard-transition playback function bounds missing");
const sharedPlay=story.slice(sharedPlayStart,sharedPlayEnd);
const sharedCancel=fn(story,"cancelStoryHardSceneTransition33900");
const sharedCurtain=fn(story,"ensureStoryHardTransitionCurtain33900");
const genericCut=fn(story,"performSceneCut");
const kakashiPost=fn(transition,"playPostCommitTransition");
const kakashiAdvance=fn(transition,"semanticAdvance");
const kakashiRender=fn(renderer,"render");
const handoff=fn(renderer,"playSharedStoryHardTransition36030");

assert(story.includes('HARD_TRANSITION_CURTAIN_ID="sc-story-hard-transition-33900"'),"shared curtain ID missing");
assert(story.includes("function cancelStoryHardSceneTransition33900")&&story.includes("function getStoryHardSceneTransitionState33900"),"shared transition API incomplete");
assert(sharedCurtain.includes("document.body.appendChild(curtain)"),"shared transition curtain is not document-level");
assert(story.includes('cancelStoryHardSceneTransition33900("superseded")'),"stale shared transition is not invalidated");
assert(story.includes("generation===hardTransitionGeneration"),"shared transition generation guard missing");
assert(sharedPlay.includes("isReduced"),"reduced-motion branch missing");
assert(!sharedPlay.includes("advanceStoryScene")&&!sharedPlay.includes("PRE_ADVANCE"),"presentation transition can commit Story truth");
assert(sharedCancel.includes("clearStoryHardTransitionTimers33900"),"shared cancel does not clear timers");
assert(genericCut.includes("playStoryHardSceneTransition33900")&&!genericCut.includes("createElement"),"generic Scene Board hard cut still owns a second wipe");
assert(!story.includes(".sc-scene-board-wipe-33900{"),"legacy 33900 root-local wipe CSS still active");

assert(kakashiPost.includes("playStoryHardSceneTransition33900"),"Kakashi hard transition does not delegate to 33900");
assert(kakashiPost.includes('visualTransition:"none"'),"same-environment update lost no-transition contract");
assert(kakashiPost.includes('sharedTransitionOwner:"story.transition.presentation.shared"'),"Kakashi does not identify shared transition owner");
assert(!kakashiPost.includes("setTimeout")&&!kakashiPost.includes("classList"),"36040 still performs hard-transition playback");
assert(kakashiAdvance.indexOf("PRE_ADVANCE")>=0&&kakashiAdvance.indexOf("PRE_ADVANCE")<kakashiAdvance.indexOf("playPostCommitTransition"),"presentation begins before semantic commit");
assert(!transition.includes("function later(")&&!transition.includes("timerIds=[]")&&!transition.includes('wipeMode="hard"'),"36040 retained local transition engine");

for(const token of [
  'GLOBAL_CURTAIN_ID="kakashi-v2-global-curtain"',
  "function ensureGlobalCurtain(",
  "function setGlobalCurtain(",
  "function setWipe(",
  "function setTransitionMemory(",
  "setAcademyKakashiV2Wipe36030=",
  "setAcademyKakashiV2GlobalCurtain36030=",
  "setAcademyKakashiV2TransitionMemory36030="
])assert(!renderer.includes(token),"36030 retained retired transition owner: "+token);
const styleBlock=fn(renderer,"installStyle");
const rootBlock=fn(renderer,"ensureRoot");
assert(!styleBlock.includes(".kv2-transition-memory")&&!styleBlock.includes(".kv2-wipe")&&!rootBlock.includes("kv2-transition-memory")&&!rootBlock.includes("kv2-wipe"),"36030 retained alternate root transition layer");
assert(handoff.includes("playStoryHardSceneTransition33900"),"Story/Battle handoff does not use shared owner");
assert(kakashiRender.includes('playSharedStoryHardTransition36030("story_to_battle"')&&kakashiRender.includes('playSharedStoryHardTransition36030("battle_to_story"'),"Story/Battle transition intents missing");
assert(renderer.includes("Final Kakashi Golden motion policy"),"static actor/card stabilization was disturbed");
assert(!sharedPlay.includes("cloneNode(")&&!kakashiPost.includes("cloneNode(")&&!handoff.includes("cloneNode(")&&!kakashiRender.includes("cloneNode("),"#334 transition paths introduced clone/ghost ownership");

const transitionRow=(registry.responsibilities||[]).find(r=>r.responsibilityId==="story.transition.presentation.shared");
assert(transitionRow,"story.transition.presentation.shared registry row missing");
assert.strictEqual(transitionRow.canonicalOwner,STORY,"shared transition canonical owner is not 33900");
assert((transitionRow.directCallers||[]).includes(RENDERER)&&(transitionRow.directCallers||[]).includes(TRANSITION),"Kakashi callers absent from shared transition registry");
assert.deepStrictEqual(transitionRow.saveSchemaRefs||[],[],"presentation transition must not own save schema");
assert.deepStrictEqual(transitionRow.retiredOwners||[],[],"#334 must not retire live Kakashi modules wholesale");
assert((transitionRow.retiredImplementations||[]).some(x=>String(x).includes("ensureGlobalCurtain")),"36030 curtain implementation retirement not registered");
assert((transitionRow.retiredImplementations||[]).some(x=>String(x).includes("36040")&&String(x).includes("playback")),"36040 playback implementation retirement not registered");

const decl=(declarations.declarations||[]).find(r=>r.changeId==="issue-334-shared-story-hard-transition-owner");
assert(decl&&decl.classification==="REPLACES","#334 REPLACES declaration missing");
assert((decl.responsibilityIds||[]).includes("story.transition.presentation.shared"),"#334 declaration missing transition responsibility");

console.log(JSON.stringify({
  pass:true,
  issue:334,
  canonicalOwner:STORY,
  curtainId:"sc-story-hard-transition-33900",
  sameEnvironmentNoHardPlayback:kakashiPost.includes('visualTransition:"none"'),
  semanticCommitBeforePresentation:true,
  staleInvalidation:true,
  reducedMotion:true,
  kakashi36040:"intent/delegation only",
  kakashi36030:"DOM/layout + Story-Battle transition intent only",
  retiredKakashiCurtain:true,
  retiredRootLocalWipe:true,
  browserGoldenClaimed:false
},null,2));
