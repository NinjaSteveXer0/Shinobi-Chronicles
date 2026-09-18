#!/usr/bin/env node
"use strict";

const fs=require("fs");
const vm=require("vm");
const path=require("path");
const assert=require("assert");
const source=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-objective-presentation-35720.js"),"utf8");

const layer={dataset:{}};
const nodes=new Map([["story-scene-presentation-layer",layer]]);
const head={appendChild(node){if(node&&node.id)nodes.set(node.id,node);return node;}};
globalThis.document={head,getElementById:id=>nodes.get(id)||null,createElement:tag=>({tagName:String(tag).toUpperCase(),id:"",textContent:""})};
let runtime={sceneId:"origin_academy_kakashi_anbu_retrieval",beatId:"kak_original_rooftop"};
let perf={index:0,cue:{cueId:"scene01_01",objectState:null}};
let renders=0,advances=0;
globalThis.getActiveStorySceneRuntime=()=>runtime;
globalThis.getStoryScenePerformance33900=()=>perf;
globalThis.renderStoryScenePresentationLayer=()=>{renders+=1;return true;};
globalThis.advanceStoryScene=()=>{advances+=1;return{success:true};};

vm.runInThisContext(source,{filename:"runtime/alpha-kakashi-objective-presentation-35720.js"});
const MOD=globalThis.SC_ALPHA_KAKASHI_OBJECTIVE_PRESENTATION_35720;
assert(MOD,"Objective presentation module missing");
const diag=globalThis.runKakashiObjectivePresentation35720Diagnostics();
assert.strictEqual(diag.pass,true,`Objective diagnostics failed: ${JSON.stringify(diag.failed)}`);
assert.strictEqual(MOD.revealCueId,"scene01_10");

// Earliest Rooftop cue: objective must not exist visibly.
globalThis.renderStoryScenePresentationLayer();
assert.strictEqual(layer.dataset.scKakashiObjectiveGate,"hidden");

// Immediately before Kakashi opens the envelope: still hidden.
perf={index:8,cue:{cueId:"scene01_09",objectState:"held"}};
globalThis.renderStoryScenePresentationLayer();
assert.strictEqual(layer.dataset.scKakashiObjectiveGate,"hidden");

// Exact opening/reveal cue: objective becomes visible.
perf={index:9,cue:{cueId:"scene01_10",objectState:"opened"}};
globalThis.renderStoryScenePresentationLayer();
assert.strictEqual(layer.dataset.scKakashiObjectiveGate,"revealed");

// Once Rooftop is left, normal Story objective presentation resumes.
runtime={sceneId:"origin_academy_kakashi_anbu_retrieval",beatId:"kak_original_tail"};
globalThis.renderStoryScenePresentationLayer();
assert.strictEqual(Object.prototype.hasOwnProperty.call(layer.dataset,"scKakashiObjectiveGate"),false);

const style=nodes.get("sc-kakashi-objective-presentation-35720-style");
assert(style&&style.textContent.includes("min-width:310px"));
assert(style.textContent.includes("min-height:62px"));
assert(style.textContent.includes("align-items:center"));
assert(style.textContent.includes("text-align:center"));
assert(style.textContent.includes("font-size:15px"));
assert(style.textContent.includes('data-sc-kakashi-objective-gate="hidden"'));
assert(renders>=4);
assert.strictEqual(advances,0);

console.log("Kakashi Objective Presentation 35720 QA: PASS");
console.log("- objective hidden through sealed-envelope-held cue");
console.log("- objective reveals only when Kakashi opens envelope / target photograph appears");
console.log("- enlarged Objective panel + larger centered objective text applies globally to Story Scene Board objective boxes");
console.log("- layer-level CSS gate survives board markup rebuilds without a new MutationObserver");