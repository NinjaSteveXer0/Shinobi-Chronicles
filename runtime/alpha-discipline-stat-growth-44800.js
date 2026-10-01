// ============================================================================
// PHASE 2 — DISCIPLINE DEVELOPMENT -> PERSISTENT CURRENT STAT GROWTH — #448
//
// Binding authority:
// Documentation/Progression/Phase 2 Discipline Development to Persistent Stat Growth Trial Contract 2026-10-01.md
//
// This module consumes the existing discipline ledger and PL/Registry Current
// Stat authority. It does not create a second Stats store or direct PL reward.
// ============================================================================
(function installPhase2DisciplineStatGrowth44800(){
"use strict";
if(globalThis.SC_PHASE2_DISCIPLINE_STAT_GROWTH_44800)return;

const PATCH_ID="phase2_discipline_stat_growth_44800_2026_10_02";
const CURVE_ID="discipline_stat_curve_v1";
const FOUNDATION_PROFILE_ID="academy_foundation_discipline_activity_v1";
const FOUNDATION_CEILING=15;
const FOUNDATION_ACTION_EXP=2; // effective execution under the existing +1/+2/+3 law
const DISCIPLINES=Object.freeze(["nin","tai","gen","buki","fuin","kin","stamina"]);
const FOUNDATION_SOURCES=Object.freeze(new Set(["exam","practical"]));
const lastResultBySubjectDiscipline=new Map();

const priorDeveloped=typeof globalThis.getDevelopedCharacterStats==="function"?globalThis.getDevelopedCharacterStats:null;
const priorTrainingData=typeof globalThis.getTrainingActionData==="function"?globalThis.getTrainingActionData:null;
const priorActivityData=typeof globalThis.getKonohaCharacterActivityData==="function"?globalThis.getKonohaCharacterActivityData:null;
const priorPanelData=typeof globalThis.getKonohaDisciplineUIPanelData==="function"?globalThis.getKonohaDisciplineUIPanelData:null;
const priorPerform=typeof globalThis.performDisciplineTraining==="function"?globalThis.performDisciplineTraining:null;
const priorExamBatch=typeof globalThis.executeKonohaExamBatch==="function"?globalThis.executeKonohaExamBatch:null;
const priorPracticalBatch=typeof globalThis.executeKonohaPracticalTraining==="function"?globalThis.executeKonohaPracticalTraining:null;
const priorExamData=typeof globalThis.getKonohaExamUIScreenData==="function"?globalThis.getKonohaExamUIScreenData:null;
const priorPracticalData=typeof globalThis.getKonohaPracticalUIScreenData==="function"?globalThis.getKonohaPracticalUIScreenData:null;
const priorRows=typeof globalThis.renderAlphaActivityDisciplineRows==="function"?globalThis.renderAlphaActivityDisciplineRows:null;
const priorPracticalNotifications=typeof globalThis.buildKonohaPracticalSpecialNotifications==="function"?globalThis.buildKonohaPracticalSpecialNotifications:null;
const priorRestore=typeof globalThis.syncCharacterProgressionFromSave==="function"?globalThis.syncCharacterProgressionFromSave:null;

function clone(value){try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}catch(_error){return value;}}
function currentPlayerData(){return typeof playerData!=="undefined"&&playerData?playerData:null;}
function runtimeTeam(){return typeof playerTeam!=="undefined"&&Array.isArray(playerTeam)?playerTeam:[];}
function history(){
  if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory))return activityHistory;
  const pd=currentPlayerData();
  if(pd&&!Array.isArray(pd.activityHistory))pd.activityHistory=[];
  return pd&&Array.isArray(pd.activityHistory)?pd.activityHistory:[];
}
function safeId(value){return String(value||"").replace(/[^a-zA-Z0-9_.:-]+/g,"_");}
function getCharacter(characterId){return typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(characterId):null;}
function getRegistryId(characterOrId){
  if(typeof globalThis.getCharacterRegistryId==="function")return globalThis.getCharacterRegistryId(characterOrId);
  if(characterOrId&&typeof characterOrId==="object")return characterOrId.registryId||characterOrId.id||null;
  return characterOrId||null;
}
function ownedRecordFor(character){
  const registryId=getRegistryId(character);
  if(!registryId||typeof globalThis.getOwnedCharacterRecordByVariantId!=="function")return null;
  return globalThis.getOwnedCharacterRecordByVariantId(registryId);
}
function stableSubject(characterId){
  const character=getCharacter(characterId);if(!character)return null;
  const registryId=getRegistryId(character);
  const owned=ownedRecordFor(character);
  return{
    character,
    registryId,
    ownedCharacterId:owned&&owned.ownedCharacterId?owned.ownedCharacterId:null,
    progressionCharacterId:owned&&owned.progressionCharacterId?owned.progressionCharacterId:character.id
  };
}
function currentTeam(){
  if(typeof globalThis.getChronicleCurrentTeam43600!=="function")return null;
  const team=globalThis.getChronicleCurrentTeam43600();
  return team&&team.committed===true&&Array.isArray(team.teamVariantIds)?team:null;
}
function subjectIsCurrentTeam(characterId){
  const team=currentTeam();if(!team)return true;
  const subject=stableSubject(characterId);if(!subject)return false;
  return team.teamVariantIds.includes(subject.registryId);
}
function thresholdForStat(stat){
  const value=Math.max(1,Math.floor(Number(stat)||1));
  return 5+(5*Math.ceil(value/10));
}
function currentStat(characterId,disciplineId){
  const character=getCharacter(characterId);
  return character&&character.stats?Math.max(0,Number(character.stats[disciplineId])||0):0;
}
function progression(characterId,disciplineId){
  if(typeof globalThis.getCharacterDisciplineProgression!=="function")return null;
  const row=globalThis.getCharacterDisciplineProgression(characterId,disciplineId);
  if(!row)return null;
  row.exp=Math.max(0,Math.floor(Number(row.exp)||0));
  row.curveId=CURVE_ID;
  row.schemaVersion=Math.max(2,Number(row.schemaVersion)||0);
  return row;
}
function exactStats(character){
  const out={};
  for(const id of DISCIPLINES)out[id]=Math.max(0,Number(character&&character.stats&&character.stats[id])||0);
  return out;
}
function currentPL(character){
  return typeof globalThis.calculateCurrentPL==="function"?globalThis.calculateCurrentPL(character):null;
}
function rawPL(character){
  return typeof globalThis.calculateRawPLFromStats==="function"?globalThis.calculateRawPLFromStats(exactStats(character)):null;
}
function foundationSource(source){return FOUNDATION_SOURCES.has(String(source||""));}
function foundationSnapshot(characterId,disciplineId,source){
  const subject=stableSubject(characterId);
  if(!subject)return{allowed:false,reason:"persistent_subject_missing"};
  if(!DISCIPLINES.includes(disciplineId))return{allowed:false,reason:"invalid_discipline"};
  if(foundationSource(source)){
    const team=currentTeam();
    if(team&&!team.teamVariantIds.includes(subject.registryId))return{allowed:false,reason:"subject_not_in_committed_current_team"};
    if(team&&!subject.ownedCharacterId)return{allowed:false,reason:"stable_owned_character_identity_missing"};
    const stat=currentStat(characterId,disciplineId);
    if(stat>=FOUNDATION_CEILING)return{
      allowed:false,reason:"activity_development_ceiling_reached",currentStat:stat,
      developmentCeilingStat:FOUNDATION_CEILING,activityProfileId:FOUNDATION_PROFILE_ID
    };
  }
  return{
    allowed:true,
    characterId:subject.character.id,
    registryId:subject.registryId,
    ownedCharacterId:subject.ownedCharacterId,
    progressionCharacterId:subject.progressionCharacterId,
    currentStat:currentStat(characterId,disciplineId),
    teamAssignmentId:currentTeam()?.assignmentId||null,
    developmentCeilingStat:foundationSource(source)?FOUNDATION_CEILING:null,
    activityProfileId:foundationSource(source)?FOUNDATION_PROFILE_ID:null
  };
}
function snapshot(characterId,disciplineId,source=null){
  const subject=stableSubject(characterId),row=progression(characterId,disciplineId);
  if(!subject||!row)return null;
  const stat=currentStat(characterId,disciplineId),threshold=thresholdForStat(stat);
  const ceiling=foundationSource(source)?FOUNDATION_CEILING:null;
  return{
    characterId:subject.character.id,registryId:subject.registryId,
    ownedCharacterId:subject.ownedCharacterId,progressionCharacterId:subject.progressionCharacterId,
    disciplineId,currentStat:stat,developmentExp:row.exp,developmentRequired:threshold,
    developmentRemaining:Math.max(0,threshold-row.exp),
    progressPercent:threshold>0?Math.max(0,Math.min(100,(row.exp/threshold)*100)):0,
    curveId:CURVE_ID,activityProfileId:foundationSource(source)?FOUNDATION_PROFILE_ID:null,
    developmentCeilingStat:ceiling,developmentAvailable:ceiling==null||stat<ceiling,
    ceilingReached:ceiling!=null&&stat>=ceiling,currentPL:currentPL(subject.character)
  };
}
function existingById(id){return history().find(row=>row&&(row.receiptId===id||row.id===id))||null;}
function causalGranted(stableId,disciplineId,causalRootId){
  return history().filter(row=>row&&row.type==="discipline_development"&&row.stableCharacterId===stableId&&row.disciplineId===disciplineId&&row.causalRootId===causalRootId)
    .reduce((sum,row)=>sum+Math.max(0,Number(row.grantedExp)||0),0);
}
function pushHistory(row){history().push(row);return row;}
function breakthroughReceiptId(stableId,disciplineId,priorStat,transactionId){
  return "breakthrough::"+safeId(stableId)+"::"+disciplineId+"::"+priorStat+"::"+CURVE_ID+"::"+safeId(transactionId);
}
function ceilingReceiptId(stableId,disciplineId){
  return "development_ceiling::"+safeId(stableId)+"::"+disciplineId+"::"+FOUNDATION_PROFILE_ID+"::"+FOUNDATION_CEILING;
}
function resolveBreakthroughs(characterId,disciplineId,{transactionId,sourceDevelopmentReceiptRefs=[]}={}){
  const subject=stableSubject(characterId),row=progression(characterId,disciplineId);
  if(!subject||!row)return{breakthroughs:[],statPointsGained:0};
  const stableId=subject.ownedCharacterId||subject.progressionCharacterId;
  const breakthroughs=[];
  let statPointsGained=0;
  while(true){
    const beforeStat=currentStat(characterId,disciplineId);
    const threshold=thresholdForStat(beforeStat);
    if(row.exp<threshold)break;
    const expBefore=row.exp;
    const plBefore=currentPL(subject.character);
    row.exp-=threshold;
    subject.character.stats[disciplineId]=beforeStat+1;
    const plAfter=currentPL(subject.character);
    const receiptId=breakthroughReceiptId(stableId,disciplineId,beforeStat,transactionId||"compat");
    if(!existingById(receiptId)){
      const receipt={
        type:"discipline_stat_breakthrough",receiptType:"discipline_stat_breakthrough",receiptId,
        stableCharacterId:stableId,ownedCharacterId:subject.ownedCharacterId||null,
        progressionCharacterId:subject.progressionCharacterId,representationVariantId:subject.registryId,
        disciplineId,curveId:CURVE_ID,priorStat:beforeStat,newStat:beforeStat+1,thresholdConsumed:threshold,
        expBeforeThresholdConsumption:expBefore,expRemainingAfter:row.exp,
        sourceDevelopmentReceiptRefs:[...sourceDevelopmentReceiptRefs],
        currentPLBefore:plBefore,currentPLAfter:plAfter,commitState:"committed",timestamp:Date.now()
      };
      pushHistory(receipt);breakthroughs.push(receipt);
    }
    statPointsGained+=1;
  }
  return{breakthroughs,statPointsGained,currentStat:currentStat(characterId,disciplineId),remainingExp:row.exp};
}
function commitDevelopment(characterId,disciplineId,requestedExp,metadata={}){
  const source=String(metadata.source||"unknown");
  const preflight=foundationSnapshot(characterId,disciplineId,source);
  if(!preflight.allowed)return{success:false,committed:false,...preflight};
  if(metadata.teamAssignmentId&&currentTeam()?.assignmentId!==metadata.teamAssignmentId)return{success:false,committed:false,reason:"stale_team_assignment"};
  const subject=stableSubject(characterId),row=progression(characterId,disciplineId);
  if(!subject||!row)return{success:false,committed:false,reason:"progression_missing"};
  const stableId=subject.ownedCharacterId||subject.progressionCharacterId;
  const amount=Math.max(0,Math.floor(Number(requestedExp)||0));
  if(amount<=0)return{success:false,committed:false,reason:"invalid_development_exp"};
  const sourceOccurrenceId=String(metadata.sourceOccurrenceId||("activity::"+source+"::"+Date.now()+"::"+Math.random().toString(36).slice(2,8)));
  const progressionSlotId=String(metadata.progressionSlotId||disciplineId);
  const receiptId=String(metadata.receiptId||("development::"+safeId(stableId)+"::"+safeId(sourceOccurrenceId)+"::"+safeId(progressionSlotId)+"::"+disciplineId));
  const duplicate=existingById(receiptId);
  if(duplicate)return{success:true,committed:false,duplicate:true,receipt:clone(duplicate),snapshot:snapshot(characterId,disciplineId,source)};
  const causalRootId=String(metadata.causalRootId||sourceOccurrenceId);
  const used=source==="battle"?0:causalGranted(stableId,disciplineId,causalRootId);
  const cap=source==="battle"?Infinity:3;
  const granted=Math.max(0,Math.min(amount,cap-used));
  if(granted<=0)return{success:true,committed:false,duplicate:false,reason:"causal_cap_reached",requestedExp:amount,grantedExp:0,snapshot:snapshot(characterId,disciplineId,source)};

  const statBefore=exactStats(subject.character),progressionBefore=clone(row),historyLength=history().length;
  const plBefore=currentPL(subject.character),expBefore=row.exp;
  try{
    row.exp+=granted;
    const developmentReceipt={
      type:"discipline_development",receiptId,stableCharacterId:stableId,ownedCharacterId:subject.ownedCharacterId||null,
      progressionCharacterId:subject.progressionCharacterId,representationVariantId:subject.registryId,
      sourceOccurrenceId,progressionSlotId,causalRootId,disciplineId,
      developmentClass:String(metadata.developmentClass||"effective_execution"),
      requestedExp:amount,grantedExp:granted,activityId:metadata.activityId||source,
      activityProfileId:foundationSource(source)?FOUNDATION_PROFILE_ID:(metadata.activityProfileId||null),
      developmentCeilingStat:foundationSource(source)?FOUNDATION_CEILING:(metadata.developmentCeilingStat??null),
      curveId:CURVE_ID,commitState:"committed",timestamp:Date.now()
    };
    pushHistory(developmentReceipt);
    const resolved=resolveBreakthroughs(characterId,disciplineId,{transactionId:receiptId,sourceDevelopmentReceiptRefs:[receiptId]});
    const reached=foundationSource(source)&&currentStat(characterId,disciplineId)>=FOUNDATION_CEILING;
    if(reached){
      const ceilingId=ceilingReceiptId(stableId,disciplineId);
      if(!existingById(ceilingId))pushHistory({
        type:"activity_development_ceiling_reached",receiptType:"activity_development_ceiling_reached",receiptId:ceilingId,
        stableCharacterId:stableId,ownedCharacterId:subject.ownedCharacterId||null,progressionCharacterId:subject.progressionCharacterId,
        representationVariantId:subject.registryId,disciplineId,activityProfileId:FOUNDATION_PROFILE_ID,
        developmentCeilingStat:FOUNDATION_CEILING,sourceDevelopmentReceiptRef:receiptId,commitState:"committed",timestamp:Date.now()
      });
    }
    if(typeof globalThis.savePlayerData==="function")globalThis.savePlayerData();
    const result={
      success:true,committed:true,duplicate:false,receipt:clone(developmentReceipt),requestedExp:amount,grantedExp:granted,
      expBefore,expAfter:row.exp,statBefore:statBefore[disciplineId],statAfter:currentStat(characterId,disciplineId),
      statPointsGained:resolved.statPointsGained,breakthroughs:clone(resolved.breakthroughs),
      currentPLBefore:plBefore,currentPLAfter:currentPL(subject.character),snapshot:snapshot(characterId,disciplineId,source)
    };
    lastResultBySubjectDiscipline.set(subject.character.id+"::"+disciplineId,result);
    return result;
  }catch(error){
    subject.character.stats={...subject.character.stats,...statBefore};
    Object.keys(row).forEach(key=>delete row[key]);Object.assign(row,progressionBefore);
    history().splice(historyLength);
    return{success:false,committed:false,reason:"atomic_persistence_failed",error:String(error&&error.message||error)};
  }
}
function addDisciplineExp448(characterId,disciplineId,amount,source){
  const requested=foundationSource(source)?FOUNDATION_ACTION_EXP:Math.max(0,Math.floor(Number(amount)||0));
  const preflight=foundationSnapshot(characterId,disciplineId,source);
  if(!preflight.allowed)return false;
  const result=commitDevelopment(characterId,disciplineId,requested,{
    source,activityId:source,activityProfileId:preflight.activityProfileId,
    teamAssignmentId:preflight.teamAssignmentId,developmentClass:"effective_execution"
  });
  return !!result.success;
}
function processCompatibility(characterId,disciplineId){
  const subject=stableSubject(characterId),row=progression(characterId,disciplineId);if(!subject||!row)return null;
  const before=currentStat(characterId,disciplineId);
  const resolved=resolveBreakthroughs(characterId,disciplineId,{transactionId:"compat::"+Date.now(),sourceDevelopmentReceiptRefs:[]});
  if(resolved.statPointsGained>0&&typeof globalThis.savePlayerData==="function")globalThis.savePlayerData();
  return{levelsGained:resolved.statPointsGained,level:row.level||1,exp:row.exp,expToNext:thresholdForStat(currentStat(characterId,disciplineId)),statPointsGained:resolved.statPointsGained,stat:currentStat(characterId,disciplineId),previousStat:before};
}
function noLegacyPendingGrowth(characterId,disciplineId){
  return{statPointsGained:0,stat:currentStat(characterId,disciplineId),statLevelApplied:progression(characterId,disciplineId)?.statLevelApplied??1};
}
function exactDevelopedStats(character){return exactStats(character);}
function trainingData448(characterId,disciplineId){
  const base=priorTrainingData?priorTrainingData(characterId,disciplineId):null;
  const snap=snapshot(characterId,disciplineId,base?.trainingSource||null);
  if(!base||!snap)return base;
  return{...base,trainingLevel:base.trainingLevel,exp:snap.developmentExp,expToNext:snap.developmentRequired,naturalStat:snap.currentStat,
    currentStat:snap.currentStat,curveId:CURVE_ID,developmentCeilingStat:snap.developmentCeilingStat,developmentAvailable:snap.developmentAvailable,
    ownedCharacterId:snap.ownedCharacterId,progressionCharacterId:snap.progressionCharacterId};
}
function activityData448(activityId,characterId){
  const base=priorActivityData?priorActivityData(activityId,characterId):null;if(!base)return base;
  const source=activityId==="exam"?"exam":activityId==="practical"?"practical":null;
  return{...base,disciplines:(base.disciplines||[]).map(row=>{
    const snap=snapshot(characterId,row.id,source);
    return snap?{...row,characterId,exp:snap.developmentExp,expRequired:snap.developmentRequired,currentStat:snap.currentStat,
      developmentCeilingStat:snap.developmentCeilingStat,developmentAvailable:snap.developmentAvailable,curveId:CURVE_ID}:row;
  })};
}
function panelData448(discipline){
  if(!discipline||!discipline.characterId)return priorPanelData?priorPanelData(discipline):null;
  const source=discipline.id==="kin"?null:(getShinobiDiscipline(discipline.id)?.trainingSource||null);
  const snap=snapshot(discipline.characterId,discipline.id,source);
  if(!snap)return priorPanelData?priorPanelData(discipline):null;
  return{
    id:discipline.id,name:discipline.name,level:Number(getCharacterDisciplineProgression(discipline.characterId,discipline.id)?.level)||1,
    exp:snap.developmentExp,expRequired:snap.developmentRequired,expRemaining:snap.developmentRemaining,
    progressPercent:snap.progressPercent,rewardExp:foundationSource(source)?FOUNDATION_ACTION_EXP:(Number(discipline.rewardExp)||0),
    currentStat:snap.currentStat,curveId:CURVE_ID,developmentCeilingStat:snap.developmentCeilingStat,
    developmentAvailable:snap.developmentAvailable,ceilingReached:snap.ceilingReached
  };
}
function rows448(data,selectedId,serviceId){
  if(!data||!Array.isArray(data.disciplines))return priorRows?priorRows(data,selectedId,serviceId):"";
  const selectFn=serviceId==="exams"?"selectKonohaExamDiscipline":"selectKonohaPracticalDiscipline";
  return data.disciplines.map(d=>{
    const complete=d.developmentAvailable===false;
    const ceiling=d.developmentCeilingStat!=null
      ?(complete?"STAT DEVELOPMENT COMPLETE FOR THIS ACTIVITY":"DEVELOPMENT EFFECTIVE THROUGH STAT "+d.developmentCeilingStat)
      :"";
    return `<button type="button" class="alpha-activity-discipline ${d.id===selectedId?"is-selected":""}" data-discipline-id="${d.id}" onclick="${selectFn}('${d.id}')" aria-pressed="${d.id===selectedId}">
      <span class="alpha-activity-discipline-name">${d.name}</span>
      <span class="alpha-activity-mastery">CURRENT STAT <strong>${Number(d.currentStat)||0}</strong></span>
      <span class="alpha-activity-exp">DEVELOPMENT <b>${Number(d.exp)||0} / ${Number(d.expRequired)||0}</b></span>
      ${ceiling?`<span class="alpha-activity-development-ceiling ${complete?"is-complete":""}">${ceiling}</span>`:""}
      <span class="alpha-activity-discipline-track"><i style="width:${Math.max(0,Math.min(100,Number(d.progressPercent)||0))}%"></i></span>
    </button>`;
  }).join("");
}
function selectedDevelopmentAvailable(serviceId,data){
  const id=serviceId==="exams"&&typeof getKonohaExamSelectedDisciplineId==="function"?getKonohaExamSelectedDisciplineId()
    :serviceId==="practical"&&typeof getKonohaPracticalSelectedDisciplineId==="function"?getKonohaPracticalSelectedDisciplineId():null;
  const row=data&&Array.isArray(data.disciplines)?data.disciplines.find(d=>d&&d.id===id):null;
  return !row||row.developmentAvailable!==false;
}
function examData448(){
  const data=priorExamData?priorExamData.apply(this,arguments):null;
  if(data)data.canExecute=data.canExecute===true&&selectedDevelopmentAvailable("exams",data);
  return data;
}
function practicalData448(){
  const data=priorPracticalData?priorPracticalData.apply(this,arguments):null;
  if(data)data.canExecute=data.canExecute===true&&selectedDevelopmentAvailable("practical",data);
  return data;
}
function perform448(characterId,disciplineId,source,options={}){
  const pre=foundationSnapshot(characterId,disciplineId,source);if(!pre.allowed)return{success:false,reason:pre.reason,...pre};
  if(!priorPerform)return{success:false,reason:"training_runtime_missing"};
  return priorPerform(characterId,disciplineId,source,{...options,expOverride:foundationSource(source)?FOUNDATION_ACTION_EXP:options.expOverride});
}
function examBatch448(characterId,disciplineId,batchSize=1){
  if(!priorExamBatch)return[];
  const requested=[1,5,10].includes(Number(batchSize))?Number(batchSize):1;
  const state=typeof KONOHA_EXAM_ATTEMPT_STATE!=="undefined"?KONOHA_EXAM_ATTEMPT_STATE:null;
  const character=getCharacter(characterId);if(!character||!state)return priorExamBatch(characterId,disciplineId,batchSize);
  const beforePL=getCharacterPLProgress(character),results=[];
  for(let i=0;i<requested;i++){
    const pre=foundationSnapshot(characterId,disciplineId,"exam");if(!pre.allowed)break;
    const result=executeKonohaExamAttempt(characterId,disciplineId);results.push(result);
    if(!result||result.completed!==true)break;
  }
  const afterPL=getCharacterPLProgress(character);
  state.lastBatch=results;state.lastBatchMeta={characterId,disciplineId,requestedBatchSize:requested,
    completedAttempts:results.filter(r=>r&&r.completed===true).length,stoppedAtCeiling:foundationSnapshot(characterId,disciplineId,"exam").reason==="activity_development_ceiling_reached",
    beforePL:{rawPL:beforePL.rawPL,displayedPL:beforePL.displayedPL,nextPL:beforePL.nextPL,progressPercent:beforePL.progressPercent},
    afterPL:{rawPL:afterPL.rawPL,displayedPL:afterPL.displayedPL,nextPL:afterPL.nextPL,progressPercent:afterPL.progressPercent}};
  recordKonohaExamSpecialNotifications(characterId);return results;
}
function practicalBatch448(){
  if(!priorPracticalBatch)return{success:false,reason:"practical_runtime_missing"};
  const session=getKonohaActivityUISessionState();if(!session||!session.characterId)return{success:false,reason:"No selected character."};
  const characterId=session.characterId,disciplineId=getKonohaPracticalSelectedDisciplineId(),requested=getKonohaPracticalBatchSize();
  const state=getKonohaPracticalAttemptState(),character=getCharacter(characterId);
  if(!state||!character)return priorPracticalBatch.apply(this,arguments);
  clearKonohaPracticalResultPresentation(false);
  const beforePL=getCharacterPLProgress(character),results=[];let successfulAttempts=0,failedAttempts=0;
  for(let i=0;i<requested;i++){
    const pre=foundationSnapshot(characterId,disciplineId,"practical");if(!pre.allowed)break;
    const result=executeKonohaPracticalAttempt(characterId,disciplineId);results.push(result);
    if(!result||result.completed!==true){failedAttempts++;break;}
    if(result.success===true)successfulAttempts++;else failedAttempts++;
  }
  const afterPL=getCharacterPLProgress(character);
  state.lastBatch=results;state.lastBatchMeta={characterId,disciplineId,requestedBatchSize:requested,completedAttempts:results.length,
    successfulAttempts,failedAttempts,stoppedAtCeiling:foundationSnapshot(characterId,disciplineId,"practical").reason==="activity_development_ceiling_reached",
    beforePL:{rawPL:beforePL.rawPL,displayedPL:beforePL.displayedPL,nextPL:beforePL.nextPL,progressPercent:beforePL.progressPercent},
    afterPL:{rawPL:afterPL.rawPL,displayedPL:afterPL.displayedPL,nextPL:afterPL.nextPL,progressPercent:afterPL.progressPercent}};
  state.resultVisible=false;recordKonohaPracticalSpecialNotifications(characterId);renderKonohaPracticalVisualScreen();
  return{success:successfulAttempts>0,characterId,disciplineId,requestedAttempts:requested,completedAttempts:results.length,successfulAttempts,failedAttempts,results};
}
function practicalNotifications448(characterId){
  const state=getKonohaPracticalAttemptState(),notifications=[];
  const batch=typeof buildKonohaPracticalBatchResultNotification==="function"?buildKonohaPracticalBatchResultNotification(characterId):null;
  if(batch)notifications.push(batch);
  const results=state&&Array.isArray(state.lastBatch)?state.lastBatch.filter(r=>r&&r.success===true):[];
  const gained=results.reduce((sum,row)=>sum+Math.max(0,Number(row.statPointsGained)||0),0);
  if(gained>0){
    const first=results[0],last=results[results.length-1];
    notifications.push({id:"practical-stat-"+characterId+"-"+(state.lastBatchMeta?.disciplineId||"unknown")+"-"+Date.now(),
      characterId,type:"stat-breakthrough",title:"CURRENT STAT INCREASED",
      detail:String(last?.disciplineName||state.lastBatchMeta?.disciplineId||"DISCIPLINE").toUpperCase()+" "+(Number(first?.previousStat)||0)+" → "+(Number(last?.newStat)||0),timestamp:Date.now()});
  }
  return notifications;
}
function restoreCanonicalStats448(){
  const pd=currentPlayerData();if(!pd||!pd.characters)return false;
  let changed=false;
  for(const character of runtimeTeam()){
    if(!character||!character.id)continue;
    const saved=pd.characters[character.id]||pd.characters[getRegistryId(character)];
    if(!saved||!saved.stats)continue;
    character.stats=character.stats||{};
    for(const id of DISCIPLINES){
      if(Number.isFinite(Number(saved.stats[id]))){
        const value=Number(saved.stats[id]);if(character.stats[id]!==value){character.stats[id]=value;changed=true;}
      }
    }
    if(saved.disciplineProgression&&typeof globalThis.normalizeDisciplineProgression==="function")character.disciplineProgression=globalThis.normalizeDisciplineProgression(saved.disciplineProgression);
    character.permanentPLBonus=0;
    if(saved.weaponSpecializations)character.weaponSpecializations=clone(saved.weaponSpecializations);
  }
  return changed;
}
function migrateExistingLedgers448(){
  let changed=restoreCanonicalStats448();
  for(const character of runtimeTeam()){
    if(!character||!character.id)continue;
    for(const id of DISCIPLINES){
      const row=progression(character.id,id);if(!row)continue;
      if(row.curveMigrationResolved===CURVE_ID)continue;
      const resolved=resolveBreakthroughs(character.id,id,{transactionId:"migration::"+CURVE_ID+"::"+character.id+"::"+id,sourceDevelopmentReceiptRefs:[]});
      row.curveMigrationResolved=CURVE_ID;changed=true;
      if(resolved.statPointsGained>0)changed=true;
    }
  }
  if(changed&&typeof globalThis.savePlayerData==="function")globalThis.savePlayerData();
  return changed;
}
function injectStyles(){
  if(typeof document==="undefined"||document.getElementById("sc-phase2-discipline-growth-44800"))return;
  const style=document.createElement("style");style.id="sc-phase2-discipline-growth-44800";
  style.textContent='.alpha-activity-development-ceiling{display:block;margin-top:5px;font-size:10px;letter-spacing:.08em;opacity:.72}.alpha-activity-development-ceiling.is-complete{opacity:1;font-weight:700}.alpha-activity-discipline .alpha-activity-exp{display:block}';
  document.head.appendChild(style);
}

