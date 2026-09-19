// ============================================================================
// ISSUE #105 / #181 / #192 — ACADEMY KAKASHI ORIGINAL ORIGIN RESTORATION — 33800
// Authority: Documentation/Story/Academy_Kakashi_Original_Rooftop_ANBU_Hokage_Order_Restoration_2026-09-13.md
// commit 04efa8c7b3faa5ec71b0191dcb673ebf3a60bbba
// Choice-expression authority:
// Documentation/Story/Academy_Kakashi_Player_Facing_Choice_Label_Modernization_Lock_2026-09-15.md
// commit 21e0574c7efeb2257924d581370225ad92ab4fe9
//
// Restores the accepted rooftop -> ANBU -> sealed envelope -> Hokage-approved
// limited assignment -> target tail -> alley -> package/assassin choice Story.
// It intentionally supersedes only the substitute Kakashi expression/choreography.
// No Sharingan. No Chidori. No fabricated evaluator/debrief/Sakumo ending.
//
// Stephen asset authority (2026-09-14): the repository folder
// `Kakashi Origin Backdrop/` was created specifically for Kakashi's Origin.
// Its three files are therefore the direct scene-family presentation authority:
// rooftop_night -> konoha_alleyway -> sakura_tree_night.
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
const CHOICE_LABEL_AUTHORITY_COMMIT="21e0574c7efeb2257924d581370225ad92ab4fe9";
const occurrence="occ_origin_kakashi_anbu_retrieval_resolution";
const rooftop=Object.freeze({assetId:"kakashi_origin_rooftop_night"});
const alley=Object.freeze({assetId:"kakashi_origin_konoha_alleyway"});
const sakura=Object.freeze({assetId:"kakashi_origin_sakura_tree_night"});
const backdropPaths=Object.freeze({
  [rooftop.assetId]:"Kakashi Origin Backdrop/rooftop_night.png",
  [alley.assetId]:"Kakashi Origin Backdrop/konoha_alleyway.png",
  [sakura.assetId]:"Kakashi Origin Backdrop/sakura_tree_night.png"
});
const kakashiEnvironmentDefinitions=Object.freeze({
  [rooftop.assetId]:Object.freeze({assetId:rooftop.assetId,status:"origin_story_asset",timeOfDay:"night",aspectRatio:"16:9",masterWidth:1920,masterHeight:1080,dialogueSafeLowerRatio:0.35,storyOnly:true,neverBattleSurface:true}),
  [alley.assetId]:Object.freeze({assetId:alley.assetId,status:"origin_story_asset",timeOfDay:"night",aspectRatio:"16:9",masterWidth:1920,masterHeight:1080,dialogueSafeLowerRatio:0.35,storyOnly:true,neverBattleSurface:true}),
  [sakura.assetId]:Object.freeze({assetId:sakura.assetId,status:"origin_story_asset",timeOfDay:"night",aspectRatio:"16:9",masterWidth:1920,masterHeight:1080,dialogueSafeLowerRatio:0.35,storyOnly:true,neverBattleSurface:true})
});

try{
  const reg=typeof registerSceneBackdropAssetPath==="function"?registerSceneBackdropAssetPath:globalThis.registerSceneBackdropAssetPath;
  if(typeof reg==="function"){
    Object.entries(backdropPaths).forEach(([assetId,path])=>reg(assetId,path));
  }
}catch(_error){}

