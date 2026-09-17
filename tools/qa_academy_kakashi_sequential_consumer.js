#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const game=fs.readFileSync(path.join(root,"game.js"),"utf8");
const deployment=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-origin-battle-deployment-34300.js"),"utf8");
const consumer=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-final-sequential-consumer-34410.js"),"utf8");
const integrator=fs.readFileSync(path.join(root,"runtime","alpha-origin-scenes-32900-integrator.js"),"utf8");
const storyDecision=fs.readFileSync(path.join(root,"runtime","alpha-story-decision-realisation-34000.js"),"utf8");
const loader=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-final-origin-adapter-34100.js"),"utf8");
const storage=new Map(),session=new Map();
const store=map=>({getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()});
const dummy=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null;},querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false});
const context={console:{log(){},info(){},warn(){},error(){},table(){}},localStorage:store(storage),sessionStorage:store(session),document:{getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},createElement(){return dummy();},body:dummy(),head:dummy(),addEventListener(){},removeEventListener(){}},requestAnimationFrame(){return 0;},cancelAnimationFrame(){},alert(){},confirm(){return true;},prompt(){return null;},Image:function(){return dummy();},navigator:{userAgent:"node-kakashi-observe-battle"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN};
context.window=context;context.globalThis=context;vm.createContext(context);
function run(src,file){return vm.runInContext(src,context,{filename:file});}
function plain(expr,file="plain.js"){return JSON.parse(JSON.stringify(run(expr,file)));}
run(game,"game.js");run(deployment,"runtime/alpha-kakashi-origin-battle-deployment-34300.js");
run(`registerStoryScene({sceneId:"origin_academy_kakashi_anbu_retrieval",eventId:"origin_academy_kakashi_anbu_retrieval",entryBeatId:"kak_original_major_choice",beats:[{beatId:"kak_original_major_choice",mode:"choice",text:"test",choices:[{choiceId:"defeat_assassin_then_recover",label:"DEAL WITH HER FIRST, THEN CHASE THE PACKAGE",nextBeatId:"kak_original_major_choice",availability:()=>({available:false,knownBlocker:"stale"})}]}]});`,"mock-scene.js");
run(consumer,"runtime/alpha-kakashi-final-sequential-consumer-34410.js");

const initialReport=plain(`runAcademyKakashiSequentialConsumer34410Diagnostics()`,`diag-initial.js`);
assert.strictEqual(initialReport.pass,true,`34410 initial diagnostics failed: ${initialReport.failed.join(",")}`);
const surface=plain(`(()=>{const d=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval"),m=d.beatMap,c=m.get("kak_original_major_choice").choices.find(x=>x.choiceId==="defeat_assassin_then_recover");return{choice:{label:c.label,nextBeatId:c.nextBeatId,available:c.availability().available},secureBattle:m.get("kak_observe_secure_package_battle").battle,secureReturn:m.get("kak_observe_secure_package_return"),mi:m.get("kak_seq_mi_battle").battle,ps:m.get("kak_seq_ps_battle").battle,amt:m.get("kak_seq_amt_battle").battle,debrief:m.get("kak_seq_debrief_pending")};})()`,`surface.js`);
assert.strictEqual(surface.choice.available,false,"superseded major-choice sequential entry must stay guarded");
assert.strictEqual(surface.choice.nextBeatId,"kak_original_major_choice","34410 must not rebind the superseded major-choice entry to the sequential Battle");
assert.strictEqual(surface.secureBattle.encounterId,"academy_kakashi_origin_battle_ps_mi_2v1","GO FOR THE PACKAGE prepared wrong Battle config");
assert.strictEqual(surface.secureBattle.postBattleBeatId,"kak_observe_secure_package_return");
assert.strictEqual(surface.secureReturn.exitScene,false,"secure-package return must not falsely terminal-complete");
assert.strictEqual(surface.secureReturn.allowPresentationClose,false,"secure-package return must stay fail-closed pending AK_SA_025");
assert.strictEqual(surface.mi.encounterId,"academy_kakashi_origin_battle_seq_mi");
assert.strictEqual(surface.ps.encounterId,"academy_kakashi_origin_battle_seq_ps");
assert.strictEqual(surface.amt.encounterId,"academy_kakashi_origin_battle_seq_amt_pakkun");
assert.strictEqual(surface.debrief.exitScene,false,"consumer must not falsely terminal-complete unresolved package/participant facts");

