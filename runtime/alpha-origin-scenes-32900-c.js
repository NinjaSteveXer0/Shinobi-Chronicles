// ALPHA ORIGIN 32900-C — Academy Obito #331 runtime + owner-preview compression successor.
// Issue #331 / CE timing authority 2026-09-23.
// Academy Kakashi remains intentionally absent here; Kakashi V2 owns its own clean-room line.
(function installAlphaOrigin32900C(){
"use strict";
const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)throw new Error("alpha_origin_32900_core_required");
const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);
const ORIGIN_ID="academy_obito";
const SCENE_ID=A.sceneByVariant.academy_obito;
const TIMING_AUTHORITY="Academy_Obito_Final_Journey_Timing_and_Runtime_Replacement_Reconciliation_2026-09-23";
const FINAL_STORY_AUTHORITY="Academy_Obito_Origin_Compression_Rewrite_2026-09-29";
const PERFORMANCE={
  "obi_depart": [
    {
      "cueId": "obi_depart_compact_01",
      "kind": "narration",
      "text": "Obito is already running when the Academy bell starts carrying across Konoha. He pulls his goggles into place, cuts around a cart and nearly clips a wall. The Hokage Monument appears between the rooftops.\nOBITO: “I'm still making it.”"
    },
    {
      "cueId": "obi_depart_compact_02",
      "kind": "narration",
      "text": "He points at the Monument without slowing.\nOBITO: “And one day I'm getting up there too.”\nA shopkeeper looks up. Obito realises he said it aloud. He runs faster."
    }
  ],
  "obi_furniture_intro": [
    {
      "cueId": "obi_furniture_compact_intro_01",
      "kind": "narration",
      "text": "A wardrobe is jammed sideways through a doorway. A woman is trying to keep it from tipping into the lane. Obito stops short.\nCIVILIAN: “Training?”\nObito looks toward the Academy. Then at the wardrobe."
    }
  ],
  "obi_furniture_help": [
    {
      "cueId": "obi_furniture_compact_help_01",
      "kind": "narration",
      "text": "Obito drops his bag and grabs the lower edge.\nOBITO: “Lift, then turn it.”\nCIVILIAN: “I have been trying that.”\nOBITO: “Not like this.”\nThey shift together. The wardrobe clears the frame."
    },
    {
      "cueId": "obi_furniture_compact_help_02",
      "kind": "narration",
      "text": "The woman steadies it.\nCIVILIAN: “You were right.”\nObito grabs his bag.\nOBITO: “I know.”\nThe distant bell rings again. His face changes.\nOBITO: “I have to go.”\nHe runs."
    }
  ],
  "obi_furniture_continue": [
    {
      "cueId": "obi_furniture_compact_continue_01",
      "kind": "narration",
      "text": "The woman has the wardrobe under control. Obito forces himself to keep moving. He looks back once. She is already trying another angle.\nOBITO: “She's got it.”\nHe turns forward and runs."
    }
  ],
  "obi_vegetables_intro": [
    {
      "cueId": "obi_vegetables_compact_intro_01",
      "kind": "narration",
      "text": "A tomato rolls into Obito's path. He catches it by reflex. A vendor is kneeling beside a split basket while vegetables scatter across the street.\nVENDOR: “Nice catch.”\nObito looks at the tomato. Then at the Academy road."
    }
  ],
  "obi_vegetables_help": [
    {
      "cueId": "obi_vegetables_compact_help_01",
      "kind": "narration",
      "text": "Obito darts after the nearest vegetables while the vendor fixes the basket. He crawls under a bench for the last daikon and comes back dusty.\nVENDOR: “Training?”\nOBITO: “Already late.”"
    },
    {
      "cueId": "obi_vegetables_compact_help_02",
      "kind": "narration",
      "text": "They get the basket upright.\nVENDOR: “Then run.”\nObito does. The vendor calls after him.\nVENDOR: “Other way!”\nObito skids, changes direction and keeps going."
    }
  ],
  "obi_vegetables_continue": [
    {
      "cueId": "obi_vegetables_compact_continue_01",
      "kind": "narration",
      "text": "Obito sets the tomato on the stall. Another passer-by is already bending to help.\nOBITO: “Sorry!”\nVENDOR: “Go!”\nHe goes."
    }
  ],
  "obi_equipment_intro": [
    {
      "cueId": "obi_equipment_compact_intro_01",
      "kind": "narration",
      "text": "Near the Academy approach, the equipment custodian is standing beside two bundles. There should be three.\nCUSTODIAN: “Obito.”\nObito groans without stopping.\nOBITO: “You lost one?”\nThe custodian holds up an empty strap."
    }
  ],
  "obi_equipment_help": [
    {
      "cueId": "obi_equipment_compact_help_01",
      "kind": "narration",
      "text": "Obito checks the route instead of the whole street. Low wall. Drainage turn. Loading platform. Academy cloth is sticking out beneath the platform.\nOBITO: “Found it.”"
    },
    {
      "cueId": "obi_equipment_compact_help_02",
      "kind": "narration",
      "text": "The custodian takes the bundle.\nCUSTODIAN: “Good eye.”\nObito remembers the time.\nOBITO: “You owe me.”\nHe runs before the custodian can answer."
    }
  ],
  "obi_equipment_continue": [
    {
      "cueId": "obi_equipment_compact_continue_01",
      "kind": "narration",
      "text": "Obito points toward the drainage turn.\nOBITO: “Check there. If it fell, that's where it would've slid.”\nThe custodian looks that way. Obito keeps running."
    }
  ],
  "obi_delivery_intro": [
    {
      "cueId": "obi_delivery_compact_intro_01",
      "kind": "narration",
      "text": "A delivery cart is stuck sideways across half the road. The worker is holding a stack of crates with one arm while trying to free a wheel. There is just enough room for Obito to pass.\nDELIVERY WORKER: “Left side's clear.”\nObito looks at the shaking stack."
    }
  ],
  "obi_delivery_help": [
    {
      "cueId": "obi_delivery_compact_help_01",
      "kind": "narration",
      "text": "Obito drops his bag. Together they lift the wheel. The cart tilts. A crate slips. Obito catches it against his chest.\nOBITO: “Okay. That was close.”"
    },
    {
      "cueId": "obi_delivery_compact_help_02",
      "kind": "narration",
      "text": "They force the cart level. The worker points toward the Academy.\nDELIVERY WORKER: “Go.”\nObito grabs his bag.\nOBITO: “Everybody says that after I stop.”\nThen he runs."
    }
  ],
  "obi_delivery_continue": [
    {
      "cueId": "obi_delivery_compact_continue_01",
      "kind": "narration",
      "text": "Obito takes the open gap. As he passes, he points at the wheel.\nOBITO: “Lever it from the inside.”\nThe worker adjusts. The wheel shifts free. Obito keeps moving."
    }
  ],
  "obi_cart_intro": [
    {
      "cueId": "obi_cart_compact_intro_01",
      "kind": "narration",
      "text": "The Academy wall is finally in sight. Then someone screams. A handcart is rolling downhill toward the crowded side of the street. Adults are already moving toward it, but the cart hits a rut and changes direction. The Academy bell rings again. Obito looks at the gate. Then the cart."
    }
  ],
  "obi_cart_help": [
    {
      "cueId": "obi_cart_compact_help_01",
      "kind": "narration",
      "text": "Obito throws down his bag and runs beside the cart. He grabs the rail instead of stepping in front of it. An adult catches the other side. Together they force the front wheel into the curb. The cart stops."
    },
    {
      "cueId": "obi_cart_compact_help_02",
      "kind": "narration",
      "text": "The adult checks Obito's scraped palm.\nCIVILIAN: “You all right?”\nOBITO: “Yeah.”\nThe bell rings. Obito's eyes widen.\nOBITO: “Training.”\nThe adults have the cart now. He runs."
    }
  ],
  "obi_cart_continue": [
    {
      "cueId": "obi_cart_compact_continue_01",
      "kind": "narration",
      "text": "Three adults are already on it. One clears the lane. Two reach the cart. Obito makes himself turn toward the Academy.\nOBITO: “They've got it.”\nHe runs through the gate."
    }
  ],
  "arrival_FULL": [
    {
      "cueId": "obi_arrival_full_01",
      "kind": "narration",
      "text": "Students are still lining up when Obito reaches the yard. The instructor looks at him.\nINSTRUCTOR: “Cutting it close.”\nOBITO: “Still here.”\nThe whistle sounds. Obito joins the line."
    }
  ],
  "arrival_SUBSTANTIAL": [
    {
      "cueId": "obi_arrival_substantial_01",
      "kind": "narration",
      "text": "The conditioning group is already finishing.\nINSTRUCTOR: “You missed the first block.”\nObito bends over, catching his breath.\nOBITO: “I did plenty of running.”\nThe instructor points toward the weapon rack.\nINSTRUCTOR: “Not the assigned kind.”\nObito straightens and joins the next drill."
    }
  ],
  "arrival_REDUCED": [
    {
      "cueId": "obi_arrival_reduced_01",
      "kind": "narration",
      "text": "The weapon rack is being put away when Obito arrives. He looks at it. Then at the instructor.\nOBITO: “What's left?”\nINSTRUCTOR: “Ninjutsu. Then Taijutsu.”\nObito drops his bag.\nOBITO: “Good.”"
    }
  ],
  "arrival_MINIMAL": [
    {
      "cueId": "obi_arrival_minimal_01",
      "kind": "narration",
      "text": "Obito reaches the yard as the Ninjutsu markers are coming down. Only Taijutsu remains. The instructor looks at him. Obito sees everything he missed.\nOBITO: “Put me in.”\nThe instructor points toward the pairs. Obito goes."
    }
  ],
  "training_intro": [],
  "training_stamina": [
    {
      "cueId": "obi_training_stamina_compact",
      "kind": "narration",
      "text": "Obito attacks the first lap too hard and pays for it by the third. The instructor passes him.\nINSTRUCTOR: “You don't win conditioning on the first lap.”\nObito adjusts his pace without admitting the point."
    }
  ],
  "training_bukijutsu": [
    {
      "cueId": "obi_training_buki_compact",
      "kind": "narration",
      "text": "Obito's first throw hits badly. His second is cleaner. By the third, he has stopped trying to overpower the target.\nOBITO: “Again.”\nThis time the throw lands where he wanted it."
    }
  ],
  "training_ninjutsu": [
    {
      "cueId": "obi_training_nin_compact",
      "kind": "narration",
      "text": "Obito's first flame bursts too hard and dies. He tries again with less force. The second flame holds. Not long. Long enough to make him grin."
    }
  ],
  "training_taijutsu": [
    {
      "cueId": "obi_training_tai_compact",
      "kind": "narration",
      "text": "Obito gets thrown on the first exchange. He gets up. The second lasts longer. By the final whistle, his partner has started adjusting to him too. Obito is exhausted. He is smiling anyway."
    }
  ],
  "obi_end_day": [
    {
      "cueId": "obi_end_day_compact_01",
      "kind": "narration",
      "text": "The yard empties. The instructor passes while Obito reties one sandal.\nINSTRUCTOR: “Tomorrow?”\nObito knows what that means.\nOBITO: “Earlier.”\nThe instructor raises an eyebrow.\nOBITO: “I said earlier.”"
    },
    {
      "cueId": "obi_end_day_compact_02",
      "kind": "narration",
      "text": "On the road home, Obito passes some of the places from that morning. Which ones mean something depends on where he stopped. The village kept moving either way. Obito looks toward the Hokage Monument. Then heads home."
    }
  ],
  "home_common": [
    {
      "cueId": "obi_home_compact_01",
      "kind": "narration",
      "text": "Obito drops his bag beside the wall and turns his goggles over in his hands. Through the window, the Hokage Monument catches the last light. He thinks about the training he reached. And the moments on the road where he stopped — or did not."
    },
    {
      "cueId": "obi_home_compact_02",
      "kind": "narration",
      "text": "Tomorrow has the same village in it. The same Academy. Probably the same problems. Obito looks at the Monument. He has to decide what he does with that."
    }
  ],
  "home_all_help": [],
  "home_no_help": [],
  "home_mixed": [],
  "ending_helping": [
    {
      "cueId": "obi_ending_helping_compact_01",
      "kind": "narration",
      "text": "OBITO: “I'm not going to stop helping people.”\nHe looks toward the window. That does not solve the part where training starts at the same time tomorrow."
    },
    {
      "cueId": "obi_ending_helping_compact_02",
      "kind": "narration",
      "text": "Obito puts his goggles back on.\nOBITO: “Then I leave earlier.”\nOBITO: “A lot earlier.”"
    }
  ],
  "ending_training": [
    {
      "cueId": "obi_ending_training_compact_01",
      "kind": "narration",
      "text": "OBITO: “If I'm serious about becoming Hokage, I have to show up for training.”\nHe does not like how obvious that sounds. It is still true."
    },
    {
      "cueId": "obi_ending_training_compact_02",
      "kind": "narration",
      "text": "Obito looks out over the village. Helping somebody does not automatically mean every problem has to become his. Tomorrow, he intends to make the gate before anyone can comment."
    }
  ],
  "ending_balance": [
    {
      "cueId": "obi_ending_balance_compact_01",
      "kind": "narration",
      "text": "Obito counts on his fingers. Leave earlier. Stop when somebody actually needs him. Keep moving when somebody else already has it. He runs out of fingers faster than expected."
    },
    {
      "cueId": "obi_ending_balance_compact_02",
      "kind": "narration",
      "text": "OBITO: “Fine.”\nHe looks toward the Monument.\nOBITO: “I'll get better at both.”\nThat sounds difficult. Obito smiles anyway."
    }
  ],
  "ending_question": [
    {
      "cueId": "obi_ending_question_compact_01",
      "kind": "narration",
      "text": "Obito looks at the Hokage Monument. Usually he knows exactly what he wants to say. Tonight he asks something instead.\nOBITO: “Why do I want it?”"
    },
    {
      "cueId": "obi_ending_question_compact_02",
      "kind": "narration",
      "text": "Training. Being noticed. Helping people. Wanting the village to know his name. None of those answers disappear. Obito puts his goggles back on.\nOBITO: “I'll figure it out.”"
    }
  ],
  "obi_close": [
    {
      "cueId": "obi_close_compact",
      "kind": "narration",
      "text": "Obito opens the window. Konoha is still loud outside. He smiles.\nOBITO: “Tomorrow.”"
    }
  ]
};

