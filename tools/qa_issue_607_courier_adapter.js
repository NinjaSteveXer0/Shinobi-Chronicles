"use strict";
const assert=require("assert");
const path=require("path");

function resetGlobals(){
  global.playerData={ryo:0,activityHistory:[],inventory:[]};
  global.enemyDatabase={};
  global.currentBattle=null;
  global.__saved=0;global.__testSaved=0;global.__overlay=null;global.__legacyResumeCalls=0;
  global.savePlayerData=()=>{global.__saved+=1;return true;};
  global.saveTestState=()=>{global.__testSaved+=1;return true;};
  global.openOverlay=(name)=>{global.__overlay=name;return true;};
  global.addItemToInventory=(item)=>{global.playerData.inventory.push({id:item.id,name:item.name||item.id,quantity:1});return true;};
  const known=new Set(["academy_kakashi","academy_hinata","academy_menma","academy_mirai"]);
  global.getPlayerCharacter=(id)=>known.has(id)?{id,name:id,power:20,stats:{stamina:20}}:null;
  global.buildReusableRogueGeninOppositionActions399=({participantId})=>({
    actions:[{id:"enemy_rogue_genin_kunai_rush"},{id:"enemy_rogue_genin_shuriken_spread"},{id:"enemy_rogue_genin_substitution_feint"}],
    expireFeint(){return !!participantId;}
  });
  global.createBattleDeploymentSlots=(ids)=>ids.map((participantId,index)=>({slot:index+1,participantId}));
  global.configureBattleEnemyParticipants=(ids)=>{global.currentBattle.enemyParticipants=ids.map(id=>global.enemyDatabase[id]).filter(Boolean);global.currentBattle.enemy=global.currentBattle.enemyParticipants[0]||null;};
  global.syncBattleActivePlayerFromDeployment=()=>{const id=global.currentBattle.deployment.player.slots[0]?.participantId;global.currentBattle.activePlayer=global.getPlayerCharacter(id);return global.currentBattle.activePlayer;};
  global.syncBattleActiveEnemyFromDeployment=()=>{const id=global.currentBattle.deployment.enemy.slots[0]?.participantId;global.currentBattle.enemy=global.enemyDatabase[id]||null;return global.currentBattle.enemy;};
  global.initializeBattleContributionRecordsFromDeployment=()=>{const c={};for(const s of global.currentBattle.deployment.player.slots||[])c[s.participantId]={damage:0,attacks:0};global.currentBattle.contributions=c;return c;};
  global.initializeBattleRemainingPLFromDeployment=()=>{global.currentBattle.__remaining=global.currentBattle.__remaining||{player:{},enemy:{}};for(const s of global.currentBattle.deployment.player.slots||[])global.currentBattle.__remaining.player[s.participantId]=20;for(const s of global.currentBattle.deployment.enemy.slots||[])global.currentBattle.__remaining.enemy[s.participantId]=23;return true;};
  global.getBattleRemainingPL=(side,id)=>{const row=global.currentBattle&&global.currentBattle.__remaining&&global.currentBattle.__remaining[side];return row&&row[id]!==undefined?row[id]:0;};
  global.createBattleParticipantRef=(side,participantId)=>({side,participantId});
  let evidenceCounter=0;
  global.recordBattleEvidence=(definition)=>{const row={evidenceId:`ev_${++evidenceCounter}`,...definition};global.currentBattle.runtime=global.currentBattle.runtime||{evidence:[]};global.currentBattle.runtime.evidence.push(row);return row;};
  global.launchBattleWithReturnContext=(enemyId,encounterId,returnContext)=>{
    global.currentBattle={active:true,battleOver:false,battleId:`legacy_${Date.now()}`,encounterId,returnContext:JSON.parse(JSON.stringify(returnContext)),deployment:{player:{slots:[]},enemy:{slots:[]}},runtime:{evidence:[]},contributions:{},rewards:{generated:false,claimed:false,ryo:0,exp:0,items:[],rareDrops:[]},outcome:null};
    return{success:true,battleId:global.currentBattle.battleId,encounterId,enemyId};
  };
  global.resumeFieldReadinessAssessmentFromBattle=(ctx)=>{global.__legacyResumeCalls+=1;return{success:true,legacy:true,ctx};};
  global.chooseEnemyAuthoredBattleAction=()=>({success:true,legacy:true});
}

