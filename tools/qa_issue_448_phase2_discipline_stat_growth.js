#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const CORE=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-discipline-development-44800.js"),"utf8");
const GAME=fs.readFileSync(path.join(ROOT,"game.js"),"utf8");
const IDS=["nin","tai","gen","buki","fuin","kin","stamina"];

function stats(value){return Object.fromEntries(IDS.map(id=>[id,value]));}
function progression(exp=0){return Object.fromEntries(IDS.map(id=>[id,{level:1,exp,statLevelApplied:1}]));}
function rawPL(s){
  const values=IDS.map(id=>Number(s[id])||0).sort((a,b)=>b-a);
  const highest=values[0]||0;
  const top3=(values[0]+values[1]+values[2])/3;
  const all=values.reduce((sum,value)=>sum+value,0)/7;
  return 0.60*highest+0.25*top3+0.15*all;
}
function makeCharacter(id,value=10){
  return{id,registryId:id,name:id,baseStats:stats(value),stats:stats(value),disciplineProgression:progression(0),permanentPLBonus:0};
}
function plain(v){return v==null?v:JSON.parse(JSON.stringify(v));}

function boot(seed={}){
  const characters=[
    makeCharacter("academy_menma",seed.runtimeStat||10),
    makeCharacter("academy_hinata",seed.runtimeStat||10),
    makeCharacter("academy_kakashi",seed.runtimeStat||10)
  ];
  const byId=Object.fromEntries(characters.map(row=>[row.id,row]));
  const owned=Object.fromEntries(characters.map(row=>[row.id,{
    ownedCharacterId:"owned_character_"+row.id,
    variantId:row.id,
    progressionCharacterId:row.id,
    acquisitionRecordIds:["qa_owned_"+row.id]
  }]));
  const seeded=seed.playerData?plain(seed.playerData):{
    activityHistory:[],
    characters:Object.fromEntries(characters.map(row=>[row.id,{
      stats:plain(row.stats),
      disciplineProgression:plain(row.disciplineProgression),
      permanentPLBonus:0,
      weaponSpecializations:{}
    }]))
  };
  seeded.activityHistory=Array.isArray(seeded.activityHistory)?seeded.activityHistory:[];
  seeded.characters=seeded.characters&&typeof seeded.characters==="object"?seeded.characters:{};
  // game.js restores canonical Discipline ledgers before #448 loads, while its
  // legacy Stats rebuild is intentionally simulated by keeping runtime stats at
  // runtimeStat until the #448 activation receipt rehydrates saved Current Stats.
  if(seed.playerData){
    for(const character of characters){
      const saved=seeded.characters[character.id];
      if(saved&&saved.disciplineProgression)character.disciplineProgression=plain(saved.disciplineProgression);
    }
  }
  const ctx={
    console:{log(){},warn(){},error(){},info(){},table(){}},
    Math,Object,Array,Number,String,Boolean,Set,Map,Date,JSON,
    playerTeam:characters,
    playerData:seeded,
    activityHistory:seeded.activityHistory,
    _team:{
      assignmentId:"team-448-a",
      committed:true,
      stage:"academy",
      originVariantId:"academy_menma",
      teamVariantIds:["academy_menma","academy_hinata","academy_kakashi"]
    },
    _forcePass:true,
    _saveCount:0,
    cloneProgressionData:plain,
    getActivityHistory(){return ctx.activityHistory;},
    getPlayerCharacter(id){return byId[id]||null;},
    getCharacterRegistryId(value){return typeof value==="object"?(value.registryId||value.id):value;},
    getOwnedCharacterRecordByVariantId(id){return owned[id]||null;},
    createOwnedCharacterIdForVariant(id){return owned[id]?owned[id].ownedCharacterId:null;},
    getCharacterDisciplineProgression(id,disciplineId){
      const character=byId[id];return character&&character.disciplineProgression[disciplineId]||null;
    },
    calculateRawPLFromStats:rawPL,
    getDevelopedCharacterStats(character){
      const out=plain(character.stats);
      for(const id of IDS){
        const p=character.disciplineProgression[id];
        out[id]+=p&&p.exp?Math.min(1,p.exp/50):0;
      }
      return out;
    },
    calculateCurrentRawPL(character){return rawPL(ctx.getDevelopedCharacterStats(character));},
    applyPendingDisciplineStatGrowth(){return{statPointsGained:0};},
    processDisciplineLevelUps(){return{levelsGained:0};},
    addDisciplineExp(){return false;},
    getTrainingActionData(id,disciplineId){
      const ch=byId[id],p=ch&&ch.disciplineProgression[disciplineId];
      return ch&&p?{characterId:id,characterName:ch.name,disciplineId,disciplineName:disciplineId,naturalStat:ch.stats[disciplineId],trainingLevel:p.level,exp:p.exp,expToNext:50,statLevelApplied:p.statLevelApplied}:null;
    },
    getKonohaCharacterActivityData(activityId,id){
      const ch=byId[id];if(!ch)return null;
      return{activityId,activityName:activityId,character:{id,currentPL:Math.round(rawPL(ch.stats))},disciplines:IDS.map(d=>({id:d,name:d,level:1,exp:ch.disciplineProgression[d].exp,expRequired:50,rewardExp:10})),accessible:true};
    },
    getKonohaDisciplineUIPanelData(row){
      return{...row,progressPercent:row.expRequired?row.exp/row.expRequired*100:0};
    },
    getTrainingEligibility(id,disciplineId,source){return{allowed:true,reason:null,character:byId[id],discipline:{id:disciplineId},trainingConfig:{baseExp:10,costs:{energy:0,ryo:0,chakra:0}},source};},
    openKonohaActivityUIScreen(serviceId,id){return{success:true,serviceId,characterId:id};},
    executeKonohaExamAttempt(id,disciplineId){
      if(!ctx._forcePass)return{success:false,completed:true,outcome:"fail",characterId:id,disciplineId,rewardExp:0};
      const ok=ctx.addDisciplineExp(id,disciplineId,10,"exam");
      return{success:ok===true,completed:ok===true,outcome:ok===true?"pass":"failed",characterId:id,disciplineId,rewardExp:ok===true?10:0};
    },
    executeKonohaPracticalAttempt(id,disciplineId){
      if(!ctx._forcePass)return{success:false,completed:true,outcome:"fail",characterId:id,disciplineId,rewardExp:0};
      const ok=ctx.addDisciplineExp(id,disciplineId,10,"practical");
      return{success:ok===true,completed:ok===true,outcome:ok===true?"pass":"failed",characterId:id,disciplineId,rewardExp:ok===true?10:0};
    },
    syncCharacterProgressionFromSave(){return true;},
    getChronicleCurrentTeam43600(){return ctx._team;},
    getActivityData(source){return{rewards:IDS.map(id=>({type:"discipline",id,amount:10}))};},
    getTrainingConfiguration(source){return ctx._configs[source]||null;},
    _configs:{exam:{baseExp:10,costs:{energy:0,ryo:0,chakra:0}},practical:{baseExp:10,costs:{energy:0,ryo:0,chakra:0}}},
    isValidDisciplineTrainingSource(){return true;},
    savePlayerData(){
      ctx._saveCount+=1;
      for(const ch of characters){
        ctx.playerData.characters[ch.id]={
          stats:plain(ch.stats),
          disciplineProgression:plain(ch.disciplineProgression),
          permanentPLBonus:0,
          weaponSpecializations:{}
        };
      }
      ctx.playerData.activityHistory=ctx.activityHistory;
    }
  };
  ctx.globalThis=ctx;ctx.window=ctx;
  vm.createContext(ctx);
  vm.runInContext(CORE,ctx,{filename:"runtime/alpha-phase2-discipline-development-44800.js"});
  return{ctx,characters,byId,owned};
}

