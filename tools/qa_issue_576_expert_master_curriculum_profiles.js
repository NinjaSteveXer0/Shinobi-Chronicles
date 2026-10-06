#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const SRC448=fs.readFileSync(path.join(ROOT,"runtime/alpha-discipline-stat-growth-44800.js"),"utf8");
const SRC576=fs.readFileSync(path.join(ROOT,"runtime/alpha-discipline-curriculum-profiles-57600.js"),"utf8");
const DISC=["nin","tai","gen","buki","fuin","kin","stamina"];
const EXACT_IDS=[
  "discipline_curriculum_nin_expert_v1","discipline_curriculum_gen_expert_v1","discipline_curriculum_fuin_expert_v1",
  "discipline_curriculum_nin_master_v1","discipline_curriculum_gen_master_v1","discipline_curriculum_fuin_master_v1"
];

for(const id of EXACT_IDS)assert(SRC576.includes(id),"missing exact curriculum profile: "+id);
assert(!SRC576.includes("currentCurriculumLevel"),"#576 must not persist a semantic currentCurriculumLevel");
assert(!SRC576.includes("Technique Practice")&&!SRC576.includes("techniquePracticeRouteId"),"#576 must not activate Technique Practice");
assert(!SRC576.includes("playerData.ryo")&&!SRC576.includes("playerData.energy"),"#576 must not invent curriculum Ryō/Energy spend");
assert(!SRC576.includes("performDisciplineTraining="),"#576 must not create a generic Training Grounds Discipline writer");

