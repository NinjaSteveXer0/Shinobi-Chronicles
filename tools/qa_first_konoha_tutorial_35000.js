#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const game=fs.readFileSync(path.join(root,"game.js"),"utf8");

function excerpt(label,needle,radius=4500){
  const index=game.indexOf(needle);
  console.log(`\n===== ${label} :: ${needle} :: index=${index} =====`);
  if(index<0)return;
  console.log(game.slice(Math.max(0,index-radius),Math.min(game.length,index+radius)));
}

// Bootstrap probe for Issue #209. This file will become the permanent
// deterministic acceptance QA after the implementation seam is identified.
// Keep the probe read-only: it must not mutate repository/runtime state.
excerpt("TEAM_FORMATION_CONTINUE","continueAcademyTeamFormationJourney",7000);
excerpt("TEAM_FORMATION_STATE","academyTeamFormation",5000);
excerpt("FREE_PLAY_STATE","academy_free_play",5000);
excerpt("KONOHA_FREE_PLAY","KONOHA_FREE_PLAY",5000);
excerpt("KONOHA_P07","KON-P07",3500);
excerpt("KONOHA_X12","KOH-X12",3500);

console.log(JSON.stringify({
  probe:true,
  issue:209,
  foundContinue:game.includes("continueAcademyTeamFormationJourney"),
  foundTeamFormation:game.includes("academyTeamFormation"),
  foundAcademyFreePlay:game.includes("academy_free_play"),
  foundKonohaFreePlay:game.includes("KONOHA_FREE_PLAY")
},null,2));