// Core Story environment projection only recognises the original frozen Alpha
// environment library. These three approved Kakashi-only assets were authored
// later, so bridge their exact assetIds through that existing resolver instead
// of mutating the frozen core library or remapping an unrelated global backdrop.
const priorEnvironmentResolver33800=typeof resolveStorySceneEnvironmentProjection==="function"?resolveStorySceneEnvironmentProjection:null;
function requestedEnvironmentAssetId33800(authoredPresentation={},beat=null,definition=null){
  const refs=[
    authoredPresentation&&(authoredPresentation.environmentRef||authoredPresentation.sceneEnvironmentRef)||null,
    beat&&beat.environmentRef||null,
    definition&&definition.environmentRef||null
  ];
  for(const ref of refs){
    if(typeof ref==="string")return ref;
    if(ref&&typeof ref==="object"&&ref.assetId)return String(ref.assetId);
  }
  return null;
}
function resolveKakashiOriginEnvironment33800(authoredPresentation={},beat=null,definition=null,active=null){
  const assetId=requestedEnvironmentAssetId33800(authoredPresentation,beat,definition);
  const environment=assetId?kakashiEnvironmentDefinitions[assetId]||null:null;
  if(environment){
    let assetPath=backdropPaths[assetId]||null;
    try{
      if(typeof getSceneBackdropAssetPath==="function")assetPath=getSceneBackdropAssetPath(assetId)||assetPath;
    }catch(_error){}
    return{
      mode:"dedicated_backdrop",
      asset_id:environment.assetId,
      asset_path:assetPath,
      location_id:null,
      status:environment.status,
      aspect_ratio:environment.aspectRatio,
      master_resolution:{width:environment.masterWidth,height:environment.masterHeight},
      dialogue_safe_lower_ratio:environment.dialogueSafeLowerRatio,
      story_only:environment.storyOnly===true,
      never_battle_surface:environment.neverBattleSurface===true,
      world_identity_unchanged:true
    };
  }
  if(priorEnvironmentResolver33800)return priorEnvironmentResolver33800.apply(this,arguments);
  return{mode:"inherit_current",asset_id:null,asset_path:null,location_id:null,world_identity_unchanged:true};
}
if(priorEnvironmentResolver33800){
  globalThis.resolveStorySceneEnvironmentProjection=resolveKakashiOriginEnvironment33800;
  try{resolveStorySceneEnvironmentProjection=resolveKakashiOriginEnvironment33800;}catch(_error){}
}

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
      C("observe","WATCH THE EXCHANGE","kak_original_transfer",{kakashiOriginalAction:"observe"}),
      C("get_closer","MOVE IN CLOSER","kak_original_transfer",{kakashiOriginalAction:"get_closer"}),
      C("attack","STRIKE BEFORE THE HANDOFF","kak_original_transfer",{kakashiOriginalAction:"attack"}),
      C("attempt_pickpocket","SLIP IN FOR THE PACKAGE","kak_original_transfer",{kakashiOriginalAction:"attempt_pickpocket"})
    ]},
    {beatId:"kak_original_transfer",mode:"narration",environmentRef:sakura,presentationResolver:()=>{
      const action=A.local().kakashiOriginalAction;
      const reaction={
        observe:"Kakashi stays still and watches the exchange unfold.",
        get_closer:"Kakashi closes the distance, using the alley's cover to keep the exchange in sight.",
        attack:"Kakashi moves early, forcing both men to react before the exchange can remain quiet.",
        attempt_pickpocket:"Kakashi slips toward the handoff, trying to take the package before either man can settle possession."
      }[action]||"Kakashi commits to the opening.";
      return{text:`${reaction}\n\nThe package reaches the second man. Then the situation changes again: a decoy assassin attacks the current holder while the original carrier bolts from the alley.`};
    },nextBeatId:"kak_original_major_choice"},
    {beatId:"kak_original_major_choice",mode:"choice",environmentRef:sakura,text:"The package, the assassin and the fleeing original target are now three different problems.",choices:[
      C("fight_assassin","CUT HER OFF","kak_original_major_choice",null,{availability:A.unavailableBattle(scene,"Battle route unavailable until the restored Kakashi caller is rebound.")}),
      C("secure_package","GO FOR THE PACKAGE","kak_original_secured",{kakashiRetrievalChoice:"secure_package"}),
      C("defeat_assassin_then_recover","DEAL WITH HER FIRST, THEN CHASE THE PACKAGE","kak_original_major_choice",null,{availability:A.unavailableBattle(scene,"Battle-return route unavailable until the restored Kakashi caller is rebound.")}),
      C("pursue_original_target","STAY ON THE FIRST MAN","kak_original_pursue",{kakashiRetrievalChoice:"pursue_original_target"})
    ]},
    {beatId:"kak_original_secured",mode:"narration",environmentRef:sakura,text:"Kakashi stays on the package instead of chasing the fleeing carrier. He secures it from the second man while the assassin complication remains separate from the custody result.",onEnterConsequences:[result],exitScene:true},
    {beatId:"kak_original_pursue",mode:"narration",environmentRef:sakura,text:"Kakashi breaks from the package and goes after the original target. The pursuit does not put the package in his hands; the retrieval ends without Kakashi recovering it.",onEnterConsequences:[result],exitScene:true}
  ],
  onCompleteConsequences:[X("academy_kakashi",[occurrence])]
});

