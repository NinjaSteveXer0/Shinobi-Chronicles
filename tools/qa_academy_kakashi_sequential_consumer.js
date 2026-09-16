#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const game=fs.readFileSync(path.join(root,"game.js"),"utf8");
const deployment=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-origin-battle-deployment-34300.js"),"utf8");
const consumer=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-final-sequential-consumer-34410.js"),"utf8");
const storage=new Map(),session=new Map();
const store=map=>({getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()});
const dummy=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null;},querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false});
const context={console:{log(){},info(){},warn(){},error(){},table(){}},localStorage:store(storage),sessionStorage:store(session),document:{getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},createElement(){return dummy();},body:dummy(),head:dummy(),addEventListener(){},removeEventListener(){}},requestAnimationFrame(){return 0;},cancelAnimationFrame(){},alert(){},confirm(){return true;},prompt(){return null;},Image:function(){return dummy();},navigator:{userAgent:"node-kakashi-sequential"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN};
context.window=context;context.globalThis=context;vm.createContext(context);
function run(src,file){return vm.runInContext(src,context,{filename:file});}
function plain(expr,file="plain.js"){return JSON.parse(JSON.stringify(run(expr,file)));}
run(game,"game.js");run(deployment,"runtime/alpha-kakashi-origin-battle-deployment-34300.js");
run(`registerStoryScene({sceneId:"origin_academy_kakashi_anbu_retrieval",eventId:"origin_academy_kakashi_anbu_retrieval",entryBeatId:"kak_original_major_choice",beats:[{beatId:"kak_original_major_choice",mode:"choice",text:"test",choices:[{choiceId:"defeat_assassin_then_recover",label:"DEAL WITH HER FIRST, THEN CHASE THE PACKAGE",nextBeatId:"kak_original_major_choice",availability:()=>({available:false,knownBlocker:"stale"})}]}]});`,"mock-scene.js");
run(consumer,"runtime/alpha-kakashi-final-sequential-consumer-34410.js");

const initialReport=plain(`runAcademyKakashiSequentialConsumer34410Diagnostics()`,`diag-initial.js`);
assert.strictEqual(initialReport.pass,true,`34410 initial diagnostics failed: ${initialReport.failed.join(",")}`);
const surface=plain(`(()=>{const d=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval"),m=d.beatMap,c=m.get("kak_original_major_choice").choices.find(x=>x.choiceId==="defeat_assassin_then_recover");return{choice:{label:c.label,nextBeatId:c.nextBeatId,available:c.availability().available},mi:m.get("kak_seq_mi_battle").battle,ps:m.get("kak_seq_ps_battle").battle,amt:m.get("kak_seq_amt_battle").battle,debrief:m.get("kak_seq_debrief_pending")};})()`,`surface.js`);
assert.strictEqual(surface.choice.available,true);assert.strictEqual(surface.choice.nextBeatId,"kak_seq_mi_battle");
assert.strictEqual(surface.mi.encounterId,"academy_kakashi_origin_battle_seq_mi");
assert.strictEqual(surface.ps.encounterId,"academy_kakashi_origin_battle_seq_ps");
assert.strictEqual(surface.amt.encounterId,"academy_kakashi_origin_battle_seq_amt_pakkun");
assert.strictEqual(surface.debrief.exitScene,false,"consumer must not falsely terminal-complete unresolved package/participant facts");

// Model the factual handoff menu that 34120 creates later in production load
// order. 34410 must be able to bind exactly its proven route after that beat
// exists, leaving the other four choices fail-closed.
run(`(()=>{const d=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval");const blocked=()=>({available:false,knownBlocker:"guarded"});d.beatMap.set("kak_get_closer_handoff_observe_escalation",{beatId:"kak_get_closer_handoff_observe_escalation",mode:"choice",choices:[
{choiceId:"stop_assassin",label:"CUT HER OFF",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]},
{choiceId:"secure_package",label:"GO FOR THE PACKAGE",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]},
{choiceId:"secure_package_before_assassin",label:"BEAT HER TO THE PACKAGE",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]},
{choiceId:"defeat_assassin_then_secure",label:"DEAL WITH HER FIRST, THEN CHASE THE PACKAGE",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]},
{choiceId:"go_after_original_target",label:"STAY ON THE FIRST MAN",nextBeatId:"kak_get_closer_handoff_observe_escalation",availability:blocked,consequenceRequests:[]}
]});})()`,`factual-menu.js`);
const bind=plain(`SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410.bindObserveEscalationChoice()`,`bind-observe.js`);
assert.strictEqual(bind.success,true,`factual Observe bind failed: ${JSON.stringify(bind)}`);
const factualMenu=plain(`(()=>{const m=getStorySceneDefinition("origin_academy_kakashi_anbu_retrieval").beatMap.get("kak_get_closer_handoff_observe_escalation");return m.choices.map(c=>({id:c.choiceId,label:c.label,next:c.nextBeatId,available:c.availability().available,requests:(c.consequenceRequests||[]).map(r=>r.requestId)}));})()`,`factual-menu-report.js`);
const sequential=factualMenu.find(row=>row.id==="defeat_assassin_then_secure");
assert(sequential,"factual sequential choice missing");
assert.strictEqual(sequential.available,true,"factual sequential choice remained guarded");
assert.strictEqual(sequential.next,"kak_seq_mi_battle","factual sequential choice did not enter exact MI Battle");
assert.deepStrictEqual(sequential.requests,["kakashi_observe_sequential_intent_34410"],"factual sequential choice missing semantic intent transaction");
assert(factualMenu.filter(row=>row.id!=="defeat_assassin_then_secure").every(row=>row.available===false),"unimplemented Observe choices were released");
const boundReport=plain(`runAcademyKakashiSequentialConsumer34410Diagnostics()`,`diag-bound.js`);
assert.strictEqual(boundReport.pass,true,`34410 bound diagnostics failed: ${boundReport.failed.join(",")}`);

const source=consumer;
assert.ok(source.includes('sourceAnchorRef:spec.anchor'));
assert.ok(source.includes('bindingRef:BINDING'));
assert.ok(source.includes('pakkunAuthorized:spec.pakkun'));
assert.ok(source.includes('Number(result.playerActionOpportunityCount)<=max'));
assert.ok(source.includes('commitStoryIntent'),"Observe route must commit semantic intent before Battle");
assert.ok(source.includes('dispatchCommittedIntent'),"MI factual Battle receipt must close semantic intent");
assert.ok(source.includes('battleOccurrenceId'),"semantic Battle return must reference factual Battle receipt");
assert.ok(source.includes('kakashi_observe_sequential_mi_battle_return_34410'),"MI return consequence request missing");
assert.ok(!source.includes('completeChronicleOriginPrologue('));
console.log(JSON.stringify({pass:true,patch:"34410-v2",legacySequentialChoiceActionable:true,factualObserveSequentialChoiceActionable:true,otherObserveChoicesFailClosed:true,semanticIntentBeforeBattle:true,factualMiBattleReceiptClosesIntent:true,miGate:4,psGate:3,finalPakkunConfig:true,falseTerminalCompletionPrevented:true,browserGoldenClaimed:false},null,2));