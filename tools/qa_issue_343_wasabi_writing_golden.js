#!/usr/bin/env node
"use strict";

const fs=require("fs"),vm=require("vm"),assert=require("assert");

const STORY="runtime/alpha-origin-scenes-32900-a.js";
const CATALOGUE="runtime/academy-wasabi-writing-golden-343.js";
const BATTLE="runtime/alpha-wasabi-rogue-battle-343.js";
const CORE="game.js";
const RESOLVER="runtime/alpha-story-machine-resolver-343.js";
const PURSE="runtime/alpha-origin-starting-purse-409.js";
const DOC="Documentation/Story/Academy_Wasabi_Izuno_Origin_Complete_Rewrite_v2_2026-09-29.md";
for(const p of [STORY,CATALOGUE,BATTLE,CORE,RESOLVER,PURSE,DOC])assert(fs.existsSync(p),"missing #343 authority/runtime file "+p);

const storySource=fs.readFileSync(STORY,"utf8");
const catalogueSource=fs.readFileSync(CATALOGUE,"utf8");
const battleSource=fs.readFileSync(BATTLE,"utf8");
const coreSource=fs.readFileSync(CORE,"utf8");
const resolverSource=fs.readFileSync(RESOLVER,"utf8");
const purseSource=fs.readFileSync(PURSE,"utf8");
const doc=fs.readFileSync(DOC,"utf8");

const scenes=new Map(),commits=[];
let activeRt={sceneId:"origin_academy_izuno_prologue",instanceId:"qa-wasabi-scene",localContext:{},battleResume:null};
const A={
  sceneByVariant:{academy_hinata:"origin_academy_hinata_prologue",academy_izuno:"origin_academy_izuno_prologue",academy_mirai:"origin_academy_mirai_prologue"},
  clone(v){return v&&typeof v==="object"?JSON.parse(JSON.stringify(v)):v;},
  active(){return activeRt;},
  local(){return activeRt&&activeRt.localContext||{};},
  choice(choiceId,label,nextBeatId,contextPatch=null,extra={}){return{choiceId,label,nextBeatId,contextPatch,...extra};},
  commitRequest(requestId,originId,occurrenceId,factResolver,rowIdsResolver,optionsResolver){
    return{requestId,kind:"domain",__originId:originId,__occurrenceId:occurrenceId,__factResolver:factResolver,__rowIdsResolver:rowIdsResolver,__optionsResolver:optionsResolver,resolve:()=>({success:true})};
  },
  completionRequest(originId,evidenceIds){return{requestId:"complete_"+originId+"_origin_32900",kind:"domain",__originId:originId,__evidenceIds:evidenceIds,resolve:()=>({success:true})};},
  unavailableBattle(_scene,label){return()=>({available:false,knownBlocker:label});},
  commitOccurrence(originId,occurrenceId,fact,rowIds,options){
    const prior=commits.find(x=>x.occurrenceId===occurrenceId);
    if(prior)return{success:true,idempotent:true,record:prior};
    const row={originId,occurrenceId,fact:JSON.parse(JSON.stringify(fact||{})),rowIds:[...(rowIds||[])],options:JSON.parse(JSON.stringify(options||{}))};
    commits.push(row);return{success:true,record:row};
  },
  register(def){const copy={...def,beatMap:new Map((def.beats||[]).map(b=>[b.beatId,b]))};scenes.set(def.sceneId,copy);return{success:true,sceneId:def.sceneId};}
};
const storyCtx={console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,SC_ALPHA_ORIGIN_32900:A,savePlayerData:()=>true};
storyCtx.globalThis=storyCtx;
vm.createContext(storyCtx);
vm.runInContext(catalogueSource,storyCtx,{filename:CATALOGUE});
assert.strictEqual(storyCtx.runAcademyWasabiWritingGolden343Diagnostics().pass,true,JSON.stringify(storyCtx.runAcademyWasabiWritingGolden343Diagnostics(),null,2));
vm.runInContext(storySource,storyCtx,{filename:STORY});

const def=scenes.get("origin_academy_izuno_prologue");
assert(def,"Wasabi GOLDEN scene missing");
const beats=def.beats||[],byId=def.beatMap;
const wasabiSource=storySource.slice(storySource.indexOf("// Wasabi Izuno"),storySource.indexOf("// Mirai"));
function labels(id){const b=byId.get(id);assert(b,"missing beat "+id);return Array.from(b.choices||[],x=>String(x.label));}
function choice(id,cid){const b=byId.get(id);assert(b,"missing beat "+id);const x=(b.choices||[]).find(v=>v.choiceId===cid);assert(x,"missing choice "+id+"/"+cid);return x;}
function tail(prefix){const rows=beats.filter(b=>b.beatId.startsWith(prefix+"_")).sort((a,b)=>Number(a.beatId.slice(prefix.length+1))-Number(b.beatId.slice(prefix.length+1)));assert(rows.length,"missing sequence "+prefix);return rows.at(-1);}
function cueTexts(prefix){return beats.filter(b=>b.beatId.startsWith(prefix+"_")).map(b=>b.text);}

