#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_544_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_544_BROWSER_OUT||"artifacts/issue-544-terminal-result-routing";
const CANDIDATE_PATH=process.env.ISSUE_544_CANDIDATE_MODULE||"";
const CANDIDATE=CANDIDATE_PATH&&fs.existsSync(CANDIDATE_PATH)?fs.readFileSync(CANDIDATE_PATH,"utf8"):"";
fs.mkdirSync(OUT,{recursive:true});

const clone=v=>JSON.parse(JSON.stringify(v));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const expectedSurface=outcome=>outcome==="defeat"?"setback":"victory";

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_e){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_e){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){const node=document.getElementById(id);if(node)node.remove();}
  });
}

async function boot(browser,label,{candidate=false}={}){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  const assetResponses=[];
  page.on("response",response=>{
    const url=response.url();
    if(/\/UI\/(victory|setback)\.png(?:\?|$)/.test(url))assetResponses.push({url,status:response.status()});
  });
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof selectChronicleOrigin==="function"&&typeof launchStorySceneBattle==="function"&&typeof routeWorldOpportunityInteraction==="function"&&typeof completeBattleVictoryFromDamage==="function"&&typeof completeBattleDefeat==="function"&&!!globalThis.SC_ACADEMY_IWABEE_ORIGIN_RUNTIME_399,null,{timeout:30000});
  await page.evaluate(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_e){}});
  await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof selectChronicleOrigin==="function"&&typeof launchStorySceneBattle==="function"&&typeof routeWorldOpportunityInteraction==="function"&&!!globalThis.SC_ACADEMY_IWABEE_ORIGIN_RUNTIME_399,null,{timeout:30000});
  await releaseFrontDoor(page);
  if(candidate){
    assert(CANDIDATE,"candidate source missing");
    await page.addScriptTag({content:CANDIDATE});
    await page.waitForFunction(()=>typeof globalThis.presentCommittedBattleTerminalResult54400==="function",null,{timeout:5000});
  }
  await installTrace(page,label);
  return{context,page,gate,assetResponses};
}

async function installTrace(page,label){
  await page.evaluate(label=>{
    const visible=node=>!!node&&node.getClientRects().length>0&&getComputedStyle(node).display!=="none"&&getComputedStyle(node).visibility!=="hidden"&&Number(getComputedStyle(node).opacity)!==0;
    const surface=()=>{
      const victory=[...document.querySelectorAll(".alpha-victory-code-screen,.victory-screen")].find(visible)||null;
      const setback=[...document.querySelectorAll(".alpha331-setback")].find(visible)||null;
      return{type:victory?"victory":setback?"setback":null,victory:!!victory,setback:!!setback,text:(victory||setback)?.textContent?.trim().slice(0,220)||""};
    };
    const trace=globalThis.__ISSUE_544_TRACE={label,events:[],surface,lastSurfaceType:null};
    const push=(kind,data={})=>trace.events.push({ordinal:trace.events.length+1,kind,at:Date.now(),surface:surface(),...(data||{})});
    const priorResume=globalThis.resumeBattleCallerAfterCompletion;
    if(typeof priorResume==="function"){
      const wrapped=function(outcome){
        push("caller_resume_attempt",{outcome,returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null});
        const result=priorResume.apply(this,arguments);
        push("caller_resume_return",{outcome,result:result&&typeof result==="object"?JSON.parse(JSON.stringify(result)):result});
        return result;
      };
      globalThis.resumeBattleCallerAfterCompletion=wrapped;
      try{resumeBattleCallerAfterCompletion=wrapped;}catch(_e){}
    }
    const priorClaim=globalThis.claimCurrentBattleRewards;
    if(typeof priorClaim==="function"){
      const wrapped=function(){
        push("reward_claim_attempt",{outcome:currentBattle?.outcome?.type||null});
        const result=priorClaim.apply(this,arguments);
        push("reward_claim_return",{result});
        return result;
      };
      globalThis.claimCurrentBattleRewards=wrapped;
      try{claimCurrentBattleRewards=wrapped;}catch(_e){}
    }
    const observer=new MutationObserver(()=>{
      const now=surface();
      if(now.type&&trace.lastSurfaceType!==now.type)push("terminal_surface_visible",{terminalType:now.type});
      trace.lastSurfaceType=now.type;
    });
    observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["style","class"]});
    trace.observer=observer;
    push("trace_installed");
  },label);
}

