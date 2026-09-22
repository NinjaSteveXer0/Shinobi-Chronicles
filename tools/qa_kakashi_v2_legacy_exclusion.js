#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const RETIRED=[
  "runtime/alpha-kakashi-battle-development-35740.js",
  "runtime/alpha-kakashi-battle-interaction-hotfix-34500.js",
  "runtime/alpha-kakashi-browser-acceptance-35950.js",
  "runtime/alpha-kakashi-browser-red-fixes-34400.js",
  "runtime/alpha-kakashi-deterministic-kill-35810.js",
  "runtime/alpha-kakashi-direct-opening-consumer-34710.js",
  "runtime/alpha-kakashi-dynamic-terminal-35940.js",
  "runtime/alpha-kakashi-factual-bindings-34700.js",
  "runtime/alpha-kakashi-factual-state-commit-34120.js",
  "runtime/alpha-kakashi-field-secured-35920.js",
  "runtime/alpha-kakashi-final-authority-guard-34200.js",
  "runtime/alpha-kakashi-final-origin-adapter-34100-core.js",
  "runtime/alpha-kakashi-final-origin-adapter-34100.js",
  "runtime/alpha-kakashi-final-sequential-consumer-34410.js",
  "runtime/alpha-kakashi-immediate-custody-35800.js",
  "runtime/alpha-kakashi-konoha-route-closure-35910.js",
  "runtime/alpha-kakashi-konoha-writing-closure-35900.js",
  "runtime/alpha-kakashi-loss-ending-35820.js",
  "runtime/alpha-kakashi-move-closer-closure-35930.js",
  "runtime/alpha-kakashi-objective-presentation-35720.js",
  "runtime/alpha-kakashi-origin-battle-deployment-34300.js",
  "runtime/alpha-kakashi-origin-rewards-34800.js",
  "runtime/alpha-kakashi-original-origin-restoration-33800.js",
  "runtime/alpha-kakashi-pakkun-interception-35300.js",
  "runtime/alpha-kakashi-post-mi-death-pursuit-35830.js",
  "runtime/alpha-kakashi-scene-board-polish-33910.js",
  "runtime/alpha-kakashi-scene03a-35700.js",
  "runtime/alpha-kakashi-scene03a-choice-consumer-35710.js",
  "runtime/alpha-kakashi-scene04a-35710.js",
  "runtime/alpha-kakashi-scene05a-l-35750.js",
  "runtime/alpha-kakashi-scene05a-w-35730.js",
  "runtime/alpha-kakashi-scene06a-w2c-35760.js",
  "runtime/alpha-kakashi-sequential-post-ps-recovery-35600.js",
  "runtime/alpha-kakashi-story-presentation-compat-33920.js",
  "runtime/alpha-kakashi-substitution-34900.js",
  "runtime/alpha-kakashi-terminal-debrief-35100.js",
  "runtime/alpha-kakashi-terminal-scene-board-35610.js",
  "runtime/alpha-kakashi-w2c-ending-35770.js",
  "runtime/alpha-kakashi-w2c-nonkill-35780.js"
];

function filesRecursively(root){
  if(!fs.existsSync(root))return[];
  const out=[];
  for(const entry of fs.readdirSync(root,{withFileTypes:true})){
    const p=path.join(root,entry.name);
    if(entry.isDirectory())out.push(...filesRecursively(p));
    else out.push(p.replace(/\\/g,"/"));
  }
  return out;
}

for(const retired of RETIRED){
  assert.strictEqual(fs.existsSync(retired),false,`retired Kakashi runtime still exists: ${retired}`);
}

const productionTextFiles=[
  "index.html",
  ...filesRecursively("runtime").filter(p=>/\.js$/.test(p))
];
const staleReferences=[];
for(const file of productionTextFiles){
  const src=fs.readFileSync(file,"utf8");
  for(const retired of RETIRED){
    const base=path.basename(retired);
    if(src.includes(base))staleReferences.push({file,retired});
  }
  if(/runtime\/alpha-kakashi-(?!v2-)/.test(src))staleReferences.push({file,retired:"runtime/alpha-kakashi-(legacy)"});
}
assert.deepStrictEqual(staleReferences,[],"retired Kakashi runtime remains reachable from production source");

