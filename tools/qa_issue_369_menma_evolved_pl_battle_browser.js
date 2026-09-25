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
  // A fresh Playwright context already starts with isolated storage. Do not
  // clear sessionStorage in an init script: init scripts run again on reload
  // and would erase the Battle snapshot this test is explicitly validating.
  // Diagnostic only: record every write to the one shared session snapshot so
  // a startup overwrite can be attributed without changing storage behavior.
  await page.addInitScript(()=>{
    const original=Storage.prototype.setItem;
    globalThis.__ISSUE369_SESSION_WRITE_TRACE__=[];
    Storage.prototype.setItem=function(key,value){
      if(this===sessionStorage&&key==="shinobiTestState"){
        let summary=null;
        try{
          const parsed=JSON.parse(String(value));
          summary={
            encounterId:parsed&&parsed.encounterId||null,
            battleConfigId:parsed&&parsed.battleConfigId||null,
            objectiveId:parsed&&parsed.objectiveId||null,
            battleId:parsed&&parsed.battleId||null,
            overlayType:parsed&&parsed.overlayType||null,
            battleOver:parsed&&parsed.battleOver===true,
            menma369BattleActive:parsed&&parsed.menma369BattleActive===true,
            hasSemanticState:!!(parsed&&parsed.menmaEvolvedPLBattle36900)
          };
        }catch(_error){}
        globalThis.__ISSUE369_SESSION_WRITE_TRACE__.push({
          summary,
          stack:String(new Error("issue369_session_write").stack||"")
        });
      }
      return original.apply(this,arguments);
    };
  });
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>!!(
    typeof getRuntimeBuildFingerprint==="function"&&
    typeof selectChronicleOrigin==="function"&&
    typeof beginAlphaChronicleOriginPrologue==="function"&&
    typeof runIssue369MenmaEvolvedPLBattleDiagnostics==="function"&&
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
    beat:(()=>{const b=getCurrentStorySceneBeat();return b&&{mode:b.mode,battle:b.battle&&{encounterId:b.battle.encounterId,battleConfigId:b.battle.battleConfigId,objectiveId:b.battle.objectiveId,hasLaunchResolver:typeof b.battle.launchResolver==="function"}};})(),
    diag:runIssue369MenmaEvolvedPLBattleDiagnostics()
  }));
  assert.strictEqual(pre.diag.pass,true,label+" source/runtime diagnostic RED "+JSON.stringify(pre.diag));
  assert.deepStrictEqual(pre.beat,{
    mode:"battle_transition",
    battle:{encounterId:ENCOUNTER,battleConfigId:CONFIG,objectiveId:OBJECTIVE,hasLaunchResolver:true}
  },label+" Story battle authority drift");

  const launch=await page.evaluate(()=>advanceStoryScene());
  assert(launch&&launch.success===true,label+" Story -> Battle launch failed "+JSON.stringify(launch));
  await page.waitForFunction(enc=>currentBattle&&currentBattle.active===true&&currentBattle.encounterId===enc,ENCOUNTER,{timeout:12000});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});

  const state=await page.evaluate(()=>({
    encounterId:currentBattle.encounterId,
    configId:currentBattle.battleConfigId,
    objectiveId:currentBattle.objectiveId,
    deployment:{
      player:currentBattle.deployment.player.slots.map(s=>s.participantId).filter(Boolean),
      enemy:currentBattle.deployment.enemy.slots.map(s=>s.participantId).filter(Boolean)
    },
    pl:{
      menma:getBattleRemainingPL("player","academy_menma"),
      anko:getBattleRemainingPL("player","sj_anko"),
      altered:getBattleRemainingPL("enemy","test_subject_altered_shinobi"),
      brute:getBattleRemainingPL("enemy","test_subject_brute"),
      unstable:getBattleRemainingPL("enemy","test_subject_unstable")
    },
    semantic:getMenmaEvolvedPLBattleState36900(),
    readiness:getMenmaEvolvedPLBattleInputReadiness36900(),
    clan:typeof getPersistentClanBattleQueueSlots==="function"?getPersistentClanBattleQueueSlots():[],
    ankoOwned:!!getPlayerCharacter("sj_anko"),
    teamIds:Array.isArray(playerTeam)?playerTeam.map(x=>x&&x.id).filter(Boolean):[]
  }));
  assert.strictEqual(state.encounterId,ENCOUNTER);
  assert.strictEqual(state.configId,CONFIG);
  assert.strictEqual(state.objectiveId,OBJECTIVE);
  assert.deepStrictEqual(state.deployment.player,[MENMA,ANKO],"exact allied deployment");
  assert.deepStrictEqual(state.deployment.enemy,HOSTILES,"exact hostile deployment");
  assert(state.pl.menma>0,"Menma Battle PL missing");
  assert.strictEqual(state.pl.anko,56,"Anko Battle PL drift");
  assert.deepStrictEqual([state.pl.altered,state.pl.brute,state.pl.unstable],[11,13,12],"hostile Battle PL drift");
  assert.strictEqual(state.semantic.phase,"player");
  assert.strictEqual(state.semantic.playerEntitlementIndex,0);
  assert.strictEqual(state.readiness.ready,true);
  assert.deepStrictEqual(state.clan,pre.clan,"exact Origin launch mutated My Clan order");
  assert.strictEqual(state.ankoOwned,pre.ankoOwned,"Anko encounter presence changed ownership");
  assert.deepStrictEqual(state.teamIds,pre.teamIds,"Anko encounter presence mutated owned playerTeam");

  return{context,page,gate,pre};
}

