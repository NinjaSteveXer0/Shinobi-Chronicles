#!/usr/bin/env node
"use strict";

const fs=require("fs");
const assert=require("assert");
const {evaluateSnapshot,SNAPSHOT_SCHEMA}=require("./workforce_final_integration_aggregator_601.js");

const TARGET="1de444fa9f85bae56c4c854c3bdbb60007dc165f";
const STALE="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const FAMILIES=["targeted_qa","production_conformance","save_compatibility","build_fingerprint","browser_runtime"];

function req(family,name,extra={}){
  return {family,required:true,checks:[{name,...extra}]};
}
function ev(family,checkName,headSha=TARGET,extra={}){
  return {family,checkName,headSha,source:"github_actions",runId:1101,jobId:2201,status:"completed",conclusion:"success",artifactIds:[3301],...extra};
}
function snap(requirements,evidence,extra={}){
  return {schema:SNAPSHOT_SCHEMA,workCell:"#646-hostile",integrationOwnerPr:645,integratedHeadSha:TARGET,requirements,evidence,...extra};
}
function blocks(result){return result.findings.filter(x=>x.severity==="BLOCK").map(x=>x.code);}
function expectPass(name,input){const result=evaluateSnapshot(input);assert.strictEqual(result.pass,true,`${name}: ${JSON.stringify(result)}`);return result;}
function expectBlock(name,input,code){const result=evaluateSnapshot(input);assert.strictEqual(result.pass,false,`${name}: unexpectedly passed`);assert(blocks(result).includes(code),`${name}: expected ${code}, got ${JSON.stringify(result)}`);return result;}
function expectThrow(name,input,re){assert.throws(()=>evaluateSnapshot(input),re,name);}

const tests={};

