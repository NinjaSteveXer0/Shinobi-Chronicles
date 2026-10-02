// ============================================================================
// PHASE 2 — FIRST LIVE CE HOTSPOT — #469 / #432
//
// Bounded Kakashi-Origin benchmark:
// frozen Origin truth -> participant continuity -> KON-P01 occurrence ->
// participant-first autonomy -> Kakashi intent -> observer-safe Chronicle record.
//
// This module deliberately does NOT create a second World, Story, Knowledge,
// relationship, team, Battle, or Shinobi Record authority.
// ============================================================================
(function installPhase2CeHotspot46900(){
"use strict";
if(globalThis.SC_PHASE2_CE_HOTSPOT_46900)return;

const PATCH_ID="phase2_ce_hotspot_46900_2026_10_02";
const EVENT_ID="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const OPPORTUNITY_ID=EVENT_ID;
const ACTION_ID="observe_masked_interceptor_admin_crossing";
const OCCURRENCE_ID="occ_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const SCENE_ID="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_v1";
const STORY_UNIT_REF=EVENT_ID;
const HOST_ID="KON-P01";
const ORIGIN_ID="academy_kakashi";
const MI_ID="academy_kakashi_origin_masked_interceptor";
const CONTINUITY_KEY=ORIGIN_ID+"::"+MI_ID;
const D=globalThis.SC_STORY_DECISION_REALISATION_34000;

if(!D)throw new Error("phase2_ce_hotspot_469_requires_story_decision_realisation_34000");
if(typeof globalThis.registerWorldEventOpportunity!=="function")throw new Error("phase2_ce_hotspot_469_requires_world_opportunity_runtime");
if(typeof globalThis.registerStoryScene!=="function")throw new Error("phase2_ce_hotspot_469_requires_story_scene_runtime");

const MI_BATTLE_CONFIGS=new Set([
  "academy_kakashi_origin_battle_amt_ps_mi_3v1",
  "academy_kakashi_origin_battle_ps_mi_2v1",
  "academy_kakashi_origin_battle_mi_1v1",
  "academy_kakashi_origin_battle_seq_mi"
]);

const TEAMMATE_AUTHORED_ORDER=Object.freeze([
  "academy_hinata",
  "academy_izuno",
  "academy_mirai",
  "academy_menma",
  "academy_kushina",
  "academy_kurenai",
  "academy_iwabee",
  "academy_metal_lee",
  "academy_obito"
]);

const TEAMMATE_LABELS=Object.freeze({
  academy_hinata:"HINATA",
  academy_izuno:"WASABI",
  academy_mirai:"MIRAI",
  academy_menma:"MENMA",
  academy_kushina:"KUSHINA",
  academy_kurenai:"KURENAI",
  academy_iwabee:"IWABEE",
  academy_metal_lee:"METAL",
  academy_obito:"OBITO"
});

const REACTIONS=Object.freeze({
  academy_hinata:Object.freeze({
    redundancyClass:"recognition_observation",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Hinata's eyes follow Masked Interceptor's attention back to Kakashi."}),
      Object.freeze({kind:"dialogue",speakerName:"HINATA",text:"She recognised you."})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Hinata shifts half a step until both Kakashi and the masked woman are in view."}),
      Object.freeze({kind:"narration",text:"Her mouth closes. She keeps watching."})
    ])
  }),
  academy_izuno:Object.freeze({
    redundancyClass:null,
    noStrong:true,
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Wasabi pivots before the others finish stopping."}),
      Object.freeze({kind:"narration",text:"She keeps Masked Interceptor in view, weight forward, hands loose."})
    ])
  }),
  academy_mirai:Object.freeze({
    redundancyClass:"recognition_observation",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Mirai watches the masked woman's feet rather than the mask."}),
      Object.freeze({kind:"dialogue",speakerName:"MIRAI",text:"She changed pace when she saw you."})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Mirai checks the receipt disappearing into the woman's sleeve, then the public intake window."}),
      Object.freeze({kind:"narration",text:"Her attention stays on the mismatch without claiming an explanation."})
    ])
  }),
  academy_menma:Object.freeze({
    redundancyClass:null,
    noStrong:true,
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Menma's eyes move from the stamped receipt, to the Administration doors, to Masked Interceptor, and finally to Kakashi."}),
      Object.freeze({kind:"narration",text:"He says nothing."})
    ])
  }),
  academy_kushina:Object.freeze({
    redundancyClass:"identity_question",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Kushina looks from Kakashi to the masked woman."}),
      Object.freeze({kind:"dialogue",speakerName:"KUSHINA",text:"Kakashi. Who is she?"})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Kushina's eyebrows rise."}),
      Object.freeze({kind:"narration",text:"When Kakashi does not answer immediately, she folds her arms."})
    ])
  }),
  academy_kurenai:Object.freeze({
    redundancyClass:null,
    noStrong:true,
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Kurenai tracks Masked Interceptor's eye-line instead of studying the mask."}),
      Object.freeze({kind:"narration",text:"Then she watches Kakashi."}),
      Object.freeze({kind:"narration",text:"She stays quiet."})
    ])
  }),
  academy_iwabee:Object.freeze({
    redundancyClass:"threat_check",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Iwabee tips his chin toward Masked Interceptor."}),
      Object.freeze({kind:"dialogue",speakerName:"IWABEE",text:"Problem?"})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Iwabee plants his feet and waits."}),
      Object.freeze({kind:"narration",text:"If Kakashi keeps moving, he moves too."})
    ])
  }),
  academy_metal_lee:Object.freeze({
    redundancyClass:null,
    noStrong:true,
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Metal straightens on reflex."}),
      Object.freeze({kind:"narration",text:"Masked Interceptor keeps walking; his hands stay at his sides."}),
      Object.freeze({kind:"narration",text:"He keeps watching."})
    ])
  }),
  academy_obito:Object.freeze({
    redundancyClass:"recognition_observation",
    strong:Object.freeze([
      Object.freeze({kind:"narration",text:"Obito looks from Kakashi to Masked Interceptor and back again."}),
      Object.freeze({kind:"dialogue",speakerName:"OBITO",text:"Wait—you know her?"})
    ]),
    fallback:Object.freeze([
      Object.freeze({kind:"narration",text:"Obito's eyebrows climb high enough to say the question without him repeating it aloud."})
    ])
  })
});

const HISTORY_CUES=Object.freeze({
  lethal_attempt:Object.freeze([
    Object.freeze({kind:"narration",text:"Masked Interceptor stops outside arm's reach."}),
    Object.freeze({kind:"narration",text:"Her hands settle at her sides."}),
    Object.freeze({kind:"dialogue",speakerName:"MASKED INTERCEPTOR",text:"Not here."})
  ]),
  police_transfer:Object.freeze([
    Object.freeze({kind:"narration",text:"Her eyes move from Kakashi to the Administration doors."}),
    Object.freeze({kind:"narration",text:"Then back to him."}),
    Object.freeze({kind:"narration",text:"She shifts half a step toward the outside edge of the path, leaving the centre clear between them."})
  ]),
  restraint_or_anbu:Object.freeze([
    Object.freeze({kind:"narration",text:"Her gaze drops once to Kakashi's hands."}),
    Object.freeze({kind:"narration",text:"One wrist turns inside her sleeve."}),
    Object.freeze({kind:"narration",text:"Then it stills."}),
    Object.freeze({kind:"narration",text:"She looks back at his face."})
  ]),
  deliberate_release:Object.freeze([
    Object.freeze({kind:"narration",text:"She recognises him."}),
    Object.freeze({kind:"narration",text:"This time she leaves the lane between them open."}),
    Object.freeze({kind:"narration",text:"A small inclination of her head is the only acknowledgement."})
  ]),
  mi_defeated_kakashi:Object.freeze([
    Object.freeze({kind:"narration",text:"Her eyes flick once to the shoulder she pinned against the stone that night."}),
    Object.freeze({kind:"narration",text:"Then back to Kakashi."}),
    Object.freeze({kind:"narration",text:"Her stride stays even."})
  ]),
  kakashi_defeated_mi:Object.freeze([
    Object.freeze({kind:"narration",text:"She recognises him and changes her path just enough to keep a clear arm's length between them."}),
    Object.freeze({kind:"narration",text:"She holds that distance as they cross."})
  ]),
  material_encounter:Object.freeze([
    Object.freeze({kind:"narration",text:"Her attention lands on Kakashi before it lands on either teammate."}),
    Object.freeze({kind:"narration",text:"That is enough to make the recognition mutual."})
  ])
});

const BRANCH_CUES=Object.freeze({
  acknowledge_recognition:Object.freeze([
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"I remember you."}),
    Object.freeze({kind:"narration",text:"Masked Interceptor's attention shifts past him to the two students at his side."}),
    Object.freeze({kind:"dialogue",speakerName:"MASKED INTERCEPTOR",text:"I remember you too."}),
    Object.freeze({kind:"dialogue",speakerName:"MASKED INTERCEPTOR",text:"They weren't there."}),
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"No."}),
    Object.freeze({kind:"narration",text:"Her gaze returns to Kakashi."}),
    Object.freeze({kind:"narration",text:"She leaves the rest unsaid, steps past him and continues down the forecourt."})
  ]),
  ask_about_delivery:Object.freeze([
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"What did you deliver?"}),
    Object.freeze({kind:"dialogue",speakerName:"MASKED INTERCEPTOR",text:"A dispatch."}),
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"From who?"}),
    Object.freeze({kind:"dialogue",speakerName:"MASKED INTERCEPTOR",text:"Ask the desk."}),
    Object.freeze({kind:"narration",text:"She presses two fingers briefly against the folded receipt inside her sleeve.\n\nThen she steps around the team and keeps walking."}),
    Object.freeze({kind:"narration",text:"At the intake window, the clerk is already working through the next visitor's papers."})
  ]),
  observe_intake_and_departure:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi says nothing.\n\nHe shifts out of her path but stays where he is."}),
    Object.freeze({kind:"narration",text:"Masked Interceptor passes him.\n\nAt the bottom of the steps, she glances back once.\n\nKakashi is still watching."}),
    Object.freeze({kind:"narration",text:"He turns his attention to the intake window instead of following her.\n\nThe clerk opens a ledger, sets a duplicate receipt beside it, makes an entry and clips the slip inside the page."}),
    Object.freeze({kind:"narration",text:"The next visitor steps forward.\n\nWhen Kakashi looks back across the forecourt, Masked Interceptor is taking the main path into the village traffic."})
  ]),
  disengage_keep_moving:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi turns away before she reaches them."}),
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"We're moving."}),
    Object.freeze({kind:"narration",text:"He keeps walking.\n\nHis teammates fall in around him.\n\nMasked Interceptor's footsteps pass behind them and continue toward the street."}),
    Object.freeze({kind:"narration",text:"Kakashi reaches the next corner without turning back.\n\nThe Administration falls behind the team."})
  ])
});

const CHOICES=Object.freeze([
  Object.freeze({id:"acknowledge_recognition",label:"Tell her you remember her.",intentType:"ACKNOWLEDGE_RECOGNITION"}),
  Object.freeze({id:"ask_about_delivery",label:"Ask about the delivery.",intentType:"ASK_INVESTIGATE_CURRENT_BUSINESS"}),
  Object.freeze({id:"observe_intake_and_departure",label:"Watch what she does.",intentType:"DELIBERATE_OBSERVATION"}),
  Object.freeze({id:"disengage_keep_moving",label:"Keep moving.",intentType:"DISENGAGE_DECLINE_INTERACTION"})
]);

const BRANCH_CONSEQUENCES=Object.freeze({
  acknowledge_recognition:Object.freeze({
    factualReceiptId:"mi_mutual_recognition_explicit_v1",
    branchKnowledge:Object.freeze({
      mutualRecognitionExplicit:true,
      currentTeammatesExplicitlyAbsentFromPriorEncounter:true
    }),
    teammateKnowledgeReceiptIds:Object.freeze(["kakashi_mi_prior_connection_observed_v1"]),
    teammateKnowledgeFacts:Object.freeze(["kakashi_mi_prior_connection","current_teammates_not_part_of_prior_encounter"]),
    sharedHistoryReceiptIds:Object.freeze(["kakashi_mi_prior_history_openly_acknowledged_v1"]),
    futureLeadIds:Object.freeze([]),
    teammateDisclosureFollowupEligible:true,
    privateMiFollowupEligible:true,
    recordAddendum:"Both openly acknowledged that they remembered each other. Masked Interceptor noted that Kakashi's current teammates were not present for the earlier encounter."
  }),
  ask_about_delivery:Object.freeze({
    factualReceiptId:"mi_dispatch_task_confirmed_v1",
    branchKnowledge:Object.freeze({
      documentTaskClass:"dispatch",
      dispatchSourceKnown:false,
      sourceDisclosureRefused:true,
      redirectedToAdministrationDesk:true
    }),
    teammateKnowledgeReceiptIds:Object.freeze(["mi_dispatch_task_confirmed_v1"]),
    teammateKnowledgeFacts:Object.freeze(["document_task_class_dispatch","dispatch_source_unknown","source_question_redirected_to_administration_desk"]),
    sharedHistoryReceiptIds:Object.freeze(["kakashi_questioned_mi_current_admin_business_v1"]),
    futureLeadIds:Object.freeze(["mi_admin_dispatch_inquiry_lead_v1"]),
    teammateDisclosureFollowupEligible:false,
    privateMiFollowupEligible:true,
    recordAddendum:"She described the document as a dispatch and redirected the source question to the Administration desk."
  }),
  observe_intake_and_departure:Object.freeze({
    factualReceiptId:"mi_public_intake_process_observed_v1",
    branchKnowledge:Object.freeze({
      publicIntakeLedgerObserved:true,
      mainPublicDepartureObserved:true,
      miNoticedObservation:true
    }),
    teammateKnowledgeReceiptIds:Object.freeze([]),
    teammateKnowledgeFacts:Object.freeze([]),
    sharedHistoryReceiptIds:Object.freeze(["kakashi_observed_mi_without_confrontation_v1","mi_noticed_kakashi_observation_v1"]),
    futureLeadIds:Object.freeze(["mi_admin_intake_process_lead_v1"]),
    teammateDisclosureFollowupEligible:false,
    privateMiFollowupEligible:true,
    recordAddendum:"Kakashi watched the public intake log the handoff before she left by the main approach."
  }),
  disengage_keep_moving:Object.freeze({
    factualReceiptId:"kakashi_declined_mi_contact_v1",
    branchKnowledge:Object.freeze({}),
    teammateKnowledgeReceiptIds:Object.freeze([]),
    teammateKnowledgeFacts:Object.freeze([]),
    sharedHistoryReceiptIds:Object.freeze(["kakashi_declined_mi_contact_v1"]),
    futureLeadIds:Object.freeze([]),
    teammateDisclosureFollowupEligible:false,
    privateMiFollowupEligible:false,
    recordAddendum:null
  })
});

function branchConsequence(choiceId){
  const row=BRANCH_CONSEQUENCES[choiceId];
  return row?clone(row):null;
}

const PRIVATE_ORIGIN_SCHEMA="sc.privateOriginHistory.v1";
const PRIVATE_ORIGIN_SUBJECT=ORIGIN_ID;
const PRIVATE_ORIGIN_DEFINITION="academy_kakashi_v2";
const PRIVATE_ORIGIN_VERSION="v3";
const MENMA_ID="academy_menma";
const HINATA_ID="academy_hinata";
const MENMA_STORY_UNIT_REF=EVENT_ID+":menma_private_history_emergence";
const MENMA_SCENE_ID="scene_konoha_ce_kakashi_masked_interceptor_admin_crossing_menma_v1";
const MENMA_ACTION_ID="observe_kakashi_private_history_emergence";

const AUTONOMOUS_KAKASHI_BOUNDARIES=Object.freeze({
  B01:Object.freeze({beatId:"v2_scene02_tail",choiceIds:Object.freeze(["watch_exchange","move_in_closer","strike_before_handoff","slip_for_package"])}),
  B02:Object.freeze({beatId:"v2_watch_exchange",choiceIds:Object.freeze(["stop_assassin","secure_package","secure_before_assassin","assassin_then_package","go_original_target"])}),
  B03:Object.freeze({beatId:"v2_mi_stop_win",choiceIds:Object.freeze(["mi_pursue_ps","mi_kill","mi_anbu","mi_police","mi_restrain"])}),
  B04:Object.freeze({beatId:"v2_ps_seq_win",choiceIds:Object.freeze(["ps_go_amt","ps_kill","ps_restrain_continue","ps_anbu","ps_police","ps_report"])}),
  B05:Object.freeze({beatId:"v2_amt_seq_win",choiceIds:Object.freeze(["amt_seq_police","amt_seq_release","amt_seq_kill","amt_seq_anbu","amt_seq_collect"])}),
  B06:Object.freeze({beatId:"v2_group_collect_choice",choiceIds:Object.freeze(["collect_one_mi_anbu","collect_one_mi_police","collect_one_ps_anbu","collect_one_ps_police","collect_one_amt_anbu","collect_one_amt_police","collect_group_anbu","collect_group_police"])}),
  B07:Object.freeze({beatId:"v2_amt_missing_win",choiceIds:Object.freeze(["amt_missing_kill","amt_missing_restrain","amt_missing_anbu","amt_missing_police"])}),
  B08:Object.freeze({beatId:"v2_ps_mi_win",choiceIds:Object.freeze(["secure_stay_first","secure_return"])}),
  B09:Object.freeze({beatId:"v2_secure_amt_win",choiceIds:Object.freeze(["secure_amt_police","secure_amt_release","secure_amt_kill","secure_amt_anbu"])}),
  B10:Object.freeze({beatId:"v2_ps_package_second_win",choiceIds:Object.freeze(["package_second_stay_amt","package_second_return"])}),
  B11:Object.freeze({beatId:"v2_amt_package_second_win",choiceIds:Object.freeze(["package_second_amt_police","package_second_amt_release","package_second_amt_kill","package_second_amt_anbu"])}),
  B12:Object.freeze({beatId:"v2_get_closer_success",choiceIds:Object.freeze(["closer_handoff","closer_strike","closer_pick"])}),
  B13:Object.freeze({beatId:"v2_closer_handoff",choiceIds:Object.freeze(["closer_watch_stop","closer_watch_secure","closer_watch_before","closer_watch_sequence","closer_watch_amt"])}),
  B14:Object.freeze({beatId:"v2_get_closer_failure",choiceIds:Object.freeze(["failure_stay","failure_stop_ps","failure_cutoff"])}),
  B15:Object.freeze({beatId:"v2_stay_package_intercept",choiceIds:Object.freeze(["demand_package","take_him_down","ask_where"])}),
  B16:Object.freeze({beatId:"v2_ask_where",choiceIds:Object.freeze(["ask_then_demand","ask_then_take"])}),
  B17:Object.freeze({beatId:"v2_demand_win",choiceIds:Object.freeze(["demand_police","demand_release","demand_kill","demand_anbu"])}),
  B18:Object.freeze({beatId:"v2_take_down_win",choiceIds:Object.freeze(["take_police","take_release","take_kill","take_anbu"])}),
  B19:Object.freeze({beatId:"v2_ps_missing_win",choiceIds:Object.freeze(["ps_missing_kill","ps_missing_restrain","ps_missing_anbu","ps_missing_police"])}),
  B20:Object.freeze({beatId:"v2_cutoff_win",choiceIds:Object.freeze(["cutoff_police","cutoff_anbu","cutoff_kill","cutoff_release"])}),
  B21:Object.freeze({beatId:"v2_improved_2v1_win",choiceIds:Object.freeze(["improved_police","improved_anbu","improved_kill","improved_release"])}),
  B22:Object.freeze({beatId:"v2_direct_mi_win",choiceIds:Object.freeze(["direct_group_police","direct_group_anbu","direct_group_kill","direct_group_release"])}),
  B23:Object.freeze({beatId:"v2_pickpocket_3v1_win",choiceIds:Object.freeze(["pick_group_police","pick_group_anbu","pick_group_kill","pick_group_release"])})
});
const AUTONOMOUS_KAKASHI_CHOICE_IDS=Object.freeze(Object.values(AUTONOMOUS_KAKASHI_BOUNDARIES).flatMap(row=>row.choiceIds));

const MENMA_CHOICES=Object.freeze([
  Object.freeze({id:"menma_ask_kakashi_prior_connection",label:"Ask Kakashi what happened.",intentType:"ASK_KAKASHI_PRIOR_CONNECTION"}),
  Object.freeze({id:"menma_ask_mi_prior_connection",label:"Ask her how she knows Kakashi.",intentType:"ASK_MI_PRIOR_CONNECTION"}),
  Object.freeze({id:"menma_yield_to_kakashi",label:"Let Kakashi handle it.",intentType:"YIELD_TO_KAKASHI_AUTONOMY"}),
  Object.freeze({id:"menma_disengage",label:"Keep moving.",intentType:"DISENGAGE_CURRENT_TEAM"})
]);

