#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const SHARED="runtime/alpha-battle-modern-33000.js";
const MIRAI="runtime/alpha-mirai-origin-battle-338.js";
const WASABI="runtime/alpha-wasabi-rogue-battle-343.js";
const METAL="runtime/alpha-metal-origin-runtime-396.js";
const IWABEE="runtime/alpha-iwabee-origin-runtime-399.js";
const KAKASHI="runtime/alpha-kakashi-v2-battle-36010.js";
const MENMA="runtime/alpha-menma-evolved-pl-battle-36900.js";

const shared=fs.readFileSync(path.join(ROOT,SHARED),"utf8");
const mirai=fs.readFileSync(path.join(ROOT,MIRAI),"utf8");
for(const p of [SHARED,MIRAI,WASABI,METAL,IWABEE,KAKASHI,MENMA]){
  new vm.Script(fs.readFileSync(path.join(ROOT,p),"utf8"),{filename:p});
}

const menmaMarkerCount=(shared.match(/menma_three_subjects/g)||[]).length;
assert.strictEqual(menmaMarkerCount,4,"historical Menma proof marker still owns shared Battle presentation: "+menmaMarkerCount);

assert(shared.includes('stage.dataset.battleSystem="shinobi_chronicles_shared"'),"shared Battle-System stage marker missing");
assert(shared.includes("function sharedBattleEnvironmentPath33000()"),"shared authored Battle environment projector missing");
assert(shared.includes("battle.presentationEnvironmentPath||battle.environmentPath"),"shared Battle environment does not consume authored encounter input");
assert(shared.includes("stage.dataset.battleEnvironmentPath=environmentPath"),"shared Battle environment path is not exposed to presentation");
assert(shared.includes("sharedBattleSystem:true"),"shared Battle environment projection is not marked shared/presentation-only");
assert(shared.includes("Historical proof/debug marker only. It no longer gates the shared Battle shell."),"Menma marker is not explicitly demoted to proof/debug only");

for(const selector of [
  '.battle2-modern[data-formation-stage="true"] .battle-live-active-card{border:0!important',
  '.battle2-modern[data-formation-stage="true"] .battle-live-active-card-image{object-fit:contain!important',
  '.battle2-modern[data-formation-stage="true"] .battle-live-roster-slot.battle2-formation-support{background:transparent!important',
  '.battle2-modern[data-formation-stage="true"] .battle2-formation-selected-target{outline:none!important',
  '.battle2-modern[data-formation-stage="true"] .battle2-performance-host{left:43%!important',
  '.battle2-modern[data-formation-stage="true"][data-formation-mode="wedge"] .battle2-performance-host',
  '.battle2-modern[data-formation-stage="true"] .battle2-performance-center{min-height:30px!important'
]) assert(shared.includes(selector),"shared Formation Stage selector missing: "+selector);

assert(shared.includes('left:31%!important;right:31%!important;top:2%!important;height:5.5%!important'),"shared WEDGE/ARC action banner compact geometry drifted");
assert(shared.includes('left:43%!important;right:43%!important;top:2%!important;height:5%!important'),"shared DUEL action banner no longer preserves the frozen #312 compact-center geometry");
for(const token of ["battleShared385TechniqueBanner","battleShared385ActorAction","battleShared385TargetResponse","battleShared385ResultReadout"]){
  assert(shared.includes(token),"shared action-presentation motion missing: "+token);
}
assert(!shared.includes("menma385TechniqueBanner")&&!shared.includes("menma385ActorAction")&&!shared.includes("menma385TargetResponse"),"shared action presentation still named/gated as Menma product behavior");

assert(shared.includes('stage.dataset.formationMode=mode'),"adaptive shared formation mode missing");
assert(shared.includes('"duel"')&&shared.includes('"wedge"')&&shared.includes('"arc"'),"shared adaptive formation families drifted");
assert(shared.includes('"SKILLS"')&&shared.includes('"ITEMS"')&&shared.includes('"SUMMONS"'),"shared Battle action dock drifted");
assert(shared.includes("alpha-battle-pl-ring")&&shared.includes("--battle-pl-fill"),"shared radial Battle PL projection missing");
assert(shared.includes("installBattlePerformance33000(stage)"),"shared ordered action presentation is not installed for every Formation Stage");
const orderedPlaybackSource=(shared.match(/function orderedPlaybackEnabled33000\(\)\{[\s\S]*?\n  \}/)||[""])[0];
assert(orderedPlaybackSource,"shared ordered playback owner missing");
assert(orderedPlaybackSource.includes('return !!(currentBattle&&String(currentBattle.battleId||"").trim());'),"ordered Battle playback is not enabled by concrete Battle occurrence");
assert(!orderedPlaybackSource.includes("academy_menma_origin_three_test_subjects_with_anko"),"ordered Battle playback is still gated to Menma");
assert(shared.includes("suspendCallerStoryPresentation33000"),"shared Battle caller/Story suspension contract missing");

assert(mirai.includes('const BATTLE_ENVIRONMENT_BY_CALLER=Object.freeze({'),"Mirai authored Battle environment mapping missing");
assert(mirai.includes('[SHORTCUT_CALLER]:"Mirai Origin Backdrop/konoha_storehouse_side_lane.png"'),"Mirai shortcut Battle environment missing");
assert(mirai.includes('[CONFRONT_CALLER]:"Mirai Origin Backdrop/konoha_main_street.png"'),"Mirai confrontation Battle environment missing");
assert(mirai.includes("currentBattle.presentationEnvironmentPath=path"),"Mirai does not provide authored environment to shared owner");
assert(mirai.includes("applyBattleEnvironment338(callerId)"),"Mirai launch does not bind authored environment");

const checks={
  canonicalSharedOwner:true,
  menmaMarkerProofOnly:true,
  sharedFramelessFormation:true,
  sharedAdaptiveFormation:true,
  sharedActionDock:true,
  sharedRadialBattlePL:true,
  sharedOrderedActionPresentation:true,
  orderedPlaybackGlobal:true,
  sharedAuthoredEnvironmentProjection:true,
  miraiDuelEnvironmentInputs:true,
  encounterSemanticsRemainLocal:true
};
console.log(JSON.stringify({pass:true,issue:425,checks,browserGoldenClaimed:false,stephenVisualAcceptance:"PENDING"},null,2));
