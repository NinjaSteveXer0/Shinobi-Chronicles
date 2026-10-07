#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const CORE_PATH=path.join(ROOT,"runtime/alpha-promotion-core-60300.js");
const COURIER_PATH=path.join(ROOT,"runtime/alpha-promotion-courier-assessment-60310.js");
const UI_PATH=path.join(ROOT,"runtime/alpha-promotion-arena-ui-60320.js");
const UI_CSS_PATH=path.join(ROOT,"runtime/alpha-promotion-arena-ui-60320.css");

const PACKAGE_POOL=Object.freeze({
  academy_genin_fr_pkg_information_team_v1:["information_use","team_coordination"],
  academy_genin_fr_pkg_information_combat_v1:["information_use","combat_readiness"],
  academy_genin_fr_pkg_information_objective_v1:["information_use","objective_protection"],
  academy_genin_fr_pkg_team_combat_v1:["team_coordination","combat_readiness"],
  academy_genin_fr_pkg_team_objective_v1:["team_coordination","objective_protection"],
  academy_genin_fr_pkg_combat_objective_v1:["combat_readiness","objective_protection"]
});
const PACKAGE_IDS=Object.freeze(Object.keys(PACKAGE_POOL));
const FIXED_SLOTS=Object.freeze([
  "academy_genin_req_mission_comprehension",
  "academy_genin_req_judgement_under_pressure",
  "academy_genin_req_secondary_1",
  "academy_genin_req_secondary_2"
]);
const SCENARIO_ID="academy_genin_missing_courier_dispatch_v1";
const TRANSITION_ID="academy_to_genin";
const BATTLE_CONFIG="battle_cfg_academy_genin_missing_courier_hold_line_v1";
const BATTLE_ENCOUNTER="enc_academy_genin_missing_courier_rogue_hold_line_v1";
const BATTLE_OBJECTIVE="battle_obj_academy_genin_hold_line_repel_rogue_v1";
const MISSION_PREFIX="mission_academy_genin_missing_courier_dispatch_v1::";
const OCC_PREFIX="occ_academy_genin_missing_courier_dispatch_v1::";
const SNAPSHOT_PREFIX="reward_snapshot_academy_genin_missing_courier_dispatch_v1::";
const BATTLE_PREFIX="battle_occ_academy_genin_missing_courier_hold_line_v1::";
const ARC1_NORTH_RAVINE_TOKENS=Object.freeze([
  "arc1_m1_unknown_operative",
  "unknown_operative",
  "north_ravine_major_contact"
]);

function stableString(value){
  if(Array.isArray(value))return "["+value.map(stableString).join(",")+"]";
  if(value&&typeof value==="object")return "{"+Object.keys(value).sort().map(k=>JSON.stringify(k)+":"+stableString(value[k])).join(",")+"}";
  return JSON.stringify(value);
}
function clone(value){return JSON.parse(JSON.stringify(value));}
function readIfExists(file){return fs.existsSync(file)?fs.readFileSync(file,"utf8"):null;}
function sourceRequire(source,needle,label){assert(source.includes(needle),label+": missing "+needle);}
function sourceForbid(source,pattern,label){assert(!pattern.test(source),label+": forbidden pattern "+pattern);}

function deterministicFixturePackage(seed,characterId){
  // QA oracle only: it proves stability properties and full six-package coverage.
  // Production is free to use a different deterministic hash/PRNG implementation.
  const input=String(seed)+"|"+String(characterId)+"|"+TRANSITION_ID+"|v1";
  let h=2166136261>>>0;
  for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}
  return PACKAGE_IDS[h%PACKAGE_IDS.length];
}

