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
  const button=root.locator(".sc-chronicle-primary").first();
  if(await button.count()&&await button.isVisible())await button.click();
  else{
    const stage=root.locator(".sc-chronicle-stage,.sc-story-stage").first();
    await stage.waitFor({state:"visible",timeout:8000});
    await stage.click({position:{x:30,y:30}});
  }
  await waitForStoryMotionToSettle(page);
}

async function progressStoryToBeat(page,targetBeatId){
  const visited=[];
  for(let step=0;step<120;step+=1){
    const state=await page.evaluate(()=>({
      sceneId:getActiveStorySceneRuntime()?.sceneId||null,
      beatId:getActiveStorySceneRuntime()?.beatId||null,
      text:document.querySelector("#story-scene-presentation-layer .sc-story-text")?.textContent?.trim()||""
    }));
    visited.push({beatId:state.beatId,text:state.text});
    if(state.beatId===targetBeatId)return visited;
    assert.strictEqual(state.sceneId,SCENE,"Story left Menma Origin before Scene 7: "+JSON.stringify(state));
    await clickStoryPrimary(page);
  }
  throw new Error("Menma Story did not reach "+targetBeatId+" through visible Story controls: "+JSON.stringify(visited.slice(-12)));
}

async function launchBattleFromStoryUI(page){
  for(let step=0;step<20;step+=1){
    const state=await page.evaluate(()=>({
      beatId:getActiveStorySceneRuntime()?.beatId||null,
      battleActive:currentBattle?.active===true,
      encounterId:currentBattle?.encounterId||null
    }));
    if(state.battleActive&&state.encounterId===ENCOUNTER)return true;
    assert.strictEqual(state.beatId,"tutorial_battle","Story left tutorial_battle before Battle bootstrap: "+JSON.stringify(state));
    await clickStoryPrimary(page);
  }
  return false;
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
    const portrait=(side,id)=>{
      const participant=getBattleParticipantByIdentity(side,id);
      const projection=side==="player"?resolveUIPortraitProjection(participant):resolveBattleEnemyPortraitProjection(participant);
      return projection?.path||"";
    };
    return{
      authorityPortraits:{
        menma:portrait("player","academy_menma"),anko:portrait("player","sj_anko"),
        altered:portrait("enemy","test_subject_altered_shinobi"),
        brute:portrait("enemy","test_subject_brute"),unstable:portrait("enemy","test_subject_unstable")
      },
      environment:stage?.dataset.battleEnvironment||null,
      proof:stage?.dataset.evolvedPlProof||null,
      background:stage?getComputedStyle(stage).backgroundImage:"",
      playerCount:Number(stage?.dataset.playerFormationCount||0),
      enemyCount:Number(stage?.dataset.enemyFormationCount||0),
      activePlayerId:currentBattle&&getBattleDeploymentParticipant("player",1)?.id||null,
      activeEnemyId:currentBattle&&getBattleDeploymentParticipant("enemy",1)?.id||null,
      activePlayerSrc:img(".battle-live-active-card-player .battle-live-active-card-image"),
      activeEnemySrc:img(".battle-live-active-card-enemy .battle-live-active-card-image"),
      activePlayerDomName:stage?.querySelector(".battle-live-active-card-player .battle-live-active-nameplate")?.textContent?.trim()||"",
      activeEnemyDomName:stage?.querySelector(".battle-live-active-card-enemy .battle-live-active-nameplate")?.textContent?.trim()||"",
      activePlayerExpectedName:getBattleDeploymentParticipant("player",1)?.displayName||getBattleDeploymentParticipant("player",1)?.name||"",
      activeEnemyExpectedName:getBattleDeploymentParticipant("enemy",1)?.displayName||getBattleDeploymentParticipant("enemy",1)?.name||"",
      playerDomPL:Number(stage?.querySelector(".battle-live-power-player strong")?.textContent||NaN),
      enemyDomPL:Number(stage?.querySelector(".battle-live-power-enemy strong")?.textContent||NaN),
      playerExpectedPL:Number(getBattleRemainingPL("player",getBattleDeploymentParticipant("player",1)?.id)||0),
      enemyExpectedPL:Number(getBattleRemainingPL("enemy",getBattleDeploymentParticipant("enemy",1)?.id)||0),
      autonomousPhaseText:stage?.querySelector(".battle-live-autonomous-phase")?.innerText?.replace(/\s+/g," ").trim()||"",
      skillDeckText:stage?.querySelector(".battle-live-skill-deck")?.innerText?.replace(/\s+/g," ").trim()||"",
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
        actionText:stage?.querySelector(".battle2-performance-center strong")?.textContent?.trim()||"",
        damage:Number(stage?.dataset.presentationDamage||0),
        beforePL:stage?.dataset.presentationBeforePl===""?null:Number(stage?.dataset.presentationBeforePl),
        afterPL:stage?.dataset.presentationAfterPl===""?null:Number(stage?.dataset.presentationAfterPl),
        resultText:stage?.querySelector(".battle2-performance-result-chip")?.innerText?.replace(/\s+/g," ").trim()||""
      },
      transition:currentBattle?.deployment?.lastTransition?JSON.parse(JSON.stringify(currentBattle.deployment.lastTransition)):null,
      lastFormationTransitionId:stage?.dataset.lastFormationTransitionId||null
    };
  });
}


