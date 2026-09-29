#!/usr/bin/env node
"use strict";
const fs=require("fs"),assert=require("assert");
const read=p=>fs.readFileSync(p,"utf8");
const binder=read("runtime/alpha-origin-scene-board-bindings-105.js");
const sceneA=read("runtime/alpha-origin-scenes-32900-a.js");
const sceneB=read("runtime/alpha-origin-scenes-32900-b.js");
const sceneC=read("runtime/alpha-origin-scenes-32900-c.js");
const golden=read("runtime/alpha-origin-writing-golden-105.js");
const shim335=read("runtime/alpha-origin-browser-realisation-33500.js");
const shim336=read("runtime/alpha-early-story-modernization-33600.js");
const shim337=read("runtime/alpha-origin-screen-first-33700.js");
const board=read("runtime/alpha-story-scene-board-33900.js");
const kakashiRenderer=read("runtime/alpha-kakashi-v2-renderer-36030.js");
const sceneBoardDoc=read("Documentation/UI/Chronicle Interaction Interactive Scene Board Addendum 2026-09-13.md");
const battle=read("runtime/alpha-battle-modern-33000.js");
const journey=read("runtime/alpha-journey-surface-32800.js");
const menmaBattle=read("runtime/alpha-menma-evolved-pl-battle-36900.js");
const menmaReward=read("runtime/alpha-menma-origin-rewards-36200.js");
const miraiBattle=read("runtime/alpha-mirai-origin-battle-338.js");
const index=read("index.html");
const game=read("game.js");
const fingerprint=read("runtime/alpha-runtime-build-fingerprint-303.js");

