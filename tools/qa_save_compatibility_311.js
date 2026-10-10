#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const CORPUS=JSON.parse(fs.readFileSync(path.join(ROOT,"tools/fixtures/save_compatibility_corpus_311.json"),"utf8"));
const GAME=fs.readFileSync(path.join(ROOT,"game.js"),"utf8");
const PHASE2_STATE=fs.readFileSync(path.join(ROOT,"runtime/alpha-chronicle-state-manifest-43600.js"),"utf8");
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
  vm.runInContext(PHASE2_STATE,context,{filename:"runtime/alpha-chronicle-state-manifest-43600.js"});
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
assert.strictEqual(CORPUS.runtimeGeneration,"SC-ALPHA-RUNTIME-R303-2026-09-22-C","#311 save corpus runtime generation drift");
assert(Array.isArray(CORPUS.fixtures)&&CORPUS.fixtures.length>=6,"#311 bounded lifecycle corpus incomplete");

const {context,store}=makeContext();
assert.strictEqual(typeof context.loadPlayerData,"function","#311 loadPlayerData not exposed to compatibility harness");
assert.strictEqual(typeof context.savePlayerData,"function","#311 savePlayerData not exposed to compatibility harness");

const rootFixture=CORPUS.fixtures[0];
assert(rootFixture&&rootFixture.save,"#322 save-root fixture base missing");
const durableRoots={
  storyDecisionRealisation34000:{version:1,storyUnits:{academy_kakashi:{decisionReceipts:{intent_1:{storyDecisionReceiptId:"intent_1",status:"intent_committed"}}}}},
  storyFactualResolver34600:{version:1,providerId:"ce.neutral_story_factual_resolver.v1",receipts:{"disp_1":{idempotenceKey:"disp_1",bindingRef:"academy_kakashi.v2.disposition.kill.mi",selectedOutcomeRef:"KILLED",status:"resolved"}}},
  specialJoninContextualEvidence:[{evidenceId:"sjctx:academy_kakashi:reconnaissance.tracker_nin:root_1",subjectVariantId:"academy_kakashi",qualificationId:"reconnaissance.tracker_nin",independentSourceId:"root_1",significance:2}]
};
store.clear();
store.set(SAVE_KEY,JSON.stringify({...rootFixture.save,...durableRoots}));
const durableLoaded=context.loadPlayerData();
assert.deepStrictEqual(durableLoaded.storyDecisionRealisation34000,durableRoots.storyDecisionRealisation34000,"#322 Story intent receipts dropped by loadPlayerData");
assert.deepStrictEqual(durableLoaded.storyFactualResolver34600,durableRoots.storyFactualResolver34600,"#322 factual resolver receipts dropped by loadPlayerData");
assert.deepStrictEqual(durableLoaded.specialJoninContextualEvidence,durableRoots.specialJoninContextualEvidence,"#322 contextual Special Jonin evidence dropped by loadPlayerData");
vm.runInContext("playerData=loadPlayerData();savePlayerData();",context);
const durableReloaded=context.loadPlayerData();
assert.deepStrictEqual(durableReloaded.storyDecisionRealisation34000,durableRoots.storyDecisionRealisation34000,"#322 Story intent receipts changed after save/reload");
assert.deepStrictEqual(durableReloaded.storyFactualResolver34600,durableRoots.storyFactualResolver34600,"#322 factual resolver receipts changed after save/reload");
assert.deepStrictEqual(durableReloaded.specialJoninContextualEvidence,durableRoots.specialJoninContextualEvidence,"#322 contextual Special Jonin evidence changed after save/reload");

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

