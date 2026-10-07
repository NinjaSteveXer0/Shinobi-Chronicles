#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const OUT=process.env.ISSUE_544_OUT||path.join(ROOT,"artifacts","issue-544-terminal-result-routing");
const candidatePath=process.env.ISSUE_544_CANDIDATE_MODULE||"";
fs.mkdirSync(OUT,{recursive:true});

const read=p=>fs.readFileSync(path.join(ROOT,p),"utf8");
const game=read("game.js");
const modern=read("runtime/alpha-battle-modern-33000.js");
const sprint=read("runtime/alpha-alpha-sprint-33100.js");
const menma=read("runtime/alpha-menma-evolved-pl-battle-36900.js");
const candidate=candidatePath&&fs.existsSync(candidatePath)?fs.readFileSync(candidatePath,"utf8"):"";

const evidence={
  issue:544,
  lane:"F",
  browserGoldenClaimed:false,
  baseline:{
    approvedVictoryAssetExists:fs.existsSync(path.join(ROOT,"UI","victory.png")),
    approvedSetbackAssetExists:fs.existsSync(path.join(ROOT,"UI","setback.png")),
    staleLegacyVictoryManifestCase:game.includes('UI/Victory.png'),
    sprintUsesLowercaseVictory:sprint.includes("UI/victory.png"),
    sprintUsesLowercaseSetback:sprint.includes("UI/setback.png"),
    setbackPresentationLivesInZeroPlWrapper:sprint.includes('openOverlay("setback")')&&sprint.includes("renderSetback33100"),
    modernTerminalGateVocabularyExcludesSetback:modern.includes('(target==="victory"||target==="defeat")'),
    menmaDirectDefeatResumeBypass:/completeMenmaSuccessorDefeat[\s\S]*?resumeBattleCallerAfterCompletion\("defeat"\)/.test(menma),
    worldBanditOpportunityAuthored:game.includes('ALPHA_BANDIT_HIDEOUT_OPPORTUNITY_ID="alpha_bandit_hideout_battle"'),
    worldBanditFightActionAuthored:game.includes('id:"fight_bandit_hideout"'),
    worldBanditEncounterBound:game.includes('ALPHA_BANDIT_HIDEOUT_ENCOUNTER_ID="bandit_leader"')&&game.includes("encounterId:ALPHA_BANDIT_HIDEOUT_ENCOUNTER_ID"),
    worldGenericRouterLaunchesEncounter:game.includes("routeWorldOpportunityInteraction")&&game.includes("startEncounterActivity"),
    worldBattleReturnContextAttached:game.includes("attachWorldOpportunityBattleReturnContext"),
    worldCallerResumeExists:game.includes("resumeRegionHotspotFromBattle")
  },
  candidate:{
    supplied:!!candidate,
    path:candidatePath||null,
    hasStableTerminalApi:candidate.includes("presentCommittedBattleTerminalResult54400")&&candidate.includes("presentCommittedBattleTerminalResult="),
    mapsDefeatToSetback:candidate.includes('outcome==="defeat"?"setback":"victory"'),
    wrapsVictoryCompletion:candidate.includes("wrappedCompleteVictory54400"),
    wrapsDefeatCompletion:candidate.includes("wrappedCompleteDefeat54400"),
    interceptsCallerResume:candidate.includes("wrappedResumeCaller54400"),
    waitsFor33000Queue:candidate.includes("pendingBattlePresentation33000")&&candidate.includes("hardSettleBattlePresentationQueue33000"),
    markerNonEnumerable:candidate.includes("enumerable:false"),
    noObviousRewardMutation:!/(playerData\.ryo\s*=(?!=)|claimCurrentBattleRewards\s*\(|rewards\.claimed\s*=(?!=))/.test(candidate)
  }
};

evidence.baseline.failureContractObserved=[
  evidence.baseline.approvedVictoryAssetExists,
  evidence.baseline.approvedSetbackAssetExists,
  evidence.baseline.sprintUsesLowercaseVictory,
  evidence.baseline.sprintUsesLowercaseSetback,
  evidence.baseline.setbackPresentationLivesInZeroPlWrapper,
  evidence.baseline.modernTerminalGateVocabularyExcludesSetback,
  evidence.baseline.menmaDirectDefeatResumeBypass
].every(Boolean);

evidence.baseline.worldRealRouteBound=[
  evidence.baseline.worldBanditOpportunityAuthored,
  evidence.baseline.worldBanditFightActionAuthored,
  evidence.baseline.worldBanditEncounterBound,
  evidence.baseline.worldGenericRouterLaunchesEncounter,
  evidence.baseline.worldBattleReturnContextAttached,
  evidence.baseline.worldCallerResumeExists
].every(Boolean);

evidence.candidate.acceptanceShape=[
  evidence.candidate.supplied,
  evidence.candidate.hasStableTerminalApi,
  evidence.candidate.mapsDefeatToSetback,
  evidence.candidate.wrapsVictoryCompletion,
  evidence.candidate.wrapsDefeatCompletion,
  evidence.candidate.interceptsCallerResume,
  evidence.candidate.waitsFor33000Queue,
  evidence.candidate.markerNonEnumerable,
  evidence.candidate.noObviousRewardMutation
].every(Boolean);

fs.writeFileSync(path.join(OUT,"source-evidence.json"),JSON.stringify(evidence,null,2));
assert.strictEqual(evidence.baseline.failureContractObserved,true,"#544 baseline failure topology no longer matches the durable Lane-D diagnosis");
assert.strictEqual(evidence.baseline.worldRealRouteBound,true,"#544 World/PL Bandit caller seam no longer matches the live authored route");
if(candidatePath)assert.strictEqual(evidence.candidate.acceptanceShape,true,"Lane-E candidate does not expose the frozen #544 acceptance interface shape");
console.log(JSON.stringify(evidence,null,2));
console.log("PASS #544 source failure/acceptance contract + real World Bandit seam; browserGoldenClaimed=false");