function makeFrozenOracle(){
  let attemptOrdinal=0;
  const materialized=new Map();
  const attempts=[];
  const rewards=new Set();
  const receipts=[];
  const world={
    currentTeam:["academy_menma","academy_hinata","academy_kakashi"],
    ownership:["academy_menma","academy_hinata","academy_kakashi"],
    assignment:{academy_menma:"origin",academy_hinata:"team",academy_kakashi:"team"},
    deployment:{player:["academy_menma"],enemy:[]},
    arc1NorthRavineOccurrenceCount:1,
    ryo:0,
    inventory:{field_recovery_pill:0}
  };
  function materialize({seed,characterId,scenarioId=SCENARIO_ID,team=world.currentTeam}){
    const key=[seed,characterId,TRANSITION_ID].join("::");
    if(!materialized.has(key))materialized.set(key,{seed,characterId,rankTransitionId:TRANSITION_ID,promotionRequirementPackageId:deterministicFixturePackage(seed,characterId),promotionRequirementPackageVersion:1});
    return {...materialized.get(key),assessmentScenarioId:scenarioId,teamSnapshot:[...team]};
  }
  function inspect(spec){return{...materialize(spec),attemptCommitted:false};}
  function commitAttempt(spec){
    const pkg=materialize(spec);const id="assessment_attempt_603_fixture_"+(++attemptOrdinal);
    const attempt={assessmentAttemptId:id,packageId:pkg.promotionRequirementPackageId,scenarioId:spec.scenarioId||SCENARIO_ID,status:"ACTIVE",missionId:MISSION_PREFIX+id,occurrenceId:OCC_PREFIX+id,rewardSnapshotId:SNAPSHOT_PREFIX+id,battleOccurrenceId:BATTLE_PREFIX+id,slots:{
      academy_genin_req_mission_comprehension:{domain:"mission_comprehension",revealedToSubject:true,satisfied:false},
      academy_genin_req_judgement_under_pressure:{domain:"judgement_under_pressure",revealedToSubject:false,satisfied:false},
      academy_genin_req_secondary_1:{domain:PACKAGE_POOL[pkg.promotionRequirementPackageId][0],revealedToSubject:false,satisfied:false},
      academy_genin_req_secondary_2:{domain:PACKAGE_POOL[pkg.promotionRequirementPackageId][1],revealedToSubject:false,satisfied:false}
    }};
    attempts.push(attempt);return attempt;
  }
  function projectSlot(slot){
    if(!slot.revealedToSubject)return{label:"??????",state:"hidden",ariaLabel:"Hidden readiness requirement",className:"readiness-slot is-hidden",data:{revealed:"false"}};
    return{label:slot.domain,state:slot.satisfied?"satisfied":"unsatisfied",ariaLabel:slot.domain,className:"readiness-slot "+(slot.satisfied?"is-satisfied":"is-unsatisfied"),data:{revealed:"true"}};
  }
  function grantReward(cause,amount=0,item=null){
    if(rewards.has(cause))return{idempotent:true,cause};rewards.add(cause);
    if(amount)world.ryo+=amount;if(item)world.inventory[item]=(world.inventory[item]||0)+1;
    return{idempotent:false,cause};
  }
  function receipt(attempt){const r={attemptId:attempt.assessmentAttemptId,status:attempt.status,rewardCauses:[...rewards].sort()};receipts.push(r);return clone(r);}
  return{world,materialize,inspect,commitAttempt,projectSlot,grantReward,receipt,attempts,rewards,receipts};
}

function runOracleAdversarialSelfTest(){
  const q=makeFrozenOracle();
  const seen=new Set();
  for(let s=0;s<5000&&seen.size<6;s++)seen.add(q.materialize({seed:"seed-"+s,characterId:"academy_menma"}).promotionRequirementPackageId);
  assert.deepStrictEqual([...seen].sort(),[...PACKAGE_IDS].sort(),"QA oracle cannot exercise all six packages");

  const seed="immutable-chronicle-seed-603";const characterId="academy_menma";
  const base=q.inspect({seed,characterId});const before=base.promotionRequirementPackageId;
  for(const variation of [
    {seed,characterId},{seed,characterId,scenarioId:"alternate_authorised_scenario_v1"},{seed,characterId,team:["academy_menma"]},{seed,characterId,team:["academy_menma","academy_obito"]}
  ])assert.strictEqual(q.inspect(variation).promotionRequirementPackageId,before,"inspection variation rerolled package");
  const a1=q.commitAttempt({seed,characterId});const a2=q.commitAttempt({seed,characterId,scenarioId:"alternate_authorised_scenario_v1"});
  assert.notStrictEqual(a1.assessmentAttemptId,a2.assessmentAttemptId,"retry must create new attempt id");
  assert.strictEqual(a1.packageId,a2.packageId,"retry rerolled package");
  assert.strictEqual(a1.missionId,MISSION_PREFIX+a1.assessmentAttemptId);assert.strictEqual(a1.occurrenceId,OCC_PREFIX+a1.assessmentAttemptId);assert.strictEqual(a1.rewardSnapshotId,SNAPSHOT_PREFIX+a1.assessmentAttemptId);assert.strictEqual(a1.battleOccurrenceId,BATTLE_PREFIX+a1.assessmentAttemptId);

  const hiddenUnsatisfied={domain:"combat_readiness",revealedToSubject:false,satisfied:false};
  const hiddenSatisfied={domain:"combat_readiness",revealedToSubject:false,satisfied:true};
  assert.strictEqual(stableString(q.projectSlot(hiddenUnsatisfied)),stableString(q.projectSlot(hiddenSatisfied)),"hidden satisfaction leaks through projection");

  const attemptsBefore=q.attempts.length;q.inspect({seed,characterId});assert.strictEqual(q.attempts.length,attemptsBefore,"inspection committed an attempt");

  q.grantReward("promotion_mission_dispatch_intact_150_ryo",150);
  q.grantReward("promotion_mission_courier_safe_100_ryo",100);
  q.grantReward("promotion_mission_full_objective_field_recovery_pill",0,"field_recovery_pill");
  q.grantReward("promotion_hold_line_battle_victory_50_ryo",50);
  const rewardSnapshot=stableString({ryo:q.world.ryo,inventory:q.world.inventory,rewards:[...q.rewards].sort()});
  q.grantReward("promotion_mission_dispatch_intact_150_ryo",150);q.grantReward("promotion_hold_line_battle_victory_50_ryo",50);
  assert.strictEqual(stableString({ryo:q.world.ryo,inventory:q.world.inventory,rewards:[...q.rewards].sort()}),rewardSnapshot,"reward replay was not idempotent");
  assert.strictEqual(q.world.ryo,300);assert.strictEqual(q.world.inventory.field_recovery_pill,1);

  a1.status="FAIL";const semanticBefore=stableString({world:q.world,attempts:q.attempts,rewards:[...q.rewards]});q.receipt(a1);q.receipt(a1);assert.strictEqual(stableString({world:q.world,attempts:q.attempts,rewards:[...q.rewards]}),semanticBefore,"Receipt reopen mutated semantic state");
  assert.strictEqual(q.world.arc1NorthRavineOccurrenceCount,1,"QA fixture collision baseline invalid");

  const rosterBaseline=stableString({currentTeam:q.world.currentTeam,ownership:q.world.ownership,assignment:q.world.assignment,deployment:q.world.deployment});
  q.inspect({seed,characterId});q.commitAttempt({seed,characterId});q.receipt(a2);
  assert.strictEqual(stableString({currentTeam:q.world.currentTeam,ownership:q.world.ownership,assignment:q.world.assignment,deployment:q.world.deployment}),rosterBaseline,"promotion fixture mutated unrelated roster/deployment state");

  return{pass:true,packagesExercised:[...seen].sort(),attempts:q.attempts.length,rewardCauseCount:q.rewards.size,browserGoldenClaimed:false};
}

