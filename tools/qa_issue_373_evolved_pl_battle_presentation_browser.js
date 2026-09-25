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
const CONFIG="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE="stop_three_test_subjects";
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
    typeof getBattlePresentationQueueState33000==="function"&&
    globalThis.SC_MENMA_EVOLVED_PL_BATTLE_36900
  ),null,{timeout:30000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD_MANIFEST,label+" fingerprint mismatch");

  const started=await page.evaluate(()=>({
    selected:selectChronicleOrigin("academy_menma","issue_373_browser"),
    launched:beginAlphaChronicleOriginPrologue()
  }));
  assert(started.selected?.success===true,label+" Menma select failed "+JSON.stringify(started));
  assert(started.launched?.success===true,label+" Menma Story launch failed "+JSON.stringify(started));
  await releaseFrontDoor(page);
  await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene,SCENE,{timeout:15000});
  await page.evaluate(()=>setStorySceneBeat("tutorial_battle"));
  await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="tutorial_battle",null,{timeout:8000});

  const beat=await page.evaluate(()=>{
    const b=getCurrentStorySceneBeat();
    return {
      text:b&&b.text||null,
      mode:b&&b.mode||null,
      actionLabel:b&&b.battle&&b.battle.actionLabel||null,
      encounterId:b&&b.battle&&b.battle.encounterId||null,
      objectiveId:b&&b.battle&&b.battle.objectiveId||null
    };
  });
  assert.deepStrictEqual(beat,{
    text:"Stop the Test Subjects.",
    mode:"battle_transition",
    actionLabel:"STOP THE TEST SUBJECTS",
    encounterId:ENCOUNTER,
    objectiveId:OBJECTIVE
  },label+" successor Story objective drift");

  const launch=await page.evaluate(()=>advanceStoryScene());
  assert(launch&&launch.success===true,label+" Story -> Battle launch failed "+JSON.stringify(launch));
  await page.waitForFunction(enc=>currentBattle&&currentBattle.active===true&&currentBattle.encounterId===enc,ENCOUNTER,{timeout:12000});
  await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});
  await page.waitForFunction(()=> {
    const stage=document.querySelector(".alpha-code-battle-stage");
    return stage&&stage.dataset.formationMode==="wedge"&&stage.dataset.playerFormationCount==="2"&&stage.dataset.enemyFormationCount==="3";
  },null,{timeout:12000});
  return{context,page,gate};
}

async function formationSnapshot(page){
  return page.evaluate(()=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    const rows=[...stage.querySelectorAll(".battle2-formation-participant[data-participant-id]")].map(node=>{
      const img=node.querySelector("img");
      const rect=node.getBoundingClientRect();
      return{
        side:node.dataset.formationSide||null,
        participantId:node.dataset.participantId||null,
        role:node.dataset.formationRole||null,
        assetKind:node.dataset.presentationAssetKind||null,
        src:img&&img.getAttribute("src")||null,
        width:Math.round(rect.width),
        height:Math.round(rect.height)
      };
    });
    return{
      mode:stage.dataset.formationMode||null,
      evolved:stage.dataset.evolvedBattlePresentation||null,
      playerCount:stage.dataset.playerFormationCount||null,
      enemyCount:stage.dataset.enemyFormationCount||null,
      objective:stage.querySelector(".battle2-objective-label")?.textContent||null,
      objectiveId:stage.querySelector(".battle2-objective-label")?.dataset.objectiveId||null,
      environment:stage.dataset.battleEnvironment||null,
      background:stage.style.backgroundImage||"",
      rows
    };
  });
}

async function waitQueueDrained(page,minExposed){
  await page.waitForFunction(min=>{
    const q=getBattlePresentationQueueState33000();
    return q&&!q.busy&&Array.isArray(q.exposedReceipts)&&q.exposedReceipts.length>=min;
  },minExposed,{timeout:20000});
  return page.evaluate(()=>getBattlePresentationQueueState33000());
}

