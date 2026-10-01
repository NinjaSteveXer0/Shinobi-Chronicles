#!/usr/bin/env node
"use strict";
const assert=require("assert");
const fs=require("fs");
const path=require("path");
const vm=require("vm");

const ROOT=path.resolve(__dirname,"..");
const runtimePath=path.join(ROOT,"runtime/alpha-phase2-discipline-development-44800.js");
const manifestPath=path.join(ROOT,"runtime/alpha-chronicle-state-manifest-43600.js");
const indexPath=path.join(ROOT,"index.html");
const runtime=fs.readFileSync(runtimePath,"utf8");
const manifest=fs.readFileSync(manifestPath,"utf8");
const index=fs.readFileSync(indexPath,"utf8");

assert(runtime.includes('const CURVE_ID="discipline_stat_curve_v1"'));
assert(runtime.includes('const PROFILE_ID="academy_foundation_discipline_activity_v1"'));
assert(runtime.includes("const DEVELOPMENT_CEILING_STAT=15"));
assert(runtime.includes('Object.freeze(["exam","practical"])'));
assert(runtime.includes("resolution.passed===true?2:1"),"Foundation action-derived +1/+2 law missing");
assert(runtime.includes('reason:"stale_team_assignment"'),"stale-team guard missing");
assert(!runtime.includes("techniquePracticeRouteId"),"Technique Practice writer leaked into #448");
assert(manifest.includes('stateDomainId:"disciplineDevelopment"'),"Chronicle State Manifest did not register disciplineDevelopment");
assert(manifest.includes('const ROOT_SCHEMA_VERSION=2'),"Phase-2 root schema was not extended");
assert(index.indexOf("alpha-phase2-konoha-player-surfaces-43110.js")<index.indexOf("alpha-phase2-discipline-development-44800.js"),"#448 must load after #431 player surface adapter");

const clone=value=>value==null?value:JSON.parse(JSON.stringify(value));
const character={
  id:"academy_test",
  name:"Academy Test",
  stats:{nin:10,tai:7,gen:6,buki:5,fuin:4,kin:3,stamina:8},
  disciplineProgression:{
    nin:{level:4,exp:25,statLevelApplied:4},
    tai:{level:1,exp:0,statLevelApplied:1},
    gen:{level:1,exp:0,statLevelApplied:1},
    buki:{level:1,exp:0,statLevelApplied:1},
    fuin:{level:1,exp:0,statLevelApplied:1},
    kin:{level:1,exp:0,statLevelApplied:1},
    stamina:{level:1,exp:0,statLevelApplied:1}
  },
  weaponSpecializations:{}
};
const playerData={
  characters:{academy_test:{stats:clone(character.stats),permanentPLBonus:0,disciplineProgression:clone(character.disciplineProgression),weaponSpecializations:{}}},
  phase2ChronicleState:{schemaVersion:2,disciplineDevelopment:{
    schemaVersion:1,curveId:"discipline_stat_curve_v1",profileId:"academy_foundation_discipline_activity_v1",
    nextSequence:1,migratedProgressionCharacterIds:{academy_test:{progressionCharacterId:"academy_test",ownedCharacterId:"owned_character_academy_test"}},
    processedReceiptIds:[],developmentReceipts:[],breakthroughReceipts:[],ceilingReceipts:[]
  }},
  activityHistory:[]
};
const activityHistory=playerData.activityHistory;
function exactFormula(stats){
  const values=Object.values(stats).map(Number).sort((a,b)=>b-a);
  const highest=values[0],top3=values.slice(0,3).reduce((a,b)=>a+b,0)/3,all=values.reduce((a,b)=>a+b,0)/7;
  return Math.round((highest*.60)+(top3*.25)+(all*.15));
}
const ctx={
  console:{log(){},warn(){},error(){}},
  globalThis:null,
  structuredClone:clone,
  playerData,
  playerTeam:[character],
  activityHistory,
  cloneProgressionData:clone,
  ensurePhase2ChronicleState43600(){return playerData.phase2ChronicleState;},
  getChronicleCurrentTeam43600(){return{committed:true,assignmentId:"team-1",teamVariantIds:["academy_test","academy_two","academy_three"]};},
  getPlayerCharacter(id){return id==="academy_test"?character:null;},
  getCharacterRegistryId(row){return row&&row.id;},
  getOwnedCharacterRecordByVariantId(id){return id==="academy_test"?{ownedCharacterId:"owned_character_academy_test",variantId:id,progressionCharacterId:"academy_test"}:null;},
  getShinobiDiscipline(id){
    const source={nin:"exam",gen:"exam",fuin:"exam",tai:"practical",buki:"practical",stamina:"practical",kin:"battle"}[id];
    return source?{id,name:id.toUpperCase(),trainingSource:source}:null;
  },
  getCharacterDisciplineProgression(id,disciplineId){return id==="academy_test"?character.disciplineProgression[disciplineId]:null;},
  normalizeDisciplineProgression(value){return clone(value);},
  getDevelopedCharacterStats(row){
    const out=clone(row.stats);out.nin+=(Number(row.disciplineProgression.nin.exp)||0)/50;return out;
  },
  calculateCurrentPL(row){return exactFormula(ctx.getDevelopedCharacterStats(row));},
  getCharacterPLProgress(row){
    const displayedPL=ctx.calculateCurrentPL(row);
    return{rawPL:displayedPL,displayedPL,nextPL:displayedPL+1,progressPercent:0};
  },
  syncActivityHistory(){playerData.activityHistory=activityHistory;return true;},
  savePlayerData(){
    playerData.characters.academy_test.stats=clone(character.stats);
    playerData.characters.academy_test.disciplineProgression=clone(character.disciplineProgression);
    playerData.activityHistory=activityHistory;
    return true;
  },
  Date,
  Math,
  JSON,
  Object,
  Array,
  Number,
  String,
  Set
};
ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(runtime,ctx,{filename:"alpha-phase2-discipline-development-44800.js"});

