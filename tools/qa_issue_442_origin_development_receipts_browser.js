#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");

const BASE=process.env.ISSUE_442_BROWSER_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.ISSUE_442_BROWSER_OUT||"artifacts/issue-442-origin-development-receipts";
fs.mkdirSync(OUT,{recursive:true});

async function release(page){
  await page.evaluate(()=>{
    try{releaseAlphaFrontDoor33300?.();}catch(_){}
    try{globalThis.SC_ALPHA_BROWSER_ONBOARDING_FIXES_33400?.release?.();}catch(_){}
    const game=document.querySelector(".game-container");if(game){game.removeAttribute("data-alpha-front-door-locked");game.inert=false;}
    for(const id of ["sc-alpha-front-door-33300","sc-alpha-front-door-33400"])document.getElementById(id)?.remove();
  });
}
async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_DISCIPLINE_DEVELOPMENT_LEDGER_442&&
    globalThis.SC_ACADEMY_ORIGIN_REWARD_SPECTRUM_440&&
    globalThis.SC_ALPHA_ORIGIN_32900&&
    typeof globalThis.appendAcademyOriginRewardReceipt440==="function"
  ),null,{timeout:30000});
  await release(page);
}
async function freshOrigin(browser,variant,label){
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
  await waitRuntime(page);
  const start=await page.evaluate(({variant,label})=>{
    playerData=createDefaultPlayerData();
    if(typeof setCharacterOwnershipRuntimeAuthority==="function")setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    if(typeof savePlayerData==="function")savePlayerData();
    const select=selectChronicleOrigin(variant,label);
    return{select,owned:playerData.acquisition?.ownedCharactersByVariantId?.[variant]||null};
  },{variant,label});
  assert.strictEqual(start.select?.success,true,label+" Origin select failed "+JSON.stringify(start));
  assert(start.owned&&start.owned.ownedCharacterId,label+" exact owned Character missing");
  return{context,page,gate};
}
async function directDevelopment(browser,{variant,occurrence,fact,discipline,expectedExp,expectedLine,label}){
  const {context,page,gate}=await freshOrigin(browser,variant,label);
  try{
    const result=await page.evaluate(({variant,occurrence,fact})=>{
      const commit=SC_ALPHA_ORIGIN_32900.commitOccurrence(variant,occurrence,fact,[],{});
      const lines=["REWARDS"];appendAcademyOriginRewardReceipt440(lines,variant);
      const snapshot=getDisciplineDevelopmentSnapshot442(variant);
      const receipts=(playerData.activityHistory||[]).filter(row=>row?.type==="discipline_development"&&row.subjectVariantId===variant);
      return{commit,lines,snapshot,receipts,ryo:Number(playerData.ryo)||0};
    },{variant,occurrence,fact});
    assert.strictEqual(result.commit?.success,true,label+" occurrence commit failed");
    assert.strictEqual(Number(result.snapshot?.disciplineProgression?.[discipline]?.exp)||0,expectedExp,label+" persistent ledger EXP mismatch");
    assert(result.lines.some(line=>line.includes(expectedLine)),label+" Receipt projection missing "+expectedLine+" :: "+JSON.stringify(result.lines));
    assert(result.receipts.some(row=>row.disciplineId===discipline&&Number(row.expGranted)>0),label+" development receipt missing");
    assert(result.receipts.every(row=>row.subjectOwnedCharacterId),label+" receipt did not preserve owned Character identity");
    const raw=result.lines.join("\n");
    assert(!/qualificationId|significance|sourceOccurrenceId|progressionSlotId/.test(raw),label+" raw CE/provenance internals leaked");
    await gate.assertClean(label);
    return result;
  }finally{await context.close();}
}
async function storySnapshot(page){
  return page.evaluate(()=>{
    const rt=globalThis.getActiveStorySceneRuntime?.(),beat=globalThis.getCurrentStorySceneBeat?.();
    const root=document.getElementById("story-scene-presentation-layer");
    const stage=root?.querySelector(".sc-chronicle-stage")||root?.querySelector(".sc-story-stage");
    return{
      beatId:rt?.beatId||null,mode:beat?.mode||null,
      text:root?.querySelector(".sc-story-text")?.textContent?.trim()||"",
      cueKind:root?.dataset.scCueKind||null,
      choices:[...(root?.querySelectorAll(".sc-story-choice")||[])].map(n=>n.textContent.trim()).filter(Boolean),
      primary:root?.querySelector(".sc-chronicle-primary")?.textContent?.trim()||"",
      stageVisible:!!stage
    };
  });
}
async function advanceOne(page){
  const before=await storySnapshot(page);
  assert.notStrictEqual(before.mode,"choice","advanceOne on choice "+before.beatId);
  const stage=page.locator("#story-scene-presentation-layer .sc-chronicle-stage,#story-scene-presentation-layer .sc-story-stage").first();
  await stage.waitFor({state:"visible",timeout:8000});
  await stage.click({position:{x:30,y:30}});
  await page.waitForFunction(old=>{
    const rt=globalThis.getActiveStorySceneRuntime?.(),root=document.getElementById("story-scene-presentation-layer");
    const text=root?.querySelector(".sc-story-text")?.textContent?.trim()||"";
    return !rt||rt.beatId!==old.beatId||text!==old.text;
  },{beatId:before.beatId,text:before.text},{timeout:8000});
}
async function advanceUntil(page,target,max=140){
  for(let i=0;i<max;i++){
    const row=await storySnapshot(page);
    if(row.beatId===target)return row;
    if(row.mode==="choice")throw new Error("choice "+row.beatId+" reached before "+target);
    await advanceOne(page);
  }
  throw new Error("advanceUntil exceeded "+target);
}
async function choose(page,label,nextBeat){
  const button=page.locator("#story-scene-presentation-layer .sc-story-choice").filter({hasText:label}).first();
  await button.waitFor({state:"visible",timeout:8000});
  await button.click();
  if(nextBeat)await page.waitForFunction(id=>globalThis.getActiveStorySceneRuntime?.()?.beatId===id,nextBeat,{timeout:8000});
}

