#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BUILD_MANIFEST=JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
const BASE=process.env.ISSUE_312_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_312_BROWSER_OUT||"artifacts/issue-312-browser";
fs.mkdirSync(OUT,{recursive:true});

async function boot(browser){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const runtimeErrorGate=await installBrowserRuntimeErrorGate(page);
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch(_){}});
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForFunction(()=>typeof globalThis.getRuntimeBuildFingerprint==="function",null,{timeout:15000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD_MANIFEST,"#312 runtime fingerprint mismatch");
  await page.waitForFunction(()=>!!(
    globalThis.SC_STORY_SCENE_BOARD_33900&&
    globalThis.SC_BATTLE_PRESENTATION_33000&&
    globalThis.SC_ACADEMY_KAKASHI_V2_CORE_36020&&
    globalThis.SC_ACADEMY_KAKASHI_V2_RENDERER_36030&&
    globalThis.SC_ACADEMY_KAKASHI_V2_TRANSITION_36040
  ),null,{timeout:30000});
  const started=await page.evaluate(()=>{
    const selected=selectChronicleOrigin("academy_kakashi","issue_312_browser");
    const launched=beginAlphaChronicleOriginPrologue();
    if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();
    if(globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400&&typeof globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.release==="function")globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.release();
    const game=document.querySelector(".game-container");if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){const node=document.getElementById(id);if(node)node.remove();}
    return{selected,launched};
  });
  assert(started.selected?.success&&started.launched?.success,JSON.stringify(started));
  await page.waitForSelector("#kakashi-v2-scene-board",{state:"visible",timeout:15000});
  return{context,page,runtimeErrorGate};
}
async function currentBeat(page){return page.evaluate(()=>getActiveStorySceneRuntime()?.beatId||null);}
async function fastDrain(page){
  const result=await page.evaluate(()=>{
    const rt=getActiveStorySceneRuntime(),p=rt&&getAcademyKakashiV2Presentation36020(rt.beatId);
    if(!rt||!p)return{success:false};
    const count=Array.isArray(p.cues)?p.cues.length:0;
    rt.localContext=rt.localContext&&typeof rt.localContext==="object"?rt.localContext:{};
    rt.localContext.__kakashiV2Presentation36040={beatId:rt.beatId,cueIndex:Math.max(0,count-1),settled:true};
    savePlayerData();renderAcademyKakashiV236030();
    return{success:true,count};
  });
  assert(result.success,JSON.stringify(result));
}
async function waitBeat(page,beat){
  await page.waitForFunction(id=>getActiveStorySceneRuntime()?.beatId===id&&getAcademyKakashiV2TransitionState36040()?.locked===false,beat,{timeout:12000});
}
async function nextSemantic(page,expected){
  await fastDrain(page);
  const result=await page.evaluate(()=>advanceAcademyKakashiV236040());
  assert(result?.success,JSON.stringify(result));
  await waitBeat(page,expected);
}
async function choose(page,label,expected){
  await fastDrain(page);
  const result=await page.evaluate(label=>{
    const beat=getCurrentStorySceneBeat();
    const row=(beat?.choices||[]).find(c=>c.label===label&&(typeof c.availability!=="function"||c.availability().available===true));
    if(!row)return{success:false,labels:(beat?.choices||[]).map(c=>c.label)};
    return advanceAcademyKakashiV236040(row.choiceId);
  },label);
  assert(result?.success,JSON.stringify(result));
  await waitBeat(page,expected);
}
async function shot(page,name,selector=null){
  if(selector){
    const exact=page.locator(selector).first();
    await exact.waitFor({state:"visible",timeout:12000});
    await exact.screenshot({path:path.join(OUT,name),timeout:12000});
    return;
  }
  await page.screenshot({path:path.join(OUT,name),fullPage:false,timeout:12000});
}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const {context,page,runtimeErrorGate}=await boot(browser);
  try{
    // STORY BENCHMARK — persistent semantic anchors + adaptive prominence.
    const rooftop=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const actors=[...root.querySelectorAll(".kv2-actor")].map(n=>({id:n.dataset.actorId,anchor:n.dataset.scStageAnchor,width:n.getBoundingClientRect().width}));
      return{beat:getActiveStorySceneRuntime()?.beatId,actors,diagnostic:runAcademyKakashiV2Renderer36030Diagnostics(),shared:runStorySceneBoard33900Diagnostics()};
    });
    assert.strictEqual(rooftop.beat,"v2_scene01_rooftop");
    assert.deepStrictEqual(rooftop.actors.map(a=>a.anchor),["PLAYER_LEFT","OPPONENT_RIGHT"]);
    assert(rooftop.actors.every(a=>a.width>=245),"#312 two-actor Story prominence too small: "+JSON.stringify(rooftop.actors));
    assert(rooftop.diagnostic.pass&&rooftop.shared.pass,JSON.stringify(rooftop));
    await shot(page,"01-story-rooftop-two-actor.png","#kakashi-v2-scene-board");

    await nextSemantic(page,"v2_scene02_tail");
    await choose(page,"WATCH THE EXCHANGE","v2_watch_exchange");

    // Manual #312 blocker: MI must not be visible before the narration actually
    // reaches her entrance. The scene is mounted with all semantic participants,
    // but presentation withholds MI until cue 10.
    const watchOpening=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const mi=root.querySelector('.kv2-actor[data-slot="mi"]');
      const actions=root.querySelector(".kv2-actions");
      return{
        cue:getAcademyKakashiV2TransitionState36040()?.cueIndex,
        miWithheld:mi?.dataset.kv2CueWithheld==="true",
        miOpacity:mi?Number(getComputedStyle(mi).opacity):1,
        actionsVisible:actions?getComputedStyle(actions).display!=="none":false,
        canAdvance:root.dataset.canAdvance,
        hasChoices:root.dataset.hasChoices
      };
    });
    assert.strictEqual(watchOpening.cue,0);
    assert.strictEqual(watchOpening.miWithheld,true,"#312 MI must be visually withheld until the authored surprise-entry cue");
    assert(watchOpening.miOpacity<=0.01,"#312 MI is visible before her authored entrance: "+watchOpening.miOpacity);
    assert.strictEqual(watchOpening.actionsVisible,false,"#312 choices appeared before WATCH narration completed");
    assert.strictEqual(watchOpening.canAdvance,"true");
    assert.strictEqual(watchOpening.hasChoices,"false");

    async function advanceWatchCue(index){
      const result=await page.evaluate(()=>advanceAcademyKakashiV236040());
      assert(result?.success&&result.semanticBeatUnchanged===true&&result.cueIndex===index,JSON.stringify(result));
    }

    for(let i=1;i<=5;i++)await advanceWatchCue(i);
    await page.waitForTimeout(430);
    let watch=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const amt=root.querySelector('.kv2-actor[data-slot="amt"]');
      return{cue:getAcademyKakashiV2TransitionState36040()?.cueIndex,amtAnchor:amt?.dataset.scStageAnchor};
    });
    assert.strictEqual(watch.cue,5);
    assert.strictEqual(watch.amtAnchor,"PLAYER_LEFT","#312 'first man moving away' did not move AMT left");

    await advanceWatchCue(6);
    await page.waitForTimeout(430);
    watch=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const ps=root.querySelector('.kv2-actor[data-slot="ps"]');
      const token=root.querySelector('[data-story-object-id="PACKAGE"]');
      return{psAnchor:ps?.dataset.scStageAnchor,packageAnchor:token?.dataset.packageAnchor,packageHolder:token?.dataset.packageHolder};
    });
    assert.strictEqual(watch.psAnchor,"OPPONENT_RIGHT","#312 Package Smuggler did not separate right with the package");
    assert.strictEqual(watch.packageHolder,"PS");
    assert.strictEqual(watch.packageAnchor,"OPPONENT_RIGHT","#312 package presentation did not travel with Package Smuggler");

    await advanceWatchCue(7);
    await advanceWatchCue(8);
    await advanceWatchCue(9);
    await page.waitForTimeout(260);
    const anticipation=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      return{
        cue:getAcademyKakashiV2TransitionState36040()?.cueIndex,
        miWithheld:root.querySelector('.kv2-actor[data-slot="mi"]')?.dataset.kv2CueWithheld==="true",
        lastKinds:getStoryChoreographyState33900(root).lastKinds
      };
    });
    assert.strictEqual(anticipation.cue,9);
    assert.strictEqual(anticipation.miWithheld,true);
    assert(anticipation.lastKinds.includes("FOCUS"),"#312 'movement snaps' anticipation focus missing");

    await advanceWatchCue(10);
    await page.waitForFunction(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const state=root&&getStoryChoreographyState33900(root);
      return !!state&&state.state==="settled"&&state.completedKinds.includes("SURPRISE_ENTRY")&&state.completedKinds.includes("LUNGE");
    },null,{timeout:2600});
    watch=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const mi=root.querySelector('.kv2-actor[data-slot="mi"]');
      return{
        miAnchor:mi?.dataset.scStageAnchor,
        miWithheld:mi?.dataset.kv2CueWithheld==="true",
        miOpacity:mi?Number(getComputedStyle(mi).opacity):0,
        choreography:getStoryChoreographyState33900(root)
      };
    });
    assert.strictEqual(watch.miAnchor,"CENTER");
    assert.strictEqual(watch.miWithheld,false,"#312 Masked Interceptor remained hidden after authored SURPRISE_ENTRY");
    assert(watch.miOpacity>=0.75,"#312 Masked Interceptor did not become visible after authored entrance: "+watch.miOpacity);
    assert(watch.choreography.completedKinds.includes("LUNGE"),"#312 MI entrance did not visibly drive toward Package Smuggler");
    await shot(page,"02-story-handoff-surprise-entry.png","#kakashi-v2-scene-board");

    await advanceWatchCue(11);
    await page.waitForTimeout(720);
    const breakaway=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const amt=root.querySelector('.kv2-actor[data-slot="amt"]');
      const ps=root.querySelector('.kv2-actor[data-slot="ps"]');
      return{
        amtDeparted:amt?.classList.contains("kv2-cue-departed")===true,
        amtOpacity:amt?Number(getComputedStyle(amt).opacity):1,
        psAnchor:ps?.dataset.scStageAnchor
      };
    });
    assert.strictEqual(breakaway.amtDeparted,true,"#312 ANBU Marked Target did not visibly break away");
    assert(breakaway.amtOpacity<=0.01,"#312 AMT lingered after breakaway");
    assert.strictEqual(breakaway.psAnchor,"OPPONENT_RIGHT");

    for(let i=12;i<=17;i++)await advanceWatchCue(i);
    const choiceLayout=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const box=root.querySelector(".kv2-actions");
      const buttons=[...box.querySelectorAll("button")];
      return{
        count:buttons.length,
        labels:buttons.map(b=>b.textContent.trim()),
        icons:buttons.map(b=>b.dataset.intentIcon||""),
        scrollHeight:box.scrollHeight,
        clientHeight:box.clientHeight,
        overflowY:getComputedStyle(box).overflowY,
        hasChoices:root.dataset.hasChoices,
        canAdvance:root.dataset.canAdvance,
        narrationRadius:getComputedStyle(root.querySelector(".kv2-dialogue")).borderRadius
      };
    });
    assert.strictEqual(choiceLayout.count,5,"#312 exact WATCH choice set lost");
    assert(choiceLayout.icons.every(Boolean),"#312 choice intent icons missing: "+JSON.stringify(choiceLayout.icons));
    assert(choiceLayout.scrollHeight<=choiceLayout.clientHeight+2,"#312 five-choice surface still requires an internal scrollbar: "+JSON.stringify(choiceLayout));
    assert.notStrictEqual(choiceLayout.overflowY,"scroll");
    assert.strictEqual(choiceLayout.hasChoices,"true");
    assert.strictEqual(choiceLayout.canAdvance,"false");
    assert(parseFloat(choiceLayout.narrationRadius)>=10,"#312 narration/choice surface is not modern rounded presentation");

    // Choice is not trapped by the running animation: semantic transition is immediate.
    const start=Date.now();
    await choose(page,"STOP THE ASSASSIN","v2_stop_assassin_setup");
    const elapsed=Date.now()-start;
    assert(elapsed<900,"#312 Story semantic choice waited for presentation animation: "+elapsed+"ms");
    const stopEntryPhase=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const real=[...root.querySelectorAll(".kv2-actors > .kv2-actor")].map(n=>({slot:n.dataset.slot,id:n.dataset.actorId,pending:n.dataset.scChoreographyPendingEntry==="true"}));
      const ghosts=[...root.querySelectorAll(".kv2-departure-ghost")].map(n=>({id:n.dataset.actorId,active:n.dataset.scChoreographyActive||null}));
      const before=getStoryChoreographyState33900(root);
      renderAcademyKakashiV236030();renderAcademyKakashiV236030();
      const after=getStoryChoreographyState33900(root);
      return{real,ghosts,before,after,ghostCountAfter:root.querySelectorAll(".kv2-departure-ghost").length};
    });
    assert.deepStrictEqual(stopEntryPhase.real.map(x=>x.slot),["kakashi","mi"],"#312 committed STOP state must contain only Kakashi + MI real actors");
    assert(stopEntryPhase.real.find(x=>x.slot==="kakashi")?.pending===true,"#312 Kakashi must remain staged until intentional ENTER begins");
    assert(stopEntryPhase.ghosts.length===2&&stopEntryPhase.ghosts.some(x=>x.active==="EXIT"),"#312 AMT/PS departures must begin before Kakashi entry: "+JSON.stringify(stopEntryPhase));
    assert.strictEqual(stopEntryPhase.ghostCountAfter,2,"#312 repeated same-beat render duplicated/removed departure ghosts");
    assert.strictEqual(stopEntryPhase.before.scopeKey,stopEntryPhase.after.scopeKey,"#312 repeated same-beat render changed choreography scope");
    assert.strictEqual(stopEntryPhase.before.cueIndex,stopEntryPhase.after.cueIndex,"#312 repeated same-beat render replayed choreography");

    await page.waitForFunction(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const state=root&&getStoryChoreographyState33900(root);
      const kakashi=root&&root.querySelector('.kv2-actor[data-slot="kakashi"]');
      return !!state&&state.completedKinds.includes("ENTER")&&!!kakashi&&!kakashi.hasAttribute("data-sc-choreography-pending-entry");
    },null,{timeout:2600});
    await page.waitForFunction(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      const state=root&&getStoryChoreographyState33900(root);
      return !!state&&state.state==="settled";
    },null,{timeout:2600});
    const stop=await page.evaluate(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      return{
        beat:getActiveStorySceneRuntime()?.beatId,
        anchors:[...root.querySelectorAll(".kv2-actors > .kv2-actor")].map(n=>({slot:n.dataset.slot,anchor:n.dataset.scStageAnchor,width:n.getBoundingClientRect().width})),
        ghostCount:root.querySelectorAll(".kv2-departure-ghost").length,
        pendingEntryCount:root.querySelectorAll("[data-sc-choreography-pending-entry]").length,
        choreography:getStoryChoreographyState33900(root),
        transition:runAcademyKakashiV2Transition36040Diagnostics()
      };
    });
    assert.strictEqual(stop.beat,"v2_stop_assassin_setup");
    assert.deepStrictEqual(stop.anchors.map(x=>x.anchor),["PLAYER_LEFT","OPPONENT_RIGHT"]);
    assert(stop.anchors.every(a=>a.width>=245),"#312 battle-pair Story prominence too small");
    assert.strictEqual(stop.ghostCount,0,"#312 committed departures survived after choreography settled");
    assert.strictEqual(stop.pendingEntryCount,0,"#312 entrant remained hidden after choreography settled");
    assert(stop.choreography.lastKinds.includes("FOCUS")&&stop.choreography.lastKinds.includes("LUNGE"),"#312 shared FOCUS -> LUNGE choreography receipt missing: "+JSON.stringify(stop.choreography));
    assert(stop.choreography.completedKinds.includes("ENTER"),"#312 Kakashi entry completion receipt missing: "+JSON.stringify(stop.choreography));
    assert(stop.transition.pass,JSON.stringify(stop.transition));
    await page.waitForFunction(()=>{
      const root=document.getElementById("kakashi-v2-scene-board");
      return !!root&&!root.classList.contains("is-wipe-covering");
    },null,{timeout:3000});
    await page.waitForTimeout(260);
    await shot(page,"03-story-stop-assassin-lunge.png","#kakashi-v2-scene-board");

    // BATTLE BENCHMARK — use the authorised sequential MI package against the
    // same current Story instance. This is a QA launcher only; Battle truth and
    // evidence remain canonical runtime structures.
    const launched=await page.evaluate(()=>{
      const rt=getActiveStorySceneRuntime();
      rt.beatId="v2_battle_mi_package_second";
      rt.pendingBattle=null;rt.battleResume=null;
      resetAcademyKakashiV2Transition36040();
      const returnContext={
        type:"story_scene",sceneId:rt.sceneId,sceneInstanceId:rt.instanceId,
        sourceBeatId:"v2_battle_mi_package_second",
        victoryBeatId:"v2_mi_package_second_win",defeatBeatId:"v2_mi_package_second_loss",
        postBattleBeatId:null,exposeFinisher:false
      };
      const out=launchAcademyKakashiV2Battle36010({
        battleConfigId:"academy_kakashi_origin_battle_seq_mi",
        storyOccurrenceId:"issue312_browser_benchmark",
        sourceAnchorRef:"AK_SA_015",
        bindingRef:"mi_package_second",
        returnContext
      });
      renderAcademyKakashiV236030();
      return{out,config:currentBattle?.kakashiV2?.battleConfigId||null,enemy:getBattleDeploymentParticipant("enemy",1)?.id||null};
    });
    assert(launched.out?.success&&launched.config==="academy_kakashi_origin_battle_seq_mi",JSON.stringify(launched));
    assert.strictEqual(launched.enemy,"academy_kakashi_origin_masked_interceptor");
    await page.waitForSelector(".alpha-code-battle-stage",{state:"visible",timeout:12000});

    // Current UI authority: Formation Stage, not the legacy four-family shell.
    const formationOpening=await page.evaluate(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const row=stage?.querySelector(".battle-live-action-family-row");
      const primary=[...row.querySelectorAll("button")];
      const withdraw=stage?.querySelector(".battle2-formation-withdraw");
      const active=[...stage.querySelectorAll(".battle-live-active-card-player,.battle-live-active-card-enemy")];
      const visibleSupport=[...stage.querySelectorAll(".battle2-formation-support")].filter(n=>getComputedStyle(n).display!=="none");
      return{
        formationStage:stage?.dataset.formationStage,
        mode:stage?.dataset.formationMode,
        playerCount:stage?.dataset.playerFormationCount,
        enemyCount:stage?.dataset.enemyFormationCount,
        tray:stage?.dataset.formationTray,
        primaryCount:primary.length,
        primaryLabels:primary.map(b=>b.textContent.trim()),
        primaryDataset:row?.dataset.primaryFamilies||"",
        withdrawOutsideDock:!!withdraw&&withdraw.parentElement===stage&&!row.contains(withdraw),
        withdrawHandler:withdraw?.getAttribute("onclick")||"",
        activeCount:active.length,
        activePortraits:active.map(n=>({side:n.dataset.side,path:n.querySelector("img")?.getAttribute("src")||"",formationPortrait:n.querySelector("img")?.dataset.formationPortrait||null})),
        visibleSupportCount:visibleSupport.length
      };
    });
    assert.strictEqual(formationOpening.formationStage,"true");
    assert.strictEqual(formationOpening.mode,"duel","#312 1v1 must use Formation Stage duel composition");
    assert.strictEqual(formationOpening.playerCount,"1");
    assert.strictEqual(formationOpening.enemyCount,"1");
    assert.strictEqual(formationOpening.tray,"closed","#312 Formation Stage should open on battlefield, not a permanent inspector/tray");
    assert.strictEqual(formationOpening.primaryCount,3,"#312 primary Battle dock must contain exactly three families");
    assert.deepStrictEqual(formationOpening.primaryLabels,["SKILLS","ITEMS","SUMMONS"],"#312 primary Battle dock taxonomy drift");
    assert.strictEqual(formationOpening.primaryDataset,"SKILLS|ITEMS|SUMMONS");
    assert.strictEqual(formationOpening.withdrawOutsideDock,true,"#312 WITHDRAW must remain available without becoming a fourth primary family");
    assert(formationOpening.withdrawHandler.includes("invokeBattleWithdrawAction"),"#312 WITHDRAW semantic API was disconnected");
    assert.strictEqual(formationOpening.activeCount,2);
    assert(formationOpening.activePortraits.every(row=>row.path),"#312 Formation Stage active combatant portrait authority missing: "+JSON.stringify(formationOpening.activePortraits));
    assert.strictEqual(formationOpening.visibleSupportCount,0,"#312 duel composition retained empty/support formation furniture");

    // Manual reward blocker: prove the exact authoritative MI package reaches
    // the Victory renderer, not only the reward adapter's internal state.
    const rewardProjection=await page.evaluate(()=>{
      const priorOutcome=currentBattle.outcome?cloneBattleRuntimeValue(currentBattle.outcome):null;
      const priorRewards=currentBattle.rewards?cloneBattleRuntimeValue(currentBattle.rewards):null;
      currentBattle.outcome={type:"victory",completedAt:Date.now(),finishingShinobiId:"academy_kakashi"};
      const ensured=ensureAcademyKakashiV2BattleRewardProjection36015();
      const host=document.createElement("div");
      host.style.position="fixed";host.style.left="-10000px";host.style.top="0";
      document.body.appendChild(host);
      renderVictoryOverlay(host);
      const text=String(host.textContent||"").replace(/\s+/g," ").trim();
      const projected=cloneBattleRuntimeValue(currentBattle.rewards);
      host.remove();
      currentBattle.outcome=priorOutcome;
      currentBattle.rewards=priorRewards;
      return{ensured,projected,text};
    });
    assert.strictEqual(rewardProjection.projected.ryo,50,"#312 MI Victory must project locked 50 Ryō");
    assert.strictEqual(rewardProjection.projected.exp,0,"#312 must not invent generic Character EXP");
    assert.deepStrictEqual(rewardProjection.projected.items.map(row=>row.name),["Field Recovery Pill"],"#312 MI Victory item projection drift");
    assert(rewardProjection.text.includes("50")&&rewardProjection.text.includes("Field Recovery Pill"),"#312 Victory UI did not visibly consume authoritative MI rewards: "+rewardProjection.text);

    await page.locator('.battle-live-action-family-row button[data-formation-family="skills"]').click();
    await page.waitForFunction(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const deck=stage&&stage.querySelector(".battle-live-skill-deck");
      return stage?.dataset.formationTray==="skills"&&!!deck&&getComputedStyle(deck).display!=="none";
    },null,{timeout:3000});
    const skillTray=await page.evaluate(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage"),deck=stage.querySelector(".battle-live-skill-deck"),details=stage.querySelector(".battle-live-skill-details");
      const sr=stage.getBoundingClientRect(),dr=deck.getBoundingClientRect(),ir=details?.getBoundingClientRect();
      return{
        tray:stage.dataset.formationTray,
        deck:{left:dr.left-sr.left,top:dr.top-sr.top,width:dr.width,height:dr.height},
        inspector:ir?{left:ir.left-sr.left,top:ir.top-sr.top,width:ir.width,height:ir.height}:null,
        stageHeight:sr.height
      };
    });
    assert.strictEqual(skillTray.tray,"skills");
    assert(skillTray.deck.top>skillTray.stageHeight*.62,"#312 Skill tray is consuming the central confrontation lane: "+JSON.stringify(skillTray));
    await page.locator('.battle-live-action-family-row button[data-formation-family="skills"]').click();
    await page.waitForFunction(()=>document.querySelector(".alpha-code-battle-stage")?.dataset.formationTray==="closed",null,{timeout:3000});

    const seed=async(kind)=>page.evaluate(kind=>{
      const runtime=ensureBattleRuntimeState(),battleId=currentBattle.battleId;
      const actorPlayer={side:"player",participantId:"academy_kakashi"};
      const actorEnemy={side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"};
      const push=def=>recordBattleEvidence(def);
      if(kind==="substitution"){
        const actionId="issue312_substitution";
        push({eventType:"action_attempted",actionId,actorRef:actorEnemy,targetRef:actorPlayer,skillId:"enemy_decoy_assassin_decoy_substitution",data:{actionClass:"enemy_context_technique"}});
        push({eventType:"enemy_authored_action_completed",committedOccurrence:true,actionId,actorRef:actorEnemy,targetRef:actorPlayer,skillId:"enemy_decoy_assassin_decoy_substitution",data:{resolved:true}});
      }else if(kind==="hit"){
        const actionId="issue312_hit";
        push({eventType:"action_attempted",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{actionClass:"prepared_skill"}});
        push({eventType:"damage_resolved",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{primaryDiscipline:"Taijutsu",finalDamage:7,remainingBattlePLBefore:14,remainingBattlePLAfter:7,flatGuards:[],ratioGuards:[]}});
        push({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_taijutsu",data:{resolved:true,damageApplied:true,finalDamage:7}});
      }else{
        const actionId="issue312_defeat";
        push({eventType:"damage_resolved",actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_finish",data:{primaryDiscipline:"Taijutsu",finalDamage:7,remainingBattlePLBefore:7,remainingBattlePLAfter:0,flatGuards:[],ratioGuards:[]}});
        push({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef:actorPlayer,targetRef:actorEnemy,skillId:"issue312_finish",data:{resolved:true,damageApplied:true,finalDamage:7}});
      }
      openOverlay("combat");
      return{kind,battleId,evidenceCount:runtime.evidence.length};
    },kind);

    await seed("substitution");
    await page.waitForSelector('.battle2-performance-stage[data-result="SUBSTITUTION"]',{state:"visible",timeout:8000});
    const substitution=await page.evaluate(()=>{
      const p=resolveBattlePerformanceProjection33000(),lane=document.querySelector(".battle2-performance-stage"),stage=document.querySelector(".alpha-code-battle-stage");
      const actor=stage?.querySelector(".battle2-performance-role-actor"),target=stage?.querySelector(".battle2-performance-role-target"),center=lane?.querySelector(".battle2-performance-center");
      const chip=stage?.querySelector(".battle2-performance-result-chip");
      const rect=node=>{const r=node?.getBoundingClientRect();return r?{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}:null;};
      const overlaps=(a,b)=>!!a&&!!b&&!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom);
      const actorRect=rect(actor),targetRect=rect(target),centerRect=rect(center),stageRect=rect(stage);
      return{
        p,
        performancePortraits:lane?.querySelectorAll("img").length||0,
        canonicalCards:stage?.querySelectorAll(".battle-live-active-card-player,.battle-live-active-card-enemy").length||0,
        actorRoles:stage?.querySelectorAll(".battle2-performance-role-actor").length||0,
        targetRoles:stage?.querySelectorAll(".battle2-performance-role-target").length||0,
        resultChips:stage?.querySelectorAll(".battle2-performance-result-chip").length||0,
        resultChipOnExactTarget:!!(chip&&target&&chip.parentElement===target),
        performanceActive:stage?.classList.contains("battle2-performance-active")||false,
        centerWidthRatio:centerRect&&stageRect&&stageRect.width?centerRect.width/stageRect.width:null,
        centerOverlapsActor:overlaps(centerRect,actorRect),
        centerOverlapsTarget:overlaps(centerRect,targetRect)
      };
    });
    assert.strictEqual(substitution.p.result,"SUBSTITUTION");
    assert.strictEqual(substitution.p.finalDamage,0);
    assert.strictEqual(substitution.p.exactTarget,true);
    assert.strictEqual(substitution.performancePortraits,0,"#312 performance layer duplicated Battle portraits");
    assert.strictEqual(substitution.canonicalCards,2,"#312 canonical current actor/opponent hierarchy missing");
    assert.strictEqual(substitution.actorRoles,1,"#312 committed actor was not promoted on canonical Battle card");
    assert.strictEqual(substitution.targetRoles,1,"#312 exact target was not promoted on canonical Battle card");
    assert.strictEqual(substitution.resultChips,1,"#312 factual result feedback must have one participant-local receipt");
    assert.strictEqual(substitution.resultChipOnExactTarget,true,"#312 result receipt is not attached to the exact target");
    assert.strictEqual(substitution.performanceActive,true,"#312 canonical Battle performance phase not active");
    assert(substitution.centerWidthRatio!==null&&substitution.centerWidthRatio<=0.14,"#312 action label still occupies too much battlefield center: "+substitution.centerWidthRatio);
    assert.strictEqual(substitution.centerOverlapsActor,false,"#312 compact action label overlaps promoted actor");
    assert.strictEqual(substitution.centerOverlapsTarget,false,"#312 compact action label overlaps promoted target");
    const battlePaint=await page.evaluate(()=>{
      const selectors=[
        "#story-scene-presentation-layer","#screen-overlay",".overlay-content-box","#overlay-content-container",
        ".battle-live-screen",".alpha-code-battle-stage",".battle2-performance-host",
        ".battle2-performance-stage",".battle-live-active-card-player",".battle-live-active-card-enemy"
      ];
      const describe=selector=>{
        const node=document.querySelector(selector);
        if(!node)return{selector,missing:true};
        const cs=getComputedStyle(node),r=node.getBoundingClientRect();
        return{
          selector,tag:node.tagName,className:node.className,
          rect:{x:r.x,y:r.y,width:r.width,height:r.height},
          display:cs.display,visibility:cs.visibility,opacity:cs.opacity,zIndex:cs.zIndex,
          backgroundColor:cs.backgroundColor,backgroundImage:cs.backgroundImage,
          transform:cs.transform,filter:cs.filter,overflow:cs.overflow,
          childCount:node.children.length,htmlLength:node.innerHTML.length
        };
      };
      const stage=document.querySelector(".alpha-code-battle-stage");
      const r=stage&&stage.getBoundingClientRect();
      const center=r?{x:r.left+r.width/2,y:r.top+r.height/2}:null;
      const stack=center?document.elementsFromPoint(center.x,center.y).slice(0,12).map(node=>{
        const cs=getComputedStyle(node);
        return{tag:node.tagName,id:node.id,className:node.className,opacity:cs.opacity,display:cs.display,visibility:cs.visibility,zIndex:cs.zIndex,backgroundColor:cs.backgroundColor};
      }):[];
      return{
        currentOverlayType:typeof currentOverlayType!=="undefined"?currentOverlayType:null,
        screenOverlayClass:document.getElementById("screen-overlay")?.className||null,
        screenOverlayInline:document.getElementById("screen-overlay")?.getAttribute("style")||null,
        nodes:selectors.map(describe),center,stack
      };
    });
    console.log("ISSUE312_BATTLE_PAINT_DIAGNOSTIC "+JSON.stringify(battlePaint));
    fs.writeFileSync(path.join(OUT,"battle-paint-diagnostic.json"),JSON.stringify(battlePaint,null,2));
    const storyPaint=battlePaint.nodes.find(row=>row.selector==="#story-scene-presentation-layer");
    const stagePaint=battlePaint.nodes.find(row=>row.selector===".alpha-code-battle-stage");
    assert(storyPaint&&(storyPaint.display==="none"||storyPaint.visibility==="hidden"),"#312 preserved Story layer still occludes Battle: "+JSON.stringify(storyPaint));
    assert(stagePaint&&stagePaint.opacity==="1"&&stagePaint.display!=="none"&&String(stagePaint.backgroundImage).includes("gradient"),"#312 Battle stage paint contract failed: "+JSON.stringify(stagePaint));
    assert(!battlePaint.stack.some(row=>row.id==="story-scene-presentation-layer"),"#312 Story layer remains in Battle center hit-test stack: "+JSON.stringify(battlePaint.stack));
    await page.screenshot({path:path.join(OUT,"04-battle-full-page.png"),fullPage:false,timeout:12000});
    await shot(page,"04-battle-overlay.png","#screen-overlay");
    await shot(page,"04-battle-performance-only.png",".battle2-performance-stage");
    await shot(page,"04-battle-substitution-performance.png",".alpha-code-battle-stage");
    await page.waitForTimeout(1050);
    const settledBattle=await page.evaluate(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return{
        active:stage?.classList.contains("battle2-performance-active")||false,
        roles:stage?.querySelectorAll(".battle2-performance-role-actor,.battle2-performance-role-target").length||0,
        resultChips:stage?.querySelectorAll(".battle2-performance-result-chip").length||0,
        actionLabelOpacity:Number(getComputedStyle(stage?.querySelector(".battle2-performance-stage")).opacity||0)
      };
    });
    assert.strictEqual(settledBattle.active,false,"#312 Battle performance did not restore stable composition");
    assert.strictEqual(settledBattle.roles,0,"#312 Battle performance roles leaked after settle");
    assert.strictEqual(settledBattle.resultChips,0,"#312 target-local result receipt leaked after settle");
    assert(settledBattle.actionLabelOpacity<=0.01,"#312 compact action label remained visually persistent after settle");

    await seed("hit");
    await page.waitForSelector('.battle2-performance-stage[data-result="HIT"]',{state:"visible",timeout:8000});
    const hit=await page.evaluate(()=>resolveBattlePerformanceProjection33000());
    assert(hit.result==="HIT"&&hit.finalDamage===7&&hit.beforePL===14&&hit.afterPL===7,JSON.stringify(hit));
    assert(hit.actorRef.participantId==="academy_kakashi"&&hit.targetRef.participantId==="academy_kakashi_origin_masked_interceptor");
    await shot(page,"05-battle-hit-performance.png",".alpha-code-battle-stage");

    await seed("defeat");
    await page.waitForSelector('.battle2-performance-stage[data-result="DEFEAT"]',{state:"visible",timeout:8000});
    const defeat=await page.evaluate(()=>resolveBattlePerformanceProjection33000());
    assert(defeat.result==="DEFEAT"&&defeat.afterPL===0,JSON.stringify(defeat));
    assert(!JSON.stringify(defeat).toLowerCase().includes("death"),"#312 defeat presentation leaked death semantics");
    await shot(page,"06-battle-defeat-performance.png",".alpha-code-battle-stage");

    // FORMATION-STAGE SQUAD PROOF — consume a real authorised Kakashi 2v1
    // deployment rather than fabricating production roster truth. This proves
    // the same 33000 owner adapts from duel -> wedge with an actual supporting
    // deployed opponent. The off-slot action receipt below is deliberately a
    // QA-only presentation fixture: it supplies exact canonical participant refs
    // to the read-only performance projector and does not resolve damage or
    // mutate Battle PL/Story truth.
    const squadLaunch=await page.evaluate(()=>{
      const rt=getActiveStorySceneRuntime();
      const returnContext={
        type:"story_scene",sceneId:rt.sceneId,sceneInstanceId:rt.instanceId,
        sourceBeatId:"v2_battle_mi_package_second",
        victoryBeatId:"v2_mi_package_second_win",defeatBeatId:"v2_mi_package_second_loss",
        postBattleBeatId:null,exposeFinisher:false
      };
      const out=launchAcademyKakashiV2Battle36010({
        battleConfigId:"academy_kakashi_origin_battle_ps_mi_2v1",
        storyOccurrenceId:"issue312_browser_formation_2v1",
        sourceAnchorRef:"ISSUE312_FORMATION_STAGE",
        bindingRef:"ps_mi_2v1",
        returnContext
      });
      return{
        out,
        playerIds:[1,2,3,4].map(slot=>getBattleDeploymentParticipant("player",slot)?.id||null).filter(Boolean),
        enemyIds:[1,2,3,4].map(slot=>getBattleDeploymentParticipant("enemy",slot)?.id||null).filter(Boolean)
      };
    });
    assert(squadLaunch.out?.success===true,JSON.stringify(squadLaunch));
    assert.deepStrictEqual(squadLaunch.playerIds,["academy_kakashi"]);
    assert.deepStrictEqual(squadLaunch.enemyIds,["academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
    await page.waitForFunction(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return stage?.dataset.formationMode==="wedge"&&stage?.dataset.enemyFormationCount==="2";
    },null,{timeout:8000});

    const squadOpening=await page.evaluate(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const support=[...stage.querySelectorAll('.battle2-formation-support:not([data-formation-hidden="true"])')];
      const dock=stage.querySelector(".battle-live-action-family-row");
      const rect=node=>{const r=node?.getBoundingClientRect();return r?{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}:null;};
      const overlaps=(a,b)=>!!a&&!!b&&!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom);
      const dockRect=rect(dock);
      return{
        mode:stage.dataset.formationMode,
        playerCount:stage.dataset.playerFormationCount,
        enemyCount:stage.dataset.enemyFormationCount,
        support:support.map(node=>({
          id:node.dataset.participantId,
          side:node.dataset.formationSide,
          slot:node.dataset.formationSlot,
          image:node.querySelector("img")?.getAttribute("src")||"",
          rect:rect(node),
          overlapsDock:overlaps(rect(node),dockRect)
        })),
        primaryFamilies:[...dock.querySelectorAll("button[data-formation-family]")].map(b=>b.textContent.trim())
      };
    });
    assert.strictEqual(squadOpening.mode,"wedge","#312 real 2v1 deployment did not select wedge formation");
    assert.strictEqual(squadOpening.playerCount,"1");
    assert.strictEqual(squadOpening.enemyCount,"2");
    assert.strictEqual(squadOpening.support.length,1,"#312 2v1 wedge must show exactly one deployed supporting opponent: "+JSON.stringify(squadOpening));
    assert.strictEqual(squadOpening.support[0].id,"academy_kakashi_origin_masked_interceptor");
    assert.strictEqual(squadOpening.support[0].side,"enemy");
    assert.strictEqual(squadOpening.support[0].slot,"2");
    assert(squadOpening.support[0].image,"#312 deployed support is missing portrait authority");
    assert.strictEqual(squadOpening.support[0].overlapsDock,false,"#312 deployed support collides with primary action dock");
    assert.deepStrictEqual(squadOpening.primaryFamilies,["SKILLS","ITEMS","SUMMONS"]);
    await shot(page,"07-battle-formation-wedge-2v1.png",".alpha-code-battle-stage");

    const offSlotFixture=await page.evaluate(()=>{
      const actorRef={side:"player",participantId:"academy_kakashi"};
      const targetRef={side:"enemy",participantId:"academy_kakashi_origin_masked_interceptor"};
      const actionId="issue312_qa_offslot_target";
      recordBattleEvidence({eventType:"action_attempted",actionId,actorRef,targetRef,skillId:"issue312_qa_exact_target",data:{actionClass:"qa_presentation_fixture"}});
      recordBattleEvidence({eventType:"damage_resolved",actionId,actorRef,targetRef,skillId:"issue312_qa_exact_target",data:{primaryDiscipline:"Taijutsu",finalDamage:1,remainingBattlePLBefore:14,remainingBattlePLAfter:13,flatGuards:[],ratioGuards:[],qaPresentationFixture:true}});
      recordBattleEvidence({eventType:"skill_action_completed",committedOccurrence:true,actionId,actorRef,targetRef,skillId:"issue312_qa_exact_target",data:{resolved:true,damageApplied:true,finalDamage:1,qaPresentationFixture:true}});
      openOverlay("combat");
      return resolveBattlePerformanceProjection33000();
    });
    assert.strictEqual(offSlotFixture.targetRef.participantId,"academy_kakashi_origin_masked_interceptor");
    await page.waitForFunction(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const support=[...stage.querySelectorAll(".battle2-formation-support")].find(n=>n.dataset.participantId==="academy_kakashi_origin_masked_interceptor");
      return !!support&&support.classList.contains("battle2-performance-role-target");
    },null,{timeout:3000});
    const offSlotFocus=await page.evaluate(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const activeEnemy=stage.querySelector(".battle-live-active-card-enemy");
      const target=[...stage.querySelectorAll(".battle2-formation-support")].find(n=>n.dataset.participantId==="academy_kakashi_origin_masked_interceptor");
      const chip=target?.querySelector(".battle2-performance-result-chip");
      return{
        activeEnemyId:activeEnemy?.dataset.participantId||null,
        targetId:target?.dataset.participantId||null,
        targetRole:target?.classList.contains("battle2-performance-role-target")||false,
        chipLocal:!!chip&&chip.parentElement===target
      };
    });
    assert.strictEqual(offSlotFocus.activeEnemyId,"academy_kakashi_origin_package_smuggler","#312 2v1 front opposition identity drift");
    assert.strictEqual(offSlotFocus.targetId,"academy_kakashi_origin_masked_interceptor");
    assert.strictEqual(offSlotFocus.targetRole,true,"#312 exact off-slot target did not enter confrontation focus");
    assert.strictEqual(offSlotFocus.chipLocal,true,"#312 off-slot result feedback did not stay participant-local");
    await shot(page,"08-battle-formation-offslot-target.png",".alpha-code-battle-stage");

    // MANUAL RED REGRESSION — exact Stephen repro:
    // Kakashi -> SKILLS -> second prepared Skill (Clone Feint) -> USE SKILL
    // -> exactly one authored AMT response -> player control returns -> SKILLS reopens.
    const amtLifecycleLaunch=await page.evaluate(()=>{
      const rt=getActiveStorySceneRuntime();
      const returnContext={
        type:"story_scene",sceneId:rt.sceneId,sceneInstanceId:rt.instanceId,
        sourceBeatId:"v2_battle_amt_stop",
        victoryBeatId:"v2_amt_stop_win",defeatBeatId:"v2_amt_stop_loss",
        postBattleBeatId:null,exposeFinisher:false
      };
      const beforeEnemyTurns=globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400&&
        typeof globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.getEnemyTurnsScheduled==="function"
          ?globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.getEnemyTurnsScheduled():null;
      const out=launchAcademyKakashiV2Battle36010({
        battleConfigId:"academy_kakashi_origin_battle_amt_1v1",
        storyOccurrenceId:"issue312_manual_red_regression",
        sourceAnchorRef:"ISSUE312_MANUAL_RED",
        bindingRef:"amt_second_skill_lifecycle",
        returnContext
      });
      return{
        out,
        beforeEnemyTurns,
        schedulerBefore:typeof evaluateEnemyActionScheduler==="function"?evaluateEnemyActionScheduler():null,
        playerOpportunityBefore:getBattleActionOpportunityIndex("player","academy_kakashi"),
        enemyOpportunityBefore:getBattleActionOpportunityIndex("enemy","academy_kakashi_origin_amt")
      };
    });
    assert(amtLifecycleLaunch.out?.success===true,JSON.stringify(amtLifecycleLaunch));
    assert.strictEqual(amtLifecycleLaunch.schedulerBefore?.ready,true,"#312 AMT scheduler must be ready before the player action: "+JSON.stringify(amtLifecycleLaunch));

    await page.waitForFunction(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return stage?.dataset.formationMode==="duel"&&stage?.dataset.enemyFormationCount==="1";
    },null,{timeout:8000});

    const amtSkillsButton=page.locator('.battle-live-action-family-row button[data-formation-family="skills"]');
    await amtSkillsButton.click();
    await page.waitForFunction(()=>document.querySelector(".alpha-code-battle-stage")?.dataset.formationTray==="skills",null,{timeout:3000});

    const amtPreparedIds=await page.evaluate(()=>[...document.querySelectorAll(".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)")].map(node=>node.dataset.skillId||null));
    assert.strictEqual(amtPreparedIds[1],"academy_kakashi_clone_feint","#312 Stephen repro no longer addresses Kakashi's second prepared Skill: "+JSON.stringify(amtPreparedIds));

    const secondSkill=page.locator(".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)").nth(1);
    await secondSkill.click();
    await page.waitForFunction(()=>syncBattleActionRegionState()?.selectedSkillId==="academy_kakashi_clone_feint",null,{timeout:3000});
    const selectedControls=await page.evaluate(()=>({
      use:document.querySelectorAll(".alpha-code-battle-stage .battle-live-use-skill").length,
      cancel:document.querySelectorAll(".alpha-code-battle-stage .battle-live-cancel-skill").length,
      selected:syncBattleActionRegionState()?.selectedSkillId||null
    }));
    assert.strictEqual(selectedControls.use,1,"#312 selected Skill lost its canonical USE control after rerender: "+JSON.stringify(selectedControls));
    assert.strictEqual(selectedControls.cancel,1,"#312 selected Skill lost its canonical CANCEL control after rerender: "+JSON.stringify(selectedControls));
    await page.locator(".battle-live-use-skill").click();

    await page.waitForFunction(()=>{
      const battleId=currentBattle?.battleId;
      const rows=ensureBattleRuntimeState()?.evidence||[];
      return rows.some(row=>row&&row.battleId===battleId&&row.eventType==="enemy_authored_action_completed"&&row.actorRef?.participantId==="academy_kakashi_origin_amt");
    },null,{timeout:5000});

    const amtLifecycleAfterFirst=await page.evaluate(beforeEnemyTurns=>{
      const battleId=currentBattle.battleId;
      const rows=(ensureBattleRuntimeState().evidence||[]).filter(row=>row&&row.battleId===battleId);
      const playerCompletions=rows.filter(row=>row.eventType==="skill_action_completed"&&row.actorRef?.participantId==="academy_kakashi");
      const enemyCompletions=rows.filter(row=>row.eventType==="enemy_authored_action_completed"&&row.actorRef?.participantId==="academy_kakashi_origin_amt");
      const afterEnemyTurns=globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400&&
        typeof globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.getEnemyTurnsScheduled==="function"
          ?globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400.getEnemyTurnsScheduled():null;
      const state=syncBattleActionRegionState();
      const stage=document.querySelector(".alpha-code-battle-stage");
      return{
        playerCompletions:playerCompletions.map(row=>({actionId:row.actionId,skillId:row.skillId,resolved:row.data?.resolved})),
        enemyCompletions:enemyCompletions.map(row=>({actionId:row.actionId,skillId:row.skillId,resolved:row.data?.resolved})),
        enemyTurnDelta:beforeEnemyTurns===null||afterEnemyTurns===null?null:afterEnemyTurns-beforeEnemyTurns,
        playerOpportunity:getBattleActionOpportunityIndex("player","academy_kakashi"),
        enemyOpportunity:getBattleActionOpportunityIndex("enemy","academy_kakashi_origin_amt"),
        selectedSkillId:state.selectedSkillId,
        selectedTargetRef:state.selectedTargetRef,
        tray:stage?.dataset.formationTray||null,
        schedulerAfter:evaluateEnemyActionScheduler(),
        amtConditions:getBattleParticipantConditions("player","academy_kakashi").map(row=>({key:row.conditionKey,id:row.conditionId}))
      };
    },amtLifecycleLaunch.beforeEnemyTurns);
    console.log("ISSUE312_AMT_LIFECYCLE_AFTER_FIRST "+JSON.stringify(amtLifecycleAfterFirst));
    assert.strictEqual(amtLifecycleAfterFirst.playerCompletions.length,1,"#312 player opportunity committed more or less than once: "+JSON.stringify(amtLifecycleAfterFirst));
    assert.strictEqual(amtLifecycleAfterFirst.playerCompletions[0].skillId,"academy_kakashi_clone_feint");
    assert.strictEqual(amtLifecycleAfterFirst.enemyCompletions.length,1,"#312 AMT must perform exactly one authored response: "+JSON.stringify(amtLifecycleAfterFirst));
    assert.strictEqual(amtLifecycleAfterFirst.enemyCompletions[0].skillId,"enemy_anbu_style_operative_wire_capture","#312 AMT first response drifted from deterministic Wire Capture");
    assert.strictEqual(amtLifecycleAfterFirst.enemyCompletions[0].resolved,true,"#312 AMT authored response did not resolve");
    assert.strictEqual(amtLifecycleAfterFirst.enemyTurnDelta,1,"#312 browser enemy-turn bridge did not schedule exactly one AMT opportunity");
    assert.strictEqual(amtLifecycleAfterFirst.playerOpportunity,amtLifecycleLaunch.playerOpportunityBefore+1,"#312 player opportunity did not advance exactly once");
    assert.strictEqual(amtLifecycleAfterFirst.enemyOpportunity,amtLifecycleLaunch.enemyOpportunityBefore+1,"#312 enemy opportunity did not advance exactly once");
    assert.strictEqual(amtLifecycleAfterFirst.selectedSkillId,null,"#312 successful Skill selection survived semantic resolution");
    assert.strictEqual(amtLifecycleAfterFirst.selectedTargetRef,null,"#312 successful Skill target survived semantic resolution");

    await amtSkillsButton.click();
    await page.waitForFunction(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const deck=stage?.querySelector(".battle-live-skill-deck");
      return stage?.dataset.formationTray==="skills"&&!!deck&&getComputedStyle(deck).display!=="none";
    },null,{timeout:3000});
    const amtReopened=await page.evaluate(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      const state=syncBattleActionRegionState();
      const cards=[...stage.querySelectorAll(".battle-live-skill-deck .battle-dev-skill-card:not(.is-empty)")];
      return{
        tray:stage.dataset.formationTray,
        selectedSkillId:state.selectedSkillId,
        readySkillIds:cards.filter(node=>!node.disabled).map(node=>node.dataset.skillId||null)
      };
    });
    assert.strictEqual(amtReopened.tray,"skills","#312 SKILLS tray did not reopen after AMT response");
    assert.strictEqual(amtReopened.selectedSkillId,null,"#312 stale selected Skill blocks the returned player opportunity");
    assert(amtReopened.readySkillIds.length>0,"#312 no legal Skill remains selectable after AMT response: "+JSON.stringify(amtReopened));

    const nextReadyId=amtReopened.readySkillIds[0];
    await page.locator('.battle-live-skill-deck .battle-dev-skill-card[data-skill-id="'+nextReadyId+'"]').click();
    await page.waitForFunction(id=>syncBattleActionRegionState()?.selectedSkillId===id,nextReadyId,{timeout:3000});
    const amtSecondSelection=await page.evaluate(()=>({
      selectedSkillId:syncBattleActionRegionState().selectedSkillId,
      targetRef:syncBattleActionRegionState().selectedTargetRef
    }));
    assert.strictEqual(amtSecondSelection.selectedSkillId,nextReadyId,"#312 another legal player Skill could not be selected after enemy resolution");

    await page.locator(".battle-live-use-skill").click();
    await page.waitForFunction(()=>{
      const battleId=currentBattle?.battleId;
      const rows=(ensureBattleRuntimeState()?.evidence||[]).filter(row=>row&&row.battleId===battleId);
      return rows.filter(row=>row.eventType==="enemy_authored_action_completed"&&row.actorRef?.participantId==="academy_kakashi_origin_amt").length>=2;
    },null,{timeout:5000});

    const amtLifecycleAfterSecond=await page.evaluate(()=>{
      const battleId=currentBattle.battleId;
      const rows=(ensureBattleRuntimeState().evidence||[]).filter(row=>row&&row.battleId===battleId);
      const playerCompletions=rows.filter(row=>row.eventType==="skill_action_completed"&&row.actorRef?.participantId==="academy_kakashi");
      const enemyCompletions=rows.filter(row=>row.eventType==="enemy_authored_action_completed"&&row.actorRef?.participantId==="academy_kakashi_origin_amt");
      const scheduler=evaluateEnemyActionScheduler();
      return{
        playerCompletions:playerCompletions.map(row=>({skillId:row.skillId,resolved:row.data?.resolved})),
        enemyCompletions:enemyCompletions.map(row=>({skillId:row.skillId,resolved:row.data?.resolved})),
        playerOpportunity:getBattleActionOpportunityIndex("player","academy_kakashi"),
        enemyOpportunity:getBattleActionOpportunityIndex("enemy","academy_kakashi_origin_amt"),
        schedulerReady:scheduler?.ready===true,
        schedulerEligibleIds:(scheduler?.eligibleActionIds||[]).slice()
      };
    });
    console.log("ISSUE312_AMT_LIFECYCLE_AFTER_SECOND "+JSON.stringify(amtLifecycleAfterSecond));
    assert.strictEqual(amtLifecycleAfterSecond.playerCompletions.length,2,"#312 second player opportunity did not commit exactly once: "+JSON.stringify(amtLifecycleAfterSecond));
    assert.strictEqual(amtLifecycleAfterSecond.enemyCompletions.length,2,"#312 second player opportunity did not receive exactly one AMT response: "+JSON.stringify(amtLifecycleAfterSecond));
    assert.strictEqual(amtLifecycleAfterSecond.enemyCompletions[1].skillId,"enemy_anbu_style_operative_tanto_flash","#312 AMT must follow Wire with Tantō Flash under the authorised deterministic rhythm");
    assert.strictEqual(amtLifecycleAfterSecond.enemyCompletions[1].resolved,true,"#312 AMT Tantō response did not resolve");
    assert.strictEqual(amtLifecycleAfterSecond.playerOpportunity,amtLifecycleLaunch.playerOpportunityBefore+2,"#312 player lifecycle stalled after the second committed action");
    assert.strictEqual(amtLifecycleAfterSecond.enemyOpportunity,amtLifecycleLaunch.enemyOpportunityBefore+2,"#312 enemy lifecycle stalled after the second response");
    assert.strictEqual(amtLifecycleAfterSecond.schedulerReady,true,"#312 AMT scheduler deadlocked after Wire -> Tantō");
    assert(amtLifecycleAfterSecond.schedulerEligibleIds.includes("enemy_anbu_style_operative_silent_body_flicker"),"#312 AMT Body Flicker is not available after Tantō: "+JSON.stringify(amtLifecycleAfterSecond));

    await amtSkillsButton.click();
    await page.waitForFunction(()=>{
      const stage=document.querySelector(".alpha-code-battle-stage");
      return stage?.dataset.formationTray==="skills"&&!!stage.querySelector(".battle-live-skill-deck");
    },null,{timeout:3000});

    const errors=await runtimeErrorGate.assertClean("issue312_story_battle_benchmark");
    const result={
      pass:true,
      issue:312,
      story:{rooftop,watch,stopEntryPhase,stop,semanticChoiceElapsedMs:elapsed},
      battle:{config:launched.config,substitution:substitution.p,settledBattle,hit,defeat,squadOpening,offSlotFixture,offSlotFocus},
      browserErrors:errors,
      sourceHeadlessGreenClaimed:false,
      automatedBrowserGreen:true,
      manualBrowserValidated:false,
      browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"results.json"),JSON.stringify(result,null,2));
    console.log(JSON.stringify(result,null,2));
  }finally{
    await context.close();await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