// Exact current player choice surfaces.
assert.deepStrictEqual(labels("izu_initial_choice"),[
  "TAKE THE OBVIOUS TRAIL","LOOK FOR SOMETHING BETTER","WORK WITH THE OTHERS","FORGET THE TRAIL — WHERE ARE THEY GOING?"
]);
assert.deepStrictEqual(labels("izu_split_choice"),["TAKE THE RIVER","FOLLOW THE STRONGER TRAIL","CHECK THE SHOUTING","CUT FOR THE INTERCEPT"]);
assert.deepStrictEqual(labels("izu_rogue_choice"),["STEP IN","CALL FOR HELP","KEEP PURSUING"]);
assert.strictEqual(byId.has("izu_reflect"),false,"retired universal Wasabi reflection beat returned");
assert.deepStrictEqual(labels("izu_reflect_river"),["I caught them the hard way.","Next time I beat that time.","Give them a bigger head start.","I want the rematch."]);
assert.deepStrictEqual(labels("izu_reflect_intercept"),["Why chase from behind if I can get there first?","The route mattered more than the trail.","I trusted my read. It worked.","Next time I cut them off sooner."]);
assert.deepStrictEqual(labels("izu_reflect_false"),["They got me with that one.","I saw the trick. Just too late.","Next time I check what doesn't fit.","They'll need a better trick next time."]);
assert.deepStrictEqual(labels("izu_reflect_step_in"),["I'd step in again.","Next time I end the fight faster.","The target got away. I still finished what I started.","I need to know how much time a fight really costs."]);
assert.deepStrictEqual(labels("izu_reflect_call_for_help"),["Calling the instructor was faster.","I got the student moving.","Next time I hand it off sooner.","I can watch the chase and the people in it."]);
assert.deepStrictEqual(labels("izu_reflect_keep_pursuing"),["I chose the target.","I waited too long before I moved.","Next time I decide immediately.","Give me another shot at the chase."]);

// Writing-closed 2026-09-27 exact backdrop contract.
for(const backdrop of [
  "Izuno Origin Backdrop/practical_ground_day.png",
  "Izuno Origin Backdrop/konoha_rooftop_pursuit_day.png",
  "Izuno Origin Backdrop/konoha_main_street.png",
  "Izuno Origin Backdrop/river_route_day.png",
  "Izuno Origin Backdrop/konoha_narrow_yard.png",
  "Izuno Origin Backdrop/konoha_alleyway_day.png",
  "Izuno Origin Backdrop/training_grounds_day.png"
])assert(wasabiSource.includes(backdrop),"missing exact Wasabi backdrop binding "+backdrop);
assert(wasabiSource.includes("function izunoBackdropKey32900"),"Wasabi backdrop resolver missing");
assert(wasabiSource.includes('if(id.startsWith("izu_rogue_"))return"alley"'),"Scene 4C alley continuity missing");
assert(wasabiSource.includes('id.startsWith("izu_finish_")'),"Scene 5 training convergence missing");
assert(wasabiSource.includes("registerWasabiOriginPresentation32900();"),"Wasabi Scene Board backdrop registration missing");
const returnBridge=byId.get("izu_rogue_step_in_return_1");
assert(returnBridge&&returnBridge.mode==="post_battle","STEP IN does not return through dedicated post-Battle alley bridge");
assert.strictEqual(returnBridge.nextBeatId,"izu_finish_secondary_1","STEP IN return skips Scene 5 secondary finish");
assert.deepStrictEqual(JSON.parse(JSON.stringify(cueTexts("izu_finish_secondary"))),Array.from(storyCtx.SC_ACADEMY_WASABI_WRITING_GOLDEN_343.get("finish_secondary"),cue=>cue.text),"Scene 5 secondary finish prose drifted");