async function surface(page){return page.evaluate(()=>globalThis.__ISSUE_544_TRACE?.surface?.()||{type:null});}
async function waitSurface(page,outcome,timeout=3500){
  const expected=expectedSurface(outcome),end=Date.now()+timeout;
  while(Date.now()<end){const row=await surface(page);if(row.type===expected)return row;await sleep(40);}
  return surface(page);
}
async function trace(page){return page.evaluate(()=>JSON.parse(JSON.stringify(globalThis.__ISSUE_544_TRACE?.events||[])));}

async function assertCandidateTerminal(page,label,outcome,firstSurface){
  const wanted=expectedSurface(outcome);
  assert.strictEqual(firstSurface.type,wanted,label+" candidate terminal surface missing "+JSON.stringify(firstSurface));
  const duplicate=await page.evaluate(outcome=>({
    a:presentCommittedBattleTerminalResult(outcome,{source:"qa_duplicate_a"}),
    b:presentCommittedBattleTerminalResult(outcome,{source:"qa_duplicate_b"}),
    state:getBattleTerminalResultPresentation54400()
  }),outcome);
  await sleep(100);
  assert.strictEqual(duplicate.state.status,"presented",label+" terminal state not presented");
  assert.strictEqual(duplicate.state.outcome,outcome,label+" duplicate presenter changed semantic outcome");
  return duplicate;
}

function assertChronology(events,label,outcome,candidate,callerType){
  const wanted=expectedSurface(outcome);
  const resumeAttempt=events.find(event=>event.kind==="caller_resume_attempt");
  assert(resumeAttempt,label+" caller resume attempt was not observed");
  assert.strictEqual(resumeAttempt.returnContext?.type,callerType,label+" caller envelope mutated before resume");
  if(candidate){
    assert.strictEqual(resumeAttempt.surface?.type,wanted,label+" caller resume outran result presentation "+JSON.stringify(events));
    const firstVisible=events.find(event=>event.kind==="terminal_surface_visible"&&event.terminalType===wanted);
    assert(firstVisible,label+" expected result surface was never observed");
    assert(firstVisible.ordinal<resumeAttempt.ordinal,label+" result surface did not precede caller resume");
    const visibleCount=events.filter(event=>event.kind==="terminal_surface_visible"&&event.terminalType===wanted).length;
    assert.strictEqual(visibleCount,1,label+" result surface became newly visible more than once");
  }else if(outcome==="defeat"){
    assert.notStrictEqual(resumeAttempt.surface?.type,"setback",label+" baseline defeat no longer reproduces direct resume before Setback");
  }
}

async function assertAsset(page,assetResponses,label,outcome,candidate){
  await sleep(250);
  if(!candidate)return;
  const wanted=`/UI/${outcome==="defeat"?"setback":"victory"}.png`;
  assert(assetResponses.some(row=>row.url.includes(wanted)&&row.status===200),label+" approved lowercase result asset did not resolve HTTP 200 "+JSON.stringify(assetResponses));
}

async function launchIwabee(page,label){
  const launched=await page.evaluate(label=>{
    const selected=selectChronicleOrigin("academy_iwabee",label);
    const story=beginAlphaChronicleOriginPrologue();
    const set=setStorySceneBeat("iwa_confront_battle",{render:false});
    const battle=launchStorySceneBattle();
    return{
      selected,story,set,battle,battleId:currentBattle?.battleId||null,
      returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),
      sceneId:getActiveStorySceneRuntime()?.sceneId||null,
      beatId:getActiveStorySceneRuntime()?.beatId||null
    };
  },label);
  assert.strictEqual(launched.selected?.success,true,label+" origin select failed "+JSON.stringify(launched));
  assert.strictEqual(launched.story?.success,true,label+" origin launch failed "+JSON.stringify(launched));
  assert.strictEqual(launched.set?.success,true,label+" Battle beat set failed "+JSON.stringify(launched));
  assert.strictEqual(launched.battle?.success,true,label+" Battle launch failed "+JSON.stringify(launched));
  assert.strictEqual(launched.returnContext?.type,"story_scene",label+" not a real Story caller envelope");
  return launched;
}

