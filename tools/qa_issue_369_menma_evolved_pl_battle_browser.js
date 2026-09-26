#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_369_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_369_BROWSER_OUT||"artifacts/issue-369-menma-evolved-pl-battle";
const BUILD_MANIFEST=JSON.parse(fs.readFileSync(path.resolve(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
const SCENE="origin_academy_menma_prologue";
const CONFIG="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE="stop_three_test_subjects";
const MENMA="academy_menma";
const ANKO="sj_anko";
const HOSTILES=["test_subject_altered_shinobi","test_subject_brute","test_subject_unstable"];
const REWARD_SOURCE="menma_origin_battle_three_test_subjects_victory_ryo_01";
const MEN03_SOURCE="combat_academy_menma_tutorial_performance_resolved";

fs.mkdirSync(OUT,{recursive:true});

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}

async function bootScenario(browser,label){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(
    typeof getRuntimeBuildFingerprint==="function"&&
    typeof selectChronicleOrigin==="function"&&
    typeof beginAlphaChronicleOriginPrologue==="function"&&
    typeof runIssue369MenmaEvolvedPLBattleDiagnostics==="function"&&
    typeof getMenmaEvolvedPLBattleState36900==="function"&&
    typeof getMenmaEvolvedPLBattleInputReadiness36900==="function"&&
    globalThis.SC_MENMA_EVOLVED_PL_BATTLE_36900
  ),null,{timeout:30000});

  const fp=await page.evaluate(()=>getRuntimeBuildFingerprint());
  assert.deepStrictEqual(fp,BUILD_MANIFEST,label+" runtime fingerprint mismatch");

  const started=await page.evaluate(()=>({
    selected:selectChronicleOrigin("academy_menma","issue_369_browser"),
    launched:beginAlphaChronicleOriginPrologue()
  }));
  assert(started.selected?.success===true,label+" Menma select failed "+JSON.stringify(started));
  assert(started.launched?.success===true,label+" Menma Story launch failed "+JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene,SCENE,{timeout:15000});
  await page.evaluate(()=>setStorySceneBeat("tutorial_battle"));
  await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="tutorial_battle",null,{timeout:8000});

  const pre=await page.evaluate(()=>({
    clan:typeof getPersistentClanBattleQueueSlots==="function"?getPersistentClanBattleQueueSlots():[],
    ankoOwned:!!getPlayerCharacter("sj_anko"),
    teamIds:Array.isArray(playerTeam)?playerTeam.map(x=>x&&x.id).filter(Boolean):[],
    beat:(()=>{const b=getCurrentStorySceneBeat();return b&&{mode:b.mode,battle:b.battle&&{
      encounterId:b.battle.encounterId,battleConfigId:b.battle.battleConfigId,objectiveId:b.battle.objectiveId,
      objectiveText:b.battle.objectiveText,environmentPath:b.battle.environmentPath,
      hasLaunchResolver:typeof b.battle.launchResolver==="function"
    }};})(),
    diag:runIssue369MenmaEvolvedPLBattleDiagnostics()
  }));
  assert.strictEqual(pre.diag.pass,true,label+" source/runtime diagnostic RED "+JSON.stringify(pre.diag));
  assert.strictEqual(pre.beat.mode,"battle_transition");
  assert.strictEqual(pre.beat.battle.encounterId,ENCOUNTER);
  assert.strictEqual(pre.beat.battle.battleConfigId,CONFIG);
  assert.strictEqual(pre.beat.battle.objectiveId,OBJECTIVE);
  assert.strictEqual(pre.beat.battle.objectiveText,"Stop the Test Subjects.");
  assert.strictEqual(pre.beat.battle.environmentPath,"Scene backdrops/forest_clearing_day.png");
  assert.strictEqual(pre.beat.battle.hasLaunchResolver,true);

  const launch=await page.evaluate(()=>advanceStoryScene());
  assert(launch&&launch.success===true,label+" Story -> Battle launch failed "+JSON.stringify(launch));
  await page.waitForFunction(enc=>currentBattle&&currentBattle.active===true&&currentBattle.encounterId===enc,ENCOUNTER,{timeout:12000});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});

  const initial=await page.evaluate(()=>({
    deployment:{
      player:currentBattle.deployment.player.slots.map(s=>s.participantId).filter(Boolean),
      enemy:currentBattle.deployment.enemy.slots.map(s=>s.participantId).filter(Boolean)
    },
    activePlayer:getBattleDeploymentParticipant("player",1)?.id||null,
    activeEnemy:getBattleDeploymentParticipant("enemy",1)?.id||null,
    semantic:getMenmaEvolvedPLBattleState36900(),
    readiness:getMenmaEvolvedPLBattleInputReadiness36900(),
    pl:{
      menma:getBattleRemainingPL("player","academy_menma"),
      anko:getBattleRemainingPL("player","sj_anko"),
      altered:getBattleRemainingPL("enemy","test_subject_altered_shinobi"),
      brute:getBattleRemainingPL("enemy","test_subject_brute"),
      unstable:getBattleRemainingPL("enemy","test_subject_unstable")
    },
    expectedPortraits:(()=>{
      const portrait=(side,id)=>{
        const participant=getBattleParticipantByIdentity(side,id);
        const projection=side==="player"?resolveUIPortraitProjection(participant):resolveBattleEnemyPortraitProjection(participant);
        return projection?.path||"";
      };
      return{
        menma:portrait("player","academy_menma"),
        anko:portrait("player","sj_anko"),
        altered:portrait("enemy","test_subject_altered_shinobi"),
        brute:portrait("enemy","test_subject_brute"),
        unstable:portrait("enemy","test_subject_unstable")
      };
    })(),
    stage:(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const support=(side,id)=>{
        const node=stage?.querySelector('.battle-live-roster-'+side+' [data-participant-id="'+id+'"]');
        const img=node?.querySelector("img");
        return{present:!!node,src:img?.getAttribute("src")||""};
      };
      return{
        environment:stage?.dataset.battleEnvironment||null,
        background:getComputedStyle(stage).backgroundImage||"",
        menma:support("player","academy_menma"),
        brute:support("enemy","test_subject_brute"),
        unstable:support("enemy","test_subject_unstable"),
        activePlayerSrc:stage?.querySelector(".battle-live-active-card-player .battle-live-active-card-image")?.getAttribute("src")||"",
        activeEnemySrc:stage?.querySelector(".battle-live-active-card-enemy .battle-live-active-card-image")?.getAttribute("src")||""
      };
    })(),
    clan:typeof getPersistentClanBattleQueueSlots==="function"?getPersistentClanBattleQueueSlots():[],
    ankoOwned:!!getPlayerCharacter("sj_anko"),
    teamIds:Array.isArray(playerTeam)?playerTeam.map(x=>x&&x.id).filter(Boolean):[]
  }));

  assert.deepStrictEqual(initial.deployment.player,[ANKO,MENMA],"Anko must start Active; Menma must start Benched");
  assert.deepStrictEqual(initial.deployment.enemy,HOSTILES,"exact hostile deployment drift");
  assert.strictEqual(initial.activePlayer,ANKO);
  assert.strictEqual(initial.activeEnemy,HOSTILES[0]);
  assert.strictEqual(initial.semantic.phase,"scripted_a");
  assert.strictEqual(initial.readiness.ready,false);
  assert.strictEqual(initial.readiness.reason==="authored_anko_takedown"||initial.readiness.reason==="committed_zero_waiting_for_presentation",true);
  assert.strictEqual(initial.pl.anko,56,"Anko Battle PL drift");
  assert.deepStrictEqual([initial.pl.altered,initial.pl.brute,initial.pl.unstable],[0,13,12],"Phase A must commit Altered to 0 while Brute/Unstable remain untouched");
  assert.strictEqual(initial.stage.environment,"forest_clearing_day","forest environment dataset missing");
  assert(initial.stage.background.includes("forest_clearing_day.png"),"forest backdrop not projected");
  assert(initial.stage.menma.present&&initial.expectedPortraits.menma&&initial.stage.menma.src===initial.expectedPortraits.menma,"Menma support portrait missing/wrong "+JSON.stringify({actual:initial.stage.menma.src,expected:initial.expectedPortraits.menma}));
  assert(initial.stage.brute.present&&initial.expectedPortraits.brute&&initial.stage.brute.src===initial.expectedPortraits.brute,"Brute support portrait missing/wrong "+JSON.stringify({actual:initial.stage.brute.src,expected:initial.expectedPortraits.brute}));
  assert(initial.stage.unstable.present&&initial.expectedPortraits.unstable&&initial.stage.unstable.src===initial.expectedPortraits.unstable,"Unstable support portrait missing/wrong "+JSON.stringify({actual:initial.stage.unstable.src,expected:initial.expectedPortraits.unstable}));
  assert(initial.expectedPortraits.anko&&initial.stage.activePlayerSrc===initial.expectedPortraits.anko,"Anko active portrait missing/wrong "+JSON.stringify({actual:initial.stage.activePlayerSrc,expected:initial.expectedPortraits.anko}));
  assert(initial.expectedPortraits.altered&&initial.stage.activeEnemySrc===initial.expectedPortraits.altered,"Altered active portrait missing/wrong "+JSON.stringify({actual:initial.stage.activeEnemySrc,expected:initial.expectedPortraits.altered}));
  assert.deepStrictEqual(initial.clan,pre.clan,"Origin launch mutated My Clan order");
  assert.strictEqual(initial.ankoOwned,pre.ankoOwned,"encounter-local Anko changed ownership");
  assert.deepStrictEqual(initial.teamIds,pre.teamIds,"encounter-local Anko mutated owned team");

  return{context,page,gate,pre};
}