// Stephen-installed-browser RED repair: actor projection + shared Receipt.
for(const actorPath of [
  "Assets/Academy Student/academy_izuno.png",
  "NPC/izuno_instructor.png",
  "Enemies/rogue_genin.png"
])assert(wasabiSource.includes(actorPath),"missing Wasabi actor-card binding "+actorPath);
assert(wasabiSource.includes("function izunoActors32900"),"Wasabi actor projection resolver missing");
assert(wasabiSource.includes('if(id.startsWith("izu_open_"))return["wasabi","instructor"]'),"HEAD START does not stage Wasabi + Instructor");
assert(wasabiSource.includes('if(id.startsWith("izu_eval_"))return["wasabi","instructor"]'),"evaluation does not stage Wasabi + Instructor");
assert(wasabiSource.includes('return["wasabi","student1","rogue"]'),"Rogue interruption does not stage Wasabi + affected student + Rogue Genin");
assert(wasabiSource.includes('if(id.startsWith("izu_finish_river_")||id.startsWith("izu_finish_intercept_"))return["wasabi","target","proctor"]'),"successful pursuit finish does not stage target + proctor");
const receiptBeat=byId.get("izu_receipt");
assert(receiptBeat&&receiptBeat.mode==="record"&&receiptBeat.exitScene===true,"mandatory Wasabi Chronicle Receipt beat missing");
assert.strictEqual(tail("izu_close").nextBeatId,"izu_receipt","Origin Close bypasses mandatory Chronicle Receipt");
assert(wasabiSource.includes("function buildWasabiReceipt32900"),"Wasabi Chronicle Receipt builder missing");
assert(wasabiSource.includes('"YOUR DECISIONS"')&&wasabiSource.includes('"WHAT HAPPENED"')&&wasabiSource.includes('"HISTORY CREATED"'),"Receipt semantic groupings missing");
assert(wasabiSource.includes("A.findOccurrence(tracking)")&&wasabiSource.includes("A.findOccurrence(intercept)")&&wasabiSource.includes("A.findOccurrence(coop)")&&wasabiSource.includes("A.findOccurrence(rogue)"),"Receipt does not read committed Wasabi history");
assert(wasabiSource.includes('performanceTransitions:{[closeLastBeatId]:"wipe_right_to_left"}'),"Origin Close -> Receipt black wipe missing");
assert(wasabiSource.includes('target:Object.freeze({id:"wasabi_origin_pursuit_target_01",label:"TARGET",image:"NPC/pursuit_target.png"})'),"resolved #419 pursuit-target asset path missing");
for(const token of [
  "intelligence.strategic_intelligence_analyst:multi_source_analysis",
  "communications_and_cryptography.battlefield_communications_specialist:communications_planning",
  "intelligence.counter_intelligence_analyst:deception_detection",
  "covert_operations.extraction_specialist:subject_recovery",
  "reconnaissance.tracker_nin:trail_analysis",
  "reconnaissance.tracker_nin:route_intercept_execution"
])assert(wasabiSource.includes(token),"#409 progression mapping missing "+token);
assert(wasabiSource.includes("significance:1")&&wasabiSource.includes("specialistLevel:false"),"#409 evidence envelope drift");
assert(wasabiSource.includes("commitRiverStamina40900")&&wasabiSource.includes("expGranted:1"),"#409 River +1 Stamina missing");
assert(purseSource.includes('SOURCE_ID="origin_completion_starting_purse_ryo_01"')&&purseSource.includes("const AMOUNT=100"),"#409 modular shared Origin purse missing");
assert(!coreSource.includes("ORIGIN_COMPLETION_STARTING_PURSE_SOURCE_ID"),"frozen game.js was reopened for #409 purse");

// Owner-approved complete rewrite v2 voice/dialogue anchors.
for(const [prefix,line] of [
  ["izu_open","You started without me?"],
  ["izu_initial_obvious","But I'm not standing here until I am!"],
  ["izu_initial_better","A better answer!"],
  ["izu_initial_cooperate","Since you both asked me!"],
  ["izu_initial_predict","They can't lie about where they're going."],
  ["izu_rogue_step_in","So let's not waste time."],
  ["izu_rogue_call_help","INSTRUCTOR!"],
  ["izu_intercept","Oh, no. You don't get to leave now!"],
  ["izu_close","Race you to the corner."],
  ["izu_close","Finally."]
]) assert(cueTexts(prefix).includes(line),"missing v2 line "+prefix+" :: "+line);
assert(storyCtx.SC_ACADEMY_WASABI_WRITING_GOLDEN_343.get("eval_rogue_call_help").some(c=>c.text==="You called me in."));
assert(storyCtx.SC_ACADEMY_WASABI_WRITING_GOLDEN_343.get("eval_rogue_keep_pursuing").some(c=>c.text==="You kept moving."));
assert(!catalogueSource.includes('"text": "You lost."'),"retired universal loss line returned");
assert(!catalogueSource.includes("Next time I'm trusting the trail."),"retired universal reflection copy returned");

// Frozen Story core is preserved. The scoped #343 adapter consumes hidden
// deterministic resolver beats through existing Story choice authority.
assert(resolverSource.includes('mode:"narration"')&&resolverSource.includes("machineResolver343=true"),"scoped resolver does not map authored machine beats to supported internal mode");
assert(resolverSource.includes("function resolveMachineStoryBeat343()"),"scoped machine Story resolver missing");
assert(resolverSource.includes('available.length!==1')&&resolverSource.includes("story_machine_resolver_cardinality_invalid"),"machine resolver does not fail closed on non-single eligibility");
assert(resolverSource.includes("applyStorySceneChoice(available[0].choiceId)"),"machine resolver bypasses existing Story choice authority");
assert(resolverSource.includes("story_machine_resolver_player_choice_forbidden"),"machine resolver accepts player-forced internal branch");
assert(resolverSource.includes("render:false"),"machine resolver can render its hidden branch surface");
assert(!resolverSource.slice(resolverSource.indexOf("function resolveMachineStoryBeat343()"),resolverSource.indexOf("globalThis.resolveMachineStoryBeat343")).includes(".label"),"machine resolver infers semantics from labels");
assert(!coreSource.includes("function resolveMachineStorySceneBeat()"),"frozen game.js was reopened for #343 machine resolver");

