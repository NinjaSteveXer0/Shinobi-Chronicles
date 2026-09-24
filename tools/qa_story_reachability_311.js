#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");
const assert=require("assert");
const {analyzeStoryScene}=require("./story_graph_integrity_311.js");

const ROOT=path.resolve(__dirname,"..");

function loadRegularOriginScenes(){
  const files=[
    path.join(ROOT,"runtime","alpha-origin-scenes-32900-core.js"),
    path.join(ROOT,"runtime","academy-wasabi-writing-golden-343.js"),
    path.join(ROOT,"runtime","alpha-origin-scenes-32900-a.js"),
    path.join(ROOT,"runtime","alpha-origin-scenes-32900-b.js"),
    path.join(ROOT,"runtime","alpha-origin-scenes-32900-c.js"),
    path.join(ROOT,"runtime","alpha-origin-scenes-32900-integrator.js")
  ];
  const scenes=new Map([
    ["origin_academy_menma_prologue",{
      sceneId:"origin_academy_menma_prologue",
      entryBeatId:"menma",
      beats:[{beatId:"menma",mode:"narration",text:"Menma",exitScene:true}]
    }]
  ]);
  const ctx={
    console:{log(){},info(){},warn(){},error(){},table(){}},
    Date,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,
    globalThis:null,document:undefined,
    playerData:{activityHistory:[],acquisition:{chronicleOriginVariantId:"academy_hinata",chronicleOrigin:{prologueCompleted:false}}},
    activityHistory:[],
    cloneProgressionData:v=>v===undefined?undefined:JSON.parse(JSON.stringify(v)),
    savePlayerData:()=>true,
    getCurrentChronicleOccurrenceHistoryScope:()=>({kind:"origin_chronicle_occurrence"}),
    unregisterStoryScene:id=>scenes.delete(id),
    registerStoryScene:def=>{scenes.set(def.sceneId,def);return{success:true,sceneId:def.sceneId};},
    getStorySceneDefinition:id=>scenes.get(id)||null,
    getActiveStorySceneRuntime:()=>null,
    ensurePlayerAcquisitionState:()=>ctx.playerData.acquisition,
    openOverlay:()=>true,
    renderAlphaTailedBeastMissionCommand:()=>({success:true}),
    beginAlphaChronicleOriginPrologue:()=>({success:false,reason:"qa"}),
    completeChronicleOriginPrologue:()=>({success:true}),
    consumeStaticOriginSourceOccurrence:()=>({success:true}),
    startStoryScene:()=>({success:true})
  };
  ctx.globalThis=ctx;
  vm.createContext(ctx);
  for(const file of files)vm.runInContext(fs.readFileSync(file,"utf8"),ctx,{filename:file});
  return scenes;
}

function loadKakashiV2Scene(){
  const scenes=new Map();
  const factualDefinitions=new Map();
  const D={
    openSemanticChoiceSet:spec=>({success:true,choiceSet:{choiceSetId:"qa:"+spec.decisionPointRef}}),
    commitStoryIntent:req=>({success:true,receipt:{storyDecisionReceiptId:"qa",intentCommitRef:"qa:"+req.choiceId}})
  };
  const F={
    stableRef:(prefix,payload)=>prefix+":"+JSON.stringify(payload),
    registerStoryFactualResolverBinding:(ref,spec)=>{factualDefinitions.set(ref,spec);return{success:true};},
    resolveStoryFactualAction:req=>{
      const spec=factualDefinitions.get(req.bindingRef);
      const out=spec&&spec.outcomes&&spec.outcomes[0];
      return out?{success:true,receipt:{selectedOutcomeRef:out.outcomeRef,storyFactualResolverReceiptId:"qa"}}:{success:false};
    }
  };
  const E={
    projectSpecialJoninContextualEvidence34700:()=>({success:true,idempotent:true}),
    getSpecialJoninContextualEvidence34700:()=>[],
    evaluateSpecialJoninContextualEvidence34700:()=>({success:true,evaluation:null})
  };
  const battleConfigs={
    academy_kakashi_origin_battle_amt_1v1:{},academy_kakashi_origin_battle_amt_ps_2v1:{},
    academy_kakashi_origin_battle_amt_ps_mi_3v1:{},academy_kakashi_origin_battle_kakashi_pakkun_vs_amt:{},
    academy_kakashi_origin_battle_ps_mi_2v1:{},academy_kakashi_origin_battle_mi_1v1:{},
    academy_kakashi_origin_battle_ps_1v1:{},academy_kakashi_origin_battle_seq_mi:{},
    academy_kakashi_origin_battle_seq_ps:{},academy_kakashi_origin_battle_seq_amt_pakkun:{}
  };
  const ctx={
    console:{log(){},info(){},warn(){},error(){},table(){}},
    JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,
    playerData:{},savePlayerData:()=>true,
    SC_STORY_DECISION_REALISATION_34000:D,
    SC_STORY_FACTUAL_RESOLVER_34600:F,
    SC_ALPHA_SPECIAL_JONIN_EVIDENCE_PRODUCER_34700:E,
    projectSpecialJoninContextualEvidence34700:E.projectSpecialJoninContextualEvidence34700,
    SC_ACADEMY_KAKASHI_V2_BATTLE_36010:{configs:battleConfigs},
    commitAcademyKakashiV2TerminalRewards36015:()=>({success:true,sourceReceipts:[],plan:{totalRyo:100}}),
    unregisterStoryScene:id=>scenes.delete(id),
    registerStoryScene:def=>{scenes.set(def.sceneId,def);return{success:true,sceneId:def.sceneId};},
    getStorySceneDefinition:id=>scenes.get(id)||null,
    getActiveStorySceneRuntime:()=>null,
    completeChronicleOriginPrologue:()=>({success:true})
  };
  ctx.globalThis=ctx;
  vm.createContext(ctx);
  for(const rel of ["runtime/academy-kakashi-v2-content-36000.js","runtime/academy-kakashi-v2-writing-golden-36100.js","runtime/alpha-kakashi-v2-core-36020.js"]){
    const file=path.join(ROOT,rel);
    vm.runInContext(fs.readFileSync(file,"utf8"),ctx,{filename:file});
  }
  return scenes.get("origin_academy_kakashi_anbu_retrieval");
}

