#!/usr/bin/env node
"use strict";

const fs=require("fs"),vm=require("vm"),assert=require("assert");
const CORE_PATH="runtime/alpha-kakashi-v2-core-36020.js";
const BATTLE_PATH="runtime/alpha-kakashi-v2-battle-36010.js";
const RENDER_PATH="runtime/alpha-kakashi-v2-renderer-36030.js";
const TRANSITION_PATH="runtime/alpha-kakashi-v2-transition-36040.js";
const TRAVERSAL_PATH="runtime/alpha-traversal-bridge-33200.js";

for(const p of [CORE_PATH,BATTLE_PATH,RENDER_PATH,TRANSITION_PATH])assert(fs.existsSync(p),`missing V2 file: ${p}`);

const battleSource=fs.readFileSync(BATTLE_PATH,"utf8");
const coreSource=fs.readFileSync(CORE_PATH,"utf8");
const rendererSource=fs.readFileSync(RENDER_PATH,"utf8");
const transitionSource=fs.readFileSync(TRANSITION_PATH,"utf8");
const traversalSource=fs.readFileSync(TRAVERSAL_PATH,"utf8");

// Architecture gates.
assert(!/runtime\/alpha-kakashi-(?!v2-)/.test(traversalSource),"legacy Kakashi loader leaked back into traversal");
for(const p of [BATTLE_PATH,CORE_PATH,RENDER_PATH,TRANSITION_PATH])assert(traversalSource.includes(p),`V2 loader missing ${p}`);
const coreOperationalSource=coreSource.split("function diagnostics()")[0];
assert(!/querySelector|document\.|createElement/.test(coreOperationalSource),"Story/state core owns DOM");
assert(!/querySelector|document\.|createElement/.test(battleSource.split("function installPakkunBattleButtons")[0]),"Battle semantic adapter touches Story/presentation DOM");
assert(rendererSource.includes('>*:not(#${ROOT_ID}){display:none!important}'),"renderer does not suppress native Story layer");
assert(rendererSource.includes("kv2-dialogue")&&rendererSource.includes("chronicle_receipt"),"renderer missing singular dialogue/Receipt modes");
assert(transitionSource.includes("kakashi_v2_transition_locked"),"transition lock missing");
assert(transitionSource.includes("kv2-actor-ghost"),"one-shot actor exit animation missing");

// Battle authority executes in a bounded mock to prove exact configuration data.
{
  const context={
    console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
    enemyDatabase:{},
    makeEnemyRatioGuardAction:(id)=>({id,skillId:id,actionClass:"guard",traits:[],resolve:()=>({resolved:true})}),
    makeEnemyFixedDamageAction:(id,pl)=>({id,skillId:id,actionClass:"damage",traits:[],resolve:()=>({resolved:true,attackPL:pl})}),
    renderCombatOverlay:undefined,
    playerData:{},
    savePlayerData:()=>true,saveTestState:()=>true
  };
  context.globalThis=context;vm.createContext(context);
  vm.runInContext(battleSource,context,{filename:BATTLE_PATH});
  const diag=context.runAcademyKakashiV2Battle36010Diagnostics();
  assert.strictEqual(diag.pass,true,JSON.stringify(diag,null,2));
  const api=context.SC_ACADEMY_KAKASHI_V2_BATTLE_36010;
  assert.strictEqual(Object.keys(api.configs).length,10);
  assert.strictEqual(api.configs.academy_kakashi_origin_battle_seq_mi.timingGate.maximumControllerActions,4);
  assert.strictEqual(api.configs.academy_kakashi_origin_battle_seq_ps.timingGate.maximumControllerActions,3);
  assert.strictEqual(context.enemyDatabase.academy_kakashi_origin_amt.calibratedBasePL,18);
  assert.strictEqual(context.enemyDatabase.academy_kakashi_origin_package_smuggler.calibratedBasePL,10);
  assert.strictEqual(context.enemyDatabase.academy_kakashi_origin_masked_interceptor.calibratedBasePL,14);
}

