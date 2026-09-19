#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE="origin_academy_kakashi_anbu_retrieval";
const SUCCESS="kak_get_closer_success",FAILURE="kak_get_closer_failure",TERMINAL="kak_seq_debrief_pending";
const AMT="academy_kakashi_origin_amt",PS="academy_kakashi_origin_package_smuggler",MI="academy_kakashi_origin_masked_interceptor",PAKKUN="pakkun_origin_unfamiliar_ninken",PACKAGE="kakashi_origin_outer_route_packet";
globalThis.playerData={};globalThis.savePlayerData=()=>true;
load("runtime/alpha-story-decision-realisation-34000.js");
load("runtime/alpha-kakashi-final-origin-adapter-34100-core.js");

const store=new Map();
globalThis.SC_ALPHA_ORIGIN_32900={
 commitOccurrence(originId,occurrenceId,fact,links,meta){if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};const row={originId,occurrenceId,storySceneInstanceId:fact&&fact.storySceneInstanceId||null,fact,links,meta};store.set(occurrenceId,row);return{success:true,record:row};},
 findOccurrence(id){return store.get(String(id||""))||null;}
};
let seq=0;
globalThis.SC_STORY_FACTUAL_RESOLVER_34600={
 stableRef(prefix,payload){return prefix+"::"+JSON.stringify(payload||{});},
 resolveStoryFactualAction(req){
  if(req.bindingRef!=="academy_kakashi.resolver.pickpocket_improved")return{success:false,reason:"qa_binding_unknown"};
  const receiptId="qa-factual-"+(++seq);
  return{success:true,receipt:{storyFactualResolverReceiptId:receiptId,selectedOutcomeRef:"PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1",successorSituationRef:"battle_transition",consequenceRefs:[],stateDeltaRefs:[]},result:{outcomeClass:"PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1",cleanExtractionSucceeded:false,battleRequired:true,battleConfigId:"academy_kakashi_origin_battle_amt_ps_2v1"}};
 }
};

const launches=[];
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300={
 configs:{
  academy_kakashi_origin_battle_amt_ps_2v1:{id:"academy_kakashi_origin_battle_amt_ps_2v1",pakkun:false},
  academy_kakashi_origin_battle_ps_1v1:{id:"academy_kakashi_origin_battle_ps_1v1",pakkun:false}
 },
 launchAcademyKakashiOriginPlBattle(spec){launches.push(JSON.parse(JSON.stringify(spec)));return{success:true,battleId:"qa-battle-"+launches.length,battleConfigId:spec.battleConfigId};}
};
let reusedStrike=null;
globalThis.SC_ALPHA_KAKASHI_KONOHA_ROUTE_CLOSURE_35910={
 beats:{directIntro:"qa-direct-intro"},
 beginReusedDirectStrikePhysical(spec){reusedStrike=JSON.parse(JSON.stringify(spec));return{success:true,occurrenceId:"qa-reused-strike",nextBeatId:"qa-direct-intro"};}
};
const fieldCalls=[];
globalThis.SC_ALPHA_KAKASHI_FIELD_SECURED_35920={
 commitFieldSecured(ref,spec){fieldCalls.push({type:"field",ref,spec});globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:ref,stateClass:"FIELD_SECURED_PENDING_COLLECTION",resultRef:"qa-field-"+ref});return{success:true,occurrenceId:"qa-field-"+ref};},
 commitSingleInstitutionalTransfer(ref,dest,spec){fieldCalls.push({type:"transfer",ref,dest,spec});globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:ref,stateClass:dest==="ANBU"?"ANBU_INSTITUTIONAL_CUSTODY":"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY",resultRef:"qa-transfer-"+ref});return{success:true,occurrenceId:"qa-transfer-"+ref};}
};

