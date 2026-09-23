// ALPHA ORIGIN CHOICE REACTION 33510
// Completes the player-visible choice-response pass begun by 33500 for the
// remaining legacy 32900 expression consumer: Kushina. Academy Obito is owned by final #331 runtime.
(function installAlphaOriginChoiceReaction33510(){
"use strict";
if(globalThis.SC_ALPHA_ORIGIN_CHOICE_REACTION_33510)return;
const PATCH_ID="alpha_origin_choice_reaction_33510_2026_09_13";
const patched=[];

function definition(sceneId){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(sceneId):null;}catch(_error){return null;}}
function editable(sceneId){const def=definition(sceneId);if(!def)return null;const beats=Array.isArray(def.beats)?def.beats.map(b=>({...b,choices:Array.isArray(b.choices)?b.choices.map(c=>({...c})):b.choices})):def.beatMap instanceof Map?Array.from(def.beatMap.values()).map(b=>({...b,choices:Array.isArray(b.choices)?b.choices.map(c=>({...c})):b.choices})):[];if(!beats.length)return null;const copy={...def,beats};delete copy.beatMap;return copy;}
function beat(def,id){return def&&def.beats?def.beats.find(b=>b&&b.beatId===id)||null:null;}
function add(def,row){const old=beat(def,row.beatId);if(old)Object.assign(old,row);else def.beats.push(row);}
function commit(def){if(!def||typeof registerStoryScene!=="function")return false;try{if(typeof unregisterStoryScene==="function")unregisterStoryScene(def.sceneId);}catch(_error){}const out=registerStoryScene(def);if(out&&out.success===false)return false;patched.push(def.sceneId);return true;}

function patchKushina(){
  const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)return false;
  const def=editable(A.sceneByVariant.academy_kushina);if(!def)return false;
  const contact=beat(def,"kus_contact_choice"),close=beat(def,"kus_close");if(!contact||!close)return false;
  for(const choice of contact.choices||[])choice.nextBeatId="kus_contact_result";
  add(def,{beatId:"kus_contact_result",mode:"narration",environmentRef:contact.environmentRef||close.environmentRef,
    presentationResolver:()=>{
      const selected=A.local().kushinaGerotoraChoice;
      return{text:{
        ask_what_happened:"Gerotora studies the residual formula and explains only what it supports: Kushina corrected the seal, but the correction connected somewhere it was never meant to reach.",
        ask_who:"Gerotora gives his name: Gerotora. Kushina now has that identity because he actually communicated it to her in this first contact.",
        help_close:"Kushina and Gerotora work together to stabilise and close the residual connection. The cooperation happened; it does not turn his sealing knowledge into hers.",
        send_back:"Kushina moves to terminate the unintended connection. Gerotora corrects and assists the return where his own seal knowledge is needed, and the first contact stays brief and irritated."
      }[selected]||"The first contact resolves according to what Kushina actually chose to do."};
    },nextBeatId:"kus_close"});
  return commit(def);
}

// Academy Kakashi legacy choice-reaction patch retired for clean-room V2.

const result={kushina:patchKushina()};
function runAlphaOriginChoiceReaction33510Diagnostics(){const A=globalThis.SC_ALPHA_ORIGIN_32900;const kush=A&&definition(A.sceneByVariant.academy_kushina);const checks={patchId:PATCH_ID==="alpha_origin_choice_reaction_33510_2026_09_13",kushinaPatchGreen:result.kushina===true,kakashiLegacyPatchRetired:!Object.prototype.hasOwnProperty.call(result,"kakashi"),obitoLegacyPatchRetired:!Object.prototype.hasOwnProperty.call(result,"obito")&&!String(globalThis.SC_ALPHA_ORIGIN_CHOICE_REACTION_33510||"").includes("patchObito"),kushinaChoiceResult:!!(kush&&kush.beatMap&&kush.beatMap.has("kus_contact_result")),browserGoldenClaimed:false};const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,patched:[...patched],browserGoldenClaimed:false};}
globalThis.SC_ALPHA_ORIGIN_CHOICE_REACTION_33510=Object.freeze({patchId:PATCH_ID,result:{...result},browserGoldenClaimed:false});
globalThis.runAlphaOriginChoiceReaction33510Diagnostics=runAlphaOriginChoiceReaction33510Diagnostics;
})();

// ============================================================================
// ISSUE #105 / #170 — ACTIVATE SCREEN-FIRST ORIGIN PERFORMANCE AFTER 33600
//
// 33700 is the terminal Origin expression layer. It must run after 33600 so the
// v2 screen-first Writing package wins over the earlier modernization layer.
// This activation deliberately chains from the existing 33510 -> 33600 load
// event rather than creating another independent bootstrap path.
// ============================================================================
(function activateOriginScreenFirst33700After33600(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;

  function load33700(){
    if(globalThis.SC_ALPHA_ORIGIN_SCREEN_FIRST_33700||document.getElementById("sc-alpha-origin-screen-first-33700-script"))return;
    const script=document.createElement("script");
    script.id="sc-alpha-origin-screen-first-33700-script";
    script.src="runtime/alpha-origin-screen-first-33700.js";
    script.async=false;
    document.head.appendChild(script);
  }

  function waitFor33600(){
    if(globalThis.SC_ALPHA_EARLY_STORY_MODERNIZATION_33600){load33700();return;}
    const modern=document.getElementById("sc-alpha-early-story-modernization-33600-script");
    if(modern)modern.addEventListener("load",load33700,{once:true});
  }

  const current=document.currentScript;
  if(current&&typeof current.addEventListener==="function"){
    current.addEventListener("load",waitFor33600,{once:true});
  }else{
    waitFor33600();
  }
})();