const KAKASHI_CURRENT_RESPONSE_CUES=Object.freeze({
  lethal_attempt:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi's eyes drop once to her hands."}),
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"I know."}),
    Object.freeze({kind:"narration",text:"His own hands stay clear of his weapons."})
  ]),
  police_transfer:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi follows her glance toward the Administration doors.\n\nThen he looks back at her.\n\nHe says nothing."})
  ]),
  restraint_or_anbu:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi notices the turn of her wrist.\n\nHis gaze stays there for one second too long.\n\nThen he looks toward the public intake window."})
  ]),
  deliberate_release:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi returns the small inclination of her head.\n\nNothing warmer is added."})
  ]),
  mi_defeated_kakashi:Object.freeze([
    Object.freeze({kind:"narration",text:"Her glance reaches his shoulder.\n\nKakashi rolls it once."}),
    Object.freeze({kind:"dialogue",speakerName:"KAKASHI",text:"I remember."})
  ]),
  kakashi_defeated_mi:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi sees the distance she keeps.\n\nHe does not close it.\n\nHis attention moves from her stance to the receipt hidden in her sleeve."})
  ]),
  material_encounter:Object.freeze([
    Object.freeze({kind:"narration",text:"Kakashi stops fully.\n\nHe watches her for the next move instead of explaining the recognition."})
  ])
});
const HINATA_RESPONSE_CUES=Object.freeze({
  danger:Object.freeze([
    Object.freeze({kind:"narration",text:"Hinata looks between them."}),
    Object.freeze({kind:"dialogue",speakerName:"HINATA",text:"That sounded specific."})
  ]),
  explicit_history:Object.freeze([
    Object.freeze({kind:"narration",text:"Hinata's eyes narrow slightly."}),
    Object.freeze({kind:"dialogue",speakerName:"HINATA",text:"You two have history."})
  ]),
  visible_recognition:Object.freeze([
    Object.freeze({kind:"narration",text:"Hinata watches the way the masked woman's attention stays on Kakashi."}),
    Object.freeze({kind:"dialogue",speakerName:"HINATA",text:"She knows you."})
  ]),
  quiet:Object.freeze([
    Object.freeze({kind:"narration",text:"Hinata shifts until both Kakashi and the masked woman are in view.\n\nShe keeps quiet."})
  ])
});

