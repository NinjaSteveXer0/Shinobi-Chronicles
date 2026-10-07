#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_544_REAL_ACTION_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_544_REAL_ACTION_OUT||"artifacts/issue-544-real-action-callers";
fs.mkdirSync(OUT,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_e){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_e){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){const n=document.getElementById(id);if(n)n.remove();}
  });
}

async function boot(browser,label){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  const assetResponses=[];
  page.on("response",r=>{if(/\/UI\/(victory|setback)\.png(?:\?|$)/.test(r.url()))assetResponses.push({url:r.url(),status:r.status()});});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>
    typeof selectChronicleOrigin==="function"&&
    typeof attemptBattlePreparedSkill==="function"&&
    typeof setBattleRemainingPLRecord==="function"&&
    typeof getBattleRemainingPLRecord==="function"&&
    typeof globalThis.presentCommittedBattleTerminalResult54400==="function",
    null,{timeout:30000});
  await page.evaluate(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_e){}});
  await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof attemptBattlePreparedSkill==="function"&&typeof globalThis.presentCommittedBattleTerminalResult54400==="function",null,{timeout:30000});
  await releaseFrontDoor(page);
  await gate.reset();
  return{context,page,gate,assetResponses,label};
}

async function waitBattleStage(page){
  await page.waitForFunction(()=>currentBattle?.active===true&&!!document.querySelector(".alpha-code-battle-stage"),null,{timeout:15000});
}

async function waitPresentationIdle(page,timeout=20000){
  await page.waitForFunction(()=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    const busy=stage?.dataset?.presentationQueueBusy==="true";
    const pending=typeof pendingBattlePresentation33000==="function"?pendingBattlePresentation33000():false;
    return !busy&&!pending;
  },null,{timeout});
}

async function readySkillId(page){
  await waitPresentationIdle(page);
  const family=page.locator('button[data-formation-family="skills"]').first();
  if(await family.count()){
    await family.click();
    await sleep(80);
  }
  await page.waitForFunction(()=>{
    const cards=[...document.querySelectorAll(".battle-dev-skill-card")];
    return cards.some(card=>card.dataset.skillId&&!card.disabled&&!card.classList.contains("is-locked")&&!card.classList.contains("is-disabled"));
  },null,{timeout:10000});
  return page.evaluate(()=>{
    const cards=[...document.querySelectorAll(".battle-dev-skill-card")];
    const card=cards.find(card=>card.dataset.skillId&&!card.disabled&&!card.classList.contains("is-locked")&&!card.classList.contains("is-disabled"));
    return card?.dataset?.skillId||null;
  });
}

async function actionEvidenceSnapshot(page){
  return page.evaluate(()=>({
    battleId:currentBattle?.battleId||null,
    evidenceCount:Array.isArray(currentBattle?.runtime?.evidence)?currentBattle.runtime.evidence.length:0,
    outcome:currentBattle?.outcome?.type||null,
    battleOver:currentBattle?.battleOver===true,
    returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null
  }));
}

async function useRealPreparedSkill(page,label){
  const skillId=await readySkillId(page);
  assert(skillId,label+" no production prepared Skill available");
  const before=await actionEvidenceSnapshot(page);
  const result=await page.evaluate(id=>{
    const value=attemptBattlePreparedSkill(id);
    return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;
  },skillId);
  assert(result&&result.success===true,label+" production Skill action failed: "+skillId+" "+JSON.stringify(result));
  return{skillId,before,result};
}

async function waitTerminal(page,outcome,timeout=22000){
  await page.waitForFunction(expected=>currentBattle?.battleOver===true&&currentBattle?.outcome?.type===expected,outcome,{timeout});
  const selector=outcome==="victory"?".alpha-victory-code-screen,.victory-screen":".alpha331-setback";
  await page.waitForSelector(selector,{state:"visible",timeout});
  return page.evaluate(expected=>{
    const selector=expected==="victory"?".alpha-victory-code-screen,.victory-screen":".alpha331-setback";
    const node=document.querySelector(selector);
    const state=typeof getBattleTerminalResultPresentation54400==="function"?getBattleTerminalResultPresentation54400():null;
    const evidence=Array.isArray(currentBattle?.runtime?.evidence)?currentBattle.runtime.evidence:[];
    return{
      outcome:currentBattle?.outcome?.type||null,
      surface:node?expected:null,
      text:node?.textContent?.replace(/\s+/g," ").trim().slice(0,260)||"",
      terminal:state,
      evidenceCount:evidence.length,
      evidenceTail:evidence.slice(-12).map(row=>({
        eventType:row?.eventType||null,
        actionId:row?.actionId||null,
        skillId:row?.skillId||row?.data?.skillId||null,
        actor:row?.actorRef?.participantId||null,
        target:row?.targetRef?.participantId||null,
        committedOccurrence:row?.committedOccurrence!==false
      })),
      returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null,
      rewards:currentBattle?.rewards?JSON.parse(JSON.stringify(currentBattle.rewards)):null
    };
  },outcome);
}

