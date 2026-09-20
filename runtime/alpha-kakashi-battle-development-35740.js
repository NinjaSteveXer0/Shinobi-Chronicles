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
// gives the exact solo Kakashi-vs-Masked-Interceptor victory 50 Ryō + Field
// Recovery Pill ×1. World authority 7446e80c7f2cb9d004ffd914e11c0c77e7321c2b
// additionally gives exact solo PS and AMT victories 50 Ryō cash-only. Reward
// disclosure authority aad106b6a64ede81556aea0df0cc9fe4b8830178 requires
// exact action-derived development causes to remain inspectable on Victory.
// Terminal Origin/debrief rewards remain separate.
// ============================================================================
(function installAcademyKakashiBattleDevelopment35740(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_BATTLE_DEVELOPMENT_35740)return;

const PATCH_ID="alpha_kakashi_battle_development_35740_v10_2026_09_20";
const KAKASHI="academy_kakashi";
const ROUTE="academy_kakashi_origin_reward";
const TECHNICAL=new Set(["ninjutsu","taijutsu","genjutsu","bukijutsu","fuinjutsu","kinjutsu"]);
const AUTHORITIES=Object.freeze({
  world:"91f5969b20e270b3ef7d148342f28a1668b4eba1",
  immediateMiReward:"fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da",
  downstreamCashReward:"7446e80c7f2cb9d004ffd914e11c0c77e7321c2b",
  rewardDisclosure:"aad106b6a64ede81556aea0df0cc9fe4b8830178",
  combat:"e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8",
  progression:"54314cc29e1374783cae0a0d90654cc9a2316a45",
  acquisition:"b83884adb70f1e74e62f96ab96848c1ec33704f9"
});
const MI_BATTLE_CONFIG="academy_kakashi_origin_battle_mi_1v1";
const MI_SEQUENTIAL_BATTLE_CONFIG="academy_kakashi_origin_battle_seq_mi";
const MI_BATTLE_CONFIGS=new Set([MI_BATTLE_CONFIG,MI_SEQUENTIAL_BATTLE_CONFIG]);
const MI_PARTICIPANT="academy_kakashi_origin_masked_interceptor";
const MI_REWARD_RYO=50;
const MI_REWARD_ITEM_ID="field_recovery_pill";
const PS_BATTLE_CONFIG="academy_kakashi_origin_battle_seq_ps";
const PS_PARTICIPANT="academy_kakashi_origin_package_smuggler";
const AMT_BATTLE_CONFIG="academy_kakashi_origin_battle_seq_amt_pakkun";
const AMT_PARTICIPANT="academy_kakashi_origin_amt";
const DOWNSTREAM_REWARD_RYO=50;
const THREE_V_ONE_BATTLE_CONFIG="academy_kakashi_origin_battle_amt_ps_mi_3v1";
const THREE_V_ONE_PARTICIPANTS=new Set(["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
const THREE_V_ONE_DEFERRED_RYO=25;
const THREE_V_ONE_TANTO_ID="academy_training_tanto";

function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(_error){return v;}}
function norm(v){return String(v||"").trim().toLowerCase().replace(/ū/g,"u");}
function battle(){try{return typeof currentBattle==="object"&&currentBattle?currentBattle:null;}catch(_error){return null;}}
function deployment(b=battle()){
  if(b&&b.kakashiOriginDeployment&&typeof b.kakashiOriginDeployment==="object")return b.kakashiOriginDeployment;
  try{
    if(typeof recoverAcademyKakashiOriginBattleDeployment34300==="function")return recoverAcademyKakashiOriginBattleDeployment34300(b);
  }catch(_error){}
  return null;
}
function isKakashiOriginBattle(b=battle()){const d=deployment(b);return !!(b&&d&&d.controllerParticipantId===KAKASHI&&d.battleOccurrenceId);}
function isExactMiVictoryBattle(b=battle()){
  const d=deployment(b),opposition=d&&Array.isArray(d.oppositionParticipantIds)?d.oppositionParticipantIds.map(String):[];
  return !!(b&&d&&b.battleOver===true&&b.outcome&&b.outcome.type==="victory"&&d.controllerParticipantId===KAKASHI&&MI_BATTLE_CONFIGS.has(String(d.battleConfigId||""))&&opposition.length===1&&opposition[0]===MI_PARTICIPANT);
}
function isExceptionalThreeVsOneVictory35740(b=battle()){
  const d=deployment(b),opposition=d&&Array.isArray(d.oppositionParticipantIds)?d.oppositionParticipantIds.map(String):[];
  return !!(b&&d&&b.battleOver===true&&b.outcome&&b.outcome.type==="victory"&&d.controllerParticipantId===KAKASHI&&d.battleConfigId===THREE_V_ONE_BATTLE_CONFIG&&opposition.length===3&&opposition.every(ref=>THREE_V_ONE_PARTICIPANTS.has(ref)));
}
function downstreamCashSpec35740(b=battle()){
  const d=deployment(b),opposition=d&&Array.isArray(d.oppositionParticipantIds)?d.oppositionParticipantIds.map(String):[];
  if(!(b&&d&&b.battleOver===true&&b.outcome&&b.outcome.type==="victory"&&d.controllerParticipantId===KAKASHI&&opposition.length===1))return null;
  if(d.battleConfigId===PS_BATTLE_CONFIG&&opposition[0]===PS_PARTICIPANT)return{battleConfigId:PS_BATTLE_CONFIG,participantRef:PS_PARTICIPANT,ryo:DOWNSTREAM_REWARD_RYO};
  if(d.battleConfigId===AMT_BATTLE_CONFIG&&opposition[0]===AMT_PARTICIPANT)return{battleConfigId:AMT_BATTLE_CONFIG,participantRef:AMT_PARTICIPANT,ryo:DOWNSTREAM_REWARD_RYO};
  return null;
}
function isExactDownstreamCashVictoryBattle(b=battle()){return !!downstreamCashSpec35740(b);}
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
  const attemptData=attempt&&attempt.data&&typeof attempt.data==="object"?attempt.data:{};
  const skillId=attempt&&attempt.skillId||attemptData.skillId||attemptData.preparedSkillId||attemptData.actionSkillId||null;
  const skill=skillDefinition(skillId,b);
  const direct=norm(skill&&skill.primaryDiscipline);
  if(TECHNICAL.has(direct))return direct;
  const attemptDiscipline=norm(attemptData.primaryDiscipline||attemptData.effectivePrimaryDiscipline);
  if(TECHNICAL.has(attemptDiscipline))return attemptDiscipline;
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
function technicalEvidenceMeta(attempt,b=battle()){
  const data=attempt&&attempt.data&&typeof attempt.data==="object"?attempt.data:{};
  const skillId=String(attempt&&attempt.skillId||data.skillId||data.preparedSkillId||data.actionSkillId||"");
  const skill=skillDefinition(skillId,b);
  return{
    actionId:String(attempt&&attempt.actionId||""),
    skillId:skillId||null,
    actionLabel:String(skill&&skill.name||data.skillName||data.actionLabel||data.actionName||skillId||attempt&&attempt.actionId||"Unknown action")
  };
}
function staminaEvidenceMeta(packet){
  const data=packet&&packet.data&&typeof packet.data==="object"?packet.data:{};
  const actionId=String(packet&&packet.actionId||data.actionId||"");
  return{
    actionId:actionId||null,
    actionLabel:String(data.skillName||data.actionLabel||data.actionName||data.sourceSkillId||packet&&packet.skillId||actionId||"Hostile damage packet"),
    sourceParticipantId:String(packet&&packet.actorRef&&packet.actorRef.participantId||data.sourceParticipantId||"")||null
  };
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
function developmentEvidenceFromSnapshot(snapshot,battleId){
  const detail={};
  const sources=snapshot&&snapshot.sources&&typeof snapshot.sources==="object"?Object.values(snapshot.sources):[];
  for(const receipt of sources){
    if(!receipt||!receipt.payload||String(receipt.payload.battleOccurrenceId||"")!==String(battleId||""))continue;
    if(receipt.kind!=="discipline_development"&&receipt.kind!=="stamina_development")continue;
    const payload=receipt.payload,discipline=receipt.kind==="stamina_development"?"stamina":norm(payload.discipline),amount=Number(payload.amount)||0;
    if(amount<=0)continue;
    detail[discipline]=detail[discipline]||[];
    detail[discipline].push({
      sourceId:String(receipt.sourceId||payload.sourceId||""),
      amount,
      executionClass:String(payload.executionClass||""),
      actionId:String(payload.actionId||""),
      skillId:String(payload.skillId||""),
      actionLabel:String(payload.actionLabel||payload.skillId||payload.actionId||receipt.sourceId||"Battle evidence"),
      mitigationAmount:Number(payload.mitigationAmount)||0,
      sourceParticipantId:String(payload.sourceParticipantId||"")
    });
  }
  return detail;
}
function committedDevelopmentEvidence35740(b=battle()){
  const id=battleOccurrenceId(b);if(!id)return{};
  try{
    if(typeof getAcademyKakashiOriginRewardSnapshot34800==="function")return developmentEvidenceFromSnapshot(getAcademyKakashiOriginRewardSnapshot34800(),id);
  }catch(_error){}
  return{};
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
  if(isExceptionalThreeVsOneVictory35740(b)){
    b.rewards.kakashiDeferredExceptionalFieldExecution=true;
    b.rewards.kakashiDeferredOriginRewardComponents={exceptionalFieldExecutionRyo:THREE_V_ONE_DEFERRED_RYO,academyTrainingTantoEntitled:true,itemId:THREE_V_ONE_TANTO_ID,commitTiming:"terminal_debrief"};
  }
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

function prepareImmediateDownstreamCash35740(b=battle()){
  const spec=downstreamCashSpec35740(b);if(!spec)return{success:false,qualifies:false,reason:"not_exact_ps_or_amt_solo_victory"};
  if(typeof ensureAcademyKakashiDownstreamBattleCashEntitlement34800!=="function"||typeof getAcademyKakashiDownstreamBattleCashRewardState34800!=="function"){
    return{success:false,qualifies:true,reason:"kakashi_downstream_cash_reward_adapter_missing"};
  }
  const ensured=ensureAcademyKakashiDownstreamBattleCashEntitlement34800(b);if(!ensured||ensured.success!==true)return ensured||{success:false,reason:"kakashi_downstream_cash_entitlement_failed"};
  const state=getAcademyKakashiDownstreamBattleCashRewardState34800(b);if(!state||state.success!==true)return state||{success:false,reason:"kakashi_downstream_cash_reward_state_missing"};
  b.rewards=b.rewards&&typeof b.rewards==="object"?b.rewards:{};
  b.rewards.generated=true;b.rewards.claimed=state.claimed===true;b.rewards.ryo=spec.ryo;b.rewards.exp=0;b.rewards.items=[];b.rewards.rareDrops=[];
  b.rewards.kakashiImmediateDownstreamCashReward=true;
  b.rewards.immediateRewardEntitlementId=state.entitlementId;b.rewards.immediateRewardClaimId=state.claimId;
  b.rewards.requiresExplicitPostClaimContinue=true;b.rewards.terminalOriginRewardDeferred=true;
  return{success:true,qualifies:true,spec:clone(spec),state:clone(state)};
}
function syncBattleDevelopment35740(b=battle()){
  if(!isKakashiOriginBattle(b))return{success:false,reason:"not_kakashi_origin_battle"};
  const id=battleOccurrenceId(b);if(!id)return{success:false,reason:"kakashi_battle_occurrence_missing"};
  const rows=evidenceRows(b);

  if(typeof recordAcademyKakashiTechnicalDevelopment34800!=="function"||typeof recordAcademyKakashiStaminaDevelopment34800!=="function"){
    return{success:false,reason:"kakashi_reward_development_adapter_missing"};
  }

  const attempts=rows.filter(row=>row&&row.eventType==="action_attempted"&&row.actorRef&&row.actorRef.side==="player"&&row.actionId);
  for(const attempt of attempts){
    const discipline=disciplineForAction(attempt,rows,b);if(!discipline)continue;
    const executionClass=hasMaterialEffect(attempt,rows)?"effective":"attempt";
    const meta=technicalEvidenceMeta(attempt,b);
    recordAcademyKakashiTechnicalDevelopment34800({
      sourceId:String(attempt.evidenceId||attempt.actionId),discipline,executionClass,subjectId:KAKASHI,battleOccurrenceId:id,
      actionId:meta.actionId,skillId:meta.skillId,actionLabel:meta.actionLabel
    });
  }

  const staminaPackets=rows.filter(row=>{
    if(!row||row.eventType!=="damage_resolved"||!row.targetRef||row.targetRef.side!=="player")return false;
    const data=row.data||{};
    return Number(data.resolvedAttackPL)>0&&Number(data.staminaMitigationAmount)>0;
  });
  for(const packet of staminaPackets){
    const meta=staminaEvidenceMeta(packet);
    recordAcademyKakashiStaminaDevelopment34800({
      sourceId:String(packet.evidenceId||packet.actionId||id+":stamina"),mitigationAmount:Number(packet.data&&packet.data.staminaMitigationAmount)||0,battleOccurrenceId:id,subjectId:KAKASHI,
      actionId:meta.actionId,actionLabel:meta.actionLabel,sourceParticipantId:meta.sourceParticipantId
    });
  }

  const summary=readCommittedSummary(b);
  const downstream=isExactDownstreamCashVictoryBattle(b)?prepareImmediateDownstreamCash35740(b):null;
  if(downstream&&downstream.success===true&&downstream.state&&downstream.state.entitlement&&downstream.state.entitlement.materialReward)summary.materialBattleReward=clone(downstream.state.entitlement.materialReward);
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
function rewardDisclosureMarkup35740(summary,b=battle()){
  const evidence=committedDevelopmentEvidence35740(b),reward=b&&b.rewards&&typeof b.rewards==="object"?b.rewards:{};
  const parts=[];
  parts.push('<span><b>IMMEDIATE RYŌ</b> '+(Number(reward.ryo)||0)+'</span>');
  const items=Array.isArray(reward.items)?reward.items:[];
  parts.push('<span><b>ITEMS</b> '+(items.length?items.map(x=>esc(String(x.name||x.id||"Item"))+' ×'+(Number(x.quantity)||1)).join(", "):"NONE")+'</span>');
  parts.push('<span><b>GENERIC CHARACTER EXP</b> '+(Number(reward.exp)||0)+'</span>');
  for(const row of summary&&Array.isArray(summary.rows)?summary.rows:[]){
    const detail=Array.isArray(evidence[row.discipline])?evidence[row.discipline]:[];
    const causes=detail.length?detail.map(src=>{
      if(row.discipline==="stamina")return esc(src.actionLabel)+' — mitigated '+src.mitigationAmount+' damage · +'+src.amount+' EXP';
      return esc(src.actionLabel)+' — '+esc(src.executionClass||"committed execution")+' · +'+src.amount+' EXP';
    }).join("<br>"):"Committed Battle evidence · source detail unavailable";
    parts.push('<span><b>'+esc(disciplineLabel(row.discipline).toUpperCase())+' +'+(Number(row.amount)||0)+' EXP</b><br>'+causes+'</span>');
  }
  if(isExceptionalThreeVsOneVictory35740(b))parts.push('<span><b>3-V-1 DEFERRED ORIGIN REWARD QUALIFIED</b> Exceptional field execution: +'+THREE_V_ONE_DEFERRED_RYO+' Ryō at terminal debrief · Academy Training Tantō entitlement at terminal debrief</span>');
  parts.push('<span><b>ORIGIN / DEBRIEF REWARDS</b> evaluated separately at terminal debrief</span>');
  return '<details class="alpha-victory-reward-disclosure"><summary>BATTLE BREAKDOWN</summary><div>'+parts.join("")+'</div></details>';
}
function enhanceKakashiVictory35740(container){
  const b=battle();if(!isKakashiOriginBattle(b)||!container||typeof container.querySelector!=="function")return false;
  const summary=b.kakashiOriginDevelopmentSummary||readCommittedSummary(b);
  attachSummaryToBattle(b,summary);
  const immediate=isExactMiVictoryBattle(b)?prepareImmediateMiReward35740(b):null;
  const downstream=isExactDownstreamCashVictoryBattle(b)?prepareImmediateDownstreamCash35740(b):null;
  if(downstream&&downstream.success===true&&downstream.state&&downstream.state.entitlement&&downstream.state.entitlement.materialReward)summary.materialBattleReward=clone(downstream.state.entitlement.materialReward);
  attachSummaryToBattle(b,summary);
  const isImmediate=!!(immediate&&immediate.success===true&&immediate.qualifies===true);
  const isDownstreamCash=!!(downstream&&downstream.success===true&&downstream.qualifies===true);
  const isThreeVOne=isExceptionalThreeVsOneVictory35740(b);
  const hasImmediateMaterial=isImmediate||isDownstreamCash;
  const claimed=!!(b.rewards&&b.rewards.claimed===true);
  const immediateRyo=Number(summary&&summary.materialBattleReward&&summary.materialBattleReward.ryo)||0;

  const rewards=container.querySelector(".alpha-victory-rewards");
  if(rewards){
    if(isImmediate){
      rewards.setAttribute("aria-label","Immediate Battle reward and Battle development");
      rewards.innerHTML=`
        <div class="alpha-victory-metric"><span>BATTLE REWARD</span><strong>50 RYŌ</strong></div>
        <div class="alpha-victory-metric"><span>ITEM</span><strong>×1</strong></div>
        <div class="alpha-victory-list"><span>FIELD RECOVERY PILL</span><div><span>${claimed?"CLAIMED":"READY TO CLAIM"}</span></div></div>
        <div class="alpha-victory-list is-rare"><span>BATTLE DEVELOPMENT</span><div>${developmentListMarkup(summary)}${rewardDisclosureMarkup35740(summary,b)}</div></div>
      `;
    }else{
      rewards.setAttribute("aria-label","Battle development and deferred Origin rewards");
      rewards.innerHTML=`
        <div class="alpha-victory-metric"><span>DISCIPLINE EXP</span><strong>+${Number(summary&&summary.totalExp)||0}</strong></div>
        <div class="alpha-victory-metric"><span>RYŌ</span><strong>${immediateRyo>0?`+${immediateRyo}`:"0"}</strong></div>
        <div class="alpha-victory-list"><span>DEVELOPMENT</span><div>${developmentListMarkup(summary)}${rewardDisclosureMarkup35740(summary,b)}</div></div>
        <div class="alpha-victory-list is-rare"><span>ORIGIN REWARDS</span><div><span>${isThreeVOne?`3-V-1 EXCEPTIONAL FIELD EXECUTION · +${THREE_V_ONE_DEFERRED_RYO} RYŌ + ACADEMY TRAINING TANTŌ · DEFERRED TO TERMINAL DEBRIEF`:"Evaluated at terminal debrief"}</span></div></div>
      `;
    }
  }

  const header=container.querySelector(".alpha-victory-header p");
  if(header)header.textContent=hasImmediateMaterial
    ?"Battle reward, field development and Story continuation are separate runtime steps."
    :"Battle outcome, field development and Story continuation remain separate runtime steps.";

  const footer=container.querySelector(".alpha-victory-footer p");
  if(footer)footer.textContent=isImmediate
    ?(claimed
      ?"Battle reward claimed. Battle development remains committed. Return to Story to continue the Chronicle."
      :"Claim 50 Ryō and Field Recovery Pill ×1 now. Battle development is already committed from executed actions. Return to Story unlocks after the material reward claim.")
    :isDownstreamCash
      ?(claimed
        ?"50 Ryō Battle reward claimed. Battle development remains committed. Origin/debrief rewards remain separate."
        :"Claim 50 Ryō now. Battle development is already committed from executed actions; Origin/debrief rewards remain separate.")
      :isThreeVOne
        ?`This 3-v-1 victory gives no immediate Ryō or item. Action-derived development is already committed. It qualifies Exceptional Field Execution: +${THREE_V_ONE_DEFERRED_RYO} Ryō and Academy Training Tantō are deferred to terminal debrief.`
        :"Battle development is committed from executed actions. Origin Ryō and item/equipment rewards are evaluated at terminal debrief. Claim records this Battle Chronicle and returns to Story.";

  const button=container.querySelector(".alpha-victory-footer .victory-continue");
  if(button){
    if(hasImmediateMaterial)button.textContent=claimed?"RETURN TO STORY":"CLAIM BATTLE REWARD";
    else if(!claimed)button.textContent="CLAIM BATTLE RESULT";
  }

  const state=container.querySelector(".alpha-victory-claim-state");
  if(state){
    if(hasImmediateMaterial)state.textContent=claimed?"REWARD CLAIMED":"BATTLE REWARD CLAIM PENDING";
    else if(!claimed)state.textContent="RESULT CLAIM PENDING";
  }

  const dts=[...(container.querySelectorAll?container.querySelectorAll(".alpha-victory-chronicle dt"):[])];
  const rewardsDt=dts.find(node=>["REWARDS","DEVELOPMENT","BATTLE REWARD"].includes(String(node.textContent||"").trim().toUpperCase()));
  if(rewardsDt){
    const dd=rewardsDt.parentElement&&rewardsDt.parentElement.querySelector("dd");
    if(isImmediate){
      rewardsDt.textContent="BATTLE REWARD";
      if(dd)dd.textContent=claimed?"50 RYŌ + FIELD RECOVERY PILL ×1 · CLAIMED":"50 RYŌ + FIELD RECOVERY PILL ×1";
    }else if(isDownstreamCash){
      rewardsDt.textContent="BATTLE REWARD";
      if(dd)dd.textContent=claimed?"50 RYŌ · CLAIMED":"50 RYŌ";
    }else if(isThreeVOne){
      rewardsDt.textContent="DEVELOPMENT + DEFERRED ORIGIN REWARD";
      if(dd)dd.textContent=`${(Number(summary&&summary.totalExp)||0)>0?`+${summary.totalExp} EXP COMMITTED · `:""}+${THREE_V_ONE_DEFERRED_RYO} RYŌ + ACADEMY TRAINING TANTŌ DEFERRED`;
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
      if(isExactMiVictoryBattle(b))prepareImmediateMiReward35740(b);else if(isExactDownstreamCashVictoryBattle(b))prepareImmediateDownstreamCash35740(b);
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
    const immediate=b&&isExactMiVictoryBattle(b)&&typeof getAcademyKakashiMiVictoryBattleRewardState34800==="function"?getAcademyKakashiMiVictoryBattleRewardState34800(b):b&&isExactDownstreamCashVictoryBattle(b)&&typeof getAcademyKakashiDownstreamBattleCashRewardState34800==="function"?getAcademyKakashiDownstreamBattleCashRewardState34800(b):null;
    const projected=result&&typeof result==="object"?{...result,developmentSummary:clone(summary),rewardGranted:!!(immediate&&immediate.claimed===true),immediateBattleReward:immediate&&immediate.success===true?clone(immediate):null}:result;
    if(b&&projected&&typeof projected==="object"&&projected.battleConfigId&&projected.bindingRef&&projected.battleOccurrenceId)b.kakashiOriginStoryReturnResultSnapshot=clone(projected);
    return projected;
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
      if(isExceptionalThreeVsOneVictory35740(b))result.rewards.deferredOriginReward={exceptionalFieldExecution:true,ryo:THREE_V_ONE_DEFERRED_RYO,academyTrainingTantoEntitled:true,itemId:THREE_V_ONE_TANTO_ID,commitTiming:"terminal_debrief"};
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
    const b=battle(),mi=isExactMiVictoryBattle(b),downstream=isExactDownstreamCashVictoryBattle(b);
    if(!mi&&!downstream)return priorClaimRewards.apply(this,arguments);
    const claim=mi
      ?(typeof commitAcademyKakashiMiVictoryBattleReward34800==="function"?commitAcademyKakashiMiVictoryBattleReward34800(b):null)
      :(typeof commitAcademyKakashiDownstreamBattleCashReward34800==="function"?commitAcademyKakashiDownstreamBattleCashReward34800(b):null);
    if(!claim||claim.success!==true)return false;
    if(mi)prepareImmediateMiReward35740(b);else prepareImmediateDownstreamCash35740(b);
    if(b.rewards)b.rewards.claimed=true;
    b.claimedAt=Date.now();
    try{if(typeof projectAcademyKakashiOriginBattleResult==="function")projectAcademyKakashiOriginBattleResult();}catch(_error){}
    try{if(typeof recordBattleChronicle==="function")recordBattleChronicle();}catch(_error){}
    try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
    try{if(typeof saveTestState==="function")saveTestState();}catch(_error){}
    return true;
  };
  try{claimCurrentBattleRewards=globalThis.claimCurrentBattleRewards;}catch(_error){}
}

function diagnostics(){
  const sync=syncBattleDevelopment35740.toString(),present=enhanceKakashiVictory35740.toString();
  const legacyDeferredRyoLabel="<span>RYŌ</span><strong>"+["DE","BRIEF"].join("")+"</strong>";
  const legacyRewardQuestion=["WHY"," THESE REWARDS?"].join("");
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_battle_development_35740_v10_2026_09_20",
    exactAuthorities:AUTHORITIES.world==="91f5969b20e270b3ef7d148342f28a1668b4eba1"&&AUTHORITIES.immediateMiReward==="fe715e81cb76b3c4e4a7a8ccbc48ae04bc3b99da"&&AUTHORITIES.downstreamCashReward==="7446e80c7f2cb9d004ffd914e11c0c77e7321c2b"&&AUTHORITIES.rewardDisclosure==="aad106b6a64ede81556aea0df0cc9fe4b8830178"&&AUTHORITIES.combat==="e14a65f181d6384d1a4010ed805f1ca8e6c6c6e8"&&AUTHORITIES.progression==="54314cc29e1374783cae0a0d90654cc9a2316a45"&&AUTHORITIES.acquisition==="b83884adb70f1e74e62f96ab96848c1ec33704f9",
    restoredDeploymentUses34300Recovery:deployment.toString().includes("recoverAcademyKakashiOriginBattleDeployment34300"),
    storyReturnResultSnapshotOwnedByBattleProjector:globalThis.projectAcademyKakashiOriginBattleResult.toString().includes("kakashiOriginStoryReturnResultSnapshot")&&globalThis.claimCurrentBattleRewards.toString().includes("projectAcademyKakashiOriginBattleResult"),
    technicalDevelopmentUses34800:sync.includes("recordAcademyKakashiTechnicalDevelopment34800"),
    storyDeploymentOwnsPlayerEvidence:sync.includes('row.actorRef.side==="player"')&&!sync.includes("row.actorRef.participantId===KAKASHI")&&!sync.includes("row.targetRef.participantId!==KAKASHI"),
    resolvedEvidenceMayOwnDiscipline:disciplineForAction.toString().includes("attemptData.primaryDiscipline")&&disciplineForAction.toString().includes("row.data.primaryDiscipline")&&sync.includes('row.eventType==="action_attempted"')&&!sync.includes("&&row.skillId&&row.actionId"),
    staminaDevelopmentUses34800:sync.includes("recordAcademyKakashiStaminaDevelopment34800"),
    exactCombatEvidence:sync.includes('eventType==="action_attempted"')&&sync.includes('eventType!=="damage_resolved"')===false&&sync.includes("staminaMitigationAmount"),
    genericExpNotGranted:!sync.includes("playerData.exp")&&!sync.includes("rewards.exp="),
    immediateMiRewardUses34800:prepareImmediateMiReward35740.toString().includes("ensureAcademyKakashiMiVictoryBattleEntitlement34800")&&prepareImmediateMiReward35740.toString().includes("MI_REWARD_RYO")&&prepareImmediateMiReward35740.toString().includes("MI_REWARD_ITEM_ID"),
    downstreamCashUses34800:prepareImmediateDownstreamCash35740.toString().includes("ensureAcademyKakashiDownstreamBattleCashEntitlement34800")&&prepareImmediateDownstreamCash35740.toString().includes("getAcademyKakashiDownstreamBattleCashRewardState34800"),
    downstreamCashExact:downstreamCashSpec35740.toString().includes("PS_BATTLE_CONFIG")&&downstreamCashSpec35740.toString().includes("AMT_BATTLE_CONFIG")&&DOWNSTREAM_REWARD_RYO===50,
    sequentialSoloMiCovered:MI_BATTLE_CONFIGS.has(MI_BATTLE_CONFIG)&&MI_BATTLE_CONFIGS.has(MI_SEQUENTIAL_BATTLE_CONFIG)&&isExactMiVictoryBattle.toString().includes("MI_BATTLE_CONFIGS"),
    threeVsOneDisclosureExact:THREE_V_ONE_DEFERRED_RYO===25&&THREE_V_ONE_TANTO_ID==="academy_training_tanto"&&rewardDisclosureMarkup35740.toString().includes("3-V-1 DEFERRED ORIGIN REWARD QUALIFIED")&&enhanceKakashiVictory35740.toString().includes("no immediate Ryō or item")&&attachSummaryToBattle.toString().includes("kakashiDeferredExceptionalFieldExecution"),
    causalRewardDisclosure:rewardDisclosureMarkup35740.toString().includes("BATTLE BREAKDOWN")&&!rewardDisclosureMarkup35740.toString().includes(legacyRewardQuestion)&&rewardDisclosureMarkup35740.toString().includes("mitigated")&&technicalEvidenceMeta.toString().includes("actionLabel"),
    progressionProjectedSeparately:attachSummaryToBattle.toString().includes("rewards.progression")&&attachSummaryToBattle.toString().includes("terminalOriginRewardDeferred"),
    chronicleCarriesProgression:typeof globalThis.createBattleChronicleResult==="function"&&globalThis.createBattleChronicleResult.toString().includes("result.rewards.progression"),
    immediateVictoryPresentation:present.includes("BATTLE REWARD")&&present.includes("50 RYŌ")&&present.includes("FIELD RECOVERY PILL")&&present.includes("CLAIM BATTLE REWARD")&&present.includes("RETURN TO STORY")&&present.includes("REWARD CLAIMED"),
    deferredBattleRyoStaysNumeric:present.includes("immediateRyo")&&present.includes("<span>RYŌ</span><strong>${immediateRyo>0?`+${immediateRyo}`:\"0\"}</strong>")&&!present.includes(legacyDeferredRyoLabel),
    exactClaimUses34800:typeof globalThis.claimCurrentBattleRewards==="function"&&globalThis.claimCurrentBattleRewards.toString().includes("commitAcademyKakashiMiVictoryBattleReward34800")&&globalThis.claimCurrentBattleRewards.toString().includes("commitAcademyKakashiDownstreamBattleCashReward34800"),
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
globalThis.prepareAcademyKakashiImmediateDownstreamCash35740=prepareImmediateDownstreamCash35740;
globalThis.enhanceAcademyKakashiVictory35740=enhanceKakashiVictory35740;
globalThis.runAcademyKakashiBattleDevelopment35740Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEVELOPMENT_35740=Object.freeze({patchId:PATCH_ID,route:ROUTE,authorities:AUTHORITIES,threeVsOne:Object.freeze({battleConfigId:THREE_V_ONE_BATTLE_CONFIG,deferredRyo:THREE_V_ONE_DEFERRED_RYO,itemId:THREE_V_ONE_TANTO_ID}),browserGoldenClaimed:false});
})();
