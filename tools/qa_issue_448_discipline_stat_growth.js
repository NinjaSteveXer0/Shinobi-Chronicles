#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const SRC=fs.readFileSync(path.join(ROOT,"runtime/alpha-discipline-stat-growth-44800.js"),"utf8");
const DISC=["nin","tai","gen","buki","fuin","kin","stamina"];

function formula(stats){
  const vals=DISC.map(id=>Number(stats[id])||0).sort((a,b)=>b-a);
  const highest=vals[0]||0;
  const top3=(vals[0]+vals[1]+vals[2])/3;
  const all=vals.reduce((a,b)=>a+b,0)/7;
  return 0.60*highest+0.25*top3+0.15*all;
}
function makeStats(primary=10){
  return{nin:primary,tai:8,gen:7,buki:6,fuin:5,kin:4,stamina:9};
}
function makeProgress(exp=0){
  return Object.fromEntries(DISC.map(id=>[id,{level:1,exp:id==="nin"?exp:0,statLevelApplied:1}]));
}
function boot({stat=10,exp=0,team=["academy_menma","academy_hinata","academy_kakashi"],savedStats=null,savedExp=null}={}){
  const stats=savedStats||makeStats(stat);
  const progression=makeProgress(savedExp==null?exp:savedExp);
  const ctx=vm.createContext({console:{log(){},warn(){},error(){}},Date,Math,JSON,Object,Array,Number,String,Set,Map,Infinity});
  ctx.__saves=0;
  ctx.playerTeam=[
    {id:"academy_menma",registryId:"academy_menma",name:"Menma",baseStats:makeStats(5),stats:{...stats},disciplineProgression:JSON.parse(JSON.stringify(progression)),weaponSpecializations:{},permanentPLBonus:0},
    {id:"academy_hinata",registryId:"academy_hinata",name:"Hinata",baseStats:makeStats(5),stats:makeStats(9),disciplineProgression:makeProgress(0),weaponSpecializations:{},permanentPLBonus:0},
    {id:"academy_kakashi",registryId:"academy_kakashi",name:"Kakashi",baseStats:makeStats(5),stats:makeStats(11),disciplineProgression:makeProgress(0),weaponSpecializations:{},permanentPLBonus:0}
  ];
  ctx.activityHistory=[];
  ctx.playerData={
    activityHistory:ctx.activityHistory,
    characters:{
      academy_menma:{stats:{...stats},disciplineProgression:JSON.parse(JSON.stringify(progression)),weaponSpecializations:{},permanentPLBonus:0},
      academy_hinata:{stats:makeStats(9),disciplineProgression:makeProgress(0),weaponSpecializations:{},permanentPLBonus:0},
      academy_kakashi:{stats:makeStats(11),disciplineProgression:makeProgress(0),weaponSpecializations:{},permanentPLBonus:0}
    }
  };
  ctx.__team={committed:true,assignmentId:"team-448-a",originVariantId:"academy_menma",teamVariantIds:[...team]};
  const setup=`
    const DISC_IDS=["nin","tai","gen","buki","fuin","kin","stamina"];
    function clone(v){return JSON.parse(JSON.stringify(v));}
    function getPlayerCharacter(id){return playerTeam.find(c=>c.id===id)||null;}
    function getCharacterRegistryId(x){if(!x)return null;if(typeof x==="object")return x.registryId||x.id||null;const c=getPlayerCharacter(x);return c?c.registryId||c.id:x;}
    function getOwnedCharacterRecordByVariantId(id){return id?{ownedCharacterId:"owned_character_"+id,variantId:id,progressionCharacterId:id,acquisitionRecordIds:[]}:null;}
    function getChronicleCurrentTeam43600(){return __team;}
    function normalizeDisciplineProgression(saved){
      const src=saved&&typeof saved==="object"?saved:{};
      const out={};
      for(const id of DISC_IDS){const r=src[id]||{};out[id]={level:Math.max(1,Number(r.level)||1),exp:Math.max(0,Math.floor(Number(r.exp)||0)),statLevelApplied:Math.max(1,Number(r.statLevelApplied)||1),...(r.curveId?{curveId:r.curveId}:{}),...(r.curveMigrationResolved?{curveMigrationResolved:r.curveMigrationResolved}:{})};}
      return out;
    }
    function getCharacterDisciplineProgression(characterId,disciplineId){const c=getPlayerCharacter(characterId);if(!c)return null;c.disciplineProgression=normalizeDisciplineProgression(c.disciplineProgression);return c.disciplineProgression[disciplineId]||null;}
    function getShinobiDiscipline(id){return DISC_IDS.includes(id)?{id,name:id.toUpperCase(),trainingSource:["nin","gen","fuin"].includes(id)?"exam":["tai","buki","stamina"].includes(id)?"practical":"battle"}:null;}
    function calculateRawPLFromStats(stats){
      const vals=DISC_IDS.map(id=>Number(stats[id])||0).sort((a,b)=>b-a);
      const highest=vals[0]||0,top3=(vals[0]+vals[1]+vals[2])/3,all=vals.reduce((a,b)=>a+b,0)/7;
      return 0.60*highest+0.25*top3+0.15*all;
    }
    function getDevelopedCharacterStats(character){return {...character.stats};}
    function calculateCurrentPL(character){return Math.round(calculateRawPLFromStats(getDevelopedCharacterStats(character)));}
    function getCharacterPLProgress(character){const rawPL=calculateRawPLFromStats(getDevelopedCharacterStats(character));const displayedPL=Math.round(rawPL);return{rawPL,displayedPL,nextPL:displayedPL+1,progressPercent:50};}
    function getDisciplineExpRequired(){return 50;}
    function applyPendingDisciplineStatGrowth(){return{statPointsGained:0};}
    function processDisciplineLevelUps(){return null;}
    function addDisciplineExp(){return false;}
    function getTrainingActionData(characterId,disciplineId){const c=getPlayerCharacter(characterId),p=getCharacterDisciplineProgression(characterId,disciplineId),d=getShinobiDiscipline(disciplineId);return c&&p&&d?{characterId:c.id,characterName:c.name,disciplineId,disciplineName:d.name,trainingSource:d.trainingSource,naturalStat:c.stats[disciplineId],trainingLevel:p.level,exp:p.exp,expToNext:50,statLevelApplied:p.statLevelApplied}:null;}
    function getKonohaCharacterActivityData(){return null;}
    function getKonohaDisciplineUIPanelData(){return null;}
    function performDisciplineTraining(){return{success:false,reason:"stub"};}
    function executeKonohaExamBatch(){return[];}
    function executeKonohaPracticalTraining(){return{success:false};}
    function getKonohaExamUIScreenData(){return null;}
    function getKonohaPracticalUIScreenData(){return null;}
    function renderAlphaActivityDisciplineRows(){return"";}
    function buildKonohaPracticalSpecialNotifications(){return[];}
    function getActivityData(id){
      if(id==="exam")return{id:"exam",rewards:[{type:"discipline",id:"nin",amount:15},{type:"discipline",id:"gen",amount:15},{type:"discipline",id:"fuin",amount:15}]};
      if(id==="practical")return{id:"practical",rewards:[{type:"discipline",id:"tai",amount:15},{type:"discipline",id:"buki",amount:10},{type:"discipline",id:"stamina",amount:15}]};
      return null;
    }
    function savePlayerData(){
      __saves++;
      for(const c of playerTeam){playerData.characters[c.id]={stats:{...c.stats},disciplineProgression:normalizeDisciplineProgression(c.disciplineProgression),weaponSpecializations:clone(c.weaponSpecializations||{}),permanentPLBonus:0};}
      playerData.activityHistory=activityHistory;
      return true;
    }
  `;
  vm.runInContext(setup,ctx,{filename:"qa448-setup.js"});
  vm.runInContext(SRC,ctx,{filename:"alpha-discipline-stat-growth-44800.js"});
  return ctx;
}
function commit(ctx,amount,n,{source="story",causalRootId=null,receiptId=null,teamAssignmentId=null}={}){
  const id=receiptId||"qa448-receipt-"+n;
  return ctx.commitDisciplineDevelopment448("academy_menma","nin",amount,{
    source,sourceOccurrenceId:"qa448-occ-"+n,progressionSlotId:"nin-"+n,
    causalRootId:causalRootId||"qa448-root-"+n,receiptId:id,teamAssignmentId
  });
}

