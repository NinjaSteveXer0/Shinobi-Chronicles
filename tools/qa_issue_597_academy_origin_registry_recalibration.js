#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const GAME=fs.readFileSync(path.join(ROOT,"game.js"),"utf8");
const DEV448=fs.readFileSync(path.join(ROOT,"runtime/alpha-discipline-stat-growth-44800.js"),"utf8");
const STAT_IDS=["nin","tai","buki","fuin","kin","gen","stamina"];

const EXPECTED=Object.freeze({
  academy_hinata:{stats:{nin:8,tai:13,buki:6,fuin:5,kin:5,gen:6,stamina:10},basePL:12},
  academy_izuno:{stats:{nin:10,tai:9,buki:6,fuin:5,kin:6,gen:5,stamina:8},basePL:9},
  academy_mirai:{stats:{nin:9,tai:9,buki:12,fuin:6,kin:6,gen:13,stamina:10},basePL:12},
  academy_menma:{stats:{nin:10,tai:8,buki:6,fuin:5,kin:13,gen:7,stamina:11},basePL:12},
  academy_kushina:{stats:{nin:8,tai:9,buki:5,fuin:8,kin:5,gen:5,stamina:14},basePL:12},
  academy_kurenai:{stats:{nin:9,tai:7,buki:8,fuin:6,kin:5,gen:14,stamina:8},basePL:12},
  academy_iwabee:{stats:{nin:14,tai:11,buki:13,fuin:6,kin:5,gen:5,stamina:14},basePL:13},
  academy_metal_lee:{stats:{nin:6,tai:13,buki:9,fuin:5,kin:5,gen:5,stamina:14},basePL:13},
  academy_kakashi:{stats:{nin:16,tai:14,buki:15,fuin:8,kin:9,gen:10,stamina:14},basePL:15},
  academy_obito:{stats:{nin:11,tai:12,buki:10,fuin:5,kin:5,gen:6,stamina:13},basePL:12}
});

function findMatchingBrace(source,openIndex){
  let depth=0,quote=null,escaped=false,lineComment=false,blockComment=false;
  for(let i=openIndex;i<source.length;i++){
    const c=source[i],n=source[i+1];
    if(lineComment){if(c==="\n")lineComment=false;continue;}
    if(blockComment){if(c==="*"&&n==="/"){blockComment=false;i++;}continue;}
    if(quote){
      if(escaped){escaped=false;continue;}
      if(c==="\\"){escaped=true;continue;}
      if(c===quote)quote=null;
      continue;
    }
    if(c==="/"&&n==="/"){lineComment=true;i++;continue;}
    if(c==="/"&&n==="*"){blockComment=true;i++;continue;}
    if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
    if(c==="{")depth++;
    else if(c==="}"){
      depth--;
      if(depth===0)return i;
    }
  }
  throw new Error("unterminated object literal");
}
function extractRegistry(){
  const marker="const characterRegistry =";
  const markerIndex=GAME.indexOf(marker);
  assert(markerIndex>=0,"characterRegistry declaration missing");
  const open=GAME.indexOf("{",markerIndex+marker.length);
  assert(open>=0,"characterRegistry object opening brace missing");
  const close=findMatchingBrace(GAME,open);
  return vm.runInNewContext("("+GAME.slice(open,close+1)+")",{Object,Array,Number,String,Boolean,Math});
}
function formula(stats){
  const values=STAT_IDS.map(id=>Number(stats[id])||0).sort((a,b)=>b-a);
  const highest=values[0]||0;
  const top3=(values[0]+values[1]+values[2])/3;
  const all=values.reduce((sum,value)=>sum+value,0)/7;
  return Math.round((0.60*highest)+(0.25*top3)+(0.15*all));
}
function functionSource(name,nextMarker){
  const start=GAME.indexOf("function "+name);
  assert(start>=0,name+" missing");
  const end=nextMarker?GAME.indexOf(nextMarker,start):Math.min(GAME.length,start+12000);
  assert(end>start,name+" end marker missing");
  return GAME.slice(start,end);
}

