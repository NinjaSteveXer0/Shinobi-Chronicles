#!/usr/bin/env node
"use strict";

const fs=require("fs"),vm=require("vm"),assert=require("assert");

const RUNTIME="runtime/alpha-origin-scenes-32900-a.js";
const WASABI_CATALOGUE="runtime/academy-wasabi-writing-golden-343.js";
const DOC="Documentation/Story/Academy_Hinata_Origin_WRITING_GOLDEN_2026-09-24.md";
const source=fs.readFileSync(RUNTIME,"utf8");
const wasabiCatalogue=fs.readFileSync(WASABI_CATALOGUE,"utf8");
const doc=fs.readFileSync(DOC,"utf8");

const scenes=new Map();
const A={
  sceneByVariant:{academy_hinata:"origin_academy_hinata_prologue",academy_izuno:"origin_academy_izuno_prologue",academy_mirai:"origin_academy_mirai_prologue"},
  choice(choiceId,label,nextBeatId,contextPatch=null,extra={}){return{choiceId,label,nextBeatId,contextPatch,...extra};},
  commitRequest(requestId,originId,occurrenceId,factResolver,rowIdsResolver,optionsResolver){
    return{requestId,kind:"domain",__originId:originId,__occurrenceId:occurrenceId,__factResolver:factResolver,__rowIdsResolver:rowIdsResolver,__optionsResolver:optionsResolver,resolve:()=>({success:true})};
  },
  completionRequest(originId,evidenceIds){return{requestId:`complete_${originId}_origin_32900`,kind:"domain",__originId:originId,__evidenceIds:evidenceIds,resolve:()=>({success:true})};},
  unavailableBattle(_scene,label){return()=>({available:false,knownBlocker:label});},
  register(def){const copy={...def,beatMap:new Map((def.beats||[]).map(b=>[b.beatId,b]))};scenes.set(def.sceneId,copy);return{success:true,sceneId:def.sceneId};}
};
const context={console,JSON,Object,Array,String,Number,Boolean,Set,Map,Math,Date,globalThis:null,SC_ALPHA_ORIGIN_32900:A};
context.globalThis=context;
vm.createContext(context);
// 32900-a now has a production load-order dependency on the closed #343
// Wasabi Writing-Golden catalogue. Mirror index.html rather than weakening
// the runtime's fail-closed catalogue requirement in this isolated Hinata QA.
vm.runInContext(wasabiCatalogue,context,{filename:WASABI_CATALOGUE});
vm.runInContext(source,context,{filename:RUNTIME});

const def=scenes.get("origin_academy_hinata_prologue");
assert(def,"Hinata scene missing");
const beats=def.beats||[], byId=def.beatMap;
const hinataSource=source.slice(source.indexOf("// Hinata"),source.indexOf("// Wasabi Izuno"));

