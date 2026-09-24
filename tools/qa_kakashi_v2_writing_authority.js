#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const CORE="runtime/alpha-kakashi-v2-core-36020.js";
const CONTENT="runtime/academy-kakashi-v2-content-36000.js";
const WRITING_GOLDEN="runtime/academy-kakashi-v2-writing-golden-36100.js";
const STORY_DIR="Documentation/Story";
const core=fs.readFileSync(CORE,"utf8");
const content=fs.readFileSync(CONTENT,"utf8");
const writingGolden=fs.readFileSync(WRITING_GOLDEN,"utf8");
const implementation=core+"\n"+content+"\n"+writingGolden;
const storyFiles=fs.readdirSync(STORY_DIR)
  .filter(name=>/^Academy_Kakashi_.*\.md$/i.test(name))
  .map(name=>path.join(STORY_DIR,name));
const corpus=storyFiles.map(file=>fs.readFileSync(file,"utf8")).join("\n");
const runtimeStaticAuthority=path.join(STORY_DIR,"Academy_Kakashi_Runtime_Static_Cue_Authority_Snapshot_2026-09-22.md");
assert(fs.existsSync(runtimeStaticAuthority),"Current Kakashi runtime static-cue authority snapshot is missing");

function decode(raw){try{return JSON.parse(`"${raw}"`);}catch(_){return null;}}
const cues=[];
const re=/(?:N)\("((?:\\.|[^"\\])*)"\)|Q\("((?:\\.|[^"\\])*)","((?:\\.|[^"\\])*)"\)/g;
let match;
while((match=re.exec(core))){
  const raw=match[1]??match[3];
  const value=decode(raw);
  if(value&&value.length>=3)cues.push(value);
}
const unique=[...new Set(cues)];
const missing=unique.filter(text=>!corpus.includes(text));

// System-only Battle title cards are presentation labels backed by Combat configs,
// not authored Story prose. Everything else static in N()/Q() must come verbatim
// from durable Academy Kakashi Story authority.
const allowedSystemPatterns=[
  /^Kakashi Hatake vs /,
  /^Kakashi Hatake and the ninken face /
];
const unauthorised=missing.filter(text=>!allowedSystemPatterns.some(re=>re.test(text)));

assert.deepStrictEqual(
  unauthorised,
  [],
  "Static player-facing Kakashi V2 prose is not present verbatim in durable Academy Kakashi Story authority:\n"+unauthorised.map(x=>" - "+x).join("\n")
);

for(const required of [
  "Kakashi stands alone on a Konoha rooftop, the village lights spread out below him. A masked ANBU operative lands behind him without warning.",
  "You have orders. Stop this package from falling into the wrong hands.",
  "Why are you coming to me with this?",
  "Hokage's orders.",
  "WATCH THE HANDOFF",
  "GET CLOSER",
  "INTERRUPT THE HANDOFF",
  "SLIP IN AND TAKE IT",
  "INTERCEPT THE MASKED ATTACKER",
  "GO FOR THE PACKAGE",
  "BEAT HER TO THE PACKAGE",
  "DEAL WITH HER FIRST",
  "CHASE THE MAN FROM THE PHOTO",
  "RESTRAIN HIM AND KEEP MOVING",
  "RESTRAIN HIM AND GO BACK FOR THE OTHERS"
])assert(implementation.includes(required),`required current Writing token missing: ${required}`);

assert(!core.includes('"ATTEMPT TO KILL HER"'));
assert(!core.includes('"ATTEMPT TO KILL HIM"'));
assert(!/C\([^,\n]+,"CONTINUE"/.test(core),"Writing-Golden resolver CONTINUE pseudo-choice returned");
assert(core.includes('"v2_hidden_review"')&&!core.includes('RECORD("Origin occurrence sealed.'),"corrected terminal authority not consumed");

console.log(JSON.stringify({
  pass:true,
  academyKakashiStoryAuthorityFiles:storyFiles.length,
  staticNarrationDialogueCues:unique.length,
  systemBattleTitleExemptions:missing.length-unauthorised.length,
  unauthorisedStaticCues:0,
  browserGoldenClaimed:false
},null,2));
