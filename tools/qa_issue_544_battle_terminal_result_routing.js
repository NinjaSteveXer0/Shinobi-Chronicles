#!/usr/bin/env node
"use strict";

const assert=require("assert");
const fs=require("fs");
const path=require("path");

const ROOT=path.resolve(__dirname,"..");
const MODE=String(process.env.ISSUE_544_MODE||"probe").toLowerCase();
assert(["probe","assert"].includes(MODE),"ISSUE_544_MODE must be probe or assert");

const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");
const exists=rel=>fs.existsSync(path.join(ROOT,rel));
const game=read("game.js");
const sprint=read("runtime/alpha-alpha-sprint-33100.js");
const modern=read("runtime/alpha-battle-modern-33000.js");
const menma=read("runtime/alpha-menma-evolved-pl-battle-36900.js");

function bodyOf(src,name){
  const start=src.indexOf(`function ${name}`);
  assert(start>=0,`missing function ${name}`);
  const brace=src.indexOf("{",start);
  assert(brace>=0,`missing body for ${name}`);
  let depth=0,quote=null,escape=false;
  for(let i=brace;i<src.length;i++){
    const ch=src[i];
    if(quote){
      if(escape){escape=false;continue;}
      if(ch==="\\"){escape=true;continue;}
      if(ch===quote)quote=null;
      continue;
    }
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue;}
    if(ch==="{")depth++;
    else if(ch==="}"){
      depth--;
      if(depth===0)return src.slice(start,i+1);
    }
  }
  throw new Error(`unterminated function ${name}`);
}

assert(exists("UI/victory.png"),"missing lowercase UI/victory.png");
assert(exists("UI/setback.png"),"missing lowercase UI/setback.png");
assert(/UI\/victory\.png/.test(sprint),"#33100 no longer references lowercase Victory art");
assert(/UI\/setback\.png/.test(sprint),"#33100 no longer references lowercase Setback art");
assert(/renderSetback33100/.test(sprint),"approved Setback renderer missing");
assert(/resumeBattleCallerAfterCompletion\s*\(\s*["']defeat["']\s*\)/.test(sprint),"Setback Continue no longer resumes factual defeat caller");
assert(/deferredTerminalOverlay/.test(modern),"#33000 terminal-overlay defer owner missing");

const menmaTerminal=bodyOf(menma,"completeMenmaSuccessorDefeat");
const menmaDirectResume=/resumeBattleCallerAfterCompletion\s*\(\s*["']defeat["']\s*\)/.test(menmaTerminal);
const staleVictoryCase=/["']UI\/Victory\.png["']/.test(game);

const sourceState={
  mode:MODE,
  lowercaseAssets:true,
  staleVictoryManifestCase:staleVictoryCase,
  menmaDirectCallerResume:menmaDirectResume,
  orderedTerminalDeferOwner:/deferredTerminalOverlay/.test(modern),
  setbackRenderer:true
};

if(MODE==="probe"){
  assert.strictEqual(menmaDirectResume,true,"baseline changed: Menma no longer directly resumes defeat caller; switch #544 QA to assert/re-audit");
  assert.strictEqual(staleVictoryCase,true,"baseline changed: stale UI/Victory.png manifest case already repaired; re-audit #544 probe");
}else{
  assert.strictEqual(menmaDirectResume,false,"#544 acceptance RED: Menma terminal defeat still bypasses the result-presentation boundary via direct caller resume");
  assert.strictEqual(staleVictoryCase,false,"#544 acceptance RED: stale case-sensitive UI/Victory.png manifest path remains");
}

console.log(JSON.stringify({ok:true,issue:544,...sourceState},null,2));