function labels(beatId){const b=byId.get(beatId);assert(b,`missing beat ${beatId}`);return Array.from(b.choices||[],c=>String(c.label));}
function choice(beatId,choiceId){const b=byId.get(beatId);assert(b,`missing beat ${beatId}`);const c=(b.choices||[]).find(x=>x.choiceId===choiceId);assert(c,`missing choice ${beatId}/${choiceId}`);return c;}
function tail(prefix){
  const rows=beats.filter(b=>b.beatId.startsWith(prefix+"_")).sort((a,b)=>Number(a.beatId.slice(prefix.length+1))-Number(b.beatId.slice(prefix.length+1)));
  assert(rows.length,`missing sequence ${prefix}`);return rows[rows.length-1];
}
function runtimeParagraphs(){
  const narration=new Set(),dialogue=new Set();
  for(const b of beats){
    if(typeof b.text!=="string"||!b.text)continue;
    if(b.mode==="dialogue")dialogue.add(`${b.speakerName}::${b.text}`);
    else for(const p of b.text.split(/\n\n+/).map(x=>x.trim()).filter(Boolean))narration.add(p);
  }
  return{narration,dialogue};
}
function docPlayerFacing(){
  const start=doc.indexOf("# PLAYER-FACING STORY");
  const end=doc.indexOf("## Machine-facing preservation");
  assert(start>=0&&end>start,"Hinata GOLDEN player-facing bounds missing");
  const lines=doc.slice(start,end).split(/\r?\n/);
  const narration=new Set(),dialogue=new Set(),choiceLabels=new Set();
  for(const raw of lines){
    const t=raw.trim();
    if(!t||t==="---"||/^#{1,6}\s/.test(t)||/^\[AUTHOR/.test(t))continue;
    const d=t.match(/^\*\*([^*]+):\*\*\s*“(.*)”$/);
    if(d){dialogue.add(`${d[1]}::${d[2]}`);continue;}
    const bold=t.match(/^\*\*([^*]+)\*\*$/);
    if(bold){choiceLabels.add(bold[1]);continue;}
    narration.add(t);
  }
  return{narration,dialogue,choiceLabels};
}

const expected=docPlayerFacing(),actual=runtimeParagraphs();
const missingNarration=[...expected.narration].filter(x=>!actual.narration.has(x));
const extraNarration=[...actual.narration].filter(x=>!expected.narration.has(x));
const missingDialogue=[...expected.dialogue].filter(x=>!actual.dialogue.has(x));
const extraDialogue=[...actual.dialogue].filter(x=>!expected.dialogue.has(x));
assert.deepStrictEqual(missingNarration,[],"GOLDEN narration missing from runtime");
assert.deepStrictEqual(extraNarration,[],"runtime narration not present in GOLDEN");
assert.deepStrictEqual(missingDialogue,[],"GOLDEN dialogue missing from runtime");
assert.deepStrictEqual(extraDialogue,[],"runtime dialogue not present in GOLDEN");

// Exact player-facing choice surfaces.
assert.deepStrictEqual(labels("hin_ex1_choice"),["WAIT FOR HIM TO COMMIT","STEP IN FIRST","BREAK AWAY AND RESET"]);
assert.deepStrictEqual(labels("hin_ex2_wait_choice"),["DON'T BITE — HOLD YOUR GROUND","GIVE HIM AN OPENING","STOP WAITING AND GO FIRST"]);
assert.deepStrictEqual(labels("hin_ex2_press_choice"),["KEEP THE PRESSURE ON HIM","DRAW OUT HIS COUNTER","BACK OFF BEFORE HE CAN SET THE TRAP"]);
assert.deepStrictEqual(labels("hin_ex2_reset_choice"),["MEET HIM BEFORE HE CLOSES THE SPACE","CIRCLE OUT","LET HIM THINK HE HAS YOU CORNERED"]);
for(const id of ["hin_ex3_wait_choice","hin_ex3_press_choice","hin_ex3_reset_choice","hin_ex3_changed_choice"]){
  assert.deepStrictEqual(labels(id),["ANSWER WITH THE FORM YOU PRACTISED","TRUST WHAT YOU'VE SEEN IN THE SPAR","BREAK THE RHYTHM BEFORE HE CAN SET IT"]);
}
assert.deepStrictEqual(labels("hin_young_choice"),["SHOW HER ONCE","TELL HER WHAT YOU SAW","LEAVE THEM TO THEIR PRACTICE","WATCH ONE MORE EXCHANGE"]);

// Opponent adaptation / history-sensitive route closure.
assert.strictEqual(tail("hin_ex2_wait_hold").nextBeatId,"hin_ex3_wait_intro_1");
assert.strictEqual(tail("hin_ex2_wait_open").nextBeatId,"hin_ex3_wait_intro_1");
assert.strictEqual(tail("hin_ex2_wait_press").nextBeatId,"hin_ex3_changed_intro_1");
assert.strictEqual(tail("hin_ex2_press_keep").nextBeatId,"hin_ex3_press_intro_1");
assert.strictEqual(tail("hin_ex2_press_draw").nextBeatId,"hin_ex3_changed_intro_1");
assert.strictEqual(tail("hin_ex2_press_back").nextBeatId,"hin_ex3_changed_intro_1");
assert.strictEqual(tail("hin_ex2_reset_circle").nextBeatId,"hin_ex3_reset_intro_1");
assert.strictEqual(tail("hin_ex2_reset_meet").nextBeatId,"hin_ex3_changed_intro_1");
assert.strictEqual(tail("hin_ex2_reset_corner").nextBeatId,"hin_ex3_changed_intro_1");

assert.strictEqual(tail("hin_ex3_wait_form").nextBeatId,"hin_eval_wait_1");
assert.strictEqual(tail("hin_ex3_wait_trust").nextBeatId,"hin_eval_changed_1");
assert.strictEqual(tail("hin_ex3_wait_break").nextBeatId,"hin_eval_changed_1");
assert.strictEqual(tail("hin_ex3_press_form").nextBeatId,"hin_eval_press_1");
assert.strictEqual(tail("hin_ex3_press_trust").nextBeatId,"hin_eval_changed_1");
assert.strictEqual(tail("hin_ex3_press_break").nextBeatId,"hin_eval_press_1");
assert.strictEqual(tail("hin_ex3_reset_form").nextBeatId,"hin_eval_reset_1");
assert.strictEqual(tail("hin_ex3_reset_trust").nextBeatId,"hin_eval_changed_1");
assert.strictEqual(tail("hin_ex3_reset_break").nextBeatId,"hin_eval_changed_1");

assert(actual.dialogue.has("HINATA::I'm not finished."));
assert(actual.dialogue.has("HINATA::No."));
assert(actual.dialogue.has("HYŪGA INSTRUCTOR::Don't nod because I'm speaking."));
assert(actual.dialogue.has("HINATA::Tomorrow…"));
assert(actual.dialogue.has("HINATA::I'll try again."));
assert(actual.dialogue.has("SPARRING STUDENT::Harder."));

// Graph is closed and fully reachable.
const ids=new Set(beats.map(b=>b.beatId));
for(const b of beats){
  if(b.nextBeatId)assert(ids.has(b.nextBeatId),`missing next beat ${b.beatId}->${b.nextBeatId}`);
  for(const c of b.choices||[])if(c.nextBeatId)assert(ids.has(c.nextBeatId),`missing choice target ${b.beatId}/${c.choiceId}`);
  assert(!b.battle,`Hinata illegally owns PL Battle at ${b.beatId}`);
}
const reachable=new Set([def.entryBeatId]),queue=[def.entryBeatId];
while(queue.length){
  const id=queue.shift(),b=byId.get(id);if(!b)continue;
  const targets=[b.nextBeatId,...(b.choices||[]).map(c=>c.nextBeatId)].filter(Boolean);
  for(const t of targets)if(!reachable.has(t)){reachable.add(t);queue.push(t);}
}
assert.deepStrictEqual(Array.from(beats,b=>String(b.beatId)).filter(id=>!reachable.has(id)),[],"unreachable Hinata GOLDEN beats");

// Stable consequence authority and exact facts.
const evalReq=byId.get("hin_eval_wait_1").onEnterConsequences?.[0];
assert(evalReq&&evalReq.requestId==="hin_spar_32900");
assert.strictEqual(evalReq.__originId,"academy_hinata");
assert.strictEqual(evalReq.__occurrenceId,"occ_origin_hinata_controlled_hyuga_spar_resolution");
const sparFact=evalReq.__factResolver({h1:"wait_for_opening",h2:"wait_give_opening",h3:"trust_spar"});
assert.deepStrictEqual(JSON.parse(JSON.stringify(sparFact)),{controlledSparCompleted:true,demonstratedResponses:["wait_for_opening","wait_give_opening","trust_spar"]});
assert.deepStrictEqual(JSON.parse(JSON.stringify(evalReq.__rowIdsResolver)),["HIN-01"]);

const youngReq=byId.get("hin_close_1").onEnterConsequences?.[0];
assert(youngReq&&youngReq.requestId==="hin_young_32900");
assert.strictEqual(youngReq.__occurrenceId,"occ_origin_hinata_younger_student_practice_resolution");
const watchFact=youngReq.__factResolver({young:"stay_and_watch"});
assert.deepStrictEqual(JSON.parse(JSON.stringify(watchFact)),{youngerStudentChoice:"stay_and_watch",selfTaijutsuLearningOccurred:true,youngerStudentParticipantRef:null});
assert.deepStrictEqual(JSON.parse(JSON.stringify(youngReq.__rowIdsResolver({young:"stay_and_watch"}))),["HIN-02"]);
assert.deepStrictEqual(JSON.parse(JSON.stringify(youngReq.__rowIdsResolver({young:"show_movement"}))),["HIN-03"]);
assert.deepStrictEqual(JSON.parse(JSON.stringify(youngReq.__rowIdsResolver({young:"leave_them_to_figure_it_out"}))),[]);

const complete=(def.onCompleteConsequences||[])[0];
assert(complete&&complete.__originId==="academy_hinata");
assert.deepStrictEqual(JSON.parse(JSON.stringify(complete.__evidenceIds)),["occ_origin_hinata_controlled_hyuga_spar_resolution","occ_origin_hinata_younger_student_practice_resolution"]);

// Context patches are serialisable and carry exact exchange history through reload.
for(const [beatId,choiceId,expect] of [
  ["hin_ex1_choice","wait_for_opening",{h1:"wait_for_opening",hinApproach1:"wait"}],
  ["hin_ex2_wait_choice","wait_go_first",{h2:"wait_go_first",hinApproach2:"press",hinChangedApproach:true}],
  ["hin_ex3_changed_choice","trust_spar",{h3:"trust_spar"}],
  ["hin_young_choice","stay_and_watch",{young:"stay_and_watch"}]
]){
  const patch=choice(beatId,choiceId).contextPatch;
  assert.deepStrictEqual(JSON.parse(JSON.stringify(patch)),expect,`context patch drift ${beatId}/${choiceId}`);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(patch)))),expect,`context patch not save/reload safe ${beatId}/${choiceId}`);
}

