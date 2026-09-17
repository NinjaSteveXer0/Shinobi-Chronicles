'use strict';
const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const corePath='runtime/alpha-localisation-35500.js';
const contentPath='runtime/alpha-localisation-content-35510.js';
const loaderPath='runtime/alpha-origin-scenes-32900-core.js';
const journeyPath='runtime/alpha-journey-surface-32800.js';
const originPaths=[
  'runtime/alpha-origin-scenes-32900-a.js',
  'runtime/alpha-origin-scenes-32900-b.js',
  'runtime/alpha-origin-scenes-32900-c.js'
];
const coreSource=fs.readFileSync(corePath,'utf8');
const contentSource=fs.readFileSync(contentPath,'utf8');
const loaderSource=fs.readFileSync(loaderPath,'utf8');
const journeySource=fs.readFileSync(journeyPath,'utf8');

function boot(){
  const ctx={console,navigator:{languages:['en-US'],language:'en-US'},localStorage:{getItem(){return null;},setItem(){}},setTimeout,clearTimeout};
  ctx.globalThis=ctx;vm.createContext(ctx);
  vm.runInContext(coreSource,ctx,{filename:corePath});
  vm.runInContext(contentSource,ctx,{filename:contentPath});
  return ctx;
}
const ctx=boot();
const core=ctx.SC_ALPHA_LOCALISATION_35500;
const content=ctx.SC_ALPHA_LOCALISATION_CONTENT_35510;
assert(core);assert(content);assert.equal(content.diagnostics().pass,true);assert(content.pairCount>=180);
const sourceTexts=new Set(Array.from(content.sourceTexts));

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
for(const phrase of originPresented){
  const translated=core.translatePresentedText(phrase);
  assert(translated&&translated.trim(),`blank es-419 projection: ${phrase}`);
  assert.equal(core.validateProtectedTerms(phrase,translated).success,true,`protected glossary failure: ${phrase}`);
}
core.setLocale('en',{persist:false,source:'qa'});
assert.equal(core.translatePresentedText('¿Qué responsabilidad prioriza Kakashi?'),'Which responsibility does Kakashi prioritise?');
assert.equal(core.translatePresentedText('Torneo de la aldea'),'Village Tournament');

// Production activation is chained behind 35500 instead of becoming an
// independent gameplay/runtime owner.
assert(loaderSource.includes('runtime/alpha-localisation-35500.js'));
assert(loaderSource.includes('runtime/alpha-localisation-content-35510.js'));
assert(loaderSource.includes('script.addEventListener("load",loadContent,{once:true})'));
assert(loaderSource.includes('contentScript.async=false'));
for(const forbidden of ['commitOccurrence(','advanceStoryScene(','commitCharacterAcquisition(','startBattle(','currentPL=','basePL='])assert(!contentSource.includes(forbidden));
assert(!contentSource.includes('data-choice-id='));
assert(!contentSource.includes('data-intent='));
assert(!contentSource.includes('generateImage'));

console.log(`Issue #190 localisation content QA: PASS (${originPresented.size} Origin phrases, ${content.pairCount} catalogue pairs)`);