const ENV=Object.freeze({
  mainStreet:Object.freeze({environmentId:"obito_origin_konoha_main_street_day"}),
  residential:Object.freeze({environmentId:"obito_origin_quiet_residential_lane_day"}),
  academyApproach:Object.freeze({environmentId:"obito_origin_academy_approach_day"}),
  streetLate:Object.freeze({environmentId:"obito_origin_konoha_street_late_afternoon"}),
  streetEvening:Object.freeze({environmentId:"obito_origin_konoha_street_early_evening"}),
  trainingDay:Object.freeze({environmentId:"obito_origin_training_day"}),
  trainingLate:Object.freeze({environmentId:"obito_origin_training_late_afternoon"}),
  trainingDusk:Object.freeze({environmentId:"obito_origin_training_dusk"}),
  home:Object.freeze({environmentId:"obito_origin_home"})
});
const BACKDROPS=Object.freeze({
  obito_origin_konoha_main_street_day:"Obito Origin Backdrop/konoha_main_street.png",
  obito_origin_quiet_residential_lane_day:"Obito Origin Backdrop/quiet_residential_lane.png",
  obito_origin_academy_approach_day:"Obito Origin Backdrop/academy_approach_sloped_lane.png",
  obito_origin_konoha_street_late_afternoon:"Obito Origin Backdrop/konoha_street_late_afternoon.png",
  obito_origin_konoha_street_early_evening:"Obito Origin Backdrop/konoha_street_early_evening.png",
  obito_origin_training_day:"Obito Origin Backdrop/training_grounds_day.png",
  obito_origin_training_late_afternoon:"Obito Origin Backdrop/training_grounds_late_afternoon.png",
  obito_origin_training_dusk:"Obito Origin Backdrop/training_grounds_dusk.png",
  obito_origin_home:"Obito Origin Backdrop/obito_home_interior.png"
});
const diversions=Object.freeze([
  Object.freeze({key:"furniture",occurrenceId:"occ_origin_obito_furniture_assistance_resolution",diversionType:"furniture_assistance",beneficiaryRef:"obito_origin_furniture_civilian",delay:7,oldHelp:"furniture_carry_full",oldContinue:"furniture_continue",oldAmbiguous:["furniture_stabilize"]}),
  Object.freeze({key:"vegetables",occurrenceId:"occ_origin_obito_scattered_vegetables_resolution",diversionType:"scattered_vegetables",beneficiaryRef:"obito_origin_vegetable_vendor",delay:5,oldHelp:"vegetables_collect_all",oldContinue:"vegetables_continue",oldAmbiguous:["vegetables_clear_lane"]}),
  Object.freeze({key:"equipment",occurrenceId:"occ_origin_obito_lost_academy_equipment_resolution",diversionType:"lost_academy_equipment",beneficiaryRef:"obito_origin_academy_equipment_custodian",delay:8,oldHelp:"equipment_search_full",oldContinue:"equipment_continue",oldAmbiguous:["equipment_check_likely_route"]}),
  Object.freeze({key:"delivery",occurrenceId:"occ_origin_obito_overturned_delivery_resolution",diversionType:"overturned_delivery",beneficiaryRef:"obito_origin_delivery_worker",delay:9,oldHelp:"delivery_right_and_reload",oldContinue:"delivery_continue",oldAmbiguous:["delivery_clear_passage"]}),
  Object.freeze({key:"cart",occurrenceId:"occ_origin_obito_runaway_cart_resolution",diversionType:"runaway_cart",beneficiaryRef:"obito_origin_runaway_cart_civilian",delay:6,oldHelp:"cart_intercept",oldContinue:"cart_continue",oldAmbiguous:["cart_warn_and_redirect"]})
]);
const entitlementOccurrenceId="occ_origin_obito_formal_training_entitlement_resolution";
const entitlementRows=Object.freeze({FULL:"OBI-02",SUBSTANTIAL:"OBI-03",REDUCED:"OBI-04",MINIMAL:"OBI-05"});
const eligibleBlocks=Object.freeze({
  FULL:Object.freeze(["stamina","bukijutsu","ninjutsu","taijutsu"]),
  SUBSTANTIAL:Object.freeze(["bukijutsu","ninjutsu","taijutsu"]),
  REDUCED:Object.freeze(["ninjutsu","taijutsu"]),
  MINIMAL:Object.freeze(["taijutsu"])
});
const interpretationText=Object.freeze({
  KEEP_HELPING:"I'm not going to stop helping people.",
  TAKE_TRAINING_SERIOUSLY:"I need to take training more seriously.",
  FIND_BALANCE:"I need to get better at both.",
  QUESTION_FRAME:"Maybe I'm looking at this wrong."
});
const LEGACY_IDS=Object.freeze([
  "furniture_carry_full","furniture_stabilize","furniture_continue",
  "vegetables_collect_all","vegetables_clear_lane","vegetables_continue",
  "equipment_search_full","equipment_check_likely_route","equipment_continue",
  "delivery_right_and_reload","delivery_clear_passage","delivery_continue",
  "cart_intercept","cart_warn_and_redirect","cart_continue",
  "accept_full_training","timing_pending","hokage_still","faster_next","people_mattered","prove_it"
]);