const definition={sceneId:SCENE,beatMap:new Map([
 [SUCCESS,{beatId:SUCCESS,mode:"choice",choices:[
  {choiceId:"let_handoff_happen",label:"LET THEM MAKE THE HANDOFF",nextBeatId:"legacy",availability:()=>({available:true}),consequenceRequests:[]},
  {choiceId:"strike_before_handoff",label:"STRIKE BEFORE THE HANDOFF",nextBeatId:SUCCESS,availability:()=>({available:false}),knownBlocker:"legacy",consequenceRequests:[]},
  {choiceId:"attempt_pickpocket",label:"SLIP IN FOR THE PACKAGE",nextBeatId:SUCCESS,availability:()=>({available:false}),knownBlocker:"legacy",consequenceRequests:[]}
 ]}],
 [FAILURE,{beatId:FAILURE,mode:"choice",choices:[
  {choiceId:"stay_on_package",label:"STAY WITH THE PACKAGE",nextBeatId:"qa-stay",availability:()=>({available:true}),knownBlocker:null,consequenceRequests:[{requestId:"stay-existing",kind:"domain",resolve:()=>({success:true})}]},
  {choiceId:"stop_package_smuggler",label:"STOP THE MAN WHO SPOTTED YOU",nextBeatId:FAILURE,availability:()=>({available:false}),knownBlocker:"legacy",consequenceRequests:[]},
  {choiceId:"cut_off_sakura",label:"CUT THEM OFF AT THE SAKURA TREE",nextBeatId:FAILURE,availability:()=>({available:false}),knownBlocker:"legacy",consequenceRequests:[]}
 ]}],
 [TERMINAL,{beatId:TERMINAL,mode:"narration"}]
])};
let active=null;
globalThis.getStorySceneDefinition=id=>id===SCENE?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.normalizeStorySceneBeat=def=>def;
globalThis.projectAcademyKakashiOriginBattleResult=()=>null;

