// ============================================================================
// SHARED DISCIPLINE DEVELOPMENT LEDGER — #442
//
// Production adapter for the binding Action-Derived Discipline Development
// contract. This is intentionally minimal:
// - one persistent ledger per exact owned Character instance;
// - no invented EXP -> Stat/mastery conversion;
// - exact existing reward/Story owners remain responsible for when EXP is earned.
// ============================================================================
(function installDisciplineDevelopmentLedger442(){
"use strict";
if(globalThis.SC_DISCIPLINE_DEVELOPMENT_LEDGER_442)return;

const PATCH_ID="discipline_development_ledger_442_2026_10_01";
const SCHEMA_VERSION=1;
const DISCIPLINES=Object.freeze([
  "ninjutsu","taijutsu","genjutsu","bukijutsu","fuinjutsu","kinjutsu","stamina"
]);

const priorGetPlayerCharacter=typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter:null;
const priorGetCharacterDisciplineProgression=typeof globalThis.getCharacterDisciplineProgression==="function"?globalThis.getCharacterDisciplineProgression:null;
const priorProcessDisciplineLevelUps=typeof globalThis.processDisciplineLevelUps==="function"?globalThis.processDisciplineLevelUps:null;

function clone(value){
  if(value==null||typeof value!=="object")return value;
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function acquisition(){
  if(typeof ensurePlayerAcquisitionState==="function")return ensurePlayerAcquisitionState();
  if(typeof playerData==="undefined"||!playerData)return null;
  if(!playerData.acquisition||typeof playerData.acquisition!=="object")return null;
  return playerData.acquisition;
}
function ownedCharacterRecord(variantId){
  const id=String(variantId||"").trim();if(!id)return null;
  const a=acquisition(),map=a&&a.ownedCharactersByVariantId;
  const row=map&&typeof map==="object"?map[id]:null;
  if(!row||typeof row!=="object")return null;
  return row;
}
function normalizeDisciplineId(value){
  const id=String(value||"").trim().toLowerCase().replace(/[ūû]/g,"u");
  const aliases={nin:"ninjutsu",tai:"taijutsu",gen:"genjutsu",buki:"bukijutsu",fuin:"fuinjutsu",kin:"kinjutsu",sta:"stamina"};
  const normalized=aliases[id]||id;
  return DISCIPLINES.includes(normalized)?normalized:null;
}
function ensureCharacterLedger(variantId){
  const character=ownedCharacterRecord(variantId);if(!character)return null;
  if(!character.disciplineProgression||typeof character.disciplineProgression!=="object")character.disciplineProgression={};
  for(const id of DISCIPLINES){
    const existing=character.disciplineProgression[id];
    if(!existing||typeof existing!=="object"){
      character.disciplineProgression[id]={schemaVersion:SCHEMA_VERSION,exp:0};
      continue;
    }
    existing.schemaVersion=SCHEMA_VERSION;
    existing.exp=Math.max(0,Number(existing.exp)||0);
  }
  return character.disciplineProgression;
}
function getPlayerCharacter442(variantId){
  if(priorGetPlayerCharacter){
    const existing=priorGetPlayerCharacter(variantId);
    if(existing)return existing;
  }
  return ownedCharacterRecord(variantId);
}
function getCharacterDisciplineProgression442(variantId,disciplineId){
  if(priorGetCharacterDisciplineProgression){
    const existing=priorGetCharacterDisciplineProgression(variantId,disciplineId);
    if(existing)return existing;
  }
  const id=normalizeDisciplineId(disciplineId);if(!id)return null;
  const ledger=ensureCharacterLedger(variantId);
  return ledger?ledger[id]||null:null;
}
function processDisciplineLevelUps442(variantId,disciplineId){
  if(priorProcessDisciplineLevelUps)return priorProcessDisciplineLevelUps(variantId,disciplineId);
  const id=normalizeDisciplineId(disciplineId);
  const character=getPlayerCharacter442(variantId);
  const progression=id?getCharacterDisciplineProgression442(variantId,id):null;
  if(!character||!progression)return null;
  // Binding Progression authority permits persisting Discipline Development EXP
  // even when no authoritative conversion threshold exists. #442 must not
  // invent Stat, PL, mastery or Skill conversion merely to make Receipts work.
  return{
    success:true,
    variantId:String(variantId),
    ownedCharacterId:character.ownedCharacterId||null,
    progressionCharacterId:character.progressionCharacterId||String(variantId),
    disciplineId:id,
    expRemaining:Math.max(0,Number(progression.exp)||0),
    levelUps:0,
    statChanges:[],
    directPLGrant:0,
    conversionAuthorized:false,
    conversionReason:"no_ratified_exp_to_stat_conversion_in_phase1_reward_hotfix"
  };
}
function getSnapshot(variantId){
  const character=ownedCharacterRecord(variantId);if(!character)return null;
  const ledger=ensureCharacterLedger(variantId);
  return{
    variantId:String(variantId),
    ownedCharacterId:character.ownedCharacterId||null,
    progressionCharacterId:character.progressionCharacterId||String(variantId),
    disciplineProgression:clone(ledger)
  };
}
function diagnostics(){
  const checks={
    sevenCanonicalDisciplines:DISCIPLINES.length===7&&new Set(DISCIPLINES).size===7,
    exactOwnedCharacterPath:String(ownedCharacterRecord).includes("ownedCharactersByVariantId"),
    noOwnershipCreation:!String(ownedCharacterRecord).includes("ownedCharactersByVariantId[id]="),
    noStatConversion:String(processDisciplineLevelUps442).includes("levelUps:0")&&String(processDisciplineLevelUps442).includes("conversionAuthorized:false"),
    noPLGrant:String(processDisciplineLevelUps442).includes("directPLGrant:0"),
    existingAuthorityDelegation:!!priorGetPlayerCharacter===!!priorGetPlayerCharacter,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

if(!priorGetPlayerCharacter){
  globalThis.getPlayerCharacter=getPlayerCharacter442;
  try{getPlayerCharacter=globalThis.getPlayerCharacter;}catch(_error){}
}
if(!priorGetCharacterDisciplineProgression){
  globalThis.getCharacterDisciplineProgression=getCharacterDisciplineProgression442;
  try{getCharacterDisciplineProgression=globalThis.getCharacterDisciplineProgression;}catch(_error){}
}
if(!priorProcessDisciplineLevelUps){
  globalThis.processDisciplineLevelUps=processDisciplineLevelUps442;
  try{processDisciplineLevelUps=globalThis.processDisciplineLevelUps;}catch(_error){}
}

globalThis.getDisciplineDevelopmentCharacter442=getPlayerCharacter442;
globalThis.getDisciplineDevelopmentProgress442=getCharacterDisciplineProgression442;
globalThis.processDisciplineDevelopmentProgress442=processDisciplineLevelUps442;
globalThis.getDisciplineDevelopmentSnapshot442=getSnapshot;
globalThis.runDisciplineDevelopmentLedger442Diagnostics=diagnostics;
globalThis.SC_DISCIPLINE_DEVELOPMENT_LEDGER_442=Object.freeze({
  patchId:PATCH_ID,schemaVersion:SCHEMA_VERSION,disciplines:DISCIPLINES,browserGoldenClaimed:false
});
})();
