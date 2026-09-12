#!/usr/bin/env node
"use strict";
const fs=require("fs");
const path=require("path");
const vm=require("vm");
const root=path.resolve(__dirname,"..");
const game=fs.readFileSync(path.join(root,"game.js"),"utf8");
const patch=fs.readFileSync(path.join(root,"runtime","alpha-genin-roster-63.js"),"utf8");
const store=new Map();
const dummy=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},querySelector(){return null},querySelectorAll(){return []},addEventListener(){},removeEventListener(){},getContext(){return {}},focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false});
const silentConsole={log(){},info(){},warn(){},error(){},table(){}};
const context={
  console:silentConsole,
  localStorage:{getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k),clear:()=>store.clear()},
  document:{getElementById(){return null},querySelector(){return null},querySelectorAll(){return []},createElement(){return dummy()},body:dummy(),documentElement:dummy(),addEventListener(){},removeEventListener(){}},
  requestAnimationFrame(){return 0},cancelAnimationFrame(){},alert(){},confirm(){return true},prompt(){return null},Image:function(){return dummy()},navigator:{userAgent:"node-issue63"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN
};
context.window=context;context.globalThis=context;
vm.createContext(context);
vm.runInContext(game,context,{filename:"game.js"});
vm.runInContext(patch,context,{filename:"runtime/alpha-genin-roster-63.js"});
const test=`
(function(){
  const results={};
  function check(name,condition,details=null){results[name]={pass:!!condition,details};if(!condition)throw new Error(name+":"+JSON.stringify(details));}
  function setup(){
    resetAlphaDiagnosticPlayerToFreshSave();
    for(const id of ["academy_menma","academy_hinata","academy_kushina"]){const r=commitCharacterAcquisition({variantId:id,route:"diagnostic",sourceEventId:"diag:"+id});if(!r.success)throw new Error("acq:"+id+":"+r.reason);}
    const s=ensurePlayerAcquisitionState();
    s.chronicleOriginVariantId="academy_menma";s.chronicleOriginOwnedCharacterId="owned_character_academy_menma";
    s.chronicleOrigin={...(s.chronicleOrigin||{}),variantId:"academy_menma",ownedCharacterId:"owned_character_academy_menma",prologueCompleted:true,activeKonohaEntered:true};
    s.academyTeamFormation={...(s.academyTeamFormation||{}),unlocked:true,required:false,completed:true,selectedTeammateIds:["academy_hinata","academy_kushina"],eligibleCandidateVariantIds:["academy_hinata","academy_kushina"],completedAt:1000,confirmationReceipt:{receiptId:"diag_academy_team_receipt"},continuationCompleted:true,continuedAt:1001};
    const p=recordOwnedCharacterGeninPromotion("owned_character_academy_menma",["diag_promotion"]);if(!p.success)throw new Error("promotion:"+JSON.stringify(p));
    return s;
  }
  setup();
  let t=getGeninRosterTransitionState();
  check("newLineageUnpinnedBeforeFirstSnapshot",t.candidateContentPolicyId===null,t.candidateContentPolicyId);
  const first=ensureAlphaFirstProductionGeninCandidateSnapshot();t=getGeninRosterTransitionState();
  check("freshLineagePinsV2",first.success&&t.candidateContentPolicyId===SC_GENIN_ROSTER_V2_POLICY_ID,t.candidateContentPolicyId);
  check("v2ExpansionPresent",t.candidateSnapshot.teammateCandidateVariantIds.includes("genin_hashirama"));
  check("subjectAndRetentionCollisionsExcluded",!t.candidateSnapshot.teammateCandidateVariantIds.includes("genin_menma")&&!t.candidateSnapshot.teammateCandidateVariantIds.includes("genin_hinata"));
  const snap=t.candidateSnapshotId;
  const recruit=commitGeninRosterTransitionRecruitment({variantId:"genin_hashirama",expectedSnapshotId:snap});
  check("recruitOwnsWithoutAssigning",recruit.success&&isCharacterRegistryOwned("genin_hashirama")&&!t.selectedTeamVariantIds.includes("genin_hashirama"),recruit);
  const stale=commitGeninRosterTransitionRecruitment({variantId:"genin_hiruzen",expectedSnapshotId:"stale"});
  check("staleRecruitFailsBeforeOwnership",!stale.success&&stale.reason==="stale_candidate_snapshot_recruitment"&&!isCharacterRegistryOwned("genin_hiruzen"),stale);
  check("selectRecruited",selectGeninRosterTransitionTeammate(1,"genin_hashirama",snap).success);
  check("retainAcademyTeammate",selectGeninRosterTransitionTeammate(2,"academy_kushina",snap).success);
  check("selectInstitutionalLeader",selectGeninRosterTransitionJoninLeader("sj_anko",snap).success&&!isCharacterRegistryOwned("sj_anko"));
  const saved=saveGeninRosterTransitionReservations({expectedSnapshotId:snap});
  check("saveReservesNotAssigns",saved.success&&saved.assignmentCommitted===false&&!t.completed&&t.reservedGeninVariantIds.includes("genin_hashirama")&&t.reservedLeaderVariantId==="sj_anko",saved);
  const blocked=commitIssue63CandidateAssignedElsewhere("genin_hashirama",{occurrenceId:"diag_reserved",causalReason:"other_team"});
  check("reservedProtected",!blocked.success&&blocked.reason==="candidate_reserved_to_player_transition",blocked);
  const other=commitIssue63CandidateAssignedElsewhere("genin_hiruzen",{occurrenceId:"diag_other",causalReason:"institutional_assignment",recordVisible:false});
  check("unreservedCausalChangeSupersedes",other.success&&other.superseded===true,other);
  t=getGeninRosterTransitionState();const newSnap=t.candidateSnapshotId;
  check("policyPinnedAcrossSupersession",t.candidateContentPolicyId===SC_GENIN_ROSTER_V2_POLICY_ID&&t.candidateSnapshot.provenance.candidateContentPolicyId===SC_GENIN_ROSTER_V2_POLICY_ID);
  check("hiddenPassiveChangeNotProjected",!getIssue63ObserverSafeTeamFormationUpdates().some(row=>row.variantId==="genin_hiruzen"));
  reloadAlphaDiagnosticPlayerFromSave();t=getGeninRosterTransitionState();
  check("saveLoadPreservesReservations",t.candidateSnapshotId===newSnap&&t.candidateContentPolicyId===SC_GENIN_ROSTER_V2_POLICY_ID&&t.reservedGeninVariantIds.includes("genin_hashirama")&&t.reservedLeaderVariantId==="sj_anko",{snapshot:t.candidateSnapshotId,policy:t.candidateContentPolicyId,reserved:t.reservedGeninVariantIds,leader:t.reservedLeaderVariantId});
  const final=confirmGeninRosterTransition();
  check("continueFinalises",final.success&&getGeninRosterTransitionState().completed===true&&getGeninRosterTransitionState().finalisationState==="FINALIZED",final);
  check("leaderNeverOwned",!isCharacterRegistryOwned("sj_anko"));
  setup();t=getGeninRosterTransitionState();t.candidateContentPolicyId="alpha_genin_roster_first_production_content_v1";t.transitionLineageId="historical_v1_diag";
  const v1=ensureAlphaFirstProductionGeninCandidateSnapshot();
  check("historicalV1RemainsV1",v1.success&&getGeninRosterTransitionState().candidateContentPolicyId==="alpha_genin_roster_first_production_content_v1"&&!getGeninRosterTransitionState().candidateSnapshot.teammateCandidateVariantIds.includes("genin_hashirama"),v1);
  const v1sup=commitIssue63CandidateAssignedElsewhere("genin_boruto",{occurrenceId:"diag_v1_sup",causalReason:"institutional_assignment"});
  check("v1SuccessorRemainsV1",v1sup.success&&getGeninRosterTransitionState().candidateSnapshot.provenance.candidateContentPolicyId==="alpha_genin_roster_first_production_content_v1",v1sup);
  setup();t=getGeninRosterTransitionState();t.candidateContentPolicyId=SC_GENIN_ROSTER_V2_POLICY_ID;ensureAlphaFirstProductionGeninCandidateSnapshot();
  const unavailable=commitGeninRosterTransitionCandidateUnavailable("academy_hinata",{occurrenceId:"diag_retention_exception",causalReason:"authoritative_disappearance",exceptionalOverride:true,recordVisible:true,knownExplanation:"Official notice"});
  t=getGeninRosterTransitionState();
  check("exceptionalRetentionLoss",unavailable.success&&!t.candidateSnapshot.retentionEligibleVariantIds.includes("academy_hinata")&&t.candidateSnapshot.provenance.retentionUnavailableVariantIds.includes("academy_hinata"),unavailable);
  check("retentionLossDoesNotUnown",isCharacterRegistryOwned("academy_hinata"));
  check("knownUpdateProjects",getIssue63ObserverSafeTeamFormationUpdates().some(row=>row.variantId==="academy_hinata"&&row.status==="Official notice"));
  const diag=runIssue63GeninV2RosterDiagnostics();check("diagnosticsGreen",diag.pass,diag.failed);
  const v1diag=runAlphaFirstProductionGeninCandidateDiagnostics();check("v1RegressionGreen",v1diag.pass,v1diag.checks);
  globalThis.__issue63={pass:true,results,diagnostic:diag,v1Diagnostic:v1diag};
})();`;
let result;
try{vm.runInContext(test,context,{filename:"issue63-runtime-test.js"});result=context.__issue63;}
catch(error){console.error("Issue #63 runtime QA FAIL:",error&&error.stack||error);process.exit(1);}
const failures=Object.entries(result.results).filter(([,value])=>!value.pass).map(([name])=>name);
console.log(`Issue #63 runtime QA: ${Object.keys(result.results).length-failures.length}/${Object.keys(result.results).length} PASS`);
console.log(`Issue #63 diagnostic: ${result.diagnostic.pass?"PASS":"FAIL"} · v1 regression: ${result.v1Diagnostic.pass?"PASS":"FAIL"}`);
if(failures.length){console.log("Failed:",failures.join(", "));process.exit(1);}