async function evidenceCounts(page){
  return page.evaluate(()=>{
    const rows=currentBattle.runtime&&Array.isArray(currentBattle.runtime.evidence)?currentBattle.runtime.evidence:[];
    const count=t=>rows.filter(r=>r&&r.eventType===t).length;
    return{
      menmaSkills:count("skill_action_completed"),
      ankoAssists:count("menma_origin_anko_assist_completed"),
      ankoSkips:count("menma_origin_anko_assist_skipped")+count("menma_origin_anko_assist_failed_visible"),
      enemyActions:count("enemy_authored_action_completed"),
      enemySkips:count("menma_origin_enemy_opportunity_skipped")+count("menma_origin_enemy_opportunity_failed_visible"),
      observations:count("menma_origin_anko_action_observed")
    };
  });
}

async function cadenceAndReload(browser){
  const {context,page,gate}=await bootScenario(browser,"cadence");
  try{
    const withdraw=await page.evaluate(()=>{
      const before={
        menma:getBattleRemainingPL("player","academy_menma"),
        state:getMenmaEvolvedPLBattleState36900()
      };
      const can=canWithdrawActiveBattleFighter();
      const attempted=withdrawActiveBattleFighter();
      const after={
        menma:getBattleRemainingPL("player","academy_menma"),
        state:getMenmaEvolvedPLBattleState36900()
      };
      return{can,attempted,before,after};
    });
    assert.strictEqual(withdraw.can,false,"manual WITHDRAW UI boundary open");
    assert.strictEqual(withdraw.attempted,false,"programmatic manual WITHDRAW accepted");
    assert.strictEqual(withdraw.after.menma,withdraw.before.menma,"rejected WITHDRAW changed Menma PL");
    assert.deepStrictEqual(withdraw.after.state.committedOpportunities,withdraw.before.state.committedOpportunities,"rejected WITHDRAW consumed semantic opportunity");

    const first=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_chakra_knuckle"));
    assert(first&&first.success===true,"first Menma action failed "+JSON.stringify(first));
    const afterFirst=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      readiness:getMenmaEvolvedPLBattleInputReadiness36900(),
      activeEnemy:getBattleDeploymentParticipant("enemy",1)?.id||null,
      alteredPL:getBattleRemainingPL("enemy","test_subject_altered_shinobi"),
      menmaPL:getBattleRemainingPL("player","academy_menma"),
      ankoPL:getBattleRemainingPL("player","sj_anko")
    }));
    const counts1=await evidenceCounts(page);
    assert.strictEqual(afterFirst.state.phase,"player","semantic loop did not return to player side");
    assert.strictEqual(afterFirst.state.playerEntitlementIndex,2,"Menma/Anko entitlement did not alternate exactly once");
    assert.strictEqual(afterFirst.readiness.ready,true,"Menma dock not restored after Menma -> Enemy -> Anko -> Enemy");
    assert.strictEqual(afterFirst.activeEnemy,"test_subject_altered_shinobi","enemy Active changed before withdrawal");
    assert.strictEqual(afterFirst.alteredPL,6,"Menma authored ATK6 / Stamina mitigation drift");
    assert.strictEqual(counts1.ankoAssists,1,"Anko did not consume exactly one player-side assist opportunity");
    assert.strictEqual(counts1.enemyActions+counts1.enemySkips,2,"enemy side did not consume exactly two interleaved opportunities");
    assert.strictEqual(counts1.observations,1,"same-Battle Anko observation was not emitted for Menma action");
    assert(Object.keys(afterFirst.state.committedOpportunities).length===4,"one action per side opportunity cardinality drift");
    assert(Object.keys(afterFirst.state.rngChoices).length>=2,"committed enemy RNG choices missing");

    const beforeReload=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      pl:JSON.parse(JSON.stringify(currentBattle.runtime.remainingPL)),
      evidenceCount:currentBattle.runtime.evidence.length
    }));
    const savedBeforeReload=await page.evaluate(()=>{
      const raw=sessionStorage.getItem("shinobiTestState");
      const saved=raw?JSON.parse(raw):null;
      return saved?{
        overlayType:saved.overlayType||null,
        battleId:saved.battleId||null,
        encounterId:saved.encounterId||null,
        battleConfigId:saved.battleConfigId||null,
        objectiveId:saved.objectiveId||null,
        battleOver:saved.battleOver===true,
        menma369BattleActive:saved.menma369BattleActive===true,
        hasSemanticState:!!saved.menmaEvolvedPLBattle36900,
        semanticPhase:saved.menmaEvolvedPLBattle36900&&saved.menmaEvolvedPLBattle36900.phase||null,
        semanticEntitlementIndex:saved.menmaEvolvedPLBattle36900&&saved.menmaEvolvedPLBattle36900.playerEntitlementIndex
      }:null;
    });
    console.log("ISSUE369 PRE-RELOAD",JSON.stringify(savedBeforeReload));
    assert(savedBeforeReload,"semantic session snapshot missing before reload");
    assert.strictEqual(savedBeforeReload.encounterId,ENCOUNTER,"saved encounter identity drift");
    assert.strictEqual(savedBeforeReload.battleConfigId,CONFIG,"saved battle config identity missing");
    assert.strictEqual(savedBeforeReload.objectiveId,OBJECTIVE,"saved objective identity missing");
    assert.strictEqual(savedBeforeReload.menma369BattleActive,true,"semantic active-Battle bit was not persisted");
    assert.strictEqual(savedBeforeReload.hasSemanticState,true,"semantic Battle state was not persisted");
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>typeof getMenmaEvolvedPLBattleState36900==="function",{timeout:30000});
    const reloadBootState=await page.evaluate(()=>({
      readyState:document.readyState,
      active:!!(currentBattle&&currentBattle.active),
      battleOver:!!(currentBattle&&currentBattle.battleOver),
      encounterId:currentBattle&&currentBattle.encounterId||null,
      battleConfigId:currentBattle&&currentBattle.battleConfigId||null,
      objectiveId:currentBattle&&currentBattle.objectiveId||null,
      battleId:currentBattle&&currentBattle.battleId||null,
      hasRuntime:!!(currentBattle&&currentBattle.runtime),
      semantic:getMenmaEvolvedPLBattleState36900(),
      restoreWrapped:typeof restoreTestState==="function"&&restoreTestState.toString().includes("menma369BattleActive"),
      saved:(()=>{const raw=sessionStorage.getItem("shinobiTestState");if(!raw)return null;const x=JSON.parse(raw);return{encounterId:x.encounterId||null,battleConfigId:x.battleConfigId||null,battleOver:x.battleOver===true,menma369BattleActive:x.menma369BattleActive===true,overlayType:x.overlayType||null};})()
    }));
    console.log("ISSUE369 POST-RELOAD BOOT",JSON.stringify(reloadBootState));
    const reloadWriteTrace=await page.evaluate(()=>globalThis.__ISSUE369_SESSION_WRITE_TRACE__||[]);
    console.log("ISSUE369 RELOAD SESSION WRITE TRACE",JSON.stringify(reloadWriteTrace));
    await page.waitForFunction(enc=>currentBattle&&currentBattle.active===true&&currentBattle.encounterId===enc,ENCOUNTER,{timeout:30000});
    await releaseFrontDoor(page);
    const afterReload=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      pl:JSON.parse(JSON.stringify(currentBattle.runtime.remainingPL)),
      evidenceCount:currentBattle.runtime.evidence.length,
      readiness:getMenmaEvolvedPLBattleInputReadiness36900()
    }));
    assert.strictEqual(afterReload.state.phase,beforeReload.state.phase,"reload changed side phase");
    assert.strictEqual(afterReload.state.playerEntitlementIndex,beforeReload.state.playerEntitlementIndex,"reload changed entitlement index");
    assert.deepStrictEqual(afterReload.state.committedOpportunities,beforeReload.state.committedOpportunities,"reload changed committed opportunities");
    assert.deepStrictEqual(afterReload.state.rngChoices,beforeReload.state.rngChoices,"reload rerolled committed choices");
    assert.deepStrictEqual(afterReload.pl,beforeReload.pl,"reload changed Remaining Battle PL");
    assert.strictEqual(afterReload.evidenceCount,beforeReload.evidenceCount,"reload replayed committed action evidence");
    assert.strictEqual(afterReload.readiness.ready,true,"reload did not restore Menma player input boundary");

    // Isolate the Anko-withdrawal entitlement assertion from incidental damage
    // already accumulated during the reload/RNG proof above. The product rule
    // being tested here is who owns the next player opportunity; Menma reaching
    // 0 from the following legitimate enemy action is separately required to
    // commit tutorial defeat and would make that handoff unobservable.
    const cadenceFixture=await page.evaluate(()=>{
      const maximum=getBattleMaximumPL("player","academy_menma");
      const before=getBattleRemainingPL("player","academy_menma");
      setBattleRemainingPL("player","academy_menma",maximum);
      return{before,maximum,after:getBattleRemainingPL("player","academy_menma"),state:getMenmaEvolvedPLBattleState36900()};
    });
    assert(cadenceFixture.maximum>0,"Menma maximum Battle PL missing in cadence fixture");
    assert.strictEqual(cadenceFixture.after,cadenceFixture.maximum,"cadence fixture could not restore Menma Battle PL");
    assert.strictEqual(cadenceFixture.state.phase,"player","cadence fixture changed semantic phase");

    const beforeAnkoOut=await evidenceCounts(page);
    const ankoOut=await page.evaluate(()=>{
      const menmaBefore=getBattleRemainingPL("player","academy_menma");
      setBattleRemainingPL("player","sj_anko",0);
      const result=handleBattleParticipantAtZeroPL("player","sj_anko",null,{actionId:"qa369_anko_withdrawal"});
      return{
        result,
        state:getMenmaEvolvedPLBattleState36900(),
        playerSlots:currentBattle.deployment.player.slots.map(s=>s.participantId).filter(Boolean),
        menmaBefore,
        menmaAfter:getBattleRemainingPL("player","academy_menma")
      };
    });
    assert.strictEqual(ankoOut.state.ankoWithdrawn,true,"Anko withdrawal state missing");
    assert.deepStrictEqual(ankoOut.playerSlots,[MENMA],"Anko withdrawal promoted/reordered player formation");
    assert.strictEqual(ankoOut.menmaAfter,ankoOut.menmaBefore,"Anko withdrawal changed Menma Battle PL");
    assert(ankoOut.menmaAfter>0,"Anko withdrawal left Menma unable to receive the next player opportunity");

    const second=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_chakra_knuckle"));
    assert(second&&second.success===true,"post-Anko-withdrawal Menma action failed "+JSON.stringify(second));
    const afterAnkoOut=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      readiness:getMenmaEvolvedPLBattleInputReadiness36900(),
      battle:{active:currentBattle.active===true,battleOver:currentBattle.battleOver===true,outcome:currentBattle.outcome?JSON.parse(JSON.stringify(currentBattle.outcome)):null},
      pl:{menma:getBattleRemainingPL("player","academy_menma"),anko:getBattleRemainingPL("player","sj_anko"),altered:getBattleRemainingPL("enemy","test_subject_altered_shinobi")},
      activeEnemy:getBattleDeploymentParticipant("enemy",1)?.id||null
    }));
    console.log("ISSUE369 AFTER ANKO WITHDRAWAL HANDOFF",JSON.stringify({second,afterAnkoOut}));
    const counts2=await evidenceCounts(page);
    assert.strictEqual(counts2.ankoAssists,beforeAnkoOut.ankoAssists,"withdrawn Anko received another assist opportunity");
    assert.strictEqual(counts2.enemyActions+counts2.enemySkips,(beforeAnkoOut.enemyActions+beforeAnkoOut.enemySkips)+1,"Anko withdrawal did not hand every later player opportunity to Menma");
    assert.strictEqual(afterAnkoOut.readiness.ready,true,"Menma did not receive next player opportunity after Anko withdrawal");

    await page.screenshot({path:path.join(OUT,"cadence-after-reload-and-anko-withdrawal.png"),fullPage:false,timeout:12000});
    await gate.assertClean("issue-369-cadence-reload");
    return{counts1,counts2,committed:Object.keys(afterAnkoOut.state.committedOpportunities).length};
  }finally{await context.close();}
}

