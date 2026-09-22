#!/usr/bin/env node
"use strict";

const fs=require("fs");
const path=require("path");
const vm=require("vm");
const assert=require("assert");

const ROOT=path.resolve(__dirname,"..");
const read=rel=>fs.readFileSync(path.join(ROOT,rel),"utf8");

const storySource=read("runtime/alpha-story-scene-board-33900.js");
const battleSource=read("runtime/alpha-battle-modern-33000.js");
const kv2Renderer=read("runtime/alpha-kakashi-v2-renderer-36030.js");
const kv2Transition=read("runtime/alpha-kakashi-v2-transition-36040.js");
const kv2Core=read("runtime/alpha-kakashi-v2-core-36020.js");
const kv2Battle=read("runtime/alpha-kakashi-v2-battle-36010.js");
const kv2Rewards=read("runtime/alpha-kakashi-v2-rewards-36015.js");
const ownership=JSON.parse(read("tools/fixtures/runtime_responsibility_registry_300.json"));

assert(!storySource.includes("new MutationObserver"),"#312 shared Story owner must not depend on MutationObserver");
assert(storySource.includes("SEMANTIC_STAGE_ANCHORS"),"#312 semantic Story anchors missing");
for(const token of ["PLAYER_LEFT","INNER_LEFT","CENTER","CENTER_OBJECT","INNER_RIGHT","OPPONENT_RIGHT","FAR_ENTRY_LEFT","FAR_ENTRY_RIGHT"]){
  assert(storySource.includes(token),"#312 Story anchor missing "+token);
}
for(const token of ["ENTER","EXIT","FOCUS","REPOSITION","APPROACH","RETREAT","LUNGE","STRIKE","EVADE","RECOIL","COLLAPSE","FLEE","RESTRAIN","RELEASE","HANDOFF","OBJECT_TRANSFER","SURPRISE_ENTRY"]){
  assert(storySource.includes(token),"#312 choreography class missing "+token);
}
assert(storySource.includes("Math.min(650"),"#312 ordinary Story choreography must be bounded");
assert(storySource.includes("cancelStoryChoreography33900"),"#312 cancellable Story choreography missing");
assert(storySource.includes('data-sc-choreography-pending-entry'),"#312 shared Story owner must pre-stage entrants before their ENTER cue");
assert(storySource.includes("reused:true"),"#312 same-scope Story choreography must not replay on harmless rerender");
assert(storySource.includes("scChoreographyCompletedKinds")&&storySource.includes("completedKinds"),"#312 shared Story choreography must expose presentation-only completion receipts");
assert(storySource.includes("removeOnComplete")&&kv2Renderer.includes("removeOnComplete:true"),"#312 departure ghost lifetime must be owned by shared cue completion");

assert(kv2Renderer.includes("playStoryChoreography33900"),"#312 Kakashi must consume shared Story choreography");
assert(kv2Renderer.includes("applyStoryStageAnchor33900"),"#312 Kakashi must consume shared semantic anchors");
assert(kv2Renderer.includes('data-story-object-id="PACKAGE"'),"#312 package token missing");
assert(kv2Renderer.includes('data-count="1"')&&kv2Renderer.includes('data-count="2"'),"#312 actor prominence must adapt to cast count");
assert(kv2Renderer.indexOf("for(const row of departures)")<kv2Renderer.indexOf("const prevIds"),"#312 committed departures must stage before newly entered actors");
{
  const transitionStart=kv2Renderer.indexOf("function playProjectionTransition(");
  const transitionEnd=kv2Renderer.indexOf("function syncActors(",transitionStart);
  const transitionSource=kv2Renderer.slice(transitionStart,transitionEnd);
  assert(transitionStart>=0&&transitionEnd>transitionStart&&transitionSource.includes("actorSignature")&&!transitionSource.includes("next.packageHolder"),"#312 actor choreography scope must not restart for same-beat package truth updates");
}
{
  const renderStart=kv2Renderer.indexOf("function render(){");
  const renderEnd=kv2Renderer.indexOf("function bind(",renderStart);
  const renderSource=kv2Renderer.slice(renderStart,renderEnd);
  assert(renderStart>=0&&renderEnd>renderStart&&!renderSource.includes('JSON.stringify(previous.participantStates)!==JSON.stringify(next.participantStates)'),"#312 harmless participant-state refresh must not replay actor choreography");
}
assert(kv2Transition.includes("semanticAlreadyCommitted:true"),"#312 transition must be post-commit presentation");
assert(kv2Transition.includes('"hard"')&&kv2Transition.includes('"soft"')&&kv2Transition.includes("same_environment_beat_shift"),"#312 hard/soft cinematic transition hierarchy missing");
assert(kv2Transition.includes("playAcademyKakashiV2CuePresentation36030"),"#312 cue-level card performance must run during narration stepping");
assert(!kv2Transition.includes("cloneNode"),"#312 transition adapter must not own actor animation DOM");
assert(!kv2Transition.includes("locked=true"),"#312 Story truth must not wait on animation lock");