assert(GAME.includes("if (\n      !result ||\n      result.completed !==\n        true\n    )"),"existing x5/x10 loops no longer stop on blocked repetition");

{
  const {ctx}=boot();
  const d=plain(ctx.runPhase2DisciplineDevelopment44800Diagnostics());
  assert.strictEqual(d.pass,true,JSON.stringify(d,null,2));
  assert.strictEqual(ctx.getDisciplineStatExpThreshold44800(10),10);
  assert.strictEqual(ctx.getDisciplineStatExpThreshold44800(11),15);
  assert.strictEqual(ctx.getDisciplineStatExpThreshold44800(20),15);
  assert.strictEqual(ctx.getDisciplineStatExpThreshold44800(21),20);
  assert.deepStrictEqual(plain(ctx.getPhase2DisciplineDevelopmentRegisteredActivities44800()),["exam","practical"]);
}

{
  const {ctx,byId}=boot();
  const ch=byId.academy_menma;
  const before=ctx.calculateCurrentRawPL(ch);
  ch.disciplineProgression.nin.exp=9;
  const after=ctx.calculateCurrentRawPL(ch);
  assert.strictEqual(after,before,"partial Discipline EXP changed Current PL before a Stat breakthrough");
}

{
  const {ctx,byId}=boot();
  const ch=byId.academy_menma;
  const teammate=byId.academy_hinata;
  for(const [i,amount] of [1,2,3].entries()){
    const tx=ctx.commitDisciplineDevelopment44800({
      characterId:ch.id,disciplineId:"nin",requestedExp:amount,grantedExp:amount,
      source:"origin_development",sourceOccurrenceId:"qa448_action_"+i,progressionSlotId:"slot_"+i
    });
    assert.strictEqual(tx.success,true);
  }
  assert.strictEqual(ch.disciplineProgression.nin.exp,6,"+1/+2/+3 action values did not feed one shared ledger");
  assert.strictEqual(teammate.disciplineProgression.nin.exp,0,"teammate received passive copied development");
}