// Hard boundaries and retired compressed ownership.
for(const old of [
  "Early morning at the Hyuga compound. Hinata repeats a familiar form under quiet clan pressure until the instructor asks her to apply it rather than merely repeat it.",
  "Controlled spar. Choose the opening approach.",
  "The spar changes. Adapt.",
  "Decisive moment.",
  "The instructor evaluates what Hinata actually demonstrated without assigning her future destiny.",
  "At the gate, a younger Hyuga student struggles with the same movement."
]) assert(!hinataSource.includes(old),`retired compressed Hinata prose returned: ${old}`);
for(const forbidden of ["Byakugan","personalityTrait","Personality Trait","alignment","launchBattle","battle_transition"]){
  assert(!hinataSource.includes(forbidden),`forbidden Hinata semantic/presentation mutation: ${forbidden}`);
}
assert.strictEqual((hinataSource.match(/occ_origin_hinata_controlled_hyuga_spar_resolution/g)||[]).length,1);
assert.strictEqual((hinataSource.match(/occ_origin_hinata_younger_student_practice_resolution/g)||[]).length,1);

console.log(JSON.stringify({
  pass:true,
  issue:340,
  sceneId:def.sceneId,
  beatCount:beats.length,
  narrationParagraphs:actual.narration.size,
  dialogueLines:actual.dialogue.size,
  exactWritingGoldenCoverage:true,
  connectedThreeExchangeGraph:true,
  mixedApproachEvaluation:true,
  stableSourceOccurrences:true,
  plBattle:false,
  browserGoldenClaimed:false
},null,2));