const diagnostics=ctx.runPhase2DisciplineDevelopment44800Diagnostics();
assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));
assert.strictEqual(ctx.getDisciplineStatThreshold44800(1),10);
assert.strictEqual(ctx.getDisciplineStatThreshold44800(10),10);
assert.strictEqual(ctx.getDisciplineStatThreshold44800(11),15);
assert.strictEqual(ctx.getDisciplineStatThreshold44800(21),20);
assert.strictEqual(ctx.getDisciplineStatThreshold44800(100),55);

// #448 PL correction: leftover Development EXP no longer creates a fractional Stat/PL source.
const exactDeveloped=ctx.getDevelopedCharacterStats(character);
assert.strictEqual(exactDeveloped.nin,10,"partial Development EXP leaked into Current Stat");

// Multi-breakthrough sequential curve: Stat 10 + ledger 25 + accepted +2 => 12 with 2 EXP remaining.
const tx=ctx.commitFoundationDisciplineDevelopment44800({
  serviceId:"exam",characterId:"academy_test",disciplineId:"nin",developmentExp:2,
  receiptId:"qa448-multi",expectedTeamAssignmentId:"team-1"
});
assert.strictEqual(tx.success,true,JSON.stringify(tx));
assert.strictEqual(tx.breakthroughCount,2);
assert.strictEqual(character.stats.nin,12);
assert.strictEqual(character.disciplineProgression.nin.exp,2);
assert.strictEqual(playerData.characters.academy_test.stats.nin,12);
assert.strictEqual(playerData.phase2ChronicleState.disciplineDevelopment.breakthroughReceipts.length,2);

// Receipt replay is idempotent.
const beforeReplay=JSON.stringify({stats:character.stats,progress:character.disciplineProgression,state:playerData.phase2ChronicleState.disciplineDevelopment});
const replay=ctx.commitFoundationDisciplineDevelopment44800({
  serviceId:"exam",characterId:"academy_test",disciplineId:"nin",developmentExp:2,
  receiptId:"qa448-multi",expectedTeamAssignmentId:"team-1"
});
assert.strictEqual(replay.success,true);
assert.strictEqual(replay.idempotent,true);
assert.strictEqual(JSON.stringify({stats:character.stats,progress:character.disciplineProgression,state:playerData.phase2ChronicleState.disciplineDevelopment}),beforeReplay);