// Closed graph and one legal PL Battle seam only.
const ids=new Set(beats.map(b=>b.beatId));
for(const b of beats){
  if(b.nextBeatId)assert(ids.has(b.nextBeatId),"missing next target "+b.beatId+" -> "+b.nextBeatId);
  for(const ch of b.choices||[])if(ch.nextBeatId)assert(ids.has(ch.nextBeatId),"missing choice target "+b.beatId+"/"+ch.choiceId);
  if(b.battle){
    assert.strictEqual(b.beatId,"izu_rogue_step_in_battle","unauthorised Wasabi PL Battle "+b.beatId);
    assert.strictEqual(b.battle.encounterId,"origin_academy_izuno_rogue_genin_step_in");
    assert.strictEqual(b.battle.battleConfigId,"academy_izuno_origin_rogue_genin_step_in_battle");
    assert.strictEqual(b.battle.environmentPath,"Izuno Origin Backdrop/konoha_alleyway_day.png");
    assert.strictEqual(b.battle.backdrop,"Izuno Origin Backdrop/konoha_alleyway_day.png");
    assert.strictEqual(b.battle.victoryBeatId,"izu_rogue_step_in_return_1");
    assert.strictEqual(b.battle.defeatBeatId,"izu_rogue_step_in_return_1");
  }
}
assert.strictEqual(beats.filter(b=>b.battle).length,1,"Wasabi must have exactly one authorised Battle seam");
const reachable=new Set([def.entryBeatId]),queue=[def.entryBeatId];
while(queue.length){
  const id=queue.shift(),b=byId.get(id);if(!b)continue;
  const targets=[
    b.nextBeatId,
    ...(b.choices||[]).map(x=>x.nextBeatId),
    b.battle&&b.battle.victoryBeatId,
    b.battle&&b.battle.defeatBeatId
  ].filter(Boolean);
  for(const t of targets)if(!reachable.has(t)){reachable.add(t);queue.push(t);}
}
const unreachable=Array.from(beats,b=>b.beatId).filter(id=>!reachable.has(id));
assert.strictEqual(unreachable.length,0,"unreachable Wasabi GOLDEN beats: "+unreachable.join(","));

// Exact factual source addresses.
for(const id of [
  "occ_origin_izuno_pursuit_tracking_resolution",
  "occ_origin_izuno_intercept_prediction_resolution",
  "occ_origin_izuno_pursuit_cooperation_resolution",
  "occ_origin_izuno_rogue_genin_interruption_resolution",
  "occ_origin_izuno_river_endurance_resolution"
])assert(wasabiSource.includes(id),"missing Wasabi source occurrence "+id);
assert(wasabiSource.includes('"wasabi_origin_rogue_genin_01"')&&wasabiSource.includes('"wasabi_origin_interference_student"'));

// IZU-02 is actual prediction intercept, not merely choosing prediction thinking earlier.
const interceptReq=byId.get("izu_after_base_1").onEnterConsequences.find(x=>x.requestId==="izu_intercept_32900");
assert(interceptReq,"IZU-02 request missing");
assert.deepStrictEqual(JSON.parse(JSON.stringify(interceptReq.__factResolver({outcome:"intercept_before_extraction"}))),{
  interceptReachedByPrediction:true,pursuitOutcome:"intercept_before_extraction",academyTrackingRecommendation:true
});
assert.deepStrictEqual(JSON.parse(JSON.stringify(interceptReq.__rowIdsResolver({outcome:"intercept_before_extraction"}))),["IZU-02"]);
assert.deepStrictEqual(JSON.parse(JSON.stringify(interceptReq.__rowIdsResolver({predictionApproach:true,outcome:"direct_catch"}))),[]);
assert.strictEqual(choice("izu_split_choice","river_route").contextPatch.outcome,"direct_catch");
assert.strictEqual(choice("izu_split_choice","intercept_prediction").contextPatch.outcome,"intercept_before_extraction");
assert.strictEqual(choice("izu_split_choice","stronger_trail").contextPatch.outcome,"false_trail_discovered");

// Rogue response remains separate from pursuit outcome.
assert.deepStrictEqual(JSON.parse(JSON.stringify(choice("izu_rogue_choice","intervene").contextPatch)),{
  rogueGeninResponse:"intervene",rogueResponse:"intervene",rogueResolved:false,outcome:"secondary_occurrence_costs_pursuit"
});
assert.deepStrictEqual(JSON.parse(JSON.stringify(choice("izu_rogue_choice","call_for_help").contextPatch)),{
  rogueGeninResponse:"call_for_help",rogueResponse:"call_for_help",rogueGeninInterruptionResolvedByWasabiAction:true,rogueResolved:true,battleOccurrenceIds:[],outcome:"secondary_occurrence_costs_pursuit"
});
assert.deepStrictEqual(JSON.parse(JSON.stringify(choice("izu_rogue_choice","keep_pursuing").contextPatch)),{
  rogueGeninResponse:"keep_pursuing",rogueResponse:"keep_pursuing",rogueGeninInterruptionResolvedByWasabiAction:false,rogueResolved:false,battleOccurrenceIds:[],outcome:"secondary_occurrence_costs_pursuit"
});

const afterReqs=byId.get("izu_after_base_1").onEnterConsequences;
const rogueReq=afterReqs.find(x=>x.requestId==="izu_rogue_32900");
assert(rogueReq,"IZU-04 conditional request missing");
activeRt.localContext={rogueGeninResponse:"keep_pursuing",rogueResolved:false,battleOccurrenceIds:[]};
const skipped=rogueReq.resolve();
assert.strictEqual(skipped.success,true);assert.strictEqual(skipped.skipped,true);
assert.strictEqual(commits.some(x=>x.occurrenceId==="occ_origin_izuno_rogue_genin_interruption_resolution"),false,"KEEP PURSUING counterfeited resolved IZU-04");
activeRt.localContext={rogueGeninResponse:"call_for_help",rogueResolved:true,battleOccurrenceIds:[]};
const callCommit=rogueReq.resolve();
assert.strictEqual(callCommit.success,true);
const izu04=commits.find(x=>x.occurrenceId==="occ_origin_izuno_rogue_genin_interruption_resolution");
assert(izu04&&izu04.fact.rogueGeninResponse==="call_for_help");
assert.strictEqual(izu04.fact.rogueGeninInterruptionResolvedByWasabiAction,true);
assert.strictEqual(izu04.fact.affectedStudentPhysicallyRemoved,true);
assert.strictEqual(izu04.fact.affectedStudentParticipantRef,"wasabi_origin_interference_student");
assert.deepStrictEqual(izu04.fact.battleOccurrenceIds,[]);
assert.deepStrictEqual(izu04.rowIds,["IZU-04"]);

