#!/usr/bin/env node
"use strict";
const fs=require("fs");

const SNAPSHOT_SCHEMA="sc.workforce-final-integration-evidence.601.v1";
const FAMILIES=new Set([
  "targeted_qa",
  "production_conformance",
  "save_compatibility",
  "build_fingerprint",
  "browser_runtime"
]);
const SHA_RE=/^[0-9a-f]{40}$/i;

function parseArgs(argv){
  const out={};
  for(let i=0;i<argv.length;i++){
    const token=argv[i];
    if(!token.startsWith("--")) continue;
    const key=token.slice(2), next=argv[i+1];
    if(!next||next.startsWith("--")) out[key]=true;
    else { out[key]=next; i++; }
  }
  return out;
}
function nonEmptyString(value){return typeof value==="string"&&!!value.trim();}
function positiveInt(value){return Number.isInteger(Number(value))&&Number(value)>0;}
function normalizeSha(value){return nonEmptyString(value)?value.trim().toLowerCase():"";}
function finding(severity,code,data={}){return {severity,code,...data};}

function validateRequirement(raw,index){
  const errors=[];
  if(!raw||typeof raw!=="object"||Array.isArray(raw)) return {errors:[`requirements[${index}] must be an object`],value:null};
  const family=nonEmptyString(raw.family)?raw.family.trim():"";
  if(!FAMILIES.has(family)) errors.push(`requirements[${index}].family must be one of ${[...FAMILIES].join(", ")}`);
  if(typeof raw.required!=="boolean") errors.push(`requirements[${index}].required must be boolean`);
  if(!Array.isArray(raw.checks)) errors.push(`requirements[${index}].checks must be an array`);
  const checks=[];
  if(Array.isArray(raw.checks)){
    const seen=new Set();
    raw.checks.forEach((check,checkIndex)=>{
      if(!check||typeof check!=="object"||Array.isArray(check)){
        errors.push(`requirements[${index}].checks[${checkIndex}] must be an object`);return;
      }
      const name=nonEmptyString(check.name)?check.name.trim():"";
      if(!name) errors.push(`requirements[${index}].checks[${checkIndex}].name is required`);
      if(name&&seen.has(name)) errors.push(`requirements[${index}] duplicate check ${name}`);
      seen.add(name);
      if(check.requireArtifact!=null&&typeof check.requireArtifact!=="boolean") errors.push(`requirements[${index}].checks[${checkIndex}].requireArtifact must be boolean`);
      checks.push({name,requireArtifact:check.requireArtifact===true});
    });
  }
  if(raw.required===true&&!checks.length) errors.push(`requirements[${index}] required family must declare at least one check`);
  return {errors,value:{family,required:raw.required===true,checks}};
}

function validateEvidence(raw,index){
  const errors=[];
  if(!raw||typeof raw!=="object"||Array.isArray(raw)) return {errors:[`evidence[${index}] must be an object`],value:null};
  const family=nonEmptyString(raw.family)?raw.family.trim():"";
  const checkName=nonEmptyString(raw.checkName)?raw.checkName.trim():"";
  const headSha=normalizeSha(raw.headSha);
  const status=nonEmptyString(raw.status)?raw.status.trim():"";
  const conclusion=nonEmptyString(raw.conclusion)?raw.conclusion.trim():"";
  const source=nonEmptyString(raw.source)?raw.source.trim():"";
  const runId=Number(raw.runId), jobId=Number(raw.jobId);
  const artifactIds=Array.isArray(raw.artifactIds)?raw.artifactIds.map(Number):[];
  if(!FAMILIES.has(family)) errors.push(`evidence[${index}].family is unknown`);
  if(!checkName) errors.push(`evidence[${index}].checkName is required`);
  if(!SHA_RE.test(headSha)) errors.push(`evidence[${index}].headSha must be a full 40-character commit SHA`);
  if(source!=="github_actions") errors.push(`evidence[${index}].source must equal github_actions`);
  if(!positiveInt(runId)) errors.push(`evidence[${index}].runId must be a positive integer`);
  if(!positiveInt(jobId)) errors.push(`evidence[${index}].jobId must be a positive integer`);
  if(!status) errors.push(`evidence[${index}].status is required`);
  if(status==="completed"&&!conclusion) errors.push(`evidence[${index}].conclusion is required when status is completed`);
  if(raw.artifactIds!=null&&!Array.isArray(raw.artifactIds)) errors.push(`evidence[${index}].artifactIds must be an array when present`);
  if(artifactIds.some(id=>!positiveInt(id))) errors.push(`evidence[${index}].artifactIds entries must be positive integers`);
  return {errors,value:{family,checkName,headSha,status,conclusion,source,runId,jobId,artifactIds}};
}

