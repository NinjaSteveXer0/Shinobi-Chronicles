// ============================================================================
// SHINOBI CHRONICLES — ISSUE #121 PRODUCTION STORY BINDINGS
// First live binding: Arc 1 / Mission 11 Recall-contact decision.
//
// Durable Story authority:
// - Arc1-3_Retrospective_12x12_Structural_Reconciliation_2026-09-13.md
//   commit d5a2d9577e45e1dbefb55c0202bb0327aa94e811
// - existing production Story scene `scene_arc1_m11_moroboshi_confrontation`
//
// This adapter DOES NOT rewrite M11, invent choices, or own factual outcomes.
// It replaces the existing static availability branch at `m11_recall_intent`
// with #121 semantic-intent generation while delegating factual commitment to
// the already-authoritative `commitAlphaM11RecallIntent` resolver.
// ============================================================================
(function installIssue121ProductionBindings(){
  "use strict";

  const PATCH_ID="alpha_mission_choice_production_bindings_121_2026_09_13";
  const SCENE_ID="scene_arc1_m11_moroboshi_confrontation";
  const BEAT_ID="m11_recall_intent";
  const ARC_ID="arc1";
  const DECISION_ID="m11_recall_contact_intent";
  const SKELETON_VERSION="arc1_m11_d5a2d957_recall_window_v1";
  const ACCESS_REF="identity_rebinding_access";

  if(globalThis.SC_ALPHA_MISSION_CHOICE_BINDINGS_121)return;

  function fail(reason,extra={}){
    const status={success:false,patchId:PATCH_ID,reason,...extra,browserGoldenClaimed:false};
    globalThis.SC_ALPHA_MISSION_CHOICE_BINDINGS_121=Object.freeze(status);
    return status;
  }

  const api=globalThis.SC_ALPHA_MISSION_CHOICE_121;
  if(!api||typeof api.registerMissionSkeleton!=="function"||typeof api.bindStoryDecision!=="function"){
    fail("issue_121_choice_engine_missing");
    return;
  }
  if(typeof getStorySceneDefinition!=="function"){
    fail("story_scene_registry_missing");
    return;
  }

  const scene=getStorySceneDefinition(SCENE_ID);
  const authoredBeat=scene&&scene.beatMap&&scene.beatMap.get(BEAT_ID);
  if(!scene||!authoredBeat){
    fail("arc1_m11_story_authority_missing");
    return;
  }

  const missionId=String(scene.eventId||"arc1_m11");

  function getProtagonist121Prod(){
    try{
      if(typeof getAlphaM11M12Protagonist==="function")return getAlphaM11M12Protagonist()||null;
    }catch(_error){}
    return null;
  }

  function hasIdentityRebindingAccess121Prod(protagonist){
    try{
      return typeof IdentityRebindingAccessSatisfied==="function"
        ? IdentityRebindingAccessSatisfied(protagonist)===true
        : false;
    }catch(_error){return false;}
  }

  function getActiveSceneInstance121Prod(){
    try{
      const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
      return active&&active.sceneId===SCENE_ID&&active.instanceId?String(active.instanceId):"inactive";
    }catch(_error){return "inactive";}
  }

  function buildM11Context121Prod(){
    const protagonist=getProtagonist121Prod();
    const identityAccess=hasIdentityRebindingAccess121Prod(protagonist);
    return {
      // Representation and Access remain separate. Identity Rebinding is not
      // projected as Rank, ownership, PL, Knowledge, or generic mastery.
      formalRank:null,
      representationId:protagonist,
      teamParticipantIds:[],
      knowledgeRefs:[],
      relationshipRefs:[],
      accessRefs:identityAccess?[ACCESS_REF]:[],
      capabilityRefs:[],
      historyRefs:identityAccess?["arc1_m6_identity_rebinding_route_earned"]:[],
      objectiveRef:"arc1_m11_permit_recall_contact",
      perceivableNpcIntent:null,
      committedStateRef:null
    };
  }

  function committedStateRef121Prod(context){
    const source=context&&typeof context==="object"?context:buildM11Context121Prod();
    const access=Array.isArray(source.accessRefs)&&source.accessRefs.includes(ACCESS_REF)?"1":"0";
    return [
      "ce121_prod",
      SCENE_ID,
      getActiveSceneInstance121Prod(),
      String(source.representationId||"unknown_protagonist"),
      `identity_rebinding:${access}`
    ].join(":");
  }

  function normalizeOwningResolverResult121Prod(result,fallbackRef){
    if(!result||result.success!==true){
      return {success:false,reason:result&&result.reason||"arc1_m11_recall_intent_rejected"};
    }
    const resultRef=result.resultRef||result.occurrenceId||result.receiptId||result.commitId||fallbackRef;
    const consequenceRefs=[];
    if(result.occurrenceId)consequenceRefs.push(String(result.occurrenceId));
    if(Array.isArray(result.consequenceRefs))consequenceRefs.push(...result.consequenceRefs.map(String));
    return {success:true,resultRef:String(resultRef),consequenceRefs:[...new Set(consequenceRefs)]};
  }

  function resolvePermitRecall121Prod(){
    if(typeof commitAlphaM11RecallIntent!=="function")return{success:false,reason:"arc1_m11_recall_resolver_missing"};
    const result=commitAlphaM11RecallIntent({recognitionSubstitutionRequested:false});
    return normalizeOwningResolverResult121Prod(result,"arc1_m11_recall_contact_permitted");
  }

  function resolvePermitRecallWithSubstitution121Prod(){
    if(typeof commitAlphaM11RecallIntent!=="function")return{success:false,reason:"arc1_m11_recall_resolver_missing"};
    const protagonist=getProtagonist121Prod();
    if(!hasIdentityRebindingAccess121Prod(protagonist))return{success:false,reason:"identity_rebinding_access_required"};
    const result=commitAlphaM11RecallIntent({recognitionSubstitutionRequested:true});
    return normalizeOwningResolverResult121Prod(result,"arc1_m11_recall_contact_with_recognition_substitution");
  }

  const resolverBase=api.registerResolver("arc1_m11_permit_recall_contact_121",resolvePermitRecall121Prod);
  const resolverSub=api.registerResolver("arc1_m11_permit_recall_with_recognition_substitution_121",resolvePermitRecallWithSubstitution121Prod);
  if(!resolverBase.success||!resolverSub.success){
    fail("arc1_m11_resolver_registration_failed",{resolverBase,resolverSub});
    return;
  }

  const skeletonRegistration=api.registerMissionSkeleton({
    arcId:ARC_ID,
    missionId,
    version:SKELETON_VERSION,
    title:"THE MAN WHO SIGNED THE NIGHT SHIFT",
    // This first production adapter binds only the approved Section 8/9
    // decision window. Existing M11 Story authority continues to own the
    // mission's other mandatory anchors and completion semantics.
    mandatoryAnchors:[],
    prohibitedCompletionRefs:[],
    decisions:[{
      decisionId:DECISION_ID,
      beatId:BEAT_ID,
      cadence:"meaningful_decision",
      objectiveRef:"arc1_m11_permit_recall_contact",
      intents:[
        {
          intentId:"permit_recall",
          intentType:"permit_recall_contact",
          intentPayload:{recognitionSubstitutionRequested:false},
          presentationText:"PERMIT RECALL CONTACT",
          nextBeatId:"m11_battle",
          resolverId:"arc1_m11_permit_recall_contact_121",
          eligibilityBasis:["story:arc1_m11_recall_window"],
          isEligible:()=>({available:true,basis:["story:arc1_m11_recall_window"],knownBlocker:null})
        },
        {
          intentId:"permit_recall_substitute",
          intentType:"permit_recall_with_recognition_substitution",
          intentPayload:{recognitionSubstitutionRequested:true},
          presentationText:"PERMIT RECALL + RECOGNITION SUBSTITUTION",
          nextBeatId:"m11_battle",
          resolverId:"arc1_m11_permit_recall_with_recognition_substitution_121",
          eligibilityBasis:["access:identity_rebinding"],
          isEligible:context=>({
            available:Array.isArray(context.accessRefs)&&context.accessRefs.includes(ACCESS_REF),
            basis:Array.isArray(context.accessRefs)&&context.accessRefs.includes(ACCESS_REF)?["access:identity_rebinding"]:[],
            knownBlocker:"IDENTITY REBINDING ACCESS REQUIRED"
          })
        }
      ]
    }]
  });
  if(!skeletonRegistration.success){
    fail("arc1_m11_skeleton_registration_failed",{skeletonRegistration});
    return;
  }

  const binding=api.bindStoryDecision({
    sceneId:SCENE_ID,
    beatId:BEAT_ID,
    arcId:ARC_ID,
    missionId,
    decisionId:DECISION_ID,
    stateProvider:buildM11Context121Prod,
    committedStateRefProvider:committedStateRef121Prod
  });
  if(!binding.success){
    fail("arc1_m11_story_binding_failed",{binding,skeletonRegistration});
    return;
  }

  function inspectCurrentChoiceSet121Prod(){
    const context=buildM11Context121Prod();
    return api.ensureChoiceSet({
      arcId:ARC_ID,
      missionId,
      decisionId:DECISION_ID,
      context,
      committedStateRef:committedStateRef121Prod(context)
    });
  }

  function runIssue121ProductionBindingDiagnostics(){
    const definition=getStorySceneDefinition(SCENE_ID);
    const beat=definition&&definition.beatMap&&definition.beatMap.get(BEAT_ID);
    const currentContext=buildM11Context121Prod();
    const generated=inspectCurrentChoiceSet121Prod();
    const hasAccess=currentContext.accessRefs.includes(ACCESS_REF);
    const choiceIds=generated.success?generated.choiceSet.choices.map(choice=>choice.intentId):[];
    const checks={
      patchId:PATCH_ID==="alpha_mission_choice_production_bindings_121_2026_09_13",
      authoritativeScenePresent:!!definition&&!!beat,
      skeletonPinned:skeletonRegistration.success===true&&skeletonRegistration.version===SKELETON_VERSION,
      storyDecisionBound:binding.success===true&&beat&&beat.ceDecision121&&beat.ceDecision121.decisionId===DECISION_ID,
      baseRecallAlwaysEligible:choiceIds.includes("permit_recall"),
      substitutionMatchesExistingAccessAuthority:choiceIds.includes("permit_recall_substitute")===hasAccess,
      representationDoesNotGrantAccess:currentContext.capabilityRefs.length===0&&currentContext.knowledgeRefs.length===0,
      usesExistingOwningResolver:resolvePermitRecall121Prod.toString().includes("commitAlphaM11RecallIntent")&&resolvePermitRecallWithSubstitution121Prod.toString().includes("commitAlphaM11RecallIntent"),
      noOutcomeInPresentation:generated.success&&generated.choiceSet.choices.every(choice=>!String(choice.presentationText).toLowerCase().includes("success")&&!String(choice.presentationText).toLowerCase().includes("defeat")),
      browserGoldenClaimed:false
    };
    const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
    return {pass:failed.length===0,checks,failed,missionId,currentContext,choiceSet:generated.success?generated.choiceSet:null,browserGoldenClaimed:false};
  }

  const status=Object.freeze({
    success:true,
    patchId:PATCH_ID,
    sceneId:SCENE_ID,
    beatId:BEAT_ID,
    arcId:ARC_ID,
    missionId,
    decisionId:DECISION_ID,
    skeletonVersion:SKELETON_VERSION,
    browserGoldenClaimed:false,
    inspectCurrentChoiceSet:inspectCurrentChoiceSet121Prod,
    diagnostics:runIssue121ProductionBindingDiagnostics
  });

  globalThis.SC_ALPHA_MISSION_CHOICE_BINDINGS_121=status;
  globalThis.runIssue121ProductionBindingDiagnostics=runIssue121ProductionBindingDiagnostics;
})();