// Core scene graph executes against neutral Story/Factual mocks.
{
  const scenes=new Map();
  const D={
    openSemanticChoiceSet:()=>({success:true,choiceSet:{choiceSetId:"qa"}}),
    commitStoryIntent:()=>({success:true,receipt:{storyDecisionReceiptId:"qa_receipt",intentCommitRef:"qa_intent"}})
  };
  const F={
    stableRef:(prefix,payload)=>prefix+":"+JSON.stringify(payload),
    registerStoryFactualResolverBinding:()=>({success:true}),
    resolveStoryFactualAction:()=>({success:true,receipt:{selectedOutcomeRef:"QA",storyFactualResolverReceiptId:"qa_fact",resolutionMode:"qa"}})
  };
  const tenConfigs={
    academy_kakashi_origin_battle_amt_1v1:{},academy_kakashi_origin_battle_amt_ps_2v1:{},
    academy_kakashi_origin_battle_amt_ps_mi_3v1:{},academy_kakashi_origin_battle_kakashi_pakkun_vs_amt:{},
    academy_kakashi_origin_battle_ps_mi_2v1:{},academy_kakashi_origin_battle_mi_1v1:{},
    academy_kakashi_origin_battle_ps_1v1:{},academy_kakashi_origin_battle_seq_mi:{},
    academy_kakashi_origin_battle_seq_ps:{},academy_kakashi_origin_battle_seq_amt_pakkun:{}
  };
  const context={
    console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
    playerData:{},savePlayerData:()=>true,
    SC_STORY_DECISION_REALISATION_34000:D,SC_STORY_FACTUAL_RESOLVER_34600:F,
    SC_ACADEMY_KAKASHI_V2_BATTLE_36010:{configs:tenConfigs},
    unregisterStoryScene:id=>scenes.delete(id),
    registerStoryScene:def=>{const copy={...def,beatMap:new Map((def.beats||[]).map(b=>[b.beatId,b]))};scenes.set(def.sceneId,copy);return{success:true,sceneId:def.sceneId};},
    getStorySceneDefinition:id=>scenes.get(id)||null,
    getActiveStorySceneRuntime:()=>null,
    completeChronicleOriginPrologue:()=>({success:true})
  };
  context.globalThis=context;vm.createContext(context);
  vm.runInContext(coreSource,context,{filename:CORE_PATH});
  const diag=context.runAcademyKakashiV2Core36020Diagnostics();
  assert.strictEqual(diag.pass,true,JSON.stringify(diag,null,2));
  const def=scenes.get("origin_academy_kakashi_anbu_retrieval");
  assert(def,"stable 32900 Kakashi scene id not registered");
  const ids=new Set(def.beats.map(b=>b.beatId));
  for(const beat of def.beats){
    if(beat.nextBeatId)assert(ids.has(beat.nextBeatId),`missing next beat ${beat.nextBeatId} from ${beat.beatId}`);
    for(const choice of beat.choices||[])if(choice.nextBeatId)assert(ids.has(choice.nextBeatId),`missing choice target ${choice.nextBeatId} from ${beat.beatId}/${choice.choiceId}`);
    if(beat.battle){
      if(beat.battle.victoryBeatId)assert(ids.has(beat.battle.victoryBeatId),`missing victory beat from ${beat.beatId}`);
      if(beat.battle.defeatBeatId)assert(ids.has(beat.battle.defeatBeatId),`missing defeat beat from ${beat.beatId}`);
    }
  }
  const root=def.beatMap.get("v2_scene02_tail");
  assert.deepStrictEqual(root.choices.map(c=>c.label),["WATCH THE EXCHANGE","MOVE IN CLOSER","STRIKE BEFORE THE HANDOFF","SLIP IN FOR THE PACKAGE"]);
  const watch=def.beatMap.get("v2_watch_exchange");
  assert.deepStrictEqual(watch.choices.map(c=>c.label),["STOP THE ASSASSIN","SECURE THE PACKAGE","SECURE THE PACKAGE BEFORE THE ASSASSIN","DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","GO AFTER THE ORIGINAL TARGET"]);
  const packageSecond=def.beatMap.get("v2_mi_package_second_win");
  assert(packageSecond.choices.some(c=>c.label==="CHASE THE PACKAGE SMUGGLER"));
  assert(!packageSecond.choices.some(c=>c.label==="GO AFTER ANBU MARKED TARGET"),"package-second branch collapsed into STOP THE ASSASSIN");
  const closer=def.beatMap.get("v2_closer_handoff");
  assert.strictEqual(closer.mode,"choice");
  assert.strictEqual(closer.choices.length,5);
  assert(!closer.nextBeatId,"Get Closer handoff replays far-distance WATCH opening");
}

console.log(JSON.stringify({
  pass:true,
  architectureBoundary:true,
  exactBattleConfigCount:10,
  routeGraphClosed:true,
  stableSceneId:"origin_academy_kakashi_anbu_retrieval",
  browserGoldenClaimed:false
},null,2));