async function waitForPresentationIdle(page){
  await page.waitForFunction(()=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    return !!stage&&stage.dataset.presentationQueueBusy!=="true";
  },null,{timeout:15000});
}

async function waitForTutorialBeat(page,beatId){
  const modal=page.locator('.sc-pl-battle-tutorial-38500[data-tutorial-beat="'+beatId+'"]').first();
  await modal.waitFor({state:"visible",timeout:12000});
  const state=await page.evaluate(()=>typeof globalThis.getPLBattleTutorialState38500==="function"?globalThis.getPLBattleTutorialState38500():null);
  assert(state&&state.currentBeatId===beatId,"tutorial state/presentation mismatch for "+beatId+" "+JSON.stringify(state));
  return modal;
}

async function acknowledgeTutorialBeat(page,beatId){
  const modal=await waitForTutorialBeat(page,beatId);
  const button=modal.locator('button[data-tutorial-action="continue"]').first();
  await button.click();
  await page.waitForFunction(id=>!document.querySelector('.sc-pl-battle-tutorial-38500[data-tutorial-beat="'+id+'"]'),beatId,{timeout:8000});
}

async function acknowledgeTutorialSequence(page,beatIds){
  for(const beatId of beatIds)await acknowledgeTutorialBeat(page,beatId);
}

async function openSkillsTray(page){
  const stage=page.locator(".alpha-code-battle-stage");
  const button=stage.locator('button[data-formation-family="skills"]').first();
  await button.waitFor({state:"visible",timeout:10000});
  const tray=stage.locator(".battle-live-skill-deck");
  if(await tray.count()===0||!(await tray.isVisible().catch(()=>false))){
    await button.click();
  }
  await stage.locator(".battle-live-skill-deck").waitFor({state:"visible",timeout:10000});
}

async function useVisibleSkill(page,skillId,displayName){
  await openSkillsTray(page);
  const stage=page.locator(".alpha-code-battle-stage");
  let card=stage.locator('.battle-live-skill-deck .battle-dev-skill-card[data-skill-id="'+skillId+'"]').first();
  if(await card.count()===0){
    card=stage.locator(".battle-live-skill-deck .battle-dev-skill-card",{hasText:displayName}).first();
  }
  await card.waitFor({state:"visible",timeout:10000});

  // Alpha Browser Polish #32700 is the installed player interaction contract:
  // a legal non-branch Skill card click commits through
  // activateBattlePreparedSkillCard -> select -> confirm. There is deliberately
  // no separate USE SKILL button. Exercise the exact visible production path.
  const onclick=await card.getAttribute("onclick");
  assert(onclick&&onclick.includes("activateBattlePreparedSkillCard"),"Skill card is not using the installed direct-click commit path: "+String(onclick));
  await card.click();
}