const regular=loadRegularOriginScenes();
const kakashi=loadKakashiV2Scene();
assert(kakashi,"#311 Kakashi V2 scene missing");

const rows=[];
for(const [sceneId,def] of regular){
  const row=analyzeStoryScene(def);
  rows.push(row);
}
rows.push(analyzeStoryScene(kakashi));

const failures=rows.filter(r=>!r.pass);
assert.strictEqual(failures.length,0,"#311 route integrity failures: "+JSON.stringify(failures,null,2));

const productionSceneIds=rows.map(r=>r.sceneId);
for(const required of [
  "origin_academy_hinata_prologue",
  "origin_academy_izuno_prologue",
  "origin_academy_mirai_prologue",
  "origin_academy_menma_prologue",
  "origin_academy_kushina_prologue",
  "origin_academy_kurenai_prologue",
  "origin_academy_iwabee_prologue",
  "origin_academy_metal_lee_prologue",
  "origin_academy_kakashi_anbu_retrieval",
  "origin_academy_obito_journey_to_training"
]){
  assert(productionSceneIds.includes(required),"#311 required Origin scene missing from reachability audit: "+required);
}

// Deliberate negative fixtures.
let bad=analyzeStoryScene({sceneId:"bad_dead_end",entryBeatId:"a",beats:[{beatId:"a"}]});
assert.strictEqual(bad.pass,false);
assert(bad.errors.some(x=>x==="nonterminal_dead_end:a"));

bad=analyzeStoryScene({sceneId:"bad_choice",entryBeatId:"a",beats:[
  {beatId:"a",mode:"choice",choices:[{choiceId:"x",label:"X"},{choiceId:"x",label:"Y"}]},
  {beatId:"z",exitScene:true}
]});
assert.strictEqual(bad.pass,false);
assert(bad.errors.some(x=>x.startsWith("duplicate_choice_handler")));
assert(bad.errors.some(x=>x.startsWith("handlerless_choice")));

bad=analyzeStoryScene({sceneId:"bad_battle",entryBeatId:"a",beats:[
  {beatId:"a",battle:{victoryBeatId:"z"}},
  {beatId:"z",exitScene:true}
]});
assert.strictEqual(bad.pass,false);
assert(bad.errors.includes("battle_defeat_return_missing:a"));

bad=analyzeStoryScene({sceneId:"bad_orphan",entryBeatId:"a",beats:[
  {beatId:"a",nextBeatId:"z"},
  {beatId:"orphan",exitScene:true},
  {beatId:"z",exitScene:true}
]});
assert.strictEqual(bad.pass,false);
assert(bad.errors.includes("unreachable_beat:orphan"));

console.log(JSON.stringify({
  pass:true,
  issue:311,
  auditedSceneCount:rows.length,
  auditedSceneIds:productionSceneIds,
  totalBeatCount:rows.reduce((n,r)=>n+r.beatCount,0),
  totalChoiceCount:rows.reduce((n,r)=>n+r.choiceCount,0),
  totalBattleBeatCount:rows.reduce((n,r)=>n+r.battleCount,0),
  beatFallbackChoiceCount:rows.reduce((n,r)=>n+r.beatFallbackChoiceCount,0),
  invariants:{
    everyNonterminalHasOutgoingPath:true,
    everyChoiceHasSingleIdentityAndReachableTarget:true,
    everyReferencedNextBeatExists:true,
    everyBattleHasVictoryAndDefeatReturn:true,
    everyBeatReachableFromEntry:true,
    everyBeatCanReachTerminal:true,
    noSilentHandlerlessChoiceFallback:true
  },
  negativeFixtures:{
    deadEndRejected:true,
    duplicateChoiceHandlerRejected:true,
    missingBattleResultRejected:true,
    orphanBeatRejected:true
  },
  browserGoldenClaimed:false
},null,2));