{
  const s=boot();
  assert.equal(s.getDisciplineDevelopmentThreshold448(1),10);
  assert.equal(s.getDisciplineDevelopmentThreshold448(10),10);
  assert.equal(s.getDisciplineDevelopmentThreshold448(11),15);
  assert.equal(s.getDisciplineDevelopmentThreshold448(20),15);
  assert.equal(s.getDisciplineDevelopmentThreshold448(21),20);
}
{
  const s=boot({stat:10,exp:0});
  const c=s.getPlayerCharacter("academy_menma");
  const pl0=s.calculateCurrentPL(c),raw0=s.calculateRawPLFromStats(s.getDevelopedCharacterStats(c));
  const r=commit(s,3,1);
  assert.equal(r.grantedExp,3);assert.equal(c.stats.nin,10);
  assert.equal(s.getDisciplineDevelopmentSnapshot448("academy_menma","nin").developmentExp,3);
  assert.equal(s.calculateCurrentPL(c),pl0,"partial Discipline EXP changed Current PL");
  assert.equal(s.calculateRawPLFromStats(s.getDevelopedCharacterStats(c)),raw0,"partial Discipline EXP changed raw PL");
}
{
  const s=boot({stat:10});
  commit(s,3,1);commit(s,3,2);commit(s,3,3);const r=commit(s,1,4);
  assert.equal(r.statAfter,11);assert.equal(r.expAfter,0);assert.equal(r.statPointsGained,1);
  assert.equal(s.getDisciplineDevelopmentSnapshot448("academy_menma","nin").developmentRequired,15);
  commit(s,3,5);commit(s,3,6);commit(s,3,7);commit(s,3,8);const r2=commit(s,3,9);
  assert.equal(r2.statAfter,12);assert.equal(r2.expAfter,0);
}
{
  const s=boot({stat:10,exp:27});
  const snap=s.getDisciplineDevelopmentSnapshot448("academy_menma","nin");
  assert.equal(snap.currentStat,12);assert.equal(snap.developmentExp,2);assert.equal(snap.developmentRequired,15);
  const breaks=s.activityHistory.filter(r=>r.type==="discipline_stat_breakthrough");
  assert.equal(breaks.length,2);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(breaks.map(r=>[r.priorStat,r.newStat,r.thresholdConsumed]))),[[10,11,10],[11,12,15]]);
}
{
  const s=boot({stat:10});
  const r1=commit(s,3,1,{receiptId:"same-receipt"});
  const expAfter=r1.expAfter,historyAfter=s.activityHistory.length;
  const r2=commit(s,3,1,{receiptId:"same-receipt"});
  assert.equal(r2.duplicate,true);assert.equal(s.getDisciplineDevelopmentSnapshot448("academy_menma","nin").developmentExp,expAfter);
  assert.equal(s.activityHistory.length,historyAfter);
}
{
  const s=boot({stat:10});
  const a=commit(s,3,1,{causalRootId:"same-root"});
  const b=commit(s,3,2,{causalRootId:"same-root"});
  assert.equal(a.grantedExp,3);assert.equal(b.grantedExp,0);assert.equal(b.reason,"causal_cap_reached");
}
// Foundation activities fail closed without one committed Academy team.
{
  const s=boot({stat:10});
  s.__team=null;
  const denied=s.preflightDisciplineDevelopment448("academy_menma","nin","exam");
  assert.equal(denied.allowed,false);assert.equal(denied.reason,"committed_current_team_unavailable");
}
{
  const s=boot({stat:10});
  const ok=s.preflightDisciplineDevelopment448("academy_menma","nin","exam");
  assert.equal(ok.allowed,true);assert.equal(ok.developmentCeilingStat,15);
  s.__team={committed:true,assignmentId:"team-448-b",originVariantId:"academy_hinata",teamVariantIds:["academy_hinata","academy_kakashi","academy_mirai"]};
  const denied=s.preflightDisciplineDevelopment448("academy_menma","nin","exam");
  assert.equal(denied.allowed,false);assert.equal(denied.reason,"subject_not_in_committed_current_team");
  s.__team={committed:true,assignmentId:"team-448-a",originVariantId:"academy_menma",teamVariantIds:["academy_menma","academy_hinata","academy_kakashi"]};
  const stale=s.commitDisciplineDevelopment448("academy_menma","nin",2,{source:"exam",sourceOccurrenceId:"stale",progressionSlotId:"nin",causalRootId:"stale",receiptId:"stale",teamAssignmentId:"different-assignment"});
  assert.equal(stale.success,false);assert.equal(stale.reason,"stale_team_assignment");
}
{
  const stats=makeStats(14);
  const s=boot({savedStats:stats,savedExp:14});
  let snap=s.getDisciplineDevelopmentSnapshot448("academy_menma","nin","exam");
  assert.equal(snap.currentStat,14);assert.equal(snap.developmentExp,14);
  const r=s.commitDisciplineDevelopment448("academy_menma","nin",2,{source:"exam",sourceOccurrenceId:"final-eligible",progressionSlotId:"nin",causalRootId:"final-eligible",receiptId:"final-eligible",teamAssignmentId:"team-448-a"});
  assert.equal(r.statAfter,15);assert.equal(r.expAfter,1,"legitimate overflow was clipped at activity ceiling");
  const blocked=s.preflightDisciplineDevelopment448("academy_menma","nin","exam");
  assert.equal(blocked.allowed,false);assert.equal(blocked.reason,"activity_development_ceiling_reached");
  assert(s.activityHistory.some(row=>row.type==="activity_development_ceiling_reached"));
}
{
  const s=boot({stat:10});
  commit(s,3,1);commit(s,3,2);commit(s,3,3);commit(s,1,4);
  const saved=JSON.parse(JSON.stringify(s.playerData.characters.academy_menma));
  assert.equal(saved.stats.nin,11);assert.equal(saved.disciplineProgression.nin.exp,0);
  s.getPlayerCharacter("academy_menma").stats.nin=999;
  s.rehydrateCanonicalCharacterStats448();
  assert.equal(s.getPlayerCharacter("academy_menma").stats.nin,11);
}
{
  const s=boot({stat:10});
  const c=s.getPlayerCharacter("academy_menma");
  commit(s,3,1);commit(s,3,2);commit(s,3,3);commit(s,1,4);
  assert.equal(c.stats.nin,11);assert.equal(s.playerData.characters.academy_menma.stats.nin,11);
  assert.equal(s.calculateCurrentPL(c),Math.round(formula(c.stats)));
}
// Existing +1 / +2 / +3 action-derived values remain valid and exact.
{
  const s=boot({stat:10});
  const one=commit(s,1,"class-one");
  const two=commit(s,2,"class-two");
  const three=commit(s,3,"class-three");
  assert.equal(one.grantedExp,1);assert.equal(two.grantedExp,2);assert.equal(three.grantedExp,3);
  assert.equal(s.getDisciplineDevelopmentSnapshot448("academy_menma","nin").developmentExp,6);
}
// A persistent teammate develops from their own qualifying action; no passive copy to protagonist.
{
  const s=boot({stat:10});
  const before=s.getDisciplineDevelopmentSnapshot448("academy_menma","nin").developmentExp;
  const r=s.commitDisciplineDevelopment448("academy_hinata","nin",2,{source:"battle",sourceOccurrenceId:"hinata-ai-action",progressionSlotId:"nin",causalRootId:"hinata-ai-action",receiptId:"hinata-ai-action"});
  assert.equal(r.success,true);assert.equal(r.grantedExp,2);
  assert.equal(s.getDisciplineDevelopmentSnapshot448("academy_hinata","nin").developmentExp,2);
  assert.equal(s.getDisciplineDevelopmentSnapshot448("academy_menma","nin").developmentExp,before);
}
// A real Stat breakthrough may legitimately leave rounded Current PL unchanged; no fake direct PL gain.
{
  const s=boot({stat:10});
  const c=s.getPlayerCharacter("academy_menma");
  const gen=s.getCharacterDisciplineProgression(c.id,"gen");gen.exp=8;
  const before=s.calculateCurrentPL(c);
  const r=s.commitDisciplineDevelopment448(c.id,"gen",2,{source:"story",sourceOccurrenceId:"gen-break",progressionSlotId:"gen",causalRootId:"gen-break",receiptId:"gen-break"});
  assert.equal(r.statBefore,7);assert.equal(r.statAfter,8);assert.equal(r.statPointsGained,1);
  assert.equal(r.currentPLBefore,before);assert.equal(r.currentPLAfter,before,"Stat breakthrough fabricated rounded PL gain");
  assert.equal(s.calculateCurrentPL(c),before);
}
// Failed persistence rolls back EXP, Stat, history and in-memory save projection atomically.
{
  const s=boot({stat:10});
  const c=s.getPlayerCharacter("academy_menma");
  const before={stat:c.stats.nin,exp:s.getCharacterDisciplineProgression(c.id,"nin").exp,history:s.activityHistory.length,saved:JSON.parse(JSON.stringify(s.playerData.characters[c.id]))};
  s.savePlayerData=()=>{throw new Error("qa448-forced-save-failure");};
  const r=s.commitDisciplineDevelopment448(c.id,"nin",3,{source:"story",sourceOccurrenceId:"rollback",progressionSlotId:"nin",causalRootId:"rollback",receiptId:"rollback"});
  assert.equal(r.success,false);assert.equal(r.reason,"atomic_persistence_failed");
  assert.equal(c.stats.nin,before.stat);assert.equal(s.getCharacterDisciplineProgression(c.id,"nin").exp,before.exp);
  assert.equal(s.activityHistory.length,before.history);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(s.playerData.characters[c.id])),before.saved);
}
{
  const s=boot();
  const d=s.runPhase2DisciplineStatGrowth448Diagnostics();
  assert.equal(d.pass,true,JSON.stringify(d));
  assert.equal(d.curveId,"discipline_stat_curve_v1");
  assert.equal(d.profileId,"academy_foundation_discipline_activity_v1");
}
console.log(JSON.stringify({
  pass:true,issue:448,curve:"discipline_stat_curve_v1",foundationProfile:"academy_foundation_discipline_activity_v1",
  thresholdSequenceProven:true,overflowProven:true,multiBreakthroughProven:true,noFractionalPLFromPartialExp:true,
  currentTeamAndStaleSelectionGuards:true,causalCap3:true,ceiling15:true,idempotence:true,saveRehydrate:true,
  techniquePracticeActivated:false,browserGoldenClaimed:false
},null,2));
