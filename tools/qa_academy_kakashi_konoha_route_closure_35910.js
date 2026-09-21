#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE="origin_academy_kakashi_anbu_retrieval";
const ACTION="kak_original_action";
const OBSERVE="kak_original_major_choice";
const GET_CLOSER_SUCCESS="kak_get_closer_success";
const TERMINAL="kak_seq_debrief_pending";
const AMT="academy_kakashi_origin_amt";
const PS="academy_kakashi_origin_package_smuggler";
const MI="academy_kakashi_origin_masked_interceptor";

globalThis.playerData={};
globalThis.savePlayerData=()=>true;
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100-core.js");
load("runtime/alpha-story-factual-resolver-34600.js");

const occurrenceStore=new Map();
globalThis.SC_ALPHA_ORIGIN_32900={
 commitOccurrence(originId,occurrenceId,fact,links,meta){
  if(occurrenceStore.has(occurrenceId))return{success:true,idempotent:true,record:occurrenceStore.get(occurrenceId)};
  const row={originId,occurrenceId,storySceneInstanceId:fact&&fact.storySceneInstanceId||null,fact,links,meta};occurrenceStore.set(occurrenceId,row);return{success:true,record:row};
 },
 findOccurrence(id){return occurrenceStore.get(String(id||""))||null;}
};

