#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const REGISTRY_PATH=path.join(ROOT,"tools/fixtures/runtime_responsibility_registry_300.json");
const DECLARATIONS_PATH=path.join(ROOT,"tools/fixtures/runtime_change_declarations_300.json");
const INDEX_PATH=path.join(ROOT,"index.html");
const LOADER_PATH=path.join(ROOT,"runtime/alpha-traversal-bridge-33200.js");

function read(rel){return fs.readFileSync(path.join(ROOT,rel),"utf8");}
function json(file){return JSON.parse(fs.readFileSync(file,"utf8"));}
function uniq(rows){return [...new Set(rows)];}
function clone(value){return JSON.parse(JSON.stringify(value));}
function ownerPath(owner){return String(owner||"").split("#")[0];}
function looksLikePath(value){return /(?:^|\/)(?:runtime|tools|\.github)\//.test(String(value||""))||/^(?:game\.js|index\.html)$/.test(String(value||""));}
function assertFile(rel,label){
  assert(rel&&fs.existsSync(path.join(ROOT,rel)),`${label||"file"} missing: ${rel}`);
}
function runtimeFiles(){
  const dir=path.join(ROOT,"runtime");
  return fs.readdirSync(dir).filter(name=>name.endsWith(".js")).map(name=>"runtime/"+name);
}
function directIndexScripts(indexSource){
  const out=[];
  const re=/<script\b[^>]*\bsrc=["']([^"'?#]+)(?:\?[^"']*)?["'][^>]*>/gi;
  for(let match; (match=re.exec(indexSource)); )out.push(match[1].replace(/^\.\//,""));
  return uniq(out);
}
function dynamicLoaderScripts(loaderSource){
  const out=[];
  const re=/loadOne\([^\n]*?["'](runtime\/[^"'?]+\.js)["']/g;
  for(let match; (match=re.exec(loaderSource)); )out.push(match[1]);
  return uniq(out);
}
function productionReachable(indexSource,loaderSource){
  return new Set(["index.html","game.js",...directIndexScripts(indexSource),...dynamicLoaderScripts(loaderSource)]);
}
function validateDynamicChain(registry,loaderSource){
  const chain=registry.productionDynamicChain||[];
  assert(chain.length>=2,"productionDynamicChain must contain an ordered shared/V2 chain");
  for(const rel of chain)assertFile(rel,"dynamic chain module");
  for(let i=0;i<chain.length-1;i++){
    const from=(chain[i].match(/(\d{5})(?=\.js$)/)||[])[1];
    const to=(chain[i+1].match(/(\d{5})(?=\.js$)/)||[])[1];
    assert(from&&to,`unable to derive loader ids: ${chain[i]} -> ${chain[i+1]}`);
    const row=new RegExp(`function\\s+load${from}\\(\\)\\{loadOne\\([^\\n]*,load${to}\\);\\}`);
    assert(row.test(loaderSource),`production dynamic load order missing: load${from} -> load${to}`);
  }
}
function validateResponsibilities(registry,reachable){
  const required=[
    "responsibilityId","canonicalOwner","ownerType","directCallers","stateReads","stateWrites",
    "productionLoadPath","extensionHooks","permittedAdapters","retiredOwners","saveSchemaRefs","qaRefs"
  ];
  const ids=new Set();
  const adapters=new Map((registry.adapters||[]).map(row=>[row.adapterId,row]));
  for(const row of registry.responsibilities||[]){
    for(const key of required)assert(Object.prototype.hasOwnProperty.call(row,key),`responsibility ${row.responsibilityId||"<unknown>"} missing ${key}`);
    assert(row.responsibilityId&&!ids.has(row.responsibilityId),`duplicate responsibilityId: ${row.responsibilityId}`);
    ids.add(row.responsibilityId);
    assertFile(ownerPath(row.canonicalOwner),`canonical owner for ${row.responsibilityId}`);
    for(const caller of row.directCallers)if(looksLikePath(caller))assertFile(ownerPath(caller),`direct caller for ${row.responsibilityId}`);
    for(const rel of row.productionLoadPath){
      assertFile(ownerPath(rel),`production load path for ${row.responsibilityId}`);
      if(rel!=="index.html")assert(reachable.has(ownerPath(rel)),`production load parity missing ${rel} for ${row.responsibilityId}`);
    }
    for(const qaRef of row.qaRefs)assertFile(qaRef,`QA ref for ${row.responsibilityId}`);
    for(const id of row.permittedAdapters)assert(adapters.has(id),`undeclared adapter ${id} for ${row.responsibilityId}`);
  }
  assert(ids.has("origin.academy_kakashi.v2.story_dom"),"Kakashi V2 Story DOM responsibility absent");
  assert(ids.has("origin.academy_kakashi.v2.semantic_advance"),"Kakashi V2 semantic advance responsibility absent");
  return ids;
}
function validateAdapters(registry){
  const ids=new Set();
  for(const row of registry.adapters||[]){
    assert(row.adapterId&&!ids.has(row.adapterId),`duplicate adapterId: ${row.adapterId}`);
    ids.add(row.adapterId);
    for(const key of ["reason","owner","sourceOwner","targetOwner","exactBehaviorBridged","retirementCondition","milestone","qaRef"]){
      assert(String(row[key]||"").trim(),`adapter ${row.adapterId} missing ${key}`);
    }
    assertFile(ownerPath(row.owner),`adapter owner ${row.adapterId}`);
    assertFile(ownerPath(row.sourceOwner),`adapter source ${row.adapterId}`);
    assertFile(ownerPath(row.targetOwner),`adapter target ${row.adapterId}`);
    assertFile(row.qaRef,`adapter QA ${row.adapterId}`);
    if(row.temporary===true)assert(!/tbd|unknown|indefinite/i.test(row.retirementCondition),`temporary adapter ${row.adapterId} has unbounded retirement condition`);
  }
}
function validateSurfaceContracts(registry){
  const ids=new Set();
  const responsibilities=new Map((registry.responsibilities||[]).map(row=>[row.responsibilityId,row]));
  for(const row of registry.surfaceContracts||[]){
    assert(row.surfaceId&&!ids.has(row.surfaceId),`duplicate surfaceId: ${row.surfaceId}`);
    ids.add(row.surfaceId);
    assert(Array.isArray(row.owners)&&row.owners.length===1,`surface ${row.surfaceId} must have exactly one canonical visible owner`);
    assertFile(ownerPath(row.owners[0]),`surface owner ${row.surfaceId}`);
    assertFile(ownerPath(row.semanticAdvanceOwner),`semantic advance owner ${row.surfaceId}`);
    assertFile(row.browserQaRef,`browser cardinality QA ${row.surfaceId}`);
    const browser=read(row.browserQaRef);
    assert(browser.includes(row.rootSelector),`browser QA missing root selector for ${row.surfaceId}`);
    assert(browser.includes(row.visibleTextSelector),`browser QA missing text selector for ${row.surfaceId}`);
    assert(browser.includes("getClientRects")&&browser.includes("visibleLegacyStorySurfaces"),`browser QA for ${row.surfaceId} must assert live DOM visibility/cardinality`);
    const domResp=responsibilities.get("origin.academy_kakashi.v2.story_dom");
    if(row.surfaceId==="academy_kakashi_v2_story_surface")assert(domResp&&domResp.canonicalOwner===row.owners[0],"Kakashi V2 surface owner disagrees with responsibility registry");
  }
}
function validateSemanticOwners(registry){
  const seen=new Map();
  for(const row of registry.semanticOwners||[]){
    assert(row.semanticId&&row.owner&&row.responsibilityId,"semantic owner row incomplete");
    if(seen.has(row.semanticId))throw new Error(`duplicate semantic owner: ${row.semanticId} -> ${seen.get(row.semanticId)} + ${row.owner}`);
    seen.set(row.semanticId,row.owner);
    assertFile(ownerPath(row.owner),`semantic owner ${row.semanticId}`);
  }
}
function validateWrapperChains(registry,reachable){
  for(const row of registry.globalWrapperChains||[]){
    assert(row.symbol&&Array.isArray(row.chain)&&row.chain.length>=1,"global wrapper chain incomplete");
    assert(row.chain[row.chain.length-1]===row.canonicalActiveOwner,`wrapper chain ${row.symbol} canonical owner must be final explicit owner`);
    for(const rel of row.chain){
      assertFile(rel,`wrapper chain ${row.symbol}`);
      assert(reachable.has(rel),`wrapper chain module not production reachable: ${rel}`);
      assert(read(rel).includes(`globalThis.${row.symbol}=`),`declared wrapper ${rel} does not assign ${row.symbol}`);
    }
    const producers=[];
    for(const rel of reachable){
      if(!String(rel).startsWith("runtime/")||!fs.existsSync(path.join(ROOT,rel)))continue;
      if(read(rel).includes(`globalThis.${row.symbol}=`))producers.push(rel);
    }
    const undeclared=producers.filter(rel=>!row.chain.includes(rel));
    assert.deepStrictEqual(undeclared,[],`undeclared production wrapper(s) for ${row.symbol}: ${undeclared.join(", ")}`);
  }
}
function retiredOwners(registry){
  return uniq((registry.responsibilities||[]).flatMap(row=>row.retiredOwners||[]));
}
function findRetiredReferences(registry,texts){
  const refs=[];
  for(const retired of retiredOwners(registry)){
    const base=path.basename(retired);
    for(const [file,src] of Object.entries(texts))if(String(src).includes(base))refs.push({file,retired});
  }
  return refs;
}
function validateRetirement(registry){
  const retired=retiredOwners(registry);
  for(const rel of retired)assert.strictEqual(fs.existsSync(path.join(ROOT,rel)),false,`retired owner still exists: ${rel}`);
  const texts={"index.html":read("index.html")};
  for(const rel of runtimeFiles())texts[rel]=read(rel);
  assert.deepStrictEqual(findRetiredReferences(registry,texts),[],"retired owner remains referenced by production source");
  return retired.length;
}
function validateDeclarations(declarations,registry){
  assert.deepStrictEqual(declarations.allowedClassifications,["NEW","EXTENDS","REPLACES"],"change classification enum drifted");
  const respIds=new Set((registry.responsibilities||[]).map(row=>row.responsibilityId));
  const ids=new Set();
  for(const row of declarations.declarations||[]){
    assert(row.changeId&&!ids.has(row.changeId),`duplicate changeId: ${row.changeId}`);ids.add(row.changeId);
    assert(declarations.allowedClassifications.includes(row.classification),`invalid change classification: ${row.classification}`);
    assert(row.owner&&Array.isArray(row.responsibilityIds)&&row.responsibilityIds.length,`change declaration incomplete: ${row.changeId}`);
    for(const id of row.responsibilityIds){
      if(id.startsWith("runtime.safety."))continue;
      assert(respIds.has(id),`change declaration references unknown responsibility: ${id}`);
    }
    for(const qaRef of row.qaRefs||[])assertFile(qaRef,`change QA ${row.changeId}`);
    if(row.classification==="REPLACES")assert(Array.isArray(row.replaces)&&row.replaces.length>0,`REPLACES declaration missing retired owner: ${row.changeId}`);
    if(row.classification!=="REPLACES")assert(Array.isArray(row.replaces)&&row.replaces.length===0,`${row.classification} declaration must not name replaced owners: ${row.changeId}`);
  }
}
function runNegativeFixtures(registry){
  const results={};

  const duplicateSurface=clone(registry);
  duplicateSurface.surfaceContracts[0].owners.push("runtime/alpha-story-scene-board-33900.js");
  assert.throws(()=>validateSurfaceContracts(duplicateSurface),/exactly one canonical visible owner/);
  results.duplicateRendererOwnerRejected=true;

  const duplicateSemantic=clone(registry);
  duplicateSemantic.semanticOwners.push({
    semanticId:duplicateSemantic.semanticOwners[0].semanticId,
    owner:"runtime/alpha-story-scene-board-33900.js",
    responsibilityId:"story.scene.presentation.shared"
  });
  assert.throws(()=>validateSemanticOwners(duplicateSemantic),/duplicate semantic owner/);
  results.duplicateSemanticRegistrationRejected=true;

  const firstRetired=retiredOwners(registry)[0];
  assert(firstRetired,"negative retired-owner fixture requires at least one retired owner");
  const refs=findRetiredReferences(registry,{"fixture-loader.js":`load "${path.basename(firstRetired)}"`});
  assert(refs.length===1,"retired-owner reintroduction fixture was not detected");
  results.retiredOwnerReintroducedRejected=true;

  const duplicateResponsibility=clone(registry);
  duplicateResponsibility.responsibilities.push(clone(duplicateResponsibility.responsibilities[0]));
  const fakeReachable=new Set(["index.html","game.js",...duplicateResponsibility.productionDynamicChain,"runtime/alpha-traversal-bridge-33200.js","runtime/alpha-alpha-sprint-33100.js"]);
  assert.throws(()=>validateResponsibilities(duplicateResponsibility,fakeReachable),/duplicate responsibilityId/);
  results.duplicateResponsibilityRejected=true;

  return results;
}

const registry=json(REGISTRY_PATH);
const declarations=json(DECLARATIONS_PATH);
const indexSource=read("index.html");
const loaderSource=read("runtime/alpha-traversal-bridge-33200.js");
const reachable=productionReachable(indexSource,loaderSource);

validateDynamicChain(registry,loaderSource);
const responsibilityIds=validateResponsibilities(registry,reachable);
validateAdapters(registry);
validateSurfaceContracts(registry);
validateSemanticOwners(registry);
validateWrapperChains(registry,reachable);
const retiredCount=validateRetirement(registry);
validateDeclarations(declarations,registry);
const negativeFixtures=runNegativeFixtures(registry);

const kakashiBrowser=read("tools/qa_kakashi_v2_browser.js");
assert(kakashiBrowser.includes("visibleCanonicalRoots"),"Browser QA must assert canonical root cardinality");
assert(kakashiBrowser.includes("singleAdvanceClick"),"Browser QA must prove one click -> one cue advance");
assert(kakashiBrowser.includes("singleAdvanceKeyboard"),"Browser QA must prove one keyboard action -> one cue advance");

console.log(JSON.stringify({
  pass:true,
  issue:300,
  changeClassificationGate:"GREEN",
  responsibilityRegistry:{status:"GREEN",count:responsibilityIds.size},
  duplicateOwnerGate:"GREEN",
  legacyExclusion:{status:"GREEN",retiredOwners:retiredCount},
  productionLoadParity:{status:"GREEN",reachableModuleCount:reachable.size,dynamicChainCount:registry.productionDynamicChain.length},
  adapterRetirementMetadata:{status:"GREEN",adapterCount:(registry.adapters||[]).length},
  playerFacingCardinality:{status:"GREEN",browserQa:"tools/qa_kakashi_v2_browser.js"},
  semanticOwnerUniqueness:"GREEN",
  negativeFixtures,
  browserGoldenClaimed:false
},null,2));
