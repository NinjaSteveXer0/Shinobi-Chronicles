"use strict";
const fs=require("fs");
const reaction=fs.readFileSync("runtime/alpha-origin-choice-reaction-33510.js","utf8");
const screenFirst=fs.readFileSync("runtime/alpha-origin-screen-first-33700.js","utf8");
const expected=["patchHinata()","patchIzuno()","patchMirai()","patchKushina()","patchKurenai()","patchIwabee()","patchMetal()","patchMenma()"];
const checks={
  activationReferences33700:reaction.includes("runtime/alpha-origin-screen-first-33700.js"),
  activationWaitsFor33600:reaction.includes("SC_ALPHA_EARLY_STORY_MODERNIZATION_33600")&&reaction.includes("sc-alpha-early-story-modernization-33600-script"),
  screenFirstSharedAuthorityPinned:screenFirst.includes("a08dcf50f67d264497944af761475865dff8dc81")&&screenFirst.includes("7b646d8697879506f0421af01d6083f8482b828c"),
  legacyOriginsProjected:expected.every(token=>screenFirst.includes(token)),
  finalObitoPatchRetired:!screenFirst.includes("function patchObito(")&&!screenFirst.includes("obito:patchObito()"),
  legacyKakashiPatchAbsent:!screenFirst.includes("patchKakashi()")&&!screenFirst.includes("AUTHORITY_KAKASHI_V2")&&!screenFirst.includes("kakashiV2AuthorityCommit"),
  diagnosticDoesNotClaimGolden:screenFirst.includes("browserGoldenClaimed:false")
};
const failed=Object.entries(checks).filter(([,value])=>value!==true).map(([key])=>key);
console.log(JSON.stringify({pass:failed.length===0,checks,failed,browserGoldenClaimed:false},null,2));
if(failed.length)process.exitCode=1;
