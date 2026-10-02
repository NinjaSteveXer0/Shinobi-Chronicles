#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const RUNTIME=fs.readFileSync(path.join(ROOT,"runtime/alpha-phase2-live-hud-49900.js"),"utf8");
const INDEX=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");

assert(RUNTIME.includes('const PATCH_ID="phase2_live_hud_49900_2026_10_03"'),"HUD patch identity missing");
assert(INDEX.includes('runtime/alpha-phase2-live-hud-49900.js'),"HUD runtime loader missing");
assert(INDEX.indexOf('runtime/alpha-phase2-live-hud-49900.js')>INDEX.indexOf('runtime/alpha-phase2-inventory-core-46100.js'),"HUD must load after existing player-surface owners");

for(const pattern of [
  /\bsavePlayerData\s*\(/,
  /\blocalStorage\.setItem\s*\(/,
  /\bconfirmAcademyTeamFormation\s*\(/,
  /\bselectAcademyTeamFormationTeammate\s*\(/,
  /\baddItemToInventory\s*\(/,
  /\bcommitCharacterAcquisition\s*\(/
]){
  assert(!pattern.test(RUNTIME),"#499 read-only HUD contains forbidden writer: "+pattern);
}
assert(!/ENERGY/i.test(RUNTIME.replace(/noEnergyProjection[^\n]*/g,"")),"#499 rendered or authored fake Energy state");
assert(RUNTIME.includes("getChronicleCurrentTeam43600"),"HUD does not read canonical currentTeam");
assert(RUNTIME.includes("getChronicleCurrentRyo43600"),"HUD does not read canonical Ryō");
assert(RUNTIME.includes("getAlphaTailedBeastJourneyState")&&RUNTIME.includes("getAlphaSurfaceTruthJourneyAction"),"HUD Journey projection bypasses observer-safe Journey authority");
assert(RUNTIME.includes("getAlphaSurfaceTruthSubjectId"),"HUD active identity authority missing");
assert(RUNTIME.includes("resolveUIPortraitProjection")&&RUNTIME.includes("getUIPortraitAssetPath"),"HUD uiPortrait authority missing");

const calls=[];
const team={
  assignmentId:"qa499-team",
  originVariantId:"academy_menma",
  teamVariantIds:["academy_menma","academy_kakashi","academy_mirai"]
};
const chars={
  academy_menma:{id:"academy_menma",name:"Menma",rank:"Academy Student",village:"Hidden Leaf"},
  academy_kakashi:{id:"academy_kakashi",name:"Kakashi",rank:"Academy Student",village:"Hidden Leaf"},
  academy_mirai:{id:"academy_mirai",name:"Mirai",rank:"Academy Student",village:"Hidden Leaf"}
};
let activeStory=null;
const ctx=vm.createContext({
  console:{log(){},warn(){},error(){}},
  JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,RegExp,Error,TypeError,
  currentOverlayType:null,
  currentBattle:{active:false,battleOver:false},
  playerData:{ryo:321,acquisition:{chronicleOriginVariantId:"academy_menma"}},
  getAlphaSurfaceTruthSubjectId:()=>"academy_menma",
  getPlayerCharacter:id=>chars[id]||null,
  getAlphaSurfaceTruthRankLabel:()=>"Academy Student",
  getMyClanCharacterAffiliation:()=>"Hidden Leaf",
  resolveUIPortraitProjection:id=>({assetPath:"ui/"+(typeof id==="string"?id:id&&id.id||"unknown")+".png"}),
  getUIPortraitAssetPath:id=>"ui/"+String(id)+".png",
  getChronicleCurrentRyo43600:()=>321,
  getChronicleCurrentTeam43600:()=>JSON.parse(JSON.stringify(team)),
  getAlphaTailedBeastJourneyState:()=>({originId:"academy_menma",prologueComplete:true,formationRequired:false}),
  getAlphaSurfaceTruthJourneyAction:()=>({label:"Explore Konoha",detail:"Choose your next legitimate Academy activity."}),
  getActiveStorySceneRuntime:()=>activeStory,
  isAcademyFreePlayAvailable:()=>true,
  openOverlay:type=>{calls.push(["overlay",type]);ctx.currentOverlayType=type;return{success:true,type};},
  closeOverlay:()=>{calls.push(["close"]);ctx.currentOverlayType=null;return{success:true};},
  openShinobiRecord:route=>{calls.push(["record",route]);return{success:true,route};},
  openRegionHub:key=>{calls.push(["region",key]);ctx.currentOverlayType="region";return{success:true,key};}
});
ctx.globalThis=ctx;
vm.runInContext(RUNTIME,ctx,{filename:"alpha-phase2-live-hud-49900.js"});

let snap=JSON.parse(JSON.stringify(ctx.getPhase2LiveHudSnapshot49900()));
assert.strictEqual(snap.visible,true);
assert.strictEqual(snap.surface.kind,"world");
assert.strictEqual(snap.identity.id,"academy_menma");
assert.strictEqual(snap.identity.name,"Menma");
assert.strictEqual(snap.identity.rank,"Academy Student");
assert.strictEqual(snap.identity.affiliation,"Hidden Leaf");
assert.strictEqual(snap.ryo,321);
assert.deepStrictEqual(snap.team.map(row=>row.id),team.teamVariantIds);
assert.strictEqual(snap.journey.label,"Explore Konoha");
assert.strictEqual(snap.energy,null);
assert(snap.navigation.some(row=>row.id==="village"),"world surface lacks legal Village navigation");

const teamBefore=JSON.stringify(team);
ctx.openPhase2LiveHudRoute49900("clan");
ctx.openPhase2LiveHudRoute49900("inventory");
ctx.openPhase2LiveHudRoute49900("record");
ctx.openPhase2LiveHudRoute49900("journey");
assert.deepStrictEqual(calls.slice(0,4),[
  ["overlay","clan"],["overlay","inventory"],["record","overview"],["overlay","missions"]
]);
assert.strictEqual(JSON.stringify(team),teamBefore,"HUD navigation mutated currentTeam fixture");

ctx.currentOverlayType="inventory";
snap=JSON.parse(JSON.stringify(ctx.getPhase2LiveHudSnapshot49900()));
assert.strictEqual(snap.visible,false);
assert.strictEqual(snap.surface.kind,"deep");

ctx.currentOverlayType=null;
ctx.currentBattle.active=true;
snap=JSON.parse(JSON.stringify(ctx.getPhase2LiveHudSnapshot49900()));
assert.strictEqual(snap.visible,false);
assert.strictEqual(snap.surface.kind,"battle");
ctx.currentBattle.active=false;

activeStory={sceneId:"qa_story"};
snap=JSON.parse(JSON.stringify(ctx.getPhase2LiveHudSnapshot49900()));
assert.strictEqual(snap.visible,false);
assert.strictEqual(snap.surface.kind,"story");
activeStory=null;

const diagnostics=JSON.parse(JSON.stringify(ctx.runPhase2LiveHud49900Diagnostics()));
assert.strictEqual(diagnostics.pass,true,JSON.stringify(diagnostics));

console.log(JSON.stringify({
  pass:true,
  issue:499,
  readOnlyProjection:true,
  exactCurrentTeam:true,
  exactRyo:true,
  observerSafeJourney:true,
  canonicalNavigation:true,
  deepStoryBattleSuppression:true,
  noFakeEnergy:true,
  browserGoldenClaimed:false
},null,2));
