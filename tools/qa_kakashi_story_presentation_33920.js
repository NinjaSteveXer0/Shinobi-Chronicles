#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert"),root=path.resolve(__dirname,"..");
const compat=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-story-presentation-compat-33920.js"),"utf8");
const canonical=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-scene-board-polish-33910.js"),"utf8");
const restoration=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-original-origin-restoration-33800.js"),"utf8");
const traversal=fs.readFileSync(path.join(root,"runtime","alpha-traversal-bridge-33200.js"),"utf8");

assert(compat.includes("academy_kakashi_story_presentation_compat_33920_retired_v7_2026_09_21"));
assert(!/new\s+MutationObserver\s*\(/.test(compat),"retired 33920 must not construct a DOM observer");
assert(!compat.includes("style.textContent")&&!compat.includes("addEventListener(\"click\""),"retired 33920 must own no CSS/click handler");
assert(!restoration.includes("alpha-kakashi-story-presentation-compat-33920.js"),"33800 must not production-load retired 33920");
assert(!canonical.includes('#story-scene-presentation-layer[data-sc-postmi-35830='),"retired 33920 route-specific dialogue geometry must not be folded back into 33910");
assert(restoration.includes('const BUILD="scene-board-20260922-21";'));
assert(traversal.includes('const SCENE_BOARD_BUILD="scene-board-20260922-21";'));

for(const marker of [
 "former 33920 compatibility behavior",
 "bindStageAdvance33910",
 "sc-scene-board-33900__actor-tag strong",
 "sc-dialogue-status-33910"
]){
 assert(canonical.includes(marker),"33910 missing folded compatibility marker: "+marker);
}

const ctx={console,Object,String,Array,Map,Set,JSON};
ctx.globalThis=ctx;ctx.window=ctx;
vm.createContext(ctx);
vm.runInContext(compat,ctx,{filename:"alpha-kakashi-story-presentation-compat-33920.js"});
const diag=ctx.runAcademyKakashiStoryPresentationCompat33920Diagnostics();
assert.strictEqual(diag.pass,true);
assert.strictEqual(diag.retired,true);

console.log(JSON.stringify({
 pass:true,
 patch:"33920-retired-v7",
 productionLoaded:false,
 replacedBy:"33910-v18",
 domObserver:false,
 browserGoldenClaimed:false
},null,2));