// Battle return records factual Battle result without turning victory into pursuit truth.
commits.length=0;
activeRt.localContext={rogueGeninResponse:"intervene",rogueResolved:false,outcome:"secondary_occurrence_costs_pursuit"};
const battleReturn=byId.get("izu_rogue_step_in_return_1").onEnterConsequences[0];
const br=battleReturn.resolve({sceneContext:{battleResume:{authored:{
  battleOccurrenceId:"battle_occ_origin_izuno_rogue_genin_step_in:qa-wasabi-scene",
  sourceOccurrenceId:"occ_origin_izuno_rogue_genin_interruption_resolution",
  historicalParticipantRef:"wasabi_origin_rogue_genin_01",
  oppositionTemplateId:"rogue_genin",
  battleResult:"victory",rogueGeninBattlePLDepleted:true,wasabiBattlePLDepleted:false
}}}});
assert.strictEqual(br.success,true,JSON.stringify(br));
assert.strictEqual(activeRt.localContext.rogueGeninResponse,"intervene");
assert.strictEqual(activeRt.localContext.rogueResolved,true);
assert.deepStrictEqual(Array.from(activeRt.localContext.battleOccurrenceIds||[]),["battle_occ_origin_izuno_rogue_genin_step_in:qa-wasabi-scene"]);
assert.strictEqual(activeRt.localContext.outcome,"secondary_occurrence_costs_pursuit","Battle victory rewrote pursuit result");

// No morality/personality/progression invention and no retired fail-closed STEP IN.
for(const forbidden of ["personalityTrait","alignment","specialization","morality","A.unavailableBattle(scene,\"STEP IN\"","rogueGeninDefeated"]){
  assert(!wasabiSource.includes(forbidden),"forbidden Wasabi inference/retired seam returned: "+forbidden);
}

