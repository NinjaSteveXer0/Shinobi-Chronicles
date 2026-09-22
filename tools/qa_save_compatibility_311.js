#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const CORPUS=JSON.parse(fs.readFileSync(path.join(ROOT,"tools/fixtures/save_compatibility_corpus_311.json"),"utf8"));
const GAME=fs.readFileSync(path.join(ROOT,"game.js"),"utf8");
const SAVE_KEY="shinobiChroniclesPlayerSave";

function dummy(){
  return{
    style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},
    appendChild(){},remove(){},setAttribute(){},querySelector(){return null;},
    querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},
    getContext(){return{};},focus(){},click(){},innerHTML:"",textContent:"",
    value:"",checked:false,disabled:false
  };
}
function makeContext(){
  const store=new Map();
  const context={
    console:{log(){},info(){},warn(){},error(){},table(){}},
    localStorage:{
      getItem:key=>store.has(key)?store.get(key):null,
      setItem:(key,value)=>store.set(key,String(value)),
      removeItem:key=>store.delete(key),
      clear:()=>store.clear()
    },
    document:{
      getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},
      createElement(){return dummy();},body:dummy(),documentElement:dummy(),
      addEventListener(){},removeEventListener(){}
    },
    requestAnimationFrame(){return 0;},cancelAnimationFrame(){},
    alert(){},confirm(){return true;},prompt(){return null;},
    Image:function(){return dummy();},
    navigator:{userAgent:"node-save-compatibility-311"},
    location:{reload(){},href:"http://localhost/"},
    addEventListener(){},removeEventListener(){},
    setTimeout,clearTimeout,setInterval,clearInterval,
    Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,
    parseInt,parseFloat,Infinity,NaN
  };
  context.window=context;
  context.globalThis=context;
  vm.createContext(context);
  vm.runInContext(GAME,context,{filename:"game.js"});
  return{context,store};
}
function clone(value){return JSON.parse(JSON.stringify(value));}
function projection(save){
  const a=save&&save.acquisition||{};
  const active=save&&save.storySceneRuntime&&save.storySceneRuntime.active||null;
  const local=active&&active.localContext&&active.localContext.kakashiV2||{};
  const participants=local.participants||{};
  const inv=Array.isArray(save&&save.inventory)?save.inventory:[];
  const pill=inv.find(x=>x&&x.id==="field_recovery_pill");
  const ownership=save&&save.characterOwnership&&Array.isArray(save.characterOwnership.ownedRegistryIds)?save.characterOwnership.ownedRegistryIds:[];
  const receipts=save&&save.originConsequences&&Array.isArray(save.originConsequences.receipts)?save.originConsequences.receipts:[];
  return{
    ryo:Number(save&&save.ryo)||0,
    exp:Number(save&&save.exp)||0,
    inventoryQuantity:pill?Number(pill.quantity)||0:0,
    originVariantId:a.chronicleOriginVariantId||null,
    onboardingStatus:a.onboardingStatus||null,
    originCompleted:!!(a.chronicleOrigin&&a.chronicleOrigin.prologueCompleted===true),
    ownedCount:ownership.length,
    teamCompleted:!!(a.academyTeamFormation&&a.academyTeamFormation.completed===true),
    teamContinued:!!(a.academyTeamFormation&&a.academyTeamFormation.continuationCompleted===true),
    activeStoryBeat:active&&active.beatId||null,
    battleResumeOutcome:active&&active.battleResume&&active.battleResume.outcome||null,
    packageHolder:local.package&&local.package.holder||null,
    terminalCommitted:!!(local.rewards&&local.rewards.terminalCommitted===true),
    participantAMT:participants.AMT&&participants.AMT.state||null,
    participantPS:participants.PS&&participants.PS.state||null,
    participantMI:participants.MI&&participants.MI.state||null,
    originConsequenceReceiptCount:receipts.length
  };
}
function assertExpected(id,got,expected){
  for(const [key,value] of Object.entries(expected||{})){
    assert.deepStrictEqual(got[key],value,id+" expected "+key+"="+JSON.stringify(value)+" got "+JSON.stringify(got[key]));
  }
}

assert.strictEqual(CORPUS.schemaVersion,1,"#311 save corpus schema");
assert.strictEqual(CORPUS.runtimeGeneration,"SC-ALPHA-RUNTIME-R303-2026-09-22-A","#311 save corpus runtime generation drift");
assert(Array.isArray(CORPUS.fixtures)&&CORPUS.fixtures.length>=6,"#311 bounded lifecycle corpus incomplete");