resetGlobals();
const modulePath=path.resolve(process.argv[2]||path.join(__dirname,"../runtime/alpha-promotion-courier-assessment-60310.js"));
delete require.cache[require.resolve(modulePath)];
const api=require(modulePath);

function ok(result,label){assert(result&&result.success===true,`${label}: ${JSON.stringify(result)}`);return result;}
function occurrence(id){const row=api.getOccurrence(id);assert(row,`missing occurrence ${id}`);return row;}
function toRavine(id,participants=["academy_kakashi","academy_hinata","academy_menma"]){
  ok(api.createOccurrence({assessmentAttemptId:id,assessmentSubjectStableId:participants[0],attemptParticipantRefs:participants}),`${id} create`);
  ok(api.commitBriefing(id),`${id} briefing`);
  ok(api.advanceJourney(id,"KON-P10"),`${id} gate out`);
  ok(api.advanceJourney(id,"whisper_woods"),`${id} woods out`);
  ok(api.advanceJourney(id,"fire_whisper_woods_north_ravine"),`${id} ravine`);
  ok(api.resolveSearch(id,"agen_m01_search_follow_fresh_sign_v1"),`${id} search`);
  ok(api.resolvePriority(id,"agen_m01_priority_secure_dispatch_v1"),`${id} secure`);
}
function confirm(id,refs=["academy_kakashi","academy_hinata"]){
  return ok(api.confirmHostileContact(id,{directContactParticipantRefs:refs,participantControlClassByRef:Object.fromEntries(refs.map(r=>[r,"player"])),participantPositionRefs:Object.fromEntries(refs.map(r=>[r,"fire_whisper_woods_north_ravine::direct_contact"]))}),`${id} contact`);
}
function returnToKonoha(id,{courierOutcome="recovered_with_team"}={}){
  ok(api.beginExtraction(id,{courierOutcome}),`${id} begin extraction`);
  ok(api.advanceJourney(id,"whisper_woods"),`${id} return woods`);
  ok(api.advanceJourney(id,"KON-P10"),`${id} return gate`);
  ok(api.advanceJourney(id,"KON-P01"),`${id} admin return`);
}
function rewardTotals(){
  const rows=global.playerData.activityHistory.filter(r=>r.type==="promotion_assessment_reward");
  return{rows,ryo:global.playerData.ryo,pills:global.playerData.inventory.filter(i=>i.id==="field_recovery_pill").length};
}

// Non-Battle full success: 150 + 100 + one pill, never the optional Battle reward.
toRavine("attempt-nonbattle");
confirm("attempt-nonbattle");
ok(api.resolveNonBattleContact("attempt-nonbattle","agen_m01_contact_extract_under_cover_v1","clean_extraction"),"nonbattle resolver");
returnToKonoha("attempt-nonbattle");
ok(api.handoffDispatch("attempt-nonbattle"),"nonbattle handoff");
ok(api.commitDebrief("attempt-nonbattle",{reportRef:"qa_nonbattle_report"}),"nonbattle debrief");
ok(api.commitTerminal("attempt-nonbattle",api.terminalStates.COMPLETE),"nonbattle terminal");
let totals=rewardTotals();
assert.strictEqual(totals.ryo,250);
assert.strictEqual(totals.pills,1);
assert(!totals.rows.some(r=>r.rewardSourceId===api.rewardSourceIds.BATTLE));
const fullCount=totals.rows.length,fullRyo=totals.ryo,fullPills=totals.pills;
global.playerData=JSON.parse(JSON.stringify(global.playerData));
const terminalAgain=ok(api.commitTerminal("attempt-nonbattle",api.terminalStates.COMPLETE),"reload idempotence");
assert.strictEqual(terminalAgain.idempotent,true);
totals=rewardTotals();assert.strictEqual(totals.ryo,fullRyo);assert.strictEqual(totals.pills,fullPills);assert.strictEqual(totals.rows.length,fullCount);

