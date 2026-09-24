#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const AUTHORITY="Documentation/Coordination/Global_Post_Battle_Disposition_Player_Agency_and_Control_State_Simplification_2026-09-19.md";

function walk(dir){
  const out=[];
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name);
    if(entry.isDirectory())out.push(...walk(p));
    else out.push(p);
  }
  return out;
}
function rel(p){return path.relative(ROOT,p).replace(/\\/g,"/");}
function read(p){return fs.readFileSync(p,"utf8");}
function lineOf(src,index){return src.slice(0,index).split("\n").length;}
function windows(src,re,radius=900){
  const flags=re.flags.includes("g")?re.flags:re.flags+"g";
  const scan=new RegExp(re.source,flags);
  const out=[];let m;
  while((m=scan.exec(src))){
    const start=Math.max(0,m.index-radius),end=Math.min(src.length,m.index+m[0].length+radius);
    out.push({match:m[0],index:m.index,line:lineOf(src,m.index),window:src.slice(start,end)});
    if(m[0].length===0)scan.lastIndex++;
  }
  return out;
}

assert(fs.existsSync(path.join(ROOT,AUTHORITY)),"#278 global authority missing");

const production=[
  path.join(ROOT,"game.js"),
  ...walk(path.join(ROOT,"runtime")).filter(p=>p.endsWith(".js"))
];

const FORBIDDEN_LABEL=/\bATTEMPT\s+TO\s+(?:KILL|RESTRAIN|CAPTURE)\b/gi;
const CONTROL_CLASS=/\b(?:CONTROLLED_DEFEATED|DEFEATED_BUT_NOT_CONTROLLED)\b/gi;
const CONTROL_GATE_TOKEN=/\b(?:controlledDefeated|defeatedButNotControlled|requiresControlledDefeated|controlStateRequired|requiresControlState|targetControlled|isTargetControlled|isControlledDefeated|isBound|isStunned|bindingActive|stunActive|secureControlRequired)\b/gi;
const DIRECT_DISPOSITION=/\b(?:KILL(?:\s+HER|\s+HIM|\s+THEM)?|RESTRAIN(?:\s+HER|\s+HIM|\s+THEM)?|CAPTURE|TAKE\s+(?:HER|HIM|THEM)?\s*TO\s+ANBU|TURN\s+(?:HER|HIM|THEM)?\s*OVER\s+TO\s+(?:THE\s+)?POLICE|LET\s+(?:HER|HIM|THEM)\s+GO|INTERROGATE)\b/gi;
const PLAYER_GATE=/\b(?:availability|available|disabled|hidden|choice|label|presentationLabel|button|option)\b/i;
const PREEXISTING_CONTROL=/\b(?:targetCondition|hasBattleCondition|getBattleCondition|battleCondition|currentBattle[^\n;]{0,100}(?:bind|bound|stun|control)|(?:bind|bound|stun|control)[^\n;]{0,100}currentBattle)\b/i;
const FINISHER_GATE=/\b(?:finish(?:er)?|final\s+move|last\s+action)[^\n;]{0,180}(?:wire|bind|bound|stun|control)|(?:wire|bind|bound|stun|control)[^\n;]{0,180}(?:finish(?:er)?|final\s+move|last\s+action)\b/gi;

const forbiddenLabels=[];
const classificationGates=[];
const controlTokenGates=[];
const preexistingControlGates=[];
const finisherGates=[];
const directDispositionRows=[];
const storyBattleSeamFiles=[];

