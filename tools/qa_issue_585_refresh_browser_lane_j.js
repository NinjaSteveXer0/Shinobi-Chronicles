#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const {chromium}=require("playwright");
const target=path.resolve(process.env.FORGE_585_TARGET||".qa-candidate/runtime/alpha-forge-created-kunai-58500.js");
const outDir=path.resolve(process.env.FORGE_585_OUT||"artifacts/forge-585-lane-j");
fs.mkdirSync(outDir,{recursive:true});
const source=fs.readFileSync(target,"utf8");
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1366,height:768}});
 await page.setContent("<!doctype html><html><body><main id='app'>Forge Lane J QA</main></body></html>");
 await page.addScriptTag({content:`
 window.playerData={ryo:100,inventory:[{id:'weapon_materials',itemId:'weapon_materials',quantity:2,rarity:'Common'}],activityHistory:[]};
 window.__chars={academy_kakashi:{id:'academy_kakashi',equipment:[]},academy_hinata:{id:'academy_hinata',equipment:[]}};
 window.getPlayerCharacter=id=>window.__chars[id]||null;
 window.getItemDefinition=id=>id==='weapon_materials'?{id,type:'material',stackable:true,rarity:'Common'}:id==='kunai'?{id,type:'weapon',stackable:false,rarity:'Common'}:null;
 window.getChronicleCurrentRyo43600=()=>window.playerData.ryo;
 window.getChronicleRunIdentity43600=()=>({runId:'chronicle:browser:585:lane-j'});
 window.savePlayerData=()=>true;
 window.__serial=0;
 window.__addr=s=>['durable_acquisition_v1',s.sourceOccurrenceId,s.sourceId,s.itemId,s.acquisitionKind].join('|');
 window.getDurableObjectRecord54500=id=>JSON.parse(JSON.stringify(window.playerData.durableObjectProvenance14800?.objectsByInstanceId?.[id]||null));
 window.getDurableAcquisitionReceipt54500=spec=>JSON.parse(JSON.stringify(window.playerData.durableObjectProvenance14800?.acquisitionReceipts?.[typeof spec==='string'?spec:window.__addr(spec)]||null));
 window.commitDurableInventoryAcquisition54500=spec=>{const p=window.playerData;p.durableObjectProvenance14800||={schemaVersion:1,objectsByInstanceId:{},acquisitionReceipts:{}};const root=p.durableObjectProvenance14800,a=window.__addr(spec),prior=root.acquisitionReceipts[a];if(prior)return{success:true,idempotent:true,address:a,instanceId:prior.instanceId};const instanceId='browser585j-'+(++window.__serial);p.inventory.push({id:'kunai',itemId:'kunai',instanceId,quantity:1,rarity:'Common'});const event={eventId:'event-'+instanceId,eventType:spec.eventType,instanceId,itemId:'kunai',sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId,metadata:JSON.parse(JSON.stringify(spec.metadata||{}))};root.objectsByInstanceId[instanceId]={schemaVersion:1,instanceId,itemId:'kunai',events:[event]};root.acquisitionReceipts[a]={schemaVersion:1,address:a,instanceId,itemId:'kunai',acquisitionKind:spec.acquisitionKind,sourceOccurrenceId:spec.sourceOccurrenceId,sourceId:spec.sourceId,committed:true};return{success:true,idempotent:false,address:a,instanceId};};
 window.commitRetailKunaiWear55200=({instanceId})=>{const r=window.playerData.inventory.find(x=>x.instanceId===instanceId);if(!r||r.durabilityCurrent<=0)return{success:false};r.durabilityCurrent--;return{success:true,idempotent:false};};
 window.repairRetailKunai55200=({instanceId})=>{const r=window.playerData.inventory.find(x=>x.instanceId===instanceId);if(!r)return{success:false};r.durabilityCurrent=10;return{success:true,idempotent:false};};
 `});
 await page.addScriptTag({content:source});
 const result=await page.evaluate(()=>{
   const spec={craftOperationId:'forge585:browser:lane-j:001',recipeId:'forge_create_precision_balanced_kunai_v1',branch:'forge',operation:'create',serviceHostId:'KON-A05',serviceHostAlias:'village:konoha:craft_quarter:forge',servicePermission:true,commissionerRef:'academy_kakashi',executorRef:'konoha_forge_service_executor_role_v1',executorCapabilityRefs:['executor_capability_forge_standard_weaponcraft_v1'],executorKnowledgeRefs:['recipe_knowledge_forge_create_precision_balanced_kunai_v1'],chronicleRef:'chronicle:browser:585:lane-j'};
   const badBefore=JSON.stringify(playerData);const bad=commitForgeCreatedKunai58500({...spec,craftOperationId:'forge585:browser:lane-j:bad',serviceHostId:'BAD'});const badUnchanged=JSON.stringify(playerData)===badBefore;
   const made=commitForgeCreatedKunai58500(spec);const row=playerData.inventory.find(r=>r.instanceId===made.instanceId);let projection=projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:made.instanceId,equippedInstanceId:made.instanceId});const unequippedBonus=projection.effectiveBukijutsuBonus;row.equippedBy='academy_kakashi';__chars.academy_kakashi.equipment=[{itemId:'kunai',instanceId:made.instanceId}];projection=projectForgeCreatedKunaiEffectiveBukijutsu58500({instanceId:made.instanceId,equippedInstanceId:made.instanceId});const replay=commitForgeCreatedKunai58500(spec);return{installed:!!SC_FORGE_CREATED_KUNAI_58500,badReason:bad.reason,badUnchanged,made,replay,unequippedBonus,equippedBonus:projection.effectiveBukijutsuBonus,condition:getForgeCreatedKunaiCondition58500(made.instanceId),diag:runForgeCreatedKunai58500Diagnostics()};
 });
 assert(result.installed);assert.strictEqual(result.badReason,"forge_service_host_invalid");assert(result.badUnchanged);assert(result.made.success&&!result.made.idempotent);assert(result.replay.success&&result.replay.idempotent);assert.strictEqual(result.unequippedBonus,0);assert.strictEqual(result.equippedBonus,1);assert.strictEqual(result.condition.durabilityCurrent,10);assert(result.diag.pass);assert.strictEqual(result.diag.browserGoldenClaimed,false);
 const report={issue:585,lane:"J",pass:true,target,viewport:"1366x768",result,browserGoldenClaimed:false};fs.writeFileSync(path.join(outDir,"report.json"),JSON.stringify(report,null,2));
 await page.screenshot({path:path.join(outDir,"forge-585-lane-j.png"),fullPage:true});
 await browser.close();console.log(JSON.stringify(report,null,2));
})().catch(err=>{console.error(err);process.exit(1);});