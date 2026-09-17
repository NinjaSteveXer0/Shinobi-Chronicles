'use strict';
const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const corePath='runtime/alpha-localisation-35500.js';
const contentPath='runtime/alpha-localisation-content-35510.js';
const finalPath='runtime/alpha-localisation-final-writing-35520.js';
const loaderPath='runtime/alpha-origin-scenes-32900-core.js';
const journeyPath='runtime/alpha-journey-surface-32800.js';
const writingPath='runtime/alpha-early-story-modernization-33600.js';
const originPaths=[
  'runtime/alpha-origin-scenes-32900-a.js',
  'runtime/alpha-origin-scenes-32900-b.js',
  'runtime/alpha-origin-scenes-32900-c.js'
];
const coreSource=fs.readFileSync(corePath,'utf8');
const contentSource=fs.readFileSync(contentPath,'utf8');
const finalSource=fs.readFileSync(finalPath,'utf8');
const loaderSource=fs.readFileSync(loaderPath,'utf8');
const journeySource=fs.readFileSync(journeyPath,'utf8');
const writingSource=fs.readFileSync(writingPath,'utf8');

function boot(){
  const ctx={console,navigator:{languages:['en-US'],language:'en-US'},localStorage:{getItem(){return null;},setItem(){}},setTimeout,clearTimeout};
  ctx.globalThis=ctx;vm.createContext(ctx);
  vm.runInContext(coreSource,ctx,{filename:corePath});
  vm.runInContext(contentSource,ctx,{filename:contentPath});
  vm.runInContext(finalSource,ctx,{filename:finalPath});
  return ctx;
}
const ctx=boot();
const core=ctx.SC_ALPHA_LOCALISATION_35500;
const content=ctx.SC_ALPHA_LOCALISATION_CONTENT_35510;
const finalWriting=ctx.SC_ALPHA_LOCALISATION_FINAL_WRITING_35520;
assert(core);assert(content);assert(finalWriting);
assert.equal(content.diagnostics().pass,true);assert(content.pairCount>=180);
assert.equal(finalWriting.diagnostics().pass,true);assert(finalWriting.pairCount>=230);
const sourceTexts=new Set(Array.from(content.sourceTexts));
const finalTexts=new Set(Array.from(finalWriting.sourceTexts));

