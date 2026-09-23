#!/usr/bin/env node
"use strict";

const fs=require("fs"),vm=require("vm"),assert=require("assert");
const CONTENT_PATH="runtime/academy-kakashi-v2-content-36000.js";
const CORE_PATH="runtime/alpha-kakashi-v2-core-36020.js";
const BATTLE_PATH="runtime/alpha-kakashi-v2-battle-36010.js";
const REWARD_PATH="runtime/alpha-kakashi-v2-rewards-36015.js";
const RENDER_PATH="runtime/alpha-kakashi-v2-renderer-36030.js";
const TRANSITION_PATH="runtime/alpha-kakashi-v2-transition-36040.js";
const TRAVERSAL_PATH="runtime/alpha-traversal-bridge-33200.js";

for(const p of [CONTENT_PATH,CORE_PATH,BATTLE_PATH,REWARD_PATH,RENDER_PATH,TRANSITION_PATH])assert(fs.existsSync(p),`missing V2 file: ${p}`);

const contentSource=fs.readFileSync(CONTENT_PATH,"utf8");
const battleSource=fs.readFileSync(BATTLE_PATH,"utf8");
const rewardSource=fs.readFileSync(REWARD_PATH,"utf8");
const coreSource=fs.readFileSync(CORE_PATH,"utf8");
const rendererSource=fs.readFileSync(RENDER_PATH,"utf8");
const transitionSource=fs.readFileSync(TRANSITION_PATH,"utf8");
const traversalSource=fs.readFileSync(TRAVERSAL_PATH,"utf8");

// Architecture gates.
assert(!/runtime\/alpha-kakashi-(?!v2-)/.test(traversalSource),"legacy Kakashi loader leaked back into traversal");
for(const p of [CONTENT_PATH,BATTLE_PATH,REWARD_PATH,CORE_PATH,RENDER_PATH,TRANSITION_PATH])assert(traversalSource.includes(p),`V2 loader missing ${p}`);
assert(traversalSource.includes("function after33600()")&&traversalSource.includes("sc-alpha-origin-choice-reaction-33510-script")&&traversalSource.includes("function load33700()"),"V2 terminal loader can drop activation before future 33600/33700 scripts exist");
const coreOperationalSource=coreSource.split("function diagnostics()")[0];
assert(!/querySelector|document\.|createElement/.test(coreOperationalSource),"Story/state core owns DOM");
assert(!/querySelector|document\.|createElement/.test(battleSource.split("function installPakkunBattleButtons")[0]),"Battle semantic adapter touches Story/presentation DOM");
assert(rendererSource.includes('>*:not(#${ROOT_ID}){display:none!important}'),"renderer does not suppress native Story layer");
assert(rendererSource.includes("kv2-dialogue")&&rendererSource.includes("chronicle_receipt"),"renderer missing singular dialogue/Receipt modes");
assert(!transitionSource.includes("kakashi_v2_transition_locked")&&transitionSource.includes("semanticAlreadyCommitted:true"),"#312 transition must not gate Story truth behind animation");
assert(rendererSource.includes("kv2-actor-ghost")&&rendererSource.includes("playStoryChoreography33900"),"#312 actor exits must use renderer + shared choreography");
assert(!rendererSource.split("function ensureRoot")[0].includes("root.innerHTML"),"renderer source unexpectedly rebuilds root before mount");
assert(!rendererSource.slice(rendererSource.indexOf("function syncActors"),rendererSource.indexOf("function bind")).includes("root.innerHTML"),"cue render remounts Scene Board root");
assert(rendererSource.includes("kv2-ghost-layer"),"persistent actor ghost layer missing");
assert(rendererSource.includes("is-falling")&&rendererSource.includes("is-fleeing")&&rendererSource.includes("is-fading"),"distinct actor exit regression markers missing");
assert(coreSource.includes('addBeat("v2_battle_ps_seq",{mode:"battle_transition",backdrop:B.alleyAlt')&&coreSource.includes('addBeat("v2_ps_seq_win",{mode:"choice",backdrop:B.alleyAlt')&&coreSource.includes('addBeat("v2_ps_seq_loss",{backdrop:B.alleyAlt'),"PS pursuit Battle/post-Battle must remain in the authorised side-street backdrop");

