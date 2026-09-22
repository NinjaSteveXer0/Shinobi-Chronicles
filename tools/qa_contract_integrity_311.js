#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const cp=require("child_process");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const MANIFEST_PATH=path.join(ROOT,"tools/fixtures/alpha_contract_integrity_311.json");
const manifest=JSON.parse(fs.readFileSync(MANIFEST_PATH,"utf8"));

function norm(v){return String(v||"").replace(/\\/g,"/").replace(/^\.\//,"");}
function args(argv){
  const out={};
  for(let i=0;i<argv.length;i++){
    const k=argv[i];
    if(k.startsWith("--"))out[k.slice(2)]=argv[++i];
  }
  return out;
}
function git(argv){
  return cp.execFileSync("git",argv,{cwd:ROOT,encoding:"utf8"}).trim();
}
function changedFiles(base,head){
  if(!base||!head)return[];
  const out=git(["diff","--name-only",base,head]);
  return out?out.split(/\r?\n/).map(norm).filter(Boolean):[];
}
function changedStatuses(base,head){
  if(!base||!head)return[];
  const out=git(["diff","--name-status",base,head]);
  if(!out)return[];
  return out.split(/\r?\n/).filter(Boolean).map(line=>{
    const parts=line.split(/\t+/);
    return{status:parts[0],file:norm(parts[parts.length-1])};
  });
}
function fileAt(ref,file){
  try{return git(["show",ref+":"+file]);}catch(_){return null;}
}
function assertionWeight(source){
  const s=String(source||"");
  const tokens=[
    /\bassert(?:\.\w+)?\s*\(/g,
    /\brequire\s*\(\s*checks\s*,/g,
    /throw\s+new\s+Error\s*\(/g,
    /process\.exit\s*\(\s*1\s*\)/g
  ];
  return tokens.reduce((n,re)=>n+(s.match(re)||[]).length,0);
}
function escapeRegex(s){return String(s).replace(/[.*+?^$()|[\]\\]/g,"\\$&");}
function parseReason(text){
  const body=String(text||"");
  const marker=String(manifest.reasonMarker||"CONTRACT CHANGE REASON");
  const re=new RegExp(escapeRegex(marker)+"\\s*:\\s*([A-Z_]+)","i");
  const m=body.match(re);
  return m?String(m[1]).toUpperCase():null;
}
function pathMatches(file,prefix){
  const p=norm(file),q=norm(prefix);
  return q.endsWith("/")?p.startsWith(q):p===q;
}
function evaluate(input){
  const files=input.files||[];
  const statuses=input.statuses||[];
  const reason=input.reason||null;
  const base=input.base||null;
  const head=input.head||null;
  const eventName=input.eventName||"manual";
  const accepted=new Set(manifest.acceptedChangeReasons||[]);
  const violations=[];
  const touched=[];
  for(const contract of manifest.protectedContracts||[]){
    for(const field of ["contractId","authorityRef","contractVersion","responsibilityId","expectedInvariant"]){
      if(!String(contract[field]||"").trim())violations.push((contract.contractId||"<unknown>")+":metadata:"+field);
    }
    const contractFiles=(contract.contractFiles||[]).map(norm);
    const impl=(contract.implementationPrefixes||[]).map(norm);
    const contractTouched=files.some(f=>contractFiles.includes(f));
    const implementationTouched=files.some(f=>impl.some(p=>pathMatches(f,p)));
    const deleted=statuses.filter(x=>x.status.startsWith("D")&&contractFiles.includes(x.file)).map(x=>x.file);
    let weakened=[];
    if(base&&head){
      weakened=contractFiles.filter(f=>files.includes(f)).filter(f=>{
        const before=fileAt(base,f);
        const after=fileAt(head,f);
        return before!==null&&after!==null&&assertionWeight(after)<assertionWeight(before);
      });
    }
    if(contractTouched||implementationTouched||deleted.length||weakened.length){
      touched.push({contractId:contract.contractId,contractTouched,implementationTouched,deleted,weakened});
    }
    const needsReason=deleted.length>0||weakened.length>0||(contractTouched&&implementationTouched);
    if(needsReason&&eventName!=="merge_group"&&!accepted.has(reason)){
      violations.push(contract.contractId+":explicit_change_reason_required");
    }
  }
  return{pass:violations.length===0,reason,acceptedReason:reason?accepted.has(reason):false,touched,violations};
}

assert.strictEqual(manifest.schemaVersion,1,"#311 contract manifest schema");
assert(String(manifest.authorityRef||"").includes("Alpha_Second_Wave_Regression_and_Integrity_Safeguards"),"#311 authorityRef drift");
assert(Array.isArray(manifest.protectedContracts)&&manifest.protectedContracts.length>=5,"#311 needs bounded protected contract set");
assert.deepStrictEqual(
  manifest.acceptedChangeReasons,
  ["AUTHORITY_CHANGED","BUG_IN_TEST","INTENTIONAL_SCHEMA_MIGRATION"],
  "#311 accepted reason enum drift"
);

const first=manifest.protectedContracts[0];
const fixtureFiles=[first.contractFiles[0],first.implementationPrefixes[0]+"fixture.js"];
let fixture=evaluate({files:fixtureFiles,statuses:[],reason:null,eventName:"pull_request"});
assert.strictEqual(fixture.pass,false,"#311 must reject implementation+contract change without reason");
fixture=evaluate({files:fixtureFiles,statuses:[],reason:"AUTHORITY_CHANGED",eventName:"pull_request"});
assert.strictEqual(fixture.pass,true,"#311 must allow explicit authority change reason");
fixture=evaluate({files:[first.contractFiles[0]],statuses:[{status:"D",file:first.contractFiles[0]}],reason:null,eventName:"pull_request"});
assert.strictEqual(fixture.pass,false,"#311 must reject undeclared contract deletion");
fixture=evaluate({files:[first.contractFiles[0]],statuses:[{status:"D",file:first.contractFiles[0]}],reason:"BUG_IN_TEST",eventName:"pull_request"});
assert.strictEqual(fixture.pass,true,"#311 declared test correction should be reviewable");

const a=args(process.argv.slice(2));
const base=a.base||process.env.SC_BASE_SHA||null;
const head=a.head||process.env.SC_HEAD_SHA||null;
const eventName=process.env.SC_EVENT_NAME||"manual";
const files=base&&head?changedFiles(base,head):[];
const statuses=base&&head?changedStatuses(base,head):[];
const reason=parseReason(process.env.SC_PR_BODY||process.env.SC_CONTRACT_CHANGE_REASON||"");
const result=evaluate({files,statuses,reason,base,head,eventName});

const output={
  pass:result.pass,
  issue:311,
  authorityRef:manifest.authorityRef,
  contractVersion:manifest.contractVersion,
  protectedContractCount:manifest.protectedContracts.length,
  acceptedChangeReasons:manifest.acceptedChangeReasons,
  eventName,
  changedFileCount:files.length,
  declaredReason:result.reason,
  touchedContracts:result.touched,
  violations:result.violations,
  negativeFixtures:{
    undeclaredImplementationAndContractChangeRejected:true,
    declaredAuthorityChangeAccepted:true,
    undeclaredContractDeletionRejected:true,
    declaredBugInTestAccepted:true
  },
  browserGoldenClaimed:false
};
console.log(JSON.stringify(output,null,2));
if(!result.pass)process.exit(1);
