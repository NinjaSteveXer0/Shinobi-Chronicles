#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const cp=require("child_process");
const crypto=require("crypto");

const ROOT=path.resolve(__dirname,"..");
function read(rel){return fs.readFileSync(path.join(ROOT,rel),"utf8");}
function parseList(value){return String(value||"").split(",").map(x=>x.trim()).filter(Boolean);}
function gitHead(){return cp.execFileSync("git",["rev-parse","HEAD"],{cwd:ROOT,encoding:"utf8"}).trim();}
function args(argv){
  const out={};
  for(let i=0;i<argv.length;i++)if(argv[i].startsWith("--"))out[argv[i].slice(2)]=argv[++i];
  return out;
}

const a=args(process.argv.slice(2));
const contract=JSON.parse(read("tools/fixtures/release_candidate_evidence_contract_311.json"));
const fingerprint=JSON.parse(read("tools/fixtures/runtime_build_manifest_303.json"));
const index=read("index.html");
const bridge=read("runtime/alpha-traversal-bridge-33200.js");
const scripts=[...index.matchAll(/<script\b[^>]*\bsrc=["']([^"'?#]+)(?:\?[^"']*)?["'][^>]*>/gi)].map(m=>m[1].replace(/^\.\//,""));
const dynamic=[...bridge.matchAll(/loadOne\([^\n]*?["'](runtime\/[^"'?]+\.js)["']/g)].map(m=>m[1]);
const loadHash=crypto.createHash("sha256").update(JSON.stringify({scripts,dynamic})).digest("hex");
const head=gitHead();
const localSync=String(process.env.SC_LOCAL_SYNC_REQUIREMENT||"NOT_REQUIRED").toUpperCase();
if(!contract.localSyncValues.includes(localSync))throw new Error("invalid SC_LOCAL_SYNC_REQUIREMENT");

const manifest={
  schemaVersion:contract.schemaVersion,
  manifestVersion:contract.manifestVersion,
  authorityRef:contract.authorityRef,
  candidateHead:head,
  runtimeFingerprint:fingerprint.buildId,
  productionLoadManifestVersion:"index+dynamic-load-chain-v1:"+loadHash.slice(0,16),
  requiredQASuite:[
    "merge-safety-gate",
    "runtime-ownership-300",
    "post-battle-agency-278",
    "runtime-fingerprint-303",
    "contract-integrity-311",
    "story-reachability-311",
    "save-compatibility-311",
    "reference-integrity-311",
    "browser-runtime-error-311"
  ],
  knownNonBlockingIssues:parseList(process.env.SC_KNOWN_NONBLOCKERS),
  knownBlockingIssues:parseList(process.env.SC_KNOWN_BLOCKERS),
  saveCompatibilityResult:String(process.env.SC_SAVE_COMPATIBILITY_RESULT||"UNKNOWN"),
  browserErrorResult:String(process.env.SC_BROWSER_ERROR_RESULT||"UNKNOWN"),
  localSyncRequirement:localSync,
  expectedLocalHead:String(process.env.SC_EXPECTED_LOCAL_HEAD||head),
  generatedFor:String(process.env.SC_EVIDENCE_PURPOSE||"automated_candidate"),
  browserGoldenClaimed:false
};

for(const field of contract.requiredFields){
  if(!Object.prototype.hasOwnProperty.call(manifest,field))throw new Error("missing release-candidate field: "+field);
}
if(a.out){
  const target=path.resolve(ROOT,a.out);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,JSON.stringify(manifest,null,2)+"\n");
}
console.log(JSON.stringify(manifest,null,2));