function collect(source,re,index=1,set=new Set()){
  let m;while((m=re.exec(source)))if(m[index])set.add(m[index]);return set;
}
function collectOriginPresentation(source){
  const out=new Set();
  collect(source,/(?:^|[,{])\s*title:"([^"]+)"/gm,1,out);
  collect(source,/(?:^|[,{])\s*speakerName:"([^"]+)"/gm,1,out);
  collect(source,/(?:^|[,{])\s*text:"([^"]+)"/gm,1,out);
  collect(source,/C\("[^"]+","([^"]+)"/g,1,out);
  collect(source,/A\.unavailableBattle\(scene,"([^"]+)"/g,1,out);
  collect(source,/knownBlocker:"([^"]+)"/g,1,out);
  collect(source,/beat\([^,]+,"([^"]+)"/g,1,out);
  collect(source,/\["(?:furniture|vegetables|equipment|delivery|cart)_[^"]+","([^"]+)"\]/g,1,out);
  return out;
}
function collectFinalWritingStatic(source){
  const out=new Set();
  const decode=raw=>JSON.parse(`"${raw}"`);
  let m;
  const textRe=/\btext\(def,"[^"]+","((?:\\.|[^"\\])*)"\)/g;
  while((m=textRe.exec(source)))if(m[1])out.add(decode(m[1]));
  const labelRe=/\blabel\(def,"[^"]+","[^"]+","((?:\\.|[^"\\])*)"\)/g;
  while((m=labelRe.exec(source)))if(m[1])out.add(decode(m[1]));
  return out;
}

const originPresented=new Set();
for(const path of originPaths){
  const source=fs.readFileSync(path,'utf8');
  for(const phrase of collectOriginPresentation(source))originPresented.add(phrase);
}
// Dynamic presentationResolver branches that are not represented as text:"...".
for(const phrase of [
  'Obito reaches training without an authored diversion delay. The direct-travel route is inside the locked FULL arrival window, so all four training blocks remain available.',
  'Obito reaches the training approach with real diversion delay preserved in his Origin history. The authority forbids deriving FULL, SUBSTANTIAL, REDUCED or MINIMAL from help-count or qualitative delay labels alone, so this delayed route is not guessed.',
  'Formal training entitlement: FULL.',
  'Exact formal-training entitlement is waiting on authoritative elapsed journey-time / arrival evidence for this delayed route.'
]) originPresented.add(phrase);

assert(originPresented.size>=150,`expected broad Origin presentation extraction, got ${originPresented.size}`);
const missingOrigins=[...originPresented].filter(phrase=>!sourceTexts.has(phrase));
assert.deepEqual(missingOrigins,[],`missing es-419 Origin catalogue phrases:\n${missingOrigins.join('\n')}`);

// Writing #170 rewrites the browser-visible expression after 32900 registers.
// Gate those final static lines directly from 33600 so base-scene coverage
// cannot create a false-positive localisation claim.
const finalStatic=collectFinalWritingStatic(writingSource);
assert(finalStatic.size>=80,`expected broad 33600 final-writing extraction, got ${finalStatic.size}`);
const missingFinalStatic=[...finalStatic].filter(phrase=>!finalTexts.has(phrase));
assert.deepEqual(missingFinalStatic,[],`missing es-419 final-Writing phrases:\n${missingFinalStatic.join('\n')}`);

// Finite presentationResolver outcomes are enumerated in 35520. Representative
// fully rendered outputs prove each dynamic family resolves through exact text.
const finalDynamicRepresentatives=[
  "The instructor stops the exchange, corrects Hinata's footing and makes her repeat the decisive moment once. She moved first, pressed when the advantage appeared, then committed to the strike. No speech. Just: “Again.” Hinata resets without looking away.",
  'By the time the instructor calls the exercise, Wasabi has an answer—and a trail of reasons behind it. She has to account for the longer river route: what she actually saw, what she assumed and what happened while the target kept moving.',
  "Later, one small detail refuses to fit. Then another. The clothing no longer fits the country they described. Nothing proves anything yet. It is simply wrong enough to stay in Mirai's head.",
  'Suspicion has become a pattern. It still is not proof. The new answer gives Mirai another detail to compare.',
  'The collapsed section heaves upward and locks into a usable shelf. Then something underneath the collapsed edge moves. A Genin in travel-stained gear rolls out of the newly exposed hollow and freezes when he sees the Academy group. He was hiding here. He was not part of the lesson.',
  "The student is clear of the dummy's path because Metal chose to redirect it. When the yard settles, Metal is still thinking about the first combination—the one he landed clean before anyone clapped.",
  'The packet is on the table in front of the evaluator. The evaluator makes Kakashi reconstruct the operation in order: what he saw, what he inferred and what was lost when he chose one responsibility over another. Kakashi can describe the custody transfer because he watched it happen.',
  'Obito reaches the training approach later than he planned. The session is already underway; what remains must be resolved from the journey time he actually spent, not from whether helping was ‘good’ or ‘bad’.'
];
for(const phrase of finalDynamicRepresentatives)assert(finalTexts.has(phrase),`final dynamic render missing from 35520: ${phrase}`);

// High-exposure Journey / World / Arena phrases are explicitly covered while
// their mission/origin/action semantic IDs remain in 32800 unchanged.
const journeyRequired=[
  'TRACKED','MAIN STORY','MY CLAN · BATTLE ORDER','No authored interaction is currently available.',
  'CHRONICLE ORIGIN · AUTHORSHIP PRESERVED','BACK TO JOURNEY','Choose who your Chronicle begins with',
  'Form your first Academy team','Complete your Genin team','Academy Free Play & Promotion','Arc 1 Complete',
  'SHINOBI CHRONICLES · CURRENT JOURNEY','KONOHA CHRONICLE','YOUR CHRONICLE BEGINS HERE','CURRENT FRONTIER',
  'CHRONICLE ORIGIN','ARC 1 ROADMAP','UNLOCKS AFTER GENIN TEAM','Arc 1 waits for your Genin team.',
  'Konoha Arena','KONOHA · COMBAT & PROMOTION','MY CLAN START','ALPHA JOURNEY','Promotion',
  'CONTROLLED COMBAT','Staged Battles','LOCAL ALPHA SURFACE','PVP','KONOHA COMPETITION','Village Tournament'
];
for(const phrase of journeyRequired){
  assert(journeySource.includes(phrase),`Journey source no longer contains required phrase: ${phrase}`);
  assert(sourceTexts.has(phrase),`Journey phrase missing from es-419 catalogue: ${phrase}`);
}

// Exact phrase projection changes presentation only and is reversible.
core.setLocale('es-419',{persist:false,source:'qa'});
assert.equal(core.translatePresentedText('Controlled spar. Choose the opening approach.'),'Combate controlado. Elige el enfoque inicial.');
assert.equal(core.translatePresentedText('Which responsibility does Kakashi prioritise?'),'¿Qué responsabilidad prioriza Kakashi?');
assert.equal(core.translatePresentedText("I'm still going to be Hokage."),'Todavía voy a ser Hokage.');
assert.equal(core.translatePresentedText('Village Tournament'),'Torneo de la aldea');
assert.equal(core.translatePresentedText("Tomorrow... I'll do it cleaner."),'Mañana... lo haré mejor.');
for(const phrase of originPresented){
  const translated=core.translatePresentedText(phrase);
  assert(translated&&translated.trim(),`blank es-419 projection: ${phrase}`);
  assert.equal(core.validateProtectedTerms(phrase,translated).success,true,`protected glossary failure: ${phrase}`);
}
for(const phrase of finalStatic){
  const translated=core.translatePresentedText(phrase);
  assert(translated&&translated.trim(),`blank final-Writing es-419 projection: ${phrase}`);
  assert.notEqual(translated,phrase,`final-Writing phrase fell back to English: ${phrase}`);
  assert.equal(core.validateProtectedTerms(phrase,translated).success,true,`final-Writing protected glossary failure: ${phrase}`);
}
for(const phrase of finalDynamicRepresentatives){
  const translated=core.translatePresentedText(phrase);
  assert(translated&&translated!==phrase,`dynamic final-Writing phrase fell back to English: ${phrase}`);
  assert.equal(core.validateProtectedTerms(phrase,translated).success,true,`dynamic final-Writing glossary failure: ${phrase}`);
}
core.setLocale('en',{persist:false,source:'qa'});
assert.equal(core.translatePresentedText('¿Qué responsabilidad prioriza Kakashi?'),'Which responsibility does Kakashi prioritise?');
assert.equal(core.translatePresentedText('Torneo de la aldea'),'Village Tournament');
assert.equal(core.translatePresentedText('Mañana... lo haré mejor.'),"Tomorrow... I'll do it cleaner.");

// Production activation is chained 35500 -> 35510 -> 35520. Both catalogues
// remain independent of gameplay/runtime ownership.
assert(loaderSource.includes('runtime/alpha-localisation-35500.js'));
assert(loaderSource.includes('runtime/alpha-localisation-content-35510.js'));
assert(loaderSource.includes('runtime/alpha-localisation-final-writing-35520.js'));
assert(loaderSource.includes('script.addEventListener("load",loadContent,{once:true})'));
assert(loaderSource.includes('contentScript.addEventListener("load",loadFinalWriting,{once:true})'));
assert(loaderSource.includes('contentScript.async=false'));
assert(loaderSource.includes('finalScript.async=false'));
for(const source of [contentSource,finalSource]){
  for(const forbidden of ['commitOccurrence(','advanceStoryScene(','commitCharacterAcquisition(','startBattle(','currentPL=','basePL='])assert(!source.includes(forbidden));
  assert(!source.includes('data-choice-id='));
  assert(!source.includes('data-intent='));
  assert(!source.includes('generateImage'));
}

console.log(`Issue #190 localisation content QA: PASS (${originPresented.size} base Origin phrases, ${finalStatic.size} final Writing phrases, ${content.pairCount}+${finalWriting.pairCount} catalogue pairs)`);
