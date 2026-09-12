// =========================================================
// ISSUE #112 — LIVE ARC-1 PRESSURE / SEMANTIC REFILL CORRECTION
// This file does not create a second World system. It only drives the already
// registered #112 opportunities through the existing worldEventRuntime setters.
// =========================================================
(function installKonohaWorld112Correction(){
  "use strict";
  const RECEIPT="world_activation_konoha_v1_pressure_migration_2026_09_12";
  const STANDING="konoha_alpha_standing_pool_v1";
  const PRESSURE="konoha_arc1_pressure_pool_v1";

  function rows(){return Array.isArray(window.SC_KONOHA_ALPHA_WORLD_ROWS)?window.SC_KONOHA_ALPHA_WORLD_ROWS:[];}
  function state(id,dimension){return typeof getWorldEventDimensionState==="function"?getWorldEventDimensionState(dimension,id):{};}
  function isActive(row){const w=state(row.id,"worldLifecycleByEventId"),a=state(row.id,"actionabilityByOpportunityId"),r=state(row.id,"resolutionByOpportunityId");return w.projectable===true&&a.available!==false&&r.closed!==true;}
  function knownAccessible(id){
    if(/^KON-P\d+$/.test(id))return true;
    if(typeof getAlphaKonohaV3ExplicitKnowledgeState!=="function")return false;
    return ["identified","actionable"].includes(getAlphaKonohaV3ExplicitKnowledgeState(id));
  }
  function nextOccurrence(row){const prior=state(row.id,"resolutionByOpportunityId");const sequence=(Number(prior.sequence)||0)+1;return {sequence,occurrenceId:`${row.id}::${sequence}`,prior};}
  function activate(row){
    if(!row||isActive(row)||!knownAccessible(row.host))return false;
    const {sequence,occurrenceId,prior}=nextOccurrence(row);
    if(row.finite===true&&prior.everClosed===true)return false;
    const definition=typeof getRegisteredWorldEventOpportunity==="function"?getRegisteredWorldEventOpportunity(row.id):null;
    setWorldEventLifecycle(row.id,{projectable:true,active:true,manifestId:"sc_world_alpha_activation_konoha_v1_2026_09_11"},{save:false});
    setOpportunityDiscovery(row.id,{level:"discovered",label:definition&&definition.presentation?definition.presentation.label:row.id},{save:false});
    setOpportunityActionability(row.id,{available:true,reason:null,reasonVisible:false},{save:false});
    setOpportunityResolution(row.id,{occurrenceId,sequence,closed:false,visibleState:"active",rewardGranted:false,everClosed:prior.everClosed===true},{save:false});
    setOpportunityTracking(row.id,{tracked:false,leadState:"active",mandatory:false},{save:false});
    if(Array.isArray(playerData.activityHistory))playerData.activityHistory.push({id:`${occurrenceId}:known`,occurrenceId:`${occurrenceId}:known`,committed:true,type:"opportunity_known",locationId:row.host,data:{opportunityId:row.id,worldOccurrenceId:occurrenceId,manifestId:"sc_world_alpha_activation_konoha_v1_2026_09_11"},sourceRefs:[{type:"world_opportunity",id:row.id,role:"activation"},{type:"location",id:row.host,role:"host"}],timestamp:Date.now()});
    return true;
  }
  function refillStanding({suppressOpportunityId=null}={}){
    const all=rows(),active=all.filter(r=>r.pool===STANDING&&isActive(r));
    const hostCounts=new Map();active.forEach(r=>hostCounts.set(r.host,(hostCounts.get(r.host)||0)+1));
    let count=active.length;
    for(const row of all.filter(r=>r.pool===STANDING&&!isActive(r))){
      if(count>=4)break;
      if(row.id===suppressOpportunityId||!knownAccessible(row.host)||(hostCounts.get(row.host)||0)>=2)continue;
      if(activate(row)){count++;hostCounts.set(row.host,(hostCounts.get(row.host)||0)+1);}
    }
    return count;
  }
  function ensurePressure(){
    if(typeof isAlphaArc1Mission1Complete!=="function"||isAlphaArc1Mission1Complete()!==true)return 0;
    const all=rows(),pressure=all.filter(r=>r.pool===PRESSURE),active=pressure.filter(isActive);let count=active.length;
    for(const row of pressure){if(count>=2)break;if(isActive(row)||!knownAccessible(row.host))continue;if(activate(row))count++;}
    return count;
  }
  function persist(){if(typeof savePlayerData==="function")savePlayerData();else if(typeof saveTestState==="function")saveTestState();}
  function semanticRefill({suppressOpportunityId=null,save=true}={}){const standing=refillStanding({suppressOpportunityId}),pressure=ensurePressure();if(save)persist();return{standing,pressure};}

  // Wrap the semantic action executor. Resolution is already committed by the
  // registered opportunity before this returns, so refill cannot be caused by
  // render/open/hover/save-load presentation.
  if(typeof executeSelectedOpportunityAction==="function"){
    const priorExecute=executeSelectedOpportunityAction;
    executeSelectedOpportunityAction=function issue112SemanticWorldRefill(actionId){
      const selected=typeof getSelectedWorldOpportunity==="function"?getSelectedWorldOpportunity():null;
      const beforeId=selected&&selected.opportunityId||null;
      const result=priorExecute.apply(this,arguments);
      if(result&&result.success===true)semanticRefill({suppressOpportunityId:beforeId,save:true});
      return result;
    };
  }

  // Existing-save migration only: if a save was already post-M1 when #112 lands,
  // materialise the newly-authorised pressure surface exactly once. This receipt
  // prevents load/reopen rerolls thereafter.
  const history=playerData&&Array.isArray(playerData.activityHistory)?playerData.activityHistory:[];
  const migrated=history.some(r=>r&&r.committed===true&&(r.id===RECEIPT||r.occurrenceId===RECEIPT));
  if(!migrated&&typeof isAlphaArc1Mission1Complete==="function"&&isAlphaArc1Mission1Complete()===true){
    semanticRefill({save:false});
    history.push({id:RECEIPT,occurrenceId:RECEIPT,committed:true,type:"world_activation_migration",locationId:"konohagakure",data:{manifestId:"sc_world_alpha_activation_konoha_v1_2026_09_11",reason:"existing_save_post_m1_pressure_activation"},sourceRefs:[{type:"world_manifest",id:"sc_world_alpha_activation_konoha_v1_2026_09_11",role:"authority"}],timestamp:Date.now()});
    persist();
  }

  window.ensureKonohaAlphaWorldSemanticRefill=semanticRefill;
})();