{
  const {ctx,byId}=boot();
  const ch=byId.academy_menma;
  ch.stats.nin=10;ch.disciplineProgression.nin.exp=9;
  const tx=ctx.commitDisciplineDevelopment44800({
    characterId:ch.id,disciplineId:"nin",requestedExp:2,grantedExp:2,
    source:"origin_development",sourceOccurrenceId:"qa448_overflow",progressionSlotId:"overflow"
  });
  assert.strictEqual(tx.success,true);
  assert.strictEqual(ch.stats.nin,11);
  assert.strictEqual(ch.disciplineProgression.nin.exp,1,"legitimate overflow was clipped");
  assert.strictEqual(tx.expToNext,15,"next threshold was not recomputed from new Stat");
  assert.strictEqual(tx.breakthroughs.length,1);
  assert.strictEqual(tx.breakthroughs[0].directPLGrant,0);
  assert.strictEqual(tx.currentPLAfter,Math.round(rawPL(ch.stats)),"Current PL was not formula-derived from final Stats");
}

{
  const {ctx,byId}=boot();
  const ch=byId.academy_menma;
  ch.stats.nin=10;ch.disciplineProgression.nin.exp=27;
  const result=ctx.processDisciplineLevelUps(ch.id,"nin");
  assert.strictEqual(ch.stats.nin,12,"sequential multi-breakthrough migration did not advance twice");
  assert.strictEqual(ch.disciplineProgression.nin.exp,2,"multi-breakthrough sequential thresholds consumed wrong EXP");
  assert.strictEqual(result.breakthroughs.length,2);
}

{
  const {ctx,byId}=boot();
  const ch=byId.academy_menma;
  const input={
    characterId:ch.id,disciplineId:"tai",requestedExp:2,grantedExp:2,
    source:"origin_development",sourceOccurrenceId:"qa448_idempotent",progressionSlotId:"same_slot"
  };
  const first=ctx.commitDisciplineDevelopment44800(input);
  const expAfter=ch.disciplineProgression.tai.exp;
  const second=ctx.commitDisciplineDevelopment44800(input);
  assert.strictEqual(first.success,true);
  assert.strictEqual(second.idempotent,true);
  assert.strictEqual(ch.disciplineProgression.tai.exp,expAfter,"duplicate development receipt granted EXP twice");
}