async function waitForActionPresentation(page,{actor,target,label,afterOrdinal=0}){
  const handle=await page.waitForFunction(({actor,target,label,afterOrdinal})=>{
    const stage=document.querySelector(".alpha-code-battle-stage");
    if(!stage||
      stage.dataset.presentationActorId!==actor||
      stage.dataset.presentationTargetId!==target||
      stage.dataset.presentationQueueBusy!=="true"||
      Number(stage.dataset.presentationSequenceOrdinal||0)<=afterOrdinal)return false;
    const actionText=stage.querySelector(".battle2-performance-center strong")?.textContent?.trim()||"";
    if(label&&actionText!==label)return false;
    return{
      ordinal:Number(stage.dataset.presentationSequenceOrdinal||0),
      actor:stage.dataset.presentationActorId||null,
      target:stage.dataset.presentationTargetId||null,
      role:stage.dataset.presentationActionRole||null,
      actionText,
      actorNodes:stage.querySelectorAll(".battle2-performance-role-actor").length,
      targetNodes:stage.querySelectorAll(".battle2-performance-role-target").length,
      damage:Number(stage.dataset.presentationDamage||0),
      beforePL:stage.dataset.presentationBeforePl===""?null:Number(stage.dataset.presentationBeforePl),
      afterPL:stage.dataset.presentationAfterPl===""?null:Number(stage.dataset.presentationAfterPl),
      resultText:stage.querySelector(".battle2-performance-result-chip")?.innerText?.replace(/\s+/g," ").trim()||""
    };
  },{actor,target,label,afterOrdinal},{timeout:15000});
  return handle.jsonValue();
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

  const descriptionCoverage=await page.evaluate(()=>{
    const banned=/\b(authored|resolver|predicate|stateKey|semanticClass|informationBoundary|categorical evidence|transient state|scalar|packet|action opportunity|committed occurrence|caller-defined|source-owned)\b/i;
    const samples=[
      {id:"qa_direct",displayName:"Direct",resolutionKind:"direct_damage",authoredAttackPL:8},
      {id:"qa_area",displayName:"Area",resolutionKind:"area_damage",authoredAttackPLPerTarget:5,maxTargets:3},
      {id:"qa_guard",displayName:"Guard",resolutionKind:"ratio_guard_state",guard:{preventionRatio:.3,oneUse:true}},
      {id:"qa_recovery",displayName:"Recovery",resolutionKind:"restore_underlying_battle_pl",restorationProfile:{authoredAmount:6}},
      {id:"qa_control",displayName:"Control",resolutionKind:"dynamic_control",blockedActionTraits:["substantial_free_movement"]},
      {id:"qa_setup",displayName:"Setup",resolutionKind:"transient_state",authoredAttackPLBonus:3},
      {id:"qa_movement",displayName:"Movement",resolutionKind:"movement"},
      {id:"qa_sensing",displayName:"Sensing",resolutionKind:"categorical_evidence",senseType:"chakra"},
      {id:"qa_persistent",displayName:"Persistent",resolutionKind:"damage_with_persistent_state",authoredAttackPL:4,persistentEffectDescription:"The target takes 2 ATK at the start of its next turn."},
      {id:"qa_branch",displayName:"Branch",resolutionKind:"branch_damage",modes:[
        {id:"focus",displayName:"Focus",authoredAttackPL:9,maxTargets:1},
        {id:"sweep",displayName:"Sweep",authoredAttackPL:5,maxTargets:3}
      ]},
      {id:"qa_capacity",displayName:"Capacity",resolutionKind:"temporary_battle_capacity",temporaryBattlePL:4}
    ];
    const sampleRows=samples.map(skill=>{
      const info=getBattleSkillYouthSummary33000(skill);
      const copy=[info.summary,...(info.details||[])].join(" ");
      return{id:skill.id,coverage:info.descriptionCoverage||null,copy,banned:banned.test(copy)};
    });
    const paletteRows=[];
    const palettes=typeof PRODUCTION_PREPARED_SKILL_PALETTES!=="undefined"&&PRODUCTION_PREPARED_SKILL_PALETTES
      ?PRODUCTION_PREPARED_SKILL_PALETTES:{};
    if(typeof getClosureWaveBattleSkillDefinition==="function"){
      for(const [owner,ids] of Object.entries(palettes)){
        for(const id of ids||[]){
          const skill=getClosureWaveBattleSkillDefinition(id,owner);
          if(!skill)continue;
          const info=getBattleSkillYouthSummary33000(skill);
          const copy=[info.summary,...(info.details||[])].join(" ");
          paletteRows.push({owner,id,coverage:info.descriptionCoverage||null,copy,banned:banned.test(copy)});
        }
      }
    }
    return{sampleRows,paletteRows};
  });
  assert(descriptionCoverage.sampleRows.every(row=>row.coverage!=="needs_exact_override"&&!row.banned&&row.copy.trim()),"structured Skill description sample failed "+JSON.stringify(descriptionCoverage.sampleRows));
  assert(descriptionCoverage.paletteRows.length>=40,"prepared Skill coverage scan did not see the production Academy palettes");
  assert(descriptionCoverage.paletteRows.every(row=>row.coverage!=="needs_exact_override"&&!row.banned&&row.copy.trim()),"prepared/player-visible Skill reached description coverage failure "+JSON.stringify(descriptionCoverage.paletteRows.filter(row=>row.coverage==="needs_exact_override"||row.banned||!row.copy.trim())));

  // #373 real-player path proof. Onboarding, Story progression and the
  // Scene-7 Battle transition must all be driven through visible DOM controls;
  // no direct runtime selection, beat mutation or Story-advance fixture calls.
  await page.waitForSelector("#sc-alpha-front-door-33400",{state:"visible",timeout:15000});

  // The production NEW-player path deliberately reloads once after REGISTER so
  // stale save/session state cannot survive into the new Chronicle.
  await Promise.all([
    page.waitForNavigation({waitUntil:"domcontentloaded",timeout:30000}),
    page.locator('#sc-alpha-front-door-33400 [data-afd2-action="register"]').click()
  ]);
  await page.waitForFunction(()=>typeof getRuntimeBuildFingerprint==="function"&&typeof runIssue369MenmaEvolvedPLBattleDiagnostics==="function",null,{timeout:30000});
  assert.deepStrictEqual(await page.evaluate(()=>getRuntimeBuildFingerprint()),BUILD_MANIFEST,"#373 post-register runtime fingerprint mismatch");

  await page.waitForSelector("#sc-alpha-front-door-33400",{state:"visible",timeout:15000});
  await page.locator("#afd2-ninja-id").fill("Issue373");
  await page.locator('#sc-alpha-front-door-33400 [data-afd2-action="save-id"]').click();
  await page.locator('#sc-alpha-front-door-33400 [data-village-id="konoha"]').click();
  await page.locator('#sc-alpha-front-door-33400 [data-afd2-action="continue-village"]').click();
  await page.locator('#sc-alpha-front-door-33400 [data-origin-id="academy_menma"]').click();
  await page.locator('#sc-alpha-front-door-33400 [data-afd2-action="continue-ninja"]').click();
  await page.locator('#sc-alpha-front-door-33400 [data-afd2-action="begin-origin"]').click();

  await page.waitForFunction(scene=>getActiveStorySceneRuntime()?.sceneId===scene,SCENE,{timeout:15000});
  await page.waitForSelector("#story-scene-presentation-layer",{state:"visible",timeout:12000});
  const onboarding=await page.evaluate(()=>({
    origin:ensurePlayerAcquisitionState()?.chronicleOriginVariantId||null,
    sceneId:getActiveStorySceneRuntime()?.sceneId||null,
    beatId:getActiveStorySceneRuntime()?.beatId||null
  }));
  assert.strictEqual(onboarding.origin,MENMA,"front-door selection did not commit Academy Menma");
  assert.strictEqual(onboarding.sceneId,SCENE,"front-door confirmation did not launch Menma Origin");

  const visited=await progressStoryToBeat(page,"tutorial_battle");
  assert(visited.length>1,"#373 Story path did not visibly progress through Menma Origin");
  const objective=await page.locator("#story-scene-presentation-layer").innerText();
  assert(objective.includes("Stop the Test Subjects."),"Scene 7 successor objective not visible on real Story path");

  const launched=await launchBattleFromStoryUI(page);
  assert.strictEqual(launched,true,"visible Story Battle control did not bootstrap Scene 7 Battle");
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

    // The real front door intentionally churns portrait previews while the
    // player moves through selection/onboarding. Those aborted preview image
    // requests are not Battle runtime failures. Start the #373 error gate at
    // the actual installed Battle checkpoint so every subsequent event belongs
    // to the surface this proof is validating.
    await gate.reset();

    // Opening formation is player-actionable Guest Ally Anko. Nothing should
    // auto-fire on Battle entry.
    await waitForPresentationIdle(page);
    const opening=await stageSnapshot(page);
    assert.strictEqual(opening.environment,"forest_clearing_day");
    assert.strictEqual(opening.proof,"menma_three_subjects");
    assert(opening.background.includes("forest_clearing_day.png"),"forest backdrop absent");
    assert.strictEqual(opening.playerCount,2);
    assert.strictEqual(opening.enemyCount,3);
    assert.strictEqual(opening.activePlayerId,ANKO);
    assert.strictEqual(opening.activeEnemyId,ALTERED);
    assert(opening.authorityPortraits.anko&&opening.activePlayerSrc===opening.authorityPortraits.anko,"Anko active portrait absent/wrong");
    assert(opening.authorityPortraits.altered&&opening.activeEnemySrc===opening.authorityPortraits.altered,"Altered active portrait absent/wrong");
    assert.strictEqual(opening.activePlayerFrameless,"true");
    assert.strictEqual(opening.activeEnemyFrameless,"true");
    const menmaSupport=opening.playerSupports.find(x=>x.id===MENMA);
    const bruteSupport=opening.enemySupports.find(x=>x.id===BRUTE);
    const unstableSupport=opening.enemySupports.find(x=>x.id===UNSTABLE);
    assert(menmaSupport&&opening.authorityPortraits.menma&&menmaSupport.src===opening.authorityPortraits.menma,"Menma support portrait absent/wrong");
    assert(bruteSupport&&opening.authorityPortraits.brute&&bruteSupport.src===opening.authorityPortraits.brute,"Brute support portrait absent/wrong");
    assert(unstableSupport&&opening.authorityPortraits.unstable&&unstableSupport.src===opening.authorityPortraits.unstable,"Unstable support portrait absent/wrong");

    // First legitimate PL Battle onboarding is part of the real player path.
    // Prove the tutorial teaches the current Active and Anko's temporary
    // player-control relationship before allowing the first Skill choice.
    await acknowledgeTutorialSequence(page,["active_shinobi","guest_ally_control"]);

    await openSkillsTray(page);
    await acknowledgeTutorialBeat(page,"skills_action_dock");
    const ankoDeck=await stageSnapshot(page);
    for(const label of ["Hidden Shadow Snake Hands","Snake Bind","Fire Style: Dragon Flame","Serpent Evasion"]){
      assert(ankoDeck.skillDeckText.includes(label),"Anko Guest Ally palette missing "+label);
    }
    assert(!ankoDeck.skillDeckText.includes("Twin Snakes Mutual Death"),"forbidden Anko Kinjutsu leaked into Origin palette");
    const learnCard=page.locator('.battle-live-skill-deck [data-skill-id="sj_anko_hidden_shadow_snake_hands"]').first();
    const learnPanel=page.locator(".battle-live-skill-details").first();
    await learnCard.hover();
    await page.waitForTimeout(80);
    const learnedBefore=await learnPanel.innerText();
    assert(learnedBefore.includes("Deals 20 ATK to one enemy"),"Anko Skill guide is not using youth-readable exact copy");
    await learnPanel.hover();
    await page.waitForTimeout(220);
    const learnedAfter=await learnPanel.innerText();
    assert.strictEqual(learnedAfter,learnedBefore,"Skill description disappeared while moving from the hovered Skill card into the description panel");
    await page.screenshot({path:path.join(OUT,"01-anko-guest-ally-input.png"),fullPage:false,timeout:12000});

    // The player deliberately chooses the high-damage legal technique. The
    // deterministic numeric result is still Combat authority; only the choice
    // is player-owned.
    await useVisibleSkill(page,"sj_anko_hidden_shadow_snake_hands","Hidden Shadow Snake Hands");
    const ankoAltered=await waitForActionPresentation(page,{actor:ANKO,target:ALTERED,label:"Hidden Shadow Snake Hands"});
    assert.strictEqual(ankoAltered.role,"ACTIVE","player-controlled Guest Ally was presented as scripted/assist");
    assert.strictEqual(ankoAltered.actorNodes,1);
    assert.strictEqual(ankoAltered.targetNodes,1);
    assert.strictEqual(ankoAltered.damage,18,"Anko -> Altered damage readout drift");
    assert.strictEqual(ankoAltered.beforePL,11,"Altered PL-before readout drift");
    assert.strictEqual(ankoAltered.afterPL,0,"Altered PL-after readout drift");
    assert(ankoAltered.resultText.includes("WITHDRAWAL"),"Altered 0 PL did not read as withdrawal");
    assert(ankoAltered.resultText.includes("18 DAMAGE"),"Anko damage counter missing");
    assert(ankoAltered.resultText.includes("PL 11 → 0"),"Altered PL transition missing");
    await page.screenshot({path:path.join(OUT,"02-player-chosen-anko-altered.png"),fullPage:false,timeout:12000});

    // The first damage / 0-PL / relay sequence teaches those concepts exactly
    // once. Presentation remains paused while each explanation is open.
    await acknowledgeTutorialSequence(page,["battle_pl","withdrawal","relay"]);

    // Because Anko/player caused Altered's withdrawal, Brute relays and the
    // enemy side receives the ordinary next opportunity.
    const bruteResponse=await waitForActionPresentation(page,{actor:BRUTE,target:ANKO,afterOrdinal:ankoAltered.ordinal});
    assert.strictEqual(bruteResponse.role,"ACTIVE");
    assert(bruteResponse.ordinal>ankoAltered.ordinal,"Brute response did not follow Anko action");
    await page.screenshot({path:path.join(OUT,"03-brute-response-to-anko.png"),fullPage:false,timeout:12000});
    await waitForPresentationIdle(page);

    await page.waitForFunction(({ANKO,BRUTE})=>
      getBattleDeploymentParticipant("player",1)?.id===ANKO&&
      getBattleDeploymentParticipant("enemy",1)?.id===BRUTE&&
      getMenmaEvolvedPLBattleInputReadiness36900()?.ready===true,
      {ANKO,BRUTE},{timeout:12000});

    const bruteSettled=await stageSnapshot(page);
    assert.strictEqual(bruteSettled.activePlayerId,ANKO);
    assert.strictEqual(bruteSettled.activeEnemyId,BRUTE);
    assert.strictEqual(bruteSettled.activeEnemyDomName,bruteSettled.activeEnemyExpectedName,"Brute relay left stale central enemy identity");
    assert.strictEqual(bruteSettled.enemyDomPL,bruteSettled.enemyExpectedPL,"Brute relay left stale central PL");

    // The player chooses again. Brute legitimately reaches 0, Unstable relays,
    // and the authored teaching handoff yields Anko -> Menma without creating
    // a bonus player turn.
    await useVisibleSkill(page,"sj_anko_fire_style_dragon_flame","Fire Style: Dragon Flame");
    const ankoBrute=await waitForActionPresentation(page,{actor:ANKO,target:BRUTE,label:"Fire Style: Dragon Flame",afterOrdinal:bruteResponse.ordinal});
    assert.strictEqual(ankoBrute.role,"ACTIVE");
    assert.strictEqual(ankoBrute.damage,21,"Anko -> Brute damage readout drift");
    assert.strictEqual(ankoBrute.beforePL,13,"Brute PL-before readout drift");
    assert.strictEqual(ankoBrute.afterPL,0,"Brute PL-after readout drift");
    assert(ankoBrute.resultText.includes("WITHDRAWAL"),"Brute 0 PL did not read as withdrawal");
    assert(ankoBrute.resultText.includes("21 DAMAGE"),"Dragon Flame damage counter missing");
    assert(ankoBrute.resultText.includes("PL 13 → 0"),"Brute PL transition missing");
    await page.screenshot({path:path.join(OUT,"04-player-chosen-anko-brute.png"),fullPage:false,timeout:12000});

    // Owner correction: Unstable gets the enemy-side opportunity against Anko
    // BEFORE the authored teaching handoff. Menma must not absorb this hit.
    const unstableFirst=await waitForActionPresentation(page,{actor:UNSTABLE,target:ANKO,afterOrdinal:ankoBrute.ordinal});
    assert.strictEqual(unstableFirst.role,"ACTIVE");
    assert(unstableFirst.ordinal>ankoBrute.ordinal,"Unstable did not act after Brute withdrawal");
    const unstableVsAnkoStage=await stageSnapshot(page);
    assert.strictEqual(unstableVsAnkoStage.activePlayerId,ANKO,"Anko yielded before Unstable's visible attack settled");
    assert.strictEqual(unstableVsAnkoStage.presentation.target,ANKO,"Unstable presentation targeted Menma instead of Anko");
    await page.screenshot({path:path.join(OUT,"05-unstable-first-vs-anko.png"),fullPage:false,timeout:12000});
    await waitForPresentationIdle(page);

    await page.waitForFunction(({MENMA,UNSTABLE})=>
      getBattleDeploymentParticipant("player",1)?.id===MENMA&&
      getBattleDeploymentParticipant("enemy",1)?.id===UNSTABLE&&
      getMenmaEvolvedPLBattleInputReadiness36900()?.ready===true,
      {MENMA,UNSTABLE},{timeout:15000});

    const c=await stageSnapshot(page);
    const menmaPL=await page.evaluate(MENMA=>{
      const record=getBattleRemainingPLRecord("player",MENMA);
      return{remaining:Number(record?.current??record?.remaining??0),maximum:Number(record?.maximum??0)};
    },MENMA);
    assert.strictEqual(c.activePlayerId,MENMA);
    assert.strictEqual(c.activeEnemyId,UNSTABLE);
    assert.strictEqual(c.activePlayerDomName,c.activePlayerExpectedName,"Menma handoff left stale player identity");
    assert.strictEqual(c.activeEnemyDomName,c.activeEnemyExpectedName,"Unstable relay left stale enemy identity");
    assert.strictEqual(c.playerDomPL,c.playerExpectedPL,"Menma handoff left stale player PL");
    assert.strictEqual(c.enemyDomPL,c.enemyExpectedPL,"Unstable relay left stale enemy PL");
    assert.strictEqual(menmaPL.remaining,menmaPL.maximum,"Menma did not enter against Unstable with a full Battle PL bar");
    assert.strictEqual(c.autonomousPhaseText,"","Menma input still displayed autonomous/scripted lock copy");
    await openSkillsTray(page);
    const menmaDeck=await stageSnapshot(page);
    assert(menmaDeck.skillDeckText.includes("Driving Chakra Fist"),"Menma Skill deck did not rebind to new Active");
    const ankoSupport=c.playerSupports.find(x=>x.id===ANKO);
    assert(ankoSupport&&c.authorityPortraits.anko&&ankoSupport.src===c.authorityPortraits.anko,"Anko did not remain visible Benched after yield");
    assert(c.transition&&c.transition.type==="authored_active_yield","Anko -> Menma authored yield transition missing");
    assert.strictEqual(c.transition.nextSide,"player","Menma did not receive the next player turn after Unstable attacked Anko");
    await page.screenshot({path:path.join(OUT,"06-menma-input-full-pl.png"),fullPage:false,timeout:12000});

    // Menma now uses the exact same visible controls the player learned with
    // Anko. Presentation must remain sequential: Menma, then Unstable.
    await useVisibleSkill(page,"academy_menma_chakra_knuckle","Driving Chakra Fist");
    const menmaTurn=await waitForActionPresentation(page,{actor:MENMA,target:UNSTABLE,label:"Driving Chakra Fist",afterOrdinal:unstableFirst.ordinal});
    assert.strictEqual(menmaTurn.role,"ACTIVE");
    const duringMenma=await stageSnapshot(page);
    assert.strictEqual(duringMenma.enemyDomPL,menmaTurn.afterPL,"enemy radial PL did not show Menma's committed hit during the action presentation");
    await page.screenshot({path:path.join(OUT,"07-menma-action.png"),fullPage:false,timeout:12000});

    const enemyTurn=await waitForActionPresentation(page,{actor:UNSTABLE,target:MENMA,afterOrdinal:menmaTurn.ordinal});
    assert(enemyTurn.ordinal>menmaTurn.ordinal,"Unstable presentation did not follow Menma sequentially");
    const duringEnemy=await stageSnapshot(page);
    assert.strictEqual(duringEnemy.enemyDomPL,menmaTurn.afterPL,"enemy radial PL did not update after Menma's action animation settled");
    assert.strictEqual(duringEnemy.playerDomPL,enemyTurn.afterPL,"player radial PL did not show Unstable's committed hit during the action presentation");
    await page.screenshot({path:path.join(OUT,"08-unstable-response.png"),fullPage:false,timeout:12000});

    await waitForPresentationIdle(page);
    const final=await page.evaluate(()=>({
      state:getMenmaEvolvedPLBattleState36900(),
      readiness:getMenmaEvolvedPLBattleInputReadiness36900(),
      evidence:(currentBattle.runtime?.evidence||[]).map(r=>({
        eventType:r.eventType,actor:r.actorRef?.participantId||null,target:r.targetRef?.participantId||null,
        skillId:r.skillId||null,data:r.data||{}
      }))
    }));
    assert.strictEqual(final.state.phase,"player","nonterminal exchange did not return to player side");
    assert.strictEqual(final.readiness.ready,true,"Menma input not restored after sequential enemy response");
    assert(final.evidence.some(r=>r.eventType==="enemy_authored_action_completed"&&r.actor===BRUTE&&r.target===ANKO),"Brute did not receive its legitimate ordinary response");
    assert(final.evidence.some(r=>r.eventType==="enemy_authored_action_completed"&&r.actor===UNSTABLE&&r.target===ANKO),"Unstable did not attack Anko before Menma took Active");
    assert(final.evidence.some(r=>r.eventType==="enemy_authored_action_completed"&&r.actor===UNSTABLE&&r.target===MENMA),"Unstable did not receive its later ordinary response after Menma acted");
    assert(final.evidence.some(r=>r.eventType==="skill_action_completed"&&r.actor===ANKO&&r.skillId==="sj_anko_hidden_shadow_snake_hands"),"player-chosen Anko action evidence missing");
    assert(final.evidence.some(r=>r.eventType==="skill_action_completed"&&r.actor===ANKO&&r.skillId==="sj_anko_fire_style_dragon_flame"),"second player-chosen Anko action evidence missing");
    assert(final.evidence.some(r=>r.eventType==="menma_origin_phase_c_started"&&r.actor===MENMA),"MEN-03 active-window evidence never started");
    await gate.assertClean("issue-373-evolved-battle-presentation");

    const playerFacingBodyText=await page.evaluate(()=>document.body.innerText||"");
    assert(!playerFacingBodyText.includes("COMMITTED ZERO WAITING FOR PRESENTATION"),"internal pending-zero state leaked player-facing");
    assert(!playerFacingBodyText.includes("AUTHORED ANKO TAKEDOWN"),"superseded scripted readiness reason leaked player-facing");

    const summary={
      pass:true,
      issue:373,
      kind:"installed_browser_evolved_battle_presentation",
      buildId:BUILD_MANIFEST.buildId,
      checks:{
        forestBackdropVisible:true,
        allFiveParticipantPortraitsVisible:true,
        framelessActiveProjection:true,
        ankoStartsAsPlayerControlledGuestAlly:true,
        exactFourSkillGuestPalette:true,
        firstBattleTutorialActiveBeat:true,
        firstBattleTutorialGuestControlBeat:true,
        firstBattleTutorialSkillsBeat:true,
        firstBattleTutorialBattlePLBeat:true,
        firstBattleTutorialWithdrawalBeat:true,
        firstBattleTutorialRelayBeat:true,
        playerChoosesHiddenShadowSnakeHands:true,
        ankoAlteredReadableAction:true,
        alteredThenBruteRelay:true,
        bruteGetsLegitimateEnemyResponse:true,
        playerChoosesDragonFlame:true,
        ankoBruteReadableAction:true,
        techniqueNamesVisiblyReadable:true,
        damageCountersVisible:true,
        battlePlBeforeAfterVisible:true,
        zeroPlReadsWithdrawal:true,
        ankoYieldsToMenmaAfterLegitimateFirstTwo:true,
        unstableAttacksAnkoBeforeMenmaHandoff:true,
        menmaEntersWithFullBattlePL:true,
        unstableActsOnAnkoBeforeMenmaInput:true,
        centralIdentityAndPLRefreshAfterRelay:true,
        plNumbersChangeAfterVisibleActionSettlement:true,
        skillHoverCanMoveIntoDescriptionPanel:true,
        menmaActionDockRebinds:true,
        ankoRemainsBenched:true,
        menmaThenUnstableSequentialPlayback:true,
        menmaInputRestores:true,
        browserErrorGateClean:true,
        internalStateLabelsHidden:true,
        realFrontDoor33400OriginSelectionPath:true,
        productionRegisterReloadBoundary:true,
        realStoryClickProgressionPath:true,
        noDirectStoryBeatFixture:true
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
