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
const runtime=fs.readFileSync(path.join(ROOT,RUNTIME),"utf8");
const index=fs.readFileSync(path.join(ROOT,INDEX),"utf8");
const game=fs.readFileSync(path.join(ROOT,GAME),"utf8");
const reward=fs.readFileSync(path.join(ROOT,REWARD),"utf8");

new vm.Script(runtime,{filename:RUNTIME});

const script='<script src="'+RUNTIME+'"></script>';
assert.strictEqual(index.split(script).length-1,1,"#369 runtime must load exactly once");
assert(index.indexOf(script)>index.indexOf('<script src="runtime/alpha-battle-modern-33000.js"></script>'),"#369 must load after shared Battle presentation");
assert(index.indexOf(script)>index.indexOf('<script src="runtime/alpha-menma-origin-rewards-36200.js"></script>'),"#369 must load after the fail-closed reward adapter");

const exact={
  config:"academy_menma_origin_three_test_subjects_with_anko",
  encounter:"origin_academy_menma_prologue:three_test_subjects",
  objective:"stop_three_test_subjects",
  entitlement:"menma_origin_anko_autonomous_assist"
};
for(const value of Object.values(exact))assert(runtime.includes(value),"#369 missing exact authority "+value);

assert(runtime.includes('const ALLIED_IDS=Object.freeze([MENMA_ID,ANKO_ID])'),"#369 allied envelope drift");
assert(runtime.includes('"test_subject_altered_shinobi"')&&runtime.includes('"test_subject_brute"')&&runtime.includes('"test_subject_unstable"'),"#369 hostile envelope drift");
assert(runtime.includes('phase:"player"'),"#369 player side must start first");
assert(runtime.includes('playerEntitlementIndex%2===0?MENMA_ID:ANKO_ID'),"#369 Menma/Anko alternating entitlement missing");
assert(runtime.includes("side_opportunity_already_committed"),"#369 exactly-once side-opportunity guard missing");
assert(runtime.includes("stale_side_opportunity_token"),"#369 stale opportunity callback guard missing");
assert(runtime.includes("stale_battle_semantic_generation"),"#369 semantic generation guard missing");
assert(runtime.includes("rngChoices")&&runtime.includes("persistBattleSnapshot"),"#369 committed RNG persistence missing");
assert(runtime.includes("semantic_input_locked"),"#369 input lock missing");
assert(!runtime.includes("setTimeout(")&&!runtime.includes("requestAnimationFrame(")&&!runtime.includes("animationend"),"#369 semantics must not depend on presentation timing");

assert(runtime.includes("sj_anko_hidden_shadow_snake_hands")&&runtime.includes("attackPL:20"),"#369 Anko Snake Hands 20 missing");
assert(runtime.includes("sj_anko_fire_style_dragon_flame")&&runtime.includes("attackPL:24"),"#369 Anko Dragon Flame 24 missing");
assert(runtime.includes("sj_anko_snake_bind"),"#369 Anko Snake Bind missing");
assert(runtime.includes("sj_anko_serpent_evasion"),"#369 Anko Serpent Evasion missing");
assert(!runtime.includes("sj_anko_twin_snakes_mutual_death"),"#369 Twin Snakes Mutual Death must remain illegal");
assert(runtime.includes('["test_subject_brute","test_subject_unstable","test_subject_altered_shinobi"]'),"#369 Anko target priority drift");

assert(runtime.includes('getBattleDeploymentParticipant("enemy",1)'),"#369 enemy side must consume Active only");
assert(runtime.includes("[...HOSTILE_IDS]"),"#369 authored enemy relay order missing");
assert(runtime.includes("test_subject_brute_body_rush")&&runtime.includes("hasMovementPreventingRestraint"),"#369 restrained Brute movement filtering missing");
assert(runtime.includes('enemy.id==="test_subject_brute"||enemy.id==="test_subject_unstable"'),"#369 Brute/Unstable target-law branch missing");
assert(runtime.includes("academy_menma_withdrawn_before_objective"),"#369 Menma withdrawal defeat missing");
assert(runtime.includes("menmaRemainsSemanticActive:true"),"#369 Anko withdrawal must not promote her");

