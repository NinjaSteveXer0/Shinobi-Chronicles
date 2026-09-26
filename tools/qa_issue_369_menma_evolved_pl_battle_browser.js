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

async function waitForStoryMotionToSettle(page){
  try{
    await page.waitForFunction(()=>{
      try{
        return typeof getStoryHardSceneTransitionState33900!=="function"||
          getStoryHardSceneTransitionState33900()?.active!==true;
      }catch(_error){return true;}
    },null,{timeout:3000});
  }catch(_error){}
}

async function clickStoryPrimary(page){
  const root=page.locator("#story-scene-presentation-layer");
  let button=root.locator(".sc-chronicle-primary").first();
  if(await button.count()===0)button=root.locator(".sc-story-actions > .sc-story-action:not(.sc-story-choice)").first();
  await button.waitFor({state:"visible",timeout:8000});
  await button.click();
  await waitForStoryMotionToSettle(page);
}

async function clickStoryChoice(page,label){
  const root=page.locator("#story-scene-presentation-layer");
  const button=root.locator(".sc-story-choice").filter({hasText:label}).first();
  await button.waitFor({state:"visible",timeout:8000});
  await button.click();
  await waitForStoryMotionToSettle(page);
}

async function bootScenario(browser,label){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  await page.addInitScript(()=>{globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA=true;});
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
    activePlayerClass:getBattleDeploymentParticipant("player",1)?.participantClass||null,
    activePlayerControl:getBattleDeploymentParticipant("player",1)?.controlAuthority||null,
    palette:getBattleUISkillPalettePresentation(getBattleDeploymentParticipant("player",1)),
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
  assert.strictEqual(initial.activePlayerClass,"guest_ally","Anko relationship class drift");
  assert.strictEqual(initial.activePlayerControl,"player","Guest Ally control authority drift");
  assert.deepStrictEqual(initial.palette.skillIds,[
    "sj_anko_hidden_shadow_snake_hands",
    "sj_anko_snake_bind",
    "sj_anko_fire_style_dragon_flame",
    "sj_anko_serpent_evasion"
  ],"Anko Guest Ally palette drift");
  assert.strictEqual(initial.palette.skillIds.includes("sj_anko_twin_snakes_mutual_death"),false,"forbidden Anko Kinjutsu leaked");
  assert.strictEqual(initial.semantic.phase,"player");
  assert.strictEqual(initial.readiness.ready,true);
  assert.strictEqual(initial.readiness.activeParticipantId,ANKO);
  assert.strictEqual(initial.pl.anko,56,"Anko Battle PL drift");
  assert.deepStrictEqual([initial.pl.altered,initial.pl.brute,initial.pl.unstable],[11,13,12],"Battle mutated before the player's first Guest Ally choice");
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

async function waitPresentationIdle(page){
  await page.waitForFunction(()=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    return !!stage&&stage.dataset.presentationQueueBusy!=="true";
  },null,{timeout:18000});
}

async function waitPlayerReady(page,playerId,enemyId){
  await page.waitForFunction(({playerId,enemyId})=>
    currentBattle?.active===true&&currentBattle?.battleOver!==true&&
    getBattleDeploymentParticipant("player",1)?.id===playerId&&
    getBattleDeploymentParticipant("enemy",1)?.id===enemyId&&
    getMenmaEvolvedPLBattleState36900()?.phase==="player"&&
    getMenmaEvolvedPLBattleInputReadiness36900()?.ready===true,
    {playerId,enemyId},{timeout:20000});
  await waitPresentationIdle(page);
}

async function useSkill(page,skillId){
  const result=await page.evaluate(id=>attemptBattlePreparedSkill(id),skillId);
  assert(result&&result.success===true,"Battle Skill failed: "+skillId+" "+JSON.stringify(result));
  return result;
}