run(`(()=>{const d=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval");const blocked=()=>({available:false,knownBlocker:"guarded"});d.beatMap.set("kak_get_closer_handoff_observe_escalation",{beatId:"kak_get_closer_handoff_observe_escalation",mode:"choice",choices:[
{choiceId:"stop_assassin",label:"CUT HER OFF",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]},
{choiceId:"secure_package",label:"GO FOR THE PACKAGE",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]},
{choiceId:"secure_package_before_assassin",label:"BEAT HER TO THE PACKAGE",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]},
{choiceId:"defeat_assassin_then_secure",label:"DEAL WITH HER FIRST, THEN CHASE THE PACKAGE",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]},
{choiceId:"go_after_original_target",label:"STAY ON THE FIRST MAN",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]}
]});})()`,`factual-menu.js`);
const bind=plain(`SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410.bindObserveEscalationChoice()`,`bind-observe.js`);
assert.strictEqual(bind.success,true,`factual Observe bind failed: ${JSON.stringify(bind)}`);
let factualMenu=plain(`(()=>{const m=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval").beatMap.get("kak_get_closer_handoff_observe_escalation");return m.choices.map(c=>({id:c.choiceId,label:c.label,next:c.nextBeatId,available:c.availability().available,requests:(c.consequenceRequests||[]).map(r=>r.requestId)}));})()`,`factual-menu-report.js`);
const sequential=factualMenu.find(row=>row.id==="defeat_assassin_then_secure");
const secureGuarded=factualMenu.find(row=>row.id==="secure_package");
assert(sequential,"factual sequential choice missing");
assert.strictEqual(sequential.available,true,"factual sequential choice remained guarded");
assert.strictEqual(sequential.next,"kak_seq_mi_battle","factual sequential choice did not enter exact MI Battle");
assert.deepStrictEqual(sequential.requests,["kakashi_observe_sequential_intent_34410"],"factual sequential choice missing semantic intent transaction");
assert.strictEqual(secureGuarded.available,false,"GO FOR THE PACKAGE released before AK_SA_025 closure");
assert(factualMenu.filter(row=>row.id!=="defeat_assassin_then_secure").every(row=>row.available===false),"unimplemented Observe choices were released");

const legacyAfterBind=plain(`(()=>{const d=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval"),c=d.beatMap.get("kak_original_major_choice").choices.find(x=>x.choiceId==="defeat_assassin_then_recover");return{next:c.nextBeatId,available:c.availability().available};})()`,`legacy-after-bind.js`);
assert.strictEqual(legacyAfterBind.available,false,"binding the factual Observe route must not release the superseded major choice");
assert.strictEqual(legacyAfterBind.next,"kak_original_major_choice","factual Observe binding must not rewrite the superseded major-choice route");

const securePrepared=plain(`SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410.bindObserveSecurePackageChoice({release:false})`,`secure-prepared.js`);
assert.strictEqual(securePrepared.success,true);assert.strictEqual(securePrepared.prepared,true);assert.strictEqual(securePrepared.released,false);
const secureBind=plain(`SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410.bindObserveSecurePackageChoice({release:true})`,`secure-bind.js`);
assert.strictEqual(secureBind.success,true);assert.strictEqual(secureBind.released,true);
factualMenu=plain(`(()=>{const m=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval").beatMap.get("kak_get_closer_handoff_observe_escalation");return m.choices.map(c=>({id:c.choiceId,next:c.nextBeatId,available:c.availability().available,requests:(c.consequenceRequests||[]).map(r=>r.requestId)}));})()`,`factual-menu-secure-report.js`);
const secure=factualMenu.find(row=>row.id==="secure_package");
assert.strictEqual(secure.available,true,"prepared secure-package binder could not activate exact route");
assert.strictEqual(secure.next,"kak_observe_secure_package_battle");
assert.deepStrictEqual(secure.requests,["kakashi_observe_secure_package_intent_34410"]);
assert(factualMenu.filter(row=>!["secure_package","defeat_assassin_then_secure"].includes(row.id)).every(row=>row.available===false),"secure-package preparation released unrelated Observe choices");
const boundReport=plain(`runAcademyKakashiSequentialConsumer34410Diagnostics()`,`diag-bound.js`);
assert.strictEqual(boundReport.pass,true,`34410 bound diagnostics failed: ${boundReport.failed.join(",")}`);

