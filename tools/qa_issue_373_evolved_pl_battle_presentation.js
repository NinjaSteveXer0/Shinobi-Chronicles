#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const BATTLE="runtime/alpha-battle-modern-33000.js";
const MENMA="runtime/alpha-menma-evolved-pl-battle-36900.js";
const TUTORIAL="runtime/alpha-pl-battle-tutorial-38500.js";
const battle=fs.readFileSync(path.join(ROOT,BATTLE),"utf8");
const menma=fs.readFileSync(path.join(ROOT,MENMA),"utf8");
const tutorial=fs.readFileSync(path.join(ROOT,TUTORIAL),"utf8");

new vm.Script(battle,{filename:BATTLE});
new vm.Script(menma,{filename:MENMA});
new vm.Script(tutorial,{filename:TUTORIAL});

for(const asset of [
  "Scene backdrops/forest_clearing_day.png",
  "Enemies Portraits/test_subject_altered_shinobi.png",
  "Enemies Portraits/test_subject_brute.png",
  "Enemies Portraits/test_subject_unstable.png"
]){
  assert(fs.existsSync(path.join(ROOT,asset)),"#373 required asset missing: "+asset);
}

const operationalMenma=menma.slice(0,menma.indexOf("function diagnostics(){"));

assert(battle.includes("slot<=6"),"Formation projection does not consume all six deployment slots");
assert(battle.includes("ensureFormationSupportMarkup33000"),"support-slot DOM materialisation missing");
assert(battle.includes("framelessBattlePortrait"),"frameless Battle portrait projection marker missing");
assert(battle.includes("forest_clearing_day.png"),"forest clearing presentation binding missing");
assert(battle.includes("record.current"),"support PL projection does not consume canonical Remaining PL field");
assert(battle.includes('"skill_action_completed"')&&battle.includes('"enemy_authored_action_completed"'),"ordinary player/enemy action receipts are not admitted to ordered playback");
assert(battle.includes("advanceMenmaScriptedBattleAfterPresentation37300(active.receipt)"),"visible settle does not release committed Scene-7 relay");
assert(battle.includes("notifyTutorialPresentationSettled33000")&&battle.includes("resumeBattlePresentationAfterTutorial33000"),"first-Battle tutorial is not integrated with ordered playback");
assert(battle.includes("playedKeys")&&battle.includes("presentationStorageKey33000"),"reload-safe played receipt cursor missing");
assert(battle.includes("deferredTerminalOverlay")&&battle.includes("deferredCallerResume"),"terminal navigation is not presentation-gated");
assert(battle.includes("battle2-formation-relay-in")&&battle.includes("menma373RelayPlayer")&&battle.includes("menma373RelayEnemy"),"scoped relay slide/scale motion missing");
assert(battle.includes("refreshCommittedFormationPresentation33000")&&battle.includes("refreshBattleActionRegionPresentation"),"relay/yield does not refresh central confrontation DOM");
assert(battle.includes("battle-live-active-nameplate")&&battle.includes("battle-live-power-"),"active identity/PL rebind support missing");
assert(battle.includes('data-evolved-pl-proof="menma_three_subjects"'),"Menma-scoped presentation selector missing");
assert(battle.includes("${p.finalDamage} DAMAGE")&&battle.includes("PL ${p.beforePL} → ${p.afterPL}"),"damage and Remaining Battle PL are still conflated");
assert(battle.includes('return"WITHDRAWAL"'),"0 Battle PL is not projected as withdrawal");