// Battle adapter executes under bounded mocks.
const ratioCalls=[],evidenceRows=[];
const sessionRows=new Map();
const sessionStorage={
  getItem:key=>sessionRows.has(String(key))?sessionRows.get(String(key)):null,
  setItem:(key,value)=>{sessionRows.set(String(key),String(value));},
  removeItem:key=>sessionRows.delete(String(key)),
  clear:()=>sessionRows.clear()
};
const battleCtx={
  console,JSON,Object,Array,String,Number,Boolean,Set,Map,Date,globalThis:null,sessionStorage,
  Math:Object.create(Math),
  playerData:{ryo:0,activityHistory:[]},currentBattle:null,enemyDatabase:{},
  makeEnemyFixedDamageAction:(id,_pl,opts={})=>({id,skillId:id,actionClass:"enemy_authored_action",traits:opts.traits||[],evaluateAvailability:()=>({available:true}),resolve:()=>({resolved:true})}),
  makeEnemyRatioGuardAction:(id,ratio,opts={})=>{ratioCalls.push({id,ratio,opts});return{id,skillId:id,actionClass:"enemy_ratio_guard",traits:opts.traits||[],evaluateAvailability:()=>({available:true}),resolve:()=>({resolved:true})};},
  chooseEnemyAuthoredBattleAction:()=>({success:false,reason:"qa_generic"}),
  generateBattleRewards:()=>({generated:true,claimed:false,ryo:88,exp:77,items:[{id:"bad"}],rareDrops:[{id:"bad_rare"}]}),
  claimCurrentBattleRewards:()=>false,
  recordBattleChronicle:()=>true,
  getCurrentChronicleOccurrenceHistoryScope:()=>null,
  renderBattleActionFamilyRow:()=>'<nav class="battle-live-action-family-row"><button class="battle-live-action-family">SKILLS</button><button class="battle-live-action-family battle-live-withdraw-action" disabled>WITHDRAW</button></nav>',
  evaluateEnemyActionScheduler:()=>({ready:true,enemyId:"wasabi_origin_rogue_genin_01",eligibleActions:[]}),
  findBattleTransientState:()=>null,removeBattleTransientState:()=>true,
  getBattleActionOpportunityIndex:()=>0,
  getPlayerCharacter:id=>id==="academy_izuno"?{id}:null,
  createBattleDeploymentSlots:ids=>ids.map((participantId,index)=>({slot:index+1,participantId})),
  syncBattleActivePlayerFromDeployment:()=>{battleCtx.currentBattle.activePlayer={id:battleCtx.currentBattle.deployment.player.slots[0].participantId};},
  configureBattleEnemyParticipants:ids=>ids.map(id=>battleCtx.enemyDatabase[id]),
  syncBattleActiveEnemyFromDeployment:()=>{battleCtx.currentBattle.activeEnemy={id:battleCtx.currentBattle.deployment.enemy.slots[0].participantId};},
  initializeBattleContributionRecordsFromDeployment:()=>true,
  initializeBattleRemainingPLFromDeployment:()=>true,
  initializeBattlePouchFromPreparedSelection:()=>true,
  initializeBattleAttachedSummonRuntimeFromDeployment:()=>true,
  initializeBattleDedicatedVariantRuntimePackages:()=>true,
  initializeBattleKisoganStartsActiveFromDeployment:()=>true,
  launchBattleWithReturnContext:(enemyId,encounterId,returnContext)=>{
    battleCtx.currentBattle={active:true,battleOver:false,battleId:"generic-"+Date.now(),encounterId,returnContext,rewards:{ryo:99,exp:99,items:[1],rareDrops:[1]},deployment:{}};
    return{success:true,battleId:battleCtx.currentBattle.battleId,enemyId};
  },
  recordBattleEvidence:row=>{evidenceRows.push(JSON.parse(JSON.stringify(row)));return{evidenceId:"wasabi-evidence-"+evidenceRows.length};},
  createBattleParticipantRef:(side,participantId)=>({side,participantId}),
  getBattleRemainingPL:(side,id)=>side==="enemy"?23:15,
  savePlayerData:()=>true,
  saveTestState:()=>{
    const b=battleCtx.currentBattle||{};
    const state={
      battleId:b.battleId||null,
      encounterId:b.encounterId||null,
      deployment:JSON.parse(JSON.stringify(b.deployment||{}))
    };
    sessionStorage.setItem("shinobiTestState",JSON.stringify(state));
    return true;
  },
  restoreTestState:()=>{
    const raw=sessionStorage.getItem("shinobiTestState"),parsed=raw?JSON.parse(raw):null;
    if(!parsed)return false;
    battleCtx.currentBattle={
      active:true,battleOver:false,battleId:parsed.battleId||null,encounterId:parsed.encounterId||null,
      deployment:JSON.parse(JSON.stringify(parsed.deployment||{})),
      rewards:{ryo:0,exp:0,items:[],rareDrops:[]}
    };
    return true;
  },
  openOverlay:()=>true
};
battleCtx.globalThis=battleCtx;
vm.createContext(battleCtx);
vm.runInContext(battleSource,battleCtx,{filename:BATTLE});
const battleDiag=battleCtx.runAcademyWasabiRogueGeninBattle343Diagnostics();
assert.strictEqual(battleDiag.pass,true,JSON.stringify(battleDiag,null,2));
assert.deepStrictEqual(JSON.parse(JSON.stringify(ratioCalls[0])),{
  id:"enemy_rogue_genin_substitution_feint",ratio:0.4,
  opts:{stateKey:"rogue_genin_substitution_feint_ready",traits:["once_per_battle","single_target_direct_mitigable_attack_pl_packet_only","expires_before_rogue_next_action"]}
});

const enemy=battleCtx.enemyDatabase.wasabi_origin_rogue_genin_01;
assert(enemy&&enemy.calibratedBasePL===23);
assert.deepStrictEqual(JSON.parse(JSON.stringify(enemy.baseStats)),{nin:23,tai:22,buki:21,fuin:10,kin:14,gen:15,stamina:24});
assert.strictEqual(enemy.oppositionTemplateId,"rogue_genin");
assert.deepStrictEqual(JSON.parse(JSON.stringify(enemy.authoredBattleActions.map(a=>[a.id,a.authoredAttackPL??null]))),[
  ["enemy_rogue_genin_kunai_rush",9],
  ["enemy_rogue_genin_shuriken_spread",7],
  ["enemy_rogue_genin_substitution_feint",null]
]);

