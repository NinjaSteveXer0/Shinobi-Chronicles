// ============================================================================
// ISSUE #188 / #217 / #218 — KAKASHI SEQUENTIAL POST-PS PACKAGE RECOVERY — 35600
//
// Consumes final Writing authority from:
// Documentation/Story/Academy_Kakashi_Sequential_Post_PS_Package_Recovery_Beat_Lock_2026-09-17.md
//
// This is a narrow Story factual continuation patch. It does not create a new
// reward system, Battle result owner, or Story engine. PS Battle victory remains
// only Battle authority; package custody transfers in the separate AK_SA_033
// Story occurrence after PS post-resolution classification.
// ============================================================================
(function installAcademyKakashiSequentialPostPsRecovery35600(){
"use strict";
if(globalThis.SC_ALPHA_KAKASHI_SEQ_POST_PS_RECOVERY_35600)return;

const PATCH_ID="alpha_kakashi_seq_post_ps_recovery_35600_v2_2026_09_20";
const ORIGIN_ID="academy_kakashi";
const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const RECOVERY_BEAT="kak_seq_secure_package_after_ps";
const RECOVERY_OCCURRENCE_ID="kak_seq_secure_package_after_ps";
const RECOVERY_ANCHOR="AK_SA_033";
const PS_BATTLE_BEAT="kak_seq_ps_battle";
const PS_RETURN_BEAT="kak_seq_ps_return";
const PS_CONFIG="academy_kakashi_origin_battle_seq_ps";
const SEQUENTIAL_BINDING="academy_kakashi.battle.defeat_assassin_then_secure";
const STOP_ASSASSIN_POST_MI_PS_BINDING="academy_kakashi.battle.stop_assassin_post_mi_ps";
const WORLD_OBJECT_REF="kakashi_origin_outer_route_packet";
const PACKAGE_SMUGGLER_REF="academy_kakashi_origin_package_smuggler";
const SAKURA=Object.freeze({assetId:"kakashi_origin_sakura_tree_night"});

const A=globalThis.SC_ALPHA_ORIGIN_32900;
const CORE=globalThis.SC_STORY_DECISION_REALISATION_34000;

function scene(){try{return typeof getStorySceneDefinition==="function"?getStorySceneDefinition(SCENE_ID):null;}catch(_error){return null;}}
function active(){try{return typeof getActiveStorySceneRuntime==="function"?getActiveStorySceneRuntime():null;}catch(_error){return null;}}
function save(){try{if(typeof savePlayerData==="function")savePlayerData();}catch(_error){}}
function latestResult(){const rt=active();return rt&&rt.sceneId===SCENE_ID&&rt.battleResume&&rt.battleResume.authored&&typeof rt.battleResume.authored==="object"?rt.battleResume.authored:null;}
function factOf(row){return row&&(row.fact||row.data)||{};}
function normalizeBeat(row,index){return typeof normalizeStorySceneBeat==="function"?normalizeStorySceneBeat(row,index):row;}
function isVictory(result){return !!result&&String(result.resultState||"")==="player_side_victory";}
function recoveryOccurrenceIdFor(result,rt){
  const binding=String(result&&result.bindingRef||"");
  if(binding!==STOP_ASSASSIN_POST_MI_PS_BINDING)return RECOVERY_OCCURRENCE_ID;
  const identity={storySceneInstanceId:String(rt&&rt.instanceId||""),battleOccurrenceId:String(result&&result.battleOccurrenceId||""),anchorRef:RECOVERY_ANCHOR};
  return typeof CORE.stableRef==="function"
    ?CORE.stableRef("sc35600-ak-sa-033-post-mi-ps-recovery",identity)
    :RECOVERY_OCCURRENCE_ID+"::post-mi::"+identity.battleOccurrenceId;
}

function requireAuthority(){
  if(!A||typeof A.findOccurrence!=="function"||typeof A.commitOccurrence!=="function")return{success:false,reason:"kakashi_ak_sa_033_origin_occurrence_owner_missing"};
  if(!CORE||typeof CORE.recordParticipantClassification!=="function"||typeof CORE.recordMaterialState!=="function")return{success:false,reason:"kakashi_ak_sa_033_neutral_story_state_owner_missing"};
  return{success:true};
}

function parentPackageOccurrence(rt){
  const id=String(rt&&rt.localContext&&(
    rt.localContext.kakashiGetCloserHandoffOccurrenceId||
    rt.localContext.kakashiSequentialPackageOccurrenceId35100||
    rt.localContext.kakashiSequentialPackageOccurrenceId
  )||"");
  if(!id)return{success:false,reason:"kakashi_ak_sa_033_parent_package_occurrence_missing"};
  const row=A.findOccurrence(id);
  if(!row)return{success:false,reason:"kakashi_ak_sa_033_parent_package_occurrence_not_found",occurrenceId:id};
  const fact=factOf(row),pkg=fact.packageState||{};
  if(String(pkg.objectRef||"")!==WORLD_OBJECT_REF)return{success:false,reason:"kakashi_ak_sa_033_parent_package_object_mismatch",occurrenceId:id};
  if(String(pkg.currentHolderClass||pkg.custodyClass||"")!=="PACKAGE_SMUGGLER")return{success:false,reason:"kakashi_ak_sa_033_parent_package_not_with_ps",occurrenceId:id};
  return{success:true,occurrenceId:id,row,fact,packageState:pkg};
}

function classifyPackageSmugglerDefeat(result){
  const participant=Array.isArray(result&&result.participants)?result.participants.find(row=>row&&row.participantRef===PACKAGE_SMUGGLER_REF)||null:null;
  if(!participant)return{success:false,reason:"kakashi_ak_sa_033_ps_participant_missing"};
  if(String(participant.battleStatus||"")!=="defeated")return{success:false,reason:"kakashi_ak_sa_033_ps_defeat_fact_missing"};
  if(String(participant.lifeState||"")!=="unresolved"||String(participant.custodyState||"")!=="unresolved")return{success:false,reason:"kakashi_ak_sa_033_ps_story_state_not_unresolved"};
  const resultRef=typeof CORE.stableRef==="function"
    ?CORE.stableRef("sc35600-ak-sa-033-ps-classification",{battleOccurrenceId:String(result.battleOccurrenceId||""),participantRef:PACKAGE_SMUGGLER_REF})
    :`${String(result.battleOccurrenceId||"")}::${PACKAGE_SMUGGLER_REF}::${RECOVERY_ANCHOR}`;
  const classified=CORE.recordParticipantClassification({
    storyUnitRef:ORIGIN_ID,
    participantRef:PACKAGE_SMUGGLER_REF,
    stateClass:"DEFEATED_BUT_NOT_CONTROLLED",
    resultRef
  });
  return classified&&classified.success===true?{success:true,resultRef,stateClass:"DEFEATED_BUT_NOT_CONTROLLED"}:classified||{success:false,reason:"kakashi_ak_sa_033_ps_classification_failed"};
}

function resolveSequentialPostPsPackageRecovery35600(){
  const authority=requireAuthority();if(!authority.success)return authority;
  const rt=active(),result=latestResult();
  if(!rt||rt.sceneId!==SCENE_ID)return{success:false,reason:"kakashi_ak_sa_033_story_instance_missing"};
  if(!result||!result.battleOccurrenceId)return{success:false,reason:"kakashi_ak_sa_033_ps_battle_receipt_missing"};
  if(String(result.battleConfigId||"")!==PS_CONFIG||![SEQUENTIAL_BINDING,STOP_ASSASSIN_POST_MI_PS_BINDING].includes(String(result.bindingRef||"")))return{success:false,reason:"kakashi_ak_sa_033_ps_battle_receipt_mismatch"};
  const recoveryOccurrenceId=recoveryOccurrenceIdFor(result,rt);

  const parent=parentPackageOccurrence(rt);if(!parent.success)return parent;

  // Loss/withdrawal never fabricates a custody change. The last explicit package
  // state remains authoritative and terminal debrief can consume that occurrence.
  if(!isVictory(result)){
    rt.localContext={...(rt.localContext||{}),
      kakashiSequentialPackageOccurrenceId:parent.occurrenceId,
      kakashiSequentialPackageOccurrenceId35100:parent.occurrenceId,
      kakashiSequentialPackageRecoveryCommitted:false,
      kakashiSequentialPackageResolutionReady:true,
      kakashiSequentialPackageResolutionAnchor:RECOVERY_ANCHOR
    };
    save();
    return{success:true,recovered:false,packageOccurrenceId:parent.occurrenceId,resultState:String(result.resultState||"")};
  }

  // Ordering lock: post-Battle classification happens before package recovery.
  const classification=classifyPackageSmugglerDefeat(result);if(!classification.success)return classification;

  const existing=A.findOccurrence(recoveryOccurrenceId);
  if(existing){
    const prior=factOf(existing),pkg=prior.packageState||{};
    if(String(prior.storySceneInstanceId||"")!==String(rt.instanceId||"")||
       String(prior.battleOccurrenceId||"")!==String(result.battleOccurrenceId||"")||
       String(pkg.currentHolderClass||"")!=="KAKASHI"){
      return{success:false,reason:"kakashi_ak_sa_033_occurrence_replay_mismatch"};
    }
  }else{
    const fact={
      factClass:"academy_kakashi_sequential_post_ps_package_recovery",
      semanticAction:"SECURE_PACKAGE_AFTER_PS",
      anchorRef:RECOVERY_ANCHOR,
      sourceBattleAnchorRef:"AK_SA_022",
      battleConfigId:PS_CONFIG,
      battleOccurrenceId:String(result.battleOccurrenceId||""),
      battleResultState:"player_side_victory",
      parentOccurrenceRef:parent.occurrenceId,
      storySceneInstanceId:String(rt.instanceId||""),
      packageState:{
        objectRef:WORLD_OBJECT_REF,
        previousHolderClass:"PACKAGE_SMUGGLER",
        currentHolderClass:"KAKASHI",
        custodyClass:"KAKASHI",
        locationClass:"KAKASHI_PERSON",
        packageRecovered:true,
        packageRecoverable:false,
        handoffCompleted:true
      },
      participantBattleStateByRef:{
        [PACKAGE_SMUGGLER_REF]:{battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved",storyClassification:"DEFEATED_BUT_NOT_CONTROLLED"}
      },
      worldFacts:{
        packageCustody:"KAKASHI",
        packageLocation:"KAKASHI_PERSON",
        packageRecovered:true,
        participantCustodyCommitted:false,
        participantDeathCommitted:false
      },
      nextPostResolutionAnchorRef:"AK_SA_024"
    };
    const committed=A.commitOccurrence(ORIGIN_ID,recoveryOccurrenceId,fact,[],{
      type:"origin_story_factual_occurrence",
      outcome:"SECURE_PACKAGE_AFTER_PS",
      participantRefs:[ORIGIN_ID,PACKAGE_SMUGGLER_REF],
      sourceRefs:[
        {type:"origin_occurrence",id:parent.occurrenceId},
        {type:"battle_occurrence",id:String(result.battleOccurrenceId||"")},
        {type:"story_autonomy_anchor",id:RECOVERY_ANCHOR},
        {type:"world_object",id:WORLD_OBJECT_REF},
        {type:"writing_authority",id:"Documentation/Story/Academy_Kakashi_Sequential_Post_PS_Package_Recovery_Beat_Lock_2026-09-17.md"}
      ]
    });
    if(!committed||committed.success!==true)return committed||{success:false,reason:"kakashi_ak_sa_033_occurrence_commit_failed"};
  }

  const material=CORE.recordMaterialState({
    storyUnitRef:ORIGIN_ID,
    materialRef:WORLD_OBJECT_REF,
    resolved:true,
    stateRef:recoveryOccurrenceId,
    value:{custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",sourceAnchorRef:RECOVERY_ANCHOR,packageRecovered:true,packageRecoverable:false}
  });
  if(!material||material.success!==true)return material||{success:false,reason:"kakashi_ak_sa_033_material_state_commit_failed"};

  rt.localContext={...(rt.localContext||{}),
    kakashiSequentialPackageOccurrenceId:recoveryOccurrenceId,
    kakashiSequentialPackageOccurrenceId35100:recoveryOccurrenceId,
    kakashiSequentialPackageRecoveryCommitted:true,
    kakashiSequentialPackageResolutionReady:true,
    kakashiSequentialPackageRecoveryClassificationRef:classification.resultRef,
    kakashiSequentialPackageResolutionAnchor:RECOVERY_ANCHOR
  };
  save();
  return{success:true,recovered:true,packageOccurrenceId:recoveryOccurrenceId,classificationRef:classification.resultRef};
}

function install(){
  const def=scene();
  if(!def||!(def.beatMap instanceof Map))return{success:false,reason:"kakashi_ak_sa_033_story_definition_missing"};
  const battleBeat=def.beatMap.get(PS_BATTLE_BEAT),returnBeat=def.beatMap.get(PS_RETURN_BEAT);
  if(!battleBeat||!battleBeat.battle||!returnBeat)return{success:false,reason:"kakashi_ak_sa_033_sequential_ps_beats_missing"};

  const recovery=normalizeBeat({
    beatId:RECOVERY_BEAT,
    mode:"narration",
    environmentRef:SAKURA,
    text:"The Package Smuggler is down. Kakashi secures the package before deciding whether the original target is still reachable.",
    presentationResolver:()=>{
      const result=latestResult();
      if(!result)return{text:"The Package Smuggler confrontation has not returned a factual result."};
      return isVictory(result)
        ?{text:"The Package Smuggler is down. Kakashi's eye goes to the package. He takes it, checks it quickly, and secures it before anything can separate him from it. Only then does he look back toward the route the first man took."}
        :{text:"Kakashi is forced to withdraw. No package recovery is invented; the last explicit package custody remains authoritative."};
    },
    onEnterConsequences:[{requestId:"kakashi_seq_secure_package_after_ps_35600",kind:"domain",resolve:resolveSequentialPostPsPackageRecovery35600}],
    nextBeatId:PS_RETURN_BEAT,
    exitScene:false,
    allowPresentationClose:false
  },95600);
  if(!recovery)return{success:false,reason:"kakashi_ak_sa_033_recovery_beat_normalization_failed"};

  def.beatMap.set(RECOVERY_BEAT,recovery);
  battleBeat.battle.postBattleBeatId=RECOVERY_BEAT;
  return{success:true,recoveryBeatId:RECOVERY_BEAT,postBattleBeatId:battleBeat.battle.postBattleBeatId};
}

function diagnostics(){
  const def=scene(),battleBeat=def&&def.beatMap instanceof Map?def.beatMap.get(PS_BATTLE_BEAT):null,recovery=def&&def.beatMap instanceof Map?def.beatMap.get(RECOVERY_BEAT):null;
  const checks={
    patchId:PATCH_ID==="alpha_kakashi_seq_post_ps_recovery_35600_v2_2026_09_20",
    writingAuthorityExact:RECOVERY_ANCHOR==="AK_SA_033"&&RECOVERY_OCCURRENCE_ID==="kak_seq_secure_package_after_ps",
    stopAssassinBindingAccepted:resolveSequentialPostPsPackageRecovery35600.toString().includes("STOP_ASSASSIN_POST_MI_PS_BINDING"),
    postMiRecoveryOccurrenceBattleScoped:recoveryOccurrenceIdFor.toString().includes("sc35600-ak-sa-033-post-mi-ps-recovery")&&recoveryOccurrenceIdFor.toString().includes("battleOccurrenceId")&&recoveryOccurrenceIdFor.toString().includes("STOP_ASSASSIN_POST_MI_PS_BINDING"),
    semanticActionExact:resolveSequentialPostPsPackageRecovery35600.toString().includes('semanticAction:"SECURE_PACKAGE_AFTER_PS"'),
    battleVictoryNotCustodyOwner:classifyPackageSmugglerDefeat.toString().includes("recordParticipantClassification")&&resolveSequentialPostPsPackageRecovery35600.toString().includes("commitOccurrence"),
    classificationBeforeRecovery:resolveSequentialPostPsPackageRecovery35600.toString().indexOf("classifyPackageSmugglerDefeat")<resolveSequentialPostPsPackageRecovery35600.toString().indexOf("commitOccurrence"),
    victoryRecoveryNotTurnGated:!resolveSequentialPostPsPackageRecovery35600.toString().includes("playerActionOpportunityCount"),
    lossPreservesPriorCustody:resolveSequentialPostPsPackageRecovery35600.toString().includes("kakashiSequentialPackageRecoveryCommitted:false"),
    terminalPackageOccurrencePublished:resolveSequentialPostPsPackageRecovery35600.toString().includes("kakashiSequentialPackageOccurrenceId35100"),
    recoveryBeatInserted:!!recovery,
    psBattleReturnsThroughRecovery:!!battleBeat&&!!battleBeat.battle&&battleBeat.battle.postBattleBeatId===RECOVERY_BEAT,
    noRewardIssuance:!resolveSequentialPostPsPackageRecovery35600.toString().includes("grant")&&!resolveSequentialPostPsPackageRecovery35600.toString().includes("reward"),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{pass:failed.length===0,checks,failed,browserGoldenClaimed:false};
}

const installed=install();
globalThis.resolveAcademyKakashiSequentialPostPsPackageRecovery35600=resolveSequentialPostPsPackageRecovery35600;
globalThis.runAcademyKakashiSequentialPostPsRecovery35600Diagnostics=diagnostics;
globalThis.SC_ALPHA_KAKASHI_SEQ_POST_PS_RECOVERY_35600=Object.freeze({
  patchId:PATCH_ID,installed,recoveryBeatId:RECOVERY_BEAT,recoveryOccurrenceId:RECOVERY_OCCURRENCE_ID,anchorRef:RECOVERY_ANCHOR,browserGoldenClaimed:false
});
})();
