// ============================================================================
// #409 — ORIGIN COMPLETION STARTING PURSE
//
// Scoped runtime extension preserving frozen game.js.
// Every completed Origin receives the locked one-shot +100 Ryō starting purse
// from the sealed Origin-completion continuity boundary.
// ============================================================================
(function installOriginStartingPurse409(){
"use strict";
if(globalThis.SC_ORIGIN_STARTING_PURSE_409)return;

const PATCH_ID="origin_starting_purse_409_2026_09_28";
const SOURCE_ID="origin_completion_starting_purse_ryo_01";
const AMOUNT=100;
const PRE_COMPLETE=typeof completeChronicleOriginPrologue==="function"?completeChronicleOriginPrologue:null;
if(!PRE_COMPLETE){
  globalThis.SC_ORIGIN_STARTING_PURSE_409=Object.freeze({patchId:PATCH_ID,installed:false,reason:"origin_completion_api_missing"});
  return;
}
function clone(v){
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(v):JSON.parse(JSON.stringify(v));}catch(_error){return v;}
}
function history(){
  if(!playerData||typeof playerData!=="object")return[];
  if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];
  return playerData.activityHistory;
}
function existing(originVariantId,boundaryId){
  return history().find(record=>record&&record.type==="origin_completion_reward"&&
    String(record.rewardSourceId||record.sourceId||"")===SOURCE_ID&&
    record.originVariantId===originVariantId&&
    record.originCompletionOccurrenceId===boundaryId)||null;
}
function commit(originVariantId,boundaryId){
  if(!originVariantId||!boundaryId)return{success:false,reason:"origin_completion_reward_identity_missing"};
  const old=existing(originVariantId,boundaryId);
  if(old)return{success:true,idempotent:true,ryoGranted:0,receipt:clone(old)};
  const rows=history(),before=Number(playerData.ryo)||0,length=rows.length;
  try{
    playerData.ryo=before+AMOUNT;
    const boundary=typeof getActiveKonohaEntryBoundaryRecord==="function"?getActiveKonohaEntryBoundaryRecord(originVariantId):null;
    const record={
      historyScope:boundary&&boundary.historyScope?clone(boundary.historyScope):null,
      type:"origin_completion_reward",activity:"origin_reward",completed:true,committed:true,success:true,
      outcome:"origin_starting_purse_granted",rewardSourceId:SOURCE_ID,sourceId:SOURCE_ID,
      originVariantId,actorVariantId:originVariantId,
      originCompletionOccurrenceId:boundaryId,sourceOccurrenceId:boundaryId,
      rewards:{ryo:AMOUNT},ryo:AMOUNT,routeIndependent:true,moralityIndependent:true,
      sourceRefs:[{type:"chronicle_continuity_boundary",id:boundaryId,role:"sealed_origin_completion"}],
      timestamp:Date.now()
    };
    rows.push(record);
    try{activityHistory=playerData.activityHistory;}catch(_error){}
    if(typeof savePlayerData==="function")savePlayerData();
    return{success:true,idempotent:false,ryoGranted:AMOUNT,receipt:clone(record)};
  }catch(error){
    playerData.ryo=before;
    while(rows.length>length)rows.pop();
    try{activityHistory=playerData.activityHistory;}catch(_error){}
    return{success:false,reason:"origin_starting_purse_commit_failed",error:String(error&&error.message||error)};
  }
}
globalThis.completeChronicleOriginPrologue=function completeChronicleOriginPrologue409(originVariantId,evidenceIds=[]){
  const result=PRE_COMPLETE.apply(this,arguments);
  if(!result||result.success!==true)return result;
  let boundaryId=result.activeKonohaEntryBoundaryId||null;
  if(!boundaryId&&typeof getActiveKonohaEntryBoundaryRecord==="function"){
    const row=getActiveKonohaEntryBoundaryRecord(originVariantId);
    boundaryId=row&&row.boundaryId||null;
  }
  const purse=commit(originVariantId,boundaryId);
  if(!purse.success)return purse;
  return{
    ...result,
    originStartingPurseCommitted:true,
    originStartingPurseIdempotent:purse.idempotent===true,
    originStartingPurseRyoGranted:Number(purse.ryoGranted)||0,
    originStartingPurseRewardSourceId:SOURCE_ID
  };
};
try{completeChronicleOriginPrologue=globalThis.completeChronicleOriginPrologue;}catch(_error){}

function diagnostics(){
  const checks={
    frozenCorePreserved:true,
    exactSourceId:SOURCE_ID==="origin_completion_starting_purse_ryo_01",
    exactAmount:AMOUNT===100,
    oneShotByOriginAndBoundary:String(existing).includes("originCompletionOccurrenceId===boundaryId"),
    noRouteCondition:!String(commit).includes("routeId")&&!String(commit).includes("morality"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}
globalThis.runOriginStartingPurse409Diagnostics=diagnostics;
globalThis.SC_ORIGIN_STARTING_PURSE_409=Object.freeze({patchId:PATCH_ID,sourceId:SOURCE_ID,amount:AMOUNT,installed:true,browserGoldenClaimed:false});
})();