async function relayVictoryRewardAndReturn(browser){
  const {context,page,gate}=await bootScenario(browser,"victory");
  try{
    const first=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_chakra_knuckle"));
    assert(first&&first.success===true,"victory setup Menma action failed "+JSON.stringify(first));

    const relay=await page.evaluate(()=>{
      const actor=getPlayerCharacter("academy_menma");
      setBattleRemainingPL("enemy","test_subject_brute",0);
      const brute=handleBattleParticipantAtZeroPL("enemy","test_subject_brute",actor,{actionId:"qa369_brute_offslot"});
      const afterBrute=getBattleDeploymentParticipant("enemy",1)?.id||null;
      setBattleRemainingPL("enemy","test_subject_altered_shinobi",0);
      const altered=handleBattleParticipantAtZeroPL("enemy","test_subject_altered_shinobi",actor,{actionId:"qa369_altered_active"});
      const afterAltered=getBattleDeploymentParticipant("enemy",1)?.id||null;
      return{
        brute,altered,afterBrute,afterAltered,
        slots:currentBattle.deployment.enemy.slots.map(s=>s.participantId).filter(Boolean),
        state:getMenmaEvolvedPLBattleState36900()
      };
    });
    assert.strictEqual(relay.afterBrute,"test_subject_altered_shinobi","Benched Brute withdrawal changed current Active early");
    assert.strictEqual(relay.afterAltered,"test_subject_unstable","relay failed to skip already-withdrawn Benched Brute");
    assert.deepStrictEqual(relay.slots,["test_subject_unstable"],"enemy relay compaction drift");

    const terminal=await page.evaluate(()=>{
      const actor=getPlayerCharacter("academy_menma");
      setBattleRemainingPL("enemy","test_subject_unstable",0);
      const zero=handleBattleParticipantAtZeroPL("enemy","test_subject_unstable",actor,{actionId:"qa369_unstable_terminal"});
      const rt=getActiveStorySceneRuntime();
      const occurrenceId="battle_occ_origin_academy_menma_three_test_subjects:"+rt.instanceId;
      const rows=getActivityHistory();
      return{
        zero,
        occurrenceId,
        outcome:JSON.parse(JSON.stringify(currentBattle.outcome||null)),
        rewards:JSON.parse(JSON.stringify(currentBattle.rewards||{})),
        receipts:rows.filter(r=>r&&r.battleOccurrenceId===occurrenceId&&r.type!=="origin_battle_reward").map(r=>JSON.parse(JSON.stringify(r)))
      };
    });
    assert(terminal.outcome&&terminal.outcome.type==="victory","three-hostile resolution did not commit victory "+JSON.stringify(terminal.outcome));
    assert.strictEqual(terminal.receipts.length,1,"exact Battle occurrence receipt cardinality");
    const receipt=terminal.receipts[0];
    assert.strictEqual(receipt.battleConfigId,CONFIG);
    assert.strictEqual(receipt.encounterId,ENCOUNTER);
    assert.strictEqual(receipt.objectiveId,OBJECTIVE);
    assert.strictEqual(receipt.battleResult,"victory");
    assert.strictEqual(receipt.objectiveCompleted,true);
    assert.strictEqual(receipt.menmaWithdrawn,false);
    assert.deepStrictEqual(receipt.alliedParticipantIds,[MENMA,ANKO]);
    assert.deepStrictEqual(receipt.hostileParticipantIds,HOSTILES);
    assert.deepStrictEqual(receipt.resolvedHostileIds,HOSTILES);
    assert.strictEqual(terminal.rewards.generated,true,"existing #362 adapter did not activate from exact receipt");
    assert.strictEqual(terminal.rewards.ryo,100,"successor reward is not exact 100 Ryō");
    assert.strictEqual(terminal.rewards.exp,0);
    assert.deepStrictEqual(terminal.rewards.items,[]);
    assert.deepStrictEqual(terminal.rewards.rareDrops,[]);

    const beforeClaim=await page.evaluate(()=>Number(playerData.ryo)||0);
    const claimed=await page.evaluate(()=>claimCurrentBattleRewards());
    assert.strictEqual(claimed,true,"exact 100 Ryō reward claim failed");
    const afterClaim=await page.evaluate(()=>Number(playerData.ryo)||0);
    assert.strictEqual(afterClaim,beforeClaim+100,"claim did not add exactly 100 Ryō");
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),false,"repeat claim accepted");
    assert.strictEqual(await page.evaluate(()=>Number(playerData.ryo)||0),afterClaim,"repeat claim duplicated Ryō");

    const rewardRows=await page.evaluate(source=>getActivityHistory().filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===source).map(r=>JSON.parse(JSON.stringify(r))),REWARD_SOURCE);
    assert.strictEqual(rewardRows.length,1,"reward receipt duplicated");

    const returned=await page.evaluate(()=>continueAfterVictory());
    assert(returned&&returned.success===true,"victory did not return to Story "+JSON.stringify(returned));
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="post_battle_opening",SCENE,{timeout:12000});
    const post=await page.evaluate(({MEN03_SOURCE})=>({
      beat:getActiveStorySceneRuntime()?.beatId||null,
      ryo:Number(playerData.ryo)||0,
      men03:getActivityHistory().filter(r=>r&&r.occurrenceId===MEN03_SOURCE).map(r=>JSON.parse(JSON.stringify(r))),
      rewardCount:getActivityHistory().filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId==="menma_origin_battle_three_test_subjects_victory_ryo_01").length
    }),{MEN03_SOURCE});
    assert.strictEqual(post.beat,"post_battle_opening");
    assert.strictEqual(post.ryo,afterClaim,"Story return mutated Ryō");
    assert.strictEqual(post.rewardCount,1,"Story return duplicated reward");
    assert.strictEqual(post.men03.length,1,"MEN-03 stable aggregate source missing after valid whole-encounter victory");
    assert.strictEqual(post.men03[0].occurrenceId,MEN03_SOURCE,"MEN-03 source identity drifted");

    await page.screenshot({path:path.join(OUT,"victory-story-return.png"),fullPage:false,timeout:12000});
    await gate.assertClean("issue-369-victory-return");
    return{occurrenceId:terminal.occurrenceId,rewardRyo:100,men03Source:MEN03_SOURCE};
  }finally{await context.close();}
}