async function commitIwabee(page,outcome){
  return page.evaluate(outcome=>{
    const IWABEE="academy_iwabee",ROGUE="iwabee_origin_rogue_genin_01";
    const walletBefore=Math.max(0,Number(playerData.ryo)||0);
    if(outcome==="victory"){
      const rec=getBattleRemainingPLRecord("enemy",ROGUE);
      setBattleRemainingPLRecord("enemy",ROGUE,0,rec?.maximum||rec?.max||23);
      const actor=getBattleParticipantByIdentity("player",IWABEE)||currentBattle.activePlayer||getPlayerCharacter(IWABEE);
      completeBattleVictoryFromDamage(actor,null,ROGUE);
    }else{
      const rec=getBattleRemainingPLRecord("player",IWABEE);
      setBattleRemainingPLRecord("player",IWABEE,0,rec?.maximum||rec?.max||13);
      completeBattleDefeat(IWABEE,null,"issue_544_origin_adversarial_qa");
    }
    return{
      walletBefore,battleId:currentBattle?.battleId||null,
      outcome:JSON.parse(JSON.stringify(currentBattle?.outcome||null)),
      returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),
      rewards:JSON.parse(JSON.stringify(currentBattle?.rewards||null)),
      terminal:typeof getBattleTerminalResultPresentation54400==="function"?getBattleTerminalResultPresentation54400():null
    };
  },outcome);
}

async function continueIwabee(page,outcome,baselineFailure=false){
  return page.evaluate(({outcome,baselineFailure})=>{
    const wallet0=Math.max(0,Number(playerData.ryo)||0);
    let claim1=null,claim2=null,resume=null;
    if(outcome==="victory"){
      claim1=claimCurrentBattleRewards();
      claim2=claimCurrentBattleRewards();
      resume=resumeBattleCallerAfterCompletion("victory");
    }else if(baselineFailure){
      resume=resumeBattleCallerAfterCompletion("defeat");
    }else{
      resume=typeof continueAfterSetback33100==="function"?continueAfterSetback33100():resumeBattleCallerAfterCompletion("defeat");
    }
    const runtime=getActiveStorySceneRuntime();
    return{
      claim1,claim2,resume,
      walletAfter:Math.max(0,Number(playerData.ryo)||0),
      walletDeltaFromContinue:Math.max(0,Number(playerData.ryo)||0)-wallet0,
      sceneId:runtime?.sceneId||null,beatId:runtime?.beatId||null,
      localContext:JSON.parse(JSON.stringify(runtime?.localContext||{})),
      rewardReceipts:(playerData.activityHistory||[]).filter(row=>row&&row.rewardSourceId==="iwabee_origin_rogue_genin_battle_victory_ryo_01").map(row=>JSON.parse(JSON.stringify(row))),
      sourceOccurrenceCount:(playerData.activityHistory||[]).filter(row=>row&&row.occurrenceId==="occ_origin_iwabee_rogue_genin_response_resolution").length,
      terminal:typeof getBattleTerminalResultPresentation54400==="function"?getBattleTerminalResultPresentation54400():null
    };
  },{outcome,baselineFailure});
}

async function runIwabeeRoute(browser,outcome,candidate){
  const label=`iwabee-${outcome}-${candidate?"candidate":"baseline"}`;
  const {context,page,gate,assetResponses}=await boot(browser,label,{candidate});
  try{
    const launch=await launchIwabee(page,label);
    const committed=await commitIwabee(page,outcome);
    assert.strictEqual(committed.outcome?.type,outcome,label+" semantic outcome drift");
    assert.strictEqual(committed.returnContext?.type,"story_scene",label+" Story caller envelope changed at outcome commit");
    const firstSurface=await waitSurface(page,outcome);
    let duplicate=null;
    if(candidate)duplicate=await assertCandidateTerminal(page,label,outcome,firstSurface);
    else if(outcome==="victory")assert.strictEqual(firstSurface.type,"victory",label+" baseline Victory surface missing");
    else assert.notStrictEqual(firstSurface.type,"setback",label+" baseline unexpectedly already has Setback; baseline expectation must be refreshed");

    const continued=await continueIwabee(page,outcome,!candidate&&outcome==="defeat");
    assert.strictEqual(continued.resume?.success,true,label+" exact caller resume failed "+JSON.stringify(continued.resume));
    assert.strictEqual(continued.sceneId,launch.sceneId,label+" caller returned to wrong Story scene");
    assert.notStrictEqual(continued.beatId,"iwa_confront_battle",label+" caller did not leave Battle beat");
    assert(continued.sourceOccurrenceCount<=1,label+" duplicate Story occurrence commit");
    if(outcome==="victory"){
      assert.strictEqual(continued.walletDeltaFromContinue,50,label+" Victory did not grant exactly +50 Ryō once");
      assert.strictEqual(continued.rewardReceipts.length,1,label+" Victory reward receipt missing/duplicated");
    }else{
      assert.strictEqual(continued.walletDeltaFromContinue,0,label+" Setback/defeat claimed a reward");
      assert.strictEqual(continued.rewardReceipts.length,0,label+" defeat wrote Victory reward receipt");
    }
    const events=await trace(page);
    assertChronology(events,label,outcome,candidate,"story_scene");
    await assertAsset(page,assetResponses,label,outcome,candidate);
    const errors=await gate.assertClean(label);
    return{kind:"origin_story",label,candidate,launch,committed,firstSurface,duplicate,continued,events,assetResponses:clone(assetResponses),errors,browserGoldenClaimed:false};
  }finally{await context.close();}
}

