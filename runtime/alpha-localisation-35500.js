// ============================================================================
// ISSUE #190 — PRE-PUBLIC-ALPHA LOCALISATION CORE — 35500
//
// English is canonical authoring/semantic authority. Locales translate only
// player-facing presentation. Semantic IDs, Chronicle facts, Rank, PL,
// ownership, Knowledge and resolver outcomes are never locale-owned.
//
// First production locale: Latin American Spanish (`es-419`).
// ============================================================================
(function installAlphaLocalisation35500(){
"use strict";
if(globalThis.SC_ALPHA_LOCALISATION_35500)return;

const PATCH_ID="alpha_localisation_35500_v1_2026_09_17";
const AUTHORITY_DOC="Documentation/Coordination/Pre-Public-Alpha_Localisation_and_es-419_Translation_Requirement_2026-09-14.md";
const STORAGE_KEY="shinobiChroniclesLocaleV1";
const DEFAULT_LOCALE="en";
const SUPPORTED=Object.freeze(["en","es-419"]);
const SELECTOR_ID="sc-language-selector-35500";
const STYLE_ID="sc-localisation-35500-style";
const TRANSLATABLE_ATTRS=Object.freeze(["aria-label","title","placeholder"]);
const SKIP_TAGS=new Set(["SCRIPT","STYLE","CODE","PRE","TEXTAREA","NOSCRIPT"]);
const PROTECTED_TERMS=Object.freeze([
  "Hokage","Chūnin","Jōnin","ANBU","Konoha","Sharingan","Ninjutsu","Taijutsu","Genjutsu","Fūinjutsu","Shinobi","Kakashi","Menma","Obito","Kushina","Hinata","Ryō","PL"
]);

const EN=Object.freeze({
  "locale.selector.label":"LANGUAGE",
  "locale.selector.english":"English",
  "locale.selector.spanish":"Español (Latinoamérica)",
  "shell.nav.clan":"YOUR CLAN",
  "shell.nav.village":"VILLAGE",
  "shell.nav.missions":"MISSIONS",
  "shell.nav.arena":"ARENA",
  "shell.nav.exams":"EXAMS",
  "shell.nav.practical":"PRACTICAL",
  "shell.nav.training":"TRAINING",
  "shell.hud.rank":"RANK:",
  "shell.hud.chronicle":"CHRONICLE:",
  "shell.location.title":"CURRENT LOCATION",
  "shell.location.konoha":"HIDDEN LEAF VILLAGE",
  "shell.location.fire":"Land of Fire",
  "shell.location.unlocked":"Region Unlocked",
  "shell.location.explore_fire":"EXPLORE LAND OF FIRE",
  "shell.progress.title":"WORLD PROGRESS",
  "shell.progress.countries":"Known Countries",
  "shell.progress.regions":"Playable Regional Surfaces",
  "shell.legend.title":"MAP LEGEND",
  "shell.legend.playable":"Playable Region",
  "shell.legend.known":"Known Geography",
  "shell.legend.great_country":"Five Great Country",
  "shell.legend.smaller_country":"Smaller Country",
  "shell.legend.unknown":"???? — Unknown Special Location",
  "shell.access.title":"CHRONICLE ACCESS",
  "shell.access.continue":"Continue Chronicle",
  "shell.access.activity":"Current World Activity",
  "shell.access.record":"Shinobi Record",
  "frontdoor.aria":"Shinobi Chronicles front door",
  "frontdoor.progress":"Onboarding progress",
  "frontdoor.brand.alpha":"ALPHA CHRONICLE",
  "frontdoor.brand.world":"WORLD OF NINJA",
  "frontdoor.landing.eyebrow":"ENTER THE CHRONICLE",
  "frontdoor.landing.title":"Your story begins with a choice.",
  "frontdoor.landing.copy":"Create a new shinobi Chronicle from the beginning, or deliberately continue the Chronicle already stored in this browser. The game will no longer drop directly into an old Battle or Story checkpoint without asking.",
  "frontdoor.landing.existing":"EXISTING CHRONICLE DETECTED",
  "frontdoor.landing.restore":"Continue restores the currently saved Chronicle exactly as it stands.",
  "frontdoor.landing.continue":"CONTINUE CHRONICLE",
  "frontdoor.landing.new":"NEW CHRONICLE",
  "frontdoor.landing.begin":"BEGIN CHRONICLE",
  "frontdoor.ninja_id.step":"STEP 1 · NINJA ID",
  "frontdoor.ninja_id.title":"Create your Ninja ID.",
  "frontdoor.ninja_id.copy":"This is your player-facing Chronicle profile name. It is not a Registry character, Rank, PL value, ownership record or Story participant identity.",
  "frontdoor.ninja_id.label":"NINJA ID",
  "frontdoor.ninja_id.placeholder":"Enter your Ninja ID",
  "frontdoor.ninja_id.hint":"2–24 characters. This profile label remains separate from the shinobi you choose next.",
  "frontdoor.ninja_id.invalid_length":"Ninja ID must be 2–24 characters.",
  "frontdoor.ninja_id.invalid_chars":"Ninja ID contains unsupported characters.",
  "frontdoor.back":"BACK",
  "frontdoor.choose_village":"CHOOSE VILLAGE",
  "frontdoor.village.step":"STEP 2 · CHOOSE VILLAGE",
  "frontdoor.village.title":"Choose your starting village.",
  "frontdoor.village.copy":"Alpha currently begins in Konohagakure. The other Great Villages are shown truthfully as unavailable starting points rather than pretending they have complete onboarding routes.",
  "frontdoor.village.locked":"LOCKED",
  "frontdoor.village.leaf":"HIDDEN LEAF",
  "frontdoor.village.sand":"HIDDEN SAND",
  "frontdoor.village.mist":"HIDDEN MIST",
  "frontdoor.village.cloud":"HIDDEN CLOUD",
  "frontdoor.village.stone":"HIDDEN STONE",
  "frontdoor.village.fire":"LAND OF FIRE",
  "frontdoor.village.wind":"LAND OF WIND",
  "frontdoor.village.water":"LAND OF WATER",
  "frontdoor.village.lightning":"LAND OF LIGHTNING",
  "frontdoor.village.earth":"LAND OF EARTH",
  "frontdoor.village.alpha_start":"ALPHA START",
  "frontdoor.village.not_alpha":"NOT AVAILABLE IN ALPHA",
  "frontdoor.village.choose_leaf":"Choose Hidden Leaf to continue the current Alpha.",
  "frontdoor.choose_ninja":"CHOOSE NINJA",
  "frontdoor.ninja.step":"STEP 3 · CHOOSE NINJA",
  "frontdoor.ninja.title":"Choose the shinobi whose Chronicle you will begin.",
  "frontdoor.ninja.copy":"This is the existing Chronicle-Origin choice. Confirmation creates exactly one protagonist ownership record and locks that Ninja identity before the authored Origin prologue begins.",
  "frontdoor.ninja.village":"VILLAGE ·",
  "frontdoor.ninja.base_pl":"BASE PL",
  "frontdoor.ninja.confirm":"CONFIRM NINJA & BEGIN ORIGIN",
  "frontdoor.ninja.origin_not_ready":"Chronicle Origin runtime is not ready.",
  "frontdoor.ninja.origin_required":"Choose one of the ten available Chronicle Origins.",
  "frontdoor.ninja.origin_not_registered":"The selected Origin prologue is not registered.",
  "frontdoor.ninja.leaf_required":"Hidden Leaf must be selected for the current Alpha start.",
  "frontdoor.reset.title":"Erase the Chronicle stored in this browser?",
  "frontdoor.reset.warning":"This clears the canonical player save, the front-door profile and the transient session resume checkpoint. It does not remap Registry identities or alter source authority. This action cannot be undone from the game UI.",
  "frontdoor.reset.cancel":"CANCEL",
  "frontdoor.reset.confirm":"ERASE & START NEW",
  "story.common.scene":"STORY SCENE",
  "story.common.objective":"OBJECTIVE",
  "story.common.committed":"CHRONICLE FACT COMMITTED",
  "story.common.unknown":"UNKNOWN",
  "story.common.object":"OBJECT",
  "story.common.advance":"Advance scene",
  "battle.common.victory":"VICTORY",
  "battle.common.setback":"SETBACK",
  "battle.common.continue":"CONTINUE",
  "battle.common.skill_details":"SKILL DETAILS",
  "battle.common.choose_mode":"CHOOSE MODE TO EXECUTE",
  "battle.common.clear_selection":"CLEAR SELECTION",
  "battle.common.selected":"SELECTED",
  "battle.common.ready":"READY",
  "battle.common.unavailable":"UNAVAILABLE",
  "battle.common.empty":"EMPTY",
  "battle.common.no_authored_skills":"NO AUTHORED SKILLS",
  "battle.common.target":"TARGET:",
  "battle.common.prepared_skills":"Prepared Battle Skills",
  "battle.setback.complete":"BATTLE COMPLETE · CHRONICLE RESULT",
  "battle.setback.no_reward":"NO REWARD CLAIM",
  "battle.setback.your_side":"YOUR SIDE",
  "battle.setback.opposition":"OPPOSITION",
  "battle.setback.return":"RETURN"
});

const ES419=Object.freeze({
  "locale.selector.label":"IDIOMA",
  "locale.selector.english":"English",
  "locale.selector.spanish":"Español (Latinoamérica)",
  "shell.nav.clan":"TU CLAN",
  "shell.nav.village":"ALDEA",
  "shell.nav.missions":"MISIONES",
  "shell.nav.arena":"ARENA",
  "shell.nav.exams":"EXÁMENES",
  "shell.nav.practical":"PRÁCTICA",
  "shell.nav.training":"ENTRENAMIENTO",
  "shell.hud.rank":"RANGO:",
  "shell.hud.chronicle":"CRÓNICA:",
  "shell.location.title":"UBICACIÓN ACTUAL",
  "shell.location.konoha":"ALDEA OCULTA DE LA HOJA",
  "shell.location.fire":"País del Fuego",
  "shell.location.unlocked":"Región desbloqueada",
  "shell.location.explore_fire":"EXPLORAR EL PAÍS DEL FUEGO",
  "shell.progress.title":"PROGRESO DEL MUNDO",
  "shell.progress.countries":"Países conocidos",
  "shell.progress.regions":"Regiones jugables",
  "shell.legend.title":"LEYENDA DEL MAPA",
  "shell.legend.playable":"Región jugable",
  "shell.legend.known":"Geografía conocida",
  "shell.legend.great_country":"Gran País Ninja",
  "shell.legend.smaller_country":"País menor",
  "shell.legend.unknown":"???? — Ubicación especial desconocida",
  "shell.access.title":"ACCESO A LA CRÓNICA",
  "shell.access.continue":"Continuar crónica",
  "shell.access.activity":"Actividad actual del mundo",
  "shell.access.record":"Registro Shinobi",
  "frontdoor.aria":"Inicio de Shinobi Chronicles",
  "frontdoor.progress":"Progreso de inicio",
  "frontdoor.brand.alpha":"CRÓNICA ALPHA",
  "frontdoor.brand.world":"MUNDO NINJA",
  "frontdoor.landing.eyebrow":"ENTRA EN LA CRÓNICA",
  "frontdoor.landing.title":"Tu historia comienza con una elección.",
  "frontdoor.landing.copy":"Crea una nueva crónica shinobi desde el principio o continúa deliberadamente la crónica que ya está guardada en este navegador. El juego ya no te llevará directamente a un punto antiguo de Batalla o Historia sin preguntarte.",
  "frontdoor.landing.existing":"CRÓNICA EXISTENTE DETECTADA",
  "frontdoor.landing.restore":"Continuar restaura la crónica guardada exactamente como está.",
  "frontdoor.landing.continue":"CONTINUAR CRÓNICA",
  "frontdoor.landing.new":"NUEVA CRÓNICA",
  "frontdoor.landing.begin":"INICIAR CRÓNICA",
  "frontdoor.ninja_id.step":"PASO 1 · ID NINJA",
  "frontdoor.ninja_id.title":"Crea tu ID ninja.",
  "frontdoor.ninja_id.copy":"Este es el nombre visible de tu perfil de crónica. No es un personaje del Registro, ni un Rango, valor de PL, registro de propiedad o identidad de participante de Historia.",
  "frontdoor.ninja_id.label":"ID NINJA",
  "frontdoor.ninja_id.placeholder":"Ingresa tu ID ninja",
  "frontdoor.ninja_id.hint":"2–24 caracteres. Esta etiqueta de perfil permanece separada del shinobi que elegirás después.",
  "frontdoor.ninja_id.invalid_length":"El ID ninja debe tener entre 2 y 24 caracteres.",
  "frontdoor.ninja_id.invalid_chars":"El ID ninja contiene caracteres no compatibles.",
  "frontdoor.back":"ATRÁS",
  "frontdoor.choose_village":"ELEGIR ALDEA",
  "frontdoor.village.step":"PASO 2 · ELEGIR ALDEA",
  "frontdoor.village.title":"Elige tu aldea inicial.",
  "frontdoor.village.copy":"La Alpha comienza actualmente en Konohagakure. Las demás Grandes Aldeas se muestran de forma veraz como puntos iniciales no disponibles, en vez de fingir que tienen rutas de inicio completas.",
  "frontdoor.village.locked":"BLOQUEADO",
  "frontdoor.village.leaf":"ALDEA OCULTA DE LA HOJA",
  "frontdoor.village.sand":"ALDEA OCULTA DE LA ARENA",
  "frontdoor.village.mist":"ALDEA OCULTA DE LA NIEBLA",
  "frontdoor.village.cloud":"ALDEA OCULTA DE LA NUBE",
  "frontdoor.village.stone":"ALDEA OCULTA DE LA ROCA",
  "frontdoor.village.fire":"PAÍS DEL FUEGO",
  "frontdoor.village.wind":"PAÍS DEL VIENTO",
  "frontdoor.village.water":"PAÍS DEL AGUA",
  "frontdoor.village.lightning":"PAÍS DEL RAYO",
  "frontdoor.village.earth":"PAÍS DE LA TIERRA",
  "frontdoor.village.alpha_start":"INICIO ALPHA",
  "frontdoor.village.not_alpha":"NO DISPONIBLE EN ALPHA",
  "frontdoor.village.choose_leaf":"Elige la Aldea Oculta de la Hoja para continuar la Alpha actual.",
  "frontdoor.choose_ninja":"ELEGIR NINJA",
  "frontdoor.ninja.step":"PASO 3 · ELEGIR NINJA",
  "frontdoor.ninja.title":"Elige el shinobi cuya crónica comenzarás.",
  "frontdoor.ninja.copy":"Esta es la elección de Origen de Crónica existente. La confirmación crea exactamente un registro de propiedad del protagonista y fija esa identidad ninja antes de que comience el prólogo de Origen escrito.",
  "frontdoor.ninja.village":"ALDEA ·",
  "frontdoor.ninja.base_pl":"PL BASE",
  "frontdoor.ninja.confirm":"CONFIRMAR NINJA E INICIAR ORIGEN",
  "frontdoor.ninja.origin_not_ready":"El runtime del Origen de Crónica no está listo.",
  "frontdoor.ninja.origin_required":"Elige uno de los diez Orígenes de Crónica disponibles.",
  "frontdoor.ninja.origin_not_registered":"El prólogo del Origen seleccionado no está registrado.",
  "frontdoor.ninja.leaf_required":"La Aldea Oculta de la Hoja debe estar seleccionada para el inicio de la Alpha actual.",
  "frontdoor.reset.title":"¿Borrar la crónica guardada en este navegador?",
  "frontdoor.reset.warning":"Esto borra la partida canónica del jugador, el perfil de inicio y el punto temporal de reanudación de sesión. No reasigna identidades del Registro ni altera la autoridad de origen. Esta acción no se puede deshacer desde la interfaz del juego.",
  "frontdoor.reset.cancel":"CANCELAR",
  "frontdoor.reset.confirm":"BORRAR Y EMPEZAR DE NUEVO",
  "story.common.scene":"ESCENA DE HISTORIA",
  "story.common.objective":"OBJETIVO",
  "story.common.committed":"HECHO DE CRÓNICA REGISTRADO",
  "story.common.unknown":"DESCONOCIDO",
  "story.common.object":"OBJETO",
  "story.common.advance":"Avanzar escena",
  "battle.common.victory":"VICTORIA",
  "battle.common.setback":"REVÉS",
  "battle.common.continue":"CONTINUAR",
  "battle.common.skill_details":"DETALLES DE LA TÉCNICA",
  "battle.common.choose_mode":"ELIGE UN MODO PARA EJECUTAR",
  "battle.common.clear_selection":"BORRAR SELECCIÓN",
  "battle.common.selected":"SELECCIONADO",
  "battle.common.ready":"LISTO",
  "battle.common.unavailable":"NO DISPONIBLE",
  "battle.common.empty":"VACÍO",
  "battle.common.no_authored_skills":"SIN TÉCNICAS DEFINIDAS",
  "battle.common.target":"OBJETIVO:",
  "battle.common.prepared_skills":"Técnicas de Batalla preparadas",
  "battle.setback.complete":"BATALLA COMPLETA · RESULTADO DE CRÓNICA",
  "battle.setback.no_reward":"SIN RECOMPENSA",
  "battle.setback.your_side":"TU LADO",
  "battle.setback.opposition":"OPOSICIÓN",
  "battle.setback.return":"REGRESO"
});

const catalogs=new Map([["en",{...EN}],["es-419",{...ES419}]]);
let phraseIndexes=new Map();
let activeLocale=DEFAULT_LOCALE;
let observer=null;
let applying=false;

function normalizeLocale(value){
  const raw=String(value||"").trim().toLowerCase();
  if(raw==="en"||raw.startsWith("en-"))return "en";
  if(raw==="es-419"||raw==="es_419"||raw==="es"||raw.startsWith("es-"))return "es-419";
  return null;
}
function buildPhraseIndexes(){
  const indexes=new Map();
  for(const [locale,messages] of catalogs){
    const index=new Map();
    for(const [key,value] of Object.entries(messages))if(typeof value==="string"&&value.trim())index.set(value.trim(),key);
    indexes.set(locale,index);
  }
  phraseIndexes=indexes;
}
buildPhraseIndexes();
function readStoredLocale(){
  try{return normalizeLocale(globalThis.localStorage&&localStorage.getItem(STORAGE_KEY));}catch(_error){return null;}
}
function detectBrowserLocale(){
  try{
    const langs=[];
    if(globalThis.navigator&&Array.isArray(navigator.languages))langs.push(...navigator.languages);
    if(globalThis.navigator&&navigator.language)langs.push(navigator.language);
    for(const row of langs){const resolved=normalizeLocale(row);if(resolved==="es-419")return resolved;if(resolved==="en")return resolved;}
  }catch(_error){}
  return DEFAULT_LOCALE;
}
activeLocale=readStoredLocale()||detectBrowserLocale();

function interpolate(template,variables={}){
  return String(template??"").replace(/\{([A-Za-z0-9_.-]+)\}/g,(match,key)=>Object.prototype.hasOwnProperty.call(variables,key)?String(variables[key]):match);
}
function translate(key,variables={},fallback=null,locale=activeLocale){
  const resolved=normalizeLocale(locale)||DEFAULT_LOCALE;
  const local=catalogs.get(resolved)||{};
  const english=catalogs.get(DEFAULT_LOCALE)||{};
  const template=Object.prototype.hasOwnProperty.call(local,key)?local[key]:Object.prototype.hasOwnProperty.call(english,key)?english[key]:fallback!==null&&fallback!==undefined?fallback:key;
  return interpolate(template,variables);
}
function registerLocaleMessages(locale,messages){
  const resolved=normalizeLocale(locale);
  if(!resolved||!messages||typeof messages!=="object"||Array.isArray(messages))return{success:false,reason:"locale_messages_required"};
  const current=catalogs.get(resolved)||{};
  for(const [key,value] of Object.entries(messages))if(typeof key==="string"&&key&&typeof value==="string")current[key]=value;
  catalogs.set(resolved,current);buildPhraseIndexes();
  return{success:true,locale:resolved,count:Object.keys(messages).length};
}
function keyForPresentedText(text){
  const core=String(text??"").trim();if(!core)return null;
  for(const index of phraseIndexes.values())if(index.has(core))return index.get(core);
  return null;
}
function dynamicPresentation(text,locale=activeLocale){
  const core=String(text??"").trim();
  let match=core.match(/^Ninja ID: (.+) · Continue restores the currently saved Chronicle exactly as it stands\.$/);
  if(match)return locale==="es-419"?`ID ninja: ${match[1]} · Continuar restaura la crónica guardada exactamente como está.`:core;
  match=core.match(/^ID ninja: (.+) · Continuar restaura la crónica guardada exactamente como está\.$/);
  if(match)return locale==="en"?`Ninja ID: ${match[1]} · Continue restores the currently saved Chronicle exactly as it stands.`:core;
  match=core.match(/^Origin selection authority is not ready: expected 10 candidates, found (\d+)\.$/);
  if(match)return locale==="es-419"?`La autoridad de selección de Origen no está lista: se esperaban 10 candidatos y se encontraron ${match[1]}.`:core;
  match=core.match(/^La autoridad de selección de Origen no está lista: se esperaban 10 candidatos y se encontraron (\d+)\.$/);
  if(match)return locale==="en"?`Origin selection authority is not ready: expected 10 candidates, found ${match[1]}.`:core;
  match=core.match(/^Origin confirmation failed: (.+)\.$/);
  if(match)return locale==="es-419"?`Falló la confirmación del Origen: ${match[1]}.`:core;
  match=core.match(/^Falló la confirmación del Origen: (.+)\.$/);
  if(match)return locale==="en"?`Origin confirmation failed: ${match[1]}.`:core;
  match=core.match(/^Origin was confirmed, but the prologue could not open: (.+)\.$/);
  if(match)return locale==="es-419"?`El Origen fue confirmado, pero no se pudo abrir el prólogo: ${match[1]}.`:core;
  match=core.match(/^El Origen fue confirmado, pero no se pudo abrir el prólogo: (.+)\.$/);
  if(match)return locale==="en"?`Origin was confirmed, but the prologue could not open: ${match[1]}.`:core;
  return core;
}
function translatePresentedText(raw,locale=activeLocale){
  const text=String(raw??"");
  const lead=(text.match(/^\s*/)||[""])[0],tail=(text.match(/\s*$/)||[""])[0];
  const core=text.slice(lead.length,text.length-tail.length||undefined);if(!core.trim())return text;
  const key=keyForPresentedText(core);
  if(key)return lead+translate(key,{},core,locale)+tail;
  const dynamic=dynamicPresentation(core,normalizeLocale(locale)||DEFAULT_LOCALE);
  return dynamic===core?text:lead+dynamic+tail;
}
function validateProtectedTerms(source,translated){
  const src=String(source??""),out=String(translated??"");
  const missing=PROTECTED_TERMS.filter(term=>src.includes(term)&&!out.includes(term));
  return{success:missing.length===0,missing};
}
function validateCatalog(locale){
  const resolved=normalizeLocale(locale);if(!resolved)return{success:false,reason:"unsupported_locale"};
  const base=catalogs.get(DEFAULT_LOCALE)||{},target=catalogs.get(resolved)||{};
  const missing=Object.keys(base).filter(key=>!Object.prototype.hasOwnProperty.call(target,key));
  const glossaryFailures=[];
  for(const [key,source] of Object.entries(base)){
    const translated=Object.prototype.hasOwnProperty.call(target,key)?target[key]:source;
    const check=validateProtectedTerms(source,translated);if(!check.success)glossaryFailures.push({key,missing:check.missing});
  }
  return{success:missing.length===0&&glossaryFailures.length===0,locale:resolved,missing,glossaryFailures,keyCount:Object.keys(base).length};
}
function markLocalized(element){
  try{if(element&&element.setAttribute&&element.id!==SELECTOR_ID&&!element.closest?.(`#${SELECTOR_ID}`))element.setAttribute("data-sc-localized","true");}catch(_error){}
}
function applyTextNode(node){
  if(!node||node.nodeType!==3||!node.parentElement||SKIP_TAGS.has(node.parentElement.tagName)||node.parentElement.closest?.(`#${SELECTOR_ID}`))return false;
  const next=translatePresentedText(node.nodeValue,activeLocale);if(next===node.nodeValue)return false;node.nodeValue=next;markLocalized(node.parentElement);return true;
}
function applyAttributes(element){
  if(!element||element.nodeType!==1||SKIP_TAGS.has(element.tagName)||element.id===SELECTOR_ID||element.closest?.(`#${SELECTOR_ID}`))return 0;
  let count=0;
  for(const attr of TRANSLATABLE_ATTRS){
    if(!element.hasAttribute||!element.hasAttribute(attr))continue;
    const current=element.getAttribute(attr),next=translatePresentedText(current,activeLocale);if(next!==current){element.setAttribute(attr,next);count++;markLocalized(element);}
  }
  return count;
}
function applyDocument(root=globalThis.document){
  if(applying||!root)return{success:false,reason:"document_unavailable_or_busy"};applying=true;
  let changed=0;
  try{
    if(globalThis.document&&document.documentElement){document.documentElement.lang=activeLocale;document.documentElement.dataset.scLocale=activeLocale;}
    const start=root.nodeType===1||root.nodeType===3?root:root.body||root.documentElement||root;
    if(!start)return{success:true,changed:0,locale:activeLocale};
    if(start.nodeType===3)changed+=applyTextNode(start)?1:0;
    else{
      changed+=applyAttributes(start);
      if(globalThis.document&&typeof document.createTreeWalker==="function"&&globalThis.NodeFilter){
        const walker=document.createTreeWalker(start,NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode()))if(applyTextNode(node))changed++;
      }else if(start.querySelectorAll){
        for(const element of start.querySelectorAll("*"))changed+=applyAttributes(element);
      }
      if(start.querySelectorAll)for(const element of start.querySelectorAll("*"))changed+=applyAttributes(element);
    }
    syncSelector();return{success:true,changed,locale:activeLocale};
  }finally{applying=false;}
}
function persistLocale(locale){try{if(globalThis.localStorage)localStorage.setItem(STORAGE_KEY,locale);return true;}catch(_error){return false;}}
function dispatchLocaleChange(previous,source){
  try{if(globalThis.document&&typeof document.dispatchEvent==="function"&&typeof globalThis.CustomEvent==="function")document.dispatchEvent(new CustomEvent("sc:localechange",{detail:{locale:activeLocale,previous,source}}));}catch(_error){}
}
function setLocale(locale,{persist=true,source="manual"}={}){
  const resolved=normalizeLocale(locale);if(!resolved||!SUPPORTED.includes(resolved))return{success:false,reason:"unsupported_locale",locale};
  const previous=activeLocale;activeLocale=resolved;if(persist)persistLocale(resolved);applyDocument();dispatchLocaleChange(previous,source);
  return{success:true,locale:resolved,previous,persisted:persist};
}
function getLocale(){return activeLocale;}
function syncSelector(){
  if(!globalThis.document)return false;const select=document.getElementById("sc-language-select-35500");if(select&&select.value!==activeLocale)select.value=activeLocale;const label=document.querySelector(`#${SELECTOR_ID} label`);if(label)label.textContent=translate("locale.selector.label");return !!select;
}
function installStyles(){
  if(!globalThis.document||!document.head||document.getElementById(STYLE_ID))return false;
  const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
#${SELECTOR_ID}{position:fixed;top:8px;right:10px;z-index:2147483646;display:flex;align-items:center;gap:6px;padding:5px 7px;border:1px solid rgba(214,169,58,.34);background:rgba(3,9,13,.92);box-shadow:0 5px 18px rgba(0,0,0,.35);font:700 9px/1 Arial,sans-serif;letter-spacing:.07em;color:#d8c384;backdrop-filter:blur(4px)}
#${SELECTOR_ID} select{max-width:160px;min-height:26px;border:1px solid rgba(88,199,210,.28);background:#071117;color:#e6ddc8;padding:2px 5px;font:700 10px/1.2 Arial,sans-serif;outline:none}
html[data-sc-locale="es-419"] [data-sc-localized="true"]{overflow-wrap:anywhere;word-break:normal;hyphens:auto}
html[data-sc-locale="es-419"] button[data-sc-localized="true"],html[data-sc-locale="es-419"] [role="button"][data-sc-localized="true"]{white-space:normal;min-width:0}
@media(max-width:720px){#${SELECTOR_ID}{top:auto;right:6px;bottom:6px}#${SELECTOR_ID} label{display:none}#${SELECTOR_ID} select{max-width:132px}}
`;
  document.head.appendChild(style);return true;
}
function installSelector(){
  if(!globalThis.document||!document.body)return false;installStyles();
  let root=document.getElementById(SELECTOR_ID);if(!root){root=document.createElement("div");root.id=SELECTOR_ID;root.setAttribute("role","group");root.setAttribute("aria-label","Language selector");root.innerHTML=`<label for="sc-language-select-35500">${translate("locale.selector.label")}</label><select id="sc-language-select-35500" aria-label="Language"><option value="en">${EN["locale.selector.english"]}</option><option value="es-419">${ES419["locale.selector.spanish"]}</option></select>`;document.body.appendChild(root);const select=root.querySelector("select");if(select)select.addEventListener("change",event=>setLocale(event.target.value,{persist:true,source:"selector"}));}
  syncSelector();return true;
}
function installObserver(){
  if(!globalThis.document||typeof globalThis.MutationObserver!=="function"||observer)return false;
  const target=document.body||document.documentElement;if(!target)return false;
  observer=new MutationObserver(records=>{if(applying)return;for(const record of records){for(const node of record.addedNodes||[]){if(node&&node.nodeType!==8)applyDocument(node);}}});observer.observe(target,{childList:true,subtree:true});return true;
}
function installBrowser(){
  if(!globalThis.document)return false;installSelector();applyDocument();installObserver();return true;
}
function diagnostics(){
  const spanish=validateCatalog("es-419");
  const checks={
    supportedLocalesExact:SUPPORTED.length===2&&SUPPORTED[0]==="en"&&SUPPORTED[1]==="es-419",
    englishCanonical:DEFAULT_LOCALE==="en",
    preferenceSeparate:STORAGE_KEY==="shinobiChroniclesLocaleV1"&&!STORAGE_KEY.includes("PlayerSave")&&!STORAGE_KEY.includes("playerData"),
    spanishCatalogueComplete:spanish.success===true,
    protectedGlossaryPresent:PROTECTED_TERMS.includes("Hokage")&&PROTECTED_TERMS.includes("Chūnin")&&PROTECTED_TERMS.includes("Jōnin")&&PROTECTED_TERMS.includes("ANBU")&&PROTECTED_TERMS.includes("Konoha")&&PROTECTED_TERMS.includes("Sharingan")&&PROTECTED_TERMS.includes("Ninjutsu")&&PROTECTED_TERMS.includes("Taijutsu")&&PROTECTED_TERMS.includes("Genjutsu")&&PROTECTED_TERMS.includes("Fūinjutsu"),
    englishFallback:translate("__missing_key",{},"VISIBLE_ENGLISH_FALLBACK","es-419")==="VISIBLE_ENGLISH_FALLBACK",
    interpolation:interpolate("A {name} B",{name:"Kakashi"})==="A Kakashi B",
    semanticAttributesUntouched:TRANSLATABLE_ATTRS.every(attr=>!["id","value","name","data-intent","data-choice-id","data-actor-ref","data-result-ref"].includes(attr)),
    localeDoesNotOwnGameplay:!["playerData","advanceStoryScene","commitOccurrence","currentPL","basePL","Rank","ownership"].some(token=>setLocale.toString().includes(token)),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,authorityDoc:AUTHORITY_DOC,pass:failed.length===0,checks,failed,locale:activeLocale,spanishCatalog:spanish,browserGoldenClaimed:false};
}

globalThis.SC_ALPHA_LOCALISATION_35500=Object.freeze({
  patchId:PATCH_ID,authorityDoc:AUTHORITY_DOC,storageKey:STORAGE_KEY,defaultLocale:DEFAULT_LOCALE,supportedLocales:SUPPORTED,protectedTerms:PROTECTED_TERMS,
  getLocale,setLocale,translate,translatePresentedText,interpolate,registerLocaleMessages,validateProtectedTerms,validateCatalog,applyDocument,diagnostics,browserGoldenClaimed:false
});
globalThis.scT35500=translate;
globalThis.scSetLocale35500=setLocale;
globalThis.scGetLocale35500=getLocale;

if(globalThis.document){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",installBrowser,{once:true});else installBrowser();}
})();
