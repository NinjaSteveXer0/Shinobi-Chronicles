#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const cp=require("child_process");

const ROOT=path.resolve(__dirname,"..");
const DEFAULT_MANIFEST="qa/production_consumption_manifest_528.json";
const DEFAULT_MATRIX="qa/production_change_impact_matrix_528.json";
const STATE_ENUM=new Set(["CURRENT","BROKEN","INTENTIONALLY_QUEUED","INDETERMINATE"]);

function readJson(relativePath){
  return JSON.parse(fs.readFileSync(path.join(ROOT,relativePath),"utf8"));
}
function exists(relativePath){return fs.existsSync(path.join(ROOT,relativePath));}
function contentIncludes(relativePath,needle){
  if(!exists(relativePath))return false;
  return fs.readFileSync(path.join(ROOT,relativePath),"utf8").includes(String(needle));
}
function uniq(values){return [...new Set(values)];}
function globRegex(pattern){
  const marker="__SC_DOUBLE_STAR__";
  const escaped=String(pattern)
    .replace(/[.+^${}()|[\]\\]/g,"\\$&")
    .replace(/\*\*/g,marker)
    .replace(/\*/g,"[^/]*")
    .replace(new RegExp(marker,"g"),".*");
  return new RegExp("^"+escaped+"$");
}
function matches(file,pattern){return globRegex(pattern).test(String(file));}
function matchesAny(file,patterns){return (patterns||[]).some(pattern=>matches(file,pattern));}

function validateManifestAndMatrix(manifest,matrix,{skipFileChecks=false}={}){
  const errors=[];
  if(!manifest||manifest.schema_version!==1)errors.push("manifest schema_version must be 1");
  if(!matrix||matrix.schema_version!==1)errors.push("matrix schema_version must be 1");
  const declaredStates=new Set(Array.isArray(manifest&&manifest.state_enum)?manifest.state_enum:[]);
  for(const state of STATE_ENUM)if(!declaredStates.has(state))errors.push("manifest state_enum missing "+state);
  const rows=Array.isArray(manifest&&manifest.rows)?manifest.rows:[];
  const rowIds=new Set();
  const lanes=matrix&&matrix.lane_catalog&&typeof matrix.lane_catalog==="object"?matrix.lane_catalog:{};
  for(const [laneId,lane] of Object.entries(lanes)){
    if(!lane||!["static","browser"].includes(lane.kind))errors.push("lane "+laneId+" has invalid kind");
    if(!lane||!Array.isArray(lane.commands)||!lane.commands.length||lane.commands.some(command=>!String(command||"").trim()))errors.push("lane "+laneId+" requires commands");
  }
  for(const row of rows){
    if(!row||!row.id){errors.push("manifest row missing id");continue;}
    if(rowIds.has(row.id))errors.push("duplicate manifest row id: "+row.id);
    rowIds.add(row.id);
    if(!STATE_ENUM.has(row.status))errors.push(row.id+": invalid status "+row.status);
    for(const key of ["surface_family","authority_kind","authority_ref","owner"]){
      if(row[key]==null||(Array.isArray(row[key])&&!row[key].length))errors.push(row.id+": missing "+key);
    }
    if(row.status==="CURRENT"){
      if(!Array.isArray(row.consumer_paths)||!row.consumer_paths.length)errors.push(row.id+": CURRENT row requires consumer_paths");
      if(!Array.isArray(row.qa_paths)||!row.qa_paths.length)errors.push(row.id+": CURRENT row requires qa_paths");
      if(!row.workflow_path)errors.push(row.id+": CURRENT row requires workflow_path");
      if(!row.expected_evidence||!row.expected_evidence.path||!row.expected_evidence.contains)errors.push(row.id+": CURRENT row requires expected_evidence");
      if(!row.invalidation_rule||!Array.isArray(row.invalidation_rule.match_any)||!row.invalidation_rule.match_any.length)errors.push(row.id+": CURRENT row requires invalidation matchers");
      if(!row.invalidation_rule||!Array.isArray(row.invalidation_rule.required_lane_ids)||!row.invalidation_rule.required_lane_ids.length)errors.push(row.id+": CURRENT row requires lane ids");
      for(const laneId of row.invalidation_rule&&row.invalidation_rule.required_lane_ids||[])if(!lanes[laneId])errors.push(row.id+": unknown lane "+laneId);
      if(!skipFileChecks){
        for(const file of [...row.consumer_paths,...row.qa_paths,row.workflow_path])if(file&&!exists(file))errors.push(row.id+": missing path "+file);
      }
    }
    if(row.status==="INTENTIONALLY_QUEUED"&&!String(row.queue_reason||"").trim())errors.push(row.id+": queued row requires queue_reason");
  }
  const rules=Array.isArray(matrix&&matrix.rules)?matrix.rules:[];
  const ruleIds=new Set();
  for(const rule of rules){
    if(!rule||!rule.id){errors.push("impact rule missing id");continue;}
    if(ruleIds.has(rule.id))errors.push("duplicate impact rule id: "+rule.id);
    ruleIds.add(rule.id);
    if(!Array.isArray(rule.changed_any)||!rule.changed_any.length)errors.push(rule.id+": changed_any required");
    for(const rowId of rule.affected_consumers||[])if(!rowIds.has(rowId))errors.push(rule.id+": unknown consumer "+rowId);
    for(const laneId of rule.required_lane_ids||[])if(!lanes[laneId])errors.push(rule.id+": unknown lane "+laneId);
  }
  return errors;
}