for(const file of production){
  assert(fs.existsSync(file),`production source missing: ${rel(file)}`);
  const src=read(file);

  for(const hit of windows(src,FORBIDDEN_LABEL,120)){
    forbiddenLabels.push({file:rel(file),line:hit.line,label:hit.match});
  }

  for(const hit of windows(src,CONTROL_CLASS,800)){
    if(DIRECT_DISPOSITION.test(hit.window)&&PLAYER_GATE.test(hit.window)){
      classificationGates.push({file:rel(file),line:hit.line,classification:hit.match});
    }
    DIRECT_DISPOSITION.lastIndex=0;
  }

  for(const hit of windows(src,CONTROL_GATE_TOKEN,800)){
    if(DIRECT_DISPOSITION.test(hit.window)&&PLAYER_GATE.test(hit.window)){
      controlTokenGates.push({file:rel(file),line:hit.line,token:hit.match});
    }
    DIRECT_DISPOSITION.lastIndex=0;
  }

  for(const hit of windows(src,DIRECT_DISPOSITION,520)){
    directDispositionRows.push({file:rel(file),line:hit.line,label:hit.match});
    if(PLAYER_GATE.test(hit.window)&&PREEXISTING_CONTROL.test(hit.window)){
      preexistingControlGates.push({file:rel(file),line:hit.line,label:hit.match});
    }
  }

  for(const hit of windows(src,FINISHER_GATE,500)){
    if(DIRECT_DISPOSITION.test(hit.window)||/post.?battle/i.test(hit.window)){
      finisherGates.push({file:rel(file),line:hit.line,match:hit.match});
    }
    DIRECT_DISPOSITION.lastIndex=0;
  }

  const seamSignals=[
    /launchBattleWithReturnContext/,
    /resumeBattleCallerAfterCompletion/,
    /returnContext/,
    /story_scene/,
    /pendingBattle/,
    /preset:"post_battle"/,
    /continueAfterVictory/
  ].filter(re=>re.test(src)).length;
  if(seamSignals>=2)storyBattleSeamFiles.push(rel(file));
}

assert.deepStrictEqual(forbiddenLabels,[],"#278: obsolete ATTEMPT TO disposition label remains in production");
assert.deepStrictEqual(classificationGates,[],"#278: CONTROLLED_DEFEATED classification still gates a player-facing disposition");
assert.deepStrictEqual(controlTokenGates,[],"#278: hidden control-state token still gates a player-facing disposition");
assert.deepStrictEqual(preexistingControlGates,[],"#278: direct disposition still depends on a pre-existing Battle bind/stun/control condition");
assert.deepStrictEqual(finisherGates,[],"#278: Battle finisher/control method still appears to gate ordinary post-Battle Story agency");

// Canonical generic Battle -> Story return must return victory to the caller
// without consulting a hidden target-control classification.
const sprint=read(path.join(ROOT,"runtime/alpha-alpha-sprint-33100.js"));
assert(sprint.includes('resumeBattleCallerAfterCompletion("victory")'),"#278: generic victory does not return to exact Story caller");
const victoryFn=sprint.match(/function\s+continueAfterVictory33100\([^)]*\)\s*\{[\s\S]*?\n\}/);
assert(victoryFn,"#278: unable to inspect generic victory return");
assert(!CONTROL_CLASS.test(victoryFn[0]),"#278: generic victory return consults hidden control classification");
CONTROL_CLASS.lastIndex=0;
assert(!CONTROL_GATE_TOKEN.test(victoryFn[0]),"#278: generic victory return consults hidden control gate");
CONTROL_GATE_TOKEN.lastIndex=0;

// Preserve result-layer separation.
assert(sprint.includes("Battle PL defeat does not infer death, injury, custody"),"#278: Battle result-layer separation guard missing");

const kakashiBattle=read(path.join(ROOT,"runtime/alpha-kakashi-v2-battle-36010.js"));
assert(kakashiBattle.includes("participantCustodyCommitted:false"),"#278: Kakashi Battle adapter must not infer Story custody");
assert(kakashiBattle.includes('custodyState:"unresolved"'),"#278: Kakashi Battle participant custody must remain unresolved at Battle boundary");

const kakashiCore=read(path.join(ROOT,"runtime/alpha-kakashi-v2-core-36020.js"));
for(const label of ["KILL HER","KILL HIM","KILL THEM","RESTRAIN HER AND KEEP MOVING","RESTRAIN HIM AND KEEP MOVING"]){
  assert(kakashiCore.includes(label),`#278: Kakashi direct post-Battle label missing: ${label}`);
}
assert(!FORBIDDEN_LABEL.test(kakashiCore),"#278: Kakashi V2 regressed to ATTEMPT TO labels");
FORBIDDEN_LABEL.lastIndex=0;
assert(kakashiCore.includes('state="BATTLE_DEFEATED"')||kakashiCore.includes('state="BATTLE_DEFEATED"'.replace("="," = ")),
  "#278: Kakashi V2 no longer records Battle defeat separately from disposition");