async function driveGuestAllyTeachingHandoff(page,label){
  // Genuine player-selected Anko action. Hidden Shadow Snake Hands legitimately
  // depletes Altered under the closed Combat numbers; relay then gives Brute
  // the ordinary enemy-side response.
  await useSkill(page,"sj_anko_hidden_shadow_snake_hands");
  await page.waitForFunction(()=>getBattleRemainingPL("enemy","test_subject_altered_shinobi")===0,null,{timeout:8000});
  await waitPlayerReady(page,ANKO,HOSTILES[1]);

  const afterAltered=await page.evaluate(()=>({
    state:getMenmaEvolvedPLBattleState36900(),
    evidence:(currentBattle.runtime?.evidence||[]).map(r=>({
      eventType:r.eventType,actor:r.actorRef?.participantId||null,target:r.targetRef?.participantId||null,
      skillId:r.skillId||null,actionId:r.actionId||null,data:r.data||{}
    })),
    deployment:{
      player:currentBattle.deployment.player.slots.map(s=>s.participantId).filter(Boolean),
      enemy:currentBattle.deployment.enemy.slots.map(s=>s.participantId).filter(Boolean)
    }
  }));
  assert.deepStrictEqual(afterAltered.deployment.player,[ANKO,MENMA],"Anko must remain Active after Altered relay");
  assert.deepStrictEqual(afterAltered.deployment.enemy,[HOSTILES[1],HOSTILES[2]],"Altered -> Brute relay drift");
  assert(afterAltered.evidence.some(r=>r.eventType==="skill_action_completed"&&r.actor===ANKO&&r.skillId==="sj_anko_hidden_shadow_snake_hands"&&r.data?.guestAllyPlayerChosen===true),"player-chosen Anko action evidence missing");
  assert(afterAltered.evidence.some(r=>r.eventType==="enemy_authored_action_completed"&&r.actor===HOSTILES[1]&&r.target===ANKO),"Brute did not receive ordinary enemy response");
  assert.strictEqual(afterAltered.evidence.some(r=>r.eventType==="menma_origin_scripted_anko_takedown_completed"),false,"superseded scripted Anko evidence returned");
  await page.screenshot({path:path.join(OUT,label+"-anko-vs-brute-ready.png"),fullPage:false,timeout:12000});

  // Second genuine player choice. Dragon Flame legitimately withdraws Brute.
  // Unstable relays, Anko yields without withdrawal, and enemy-side ordering is
  // preserved: Unstable acts against Menma before Menma gets input.
  await useSkill(page,"sj_anko_fire_style_dragon_flame");
  await page.waitForFunction(()=>getBattleRemainingPL("enemy","test_subject_brute")===0,null,{timeout:8000});
  await waitPlayerReady(page,MENMA,HOSTILES[2]);

  const handoff=await page.evaluate(()=>({
    state:getMenmaEvolvedPLBattleState36900(),
    readiness:getMenmaEvolvedPLBattleInputReadiness36900(),
    deployment:{
      player:currentBattle.deployment.player.slots.map(s=>s.participantId).filter(Boolean),
      enemy:currentBattle.deployment.enemy.slots.map(s=>s.participantId).filter(Boolean)
    },
    transition:JSON.parse(JSON.stringify(currentBattle.deployment.lastTransition||null)),
    evidence:(currentBattle.runtime?.evidence||[]).map(r=>({
      evidenceId:r.evidenceId,eventType:r.eventType,actor:r.actorRef?.participantId||null,target:r.targetRef?.participantId||null,
      skillId:r.skillId||null,actionId:r.actionId||null,data:r.data||{}
    }))
  }));
  assert.deepStrictEqual(handoff.deployment.player,[MENMA,ANKO],"authored Anko -> Menma yield drift");
  assert.deepStrictEqual(handoff.deployment.enemy,[HOSTILES[2]],"Brute -> Unstable relay drift");
  assert.strictEqual(handoff.state.ankoYielded,true,"authored Guest Ally yield not committed");
  assert.strictEqual(handoff.state.menmaEvidenceStarted,true,"MEN-03 window did not start when Menma became Active");
  assert.strictEqual(handoff.readiness.ready,true,"Menma did not receive input after Unstable response");
  assert(handoff.evidence.some(r=>r.eventType==="battle_formation_yield_committed"&&r.actor===ANKO&&r.target===MENMA&&r.data?.nextSide==="enemy"),"yield did not preserve enemy-next side order");
  assert(handoff.evidence.some(r=>r.eventType==="enemy_authored_action_completed"&&r.actor===HOSTILES[2]&&r.target===MENMA),"Unstable did not act before Menma input");
  assert.strictEqual(handoff.evidence.filter(r=>r.eventType==="menma_origin_phase_c_started"&&r.actor===MENMA).length,1,"MEN-03 start evidence duplicated/missing");
  assert.strictEqual(handoff.evidence.some(r=>r.eventType==="menma_origin_scripted_anko_takedown_completed"),false,"scripted Anko path leaked into successor");
  await page.screenshot({path:path.join(OUT,label+"-menma-vs-unstable-ready.png"),fullPage:false,timeout:12000});
  return handoff;
}