function evaluateRowStates(manifest,{skipFileChecks=false}={}){
  return (manifest.rows||[]).map(row=>{
    let computed=row.status;
    const reasons=[];
    if(row.status==="CURRENT"&&!skipFileChecks){
      const required=[...(row.consumer_paths||[]),...(row.qa_paths||[])];
      if(row.workflow_path)required.push(row.workflow_path);
      const missing=required.filter(file=>!exists(file));
      if(missing.length){computed="BROKEN";reasons.push("missing:"+missing.join(","));}
      const evidence=row.expected_evidence;
      if(evidence&&(!exists(evidence.path)||!contentIncludes(evidence.path,evidence.contains))){
        computed="BROKEN";reasons.push("evidence_mismatch:"+evidence.path);
      }
    }
    if(row.status==="INTENTIONALLY_QUEUED")reasons.push(String(row.queue_reason||"queued"));
    return{id:row.id,declared:row.status,computed,reasons};
  });
}

function gitChangedFiles(base,head){
  if(!head)return[];
  const zero=/^0+$/;
  const commands=[];
  if(base&&!zero.test(base)){
    commands.push(["git",["diff","--name-only",base+"..."+head]]);
    commands.push(["git",["diff","--name-only",base+".."+head]]);
  }else commands.push(["git",["show","--pretty=","--name-only",head]]);
  for(const [bin,args] of commands){
    const result=cp.spawnSync(bin,args,{cwd:ROOT,encoding:"utf8"});
    if(result.status===0)return uniq(String(result.stdout||"").split(/\r?\n/).map(v=>v.trim()).filter(Boolean));
  }
  return[];
}

function isProductionRelevant(file){
  return file==="game.js"||file==="index.html"||file.startsWith("runtime/")||file.startsWith("tools/fixtures/runtime_")||file.startsWith("qa/production_")||file.startsWith("tools/qa_production_")||file.startsWith(".github/workflows/issue-");
}

function buildPlan(manifest,matrix,{mode="pr",changedFiles=[]}={}){
  const laneIds=[];
  const impactedRows=[];
  const coveredFiles=new Set();
  const currentRows=(manifest.rows||[]).filter(row=>row.status==="CURRENT");
  if(mode==="scheduled"){
    for(const [laneId,lane] of Object.entries(matrix.lane_catalog||{}))if(lane.scheduled_representative===true)laneIds.push(laneId);
    for(const row of currentRows){
      const required=row.invalidation_rule&&row.invalidation_rule.required_lane_ids||[];
      if(required.some(id=>laneIds.includes(id)))impactedRows.push(row.id);
    }
  }else{
    for(const row of currentRows){
      const patterns=row.invalidation_rule&&row.invalidation_rule.match_any||[];
      const hits=changedFiles.filter(file=>matchesAny(file,patterns));
      if(hits.length){
        impactedRows.push(row.id);
        for(const hit of hits)coveredFiles.add(hit);
        laneIds.push(...(row.invalidation_rule.required_lane_ids||[]));
      }
    }
    for(const rule of matrix.rules||[]){
      const hits=changedFiles.filter(file=>matchesAny(file,rule.changed_any||[]));
      if(!hits.length)continue;
      for(const hit of hits)coveredFiles.add(hit);
      impactedRows.push(...(rule.affected_consumers||[]));
      laneIds.push(...(rule.required_lane_ids||[]));
    }
  }
  const uniqueLanes=uniq(laneIds);
  const unclassifiedChanges=mode==="scheduled"?[]:changedFiles.filter(file=>isProductionRelevant(file)&&!coveredFiles.has(file));
  return{
    mode,
    changedFiles:uniq(changedFiles),
    impactedRows:uniq(impactedRows),
    laneIds:uniqueLanes,
    browserRequired:uniqueLanes.some(id=>matrix.lane_catalog[id]&&matrix.lane_catalog[id].kind==="browser"),
    unclassifiedChanges
  };
}