function formula(stats){
  const vals=DISC.map(id=>Number(stats[id])||0).sort((a,b)=>b-a);
  const highest=vals[0]||0,top3=(vals[0]+vals[1]+vals[2])/3,all=vals.reduce((a,b)=>a+b,0)/7;
  return 0.60*highest+0.25*top3+0.15*all;
}
function stats(primary=14){return{nin:primary,tai:9,gen:primary,buki:7,fuin:primary,kin:5,stamina:10};}
function progression(exp=0){return Object.fromEntries(DISC.map(id=>[id,{level:1,exp:["nin","gen","fuin"].includes(id)?exp:0,statLevelApplied:1}]));}
function boot({primary=14,exp=0,kakashiNin=16}={}){
  const ctx=vm.createContext({console:{log(){},warn(){},error(){}},Date,Math,JSON,Object,Array,Number,String,Set,Map,Infinity,RegExp});
  ctx.__pass=true;ctx.__saves=0;ctx.__energy=7;ctx.__team={committed:true,assignmentId:"team-576-a",originVariantId:"academy_menma",teamVariantIds:["academy_menma","academy_hinata","academy_kakashi"]};
  ctx.playerTeam=[
    {id:"academy_menma",registryId:"academy_menma",name:"Menma",baseStats:stats(5),stats:stats(primary),disciplineProgression:progression(exp),weaponSpecializations:{},permanentPLBonus:0},
    {id:"academy_hinata",registryId:"academy_hinata",name:"Hinata",baseStats:stats(5),stats:stats(9),disciplineProgression:progression(0),weaponSpecializations:{},permanentPLBonus:0},
    {id:"academy_kakashi",registryId:"academy_kakashi",name:"Kakashi",baseStats:stats(5),stats:{...stats(9),nin:kakashiNin},disciplineProgression:progression(0),weaponSpecializations:{},permanentPLBonus:0}
  ];
  ctx.activityHistory=[];
  ctx.playerData={ryo:500,activityHistory:ctx.activityHistory,characters:{}};
  const setup=`
    const DISC_IDS=["nin","tai","gen","buki","fuin","kin","stamina"];
    function clone(v){return JSON.parse(JSON.stringify(v));}
    function getPlayerCharacter(id){return playerTeam.find(c=>c.id===id)||null;}
    function getCharacterRegistryId(x){if(!x)return null;if(typeof x==="object")return x.registryId||x.id||null;const c=getPlayerCharacter(x);return c?c.registryId||c.id:x;}
    function getOwnedCharacterRecordByVariantId(id){return id?{ownedCharacterId:"owned_character_"+id,variantId:id,progressionCharacterId:"progression_"+id,acquisitionRecordIds:[]}:null;}
    function getChronicleCurrentTeam43600(){return __team;}
    function normalizeDisciplineProgression(saved){const src=saved&&typeof saved==="object"?saved:{};const out={};for(const id of DISC_IDS){const r=src[id]||{};out[id]={level:Math.max(1,Number(r.level)||1),exp:Math.max(0,Math.floor(Number(r.exp)||0)),statLevelApplied:Math.max(1,Number(r.statLevelApplied)||1),...(r.curveId?{curveId:r.curveId}:{})};}return out;}
    function getCharacterDisciplineProgression(characterId,disciplineId){const c=getPlayerCharacter(characterId);if(!c)return null;c.disciplineProgression=normalizeDisciplineProgression(c.disciplineProgression);return c.disciplineProgression[disciplineId]||null;}
    function getShinobiDiscipline(id){if(!DISC_IDS.includes(id))return null;return{id,name:id==="fuin"?"Fūinjutsu":id.toUpperCase(),trainingSource:["nin","gen","fuin"].includes(id)?"exam":["tai","buki","stamina"].includes(id)?"practical":"battle"};}
    function calculateRawPLFromStats(s){const vals=DISC_IDS.map(id=>Number(s[id])||0).sort((a,b)=>b-a);const highest=vals[0]||0,top3=(vals[0]+vals[1]+vals[2])/3,all=vals.reduce((a,b)=>a+b,0)/7;return .60*highest+.25*top3+.15*all;}
    function getDevelopedCharacterStats(c){return{...c.stats};}
    function calculateCurrentPL(c){return Math.round(calculateRawPLFromStats(getDevelopedCharacterStats(c)));}
    function getCharacterPLProgress(c){const rawPL=calculateRawPLFromStats(getDevelopedCharacterStats(c)),displayedPL=Math.round(rawPL);return{rawPL,displayedPL,nextPL:displayedPL+1,progressPercent:50};}
    function getDisciplineExpRequired(){return 50;}
    function applyPendingDisciplineStatGrowth(){return{statPointsGained:0};}
    function processDisciplineLevelUps(){return null;}
    function addDisciplineExp(){return false;}
    function getTrainingActionData(characterId,disciplineId){const c=getPlayerCharacter(characterId),p=getCharacterDisciplineProgression(characterId,disciplineId),d=getShinobiDiscipline(disciplineId);return c&&p&&d?{characterId:c.id,characterName:c.name,disciplineId,disciplineName:d.name,trainingSource:d.trainingSource,naturalStat:c.stats[disciplineId],trainingLevel:p.level,exp:p.exp,expToNext:50,statLevelApplied:p.statLevelApplied}:null;}
    function baseRow(characterId,id){const c=getPlayerCharacter(characterId),p=getCharacterDisciplineProgression(characterId,id),d=getShinobiDiscipline(id);return{id,name:d.name,characterId,currentStat:c.stats[id],exp:p.exp,expRequired:50,progressPercent:0,developmentAvailable:true};}
    function getKonohaCharacterActivityData(activityId,characterId){if(activityId==="exam")return{id:"exam",characterId,disciplines:["nin","gen","fuin"].map(id=>baseRow(characterId,id))};if(activityId==="practical")return{id:"practical",characterId,disciplines:["tai","buki","stamina"].map(id=>baseRow(characterId,id))};return null;}
    function getKonohaDisciplineUIPanelData(d){return d?{...d,exp:d.exp||0,expRequired:d.expRequired||50,currentStat:d.currentStat||0}:null;}
    function renderAlphaActivityDisciplineRows(data,selectedId,serviceId){return(data&&data.disciplines||[]).map(d=>'<button data-discipline-id="'+d.id+'"><span>'+d.name+'</span><span>CURRENT STAT <strong>'+d.currentStat+'</strong></span><span>DEVELOPMENT <b>'+d.exp+' / '+d.expRequired+'</b></span></button>').join('');}
    function getKonohaExamUIScreenData(){const characterId="academy_menma";return{...getKonohaCharacterActivityData("exam",characterId),canExecute:true};}
    function getKonohaPracticalUIScreenData(){const characterId="academy_menma";return{...getKonohaCharacterActivityData("practical",characterId),canExecute:true};}
    function performDisciplineTraining(){return{success:false,reason:"training-ground-stub"};}
    function createKonohaExamAttemptContext(characterId,disciplineId){return{characterId,disciplineId,statValue:getPlayerCharacter(characterId).stats[disciplineId],disciplineLevel:1,disciplineExp:0};}
    function createKonohaPracticalAttemptContext(characterId,disciplineId){return{characterId,disciplineId,statValue:getPlayerCharacter(characterId).stats[disciplineId],disciplineLevel:1,disciplineExp:0};}
    function resolveKonohaExamAttempt(){return{passed:__pass===true,outcome:__pass===true?"pass":"fail",difficulty:10,score:__pass===true?12:8,history:{}};}
    function resolveKonohaPracticalAttempt(){return{passed:__pass===true,outcome:__pass===true?"pass":"fail",difficulty:10,score:__pass===true?12:8,history:{}};}
    function executeKonohaExamAttempt(){return{success:false,completed:false,reason:"legacy-exam"};}
    function executeKonohaPracticalAttempt(){return{success:false,completed:false,reason:"legacy-practical"};}
    function executeKonohaExamBatch(){return[];}
    function executeKonohaPracticalTraining(){return{success:false,reason:"legacy-practical-batch"};}
    function buildKonohaExamBatchResultNotification(){return null;}
    function buildKonohaPracticalBatchResultNotification(){return null;}
    function buildKonohaPracticalSpecialNotifications(){return[];}
    function getActivityData(id){if(id==="exam")return{id,rewards:[{type:"discipline",id:"nin",amount:15},{type:"discipline",id:"gen",amount:15},{type:"discipline",id:"fuin",amount:15}]};if(id==="practical")return{id,rewards:[{type:"discipline",id:"tai",amount:15},{type:"discipline",id:"buki",amount:10},{type:"discipline",id:"stamina",amount:15}]};return null;}
    function renderMyClanInspectionContent(){return"";}
    function syncRuntimeProgressionToPlayerData(){if(!playerData.characters)playerData.characters={};for(const c of playerTeam){playerData.characters["progression_"+c.id]={stats:{...c.stats},disciplineProgression:normalizeDisciplineProgression(c.disciplineProgression),weaponSpecializations:clone(c.weaponSpecializations||{}),permanentPLBonus:0};}}
    function savePlayerData(){__saves++;syncRuntimeProgressionToPlayerData();playerData.activityHistory=activityHistory;return true;}
    function getKonohaExamSelectedDisciplineId(){return"nin";}
    function getKonohaPracticalSelectedDisciplineId(){return"nin";}
    function getKonohaPracticalBatchSize(){return 10;}
    function getKonohaActivityUISessionState(){return{characterId:"academy_menma"};}
    function getKonohaPracticalAttemptState(){return{lastBatch:[],lastBatchMeta:null,resultVisible:false};}
    function clearKonohaPracticalResultPresentation(){}
    function recordKonohaExamSpecialNotifications(){}
    function recordKonohaPracticalSpecialNotifications(){}
    function renderKonohaPracticalVisualScreen(){}
    const KONOHA_EXAM_ATTEMPT_STATE={lastBatch:[],lastBatchMeta:null};
  `;
  vm.runInContext(setup,ctx,{filename:"qa576-setup.js"});
  vm.runInContext(SRC448,ctx,{filename:"alpha-discipline-stat-growth-44800.js"});
  ctx.__performAfter448=ctx.performDisciplineTraining;
  vm.runInContext(SRC576,ctx,{filename:"alpha-discipline-curriculum-profiles-57600.js"});
  return ctx;
}
function setStat(ctx,characterId,disciplineId,value,exp=0){
  const c=ctx.getPlayerCharacter(characterId);c.stats[disciplineId]=value;ctx.getCharacterDisciplineProgression(characterId,disciplineId).exp=exp;
}
function ids(ctx,type="discipline_development"){return ctx.activityHistory.filter(r=>r&&r.type===type).map(r=>r.activityProfileId).filter(Boolean);}

