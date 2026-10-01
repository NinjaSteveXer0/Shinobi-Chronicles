#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_KONOHA_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_KONOHA_PLAYER_SURFACES_OUT||"artifacts/phase2-konoha-player-surfaces";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_CHRONICLE_STATE_MANIFEST_43600&&
    globalThis.SC_PHASE2_KONOHA_PLAYER_SURFACES_43110&&
    typeof globalThis.getPhase2KonohaActivityTeam43110==="function"
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
async function activitySnapshot(page,service){
  return page.evaluate(service=>{
    const data=service==="practical"?getKonohaPracticalUIScreenData():getKonohaExamUIScreenData();
    const root=document.getElementById("konoha-activity-screen");
    return{
      data:JSON.parse(JSON.stringify(data)),
      selectable:getKonohaSelectableCharacters().map(row=>row.id),
      helper:getPhase2KonohaActivityTeam43110().map(row=>row.id),
      text:root?.innerText||"",
      subtitle:root?.querySelector(".alpha-activity-header p")?.textContent?.trim()||"",
      noteTitle:root?.querySelector(".alpha-activity-authority-note strong")?.textContent?.trim()||"",
      note:root?.querySelector(".alpha-activity-authority-note span")?.textContent?.trim()||"",
      disciplineIds:[...(root?.querySelectorAll(".alpha-activity-discipline")||[])].map(node=>node.dataset.disciplineId||null)
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
    await waitRuntime(page);await release(page);

    const setup=await page.evaluate(()=>{
      playerData=createDefaultPlayerData();
      setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      savePlayerData();
      const selected=selectChronicleOrigin("academy_menma","qa43110_origin");
      const completed=completeChronicleOriginPrologue("academy_menma",["qa43110_complete"]);
      const snapshot=getAcademyTeamFormationSnapshot();
      const expected=["academy_hinata","academy_kakashi"];
      if(!expected.every(id=>snapshot.eligibleCandidateVariantIds.includes(id))){
        return{selected,completed,eligible:snapshot.eligibleCandidateVariantIds,error:"expected_candidates_missing"};
      }
      const one=selectAcademyTeamFormationTeammate(1,expected[0]);
      const two=selectAcademyTeamFormationTeammate(2,expected[1]);
      const formed=confirmAcademyTeamFormation("qa43110_team",expected);
      const continued=continueAcademyTeamFormationJourney();
      updateChronicleTutorialProgress43600({sandboxPopupSeen:true,practicalTipSeen:true,examsTipSeen:true},{save:true});
      return{
        selected,completed,one,two,formed,continued,
        team:getChronicleCurrentTeam43600(),
        playerTeamNames:(playerTeam||[]).map(row=>row&&row.name).filter(Boolean)
      };
    });
    assert(!setup.error,"Menma/Hinata/Kakashi unavailable: "+JSON.stringify(setup));
    assert.strictEqual(setup.selected?.success,true);
    assert.strictEqual(setup.completed?.success,true);
    assert.strictEqual(setup.formed?.success,true);
    assert.deepStrictEqual(setup.team.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    assert(setup.playerTeamNames.some(name=>/Naruto/i.test(name))||setup.playerTeamNames.some(name=>/Sasuke/i.test(name)),
      "fixture-heavy playerTeam precondition missing");

    await page.evaluate(()=>openKonohaPracticalFromVillage());
    await page.waitForSelector("#konoha-activity-screen[data-service-id='practical']",{state:"visible",timeout:10000});
    let practical=await activitySnapshot(page,"practical");
    assert.deepStrictEqual(practical.selectable,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.deepStrictEqual(practical.helper,practical.selectable);
    assert.deepStrictEqual(practical.data.characters.map(row=>row.id),practical.selectable);
    assert(!/Kage Naruto|Jonin Sasuke/i.test(practical.text),"fixture/demo shinobi leaked into Practical");
    assert.strictEqual(practical.noteTitle,"TRAINING RESULTS");
    assert(!/runtime|resolver|authority/i.test(practical.subtitle+" "+practical.note),"developer-facing Practical copy leaked");
    assert.deepStrictEqual(practical.disciplineIds,["nin","tai","gen","buki","fuin","kin","stamina"]);
    await page.screenshot({path:path.join(OUT,"01-practical-current-team.png"),fullPage:true});

    await page.evaluate(()=>changeKonohaPracticalCharacter(1));
    practical=await activitySnapshot(page,"practical");
    assert.strictEqual(practical.data.selectedCharacterId,"academy_hinata");
    await page.evaluate(()=>changeKonohaPracticalCharacter(1));
    practical=await activitySnapshot(page,"practical");
    assert.strictEqual(practical.data.selectedCharacterId,"academy_kakashi");

    await page.evaluate(()=>openKonohaExamFromVillage());
    await page.waitForSelector("#konoha-activity-screen[data-service-id='exams']",{state:"visible",timeout:10000});
    const exams=await activitySnapshot(page,"exams");
    assert.deepStrictEqual(exams.selectable,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.deepStrictEqual(exams.data.characters.map(row=>row.id),exams.selectable);
    assert(!/Kage Naruto|Jonin Sasuke/i.test(exams.text),"fixture/demo shinobi leaked into Exams");
    assert.strictEqual(exams.noteTitle,"EXAM RECORD");
    assert(exams.note.includes("Rank Promotion is earned separately."),"natural Exam Rank distinction missing");
    assert(!/runtime|resolver|authority/i.test(exams.subtitle+" "+exams.note),"developer-facing Exam copy leaked");
    assert.deepStrictEqual(exams.disciplineIds,["nin","tai","gen","buki","fuin","kin","stamina"]);
    await page.screenshot({path:path.join(OUT,"02-exams-current-team.png"),fullPage:true});

    const diagnostics=await page.evaluate(()=>runPhase2KonohaPlayerSurfaces43110Diagnostics());
    assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));
    await gate.assertClean("phase2-konoha-player-surfaces");
    console.log(JSON.stringify({
      pass:true,issue:431,
      currentTeam:["academy_menma","academy_hinata","academy_kakashi"],
      practicalUsesCommittedTeam:true,examsUseCommittedTeam:true,
      trainingGroundRosterUntouched:true,developerFixtureLeak:false,
      disciplineAccents:true,naturalPlayerCopy:true,browserGoldenClaimed:false
    },null,2));
  }finally{await context.close();await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
