#!/usr/bin/env node
"use strict";
const fs=require("fs"),assert=require("assert");
const read=p=>fs.readFileSync(p,"utf8");
const binder=read("runtime/alpha-origin-scene-board-bindings-105.js");
const board=read("runtime/alpha-story-scene-board-33900.js");
const battle=read("runtime/alpha-battle-modern-33000.js");
const index=read("index.html");
const game=read("game.js");

for(const [name,src] of Object.entries({binder,board,battle})){
  assert.doesNotThrow(()=>new Function(src),name+" syntax failure");
}
for(const token of [
  'scene("academy_hinata")','scene("academy_mirai")','"origin_academy_menma_prologue"',
  'scene("academy_kushina")','scene("academy_kurenai")','scene("academy_iwabee")','scene("academy_metal_lee")'
]) assert(binder.includes(token),"missing #105 Scene Board binding "+token);
assert(!binder.includes('scene("academy_kakashi")'),"Kakashi Golden Story was bound by #105 adapter");
for(const asset of [
  "Assets/Academy Student/academy_hinata.png","NPC/hyuga_instructor.png","NPC/hyuga_sparring_partner.png",
  "Assets/Academy Student/academy_mirai.png","NPC/mirai_instructor.png","NPC/traveller.png",
  "Assets/Academy Student/academy_menma.png","NPC/menma_instructor.png","Assets/Special Jonin/sj_anko.png",
  "Assets/Academy Student/academy_kurenai.png","NPC/kurenai_instructor.png",
  "Assets/Academy Student/academy_iwabe.png","Assets/Academy Student/academy_metal.png"
]) assert(binder.includes(asset),"known exact actor asset missing "+asset);
for(const guessed of ["kushina_instructor.png","iwabee_instructor.png","metal_instructor.png","metal_inviting_genin.png","academy_student_fem_1.png","pursuit_target.png"]){
  assert(!binder.includes(guessed),"unresolved asset path was guessed: "+guessed);
}
assert(binder.includes("Nine-Tails is an internal speaker")&&!binder.includes("nine_tails.png"),"Menma internal Nine-Tails was physicalised");
const order=[
 "game.js","runtime/alpha-origin-starting-purse-409.js","runtime/alpha-story-machine-resolver-343.js",
 "runtime/academy-wasabi-writing-golden-343.js","runtime/alpha-origin-scenes-32900-a.js",
 "runtime/alpha-battle-modern-33000.js","runtime/alpha-wasabi-rogue-battle-343.js",
 "runtime/alpha-menma-evolved-pl-battle-36900.js","runtime/alpha-origin-scene-board-bindings-105.js"
].map(x=>index.indexOf(x));
assert(order.every(x=>x>=0),"#105 production loader missing module");
assert(order.every((x,i)=>i===0||x>order[i-1]),"#105 production load order drift");
assert(board.includes('data-sc-performance')||board.includes("scPerformance"),"shared Story performance mode missing");
assert(board.includes("click")&&board.includes("advanceStoryScene"),"shared Story click-anywhere owner missing");
assert(board.includes("syncSpeakerLinkedPanel33900"),"speaker-linked dialogue geometry missing");
assert(battle.includes('querySelector(".alpha-battle-pl-core")'),"radial PL refresh does not target inner core");
assert(battle.includes('core.querySelector("strong")')||battle.includes("core?.querySelector("strong")"),"radial PL current value not refreshed inside core");
assert(!game.includes("ORIGIN_COMPLETION_STARTING_PURSE_SOURCE_ID"),"frozen game.js contains successor purse mutation");
console.log(JSON.stringify({pass:true,issue:105,checks:{
  sevenNonKakashiBindings:true,kakashiExcluded:true,knownAssetsExact:true,missingAssetsNotGuessed:true,
  internalVoiceNotPhysical:true,loadOrder:true,sharedSceneBoard:true,clickAnywhere:true,
  speakerLinkedDialogue:true,radialPLContainmentRefresh:true,frozenCorePreserved:true,browserGoldenClaimed:false
}},null,2));