// Phase-2 bounded compatibility extension (#436/#478): currentTeam remains
// derived from the committed Team Formation receipt; tutorialProgress and the
// subject-private Origin ledger survive save/load without a second writer or
// migration reroll.
{
  const fixture=clone(CORPUS.fixtures.find(row=>row.id==="origin_complete_free_play").save);
  fixture.acquisition.academyTeamFormation.confirmationReceipt={
    ...(fixture.acquisition.academyTeamFormation.confirmationReceipt||{}),
    commitId:"save311_phase2_team",
    originVariantId:"academy_kakashi",
    teamVariantIds:["academy_kakashi","academy_hinata","academy_kushina"]
  };
  fixture.phase2ChronicleState={
    schemaVersion:1,
    chronicleRunIdentity:{
      schemaVersion:1,
      runId:"sc_run_v1_save311_00000000-0000-4000-8000-000000000001",
      creationKind:"LEGACY_SAVE_MIGRATION",
      startManifestRef:null,
      parentRunRef:null,
      donorRunRefs:[],
      migrationSourceRefs:["chronicle_origin::academy_kakashi"],
      committedAt:123
    },
    tutorialProgress:{
      schemaVersion:1,
      academyTeamFormationReceiptRef:"save311_phase2_team",
      sandboxPopupSeen:true,
      recommendedRouteEnabled:true,
      openingChoice:"show_me_around",
      trainingTipSeen:true,
      practicalTipSeen:false,
      examsTipSeen:false,
      arenaTipSeen:false,
      arenaCompletionChoiceSeen:false,
      shinobiRecordTipSeen:false,
      tutorialTipsEnabled:true,
      updatedAt:123
    },
    originParticipantContinuity:{schemaVersion:1,byKey:{}},
    promotionState:{
      schemaVersion:1,
      stateDomainId:"promotionState",
      assessmentFamilyId:"academy_to_genin_field_readiness_assessment",
      scenarioId:"academy_genin_missing_courier_dispatch_v1",
      rankTransitionId:"academy_to_genin",
      stableCharacterId:"owned_character_academy_kakashi",
      packagePoolVersion:"academy_genin_fr_package_pool_v1",
      promotionRequirementPackageId:"academy_genin_fr_pkg_information_team_v1",
      packageDerivation:{algorithm:"fnv1a32_utf8_v1",seedFingerprint:"save311603",materializedAt:"2026-10-10T00:00:00.000Z"},
      readinessSlots:{
        academy_genin_req_mission_comprehension:{slotId:"academy_genin_req_mission_comprehension",domain:"mission_comprehension",revealed:true,satisfied:true,revealRefs:["save311603"],evidenceRefs:["save311603"]},
        academy_genin_req_judgement_under_pressure:{slotId:"academy_genin_req_judgement_under_pressure",domain:"judgement_under_pressure",revealed:false,satisfied:false,revealRefs:[],evidenceRefs:[]},
        academy_genin_req_secondary_1:{slotId:"academy_genin_req_secondary_1",domain:"information_use",revealed:false,satisfied:false,revealRefs:[],evidenceRefs:[]},
        academy_genin_req_secondary_2:{slotId:"academy_genin_req_secondary_2",domain:"team_coordination",revealed:false,satisfied:false,revealRefs:[],evidenceRefs:[]}
      },
      attempts:[{
        assessmentAttemptId:"assessment_save311_603",
        attemptNumber:1,
        status:"COMMITTED",
        assessmentFamilyId:"academy_to_genin_field_readiness_assessment",
        scenarioId:"academy_genin_missing_courier_dispatch_v1",
        startedAt:"2026-10-10T00:00:01.000Z",
        missionInstanceId:"mission_academy_genin_missing_courier_dispatch_v1::assessment_save311_603",
        worldOccurrenceId:"occ_academy_genin_missing_courier_dispatch_v1::assessment_save311_603",
        rewardSnapshotId:"reward_snapshot_academy_genin_missing_courier_dispatch_v1::assessment_save311_603",
        battleOccurrenceId:"battle_occ_academy_genin_missing_courier_hold_line_v1::assessment_save311_603"
      }],
      activeAttemptId:"assessment_save311_603",
      nextAttemptNumber:2,
      geninTransitionReceipts:{}
    },
    privateOriginHistories:{
      schemaVersion:1,
      bySubject:{
        academy_kakashi:{
          schemaVersion:1,
          semanticType:"sc.privateOriginHistory.v1",
          privateOriginHistoryId:"private_origin::academy_kakashi::save311",
          chronicleId:"sc_run_v1_save311_00000000-0000-4000-8000-000000000001",
          chronicleRunId:"sc_run_v1_save311_00000000-0000-4000-8000-000000000001",
          subjectStableId:"academy_kakashi",
          originDefinitionId:"academy_kakashi_v2",
          originDefinitionVersion:"v3",
          resolutionMode:"AUTONOMOUS_PRIVATE",
          stableAutonomousResolutionSeedRef:"save311_seed",
          exactCommittedSourceOccurrences:["save311_private_source"],
          exactMaterialChoiceIntentReceipts:[{boundaryId:"B01",choiceId:"watch_exchange",committed:true}],
          exactBattleOutcomeRefs:[{battleOccurrenceId:"save311_battle",battleConfigId:"academy_kakashi_origin_battle_seq_mi",outcome:"victory"}],
          subjectPersistentConsequences:{knowledgeMemory:{maskedInterceptorEncountered:true}},
          economyFirewall:{duplicateStartingPurseGranted:false,autonomousPlayerVictoryBattleRyoGranted:false,blanketInventoryRewardsGranted:false,playerEconomyMutation:false},
          commitState:"COMMITTED",
          committed:true,
          committedAt:123
        }
      }
    }
  };
  store.clear();store.set(SAVE_KEY,JSON.stringify(fixture));
  const rawBefore=store.get(SAVE_KEY);
  const loaded=context.loadPlayerData();
  assert.strictEqual(store.get(SAVE_KEY),rawBefore,"#436 compatibility reader mutated Phase-2 save while loading");
  assert.deepStrictEqual(loaded.phase2ChronicleState,fixture.phase2ChronicleState,"#436 Phase-2 root dropped/rewritten by compatibility reader");
  assert.strictEqual(loaded.phase2ChronicleState.promotionState.activeAttemptId,"assessment_save311_603","#603 active Promotion attempt lineage dropped on load");
  context.__phase2Loaded=loaded;
  vm.runInContext("playerData=__phase2Loaded;",context);
  const team=JSON.parse(JSON.stringify(context.getChronicleCurrentTeam43600()));
  assert.deepStrictEqual(team.teamVariantIds,["academy_kakashi","academy_hinata","academy_kushina"],"#436 currentTeam projection drift");
  const runIdentity=JSON.parse(JSON.stringify(context.getChronicleRunIdentity43600()));
  assert.strictEqual(runIdentity.runId,"sc_run_v1_save311_00000000-0000-4000-8000-000000000001","#494 Chronicle run identity dropped on load");
  const privateStore=JSON.parse(JSON.stringify(context.getPrivateOriginHistoryStore43600({create:false})));
  assert.strictEqual(privateStore.bySubject.academy_kakashi.privateOriginHistoryId,"private_origin::academy_kakashi::save311","#478 private Origin history dropped on load");
  assert.strictEqual(privateStore.bySubject.academy_kakashi.economyFirewall.playerEconomyMutation,false,"#478 private Origin economy firewall drift");
  const pureInput=JSON.stringify(loaded);
  const migrated=JSON.parse(JSON.stringify(context.migratePhase2ChronicleState43600(loaded)));
  assert.strictEqual(JSON.stringify(loaded),pureInput,"#436 pure migration mutated loaded save");
  const migratedAgain=JSON.parse(JSON.stringify(context.migratePhase2ChronicleState43600(migrated)));
  assert.deepStrictEqual(migratedAgain,migrated,"#436 migration rerolled Phase-2 state");
  assert.deepStrictEqual(migrated.phase2ChronicleState.promotionState,fixture.phase2ChronicleState.promotionState,"#603 Promotion package/attempt state changed during migration");
  vm.runInContext("playerData=loadPlayerData();savePlayerData();",context);
  const reloaded=context.loadPlayerData();
  assert.deepStrictEqual(reloaded.phase2ChronicleState,fixture.phase2ChronicleState,"#436 save/reload changed tutorialProgress");
  assert.deepStrictEqual(reloaded.phase2ChronicleState.promotionState,fixture.phase2ChronicleState.promotionState,"#603 Promotion package/attempt state changed after save/reload");
}

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
    compatibilityReaderNotSecondWriter:true,
    storyIntentReceiptsPersist:true,
    factualResolverReceiptsPersist:true,
    contextualSpecialJoninEvidencePersists:true,
    phase2ChronicleStatePersists:true,
    phase2CurrentTeamDerived:true,
    phase2MigrationPureAndIdempotent:true,
    privateOriginHistoryPersists:true,
    privateOriginHistoryNoReroll:true,
    chronicleRunIdentityPersists:true,
    promotionStatePersists:true,
    promotionPackageAndAttemptLineageNoReroll:true
  },
  browserGoldenClaimed:false
},null,2));
