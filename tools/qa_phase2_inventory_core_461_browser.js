#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.PHASE2_461_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.PHASE2_461_OUT||"artifacts/phase2-inventory-core-461";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_PHASE2_INVENTORY_CORE_46100&&
    typeof globalThis.getPhase2InventorySnapshot46100==="function"&&
    typeof globalThis.openPhase2InventoryCore46100==="function"
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

    const selected=selectChronicleOrigin("academy_menma","qa461_origin");
    const completed=completeChronicleOriginPrologue("academy_menma",["qa461_complete"]);
    const formation=getAcademyTeamFormationSnapshot();
    const mates=["academy_hinata","academy_kakashi"];
    if(!mates.every(id=>formation.eligibleCandidateVariantIds.includes(id))){
      return{error:"expected_candidates_missing",eligible:formation.eligibleCandidateVariantIds};
    }
    selectAcademyTeamFormationTeammate(1,mates[0]);
    selectAcademyTeamFormationTeammate(2,mates[1]);
    const formed=confirmAcademyTeamFormation("qa461_team",mates);
    const continued=continueAcademyTeamFormationJourney();
    if(typeof updateChronicleTutorialProgress43600==="function"){
      updateChronicleTutorialProgress43600({sandboxPopupSeen:true,openingChoice:"explore",recommendedRouteEnabled:false},{save:true});
    }

    addItemToInventory({id:"field_recovery_pill",name:"Field Recovery Pill"});
    addItemToInventory({id:"field_recovery_pill",name:"Field Recovery Pill"});
    addItemToInventory({id:"kunai",name:"Kunai"});
    addItemToInventory({id:"kunai",name:"Kunai"});
    addItemToInventory({id:"ninja_wire",name:"Ninja Wire"});

    const kunai=getAvailableEquipmentInstancesByItemId("kunai");
    const equipped=kunai.length?equipItemToCharacter(kunai[0].instanceId,"academy_menma"):false;

    playerData.battlePouch=normalizeBattlePouchSelection({itemIds:["field_recovery_pill"]});
    const wire=playerData.inventory.find(row=>row&&row.id==="ninja_wire"&&row.instanceId);
    if(wire){
      wire.sourceOccurrenceId="qa461-source-occurrence";
      wire.sourceRefs=["qa461-source-ref"];
    }
    savePlayerData();

    return{
      selected,completed,formed,continued,equipped,
      currentTeam:typeof getChronicleCurrentTeam43600==="function"?getChronicleCurrentTeam43600():null,
      snapshot:getPhase2InventorySnapshot46100()
    };
  });
}
async function stateDigest(page){
  return page.evaluate(()=>JSON.stringify({
    inventory:playerData.inventory,
    battlePouch:playerData.battlePouch,
    activityHistory:playerData.activityHistory,
    menmaEquipment:getPlayerCharacter("academy_menma")?.equipment||[]
  }));
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
    assert.strictEqual(setupResult.equipped,true,"real equipment API did not equip a Kunai instance");
    assert.deepStrictEqual(setupResult.currentTeam?.teamVariantIds,["academy_menma","academy_hinata","academy_kakashi"]);

    const initial=setupResult.snapshot;
    assert.strictEqual(initial.summary.stackIdentities,1);
    assert.strictEqual(initial.summary.stackUnits,2);
    assert.strictEqual(initial.summary.durableInstances,3);
    assert.strictEqual(initial.summary.equippedInstances,1);
    assert.strictEqual(initial.summary.preparedStacks,1);
    const kunaiInitial=initial.durable.filter(row=>row.itemId==="kunai");
    assert.strictEqual(kunaiInitial.length,2);
    assert.notStrictEqual(kunaiInitial[0].instanceId,kunaiInitial[1].instanceId);
    assert.strictEqual(kunaiInitial.filter(row=>row.equipment.equipped&&row.equipment.verified).length,1);
    const wireInitial=initial.durable.find(row=>row.itemId==="ninja_wire");
    assert(wireInitial&&wireInitial.sourceRefs.includes("qa461-source-ref"));

    const beforeOpen=await stateDigest(page);
    await page.click('.header-nav-tabs [data-alpha-route="inventory"]');
    await page.waitForSelector(".sc-inventory-core",{state:"visible",timeout:10000});

    const text=await page.locator(".sc-inventory-core").innerText();
    assert(text.includes("INVENTORY"));
    assert(text.includes("Field Recovery Pill"));
    assert(text.includes("OWNED ×2"));
    assert(text.includes("BATTLE POUCH · PREPARED"));
    assert(text.includes("DURABLE EQUIPMENT & TOOLS"));
    assert(text.includes("EQUIPPED · Academy Menma"));
    assert(text.includes("qa461-source-ref"));
    assert(text.includes("Not exposed on this current Inventory record."));
    assert(!/\b(EQUIP|PREPARE|USE|BUY|PURCHASE|CRAFT)\b/.test(
      (await page.locator(".sc-inventory-core button").allInnerTexts()).join(" ")
    ),"bounded Inventory surface exposed mutation controls");

    const kunaiDom=await page.locator('[data-inventory-instance-id]').evaluateAll(nodes=>nodes
      .filter(node=>node.textContent.includes("Kunai"))
      .map(node=>node.getAttribute("data-inventory-instance-id"))
    );
    assert.strictEqual(kunaiDom.length,2);
    assert.notStrictEqual(kunaiDom[0],kunaiDom[1],"DOM collapsed identical durable instances");
    await page.screenshot({path:path.join(OUT,"01-inventory-owned-state.png"),fullPage:true});

    const afterOpen=await stateDigest(page);
    assert.strictEqual(afterOpen,beforeOpen,"opening Inventory mutated ownership/preparation/history/equipment");

    await page.click(".sc-inventory-close");
    await page.click('.header-nav-tabs [data-alpha-route="inventory"]');
    await page.waitForSelector(".sc-inventory-core",{state:"visible",timeout:10000});
    const afterReopen=await stateDigest(page);
    assert.strictEqual(afterReopen,beforeOpen,"reopening Inventory mutated persistent truth");

    const beforeReload=await page.evaluate(()=>getPhase2InventorySnapshot46100());
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    await page.waitForFunction(()=>{
      const character=typeof getPlayerCharacter==="function"?getPlayerCharacter("academy_menma"):null;
      const equipped=(playerData&&Array.isArray(playerData.inventory)?playerData.inventory:[]).find(row=>row&&row.id==="kunai"&&row.equippedBy==="academy_menma");
      return !!(equipped&&character&&Array.isArray(character.equipment)&&character.equipment.some(entry=>entry&&entry.instanceId===equipped.instanceId&&entry.itemId==="kunai"));
    },null,{timeout:15000});
    await page.evaluate(()=>openOverlay("inventory"));
    await page.waitForSelector(".sc-inventory-core",{state:"visible",timeout:10000});
    const afterReload=await page.evaluate(()=>getPhase2InventorySnapshot46100());

    assert.deepStrictEqual(afterReload.summary,beforeReload.summary);
    assert.deepStrictEqual(
      afterReload.entries.map(row=>[row.itemId,row.quantity,row.instanceId,row.prepared,row.equipment.equipped,row.sourceRefs]),
      beforeReload.entries.map(row=>[row.itemId,row.quantity,row.instanceId,row.prepared,row.equipment.equipped,row.sourceRefs]),
      "save/load changed Inventory projection"
    );
    assert.strictEqual(afterReload.durable.filter(row=>row.itemId==="kunai").length,2,"reload duplicated/collapsed durable Kunai instances");
    assert(afterReload.durable.find(row=>row.itemId==="ninja_wire").sourceRefs.includes("qa461-source-ref"),"exact source hook did not survive save/load");
    await page.screenshot({path:path.join(OUT,"02-inventory-after-reload.png"),fullPage:true});

    const diagnostics=await page.evaluate(()=>runPhase2InventoryCore46100Diagnostics());
    assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));
    await gate.assertClean("phase2-inventory-core-461");

    console.log(JSON.stringify({
      pass:true,
      issue:461,
      realInventoryAPISetup:true,
      stackQuantityProjection:true,
      separateDurableInstances:true,
      equippedProjection:true,
      battlePouchPreparedProjection:true,
      exactSourceHook:true,
      openReopenReadOnly:true,
      saveReloadStable:true,
      uiMutationControls:false,
      browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