// Register the Foundation reward values on the explicit existing activities only.
for(const activityId of ["exam","practical"]){
  try{
    const activity=typeof globalThis.getActivityData==="function"?globalThis.getActivityData(activityId):null;
    if(activity&&Array.isArray(activity.rewards))for(const reward of activity.rewards)if(reward&&reward.type==="discipline")reward.amount=FOUNDATION_ACTION_EXP;
  }catch(_error){}
}

// Replace fossil semantics with the Phase-2 v1 transaction while preserving old function names for callers.
globalThis.getDevelopedCharacterStats=exactDevelopedStats;try{getDevelopedCharacterStats=exactDevelopedStats;}catch(_error){}
globalThis.getTrainingActionData=trainingData448;try{getTrainingActionData=trainingData448;}catch(_error){}
globalThis.getKonohaCharacterActivityData=activityData448;try{getKonohaCharacterActivityData=activityData448;}catch(_error){}
globalThis.getKonohaDisciplineUIPanelData=panelData448;try{getKonohaDisciplineUIPanelData=panelData448;}catch(_error){}
globalThis.renderAlphaActivityDisciplineRows=rows448;try{renderAlphaActivityDisciplineRows=rows448;}catch(_error){}
globalThis.getKonohaExamUIScreenData=examData448;try{getKonohaExamUIScreenData=examData448;}catch(_error){}
globalThis.getKonohaPracticalUIScreenData=practicalData448;try{getKonohaPracticalUIScreenData=practicalData448;}catch(_error){}
globalThis.addDisciplineExp=addDisciplineExp448;try{addDisciplineExp=addDisciplineExp448;}catch(_error){}
globalThis.processDisciplineLevelUps=processCompatibility;try{processDisciplineLevelUps=processCompatibility;}catch(_error){}
globalThis.applyPendingDisciplineStatGrowth=noLegacyPendingGrowth;try{applyPendingDisciplineStatGrowth=noLegacyPendingGrowth;}catch(_error){}
if(priorPerform){globalThis.performDisciplineTraining=perform448;try{performDisciplineTraining=perform448;}catch(_error){}}
if(priorExamBatch){globalThis.executeKonohaExamBatch=examBatch448;try{executeKonohaExamBatch=examBatch448;}catch(_error){}}
if(priorPracticalBatch){globalThis.executeKonohaPracticalTraining=practicalBatch448;try{executeKonohaPracticalTraining=practicalBatch448;}catch(_error){}}
if(priorPracticalNotifications){globalThis.buildKonohaPracticalSpecialNotifications=practicalNotifications448;try{buildKonohaPracticalSpecialNotifications=practicalNotifications448;}catch(_error){}}