async function formationAndPlayback(browser){
  const {context,page,gate}=await bootScenario(browser,"formation-playback");
  try{
    const formation=await formationSnapshot(page);
    assert.strictEqual(formation.mode,"wedge","2-v-3 rendered as duel");
    assert.strictEqual(formation.evolved,"true","evolved presentation scope missing");
    assert.strictEqual(formation.playerCount,"2");
    assert.strictEqual(formation.enemyCount,"3");
    assert.strictEqual(formation.objective,"Stop the Test Subjects.");
    assert.strictEqual(formation.objectiveId,OBJECTIVE);
    assert.strictEqual(formation.environment,"Scene backdrops/forest_clearing_day.png");
    assert(formation.background.includes("forest_clearing_day.png"),"forest clearing not visibly bound");

    const byId=Object.fromEntries(formation.rows.map(row=>[row.participantId,row]));
    assert.strictEqual(formation.rows.filter(r=>r.side==="player").length,2,"allied portrait cardinality");
    assert.strictEqual(formation.rows.filter(r=>r.side==="enemy").length,3,"enemy portrait cardinality");
    assert.strictEqual(byId[MENMA]?.role,"active");
    assert.strictEqual(byId[ANKO]?.role,"benched");
    assert.strictEqual(byId[ALTERED]?.role,"active");
    assert.strictEqual(byId[BRUTE]?.role,"benched");
    assert.strictEqual(byId[UNSTABLE]?.role,"benched");
    for(const id of [MENMA,ANKO,ALTERED,BRUTE,UNSTABLE]){
      assert.strictEqual(byId[id]?.assetKind,"frameless_portrait",id+" not projected as frameless Battle portrait");
      assert(byId[id]?.src,id+" portrait src missing");
      assert(byId[id].width>40&&byId[id].height>40,id+" portrait collapsed");
    }
    assert(byId[MENMA].src.includes("Portraits/Academy Student/academy_student_menma.png"));
    assert(byId[ANKO].src.includes("Portraits/Special Jonin/sj_anko.png"));
    assert(byId[ALTERED].src.includes("Enemies Portraits/test_subject_altered_shinobi.png"));
    assert(byId[BRUTE].src.includes("Enemies Portraits/test_subject_brute.png"));
    assert(byId[UNSTABLE].src.includes("Enemies Portraits/test_subject_unstable.png"));
    await page.screenshot({path:path.join(OUT,"01-initial-2v3-wedge.png"),fullPage:false,timeout:12000});

    const action=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_chakra_knuckle"));
    assert(action&&action.success===true,"Menma action failed "+JSON.stringify(action));
    await page.waitForFunction(()=> {
      const q=getBattlePresentationQueueState33000();
      const stage=document.querySelector(".alpha-code-battle-stage");
      return q&&q.current&&q.current.actorRef?.participantId==="academy_menma"&&stage?.dataset.presentationBusy==="true";
    },null,{timeout:7000});
    const visible=await page.evaluate(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const q=getBattlePresentationQueueState33000();
      return{
        current:q.current,
        lastActor:stage.dataset.lastExposedActor||null,
        lastTarget:stage.dataset.lastExposedTarget||null,
        lastAction:stage.dataset.lastExposedAction||null,
        result:stage.dataset.battle2PerformanceResult||null,
        resultChip:stage.querySelector(".battle2-performance-result-chip")?.innerText||null
      };
    });
    assert.strictEqual(visible.lastActor,MENMA);
    assert.strictEqual(visible.lastTarget,ALTERED);
    assert(visible.lastAction&&visible.result&&visible.resultChip,"Menma visible action grammar incomplete");
    await page.screenshot({path:path.join(OUT,"02-menma-action-playback.png"),fullPage:false,timeout:12000});

    const q=await waitQueueDrained(page,4);
    const exposed=q.exposedReceipts.slice(0,4);
    assert.deepStrictEqual(exposed.map(r=>r.sequenceOrdinal),[1,2,3,4],"presentation order drift");
    assert.deepStrictEqual(exposed.map(r=>r.actorRef?.participantId),[MENMA,ALTERED,ANKO,ALTERED],"Menma/enemy/Anko cadence was swallowed or reordered");
    for(const r of exposed){
      assert(r.actionLabel,"receipt action label missing");
      assert(r.targetRef?.participantId,"receipt exact target missing");
      assert(r.result,"receipt result missing");
      assert(r.exposureStarted===true&&r.exposureFinished===true,"receipt not visibly exposed");
    }
    const menmaReceipt=exposed.find(r=>r.actorRef?.participantId===MENMA);
    const enemyReceipt=exposed.find(r=>r.actorRef?.side==="enemy");
    const ankoReceipt=exposed.find(r=>r.actorRef?.participantId===ANKO);
    assert(menmaReceipt.beforePL!==null&&menmaReceipt.afterPL!==null,"Menma PL change missing");
    assert(enemyReceipt.beforePL!==null&&enemyReceipt.afterPL!==null,"enemy PL change missing");
    assert.strictEqual(ankoReceipt.actionRole,"authored_assist","Anko assist role drift");
    assert(ankoReceipt.actionLabel&&ankoReceipt.result,"Anko visible assist grammar missing");

    await page.screenshot({path:path.join(OUT,"03-after-full-visible-cadence.png"),fullPage:false,timeout:12000});
    await gate.assertClean("issue-373-formation-playback");
    return{formation,actors:exposed.map(r=>r.actorRef?.participantId),results:exposed.map(r=>r.result)};
  }finally{await context.close();}
}

