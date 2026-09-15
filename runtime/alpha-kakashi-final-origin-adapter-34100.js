// ============================================================================
// ISSUES #188 + #192 + #201 — ACADEMY KAKASHI FINAL ADAPTER LOADER — 34100
//
// The final semantic adapter is preserved byte-for-byte in the 34100 core file.
// Browser order is: semantic core -> stale-authority guard -> Combat deployment.
// Headless semantic QA loads only core + guard; full Battle QA loads 34300 with
// game.js so the Combat bridge is validated against the real Battle engine.
// ============================================================================
(function activateAlphaKakashiFinal34100(){
"use strict";

const CORE_PATH="runtime/alpha-kakashi-final-origin-adapter-34100-core.js";
const GUARD_PATH="runtime/alpha-kakashi-final-authority-guard-34200.js";
const BATTLE_PATH="runtime/alpha-kakashi-origin-battle-deployment-34300.js";
const BUILD="kakashi-final-20260915-4";

function builtin(name){
  if(typeof process!=="undefined"&&process&&typeof process.getBuiltinModule==="function")return process.getBuiltinModule(name);
  const req=typeof globalThis.require==="function"?globalThis.require:null;
  return req?req(name):null;
}
function loadHeadless(path){
  const fs=builtin("fs"),vm=builtin("vm"),pathModule=builtin("path");
  if(!fs||!vm||!pathModule||typeof process==="undefined")return false;
  const absolute=pathModule.resolve(process.cwd(),path);
  vm.runInThisContext(fs.readFileSync(absolute,"utf8"),{filename:path});
  return true;
}

if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function"){
  if(!globalThis.SC_ALPHA_KAKASHI_FINAL_34100&&!loadHeadless(CORE_PATH))return;
  if(!globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200)loadHeadless(GUARD_PATH);
  return;
}

function loadBattle(){
  if(globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300||document.getElementById("sc-alpha-kakashi-origin-battle-deployment-34300-script"))return;
  const battle=document.createElement("script");
  battle.id="sc-alpha-kakashi-origin-battle-deployment-34300-script";
  battle.src=`${BATTLE_PATH}?sc=${BUILD}`;
  battle.async=false;
  document.head.appendChild(battle);
}
function loadGuard(){
  if(globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200){loadBattle();return;}
  const existing=document.getElementById("sc-alpha-kakashi-final-authority-guard-34200-script");
  if(existing){existing.addEventListener("load",loadBattle,{once:true});return;}
  const guard=document.createElement("script");
  guard.id="sc-alpha-kakashi-final-authority-guard-34200-script";
  guard.src=`${GUARD_PATH}?sc=${BUILD}`;
  guard.async=false;
  guard.addEventListener("load",loadBattle,{once:true});
  document.head.appendChild(guard);
}

if(globalThis.SC_ALPHA_KAKASHI_FINAL_34100){loadGuard();return;}
const existing=document.getElementById("sc-alpha-kakashi-final-34100-core-script");
if(existing){existing.addEventListener("load",loadGuard,{once:true});return;}
const core=document.createElement("script");
core.id="sc-alpha-kakashi-final-34100-core-script";
core.src=`${CORE_PATH}?sc=${BUILD}`;
core.async=false;
core.addEventListener("load",loadGuard,{once:true});
document.head.appendChild(core);
})();