async function guestAllyVictoryAndReload(browser){
  const {context,page,gate}=await bootScenario(browser,"guest-victory");
  try{
    const handoff=await driveGuestAllyTeachingHandoff(page,"guest-victory");

    // Save/restore at the handoff must preserve exact formation, PL and
    // committed evidence without replaying either Anko choice or enemy reply.
    await page.evaluate(()=>saveTestState());
    const beforeReload=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      deployment:JSON.parse(JSON.stringify(currentBattle.deployment)),
      evidence:(currentBattle.runtime?.evidence||[]).map(r=>r.evidenceId),
      pl:JSON.parse(JSON.stringify(currentBattle.runtime.remainingPL))
    }));
    await page.evaluate(()=>restoreTestState());
    await waitPlayerReady(page,MENMA,HOSTILES[2]);
    const afterReload=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      deployment:JSON.parse(JSON.stringify(currentBattle.deployment)),
      evidence:(currentBattle.runtime?.evidence||[]).map(r=>r.evidenceId),
      pl:JSON.parse(JSON.stringify(currentBattle.runtime.remainingPL))
    }));
    assert.deepStrictEqual(afterReload.evidence,beforeReload.evidence,"save/load duplicated committed Battle evidence");
    assert.deepStrictEqual(afterReload.pl,beforeReload.pl,"save/load changed Remaining Battle PL");
    assert.deepStrictEqual(afterReload.deployment.player.slots.map(s=>s.participantId),beforeReload.deployment.player.slots.map(s=>s.participantId),"save/load changed allied formation");
    assert.strictEqual(afterReload.state.ankoYielded,true);
    assert.strictEqual(afterReload.state.menmaEvidenceStarted,true);

    // Bounded terminal fixture: Menma still commits a legal player action;
    // only the remaining target's PL is shortened.
    await page.evaluate(()=>setBattleRemainingPL("enemy","test_subject_unstable",1));
    await useSkill(page,"academy_menma_chakra_knuckle");
    await page.waitForFunction(()=>currentBattle?.battleOver===true&&currentBattle?.outcome?.type==="victory",null,{timeout:20000});
    await waitPresentationIdle(page).catch(()=>{});

    const terminal=await page.evaluate(({HOSTILES,MENMA,REWARD_SOURCE})=>{
      const rt=getActiveStorySceneRuntime();
      const occurrenceId="battle_occ_origin_academy_menma_three_test_subjects:"+rt.instanceId;
      const rows=getActivityHistory();
      return{
        occurrenceId,
        outcome:JSON.parse(JSON.stringify(currentBattle.outcome||null)),
        rewards:JSON.parse(JSON.stringify(currentBattle.rewards||{})),
        receipt:rows.find(r=>r&&r.battleOccurrenceId===occurrenceId&&r.type!=="origin_battle_reward")||null,
        rewardRows:rows.filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===REWARD_SOURCE),
        evidence:(currentBattle.runtime?.evidence||[]).map(r=>({
          eventType:r.eventType,actor:r.actorRef?.participantId||null,skillId:r.skillId||null,data:r.data||{}
        }))
      };
    },{HOSTILES,MENMA,REWARD_SOURCE});

    assert.strictEqual(terminal.outcome.type,"victory");
    assert.strictEqual(terminal.outcome.objectiveCompleted,true);
    assert.strictEqual(terminal.outcome.men03Scope,"menma_active_only");
    assert.strictEqual(terminal.outcome.menmaEvidenceStarted,true);
    assert(terminal.receipt,"whole-encounter receipt missing");
    assert.strictEqual(terminal.receipt.battleResult,"victory");
    assert.strictEqual(terminal.receipt.objectiveCompleted,true);
    assert.deepStrictEqual(terminal.receipt.resolvedHostileIds,HOSTILES);
    assert.strictEqual(terminal.receipt.fact.guestAllyControl,true);
    assert.strictEqual(terminal.receipt.fact.ownershipGranted,false);
    assert.strictEqual(terminal.rewards.generated,true,"#362 reward adapter did not activate");
    assert.strictEqual(terminal.rewards.ryo,100,"whole-encounter victory not exact 100 Ryō");
    assert(terminal.evidence.some(r=>r.eventType==="skill_action_completed"&&r.actor===MENMA),"Menma victory action evidence missing");

    const beforeClaim=await page.evaluate(()=>Number(playerData.ryo)||0);
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),true,"reward claim failed");
    const afterClaim=await page.evaluate(()=>Number(playerData.ryo)||0);
    assert.strictEqual(afterClaim,beforeClaim+100);
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),false,"reward duplicated on second claim");

    await gate.assertClean("issue-369-guest-ally-victory");
    return{
      activeAtHandoff:handoff.readiness.activeParticipantId,
      reward:terminal.rewards.ryo,
      menmaEvidenceStarted:terminal.outcome.menmaEvidenceStarted,
      guestAllyControl:terminal.receipt.fact.guestAllyControl
    };
  }finally{await context.close();}
}