// If this correction arrives while Kakashi's Story layer is already open,
// rebuild the existing Story presentation once so the newly resolvable backdrop
// appears immediately. This is presentation-only; no beat or consequence runs.
try{
  const active=typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;
  if(active&&active.sceneId===scene&&typeof renderStoryScenePresentationLayer==="function")renderStoryScenePresentationLayer();
}catch(_error){}

function runAlphaKakashiOriginal33800Diagnostics(){
  const d=typeof getStorySceneDefinition==="function"?getStorySceneDefinition(scene):null;
  const m=d&&d.beatMap instanceof Map?d.beatMap:null;
  const action=m&&m.get("kak_original_action"),major=m&&m.get("kak_original_major_choice");
  const rooftopBeat=m&&m.get("kak_original_rooftop"),tailBeat=m&&m.get("kak_original_tail"),transferBeat=m&&m.get("kak_original_transfer");
  const getPath=typeof getSceneBackdropAssetPath==="function"?getSceneBackdropAssetPath:null;
  const rooftopProjection=resolveKakashiOriginEnvironment33800({environmentRef:rooftop},null,null,null);
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_original_origin_33800_2026_09_13",
    authorityPinned:AUTHORITY_COMMIT==="04efa8c7b3faa5ec71b0191dcb673ebf3a60bbba",
    choiceLabelAuthorityPinned:CHOICE_LABEL_AUTHORITY_COMMIT==="21e0574c7efeb2257924d581370225ad92ab4fe9",
    rooftopEntry:!!d&&d.entryBeatId==="kak_original_rooftop",
    originalActionFamily:!!action&&action.choices.map(c=>c.choiceId).join("|")==="observe|get_closer|attack|attempt_pickpocket",
    modernizedActionLabels:!!action&&action.choices.map(c=>c.label).join("|")==="WATCH THE EXCHANGE|MOVE IN CLOSER|STRIKE BEFORE THE HANDOFF|SLIP IN FOR THE PACKAGE",
    originalMajorChoiceFamily:!!major&&major.choices.map(c=>c.choiceId).join("|")==="fight_assassin|secure_package|defeat_assassin_then_recover|pursue_original_target",
    modernizedMajorChoiceLabels:!!major&&major.choices.map(c=>c.label).join("|")==="CUT HER OFF|GO FOR THE PACKAGE|DEAL WITH HER FIRST, THEN CHASE THE PACKAGE|STAY ON THE FIRST MAN",
    noSubstituteEvaluator:!!m&&!Array.from(m.values()).some(b=>String(b.speakerName||"").includes("EVALUATOR")),
    kakashiSpecificBackdropSequence:!!rooftopBeat&&!!tailBeat&&!!transferBeat
      &&rooftopBeat.environmentRef&&rooftopBeat.environmentRef.assetId===rooftop.assetId
      &&tailBeat.environmentRef&&tailBeat.environmentRef.assetId===alley.assetId
      &&transferBeat.environmentRef&&transferBeat.environmentRef.assetId===sakura.assetId,
    exactBackdropPathsBound:!!getPath
      &&getPath(rooftop.assetId)===backdropPaths[rooftop.assetId]
      &&getPath(alley.assetId)===backdropPaths[alley.assetId]
      &&getPath(sakura.assetId)===backdropPaths[sakura.assetId],
    dedicatedBackdropActuallyResolvable:!!priorEnvironmentResolver33800
      &&rooftopProjection&&rooftopProjection.mode==="dedicated_backdrop"
      &&rooftopProjection.asset_id===rooftop.assetId
      &&rooftopProjection.asset_path===backdropPaths[rooftop.assetId]
      &&rooftopProjection.world_identity_unchanged===true,
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([k,v])=>k!=="browserGoldenClaimed"&&v!==true).map(([k])=>k);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false,backdropPaths:{...backdropPaths}};
}

