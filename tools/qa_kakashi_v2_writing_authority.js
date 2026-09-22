#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const assert=require("assert");

const CORE="runtime/alpha-kakashi-v2-core-36020.js";
const CONTENT="runtime/academy-kakashi-v2-content-36000.js";
const STORY_DIR="Documentation/Story";
const core=fs.readFileSync(CORE,"utf8");
const content=fs.readFileSync(CONTENT,"utf8");
const implementation=core+"\n"+content;
const storyFiles=fs.readdirSync(STORY_DIR)
  .filter(name=>/^Academy_Kakashi_.*\.md$/i.test(name))
  .map(name=>path.join(STORY_DIR,name));
const corpus=storyFiles.map(file=>fs.readFileSync(file,"utf8")).join("\n");

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
  "WATCH THE EXCHANGE",
  "MOVE IN CLOSER",
  "STRIKE BEFORE THE HANDOFF",
  "SLIP IN FOR THE PACKAGE",
  "STOP THE ASSASSIN",
  "SECURE THE PACKAGE BEFORE THE ASSASSIN",
  "DEFEAT THE ASSASSIN, THEN SECURE THE PACKAGE",
  "GO AFTER THE ORIGINAL TARGET"
])assert(implementation.includes(required),`required current Writing token missing: ${required}`);

assert(!core.includes('"ATTEMPT TO KILL HER"'));
assert(!core.includes('"ATTEMPT TO KILL HIM"'));

console.log(JSON.stringify({
  pass:true,
  academyKakashiStoryAuthorityFiles:storyFiles.length,
  staticNarrationDialogueCues:unique.length,
  systemBattleTitleExemptions:missing.length-unauthorised.length,
  unauthorisedStaticCues:0,
  browserGoldenClaimed:false
},null,2));