function clone(v){return A.clone(v);}
function local(){return A.local();}
function cueFallback(key){return (PERFORMANCE[key]||[]).map(c=>(c.kind==="dialogue"&&c.speakerName?c.speakerName+": ":"")+c.text).join("\n\n");}
function intentKey(spec){return "obito_"+spec.key+"Intent";}
function exactIntentFromLegacy(spec,value){
  if(value==="HELP"||value==="CONTINUE")return value;
  if(value===spec.oldHelp)return "HELP";
  if(value===spec.oldContinue)return "CONTINUE";
  if(spec.oldAmbiguous.includes(value))return "AMBIGUOUS";
  return null;
}
function selectedAcquisition(){
  try{return typeof ensurePlayerAcquisitionState==="function"?ensurePlayerAcquisitionState():playerData&&playerData.acquisition||null;}catch(_error){return null;}
}
function relevantHistory(){
  if(!playerData||!Array.isArray(playerData.activityHistory))return[];
  const ids=new Set([...diversions.map(d=>d.occurrenceId),entitlementOccurrenceId]);
  return playerData.activityHistory.filter(row=>row&&ids.has(row.sourceOccurrenceId||row.occurrenceId));
}
function restartAmbiguousLegacyProgress(reason){
  if(playerData&&Array.isArray(playerData.activityHistory)){
    const ids=new Set([...diversions.map(d=>d.occurrenceId),entitlementOccurrenceId]);
    playerData.activityHistory=playerData.activityHistory.filter(row=>!row||!ids.has(row.sourceOccurrenceId||row.occurrenceId));
    try{activityHistory=playerData.activityHistory;}catch(_error){}
  }
  const rt=A.active();
  if(rt&&rt.sceneId===SCENE_ID){
    rt.beatId="obi_depart";
    rt.localContext={obitoFinalMigration:{action:"restart",reason:String(reason||"ambiguous_pre_final_choice"),authority:TIMING_AUTHORITY}};
    for(const key of ["processed","processedConsequences","processedRequests","resolvedConsequences"])if(rt[key]&&typeof rt[key].clear==="function")rt[key].clear();
  }
  try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
  return{success:true,restarted:true,reason};
}
function migrateLegacyObitoState(){
  const acq=selectedAcquisition(),rt=A.active();
  if((!acq||acq.chronicleOriginVariantId!==ORIGIN_ID)&&(!rt||rt.sceneId!==SCENE_ID))return{success:true,skipped:true};
  let ambiguous=null,migrated=0;
  for(const spec of diversions){
    const record=A.findOccurrence(spec.occurrenceId);
    if(record){
      const fact=record.fact&&typeof record.fact==="object"?record.fact:{};
      let intent=fact.selectedIntent;
      if(intent!=="HELP"&&intent!=="CONTINUE")intent=exactIntentFromLegacy(spec,fact.selectedResponse);
      if(intent==="AMBIGUOUS"||!intent){ambiguous=spec.key;break;}
      const finalFact={
        sourceOccurrenceId:spec.occurrenceId,
        selectedIntent:intent,
        journeyDelayMinutes:intent==="HELP"?spec.delay:0,
        obitoCausalContributionEstablished:intent==="HELP",
        obitoContribution:intent==="HELP"?"material":null,
        beneficiaryRefs:[spec.beneficiaryRef],
        worldOutcome:intent==="HELP"?"resolved_with_obito_material_contribution":"left_to_authored_world_lifecycle",
        committed:true,
        timingAuthorityVersion:TIMING_AUTHORITY
      };
      if(fact.selectedIntent!==intent||Number(fact.journeyDelayMinutes)!==finalFact.journeyDelayMinutes){
        finalFact.migratedFromObitoPreFinalChoiceId=fact.selectedResponse||null;
        record.fact=clone(finalFact);record.data=clone(finalFact);migrated++;
      }
    }
    if(rt&&rt.sceneId===SCENE_ID){
      const ctx=rt.localContext||(rt.localContext={});
      const current=ctx[intentKey(spec)]||ctx["obito_"+spec.key];
      if(current){
        const mapped=exactIntentFromLegacy(spec,current);
        if(mapped==="AMBIGUOUS"){ambiguous=spec.key;break;}
        if(mapped==="HELP"||mapped==="CONTINUE"){ctx[intentKey(spec)]=mapped;delete ctx["obito_"+spec.key];migrated++;}
      }
    }
  }
  if(ambiguous)return restartAmbiguousLegacyProgress("ambiguous_pre_final_"+ambiguous);
  if(rt&&rt.sceneId===SCENE_ID){
    const map={
      obi_furniture:"obi_furniture_choice",obi_vegetables:"obi_vegetables_choice",obi_equipment:"obi_equipment_choice",
      obi_delivery:"obi_delivery_choice",obi_cart:"obi_cart_choice",obi_entitlement:"obi_arrival",obi_training:"obi_arrival"
    };
    if(["obi_reflect","obi_reflection_result","obi_end"].includes(rt.beatId))return restartAmbiguousLegacyProgress("superseded_pre_final_reflection");
    if(map[rt.beatId]){rt.beatId=map[rt.beatId];migrated++;}
    let contiguous=0;
    for(const spec of diversions){if(A.findOccurrence(spec.occurrenceId))contiguous++;else break;}
    const resume=["obi_furniture_intro","obi_vegetables_intro","obi_equipment_intro","obi_delivery_intro","obi_cart_intro","obi_arrival"][contiguous];
    const legacyOrEntry=new Set(["obi_depart","obi_furniture_choice","obi_vegetables_choice","obi_equipment_choice","obi_delivery_choice","obi_cart_choice"]);
    if(contiguous>0&&resume&&legacyOrEntry.has(rt.beatId)){rt.beatId=resume;migrated++;}
  }
  if(migrated)try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
  return{success:true,migrated,restarted:false};
}
function diversionFact(spec,intent){
  return{
    sourceOccurrenceId:spec.occurrenceId,
    selectedIntent:intent,
    journeyDelayMinutes:intent==="HELP"?spec.delay:0,
    obitoCausalContributionEstablished:intent==="HELP",
    obitoContribution:intent==="HELP"?"material":null,
    beneficiaryRefs:[spec.beneficiaryRef],
    worldOutcome:intent==="HELP"?"resolved_with_obito_material_contribution":"left_to_authored_world_lifecycle",
    committed:true,
    timingAuthorityVersion:TIMING_AUTHORITY
  };
}
function diversionRequest(spec){
  return{requestId:"obito_final_"+spec.key+"_331",kind:"domain",resolve:()=>{
    const ctx=local(),intent=ctx[intentKey(spec)];
    if(intent!=="HELP"&&intent!=="CONTINUE")return{success:false,reason:"obito_final_intent_missing",key:spec.key};
    const existing=A.findOccurrence(spec.occurrenceId);
    if(existing&&existing.fact&&existing.fact.selectedIntent&&existing.fact.selectedIntent!==intent)return{success:false,reason:"obito_final_committed_intent_mismatch",key:spec.key,committed:existing.fact.selectedIntent,requested:intent};
    return A.commitOccurrence(ORIGIN_ID,spec.occurrenceId,diversionFact(spec,intent),intent==="HELP"?["OBI-01"]:[],{participantRefs:[spec.beneficiaryRef]});
  }};
}
function committedJourneyFacts(){
  const rows=[];
  for(const spec of diversions){
    const record=A.findOccurrence(spec.occurrenceId);
    const fact=record&&record.fact||null;
    if(!fact||!["HELP","CONTINUE"].includes(fact.selectedIntent))return{success:false,reason:"obito_final_diversion_fact_missing",key:spec.key};
    const expected=fact.selectedIntent==="HELP"?spec.delay:0;
    if(Number(fact.journeyDelayMinutes)!==expected)return{success:false,reason:"obito_final_delay_fact_invalid",key:spec.key,expected,actual:fact.journeyDelayMinutes};
    rows.push({key:spec.key,occurrenceId:spec.occurrenceId,selectedIntent:fact.selectedIntent,journeyDelayMinutes:expected});
  }
  const arrivalDelayMinutes=rows.reduce((sum,row)=>sum+row.journeyDelayMinutes,0);
  return{success:true,rows,arrivalDelayMinutes};
}
function entitlementForDelay(delay){
  const n=Number(delay);
  if(n>=0&&n<=5)return"FULL";
  if(n<=14)return"SUBSTANTIAL";
  if(n<=24)return"REDUCED";
  if(n<=35)return"MINIMAL";
  return"NONE";
}
function entitlementFact(){
  const journey=committedJourneyFacts();if(!journey.success)throw new Error(journey.reason+":"+journey.key);
  const formalTrainingEntitlement=entitlementForDelay(journey.arrivalDelayMinutes);
  return{
    sourceOccurrenceId:entitlementOccurrenceId,
    arrivalDelayMinutes:journey.arrivalDelayMinutes,
    timingAuthorityVersion:TIMING_AUTHORITY,
    formalTrainingEntitlement,
    eligibleTrainingBlocks:formalTrainingEntitlement==="NONE"?[]:[...eligibleBlocks[formalTrainingEntitlement]],
    sourceOccurrenceRefs:journey.rows.map(r=>r.occurrenceId),
    committed:true
  };
}
const entitlementRequest=R("obito_final_entitlement_331",ORIGIN_ID,entitlementOccurrenceId,()=>entitlementFact(),()=>{
  const fact=entitlementFact(),row=entitlementRows[fact.formalTrainingEntitlement];
  return row?[row]:[];
});
function currentEntitlement(){
  const record=A.findOccurrence(entitlementOccurrenceId),value=record&&record.fact&&record.fact.formalTrainingEntitlement;
  return ["FULL","SUBSTANTIAL","REDUCED","MINIMAL","NONE"].includes(value)?value:null;
}
function countHelpFromFacts(){
  const journey=committedJourneyFacts();if(!journey.success)return null;
  return journey.rows.filter(r=>r.selectedIntent==="HELP").length;
}
function historyStore(){if(!Array.isArray(playerData.activityHistory))playerData.activityHistory=[];return playerData.activityHistory;}
function commitInterpretationRequest(){
  return{requestId:"obito_final_interpretation_331",kind:"domain",resolve:()=>{
    const rt=A.active(),ctx=local(),id=ctx.obitoFinalInterpretation,text=interpretationText[id];
    if(!rt||rt.sceneId!==SCENE_ID||!text)return{success:false,reason:"obito_final_interpretation_missing"};
    const key="academy_obito_final_self_interpretation";
    const history=historyStore(),existing=history.find(row=>row&&row.historyKey===key&&row.actorVariantId===ORIGIN_ID);
    if(existing){
      if(existing.fact&&existing.fact.interpretationId===id)return{success:true,idempotent:true,historyKey:key};
      return{success:false,reason:"obito_final_interpretation_already_committed"};
    }
    const fact={interpretationId:id,interpretationText:text,selfInterpretationOnly:true,behaviourRewritten:false,committed:true,authority:FINAL_STORY_AUTHORITY};
    history.push({historyKey:key,type:"origin_self_interpretation",activity:"story_scene",completed:true,committed:true,actorVariantId:ORIGIN_ID,protagonistParticipantId:ORIGIN_ID,sceneId:SCENE_ID,storySceneInstanceId:rt.instanceId||null,fact:clone(fact),data:clone(fact),timestamp:Date.now()});
    try{activityHistory=playerData.activityHistory;}catch(_error){}
    try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}
    return{success:true,historyKey:key,fact:clone(fact)};
  }};
}

