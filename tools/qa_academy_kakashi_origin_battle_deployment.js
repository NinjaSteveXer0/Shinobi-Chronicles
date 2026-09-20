#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const game=fs.readFileSync(path.join(root,"game.js"),"utf8");
const deployment=fs.readFileSync(path.join(root,"runtime","alpha-kakashi-origin-battle-deployment-34300.js"),"utf8");
const storage=new Map(),session=new Map();
const store=map=>({getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()});
const dummy=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null;},querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){},focus(){},click(){},innerHTML:"",textContent:"",value:"",checked:false,disabled:false});
const context={console:{log(){},info(){},warn(){},error(){},table(){}},localStorage:store(storage),sessionStorage:store(session),document:{getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return[];},createElement(){return dummy();},body:dummy(),head:dummy(),addEventListener(){},removeEventListener(){}},requestAnimationFrame(){return 0;},cancelAnimationFrame(){},alert(){},confirm(){return true;},prompt(){return null;},Image:function(){return dummy();},navigator:{userAgent:"node-kakashi-battle"},location:{reload(){},href:"http://localhost/"},addEventListener(){},removeEventListener(){},setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Object,Array,Set,Map,Number,String,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,Infinity,NaN};
context.window=context;context.globalThis=context;vm.createContext(context);
function run(src,file){return vm.runInContext(src,context,{filename:file});}
run(game,"game.js");
const genericBefore=JSON.parse(JSON.stringify(run(`({
  amt:enemyDatabase["anbu_style_operative"]||null,
  ps:enemyDatabase["fuinjutsu_smuggler"]||null,
  mi:enemyDatabase["decoy_assassin"]||null
})`,`generic-before.js`)));
run(deployment,"runtime/alpha-kakashi-origin-battle-deployment-34300.js");
const report=JSON.parse(JSON.stringify(run(`runAcademyKakashiOriginBattleDeployment34300Diagnostics()`,`diag.js`)));
assert.strictEqual(report.pass,true,`34300 diagnostics failed: ${report.failed.join(",")}`);
assert.strictEqual(report.configIds.length,10);
const exact=JSON.parse(JSON.stringify(run(`({
 amt:enemyDatabase["academy_kakashi_origin_amt"],
 ps:enemyDatabase["academy_kakashi_origin_package_smuggler"],
 mi:enemyDatabase["academy_kakashi_origin_masked_interceptor"],
 generic:{
   amt:enemyDatabase["anbu_style_operative"]||null,
   ps:enemyDatabase["fuinjutsu_smuggler"]||null,
   mi:enemyDatabase["decoy_assassin"]||null
 },
 configs:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.configs,
 configAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.configAuthorityCommit,
 sequentialRegistryAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.sequentialRegistryCommit,
 sequentialCombatAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.sequentialMiPsCombatCommit,
 amtRegistryAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.amtRegistryCommit,
 amtCombatAuthority:SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300.amtCombatCommit,
 launchType:typeof launchAcademyKakashiOriginPlBattle,
 pakkunActionType:typeof attemptAcademyKakashiPakkunBattleAction,
 projectorType:typeof projectAcademyKakashiOriginBattleResult,
 multiEnemyApi:typeof configureBattleEnemyParticipants
})`,`surface.js`)));
assert.strictEqual(exact.configAuthority,"3f7502e4b41b1f58c88fe83e89f9839ed0607ef4");
assert.strictEqual(exact.sequentialRegistryAuthority,"930c5048453d0034b2856ad3ddfa5ea65fdede7b");
assert.strictEqual(exact.sequentialCombatAuthority,"4ef10cc556790a35e692b6a10f2733846809b494");
assert.strictEqual(exact.amtRegistryAuthority,"0a0bbaf3c3c2395e22977a41da0892a209a73994");
assert.strictEqual(exact.amtCombatAuthority,"32f79944304ea30689d87a4b1f7b48f84fb2734e");

