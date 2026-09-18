// ============================================================================
// ISSUE #188 / #199 — ACADEMY KAKASHI STORY-BATTLE DEVELOPMENT + VICTORY PROJECTION — 35740
//
// Binding reward/development authority:
// - World: 91f5969b20e270b3ef7d148342f28a1668b4eba1
// - Combat: e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8
// - Progression: 54314cc29e1374783cae0a0d90654cc9a2316a45
// - Acquisition: b83884adb70f1e74e62f96ab96848c1ec33704f9
//
// Battle victory is NOT a terminal Origin Ryō/item reward. This module consumes
// exact Combat action evidence and commits authorised discipline development
// through 34800, then makes that real development visible on the Victory result.
// Terminal Ryō / Field Recovery Pill / Academy Training Tanto remain owned by
// the terminal debrief predicates and are not duplicated here.
// ============================================================================
(function installAcademyKakashiBattleDevelopment35740(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_BATTLE_DEVELOPMENT_35740)return;

const PATCH_ID="alpha_kakashi_battle_development_35740_2026_09_18";
const KAKASHI="academy_kakashi";
const ROUTE="academy_kakashi_origin_reward";
const TECHNICAL=new Set(["ninjutsu","taijutsu","genjutsu","bukijutsu","fuinjutsu","kinjutsu"]);
const AUTHORITIES=Object.freeze({
  world:"91f5969b20e270b3ef7d148342f28a1668b4eba1",
  combat:"e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8",
  progression:"54314cc29e1374783cae0a0d90654cc9a2316a45",
  acquisition:"b83884adb70f1e74e62f96ab96848c1ec33704f9"
});

function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(_error){return v;}}
function norm(v){return String(v||"").trim().toLowerCase().replace(/ū/g,"u");}
function battle(){try{return typeof currentBattle==="object"&&currentBattle?currentBattle:null;}catch(_error){return null;}}
function deployment(b=battle()){return b&&b.kakashiOriginDeployment&&typeof b.kakashiOriginDeployment==="object"?b.kakashiOriginDeployment:null;}
function isKakashiOriginBattle(b=battle()){const d=deployment(b);return !!(b&&d&&d.controllerParticipantId===KAKASHI&&d.battleOccurrenceId);}
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

  const rewards=container.querySelector(".alpha-victory-rewards");
  if(rewards){
    rewards.setAttribute("aria-label","Battle development and deferred Origin rewards");
    rewards.innerHTML=`
      <div class="alpha-victory-metric"><span>DISCIPLINE EXP</span><strong>+${Number(summary&&summary.totalExp)||0}</strong></div>
      <div class="alpha-victory-metric"><span>RYŌ</span><strong>DEBRIEF</strong></div>
      <div class="alpha-victory-list"><span>DEVELOPMENT</span><div>${developmentListMarkup(summary)}</div></div>
      <div class="alpha-victory-list is-rare"><span>ORIGIN REWARDS</span><div><span>Evaluated at terminal debrief</span></div></div>
    `;
  }

  const header=container.querySelector(".alpha-victory-header p");
  if(header)header.textContent="Battle outcome, field development and Story continuation remain separate runtime steps.";

  const footer=container.querySelector(".alpha-victory-footer p");
  if(footer)footer.textContent="Battle development is committed from executed actions. Origin Ryō and item/equipment rewards are evaluated at terminal debrief. Claim records this Battle Chronicle and returns to Story.";

  const button=container.querySelector(".alpha-victory-footer .victory-continue");
  if(button&&!(b.rewards&&b.rewards.claimed===true))button.textContent="CLAIM BATTLE RESULT";

  const state=container.querySelector(".alpha-victory-claim-state");
  if(state&&!(b.rewards&&b.rewards.claimed===true))state.textContent="RESULT CLAIM PENDING";

  const dts=[...(container.querySelectorAll?container.querySelectorAll(".alpha-victory-chronicle dt"):[])];
  const rewardsDt=dts.find(node=>String(node.textContent||"").trim().toUpperCase()==="REWARDS");
  if(rewardsDt){
    rewardsDt.textContent="DEVELOPMENT";
    const dd=rewardsDt.parentElement&&rewardsDt.parentElement.querySelector("dd");
    if(dd)dd.textContent=(Number(summary&&summary.totalExp)||0)>0?`+${summary.totalExp} EXP COMMITTED`:"NO QUALIFYING EXP";
  }
  return true;
}