function storyBeat(beatId,key,nextBeatId,extra={}){
  return{beatId,mode:"narration",text:cueFallback(key),nextBeatId,...extra};
}
function choiceBeat(beatId,text,choices,environmentRef=ENV.mainStreet){
  return{beatId,mode:"choice",text,choices,environmentRef};
}
const [furniture,vegetables,equipment,delivery,cart]=diversions;
const interpretationRequest=commitInterpretationRequest();

const definition={
  sceneId:SCENE_ID,eventId:SCENE_ID,title:"ACADEMY OBITO",entryBeatId:"obi_depart",participants:[],beats:[
    storyBeat("obi_depart","obi_depart","obi_furniture_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[{requestId:"obito_final_migration_331",kind:"domain",resolve:migrateLegacyObitoState}]}),

    storyBeat("obi_furniture_intro","obi_furniture_intro","obi_furniture_choice",{environmentRef:ENV.residential}),
    choiceBeat("obi_furniture_choice","The wardrobe is still wedged in the doorway.",[
      C("furniture_help","HELP HER","obi_furniture_help",{[intentKey(furniture)]:"HELP"}),
      C("furniture_continue_final","KEEP GOING","obi_furniture_continue",{[intentKey(furniture)]:"CONTINUE"})
    ],ENV.residential),
    storyBeat("obi_furniture_help","obi_furniture_help","obi_vegetables_intro",{environmentRef:ENV.residential,onEnterConsequences:[diversionRequest(furniture)]}),
    storyBeat("obi_furniture_continue","obi_furniture_continue","obi_vegetables_intro",{environmentRef:ENV.residential,onEnterConsequences:[diversionRequest(furniture)]}),

    storyBeat("obi_vegetables_intro","obi_vegetables_intro","obi_vegetables_choice",{environmentRef:ENV.mainStreet}),
    choiceBeat("obi_vegetables_choice","The vendor is already reaching for another rolling vegetable.",[
      C("vegetables_help","HELP HER","obi_vegetables_help",{[intentKey(vegetables)]:"HELP"}),
      C("vegetables_continue_final","KEEP GOING","obi_vegetables_continue",{[intentKey(vegetables)]:"CONTINUE"})
    ],ENV.mainStreet),
    storyBeat("obi_vegetables_help","obi_vegetables_help","obi_equipment_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(vegetables)]}),
    storyBeat("obi_vegetables_continue","obi_vegetables_continue","obi_equipment_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(vegetables)]}),

    storyBeat("obi_equipment_intro","obi_equipment_intro","obi_equipment_choice",{environmentRef:ENV.academyApproach}),
    choiceBeat("obi_equipment_choice","The missing Academy bundle is somewhere along the route.",[
      C("equipment_help","HELP SEARCH","obi_equipment_help",{[intentKey(equipment)]:"HELP"}),
      C("equipment_continue_final","KEEP GOING","obi_equipment_continue",{[intentKey(equipment)]:"CONTINUE"})
    ],ENV.academyApproach),
    storyBeat("obi_equipment_help","obi_equipment_help","obi_delivery_intro",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(equipment)]}),
    storyBeat("obi_equipment_continue","obi_equipment_continue","obi_delivery_intro",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(equipment)]}),

    storyBeat("obi_delivery_intro","obi_delivery_intro","obi_delivery_choice",{environmentRef:ENV.mainStreet}),
    choiceBeat("obi_delivery_choice","Training is still happening without him.",[
      C("delivery_help","HELP WITH THE DELIVERY","obi_delivery_help",{[intentKey(delivery)]:"HELP"}),
      C("delivery_continue_final","KEEP MOVING","obi_delivery_continue",{[intentKey(delivery)]:"CONTINUE"})
    ],ENV.mainStreet),
    storyBeat("obi_delivery_help","obi_delivery_help","obi_cart_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(delivery)]}),
    storyBeat("obi_delivery_continue","obi_delivery_continue","obi_cart_intro",{environmentRef:ENV.mainStreet,onEnterConsequences:[diversionRequest(delivery)]}),

    storyBeat("obi_cart_intro","obi_cart_intro","obi_cart_choice",{environmentRef:ENV.academyApproach}),
    choiceBeat("obi_cart_choice","His training is right there. The cart is already moving.",[
      C("cart_help","STOP AND HELP","obi_cart_help",{[intentKey(cart)]:"HELP"}),
      C("cart_continue_final","GO TO TRAINING","obi_cart_continue",{[intentKey(cart)]:"CONTINUE"})
    ],ENV.academyApproach),
    storyBeat("obi_cart_help","obi_cart_help","obi_arrival",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(cart)]}),
    storyBeat("obi_cart_continue","obi_cart_continue","obi_arrival",{environmentRef:ENV.academyApproach,onEnterConsequences:[diversionRequest(cart)]}),

    {beatId:"obi_arrival",mode:"narration",text:"",environmentRef:ENV.trainingDay,onEnterConsequences:[entitlementRequest],nextBeatId:"obi_training"},
    {beatId:"obi_training",mode:"narration",text:"",environmentRef:ENV.trainingDay,nextBeatId:"obi_end_day"},
    storyBeat("obi_end_day","obi_end_day","obi_home",{environmentRef:ENV.trainingLate}),
    {beatId:"obi_home",mode:"narration",text:"",environmentRef:ENV.home,nextBeatId:"obi_reflect"},
    {beatId:"obi_reflect",mode:"choice",text:"",environmentRef:ENV.home,choices:[
      C("reflection_keep_helping",interpretationText.KEEP_HELPING,"obi_ending_helping",{obitoFinalInterpretation:"KEEP_HELPING"}),
      C("reflection_take_training_seriously",interpretationText.TAKE_TRAINING_SERIOUSLY,"obi_ending_training",{obitoFinalInterpretation:"TAKE_TRAINING_SERIOUSLY"}),
      C("reflection_find_balance",interpretationText.FIND_BALANCE,"obi_ending_balance",{obitoFinalInterpretation:"FIND_BALANCE"}),
      C("reflection_question_frame",interpretationText.QUESTION_FRAME,"obi_ending_question",{obitoFinalInterpretation:"QUESTION_FRAME"})
    ]},
    storyBeat("obi_ending_helping","ending_helping","obi_close",{environmentRef:ENV.home,onEnterConsequences:[interpretationRequest]}),
    storyBeat("obi_ending_training","ending_training","obi_close",{environmentRef:ENV.home,onEnterConsequences:[interpretationRequest]}),
    storyBeat("obi_ending_balance","ending_balance","obi_close",{environmentRef:ENV.home,onEnterConsequences:[interpretationRequest]}),
    storyBeat("obi_ending_question","ending_question","obi_close",{environmentRef:ENV.home,onEnterConsequences:[interpretationRequest]}),
    {beatId:"obi_close",mode:"narration",text:cueFallback("obi_close"),environmentRef:ENV.home,exitScene:true}
  ],
  onCompleteConsequences:[X(ORIGIN_ID,[...diversions.map(x=>x.occurrenceId),entitlementOccurrenceId])]
};
A.register(definition);

