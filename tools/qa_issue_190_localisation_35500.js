'use strict';

const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const runtimePath='runtime/alpha-localisation-35500.js';
const loaderPath='runtime/alpha-origin-scenes-32900-core.js';
const runtime=fs.readFileSync(runtimePath,'utf8');
const loader=fs.readFileSync(loaderPath,'utf8');

// Exact-head bridge: this file is watched by both the focused #190 workflow and
// the global #141 tools/qa_*.js closure workflow, so both gates certify one SHA.
function boot({stored=null,languages=['en-US']}={}){
  const store=new Map();if(stored!==null)store.set('shinobiChroniclesLocaleV1',stored);
  const playerData={rank:'Genin',currentPL:42,ownership:{academy_kakashi:true},knowledge:{lead:'sealed'},activityHistory:[{occurrenceId:'occ_1',intent:'OBSERVE'}]};
  const ctx={
    console,playerData,
    navigator:{languages:[...languages],language:languages[0]||'en-US'},
    localStorage:{getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)},
    setTimeout,clearTimeout
  };
  ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(runtime,ctx,{filename:runtimePath});return{ctx,store,playerData};
}

// Production activation: 35500 is dynamically booted from an always-loaded
// parser module, rather than being an orphaned source file.
assert(loader.includes('activateAlphaLocalisation35500From32900Core'));
assert(loader.includes('runtime/alpha-localisation-35500.js'));
assert(loader.includes('script.async=false'));
assert(!loader.includes('scSetLocale35500('));

// Default/canonical locale and safe browser-language convenience detection.
{
  const {ctx}=boot({languages:['en-US']});
  const L=ctx.SC_ALPHA_LOCALISATION_35500;
  assert.equal(L.defaultLocale,'en');
  assert.deepEqual(Array.from(L.supportedLocales),['en','es-419']);
  assert.equal(L.getLocale(),'en');
  assert.equal(L.diagnostics().pass,true);
}
{
  const {ctx}=boot({languages:['es-MX','en-US']});
  assert.equal(ctx.SC_ALPHA_LOCALISATION_35500.getLocale(),'es-419');
}

// Explicit preference outranks browser detection and persists outside game state.
{
  const {ctx,store,playerData}=boot({stored:'en',languages:['es-MX']});
  const L=ctx.SC_ALPHA_LOCALISATION_35500;
  const before=JSON.stringify(playerData);
  assert.equal(L.getLocale(),'en');
  const changed=L.setLocale('es-419',{persist:true,source:'qa'});
  assert.equal(changed.success,true);assert.equal(changed.locale,'es-419');
  assert.equal(store.get('shinobiChroniclesLocaleV1'),'es-419');
  assert.equal(JSON.stringify(playerData),before);
  assert.equal(playerData.activityHistory[0].intent,'OBSERVE');
}

// English is canonical fallback; missing Spanish never becomes blank.
{
  const {ctx}=boot({stored:'es-419'}),L=ctx.SC_ALPHA_LOCALISATION_35500;
  assert.equal(L.translate('shell.nav.missions'),'MISIONES');
  assert.equal(L.translate('__missing_key',{},'VISIBLE ENGLISH FALLBACK'),'VISIBLE ENGLISH FALLBACK');
  assert.equal(L.translate('__missing_key_without_fallback'),'__missing_key_without_fallback');
  assert.equal(L.registerLocaleMessages('en',{'qa.only_english':'English fallback text'}).success,true);
  assert.equal(L.translate('qa.only_english'),'English fallback text');
}

// Placeholders interpolate without translating values/identifiers themselves.
{
  const {ctx}=boot(),L=ctx.SC_ALPHA_LOCALISATION_35500;
  assert.equal(L.interpolate('Actor {actorRef} chose {intent}.',{actorRef:'academy_kakashi',intent:'OBSERVE'}),'Actor academy_kakashi chose OBSERVE.');
  for(const semantic of ['OBSERVE','ATTACK','academy_kakashi','stop_package_transfer','TRANSFER_PREVENTED','occ_123','result_456']){
    assert.equal(L.translatePresentedText(semantic),semantic);
  }
}

// Exact player-facing phrase translation is reversible on locale switch.
{
  const {ctx}=boot(),L=ctx.SC_ALPHA_LOCALISATION_35500;
  L.setLocale('es-419',{persist:false,source:'qa'});
  assert.equal(L.translatePresentedText('CONTINUE CHRONICLE'),'CONTINUAR CRÓNICA');
  assert.equal(L.translatePresentedText('Ninja ID: Sakura · Continue restores the currently saved Chronicle exactly as it stands.'),'ID ninja: Sakura · Continuar restaura la crónica guardada exactamente como está.');
  L.setLocale('en',{persist:false,source:'qa'});
  assert.equal(L.translatePresentedText('CONTINUAR CRÓNICA'),'CONTINUE CHRONICLE');
  assert.equal(L.translatePresentedText('ID ninja: Sakura · Continuar restaura la crónica guardada exactamente como está.'),'Ninja ID: Sakura · Continue restores the currently saved Chronicle exactly as it stands.');
}

// Protected Shinobi terminology is enforced independently of sentence language.
{
  const {ctx}=boot(),L=ctx.SC_ALPHA_LOCALISATION_35500;
  assert.equal(L.validateProtectedTerms('Kakashi is a Jōnin from Konoha.','Kakashi es un Jōnin de Konoha.').success,true);
  const bad=L.validateProtectedTerms('ANBU Kakashi uses Ninjutsu.','Kakashi usa ninjutsu.');
  assert.equal(bad.success,false);assert(bad.missing.includes('ANBU'));assert(bad.missing.includes('Ninjutsu'));
  const catalog=L.validateCatalog('es-419');assert.equal(catalog.success,true);assert.equal(catalog.missing.length,0);assert.equal(catalog.glossaryFailures.length,0);
}

// Source-level architecture guards: only presentation attributes are translated;
// expansion resilience exists; no image regeneration or gameplay commit APIs.
assert(runtime.includes('TRANSLATABLE_ATTRS=Object.freeze(["aria-label","title","placeholder"])'));
for(const forbidden of ['data-intent','data-choice-id','data-actor-ref','data-result-ref'])assert(!runtime.includes(`TRANSLATABLE_ATTRS=Object.freeze(["${forbidden}`));
assert(runtime.includes('overflow-wrap:anywhere'));
assert(runtime.includes('white-space:normal'));
assert(runtime.includes('MutationObserver'));
assert(runtime.includes('sc:localechange'));
assert(runtime.includes('<select id="sc-language-select-35500"'));
assert(!runtime.includes('commitOccurrence('));
assert(!runtime.includes('advanceStoryScene('));
assert(!runtime.includes('commitCharacterAcquisition('));
assert(!runtime.includes('generateImage'));

console.log('Issue #190 localisation core QA: PASS');