// Registry + exact six profiles.
{
  const s=boot();
  const profiles=JSON.parse(JSON.stringify(s.getDisciplineCurriculumProfiles576()));
  assert.deepStrictEqual(profiles.map(p=>p.id),EXACT_IDS);
  assert.equal(s.runDisciplineCurriculumProfiles576Diagnostics().pass,true);
  assert.strictEqual(s.performDisciplineTraining,s.__performAfter448,"#576 replaced the generic Training Grounds writer");
}

// Exact 14/15/16, 29/30/31, 49/50/51 boundaries.
{
  const s=boot();
  for(const disciplineId of ["nin","gen","fuin"]){
    for(const [stat,tier,allowed] of [[14,"foundation",true],[15,"expert",true],[16,"expert",true],[29,"expert",true],[30,"master",true],[31,"master",true],[49,"master",true],[50,"exhausted",false],[51,"exhausted",false]]){
      setStat(s,"academy_menma",disciplineId,stat,0);
      const r=s.resolveDisciplineCurriculumProfile576("academy_menma",disciplineId,"exam");
      assert.equal(r.tier,tier,disciplineId+" stat "+stat+" tier mismatch");
      assert.equal(r.allowed,allowed,disciplineId+" stat "+stat+" availability mismatch");
    }
  }
}

