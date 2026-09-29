#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_425_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_425_BROWSER_OUT||"artifacts/issue-425-shared-battle-system";
fs.mkdirSync(OUT,{recursive:true});

async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}

async function launchMiraiShortcutBattle(page){
  await page.evaluate(()=>{globalThis.SC_DISABLE_FIRST_PL_BATTLE_TUTORIAL_QA=true;});
  const setup=await page.evaluate(()=>{
    const select=selectChronicleOrigin("academy_mirai","issue_425_shared_battle_duel");
    const origin=beginAlphaChronicleOriginPrologue();
    const rt=getActiveStorySceneRuntime?.();
    if(rt){
      rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
      rt.localContext.mirTalked=true;
      rt.localContext.mirShortcut="follow";
    }
    const jump=globalThis.setStorySceneBeat?.("mir_shortcut_battle");
    return{select,origin,jump,sceneId:getActiveStorySceneRuntime?.()?.sceneId||null};
  });
  assert.strictEqual(setup.select?.success,true,"Mirai Origin selection failed "+JSON.stringify(setup));
  assert.strictEqual(setup.origin?.success,true,"Mirai Origin launch failed "+JSON.stringify(setup));
  assert.strictEqual(setup.jump?.success,true,"Mirai Battle beat unavailable "+JSON.stringify(setup));
  await releaseFrontDoor(page);
  const launched=await page.evaluate(()=>globalThis.launchStorySceneBattle?.());
  assert.strictEqual(launched?.success,true,"Mirai Story Battle launch failed "+JSON.stringify(launched));
  await page.waitForFunction(()=>
    currentBattle?.active===true&&
    currentBattle?.battleConfigId==="academy_mirai_origin_disguised_instructor_battle"&&
    !!document.querySelector(".alpha-code-battle-stage.battle2-modern[data-formation-stage='true']"),
    null,{timeout:15000});
}

async function snapshot(page){
  return page.evaluate(()=>{
    const stage=document.querySelector(".alpha-code-battle-stage.battle2-modern");
    const playerCard=stage?.querySelector(".battle-live-active-card-player");
    const enemyCard=stage?.querySelector(".battle-live-active-card-enemy");
    const families=[...(stage?.querySelectorAll("button[data-formation-family]")||[])].map(b=>b.textContent.trim());
    const playerRing=stage?.querySelector(".battle-live-power-player .alpha-battle-pl-ring");
    const enemyRing=stage?.querySelector(".battle-live-power-enemy .alpha-battle-pl-ring");
    const inspector=stage?.querySelector(".battle-live-skill-details");
    return{
      battleSystem:stage?.dataset.battleSystem||null,
      formationStage:stage?.dataset.formationStage||null,
      formationMode:stage?.dataset.formationMode||null,
      menmaProof:stage?.dataset.evolvedPlProof||null,
      environment:stage?.dataset.battleEnvironment||null,
      environmentPath:stage?.dataset.battleEnvironmentPath||null,
      background:stage?getComputedStyle(stage).backgroundImage:"",
      playerCount:Number(stage?.dataset.playerFormationCount||0),
      enemyCount:Number(stage?.dataset.enemyFormationCount||0),
      playerId:getBattleDeploymentParticipant("player",1)?.id||null,
      enemyId:getBattleDeploymentParticipant("enemy",1)?.id||null,
      playerFrameless:playerCard?.dataset.framelessBattlePortrait||null,
      enemyFrameless:enemyCard?.dataset.framelessBattlePortrait||null,
      playerPortrait:playerCard?.querySelector("img")?.getAttribute("src")||"",
      enemyPortrait:enemyCard?.querySelector("img")?.getAttribute("src")||"",
      families,
      playerRing:!!playerRing,
      enemyRing:!!enemyRing,
      playerPL:Number(stage?.querySelector(".battle-live-power-player strong")?.textContent||NaN),
      enemyPL:Number(stage?.querySelector(".battle-live-power-enemy strong")?.textContent||NaN),
      inspectorPresent:!!inspector,
      performanceHostPresent:!!stage?.querySelector(".battle2-performance-host"),
      performanceCenterPresent:!!stage?.querySelector(".battle2-performance-center"),
      supportCount:stage?.querySelectorAll(".battle-live-roster-slot.battle2-formation-support").length||0
    };
  });
}

