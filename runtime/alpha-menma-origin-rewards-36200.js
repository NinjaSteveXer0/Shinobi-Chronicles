// ============================================================================
// ISSUE #362 — ACADEMY MENMA THREE-SUBJECT WHOLE-ENCOUNTER REWARD — 36200
//
// World / Missions / Events / Rewards authority:
// Documentation/World/Academy Menma Three-Subject Origin Whole-Encounter Reward
// Lock 2026-09-25.md
//
// Reward-only adapter. It does not implement the scoped Menma + Anko 2-v-3
// Combat package. Until Combat commits the exact successor Battle occurrence
// receipt, this adapter suppresses generic enemy loot and remains fail-closed.
//
// #379 correction: World reward eligibility is cadence-independent. A factual
// Menma withdrawal does not independently disqualify an authoritative terminal
// victory over all three exact hostile participants.
// ============================================================================
(function installAcademyMenmaThreeSubjectReward36200(){
"use strict";
if(globalThis.SC_ACADEMY_MENMA_THREE_SUBJECT_REWARD_36200)return;

const PATCH_ID="academy_menma_three_subject_reward_36200_2026_09_25";
const WORLD_AUTHORITY="Academy Menma Three-Subject Origin Whole-Encounter Reward Lock 2026-09-25";
const REWARD_SOURCE_ID="menma_origin_battle_three_test_subjects_victory_ryo_01";
const RETIRED_SOURCE_ID="menma_origin_battle_altered_shinobi_victory_ryo_01";
const BATTLE_CONFIG_ID="academy_menma_origin_three_test_subjects_with_anko";
const ENCOUNTER_ID="origin_academy_menma_prologue:three_test_subjects";
const OBJECTIVE_ID="stop_three_test_subjects";
const STORY_SCENE_ID="origin_academy_menma_prologue";
const MENMA_ID="academy_menma";
const ANKO_ID="sj_anko";
const HOSTILE_IDS=Object.freeze([
  "test_subject_altered_shinobi",
  "test_subject_brute",
  "test_subject_unstable"
]);
const ALLIED_IDS=Object.freeze([MENMA_ID,ANKO_ID]);
const BATTLE_OCCURRENCE_PREFIX="battle_occ_origin_academy_menma_three_test_subjects:";
const FIXED_RYO=100;

function clone(value){
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function battleState(){
  try{return typeof currentBattle==="object"&&currentBattle?currentBattle:null;}catch(_error){}
  return globalThis.currentBattle&&typeof globalThis.currentBattle==="object"?globalThis.currentBattle:null;
}
function player(){
  try{return typeof playerData==="object"&&playerData?playerData:null;}catch(_error){}
  return globalThis.playerData&&typeof globalThis.playerData==="object"?globalThis.playerData:null;
}
function history(){
  try{
    if(typeof getActivityHistory==="function"){
      const rows=getActivityHistory();
      if(Array.isArray(rows))return rows;
    }
  }catch(_error){}
  const p=player();
  if(p&&Array.isArray(p.activityHistory))return p.activityHistory;
  return[];
}
function save(){
  try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
  try{if(typeof saveTestState==="function")saveTestState();}catch(_error){}
}
function own(object,key){
  return !!object&&typeof object==="object"&&Object.prototype.hasOwnProperty.call(object,key);
}
function field(row,key){
  if(!row||typeof row!=="object")return undefined;
  if(own(row,key))return row[key];
  if(row.fact&&typeof row.fact==="object"&&own(row.fact,key))return row.fact[key];
  if(row.data&&typeof row.data==="object"&&own(row.data,key))return row.data[key];
  return undefined;
}
function firstField(row,keys){
  for(const key of keys){
    const value=field(row,key);
    if(value!==undefined)return value;
  }
  return undefined;
}
function exactSet(actual,expected){
  if(!Array.isArray(actual)||actual.length!==expected.length)return false;
  const a=[...new Set(actual.map(String))].sort();
  const e=[...expected].map(String).sort();
  return a.length===e.length&&a.every((value,index)=>value===e[index]);
}
function successorBattle(battle=battleState()){
  return !!battle&&String(battle.encounterId||"")===ENCOUNTER_ID;
}
function sceneInstanceId(battle=battleState()){
  const context=battle&&battle.returnContext;
  if(!context||context.type!=="story_scene"||String(context.sceneId||"")!==STORY_SCENE_ID)return null;
  const id=String(context.sceneInstanceId||"").trim();
  return id||null;
}
function expectedBattleOccurrenceId(battle=battleState()){
  const instanceId=sceneInstanceId(battle);
  return instanceId?BATTLE_OCCURRENCE_PREFIX+instanceId:null;
}
function rowBattleOccurrenceId(row){
  const explicit=firstField(row,["battleOccurrenceId"]);
  if(explicit)return String(explicit);
  for(const key of ["occurrenceId","sourceOccurrenceId"]){
    const value=firstField(row,[key]);
    if(typeof value==="string"&&value.startsWith(BATTLE_OCCURRENCE_PREFIX))return value;
  }
  return null;
}
function isRewardReceipt(row){
  return !!row&&String(firstField(row,["rewardSourceId","sourceId"])||"")===REWARD_SOURCE_ID&&String(row.type||"")==="origin_battle_reward";
}
function upstreamBattleReceipt(battle=battleState()){
  const expected=expectedBattleOccurrenceId(battle);
  if(!expected)return null;
  return history().find(row=>!isRewardReceipt(row)&&rowBattleOccurrenceId(row)===expected)||null;
}
function validateUpstreamBattleReceipt(row,battle=battleState()){
  const expected=expectedBattleOccurrenceId(battle);
  if(!expected)return{success:false,reason:"menma_three_subject_story_provenance_missing"};
  if(!row)return{success:false,reason:"menma_three_subject_battle_receipt_missing",battleOccurrenceId:expected};
  const battleOccurrenceId=rowBattleOccurrenceId(row);
  if(battleOccurrenceId!==expected)return{success:false,reason:"menma_three_subject_battle_occurrence_mismatch",battleOccurrenceId};
  if(String(firstField(row,["battleConfigId"])||"")!==BATTLE_CONFIG_ID)return{success:false,reason:"menma_three_subject_battle_config_mismatch",battleOccurrenceId};
  if(String(firstField(row,["encounterId"])||"")!==ENCOUNTER_ID)return{success:false,reason:"menma_three_subject_encounter_mismatch",battleOccurrenceId};
  if(String(firstField(row,["objectiveId"])||"")!==OBJECTIVE_ID)return{success:false,reason:"menma_three_subject_objective_mismatch",battleOccurrenceId};
  if(String(firstField(row,["battleResult","terminalBattleResult"])||"")!=="victory")return{success:false,reason:"menma_three_subject_terminal_victory_required",battleOccurrenceId};
  if(firstField(row,["objectiveCompleted"])!==true)return{success:false,reason:"menma_three_subject_objective_incomplete",battleOccurrenceId};
  const allied=firstField(row,["alliedParticipantIds","allyParticipantIds"]);
  if(!exactSet(allied,ALLIED_IDS))return{success:false,reason:"menma_three_subject_allied_participants_mismatch",battleOccurrenceId};
  const hostile=firstField(row,["hostileParticipantIds","opponentIds"]);
  if(!exactSet(hostile,HOSTILE_IDS))return{success:false,reason:"menma_three_subject_hostile_participants_mismatch",battleOccurrenceId};
  const resolved=firstField(row,["resolvedHostileIds"]);
  if(!exactSet(resolved,HOSTILE_IDS))return{success:false,reason:"menma_three_subject_all_hostiles_required",battleOccurrenceId};
  const outcome=battle&&battle.outcome;
  if(!outcome||outcome.type!=="victory")return{success:false,reason:"menma_three_subject_current_battle_not_victory",battleOccurrenceId};
  return{
    success:true,
    battleOccurrenceId,
    sceneInstanceId:sceneInstanceId(battle),
    upstreamReceipt:clone(row),
    resolvedHostileIds:[...HOSTILE_IDS]
  };
}
function rewardReceipt(battleOccurrenceId){
  if(!battleOccurrenceId)return null;
  return history().find(row=>isRewardReceipt(row)&&String(row.battleOccurrenceId||"")===String(battleOccurrenceId))||null;
}
function plan(battle=battleState()){
  if(!successorBattle(battle))return{handled:false};
  const validated=validateUpstreamBattleReceipt(upstreamBattleReceipt(battle),battle);
  if(!validated.success)return{handled:true,ready:false,reason:validated.reason,battleOccurrenceId:validated.battleOccurrenceId||expectedBattleOccurrenceId(battle)};
  const existing=rewardReceipt(validated.battleOccurrenceId);
  return{
    handled:true,
    ready:true,
    battleOccurrenceId:validated.battleOccurrenceId,
    sceneInstanceId:validated.sceneInstanceId,
    ryo:FIXED_RYO,
    sourceId:REWARD_SOURCE_ID,
    existingReceipt:existing?clone(existing):null,
    upstreamReceipt:validated.upstreamReceipt,
    resolvedHostileIds:[...HOSTILE_IDS]
  };
}
function projectBlockedReward(reason,battleOccurrenceId=null){
  const battle=battleState();
  if(!battle)return null;
  const previous=battle.rewards&&typeof battle.rewards==="object"?battle.rewards:{};
  battle.rewards={
    generated:false,
    claimed:false,
    ryo:0,
    exp:0,
    items:[],
    rareDrops:[],
    finishingShinobi:previous.finishingShinobi||null,
    mvp:previous.mvp||null,
    menmaThreeSubjectReward:true,
    menmaThreeSubjectReady:false,
    menmaThreeSubjectBlockedReason:String(reason||"authoritative_battle_receipt_required"),
    menmaThreeSubjectBattleOccurrenceId:battleOccurrenceId||null,
    requiresExplicitPostClaimContinue:true
  };
  return battle.rewards;
}
function ensureProjection(finishingShinobi=null){
  const battle=battleState();
  const p=plan(battle);
  if(!p.handled)return{handled:false};
  if(!p.ready){
    return{handled:true,ready:false,reason:p.reason,rewards:projectBlockedReward(p.reason,p.battleOccurrenceId),plan:clone(p)};
  }
  const prior=battle.rewards&&typeof battle.rewards==="object"?battle.rewards:{};
  let finisherName=finishingShinobi&&finishingShinobi.name||prior.finishingShinobi||null;
  if(!finisherName&&battle.outcome&&battle.outcome.finishingShinobiId&&typeof getPlayerCharacter==="function"){
    try{const actor=getPlayerCharacter(battle.outcome.finishingShinobiId);finisherName=actor&&actor.name||null;}catch(_error){}
  }
  battle.rewards={
    generated:true,
    claimed:!!p.existingReceipt,
    ryo:FIXED_RYO,
    exp:0,
    items:[],
    rareDrops:[],
    finishingShinobi:finisherName,
    mvp:prior.mvp||null,
    menmaThreeSubjectReward:true,
    menmaThreeSubjectReady:true,
    menmaThreeSubjectRewardSourceId:REWARD_SOURCE_ID,
    menmaThreeSubjectBattleOccurrenceId:p.battleOccurrenceId,
    menmaThreeSubjectResolvedHostileIds:[...HOSTILE_IDS],
    fixedWholeEncounterReward:true,
    genericCharacterExp:false,
    actionDerivedDevelopmentSeparate:true,
    requiresExplicitPostClaimContinue:true
  };
  if(p.existingReceipt){
    battle.claimedAt=Number(p.existingReceipt.timestamp)||battle.claimedAt||null;
  }
  return{handled:true,ready:true,rewards:battle.rewards,plan:clone(p)};
}

const PRE_GENERATE=typeof generateBattleRewards==="function"?generateBattleRewards:null;
function generateBattleRewards36200(enemy,finishingShinobi){
  const battle=battleState();
  if(successorBattle(battle)){
    const projected=ensureProjection(finishingShinobi);
    return projected.rewards;
  }
  return PRE_GENERATE?PRE_GENERATE.apply(this,arguments):null;
}
if(PRE_GENERATE){
  globalThis.generateBattleRewards=generateBattleRewards36200;
  try{generateBattleRewards=globalThis.generateBattleRewards;}catch(_error){}
}

function writeRewardReceipt(p){
  const rows=history();
  const existing=rewardReceipt(p.battleOccurrenceId);
  if(existing)return{success:true,idempotent:true,receipt:clone(existing)};
  const upstreamMenmaWithdrawn=firstField(p&&p.upstreamReceipt,["menmaWithdrawn"]);
  const record={
    historyScope:typeof getCurrentChronicleOccurrenceHistoryScope==="function"
      ? getCurrentChronicleOccurrenceHistoryScope("origin_battle_reward")
      : null,
    type:"origin_battle_reward",
    activity:"battle_reward",
    completed:true,
    committed:true,
    success:true,
    outcome:"reward_granted",
    rewardSourceId:REWARD_SOURCE_ID,
    sourceId:REWARD_SOURCE_ID,
    battleOccurrenceId:p.battleOccurrenceId,
    sourceOccurrenceId:p.battleOccurrenceId,
    actorVariantId:MENMA_ID,
    sceneId:STORY_SCENE_ID,
    storySceneInstanceId:p.sceneInstanceId,
    battleConfigId:BATTLE_CONFIG_ID,
    encounterId:ENCOUNTER_ID,
    objectiveId:OBJECTIVE_ID,
    rewards:{ryo:FIXED_RYO,exp:0,items:[],rareDrops:[]},
    fact:{
      fixedWholeEncounterReward:true,
      resolvedHostileIds:[...HOSTILE_IDS],
      alliedParticipantIds:[...ALLIED_IDS],
      hostileParticipantIds:[...HOSTILE_IDS],
      menmaWithdrawn:typeof upstreamMenmaWithdrawn==="boolean"?upstreamMenmaWithdrawn:null,
      ankoContributionDoesNotSplitReward:true,
      genericCharacterExp:false,
      actionDerivedDevelopmentSeparate:true
    },
    timestamp:Date.now()
  };
  rows.push(record);
  const pData=player();
  if(pData)pData.activityHistory=rows;
  return{success:true,idempotent:false,receipt:clone(record)};
}
function claimSuccessorReward(){
  const battle=battleState();
  const p=plan(battle);
  if(!p.handled)return{handled:false};
  if(!p.ready)return{handled:true,success:false,reason:p.reason};
  ensureProjection();
  const pData=player();
  if(!pData)return{handled:true,success:false,reason:"player_data_missing"};
  const existing=rewardReceipt(p.battleOccurrenceId);
  if(existing){
    if(battle.rewards)battle.rewards.claimed=true;
    battle.claimedAt=Number(existing.timestamp)||battle.claimedAt||Date.now();
    return{handled:true,success:false,idempotent:true,reason:"battle_rewards_already_claimed",receipt:clone(existing)};
  }

  const rows=history(),historyLength=rows.length;
  const ryoBefore=Number(pData.ryo)||0;
  const claimedBefore=!!(battle.rewards&&battle.rewards.claimed);
  const claimedAtBefore=battle.claimedAt||null;
  try{
    pData.ryo=ryoBefore+FIXED_RYO;
    const written=writeRewardReceipt(p);
    if(!written.success)throw new Error(written.reason||"menma_reward_receipt_write_failed");
    if(battle.rewards)battle.rewards.claimed=true;
    battle.claimedAt=Date.now();
    const chronicleRecorded=typeof recordBattleChronicle==="function"?recordBattleChronicle():true;
    if(chronicleRecorded!==true)throw new Error("battle_chronicle_record_failed");
    save();
    return{
      handled:true,
      success:true,
      idempotent:false,
      ryoGranted:FIXED_RYO,
      receipt:written.receipt,
      chronicleRecorded:true
    };
  }catch(error){
    pData.ryo=ryoBefore;
    while(rows.length>historyLength)rows.pop();
    pData.activityHistory=rows;
    if(battle.rewards)battle.rewards.claimed=claimedBefore;
    battle.claimedAt=claimedAtBefore;
    return{handled:true,success:false,reason:"menma_three_subject_reward_claim_failed",error:String(error&&error.message||error)};
  }
}

const PRE_CLAIM=typeof claimCurrentBattleRewards==="function"?claimCurrentBattleRewards:null;
function claimCurrentBattleRewards36200(){
  if(successorBattle()){
    const result=claimSuccessorReward();
    return result.success===true;
  }
  return PRE_CLAIM?PRE_CLAIM.apply(this,arguments):false;
}
if(PRE_CLAIM){
  globalThis.claimCurrentBattleRewards=claimCurrentBattleRewards36200;
  try{claimCurrentBattleRewards=globalThis.claimCurrentBattleRewards;}catch(_error){}
}

function appendVictoryDisclosure(container,projection){
  if(!container||!projection||projection.handled!==true)return false;
  const existing=container.querySelector&&container.querySelector(".menma-three-subject-reward-36200");
  if(existing)existing.remove();
  const note=document.createElement("div");
  note.className="menma-three-subject-reward-36200";
  note.style.cssText="margin:8px auto 0;max-width:720px;padding:8px 12px;border:1px solid rgba(214,169,58,.45);border-radius:10px;background:rgba(4,12,17,.88);color:#d9e1df;font-size:10px;line-height:1.45;text-align:center;letter-spacing:.02em;";
  if(projection.ready===true){
    note.textContent="FIXED ENCOUNTER REWARD · +100 RYŌ · No items/materials · No generic Character EXP. Menma action-derived discipline/Stamina development, if any, is recorded separately from this cash reward.";
  }else{
    note.textContent="REWARD PENDING AUTHORITATIVE THREE-SUBJECT BATTLE RECEIPT · No partial payout is available.";
  }
  container.appendChild(note);
  return true;
}

const PRE_RENDER=typeof renderVictoryOverlay==="function"?renderVictoryOverlay:null;
function renderVictoryOverlay36200(container){
  const projection=successorBattle()?ensureProjection():{handled:false};
  const result=PRE_RENDER?PRE_RENDER.apply(this,arguments):false;
  try{appendVictoryDisclosure(container,projection);}catch(_error){}
  return result;
}
if(PRE_RENDER){
  globalThis.renderVictoryOverlay=renderVictoryOverlay36200;
  try{renderVictoryOverlay=globalThis.renderVictoryOverlay;}catch(_error){}
}

const PRE_OPEN=typeof openOverlay==="function"?openOverlay:null;
function openOverlay36200(type){
  if(String(type||"").toLowerCase()==="victory"&&successorBattle()){
    try{ensureProjection();}catch(_error){}
  }
  return PRE_OPEN?PRE_OPEN.apply(this,arguments):false;
}
if(PRE_OPEN){
  globalThis.openOverlay=openOverlay36200;
  try{openOverlay=globalThis.openOverlay;}catch(_error){}
}

function diagnostics(){
  const fakeBattle={
    encounterId:ENCOUNTER_ID,
    outcome:{type:"victory"},
    returnContext:{type:"story_scene",sceneId:STORY_SCENE_ID,sceneInstanceId:"diag_scene"}
  };
  const battleOccurrenceId=BATTLE_OCCURRENCE_PREFIX+"diag_scene";
  const base={
    battleOccurrenceId,
    battleConfigId:BATTLE_CONFIG_ID,
    encounterId:ENCOUNTER_ID,
    objectiveId:OBJECTIVE_ID,
    battleResult:"victory",
    objectiveCompleted:true,
    menmaWithdrawn:false,
    alliedParticipantIds:[...ALLIED_IDS],
    hostileParticipantIds:[...HOSTILE_IDS],
    resolvedHostileIds:[...HOSTILE_IDS]
  };
  const exact=validateUpstreamBattleReceipt(base,fakeBattle);
  const withdrawnVictory=validateUpstreamBattleReceipt({...base,menmaWithdrawn:true},{...fakeBattle,outcome:{type:"victory",menmaWithdrawn:true}});
  const one=validateUpstreamBattleReceipt({...base,resolvedHostileIds:[HOSTILE_IDS[0]]},fakeBattle);
  const two=validateUpstreamBattleReceipt({...base,resolvedHostileIds:HOSTILE_IDS.slice(0,2)},fakeBattle);
  const defeat=validateUpstreamBattleReceipt({...base,battleResult:"defeat",objectiveCompleted:false,menmaWithdrawn:true},{...fakeBattle,outcome:{type:"defeat",menmaWithdrawn:true}});
  const checks={
    exactSource:REWARD_SOURCE_ID==="menma_origin_battle_three_test_subjects_victory_ryo_01",
    exactFixedRyo:FIXED_RYO===100,
    successorIdentity:BATTLE_CONFIG_ID==="academy_menma_origin_three_test_subjects_with_anko"&&ENCOUNTER_ID==="origin_academy_menma_prologue:three_test_subjects"&&OBJECTIVE_ID==="stop_three_test_subjects",
    exactParticipants:ALLIED_IDS.join("|")==="academy_menma|sj_anko"&&HOSTILE_IDS.length===3,
    noPartialOne:one.success===false&&one.reason==="menma_three_subject_all_hostiles_required",
    noPartialTwo:two.success===false&&two.reason==="menma_three_subject_all_hostiles_required",
    exactVictoryAccepted:exact.success===true,
    menmaWithdrawnVictoryAccepted:withdrawnVictory.success===true,
    defeatStillRejected:defeat.success===false&&defeat.reason==="menma_three_subject_terminal_victory_required",
    menmaWithdrawalNotQualificationPredicate:!validateUpstreamBattleReceipt.toString().includes("menma_three_subject_menma_withdrawn_or_unknown")&&!validateUpstreamBattleReceipt.toString().includes("menma_three_subject_current_outcome_menma_withdrawn"),
    rewardReceiptPreservesWithdrawalTruth:writeRewardReceipt.toString().includes('typeof upstreamMenmaWithdrawn==="boolean"?upstreamMenmaWithdrawn:null'),
    oldSourceNeverWritten:!writeRewardReceipt.toString().includes(RETIRED_SOURCE_ID),
    genericRewardsSuppressed:generateBattleRewards36200.toString().indexOf("successorBattle")<generateBattleRewards36200.toString().indexOf("PRE_GENERATE"),
    noFixedLootOrExp:ensureProjection.toString().includes("exp:0")&&ensureProjection.toString().includes("items:[]")&&ensureProjection.toString().includes("rareDrops:[]"),
    durableReceiptUsesActivityHistory:writeRewardReceipt.toString().includes("history()")&&writeRewardReceipt.toString().includes("battleOccurrenceId"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.ensureAcademyMenmaThreeSubjectRewardProjection36200=ensureProjection;
globalThis.claimAcademyMenmaThreeSubjectReward36200=claimSuccessorReward;
globalThis.inspectAcademyMenmaThreeSubjectRewardPlan36200=plan;
globalThis.validateAcademyMenmaThreeSubjectBattleReceipt36200=validateUpstreamBattleReceipt;
globalThis.runAcademyMenmaThreeSubjectReward36200Diagnostics=diagnostics;
globalThis.SC_ACADEMY_MENMA_THREE_SUBJECT_REWARD_36200=Object.freeze({
  patchId:PATCH_ID,
  authority:WORLD_AUTHORITY,
  rewardSourceId:REWARD_SOURCE_ID,
  retiredSourceId:RETIRED_SOURCE_ID,
  battleConfigId:BATTLE_CONFIG_ID,
  encounterId:ENCOUNTER_ID,
  objectiveId:OBJECTIVE_ID,
  alliedParticipantIds:Object.freeze([...ALLIED_IDS]),
  hostileParticipantIds:Object.freeze([...HOSTILE_IDS]),
  fixedRyo:FIXED_RYO,
  battleOccurrencePrefix:BATTLE_OCCURRENCE_PREFIX,
  browserGoldenClaimed:false
});
})();