async function defeatReceiptAndReturn(browser){
  const {context,page,gate}=await bootScenario(browser,"defeat");
  try{
    const terminal=await page.evaluate(()=>{
      setBattleRemainingPL("player","academy_menma",0);
      const zero=handleBattleParticipantAtZeroPL("player","academy_menma",null,{actionId:"qa369_menma_zero"});
      const rt=getActiveStorySceneRuntime();
      const occurrenceId="battle_occ_origin_academy_menma_three_test_subjects:"+rt.instanceId;
      return{
        zero,occurrenceId,
        outcome:JSON.parse(JSON.stringify(currentBattle.outcome||null)),
        state:getMenmaEvolvedPLBattleState36900(),
        receipts:getActivityHistory().filter(r=>r&&r.battleOccurrenceId===occurrenceId&&r.type!=="origin_battle_reward").map(r=>JSON.parse(JSON.stringify(r))),
        rewards:JSON.parse(JSON.stringify(currentBattle.rewards||{}))
      };
    });
    assert(terminal.outcome&&terminal.outcome.type==="defeat","Menma 0 Battle PL did not commit tutorial defeat");
    assert.strictEqual(terminal.state.menmaWithdrawn,true);
    assert.strictEqual(terminal.state.terminalResult,"defeat");
    assert.strictEqual(terminal.receipts.length,1,"defeat terminal receipt missing/duplicated");
    assert.strictEqual(terminal.receipts[0].battleResult,"defeat");
    assert.strictEqual(terminal.receipts[0].objectiveCompleted,false);
    assert.strictEqual(terminal.receipts[0].menmaWithdrawn,true);
    assert.strictEqual(terminal.rewards.ryo,0,"defeat exposed successor reward");
    assert.strictEqual(terminal.rewards.generated,false,"defeat generated claimable reward");

    const resumed=await page.evaluate(()=>resumeBattleCallerAfterCompletion("defeat"));
    assert(resumed&&resumed.success===true,"defeat did not return to Story "+JSON.stringify(resumed));
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="tutorial_not_completed",SCENE,{timeout:12000});
    const after=await page.evaluate(()=>({
      beat:getActiveStorySceneRuntime()?.beatId||null,
      rewardRows:getActivityHistory().filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId==="menma_origin_battle_three_test_subjects_victory_ryo_01").length,
      ankoAssistRows:(currentBattle.runtime?.evidence||[]).filter(r=>r&&r.eventType==="menma_origin_anko_assist_completed").length
    }));
    assert.strictEqual(after.beat,"tutorial_not_completed");
    assert.strictEqual(after.rewardRows,0,"defeat created reward receipt");
    assert.strictEqual(after.ankoAssistRows,0,"Anko continued after immediate Menma tutorial defeat");

    await page.screenshot({path:path.join(OUT,"defeat-story-return.png"),fullPage:false,timeout:12000});
    await gate.assertClean("issue-369-defeat-return");
    return{occurrenceId:terminal.occurrenceId,beat:after.beat};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  try{
    const cadence=await cadenceAndReload(browser);
    const victory=await relayVictoryRewardAndReturn(browser);
    const defeat=await defeatReceiptAndReturn(browser);
    const summary={
      pass:true,
      issue:369,
      kind:"installed_browser_menma_evolved_pl_battle",
      checks:{
        storyBattleStory:true,
        plIdentityPreserved:true,
        playerSideStarts:true,
        exactlyOneActionPerSideOpportunity:true,
        menmaAnkoEntitlementAlternates:true,
        entitlementSurvivesReload:true,
        committedRngSurvivesReload:true,
        manualWithdrawRejected:true,
        ankoNeverPromoted:true,
        ankoWithdrawalHandsPlayerOpportunitiesToMenma:true,
        enemyActiveOnly:true,
        benchedEnemyWithdrawalSkippedOnRelay:true,
        menmaWithdrawalImmediateDefeat:true,
        exactTerminalReceiptVictoryAndDefeat:true,
        men03StableSource:true,
        exact100RyoOnce:true
      },
      cadence,victory,defeat,
      browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
