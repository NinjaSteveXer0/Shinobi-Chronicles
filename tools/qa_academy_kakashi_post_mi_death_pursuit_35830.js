#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const LIVE_SOURCE="kak_scene05a_w_choice",RESOLVER_SOURCE="kak_scene06a_w2c_scene7_pending",DKILL_SOURCE="kak_scene06a_w2c_deterministic_kill_pursuit_35810";
const MI="academy_kakashi_origin_masked_interceptor",PS="academy_kakashi_origin_package_smuggler",AMT="academy_kakashi_origin_amt";
const store=new Map();let ref=0,saves=0,launches=[],recoveryCalls=0;
const participantStates={
 [MI]:{participantRef:MI,stateClass:"DEAD"},
 [PS]:{participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED"}
};
globalThis.playerData={};
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.SC_ALPHA_ORIGIN_32900={
 commitOccurrence(originId,occurrenceId,fact,links,meta){
  if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};
  const row={originId,occurrenceId,fact,links,meta};store.set(occurrenceId,row);return{success:true,record:row};
 },
 findOccurrence(id){return store.get(String(id||""))||null;}
};
globalThis.SC_STORY_DECISION_REALISATION_34000={
 stableRef(prefix,payload){return prefix+"::"+JSON.stringify(payload||{})+"::"+(++ref);},
 getStoryUnitSnapshot(){return{participantStates};},
 recordParticipantClassification({participantRef,stateClass,resultRef}){participantStates[participantRef]={participantRef,stateClass,resultRef};return{success:true,resultRef,stateClass};}
};
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300={
 launchAcademyKakashiOriginPlBattle(spec){launches.push(JSON.parse(JSON.stringify(spec)));return{success:true,battleId:"qa-"+spec.battleConfigId,battleConfigId:spec.battleConfigId};}
};
globalThis.projectAcademyKakashiOriginBattleResult=()=>globalThis.currentResult||null;
globalThis.resolveAcademyKakashiSequentialPostPsPackageRecovery35600=function(){
 recoveryCalls+=1;
 participantStates[PS]={participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-ps-defeated"};
 const id="kak_seq_secure_package_after_ps";
 if(!store.has(id))store.set(id,{occurrenceId:id,fact:{factClass:"academy_kakashi_sequential_post_ps_package_recovery",storySceneInstanceId:active.instanceId,battleOccurrenceId:active.battleResume.authored.battleOccurrenceId,packageState:{objectRef:"kakashi_origin_outer_route_packet",previousHolderClass:"PACKAGE_SMUGGLER",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",packageRecovered:true}}});
 active.localContext.kakashiSequentialPackageOccurrenceId=id;active.localContext.kakashiSequentialPackageOccurrenceId35100=id;
 return{success:true,recovered:true,packageOccurrenceId:id};
};

const liveBeat={beatId:LIVE_SOURCE,mode:"choice",choices:[
 {choiceId:"scene05aw_go_after_package_smuggler",label:"GO AFTER PACKAGE SMUGGLER",nextBeatId:LIVE_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-live-ps",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]},
 {choiceId:"scene05aw_go_after_anbu_marked_target",label:"GO AFTER ANBU MARKED TARGET",nextBeatId:LIVE_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-live-amt",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]}
]};
const resolverBeat={beatId:RESOLVER_SOURCE,mode:"choice",choices:[
 {choiceId:"scene06aw2c_postlethal_go_after_package_smuggler",label:"GO AFTER PACKAGE SMUGGLER",nextBeatId:RESOLVER_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-ps",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]},
 {choiceId:"scene06aw2c_postlethal_go_after_anbu_marked_target",label:"GO AFTER ANBU MARKED TARGET",nextBeatId:RESOLVER_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-amt",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]}
]};
const dkillBeat={beatId:DKILL_SOURCE,mode:"choice",choices:[
 {choiceId:"scene06aw2c_dkill_go_after_package_smuggler",label:"GO AFTER PACKAGE SMUGGLER",nextBeatId:DKILL_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-dps",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]},
 {choiceId:"scene06aw2c_dkill_go_after_anbu_marked_target",label:"GO AFTER ANBU MARKED TARGET",nextBeatId:DKILL_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-damt",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]}
]};
const definition={sceneId:SCENE_ID,beatMap:new Map([[LIVE_SOURCE,liveBeat],[RESOLVER_SOURCE,resolverBeat],[DKILL_SOURCE,dkillBeat]])};
let active=null;
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.queueMicrotask=fn=>fn(); // settle runtime render/materialization synchronously in headless QA
globalThis.advanceStoryScene=function baseAdvance(choiceId=null){
 const beat=definition.beatMap.get(active.beatId);if(!beat)return{success:false,reason:"qa_beat_missing",beatId:active.beatId};
 if(beat.mode==="choice"){
  const row=(beat.choices||[]).find(x=>x&&x.choiceId===choiceId);if(!row)return{success:false,reason:"qa_choice_missing",choiceId};
  if(typeof row.availability==="function"&&!row.availability().available)return{success:false,reason:"qa_choice_unavailable"};
  for(const req of row.consequenceRequests||[]){if(typeof req.resolve==="function"){const out=req.resolve();if(!out||out.success!==true)return out||{success:false,reason:"qa_consequence_failed"};}}
  active.beatId=row.nextBeatId;return{success:true,beatId:active.beatId};
 }
 if(beat.mode==="battle_transition")return{success:false,reason:"qa_battle_transition_requires_simulated_return"};
 return{success:false,reason:"qa_base_nonchoice",beatId:active.beatId};
};

function death(id,deterministic=false){
 store.set(id,{occurrenceId:id,fact:{factClass:"mi_death",targetDeathConfirmed:true,selectedOutcomeRef:deterministic?"DETERMINISTIC_KILL_KILLED":"LETHAL_ATTEMPT_KILLED",semanticClass:deterministic?"KILL — GUARANTEED":"ATTEMPT TO KILL — RESOLVER-DETERMINED",packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_PERSON",recovered:false}}});
}
function freshResolver(){
 death("mi-death-resolver",false);
 return{sceneId:SCENE_ID,instanceId:"qa-postmi-resolver",beatId:RESOLVER_SOURCE,localContext:{kakashiScene06AW2CResolutionOccurrenceId:"mi-death-resolver",kakashiScene06AW2CPackageAvailable:true,kakashiScene06AW2CAMTAvailable:true,kakashiScene05AWTurnCount:3},battleResume:{authored:null}};
}
function freshDet(){
 death("mi-death-det",true);
 return{sceneId:SCENE_ID,instanceId:"qa-postmi-det",beatId:DKILL_SOURCE,localContext:{kakashiDeterministicKillOccurrenceId:"mi-death-det",kakashiDeterministicKillPackageAvailable:true,kakashiDeterministicKillAmtAvailable:true,kakashiScene05AWTurnCount:2},battleResume:{authored:null}};
}
function drainNarration(target,max=120){
 let n=0;
 while(active.beatId!==target&&n++<max){
  const out=globalThis.advanceStoryScene();
  assert(out&&out.success===true,"narration advance failed before "+target+": "+JSON.stringify(out));
 }
 assert.strictEqual(active.beatId,target,"did not reach "+target);
}
function simulateBattleReturn(battleBeatId,result,returnBeatId){
 const beat=definition.beatMap.get(battleBeatId);assert(beat&&beat.battle,"battle beat missing "+battleBeatId);
 const launched=beat.battle.launchResolver({active,returnContext:{postBattleBeatId:returnBeatId}});
 assert.strictEqual(launched.success,true,"battle launch failed "+JSON.stringify(launched));
 active.battleResume={authored:result};active.beatId=returnBeatId;
}

load("runtime/alpha-kakashi-post-mi-death-pursuit-35830.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_POST_MI_DEATH_PURSUIT_35830;
assert(MOD,"35830 module missing");
const diag=globalThis.runAcademyKakashiPostMiDeathPursuit35830Diagnostics();
assert.strictEqual(diag.pass,true,"35830 diagnostics failed: "+JSON.stringify(diag.failed));

participantStates[MI]={participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-live-mi"};
store.set("battle-mi-live",{occurrenceId:"battle-mi-live",fact:{factClass:"battle_result"}});
active={sceneId:SCENE_ID,instanceId:"qa-postmi-live",beatId:LIVE_SOURCE,localContext:{kakashiScene05AWEntered:true,kakashiScene05AWBattleOccurrenceId:"battle-mi-live",kakashiScene05AWTurnCount:3,kakashiScene05AWPackagePursuitEligible:true,kakashiScene05AWAmtPursuitEligible:true},battleResume:{authored:null}};
MOD.wireEntryChoices();
let out=globalThis.advanceStoryScene("scene05aw_go_after_package_smuggler");
assert.strictEqual(out.success,true,"live post-MI PS pursuit choice failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.beats.psChase,"live fast-win pursuit did not enter authored PS chase");
const liveSelection=store.get(active.localContext.kakashiPostMiPursuitSelectionOccurrenceId);
assert(liveSelection,"live pursuit selection occurrence missing");
assert.strictEqual(liveSelection.fact.miDeathAlreadyCommitted,false,"live pursuit falsely committed MI death");
assert.strictEqual(liveSelection.fact.sourceMiResolutionState,"DEFEATED_BUT_NOT_CONTROLLED");

participantStates[MI]={participantRef:MI,stateClass:"DEAD"};
active=freshResolver();MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene06aw2c_postlethal_go_after_package_smuggler");
assert.strictEqual(out.success,true,"PS pursuit choice failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.beats.psChase);
assert.strictEqual(participantStates[MI].stateClass,"DEAD","MI death was rewritten by successor entry");
const deathCount=[...store.values()].filter(x=>x&&x.fact&&x.fact.factClass==="mi_death").length;

drainNarration(MOD.beats.psBattle);
simulateBattleReturn(MOD.beats.psBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps",battleOccurrenceId:"qa-ps-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.psReturn);
out=MOD.consumePsReturn();
assert.strictEqual(out.success,true,"PS Battle return failed: "+JSON.stringify(out));
assert.strictEqual(out.victory,true);
assert.strictEqual(out.amtEligible,true,"2-turn PS victory must preserve AMT reach");
assert.strictEqual(recoveryCalls,1,"AK_SA_033 package recovery was not invoked");
assert.strictEqual(active.localContext.kakashiPostMiPackageOccurrenceId,"kak_seq_secure_package_after_ps");
assert.strictEqual(store.get("kak_seq_secure_package_after_ps").fact.packageState.currentHolderClass,"KAKASHI");
assert.strictEqual(participantStates[PS].stateClass,"DEFEATED_BUT_NOT_CONTROLLED");

drainNarration(MOD.beats.psDecision);
let psChoices=definition.beatMap.get(MOD.beats.psDecision).choices;
assert.deepStrictEqual(psChoices.map(x=>x.label),["GO AFTER ANBU MARKED TARGET","ATTEMPT TO KILL HIM","RETURN TO ANBU","RESTRAIN HIM AND CONTINUE"]);
assert.strictEqual(psChoices.find(x=>x.label==="RESTRAIN HIM AND CONTINUE").availability().available,false,"CE #244 choice must remain fail-closed");
const attempt=globalThis.advanceStoryScene("postmi_ps_attempt_kill");
assert.strictEqual(attempt.success,false);
assert.strictEqual(attempt.reason,"package_smuggler_lethal_attempt_owning_resolver_result_required");
assert.strictEqual(active.beatId,MOD.beats.psDecision);

out=globalThis.advanceStoryScene("postmi_ps_go_amt");
assert.strictEqual(out.success,true);
drainNarration(MOD.beats.amtBattle);
assert.strictEqual(active.localContext.kakashiPostMiPakkunPresent,true,"Pakkun must commit only when AMT is reached");
simulateBattleReturn(MOD.beats.amtBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",battleOccurrenceId:"qa-amt-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.amtReturn);
out=MOD.consumeAmtReturn();
assert.strictEqual(out.success,true,"AMT Battle return failed: "+JSON.stringify(out));
assert.strictEqual(participantStates[AMT].stateClass,"CONTROLLED_DEFEATED");
drainNarration(MOD.beats.amtDecision);
let amtChoices=definition.beatMap.get(MOD.beats.amtDecision).choices;
assert.deepStrictEqual(amtChoices.map(x=>x.label),["BRING HIM TO THE UCHIHA POLICE FORCE","LET HIM GO","KILL HIM","TAKE HIM BACK TO THE ANBU","RESTRAIN HIM AND TURN HIM INTO ANBU","RESTRAIN HIM AND TURN HIM INTO THE UCHIHA POLICE FORCE"]);
assert.strictEqual(amtChoices[4].availability().available,false);
assert.strictEqual(amtChoices[5].availability().available,false);

out=globalThis.advanceStoryScene("postmi_amt_kill");
assert.strictEqual(out.success,true);
assert.strictEqual(active.beatId,MOD.beats.amtReport,"PS->AMT deterministic kill should not borrow direct-AMT missing-package narration");
assert.strictEqual(participantStates[AMT].stateClass,"DEAD","deterministic AMT KILL did not commit death");
assert.strictEqual(store.get(active.localContext.kakashiPostMiPackageOccurrenceId).fact.packageState.currentHolderClass,"KAKASHI","AMT kill rewrote package custody");
assert.strictEqual([...store.values()].filter(x=>x&&x.fact&&x.fact.factClass==="mi_death").length,deathCount,"MI death was recommitted/rerolled");

active=freshDet();participantStates[MI]={participantRef:MI,stateClass:"DEAD"};delete participantStates[AMT];launches.length=0;
MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene06aw2c_dkill_go_after_anbu_marked_target");
assert.strictEqual(out.success,true,"direct AMT choice failed: "+JSON.stringify(out));
assert.strictEqual(active.localContext.kakashiPostMiPsPursuitClosedPermanently,true,"direct AMT fork did not close PS pursuit");
assert.strictEqual(active.localContext.kakashiDeterministicKillPackageAvailable,false,"direct AMT fork left PS route open");
drainNarration(MOD.beats.amtBattle);
assert.strictEqual(active.localContext.kakashiPostMiPakkunPresent,true);
const amtLaunch=definition.beatMap.get(MOD.beats.amtBattle).battle.launchResolver({active,returnContext:{}});
assert.strictEqual(amtLaunch.success,true);
assert.strictEqual(launches[0].battleConfigId,"academy_kakashi_origin_battle_seq_amt_pakkun");
assert.strictEqual(launches[0].pakkunAuthorized,true);
assert.strictEqual(store.get(active.localContext.kakashiPostMiPackageOccurrenceId).fact.packageState.currentHolderClass,"PACKAGE_SMUGGLER","direct AMT pursuit fabricated package transfer");

active.battleResume={authored:{battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",battleOccurrenceId:"qa-amt-loss",resultState:"opposition_side_victory",playerActionOpportunityCount:2,participants:[]}};
active.beatId=MOD.beats.amtReturn;active.localContext.kakashiPostMiAmtReturnProcessed=false;
const loss=MOD.consumeAmtReturn();
assert.strictEqual(loss.success,false);
assert.strictEqual(loss.reason,"post_mi_amt_defeat_requires_package_and_pakkun_autonomy_resolution","AMT defeat must fail closed until package + Pakkun autonomy resolve");

assert(saves>0);
console.log("Academy Kakashi post-MI-death pursuit 35830 QA: PASS");
console.log("- live fast-win PS pursuit and post-kill PS/AMT pursuit entries use direct authored successor routing");
console.log("- committed MI death is never rerolled across lethal successor selection");
console.log("- PS route uses sequential PS Battle config and separate AK_SA_033 package recovery");
console.log("- <=3 PS victory preserves AMT route; PS ATTEMPT lethal remains resolver-owned/fail-closed");
console.log("- legitimate AMT reach commits Pakkun and uses sequential AMT+Pakkun config");
console.log("- AMT controlled victory exposes exact disposition family; CE #244 extensions stay blocked");
console.log("- deterministic AMT KILL preserves package custody");
console.log("- direct AMT fork permanently closes PS pursuit");
console.log("- AMT defeat refuses to invent object/Pakkun autonomy resolution");
