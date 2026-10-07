#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path");
const {chromium}=require("playwright");
const BASE=process.env.ISSUE_576_BASE_URL||"http://127.0.0.1:8080/index.html";
const MODULE_URL=new URL("runtime/alpha-discipline-curriculum-profiles-57600.js",BASE).href;
const OUT="artifacts/issue-576-expert-master-curriculum";fs.mkdirSync(OUT,{recursive:true});
(async()=>{
  const browser=await chromium.launch({headless:true});const page=await browser.newPage();
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>!!(globalThis.SC_PHASE2_DISCIPLINE_STAT_GROWTH_44800&&globalThis.SC_CHRONICLE_STATE_MANIFEST_43600),null,{timeout:30000});
    await page.evaluate(()=>{
      playerData=createDefaultPlayerData();setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);savePlayerData();
      selectChronicleOrigin("academy_menma","qa576_probe");completeChronicleOriginPrologue("academy_menma",["qa576_probe_complete"]);
      selectAcademyTeamFormationTeammate(1,"academy_hinata");selectAcademyTeamFormationTeammate(2,"academy_kakashi");confirmAcademyTeamFormation("qa576_probe_team",["academy_hinata","academy_kakashi"]);continueAcademyTeamFormationJourney();
      const c=getPlayerCharacter("academy_menma");c.stats.nin=16;c.stats.gen=16;c.stats.tai=16;savePlayerData();
    });
    await page.addScriptTag({url:MODULE_URL});
    const out=await page.evaluate(()=>{
      const safe=(fn)=>{try{return fn();}catch(error){return{threw:String(error&&error.stack||error)}}};
      const contexts={
        nin:safe(()=>createKonohaPracticalAttemptContext("academy_menma","nin")),
        gen:safe(()=>createKonohaPracticalAttemptContext("academy_menma","gen")),
        tai:safe(()=>createKonohaPracticalAttemptContext("academy_menma","tai"))
      };
      const minimal={characterId:"academy_menma",disciplineId:"gen",statValue:16,disciplineLevel:1,disciplineExp:0};
      return{
        contexts,
        minimalResolution:safe(()=>resolveKonohaPracticalAttempt({...minimal})),
        practicalFunction:String(createKonohaPracticalAttemptContext),
        resolverFunction:String(resolveKonohaPracticalAttempt),
        profile:resolveDisciplineCurriculumProfile576("academy_menma","gen","practical"),
        directAttempt:executeDisciplineCurriculumAttempt576("practical","academy_menma","gen")
      };
    });
    fs.writeFileSync(path.join(OUT,"practical-context-probe.json"),JSON.stringify(out,null,2));
    console.log(JSON.stringify(out));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