// Reward authority uses the existing Currency / Inventory / Battle claim surfaces
// while proving exact source values and idempotence.
{
  const itemDatabase={
    field_recovery_pill:{id:"field_recovery_pill",name:"Field Recovery Pill",type:"consumable",rarity:"Common",stackable:true}
  };
  const context={
    console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
    itemDatabase,
    playerData:{ryo:0,inventory:[]},
    currentBattle:null,
    cloneProgressionData:v=>v===undefined?undefined:JSON.parse(JSON.stringify(v)),
    getItemDefinition:id=>itemDatabase[id]||null,
    addItemToInventory:item=>{
      const d=itemDatabase[item.id]||item;
      if(d.stackable===true){
        const found=context.playerData.inventory.find(x=>x.id===d.id&&!x.instanceId);
        if(found){found.quantity=(found.quantity||0)+1;return;}
        context.playerData.inventory.push({id:d.id,name:d.name,type:d.type,rarity:d.rarity,quantity:1});return;
      }
      context.playerData.inventory.push({id:d.id,name:d.name,type:d.type,rarity:d.rarity,quantity:1,instanceId:`${d.id}_qa_${context.playerData.inventory.length+1}`});
    },
    generateBattleRewards:()=>({generated:true,claimed:false,ryo:0,exp:0,items:[],rareDrops:[]}),
    claimCurrentBattleRewards:()=>false,
    recordBattleChronicle:()=>true,
    savePlayerData:()=>true,saveTestState:()=>true
  };
  context.globalThis=context;vm.createContext(context);
  vm.runInContext(rewardSource,context,{filename:REWARD_PATH});
  const diag=context.runAcademyKakashiV2Rewards36015Diagnostics();
  assert.strictEqual(diag.pass,true,JSON.stringify(diag,null,2));
  assert(context.itemDatabase.academy_training_tanto,"Academy Training Tantō not registered");
  assert.strictEqual(context.itemDatabase.academy_training_tanto.statModifiers.buki,1);
  assert.strictEqual(context.itemDatabase.academy_training_tanto.sourceActivation,"kakashi_origin_exceptional_reward_only");

  const AMT="academy_kakashi_origin_amt",PS="academy_kakashi_origin_package_smuggler",MI="academy_kakashi_origin_masked_interceptor";
  const battleRewardMatrix=[
    ["academy_kakashi_origin_battle_seq_mi",[MI],50,true],
    ["academy_kakashi_origin_battle_amt_1v1",[AMT],50,false],
    ["academy_kakashi_origin_battle_amt_ps_2v1",[AMT,PS],100,false],
    ["academy_kakashi_origin_battle_amt_ps_mi_3v1",[AMT,PS,MI],200,false],
    ["academy_kakashi_origin_battle_kakashi_pakkun_vs_amt",[AMT],50,false],
    ["academy_kakashi_origin_battle_ps_mi_2v1",[PS,MI],100,false],
    ["academy_kakashi_origin_battle_mi_1v1",[MI],50,false],
    ["academy_kakashi_origin_battle_ps_1v1",[PS],50,false],
    ["academy_kakashi_origin_battle_seq_ps",[PS],50,false],
    ["academy_kakashi_origin_battle_seq_amt_pakkun",[AMT],50,false]
  ];
  let expectedBattleRyo=0;
  for(const [configId,oppositionParticipantIds,expectedRyo,expectedPill] of battleRewardMatrix){
    const battleId="qa_"+configId;
    context.currentBattle={
      battleId,encounterId:configId,outcome:{type:"victory"},rewards:{generated:false,claimed:false},
      kakashiV2:{battleConfigId:configId,battleOccurrenceId:battleId,storyOccurrenceId:"qa_origin",oppositionParticipantIds:[...oppositionParticipantIds]}
    };
    const immediate=context.generateBattleRewards({rewards:{ryo:{min:0,max:0},exp:{min:0,max:0},commonDrops:[],rareDrops:[]}},{name:"Kakashi"});
    assert.strictEqual(immediate.ryo,expectedRyo,configId+" immediate Battle Ryō mismatch");
    assert.strictEqual(immediate.exp,0,configId+" must not fabricate generic Character EXP");
    const itemIds=Array.from(immediate.items||[]).map(x=>x.id);
    assert.deepStrictEqual(itemIds,expectedPill?["field_recovery_pill"]:[],configId+" Item projection mismatch");
    assert.strictEqual(context.claimCurrentBattleRewards(),true,configId+" claim failed");
    expectedBattleRyo+=expectedRyo;
    assert.strictEqual(context.playerData.ryo,expectedBattleRyo,configId+" cash claim did not commit exactly once");
  }
  assert.strictEqual(expectedBattleRyo,750,"all ten Kakashi Battle configs must total their independently authorised immediate cash");
  assert.strictEqual(context.playerData.inventory.filter(x=>x.id==="field_recovery_pill").reduce((n,x)=>n+(x.quantity||1),0),1,"MI Field Recovery Pill must remain once-per-Origin across repeated qualifying MI Battles");

  const state={
    package:{holder:"ANBU",returned:true,recovered:true},
    knowledge:{askWhere:true},
    participants:{MI:{state:"ANBU_CUSTODY"},PS:{state:"RELEASED"},AMT:{state:"ESCAPED"}},
    resolvers:{},routeHistory:[],
    battles:{pickpocket_3v1:{outcome:"victory",playerActionOpportunityCount:3}},
    terminal:{reportReached:true,minatoReached:true,receiptReached:true}
  };
  const terminal=context.commitAcademyKakashiV2TerminalRewards36015(state,"qa_origin");
  assert.strictEqual(terminal.success,true,JSON.stringify(terminal,null,2));
  assert.strictEqual(terminal.plan.totalRyo,250);
  assert.strictEqual(terminal.grantedRyo,250);
  assert.strictEqual(terminal.pillGranted,0,"immediate MI pill must suppress terminal fallback");
  assert.strictEqual(terminal.trainingTantoGranted,1);
  assert.strictEqual(context.playerData.ryo,1000);
  assert.strictEqual(context.playerData.inventory.filter(x=>x.id==="field_recovery_pill").reduce((n,x)=>n+(x.quantity||1),0),1);
  assert.strictEqual(context.playerData.inventory.filter(x=>x.id==="academy_training_tanto").length,1);
  const before=JSON.stringify({ryo:context.playerData.ryo,inventory:context.playerData.inventory});
  const replay=context.commitAcademyKakashiV2TerminalRewards36015(state,"qa_origin");
  assert.strictEqual(replay.success,true);
  assert.strictEqual(replay.grantedRyo,0);
  assert.strictEqual(replay.pillGranted,0);
  assert.strictEqual(replay.trainingTantoGranted,0);
  assert.strictEqual(JSON.stringify({ryo:context.playerData.ryo,inventory:context.playerData.inventory}),before,"terminal reward replay duplicated material rewards");
}