const registry=extractRegistry();
for(const [id,expected] of Object.entries(EXPECTED)){
  const row=registry[id];
  assert(row,"missing Academy-Origin Registry row: "+id);
  assert.deepStrictEqual(
    Object.fromEntries(STAT_IDS.map(stat=>[stat,Number(row.baseStats&&row.baseStats[stat])||0])),
    expected.stats,
    id+" Base Stats drift from #582 durable matrix"
  );
  assert.equal(Number(row.basePL),expected.basePL,id+" supplied Base PL drift");
  assert.equal(formula(row.baseStats),expected.basePL,id+" Base PL is not Formula v1.0-derived");
}

assert.equal(registry.academy_hinata.basePL,12,"Hinata must be Base PL12");
assert.equal(registry.academy_mirai.basePL,12,"Mirai must be Base PL12");
assert.equal(registry.academy_menma.basePL,12,"Menma must be Base PL12");
assert.equal(registry.academy_kushina.basePL,12,"Kushina Formula-correct PL12 label regressed");
assert.equal(registry.academy_kurenai.basePL,12,"Kurenai Formula-correct PL12 label regressed");

const factory=functionSource("createRuntimeCharacterFromRegistry","\nlet playerTeam =");
assert(factory.includes("cloneCanonicalSevenStats(registry.baseStats)"),"runtime materialization no longer consumes Registry Base Stats");
assert(factory.includes("basePL: registry.basePL"),"runtime materialization no longer consumes Registry Base PL");
assert(factory.includes("stats: cloneCanonicalSevenStats(baseStats)"),"fresh Current Stats no longer start from canonical Base Stats");
assert(factory.includes("permanentPLBonus: 0"),"fresh runtime materialization introduced a hidden/direct PL bonus");

const pilotDiagnostic=functionSource("runAcademyPilotDeploymentDiagnostics","//=========================================================\n// BRICK 300");
for(const [id,expected] of Object.entries({academy_hinata:12,academy_izuno:9,academy_mirai:12,academy_menma:12,academy_kushina:12})){
  const pattern=new RegExp(id+"\\s*:\\s*"+expected+"(?:\\s|,)");
  assert(pattern.test(pilotDiagnostic),"Academy pilot PL diagnostic retains stale expectation for "+id);
}

const restore=functionSource("syncCharacterProgressionFromSave","// =========================================================\n// COPY RUNTIME CHARACTER PROGRESSION TO SAVE");
assert(restore.includes("normalizeDisciplineProgression"),"save restore no longer preserves Discipline progression");
assert(restore.includes("character.baseStats"),"save restore does not rebuild from canonical Base Stats");
assert(restore.includes("statLevelApplied"),"save restore no longer preserves already-earned development level provenance");
assert(restore.includes("character.permanentPLBonus")&&restore.includes("0;"),"legacy direct PL bonus retirement regressed");

assert(DEV448.includes("function restoreCanonicalStats448"),"#448 canonical Current-Stat rehydration owner missing");
assert(DEV448.includes("saved.stats")&&DEV448.includes("character.stats[id]=value"),"#448 no longer restores persisted canonical Current Stats");
assert(DEV448.includes("disciplineProgression")&&DEV448.includes("normalizeDisciplineProgression"),"#448 no longer preserves shared Discipline Development ledger on reload");
assert(!GAME.includes("academy_hinata:\n      8,\n\n    academy_izuno") || pilotDiagnostic.includes("academy_hinata:\n      12"),"stale Hinata PL8 diagnostic survived");

console.log("Issue #597 Academy-Origin Registry recalibration deterministic QA: PASS");
console.log(JSON.stringify({
  academyOrigins:Object.keys(EXPECTED).length,
  changedRows:["academy_hinata","academy_mirai","academy_menma"],
  basePLs:Object.fromEntries(Object.entries(EXPECTED).map(([id,row])=>[id,row.basePL])),
  sharedDevelopmentOwner:"runtime/alpha-discipline-stat-growth-44800.js",
  browserGoldenClaimed:false
},null,2));
