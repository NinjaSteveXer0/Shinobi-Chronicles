#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_369_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_369_BROWSER_OUT||"artifacts/issue-369-menma-battle";
const SCENE="origin_academy_menma_prologue";
const CONFIG="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE="stop_three_test_subjects";
const REWARD_SOURCE="menma_origin_battle_three_test_subjects_victory_ryo_01";
const HOSTILES=["test_subject_altered_shinobi","test_subject_brute","test_subject_unstable"];

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

async function waitRuntime(page){
  await page.waitForFunction(()=>typeof runMenmaEvolvedBattle369Diagnostics==="function"
    &&typeof launchStorySceneBattle==="function"
    &&typeof attemptBattlePreparedSkill==="function"
    &&typeof ensureAcademyMenmaThreeSubjectRewardProjection36200==="function",
    null,{timeout:30000});
}

async function snapshot(page){
  return page.evaluate(({CONFIG,ENCOUNTER,OBJECTIVE,HOSTILES,REWARD_SOURCE})=>{
    const m=currentBattle&&currentBattle.runtime&&currentBattle.runtime.m369||null;
    const rows=typeof getActivityHistory==="function"?getActivityHistory():[];
    return {
      battleId:currentBattle&&currentBattle.battleId||null,
      active:currentBattle&&currentBattle.active===true,
      battleOver:currentBattle&&currentBattle.battleOver===true,
      encounterId:currentBattle&&currentBattle.encounterId||null,
      config:m&&m.config||null,
      objective:m&&m.objective||null,
      playerIndex:m&&m.playerIndex,
      opportunity:m&&m.op?JSON.parse(JSON.stringify(m.op)):null,
      used:m&&Array.isArray(m.used)?[...m.used]:[],
      menmaWithdrawn:m&&m.menmaWithdrawn===true,
      ankoWithdrawn:m&&m.ankoWithdrawn===true,
      resolved:m&&Array.isArray(m.resolved)?[...m.resolved]:[],
      playerSlots:currentBattle&&currentBattle.deployment&&currentBattle.deployment.player
        ?currentBattle.deployment.player.slots.map(s=>s.participantId):[],
      enemySlots:currentBattle&&currentBattle.deployment&&currentBattle.deployment.enemy
        ?currentBattle.deployment.enemy.slots.map(s=>s.participantId):[],
      remaining:Object.fromEntries(["academy_menma","sj_anko",...HOSTILES].map(id=>{
        const side=HOSTILES.includes(id)?"enemy":"player";
        return [id,typeof getBattleRemainingPL==="function"?getBattleRemainingPL(side,id):null];
      })),
      outcome:currentBattle&&currentBattle.outcome?JSON.parse(JSON.stringify(currentBattle.outcome)):null,
      rewards:currentBattle&&currentBattle.rewards?JSON.parse(JSON.stringify(currentBattle.rewards)):null,
      ryo:Number(playerData&&playerData.ryo)||0,
      upstream:rows.filter(r=>r&&r.battleConfigId===CONFIG&&r.encounterId===ENCOUNTER&&r.objectiveId===OBJECTIVE&&r.battleOccurrenceId),
      rewardReceipts:rows.filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===REWARD_SOURCE),
      performance:typeof resolveMenmaOriginTutorialPerformance==="function"?resolveMenmaOriginTutorialPerformance():null,
      men03:typeof getMenmaOriginTutorialPerformanceSourceOccurrence==="function"?getMenmaOriginTutorialPerformanceSourceOccurrence():null,
      activeStory:typeof getActiveStorySceneRuntime==="function"&&getActiveStorySceneRuntime()
        ?JSON.parse(JSON.stringify(getActiveStorySceneRuntime())):null,
      ankoOwned:typeof getPlayerCharacter==="function"?!!getPlayerCharacter("sj_anko"):null,
      hasHp:!!(currentBattle&&(Object.prototype.hasOwnProperty.call(currentBattle,"hp")||Object.prototype.hasOwnProperty.call(currentBattle,"health")))
    };
  },{CONFIG,ENCOUNTER,OBJECTIVE,HOSTILES,REWARD_SOURCE});
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);

    const diag=await page.evaluate(()=>runMenmaEvolvedBattle369Diagnostics());
    assert.strictEqual(diag.pass,true,JSON.stringify(diag));

    const ownershipBefore=await page.evaluate(()=>JSON.stringify(playerData.characterOwnership||{}));
    const started=await page.evaluate(()=>({
      selected:selectChronicleOrigin("academy_menma","issue_369_browser"),
      launched:beginAlphaChronicleOriginPrologue()
    }));
    assert.strictEqual(started.selected?.success,true,"Menma origin selection failed");
    assert.strictEqual(started.launched?.success,true,"Menma Story launch failed");
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene,SCENE,{timeout:12000});
    await page.evaluate(()=>setStorySceneBeat("tutorial_battle"));
    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="tutorial_battle",null,{timeout:8000});

    const launched=await page.evaluate(()=>launchStorySceneBattle());
    assert.strictEqual(launched.success,true,JSON.stringify(launched));
    await page.waitForFunction(enc=>currentBattle?.encounterId===enc&&currentBattle?.runtime?.m369?.op?.actorId==="academy_menma",ENCOUNTER,{timeout:10000});
    await releaseFrontDoor(page);

    let s=await snapshot(page);
    const startingRyo=s.ryo;
    assert.strictEqual(s.config,CONFIG);
    assert.strictEqual(s.objective,OBJECTIVE);
    assert.strictEqual(s.hasHp,false,"parallel HP/health layer appeared");
    assert.strictEqual(s.ankoOwned,false,"encounter-local Anko leaked into player ownership");
    assert.deepStrictEqual(s.playerSlots.slice(0,2),["academy_menma","sj_anko"]);
    assert.deepStrictEqual(s.enemySlots.slice(0,3),HOSTILES);
    assert.strictEqual(s.opportunity.side,"player");
    assert.strictEqual(s.opportunity.actorId,"academy_menma");
    assert.strictEqual(s.playerIndex,0);
    const battleText=await page.locator("#overlay-content-container").textContent();
    assert(/PL/.test(battleText||""),"Battle presentation does not visibly identify PL");
    await page.screenshot({path:path.join(OUT,"01-menma-evolved-battle-start.png"),fullPage:false,timeout:12000});

    const first=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_guard_breaker"));
    assert.strictEqual(first.success,true,JSON.stringify(first));
    await page.waitForTimeout(180);
    s=await snapshot(page);
    assert.strictEqual(s.battleOver,false);
    assert.strictEqual(s.playerIndex,2,"Menma/Anko player-side entitlement did not alternate exactly once");
    assert.strictEqual(s.opportunity.side,"player");
    assert.strictEqual(s.opportunity.actorId,"academy_menma");
    assert.strictEqual(s.playerSlots[0],"academy_menma");
    assert.strictEqual(s.playerSlots[1],"sj_anko");
    assert(s.used.length>=4,"side opportunity commits were not recorded");
    const persistence={battleId:s.battleId,playerIndex:s.playerIndex,opportunityId:s.opportunity.id,used:s.used.length};

    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await releaseFrontDoor(page);
    await page.waitForFunction(enc=>currentBattle?.encounterId===enc&&currentBattle?.runtime?.m369?.op?.actorId==="academy_menma",ENCOUNTER,{timeout:15000});
    s=await snapshot(page);
    assert.strictEqual(s.battleId,persistence.battleId,"reload changed Battle/session identity");
    assert.strictEqual(s.playerIndex,persistence.playerIndex,"reload changed Menma/Anko entitlement index");
    assert.strictEqual(s.opportunity.id,persistence.opportunityId,"reload changed open action-opportunity identity");
    assert.strictEqual(s.used.length,persistence.used,"reload repeated or lost committed opportunities");
    assert.deepStrictEqual(s.playerSlots.slice(0,2),["academy_menma","sj_anko"],"reload lost scoped Benched Anko projection");
    await page.screenshot({path:path.join(OUT,"02-menma-battle-after-reload.png"),fullPage:false,timeout:12000});

    for(let i=0;i<12;i++){
      s=await snapshot(page);
      if(s.battleOver)break;
      assert.strictEqual(s.opportunity?.side,"player","settled Battle did not return to player side");
      assert.strictEqual(s.opportunity?.actorId,"academy_menma","Anko assist exposed a player-controlled opportunity");
      const result=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_guard_breaker"));
      if(result&&result.success!==true&&result.reason==="player_input_locked"){
        await page.waitForTimeout(180);
        i-=1;
        continue;
      }
      assert.strictEqual(result?.success,true,JSON.stringify(result));
      await page.waitForTimeout(180);
    }

    s=await snapshot(page);
    assert.strictEqual(s.battleOver,true,"evolved Menma Battle did not reach a terminal result");
    assert.strictEqual(s.outcome?.type,"victory",JSON.stringify(s.outcome));
    assert.strictEqual(s.outcome?.objectiveCompleted,true);
    assert.deepStrictEqual([...s.resolved].sort(),[...HOSTILES].sort());
    assert(HOSTILES.every(id=>Number(s.remaining[id])===0),"not all three independent hostile Battle PL ledgers reached withdrawal");
    assert.strictEqual(s.menmaWithdrawn,false);
    assert.strictEqual(s.rewards?.generated,true,"whole-encounter reward did not unlock");
    assert.strictEqual(s.rewards?.ryo,100,"whole-encounter reward was not exactly 100 Ryō");
    assert.strictEqual(s.upstream.length,1,"authoritative Battle receipt cardinality is not exactly one");
    assert.strictEqual(s.rewardReceipts.length,0,"reward was claimed before player claim");
    assert.strictEqual(s.performance?.menmaOnlyAttribution,true);
    assert.strictEqual(s.performance?.ankoActionsExcluded,true);
    assert.strictEqual(s.performance?.wholeThreeSubjectCompletionRequired,true);
    assert.strictEqual(s.performance?.tutorialResult,"completed");
    await page.screenshot({path:path.join(OUT,"03-menma-evolved-battle-victory.png"),fullPage:false,timeout:12000});

    const claimed=await page.evaluate(()=>claimCurrentBattleRewards());
    assert.strictEqual(claimed,true,"reward claim failed");
    s=await snapshot(page);
    assert.strictEqual(s.ryo,startingRyo+100,"reward claim did not grant exactly 100 Ryō");
    assert.strictEqual(s.rewardReceipts.length,1,"reward receipt cardinality is not exactly one");
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),false,"duplicate reward claim succeeded");
    assert.strictEqual((await snapshot(page)).ryo,startingRyo+100,"duplicate reward claim changed Ryō");

    const continued=await page.evaluate(()=>continueAfterVictory());
    assert.notStrictEqual(continued,false,"continueAfterVictory failed");
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="post_battle_opening",SCENE,{timeout:12000});
    s=await snapshot(page);
    assert.strictEqual(s.activeStory?.sceneId,SCENE);
    assert.strictEqual(s.activeStory?.beatId,"post_battle_opening");
    assert.strictEqual(s.rewardReceipts.length,1,"Story return duplicated reward receipt");
    assert.strictEqual(s.ryo,startingRyo+100,"Story return changed reward");
    assert(s.men03&&s.men03.occurrenceId==="combat_academy_menma_tutorial_performance_resolved","MEN-03 stable source occurrence did not commit");
    assert.strictEqual(await page.evaluate(()=>JSON.stringify(playerData.characterOwnership||{})),ownershipBefore,"Battle mutated player ownership");
    await page.screenshot({path:path.join(OUT,"04-menma-story-return.png"),fullPage:false,timeout:12000});

    const errors=await gate.assertClean("issue-369-menma-evolved-pl-battle");
    const summary={
      pass:true,issue:369,kind:"installed_browser_story_battle_story",
      battleId:persistence.battleId,
      encounterId:ENCOUNTER,
      battleConfigId:CONFIG,
      checks:{
        plIdentity:true,
        playerStartsFirst:true,
        entitlementReloadStable:true,
        ankoRemainsBenched:true,
        enemyActiveRelay:true,
        threeIndependentHostilePL:true,
        menmaOnlyPerformance:true,
        exactReward100Once:true,
        storyBattleStory:true,
        ownershipNotMutated:true
      },
      runtimeErrors:errors,
      browserGoldenClaimed:true
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
