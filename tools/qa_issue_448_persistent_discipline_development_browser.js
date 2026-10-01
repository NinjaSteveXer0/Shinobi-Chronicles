#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_448_BROWSER_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_448_BROWSER_OUT||"artifacts/issue-448-persistent-discipline-development";
fs.mkdirSync(OUT,{recursive:true});

async function release(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_44800&&
    typeof globalThis.commitFoundationDisciplineDevelopment44800==="function"
  ),null,{timeout:30000});
  await release(page);
}
async function setExamResolver(page,passed){
  await page.evaluate(passed=>{
    if(!globalThis.__qa448PriorExamResolver)globalThis.__qa448PriorExamResolver=resolveKonohaExamAttempt;
    const forced=()=>({passed, outcome:passed?"pass":"fail",difficulty:50,score:passed?99:1,history:{failureAssist:0,confidenceBonus:0}});
    globalThis.resolveKonohaExamAttempt=forced;
    try{resolveKonohaExamAttempt=forced;}catch(_error){}
  },passed);
}
async function restoreExamResolver(page){
  await page.evaluate(()=>{
    const prior=globalThis.__qa448PriorExamResolver;if(!prior)return;
    globalThis.resolveKonohaExamAttempt=prior;try{resolveKonohaExamAttempt=prior;}catch(_error){}
    delete globalThis.__qa448PriorExamResolver;
  });
}
async function setPracticalResolver(page,passed){
  await page.evaluate(passed=>{
    if(!globalThis.__qa448PriorPracticalResolver)globalThis.__qa448PriorPracticalResolver=resolveKonohaPracticalAttempt;
    const forced=()=>({passed, outcome:passed?"pass":"fail",difficulty:50,score:passed?99:1,history:{failureAssist:0,confidenceBonus:0}});
    globalThis.resolveKonohaPracticalAttempt=forced;
    try{resolveKonohaPracticalAttempt=forced;}catch(_error){}
  },passed);
}
async function restorePracticalResolver(page){
  await page.evaluate(()=>{
    const prior=globalThis.__qa448PriorPracticalResolver;if(!prior)return;
    globalThis.resolveKonohaPracticalAttempt=prior;try{resolveKonohaPracticalAttempt=prior;}catch(_error){}
    delete globalThis.__qa448PriorPracticalResolver;
  });
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1536,height:960},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);

    const setup=await page.evaluate(()=>{
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();

      const selected=selectChronicleOrigin("academy_menma","qa448_origin");
      const completed=completeChronicleOriginPrologue("academy_menma",["qa448_origin_complete"]);
      const candidates=["academy_hinata","academy_kakashi"];
      const one=selectAcademyTeamFormationTeammate(1,candidates[0]);
      const two=selectAcademyTeamFormationTeammate(2,candidates[1]);
      const formed=confirmAcademyTeamFormation("qa448_team",candidates);
      const continued=continueAcademyTeamFormationJourney();
      updateChronicleTutorialProgress43600({
        sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore",
        trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:false,tutorialTipsEnabled:true
      },{save:true});

      // First #448 migration marker must exist before the QA fixture adjusts
      // canonical Current Stats. The fixture then behaves like a persisted save.
      rehydratePersistentDisciplineStats44800();
      const menma=getPlayerCharacter("academy_menma");
      // getCharacterDisciplineProgression normalizes the whole progression
      // object, so seed both rows first and mutate the final canonical object.
      getCharacterDisciplineProgression("academy_menma","nin");
      getCharacterDisciplineProgression("academy_menma","tai");
      menma.stats.nin=9;menma.disciplineProgression.nin.exp=8;
      menma.stats.tai=9;menma.disciplineProgression.tai.exp=9;
      savePlayerData();

      return{
        selected,completed,one,two,formed,continued,
        team:getChronicleCurrentTeam43600(),
        manifest:getChronicleStateManifest43600(),
        diagnostics:runPhase2DisciplineDevelopment44800Diagnostics(),
        before:{nin:menma.stats.nin,ninExp:nin.exp,tai:menma.stats.tai,taiExp:tai.exp,pl:calculateCurrentPL(menma)}
      };
    });
    assert.strictEqual(setup.selected?.success,true,"Origin select failed");
    assert.strictEqual(setup.completed?.success,true,"Origin completion failed");
    assert.strictEqual(setup.formed?.success,true,"Academy team formation failed");
    assert.strictEqual(setup.continued?.success,true,"Academy team continuation failed");
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.strictEqual(setup.diagnostics.pass,true,JSON.stringify(setup.diagnostics));
    assert(setup.manifest.domains.some(row=>row.stateDomainId==="disciplineDevelopment"),"Manifest missing disciplineDevelopment");

    // Normal player activity must reject an acquired but non-current-team subject.
    const outside=await page.evaluate(()=>{
      const acquired=commitCharacterAcquisition({
        variantId:"academy_obito",route:"qa448_non_team",sourceEventId:"qa448_non_team",
        context:{qa:true},provenance:{authority:"qa448"}
      });
      materializeProductionRuntimeCharacter("academy_obito");
      return{acquired,preflight:preflightFoundationDisciplineDevelopment44800("exam","academy_obito","nin")};
    });
    assert.strictEqual(outside.acquired?.success,true,"QA outside-team acquisition failed");
    assert.strictEqual(outside.preflight.allowed,false);
    assert.strictEqual(outside.preflight.reason,"subject_not_in_committed_current_team");

    // Real Exam surface: no numeric Mastery / fixed 0/50 fossil.
    await page.evaluate(()=>{
      openKonohaExamFromVillage();
      changeKonohaExamCharacter("academy_menma");
      selectKonohaExamDiscipline("nin");
      renderKonohaExamVisualScreen();
    });
    await page.waitForSelector("#konoha-activity-screen",{state:"visible",timeout:10000});
    const examSurface=await page.locator("#konoha-activity-screen").innerText();
    assert(examSurface.includes("CURRENT STAT"),"Exam UI missing CURRENT STAT");
    assert(examSurface.includes("DEVELOPMENT"),"Exam UI missing DEVELOPMENT");
    assert(examSurface.includes("DEVELOPMENT EFFECTIVE THROUGH STAT 15"),"Exam UI missing foundation ceiling");
    assert(!/MASTERY\s+\d/i.test(examSurface),"Exam UI still exposes numeric Mastery");
    assert(!/DISCIPLINE EXP/i.test(examSurface),"Exam UI still exposes fossil DISCIPLINE EXP label");
    await page.screenshot({path:path.join(OUT,"01-exam-dynamic-development.png"),fullPage:true});

    // Authored material failure develops +1.
    await setExamResolver(page,false);
    const fail=await page.evaluate(()=>executeKonohaExamAttempt("academy_menma","nin"));
    await restoreExamResolver(page);
    assert.strictEqual(fail.completed,true,JSON.stringify(fail));
    assert.strictEqual(fail.success,false);
    assert.strictEqual(fail.developmentExp,1);
    assert.strictEqual(fail.previousStat,9);
    assert.strictEqual(fail.newStat,9);
    assert.strictEqual(fail.previousExp,8);
    assert.strictEqual(fail.currentExp,9);

    // Effective success develops +2 and crosses the dynamic Stat-9 threshold 10.
    await setExamResolver(page,true);
    const pass=await page.evaluate(()=>executeKonohaExamAttempt("academy_menma","nin"));
    await restoreExamResolver(page);
    assert.strictEqual(pass.completed,true,JSON.stringify(pass));
    assert.strictEqual(pass.success,true);
    assert.strictEqual(pass.developmentExp,2);
    assert.strictEqual(pass.previousStat,9);
    assert.strictEqual(pass.newStat,10);
    assert.strictEqual(pass.currentExp,1);
    assert.strictEqual(pass.statPointsGained,1);

    // Practical uses the same persistent ledger / transaction, not a second XP.
    await setPracticalResolver(page,true);
    const practical=await page.evaluate(()=>executeKonohaPracticalAttempt("academy_menma","tai"));
    await restorePracticalResolver(page);
    assert.strictEqual(practical.completed,true,JSON.stringify(practical));
    assert.strictEqual(practical.developmentExp,2);
    assert.strictEqual(practical.previousStat,9);
    assert.strictEqual(practical.newStat,10);
    assert.strictEqual(practical.currentExp,1);

    // Partial Development EXP must not move Current PL by itself.
    const partialPl=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma"),p=getCharacterDisciplineProgression(c.id,"nin");
      const before=calculateCurrentPL(c),beforeRaw=calculateCurrentRawPL(c),old=p.exp;
      p.exp=9;
      const after=calculateCurrentPL(c),afterRaw=calculateCurrentRawPL(c);
      p.exp=old;
      return{before,after,beforeRaw,afterRaw};
    });
    assert.strictEqual(partialPl.after,partialPl.before,"unspent Development EXP changed displayed Current PL");
    assert.strictEqual(partialPl.afterRaw,partialPl.beforeRaw,"unspent Development EXP changed raw Current PL");

    // x10 must stop at the Foundation source ceiling instead of burning dead repetitions.
    const ceilingPrep=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma"),p=getCharacterDisciplineProgression(c.id,"nin");
      c.stats.nin=14;p.exp=14;savePlayerData();
      changeKonohaExamCharacter("academy_menma");selectKonohaExamDiscipline("nin");setKonohaExamBatchSize(10);
      renderKonohaExamVisualScreen();
      return getDisciplineDevelopmentProjection44800(c.id,"nin");
    });
    assert.strictEqual(ceilingPrep.currentStat,14);
    assert.strictEqual(ceilingPrep.exp,14);

    await setExamResolver(page,true);
    const batch=await page.evaluate(()=>executeKonohaExamBatch("academy_menma","nin",10));
    await restoreExamResolver(page);
    assert.strictEqual(batch.length,1,"x10 did not stop immediately once ceiling activated");
    const ceilingState=await page.evaluate(()=>{
      renderKonohaExamVisualScreen();
      const c=getPlayerCharacter("academy_menma"),p=getCharacterDisciplineProgression(c.id,"nin");
      const root=playerData.phase2ChronicleState.disciplineDevelopment;
      const primary=document.querySelector("#konoha-activity-screen .alpha-activity-primary");
      return{
        stat:c.stats.nin,exp:p.exp,pl:calculateCurrentPL(c),
        projection:getDisciplineDevelopmentProjection44800(c.id,"nin"),
        meta:JSON.parse(JSON.stringify(KONOHA_EXAM_ATTEMPT_STATE.lastBatchMeta)),
        primary:{disabled:primary?.disabled===true,text:primary?.textContent?.trim()||""},
        receipts:{development:root.developmentReceipts.length,breakthrough:root.breakthroughReceipts.length,ceiling:root.ceilingReceipts.length}
      };
    });
    assert.strictEqual(ceilingState.stat,15);
    assert.strictEqual(ceilingState.exp,1,"final eligible repetition clipped legitimate overflow");
    assert.strictEqual(ceilingState.meta.stoppedReason,"development_ceiling_reached");
    assert.strictEqual(ceilingState.primary.disabled,true,"ceiling-complete Exam still spendable");
    assert.strictEqual(ceilingState.primary.text,"DEVELOPMENT COMPLETE");
    assert(ceilingState.receipts.ceiling>=1,"ceiling milestone receipt missing");
    await page.screenshot({path:path.join(OUT,"02-exam-foundation-ceiling.png"),fullPage:true});

    const beforeReload=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma"),root=playerData.phase2ChronicleState.disciplineDevelopment;
      CLAN_UI_STATE.inspectionTab="stats";
      const statsHtml=renderMyClanInspectionContent(c);
      CLAN_UI_STATE.inspectionTab="overview";
      const overviewHtml=renderMyClanInspectionContent(c);
      return{
        stat:c.stats.nin,exp:getCharacterDisciplineProgression(c.id,"nin").exp,pl:calculateCurrentPL(c),
        statsHtml,overviewHtml,
        receiptCounts:{development:root.developmentReceipts.length,breakthrough:root.breakthroughReceipts.length,ceiling:root.ceilingReceipts.length}
      };
    });
    assert(beforeReload.statsHtml.includes("<span>NINJUTSU</span><strong>15</strong>"),"My Clan Stats does not project canonical Ninjutsu 15");
    assert(beforeReload.overviewHtml.includes("CURRENT PL"),"My Clan overview lost Current PL");
    assert(beforeReload.overviewHtml.includes(`<strong>${beforeReload.pl}</strong>`),"My Clan Current PL does not match canonical PL");

    // Save/load must restore the same Current Stat/EXP/PL and not duplicate receipts.
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    const afterReload=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma"),root=playerData.phase2ChronicleState.disciplineDevelopment;
      CLAN_UI_STATE.inspectionTab="stats";
      const statsHtml=renderMyClanInspectionContent(c);
      CLAN_UI_STATE.inspectionTab="overview";
      const overviewHtml=renderMyClanInspectionContent(c);
      return{
        stat:c.stats.nin,exp:getCharacterDisciplineProgression(c.id,"nin").exp,pl:calculateCurrentPL(c),
        statsHtml,overviewHtml,
        receiptCounts:{development:root.developmentReceipts.length,breakthrough:root.breakthroughReceipts.length,ceiling:root.ceilingReceipts.length},
        team:getChronicleCurrentTeam43600(),
        diagnostics:runPhase2DisciplineDevelopment44800Diagnostics()
      };
    });
    assert.strictEqual(afterReload.stat,beforeReload.stat,"Current Stat did not persist across reload");
    assert.strictEqual(afterReload.exp,beforeReload.exp,"Development EXP did not persist across reload");
    assert.strictEqual(afterReload.pl,beforeReload.pl,"Current PL changed across reload");
    assert.deepStrictEqual(afterReload.receiptCounts,beforeReload.receiptCounts,"reload duplicated/lost #448 receipts");
    assert.deepStrictEqual(afterReload.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"],"reload changed exact committed currentTeam");
    assert(afterReload.statsHtml.includes("<span>NINJUTSU</span><strong>15</strong>"),"My Clan post-reload Stats stale");
    assert(afterReload.overviewHtml.includes(`<strong>${afterReload.pl}</strong>`),"My Clan post-reload PL stale");
    assert.strictEqual(afterReload.diagnostics.pass,true,JSON.stringify(afterReload.diagnostics));

    // No writable Technique Practice route exists in this tranche.
    assert.strictEqual(await page.evaluate(()=>typeof globalThis.commitTechniquePractice44800),"undefined");

    await gate.assertClean("issue-448-persistent-development");
    console.log(JSON.stringify({
      pass:true,issue:448,
      registeredActivities:["exam","practical"],
      curveId:"discipline_stat_curve_v1",
      developmentCeilingStat:15,
      failDevelopmentExp:fail.developmentExp,
      passDevelopmentExp:pass.developmentExp,
      practicalDevelopmentExp:practical.developmentExp,
      x10StoppedAtCeiling:true,
      overflowPreserved:true,
      currentStatPersisted:true,
      currentPLPersisted:true,
      myClanCanonicalProjection:true,
      currentTeamRegression:true,
      techniquePracticeWriter:false,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
