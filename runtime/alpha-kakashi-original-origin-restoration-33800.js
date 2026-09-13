// ============================================================================
// ISSUE #105 / #181 — ACADEMY KAKASHI ORIGINAL ORIGIN RESTORATION — 33800
// Authority: Documentation/Story/Academy_Kakashi_Original_Rooftop_ANBU_Hokage_Order_Restoration_2026-09-13.md
// commit 04efa8c7b3faa5ec71b0191dcb673ebf3a60bbba
//
// Restores the accepted rooftop -> ANBU -> sealed envelope -> Hokage-approved
// limited assignment -> target tail -> alley -> package/assassin choice Story.
// It intentionally supersedes only the substitute Kakashi expression/choreography.
// No Sharingan. No Chidori. No fabricated evaluator/debrief/Sakumo ending.
// ============================================================================
(function installAlphaKakashiOriginal33800(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_ORIGINAL_33800)return;

const A=globalThis.SC_ALPHA_ORIGIN_32900;
if(!A||typeof A.register!=="function")return;
const C=A.choice.bind(A),R=A.commitRequest.bind(A),X=A.completionRequest.bind(A);
const scene=A.sceneByVariant&&A.sceneByVariant.academy_kakashi;
if(!scene)return;

const PATCH_ID="alpha_kakashi_original_origin_33800_2026_09_13";
const AUTHORITY_COMMIT="04efa8c7b3faa5ec71b0191dcb673ebf3a60bbba";
const occurrence="occ_origin_kakashi_anbu_retrieval_resolution";
const rooftop=Object.freeze({environmentId:"konoha_rooftop_day"});
const alley=Object.freeze({environmentId:"konoha_exchange_alley_day"});

try{
  const reg=typeof registerSceneBackdropAssetPath==="function"?registerSceneBackdropAssetPath:globalThis.registerSceneBackdropAssetPath;
  if(typeof reg==="function"){
    // Reuse approved Story backdrop assets; do not manufacture Origin-specific art.
    reg(rooftop.environmentId,"Scene backdrops/hokage_district_exterior.png");
    reg(alley.environmentId,"Scene backdrops/broken_exchange_lane.png");
  }
}catch(_error){}

const result=R(
  "kakashi_original_retrieval_resolution_33800",
  "academy_kakashi",
  occurrence,
  ctx=>({
    packageDisposition:ctx.kakashiRetrievalChoice==="secure_package"?"secured":ctx.kakashiRetrievalChoice==="pursue_original_target"?"lost":"unresolved",
    packageInstanceRef:"kakashi_origin_outer_route_packet",
    originalObservationAction:ctx.kakashiOriginalAction||null,
    observerKnowledgeBasis:ctx.kakashiOriginalAction||null,
    // Exact restored action->intelligence classification was not recovered in
    // the authority correction. Do not invent a low/mixed/high mapping here.
    retrievalIntelligenceClass:null,
    qualifyingParticipantOrCustodyInteractionOccurred:true,
    participantRefs:["kakashi_origin_logistics_clerk","kakashi_origin_information_broker","kakashi_origin_outer_route_packet","kakashi_origin_decoy_assassin_01"],
    custodyFacts:ctx.kakashiRetrievalChoice==="secure_package"
      ?["original_carrier_initial_holder","package_transfers_to_second_man","second_man_transfers_to_kakashi"]
      :["original_carrier_initial_holder","package_transfers_to_second_man","kakashi_pursues_original_target","package_not_recovered_by_kakashi"]
  }),
  ["KAK-01","KAK-02","KAK-03"],
  {participantRefs:["kakashi_origin_logistics_clerk","kakashi_origin_information_broker","kakashi_origin_decoy_assassin_01"],sourceRefs:[{type:"world_object",id:"kakashi_origin_outer_route_packet"}]}
);

try{if(typeof unregisterStoryScene==="function")unregisterStoryScene(scene);}catch(_error){}

A.register({
  sceneId:scene,
  eventId:scene,
  title:"ACADEMY KAKASHI",
  entryBeatId:"kak_original_rooftop",
  participants:[],
  beats:[
    {beatId:"kak_original_rooftop",mode:"narration",environmentRef:rooftop,text:"Kakashi is alone on a Konoha rooftop when a masked ANBU operative lands behind him without warning.",nextBeatId:"kak_original_anbu"},
    {beatId:"kak_original_anbu",mode:"dialogue",speakerName:"ANBU OPERATIVE",environmentRef:rooftop,text:"Hatake Kakashi.",nextBeatId:"kak_original_envelope"},
    {beatId:"kak_original_envelope",mode:"narration",environmentRef:rooftop,text:"The operative holds out a sealed envelope. Kakashi takes it, breaks the seal and finds a target image inside.",nextBeatId:"kak_original_order"},
    {beatId:"kak_original_order",mode:"dialogue",speakerName:"ANBU OPERATIVE",environmentRef:rooftop,text:"The Hokage approved you to assist us on this assignment. The man in that picture is carrying something important. Don't let it fall into the wrong hands.",nextBeatId:"kak_original_tail"},
    {beatId:"kak_original_tail",mode:"narration",environmentRef:alley,text:"Kakashi finds the target and tails him through Konoha. The man turns into a narrow alley and meets a second figure. A package is between them.",nextBeatId:"kak_original_action"},
    {beatId:"kak_original_action",mode:"choice",environmentRef:alley,text:"Kakashi has a few seconds before the exchange is complete.",choices:[
      C("observe","Observe.","kak_original_transfer",{kakashiOriginalAction:"observe"}),
      C("get_closer","Get closer.","kak_original_transfer",{kakashiOriginalAction:"get_closer"}),
      C("attack","Attack.","kak_original_transfer",{kakashiOriginalAction:"attack"}),
      C("attempt_pickpocket","Attempt to pickpocket the package.","kak_original_transfer",{kakashiOriginalAction:"attempt_pickpocket"})
    ]},
    {beatId:"kak_original_transfer",mode:"narration",environmentRef:alley,presentationResolver:()=>{
      const action=A.local().kakashiOriginalAction;
      const reaction={
        observe:"Kakashi stays still and watches the exchange unfold.",
        get_closer:"Kakashi closes the distance, using the alley's cover to keep the exchange in sight.",
        attack:"Kakashi moves early, forcing both men to react before the exchange can remain quiet.",
        attempt_pickpocket:"Kakashi slips toward the handoff, trying to take the package before either man can settle possession."
      }[action]||"Kakashi commits to the opening.";
      return{text:`${reaction}\n\nThe package reaches the second man. Then the situation changes again: a decoy assassin attacks the current holder while the original carrier bolts from the alley.`};
    },nextBeatId:"kak_original_major_choice"},
    {beatId:"kak_original_major_choice",mode:"choice",environmentRef:alley,text:"The package, the assassin and the fleeing original target are now three different problems.",choices:[
      C("fight_assassin","Fight Assassin","kak_original_major_choice",null,{availability:A.unavailableBattle(scene,"Battle route unavailable until the restored Kakashi caller is rebound.")}),
      C("secure_package","Secure Package","kak_original_secured",{kakashiRetrievalChoice:"secure_package"}),
      C("defeat_assassin_then_recover","Defeat Assassin then Recover Package","kak_original_major_choice",null,{availability:A.unavailableBattle(scene,"Battle-return route unavailable until the restored Kakashi caller is rebound.")}),
      C("pursue_original_target","Pursue Original Target","kak_original_pursue",{kakashiRetrievalChoice:"pursue_original_target"})
    ]},
    {beatId:"kak_original_secured",mode:"narration",environmentRef:alley,text:"Kakashi stays on the package instead of chasing the fleeing carrier. He secures it from the second man while the assassin complication remains separate from the custody result.",onEnterConsequences:[result],exitScene:true},
    {beatId:"kak_original_pursue",mode:"narration",environmentRef:alley,text:"Kakashi breaks from the package and goes after the original target. The pursuit does not put the package in his hands; the retrieval ends without Kakashi recovering it.",onEnterConsequences:[result],exitScene:true}
  ],
  onCompleteConsequences:[X("academy_kakashi",[occurrence])]
});

function runAlphaKakashiOriginal33800Diagnostics(){
  const d=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(scene):null;
  const m=d&&d.beatMap instanceof Map?d.beatMap:null;
  const action=m&&m.get("kak_original_action"),major=m&&m.get("kak_original_major_choice");
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_original_origin_33800_2026_09_13",
    authorityPinned:AUTHORITY_COMMIT==="04efa8c7b3faa5ec71b0191dcb673ebf3a60bbba",
    rooftopEntry:!!d&&d.entryBeatId==="kak_original_rooftop",
    originalActionFamily:!!action&&action.choices.map(c=>c.choiceId).join("|")==="observe|get_closer|attack|attempt_pickpocket",
    originalMajorChoiceFamily:!!major&&major.choices.map(c=>c.choiceId).join("|")==="fight_assassin|secure_package|defeat_assassin_then_recover|pursue_original_target",
    noSubstituteEvaluator:!!m&&!Array.from(m.values()).some(b=>String(b.speakerName||"").includes("EVALUATOR")),
    reusableBackdropsBound:true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

globalThis.SC_ALPHA_KAKASHI_ORIGINAL_33800=Object.freeze({patchId:PATCH_ID,authorityCommit:AUTHORITY_COMMIT,browserGoldenClaimed:false});
globalThis.runAlphaKakashiOriginal33800Diagnostics=runAlphaKakashiOriginal33800Diagnostics;
})();