function clone(value){
  if(value===undefined)return undefined;
  try{return typeof cloneProgressionData==="function"?cloneProgressionData(value):JSON.parse(JSON.stringify(value));}
  catch(_error){return value;}
}
function pd(){try{return typeof playerData!=="undefined"&&playerData?playerData:globalThis.playerData||null;}catch(_error){return globalThis.playerData||null;}}
function history(){const p=pd();return p&&Array.isArray(p.activityHistory)?p.activityHistory:[];}
function acquisition(){const p=pd();return p&&p.acquisition&&typeof p.acquisition==="object"?p.acquisition:null;}
function stableHash46900(input){
  let h=2166136261;
  const raw=String(input||"");
  for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}
  return h>>>0;
}
function privateOriginStore(create=false){
  if(typeof globalThis.getPrivateOriginHistoryStore43600!=="function")return null;
  return globalThis.getPrivateOriginHistoryStore43600({create:create===true});
}
function storedKakashiPrivateHistory(){
  const store=privateOriginStore(false);
  const row=store&&store.bySubject&&store.bySubject[PRIVATE_ORIGIN_SUBJECT];
  return row&&typeof row==="object"?clone(row):null;
}
function chronicleStableId46900(){
  const p=pd(),a=acquisition(),origin=a&&a.chronicleOrigin;
  const explicit=[
    p&&p.chronicleId,
    p&&p.chronicleIdentity&&p.chronicleIdentity.id,
    a&&a.chronicleId
  ].find(value=>value!=null&&String(value).trim());
  if(explicit)return String(explicit);
  const completionRefs=origin&&Array.isArray(origin.completionEvidenceIds)?origin.completionEvidenceIds.filter(Boolean).map(String).sort():[];
  if(a&&a.chronicleOriginVariantId&&completionRefs.length)return["chronicle",a.chronicleOriginVariantId,...completionRefs].join("::");
  const fallback=[a&&a.chronicleOriginOwnedCharacterId,a&&a.ninjaIdentityOwnedCharacterId,a&&a.chronicleOriginVariantId].find(value=>value!=null&&String(value).trim());
  return String(fallback||"anonymous_chronicle");
}
function privateSeedRef46900(){
  return [PRIVATE_ORIGIN_SCHEMA,chronicleStableId46900(),PRIVATE_ORIGIN_SUBJECT,PRIVATE_ORIGIN_DEFINITION,PRIVATE_ORIGIN_VERSION].join("::");
}
function stablePick46900(boundaryId,choiceIds,seedRef=privateSeedRef46900()){
  const legal=(choiceIds||[]).filter(id=>AUTONOMOUS_KAKASHI_BOUNDARIES[boundaryId]&&AUTONOMOUS_KAKASHI_BOUNDARIES[boundaryId].choiceIds.includes(id));
  if(!legal.length)return null;
  return legal[stableHash46900(seedRef+"|"+boundaryId+"|intent")%legal.length];
}
function privateStoryUnitRef46900(seedRef){
  return ORIGIN_ID+":autonomous_private:"+stableHash46900(String(seedRef||"")).toString(16);
}
function privateChoiceReceipt46900(boundaryId,choiceId,seedRef,eligibleChoiceIds=[]){
  const boundary=AUTONOMOUS_KAKASHI_BOUNDARIES[boundaryId];
  if(!boundary||!boundary.choiceIds.includes(choiceId))throw new Error("ce478_autonomous_choice_not_in_frozen_profile:"+boundaryId+":"+choiceId);
  const eligible=[...new Set((eligibleChoiceIds||[]).filter(id=>boundary.choiceIds.includes(id)))];
  if(!eligible.includes(choiceId))eligible.push(choiceId);
  const storyUnitRef=privateStoryUnitRef46900(seedRef);
  const opened=D.openSemanticChoiceSet({
    storyUnitRef,
    storyUnitType:"origin_private_history",
    decisionPointRef:"academy_kakashi.v2.autonomous_private."+boundaryId,
    contextStateRef:storyUnitRef+":"+boundaryId,
    authorityVersionRefs:["Academy_Kakashi_Autonomous_Origin_Intent_Profile_2026-10-02"],
    sourceOccurrenceRefs:[],
    observerRef:ORIGIN_ID,
    excludedIntentRefs:[],
    choices:eligible.map((id,index)=>({
      choiceId:id,
      intentType:"AUTONOMOUS_PRIVATE_"+id.toUpperCase(),
      intentPayload:{subjectStableId:ORIGIN_ID,boundaryId,originDefinitionId:PRIVATE_ORIGIN_DEFINITION},
      eligibilityBasisRefs:["profile_boundary:"+boundaryId],
      resolverBindingRef:"ce478.private_origin.intent."+id,
      presentationLabel:id,
      authoredOrder:index
    }))
  });
  if(!opened||opened.success!==true)throw new Error("ce478_private_choice_set_failed:"+boundaryId+":"+(opened&&opened.reason||"unknown"));
  const committed=D.commitStoryIntent({storyUnitRef,choiceSetId:opened.choiceSet.choiceSetId,choiceId});
  if(!committed||committed.success!==true)throw new Error("ce478_private_choice_intent_failed:"+boundaryId+":"+(committed&&committed.reason||"unknown"));
  return{
    ...clone(committed.receipt),
    boundaryId,
    beatId:boundary.beatId,
    choiceId,
    receiptId:committed.receipt.storyDecisionReceiptId,
    stableSeedRef:seedRef,
    eligibleCharacterIntentRefs:[...eligible],
    privateOriginHistory:true,
    committed:true
  };
}
function resolvePrivateBattle46900(battleConfigId,boundaryId,seedRef){
  if(typeof globalThis.resolveAcademyKakashiV2AutonomousPrivateBattle36010!=="function")return{success:false,reason:"kakashi_autonomous_battle_owner_missing"};
  return globalThis.resolveAcademyKakashiV2AutonomousPrivateBattle36010({
    battleConfigId,
    seedRef:seedRef+"|"+boundaryId,
    sourceAnchorRef:boundaryId,
    resolutionMode:"AUTONOMOUS_PRIVATE"
  });
}
function privateHistoryIdentity46900(seedRef){
  return "private_origin::"+PRIVATE_ORIGIN_SUBJECT+"::"+stableHash46900(seedRef).toString(16);
}
function persistKakashiPrivateHistory46900(row){
  if(!row||row.committed!==true)return{success:false,reason:"private_origin_history_uncommitted"};
  const store=privateOriginStore(true);
  if(!store||!store.bySubject)return{success:false,reason:"private_origin_history_store_missing"};
  const prior=store.bySubject[PRIVATE_ORIGIN_SUBJECT];
  if(prior&&prior.committed===true){
    const same=String(prior.privateOriginHistoryId||"")===String(row.privateOriginHistoryId||"");
    return same?{success:true,idempotent:true,history:clone(prior)}:{success:false,reason:"private_origin_history_conflict",existing:clone(prior)};
  }
  store.bySubject[PRIVATE_ORIGIN_SUBJECT]=clone(row);
  const continuity=row.miContinuity&&typeof row.miContinuity==="object"?row.miContinuity:null;
  if(continuity){
    const saved=saveContinuity(continuity);
    if(!saved||saved.success!==true){
      delete store.bySubject[PRIVATE_ORIGIN_SUBJECT];
      return saved||{success:false,reason:"private_origin_continuity_import_failed"};
    }
  }
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,idempotent:false,history:clone(store.bySubject[PRIVATE_ORIGIN_SUBJECT])};
}
function autonomousMiContinuity46900({historyId,fieldDispositionState,materialHistory,materialRefs,encountered,survived}){
  return{
    schemaVersion:1,
    originId:ORIGIN_ID,
    stableParticipantId:MI_ID,
    observerLabel:"Masked Interceptor",
    originOccurrenceRef:historyId,
    storySceneInstanceId:null,
    encounteredByProtagonist:encountered===true,
    fieldDispositionState:String(fieldDispositionState||"UNSEEN"),
    fieldDispositionOccurrenceRef:materialRefs.length?materialRefs[materialRefs.length-1]:null,
    survivedOrigin:survived===true,
    hiddenPostTestReviewReached:encountered===true&&survived===true,
    postTestTruthClass:encountered===true&&survived===true?"staged_konoha_test_participant":null,
    protagonistKnowsTestTruth:false,
    materialHistory:clone(materialHistory),
    materialHistoryRefs:[...materialRefs],
    captureMode:"autonomous_private_origin_sealed",
    capturedAt:Date.now()
  };
}
function privateMachineBinding46900(key){
  const map={
    getCloser:"academy_kakashi.v2.get_closer",
    directPickpocket:"academy_kakashi.v2.pickpocket_direct",
    improvedPickpocket:"academy_kakashi.v2.pickpocket_improved",
    secureBefore:"academy_kakashi.v2.secure_before_assassin",
    psPursuit:"academy_kakashi.v2.ps_pursuit",
    amtPursuitRoot:"academy_kakashi.v2.amt_pursuit_root",
    secureAmtPursuit:"academy_kakashi.v2.secure_amt_pursuit",
    stayPackagePursuit:"academy_kakashi.v2.stay_package_pursuit"
  };
  return map[key]||null;
}
function resolvePrivateMachine46900(key,seedRef,{bindingRef=null,eligibleOutcomeRefs=null}={}){
  const F=globalThis.SC_STORY_FACTUAL_RESOLVER_34600;
  const binding=String(bindingRef||privateMachineBinding46900(key)||"");
  if(!F||typeof F.resolveStoryFactualAction!=="function"||!binding)return{success:false,reason:"private_origin_factual_resolver_unavailable",key,bindingRef:binding};
  const storyUnitRef=privateStoryUnitRef46900(seedRef);
  const machineChoiceId="machine::"+key;
  const opened=D.openSemanticChoiceSet({
    storyUnitRef,
    storyUnitType:"origin_private_history",
    decisionPointRef:"academy_kakashi.v2.autonomous_private.machine."+key,
    contextStateRef:storyUnitRef+":machine:"+key,
    authorityVersionRefs:["Academy_Kakashi_Origin_100_Percent_Writing_Closure_2026-09-20"],
    sourceOccurrenceRefs:[],
    observerRef:ORIGIN_ID,
    choices:[{
      choiceId:machineChoiceId,
      intentType:"MACHINE_FACTUAL_RESOLUTION",
      intentPayload:{subjectStableId:ORIGIN_ID,key},
      eligibilityBasisRefs:["machine_gate:"+key],
      resolverBindingRef:binding,
      presentationLabel:"RESOLVE RESULT",
      authoredOrder:0
    }]
  });
  if(!opened||opened.success!==true)return opened||{success:false,reason:"private_origin_machine_choice_set_failed",key};
  const committed=D.commitStoryIntent({storyUnitRef,choiceSetId:opened.choiceSet.choiceSetId,choiceId:machineChoiceId});
  if(!committed||committed.success!==true)return committed||{success:false,reason:"private_origin_machine_intent_failed",key};
  const idempotenceKey=F.stableRef("ce478-private-factual",{seedRef,key,binding});
  const result=F.resolveStoryFactualAction({
    storyDecisionReceiptId:committed.receipt.storyDecisionReceiptId,
    bindingRef:binding,
    actorRef:ORIGIN_ID,
    intentCommitRef:committed.receipt.intentCommitRef,
    attemptOrdinal:1,
    idempotenceKey,
    authorityVersionRefs:["Academy_Kakashi_Origin_100_Percent_Writing_Closure_2026-09-20","Academy_Kakashi_Autonomous_Origin_Intent_Profile_2026-10-02"],
    continuityLineageRef:seedRef,
    committedAtOccurrenceRef:"private_origin::"+key,
    eligibleOutcomeRefs:Array.isArray(eligibleOutcomeRefs)?eligibleOutcomeRefs:undefined,
    context:{resolutionMode:"AUTONOMOUS_PRIVATE",privateOrigin:true,subjectStableId:ORIGIN_ID,key}
  });
  if(!result||result.success!==true)return result||{success:false,reason:"private_origin_factual_resolution_failed",key};
  return{
    success:true,
    key,
    bindingRef:binding,
    selectedOutcomeRef:result.receipt&&result.receipt.selectedOutcomeRef||null,
    receiptId:result.receipt&&result.receipt.storyFactualResolverReceiptId||null,
    idempotenceKey,
    resolutionMode:result.receipt&&result.receipt.resolutionMode||null
  };
}
function resolvePrivateDisposition46900(intent,participantRef,causalKey,seedRef){
  const token={MI:"mi",PS:"ps",AMT:"amt"}[participantRef];
  if(!token)return{success:false,reason:"private_origin_disposition_participant_unknown",participantRef};
  const kind=String(intent||"").toUpperCase();
  if(!["KILL","RESTRAIN"].includes(kind))return{success:false,reason:"private_origin_disposition_intent_unknown",intent};
  return resolvePrivateMachine46900(
    "disposition:"+kind.toLowerCase()+":"+participantRef+":"+causalKey,
    seedRef,
    {bindingRef:"academy_kakashi.v2.disposition."+kind.toLowerCase()+"."+token}
  );
}
function initialPrivateOriginState46900(){
  return{
    package:{holder:"AMT",recovered:false,returned:false,neutral:false},
    participants:{MI:{state:"UNSEEN"},PS:{state:"AVAILABLE"},AMT:{state:"AVAILABLE"}},
    knowledge:{getCloserContingency:false,askWhere:false,downstreamDestinationKnown:false},
    pakkun:{present:false,departed:false},
    routeHistory:[],
    resolverResults:[],
    battles:{},
    collectedParticipantKeys:[],
    pressure:{directForceEscalations:0,dangerousResistance:0,failedStealth:0,multiOpponentVictories:0,battleDefeats:0},
    terminal:{reportReached:false,hiddenTestReviewReached:false,receiptReached:false,originCompleted:false,reason:null}
  };
}
function privateKakashiCapability46900(){
  const registry=typeof getCharacterRegistryEntry==="function"?getCharacterRegistryEntry(ORIGIN_ID):null;
  const stats=registry&&registry.stats&&typeof registry.stats==="object"?registry.stats:(registry&&registry.baseStats||{});
  const candidates=[registry&&registry.currentPL,registry&&registry.basePL,registry&&registry.powerLevel,registry&&registry.pl];
  let pl=null;
  for(const value of candidates){const n=Number(value);if(Number.isFinite(n)&&n>0){pl=n;break;}}
  const nin=Number(stats&&stats.nin||stats&&stats.Ninjutsu)||0;
  const tai=Number(stats&&stats.tai||stats&&stats.Taijutsu)||0;
  const buki=Number(stats&&stats.buki||stats&&stats.Bukijutsu)||0;
  return{
    pl:pl||15,nin,tai,buki,
    cleanExtractionSupported:(pl||15)>=12||nin>=10,
    directControlConfidence:(pl||15)>=18||Math.max(tai,buki)>=17,
    multiOpponentConfidence:(pl||15)>=20
  };
}
function privateChoiceSevereEligible46900(boundaryId,state){
  const p=state&&state.pressure||{};
  const direct=Number(p.directForceEscalations)||0;
  const resistance=Number(p.dangerousResistance)||0;
  const failedStealth=Number(p.failedStealth)||0;
  const multiWins=Number(p.multiOpponentVictories)||0;
  const battleDefeats=Number(p.battleDefeats)||0;
  if(["B22","B23"].includes(boundaryId))return direct>=1&&resistance>=2&&(multiWins>=1||failedStealth>=1);
  return (direct>=2&&resistance>=2)||(failedStealth>=1&&multiWins>=1)||battleDefeats>=2;
}
function privateBoundaryCandidates46900(boundaryId,state,seedRef,context={}){
  const severe=privateChoiceSevereEligible46900(boundaryId,state);
  const p=state.package||{},collected=state.collectedParticipantKeys||[];
  const capability=privateKakashiCapability46900();
  switch(boundaryId){
    case"B01":{
      const out=["watch_exchange","move_in_closer"];
      if(capability.cleanExtractionSupported)out.push("slip_for_package");
      if(capability.directControlConfidence&&p.holder==="AMT")out.push("strike_before_handoff");
      return out;
    }
    case"B02":{
      const immediateViolenceDominates=capability.pl<18&&!capability.multiOpponentConfidence;
      return immediateViolenceDominates?["stop_assassin","assassin_then_package"]:["secure_package","secure_before_assassin"];
    }
    case"B03":{
      const open=context.pursuitOpen===true;
      const out=open?["mi_pursue_ps","mi_restrain"]:["mi_anbu","mi_police"];
      if(severe)out.push("mi_kill");
      return out;
    }
    case"B04":{
      const open=context.amtContinuationOpen===true;
      const out=open?["ps_go_amt","ps_restrain_continue"]:["ps_report","ps_anbu","ps_police"];
      if(state.package.recovered===true&&!open)out.push("ps_report");
      if(severe)out.push("ps_kill");
      return [...new Set(out)];
    }
    case"B05":{
      if(collected.length)return["amt_seq_collect"];
      const out=["amt_seq_anbu","amt_seq_police"];
      if(p.recovered===true)out.push("amt_seq_release");
      if(severe)out.push("amt_seq_kill");
      return out;
    }
    case"B06":{
      if(collected.length===1){
        const ref=collected[0].toLowerCase();
        return["collect_one_"+ref+"_anbu","collect_one_"+ref+"_police"];
      }
      return["collect_group_anbu","collect_group_police"];
    }
    case"B07":{
      const out=["amt_missing_restrain","amt_missing_anbu","amt_missing_police"];
      if(severe)out.push("amt_missing_kill");
      return out;
    }
    case"B08":return["secure_stay_first","secure_return"];
    case"B09":{
      const out=["secure_amt_anbu","secure_amt_police"];
      if(p.recovered===true)out.push("secure_amt_release");
      if(severe)out.push("secure_amt_kill");
      return out;
    }
    case"B10":return context.amtContinuationOpen===true?["package_second_stay_amt","package_second_return"]:["package_second_return"];
    case"B11":{
      const out=["package_second_amt_anbu","package_second_amt_police"];
      if(p.recovered===true)out.push("package_second_amt_release");
      if(severe)out.push("package_second_amt_kill");
      return out;
    }
    case"B12":{
      const out=["closer_handoff"];
      if(capability.cleanExtractionSupported)out.push("closer_pick");
      if(capability.directControlConfidence)out.push("closer_strike");
      return out;
    }
    case"B13":{
      const immediateViolenceDominates=capability.pl<18&&!capability.multiOpponentConfidence;
      return immediateViolenceDominates?["closer_watch_stop","closer_watch_sequence"]:["closer_watch_secure","closer_watch_before"];
    }
    case"B14":{
      const out=["failure_stay","failure_cutoff"];
      if(capability.directControlConfidence)out.push("failure_stop_ps");
      return out;
    }
    case"B15":{
      const out=["demand_package","ask_where"];
      if(capability.directControlConfidence)out.push("take_him_down");
      return out;
    }
    case"B16":return capability.directControlConfidence?["ask_then_demand","ask_then_take"]:["ask_then_demand"];
    case"B17":{
      const out=["demand_anbu","demand_police"];
      if(p.recovered===true)out.push("demand_release");
      if(severe)out.push("demand_kill");
      return out;
    }
    case"B18":{
      const out=["take_anbu","take_police"];
      if(p.recovered===true)out.push("take_release");
      if(severe)out.push("take_kill");
      return out;
    }
    case"B19":{
      const out=["ps_missing_restrain","ps_missing_anbu","ps_missing_police"];
      if(severe)out.push("ps_missing_kill");
      return out;
    }
    case"B20":{
      const out=["cutoff_anbu","cutoff_police"];
      if(p.recovered===true)out.push("cutoff_release");
      if(severe)out.push("cutoff_kill");
      return out;
    }
    case"B21":{
      const out=["improved_anbu","improved_police"];
      if(p.recovered===true)out.push("improved_release");
      if(severe)out.push("improved_kill");
      return out;
    }
    case"B22":{
      const out=["direct_group_anbu","direct_group_police"];
      if(p.recovered===true)out.push("direct_group_release");
      if(severe)out.push("direct_group_kill");
      return out;
    }
    case"B23":{
      const out=["pick_group_anbu","pick_group_police"];
      if(p.recovered===true)out.push("pick_group_release");
      if(severe)out.push("pick_group_kill");
      return out;
    }
    default:return[];
  }
}
function selectPrivateBoundaryChoice46900(boundaryId,state,seedRef,context={}){
  const legal=privateBoundaryCandidates46900(boundaryId,state,seedRef,context)
    .filter(id=>AUTONOMOUS_KAKASHI_BOUNDARIES[boundaryId]&&AUTONOMOUS_KAKASHI_BOUNDARIES[boundaryId].choiceIds.includes(id));
  if(!legal.length)return{success:false,reason:"private_origin_zero_character_intents",boundaryId};
  const choiceId=stablePick46900(boundaryId,legal,seedRef);
  return{success:true,boundaryId,choiceId,eligibleCharacterIntentRefs:[...legal],severeLethalEligible:privateChoiceSevereEligible46900(boundaryId,state)};
}
function resolveAutonomousKakashiPrivateHistory46900({migrationReason="origin_convergence_preparation",seedRefOverride=null,persist=true,diagnosticPreview=false}={}){
  const existing=persist?storedKakashiPrivateHistory():null;
  if(existing&&existing.committed===true)return{success:true,idempotent:true,history:existing};
  const a=acquisition(),origin=a&&a.chronicleOrigin;
  if(!diagnosticPreview){
    if(!a||a.chronicleOriginVariantId===ORIGIN_ID)return{success:false,reason:"autonomous_kakashi_not_required_for_selected_kakashi"};
    if(!origin||origin.prologueCompleted!==true)return{success:false,reason:"selected_origin_must_complete_before_private_convergence"};
  }
  const seedRef=String(seedRefOverride||privateSeedRef46900());
  const historyId=privateHistoryIdentity46900(seedRef);
  const state=initialPrivateOriginState46900();
  const choices=[],battles=[],materialRefs=[],machineReceipts=[],semanticTrace=[];

  const addChoice=(boundaryId,context={})=>{
    const selected=selectPrivateBoundaryChoice46900(boundaryId,state,seedRef,context);
    if(!selected.success)throw new Error("ce478_private_choice_failed:"+boundaryId+":"+selected.reason);
    const receipt=privateChoiceReceipt46900(boundaryId,selected.choiceId,seedRef,selected.eligibleCharacterIntentRefs);
    receipt.severeLethalEligible=selected.severeLethalEligible===true;
    choices.push(receipt);materialRefs.push(receipt.receiptId);
    state.routeHistory.push({boundaryId,choiceId:selected.choiceId,receiptId:receipt.receiptId});
    semanticTrace.push("choice:"+boundaryId+":"+selected.choiceId);
    return selected.choiceId;
  };
  const machine=(key,opts={})=>{
    const row=resolvePrivateMachine46900(key,seedRef,opts);
    if(!row||row.success!==true)throw new Error("ce478_private_machine_failed:"+key+":"+(row&&row.reason||"unknown"));
    state.resolverResults.push(clone(row));machineReceipts.push(clone(row));
    if(row.receiptId)materialRefs.push(String(row.receiptId));
    semanticTrace.push("machine:"+key+":"+row.selectedOutcomeRef);
    return row.selectedOutcomeRef;
  };
  const battle=(key,configId)=>{
    const row=resolvePrivateBattle46900(configId,key,seedRef);
    if(!row||row.success!==true)throw new Error("ce478_autonomous_battle_failed:"+key+":"+(row&&row.reason||"unknown"));
    state.battles[key]=clone(row);battles.push(clone(row));materialRefs.push(String(row.battleOccurrenceId));
    state.pressure.directForceEscalations+=1;
    state.pressure.dangerousResistance+=row.oppositionParticipantRefs.length>=2?2:1;
    if(row.oppositionParticipantRefs.length>=2&&row.outcome==="victory")state.pressure.multiOpponentVictories+=1;
    if(row.outcome==="defeat")state.pressure.battleDefeats+=1;
    semanticTrace.push("battle:"+key+":"+configId+":"+row.outcome);
    return row;
  };
  const disposition=(intent,refs,causalKey)=>{
    const targets=Array.isArray(refs)?refs:[refs],results=[];
    for(const ref of targets){
      const row=resolvePrivateDisposition46900(intent,ref,causalKey,seedRef);
      if(!row||row.success!==true)throw new Error("ce478_private_disposition_failed:"+intent+":"+ref+":"+(row&&row.reason||"unknown"));
      results.push({participantRef:ref,...clone(row)});
      if(row.receiptId)materialRefs.push(String(row.receiptId));
      state.participants[ref].state=row.selectedOutcomeRef;
      if(intent==="RESTRAIN"&&row.selectedOutcomeRef==="RESTRAINED"&&!state.collectedParticipantKeys.includes(ref))state.collectedParticipantKeys.push(ref);
      semanticTrace.push("disposition:"+intent+":"+ref+":"+row.selectedOutcomeRef);
    }
    return results;
  };
  const custody=(refs,institution)=>{
    for(const ref of (Array.isArray(refs)?refs:[refs]))state.participants[ref].state=institution==="ANBU"?"ANBU_CUSTODY":"POLICE_CUSTODY";
  };
  const release=(refs)=>{for(const ref of (Array.isArray(refs)?refs:[refs]))state.participants[ref].state="RELEASED";};
  const terminal=(reason)=>{
    if(state.package.holder==="KAKASHI"){state.package.holder="ANBU";state.package.returned=true;}
    for(const ref of ["MI","PS","AMT"])if(state.participants[ref].state==="AVAILABLE")state.participants[ref].state="ESCAPED";
    state.pakkun.departed=state.pakkun.present===true;state.pakkun.present=false;
    state.terminal={reportReached:true,hiddenTestReviewReached:true,receiptReached:true,originCompleted:true,reason:String(reason||"terminal_report")};
    semanticTrace.push("terminal:v2_report>v2_hidden_review>v2_receipt:"+state.terminal.reason);
    return state;
  };
  const terminalDisposition=(boundaryId,choice,refs)=>{
    const targets=Array.isArray(refs)?refs:[refs];
    if(/_kill$|_kill_|kill$/.test(choice))disposition("KILL",targets,choice);
    else if(/restrain/.test(choice))disposition("RESTRAIN",targets,choice);
    else if(/police/.test(choice))custody(targets,"POLICE");
    else if(/anbu/.test(choice))custody(targets,"ANBU");
    else if(/release/.test(choice))release(targets);
    return terminal(boundaryId+":"+choice);
  };

  const routeB09=()=>{
    const c=addChoice("B09");
    return terminalDisposition("B09",c,"AMT");
  };
  const routeB11=()=>{
    const c=addChoice("B11");
    return terminalDisposition("B11",c,"AMT");
  };
  const routeB17=()=>{
    const c=addChoice("B17");
    return terminalDisposition("B17",c,"AMT");
  };
  const routeB18=()=>{
    const c=addChoice("B18");
    return terminalDisposition("B18",c,"AMT");
  };
  const routeB19=()=>{
    const c=addChoice("B19");
    return terminalDisposition("B19",c,"PS");
  };
  const routeB20=()=>{
    const c=addChoice("B20");
    return terminalDisposition("B20",c,["AMT","PS"]);
  };
  const routeB21=()=>{
    const c=addChoice("B21");
    return terminalDisposition("B21",c,["AMT","PS"]);
  };
  const routeB22=()=>{
    const c=addChoice("B22");
    return terminalDisposition("B22",c,["AMT","PS","MI"]);
  };
  const routeB23=()=>{
    const c=addChoice("B23");
    return terminalDisposition("B23",c,["AMT","PS","MI"]);
  };
  const routeAmtAfterPackage=(boundaryId)=>{
    const pursuit=machine("secureAmtPursuit");
    if(pursuit!=="SECURE_AMT_PURSUIT_SUCCESS"){state.participants.AMT.state="ESCAPED";return terminal(boundaryId+":amt_pursuit_failure");}
    state.pakkun.present=true;
    const amtConfig=boundaryId==="B10"?"academy_kakashi_origin_battle_seq_amt_pakkun":"academy_kakashi_origin_battle_kakashi_pakkun_vs_amt";
    const b=battle(boundaryId+":amt",amtConfig);
    if(b.outcome!=="victory"){state.participants.AMT.state="ESCAPED";return terminal(boundaryId+":amt_battle_defeat");}
    state.participants.AMT.state="BATTLE_DEFEATED";
    return boundaryId==="B10"?routeB11():routeB09();
  };
  const routeB08=()=>{
    const c=addChoice("B08");
    if(c==="secure_return")return terminal("B08:secure_return");
    return routeAmtAfterPackage("B08");
  };
  const routeB10=(psBattle)=>{
    const c=addChoice("B10",{amtContinuationOpen:Number(psBattle.playerActionOpportunityCount)<=3});
    if(c==="package_second_return")return terminal("B10:package_second_return");
    return routeAmtAfterPackage("B10");
  };
  const routeB06=()=>{
    const c=addChoice("B06");
    const collected=[...state.collectedParticipantKeys];
    if(/police/.test(c))custody(collected,"POLICE");else custody(collected,"ANBU");
    return terminal("B06:"+c);
  };
  const routeB05=()=>{
    const c=addChoice("B05");
    if(c==="amt_seq_collect"){
      disposition("RESTRAIN","AMT",c);
      return routeB06();
    }
    return terminalDisposition("B05",c,"AMT");
  };
  const fightAmtSequence=()=>{
    state.pakkun.present=true;
    const b=battle("amt_seq","academy_kakashi_origin_battle_seq_amt_pakkun");
    if(b.outcome!=="victory"){state.participants.AMT.state="ESCAPED";return terminal("amt_seq_battle_defeat");}
    state.participants.AMT.state="BATTLE_DEFEATED";
    return routeB05();
  };
  const routeB04=(psBattle)=>{
    const open=Number(psBattle.playerActionOpportunityCount)<=3;
    const c=addChoice("B04",{amtContinuationOpen:open});
    if(c==="ps_go_amt")return fightAmtSequence();
    if(c==="ps_restrain_continue"){
      disposition("RESTRAIN","PS",c);
      return fightAmtSequence();
    }
    if(c==="ps_report")return terminal("B04:ps_report");
    return terminalDisposition("B04",c,"PS");
  };
  const pursueAndFightPs=(sourceKey)=>{
    const pursuit=machine("psPursuit");
    if(pursuit!=="PS_PURSUIT_SUCCESS"){state.participants.PS.state="ESCAPED";state.participants.AMT.state="ESCAPED";state.package.holder="PS";return terminal(sourceKey+":ps_pursuit_failure");}
    const b=battle(sourceKey+":ps","academy_kakashi_origin_battle_seq_ps");
    if(b.outcome!=="victory"){state.participants.PS.state="ESCAPED";state.participants.AMT.state="ESCAPED";state.package.holder="PS";return terminal(sourceKey+":ps_battle_defeat");}
    state.participants.PS.state="BATTLE_DEFEATED";state.package.holder="KAKASHI";state.package.recovered=true;
    return routeB04(b);
  };
  const routeB03=(miBattle)=>{
    const open=Number(miBattle.playerActionOpportunityCount)<=3;
    const c=addChoice("B03",{pursuitOpen:open});
    if(c==="mi_pursue_ps")return pursueAndFightPs("B03");
    if(c==="mi_restrain"){
      disposition("RESTRAIN","MI",c);
      return pursueAndFightPs("B03_restrain");
    }
    return terminalDisposition("B03",c,"MI");
  };
  const fightMiStop=()=>{
    const b=battle("mi_stop","academy_kakashi_origin_battle_mi_1v1");
    if(b.outcome!=="victory"){state.participants.MI.state="ESCAPED";state.participants.PS.state="ESCAPED";state.participants.AMT.state="ESCAPED";state.package.holder="PS";return terminal("mi_stop_battle_defeat");}
    state.participants.MI.state="BATTLE_DEFEATED";
    return routeB03(b);
  };
  const fightSecurePackage=()=>{
    const b=battle("ps_mi","academy_kakashi_origin_battle_ps_mi_2v1");
    if(b.outcome!=="victory"){state.participants.PS.state="ESCAPED";state.participants.MI.state="ESCAPED";state.participants.AMT.state="ESCAPED";state.package.holder="PS";return terminal("secure_package_battle_defeat");}
    state.participants.PS.state="BATTLE_DEFEATED";state.participants.MI.state="BATTLE_DEFEATED";state.package.holder="KAKASHI";state.package.recovered=true;
    return routeB08();
  };
  const fightAssassinThenPackage=()=>{
    const mi=battle("mi_package_second","academy_kakashi_origin_battle_seq_mi");
    if(mi.outcome!=="victory"){state.participants.MI.state="ESCAPED";state.participants.PS.state="ESCAPED";state.participants.AMT.state="ESCAPED";state.package.holder="PS";return terminal("assassin_then_package_mi_defeat");}
    state.participants.MI.state="BATTLE_DEFEATED";
    if(Number(mi.playerActionOpportunityCount)>4){state.participants.PS.state="ESCAPED";state.participants.AMT.state="ESCAPED";return terminal("assassin_then_package_too_slow");}
    const pursuit=machine("psPursuit");
    if(pursuit!=="PS_PURSUIT_SUCCESS"){state.participants.PS.state="ESCAPED";state.participants.AMT.state="ESCAPED";state.package.holder="PS";return terminal("assassin_then_package_ps_lost");}
    const ps=battle("ps_package_second","academy_kakashi_origin_battle_seq_ps");
    if(ps.outcome!=="victory"){state.participants.PS.state="ESCAPED";state.participants.AMT.state="ESCAPED";state.package.holder="PS";return terminal("assassin_then_package_ps_defeat");}
    state.participants.PS.state="BATTLE_DEFEATED";state.package.holder="KAKASHI";state.package.recovered=true;
    return routeB10(ps);
  };
  const chaseOriginalTarget=()=>{
    const pursuit=machine("amtPursuitRoot");
    state.participants.PS.state="ESCAPED";
    if(pursuit!=="AMT_PURSUIT_SUCCESS"){state.participants.AMT.state="ESCAPED";return terminal("original_target_pursuit_failure");}
    state.pakkun.present=true;
    const b=battle("amt_direct","academy_kakashi_origin_battle_kakashi_pakkun_vs_amt");
    if(b.outcome!=="victory"){state.participants.AMT.state="ESCAPED";return terminal("original_target_battle_defeat");}
    state.participants.AMT.state="BATTLE_DEFEATED";
    const c=addChoice("B07");
    return terminalDisposition("B07",c,"AMT");
  };
  const secureBefore=()=>{
    const outcome=machine("secureBefore");
    if(outcome==="SECURE_BEFORE_SUCCESS"){
      state.package.holder="KAKASHI";state.package.recovered=true;state.participants.AMT.state="ESCAPED";
      return terminal("secure_before_success");
    }
    return fightSecurePackage();
  };
  const routeWatchBoundary=(boundaryId)=>{
    const c=addChoice(boundaryId);
    if(["stop_assassin","closer_watch_stop"].includes(c))return fightMiStop();
    if(["secure_package","closer_watch_secure"].includes(c))return fightSecurePackage();
    if(["secure_before_assassin","closer_watch_before"].includes(c))return secureBefore();
    if(["assassin_then_package","closer_watch_sequence"].includes(c))return fightAssassinThenPackage();
    return chaseOriginalTarget();
  };
  const directStrike=()=>{
    state.pressure.directForceEscalations+=1;
    const first=battle("direct_strike_2v1","academy_kakashi_origin_battle_amt_ps_2v1");
    if(first.outcome!=="victory"){
      state.participants.AMT.state="ESCAPED";state.participants.PS.state="ESCAPED";state.participants.MI.state="UNSEEN";state.package.holder="AMT";
      return terminal("direct_strike_2v1_defeat");
    }
    state.participants.AMT.state="BATTLE_DEFEATED";state.participants.PS.state="BATTLE_DEFEATED";state.package.holder="KAKASHI";state.package.recovered=true;
    state.participants.MI.state="AVAILABLE";
    const mi=battle("direct_mi","academy_kakashi_origin_battle_mi_1v1");
    if(mi.outcome!=="victory"){state.participants.MI.state="ESCAPED";return terminal("direct_mi_battle_defeat");}
    state.participants.MI.state="BATTLE_DEFEATED";
    return routeB22();
  };
  const directPickpocket=()=>{
    const outcome=machine("directPickpocket");
    if(outcome==="PICKPOCKET_DIRECT_SUCCESS"){
      state.package.holder="KAKASHI";state.package.recovered=true;state.participants.MI.state="UNSEEN";
      return terminal("direct_pickpocket_success");
    }
    state.pressure.failedStealth+=1;state.participants.MI.state="AVAILABLE";
    const b=battle("pickpocket_3v1","academy_kakashi_origin_battle_amt_ps_mi_3v1");
    if(b.outcome!=="victory"){state.participants.AMT.state="ESCAPED";state.participants.PS.state="ESCAPED";state.participants.MI.state="ESCAPED";state.package.holder="AMT";return terminal("direct_pickpocket_3v1_defeat");}
    state.participants.AMT.state="BATTLE_DEFEATED";state.participants.PS.state="BATTLE_DEFEATED";state.participants.MI.state="BATTLE_DEFEATED";state.package.holder="KAKASHI";state.package.recovered=true;
    return routeB23();
  };
  const routeB12=()=>{
    const c=addChoice("B12");
    if(c==="closer_handoff"){state.package.holder="PS";state.participants.MI.state="AVAILABLE";return routeWatchBoundary("B13");}
    if(c==="closer_strike")return directStrike();
    const result=machine("improvedPickpocket");
    if(result==="PICKPOCKET_IMPROVED_SUCCESS"){state.package.holder="KAKASHI";state.package.recovered=true;state.participants.MI.state="UNSEEN";return terminal("improved_pickpocket_success");}
    state.pressure.failedStealth+=1;state.participants.MI.state="UNSEEN";
    const b=battle("improved_2v1","academy_kakashi_origin_battle_amt_ps_2v1");
    if(b.outcome!=="victory"){state.participants.AMT.state="ESCAPED";state.participants.PS.state="ESCAPED";state.package.holder="AMT";return terminal("improved_2v1_defeat");}
    state.participants.AMT.state="BATTLE_DEFEATED";state.participants.PS.state="BATTLE_DEFEATED";state.package.holder="KAKASHI";state.package.recovered=true;
    return routeB21();
  };
  const routeB15=()=>{
    const c=addChoice("B15");
    if(c==="ask_where"){state.knowledge.askWhere=true;state.knowledge.downstreamDestinationKnown=false;const next=addChoice("B16");return fightDemandOrTake(next);}
    return fightDemandOrTake(c);
  };
  const fightDemandOrTake=(choice)=>{
    state.pakkun.present=true;
    const take=choice==="take_him_down"||choice==="ask_then_take";
    if(take){state.pressure.directForceEscalations+=1;state.package.holder="NEUTRAL";state.package.neutral=true;}
    const b=battle(take?"take_down_amt":"demand_amt","academy_kakashi_origin_battle_kakashi_pakkun_vs_amt");
    if(b.outcome!=="victory"){
      state.participants.AMT.state="ESCAPED";
      if(take){state.package.holder="KAKASHI";state.package.recovered=true;state.package.neutral=false;}
      else state.package.holder="AMT";
      return terminal((take?"take_down":"demand")+"_battle_defeat");
    }
    state.participants.AMT.state="BATTLE_DEFEATED";state.package.holder="KAKASHI";state.package.recovered=true;state.package.neutral=false;
    return take?routeB18():routeB17();
  };
  const routeB14=()=>{
    const c=addChoice("B14");
    if(c==="failure_stay"){
      const pursuit=machine("stayPackagePursuit");
      if(pursuit!=="STAY_PACKAGE_PURSUIT_SUCCESS"){state.participants.AMT.state="ESCAPED";state.participants.PS.state="ESCAPED";state.package.holder="AMT";return terminal("stay_package_pursuit_failure");}
      state.pakkun.present=true;return routeB15();
    }
    if(c==="failure_stop_ps"){
      state.participants.AMT.state="ESCAPED";state.package.holder="AMT";
      const b=battle("ps_direct","academy_kakashi_origin_battle_ps_1v1");
      if(b.outcome!=="victory"){state.participants.PS.state="ESCAPED";return terminal("ps_direct_battle_defeat");}
      state.participants.PS.state="BATTLE_DEFEATED";return routeB19();
    }
    const b=battle("cutoff","academy_kakashi_origin_battle_amt_ps_2v1");
    if(b.outcome!=="victory"){state.participants.AMT.state="ESCAPED";state.participants.PS.state="ESCAPED";state.package.holder="AMT";return terminal("cutoff_battle_defeat");}
    state.participants.AMT.state="BATTLE_DEFEATED";state.participants.PS.state="BATTLE_DEFEATED";state.package.holder="KAKASHI";state.package.recovered=true;
    return routeB20();
  };
  const moveCloser=()=>{
    const result=machine("getCloser");
    if(result==="GET_CLOSER_SUCCESS"){state.knowledge.getCloserContingency=true;return routeB12();}
    state.package.holder="AMT";state.participants.MI.state="UNSEEN";return routeB14();
  };

  const first=addChoice("B01");
  if(first==="watch_exchange"){
    state.package.holder="PS";state.participants.MI.state="AVAILABLE";
    routeWatchBoundary("B02");
  }else if(first==="move_in_closer")moveCloser();
  else if(first==="strike_before_handoff")directStrike();
  else directPickpocket();

  if(state.terminal.originCompleted!==true)terminal("forced_terminal_safety");

  const miBattleRows=battles.filter(row=>Array.isArray(row.oppositionParticipantRefs)&&row.oppositionParticipantRefs.includes(MI_ID));
  const lethalChoiceIds=new Set(["mi_kill","direct_group_kill","pick_group_kill"]);
  const restraintChoiceIds=new Set(["mi_restrain","collect_one_mi_anbu","collect_one_mi_police","collect_group_anbu","collect_group_police"]);
  const choiceIds=choices.map(row=>row.choiceId);
  const miState=String(state.participants.MI.state||"UNSEEN");
  const encountered=miState!=="UNSEEN"||miBattleRows.length>0;
  const survived=miState!=="KILLED";
  const materialHistory={
    lethalAttempt:choiceIds.some(id=>lethalChoiceIds.has(id)),
    policeTransfer:miState==="POLICE_CUSTODY",
    anbuTransfer:miState==="ANBU_CUSTODY",
    restraint:choiceIds.some(id=>id==="mi_restrain")||miState==="RESTRAINED",
    restraintOrAnbu:choiceIds.some(id=>restraintChoiceIds.has(id))||miState==="RESTRAINED"||miState==="ANBU_CUSTODY",
    deliberateRelease:miState==="RELEASED",
    miDefeatedKakashi:miBattleRows.some(row=>row.outcome==="defeat"),
    kakashiDefeatedMi:miBattleRows.some(row=>row.outcome==="victory"),
    otherMaterialEncounter:encountered
  };
  const fieldDispositionState=miState;
  const miContinuity=autonomousMiContinuity46900({historyId,fieldDispositionState,materialHistory,materialRefs,encountered,survived});
  miContinuity.hiddenPostTestReviewReached=true;
  miContinuity.postTestTruthClass=survived&&encountered?"staged_konoha_test_participant":null;

  let filteredRewardPreview=null;
  try{
    if(typeof globalThis.previewAcademyKakashiV2TerminalRewards36015==="function"){
      filteredRewardPreview=clone(globalThis.previewAcademyKakashiV2TerminalRewards36015({
        participants:clone(state.participants),package:clone(state.package),knowledge:clone(state.knowledge),
        battles:clone(state.battles),routeHistory:clone(state.routeHistory),resolvers:Object.fromEntries(state.resolverResults.map(row=>[row.key,{selectedOutcomeRef:row.selectedOutcomeRef}])),
        terminal:{reportReached:true,minatoReached:true,receiptReached:true,hiddenTestReviewReached:true}
      },historyId));
    }
  }catch(_error){filteredRewardPreview=null;}

  const currentKakashiRegistry=typeof getCharacterRegistryEntry==="function"?getCharacterRegistryEntry(ORIGIN_ID):null;
  const actorLocalSnapshot={
    currentStats:currentKakashiRegistry&&currentKakashiRegistry.stats?clone(currentKakashiRegistry.stats):null,
    basePL:Number(currentKakashiRegistry&&currentKakashiRegistry.basePL||currentKakashiRegistry&&currentKakashiRegistry.powerLevel||currentKakashiRegistry&&currentKakashiRegistry.pl)||null,
    developmentRefs:[],
    currentStatMutationRefs:[],
    learnedAccessRefs:[],
    persistentConditionRefs:[],
    ownerProjectionNote:"No authorised Kakashi-specific Origin Development/Current-Stat mutation source is exposed by current #440/#448 owners; #478 records exact private history and does not synthesize one."
  };
  const row={
    schemaVersion:1,
    semanticType:PRIVATE_ORIGIN_SCHEMA,
    privateOriginHistoryId:historyId,
    chronicleId:chronicleStableId46900(),
    subjectStableId:PRIVATE_ORIGIN_SUBJECT,
    originDefinitionId:PRIVATE_ORIGIN_DEFINITION,
    originDefinitionVersion:PRIVATE_ORIGIN_VERSION,
    resolutionMode:"AUTONOMOUS_PRIVATE",
    stableAutonomousResolutionSeedRef:seedRef,
    profileAuthority:"Academy_Kakashi_Autonomous_Origin_Intent_Profile_2026-10-02",
    profileCoverage:{meaningfulBoundaryCount:Object.keys(AUTONOMOUS_KAKASHI_BOUNDARIES).length,legalPlayerFacingChoiceCount:AUTONOMOUS_KAKASHI_CHOICE_IDS.length,machineResolveResultChoicesExcluded:true},
    terminalConvergence:{reportReached:true,hiddenTestReviewReached:true,receiptReached:true,originCompleted:true,terminalReason:state.terminal.reason},
    exactCommittedSourceOccurrences:[...new Set(materialRefs)],
    exactMaterialChoiceIntentReceipts:choices,
    exactFactualResolverReceipts:machineReceipts,
    exactBattleOutcomeRefs:battles.map(row=>({battleOccurrenceId:row.battleOccurrenceId,battleConfigId:row.battleConfigId,outcome:row.outcome,playerActionOpportunityCount:row.playerActionOpportunityCount,oppositionParticipantRefs:[...(row.oppositionParticipantRefs||[])]})),
    exactFinalOriginState:{package:clone(state.package),participants:clone(state.participants),knowledge:clone(state.knowledge),pakkun:clone(state.pakkun),terminal:clone(state.terminal),semanticTrace:[...semanticTrace]},
    hiddenOriginTruth:{postTestReviewReached:true,postTestTruthClass:"staged_konoha_test",kakashiKnowsHiddenTestTruth:false},
    subjectPersistentConsequences:{
      knowledgeMemory:{maskedInterceptorEncountered:encountered,miMaterialHistory:clone(materialHistory),packageHistory:clone(state.package),finalParticipantStates:clone(state.participants)},
      developmentRefs:[...actorLocalSnapshot.developmentRefs],
      currentStatMutationRefs:[...actorLocalSnapshot.currentStatMutationRefs],
      currentStatsSnapshot:clone(actorLocalSnapshot.currentStats),
      currentPLSnapshot:actorLocalSnapshot.basePL,
      learnedAccessRefs:[...actorLocalSnapshot.learnedAccessRefs],
      relationshipSharedHistoryRefs:[...new Set(materialRefs)],
      persistentConditionRefs:[...actorLocalSnapshot.persistentConditionRefs],
      ownerProjectionNote:actorLocalSnapshot.ownerProjectionNote
    },
    externalParticipantRefs:[MI_ID,"academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler"],
    convergenceCarryForwardClassification:{
      subjectKnowledgeMemory:"ALWAYS",
      developmentStats:"EXISTING_OWNER_ONLY_NO_SYNTHETIC_GRANT_IN_478",
      materialObjects:"CONDITIONAL_EXACT_OWNERSHIP_ONLY",
      externalOriginWorldState:"ORIGIN_SCOPE_ONLY_UNLESS_IMPORTED"
    },
    filteredChronicleRewardPreview:filteredRewardPreview?{
      totalRyo:Number(filteredRewardPreview.totalRyo)||0,
      qualifiedSourceIds:(filteredRewardPreview.sources||[]).filter(x=>x&&x.qualified).map(x=>x.sourceId),
      fieldRecoveryFallback:filteredRewardPreview.fieldRecoveryFallback===true,
      trainingTanto:filteredRewardPreview.trainingTanto===true,
      grantAppliedToPlayer:false
    }:null,
    economyFirewall:{
      duplicateStartingPurseGranted:false,
      autonomousPlayerVictoryBattleRyoGranted:false,
      blanketInventoryRewardsGranted:false,
      playerEconomyMutation:false
    },
    migrationReceipt:{semanticType:"sc.parallelOriginHistoryMigration.v1",reason:String(migrationReason||"origin_convergence_preparation"),oneShot:true},
    miContinuity,
    commitState:"COMMITTED",
    committed:true,
    committedAt:Date.now()
  };
  if(persist)return persistKakashiPrivateHistory46900(row);
  return{success:true,idempotent:false,preview:true,history:clone(row)};
}
function ensureAutonomousKakashiPrivateHistory46900(reason="origin_convergence_preparation"){
  const existing=storedKakashiPrivateHistory();
  if(existing&&existing.committed===true)return{success:true,idempotent:true,history:existing};
  return resolveAutonomousKakashiPrivateHistory46900({migrationReason:reason});
}
function recordId(row){return row&&String(row.sourceOccurrenceId||row.occurrenceId||row.id||"")||"";}
function continuityStore(create=false){
  if(typeof globalThis.getOriginParticipantContinuityStore43600!=="function")return null;
  return globalThis.getOriginParticipantContinuityStore43600({create:create===true});
}
function storedContinuity(){
  const store=continuityStore(false);
  const row=store&&store.byKey&&store.byKey[CONTINUITY_KEY];
  return row&&typeof row==="object"?clone(row):null;
}
function saveContinuity(row){
  if(!row||typeof row!=="object")return{success:false,reason:"continuity_row_missing"};
  const store=continuityStore(true);
  if(!store||!store.byKey)return{success:false,reason:"continuity_store_missing"};
  const existing=store.byKey[CONTINUITY_KEY];
  if(existing&&existing.originOccurrenceRef&&row.originOccurrenceRef&&existing.originOccurrenceRef!==row.originOccurrenceRef){
    return{success:false,reason:"continuity_origin_occurrence_conflict",existing:clone(existing)};
  }
  store.byKey[CONTINUITY_KEY]=clone(row);
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,idempotent:!!existing,continuity:clone(store.byKey[CONTINUITY_KEY])};
}
function currentTeam(){
  try{return typeof globalThis.getChronicleCurrentTeam43600==="function"?globalThis.getChronicleCurrentTeam43600():null;}
  catch(_error){return null;}
}
function menmaSecondTeammateRef46900(team=currentTeam()){
  const refs=team&&Array.isArray(team.teamVariantIds)?team.teamVariantIds.map(String):[];
  const candidates=refs.filter(id=>id!==MENMA_ID&&id!==ORIGIN_ID);
  return candidates.length===1?candidates[0]:null;
}
function teammateDisplayName46900(id){
  const raw=TEAMMATE_LABELS[id]||String(id||"").replace(/^academy_/,"").replaceAll("_"," ");
  return raw.toLowerCase().replace(/\b\w/g,ch=>ch.toUpperCase());
}
function menmaSecondTeammateReaction46900(actorRef){
  const authored=REACTIONS[actorRef];
  if(!authored)return null;
  const kind=authored.noStrong===true?"no_strong":(authored.strong&&authored.strong.length?"strong":"fallback");
  const cues=kind==="strong"?authored.strong:authored.fallback;
  return{actorRef,kind,cues:clone(cues||[])};
}
function originCompletionEvidence(){
  const a=acquisition(),origin=a&&a.chronicleOrigin;
  const ids=origin&&Array.isArray(origin.completionEvidenceIds)?origin.completionEvidenceIds:[];
  return ids.find(id=>/^kakashi_v2:/.test(String(id||"")))||null;
}
function instanceFromCompletionEvidence(ref){
  const raw=String(ref||"");
  return raw.startsWith("kakashi_v2:")?raw.slice("kakashi_v2:".length):null;
}
function isMiBattleConfig(configId){
  const id=String(configId||"");
  if(MI_BATTLE_CONFIGS.has(id))return true;
  const configs=globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010&&globalThis.SC_ACADEMY_KAKASHI_V2_BATTLE_36010.configs;
  const row=configs&&configs[id];
  return !!(row&&Array.isArray(row.opposition)&&row.opposition.includes(MI_ID));
}
function exactMiOriginRecords(instanceId){
  const instance=String(instanceId||"");
  return history().filter(row=>row&&row.committed===true&&(
    String(row.storySceneInstanceId||"")===instance||
    String(row.sourceOccurrenceId||row.occurrenceId||row.id||"").includes(instance)
  )).filter(row=>{
    const d=row.data&&typeof row.data==="object"?row.data:{};
    const refs=[d.targetParticipantRef,...(Array.isArray(d.participantRefs)?d.participantRefs:[]),...(Array.isArray(d.targetRefs)?d.targetRefs:[])].map(String);
    return refs.includes("MI")||refs.includes(MI_ID);
  });
}
function rewardReceiptsForInstance(instanceId){
  const p=pd(),root=p&&p.kakashiV2RewardReceipts36015&&p.kakashiV2RewardReceipts36015.receipts;
  return root&&typeof root==="object"?Object.values(root).filter(row=>row&&row.committed===true&&String(row.storyOccurrenceId||"")===String(instanceId||"")):[];
}
function materialHistoryFromCapturedState(state){
  const s=state&&typeof state==="object"?state:{};
  const row=s.participants&&s.participants.MI||{};
  const battles=Object.values(s.battles||{}).filter(b=>b&&isMiBattleConfig(b.encounterId));
  const miDefeatedKakashi=battles.some(b=>b.outcome==="defeat");
  const kakashiDefeatedMi=battles.some(b=>b.outcome==="victory");
  const lethalAttempt=row.disposition==="KILL"||row.lethalIntent===true;
  const policeTransfer=row.state==="POLICE_CUSTODY"||row.deliveredInstitution==="POLICE";
  const restraintOrAnbu=["RESTRAINED","ANBU_CUSTODY"].includes(row.state)||row.disposition==="RESTRAIN"||row.restrainIntent===true||row.deliveredInstitution==="ANBU"||row.collected===true;
  const deliberateRelease=row.state==="RELEASED"||row.disposition==="RELEASE";
  return{lethalAttempt,policeTransfer,restraintOrAnbu,deliberateRelease,miDefeatedKakashi,kakashiDefeatedMi,otherMaterialEncounter:row.state!=="UNSEEN"};
}
function exactRefsForCapturedState(instanceId,state){
  const refs=exactMiOriginRecords(instanceId).map(recordId).filter(Boolean);
  const battles=Object.values(state&&state.battles||{}).filter(b=>b&&isMiBattleConfig(b.encounterId));
  for(const b of battles){
    if(b.battleId)refs.push(String(b.battleId));
    if(b.encounterId)refs.push(String(b.encounterId));
  }
  return [...new Set(refs)];
}
function latestFieldRef(records){
  const preferred=[...records].reverse().find(row=>{
    const d=row.data||{};
    return row.type==="academy_kakashi_v2_disposition"||row.type==="academy_kakashi_v2_delivery"||d.intent||d.institution;
  });
  return preferred?recordId(preferred):null;
}
function continuityFromCapturedState(state,instanceId){
  const s=state&&typeof state==="object"?state:null;
  if(!s||!instanceId)return null;
  const row=s.participants&&s.participants.MI||{state:"UNSEEN"};
  const records=exactMiOriginRecords(instanceId);
  const survived=row.state!=="KILLED";
  const encountered=row.state!=="UNSEEN";
  return{
    schemaVersion:1,
    originId:ORIGIN_ID,
    stableParticipantId:MI_ID,
    observerLabel:"Masked Interceptor",
    originOccurrenceRef:"kakashi_v2:"+instanceId,
    storySceneInstanceId:String(instanceId),
    encounteredByProtagonist:encountered,
    fieldDispositionState:String(row.state||"UNSEEN"),
    fieldDispositionOccurrenceRef:latestFieldRef(records),
    survivedOrigin:survived,
    hiddenPostTestReviewReached:!!(s.terminal&&s.terminal.hiddenTestReviewReached===true),
    postTestTruthClass:survived&&s.terminal&&s.terminal.hiddenTestReviewReached===true?"staged_konoha_test_participant":null,
    protagonistKnowsTestTruth:false,
    materialHistory:materialHistoryFromCapturedState(s),
    materialHistoryRefs:exactRefsForCapturedState(instanceId,s),
    captureMode:"exact_terminal_boundary",
    capturedAt:Date.now()
  };
}
function legacyContinuity(){
  const a=acquisition(),origin=a&&a.chronicleOrigin;
  if(!a||a.chronicleOriginVariantId!==ORIGIN_ID||!origin||origin.prologueCompleted!==true)return null;
  const evidence=originCompletionEvidence(),instance=instanceFromCompletionEvidence(evidence);
  if(!instance)return null;
  const records=exactMiOriginRecords(instance);
  const receipts=rewardReceiptsForInstance(instance);
  const disposition=records.filter(row=>row.type==="academy_kakashi_v2_disposition");
  const delivery=records.filter(row=>row.type==="academy_kakashi_v2_delivery");
  const killed=disposition.some(row=>row.data&&row.data.targetParticipantRef==="MI"&&row.data.outcome==="KILLED");
  const lethalAttempt=disposition.some(row=>row.data&&row.data.targetParticipantRef==="MI"&&row.data.intent==="KILL");
  const policeTransfer=delivery.some(row=>row.data&&row.data.institution==="POLICE"&&Array.isArray(row.data.participantRefs)&&row.data.participantRefs.includes("MI"));
  const anbuTransfer=delivery.some(row=>row.data&&row.data.institution==="ANBU"&&Array.isArray(row.data.participantRefs)&&row.data.participantRefs.includes("MI"));
  const restrained=disposition.some(row=>row.data&&row.data.targetParticipantRef==="MI"&&row.data.intent==="RESTRAIN");
  const victoryReceipts=receipts.filter(row=>{
    const cfg=row.metadata&&row.metadata.battleConfigId;
    return row.sourceId==="kak_origin_battle_mi_victory_ryo_01"||isMiBattleConfig(cfg);
  });
  const battleHistory=history().filter(row=>row&&row.type==="battle"&&row.character===ORIGIN_ID&&row.success===true&&isMiBattleConfig(row.encounterId));
  const kakashiDefeatedMi=victoryReceipts.length>0||battleHistory.length>0;
  const encountered=killed||lethalAttempt||policeTransfer||anbuTransfer||restrained||kakashiDefeatedMi;
  if(!encountered)return null;
  const refs=[...records.map(recordId),...victoryReceipts.map(row=>String(row.address||row.sourceId||"")),...battleHistory.map(row=>String(row.battleId||""))].filter(Boolean);
  let fieldDispositionState="MATERIAL_ENCOUNTER";
  if(killed)fieldDispositionState="KILLED";
  else if(policeTransfer)fieldDispositionState="POLICE_CUSTODY";
  else if(anbuTransfer)fieldDispositionState="ANBU_CUSTODY";
  else if(restrained)fieldDispositionState="RESTRAINED";
  else if(lethalAttempt)fieldDispositionState="ESCAPED";
  else if(kakashiDefeatedMi)fieldDispositionState="BATTLE_DEFEATED";
  return{
    schemaVersion:1,
    originId:ORIGIN_ID,
    stableParticipantId:MI_ID,
    observerLabel:"Masked Interceptor",
    originOccurrenceRef:evidence,
    storySceneInstanceId:instance,
    encounteredByProtagonist:true,
    fieldDispositionState,
    fieldDispositionOccurrenceRef:latestFieldRef(records),
    survivedOrigin:!killed,
    hiddenPostTestReviewReached:true,
    postTestTruthClass:killed?null:"staged_konoha_test_participant",
    protagonistKnowsTestTruth:false,
    materialHistory:{
      lethalAttempt:lethalAttempt&&!killed,
      policeTransfer,
      restraintOrAnbu:anbuTransfer||restrained,
      deliberateRelease:false,
      miDefeatedKakashi:false,
      kakashiDefeatedMi,
      otherMaterialEncounter:true
    },
    materialHistoryRefs:[...new Set(refs)],
    captureMode:"deterministic_durable_history_projection",
    capturedAt:null
  };
}
function getContinuity(){
  return storedContinuity()||legacyContinuity();
}
function persistPlayerExperiencedKakashiPrivateHistory46900(state,instanceId,continuity){
  if(!state||!instanceId||!continuity)return{success:false,reason:"player_experienced_private_history_source_missing"};
  const existing=storedKakashiPrivateHistory();
  if(existing&&existing.committed===true)return{success:true,idempotent:true,history:existing};
  const seedRef=[PRIVATE_ORIGIN_SCHEMA,chronicleStableId46900(),PRIVATE_ORIGIN_SUBJECT,PRIVATE_ORIGIN_DEFINITION,PRIVATE_ORIGIN_VERSION,"PLAYER_EXPERIENCED"].join("::");
  const battles=Object.values(state.battles||{}).map(row=>({
    battleOccurrenceId:row&&row.battleId||null,
    battleConfigId:row&&row.encounterId||null,
    outcome:row&&row.outcome||null,
    playerActionOpportunityCount:Number(row&&row.playerActionOpportunityCount)||null
  })).filter(row=>row.battleConfigId||row.battleOccurrenceId);
  const row={
    schemaVersion:1,
    semanticType:PRIVATE_ORIGIN_SCHEMA,
    privateOriginHistoryId:"private_origin::"+PRIVATE_ORIGIN_SUBJECT+"::"+stableHash46900(seedRef+"|"+instanceId).toString(16),
    chronicleId:chronicleStableId46900(),
    subjectStableId:PRIVATE_ORIGIN_SUBJECT,
    originDefinitionId:PRIVATE_ORIGIN_DEFINITION,
    originDefinitionVersion:PRIVATE_ORIGIN_VERSION,
    resolutionMode:"PLAYER_EXPERIENCED",
    stableAutonomousResolutionSeedRef:null,
    profileAuthority:"player_experienced_frozen_kakashi_v2",
    profileCoverage:{meaningfulBoundaryCount:Object.keys(AUTONOMOUS_KAKASHI_BOUNDARIES).length,legalPlayerFacingChoiceCount:AUTONOMOUS_KAKASHI_CHOICE_IDS.length,machineResolveResultChoicesExcluded:true},
    exactCommittedSourceOccurrences:[...(continuity.materialHistoryRefs||[])],
    exactMaterialChoiceIntentReceipts:clone(state.routeHistory||[]),
    exactBattleOutcomeRefs:battles,
    subjectPersistentConsequences:{
      knowledgeMemory:{maskedInterceptorEncountered:continuity.encounteredByProtagonist===true,miMaterialHistory:clone(continuity.materialHistory||{})},
      developmentRefs:[],currentStatMutationRefs:[],learnedAccessRefs:[],relationshipSharedHistoryRefs:[...(continuity.materialHistoryRefs||[])],persistentConditionRefs:[]
    },
    externalParticipantRefs:[MI_ID,"academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler"],
    convergenceCarryForwardClassification:{
      subjectKnowledgeMemory:"ALWAYS",
      developmentStats:"ALREADY_COMMITTED_BY_PLAYER_EXPERIENCED_ORIGIN",
      materialObjects:"EXISTING_OWNERSHIP_AUTHORITY",
      externalOriginWorldState:"ORIGIN_SCOPE_ONLY_UNLESS_IMPORTED"
    },
    economyFirewall:{
      duplicateStartingPurseGranted:false,
      autonomousPlayerVictoryBattleRyoGranted:false,
      blanketInventoryRewardsGranted:false,
      playerEconomyMutation:false
    },
    migrationReceipt:null,
    miContinuity:clone(continuity),
    commitState:"COMMITTED",committed:true,committedAt:Date.now()
  };
  return persistKakashiPrivateHistory46900(row);
}
function laterParticipantUnavailabilityRefs(continuity){
  if(!continuity)return[];
  const originTime=Number(continuity.capturedAt)||0;
  return history().filter(row=>{
    if(!row||row.committed!==true||String(row.type||"").startsWith("academy_kakashi_v2_"))return false;
    if(originTime&&Number(row.timestamp||0)&&Number(row.timestamp)<originTime)return false;
    const d=row.data&&typeof row.data==="object"?row.data:{};
    const refs=[d.stableParticipantId,d.participantId,d.targetParticipantId,...(Array.isArray(d.participants)?d.participants:[]),...(Array.isArray(d.participantRefs)?d.participantRefs:[])].filter(Boolean).map(String);
    if(!refs.includes(MI_ID))return false;
    const semantic=(String(row.type||"")+" "+String(row.outcome||"")+" "+String(d.state||"")).toLowerCase();
    return d.currentWorldAvailable===false||d.deceased===true||d.killed===true||/\b(killed|dead|death|deceased|permanently unavailable)\b/.test(semantic);
  }).map(recordId).filter(Boolean);
}
function historyFamily(continuity){
  if(!continuity)return null;
  const m=continuity.materialHistory||{};
  if(m.lethalAttempt===true)return"lethal_attempt";
  if(m.policeTransfer===true||continuity.fieldDispositionState==="POLICE_CUSTODY")return"police_transfer";
  if(m.restraintOrAnbu===true||["RESTRAINED","ANBU_CUSTODY"].includes(continuity.fieldDispositionState))return"restraint_or_anbu";
  if(m.deliberateRelease===true||continuity.fieldDispositionState==="RELEASED")return"deliberate_release";
  if(m.miDefeatedKakashi===true)return"mi_defeated_kakashi";
  if(m.kakashiDefeatedMi===true||continuity.fieldDispositionState==="BATTLE_DEFEATED")return"kakashi_defeated_mi";
  return continuity.encounteredByProtagonist===true?"material_encounter":null;
}
function resolvedRecord(){
  return history().find(row=>row&&row.committed===true&&recordId(row)===OCCURRENCE_ID)||null;
}
function isResolved(){
  if(resolvedRecord())return true;
  try{
    const state=typeof getWorldEventDimensionState==="function"?getWorldEventDimensionState("resolutionByOpportunityId",OPPORTUNITY_ID):{};
    return !!(state&&state.resolved===true);
  }catch(_error){return false;}
}
function eligibility(){
  const a=acquisition();
  if(!a||!a.chronicleOriginVariantId)return{available:false,reason:"selected_origin_required"};
  const selectedOrigin=String(a.chronicleOriginVariantId);
  if(!a.chronicleOrigin||a.chronicleOrigin.prologueCompleted!==true)return{available:false,reason:"selected_origin_incomplete"};
  if(selectedOrigin!==ORIGIN_ID){
    const privateResult=ensureAutonomousKakashiPrivateHistory46900(currentTeam()?"pre_471_active_konoha_migration":"origin_convergence_preparation");
    if(!privateResult||privateResult.success!==true)return{available:false,reason:privateResult&&privateResult.reason||"kakashi_private_origin_unavailable"};
  }
  const team=currentTeam(),continuity=getContinuity();
  if(typeof isAcademyFreePlayAvailable==="function"&&isAcademyFreePlayAvailable()!==true)return{available:false,reason:"academy_free_play_required"};
  if(!team||team.originVariantId!==selectedOrigin||!Array.isArray(team.teamVariantIds)||team.teamVariantIds.length!==3)return{available:false,reason:"exact_current_academy_team_required"};
  if(!team.teamVariantIds.includes(ORIGIN_ID))return{available:false,reason:"kakashi_current_presence_required"};
  if(selectedOrigin!==ORIGIN_ID&&selectedOrigin!==MENMA_ID)return{available:false,reason:"non_kakashi_protagonist_writing_not_authorised"};
  const secondTeammateRef=selectedOrigin===MENMA_ID?menmaSecondTeammateRef46900(team):null;
  if(selectedOrigin===MENMA_ID&&!secondTeammateRef)return{available:false,reason:"menma_second_teammate_required"};
  if(selectedOrigin===MENMA_ID&&!REACTIONS[secondTeammateRef])return{available:false,reason:"menma_second_teammate_reaction_not_authored",secondTeammateRef};
  if(!continuity)return{available:false,reason:"masked_interceptor_continuity_unproven"};
  if(continuity.encounteredByProtagonist!==true||continuity.fieldDispositionState==="UNSEEN")return{available:false,reason:"masked_interceptor_unseen"};
  if(continuity.survivedOrigin!==true||continuity.fieldDispositionState==="KILLED")return{available:false,reason:"masked_interceptor_killed"};
  if(continuity.hiddenPostTestReviewReached!==true||continuity.postTestTruthClass!=="staged_konoha_test_participant")return{available:false,reason:"hidden_post_test_continuity_unproven"};
  const unavailableRefs=laterParticipantUnavailabilityRefs(continuity);
  if(unavailableRefs.length)return{available:false,reason:"masked_interceptor_later_unavailable",sourceRefs:unavailableRefs};
  if(isResolved())return{available:false,reason:"hotspot_already_resolved"};
  return{
    available:true,
    mode:selectedOrigin===ORIGIN_ID?"kakashi_protagonist":"menma_private_history_emergence",
    protagonistVariantId:selectedOrigin,
    team:clone(team),
    continuity:clone(continuity),
    privateHistory:storedKakashiPrivateHistory(),
    secondTeammateRef,
    historyFamily:historyFamily(continuity)
  };
}
function eventPlan(){
  const gate=eligibility();
  if(!gate.available)return{success:false,reason:gate.reason};
  let teammateOrder;
  if(gate.mode==="kakashi_protagonist"){
    const teammates=gate.team.teamVariantIds.filter(id=>id!==ORIGIN_ID);
    const order=new Map(TEAMMATE_AUTHORED_ORDER.map((id,index)=>[id,index]));
    teammateOrder=[...teammates].sort((a,b)=>(order.has(a)?order.get(a):999)-(order.has(b)?order.get(b):999));
    if(teammateOrder.length!==2||teammateOrder.some(id=>!REACTIONS[id]))return{success:false,reason:"authored_teammate_reaction_missing",teammates};
  }else{
    const secondTeammateRef=gate.secondTeammateRef||menmaSecondTeammateRef46900(gate.team);
    if(!secondTeammateRef||!REACTIONS[secondTeammateRef])return{success:false,reason:"menma_second_teammate_reaction_not_authored",secondTeammateRef};
    teammateOrder=[ORIGIN_ID,secondTeammateRef];
  }
  return{
    success:true,
    mode:gate.mode,
    protagonistVariantId:gate.protagonistVariantId,
    occurrenceId:OCCURRENCE_ID,
    eventId:EVENT_ID,
    opportunityId:OPPORTUNITY_ID,
    hostId:HOST_ID,
    stableParticipantId:MI_ID,
    teamAssignmentId:gate.team.assignmentId,
    teamVariantIds:[...gate.team.teamVariantIds],
    teammateOrder,
    privateOriginHistoryRef:gate.privateHistory&&gate.privateHistory.privateOriginHistoryId||null,
    historyFamily:gate.historyFamily,
    historySourceRefs:[...(gate.continuity.materialHistoryRefs||[])],
    continuityOriginOccurrenceRef:gate.continuity.originOccurrenceRef,
    continuityCaptureMode:gate.continuity.captureMode
  };
}

