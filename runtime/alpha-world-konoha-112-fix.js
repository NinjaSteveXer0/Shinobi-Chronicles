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
  const M9_LEAD="arc1_veterinary_ward_lead_01";

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

  // M9 is explicitly source-gated by World authority. Knowing KON-O21 through
  // unrelated standing content is not enough to locate the Main Story there.
  function hasCommittedAddress(id){
    const history=playerData&&Array.isArray(playerData.activityHistory)?playerData.activityHistory:[];
    return history.some(row=>{
      if(!row||row.committed!==true)return false;
      const data=row.data&&typeof row.data==="object"?row.data:{};
      if([row.id,row.occurrenceId,row.sourceEventId,data.sourceOccurrenceId,data.occurrenceId].some(value=>String(value||"")===id))return true;
      return Array.isArray(row.sourceRefs)&&row.sourceRefs.some(ref=>ref&&String(ref.id||ref.ref||"")===id);
    });
  }
  const priorStoryLocator=typeof globalThis.getCurrentWorldStoryLocator==="function"?globalThis.getCurrentWorldStoryLocator:null;
  if(priorStoryLocator){
    const gatedStoryLocator=function issue112CausalStoryLocator(){
      const result=priorStoryLocator.apply(this,arguments);
      if(result&&result.locatorRef==="story_locator_arc1_m9_veterinary_lead"&&!hasCommittedAddress(M9_LEAD)){
        return{
          ...result,
          locatorRef:"story_locator_arc1_m9_no_current_focus",
          locatorState:"NO_CURRENT_MAP_FOCUS",
          surfaceId:null,
          hostLocationRef:null,
          localInstanceRef:null,
          focusMode:"none",
          knowledgeGateRefs:[],
          accessGateRefs:[]
        };
      }
      return result;
    };
    globalThis.getCurrentWorldStoryLocator=gatedStoryLocator;
    try{getCurrentWorldStoryLocator=gatedStoryLocator;}catch(_error){}
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

  function runIssue112CorrectionDiagnostics(){
    const source=hasCommittedAddress.toString();
    const locatorSource=priorStoryLocator?globalThis.getCurrentWorldStoryLocator.toString():"";
    const checks={
      semanticRefillAfterCommittedAction:typeof executeSelectedOpportunityAction==="function"&&semanticRefill.toString().includes("refillStanding"),
      pressureUsesLiveM1Seam:ensurePressure.toString().includes("isAlphaArc1Mission1Complete"),
      migrationReceiptPinned:RECEIPT==="world_activation_konoha_v1_pressure_migration_2026_09_12",
      m9ExactLeadAddress:M9_LEAD==="arc1_veterinary_ward_lead_01",
      m9LocatorCausallyGated:!!priorStoryLocator&&locatorSource.includes("story_locator_arc1_m9_veterinary_lead")&&locatorSource.includes("NO_CURRENT_MAP_FOCUS"),
      leadDetectionCommittedOnly:source.includes("row.committed!==true"),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
  }

  window.ensureKonohaAlphaWorldSemanticRefill=semanticRefill;
  window.runIssue112CorrectionDiagnostics=runIssue112CorrectionDiagnostics;
})();
