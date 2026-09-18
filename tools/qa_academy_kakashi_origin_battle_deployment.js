#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const game=fs.readFileSync(path.join(root,"game.js"),"utf8");
const deployment=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-origin-battle-deployment-34300.js"),"utf8");
const storage=new Map(),session=new Map();
const store=map=>({getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()});
const dummy=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null;},querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false});
const context={console:{log(){},info(){},warn(){},error(){},table(){}},localStorage:store(storage),sessionStorage:store(session),document:{getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},createElement(){return dummy();},body:dummy(),head:dummy(),addEventListener(){},removeEventListener(){}},requestAnimationFrame(){return 0;},cancelAnimationFrame(){},alert(){},confirm(){return true;},prompt(){return null;},Image:function(){return dummy();},navigator:{userAgent:"node-kakashi-battle"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN};
context.window=context;context.globalThis=context;vm.createContext(context);
function run(src,file){return vm.runInContext(src,context,{filename:file});}
run(game,"game.js");
const genericBefore=JSON.parse(JSON.stringify(run(`({
  amt:enemyDatabase["anbu_style_operative"]||null,
  ps:enemyDatabase["fuinjutsu_smuggler"]||null,
  mi:enemyDatabase["decoy_assassin"]||null
})`,`generic-before.js`)));
run(deployment,"runtime/alpha-kakashi-origin-battle-deployment-34300.js");
const report=JSON.parse(JSON.stringify(run(`runAcademyKakashiOriginBattleDeployment34300Diagnostics()`,`diag.js`)));
assert.strictEqual(report.pass,true,`34300 diagnostics failed: ${report.failed.join(",")}`);
assert.strictEqual(report.configIds.length,10);
const exact=JSON.parse(JSON.stringify(run(`({
 amt:enemyDatabase["academy_kakashi_origin_amt"],
 ps:enemyDatabase["academy_kakashi_origin_package_smuggler"],
 mi:enemyDatabase["academy_kakashi_origin_masked_interceptor"],
 generic:{
   amt:enemyDatabase["anbu_style_operative"]||null,
   ps:enemyDatabase["fuinjutsu_smuggler"]||null,
   mi:enemyDatabase["decoy_assassin"]||null
 },
 configs:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.configs,
 configAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.configAuthorityCommit,
 sequentialRegistryAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.sequentialRegistryCommit,
 sequentialCombatAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.sequentialMiPsCombatCommit,
 amtRegistryAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.amtRegistryCommit,
 amtCombatAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.amtCombatCommit,
 launchType:typeof launchAcademyKakashiOriginPlBattle,
 pakkunActionType:typeof attemptAcademyKakashiPakkunBattleAction,
 projectorType:typeof projectAcademyKakashiOriginBattleResult,
 multiEnemyApi:typeof configureBattleEnemyParticipants
})`,`surface.js`)));
assert.strictEqual(exact.configAuthority,"3f7502e4b41b1f58c88fe83e89f9839ed0607ef4");
assert.strictEqual(exact.sequentialRegistryAuthority,"930c5048453d0034b2856ad3ddfa5ea65fdede7b");
assert.strictEqual(exact.sequentialCombatAuthority,"4ef10cc556790a35e692b6a10f2733846809b494");
assert.strictEqual(exact.amtRegistryAuthority,"0a0bbaf3c3c2395e22977a41da0892a209a73994");
assert.strictEqual(exact.amtCombatAuthority,"32f79944304ea30689d87a4b1f7b48f84fb2734e");

assert.strictEqual(exact.amt.calibratedBasePL,18);assert.deepStrictEqual(exact.amt.baseStats,{nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17});
assert.strictEqual(exact.ps.calibratedBasePL,10);assert.deepStrictEqual(exact.ps.baseStats,{nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10});
assert.strictEqual(exact.mi.calibratedBasePL,14);assert.deepStrictEqual(exact.mi.baseStats,{nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13});
assert.strictEqual(exact.amt.image,"NPC portrait/anbu_marked_target.png");
assert.strictEqual(exact.ps.image,"NPC portrait/package_smuggler.png");
assert.strictEqual(exact.mi.image,"NPC portrait/masked_interceptor.png");
assert.strictEqual(exact.amt.provenance.combatSourceProfileId,"academy_kakashi_origin_amt");
assert.strictEqual(exact.amt.provenance.derivationProfileId,"anbu_style_operative");
assert.strictEqual(exact.ps.provenance.combatSourceProfileId,"academy_kakashi_origin_package_smuggler");
assert.strictEqual(exact.ps.provenance.derivationProfileId,"fuinjutsu_smuggler");
assert.strictEqual(exact.mi.provenance.combatSourceProfileId,"academy_kakashi_origin_masked_interceptor");
assert.strictEqual(exact.mi.provenance.derivationProfileId,"decoy_assassin");

assert.deepStrictEqual(exact.generic,genericBefore,"34300 must not mutate reusable generic opposition profiles");

const action=(row,id)=>row.authoredBattleActions.find(entry=>entry&&entry.id===id);
const amtWire=action(exact.amt,"enemy_anbu_style_operative_wire_capture");
const amtTanto=action(exact.amt,"enemy_anbu_style_operative_tanto_flash");
const psBurst=action(exact.ps,"enemy_fuinjutsu_smuggler_contraband_seal_burst");
const miBlade=action(exact.mi,"enemy_decoy_assassin_concealed_blade");
assert.strictEqual(amtWire.oncePerBattle,true);assert.ok(amtWire.traits.includes("movement_only_control"));assert.ok(amtWire.traits.includes("not_generic_stun"));
assert.strictEqual(amtTanto.authoredAttackPL,6);assert.strictEqual(amtTanto.conditionalBoostAttackPL,2);assert.strictEqual(amtTanto.conditionalBoostMarker,"silent_body_flicker_position");
assert.strictEqual(psBurst.authoredAttackPL,5);
assert.strictEqual(miBlade.authoredAttackPL,5);assert.strictEqual(miBlade.conditionalBoostAttackPL,2);assert.strictEqual(miBlade.conditionalBoostMarker,"false_retreat_opening");

assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_amt_ps_mi_3v1.opposition,["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_amt_ps_2v1.opposition,["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler"]);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_ps_mi_2v1.opposition,["academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_ps_mi_2v1.timingGate,null);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_mi_1v1.opposition,["academy_kakashi_origin_masked_interceptor"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_mi_1v1.timingGate,null);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_ps_1v1.opposition,["academy_kakashi_origin_package_smuggler"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_ps_1v1.timingGate,null);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_seq_mi.timingGate.maximumControllerActions,4);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_seq_ps.timingGate.maximumControllerActions,3);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_seq_amt_pakkun.timingGate,null);
assert.strictEqual(exact.launchType,"function");assert.strictEqual(exact.pakkunActionType,"function");assert.strictEqual(exact.projectorType,"function");assert.strictEqual(exact.multiEnemyApi,"function","existing Battle engine must expose multi-enemy composition API");
console.log(JSON.stringify({pass:true,patch:report.checks.patchId?"34300-v2":null,configCount:report.configIds.length,exactOccurrenceProfiles:true,npcBattlePortraitAuthority:true,genericProfilesPreserved:true,exactOppositionActions:true,directPSMI2v1:true,directMI1v1Untimed:true,directPS1v1Untimed:true,sequentialTimingPreserved:true,multiEnemyExistingApi:true,pakkunTemporaryActionSource:true,browserGoldenClaimed:false},null,2));