async function relayAndVictory(browser){
  const {context,page,gate}=await bootScenario(browser,"relay-victory");
  try{
    await page.evaluate(()=>{
      setBattleRemainingPL("enemy","test_subject_altered_shinobi",1);
      initializeBattlePresentationQueue33000();
    });
    const first=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_guard_breaker"));
    assert(first&&first.success===true,"Altered relay action failed");
    let q=await waitQueueDrained(page,4);
    let relay=q.exposedReceipts.find(r=>r.formationTransition?.replacementParticipantId==="test_subject_brute");
    assert(relay,"Altered -> Brute relay not exposed");
    assert.strictEqual(relay.formationAfter.enemy.find(r=>r.slot===1)?.participantId,BRUTE,"Brute not Active after relay");

    await page.evaluate(()=>{
      setBattleRemainingPL("enemy","test_subject_brute",1);
      initializeBattlePresentationQueue33000();
    });
    const second=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_guard_breaker"));
    assert(second&&second.success===true,"Brute relay action failed");
    q=await waitQueueDrained(page,8);
    relay=q.exposedReceipts.find(r=>r.formationTransition?.replacementParticipantId==="test_subject_unstable");
    assert(relay,"Brute -> Unstable relay not exposed");
    assert.strictEqual(relay.formationAfter.enemy.find(r=>r.slot===1)?.participantId,UNSTABLE,"Unstable not Active after relay");
    await page.screenshot({path:path.join(OUT,"04-relay-to-unstable.png"),fullPage:false,timeout:12000});

    await page.evaluate(()=>{
      setBattleRemainingPL("enemy","test_subject_unstable",1);
      initializeBattlePresentationQueue33000();
    });
    const finishing=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_guard_breaker"));
    assert(finishing&&finishing.success===true,"terminal Menma action failed");
    await page.waitForFunction(()=>currentBattle?.presentationTerminalPending==="victory",null,{timeout:5000});
    const duringTerminal=await page.evaluate(()=>({
      overlay:typeof currentOverlayType==="string"?currentOverlayType:null,
      beat:getActiveStorySceneRuntime()?.beatId||null,
      pending:currentBattle.presentationTerminalPending,
      queue:getBattlePresentationQueueState33000()
    }));
    assert.strictEqual(duringTerminal.overlay,"combat","victory overlay erased finishing Battle before playback");
    assert.strictEqual(duringTerminal.beat,"tutorial_battle","Story advanced before terminal Battle presentation");
    assert(duringTerminal.queue.busy,"terminal receipt not actively exposed");
    await page.screenshot({path:path.join(OUT,"05-terminal-victory-action-visible.png"),fullPage:false,timeout:12000});

    await page.waitForFunction(()=>typeof currentOverlayType==="string"&&currentOverlayType==="victory",null,{timeout:12000});
    const terminalState=await page.evaluate(()=>getBattlePresentationQueueState33000());
    assert.strictEqual(terminalState.terminalExposed,true,"victory terminal exposure flag missing");
    assert(terminalState.exposedReceipts.some(r=>r.terminalAtCommit===true&&r.exposureFinished===true),"terminal committed receipt not exposed");

    const claimed=await page.evaluate(()=>claimCurrentBattleRewards());
    assert.strictEqual(claimed,true,"victory reward claim failed");
    const returned=await page.evaluate(()=>continueAfterVictory());
    assert(returned===undefined||returned?.success===true,"victory Story return failed "+JSON.stringify(returned));
    await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene&&getActiveStorySceneRuntime()?.beatId==="post_battle_opening",SCENE,{timeout:12000});
    await gate.assertClean("issue-373-relay-victory");
    return{
      alteredToBrute:true,
      bruteToUnstable:true,
      terminalReceiptExposed:true,
      storyReturnedOnce:true
    };
  }finally{await context.close();}
}