// Academy Kakashi starts above 15 and enters Expert Nin immediately, without fake Foundation history or Rank/Promotion.
{
  const s=boot({kakashiNin:16});
  const r=s.resolveDisciplineCurriculumProfile576("academy_kakashi","nin","exam");
  assert.equal(r.allowed,true);assert.equal(r.activityProfileId,"discipline_curriculum_nin_expert_v1");
  assert.equal(s.activityHistory.length,0,"Kakashi Expert entry fabricated lower curriculum history");
}

// Practical is an authorised higher-curriculum host even though the old Foundation lane omitted Nin/Gen/Fūin.
{
  const s=boot({primary:16});
  const data=s.getKonohaCharacterActivityData("practical","academy_menma");
  const nin=data.disciplines.find(d=>d.id==="nin");
  assert(nin,"Expert Ninjutsu was not registered onto Practical");
  assert.equal(nin.activityProfileId,"discipline_curriculum_nin_expert_v1");
  assert.equal(nin.developmentAvailable,true);
}

// Direct non-curriculum development can enter current curriculum from Current Stat alone.
{
  const s=boot({primary:14});
  setStat(s,"academy_menma","nin",30,0);
  const r=s.resolveDisciplineCurriculumProfile576("academy_menma","nin","exam");
  assert.equal(r.activityProfileId,"discipline_curriculum_nin_master_v1");
  assert.equal(s.activityHistory.length,0,"Master entry incorrectly required lower curriculum receipts");
}

// +1 material failure, +2 effective execution, no generic +3.
{
  const s=boot({primary:16});
  s.__pass=false;
  const fail=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin");
  assert.equal(fail.completed,true);assert.equal(fail.developmentExp,1);assert.equal(fail.activityProfileId,"discipline_curriculum_nin_expert_v1");
  s.__pass=true;
  const pass=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin");
  assert.equal(pass.completed,true);assert.equal(pass.developmentExp,2);
  assert(s.activityHistory.filter(r=>r.type==="discipline_development"&&r.activityProfileId==="discipline_curriculum_nin_expert_v1").every(r=>Number(r.grantedExp)<=2),"generic Expert source emitted +3");
}

// Foundation -> Expert -> Master keeps one shared ledger while provenance changes source IDs.
{
  const s=boot({primary:14,exp:14});s.__pass=true;
  const f=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin");
  assert.equal(f.completed,true);assert.equal(s.getPlayerCharacter("academy_menma").stats.nin,15);
  const e=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin");
  assert.equal(e.activityProfileId,"discipline_curriculum_nin_expert_v1");
  setStat(s,"academy_menma","nin",30,0);
  const m=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin");
  assert.equal(m.activityProfileId,"discipline_curriculum_nin_master_v1");
  const provenance=ids(s);
  assert(provenance.includes("academy_foundation_discipline_activity_v1"));
  assert(provenance.includes("discipline_curriculum_nin_expert_v1"));
  assert(provenance.includes("discipline_curriculum_nin_master_v1"));
  assert.strictEqual(s.getCharacterDisciplineProgression("academy_menma","nin"),s.getPlayerCharacter("academy_menma").disciplineProgression.nin,"#576 created a second development ledger");
}

// x10 Foundation stops at 15; x10 Expert stops at 30; x10 Master stops at 50. No silent source switch.
{
  const s=boot({primary:14,exp:14});s.__pass=true;
  const b=s.executeDisciplineCurriculumBatch576("exam","academy_menma","nin",10);
  assert.equal(b.completedAttempts,1);assert.equal(b.stoppedAtSourceCeiling,true);assert.equal(s.getPlayerCharacter("academy_menma").stats.nin,15);
  assert(!ids(s).includes("discipline_curriculum_nin_expert_v1"),"Foundation x10 silently switched remaining repetitions to Expert");
}
{
  const s=boot({primary:29,exp:19});s.__pass=true;
  const b=s.executeDisciplineCurriculumBatch576("exam","academy_menma","nin",10);
  assert.equal(b.completedAttempts,1);assert.equal(b.stoppedAtSourceCeiling,true);assert.equal(s.getPlayerCharacter("academy_menma").stats.nin,30);
  const dev=s.activityHistory.filter(r=>r.type==="discipline_development");assert(dev.every(r=>r.activityProfileId==="discipline_curriculum_nin_expert_v1"));
}
{
  const s=boot({primary:49,exp:29});s.__pass=true;
  const b=s.executeDisciplineCurriculumBatch576("exam","academy_menma","nin",10);
  assert.equal(b.completedAttempts,1);assert.equal(b.stoppedAtSourceCeiling,true);assert.equal(s.getPlayerCharacter("academy_menma").stats.nin,50);
  const dev=s.activityHistory.filter(r=>r.type==="discipline_development");assert(dev.every(r=>r.activityProfileId==="discipline_curriculum_nin_master_v1"));
}

