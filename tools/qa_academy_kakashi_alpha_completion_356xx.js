const fs=require("fs");
const vm=require("vm");
const assert=require("assert");

const ROOT=process.cwd();
const read=p=>fs.readFileSync(`${ROOT}/${p}`,"utf8");
const run=p=>vm.runInThisContext(read(p),{filename:p});

const terminalIds=[
  "kak_terminal_debrief_report_35100",
  "kak_terminal_debrief_summary_35100",
  "kak_terminal_pakkun_departure_1_35100",
  "kak_terminal_pakkun_departure_2_35100",
  "kak_terminal_pakkun_departure_3_35100",
  "kak_terminal_pakkun_departure_exit_35100",
  "kak_terminal_minato_private_evaluation_35100",
  "kak_terminal_chronicle_receipt_35100",
  "kak_terminal_chronicle_begins_35100"
];
const beatMap=new Map([
  ["kak_seq_ps_battle",{beatId:"kak_seq_ps_battle",battle:{postBattleBeatId:"kak_seq_ps_return"}}],
  ["kak_seq_ps_return",{beatId:"kak_seq_ps_return",mode:"choice"}],
  ...terminalIds.map(id=>[id,{beatId:id,mode:"narration"}])
]);
const scene={beatMap};
const occurrences=new Map([
  ["handoff",{fact:{packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PACKAGE_SMUGGLER_PERSON",handoffCompleted:true}}}]
]);
let classifications=[],materials=[],backdrops=[];
const runtime={
  sceneId:"origin_academy_kakashi_anbu_retrieval",
  instanceId:"qa-story-instance",
  beatId:"kak_seq_secure_package_after_ps",
  localContext:{kakashiGetCloserHandoffOccurrenceId:"handoff"},
  battleResume:{authored:{
    battleOccurrenceId:"qa-ps-battle-1",
    battleConfigId:"academy_kakashi_origin_battle_seq_ps",
    bindingRef:"academy_kakashi.battle.defeat_assassin_then_secure",
    resultState:"player_side_victory",
    playerActionOpportunityCount:7,
    participants:[{participantRef:"academy_kakashi_origin_package_smuggler",battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]
  }}
};

global.SC_ALPHA_ORIGIN_32900={
  findOccurrence:id=>occurrences.get(String(id))||null,
  commitOccurrence:(originId,id,fact,deltas,meta)=>{
    if(occurrences.has(id))return{success:true,idempotent:true,record:occurrences.get(id)};
    const record={fact,meta};occurrences.set(id,record);return{success:true,record};
  }
};
global.SC_STORY_DECISION_REALISATION_34000={
  stableRef:(prefix,payload)=>`${prefix}:${JSON.stringify(payload)}`,
  recordParticipantClassification:row=>{classifications.push(row);return{success:true,state:row};},
  recordMaterialState:row=>{materials.push(row);return{success:true,state:row};}
};
global.getStorySceneDefinition=id=>id==="origin_academy_kakashi_anbu_retrieval"?scene:null;
global.getActiveStorySceneRuntime=()=>runtime;
global.normalizeStorySceneBeat=row=>row;
global.savePlayerData=()=>{};
global.registerSceneBackdropAssetPath=(id,path)=>{backdrops.push({id,path});return{success:true};};

run("runtime/alpha-kakashi-sequential-post-ps-recovery-35600.js");
assert(global.SC_ALPHA_KAKASHI_SEQ_POST_PS_RECOVERY_35600,"35600 global missing");
assert.strictEqual(scene.beatMap.get("kak_seq_ps_battle").battle.postBattleBeatId,"kak_seq_secure_package_after_ps");
assert(global.runAcademyKakashiSequentialPostPsRecovery35600Diagnostics().pass,"35600 diagnostics RED");

let recovered=global.resolveAcademyKakashiSequentialPostPsPackageRecovery35600();
assert.strictEqual(recovered.success,true);
assert.strictEqual(recovered.recovered,true);
assert.strictEqual(recovered.packageOccurrenceId,"kak_seq_secure_package_after_ps");
assert.strictEqual(classifications.length,1,"PS classification must occur exactly before first recovery commit");
let recoveryFact=occurrences.get("kak_seq_secure_package_after_ps").fact;
assert.strictEqual(recoveryFact.semanticAction,"SECURE_PACKAGE_AFTER_PS");
assert.strictEqual(recoveryFact.anchorRef,"AK_SA_033");
assert.strictEqual(recoveryFact.packageState.currentHolderClass,"KAKASHI");
assert.strictEqual(recoveryFact.packageState.packageRecovered,true);
assert.strictEqual(recoveryFact.packageState.packageRecoverable,false);
assert.strictEqual(runtime.localContext.kakashiSequentialPackageOccurrenceId35100,"kak_seq_secure_package_after_ps");
assert(materials.some(x=>x.materialRef==="kakashi_origin_outer_route_packet"&&x.value.custodyClass==="KAKASHI"));

let replay=global.resolveAcademyKakashiSequentialPostPsPackageRecovery35600();
assert.strictEqual(replay.success,true);
assert.strictEqual(replay.recovered,true);

occurrences.delete("kak_seq_secure_package_after_ps");
classifications=[];
materials=[];
runtime.localContext={kakashiGetCloserHandoffOccurrenceId:"handoff"};
runtime.battleResume.authored={...runtime.battleResume.authored,battleOccurrenceId:"qa-ps-battle-loss",resultState:"opposition_side_victory",participants:[]};
let loss=global.resolveAcademyKakashiSequentialPostPsPackageRecovery35600();
assert.strictEqual(loss.success,true);
assert.strictEqual(loss.recovered,false);
assert.strictEqual(loss.packageOccurrenceId,"handoff");
assert.strictEqual(classifications.length,0,"loss must not classify a defeated PS");
assert.strictEqual(materials.length,0,"loss must not mutate package material state");
assert.strictEqual(runtime.localContext.kakashiSequentialPackageOccurrenceId35100,"handoff");

run("runtime/alpha-kakashi-terminal-scene-board-35610.js");
assert(global.SC_ALPHA_KAKASHI_TERMINAL_SCENE_BOARD_35610,"35610 global missing");
const sceneQa=global.runAcademyKakashiTerminalSceneBoard35610Diagnostics();
assert(sceneQa.pass,`35610 diagnostics RED: ${sceneQa.failed.join(",")}`);
assert(backdrops.some(x=>x.path==="Kakashi Origin Backdrop/hokage_administration_interior_night.png"));
assert.strictEqual(scene.beatMap.get("kak_terminal_minato_private_evaluation_35100").environmentRef.assetId,"kakashi_origin_hokage_administration_interior_night");

const loader=read("runtime/alpha-kakashi-final-origin-adapter-34100.js");
assert(loader.includes('const BUILD="kakashi-final-20260917-19"'));
assert(loader.includes('runtime/alpha-kakashi-sequential-post-ps-recovery-35600.js'));
assert(loader.includes('runtime/alpha-kakashi-terminal-scene-board-35610.js'));
assert(loader.indexOf("POST_PS_RECOVERY_PATH")<loader.indexOf("TERMINAL_SCENE_BOARD_PATH"));

const seqSource=read("runtime/alpha-kakashi-sequential-post-ps-recovery-35600.js");
assert(!/grantReward|grantItem|grantRyo|applyReward/.test(seqSource),"35600 must not issue rewards");
assert(seqSource.includes('sourceBattleAnchorRef:"AK_SA_022"'));
assert(seqSource.includes('nextPostResolutionAnchorRef:"AK_SA_024"'));

const terminalSource=read("runtime/alpha-kakashi-terminal-scene-board-35610.js");
assert(terminalSource.includes('Portraits/Kage/kage_minato.png'));
assert(terminalSource.includes('Kakashi Origin Backdrop/hokage_administration_interior_night.png'));
assert(!terminalSource.includes("commitOccurrence("),"presentation patch must not mutate Story facts");

console.log(JSON.stringify({
  pass:true,
  checks:{
    akSa033Recovery:true,
    recoveryIndependentOfTurnGate:true,
    psLossPreservesPriorCustody:true,
    terminalOccurrencePublished:true,
    approvedHokageBackdrop:true,
    minatoPrivateCutawayAsset:true,
    productionGeneration19:true,
    browserGoldenClaimed:false
  }
},null,2));