// Hold-Line: direct-contact subset only, exact return context, separate +50 once.
toRavine("attempt-battle");
confirm("attempt-battle",["academy_kakashi","academy_hinata"]);
const beforeBattleRyo=global.playerData.ryo;
const launch=ok(api.launchHoldLineBattle("attempt-battle"),"battle launch");
assert.deepStrictEqual(launch.participantRefs,["academy_kakashi","academy_hinata"]);
assert(!launch.participantRefs.includes("academy_menma"));
assert(!launch.participantRefs.includes(api.courierRef));assert(!launch.participantRefs.includes(api.dispatchRef));assert(!launch.participantRefs.includes(api.examinerRef));
global.currentBattle.contributions.academy_kakashi={damage:9,attacks:2};
global.currentBattle.contributions.academy_hinata={damage:4,attacks:1};
global.currentBattle.runtime.evidence.push({evidenceId:"ev_kakashi_hit",actionId:"academy_kakashi_kunai_quickdraw",actorRef:{side:"player",participantId:"academy_kakashi"},targetRef:{side:"enemy",participantId:api.rogueRef},eventType:"damage_applied",data:{damage:9,effective:true}},{evidenceId:"ev_hinata_guard",actionId:"academy_hinata_twin_palm_guard",actorRef:{side:"player",participantId:"academy_hinata"},eventType:"guard_resolved",data:{resolved:true}});
global.currentBattle.__remaining.player.academy_kakashi=12;global.currentBattle.__remaining.player.academy_hinata=18;global.currentBattle.__remaining.enemy[api.rogueRef]=0;global.currentBattle.outcome={type:"victory"};
const envelope=api.projectLiveBattleReturn();assert.strictEqual(envelope.rogueBattlePLDepleted,true);assert.strictEqual(envelope.subjectCombatEvidenceSummary.subjectWasBattleParticipant,true);assert(!Object.prototype.hasOwnProperty.call(envelope.subjectCombatEvidenceSummary,"combatReadinessSatisfied"));
const ctx=JSON.parse(JSON.stringify(global.currentBattle.returnContext));
const applied=ok(global.resumeFieldReadinessAssessmentFromBattle(ctx),"battle caller resume");
assert.strictEqual(applied.type,"field_readiness_assessment_resumed");assert.strictEqual(global.currentBattle.returnContext,null);assert.strictEqual(applied.missionObjectiveCompleted,null);assert.strictEqual(global.playerData.ryo,beforeBattleRyo+50);
const battleOcc=occurrence("attempt-battle");assert.strictEqual(battleOcc.currentHost,"fire_whisper_woods_north_ravine");assert.strictEqual(battleOcc.dispatch.custodyState,"agen_m01_dispatch_team_controlled_custody_v1");assert.strictEqual(battleOcc.courier.state,"agen_m01_courier_found_injured_stable_v1");
const afterBattleReward=global.playerData.ryo;ok(api.applyBattleReturn("attempt-battle",envelope),"battle replay");assert.strictEqual(global.playerData.ryo,afterBattleReward);

// Defeat: no fixed Battle Ryō and no automatic mission failure.
toRavine("attempt-defeat");confirm("attempt-defeat",["academy_kakashi"]);const beforeDefeat=global.playerData.ryo;ok(api.launchHoldLineBattle("attempt-defeat"),"defeat launch");global.currentBattle.__remaining.player.academy_kakashi=0;global.currentBattle.__remaining.enemy[api.rogueRef]=10;global.currentBattle.outcome={type:"defeat"};ok(api.applyBattleReturn("attempt-defeat",api.projectLiveBattleReturn()),"defeat return");const defeatOcc=occurrence("attempt-defeat");assert.strictEqual(global.playerData.ryo,beforeDefeat);assert.strictEqual(defeatOcc.missionObjectiveCompleted,null);assert.strictEqual(defeatOcc.status,"active");

