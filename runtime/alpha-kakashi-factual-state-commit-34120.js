// ============================================================================
// ISSUE #188 / #192 — ACADEMY KAKASHI FACTUAL STATE COMMIT OWNER — 34120 v3
//
// Canonical Kakashi Origin adapter child for authoritative non-Battle factual
// commits. 34600 selects an authorised factual outcome; this owner commits that
// outcome through the existing 32900 Origin occurrence ledger before Story may
// advance. It does not replace playerData/savePlayerData, 32900 history, 34000,
// 34600, Battle, or the native Story engine.
// ============================================================================
(function installAcademyKakashiFactualStateCommit34120(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_FACTUAL_STATE_34120)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;
const KAK=globalThis.SC_ALPHA_KAKASHI_FINAL_34100;
const GUARD=globalThis.SC_ALPHA_KAKASHI_FINAL_GUARD_34200;
const PROVIDER=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
if(!A||typeof A.commitOccurrence!=="function"||typeof A.findOccurrence!=="function")throw new Error("alpha_origin_32900_occurrence_authority_required");
if(!CORE||!KAK||!GUARD||!PROVIDER)throw new Error("kakashi_factual_state_34120_dependency_missing");

const PATCH_ID="alpha_kakashi_factual_state_commit_34120_v4_2026_09_20";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const GET_CLOSER_BINDING="academy_kakashi.resolver.get_closer";
const GET_CLOSER_CHOICE_ID="get_closer";
const GET_CLOSER_REQUEST_ID="kakashi_get_closer_factual_commit_34120";
const HANDOFF_BINDING="academy_kakashi.story_fixed.let_handoff_happen";
const HANDOFF_CHOICE_ID="let_handoff_happen";
const HANDOFF_REQUEST_ID="kakashi_get_closer_handoff_factual_commit_34120";
const STAY_PACKAGE_PURSUIT_BINDING="academy_kakashi.resolver.stay_on_package_pursuit";
const STAY_PACKAGE_CHOICE_ID="stay_on_package";
const STAY_PACKAGE_REQUEST_ID="kakashi_get_closer_stay_package_pursuit_34120";
const STAY_PACKAGE_SUCCESS_OUTCOME="PURSUIT_SUCCESS_AMT_REACHED";
const STAY_PACKAGE_FAILURE_OUTCOME="PURSUIT_FAILURE_AMT_ESCAPES_WITH_PACKAGE";
const SECURE_PACKAGE_AMT_PURSUIT_BINDING="academy_kakashi.resolver.secure_package_amt_pursuit";
const SUCCESS_BEAT="kak_get_closer_success";
const FAILURE_BEAT="kak_get_closer_failure";
const HANDOFF_BEAT="kak_get_closer_handoff_observe_escalation";
const STAY_PACKAGE_SUCCESS_BEAT="kak_get_closer_failure_stay_package_intercept";
const STAY_PACKAGE_CHASE_BEAT="kak_get_closer_failure_stay_package_chase_34120";
const STAY_PACKAGE_FAILURE_BEAT="kak_get_closer_failure_stay_package_failed_34120";
const STAY_PERFORMANCE_CURSOR="__kakashiStayPackagePerformance34120";
const STAY_BRANCH_CUES=Object.freeze([{"cueId":"stay_branch_01","kind":"narration","text":"Package Smuggler is coming toward the alley."},{"cueId":"stay_branch_02","kind":"narration","text":"ANBU Marked Target is going the other way."},{"cueId":"stay_branch_03","kind":"narration","text":"The package goes with him."},{"cueId":"stay_branch_04","kind":"narration","text":"Kakashi doesn't need longer than that."},{"cueId":"stay_branch_05","kind":"narration","text":"He moves."},{"cueId":"stay_branch_06","kind":"narration","text":"Package Smuggler catches the motion at the edge of the alley."},{"cueId":"stay_branch_07","kind":"narration","text":"His head snaps around."},{"cueId":"stay_branch_08","kind":"narration","text":"There."},{"cueId":"stay_branch_09","kind":"narration","text":"For the first time, he actually sees the person who spoiled the exchange."},{"cueId":"stay_branch_10","kind":"narration","text":"For half a heartbeat, surprise shows."},{"cueId":"stay_branch_11","kind":"narration","text":"Kakashi is younger than he expected."},{"cueId":"stay_branch_12","kind":"narration","text":"It lasts half a heartbeat."},{"cueId":"stay_branch_13","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"There!"},{"cueId":"stay_branch_14","kind":"narration","text":"ANBU Marked Target looks back."},{"cueId":"stay_branch_15","kind":"narration","text":"His expression changes when he sees Kakashi burst into the open."},{"cueId":"stay_branch_16","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"A kid?"},{"cueId":"stay_branch_17","kind":"narration","text":"Kakashi doesn't answer."},{"cueId":"stay_branch_18","kind":"narration","text":"He runs straight past Package Smuggler."},{"cueId":"stay_branch_19","kind":"narration","text":"The man reaches for him."},{"cueId":"stay_branch_20","kind":"narration","text":"Too slow."},{"cueId":"stay_branch_21","kind":"narration","text":"Kakashi slips outside the grab and keeps moving."},{"cueId":"stay_branch_22","kind":"narration","text":"Package Smuggler turns after him."},{"cueId":"stay_branch_23","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"Don't stop!"},{"cueId":"stay_branch_24","kind":"narration","text":"The target is already crossing toward the Sakura tree."},{"cueId":"stay_branch_25","kind":"narration","text":"He shouts without looking back."},{"cueId":"stay_branch_26","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You said I was done!"},{"cueId":"stay_branch_27","kind":"narration","text":"Package Smuggler's answer follows him across the street."},{"cueId":"stay_branch_28","kind":"dialogue","speakerName":"PACKAGE SMUGGLER","text":"Not while you're holding it!"},{"cueId":"stay_branch_29","kind":"narration","text":"That lands."},{"cueId":"stay_branch_30","kind":"narration","text":"Kakashi's eye sharpens."},{"cueId":"stay_branch_31","kind":"narration","text":"Another piece of the arrangement."},{"cueId":"stay_branch_32","kind":"narration","text":"The man ahead had not been meant to keep the package."},{"cueId":"stay_branch_33","kind":"narration","text":"Now he had no choice."}].map(row=>Object.freeze(row)));
const STAY_PURSUIT_CUES=Object.freeze([{"cueId":"stay_pursuit_01","kind":"narration","text":"The alley falls away behind Kakashi."},{"cueId":"stay_pursuit_02","kind":"narration","text":"The Sakura tree fills the square ahead."},{"cueId":"stay_pursuit_03","kind":"narration","text":"Lantern light catches wet stone beneath it. Petals move through the glow as ANBU Marked Target cuts across the open space."},{"cueId":"stay_pursuit_04","kind":"narration","text":"Kakashi follows."},{"cueId":"stay_pursuit_05","kind":"narration","text":"The target glances back again."},{"cueId":"stay_pursuit_06","kind":"narration","text":"This time he sees how quickly the distance is shrinking."},{"cueId":"stay_pursuit_07","kind":"narration","text":"He swears under his breath."},{"cueId":"stay_pursuit_08","kind":"narration","text":"Then:"},{"cueId":"stay_pursuit_09","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"What do you want?"},{"cueId":"stay_pursuit_10","kind":"narration","text":"Kakashi's answer is immediate."},{"cueId":"stay_pursuit_11","kind":"dialogue","speakerName":"KAKASHI","text":"The package."},{"cueId":"stay_pursuit_12","kind":"narration","text":"The target gives a short, breathless laugh."},{"cueId":"stay_pursuit_13","kind":"narration","text":"No humour in it."},{"cueId":"stay_pursuit_14","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Of course."},{"cueId":"stay_pursuit_15","kind":"narration","text":"His hand presses against it beneath his clothing."},{"cueId":"stay_pursuit_16","kind":"narration","text":"Still there."},{"cueId":"stay_pursuit_17","kind":"narration","text":"Still his."},{"cueId":"stay_pursuit_18","kind":"narration","text":"He changes direction around the Sakura tree."},{"cueId":"stay_pursuit_19","kind":"narration","text":"Kakashi watches the turn."},{"cueId":"stay_pursuit_20","kind":"narration","text":"Not the man."},{"cueId":"stay_pursuit_21","kind":"narration","text":"The route."},{"cueId":"stay_pursuit_22","kind":"narration","text":"There are three ways out of the square."},{"cueId":"stay_pursuit_23","kind":"narration","text":"The target chooses one."},{"cueId":"stay_pursuit_24","kind":"narration","text":"Kakashi starts cutting toward another."},{"cueId":"stay_pursuit_25","kind":"narration","text":"He isn't trying to run faster anymore."},{"cueId":"stay_pursuit_26","kind":"narration","text":"He's trying to arrive first."}].map(row=>Object.freeze(row)));
const STAY_SUCCESS_CUES=Object.freeze([{"cueId":"stay_success_01","kind":"narration","text":"Kakashi cuts inside the target's route."},{"cueId":"stay_success_02","kind":"narration","text":"For several seconds, neither can see the other through the Sakura tree's enormous trunk."},{"cueId":"stay_success_03","kind":"narration","text":"Kakashi hears footsteps on wet stone."},{"cueId":"stay_success_04","kind":"narration","text":"Counts them."},{"cueId":"stay_success_05","kind":"narration","text":"One."},{"cueId":"stay_success_06","kind":"narration","text":"Two."},{"cueId":"stay_success_07","kind":"narration","text":"Three—"},{"cueId":"stay_success_08","kind":"narration","text":"He changes direction."},{"cueId":"stay_success_09","kind":"narration","text":"ANBU Marked Target comes around the far side and sees him."},{"cueId":"stay_success_10","kind":"narration","text":"Too late."},{"cueId":"stay_success_11","kind":"narration","text":"His eyes widen."},{"cueId":"stay_success_12","kind":"narration","text":"He jerks sideways toward the remaining street."},{"cueId":"stay_success_13","kind":"narration","text":"Then stops."},{"cueId":"stay_success_14","kind":"narration","text":"Not because of Kakashi."},{"cueId":"stay_success_15","kind":"narration","text":"A small ninken stands in the middle of the exit."},{"cueId":"stay_success_16","kind":"narration","text":"ANBU Marked Target stares at him."},{"cueId":"stay_success_17","kind":"narration","text":"The ninken stares back."},{"cueId":"stay_success_18","kind":"narration","text":"The man takes one cautious step to the side."},{"cueId":"stay_success_19","kind":"narration","text":"So does the ninken."},{"cueId":"stay_success_20","kind":"narration","text":"Other side."},{"cueId":"stay_success_21","kind":"narration","text":"The ninken matches him again."},{"cueId":"stay_success_22","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Seriously?"},{"cueId":"stay_success_23","kind":"narration","text":"The ninken's ears lift."},{"cueId":"stay_success_24","kind":"narration","text":"The target reaches toward his pouch."},{"cueId":"stay_success_25","kind":"narration","text":"A low growl answers him."},{"cueId":"stay_success_26","kind":"narration","text":"His hand stops."},{"cueId":"stay_success_27","kind":"narration","text":"Kakashi arrives behind him."},{"cueId":"stay_success_28","kind":"narration","text":"Now the target looks from the dog—"},{"cueId":"stay_success_29","kind":"narration","text":"to Kakashi—"},{"cueId":"stay_success_30","kind":"narration","text":"and understands the shape of his problem."},{"cueId":"stay_success_31","kind":"narration","text":"The ninken glances past him at Kakashi."},{"cueId":"stay_success_32","kind":"dialogue","speakerName":"PAKKUN","text":"This yours?"},{"cueId":"stay_success_33","kind":"narration","text":"Kakashi looks at ANBU Marked Target."},{"cueId":"stay_success_34","kind":"narration","text":"Then at the unfamiliar ninken."},{"cueId":"stay_success_35","kind":"dialogue","speakerName":"KAKASHI","text":"Apparently."},{"cueId":"stay_success_36","kind":"narration","text":"Pakkun looks back at the man."},{"cueId":"stay_success_37","kind":"narration","text":"Kakashi steps closer."},{"cueId":"stay_success_38","kind":"dialogue","speakerName":"KAKASHI","text":"Thanks."},{"cueId":"stay_success_39","kind":"narration","text":"Pakkun's ear flicks."},{"cueId":"stay_success_40","kind":"narration","text":"No introduction."},{"cueId":"stay_success_41","kind":"narration","text":"No names exchanged."},{"cueId":"stay_success_42","kind":"narration","text":"ANBU Marked Target slowly turns so he can keep both of them in view."},{"cueId":"stay_success_43","kind":"narration","text":"His breathing is harder now."},{"cueId":"stay_success_44","kind":"narration","text":"The package remains beneath his clothing."},{"cueId":"stay_success_45","kind":"narration","text":"Kakashi notices that his hand has moved over it again."},{"cueId":"stay_success_46","kind":"narration","text":"The man's eyes follow Kakashi's."},{"cueId":"stay_success_47","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"You've been chasing this thing all night."},{"cueId":"stay_success_48","kind":"narration","text":"Kakashi stops just outside striking distance."},{"cueId":"stay_success_49","kind":"dialogue","speakerName":"KAKASHI","text":"You've been running with it."},{"cueId":"stay_success_50","kind":"narration","text":"A beat."},{"cueId":"stay_success_51","kind":"narration","text":"The target almost smiles."},{"cueId":"stay_success_52","kind":"dialogue","speakerName":"ANBU MARKED TARGET","text":"Fair."},{"cueId":"stay_success_53","kind":"narration","text":"Pakkun looks between them."},{"cueId":"stay_success_54","kind":"narration","text":"He appears to have wandered into an argument without being told what the argument is about."},{"cueId":"stay_success_55","kind":"narration","text":"His eyes settle on the target's hand."},{"cueId":"stay_success_56","kind":"narration","text":"Then the shape beneath the clothing."},{"cueId":"stay_success_57","kind":"narration","text":"He figures enough of it out."},{"cueId":"stay_success_58","kind":"dialogue","speakerName":"PAKKUN","text":"Trouble?"},{"cueId":"stay_success_59","kind":"narration","text":"Kakashi keeps his attention on the man."},{"cueId":"stay_success_60","kind":"dialogue","speakerName":"KAKASHI","text":"Probably."},{"cueId":"stay_success_61","kind":"narration","text":"Pakkun gives him a sideways look."},{"cueId":"stay_success_62","kind":"dialogue","speakerName":"PAKKUN","text":"Useful."},{"cueId":"stay_success_63","kind":"narration","text":"The target lets out one quiet breath."},{"cueId":"stay_success_64","kind":"narration","text":"Then his expression changes."},{"cueId":"stay_success_65","kind":"narration","text":"The brief amusement disappears."},{"cueId":"stay_success_66","kind":"narration","text":"His fingers tighten over the package."},{"cueId":"stay_success_67","kind":"narration","text":"Kakashi sees it."},{"cueId":"stay_success_68","kind":"narration","text":"So does Pakkun."},{"cueId":"stay_success_69","kind":"narration","text":"Nobody moves."},{"cueId":"stay_success_70","kind":"narration","text":"Yet."},{"cueId":"stay_success_71","kind":"narration","text":"The pursuit is over."},{"cueId":"stay_success_72","kind":"narration","text":"The package problem isn't."}].map(row=>Object.freeze(row)));
const STAY_FAILURE_CUES=Object.freeze([{"cueId":"stay_fail_01","kind":"narration","text":"Kakashi cuts inside the target's route."},{"cueId":"stay_fail_02","kind":"narration","text":"For several seconds the Sakura tree blocks them from one another."},{"cueId":"stay_fail_03","kind":"narration","text":"Kakashi listens."},{"cueId":"stay_fail_04","kind":"narration","text":"Footsteps."},{"cueId":"stay_fail_05","kind":"narration","text":"Fast."},{"cueId":"stay_fail_06","kind":"narration","text":"Then slowing."},{"cueId":"stay_fail_07","kind":"narration","text":"Kakashi changes direction."},{"cueId":"stay_fail_08","kind":"narration","text":"The target isn't there."},{"cueId":"stay_fail_09","kind":"narration","text":"His eye moves across the square."},{"cueId":"stay_fail_10","kind":"narration","text":"A shadow disappears beyond one of the lanterns."},{"cueId":"stay_fail_11","kind":"narration","text":"Wrong exit."},{"cueId":"stay_fail_12","kind":"narration","text":"Kakashi turns immediately."},{"cueId":"stay_fail_13","kind":"narration","text":"By the time he reaches the far side of the tree, ANBU Marked Target is already at the edge of the square."},{"cueId":"stay_fail_14","kind":"narration","text":"He looks back once."},{"cueId":"stay_fail_15","kind":"narration","text":"Their eyes meet across the distance."},{"cueId":"stay_fail_16","kind":"narration","text":"The package is still pressed beneath his arm."},{"cueId":"stay_fail_17","kind":"narration","text":"Then two late-night pedestrians step into the street between them."},{"cueId":"stay_fail_18","kind":"narration","text":"Kakashi changes line."},{"cueId":"stay_fail_19","kind":"narration","text":"The target doesn't."},{"cueId":"stay_fail_20","kind":"narration","text":"He uses the interruption."},{"cueId":"stay_fail_21","kind":"narration","text":"A turn between buildings."},{"cueId":"stay_fail_22","kind":"narration","text":"Gone."},{"cueId":"stay_fail_23","kind":"narration","text":"Kakashi reaches the corner seconds later."},{"cueId":"stay_fail_24","kind":"narration","text":"Empty street."},{"cueId":"stay_fail_25","kind":"narration","text":"Three possible routes."},{"cueId":"stay_fail_26","kind":"narration","text":"No movement."},{"cueId":"stay_fail_27","kind":"narration","text":"No sound he can separate from the rest of Konoha."},{"cueId":"stay_fail_28","kind":"narration","text":"Kakashi stands still."},{"cueId":"stay_fail_29","kind":"narration","text":"Listens again."},{"cueId":"stay_fail_30","kind":"narration","text":"Nothing."},{"cueId":"stay_fail_31","kind":"narration","text":"His visible eye narrows."},{"cueId":"stay_fail_32","kind":"narration","text":"He looks back toward the Sakura tree."},{"cueId":"stay_fail_33","kind":"narration","text":"Package Smuggler isn't there either."},{"cueId":"stay_fail_34","kind":"narration","text":"Of course he isn't."},{"cueId":"stay_fail_35","kind":"narration","text":"Kakashi had chosen the package."},{"cueId":"stay_fail_36","kind":"narration","text":"The other man had used the choice."},{"cueId":"stay_fail_37","kind":"narration","text":"For the first time since the ANBU operative handed him the assignment, Kakashi has neither person in sight."},{"cueId":"stay_fail_38","kind":"narration","text":"And the package is still in the wrong hands."},{"cueId":"stay_fail_39","kind":"narration","text":"He remains there for another second."},{"cueId":"stay_fail_40","kind":"narration","text":"Not because he expects the street to give the answer back."},{"cueId":"stay_fail_41","kind":"narration","text":"Because committing the mistake to memory takes less time than repeating it."},{"cueId":"stay_fail_42","kind":"narration","text":"Then he turns toward the only place left where somebody is expecting him."},{"cueId":"stay_fail_43","kind":"narration","text":"ANBU."}].map(row=>Object.freeze(row)));
const TERMINAL_PENDING_BEAT="kak_seq_debrief_pending";
const OBSERVE_DECISION_REF="OBSERVE_ESCALATION";
const HANDOFF_OUTCOME="GET_CLOSER_SUCCESS_HANDOFF_COMPLETED";
const FINAL_WRITING="176ce76feef3e67d4c24644e3d7443a04dcf7d6b";
const DECISION_MATRIX="0e0f99e688701ce9985ac715aa2041b1e2b49070";
const STAY_PACKAGE_AUTHORITY="53b20b35f7684832acc34d1a39788719b3e44062";
const FACTUAL_PROVIDER_AUTHORITY="f2291162085cb3a35fc2a8e49df7ed905c214c85";
const WORLD_OBJECT_REF="kakashi_origin_outer_route_packet";
const SECURE_PACKAGE_POST_RESOLUTION_ANCHOR="AK_SA_025";
const SECURE_PACKAGE_BATTLE_ANCHOR="AK_SA_014";
const SECURE_PACKAGE_BATTLE_CONFIG="academy_kakashi_origin_battle_ps_mi_2v1";
const SECURE_PACKAGE_BATTLE_BINDING="academy_kakashi.battle.secure_package";
const PACKAGE_SMUGGLER_REF="academy_kakashi_origin_package_smuggler";
const MASKED_INTERCEPTOR_REF="academy_kakashi_origin_masked_interceptor";
const AMT_REF="academy_kakashi_origin_amt";
const PAKKUN_REF="pakkun_origin_unfamiliar_ninken";
const PARTICIPANT_REFS=Object.freeze([
  ORIGIN_ID,
  "kakashi_origin_logistics_clerk",
  "kakashi_origin_information_broker",
  "kakashi_origin_decoy_assassin_01"
]);

function clone(value){return CORE.clone(value);}
function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function available(value,knownBlocker=null){return()=>({available:value===true,knownBlocker:value===true?null:knownBlocker});}
function normalizedBeat(def,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(def,index):def;}
function factOf(row){return row&&(row.fact||row.data)||{};}

function entryStateRef(rt){
  return PROVIDER.stableRef("sc34120-kakashi-get-closer-entry",{
    sceneId:SCENE_ID,
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    beatId:"kak_original_action"
  });
}
function getCloserOccurrenceRef(rt,decisionReceipt){
  return PROVIDER.stableRef("occ_origin_kakashi_get_closer",{
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    storyDecisionReceiptId:String(decisionReceipt&&decisionReceipt.storyDecisionReceiptId||"")
  });
}
function handoffOccurrenceRef(rt,parentOccurrenceId,decisionReceipt){
  return PROVIDER.stableRef("occ_origin_kakashi_get_closer_handoff",{
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    parentOccurrenceId:String(parentOccurrenceId||""),
    storyDecisionReceiptId:String(decisionReceipt&&decisionReceipt.storyDecisionReceiptId||"")
  });
}
function stayPackagePursuitOccurrenceRef(rt,parentOccurrenceId,receipt){
  return PROVIDER.stableRef("occ_origin_kakashi_stay_package_pursuit",{
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    parentOccurrenceId:String(parentOccurrenceId||""),
    storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),
    anchorRef:"AK_SA_007"
  });
}
function securePackageVictoryOccurrenceRef(rt,parentOccurrenceId,battleResult){
  return PROVIDER.stableRef("occ_origin_kakashi_secure_package_2v1_victory",{
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    parentOccurrenceId:String(parentOccurrenceId||""),
    battleOccurrenceId:String(battleResult&&battleResult.battleOccurrenceId||""),
    anchorRef:SECURE_PACKAGE_POST_RESOLUTION_ANCHOR
  });
}
function securePackageAmtPursuitOccurrenceRef(rt,parentOccurrenceId,receipt){
  return PROVIDER.stableRef("occ_origin_kakashi_secure_package_amt_pursuit",{
    storySceneInstanceId:String(rt&&rt.instanceId||""),
    parentOccurrenceId:String(parentOccurrenceId||""),
    storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),
    anchorRef:SECURE_PACKAGE_POST_RESOLUTION_ANCHOR
  });
}
function existingDecisionReceipt(contextStateRef,choiceId,bindingRef){
  const snapshot=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{};
  const receipts=Object.values(snapshot.decisionReceipts||{});
  return receipts.find(row=>
    row&&row.storyDecisionContextId===contextStateRef&&
    row.selectedChoiceId===choiceId&&row.resolverBindingRef===bindingRef
  )||null;
}
function ensureOpeningIntent(rt){
  const contextStateRef=entryStateRef(rt);
  let receipt=existingDecisionReceipt(contextStateRef,GET_CLOSER_CHOICE_ID,GET_CLOSER_BINDING);
  if(receipt)return{success:true,idempotent:true,contextStateRef,receipt};

  const opened=KAK.openDecisionPoint("AK_SA_001",{
    committedStateRef:contextStateRef,
    beatRef:"kak_original_action",
    sourceOccurrenceRefs:[]
  });
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_get_closer_choice_set_open_failed"};

  const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId:opened.choiceSet.choiceSetId,choiceId:GET_CLOSER_CHOICE_ID});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_get_closer_intent_commit_failed"};

  receipt=committed.receipt;
  rt.localContext={...(rt.localContext||{}),kakashiGetCloserContextStateRef:contextStateRef,kakashiGetCloserStoryDecisionReceiptId:receipt.storyDecisionReceiptId,kakashiGetCloserIntentCommitRef:receipt.intentCommitRef};
  save();
  return{success:true,contextStateRef,receipt};
}
function requireGetCloserSuccessParent(rt){
  const parentOccurrenceId=String(rt&&rt.localContext&&rt.localContext.kakashiGetCloserOccurrenceId||"");
  if(!parentOccurrenceId)return{success:false,reason:"kakashi_get_closer_success_parent_ref_missing"};
  const parent=A.findOccurrence(parentOccurrenceId);
  if(!parent)return{success:false,reason:"kakashi_get_closer_success_parent_occurrence_missing"};
  const fact=factOf(parent);
  if(String(parent.storySceneInstanceId||"")!==String(rt.instanceId||"")||String(fact.storySceneInstanceId||"")!==String(rt.instanceId||""))return{success:false,reason:"kakashi_get_closer_success_parent_story_instance_mismatch"};
  if(String(fact.selectedOutcomeRef||"")!=="GET_CLOSER_SUCCESS")return{success:false,reason:"kakashi_get_closer_handoff_requires_success_parent"};
  if(fact.packageState&&fact.packageState.handoffCompleted===true)return{success:false,reason:"kakashi_get_closer_parent_handoff_already_completed"};
  return{success:true,parentOccurrenceId,parent,fact};
}
function requireGetCloserFailureParent(rt){
  const parentOccurrenceId=String(rt&&rt.localContext&&rt.localContext.kakashiGetCloserOccurrenceId||"");
  if(!parentOccurrenceId)return{success:false,reason:"kakashi_get_closer_failure_parent_ref_missing"};
  const parent=A.findOccurrence(parentOccurrenceId);
  if(!parent)return{success:false,reason:"kakashi_get_closer_failure_parent_occurrence_missing"};
  const fact=factOf(parent),pkg=fact.packageState||{};
  if(String(parent.storySceneInstanceId||"")!==String(rt.instanceId||"")||String(fact.storySceneInstanceId||"")!==String(rt.instanceId||""))return{success:false,reason:"kakashi_get_closer_failure_parent_story_instance_mismatch"};
  if(String(fact.selectedOutcomeRef||"")!=="GET_CLOSER_FAILURE")return{success:false,reason:"kakashi_stay_package_requires_get_closer_failure"};
  if(String(pkg.currentHolderClass||"")!=="ANBU_MARKED_TARGET"||pkg.handoffCompleted===true)return{success:false,reason:"kakashi_stay_package_parent_package_state_mismatch"};
  return{success:true,parentOccurrenceId,parent,fact};
}
function ensureHandoffIntent(rt,parentOccurrenceId){
  const contextStateRef=String(parentOccurrenceId||"");
  let receipt=existingDecisionReceipt(contextStateRef,HANDOFF_CHOICE_ID,HANDOFF_BINDING);
  if(receipt)return{success:true,idempotent:true,contextStateRef,receipt};
  const opened=KAK.openDecisionPoint("AK_SA_005",{committedStateRef:contextStateRef,beatRef:SUCCESS_BEAT,sourceOccurrenceRefs:[contextStateRef]});
  if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_get_closer_handoff_choice_set_open_failed"};
  const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId:opened.choiceSet.choiceSetId,choiceId:HANDOFF_CHOICE_ID});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_get_closer_handoff_intent_commit_failed"};
  receipt=committed.receipt;
  rt.localContext={...(rt.localContext||{}),kakashiGetCloserHandoffContextStateRef:contextStateRef,kakashiGetCloserHandoffStoryDecisionReceiptId:receipt.storyDecisionReceiptId,kakashiGetCloserHandoffIntentCommitRef:receipt.intentCommitRef};
  save();
  return{success:true,contextStateRef,receipt};
}
function ensureStayPackageIntent(rt,parentOccurrenceId){
  const contextStateRef=String(parentOccurrenceId||"");
  let receipt=existingDecisionReceipt(contextStateRef,STAY_PACKAGE_CHOICE_ID,STAY_PACKAGE_PURSUIT_BINDING);
  if(receipt)return{success:true,idempotent:true,contextStateRef,receipt};
  let choiceSetId=String(rt&&rt.localContext&&rt.localContext.kakashiGetCloserSuccessorChoiceSetId||"");
  const snapshot=CORE.getStoryUnitSnapshot(ORIGIN_ID)||{},existingSet=snapshot.choiceSets&&snapshot.choiceSets[choiceSetId]||null;
  if(!existingSet||existingSet.decisionPointRef!=="AK_SA_006"||String(existingSet.contextStateRef||"")!==contextStateRef){
    const opened=KAK.openDecisionPoint("AK_SA_006",{committedStateRef:contextStateRef,beatRef:FAILURE_BEAT,sourceOccurrenceRefs:[contextStateRef]});
    if(!opened||opened.success!==true)return opened||{success:false,reason:"kakashi_stay_package_choice_set_open_failed"};
    choiceSetId=opened.choiceSet.choiceSetId;
  }
  const committed=CORE.commitStoryIntent({storyUnitRef:ORIGIN_ID,choiceSetId,choiceId:STAY_PACKAGE_CHOICE_ID});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_stay_package_intent_commit_failed"};
  receipt=committed.receipt;
  rt.localContext={...(rt.localContext||{}),kakashiGetCloserStayPackageStoryDecisionReceiptId:receipt.storyDecisionReceiptId,kakashiGetCloserStayPackageIntentCommitRef:receipt.intentCommitRef};
  save();
  return{success:true,contextStateRef,receipt};
}

function getCloserFact(selectedOutcomeRef,result,rt,decisionReceipt,factualReceipt){
  const success=selectedOutcomeRef==="GET_CLOSER_SUCCESS";
  const failure=selectedOutcomeRef==="GET_CLOSER_FAILURE";
  if(!success&&!failure)return null;
  return{
    factClass:"academy_kakashi_get_closer_factual_state",selectedOutcomeRef,
    storyDecisionReceiptId:decisionReceipt.storyDecisionReceiptId,storyFactualResolverReceiptId:factualReceipt.storyFactualResolverReceiptId,storySceneInstanceId:String(rt.instanceId),
    packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:"ANBU_MARKED_TARGET",handoffCompleted:false},
    participantStateByRole:success?{academy_kakashi:{positionClass:"IMPROVED_CONCEALED_POSITION",detectionState:"UNDETECTED"},anbu_marked_target:{roleState:"CURRENT_PACKAGE_HOLDER"},package_smuggler:{roleState:"HANDOFF_PENDING"},masked_interceptor:{visibilityState:"UNSEEN"}}:{academy_kakashi:{positionClass:"APPROACH_COMPROMISED",detectionState:"DETECTED"},anbu_marked_target:{roleState:"CURRENT_PACKAGE_HOLDER"},package_smuggler:{positionClass:"REMAINS_AT_EXCHANGE"},masked_interceptor:{visibilityState:"UNSEEN"}},
    knowledgeStateByObserver:{academy_kakashi:{fullerContingencyKnowledge:success===true,maskedInterceptorVisible:false}},
    worldFacts:success?{concealmentPreserved:true,improvedPosition:true,handoffCompleted:false,maskedInterceptorVisible:false}:{approachDetected:true,handoffAborted:true,packageSmugglerRemainsBehind:true,maskedInterceptorVisible:false},
    nextDecisionPointRef:String(result&&result.nextDecisionPointRef||"")
  };
}
function handoffFact(result,rt,parentOccurrenceId,decisionReceipt,factualReceipt){
  if(String(factualReceipt&&factualReceipt.selectedOutcomeRef||"")!==HANDOFF_OUTCOME)return null;
  return{
    factClass:"academy_kakashi_get_closer_handoff_factual_state",selectedOutcomeRef:HANDOFF_OUTCOME,parentOccurrenceRef:String(parentOccurrenceId||""),storyDecisionReceiptId:decisionReceipt.storyDecisionReceiptId,storyFactualResolverReceiptId:factualReceipt.storyFactualResolverReceiptId,storySceneInstanceId:String(rt.instanceId),
    packageState:{objectRef:WORLD_OBJECT_REF,previousHolderClass:"ANBU_MARKED_TARGET",currentHolderClass:"PACKAGE_SMUGGLER",handoffCompleted:true},
    participantStateByRole:{academy_kakashi:{positionClass:"IMPROVED_CONCEALED_POSITION",detectionState:"UNDETECTED"},anbu_marked_target:{roleState:"HANDOFF_COMPLETED_SOURCE"},package_smuggler:{roleState:"CURRENT_PACKAGE_HOLDER"},masked_interceptor:{visibilityState:"VISIBLE_AFTER_COMPLETED_TRANSFER"}},
    knowledgeStateByObserver:{academy_kakashi:{fullerContingencyKnowledge:true,maskedInterceptorVisible:true}},
    worldFacts:{concealmentPreserved:true,improvedPosition:true,handoffCompleted:true,packageHolderClass:"PACKAGE_SMUGGLER",observeEscalationActive:true,maskedInterceptorVisible:true},nextDecisionPointRef:String(result&&result.nextDecisionPointRef||OBSERVE_DECISION_REF)
  };
}

function commitGetCloser({receipt,request,result}={}){
  const rt=active();const requestedInstance=String(request&&request.context&&request.context.storySceneInstanceId||"");
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_get_closer_story_instance_missing"};
  if(!requestedInstance||requestedInstance!==String(rt.instanceId||""))return{success:false,reason:"kakashi_get_closer_story_instance_mismatch"};
  const occurrenceId=String(request&&request.committedAtOccurrenceRef||getCloserOccurrenceRef(rt,{storyDecisionReceiptId:receipt&&receipt.storyDecisionReceiptId}));
  const fact=getCloserFact(receipt&&receipt.selectedOutcomeRef,result,rt,{storyDecisionReceiptId:receipt&&receipt.storyDecisionReceiptId},receipt);
  if(!fact)return{success:false,reason:"kakashi_get_closer_outcome_not_authorised"};
  let existing=A.findOccurrence(occurrenceId);
  if(existing){const existingFact=factOf(existing);if(String(existing.storySceneInstanceId||"")!==requestedInstance||String(existingFact.selectedOutcomeRef||"")!==String(receipt.selectedOutcomeRef||""))return{success:false,reason:"kakashi_get_closer_occurrence_replay_mismatch"};}
  else{const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:String(receipt.selectedOutcomeRef||""),participantRefs:[...PARTICIPANT_REFS],sourceRefs:[{type:"world_object",id:WORLD_OBJECT_REF},{type:"story_decision_receipt",id:String(receipt.storyDecisionReceiptId||"")},{type:"story_factual_resolver_receipt",id:String(receipt.storyFactualResolverReceiptId||"")} ]});if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_get_closer_occurrence_commit_failed"};existing=committed.record;}
  const participantStateRef=PROVIDER.stableRef("sc34120-participant-state",{occurrenceId,outcomeRef:receipt.selectedOutcomeRef});
  const worldStateRef=PROVIDER.stableRef("sc34120-world-state",{occurrenceId,outcomeRef:receipt.selectedOutcomeRef});
  const knowledgeRefs=receipt.selectedOutcomeRef==="GET_CLOSER_SUCCESS"?[PROVIDER.stableRef("sc34120-knowledge",{occurrenceId,observerRef:ORIGIN_ID,knowledgeClass:"FULLER_CONTINGENCY_KNOWLEDGE"})]:[];
  return{success:true,occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[worldStateRef],knowledgeDeltaRefs:knowledgeRefs,relationshipHistoryRefs:[],objectiveDeltaRefs:[],objectCustodyDeltaRefs:[],participantStateDeltaRefs:[participantStateRef],successorSituationRef:String(receipt.successorSituationRef||"")};
}
function commitGetCloserHandoff({receipt,request,result}={}){
  const rt=active();const requestedInstance=String(request&&request.context&&request.context.storySceneInstanceId||"");
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_get_closer_handoff_story_instance_missing"};
  if(!requestedInstance||requestedInstance!==String(rt.instanceId||""))return{success:false,reason:"kakashi_get_closer_handoff_story_instance_mismatch"};
  const parentId=String(request&&request.context&&request.context.parentOccurrenceRef||rt.localContext&&rt.localContext.kakashiGetCloserOccurrenceId||"");
  const parentCheck=requireGetCloserSuccessParent(rt);if(!parentCheck||parentCheck.success!==true)return parentCheck||{success:false,reason:"kakashi_get_closer_handoff_parent_invalid"};
  if(parentId&&parentId!==parentCheck.parentOccurrenceId)return{success:false,reason:"kakashi_get_closer_handoff_parent_ref_mismatch"};
  const occurrenceId=String(request&&request.committedAtOccurrenceRef||handoffOccurrenceRef(rt,parentCheck.parentOccurrenceId,{storyDecisionReceiptId:receipt&&receipt.storyDecisionReceiptId}));
  const fact=handoffFact(result,rt,parentCheck.parentOccurrenceId,{storyDecisionReceiptId:receipt&&receipt.storyDecisionReceiptId},receipt);if(!fact)return{success:false,reason:"kakashi_get_closer_handoff_outcome_not_authorised"};
  let existing=A.findOccurrence(occurrenceId);
  if(existing){const existingFact=factOf(existing);if(String(existing.storySceneInstanceId||"")!==requestedInstance||String(existingFact.selectedOutcomeRef||"")!==HANDOFF_OUTCOME||String(existingFact.parentOccurrenceRef||"")!==parentCheck.parentOccurrenceId)return{success:false,reason:"kakashi_get_closer_handoff_occurrence_replay_mismatch"};}
  else{const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:HANDOFF_OUTCOME,participantRefs:[...PARTICIPANT_REFS],sourceRefs:[{type:"origin_occurrence",id:parentCheck.parentOccurrenceId},{type:"world_object",id:WORLD_OBJECT_REF},{type:"story_decision_receipt",id:String(receipt.storyDecisionReceiptId||"")},{type:"story_factual_resolver_receipt",id:String(receipt.storyFactualResolverReceiptId||"")} ]});if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_get_closer_handoff_occurrence_commit_failed"};existing=committed.record;}
  const worldStateRef=PROVIDER.stableRef("sc34120-handoff-world-state",{occurrenceId,outcomeRef:HANDOFF_OUTCOME});
  const participantStateRef=PROVIDER.stableRef("sc34120-handoff-participant-state",{occurrenceId,outcomeRef:HANDOFF_OUTCOME});
  const custodyRef=PROVIDER.stableRef("sc34120-handoff-custody",{occurrenceId,objectRef:WORLD_OBJECT_REF,from:"ANBU_MARKED_TARGET",to:"PACKAGE_SMUGGLER"});
  const knowledgeRef=PROVIDER.stableRef("sc34120-handoff-knowledge",{occurrenceId,observerRef:ORIGIN_ID,knowledgeClass:"MASKED_INTERCEPTOR_VISIBLE_AFTER_TRANSFER"});
  return{success:true,occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[worldStateRef],knowledgeDeltaRefs:[knowledgeRef],relationshipHistoryRefs:[],objectiveDeltaRefs:[],objectCustodyDeltaRefs:[custodyRef],participantStateDeltaRefs:[participantStateRef],successorSituationRef:String(receipt.successorSituationRef||"academy_kakashi.decision.observe_escalation")};
}
function commitStayOnPackagePursuit({receipt,request,result}={}){
  const rt=active();const requestedInstance=String(request&&request.context&&request.context.storySceneInstanceId||"");
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_stay_package_pursuit_story_instance_missing"};
  if(!requestedInstance||requestedInstance!==String(rt.instanceId||""))return{success:false,reason:"kakashi_stay_package_pursuit_story_instance_mismatch"};
  const parent=requireGetCloserFailureParent(rt);if(!parent||parent.success!==true)return parent||{success:false,reason:"kakashi_stay_package_pursuit_parent_invalid"};
  const requestedParent=String(request&&request.context&&request.context.parentOccurrenceRef||parent.parentOccurrenceId);if(requestedParent!==parent.parentOccurrenceId)return{success:false,reason:"kakashi_stay_package_pursuit_parent_ref_mismatch"};
  const selected=String(receipt&&receipt.selectedOutcomeRef||"");const reached=selected===STAY_PACKAGE_SUCCESS_OUTCOME,escaped=selected===STAY_PACKAGE_FAILURE_OUTCOME;
  if(!reached&&!escaped)return{success:false,reason:"kakashi_stay_package_pursuit_outcome_not_authorised"};
  if(!result||result.amtReached!==reached||result.pakkunPresent!==reached)return{success:false,reason:"kakashi_stay_package_pursuit_result_mismatch"};
  if(escaped&&result.amtEscapesWithPackage!==true)return{success:false,reason:"kakashi_stay_package_pursuit_failure_package_escape_missing"};
  const occurrenceId=String(request&&request.committedAtOccurrenceRef||stayPackagePursuitOccurrenceRef(rt,parent.parentOccurrenceId,receipt));
  const fact={factClass:"academy_kakashi_stay_package_pursuit_factual_state",anchorRef:"AK_SA_007",nextAnchorRef:reached?"AK_SA_008":null,parentOccurrenceRef:parent.parentOccurrenceId,storyDecisionReceiptId:String(receipt&&receipt.storyDecisionReceiptId||""),storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,storySceneInstanceId:String(rt.instanceId||""),packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:"ANBU_MARKED_TARGET",custodyClass:"ANBU_MARKED_TARGET",locationClass:reached?"AMT_PERSON":"AMT_ESCAPED_WITH_PACKAGE",handoffCompleted:false},participantStateByRef:{[AMT_REF]:{reachState:reached?"REACHED":"ESCAPED",packageHolder:true},[PAKKUN_REF]:{presenceState:reached?"PRESENT":"NOT_PRESENT"}},knowledgeStateByObserver:{[ORIGIN_ID]:{maskedInterceptorVisible:false,amtReached:reached,packageStillWithAmt:true}},worldFacts:{packageCustody:"ANBU_MARKED_TARGET",packageRecovered:false,amtReached:reached,amtEscapedWithPackage:escaped,pakkunPresent:reached,maskedInterceptorVisible:false},nextSituationRef:reached?"academy_kakashi.pakkun_intercept":"academy_kakashi.debrief"};
  let existing=A.findOccurrence(occurrenceId);
  if(existing){const ef=factOf(existing),pkg=ef.packageState||{};if(String(ef.selectedOutcomeRef||"")!==selected||String(ef.parentOccurrenceRef||"")!==parent.parentOccurrenceId||String(pkg.currentHolderClass||"")!=="ANBU_MARKED_TARGET")return{success:false,reason:"kakashi_stay_package_pursuit_occurrence_replay_mismatch"};}
  else{const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:selected,participantRefs:reached?[ORIGIN_ID,AMT_REF,PAKKUN_REF]:[ORIGIN_ID,AMT_REF],sourceRefs:[{type:"origin_occurrence",id:parent.parentOccurrenceId},{type:"story_autonomy_anchor",id:"AK_SA_007"},{type:"story_decision_receipt",id:String(receipt&&receipt.storyDecisionReceiptId||"")},{type:"story_factual_resolver_receipt",id:String(receipt&&receipt.storyFactualResolverReceiptId||"")},{type:"world_object",id:WORLD_OBJECT_REF}]});if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_stay_package_pursuit_occurrence_commit_failed"};existing=committed.record;}
  const materialState=typeof CORE.recordMaterialState==="function"?CORE.recordMaterialState({storyUnitRef:ORIGIN_ID,materialRef:WORLD_OBJECT_REF,resolved:true,stateRef:occurrenceId,value:{custodyClass:"ANBU_MARKED_TARGET",locationClass:reached?"AMT_PERSON":"AMT_ESCAPED_WITH_PACKAGE",sourceAnchorRef:"AK_SA_007"}}):{success:false,reason:"neutral_material_state_authority_missing"};
  if(!materialState||materialState.success!==true)return materialState||{success:false,reason:"kakashi_stay_package_material_state_commit_failed"};
  const worldStateRef=PROVIDER.stableRef("sc34120-stay-package-pursuit-world",{occurrenceId,selected});const participantStateRef=PROVIDER.stableRef("sc34120-stay-package-pursuit-participant",{occurrenceId,selected});
  return{success:true,occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[worldStateRef],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],objectCustodyDeltaRefs:[],participantStateDeltaRefs:[participantStateRef],materialState:clone(materialState.state||null),successorSituationRef:reached?"academy_kakashi.pakkun_intercept":"academy_kakashi.debrief"};
}
function commitSecurePackage2v1Victory({battleResult}={}){
  const rt=active();
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_secure_package_post_battle_story_instance_missing"};
  const result=battleResult&&typeof battleResult==="object"?battleResult:null;
  if(!result||String(result.battleConfigId||"")!==SECURE_PACKAGE_BATTLE_CONFIG)return{success:false,reason:"kakashi_secure_package_post_battle_config_mismatch"};
  if(String(result.sourceAnchorRef||"")!==SECURE_PACKAGE_BATTLE_ANCHOR||String(result.bindingRef||"")!==SECURE_PACKAGE_BATTLE_BINDING)return{success:false,reason:"kakashi_secure_package_post_battle_authority_mismatch"};
  if(String(result.resultState||"")!=="player_side_victory")return{success:false,reason:"kakashi_secure_package_post_battle_victory_required"};
  if(result.participantDeathCommitted===true||result.participantCustodyCommitted===true)return{success:false,reason:"kakashi_secure_package_battle_receipt_illegally_collapsed_participant_state"};
  const parentOccurrenceId=String(rt.localContext&&rt.localContext.kakashiGetCloserHandoffOccurrenceId||"");if(!parentOccurrenceId)return{success:false,reason:"kakashi_secure_package_handoff_parent_missing"};
  const parent=A.findOccurrence(parentOccurrenceId);if(!parent)return{success:false,reason:"kakashi_secure_package_handoff_parent_occurrence_missing"};
  const parentFact=factOf(parent),parentPackage=parentFact.packageState||{};if(parentPackage.handoffCompleted!==true||String(parentPackage.currentHolderClass||"")!=="PACKAGE_SMUGGLER")return{success:false,reason:"kakashi_secure_package_handoff_parent_custody_mismatch"};
  const participants=Array.isArray(result.participants)?result.participants:[];const ps=participants.find(row=>row&&row.participantRef===PACKAGE_SMUGGLER_REF)||null;const mi=participants.find(row=>row&&row.participantRef===MASKED_INTERCEPTOR_REF)||null;
  if(!ps||!mi)return{success:false,reason:"kakashi_secure_package_post_battle_participants_missing"};
  if(ps.battleStatus!=="defeated"||mi.battleStatus!=="defeated")return{success:false,reason:"kakashi_secure_package_post_battle_defeat_facts_missing"};
  if(ps.lifeState!=="unresolved"||mi.lifeState!=="unresolved"||ps.custodyState!=="unresolved"||mi.custodyState!=="unresolved")return{success:false,reason:"kakashi_secure_package_post_battle_participant_resolution_not_story_owned"};
  const occurrenceId=securePackageVictoryOccurrenceRef(rt,parentOccurrenceId,result);
  const fact={factClass:"academy_kakashi_secure_package_2v1_post_battle_factual_state",anchorRef:SECURE_PACKAGE_POST_RESOLUTION_ANCHOR,sourceBattleAnchorRef:SECURE_PACKAGE_BATTLE_ANCHOR,battleConfigId:SECURE_PACKAGE_BATTLE_CONFIG,battleOccurrenceId:String(result.battleOccurrenceId||""),battleResultState:"player_side_victory",parentOccurrenceRef:parentOccurrenceId,storySceneInstanceId:String(rt.instanceId||""),packageState:{objectRef:WORLD_OBJECT_REF,previousHolderClass:"PACKAGE_SMUGGLER",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",handoffCompleted:true},participantBattleStateByRef:{[PACKAGE_SMUGGLER_REF]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"},[MASKED_INTERCEPTOR_REF]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}},worldFacts:{packageCustody:"KAKASHI",packageLocation:"KAKASHI_PERSON",participantCustodyCommitted:false,participantDeathCommitted:false,storyObjectiveCommitted:false},nextPostResolutionAnchorRef:"AK_SA_023"};
  let existing=A.findOccurrence(occurrenceId);
  if(existing){const existingFact=factOf(existing),existingPackage=existingFact.packageState||{};if(String(existing.storySceneInstanceId||"")!==String(rt.instanceId||"")||String(existingFact.battleOccurrenceId||"")!==String(result.battleOccurrenceId||"")||String(existingPackage.currentHolderClass||"")!=="KAKASHI")return{success:false,reason:"kakashi_secure_package_post_battle_occurrence_replay_mismatch"};}
  else{const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:"SECURE_PACKAGE_2V1_VICTORY_PACKAGE_SECURED",participantRefs:[ORIGIN_ID,PACKAGE_SMUGGLER_REF,MASKED_INTERCEPTOR_REF],sourceRefs:[{type:"origin_occurrence",id:parentOccurrenceId},{type:"battle_occurrence",id:String(result.battleOccurrenceId||"")},{type:"story_autonomy_anchor",id:SECURE_PACKAGE_POST_RESOLUTION_ANCHOR},{type:"world_object",id:WORLD_OBJECT_REF}]});if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_secure_package_post_battle_occurrence_commit_failed"};existing=committed.record;}
  const materialState=typeof CORE.recordMaterialState==="function"?CORE.recordMaterialState({storyUnitRef:ORIGIN_ID,materialRef:WORLD_OBJECT_REF,resolved:true,stateRef:occurrenceId,value:{custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",sourceAnchorRef:SECURE_PACKAGE_POST_RESOLUTION_ANCHOR}}):{success:false,reason:"neutral_material_state_authority_missing"};
  if(!materialState||materialState.success!==true)return materialState||{success:false,reason:"kakashi_secure_package_material_state_commit_failed"};
  const custodyRef=PROVIDER.stableRef("sc34120-secure-package-custody",{occurrenceId,objectRef:WORLD_OBJECT_REF,from:"PACKAGE_SMUGGLER",to:"KAKASHI"});const worldStateRef=PROVIDER.stableRef("sc34120-secure-package-world-state",{occurrenceId,anchorRef:SECURE_PACKAGE_POST_RESOLUTION_ANCHOR});
  return{success:true,occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[worldStateRef],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],objectCustodyDeltaRefs:[custodyRef],participantStateDeltaRefs:[],materialState:clone(materialState.state||null),successorSituationRef:"AK_SA_023"};
}
function commitSecurePackageAmtPursuit({receipt,request,result}={}){
  const rt=active();const requestedInstance=String(request&&request.context&&request.context.storySceneInstanceId||"");
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_secure_package_amt_pursuit_story_instance_missing"};
  if(!requestedInstance||requestedInstance!==String(rt.instanceId||""))return{success:false,reason:"kakashi_secure_package_amt_pursuit_story_instance_mismatch"};
  const parentOccurrenceId=String(request&&request.context&&request.context.securePackageOccurrenceRef||rt.localContext&&rt.localContext.kakashiObserveSecurePackageOccurrenceId||"");
  if(!parentOccurrenceId)return{success:false,reason:"kakashi_secure_package_amt_pursuit_parent_missing"};
  const parent=A.findOccurrence(parentOccurrenceId);if(!parent)return{success:false,reason:"kakashi_secure_package_amt_pursuit_parent_occurrence_missing"};
  const parentFact=factOf(parent),parentPackage=parentFact.packageState||{};
  if(String(parentFact.anchorRef||"")!==SECURE_PACKAGE_POST_RESOLUTION_ANCHOR||String(parentPackage.currentHolderClass||"")!=="KAKASHI")return{success:false,reason:"kakashi_secure_package_amt_pursuit_requires_committed_package_custody"};
  const selected=String(receipt&&receipt.selectedOutcomeRef||"");
  const reached=selected==="SECURE_PACKAGE_AMT_PURSUIT_SUCCESS_REACHED";
  const escaped=selected==="SECURE_PACKAGE_AMT_PURSUIT_FAILURE_ESCAPED";
  if(!reached&&!escaped)return{success:false,reason:"kakashi_secure_package_amt_pursuit_outcome_not_authorised"};
  if(!result||result.packageCustody!=="KAKASHI"||result.amtReached!==reached)return{success:false,reason:"kakashi_secure_package_amt_pursuit_result_mismatch"};
  if(reached&&result.pakkunPresent!==true)return{success:false,reason:"kakashi_secure_package_amt_pursuit_success_requires_pakkun_entry"};
  if(escaped&&result.pakkunPresent===true)return{success:false,reason:"kakashi_secure_package_amt_pursuit_failure_cannot_invent_pakkun"};
  const occurrenceId=String(request&&request.committedAtOccurrenceRef||securePackageAmtPursuitOccurrenceRef(rt,parentOccurrenceId,receipt));
  const fact={factClass:"academy_kakashi_secure_package_amt_pursuit_factual_state",anchorRef:SECURE_PACKAGE_POST_RESOLUTION_ANCHOR,parentOccurrenceRef:parentOccurrenceId,storyDecisionReceiptId:String(receipt&&receipt.storyDecisionReceiptId||""),storyFactualResolverReceiptId:String(receipt&&receipt.storyFactualResolverReceiptId||""),selectedOutcomeRef:selected,storySceneInstanceId:String(rt.instanceId||""),packageState:{objectRef:WORLD_OBJECT_REF,currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"},participantStateByRef:{[AMT_REF]:{reachState:reached?"REACHED":"ESCAPED"},[PAKKUN_REF]:{presenceState:reached?"PRESENT":"NOT_PRESENT"}},worldFacts:{packageCustody:"KAKASHI",amtReached:reached,amtEscaped:escaped,pakkunPresent:reached},nextSituationRef:reached?"academy_kakashi.pakkun_intercept":"academy_kakashi.debrief"};
  let existing=A.findOccurrence(occurrenceId);
  if(existing){const ef=factOf(existing);if(String(ef.selectedOutcomeRef||"")!==selected||String(ef.parentOccurrenceRef||"")!==parentOccurrenceId)return{success:false,reason:"kakashi_secure_package_amt_pursuit_occurrence_replay_mismatch"};}
  else{const committed=A.commitOccurrence(ORIGIN_ID,occurrenceId,fact,[],{type:"origin_story_factual_occurrence",outcome:selected,participantRefs:reached?[ORIGIN_ID,AMT_REF,PAKKUN_REF]:[ORIGIN_ID,AMT_REF],sourceRefs:[{type:"origin_occurrence",id:parentOccurrenceId},{type:"story_decision_receipt",id:String(receipt&&receipt.storyDecisionReceiptId||"")},{type:"story_factual_resolver_receipt",id:String(receipt&&receipt.storyFactualResolverReceiptId||"")},{type:"world_object",id:WORLD_OBJECT_REF}]});if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_secure_package_amt_pursuit_occurrence_commit_failed"};existing=committed.record;}
  const worldStateRef=PROVIDER.stableRef("sc34120-secure-package-amt-pursuit-world",{occurrenceId,selected});
  const participantStateRef=PROVIDER.stableRef("sc34120-secure-package-amt-pursuit-participant",{occurrenceId,selected});
  return{success:true,occurrenceId,consequenceRefs:[occurrenceId],stateDeltaRefs:[worldStateRef],knowledgeDeltaRefs:[],relationshipHistoryRefs:[],objectiveDeltaRefs:[],objectCustodyDeltaRefs:[],participantStateDeltaRefs:[participantStateRef],successorSituationRef:reached?"academy_kakashi.pakkun_intercept":"academy_kakashi.debrief"};
}

function getCommitResult(bindingRef){const ref=String(bindingRef||"");if(ref===GET_CLOSER_BINDING)return commitGetCloser;if(ref===HANDOFF_BINDING)return commitGetCloserHandoff;if(ref===STAY_PACKAGE_PURSUIT_BINDING)return commitStayOnPackagePursuit;if(ref===SECURE_PACKAGE_AMT_PURSUIT_BINDING)return commitSecurePackageAmtPursuit;return null;}
function bridgeResult(factual){const receipt=factual.receipt||{};return{success:true,resolverResultRef:receipt.storyFactualResolverReceiptId||null,consequenceRefs:receipt.consequenceRefs||[],stateDeltaRefs:receipt.stateDeltaRefs||[],knowledgeDeltaRefs:receipt.knowledgeDeltaRefs||[],relationshipHistoryRefs:receipt.relationshipHistoryRefs||[],objectiveDeltaRefs:receipt.objectiveDeltaRefs||[],successorSituationRef:receipt.successorSituationRef||null,result:clone(factual.result||receipt.result||null)};}
function resolveOpeningGetCloser(choice){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!=="kak_original_action")return{success:false,reason:"kakashi_get_closer_opening_context_missing"};
  const intent=ensureOpeningIntent(rt);if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_get_closer_intent_unavailable"};
  const occurrenceId=getCloserOccurrenceRef(rt,intent.receipt);
  const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:GET_CLOSER_BINDING,actorRef:ORIGIN_ID,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:PROVIDER.stableRef("sc34120-get-closer-idempotence",{storySceneInstanceId:String(rt.instanceId),storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[FINAL_WRITING,DECISION_MATRIX,FACTUAL_PROVIDER_AUTHORITY],inputStateRefs:[intent.contextStateRef],continuityLineageRef:String(rt.instanceId),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId),sceneId:SCENE_ID,beatId:rt.beatId}});
  if(!factual||factual.success!==true)return factual||{success:false,reason:"kakashi_get_closer_factual_resolution_failed"};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:intent.receipt.storyDecisionReceiptId,state:{resolverResults:{[GET_CLOSER_BINDING]:bridgeResult(factual)}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId)}});
  if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_get_closer_semantic_dispatch_failed"};
  const nextDecisionPointRef=String(factual.result&&factual.result.nextDecisionPointRef||"");const successor=KAK.openDecisionPoint(nextDecisionPointRef,{committedStateRef:occurrenceId,beatRef:nextDecisionPointRef==="AK_SA_005"?SUCCESS_BEAT:FAILURE_BEAT,sourceOccurrenceRefs:[occurrenceId]});if(!successor||successor.success!==true)return successor||{success:false,reason:"kakashi_get_closer_successor_choice_set_failed"};
  const selected=String(factual.receipt&&factual.receipt.selectedOutcomeRef||"");choice.nextBeatId=selected==="GET_CLOSER_SUCCESS"?SUCCESS_BEAT:selected==="GET_CLOSER_FAILURE"?FAILURE_BEAT:null;if(!choice.nextBeatId)return{success:false,reason:"kakashi_get_closer_successor_beat_unknown"};
  rt.localContext={...(rt.localContext||{}),kakashiGetCloserOutcomeRef:selected,kakashiGetCloserOccurrenceId:occurrenceId,kakashiGetCloserSuccessorDecisionPointRef:nextDecisionPointRef,kakashiGetCloserSuccessorChoiceSetId:successor.choiceSet.choiceSetId};save();
  return{success:true,occurrenceId,selectedOutcomeRef:selected,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,storyFactualResolverReceiptId:factual.receipt.storyFactualResolverReceiptId,successorChoiceSetId:successor.choiceSet.choiceSetId,nextBeatId:choice.nextBeatId};
}
function resolveGetCloserHandoff(choice){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==SUCCESS_BEAT)return{success:false,reason:"kakashi_get_closer_handoff_context_missing"};
  const parent=requireGetCloserSuccessParent(rt);if(!parent||parent.success!==true)return parent||{success:false,reason:"kakashi_get_closer_handoff_parent_missing"};
  const intent=ensureHandoffIntent(rt,parent.parentOccurrenceId);if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_get_closer_handoff_intent_unavailable"};
  const occurrenceId=handoffOccurrenceRef(rt,parent.parentOccurrenceId,intent.receipt);
  const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:HANDOFF_BINDING,actorRef:ORIGIN_ID,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:PROVIDER.stableRef("sc34120-get-closer-handoff-idempotence",{storySceneInstanceId:String(rt.instanceId),parentOccurrenceId:parent.parentOccurrenceId,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[FINAL_WRITING,DECISION_MATRIX,FACTUAL_PROVIDER_AUTHORITY],inputStateRefs:[parent.parentOccurrenceId],continuityLineageRef:String(rt.instanceId),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId),sceneId:SCENE_ID,beatId:rt.beatId,parentOccurrenceRef:parent.parentOccurrenceId}});
  if(!factual||factual.success!==true)return factual||{success:false,reason:"kakashi_get_closer_handoff_factual_resolution_failed"};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:intent.receipt.storyDecisionReceiptId,state:{resolverResults:{[HANDOFF_BINDING]:bridgeResult(factual)}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId)}});if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_get_closer_handoff_semantic_dispatch_failed"};
  const successor=KAK.openDecisionPoint(OBSERVE_DECISION_REF,{committedStateRef:occurrenceId,beatRef:HANDOFF_BEAT,sourceOccurrenceRefs:[parent.parentOccurrenceId,occurrenceId]});if(!successor||successor.success!==true)return successor||{success:false,reason:"kakashi_get_closer_handoff_observe_choice_set_failed"};
  choice.nextBeatId=HANDOFF_BEAT;rt.localContext={...(rt.localContext||{}),kakashiGetCloserHandoffOccurrenceId:occurrenceId,kakashiGetCloserHandoffOutcomeRef:HANDOFF_OUTCOME,kakashiObserveEscalationChoiceSetId:successor.choiceSet.choiceSetId};save();
  return{success:true,occurrenceId,parentOccurrenceId:parent.parentOccurrenceId,selectedOutcomeRef:HANDOFF_OUTCOME,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,storyFactualResolverReceiptId:factual.receipt.storyFactualResolverReceiptId,successorChoiceSetId:successor.choiceSet.choiceSetId,nextBeatId:HANDOFF_BEAT};
}
function resolveStayOnPackagePursuit(choice){
  const rt=active();if(!rt||rt.sceneId!==SCENE_ID||rt.beatId!==FAILURE_BEAT)return{success:false,reason:"kakashi_stay_package_pursuit_context_missing"};
  const parent=requireGetCloserFailureParent(rt);if(!parent||parent.success!==true)return parent||{success:false,reason:"kakashi_stay_package_pursuit_parent_missing"};
  const intent=ensureStayPackageIntent(rt,parent.parentOccurrenceId);if(!intent||intent.success!==true)return intent||{success:false,reason:"kakashi_stay_package_pursuit_intent_unavailable"};
  const occurrenceId=stayPackagePursuitOccurrenceRef(rt,parent.parentOccurrenceId,{storyFactualResolverReceiptId:intent.receipt.storyDecisionReceiptId});
  const factual=PROVIDER.resolveStoryFactualAction({storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,bindingRef:STAY_PACKAGE_PURSUIT_BINDING,actorRef:ORIGIN_ID,intentCommitRef:intent.receipt.intentCommitRef,attemptOrdinal:1,idempotenceKey:PROVIDER.stableRef("sc34120-stay-package-pursuit-idempotence",{storySceneInstanceId:String(rt.instanceId),parentOccurrenceId:parent.parentOccurrenceId,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId}),authorityVersionRefs:[FINAL_WRITING,STAY_PACKAGE_AUTHORITY,DECISION_MATRIX,FACTUAL_PROVIDER_AUTHORITY],inputStateRefs:[parent.parentOccurrenceId],continuityLineageRef:String(rt.instanceId),committedAtOccurrenceRef:occurrenceId,context:{storySceneInstanceId:String(rt.instanceId),sceneId:SCENE_ID,beatId:rt.beatId,parentOccurrenceRef:parent.parentOccurrenceId}});
  if(!factual||factual.success!==true)return factual||{success:false,reason:"kakashi_stay_package_pursuit_factual_resolution_failed"};
  const dispatched=CORE.dispatchCommittedIntent({storyUnitRef:ORIGIN_ID,receiptId:intent.receipt.storyDecisionReceiptId,state:{resolverResults:{[STAY_PACKAGE_PURSUIT_BINDING]:bridgeResult(factual)}},context:{sceneRef:SCENE_ID,originId:ORIGIN_ID,storySceneInstanceId:String(rt.instanceId),selectedChoiceId:STAY_PACKAGE_CHOICE_ID}});if(!dispatched||dispatched.success!==true)return dispatched||{success:false,reason:"kakashi_stay_package_pursuit_semantic_dispatch_failed"};
  const selected=String(factual.receipt&&factual.receipt.selectedOutcomeRef||"");const reached=selected===STAY_PACKAGE_SUCCESS_OUTCOME,escaped=selected===STAY_PACKAGE_FAILURE_OUTCOME;if(!reached&&!escaped)return{success:false,reason:"kakashi_stay_package_pursuit_unknown_outcome"};
  let successorChoiceSetId=null;if(reached){const successor=KAK.openDecisionPoint("AK_SA_008",{committedStateRef:occurrenceId,beatRef:STAY_PACKAGE_SUCCESS_BEAT,sourceOccurrenceRefs:[parent.parentOccurrenceId,occurrenceId]});if(!successor||successor.success!==true)return successor||{success:false,reason:"kakashi_pakkun_intercept_choice_set_failed"};successorChoiceSetId=successor.choiceSet.choiceSetId;}choice.nextBeatId=STAY_PACKAGE_CHASE_BEAT;
  rt.localContext={...(rt.localContext||{}),kakashiGetCloserStayPackagePursuitOccurrenceId:occurrenceId,kakashiGetCloserStayPackagePursuitOutcomeRef:selected,kakashiGetCloserStayPackagePakkunPresent:reached,kakashiGetCloserStayPackageInterceptionChoiceSetId:successorChoiceSetId};save();
  return{success:true,occurrenceId,parentOccurrenceId:parent.parentOccurrenceId,selectedOutcomeRef:selected,storyDecisionReceiptId:intent.receipt.storyDecisionReceiptId,storyFactualResolverReceiptId:factual.receipt.storyFactualResolverReceiptId,successorChoiceSetId,nextBeatId:choice.nextBeatId,packageHolderClass:"ANBU_MARKED_TARGET",pakkunPresent:reached};
}