async function legitimatePartyDefeat(browser){
  const {context,page,gate}=await bootScenario(browser,"party-defeat");
  try{
    await driveGuestAllyTeachingHandoff(page,"party-defeat");

    // Unstable legitimately depletes Menma. Because Anko is still eligible,
    // this is a relay, not party defeat.
    await page.evaluate(()=>setBattleRemainingPL("player","academy_menma",1));
    await useSkill(page,"academy_menma_shadow_clone_feint");
    await waitPlayerReady(page,ANKO,HOSTILES[2]);
    const afterMenma=await page.evaluate(()=>({
      over:currentBattle.battleOver===true,
      state:getMenmaEvolvedPLBattleState36900(),
      playerSlots:currentBattle.deployment.player.slots.map(s=>s.participantId).filter(Boolean)
    }));
    assert.strictEqual(afterMenma.over,false,"Menma withdrawal incorrectly ended a Battle with eligible Anko");
    assert.strictEqual(afterMenma.state.menmaWithdrawn,true);
    assert.deepStrictEqual(afterMenma.playerSlots,[ANKO],"Anko did not relay back after Menma withdrawal");

    // Anko then uses a legal non-damaging control Skill at 1 PL. Unstable's
    // ordinary enemy response depletes the last eligible ally => party defeat.
    await page.evaluate(()=>setBattleRemainingPL("player","sj_anko",1));
    await useSkill(page,"sj_anko_snake_bind");
    await page.waitForFunction(()=>currentBattle?.battleOver===true&&currentBattle?.outcome?.type==="defeat"&&currentBattle?.outcome?.partyDefeat===true&&currentBattle?.outcome?.objectiveCompleted===false,null,{timeout:20000});

    const terminal=await page.evaluate(({REWARD_SOURCE})=>({
      state:getMenmaEvolvedPLBattleState36900(),
      outcome:JSON.parse(JSON.stringify(currentBattle.outcome||null)),
      rewards:JSON.parse(JSON.stringify(currentBattle.rewards||{})),
      rewardRows:getActivityHistory().filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===REWARD_SOURCE),
      receipt:getActivityHistory().find(r=>r&&r.battleConfigId==="academy_menma_origin_three_test_subjects_with_anko"&&r.type==="origin_battle_occurrence"&&r.battleResult==="defeat")||null
    }),{REWARD_SOURCE});

    assert.strictEqual(terminal.outcome.type,"defeat");
    assert.strictEqual(terminal.outcome.objectiveCompleted,false);
    assert.strictEqual(terminal.outcome.tutorialResult,"not_completed");
    assert.strictEqual(terminal.outcome.performanceBucket,null);
    assert.strictEqual(terminal.outcome.partyDefeat,true);
    assert.strictEqual(terminal.outcome.battlePLWithdrawalNotDeath,true);
    assert.strictEqual(terminal.state.menmaWithdrawn,true);
    assert.strictEqual(terminal.state.ankoWithdrawn,true);
    assert.strictEqual(terminal.state.terminalResult,"defeat");
    assert(terminal.receipt&&terminal.receipt.objectiveCompleted===false,"defeat occurrence receipt missing");
    assert(Array.isArray(terminal.receipt.unresolvedHostileIds)&&terminal.receipt.unresolvedHostileIds.includes(HOSTILES[2]),"unresolved hostile identity not preserved");
    assert.strictEqual(terminal.rewards.generated,false);
    assert.strictEqual(terminal.rewards.ryo,0);
    assert.strictEqual(terminal.rewardRows.length,0);

    // #386/#388 production bridge: terminal allied exhaustion must return
    // exactly once to the authored defeat continuation, survive reload there,
    // and then flow into the future-ambition choice rather than the obsolete
    // LOW-performance / old Nine-Tails ending chain.
    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="menma_party_defeat_return_01",null,{timeout:25000});
    const defeatReturnDebug=await page.evaluate(()=> {
      const layer=document.getElementById("story-scene-presentation-layer");
      const style=layer?getComputedStyle(layer):null;
      return{
        active:getActiveStorySceneRuntime()?{
          sceneId:getActiveStorySceneRuntime().sceneId,
          beatId:getActiveStorySceneRuntime().beatId
        }:null,
        currentOverlayType:typeof currentOverlayType!=="undefined"?currentOverlayType:null,
        battleOver:currentBattle?.battleOver===true,
        battleReturnContext:currentBattle?.returnContext||null,
        pendingBattlePresentation:typeof pendingBattlePresentation33000==="function"?pendingBattlePresentation33000():null,
        resumeSource:typeof resumeBattleCallerAfterCompletion==="function"?String(resumeBattleCallerAfterCompletion).slice(0,900):null,
        layer:layer?{
          display:style?.display||null,
          inlineDisplay:layer.style.display||null,
          displayPriority:layer.style.getPropertyPriority("display")||null,
          hidden:layer.dataset.scPresentationHidden||null,
          hiddenReason:layer.dataset.scPresentationHiddenReason||null,
          renderedBeatId:layer.dataset.beatId||null,
          mode:layer.dataset.mode||null
        }:null,
        clearHook:typeof globalThis.clearStoryPresentationHidden33900,
        boardRenderer:typeof globalThis.renderStorySceneBoard33900
      };
    });
    console.log("MENMA_DEFEAT_RETURN_DEBUG "+JSON.stringify(defeatReturnDebug));
    console.log("MENMA_DEFEAT_RETURN_ERRORS "+JSON.stringify(await gate.snapshot()));
    await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:12000});
    await waitForStoryMotionToSettle(page);

    const returnEntry=await page.evaluate(()=> {
      const rt=getActiveStorySceneRuntime(),beat=getCurrentStorySceneBeat(),def=getActiveStorySceneDefinition();
      const env=resolveStorySceneEnvironmentProjection({},beat,def,rt);
      const defeatRows=getActivityHistory().filter(r=>r&&r.battleConfigId==="academy_menma_origin_three_test_subjects_with_anko"&&r.type==="origin_battle_occurrence"&&r.battleResult==="defeat");
      return{
        beatId:rt?.beatId||null,text:beat?.text||null,assetPath:env?.asset_path||null,
        pendingBattle:rt?.pendingBattle||null,caller:currentBattle?.returnContext||null,
        defeatReceiptCount:defeatRows.length
      };
    });
    assert.strictEqual(returnEntry.beatId,"menma_party_defeat_return_01");
    assert.strictEqual(returnEntry.text,"The fight breaks apart before Menma can pull it back together.");
    assert.strictEqual(returnEntry.assetPath,"Scene backdrops/forest_clearing_day.png");
    assert.strictEqual(returnEntry.pendingBattle,null,"Story still thinks the terminal Battle is pending");
    assert.strictEqual(returnEntry.caller,null,"Battle caller returnContext was not consumed exactly once");
    assert.strictEqual(returnEntry.defeatReceiptCount,1,"party-defeat occurrence receipt duplicated before Story return");

    await page.evaluate(()=>saveTestState());
    await page.evaluate(()=>restoreTestState());
    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="menma_party_defeat_return_01",null,{timeout:12000});
    const afterStoryReload=await page.evaluate(()=>({
      beatId:getActiveStorySceneRuntime()?.beatId||null,
      defeatReceiptCount:getActivityHistory().filter(r=>r&&r.battleConfigId==="academy_menma_origin_three_test_subjects_with_anko"&&r.type==="origin_battle_occurrence"&&r.battleResult==="defeat").length,
      rewardRows:getActivityHistory().filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId==="menma_origin_battle_three_test_subjects_victory_ryo_01").length
    }));
    assert.strictEqual(afterStoryReload.beatId,"menma_party_defeat_return_01","save/load replayed or skipped the Story return");
    assert.strictEqual(afterStoryReload.defeatReceiptCount,1,"save/load duplicated party-defeat occurrence");
    assert.strictEqual(afterStoryReload.rewardRows,0,"save/load fabricated a defeat reward");

    const defeatBeats=[
      ["menma_party_defeat_return_01","The fight breaks apart before Menma can pull it back together."],
      ["menma_party_defeat_return_02","By the time the clearing settles, Menma and Anko are both at its edge."],
      ["menma_party_defeat_return_03","The test subjects still able to move use the opening.\n\nThey disappear between the trees."],
      ["menma_party_defeat_return_04","They're gone."],
      ["menma_party_defeat_return_05","I know."],
      ["menma_party_defeat_return_06","You wanted a real test."],
      ["menma_party_defeat_return_07","I got one."],
      ["menma_party_defeat_return_08","And?"],
      ["menma_party_defeat_return_09","Menma looks at the gap in the trees where the last of them disappeared."],
      ["menma_party_defeat_return_10","I need more."],
      ["menma_party_defeat_return_11","Anko laughs once.\n\nNot because it is funny."],
      ["menma_party_defeat_return_12","Yeah."],
      ["menma_party_defeat_return_13","That sounds familiar."],
      ["menma_party_defeat_return_14","You're going after them?"],
      ["menma_party_defeat_return_15","I'm reporting where they went."],
      ["menma_party_defeat_return_16","I can help."],
      ["menma_party_defeat_return_17","No."],
      ["menma_party_defeat_return_18","Menma gives her a look.\n\nAnko sees it immediately."],
      ["menma_party_defeat_return_19","That wasn't a challenge."],
      ["menma_party_defeat_return_20","Didn't say it was."],
      ["menma_party_defeat_return_21","Go home, Menma."],
      ["menma_party_defeat_return_22","Not the Academy."],
      ["menma_party_defeat_return_23","Didn't say Academy."],
      ["menma_party_defeat_return_24","Anko heads back toward the village.\n\nMenma waits until she is gone, then takes the forest route the other way."]
    ];
    for(const [beatId,text] of defeatBeats){
      await page.waitForFunction(id=>getActiveStorySceneRuntime()?.beatId===id,beatId,{timeout:12000});
      const beat=await page.evaluate(()=>getCurrentStorySceneBeat());
      assert.strictEqual(beat.text,text,"#386 player-facing Story drift at "+beatId);
      await clickStoryPrimary(page);
    }

    const futureBeats=[
      ["menma_future_01","Menma is running again."],
      ["menma_future_02","Through the trees, Konoha comes back into view. The Academy is somewhere beyond the rooftops."],
      ["menma_future_03","Satisfied?"],
      ["menma_future_04","No."],
      ["menma_future_05","Good."]
    ];
    for(const [beatId,text] of futureBeats){
      await page.waitForFunction(id=>getActiveStorySceneRuntime()?.beatId===id,beatId,{timeout:12000});
      const beat=await page.evaluate(()=>getCurrentStorySceneBeat());
      assert.strictEqual(beat.text,text,"#388 Scene-10 Story drift at "+beatId);
      if(beatId==="menma_future_01"){
        const futureBackdrop=await page.evaluate(()=>{
          const rt=getActiveStorySceneRuntime(),beat=getCurrentStorySceneBeat(),def=getActiveStorySceneDefinition();
          return resolveStorySceneEnvironmentProjection({},beat,def,rt)?.asset_path||null;
        });
        assert.strictEqual(futureBackdrop,"Scene backdrops/whisper_woods_forest_route.png","#388 Scene-10 backdrop drift");
      }
      await clickStoryPrimary(page);
    }

    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="menma_future_choice",null,{timeout:12000});
    const futureChoice=await page.evaluate(()=>({
      labels:getCurrentStorySceneBeat()?.choices?.map(choice=>choice.label)||[],
      oldEndingPresent:getActiveStorySceneDefinition()?.beatMap?.has("ending_nine_tails_right")===true
    }));
    assert.deepStrictEqual(futureChoice.labels,[
      "MASTER WHAT THEY WON'T TEACH ME",
      "BECOME TOO STRONG TO HOLD BACK",
      "CREATE SOMETHING THAT'S MINE",
      "FIND OUT HOW FAR I CAN GO"
    ],"#388 future-ambition choices drifted");
    await page.screenshot({path:path.join(OUT,"party-defeat-future-choice.png"),fullPage:false,timeout:12000}).catch(()=>{});

    await clickStoryChoice(page,"MASTER WHAT THEY WON'T TEACH ME");
    const intent=await page.evaluate(()=> {
      const rows=getActivityHistory().filter(r=>r&&r.occurrenceId==="occ_origin_menma_future_ambition_intent");
      const acq=ensurePlayerAcquisitionState();
      return{
        count:rows.length,
        row:rows[0]||null,
        currentPL:typeof getCurrentCharacterPL==="function"?getCurrentCharacterPL("academy_menma"):null,
        originVariantId:acq.chronicleOriginVariantId
      };
    });
    assert.strictEqual(intent.count,1,"future-ambition Story intent was not committed exactly once");
    assert.strictEqual(intent.row?.fact?.futureAmbitionIntent,"master_what_they_wont_teach_me");
    assert.strictEqual(intent.row?.fact?.storyIntent,true);
    assert.strictEqual(intent.row?.fact?.progressionGranted,false);
    assert.strictEqual(intent.originVariantId,MENMA);

    for(const [beatId,text] of [
      ["menma_future_master_01","If they won't teach me yet, I'll find out what I'm missing."],
      ["menma_future_master_02","Hungry."],
      ["menma_future_master_03","Ambitious."]
    ]){
      await page.waitForFunction(id=>getActiveStorySceneRuntime()?.beatId===id,beatId,{timeout:12000});
      const beat=await page.evaluate(()=>getCurrentStorySceneBeat());
      assert.strictEqual(beat.text,text,"#388 selected future branch drift at "+beatId);
      await clickStoryPrimary(page);
    }

    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="menma_future_terminal",null,{timeout:12000});
    assert.strictEqual(await page.evaluate(()=>getCurrentStorySceneBeat()?.text||null),"Menma runs toward Konoha.");
    await page.screenshot({path:path.join(OUT,"party-defeat-future-terminal.png"),fullPage:false,timeout:12000}).catch(()=>{});
    await clickStoryPrimary(page);
    await page.waitForFunction(()=>getActiveStorySceneRuntime()===null&&getAcademyTeamFormationSnapshot()?.required===true,null,{timeout:12000});
    const completion=await page.evaluate(()=>({
      activeScene:getActiveStorySceneRuntime(),
      origin:ensurePlayerAcquisitionState().chronicleOrigin,
      formation:getAcademyTeamFormationSnapshot(),
      intentCount:getActivityHistory().filter(r=>r&&r.occurrenceId==="occ_origin_menma_future_ambition_intent").length
    }));
    assert.strictEqual(completion.activeScene,null,"Scene 10 terminal did not close the Origin");
    assert.strictEqual(completion.origin?.prologueCompleted,true,"existing Origin completion boundary did not fire");
    assert.strictEqual(completion.formation?.required,true,"existing Chronicle-begins/team-formation boundary did not follow Scene 10");
    assert.strictEqual(completion.intentCount,1,"Origin completion duplicated future-ambition intent");

    await gate.assertClean("issue-369-guest-ally-defeat-story-return");
    return{
      partyDefeat:true,
      menmaWithdrawn:terminal.state.menmaWithdrawn,
      ankoWithdrawn:terminal.state.ankoWithdrawn,
      unresolvedHostiles:terminal.receipt.unresolvedHostileIds,
      storyReturnBeat:"menma_party_defeat_return_01",
      futureChoice:true,
      futureIntent:"master_what_they_wont_teach_me",
      originCompleted:true
    };
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  try{
    const victory=await guestAllyVictoryAndReload(browser);
    const defeat=await legitimatePartyDefeat(browser);
    const summary={
      pass:true,issue:369,kind:"installed_browser_menma_guest_ally_evolved_pl_battle",
      checks:{
        storyBattleStory:true,
        ankoStartsActive:true,
        ankoIsPlayerControlledGuestAlly:true,
        exactFourSkillGuestPalette:true,
        forbiddenTwinSnakesExcluded:true,
        allThreeEnemyPortraitsProjected:true,
        forestBackdropProjected:true,
        playerChoosesAnkoActions:true,
        ordinaryEnemyResponsesEnabled:true,
        alteredThenBruteThenUnstableRelay:true,
        ankoYieldsToMenmaAfterLegitimateFirstTwo:true,
        enemyActsBeforeMenmaAfterYield:true,
        menmaEvidenceStartsAtFirstActiveMoment:true,
        menmaWithdrawalRelaysBackToEligibleAnko:true,
        partyDefeatRequiresAlliedExhaustion:true,
        saveRestoreDoesNotReplayCommittedActions:true,
        exact100RyoOnce:true,
        defeatPaysZero:true,
        partyDefeatReturnsToExactWritingContinuation:true,
        partyDefeatStoryReturnReloadSafe:true,
        defeatContinuationReachesFutureAmbition:true,
        futureAmbitionIntentHistoryOnly:true,
        defeatPathCompletesOriginNormally:true
      },
      victory,defeat,browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