// Partial value: dispatch-only = 150; courier-only = 100.
toRavine("attempt-dispatch-only");confirm("attempt-dispatch-only");ok(api.resolveNonBattleContact("attempt-dispatch-only","agen_m01_contact_use_ravine_route_v1","courier_cannot_continue"),"dispatch-only result");returnToKonoha("attempt-dispatch-only",{courierOutcome:"unrecovered"});const beforeDispatch=global.playerData.ryo;ok(api.handoffDispatch("attempt-dispatch-only"),"dispatch-only handoff");assert.strictEqual(global.playerData.ryo,beforeDispatch+150);ok(api.commitDebrief("attempt-dispatch-only"),"dispatch-only debrief");ok(api.commitTerminal("attempt-dispatch-only",api.terminalStates.FAILED),"dispatch-only fail");assert(!global.playerData.activityHistory.some(r=>r.assessmentAttemptId==="attempt-dispatch-only"&&r.rewardSourceId===api.rewardSourceIds.COURIER));

toRavine("attempt-courier-only");confirm("attempt-courier-only");ok(api.resolveNonBattleContact("attempt-courier-only","agen_m01_contact_extract_under_cover_v1","dispatch_lost"),"courier-only lost dispatch");returnToKonoha("attempt-courier-only");const courierRows=global.playerData.activityHistory.filter(r=>r.assessmentAttemptId==="attempt-courier-only");assert(courierRows.some(r=>r.rewardSourceId===api.rewardSourceIds.COURIER));assert(!courierRows.some(r=>r.rewardSourceId===api.rewardSourceIds.DISPATCH));ok(api.commitDebrief("attempt-courier-only"),"courier-only debrief");ok(api.commitTerminal("attempt-courier-only",api.terminalStates.FAILED),"courier-only fail");

// Same North Ravine geography does not touch Arc-1 state.
global.playerData.arc1Sentinel={arc1_m1_whisper_major_contact:"UNTOUCHED",rewardReceipt:"UNTOUCHED"};const arc1Before=JSON.stringify(global.playerData.arc1Sentinel);toRavine("attempt-arc1-firewall",["academy_mirai"]);assert.strictEqual(JSON.stringify(global.playerData.arc1Sentinel),arc1Before);

// Non-#603 legacy field-readiness return delegates unchanged.
const legacy=global.resumeFieldReadinessAssessmentFromBattle({type:"field_readiness_assessment",assessmentId:"legacy",attemptId:"legacy"});assert.strictEqual(legacy.legacy,true);assert.strictEqual(global.__legacyResumeCalls,1);
const rank=api.projectRankEvidence("attempt-battle");assert(!Object.prototype.hasOwnProperty.call(rank,"combatReadinessSatisfied"));assert(!Object.prototype.hasOwnProperty.call(rank,"promotionPassed"));
const diag=api.runDiagnostics();assert.strictEqual(diag.pass,true,JSON.stringify(diag));assert.strictEqual(diag.browserGoldenClaimed,false);

console.log(JSON.stringify({pass:true,diagnostics:diag,fullNonBattle:{ryo:250,pill:1},battle:{participants:launch.participantRefs,battleRewardRyo:50,missionObjectiveAfterVictory:applied.missionObjectiveCompleted},defeat:{battleRewardRyo:0,missionObjective:defeatOcc.missionObjectiveCompleted,status:defeatOcc.status},partialValue:{dispatchOnly:150,courierOnly:100},arc1Firewall:true,browserGoldenClaimed:false},null,2));
