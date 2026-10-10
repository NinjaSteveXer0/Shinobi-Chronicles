#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_448_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_448_OUT||"artifacts/phase2-discipline-stat-growth-448";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_DISCIPLINE_STAT_GROWTH_44800&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    typeof globalThis.commitDisciplineDevelopment448==="function"
  ),null,{timeout:30000});
}
async function release(page){
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_error){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_error){}
    const game=document.querySelector(".game-container");
    if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function setupTeam(page){
  return page.evaluate(()=>{
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();
    const selected=selectChronicleOrigin("academy_menma","qa448_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",["qa448_complete"]);
    const snapshot=getAcademyTeamFormationSnapshot();
    const expected=["academy_hinata","academy_kakashi"];
    if(!expected.every(id=>snapshot.eligibleCandidateVariantIds.includes(id)))return{error:"expected_candidates_missing",eligible:snapshot.eligibleCandidateVariantIds};
    selectAcademyTeamFormationTeammate(1,expected[0]);
    selectAcademyTeamFormationTeammate(2,expected[1]);
    const formed=confirmAcademyTeamFormation("qa448_team",expected);
    const continued=continueAcademyTeamFormationJourney();
    updateChronicleTutorialProgress43600({sandboxPopupSeen:true,practicalTipSeen:true,examsTipSeen:true},{save:true});
    const c=getPlayerCharacter("academy_menma");
    c.stats.nin=10;
    const p=getCharacterDisciplineProgression(c.id,"nin");
    p.level=1;p.exp=0;p.statLevelApplied=1;
    savePlayerData();
    return{selected,completed,formed,continued,team:getChronicleCurrentTeam43600(),stat:c.stats.nin,exp:p.exp,pl:calculateCurrentPL(c)};
  });
}
async function examSnapshot(page){
  return page.evaluate(()=>{
    const data=getKonohaExamUIScreenData();
    const root=document.getElementById("konoha-activity-screen");
    return{
      data:JSON.parse(JSON.stringify(data)),
      text:root?.innerText||"",
      buttons:[...(root?.querySelectorAll(".alpha-activity-discipline")||[])].map(node=>node.innerText.trim()),
      selected:getKonohaExamSelectedDisciplineId()
    };
  });
}
async function inspectMyClan(page,characterId){
  const state=await page.evaluate(characterId=>{
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    const roster=getClanManageableRosterCharacters().map(row=>row.id);
    const opened=openOverlay("clan");
    const selected=selectMyClanCharacterForInspection(characterId);
    const tab=selected?.success===true?setMyClanInspectionTab("stats"):null;
    return{opened:opened||null,selected,tab,roster,currentOverlayType:typeof currentOverlayType!=="undefined"?currentOverlayType:null};
  },characterId);
  if(state.selected?.success===true&&state.tab==="stats"){
    await page.waitForSelector(".my-clan-inspection-panel .my-clan-stat-grid",{state:"visible",timeout:10000});
  }
  const projection=await page.evaluate(characterId=>{
    const panel=document.querySelector(".my-clan-inspection-panel");
    const rows=[...(panel?.querySelectorAll(".my-clan-stat-grid > div")||[])];
    return{
      html:panel?.innerHTML||"",
      text:panel?.innerText||"",
      renderedStats:Object.fromEntries(rows.map(node=>[
        node.querySelector("span")?.textContent?.trim()||"",
        Number(node.querySelector("strong")?.textContent?.trim()||0)
      ])),
      renderedStatRows:rows.map(node=>node.innerText.trim()),
      characterStats:{...getPlayerCharacter(characterId).stats},
      pl:calculateCurrentPL(getPlayerCharacter(characterId))
    };
  },characterId);
  return{...state,...projection};
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);

    const setup=await setupTeam(page);
    assert(!setup.error,JSON.stringify(setup));
    assert.strictEqual(setup.selected?.success,true);
    assert.strictEqual(setup.completed?.success,true);
    assert.strictEqual(setup.formed?.success,true);
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.strictEqual(setup.stat,10);

    await page.evaluate(()=>openKonohaExamFromVillage());
    await page.waitForSelector("#konoha-activity-screen[data-service-id='exams']",{state:"visible",timeout:10000});
    await page.evaluate(()=>selectKonohaExamDiscipline("nin"));
    let exam=await examSnapshot(page);
    const nin=exam.data.disciplines.find(row=>row.id==="nin");
    assert(nin,"Ninjutsu Exam discipline missing");
    assert.strictEqual(nin.currentStat,10);
    assert.strictEqual(nin.exp,0);
    assert.strictEqual(nin.expRequired,10);
    assert.strictEqual(nin.developmentCeilingStat,15);
    assert(exam.text.includes("CURRENT STAT"),"CURRENT STAT player field missing");
    assert(exam.text.includes("DEVELOPMENT"),"DEVELOPMENT player field missing");
    assert(exam.text.includes("FOUNDATION DEVELOPMENT RANGE — THROUGH STAT 15"),"Foundation source range not visible below ceiling");
    assert(!/MAX STAT 15|DISCIPLINE MAXED|STAT COMPLETE/i.test(exam.text),"global-cap language visible below Foundation source ceiling");
    assert(!/MASTERY\s+\d/i.test(exam.text),"numeric MASTERY fossil still visible");
    assert(!/DISCIPLINE EXP/i.test(exam.text),"DISCIPLINE EXP fossil label still visible");
    assert(!/\/\s*50\b/.test(exam.text),"fixed 50 denominator fossil still visible");
    await page.screenshot({path:path.join(OUT,"01-exam-dynamic-development.png"),fullPage:true});

    const materialFailure=await page.evaluate(()=>{
      const old=Math.random;Math.random=()=>0;
      try{
        const c=getPlayerCharacter("academy_menma");
        const before=getDisciplineDevelopmentSnapshot448(c.id,"nin","exam");
        const result=executeKonohaExamAttempt(c.id,"nin");
        const after=getDisciplineDevelopmentSnapshot448(c.id,"nin","exam");
        return{before,result:JSON.parse(JSON.stringify(result)),after};
      }finally{Math.random=old;}
    });
    assert.strictEqual(materialFailure.result.completed,true,"material Exam failure did not commit as an attempt");
    assert.strictEqual(materialFailure.result.success,false,"deterministic material-failure path unexpectedly passed");
    assert.strictEqual(materialFailure.result.developmentExp,1,"material Exam failure did not award +1 Development");
    assert.strictEqual(materialFailure.result.rewardExp,1,"material Exam failure result did not project +1 Development");
    assert.strictEqual(materialFailure.after.currentStat,10);
    assert.strictEqual(materialFailure.after.developmentExp,1);

    const batch=await page.evaluate(()=>{
      const old=Math.random;Math.random=()=>0.999999;
      try{
        const character=getPlayerCharacter("academy_menma");
        const before={snapshot:getDisciplineDevelopmentSnapshot448(character.id,"nin","exam"),pl:calculateCurrentPL(character),team:getChronicleCurrentTeam43600()};
        const results=executeKonohaExamBatch(character.id,"nin",5);
        const after={snapshot:getDisciplineDevelopmentSnapshot448(character.id,"nin","exam"),pl:calculateCurrentPL(character)};
        return{before,after,results:JSON.parse(JSON.stringify(results)),meta:JSON.parse(JSON.stringify(KONOHA_EXAM_ATTEMPT_STATE.lastBatchMeta||null))};
      }finally{Math.random=old;}
    });
    assert.strictEqual(batch.results.length,5);
    assert(batch.results.every(row=>row&&row.success===true&&row.completed===true),"deterministic Exam QA path did not produce five effective executions");
    assert.strictEqual(batch.before.snapshot.currentStat,10);
    assert.strictEqual(batch.before.snapshot.developmentExp,1,"material-failure Development did not feed the shared ledger");
    assert.strictEqual(batch.after.snapshot.currentStat,11);
    assert.strictEqual(batch.after.snapshot.developmentExp,1);
    assert.strictEqual(batch.after.snapshot.developmentRequired,15);
    assert(batch.results.every(row=>Number(row.rewardExp)===2),"Foundation action did not use +2 effective-execution development");
    const teamNoPassive=await page.evaluate(()=>({
      menma:getDisciplineDevelopmentSnapshot448("academy_menma","nin","exam"),
      hinata:getDisciplineDevelopmentSnapshot448("academy_hinata","nin","exam"),
      kakashi:getDisciplineDevelopmentSnapshot448("academy_kakashi","nin","exam")
    }));
    assert.strictEqual(teamNoPassive.hinata.developmentExp,0,"Hinata received passive team development");
    assert.strictEqual(teamNoPassive.kakashi.developmentExp,0,"Kakashi received passive team development");

    const clan=await inspectMyClan(page,"academy_menma");
    assert.strictEqual(clan.selected?.success,true,"My Clan could not inspect persistent subject: "+JSON.stringify(clan));
    assert(clan.roster.includes("academy_menma"),"My Clan manageable roster lost persistent subject: "+JSON.stringify(clan));
    assert.strictEqual(clan.tab,"stats");
    assert.strictEqual(clan.characterStats.nin,11);
    assert.strictEqual(clan.renderedStats.NIN??clan.renderedStats.NINJUTSU,11,"My Clan did not project canonical Current Ninjutsu 11: "+JSON.stringify(clan));
    assert(clan.text.includes("PL "+clan.pl)||clan.text.includes("CURRENT PL")||clan.html.includes(String(clan.pl)),"My Clan PL projection missing");
    await page.screenshot({path:path.join(OUT,"02-my-clan-current-stat.png"),fullPage:true});

    const beforeReload=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma");
      const rows=playerData.activityHistory||[];
      return{
        snapshot:getDisciplineDevelopmentSnapshot448(c.id,"nin","exam"),pl:calculateCurrentPL(c),
        saved:JSON.parse(JSON.stringify(playerData.characters[getOwnedCharacterRecordByVariantId(getCharacterRegistryId(c))?.progressionCharacterId||c.id])),
        developmentReceipts:rows.filter(row=>row?.type==="discipline_development"&&row?.progressionCharacterId===c.id&&row?.disciplineId==="nin").length,
        breakthroughReceipts:rows.filter(row=>row?.type==="discipline_stat_breakthrough"&&row?.progressionCharacterId===c.id&&row?.disciplineId==="nin").length
      };
    });
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    const afterReload=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma");
      const rows=playerData.activityHistory||[];
      return{
        snapshot:getDisciplineDevelopmentSnapshot448(c.id,"nin","exam"),pl:calculateCurrentPL(c),
        saved:JSON.parse(JSON.stringify(playerData.characters[c.id])),
        developmentReceipts:rows.filter(row=>row?.type==="discipline_development"&&row?.progressionCharacterId===c.id&&row?.disciplineId==="nin").length,
        breakthroughReceipts:rows.filter(row=>row?.type==="discipline_stat_breakthrough"&&row?.progressionCharacterId===c.id&&row?.disciplineId==="nin").length
      };
    });
    assert.strictEqual(afterReload.snapshot.currentStat,11);
    assert.strictEqual(afterReload.snapshot.developmentExp,1);
    assert.strictEqual(afterReload.pl,beforeReload.pl);
    assert.strictEqual(afterReload.saved.stats.nin,11);
    assert.strictEqual(afterReload.developmentReceipts,beforeReload.developmentReceipts,"reload duplicated/lost development receipts");
    assert.strictEqual(afterReload.breakthroughReceipts,beforeReload.breakthroughReceipts,"reload duplicated/lost breakthrough receipts");

    await page.evaluate(()=>openKonohaExamFromVillage());
    await page.waitForSelector("#konoha-activity-screen",{state:"visible",timeout:10000});

    // #448 remains the Foundation owner and correctly reports that source's
    // ceiling at 15. Once #576 is production-loaded, the player-facing Exam
    // immediately projects the legitimately earned Expert source instead of
    // leaving stale Foundation-limit copy on screen.
    const ceiling=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma"),p=getCharacterDisciplineProgression(c.id,"nin");
      c.stats.nin=14;p.exp=14;p.level=1;p.statLevelApplied=1;savePlayerData();
      const old=Math.random;Math.random=()=>0.999999;
      try{
        const results=executeKonohaExamBatch(c.id,"nin",10);
        renderKonohaExamVisualScreen();
        return{
          results:JSON.parse(JSON.stringify(results)),
          snapshot:getDisciplineDevelopmentSnapshot448(c.id,"nin","exam"),
          preflight:preflightDisciplineDevelopment448(c.id,"nin","exam"),
          curriculum:typeof resolveDisciplineCurriculumProfile576==="function"?JSON.parse(JSON.stringify(resolveDisciplineCurriculumProfile576(c.id,"nin","exam"))):null,
          meta:JSON.parse(JSON.stringify(KONOHA_EXAM_ATTEMPT_STATE.lastBatchMeta||null)),
          text:document.getElementById("konoha-activity-screen")?.innerText||"",
          history:playerData.activityHistory.filter(row=>row&&["discipline_stat_breakthrough","activity_development_ceiling_reached"].includes(row.type)).map(row=>JSON.parse(JSON.stringify(row)))
        };
      }finally{Math.random=old;}
    });
    assert.strictEqual(ceiling.results.length,1,"×10 Exam did not stop immediately at Foundation source ceiling");
    assert.strictEqual(ceiling.results[0].success,true);
    assert.strictEqual(ceiling.snapshot.currentStat,15);
    assert.strictEqual(ceiling.snapshot.developmentExp,1,"final eligible Foundation repetition lost legitimate overflow");
    assert.strictEqual(ceiling.preflight.allowed,false);
    assert.strictEqual(ceiling.preflight.reason,"activity_development_ceiling_reached");
    assert.strictEqual(ceiling.meta.stoppedAtCeiling,true);
    assert.strictEqual(ceiling.curriculum?.allowed,true,"earned Expert curriculum did not become available at Stat 15");
    assert.strictEqual(ceiling.curriculum?.tier,"expert");
    assert.strictEqual(ceiling.curriculum?.activityProfileId,"discipline_curriculum_nin_expert_v1");
    assert(ceiling.text.includes("EXPERT NINJUTSU CURRICULUM — EFFECTIVE THROUGH STAT 30"),"earned Expert source is not the current player-facing source after Foundation ceiling");
    assert(!ceiling.text.includes("FOUNDATION TRAINING LIMIT REACHED"),"stale Foundation-limit label remained after Expert source became available");
    assert(!ceiling.text.includes("This activity can no longer advance NINJUTSU. Further development requires a more demanding source."),"stale Foundation-limit supporting copy remained after Expert source became available");
    assert(!/STAT DEVELOPMENT COMPLETE FOR THIS ACTIVITY|FOUNDATION DEVELOPMENT COMPLETE AT STAT|MAX STAT 15|DISCIPLINE MAXED|STAT COMPLETE/i.test(ceiling.text),"global-cap-suggestive wording visible at Foundation source transition");
    assert(ceiling.history.some(row=>row.type==="activity_development_ceiling_reached"),"Foundation ceiling milestone receipt missing");
    await page.screenshot({path:path.join(OUT,"03-exam-ceiling-complete.png"),fullPage:true});

    const practicalAction=await page.evaluate(()=>{
      const c=getPlayerCharacter("academy_menma"),p=getCharacterDisciplineProgression(c.id,"tai");
      c.stats.tai=10;p.exp=0;p.level=1;p.statLevelApplied=1;savePlayerData();
      const old=Math.random;Math.random=()=>0.999999;
      let result;
      try{result=executeKonohaPracticalAttempt(c.id,"tai");}finally{Math.random=old;}
      openKonohaPracticalFromVillage();selectKonohaPracticalDiscipline("tai");
      return{result:JSON.parse(JSON.stringify(result)),snapshot:getDisciplineDevelopmentSnapshot448(c.id,"tai","practical")};
    });
    assert.strictEqual(practicalAction.result.success,true,"deterministic Practical action did not pass");
    assert.strictEqual(practicalAction.result.rewardExp,2,"Practical effective execution did not award +2 Development");
    assert.strictEqual(practicalAction.snapshot.currentStat,10);
    assert.strictEqual(practicalAction.snapshot.developmentExp,2);
    await page.waitForSelector("#konoha-activity-screen[data-service-id='practical']",{state:"visible",timeout:10000});
    const practical=await page.evaluate(()=>{
      const data=getKonohaPracticalUIScreenData(),root=document.getElementById("konoha-activity-screen");
      return{data:JSON.parse(JSON.stringify(data)),text:root?.innerText||""};
    });
    const tai=practical.data.disciplines.find(row=>row.id==="tai");
    assert.strictEqual(tai.currentStat,10);assert.strictEqual(tai.expRequired,10);assert.strictEqual(tai.developmentCeilingStat,15);
    assert(practical.text.includes("CURRENT STAT")&&practical.text.includes("DEVELOPMENT"));
    assert(!/MASTERY\s+\d/i.test(practical.text));
    await page.screenshot({path:path.join(OUT,"04-practical-dynamic-development.png"),fullPage:true});

    const diagnostics=await page.evaluate(()=>runPhase2DisciplineStatGrowth448Diagnostics());
    assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));
    await gate.assertClean("phase2-discipline-stat-growth-448");
    console.log(JSON.stringify({
      pass:true,issue:448,
      currentTeam:["academy_menma","academy_hinata","academy_kakashi"],
      realExamActionToStatBreakthrough:true,
      realPracticalActionToDevelopment:true,
      reloadReceiptIdempotence:true,
      developmentPerMaterialFailure:1,
      developmentPerEffectiveFoundationAction:2,
      dynamicThresholdUI:true,numericMasteryRetired:true,
      myClanCanonicalProjection:true,saveReload:true,
      foundationSourceLimit15:true,expertSourceTransition15:true,noGlobalStatCapSemantics:true,batchStopsAtCeiling:true,overflowPreserved:true,
      passiveTeamSharing:false,techniquePracticeActivated:false,
      browserGoldenClaimed:false
    },null,2));
  }finally{await context.close();await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});