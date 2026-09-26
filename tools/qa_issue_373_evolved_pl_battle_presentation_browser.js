#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_373_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_373_BROWSER_OUT||"artifacts/issue-373-evolved-pl-battle-presentation";
const BUILD_MANIFEST=JSON.parse(fs.readFileSync(path.resolve(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
const SCENE="origin_academy_menma_prologue";
const ENCOUNTER="origin_academy_menma_prologue:three_test_subjects";
const MENMA="academy_menma";
const ANKO="sj_anko";
const ALTERED="test_subject_altered_shinobi";
const BRUTE="test_subject_brute";
const UNSTABLE="test_subject_unstable";

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

async function stageSnapshot(page){
  return page.evaluate(()=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    const img=(selector)=>stage?.querySelector(selector)?.getAttribute("src")||"";
    const supports=(side)=>[...(stage?.querySelectorAll(".battle-live-roster-"+side+" [data-participant-id]")||[])].map(node=>({
      id:node.dataset.participantId||null,
      slot:Number(node.dataset.formationSlot||node.dataset.slot)||null,
      role:node.dataset.formationRole||null,
      frameless:node.dataset.framelessBattlePortrait||null,
      src:node.querySelector("img")?.getAttribute("src")||""
    }));
    return{
      environment:stage?.dataset.battleEnvironment||null,
      proof:stage?.dataset.evolvedPlProof||null,
      background:stage?getComputedStyle(stage).backgroundImage:"",
      playerCount:Number(stage?.dataset.playerFormationCount||0),
      enemyCount:Number(stage?.dataset.enemyFormationCount||0),
      activePlayerId:currentBattle&&getBattleDeploymentParticipant("player",1)?.id||null,
      activeEnemyId:currentBattle&&getBattleDeploymentParticipant("enemy",1)?.id||null,
      activePlayerSrc:img(".battle-live-active-card-player .battle-live-active-card-image"),
      activeEnemySrc:img(".battle-live-active-card-enemy .battle-live-active-card-image"),
      activePlayerFrameless:stage?.querySelector(".battle-live-active-card-player")?.dataset.framelessBattlePortrait||null,
      activeEnemyFrameless:stage?.querySelector(".battle-live-active-card-enemy")?.dataset.framelessBattlePortrait||null,
      playerSupports:supports("player"),
      enemySupports:supports("enemy"),
      presentation:{
        busy:stage?.dataset.presentationQueueBusy||null,
        ordinal:Number(stage?.dataset.presentationSequenceOrdinal||0),
        actor:stage?.dataset.presentationActorId||null,
        target:stage?.dataset.presentationTargetId||null,
        role:stage?.dataset.presentationActionRole||null,
        actorNodes:stage?.querySelectorAll(".battle2-performance-role-actor").length||0,
        targetNodes:stage?.querySelectorAll(".battle2-performance-role-target").length||0,
        actionText:stage?.querySelector(".battle2-performance-center strong")?.textContent?.trim()||""
      },
      transition:currentBattle?.deployment?.lastTransition?JSON.parse(JSON.stringify(currentBattle.deployment.lastTransition)):null,
      lastFormationTransitionId:stage?.dataset.lastFormationTransitionId||null
    };
  });
}

async function boot(page){
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof getRuntimeBuildFingerprint==="function"&&typeof runIssue369MenmaEvolvedPLBattleDiagnostics==="function"&&typeof runAlphaBattleModern33000Diagnostics==="function",null,{timeout:30000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD_MANIFEST,"#373 runtime fingerprint mismatch");

  const d=await page.evaluate(()=>({
    battle:runAlphaBattleModern33000Diagnostics(),
    menma:runIssue369MenmaEvolvedPLBattleDiagnostics()
  }));
  assert.strictEqual(d.battle.pass,true,"33000 diagnostics RED "+JSON.stringify(d.battle));
  assert.strictEqual(d.menma.pass,true,"36900 diagnostics RED "+JSON.stringify(d.menma));

  const started=await page.evaluate(()=>({
    selected:selectChronicleOrigin("academy_menma","issue_373_browser"),
    launched:beginAlphaChronicleOriginPrologue()
  }));
  assert(started.selected?.success===true,"Menma selection failed "+JSON.stringify(started));
  assert(started.launched?.success===true,"Menma Story launch failed "+JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene,SCENE,{timeout:15000});
  await page.evaluate(()=>setStorySceneBeat("tutorial_battle"));
  await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="tutorial_battle",null,{timeout:8000});
  const launched=await page.evaluate(()=>advanceStoryScene());
  assert(launched?.success===true,"Story -> Battle failed "+JSON.stringify(launched));
  await page.waitForFunction(enc=>currentBattle?.active===true&&currentBattle?.encounterId===enc,ENCOUNTER,{timeout:12000});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);

  try{
    await boot(page);

    // Phase A must be a readable Anko -> Altered action while Altered remains
    // the visible Active target at committed 0 PL.
    await page.waitForFunction(({ANKO,ALTERED})=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return stage?.dataset.presentationActorId===ANKO&&stage?.dataset.presentationTargetId===ALTERED;
    },{ANKO,ALTERED},{timeout:12000});

    const a=await stageSnapshot(page);
    assert.strictEqual(a.environment,"forest_clearing_day");
    assert.strictEqual(a.proof,"menma_three_subjects");
    assert(a.background.includes("forest_clearing_day.png"),"forest backdrop absent");
    assert.strictEqual(a.playerCount,2);
    assert.strictEqual(a.enemyCount,3);
    assert.strictEqual(a.activePlayerId,ANKO);
    assert.strictEqual(a.activeEnemyId,ALTERED);
    assert(/sj_anko/i.test(a.activePlayerSrc),"Anko active portrait absent");
    assert(/test_subject_altered_shinobi/i.test(a.activeEnemySrc),"Altered active portrait absent");
    assert.strictEqual(a.activePlayerFrameless,"true");
    assert.strictEqual(a.activeEnemyFrameless,"true");
    const menmaSupport=a.playerSupports.find(x=>x.id===MENMA);
    const bruteSupport=a.enemySupports.find(x=>x.id===BRUTE);
    const unstableSupport=a.enemySupports.find(x=>x.id===UNSTABLE);
    assert(menmaSupport&&/academy_menma/i.test(menmaSupport.src),"Menma support portrait absent");
    assert(bruteSupport&&/test_subject_brute/i.test(bruteSupport.src),"Brute support portrait absent");
    assert(unstableSupport&&/test_subject_unstable/i.test(unstableSupport.src),"Unstable support portrait absent");
    assert.strictEqual(a.presentation.busy,"true");
    assert.strictEqual(a.presentation.actor,ANKO);
    assert.strictEqual(a.presentation.target,ALTERED);
    assert.strictEqual(a.presentation.role,"AUTHORED BEAT");
    assert.strictEqual(a.presentation.actorNodes,1,"Phase A projected more than one actor");
    assert.strictEqual(a.presentation.targetNodes,1,"Phase A projected more than one target");
    assert.strictEqual(a.presentation.actionText,"Hidden Shadow Snake Hands");
    await page.screenshot({path:path.join(OUT,"01-phase-a-anko-altered.png"),fullPage:false,timeout:12000});

    // Phase B must not appear until Phase A has settled and Altered has relayed.
    await page.waitForFunction(({ANKO,BRUTE})=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return stage?.dataset.presentationActorId===ANKO&&stage?.dataset.presentationTargetId===BRUTE;
    },{ANKO,BRUTE},{timeout:12000});
    const b=await stageSnapshot(page);
    assert.strictEqual(b.activePlayerId,ANKO);
    assert.strictEqual(b.activeEnemyId,BRUTE);
    assert.strictEqual(b.presentation.actor,ANKO);
    assert.strictEqual(b.presentation.target,BRUTE);
    assert.strictEqual(b.presentation.ordinal>a.presentation.ordinal,true,"Phase B did not advance presentation ordinal");
    assert.strictEqual(b.presentation.actorNodes,1);
    assert.strictEqual(b.presentation.targetNodes,1);
    assert.strictEqual(b.presentation.actionText,"Fire Style: Dragon Flame");
    await page.screenshot({path:path.join(OUT,"02-phase-b-anko-brute.png"),fullPage:false,timeout:12000});

    // The authored handoff must finish with Menma and Unstable simultaneously
    // promoted to the central Active confrontation while Anko remains Benched.
    await page.waitForFunction(({MENMA,UNSTABLE})=>{
      return getMenmaEvolvedPLBattleState36900()?.phase==="phase_c_player"&&
        getBattleDeploymentParticipant("player",1)?.id===MENMA&&
        getBattleDeploymentParticipant("enemy",1)?.id===UNSTABLE&&
        getMenmaEvolvedPLBattleInputReadiness36900()?.ready===true;
    },{MENMA,UNSTABLE},{timeout:15000});

    const c=await stageSnapshot(page);
    assert.strictEqual(c.activePlayerId,MENMA);
    assert.strictEqual(c.activeEnemyId,UNSTABLE);
    assert(/academy_menma/i.test(c.activePlayerSrc),"Menma did not project as Active");
    assert(/test_subject_unstable/i.test(c.activeEnemySrc),"Unstable did not project as Active");
    const ankoSupport=c.playerSupports.find(x=>x.id===ANKO);
    assert(ankoSupport&&/sj_anko/i.test(ankoSupport.src),"Anko did not remain visible Benched");
    assert(c.transition&&c.transition.type==="authored_active_yield","Menma handoff transition missing");
    assert(c.transition.pairedEnemyRelayTransition&&c.transition.pairedEnemyRelayTransition.side==="enemy","Unstable relay not paired with Menma handoff");
    assert.strictEqual(c.lastFormationTransitionId,c.transition.id,"formation renderer did not consume authored handoff");
    await page.screenshot({path:path.join(OUT,"03-phase-c-menma-unstable.png"),fullPage:false,timeout:12000});

    // Real Phase-C exchange: semantics may commit the response synchronously,
    // but presentation must show Menma first and Unstable second, never both.
    const action=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_chakra_knuckle"));
    assert(action?.success===true,"Menma Phase-C action failed "+JSON.stringify(action));

    await page.waitForFunction(({MENMA,UNSTABLE})=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return stage?.dataset.presentationActorId===MENMA&&stage?.dataset.presentationTargetId===UNSTABLE&&stage?.dataset.presentationQueueBusy==="true";
    },{MENMA,UNSTABLE},{timeout:12000});
    const menmaTurn=await stageSnapshot(page);
    assert.strictEqual(menmaTurn.presentation.actor,MENMA);
    assert.strictEqual(menmaTurn.presentation.target,UNSTABLE);
    assert.strictEqual(menmaTurn.presentation.actorNodes,1);
    assert.strictEqual(menmaTurn.presentation.targetNodes,1);
    assert.strictEqual(menmaTurn.presentation.actionText,"Driving Chakra Fist");
    await page.screenshot({path:path.join(OUT,"04-phase-c-menma-action.png"),fullPage:false,timeout:12000});

    await page.waitForFunction(({MENMA,UNSTABLE,ordinal})=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return stage?.dataset.presentationActorId===UNSTABLE&&stage?.dataset.presentationTargetId===MENMA&&Number(stage?.dataset.presentationSequenceOrdinal||0)>ordinal;
    },{MENMA,UNSTABLE,ordinal:menmaTurn.presentation.ordinal},{timeout:12000});
    const enemyTurn=await stageSnapshot(page);
    assert.strictEqual(enemyTurn.presentation.actor,UNSTABLE);
    assert.strictEqual(enemyTurn.presentation.target,MENMA);
    assert.strictEqual(enemyTurn.presentation.actorNodes,1);
    assert.strictEqual(enemyTurn.presentation.targetNodes,1);
    assert(enemyTurn.presentation.ordinal>menmaTurn.presentation.ordinal,"Unstable presentation did not follow Menma sequentially");
    await page.screenshot({path:path.join(OUT,"05-phase-c-unstable-response.png"),fullPage:false,timeout:12000});

    await page.waitForFunction(()=>document.querySelector(".alpha-code-battle-stage")?.dataset.presentationQueueBusy==="false",null,{timeout:12000});
    const final=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      readiness:getMenmaEvolvedPLBattleInputReadiness36900(),
      evidence:(currentBattle.runtime?.evidence||[]).map(r=>({eventType:r.eventType,actor:r.actorRef?.participantId||null,target:r.targetRef?.participantId||null}))
    }));
    assert.strictEqual(final.state.phase,"phase_c_player","nonterminal exchange did not return to Menma");
    assert.strictEqual(final.readiness.ready,true,"Menma input not restored after sequential enemy response");
    assert.strictEqual(final.evidence.filter(r=>r.eventType==="enemy_authored_action_completed"&&r.actor===ALTERED).length,0,"Altered received an illegal ordinary turn");
    assert.strictEqual(final.evidence.filter(r=>r.eventType==="enemy_authored_action_completed"&&r.actor===BRUTE).length,0,"Brute received an illegal ordinary turn");

    await gate.assertClean("issue-373-evolved-battle-presentation");

    const summary={
      pass:true,
      issue:373,
      kind:"installed_browser_evolved_battle_presentation",
      buildId:BUILD_MANIFEST.buildId,
      checks:{
        forestBackdropVisible:true,
        allFiveParticipantPortraitsVisible:true,
        framelessActiveProjection:true,
        ankoAlteredReadableBeat:true,
        alteredThenBruteRelay:true,
        ankoBruteReadableBeat:true,
        menmaAndUnstablePromoteIntoActiveConfrontation:true,
        ankoRemainsBenched:true,
        menmaThenUnstableSequentialPlayback:true,
        noAlteredOrBruteOrdinaryTurns:true,
        phaseCInputRestores:true,
        browserErrorGateClean:true
      },
      stephenVisualAcceptance:"PENDING",
      battleGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