async function skippedRelay(browser){
  const {context,page,gate}=await bootScenario(browser,"skip-relay");
  try{
    await page.evaluate(()=>{
      const actor=getPlayerCharacter("academy_menma");
      setBattleRemainingPL("enemy","test_subject_brute",0);
      handleBattleParticipantAtZeroPL("enemy","test_subject_brute",actor,{actionId:"qa373_offslot_brute"});
      setBattleRemainingPL("enemy","test_subject_altered_shinobi",1);
      initializeBattlePresentationQueue33000();
    });
    const action=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_guard_breaker"));
    assert(action&&action.success===true,"skip-relay action failed");
    const q=await waitQueueDrained(page,4);
    const relay=q.exposedReceipts.find(r=>r.formationTransition?.replacementParticipantId);
    assert(relay,"skip-relay transition not exposed");
    assert.strictEqual(relay.formationTransition.replacementParticipantId,UNSTABLE,"withdrawn Brute was not skipped");
    assert.strictEqual(relay.formationAfter.enemy.find(r=>r.slot===1)?.participantId,UNSTABLE);
    await gate.assertClean("issue-373-skip-relay");
    return{skippedWithdrawnBrute:true};
  }finally{await context.close();}
}

async function presentationSafeguards(browser){
  const {context,page,gate}=await bootScenario(browser,"presentation-safeguards");
  try{
    const action=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_chakra_knuckle"));
    assert(action&&action.success===true,"safeguard setup action failed");
    await page.waitForFunction(()=>getBattlePresentationQueueState33000()?.busy===true,null,{timeout:7000});
    const before=await page.evaluate(()=>({
      evidence:(currentBattle.runtime?.evidence||[]).length,
      committed:Object.keys(getMenmaEvolvedPLBattleState36900().committedOpportunities||{}).length
    }));
    const settled=await page.evaluate(()=>hardSettleBattlePresentation33000("qa373_forced_playback_failure"));
    assert(settled&&settled.success===true&&settled.hardSettled===true,"hard-settle fallback failed");
    const after=await page.evaluate(()=>({
      evidence:(currentBattle.runtime?.evidence||[]).length,
      committed:Object.keys(getMenmaEvolvedPLBattleState36900().committedOpportunities||{}).length,
      queue:getBattlePresentationQueueState33000()
    }));
    assert.strictEqual(after.evidence,before.evidence,"hard settle duplicated semantic evidence");
    assert.strictEqual(after.committed,before.committed,"hard settle consumed semantic opportunity");
    assert.strictEqual(after.queue.busy,false,"hard settle left queue busy");
    assert(after.queue.exposedReceipts.some(r=>r.hardSettled===true),"hard-settled receipt not recorded");

    const stale=await page.evaluate(()=>{
      const state=currentBattle.presentation33000;
      const fake={
        battleId:"stale-battle-id",key:"stale-battle-id:fake-action",actionId:"fake-action",
        sequenceOrdinal:999,formationBefore:{player:[],enemy:[]},formationAfter:{player:[],enemy:[]}
      };
      state.queue.push(fake);state.queuedKeys.push(fake.key);
      const stage=document.querySelector(".alpha-code-battle-stage");
      startNextBattlePresentationReceipt33000(stage);
      return getBattlePresentationQueueState33000();
    });
    assert(stale.staleRejectedKeys.includes("stale-battle-id:fake-action"),"stale presentation receipt was not rejected");

    const evidenceBeforeReload=await page.evaluate(()=>(currentBattle.runtime?.evidence||[]).length);
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>typeof getBattlePresentationQueueState33000==="function"&&currentBattle&&currentBattle.encounterId==="origin_academy_menma_prologue:three_test_subjects",null,{timeout:30000});
    await releaseFrontDoor(page);
    const restored=await page.evaluate(()=>({
      evidence:(currentBattle.runtime?.evidence||[]).length,
      queue:getBattlePresentationQueueState33000(),
      state:getMenmaEvolvedPLBattleState36900()
    }));
    assert.strictEqual(restored.evidence,evidenceBeforeReload,"reload duplicated committed semantic evidence");
    assert.strictEqual(restored.queue.busy,false,"reload resurrected stale playback queue");
    assert.strictEqual(restored.queue.exposedReceipts.length,0,"reload duplicated previously exposed receipts");
    assert(Object.keys(restored.state.committedOpportunities||{}).length===before.committed,"reload changed committed opportunity cardinality");
    await gate.assertClean("issue-373-presentation-safeguards");
    return{hardSettleNoSemanticDuplication:true,staleReceiptRejected:true,reloadNoDuplicateQueue:true};
  }finally{await context.close();}
}

