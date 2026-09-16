#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const game=fs.readFileSync(path.join(root,"game.js"),"utf8");

function excerpt(label,needle,radius=4200){
  const index=game.indexOf(needle);
  console.log(`\n===== ${label} :: ${needle} :: index=${index} =====`);
  if(index<0)return;
  console.log(game.slice(Math.max(0,index-radius),Math.min(game.length,index+radius)));
}
function namedFunctions(pattern){
  const rows=[];
  const re=/function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  for(const match of game.matchAll(re))if(pattern.test(match[1]))rows.push({name:match[1],index:match.index});
  return rows;
}

console.log("===== ISSUE 209 MAP/NAV FUNCTION NAMES =====");
console.log(JSON.stringify(namedFunctions(/Konoha|Village|Location|Hotspot|World|Training/i).slice(0,220),null,2));
excerpt("VILLAGE_OVERLAY_RENDER","renderVillage",6000);
excerpt("KONOHA_V3_RENDER","ALPHA_KONOHA_V3_AUTHORITY",6500);
excerpt("LOCATION_DATASET","data-location-id",6000);
excerpt("HOTSPOT_DATASET","data-hotspot",6000);
excerpt("GENERAL_TRAINING_NAME","General Training Ground",6500);
excerpt("PRACTICAL_COMPOUND_NAME","Practical Training Compound",5000);
excerpt("WORLD_OPPORTUNITY_ROUTE","routeWorldOpportunityInteraction",5000);
excerpt("FREE_PLAY_AVAILABILITY","isAcademyFreePlayAvailable",5000);

console.log(JSON.stringify({
  probe:true,
  issue:209,
  foundContinue:game.includes("continueAcademyTeamFormationJourney"),
  foundKonohaP07:game.includes("KON-P07"),
  foundKonohaA02:game.includes("KON-A02"),
  candidateFunctionCount:namedFunctions(/Konoha|Village|Location|Hotspot|World|Training/i).length
},null,2));