async function proveVisibleActionPresentation(page){
  const stage=page.locator(".alpha-code-battle-stage.battle2-modern");
  const skills=stage.locator('button[data-formation-family="skills"]').first();
  await skills.waitFor({state:"visible",timeout:10000});
  await skills.click();
  const deck=stage.locator(".battle-live-skill-deck");
  await deck.waitFor({state:"visible",timeout:10000});
  const inspector=stage.locator(".battle-live-skill-details");
  await inspector.waitFor({state:"visible",timeout:10000});

  let card=deck.locator(".battle-dev-skill-card.is-ready").first();
  if(await card.count()===0)card=deck.locator(".battle-dev-skill-card").first();
  await card.waitFor({state:"visible",timeout:10000});
  const onclick=await card.getAttribute("onclick");
  assert(onclick&&onclick.includes("activateBattlePreparedSkillCard"),"shared Skill card does not use canonical commit path");

  const skillId=await card.getAttribute("data-skill-id");
  const before=await page.evaluate(()=>Number(document.querySelector(".alpha-code-battle-stage")?.dataset.presentationSequenceOrdinal||0));
  await card.click();

  try{
    await page.waitForFunction(before=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return !!stage&&stage.dataset.presentationQueueBusy==="true"&&Number(stage.dataset.presentationSequenceOrdinal||0)>before;
    },before,{timeout:12000});
  }catch(_error){
    // Some Skills enter exact-target selection before commit. Use the visible
    // active opposition as the player-facing target rather than bypassing UI.
    const target=stage.locator(".battle-live-active-card-enemy").first();
    if(await target.count()&&await target.isVisible())await target.click();
    await page.waitForFunction(before=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return !!stage&&stage.dataset.presentationQueueBusy==="true"&&Number(stage.dataset.presentationSequenceOrdinal||0)>before;
    },before,{timeout:12000});
  }

  const p=await page.evaluate(()=> {
    const stage=document.querySelector(".alpha-code-battle-stage");
    return{
      ordinal:Number(stage?.dataset.presentationSequenceOrdinal||0),
      actor:stage?.dataset.presentationActorId||null,
      target:stage?.dataset.presentationTargetId||null,
      actionText:stage?.querySelector(".battle2-performance-center strong")?.textContent?.trim()||"",
      actorNodes:stage?.querySelectorAll(".battle2-performance-role-actor").length||0,
      targetNodes:stage?.querySelectorAll(".battle2-performance-role-target").length||0,
      resultText:stage?.querySelector(".battle2-performance-result-chip")?.innerText?.replace(/\s+/g," ").trim()||""
    };
  });
  assert(p.ordinal>before,"shared ordered action presentation did not advance");
  assert.strictEqual(p.actor,"academy_mirai","shared action presentation actor drift");
  assert.strictEqual(p.target,"academy_mirai_origin_instructor","shared action presentation target drift");
  assert(p.actionText.length>0,"shared action presentation technique label missing");
  assert.strictEqual(p.actorNodes,1,"shared action presentation did not identify one actor");
  assert.strictEqual(p.targetNodes,1,"shared action presentation did not identify one target");
  return{skillId,...p};
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>
      !!globalThis.SC_ACADEMY_MIRAI_DISGUISED_INSTRUCTOR_BATTLE_338&&
      typeof globalThis.runAlphaBattleModern33000Diagnostics==="function"&&
      !!globalThis.SC_STORY_SCENE_BOARD_33900,
      null,{timeout:30000});

    const diagnostic=await page.evaluate(()=>runAlphaBattleModern33000Diagnostics());
    assert.strictEqual(diagnostic.pass,true,"shared Battle diagnostics RED "+JSON.stringify(diagnostic));

    await launchMiraiShortcutBattle(page);
    const opening=await snapshot(page);

    assert.strictEqual(opening.battleSystem,"shinobi_chronicles_shared","ordinary duel did not consume canonical shared Battle System");
    assert.strictEqual(opening.formationStage,"true","ordinary duel did not use Formation Stage");
    assert.strictEqual(opening.formationMode,"duel","1v1 Mirai Battle did not use adaptive DUEL composition");
    assert.strictEqual(opening.menmaProof,null,"ordinary duel still requires Menma proof marker");
    assert.strictEqual(opening.environment,"authored","ordinary duel did not project authored encounter environment");
    assert.strictEqual(opening.environmentPath,"Mirai Origin Backdrop/konoha_storehouse_side_lane.png","Mirai shortcut Battle environment drift");
    assert(opening.background.includes("konoha_storehouse_side_lane.png"),"authored Mirai Battle backdrop is not visibly projected");
    assert.strictEqual(opening.playerCount,1);
    assert.strictEqual(opening.enemyCount,1);
    assert.strictEqual(opening.playerId,"academy_mirai");
    assert.strictEqual(opening.enemyId,"academy_mirai_origin_instructor");
    assert.strictEqual(opening.playerFrameless,"true","Mirai active portrait is not frameless");
    assert.strictEqual(opening.enemyFrameless,"true","Mirai opponent portrait is not frameless");
    assert(opening.playerPortrait.length>0&&opening.enemyPortrait.includes("mirai_instructor_disguised.png"),"ordinary duel Battle portraits missing/wrong");
    assert.deepStrictEqual(opening.families,["SKILLS","ITEMS","SUMMONS"],"shared action dock drift");
    assert.strictEqual(opening.playerRing,true,"player radial Battle PL missing");
    assert.strictEqual(opening.enemyRing,true,"enemy radial Battle PL missing");
    assert(Number.isFinite(opening.playerPL)&&Number.isFinite(opening.enemyPL),"Battle PL readout missing");
    assert.strictEqual(opening.performanceHostPresent,true,"shared performance host missing");

    await page.screenshot({path:path.join(OUT,"01-mirai-shared-duel-opening.png"),fullPage:false,timeout:12000});
    const action=await proveVisibleActionPresentation(page);
    await page.screenshot({path:path.join(OUT,"02-mirai-shared-action-presentation.png"),fullPage:false,timeout:12000});

    await gate.assertClean("issue-425-shared-battle-mirai-duel");
    const summary={
      pass:true,
      issue:425,
      kind:"installed_browser_shared_battle_system_duel",
      checks:{
        canonicalSharedBattleMarker:true,
        noMenmaProofPrerequisite:true,
        authoredEnvironment:true,
        duelFormation:true,
        framelessBattlePortraits:true,
        radialBattlePL:true,
        exactSkillsItemsSummonsDock:true,
        skillInspector:true,
        orderedActionPresentation:true,
        hiddenIdentityPreserved:true,
        browserErrorGateClean:true
      },
      opening,
      action,
      stephenVisualAcceptance:"PENDING",
      globalBattleSystemGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