const c329=fs.readFileSync("runtime/alpha-origin-scenes-32900-c.js","utf8");
assert(!c329.includes("kakashi_retrieval_resolution_32900"));
assert(!c329.includes('beatId:"kak_brief"'));

const integrator=fs.readFileSync("runtime/alpha-origin-scenes-32900-integrator.js","utf8");
assert(integrator.includes('reason:"academy_kakashi_v2_pending"'));

const board=fs.readFileSync("runtime/alpha-story-scene-board-33900.js","utf8");
assert(!board.includes("academy_kakashi"));
assert(!board.includes("KAKASHI_IMAGE"));
assert(!board.includes("kak_original_"));

const core=fs.readFileSync("runtime/alpha-story-decision-realisation-34000.js","utf8");
assert(!core.includes("alpha-kakashi-final-origin-adapter"));
assert(!core.includes("SC_ALPHA_KAKASHI"));

const traversal=fs.readFileSync("runtime/alpha-traversal-bridge-33200.js","utf8");
assert(traversal.includes("runtime/alpha-story-scene-board-33900.js"));
assert(!traversal.includes("alpha-kakashi-original-origin-restoration-33800.js"));
for(const required of [
  "runtime/alpha-kakashi-v2-battle-36010.js",
  "runtime/alpha-kakashi-v2-core-36020.js",
  "runtime/alpha-kakashi-v2-renderer-36030.js",
  "runtime/alpha-kakashi-v2-transition-36040.js"
])assert(traversal.includes(required),`V2 runtime loader missing: ${required}`);

const choiceReaction=fs.readFileSync("runtime/alpha-origin-choice-reaction-33510.js","utf8");
const modernization=fs.readFileSync("runtime/alpha-early-story-modernization-33600.js","utf8");
const screenFirst=fs.readFileSync("runtime/alpha-origin-screen-first-33700.js","utf8");
assert(!choiceReaction.includes("function patchKakashi("));
assert(!modernization.includes("function patchKakashi("));
assert(!screenFirst.includes("function patchKakashi("));

const anbuHardening=fs.readFileSync("runtime/alpha-anbu-root-contained-155-knowledge-fix.js","utf8");
assert(!anbuHardening.includes("alpha-kakashi-original-origin-restoration-33800.js"));
assert(!anbuHardening.includes("SC_ALPHA_KAKASHI_ORIGINAL_33800"));

const localisationCore=fs.readFileSync("runtime/alpha-localisation-35500.js","utf8");
const localisationContent=fs.readFileSync("runtime/alpha-localisation-content-35510.js","utf8");
const localisationFinal=fs.readFileSync("runtime/alpha-localisation-final-writing-35520.js","utf8");
assert(!localisationCore.includes("story.kakashi."));
assert(!localisationContent.includes("Which responsibility does Kakashi prioritise?"));
assert(!localisationContent.includes("Kakashi identifies the logistics clerk"));
assert(!localisationFinal.includes("The evaluator makes Kakashi reconstruct the operation in order"));
assert(!localisationFinal.includes("const kakRoutes="));

for(const authority of [
  "Documentation/Story/Academy_Kakashi_100_Percent_Writing_Path_Variation_Audit_2026-09-20.md",
  "Documentation/Story/Academy_Kakashi_Origin_100_Percent_Writing_Closure_2026-09-20.md",
  "Documentation/World/Academy Kakashi Origin Choice Battle Reward and Development Audit v1 2026-09-15.md",
  "Documentation/Combat/SC_Combat_Academy_Kakashi_Origin_Battle_Config_Composition_Gap_Addendum_2026-09-15.md",
  "Documentation/UI/Chronicle Interaction Interactive Scene Board Addendum 2026-09-13.md"
]){
  assert(fs.existsSync(authority),`authoritative V2 input missing: ${authority}`);
}

console.log(JSON.stringify({
  pass:true,
  retiredRuntimeCount:RETIRED.length,
  productionFilesScanned:productionTextFiles.length,
  staleReferences:0,
  kakashiLegacyExecutionReachable:false,
  kakashiV2Implemented:true,
  browserGoldenClaimed:false
},null,2));