function runLanes(matrix,laneIds){
  const ledger=[];
  let pass=true;
  for(const laneId of laneIds){
    const lane=matrix.lane_catalog[laneId];
    if(!lane){pass=false;ledger.push({laneId,status:"INDETERMINATE",reason:"unknown lane"});continue;}
    const record={laneId,kind:lane.kind,status:"CURRENT",commands:[]};
    for(const command of lane.commands){
      const startedAt=new Date().toISOString();
      const result=cp.spawnSync(command,{cwd:ROOT,shell:true,stdio:"inherit",env:process.env});
      const commandRecord={command,startedAt,finishedAt:new Date().toISOString(),exitCode:result.status};
      record.commands.push(commandRecord);
      if(result.status!==0){record.status="BROKEN";pass=false;break;}
    }
    ledger.push(record);
    if(!pass)break;
  }
  return{pass,ledger};
}

function parseArgs(argv){
  const options={mode:"pr",manifest:DEFAULT_MANIFEST,matrix:DEFAULT_MATRIX,planOnly:false,execute:false,jsonOut:null,base:null,head:null,changedFiles:[]};
  for(const arg of argv){
    if(arg==="--plan-only")options.planOnly=true;
    else if(arg==="--execute")options.execute=true;
    else if(arg.startsWith("--mode="))options.mode=arg.slice(7);
    else if(arg.startsWith("--manifest="))options.manifest=arg.slice(11);
    else if(arg.startsWith("--matrix="))options.matrix=arg.slice(9);
    else if(arg.startsWith("--json-out="))options.jsonOut=arg.slice(11);
    else if(arg.startsWith("--base="))options.base=arg.slice(7);
    else if(arg.startsWith("--head="))options.head=arg.slice(7);
    else if(arg.startsWith("--changed-file="))options.changedFiles.push(arg.slice(15));
  }
  if(!["pr","main","scheduled"].includes(options.mode))throw new Error("Unsupported mode: "+options.mode);
  return options;
}
function writeReport(relativePath,report){
  if(!relativePath)return;
  const target=path.join(ROOT,relativePath);fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,JSON.stringify(report,null,2)+"\n");
}

function main(){
  const options=parseArgs(process.argv.slice(2));
  const manifest=readJson(options.manifest),matrix=readJson(options.matrix);
  const schemaErrors=validateManifestAndMatrix(manifest,matrix);
  const rowStates=evaluateRowStates(manifest);
  const blockingRows=rowStates.filter(row=>row.computed==="BROKEN"||row.computed==="INDETERMINATE");
  let changedFiles=options.changedFiles;
  if(!changedFiles.length&&options.mode!=="scheduled"){
    const envFiles=String(process.env.SC_CHANGED_FILES||"").split(/\r?\n/).map(v=>v.trim()).filter(Boolean);
    changedFiles=envFiles.length?envFiles:gitChangedFiles(options.base||process.env.SC_BASE_SHA,options.head||process.env.SC_HEAD_SHA||process.env.GITHUB_SHA);
  }
  const plan=buildPlan(manifest,matrix,{mode:options.mode,changedFiles});
  let execution={pass:true,ledger:[]};
  if(options.execute&&schemaErrors.length===0&&blockingRows.length===0&&plan.unclassifiedChanges.length===0)execution=runLanes(matrix,plan.laneIds);
  const stateCounts=rowStates.reduce((acc,row)=>(acc[row.computed]=(acc[row.computed]||0)+1,acc),{});
  const pass=schemaErrors.length===0&&blockingRows.length===0&&plan.unclassifiedChanges.length===0&&execution.pass;
  const report={
    pass,
    issue:528,
    manifestId:manifest.manifest_id,
    matrixId:matrix.matrix_id,
    schemaErrors,
    stateCounts,
    rowStates,
    queuedRows:rowStates.filter(row=>row.computed==="INTENTIONALLY_QUEUED").map(row=>row.id),
    plan,
    execution,
    generatedAt:new Date().toISOString()
  };
  writeReport(options.jsonOut,report);
  console.log(JSON.stringify(report,null,2));
  if(!pass)process.exitCode=1;
}

module.exports={
  STATE_ENUM,globRegex,matches,validateManifestAndMatrix,evaluateRowStates,buildPlan,isProductionRelevant
};
if(require.main===module)main();
