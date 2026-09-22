// ALPHA ORIGIN 32900 — Kakashi / Obito final production packages.
(function installAlphaOrigin32900C(){
"use strict";
const A=globalThis.SC_ALPHA_ORIGIN_32900;if(!A)throw new Error("alpha_origin_32900_core_required");
const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);

// Academy Kakashi is intentionally not registered here.
// The legacy implementation was retired for the clean-room V2 rebuild.
// The stable academy_kakashi identity/scene mapping remains reserved in 32900-core,
// while the dispatcher fails closed until V2 registers its fresh scene package.

// Obito — five independent diversions plus factual formal-training entitlement.
(()=>{
  const scene=A.sceneByVariant.academy_obito;
  const diversions=Object.freeze([
    {key:"furniture",occurrenceId:"occ_origin_obito_furniture_assistance_resolution",diversionType:"furniture_assistance",beneficiaryRef:"obito_origin_furniture_civilian"},
    {key:"vegetables",occurrenceId:"occ_origin_obito_scattered_vegetables_resolution",diversionType:"scattered_vegetables",beneficiaryRef:"obito_origin_vegetable_vendor"},
    {key:"equipment",occurrenceId:"occ_origin_obito_lost_academy_equipment_resolution",diversionType:"lost_academy_equipment",beneficiaryRef:"obito_origin_academy_equipment_custodian"},
    {key:"delivery",occurrenceId:"occ_origin_obito_overturned_delivery_resolution",diversionType:"overturned_delivery",beneficiaryRef:"obito_origin_delivery_worker"},
    {key:"cart",occurrenceId:"occ_origin_obito_runaway_cart_resolution",diversionType:"runaway_cart",beneficiaryRef:"obito_origin_runaway_cart_civilian"}
  ]);
  const entitlement="occ_origin_obito_formal_training_entitlement_resolution";
  const diversionRequest=spec=>R(`obito_${spec.key}_32900`,"academy_obito",spec.occurrenceId,ctx=>{
    const response=ctx[`obito_${spec.key}`]||`${spec.key}_continue`;
    const material=response.endsWith("carry_full")||response.endsWith("collect_all")||response.endsWith("search_full")||response.endsWith("right_and_reload")||response==="cart_intercept";
    const brief=response.endsWith("stabilize")||response.endsWith("clear_lane")||response.endsWith("check_likely_route")||response.endsWith("clear_passage")||response==="cart_warn_and_redirect";
    const contribution=material?"material":brief?"bounded":null;
    return{diversionType:spec.diversionType,obitoCausalContributionEstablished:!!contribution,obitoContribution:contribution,beneficiaryRefs:[spec.beneficiaryRef],delayConsequence:material?"material":brief?"brief":"none",worldOutcome:material?"resolved_with_obito_material_contribution":brief?"bounded_contribution_then_world_lifecycle":"left_to_authored_world_lifecycle",selectedResponse:response};
  },ctx=>{const response=ctx[`obito_${spec.key}`]||"";return response&&!response.endsWith("continue")?["OBI-01"]:[];},{participantRefs:[spec.beneficiaryRef]});
  const beat=(spec,text,choices,next)=>({beatId:`obi_${spec.key}`,mode:"choice",text,choices:choices.map(([id,label])=>C(id,label,next,{[`obito_${spec.key}`]:id}))});
  const [furniture,vegetables,equipment,delivery,cart]=diversions;
  A.register({sceneId:scene,eventId:scene,title:"ACADEMY OBITO",entryBeatId:"obi_depart",participants:[],beats:[
    {beatId:"obi_depart",mode:"narration",text:"Obito leaves for an Academy/Uchiha fundamentals session that matters to him. The training follows a real schedule and will not wait for him. Direct travel can legitimately reach the FULL window.",nextBeatId:"obi_furniture"},
    beat(furniture,"A civilian is struggling to move bulky furniture through an awkward doorway.",[["furniture_carry_full","Stop and carry it through properly."],["furniture_stabilize","Brace it, get it unstuck, then keep moving."],["furniture_continue","Keep moving. Training is already waiting."]],"obi_vegetables"),
    {...beat(vegetables,"A dropped basket has scattered vegetables into a busy lane.",[["vegetables_collect_all","Help gather everything before it gets crushed."],["vegetables_clear_lane","Kick or roll the nearest pieces clear and make the lane safe."],["vegetables_continue","Keep running."]],"obi_equipment"),onEnterConsequences:[diversionRequest(furniture)]},
    {...beat(equipment,"An Academy equipment custodian searches for missing practice equipment along the route.",[["equipment_search_full","Join the search until the equipment is found."],["equipment_check_likely_route","Check the obvious drop points on the way and report what you find."],["equipment_continue","Leave the search to the Academy staff."]],"obi_delivery"),onEnterConsequences:[diversionRequest(vegetables)]},
    {...beat(delivery,"A delivery handcart has overturned and blocked part of the route.",[["delivery_right_and_reload","Help right the load and put the delivery back together."],["delivery_clear_passage","Clear the dangerous obstruction and leave the rest to the worker."],["delivery_continue","Take another way around."]],"obi_cart"),onEnterConsequences:[diversionRequest(equipment)]},
    {...beat(cart,"A runaway cart creates a real danger in the lane.",[["cart_intercept","Stop the cart yourself."],["cart_warn_and_redirect","Clear the path and redirect people out of its way."],["cart_continue","Keep moving."]],"obi_arrival"),onEnterConsequences:[diversionRequest(delivery)]},
    {beatId:"obi_arrival",mode:"narration",presentationResolver:()=>{
      const ctx=A.local(),allContinue=diversions.every(spec=>String(ctx[`obito_${spec.key}`]||"").endsWith("continue"));
      return{text:allContinue
        ?"Obito reaches training without an authored diversion delay. The direct-travel route is inside the locked FULL arrival window, so all four training blocks remain available."
        :"Obito reaches the training approach with real diversion delay preserved in his Origin history. The authority forbids deriving FULL, SUBSTANTIAL, REDUCED or MINIMAL from help-count or qualitative delay labels alone, so this delayed route is not guessed."};
    },onEnterConsequences:[diversionRequest(cart)],nextBeatId:"obi_entitlement"},
    {beatId:"obi_entitlement",mode:"choice",presentationResolver:()=>{
      const ctx=A.local(),allContinue=diversions.every(spec=>String(ctx[`obito_${spec.key}`]||"").endsWith("continue"));
      return{text:allContinue?"Formal training entitlement: FULL.":"Exact formal-training entitlement is waiting on authoritative elapsed journey-time / arrival evidence for this delayed route."};
    },choices:[
      C("accept_full_training","Enter the full training session","obi_training",{formalTrainingEntitlement:"FULL"},{availability:()=>({available:diversions.every(spec=>String(A.local()[`obito_${spec.key}`]||"").endsWith("continue")),knownBlocker:"Delayed Obito routes require exact journey-time authority; the runtime does not infer entitlement from help count."})}),
      C("timing_pending","Arrival timing unresolved — Chronicle preserved","obi_entitlement",null,{availability:()=>({available:false,knownBlocker:"Truthful fail-closed state. This is not a selectable outcome."})})]},
    {beatId:"obi_training",mode:"narration",text:"FULL entitlement plays the locked blocks in order: Stamina conditioning, Bukijutsu/Uchiha fundamentals, Ninjutsu/Academy-scale Fire fundamentals, and the Taijutsu closing drill. Progression authority owns the resulting stat receipt.",onEnterConsequences:[
      R("obito_entitlement_32900","academy_obito",entitlement,{formalTrainingEntitlement:"FULL",arrivalEvidence:"direct_travel_no_authored_diversion_delay",trainingBlocks:["stamina","bukijutsu","ninjutsu","taijutsu"]},["OBI-02"])],nextBeatId:"obi_reflect"},
    {beatId:"obi_reflect",mode:"choice",text:"After the training he actually reached, Obito looks toward the village and the Hokage Monument.",choices:[
      C("hokage_still","I'm still going to be Hokage.","obi_end",{obitoReflection:"hokage_still"}),
      C("faster_next","Next time I'll get there faster.","obi_end",{obitoReflection:"faster_next"}),
      C("people_mattered","Those people mattered too.","obi_end",{obitoReflection:"people_mattered"}),
      C("prove_it","I'll prove it next time.","obi_end",{obitoReflection:"prove_it"})]},
    {beatId:"obi_end",mode:"narration",text:"The journey's factual contributions, delays, training entitlement and Obito's own interpretation remain separate Chronicle evidence. No lateness Trait, morality score or help-count is created.",exitScene:true}
  ],onCompleteConsequences:[X("academy_obito",[...diversions.map(x=>x.occurrenceId),entitlement])]});
  A.obitoDiversions=diversions;
})();
})();