assert.ok(integrator.includes('alpha-story-decision-realisation-34000.js?sc=story-decision-20260916-4'),"unexpected Story decision cache generation drift");
assert.ok(storyDecision.includes('alpha-kakashi-final-origin-adapter-34100.js?sc=kakashi-final-20260917-18'),"Kakashi parent cache generation did not advance with 34410 v7");
assert.ok(loader.includes('const BUILD="kakashi-final-20260917-18"'),"Kakashi child cache generation did not advance with 34410 v7");
assert.ok(loader.includes('alpha-kakashi-final-sequential-consumer-34410.js'),"34100 production loader missing 34410 Observe Battle consumer");
assert.ok(loader.includes('alpha-kakashi-factual-bindings-34700.js'),"34100 production loader missing terminal factual binding layer");

const source=consumer;
assert.ok(source.includes('alpha_kakashi_final_sequential_consumer_34410_v7_2026_09_17'),"34410 v7 semantic correction missing");
assert.ok(source.includes('sourceAnchorRef:spec.anchor'));
assert.ok(source.includes('bindingRef:BINDING.sequential'));
assert.ok(source.includes('pakkunAuthorized:spec.pakkun'));
assert.ok(source.includes('Number(result.playerActionOpportunityCount)<=max'));
assert.ok(source.includes('sourceAnchorRef:"AK_SA_014"'),"GO FOR THE PACKAGE must use exact AK_SA_014 authority");
assert.ok(source.includes('bindingRef:BINDING.securePackage'),"GO FOR THE PACKAGE missing Battle-owned semantic binding");
assert.ok(source.includes('battleConfigId:CONFIG.securePackage'),"GO FOR THE PACKAGE missing exact 2-v-1 config");
assert.ok(source.includes('kakashi_observe_secure_package_intent_34410'),"GO FOR THE PACKAGE intent transaction missing");
assert.ok(source.includes('kakashi_observe_secure_package_battle_return_34410'),"GO FOR THE PACKAGE Battle-return transaction missing");
assert.ok(source.includes('commitStoryIntent'),"Observe routes must commit semantic intent before Battle");
assert.ok(source.includes('dispatchCommittedIntent'),"factual Battle receipts must close semantic intent");
assert.ok(source.includes('battleOccurrenceId'),"semantic Battle return must reference factual Battle receipt");
assert.ok(!source.includes('sequential.nextBeatId="kak_seq_mi_battle"'),"34410 must not directly rebind the superseded major-choice sequential entry");
assert.ok(!source.includes('completeChronicleOriginPrologue('));

console.log(JSON.stringify({pass:true,patch:"34410-v7",legacySequentialChoiceActionable:false,legacySequentialChoiceRemainsGuarded:true,factualObserveSequentialChoiceActionable:true,factualObserveIsSoleSequentialEntry:true,securePackage2v1Prepared:true,securePackageProductionRelease:false,securePackageExactAnchor:"AK_SA_014",securePackageExactConfig:"academy_kakashi_origin_battle_ps_mi_2v1",securePackageSemanticIntentBeforeBattle:true,securePackageFactualBattleReceiptReturn:true,otherObserveChoicesFailClosed:true,kakashiChildCacheIdentity:"kakashi-final-20260917-18",miGate:4,psGate:3,finalPakkunConfig:true,falseTerminalCompletionPrevented:true,browserGoldenClaimed:false},null,2));