assert(kv2Renderer.includes(".kv2-speech")&&kv2Renderer.includes("syncSpeech"),"#312 actor-linked speech surface missing");
assert(kv2Renderer.includes("CLICK ANYWHERE TO CONTINUE")&&!kv2Renderer.includes('class="kv2-next"'),"#312 arrow-only continuation must be retired");
assert(kv2Renderer.includes('root.dataset.hasChoices==="true"')&&kv2Renderer.includes('root.dataset.transitionActive==="true"')&&kv2Renderer.includes("Date.now()-revealed<360"),"#312 choice reveal / cinematic transition must block click-through / accidental commitment");
assert(kv2Renderer.includes("repeat(3,minmax(0,1fr))")&&kv2Renderer.includes("max-height:none;overflow:visible"),"#312 five-choice desktop layout must not require an internal scrollbar");
assert(kv2Renderer.includes('p.id!=="v2_watch_exchange"')&&kv2Renderer.includes("SURPRISE_ENTRY")&&kv2Renderer.includes("FAR_ENTRY_LEFT"),"#312 WATCH exchange cue choreography missing");
assert(kv2Renderer.includes('if(idx<10)mi.dataset.kv2CueWithheld="true"'),"#312 Masked Interceptor must remain visually withheld until her authored reveal cue");
assert(kv2Renderer.includes("border-radius:16px")&&kv2Renderer.includes("backdrop-filter:blur(8px)"),"#312 modern compact narration/speech styling missing");

assert(kv2Rewards.includes("ensureKakashiV2BattleRewardProjection36015"),"#312 Kakashi reward projection self-heal missing");
assert(kv2Rewards.includes("Field Recovery Pill")&&kv2Rewards.includes("authoritativeProjectionRepaired"),"#312 MI authoritative reward projection must expose the locked item package");
assert(kv2Rewards.includes("renderVictoryOverlay36015"),"#312 Victory screen must consume the authoritative Kakashi reward projection");

assert(battle.includes("installFormationStage33000"),"#312 shared Battle owner is missing Formation Stage composition");
assert(battle.includes("getBattleDeploymentParticipant")&&battle.includes("deployedFormation33000"),"#312 Formation Stage must consume deployed participant truth");
assert(battle.includes('return peak<=1?"duel":peak>=4?"arc":"wedge"'),"#312 adaptive duel / wedge / arc formation modes missing");
assert(battle.includes('"SKILLS"')&&battle.includes('"ITEMS"')&&battle.includes('"SUMMONS"')&&battle.includes("primary.length===3"),"#312 primary action dock must be exactly Skills / Items / Summons");
assert(battle.includes("battle2-formation-withdraw")&&battle.includes("invokeBattleWithdrawAction"),"#312 Withdraw semantic action must remain available outside the primary dock");
assert(battle.includes("selectedTargetRef")&&battle.includes("formationNodeForRef33000"),"#312 contextual exact-target formation focus missing");
assert(battle.includes('stage.dataset.formationTray="closed"'),"#312 action playback must contract the secondary tray");
assert(battle.includes('data-formation-hidden="true"')||battle.includes('dataset.formationHidden="true"'),"#312 undeployed/reserve formation furniture is not being suppressed");