async function waitForScriptedChoreography(page,label){
  await page.waitForFunction(({ANKO,target})=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    return stage&&stage.dataset.presentationActorId===ANKO&&stage.dataset.presentationTargetId===target;
  },{ANKO,target:HOSTILES[0]},{timeout:12000});
  await page.screenshot({path:path.join(OUT,label+"-phase-a-anko-altered.png"),fullPage:false,timeout:12000});

  await page.waitForFunction(({ANKO,target})=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    return stage&&stage.dataset.presentationActorId===ANKO&&stage.dataset.presentationTargetId===target;
  },{ANKO,target:HOSTILES[1]},{timeout:12000});

  const phaseB=await page.evaluate(()=>({
    activePlayer:getBattleDeploymentParticipant("player",1)?.id||null,
    activeEnemy:getBattleDeploymentParticipant("enemy",1)?.id||null,
    state:getMenmaEvolvedPLBattleState36900(),
    altered:getBattleRemainingPL("enemy","test_subject_altered_shinobi"),
    brute:getBattleRemainingPL("enemy","test_subject_brute"),
    unstable:getBattleRemainingPL("enemy","test_subject_unstable"),
    stageActor:document.querySelector(".alpha-code-battle-stage")?.dataset.presentationActorId||null,
    stageTarget:document.querySelector(".alpha-code-battle-stage")?.dataset.presentationTargetId||null
  }));
  assert.strictEqual(phaseB.activePlayer,ANKO,"Anko left Active before second authored beat settled");
  assert.strictEqual(phaseB.activeEnemy,HOSTILES[1],"Brute did not relay into Active for Phase B");
  assert.strictEqual(phaseB.state.phase,"scripted_b");
  assert.strictEqual(phaseB.altered,0);
  assert.strictEqual(phaseB.brute,0,"Phase B must commit Brute to 0 while portrait remains Active for playback");
  assert.strictEqual(phaseB.unstable,12);
  assert.strictEqual(phaseB.stageActor,ANKO);
  assert.strictEqual(phaseB.stageTarget,HOSTILES[1]);
  await page.screenshot({path:path.join(OUT,label+"-phase-b-anko-brute.png"),fullPage:false,timeout:12000});

  await page.waitForFunction(({MENMA,UNSTABLE})=>{
    const state=getMenmaEvolvedPLBattleState36900();
    return state&&state.phase==="phase_c_player"&&
      getBattleDeploymentParticipant("player",1)?.id===MENMA&&
      getBattleDeploymentParticipant("enemy",1)?.id===UNSTABLE&&
      getMenmaEvolvedPLBattleInputReadiness36900()?.ready===true;
  },{MENMA,UNSTABLE:HOSTILES[2]},{timeout:15000});

  const phaseC=await page.evaluate(()=>({
    state:getMenmaEvolvedPLBattleState36900(),
    readiness:getMenmaEvolvedPLBattleInputReadiness36900(),
    playerSlots:currentBattle.deployment.player.slots.map(s=>s.participantId).filter(Boolean),
    enemySlots:currentBattle.deployment.enemy.slots.map(s=>s.participantId).filter(Boolean),
    evidence:(currentBattle.runtime?.evidence||[]).map(r=>({
      evidenceId:r.evidenceId,eventType:r.eventType,actionId:r.actionId,
      actor:r.actorRef?.participantId||null,target:r.targetRef?.participantId||null,
      skillId:r.skillId||null,data:r.data||null
    }))
  }));
  assert.deepStrictEqual(phaseC.playerSlots,[MENMA,ANKO],"Anko yield / Menma promotion drift");
  assert.deepStrictEqual(phaseC.enemySlots,[HOSTILES[2]],"enemy relay must leave only Unstable");
  assert.strictEqual(phaseC.readiness.ready,true,"Menma did not receive first genuine input");
  assert.deepStrictEqual(phaseC.state.resolvedHostileIds.slice().sort(),HOSTILES.slice(0,2).sort(),"first two hostiles not resolved exactly once");

  const scripted=phaseC.evidence.filter(r=>r.eventType==="menma_origin_scripted_anko_takedown_completed");
  assert.strictEqual(scripted.length,2,"scripted Anko takedown count drift");
  assert.deepStrictEqual(scripted.map(r=>[r.skillId,r.target,r.data?.finalDamage]),[
    ["sj_anko_hidden_shadow_snake_hands",HOSTILES[0],18],
    ["sj_anko_fire_style_dragon_flame",HOSTILES[1],21]
  ],"scripted Anko packet/target drift");
  assert(scripted.every(r=>r.data?.ordinarySideOpportunityConsumed===false&&r.data?.men03Eligible===false),"scripted action leaked into ordinary/MEN-03 semantics");
  assert.strictEqual(phaseC.evidence.filter(r=>r.eventType==="enemy_authored_action_completed").length,0,"Altered/Brute received illegal ordinary turns");
  assert.strictEqual(phaseC.evidence.filter(r=>r.eventType==="skill_action_completed"&&r.actor===MENMA).length,0,"Menma acted before Phase C");

  return phaseC;
}