// Stale assignment fails closed before mutation.
const staleBefore=JSON.stringify({stat:character.stats.nin,exp:character.disciplineProgression.nin.exp});
const stale=ctx.commitFoundationDisciplineDevelopment44800({
  serviceId:"exam",characterId:"academy_test",disciplineId:"nin",developmentExp:1,
  receiptId:"qa448-stale",expectedTeamAssignmentId:"old-team"
});
assert.strictEqual(stale.success,false);
assert.strictEqual(stale.reason,"stale_team_assignment");
assert.strictEqual(JSON.stringify({stat:character.stats.nin,exp:character.disciplineProgression.nin.exp}),staleBefore);

// Final eligible repetition reaches the source ceiling and preserves overflow.
character.stats.nin=14;
character.disciplineProgression.nin.exp=14;
playerData.characters.academy_test.stats.nin=14;
playerData.characters.academy_test.disciplineProgression.nin.exp=14;
const ceiling=ctx.commitFoundationDisciplineDevelopment44800({
  serviceId:"exam",characterId:"academy_test",disciplineId:"nin",developmentExp:2,
  receiptId:"qa448-ceiling",expectedTeamAssignmentId:"team-1"
});
assert.strictEqual(ceiling.success,true,JSON.stringify(ceiling));
assert.strictEqual(character.stats.nin,15);
assert.strictEqual(character.disciplineProgression.nin.exp,1,"legitimate overflow was clipped at activity ceiling");
assert.strictEqual(ceiling.ceilingReached,true);
assert(playerData.phase2ChronicleState.disciplineDevelopment.ceilingReceipts.some(row=>row.sourceDevelopmentReceiptId==="qa448-ceiling"));
const ceilingReplay=ctx.commitFoundationDisciplineDevelopment44800({
  serviceId:"exam",characterId:"academy_test",disciplineId:"nin",developmentExp:2,
  receiptId:"qa448-ceiling",expectedTeamAssignmentId:"team-1"
});
assert.strictEqual(ceilingReplay.success,true,"ceiling-causing receipt did not replay idempotently");
assert.strictEqual(ceilingReplay.idempotent,true,"ceiling-causing receipt replay was not a no-op");

const blocked=ctx.commitFoundationDisciplineDevelopment44800({
  serviceId:"exam",characterId:"academy_test",disciplineId:"nin",developmentExp:1,
  receiptId:"qa448-after-ceiling",expectedTeamAssignmentId:"team-1"
});
assert.strictEqual(blocked.success,false);
assert.strictEqual(blocked.reason,"development_ceiling_reached");
assert.strictEqual(character.stats.nin,15);
assert.strictEqual(character.disciplineProgression.nin.exp,1);

// Registered subject must remain inside exact committed currentTeam.
const outside=ctx.preflightFoundationDisciplineDevelopment44800("exam","not-team","nin");
assert.strictEqual(outside.allowed,false);

// Persistent Current PL remains a function of exact Current Stats only.
const plWithOverflow=ctx.calculateCurrentPL(character);
character.disciplineProgression.nin.exp=9;
assert.strictEqual(ctx.calculateCurrentPL(character),plWithOverflow,"unspent Development EXP changed Current PL");

console.log(JSON.stringify({
  pass:true,
  issue:448,
  curveId:"discipline_stat_curve_v1",
  profileId:"academy_foundation_discipline_activity_v1",
  registeredActivities:["exam","practical"],
  developmentCeilingStat:15,
  sequentialBreakthrough:true,
  overflowPreserved:true,
  idempotent:true,
  currentTeamGuard:true,
  directPLGrant:false,
  techniquePracticeWriter:false,
  browserGoldenClaimed:false
},null,2));
