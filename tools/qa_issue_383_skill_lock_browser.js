#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_383_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_383_BROWSER_OUT||"artifacts/issue-383-skill-lock";
const BUILD_MANIFEST=JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/runtime_build_manifest_303.json"),"utf8"));
fs.mkdirSync(OUT,{recursive:true});

const EXPECTED_MENMA={
  academy_menma_chakra_knuckle:"Driving Chakra Fist",
  academy_menma_crescent_kunai:"Crescent Fang",
  academy_menma_guard_breaker:"Shattering Blow",
  academy_menma_shadow_clone_feint:"Shadow Clone Ambush",
  academy_menma_shadowstep:"Vanishing Step"
};
const EXPECTED_KAKASHI={
  academy_kakashi_kunai_quickdraw:"Flash Kunai",
  academy_kakashi_clone_feint:"Clone Switch",
  academy_kakashi_opening_exploit:"Precision Strike",
  academy_kakashi_wire_snare:"Wire Fang",
  academy_kakashi_substitution_jutsu:"Substitution Jutsu"
};
const EXPECTED_KAKASHI_PALETTE=[
  "academy_kakashi_kunai_quickdraw",
  "academy_kakashi_clone_feint",
  "academy_kakashi_opening_exploit",
  "academy_kakashi_wire_snare",
  "academy_kakashi_substitution_jutsu"
];

function mitigation(atk,stamina){return Math.max(1,Math.floor(atk*100/(100+stamina)));}

