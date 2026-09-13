#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");

const root=path.resolve(__dirname,"..");
const bridgeSource=fs.readFileSync(path.join(root,"runtime","alpha-traversal-bridge-33200.js"),"utf8");
const gameSource=fs.readFileSync(path.join(root,"game.js"),"utf8");
const approvedPath="Enemies Portraits/test_subject_altered_shinobi.png";
const assetPath=path.join(root,approvedPath);

function assert(name,value,details=null){
  if(!value)throw new Error(`${name}:${JSON.stringify(details)}`);
  console.log(`PASS ${name}`);
}

const enemyDatabase={
  test_subject_altered_shinobi:{
    id:"test_subject_altered_shinobi",
    name:"TEST SUBJECT — ALTERED SHINOBI",
    image:null
  }
};

const context={
  console,
  enemyDatabase,
  document:undefined,
  openOverlay:()=>true,
  getGeninRosterTransitionState:()=>null,
  getCharacterRegistryEntry:()=>null,
  resolveBattleEnemyPortraitProjection(enemy){
    const sourceId=enemy&&typeof enemy.id==="string"?enemy.id:null;
    const portrait=enemy&&typeof enemy.image==="string"?enemy.image:"";
    return portrait
      ?{sourceId,registryId:null,path:portrait,status:"authored_enemy",fallbackUsed:false}
      :{sourceId,registryId:null,path:"",status:"missing_authority",fallbackUsed:false};
  },
  getAlphaBattleActivePortraitProjection(side,participant){
    if(side!=="enemy")return{path:"",authority:"unexpected_player_path"};
    const portrait=context.resolveBattleEnemyPortraitProjection(participant);
    return portrait.path?{...portrait,authority:"enemyPortrait"}:{...portrait,authority:"missing"};
  },
  getAlphaVictoryPortrait(participant,side="enemy"){
    return context.getAlphaBattleActivePortraitProjection(side,participant);
  },
  Object,Array,String,Number,Boolean,RegExp,JSON,Date,Map,Set,Math,Error,TypeError
};
context.globalThis=context;
context.window=context;
vm.createContext(context);

try{
  assert("approved_asset_exists",fs.existsSync(assetPath),approvedPath);
  const signature=fs.readFileSync(assetPath).subarray(0,8).toString("hex");
  assert("approved_asset_is_png",signature==="89504e470d0a1a0a",signature);

  assert("production_enemy_resolver_consumes_enemy_image",
    gameSource.includes('const path=typeof enemy.image==="string"?enemy.image:"";')&&
    gameSource.includes('status:"authored_enemy",fallbackUsed:false'));
  assert("production_battle_surface_uses_enemy_resolver",
    gameSource.includes('side==="player"?resolveUIPortraitProjection(participant):resolveBattleEnemyPortraitProjection(participant)'));
  assert("production_victory_reuses_battle_portrait_projection",
    gameSource.includes('function getAlphaVictoryPortrait(participant,side="enemy")')&&
    gameSource.includes('try{return getAlphaBattleActivePortraitProjection(side,participant);}'));
  assert("victory_missing_authority_is_only_no_path_branch",
    gameSource.includes('alpha-victory-portrait-missing">PORTRAIT AUTHORITY MISSING'));

  vm.runInContext(bridgeSource,context,{filename:"runtime/alpha-traversal-bridge-33200.js"});
  const diagnostic=context.runIssue173AlteredShinobiPresentationDiagnostics();
  assert("issue_173_diagnostic_exported",typeof context.runIssue173AlteredShinobiPresentationDiagnostics==="function");
  assert("issue_173_diagnostic_passes",diagnostic.pass===true,diagnostic);
  assert("exact_path_bound_to_existing_enemy_row",enemyDatabase.test_subject_altered_shinobi.image===approvedPath,enemyDatabase.test_subject_altered_shinobi);
  assert("battle_projection_is_exact_enemy_authority",diagnostic.checks.battleUsesEnemyPortrait===true,diagnostic);
  assert("victory_projection_matches_battle",diagnostic.checks.victoryUsesSamePresentation===true,diagnostic);
  assert("no_playable_registry_admission",diagnostic.checks.noPlayableRegistryAdmission===true,diagnostic);
  assert("browser_golden_not_claimed",diagnostic.browserGoldenClaimed===false,diagnostic);

  console.log("Issue #173 Altered Shinobi Battle/Victory presentation QA: PASS");
}catch(error){
  console.error("Issue #173 Altered Shinobi Battle/Victory presentation QA: FAIL");
  console.error(error&&error.stack||error);
  process.exit(1);
}