injectStyles();
migrateExistingLedgers448();

function diagnostics(){
  const checks={
    exactCurve10:thresholdForStat(10)===10,
    exactCurve11:thresholdForStat(11)===15,
    exactCurve20:thresholdForStat(20)===15,
    exactCurve21:thresholdForStat(21)===20,
    foundationCeiling:FOUNDATION_CEILING===15,
    foundationProfile:FOUNDATION_PROFILE_ID==="academy_foundation_discipline_activity_v1",
    effectiveExecutionGrant:FOUNDATION_ACTION_EXP===2,
    noFractionalPL:String(exactDevelopedStats).includes("exactStats")&&!String(exactDevelopedStats).includes("progressFraction"),
    noNumericMasteryUI:String(rows448).includes("CURRENT STAT")&&!String(rows448).includes("MASTERY"),
    dynamicDevelopmentUI:String(rows448).includes("DEVELOPMENT")&&String(panelData448).includes("developmentRequired"),
    stableOwnedIdentity:String(stableSubject).includes("ownedCharacterId")&&String(stableSubject).includes("progressionCharacterId"),
    currentTeamGuard:String(foundationSnapshot).includes("subject_not_in_committed_current_team"),
    batchCeilingGuard:String(examBatch448).includes("foundationSnapshot")&&String(practicalBatch448).includes("foundationSnapshot"),
    techniquePracticeNotActivated:!String(commitDevelopment).includes("techniquePractice"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,curveId:CURVE_ID,profileId:FOUNDATION_PROFILE_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.getDisciplineDevelopmentThreshold448=thresholdForStat;
globalThis.getDisciplineDevelopmentSnapshot448=snapshot;
globalThis.preflightDisciplineDevelopment448=foundationSnapshot;
globalThis.commitDisciplineDevelopment448=commitDevelopment;
globalThis.getLastDisciplineDevelopmentResult448=(characterId,disciplineId)=>clone(lastResultBySubjectDiscipline.get(characterId+"::"+disciplineId)||null);
globalThis.rehydrateCanonicalCharacterStats448=restoreCanonicalStats448;
globalThis.runPhase2DisciplineStatGrowth448Diagnostics=diagnostics;
globalThis.SC_PHASE2_DISCIPLINE_STAT_GROWTH_44800=Object.freeze({
  patchId:PATCH_ID,curveId:CURVE_ID,activityProfileId:FOUNDATION_PROFILE_ID,developmentCeilingStat:FOUNDATION_CEILING,browserGoldenClaimed:false
});
})();