function parent(instance,outcome){
 const id="qa-parent-"+instance;
 const fact={factClass:"qa_get_closer",storySceneInstanceId:instance,selectedOutcomeRef:outcome,packageState:{objectRef:PACKAGE,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",handoffCompleted:false}};
 store.set(id,{occurrenceId:id,storySceneInstanceId:instance,fact});
 return id;
}
function runtime(instance,beat,outcome){
 const id=parent(instance,outcome);
 return{sceneId:SCENE,instanceId:instance,beatId:beat,localContext:{kakashiGetCloserOccurrenceId:id},battleResume:{authored:null}};
}
function choice(beat,id){return definition.beatMap.get(beat).choices.find(x=>x.choiceId===id);}
function runConsequence(row){const req=(row.consequenceRequests||[])[0];assert(req&&typeof req.resolve==="function","choice missing consequence");return req.resolve();}

load("runtime/alpha-kakashi-move-closer-closure-35930.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_MOVE_CLOSER_CLOSURE_35930;
assert(MOD,"35930 missing");
let diag=globalThis.runAcademyKakashiMoveCloserClosure35930Diagnostics();
assert.strictEqual(diag.pass,true,"35930 diagnostics failed: "+JSON.stringify(diag.failed));
assert.deepStrictEqual(definition.beatMap.get(SUCCESS).choices.map(x=>x.label),["LET THE HANDOFF HAPPEN","STRIKE BEFORE THE HANDOFF","ATTEMPT THE PICKPOCKET"]);
assert.deepStrictEqual(definition.beatMap.get(FAILURE).choices.map(x=>x.label),["STAY ON THE PACKAGE","STOP PACKAGE SMUGGLER","CUT THEM OFF AT THE SAKURA TREE"]);
assert.strictEqual(choice(FAILURE,"stay_on_package").consequenceRequests[0].requestId,"stay-existing","existing Stay-on-Package owner was clobbered");

// SUCCESS Strike uses AK_SA_029 and the precommitted Get-Closer success state.
active=runtime("qa-strike",SUCCESS,"GET_CLOSER_SUCCESS");
let out=runConsequence(choice(SUCCESS,"strike_before_handoff"));
assert.strictEqual(out.success,true);
assert(reusedStrike,"Strike physical reuse was not invoked");
assert.strictEqual(reusedStrike.bindingRef,"academy_kakashi.resolver.strike_before_handoff");
assert.strictEqual(reusedStrike.anchorRef,"AK_SA_029");
assert.strictEqual(reusedStrike.parentOccurrenceId,"qa-parent-qa-strike");
assert.strictEqual(reusedStrike.knowledgeStateRef,"qa-parent-qa-strike");
assert.strictEqual(choice(SUCCESS,"strike_before_handoff").nextBeatId,"qa-direct-intro");

// Improved Pickpocket failure remains AMT+PS only and MI unseen.
active=runtime("qa-improved",SUCCESS,"GET_CLOSER_SUCCESS");
out=runConsequence(choice(SUCCESS,"attempt_pickpocket"));
assert.strictEqual(out.success,true);
assert.strictEqual(out.selectedOutcomeRef,"PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1");
assert.strictEqual(out.nextBeatId,MOD.beats.improvedIntro);
active.beatId=MOD.beats.improvedBattle;
out=definition.beatMap.get(MOD.beats.improvedBattle).battle.launchResolver({active,returnContext:{type:"story_scene",sceneId:SCENE,beatId:MOD.beats.improvedReturn}});
assert.strictEqual(out.success,true);
let launch=launches.at(-1);
assert.strictEqual(launch.battleConfigId,"academy_kakashi_origin_battle_amt_ps_2v1");
assert.strictEqual(launch.pakkunAuthorized,false);
active.beatId=MOD.beats.improvedReturn;
active.battleResume={authored:{battleConfigId:"academy_kakashi_origin_battle_amt_ps_2v1",bindingRef:"academy_kakashi.battle.pickpocket_improved_failure",battleOccurrenceId:"qa-improved-win",resultState:"player_side_victory",participants:[
 {participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},
 {participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}
]}};
out=MOD.consumeImprovedBattle();
assert.strictEqual(out.success,true);
assert.strictEqual(out.nextBeatId,MOD.beats.improvedGroup);
const improvedFact=store.get(out.occurrenceId).fact;
assert.strictEqual(improvedFact.worldFacts.maskedInterceptorVisible,false);
assert.strictEqual(improvedFact.worldFacts.pakkunPresent,false);
assert.strictEqual(improvedFact.packageState.currentHolderClass,"KAKASHI");
assert.deepStrictEqual(definition.beatMap.get(MOD.beats.improvedGroup).choices.map(x=>x.label),["TAKE THEM TO THE UCHIHA POLICE FORCE","TAKE THEM TO THE ANBU","KILL THEM","TAKE THE PACKAGE AND LET THEM GO"]);
active.beatId=MOD.beats.improvedGroup;
out=MOD.commitTwoTargetDisposition("KILL");
assert.strictEqual(out.success,true);
let snap=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(snap.participantStates[AMT].stateClass,"DEAD");
assert.strictEqual(snap.participantStates[PS].stateClass,"DEAD");
assert(!snap.participantStates[MI],"improved Pickpocket route invented MI state");

// FAILURE Stop PS uses exact PS-only Battle and package remains with escaped AMT.
active=runtime("qa-stopps",FAILURE,"GET_CLOSER_FAILURE");
out=runConsequence(choice(FAILURE,"stop_package_smuggler"));
assert.strictEqual(out.success,true);
active.beatId=MOD.beats.psBattle;
out=definition.beatMap.get(MOD.beats.psBattle).battle.launchResolver({active,returnContext:{type:"story_scene",sceneId:SCENE,beatId:MOD.beats.psReturn}});
assert.strictEqual(out.success,true);
launch=launches.at(-1);
assert.strictEqual(launch.battleConfigId,"academy_kakashi_origin_battle_ps_1v1");
assert.strictEqual(launch.pakkunAuthorized,false);
active.beatId=MOD.beats.psReturn;
active.battleResume={authored:{battleConfigId:"academy_kakashi_origin_battle_ps_1v1",bindingRef:"academy_kakashi.battle.stop_package_smuggler",battleOccurrenceId:"qa-stopps-win",resultState:"player_side_victory",participants:[{participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]}};
out=MOD.consumeFailurePs();
assert.strictEqual(out.success,true);
assert.strictEqual(out.nextBeatId,MOD.beats.psDisposition);
assert.strictEqual(store.get(out.occurrenceId).fact.packageState.currentHolderClass,"ANBU_MARKED_TARGET");
active.beatId=MOD.beats.psDisposition;
out=MOD.commitPsDisposition("RESTRAIN");
assert.strictEqual(out.success,true);
assert(fieldCalls.some(x=>x.type==="field"&&x.ref===PS&&x.spec.locationRef==="KAKASHI_PS_ALT_NIGHT_STREET"),"PS restraint did not use exact field-secured location");

// FAILURE Cut-Off: Pakkun is Story-present but this exact 2v1 grants no Pakkun Battle action source.
active=runtime("qa-cutoff",FAILURE,"GET_CLOSER_FAILURE");
out=runConsequence(choice(FAILURE,"cut_off_sakura"));
assert.strictEqual(out.success,true);
const entryFact=store.get(out.occurrenceId).fact;
assert.strictEqual(entryFact.worldFacts.pakkunPresent,true);
assert.strictEqual(entryFact.worldFacts.pakkunBattleActionAuthorized,false);
active.beatId=MOD.beats.cutBattle;
out=definition.beatMap.get(MOD.beats.cutBattle).battle.launchResolver({active,returnContext:{type:"story_scene",sceneId:SCENE,beatId:MOD.beats.cutReturn}});
assert.strictEqual(out.success,true);
launch=launches.at(-1);
assert.strictEqual(launch.battleConfigId,"academy_kakashi_origin_battle_amt_ps_2v1");
assert.strictEqual(launch.pakkunAuthorized,false,"Cut-Off must not convert Story Pakkun into a Combat action source");
active.beatId=MOD.beats.cutReturn;
active.battleResume={authored:{battleConfigId:"academy_kakashi_origin_battle_amt_ps_2v1",bindingRef:"academy_kakashi.battle.cut_off_sakura",battleOccurrenceId:"qa-cutoff-win",resultState:"player_side_victory",participants:[
 {participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},
 {participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}
]}};
out=MOD.consumeFailureCut();
assert.strictEqual(out.success,true);
assert.strictEqual(out.nextBeatId,MOD.beats.cutGroup);
assert.strictEqual(store.get(out.occurrenceId).fact.worldFacts.pakkunPresent,true);
active.beatId=MOD.beats.cutGroup;
out=MOD.commitTwoTargetDisposition("RELEASE");
assert.strictEqual(out.success,true);
snap=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(snap.participantStates[AMT].stateClass,"DELIBERATELY_RELEASED");
assert.strictEqual(snap.participantStates[PS].stateClass,"DELIBERATELY_RELEASED");
assert.strictEqual(snap.participantStates[PAKKUN].stateClass,"DEPARTED");

diag=globalThis.runAcademyKakashiMoveCloserClosure35930Diagnostics();
assert.strictEqual(diag.pass,true);
console.log("Academy Kakashi Move-In-Closer closure 35930 QA: PASS");
console.log("- SUCCESS Strike reuses the fixed physical chain with AK_SA_029 and retained Get-Closer Knowledge provenance");
console.log("- improved Pickpocket failure is AMT+PS only; MI remains unseen and Pakkun absent");
console.log("- FAILURE Stop Package Smuggler uses exact PS 1v1 and package-missing singular dispositions");
console.log("- FAILURE Cut-Off uses exact AMT+PS 2v1 with Pakkun Story-present but no Combat action source");
console.log("- two-target group dispositions preserve participant-level state and explicit Pakkun departure");
console.log("- Browser Golden is intentionally NOT claimed by this headless harness");
