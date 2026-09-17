// ALPHA ACADEMY ORIGIN STORY SCENES 32900 — shared foundation.
// Consumes #135 durable Writing authority through the existing Story/runtime systems.
(function installAlphaOrigin32900Core(){
"use strict";
const A={
  patchId:"alpha_origin_scenes_32900_2026_09_12",
  sceneByVariant:Object.freeze({
    academy_hinata:"origin_academy_hinata_prologue",academy_izuno:"origin_academy_izuno_prologue",
    academy_mirai:"origin_academy_mirai_prologue",academy_menma:"origin_academy_menma_prologue",
    academy_kushina:"origin_academy_kushina_prologue",academy_kurenai:"origin_academy_kurenai_prologue",
    academy_iwabee:"origin_academy_iwabee_prologue",academy_metal_lee:"origin_academy_metal_lee_prologue",
    academy_kakashi:"origin_academy_kakashi_anbu_retrieval",academy_obito:"origin_academy_obito_journey_to_training"
  }),
  registrations:[],battleFailClosedScenes:new Set(),
  clone(v){if(typeof cloneProgressionData==="function")return cloneProgressionData(v);return v&&typeof v==="object"?JSON.parse(JSON.stringify(v)):v;},
  active(){return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;},
  local(){const a=this.active();return a&&a.localContext&&typeof a.localContext==="object"?a.localContext:{};},
  history(){if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];return playerData.activityHistory;},
  findOccurrence(id){return this.history().find(r=>r&&r.occurrenceId===id&&r.sourceOccurrenceId===id)||null;},
  commitOccurrence(originId,occurrenceId,fact={},rowIds=[],options={}){
    const acq=typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():null;
    if(!acq||acq.chronicleOriginVariantId!==originId)return{success:false,reason:"origin_occurrence_selected_origin_mismatch"};
    let record=this.findOccurrence(occurrenceId);
    if(record&&record.actorVariantId!==originId)return{success:false,reason:"origin_occurrence_existing_actor_mismatch"};
    if(!record){
      const active=this.active(), participantRefs=[...new Set([originId,...(options.participantRefs||[])].filter(Boolean))];
      record={historyScope:typeof getCurrentChronicleOccurrenceHistoryScope==="function"?getCurrentChronicleOccurrenceHistoryScope("origin_story_occurrence"):null,
        type:options.type||"origin_story_occurrence",activity:"story_scene",completed:true,committed:true,success:options.success!==false,
        outcome:options.outcome||"origin_story_occurrence_resolved",occurrenceId,sourceOccurrenceId:occurrenceId,actorVariantId:originId,
        protagonistParticipantId:originId,participantRefs,sceneId:active&&active.sceneId||this.sceneByVariant[originId]||null,
        storySceneInstanceId:active&&active.instanceId||null,fact:this.clone(fact||{}),data:this.clone(fact||{}),
        sourceRefs:Array.isArray(options.sourceRefs)?this.clone(options.sourceRefs):[],timestamp:Date.now()};
      this.history().push(record);if(typeof activityHistory!=="undefined")activityHistory=playerData.activityHistory;if(typeof savePlayerData==="function")savePlayerData();
    }
    const receipts=[];
    for(const rowId of rowIds){
      if(typeof consumeStaticOriginSourceOccurrence!=="function")return{success:false,reason:"origin_consequence_consumer_missing",occurrenceId,rowId};
      const result=consumeStaticOriginSourceOccurrence(rowId,record);if(!result||result.success!==true)return{success:false,reason:result&&result.reason||"origin_consequence_consume_failed",occurrenceId,rowId,result};receipts.push(result);
    }
    return{success:true,occurrenceId,record:this.clone(record),receipts};
  },
  commitRequest(requestId,originId,occurrenceId,factResolver,rowIdsResolver,optionsResolver){
    return{requestId,kind:"domain",resolve:()=>{const ctx=this.clone(this.local());return this.commitOccurrence(originId,occurrenceId,
      typeof factResolver==="function"?factResolver(ctx):(factResolver||{}),typeof rowIdsResolver==="function"?rowIdsResolver(ctx):(rowIdsResolver||[]),
      typeof optionsResolver==="function"?optionsResolver(ctx):(optionsResolver||{}));}};
  },
  completionRequest(originId,evidenceIds){return{requestId:`complete_${originId}_origin_32900`,kind:"domain",resolve:()=>{
    const ids=(evidenceIds||[]).filter(id=>!!this.findOccurrence(id));return typeof completeChronicleOriginPrologue==="function"?completeChronicleOriginPrologue(originId,ids):{success:false,reason:"origin_completion_authority_missing"};}};},
  unavailableBattle(sceneId,label){this.battleFailClosedScenes.add(sceneId);return()=>({available:false,knownBlocker:label});},
  choice(choiceId,label,nextBeatId,contextPatch=null,extra={}){return{choiceId,label,nextBeatId,contextPatch,...extra};},
  register(def){if(typeof unregisterStoryScene==="function")unregisterStoryScene(def.sceneId);const r=registerStoryScene(def);this.registrations.push(r);return r;}
};
globalThis.SC_ALPHA_ORIGIN_32900=A;
})();

// ============================================================================
// ISSUE #190 — PRE-PUBLIC-ALPHA LOCALISATION ACTIVATION
//
// 32900-core is the earliest small, always-loaded production seam before the
// dynamic front-door chain. Localisation remains presentation-only and has no
// dependency on Origin semantics. 35510 owns broad base Story/Journey strings;
// 35520 owns the final Writing-approved 33600 expression pass and is loaded
// strictly after 35510 has registered its catalogue.
// ============================================================================
(function activateAlphaLocalisation35500From32900Core(){
  "use strict";
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;
  const loadFinalWriting=()=>{
    if(!globalThis.SC_ALPHA_LOCALISATION_35500||!globalThis.SC_ALPHA_LOCALISATION_CONTENT_35510)return false;
    if(globalThis.SC_ALPHA_LOCALISATION_FINAL_WRITING_35520||document.getElementById("sc-alpha-localisation-final-writing-35520-script"))return true;
    const finalScript=document.createElement("script");
    finalScript.id="sc-alpha-localisation-final-writing-35520-script";
    finalScript.src="runtime/alpha-localisation-final-writing-35520.js";
    finalScript.async=false;
    document.head.appendChild(finalScript);
    return true;
  };
  const loadContent=()=>{
    if(!globalThis.SC_ALPHA_LOCALISATION_35500)return false;
    if(globalThis.SC_ALPHA_LOCALISATION_CONTENT_35510)return loadFinalWriting();
    const existingContent=document.getElementById("sc-alpha-localisation-content-35510-script");
    if(existingContent){existingContent.addEventListener("load",loadFinalWriting,{once:true});return true;}
    const contentScript=document.createElement("script");
    contentScript.id="sc-alpha-localisation-content-35510-script";
    contentScript.src="runtime/alpha-localisation-content-35510.js";
    contentScript.async=false;
    contentScript.addEventListener("load",loadFinalWriting,{once:true});
    document.head.appendChild(contentScript);
    return true;
  };
  if(globalThis.SC_ALPHA_LOCALISATION_35500){loadContent();return;}
  const existing=document.getElementById("sc-alpha-localisation-35500-script");
  if(existing){existing.addEventListener("load",loadContent,{once:true});return;}
  const script=document.createElement("script");
  script.id="sc-alpha-localisation-35500-script";
  script.src="runtime/alpha-localisation-35500.js";
  script.async=false;
  script.addEventListener("load",loadContent,{once:true});
  document.head.appendChild(script);
})();