{
  const {ctx,byId}=boot();
  const ch=byId.academy_menma;
  ctx.openKonohaActivityUIScreen("exams",ch.id);
  ch.stats.nin=14;ch.disciplineProgression.nin.exp=14;
  // This is an explicit persisted QA setup. Activated characters correctly
  // rehydrate canonical saved Current Stats before committing a transaction.
  ctx.savePlayerData();
  const first=ctx.executeKonohaExamAttempt(ch.id,"nin");
  assert.strictEqual(first.completed,true);
  assert.strictEqual(ch.stats.nin,15,"final eligible Foundation repetition did not reach ceiling");
  assert.strictEqual(ch.disciplineProgression.nin.exp,1,"final eligible repetition did not preserve overflow");
  const beforeHistory=ctx.activityHistory.length;
  const second=ctx.executeKonohaExamAttempt(ch.id,"nin");
  assert.strictEqual(second.completed,false,"post-ceiling repetition executed despite dead primary development");
  assert.strictEqual(second.reason,"activity_development_ceiling_reached");
  assert.strictEqual(ctx.activityHistory.length,beforeHistory,"blocked post-ceiling attempt wrote history");
  assert(ctx.activityHistory.some(row=>row&&row.type==="activity_development_ceiling_reached"&&row.disciplineId==="nin"),"ceiling milestone missing");
}

{
  const {ctx,byId}=boot();
  const ch=byId.academy_menma;
  ctx.openKonohaActivityUIScreen("practical",ch.id);
  ctx._team={...ctx._team,assignmentId:"team-448-b"};
  const result=ctx.executeKonohaPracticalAttempt(ch.id,"tai");
  assert.strictEqual(result.completed,false,"stale team selection still executed");
  assert.strictEqual(result.reason,"stale_team_assignment");
}

{
  const first=boot();
  const ch=first.byId.academy_menma;
  ch.stats.fuin=10;ch.disciplineProgression.fuin.exp=9;
  const tx=first.ctx.commitDisciplineDevelopment44800({
    characterId:ch.id,disciplineId:"fuin",requestedExp:2,grantedExp:2,
    source:"origin_development",sourceOccurrenceId:"qa448_reload",progressionSlotId:"reload"
  });
  assert.strictEqual(tx.success,true);
  first.ctx.savePlayerData();
  const saved=plain(first.ctx.playerData);
  const receiptCount=saved.activityHistory.filter(row=>row&&row.type==="discipline_stat_breakthrough"&&row.disciplineId==="fuin").length;

  const second=boot({playerData:saved,runtimeStat:10});
  const restored=second.byId.academy_menma;
  assert.strictEqual(restored.stats.fuin,11,"reload reverted canonical Current Stat to legacy Base/level reconstruction");
  assert.strictEqual(restored.disciplineProgression.fuin.exp,1,"reload lost canonical Discipline EXP remainder");
  assert.strictEqual(Math.round(second.ctx.calculateCurrentRawPL(restored)),Math.round(rawPL(restored.stats)),"reload PL drifted from canonical Stats");
  const receiptCountAfter=second.ctx.activityHistory.filter(row=>row&&row.type==="discipline_stat_breakthrough"&&row.disciplineId==="fuin").length;
  assert.strictEqual(receiptCountAfter,receiptCount,"reload duplicated breakthrough receipt");
}

const coreSource=CORE;
assert(!coreSource.includes("techniquePracticeRouteId"),"#448 core activated Technique Practice prematurely");
assert(!coreSource.includes("generic Skill XP"),"#448 core introduced generic Skill XP");
assert(coreSource.includes("directPLGrant:0"),"#448 breakthrough path does not explicitly prohibit direct PL grants");

console.log(JSON.stringify({
  pass:true,
  issue:448,
  curve:"discipline_stat_curve_v1",
  profile:"academy_foundation_discipline_activity_v1",
  registeredActivities:["exam","practical"],
  thresholds:true,
  actionValuesSharedLedger:true,
  partialExpDoesNotChangePL:true,
  overflow:true,
  sequentialMultiBreakthrough:true,
  idempotence:true,
  foundationCeiling15:true,
  blockedPostCeilingNoWrite:true,
  staleTeamFailsClosed:true,
  saveReloadPreservesStatsExpPL:true,
  noTechniquePracticeActivated:true,
  browserGoldenClaimed:false
},null,2));
