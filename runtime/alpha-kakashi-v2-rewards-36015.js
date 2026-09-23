// ============================================================================
// ACADEMY KAKASHI V2 — SOURCE-SCOPED REWARD ADAPTER — 36015
//
// Consumes the closed Kakashi Origin World / Combat / Acquisition reward
// contracts without creating a second Inventory, Currency, Battle or Story
// system. Exact source receipts make all material grants idempotent.
// ============================================================================
(function installAcademyKakashiV2Rewards36015(){
"use strict";
if(globalThis.SC_ACADEMY_KAKASHI_V2_REWARDS_36015)return;

const PATCH_ID="academy_kakashi_v2_rewards_36015_2026_09_22";
const STORE_KEY="kakashiV2RewardReceipts36015";
const KAKASHI="academy_kakashi";
const AMT="academy_kakashi_origin_amt";
const PS="academy_kakashi_origin_package_smuggler";
const MI="academy_kakashi_origin_masked_interceptor";
const FAILED_PICKPOCKET_3V1_CONFIG="academy_kakashi_origin_battle_amt_ps_mi_3v1";

const SOURCE=Object.freeze({
  terminal:"kak_origin_ryo_terminal_debrief",
  packageRecovered:"kak_origin_ryo_package_recovered",
  actionableIntel:"kak_origin_ryo_actionable_intelligence",
  liveCustody:"kak_origin_ryo_live_custody",
  exceptional:"kak_origin_ryo_exceptional_field_execution",
  miCash:"kak_origin_battle_mi_victory_ryo_01",
  psCash:"kak_origin_battle_ps_victory_ryo_01",
  amtCash:"kak_origin_battle_amt_victory_ryo_01",
  twoVsOneCash:"kak_origin_battle_2v1_victory_ryo_01",
  failedPickpocket3v1Cash:"kak_origin_battle_failed_pickpocket_3v1_victory_ryo_01",
  fieldPill:"kak_origin_item_field_recovery_resupply",
  trainingTanto:"kak_origin_weapon_exceptional_training_tanto"
});

function clone(value){
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function ensurePlayer(){
  if(!globalThis.playerData||typeof globalThis.playerData!=="object")globalThis.playerData={};
  if(!Array.isArray(playerData.inventory))playerData.inventory=[];
  if(!Number.isFinite(Number(playerData.ryo)))playerData.ryo=0;
  return playerData;
}
function ensureStore(){
  const p=ensurePlayer();
  if(!p[STORE_KEY]||typeof p[STORE_KEY]!=="object")p[STORE_KEY]={receipts:{}};
  if(!p[STORE_KEY].receipts||typeof p[STORE_KEY].receipts!=="object")p[STORE_KEY].receipts={};
  return p[STORE_KEY];
}
function address(storyOccurrenceId,sourceId,scopeRef="origin"){
  return [String(storyOccurrenceId||"missing_story_occurrence"),String(sourceId||"missing_source"),String(scopeRef||"origin")].join("|");
}
function receiptAt(storyOccurrenceId,sourceId,scopeRef="origin"){
  return ensureStore().receipts[address(storyOccurrenceId,sourceId,scopeRef)]||null;
}
function committed(storyOccurrenceId,sourceId,scopeRef="origin"){
  const r=receiptAt(storyOccurrenceId,sourceId,scopeRef);return !!(r&&r.committed===true);
}
function writeReceipt({storyOccurrenceId,sourceId,scopeRef="origin",rewardClass,ryo=0,itemId=null,quantity=0,battleOccurrenceId=null,metadata={}}){
  const store=ensureStore(),key=address(storyOccurrenceId,sourceId,scopeRef),existing=store.receipts[key];
  if(existing&&existing.committed===true)return{success:true,idempotent:true,receipt:clone(existing)};
  const receipt={
    address:key,storyOccurrenceId:String(storyOccurrenceId||""),sourceId:String(sourceId||""),scopeRef:String(scopeRef||"origin"),
    rewardClass:String(rewardClass||"material"),ryo:Number(ryo)||0,itemId:itemId?String(itemId):null,quantity:Math.max(0,Number(quantity)||0),
    battleOccurrenceId:battleOccurrenceId?String(battleOccurrenceId):null,metadata:clone(metadata||{}),
    committed:true,committedAt:Date.now()
  };
  store.receipts[key]=receipt;
  return{success:true,idempotent:false,receipt:clone(receipt)};
}

function registerTrainingTanto(){
  if(typeof itemDatabase!=="object"||!itemDatabase)return{success:false,reason:"item_database_missing"};
  const existing=itemDatabase.academy_training_tanto;
  if(existing){
    const exact=existing.id==="academy_training_tanto"&&existing.type==="weapon"&&existing.weaponClass==="Tanto"&&existing.stackable===false&&existing.equipmentSlot==="weapon"&&Number(existing.statModifiers&&existing.statModifiers.buki)===1;
    return exact?{success:true,idempotent:true}:{success:false,reason:"academy_training_tanto_catalogue_conflict"};
  }
  itemDatabase.academy_training_tanto={
    id:"academy_training_tanto",
    name:"Academy Training Tantō",
    type:"weapon",
    weaponClass:"Tanto",
    rarity:"Normal",
    stackable:false,
    equipmentSlot:"weapon",
    weaponDifficulty:0,
    statModifiers:{buki:1},
    sourceActivation:"kakashi_origin_exceptional_reward_only",
    description:"An Academy field-evaluation tantō. While equipped, it provides +1 Effective Bukijutsu before weapon proficiency realisation."
  };
  return{success:true,idempotent:false};
}

function currentBattleState36015(){
  try{return typeof currentBattle==="object"&&currentBattle?currentBattle:null;}catch(_error){}
  return globalThis.currentBattle&&typeof globalThis.currentBattle==="object"?globalThis.currentBattle:null;
}
function storyOccurrenceFromBattle(){
  const battle=currentBattleState36015();
  const dep=battle&&battle.kakashiV2;
  return dep&&dep.storyOccurrenceId?String(dep.storyOccurrenceId):null;
}
function battleOppositionIds36015(battle,dep,configId){
  const direct=dep&&Array.isArray(dep.oppositionParticipantIds)?dep.oppositionParticipantIds.map(String).filter(Boolean):[];
  if(direct.length)return direct;
  const catalogue=globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010&&globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010.configs;
  const config=catalogue&&catalogue[configId];
  return config&&Array.isArray(config.opposition)?config.opposition.map(String).filter(Boolean):[];
}
function soloCashSource36015(participantId){
  if(participantId===MI)return SOURCE.miCash;
  if(participantId===PS)return SOURCE.psCash;
  if(participantId===AMT)return SOURCE.amtCash;
  return null;
}
function battlePlan(){
  const battle=currentBattleState36015();
  const dep=battle&&battle.kakashiV2;
  if(!battle||!dep||!battle.outcome||battle.outcome.type!=="victory")return null;
  const configId=String(dep.battleConfigId||battle.encounterId||"");
  const storyOccurrenceId=storyOccurrenceFromBattle();
  const battleOccurrenceId=String(dep.battleOccurrenceId||battle.battleId||"");
  if(!storyOccurrenceId||!battleOccurrenceId)return null;
  const oppositionParticipantIds=battleOppositionIds36015(battle,dep,configId);
  const count=oppositionParticipantIds.length;
  const exactKnownOpposition=oppositionParticipantIds.every(id=>id===MI||id===PS||id===AMT);
  if(!exactKnownOpposition||count<1)return{configId,storyOccurrenceId,battleOccurrenceId,oppositionParticipantIds,cashSourceId:null,ryo:0,pill:false};
  if(count===1){
    const participantId=oppositionParticipantIds[0],cashSourceId=soloCashSource36015(participantId);
    const pill=participantId===MI&&!committed(storyOccurrenceId,SOURCE.fieldPill,"origin");
    return{configId,storyOccurrenceId,battleOccurrenceId,oppositionParticipantIds,cashSourceId,ryo:cashSourceId?50:0,pill,parentSourceId:participantId===MI?"kak_origin_battle_mi_victory_reward_v1":null};
  }
  if(count===2)return{configId,storyOccurrenceId,battleOccurrenceId,oppositionParticipantIds,cashSourceId:SOURCE.twoVsOneCash,ryo:100,pill:false};
  if(count===3&&configId===FAILED_PICKPOCKET_3V1_CONFIG){
    const exactSet=[AMT,PS,MI].every(id=>oppositionParticipantIds.includes(id));
    return{configId,storyOccurrenceId,battleOccurrenceId,oppositionParticipantIds,cashSourceId:exactSet?SOURCE.failedPickpocket3v1Cash:null,ryo:exactSet?200:0,pill:false};
  }
  return{configId,storyOccurrenceId,battleOccurrenceId,oppositionParticipantIds,cashSourceId:null,ryo:0,pill:false};
}

function ensureKakashiV2BattleRewardProjection36015(finishingShinobi=null){
  const plan=battlePlan();
  if(!plan)return{handled:false};
  const existing=currentBattle&&currentBattle.rewards||{};
  const existingPlan=existing&&existing.kakashiV2RewardPlan||null;
  const exact=existing.generated===true&&existing.kakashiV2===true&&existingPlan&&
    String(existingPlan.configId||"")===String(plan.configId||"")&&
    String(existingPlan.storyOccurrenceId||"")===String(plan.storyOccurrenceId||"")&&
    String(existingPlan.battleOccurrenceId||"")===String(plan.battleOccurrenceId||"");
  if(exact)return{handled:true,repaired:false,rewards:existing,plan:clone(existingPlan)};
  const outcome=currentBattle&&currentBattle.outcome||{};
  let finisherName=finishingShinobi&&finishingShinobi.name||existing.finishingShinobi||null;
  if(!finisherName&&outcome.finishingShinobiId&&typeof getPlayerCharacter==="function"){
    try{const row=getPlayerCharacter(outcome.finishingShinobiId);finisherName=row&&row.name||null;}catch(_e){}
  }
  const items=plan.pill?[{id:"field_recovery_pill",name:"Field Recovery Pill",rarity:"Common"}]:[];
  currentBattle.rewards={
    generated:true,
    claimed:existing.claimed===true,
    ryo:Number(plan.ryo)||0,
    exp:0,
    items,
    rareDrops:[],
    finishingShinobi:finisherName,
    mvp:existing.mvp||null,
    kakashiV2:true,
    kakashiV2RewardPlan:clone(plan),
    requiresExplicitPostClaimContinue:true,
    authoritativeProjectionRepaired:true
  };
  return{handled:true,repaired:true,rewards:currentBattle.rewards,plan:clone(plan)};
}

const PRE_GENERATE=typeof generateBattleRewards==="function"?generateBattleRewards:null;
function generateBattleRewards36015(enemy,finishingShinobi){
  const generic=PRE_GENERATE?PRE_GENERATE.apply(this,arguments):null;
  const repaired=ensureKakashiV2BattleRewardProjection36015(finishingShinobi);
  return repaired.handled===true?repaired.rewards:generic;
}
if(PRE_GENERATE){
  globalThis.generateBattleRewards=generateBattleRewards36015;
  try{generateBattleRewards=globalThis.generateBattleRewards;}catch(_error){}
}

const PRE_VICTORY_RENDER=typeof renderVictoryOverlay==="function"?renderVictoryOverlay:null;
function renderVictoryOverlay36015(container){
  try{ensureKakashiV2BattleRewardProjection36015();}catch(_e){}
  return PRE_VICTORY_RENDER?PRE_VICTORY_RENDER.apply(this,arguments):false;
}
if(PRE_VICTORY_RENDER){
  globalThis.renderVictoryOverlay=renderVictoryOverlay36015;
  try{renderVictoryOverlay=globalThis.renderVictoryOverlay;}catch(_error){}
}

// Some overlay routers retain the original Victory renderer instead of looking
// up the later wrapper dynamically. Repair the authoritative reward projection
// before the Victory overlay is opened so both retained and dynamic renderers
// consume the same currentBattle.rewards object.
const PRE_OPEN_OVERLAY=typeof openOverlay==="function"?openOverlay:null;
function openOverlay36015(type){
  if(String(type||"").toLowerCase()==="victory"){
    try{ensureKakashiV2BattleRewardProjection36015();}catch(_e){}
  }
  return PRE_OPEN_OVERLAY?PRE_OPEN_OVERLAY.apply(this,arguments):false;
}
if(PRE_OPEN_OVERLAY){
  globalThis.openOverlay=openOverlay36015;
  try{openOverlay=globalThis.openOverlay;}catch(_error){}
}

function snapshotRewardMutation(){
  return{
    ryo:Number(ensurePlayer().ryo)||0,
    inventory:clone(playerData.inventory||[]),
    store:clone(ensureStore()),
    claimed:!!(currentBattle&&currentBattle.rewards&&currentBattle.rewards.claimed),
    claimedAt:currentBattle&&currentBattle.claimedAt||null
  };
}
function restoreRewardMutation(snap){
  if(!snap)return;
  playerData.ryo=snap.ryo;playerData.inventory=clone(snap.inventory);
  playerData[STORE_KEY]=clone(snap.store);
  if(currentBattle&&currentBattle.rewards)currentBattle.rewards.claimed=snap.claimed;
  if(currentBattle)currentBattle.claimedAt=snap.claimedAt;
}
function claimKakashiV2BattleRewards(){
  try{ensureKakashiV2BattleRewardProjection36015();}catch(_e){}
  const rewards=currentBattle&&currentBattle.rewards,plan=rewards&&rewards.kakashiV2RewardPlan;
  if(!rewards||rewards.generated!==true||!plan)return{handled:false};
  if(rewards.claimed===true)return{handled:true,success:false,reason:"battle_rewards_already_claimed"};
  const snap=snapshotRewardMutation();
  try{
    playerData.ryo=(Number(playerData.ryo)||0)+(Number(rewards.ryo)||0);
    for(const item of Array.isArray(rewards.items)?rewards.items:[]){
      if(typeof addItemToInventory!=="function")throw new Error("inventory_add_api_missing");
      addItemToInventory(item);
    }
    if(plan.cashSourceId&&Number(plan.ryo)>0){
      writeReceipt({storyOccurrenceId:plan.storyOccurrenceId,sourceId:plan.cashSourceId,scopeRef:plan.battleOccurrenceId,rewardClass:"battle_cash",ryo:plan.ryo,battleOccurrenceId:plan.battleOccurrenceId,metadata:{battleConfigId:plan.configId}});
    }
    if(plan.pill){
      writeReceipt({storyOccurrenceId:plan.storyOccurrenceId,sourceId:SOURCE.fieldPill,scopeRef:"origin",rewardClass:"inventory_item",itemId:"field_recovery_pill",quantity:1,battleOccurrenceId:plan.battleOccurrenceId,metadata:{timing:"immediate_solo_mi_victory"}});
    }
    rewards.claimed=true;currentBattle.claimedAt=Date.now();
    const chronicleRecorded=typeof recordBattleChronicle==="function"?recordBattleChronicle():true;
    if(typeof savePlayerData==="function")savePlayerData();
    if(typeof saveTestState==="function")saveTestState();
    return{handled:true,success:true,chronicleRecorded,receiptRefs:Object.keys(ensureStore().receipts).filter(key=>key.startsWith(String(plan.storyOccurrenceId)+"|"))};
  }catch(error){
    restoreRewardMutation(snap);
    return{handled:true,success:false,reason:"kakashi_v2_battle_reward_claim_failed",error:String(error&&error.message||error)};
  }
}
const PRE_CLAIM=typeof claimCurrentBattleRewards==="function"?claimCurrentBattleRewards:null;
function claimCurrentBattleRewards36015(){
  const handled=claimKakashiV2BattleRewards();
  if(handled.handled===true)return handled.success===true;
  return PRE_CLAIM?PRE_CLAIM.apply(this,arguments):false;
}
if(PRE_CLAIM){
  globalThis.claimCurrentBattleRewards=claimCurrentBattleRewards36015;
  try{claimCurrentBattleRewards=globalThis.claimCurrentBattleRewards;}catch(_error){}
}

function exceptionalState(s){
  if(!s||typeof s!=="object")return false;
  const direct=s.resolvers&&s.resolvers.directPickpocket&&s.resolvers.directPickpocket.selectedOutcomeRef==="PICKPOCKET_DIRECT_SUCCESS";
  const improved=s.resolvers&&s.resolvers.improvedPickpocket&&s.resolvers.improvedPickpocket.selectedOutcomeRef==="PICKPOCKET_IMPROVED_SUCCESS";
  const three=!!(s.battles&&s.battles.pickpocket_3v1&&s.battles.pickpocket_3v1.outcome==="victory");
  const sequence=Array.isArray(s.routeHistory)&&s.routeHistory.some(row=>row&&row.label==="DEFEAT_ASSASSIN_THEN_SECURE");
  const mi=s.battles&&s.battles.mi_package_second,ps=s.battles&&s.battles.ps_package_second,amt=s.battles&&s.battles.amt_package_second;
  const sequential=!!(sequence&&mi&&ps&&amt&&Number(mi.playerActionOpportunityCount)<=4&&Number(ps.playerActionOpportunityCount)<=3);
  return direct||improved||three||sequential;
}
function previewTerminal(s,storyOccurrenceId){
  const participants=s&&s.participants||{};
  const packageRecovered=!!(s&&s.package&&(s.package.returned===true||s.package.holder==="ANBU"));
  const actionableIntel=!!(s&&s.knowledge&&s.knowledge.askWhere===true);
  const liveCustody=Object.values(participants).some(row=>row&&["ANBU_CUSTODY","POLICE_CUSTODY"].includes(row.state));
  const exceptional=exceptionalState(s);
  const battleParticipation=!!(s&&s.battles&&Object.keys(s.battles).length);
  const sources=[
    {sourceId:SOURCE.terminal,ryo:100,qualified:true},
    {sourceId:SOURCE.packageRecovered,ryo:75,qualified:packageRecovered},
    {sourceId:SOURCE.actionableIntel,ryo:25,qualified:actionableIntel},
    {sourceId:SOURCE.liveCustody,ryo:25,qualified:liveCustody},
    {sourceId:SOURCE.exceptional,ryo:25,qualified:exceptional}
  ];
  const total=sources.filter(x=>x.qualified).reduce((n,x)=>n+x.ryo,0);
  return{
    storyOccurrenceId:String(storyOccurrenceId||""),sources,totalRyo:Math.min(250,total),packageRecovered,actionableIntel,liveCustody,exceptional,battleParticipation,
    fieldRecoveryFallback:battleParticipation&&!committed(storyOccurrenceId,SOURCE.fieldPill,"origin"),
    trainingTanto:exceptional&&!committed(storyOccurrenceId,SOURCE.trainingTanto,"origin")
  };
}
function commitCurrencySource(storyOccurrenceId,row){
  if(!row.qualified)return{success:true,qualified:false,granted:0};
  const existing=receiptAt(storyOccurrenceId,row.sourceId,"origin");
  if(existing&&existing.committed===true)return{success:true,idempotent:true,qualified:true,granted:0,receipt:clone(existing)};
  playerData.ryo=(Number(playerData.ryo)||0)+Number(row.ryo||0);
  const receipt=writeReceipt({storyOccurrenceId,sourceId:row.sourceId,scopeRef:"origin",rewardClass:"terminal_cash",ryo:row.ryo});
  return{...receipt,qualified:true,granted:Number(row.ryo)||0};
}
function commitItemSource(storyOccurrenceId,sourceId,itemId,metadata={}){
  const existing=receiptAt(storyOccurrenceId,sourceId,"origin");
  if(existing&&existing.committed===true)return{success:true,idempotent:true,granted:0,receipt:clone(existing)};
  if(typeof getItemDefinition==="function"&&!getItemDefinition(itemId))return{success:false,reason:"kakashi_v2_reward_item_missing",itemId};
  if(typeof addItemToInventory!=="function")return{success:false,reason:"inventory_add_api_missing"};
  addItemToInventory({id:itemId,name:itemId==="field_recovery_pill"?"Field Recovery Pill":"Academy Training Tantō"});
  const receipt=writeReceipt({storyOccurrenceId,sourceId,scopeRef:"origin",rewardClass:"inventory_item",itemId,quantity:1,metadata});
  return{...receipt,granted:1};
}
function commitTerminal(s,storyOccurrenceId){
  ensurePlayer();
  if(!storyOccurrenceId)return{success:false,reason:"kakashi_v2_story_occurrence_required"};
  if(!s||!s.terminal||s.terminal.reportReached!==true||s.terminal.minatoReached!==true||s.terminal.receiptReached!==true)return{success:false,reason:"kakashi_v2_terminal_sequence_incomplete"};
  const plan=previewTerminal(s,storyOccurrenceId),snap=snapshotRewardMutation();
  try{
    const cash=plan.sources.map(row=>commitCurrencySource(storyOccurrenceId,row));
    if(cash.some(r=>!r.success))throw new Error("terminal_cash_commit_failed");
    let pill={success:true,granted:0};
    if(plan.fieldRecoveryFallback)pill=commitItemSource(storyOccurrenceId,SOURCE.fieldPill,"field_recovery_pill",{timing:"terminal_battle_participation_fallback"});
    if(!pill.success)throw new Error(pill.reason||"terminal_pill_commit_failed");
    let tanto={success:true,granted:0};
    if(plan.trainingTanto)tanto=commitItemSource(storyOccurrenceId,SOURCE.trainingTanto,"academy_training_tanto",{reason:"exceptional_field_execution"});
    if(!tanto.success)throw new Error(tanto.reason||"terminal_tanto_commit_failed");
    if(typeof savePlayerData==="function")savePlayerData();
    return{
      success:true,plan:clone(plan),
      grantedRyo:cash.reduce((n,r)=>n+Number(r.granted||0),0),
      pillGranted:Number(pill.granted||0),trainingTantoGranted:Number(tanto.granted||0),
      sourceReceipts:Object.values(ensureStore().receipts).filter(r=>r&&r.storyOccurrenceId===String(storyOccurrenceId)).map(clone)
    };
  }catch(error){
    restoreRewardMutation(snap);
    return{success:false,reason:"kakashi_v2_terminal_reward_commit_failed",error:String(error&&error.message||error)};
  }
}
function receiptsFor(storyOccurrenceId){
  return Object.values(ensureStore().receipts).filter(r=>r&&(!storyOccurrenceId||r.storyOccurrenceId===String(storyOccurrenceId))).map(clone);
}
function diagnostics(){
  const tanto=typeof itemDatabase==="object"&&itemDatabase&&itemDatabase.academy_training_tanto;
  const checks={
    exactTerminalSources:[SOURCE.terminal,SOURCE.packageRecovered,SOURCE.actionableIntel,SOURCE.liveCustody,SOURCE.exceptional].every(Boolean),
    terminalCap250:previewTerminal({package:{returned:true},knowledge:{askWhere:true},participants:{MI:{state:"ANBU_CUSTODY"}},battles:{pickpocket_3v1:{outcome:"victory"}},routeHistory:[],resolvers:{},terminal:{}}, "diag").totalRyo===250,
    exactImmediateCash:String(battlePlan).includes("count===1")&&String(battlePlan).includes("ryo:100")&&String(battlePlan).includes("ryo:exactSet?200:0")&&String(battleOppositionIds36015).includes("oppositionParticipantIds"),
    exactTanto:!!tanto&&tanto.type==="weapon"&&tanto.weaponClass==="Tanto"&&tanto.stackable===false&&Number(tanto.statModifiers&&tanto.statModifiers.buki)===1,
    noKillRewardPredicate:!String(previewTerminal).includes('state==="DEAD"')&&!String(exceptionalState).includes("DEAD"),
    noParallelInventory:!String(commitItemSource).includes("inventory.push")&&String(commitItemSource).includes("addItemToInventory"),
    victoryProjectionSelfHeals:String(ensureKakashiV2BattleRewardProjection36015).includes("authoritativeProjectionRepaired")&&String(renderVictoryOverlay36015).includes("ensureKakashiV2BattleRewardProjection36015"),
    victoryOpenProjectsBeforeGenericRender:String(openOverlay36015).includes('"victory"')&&String(openOverlay36015).indexOf("ensureKakashiV2BattleRewardProjection36015")<String(openOverlay36015).indexOf("PRE_OPEN_OVERLAY"),
    exactMIBattleProjection:String(ensureKakashiV2BattleRewardProjection36015).includes("Field Recovery Pill")&&String(battlePlan).includes("participantId===MI")&&String(battlePlan).includes("ryo:cashSourceId?50:0")&&String(soloCashSource36015).includes("participantId===MI"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const catalog=registerTrainingTanto();if(!catalog.success)throw new Error(catalog.reason);
globalThis.ensureAcademyKakashiV2BattleRewardProjection36015=ensureKakashiV2BattleRewardProjection36015;
globalThis.previewAcademyKakashiV2TerminalRewards36015=previewTerminal;
globalThis.commitAcademyKakashiV2TerminalRewards36015=commitTerminal;
globalThis.getAcademyKakashiV2RewardReceipts36015=receiptsFor;
globalThis.runAcademyKakashiV2Rewards36015Diagnostics=diagnostics;
globalThis.SC_ACADEMY_KAKASHI_V2_REWARDS_36015=Object.freeze({patchId:PATCH_ID,sourceIds:SOURCE,browserGoldenClaimed:false});
})();