function trainingSequence(){
  const entitlement=currentEntitlement();
  const out=[...PERFORMANCE.training_intro];
  if(entitlement==="FULL")out.push(...PERFORMANCE.training_stamina);
  if(entitlement==="FULL"||entitlement==="SUBSTANTIAL")out.push(...PERFORMANCE.training_bukijutsu);
  if(entitlement==="FULL"||entitlement==="SUBSTANTIAL"||entitlement==="REDUCED")out.push(...PERFORMANCE.training_ninjutsu);
  if(["FULL","SUBSTANTIAL","REDUCED","MINIMAL"].includes(entitlement))out.push(...PERFORMANCE.training_taijutsu);
  return out;
}
function arrivalSequence(){
  const entitlement=currentEntitlement();
  return clone(PERFORMANCE["arrival_"+entitlement]||[{kind:"narration",text:"No formal training remains available when Obito arrives."}]);
}
function obitoJourneyTailSequence(){
  const count=countHelpFromFacts();
  return count===5?PERFORMANCE.home_all_help:count===0?PERFORMANCE.home_no_help:PERFORMANCE.home_mixed;
}
function endDaySequence(){
  return[...PERFORMANCE.obi_end_day];
}
function homeSequence(){
  return[...PERFORMANCE.home_common];
}
function obitoPerformanceIndex331(performance){
  return performance&&Number.isInteger(performance.sourceIndex)
    ?performance.sourceIndex
    :performance&&Number.isInteger(performance.index)?performance.index:0;
}
function boardActors(beatId,performance){
  const actors=[{id:"academy_obito",image:"Assets/Academy Student/academy_obito.png",label:"OBITO",focus:true}];
  if(beatId.includes("furniture"))actors.push({id:"obito_origin_furniture_civilian",label:"CIVILIAN",image:"NPC/furniture_civilian.png"});
  else if(beatId.includes("vegetables"))actors.push({id:"obito_origin_vegetable_vendor",label:"VENDOR",image:"NPC/vegetable_vendor.png"});
  else if(beatId.includes("equipment"))actors.push({id:"obito_origin_academy_equipment_custodian",label:"CUSTODIAN",image:"NPC/equipment_custodian.png"});
  else if(beatId.includes("delivery"))actors.push({id:"obito_origin_delivery_worker",label:"DELIVERY WORKER",image:"NPC/delivery_worker.png"});
  else if(beatId.includes("cart"))actors.push({id:"obito_origin_runaway_cart_civilian",label:"CIVILIAN",image:"NPC/runaway_cart_civillian.png"});
  else if(beatId==="obi_arrival"||beatId==="obi_training"||(beatId==="obi_end_day"&&obitoPerformanceIndex331(performance)<1))actors.push({id:"obito_origin_academy_instructor",label:"ACADEMY INSTRUCTOR",image:"NPC/obito_instructor.png"});
  return actors;
}
function boardLocation(beatId,performance){
  if(beatId==="obi_arrival"||beatId==="obi_training")return"ACADEMY TRAINING GROUND";
  if(beatId==="obi_end_day")return obitoPerformanceIndex331(performance)<1?"ACADEMY TRAINING GROUND":"KONOHA · LATE AFTERNOON";
  if(beatId==="obi_home"||beatId==="obi_reflect"||beatId.startsWith("obi_ending_"))return"OBITO'S HOME";
  if(beatId==="obi_close")return"OBITO'S HOME";
  return"KONOHA · MORNING";
}
function boardBackdropEnvironment331(beatId,performance){
  const id=String(beatId||"");
  if(id==="obi_end_day"){
    const cueIndex=obitoPerformanceIndex331(performance);
    return cueIndex>=1?ENV.streetLate.environmentId:ENV.trainingLate.environmentId;
  }
  if(id==="obi_arrival"||id==="obi_training")return ENV.trainingDay.environmentId;
  if(id==="obi_home"||id==="obi_reflect"||id==="obi_close"||id.startsWith("obi_ending_"))return ENV.home.environmentId;
  if(id.includes("furniture"))return ENV.residential.environmentId;
  if(id.includes("equipment")||id.includes("cart"))return ENV.academyApproach.environmentId;
  if(id==="obi_depart"||id.includes("vegetables")||id.includes("delivery"))return ENV.mainStreet.environmentId;
  return null;
}
function registerFinalSceneBoard(){
  if(typeof globalThis.registerStorySceneBoardDefinition!=="function")return{success:false,reason:"story_scene_board_not_loaded"};
  const sequences={...PERFORMANCE,obi_arrival:arrivalSequence,obi_training:trainingSequence,obi_end_day:endDaySequence,obi_home:homeSequence};
  const result=globalThis.registerStorySceneBoardDefinition(SCENE_ID,{
    resolve:({beatId,performance})=>({
      mode:"conversation",
      location:boardLocation(beatId,performance),
      objective:["obi_arrival","obi_training","obi_end_day","obi_home","obi_reflect","obi_close"].includes(beatId)||beatId.startsWith("obi_ending_")?null:"GET TO TRAINING",
      actors:boardActors(beatId,performance)
    }),
    performanceSequences:sequences,
    resolveBackdrop:({beatId,performance})=>{
      const environmentId=boardBackdropEnvironment331(beatId,performance);
      const assetPath=environmentId?BACKDROPS[environmentId]||null:null;
      return assetPath?{assetPath,environmentId}:null;
    }
  });
  try{if(result&&result.success===true&&typeof globalThis.renderStorySceneBoard33900==="function")globalThis.renderStorySceneBoard33900();}catch(_error){}
  return result;
}
globalThis.registerAcademyObitoFinalSceneBoard331=registerFinalSceneBoard;
if(globalThis.SC_STORY_SCENE_BOARD_33900){
  registerFinalSceneBoard();
}else{
  const queue=globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS||(globalThis.SC_STORY_SCENE_BOARD_PENDING_REGISTRATIONS=[]);
  if(!queue.some(row=>row&&row.id==="academy_obito_final_331"))queue.push({id:"academy_obito_final_331",register:registerFinalSceneBoard});
}