async function driveToTerminalByRealAction(page,{outcome,label,playerIds,enemyIds}){
  assert(Array.isArray(playerIds)&&playerIds.length,label+" player ids missing");
  assert(Array.isArray(enemyIds)&&enemyIds.length,label+" enemy ids missing");
  const setup=await page.evaluate(({outcome,playerIds,enemyIds})=>{
    const snapshot=[];
    const set=(side,id,value)=>{
      const rec=getBattleRemainingPLRecord(side,id);
      if(!rec)return false;
      const max=Number(rec.maximum||rec.max||rec.maximumPL||rec.basePL||rec.remaining||1)||1;
      setBattleRemainingPLRecord(side,id,value,max);
      snapshot.push({side,id,value,max});
      return true;
    };
    if(outcome==="victory"){
      for(const id of enemyIds)set("enemy",id,1);
    }else{
      const active=currentBattle?.activePlayer?.id||playerIds[0];
      for(const id of playerIds)set("player",id,id===active?1:0);
    }
    return{snapshot,activePlayer:currentBattle?.activePlayer?.id||null,activeEnemy:currentBattle?.activeEnemy?.id||null};
  },{outcome,playerIds,enemyIds});
  assert(setup.snapshot.length,label+" terminal setup did not touch Battle PL records");

  const attempts=[];
  for(let i=0;i<5;i++){
    if(await page.evaluate(()=>currentBattle?.battleOver===true))break;
    const attempt=await useRealPreparedSkill(page,label+":attempt"+(i+1));
    attempts.push(attempt);
    try{
      await page.waitForFunction(expected=>currentBattle?.battleOver===true&&currentBattle?.outcome?.type===expected,outcome,{timeout:6000});
      break;
    }catch(_e){
      await waitPresentationIdle(page,20000);
    }
  }
  const terminal=await waitTerminal(page,outcome,22000);
  assert.strictEqual(terminal.outcome,outcome,label+" factual terminal outcome drift");
  assert.strictEqual(terminal.surface,outcome,label+" player-facing terminal surface missing");
  assert.strictEqual(terminal.terminal?.committedOutcome,outcome,label+" #544 presenter did not preserve committed outcome");
  assert.strictEqual(terminal.terminal?.status,"presented",label+" #544 presenter not presented");
  assert(attempts.length>=1,label+" no real Skill action executed");
  const used=new Set(attempts.map(a=>a.skillId));
  const actionEvidence=terminal.evidenceTail.some(row=>row&&row.committedOccurrence&&(
    used.has(row.skillId)||used.has(row.actionId)
  ));
  assert(actionEvidence,label+" terminal Battle lacks committed evidence from the production Skill action: "+JSON.stringify({used:[...used],tail:terminal.evidenceTail}));
  return{setup,attempts,terminal};
}

async function launchIwabee(page,label){
  const result=await page.evaluate(label=>{
    const selected=selectChronicleOrigin("academy_iwabee",label);
    const story=beginAlphaChronicleOriginPrologue();
    const set=setStorySceneBeat("iwa_confront_battle",{render:false});
    const battle=launchStorySceneBattle();
    return{selected,story,set,battle,sceneId:getActiveStorySceneRuntime()?.sceneId||null,returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null};
  },label);
  assert.strictEqual(result.selected?.success,true,label+" Origin select failed "+JSON.stringify(result));
  assert.strictEqual(result.story?.success,true,label+" Story launch failed "+JSON.stringify(result));
  assert.strictEqual(result.set?.success,true,label+" Battle beat unavailable "+JSON.stringify(result));
  assert.strictEqual(result.battle?.success,true,label+" Story Battle launch failed "+JSON.stringify(result));
  assert.strictEqual(result.returnContext?.type,"story_scene",label+" Story caller envelope missing");
  await waitBattleStage(page);
  return result;
}

