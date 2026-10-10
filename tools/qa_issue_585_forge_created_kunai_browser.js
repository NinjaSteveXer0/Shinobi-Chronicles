#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const {installBrowserRuntimeErrorGate}=require("./browser_runtime_error_gate_311.js");
const BASE=process.env.SC585_BASE_URL||"http://127.0.0.1:8080/index.html";
const OUT=process.env.SC585_OUT||"artifacts/forge-created-kunai-585";
fs.mkdirSync(OUT,{recursive:true});

async function waitRuntime(page){
  await page.waitForFunction(()=>!!(
    globalThis.SC_FORGE_CREATED_KUNAI_58500&&
    typeof globalThis.commitForgeCreatedKunai58500==="function"&&
    typeof globalThis.getDurableObjectRecord54500==="function"&&
    typeof globalThis.getDurableAcquisitionReceipt54500==="function"&&
    typeof globalThis.commitRetailKunaiWear55200==="function"&&
    typeof globalThis.repairRetailKunai55200==="function"
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
async function clearIntentionalReloadImageAborts(gate,label){
  const snap=await gate.snapshot();
  const unexpected=Array.isArray(snap.unexpected)?snap.unexpected:[];
  const invalid=unexpected.filter(event=>!(event&&event.kind==="requestfailed"&&event.resourceType==="image"&&event.message==="net::ERR_ABORTED"));
  assert.strictEqual(invalid.length,0,`#585 unexpected browser runtime errors during ${label}: ${JSON.stringify(invalid,null,2)}`);
  const count=unexpected.length;
  await gate.reset();
  return count;
}
function commissionSpec(operationId){
  return{
    craftOperationId:operationId,
    recipeId:"forge_create_precision_balanced_kunai_v1",
    branch:"forge",
    operation:"create",
    serviceHostId:"KON-A05",
    serviceHostAlias:"village:konoha:craft_quarter:forge",
    servicePermission:true,
    commissionerRef:"academy_kakashi",
    executorRef:"konoha_forge_service_executor_role_v1",
    executorCapabilityRefs:["executor_capability_forge_standard_weaponcraft_v1"],
    executorKnowledgeRefs:["recipe_knowledge_forge_create_precision_balanced_kunai_v1"],
    chronicleRef:"chronicle:qa:585:installed-browser"
  };
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const gate=await installBrowserRuntimeErrorGate(page);
  try{
    await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);

    const loader=await page.evaluate(()=>{
      const sources=[...document.scripts].map(node=>node.getAttribute("src")||"");
      const inventory=sources.indexOf("runtime/alpha-phase2-inventory-core-46100.js");
      const shop=sources.indexOf("runtime/alpha-phase2-basic-item-shop-51700.js");
      const forge=sources.indexOf("runtime/alpha-forge-created-kunai-58500.js");
      return{inventory,shop,forge,count:sources.filter(src=>src==="runtime/alpha-forge-created-kunai-58500.js").length};
    });
    assert.strictEqual(loader.count,1,"#585 Forge runtime must be production-loaded exactly once");
    assert(loader.inventory>=0&&loader.shop>loader.inventory&&loader.forge>loader.shop,`#585 dependency loader order invalid: ${JSON.stringify(loader)}`);

    const diagnostics=await page.evaluate(()=>runForgeCreatedKunai58500Diagnostics());
    assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics.failed));
    assert.strictEqual(diagnostics.browserGoldenClaimed,false);

    const seeded=await page.evaluate(()=>{
      localStorage.clear();
      playerData=createDefaultPlayerData();
      if(typeof setCharacterOwnershipRuntimeAuthority==="function")setCharacterOwnershipRuntimeAuthority(playerData.characterOwnership);
      if(typeof savePlayerData==="function")savePlayerData();
      const selected=selectChronicleOrigin("academy_kakashi","qa585_forge_origin");
      if(!selected||selected.success!==true)throw new Error("#585 canonical academy_kakashi Origin selection failed: "+JSON.stringify(selected));
      const owned=playerData.acquisition?.ownedCharactersByVariantId?.academy_kakashi||null;
      if(!owned||!owned.ownedCharacterId)throw new Error("#585 canonical academy_kakashi ownership missing after Origin selection");
      const kakashi=typeof getPlayerCharacter==="function"?getPlayerCharacter("academy_kakashi"):null;
      if(!kakashi)throw new Error("#585 canonical academy_kakashi commissioner missing after Origin selection");
      if(!Array.isArray(kakashi.equipment))kakashi.equipment=[];
      playerData.ryo=100;
      if(!Array.isArray(playerData.inventory))playerData.inventory=[];
      if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];
      playerData.inventory=playerData.inventory.filter(row=>!(!row?.instanceId&&(row?.id||row?.itemId)==="weapon_materials"));
      playerData.inventory.push({id:"weapon_materials",itemId:"weapon_materials",name:"Weapon Materials",quantity:2,rarity:"Common"});
      savePlayerData();
      return{
        selectedSuccess:selected.success===true,
        ownedCharacterId:owned.ownedCharacterId,
        commissionerId:kakashi.id||null,
        ryo:playerData.ryo,
        materials:playerData.inventory.filter(row=>row&&!row.instanceId&&(row.id||row.itemId)==="weapon_materials").reduce((sum,row)=>sum+(Number(row.quantity)||0),0)
      };
    });
    assert.strictEqual(seeded.selectedSuccess,true);
    assert.ok(seeded.ownedCharacterId,"#585 canonical owned Character id missing");
    assert.strictEqual(seeded.commissionerId,"academy_kakashi");
    assert.strictEqual(seeded.ryo,100);
    assert.strictEqual(seeded.materials,2);

    const spec=commissionSpec("forge585:browser:001");
    const made=await page.evaluate(input=>commitForgeCreatedKunai58500(input),spec);
    assert.strictEqual(made.success,true,JSON.stringify(made));
    assert.strictEqual(made.idempotent,false);
    assert.ok(made.instanceId);

    const committed=await page.evaluate(instanceId=>{
      const row=(playerData.inventory||[]).find(entry=>entry&&entry.instanceId===instanceId);
      const receipt=(playerData.activityHistory||[]).find(entry=>entry&&entry.type==="forge_created_durable_kunai"&&entry.instanceId===instanceId);
      const materials=(playerData.inventory||[]).filter(entry=>entry&&!entry.instanceId&&(entry.id||entry.itemId)==="weapon_materials").reduce((sum,entry)=>sum+(Number(entry.quantity)||0),0);
      return{
        ryo:playerData.ryo,materials,row:JSON.parse(JSON.stringify(row)),receipt:JSON.parse(JSON.stringify(receipt)),
        binding:getForgeCreatedKunaiBinding58500(instanceId),condition:getForgeCreatedKunaiCondition58500(instanceId),
        provenance:getDurableObjectRecord54500(instanceId),projection:projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId,equippedInstanceId:instanceId})
      };
    },made.instanceId);
    assert.strictEqual(committed.ryo,75);
    assert.strictEqual(committed.materials,1);
    assert.strictEqual(committed.row.baseDefinitionId,"kunai");
    assert.strictEqual(committed.row.resultPackageRef,"forge_result_precision_balanced_kunai_v1");
    assert.strictEqual(committed.condition.durabilityCurrent,10);
    assert.strictEqual(committed.condition.durabilityMax,10);
    assert.strictEqual(committed.binding.verified,true);
    assert.strictEqual(committed.provenance.events.length,1);
    assert.strictEqual(committed.provenance.events[0].eventType,"forge_creation");
    assert.strictEqual(committed.receipt.autoEquipped,false);
    assert.strictEqual(committed.projection.effectiveBukijutsuBonus,0,"#585 forged Kunai auto-activated without canonical equip truth");

    const replay=await page.evaluate(input=>commitForgeCreatedKunai58500(input),spec);
    assert.strictEqual(replay.success,true);assert.strictEqual(replay.idempotent,true);assert.strictEqual(replay.instanceId,made.instanceId);
    const replayState=await page.evaluate(instanceId=>({
      ryo:playerData.ryo,
      materials:(playerData.inventory||[]).filter(entry=>entry&&!entry.instanceId&&(entry.id||entry.itemId)==="weapon_materials").reduce((sum,entry)=>sum+(Number(entry.quantity)||0),0),
      exactInstances:(playerData.inventory||[]).filter(entry=>entry&&entry.instanceId===instanceId).length,
      receipts:(playerData.activityHistory||[]).filter(entry=>entry&&entry.type==="forge_created_durable_kunai"&&entry.craftOperationId==="forge585:browser:001").length
    }),made.instanceId);
    assert.deepStrictEqual(replayState,{ryo:75,materials:1,exactInstances:1,receipts:1});

    const equipped=await page.evaluate(instanceId=>{
      const row=playerData.inventory.find(entry=>entry&&entry.instanceId===instanceId);
      const kakashi=getPlayerCharacter("academy_kakashi");
      row.equippedBy="academy_kakashi";
      kakashi.equipment=(kakashi.equipment||[]).filter(entry=>!(entry&&entry.instanceId===instanceId));
      kakashi.equipment.push({itemId:"kunai",instanceId});
      return projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId,equippedInstanceId:instanceId});
    },made.instanceId);
    assert.strictEqual(equipped.packageActive,true);
    assert.strictEqual(equipped.effectiveBukijutsuBonus,1);
    assert.strictEqual(equipped.mutatesBaseBukijutsu,false);
    assert.strictEqual(equipped.mutatesBaseOrCurrentPl,false);

    const worn=await page.evaluate(instanceId=>commitForgeCreatedKunaiWear58500({instanceId,sourceOccurrenceId:"qa585:browser:wear:one",sourceId:"qa585_browser_kunai_use"}),made.instanceId);
    assert.strictEqual(worn.success,true,JSON.stringify(worn));
    assert.strictEqual(worn.condition.instanceId,made.instanceId);
    assert.strictEqual(worn.condition.durabilityCurrent,9);

    await gate.assertClean("forge-created-kunai-585-before-reload");
    await page.reload({waitUntil:"domcontentloaded",timeout:60000});
    await waitRuntime(page);await release(page);
    const reloadImageAborts=await clearIntentionalReloadImageAborts(gate,"intentional Forge save/reload");
    const reloaded=await page.evaluate(instanceId=>({condition:getForgeCreatedKunaiCondition58500(instanceId),binding:getForgeCreatedKunaiBinding58500(instanceId),provenance:getDurableObjectRecord54500(instanceId)}),made.instanceId);
    assert.strictEqual(reloaded.binding.verified,true);
    assert.strictEqual(reloaded.condition.instanceId,made.instanceId);
    assert.strictEqual(reloaded.condition.durabilityCurrent,9,"#585 forged Kunai wear did not survive save/reload");
    assert.strictEqual(reloaded.provenance.events.length,1,"#585 wear/reload rewrote creation provenance");

    const repaired=await page.evaluate(instanceId=>repairForgeCreatedKunai58500({instanceId,sourceOccurrenceId:"qa585:browser:repair:one",sourceId:"qa585_browser_forge_repair"}),made.instanceId);
    assert.strictEqual(repaired.success,true,JSON.stringify(repaired));
    assert.strictEqual(repaired.condition.instanceId,made.instanceId);
    assert.strictEqual(repaired.condition.durabilityCurrent,10);
    const postRepair=await page.evaluate(instanceId=>({condition:getForgeCreatedKunaiCondition58500(instanceId),provenance:getDurableObjectRecord54500(instanceId)}),made.instanceId);
    assert.strictEqual(postRepair.condition.durabilityCurrent,10);
    assert.strictEqual(postRepair.provenance.events.length,1,"#585 repair rewrote creation provenance lineage");

    await gate.assertClean("forge-created-kunai-585");
    console.log(JSON.stringify({
      issue:585,pass:true,productionLoaded:true,dependencyOrder:"#545 -> #552 -> #585",canonicalCommissionerRoute:"academy_kakashi Origin ownership",exactInstanceId:made.instanceId,
      transaction:{weaponMaterials:"2 -> 1",ryo:"100 -> 75",durability:"10/10",autoEquip:false},
      exactForgedEquippedUsableBonus:1,idempotentReplay:true,wearProof:"10 -> 9",saveReloadWornProof:"9/10",repairProof:"9 -> 10",
      exactCreationProvenance:true,reloadImageAbortEvidence:reloadImageAborts,browserGoldenClaimed:false
    },null,2));
  }finally{
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
