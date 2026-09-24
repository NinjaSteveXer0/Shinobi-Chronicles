#!/usr/bin/env node
"use strict";

const fs=require("fs"),vm=require("vm"),assert=require("assert");
const CONTENT_PATH="runtime/academy-kakashi-v2-content-36000.js";
const WRITING_GOLDEN_PATH="runtime/academy-kakashi-v2-writing-golden-36100.js";
const CORE_PATH="runtime/alpha-kakashi-v2-core-36020.js";
const BATTLE_PATH="runtime/alpha-kakashi-v2-battle-36010.js";
const REWARD_PATH="runtime/alpha-kakashi-v2-rewards-36015.js";
const RENDER_PATH="runtime/alpha-kakashi-v2-renderer-36030.js";
const TRANSITION_PATH="runtime/alpha-kakashi-v2-transition-36040.js";
const STORY_PATH="runtime/alpha-story-scene-board-33900.js";
const EVIDENCE_PATH="runtime/alpha-special-jonin-evidence-producer-34700.js";
const TRAVERSAL_PATH="runtime/alpha-traversal-bridge-33200.js";

for(const p of [CONTENT_PATH,WRITING_GOLDEN_PATH,CORE_PATH,BATTLE_PATH,REWARD_PATH,RENDER_PATH,TRANSITION_PATH,STORY_PATH,EVIDENCE_PATH])assert(fs.existsSync(p),`missing V2/shared file: ${p}`);

const contentSource=fs.readFileSync(CONTENT_PATH,"utf8");
const writingGoldenSource=fs.readFileSync(WRITING_GOLDEN_PATH,"utf8");
const battleSource=fs.readFileSync(BATTLE_PATH,"utf8");
const rewardSource=fs.readFileSync(REWARD_PATH,"utf8");
const coreSource=fs.readFileSync(CORE_PATH,"utf8");
const rendererSource=fs.readFileSync(RENDER_PATH,"utf8");
const transitionSource=fs.readFileSync(TRANSITION_PATH,"utf8");
const storySource=fs.readFileSync(STORY_PATH,"utf8");
const evidenceSource=fs.readFileSync(EVIDENCE_PATH,"utf8");
const traversalSource=fs.readFileSync(TRAVERSAL_PATH,"utf8");