// Restraint-method clarification: the current Kakashi benchmark must project a
// legitimate authored restraint method, not invent generic invisible custody.
const allProductionText=production.map(read).join("\n");
assert(allProductionText.includes("academy_kakashi_wire_snare"),"#278: Kakashi restraint-capability source academy_kakashi_wire_snare missing");
const kakashiContent=read(path.join(ROOT,"runtime/academy-kakashi-v2-content-36000.js"));
assert(/ninja wire/i.test(kakashiContent),"#278: Kakashi post-Battle restraint presentation no longer projects ninja wire");

// Negative fixtures prove the gate fails on the prohibited patterns rather than
// merely passing because current source happens not to contain them.
function detectBadSnippet(src){
  const badLabels=windows(src,FORBIDDEN_LABEL,120).length>0;
  FORBIDDEN_LABEL.lastIndex=0;
  let badClass=false;
  for(const hit of windows(src,CONTROL_CLASS,500)){
    DIRECT_DISPOSITION.lastIndex=0;
    if(DIRECT_DISPOSITION.test(hit.window)&&PLAYER_GATE.test(hit.window)){badClass=true;break;}
  }
  CONTROL_CLASS.lastIndex=0;DIRECT_DISPOSITION.lastIndex=0;
  let badControl=false;
  for(const hit of windows(src,CONTROL_GATE_TOKEN,500)){
    DIRECT_DISPOSITION.lastIndex=0;
    if(DIRECT_DISPOSITION.test(hit.window)&&PLAYER_GATE.test(hit.window)){badControl=true;break;}
  }
  CONTROL_GATE_TOKEN.lastIndex=0;DIRECT_DISPOSITION.lastIndex=0;
  let badPreexisting=false;
  for(const hit of windows(src,DIRECT_DISPOSITION,500)){
    if(PLAYER_GATE.test(hit.window)&&PREEXISTING_CONTROL.test(hit.window)){badPreexisting=true;break;}
  }
  DIRECT_DISPOSITION.lastIndex=0;
  return badLabels||badClass||badControl||badPreexisting;
}

assert(detectBadSnippet('const label = state==="CONTROLLED_DEFEATED" ? "KILL HIM" : "ATTEMPT TO KILL HIM";'));
assert(detectBadSnippet('choice("restrain","RESTRAIN HIM",{availability:()=>targetCondition("binding_tag")});'));
assert(detectBadSnippet('const available = requiresControlledDefeated && choice==="CAPTURE";'));
assert(!detectBadSnippet('choice("restrain","RESTRAIN HIM",{availability:()=>actorHasRestraintCapability("academy_kakashi_wire_snare")});'));
assert(!detectBadSnippet('if(targetEscaped===true)return {available:false,reason:"target_physically_unavailable"};'));

console.log(JSON.stringify({
  pass:true,
  issue:278,
  productionFilesScanned:production.length,
  storyBattleSeamFiles:[...new Set(storyBattleSeamFiles)].sort(),
  directDispositionSourceRows:directDispositionRows.length,
  forbiddenAttemptLabels:0,
  hiddenClassificationGates:0,
  hiddenControlTokenGates:0,
  preexistingBattleControlGates:0,
  finisherControlGates:0,
  resultLayerSeparation:"GREEN",
  kakashiImmediateLane:"GREEN",
  restraintMethodProjection:"GREEN",
  negativeFixtures:{
    controlledDefeatedLabelDowngradeRejected:true,
    preexistingBindingGateRejected:true,
    hiddenControlTokenRejected:true,
    capabilityProjectionAllowed:true,
    explicitPhysicalUnavailabilityAllowed:true
  },
  browserGoldenClaimed:false
},null,2));
