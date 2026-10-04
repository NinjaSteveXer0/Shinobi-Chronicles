#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_517_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_517_OUT||"artifacts/phase2-basic-item-shop-517";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_BASIC_ITEM_SHOP_51700&&
    typeof globalThis.openPhase2BasicItemShop51700==="function"&&
    typeof globalThis.commitPhase2BasicItemShopPurchase51700==="function"&&
    typeof globalThis.getPhase2InventorySnapshot46100==="function"&&
    typeof globalThis.getPhase2LiveHudSnapshot49900==="function"
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
async function setup(page){
  return page.evaluate(()=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
    savePlayerData();

    const selected=selectChronicleOrigin("academy_menma","qa517_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",["qa517_complete"]);
    const formation=getAcademyTeamFormationSnapshot();
    const mates=["academy_hinata","academy_kakashi"];
    if(!mates.every(id=>formation.eligibleCandidateVariantIds.includes(id))){
      return{error:"expected_candidates_missing",eligible:formation.eligibleCandidateVariantIds};
    }
    selectAcademyTeamFormationTeammate(1,mates[0]);
    selectAcademyTeamFormationTeammate(2,mates[1]);
    const formed=confirmAcademyTeamFormation("qa517_team",mates);
    const continued=continueAcademyTeamFormationJourney();
    if(typeof updateChronicleTutorialProgress43600==="function"){
      updateChronicleTutorialProgress43600({sandboxPopupSeen:true,openingChoice:"explore",recommendedRouteEnabled:false},{save:true});
    }
    return{
      selected,completed,formed,continued,
      ryo:playerData.ryo,
      team:typeof getChronicleCurrentTeam43600==="function"?getChronicleCurrentTeam43600():null,
      inventory:getPhase2InventorySnapshot46100()
    };
  });
}
async function digest(page){
  return page.evaluate(()=>JSON.stringify({
    ryo:playerData.ryo,
    inventory:playerData.inventory,
    purchases:(playerData.activityHistory||[]).filter(row=>row&&row.type==="item_shop_purchase")
  }));
}
async function openShopFromVillage(page){
  await page.evaluate(()=>openOverlay("village"));
  await page.waitForSelector('.village-map-screen[data-village-id="konohagakure"]',{state:"visible",timeout:10000});
  await page.waitForSelector('[data-shop517-location="KON-P09"]',{state:"visible",timeout:10000});
  await page.dblclick('[data-shop517-location="KON-P09"]');
  await page.waitForSelector(".sc-shop517",{state:"visible",timeout:10000});
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);

    const setupResult=await setup(page);
    assert(!setupResult.error,JSON.stringify(setupResult));
    assert.strictEqual(setupResult.selected?.success,true);
    assert.strictEqual(setupResult.completed?.success,true);
    assert.strictEqual(setupResult.formed?.success,true);
    assert.strictEqual(setupResult.continued?.success,true);
    assert.strictEqual(setupResult.ryo,100,"Origin starting purse must provide the canonical affordable-shop benchmark");
    assert.deepStrictEqual(setupResult.team?.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);
    assert.strictEqual(setupResult.inventory.entries.length,0);

    await openShopFromVillage(page);
    const shopText=await page.locator(".sc-shop517").innerText();
    assert(shopText.includes("CENTRAL COMMERCIAL DISTRICT"));
    assert(shopText.includes("FIELD SUPPLIES"));
    assert(shopText.includes("100 RYŌ"));
    assert(shopText.includes("Field Recovery Pill"));
    assert(shopText.includes("25 RYŌ"));
    assert(shopText.includes("Standard Antidote"));
    assert(shopText.includes("Basic Scroll"));
    assert(shopText.includes("Weapon Materials"));
    assert(!shopText.includes("Normal"));
    await page.screenshot({path:path.join(OUT,"01-shop-catalogue.png"),fullPage:true});

    const beforeInspect=await digest(page);
    await page.evaluate(()=>globalThis.renderPhase2BasicItemShop51700?.(document.getElementById("overlay-content-container")));
    const afterInspect=await digest(page);
    assert.strictEqual(afterInspect,beforeInspect,"Shop render manufactured transaction state");

    await page.click('[data-shop517-buy="field_recovery_pill"]');
    await page.waitForFunction(()=>playerData.ryo===75&&getInventoryStackQuantity("field_recovery_pill")===1,null,{timeout:10000});
    const afterPurchase=JSON.parse(await digest(page));
    assert.strictEqual(afterPurchase.ryo,75);
    assert.strictEqual(afterPurchase.inventory.find(row=>row.id==="field_recovery_pill").quantity,1);
    assert.strictEqual(afterPurchase.purchases.length,1);
    assert.strictEqual(afterPurchase.purchases[0].unitPriceRyo,25);
    assert.strictEqual(afterPurchase.purchases[0].locationId,"KON-P09");
    assert(afterPurchase.inventory.find(row=>row.id==="field_recovery_pill").sourceRefs.includes(afterPurchase.purchases[0].occurrenceId));
    await page.screenshot({path:path.join(OUT,"02-after-affordable-purchase.png"),fullPage:true});

    const exactIntent=afterPurchase.purchases[0].purchaseIntentId;
    const retry=await page.evaluate(intent=>commitPhase2BasicItemShopPurchase51700("field_recovery_pill",intent),exactIntent);
    assert.strictEqual(retry.success,true);
    assert.strictEqual(retry.idempotent,true);
    const afterRetry=JSON.parse(await digest(page));
    assert.strictEqual(afterRetry.ryo,75,"same intent debited twice");
    assert.strictEqual(afterRetry.inventory.find(row=>row.id==="field_recovery_pill").quantity,1,"same intent granted twice");
    assert.strictEqual(afterRetry.purchases.length,1,"same intent duplicated transaction receipt");

    await page.click(".sc-shop517-actions button:last-child");
    await page.waitForSelector('.village-map-screen[data-village-id="konohagakure"]',{state:"visible",timeout:10000});
    const hudRyo=await page.evaluate(()=>getPhase2LiveHudSnapshot49900().ryo);
    assert.strictEqual(hudRyo,75,"HUD did not naturally project canonical post-purchase Ryō");

    await openShopFromVillage(page);
    assert((await page.locator('[data-shop517-item="field_recovery_pill"]').innerText()).includes("OWNED ×1"));

    await page.click(".sc-shop517-actions button:first-child");
    await page.waitForSelector(".sc-inventory-core",{state:"visible",timeout:10000});
    const inventoryText=await page.locator(".sc-inventory-core").innerText();
    assert(inventoryText.includes("Field Recovery Pill"));
    assert(inventoryText.includes("OWNED ×1"));
    assert(inventoryText.includes(afterPurchase.purchases[0].occurrenceId),"Inventory did not project exact Shop provenance reference");
    await page.screenshot({path:path.join(OUT,"03-inventory-projection.png"),fullPage:true});

    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    await page.waitForFunction(()=>playerData.ryo===75&&getInventoryStackQuantity("field_recovery_pill")===1,null,{timeout:15000});
    const afterReload=JSON.parse(await digest(page));
    assert.strictEqual(afterReload.ryo,75);
    assert.strictEqual(afterReload.inventory.find(row=>row.id==="field_recovery_pill").quantity,1);
    assert.strictEqual(afterReload.purchases.length,1);

    await openShopFromVillage(page);
    await page.click('[data-shop517-buy="standard_antidote"]');
    await page.waitForFunction(()=>playerData.ryo===55&&getInventoryStackQuantity("standard_antidote")===1,null,{timeout:10000});
    const beforeInsufficient=JSON.parse(await digest(page));
    await page.click('[data-shop517-buy="weapon_materials"]');
    await page.waitForFunction(()=>document.querySelector(".sc-shop517-feedback")?.textContent.includes("Insufficient Ryō"),null,{timeout:10000});
    const afterInsufficient=JSON.parse(await digest(page));
    assert.deepStrictEqual(afterInsufficient,beforeInsufficient,"insufficient-funds UI attempt mutated canonical state");
    assert.strictEqual(getQty(afterInsufficient.inventory,"weapon_materials"),0);
    await page.screenshot({path:path.join(OUT,"04-insufficient-funds.png"),fullPage:true});

    const beforeRefresh=await digest(page);
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    const afterRefresh=await digest(page);
    assert.strictEqual(afterRefresh,beforeRefresh,"refresh duplicated or rewrote committed transactions");

    const diag=await page.evaluate(()=>runPhase2BasicItemShop51700Diagnostics());
    assert.strictEqual(diag.pass,true,JSON.stringify(diag));
    await gate.assertClean("phase2-basic-item-shop-517");

    console.log(JSON.stringify({
      pass:true,
      issue:517,
      legitimateKonohaCommercialDistrictRoute:true,
      fixedCataloguePrices:true,
      canonicalRyoDebitExactlyOnce:true,
      canonicalInventoryGrantExactlyOnce:true,
      inventoryProjection:true,
      hudRyoProjection:true,
      closeReopenStable:true,
      saveReloadStable:true,
      insufficientFundsNoMutation:true,
      sameIntentRetryIdempotent:true,
      refreshNoDuplicate:true,
      characterAcquisitionOutOfScope:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});

function getQty(rows,itemId){
  return (rows||[]).filter(row=>row&&row.id===itemId).reduce((sum,row)=>sum+(row.instanceId?1:Number(row.quantity)||0),0);
}