async function proveKurenaiInstalledReceipt(browser){
  const {context,page,gate}=await freshOrigin(browser,"academy_kurenai","issue442_kurenai_real_route");
  try{
    const launch=await page.evaluate(()=>beginAlphaChronicleOriginPrologue());
    assert.strictEqual(launch?.success,true,"Kurenai launch failed");
    await page.waitForFunction(()=>document.getElementById("story-scene-presentation-layer")?.dataset.scSceneBoard==="true",null,{timeout:15000});

    await advanceUntil(page,"kur_approach");
    await choose(page,"Send a false Kurenai","kur_stage1_false_01");
    await advanceUntil(page,"kur_stage2_false");
    await choose(page,"Rush the bell","kur_stage2_false_rush_01");
    await advanceUntil(page,"kur_stage3_false_rush");
    await choose(page,"Pretend to withdraw","kur_resolve_false_rush_withdraw");
    await advanceUntil(page,"kur_receipt",160);
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="kur_receipt"&&document.getElementById("story-scene-presentation-layer")?.dataset.scCueKind==="record",null,{timeout:10000});

    const proof=await page.evaluate(()=>{
      const root=document.getElementById("story-scene-presentation-layer");
      const text=root?.querySelector(".sc-story-text")?.textContent?.trim()||"";
      const receipts=(playerData.activityHistory||[]).filter(row=>row?.type==="discipline_development"&&row.subjectVariantId==="academy_kurenai");
      return{
        text,
        local:{...(getActiveStorySceneRuntime?.()?.localContext||{})},
        receipts,
        ledger:getDisciplineDevelopmentSnapshot442("academy_kurenai"),
        purseReceipts:(playerData.activityHistory||[]).filter(row=>row?.type==="origin_completion_reward"||row?.rewardSourceId==="origin_completion_starting_purse_ryo_01").length
      };
    });
    assert.strictEqual(proof.local.kurenaiStage1,"false_kurenai");
    assert.strictEqual(proof.local.kurenaiStage2,"rush_bell");
    assert.strictEqual(proof.local.kurenaiStage3,"pretend_withdraw");
    assert.strictEqual(proof.local.kurenaiOutcome,"partial_loss");
    assert(proof.text.includes("ACADEMY KURENAI")&&proof.text.includes("REWARDS"),"Kurenai Chronicle Receipt missing");
    assert.strictEqual((proof.text.match(/Origin Starting Purse: \+100 Ryō\./g)||[]).length,1,"Kurenai purse duplicated/missing");
    assert.strictEqual((proof.text.match(/Genjutsu Development: \+1/g)||[]).length,3,"Kurenai false/rush/withdraw did not visibly project 1+1+1");
    assert(proof.text.includes("false Kurenai was read"),"Kurenai Stage 1 reason missing");
    assert(proof.text.includes("rushing from the false Kurenai was resisted"),"Kurenai Stage 2 reason missing");
    assert(proof.text.includes("withdrawal feint was resisted"),"Kurenai Stage 3 reason missing");
    assert.strictEqual(Number(proof.ledger?.disciplineProgression?.genjutsu?.exp)||0,3,"Kurenai ledger did not persist Genjutsu 3");
    assert.deepStrictEqual(proof.receipts.map(r=>r.requestedExp),[1,1,1]);
    assert.deepStrictEqual(proof.receipts.map(r=>r.expGranted),[1,1,1]);
    assert(!/qualificationId|significance|sourceOccurrenceId|progressionSlotId/.test(proof.text),"Kurenai Receipt leaked CE internals");

    await page.screenshot({path:path.join(OUT,"kurenai-false-rush-withdraw-receipt.png"),fullPage:true});

    const beforeCount=proof.receipts.length;
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);
    await page.waitForFunction(()=>globalThis.getActiveStorySceneRuntime?.()?.beatId==="kur_receipt"&&document.getElementById("story-scene-presentation-layer")?.dataset.scCueKind==="record",null,{timeout:15000});
    const reloaded=await page.evaluate(()=>({
      text:document.querySelector("#story-scene-presentation-layer .sc-story-text")?.textContent?.trim()||"",
      exp:Number(getDisciplineDevelopmentSnapshot442("academy_kurenai")?.disciplineProgression?.genjutsu?.exp)||0,
      count:(playerData.activityHistory||[]).filter(row=>row?.type==="discipline_development"&&row.subjectVariantId==="academy_kurenai").length
    }));
    assert.strictEqual(reloaded.exp,3,"reload lost Kurenai Genjutsu EXP");
    assert.strictEqual(reloaded.count,beforeCount,"reload/reopen duplicated Kurenai development receipts");
    assert.strictEqual((reloaded.text.match(/Genjutsu Development: \+1/g)||[]).length,3,"reload changed Kurenai visible development");
    await gate.assertClean("issue442-kurenai-installed-receipt");
    return{exp:reloaded.exp,receiptCount:reloaded.count};
  }finally{await context.close();}
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const hinata=await directDevelopment(browser,{
      variant:"academy_hinata",occurrence:"occ_origin_hinata_controlled_hyuga_spar_resolution",
      fact:{controlledSparCompleted:true,demonstratedResponses:["wait_for_opening","wait_hold_ground","answer_with_form"]},
      discipline:"taijutsu",expectedExp:3,expectedLine:"Taijutsu Development: +1",label:"issue442-hinata"
    });
    const kushina=await directDevelopment(browser,{
      variant:"academy_kushina",occurrence:"occ_origin_kushina_residual_seal_work_resolution",
      fact:{qualifyingFuinjutsuWorkCompleted:true,crisisChoice:"contain_damaged_seal"},
      discipline:"fuinjutsu",expectedExp:2,expectedLine:"Fūinjutsu Development: +2",label:"issue442-kushina"
    });
    const metalTai=await directDevelopment(browser,{
      variant:"academy_metal_lee",occurrence:"occ_origin_metal_private_training_resolution",
      fact:{qualifyingPrivateTaijutsuOrConditioningWorkCompleted:true,privateTrainingChoice:"spinning_kick"},
      discipline:"taijutsu",expectedExp:2,expectedLine:"Taijutsu Development: +2",label:"issue442-metal-taijutsu"
    });
    const metalSta=await directDevelopment(browser,{
      variant:"academy_metal_lee",occurrence:"occ_origin_metal_private_training_resolution",
      fact:{qualifyingPrivateTaijutsuOrConditioningWorkCompleted:true,privateTrainingChoice:"conditioned_endurance"},
      discipline:"stamina",expectedExp:1,expectedLine:"Stamina Development: +1",label:"issue442-metal-stamina"
    });
    const iwabee=await directDevelopment(browser,{
      variant:"academy_iwabee",occurrence:"occ_origin_iwabee_training_ground_reshape_resolution",
      fact:{trainingGroundReshapeObjectiveCompletedByIwabee:true},
      discipline:"ninjutsu",expectedExp:2,expectedLine:"Ninjutsu Development: +2",label:"issue442-iwabee"
    });

    const obito=await (async()=>{
      const {context,page,gate}=await freshOrigin(browser,"academy_obito","issue442-obito");
      try{
        const result=await page.evaluate(()=>{
          const commit=SC_ALPHA_ORIGIN_32900.commitOccurrence("academy_obito","occ_origin_obito_formal_training_entitlement_resolution",{formalTrainingEntitlement:"FULL"},[],{});
          const lines=["REWARDS"];appendAcademyOriginRewardReceipt440(lines,"academy_obito");
          return{
            commit,lines,
            development:(playerData.activityHistory||[]).filter(row=>row?.type==="discipline_development"&&row.subjectVariantId==="academy_obito")
          };
        });
        assert.strictEqual(result.commit?.success,true);
        assert(result.lines.some(line=>line.includes("Formal Training: +1 Ninjutsu, +1 Taijutsu, +1 Bukijutsu, +1 Stamina Current Stats.")),"Obito Current-Stat package drift");
        assert.strictEqual(result.development.length,0,"Obito incorrectly received duplicate Discipline EXP");
        await gate.assertClean("issue442-obito");
        return result;
      }finally{await context.close();}
    })();

    const kurenai=await proveKurenaiInstalledReceipt(browser);

    console.log(JSON.stringify({
      pass:true,issue:442,
      productionLedger:true,
      hinataTaijutsu:true,
      kushinaFuinjutsu:true,
      metalTaijutsu:true,
      metalStamina:true,
      iwabeeNinjutsu:true,
      obitoCurrentStatsNoDuplicateDevelopment:true,
      kurenaiInstalledReceipt:kurenai,
      hiddenCeInternals:false,
      browserGoldenClaimed:false
    },null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