async function successorVictoryAndReload(browser){
  const {context,page,gate}=await bootScenario(browser,"successor");
  try{
    const phaseC=await waitForScriptedChoreography(page,"successor");

    // Save/load at the handoff must not replay either scripted takedown.
    await page.evaluate(()=>saveTestState());
    const beforeReload=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      evidence:(currentBattle.runtime?.evidence||[]).filter(r=>r&&r.eventType==="menma_origin_scripted_anko_takedown_completed").map(r=>r.evidenceId),
      pl:JSON.parse(JSON.stringify(currentBattle.runtime.remainingPL))
    }));
    await page.evaluate(()=>restoreTestState());
    await page.waitForFunction(()=>getMenmaEvolvedPLBattleState36900()?.phase==="phase_c_player"&&getMenmaEvolvedPLBattleInputReadiness36900()?.ready===true,null,{timeout:12000});
    const afterReload=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      evidence:(currentBattle.runtime?.evidence||[]).filter(r=>r&&r.eventType==="menma_origin_scripted_anko_takedown_completed").map(r=>r.evidenceId),
      pl:JSON.parse(JSON.stringify(currentBattle.runtime.remainingPL))
    }));
    assert.deepStrictEqual(afterReload.evidence,beforeReload.evidence,"save/load replayed scripted Anko evidence");
    assert.deepStrictEqual(afterReload.pl,beforeReload.pl,"save/load changed Battle PL");
    assert.strictEqual(afterReload.state.phase,"phase_c_player");

    // Deterministic terminal fixture: the actual player still commits a legal
    // Menma Skill; only remaining Unstable PL is shortened for bounded QA.
    await page.evaluate(()=>setBattleRemainingPL("enemy","test_subject_unstable",1));
    const attack=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_chakra_knuckle"));
    assert(attack&&attack.success===true,"Menma Phase C legal attack failed "+JSON.stringify(attack));

    await page.waitForFunction(({MENMA,target})=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return stage&&stage.dataset.presentationActorId===MENMA&&stage.dataset.presentationTargetId===target;
    },{MENMA,target:HOSTILES[2]},{timeout:12000});
    const beforeTerminal=await page.evaluate(()=>({
      outcome:currentBattle.outcome?JSON.parse(JSON.stringify(currentBattle.outcome)):null,
      unstable:getBattleRemainingPL("enemy","test_subject_unstable"),
      state:getMenmaEvolvedPLBattleState36900()
    }));
    assert.strictEqual(beforeTerminal.unstable,0,"Menma hit did not commit Unstable 0 PL");
    assert.strictEqual(beforeTerminal.outcome,null,"victory committed before visible Menma action settled");
    assert(beforeTerminal.state.pendingZero&&beforeTerminal.state.pendingZero.participantId===HOSTILES[2],"terminal enemy zero not presentation-gated");

    await page.waitForFunction(()=>currentBattle&&currentBattle.battleOver===true&&currentBattle.outcome?.type==="victory",null,{timeout:15000});

    const terminal=await page.evaluate(({SCENE,HOSTILES,MENMA,ANKO})=>{
      const rt=getActiveStorySceneRuntime();
      const occurrenceId="battle_occ_origin_academy_menma_three_test_subjects:"+rt.instanceId;
      const rows=getActivityHistory();
      const evidence=currentBattle.runtime?.evidence||[];
      const scriptedActionIds=evidence.filter(r=>r?.eventType==="menma_origin_scripted_anko_takedown_completed").map(r=>r.actionId);
      return{
        occurrenceId,
        outcome:JSON.parse(JSON.stringify(currentBattle.outcome||null)),
        rewards:JSON.parse(JSON.stringify(currentBattle.rewards||{})),
        receipt:rows.find(r=>r&&r.battleOccurrenceId===occurrenceId&&r.type!=="origin_battle_reward")||null,
        scriptedActionIds,
        menmaCompletions:evidence.filter(r=>r?.eventType==="skill_action_completed"&&r.actorRef?.participantId===MENMA).map(r=>r.evidenceId)
      };
    },{SCENE,HOSTILES,MENMA,ANKO});

    assert.strictEqual(terminal.outcome.type,"victory");
    assert.strictEqual(terminal.outcome.tutorialResult,"completed");
    assert.strictEqual(terminal.outcome.men03Scope,"phase_c_only");
    assert(terminal.receipt,"whole-encounter receipt missing");
    assert.strictEqual(terminal.receipt.battleResult,"victory");
    assert.strictEqual(terminal.receipt.objectiveCompleted,true);
    assert.strictEqual(terminal.receipt.menmaWithdrawn,false);
    assert.strictEqual(terminal.receipt.ankoWithdrawn,false);
    assert.deepStrictEqual(terminal.receipt.resolvedHostileIds,HOSTILES);
    assert.strictEqual(terminal.receipt.fact.halfScriptedPhaseABExcludedFromMEN03,true);
    assert.strictEqual(terminal.rewards.generated,true,"#362 reward adapter did not activate");
    assert.strictEqual(terminal.rewards.ryo,100,"whole-encounter victory not exact 100 Ryō");

    const beforeClaim=await page.evaluate(()=>Number(playerData.ryo)||0);
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),true,"reward claim failed");
    const afterClaim=await page.evaluate(()=>Number(playerData.ryo)||0);
    assert.strictEqual(afterClaim,beforeClaim+100);
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),false,"reward duplicated on second claim");

    const returned=await page.evaluate(()=>continueAfterVictory());
    assert(returned&&returned.success===true,"victory did not return to Story "+JSON.stringify(returned));
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="post_battle_opening",SCENE,{timeout:12000});

    const post=await page.evaluate(({MEN03_SOURCE,REWARD_SOURCE})=>{
      const rows=getActivityHistory();
      const source=rows.find(r=>r&&r.occurrenceId===MEN03_SOURCE)||null;
      return{
        beat:getActiveStorySceneRuntime()?.beatId||null,
        source,
        rewardCount:rows.filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===REWARD_SOURCE).length,
        evidence:(currentBattle.runtime?.evidence||[]).map(r=>({evidenceId:r.evidenceId,actor:r.actorRef?.participantId||null,target:r.targetRef?.participantId||null,eventType:r.eventType}))
      };
    },{MEN03_SOURCE,REWARD_SOURCE});
    assert.strictEqual(post.rewardCount,1);
    assert(post.source,"MEN-03 stable aggregate source missing");
    assert.strictEqual(post.source.tutorialResult,"completed");
    assert(["high","middle","low"].includes(post.source.performanceBucket),"MEN-03 completion bucket invalid");
    const supportRows=post.evidence.filter(r=>post.source.supportingOccurrenceIds.includes(r.evidenceId));
    assert(supportRows.length>0,"MEN-03 supporting evidence missing");
    assert(supportRows.every(r=>r.actor===MENMA||r.target===MENMA),"Anko scripted evidence contaminated MEN-03 ancestry");

    await page.screenshot({path:path.join(OUT,"successor-victory-story-return.png"),fullPage:false,timeout:12000});
    await gate.assertClean("issue-369-half-scripted-victory");
    return{scriptedCount:phaseC.evidence.filter(r=>r.eventType==="menma_origin_scripted_anko_takedown_completed").length,rewardRyo:100,men03Bucket:post.source.performanceBucket};
  }finally{await context.close();}
}