function diagnostics(){
  const live=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;
  const choices=live&&live.beats?live.beats.flatMap(b=>b.choices||[]):[];
  const choiceIds=choices.map(c=>c.choiceId);
  const labels=choices.map(c=>c.label);
  const checks={
    exactFiveBinaryChoiceFamilies:[
      {help:"furniture_help",proceed:"furniture_continue_final"},
      {help:"vegetables_help",proceed:"vegetables_continue_final"},
      {help:"equipment_help",proceed:"equipment_continue_final"},
      {help:"delivery_help",proceed:"delivery_continue_final"},
      {help:"cart_help",proceed:"cart_continue_final"}
    ].every(pair=>[pair.help,pair.proceed].every(id=>choiceIds.includes(id))),
    oldChoiceIdsRetired:LEGACY_IDS.every(id=>!choiceIds.includes(id)),
    noTimingPending:!choiceIds.includes("timing_pending"),
    finalReflectionExact:Object.values(interpretationText).every(label=>labels.includes(label)),
    timingNotHelpCount:entitlementForDelay(5)==="FULL"&&entitlementForDelay(7)==="SUBSTANTIAL"&&entitlementForDelay(15)==="REDUCED"&&entitlementForDelay(35)==="MINIMAL",
    exactDelayFacts:diversions.map(d=>d.delay).join(",")==="7,5,8,9,6",
    noBattle:!JSON.stringify(definition).includes('"battle"')&&!JSON.stringify(definition).includes("PL BATTLE"),
    noSharinganGrant:!JSON.stringify(definition).includes("sharinganUnlocked")&&!JSON.stringify(definition).includes("grantSharingan"),
    sharedCompletion:definition.onCompleteConsequences.length===1,
    dedicatedBackdropRegistry:Object.values(BACKDROPS).every(path=>path.startsWith("Obito Origin Backdrop/")),
    firstPageDedicatedBackdrop:BACKDROPS[ENV.mainStreet.environmentId]==="Obito Origin Backdrop/konoha_main_street.png",
    furnitureResidentialBackdrop:BACKDROPS[ENV.residential.environmentId]==="Obito Origin Backdrop/quiet_residential_lane.png",
    academyApproachBackdrop:BACKDROPS[ENV.academyApproach.environmentId]==="Obito Origin Backdrop/academy_approach_sloped_lane.png",
    homeDedicatedBackdrop:BACKDROPS[ENV.home.environmentId]==="Obito Origin Backdrop/obito_home_interior.png",
    endDayPresentationMovesYardToStreet:typeof boardBackdropEnvironment331==="function"&&boardBackdropEnvironment331("obi_end_day",{sourceIndex:0,index:0})===ENV.trainingLate.environmentId&&boardBackdropEnvironment331("obi_end_day",{sourceIndex:1,index:99})===ENV.streetLate.environmentId,
    paragraphPaginationCannotShiftBackdrop:boardBackdropEnvironment331("obi_end_day",{sourceIndex:0,index:99})===ENV.trainingLate.environmentId,
    directBackdropPathProjection:typeof registerFinalSceneBoard==="function"&&registerFinalSceneBoard.toString().includes("return assetPath?{assetPath,environmentId}:null"),
    stableBeatBackdropProjection:boardBackdropEnvironment331("obi_depart")===ENV.mainStreet.environmentId&&boardBackdropEnvironment331("obi_furniture_choice")===ENV.residential.environmentId&&boardBackdropEnvironment331("obi_equipment_choice")===ENV.academyApproach.environmentId&&boardBackdropEnvironment331("obi_arrival")===ENV.trainingDay.environmentId&&boardBackdropEnvironment331("obi_home")===ENV.home.environmentId,
    closeRemainsHome:definition.beatMap instanceof Map?definition.beatMap.get("obi_close")&&definition.beatMap.get("obi_close").environmentRef===ENV.home:definition.beats.some(b=>b.beatId==="obi_close"&&b.environmentRef===ENV.home),
    noGenericBackdropFallback:Object.values(BACKDROPS).every(path=>!path.startsWith("Scene backdrops/")),
    compressionCardinality:PERFORMANCE.obi_depart.length===2&&["furniture","vegetables","equipment","delivery","cart"].every(key=>PERFORMANCE["obi_"+key+"_intro"].length===1&&PERFORMANCE["obi_"+key+"_help"].length===2&&PERFORMANCE["obi_"+key+"_continue"].length===1)&&["FULL","SUBSTANTIAL","REDUCED","MINIMAL"].every(key=>PERFORMANCE["arrival_"+key].length===1)&&PERFORMANCE.training_intro.length===0&&["stamina","bukijutsu","ninjutsu","taijutsu"].every(key=>PERFORMANCE["training_"+key].length===1)&&PERFORMANCE.obi_end_day.length===2&&PERFORMANCE.home_common.length===2&&["ending_helping","ending_training","ending_balance","ending_question"].every(key=>PERFORMANCE[key].length===2)&&PERFORMANCE.obi_close.length===1,
    compactCuesCannotAutoPaginate:Object.values(PERFORMANCE).flat().every(row=>!row||row.kind!=="narration"||(String(row.text||"").length<=360&&!/\\n\\s*\\n+/.test(String(row.text||"")))),
    noGenericBeatPause:!JSON.stringify(PERFORMANCE).includes("A beat."),
    chronicleBeginsNotPreReceipt:!JSON.stringify(PERFORMANCE).includes("YOUR CHRONICLE BEGINS"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,authority:TIMING_AUTHORITY,browserGoldenClaimed:false};
}
globalThis.getAcademyObitoFinalJourneyFacts331=committedJourneyFacts;
globalThis.getAcademyObitoFinalEntitlement331=currentEntitlement;
globalThis.runAcademyObitoFinal331Diagnostics=diagnostics;
globalThis.SC_ACADEMY_OBITO_FINAL_331=Object.freeze({authority:TIMING_AUTHORITY,storyAuthority:FINAL_STORY_AUTHORITY,sceneId:SCENE_ID,delays:Object.freeze(Object.fromEntries(diversions.map(d=>[d.key,d.delay]))),browserGoldenClaimed:false});
migrateLegacyObitoState();
})();
