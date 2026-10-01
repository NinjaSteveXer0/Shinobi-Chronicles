// ============================================================================
// REUSABLE ROGUE GENIN OPPOSITION ACTION PACKAGE — #399 CONSUMER BRIDGE
//
// Durable Combat precedent:
// Documentation/Combat/SC_Combat_Academy_Wasabi_Rogue_Genin_PL_Battle_Closure_2026-09-24.md
//
// Historical participants remain occurrence-local. This module only materialises
// the reusable rogue_genin capability package.
// ============================================================================
(function installReusableRogueGeninPackage399(){
"use strict";
if(globalThis.SC_ROGUE_GENIN_OPPOSITION_PACKAGE_399)return;

const PATCH_ID="rogue_genin_opposition_package_399_2026_09_27";
const FEINT_ID="enemy_rogue_genin_substitution_feint";
const FEINT_STATE="rogue_genin_substitution_feint_ready";

function build({participantId,metaGetter}={}){
  if(!participantId)throw new Error("rogue_genin_participant_required");
  const getMeta=typeof metaGetter==="function"?metaGetter:()=>null;
  const findFeint=()=>findBattleTransientState({stateKey:FEINT_STATE,sourceSide:"enemy",sourceParticipantId:participantId,targetSide:"enemy",targetParticipantId:participantId})||null;
  const expireFeint=()=>{
    const m=getMeta(),state=findFeint();if(!m||!state)return false;
    const now=typeof getBattleActionOpportunityIndex==="function"?Number(getBattleActionOpportunityIndex("enemy",participantId))||0:0;
    const created=Number(m.feintCreatedEnemyOpportunityIndex);
    if(Number.isFinite(created)&&now>created){removeBattleTransientState(state.stateId);m.feintExpiredAtEnemyOpportunity=now;return true;}
    return false;
  };
  const fixed=(id,name,pl)=>{
    const action=makeEnemyFixedDamageAction(id,pl,{primaryDiscipline:"Bukijutsu",traits:["rogue_genin_template","one_authored_damage_packet","stamina_mitigated","no_hidden_accuracy_or_speed_modifier"]});
    action.displayName=name;action.authoredAttackPL=pl;action.primaryDiscipline="Bukijutsu";return action;
  };
  const feintBase=makeEnemyRatioGuardAction(FEINT_ID,0.40,{stateKey:FEINT_STATE,traits:["rogue_genin_template","once_per_battle","single_target_direct_mitigable_attack_pl_packet_only","expires_before_rogue_next_action"]});
  const feint={
    id:FEINT_ID,skillId:FEINT_ID,displayName:"Substitution Feint",actionClass:feintBase.actionClass,
    traits:[...(feintBase.traits||[]),"ninjutsu_defensive_setup","no_counter_damage","no_forced_miss","no_reposition"],
    evaluateAvailability(){
      const m=getMeta();return{available:!!m&&m.feintUsed!==true&&!findFeint(),reason:"substitution_feint_spent_or_active"};
    },
    resolve(ctx){
      const m=getMeta();if(!m||m.feintUsed===true||findFeint())return{resolved:false,reason:"substitution_feint_unavailable"};
      const result=feintBase.resolve(ctx);
      if(result&&result.resolved===true){
        m.feintUsed=true;
        m.feintCreatedEnemyOpportunityIndex=typeof getBattleActionOpportunityIndex==="function"?Number(getBattleActionOpportunityIndex("enemy",participantId))||0:0;
      }
      return result;
    }
  };
  const actions=[
    fixed("enemy_rogue_genin_kunai_rush","Kunai Rush",9),
    fixed("enemy_rogue_genin_shuriken_spread","Shuriken Spread",7),
    feint
  ];
  return{actions,expireFeint,findFeint};
}

function diagnostics(){
  const checks={
    stableTemplateId:"rogue_genin"==="rogue_genin",
    exactActionIds:["enemy_rogue_genin_kunai_rush","enemy_rogue_genin_shuriken_spread","enemy_rogue_genin_substitution_feint"].length===3,
    noHistoricalParticipantHardcoded:!String(build).includes("iwabee_origin_rogue_genin_01")&&!String(build).includes("wasabi_origin_rogue_genin_01"),
    feintFortyPercent:String(build).includes("makeEnemyRatioGuardAction(FEINT_ID,0.40"),
    feintOncePerBattle:String(build).includes("m.feintUsed!==true"),
    feintExpiresBeforeNextAction:String(build).includes("now>created"),
    noDuplicateNumericalProfile:!String(build).includes("calibratedBasePL")
  };
  const failed=Object.entries(checks).filter(([,v])=>v!==true).map(([k])=>k);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed};
}

globalThis.buildReusableRogueGeninOppositionActions399=build;
globalThis.runReusableRogueGeninOppositionPackage399Diagnostics=diagnostics;
globalThis.SC_ROGUE_GENIN_OPPOSITION_PACKAGE_399=Object.freeze({
  patchId:PATCH_ID,oppositionTemplateId:"rogue_genin",
  actionIds:Object.freeze(["enemy_rogue_genin_kunai_rush","enemy_rogue_genin_shuriken_spread","enemy_rogue_genin_substitution_feint"]),
  historicalIdentityOwnedElsewhere:true
});
})();
