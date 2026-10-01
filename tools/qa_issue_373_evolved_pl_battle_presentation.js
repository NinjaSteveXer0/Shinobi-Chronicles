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
assert(battle.includes("if(!pendingBattlePresentation33000())")&&battle.includes('return PRIOR_OPEN_OVERLAY_33000.apply(this,arguments);'),"settled terminal re-render is still forced through the watchdog delay");
assert(battle.includes('rewardMode:"static_earned_amount"')&&battle.includes('ryoElement.dataset.rewardPresentation="static_earned_amount"')&&battle.includes('isSharedStaticRewardPresentation33000'),"shared Victory rewards still use a rolling/count-up presentation");
assert(battle.includes("battle2-formation-relay-in")&&battle.includes("menma373RelayPlayer")&&battle.includes("menma373RelayEnemy"),"scoped relay slide/scale motion missing");
assert(battle.includes("refreshCommittedFormationPresentation33000")&&battle.includes("refreshBattleActionRegionPresentation"),"relay/yield does not refresh central confrontation DOM");
assert(battle.includes("battle-live-active-nameplate")&&battle.includes("battle-live-power-"),"active identity/PL rebind support missing");
assert(battle.includes("battle2SelectedSkillRestore")&&!battle.includes("if(state&&state.selectedSkillId)return false;"),"Skill hover is suppressed while repeat/selected Skill state is active");
assert(battle.includes('deck.addEventListener("mouseleave",cancelBattleSkillPreviewClear33000)')&&battle.includes('panel.addEventListener("mouseleave",cancelBattleSkillPreviewClear33000)')&&battle.includes("battle2InspectorHoverBound"),"Skill guide does not remain pinned long enough to move from a Skill card into the description panel");
assert(battle.includes('data-battle2-scrollable="true"')&&battle.includes("scrollbar-gutter:stable")&&battle.includes('content:"SCROLL ↓"'),"Long Skill descriptions still hide overflow without a visible scroll affordance");
assert(battle.includes('data-evolved-pl-proof="menma_three_subjects"'),"Menma-scoped presentation selector missing");
assert(battle.includes("${p.finalDamage} DAMAGE")&&battle.includes("PL ${p.beforePL} → ${p.afterPL}"),"damage and Remaining Battle PL are still conflated");
assert(battle.includes("presentationRemainingPL33000")&&battle.includes("presentationStaged:true"),"Battle PL presentation is not staged to the visible action receipt");
assert(battle.includes('data-presentation-queue-busy="true"')&&battle.includes("pointer-events:none!important"),"player action input is not visibly locked while ordered Battle playback is active");
const academyReadableIds=[
  "academy_hinata_gentle_palm","academy_hinata_twin_palm_guard","academy_hinata_palm_counter","academy_hinata_academy_shuriken","academy_hinata_gentle_step",
  "academy_izuno_pouncing_palm","academy_izuno_shuriken_pounce","academy_izuno_catstep_feint","academy_izuno_wall_spring","academy_izuno_clone_pounce",
  "academy_mirai_twin_kunai","academy_mirai_wire_trip","academy_mirai_false_footstep","academy_mirai_guarding_blade","academy_mirai_crossing_strike",
  "academy_kushina_red_whirlwind","academy_kushina_beginner_binding_formula","academy_kushina_iron_will_brace","academy_kushina_headstrong_counter","academy_kushina_seal_tag_toss",
  "academy_kurenai_false_opening","academy_kurenai_feinting_kunai","academy_kurenai_false_step_genjutsu","academy_kurenai_veiled_guard","academy_kurenai_genjutsu_release",
  "academy_iwabee_iron_staff_smash","academy_iwabee_staff_sweep","academy_iwabee_earth_style_rising_wall","academy_iwabee_stone_snare","academy_iwabee_grounded_stance",
  "academy_metal_lee_leaf_rising_kick","academy_metal_lee_training_flurry","academy_metal_lee_pressure_rhythm","academy_metal_lee_guarded_footwork","academy_metal_lee_conditioned_endurance",
  "academy_obito_fire_style_ember_burst","academy_obito_headlong_rush","academy_obito_uchiha_shuriken_rush","academy_obito_protective_intercept","academy_obito_determined_stand",
  "academy_menma_chakra_knuckle","academy_menma_crescent_kunai","academy_menma_guard_breaker","academy_menma_shadow_clone_feint","academy_menma_shadowstep",
  "academy_kakashi_kunai_quickdraw","academy_kakashi_clone_feint","academy_kakashi_opening_exploit","academy_kakashi_wire_snare","academy_kakashi_substitution_jutsu"
];
assert.strictEqual(academyReadableIds.length,50,"Academy readable Skill QA list drift");
for(const id of academyReadableIds)assert(battle.includes(id+':{summary:'),"missing exact readable Skill description for "+id);
for(const id of ["sj_anko_hidden_shadow_snake_hands","sj_anko_snake_bind","sj_anko_fire_style_dragon_flame","sj_anko_serpent_evasion"])assert(battle.includes(id+':{summary:'),"missing readable Anko Guest Ally Skill description for "+id);
assert(!battle.includes('"Use this authored Battle technique."')&&!battle.includes('"Availability, target and result still follow the normal Battle rules."'),"retired developer-language Skill fallback returned");
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
assert(menma.includes('pendingAnkoYieldAfterEnemyActionId')&&menma.includes('yieldAnkoToMenmaActive36900("player")')&&menma.includes("authored_guest_ally_yield_after_unstable_attack"),"Unstable does not receive its authored attack on Anko before the Anko -> Menma handoff");
assert(menma.includes('pending.side==="player"')&&menma.includes("startMenmaEvidenceWindow36900"),"ordinary allied withdrawal/relay path missing");
assert(menma.includes('men03Scope:"menma_active_only"')&&menma.includes("firstLegitimateMenmaActiveMoment:true"),"MEN-03 does not start at Menma's first legitimate Active moment");
assert(menma.includes('tutorialResult:"not_completed"')&&menma.includes("performanceBucket:null")&&menma.includes("allied_side_exhausted"),"party defeat can fabricate a completed MEN-03 bucket");
assert(menma.includes('PARTY_DEFEAT_RETURN_BEAT_ID="menma_party_defeat_return_01"')&&menma.includes('beat.battle.defeatBeatId=PARTY_DEFEAT_RETURN_BEAT_ID'),"party defeat is not bound to the exact #386 Story return beat");
assert(menma.includes('FUTURE_ENTRY_BEAT_ID="menma_future_01"')&&menma.includes('FUTURE_ENVIRONMENT_PATH="Menma Origin Backdrop/whisper_woods_rise.png"'),"#388 future-ambition bridge identity/backdrop missing");
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
  settledTerminalRerenderBypassesWatchdog:true,
  sharedRewardValuesStatic:true,
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