const PRE_COMPLETE_ORIGIN=typeof globalThis.completeChronicleOriginPrologue==="function"?globalThis.completeChronicleOriginPrologue:null;
function completeChronicleOriginPrologue46900(originVariantId,evidenceIds=[]){
  let capturedState=null,capturedInstance=null;
  if(originVariantId===ORIGIN_ID&&typeof globalThis.getAcademyKakashiV2State36020==="function"){
    try{
      capturedState=clone(globalThis.getAcademyKakashiV2State36020());
      const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
      capturedInstance=active&&active.sceneId==="origin_academy_kakashi_anbu_retrieval"?active.instanceId:null;
    }catch(_error){}
  }
  const result=PRE_COMPLETE_ORIGIN?PRE_COMPLETE_ORIGIN.apply(this,arguments):{success:false,reason:"origin_completion_authority_missing"};
  if(result&&result.success===true&&originVariantId===ORIGIN_ID&&capturedState&&capturedInstance){
    const row=continuityFromCapturedState(capturedState,capturedInstance);
    if(row&&row.hiddenPostTestReviewReached===true){
      saveContinuity(row);
      persistPlayerExperiencedKakashiPrivateHistory46900(capturedState,capturedInstance,row);
    }
  }
  return result;
}
if(PRE_COMPLETE_ORIGIN){
  globalThis.completeChronicleOriginPrologue=completeChronicleOriginPrologue46900;
  try{completeChronicleOriginPrologue=completeChronicleOriginPrologue46900;}catch(_error){}
}