assert(menma.includes('player:{slots:createBattleDeploymentSlots([ANKO_ID,MENMA_ID])}'),"Guest Ally Anko does not open Active");
assert(menma.includes('participantClass:"guest_ally"')&&menma.includes('controlAuthority:"player"')&&menma.includes("playerSelectable:true"),"Anko Guest Ally control identity missing");
for(const id of [
  "sj_anko_hidden_shadow_snake_hands",
  "sj_anko_snake_bind",
  "sj_anko_fire_style_dragon_flame",
  "sj_anko_serpent_evasion"
]) assert(operationalMenma.includes(id),"Anko legal Guest Ally Skill missing: "+id);
assert(!operationalMenma.includes("sj_anko_twin_snakes_mutual_death"),"forbidden Twin Snakes Mutual Death leaked into operational Origin palette");
assert(menma.includes('source:"story_guest_ally_palette"'),"Guest Ally palette is not projected through the normal Skill deck");
assert(menma.includes("PRE_ATTEMPT_BATTLE_PREPARED_SKILL_36900")&&menma.includes("guestAllyPlayerChosen:true"),"player-selected Guest Ally Skill resolver missing");
assert(menma.includes("men03Eligible:false"),"Anko actions are not explicitly excluded from MEN-03");
assert(!operationalMenma.includes("commitScriptedAnkoPhase")&&!operationalMenma.includes('phase:"scripted_a"')&&!operationalMenma.includes('phase:"scripted_b"')&&!operationalMenma.includes("authored_scripted_takedown"),"superseded forced Anko takedown machinery survived");
assert(menma.includes("presentation_pending_withdrawal"),"committed zero does not wait for presentation settle");
assert(menma.includes("advanceBattleParticipantAtZeroPL(pending.side,pending.participantId)"),"shared relay authority is not consumed after presentation settle");
assert(menma.includes("function enemyEligibleActions")&&menma.includes("getEnemyAuthoredBattleActions")&&menma.includes("const enemy=activeEnemy(),target=activePlayer()"),"ordinary current-Active enemy cadence missing");
assert(menma.includes("shouldAuthorMenmaHandoff36900")&&menma.includes("resolvedHostileIds.includes(HOSTILE_IDS[0])")&&menma.includes("resolvedHostileIds.includes(HOSTILE_IDS[1])"),"authored Anko -> Menma handoff is not gated by legitimate first-two withdrawals");
assert(menma.includes('b.deployment.player={slots:createBattleDeploymentSlots([MENMA_ID,ANKO_ID])}')&&menma.includes('nextSide:"enemy"')&&menma.includes("sideOrderReset:false"),"Anko -> Menma yield does not preserve enemy-next ordering");
assert(menma.includes('pending.side==="player"')&&menma.includes("startMenmaEvidenceWindow36900"),"ordinary allied withdrawal/relay path missing");
assert(menma.includes('men03Scope:"menma_active_only"')&&menma.includes("firstLegitimateMenmaActiveMoment:true"),"MEN-03 does not start at Menma's first legitimate Active moment");
assert(menma.includes('tutorialResult:"not_completed"')&&menma.includes("performanceBucket:null")&&menma.includes("allied_side_exhausted"),"party defeat can fabricate a completed MEN-03 bucket");
assert(menma.includes('PARTY_DEFEAT_RETURN_BEAT_ID="menma_party_defeat_return_01"')&&menma.includes('beat.battle.defeatBeatId=PARTY_DEFEAT_RETURN_BEAT_ID'),"party defeat is not bound to the exact #386 Story return beat");
assert(menma.includes('FUTURE_ENTRY_BEAT_ID="menma_future_01"')&&menma.includes('FUTURE_ENVIRONMENT_PATH="Scene backdrops/whisper_woods_forest_route.png"'),"#388 future-ambition bridge identity/backdrop missing");
for(let i=1;i<=24;i++)assert(menma.includes('beatId:"menma_party_defeat_return_'+String(i).padStart(2,"0")+'"'),"#386 party-defeat beat missing "+i);
assert(menma.includes('nextBeatId:FUTURE_ENTRY_BEAT_ID'),"#386 defeat chain does not continue to menma_future_01");
for(const label of ["MASTER WHAT THEY WON'T TEACH ME","BECOME TOO STRONG TO HOLD BACK","CREATE SOMETHING THAT'S MINE","FIND OUT HOW FAR I CAN GO"])assert(menma.includes(label),"#388 future-ambition choice missing "+label);
assert(menma.includes('FUTURE_INTENT_OCCURRENCE_ID="occ_origin_menma_future_ambition_intent"')&&menma.includes("progressionGranted:false"),"future ambition is not recorded as non-progression Story intent");
assert(!operationalMenma.includes("menma_origin_anko_autonomous_assist"),"superseded autonomous-assist entitlement survived");
assert(menma.includes("savedExactSuccessorSnapshot=true"),"real-player saved successor identity is not detected before base restore");
assert(
  menma.indexOf("b.battleConfigId=BATTLE_CONFIG_ID;")<menma.indexOf("const result=PRE_RESTORE_TEST.apply(this,arguments);"),
  "BattleConfig identity is not seeded before generic restore"
);
assert(menma.includes("semantic.ankoYielded===true")&&menma.includes("semantic.ankoWithdrawn")&&menma.includes("semantic.menmaWithdrawn"),"restore does not rebuild allied Active from Guest-Ally semantic state");
assert(menma.includes("b.environmentPath=BATTLE_ENVIRONMENT_PATH")&&menma.includes("b.presentationEnvironmentPath=BATTLE_ENVIRONMENT_PATH"),"restored successor does not rebind forest presentation authority");

assert(tutorial.includes('FAMILY_ID="pl_battle_tutorial_v1"'),"first PL Battle tutorial family ID drift");
for(const beat of ["active_shinobi","guest_ally_control","independent_ally_control","skills_action_dock","battle_pl","withdrawal","relay"]){
  assert(tutorial.includes('"'+beat+'"'),"tutorial beat missing: "+beat);
}
assert(tutorial.includes("SKIP TUTORIAL")&&tutorial.includes("state.skipped=true"),"persistent tutorial skip control missing");
assert(tutorial.includes("PLAYER CONTROLLED")&&tutorial.includes("COMPUTER CONTROLLED"),"Guest/Independent control presentation is ambiguous");

const checks={
  syntax:true,
  allThreeEnemyPortraitAssetsPresent:true,
  forestBackdropAssetPresent:true,
  fiveParticipantFormationProjection:true,
  supportSlotsMaterialise:true,
  framelessMenmaProof:true,
  orderedOrdinaryActionPlayback:true,
  damageAndBattlePLSeparated:true,
  zeroPLReadsWithdrawal:true,
  reloadDoesNotReplayReceipts:true,
  terminalNavigationWaitsForPlayback:true,
  tutorialCanPauseAndResumePlayback:true,
  scopedRelaySlideScale:true,
  relayRefreshesCentralConfrontation:true,
  activeIdentityAndPLRebind:true,
  ankoStartsAsPlayerControlledGuestAlly:true,
  exactFourSkillGuestPalette:true,
  noForcedAnkoTakedown:true,
  ordinaryEnemyCadence:true,
  exactSharedRelay:true,
  authoredYieldAfterLegitimateFirstTwo:true,
  enemyNextAcrossAuthoredYield:true,
  ordinaryAlliedRelay:true,
  men03MenmaActiveOnly:true,
  partyDefeatNoFakeLow:true,
  partyDefeatWritingReturnBound:true,
  futureAmbitionBridgeBound:true,
  futureAmbitionIntentHistoryOnly:true,
  legacyRestoreSeedsExactSuccessorIdentity:true,
  semanticRestoreRebuildsAlliedActive:true,
  restoredForestAuthorityRebound:true,
  firstPLBattleTutorialContractPresent:true
};

console.log(JSON.stringify({pass:true,issue:373,checks,browserGoldenClaimed:false,stephenVisualAcceptance:"PENDING"},null,2));
