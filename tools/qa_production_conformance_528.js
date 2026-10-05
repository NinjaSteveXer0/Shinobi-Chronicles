#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const cp=require("child_process");

const ROOT=path.resolve(__dirname,"..");
const DEFAULT_MANIFEST="qa/production_consumption_manifest_528.json";
const DEFAULT_MATRIX="qa/production_change_impact_matrix_528.json";
const DEFAULT_LEDGER="qa/production_browser_canary_ledger_528.json";
const STATE_ENUM=new Set(["CURRENT","BROKEN","INTENTIONALLY_QUEUED","INDETERMINATE"]);
const LIFECYCLE_STAGE_ORDER=["DECLARED","REFERENCED","LOADED","REACHABLE","EFFECTIVE","OBSERVED","GOLDEN"];
const LIFECYCLE_STAGE_ENUM=new Set(LIFECYCLE_STAGE_ORDER);
const DISPOSITION_ENUM=new Set(["IMPLEMENT_NOW","QUEUED","RECORD_ONLY","SUPERSEDED"]);
const REQUIRED_BROWSER_CANARIES=new Set([
  "origin_team_konoha",
  "chronicle_depth_quick_standard_full",
  "story_battle_same_story_return",
  "victory_result_master",
  "setback_result_master",
  "inventory_empty_and_populated",
  "character_purchase_ownership_assignment_boundary",
  "promotion_transition",
  "world_region_village_navigation",
  "ce_hotspot_occurrence",
  "save_load_committed_consequence",
  "active_ui_master_consumption"
]);

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

function validateQueueActivationRecords(manifest){
  const errors=[];
  const records=Array.isArray(manifest&&manifest.queue_activation_records)?manifest.queue_activation_records:[];
  const ids=new Set();
  for(const record of records){
    if(!record||!record.id){errors.push("queue activation record missing id");continue;}
    if(ids.has(record.id))errors.push("duplicate queue activation id: "+record.id);
    ids.add(record.id);
    if(!String(record.owner||"").trim())errors.push(record.id+": queue activation owner required");
    if(!String(record.issue_ref||"").trim())errors.push(record.id+": queue activation issue_ref required");
    if(!Array.isArray(record.activation_predicates)||!record.activation_predicates.length)errors.push(record.id+": activation_predicates required");
    for(const predicate of record.activation_predicates||[]){
      if(!predicate||!["issue_closed","pr_merged","manual_gate"].includes(predicate.type))errors.push(record.id+": unsupported activation predicate");
      if(predicate&&["issue_closed","pr_merged"].includes(predicate.type)&&!Number.isInteger(Number(predicate.number)))errors.push(record.id+": machine predicate requires number");
      if(predicate&&predicate.type==="manual_gate"&&typeof predicate.satisfied!=="boolean")errors.push(record.id+": manual_gate requires satisfied boolean");
    }
  }
  return errors;
}