// Architecture gates.
assert(!/runtime\/alpha-kakashi-(?!v2-)/.test(traversalSource),"legacy Kakashi loader leaked back into traversal");
for(const p of [CONTENT_PATH,WRITING_GOLDEN_PATH,BATTLE_PATH,REWARD_PATH,CORE_PATH,RENDER_PATH,TRANSITION_PATH,EVIDENCE_PATH])assert(traversalSource.includes(p),`V2/shared loader missing ${p}`);
assert(traversalSource.includes("function after33600()")&&traversalSource.includes("sc-alpha-origin-choice-reaction-33510-script")&&traversalSource.includes("function load33700()"),"V2 terminal loader can drop activation before future 33600/33700 scripts exist");
const coreOperationalSource=coreSource.split("function diagnostics()")[0];
assert(!/querySelector|document\.|createElement/.test(coreOperationalSource),"Story/state core owns DOM");
assert(!/querySelector|document\.|createElement/.test(battleSource.split("function installPakkunBattleButtons")[0]),"Battle semantic adapter touches Story/presentation DOM");
assert(rendererSource.includes('>*:not(#${ROOT_ID}){display:none!important}'),"renderer does not suppress native Story layer");
assert(rendererSource.includes("kv2-dialogue")&&rendererSource.includes("chronicle_receipt"),"renderer missing singular dialogue/Receipt modes");
assert(!transitionSource.includes("kakashi_v2_transition_locked")&&transitionSource.includes("semanticAlreadyCommitted:true"),"#312 transition must not gate Story truth behind animation");
assert(rendererSource.includes("Final Kakashi Browser-Golden motion benchmark")&&rendererSource.includes("translate:4vw 0")&&rendererSource.includes("transform:none!important"),"#312 Kakashi longhand motion benchmark missing");
assert(rendererSource.includes("playStoryChoreography33900({root,scopeKey,cues})")&&rendererSource.includes("hard_transition_owned_by_33900"),"#312 Kakashi must consume shared choreography without competing with the shared hard-transition owner");
{
  const actorMarkupStart=rendererSource.indexOf("function actorMarkup(");
  const actorMarkupEnd=rendererSource.indexOf("function ensureRoot(",actorMarkupStart);
  const actorMarkupSource=rendererSource.slice(actorMarkupStart,actorMarkupEnd);
  assert(rendererSource.includes(".kv2-card-frame{display:none!important}")&&actorMarkupStart>=0&&actorMarkupEnd>actorMarkupStart&&!actorMarkupSource.includes('frame.className="kv2-card-frame"')&&actorMarkupSource.includes("figure.append(img,label)"),"Kakashi phantom Story card-holder chrome was not retired");
}
assert(rendererSource.includes("captureDepartureVisuals(root,previous)")&&rendererSource.includes("materializeDepartureGhosts(root,prepared,next)")&&rendererSource.includes("!hardTransition"),"#312 bounded non-hard departure presentation missing");
assert(storySource.includes('HARD_TRANSITION_CURTAIN_ID="sc-story-hard-transition-33900"')&&storySource.includes("function playStoryHardSceneTransition33900")&&storySource.includes("document.body.appendChild(curtain)"),"#334 shared Story hard-transition owner missing from 33900");
assert(!rendererSource.includes("kakashi-v2-global-curtain")&&!rendererSource.includes("function ensureGlobalCurtain(")&&!rendererSource.includes("function setGlobalCurtain(")&&!rendererSource.includes("function setWipe("),"#334 Kakashi renderer retained hard-transition ownership");
assert(!rendererSource.split("function ensureRoot")[0].includes("root.innerHTML"),"renderer source unexpectedly rebuilds root before mount");
assert(!rendererSource.slice(rendererSource.indexOf("function syncActors"),rendererSource.indexOf("function bind")).includes("root.innerHTML"),"cue render remounts Scene Board root");
assert(transitionSource.includes('visualTransition:"shared_story_hard_transition_33900"')&&transitionSource.includes('visualTransition:"none"')&&transitionSource.includes("playStoryHardSceneTransition33900"),"#334 final hard/soft transition delegation missing");
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
    SC_ALPHA_SPECIAL_JONIN_EVIDENCE_PRODUCER_34700:{patchId:"qa"},
    projectSpecialJoninContextualEvidence34700:()=>({success:true}),
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
  vm.runInContext(writingGoldenSource,context,{filename:WRITING_GOLDEN_PATH});
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

  const retiredPlayerChoices=[
    "WATCH THE EXCHANGE","MOVE IN CLOSER","STRIKE BEFORE THE HANDOFF","SLIP IN FOR THE PACKAGE",
    "STOP THE ASSASSIN","SECURE THE PACKAGE","SECURE THE PACKAGE BEFORE THE ASSASSIN",
    "DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE","GO AFTER THE ORIGINAL TARGET",
    "GO AFTER PACKAGE SMUGGLER","CHASE THE PACKAGE SMUGGLER","STAY ON THE FIRST MAN",
    "RETURN AND REPORT","ASK WHERE THE PACKAGE WAS GOING","RESTRAIN HER AND CONTINUE"
  ];
  const livePlayerChoiceLabels=new Set(def.beats.flatMap(beat=>(beat.choices||[]).filter(choice=>choice.label!=="RESOLVE RESULT").map(choice=>choice.label)));
  for(const label of retiredPlayerChoices)assert(!livePlayerChoiceLabels.has(label),"retired Kakashi player-facing choice returned: "+label);

  const root=def.beatMap.get("v2_scene02_tail");
  assert.strictEqual(JSON.stringify(Array.from(root.choices).map(c=>c.label)),JSON.stringify(["WATCH THE HANDOFF","GET CLOSER","INTERRUPT THE HANDOFF","SLIP IN AND TAKE IT"]));
  const watch=def.beatMap.get("v2_watch_exchange");
  assert.strictEqual(JSON.stringify(Array.from(watch.choices).map(c=>c.label)),JSON.stringify(["INTERCEPT THE MASKED ATTACKER","GO FOR THE PACKAGE","BEAT HER TO THE PACKAGE","DEAL WITH HER FIRST","CHASE THE MAN FROM THE PHOTO"]));
  const stopBattle=def.beatMap.get("v2_battle_mi_stop");
  assert(stopBattle&&stopBattle.battle,"Intercept Masked Attacker Battle beat missing");
  assert.strictEqual(stopBattle.battle.encounterId,"academy_kakashi_origin_battle_mi_1v1","Intercept Masked Attacker incorrectly reused sequential MI config");
  const stopWin=def.beatMap.get("v2_mi_stop_win");
  assert(stopWin,"Intercept Masked Attacker win beat missing");
  assert(stopWin.choices.some(c=>c.label==="CHASE THE PACKAGE"),"Intercept Masked Attacker lost Package Smuggler catch-up");
  assert(!stopWin.choices.some(c=>c.label==="CHASE THE MAN FROM THE PHOTO"),"Intercept Masked Attacker illegally exposes direct AMT pursuit");
  const psCatchup=stopWin.choices.find(c=>c.label==="CHASE THE PACKAGE");
  assert(psCatchup&&typeof psCatchup.availability==="function","Stop Assassin Package Smuggler catch-up availability missing");
  assert(coreSource.includes("const STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS=3;"),"Stop Assassin Package Smuggler catch-up is not locked to the current three-action gate");
  assert(coreSource.includes('battleActions("mi_stop")<=STOP_ASSASSIN_PS_CATCHUP_MAX_ACTIONS'),"Stop Assassin choice does not consume the named three-action gate");
  const restrainedStop=def.beatMap.get("v2_mi_restrained_next");
  assert(restrainedStop&&restrainedStop.nextBeatId==="v2_ps_pursuit_resolver"&&restrainedStop.choices.length===0,"final RESTRAIN resolver must preserve Package Smuggler continuation without reopening direct AMT pursuit");
  assert(def.beatMap.get("v2_mi_kill_result")&&def.beatMap.get("v2_ps_kill_result")&&def.beatMap.get("v2_amt_kill_result"),"final single-target KILL result beats missing");
  assert(def.beatMap.get("v2_group2_kill_result")&&def.beatMap.get("v2_group3_kill_result"),"final mixed group KILL result beats missing");

  const packageSecond=def.beatMap.get("v2_mi_package_second_win");
  assert(packageSecond&&packageSecond.machineResolved===true&&packageSecond.mode==="resolver","Family 04 fast/slow MI result must be deterministic, not a player choice");
  assert(packageSecond.choices.length===2&&packageSecond.choices.every(c=>c.label==="RESOLVE RESULT"),"Family 04 MI result leaked a pseudo-choice");
  const psPackageWin=def.beatMap.get("v2_ps_package_second_win");
  assert(psPackageWin.choices.some(c=>c.label==="CHASE THE MAN FROM THE PHOTO")&&psPackageWin.choices.some(c=>c.label==="RETURN TO ANBU"),"Family 04 post-PS decision labels drifted");
  const securePackageWin=def.beatMap.get("v2_ps_mi_win");
  assert(securePackageWin.choices.some(c=>c.label==="CHASE THE MAN FROM THE PHOTO")&&securePackageWin.choices.some(c=>c.label==="RETURN TO ANBU"),"Family 03 post-package decision labels drifted");
  const askWhere=def.beatMap.get("v2_stay_package_intercept");
  assert(askWhere.choices.some(c=>c.label==="ASK WHERE IT WAS GOING"),"Family 02 interrogation label drifted");
  const closer=def.beatMap.get("v2_closer_handoff");
  assert.strictEqual(closer.mode,"choice");
  assert.strictEqual(closer.choices.length,5);
  assert(!closer.nextBeatId,"Get Closer handoff replays far-distance WATCH opening");

  const interruptCues=context.getAcademyKakashiV2Cues36020("v2_direct_strike_setup").map(x=>x.text);
  assert(interruptCues.includes("You could've kept watching.")&&interruptCues.includes("I saw enough.")&&interruptCues.includes("You're alone."),"Family 05 interrupt dialogue missing");
  assert(!interruptCues.includes("For now."),"superseded direct-handoff Kakashi reply returned");
  const interruptWinCues=context.getAcademyKakashiV2Cues36020("v2_direct_strike_2v1_win").map(x=>x.text);
  for(const line of ["You're after this.","Put it down.","No."])assert(interruptWinCues.includes(line),"Family 05 MI entry missing: "+line);

  assert(def.beatMap.has("v2_hidden_review"),"corrected hidden-test review beat missing");
  assert(!def.beatMap.has("v2_minato"),"superseded non-reveal Minato beat retained");
  assert(!def.beatMap.has("v2_complete"),"forbidden Origin occurrence sealed pseudo-receipt retained");
  const receipt=def.beatMap.get("v2_receipt");
  assert(receipt&&receipt.exitScene===true&&Array.isArray(receipt.onAdvanceConsequences),"Receipt must complete Origin directly on CONTINUE");
  assert(!coreSource.includes('RECORD("Origin occurrence sealed.'),"raw Origin occurrence sealed player-facing close returned");
  assert(coreSource.includes('presentationPackageHolder:"MINATO"'),"hidden review package presentation seam missing");

  const policeGroup=def.beatMap.get("v2_group3_police_handoff");
  assert(policeGroup&&policeGroup.beatId==="v2_group3_police_handoff","all-three Police handoff missing");
  assert(coreSource.includes('return["policeAmtMale","policeMiFemale"]'),"all-three Police handoff must use a mixed pair not equal to a dedicated single-target pair");
  for(const asset of ["uchiha_police_force_member_male.png","uchiha_police_force_member_female.png","uchiha_police_force_male_alt_1.png","uchiha_police_force_female_alt_1.png","uchiha_police_force_male_alt_2.png","uchiha_police_force_female_alt_2.png"])assert(coreSource.includes(asset),"Police card asset missing: "+asset);
  assert(rendererSource.includes("police_handoff")&&rendererSource.includes('data-count="6"')&&rendererSource.includes("kakashi_upf_"),"Police cards are not projected on a six-person handoff stage");
  assert(rendererSource.includes("hokage_test_review")&&rendererSource.includes("presentationPackageHolder"),"hidden test review presentation contract missing");
  const machineResolverBeats=[...def.beatMap.values()].filter(b=>b.machineResolved===true);
  assert.strictEqual(machineResolverBeats.length,11,"Writing-Golden resolver beat count drifted");
  assert(machineResolverBeats.every(b=>b.mode==="resolver"&&b.choices.length===2&&b.choices.every(ch=>ch.label==="RESOLVE RESULT")),"resolver-only branch is still a player-facing choice card");
  assert(!/C\([^,\n]+,"CONTINUE"/.test(coreSource),"resolver CONTINUE pseudo-decision returned");
  assert(rendererSource.includes("beat.machineResolved===true"),"renderer no longer hides machine resolver branches");
  assert(transitionSource.includes("committedResolverChoice36040")&&transitionSource.includes("available.length!==1"),"transition no longer projects the single committed resolver branch directly");
}

console.log(JSON.stringify({
  pass:true,
  architectureBoundary:true,
  exactBattleConfigCount:10,
  rewardSourcesIdempotent:true,
  captureTierRewardModel:"25/50/100",
  routeGraphClosed:true,
  stableSceneId:"origin_academy_kakashi_anbu_retrieval",
  browserGoldenClaimed:false
},null,2));