const PRE_CONFIRM_ACADEMY_TEAM_46900=typeof globalThis.confirmAcademyTeamFormation==="function"?globalThis.confirmAcademyTeamFormation:null;
function confirmAcademyTeamFormation46900(){
  const a=acquisition();
  if(a&&a.chronicleOriginVariantId&&a.chronicleOriginVariantId!==ORIGIN_ID&&a.chronicleOrigin&&a.chronicleOrigin.prologueCompleted===true){
    const privateResult=ensureAutonomousKakashiPrivateHistory46900("origin_convergence_preparation_before_team_formation");
    if(!privateResult||privateResult.success!==true)return privateResult||{success:false,reason:"kakashi_private_origin_preparation_failed"};
  }
  return PRE_CONFIRM_ACADEMY_TEAM_46900?PRE_CONFIRM_ACADEMY_TEAM_46900.apply(this,arguments):{success:false,reason:"academy_team_formation_authority_missing"};
}
if(PRE_CONFIRM_ACADEMY_TEAM_46900){
  globalThis.confirmAcademyTeamFormation=confirmAcademyTeamFormation46900;
  try{confirmAcademyTeamFormation=confirmAcademyTeamFormation46900;}catch(_error){}
}
function migrateLegacyKakashiPrivateOrigin46900(){
  const a=acquisition();
  if(!a||!a.chronicleOriginVariantId||a.chronicleOriginVariantId===ORIGIN_ID||!a.chronicleOrigin||a.chronicleOrigin.prologueCompleted!==true)return{success:false,reason:"migration_not_applicable"};
  if(storedKakashiPrivateHistory())return{success:true,idempotent:true,history:storedKakashiPrivateHistory()};
  if(!currentTeam()&&!(typeof isAcademyFreePlayAvailable==="function"&&isAcademyFreePlayAvailable()===true))return{success:false,reason:"migration_waiting_for_convergence_boundary"};
  return ensureAutonomousKakashiPrivateHistory46900("pre_471_active_konoha_one_shot_migration");
}

function decisionSnapshot(){
  return D.getStoryUnitSnapshot(STORY_UNIT_REF)||{autonomyReceipts:{},decisionReceipts:{}};
}
function teammateReceipts(){
  const snap=decisionSnapshot();
  return Object.values(snap.autonomyReceipts||{}).filter(row=>row&&row.committedStateRef===OCCURRENCE_ID&&TEAMMATE_AUTHORED_ORDER.includes(row.actorRef));
}
function resolvedTeammateRefs(){
  return teammateReceipts().map(row=>row.actorRef);
}
function reactionKindFromIntentRef(ref){
  const raw=String(ref||"");
  if(raw.includes(":strong:"))return"strong";
  if(raw.includes(":fallback:"))return"fallback";
  return"no_strong";
}
function reactionForReceipt(receipt){
  if(!receipt)return null;
  const authored=REACTIONS[receipt.actorRef];
  if(!authored)return null;
  const kind=reactionKindFromIntentRef(receipt.participantIntentRef);
  const cues=kind==="strong"&&authored.strong?authored.strong:authored.fallback;
  return{actorRef:receipt.actorRef,kind,cues:clone(cues||[]),receiptId:receipt.autonomyReceiptId};
}
function committedTeammateReactions(){
  const order=new Map(TEAMMATE_AUTHORED_ORDER.map((id,index)=>[id,index]));
  return teammateReceipts().map(reactionForReceipt).filter(Boolean).sort((a,b)=>(order.get(a.actorRef)||0)-(order.get(b.actorRef)||0));
}
function priorStrongClasses(){
  const out=new Set();
  for(const reaction of committedTeammateReactions()){
    if(reaction.kind!=="strong")continue;
    const row=REACTIONS[reaction.actorRef];
    if(row&&row.redundancyClass)out.add(row.redundancyClass);
  }
  return out;
}
function autonomyState(){
  const plan=eventPlan();
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const local=active&&active.sceneId===SCENE_ID&&active.localContext&&typeof active.localContext==="object"?active.localContext:null;
  const teamVariantIds=local&&Array.isArray(local.teamVariantIds)?local.teamVariantIds:(plan.success?plan.teamVariantIds:[]);
  return{
    committedStateRef:OCCURRENCE_ID,
    autonomyPhase:"pre_protagonist_choice",
    battleLive:false,
    occurrenceId:OCCURRENCE_ID,
    teamVariantIds:[...teamVariantIds],
    resolvedParticipantRefs:resolvedTeammateRefs()
  };
}
function resolveTeammateReaction(actorRef){
  const authored=REACTIONS[actorRef];
  if(!authored)return{success:false,reason:"teammate_reaction_not_authored"};
  const used=priorStrongClasses();
  const kind=authored.noStrong===true?"no_strong":(authored.redundancyClass&&used.has(authored.redundancyClass)?"fallback":"strong");
  const intentRef=EVENT_ID+":teammate:"+actorRef+":"+kind+":"+(authored.redundancyClass||"no_strong_stance");
  return{
    success:true,
    participantIntentRef:intentRef,
    resolverResultRef:D.stableRef("ce469-teammate-reaction",{occurrenceId:OCCURRENCE_ID,actorRef,kind}),
    result:{actorRef,kind,noStrongStance:authored.noStrong===true}
  };
}
for(const [index,actorRef] of TEAMMATE_AUTHORED_ORDER.entries()){
  const registered=D.registerAutonomyAnchor(STORY_UNIT_REF,{
    anchorId:"teammate_reaction_"+actorRef,
    classes:["PARTICIPANT_AUTONOMY","KONOHA_LIVE_HOTSPOT"],
    actorRef,
    priority:10+index,
    orderRef:"writing_order_"+String(index+1).padStart(2,"0"),
    material:true,
    due:state=>state&&state.occurrenceId===OCCURRENCE_ID&&Array.isArray(state.teamVariantIds)&&state.teamVariantIds.includes(actorRef)&&!(Array.isArray(state.resolvedParticipantRefs)&&state.resolvedParticipantRefs.includes(actorRef)),
    resolve:()=>resolveTeammateReaction(actorRef),
    metadata:{eventId:EVENT_ID,hostId:HOST_ID,observerKnowledgeScope:"direct_current_scene_only"}
  });
  if(!registered||registered.success!==true)throw new Error("ce469_autonomy_anchor_registration_failed:"+actorRef);
}
function consumeNextTeammateReaction(){
  const result=D.consumeNextAutonomy({storyUnitRef:STORY_UNIT_REF,state:autonomyState()});
  if(!result||result.success!==true)return result||{success:false,reason:"teammate_autonomy_failed"};
  return{success:true,idempotent:result.idempotent===true,receipt:result.receipt||null};
}

for(const choice of CHOICES){
  const bindingRef=EVENT_ID+":intent:"+choice.id;
  const reg=D.registerResolver(bindingRef,({receipt})=>({
    success:true,
    resolverResultRef:D.stableRef("ce469-protagonist-intent",{occurrenceId:OCCURRENCE_ID,choiceId:choice.id,receiptId:receipt&&receipt.storyDecisionReceiptId||null}),
    result:{choiceId:choice.id,intentType:choice.intentType},
    consequenceRefs:[],
    knowledgeDeltaRefs:[],
    relationshipHistoryRefs:[],
    successorSituationRef:EVENT_ID+":branch:"+choice.id
  }),{owner:PATCH_ID,battleOwned:false});
  if(!reg||reg.success!==true)throw new Error("ce469_choice_resolver_registration_failed:"+choice.id);
}
function ensureChoiceSet(){
  const state=autonomyState();
  if(state.resolvedParticipantRefs.length!==2)return{success:false,reason:"participant_autonomy_incomplete",resolvedParticipantRefs:state.resolvedParticipantRefs};
  return D.openDecisionAfterAutonomy({
    storyUnitRef:STORY_UNIT_REF,
    storyUnitType:"world_event",
    decisionPointRef:EVENT_ID+":kakashi_intent",
    contextStateRef:OCCURRENCE_ID,
    sceneRef:SCENE_ID,
    beatRef:"ce469_choice",
    authorityVersionRefs:["Kakashi_Masked_Interceptor_First_Live_CE_Hotspot_Production_Scene_2026-10-02"],
    sourceOccurrenceRefs:[OCCURRENCE_ID],
    observerRef:ORIGIN_ID,
    excludedIntentRefs:["ATTACK"],
    state,
    choices:CHOICES.map((choice,index)=>({
      choiceId:choice.id,
      intentType:choice.intentType,
      intentPayload:{stableParticipantId:MI_ID,hostId:HOST_ID},
      eligibilityBasisRefs:[OCCURRENCE_ID],
      resolverBindingRef:EVENT_ID+":intent:"+choice.id,
      presentationLabel:choice.label,
      authoredOrder:index
    }))
  });
}
function resolveProtagonistChoice(choiceId){
  const choice=CHOICES.find(row=>row.id===choiceId);
  if(!choice)return{success:false,reason:"protagonist_choice_unknown"};
  const opened=ensureChoiceSet();
  if(!opened||opened.success!==true)return opened||{success:false,reason:"choice_set_unavailable"};
  const resolved=D.resolveStoryChoice({
    storyUnitRef:STORY_UNIT_REF,
    choiceSetId:opened.choiceSet.choiceSetId,
    choiceId,
    state:autonomyState(),
    context:{occurrenceId:OCCURRENCE_ID,hostId:HOST_ID,stableParticipantId:MI_ID}
  });
  return resolved&&resolved.success===true?{success:true,semanticReceipt:resolved.receipt||null}:resolved;
}
function committedProtagonistChoice(){
  const snap=decisionSnapshot();
  const receipts=Object.values(snap.decisionReceipts||{}).filter(row=>row&&row.status==="resolved"&&row.storyUnitRef===STORY_UNIT_REF);
  const receipt=receipts.find(row=>CHOICES.some(choice=>choice.id===row.selectedChoiceId));
  return receipt?receipt.selectedChoiceId:null;
}

