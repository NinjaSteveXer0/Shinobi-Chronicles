#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const manifest=JSON.parse(read("tools/fixtures/academy_kakashi_runtime_owner_map_36100.json"));
assert.strictEqual(manifest.schema,"shinobi-chronicles.academy-kakashi.runtime-owner-map.v1");
assert.strictEqual(manifest.browserGoldenClaimed,false);
assert.deepStrictEqual(manifest.unresolvedCompetingOwners,[],"canonical owner map still contains unresolved competing owners");

const loader=read("runtime/alpha-kakashi-final-origin-adapter-34100.js");
const storyDecision=read("runtime/alpha-story-decision-realisation-34000.js");
const integrator=read("runtime/alpha-origin-scenes-32900-integrator.js");
const restoration=read("runtime/alpha-kakashi-original-origin-restoration-33800.js");
const board=read("runtime/alpha-story-scene-board-33900.js");
const polish=read("runtime/alpha-kakashi-scene-board-polish-33910.js");
const terminal=read("runtime/alpha-kakashi-terminal-debrief-35100.js");
const dynamicTerminal=read("runtime/alpha-kakashi-dynamic-terminal-35940.js");

assert(/^const BUILD="kakashi-final-20260922-94";$/m.test(loader),"Kakashi loader not on gen94");
assert(/story-decision-20260922-22/.test(integrator),"root Story delivery not generation 22");
assert(/kakashi-final-20260922-94/.test(storyDecision),"Story Decision does not deliver Kakashi gen94");
assert(/scene-board-20260922-18/.test(restoration),"Scene Board bootstrap not generation 18");

const loaded=[...loader.matchAll(/const\s+[A-Z0-9_]+_PATH="([^"]+)"/g)].map(m=>m[1]);
assert.strictEqual(loaded.length,31,"unexpected Kakashi production child count; reconcile owner map before changing loader");

for(const retired of manifest.retiredOwners){
  assert.strictEqual(retired.classification,"DEAD/UNREACHABLE");
  assert.strictEqual(retired.productionLoaded,false);
  assert(!loaded.includes(retired.file),"retired owner is production-loaded: "+retired.file);
  const src=read(retired.file);
  if(retired.file.endsWith("33920.js")){
    assert(src.includes("33920 RETIRED")||src.includes("retired"),"33920 retirement marker missing");
    assert(!/new\s+MutationObserver\s*\(/.test(src),"retired 33920 still constructs observer");
  }else{
    assert(src.includes("RETIRED — 2026-09-21"),"retirement tombstone missing: "+retired.file);
    assert(src.includes("Intentionally no runtime side effects."),"retired owner is not inert: "+retired.file);
  }
}

const loadedSources=new Map(loaded.map(file=>[file,read(file)]));
for(const [file,src] of loadedSources){
  assert(!/globalThis\.renderStoryScenePresentationLayer\s*=(?!=)/.test(src),"route module still owns global Story renderer: "+file);
  assert(!src.includes("sc-dialogue-panel-33910"),"route module still owns Kakashi dialogue geometry: "+file);
}
assert(/globalThis\.renderStoryScenePresentationLayer\s*=renderStoryScenePresentationLayer33910/.test(polish),"33910 is not the sole Kakashi Story renderer wrapper");
assert(polish.includes("sc-dialogue-panel-33910")&&polish.includes("top:4%!important"),"33910 canonical dialogue geometry missing");
assert(board.includes("registerStorySceneBoardRenderHook")&&board.includes("runStorySceneBoardRenderHooks"),"33900 render-hook ownership missing");
assert(board.includes('background:#020508!important')&&board.includes('layer.style.setProperty("--sc-scene-board-backdrop"'),"33900 fail-closed full-screen backdrop ownership missing");

for(const asset of [
 "Kakashi Origin Backdrop/rooftop_night.png",
 "Kakashi Origin Backdrop/konoha_alleyway.png",
 "Kakashi Origin Backdrop/sakura_tree_night.png",
 "Kakashi Origin Backdrop/fight_at_sakura_tree.png",
 "Kakashi Origin Backdrop/konoha_alleyway_alt_night.png",
 "Kakashi Origin Backdrop/end_of_alleyway.png",
 "Kakashi Origin Backdrop/alleyway_konoha_night.png",
 "Kakashi Origin Backdrop/uchiha_police_exterior_night.png",
 "Kakashi Origin Backdrop/hokage_administration_interior_night.png"
]) assert(restoration.includes(asset),"central Kakashi backdrop registration missing: "+asset);

const completionCallOwners=[];
for(const [file,src] of loadedSources){
  if(/completeChronicleOriginPrologue\s*\(/.test(src))completionCallOwners.push(file);
}
assert.deepStrictEqual(completionCallOwners,["runtime/alpha-kakashi-terminal-debrief-35100.js"],"Kakashi Origin completion has more than one live owner");
assert(terminal.includes('objectiveText="Report the mission outcome to ANBU."'),"terminal report objective is not explicit");
assert(terminal.includes('objectiveText:"Private review of the sealed field record."'),"Hokage/Receipt objective is not explicit");
assert(terminal.includes('objectiveText:"",text:"YOUR CHRONICLE BEGINS"'),"final Chronicle boundary does not clear stale objective");
assert(!/commitOccurrence|recordParticipantClassification|savePlayerData/.test(dynamicTerminal.slice(dynamicTerminal.indexOf("function reportText35940"),dynamicTerminal.indexOf("function diagnostics"))),"35940 terminal projection writes semantic state");

const observerOwners=[];
for(const [file,src] of loadedSources)if(/new\s+MutationObserver\s*\(/.test(src))observerOwners.push(file);
assert.deepStrictEqual(observerOwners.sort(),[
 "runtime/alpha-kakashi-battle-interaction-hotfix-34500.js",
 "runtime/alpha-kakashi-substitution-34900.js"
].sort(),"unexpected MutationObserver owner in Kakashi production chain");

const badClasses=manifest.responsibilities.filter(row=>["SUPERSEDED BUT STILL LIVE","UNKNOWN"].includes(row.classification));
assert.deepStrictEqual(badClasses,[],"owner map retains unresolved live classifications");

console.log(JSON.stringify({
 pass:true,
 ownerMap:manifest.schema,
 loadedKakashiChildren:loaded.length,
 retiredOwners:manifest.retiredOwners.map(x=>x.file),
 soleStoryRenderer:"runtime/alpha-kakashi-scene-board-polish-33910.js",
 soleBackdropLifecycle:"runtime/alpha-story-scene-board-33900.js",
 soleCompletionOwner:"runtime/alpha-kakashi-terminal-debrief-35100.js",
 observerOwners,
 unresolvedCompetingOwners:0,
 browserGoldenClaimed:false
},null,2));