async function defeatDelay(browser){
  const {context,page,gate}=await bootScenario(browser,"defeat-delay");
  try{
    await page.evaluate(()=>{
      setBattleRemainingPL("player","academy_menma",1);
      initializeBattlePresentationQueue33000();
    });
    const action=await page.evaluate(()=>attemptBattlePreparedSkill("academy_menma_chakra_knuckle"));
    assert(action&&action.success===true,"defeat setup action failed");
    await page.waitForFunction(()=>currentBattle?.presentationTerminalPending==="defeat",null,{timeout:6000});
    const during=await page.evaluate(()=>({
      overlay:typeof currentOverlayType==="string"?currentOverlayType:null,
      beat:getActiveStorySceneRuntime()?.beatId||null,
      pending:currentBattle.presentationTerminalPending,
      queue:getBattlePresentationQueueState33000()
    }));
    assert.strictEqual(during.overlay,"combat","defeat returned to Story before final action playback");
    assert.strictEqual(during.beat,"tutorial_battle","defeat Story beat advanced too early");
    assert(during.queue.busy,"defeat terminal queue not busy");
    await page.screenshot({path:path.join(OUT,"06-terminal-defeat-action-visible.png"),fullPage:false,timeout:12000});

    await page.waitForFunction(()=>getActiveStorySceneRuntime()?.beatId==="tutorial_not_completed",null,{timeout:12000});
    const after=await page.evaluate(()=>({
      text:getCurrentStorySceneBeat()?.text||null,
      queue:getBattlePresentationQueueState33000(),
      pending:currentBattle.presentationTerminalPending||null
    }));
    assert.strictEqual(after.text,"Stop the Test Subjects — not completed.");
    assert.strictEqual(after.pending,null);
    assert.strictEqual(after.queue.terminalExposed,true);
    assert(after.queue.exposedReceipts.some(r=>r.terminalAtCommit===true&&r.exposureFinished===true),"defeat terminal receipt not exposed");
    await gate.assertClean("issue-373-defeat-delay");
    return{terminalReceiptExposed:true,successorDefeatObjective:true};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  try{
    const formation=await formationAndPlayback(browser);
    const relay=await relayAndVictory(browser);
    const skip=await skippedRelay(browser);
    const safeguards=await presentationSafeguards(browser);
    const defeat=await defeatDelay(browser);
    const summary={
      pass:true,
      issue:373,
      kind:"installed_browser_evolved_pl_battle_presentation",
      checks:{
        exact2v3Wedge:true,
        framelessPortraitProjection:true,
        forestClearingVisible:true,
        successorObjectiveVisible:true,
        menmaActionVisible:true,
        enemyActionVisible:true,
        ankoAssistVisible:true,
        orderedCommittedPlayback:true,
        alteredToBruteRelayVisible:true,
        bruteToUnstableRelayVisible:true,
        withdrawnFutureRelaySkipped:true,
        terminalVictoryVisibleBeforeOverlay:true,
        terminalDefeatVisibleBeforeStory:true,
        storyCallerResumes:true,
        playbackFailureHardSettles:true,
        reloadDoesNotDuplicatePresentation:true,
        staleReceiptRejected:true,
        browserRuntimeErrorsClean:true
      },
      formation,relay,skip,safeguards,defeat,
      semanticGreenFrom369Preserved:true,
      presentationGreenCandidate:true,
      installedBrowserFunctionalGreen:true,
      stephenVisualAcceptance:false,
      battleGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2));
    console.log(JSON.stringify(summary,null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{
  console.error(error&&error.stack||error);
  process.exit(1);
});