async function continueIwabeeDefeat(page,sceneId){
  const before=await page.evaluate(()=>({wallet:Number(playerData.ryo)||0,returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null}));
  await page.locator(".alpha331-setback button").click();
  await page.waitForFunction(scene=>{
    const rt=getActiveStorySceneRuntime?.();
    return !!rt&&rt.sceneId===scene&&rt.beatId==="iwa_confront_loss_01";
  },sceneId,{timeout:20000});
  const after=await page.evaluate(()=>({
    wallet:Number(playerData.ryo)||0,
    sceneId:getActiveStorySceneRuntime()?.sceneId||null,
    beatId:getActiveStorySceneRuntime()?.beatId||null,
    returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null
  }));
  assert.strictEqual(after.wallet,before.wallet,"Iwabee Setback changed Ryō");
  assert.strictEqual(after.sceneId,sceneId,"Iwabee Setback returned to wrong Story scene");
  assert.strictEqual(after.beatId,"iwa_confront_loss_01","Iwabee Setback returned to wrong Story beat");
  return{before,after};
}

async function setupBanditWorld(page,label){
  return page.evaluate(label=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_kakashi",label);
    const completed=completeChronicleOriginPrologue("academy_kakashi",[label+":origin_complete"]);
    const desired=["academy_hinata","academy_menma"];
    const one=selectAcademyTeamFormationTeammate(1,desired[0]);
    const two=selectAcademyTeamFormationTeammate(2,desired[1]);
    const formed=confirmAcademyTeamFormation(label+"_team",desired);
    const continued=continueAcademyTeamFormationJourney();
    const opportunityId="alpha_bandit_hideout_battle",actionId="fight_bandit_hideout";
    try{registerAlphaBanditHideoutAuthoredOpportunity();}catch(_e){}
    const definition=typeof getOpportunityDefinitionIncludingLegacy==="function"?getOpportunityDefinitionIncludingLegacy(opportunityId):null;
    if(definition?.eventId&&typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(definition.eventId,{active:true,phase:"active"},{save:false});
    if(typeof setOpportunityDiscovery==="function")setOpportunityDiscovery(opportunityId,{level:"discovered",known:true},{save:false});
    if(typeof setOpportunityActionability==="function")setOpportunityActionability(opportunityId,{available:true},{save:false});
    selectedRegionKey="fire";
    selectedLocationNode=getWorldRegionLocation("fire","bandit_hideout");
    selectedHotspotId=definition?.hotspotId||"hotspot_fire_bandit_hideout";
    selectedOpportunityId=opportunityId;
    savePlayerData();
    return{selected,completed,one,two,formed,continued,opportunityId,actionId,definition,selectedRegionKey,selectedHotspotId,selectedOpportunityId};
  },label);
}

async function launchBanditWorld(page,label){
  const setup=await setupBanditWorld(page,label);
  assert.strictEqual(setup.selected?.success,true,label+" Kakashi select failed "+JSON.stringify(setup));
  assert.strictEqual(setup.completed?.success,true,label+" Kakashi completion fixture failed "+JSON.stringify(setup));
  assert.strictEqual(setup.formed?.success,true,label+" team formation failed "+JSON.stringify(setup));
  assert.strictEqual(setup.continued?.success,true,label+" team continuation failed "+JSON.stringify(setup));
  const launch=await page.evaluate(({opportunityId,actionId})=>{
    const result=routeWorldOpportunityInteraction(opportunityId,actionId);
    const players=[];for(let slot=1;slot<=6;slot++){const p=getBattleDeploymentParticipant("player",slot);if(p?.id)players.push(p.id);}
    const enemies=[];for(let slot=1;slot<=6;slot++){const p=getBattleDeploymentParticipant("enemy",slot);if(p?.id)enemies.push(p.id);}
    return{result,battleId:currentBattle?.battleId||null,returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null,players,enemies,activePlayer:currentBattle?.activePlayer?.id||null,activeEnemy:currentBattle?.activeEnemy?.id||null};
  },setup);
  assert.strictEqual(launch.result?.success,true,label+" Bandit interaction launch failed "+JSON.stringify(launch));
  assert.strictEqual(launch.returnContext?.type,"region_hotspot",label+" World caller envelope missing");
  assert.strictEqual(launch.returnContext?.locationId,"bandit_hideout",label+" wrong World location envelope");
  assert(launch.players.includes("academy_kakashi"),label+" Kakashi not deployed");
  assert(launch.enemies.length>=1,label+" Bandit opposition missing");
  await waitBattleStage(page);
  return{setup,launch};
}