function beginOccurrence(){
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const ctx=active&&active.localContext||{};
  if(ctx.occurrenceId!==OCCURRENCE_ID)return{success:false,reason:"ce469_scene_context_missing"};
  if(typeof setWorldEventLifecycle==="function"){
    setWorldEventLifecycle(EVENT_ID,{
      occurrenceId:OCCURRENCE_ID,
      stableParticipantId:MI_ID,
      started:true,
      resolved:false,
      exactTeamVariantIds:Array.isArray(ctx.teamVariantIds)?[...ctx.teamVariantIds]:[],
      observerRef:ctx.protagonistVariantId||null,
      privateOriginHistoryRef:ctx.privateOriginHistoryRef||null,
      projectable:true
    },{save:false});
  }
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,occurrenceId:OCCURRENCE_ID};
}
function finalRecordPayload(choiceId){
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const ctx=active&&active.localContext&&typeof active.localContext==="object"?active.localContext:{};
  const reactions=committedTeammateReactions();
  const consequence=branchConsequence(choiceId);
  if(!consequence)throw new Error("ce469_branch_consequence_missing:"+String(choiceId||""));
  const teammateRefs=Array.isArray(ctx.teammateOrder)?[...ctx.teammateOrder]:[];
  const teammateKnowledgeParticipantRefs=consequence.teammateKnowledgeReceiptIds.length?teammateRefs:[];
  const commonKnownFact="Seen leaving Hokage Administration after completing a stamped document handoff through the public intake.";
  const priorConnection="Previously encountered during the Academy package incident.";
  const recordParts=[commonKnownFact,priorConnection,"Proper name: Unknown."];
  if(consequence.recordAddendum)recordParts.push(consequence.recordAddendum);
  return{
    id:OCCURRENCE_ID,
    occurrenceId:OCCURRENCE_ID,
    sourceOccurrenceId:OCCURRENCE_ID,
    type:"konoha_ce_shared_history_knowledge_occurrence",
    activity:"world_chronicle_hotspot",
    title:"Hokage Administration Crossing",
    locationId:HOST_ID,
    actorVariantId:ORIGIN_ID,
    protagonistParticipantId:ORIGIN_ID,
    participants:[ORIGIN_ID,MI_ID,...teammateRefs],
    committed:true,
    completed:true,
    outcome:recordParts.join(" "),
    data:{
      eventId:EVENT_ID,
      opportunityId:OPPORTUNITY_ID,
      semanticLocationId:HOST_ID,
      stableParticipantId:MI_ID,
      knownPerson:"Masked Interceptor",
      sharedOccurrence:"Hokage Administration Crossing",
      knownFact:commonKnownFact,
      priorConnection,
      properName:"Unknown",
      sharedHistory:true,
      commonFactualReceiptId:"mi_admin_crossing_base_lead_v1",
      branchFactualReceiptId:consequence.factualReceiptId,
      branchKnowledge:clone(consequence.branchKnowledge),
      teammateKnowledgeReceiptIds:[...consequence.teammateKnowledgeReceiptIds],
      teammateKnowledgeFacts:[...consequence.teammateKnowledgeFacts],
      teammateKnowledgeParticipantRefs,
      sharedHistoryReceiptIds:[...consequence.sharedHistoryReceiptIds],
      futureLeadIds:[...consequence.futureLeadIds],
      teammateDisclosureFollowupEligible:consequence.teammateDisclosureFollowupEligible===true,
      privateMiFollowupEligible:consequence.privateMiFollowupEligible===true,
      recordAddendum:consequence.recordAddendum||null,
      knowledge:{
        recognisedSamePerson:true,
        recognisedByMaskedInterceptor:true,
        publicAdministrationBusinessObserved:true,
        publicIntakeProcessedOrdinaryBusiness:true,
        priorModelIncomplete:true
      },
      protagonistIntent:CHOICES.find(row=>row.id===choiceId)?.intentType||null,
      rememberedHistoryFamily:ctx.historyFamily||null,
      originMaterialHistorySourceRefs:Array.isArray(ctx.historySourceRefs)?[...ctx.historySourceRefs]:[],
      storyTeamParticipantRefs:Array.isArray(ctx.teamVariantIds)?[...ctx.teamVariantIds]:[],
      observingParticipantRefs:Array.isArray(ctx.teamVariantIds)?[...ctx.teamVariantIds]:[],
      teammateDirectPerceptionOnly:true,
      participantAutonomyReceiptIds:reactions.map(row=>row.receiptId),
      hiddenTestTruthGranted:false,
      properNameKnowledgeGranted:false,
      anbuMembershipKnowledgeGranted:false,
      moralityScalarCreated:false,
      friendshipScalarCreated:false,
      rewardsGranted:false
    },
    sourceRefs:[
      {type:"world_event",id:EVENT_ID,role:"observer_safe_occurrence"},
      {type:"world_location",id:HOST_ID,role:"directly_observed_host"},
      {type:"event_fact_receipt",id:"mi_admin_crossing_base_lead_v1",role:"common_observer_safe_lead"},
      {type:"event_fact_receipt",id:consequence.factualReceiptId,role:"branch_observer_safe_delta"}
    ],
    timestamp:Date.now()
  };
}
function commitResolution(expectedChoiceId){
  const selected=committedProtagonistChoice();
  if(!selected)return{success:false,reason:"protagonist_intent_receipt_missing"};
  if(expectedChoiceId&&selected!==expectedChoiceId)return{success:false,reason:"protagonist_intent_branch_mismatch",selected,expectedChoiceId};
  const reactions=committedTeammateReactions();
  if(reactions.length!==2)return{success:false,reason:"teammate_autonomy_receipts_incomplete",count:reactions.length};
  const existing=resolvedRecord();
  if(existing)return{success:true,idempotent:true,record:clone(existing)};
  const p=pd();if(!p)return{success:false,reason:"player_state_missing"};
  if(!Array.isArray(p.activityHistory))p.activityHistory=[];
  const record=finalRecordPayload(selected);
  p.activityHistory.push(record);
  try{if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory)&&activityHistory!==p.activityHistory){activityHistory.length=0;activityHistory.push(...p.activityHistory);}}catch(_error){}
  if(typeof setOpportunityResolution==="function")setOpportunityResolution(OPPORTUNITY_ID,{resolved:true,visibleState:"resolved",occurrenceId:OCCURRENCE_ID,selectedIntent:selected},{save:false});
  if(typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(EVENT_ID,{occurrenceId:OCCURRENCE_ID,stableParticipantId:MI_ID,started:true,resolved:true,projectable:false},{save:false});
  if(typeof setOpportunityActionability==="function")setOpportunityActionability(OPPORTUNITY_ID,{available:false,reason:"resolved",reasonVisible:false},{save:false});
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,idempotent:false,record:clone(record)};
}

function menmaDecisionSnapshot46900(){
  return D.getStoryUnitSnapshot(MENMA_STORY_UNIT_REF)||{autonomyReceipts:{},decisionReceipts:{}};
}
function menmaAutonomyReceipts46900(){
  const snap=menmaDecisionSnapshot46900();
  return Object.values(snap.autonomyReceipts||{}).filter(row=>row&&row.committedStateRef===OCCURRENCE_ID);
}
function menmaAutonomyReceiptByActor46900(actorRef,phaseToken=null){
  const rows=menmaAutonomyReceipts46900().filter(row=>row.actorRef===actorRef);
  if(!phaseToken)return rows[0]||null;
  return rows.find(row=>String(row.participantIntentRef||"").includes(phaseToken))||null;
}
function disclosureClass46900(continuity=getContinuity()){
  if(!continuity)return"other";
  const m=continuity.materialHistory||{};
  if(m.lethalAttempt===true)return"lethal";
  if(m.policeTransfer===true||continuity.fieldDispositionState==="POLICE_CUSTODY")return"police";
  if(m.anbuTransfer===true||continuity.fieldDispositionState==="ANBU_CUSTODY")return"anbu";
  if(m.restraint===true||continuity.fieldDispositionState==="RESTRAINED")return"restraint";
  if(m.restraintOrAnbu===true)return continuity.fieldDispositionState==="ANBU_CUSTODY"?"anbu":"restraint";
  if(m.deliberateRelease===true||continuity.fieldDispositionState==="RELEASED")return"release";
  if(m.miDefeatedKakashi===true)return"mi_defeated_kakashi";
  if(m.kakashiDefeatedMi===true||continuity.fieldDispositionState==="BATTLE_DEFEATED")return"kakashi_defeated_mi";
  return"other";
}
const KAKASHI_DISCLOSURE=Object.freeze({
  lethal:Object.freeze({claimClass:"kakashi_testimony_lethal_attempt_v1",text:"I tried to kill her. She got away.",record:"Kakashi said he tried to kill her and she got away."}),
  police:Object.freeze({claimClass:"kakashi_testimony_police_transfer_v1",text:"I handed her to the Uchiha Police.",record:"Kakashi said he handed her to the Uchiha Police."}),
  anbu:Object.freeze({claimClass:"kakashi_testimony_anbu_transfer_v1",text:"I handed her to ANBU.",record:"Kakashi said he handed her to ANBU."}),
  restraint:Object.freeze({claimClass:"kakashi_testimony_restraint_v1",text:"I restrained her. It didn't hold.",record:"Kakashi said he restrained her and it didn't hold."}),
  release:Object.freeze({claimClass:"kakashi_testimony_release_v1",text:"I let her go.",record:"Kakashi said he let her go."}),
  mi_defeated_kakashi:Object.freeze({claimClass:"kakashi_testimony_mi_defeated_him_v1",text:"She beat me and went after the package.",record:"Kakashi said she beat him and went after the package."}),
  kakashi_defeated_mi:Object.freeze({claimClass:"kakashi_testimony_he_defeated_mi_v1",text:"I beat her. Then I moved on.",record:"Kakashi said he beat her and then moved on."}),
  other:Object.freeze({claimClass:"kakashi_testimony_other_material_encounter_v1",text:"We crossed paths during an assignment.",record:"Kakashi said they crossed paths during an assignment."})
});
const MI_DISCLOSURE=Object.freeze({
  lethal:Object.freeze({claimClass:"mi_testimony_lethal_attempt_v1",text:"He tried to kill me.",record:"The masked woman said Kakashi tried to kill her."}),
  police:Object.freeze({claimClass:"mi_testimony_police_transfer_v1",text:"He handed me to the Police.",record:"The masked woman said Kakashi handed her to the Police."}),
  anbu:Object.freeze({claimClass:"mi_testimony_anbu_transfer_v1",text:"He handed me to ANBU.",record:"The masked woman said Kakashi handed her to ANBU."}),
  restraint:Object.freeze({claimClass:"mi_testimony_restraint_v1",text:"He tied me down.",record:"The masked woman said Kakashi tied her down."}),
  release:Object.freeze({claimClass:"mi_testimony_release_v1",text:"He let me go.",record:"The masked woman said Kakashi let her go."}),
  mi_defeated_kakashi:Object.freeze({claimClass:"mi_testimony_defeated_kakashi_v1",text:"I beat him.",record:"The masked woman said she defeated Kakashi."}),
  kakashi_defeated_mi:Object.freeze({claimClass:"mi_testimony_kakashi_defeated_her_v1",text:"He beat me.",record:"The masked woman said Kakashi defeated her."}),
  other:Object.freeze({claimClass:"mi_testimony_other_material_encounter_v1",text:"We met before.",record:"The masked woman said they met before."})
});
function kakashiDisclosure46900(){return clone(KAKASHI_DISCLOSURE[disclosureClass46900()]||KAKASHI_DISCLOSURE.other);}
function miDisclosure46900(){return clone(MI_DISCLOSURE[disclosureClass46900()]||MI_DISCLOSURE.other);}

function menmaAutonomyState46900(phase){
  const plan=eventPlan();
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  const local=active&&active.sceneId===MENMA_SCENE_ID&&active.localContext&&typeof active.localContext==="object"?active.localContext:null;
  const teamVariantIds=local&&Array.isArray(local.teamVariantIds)?[...local.teamVariantIds]:(plan.success?[...plan.teamVariantIds]:[]);
  const secondTeammateRef=menmaSecondTeammateRef46900({teamVariantIds});
  return{
    committedStateRef:OCCURRENCE_ID,
    autonomyPhase:String(phase||""),
    battleLive:false,
    occurrenceId:OCCURRENCE_ID,
    teamVariantIds,
    secondTeammateRef,
    privateOriginHistoryRef:local&&local.privateOriginHistoryRef||plan.privateOriginHistoryRef||null,
    historyFamily:local&&local.historyFamily||plan.historyFamily||null
  };
}
function resolveKakashiCurrentResponse46900(){
  const family=historyFamily(getContinuity())||"material_encounter";
  const intentRef=MENMA_STORY_UNIT_REF+":kakashi_current_response:"+family;
  return{
    success:true,
    participantIntentRef:intentRef,
    resolverResultRef:D.stableRef("ce478-kakashi-current-response",{occurrenceId:OCCURRENCE_ID,family}),
    result:{actorRef:ORIGIN_ID,responseFamily:family,privateOriginHistoryRef:storedKakashiPrivateHistory()?.privateOriginHistoryId||null}
  };
}
function hinataReactionFamily46900(){
  const family=historyFamily(getContinuity())||"material_encounter";
  if(family==="lethal_attempt")return"danger";
  if(family==="mi_defeated_kakashi")return"explicit_history";
  return"visible_recognition";
}
function resolveSecondTeammateCurrentResponse46900(actorRef){
  if(!actorRef||!REACTIONS[actorRef])return{success:false,reason:"menma_second_teammate_reaction_not_authored",actorRef};
  if(actorRef===HINATA_ID){
    const family=hinataReactionFamily46900();
    return{
      success:true,
      participantIntentRef:MENMA_STORY_UNIT_REF+":second_teammate_current_evidence:"+actorRef+":"+family,
      resolverResultRef:D.stableRef("ce478-second-teammate-current-evidence",{occurrenceId:OCCURRENCE_ID,actorRef,family}),
      result:{actorRef,reactionFamily:family,knowledgeScope:"current_scene_direct_evidence_only"}
    };
  }
  const reaction=menmaSecondTeammateReaction46900(actorRef);
  if(!reaction)return{success:false,reason:"menma_second_teammate_reaction_not_authored",actorRef};
  return{
    success:true,
    participantIntentRef:MENMA_STORY_UNIT_REF+":second_teammate_current_evidence:"+actorRef+":"+reaction.kind,
    resolverResultRef:D.stableRef("ce478-second-teammate-current-evidence",{occurrenceId:OCCURRENCE_ID,actorRef,kind:reaction.kind}),
    result:{actorRef,reactionFamily:reaction.kind,knowledgeScope:"current_scene_direct_evidence_only"}
  };
}
function nestedKakashiIntentCandidates46900(){
  const family=historyFamily(getContinuity())||"material_encounter";
  if(family==="lethal_attempt")return["acknowledge_recognition","disengage_keep_moving"];
  if(["police_transfer","restraint_or_anbu","deliberate_release","kakashi_defeated_mi"].includes(family))return["ask_about_delivery","observe_intake_and_departure"];
  if(family==="mi_defeated_kakashi")return["observe_intake_and_departure","ask_about_delivery","acknowledge_recognition"];
  return["ask_about_delivery","observe_intake_and_departure"];
}
function selectNestedKakashiIntent46900(){
  const privateHistory=storedKakashiPrivateHistory();
  const seed=String(privateHistory&&privateHistory.stableAutonomousResolutionSeedRef||privateHistory&&privateHistory.privateOriginHistoryId||privateSeedRef46900());
  const candidates=nestedKakashiIntentCandidates46900();
  return candidates[stableHash46900(seed+"|ce478|nested_current_intent")%candidates.length];
}
function resolveNestedKakashiCurrentIntent46900(){
  const choiceId=selectNestedKakashiIntent46900();
  const choice=CHOICES.find(row=>row.id===choiceId);
  if(!choice)return{success:false,reason:"nested_kakashi_choice_unknown"};
  return{
    success:true,
    participantIntentRef:MENMA_STORY_UNIT_REF+":nested_kakashi_intent:"+choiceId,
    resolverResultRef:D.stableRef("ce478-nested-kakashi-intent",{occurrenceId:OCCURRENCE_ID,choiceId,privateOriginHistoryRef:storedKakashiPrivateHistory()?.privateOriginHistoryId||null}),
    result:{actorRef:ORIGIN_ID,choiceId,intentType:choice.intentType,playerControlled:false}
  };
}
const MENMA_SECOND_TEAMMATE_REFS=Object.freeze(TEAMMATE_AUTHORED_ORDER.filter(id=>id!==MENMA_ID));
const MENMA_AUTONOMY_ANCHORS=[
  {anchorId:"kakashi_private_history_current_response",actorRef:ORIGIN_ID,phase:"kakashi_response",priority:10,resolve:resolveKakashiCurrentResponse46900,due:state=>state&&state.autonomyPhase==="kakashi_response"},
  ...MENMA_SECOND_TEAMMATE_REFS.map((actorRef,index)=>({
    anchorId:"second_teammate_current_evidence_"+actorRef,
    actorRef,
    phase:"second_teammate_response",
    priority:20+index,
    resolve:()=>resolveSecondTeammateCurrentResponse46900(actorRef),
    due:state=>state&&state.autonomyPhase==="second_teammate_response"&&state.secondTeammateRef===actorRef
  })),
  {anchorId:"kakashi_nested_current_intent",actorRef:ORIGIN_ID,phase:"nested_kakashi_intent",priority:40,resolve:resolveNestedKakashiCurrentIntent46900,due:state=>state&&state.autonomyPhase==="nested_kakashi_intent"}
];
for(const anchor of MENMA_AUTONOMY_ANCHORS){
  const registered=D.registerAutonomyAnchor(MENMA_STORY_UNIT_REF,{
    anchorId:anchor.anchorId,
    classes:["PARTICIPANT_AUTONOMY","PRIVATE_HISTORY_EMERGENCE"],
    actorRef:anchor.actorRef,
    priority:anchor.priority,
    orderRef:"ce478_"+anchor.phase+":"+anchor.actorRef,
    material:true,
    due:state=>state&&state.occurrenceId===OCCURRENCE_ID&&anchor.due(state),
    resolve:anchor.resolve,
    metadata:{eventId:EVENT_ID,hostId:HOST_ID,privateHistoryObserverFirewall:true}
  });
  if(!registered||registered.success!==true)throw new Error("ce478_autonomy_anchor_registration_failed:"+anchor.anchorId);
}
function consumeMenmaAutonomy46900(phase){
  const result=D.consumeNextAutonomy({storyUnitRef:MENMA_STORY_UNIT_REF,state:menmaAutonomyState46900(phase)});
  if(!result||result.success!==true)return result||{success:false,reason:"ce478_autonomy_failed",phase};
  return{success:true,idempotent:result.idempotent===true,receipt:result.receipt||null};
}

for(const choice of MENMA_CHOICES){
  const bindingRef=MENMA_STORY_UNIT_REF+":intent:"+choice.id;
  const reg=D.registerResolver(bindingRef,({receipt})=>({
    success:true,
    resolverResultRef:D.stableRef("ce478-menma-intent",{occurrenceId:OCCURRENCE_ID,choiceId:choice.id,receiptId:receipt&&receipt.storyDecisionReceiptId||null}),
    result:{choiceId:choice.id,intentType:choice.intentType,observerRef:MENMA_ID},
    consequenceRefs:[],
    knowledgeDeltaRefs:[],
    relationshipHistoryRefs:[],
    successorSituationRef:MENMA_STORY_UNIT_REF+":branch:"+choice.id
  }),{owner:PATCH_ID,battleOwned:false});
  if(!reg||reg.success!==true)throw new Error("ce478_menma_choice_resolver_registration_failed:"+choice.id);
}
function ensureMenmaChoiceSet46900(){
  const state=menmaAutonomyState46900("menma_choice");
  const secondTeammateRef=state.secondTeammateRef;
  const kakashi=menmaAutonomyReceiptByActor46900(ORIGIN_ID,"kakashi_current_response:");
  const secondTeammate=secondTeammateRef?menmaAutonomyReceiptByActor46900(secondTeammateRef,"second_teammate_current_evidence:"+secondTeammateRef+":"):null;
  if(!kakashi||!secondTeammate)return{success:false,reason:"menma_prechoice_autonomy_incomplete",secondTeammateRef};
  return D.openDecisionAfterAutonomy({
    storyUnitRef:MENMA_STORY_UNIT_REF,
    storyUnitType:"world_event",
    decisionPointRef:MENMA_STORY_UNIT_REF+":menma_intent",
    contextStateRef:OCCURRENCE_ID,
    sceneRef:MENMA_SCENE_ID,
    beatRef:"ce478_menma_choice",
    authorityVersionRefs:["Kakashi_MI_Private_History_Emergence_Non_Kakashi_Protagonist_Scene_Family_2026-10-02"],
    sourceOccurrenceRefs:[OCCURRENCE_ID,storedKakashiPrivateHistory()?.privateOriginHistoryId].filter(Boolean),
    observerRef:MENMA_ID,
    excludedIntentRefs:["ATTACK"],
    state:menmaAutonomyState46900("menma_choice"),
    choices:MENMA_CHOICES.map((choice,index)=>({
      choiceId:choice.id,
      intentType:choice.intentType,
      intentPayload:{stableParticipantId:MI_ID,hostId:HOST_ID,privateHistoryOwnerRef:ORIGIN_ID},
      eligibilityBasisRefs:[OCCURRENCE_ID],
      resolverBindingRef:MENMA_STORY_UNIT_REF+":intent:"+choice.id,
      presentationLabel:choice.label,
      authoredOrder:index
    }))
  });
}
function resolveMenmaChoice46900(choiceId){
  const choice=MENMA_CHOICES.find(row=>row.id===choiceId);
  if(!choice)return{success:false,reason:"menma_choice_unknown"};
  const opened=ensureMenmaChoiceSet46900();
  if(!opened||opened.success!==true)return opened||{success:false,reason:"menma_choice_set_unavailable"};
  const resolved=D.resolveStoryChoice({
    storyUnitRef:MENMA_STORY_UNIT_REF,
    choiceSetId:opened.choiceSet.choiceSetId,
    choiceId,
    state:menmaAutonomyState46900("menma_choice"),
    context:{occurrenceId:OCCURRENCE_ID,hostId:HOST_ID,stableParticipantId:MI_ID,observerRef:MENMA_ID}
  });
  return resolved&&resolved.success===true?{success:true,semanticReceipt:resolved.receipt||null}:resolved;
}
function committedMenmaChoice46900(){
  const snap=menmaDecisionSnapshot46900();
  const receipts=Object.values(snap.decisionReceipts||{}).filter(row=>row&&row.status==="resolved"&&row.storyUnitRef===MENMA_STORY_UNIT_REF);
  const receipt=receipts.find(row=>MENMA_CHOICES.some(choice=>choice.id===row.selectedChoiceId));
  return receipt?receipt.selectedChoiceId:null;
}
function committedNestedKakashiIntent46900(){
  const receipt=menmaAutonomyReceiptByActor46900(ORIGIN_ID,"nested_kakashi_intent:");
  if(!receipt)return null;
  const raw=String(receipt.participantIntentRef||"");
  const token="nested_kakashi_intent:";
  const i=raw.indexOf(token);
  return i>=0?raw.slice(i+token.length):null;
}