globalThis.SC_ALPHA_KAKASHI_ORIGINAL_33800=Object.freeze({patchId:PATCH_ID,authorityCommit:AUTHORITY_COMMIT,choiceLabelAuthorityCommit:CHOICE_LABEL_AUTHORITY_COMMIT,backdropPaths:{...backdropPaths},browserGoldenClaimed:false});
globalThis.runAlphaKakashiOriginal33800Diagnostics=runAlphaKakashiOriginal33800Diagnostics;
})();

// ISSUE #105 / #175 benchmark presentation loads only after accepted Kakashi
// Story authority has won the expression chain. The 33900 module is a generic
// projection adapter over the existing Story renderer and consumes these exact
// Kakashi-Origin-specific backdrop bindings; it does not create a second Story engine.
// 33910 is the current Kakashi Scene Board consumer. 33920 is an explicit,
// temporary compatibility shim for installed-browser presentation defects and
// must be folded into 33910 after browser acceptance.
(function activateStorySceneBoard33900AfterKakashi33800(){
  if(typeof document==="undefined"||!document.head||typeof document.createElement!=="function")return;
  const SCRIPT_ID="sc-story-scene-board-33900-script";
  const POLISH_ID="sc-kakashi-scene-board-polish-33910-script";
  const COMPAT_ID="sc-kakashi-story-presentation-compat-33920-script";
  const BUILD="scene-board-20260919-7";

  function load33920(){
    if(globalThis.SC_ALPHA_KAKASHI_STORY_PRESENTATION_COMPAT_33920||document.getElementById(COMPAT_ID))return;
    const compat=document.createElement("script");
    compat.id=COMPAT_ID;
    compat.src=`runtime/alpha-kakashi-story-presentation-compat-33920.js?v=${BUILD}`;
    compat.async=false;
    document.head.appendChild(compat);
  }

  function load33910(){
    if(globalThis.SC_KAKASHI_SCENE_BOARD_POLISH_33910){load33920();return;}
    const existing=document.getElementById(POLISH_ID);
    if(existing){existing.addEventListener("load",load33920,{once:true});return;}
    const polish=document.createElement("script");
    polish.id=POLISH_ID;
    polish.src=`runtime/alpha-kakashi-scene-board-polish-33910.js?v=${BUILD}`;
    polish.async=false;
    polish.addEventListener("load",load33920,{once:true});
    document.head.appendChild(polish);
  }

  if(globalThis.SC_STORY_SCENE_BOARD_33900){load33910();return;}
  const existing=document.getElementById(SCRIPT_ID);
  if(existing){existing.addEventListener("load",load33910,{once:true});return;}
  const script=document.createElement("script");
  script.id=SCRIPT_ID;
  script.src=`runtime/alpha-story-scene-board-33900.js?v=${BUILD}`;
  script.async=false;
  script.addEventListener("load",load33910,{once:true});
  document.head.appendChild(script);
})();