// Exhausted primary source spends no resource and does not claim a global cap.
{
  const s=boot({primary:50});const ryo=s.playerData.ryo,energy=s.__energy;
  const b=s.executeDisciplineCurriculumBatch576("exam","academy_menma","nin",10);
  assert.equal(b.completedAttempts,0);assert.equal(s.playerData.ryo,ryo);assert.equal(s.__energy,energy);
  const data=s.getKonohaCharacterActivityData("exam","academy_menma");
  const html=s.renderAlphaActivityDisciplineRows(data,"nin","exams");
  assert(html.includes("MASTER CURRICULUM SOURCE EXHAUSTED"));
  assert(!html.includes("MAX STAT")&&!html.includes("MASTERED DISCIPLINE"));
}

// Exact advanced provenance includes floor/ceiling/source host and persists through the shared save path.
{
  const s=boot({primary:16});s.__pass=true;
  const r=s.executeDisciplineCurriculumAttempt576("practical","academy_menma","fuin");
  assert.equal(r.activityProfileId,"discipline_curriculum_fuin_expert_v1");
  const receipt=s.activityHistory.find(x=>x.type==="discipline_development"&&x.activityProfileId===r.activityProfileId);
  assert(receipt);assert.equal(receipt.developmentFloorStat,15);assert.equal(receipt.developmentCeilingStat,30);assert.equal(receipt.activityId,"practical");assert.equal(receipt.curveId,"discipline_stat_curve_v1");
  assert(s.playerData.activityHistory.some(x=>x.receiptId===receipt.receiptId),"advanced provenance was not persisted by shared save path");
}

// Idempotence: exact occurrence replay does not duplicate EXP or receipts.
{
  const s=boot({primary:16});s.__pass=true;
  const occurrence="qa576-idempotent-expert-nin";
  const a=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin",{sourceOccurrenceId:occurrence});
  const expAfter=s.getCharacterDisciplineProgression("academy_menma","nin").exp,historyAfter=s.activityHistory.length;
  const b=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin",{sourceOccurrenceId:occurrence});
  assert.equal(a.completed,true);assert.equal(b.duplicate,true);assert.equal(s.getCharacterDisciplineProgression("academy_menma","nin").exp,expAfter);assert.equal(s.activityHistory.length,historyAfter);
}

// Save/reload authority remains #448: canonical Stats + same ledger rehydrate; formula PL only.
{
  const s=boot({primary:29,exp:19});s.__pass=true;
  const c=s.getPlayerCharacter("academy_menma");const r=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin");
  assert.equal(r.newStat,30);assert.equal(c.permanentPLBonus,0);assert.equal(s.calculateCurrentPL(c),Math.round(formula(c.stats)));
  const savedExp=s.playerData.characters.progression_academy_menma.disciplineProgression.nin.exp;
  c.stats.nin=1;s.getCharacterDisciplineProgression("academy_menma","nin").exp=999;
  s.rehydrateCanonicalCharacterStats448();
  assert.equal(c.stats.nin,30);assert.equal(s.getCharacterDisciplineProgression("academy_menma","nin").exp,savedExp);
}

// Stale/current-team regression fails closed before a write.
{
  const s=boot({primary:16});const before=s.getCharacterDisciplineProgression("academy_menma","nin").exp;
  s.__team={committed:true,assignmentId:"team-576-b",originVariantId:"academy_hinata",teamVariantIds:["academy_hinata","academy_kakashi"]};
  const denied=s.executeDisciplineCurriculumAttempt576("exam","academy_menma","nin");
  assert.equal(denied.completed,false);assert.equal(denied.reason,"subject_not_in_committed_current_team");assert.equal(s.getCharacterDisciplineProgression("academy_menma","nin").exp,before);
}

console.log("PASS: #576 Expert/Master Nin/Gen/Fūin curriculum profiles are isolated and deterministic");