async function setupBanditWorld(page,label){
  return page.evaluate(label=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();

    const selected=selectChronicleOrigin("academy_kakashi",label+"_origin");
    const completed=completeChronicleOriginPrologue("academy_kakashi",[label+":origin_complete"]);
    const snapshot=getAcademyTeamFormationSnapshot();
    const desired=["academy_hinata","academy_menma"];
    const one=selectAcademyTeamFormationTeammate(1,desired[0]);
    const two=selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation(label+"_team",desired);
    const continued=continueAcademyTeamFormationJourney();

    const opportunityId="alpha_bandit_hideout_battle";
    const actionId="fight_bandit_hideout";
    try{registerAlphaBanditHideoutAuthoredOpportunity();}catch(_e){}
    const definition=typeof getOpportunityDefinitionIncludingLegacy==="function"?getOpportunityDefinitionIncludingLegacy(opportunityId):null;
    if(definition?.eventId&&typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(definition.eventId,{active:true,phase:"active"},{save:false});
    if(typeof setOpportunityDiscovery==="function")setOpportunityDiscovery(opportunityId,{level:"discovered",known:true},{save:false});
    if(typeof setOpportunityActionability==="function")setOpportunityActionability(opportunityId,{available:true},{save:false});

    const world=ensureWorldState(playerData);
    world.currentRegionKey="fire";
    world.currentLocationId="bandit_hideout";
    if(!world.currentLocationByRegion||typeof world.currentLocationByRegion!=="object")world.currentLocationByRegion={};
    world.currentLocationByRegion.fire="bandit_hideout";
    world.traveling=null;
    world.opportunityPresentation=null;
    globalThis.currentWorldHotspotInteraction=null;
    savePlayerData();

    return{
      selected,completed,snapshot,one,two,formed,continued,
      blocked:isAcademyTeamFormationJourneyBlockingFreePlay(),
      freePlay:typeof isAcademyFreePlayAvailable==="function"?isAcademyFreePlayAvailable():null,
      opportunityId,actionId,
      definition:definition?JSON.parse(JSON.stringify(definition)):null,
      encounter:JSON.parse(JSON.stringify(getEncounterData("bandit_leader")||null)),
      world:{regionKey:world.currentRegionKey,locationId:world.currentLocationId}
    };
  },label);
}