const launchSpec={returnContext:{type:"story_scene",sceneId:"origin_academy_izuno_prologue",sceneInstanceId:"qa-wasabi-scene"},storyOccurrenceId:"qa-wasabi-scene"};
const launched=battleCtx.launchAcademyWasabiRogueGeninBattle343(launchSpec);
assert.strictEqual(launched.success,true,JSON.stringify(launched));
assert.strictEqual(launched.battleId,"battle_occ_origin_izuno_rogue_genin_step_in:qa-wasabi-scene");
assert.deepStrictEqual(Array.from(battleCtx.currentBattle.deployment.player.slots||[],x=>x.participantId),["academy_izuno"]);
assert.deepStrictEqual(Array.from(battleCtx.currentBattle.deployment.enemy.slots||[],x=>x.participantId),["wasabi_origin_rogue_genin_01"]);
assert.strictEqual(battleCtx.currentBattle.rewards.ryo,0);assert.strictEqual(battleCtx.currentBattle.rewards.exp,0);
assert.strictEqual(Array.from(battleCtx.currentBattle.rewards.items||[]).length,0);assert.strictEqual(Array.from(battleCtx.currentBattle.rewards.rareDrops||[]).length,0);
assert.strictEqual(battleCtx.currentBattle.rewards.requiresExplicitPostClaimContinue,true);
assert.strictEqual(battleCtx.currentBattle.wasabi343.strictOneVsOne,true);
assert.strictEqual(battleCtx.currentBattle.environmentPath,"Izuno Origin Backdrop/konoha_alleyway_day.png");
assert.strictEqual(battleCtx.currentBattle.presentationEnvironmentPath,"Izuno Origin Backdrop/konoha_alleyway_day.png");
assert.strictEqual(battleCtx.currentBattle.wasabi343.environmentPath,"Izuno Origin Backdrop/konoha_alleyway_day.png");
assert(!battleCtx.renderBattleActionFamilyRow({id:"academy_izuno"}).includes("WITHDRAW"),"strict 1v1 renderer leaked WITHDRAW");
const savedWasabi343=battleCtx.currentBattle.wasabi343;delete battleCtx.currentBattle.wasabi343;
assert(battleCtx.renderBattleActionFamilyRow({id:"academy_izuno"}).includes("WITHDRAW"),"non-Wasabi Battle renderer was altered");
battleCtx.currentBattle.wasabi343=savedWasabi343;
const persistedSession=JSON.parse(sessionStorage.getItem("shinobiTestState"));
assert.strictEqual(persistedSession.wasabi343.battleOccurrenceId,launched.battleId,"session save lost Wasabi adapter metadata");
assert.strictEqual(persistedSession.wasabi343BattleId,launched.battleId,"session save lost exact Wasabi Battle occurrence");
assert.strictEqual(persistedSession.wasabi343BattleActive,true,"session save lost active Wasabi Battle state");
assert.strictEqual(persistedSession.battleConfigId,"academy_izuno_origin_rogue_genin_step_in_battle","session save lost scoped Battle config");
assert(persistedSession.wasabi343BattleLaunches[launched.battleId],"session save lost Wasabi launch idempotence receipt");
delete battleCtx.playerData.wasabi343BattleLaunches;
battleCtx.currentBattle={active:false,battleOver:false,battleId:null,encounterId:null,deployment:{}};
const restoredSession=battleCtx.restoreTestState();
assert.strictEqual(restoredSession,true,"base Battle session restore did not run");
assert.strictEqual(battleCtx.currentBattle.wasabi343.battleOccurrenceId,launched.battleId,"session restore did not reconstruct Wasabi metadata");
assert.strictEqual(battleCtx.currentBattle.battleConfigId,"academy_izuno_origin_rogue_genin_step_in_battle","session restore did not reconstruct Wasabi Battle config");
assert.strictEqual(battleCtx.currentBattle.battleId,launched.battleId,"session restore did not reconstruct exact Wasabi Battle occurrence");
assert.strictEqual(battleCtx.currentBattle.active,true,"session restore did not reactivate the saved Wasabi Battle");
assert.strictEqual(battleCtx.currentBattle.environmentPath,"Izuno Origin Backdrop/konoha_alleyway_day.png","session restore lost exact Wasabi Battle environment");
assert.strictEqual(battleCtx.currentBattle.presentationEnvironmentPath,"Izuno Origin Backdrop/konoha_alleyway_day.png","session restore lost exact Wasabi presentation environment");
assert(battleCtx.playerData.wasabi343BattleLaunches[launched.battleId],"session restore did not reconstruct Wasabi launch idempotence receipt");
assert.deepStrictEqual(Array.from(battleCtx.currentBattle.deployment.player.slots||[],x=>x.participantId),["academy_izuno"],"session restore drifted Wasabi deployment");
assert.deepStrictEqual(Array.from(battleCtx.currentBattle.deployment.enemy.slots||[],x=>x.participantId),["wasabi_origin_rogue_genin_01"],"session restore drifted Rogue deployment");
battleCtx.currentBattle.outcome={type:"victory",finishingShinobiId:"academy_izuno"};
const generatedFixed=battleCtx.generateBattleRewards({rewards:{ryo:{min:99,max:99}}},{id:"academy_izuno",name:"Wasabi"});
assert.strictEqual(generatedFixed.ryo,50);assert.strictEqual(generatedFixed.exp,0);
assert.strictEqual(Array.from(generatedFixed.items||[]).length,0);assert.strictEqual(Array.from(generatedFixed.rareDrops||[]).length,0);
assert.strictEqual(generatedFixed.requiresExplicitPostClaimContinue,true);
assert.strictEqual(generatedFixed.wasabi343FixedReward,true);
assert.strictEqual(generatedFixed.wasabi343RewardSourceId,"wasabi_origin_rogue_genin_battle_victory_ryo_01");
const beforeClaimRyo=battleCtx.playerData.ryo;
assert.strictEqual(battleCtx.claimCurrentBattleRewards(),true);
assert.strictEqual(battleCtx.playerData.ryo-beforeClaimRyo,50);
assert.strictEqual(battleCtx.claimCurrentBattleRewards(),false);
assert.strictEqual(battleCtx.playerData.ryo-beforeClaimRyo,50,"duplicate claim duplicated Wasabi victory cash");
const rewardReceipts=battleCtx.playerData.activityHistory.filter(row=>row&&row.rewardSourceId==="wasabi_origin_rogue_genin_battle_victory_ryo_01");
assert.strictEqual(rewardReceipts.length,1);
assert.strictEqual(rewardReceipts[0].battleOccurrenceId,launched.battleId);
assert.strictEqual(evidenceRows.length,1);
const replay=battleCtx.launchAcademyWasabiRogueGeninBattle343(launchSpec);
assert.strictEqual(replay.success,true);assert.strictEqual(replay.idempotent,true);assert.strictEqual(evidenceRows.length,1,"Battle launch replay duplicated evidence");
battleCtx.currentBattle=null;
const lostRuntime=battleCtx.launchAcademyWasabiRogueGeninBattle343(launchSpec);
assert.strictEqual(lostRuntime.success,false);assert.strictEqual(lostRuntime.reason,"wasabi_battle_occurrence_already_committed_without_runtime");
assert.strictEqual(evidenceRows.length,1);