function menmaRecordPayload46900(choiceId){
  const continuity=getContinuity();
  const commonFact="Seen completing a stamped document handoff through Hokage Administration public intake. She and Kakashi appeared to recognise each other.";
  const commonReceipt="mi_private_history_emergence_base_v1";
  const sourceRefs=[
    {type:"world_event",id:EVENT_ID,role:"observer_safe_occurrence"},
    {type:"world_location",id:HOST_ID,role:"directly_observed_host"},
    {type:"event_fact_receipt",id:commonReceipt,role:"menma_observer_safe_base"}
  ];
  const data={
    eventId:EVENT_ID,opportunityId:OPPORTUNITY_ID,semanticLocationId:HOST_ID,
    stableParticipantId:MI_ID,knownPerson:"Masked Woman",sharedOccurrence:"Hokage Administration Crossing",
    knownFact:commonFact,properName:"Unknown",connectionToKakashi:"Prior contact indicated; details unknown unless this occurrence produced a bounded disclosure.",
    observerRef:MENMA_ID,privateHistoryOwnerRef:ORIGIN_ID,privateOriginTranscriptGranted:false,
    kakashiPrivateChoiceIdsGranted:false,hiddenTestTruthGranted:false,properNameKnowledgeGranted:false,
    anbuMembershipKnowledgeGranted:false,moralityScalarCreated:false,friendshipScalarCreated:false,rewardsGranted:false,
    commonFactualReceiptId:commonReceipt,branchFactualReceiptId:null,branchKnowledge:{},sharedHistoryReceiptIds:[],futureLeadIds:[],
    testimony:null,recordAddendum:null,nestedKakashiIntent:null,
    storyTeamParticipantRefs:currentTeam()?.teamVariantIds?[...currentTeam().teamVariantIds]:[MENMA_ID,ORIGIN_ID],
    originMaterialHistorySourceRefs:[...(continuity&&continuity.materialHistoryRefs||[])],
    rememberedHistoryFamily:historyFamily(continuity)
  };
  if(choiceId==="menma_ask_kakashi_prior_connection"){
    const disclosure=kakashiDisclosure46900();
    data.branchFactualReceiptId="menma_requested_kakashi_private_history_disclosure_v1";
    data.testimony={source:ORIGIN_ID,claimClass:disclosure.claimClass,truthStatus:"source_attributed_testimony"};
    data.branchKnowledge={boundedKakashiTestimonyHeard:true,claimClass:disclosure.claimClass};
    data.sharedHistoryReceiptIds=["menma_asked_kakashi_about_private_past_v1","kakashi_disclosed_bounded_mi_history_to_current_team_v1"];
    data.futureLeadIds=["teammate_followup_on_disclosed_kakashi_mi_fact_v1"];
    data.recordAddendum=disclosure.record;
  }else if(choiceId==="menma_ask_mi_prior_connection"){
    const disclosure=miDisclosure46900();
    data.branchFactualReceiptId="menma_requested_mi_prior_connection_testimony_v1";
    data.testimony={source:MI_ID,observerLabel:"Masked Woman",claimClass:disclosure.claimClass,truthStatus:"source_attributed_testimony"};
    data.branchKnowledge={boundedMiTestimonyHeard:true,claimClass:disclosure.claimClass};
    data.sharedHistoryReceiptIds=["mi_disclosed_kakashi_private_history_in_front_of_team_v1"];
    data.futureLeadIds=["later_kakashi_reaction_to_mi_disclosure_v1"];
    data.recordAddendum=disclosure.record;
  }else if(choiceId==="menma_yield_to_kakashi"){
    const nested=committedNestedKakashiIntent46900();
    const consequence=nested?branchConsequence(nested):null;
    data.branchFactualReceiptId="menma_yielded_private_history_collision_to_kakashi_v1";
    data.sharedHistoryReceiptIds=["menma_deferred_to_kakashi_on_private_connection_v1",...(consequence&&consequence.sharedHistoryReceiptIds||[])];
    data.futureLeadIds=[...(consequence&&consequence.futureLeadIds||[])];
    data.nestedKakashiIntent=nested;
    data.branchKnowledge=nested==="acknowledge_recognition"?{explicitMutualRecognitionObserved:true}
      :nested==="ask_about_delivery"?{dispatchTaskClassHeard:true,sourceDisclosureRefusedHeard:true}
      :nested==="observe_intake_and_departure"?{publicIntakeProcessMayHaveBeenObserved:true}
      :{};
    data.recordAddendum=nested==="acknowledge_recognition"?"Kakashi and the masked woman openly acknowledged that they remembered each other."
      :nested==="ask_about_delivery"?"Kakashi asked about the delivery; the masked woman described it as a dispatch and redirected the source question to the desk."
      :nested==="observe_intake_and_departure"?"Kakashi stayed to watch the public intake process and her departure."
      :null;
  }else if(choiceId==="menma_disengage"){
    data.branchFactualReceiptId="menma_declined_private_history_inquiry_v1";
    data.sharedHistoryReceiptIds=["menma_saw_kakashi_mi_recognition_and_did_not_press_v1"];
  }else throw new Error("ce478_menma_record_choice_unknown:"+String(choiceId||""));
  sourceRefs.push({type:"event_fact_receipt",id:data.branchFactualReceiptId,role:"menma_branch_delta"});
  const outcome=[commonFact,"Proper name: Unknown.",data.recordAddendum].filter(Boolean).join(" ");
  return{
    id:OCCURRENCE_ID,occurrenceId:OCCURRENCE_ID,sourceOccurrenceId:OCCURRENCE_ID,
    type:"konoha_ce_private_history_emergence_knowledge_occurrence",activity:"world_chronicle_hotspot",
    title:"Hokage Administration Crossing",locationId:HOST_ID,actorVariantId:MENMA_ID,protagonistParticipantId:MENMA_ID,
    participants:[...new Set([...(data.storyTeamParticipantRefs||[MENMA_ID,ORIGIN_ID]),MI_ID])],committed:true,completed:true,outcome,data,sourceRefs,timestamp:Date.now()
  };
}
function commitMenmaResolution46900(expectedChoiceId){
  const selected=committedMenmaChoice46900();
  if(!selected)return{success:false,reason:"menma_intent_receipt_missing"};
  if(expectedChoiceId&&selected!==expectedChoiceId)return{success:false,reason:"menma_intent_branch_mismatch",selected,expectedChoiceId};
  if(selected==="menma_yield_to_kakashi"&&!committedNestedKakashiIntent46900())return{success:false,reason:"nested_kakashi_intent_receipt_missing"};
  const existing=resolvedRecord();
  if(existing)return{success:true,idempotent:true,record:clone(existing)};
  const p=pd();if(!p)return{success:false,reason:"player_state_missing"};
  if(!Array.isArray(p.activityHistory))p.activityHistory=[];
  const record=menmaRecordPayload46900(selected);
  p.activityHistory.push(record);
  try{if(typeof activityHistory!=="undefined"&&Array.isArray(activityHistory)&&activityHistory!==p.activityHistory){activityHistory.length=0;activityHistory.push(...p.activityHistory);}}catch(_error){}
  if(typeof setOpportunityResolution==="function")setOpportunityResolution(OPPORTUNITY_ID,{resolved:true,visibleState:"resolved",occurrenceId:OCCURRENCE_ID,selectedIntent:selected,observerRef:MENMA_ID},{save:false});
  if(typeof setWorldEventLifecycle==="function")setWorldEventLifecycle(EVENT_ID,{occurrenceId:OCCURRENCE_ID,stableParticipantId:MI_ID,started:true,resolved:true,projectable:false,observerRef:MENMA_ID},{save:false});
  if(typeof setOpportunityActionability==="function")setOpportunityActionability(OPPORTUNITY_ID,{available:false,reason:"resolved",reasonVisible:false},{save:false});
  if(typeof savePlayerData==="function")savePlayerData();
  return{success:true,idempotent:false,record:clone(record)};
}

function cue(kind,text,speakerName=null){
  const row={kind,text};
  if(speakerName)row.speakerName=speakerName;
  return row;
}
function openingCues(){
  return[
    cue("narration","At the public intake window, a clerk presses a stamp onto a narrow receipt and slides it back beneath the frame."),
    cue("narration","The masked woman folds the slip into her sleeve and turns away.\n\nThe clerk calls the next visitor forward. A waiting messenger steps up to the counter."),
    cue("narration","Kakashi is crossing the forecourt with his team when he sees the mask.\n\nHis pace breaks for half a step.\n\nSame controlled stride.\n\nThe woman from the package incident."),
    cue("narration","She looks up and sees him.")
  ];
}
function historyCues(runtime){
  const family=runtime&&runtime.localContext&&runtime.localContext.historyFamily||"material_encounter";
  return clone(HISTORY_CUES[family]||HISTORY_CUES.material_encounter);
}
function teammateCueSequence(index){
  const reactions=committedTeammateReactions();
  const row=reactions[index]||null;
  return row&&row.cues&&row.cues.length?clone(row.cues):[cue("narration","The teammate notices the exchange and does not manufacture an answer.")];
}
function branchCues(id){return clone(BRANCH_CUES[id]||[]);}
function observerSafeMenmaCue46900(row){
  const out=clone(row);
  if(!out)return out;
  if(out.speakerName==="MASKED INTERCEPTOR")out.speakerName="MASKED WOMAN";
  if(typeof out.text==="string"){
    out.text=out.text
      .replaceAll("Masked Interceptor's","The masked woman's")
      .replaceAll("Masked Interceptor","The masked woman");
  }
  return out;
}
function menmaOpeningCues46900(){
  const secondTeammateRef=menmaSecondTeammateRef46900();
  const secondTeammateName=teammateDisplayName46900(secondTeammateRef||HINATA_ID);
  return[
    cue("narration","At the public intake window, a clerk presses a stamp onto a narrow receipt and slides it back beneath the frame."),
    cue("narration","The masked woman folds the slip into her sleeve and turns away.\n\nThe clerk calls the next visitor forward. A waiting messenger steps up to the counter."),
    cue("narration","Menma is crossing the forecourt with "+secondTeammateName+" and Kakashi when Kakashi's pace breaks for half a step.\n\nMenma follows his line of sight to the masked woman."),
    cue("narration","She sees Kakashi.\n\nHer attention fixes on him before it touches either of the others.")
  ];
}
function menmaHistoryCues46900(runtime){
  const family=runtime&&runtime.localContext&&runtime.localContext.historyFamily||"material_encounter";
  return clone(HISTORY_CUES[family]||HISTORY_CUES.material_encounter).map(observerSafeMenmaCue46900);
}
function kakashiCurrentResponseCues46900(runtime){
  const family=runtime&&runtime.localContext&&runtime.localContext.historyFamily||historyFamily(getContinuity())||"material_encounter";
  if(family==="restraint_or_anbu"){
    const c=getContinuity();
    const isAnbu=c&&c.fieldDispositionState==="ANBU_CUSTODY";
    return isAnbu
      ?[
        cue("narration","Kakashi notices the turn of her wrist.\n\nHis gaze stays there for one second too long.\n\nThen he looks toward the public intake window.")
      ]
      :[
        cue("narration","Kakashi's hand starts toward the side where he carried ninja wire during the old encounter.\n\nHe stops the movement before touching it.")
      ];
  }
  return clone(KAKASHI_CURRENT_RESPONSE_CUES[family]||KAKASHI_CURRENT_RESPONSE_CUES.material_encounter);
}
function secondTeammateCurrentResponseCues46900(){
  const actorRef=menmaSecondTeammateRef46900();
  if(actorRef===HINATA_ID){
    const family=hinataReactionFamily46900();
    return clone(HINATA_RESPONSE_CUES[family]||HINATA_RESPONSE_CUES.quiet);
  }
  const reaction=menmaSecondTeammateReaction46900(actorRef);
  return reaction&&reaction.cues.length
    ?reaction.cues.map(observerSafeMenmaCue46900)
    :[cue("narration",teammateDisplayName46900(actorRef)+" watches the exchange without claiming to know the history behind it.")];
}
function menmaAskKakashiCues46900(){
  const disclosure=kakashiDisclosure46900();
  return[
    cue("dialogue","Kakashi. What happened?","MENMA"),
    cue("dialogue",disclosure.text,"KAKASHI"),
    cue("narration","Menma looks at Kakashi first.\n\nThen at the masked woman.\n\nWhatever else happened before they became a team, Kakashi has given him one piece of it.\n\nThe masked woman does not volunteer the rest.\n\nShe continues across the forecourt.")
  ];
}
function menmaAskMiCues46900(){
  const disclosure=miDisclosure46900();
  return[
    cue("dialogue","How do you know Kakashi?","MENMA"),
    cue("dialogue",disclosure.text,"MASKED WOMAN"),
    cue("narration","Kakashi looks at her.\n\nShe does not add an explanation.\n\nThe clerk at the intake window calls another visitor forward behind them.\n\nThe masked woman steps away.")
  ];
}
function menmaYieldCues46900(){
  const nested=committedNestedKakashiIntent46900();
  const nestedCues=nested?branchCues(nested).map(observerSafeMenmaCue46900):[];
  return[
    cue("narration","Menma steps aside."),
    cue("dialogue","Your mess.","MENMA"),
    cue("narration","He leaves Kakashi the space instead of taking the exchange over."),
    ...nestedCues
  ];
}
function menmaDisengageCues46900(){
  const secondTeammateName=teammateDisplayName46900(menmaSecondTeammateRef46900()||HINATA_ID);
  return[
    cue("dialogue","We're moving.","MENMA"),
    cue("narration","Menma keeps walking.\n\n"+secondTeammateName+" moves with him.\n\nKakashi stays still for half a second longer, then follows."),
    cue("narration","The masked woman continues toward the street.\n\nMenma does not turn the recognition into an interrogation.\n\nThe Administration routine carries on behind them.")
  ];
}
function menmaBoardActor46900(id,focus=false){
  const label=id===MI_ID?"MASKED WOMAN":actorLabel(id);
  return{id,label,image:actorImage(id),focus:focus===true};
}
function menmaBoardProjection46900({beatId,performance}){
  const speaker=String(performance&&performance.cue&&(performance.cue.speakerName||performance.cue.speaker)||"").toUpperCase();
  const secondTeammateRef=menmaSecondTeammateRef46900();
  let ids=[MENMA_ID,ORIGIN_ID,MI_ID];
  if((beatId==="ce478_hinata_response"||beatId==="ce478_menma_choice"||String(beatId||"").startsWith("ce478_branch_"))&&secondTeammateRef){
    ids=[MENMA_ID,secondTeammateRef,ORIGIN_ID,MI_ID];
  }
  return{
    mode:beatId==="ce478_menma_choice"?"encounter":"conversation",
    location:"HOKAGE ADMINISTRATION · PUBLIC APPROACH",
    actors:ids.map(id=>menmaBoardActor46900(id,(id===MI_ID?"MASKED WOMAN":actorLabel(id))===speaker)),
    objects:beatId==="ce478_opening"||beatId==="ce478_history"?[{label:"STAMPED RECEIPT",state:"Folded into sleeve"}]:[]
  };
}

function actorImage(id){
  if(id===MI_ID)return"NPC/masked_interceptor.png";
  try{
    if(typeof getCharacterCardAssetPath==="function"){
      const path=getCharacterCardAssetPath(id);
      if(path)return path;
    }
  }catch(_error){}
  const fallback={
    academy_kakashi:"Assets/Academy Student/academy_kakashi.png",
    academy_hinata:"Assets/Academy Student/academy_hinata.png",
    academy_mirai:"Assets/Academy Student/academy_mirai.png",
    academy_menma:"Assets/Academy Student/academy_menma.png",
    academy_kushina:"Assets/Academy Student/academy_kushina.png",
    academy_kurenai:"Assets/Academy Student/academy_kurenai.png",
    academy_iwabee:"Assets/Academy Student/academy_iwabe.png",
    academy_metal_lee:"Assets/Academy Student/academy_metal.png",
    academy_obito:"Assets/Academy Student/academy_obito.png",
    academy_izuno:"Assets/Academy Student/academy_izuno.png"
  };
  return fallback[id]||null;
}
function actorLabel(id){
  if(id===ORIGIN_ID)return"KAKASHI";
  if(id===MI_ID)return"MASKED INTERCEPTOR";
  return TEAMMATE_LABELS[id]||String(id||"").replace(/^academy_/,"").replaceAll("_"," ").toUpperCase();
}
function boardActor(id,focus=false){
  return{id,label:actorLabel(id),image:actorImage(id),focus:focus===true};
}
function boardProjection({runtime,beatId,performance}){
  const speaker=String(performance&&performance.cue&&(performance.cue.speakerName||performance.cue.speaker)||"").toUpperCase();
  const context=runtime&&runtime.localContext||{};
  let ids=[ORIGIN_ID,MI_ID];
  if(beatId==="ce469_team_1"||beatId==="ce469_team_2"){
    const reactions=committedTeammateReactions();
    const index=beatId==="ce469_team_1"?0:1;
    if(reactions[index])ids=[ORIGIN_ID,MI_ID,reactions[index].actorRef];
  }
  return{
    mode:beatId==="ce469_choice"?"encounter":"conversation",
    location:"HOKAGE ADMINISTRATION · PUBLIC APPROACH",
    actors:ids.map(id=>boardActor(id,actorLabel(id)===speaker)),
    objects:beatId==="ce469_opening"||beatId==="ce469_history"?[{label:"STAMPED RECEIPT",state:"Folded into sleeve"}]:[]
  };
}

function domainRequest(id,resolve){return{requestId:id,kind:"domain",resolve};}
const beats=[
  {
    beatId:"ce469_opening",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce469_begin_occurrence",beginOccurrence)],
    nextBeatId:"ce469_history"
  },
  {beatId:"ce469_history",mode:"narration",text:"",nextBeatId:"ce469_team_1"},
  {
    beatId:"ce469_team_1",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce469_teammate_autonomy_1",consumeNextTeammateReaction)],
    nextBeatId:"ce469_team_2"
  },
  {
    beatId:"ce469_team_2",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce469_teammate_autonomy_2",consumeNextTeammateReaction)],
    nextBeatId:"ce469_choice"
  },
  {
    beatId:"ce469_choice",mode:"choice",text:"",
    onEnterConsequences:[domainRequest("ce469_open_protagonist_choice",()=>{const r=ensureChoiceSet();return r&&r.success?{success:true,choiceSetId:r.choiceSet&&r.choiceSet.choiceSetId||null}:r;})],
    choices:CHOICES.map(choice=>({
      choiceId:choice.id,
      label:choice.label,
      nextBeatId:"ce469_branch_"+choice.id,
      consequenceRequests:[domainRequest("ce469_protagonist_intent_"+choice.id,()=>resolveProtagonistChoice(choice.id))]
    }))
  },
  ...CHOICES.map(choice=>({
    beatId:"ce469_branch_"+choice.id,
    mode:"narration",text:"",
    exitScene:true,
    onAdvanceConsequences:[
      domainRequest("ce469_commit_resolution_"+choice.id,()=>commitResolution(choice.id)),
      {requestId:"ce469_feedback_"+choice.id,kind:"feedback",feedbackKind:"chronicle_update",label:"Shinobi Record Updated"}
    ]
  }))
];

