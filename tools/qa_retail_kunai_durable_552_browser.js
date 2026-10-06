#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_552_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_552_OUT||"artifacts/phase2-retail-kunai-552";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_BASIC_ITEM_SHOP_51700&&
    typeof globalThis.commitPhase2BasicItemShopPurchase51700==="function"&&
    typeof globalThis.getRetailKunaiCondition55200==="function"&&
    typeof globalThis.commitRetailKunaiWear55200==="function"&&
    typeof globalThis.repairRetailKunai55200==="function"&&
    typeof globalThis.getDurableObjectRecord54500==="function"
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
async function seed(page,ryo=100){
  return page.evaluate(value=>{
    localStorage.clear();
    playerData=createDefaultPlayerData();
    playerData.ryo=value;
    if(!Array.isArray(playerData.inventory))playerData.inventory=[];
    if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];
    savePlayerData();
    return{ryo:playerData.ryo,inventory:playerData.inventory.length};
  },ryo);
}
async function openShop(page){
  const result=await page.evaluate(()=>openPhase2BasicItemShop51700());
  assert.strictEqual(result.success,true,JSON.stringify(result));
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
    assert.deepStrictEqual(await seed(page),{ryo:100,inventory:0});

    await openShop(page);
    const kunaiCard=page.locator('[data-shop517-item="kunai"]');
    await kunaiCard.waitFor({state:"visible",timeout:10000});
    const text=await kunaiCard.innerText();
    assert(text.includes("Kunai"));
    assert(text.includes("COMMON"));
    assert(text.includes("DURABLE · 10/10"));
    assert(text.includes("50 RYŌ"));
    await page.screenshot({path:path.join(OUT,"01-kunai-retail-row.png"),fullPage:true});

    await page.click('[data-shop517-buy="kunai"]');
    await page.waitForFunction(()=>{
      const row=(playerData.inventory||[]).find(entry=>entry&&entry.id==="kunai"&&entry.instanceId);
      return playerData.ryo===50&&row&&row.durabilityCurrent===10&&row.durabilityMax===10;
    },null,{timeout:10000});

    const purchased=await page.evaluate(()=>{
      const row=playerData.inventory.find(entry=>entry&&entry.id==="kunai"&&entry.instanceId);
      const receipt=(playerData.activityHistory||[]).find(entry=>entry&&entry.type==="item_shop_purchase"&&entry.itemId==="kunai");
      return{
        ryo:playerData.ryo,
        row:JSON.parse(JSON.stringify(row)),
        receipt:JSON.parse(JSON.stringify(receipt)),
        provenance:getDurableObjectRecord54500(row.instanceId),
        condition:getRetailKunaiCondition55200(row.instanceId)
      };
    });
    assert.strictEqual(purchased.ryo,50);
    assert.ok(purchased.row.instanceId);
    assert.strictEqual(purchased.row.equippedBy,null);
    assert.strictEqual(purchased.condition.durabilityCurrent,10);
    assert.strictEqual(purchased.condition.durabilityMax,10);
    assert.strictEqual(purchased.receipt.locationId,"KON-P09");
    assert.strictEqual(purchased.receipt.sourceId,"konoha_central_commercial_basic_item_shop");
    assert.strictEqual(purchased.receipt.instanceId,purchased.row.instanceId);
    assert.strictEqual(purchased.provenance.events.length,1);
    assert.strictEqual(purchased.provenance.events[0].eventType,"purchase");

    const retry=await page.evaluate(intent=>commitPhase2BasicItemShopPurchase51700("kunai",intent),purchased.receipt.purchaseIntentId);
    assert.strictEqual(retry.success,true);
    assert.strictEqual(retry.idempotent,true);
    assert.strictEqual(retry.instanceId,purchased.row.instanceId);
    const retryState=await page.evaluate(()=>({ryo:playerData.ryo,count:playerData.inventory.filter(row=>row&&row.id==="kunai").length,purchases:(playerData.activityHistory||[]).filter(row=>row&&row.type==="item_shop_purchase"&&row.itemId==="kunai").length}));
    assert.deepStrictEqual(retryState,{ryo:50,count:1,purchases:1});

    await page.evaluate(()=>openOverlay("inventory"));
    await page.waitForSelector(".sc-inventory-core",{state:"visible",timeout:10000});
    const inventoryText=await page.locator(".sc-inventory-core").innerText();
    assert(inventoryText.includes("Kunai"));
    assert(inventoryText.includes(purchased.row.instanceId));
    assert(inventoryText.includes(purchased.receipt.sourceOccurrenceId));
    await page.screenshot({path:path.join(OUT,"02-kunai-inventory-instance.png"),fullPage:true});

    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    const afterReload=await page.evaluate(instanceId=>({
      ryo:playerData.ryo,
      count:playerData.inventory.filter(row=>row&&row.id==="kunai").length,
      condition:getRetailKunaiCondition55200(instanceId),
      provenance:getDurableObjectRecord54500(instanceId)
    }),purchased.row.instanceId);
    assert.strictEqual(afterReload.ryo,50);
    assert.strictEqual(afterReload.count,1);
    assert.strictEqual(afterReload.condition.durabilityCurrent,10);
    assert.strictEqual(afterReload.provenance.events.length,1);

    const worn=await page.evaluate(instanceId=>commitRetailKunaiWear55200({instanceId,sourceOccurrenceId:"qa552:browser:wear:one",sourceId:"qa552_browser_compatible_action"}),purchased.row.instanceId);
    assert.strictEqual(worn.success,true,JSON.stringify(worn));
    assert.strictEqual(worn.condition.durabilityCurrent,9);
    assert.strictEqual(worn.condition.instanceId,purchased.row.instanceId);

    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    const wornReload=await page.evaluate(instanceId=>getRetailKunaiCondition55200(instanceId),purchased.row.instanceId);
    assert.strictEqual(wornReload.durabilityCurrent,9,"9/10 condition did not survive save/load");

    const repaired=await page.evaluate(instanceId=>repairRetailKunai55200({instanceId,sourceOccurrenceId:"qa552:browser:repair:one",sourceId:"qa552_browser_exact_repair"}),purchased.row.instanceId);
    assert.strictEqual(repaired.success,true,JSON.stringify(repaired));
    assert.strictEqual(repaired.condition.durabilityCurrent,10);
    assert.strictEqual(repaired.condition.instanceId,purchased.row.instanceId);
    const provenanceAfterRepair=await page.evaluate(instanceId=>getDurableObjectRecord54500(instanceId),purchased.row.instanceId);
    assert.strictEqual(provenanceAfterRepair.events.length,1,"wear/repair rewrote purchase provenance lineage");

    const diag=await page.evaluate(()=>runPhase2BasicItemShop51700Diagnostics());
    assert.strictEqual(diag.pass,true,JSON.stringify(diag));
    assert.strictEqual(diag.checks.browserGoldenClaimed,false);
    await gate.assertClean("phase2-retail-kunai-552");

    console.log(JSON.stringify({
      pass:true,
      issue:552,
      itemId:"kunai",
      retailPriceRyo:50,
      exactInstanceId:purchased.row.instanceId,
      purchaseDurability:"10/10",
      wearProof:"10 -> 9",
      saveReloadWornProof:"9/10",
      repairProof:"9 -> 10",
      exactPurchaseProvenance:true,
      purchaseRetryIdempotent:true,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
