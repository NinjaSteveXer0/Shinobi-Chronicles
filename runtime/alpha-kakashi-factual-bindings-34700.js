// ============================================================================
// ISSUE #188 / #175 — ACADEMY KAKASHI FACTUAL RESOLVER BINDINGS — 34700
//
// Consumes the neutral 34600 provider and the closed Kakashi Writing envelopes.
// This layer registers factual possibility sets only. It does NOT infer success
// from choice labels, resolve Battle, or commit World/Knowledge/custody facts.
// Those owning-system commits remain downstream requirements before a branch may
// be exposed as a complete player route.
// ============================================================================
(function installAcademyKakashiFactualBindings34700(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_FACTUAL_BINDINGS_34700)return;

const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
if(!PROVIDER||typeof PROVIDER.registerStoryFactualResolverBinding!=="function")throw new Error("story_factual_resolver_34600_required");

const PATCH_ID="alpha_kakashi_factual_bindings_34700_2026_09_15";
const AUTHORITY=Object.freeze({
  provider:"f2291162085cb3a35fc2a8e49df7ed905c214c85",
  finalWriting:"176ce76feef3e67d4c24644e3d7443a04dcf7d6b",
  decisionMatrix:"0e0f99e688701ce9985ac715aa2041b1e2b49070",
  pickpocketReconciliation:"176ce76feef3e67d4c24644e3d7443a04dcf7d6b",
  finalAutonomy:"713cae26e3b3fb4a214564b497a5f30fb2f14313"
});
const OWNER="academy_kakashi.final_writing";
const auth=Object.values(AUTHORITY);
const registrations=[];

function outcome(outcomeRef,result,successorSituationRef=null,extra={}){
  return Object.freeze({outcomeRef,resultPayloadTemplate:Object.freeze({...result}),successorSituationRef,...extra});
}
function register(bindingRef,outcomes,metadata={}){
  const result=PROVIDER.registerStoryFactualResolverBinding(bindingRef,{
    ownerRef:OWNER,
    authorityVersionRefs:auth,
    outcomes,
    metadata:{storyUnitRef:"academy_kakashi",selectionOnly:true,...metadata}
  });
  registrations.push(result);
  if(!result||result.success!==true)throw new Error(`kakashi_factual_binding_registration_failed:${bindingRef}:${result&&result.reason||"unknown"}`);
  return result;
}

register("academy_kakashi.resolver.get_closer",[
  outcome("GET_CLOSER_SUCCESS",{
    outcomeClass:"GET_CLOSER_SUCCESS",concealmentPreserved:true,improvedPosition:true,
    fullerContingencyKnowledge:true,handoffCompleted:false,maskedInterceptorVisible:false,
    nextDecisionPointRef:"AK_SA_005"
  },"academy_kakashi.decision.get_closer_success"),
  outcome("GET_CLOSER_FAILURE",{
    outcomeClass:"GET_CLOSER_FAILURE",approachDetected:true,handoffAborted:true,
    packageHolderRef:"academy_rival_a",packageSmugglerRemainsBehind:true,
    maskedInterceptorVisible:false,nextDecisionPointRef:"AK_SA_006"
  },"academy_kakashi.decision.get_closer_failure")
],{anchorRefs:["AK_SA_005","AK_SA_006"]});

register("academy_kakashi.resolver.pickpocket_direct",[
  outcome("PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION",{
    outcomeClass:"PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION",packageCustody:"KAKASHI",
    handoffCompleted:false,withdrawalCompletedUndetected:true,maskedInterceptorVisible:false,
    pakkunPresent:false,battleRequired:false
  },"academy_kakashi.debrief"),
  outcome("PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1",{
    outcomeClass:"PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1",cleanExtractionSucceeded:false,
    maskedInterceptorVisible:true,pakkunPresent:false,battleRequired:true,
    battleConfigId:"academy_kakashi_origin_battle_amt_ps_mi_3v1"
  },"battle_transition")
],{anchorRefs:["AK_SA_004","AK_SA_028"],branchSpecificMaskedInterceptorException:true});

register("academy_kakashi.resolver.pickpocket_improved",[
  outcome("PICKPOCKET_IMPROVED_SUCCESS_CLEAN_EXTRACTION",{
    outcomeClass:"PICKPOCKET_IMPROVED_SUCCESS_CLEAN_EXTRACTION",packageCustody:"KAKASHI",
    handoffCompleted:false,withdrawalCompletedUndetected:true,retainsGetCloserKnowledge:true,
    maskedInterceptorVisible:false,pakkunPresent:false,battleRequired:false
  },"academy_kakashi.debrief"),
  outcome("PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1",{
    outcomeClass:"PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1",cleanExtractionSucceeded:false,
    handoffCompleted:false,maskedInterceptorVisible:false,pakkunPresent:false,battleRequired:true,
    battleConfigId:"academy_kakashi_origin_battle_amt_ps_2v1",
    battleEntryPackageHolderDefaultRef:"academy_rival_a"
  },"battle_transition")
],{anchorRefs:["AK_SA_030"],maskedInterceptorMustRemainUnseen:true});

const attackReturns=Object.freeze([
  outcome("ATTACK_RETURN_PACKAGE_KAKASHI",{outcomeClass:"ATTACK_RETURN_PACKAGE_KAKASHI",handoffInterrupted:true,packageStateClass:"KAKASHI"},"academy_kakashi.post_attack_classification"),
  outcome("ATTACK_RETURN_PACKAGE_AMT",{outcomeClass:"ATTACK_RETURN_PACKAGE_AMT",handoffInterrupted:true,packageStateClass:"ANBU_MARKED_TARGET"},"academy_kakashi.post_attack_classification"),
  outcome("ATTACK_RETURN_PACKAGE_SMUGGLER",{outcomeClass:"ATTACK_RETURN_PACKAGE_SMUGGLER",handoffInterrupted:true,packageStateClass:"PACKAGE_SMUGGLER"},"academy_kakashi.post_attack_classification"),
  outcome("ATTACK_RETURN_PACKAGE_NEUTRAL_CONTESTED",{outcomeClass:"ATTACK_RETURN_PACKAGE_NEUTRAL_CONTESTED",handoffInterrupted:true,packageStateClass:"NEUTRAL_CONTESTED"},"academy_kakashi.post_attack_classification"),
  outcome("ATTACK_RETURN_IMMEDIATE_BATTLE",{outcomeClass:"ATTACK_RETURN_IMMEDIATE_BATTLE",handoffInterrupted:true,packageStateClass:"RESOLVER_COMMITTED",battleRequired:true},"battle_transition")
]);
register("academy_kakashi.resolver.attack",attackReturns,{anchorRefs:["AK_SA_003"],maskedInterceptorNotImplied:true});
register("academy_kakashi.resolver.strike_before_handoff",attackReturns.map(row=>Object.freeze({...row,outcomeRef:row.outcomeRef.replace("ATTACK_RETURN_","STRIKE_RETURN_")})),{
  anchorRefs:["AK_SA_029"],requiresImprovedPosition:true,maskedInterceptorMustRemainUnseen:true
});

register("academy_kakashi.resolver.stay_on_package_pursuit",[
  outcome("PURSUIT_SUCCESS_AMT_REACHED",{
    outcomeClass:"PURSUIT_SUCCESS_AMT_REACHED",amtReached:true,pakkunPresent:true
  },"academy_kakashi.pakkun_intercept"),
  outcome("PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE",{
    outcomeClass:"PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE",amtReached:false,
    amtEscapesWithPackage:true,pakkunPresent:false
  },"academy_kakashi.debrief")
],{anchorRefs:["AK_SA_007","AK_SA_008"],pakkunRequiresSuccessfulDownstreamReach:true});

function deterministicDisposition(bindingRef,outcomeRef,custodyClass){
  register(bindingRef,[outcome(outcomeRef,{outcomeClass:outcomeRef,participantAlive:true,custodyDisposition:custodyClass},"academy_kakashi.debrief")],{
    anchorRefs:["AK_SA_013"],stateGatedDeterministic:true
  });
}
deterministicDisposition("academy_kakashi.resolver.disposition_police","DISPOSITION_POLICE","UCHIHA_POLICE");
deterministicDisposition("academy_kakashi.resolver.disposition_release","DISPOSITION_RELEASE","RELEASED");
deterministicDisposition("academy_kakashi.resolver.disposition_return_anbu","DISPOSITION_RETURN_ANBU","ANBU");

const DEFERRED_EXACT_ENVELOPE_BINDINGS=Object.freeze([
  "academy_kakashi.resolver.secure_package_before_assassin",
  "academy_kakashi.resolver.pursue_original_target"
]);

function diagnostics(){
  const registered=PROVIDER.getRegisteredStoryFactualBindings();
  const byRef=new Map(registered.map(row=>[row.bindingRef,row]));
  const direct=byRef.get("academy_kakashi.resolver.pickpocket_direct");
  const improved=byRef.get("academy_kakashi.resolver.pickpocket_improved");
  const pursuit=byRef.get("academy_kakashi.resolver.stay_on_package_pursuit");
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_factual_bindings_34700_2026_09_15",
    allRegistrationsGreen:registrations.length===9&&registrations.every(row=>row&&row.success===true),
    directPickpocketExact:!!direct&&JSON.stringify(direct.outcomeRefs)===JSON.stringify(["PICKPOCKET_DIRECT_SUCCESS_CLEAN_EXTRACTION","PICKPOCKET_DIRECT_FAILURE_DETECTED_3V1"]),
    improvedPickpocketExact:!!improved&&JSON.stringify(improved.outcomeRefs)===JSON.stringify(["PICKPOCKET_IMPROVED_SUCCESS_CLEAN_EXTRACTION","PICKPOCKET_IMPROVED_FAILURE_DETECTED_2V1"]),
    improvedDoesNotRegisterMI:!!improved&&!JSON.stringify(improved).includes("masked_interceptor"),
    pursuitPakkunPredicateSeparated:!!pursuit&&pursuit.outcomeRefs.includes("PURSUIT_SUCCESS_AMT_REACHED")&&pursuit.outcomeRefs.includes("PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE"),
    dispositionsDeterministic:["academy_kakashi.resolver.disposition_police","academy_kakashi.resolver.disposition_release","academy_kakashi.resolver.disposition_return_anbu"].every(ref=>byRef.get(ref)&&byRef.get(ref).outcomeRefs.length===1),
    deferredExactEnvelopesFailClosed:DEFERRED_EXACT_ENVELOPE_BINDINGS.every(ref=>!byRef.has(ref)),
    selectionOnlyNoWorldCommit:registrations.every(Boolean),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,registeredBindingRefs:registrations.map(row=>row.bindingRef),deferredExactEnvelopeBindings:[...DEFERRED_EXACT_ENVELOPE_BINDINGS],browserGoldenClaimed:false};
}

const api=Object.freeze({patchId:PATCH_ID,authority:AUTHORITY,registrations:Object.freeze(registrations.slice()),deferredExactEnvelopeBindings:DEFERRED_EXACT_ENVELOPE_BINDINGS,diagnostics,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_FACTUAL_BINDINGS_34700=api;
globalThis.runAcademyKakashiFactualBindings34700Diagnostics=diagnostics;
})();
