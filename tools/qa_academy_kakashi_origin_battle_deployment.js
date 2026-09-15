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
run(game,"game.js");run(deployment,"runtime/alpha-kakashi-origin-battle-deployment-34300.js");
const report=JSON.parse(JSON.stringify(run(`runAcademyKakashiOriginBattleDeployment34300Diagnostics()`,`diag.js`)));
assert.strictEqual(report.pass,true,`34300 diagnostics failed: ${report.failed.join(",")}`);
assert.strictEqual(report.configIds.length,10);
const exact=JSON.parse(JSON.stringify(run(`({
 amt:enemyDatabase["academy_kakashi_origin_amt"],
 ps:enemyDatabase["academy_kakashi_origin_package_smuggler"],
 mi:enemyDatabase["academy_kakashi_origin_masked_interceptor"],
 configs:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.configs,
 configAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.configAuthorityCommit,
 launchType:typeof launchAcademyKakashiOriginPlBattle,
 pakkunActionType:typeof attemptAcademyKakashiPakkunBattleAction,
 projectorType:typeof projectAcademyKakashiOriginBattleResult,
 multiEnemyApi:typeof configureBattleEnemyParticipants
})`,`surface.js`)));
assert.strictEqual(exact.configAuthority,"3f7502e4b41b1f58c88fe83e89f9839ed0607ef4");
assert.strictEqual(exact.amt.calibratedBasePL,49);assert.deepStrictEqual(exact.amt.baseStats,{nin:50,tai:47,buki:48,fuin:34,kin:43,gen:46,stamina:49});
assert.strictEqual(exact.ps.calibratedBasePL,36);assert.deepStrictEqual(exact.ps.baseStats,{nin:29,tai:24,buki:27,fuin:38,kin:33,gen:22,stamina:31});
assert.strictEqual(exact.mi.calibratedBasePL,45);assert.deepStrictEqual(exact.mi.baseStats,{nin:43,tai:44,buki:46,fuin:24,kin:38,gen:42,stamina:41});
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_amt_ps_mi_3v1.opposition,["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_amt_ps_2v1.opposition,["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler"]);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_ps_mi_2v1.opposition,["academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_ps_mi_2v1.timingGate,null);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_mi_1v1.opposition,["academy_kakashi_origin_masked_interceptor"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_mi_1v1.timingGate,null);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_ps_1v1.opposition,["academy_kakashi_origin_package_smuggler"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_ps_1v1.timingGate,null);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_seq_mi.timingGate.maximumControllerActions,4);assert.strictEqual(exact.configs.academy_kakashi_origin_battle_seq_ps.timingGate.maximumControllerActions,3);
assert.strictEqual(exact.launchType,"function");assert.strictEqual(exact.pakkunActionType,"function");assert.strictEqual(exact.projectorType,"function");assert.strictEqual(exact.multiEnemyApi,"function","existing Battle engine must expose multi-enemy composition API");
console.log(JSON.stringify({pass:true,patch:report.checks.patchId?"34300":null,configCount:report.configIds.length,exactOppositionProfiles:true,directPSMI2v1:true,directMI1v1Untimed:true,directPS1v1Untimed:true,sequentialTimingPreserved:true,multiEnemyExistingApi:true,pakkunTemporaryActionSource:true,browserGoldenClaimed:false},null,2));