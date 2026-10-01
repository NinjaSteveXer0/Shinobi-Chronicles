// ============================================================================
// PHASE 2 — DISCIPLINE DEVELOPMENT -> PERSISTENT CURRENT STAT GROWTH — #448
//
// Binding authority:
// Documentation/Progression/Phase 2 Discipline Development to Persistent Stat Growth Trial Contract 2026-10-01.md
//
// This is a bounded Academy Foundation adapter. It does not create a second Stat
// owner, generic Skill XP, Technique Practice, Energy costs, or team-wide EXP.
// Canonical persistent Stats remain playerData.characters[*].stats / runtime
// character.stats, and Current PL remains formula-derived from those seven Stats.
// ============================================================================
(function installPhase2DisciplineDevelopment44800(){
"use strict";
if(globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_44800)return;

const PATCH_ID="phase2_discipline_development_44800_2026_10_01";
const CURVE_ID="discipline_stat_curve_v1";
const PROFILE_ID="academy_foundation_discipline_activity_v1";
const DEVELOPMENT_CEILING_STAT=15;
const SUPPORTED_SERVICES=Object.freeze(["exam","practical"]);
const STAT_IDS=Object.freeze(["nin","tai","gen","buki","fuin","kin","stamina"]);
const STYLE_ID="sc-phase2-discipline-development-44800";

const priorDevelopedStats=typeof globalThis.getDevelopedCharacterStats==="function"?globalThis.getDevelopedCharacterStats:null;
const priorExamAttempt=typeof globalThis.executeKonohaExamAttempt==="function"?globalThis.executeKonohaExamAttempt:null;
const priorPracticalAttempt=typeof globalThis.executeKonohaPracticalAttempt==="function"?globalThis.executeKonohaPracticalAttempt:null;
const priorExamBatch=typeof globalThis.executeKonohaExamBatch==="function"?globalThis.executeKonohaExamBatch:null;
const priorPracticalTraining=typeof globalThis.executeKonohaPracticalTraining==="function"?globalThis.executeKonohaPracticalTraining:null;
const priorExamRender=typeof globalThis.renderKonohaExamVisualScreen==="function"?globalThis.renderKonohaExamVisualScreen:null;
const priorPracticalRender=typeof globalThis.renderKonohaPracticalVisualScreen==="function"?globalThis.renderKonohaPracticalVisualScreen:null;
const priorExamBatchNotification=typeof globalThis.buildKonohaExamBatchResultNotification==="function"?globalThis.buildKonohaExamBatchResultNotification:null;
const priorPracticalBatchNotification=typeof globalThis.buildKonohaPracticalBatchResultNotification==="function"?globalThis.buildKonohaPracticalBatchResultNotification:null;
const priorPracticalSpecialNotifications=typeof globalThis.buildKonohaPracticalSpecialNotifications==="function"?globalThis.buildKonohaPracticalSpecialNotifications:null;

function clone(value){
  if(value==null||typeof value!=="object")return value;
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function player(){return typeof playerData!=="undefined"&&playerData?playerData:null;}
function root(){
  const pd=player();if(!pd)return null;
  if(typeof globalThis.ensurePhase2ChronicleState43600==="function")globalThis.ensurePhase2ChronicleState43600({save:false});
  if(!pd.phase2ChronicleState||typeof pd.phase2ChronicleState!=="object")pd.phase2ChronicleState={schemaVersion:2};
  if(!pd.phase2ChronicleState.disciplineDevelopment||typeof pd.phase2ChronicleState.disciplineDevelopment!=="object"){
    pd.phase2ChronicleState.disciplineDevelopment={
      schemaVersion:1,curveId:CURVE_ID,profileId:PROFILE_ID,nextSequence:1,
      migratedProgressionCharacterIds:{},processedReceiptIds:[],
      developmentReceipts:[],breakthroughReceipts:[],ceilingReceipts:[]
    };
  }
  const state=pd.phase2ChronicleState.disciplineDevelopment;
  state.schemaVersion=1;state.curveId=CURVE_ID;state.profileId=PROFILE_ID;
  state.nextSequence=Math.max(1,Math.floor(Number(state.nextSequence)||1));
  if(!state.migratedProgressionCharacterIds||typeof state.migratedProgressionCharacterIds!=="object")state.migratedProgressionCharacterIds={};
  for(const key of ["processedReceiptIds","developmentReceipts","breakthroughReceipts","ceilingReceipts"]){
    if(!Array.isArray(state[key]))state[key]=[];
  }
  state.processedReceiptIds=[...new Set(state.processedReceiptIds.filter(Boolean))];
  return state;
}
function currentTeam(){
  if(typeof globalThis.getChronicleCurrentTeam43600!=="function")return null;
  const team=globalThis.getChronicleCurrentTeam43600();
  return team&&team.committed===true&&Array.isArray(team.teamVariantIds)&&team.teamVariantIds.length===3?team:null;
}
function registryId(character){
  if(!character)return null;
  if(typeof getCharacterRegistryId==="function"){
    const id=getCharacterRegistryId(character);if(id)return id;
  }
  return character.registryId||character.id||null;
}
function identity(characterId){
  const character=typeof getPlayerCharacter==="function"?getPlayerCharacter(characterId):null;
  if(!character)return null;
  const variantId=registryId(character);
  const record=variantId&&typeof getOwnedCharacterRecordByVariantId==="function"?getOwnedCharacterRecordByVariantId(variantId):null;
  if(!record||!record.ownedCharacterId||!record.progressionCharacterId)return null;
  return{character,variantId,ownedCharacterId:record.ownedCharacterId,progressionCharacterId:record.progressionCharacterId};
}
function thresholdForStat(statValue){
  const s=Math.max(0,Number(statValue)||0);
  return 5+(5*Math.ceil(s/10));
}
function exactStats(character){
  const source=character&&character.stats&&typeof character.stats==="object"?character.stats:{};
  const output={};
  for(const stat of STAT_IDS)output[stat]=Number(source[stat])||0;
  return output;
}
function exactDevelopedStats44800(character){return exactStats(character);}
function canonicalSaveRecord(progressionCharacterId,character){
  const pd=player();if(!pd)return null;
  if(!pd.characters||typeof pd.characters!=="object")pd.characters={};
  if(!pd.characters[progressionCharacterId]||typeof pd.characters[progressionCharacterId]!=="object"){
    pd.characters[progressionCharacterId]={
      stats:exactStats(character),
      permanentPLBonus:0,
      disciplineProgression:typeof normalizeDisciplineProgression==="function"?normalizeDisciplineProgression(character.disciplineProgression):clone(character.disciplineProgression||{}),
      weaponSpecializations:clone(character.weaponSpecializations||{})
    };
  }
  return pd.characters[progressionCharacterId];
}
function migrateOrRehydrateCharacter(character){
  if(!character)return{success:false,changed:false,reason:"character_missing"};
  const id=identity(character.id);if(!id)return{success:false,changed:false,reason:"stable_identity_missing"};
  const state=root();if(!state)return{success:false,changed:false,reason:"discipline_state_missing"};
  const record=canonicalSaveRecord(id.progressionCharacterId,character);if(!record)return{success:false,changed:false,reason:"character_save_record_missing"};
  const marker=state.migratedProgressionCharacterIds[id.progressionCharacterId]||null;
  if(marker&&record.stats&&typeof record.stats==="object"){
    for(const stat of STAT_IDS){
      if(Number.isFinite(Number(record.stats[stat])))character.stats[stat]=Number(record.stats[stat]);
    }
    return{success:true,changed:false,mode:"rehydrated",identity:id};
  }

  // First #448 migration consumes the already-reconciled runtime Current Stats
  // as the safe baseline. This happens after all frozen Origin reward adapters
  // have loaded, so historical permanent Current-Stat packages are retained.
  record.stats=exactStats(character);
  state.migratedProgressionCharacterIds[id.progressionCharacterId]={
    progressionCharacterId:id.progressionCharacterId,
    ownedCharacterId:id.ownedCharacterId,
    variantId:id.variantId,
    migratedAt:Date.now(),
    source:"post_legacy_sync_runtime_current_stats"
  };
  return{success:true,changed:true,mode:"seeded",identity:id};
}
function migrateOrRehydrateAll(){
  const roster=typeof playerTeam!=="undefined"&&Array.isArray(playerTeam)?playerTeam:[];
  let changed=false;
  const rows=[];
  for(const character of roster){
    const result=migrateOrRehydrateCharacter(character);
    rows.push(result);
    if(result&&result.changed)changed=true;
  }
  if(changed&&typeof savePlayerData==="function")savePlayerData();
  return{changed,rows};
}
function subjectProjection(characterId,disciplineId){
  const id=identity(characterId);if(!id)return null;
  const progression=typeof getCharacterDisciplineProgression==="function"?getCharacterDisciplineProgression(characterId,disciplineId):null;
  if(!progression||!STAT_IDS.includes(disciplineId))return null;
  const currentStat=Number(id.character.stats&&id.character.stats[disciplineId])||0;
  const exp=Math.max(0,Number(progression.exp)||0);
  const threshold=thresholdForStat(currentStat);
  return{
    characterId:id.character.id,variantId:id.variantId,ownedCharacterId:id.ownedCharacterId,
    progressionCharacterId:id.progressionCharacterId,disciplineId,currentStat,exp,
    threshold,expRemaining:Math.max(0,threshold-exp),
    progressPercent:threshold>0?Math.max(0,Math.min(100,(exp/threshold)*100)):0,
    developmentCeilingStat:DEVELOPMENT_CEILING_STAT,
    ceilingReached:currentStat>=DEVELOPMENT_CEILING_STAT,
    curveId:CURVE_ID,profileId:PROFILE_ID
  };
}
function preflight(serviceId,characterId,disciplineId){
  if(!SUPPORTED_SERVICES.includes(serviceId))return{allowed:false,reason:"foundation_activity_not_registered"};
  const team=currentTeam();if(!team)return{allowed:false,reason:"committed_current_team_missing"};
  const id=identity(characterId);if(!id)return{allowed:false,reason:"stable_subject_identity_missing"};
  if(!team.teamVariantIds.includes(id.variantId))return{allowed:false,reason:"subject_not_in_committed_current_team"};
  const discipline=typeof getShinobiDiscipline==="function"?getShinobiDiscipline(disciplineId):null;
  if(!discipline||discipline.trainingSource!==serviceId)return{allowed:false,reason:"discipline_not_registered_for_activity"};
  const projection=subjectProjection(characterId,disciplineId);if(!projection)return{allowed:false,reason:"discipline_projection_missing"};
  if(projection.ceilingReached)return{allowed:false,reason:"development_ceiling_reached",teamAssignmentId:team.assignmentId,...projection};
  return{allowed:true,reason:null,teamAssignmentId:team.assignmentId,...projection};
}
function findDevelopmentReceipt(receiptId){
  const state=root();if(!state||!receiptId)return null;
  return state.developmentReceipts.find(row=>row&&row.receiptId===receiptId)||null;
}
function allocateReceiptId(serviceId,id,disciplineId){
  const state=root();if(!state)return null;
  const sequence=state.nextSequence++;
  return `discipline-development::${serviceId}::${id.ownedCharacterId}::${disciplineId}::${sequence}`;
}
function recordAttemptHistory(serviceId,context,resolution,tx){
  if(typeof activityHistory==="undefined"||!Array.isArray(activityHistory))return false;
  const detail={
    disciplineId:context.disciplineId,
    disciplineName:context.disciplineName,
    disciplineLevel:Number(context.disciplineLevel)||1,
    statValue:Number(context.statValue)||0
  };
  activityHistory.push({
    historyScope:typeof getCurrentChronicleOccurrenceHistoryScope==="function"?getCurrentChronicleOccurrenceHistoryScope("activity"):null,
    activity:serviceId,
    character:context.characterId,
    completed:true,
    success:resolution.passed===true,
    outcome:resolution.outcome||((resolution.passed===true)?"pass":"fail"),
    [serviceId==="exam"?"exam":"practical"]:detail,
    rewards:{exp:0,ryo:0,items:[],progression:[{type:"discipline",id:context.disciplineId,amount:tx.developmentExp}]},
    development:{
      receiptId:tx.receiptId,ownedCharacterId:tx.ownedCharacterId,progressionCharacterId:tx.progressionCharacterId,
      curveId:CURVE_ID,profileId:PROFILE_ID,developmentExp:tx.developmentExp,
      statBefore:tx.statBefore,statAfter:tx.statAfter,breakthroughCount:tx.breakthroughCount
    },
    timestamp:Date.now()
  });
  if(typeof syncActivityHistory==="function")syncActivityHistory();
  return true;
}
function commitDevelopment({serviceId,characterId,disciplineId,developmentExp,receiptId=null,expectedTeamAssignmentId=null,context=null,resolution=null,recordHistory=false}={}){
  const expAmount=Math.floor(Number(developmentExp));
  if(!Number.isFinite(expAmount)||expAmount<1||expAmount>3)return{success:false,reason:"invalid_action_derived_development_exp"};
  // Idempotence is checked before current eligibility. A legitimately committed
  // receipt must remain a successful no-op replay even if that original commit
  // itself reached the activity ceiling or the team later changed.
  const earlyState=root();
  if(receiptId&&earlyState&&earlyState.processedReceiptIds.includes(receiptId)){
    const existing=findDevelopmentReceipt(receiptId);
    return{success:true,idempotent:true,...clone(existing||{receiptId})};
  }
  const before=preflight(serviceId,characterId,disciplineId);
  if(!before.allowed)return{success:false,...before};
  if(expectedTeamAssignmentId&&expectedTeamAssignmentId!==before.teamAssignmentId)return{success:false,reason:"stale_team_assignment",expectedTeamAssignmentId,currentTeamAssignmentId:before.teamAssignmentId};

  const id=identity(characterId);const state=root();const progression=getCharacterDisciplineProgression(characterId,disciplineId);
  if(!id||!state||!progression)return{success:false,reason:"development_transaction_state_missing"};
  const migration=migrateOrRehydrateCharacter(id.character);
  if(!migration||migration.success!==true)return{success:false,reason:migration&&migration.reason||"persistent_stat_migration_failed"};
  const finalReceiptId=receiptId||allocateReceiptId(serviceId,id,disciplineId);
  if(!finalReceiptId)return{success:false,reason:"development_receipt_identity_failed"};
  if(state.processedReceiptIds.includes(finalReceiptId)){
    const existing=findDevelopmentReceipt(finalReceiptId);
    return{success:true,idempotent:true,...clone(existing||{receiptId:finalReceiptId})};
  }

  const saveRecord=canonicalSaveRecord(id.progressionCharacterId,id.character);
  const snapshot={
    stat:Number(id.character.stats[disciplineId])||0,
    exp:Number(progression.exp)||0,
    state:clone(state),
    saveRecord:clone(saveRecord),
    historyLength:typeof activityHistory!=="undefined"&&Array.isArray(activityHistory)?activityHistory.length:null
  };
  const plBefore=typeof calculateCurrentPL==="function"?calculateCurrentPL(id.character):0;
  try{
    progression.exp=Math.max(0,Number(progression.exp)||0)+expAmount;
    const statBefore=Number(id.character.stats[disciplineId])||0;
    const expBefore=snapshot.exp;
    const breakthroughs=[];
    while((Number(id.character.stats[disciplineId])||0)<DEVELOPMENT_CEILING_STAT){
      const currentStat=Number(id.character.stats[disciplineId])||0;
      const threshold=thresholdForStat(currentStat);
      if((Number(progression.exp)||0)<threshold)break;
      progression.exp-=threshold;
      id.character.stats[disciplineId]=currentStat+1;
      const breakthrough={
        receiptId:`${finalReceiptId}::breakthrough::${breakthroughs.length+1}`,
        sourceDevelopmentReceiptId:finalReceiptId,ownedCharacterId:id.ownedCharacterId,
        progressionCharacterId:id.progressionCharacterId,variantId:id.variantId,disciplineId,
        curveId:CURVE_ID,statBefore:currentStat,statAfter:currentStat+1,thresholdConsumed:threshold,
        committedAt:Date.now()
      };
      breakthroughs.push(breakthrough);state.breakthroughReceipts.push(breakthrough);
    }

    const statAfter=Number(id.character.stats[disciplineId])||0;
    const expAfter=Math.max(0,Number(progression.exp)||0);
    const plAfter=typeof calculateCurrentPL==="function"?calculateCurrentPL(id.character):plBefore;
    const receipt={
      receiptId:finalReceiptId,serviceId,profileId:PROFILE_ID,curveId:CURVE_ID,
      teamAssignmentId:before.teamAssignmentId,ownedCharacterId:id.ownedCharacterId,
      progressionCharacterId:id.progressionCharacterId,variantId:id.variantId,disciplineId,
      developmentExp:expAmount,outcome:resolution&&resolution.outcome||null,
      statBefore,statAfter,expBefore,expAfter,breakthroughCount:breakthroughs.length,
      currentPLBefore:plBefore,currentPLAfter:plAfter,committedAt:Date.now()
    };
    state.developmentReceipts.push(receipt);
    state.processedReceiptIds.push(finalReceiptId);

    if(statBefore<DEVELOPMENT_CEILING_STAT&&statAfter>=DEVELOPMENT_CEILING_STAT){
      const ceilingReceiptId=`${finalReceiptId}::ceiling`;
      if(!state.ceilingReceipts.some(row=>row&&row.receiptId===ceilingReceiptId)){
        state.ceilingReceipts.push({
          receiptId:ceilingReceiptId,sourceDevelopmentReceiptId:finalReceiptId,
          ownedCharacterId:id.ownedCharacterId,progressionCharacterId:id.progressionCharacterId,
          variantId:id.variantId,disciplineId,profileId:PROFILE_ID,
          developmentCeilingStat:DEVELOPMENT_CEILING_STAT,reachedAt:Date.now()
        });
      }
    }
    saveRecord.stats=exactStats(id.character);
    saveRecord.disciplineProgression=typeof normalizeDisciplineProgression==="function"?normalizeDisciplineProgression(id.character.disciplineProgression):clone(id.character.disciplineProgression||{});

    const tx={...receipt,success:true,idempotent:false,breakthroughs:clone(breakthroughs),nextThreshold:thresholdForStat(statAfter),ceilingReached:statAfter>=DEVELOPMENT_CEILING_STAT};
    if(recordHistory&&context&&resolution&&!recordAttemptHistory(serviceId,context,resolution,tx))throw new Error("activity_history_commit_failed");
    if(typeof savePlayerData==="function")savePlayerData();
    return tx;
  }catch(error){
    id.character.stats[disciplineId]=snapshot.stat;
    progression.exp=snapshot.exp;
    const current=root();
    if(current){
      for(const key of Object.keys(current))delete current[key];
      Object.assign(current,clone(snapshot.state));
    }
    const pd=player();
    if(pd&&pd.characters&&snapshot.saveRecord)pd.characters[id.progressionCharacterId]=clone(snapshot.saveRecord);
    if(snapshot.historyLength!=null&&typeof activityHistory!=="undefined"&&Array.isArray(activityHistory)){
      activityHistory.splice(snapshot.historyLength);
      if(typeof syncActivityHistory==="function")syncActivityHistory();
    }
    return{success:false,reason:"development_transaction_rolled_back",error:String(error&&error.message||error)};
  }
}
function executeFoundationAttempt(serviceId,characterId,disciplineId){
  const before=preflight(serviceId,characterId,disciplineId);
  if(!before.allowed)return{success:false,completed:false,reason:before.reason,ceilingReached:before.reason==="development_ceiling_reached",currentStat:before.currentStat};
  const context=serviceId==="exam"
    ?(typeof createKonohaExamAttemptContext==="function"?createKonohaExamAttemptContext(characterId,disciplineId):null)
    :(typeof createKonohaPracticalAttemptContext==="function"?createKonohaPracticalAttemptContext(characterId,disciplineId):null);
  if(!context)return{success:false,completed:false,reason:`${serviceId}_context_invalid`};
  // Numeric Mastery is retired by #448. Existing Exam/Practical pass/fail
  // ownership is preserved, but the legacy level input is neutralised to its
  // baseline so it can no longer become a second persistent progression axis.
  context.disciplineLevel=1;
  context.disciplineExp=before.exp;
  const resolution=serviceId==="exam"
    ?(typeof resolveKonohaExamAttempt==="function"?resolveKonohaExamAttempt(context):null)
    :(typeof resolveKonohaPracticalAttempt==="function"?resolveKonohaPracticalAttempt(context):null);
  if(!resolution)return{success:false,completed:false,reason:`${serviceId}_resolution_failed`};
  const developmentExp=resolution.passed===true?2:1;
  const tx=commitDevelopment({
    serviceId,characterId,disciplineId,developmentExp,
    expectedTeamAssignmentId:before.teamAssignmentId,context,resolution,recordHistory:true
  });
  if(!tx.success)return{success:false,completed:false,reason:tx.reason||`${serviceId}_development_failed`};

  const character=getPlayerCharacter(characterId);
  const discipline=getShinobiDiscipline(disciplineId);
  const legacyLevel=Number(context.disciplineLevel)||1;
  return{
    success:resolution.passed===true,completed:true,outcome:resolution.outcome,
    characterId,characterName:character&&character.name||characterId,
    disciplineId,disciplineName:discipline&&discipline.name||disciplineId,source:serviceId,
    developmentExp,rewardExp:developmentExp,expGained:developmentExp,developmentReceiptId:tx.receiptId,
    previousLevel:legacyLevel,newLevel:legacyLevel,levelsGained:0,leveledUp:false,
    disciplineLevelBefore:legacyLevel,disciplineLevelAfter:legacyLevel,
    previousStat:tx.statBefore,newStat:tx.statAfter,statPointsGained:tx.breakthroughCount,
    previousExp:tx.expBefore,currentExp:tx.expAfter,disciplineExpBefore:tx.expBefore,disciplineExpAfter:tx.expAfter,
    expToNext:tx.nextThreshold,currentStat:tx.statAfter,ceilingReached:tx.ceilingReached,
    difficulty:resolution.difficulty,score:resolution.score,historyPressure:resolution.history,history:resolution.history,
    currentPLBefore:tx.currentPLBefore,currentPLAfter:tx.currentPLAfter
  };
}
function executeExamAttempt44800(characterId,disciplineId){return executeFoundationAttempt("exam",characterId,disciplineId);}
function executePracticalAttempt44800(characterId,disciplineId){return executeFoundationAttempt("practical",characterId,disciplineId);}

function batchMeta(serviceId,characterId,disciplineId,count,results,beforePL,afterPL,stoppedReason){
  return{
    characterId,disciplineId,requestedBatchSize:count,completedAttempts:results.length,
    successfulAttempts:results.filter(row=>row&&row.success===true).length,
    failedAttempts:results.filter(row=>row&&row.completed===true&&row.success!==true).length,
    stoppedReason:stoppedReason||null,
    developmentCeilingStat:DEVELOPMENT_CEILING_STAT,
    beforePL:{rawPL:beforePL.rawPL,displayedPL:beforePL.displayedPL,nextPL:beforePL.nextPL,progressPercent:beforePL.progressPercent},
    afterPL:{rawPL:afterPL.rawPL,displayedPL:afterPL.displayedPL,nextPL:afterPL.nextPL,progressPercent:afterPL.progressPercent}
  };
}
function executeExamBatch44800(characterId,disciplineId,batchSize=1){
  const count=[1,5,10].includes(Number(batchSize))?Number(batchSize):1;
  const character=getPlayerCharacter(characterId);if(!character)return[];
  const beforePL=getCharacterPLProgress(character),results=[];let stoppedReason=null;
  for(let index=0;index<count;index+=1){
    const check=preflight("exam",characterId,disciplineId);
    if(!check.allowed){stoppedReason=check.reason;break;}
    const result=executeExamAttempt44800(characterId,disciplineId);
    if(!result||result.completed!==true){stoppedReason=result&&result.reason||"attempt_incomplete";break;}
    results.push(result);
  }
  const afterPL=getCharacterPLProgress(character);
  KONOHA_EXAM_ATTEMPT_STATE.lastBatch=results;
  KONOHA_EXAM_ATTEMPT_STATE.lastBatchMeta=batchMeta("exam",characterId,disciplineId,count,results,beforePL,afterPL,stoppedReason);
  if(typeof recordKonohaExamSpecialNotifications==="function")recordKonohaExamSpecialNotifications(characterId);
  return results;
}
function executePracticalTraining44800(){
  const session=getKonohaActivityUISessionState();
  if(!session||!session.characterId)return{success:false,reason:"No selected character."};
  const characterId=session.characterId,disciplineId=getKonohaPracticalSelectedDisciplineId(),batchSize=getKonohaPracticalBatchSize();
  const character=getPlayerCharacter(characterId);if(!character)return{success:false,reason:"Selected character could not be loaded."};
  if(typeof clearKonohaPracticalResultPresentation==="function")clearKonohaPracticalResultPresentation(false);
  const beforePL=getCharacterPLProgress(character),results=[];let stoppedReason=null;
  for(let index=0;index<batchSize;index+=1){
    const check=preflight("practical",characterId,disciplineId);
    if(!check.allowed){stoppedReason=check.reason;break;}
    const result=executePracticalAttempt44800(characterId,disciplineId);
    if(!result||result.completed!==true){stoppedReason=result&&result.reason||"attempt_incomplete";break;}
    results.push(result);
  }
  const afterPL=getCharacterPLProgress(character);
  KONOHA_PRACTICAL_UI_STATE.lastBatch=results;
  KONOHA_PRACTICAL_UI_STATE.lastBatchMeta=batchMeta("practical",characterId,disciplineId,batchSize,results,beforePL,afterPL,stoppedReason);
  KONOHA_PRACTICAL_UI_STATE.resultVisible=false;
  if(typeof recordKonohaPracticalSpecialNotifications==="function")recordKonohaPracticalSpecialNotifications(characterId);
  if(typeof renderKonohaPracticalVisualScreen==="function")renderKonohaPracticalVisualScreen();
  return{
    success:results.some(row=>row&&row.success===true),characterId,disciplineId,
    requestedAttempts:batchSize,completedAttempts:results.length,
    successfulAttempts:results.filter(row=>row&&row.success===true).length,
    failedAttempts:results.filter(row=>row&&row.success!==true).length,
    stoppedReason,results
  };
}
function batchNotification(serviceId,characterId){
  const state=serviceId==="exam"?KONOHA_EXAM_ATTEMPT_STATE:KONOHA_PRACTICAL_UI_STATE;
  const meta=state.lastBatchMeta||null,results=Array.isArray(state.lastBatch)?state.lastBatch:[];
  if(!meta||meta.characterId!==characterId||results.length===0)return null;
  const completed=results.filter(row=>row&&row.completed===true);
  const passed=completed.filter(row=>row.success===true),failed=completed.filter(row=>row.success!==true);
  let title=completed.length===1?(passed.length===1?"PASS":"FAIL"):`${passed.length} PASS · ${failed.length} FAIL`;
  let type=failed.length===0?"result-pass":(passed.length===0?"result-fail":"result-mixed");
  const totalDevelopment=completed.reduce((sum,row)=>sum+(Number(row.developmentExp)||0),0);
  const disciplineId=meta.disciplineId;
  const discipline=getShinobiDiscipline(disciplineId);
  const label=String(discipline&&discipline.name||disciplineId||"DISCIPLINE").toUpperCase();
  const first=completed[0]||{},last=completed[completed.length-1]||{};
  const detail=[`+${totalDevelopment} ${label} DEVELOPMENT`];
  const statBefore=Number(first.previousStat),statAfter=Number(last.newStat);
  if(Number.isFinite(statBefore)&&Number.isFinite(statAfter)&&statAfter>statBefore)detail.push(`CURRENT STAT ${statBefore} → ${statAfter}`);
  const beforePL=Number(meta.beforePL&&meta.beforePL.displayedPL),afterPL=Number(meta.afterPL&&meta.afterPL.displayedPL);
  if(Number.isFinite(beforePL)&&Number.isFinite(afterPL)&&afterPL>beforePL)detail.push(`POWER LEVEL ${beforePL} → ${afterPL}`);
  if(meta.stoppedReason==="development_ceiling_reached")detail.push(`FOUNDATION DEVELOPMENT COMPLETE AT STAT ${DEVELOPMENT_CEILING_STAT}`);
  return{
    id:`${serviceId}-result-${characterId}-${disciplineId}-${Date.now()}`,characterId,type,
    significance:"activity-result",title,detail:detail.join(" · "),timestamp:Date.now()
  };
}
function examBatchNotification44800(characterId){return batchNotification("exam",characterId);}
function practicalBatchNotification44800(characterId){return batchNotification("practical",characterId);}
function practicalSpecialNotifications44800(characterId){
  const notifications=[];const batch=practicalBatchNotification44800(characterId);if(batch)notifications.push(batch);
  const results=Array.isArray(KONOHA_PRACTICAL_UI_STATE.lastBatch)?KONOHA_PRACTICAL_UI_STATE.lastBatch:[];
  const first=results.find(row=>row&&row.completed===true)||null;
  const final=[...results].reverse().find(row=>row&&row.completed===true)||null;
  if(first&&final&&Number(final.newStat)>Number(first.previousStat)){
    notifications.push({
      id:`practical-stat-breakthrough-${characterId}-${final.disciplineId}-${Date.now()}`,
      characterId,type:"stat-breakthrough",title:"STAT BREAKTHROUGH",
      detail:`${String(final.disciplineName||final.disciplineId).toUpperCase()} ${Number(first.previousStat)} → ${Number(final.newStat)}`,
      timestamp:Date.now()
    });
  }
  return notifications;
}
function ensureStyles(){
  if(typeof document==="undefined"||document.getElementById(STYLE_ID))return;
  const style=document.createElement("style");style.id=STYLE_ID;
  style.textContent=[
    '.alpha-activity-development-ceiling{display:block;margin-top:4px;font-size:9px;letter-spacing:.09em;color:#7f929a;text-transform:uppercase}',
    '.alpha-activity-discipline.is-development-complete{opacity:.78}',
    '.alpha-activity-discipline.is-development-complete .alpha-activity-development-ceiling{color:#d6a93a}',
    '.alpha-activity-primary[data-development-blocked="true"]{cursor:not-allowed;opacity:.55}'
  ].join("");
  document.head.appendChild(style);
}
function screenData(serviceId){
  try{
    if(serviceId==="exam"&&typeof getKonohaExamUIScreenData==="function")return getKonohaExamUIScreenData();
    if(serviceId==="practical"&&typeof getKonohaPracticalUIScreenData==="function")return getKonohaPracticalUIScreenData();
  }catch(_error){}
  return null;
}
function selectedDiscipline(serviceId){
  return serviceId==="exam"?getKonohaExamSelectedDisciplineId():getKonohaPracticalSelectedDisciplineId();
}
function decorate(serviceId){
  if(typeof document==="undefined")return false;
  ensureStyles();
  const rootNode=document.getElementById("konoha-activity-screen");if(!rootNode)return false;
  const data=screenData(serviceId),session=getKonohaActivityUISessionState();
  if(!data||!session||!session.characterId)return false;
  const buttons=[...rootNode.querySelectorAll(".alpha-activity-discipline")];
  data.disciplines.forEach((row,index)=>{
    const button=buttons[index];if(!button||!row||!row.id)return;
    const p=subjectProjection(session.characterId,row.id);if(!p)return;
    button.dataset.disciplineId=row.id;
    button.classList.toggle("is-development-complete",p.ceilingReached);
    const mastery=button.querySelector(".alpha-activity-mastery");
    const exp=button.querySelector(".alpha-activity-exp");
    const track=button.querySelector(".alpha-activity-discipline-track i");
    if(mastery)mastery.innerHTML=`CURRENT STAT <strong>${p.currentStat}</strong>`;
    if(exp)exp.innerHTML=p.ceilingReached?`DEVELOPMENT <b>COMPLETE</b>`:`DEVELOPMENT <b>${p.exp} / ${p.threshold}</b>`;
    let ceiling=button.querySelector(".alpha-activity-development-ceiling");
    if(!ceiling){
      ceiling=document.createElement("span");ceiling.className="alpha-activity-development-ceiling";
      const trackWrap=button.querySelector(".alpha-activity-discipline-track");
      if(trackWrap)button.insertBefore(ceiling,trackWrap);else button.appendChild(ceiling);
    }
    ceiling.textContent=p.ceilingReached
      ?`FOUNDATION DEVELOPMENT COMPLETE · STAT ${DEVELOPMENT_CEILING_STAT}`
      :`DEVELOPMENT EFFECTIVE THROUGH STAT ${DEVELOPMENT_CEILING_STAT}`;
    if(track)track.style.width=`${p.ceilingReached?100:p.progressPercent}%`;
  });
  const selected=selectedDiscipline(serviceId),projection=subjectProjection(session.characterId,selected);
  const primary=rootNode.querySelector(".alpha-activity-primary");
  if(primary&&projection){
    const blocked=projection.ceilingReached===true;
    primary.disabled=blocked;
    primary.dataset.developmentBlocked=blocked?"true":"false";
    primary.textContent=blocked?"DEVELOPMENT COMPLETE":(serviceId==="exam"?"BEGIN EXAM":"BEGIN TRAINING");
    primary.title=blocked?`Academy Foundation development is effective through Stat ${DEVELOPMENT_CEILING_STAT}. Harder development routes can progress this discipline later.`:"";
  }
  return true;
}
function examRender44800(){const result=priorExamRender?priorExamRender.apply(this,arguments):false;decorate("exam");return result;}
function practicalRender44800(){const result=priorPracticalRender?priorPracticalRender.apply(this,arguments):false;decorate("practical");return result;}

function diagnostics(){
  const curve=[1,10,11,20,21,100].map(stat=>[stat,thresholdForStat(stat)]);
  const exactCurve=JSON.stringify(curve)===JSON.stringify([[1,10],[10,10],[11,15],[20,15],[21,20],[100,55]]);
  const checks={
    curveIdExact:CURVE_ID==="discipline_stat_curve_v1",
    profileIdExact:PROFILE_ID==="academy_foundation_discipline_activity_v1",
    dynamicCurveExact:exactCurve,
    foundationCeilingExact:DEVELOPMENT_CEILING_STAT===15,
    registeredActivitiesExact:JSON.stringify(SUPPORTED_SERVICES)===JSON.stringify(["exam","practical"]),
    actionDerivedLaw:executeFoundationAttempt.toString().includes("resolution.passed===true?2:1"),
    numericMasteryRetired:executeFoundationAttempt.toString().includes("context.disciplineLevel=1"),
    exactCurrentPLStatsOnly:exactDevelopedStats44800.toString().includes("exactStats(character)"),
    noTechniquePracticeWriter:!String(commitDevelopment).includes("techniquePractice"),
    staleTeamGuard:commitDevelopment.toString().includes("stale_team_assignment"),
    currentTeamGuard:preflight.toString().includes("subject_not_in_committed_current_team"),
    sequentialBreakthroughs:commitDevelopment.toString().includes("while((Number(id.character.stats[disciplineId])||0)<DEVELOPMENT_CEILING_STAT)"),
    overflowPreserved:commitDevelopment.toString().includes("progression.exp-=threshold"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,curve,profile:{profileId:PROFILE_ID,developmentCeilingStat:DEVELOPMENT_CEILING_STAT,registeredActivities:[...SUPPORTED_SERVICES]},browserGoldenClaimed:false};
}

// Restore/seed canonical persistent Current Stats before replacing partial-EXP PL.
migrateOrRehydrateAll();

if(priorDevelopedStats){
  globalThis.getDevelopedCharacterStats=exactDevelopedStats44800;
  try{getDevelopedCharacterStats=exactDevelopedStats44800;}catch(_error){}
}
if(priorExamAttempt){
  globalThis.executeKonohaExamAttempt=executeExamAttempt44800;
  try{executeKonohaExamAttempt=executeExamAttempt44800;}catch(_error){}
}
if(priorPracticalAttempt){
  globalThis.executeKonohaPracticalAttempt=executePracticalAttempt44800;
  try{executeKonohaPracticalAttempt=executePracticalAttempt44800;}catch(_error){}
}
if(priorExamBatch){
  globalThis.executeKonohaExamBatch=executeExamBatch44800;
  try{executeKonohaExamBatch=executeExamBatch44800;}catch(_error){}
}
if(priorPracticalTraining){
  globalThis.executeKonohaPracticalTraining=executePracticalTraining44800;
  try{executeKonohaPracticalTraining=executePracticalTraining44800;}catch(_error){}
}
if(priorExamBatchNotification){
  globalThis.buildKonohaExamBatchResultNotification=examBatchNotification44800;
  try{buildKonohaExamBatchResultNotification=examBatchNotification44800;}catch(_error){}
}
if(priorPracticalBatchNotification){
  globalThis.buildKonohaPracticalBatchResultNotification=practicalBatchNotification44800;
  try{buildKonohaPracticalBatchResultNotification=practicalBatchNotification44800;}catch(_error){}
}
if(priorPracticalSpecialNotifications){
  globalThis.buildKonohaPracticalSpecialNotifications=practicalSpecialNotifications44800;
  try{buildKonohaPracticalSpecialNotifications=practicalSpecialNotifications44800;}catch(_error){}
}
if(priorExamRender){
  globalThis.renderKonohaExamVisualScreen=examRender44800;
  try{renderKonohaExamVisualScreen=examRender44800;}catch(_error){}
}
if(priorPracticalRender){
  globalThis.renderKonohaPracticalVisualScreen=practicalRender44800;
  try{renderKonohaPracticalVisualScreen=practicalRender44800;}catch(_error){}
}

globalThis.getDisciplineStatThreshold44800=thresholdForStat;
globalThis.getDisciplineDevelopmentProjection44800=subjectProjection;
globalThis.preflightFoundationDisciplineDevelopment44800=preflight;
globalThis.commitFoundationDisciplineDevelopment44800=commitDevelopment;
globalThis.rehydratePersistentDisciplineStats44800=migrateOrRehydrateAll;
globalThis.runPhase2DisciplineDevelopment44800Diagnostics=diagnostics;
globalThis.SC_PHASE2_DISCIPLINE_DEVELOPMENT_44800=Object.freeze({
  patchId:PATCH_ID,curveId:CURVE_ID,profileId:PROFILE_ID,
  developmentCeilingStat:DEVELOPMENT_CEILING_STAT,registeredActivities:Object.freeze([...SUPPORTED_SERVICES]),
  browserGoldenClaimed:false
});
})();
