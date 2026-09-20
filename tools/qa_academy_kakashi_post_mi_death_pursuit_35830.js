#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE_ID="origin_academy_kakashi_anbu_retrieval";
const LIVE_SOURCE="kak_scene05a_w_choice",RESOLVER_SOURCE="kak_scene06a_w2c_scene7_pending",DKILL_SOURCE="kak_scene06a_w2c_deterministic_kill_pursuit_35810";
const MI="academy_kakashi_origin_masked_interceptor",PS="academy_kakashi_origin_package_smuggler",AMT="academy_kakashi_origin_amt";
const store=new Map();let ref=0,saves=0,launches=[],recoveryCalls=0;const materialStates={};
const participantStates={
 [MI]:{participantRef:MI,stateClass:"DEAD"},
 [PS]:{participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED"}
};
globalThis.playerData={};
globalThis.savePlayerData=()=>{saves+=1;return true;};
globalThis.SC_ALPHA_ORIGIN_32900={
 commitOccurrence(originId,occurrenceId,fact,links,meta){
  if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};
  const row={originId,occurrenceId,fact,links,meta};store.set(occurrenceId,row);return{success:true,record:row};
 },
 findOccurrence(id){return store.get(String(id||""))||null;}
};
globalThis.SC_STORY_DECISION_REALISATION_34000={
 stableRef(prefix,payload){return prefix+"::"+JSON.stringify(payload||{})+"::"+(++ref);},
 getStoryUnitSnapshot(){return{participantStates,materialStates};},
 recordParticipantClassification({participantRef,stateClass,resultRef}){participantStates[participantRef]={participantRef,stateClass,resultRef};return{success:true,resultRef,stateClass};},
 recordMaterialState({materialRef,stateRef,value}){materialStates[materialRef]={materialRef,stateRef,value:JSON.parse(JSON.stringify(value))};return{success:true,materialRef,stateRef,value};}
};
globalThis.SC_ALPHA_KAKASHI_BATTLE_DEPLOYMENT_34300={
 launchAcademyKakashiOriginPlBattle(spec){
  launches.push(JSON.parse(JSON.stringify(spec)));
  globalThis.currentBattle={active:true,battleOver:false,battleId:"qa-"+spec.battleConfigId,kakashiOriginDeployment:{battleConfigId:spec.battleConfigId}};
  return{success:true,battleId:"qa-"+spec.battleConfigId,battleConfigId:spec.battleConfigId};
 }
};
globalThis.projectAcademyKakashiOriginBattleResult=()=>globalThis.currentResult||null;
globalThis.commitAcademyKakashiFieldSecured35920=function(participantRef,spec={}){
 participantStates[participantRef]={participantRef,stateClass:"FIELD_SECURED_PENDING_COLLECTION",resultRef:"qa-field-secured-"+participantRef};
 return{success:true,occurrenceId:"qa-field-secured-"+participantRef,participantRef,stateClass:"FIELD_SECURED_PENDING_COLLECTION",locationRef:spec.locationRef||null};
};
globalThis.getAcademyKakashiFieldSecuredRefs35920=()=>Object.values(participantStates).filter(row=>row&&row.stateClass==="FIELD_SECURED_PENDING_COLLECTION").map(row=>row.participantRef);
globalThis.commitAcademyKakashiSingleTransfer35920=function(participantRef,destination){
 const stateClass=destination==="ANBU"?"ANBU_INSTITUTIONAL_CUSTODY":"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY";
 participantStates[participantRef]={participantRef,stateClass,resultRef:"qa-transfer-"+participantRef+"-"+destination};
 return{success:true,occurrenceId:"qa-transfer-"+participantRef+"-"+destination,stateClass};
};
globalThis.beginAcademyKakashiCollectionFromAmt35920=function(){
 participantStates[AMT]={participantRef:AMT,stateClass:"COLLECTED_ACTIVE_ESCORT",resultRef:"qa-amt-collected"};
 return{success:true,manifestId:"qa-collection-manifest",amtOccurrenceId:"qa-amt-collected",nextBeatId:"qa-collect-ps"};
};
globalThis.SC_ALPHA_KAKASHI_FIELD_SECURED_35920={beats:{collectPs:"qa-collect-ps"}};

