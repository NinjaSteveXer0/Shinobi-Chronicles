// ============================================================================
// ISSUE #188 / #199 — ACADEMY KAKASHI STORY-BATTLE DEVELOPMENT + VICTORY PROJECTION — 35740
//
// Binding reward/development authority:
// - World: 91f5969b20e270b3ef7d148342f28a1668b4eba1
// - Combat: e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8
// - Progression: 54314cc29e1374783cae0a0d90654cc9a2316a45
// - Acquisition: b83884adb70f1e74e62f96ab96848c1ec33704f9
//
// Exact Combat action evidence still commits authorised discipline development
// through 34800. World/Rewards authority fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da
// now also gives the exact solo Kakashi-vs-Masked-Interceptor victory its own
// immediate material Battle reward: 50 Ryō + Field Recovery Pill ×1.
// Terminal Origin/debrief Ryō and Academy Training Tanto remain separate.
// ============================================================================
(function installAcademyKakashiBattleDevelopment35740(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_BATTLE_DEVELOPMENT_35740)return;

const PATCH_ID="alpha_kakashi_battle_development_35740_v2_2026_09_18";
const KAKASHI="academy_kakashi";
const ROUTE="academy_kakashi_origin_reward";
const TECHNICAL=new Set(["ninjutsu","taijutsu","genjutsu","bukijutsu","fuinjutsu","kinjutsu"]);
const AUTHORITIES=Object.freeze({
  world:"91f5969b20e270b3ef7d148342f28a1668b4eba1",
  immediateMiReward:"fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da",
  combat:"e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8",
  progression:"54314cc29e1374783cae0a0d90654cc9a2316a45",
  acquisition:"b83884adb70f1e74e62f96ab96848c1ec33704f9"
});
const MI_BATTLE_CONFIG="academy_kakashi_origin_battle_mi_1v1";
const MI_PARTICIPANT="academy_kakashi_origin_masked_interceptor";
const MI_REWARD_RYO=50;
const MI_REWARD_ITEM_ID="field_recovery_pill";

function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(_error){return v;}}
function norm(v){return String(v||"").trim().toLowerCase().replace(/ū/g,"u");}
function battle(){try{return typeof currentBattle==="object"&&currentBattle?currentBattle:null;}catch(_error){return null;}}
function deployment(b=battle()){return b&&b.kakashiOriginDeployment&&typeof b.kakashiOriginDeployment==="object"?b.kakashiOriginDeployment:null;}
function isKakashiOriginBattle(b=battle()){const d=deployment(b);return !!(b&&d&&d.controllerParticipantId===KAKASHI&&d.battleOccurrenceId);}
function isExactMiVictoryBattle(b=battle()){
  const d=deployment(b),opposition=d&&Array.isArray(d.oppositionParticipantIds)?d.oppositionParticipantIds.map(String):[];
  return !!(b&&d&&b.battleOver===true&&b.outcome&&b.outcome.type==="victory"&&d.controllerParticipantId===KAKASHI&&d.battleConfigId===MI_BATTLE_CONFIG&&opposition.length===1&&opposition[0]===MI_PARTICIPANT);
}
function battleOccurrenceId(b=battle()){const d=deployment(b);return d?String(d.battleOccurrenceId||b&&b.battleId||""):String(b&&b.battleId||"");}
function evidenceRows(b=battle()){return b&&b.runtime&&Array.isArray(b.runtime.evidence)?b.runtime.evidence:[];}
function kakashiActor(b=battle()){
  try{
    if(typeof getBattleParticipantByIdentity==="function"){
      const row=getBattleParticipantByIdentity("player",KAKASHI);if(row)return row;
    }
    if(b&&b.activePlayer&&b.activePlayer.id===KAKASHI)return b.activePlayer;
  }catch(_error){}
  return{id:KAKASHI};
}
function skillDefinition(skillId,b=battle()){
  if(!skillId)return null;
  try{
    if(typeof getBattlePreparedSkillDefinition==="function"){
      const skill=getBattlePreparedSkillDefinition(kakashiActor(b),skillId);
      if(skill)return skill;
    }
  }catch(_error){}
  return null;
}
function disciplineForAction(attempt,rows,b=battle()){
  const skill=skillDefinition(attempt&&attempt.skillId,b);
  const direct=norm(skill&&skill.primaryDiscipline);
  if(TECHNICAL.has(direct))return direct;
  const same=(rows||[]).filter(row=>row&&row.actionId&&row.actionId===attempt.actionId&&row.data);
  for(const row of same){
    const key=norm(row.data.primaryDiscipline||row.data.effectivePrimaryDiscipline);
    if(TECHNICAL.has(key))return key;
  }
  return null;
}
function hasMaterialEffect(attempt,rows){
  return (rows||[]).some(row=>{
    if(!row||!attempt||!attempt.actionId||row.actionId!==attempt.actionId||row===attempt)return false;
    if(row.eventType==="action_attempted")return false;
    if(row.eventType==="damage_resolved"){
      const d=row.data||{};
      return Number(d.finalDamage)>0||Number(d.remainingBattlePLBefore)!==Number(d.remainingBattlePLAfter);
    }
    return true;
  });
}
function sourceAmountFromSnapshot(snapshot,battleId){
  const totals={};
  const sources=snapshot&&snapshot.sources&&typeof snapshot.sources==="object"?Object.values(snapshot.sources):[];
  for(const receipt of sources){
    if(!receipt||!receipt.payload||String(receipt.payload.battleOccurrenceId||"")!==String(battleId||""))continue;
    if(receipt.kind!=="discipline_development"&&receipt.kind!=="stamina_development")continue;
    const discipline=receipt.kind==="stamina_development"?"stamina":norm(receipt.payload.discipline);
    const amount=Number(receipt.payload.amount)||0;
    if(amount>0)totals[discipline]=(Number(totals[discipline])||0)+amount;
  }
  return totals;
}
function summaryFromTotals(battleId,totals){
  const order=["ninjutsu","taijutsu","genjutsu","bukijutsu","fuinjutsu","kinjutsu","stamina"];
  const rows=order.filter(key=>Number(totals[key])>0).map(key=>({discipline:key,amount:Number(totals[key])}));
  return{
    route:ROUTE,battleOccurrenceId:String(battleId||""),rows,totalExp:rows.reduce((sum,row)=>sum+row.amount,0),
    materialBattleReward:{ryo:0,genericExp:0,items:[],rareDrops:[]},
    terminalOriginRewardDeferred:true,authorities:AUTHORITIES
  };
}
function readCommittedSummary(b=battle()){
  const id=battleOccurrenceId(b);if(!id)return null;
  try{
    if(typeof getAcademyKakashiOriginRewardSnapshot34800==="function"){
      return summaryFromTotals(id,sourceAmountFromSnapshot(getAcademyKakashiOriginRewardSnapshot34800(),id));
    }
  }catch(_error){}
  return summaryFromTotals(id,{});
}
function attachSummaryToBattle(b,summary){
  if(!b||!summary)return summary;
  b.kakashiOriginDevelopmentSummary=clone(summary);
  if(!b.rewards||typeof b.rewards!=="object")b.rewards={generated:true,claimed:false,ryo:0,exp:0,items:[],rareDrops:[]};
  b.rewards.progression=summary.rows.map(row=>({type:"discipline_exp",discipline:row.discipline,amount:row.amount}));
  b.rewards.kakashiOriginDevelopment=true;
  b.rewards.terminalOriginRewardDeferred=true;
  return summary;
}
function prepareImmediateMiReward35740(b=battle()){
  if(!isExactMiVictoryBattle(b))return{success:false,qualifies:false,reason:"not_exact_mi_solo_victory"};
  if(typeof ensureAcademyKakashiMiVictoryBattleEntitlement34800!=="function"||typeof getAcademyKakashiMiVictoryBattleRewardState34800!=="function"){
    return{success:false,qualifies:true,reason:"kakashi_mi_reward_adapter_missing"};
  }
  const ensured=ensureAcademyKakashiMiVictoryBattleEntitlement34800(b);if(!ensured||ensured.success!==true)return ensured||{success:false,reason:"kakashi_mi_entitlement_commit_failed"};
  const state=getAcademyKakashiMiVictoryBattleRewardState34800(b);if(!state||state.success!==true)return state||{success:false,reason:"kakashi_mi_reward_state_missing"};
  const pillDef=typeof getItemDefinition==="function"?getItemDefinition(MI_REWARD_ITEM_ID):null;
  b.rewards=b.rewards&&typeof b.rewards==="object"?b.rewards:{};
  b.rewards.generated=true;
  b.rewards.claimed=state.claimed===true;
  b.rewards.ryo=MI_REWARD_RYO;
  b.rewards.exp=0;
  b.rewards.items=[{id:MI_REWARD_ITEM_ID,name:pillDef&&pillDef.name||"Field Recovery Pill",rarity:pillDef&&pillDef.rarity||"Common",quantity:1}];
  b.rewards.rareDrops=[];
  b.rewards.kakashiImmediateMiBattleReward=true;
  b.rewards.immediateRewardEntitlementId=state.entitlementId;
  b.rewards.immediateRewardClaimId=state.claimId;
  b.rewards.requiresExplicitPostClaimContinue=true;
  b.rewards.terminalOriginRewardDeferred=true;
  return{success:true,qualifies:true,state:clone(state)};
}
function syncBattleDevelopment35740(b=battle()){
  if(!isKakashiOriginBattle(b))return{success:false,reason:"not_kakashi_origin_battle"};
  const id=battleOccurrenceId(b);if(!id)return{success:false,reason:"kakashi_battle_occurrence_missing"};
  const rows=evidenceRows(b);

  if(typeof recordAcademyKakashiTechnicalDevelopment34800!=="function"||typeof recordAcademyKakashiStaminaDevelopment34800!=="function"){
    return{success:false,reason:"kakashi_reward_development_adapter_missing"};
  }

  const attempts=rows.filter(row=>row&&row.eventType==="action_attempted"&&row.actorRef&&row.actorRef.side==="player"&&row.actorRef.participantId===KAKASHI&&row.skillId&&row.actionId);
  for(const attempt of attempts){
    const discipline=disciplineForAction(attempt,rows,b);if(!discipline)continue;
    const executionClass=hasMaterialEffect(attempt,rows)?"effective":"attempt";
    recordAcademyKakashiTechnicalDevelopment34800({
      sourceId:String(attempt.evidenceId||attempt.actionId),discipline,executionClass,subjectId:KAKASHI,battleOccurrenceId:id
    });
  }

  const staminaPackets=rows.filter(row=>{
    if(!row||row.eventType!=="damage_resolved"||!row.targetRef||row.targetRef.side!=="player"||row.targetRef.participantId!==KAKASHI)return false;
    const data=row.data||{};
    return Number(data.resolvedAttackPL)>0&&Number(data.staminaMitigationAmount)>0;
  });
  for(const packet of staminaPackets){
    recordAcademyKakashiStaminaDevelopment34800({
      sourceId:String(packet.evidenceId||packet.actionId||id+":stamina"),mitigationAmount:Number(packet.data&&packet.data.staminaMitigationAmount)||0,battleOccurrenceId:id,subjectId:KAKASHI
    });
  }

  const summary=readCommittedSummary(b);
  attachSummaryToBattle(b,summary);
  return{success:true,summary,attemptCount:attempts.length,staminaPacketCount:staminaPackets.length};
}
function esc(value){
  try{if(typeof escapeAlphaActivityHTML==="function")return escapeAlphaActivityHTML(String(value??""));}catch(_error){}
  return String(value??"").replace(/[&<>\"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
}
function disciplineLabel(key){return String(key||"").replace(/(^|_)([a-z])/g,(_m,_p,c)=>c.toUpperCase());}
function developmentListMarkup(summary){
  const rows=summary&&Array.isArray(summary.rows)?summary.rows:[];
  if(!rows.length)return '<span class="is-empty">NO QUALIFYING DEVELOPMENT</span>';
  return rows.map(row=>`<span>${esc(disciplineLabel(row.discipline).toUpperCase())} +${Number(row.amount)||0} EXP</span>`).join("");
}
function enhanceKakashiVictory35740(container){
  const b=battle();if(!isKakashiOriginBattle(b)||!container||typeof container.querySelector!=="function")return false;
  const summary=b.kakashiOriginDevelopmentSummary||readCommittedSummary(b);
  attachSummaryToBattle(b,summary);
  const immediate=isExactMiVictoryBattle(b)?prepareImmediateMiReward35740(b):null;
  const isImmediate=!!(immediate&&immediate.success===true&&immediate.qualifies===true);
  const claimed=!!(b.rewards&&b.rewards.claimed===true);

  const rewards=container.querySelector(".alpha-victory-rewards");
  if(rewards){
    if(isImmediate){
      rewards.setAttribute("aria-label","Immediate Battle reward and Battle development");
      rewards.innerHTML=`
        <div class="alpha-victory-metric"><span>BATTLE REWARD</span><strong>50 RYŌ</strong></div>
        <div class="alpha-victory-metric"><span>ITEM</span><strong>×1</strong></div>
        <div class="alpha-victory-list"><span>FIELD RECOVERY PILL</span><div><span>${claimed?"CLAIMED":"READY TO CLAIM"}</span></div></div>
        <div class="alpha-victory-list is-rare"><span>BATTLE DEVELOPMENT</span><div>${developmentListMarkup(summary)}</div></div>
      `;
    }else{
      rewards.setAttribute("aria-label","Battle development and deferred Origin rewards");
      rewards.innerHTML=`
        <div class="alpha-victory-metric"><span>DISCIPLINE EXP</span><strong>+${Number(summary&&summary.totalExp)||0}</strong></div>
        <div class="alpha-victory-metric"><span>RYŌ</span><strong>DEBRIEF</strong></div>
        <div class="alpha-victory-list"><span>DEVELOPMENT</span><div>${developmentListMarkup(summary)}</div></div>
        <div class="alpha-victory-list is-rare"><span>ORIGIN REWARDS</span><div><span>Evaluated at terminal debrief</span></div></div>
      `;
    }
  }

  const header=container.querySelector(".alpha-victory-header p");
  if(header)header.textContent=isImmediate
    ?"Battle reward, field development and Story continuation are separate runtime steps."
    :"Battle outcome, field development and Story continuation remain separate runtime steps.";

  const footer=container.querySelector(".alpha-victory-footer p");
  if(footer)footer.textContent=isImmediate
    ?(claimed
      ?"Battle reward claimed. Battle development remains committed. Return to Story to continue the Chronicle."
      :"Claim 50 Ryō and Field Recovery Pill ×1 now. Battle development is already committed from executed actions. Return to Story unlocks after the material reward claim.")
    :"Battle development is committed from executed actions. Origin Ryō and item/equipment rewards are evaluated at terminal debrief. Claim records this Battle Chronicle and returns to Story.";

  const button=container.querySelector(".alpha-victory-footer .victory-continue");
  if(button){
    if(isImmediate)button.textContent=claimed?"RETURN TO STORY":"CLAIM BATTLE REWARD";
    else if(!claimed)button.textContent="CLAIM BATTLE RESULT";
  }

  const state=container.querySelector(".alpha-victory-claim-state");
  if(state){
    if(isImmediate)state.textContent=claimed?"REWARD CLAIMED":"BATTLE REWARD CLAIM PENDING";
    else if(!claimed)state.textContent="RESULT CLAIM PENDING";
  }

  const dts=[...(container.querySelectorAll?container.querySelectorAll(".alpha-victory-chronicle dt"):[])];
  const rewardsDt=dts.find(node=>["REWARDS","DEVELOPMENT","BATTLE REWARD"].includes(String(node.textContent||"").trim().toUpperCase()));
  if(rewardsDt){
    const dd=rewardsDt.parentElement&&rewardsDt.parentElement.querySelector("dd");
    if(isImmediate){
      rewardsDt.textContent="BATTLE REWARD";
      if(dd)dd.textContent=claimed?"50 RYŌ + FIELD RECOVERY PILL ×1 · CLAIMED":"50 RYŌ + FIELD RECOVERY PILL ×1";
    }else{
      rewardsDt.textContent="DEVELOPMENT";
      if(dd)dd.textContent=(Number(summary&&summary.totalExp)||0)>0?`+${summary.totalExp} EXP COMMITTED`:"NO QUALIFYING EXP";
    }
  }
  return true;
}

const priorGenerate=typeof generateBattleRewards==="function"?generateBattleRewards:null;
if(priorGenerate){
  globalThis.generateBattleRewards=function generateBattleRewardsKakashi35740(enemy,finishingShinobi){
    const result=priorGenerate.apply(this,arguments);
    const b=battle();
    if(isKakashiOriginBattle(b)){
      syncBattleDevelopment35740(b);
      if(isExactMiVictoryBattle(b))prepareImmediateMiReward35740(b);
    }
    return b&&b.rewards?b.rewards:result;
  };
  try{generateBattleRewards=globalThis.generateBattleRewards;}catch(_error){}
}

const priorProject=typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult:null;
if(priorProject){
  globalThis.projectAcademyKakashiOriginBattleResult=function projectAcademyKakashiOriginBattleResult35740(){
    const b=battle();if(isKakashiOriginBattle(b)){syncBattleDevelopment35740(b);if(isExactMiVictoryBattle(b))prepareImmediateMiReward35740(b);}
    const result=priorProject.apply(this,arguments);
    const summary=b&&b.kakashiOriginDevelopmentSummary||null;
    const immediate=b&&isExactMiVictoryBattle(b)&&typeof getAcademyKakashiMiVictoryBattleRewardState34800==="function"?getAcademyKakashiMiVictoryBattleRewardState34800(b):null;
    return result&&typeof result==="object"?{...result,developmentSummary:clone(summary),rewardGranted:!!(immediate&&immediate.claimed===true),immediateBattleReward:immediate&&immediate.success===true?clone(immediate):null}:result;
  };
  try{projectAcademyKakashiOriginBattleResult=globalThis.projectAcademyKakashiOriginBattleResult;}catch(_error){}
}

const priorChronicle=typeof createBattleChronicleResult==="function"?createBattleChronicleResult:null;
if(priorChronicle){
  globalThis.createBattleChronicleResult=function createBattleChronicleResultKakashi35740(){
    const b=battle();if(isKakashiOriginBattle(b)){syncBattleDevelopment35740(b);if(isExactMiVictoryBattle(b))prepareImmediateMiReward35740(b);}
    const result=priorChronicle.apply(this,arguments);
    const summary=b&&b.kakashiOriginDevelopmentSummary||null;
    if(result&&typeof result==="object"&&summary){
      result.rewards=result.rewards&&typeof result.rewards==="object"?result.rewards:{};
      result.rewards.progression=summary.rows.map(row=>({type:"discipline_exp",discipline:row.discipline,amount:row.amount}));
      result.rewards.terminalOriginRewardDeferred=true;
    }
    return result;
  };
  try{createBattleChronicleResult=globalThis.createBattleChronicleResult;}catch(_error){}
}

const priorRender=typeof renderVictoryOverlay==="function"?renderVictoryOverlay:null;
if(priorRender){
  globalThis.renderVictoryOverlay=function renderVictoryOverlayKakashi35740(container){
    const b=battle();if(isKakashiOriginBattle(b)){syncBattleDevelopment35740(b);if(isExactMiVictoryBattle(b))prepareImmediateMiReward35740(b);}
    const result=priorRender.apply(this,arguments);
    if(isKakashiOriginBattle(b))enhanceKakashiVictory35740(container);
    return result;
  };
  try{renderVictoryOverlay=globalThis.renderVictoryOverlay;}catch(_error){}
}

const priorClaimRewards=typeof claimCurrentBattleRewards==="function"?claimCurrentBattleRewards:null;
if(priorClaimRewards){
  globalThis.claimCurrentBattleRewards=function claimCurrentBattleRewardsKakashi35740(){
    const b=battle();
    if(!isExactMiVictoryBattle(b))return priorClaimRewards.apply(this,arguments);
    if(typeof commitAcademyKakashiMiVictoryBattleReward34800!=="function")return false;
    const claim=commitAcademyKakashiMiVictoryBattleReward34800(b);
    if(!claim||claim.success!==true)return false;
    prepareImmediateMiReward35740(b);
    if(b.rewards)b.rewards.claimed=true;
    b.claimedAt=Date.now();
    try{if(typeof recordBattleChronicle==="function")recordBattleChronicle();}catch(_error){}
    try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
    try{if(typeof saveTestState==="function")saveTestState();}catch(_error){}
    return true;
  };
  try{claimCurrentBattleRewards=globalThis.claimCurrentBattleRewards;}catch(_error){}
}

function diagnostics(){
  const sync=syncBattleDevelopment35740.toString(),present=enhanceKakashiVictory35740.toString();
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_battle_development_35740_v2_2026_09_18",
    exactAuthorities:AUTHORITIES.world==="91f5969b20e270b3ef7d148342f28a1668b4eba1"&&AUTHORITIES.immediateMiReward==="fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da"&&AUTHORITIES.combat==="e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8"&&AUTHORITIES.progression==="54314cc29e1374783cae0a0d90654cc9a2316a45"&&AUTHORITIES.acquisition==="b83884adb70f1e74e62f96ab96848c1ec33704f9",
    technicalDevelopmentUses34800:sync.includes("recordAcademyKakashiTechnicalDevelopment34800"),
    staminaDevelopmentUses34800:sync.includes("recordAcademyKakashiStaminaDevelopment34800"),
    exactCombatEvidence:sync.includes('eventType==="action_attempted"')&&sync.includes('eventType!=="damage_resolved"')===false&&sync.includes("staminaMitigationAmount"),
    genericExpNotGranted:!sync.includes("playerData.exp")&&!sync.includes("rewards.exp="),
    immediateMiRewardUses34800:prepareImmediateMiReward35740.toString().includes("ensureAcademyKakashiMiVictoryBattleEntitlement34800")&&prepareImmediateMiReward35740.toString().includes("MI_REWARD_RYO")&&prepareImmediateMiReward35740.toString().includes("MI_REWARD_ITEM_ID"),
    progressionProjectedSeparately:attachSummaryToBattle.toString().includes("rewards.progression")&&attachSummaryToBattle.toString().includes("terminalOriginRewardDeferred"),
    chronicleCarriesProgression:typeof globalThis.createBattleChronicleResult==="function"&&globalThis.createBattleChronicleResult.toString().includes("result.rewards.progression"),
    immediateVictoryPresentation:present.includes("BATTLE REWARD")&&present.includes("50 RYŌ")&&present.includes("FIELD RECOVERY PILL")&&present.includes("CLAIM BATTLE REWARD")&&present.includes("RETURN TO STORY")&&present.includes("REWARD CLAIMED"),
    exactClaimUses34800:typeof globalThis.claimCurrentBattleRewards==="function"&&globalThis.claimCurrentBattleRewards.toString().includes("commitAcademyKakashiMiVictoryBattleReward34800"),
    browserGoldenClaimed:false
  };
  // Keep the diagnostic explicit rather than relying on one fragile source-text
  // expression for the damage-evidence branch.
  checks.exactCombatEvidence=sync.includes('eventType==="action_attempted"')&&sync.includes('eventType!=="damage_resolved"')===false&&sync.includes("staminaMitigationAmount");
  if(!checks.exactCombatEvidence)checks.exactCombatEvidence=sync.includes('eventType==="action_attempted"')&&hasMaterialEffect.toString().includes('eventType==="damage_resolved"')&&sync.includes("staminaMitigationAmount");
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.syncAcademyKakashiBattleDevelopment35740=syncBattleDevelopment35740;
globalThis.prepareAcademyKakashiImmediateMiReward35740=prepareImmediateMiReward35740;
globalThis.enhanceAcademyKakashiVictory35740=enhanceKakashiVictory35740;
globalThis.runAcademyKakashiBattleDevelopment35740Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEVELOPMENT_35740=Object.freeze({patchId:PATCH_ID,route:ROUTE,authorities:AUTHORITIES,browserGoldenClaimed:false});
})();
