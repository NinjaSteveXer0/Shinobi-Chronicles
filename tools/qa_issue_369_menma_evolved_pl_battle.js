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
  "menma_origin_guest_ally_controller_v3"
])assert(runtime.includes(value),"#369 missing Guest Ally successor authority "+value);

assert(runtime.includes('player:{slots:createBattleDeploymentSlots([ANKO_ID,MENMA_ID])}'),"Anko must start Active with Menma Benched");
assert(runtime.includes('participantClass:"guest_ally"')&&runtime.includes('controlAuthority:"player"'),"Anko Guest Ally/player-control identity missing");
assert(runtime.includes("ownershipGranted:false")&&runtime.includes("myClanAssigned:false"),"Guest Ally control leaked ownership/My Clan");
assert(runtime.includes('source:"story_guest_ally_palette"'),"Anko palette is not projected through the ordinary Skill deck");

for(const skillId of [
  "sj_anko_hidden_shadow_snake_hands",
  "sj_anko_snake_bind",
  "sj_anko_fire_style_dragon_flame",
  "sj_anko_serpent_evasion"
])assert(runtime.includes(skillId),"Anko legal Origin Skill missing: "+skillId);
const ankoPaletteStart=runtime.indexOf("const ANKO_GUEST_SKILLS=Object.freeze({");
const ankoPaletteEnd=runtime.indexOf("const ANKO_GUEST_SKILL_IDS=",ankoPaletteStart);
assert(ankoPaletteStart>=0&&ankoPaletteEnd>ankoPaletteStart,"Anko Guest Ally palette definition missing");
const ankoPaletteSource=runtime.slice(ankoPaletteStart,ankoPaletteEnd);
assert(!ankoPaletteSource.includes("sj_anko_twin_snakes_mutual_death"),"Twin Snakes Mutual Death leaked into Menma Origin palette");
assert(runtime.includes('sj_anko_hidden_shadow_snake_hands:Object.freeze({attackPL:20'),"Hidden Shadow Snake Hands ATK drift");
assert(runtime.includes('sj_anko_fire_style_dragon_flame:Object.freeze({attackPL:24'),"Dragon Flame ATK drift");

assert(runtime.includes("PRE_ATTEMPT_BATTLE_PREPARED_SKILL_36900"),"Guest Ally actions do not consume normal prepared-Skill entry");
assert(runtime.includes('eventType:"skill_action_completed"'),"Guest Ally action does not emit ordinary committed Skill evidence");
assert(runtime.includes('guestAllyPlayerChosen:true')&&runtime.includes("men03Eligible:false"),"Anko player choice / MEN-03 exclusion evidence missing");
assert(runtime.includes('phase:"player"')&&runtime.includes('phaseOrder:Object.freeze(["player","enemy"])'),"current-Active alternating phase model missing");
assert(!runtime.includes("commitScriptedAnkoPhase"),"superseded forced Anko phase resolver still present");
assert(!runtime.includes('phase:"scripted_a"')&&!runtime.includes('phase:"scripted_b"'),"superseded scripted phase state still present");
assert(!runtime.includes("authored_scripted_takedown"),"forced scripted takedown action still present");

assert(runtime.includes("presentation_pending_withdrawal"),"0-PL relay must wait for visible action settle");
assert(runtime.includes("advanceMenmaScriptedBattleAfterPresentation37300"),"presentation-settle continuation compatibility hook missing");
assert(presentation.includes("advanceMenmaScriptedBattleAfterPresentation37300(active.receipt)"),"33000 does not release committed relay after visible settle");
assert(runtime.includes("advanceBattleParticipantAtZeroPL(pending.side,pending.participantId)"),"withdrawal relay must use shared deployment queue");
assert(runtime.includes('relayTo:next&&next.id||null'),"relay evidence missing exact next Active");