globalThis.resolveAcademyKakashiSequentialPostPsPackageRecovery35600=function(explicitResult=null){
 recoveryCalls+=1;
 const parentId=String(active&&active.localContext&&(active.localContext.kakashiSequentialPackageOccurrenceId35100||active.localContext.kakashiSequentialPackageOccurrenceId)||"");
 const parent=store.get(parentId)||null,parentPackage=parent&&parent.fact&&parent.fact.packageState||{};
 if(!parent||parentPackage.objectRef!=="kakashi_origin_outer_route_packet"||String(parentPackage.currentHolderClass||parentPackage.custodyClass||"")!=="PACKAGE_SMUGGLER"){
   return{success:false,reason:"qa_ak_sa_033_parent_package_occurrence_missing",parentId};
 }
 participantStates[PS]={participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-ps-defeated"};
 const id="kak_seq_secure_package_after_ps";
 if(!store.has(id))store.set(id,{occurrenceId:id,fact:{factClass:"academy_kakashi_sequential_post_ps_package_recovery",storySceneInstanceId:active.instanceId,battleOccurrenceId:String((explicitResult||(active.battleResume&&active.battleResume.authored)||{}).battleOccurrenceId||""),parentOccurrenceRef:parentId,packageState:{objectRef:"kakashi_origin_outer_route_packet",previousHolderClass:"PACKAGE_SMUGGLER",currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON",packageRecovered:true}}});
 materialStates["kakashi_origin_outer_route_packet"]={materialRef:"kakashi_origin_outer_route_packet",stateRef:id,value:JSON.parse(JSON.stringify(store.get(id).fact.packageState))};
 active.localContext.kakashiSequentialPackageOccurrenceId=id;active.localContext.kakashiSequentialPackageOccurrenceId35100=id;
 return{success:true,recovered:true,packageOccurrenceId:id,parentOccurrenceId:parentId};
};

const liveBeat={beatId:LIVE_SOURCE,mode:"choice",choices:[
 {choiceId:"scene05aw_go_after_package_smuggler",label:"GO AFTER PACKAGE SMUGGLER",nextBeatId:LIVE_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-live-ps",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]},
 {choiceId:"scene05aw_go_after_anbu_marked_target",label:"GO AFTER ANBU MARKED TARGET",nextBeatId:LIVE_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-live-amt",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]}
]};
const resolverBeat={beatId:RESOLVER_SOURCE,mode:"choice",choices:[
 {choiceId:"scene06aw2c_postlethal_go_after_package_smuggler",label:"GO AFTER PACKAGE SMUGGLER",nextBeatId:RESOLVER_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-ps",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]},
 {choiceId:"scene06aw2c_postlethal_go_after_anbu_marked_target",label:"GO AFTER ANBU MARKED TARGET",nextBeatId:RESOLVER_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-amt",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]}
]};
const dkillBeat={beatId:DKILL_SOURCE,mode:"choice",choices:[
 {choiceId:"scene06aw2c_dkill_go_after_package_smuggler",label:"GO AFTER PACKAGE SMUGGLER",nextBeatId:DKILL_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-dps",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]},
 {choiceId:"scene06aw2c_dkill_go_after_anbu_marked_target",label:"GO AFTER ANBU MARKED TARGET",nextBeatId:DKILL_SOURCE,availability:()=>({available:true}),consequenceRequests:[{requestId:"pending-damt",kind:"domain",resolve:()=>({success:false,reason:"pending"})}]}
]};
const definition={sceneId:SCENE_ID,beatMap:new Map([[LIVE_SOURCE,liveBeat],[RESOLVER_SOURCE,resolverBeat],[DKILL_SOURCE,dkillBeat]])};
let active=null;
globalThis.launchStorySceneBattle=function(){
 const beat=definition.beatMap.get(active&&active.beatId);
 if(!beat||beat.mode!=="battle_transition"||!beat.battle||typeof beat.battle.launchResolver!=="function")return{success:false,reason:"qa_story_battle_transition_missing"};
 return beat.battle.launchResolver({active,returnContext:{postBattleBeatId:beat.battle.postBattleBeatId}});
};
globalThis.getStorySceneDefinition=id=>id===SCENE_ID?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;
globalThis.getStoryScenePerformance33900=()=>null;
globalThis.renderStoryScenePresentationLayer=()=>true;
globalThis.queueMicrotask=fn=>fn(); // settle runtime render/materialization synchronously in headless QA
globalThis.advanceStoryScene=function baseAdvance(choiceId=null){
 const beat=definition.beatMap.get(active.beatId);if(!beat)return{success:false,reason:"qa_beat_missing",beatId:active.beatId};
 if(beat.mode==="choice"){
  const row=(beat.choices||[]).find(x=>x&&x.choiceId===choiceId);if(!row)return{success:false,reason:"qa_choice_missing",choiceId};
  if(typeof row.availability==="function"&&!row.availability().available)return{success:false,reason:"qa_choice_unavailable"};
  for(const req of row.consequenceRequests||[]){if(typeof req.resolve==="function"){const out=req.resolve();if(!out||out.success!==true)return out||{success:false,reason:"qa_consequence_failed"};}}
  active.beatId=row.nextBeatId;return{success:true,beatId:active.beatId};
 }
 if(beat.mode==="battle_transition")return{success:false,reason:"qa_battle_transition_requires_simulated_return"};
 return{success:false,reason:"qa_base_nonchoice",beatId:active.beatId};
};

function death(id,deterministic=false){
 store.set(id,{occurrenceId:id,fact:{factClass:"mi_death",targetDeathConfirmed:true,selectedOutcomeRef:deterministic?"DETERMINISTIC_KILL_KILLED":"LETHAL_ATTEMPT_KILLED",semanticClass:deterministic?"KILL — GUARANTEED":"ATTEMPT TO KILL — RESOLVER-DETERMINED",packageState:{objectRef:"kakashi_origin_outer_route_packet",currentHolderClass:"PACKAGE_SMUGGLER",custodyClass:"PACKAGE_SMUGGLER",locationClass:"PS_PERSON",recovered:false}}});
}
function freshResolver(){
 death("mi-death-resolver",false);
 return{sceneId:SCENE_ID,instanceId:"qa-postmi-resolver",beatId:RESOLVER_SOURCE,localContext:{kakashiScene06AW2CResolutionOccurrenceId:"mi-death-resolver",kakashiScene06AW2CPackageAvailable:true,kakashiScene06AW2CAMTAvailable:true,kakashiScene05AWTurnCount:3},battleResume:{authored:null}};
}
function freshDet(){
 death("mi-death-det",true);
 return{sceneId:SCENE_ID,instanceId:"qa-postmi-det",beatId:DKILL_SOURCE,localContext:{kakashiDeterministicKillOccurrenceId:"mi-death-det",kakashiDeterministicKillPackageAvailable:true,kakashiDeterministicKillAmtAvailable:true,kakashiScene05AWTurnCount:2},battleResume:{authored:null}};
}
function drainNarration(target,max=120){
 let n=0;
 while(active.beatId!==target&&n++<max){
  const out=globalThis.advanceStoryScene();
  assert(out&&out.success===true,"narration advance failed before "+target+": "+JSON.stringify(out));
 }
 assert.strictEqual(active.beatId,target,"did not reach "+target);
}
function simulateBattleReturn(battleBeatId,result,returnBeatId){
 const beat=definition.beatMap.get(battleBeatId);assert(beat&&beat.battle,"battle beat missing "+battleBeatId);
 active.battleResume={authored:result};active.beatId=returnBeatId;
}

load("runtime/alpha-kakashi-post-mi-death-pursuit-35830.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_POST_MI_DEATH_PURSUIT_35830;
assert(MOD,"35830 module missing");
const diag=globalThis.runAcademyKakashiPostMiDeathPursuit35830Diagnostics();
assert.strictEqual(diag.pass,true,"35830 diagnostics failed: "+JSON.stringify(diag.failed));
const source35830=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-post-mi-death-pursuit-35830.js"),"utf8");
const source35600=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-sequential-post-ps-recovery-35600.js"),"utf8");
assert(source35830.includes('Kakashi Origin Backdrop/alleyway_konoha_night.png'),"AMT encounter must use exact alleyway_konoha_night backdrop");
assert(source35830.includes('Kakashi Origin Backdrop/konoha_alleyway_alt_night.png'),"PS Battle must use exact alternate-night alley backdrop");
assert.strictEqual(definition.beatMap.get(MOD.beats.psBattle).environmentRef.assetId,"kakashi_origin_ps_battle_alt_night","PS Battle beat must bind only the alternate-night Battle backdrop");
assert(source35830.includes('"Assets/Summons/pakkun.png"'),"Pakkun Story-scene summon asset path missing");
assert(!source35830.includes('"Portraits/Summons/pakkun.png"'),"Story scene must not reuse the Battle-only Pakkun portrait");
assert(source35830.includes("sc-postmi-summon-35830"),"Pakkun must render through the plain Story summon surface");
assert(source35830.includes("if(ref===PAKKUN)return"),"Pakkun must bypass generic Character Card markup");
assert(source35830.includes("!card(PAKKUN,\"PRESENT\",true).includes(\"sc-scene-board-33900__actor-frame\")"),"Pakkun regression guard must reject Character Card framing");
assert(source35830.includes("data-speaker-id=\'pakkun\'"),"Pakkun dialogue must have a speaker-specific safe-lane rule");
assert(source35830.includes("right:6%!important")&&source35830.includes("transform:none!important"),"Pakkun dialogue must use the authored right-side safe lane");
assert(source35830.includes("[data-sc-board-ui-mode=\'dialogue\']")&&source35830.includes("top:4%!important"),"post-MI dialogue safe lane must outrank global dialogue centering and clear Character Cards");
assert(source35830.includes("const prior=document.getElementById(STYLE_ID);if(prior)prior.remove()"),"post-MI style install must replace stale same-ID CSS");
assert(source35830.includes("You decided fast.")&&source35830.includes("That doesn\'t make it lighter."),"direct AMT KILL aftermath must include locked Pakkun/Kakashi continuation");
assert(source35830.includes('const TERMINAL_PENDING="kak_seq_debrief_pending"')&&source35830.includes("rt.beatId=TERMINAL_PENDING"),"direct AMT KILL must hand off to terminal report instead of dead-end boundary");
assert.strictEqual(diag.checks.laterDebriefBoundaryRemoved,true,"stale post-MI report blocker must be removed from executable route");
assert(source35830.includes('m.get(BEAT.psReport).nextBeatId=TERMINAL_PENDING')&&source35830.includes('m.get(BEAT.amtReport).nextBeatId=TERMINAL_PENDING'),"post-MI report boundaries must route into the live terminal owner");
assert(source35830.includes("You recovered it.")&&source35830.includes("You brought the original target back."),"exact PS/AMT ANBU return writing must be present");
assert(source35830.includes("We'll take custody.")&&source35830.includes("We'll take him."),"package-recovered and package-missing AMT Police handoffs must both be present");
assert(source35830.includes("commitInstitutionalTransfer35830")&&source35830.includes("transferPackageToAnbu35830"),"custody and package transfer must remain separate commits");
assert(source35830.includes("launchCurrentBattleTransition35830"),"PS/AMT battle auto-launch handoff missing");
assert(source35830.includes("postmi_35830_ps_return_consume")&&source35830.includes("postmi_35830_amt_return_consume"),"PS/AMT post-Battle return beats must own result consumption");
assert(source35830.includes("resume.projected")&&source35830.includes("scheduleReturnRetry35830"),"browser post-Battle return must tolerate projected-result timing without rendering a blank return beat");
assert(source35830.includes("packageRecoveryParentOccurrenceId35830")&&source35830.includes("post_mi_ps_package_recovery_parent_missing"),"PS post-Battle return must resolve an Origin-owned package parent before AK_SA_033");
assert(source35830.includes("resolveAcademyKakashiSequentialPostPsPackageRecovery35600(r)"),"post-MI PS return must pass the authoritative Battle result into AK_SA_033");
assert(source35830.includes("kakashiOriginStoryReturnResultSnapshot"),"post-MI return consumer must read the stable Battle-owned Story return result");
assert(!source35830.includes("continueAfterVictoryPostMiPs35830")&&!source35830.includes("PRE_CONTINUE_VICTORY_35830")&&!source35830.includes("globalThis.continueAfterVictory="),"post-MI route must not own or wrap global Victory navigation");
assert(source35600.includes("function resolveSequentialPostPsPackageRecovery35600(explicitResult=null)")&&source35600.includes('explicitResult&&typeof explicitResult==="object"?explicitResult:latestResult()'),"AK_SA_033 must accept an explicit authoritative Battle result while preserving legacy fallback");
const decoratedPsChoice={textContent:"◇OBJECTIVEGO AFTER PACKAGE SMUGGLER›",getAttribute(name){return name==="aria-label"?"GO AFTER PACKAGE SMUGGLER":null;}};
assert.strictEqual(MOD.choiceLabelFromButton(decoratedPsChoice),"GO AFTER PACKAGE SMUGGLER","decorated tactical choice must still resolve its authored label for the black wipe capture");
assert(source35830.includes("performKakashiSceneWipe33910")&&source35830.includes("decoratedChoiceLabel35830(t)"),"post-MI choice capture must retain the black wipe after 33910 decorates the button text");

participantStates[MI]={participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-live-mi"};
active={sceneId:SCENE_ID,instanceId:"qa-postmi-live",beatId:LIVE_SOURCE,localContext:{kakashiScene05AWEntered:true,kakashiScene05AWBattleOccurrenceId:"battle-mi-live",kakashiScene05AWTurnCount:3,kakashiScene05AWPackagePursuitEligible:true,kakashiScene05AWAmtPursuitEligible:true},battleResume:{authored:null}};
MOD.wireEntryChoices();
let out=globalThis.advanceStoryScene("scene05aw_go_after_package_smuggler");
assert.strictEqual(out.success,true,"live post-MI PS pursuit choice failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.beats.psChase,"live fast-win pursuit did not enter authored PS chase");
const liveSelection=store.get(active.localContext.kakashiPostMiPursuitSelectionOccurrenceId);
assert(liveSelection,"live pursuit selection occurrence missing");
assert.strictEqual(liveSelection.fact.miDeathAlreadyCommitted,false,"live pursuit falsely committed MI death");
assert.strictEqual(liveSelection.fact.sourceMiResolutionState,"DEFEATED_BUT_NOT_CONTROLLED");
assert.strictEqual(store.has("battle-mi-live"),false,"QA must model the live MI Battle id as NOT being an Origin occurrence");
assert.strictEqual(active.localContext.kakashiPostMiPackageOccurrenceId,active.localContext.kakashiPostMiPursuitSelectionOccurrenceId,"live pursuit must advance package provenance to the Origin-owned selection occurrence");

launches.length=0;
const psBattleClasses=new Set(),psBattleStyles=new Map();
const psBattleStage={classList:{toggle(name,on){if(on)psBattleClasses.add(name);else psBattleClasses.delete(name);},contains(name){return psBattleClasses.has(name);}}};
globalThis.document={
 head:{appendChild(node){psBattleStyles.set(node.id,node);node.remove=()=>psBattleStyles.delete(node.id);}},
 createElement(){return{id:"",textContent:"",remove(){if(this.id)psBattleStyles.delete(this.id);}};},
 getElementById(id){return psBattleStyles.get(id)||null;},
 querySelectorAll(selector){return selector===".alpha-code-battle-stage"?[psBattleStage]:[];}
};
drainNarration(MOD.beats.psBattle);
assert.strictEqual(launches.length,1,"live PS battle transition did not auto-launch exactly once");
assert(psBattleClasses.has("sc-kakashi-ps-battle-backdrop-35830"),"PS Battle launch must mark the live Battle stage with its route-specific backdrop class");
const psStyle=psBattleStyles.get("sc-kakashi-ps-battle-backdrop-35830-style");
assert(psStyle&&psStyle.textContent.includes("Kakashi Origin Backdrop/konoha_alleyway_alt_night.png"),"PS Battle stage style must project the exact approved alternate-night alley asset");
assert(globalThis.currentBattle&&globalThis.currentBattle.kakashiOriginBattleBackdrop&&globalThis.currentBattle.kakashiOriginBattleBackdrop.path==="Kakashi Origin Backdrop/konoha_alleyway_alt_night.png","PS Battle launch must carry exact backdrop metadata on the active Battle");
for(const beatId of [MOD.beats.psChase,MOD.beats.psFail,MOD.beats.psCatch,MOD.beats.psReturn,MOD.beats.psWin,MOD.beats.psLoss,MOD.beats.psDecision,MOD.beats.psReport]){
 const beat=definition.beatMap.get(beatId);
 assert(beat&&beat.environmentRef&&beat.environmentRef.assetId==="kakashi_origin_ps_battle_alt_night","PS Story beat must stay on approved alternate-night alley: "+beatId);
}
const postMiSource=fs.readFileSync(path.resolve(process.cwd(),"runtime/alpha-kakashi-post-mi-death-pursuit-35830.js"),"utf8");
assert(postMiSource.includes('psStreet:PS_BATTLE_BACKDROP_PATH'),"PS Story renderer must use the exact PS alternate-night backdrop path");
assert(postMiSource.includes('"KONOHA ALLEY · NIGHT"'),"PS Story location chip must identify the alley, not the old street presentation");
delete globalThis.document;
assert.strictEqual(active.localContext.kakashiPostMiPackageOccurrenceId,active.localContext.kakashiPostMiPursuitResolutionOccurrenceId,"reached PS pursuit must advance package provenance to the Origin-owned pursuit-resolution occurrence");
simulateBattleReturn(MOD.beats.psBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps",battleOccurrenceId:"qa-live-ps-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.psReturn);
const livePsReturnBeat=definition.beatMap.get(MOD.beats.psReturn);
const livePsReturned=livePsReturnBeat.onEnterConsequences.find(x=>x.requestId==="postmi_35830_ps_return_consume").resolve();
assert.strictEqual(livePsReturned.success,true,"live MI -> PS Battle return must not depend on an Origin occurrence for the earlier MI Battle id: "+JSON.stringify(livePsReturned));
assert.strictEqual(active.beatId,MOD.beats.psWin,"live MI -> PS Battle return must resume authored PS victory Story");
assert.strictEqual(store.get("kak_seq_secure_package_after_ps").fact.parentOccurrenceRef.includes("occ_origin_kakashi_post_mi_ps_battle_return"),true,"AK_SA_033 must consume an Origin-owned PS Battle-return package parent");
// Installed-browser caller teardown must not destroy the PS result needed by the real 35830 consumer.
store.delete("kak_seq_secure_package_after_ps");recoveryCalls=0;
participantStates[MI]={participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-browser-mi"};
participantStates[PS]={participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-browser-ps"};
active={sceneId:SCENE_ID,instanceId:"qa-browser-postmi-ps",beatId:LIVE_SOURCE,localContext:{kakashiScene05AWEntered:true,kakashiScene05AWBattleOccurrenceId:"qa-browser-mi-battle",kakashiScene05AWTurnCount:2,kakashiScene05AWPackagePursuitEligible:true,kakashiScene05AWAmtPursuitEligible:true},battleResume:{authored:null}};
MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene05aw_go_after_package_smuggler");assert.strictEqual(out.success,true);
launches.length=0;drainNarration(MOD.beats.psBattle);assert.strictEqual(launches.length,1);
const browserPsResult={battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps",battleOccurrenceId:"qa-browser-ps-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]};
globalThis.currentResult=null;
globalThis.currentBattle={active:false,battleOver:true,battleId:"qa-browser-ps-battle",encounterId:"academy_kakashi_origin_battle_seq_ps",outcome:{type:"victory"},rewards:{generated:true,claimed:true,ryo:50,requiresExplicitPostClaimContinue:true},returnContext:null,kakashiOriginStoryReturnResultSnapshot:JSON.parse(JSON.stringify(browserPsResult))};
active.battleResume=null;active.beatId=MOD.beats.psReturn;
const browserReturnBeat=definition.beatMap.get(MOD.beats.psReturn);
const browserPsReturned=browserReturnBeat.onEnterConsequences.find(x=>x.requestId==="postmi_35830_ps_return_consume").resolve();
assert.strictEqual(browserPsReturned.success,true,"real 35830 PS return could not consume the stable Battle result after caller teardown: "+JSON.stringify(browserPsReturned));
assert.strictEqual(active.beatId,MOD.beats.psWin,"real PS return did not advance into the authored PS victory continuation");
assert.strictEqual(store.get("kak_seq_secure_package_after_ps").fact.packageState.currentHolderClass,"KAKASHI","real PS return did not commit package recovery");

store.delete("kak_seq_secure_package_after_ps");recoveryCalls=0;
participantStates[MI]={participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-browser-mi"};
participantStates[PS]={participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-browser-ps"};
active={sceneId:SCENE_ID,instanceId:"qa-browser-postmi-ps",beatId:LIVE_SOURCE,localContext:{kakashiScene05AWEntered:true,kakashiScene05AWBattleOccurrenceId:"qa-browser-mi-battle",kakashiScene05AWTurnCount:2,kakashiScene05AWPackagePursuitEligible:true,kakashiScene05AWAmtPursuitEligible:true},battleResume:{authored:null}};
MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene05aw_go_after_package_smuggler");assert.strictEqual(out.success,true);
launches.length=0;drainNarration(MOD.beats.psBattle);assert.strictEqual(launches.length,1);
const browserPsResult={battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps",battleOccurrenceId:"qa-browser-ps-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]};
globalThis.currentResult=browserPsResult;
globalThis.currentBattle={active:false,battleOver:true,battleId:"qa-browser-ps-battle",encounterId:"academy_kakashi_origin_battle_seq_ps",outcome:{type:"victory"},rewards:{generated:true,claimed:true,ryo:50,requiresExplicitPostClaimContinue:true},returnContext:{type:"story_scene",sceneId:SCENE_ID,sceneInstanceId:active.instanceId,sourceBeatId:MOD.beats.psBattle,postBattleBeatId:MOD.beats.psReturn,battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps"}};
const qaVictoryOverlay={style:{display:"flex"}},priorDocument35830=globalThis.document;
globalThis.document={getElementById(id){return id==="screen-overlay"?qaVictoryOverlay:null;}};
globalThis.currentOverlayType="victory";
globalThis.resumeBattleCallerAfterCompletion=function(){
 active.battleResume=null;active.beatId=MOD.beats.psReturn;globalThis.currentBattle.returnContext=null;globalThis.currentResult=null;
 const returnBeat=definition.beatMap.get(MOD.beats.psReturn);
 const duringResume=returnBeat.onEnterConsequences.find(x=>x.requestId==="postmi_35830_ps_return_consume").resolve();
 if(!duringResume||duringResume.success!==true||duringResume.pending===true)return{success:false,reason:"qa_core_resume_on_enter_failed",duringResume};
 return{success:true,type:"story_scene",postBattleBeatId:MOD.beats.psReturn,duringResume};
};
const browserPsReturned=globalThis.continueAfterVictory();
assert.strictEqual(browserPsReturned.success,true,"real 35830 RETURN TO STORY bridge failed: "+JSON.stringify(browserPsReturned));
assert.strictEqual(browserPsReturned.postMiPsReturnBridge35830,true,"real PS return did not use the late route bridge");
assert.strictEqual(browserPsReturned.postMiPsResultSnapshotCaptured,true,"real PS return did not snapshot the result before caller teardown");
assert.strictEqual(browserPsReturned.postMiPsResultVisibleDuringCoreResume,true,"real PS return did not expose the pre-resume result during core Story resume");
assert(browserPsReturned.duringResume&&browserPsReturned.duringResume.success===true,"core Story resume did not consume the PS result during on-enter");
assert.strictEqual(active.beatId,MOD.beats.psWin,"real PS RETURN TO STORY did not consume the authored return beat");
assert.strictEqual(store.get("kak_seq_secure_package_after_ps").fact.packageState.currentHolderClass,"KAKASHI","real PS return did not commit package recovery");
assert.strictEqual(qaVictoryOverlay.style.display,"none","real PS RETURN TO STORY left Victory visible");
assert.strictEqual(globalThis.currentOverlayType,null,"real PS RETURN TO STORY left Victory as the active overlay");
if(priorDocument35830===undefined)delete globalThis.document;else globalThis.document=priorDocument35830;

store.delete("kak_seq_secure_package_after_ps");
participantStates[PS]={participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED"};
recoveryCalls=0;

participantStates[MI]={participantRef:MI,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-live-mi-amt"};
active={sceneId:SCENE_ID,instanceId:"qa-postmi-live-amt",beatId:LIVE_SOURCE,localContext:{kakashiScene05AWEntered:true,kakashiScene05AWBattleOccurrenceId:"battle-mi-live",kakashiScene05AWTurnCount:4,kakashiScene05AWPackagePursuitEligible:true,kakashiScene05AWAmtPursuitEligible:true},battleResume:{authored:null}};
MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene05aw_go_after_anbu_marked_target");
assert.strictEqual(out.success,true,"live post-MI AMT pursuit choice failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.beats.amtChase,"live fast-win AMT pursuit did not enter authored AMT chase");
assert.strictEqual(active.localContext.kakashiPostMiPsPursuitClosedPermanently,true,"live direct AMT fork did not close PS pursuit");

participantStates[MI]={participantRef:MI,stateClass:"DEAD"};
active=freshResolver();MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene06aw2c_postlethal_go_after_package_smuggler");
assert.strictEqual(out.success,true,"PS pursuit choice failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.beats.psChase);
assert.strictEqual(participantStates[MI].stateClass,"DEAD","MI death was rewritten by successor entry");
const deathCount=[...store.values()].filter(x=>x&&x.fact&&x.fact.factClass==="mi_death").length;

launches.length=0;
drainNarration(MOD.beats.psBattle);
assert.strictEqual(launches.length,1,"PS battle transition did not auto-launch exactly once");
assert.strictEqual(launches[0].battleConfigId,"academy_kakashi_origin_battle_seq_ps");
simulateBattleReturn(MOD.beats.psBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps",battleOccurrenceId:"qa-ps-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.psReturn);
const psReturnBeat=definition.beatMap.get(MOD.beats.psReturn);assert(psReturnBeat&&Array.isArray(psReturnBeat.onEnterConsequences),"PS return beat missing on-enter consumer");
out=psReturnBeat.onEnterConsequences.find(x=>x.requestId==="postmi_35830_ps_return_consume").resolve();
assert.strictEqual(out.success,true,"PS Battle return failed through owned return beat: "+JSON.stringify(out));
assert.strictEqual(out.victory,true);
assert.strictEqual(out.amtEligible,true,"2-turn PS victory must preserve AMT reach");
assert.strictEqual(recoveryCalls,1,"AK_SA_033 package recovery was not invoked");
assert.strictEqual(active.localContext.kakashiPostMiPackageOccurrenceId,"kak_seq_secure_package_after_ps");
assert.strictEqual(store.get("kak_seq_secure_package_after_ps").fact.packageState.currentHolderClass,"KAKASHI");
assert.strictEqual(participantStates[PS].stateClass,"DEFEATED_BUT_NOT_CONTROLLED");

drainNarration(MOD.beats.psDecision);
let psChoices=definition.beatMap.get(MOD.beats.psDecision).choices;
assert.deepStrictEqual(psChoices.map(x=>x.label),["GO AFTER ANBU MARKED TARGET","KILL HIM","RETURN TO ANBU","RESTRAIN HIM AND CONTINUE"]);
assert.strictEqual(psChoices.find(x=>x.label==="RESTRAIN HIM AND CONTINUE").availability().available,true,"Closed #281 authority must make PS restrain-and-continue live");
const directPsKill=globalThis.advanceStoryScene("postmi_ps_kill");
assert.strictEqual(directPsKill.success,true,"ordinary defeated PS must allow direct KILL without hidden control state");
assert.strictEqual(participantStates[PS].stateClass,"DEAD");
assert.strictEqual(active.beatId,MOD.beats.psDecision);

out=globalThis.advanceStoryScene("postmi_ps_go_amt");
assert.strictEqual(out.success,true);
assert.strictEqual(active.localContext.kakashiPostMiPakkunPresent,true,"PS->AMT choice must commit legitimate Pakkun reach before his authored reveal");
launches.length=0;
drainNarration(MOD.beats.amtBattle);
assert.strictEqual(launches.length,1,"PS->AMT battle transition did not auto-launch exactly once");
assert.strictEqual(launches[0].battleConfigId,"academy_kakashi_origin_battle_seq_amt_pakkun");
assert.strictEqual(launches[0].pakkunAuthorized,true);
simulateBattleReturn(MOD.beats.amtBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",battleOccurrenceId:"qa-amt-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.amtReturn);
out=MOD.consumeAmtReturn();
assert.strictEqual(out.success,true,"AMT Battle return failed: "+JSON.stringify(out));
assert.strictEqual(participantStates[AMT].stateClass,"CONTROLLED_DEFEATED");
participantStates[AMT]={participantRef:AMT,stateClass:"DEFEATED_BUT_NOT_CONTROLLED",resultRef:"qa-amt-ordinary-defeat"};
drainNarration(MOD.beats.amtDecision);
let amtChoices=definition.beatMap.get(MOD.beats.amtDecision).choices;
assert.deepStrictEqual(amtChoices.map(x=>x.label),["BRING HIM TO THE UCHIHA POLICE FORCE","LET HIM GO","KILL HIM","TAKE HIM BACK TO THE ANBU"]);
assert(amtChoices.every(x=>x.availability().available===true),"closed AMT disposition surface must be fully live");
assert(!amtChoices.some(x=>String(x.label||"").includes("ATTEMPT TO")),"AMT dispositions must not be renamed by hidden control classification");

out=globalThis.advanceStoryScene("postmi_amt_kill");
assert.strictEqual(out.success,true);
assert.strictEqual(active.beatId,MOD.beats.amtReport,"PS->AMT deterministic kill should not borrow direct-AMT missing-package narration");
assert.strictEqual(participantStates[AMT].stateClass,"DEAD","deterministic AMT KILL did not commit death");
assert.strictEqual(store.get(active.localContext.kakashiPostMiPackageOccurrenceId).fact.packageState.currentHolderClass,"KAKASHI","AMT kill rewrote package custody");
assert.strictEqual([...store.values()].filter(x=>x&&x.fact&&x.fact.factClass==="mi_death").length,deathCount,"MI death was recommitted/rerolled");

// Singular PS return-to-ANBU must not commit custody until the rooftop handoff.
active=freshDet();active.instanceId="qa-postmi-ps-anbu";participantStates[MI]={participantRef:MI,stateClass:"DEAD"};participantStates[PS]={participantRef:PS,stateClass:"DEFEATED_BUT_NOT_CONTROLLED"};launches.length=0;recoveryCalls=0;
MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene06aw2c_dkill_go_after_package_smuggler");assert.strictEqual(out.success,true);
drainNarration(MOD.beats.psBattle);
simulateBattleReturn(MOD.beats.psBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_ps",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_ps",battleOccurrenceId:"qa-ps-anbu-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:PS,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.psReturn);
out=MOD.consumePsReturn();assert.strictEqual(out.success,true);
drainNarration(MOD.beats.psDecision);
out=globalThis.advanceStoryScene("postmi_ps_return_anbu");assert.strictEqual(out.success,true);
assert.strictEqual(active.beatId,MOD.beats.psAnbuEscort);
assert.notStrictEqual(participantStates[PS].stateClass,"ANBU_INSTITUTIONAL_CUSTODY","PS custody committed at RETURN TO ANBU choice");
drainNarration("kak_seq_debrief_pending");
assert.strictEqual(participantStates[PS].stateClass,"ANBU_INSTITUTIONAL_CUSTODY","PS ANBU custody missing after physical handoff");
assert.strictEqual(materialStates["kakashi_origin_outer_route_packet"].value.custodyClass,"ANBU","PS route package was not separately returned to ANBU");

active=freshDet();participantStates[MI]={participantRef:MI,stateClass:"DEAD"};delete participantStates[AMT];launches.length=0;
MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene06aw2c_dkill_go_after_anbu_marked_target");
assert.strictEqual(out.success,true,"direct AMT choice failed: "+JSON.stringify(out));
assert.strictEqual(active.localContext.kakashiPostMiPsPursuitClosedPermanently,true,"direct AMT fork did not close PS pursuit");
assert.strictEqual(active.localContext.kakashiDeterministicKillPackageAvailable,false,"direct AMT fork left PS route open");
drainNarration(MOD.beats.amtBattle);
assert.strictEqual(active.localContext.kakashiPostMiPakkunPresent,true);
assert.strictEqual(launches.length,1,"direct AMT battle transition did not auto-launch exactly once");
assert.strictEqual(launches[0].battleConfigId,"academy_kakashi_origin_battle_seq_amt_pakkun");
assert.strictEqual(launches[0].pakkunAuthorized,true);
assert.strictEqual(store.get(active.localContext.kakashiPostMiPackageOccurrenceId).fact.packageState.currentHolderClass,"PACKAGE_SMUGGLER","direct AMT pursuit fabricated package transfer");

active.battleResume={authored:{battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",battleOccurrenceId:"qa-amt-loss",resultState:"opposition_side_victory",playerActionOpportunityCount:2,participants:[]}};
active.beatId=MOD.beats.amtReturn;active.localContext.kakashiPostMiAmtReturnProcessed=false;
const loss=MOD.consumeAmtReturn();
assert.strictEqual(loss.success,false);
assert.strictEqual(loss.reason,"post_mi_amt_defeat_requires_package_and_pakkun_autonomy_resolution","AMT defeat must fail closed until package + Pakkun autonomy resolve");

active=freshDet();active.instanceId="qa-postmi-direct-kill";participantStates[MI]={participantRef:MI,stateClass:"DEAD"};delete participantStates[AMT];launches.length=0;
MOD.wireEntryChoices();
out=globalThis.advanceStoryScene("scene06aw2c_dkill_go_after_anbu_marked_target");
assert.strictEqual(out.success,true,"direct AMT kill test pursuit entry failed: "+JSON.stringify(out));
drainNarration(MOD.beats.amtBattle);
simulateBattleReturn(MOD.beats.amtBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",battleOccurrenceId:"qa-direct-amt-kill-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.amtReturn);
out=MOD.consumeAmtReturn();assert.strictEqual(out.success,true,"direct AMT victory return failed: "+JSON.stringify(out));
drainNarration(MOD.beats.amtDecision);
out=globalThis.advanceStoryScene("postmi_amt_kill");
assert.strictEqual(out.success,true,"direct AMT KILL choice failed: "+JSON.stringify(out));
assert.strictEqual(active.beatId,MOD.beats.amtKill,"direct AMT KILL must enter authored kill aftermath before report");
assert.notStrictEqual(participantStates[AMT].stateClass,"DEAD","direct AMT KILL must not commit death before the authored kill performance");
drainNarration("kak_seq_debrief_pending");
assert.strictEqual(participantStates[AMT].stateClass,"DEAD","direct AMT KILL must commit death when the authored kill performance completes");
assert.strictEqual(active.beatId,"kak_seq_debrief_pending","direct AMT KILL aftermath must hand off to terminal debrief");

// Direct AMT live return uses exact escort/handoff and explicit Pakkun departure.
active=freshDet();active.instanceId="qa-postmi-amt-anbu";participantStates[MI]={participantRef:MI,stateClass:"DEAD"};delete participantStates[AMT];delete participantStates["pakkun_origin_unfamiliar_ninken"];launches.length=0;
MOD.wireEntryChoices();out=globalThis.advanceStoryScene("scene06aw2c_dkill_go_after_anbu_marked_target");assert.strictEqual(out.success,true);
drainNarration(MOD.beats.amtBattle);
simulateBattleReturn(MOD.beats.amtBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",battleOccurrenceId:"qa-amt-anbu-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.amtReturn);
out=MOD.consumeAmtReturn();assert.strictEqual(out.success,true);drainNarration(MOD.beats.amtDecision);
out=globalThis.advanceStoryScene("postmi_amt_return_anbu");assert.strictEqual(out.success,true);assert.strictEqual(active.beatId,MOD.beats.amtLiveReturn);
assert.notStrictEqual(participantStates[AMT].stateClass,"ANBU_INSTITUTIONAL_CUSTODY","AMT custody committed before handoff");
drainNarration("kak_seq_debrief_pending");
assert.strictEqual(participantStates[AMT].stateClass,"ANBU_INSTITUTIONAL_CUSTODY");
assert.strictEqual(participantStates["pakkun_origin_unfamiliar_ninken"].stateClass,"DEPARTED");

// Direct AMT Police handoff must commit custody only after its exact transfer performance.
active=freshDet();active.instanceId="qa-postmi-amt-police";participantStates[MI]={participantRef:MI,stateClass:"DEAD"};delete participantStates[AMT];delete participantStates["pakkun_origin_unfamiliar_ninken"];launches.length=0;
MOD.wireEntryChoices();out=globalThis.advanceStoryScene("scene06aw2c_dkill_go_after_anbu_marked_target");assert.strictEqual(out.success,true);
drainNarration(MOD.beats.amtBattle);
simulateBattleReturn(MOD.beats.amtBattle,{battleConfigId:"academy_kakashi_origin_battle_seq_amt_pakkun",bindingRef:"academy_kakashi.battle.stop_assassin_post_mi_amt",battleOccurrenceId:"qa-amt-police-battle",resultState:"player_side_victory",playerActionOpportunityCount:2,participants:[{participantRef:AMT,battleStatus:"defeated",lifeState:"unresolved",custodyState:"unresolved"}]},MOD.beats.amtReturn);
out=MOD.consumeAmtReturn();assert.strictEqual(out.success,true);drainNarration(MOD.beats.amtDecision);
out=globalThis.advanceStoryScene("postmi_amt_police");assert.strictEqual(out.success,true);assert.strictEqual(active.beatId,MOD.beats.amtPoliceEscort);
assert.notStrictEqual(participantStates[AMT].stateClass,"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY","AMT Police custody committed on choice click");
drainNarration("kak_seq_debrief_pending");
assert.strictEqual(participantStates[AMT].stateClass,"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY");
assert.strictEqual(participantStates["pakkun_origin_unfamiliar_ninken"].stateClass,"DEPARTED");

assert(saves>0);
console.log("Academy Kakashi post-MI-death pursuit 35830 QA: PASS");
console.log("- live fast-win PS pursuit and post-kill PS/AMT pursuit entries use direct authored successor routing");
console.log("- committed MI death is never rerolled across lethal successor selection");
console.log("- PS route uses sequential PS Battle config, exact alternate-night Story/Battle backdrop, and separate AK_SA_033 package recovery");
console.log("- <=3 PS victory preserves AMT route; PS direct KILL works from ordinary defeated state");
console.log("- PS and AMT battle-transition beats auto-launch through canonical Story Battle authority");
console.log("- legitimate AMT reach commits Pakkun, reveals Assets/Summons/pakkun.png on-cue, and uses alleyway_konoha_night");
console.log("- legitimate AMT reach commits Pakkun and uses sequential AMT+Pakkun config");
console.log("- AMT victory exposes the live direct disposition family; closed #281 no longer leaves restraint/transfer placeholders");
console.log("- deterministic AMT KILL preserves package custody");
console.log("- direct AMT fork permanently closes PS pursuit and KILL reaches terminal debrief");
console.log("- AMT defeat refuses to invent object/Pakkun autonomy resolution");
