#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_362_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_362_BROWSER_OUT||"artifacts/issue-362-menma-reward";
const SCENE="origin_academy_menma_prologue";
const CONFIG="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE="stop_three_test_subjects";
const SOURCE_ID="menma_origin_battle_three_test_subjects_victory_ryo_01";
const OLD_SOURCE="menma_origin_battle_altered_shinobi_victory_ryo_01";
const HOSTILES=["test_subject_altered_shinobi","test_subject_brute","test_subject_unstable"];
const ALLIES=["academy_menma","sj_anko"];

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function boot(page){
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof getRuntimeBuildFingerprint==="function"&&typeof selectChronicleOrigin==="function"&&typeof beginAlphaChronicleOriginPrologue==="function"&&typeof ensureAcademyMenmaThreeSubjectRewardProjection36200==="function",null,{timeout:30000});
  const fp=await page.evaluate(()=>getRuntimeBuildFingerprint());
  assert.strictEqual(fp.buildId,"SC-ALPHA-RUNTIME-R303-2026-09-25-AE","#362 runtime fingerprint not loaded");
  const started=await page.evaluate(()=>({
    selected:selectChronicleOrigin("academy_menma","issue_362_browser"),
    launched:beginAlphaChronicleOriginPrologue()
  }));
  assert(started.selected?.success===true,"Menma select failed "+JSON.stringify(started));
  assert(started.launched?.success===true,"Menma Story launch failed "+JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene,SCENE,{timeout:15000});
  await page.evaluate(()=>setStorySceneBeat("tutorial_battle"));
  await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="tutorial_battle",null,{timeout:8000});
}
async function setupBattle(page,resolved,{terminal=false,menmaWithdrawn=false}={}){
  return page.evaluate(({resolved,terminal,menmaWithdrawn,CONFIG,ENCOUNTER,OBJECTIVE,SCENE,HOSTILES,ALLIES,SOURCE_ID})=>{
    const rt=getActiveStorySceneRuntime();
    if(!rt||rt.sceneId!==SCENE)throw new Error("Menma Story runtime missing");
    const occurrenceId="battle_occ_origin_academy_menma_three_test_subjects:"+rt.instanceId;
    const rows=getActivityHistory();
    for(let i=rows.length-1;i>=0;i--){
      const row=rows[i];
      if(row&&(
        row.battleOccurrenceId===occurrenceId||
        row.occurrenceId===occurrenceId||
        (row.type==="origin_battle_reward"&&row.rewardSourceId===SOURCE_ID&&row.battleOccurrenceId===occurrenceId)
      ))rows.splice(i,1);
    }
    const receipt={
      type:"battle_occurrence",activity:"battle",committed:true,completed:terminal&&!menmaWithdrawn,
      occurrenceId,sourceOccurrenceId:occurrenceId,battleOccurrenceId:occurrenceId,
      battleConfigId:CONFIG,encounterId:ENCOUNTER,objectiveId:OBJECTIVE,
      alliedParticipantIds:[...ALLIES],hostileParticipantIds:[...HOSTILES],
      battleResult:terminal&&!menmaWithdrawn?"victory":(menmaWithdrawn?"defeat":"in_progress"),
      objectiveCompleted:terminal&&!menmaWithdrawn,
      menmaWithdrawn,ankoWithdrawn:false,resolvedHostileIds:[...resolved],
      timestamp:Date.now()
    };
    rows.push(receipt);playerData.activityHistory=rows;
    const enemy=enemyDatabase.test_subject_altered_shinobi;
    if(!enemy)throw new Error("Altered Shinobi enemy authority missing");
    selectedEnemy=enemy;
    currentBattle.active=!terminal;
    currentBattle.battleOver=terminal;
    currentBattle.battleId="battle_issue_362_"+rt.instanceId;
    currentBattle.encounterId=ENCOUNTER;
    currentBattle.characterId="academy_menma";
    currentBattle.enemy=enemy;
    currentBattle.encounterEnemy=enemy;
    currentBattle.completedAt=terminal?Date.now():null;
    currentBattle.claimedAt=null;
    currentBattle.completionRecorded=false;
    currentBattle.outcome=terminal
      ? {type:menmaWithdrawn?"defeat":"victory",committed:true,completedAt:Date.now(),finishingShinobiId:menmaWithdrawn?null:"academy_menma",menmaWithdrawn}
      : null;
    currentBattle.returnContext={
      type:"story_scene",sceneId:SCENE,sceneInstanceId:rt.instanceId,
      sourceBeatId:"tutorial_battle",victoryBeatId:"post_battle_opening",defeatBeatId:"tutorial_not_completed",
      postBattleBeatId:null,exposeFinisher:false
    };
    currentBattle.rewards={generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],finishingShinobi:null,mvp:null};
    currentBattle.contributions={};
    savePlayerData();saveTestState();
    return{occurrenceId,ryo:Number(playerData.ryo)||0};
  },{resolved,terminal,menmaWithdrawn,CONFIG,ENCOUNTER,OBJECTIVE,SCENE,HOSTILES,ALLIES,SOURCE_ID});
}
async function rewardState(page){
  return page.evaluate(({SOURCE_ID,OLD_SOURCE})=>{
    const rows=getActivityHistory();
    return{
      ryo:Number(playerData.ryo)||0,
      rewards:JSON.parse(JSON.stringify(currentBattle.rewards||{})),
      claimedAt:currentBattle.claimedAt||null,
      activeStory:getActiveStorySceneRuntime()?JSON.parse(JSON.stringify(getActiveStorySceneRuntime())):null,
      exactReceipts:rows.filter(r=>r&&r.type==="origin_battle_reward"&&r.rewardSourceId===SOURCE_ID).map(r=>JSON.parse(JSON.stringify(r))),
      oldReceipts:rows.filter(r=>r&&r.rewardSourceId===OLD_SOURCE).map(r=>JSON.parse(JSON.stringify(r))),
      diag:runAcademyMenmaThreeSubjectReward36200Diagnostics()
    };
  },{SOURCE_ID,OLD_SOURCE});
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await boot(page);
    const opening=await rewardState(page);
    assert(opening.diag.pass,JSON.stringify(opening.diag));
    const startingRyo=opening.ryo;

    // 1 hostile: zero payout and no generic fallback.
    await setupBattle(page,[HOSTILES[0]],{terminal:false});
    let projected=await page.evaluate(()=>ensureAcademyMenmaThreeSubjectRewardProjection36200());
    assert.strictEqual(projected.handled,true);
    assert.strictEqual(projected.ready,false);
    let state=await rewardState(page);
    assert.strictEqual(state.rewards.ryo,0,"one hostile withdrawal paid Ryō");
    assert.strictEqual(state.rewards.generated,false,"one hostile withdrawal exposed claim");
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),false);
    assert.strictEqual((await rewardState(page)).ryo,startingRyo);

    // 2 hostiles: still zero.
    await setupBattle(page,HOSTILES.slice(0,2),{terminal:false});
    projected=await page.evaluate(()=>ensureAcademyMenmaThreeSubjectRewardProjection36200());
    assert.strictEqual(projected.ready,false);
    state=await rewardState(page);
    assert.strictEqual(state.rewards.ryo,0,"two hostiles paid Ryō");
    assert.strictEqual(state.rewards.generated,false);
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),false);
    assert.strictEqual((await rewardState(page)).ryo,startingRyo);

    // Exact whole-encounter victory.
    const full=await setupBattle(page,HOSTILES,{terminal:true});
    const generated=await page.evaluate(()=>generateBattleRewards(currentBattle.enemy,getPlayerCharacter("academy_menma")));
    assert.strictEqual(generated.generated,true);
    assert.strictEqual(generated.ryo,100);
    assert.strictEqual(generated.exp,0);
    assert.deepStrictEqual(generated.items,[]);
    assert.deepStrictEqual(generated.rareDrops,[]);

    await page.evaluate(()=>openOverlay("victory"));
    await page.waitForSelector(".menma-three-subject-reward-36200",{state:"visible",timeout:8000});
    const disclosure=await page.locator(".menma-three-subject-reward-36200").textContent();
    assert(/\+100 RYŌ/.test(disclosure),"Victory did not disclose +100 Ryō");
    assert(/No generic Character EXP/.test(disclosure),"Victory did not separate generic EXP");
    await page.screenshot({path:path.join(OUT,"menma-three-subject-victory-before-claim.png"),fullPage:false,timeout:12000});

    const claim=page.getByRole("button",{name:"CLAIM",exact:true});
    await claim.waitFor({state:"visible",timeout:8000});
    await claim.click();
    await page.waitForFunction(start=>Number(playerData.ryo)===start+100,startingRyo,{timeout:8000});
    state=await rewardState(page);
    assert.strictEqual(state.ryo,startingRyo+100,"full victory did not pay exactly 100");
    assert.strictEqual(state.exactReceipts.length,1,"whole-encounter reward receipt cardinality");
    assert.strictEqual(state.oldReceipts.length,0,"retired Altered-only source fired");
    assert.strictEqual(state.rewards.claimed,true);

    // Reopen/reclaim cannot duplicate.
    await page.evaluate(()=>openOverlay("victory"));
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),false);
    assert.strictEqual((await rewardState(page)).ryo,startingRyo+100);

    // Real browser refresh: activityHistory receipt must survive the core loader.
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>typeof ensureAcademyMenmaThreeSubjectRewardProjection36200==="function"&&typeof getActiveStorySceneRuntime==="function",null,{timeout:30000});
    await releaseFrontDoor(page);
    state=await rewardState(page);
    assert.strictEqual(state.ryo,startingRyo+100,"refresh lost/duplicated Ryō");
    assert.strictEqual(state.exactReceipts.length,1,"refresh lost/duplicated exact reward receipt");
    assert.strictEqual(state.oldReceipts.length,0);

    // Session restore may already own currentBattle; rebuild only if the exact
    // successor Battle state was not restored. Durable reward receipt remains
    // authoritative either way.
    const restored=await page.evaluate(ENCOUNTER=>currentBattle&&currentBattle.encounterId===ENCOUNTER,ENCOUNTER);
    if(!restored){
      await page.evaluate(({ENCOUNTER,SCENE})=>{
        const rt=getActiveStorySceneRuntime();
        const enemy=enemyDatabase.test_subject_altered_shinobi;selectedEnemy=enemy;
        currentBattle.active=false;currentBattle.battleOver=true;currentBattle.battleId="battle_issue_362_"+rt.instanceId;
        currentBattle.encounterId=ENCOUNTER;currentBattle.characterId="academy_menma";currentBattle.enemy=enemy;currentBattle.encounterEnemy=enemy;
        currentBattle.outcome={type:"victory",committed:true,completedAt:Date.now(),finishingShinobiId:"academy_menma",menmaWithdrawn:false};
        currentBattle.returnContext={type:"story_scene",sceneId:SCENE,sceneInstanceId:rt.instanceId,sourceBeatId:"tutorial_battle",victoryBeatId:"post_battle_opening",defeatBeatId:"tutorial_not_completed",postBattleBeatId:null,exposeFinisher:false};
        currentBattle.rewards={generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[],finishingShinobi:null,mvp:null};
      },{ENCOUNTER,SCENE});
    }
    projected=await page.evaluate(()=>ensureAcademyMenmaThreeSubjectRewardProjection36200());
    assert.strictEqual(projected.ready,true,"refresh could not rehydrate reward entitlement");
    state=await rewardState(page);
    assert.strictEqual(state.rewards.claimed,true,"durable receipt did not repair claimed state");
    const beforeReclaim=state.ryo;
    assert.strictEqual(await page.evaluate(()=>claimCurrentBattleRewards()),false);
    assert.strictEqual((await rewardState(page)).ryo,beforeReclaim,"refresh/reclaim duplicated reward");

    // CLAIM is complete before Story return; CONTINUE resumes exact Menma Story.
    const returned=await page.evaluate(()=>continueAfterVictory());
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="post_battle_opening",SCENE,{timeout:10000});
    state=await rewardState(page);
    assert.strictEqual(state.activeStory.sceneId,SCENE);
    assert.strictEqual(state.activeStory.beatId,"post_battle_opening");
    assert.strictEqual(state.ryo,startingRyo+100,"Story return retriggered reward");
    assert.strictEqual(state.exactReceipts.length,1,"Story return duplicated reward receipt");
    await page.screenshot({path:path.join(OUT,"menma-story-return-after-reward.png"),fullPage:false,timeout:12000});

    const errors=await gate.assertClean("issue-362-menma-reward");
    const summary={
      pass:true,issue:362,kind:"installed_browser_menma_three_subject_reward",
      battleOccurrenceId:full.occurrenceId,rewardSourceId:SOURCE_ID,ryoGranted:100,
      checks:{oneHostileZero:true,twoHostilesZero:true,fullVictoryExact100:true,reopenNoDuplicate:true,refreshNoDuplicate:true,storyReturnExact:true,retired50SourceAbsent:true},
      runtimeErrors:errors,browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
