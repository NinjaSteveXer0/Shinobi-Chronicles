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
function occurrences(label,needle,radius=2200){
  let from=0,count=0,index=-1;
  while((index=game.indexOf(needle,from))>=0){
    count+=1;
    console.log(`\n===== ${label} #${count} :: ${needle} :: index=${index} =====`);
    console.log(game.slice(Math.max(0,index-radius),Math.min(game.length,index+radius)));
    from=index+needle.length;
    if(count>=12)break;
  }
  console.log(`\n===== ${label} COUNT=${count} =====`);
}

// Bootstrap probe for Issue #209. This file will become the permanent
// deterministic acceptance QA after the implementation seam is identified.
// Keep the probe read-only: it must not mutate repository/runtime state.
excerpt("TEAM_FORMATION_CONTINUE","continueAcademyTeamFormationJourney",7000);
excerpt("TEAM_FORMATION_DESTINATION","ALPHA_ACADEMY_TEAM_FORMATION_CONTINUATION",5000);
excerpt("TEAM_FORMATION_PRESENTATION_CONTINUE","continueInvocationCount",6500);
excerpt("TEAM_FORMATION_BLOCKER","academy_team_formation_continue_required",4500);
excerpt("TEAM_FORMATION_STATE","academyTeamFormation",5000);
occurrences("ACADEMY_FREE_PLAY_OCCURRENCES","academy_free_play",2600);
occurrences("ONBOARDING_STATUS_FREE_PLAY","onboardingStatus===\"academy_free_play\"",2600);
occurrences("ONBOARDING_STATUS_FREE_PLAY_LOOSE","onboardingStatus==\"academy_free_play\"",2600);
excerpt("KONOHA_STANDING_POOL","konoha_alpha_standing_pool_v1",4500);
excerpt("KONOHA_P07","KON-P07",3500);
excerpt("KONOHA_A02","KON-A02",3500);
excerpt("KONOHA_X12","KOH-X12",3500);

console.log(JSON.stringify({
  probe:true,
  issue:209,
  foundContinue:game.includes("continueAcademyTeamFormationJourney"),
  foundTeamFormation:game.includes("academyTeamFormation"),
  foundAcademyFreePlay:game.includes("academy_free_play"),
  foundDestination:game.includes("ALPHA_ACADEMY_TEAM_FORMATION_CONTINUATION"),
  foundKonohaP07:game.includes("KON-P07"),
  foundKonohaA02:game.includes("KON-A02")
},null,2));
