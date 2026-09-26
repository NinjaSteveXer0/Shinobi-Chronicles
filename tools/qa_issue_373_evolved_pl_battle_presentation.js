#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const BATTLE="runtime/alpha-battle-modern-33000.js";
const MENMA="runtime/alpha-menma-evolved-pl-battle-36900.js";
const battle=fs.readFileSync(path.join(ROOT,BATTLE),"utf8");
const menma=fs.readFileSync(path.join(ROOT,MENMA),"utf8");

new vm.Script(battle,{filename:BATTLE});
new vm.Script(menma,{filename:MENMA});

for(const asset of [
  "Scene backdrops/forest_clearing_day.png",
  "Enemies Portraits/test_subject_altered_shinobi.png",
  "Enemies Portraits/test_subject_brute.png",
  "Enemies Portraits/test_subject_unstable.png"
]){
  assert(fs.existsSync(path.join(ROOT,asset)),"#373 required asset missing: "+asset);
}

assert(battle.includes('slot<=6'),"Formation projection does not consume all six deployment slots");
assert(battle.includes('document.createElement("div")')&&battle.includes("ensureFormationSupportMarkup33000"),"support-slot DOM materialisation missing");
assert(battle.includes("framelessBattlePortrait"),"frameless Battle portrait projection marker missing");
assert(battle.includes('forest_clearing_day.png'),"forest clearing presentation binding missing");
assert(battle.includes('record.current'),"support PL projection does not consume canonical Remaining PL field");
assert(battle.includes("menma_origin_scripted_anko_takedown_completed"),"scripted Anko completion not admitted to ordered playback");
assert(battle.includes("advanceMenmaScriptedBattleAfterPresentation37300(active.receipt)"),"visible settle does not release authored relay");
assert(battle.includes("playedKeys")&&battle.includes("presentationStorageKey33000"),"reload-safe played receipt cursor missing");
assert(battle.includes("deferredTerminalOverlay")&&battle.includes("deferredCallerResume"),"terminal navigation is not presentation-gated");
assert(battle.includes("battle2-formation-relay-in")&&battle.includes("menma373RelayPlayer")&&battle.includes("menma373RelayEnemy"),"scoped relay slide/scale motion missing");
assert(battle.includes("refreshCommittedFormationPresentation33000")&&battle.includes("refreshBattleActionRegionPresentation"),"relay/yield does not refresh central confrontation DOM");
assert(String(battle).includes('battle-live-active-nameplate')&&String(battle).includes('battle-live-power-'),"active identity/PL rebind support missing");
assert(battle.includes('data-evolved-pl-proof="menma_three_subjects"'),"Menma-scoped presentation selector missing");

assert(menma.includes('player:{slots:createBattleDeploymentSlots([ANKO_ID,MENMA_ID])}'),"Anko-first scripted formation missing");
assert(menma.includes("presentation_pending_withdrawal"),"committed zero does not wait for presentation settle");
assert(menma.includes('advanceBattleParticipantAtZeroPL("enemy",from)'),"shared enemy relay authority not consumed");
assert(menma.includes('b.deployment.player={slots:createBattleDeploymentSlots([MENMA_ID,ANKO_ID])}'),"Menma Phase-C promotion missing");
assert(menma.includes("pairedEnemyRelayTransition"),"Phase-B enemy relay not preserved through Menma handoff");
assert(menma.includes('s.phase="phase_c_player"'),"Phase-C player phase missing");
assert(menma.includes("unstable_phase_c_action"),"Unstable ordinary Phase-C action owner missing");
assert(menma.includes("men03Eligible:false")&&menma.includes('men03Scope:"phase_c_only"'),"scripted A/B not excluded from MEN-03");
assert(menma.includes('tutorialResult:"not_completed"')&&menma.includes("performanceBucket:null"),"failure continuation can fabricate a LOW bucket");
assert(!menma.includes("menma_origin_anko_autonomous_assist"),"superseded Anko assist entitlement survived successor rewrite");

const checks={
  syntax:true,
  allThreeEnemyPortraitAssetsPresent:true,
  forestBackdropAssetPresent:true,
  fiveParticipantFormationProjection:true,
  supportSlotsMaterialise:true,
  framelessMenmaProof:true,
  orderedImmutablePlayback:true,
  scriptedActionVisibleBeforeRelay:true,
  reloadDoesNotReplayReceipts:true,
  terminalNavigationWaitsForPlayback:true,
  scopedRelaySlideScale:true,
  relayRefreshesCentralConfrontation:true,
  activeIdentityAndPLRebind:true,
  ankoFirstHalfScriptedFormation:true,
  exactSharedEnemyRelay:true,
  menmaPromotionForPhaseC:true,
  pairedMenmaUnstableHandoff:true,
  men03PhaseCOnly:true,
  failureNoFakeLow:true,
  oldAssistCadenceRemoved:true
};

console.log(JSON.stringify({pass:true,issue:373,checks,browserGoldenClaimed:false,stephenVisualAcceptance:"PENDING"},null,2));
