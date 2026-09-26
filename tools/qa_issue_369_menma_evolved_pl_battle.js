#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const RUNTIME="runtime/alpha-menma-evolved-pl-battle-36900.js";
const INDEX="index.html";
const GAME="game.js";
const REWARD="runtime/alpha-menma-origin-rewards-36200.js";
const PRESENTATION="runtime/alpha-battle-modern-33000.js";
const runtime=fs.readFileSync(path.join(ROOT,RUNTIME),"utf8");
const index=fs.readFileSync(path.join(ROOT,INDEX),"utf8");
const game=fs.readFileSync(path.join(ROOT,GAME),"utf8");
const reward=fs.readFileSync(path.join(ROOT,REWARD),"utf8");
const presentation=fs.readFileSync(path.join(ROOT,PRESENTATION),"utf8");

new vm.Script(runtime,{filename:RUNTIME});
new vm.Script(presentation,{filename:PRESENTATION});

const script='<script src="'+RUNTIME+'"></script>';
assert.strictEqual(index.split(script).length-1,1,"#369 runtime must load exactly once");
assert(index.indexOf(script)>index.indexOf('<script src="runtime/alpha-battle-modern-33000.js"></script>'),"#369 must load after shared Battle presentation");
assert(index.indexOf(script)>index.indexOf('<script src="runtime/alpha-menma-origin-rewards-36200.js"></script>'),"#369 must load after reward adapter");

for(const value of [
  "academy_menma_origin_three_test_subjects_with_anko",
  "origin_academy_menma_prologue:three_test_subjects",
  "stop_three_test_subjects",
  "menma_origin_half_scripted_anko_takedown"
])assert(runtime.includes(value),"#369 missing successor authority "+value);

assert(runtime.includes('player:{slots:createBattleDeploymentSlots([ANKO_ID,MENMA_ID])}'),"Anko must start Active with Menma Benched");
assert(runtime.includes('skillId:"sj_anko_hidden_shadow_snake_hands"')&&runtime.includes("attackPL:20")&&runtime.includes("expectedDamage:18"),"Phase A package drift");
assert(runtime.includes('skillId:"sj_anko_fire_style_dragon_flame"')&&runtime.includes("attackPL:24")&&runtime.includes("expectedDamage:21"),"Phase B package drift");
assert(runtime.includes("ordinarySideOpportunityConsumed:false"),"scripted A/B must not consume ordinary side opportunity");
assert(!/commitScriptedAnkoPhase[\s\S]{0,5000}consumeBattleActionOpportunity/.test(runtime),"scripted A/B consumed ordinary opportunity");

assert(runtime.includes("presentation_pending_withdrawal"),"0-PL relay must wait for visible action settle");
assert(runtime.includes("advanceMenmaScriptedBattleAfterPresentation37300"),"presentation-settle continuation hook missing");
assert(presentation.includes("advanceMenmaScriptedBattleAfterPresentation37300(active.receipt)"),"33000 does not release scripted continuation after visible settle");
assert(runtime.includes('advanceBattleParticipantAtZeroPL("enemy",from)'),"scripted enemy relay must use shared deployment queue");
assert(runtime.includes('relayTo:next&&next.id||null'),"relay evidence missing exact next Active");

assert(runtime.includes('b.deployment.player={slots:createBattleDeploymentSlots([MENMA_ID,ANKO_ID])}'),"Anko->Menma authored yield missing");
assert(runtime.includes("ankoRemainsDeployed:true"),"Anko yield must not fabricate withdrawal");
assert(runtime.includes("menmaReceivesFirstNormalPlayerOpportunity:true"),"Phase C first Menma input contract missing");
assert(runtime.includes('s.phase!=="phase_c_player"'),"player input not scoped to Phase C");
assert(runtime.includes('enemy.id!=="test_subject_unstable"'),"ordinary enemy phase must be Unstable-only");

assert(runtime.includes("men03Eligible:false"),"scripted A/B not explicitly excluded from MEN-03");
assert(runtime.includes('men03Scope:"phase_c_only"'),"MEN-03 Phase C scope marker missing");
assert(runtime.includes('tutorialResult:"not_completed"')&&runtime.includes("performanceBucket:null"),"Phase C failure must not fake LOW");
assert(game.includes('record.actorRef.participantId==="academy_menma"'),"baseline MEN-03 actor filter drifted");

assert(runtime.includes('plIdentity:"Battle PL"'),"Battle PL identity marker missing");
assert(!/\bHP\b/.test(runtime),"#369 introduced HP terminology");
assert(runtime.includes("battlePLWithdrawalNotDeath:true"),"0 Battle PL withdrawal semantics missing");
assert(runtime.includes('BATTLE_OCCURRENCE_PREFIX="battle_occ_origin_academy_menma_three_test_subjects:"'),"whole-encounter receipt prefix drift");
assert(runtime.includes("resolvedHostileIds:victory?[...HOSTILE_IDS]"),"victory receipt must resolve all three exact hostiles");
assert(reward.includes("const FIXED_RYO=100"),"#362 exact 100 Ryō adapter drifted");
assert(reward.includes("menma_three_subject_battle_receipt_missing"),"#362 reward adapter no longer fail-closed");

assert(runtime.includes("saveTestState")&&runtime.includes("restoreTestState"),"half-scripted state save/load missing");
assert(runtime.includes("pendingBattlePresentation33000"),"restore does not reconcile presentation-gated pending zero");
assert(runtime.includes("rngChoices")&&runtime.includes("persistBattleSnapshot"),"Phase C committed RNG persistence missing");
assert(runtime.includes("canWithdrawActiveBattleFighter")&&runtime.includes("return false"),"manual WITHDRAW must remain blocked");

assert(runtime.includes('PLAYER_OBJECTIVE_TEXT="Stop the Test Subjects."'),"successor objective copy missing");
assert(runtime.includes('BATTLE_ENVIRONMENT_PATH="Scene backdrops/forest_clearing_day.png"'),"forest clearing environment missing");
assert(presentation.includes("record.current"),"support Remaining PL projection still reads stale record.remaining");
assert(presentation.includes("menma_origin_scripted_anko_takedown_completed"),"ordered playback does not recognize scripted Anko takedown");
assert(presentation.includes("battle2-formation-relay-in"),"relay slide/scale presentation hook missing");

assert(!runtime.includes("academy_kakashi"),"#369 must not touch frozen Kakashi");
assert(!runtime.includes("choose one Skill from every active member"),"#369 accidentally consumed Beta batching");

const checks={
  syntax:true,
  productionLoadOnce:true,
  exactHalfScriptedIdentity:true,
  ankoStartsActive:true,
  phaseAExact:true,
  phaseBExact:true,
  scriptedActionsNotOrdinaryTurns:true,
  presentationGatedWithdrawal:true,
  sharedRelayQueue:true,
  ankoYieldsToMenma:true,
  menmaPhaseCFirstInput:true,
  unstableOnlyPhaseCEnemy:true,
  men03PhaseCOnly:true,
  failureNoFakeLow:true,
  wholeEncounterReceipt:true,
  exact100RyoPreserved:true,
  saveReloadIdempotenceContract:true,
  forestPresentationBound:true,
  kakashiFrozen:true,
  beta366Excluded:true
};
console.log(JSON.stringify({pass:true,issue:369,checks,browserGoldenClaimed:false},null,2));
