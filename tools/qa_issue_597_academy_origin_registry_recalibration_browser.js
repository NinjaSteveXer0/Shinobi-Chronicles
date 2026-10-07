#!/usr/bin/env node
"use strict";

const assert=require("assert");
const fs=require("fs");
const path=require("path");
const {chromium}=require("playwright");

const ROOT=path.resolve(__dirname,"..");
const OUT=path.join(ROOT,"artifacts","issue-597-academy-origin-registry");
fs.mkdirSync(OUT,{recursive:true});

const EXPECTED={
  academy_hinata:{stats:{nin:8,tai:13,buki:6,fuin:5,kin:5,gen:6,stamina:10},basePL:12},
  academy_izuno:{stats:{nin:10,tai:9,buki:6,fuin:5,kin:6,gen:5,stamina:8},basePL:9},
  academy_mirai:{stats:{nin:9,tai:9,buki:12,fuin:6,kin:6,gen:13,stamina:10},basePL:12},
  academy_menma:{stats:{nin:10,tai:8,buki:6,fuin:5,kin:13,gen:7,stamina:11},basePL:12},
  academy_kushina:{stats:{nin:8,tai:9,buki:5,fuin:8,kin:5,gen:5,stamina:14},basePL:12},
  academy_kurenai:{stats:{nin:9,tai:7,buki:8,fuin:6,kin:5,gen:14,stamina:8},basePL:12},
  academy_iwabee:{stats:{nin:14,tai:11,buki:13,fuin:6,kin:5,gen:5,stamina:14},basePL:13},
  academy_metal_lee:{stats:{nin:6,tai:13,buki:9,fuin:5,kin:5,gen:5,stamina:14},basePL:13},
  academy_kakashi:{stats:{nin:16,tai:14,buki:15,fuin:8,kin:9,gen:10,stamina:14},basePL:15},
  academy_obito:{stats:{nin:11,tai:12,buki:10,fuin:5,kin:5,gen:6,stamina:13},basePL:12}
};
const STAT_IDS=["nin","tai","buki","fuin","kin","gen","stamina"];
function formula(stats){
  const v=STAT_IDS.map(id=>Number(stats[id])||0).sort((a,b)=>b-a);
  return Math.round((0.60*v[0])+(0.25*((v[0]+v[1]+v[2])/3))+(0.15*(v.reduce((a,b)=>a+b,0)/7)));
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1366,height:768}});
  const pageErrors=[];
  page.on("pageerror",error=>pageErrors.push(String(error&&error.message||error)));

  await page.goto("http://127.0.0.1:8080/index.html",{waitUntil:"domcontentloaded"});
  await page.evaluate(()=>localStorage.clear());
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>typeof window.commitDisciplineDevelopment448==="function",null,{timeout:15000});

  const fresh=await page.evaluate((expected)=>{
    const ids=Object.keys(expected);
    const statsOf=row=>Object.fromEntries(["nin","tai","buki","fuin","kin","gen","stamina"].map(id=>[id,Number(row&&row[id])||0]));
    return {
      registry:Object.fromEntries(ids.map(id=>{
        const row=getCharacterRegistryEntry(id);
        return [id,{baseStats:statsOf(row&&row.baseStats),basePL:Number(row&&row.basePL),formulaPL:calculateBasePL(row)}];
      })),
      runtime:Object.fromEntries(["academy_hinata","academy_mirai","academy_menma"].map(id=>{
        const row=playerTeam.find(character=>character&&character.id===id);
        return [id,row?{baseStats:statsOf(row.baseStats),currentStats:statsOf(row.stats),basePL:Number(row.basePL),currentPL:calculateCurrentPL(row),permanentPLBonus:Number(row.permanentPLBonus)||0}:null];
      }))
    };
  },EXPECTED);

  for(const [id,expected] of Object.entries(EXPECTED)){
    assert.deepStrictEqual(fresh.registry[id].baseStats,expected.stats,id+" browser Registry Base Stats mismatch");
    assert.equal(fresh.registry[id].basePL,expected.basePL,id+" browser Registry Base PL mismatch");
    assert.equal(fresh.registry[id].formulaPL,expected.basePL,id+" browser Formula PL mismatch");
    assert.equal(formula(fresh.registry[id].baseStats),expected.basePL,id+" independent Formula PL mismatch");
  }
  for(const id of ["academy_hinata","academy_mirai","academy_menma"]){
    assert(fresh.runtime[id],id+" runtime materialization missing");
    assert.deepStrictEqual(fresh.runtime[id].baseStats,EXPECTED[id].stats,id+" runtime Base Stats are not Registry-backed");
    assert.deepStrictEqual(fresh.runtime[id].currentStats,EXPECTED[id].stats,id+" fresh Current Stats do not start from corrected Base truth");
    assert.equal(fresh.runtime[id].basePL,EXPECTED[id].basePL,id+" runtime Base PL mismatch");
    assert.equal(fresh.runtime[id].permanentPLBonus,0,id+" hidden/direct permanent PL bonus detected");
  }

  const developed=await page.evaluate(()=>{
    const character=playerTeam.find(row=>row&&row.id==="academy_hinata");
    if(!character)throw new Error("Academy Hinata runtime missing");
    const ids=[];
    const grants=[3,3,3,1];
    for(let i=0;i<grants.length;i++){
      const receiptId="qa597-development-"+i;
      const result=commitDisciplineDevelopment448("academy_hinata","nin",grants[i],{
        source:"story",
        activityId:"qa597_registry_recalibration",
        sourceOccurrenceId:"qa597-occurrence-"+i,
        causalRootId:"qa597-root-"+i,
        progressionSlotId:"nin-registry-recalibration-"+i,
        receiptId
      });
      if(!result||result.success!==true)throw new Error("development commit failed at "+i+": "+JSON.stringify(result));
      ids.push(receiptId);
    }
    const recordRows=Array.isArray(activityHistory)?activityHistory.filter(row=>row&&ids.includes(row.receiptId)):[];
    let myClanHTML="";
    try{
      if(typeof CLAN_UI_STATE!=="undefined")CLAN_UI_STATE.inspectionTab="stats";
      if(typeof renderMyClanInspectionContent==="function")myClanHTML=String(renderMyClanInspectionContent(character)||"");
    }catch(_error){}
    return {
      receiptIds:ids,
      receiptCount:recordRows.length,
      baseStats:{...character.baseStats},
      currentStats:{...character.stats},
      basePL:Number(character.basePL),
      currentPL:calculateCurrentPL(character),
      rawCurrentPL:typeof calculateRawPLFromStats==="function"?calculateRawPLFromStats(character.stats):null,
      permanentPLBonus:Number(character.permanentPLBonus)||0,
      progression:getDisciplineDevelopmentSnapshot448("academy_hinata","nin","story"),
      myClanHTML
    };
  });

  assert.equal(developed.baseStats.nin,8,"persistent development mutated Hinata Base Ninjutsu");
  assert.equal(developed.currentStats.nin,9,"expected one legitimate Current-Stat breakthrough 8 -> 9");
  assert.equal(developed.progression.developmentExp,0,"breakthrough overflow result unexpected after exact 10 EXP");
  assert.equal(developed.receiptCount,4,"development provenance receipts missing before reload");
  assert.equal(developed.permanentPLBonus,0,"development introduced hidden/direct PL bonus");
  assert.equal(developed.currentPL,formula(developed.currentStats),"Current PL is not Formula-derived from Current Stats");
  assert(developed.myClanHTML.includes("<span>NIN</span><strong>9</strong>"),"My Clan Stats projection did not expose canonical Current NIN 9");

  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>typeof window.commitDisciplineDevelopment448==="function",null,{timeout:15000});

  const reloaded=await page.evaluate((receiptIds)=>{
    const character=playerTeam.find(row=>row&&row.id==="academy_hinata");
    const rows=Array.isArray(activityHistory)?activityHistory.filter(row=>row&&receiptIds.includes(row.receiptId)):[];
    let myClanHTML="";
    try{
      if(typeof CLAN_UI_STATE!=="undefined")CLAN_UI_STATE.inspectionTab="stats";
      if(typeof renderMyClanInspectionContent==="function")myClanHTML=String(renderMyClanInspectionContent(character)||"");
    }catch(_error){}
    return {
      baseStats:{...character.baseStats},
      currentStats:{...character.stats},
      basePL:Number(character.basePL),
      currentPL:calculateCurrentPL(character),
      permanentPLBonus:Number(character.permanentPLBonus)||0,
      receiptCount:rows.length,
      uniqueReceiptCount:new Set(rows.map(row=>row.receiptId)).size,
      progression:getDisciplineDevelopmentSnapshot448("academy_hinata","nin","story"),
      myClanHTML
    };
  },developed.receiptIds);

  assert.equal(reloaded.baseStats.nin,8,"reload replaced corrected Base Ninjutsu with saved Current truth");
  assert.equal(reloaded.currentStats.nin,9,"reload erased legitimate persistent Current-Stat development");
  assert.equal(reloaded.progression.developmentExp,0,"reload changed remaining Discipline Development EXP");
  assert.equal(reloaded.receiptCount,4,"reload erased or duplicated development provenance");
  assert.equal(reloaded.uniqueReceiptCount,4,"reload duplicated development receipt identities");
  assert.equal(reloaded.permanentPLBonus,0,"reload restored a retired hidden/direct PL bonus");
  assert.equal(reloaded.currentPL,formula(reloaded.currentStats),"reloaded Current PL is not Formula-derived from Current Stats");
  assert(reloaded.myClanHTML.includes("<span>NIN</span><strong>9</strong>"),"My Clan reload projection regressed to stale Base NIN");
  assert.deepStrictEqual(reloaded.baseStats,developed.baseStats,"Base package changed across save/reload");

  assert.deepStrictEqual(pageErrors,[],"browser page errors: "+pageErrors.join(" | "));

  const evidence={
    fresh,
    developed:{...developed,myClanHTML:undefined},
    reloaded:{...reloaded,myClanHTML:undefined},
    browserGoldenClaimed:false
  };
  fs.writeFileSync(path.join(OUT,"evidence.json"),JSON.stringify(evidence,null,2));
  console.log("Issue #597 Academy-Origin Registry browser/save QA: PASS");
  console.log(JSON.stringify({
    registryRows:Object.keys(EXPECTED).length,
    changedRuntimeRows:["academy_hinata","academy_mirai","academy_menma"],
    hinataBaseNin:reloaded.baseStats.nin,
    hinataCurrentNin:reloaded.currentStats.nin,
    currentPL:reloaded.currentPL,
    receiptCount:reloaded.receiptCount,
    browserGoldenClaimed:false
  },null,2));

  await page.evaluate(()=>localStorage.clear());
  await browser.close();
})().catch(async error=>{
  console.error(error&&error.stack||error);
  process.exitCode=1;
});