function installGetCloserStoryConsumer(){
  const def=scene();if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_story_definition_missing"};
  const action=def.beatMap.get("kak_original_action");if(!action||!Array.isArray(action.choices))return{success:false,reason:"kakashi_opening_choice_beat_missing"};
  const openingChoice=action.choices.find(row=>row&&row.choiceId===GET_CLOSER_CHOICE_ID);if(!openingChoice)return{success:false,reason:"kakashi_get_closer_choice_missing"};
  const environmentRef=(def.beatMap.get("kak_original_transfer")||{}).environmentRef||action.environmentRef||null;
  const blocker=GUARD.blocker||"This route is not available in the current Alpha build.";const blocked=available(false,blocker);
  const beats=[
    {beatId:STAY_PACKAGE_CHASE_BEAT,mode:"narration",environmentRef:{assetId:"kakashi_origin_sakura_tree_night"},objectiveText:"Recover the package.",text:STAY_BRANCH_CUES[0]&&STAY_BRANCH_CUES[0].text||"Kakashi commits to the package trail.",nextBeatId:null,exitScene:false,allowPresentationClose:false,choices:[]},
    {beatId:STAY_PACKAGE_FAILURE_BEAT,mode:"narration",environmentRef:{assetId:"kakashi_origin_sakura_tree_night"},objectiveText:"Return to ANBU.",text:STAY_FAILURE_CUES[0]&&STAY_FAILURE_CUES[0].text||"The target breaks the pursuit.",nextBeatId:TERMINAL_PENDING_BEAT,exitScene:false,allowPresentationClose:false,choices:[]},
    {beatId:SUCCESS_BEAT,mode:"choice",environmentRef,text:"Kakashi closes the distance without giving himself away. From the improved position, he has a clearer read on the exchange before the handoff completes.",choices:[{choiceId:HANDOFF_CHOICE_ID,label:"LET THEM MAKE THE HANDOFF",nextBeatId:HANDOFF_BEAT,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:HANDOFF_REQUEST_ID,kind:"domain",resolve:null}]},{choiceId:"strike_before_handoff",label:"STRIKE BEFORE THE HANDOFF",nextBeatId:SUCCESS_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"attempt_pickpocket",label:"SLIP IN FOR THE PACKAGE",nextBeatId:SUCCESS_BEAT,availability:blocked,knownBlocker:blocker}]},
    {beatId:FAILURE_BEAT,mode:"choice",environmentRef,text:"Kakashi's approach is spotted before the handoff completes. The exchange breaks: the package stays with its current holder while the other man remains behind.",choices:[{choiceId:STAY_PACKAGE_CHOICE_ID,label:"STAY WITH THE PACKAGE",nextBeatId:FAILURE_BEAT,availability:available(true),knownBlocker:null,consequenceRequests:[{requestId:STAY_PACKAGE_REQUEST_ID,kind:"domain",resolve:null}]},{choiceId:"stop_package_smuggler",label:"STOP THE MAN WHO SPOTTED YOU",nextBeatId:FAILURE_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"cut_off_sakura",label:"CUT THEM OFF AT THE SAKURA TREE",nextBeatId:FAILURE_BEAT,availability:blocked,knownBlocker:blocker}]},
    {beatId:HANDOFF_BEAT,mode:"choice",environmentRef,text:"The handoff completes. The second man takes the package. Only then does a masked woman cut into the exchange. Kakashi keeps the fuller read he gained by moving closer.",choices:[{choiceId:"stop_assassin",label:"CUT HER OFF",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"secure_package",label:"GO FOR THE PACKAGE",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"secure_package_before_assassin",label:"BEAT HER TO THE PACKAGE",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"defeat_assassin_then_secure",label:"DEAL WITH HER FIRST, THEN CHASE THE PACKAGE",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"go_after_original_target",label:"STAY ON THE FIRST MAN",nextBeatId:HANDOFF_BEAT,availability:blocked,knownBlocker:blocker}]},
    {beatId:STAY_PACKAGE_SUCCESS_BEAT,mode:"choice",text:"Kakashi cuts off the target's route. An unfamiliar ninken blocks the remaining exit. The package is still on the target; the pursuit is over, but the objective is not.",choices:[{choiceId:"demand_package",label:"DEMAND THE PACKAGE",nextBeatId:STAY_PACKAGE_SUCCESS_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"take_him_down",label:"TAKE HIM DOWN",nextBeatId:STAY_PACKAGE_SUCCESS_BEAT,availability:blocked,knownBlocker:blocker},{choiceId:"ask_where_package_was_going",label:"ASK WHERE THE PACKAGE WAS GOING",nextBeatId:STAY_PACKAGE_SUCCESS_BEAT,availability:blocked,knownBlocker:blocker}]}
  ];
  beats.forEach((beat,index)=>{const normalized=normalizedBeat(beat,920+index);if(normalized)def.beatMap.set(normalized.beatId,normalized);});
  const successBeat=def.beatMap.get(SUCCESS_BEAT);const handoffChoice=successBeat&&successBeat.choices.find(row=>row&&row.choiceId===HANDOFF_CHOICE_ID);if(!handoffChoice)return{success:false,reason:"kakashi_get_closer_handoff_choice_missing"};
  const failureBeat=def.beatMap.get(FAILURE_BEAT);const stayPackageChoice=failureBeat&&failureBeat.choices.find(row=>row&&row.choiceId===STAY_PACKAGE_CHOICE_ID);if(!stayPackageChoice)return{success:false,reason:"kakashi_stay_package_choice_missing"};
  handoffChoice.consequenceRequests=[{requestId:HANDOFF_REQUEST_ID,kind:"domain",resolve:()=>resolveGetCloserHandoff(handoffChoice)}];
  stayPackageChoice.consequenceRequests=[{requestId:STAY_PACKAGE_REQUEST_ID,kind:"domain",resolve:()=>resolveStayOnPackagePursuit(stayPackageChoice)}];stayPackageChoice.presentationTransition="wipe_right_to_left";
  openingChoice.label="MOVE IN CLOSER";openingChoice.nextBeatId=SUCCESS_BEAT;openingChoice.consequenceRequests=[{requestId:GET_CLOSER_REQUEST_ID,kind:"domain",resolve:()=>resolveOpeningGetCloser(openingChoice)}];openingChoice.contextPatch={...(openingChoice.contextPatch||{}),kakashiOriginalAction:"get_closer"};
  const released=typeof GUARD.releaseInitialChoice==="function"?GUARD.releaseInitialChoice(GET_CLOSER_CHOICE_ID,{successorProofRef:PATCH_ID,ownerRef:PATCH_ID,requiredConsequenceRequestId:GET_CLOSER_REQUEST_ID}):{success:false,reason:"kakashi_guard_release_api_missing"};
  if(!released||released.success!==true)return released;
  return{success:true,choiceId:GET_CLOSER_CHOICE_ID,beatIds:beats.map(row=>row.beatId),release:released,handoffChoiceId:HANDOFF_CHOICE_ID,stayPackageChoiceId:STAY_PACKAGE_CHOICE_ID};
}
function stayPerformanceSequence34120(rt=active()){
 if(!rt||rt.sceneId!==SCENE_ID)return null;
 if(rt.beatId===STAY_PACKAGE_CHASE_BEAT)return [...STAY_BRANCH_CUES,...STAY_PURSUIT_CUES];
 if(rt.beatId===STAY_PACKAGE_FAILURE_BEAT)return STAY_FAILURE_CUES;
 if(rt.beatId===STAY_PACKAGE_SUCCESS_BEAT&&!Boolean(rt.localContext&&rt.localContext.kakashiStayPackageInterceptionPerformanceComplete))return STAY_SUCCESS_CUES;
 return null;
}
function stayPerformance34120(rt=active()){
 const seq=stayPerformanceSequence34120(rt);if(!seq||!seq.length)return null;
 const row=rt.localContext&&rt.localContext[STAY_PERFORMANCE_CURSOR],index=row&&row.beatId===rt.beatId&&Number.isInteger(row.index)?Math.max(0,Math.min(seq.length-1,row.index)):0;
 return{sequence:seq,index,cue:seq[index],atEnd:index>=seq.length-1};
}
function persistStayPerformance34120(rt,index){rt.localContext={...(rt.localContext||{}),[STAY_PERFORMANCE_CURSOR]:{beatId:rt.beatId,index}};save();}
function clearStayPerformance34120(rt){if(rt&&rt.localContext&&Object.prototype.hasOwnProperty.call(rt.localContext,STAY_PERFORMANCE_CURSOR))delete rt.localContext[STAY_PERFORMANCE_CURSOR];}
let stayHooksInstalled34120=false,stayHookAttempts34120=0;
function installStayPerformanceHooks34120(){
 if(stayHooksInstalled34120)return true;
 if(typeof globalThis.getStoryScenePerformance33900!=="function"||typeof globalThis.advanceStoryScene!=="function")return false;
 const PRE_GET=globalThis.getStoryScenePerformance33900,PRE_ADVANCE=globalThis.advanceStoryScene;
 globalThis.getStoryScenePerformance33900=function getStoryScenePerformance34120(){const p=stayPerformance34120(active());return p||PRE_GET.apply(this,arguments);};
 globalThis.advanceStoryScene=function advanceStoryScene34120(choiceId=null){
  const rt=active(),p=stayPerformance34120(rt);
  if(!rt||rt.sceneId!==SCENE_ID||![STAY_PACKAGE_CHASE_BEAT,STAY_PACKAGE_FAILURE_BEAT,STAY_PACKAGE_SUCCESS_BEAT].includes(rt.beatId)||choiceId!==null&&choiceId!==undefined)return PRE_ADVANCE.apply(this,arguments);
  if(p&&!p.atEnd){persistStayPerformance34120(rt,p.index+1);try{renderStoryScenePresentationLayer();}catch(_e){}return{success:true,type:"kakashi_stay_package_performance_advanced",beatId:rt.beatId,cueIndex:p.index+1,semanticBeatUnchanged:true};}
  clearStayPerformance34120(rt);
  if(rt.beatId===STAY_PACKAGE_CHASE_BEAT){
   const reached=String(rt.localContext&&rt.localContext.kakashiGetCloserStayPackagePursuitOutcomeRef||"")===STAY_PACKAGE_SUCCESS_OUTCOME;
   rt.beatId=reached?STAY_PACKAGE_SUCCESS_BEAT:STAY_PACKAGE_FAILURE_BEAT;save();try{renderStoryScenePresentationLayer();}catch(_e){}
   return{success:true,beatId:rt.beatId,stayPackageOutcomeProjected:true};
  }
  if(rt.beatId===STAY_PACKAGE_FAILURE_BEAT){rt.beatId=TERMINAL_PENDING_BEAT;save();try{renderStoryScenePresentationLayer();}catch(_e){}return{success:true,beatId:TERMINAL_PENDING_BEAT};}
  // Success beat must expose its three choices after the interception performance.
  rt.localContext={...(rt.localContext||{}),kakashiStayPackageInterceptionPerformanceComplete:true};save();try{renderStoryScenePresentationLayer();}catch(_e){}
  return{success:true,beatId:STAY_PACKAGE_SUCCESS_BEAT,semanticBeatUnchanged:true,interceptionChoiceSurfaceReady:true};
 };
 try{getStoryScenePerformance33900=globalThis.getStoryScenePerformance33900;advanceStoryScene=globalThis.advanceStoryScene;}catch(_e){}
 stayHooksInstalled34120=true;return true;
}
function ensureStayPerformanceHooks34120(){if(installStayPerformanceHooks34120())return;if(typeof setTimeout==="function"&&stayHookAttempts34120++<100)setTimeout(ensureStayPerformanceHooks34120,25);}