async function launchBanditWorld(page,label){
  const setup=await setupBanditWorld(page,label);
  assert.strictEqual(setup.selected?.success,true,label+" Kakashi Origin selection failed "+JSON.stringify(setup));
  assert.strictEqual(setup.completed?.success,true,label+" Kakashi Origin completion fixture failed "+JSON.stringify(setup));
  assert.strictEqual(setup.one?.success,true,label+" team slot 1 failed "+JSON.stringify(setup));
  assert.strictEqual(setup.two?.success,true,label+" team slot 2 failed "+JSON.stringify(setup));
  assert.strictEqual(setup.formed?.success,true,label+" Academy team formation failed "+JSON.stringify(setup));
  assert.strictEqual(setup.continued?.success,true,label+" Academy team continuation failed "+JSON.stringify(setup));
  assert.strictEqual(setup.blocked,false,label+" free-play route still blocked "+JSON.stringify(setup));
  assert.strictEqual(setup.encounter?.enemyId,"banditLeader",label+" authored Bandit encounter drifted "+JSON.stringify(setup.encounter));

  const launched=await page.evaluate(({opportunityId,actionId})=>{
    const result=routeWorldOpportunityInteraction(opportunityId,actionId);
    const player=currentBattle?.activePlayer||null;
    const enemy=currentBattle?.activeEnemy||null;
    const world=ensureWorldState(playerData);
    return{
      result,battleId:currentBattle?.battleId||null,
      returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),
      playerId:player?.id||currentBattle?.activePlayerId||playerData.currentCharacter||null,
      enemyId:enemy?.id||currentBattle?.activeEnemyId||null,
      world:{regionKey:world.currentRegionKey,locationId:world.currentLocationId}
    };
  },{opportunityId:setup.opportunityId,actionId:setup.actionId});
  assert.strictEqual(launched.result?.success,true,label+" authored World Bandit route did not launch "+JSON.stringify({setup,launched}));
  assert.strictEqual(launched.returnContext?.type,"region_hotspot",label+" World Battle did not capture region_hotspot caller envelope "+JSON.stringify(launched));
  assert.strictEqual(launched.enemyId,"banditLeader",label+" World route launched wrong enemy "+JSON.stringify(launched));
  assert(launched.battleId,label+" World route did not create a Battle id");
  return{setup,launched};
}

async function commitBanditWorld(page,outcome,launch){
  return page.evaluate(({outcome,playerId,enemyId})=>{
    const walletBefore=Math.max(0,Number(playerData.ryo)||0);
    const historyBefore=(playerData.activityHistory||[]).length;
    if(outcome==="victory"){
      const rec=getBattleRemainingPLRecord("enemy",enemyId);
      setBattleRemainingPLRecord("enemy",enemyId,0,rec?.maximum||rec?.max||100);
      const actor=getBattleParticipantByIdentity("player",playerId)||currentBattle.activePlayer||getPlayerCharacter(playerId);
      completeBattleVictoryFromDamage(actor,null,enemyId);
    }else{
      const rec=getBattleRemainingPLRecord("player",playerId);
      setBattleRemainingPLRecord("player",playerId,0,rec?.maximum||rec?.max||100);
      completeBattleDefeat(playerId,null,"issue_544_world_adversarial_qa");
    }
    return{
      walletBefore,historyBefore,battleId:currentBattle?.battleId||null,
      outcome:JSON.parse(JSON.stringify(currentBattle?.outcome||null)),
      returnContext:JSON.parse(JSON.stringify(currentBattle?.returnContext||null)),
      rewards:JSON.parse(JSON.stringify(currentBattle?.rewards||null)),
      terminal:typeof getBattleTerminalResultPresentation54400==="function"?getBattleTerminalResultPresentation54400():null
    };
  },{outcome,playerId:launch.playerId,enemyId:launch.enemyId});
}

async function continueBanditWorld(page,outcome,baselineFailure=false,committed=null){
  return page.evaluate(({outcome,baselineFailure,rewardSourceId})=>{
    const wallet0=Math.max(0,Number(playerData.ryo)||0);
    let claim1=null,claim2=null,resume=null,wallet1=wallet0,wallet2=wallet0;
    if(outcome==="victory"){
      claim1=claimCurrentBattleRewards();wallet1=Math.max(0,Number(playerData.ryo)||0);
      claim2=claimCurrentBattleRewards();wallet2=Math.max(0,Number(playerData.ryo)||0);
      resume=resumeBattleCallerAfterCompletion("victory");
    }else if(baselineFailure){
      resume=resumeBattleCallerAfterCompletion("defeat");
    }else{
      resume=typeof continueAfterSetback33100==="function"?continueAfterSetback33100():resumeBattleCallerAfterCompletion("defeat");
    }
    const world=ensureWorldState(playerData);
    const receipts=rewardSourceId?(playerData.activityHistory||[]).filter(row=>row&&row.rewardSourceId===rewardSourceId).map(row=>JSON.parse(JSON.stringify(row))):[];
    return{
      claim1,claim2,resume,wallet0,wallet1,wallet2,
      walletAfter:Math.max(0,Number(playerData.ryo)||0),
      historyAfter:(playerData.activityHistory||[]).length,
      rewardReceipts:receipts,
      world:{regionKey:world.currentRegionKey,locationId:world.currentLocationId,opportunityPresentation:JSON.parse(JSON.stringify(world.opportunityPresentation||null))},
      selectedOpportunityId:typeof selectedOpportunityId!=="undefined"?selectedOpportunityId:null,
      selectedHotspotId:typeof selectedHotspotId!=="undefined"?selectedHotspotId:null,
      terminal:typeof getBattleTerminalResultPresentation54400==="function"?getBattleTerminalResultPresentation54400():null
    };
  },{outcome,baselineFailure,rewardSourceId:committed?.rewards?.rewardSourceId||null});
}