for(const [name,src] of Object.entries({binder,sceneA,sceneB,sceneC,golden,shim335,shim336,shim337,board,battle,journey,menmaBattle,menmaReward,miraiBattle,kakashiRenderer})){
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
  "Assets/Academy Student/academy_menma.png","Assets/Tailed Beasts/menma_nine_tails.png","NPC/menma_instructor.png","Assets/Special Jonin/sj_anko.png",
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
assert(sceneA.includes('if(id.startsWith("izu_river_"))return["wasabi","target"]'),"Wasabi River route does not stage the pursuit target actor");
assert(sceneA.includes('if(id.startsWith("izu_finish_river_")||id.startsWith("izu_finish_intercept_"))return["wasabi","target","proctor"]'),"Wasabi successful pursuit finish does not stage target + proctor");
for(const asset of ["NPC/furniture_civilian.png","NPC/vegetable_vendor.png","NPC/equipment_custodian.png","NPC/delivery_worker.png","NPC/runaway_cart_civillian.png","NPC/obito_instructor.png"]){
  assert(sceneC.includes(asset),"Obito native Scene Board did not consume #419 asset "+asset);
}
const menmaActorBody=binder.slice(binder.indexOf("function menmaActors("),binder.indexOf("function kushinaActors("));
assert(fs.existsSync("Assets/Tailed Beasts/menma_nine_tails.png"),"approved Menma Nine-Tails portrait missing from live tree");
assert(binder.includes('menmaNineTails:"Assets/Tailed Beasts/menma_nine_tails.png"')&&menmaActorBody.includes('actor("menma_nine_tails","NINE-TAILS",PATH.menmaNineTails'),"Menma Nine-Tails portrait is not bound to its Story speaker");
assert(golden.includes('row.mode="dialogue";row.speakerRef={sourceId:"nine_tails"'),"Menma Nine-Tails speech is not speaker-owned dialogue");
assert(!golden.includes("Combat package (#338)")&&!golden.includes("waiting on the exact Academy instructor"),"Mirai leaks internal Combat/GitHub blocker text");
assert(!golden.includes("mir_shortcut_follow_blocked"),"Mirai shortcut Battle remains blocked after #338 closure");
assert(golden.includes('beatId:"mir_shortcut_battle"')&&golden.includes('beatId:"mir_shortcut_battle_return"')&&golden.includes('MIRAI_SHORTCUT_CALLER="academy_mirai_origin_shortcut_battle"'),"Mirai shortcut #338 caller/return missing");
assert(golden.includes('beatId:"mir_confront_battle"')&&golden.includes('beatId:"mir_confrontation_battle_return"')&&golden.includes('MIRAI_CONFRONT_CALLER="academy_mirai_origin_confrontation_battle"'),"Mirai confrontation #338 caller/return missing");
assert(golden.includes('function miraiBattleAuthoredValue(key)')&&golden.includes('miraiBattleAuthoredValue("battleResult")==="defeat"')&&golden.includes('miraiBattleAuthoredValue("battleResult")==="victory"'),"Mirai #338 return routing does not consume the factual Battle result");
assert(golden.includes('C("defeat","RESOLVE SHORTCUT DEFEAT","mir_shortcut_defeat_01"')&&golden.includes("Mirai's footing gives first.")&&golden.includes('text:"Why did you stop?"')&&golden.includes('text:"Because you did."')&&golden.includes('beatId:"mir_shortcut_defeat_route_router"')&&golden.includes('mir_road_post_defeat_talk_01'),"Mirai shortcut defeat continuation missing or drifted");
assert(golden.includes('C("defeat","RESOLVE CONFRONTATION DEFEAT","mir_confrontation_defeat_01"')&&golden.includes("Mirai's guard breaks before the Traveller's does.")&&golden.includes('text:"You can\'t keep fighting."')&&golden.includes('text:"I can keep asking."')&&golden.includes('text:"Good."'),"Mirai confrontation defeat continuation missing or drifted");
assert(golden.includes('actionLabel:"Start PL Battle"')&&golden.includes('C("reveal","RESOLVE CONFRONTATION RETURN","mir_confront_reveal_01"')&&golden.includes('N("mir_confront_reveal_01","Smoke bursts across the road.')&&golden.includes('"mir_confront_08"'),"Mirai #338 Story CTA/Battle-to-reveal return drift");
assert(binder.includes('if(id==="mir_confront_reveal_01")')&&binder.includes('rows.push(instructor())'),"Mirai post-Battle reveal does not switch Story actor to female instructor");
assert(miraiBattle.includes('const CONFIG="academy_mirai_origin_disguised_instructor_battle"')&&miraiBattle.includes('const ENCOUNTER="origin_academy_mirai_disguised_instructor_assessment"'),"Mirai #338 config/encounter missing");
assert(miraiBattle.includes('const CALLERS=Object.freeze([SHORTCUT_CALLER,CONFRONT_CALLER])')&&miraiBattle.includes('const FIXED_VICTORY_RYO=50'),"Mirai #338 callers/reward drift");
assert(miraiBattle.includes('observerPresentation:"male_traveller_escort_disguise"')&&miraiBattle.includes('underlyingIdentity:"female_academy_instructor"'),"Mirai #338 disguise identity separation missing");
assert(miraiBattle.includes('const BATTLE_PORTRAIT="NPC portrait/mirai_instructor_disguised.png"')&&fs.existsSync("NPC portrait/mirai_instructor_disguised.png"),"Mirai approved disguised-instructor Battle portrait missing");
assert(index.includes('<script src="runtime/alpha-mirai-origin-battle-338.js"></script>'),"Mirai #338 runtime is not production-loaded");
assert(golden.includes('beatId:"mir_leaving_choice_router",mode:"resolver",machineResolved:true')&&!golden.includes('beatId:"mir_leaving_router"'),"Mirai terminal still exposes the stale empty/fake Continue router");
assert(golden.includes('beatId:"mir_receipt",mode:"record"')&&binder.includes('mir_receipt:()=>[{kind:"record",text:buildMiraiReceipt105()}]'),"Mirai Origin Chronicle Receipt missing");
assert(golden.includes('beatId:"menma_receipt",mode:"record"')&&binder.includes('menma_receipt:()=>[{kind:"record",text:buildMenmaReceipt105()}]'),"Menma Origin Chronicle Receipt missing");
assert(golden.includes('beatId:"menma_after_performance_router",mode:"resolver",machineResolved:true')&&golden.includes('beatId:"menma_part_optional_router",mode:"resolver",machineResolved:true'),"Menma post-Battle conditional dialogue is not routed through hidden deterministic resolvers");
assert(!golden.includes('mode:"post_battle",speakerName:"ANKO",text:""')&&!golden.includes('mode:"post_battle",speakerName:"MENMA",text:""'),"Menma still contains empty post-Battle speaker panels");
assert(!menmaReward.includes("FIXED ENCOUNTER REWARD")&&!menmaReward.includes("No generic Character EXP"),"Menma Victory screen still contains internal reward diagnostic prose");
const order=[
 "game.js","runtime/alpha-origin-starting-purse-409.js","runtime/alpha-story-machine-resolver-343.js",
 "runtime/academy-wasabi-writing-golden-343.js","runtime/alpha-origin-scenes-32900-a.js",
 "runtime/alpha-battle-modern-33000.js","runtime/alpha-wasabi-rogue-battle-343.js",
 "runtime/alpha-menma-evolved-pl-battle-36900.js","runtime/alpha-mirai-origin-battle-338.js","runtime/alpha-origin-writing-golden-105.js",
 "runtime/alpha-origin-scene-board-bindings-105.js"
].map(x=>index.indexOf(x));
assert(order.every(x=>x>=0),"#105 production loader missing module");
assert(order.every((x,i)=>i===0||x>order[i-1]),"#105 production load order drift");
assert(board.includes('data-sc-performance')||board.includes("scPerformance"),"shared Story performance mode missing");
assert(board.includes("click")&&board.includes("advanceStoryScene"),"shared Story click-anywhere owner missing");
assert(board.includes('p.cue&&p.cue.kind==="record"')&&board.includes("USE CONTINUE TO CONFIRM"),"Chronicle Receipt stage-click/keyboard lock missing from shared Scene Board");
assert(kakashiRenderer.includes('root.dataset.canAdvance="false"')&&kakashiRenderer.includes('root.dataset.preset==="chronicle_receipt"'),"Kakashi Receipt can still bypass its dedicated button");
assert(sceneBoardDoc.includes("GLOBAL ORIGIN RECEIPT INPUT LOCK"),"durable global Receipt input lock missing");
assert(sceneA.includes('actionLabel:"Start PL Battle"')&&((sceneB.match(/actionLabel:"Start PL Battle"/g)||[]).length===2)&&menmaBattle.includes('beat.battle.actionLabel="Start PL Battle"')&&golden.includes('actionLabel:"Start PL Battle"')&&kakashiRenderer.includes('label:"Start PL Battle"'),"global Start PL Battle CTA text is not applied to current Origin Battle seams");
assert(journey.includes('background:linear-gradient(180deg,#a82222,#5d0d0d)')&&kakashiRenderer.includes('background:linear-gradient(180deg,#a82222,#5d0d0d)'),"global Start PL Battle CTA is not red in shared/Kakashi presentation");
assert(sceneBoardDoc.includes("GLOBAL STORY → PL BATTLE CTA"),"durable global PL Battle CTA lock missing");
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
assert(fingerprint.includes('buildId:"SC-ALPHA-RUNTIME-R303-2026-09-29-AZ"')&&fingerprint.includes('sourceBaselineCommit:"604daa50b3bc274fd6533fdeb8075806e614d30b"'),"#105 repair runtime fingerprint was not advanced from current live-main authority");
console.log(JSON.stringify({pass:true,issue:105,checks:{
  sevenNonKakashiBindings:true,kakashiExcluded:true,hinataSparringSpeakerAlias:true,hinataFinalPairBound:true,hinataChronicleReceipt:true,miraiMenmaWritingGolden:true,legacyGoldenShimsRetired:true,knownAssetsExact:true,issue419AssetsConsumed:true,wasabiPursuitTargetActorProjection:true,missingAssetsNotGuessed:true,
  menmaNineTailsDialoguePortrait:true,miraiBattle338:true,miraiTerminalRouterClean:true,miraiMenmaReceipts:true,menmaPostBattleSegmented:true,menmaRewardDiagnosticRemoved:true,globalReceiptInputLock:true,globalStartPLBattleCTA:true,loadOrder:true,sharedSceneBoard:true,clickAnywhere:true,
  speakerLinkedDialogue:true,globalCyanStoryFrames:true,kakashiFrameParity:true,kakashiTextAndAdvanceParity:true,radialPLContainmentRefresh:true,frozenCorePreserved:true,browserGoldenClaimed:false
}},null,2));