function diagnostics(){
  const def=scene(),map=def&&def.beatMap instanceof Map?def.beatMap:null;const action=map&&map.get("kak_original_action");const openingChoice=action&&Array.isArray(action.choices)?action.choices.find(row=>row&&row.choiceId===GET_CLOSER_CHOICE_ID):null;const successBeat=map&&map.get(SUCCESS_BEAT),failureBeat=map&&map.get(FAILURE_BEAT),handoffBeat=map&&map.get(HANDOFF_BEAT),interceptBeat=map&&map.get(STAY_PACKAGE_SUCCESS_BEAT);const handoffChoice=successBeat&&Array.isArray(successBeat.choices)?successBeat.choices.find(row=>row&&row.choiceId===HANDOFF_CHOICE_ID):null;const stayPackageChoice=failureBeat&&Array.isArray(failureBeat.choices)?failureBeat.choices.find(row=>row&&row.choiceId===STAY_PACKAGE_CHOICE_ID):null;const guardState=typeof GUARD.getGuardState==="function"?GUARD.getGuardState():{};
  const checks={patchId:PATCH_ID==="alpha_kakashi_factual_state_commit_34120_v4_2026_09_20",stayPackageExactPerformance:STAY_BRANCH_CUES.some(x=>x.text==="There!")&&STAY_PURSUIT_CUES.some(x=>x.text==="The package.")&&STAY_SUCCESS_CUES.some(x=>x.text==="This yours?")&&STAY_FAILURE_CUES.some(x=>x.text==="ANBU."),stayPackageRoutesThroughPerformance:resolveStayOnPackagePursuit.toString().includes("STAY_PACKAGE_CHASE_BEAT"),originOccurrenceOwner:typeof A.commitOccurrence==="function"&&typeof A.findOccurrence==="function",neutralFactualProvider:PROVIDER.providerId==="ce.neutral_story_factual_resolver.v1",getCloserCommitOwner:getCommitResult(GET_CLOSER_BINDING)===commitGetCloser,handoffCommitOwner:getCommitResult(HANDOFF_BINDING)===commitGetCloserHandoff,stayPackagePursuitCommitOwner:getCommitResult(STAY_PACKAGE_PURSUIT_BINDING)===commitStayOnPackagePursuit,securePackageAmtPursuitCommitOwner:getCommitResult(SECURE_PACKAGE_AMT_PURSUIT_BINDING)===commitSecurePackageAmtPursuit,stayPackagePreservesAmtCustody:commitStayOnPackagePursuit.toString().includes('currentHolderClass:"ANBU_MARKED_TARGET"')&&commitStayOnPackagePursuit.toString().includes('objectCustodyDeltaRefs:[]'),stayPackagePakkunOnlyOnReach:commitStayOnPackagePursuit.toString().includes('presenceState:reached?"PRESENT":"NOT_PRESENT"')&&commitStayOnPackagePursuit.toString().includes('maskedInterceptorVisible:false'),securePackageVictoryCommitOwner:typeof commitSecurePackage2v1Victory==="function"&&commitSecurePackage2v1Victory.toString().includes('anchorRef:SECURE_PACKAGE_POST_RESOLUTION_ANCHOR'),securePackageCustodyExact:commitSecurePackage2v1Victory.toString().includes('currentHolderClass:"KAKASHI"')&&commitSecurePackage2v1Victory.toString().includes('locationClass:"KAKASHI_PERSON"'),securePackageNoParticipantCollapse:!commitSecurePackage2v1Victory.toString().includes("CONTROLLED_DEFEATED")&&!commitSecurePackage2v1Victory.toString().includes('lifeState:"dead"')&&commitSecurePackage2v1Victory.toString().includes('custodyState:"unresolved"'),securePackageAmtPursuitPreservesCustody:commitSecurePackageAmtPursuit.toString().includes('currentHolderClass:"KAKASHI"')&&commitSecurePackageAmtPursuit.toString().includes('packageCustody:"KAKASHI"'),securePackageAmtPursuitPakkunPredicate:commitSecurePackageAmtPursuit.toString().includes('presenceState:reached?"PRESENT":"NOT_PRESENT"'),exactOpeningLabel:!!openingChoice&&openingChoice.label==="MOVE IN CLOSER",exactCommitRequest:!!openingChoice&&Array.isArray(openingChoice.consequenceRequests)&&openingChoice.consequenceRequests.some(row=>row&&row.requestId===GET_CLOSER_REQUEST_ID),openingReleasedThrough34200:!!openingChoice&&typeof openingChoice.availability==="function"&&openingChoice.availability().available===true&&Array.isArray(guardState.releasedInitialChoiceIds)&&guardState.releasedInitialChoiceIds.includes(GET_CLOSER_CHOICE_ID),successorBeatsPresent:!!successBeat&&!!failureBeat&&!!handoffBeat&&!!interceptBeat,exactSuccessLabels:!!successBeat&&successBeat.choices.map(row=>row.label).join("|")==="LET THEM MAKE THE HANDOFF|STRIKE BEFORE THE HANDOFF|SLIP IN FOR THE PACKAGE",exactFailureLabels:!!failureBeat&&failureBeat.choices.map(row=>row.label).join("|")==="STAY WITH THE PACKAGE|STOP THE MAN WHO SPOTTED YOU|CUT THEM OFF AT THE SAKURA TREE",handoffReleased:!!handoffChoice&&typeof handoffChoice.availability==="function"&&handoffChoice.availability().available===true&&Array.isArray(handoffChoice.consequenceRequests)&&handoffChoice.consequenceRequests.some(row=>row&&row.requestId===HANDOFF_REQUEST_ID),remainingGetCloserSuccessorsFailClosed:!!successBeat&&successBeat.choices.filter(row=>row.choiceId!==HANDOFF_CHOICE_ID).every(row=>typeof row.availability==="function"&&row.availability().available===false),stayPackageReleased:!!stayPackageChoice&&typeof stayPackageChoice.availability==="function"&&stayPackageChoice.availability().available===true&&Array.isArray(stayPackageChoice.consequenceRequests)&&stayPackageChoice.consequenceRequests.some(row=>row&&row.requestId===STAY_PACKAGE_REQUEST_ID),stayPackageBlackWipe:!!stayPackageChoice&&stayPackageChoice.presentationTransition==="wipe_right_to_left",remainingGetCloserFailureSuccessorsFailClosed:!!failureBeat&&failureBeat.choices.filter(row=>row.choiceId!==STAY_PACKAGE_CHOICE_ID).every(row=>typeof row.availability==="function"&&row.availability().available===false),interceptChoicesExactAndGuarded:!!interceptBeat&&interceptBeat.choices.map(row=>row.choiceId).join("|")==="demand_package|take_him_down|ask_where_package_was_going"&&interceptBeat.choices.every(row=>typeof row.availability==="function"&&row.availability().available===false),exactObserveEscalationLabels:!!handoffBeat&&handoffBeat.choices.map(row=>row.label).join("|")==="CUT HER OFF|GO FOR THE PACKAGE|BEAT HER TO THE PACKAGE|DEAL WITH HER FIRST, THEN CHASE THE PACKAGE|STAY ON THE FIRST MAN",observeEscalationStillFailClosed:!!handoffBeat&&handoffBeat.choices.every(row=>typeof row.availability==="function"&&row.availability().available===false),missingInterceptionAssetNotFabricated:!installGetCloserStoryConsumer.toString().includes("alleyway_konoha_night"),noBattleInvented:!resolveOpeningGetCloser.toString().includes("launchAcademyKakashiOriginPlBattle")&&!resolveGetCloserHandoff.toString().includes("launchAcademyKakashiOriginPlBattle")&&!resolveStayOnPackagePursuit.toString().includes("launchAcademyKakashiOriginPlBattle"),browserGoldenClaimed:false};
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

ensureStayPerformanceHooks34120();
const api=Object.freeze({patchId:PATCH_ID,bindingRef:GET_CLOSER_BINDING,handoffBindingRef:HANDOFF_BINDING,stayPackagePursuitBindingRef:STAY_PACKAGE_PURSUIT_BINDING,securePackageAmtPursuitBindingRef:SECURE_PACKAGE_AMT_PURSUIT_BINDING,getCommitResult,commitGetCloser,commitGetCloserHandoff,commitStayOnPackagePursuit,commitSecurePackage2v1Victory,commitSecurePackageAmtPursuit,resolveStayOnPackagePursuit,installGetCloserStoryConsumer,beats:Object.freeze({stayPackageChase:STAY_PACKAGE_CHASE_BEAT,stayPackageSuccess:STAY_PACKAGE_SUCCESS_BEAT,stayPackageFailure:STAY_PACKAGE_FAILURE_BEAT}),diagnostics,browserGoldenClaimed:false});
globalThis.SC_ALPHA_KAKASHI_FACTUAL_STATE_34120=api;
globalThis.runAcademyKakashiFactualState34120Diagnostics=diagnostics;
})();
