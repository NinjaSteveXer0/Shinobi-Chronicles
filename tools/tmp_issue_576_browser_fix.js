#!/usr/bin/env node
"use strict";
const fs=require("fs");
function replaceOnce(text,from,to,label){
  const first=text.indexOf(from);if(first<0)throw new Error(label+": old text missing");
  if(text.indexOf(from,first+1)>=0)throw new Error(label+": old text not unique");
  return text.slice(0,first)+to+text.slice(first+from.length);
}

const runtimePath="runtime/alpha-discipline-curriculum-profiles-57600.js";
let runtime=fs.readFileSync(runtimePath,"utf8");
const oldContext=`function attemptContext(host,characterId,disciplineId){
  return host==="exam"
    ?(typeof globalThis.createKonohaExamAttemptContext==="function"?globalThis.createKonohaExamAttemptContext(characterId,disciplineId):null)
    :(typeof globalThis.createKonohaPracticalAttemptContext==="function"?globalThis.createKonohaPracticalAttemptContext(characterId,disciplineId):null);
}`;
const newContext=`function attemptContext(host,characterId,disciplineId,pre=null){
  if(host==="exam")return typeof globalThis.createKonohaExamAttemptContext==="function"?globalThis.createKonohaExamAttemptContext(characterId,disciplineId):null;
  const legacy=typeof globalThis.createKonohaPracticalAttemptContext==="function"?globalThis.createKonohaPracticalAttemptContext(characterId,disciplineId):null;
  if(legacy)return legacy;
  // The pre-#576 Practical context owner only admits its legacy discipline set.
  // #576 independently authorises advanced Nin/Gen/Fūin Practical curricula, so
  // build the same factual attempt context locally after that exact preflight.
  if(!(pre&&pre.allowed===true&&pre.host==="practical"&&ADVANCED_DISCIPLINES.has(disciplineId)&&(pre.tier==="expert"||pre.tier==="master")))return null;
  const row=character(characterId),discipline=typeof globalThis.getShinobiDiscipline==="function"?globalThis.getShinobiDiscipline(disciplineId):null;
  const progress=progression(characterId,disciplineId);
  if(!row||!discipline||!progress)return null;
  return{
    activity:"practical",characterId:row.id,disciplineId:discipline.id,disciplineName:discipline.name,
    disciplineLevel:Number(progress.level)||1,disciplineExp:Number(progress.exp)||0,
    statValue:Number(row.stats&&row.stats[disciplineId])||0,createdAt:Date.now()
  };
}`;
runtime=replaceOnce(runtime,oldContext,newContext,"runtime Practical context fallback");
runtime=replaceOnce(runtime,"  const context=attemptContext(host,characterId,disciplineId);","  const context=attemptContext(host,characterId,disciplineId,pre);","runtime preflight handoff");
fs.writeFileSync(runtimePath,runtime);

const qaPath="tools/qa_issue_576_expert_master_curriculum_profiles.js";
let qa=fs.readFileSync(qaPath,"utf8");
qa=replaceOnce(
  qa,
  '    function createKonohaPracticalAttemptContext(characterId,disciplineId){return{characterId,disciplineId,statValue:getPlayerCharacter(characterId).stats[disciplineId],disciplineLevel:1,disciplineExp:0};}',
  '    function createKonohaPracticalAttemptContext(characterId,disciplineId){if(["nin","gen","fuin"].includes(disciplineId))return null;return{characterId,disciplineId,statValue:getPlayerCharacter(characterId).stats[disciplineId],disciplineLevel:1,disciplineExp:0};}',
  "deterministic legacy Practical eligibility fixture"
);
const uiBlock=`{
  const s=boot({primary:16});
  const data=s.getKonohaCharacterActivityData("practical","academy_menma"),nin=data.disciplines.find(d=>d.id==="nin");
  assert(nin);assert.equal(nin.activityProfileId,"discipline_curriculum_nin_expert_v1");assert.equal(nin.developmentAvailable,true);
}`;
const uiPlus=`${uiBlock}
{
  const s=boot({primary:16});s.__pass=true;
  const advanced=s.executeDisciplineCurriculumAttempt576("practical","academy_menma","gen");
  assert.equal(advanced.completed,true,"advanced Practical must not inherit the legacy discipline-source context rejection");
  assert.equal(advanced.success,true);assert.equal(advanced.developmentExp,2);
  assert.equal(advanced.activityProfileId,"discipline_curriculum_gen_expert_v1");
}`;
qa=replaceOnce(qa,uiBlock,uiPlus,"deterministic advanced Practical regression");
fs.writeFileSync(qaPath,qa);

const workflowPath=".github/workflows/issue-576-expert-master-curriculum.yml";
let workflow=fs.readFileSync(workflowPath,"utf8");
workflow=workflow.replace("      - 'tools/qa_issue_576_practical_context_probe.js'\n","");
workflow=workflow.replace("          node --check tools/qa_issue_576_practical_context_probe.js\n","");
workflow=workflow.replace('      - name: Probe live Practical advanced-discipline context\n        run: node tools/qa_issue_576_practical_context_probe.js\n\n',"");
fs.writeFileSync(workflowPath,workflow);

for(const p of ["tools/qa_issue_576_practical_context_probe.js","tools/tmp_issue_576_browser_fix.js",".github/workflows/tmp-issue-576-browser-fix.yml"]){
  if(fs.existsSync(p))fs.rmSync(p);
}
console.log("#576 bounded Practical browser fix applied; temporary probe/writer removed");