assert.strictEqual(exact.amt.calibratedBasePL,18);assert.deepStrictEqual(exact.amt.baseStats,{nin:14,tai:17,buki:19,fuin:10,kin:11,gen:13,stamina:17});
assert.strictEqual(exact.ps.calibratedBasePL,10);assert.deepStrictEqual(exact.ps.baseStats,{nin:9,tai:7,buki:8,fuin:11,kin:9,gen:6,stamina:10});
assert.strictEqual(exact.mi.calibratedBasePL,14);assert.deepStrictEqual(exact.mi.baseStats,{nin:11,tai:14,buki:15,fuin:8,kin:8,gen:10,stamina:13});
assert.strictEqual(exact.amt.image,"NPC portrait/anbu_marked_target.png");
assert.strictEqual(exact.ps.image,"NPC portrait/package_smuggler.png");
assert.strictEqual(exact.mi.image,"NPC portrait/masked_interceptor.png");
assert.strictEqual(exact.amt.provenance.combatSourceProfileId,"academy_kakashi_origin_amt");
assert.strictEqual(exact.amt.provenance.derivationProfileId,"anbu_style_operative");
assert.strictEqual(exact.ps.provenance.combatSourceProfileId,"academy_kakashi_origin_package_smuggler");
assert.strictEqual(exact.ps.provenance.derivationProfileId,"fuinjutsu_smuggler");
assert.strictEqual(exact.mi.provenance.combatSourceProfileId,"academy_kakashi_origin_masked_interceptor");
assert.strictEqual(exact.mi.provenance.derivationProfileId,"decoy_assassin");

assert.deepStrictEqual(exact.generic,genericBefore,"34300 must not mutate reusable generic opposition profiles");

const action=(row,id)=>row.authoredBattleActions.find(entry=>entry&&entry.id===id);
const amtWire=action(exact.amt,"enemy_anbu_style_operative_wire_capture");
const amtTanto=action(exact.amt,"enemy_anbu_style_operative_tanto_flash");
const psBurst=action(exact.ps,"enemy_fuinjutsu_smuggler_contraband_seal_burst");
const miBlade=action(exact.mi,"enemy_decoy_assassin_concealed_blade");
assert.strictEqual(amtWire.oncePerBattle,true);assert.ok(amtWire.traits.includes("movement_only_control"));assert.ok(amtWire.traits.includes("not_generic_stun"));
assert.strictEqual(amtTanto.authoredAttackPL,6);assert.strictEqual(amtTanto.conditionalBoostAttackPL,2);assert.strictEqual(amtTanto.conditionalBoostMarker,"silent_body_flicker_position");
assert.strictEqual(psBurst.authoredAttackPL,5);
assert.strictEqual(miBlade.authoredAttackPL,5);assert.strictEqual(miBlade.conditionalBoostAttackPL,2);assert.strictEqual(miBlade.conditionalBoostMarker,"false_retreat_opening");

assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_amt_ps_mi_3v1.opposition,["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_amt_ps_2v1.opposition,["academy_kakashi_origin_amt","academy_kakashi_origin_package_smuggler"]);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_ps_mi_2v1.opposition,["academy_kakashi_origin_package_smuggler","academy_kakashi_origin_masked_interceptor"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_ps_mi_2v1.timingGate,null);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_mi_1v1.opposition,["academy_kakashi_origin_masked_interceptor"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_mi_1v1.timingGate,null);
assert.deepStrictEqual(exact.configs.academy_kakashi_origin_battle_ps_1v1.opposition,["academy_kakashi_origin_package_smuggler"]);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_ps_1v1.timingGate,null);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_seq_mi.timingGate.maximumControllerActions,4);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_seq_ps.timingGate.maximumControllerActions,3);
assert.strictEqual(exact.configs.academy_kakashi_origin_battle_seq_amt_pakkun.timingGate,null);
assert.strictEqual(exact.launchType,"function");assert.strictEqual(exact.pakkunActionType,"function");assert.strictEqual(exact.projectorType,"function");assert.strictEqual(exact.multiEnemyApi,"function","existing Battle engine must expose multi-enemy composition API");
// Claimed PS Victory must survive a reload-style loss of the Kakashi-only
// deployment object and still use the real core caller restoration path.
run(fs.readFileSync(path.join(root,"runtime","alpha-alpha-sprint-33100.js"),"utf8"),"runtime/alpha-alpha-sprint-33100.js");
const claimedPsReturn=JSON.parse(JSON.stringify(run(`(()=>{
  const SCENE="origin_academy_kakashi_anbu_retrieval",KAK="academy_kakashi",PS="academy_kakashi_origin_package_smuggler";
  const qaNodes=new Map();
  const qaScreenOverlay={id:"screen-overlay",style:{display:"flex"},dataset:{},childNodes:[],innerHTML:"",setAttribute(){},querySelector(){return null;},querySelectorAll(){return[];}};
  qaNodes.set("screen-overlay",qaScreenOverlay);
  const priorGetElementById=document.getElementById,priorBodyAppend=document.body.appendChild;
  document.getElementById=id=>qaNodes.get(id)||priorGetElementById.call(document,id);
  document.body.appendChild=node=>{if(node&&node.id)qaNodes.set(node.id,node);return node;};
  unregisterStoryScene(SCENE);
  const registered=registerStoryScene({sceneId:SCENE,entryBeatId:"qa_ps_battle",beats:[
    {beatId:"qa_ps_battle",mode:"battle_transition",battle:{encounterId:"academy_kakashi_origin_battle_seq_ps",postBattleBeatId:"qa_ps_return",resultProjector:projectAcademyKakashiOriginBattleResult}},
    {beatId:"qa_ps_return",mode:"post_battle",onEnterConsequences:[{requestId:"qa_claimed_ps_return_consume",kind:"domain",resolve:()=>{
      const active=getActiveStorySceneRuntime(),authored=active&&active.battleResume&&active.battleResume.authored;
      if(!authored)return{success:false,reason:"qa_claimed_ps_authored_result_missing"};
      if(authored.battleConfigId!=="academy_kakashi_origin_battle_seq_ps"||authored.bindingRef!=="academy_kakashi.battle.stop_assassin_post_mi_ps")return{success:false,reason:"qa_claimed_ps_authored_result_mismatch"};
      active.localContext={...(active.localContext||{}),qaClaimedPsReturnConsumed:true};active.beatId="qa_ps_win";return{success:true};
    }}]},
    {beatId:"qa_ps_win",mode:"narration",text:"PS return restored.",nextBeatId:null}
  ]});
  if(!registered||registered.success!==true)return{success:false,reason:"qa_story_registration_failed"};
  playerData.storySceneRuntime={version:1,sequence:1,lastFeedbackReceipt:null,active:{instanceId:"qa-ps-return-instance",sceneId:SCENE,beatId:"qa_ps_battle",startedAt:Date.now(),sourceEventId:SCENE,sourceOpportunityId:null,returnContext:null,presentationUnderlay:null,localContext:{},processedConsequenceKeys:[],committedChoiceKeys:[],pendingBattle:{battleId:"qa-ps-claimed-return",sourceBeatId:"qa_ps_battle",postBattleBeatId:"qa_ps_return"},battleResume:null}};
  currentBattle.active=false;currentBattle.battleOver=true;currentBattle.battleId="qa-ps-claimed-return";currentBattle.encounterId="academy_kakashi_origin_battle_seq_ps";
  currentBattle.enemy=enemyDatabase[PS];selectedEnemy=currentBattle.enemy;currentBattle.outcome={type:"victory",completedAt:Date.now()};
  currentBattle.rewards={generated:true,claimed:true,ryo:50,exp:0,items:[],rareDrops:[],requiresExplicitPostClaimContinue:true};
  currentBattle.returnContext={type:"story_scene",sceneId:SCENE,sceneInstanceId:"qa-ps-return-instance",sourceBeatId:"qa_ps_battle",postBattleBeatId:"qa_ps_return",battleConfigId:"academy_kakashi_origin_battle_seq_ps",storyOccurrenceId:"qa-origin-ps-route",sourceAnchorRef:"AK_SA_022",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps",returnToken:"qa-ps-return-token"};
  currentBattle.kakashiOriginDeployment=null;currentBattle.runtime=null;
  const runtime=ensureBattleRuntimeState();runtime.evidence=[
    {eventType:"action_attempted",actionId:"qa-ps-a1",actorRef:{side:"player",participantId:KAK},targetRef:{side:"enemy",participantId:PS}},
    {eventType:"action_attempted",actionId:"qa-ps-a2",actorRef:{side:"player",participantId:KAK},targetRef:{side:"enemy",participantId:PS}}
  ];
  runtime.remainingPL.player[KAK]={maximum:20,current:12};runtime.remainingPL.enemy[PS]={maximum:10,current:0};
  runtime.actionOpportunityState.counters.player[KAK]=2;currentOverlayType="victory";
  const returned=continueAfterVictory(),active=getActiveStorySceneRuntime(),authored=active&&active.battleResume&&active.battleResume.authored;
  const storyLayer=qaNodes.get("story-scene-presentation-layer")||null;
  const result={success:returned&&returned.success===true,priority:returned&&returned.alpha33100StoryReturnPriority===true,beatId:active&&active.beatId,consumed:active&&active.localContext&&active.localContext.qaClaimedPsReturnConsumed===true,returnContextCleared:currentBattle.returnContext===null,recovered:currentBattle.kakashiOriginDeployment,authored,victorySurfaceReleased:qaScreenOverlay.style.display==="none"&&currentOverlayType===null,storyPresentationVisible:!!storyLayer&&storyLayer.style.display==="flex"&&String(storyLayer.innerHTML||"").includes("PS return restored."),presentationMetadata:returned&&returned.alpha33100VictorySurfaceReleased===true&&returned.alpha33100StoryPresentationRefreshed===true};
  document.getElementById=priorGetElementById;document.body.appendChild=priorBodyAppend;
  return result;
})()`,"claimed-ps-return.js")));
assert.strictEqual(claimedPsReturn.success,true,"claimed PS RETURN TO STORY failed through real core caller restoration");
assert.strictEqual(claimedPsReturn.priority,true,"33100 Story caller did not own claimed PS continuation");
assert.strictEqual(claimedPsReturn.beatId,"qa_ps_win");assert.strictEqual(claimedPsReturn.consumed,true);assert.strictEqual(claimedPsReturn.returnContextCleared,true);
assert.strictEqual(claimedPsReturn.victorySurfaceReleased,true,"claimed PS RETURN TO STORY left the Victory screen overlay visible");
assert.strictEqual(claimedPsReturn.storyPresentationVisible,true,"claimed PS RETURN TO STORY did not expose the resumed Story presentation");
assert.strictEqual(claimedPsReturn.presentationMetadata,true,"33100 claimed Story return did not report presentation teardown/refresh");
assert.strictEqual(claimedPsReturn.recovered.battleConfigId,"academy_kakashi_origin_battle_seq_ps");
assert.strictEqual(claimedPsReturn.recovered.bindingRef,"academy_kakashi.battle.stop_assassin_post_mi_ps");
assert.strictEqual(claimedPsReturn.recovered.playerActionOpportunityCount,2);
assert.strictEqual(claimedPsReturn.authored.battleOccurrenceId,"qa-ps-claimed-return");
assert.strictEqual(claimedPsReturn.authored.playerActionOpportunityCount,2);
assert.strictEqual(claimedPsReturn.authored.participants.find(row=>row.participantRef==="academy_kakashi_origin_package_smuggler").battleStatus,"defeated");
console.log(JSON.stringify({pass:true,patch:report.checks.patchId?"34300-v3":null,configCount:report.configIds.length,exactOccurrenceProfiles:true,npcBattlePortraitAuthority:true,genericProfilesPreserved:true,exactOppositionActions:true,directPSMI2v1:true,directMI1v1Untimed:true,directPS1v1Untimed:true,sequentialTimingPreserved:true,multiEnemyExistingApi:true,pakkunTemporaryActionSource:true,claimedPsReturnAfterReload:true,browserGoldenClaimed:false},null,2));