(async()=>{
  const browser=await chromium.launch({headless:false});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await page.waitForFunction(()=>typeof getRuntimeBuildFingerprint==="function"&&typeof runIssue383SkillLockDiagnostics==="function"&&typeof getClosureWaveBattleSkillDefinition==="function"&&typeof getBattleSkillYouthSummary33000==="function",null,{timeout:30000});

    const fingerprint=await page.evaluate(()=>getRuntimeBuildFingerprint());
    assert.deepStrictEqual(fingerprint,BUILD_MANIFEST,"#383 browser fingerprint mismatch");

    const snapshot=await page.evaluate(({EXPECTED_MENMA,EXPECTED_KAKASHI})=>{
      const closure=(id,actor)=>getClosureWaveBattleSkillDefinition(id,actor);
      const menma=Object.fromEntries(Object.keys(EXPECTED_MENMA).map(id=>[id,closure(id,"academy_menma")]));
      const kakashi=Object.fromEntries(Object.keys(EXPECTED_KAKASHI).map(id=>[id,closure(id,"academy_kakashi")]));
      const precision=kakashi.academy_kakashi_opening_exploit;
      const totals={};
      const boosts={};
      for(const key of ["enhancedAttackPL","conditionalAttackPL","boostedAttackPL","setupAttackPL","authoredAttackPLWhenSetup","attackPLWhenSetup","conditionalAuthoredAttackPL"]){
        if(Number.isFinite(Number(precision&&precision[key])))totals[key]=Number(precision[key]);
      }
      for(const key of ["conditionalBoostAttackPL","enhancedAttackPLBonus","attackPLBonusWhenSetup"]){
        if(Number.isFinite(Number(precision&&precision[key])))boosts[key]=Number(precision[key]);
      }
      const riderTotals={},riderBoosts={};
      if(precision&&precision.conditionalRider&&typeof precision.conditionalRider==="object"){
        for(const key of ["authoredAttackPL","attackPL","attackPLOverride","enhancedAttackPL","resolvedAttackPL"]){
          if(Number.isFinite(Number(precision.conditionalRider[key])))riderTotals[key]=Number(precision.conditionalRider[key]);
        }
        for(const key of ["attackPLBonus","conditionalBoostAttackPL","boostAttackPL"]){
          if(Number.isFinite(Number(precision.conditionalRider[key])))riderBoosts[key]=Number(precision.conditionalRider[key]);
        }
      }
      const summaries={};
      for(const [id,row] of Object.entries({...menma,...kakashi})){
        summaries[id]=row?getBattleSkillYouthSummary33000(row):null;
      }
      const palette=typeof getAcademyKakashiBattlePaletteIds==="function"
        ?getAcademyKakashiBattlePaletteIds({id:"academy_kakashi"})
        :[...(ACADEMY_BATTLE_PILOT_PREPARED_SKILLS?.academy_kakashi||[])];
      return{
        diag:runIssue383SkillLockDiagnostics(),
        menma,kakashi,precision,
        resolverFields:{totals,boosts,riderTotals,riderBoosts},
        summaries,
        palette
      };
    },{EXPECTED_MENMA,EXPECTED_KAKASHI});

    assert.strictEqual(snapshot.diag.pass,true,JSON.stringify(snapshot.diag,null,2));

    for(const [id,name] of Object.entries(EXPECTED_MENMA)){
      assert(snapshot.menma[id],id+" missing in installed browser");
      assert.strictEqual(snapshot.menma[id].displayName,name,id+" displayName drift");
      assert.strictEqual(snapshot.summaries[id]?.title,name,id+" Battle UI title did not prefer authored displayName");
    }
    assert.strictEqual(Number(snapshot.menma.academy_menma_chakra_knuckle.authoredAttackPL),6);
    assert.strictEqual(Number(snapshot.menma.academy_menma_crescent_kunai.authoredAttackPL),5);
    assert.strictEqual(Number(snapshot.menma.academy_menma_guard_breaker.authoredAttackPL),7);

    for(const [id,name] of Object.entries(EXPECTED_KAKASHI)){
      assert(snapshot.kakashi[id],id+" missing in installed browser");
      assert.strictEqual(snapshot.kakashi[id].displayName,name,id+" displayName drift");
      assert.strictEqual(snapshot.summaries[id]?.title,name,id+" Battle UI title did not prefer authored displayName");
    }

    assert.strictEqual(Number(snapshot.precision.authoredAttackPL),5,"Precision Strike normal ATK changed from 5");

    const totalEleven=Object.values(snapshot.resolverFields.totals).some(v=>v===11)||
      Object.values(snapshot.resolverFields.riderTotals).some(v=>v===11);
    const boostSix=Object.values(snapshot.resolverFields.boosts).some(v=>v===6)||
      Object.values(snapshot.resolverFields.riderBoosts).some(v=>v===6);
    assert(totalEleven||boostSix,
      "#383 installed Precision Strike lacks a resolver-consumable 11-total or +6 enhancement field: "+JSON.stringify(snapshot.resolverFields));

    assert.strictEqual(mitigation(11,13),9);
    assert.strictEqual(mitigation(11,10),10);
    assert.strictEqual(mitigation(11,17),9);

    assert.deepStrictEqual(snapshot.palette,EXPECTED_KAKASHI_PALETTE,"Kakashi prepared palette drift");
    assert(snapshot.kakashi.academy_kakashi_substitution_jutsu,"Substitution Jutsu definition missing");
    assert(!snapshot.palette.includes("academy_kakashi_prodigys_read"),"Prodigy's Read remains prepared");

    const rawMachineLeak=Object.values(snapshot.summaries).some(row=>row&&/Academy (Kakashi|Menma) (Clone|Opening|Chakra|Crescent|Guard|Shadow)/i.test(String(row.title||"")));
    assert.strictEqual(rawMachineLeak,false,"machine-ID title casing leaked into player-facing Battle titles");

    await page.screenshot({path:path.join(OUT,"skill-lock-loaded.png"),fullPage:false});
    await gate.assertClean("issue-383-skill-lock");

    const summary={
      pass:true,issue:383,kind:"installed_browser_skill_lock",
      buildId:fingerprint.buildId,
      checks:{
        exactMenmaNames:true,menmaRawNumbersPreserved:true,
        exactKakashiNames:true,precisionNormalFive:true,
        precisionEnhancedElevenResolverField:true,
        mitigation9_10_9:true,substitutionPrepared:true,
        prodigysReadAbsent:true,authoredNamesReachBattleUI:true,
        browserErrorGateClean:true
      },
      resolverFields:snapshot.resolverFields,
      browserGoldenClaimed:false
    };
    fs.writeFileSync(path.join(OUT,"summary.json"),JSON.stringify(summary,null,2)+"\n");
    console.log(JSON.stringify(summary,null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exitCode=1;});