function validateManifestAndMatrix(manifest,matrix,{skipFileChecks=false}={}){
  const errors=[];
  if(!manifest||manifest.schema_version!==1)errors.push("manifest schema_version must be 1");
  if(!matrix||matrix.schema_version!==1)errors.push("matrix schema_version must be 1");
  const declaredStates=new Set(Array.isArray(manifest&&manifest.state_enum)?manifest.state_enum:[]);
  for(const state of STATE_ENUM)if(!declaredStates.has(state))errors.push("manifest state_enum missing "+state);
  const declaredLifecycle=new Set(Array.isArray(manifest&&manifest.lifecycle_stage_enum)?manifest.lifecycle_stage_enum:[]);
  for(const stage of LIFECYCLE_STAGE_ENUM)if(!declaredLifecycle.has(stage))errors.push("manifest lifecycle_stage_enum missing "+stage);
  if(!String(manifest&&manifest.browser_canary_ledger||"").trim())errors.push("manifest browser_canary_ledger required");
  else if(!skipFileChecks&&!exists(manifest.browser_canary_ledger))errors.push("manifest browser_canary_ledger missing path "+manifest.browser_canary_ledger);
  errors.push(...validateQueueActivationRecords(manifest));

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
    if(!LIFECYCLE_STAGE_ENUM.has(row.lifecycle_stage))errors.push(row.id+": invalid or missing lifecycle_stage "+row.lifecycle_stage);
    if(!DISPOSITION_ENUM.has(row.production_disposition))errors.push(row.id+": invalid or missing production_disposition "+row.production_disposition);
    for(const key of ["surface_family","authority_kind","authority_ref","owner"]){
      if(row[key]==null||(Array.isArray(row[key])&&!row[key].length))errors.push(row.id+": missing "+key);
    }
    if(row.status==="CURRENT"){
      if(row.production_disposition!=="IMPLEMENT_NOW")errors.push(row.id+": CURRENT row must use IMPLEMENT_NOW disposition");
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
    if(row.status==="INTENTIONALLY_QUEUED"){
      if(row.production_disposition!=="QUEUED")errors.push(row.id+": queued row must use QUEUED disposition");
      if(!String(row.queue_reason||"").trim())errors.push(row.id+": queued row requires queue_reason");
    }
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

function validateLedger(manifest,ledger,{skipFileChecks=false}={}){
  const errors=[];
  if(!ledger||ledger.schema_version!==1)errors.push("browser ledger schema_version must be 1");
  if(!ledger||ledger.authority_issue!==528)errors.push("browser ledger authority_issue must be 528");
  const manifestIds=new Set((manifest&&manifest.rows||[]).map(row=>row.id));
  const canaries=Array.isArray(ledger&&ledger.canaries)?ledger.canaries:[];
  const ids=new Set();
  for(const canary of canaries){
    if(!canary||!canary.id){errors.push("browser canary missing id");continue;}
    if(ids.has(canary.id))errors.push("duplicate browser canary id: "+canary.id);
    ids.add(canary.id);
    if(!String(canary.state||"").trim())errors.push(canary.id+": browser canary state required");
    if(!String(canary.starting_fixture||"").trim())errors.push(canary.id+": starting_fixture required");
    if(!Array.isArray(canary.route_actions)||!canary.route_actions.length)errors.push(canary.id+": route_actions required");
    if(!Array.isArray(canary.expected_checkpoints)||!canary.expected_checkpoints.length)errors.push(canary.id+": expected_checkpoints required");
    if(!Array.isArray(canary.contract_ids)||!canary.contract_ids.length)errors.push(canary.id+": contract_ids required");
    if(!Array.isArray(canary.qa_refs)||!canary.qa_refs.length)errors.push(canary.id+": qa_refs required");
    if(canary.golden_claimed===true)errors.push(canary.id+": automated ledger may not claim Golden");
    for(const contractId of canary.contract_ids||[])if(!manifestIds.has(contractId))errors.push(canary.id+": unknown manifest contract "+contractId);
    if(!skipFileChecks)for(const qaRef of canary.qa_refs||[])if(!exists(qaRef))errors.push(canary.id+": missing qa ref "+qaRef);
  }
  for(const required of REQUIRED_BROWSER_CANARIES)if(!ids.has(required))errors.push("browser ledger missing required canary "+required);
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
    return{id:row.id,declared:row.status,computed,lifecycleStage:row.lifecycle_stage,disposition:row.production_disposition,reasons};
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
  const exact=new Set([
    "game.js","index.html","style.css",
    "UI/victory.png","UI/setback.png","UI/exams.png","UI/practical.png","UI/my_clan_browse.png","UI/my_clan_inspection.png","UI/convo.png",
    "Documentation/UI/UI Master Asset Classification and Consumption Registry 2026-10-05.md",
    "tools/qa_queued_activation_528.js","tools/qa_ui_master_consumption_528_browser.js"
  ]);
  return exact.has(file)||file.startsWith("runtime/")||file.startsWith("tools/fixtures/runtime_")||file.startsWith("qa/production_")||file.startsWith("tools/qa_production_")||file.startsWith(".github/workflows/issue-")||file.startsWith(".github/workflows/issues-");
}

function buildPlan(manifest,matrix,{mode="pr",changedFiles=[]}={}){
  const laneIds=[];
  const impactedRows=[];
  const directInvalidatedRows=[];
  const matrixAffectedRows=[];
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
        directInvalidatedRows.push(row.id);
        for(const hit of hits)coveredFiles.add(hit);
        laneIds.push(...(row.invalidation_rule.required_lane_ids||[]));
      }
    }
    for(const rule of matrix.rules||[]){
      const hits=changedFiles.filter(file=>matchesAny(file,rule.changed_any||[]));
      if(!hits.length)continue;
      for(const hit of hits)coveredFiles.add(hit);
      impactedRows.push(...(rule.affected_consumers||[]));
      matrixAffectedRows.push(...(rule.affected_consumers||[]));
      laneIds.push(...(rule.required_lane_ids||[]));
    }
  }
  const uniqueLanes=uniq(laneIds);
  const unclassifiedChanges=mode==="scheduled"?[]:changedFiles.filter(file=>isProductionRelevant(file)&&!coveredFiles.has(file));
  return{
    mode,
    changedFiles:uniq(changedFiles),
    impactedRows:uniq(impactedRows),
    directInvalidatedRows:uniq(directInvalidatedRows),
    matrixAffectedRows:uniq(matrixAffectedRows),
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

function computeEvidenceFreshness(manifest,plan,execution,{executeRequested=false}={}){
  const rowsById=new Map((manifest.rows||[]).map(row=>[row.id,row]));
  const laneStates=new Map((execution&&execution.ledger||[]).map(row=>[row.laneId,row.status]));
  return (plan.directInvalidatedRows||[]).map(rowId=>{
    const row=rowsById.get(rowId);
    const required=row&&row.invalidation_rule&&row.invalidation_rule.required_lane_ids||[];
    if(!executeRequested)return{contractId:rowId,state:"STALE_PENDING_RERUN",requiredLaneIds:required};
    const states=required.map(laneId=>({laneId,status:laneStates.get(laneId)||"NOT_RUN"}));
    if(states.some(item=>item.status==="BROKEN"||item.status==="INDETERMINATE"))return{contractId:rowId,state:"BROKEN",requiredLaneIds:required,laneStates:states};
    if(states.every(item=>item.status==="CURRENT"))return{contractId:rowId,state:"REVALIDATED",requiredLaneIds:required,laneStates:states};
    return{contractId:rowId,state:"STALE_UNRESOLVED",requiredLaneIds:required,laneStates:states};
  });
}

function parseArgs(argv){
  const options={mode:"pr",manifest:DEFAULT_MANIFEST,matrix:DEFAULT_MATRIX,ledger:DEFAULT_LEDGER,planOnly:false,execute:false,jsonOut:null,base:null,head:null,changedFiles:[]};
  for(const arg of argv){
    if(arg==="--plan-only")options.planOnly=true;
    else if(arg==="--execute")options.execute=true;
    else if(arg.startsWith("--mode="))options.mode=arg.slice(7);
    else if(arg.startsWith("--manifest="))options.manifest=arg.slice(11);
    else if(arg.startsWith("--matrix="))options.matrix=arg.slice(9);
    else if(arg.startsWith("--ledger="))options.ledger=arg.slice(9);
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
  const manifest=readJson(options.manifest),matrix=readJson(options.matrix),ledger=readJson(options.ledger);
  const schemaErrors=validateManifestAndMatrix(manifest,matrix);
  const ledgerErrors=validateLedger(manifest,ledger);
  const rowStates=evaluateRowStates(manifest);
  const blockingRows=rowStates.filter(row=>row.computed==="BROKEN"||row.computed==="INDETERMINATE");
  let changedFiles=options.changedFiles;
  if(!changedFiles.length&&options.mode!=="scheduled"){
    const envFiles=String(process.env.SC_CHANGED_FILES||"").split(/\r?\n/).map(v=>v.trim()).filter(Boolean);
    changedFiles=envFiles.length?envFiles:gitChangedFiles(options.base||process.env.SC_BASE_SHA,options.head||process.env.SC_HEAD_SHA||process.env.GITHUB_SHA);
  }
  const plan=buildPlan(manifest,matrix,{mode:options.mode,changedFiles});
  let execution={pass:true,ledger:[]};
  const preExecutionClean=schemaErrors.length===0&&ledgerErrors.length===0&&blockingRows.length===0&&plan.unclassifiedChanges.length===0;
  if(options.execute&&preExecutionClean)execution=runLanes(matrix,plan.laneIds);
  const staleEvidence=computeEvidenceFreshness(manifest,plan,execution,{executeRequested:options.execute});
  const unresolvedStale=staleEvidence.filter(row=>row.state==="BROKEN"||row.state==="STALE_UNRESOLVED");
  const stateCounts=rowStates.reduce((acc,row)=>(acc[row.computed]=(acc[row.computed]||0)+1,acc),{});
  const lifecycleCounts=(manifest.rows||[]).reduce((acc,row)=>(acc[row.lifecycle_stage]=(acc[row.lifecycle_stage]||0)+1,acc),{});
  const canaryStateCounts=(ledger.canaries||[]).reduce((acc,row)=>(acc[row.state]=(acc[row.state]||0)+1,acc),{});
  const orphanFindings=plan.unclassifiedChanges.map(file=>({type:"UNCLASSIFIED_PRODUCTION_CHANGE",path:file,severity:"BLOCKING",reason:"production-relevant change has no declared conformance impact"}));
  const pass=preExecutionClean&&execution.pass&&unresolvedStale.length===0;
  const report={
    pass,
    issue:528,
    manifestId:manifest.manifest_id,
    matrixId:matrix.matrix_id,
    browserCanaryLedgerId:ledger.ledger_id,
    lifecycleDiagnosticOrder:LIFECYCLE_STAGE_ORDER,
    schemaErrors,
    ledgerErrors,
    stateCounts,
    lifecycleCounts,
    browserCanaryStateCounts:canaryStateCounts,
    rowStates,
    queuedRows:rowStates.filter(row=>row.computed==="INTENTIONALLY_QUEUED").map(row=>row.id),
    staleEvidence,
    orphanFindings,
    plan,
    execution,
    generatedAt:new Date().toISOString()
  };
  writeReport(options.jsonOut,report);
  console.log(JSON.stringify(report,null,2));
  if(!pass)process.exitCode=1;
}

module.exports={
  STATE_ENUM,LIFECYCLE_STAGE_ORDER,LIFECYCLE_STAGE_ENUM,REQUIRED_BROWSER_CANARIES,
  globRegex,matches,validateManifestAndMatrix,validateLedger,evaluateRowStates,buildPlan,isProductionRelevant,computeEvidenceFreshness
};
if(require.main===module)main();
