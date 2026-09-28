#!/usr/bin/env node
"use strict";
const fs=require("fs"),assert=require("assert");
const read=p=>fs.readFileSync(p,"utf8");
const binder=read("runtime/alpha-origin-scene-board-bindings-105.js");
const sceneA=read("runtime/alpha-origin-scenes-32900-a.js");
const sceneC=read("runtime/alpha-origin-scenes-32900-c.js");
const golden=read("runtime/alpha-origin-writing-golden-105.js");
const shim335=read("runtime/alpha-origin-browser-realisation-33500.js");
const shim336=read("runtime/alpha-early-story-modernization-33600.js");
const shim337=read("runtime/alpha-origin-screen-first-33700.js");
const board=read("runtime/alpha-story-scene-board-33900.js");
const kakashiRenderer=read("runtime/alpha-kakashi-v2-renderer-36030.js");
const sceneBoardDoc=read("Documentation/UI/Chronicle Interaction Interactive Scene Board Addendum 2026-09-13.md");
const battle=read("runtime/alpha-battle-modern-33000.js");
const index=read("index.html");
const game=read("game.js");

for(const [name,src] of Object.entries({binder,sceneA,sceneC,golden,shim335,shim336,shim337,board,battle,kakashiRenderer})){
  assert.doesNotThrow(()=>new Function(src),name+" syntax failure");
}
for(const token of [
  'scene("academy_hinata")','scene("academy_mirai")','"origin_academy_menma_prologue"',
  'scene("academy_kushina")','scene("academy_kurenai")','scene("academy_iwabee")','scene("academy_metal_lee")'
]) assert(binder.includes(token),"missing #105 Scene Board binding "+token);
assert(!binder.includes('scene("academy_kakashi")'),"Kakashi Golden Story was bound by #105 adapter");
assert(binder.includes('"SPARRING STUDENT","HYŪGA SPARRING PARTNER"'),"Hinata sparring partner is missing authored speaker aliases");
assert(binder.includes('hinataYoungerStudent:"NPC/younger_student.png"'),"Hinata younger-student exact path missing");
assert(binder.includes('hinataYoungerSparringPartner:"NPC/younger_sparring_partner.png"'),"Hinata younger sparring-partner exact path missing");
assert(binder.includes('actor("hinata_younger_student","YOUNGER STUDENT",PATH.hinataYoungerStudent')&&binder.includes('actor("hinata_younger_sparring_partner","YOUNGER SPARRING PARTNER",PATH.hinataYoungerSparringPartner'),"Hinata final three-actor projection missing");
assert(binder.includes('hin_receipt:()=>[{kind:"record",text:buildHinataReceipt105()}]'),"Hinata Chronicle Receipt projection missing");
assert(binder.includes("function rehydrateActiveOriginPresentation105()")&&binder.includes("restoreActiveOriginStoryPresentation32900")&&binder.includes("renderStorySceneBoard33900"),"active GOLDEN Origin reload presentation rehydrate missing");
assert(binder.includes("pendingBattleRestore===true"),"GOLDEN reload rehydrate can outrank pending Battle restore");
assert(golden.includes('const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);'),"GOLDEN consumer methods are not bound to Origin runtime");
assert(golden.includes('entryBeatId:"menma_open_01"')&&golden.includes('D("menma_open_15","MENMA","I know."'),"Menma full GOLDEN Academy opening missing");
assert(golden.includes('entryBeatId:"mir_assignment_01"')&&golden.includes('Q("mir_walk_choice"')&&golden.includes('Q("mir_reflection_choice"'),"Mirai GOLDEN conversation graph missing");
assert(golden.includes('const oldTutorial=cloneBeat(oldMenmaBeat("tutorial_battle"))')&&golden.includes('victoryBeatId:"menma_after_01"'),"Menma evolved Battle seam was not preserved into GOLDEN Story");
assert(shim335.includes('beat33500(def,"mir_assignment_01")')&&shim336.includes('beat(def,"mir_assignment_01")'),"legacy Mirai expression shims do not stand down for GOLDEN graph");
assert(shim337.includes('beat(d,"mir_assignment_01")')&&shim337.includes('d.entryBeatId==="menma_open_01"'),"33700 stale Mirai/Menma shims do not stand down for GOLDEN graph");
assert(binder.includes('id.startsWith("mir_assignment_")')&&binder.includes('id.startsWith("mir_market_")')&&binder.includes('id.startsWith("mir_checkpoint_")'),"Mirai GOLDEN backdrop families are not bound");
assert(binder.includes('rows.push(instructor(),traveller())')&&binder.includes('id.startsWith("mir_confront_")'),"Mirai GOLDEN actor/disguise projection missing");
for(const asset of [
  "Assets/Academy Student/academy_hinata.png","NPC/hyuga_instructor.png","NPC/hyuga_sparring_partner.png",
  "Assets/Academy Student/academy_mirai.png","NPC/mirai_instructor.png","NPC/traveller.png","NPC/mirai_porter.png","NPC/mirai_checkpoint_instructor.png",
  "Assets/Academy Student/academy_menma.png","NPC/menma_instructor.png","Assets/Special Jonin/sj_anko.png",
  "Assets/Academy Student/academy_kushina.png","NPC/kushina_instructor.png","NPC/kushina_classmate.png",
  "Assets/Academy Student/academy_kurenai.png","NPC/kurenai_instructor.png",
  "Assets/Academy Student/academy_iwabe.png","NPC/iwabe_instructor.png",
  "Assets/Academy Student/academy_metal.png","NPC/metal_classmate_1.png","NPC/metal_classmate_2.png"
]) assert(binder.includes(asset),"known exact actor asset missing "+asset);
for(const guessed of ["iwabee_instructor.png","metal_instructor.png","metal_inviting_genin.png"]){
  assert(!binder.includes(guessed),"unapproved actor path was guessed: "+guessed);
}
for(const asset of [
  "NPC/academy_student_fem_1.png","NPC/izuno_student_2.png","NPC/izuno_proctor.png","NPC/pursuit_target.png",
  "NPC/furniture_civilian.png","NPC/vegetable_vendor.png","NPC/equipment_custodian.png","NPC/delivery_worker.png",
  "NPC/runaway_cart_civillian.png","NPC/obito_instructor.png"
]) assert(fs.existsSync(asset),"#419 durable NPC binary missing from candidate "+asset);
for(const asset of ["NPC/academy_student_fem_1.png","NPC/izuno_student_2.png","NPC/izuno_proctor.png","NPC/pursuit_target.png"]){
  assert(sceneA.includes(asset),"Wasabi native Scene Board did not consume #419 asset "+asset);
}
for(const asset of ["NPC/furniture_civilian.png","NPC/vegetable_vendor.png","NPC/equipment_custodian.png","NPC/delivery_worker.png","NPC/runaway_cart_civillian.png","NPC/obito_instructor.png"]){
  assert(sceneC.includes(asset),"Obito native Scene Board did not consume #419 asset "+asset);
}
const menmaActorBody=binder.slice(binder.indexOf("function menmaActors("),binder.indexOf("function kushinaActors("));
assert(binder.includes("Nine-Tails is an internal speaker")&&!menmaActorBody.includes("nine_tails.png"),"Menma internal Nine-Tails was physicalised");
const order=[
 "game.js","runtime/alpha-origin-starting-purse-409.js","runtime/alpha-story-machine-resolver-343.js",
 "runtime/academy-wasabi-writing-golden-343.js","runtime/alpha-origin-scenes-32900-a.js",
 "runtime/alpha-battle-modern-33000.js","runtime/alpha-wasabi-rogue-battle-343.js",
 "runtime/alpha-menma-evolved-pl-battle-36900.js","runtime/alpha-origin-writing-golden-105.js",
 "runtime/alpha-origin-scene-board-bindings-105.js"
].map(x=>index.indexOf(x));
assert(order.every(x=>x>=0),"#105 production loader missing module");
assert(order.every((x,i)=>i===0||x>order[i-1]),"#105 production load order drift");
assert(board.includes('data-sc-performance')||board.includes("scPerformance"),"shared Story performance mode missing");
assert(board.includes("click")&&board.includes("advanceStoryScene"),"shared Story click-anywhere owner missing");
assert(board.includes("syncSpeakerLinkedPanel33900"),"speaker-linked dialogue geometry missing");
assert(board.includes('border:1px solid rgba(93,215,225,.32)!important;border-radius:16px!important'),"shared narration frame no longer matches Kakashi cyan baseline");
assert(board.includes('width:min(36vw,500px)!important')&&board.includes('border-color:rgba(103,221,230,.55)!important'),"shared dialogue frame no longer matches Kakashi cyan baseline");
assert(board.includes('[data-sc-cue-speaker-side="opposition"] .sc-story-panel{border-color:rgba(103,221,230,.55)!important'),"shared opposition dialogue frame is not cyan");
assert(board.includes('[data-sc-cue-speaker-side="opposition"] .sc-story-panel::after{border-color:rgba(103,221,230,.5)'),"shared opposition dialogue pointer is not cyan");
assert(!board.includes('[data-sc-cue-speaker-side="opposition"] .sc-story-panel{border-color:rgba(218,176,77,.58)!important'),"gold/brown opposition dialogue outline returned in shared Scene Board");
assert(kakashiRenderer.includes('.kv2-dialogue{position:absolute;left:50%;bottom:3%;width:min(72%,980px)')&&kakashiRenderer.includes('border:1px solid rgba(93,215,225,.32);border-radius:16px'),"Kakashi narration frame baseline drift");
assert(kakashiRenderer.includes('.kv2-speech{position:absolute;left:var(--kv2-speech-x,50%);bottom:23.5%;z-index:31;width:min(36vw,500px)')&&kakashiRenderer.includes('border:1px solid rgba(103,221,230,.55);border-radius:16px'),"Kakashi dialogue frame baseline drift");
assert(kakashiRenderer.includes('.kv2-speech[data-speaker-side="opposition"]{border-color:rgba(103,221,230,.55);'),"Kakashi opposition dialogue frame is not cyan");
assert(kakashiRenderer.includes('.kv2-speech[data-speaker-side="opposition"]::after{border-color:rgba(103,221,230,.5);'),"Kakashi opposition dialogue pointer is not cyan");
assert(!kakashiRenderer.includes('.kv2-speech[data-speaker-side="opposition"]{border-color:rgba(218,176,77,.58);'),"gold/brown opposition dialogue outline returned in Kakashi");
assert(sceneBoardDoc.includes("GLOBAL NARRATION / DIALOGUE FRAME COLOUR LOCK"),"global cyan Story frame lock missing");
assert(board.includes('sc-performance-progress-33900')&&board.includes('CLICK ANYWHERE TO CONTINUE'),"shared narration is missing Kakashi progress/hint parity");
assert(board.includes('[data-sc-cue-kind="narration"] .sc-chronicle-primary')&&board.includes('[data-sc-cue-kind="dialogue"] .sc-chronicle-primary')&&board.includes('display:none!important;'),"ordinary Story arrow button was not retired");
assert(board.includes('font-size:clamp(12px,.94vw,15px)!important')&&board.includes('font-size:clamp(12px,.96vw,16px)!important'),"shared Story text typography no longer matches Kakashi baseline");
assert(sceneBoardDoc.includes("no visible arrow/CONTINUE button for ordinary narration")&&sceneBoardDoc.includes("no visible arrow/CONTINUE button for ordinary dialogue"),"durable Kakashi box parity rule incomplete");
assert(battle.includes('querySelector(".alpha-battle-pl-core")'),"radial PL refresh does not target inner core");
assert(battle.includes('core.querySelector("strong")')||battle.includes('core?.querySelector("strong")'),"radial PL current value not refreshed inside core");
assert(!game.includes("ORIGIN_COMPLETION_STARTING_PURSE_SOURCE_ID"),"frozen game.js contains successor purse mutation");
console.log(JSON.stringify({pass:true,issue:105,checks:{
  sevenNonKakashiBindings:true,kakashiExcluded:true,hinataSparringSpeakerAlias:true,hinataFinalPairBound:true,hinataChronicleReceipt:true,miraiMenmaWritingGolden:true,legacyGoldenShimsRetired:true,knownAssetsExact:true,issue419AssetsConsumed:true,missingAssetsNotGuessed:true,
  internalVoiceNotPhysical:true,loadOrder:true,sharedSceneBoard:true,clickAnywhere:true,
  speakerLinkedDialogue:true,globalCyanStoryFrames:true,kakashiFrameParity:true,kakashiTextAndAdvanceParity:true,radialPLContainmentRefresh:true,frozenCorePreserved:true,browserGoldenClaimed:false
}},null,2));