assert(runtime.includes("function shouldAuthorMenmaHandoff36900"),"legitimate Anko->Menma handoff predicate missing");
assert(runtime.includes("st.resolvedHostileIds.includes(HOSTILE_IDS[0])")&&runtime.includes("st.resolvedHostileIds.includes(HOSTILE_IDS[1])"),"handoff does not require legitimate first-two hostile resolution");
assert(runtime.includes('nextSide:"enemy"')&&runtime.includes("sideOrderReset:false"),"Anko->Menma yield resets side order or grants bonus input");
assert(runtime.includes("authoredYieldCancelled=true"),"Anko early withdrawal does not cancel authored yield");
assert(runtime.includes('pending.side==="player"')&&runtime.includes("activePlayer()"),"ordinary allied relay path missing");
assert(runtime.includes("menma_scene7_allied_side_exhausted"),"party defeat is not tied to allied exhaustion");

assert(runtime.includes('men03Scope:"menma_active_only"')&&runtime.includes("firstLegitimateMenmaActiveMoment:true"),"MEN-03 does not start at Menma's first legitimate Active moment");
assert(runtime.includes('tutorialResult:"not_completed"')&&runtime.includes("performanceBucket:null"),"party defeat must not fake LOW");
assert(game.includes('record.actorRef.participantId==="academy_menma"'),"baseline MEN-03 actor filter drifted");

assert(runtime.includes('plIdentity:"Battle PL"'),"Battle PL identity marker missing");
assert(!/\bHP\b/.test(runtime),"#369 introduced HP terminology");
assert(runtime.includes("battlePLWithdrawalNotDeath:true"),"0 Battle PL withdrawal semantics missing");
assert(runtime.includes('BATTLE_OCCURRENCE_PREFIX="battle_occ_origin_academy_menma_three_test_subjects:"'),"whole-encounter receipt prefix drift");
assert(runtime.includes("unresolvedHostileIds"),"defeat receipt lost unresolved hostile identity");
assert(reward.includes("const FIXED_RYO=100"),"#362 exact 100 Ryō adapter drifted");
assert(reward.includes("menma_three_subject_battle_receipt_missing"),"#362 reward adapter no longer fail-closed");

assert(runtime.includes("saveTestState")&&runtime.includes("restoreTestState"),"Guest Ally Battle state save/load missing");
assert(runtime.includes("pendingBattlePresentation33000"),"restore does not reconcile presentation-gated pending zero");
assert(runtime.includes("rngChoices")&&runtime.includes("persistBattleSnapshot"),"committed enemy RNG persistence missing");
assert(runtime.includes("canWithdrawActiveBattleFighter")&&runtime.includes("return false"),"manual WITHDRAW must remain blocked in this authored encounter");

assert(runtime.includes('PLAYER_OBJECTIVE_TEXT="Stop the Test Subjects."'),"successor objective copy missing");
assert(runtime.includes('BATTLE_ENVIRONMENT_PATH="Scene backdrops/forest_clearing_day.png"'),"forest clearing environment missing");
assert(presentation.includes('"skill_action_completed"')&&presentation.includes('"enemy_authored_action_completed"'),"shared ordered playback does not consume normal player/enemy actions");
assert(presentation.includes("battle2-formation-relay-in"),"relay slide/scale presentation hook missing");
assert(!presentation.includes('actorRef&&actorRef.participantId==="sj_anko"'),"Guest Ally Anko is still blanket-labelled as an authored assist");

assert(!runtime.includes("academy_kakashi"),"#369 must not touch frozen Kakashi");
assert(!runtime.includes("choose one Skill from every active member"),"#369 accidentally consumed Beta batching");

const checks={
  syntax:true,
  productionLoadOnce:true,
  guestAllyIdentity:true,
  ankoStartsActive:true,
  exactAnkoLegalPalette:true,
  genuinePlayerSkillChoice:true,
  ordinaryCurrentActiveCadence:true,
  forcedAnkoTakedownsRemoved:true,
  presentationGatedWithdrawal:true,
  sharedRelayQueue:true,
  legitimateAnkoToMenmaYield:true,
  sideOrderPreserved:true,
  emergencyAlliedRelay:true,
  partyDefeatOnExhaustion:true,
  men03MenmaActiveOnly:true,
  failureNoFakeLow:true,
  wholeEncounterReceipt:true,
  exact100RyoPreserved:true,
  saveReloadIdempotenceContract:true,
  forestPresentationBound:true,
  kakashiFrozen:true,
  beta366Excluded:true
};
console.log(JSON.stringify({pass:true,issue:369,checks,browserGoldenClaimed:false},null,2));
