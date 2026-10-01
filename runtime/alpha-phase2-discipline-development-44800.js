// ============================================================================
// PHASE 2 — DISCIPLINE DEVELOPMENT -> PERSISTENT CURRENT STAT — #448
//
// Consumes:
// Documentation/Progression/Phase 2 Discipline Development to Persistent Stat
// Growth Trial Contract 2026-10-01.md
//
// One shared transaction owns Phase-2 Discipline EXP conversion. PL remains
// derived from canonical Current Stats. Technique Practice is deliberately not
// activated here.
// ============================================================================
(function installPhase2DisciplineDevelopment44800(){
"use strict";
if(globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_44800)return;

const PATCH_ID="phase2_discipline_development_44800_2026_10_02";
const CURVE_ID="discipline_stat_curve_v1";
const PROFILE_ID="academy_foundation_discipline_activity_v1";
const DEVELOPMENT_CEILING_STAT=15;
const DISCIPLINE_IDS=Object.freeze(["nin","tai","gen","buki","fuin","kin","stamina"]);
const REGISTERED_ACTIVITY_SOURCES=Object.freeze(["exam","practical"]);
const SAVE_KEY="shinobiChroniclesPlayerSave";

const priorDevelopedStats=typeof globalThis.getDevelopedCharacterStats==="function"?globalThis.getDevelopedCharacterStats:null;
const priorCurrentRawPL=typeof globalThis.calculateCurrentRawPL==="function"?globalThis.calculateCurrentRawPL:null;
const priorAddDisciplineExp=typeof globalThis.addDisciplineExp==="function"?globalThis.addDisciplineExp:null;
const priorProcessLevelUps=typeof globalThis.processDisciplineLevelUps==="function"?globalThis.processDisciplineLevelUps:null;
const priorPendingStatGrowth=typeof globalThis.applyPendingDisciplineStatGrowth==="function"?globalThis.applyPendingDisciplineStatGrowth:null;
const priorTrainingData=typeof globalThis.getTrainingActionData==="function"?globalThis.getTrainingActionData:null;
const priorCharacterActivityData=typeof globalThis.getKonohaCharacterActivityData==="function"?globalThis.getKonohaCharacterActivityData:null;
const priorDisciplinePanel=typeof globalThis.getKonohaDisciplineUIPanelData==="function"?globalThis.getKonohaDisciplineUIPanelData:null;
const priorTrainingEligibility=typeof globalThis.getTrainingEligibility==="function"?globalThis.getTrainingEligibility:null;
const priorOpenActivity=typeof globalThis.openKonohaActivityUIScreen==="function"?globalThis.openKonohaActivityUIScreen:null;
const priorExamAttempt=typeof globalThis.executeKonohaExamAttempt==="function"?globalThis.executeKonohaExamAttempt:null;
const priorPracticalAttempt=typeof globalThis.executeKonohaPracticalAttempt==="function"?globalThis.executeKonohaPracticalAttempt:null;
const priorSyncFromSave=typeof globalThis.syncCharacterProgressionFromSave==="function"?globalThis.syncCharacterProgressionFromSave:null;

let occurrenceSequence=0;
let activeOccurrence=null;
let selectionSnapshot=null;
let lastTransaction=null;

function clone(value){
  if(value==null||typeof value!=="object")return value;
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function history(){
  if(typeof globalThis.getActivityHistory==="function"){
    const rows=globalThis.getActivityHistory();
    if(Array.isArray(rows))return rows;
  }
  if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory))return activityHistory;
  if(typeof playerData!=="undefined"&&playerData&&Array.isArray(playerData.activityHistory))return playerData.activityHistory;
  return[];
}
function characterById(id){return typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(id):null;}
function registryIdOf(characterOrId){
  if(typeof globalThis.getCharacterRegistryId==="function")return globalThis.getCharacterRegistryId(characterOrId);
  return characterOrId&&typeof characterOrId==="object"?(characterOrId.registryId||characterOrId.id||null):characterOrId||null;
}
function ownedRecordFor(characterOrId){
  const registryId=registryIdOf(characterOrId);
  return registryId&&typeof globalThis.getOwnedCharacterRecordByVariantId==="function"
    ?globalThis.getOwnedCharacterRecordByVariantId(registryId)
    :null;
}
function stableIdentity(characterOrId){
  const character=typeof characterOrId==="object"?characterOrId:characterById(characterOrId);
  const registryId=registryIdOf(character||characterOrId);
  const owned=ownedRecordFor(registryId);
  const ownedCharacterId=owned&&owned.ownedCharacterId
    ?String(owned.ownedCharacterId)
    :(registryId&&typeof globalThis.createOwnedCharacterIdForVariant==="function"
      ?globalThis.createOwnedCharacterIdForVariant(registryId)
      :null);
  return{
    character,
    registryId,
    ownedRecord:owned||null,
    ownedCharacterId:ownedCharacterId||null,
    progressionCharacterId:owned&&owned.progressionCharacterId?String(owned.progressionCharacterId):(character&&character.id?String(character.id):registryId)
  };
}
function exactStats(character){
  const out={};
  for(const id of DISCIPLINE_IDS)out[id]=Math.max(0,Number(character&&character.stats&&character.stats[id])||0);
  return out;
}
function validSevenStats(stats){
  return !!(stats&&typeof stats==="object"&&DISCIPLINE_IDS.every(id=>Number.isFinite(Number(stats[id]))));
}
function thresholdForStat(stat){
  const value=Math.max(0,Number(stat)||0);
  return 5+(5*Math.ceil(value/10));
}
function rawPLForStats(stats){
  if(typeof globalThis.calculateRawPLFromStats==="function")return globalThis.calculateRawPLFromStats(stats);
  const values=DISCIPLINE_IDS.map(id=>Number(stats&&stats[id])||0).sort((a,b)=>b-a);
  if(!values.length)return 0;
  const highest=values[0]||0;
  const top3=(values[0]+values[1]+values[2])/3;
  const all=values.reduce((sum,value)=>sum+value,0)/7;
  return 0.60*highest+0.25*top3+0.15*all;
}
function displayedPL(character){return Math.round(rawPLForStats(exactStats(character)));}
function progressionFor(characterId,disciplineId){
  return typeof globalThis.getCharacterDisciplineProgression==="function"
    ?globalThis.getCharacterDisciplineProgression(characterId,disciplineId)
    :null;
}
function neutralizeLegacyMastery(progression){
  if(!progression)return;
  progression.level=1;
  progression.statLevelApplied=1;
}
function currentTeam(){
  const team=typeof globalThis.getChronicleCurrentTeam43600==="function"?globalThis.getChronicleCurrentTeam43600():null;
  return team&&team.committed===true&&Array.isArray(team.teamVariantIds)&&team.teamVariantIds.length===3?team:null;
}
function profileForSource(source){
  return REGISTERED_ACTIVITY_SOURCES.includes(String(source||""))
    ?Object.freeze({profileId:PROFILE_ID,developmentCeilingStat:DEVELOPMENT_CEILING_STAT})
    :null;
}
function currentTeamPreflight(characterId,disciplineId,source,{requireSelectionSnapshot=true}={}){
  const profile=profileForSource(source);
  const character=characterById(characterId);
  if(!character)return{allowed:false,reason:"selected_subject_missing",profile};
  const identity=stableIdentity(character);
  const team=currentTeam();
  if(!profile)return{allowed:true,profile:null,character,identity,currentStat:Number(character.stats&&character.stats[disciplineId])||0};
  if(!team)return{allowed:false,reason:"committed_current_team_missing",profile,character,identity};
  if(!identity.registryId||!team.teamVariantIds.includes(identity.registryId))return{allowed:false,reason:"selected_subject_not_in_current_team",profile,character,identity,team};
  if(!identity.ownedRecord||!identity.ownedCharacterId)return{allowed:false,reason:"persistent_subject_identity_missing",profile,character,identity,team};
  if(requireSelectionSnapshot&&selectionSnapshot&&selectionSnapshot.serviceId===source){
    if(selectionSnapshot.assignmentId!==team.assignmentId)return{allowed:false,reason:"stale_team_assignment",profile,character,identity,team};
  }
  const currentStat=Math.max(0,Number(character.stats&&character.stats[disciplineId])||0);
  const progression=progressionFor(character.id,disciplineId);
  if(currentStat>=profile.developmentCeilingStat){
    return{
      allowed:false,reason:"activity_development_ceiling_reached",profile,character,identity,team,currentStat,
      exp:progression?Math.max(0,Number(progression.exp)||0):0,
      expRequired:thresholdForStat(currentStat)
    };
  }
  return{
    allowed:true,reason:null,profile,character,identity,team,currentStat,
    exp:progression?Math.max(0,Number(progression.exp)||0):0,
    expRequired:thresholdForStat(currentStat)
  };
}
function activationReceiptId(identity){return identity&&identity.ownedCharacterId?`discipline_stat_curve_activation:${identity.ownedCharacterId}:${CURVE_ID}`:null;}
function hasActivation(identity){
  const id=activationReceiptId(identity);
  return !!(id&&history().some(row=>row&&row.type==="discipline_stat_curve_activation"&&row.receiptId===id&&row.committed===true));
}
function breakthroughReceiptId(identity,disciplineId,priorStat,transactionId){
  return["discipline_stat_breakthrough",identity.ownedCharacterId||identity.progressionCharacterId,disciplineId,priorStat,CURVE_ID,transactionId||"pending"].join(":");
}
function ceilingReceiptId(identity,disciplineId,profileId){
  return["activity_development_ceiling_reached",identity.ownedCharacterId||identity.progressionCharacterId,profileId,disciplineId].join(":");
}
function restoreSnapshot(snapshot){
  if(!snapshot||!snapshot.character)return;
  snapshot.character.stats=clone(snapshot.stats);
  snapshot.character.disciplineProgression=clone(snapshot.progression);
  const rows=history();
  while(rows.length>snapshot.historyLength)rows.pop();
  if(snapshot.savedCharacter&&typeof playerData!=="undefined"&&playerData&&playerData.characters){
    playerData.characters[snapshot.character.id]=clone(snapshot.savedCharacter);
  }
}
function takeSnapshot(character){
  return{
    character,
    stats:clone(character.stats),
    progression:clone(character.disciplineProgression),
    historyLength:history().length,
    savedCharacter:typeof playerData!=="undefined"&&playerData&&playerData.characters?clone(playerData.characters[character.id]):null
  };
}
function resolvePendingBreakthroughs(character,disciplineId,{transactionId,sourceDevelopmentReceiptRefs=[]}={}){
  const progression=progressionFor(character.id,disciplineId);
  if(!progression)return{success:false,reason:"discipline_progression_missing",breakthroughs:[]};
  neutralizeLegacyMastery(progression);
  const identity=stableIdentity(character);
  const receipts=[];
  while(true){
    const priorStat=Math.max(0,Number(character.stats&&character.stats[disciplineId])||0);
    const threshold=thresholdForStat(priorStat);
    const expBefore=Math.max(0,Number(progression.exp)||0);
    if(expBefore<threshold)break;
    const plBefore=displayedPL(character);
    progression.exp=expBefore-threshold;
    character.stats[disciplineId]=priorStat+1;
    const newStat=priorStat+1;
    const plAfter=displayedPL(character);
    const receiptId=breakthroughReceiptId(identity,disciplineId,priorStat,transactionId||`stat_${priorStat}_to_${newStat}`);
    const existing=history().find(row=>row&&row.type==="discipline_stat_breakthrough"&&row.receiptId===receiptId);
    const receipt=existing||{
      receiptId,
      type:"discipline_stat_breakthrough",
      committed:true,
      stableCharacterId:identity.ownedCharacterId||identity.progressionCharacterId,
      ownedCharacterId:identity.ownedCharacterId,
      progressionCharacterId:identity.progressionCharacterId,
      representationVariantId:identity.registryId,
      disciplineId,
      curveId:CURVE_ID,
      priorStat,
      newStat,
      thresholdConsumed:threshold,
      expBeforeThresholdConsumption:expBefore,
      expRemainingAfter:Math.max(0,Number(progression.exp)||0),
      sourceDevelopmentReceiptRefs:[...sourceDevelopmentReceiptRefs],
      currentPLBefore:plBefore,
      currentPLAfter:plAfter,
      directPLGrant:0,
      transactionId:transactionId||null,
      timestamp:Date.now()
    };
    if(!existing)history().push(receipt);
    receipts.push(clone(receipt));
  }
  return{
    success:true,
    breakthroughs:receipts,
    exp:Math.max(0,Number(progression.exp)||0),
    expToNext:thresholdForStat(Number(character.stats&&character.stats[disciplineId])||0),
    currentStat:Number(character.stats&&character.stats[disciplineId])||0
  };
}
function rehydrateActivatedCharacter(character){
  const identity=stableIdentity(character);
  if(!identity.ownedCharacterId||!hasActivation(identity))return false;
  const saved=typeof playerData!=="undefined"&&playerData&&playerData.characters?playerData.characters[character.id]:null;
  if(saved&&validSevenStats(saved.stats))character.stats={...character.stats,...exactStats({stats:saved.stats})};
  for(const id of DISCIPLINE_IDS)neutralizeLegacyMastery(progressionFor(character.id,id));
  return true;
}
function activateCharacter(character,{save=true}={}){
  const identity=stableIdentity(character);
  if(!character||!identity.ownedRecord||!identity.ownedCharacterId)return{success:false,skipped:true,reason:"character_not_persistently_owned"};
  if(hasActivation(identity)){
    rehydrateActivatedCharacter(character);
    return{success:true,idempotent:true,identity};
  }
  const snapshot=takeSnapshot(character);
  const beforeStats=exactStats(character);
  try{
    const migrationBreakthroughs=[];
    for(const disciplineId of DISCIPLINE_IDS){
      neutralizeLegacyMastery(progressionFor(character.id,disciplineId));
      const resolved=resolvePendingBreakthroughs(character,disciplineId,{
        transactionId:`phase2_v1_activation:${identity.ownedCharacterId}:${disciplineId}`,
        sourceDevelopmentReceiptRefs:[]
      });
      if(resolved&&Array.isArray(resolved.breakthroughs))migrationBreakthroughs.push(...resolved.breakthroughs);
    }
    const receipt={
      receiptId:activationReceiptId(identity),
      type:"discipline_stat_curve_activation",
      committed:true,
      stableCharacterId:identity.ownedCharacterId,
      ownedCharacterId:identity.ownedCharacterId,
      progressionCharacterId:identity.progressionCharacterId,
      representationVariantId:identity.registryId,
      curveId:CURVE_ID,
      baselineStats:beforeStats,
      activatedStats:exactStats(character),
      preservedExistingDisciplineExp:true,
      migrationBreakthroughReceiptIds:migrationBreakthroughs.map(row=>row.receiptId),
      timestamp:Date.now()
    };
    history().push(receipt);
    if(save&&typeof savePlayerData==="function")savePlayerData();
    return{success:true,idempotent:false,identity,receipt:clone(receipt),migrationBreakthroughs};
  }catch(error){
    restoreSnapshot(snapshot);
    return{success:false,reason:"discipline_curve_activation_failed",error:String(error&&error.message||error)};
  }
}
function ensureActivated(character){
  const result=activateCharacter(character,{save:true});
  return result&&result.success===true;
}
function commitDevelopment(options={}){
  const character=characterById(options.characterId);
  const disciplineId=String(options.disciplineId||"");
  if(!character||!DISCIPLINE_IDS.includes(disciplineId))return{success:false,reason:"development_subject_or_discipline_invalid"};
  const identity=stableIdentity(character);
  if(!identity.ownedCharacterId)return{success:false,reason:"persistent_subject_identity_missing"};
  if(!ensureActivated(character))return{success:false,reason:"persistent_subject_activation_failed"};

  const profile=options.profileId===PROFILE_ID?{profileId:PROFILE_ID,developmentCeilingStat:DEVELOPMENT_CEILING_STAT}:null;
  if(profile){
    const pre=currentTeamPreflight(character.id,disciplineId,options.source||"practical");
    if(!pre.allowed)return{success:false,blocked:true,reason:pre.reason,preflight:clone(pre)};
  }

  const requested=Math.max(0,Math.trunc(Number(options.requestedExp)||0));
  const granted=Math.max(0,Math.trunc(Number(options.grantedExp??requested)||0));
  const sourceOccurrenceId=String(options.sourceOccurrenceId||`discipline_development:${Date.now()}:${++occurrenceSequence}`);
  const progressionSlotId=String(options.progressionSlotId||options.source||"discipline_action");
  const receiptId=options.developmentReceipt&&options.developmentReceipt.receiptId
    ?String(options.developmentReceipt.receiptId)
    :["discipline_development",identity.ownedCharacterId,sourceOccurrenceId,progressionSlotId,disciplineId].join(":");
  const existing=history().find(row=>row&&row.type==="discipline_development"&&row.receiptId===receiptId);
  if(existing)return{success:true,idempotent:true,receipt:clone(existing),expGranted:0,breakthroughs:[]};

  const progression=progressionFor(character.id,disciplineId);
  if(!progression)return{success:false,reason:"discipline_progression_missing"};
  const snapshot=takeSnapshot(character);
  const currentStatBefore=Math.max(0,Number(character.stats&&character.stats[disciplineId])||0);
  const plBefore=displayedPL(character);
  try{
    const record=options.developmentReceipt?clone(options.developmentReceipt):{
      receiptId,
      type:"discipline_development",
      activity:profile?"academy_foundation_discipline_activity":String(options.source||"discipline_development"),
      completed:true,
      committed:true,
      success:true,
      outcome:"discipline_development_granted",
      subjectVariantId:identity.registryId,
      actorVariantId:identity.registryId,
      stableCharacterId:identity.ownedCharacterId,
      ownedCharacterId:identity.ownedCharacterId,
      progressionCharacterId:identity.progressionCharacterId,
      sourceOccurrenceId,
      causalRootId:String(options.causalRootId||sourceOccurrenceId),
      progressionSlotId,
      disciplineId,
      developmentClass:options.developmentClass||"effective_execution",
      requestedExp:requested,
      expGranted:granted,
      causalCap:Number.isFinite(Number(options.causalCap))?Number(options.causalCap):null,
      profileId:profile&&profile.profileId,
      developmentCeilingStat:profile&&profile.developmentCeilingStat,
      curveId:CURVE_ID,
      directPLGrant:0,
      directStatGrant:false,
      playerFacingReason:options.playerFacingReason||null,
      timestamp:Date.now()
    };
    record.stableCharacterId=record.stableCharacterId||identity.ownedCharacterId;
    record.ownedCharacterId=record.ownedCharacterId||identity.ownedCharacterId;
    record.progressionCharacterId=record.progressionCharacterId||identity.progressionCharacterId;
    record.representationVariantId=record.representationVariantId||identity.registryId;
    record.curveId=CURVE_ID;
    record.expGranted=granted;
    record.directPLGrant=0;
    history().push(record);

    progression.exp=Math.max(0,Number(progression.exp)||0)+granted;
    neutralizeLegacyMastery(progression);
    const resolved=resolvePendingBreakthroughs(character,disciplineId,{
      transactionId:receiptId,
      sourceDevelopmentReceiptRefs:[receiptId]
    });
    if(!resolved.success)throw new Error(resolved.reason||"breakthrough_resolution_failed");

    let ceilingReceipt=null;
    const currentStatAfter=Math.max(0,Number(character.stats&&character.stats[disciplineId])||0);
    if(profile&&currentStatBefore<profile.developmentCeilingStat&&currentStatAfter>=profile.developmentCeilingStat){
      const ceilingId=ceilingReceiptId(identity,disciplineId,profile.profileId);
      const existingCeiling=history().find(row=>row&&row.type==="activity_development_ceiling_reached"&&row.receiptId===ceilingId);
      ceilingReceipt=existingCeiling||{
        receiptId:ceilingId,
        type:"activity_development_ceiling_reached",
        committed:true,
        stableCharacterId:identity.ownedCharacterId,
        ownedCharacterId:identity.ownedCharacterId,
        progressionCharacterId:identity.progressionCharacterId,
        representationVariantId:identity.registryId,
        disciplineId,
        profileId:profile.profileId,
        developmentCeilingStat:profile.developmentCeilingStat,
        curveId:CURVE_ID,
        sourceDevelopmentReceiptId:receiptId,
        timestamp:Date.now()
      };
      if(!existingCeiling)history().push(ceilingReceipt);
    }

    if(typeof savePlayerData==="function")savePlayerData();
    const result={
      success:true,idempotent:false,receipt:clone(record),expGranted:granted,
      currentStatBefore,currentStatAfter,
      expRemaining:resolved.exp,expToNext:resolved.expToNext,
      breakthroughs:clone(resolved.breakthroughs),
      ceilingReceipt:clone(ceilingReceipt),
      currentPLBefore:plBefore,currentPLAfter:displayedPL(character),
      curveId:CURVE_ID,profileId:profile&&profile.profileId
    };
    lastTransaction=clone(result);
    return result;
  }catch(error){
    restoreSnapshot(snapshot);
    return{success:false,reason:"discipline_development_transaction_failed",error:String(error&&error.message||error)};
  }
}
function getDevelopedStats448(character){return exactStats(character);}
function calculateCurrentRawPL448(character){return rawPLForStats(exactStats(character));}
function applyPendingStatGrowth448(characterId,disciplineId){
  const character=characterById(characterId);
  if(!character)return null;
  const progression=progressionFor(characterId,disciplineId);
  neutralizeLegacyMastery(progression);
  return{statPointsGained:0,stat:Number(character.stats&&character.stats[disciplineId])||0,statLevelApplied:1,retiredLegacyLevelGrowth:true};
}
function processLevelUps448(characterId,disciplineId){
  const character=characterById(characterId);
  if(!character)return null;
  ensureActivated(character);
  const progression=progressionFor(characterId,disciplineId);
  if(!progression)return null;
  neutralizeLegacyMastery(progression);
  const before=Number(character.stats&&character.stats[disciplineId])||0;
  const resolved=resolvePendingBreakthroughs(character,disciplineId,{
    transactionId:`legacy_process_bridge:${stableIdentity(character).ownedCharacterId||character.id}:${disciplineId}:${before}:${Number(progression.exp)||0}`,
    sourceDevelopmentReceiptRefs:[]
  });
  if(resolved.breakthroughs&&resolved.breakthroughs.length&&typeof savePlayerData==="function")savePlayerData();
  return{
    levelsGained:0,
    level:1,
    exp:Math.max(0,Number(progression.exp)||0),
    expToNext:thresholdForStat(Number(character.stats&&character.stats[disciplineId])||0),
    statPointsGained:(Number(character.stats&&character.stats[disciplineId])||0)-before,
    stat:Number(character.stats&&character.stats[disciplineId])||0,
    breakthroughs:clone(resolved.breakthroughs||[]),
    curveId:CURVE_ID
  };
}
function normalizeActionGrant(amount,source){
  const raw=Math.max(0,Math.trunc(Number(amount)||0));
  if(raw<=0)return 0;
  if(profileForSource(source))return raw>=1&&raw<=3?raw:2;
  return Math.min(3,raw);
}
function addDisciplineExp448(characterId,disciplineId,amount,source){
  if(typeof globalThis.isValidDisciplineTrainingSource==="function"&&!globalThis.isValidDisciplineTrainingSource(disciplineId,source)){
    return priorAddDisciplineExp?priorAddDisciplineExp.apply(this,arguments):false;
  }
  const grant=normalizeActionGrant(amount,source);
  if(grant<=0)return false;
  const profile=profileForSource(source);
  const context=activeOccurrence||{
    sourceOccurrenceId:`discipline_action:${String(source||"unknown")}:${String(characterId)}:${String(disciplineId)}:${Date.now()}:${++occurrenceSequence}`,
    source:String(source||"unknown")
  };
  const tx=commitDevelopment({
    characterId,disciplineId,requestedExp:grant,grantedExp:grant,source,
    sourceOccurrenceId:context.sourceOccurrenceId,
    causalRootId:context.sourceOccurrenceId,
    progressionSlotId:`${String(source||"activity")}_attempt`,
    causalCap:3,
    developmentClass:"effective_execution",
    profileId:profile&&profile.profileId,
    playerFacingReason:profile?`${String(source)==="exam"?"Exam":"Practical"} — effective execution.`:null
  });
  return !!(tx&&tx.success===true);
}
function trainingData448(characterId,disciplineId){
  const base=priorTrainingData?priorTrainingData.apply(this,arguments):null;
  const character=characterById(characterId),progression=progressionFor(characterId,disciplineId);
  if(!base||!character||!progression)return base;
  const stat=Math.max(0,Number(character.stats&&character.stats[disciplineId])||0);
  return{...base,naturalStat:stat,trainingLevel:1,exp:Math.max(0,Number(progression.exp)||0),expToNext:thresholdForStat(stat),statLevelApplied:1,currentStat:stat,curveId:CURVE_ID};
}
function activityData448(activityId,characterId){
  const data=priorCharacterActivityData?priorCharacterActivityData.apply(this,arguments):null;
  const character=characterById(characterId),profile=profileForSource(activityId);
  if(!data||!character||!Array.isArray(data.disciplines))return data;
  data.disciplines=data.disciplines.map(row=>{
    const progression=progressionFor(character.id,row.id);
    const stat=Math.max(0,Number(character.stats&&character.stats[row.id])||0);
    const required=thresholdForStat(stat);
    const exp=progression?Math.max(0,Number(progression.exp)||0):0;
    return{
      ...row,level:1,currentStat:stat,exp,expRequired:required,rewardExp:profile?2:row.rewardExp,
      curveId:CURVE_ID,profileId:profile&&profile.profileId,
      developmentCeilingStat:profile&&profile.developmentCeilingStat,
      developmentComplete:!!(profile&&stat>=profile.developmentCeilingStat)
    };
  });
  return data;
}
function disciplinePanel448(discipline){
  const panel=priorDisciplinePanel?priorDisciplinePanel.apply(this,arguments):null;
  if(!panel||!discipline)return panel;
  const currentStat=Math.max(0,Number(discipline.currentStat)||0);
  const exp=Math.max(0,Number(discipline.exp)||0);
  const required=Math.max(1,Number(discipline.expRequired)||thresholdForStat(currentStat));
  return{
    ...panel,
    level:1,
    currentStat,
    exp,
    expRequired:required,
    expRemaining:Math.max(0,required-exp),
    progressPercent:Math.max(0,Math.min(100,(exp/required)*100)),
    rewardExp:Number(discipline.rewardExp)||0,
    curveId:CURVE_ID,
    profileId:discipline.profileId||null,
    developmentCeilingStat:Number(discipline.developmentCeilingStat)||null,
    developmentComplete:discipline.developmentComplete===true
  };
}
function trainingEligibility448(characterId,disciplineId,source){
  const legacy=priorTrainingEligibility?priorTrainingEligibility.apply(this,arguments):{allowed:true,reason:null};
  if(!legacy||legacy.allowed!==true)return legacy;
  const profile=profileForSource(source);
  if(!profile)return legacy;
  const pre=currentTeamPreflight(characterId,disciplineId,source);
  if(!pre.allowed)return{...legacy,allowed:false,reason:pre.reason,phase2Preflight:clone(pre)};
  return{...legacy,phase2Preflight:clone(pre),developmentCeilingStat:profile.developmentCeilingStat,profileId:profile.profileId};
}
function openActivity448(serviceId,characterId){
  const result=priorOpenActivity?priorOpenActivity.apply(this,arguments):null;
  if(result&&result.success===true&&(serviceId==="exam"||serviceId==="exams"||serviceId==="practical")){
    const team=currentTeam();
    const source=serviceId==="exams"?"exam":serviceId;
    selectionSnapshot={serviceId:source,assignmentId:team&&team.assignmentId||null,selectedCharacterId:result.characterId||characterId||null};
  }
  return result;
}
function makeOccurrence(source,characterId,disciplineId){
  const identity=stableIdentity(characterId);
  return{
    source,
    sourceOccurrenceId:[
      "academy_foundation_discipline_activity",
      source,
      identity.ownedCharacterId||identity.progressionCharacterId||characterId,
      disciplineId,
      Date.now(),
      ++occurrenceSequence
    ].join(":")
  };
}
function executeExamAttempt448(characterId,disciplineId){
  const pre=currentTeamPreflight(characterId,disciplineId,"exam");
  if(!pre.allowed)return{success:false,completed:false,blocked:true,reason:pre.reason,phase2Preflight:clone(pre)};
  activeOccurrence=makeOccurrence("exam",characterId,disciplineId);
  try{return priorExamAttempt?priorExamAttempt.apply(this,arguments):{success:false,completed:false,reason:"exam_attempt_owner_missing"};}
  finally{activeOccurrence=null;}
}
function executePracticalAttempt448(characterId,disciplineId){
  const pre=currentTeamPreflight(characterId,disciplineId,"practical");
  if(!pre.allowed)return{success:false,completed:false,blocked:true,reason:pre.reason,phase2Preflight:clone(pre)};
  activeOccurrence=makeOccurrence("practical",characterId,disciplineId);
  try{return priorPracticalAttempt?priorPracticalAttempt.apply(this,arguments):{success:false,completed:false,reason:"practical_attempt_owner_missing"};}
  finally{activeOccurrence=null;}
}
function syncFromSave448(){
  const result=priorSyncFromSave?priorSyncFromSave.apply(this,arguments):undefined;
  if(typeof playerTeam!=="undefined"&&Array.isArray(playerTeam))playerTeam.forEach(rehydrateActivatedCharacter);
  return result;
}
function registerFoundationActivities(){
  for(const source of REGISTERED_ACTIVITY_SOURCES){
    if(typeof globalThis.getActivityData==="function"){
      const activity=globalThis.getActivityData(source);
      if(activity&&Array.isArray(activity.rewards)){
        activity.rewards.forEach(reward=>{if(reward&&reward.type==="discipline")reward.amount=2;});
      }
    }
    if(typeof globalThis.getTrainingConfiguration==="function"){
      const config=globalThis.getTrainingConfiguration(source);
      if(config&&typeof config==="object")config.baseExp=2;
    }
  }
}
function activateOwnedRuntimeCharacters(){
  if(typeof playerTeam==="undefined"||!Array.isArray(playerTeam))return[];
  const results=[];
  for(const character of playerTeam){
    if(!character||!ownedRecordFor(character))continue;
    results.push({characterId:character.id,...activateCharacter(character,{save:false})});
  }
  if(results.some(row=>row.success===true&&row.idempotent!==true)&&typeof savePlayerData==="function")savePlayerData();
  return results;
}

if(priorDevelopedStats){
  globalThis.getDevelopedCharacterStats=getDevelopedStats448;
  try{getDevelopedCharacterStats=getDevelopedStats448;}catch(_error){}
}
if(priorCurrentRawPL){
  globalThis.calculateCurrentRawPL=calculateCurrentRawPL448;
  try{calculateCurrentRawPL=calculateCurrentRawPL448;}catch(_error){}
}
if(priorPendingStatGrowth){
  globalThis.applyPendingDisciplineStatGrowth=applyPendingStatGrowth448;
  try{applyPendingDisciplineStatGrowth=applyPendingStatGrowth448;}catch(_error){}
}
if(priorProcessLevelUps){
  globalThis.processDisciplineLevelUps=processLevelUps448;
  try{processDisciplineLevelUps=processLevelUps448;}catch(_error){}
}
if(priorAddDisciplineExp){
  globalThis.addDisciplineExp=addDisciplineExp448;
  try{addDisciplineExp=addDisciplineExp448;}catch(_error){}
}
if(priorTrainingData){
  globalThis.getTrainingActionData=trainingData448;
  try{getTrainingActionData=trainingData448;}catch(_error){}
}
if(priorCharacterActivityData){
  globalThis.getKonohaCharacterActivityData=activityData448;
  try{getKonohaCharacterActivityData=activityData448;}catch(_error){}
}
if(priorDisciplinePanel){
  globalThis.getKonohaDisciplineUIPanelData=disciplinePanel448;
  try{getKonohaDisciplineUIPanelData=disciplinePanel448;}catch(_error){}
}
if(priorTrainingEligibility){
  globalThis.getTrainingEligibility=trainingEligibility448;
  try{getTrainingEligibility=trainingEligibility448;}catch(_error){}
}
if(priorOpenActivity){
  globalThis.openKonohaActivityUIScreen=openActivity448;
  try{openKonohaActivityUIScreen=openActivity448;}catch(_error){}
}
if(priorExamAttempt){
  globalThis.executeKonohaExamAttempt=executeExamAttempt448;
  try{executeKonohaExamAttempt=executeExamAttempt448;}catch(_error){}
}
if(priorPracticalAttempt){
  globalThis.executeKonohaPracticalAttempt=executePracticalAttempt448;
  try{executeKonohaPracticalAttempt=executePracticalAttempt448;}catch(_error){}
}
if(priorSyncFromSave){
  globalThis.syncCharacterProgressionFromSave=syncFromSave448;
  try{syncCharacterProgressionFromSave=syncFromSave448;}catch(_error){}
}

registerFoundationActivities();
const activationResults=activateOwnedRuntimeCharacters();

function diagnostics(){
  const synthetic10={nin:10,tai:1,gen:1,buki:1,fuin:1,kin:1,stamina:1};
  const synthetic11={...synthetic10,nin:11};
  const checks={
    exactCurveId:CURVE_ID==="discipline_stat_curve_v1",
    threshold10:thresholdForStat(10)===10,
    threshold11:thresholdForStat(11)===15,
    threshold20:thresholdForStat(20)===15,
    threshold21:thresholdForStat(21)===20,
    foundationCeiling:DEVELOPMENT_CEILING_STAT===15,
    registeredActivities:REGISTERED_ACTIVITY_SOURCES.join("|")==="exam|practical",
    noTechniquePracticeWriter:!String(commitDevelopment).includes("techniquePractice"),
    noDirectPLGrant:String(commitDevelopment).includes("directPLGrant:0"),
    exactStatsPLOnly:Math.round(rawPLForStats(synthetic10))!==Math.round(rawPLForStats(synthetic11))||rawPLForStats(synthetic10)!==rawPLForStats(synthetic11),
    legacyMasteryNeutralized:String(neutralizeLegacyMastery).includes("progression.level=1"),
    currentTeamPreflight:String(currentTeamPreflight).includes("stale_team_assignment")&&String(currentTeamPreflight).includes("selected_subject_not_in_current_team"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{
    patchId:PATCH_ID,pass:failed.length===0,checks,failed,
    curveId:CURVE_ID,profileId:PROFILE_ID,developmentCeilingStat:DEVELOPMENT_CEILING_STAT,
    registeredActivities:[...REGISTERED_ACTIVITY_SOURCES],
    activationResults:clone(activationResults),
    lastTransaction:clone(lastTransaction),
    browserGoldenClaimed:false
  };
}

globalThis.getDisciplineStatExpThreshold44800=thresholdForStat;
globalThis.getDisciplineDevelopmentPreflight44800=currentTeamPreflight;
globalThis.commitDisciplineDevelopment44800=commitDevelopment;
globalThis.getLastDisciplineDevelopmentTransaction44800=()=>clone(lastTransaction);
globalThis.getPhase2DisciplineDevelopmentRegisteredActivities44800=()=>[...REGISTERED_ACTIVITY_SOURCES];
globalThis.runPhase2DisciplineDevelopment44800Diagnostics=diagnostics;
globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_44800=Object.freeze({
  patchId:PATCH_ID,curveId:CURVE_ID,profileId:PROFILE_ID,developmentCeilingStat:DEVELOPMENT_CEILING_STAT,
  registeredActivities:[...REGISTERED_ACTIVITY_SOURCES],browserGoldenClaimed:false
});
})();