assert(battleSource.includes("resolveBattlePerformanceProjection33000"),"#312 shared Battle performance projection missing");
assert(battleSource.includes("currentBattle.runtime")||battleSource.includes("ensureBattleRuntimeState"),"#312 Battle performance must read canonical runtime evidence");
assert(!/function resolveBattlePerformanceProjection33000[\s\S]*?resolveBattleDamagePacket/.test(battleSource),"#312 presentation projection must not resolve damage");
for(const token of ["PHYSICAL_STRIKE","HEAVY_STRIKE","PROJECTILE","CHAKRA_RANGED","AREA_ATTACK","GUARD","EVADE","SUBSTITUTION","HEAL","BUFF","DEBUFF","RESTRAINT","SUMMON","ENVIRONMENTAL","TRANSFORMATION","DEFEAT"]){
  assert(battleSource.includes(token),"#312 Battle presentation class missing "+token);
}
assert(battleSource.includes("resolveUIPortraitProjection")&&battleSource.includes("resolveBattleEnemyPortraitProjection"),"#312 Battle staging must use Battle portrait authority");
assert(battleSource.includes("applyBattlePerformanceRoles33000")&&battleSource.includes(".battle-live-active-card-player")&&battleSource.includes(".battle-live-active-card-enemy"),"#312 Battle performance must promote canonical combatants");
{
  const start=battleSource.indexOf("function battlePerformanceMarkup33000");
  const end=battleSource.indexOf("function battlePerformanceRoleNode33000",start);
  const markupSource=battleSource.slice(start,end);
  assert(start>=0&&end>start&&!markupSource.includes("<img"),"#312 Battle performance must not duplicate actor/target portrait images");
  assert(!markupSource.includes("<b>")&&!markupSource.includes("<em>"),"#312 factual result/delta must not remain in a persistent center receipt");
}
assert(battleSource.includes("function battlePerformanceResultChip33000")&&battleSource.includes('targetNode.appendChild(chip)'),"#312 factual Battle result must attach to the exact target presentation");
assert(battleSource.includes("function battlePerformanceRoleNode33000")&&battleSource.includes("participantId")&&battleSource.includes("getBattleDeploymentParticipant")&&battleSource.includes("data-slot"),"#312 Battle performance role lookup must resolve exact participant identity, including deployed off-slot targets");
assert(battleSource.includes(".battle2-performance-stage.is-settled{opacity:0"),"#312 compact action identity must clear after playback");
assert(battleSource.includes("},920);"),"#312 Battle formation-stage playback must settle within the authorised short playback window");
assert(!battleSource.includes(".battle2-modern.battle2-performance-active .battle-live-active-card-player{left:5.5%"),"#312 Battle playback must not shove the duel formation outward to make room for a center panel");
assert(battleSource.includes("host.dataset.actionId===p.actionId"),"#312 stale Battle performance settle must not clear a newer action");
assert(battleSource.includes("suspendCallerStoryPresentation33000")&&battleSource.includes("markStoryPresentationHidden33900"),"#312 Story-called Battle must suspend the shared Story presentation layer");

const storyOwner=ownership.responsibilities.find(x=>x.responsibilityId==="story.scene.presentation.shared");
const battleOwner=ownership.responsibilities.find(x=>x.responsibilityId==="battle.presentation.shared");
assert(storyOwner&&storyOwner.canonicalOwner==="runtime/alpha-story-scene-board-33900.js","#312 shared Story owner drift");
assert(battleOwner&&battleOwner.canonicalOwner==="runtime/alpha-battle-modern-33000.js","#312 shared Battle owner drift");
assert((battleOwner.stateWrites||[]).length===0,"#312 Battle presentation must not write semantic state");

assert(kv2Core.includes('"v2_watch_exchange"')&&kv2Core.includes('"v2_stop_assassin_setup"'),"#312 Kakashi Sakura benchmark route missing");
assert(kv2Battle.includes("academy_kakashi_origin_battle_seq_mi"),"#312 MI sequential benchmark Battle config missing");

// Executable Story ordering probe: cue stepping may be presentation-only; once
// cues are exhausted, semantic advancement must happen synchronously.
{
  let semanticAdvanceCount=0;
  const runtime={sceneId:"qa_scene",beatId:"beat_a",localContext:{}};
  const beat={beatId:"beat_a",nextBeatId:"beat_b"};
  const def={beatMap:new Map([["beat_a",beat],["beat_b",{beatId:"beat_b",exitScene:true}]])};
  const ctx={
    console:{log(){},warn(){},error(){}},globalThis:null,
    getActiveStorySceneRuntime:()=>runtime,
    getStorySceneDefinition:()=>def,
    renderStoryScenePresentationLayer:()=>true,
    advanceStoryScene:()=>{semanticAdvanceCount+=1;runtime.beatId="beat_b";return{success:true,beatId:"beat_b"};},
    savePlayerData:()=>true,
    cloneProgressionData:v=>JSON.parse(JSON.stringify(v)),
    queueMicrotask:fn=>fn(),
    setTimeout,clearTimeout,Map,Set,Object,Array,String,Number,Boolean,JSON,Math
  };
  ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(storySource,ctx,{filename:"alpha-story-scene-board-33900.js"});
  ctx.registerStorySceneBoardDefinition("qa_scene",{performanceSequences:{beat_a:[{kind:"narration",text:"A"},{kind:"narration",text:"B"}]}});
  const first=ctx.advanceStoryScene();
  assert(first&&first.semanticBeatUnchanged===true&&semanticAdvanceCount===0,"#312 cue advance committed Story truth");
  const second=ctx.advanceStoryScene();
  assert(second&&second.success===true&&semanticAdvanceCount===1&&runtime.beatId==="beat_b","#312 semantic advancement was delayed/blocked by presentation");
}

