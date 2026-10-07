// ============================================================================
// PHASE 2 — EXPERT / MASTER DISCIPLINE CURRICULUM PROFILES — #576
//
// Binding authority:
// Documentation/Progression/Alpha Expert Master Ninjutsu Genjutsu Fuinjutsu
// Curriculum Source Profiles 2026-10-07.md
//
// This module extends the merged #448 Discipline Development owner. It derives
// curriculum source from canonical Current Stat and exact activity/team state;
// it does not create another ledger, Stats store, renderer, Rank gate, Skill
// writer, or persistent currentCurriculumLevel authority.
// ============================================================================
(function installDisciplineCurriculumProfiles57600(){
"use strict";
if(globalThis.SC_DISCIPLINE_CURRICULUM_PROFILES_57600)return;

const PATCH_ID="discipline_curriculum_profiles_57600_2026_10_07";
const CURVE_ID="discipline_stat_curve_v1";
const FOUNDATION_PROFILE_ID="academy_foundation_discipline_activity_v1";
const HOSTS=Object.freeze(new Set(["exam","practical"]));
const ADVANCED_DISCIPLINES=Object.freeze(new Set(["nin","gen","fuin"]));
const PROFILE_ROWS=Object.freeze([
  Object.freeze({id:"discipline_curriculum_nin_expert_v1",disciplineId:"nin",tier:"expert",label:"EXPERT NINJUTSU CURRICULUM",floor:15,ceiling:30}),
  Object.freeze({id:"discipline_curriculum_gen_expert_v1",disciplineId:"gen",tier:"expert",label:"EXPERT GENJUTSU CURRICULUM",floor:15,ceiling:30}),
  Object.freeze({id:"discipline_curriculum_fuin_expert_v1",disciplineId:"fuin",tier:"expert",label:"EXPERT FŪINJUTSU CURRICULUM",floor:15,ceiling:30}),
  Object.freeze({id:"discipline_curriculum_nin_master_v1",disciplineId:"nin",tier:"master",label:"MASTER NINJUTSU CURRICULUM",floor:30,ceiling:50}),
  Object.freeze({id:"discipline_curriculum_gen_master_v1",disciplineId:"gen",tier:"master",label:"MASTER GENJUTSU CURRICULUM",floor:30,ceiling:50}),
  Object.freeze({id:"discipline_curriculum_fuin_master_v1",disciplineId:"fuin",tier:"master",label:"MASTER FŪINJUTSU CURRICULUM",floor:30,ceiling:50})
]);
const PROFILE_BY_ID=new Map(PROFILE_ROWS.map(row=>[row.id,row]));
let occurrenceSequence=0;

const priorActivityData=typeof globalThis.getKonohaCharacterActivityData==="function"?globalThis.getKonohaCharacterActivityData:null;
const priorPanelData=typeof globalThis.getKonohaDisciplineUIPanelData==="function"?globalThis.getKonohaDisciplineUIPanelData:null;
const priorRows=typeof globalThis.renderAlphaActivityDisciplineRows==="function"?globalThis.renderAlphaActivityDisciplineRows:null;
const priorExamData=typeof globalThis.getKonohaExamUIScreenData==="function"?globalThis.getKonohaExamUIScreenData:null;
const priorPracticalData=typeof globalThis.getKonohaPracticalUIScreenData==="function"?globalThis.getKonohaPracticalUIScreenData:null;
const priorExamAttempt=typeof globalThis.executeKonohaExamAttempt==="function"?globalThis.executeKonohaExamAttempt:null;
const priorPracticalAttempt=typeof globalThis.executeKonohaPracticalAttempt==="function"?globalThis.executeKonohaPracticalAttempt:null;
const priorExamBatch=typeof globalThis.executeKonohaExamBatch==="function"?globalThis.executeKonohaExamBatch:null;
const priorPracticalBatch=typeof globalThis.executeKonohaPracticalTraining==="function"?globalThis.executeKonohaPracticalTraining:null;

function clone(value){try{return value&&typeof value==="object"?JSON.parse(JSON.stringify(value)):value;}catch(_error){return value;}}
function safeId(value){return String(value||"").replace(/[^a-zA-Z0-9_.:-]+/g,"_");}
function character(characterId){return typeof globalThis.getPlayerCharacter==="function"?globalThis.getPlayerCharacter(characterId):null;}
function registryId(characterOrId){return typeof globalThis.getCharacterRegistryId==="function"?globalThis.getCharacterRegistryId(characterOrId):(characterOrId&&typeof characterOrId==="object"?(characterOrId.registryId||characterOrId.id):characterOrId)||null;}
function ownedRecord(characterRow){
  const id=registryId(characterRow);
  return id&&typeof globalThis.getOwnedCharacterRecordByVariantId==="function"?globalThis.getOwnedCharacterRecordByVariantId(id):null;
}
function stableSubject(characterId){
  const row=character(characterId);if(!row)return null;
  const owned=ownedRecord(row);
  return{
    character:row,
    registryId:registryId(row),
    ownedCharacterId:owned&&owned.ownedCharacterId||null,
    progressionCharacterId:owned&&owned.progressionCharacterId||row.id
  };
}
function currentTeam(){
  if(typeof globalThis.getChronicleCurrentTeam43600!=="function")return null;
  const team=globalThis.getChronicleCurrentTeam43600();
  return team&&team.committed===true&&Array.isArray(team.teamVariantIds)?team:null;
}
function currentStat(characterId,disciplineId){
  const row=character(characterId);
  return row&&row.stats?Math.max(0,Number(row.stats[disciplineId])||0):0;
}
function progression(characterId,disciplineId){
  return typeof globalThis.getCharacterDisciplineProgression==="function"?globalThis.getCharacterDisciplineProgression(characterId,disciplineId):null;
}
function threshold(stat){
  return typeof globalThis.getDisciplineDevelopmentThreshold448==="function"
    ?globalThis.getDisciplineDevelopmentThreshold448(stat)
    :5+(5*Math.ceil(Math.max(1,Math.floor(Number(stat)||1))/10));
}
function history(){
  if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory))return activityHistory;
  if(typeof playerData!=="undefined"&&playerData){if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];return playerData.activityHistory;}
  return[];
}
function existingReceipt(receiptId){return history().find(row=>row&&(row.receiptId===receiptId||row.id===receiptId))||null;}
function profileForBand(disciplineId,stat){
  if(!ADVANCED_DISCIPLINES.has(disciplineId))return null;
  if(stat>=15&&stat<30)return PROFILE_ROWS.find(row=>row.disciplineId===disciplineId&&row.tier==="expert")||null;
  if(stat>=30&&stat<50)return PROFILE_ROWS.find(row=>row.disciplineId===disciplineId&&row.tier==="master")||null;
  return null;
}
function foundationProfile(disciplineId){
  const discipline=typeof globalThis.getShinobiDiscipline==="function"?globalThis.getShinobiDiscipline(disciplineId):null;
  return{id:FOUNDATION_PROFILE_ID,disciplineId,tier:"foundation",label:"FOUNDATION "+String(discipline&&discipline.name||disciplineId).toUpperCase()+" CURRICULUM",floor:0,ceiling:15};
}
function resolveProfile(characterId,disciplineId,host,requestedProfileId=null){
  host=String(host||"");disciplineId=String(disciplineId||"");
  if(!HOSTS.has(host))return{allowed:false,reason:"curriculum_host_not_registered",host,disciplineId};
  const subject=stableSubject(characterId);if(!subject)return{allowed:false,reason:"persistent_subject_missing",host,disciplineId};
  const team=currentTeam();if(!team)return{allowed:false,reason:"committed_current_team_unavailable",host,disciplineId};
  if(!team.teamVariantIds.includes(subject.registryId))return{allowed:false,reason:"subject_not_in_committed_current_team",host,disciplineId};
  if(!subject.ownedCharacterId)return{allowed:false,reason:"stable_owned_character_identity_missing",host,disciplineId};
  const stat=currentStat(characterId,disciplineId);

  if(requestedProfileId){
    if(requestedProfileId===FOUNDATION_PROFILE_ID){
      if(typeof globalThis.preflightDisciplineDevelopment448!=="function")return{allowed:false,reason:"foundation_owner_unavailable",host,disciplineId,currentStat:stat};
      const upstream=globalThis.preflightDisciplineDevelopment448(characterId,disciplineId,host);
      return upstream&&upstream.allowed===true
        ?{...upstream,profile:foundationProfile(disciplineId),tier:"foundation",developmentFloorStat:0,developmentCeilingStat:15,currentStat:stat,host}
        :{...(upstream||{}),allowed:false,profile:foundationProfile(disciplineId),tier:"foundation",currentStat:stat,host};
    }
    const exact=PROFILE_BY_ID.get(String(requestedProfileId));
    if(!exact)return{allowed:false,reason:"unknown_curriculum_profile",host,disciplineId,currentStat:stat};
    if(exact.disciplineId!==disciplineId)return{allowed:false,reason:"curriculum_discipline_mismatch",host,disciplineId,currentStat:stat,activityProfileId:exact.id};
    if(stat<exact.floor||stat>=exact.ceiling)return{allowed:false,reason:"curriculum_profile_not_effective",host,disciplineId,currentStat:stat,activityProfileId:exact.id,developmentFloorStat:exact.floor,developmentCeilingStat:exact.ceiling,profile:exact};
    return{allowed:true,host,disciplineId,currentStat:stat,profile:exact,tier:exact.tier,activityProfileId:exact.id,developmentFloorStat:exact.floor,developmentCeilingStat:exact.ceiling,teamAssignmentId:team.assignmentId||null,...subject};
  }

  if(stat<15){
    if(typeof globalThis.preflightDisciplineDevelopment448!=="function")return{allowed:false,reason:"foundation_owner_unavailable",host,disciplineId,currentStat:stat};
    const upstream=globalThis.preflightDisciplineDevelopment448(characterId,disciplineId,host);
    return upstream&&upstream.allowed===true
      ?{...upstream,profile:foundationProfile(disciplineId),tier:"foundation",developmentFloorStat:0,developmentCeilingStat:15,currentStat:stat,host}
      :{...(upstream||{}),allowed:false,profile:foundationProfile(disciplineId),tier:"foundation",currentStat:stat,host};
  }

  if(!ADVANCED_DISCIPLINES.has(disciplineId))return{allowed:false,reason:"no_higher_alpha_curriculum_registered",host,disciplineId,currentStat:stat};
  const profile=profileForBand(disciplineId,stat);
  if(profile)return{allowed:true,host,disciplineId,currentStat:stat,profile,tier:profile.tier,activityProfileId:profile.id,developmentFloorStat:profile.floor,developmentCeilingStat:profile.ceiling,teamAssignmentId:team.assignmentId||null,...subject};
  const master=PROFILE_ROWS.find(row=>row.disciplineId===disciplineId&&row.tier==="master");
  return{allowed:false,reason:"structured_curriculum_source_exhausted",host,disciplineId,currentStat:stat,profile:master||null,tier:"exhausted",activityProfileId:master&&master.id||null,developmentFloorStat:master&&master.floor||30,developmentCeilingStat:master&&master.ceiling||50,teamAssignmentId:team.assignmentId||null,...subject};
}
function sourceOccurrenceId(pre,explicit=null){
  if(explicit)return String(explicit);
  const stable=pre.ownedCharacterId||pre.progressionCharacterId||pre.characterId;
  return["curriculum",pre.activityProfileId,pre.host,safeId(stable),pre.disciplineId,Date.now(),++occurrenceSequence].join("::");
}
function decorateDevelopmentReceipt(receiptId,pre){
  const row=existingReceipt(receiptId);if(!row)return null;
  row.activityProfileId=pre.activityProfileId;
  row.developmentFloorStat=pre.developmentFloorStat;
  row.developmentCeilingStat=pre.developmentCeilingStat;
  row.activityId=pre.host;
  row.curriculumTier=pre.tier;
  row.curriculumSource="structured_curriculum";
  return row;
}
function recordAttempt(pre,occurrenceId,resolution,context,tx){
  const receiptId="curriculum_attempt::"+safeId(occurrenceId);
  if(existingReceipt(receiptId))return existingReceipt(receiptId);
  const discipline=typeof globalThis.getShinobiDiscipline==="function"?globalThis.getShinobiDiscipline(pre.disciplineId):null;
  const row={
    type:"discipline_curriculum_attempt",receiptType:"discipline_curriculum_attempt",receiptId,
    stableCharacterId:pre.ownedCharacterId||pre.progressionCharacterId,ownedCharacterId:pre.ownedCharacterId||null,
    progressionCharacterId:pre.progressionCharacterId,representationVariantId:pre.registryId,
    sourceOccurrenceId:occurrenceId,causalRootId:occurrenceId,activity:pre.host,activityProfileId:pre.activityProfileId,
    curriculumTier:pre.tier,developmentFloorStat:pre.developmentFloorStat,developmentCeilingStat:pre.developmentCeilingStat,
    disciplineId:pre.disciplineId,disciplineName:String(discipline&&discipline.name||pre.disciplineId),
    completed:true,success:resolution.passed===true,outcome:resolution.outcome||((resolution.passed===true)?"pass":"fail"),
    developmentClass:resolution.passed===true?"effective_execution":"material_failure",
    requestedExp:Number(tx&&tx.requestedExp)||0,grantedExp:Number(tx&&tx.grantedExp)||0,
    sourceDevelopmentReceiptRef:tx&&tx.receipt&&tx.receipt.receiptId||null,
    curveId:CURVE_ID,currentStatBefore:Number(tx&&tx.statBefore),currentStatAfter:Number(tx&&tx.statAfter),
    contextStatValue:Number(context&&context.statValue)||0,commitState:"committed",timestamp:Date.now()
  };
  history().push(row);return row;
}
function recordExhaustion(pre,tx){
  if(!pre.profile||currentStat(pre.character.id,pre.disciplineId)<pre.developmentCeilingStat)return null;
  const stable=pre.ownedCharacterId||pre.progressionCharacterId;
  const receiptId=["curriculum_source_exhausted",safeId(stable),pre.disciplineId,pre.activityProfileId,pre.developmentCeilingStat].join("::");
  if(existingReceipt(receiptId))return existingReceipt(receiptId);
  const row={
    type:"curriculum_source_exhausted",receiptType:"curriculum_source_exhausted",receiptId,
    stableCharacterId:stable,ownedCharacterId:pre.ownedCharacterId||null,progressionCharacterId:pre.progressionCharacterId,
    representationVariantId:pre.registryId,disciplineId:pre.disciplineId,activityProfileId:pre.activityProfileId,
    curriculumTier:pre.tier,developmentFloorStat:pre.developmentFloorStat,developmentCeilingStat:pre.developmentCeilingStat,
    sourceDevelopmentReceiptRef:tx&&tx.receipt&&tx.receipt.receiptId||null,commitState:"committed",timestamp:Date.now()
  };
  history().push(row);return row;
}
function save(){if(typeof globalThis.savePlayerData==="function")return globalThis.savePlayerData();return false;}
function attemptContext(host,characterId,disciplineId){
  return host==="exam"
    ?(typeof globalThis.createKonohaExamAttemptContext==="function"?globalThis.createKonohaExamAttemptContext(characterId,disciplineId):null)
    :(typeof globalThis.createKonohaPracticalAttemptContext==="function"?globalThis.createKonohaPracticalAttemptContext(characterId,disciplineId):null);
}
function resolveAttempt(host,context){
  return host==="exam"
    ?(typeof globalThis.resolveKonohaExamAttempt==="function"?globalThis.resolveKonohaExamAttempt(context):null)
    :(typeof globalThis.resolveKonohaPracticalAttempt==="function"?globalThis.resolveKonohaPracticalAttempt(context):null);
}
function executeAttempt(host,characterId,disciplineId,options={}){
  const requestedProfileId=options&&options.profileId||null;
  const pre=resolveProfile(characterId,disciplineId,host,requestedProfileId);
  if(!pre.allowed)return{success:false,completed:false,blocked:true,reason:pre.reason,curriculumPreflight:clone(pre)};
  if(pre.tier==="foundation"){
    const prior=host==="exam"?priorExamAttempt:priorPracticalAttempt;
    if(!prior)return{success:false,completed:false,reason:"foundation_attempt_owner_unavailable"};
    return prior(characterId,disciplineId);
  }
  if(typeof globalThis.commitDisciplineDevelopment448!=="function")return{success:false,completed:false,reason:"shared_discipline_writer_unavailable"};
  const context=attemptContext(host,characterId,disciplineId);
  if(!context)return{success:false,completed:false,reason:host+"_context_invalid"};
  context.disciplineLevel=1;
  const row=progression(characterId,disciplineId);context.disciplineExp=Math.max(0,Number(row&&row.exp)||0);
  const resolution=resolveAttempt(host,context);
  if(!resolution)return{success:false,completed:false,reason:host+"_resolution_failed"};
  const occurrenceId=sourceOccurrenceId(pre,options&&options.sourceOccurrenceId);
  const developmentExp=resolution.passed===true?2:1;
  const tx=globalThis.commitDisciplineDevelopment448(characterId,disciplineId,developmentExp,{
    source:"curriculum_"+host,activityId:host,activityProfileId:pre.activityProfileId,
    developmentFloorStat:pre.developmentFloorStat,developmentCeilingStat:pre.developmentCeilingStat,
    teamAssignmentId:pre.teamAssignmentId,sourceOccurrenceId:occurrenceId,causalRootId:occurrenceId,
    progressionSlotId:host+"_attempt",receiptId:"development::"+safeId(pre.ownedCharacterId||pre.progressionCharacterId)+"::"+safeId(occurrenceId)+"::"+host+"_attempt::"+disciplineId,
    developmentClass:resolution.passed===true?"effective_execution":"material_failure"
  });
  if(!tx||tx.success!==true)return{success:false,completed:false,reason:"curriculum_development_transaction_failed",curriculumPreflight:clone(pre),phase2Transaction:clone(tx)};
  if(tx.receipt&&tx.receipt.receiptId)decorateDevelopmentReceipt(tx.receipt.receiptId,pre);
  recordAttempt(pre,occurrenceId,resolution,context,tx);
  recordExhaustion(pre,tx);
  save();
  const discipline=typeof globalThis.getShinobiDiscipline==="function"?globalThis.getShinobiDiscipline(disciplineId):null;
  return{
    success:resolution.passed===true,completed:true,duplicate:tx.duplicate===true,outcome:resolution.outcome||((resolution.passed===true)?"pass":"fail"),
    characterId,characterName:pre.character&&pre.character.name||characterId,disciplineId,disciplineName:String(discipline&&discipline.name||disciplineId),
    source:host,activityProfileId:pre.activityProfileId,curriculumTier:pre.tier,curriculumLabel:pre.profile.label,
    developmentFloorStat:pre.developmentFloorStat,developmentCeilingStat:pre.developmentCeilingStat,
    developmentExp:Number(tx.grantedExp)||0,rewardExp:Number(tx.grantedExp)||0,expGained:Number(tx.grantedExp)||0,
    previousStat:Number(tx.statBefore),newStat:Number(tx.statAfter),statPointsGained:Number(tx.statPointsGained)||0,
    previousExp:Number(tx.expBefore),currentExp:Number(tx.expAfter),expToNext:threshold(Number(tx.statAfter)||0),
    currentPLBefore:tx.currentPLBefore,currentPLAfter:tx.currentPLAfter,phase2Transaction:clone(tx)
  };
}
function executeBatch(host,characterId,disciplineId,batchSize=1){
  const requested=[1,5,10].includes(Number(batchSize))?Number(batchSize):1;
  const start=resolveProfile(characterId,disciplineId,host);
  if(!start.allowed)return{success:false,characterId,disciplineId,host,requestedAttempts:requested,completedAttempts:0,results:[],stoppedAtSourceCeiling:start.reason==="structured_curriculum_source_exhausted"||start.reason==="activity_development_ceiling_reached",reason:start.reason,curriculumPreflight:clone(start)};
  const lockedProfileId=start.activityProfileId;
  const results=[];
  for(let i=0;i<requested;i++){
    const pre=resolveProfile(characterId,disciplineId,host,lockedProfileId);
    if(!pre.allowed)break;
    const result=executeAttempt(host,characterId,disciplineId,{profileId:lockedProfileId});
    results.push(result);
    if(!result||result.completed!==true)break;
  }
  const after=resolveProfile(characterId,disciplineId,host,lockedProfileId);
  const completed=results.filter(row=>row&&row.completed===true);
  const passed=completed.filter(row=>row.success===true).length;
  return{
    success:completed.length>0,characterId,disciplineId,host,activityProfileId:lockedProfileId,curriculumTier:start.tier,
    requestedAttempts:requested,completedAttempts:completed.length,successfulAttempts:passed,failedAttempts:completed.length-passed,
    stoppedAtSourceCeiling:after.allowed!==true&&(after.reason==="curriculum_profile_not_effective"||after.reason==="activity_development_ceiling_reached"),results
  };
}
function advancedRow(characterId,disciplineId,host,baseRow={}){
  const resolved=resolveProfile(characterId,disciplineId,host);
  if(resolved.tier==="foundation")return{...baseRow,characterId,activityProfileId:FOUNDATION_PROFILE_ID,curriculumTier:"foundation",curriculumLabel:resolved.profile&&resolved.profile.label||null,developmentFloorStat:0};
  if(!ADVANCED_DISCIPLINES.has(disciplineId)||currentStat(characterId,disciplineId)<15)return baseRow;
  const row=progression(characterId,disciplineId),stat=currentStat(characterId,disciplineId),required=threshold(stat),exp=Math.max(0,Number(row&&row.exp)||0);
  const discipline=typeof globalThis.getShinobiDiscipline==="function"?globalThis.getShinobiDiscipline(disciplineId):null;
  const profile=resolved.profile||PROFILE_ROWS.find(p=>p.disciplineId===disciplineId&&p.tier==="master");
  return{
    ...baseRow,id:disciplineId,name:baseRow.name||String(discipline&&discipline.name||disciplineId),characterId,
    exp,expRequired:required,currentStat:stat,progressPercent:required>0?Math.max(0,Math.min(100,(exp/required)*100)):0,
    curveId:CURVE_ID,activityProfileId:profile&&profile.id||null,curriculumTier:resolved.tier,
    curriculumLabel:profile&&profile.label||null,developmentFloorStat:profile&&profile.floor||30,
    developmentCeilingStat:profile&&profile.ceiling||50,developmentAvailable:resolved.allowed===true,ceilingReached:resolved.allowed!==true&&stat>=50
  };
}
function activityData576(activityId,characterId){
  const base=priorActivityData?priorActivityData(activityId,characterId):null;
  if(!base||!HOSTS.has(activityId))return base;
  const rows=Array.isArray(base.disciplines)?base.disciplines.map(row=>advancedRow(characterId,row.id,activityId,row)):[];
  for(const id of ADVANCED_DISCIPLINES){
    if(currentStat(characterId,id)<15||rows.some(row=>row&&row.id===id))continue;
    rows.push(advancedRow(characterId,id,activityId,{}));
  }
  return{...base,disciplines:rows};
}
function panelData576(discipline){
  const base=priorPanelData?priorPanelData(discipline):null;
  if(!discipline||!discipline.characterId||!ADVANCED_DISCIPLINES.has(discipline.id)||currentStat(discipline.characterId,discipline.id)<15)return base;
  const row=advancedRow(discipline.characterId,discipline.id,discipline.activityId||discipline.trainingSource||"exam",base||discipline);
  return{...(base||{}),...row,expRemaining:Math.max(0,(Number(row.expRequired)||0)-(Number(row.exp)||0)),rewardExp:2};
}
function rows576(data,selectedId,serviceId){
  if(!priorRows||!data||!Array.isArray(data.disciplines))return priorRows?priorRows(data,selectedId,serviceId):"";
  return data.disciplines.map(row=>{
    let html=String(priorRows({...data,disciplines:[row]},selectedId,serviceId)||"");
    if(row.curriculumTier==="expert"){
      html=html.replace("FOUNDATION DEVELOPMENT RANGE — THROUGH STAT "+row.developmentCeilingStat,(row.curriculumLabel||"EXPERT CURRICULUM")+" — EFFECTIVE THROUGH STAT "+row.developmentCeilingStat);
      html=html.replace("FOUNDATION TRAINING LIMIT REACHED","EXPERT CURRICULUM NO LONGER EFFECTIVE — MASTER CURRICULUM AVAILABLE");
    }else if(row.curriculumTier==="master"){
      html=html.replace("FOUNDATION DEVELOPMENT RANGE — THROUGH STAT "+row.developmentCeilingStat,(row.curriculumLabel||"MASTER CURRICULUM")+" — EFFECTIVE THROUGH STAT "+row.developmentCeilingStat);
      html=html.replace("FOUNDATION TRAINING LIMIT REACHED","MASTER CURRICULUM SOURCE EXHAUSTED");
    }else if(row.curriculumTier==="exhausted"){
      html=html.replace("FOUNDATION TRAINING LIMIT REACHED","MASTER CURRICULUM SOURCE EXHAUSTED — FURTHER DEVELOPMENT REQUIRES ANOTHER LEGITIMATE SOURCE");
      html=html.replace(/This activity can no longer advance [^<]+\. Further development requires a more demanding source\./,"This structured curriculum source is exhausted; this is not a global Stat cap.");
    }
    return html;
  }).join("");
}
function selectedRow(data,serviceId){
  const id=serviceId==="exams"&&typeof globalThis.getKonohaExamSelectedDisciplineId==="function"?globalThis.getKonohaExamSelectedDisciplineId()
    :serviceId==="practical"&&typeof globalThis.getKonohaPracticalSelectedDisciplineId==="function"?globalThis.getKonohaPracticalSelectedDisciplineId():null;
  return data&&Array.isArray(data.disciplines)?data.disciplines.find(row=>row&&row.id===id):null;
}
function examData576(){
  const data=priorExamData?priorExamData.apply(this,arguments):null;if(!data)return data;
  const row=selectedRow(data,"exams");if(row&&row.curriculumTier&&row.curriculumTier!=="foundation")data.canExecute=data.canExecute!==false&&row.developmentAvailable===true;
  return data;
}
function practicalData576(){
  const data=priorPracticalData?priorPracticalData.apply(this,arguments):null;if(!data)return data;
  const row=selectedRow(data,"practical");if(row&&row.curriculumTier&&row.curriculumTier!=="foundation")data.canExecute=data.canExecute!==false&&row.developmentAvailable===true;
  return data;
}
function examAttempt576(characterId,disciplineId){
  const resolved=resolveProfile(characterId,disciplineId,"exam");
  return resolved.tier==="foundation"&&priorExamAttempt?priorExamAttempt(characterId,disciplineId):executeAttempt("exam",characterId,disciplineId);
}
function practicalAttempt576(characterId,disciplineId){
  const resolved=resolveProfile(characterId,disciplineId,"practical");
  return resolved.tier==="foundation"&&priorPracticalAttempt?priorPracticalAttempt(characterId,disciplineId):executeAttempt("practical",characterId,disciplineId);
}
function examBatch576(characterId,disciplineId,batchSize=1){
  const resolved=resolveProfile(characterId,disciplineId,"exam");
  if(resolved.tier==="foundation"&&priorExamBatch)return priorExamBatch(characterId,disciplineId,batchSize);
  const batch=executeBatch("exam",characterId,disciplineId,batchSize);
  if(typeof KONOHA_EXAM_ATTEMPT_STATE!=="undefined"&&KONOHA_EXAM_ATTEMPT_STATE){
    KONOHA_EXAM_ATTEMPT_STATE.lastBatch=batch.results;
    KONOHA_EXAM_ATTEMPT_STATE.lastBatchMeta={characterId,disciplineId,requestedBatchSize:batch.requestedAttempts,completedAttempts:batch.completedAttempts,successfulAttempts:batch.successfulAttempts||0,failedAttempts:batch.failedAttempts||0,stoppedAtCeiling:batch.stoppedAtSourceCeiling===true,activityProfileId:batch.activityProfileId||null};
  }
  if(typeof globalThis.recordKonohaExamSpecialNotifications==="function")globalThis.recordKonohaExamSpecialNotifications(characterId);
  return batch.results;
}
function practicalBatch576(){
  if(typeof globalThis.getKonohaActivityUISessionState!=="function"||typeof globalThis.getKonohaPracticalSelectedDisciplineId!=="function"||typeof globalThis.getKonohaPracticalBatchSize!=="function")return priorPracticalBatch?priorPracticalBatch.apply(this,arguments):{success:false,reason:"practical_runtime_missing"};
  const session=globalThis.getKonohaActivityUISessionState();if(!session||!session.characterId)return{success:false,reason:"No selected character."};
  const characterId=session.characterId,disciplineId=globalThis.getKonohaPracticalSelectedDisciplineId(),batchSize=globalThis.getKonohaPracticalBatchSize();
  const resolved=resolveProfile(characterId,disciplineId,"practical");
  if(resolved.tier==="foundation"&&priorPracticalBatch)return priorPracticalBatch.apply(this,arguments);
  if(typeof globalThis.clearKonohaPracticalResultPresentation==="function")globalThis.clearKonohaPracticalResultPresentation(false);
  const batch=executeBatch("practical",characterId,disciplineId,batchSize);
  const state=typeof globalThis.getKonohaPracticalAttemptState==="function"?globalThis.getKonohaPracticalAttemptState():null;
  if(state){state.lastBatch=batch.results;state.lastBatchMeta={characterId,disciplineId,requestedBatchSize:batch.requestedAttempts,completedAttempts:batch.completedAttempts,successfulAttempts:batch.successfulAttempts||0,failedAttempts:batch.failedAttempts||0,stoppedAtCeiling:batch.stoppedAtSourceCeiling===true,activityProfileId:batch.activityProfileId||null};state.resultVisible=false;}
  if(typeof globalThis.recordKonohaPracticalSpecialNotifications==="function")globalThis.recordKonohaPracticalSpecialNotifications(characterId);
  if(typeof globalThis.renderKonohaPracticalVisualScreen==="function")globalThis.renderKonohaPracticalVisualScreen();
  return batch;
}
function diagnostics(){
  const ids=PROFILE_ROWS.map(row=>row.id);
  const checks={
    sixProfiles:ids.length===6&&new Set(ids).size===6,
    exactExpertIds:["discipline_curriculum_nin_expert_v1","discipline_curriculum_gen_expert_v1","discipline_curriculum_fuin_expert_v1"].every(id=>ids.includes(id)),
    exactMasterIds:["discipline_curriculum_nin_master_v1","discipline_curriculum_gen_master_v1","discipline_curriculum_fuin_master_v1"].every(id=>ids.includes(id)),
    exactBands:PROFILE_ROWS.filter(row=>row.tier==="expert").every(row=>row.floor===15&&row.ceiling===30)&&PROFILE_ROWS.filter(row=>row.tier==="master").every(row=>row.floor===30&&row.ceiling===50),
    exactHosts:HOSTS.size===2&&HOSTS.has("exam")&&HOSTS.has("practical"),
    sharedWriter:typeof globalThis.commitDisciplineDevelopment448==="function",
    noPersistentCurriculumTruth:!String(resolveProfile).includes("currentCurriculumLevel"),
    noGenericTechniqueWriter:!String(executeAttempt).includes("techniquePractice")&&!String(executeAttempt).includes("Skill"),
    actionDerivedAwards:String(executeAttempt).includes("resolution.passed===true?2:1"),
    zeroCurriculumSurcharge:!String(executeAttempt).includes("ryo")&&!String(executeAttempt).includes("energy"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,curveId:CURVE_ID,profileIds:ids,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.resolveDisciplineCurriculumProfile576=resolveProfile;
globalThis.executeDisciplineCurriculumAttempt576=executeAttempt;
globalThis.executeDisciplineCurriculumBatch576=executeBatch;
globalThis.getDisciplineCurriculumProfiles576=()=>clone(PROFILE_ROWS);
globalThis.runDisciplineCurriculumProfiles576Diagnostics=diagnostics;

if(priorActivityData){globalThis.getKonohaCharacterActivityData=activityData576;try{getKonohaCharacterActivityData=activityData576;}catch(_error){}}
if(priorPanelData){globalThis.getKonohaDisciplineUIPanelData=panelData576;try{getKonohaDisciplineUIPanelData=panelData576;}catch(_error){}}
if(priorRows){globalThis.renderAlphaActivityDisciplineRows=rows576;try{renderAlphaActivityDisciplineRows=rows576;}catch(_error){}}
if(priorExamData){globalThis.getKonohaExamUIScreenData=examData576;try{getKonohaExamUIScreenData=examData576;}catch(_error){}}
if(priorPracticalData){globalThis.getKonohaPracticalUIScreenData=practicalData576;try{getKonohaPracticalUIScreenData=practicalData576;}catch(_error){}}
if(priorExamAttempt){globalThis.executeKonohaExamAttempt=examAttempt576;try{executeKonohaExamAttempt=examAttempt576;}catch(_error){}}
if(priorPracticalAttempt){globalThis.executeKonohaPracticalAttempt=practicalAttempt576;try{executeKonohaPracticalAttempt=practicalAttempt576;}catch(_error){}}
if(priorExamBatch){globalThis.executeKonohaExamBatch=examBatch576;try{executeKonohaExamBatch=examBatch576;}catch(_error){}}
if(priorPracticalBatch){globalThis.executeKonohaPracticalTraining=practicalBatch576;try{executeKonohaPracticalTraining=practicalBatch576;}catch(_error){}}

globalThis.SC_DISCIPLINE_CURRICULUM_PROFILES_57600=Object.freeze({
  patchId:PATCH_ID,curveId:CURVE_ID,profileIds:Object.freeze(PROFILE_ROWS.map(row=>row.id)),browserGoldenClaimed:false
});
})();