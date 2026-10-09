#!/usr/bin/env node
"use strict";
const assert=require("assert");
const {evaluateSnapshot,SNAPSHOT_SCHEMA}=require("./workforce_final_integration_aggregator_601.js");
const A="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const B="bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

function requirement(family,name,extra={}){return {family,required:true,checks:[{name,...extra}]};}
function evidence(family,checkName,headSha=A,extra={}){return {family,checkName,headSha,source:"github_actions",runId:100,jobId:200,status:"completed",conclusion:"success",artifactIds:[300],...extra};}
function snapshot(overrides={}){
  return {
    schema:SNAPSHOT_SCHEMA,
    workCell:"#test-cell",
    integrationOwnerPr:999,
    integratedHeadSha:A,
    requirements:[
      requirement("targeted_qa","targeted-qa"),
      requirement("production_conformance","production-conformance"),
      {family:"save_compatibility",required:false,checks:[]},
      {family:"build_fingerprint",required:false,checks:[]},
      {family:"browser_runtime",required:false,checks:[]}
    ],
    evidence:[
      evidence("targeted_qa","targeted-qa"),
      evidence("production_conformance","production-conformance")
    ],
    ...overrides
  };
}
function codes(result){return result.findings.filter(x=>x.severity==="BLOCK").map(x=>x.code);}
function mustBlock(name,input,code){const result=evaluateSnapshot(input);assert.strictEqual(result.pass,false,name);assert(codes(result).includes(code),`${name}: missing ${code}: ${JSON.stringify(result)}`);return result;}

const checks={};
checks.exactIntegratedHeadPasses=()=>assert.strictEqual(evaluateSnapshot(snapshot()).pass,true);
checks.missingRequiredEvidenceFails=()=>mustBlock("missing",snapshot({evidence:[evidence("targeted_qa","targeted-qa")]}),"REQUIRED_EVIDENCE_ABSENT");
checks.staleWorkerBranchGreenFails=()=>mustBlock("stale",snapshot({evidence:[evidence("targeted_qa","targeted-qa",B),evidence("production_conformance","production-conformance")]}),"REQUIRED_EVIDENCE_STALE_SHA");
checks.malformedEvidenceFails=()=>mustBlock("malformed",snapshot({evidence:[evidence("targeted_qa","targeted-qa",A,{runId:"oops"}),evidence("production_conformance","production-conformance")]}),"REQUIRED_EVIDENCE_MALFORMED");
checks.incompleteEvidenceFails=()=>mustBlock("incomplete",snapshot({evidence:[evidence("targeted_qa","targeted-qa",A,{status:"in_progress",conclusion:""}),evidence("production_conformance","production-conformance")]}),"REQUIRED_EVIDENCE_INCOMPLETE");
checks.redEvidenceFails=()=>mustBlock("red",snapshot({evidence:[evidence("targeted_qa","targeted-qa",A,{conclusion:"failure"}),evidence("production_conformance","production-conformance")]}),"REQUIRED_EVIDENCE_NOT_GREEN");
checks.artifactRequirementFailsClosed=()=>mustBlock("artifact",snapshot({requirements:[requirement("browser_runtime","browser-proof",{requireArtifact:true})],evidence:[evidence("browser_runtime","browser-proof",A,{artifactIds:[]})]}),"REQUIRED_EVIDENCE_ARTIFACT_MISSING");
checks.optionalFamiliesMayBeAbsent=()=>assert.strictEqual(evaluateSnapshot(snapshot()).pass,true);
checks.requiredSaveFamilyIsDistinct=()=>mustBlock("save family",snapshot({requirements:[requirement("save_compatibility","save-load")],evidence:[evidence("targeted_qa","save-load")]}),"REQUIRED_EVIDENCE_ABSENT");
checks.requiredBuildFingerprintFamilyIsDistinct=()=>mustBlock("build family",snapshot({requirements:[requirement("build_fingerprint","fingerprint")],evidence:[evidence("production_conformance","fingerprint")]}),"REQUIRED_EVIDENCE_ABSENT");
checks.browserRuntimeFamilyIsDistinct=()=>mustBlock("browser family",snapshot({requirements:[requirement("browser_runtime","browser")],evidence:[evidence("targeted_qa","browser")]}),"REQUIRED_EVIDENCE_ABSENT");
checks.mixedStaleAndExactUsesExact=()=>{const result=evaluateSnapshot(snapshot({evidence:[evidence("targeted_qa","targeted-qa",B,{runId:1}),evidence("targeted_qa","targeted-qa",A,{runId:2}),evidence("production_conformance","production-conformance")]}));assert.strictEqual(result.pass,true);assert(result.findings.some(x=>x.code==="STALE_EVIDENCE_IGNORED"));};
checks.wrongCheckNameDoesNotSatisfy=()=>mustBlock("wrong check",snapshot({evidence:[evidence("targeted_qa","different-name"),evidence("production_conformance","production-conformance")]}),"REQUIRED_EVIDENCE_ABSENT");
checks.oneFamilyOnAnotherShaBlocksWholeCandidate=()=>mustBlock("one stale family",snapshot({evidence:[evidence("targeted_qa","targeted-qa"),evidence("production_conformance","production-conformance",B)]}),"REQUIRED_EVIDENCE_STALE_SHA");
checks.duplicateRequirementFamilyFails=()=>mustBlock("duplicate family",snapshot({requirements:[requirement("targeted_qa","a"),requirement("targeted_qa","b")],evidence:[evidence("targeted_qa","a"),evidence("targeted_qa","b")]}),"DUPLICATE_REQUIREMENT_FAMILY");
checks.unknownRequirementFamilyFails=()=>mustBlock("unknown family",snapshot({requirements:[requirement("mystery","x")],evidence:[]}),"MALFORMED_REQUIREMENT");
checks.invalidIntegratedShaThrows=()=>assert.throws(()=>evaluateSnapshot(snapshot({integratedHeadSha:"short"})),/40-character/);
checks.requiredFamilyMustDeclareCheck=()=>mustBlock("required no checks",snapshot({requirements:[{family:"targeted_qa",required:true,checks:[]}],evidence:[]}),"MALFORMED_REQUIREMENT");

const results=[];
for(const [name,fn] of Object.entries(checks)){
  try{fn();results.push({name,pass:true});}
  catch(error){results.push({name,pass:false,error:error.message});}
}
const pass=results.every(x=>x.pass);
console.log(JSON.stringify({pass,issue:601,slice:"S0.5-final-integration-aggregator",tests:results.length,results,productionRuntimeTouched:false,browserGoldenClaimed:false},null,2));
if(!pass) process.exit(1);