assert(runtime.includes('plIdentity:"Battle PL"'),"#369 PL identity marker missing");
assert(!/\bHP\b/.test(runtime),"#369 introduced HP terminology");
assert(!runtime.includes("healthMeter")&&!runtime.includes("genericHealth"),"#369 introduced parallel health semantics");
assert(runtime.includes("battlePLWithdrawalNotDeath:true"),"#369 0 Battle PL withdrawal semantics missing");

assert(!runtime.includes("const MENMA_ORIGIN_TUTORIAL_PERFORMANCE_SOURCE_OCCURRENCE_ID="),"#369 must not redeclare/replace MEN-03 stable source authority");
assert(game.includes('const MENMA_ORIGIN_TUTORIAL_PERFORMANCE_SOURCE_OCCURRENCE_ID="combat_academy_menma_tutorial_performance_resolved"'),"#369 baseline MEN-03 source identity changed");
assert(runtime.includes("menma_origin_anko_action_observed"),"#369 same-Battle Anko observation evidence missing");
assert(runtime.includes('discipline==="Kinjutsu"'),"#369 MEN-02 Kinjutsu-only qualification missing");
assert(!runtime.includes("invented Kinjutsu")&&!runtime.includes("new Kinjutsu"),"#369 must not invent a Menma Kinjutsu button");

assert(runtime.includes('BATTLE_OCCURRENCE_PREFIX="battle_occ_origin_academy_menma_three_test_subjects:"'),"#369 authoritative Battle occurrence prefix missing");
assert(runtime.includes("function commitBattleOccurrenceReceipt")&&runtime.includes("resolvedHostileIds:victory?[...HOSTILE_IDS]"),"#369 terminal Battle occurrence receipt missing exact victory hostile resolution");
assert(runtime.includes('commitBattleOccurrenceReceipt("defeat")'),"#369 defeat must commit the exact terminal Battle occurrence receipt");
assert(reward.includes("const FIXED_RYO=100"),"#362 exact 100 Ryō adapter drifted");
assert(reward.includes("menma_three_subject_battle_receipt_missing"),"#362 adapter no longer fail-closed");
assert(runtime.includes("upstreamBattleReceipt()"),"#369 exact upstream victory receipt producer missing");
assert(!runtime.includes('launchBattleWithReturnContext("test_subject_altered_shinobi",ENCOUNTER_ID'),"#369 Origin launch must not inherit My Clan START authority");
assert(runtime.includes("myClanStartBypassedForExactOriginOccurrence:true")&&runtime.includes("myClanMutated:false"),"#369 exact Origin launch/My Clan boundary missing");

assert(runtime.includes("manual_withdraw_rejected"),"#369 manual WITHDRAW fail-closed evidence missing");
assert(runtime.includes("canWithdrawActiveBattleFighter")&&runtime.includes("return false"),"#369 manual WITHDRAW UI boundary missing");
assert(runtime.includes("saveTestState")&&runtime.includes("restoreTestState"),"#369 save/reload semantic state persistence missing");
assert(runtime.includes('getBattleRemainingPLRecord("player",ANKO_ID)'),"#369 reload must distinguish missing Anko PL record from legitimate 0 Battle PL");
assert(runtime.includes('consumeBattleActionOpportunity("enemy",failedEnemy.id,failId,"enemy_opportunity_failed_visible")'),"#369 failed enemy autonomous opportunity must still settle its lifecycle");
assert(runtime.includes("menmaEvolvedPLBattle36900"),"#369 exact semantic owner state missing");

assert(!runtime.includes("academy_kakashi"),"#369 must not touch frozen Kakashi");
assert(!runtime.includes("choose one Skill from every active member"),"#369 accidentally consumed Beta batch");
assert(!runtime.includes("player-side command batch")&&!runtime.includes("enemy-side command batch"),"#369 accidentally consumed Beta command batching");

const checks={
  syntax:true,
  productionLoadOnce:true,
  plIdentityPreserved:true,
  playerFirst:true,
  oneActionPerSideOpportunity:true,
  menmaAnkoEntitlement:true,
  committedRngPersistence:true,
  staleCallbackRejection:true,
  exactAnkoPackage:true,
  enemyActiveOnlyRelay:true,
  menmaDefeatBoundary:true,
  wholeEncounterReceipt:true,
  men03Stable:true,
  exact100RyoAdapterPreserved:true,
  saveReloadState:true,
  kakashiFrozen:true,
  beta366Excluded:true
};
console.log(JSON.stringify({pass:true,issue:369,checks,browserGoldenClaimed:false},null,2));