async function runBanditWorldRoute(browser,outcome,candidate){
  const label=`world-bandit-${outcome}-${candidate?"candidate":"baseline"}`;
  const {context,page,gate,assetResponses}=await boot(browser,label,{candidate});
  try{
    const {setup,launched}=await launchBanditWorld(page,label);
    const committed=await commitBanditWorld(page,outcome,launched);
    assert.strictEqual(committed.battleId,launched.battleId,label+" Battle instance rerolled/replaced during outcome commit");
    assert.strictEqual(committed.outcome?.type,outcome,label+" semantic outcome drift");
    assert.strictEqual(committed.returnContext?.type,"region_hotspot",label+" World caller envelope changed at outcome commit");
    const firstSurface=await waitSurface(page,outcome);
    let duplicate=null;
    if(candidate)duplicate=await assertCandidateTerminal(page,label,outcome,firstSurface);
    else if(outcome==="victory")assert.strictEqual(firstSurface.type,"victory",label+" baseline Victory surface missing");
    else assert.notStrictEqual(firstSurface.type,"setback",label+" baseline unexpectedly already has Setback; baseline expectation must be refreshed");

    const continued=await continueBanditWorld(page,outcome,!candidate&&outcome==="defeat",committed);
    assert.strictEqual(continued.resume?.success,true,label+" exact region_hotspot caller resume failed "+JSON.stringify(continued.resume));
    assert.strictEqual(continued.world.regionKey,launched.world.regionKey,label+" caller returned to wrong World region");
    assert.strictEqual(continued.world.locationId,launched.world.locationId,label+" caller returned to wrong World location");
    if(outcome==="victory"){
      assert.strictEqual(continued.wallet2,continued.wallet1,label+" repeat Victory reward claim changed Ryō");
      if(committed.rewards?.rewardSourceId)assert(continued.rewardReceipts.length<=1,label+" duplicate World Victory reward receipt");
    }else{
      assert.strictEqual(continued.walletAfter,continued.wallet0,label+" World Setback/defeat changed Ryō");
      assert.strictEqual(continued.rewardReceipts.length,0,label+" World defeat wrote a Victory reward receipt");
    }
    const events=await trace(page);
    assertChronology(events,label,outcome,candidate,"region_hotspot");
    await assertAsset(page,assetResponses,label,outcome,candidate);
    const errors=await gate.assertClean(label);
    return{kind:"world_region_hotspot",label,candidate,setup,launch:launched,committed,firstSurface,duplicate,continued,events,assetResponses:clone(assetResponses),errors,browserGoldenClaimed:false};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const results={
    issue:544,lane:"F",
    candidateHead:"803bfb270a2f43c16243da522ae534b0e67954a7",
    browserGoldenClaimed:false,
    routes:[]
  };
  try{
    results.routes.push(await runIwabeeRoute(browser,"victory",false));
    results.routes.push(await runIwabeeRoute(browser,"defeat",false));
    results.routes.push(await runBanditWorldRoute(browser,"victory",false));
    results.routes.push(await runBanditWorldRoute(browser,"defeat",false));
    if(CANDIDATE){
      results.routes.push(await runIwabeeRoute(browser,"victory",true));
      results.routes.push(await runIwabeeRoute(browser,"defeat",true));
      results.routes.push(await runBanditWorldRoute(browser,"victory",true));
      results.routes.push(await runBanditWorldRoute(browser,"defeat",true));
    }
    fs.writeFileSync(path.join(OUT,"browser-evidence.json"),JSON.stringify(results,null,2));
    console.log(JSON.stringify(results,null,2));
    console.log("PASS #544 real-route Origin + World/PL baseline/candidate chronology; browserGoldenClaimed=false");
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