// Executable Battle projection probes: the visual layer must derive its result
// from existing evidence and target refs without mutating the resolver.
{
  const actor={id:"actor",name:"Kakashi Hatake"};
  const target={id:"target",name:"Masked Interceptor"};
  const runtime={evidence:[]};
  const ctx={
    console:{log(){},warn(){},error(){}},window:null,globalThis:null,document:undefined,
    currentBattle:{battleId:"battle312",runtime,activePlayer:actor,enemy:target},
    selectedEnemy:target,
    ensureBattleRuntimeState:()=>runtime,
    getBattleParticipantByIdentity:(side,id)=>id==="actor"?actor:id==="target"?target:null,
    resolveUIPortraitProjection:()=>({path:"Assets/UI Portraits/academy_kakashi.png"}),
    resolveBattleEnemyPortraitProjection:()=>({path:"NPC portrait/masked_interceptor.png"}),
    renderCombatOverlay:()=>true,
    activateBattlePreparedSkillCard:()=>true,
    escapeStorySceneHTML:s=>String(s),
    setTimeout,clearTimeout,Map,Set,Object,Array,String,Number,Boolean,JSON,Math
  };
  ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(battleSource,ctx,{filename:"alpha-battle-modern-33000.js"});

  runtime.evidence=[
    {battleId:"battle312",evidenceId:"e1",eventType:"action_attempted",actionId:"a1",actorRef:{side:"player",participantId:"actor"},targetRef:{side:"enemy",participantId:"target"},data:{actionClass:"prepared_skill"}},
    {battleId:"battle312",evidenceId:"e2",eventType:"damage_resolved",actionId:"a1",actorRef:{side:"player",participantId:"actor"},targetRef:{side:"enemy",participantId:"target"},skillId:"academy_kakashi_test_strike",data:{primaryDiscipline:"Taijutsu",finalDamage:12,remainingBattlePLBefore:40,remainingBattlePLAfter:28}},
    {battleId:"battle312",evidenceId:"e3",eventType:"skill_action_completed",actionId:"a1",actorRef:{side:"player",participantId:"actor"},targetRef:{side:"enemy",participantId:"target"},skillId:"academy_kakashi_test_strike",data:{resolved:true,damageApplied:true,finalDamage:12}}
  ];
  let p=ctx.resolveBattlePerformanceProjection33000();
  assert(p.result==="HIT"&&p.presentationClass==="PHYSICAL_STRIKE"&&p.beforePL===40&&p.afterPL===28&&p.finalDamage===12,"#312 HIT projection incorrect");
  assert(p.exactTarget===true&&p.targetRef.participantId==="target","#312 exact target ref lost");

  runtime.evidence=[
    {battleId:"battle312",evidenceId:"s1",eventType:"action_attempted",actionId:"s1",actorRef:{side:"enemy",participantId:"target"},targetRef:{side:"player",participantId:"actor"},data:{actionClass:"enemy_authored_action"}},
    {battleId:"battle312",evidenceId:"s2",eventType:"enemy_authored_action_completed",actionId:"s1",actorRef:{side:"enemy",participantId:"target"},targetRef:{side:"player",participantId:"actor"},skillId:"enemy_decoy_assassin_decoy_substitution",data:{resolved:true}}
  ];
  p=ctx.resolveBattlePerformanceProjection33000();
  assert(p.result==="SUBSTITUTION"&&p.presentationClass==="SUBSTITUTION"&&p.finalDamage===0,"#312 substitution projection guessed a hit");

  runtime.evidence=[
    {battleId:"battle312",evidenceId:"d1",eventType:"damage_resolved",actionId:"d1",actorRef:{side:"player",participantId:"actor"},targetRef:{side:"enemy",participantId:"target"},skillId:"finisher",data:{primaryDiscipline:"Taijutsu",finalDamage:9,remainingBattlePLBefore:9,remainingBattlePLAfter:0}},
    {battleId:"battle312",evidenceId:"d2",eventType:"skill_action_completed",actionId:"d1",actorRef:{side:"player",participantId:"actor"},targetRef:{side:"enemy",participantId:"target"},skillId:"finisher",data:{resolved:true,damageApplied:true,finalDamage:9}}
  ];
  p=ctx.resolveBattlePerformanceProjection33000();
  assert(p.result==="DEFEAT"&&p.afterPL===0,"#312 Battle defeat projection missing");
  assert(!JSON.stringify(p).includes('"death"'),"#312 Battle defeat presentation invented death");
}

console.log(JSON.stringify({
  pass:true,
  issue:312,
  storyOwner:"runtime/alpha-story-scene-board-33900.js",
  battleOwner:"runtime/alpha-battle-modern-33000.js",
  storySemanticCommitBeforeMotion:true,
  kakashiConsumesSharedChoreography:true,
  battleEvidenceProjection:{
    hit:true,
    substitution:true,
    defeat:true,
    exactTarget:true,
    semanticWriter:false
  },
  browserGoldenClaimed:false
},null,2));
