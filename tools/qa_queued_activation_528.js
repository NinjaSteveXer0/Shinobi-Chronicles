#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");

const ROOT=path.resolve(__dirname,"..");
const DEFAULT_MANIFEST="qa/production_consumption_manifest_528.json";

function readJson(relativePath){
  return JSON.parse(fs.readFileSync(path.join(ROOT,relativePath),"utf8"));
}
function parseArgs(argv){
  const options={manifest:DEFAULT_MANIFEST,jsonOut:null,offline:false,repo:process.env.GITHUB_REPOSITORY||"NinjaSteveXer0/Shinobi-Chronicles"};
  for(const arg of argv){
    if(arg==="--offline")options.offline=true;
    else if(arg.startsWith("--manifest="))options.manifest=arg.slice(11);
    else if(arg.startsWith("--json-out="))options.jsonOut=arg.slice(11);
    else if(arg.startsWith("--repo="))options.repo=arg.slice(7);
  }
  return options;
}
function writeReport(relativePath,report){
  if(!relativePath)return;
  const target=path.join(ROOT,relativePath);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,JSON.stringify(report,null,2)+"\n");
}
function headers(){
  const value={"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28","User-Agent":"shinobi-chronicles-conformance-528"};
  if(process.env.GITHUB_TOKEN)value.Authorization=`Bearer ${process.env.GITHUB_TOKEN}`;
  return value;
}
async function githubJson(repo,suffix){
  const response=await fetch(`https://api.github.com/repos/${repo}/${suffix}`,{headers:headers()});
  if(!response.ok)throw new Error(`GitHub ${response.status} for ${suffix}`);
  return response.json();
}
async function evaluatePredicate(repo,predicate,{offline=false}={}){
  if(!predicate||!predicate.type)return{status:"STALE_UNKNOWN",reason:"predicate_missing_type"};
  if(predicate.type==="manual_gate"){
    return{
      status:predicate.satisfied===true?"SATISFIED":"UNSATISFIED",
      reason:predicate.satisfied===true?"manual_gate_declared_satisfied":String(predicate.reason||"manual_gate_requires_owner_promotion"),
      machineCheckable:false
    };
  }
  if(offline)return{status:"STALE_UNKNOWN",reason:"offline_machine_predicate_not_evaluated",machineCheckable:true};
  try{
    if(predicate.type==="issue_closed"){
      const data=await githubJson(repo,`issues/${Number(predicate.number)}`);
      return{status:data.state==="closed"?"SATISFIED":"UNSATISFIED",reason:`issue_${predicate.number}_${data.state}`,machineCheckable:true};
    }
    if(predicate.type==="pr_merged"){
      const data=await githubJson(repo,`pulls/${Number(predicate.number)}`);
      return{status:data.merged===true?"SATISFIED":"UNSATISFIED",reason:`pr_${predicate.number}_${data.merged===true?"merged":data.state||"not_merged"}`,machineCheckable:true};
    }
    return{status:"STALE_UNKNOWN",reason:`unsupported_predicate:${predicate.type}`,machineCheckable:false};
  }catch(error){
    return{status:"STALE_UNKNOWN",reason:String(error&&error.message||error),machineCheckable:true};
  }
}
async function evaluateRecord(repo,record,options={}){
  const predicates=Array.isArray(record.activation_predicates)?record.activation_predicates:[];
  if(!predicates.length){
    return{
      id:record.id,
      owner:record.owner||null,
      issue_ref:record.issue_ref||null,
      state:"STALE_UNKNOWN",
      reasons:["no_activation_predicates_declared"],
      predicates:[]
    };
  }
  const results=[];
  for(const predicate of predicates)results.push({...predicate,...await evaluatePredicate(repo,predicate,options)});
  let state="STILL_BLOCKED";
  if(results.some(row=>row.status==="STALE_UNKNOWN"))state="STALE_UNKNOWN";
  else if(results.every(row=>row.status==="SATISFIED"))state="READY";
  return{
    id:record.id,
    owner:record.owner||null,
    issue_ref:record.issue_ref||null,
    ready_action:record.ready_action||"reclassify_to_owner_queue",
    auto_implement:false,
    state,
    reasons:results.map(row=>row.reason),
    predicates:results
  };
}

async function main(){
  const options=parseArgs(process.argv.slice(2));
  const manifest=readJson(options.manifest);
  const records=Array.isArray(manifest.queue_activation_records)?manifest.queue_activation_records:[];
  const rows=[];
  for(const record of records)rows.push(await evaluateRecord(options.repo,record,{offline:options.offline}));
  const counts=rows.reduce((acc,row)=>(acc[row.state]=(acc[row.state]||0)+1,acc),{});
  const report={
    pass:true,
    issue:528,
    repo:options.repo,
    counts,
    readyRows:rows.filter(row=>row.state==="READY").map(row=>row.id),
    blockedRows:rows.filter(row=>row.state==="STILL_BLOCKED").map(row=>row.id),
    staleUnknownRows:rows.filter(row=>row.state==="STALE_UNKNOWN").map(row=>row.id),
    rows,
    generatedAt:new Date().toISOString()
  };
  writeReport(options.jsonOut,report);
  console.log(JSON.stringify(report,null,2));
  if(process.env.GITHUB_ACTIONS==="true"){
    for(const row of rows.filter(item=>item.state==="READY")){
      console.log(`::warning title=#528 queued work READY::${row.id} is READY for ${row.owner||"owning specialist"} review. Do not auto-implement; reclassify through the owning queue.`);
    }
    for(const row of rows.filter(item=>item.state==="STALE_UNKNOWN")){
      console.log(`::warning title=#528 queued predicate stale/unknown::${row.id} could not be evaluated cleanly: ${row.reasons.join("; ")}`);
    }
  }
}
module.exports={evaluatePredicate,evaluateRecord};
if(require.main===module)main().catch(error=>{console.error(error&&error.stack||error);process.exit(1);});