// Battle authority executes in a bounded mock to prove exact configuration data.
{
  const context={
    console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
    enemyDatabase:{},
    makeEnemyRatioGuardAction:(id)=>({id,skillId:id,actionClass:"guard",traits:[],resolve:()=>({resolved:true})}),
    makeEnemyFixedDamageAction:(id,pl)=>({id,skillId:id,actionClass:"damage",traits:[],resolve:()=>({resolved:true,attackPL:pl})}),
    renderCombatOverlay:undefined,
    chooseEnemyAuthoredBattleAction:()=>({success:false,reason:"qa_generic_scheduler"}),
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
  const amtActions=context.enemyDatabase.academy_kakashi_origin_amt.authoredBattleActions;
  const psActions=context.enemyDatabase.academy_kakashi_origin_package_smuggler.authoredBattleActions;
  const miActions=context.enemyDatabase.academy_kakashi_origin_masked_interceptor.authoredBattleActions;
  const tanto=amtActions.find(a=>a.id==="enemy_anbu_style_operative_tanto_flash");
  const wire=amtActions.find(a=>a.id==="enemy_anbu_style_operative_wire_capture");
  const burst=psActions.find(a=>a.id==="enemy_fuinjutsu_smuggler_contraband_seal_burst");
  const blade=miActions.find(a=>a.id==="enemy_decoy_assassin_concealed_blade");
  assert.strictEqual(tanto.authoredAttackPL,6,"AMT Tantō Flash regressed to superseded PL26");
  assert.strictEqual(tanto.conditionalBoostAttackPL,2,"AMT Body Flicker boost must be +2");
  assert(wire.traits.includes("once_per_battle"),"AMT Wire Capture must be once per Battle");
  assert.strictEqual(burst.authoredAttackPL,5,"Package Smuggler Seal Burst must be PL5");
  assert.strictEqual(blade.authoredAttackPL,5,"Masked Interceptor Concealed Blade must be PL5");
  assert.strictEqual(blade.conditionalBoostAttackPL,2,"Masked Interceptor False Retreat boost must be +2");
  assert(String(context.chooseEnemyAuthoredBattleAction).includes("deterministicKakashiOriginAI"),"Kakashi V2 opponent AI must consume semantic priority before randomness");
  const battleOperationalSource=battleSource.split("function diagnostics()")[0];
  assert(!battleOperationalSource.includes("basePLAtEntry:15"),"Kakashi Battle-entry PL is hard-coded instead of read from live authority");
  assert(battleOperationalSource.includes("authoritativePlayerBasePLAtEntry"),"live Kakashi Battle-entry PL resolver missing");
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
    commitAcademyKakashiV2TerminalRewards36015:()=>({success:true,sourceReceipts:[],plan:{totalRyo:100}}),
    unregisterStoryScene:id=>scenes.delete(id),
    registerStoryScene:def=>{const copy={...def,beatMap:new Map((def.beats||[]).map(b=>[b.beatId,b]))};scenes.set(def.sceneId,copy);return{success:true,sceneId:def.sceneId};},
    getStorySceneDefinition:id=>scenes.get(id)||null,
    getActiveStorySceneRuntime:()=>null,
    completeChronicleOriginPrologue:()=>({success:true})
  };
  context.globalThis=context;vm.createContext(context);
  vm.runInContext(contentSource,context,{filename:CONTENT_PATH});
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
  const incoming=new Map(def.beats.map(b=>[b.beatId,[]]));
  for(const beat of def.beats){
    const targets=[];
    if(beat.nextBeatId)targets.push(beat.nextBeatId);
    for(const choice of beat.choices||[])if(choice.nextBeatId)targets.push(choice.nextBeatId);
    if(beat.battle){if(beat.battle.victoryBeatId)targets.push(beat.battle.victoryBeatId);if(beat.battle.defeatBeatId)targets.push(beat.battle.defeatBeatId);}
    for(const target of targets)if(incoming.has(target))incoming.get(target).push(beat.beatId);
  }
  const reachable=new Set([def.entryBeatId]),queue=[def.entryBeatId];
  while(queue.length){
    const id=queue.shift(),beat=def.beatMap.get(id);if(!beat)continue;
    const targets=[];
    if(beat.nextBeatId)targets.push(beat.nextBeatId);
    for(const choice of beat.choices||[])if(choice.nextBeatId)targets.push(choice.nextBeatId);
    if(beat.battle){if(beat.battle.victoryBeatId)targets.push(beat.battle.victoryBeatId);if(beat.battle.defeatBeatId)targets.push(beat.battle.defeatBeatId);}
    for(const target of targets)if(ids.has(target)&&!reachable.has(target)){reachable.add(target);queue.push(target);}
  }
  const unreachable=def.beats.map(b=>b.beatId).filter(id=>!reachable.has(id));
  assert.strictEqual(unreachable.length,0,`clean-room graph contains unreachable/dead beats: ${unreachable.join(",")}`);

  const forbiddenPlayerFacingPhrases=[
    "Battle-finisher requirement","factual pursuit result","Story-authorised","participant state",
    "manufacture custody","cannot reroll on refresh","non-authorised Battle action",
    "combinatorial per-target","No Chronicle state is available"
  ];
  for(const phrase of forbiddenPlayerFacingPhrases)assert(!coreSource.includes(`N("${phrase}`)&&!coreSource.includes(`Q("${phrase}`),`player-facing implementation prose leaked: ${phrase}`);

  const root=def.beatMap.get("v2_scene02_tail");
  assert.strictEqual(JSON.stringify(Array.from(root.choices).map(c=>c.label)),JSON.stringify(["WATCH THE EXCHANGE","MOVE IN CLOSER","STRIKE BEFORE THE HANDOFF","SLIP IN FOR THE PACKAGE"]));
  const watch=def.beatMap.get("v2_watch_exchange");
  assert.strictEqual(JSON.stringify(Array.from(watch.choices).map(c=>c.label)),JSON.stringify(["STOP THE ASSASSIN","SECURE THE PACKAGE","SECURE THE PACKAGE BEFORE THE ASSASSIN","DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","GO AFTER THE ORIGINAL TARGET"]));
  const stopBattle=def.beatMap.get("v2_battle_mi_stop");
  assert(stopBattle&&stopBattle.battle,"Stop Assassin Battle beat missing");
  assert.strictEqual(stopBattle.battle.encounterId,"academy_kakashi_origin_battle_mi_1v1","Stop Assassin incorrectly reused sequential MI config");
  const stopWin=def.beatMap.get("v2_mi_stop_win");
  assert(stopWin,"Stop Assassin win beat missing");
  assert(stopWin.choices.some(c=>c.label==="GO AFTER PACKAGE SMUGGLER"),"Stop Assassin lost Package Smuggler catch-up");
  assert(!stopWin.choices.some(c=>c.label==="GO AFTER ANBU MARKED TARGET"),"Stop Assassin illegally exposes direct AMT pursuit");
  const psCatchup=stopWin.choices.find(c=>c.label==="GO AFTER PACKAGE SMUGGLER");
  assert(psCatchup&&typeof psCatchup.availability==="function","Stop Assassin Package Smuggler catch-up availability missing");
  assert(coreSource.includes("const STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS=3;"),"Stop Assassin Package Smuggler catch-up is not locked to the current three-action gate");
  assert(coreSource.includes('battleActions("mi_stop")<=STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS'),"Stop Assassin choice does not consume the named three-action gate");
  const restrainedStop=def.beatMap.get("v2_mi_restrained_next");
  assert(restrainedStop&&restrainedStop.choices.length===1&&restrainedStop.choices[0].label==="GO AFTER PACKAGE SMUGGLER","restrain-and-continue reopened illegal direct AMT pursuit");

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
  rewardSourcesIdempotent:true,
  terminalRewardCap:250,
  routeGraphClosed:true,
  stableSceneId:"origin_academy_kakashi_anbu_retrieval",
  browserGoldenClaimed:false
},null,2));