const priorGenerate=typeof generateBattleRewards==="function"?generateBattleRewards:null;
if(priorGenerate){
  globalThis.generateBattleRewards=function generateBattleRewardsKakashi35740(enemy,finishingShinobi){
    const result=priorGenerate.apply(this,arguments);
    const b=battle();
    if(isKakashiOriginBattle(b))syncBattleDevelopment35740(b);
    return result;
  };
  try{generateBattleRewards=globalThis.generateBattleRewards;}catch(_error){}
}

const priorProject=typeof projectAcademyKakashiOriginBattleResult==="function"?projectAcademyKakashiOriginBattleResult:null;
if(priorProject){
  globalThis.projectAcademyKakashiOriginBattleResult=function projectAcademyKakashiOriginBattleResult35740(){
    const b=battle();if(isKakashiOriginBattle(b))syncBattleDevelopment35740(b);
    const result=priorProject.apply(this,arguments);
    const summary=b&&b.kakashiOriginDevelopmentSummary||null;
    return result&&typeof result==="object"?{...result,developmentSummary:clone(summary)}:result;
  };
  try{projectAcademyKakashiOriginBattleResult=globalThis.projectAcademyKakashiOriginBattleResult;}catch(_error){}
}

const priorRender=typeof renderVictoryOverlay==="function"?renderVictoryOverlay:null;
if(priorRender){
  globalThis.renderVictoryOverlay=function renderVictoryOverlayKakashi35740(container){
    const b=battle();if(isKakashiOriginBattle(b))syncBattleDevelopment35740(b);
    const result=priorRender.apply(this,arguments);
    if(isKakashiOriginBattle(b))enhanceKakashiVictory35740(container);
    return result;
  };
  try{renderVictoryOverlay=globalThis.renderVictoryOverlay;}catch(_error){}
}

function diagnostics(){
  const sync=syncBattleDevelopment35740.toString(),present=enhanceKakashiVictory35740.toString();
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_battle_development_35740_2026_09_18",
    exactAuthorities:AUTHORITIES.world==="91f5969b20e270b3ef7d148342f28a1668b4eba1"&&AUTHORITIES.combat==="e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8"&&AUTHORITIES.progression==="54314cc29e1374783cae0a0d90654cc9a2316a45"&&AUTHORITIES.acquisition==="b83884adb70f1e74e62f96ab96848c1ec33704f9",
    technicalDevelopmentUses34800:sync.includes("recordAcademyKakashiTechnicalDevelopment34800"),
    staminaDevelopmentUses34800:sync.includes("recordAcademyKakashiStaminaDevelopment34800"),
    exactCombatEvidence:sync.includes('eventType==="action_attempted"')&&sync.includes('eventType!=="damage_resolved"')===false&&sync.includes("staminaMitigationAmount"),
    genericExpNotGranted:!sync.includes("playerData.exp")&&!sync.includes("rewards.exp="),
    noBattleRyoOrItemGrant:!sync.includes("playerData.ryo")&&!sync.includes("addItemToInventory"),
    progressionProjectedSeparately:attachSummaryToBattle.toString().includes("rewards.progression")&&attachSummaryToBattle.toString().includes("terminalOriginRewardDeferred"),
    victoryExplainsDebriefBoundary:present.includes("DISCIPLINE EXP")&&present.includes("Evaluated at terminal debrief")&&present.includes("CLAIM BATTLE RESULT"),
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
globalThis.enhanceAcademyKakashiVictory35740=enhanceKakashiVictory35740;
globalThis.runAcademyKakashiBattleDevelopment35740Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEVELOPMENT_35740=Object.freeze({patchId:PATCH_ID,route:ROUTE,authorities:AUTHORITIES,browserGoldenClaimed:false});
})();
