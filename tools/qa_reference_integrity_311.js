#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
function read(rel){return fs.readFileSync(path.join(ROOT,rel),"utf8");}
function exists(rel){return fs.existsSync(path.join(ROOT,rel));}

const index=read("index.html");
const directScripts=[...index.matchAll(/<script\b[^>]*\bsrc=["']([^"'?#]+)(?:\?[^"']*)?["'][^>]*>/gi)].map(m=>m[1].replace(/^\.\//,""));
assert(directScripts.length>0,"#311 production direct script manifest empty");
assert.strictEqual(new Set(directScripts).size,directScripts.length,"#311 duplicate production script in index");
for(const rel of directScripts)assert(exists(rel),"#311 missing direct production module: "+rel);

const bridge=read("runtime/alpha-traversal-bridge-33200.js");
const dynamicScripts=[...bridge.matchAll(/loadOne\([^\n]*?["'](runtime\/[^"'?]+\.js)["']/g)].map(m=>m[1]);
assert(dynamicScripts.length>0,"#311 dynamic production runtime chain empty");
for(const rel of dynamicScripts)assert(exists(rel),"#311 missing dynamic production module: "+rel);

const loaded=new Set([...directScripts,...dynamicScripts]);
for(const rel of [
  "runtime/academy-kakashi-v2-content-36000.js",
  "runtime/alpha-kakashi-v2-battle-36010.js",
  "runtime/alpha-kakashi-v2-rewards-36015.js",
  "runtime/alpha-kakashi-v2-core-36020.js",
  "runtime/alpha-kakashi-v2-renderer-36030.js",
  "runtime/alpha-kakashi-v2-transition-36040.js"
]){
  assert(loaded.has(rel),"#311 Kakashi V2 production module not loaded: "+rel);
}

const scanFiles=[
  "runtime/academy-kakashi-v2-content-36000.js",
  "runtime/alpha-kakashi-v2-battle-36010.js",
  "runtime/alpha-kakashi-v2-rewards-36015.js",
  "runtime/alpha-kakashi-v2-core-36020.js",
  "runtime/alpha-kakashi-v2-renderer-36030.js",
  "runtime/alpha-battle-modern-33000.js"
];
const assetPattern=/["'`]((?:Assets|NPC|NPC portrait|Kakashi Origin Backdrop|Scene backdrops|UI|Backgrounds)\/[^"'\`]+?\.(?:png|jpg|jpeg|webp))["'`]/gi;
const refs=[];
for(const rel of scanFiles){
  const src=read(rel);
  for(const m of src.matchAll(assetPattern)){
    const asset=m[1];
    refs.push({owner:rel,asset});
  }
}
const uniqueRefs=[...new Map(refs.map(r=>[r.asset,r])).values()];
assert(uniqueRefs.length>=6,"#311 expected representative runtime asset references");
for(const row of uniqueRefs)assert(exists(row.asset),"#311 missing runtime asset ref "+row.asset+" from "+row.owner);

const content=read("runtime/academy-kakashi-v2-content-36000.js");
const speakers=[...content.matchAll(/"speakerName"\s*:\s*"([^"]+)"/g)].map(m=>m[1].trim());
assert(speakers.length>0,"#311 Kakashi content speaker refs missing");
assert(speakers.every(Boolean),"#311 blank Kakashi speaker ref");
assert(!speakers.some(s=>["TARGET","SECOND FIGURE","undefined","null"].includes(s)),"#311 stale/generic Kakashi speaker ref survived");

const core=read("runtime/alpha-kakashi-v2-core-36020.js");
const battle=read("runtime/alpha-kakashi-v2-battle-36010.js");
const rewards=read("runtime/alpha-kakashi-v2-rewards-36015.js");
assert(core.includes("SC_STORY_FACTUAL_RESOLVER_34600"),"#311 factual resolver reference missing from Kakashi core");
assert(core.includes("SC_STORY_DECISION_REALISATION_34000"),"#311 Story intent reference missing from Kakashi core");
assert(battle.includes("returnContext"),"#311 Kakashi Battle caller/return reference missing");
assert(rewards.includes("commitAcademyKakashiV2TerminalRewards36015"),"#311 reward commit reference missing");
assert(loaded.has("runtime/alpha-story-decision-realisation-34000.js"),"#311 Story decision module not production loaded");
assert(loaded.has("runtime/alpha-story-factual-resolver-34600.js"),"#311 factual resolver module not production loaded");

const ownership=JSON.parse(read("tools/fixtures/runtime_responsibility_registry_300.json"));
for(const row of ownership.responsibilities||[]){
  assert(exists(String(row.canonicalOwner).split("#")[0]),"#311 missing canonical owner: "+row.canonicalOwner);
  for(const rel of row.productionLoadPath||[])assert(exists(String(rel).split("#")[0]),"#311 missing declared production-load ref: "+rel);
}

console.log(JSON.stringify({
  pass:true,
  issue:311,
  directProductionModuleCount:directScripts.length,
  dynamicProductionModuleCount:dynamicScripts.length,
  representativeAssetRefCount:uniqueRefs.length,
  speakerRefCount:speakers.length,
  invariants:{
    productionModulesExist:true,
    productionLoadRefsExist:true,
    representativeAssetsExist:true,
    speakerRefsPresent:true,
    storyIntentResolverRefsPresent:true,
    battleCallerReturnRefPresent:true,
    rewardCommitRefPresent:true,
    canonicalOwnerRefsExist:true
  },
  browserGoldenClaimed:false
},null,2));