async function phaseCDefeat(browser){
  const {context,page,gate}=await bootScenario(browser,"defeat");
  try{
    await waitForScriptedChoreography(page,"defeat");
    await page.evaluate(()=>setBattleRemainingPL("player","academy_menma",1));

    const setup=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_shadow_clone_feint"));
    assert(setup&&setup.success===true,"Menma setup action failed "+JSON.stringify(setup));

    await page.waitForFunction(()=>currentBattle&&currentBattle.outcome?.type==="defeat",null,{timeout:18000});
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="tutorial_not_completed",SCENE,{timeout:12000});

    const terminal=await page.evaluate(({MEN03_SOURCE,REWARD_SOURCE})=>({
      state:getMenmaEvolvedPLBattleState36900(),
      outcome:JSON.parse(JSON.stringify(currentBattle.outcome||null)),
      beat:getActiveStorySceneRuntime()?.beatId||null,
      rewards:JSON.parse(JSON.stringify(currentBattle.rewards||{})),
      men03:getActivityHistory().filter(r=>r&&r.occurrenceId===MEN03_SOURCE),
      rewardRows:getActivityHistory().filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===REWARD_SOURCE),
      scripted:(currentBattle.runtime?.evidence||[]).filter(r=>r?.eventType==="menma_origin_scripted_anko_takedown_completed").length
    }),{MEN03_SOURCE,REWARD_SOURCE});

    assert.strictEqual(terminal.outcome.type,"defeat");
    assert.strictEqual(terminal.outcome.tutorialResult,"not_completed");
    assert.strictEqual(terminal.outcome.performanceBucket,null);
    assert.strictEqual(terminal.state.menmaWithdrawn,true);
    assert.strictEqual(terminal.state.terminalResult,"defeat");
    assert.strictEqual(terminal.beat,"tutorial_not_completed");
    assert.strictEqual(terminal.rewards.generated,false);
    assert.strictEqual(terminal.rewards.ryo,0);
    assert.strictEqual(terminal.rewardRows.length,0);
    assert.strictEqual(terminal.men03.length,0,"defeat fabricated MEN-03 aggregate");
    assert.strictEqual(terminal.scripted,2,"defeat path replayed scripted Anko beats");

    await page.screenshot({path:path.join(OUT,"phase-c-defeat-story-return.png"),fullPage:false,timeout:12000});
    await gate.assertClean("issue-369-half-scripted-defeat");
    return{beat:terminal.beat,men03Count:terminal.men03.length,rewardCount:terminal.rewardRows.length};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  try{
    const victory=await successorVictoryAndReload(browser);
    const defeat=await phaseCDefeat(browser);
    const summary={
      pass:true,issue:369,kind:"installed_browser_menma_half_scripted_evolved_pl_battle",
      checks:{
        storyBattleStory:true,
        ankoStartsActive:true,
        allThreeEnemyPortraitsProjected:true,
        forestBackdropProjected:true,
        phaseAVisibleBeforeRelay:true,
        phaseBVisibleBeforeRelay:true,
        alteredThenBruteThenUnstableRelay:true,
        ankoYieldsToMenma:true,
        menmaGetsFirstPhaseCInput:true,
        noOrdinaryEnemyTurnInScriptedPhases:true,
        scriptedActionsExcludedFromMEN03:true,
        saveRestoreDoesNotReplayScriptedBeats:true,
        terminalZeroWaitsForVisibleSettle:true,
        exact100RyoOnce:true,
        phaseCFailureNotCompletedNoFakeLow:true
      },
      victory,defeat,browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