function evaluateSnapshot(snapshot){
  const findings=[];
  if(!snapshot||typeof snapshot!=="object"||Array.isArray(snapshot)) throw new Error("snapshot must be an object");
  if(snapshot.schema!==SNAPSHOT_SCHEMA) throw new Error(`snapshot.schema must equal ${SNAPSHOT_SCHEMA}`);
  if(!nonEmptyString(snapshot.workCell)) throw new Error("snapshot.workCell is required");
  if(!positiveInt(snapshot.integrationOwnerPr)) throw new Error("snapshot.integrationOwnerPr must be a positive integer");
  const integratedHeadSha=normalizeSha(snapshot.integratedHeadSha);
  if(!SHA_RE.test(integratedHeadSha)) throw new Error("snapshot.integratedHeadSha must be a full 40-character commit SHA");
  if(!Array.isArray(snapshot.requirements)) throw new Error("snapshot.requirements must be an array");
  if(!Array.isArray(snapshot.evidence)) throw new Error("snapshot.evidence must be an array");

  const requirements=[];
  const seenFamilies=new Set();
  snapshot.requirements.forEach((row,index)=>{
    const checked=validateRequirement(row,index);
    if(checked.errors.length) findings.push(finding("BLOCK","MALFORMED_REQUIREMENT",{index,errors:checked.errors}));
    if(checked.value){
      if(seenFamilies.has(checked.value.family)) findings.push(finding("BLOCK","DUPLICATE_REQUIREMENT_FAMILY",{family:checked.value.family}));
      seenFamilies.add(checked.value.family);
      requirements.push(checked.value);
    }
  });

  const evidence=snapshot.evidence.map((row,index)=>{
    const checked=validateEvidence(row,index);
    return {index,raw:row,value:checked.value,errors:checked.errors};
  });

  for(const req of requirements.filter(row=>row.required)){
    for(const check of req.checks){
      const relevant=evidence.filter(row=>row.value&&row.value.family===req.family&&row.value.checkName===check.name);
      if(!relevant.length){
        findings.push(finding("BLOCK","REQUIRED_EVIDENCE_ABSENT",{family:req.family,checkName:check.name,integratedHeadSha}));
        continue;
      }
      const exact=relevant.filter(row=>row.value.headSha===integratedHeadSha);
      const validExact=exact.filter(row=>!row.errors.length);
      const successful=validExact.filter(row=>row.value.status==="completed"&&row.value.conclusion==="success"&&(!check.requireArtifact||row.value.artifactIds.length>0));
      if(successful.length){
        findings.push(finding("INFO","REQUIRED_EVIDENCE_SATISFIED",{family:req.family,checkName:check.name,integratedHeadSha,runIds:successful.map(row=>row.value.runId)}));
        const stale=relevant.filter(row=>row.value.headSha!==integratedHeadSha);
        if(stale.length) findings.push(finding("INFO","STALE_EVIDENCE_IGNORED",{family:req.family,checkName:check.name,observedShas:[...new Set(stale.map(row=>row.value.headSha))]}));
        continue;
      }
      if(exact.some(row=>row.errors.length)){
        findings.push(finding("BLOCK","REQUIRED_EVIDENCE_MALFORMED",{family:req.family,checkName:check.name,errors:exact.filter(row=>row.errors.length).flatMap(row=>row.errors)}));
        continue;
      }
      if(validExact.some(row=>row.value.status!=="completed")){
        findings.push(finding("BLOCK","REQUIRED_EVIDENCE_INCOMPLETE",{family:req.family,checkName:check.name,statuses:[...new Set(validExact.map(row=>row.value.status))]}));
        continue;
      }
      if(check.requireArtifact&&validExact.some(row=>row.value.status==="completed"&&row.value.conclusion==="success"&&!row.value.artifactIds.length)){
        findings.push(finding("BLOCK","REQUIRED_EVIDENCE_ARTIFACT_MISSING",{family:req.family,checkName:check.name}));
        continue;
      }
      if(validExact.some(row=>row.value.status==="completed"&&row.value.conclusion!=="success")){
        findings.push(finding("BLOCK","REQUIRED_EVIDENCE_NOT_GREEN",{family:req.family,checkName:check.name,conclusions:[...new Set(validExact.map(row=>row.value.conclusion))]}));
        continue;
      }
      const staleValid=relevant.filter(row=>!row.errors.length&&row.value.headSha!==integratedHeadSha);
      if(staleValid.length){
        findings.push(finding("BLOCK","REQUIRED_EVIDENCE_STALE_SHA",{family:req.family,checkName:check.name,integratedHeadSha,observedShas:[...new Set(staleValid.map(row=>row.value.headSha))]}));
        continue;
      }
      const malformed=relevant.filter(row=>row.errors.length);
      if(malformed.length){
        findings.push(finding("BLOCK","REQUIRED_EVIDENCE_MALFORMED",{family:req.family,checkName:check.name,errors:malformed.flatMap(row=>row.errors)}));
        continue;
      }
      findings.push(finding("BLOCK","REQUIRED_EVIDENCE_UNSATISFIED",{family:req.family,checkName:check.name,integratedHeadSha}));
    }
  }

  const requiredFamilies=requirements.filter(row=>row.required).map(row=>row.family);
  const blocks=findings.filter(row=>row.severity==="BLOCK");
  return {
    pass:blocks.length===0,
    issue:601,
    slice:"S0.5-final-integration-aggregator",
    schema:SNAPSHOT_SCHEMA,
    workCell:snapshot.workCell.trim(),
    integrationOwnerPr:Number(snapshot.integrationOwnerPr),
    integratedHeadSha,
    requiredFamilies,
    counts:{block:blocks.length,info:findings.filter(row=>row.severity==="INFO").length},
    findings
  };
}

function main(){
  const args=parseArgs(process.argv.slice(2));
  if(!args.snapshot){console.error("Usage: node tools/workforce_final_integration_aggregator_601.js --snapshot <file>");process.exit(2);}
  try{
    const snapshot=JSON.parse(fs.readFileSync(args.snapshot,"utf8"));
    const result=evaluateSnapshot(snapshot);
    console.log(JSON.stringify(result,null,2));
    process.exit(result.pass?0:1);
  }catch(error){
    console.error(JSON.stringify({pass:false,issue:601,slice:"S0.5-final-integration-aggregator",error:String(error&&error.message||error)},null,2));
    process.exit(2);
  }
}
if(require.main===module) main();
module.exports={SNAPSHOT_SCHEMA,FAMILIES,evaluateSnapshot,validateRequirement,validateEvidence};