let active=null;
const definition={sceneId:SCENE,beatMap:new Map([
 [ACTION,{beatId:ACTION,mode:"choice",choices:[
  {choiceId:"observe",label:"OBSERVE",nextBeatId:OBSERVE,consequenceRequests:[]},
  {choiceId:"get_closer",label:"MOVE IN CLOSER",nextBeatId:GET_CLOSER_SUCCESS,consequenceRequests:[]},
  {choiceId:"attack",label:"ATTACK",nextBeatId:null,consequenceRequests:[]},
  {choiceId:"attempt_pickpocket",label:"SLIP IN FOR THE PACKAGE",nextBeatId:null,consequenceRequests:[]}
 ]}],
 [OBSERVE,{beatId:OBSERVE,mode:"choice",choices:[
  {choiceId:"stop_assassin",label:"STOP THE ASSASSIN",nextBeatId:null,consequenceRequests:[]},
  {choiceId:"secure_package",label:"SECURE THE PACKAGE",nextBeatId:"kak_observe_secure_package_battle",consequenceRequests:[]},
  {choiceId:"secure_package_before_assassin",label:"SECURE BEFORE",nextBeatId:null,consequenceRequests:[]},
  {choiceId:"defeat_assassin_then_secure",label:"DEFEAT THEN SECURE",nextBeatId:null,consequenceRequests:[]},
  {choiceId:"go_after_original_target",label:"ORIGINAL TARGET",nextBeatId:null,consequenceRequests:[]}
 ]}],
 [GET_CLOSER_SUCCESS,{beatId:GET_CLOSER_SUCCESS,mode:"choice",choices:[
  {choiceId:"let_handoff_happen",label:"LET THE HANDOFF HAPPEN",nextBeatId:"legacy",consequenceRequests:[{requestId:"legacy_handoff",kind:"domain",resolve(){
   active.localContext={...(active.localContext||{}),kakashiGetCloserHandoffOccurrenceId:"qa-get-closer-handoff"};
   occurrenceStore.set("qa-get-closer-handoff",{occurrenceId:"qa-get-closer-handoff",fact:{packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",handoffCompleted:true}}});
   const opened=globalThis.SC_ALPHA_KAKASHI_FINAL_34100.openDecisionPoint("OBSERVE_ESCALATION",{committedStateRef:"qa-get-closer-handoff",beatRef:OBSERVE,sourceOccurrenceRefs:["qa-get-closer-handoff"]});
   return{success:true,occurrenceId:"qa-get-closer-handoff",successorChoiceSetId:opened.choiceSet.choiceSetId,nextBeatId:"legacy"};
  }}]},
  {choiceId:"strike_before_handoff",label:"STRIKE BEFORE THE HANDOFF",nextBeatId:null,consequenceRequests:[]},
  {choiceId:"attempt_pickpocket",label:"ATTEMPT THE PICKPOCKET",nextBeatId:null,consequenceRequests:[]}
 ]}],
 [TERMINAL,{beatId:TERMINAL,mode:"narration"}],
 ["kak_observe_secure_package_return",{beatId:"kak_observe_secure_package_return",mode:"choice",choices:[
  {choiceId:"kak_secure_package_stay_amt",label:"STAY ON THE FIRST MAN"},
  {choiceId:"kak_secure_package_report",label:"RETURN AND REPORT"}
 ]}]
])};
globalThis.getStorySceneDefinition=id=>id===SCENE?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.normalizeStorySceneBeat=def=>def;

const launches=[];
const CONFIGS={
 academy_kakashi_origin_battle_amt_ps_2v1:{id:"academy_kakashi_origin_battle_amt_ps_2v1",pakkun:false},
 academy_kakashi_origin_battle_mi_1v1:{id:"academy_kakashi_origin_battle_mi_1v1",pakkun:false},
 academy_kakashi_origin_battle_ps_mi_2v1:{id:"academy_kakashi_origin_battle_ps_mi_2v1",pakkun:false},
 academy_kakashi_origin_battle_seq_amt_pakkun:{id:"academy_kakashi_origin_battle_seq_amt_pakkun",pakkun:true}
};
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300={
 configs:CONFIGS,
 launchAcademyKakashiOriginPlBattle(spec){launches.push(spec);return{success:true,battleId:"qa-battle-"+launches.length,battleConfigId:spec.battleConfigId};}
};
globalThis.SC_ALPHA_KAKASHI_SEQUENTIAL_CONSUMER_34410={patchId:"qa-sequential"};
let ce256Calls=0;
globalThis.SC_ALPHA_KAKASHI_KONOHA_CLOSURE_35900={
 resolveAmtDefeatFacts(spec){ce256Calls+=1;return{success:true,occurrenceId:"qa-ce256-shared",packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER"},pakkunState:"PRESENT",routeRef:spec.routeRef};}
};

const fieldCalls=[];
globalThis.commitAcademyKakashiFieldSecured35920=(ref,spec)=>{
 fieldCalls.push({type:"field",ref,spec});
 const resultRef="qa-field-"+ref+"-"+fieldCalls.length;
 globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:ref,stateClass:"FIELD_SECURED_PENDING_COLLECTION",resultRef});
 return{success:true,occurrenceId:resultRef,stateClass:"FIELD_SECURED_PENDING_COLLECTION"};
};
globalThis.commitAcademyKakashiSingleTransfer35920=(ref,dest,spec)=>{
 fieldCalls.push({type:"transfer",ref,dest,spec});
 const stateClass=dest==="ANBU"?"ANBU_INSTITUTIONAL_CUSTODY":"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY",resultRef="qa-transfer-"+ref+"-"+fieldCalls.length;
 globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:ref,stateClass,resultRef});
 return{success:true,occurrenceId:resultRef,stateClass};
};

load("runtime/alpha-kakashi-konoha-route-closure-35910.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910;
assert(MOD,"35910 route closure missing");
const diag=globalThis.runAcademyKakashiKonohaRouteClosure35910Diagnostics();
assert.strictEqual(diag.pass,true,"35910 diagnostics failed: "+JSON.stringify(diag.failed));
const source35910=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-konoha-route-closure-35910.js"),"utf8");
assert(source35910.includes("I saw enough."),"direct-strike verbatim performance missing");
assert(source35910.includes("You two always this helpful?"),"original-target Pakkun scene missing");
assert(source35910.includes("D.originalFailure"),"original pursuit failure scene must be routed explicitly");
assert(source35910.includes("D.getCloserHandoff"),"Get-Closer handoff performance beat missing");
assert(source35910.includes("commitAcademyKakashiSingleTransfer35920"),"institutional transfer must use the field/custody owner");

const attack=definition.beatMap.get(ACTION).choices.find(x=>x.choiceId==="attack");
assert.strictEqual(attack.label,"STRIKE BEFORE THE HANDOFF");
assert.strictEqual(attack.knownBlocker,null);
assert.strictEqual(attack.nextBeatId,MOD.beats.directIntro);

active={sceneId:SCENE,instanceId:"qa-direct",beatId:ACTION,localContext:{},battleResume:null};
let out=attack.consequenceRequests[0].resolve();
assert.strictEqual(out.success,true,"direct strike entry failed: "+JSON.stringify(out));
assert(active.localContext.kakashiKonohaDirectStrikeOccurrenceId);
const directBattle=definition.beatMap.get(MOD.beats.directBattle);
out=directBattle.battle.launchResolver({active,returnContext:{type:"story_scene",sceneId:SCENE,beatId:MOD.beats.directReturn}});
assert.strictEqual(out.success,true,"direct 2v1 launch failed");
let spec=launches.at(-1);
assert.strictEqual(spec.battleConfigId,"academy_kakashi_origin_battle_amt_ps_2v1");
assert.strictEqual(spec.returnContext.type,"story_scene");
assert.strictEqual(spec.returnContext.sceneId,SCENE);
assert.strictEqual(spec.pakkunAuthorized,false);

active.beatId=MOD.beats.directReturn;
active.battleResume={authored:{
 battleConfigId:"academy_kakashi_origin_battle_amt_ps_2v1",bindingRef:"academy_kakashi.resolver.attack",battleOccurrenceId:"qa-direct-2v1-win",resultState:"player_side_victory",
 participants:[
  {participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},
  {participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}
 ]
}};
out=MOD.consumeDirect2v1();
assert.strictEqual(out.success,true,"direct 2v1 return failed: "+JSON.stringify(out));
assert.strictEqual(out.nextBeatId,MOD.beats.directMiArrival);
const matAfter2v1=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi").materialStates["kakashi_origin_outer_route_packet"];
assert.strictEqual(matAfter2v1.value.custodyClass,"KAKASHI");

active.beatId=MOD.beats.directMiBattle;
out=definition.beatMap.get(MOD.beats.directMiBattle).battle.launchResolver({active,returnContext:{type:"story_scene",sceneId:SCENE,beatId:MOD.beats.directMiReturn}});
assert.strictEqual(out.success,true,"direct MI launch failed");
spec=launches.at(-1);
assert.strictEqual(spec.battleConfigId,"academy_kakashi_origin_battle_mi_1v1");
assert.strictEqual(spec.pakkunAuthorized,false);

active.beatId=MOD.beats.directMiReturn;
// Browser resume can retain the prior 2v1 authored envelope while the new MI result
// is supplied as projected. The consumer must select the exact MI config+binding.
active.battleResume={
 authored:{
  battleConfigId:"academy_kakashi_origin_battle_amt_ps_2v1",bindingRef:"academy_kakashi.resolver.attack",battleOccurrenceId:"qa-stale-direct-2v1",resultState:"player_side_victory",
  participants:[{participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},{participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]
 },
 projected:{
  battleConfigId:"academy_kakashi_origin_battle_mi_1v1",bindingRef:"academy_kakashi.battle.direct_strike_mi",battleOccurrenceId:"qa-direct-mi-win",resultState:"player_side_victory",
  participants:[{participantRef:MI,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]
 }
};
out=MOD.consumeDirectMi();
assert.strictEqual(out.success,true,"direct MI return failed: "+JSON.stringify(out));
const directMiCommitted=occurrenceStore.get(out.occurrenceId);\nassert(directMiCommitted&&directMiCommitted.fact&&directMiCommitted.fact.battleOccurrenceId==="qa-direct-mi-win","direct MI return consumed the stale 2v1 receipt instead of the projected MI receipt");
assert.strictEqual(out.nextBeatId,MOD.beats.directGroup);
assert.deepStrictEqual(definition.beatMap.get(MOD.beats.directGroup).choices.map(x=>x.label),[
 "TAKE THEM TO THE UCHIHA POLICE FORCE","TAKE THEM TO THE ANBU","KILL THEM","TAKE THE PACKAGE AND LET THEM GO"
]);

// Group lethal action is one player decision but three exact participant deaths.
active.beatId=MOD.beats.directKill;
out=MOD.commitDirectGroupDisposition("KILL");
assert.strictEqual(out.success,true,"direct KILL THEM failed");
const states=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi").participantStates;
for(const ref of [AMT,PS,MI])assert.strictEqual(states[ref].stateClass,"DEAD");

// Secure-Before failure Battle launch must reuse the existing Secure-Package owner.
active={sceneId:SCENE,instanceId:"qa-secure-before",beatId:MOD.beats.secureBeforeBattle,localContext:{kakashiKonohaSecureBeforeOccurrenceId:"qa-secure-before-parent"},battleResume:null};
occurrenceStore.set("qa-secure-before-parent",{occurrenceId:"qa-secure-before-parent",fact:{anchorRef:"AK_SA_020",packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",handoffCompleted:true}}});
out=definition.beatMap.get(MOD.beats.secureBeforeBattle).battle.launchResolver({active,returnContext:{type:"story_scene",sceneId:SCENE,beatId:"kak_observe_secure_package_return"}});
assert.strictEqual(out.success,true,"secure-before shared Battle launch failed: "+JSON.stringify(out));
spec=launches.at(-1);
assert.strictEqual(spec.battleConfigId,"academy_kakashi_origin_battle_ps_mi_2v1");
assert.strictEqual(spec.bindingRef,"academy_kakashi.battle.secure_package");
assert.strictEqual(spec.sourceAnchorRef,"AK_SA_014");
assert.strictEqual(spec.pakkunAuthorized,false);
assert(active.localContext.kakashiObserveSecurePackageStoryDecisionReceiptId,"secure-before shared semantic Battle receipt missing");
assert.strictEqual(active.localContext.kakashiGetCloserHandoffOccurrenceId,"qa-secure-before-parent");

// Original-target AMT Battle must authorize temporary Pakkun and use CE #256 on loss.
active={sceneId:SCENE,instanceId:"qa-original",beatId:MOD.beats.originalBattle,localContext:{
 kakashiKonohaOriginalTargetOccurrenceId:"qa-original-parent",
 kakashiKonohaPackageOccurrenceId:"qa-original-package",
 kakashiKonohaPakkunPresent:true
},battleResume:null};
occurrenceStore.set("qa-original-package",{occurrenceId:"qa-original-package",fact:{packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_ESCAPED_WITH_PACKAGE"}}});
out=definition.beatMap.get(MOD.beats.originalBattle).battle.launchResolver({active,returnContext:{type:"story_scene",sceneId:SCENE,beatId:MOD.beats.originalReturn}});
assert.strictEqual(out.success,true,"original-target AMT launch failed");
spec=launches.at(-1);
assert.strictEqual(spec.battleConfigId,"academy_kakashi_origin_battle_seq_amt_pakkun");
assert.strictEqual(spec.pakkunAuthorized,true);

active.beatId=MOD.beats.originalReturn;
active.battleResume={authored:{
 battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.original_target_amt",battleOccurrenceId:"qa-original-loss",resultState:"opposition_side_victory",participants:[]
}};
out=MOD.consumeOriginalAmt();
assert.strictEqual(out.success,true,"original-target AMT loss failed: "+JSON.stringify(out));
assert.strictEqual(out.nextBeatId,TERMINAL);
assert.strictEqual(definition.beatMap.get(MOD.beats.originalReturn).nextBeatId,TERMINAL);
assert.strictEqual(ce256Calls,1,"original-target AMT loss did not consume shared CE #256 owner");
assert(source35910.includes('classify(PS,"ESCAPED"')&&source35910.includes('classify(AMT,"ESCAPED"'),"GO AFTER ORIGINAL TARGET must commit PS escape and AMT pursuit-failure escape at its factual resolver boundary");

// Original-target victory keeps disposition separate from Battle and commits custody at the physical handoff.
active={sceneId:SCENE,instanceId:"qa-original-win",beatId:MOD.beats.originalReturn,localContext:{
 kakashiKonohaOriginalTargetOccurrenceId:"qa-original-parent-win",
 kakashiKonohaPackageOccurrenceId:"qa-original-package",
 kakashiKonohaPakkunPresent:true
},battleResume:{authored:{
 battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.original_target_amt",battleOccurrenceId:"qa-original-win-battle",resultState:"player_side_victory",
 participants:[{participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]
}}};
out=MOD.consumeOriginalAmt();
assert.strictEqual(out.success,true);
assert.strictEqual(out.nextBeatId,MOD.beats.originalDisposition);
active.beatId=MOD.beats.originalDisposition;
const anbuChoice=definition.beatMap.get(MOD.beats.originalDisposition).choices.find(x=>x.choiceId==="original_anbu");
out=anbuChoice.consequenceRequests[0].resolve();
assert.strictEqual(out.success,true);
assert.strictEqual(fieldCalls.filter(x=>x.type==="transfer"&&x.ref===AMT).length,0,"AMT custody committed on the choice click");
active.beatId=MOD.beats.originalAnbuHandoff;
out=MOD.commitOriginalDisposition("ANBU");
assert.strictEqual(out.success,true);
assert(fieldCalls.some(x=>x.type==="transfer"&&x.ref===AMT&&x.dest==="ANBU"),"AMT ANBU handoff did not use institutional transfer owner");

// MOVE IN CLOSER -> LET HANDOFF HAPPEN must reconverge to the Observe five-choice surface.
active={sceneId:SCENE,instanceId:"qa-get-closer",beatId:GET_CLOSER_SUCCESS,localContext:{},battleResume:null};
const handoff=definition.beatMap.get(GET_CLOSER_SUCCESS).choices.find(x=>x.choiceId==="let_handoff_happen");
out=handoff.consequenceRequests[0].resolve();
assert.strictEqual(out.success,true,"Get-Closer handoff reconvergence failed");
assert.strictEqual(out.nextBeatId,MOD.beats.getCloserHandoff);
assert.strictEqual(handoff.nextBeatId,MOD.beats.getCloserHandoff);
assert.strictEqual(definition.beatMap.get(MOD.beats.getCloserHandoff).nextBeatId,OBSERVE);
assert.strictEqual(active.localContext.kakashiObserveScene03AOccurrenceId,"qa-get-closer-handoff");
assert(active.localContext.kakashiObserveEscalationChoiceSetId);

// Observe resolver choices are live and no longer carry a Writing blocker.
for(const id of ["secure_package_before_assassin","go_after_original_target"]){
 const row=definition.beatMap.get(OBSERVE).choices.find(x=>x.choiceId===id);
 assert(row&&row.knownBlocker===null&&typeof row.consequenceRequests[0].resolve==="function",id+" is not live");
}

console.log("Academy Kakashi Konoha route closure 35910 QA: PASS");
console.log("- direct STRIKE BEFORE THE HANDOFF is fixed 2v1 -> package -> MI 1v1 -> exact four group dispositions");
console.log("- Battle launches satisfy story_scene return context and exact Pakkun authorization");
console.log("- KILL THEM commits three distinct deterministic participant deaths");
console.log("- Secure-Before failure reconverges through the existing Secure-Package Battle binding/return owner");
console.log("- Original-Target AMT loss consumes shared CE #256 and preserves package separation");
console.log("- Move-In-Closer LET THE HANDOFF HAPPEN plays its authored handoff performance before reconverging to Observe");
console.log("- Browser Golden is intentionally NOT claimed by this headless harness");
