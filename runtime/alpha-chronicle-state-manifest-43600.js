// ============================================================================
// PHASE 2 — CHRONICLE STATE MANIFEST + BOUNDED SAVE SCAFFOLD — #436
//
// Binding authority:
// Documentation/Coordination/Phase_2_Persistent_Chronicle_Safety_Constitution_2026-10-01.md
//
// This module registers only the persistent domains needed by the first Phase-2
// Konoha slice. It does not replace existing semantic writers.
// ============================================================================
(function installChronicleStateManifest43600(){
"use strict";
if(globalThis.SC_CHRONICLE_STATE_MANIFEST_43600)return;

const PATCH_ID="phase2_chronicle_state_manifest_43600_2026_10_01";
const ROOT_KEY="phase2ChronicleState";
const ROOT_SCHEMA_VERSION=1;
const TUTORIAL_SCHEMA_VERSION=1;
const SAVE_KEY="shinobiChroniclesPlayerSave";
const priorLoadPlayerData=typeof globalThis.loadPlayerData==="function"?globalThis.loadPlayerData:null;

function clone(value){
  if(value==null||typeof value!=="object")return value;
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function currentPlayerData(){return typeof playerData!=="undefined"&&playerData?playerData:null;}
function readPersistedPhase2Root(){
  try{
    if(typeof localStorage==="undefined")return null;
    const raw=localStorage.getItem(SAVE_KEY);if(!raw)return null;
    const parsed=JSON.parse(raw),root=parsed&&parsed[ROOT_KEY];
    return root&&typeof root==="object"?clone(root):null;
  }catch(_error){return null;}
}
function installCompatibilityLoadAdapter(){
  if(!priorLoadPlayerData)return false;
  const wrapped=function phase2CompatibilityLoadPlayerData(){
    const persistedRoot=readPersistedPhase2Root();
    const loaded=priorLoadPlayerData.apply(this,arguments);
    if(loaded&&persistedRoot&&typeof loaded==="object")loaded[ROOT_KEY]=persistedRoot;
    return loaded;
  };
  globalThis.loadPlayerData=wrapped;
  try{loadPlayerData=wrapped;}catch(_error){}
  return true;
}
function rehydrateCurrentPhase2Root(){
  const pd=currentPlayerData(),persistedRoot=readPersistedPhase2Root();
  if(!pd||!persistedRoot||pd[ROOT_KEY])return false;
  // game.js loads the browser save before this Phase-2 module is evaluated.
  // Reattach the already-persisted Phase-2 root to that in-memory save once;
  // this is pure rehydration and does not write localStorage or recommit facts.
  pd[ROOT_KEY]=persistedRoot;
  return true;
}
function acquisitionFrom(save){return save&&save.acquisition&&typeof save.acquisition==="object"?save.acquisition:null;}
function formationFrom(save){const a=acquisitionFrom(save);return a&&a.academyTeamFormation&&typeof a.academyTeamFormation==="object"?a.academyTeamFormation:null;}
function formationReceiptFrom(save){const f=formationFrom(save);return f&&f.confirmationReceipt&&typeof f.confirmationReceipt==="object"?f.confirmationReceipt:null;}
function validCommittedTeamReceipt(receipt){
  const ids=receipt&&Array.isArray(receipt.teamVariantIds)?receipt.teamVariantIds.filter(Boolean):[];
  return !!(receipt&&receipt.commitId&&receipt.originVariantId&&ids.length===3&&new Set(ids).size===3&&ids[0]===receipt.originVariantId);
}
function getCurrentTeam(save=currentPlayerData()){
  const a=acquisitionFrom(save),formation=formationFrom(save),receipt=formationReceiptFrom(save);
  if(!a||!formation||formation.completed!==true||!receipt)return null;

  if(validCommittedTeamReceipt(receipt)){
    return Object.freeze({
      schemaVersion:1,
      assignmentId:String(receipt.commitId),
      stage:"academy",
      originVariantId:String(receipt.originVariantId),
      teamVariantIds:Object.freeze([...receipt.teamVariantIds]),
      sourcePath:"playerData.acquisition.academyTeamFormation.confirmationReceipt.teamVariantIds",
      committed:true,
      legacyProjection:false
    });
  }

  // Representative pre-Phase-2 saves may carry the older committed Team
  // Formation shape: protagonist identity + exactly two selected teammates +
  // a confirmation receipt, without the later receipt.teamVariantIds payload.
  // These are existing committed facts, so deriving the three-person Academy
  // assignment is deterministic migration, not fabricated retroactive history.
  const origin=a.chronicleOriginVariantId;
  const selected=Array.isArray(formation.selectedTeammateIds)?formation.selectedTeammateIds.filter(Boolean):[];
  const uniqueSelected=[...new Set(selected)];
  if(!origin||!receipt.receiptId||uniqueSelected.length!==2||uniqueSelected.includes(origin))return null;
  const ids=[origin,...uniqueSelected];
  if(new Set(ids).size!==3)return null;
  return Object.freeze({
    schemaVersion:1,
    assignmentId:String(receipt.receiptId),
    stage:"academy",
    originVariantId:String(origin),
    teamVariantIds:Object.freeze(ids),
    sourcePath:"playerData.acquisition.chronicleOriginVariantId + academyTeamFormation.selectedTeammateIds + confirmationReceipt.receiptId",
    committed:true,
    legacyProjection:true
  });
}
function defaultTutorialProgress(teamRef=null){
  return{
    schemaVersion:TUTORIAL_SCHEMA_VERSION,
    academyTeamFormationReceiptRef:teamRef||null,
    sandboxPopupSeen:false,
    recommendedRouteEnabled:false,
    openingChoice:null,
    trainingTipSeen:false,
    practicalTipSeen:false,
    examsTipSeen:false,
    arenaTipSeen:false,
    arenaCompletionChoiceSeen:false,
    shinobiRecordTipSeen:false,
    tutorialTipsEnabled:true,
    updatedAt:null
  };
}
function legacyTutorialProjection(save,progress){
  const receipt=formationReceiptFrom(save),legacy=receipt&&receipt.firstKonohaTutorial&&typeof receipt.firstKonohaTutorial==="object"?receipt.firstKonohaTutorial:null;
  const legacyCompleted=!!(legacy&&legacy.completed===true&&legacy.completionReceipt);
  if(legacyCompleted){
    // Only an exact committed #209 completion receipt proves the old
    // opening/training/practical orientation happened. Generic free-play state
    // is not enough evidence and must not pre-consume the new Sandbox popup.
    // Do not fabricate Exams/Arena/Record tutorial history.
    progress.sandboxPopupSeen=true;
    progress.recommendedRouteEnabled=false;
    if(legacy&&legacy.completed===true){
      progress.trainingTipSeen=true;
      progress.practicalTipSeen=true;
    }
  }
  return progress;
}
function migratePhase2ChronicleState(save){
  const source=clone(save||{});
  const team=getCurrentTeam(source);
  const existing=source[ROOT_KEY]&&typeof source[ROOT_KEY]==="object"?clone(source[ROOT_KEY]):{};
  const root={
    schemaVersion:ROOT_SCHEMA_VERSION,
    tutorialProgress:existing.tutorialProgress&&typeof existing.tutorialProgress==="object"
      ?{...defaultTutorialProgress(team&&team.assignmentId),...existing.tutorialProgress,schemaVersion:TUTORIAL_SCHEMA_VERSION}
      :legacyTutorialProjection(source,defaultTutorialProgress(team&&team.assignmentId))
  };
  if(team&&root.tutorialProgress.academyTeamFormationReceiptRef!==team.assignmentId){
    // A different committed Academy-team assignment is a different onboarding
    // identity. This is deterministic reset of tutorial presentation state only.
    root.tutorialProgress=defaultTutorialProgress(team.assignmentId);
  }
  source[ROOT_KEY]=root;
  return source;
}
function ensurePhase2Root({save=true}={}){
  const pd=currentPlayerData();if(!pd)return null;
  const migrated=migratePhase2ChronicleState(pd),next=migrated[ROOT_KEY];
  const before=JSON.stringify(pd[ROOT_KEY]||null),after=JSON.stringify(next);
  if(before!==after){
    pd[ROOT_KEY]=clone(next);
    if(save&&typeof savePlayerData==="function")savePlayerData();
  }
  return pd[ROOT_KEY];
}
function getTutorialProgress({create=false}={}){
  const pd=currentPlayerData();if(!pd)return null;
  const root=pd[ROOT_KEY]&&typeof pd[ROOT_KEY]==="object"?pd[ROOT_KEY]:(create?ensurePhase2Root({save:false}):null);
  return root&&root.tutorialProgress&&typeof root.tutorialProgress==="object"?root.tutorialProgress:null;
}
function updateTutorialProgress(patch,{save=true}={}){
  const root=ensurePhase2Root({save:false});if(!root)return{success:false,reason:"player_state_unavailable"};
  const progress=root.tutorialProgress;
  const allowed=new Set([
    "sandboxPopupSeen","recommendedRouteEnabled","openingChoice","trainingTipSeen","practicalTipSeen",
    "examsTipSeen","arenaTipSeen","arenaCompletionChoiceSeen","shinobiRecordTipSeen","tutorialTipsEnabled"
  ]);
  for(const [key,value] of Object.entries(patch||{}))if(allowed.has(key))progress[key]=clone(value);
  progress.schemaVersion=TUTORIAL_SCHEMA_VERSION;progress.updatedAt=Date.now();
  if(save&&typeof savePlayerData==="function")savePlayerData();
  return{success:true,progress:clone(progress)};
}
function getChronicleIdentity(save=currentPlayerData()){
  const a=acquisitionFrom(save);
  if(!a||!a.chronicleOriginVariantId)return null;
  return Object.freeze({
    variantId:String(a.chronicleOriginVariantId),
    ownedCharacterId:a.chronicleOriginOwnedCharacterId||null,
    ninjaIdentityVariantId:a.ninjaIdentityVariantId||null,
    locked:a.ninjaIdentityLocked===true
  });
}
function getCurrentRyo(save=currentPlayerData()){return Math.max(0,Number(save&&save.ryo)||0);}

const DOMAINS=Object.freeze([
  Object.freeze({
    stateDomainId:"currentTeam",
    semanticOwner:"Acquisition / Team Formation",
    canonicalWritePath:"confirmAcademyTeamFormation",
    stableIdentityKey:"academyTeamFormation.confirmationReceipt.commitId || confirmationReceipt.receiptId (legacy)",
    savePath:"playerData.acquisition.academyTeamFormation (modern receipt teamVariantIds; deterministic legacy selectedTeammateIds projection)",
    schemaVersion:1,
    sourceOccurrenceIdFormat:"academy_team_formation::<commitId|legacyReceiptId>",
    idempotenceKeyFormat:"academyTeamFormation.confirmationReceipt.commitId || receiptId",
    derivedFields:Object.freeze(["stage","originVariantId"]),
    projectionConsumers:Object.freeze(["Training","Practical","Exams","World","Battle deployment selection","Shinobi Record"]),
    migrationRule:"prefer modern committed receipt; otherwise derive only from completed formation + committed origin + exactly two selected teammates + legacy receiptId",
    resetRule:"only_explicit_new_chronicle_or_authorised_roster_transition",
    difficultyScope:"academy_active_genin_aware",
    inheritanceRule:"promotion_transition_must_explicitly_replace_assignment",
    devOverridePolicy:"ordinary_player_surfaces_must_not_substitute_fixture_roster",
    qaRefs:Object.freeze(["tools/qa_phase2_chronicle_state_manifest_436.js","tools/qa_save_compatibility_311.js"])
  }),
  Object.freeze({
    stateDomainId:"tutorialProgress",
    semanticOwner:"Coding / Konoha onboarding presentation",
    canonicalWritePath:"updateChronicleTutorialProgress43600",
    stableIdentityKey:"currentTeam.assignmentId (modern commitId or legacy receiptId)",
    savePath:"playerData.phase2ChronicleState.tutorialProgress",
    schemaVersion:TUTORIAL_SCHEMA_VERSION,
    sourceOccurrenceIdFormat:"konoha_onboarding::<teamFormationCommitId>::<tip>",
    idempotenceKeyFormat:"teamFormationCommitId+tipKey",
    derivedFields:Object.freeze([]),
    projectionConsumers:Object.freeze(["Konoha map","Training","Practical","Exams","Arena","Shinobi Record"]),
    migrationRule:"deterministic_projection_from_legacy_209_receipt_when_proven",
    resetRule:"tutorial_reset_may_reset_tips_only_never_chronicle_facts",
    difficultyScope:"academy_onboarding",
    inheritanceRule:"does_not_grant_world_permission_or_promotion",
    devOverridePolicy:"dev_replay_must_be_explicit_and_must_not_write_fake_world_history",
    qaRefs:Object.freeze(["tools/qa_phase2_chronicle_state_manifest_436.js","tools/qa_first_konoha_tutorial_35000.js","tools/qa_save_compatibility_311.js"])
  }),
  Object.freeze({
    stateDomainId:"chronicleIdentity",
    semanticOwner:"Acquisition / Chronicle Origin identity",
    canonicalWritePath:"selectChronicleOrigin / existing identity lock",
    stableIdentityKey:"playerData.acquisition.chronicleOriginOwnedCharacterId",
    savePath:"playerData.acquisition.chronicleOriginVariantId",
    schemaVersion:1,
    sourceOccurrenceIdFormat:"chronicle_origin::<variantId>",
    idempotenceKeyFormat:"chronicleOriginOwnedCharacterId",
    derivedFields:Object.freeze(["ninjaIdentityVariantId","ninjaIdentityLocked"]),
    projectionConsumers:Object.freeze(["HUD","Journey","World","Shinobi Record"]),
    migrationRule:"consume_existing_acquisition_identity_only",
    resetRule:"new_chronicle_only",
    difficultyScope:"all",
    inheritanceRule:"stable_person_identity_survives_representation_changes",
    devOverridePolicy:"normal_player_identity_must_never_be_replaced_by_dev_character",
    qaRefs:Object.freeze(["tools/qa_phase2_chronicle_state_manifest_436.js","tools/qa_save_compatibility_311.js"])
  }),
  Object.freeze({
    stateDomainId:"currentRyo",
    semanticOwner:"existing player economy authority",
    canonicalWritePath:"existing reward / transaction owners",
    stableIdentityKey:"current Chronicle save",
    savePath:"playerData.ryo",
    schemaVersion:1,
    sourceOccurrenceIdFormat:"owned_by_transaction_source",
    idempotenceKeyFormat:"owned_by_transaction_receipt",
    derivedFields:Object.freeze([]),
    projectionConsumers:Object.freeze(["HUD","Shops","Crafting","Shinobi Record"]),
    migrationRule:"preserve_existing_numeric_balance_exactly",
    resetRule:"new_chronicle_only",
    difficultyScope:"all",
    inheritanceRule:"none_without_explicit_economy_authority",
    devOverridePolicy:"dev_currency_override_must_be_explicit_and_must_not_contaminate_normal_save",
    qaRefs:Object.freeze(["tools/qa_phase2_chronicle_state_manifest_436.js","tools/qa_save_compatibility_311.js"])
  }),
  Object.freeze({
    stateDomainId:"disciplineDevelopment",
    semanticOwner:"Progression / Development",
    canonicalWritePath:"commitDisciplineDevelopment448",
    stableIdentityKey:"ownedCharacterId + disciplineId",
    savePath:"playerData.characters[progressionCharacterId].disciplineProgression[disciplineId]",
    schemaVersion:2,
    sourceOccurrenceIdFormat:"authoritative source occurrence / activity occurrence",
    idempotenceKeyFormat:"stableCharacterId + sourceOccurrenceId + progressionSlotId + disciplineId",
    derivedFields:Object.freeze(["nextThreshold","progressRatio","activityEligibility","developmentCeiling"]),
    projectionConsumers:Object.freeze(["Training","Practical","Exams","Battle/Story/World development adapters","Shinobi Record","My Clan"]),
    migrationRule:"preserve canonical persisted EXP exactly; resolve v1 thresholds from canonical Current Stat only; never infer from UI text",
    resetRule:"new_chronicle_or_explicit_authorised_reset_only",
    difficultyScope:"difficulty_aware_academy_foundation_active",
    inheritanceRule:"persistent person development survives representation/team changes where identity inheritance permits",
    devOverridePolicy:"explicit_dev_mode_only; ordinary activity selectors must use committed currentTeam",
    qaRefs:Object.freeze(["tools/qa_issue_448_discipline_stat_growth.js","tools/qa_issue_448_discipline_stat_growth_browser.js","tools/qa_save_compatibility_311.js"])
  }),
  Object.freeze({
    stateDomainId:"characterStats",
    semanticOwner:"PL / Registry / Rank",
    canonicalWritePath:"commitDisciplineDevelopment448 authorised Current-Stat mutation -> existing playerData.characters stats writer",
    stableIdentityKey:"ownedCharacterId + statId",
    savePath:"playerData.characters[progressionCharacterId].stats[statId]",
    schemaVersion:1,
    sourceOccurrenceIdFormat:"discipline_stat_breakthrough::<development receipt>",
    idempotenceKeyFormat:"stableCharacterId + disciplineId + priorStat + curveId + causalTransactionId",
    derivedFields:Object.freeze(["currentPL"]),
    projectionConsumers:Object.freeze(["My Clan","Battle","HUD","Shinobi Record","Training","Practical","Exams"]),
    migrationRule:"preserve existing permanent Current Stats; Base Stats unchanged; Effective/Battle remains derived",
    resetRule:"new_chronicle_or_explicit_authorised_reset_only",
    difficultyScope:"all",
    inheritanceRule:"Current Stat belongs to exact persistent Character",
    devOverridePolicy:"no My-Clan-local Stats cache and no direct PL grant",
    qaRefs:Object.freeze(["tools/qa_issue_448_discipline_stat_growth.js","tools/qa_issue_448_discipline_stat_growth_browser.js","tools/qa_save_compatibility_311.js"])
  }),
  Object.freeze({
    stateDomainId:"shinobiRecordProjection",
    semanticOwner:"Shinobi Record presentation",
    canonicalWritePath:"NONE_DERIVED_PROJECTION_ONLY",
    stableIdentityKey:"current Chronicle save",
    savePath:null,
    schemaVersion:1,
    sourceOccurrenceIdFormat:"n/a_projection_only",
    idempotenceKeyFormat:"n/a_projection_only",
    derivedFields:Object.freeze(["currentTeam","chronicleIdentity","currentRyo","Chronicle history"]),
    projectionConsumers:Object.freeze(["Shinobi Record UI"]),
    migrationRule:"none_projection_reads_canonical_sources",
    resetRule:"none",
    difficultyScope:"all",
    inheritanceRule:"observer_safe_projection_only",
    devOverridePolicy:"hidden_diagnostics_only_in_explicit_dev_mode",
    qaRefs:Object.freeze(["tools/qa_phase2_chronicle_state_manifest_436.js"])
  })
]);

const MANIFEST=Object.freeze({
  manifestId:"sc.phase2.chronicle_state_manifest.v1",
  schemaVersion:1,
  phase:"Phase 2",
  rootSavePath:"playerData.phase2ChronicleState",
  rootSchemaVersion:ROOT_SCHEMA_VERSION,
  compatibilityReader:"pure load adapter reattaches persisted Phase-2 root without writing; migration helper remains pure",
  migrationHook:"migratePhase2ChronicleState43600",
  persistenceHook:"ensurePhase2ChronicleState43600",
  devOverridePolicy:"explicit_dev_owner_mode_only; never substitute ordinary player Chronicle state",
  domains:DOMAINS
});

function diagnostics(){
  const required=["stateDomainId","semanticOwner","canonicalWritePath","stableIdentityKey","savePath","schemaVersion","sourceOccurrenceIdFormat","idempotenceKeyFormat","derivedFields","projectionConsumers","migrationRule","resetRule","difficultyScope","inheritanceRule","devOverridePolicy","qaRefs"];
  const ids=DOMAINS.map(row=>row.stateDomainId),unique=new Set(ids);
  const defaultSave={ryo:77,acquisition:{chronicleOriginVariantId:"academy_menma",chronicleOriginOwnedCharacterId:"owned_character_academy_menma",ninjaIdentityVariantId:"academy_menma",ninjaIdentityLocked:true,academyTeamFormation:{completed:true,confirmationReceipt:{commitId:"team-1",originVariantId:"academy_menma",teamVariantIds:["academy_menma","academy_hinata","academy_kushina"]}}}};
  const migrated=migratePhase2ChronicleState(defaultSave),migratedAgain=migratePhase2ChronicleState(migrated);
  const checks={
    minimumFields:DOMAINS.every(row=>required.every(key=>Object.prototype.hasOwnProperty.call(row,key))),
    uniqueDomains:unique.size===DOMAINS.length,
    initialDomains:["currentTeam","tutorialProgress","chronicleIdentity","currentRyo","shinobiRecordProjection"].every(id=>unique.has(id)),
    phase2DevelopmentDomains:["disciplineDevelopment","characterStats"].every(id=>unique.has(id)),
    disciplineLedgerNotDuplicated:DOMAINS.find(row=>row.stateDomainId==="disciplineDevelopment")?.savePath==="playerData.characters[progressionCharacterId].disciplineProgression[disciplineId]",
    characterStatsExistingOwnerPreserved:DOMAINS.find(row=>row.stateDomainId==="characterStats")?.semanticOwner==="PL / Registry / Rank",
    currentTeamDerivedNotDuplicated:DOMAINS.find(row=>row.stateDomainId==="currentTeam")?.canonicalWritePath==="confirmAcademyTeamFormation"&&!String(DOMAINS.find(row=>row.stateDomainId==="currentTeam")?.savePath||"").includes("phase2ChronicleState.currentTeam"),
    ryoExistingOwnerPreserved:DOMAINS.find(row=>row.stateDomainId==="currentRyo")?.savePath==="playerData.ryo",
    recordProjectionNoWriter:DOMAINS.find(row=>row.stateDomainId==="shinobiRecordProjection")?.canonicalWritePath==="NONE_DERIVED_PROJECTION_ONLY",
    pureMigration:JSON.stringify(defaultSave)===JSON.stringify({ryo:77,acquisition:{chronicleOriginVariantId:"academy_menma",chronicleOriginOwnedCharacterId:"owned_character_academy_menma",ninjaIdentityVariantId:"academy_menma",ninjaIdentityLocked:true,academyTeamFormation:{completed:true,confirmationReceipt:{commitId:"team-1",originVariantId:"academy_menma",teamVariantIds:["academy_menma","academy_hinata","academy_kushina"]}}}}),
    deterministicMigration:JSON.stringify(migrated)===JSON.stringify(migratedAgain),
    exactTeam:getCurrentTeam(migrated)?.teamVariantIds.join("|")==="academy_menma|academy_hinata|academy_kushina",
    ryoPreserved:getCurrentRyo(migrated)===77,
    compatibilityLoadAdapterInstalled:!priorLoadPlayerData||globalThis.loadPlayerData!==priorLoadPlayerData,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

installCompatibilityLoadAdapter();
rehydrateCurrentPhase2Root();

globalThis.getChronicleStateManifest43600=()=>MANIFEST;
globalThis.getChronicleCurrentTeam43600=getCurrentTeam;
globalThis.getChronicleIdentity43600=getChronicleIdentity;
globalThis.getChronicleCurrentRyo43600=getCurrentRyo;
globalThis.migratePhase2ChronicleState43600=migratePhase2ChronicleState;
globalThis.rehydratePhase2ChronicleState43600=rehydrateCurrentPhase2Root;
globalThis.ensurePhase2ChronicleState43600=ensurePhase2Root;
globalThis.getChronicleTutorialProgress43600=getTutorialProgress;
globalThis.updateChronicleTutorialProgress43600=updateTutorialProgress;
globalThis.runChronicleStateManifest43600Diagnostics=diagnostics;
globalThis.SC_CHRONICLE_STATE_MANIFEST_43600=MANIFEST;
})();