function inspectIntegratedSources(){
  const files={core:readIfExists(CORE_PATH),courier:readIfExists(COURIER_PATH),ui:readIfExists(UI_PATH),uiCss:readIfExists(UI_CSS_PATH)};
  const present=Object.fromEntries(Object.entries(files).map(([k,v])=>[k,typeof v==="string"]));
  const integrationOnly=[];

  if(files.core){
    const s=files.core;
    PACKAGE_IDS.forEach(id=>sourceRequire(s,id,"core package pool"));
    sourceRequire(s,TRANSITION_ID,"core transition");FIXED_SLOTS.forEach(id=>sourceRequire(s,id,"core slot"));
    sourceRequire(s,"promotionRequirementPackageId","core package identity");sourceRequire(s,"assessmentAttemptId","core attempt identity");
    sourceForbid(s,/Math\.random\s*\(/,"core deterministic derivation");
    sourceForbid(s,/Date\.now\s*\(\)[^\n]{0,120}promotionRequirementPackageId/,"core package derivation");
  }else integrationOnly.push("core runtime adversarial execution (#606 not yet present on D branch)");

  if(files.courier){
    const s=files.courier;
    [SCENARIO_ID,BATTLE_CONFIG,BATTLE_ENCOUNTER,BATTLE_OBJECTIVE,MISSION_PREFIX,OCC_PREFIX,SNAPSHOT_PREFIX,BATTLE_PREFIX].forEach(id=>sourceRequire(s,id,"courier contract"));
    ["150","100","50","field_recovery_pill"].forEach(id=>sourceRequire(s,id,"courier reward contract"));
    ARC1_NORTH_RAVINE_TOKENS.forEach(token=>{
      const promotionOccurrenceLiteral=OCC_PREFIX.slice(0,-2);
      assert(!s.includes(promotionOccurrenceLiteral+token),"courier occurrence identity collides with Arc-1 North Ravine token "+token);
    });
  }else integrationOnly.push("Courier/World/Battle adversarial execution (#607 not yet present on D branch)");

  if(files.ui){
    const s=files.ui;
    sourceRequire(s,"arena_promotion.png","Promotion graphical body");sourceRequire(s,"??????","hidden readiness projection");
    sourceForbid(s,/data-[\w-]*(satisfied|domain|package)[\w-]*\s*=\s*["'`]\$?\{?[^\n]*hidden/i,"UI hidden truth DOM leak");
  }else integrationOnly.push("Promotion UI/DOM/accessibility adversarial execution (#608 not yet present on D branch)");

  return{present,integrationOnly};
}

function main(){
  const oracle=runOracleAdversarialSelfTest();
  const integration=inspectIntegratedSources();
  const result={
    pass:true,
    issue:609,
    workCell:603,
    frozenContractOracle:oracle,
    productionModulesPresent:integration.present,
    integrationOnly:integration.integrationOnly.concat([
      "real non-Battle scenario route",
      "optional Hold-Line Battle factual participant subset + exact return envelope",
      "partial-value unsuccessful attempt against real mission state",
      "PASS/FAIL/abort/withdrawal real Receipt projection",
      "valid-PASS-only existing Genin transition",
      "save/reload mid-attempt and mid-Battle on integrated runtime",
      "1366x768 and 1920x1080 installed-browser acceptance"
    ]),
    browserGoldenClaimed:false
  };
  console.log(JSON.stringify(result,null,2));
}

main();