// Positive exact-head proof.
tests.exactIntegratedHeadSatisfiesDeclaredCheck=()=>expectPass("exact",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa")]));

// Worker/stale proof must never substitute for the integrated candidate.
tests.workerBranchGreenCannotSatisfyFinalIntegration=()=>expectBlock("stale",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa",STALE)]),"REQUIRED_EVIDENCE_STALE_SHA");

// Missing/malformed/incomplete/non-success all fail closed.
tests.missingRequiredEvidenceFailsClosed=()=>expectBlock("missing",snap([req("targeted_qa","qa")],[]),"REQUIRED_EVIDENCE_ABSENT");
tests.malformedRunMetadataFailsClosed=()=>expectBlock("malformed-run",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa",TARGET,{runId:"not-a-run"})]),"REQUIRED_EVIDENCE_MALFORMED");
tests.malformedArtifactMetadataFailsClosed=()=>expectBlock("malformed-artifact",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa",TARGET,{artifactIds:"3301"})]),"REQUIRED_EVIDENCE_MALFORMED");
tests.inProgressEvidenceFailsClosed=()=>expectBlock("in-progress",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa",TARGET,{status:"in_progress",conclusion:""})]),"REQUIRED_EVIDENCE_INCOMPLETE");
tests.queuedEvidenceFailsClosed=()=>expectBlock("queued",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa",TARGET,{status:"queued",conclusion:""})]),"REQUIRED_EVIDENCE_INCOMPLETE");
tests.completedFailureFailsClosed=()=>expectBlock("failure",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa",TARGET,{conclusion:"failure"})]),"REQUIRED_EVIDENCE_NOT_GREEN");
tests.completedCancelledFailsClosed=()=>expectBlock("cancelled",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa",TARGET,{conclusion:"cancelled"})]),"REQUIRED_EVIDENCE_NOT_GREEN");

// Family and check-name identity cannot be substituted.
tests.wrongFamilyCannotSatisfy=()=>expectBlock("wrong-family",snap([req("save_compatibility","save")],[ev("targeted_qa","save")]),"REQUIRED_EVIDENCE_ABSENT");
tests.wrongCheckNameCannotSatisfy=()=>expectBlock("wrong-name",snap([req("targeted_qa","qa")],[ev("targeted_qa","other")]),"REQUIRED_EVIDENCE_ABSENT");

// All five evidence families are distinct and independently satisfiable only by themselves.
tests.allFiveFamiliesDistinctExactHead=()=>{
  const requirements=FAMILIES.map((f,i)=>req(f,`check-${i}`));
  const evidence=FAMILIES.map((f,i)=>ev(f,`check-${i}`));
  const result=expectPass("all-families",snap(requirements,evidence));
  assert.deepStrictEqual(result.requiredFamilies,FAMILIES);
};
tests.productionConformanceCannotMasqueradeAsBuild=()=>expectBlock("conformance-v-build",snap([req("build_fingerprint","build")],[ev("production_conformance","build")]),"REQUIRED_EVIDENCE_ABSENT");
tests.browserCannotMasqueradeAsTargetedQa=()=>expectBlock("browser-v-qa",snap([req("targeted_qa","qa")],[ev("browser_runtime","qa")]),"REQUIRED_EVIDENCE_ABSENT");

// Artifact contract.
tests.requiredArtifactAbsenceFailsClosed=()=>expectBlock("artifact-missing",snap([req("browser_runtime","browser",{requireArtifact:true})],[ev("browser_runtime","browser",TARGET,{artifactIds:[]})]),"REQUIRED_EVIDENCE_ARTIFACT_MISSING");
tests.requiredArtifactPresentPasses=()=>expectPass("artifact-present",snap([req("browser_runtime","browser",{requireArtifact:true})],[ev("browser_runtime","browser")]));

// Explicitly allowed coexistence: stale proof may remain, exact proof owns acceptance.
tests.staleMayCoexistWithoutReplacingExact=()=>{
  const result=expectPass("stale-plus-exact",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa",STALE,{runId:1}),ev("targeted_qa","qa",TARGET,{runId:2})]));
  assert(result.findings.some(x=>x.code==="STALE_EVIDENCE_IGNORED"));
};

// Requirement declaration fail-closed behavior.
tests.duplicateRequirementFamilyFailsClearly=()=>expectBlock("dup-family",snap([req("targeted_qa","one"),req("targeted_qa","two")],[ev("targeted_qa","one"),ev("targeted_qa","two")]),"DUPLICATE_REQUIREMENT_FAMILY");
tests.duplicateCheckDeclarationFailsClearly=()=>expectBlock("dup-check",snap([{family:"targeted_qa",required:true,checks:[{name:"qa"},{name:"qa"}]}],[ev("targeted_qa","qa")]),"MALFORMED_REQUIREMENT");
tests.unknownRequirementFamilyFailsClearly=()=>expectBlock("unknown-family",snap([req("mystery","x")],[]),"MALFORMED_REQUIREMENT");
tests.requiredFamilyWithoutCheckFailsClearly=()=>expectBlock("required-empty",snap([{family:"targeted_qa",required:true,checks:[]}],[]),"MALFORMED_REQUIREMENT");
tests.malformedRequirementShapeFailsClearly=()=>expectBlock("bad-shape",snap(["targeted_qa"],[]),"MALFORMED_REQUIREMENT");
tests.invalidIntegratedShaFailsBeforeAggregation=()=>expectThrow("bad-sha",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa")],{integratedHeadSha:"short"}),/40-character/);

// No gameplay semantics exist in the contract/result: only evidence aggregation authority.
tests.noGameplaySemanticAuthorityInvented=()=>{
  const result=expectPass("semantic-boundary",snap([req("targeted_qa","qa")],[ev("targeted_qa","qa")]));
  const text=JSON.stringify(result);
  for(const forbidden of ["playerState","currentTeam","ryo","battleResult","chronicleState","ownershipCommit","promotionRank"]){
    assert(!text.includes(forbidden),`aggregator result invented gameplay field ${forbidden}`);
  }
};

const results=[];
for(const [name,fn] of Object.entries(tests)){
  try{fn();results.push({name,pass:true});}
  catch(error){results.push({name,pass:false,error:String(error&&error.stack||error)});}
}
const pass=results.every(x=>x.pass);
const summary={pass,issue:646,authorityIssue:601,target:TARGET,implementationPr:645,lane:"J",tests:results.length,results,productionRuntimeTouched:false,widerAdoptionStillSeparate:true,browserGoldenClaimed:false};
console.log(JSON.stringify(summary,null,2));
if(process.env.QA_646_SUMMARY) fs.writeFileSync(process.env.QA_646_SUMMARY,JSON.stringify(summary,null,2)+"\n");
if(!pass) process.exit(1);
