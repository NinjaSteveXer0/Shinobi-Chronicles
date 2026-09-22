#!/usr/bin/env node
"use strict";

const fs=require("fs");
const cp=require("child_process");
const path=require("path");

const CLASSES=[
  "DOCS_ONLY",
  "RUNTIME_CORE",
  "STORY_RUNTIME",
  "ORIGIN_RUNTIME",
  "KAKASHI_V2",
  "BATTLE_RUNTIME",
  "SAVE_SCHEMA",
  "WORKFLOW_SAFETY"
];

function norm(value){return String(value||"").replace(/\\/g,"/").replace(/^\.\//,"");}
function isDocsOnlyPath(file){
  const p=norm(file);
  return /^Documentation\//.test(p)||/^README(?:\.md)?$/i.test(p)||/^CHANGELOG(?:\.md)?$/i.test(p);
}
function isRuntimeLike(p){
  return p==="game.js"||p==="index.html"||/^runtime\//.test(p)||/^tools\/qa_.*\.(?:js|py)$/.test(p)||
    /^tools\/fixtures\/runtime.*\.json$/.test(p)||/^\.github\/workflows\//.test(p);
}
function classifyFiles(files){
  const normalized=[...new Set((files||[]).map(norm).filter(Boolean))].sort();
  const classSet=new Set();
  let failClosed=false;

  if(normalized.length>0&&normalized.every(isDocsOnlyPath)){
    classSet.add("DOCS_ONLY");
  }else{
    for(const p of normalized){
      if(isDocsOnlyPath(p))continue;

      let matched=false;
      if(isRuntimeLike(p)){classSet.add("RUNTIME_CORE");matched=true;}

      if(
        /^runtime\/.*(?:story|scene-board|factual-resolver|decision-realisation)/i.test(p)||
        /^tools\/qa_.*(?:story|scene)/i.test(p)
      ){
        classSet.add("STORY_RUNTIME");classSet.add("RUNTIME_CORE");matched=true;
      }

      if(
        /^runtime\/.*origin/i.test(p)||
        /^tools\/qa_.*origin/i.test(p)||
        /^tools\/fixtures\/.*origin/i.test(p)
      ){
        classSet.add("ORIGIN_RUNTIME");classSet.add("RUNTIME_CORE");matched=true;
      }

      if(/kakashi[-_]?v2|academy[-_]?kakashi[-_]?v2|qa_kakashi_v2/i.test(p)){
        classSet.add("KAKASHI_V2");
        classSet.add("ORIGIN_RUNTIME");
        classSet.add("STORY_RUNTIME");
        classSet.add("RUNTIME_CORE");
        matched=true;
      }

      if(
        /^runtime\/.*battle/i.test(p)||
        /^runtime\/alpha-alpha-sprint-33100\.js$/.test(p)||
        /^tools\/qa_.*battle/i.test(p)||
        /^tools\/qa_issue_278_post_battle_agency\.js$/.test(p)
      ){
        classSet.add("BATTLE_RUNTIME");classSet.add("RUNTIME_CORE");matched=true;
      }

      if(
        p==="game.js"||
        /(?:save|persist|persistence|storage|schema|reload|idempot)/i.test(p)
      ){
        classSet.add("SAVE_SCHEMA");classSet.add("RUNTIME_CORE");matched=true;
      }

      if(
        /^\.github\/workflows\//.test(p)||
        /^tools\/qa_runtime_ownership_safety_300\.js$/.test(p)||
        /^tools\/fixtures\/runtime_(?:responsibility_registry|change_declarations)_300\.json$/.test(p)||
        /^tools\/(?:merge_safety_gate_305|qa_merge_safety_gate_305)\.js$/.test(p)||
        /^tools\/(?:qa_contract_integrity_311|story_graph_integrity_311|qa_story_reachability_311|browser_runtime_error_gate_311|qa_browser_runtime_error_gate_311|qa_reference_integrity_311|qa_release_candidate_evidence_311|generate_release_candidate_evidence_311)\.js$/.test(p)||
        /^tools\/fixtures\/(?:alpha_contract_integrity_311|release_candidate_evidence_contract_311)\.json$/.test(p)
      ){
        classSet.add("WORKFLOW_SAFETY");classSet.add("RUNTIME_CORE");matched=true;
      }

      if(!matched){
        classSet.add("RUNTIME_CORE");
        failClosed=true;
      }
    }
  }

  if(normalized.length===0){
    classSet.add("RUNTIME_CORE");
    classSet.add("WORKFLOW_SAFETY");
    failClosed=true;
  }

  const classes=CLASSES.filter(x=>classSet.has(x));
  return{
    files:normalized,
    classes,
    docsOnly:classSet.has("DOCS_ONLY"),
    runtime:classSet.has("RUNTIME_CORE"),
    story:classSet.has("STORY_RUNTIME"),
    origin:classSet.has("ORIGIN_RUNTIME"),
    kakashi:classSet.has("KAKASHI_V2"),
    battle:classSet.has("BATTLE_RUNTIME"),
    saveSchema:classSet.has("SAVE_SCHEMA"),
    workflowSafety:classSet.has("WORKFLOW_SAFETY"),
    failClosed
  };
}

function changedFiles(base,head){
  if(!base||!head)throw new Error("base/head required");
  const out=cp.execFileSync("git",["diff","--name-only",base,head],{encoding:"utf8"});
  return out.split(/\r?\n/).filter(Boolean);
}
function writeGithubOutput(file,result){
  if(!file)return;
  const rows={
    classes:result.classes.join(","),
    docs_only:String(result.docsOnly),
    runtime:String(result.runtime),
    story:String(result.story),
    origin:String(result.origin),
    kakashi:String(result.kakashi),
    battle:String(result.battle),
    save_schema:String(result.saveSchema),
    workflow_safety:String(result.workflowSafety),
    fail_closed:String(result.failClosed)
  };
  fs.appendFileSync(file,Object.entries(rows).map(([k,v])=>k+"="+v).join("\n")+"\n");
}

function parseArgs(argv){
  const args={};
  for(let i=0;i<argv.length;i++){
    const key=argv[i];
    if(key.startsWith("--"))args[key.slice(2)]=argv[++i];
  }
  return args;
}

if(require.main===module){
  const args=parseArgs(process.argv.slice(2));
  let files;
  if(args["files-json"])files=JSON.parse(args["files-json"]);
  else files=changedFiles(args.base,args.head);
  const result=classifyFiles(files);
  writeGithubOutput(args["github-output"]||process.env.GITHUB_OUTPUT,result);
  process.stdout.write(JSON.stringify(result,null,2)+"\n");
}

module.exports={CLASSES,classifyFiles,isDocsOnlyPath};