try{unregisterStoryScene(SCENE_ID);}catch(_error){}
const sceneRegistration=registerStoryScene({
  sceneId:SCENE_ID,
  eventId:EVENT_ID,
  title:"Hokage Administration Crossing",
  entryBeatId:"ce469_opening",
  locationId:HOST_ID,
  participants:[
    {sourceId:ORIGIN_ID,physicalPresence:true,visible:true,role:"protagonist",displayName:"Kakashi"},
    {sourceId:MI_ID,physicalPresence:true,visible:true,role:"returning_participant",displayName:"Masked Interceptor"}
  ],
  beats,
  defaultReturnContext:{type:"overlay",overlayType:"village"}
});
if(!sceneRegistration||sceneRegistration.success!==true)throw new Error("ce469_story_scene_registration_failed");

if(typeof globalThis.registerStorySceneBoardDefinition==="function"){
  const board=globalThis.registerStorySceneBoardDefinition(SCENE_ID,{
    resolve:boardProjection,
    resolveBackdrop:()=>({assetPath:"Scene backdrops/hokage_district_exterior.png"}),
    exitTransition:"black_wipe",
    performanceSequences:{
      ce469_opening:openingCues,
      ce469_history:({runtime})=>historyCues(runtime),
      ce469_team_1:()=>teammateCueSequence(0),
      ce469_team_2:()=>teammateCueSequence(1),
      ce469_branch_acknowledge_recognition:()=>branchCues("acknowledge_recognition"),
      ce469_branch_ask_about_delivery:()=>branchCues("ask_about_delivery"),
      ce469_branch_observe_intake_and_departure:()=>branchCues("observe_intake_and_departure"),
      ce469_branch_disengage_keep_moving:()=>branchCues("disengage_keep_moving")
    }
  });
  if(!board||board.success!==true)throw new Error("ce469_scene_board_registration_failed");
}

const menmaBeats46900=[
  {
    beatId:"ce478_opening",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce478_begin_occurrence",beginOccurrence)],
    nextBeatId:"ce478_history"
  },
  {beatId:"ce478_history",mode:"narration",text:"",nextBeatId:"ce478_kakashi_response"},
  {
    beatId:"ce478_kakashi_response",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce478_kakashi_autonomy",()=>consumeMenmaAutonomy46900("kakashi_response"))],
    nextBeatId:"ce478_hinata_response"
  },
  {
    beatId:"ce478_hinata_response",mode:"narration",text:"",
    onEnterConsequences:[domainRequest("ce478_second_teammate_autonomy",()=>consumeMenmaAutonomy46900("second_teammate_response"))],
    nextBeatId:"ce478_menma_choice"
  },
  {
    beatId:"ce478_menma_choice",mode:"choice",text:"",
    onEnterConsequences:[domainRequest("ce478_open_menma_choice",()=>{const r=ensureMenmaChoiceSet46900();return r&&r.success?{success:true,choiceSetId:r.choiceSet&&r.choiceSet.choiceSetId||null}:r;})],
    choices:MENMA_CHOICES.map(choice=>({
      choiceId:choice.id,
      label:choice.label,
      nextBeatId:"ce478_branch_"+choice.id,
      consequenceRequests:[domainRequest("ce478_menma_intent_"+choice.id,()=>resolveMenmaChoice46900(choice.id))]
    }))
  },
  ...MENMA_CHOICES.map(choice=>({
    beatId:"ce478_branch_"+choice.id,
    mode:"narration",text:"",
    exitScene:true,
    onEnterConsequences:choice.id==="menma_yield_to_kakashi"
      ?[domainRequest("ce478_nested_kakashi_autonomy",()=>consumeMenmaAutonomy46900("nested_kakashi_intent"))]
      :[],
    onAdvanceConsequences:[
      domainRequest("ce478_commit_resolution_"+choice.id,()=>commitMenmaResolution46900(choice.id)),
      {requestId:"ce478_feedback_"+choice.id,kind:"feedback",feedbackKind:"chronicle_update",label:"Shinobi Record Updated"}
    ]
  }))
];

try{unregisterStoryScene(MENMA_SCENE_ID);}catch(_error){}
const menmaSceneRegistration46900=registerStoryScene({
  sceneId:MENMA_SCENE_ID,
  eventId:EVENT_ID,
  title:"Hokage Administration Crossing",
  entryBeatId:"ce478_opening",
  locationId:HOST_ID,
  participants:[
    {sourceId:MENMA_ID,physicalPresence:true,visible:true,role:"protagonist",displayName:"Menma"},
    {sourceId:ORIGIN_ID,physicalPresence:true,visible:true,role:"private_history_owner",displayName:"Kakashi"},
    {sourceId:MI_ID,physicalPresence:true,visible:true,role:"returning_participant",displayName:"Masked Woman"}
  ],
  beats:menmaBeats46900,
  defaultReturnContext:{type:"overlay",overlayType:"village"}
});
if(!menmaSceneRegistration46900||menmaSceneRegistration46900.success!==true)throw new Error("ce478_menma_story_scene_registration_failed");

if(typeof globalThis.registerStorySceneBoardDefinition==="function"){
  const board=globalThis.registerStorySceneBoardDefinition(MENMA_SCENE_ID,{
    resolve:menmaBoardProjection46900,
    resolveBackdrop:()=>({assetPath:"Scene backdrops/hokage_district_exterior.png"}),
    exitTransition:"black_wipe",
    performanceSequences:{
      ce478_opening:menmaOpeningCues46900,
      ce478_history:({runtime})=>menmaHistoryCues46900(runtime),
      ce478_kakashi_response:({runtime})=>kakashiCurrentResponseCues46900(runtime),
      ce478_hinata_response:secondTeammateCurrentResponseCues46900,
      ce478_branch_menma_ask_kakashi_prior_connection:menmaAskKakashiCues46900,
      ce478_branch_menma_ask_mi_prior_connection:menmaAskMiCues46900,
      ce478_branch_menma_yield_to_kakashi:menmaYieldCues46900,
      ce478_branch_menma_disengage:menmaDisengageCues46900
    }
  });
  if(!board||board.success!==true)throw new Error("ce478_menma_scene_board_registration_failed");
}

function sceneContext(){
  const plan=eventPlan();
  if(!plan.success)return plan;
  return{
    occurrenceId:plan.occurrenceId,
    eventId:plan.eventId,
    opportunityId:plan.opportunityId,
    hostId:plan.hostId,
    stableParticipantId:plan.stableParticipantId,
    teamAssignmentId:plan.teamAssignmentId,
    teamVariantIds:[...plan.teamVariantIds],
    mode:plan.mode,
    protagonistVariantId:plan.protagonistVariantId,
    teammateOrder:[...plan.teammateOrder],
    privateOriginHistoryRef:plan.privateOriginHistoryRef||null,
    historyFamily:plan.historyFamily,
    historySourceRefs:[...plan.historySourceRefs],
    continuityOriginOccurrenceRef:plan.continuityOriginOccurrenceRef
  };
}

try{unregisterWorldEventOpportunity(OPPORTUNITY_ID);}catch(_error){}
const worldRegistration=registerWorldEventOpportunity({
  opportunityId:OPPORTUNITY_ID,
  eventId:EVENT_ID,
  hotspotId:"hotspot_konoha_ce_kon_p01_masked_interceptor",
  locationId:HOST_ID,
  regionKey:"konoha",
  sourceKind:"story",
  randomPoolEligible:false,
  defaultDiscoveryLevel:"discovered",
  revealPredicate:()=>eligibility().available===true,
  evaluateProjection:()=>eligibility().available===true,
  presentation:{
    family:"Chronicle Event",
    category:"STORY",
    label:"Hokage Administration",
    summary:"A masked woman is leaving the public intake approach.",
    showUnknownMarker:false
  },
  anchor:{x:52.41,y:20.02},
  interactions:[
    {
      id:ACTION_ID,
      label:"OBSERVE",
      kind:"story_scene",
      sceneId:SCENE_ID,
      evaluateAvailability:()=>{
        const gate=eligibility();
        return{available:gate.available===true&&gate.mode==="kakashi_protagonist",reason:gate.available?gate.mode:gate.reason,reasonVisible:false};
      },
      sceneContextResolver:()=>{
        const context=sceneContext();
        return context&&context.occurrenceId&&context.mode==="kakashi_protagonist"?context:null;
      },
      returnContext:{type:"overlay",overlayType:"village"}
    },
    {
      id:MENMA_ACTION_ID,
      label:"OBSERVE",
      kind:"story_scene",
      sceneId:MENMA_SCENE_ID,
      evaluateAvailability:()=>{
        const gate=eligibility();
        return{available:gate.available===true&&gate.mode==="menma_private_history_emergence",reason:gate.available?gate.mode:gate.reason,reasonVisible:false};
      },
      sceneContextResolver:()=>{
        const context=sceneContext();
        return context&&context.occurrenceId&&context.mode==="menma_private_history_emergence"?context:null;
      },
      returnContext:{type:"overlay",overlayType:"village"}
    }
  ]
});
if(!worldRegistration||worldRegistration.success!==true)throw new Error("ce469_world_opportunity_registration_failed");

const PRE_SHINOBI_RECORD_PARTICIPANTS=typeof globalThis.getShinobiRecordParticipants==="function"?globalThis.getShinobiRecordParticipants:null;
function getShinobiRecordParticipants46900(record){
  if(record&&recordId(record)===OCCURRENCE_ID){
    const d=record.data&&typeof record.data==="object"?record.data:{};
    if(d.observerRef===MENMA_ID||record.protagonistParticipantId===MENMA_ID){
      const team=Array.isArray(d.storyTeamParticipantRefs)?d.storyTeamParticipantRefs:[MENMA_ID,ORIGIN_ID];
      const names=team.map(id=>id===MENMA_ID?"Menma":id===ORIGIN_ID?"Kakashi":teammateDisplayName46900(id));
      return[...names,"Masked Woman"];
    }
    const team=Array.isArray(d.storyTeamParticipantRefs)?d.storyTeamParticipantRefs:[ORIGIN_ID];
    const teammateNames=team.filter(id=>id!==ORIGIN_ID).map(id=>TEAMMATE_LABELS[id]||String(id).replace(/^academy_/,"").replaceAll("_"," ").toUpperCase());
    return["Kakashi","Masked Interceptor",...teammateNames];
  }
  return PRE_SHINOBI_RECORD_PARTICIPANTS?PRE_SHINOBI_RECORD_PARTICIPANTS.apply(this,arguments):[];
}
if(PRE_SHINOBI_RECORD_PARTICIPANTS){
  globalThis.getShinobiRecordParticipants=getShinobiRecordParticipants46900;
  try{getShinobiRecordParticipants=getShinobiRecordParticipants46900;}catch(_error){}
}

const PRE_RENDER_KONOHA_ANCHOR=typeof globalThis.renderAlphaKonohaV3IdentifiedAnchor==="function"?globalThis.renderAlphaKonohaV3IdentifiedAnchor:null;
function renderAlphaKonohaV3IdentifiedAnchor46900(location,options={}){
  if(PRE_RENDER_KONOHA_ANCHOR&&location&&location.id===HOST_ID&&eligibility().available===true){
    return PRE_RENDER_KONOHA_ANCHOR({...location,route:"ce_hotspot_469"},options);
  }
  return PRE_RENDER_KONOHA_ANCHOR?PRE_RENDER_KONOHA_ANCHOR.apply(this,arguments):"";
}
if(PRE_RENDER_KONOHA_ANCHOR){
  globalThis.renderAlphaKonohaV3IdentifiedAnchor=renderAlphaKonohaV3IdentifiedAnchor46900;
  try{renderAlphaKonohaV3IdentifiedAnchor=renderAlphaKonohaV3IdentifiedAnchor46900;}catch(_error){}
}

const PRE_ACTIVATE_KONOHA_LOCATION=typeof globalThis.activateAlphaKonohaV3PublicLocation==="function"?globalThis.activateAlphaKonohaV3PublicLocation:null;
function activateAlphaKonohaV3PublicLocation46900(event,locationId){
  if(String(locationId||"")===HOST_ID){
    const gate=eligibility();
    if(gate.available===true){
      if(event&&typeof event.preventDefault==="function")event.preventDefault();
      if(event&&typeof event.stopPropagation==="function")event.stopPropagation();
      const actionId=gate.mode==="menma_private_history_emergence"?MENMA_ACTION_ID:ACTION_ID;
      const result=routeWorldOpportunityInteraction(OPPORTUNITY_ID,actionId);
      return result&&result.success===true?result:(result||{success:false,reason:"ce469_hotspot_route_failed"});
    }
  }
  return PRE_ACTIVATE_KONOHA_LOCATION?PRE_ACTIVATE_KONOHA_LOCATION.apply(this,arguments):{success:false,reason:"konoha_location_route_missing"};
}
if(PRE_ACTIVATE_KONOHA_LOCATION){
  globalThis.activateAlphaKonohaV3PublicLocation=activateAlphaKonohaV3PublicLocation46900;
  try{activateAlphaKonohaV3PublicLocation=activateAlphaKonohaV3PublicLocation46900;}catch(_error){}
}

function diagnostics(){
  const continuity=getContinuity(),gate=eligibility();
  const labels=CHOICES.map(row=>row.label).join("|");
  const menmaLabels=MENMA_CHOICES.map(row=>row.label).join("|");
  const privateHistory=storedKakashiPrivateHistory();
  const checks={
    exactEventIdentity:EVENT_ID==="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"&&HOST_ID==="KON-P01"&&MI_ID==="academy_kakashi_origin_masked_interceptor",
    continuitySchemaBounded:typeof globalThis.getOriginParticipantContinuityStore43600==="function",
    privateOriginHistorySchemaBounded:typeof globalThis.getPrivateOriginHistoryStore43600==="function",
    frozenOriginWrappedNotRewritten:!!PRE_COMPLETE_ORIGIN&&String(completeChronicleOriginPrologue46900).includes("PRE_COMPLETE_ORIGIN.apply"),
    teamFormationSelectsAlreadyLivedKakashi:!PRE_CONFIRM_ACADEMY_TEAM_46900||String(confirmAcademyTeamFormation46900).includes("ensureAutonomousKakashiPrivateHistory46900"),
    killedTerminal:String(eligibility).includes('fieldDispositionState==="KILLED"'),
    unseenIneligible:String(eligibility).includes('fieldDispositionState==="UNSEEN"'),
    kakashiPresenceRequired:String(eligibility).includes("kakashi_current_presence_required"),
    selectedOriginSlotNoLongerOwnsKakashiHistory:!String(eligibility).includes("academy_kakashi_origin_required"),
    hiddenReviewRequired:String(eligibility).includes("hiddenPostTestReviewReached"),
    sevenHistoryFamilies:Object.keys(HISTORY_CUES).length===7,
    deterministicPrecedence:String(historyFamily).indexOf("lethalAttempt")<String(historyFamily).indexOf("policeTransfer")&&String(historyFamily).indexOf("policeTransfer")<String(historyFamily).indexOf("restraintOrAnbu"),
    autonomousProfile23Boundaries:Object.keys(AUTONOMOUS_KAKASHI_BOUNDARIES).length===23,
    autonomousProfile93Choices:AUTONOMOUS_KAKASHI_CHOICE_IDS.length===93&&new Set(AUTONOMOUS_KAKASHI_CHOICE_IDS).size===93,
    machineResolveExcluded:!AUTONOMOUS_KAKASHI_CHOICE_IDS.some(id=>String(id).includes("success")&&String(id).includes("resolver")),
    battleOwnedAutonomousResult:typeof globalThis.resolveAcademyKakashiV2AutonomousPrivateBattle36010==="function",
    privateHistoryNoEconomyMutation:!privateHistory||privateHistory.economyFirewall&&privateHistory.economyFirewall.playerEconomyMutation===false&&privateHistory.economyFirewall.duplicateStartingPurseGranted===false&&privateHistory.economyFirewall.autonomousPlayerVictoryBattleRyoGranted===false,
    participantFirstAuthority:D.getRegisteredAnchorInventory(STORY_UNIT_REF).length===9,
    menmaParticipantAutonomy:D.getRegisteredAnchorInventory(MENMA_STORY_UNIT_REF).length===MENMA_SECOND_TEAMMATE_REFS.length+2,
    menmaSecondTeammateDynamic:!String(eligibility).includes("menma_live_benchmark_requires_hinata")&&String(eligibility).includes("menmaSecondTeammateRef46900")&&String(eventPlan).includes("secondTeammateRef"),
    obitoSecondTeammateAuthored:!!REACTIONS.academy_obito&&String(REACTIONS.academy_obito.strong&&REACTIONS.academy_obito.strong[1]&&REACTIONS.academy_obito.strong[1].text)==="Wait—you know her?",
    exactFourChoices:labels==="Tell her you remember her.|Ask about the delivery.|Watch what she does.|Keep moving.",
    exactMenmaChoices:menmaLabels==="Ask Kakashi what happened.|Ask her how she knows Kakashi.|Let Kakashi handle it.|Keep moving.",
    distinctBranchConsequences:Object.keys(BRANCH_CONSEQUENCES).length===4&&new Set(Object.values(BRANCH_CONSEQUENCES).map(row=>row.factualReceiptId)).size===4,
    menmaObserverSafeRecord:String(menmaRecordPayload46900).includes('knownPerson:"Masked Woman"')&&String(menmaRecordPayload46900).includes("privateOriginTranscriptGranted:false"),
    nestedKakashiNotPlayerControlled:String(resolveNestedKakashiCurrentIntent46900).includes("playerControlled:false"),
    noAttackChoice:![...CHOICES,...MENMA_CHOICES].some(row=>/attack/i.test(row.label+" "+row.intentType)),
    oneObserverSafeRecord:String(finalRecordPayload).includes("Hokage Administration Crossing")&&String(finalRecordPayload).includes('properName:"Unknown"')&&String(finalRecordPayload).includes("hiddenTestTruthGranted:false"),
    recordParticipantProjection:!!PRE_SHINOBI_RECORD_PARTICIPANTS&&String(getShinobiRecordParticipants46900).includes('"Masked Woman"')&&String(getShinobiRecordParticipants46900).includes('"Masked Interceptor"'),
    noRewardWriter:!String(commitResolution).includes("addItemToInventory")&&!String(commitResolution).includes("ryo")&&!String(commitMenmaResolution46900).includes("addItemToInventory")&&!String(commitMenmaResolution46900).includes("ryo"),
    finiteResolution:String(commitResolution).includes("resolvedRecord")&&String(commitResolution).includes("setOpportunityResolution")&&String(commitMenmaResolution46900).includes("resolvedRecord"),
    p01OnlyWhileEligible:!!PRE_RENDER_KONOHA_ANCHOR&&String(renderAlphaKonohaV3IdentifiedAnchor46900).includes("eligibility().available===true"),
    observerModeRoutesSameOpportunity:String(activateAlphaKonohaV3PublicLocation46900).includes("MENMA_ACTION_ID")&&String(activateAlphaKonohaV3PublicLocation46900).includes("ACTION_ID"),
    storyBoardRegistered:typeof globalThis.resolveStorySceneBoardProjection==="function",
    administrationBackdropBound:String(installPhase2CeHotspot46900).includes("hokage_district_exterior.png"),
    currentTeamAuthority:String(currentTeam).includes("getChronicleCurrentTeam43600")&&String(eligibility).includes("currentTeam()"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,currentPrivateHistory:clone(privateHistory),currentContinuity:clone(continuity),currentEligibility:clone(gate),browserGoldenClaimed:false};
}

try{migrateLegacyKakashiPrivateOrigin46900();}catch(_error){}

globalThis.getKakashiPrivateOriginHistory46900=()=>clone(storedKakashiPrivateHistory());
globalThis.ensureAutonomousKakashiPrivateHistory46900=reason=>ensureAutonomousKakashiPrivateHistory46900(reason);
globalThis.previewAutonomousKakashiPrivateOrigin46900=seedRef=>resolveAutonomousKakashiPrivateHistory46900({seedRefOverride:String(seedRef||"diagnostic_private_origin_seed"),persist:false,diagnosticPreview:true,migrationReason:"diagnostic_preview"});
globalThis.migrateLegacyKakashiPrivateOrigin46900=migrateLegacyKakashiPrivateOrigin46900;
globalThis.getMenmaPrivateHistoryDecisionSnapshot46900=()=>clone(menmaDecisionSnapshot46900());
globalThis.getMenmaNestedKakashiIntent46900=committedNestedKakashiIntent46900;
globalThis.getOriginParticipantContinuity46900=getContinuity;
globalThis.getKonohaCeHotspotEligibility46900=eligibility;
globalThis.getMenmaSecondTeammateRef46900=menmaSecondTeammateRef46900;
globalThis.getKonohaCeHotspotPlan46900=eventPlan;
globalThis.getKonohaCeHotspotTeammateReactions46900=()=>clone(committedTeammateReactions());
globalThis.getKonohaCeHotspotResolvedRecord46900=()=>clone(resolvedRecord());
globalThis.getKonohaCeHotspotBranchConsequence46900=choiceId=>branchConsequence(choiceId);
globalThis.runPhase2CeHotspot46900Diagnostics=diagnostics;
globalThis.SC_PHASE2_CE_HOTSPOT_46900=Object.freeze({
  patchId:PATCH_ID,eventId:EVENT_ID,opportunityId:OPPORTUNITY_ID,occurrenceId:OCCURRENCE_ID,sceneId:SCENE_ID,menmaSceneId:MENMA_SCENE_ID,hostId:HOST_ID,stableParticipantId:MI_ID,privateOriginSchema:PRIVATE_ORIGIN_SCHEMA,browserGoldenClaimed:false
});
})();