async function continueWorld(page,outcome,label){
  const walletBefore=await page.evaluate(()=>Number(playerData.ryo)||0);
  if(outcome==="victory"){
    const button=page.locator(".alpha-victory-code-screen .victory-continue").first();
    await button.waitFor({state:"visible",timeout:10000});
    const action=await button.textContent();
    assert(/CLAIM/i.test(action||""),label+" Victory did not require reward claim first: "+action);
    await button.click();
    await page.waitForFunction(()=>{
      const b=document.querySelector(".alpha-victory-code-screen .victory-continue");
      return !!b&&b.textContent.trim()==="CONTINUE";
    },null,{timeout:5000});
    await button.click();
  }else{
    const button=page.locator(".alpha331-setback button").first();
    await button.waitFor({state:"visible",timeout:10000});
    await button.click();
  }
  await page.waitForFunction(()=>{
    const ctx=typeof currentOverlayType!=="undefined"?currentOverlayType:null;
    const rc=currentBattle?.returnContext||null;
    const loc=(typeof selectedLocationNode!=="undefined"&&selectedLocationNode?.id)||null;
    return (ctx==="world"||ctx==="region"||ctx==="location"||ctx==="village"||rc==null)&&loc==="bandit_hideout";
  },null,{timeout:20000});
  const after=await page.evaluate(()=>({
    wallet:Number(playerData.ryo)||0,
    overlay:typeof currentOverlayType!=="undefined"?currentOverlayType:null,
    region:typeof selectedRegionKey!=="undefined"?selectedRegionKey:null,
    location:(typeof selectedLocationNode!=="undefined"&&selectedLocationNode?.id)||null,
    hotspot:typeof selectedHotspotId!=="undefined"?selectedHotspotId:null,
    opportunity:typeof selectedOpportunityId!=="undefined"?selectedOpportunityId:null,
    returnContext:currentBattle?.returnContext?JSON.parse(JSON.stringify(currentBattle.returnContext)):null
  }));
  assert.strictEqual(after.region,"fire",label+" World resume lost Land of Fire");
  assert.strictEqual(after.location,"bandit_hideout",label+" World resume lost Bandit Hideout");
  if(outcome==="victory")assert(after.wallet>walletBefore,label+" Victory claim did not increase Ryō");
  else assert.strictEqual(after.wallet,walletBefore,label+" Setback changed Ryō");
  return{walletBefore,after};
}

async function runIwabeeDefeat(browser){
  const label="iwabee-origin-defeat-real-action";
  const {context,page,gate,assetResponses}=await boot(browser,label);
  try{
    const launch=await launchIwabee(page,label);
    const driven=await driveToTerminalByRealAction(page,{outcome:"defeat",label,playerIds:["academy_iwabee"],enemyIds:["iwabee_origin_rogue_genin_01"]});
    assert.strictEqual(driven.terminal.returnContext?.type,"story_scene",label+" caller envelope consumed before Setback Continue");
    await page.screenshot({path:path.join(OUT,"01-iwabee-real-action-setback.png"),fullPage:false});
    const continued=await continueIwabeeDefeat(page,launch.sceneId);
    assert(assetResponses.some(r=>r.url.includes("/UI/setback.png")&&r.status===200),label+" Setback asset not HTTP 200");
    const errors=await gate.assertClean(label);
    return{label,launch,driven,continued,assetResponses,errors};
  }finally{await context.close();}
}

async function runWorld(browser,outcome,index){
  const label=`world-bandit-${outcome}-real-action`;
  const {context,page,gate,assetResponses}=await boot(browser,label);
  try{
    const launched=await launchBanditWorld(page,label);
    const driven=await driveToTerminalByRealAction(page,{outcome,label,playerIds:launched.launch.players,enemyIds:launched.launch.enemies});
    assert.strictEqual(driven.terminal.returnContext?.type,"region_hotspot",label+" caller envelope consumed before result Continue");
    await page.screenshot({path:path.join(OUT,`${index}-${label}.png`),fullPage:false});
    const continued=await continueWorld(page,outcome,label);
    const asset=outcome==="victory"?"/UI/victory.png":"/UI/setback.png";
    assert(assetResponses.some(r=>r.url.includes(asset)&&r.status===200),label+" approved result asset not HTTP 200");
    const errors=await gate.assertClean(label);
    return{label,launched,driven,continued,assetResponses,errors};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const result={
      issue:544,
      lane:"F",
      kind:"owner_escalation_real_battle_actions",
      exactCandidate:process.env.ISSUE_544_EXACT_CANDIDATE_SHA||null,
      terminalHelpersCalledByHarness:false,
      routes:[]
    };
    result.routes.push(await runIwabeeDefeat(browser));
    result.routes.push(await runWorld(browser,"victory","02"));
    result.routes.push(await runWorld(browser,"defeat","03"));
    result.browserGoldenClaimed=false;
    fs.writeFileSync(path.join(OUT,"evidence.json"),JSON.stringify(result,null,2));
    console.log(JSON.stringify(result,null,2));
    console.log("PASS #544 owner-escalation real Battle-action routes; browserGoldenClaimed=false");
  }finally{await browser.close();}
})().catch(err=>{console.error(err&&err.stack||err);process.exit(1);});
