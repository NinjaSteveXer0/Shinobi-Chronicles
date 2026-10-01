#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE448_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE448_BROWSER_OUT||"artifacts/issue-448-discipline-development";
fs.mkdirSync(OUT,{recursive:true});

async function wait448(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_44800&&
    globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_UI_44810&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110
  ),null,{timeout:30000});
}
async function releaseFrontDoor(page){
  await page.evaluate(()=>{
    try{if(typeof releaseAlphaFrontDoor33300==="function")releaseAlphaFrontDoor33300();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"]){
      const node=document.getElementById(id);if(node)node.remove();
    }
  });
}
async function setupAcademyTeam(page){
  return page.evaluate(()=>{
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();

    const selected=selectChronicleOrigin("academy_menma","qa448_browser_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",["qa448_browser_origin_complete"]);
    const snapshot=getAcademyTeamFormationSnapshot();
    if(!snapshot.eligibleCandidateVariantIds.includes("academy_hinata")||!snapshot.eligibleCandidateVariantIds.includes("academy_kakashi")){
      return{success:false,reason:"required_qa_teammates_not_eligible",eligible:snapshot.eligibleCandidateVariantIds};
    }
    const one=selectAcademyTeamFormationTeammate(1,"academy_hinata");
    const two=selectAcademyTeamFormationTeammate(2,"academy_kakashi");
    const formed=confirmAcademyTeamFormation("qa448_browser_team",["academy_hinata","academy_kakashi"]);
    const continued=continueAcademyTeamFormationJourney();
    ensurePhase2ChronicleState43600({save:false});
    updateChronicleTutorialProgress43600({
      sandboxPopupSeen:true,recommendedRouteEnabled:false,openingChoice:"explore_konoha",
      trainingTipSeen:true,practicalTipSeen:true,examsTipSeen:true,arenaTipSeen:true,
      arenaCompletionChoiceSeen:true,shinobiRecordTipSeen:true,tutorialTipsEnabled:true
    },{save:true});
    return{
      success:selected.success===true&&completed.success===true&&one===true&&two===true&&formed.success===true&&continued.success===true,
      selected,completed,formed,continued,team:getChronicleCurrentTeam43600()
    };
  });
}
async function disciplineSurface(page,service){
  return page.evaluate(service=>{
    const root=document.getElementById("konoha-activity-screen");
    const data=service==="practical"?getKonohaPracticalUIScreenData():getKonohaExamUIScreenData();
    return{
      text:root?.innerText||"",
      selectedCharacterId:data?.selectedCharacterId||null,
      selectable:(data?.characters||[]).map(row=>row.id),
      disciplines:(data?.disciplines||[]).map(row=>({
        id:row.id,currentStat:row.currentStat,exp:row.exp,expRequired:row.expRequired,
        developmentCeilingStat:row.developmentCeilingStat,developmentComplete:row.developmentComplete
      })),
      primaryDisabled:!!root?.querySelector(".alpha-activity-primary")?.disabled,
      rootFlag:root?.dataset.phase2DisciplineDevelopment||null
    };
  },service);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await wait448(page);
    await releaseFrontDoor(page);

    const setup=await setupAcademyTeam(page);
    assert.strictEqual(setup.success,true,"Academy-team setup failed: "+JSON.stringify(setup));
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    const diag=await page.evaluate(()=>runPhase2DisciplineDevelopment44800Diagnostics());
    assert.strictEqual(diag.pass,true,JSON.stringify(diag,null,2));

    // Practical: real current-team subject, real live action, exact threshold -> +1 Current Stat.
    const practicalSetup=await page.evaluate(()=>{
      const character=getPlayerCharacter("academy_menma");
      const teammate=getPlayerCharacter("academy_hinata");
      const p=getCharacterDisciplineProgression(character.id,"tai");
      character.stats.tai=10;p.exp=8;p.level=1;p.statLevelApplied=1;
      const teammateExp=getCharacterDisciplineProgression(teammate.id,"tai").exp;
      savePlayerData();
      Math.random=()=>0.999999;
      const opened=openKonohaPracticalFromVillage();
      selectKonohaPracticalDiscipline("tai");
      setKonohaPracticalBatchSize(1);
      renderKonohaPracticalVisualScreen();
      return{
        opened,
        teammateExp,
        plBefore:calculateCurrentPL(character),
        rawBefore:calculateCurrentRawPL(character),
        team:getChronicleCurrentTeam43600()
      };
    });
    assert.deepStrictEqual(practicalSetup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);

    let surface=await disciplineSurface(page,"practical");
    assert.deepStrictEqual(surface.selectable,["academy_menma","academy_hinata","academy_kakashi"],"Practical escaped currentTeam");
    assert.strictEqual(surface.selectedCharacterId,"academy_menma");
    assert(surface.text.includes("CURRENT STAT"),"Practical does not project CURRENT STAT");
    assert(surface.text.includes("DEVELOPMENT"),"Practical does not project DEVELOPMENT");
    assert(surface.text.includes("DEVELOPMENT EFFECTIVE THROUGH STAT 15"),"Practical ceiling is not player-visible");
    assert(!surface.text.includes("MASTERY"),"numeric Mastery fossil remains visible");
    assert(!surface.text.includes("DISCIPLINE EXP"),"old DISCIPLINE EXP fossil remains visible");
    const taiBefore=surface.disciplines.find(row=>row.id==="tai");
    assert.strictEqual(taiBefore.currentStat,10);
    assert.strictEqual(taiBefore.exp,8);
    assert.strictEqual(taiBefore.expRequired,10);
    await page.screenshot({path:path.join(OUT,"01-practical-development-before.png"),fullPage:true});

    const practical=await page.evaluate(()=>{
      const beforeHistory=playerData.activityHistory.length;
      const beforeBreakthroughs=playerData.activityHistory.filter(row=>row?.type==="discipline_stat_breakthrough").length;
      const result=executeKonohaPracticalTraining();
      const character=getPlayerCharacter("academy_menma");
      const teammate=getPlayerCharacter("academy_hinata");
      const p=getCharacterDisciplineProgression(character.id,"tai");
      const teammateP=getCharacterDisciplineProgression(teammate.id,"tai");
      return{
        result,
        stat:character.stats.tai,exp:p.exp,pl:calculateCurrentPL(character),rawPL:calculateCurrentRawPL(character),
        teammateExp:teammateP.exp,
        historyDelta:playerData.activityHistory.length-beforeHistory,
        breakthroughDelta:playerData.activityHistory.filter(row=>row?.type==="discipline_stat_breakthrough").length-beforeBreakthroughs,
        tx:getLastDisciplineDevelopmentTransaction44800()
      };
    });
    assert.strictEqual(practical.result.success,true,"real Practical attempt did not succeed");
    assert.strictEqual(practical.stat,11,"Practical threshold did not create +1 Current Stat");
    assert.strictEqual(practical.exp,0,"Practical threshold did not consume exact 10 EXP");
    assert.strictEqual(practical.teammateExp,practicalSetup.teammateExp,"Practical passively copied EXP to teammate");
    assert.strictEqual(practical.tx.expGranted,2,"Academy Foundation effective execution is not +2 EXP");
    assert.strictEqual(practical.tx.currentStatBefore,10);
    assert.strictEqual(practical.tx.currentStatAfter,11);
    assert.strictEqual(practical.tx.breakthroughs.length,1);
    assert.strictEqual(practical.tx.breakthroughs[0].directPLGrant,0);
    assert.strictEqual(practical.breakthroughDelta,1);
    surface=await disciplineSurface(page,"practical");
    const taiAfter=surface.disciplines.find(row=>row.id==="tai");
    assert.strictEqual(taiAfter.currentStat,11);
    assert.strictEqual(taiAfter.expRequired,15,"post-breakthrough denominator did not change dynamically");
    await page.screenshot({path:path.join(OUT,"02-practical-development-after.png"),fullPage:true});

    // My Clan must project the exact same canonical Current Stat/PL.
    const clan=await page.evaluate(()=>{
      openOverlay("clan");
      selectMyClanCharacterForInspection("academy_menma");
      setMyClanInspectionTab("stats");
      const character=getPlayerCharacter("academy_menma");
      return{stat:character.stats.tai,pl:calculateCurrentPL(character)};
    });
    await page.waitForTimeout(80);
    const clanText=await page.locator("#overlay-content-container").innerText();
    assert(clanText.includes("TAIJUTSU")&&clanText.includes(String(clan.stat)),"My Clan did not project canonical Current Taijutsu");
    assert(clanText.includes("PL "+clan.pl)||clanText.includes("CURRENT PL")&&clanText.includes(String(clan.pl)),"My Clan PL does not match canonical Current PL");
    await page.screenshot({path:path.join(OUT,"03-my-clan-canonical-stats.png"),fullPage:true});

    // Exam x10: one final eligible repetition reaches ceiling, then batch stops before dead development.
    const examSetup=await page.evaluate(()=>{
      const character=getPlayerCharacter("academy_menma");
      const p=getCharacterDisciplineProgression(character.id,"nin");
      character.stats.nin=14;p.exp=14;p.level=1;p.statLevelApplied=1;
      savePlayerData();
      closeOverlay();
      const opened=openKonohaExamFromVillage();
      selectKonohaExamDiscipline("nin");
      setKonohaExamBatchSize(10);
      renderKonohaExamVisualScreen();
      const developmentBefore=playerData.activityHistory.filter(row=>row?.type==="discipline_development"&&row.disciplineId==="nin"&&row.activity==="academy_foundation_discipline_activity").length;
      return{opened,developmentBefore};
    });
    surface=await disciplineSurface(page,"exams");
    const ninBefore=surface.disciplines.find(row=>row.id==="nin");
    assert.strictEqual(ninBefore.currentStat,14);
    assert.strictEqual(ninBefore.exp,14);
    assert.strictEqual(ninBefore.expRequired,15);
    assert.strictEqual(surface.primaryDisabled,false);
    await page.screenshot({path:path.join(OUT,"04-exam-before-ceiling.png"),fullPage:true});

    const exam=await page.evaluate(developmentBefore=>{
      const result=beginKonohaExamFromUI();
      const character=getPlayerCharacter("academy_menma");
      const p=getCharacterDisciplineProgression(character.id,"nin");
      const developmentAfter=playerData.activityHistory.filter(row=>row?.type==="discipline_development"&&row.disciplineId==="nin"&&row.activity==="academy_foundation_discipline_activity").length;
      return{
        result,stat:character.stats.nin,exp:p.exp,pl:calculateCurrentPL(character),
        developmentDelta:developmentAfter-developmentBefore,
        ceilingCount:playerData.activityHistory.filter(row=>row?.type==="activity_development_ceiling_reached"&&row.disciplineId==="nin").length,
        blockedResult:(result.results||[]).find(row=>row&&row.blocked===true)||null
      };
    },examSetup.developmentBefore);
    assert.strictEqual(exam.stat,15,"Exam final eligible repetition did not reach Foundation ceiling");
    assert.strictEqual(exam.exp,1,"Exam final eligible repetition did not preserve legitimate overflow");
    assert.strictEqual(exam.developmentDelta,1,"x10 consumed more than one live development repetition after ceiling became active");
    assert.strictEqual(exam.ceilingCount,1,"ceiling milestone missing/duplicated");
    assert(exam.blockedResult&&exam.blockedResult.reason==="activity_development_ceiling_reached","x10 did not stop on the first post-ceiling preflight");
    surface=await disciplineSurface(page,"exams");
    assert(surface.text.includes("STAT DEVELOPMENT COMPLETE FOR THIS ACTIVITY"),"ceiling completion is not player-visible");
    assert.strictEqual(surface.primaryDisabled,true,"Begin Exam remains enabled for dead Foundation Stat development");
    await page.screenshot({path:path.join(OUT,"05-exam-at-ceiling.png"),fullPage:true});

    // Stale-team guard: selection snapshot belongs to old assignment and must fail closed.
    const stale=await page.evaluate(()=>{
      openKonohaPracticalFromVillage();
      const state=ensurePlayerAcquisitionState();
      const old=state.academyTeamFormation.confirmationReceipt.commitId;
      state.academyTeamFormation.confirmationReceipt.commitId=old+"-changed";
      const result=executeKonohaPracticalAttempt("academy_menma","tai");
      state.academyTeamFormation.confirmationReceipt.commitId=old;
      return result;
    });
    assert.strictEqual(stale.completed,false,"stale team selection executed");
    assert.strictEqual(stale.reason,"stale_team_assignment");

    // Save/reload: direct Current Stats, remaining EXP, formula PL and receipts survive without duplication.
    const beforeReload=await page.evaluate(()=>{
      savePlayerData();
      const character=getPlayerCharacter("academy_menma");
      return{
        stats:{tai:character.stats.tai,nin:character.stats.nin},
        exp:{tai:getCharacterDisciplineProgression(character.id,"tai").exp,nin:getCharacterDisciplineProgression(character.id,"nin").exp},
        pl:calculateCurrentPL(character),
        breakthroughIds:playerData.activityHistory.filter(row=>row?.type==="discipline_stat_breakthrough").map(row=>row.receiptId).sort(),
        activationIds:playerData.activityHistory.filter(row=>row?.type==="discipline_stat_curve_activation").map(row=>row.receiptId).sort()
      };
    });
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await wait448(page);
    await releaseFrontDoor(page);
    const afterReload=await page.evaluate(()=>{
      const character=getPlayerCharacter("academy_menma");
      return{
        stats:{tai:character.stats.tai,nin:character.stats.nin},
        exp:{tai:getCharacterDisciplineProgression(character.id,"tai").exp,nin:getCharacterDisciplineProgression(character.id,"nin").exp},
        pl:calculateCurrentPL(character),
        breakthroughIds:playerData.activityHistory.filter(row=>row?.type==="discipline_stat_breakthrough").map(row=>row.receiptId).sort(),
        activationIds:playerData.activityHistory.filter(row=>row?.type==="discipline_stat_curve_activation").map(row=>row.receiptId).sort()
      };
    });
    assert.deepStrictEqual(afterReload.stats,beforeReload.stats,"reload changed canonical Current Stats");
    assert.deepStrictEqual(afterReload.exp,beforeReload.exp,"reload changed Discipline EXP remainder");
    assert.strictEqual(afterReload.pl,beforeReload.pl,"reload changed formula-derived Current PL");
    assert.deepStrictEqual(afterReload.breakthroughIds,beforeReload.breakthroughIds,"reload duplicated/lost breakthrough receipts");
    assert.deepStrictEqual(afterReload.activationIds,beforeReload.activationIds,"reload duplicated curve activation receipts");

    await gate.assertClean("issue-448-discipline-development");
    console.log(JSON.stringify({
      pass:true,
      issue:448,
      exactCommittedTeam:["academy_menma","academy_hinata","academy_kakashi"],
      practicalRealActionBreakthrough:true,
      dynamicDevelopmentDenominator:true,
      noNumericMastery:true,
      myClanCanonicalProjection:true,
      foundationCeiling15:true,
      x10StopsAtCeiling:true,
      noDeadPostCeilingDevelopmentWrite:true,
      staleTeamFailsClosed:true,
      saveReloadPreservesStatsExpPL:true,
      receiptIdempotence:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