const {context,store}=makeContext();
assert.strictEqual(typeof context.loadPlayerData,"function","#311 loadPlayerData not exposed to compatibility harness");
assert.strictEqual(typeof context.savePlayerData,"function","#311 savePlayerData not exposed to compatibility harness");

const rows=[];
for(const fixture of CORPUS.fixtures){
  assert(fixture.id&&fixture.lifecycle&&fixture.saveSchemaGeneration,"#311 save fixture metadata incomplete");
  store.clear();
  store.set(SAVE_KEY,JSON.stringify(fixture.save));
  const rawBefore=store.get(SAVE_KEY);

  const loaded1=context.loadPlayerData();
  assert.strictEqual(store.get(SAVE_KEY),rawBefore,fixture.id+" compatibility reader mutated save while loading");
  assert(!Object.prototype.hasOwnProperty.call(loaded1,"retiredKakashiOwner"),fixture.id+" retired unknown owner field resurrected");

  const p1=projection(loaded1);
  assertExpected(fixture.id,p1,fixture.expect);

  vm.runInContext("playerData=loadPlayerData();savePlayerData();globalThis.__save311=cloneProgressionData(playerData);",context);
  const afterFirstSave=store.get(SAVE_KEY);
  const loaded2=context.loadPlayerData();
  const p2=projection(loaded2);
  assert.deepStrictEqual(p2,p1,fixture.id+" migration/load projection is not deterministic/idempotent");

  vm.runInContext("playerData=loadPlayerData();savePlayerData();globalThis.__save311Again=cloneProgressionData(playerData);",context);
  const loaded3=context.loadPlayerData();
  const p3=projection(loaded3);
  assert.deepStrictEqual(p3,p2,fixture.id+" second reload changed committed outcome/resources");

  const persisted1=JSON.parse(afterFirstSave);
  const persisted2=JSON.parse(store.get(SAVE_KEY));
  assert.strictEqual(Number(persisted2.ryo)||0,Number(persisted1.ryo)||0,fixture.id+" duplicate Ryō grant on reload");
  assert.strictEqual(
    Array.isArray(persisted2.originConsequences&&persisted2.originConsequences.receipts)?persisted2.originConsequences.receipts.length:0,
    Array.isArray(persisted1.originConsequences&&persisted1.originConsequences.receipts)?persisted1.originConsequences.receipts.length:0,
    fixture.id+" duplicate consequence receipt on reload"
  );
  assert.strictEqual(
    JSON.stringify(persisted2.storySceneRuntime&&persisted2.storySceneRuntime.active&&persisted2.storySceneRuntime.active.localContext||{}),
    JSON.stringify(persisted1.storySceneRuntime&&persisted1.storySceneRuntime.active&&persisted1.storySceneRuntime.active.localContext||{}),
    fixture.id+" Story outcome/local state rerolled on reload"
  );

  rows.push({
    id:fixture.id,
    lifecycle:fixture.lifecycle,
    saveSchemaGeneration:fixture.saveSchemaGeneration,
    readerPure:true,
    deterministicMigration:true,
    idempotentReload:true,
    noDuplicateGrant:true,
    noOutcomeReroll:true,
    retiredUnknownFieldDropped:true,
    projection:p3
  });
}

const legacy=rows.find(r=>r.id==="legacy_pre_origin");
assert(legacy&&legacy.saveSchemaGeneration==="pre-characterOwnership-alpha","#311 previous-version compatibility fixture missing");
const free=rows.find(r=>r.id==="origin_complete_free_play");
assert(free&&free.projection.onboardingStatus==="academy_free_play"&&free.projection.ownedCount===3,"#311 free-play lifecycle fixture failed");

console.log(JSON.stringify({
  pass:true,
  issue:311,
  runtimeGeneration:CORPUS.runtimeGeneration,
  compatibilityHorizon:CORPUS.compatibilityHorizon,
  fixtureCount:rows.length,
  rows,
  invariants:{
    deterministicMigration:true,
    loadReaderDoesNotWrite:true,
    reloadIdempotent:true,
    noDuplicateGrant:true,
    noOutcomeReroll:true,
    retiredUnknownBehaviorNotResurrected:true,
    compatibilityReaderNotSecondWriter:true
  },
  browserGoldenClaimed:false
},null,2));