// Equal-weight selection happens only after shared semantic eligibility.
battleCtx.currentBattle={active:true,wasabi343:{feintUsed:false,feintCreatedEnemyOpportunityIndex:null},runtime:{evidence:[]}};
const a1={id:"a1"},a2={id:"a2"};
battleCtx.Math.random=()=>0.75;
const selected=battleCtx.chooseEnemyAuthoredBattleAction({ready:true,enemyId:"wasabi_origin_rogue_genin_01",eligibleActions:[a1,a2]});
assert.strictEqual(selected.success,true);assert.strictEqual(selected.action.id,"a2");
assert.strictEqual(selected.equalSelectionWeight,true);assert.strictEqual(selected.randomnessAppliedAfterEligibility,true);
const none=battleCtx.chooseEnemyAuthoredBattleAction({ready:true,enemyId:"wasabi_origin_rogue_genin_01",eligibleActions:[]});
assert.strictEqual(none.success,false);assert.strictEqual(none.reason,"no_semantically_eligible_enemy_action");

// Result projection is observer-safe and does not invent death/custody/reward.
battleCtx.currentBattle={
  active:false,outcome:{type:"victory"},
  wasabi343:{battleOccurrenceId:"battle_occ_origin_izuno_rogue_genin_step_in:qa-wasabi-scene",sourceOccurrenceId:"occ_origin_izuno_rogue_genin_interruption_resolution",historicalParticipantRef:"wasabi_origin_rogue_genin_01",oppositionTemplateId:"rogue_genin"}
};
battleCtx.getBattleRemainingPL=(side)=>side==="enemy"?0:8;
const projected=battleCtx.projectAcademyWasabiRogueGeninBattle343();
assert.deepStrictEqual(Object.keys(projected).sort(),[
  "battleOccurrenceId","battleResult","historicalParticipantRef","oppositionTemplateId","rogueGeninBattlePLDepleted","sourceOccurrenceId","wasabiBattlePLDepleted"
].sort());
assert.strictEqual(projected.battleResult,"victory");assert.strictEqual(projected.rogueGeninBattlePLDepleted,true);assert.strictEqual(projected.wasabiBattlePLDepleted,false);

// Production loader order: catalogue before 32900-a, adapter after shared Battle.
const index=fs.readFileSync("index.html","utf8");
assert(index.indexOf("alpha-special-jonin-evidence-producer-34700.js")<index.indexOf("alpha-origin-scenes-32900-a.js"));
assert(index.indexOf("academy-wasabi-writing-golden-343.js")<index.indexOf("alpha-origin-scenes-32900-a.js"));
assert(index.indexOf("alpha-battle-modern-33000.js")<index.indexOf("alpha-wasabi-rogue-battle-343.js"));
assert(index.indexOf("alpha-wasabi-rogue-battle-343.js")<index.indexOf("alpha-alpha-sprint-33100.js"));

// Current Writing authority contains all implemented player choices.
for(const label of [
  "TAKE THE OBVIOUS TRAIL","LOOK FOR SOMETHING BETTER","WORK WITH THE OTHERS","FORGET THE TRAIL — WHERE ARE THEY GOING?",
  "TAKE THE RIVER","FOLLOW THE STRONGER TRAIL","CHECK THE SHOUTING","CUT FOR THE INTERCEPT",
  "STEP IN","CALL FOR HELP","KEEP PURSUING",
  ...["I caught them the hard way.","Next time I beat that time.","Give them a bigger head start.","I want the rematch.","Why chase from behind if I can get there first?","The route mattered more than the trail.","I trusted my read. It worked.","Next time I cut them off sooner.","They got me with that one.","I saw the trick. Just too late.","Next time I check what doesn't fit.","They'll need a better trick next time.","I'd step in again.","Next time I end the fight faster.","The target got away. I still finished what I started.","I need to know how much time a fight really costs.","Calling the instructor was faster.","I got the student moving.","Next time I hand it off sooner.","I can watch the chase and the people in it.","I chose the target.","I waited too long before I moved.","Next time I decide immediately.","Give me another shot at the chase."]
])assert(doc.includes("**"+label+"**")||doc.includes("**“"+label+"”**"),"runtime choice absent from approved Wasabi v2 Story: "+label);

console.log(JSON.stringify({
  pass:true,issue:343,sceneId:def.sceneId,beatCount:beats.length,
  exactOwnerApprovedRewriteV2Catalogue:true,routeGraphClosed:true,
  sourceOccurrences:["IZU-01","IZU-02","IZU-03","IZU-04","RIVER-ENDURANCE"],
  rogueBattle:{strictOneVsOne:true,basePL:23,actions:["9","7","40% guard"],fixedVictoryRyo:50,idempotentOccurrence:true},
  moralityInference:false,browserGoldenClaimed:false
},null,2));
