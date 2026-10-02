#!/usr/bin/env node
"use strict";

const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const ROOT=path.resolve(__dirname,"..");
const SRC=fs.readFileSync(path.join(ROOT,"runtime/alpha-first-live-ce-hotspot-46900.js"),"utf8");
const MANIFEST=fs.readFileSync(path.join(ROOT,"runtime/alpha-chronicle-state-manifest-43600.js"),"utf8");
const INDEX=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");

assert(INDEX.includes('runtime/alpha-first-live-ce-hotspot-46900.js'),"#469 runtime is not production-loaded");
assert(MANIFEST.includes('stateDomainId:"originParticipantContinuity"'),"Chronicle State manifest missing continuity domain");
assert(MANIFEST.includes("commitOriginParticipantContinuity46900"),"manifest does not bind #469 continuity writer");
assert(SRC.includes('const EVENT_ID="konoha_ce_kakashi_masked_interceptor_admin_crossing_v1"'));
assert(SRC.includes('const HOST_ID="KON-P01"'));
assert(SRC.includes('const MI_ID="academy_kakashi_origin_masked_interceptor"'));
assert(!SRC.includes('label:"ATTACK"')&&!SRC.includes('label:"Attack"'),"ATTACK leaked into #469 player choice surface");
assert(!/Math\.random|randomUUID|crypto\.random/.test(SRC),"#469 eligibility/history family may not be random");

function basePlayer(){
  return{
    activityHistory:[],
    phase2ChronicleState:{
      schemaVersion:1,
      tutorialProgress:{schemaVersion:1},
      originParticipantContinuity:{
        schemaVersion:1,
        byStableParticipantId:{
          academy_kakashi_origin_masked_interceptor:{
            schemaVersion:1,
            originId:"academy_kakashi",
            stableParticipantId:"academy_kakashi_origin_masked_interceptor",
            sourceContinuityId:"origin_participant_continuity::academy_kakashi::academy_kakashi_origin_masked_interceptor",
            originStorySceneInstanceId:"qa-origin",
            encounteredByProtagonist:true,
            fieldDispositionState:"RELEASED",
            fieldDispositionOccurrenceRef:"qa-release",
            survivedOrigin:true,
            hiddenPostTestReviewReached:true,
            postTestTruthClass:"staged_konoha_test_participant",
            protagonistKnowsTestTruth:false,
            materialHistoryRefs:["qa-release"],
            exactHistorySignals:{deliberateRelease:true},
            rememberedHistoryFamily:"deliberate_release",
            capturedAt:1000,
            sourceKind:"qa_exact_origin_projection"
          }
        }
      }
    },
    acquisition:{
      chronicleOriginVariantId:"academy_kakashi",
      chronicleOriginOwnedCharacterId:"owned_academy_kakashi",
      chronicleOrigin:{variantId:"academy_kakashi",prologueCompleted:true},
      activeKonohaEntered:true,
      onboardingStatus:"academy_free_play",
      academyTeamFormation:{
        completed:true,continuationCompleted:true,
        confirmationReceipt:{commitId:"team469",originVariantId:"academy_kakashi",teamVariantIds:["academy_kakashi","academy_hinata","academy_obito"]}
      }
    },
    worldEventRuntime:{
      worldLifecycleByEventId:{},
      observerDiscoveryByOpportunityId:{},
      actionabilityByOpportunityId:{},
      trackingByOpportunityId:{},
      resolutionByOpportunityId:{}
    },
    storySceneRuntime:{schemaVersion:1,sequence:0,active:null}
  };
}
function makeContext(){
  const playerData=basePlayer();
  const registeredOpportunities=new Map(),registeredScenes=new Map();
  const characters={
    academy_kakashi:{id:"academy_kakashi",name:"Kakashi",image:"Assets/Academy Student/academy_kakashi.png"},
    academy_hinata:{id:"academy_hinata",name:"Hinata",image:"qa-hinata.png"},
    academy_obito:{id:"academy_obito",name:"Obito",image:"qa-obito.png"}
  };
  const context={
    console:{log(){},warn(){},error(){},info(){}},Date,Math,JSON,Object,Array,Number,String,Set,Map,
    playerData,
    savePlayerData(){},
    ensurePlayerAcquisitionState(){return playerData.acquisition;},
    isAcademyFreePlayAvailable(){return true;},
    getChronicleCurrentTeam43600(){return{schemaVersion:1,assignmentId:"team469",originVariantId:"academy_kakashi",teamVariantIds:["academy_kakashi","academy_hinata","academy_obito"],committed:true};},
    ensurePhase2ChronicleState43600(){return playerData.phase2ChronicleState;},
    getPlayerCharacter(id){return characters[id]||null;},
    getActiveStorySceneRuntime(){return playerData.storySceneRuntime.active;},
    getAcademyKakashiV2State36020(){return context.__activeKakashiState||null;},
    completeChronicleOriginPrologue(originId){
      playerData.acquisition.chronicleOriginVariantId=originId;
      playerData.acquisition.chronicleOrigin={variantId:originId,prologueCompleted:true};
      return{success:true,originVariantId:originId};
    },
    registerWorldEventOpportunity(def){registeredOpportunities.set(def.opportunityId,def);return{success:true,opportunity:def};},
    getRegisteredWorldEventOpportunity(id){return registeredOpportunities.get(id)||null;},
    getWorldEventDimensionState(dimension,key){
      const table=playerData.worldEventRuntime[dimension]||(playerData.worldEventRuntime[dimension]={});
      return table[key]||{};
    },
    setWorldEventLifecycle(id,patch){playerData.worldEventRuntime.worldLifecycleByEventId[id]={...(playerData.worldEventRuntime.worldLifecycleByEventId[id]||{}),...JSON.parse(JSON.stringify(patch))};return playerData.worldEventRuntime.worldLifecycleByEventId[id];},
    setOpportunityDiscovery(id,patch){playerData.worldEventRuntime.observerDiscoveryByOpportunityId[id]={...(playerData.worldEventRuntime.observerDiscoveryByOpportunityId[id]||{}),...JSON.parse(JSON.stringify(patch))};return playerData.worldEventRuntime.observerDiscoveryByOpportunityId[id];},
    setOpportunityActionability(id,patch){playerData.worldEventRuntime.actionabilityByOpportunityId[id]={...(playerData.worldEventRuntime.actionabilityByOpportunityId[id]||{}),...JSON.parse(JSON.stringify(patch))};return playerData.worldEventRuntime.actionabilityByOpportunityId[id];},
    setOpportunityTracking(id,patch){playerData.worldEventRuntime.trackingByOpportunityId[id]={...(playerData.worldEventRuntime.trackingByOpportunityId[id]||{}),...JSON.parse(JSON.stringify(patch))};return playerData.worldEventRuntime.trackingByOpportunityId[id];},
    setOpportunityResolution(id,patch){playerData.worldEventRuntime.resolutionByOpportunityId[id]={...(playerData.worldEventRuntime.resolutionByOpportunityId[id]||{}),...JSON.parse(JSON.stringify(patch))};return playerData.worldEventRuntime.resolutionByOpportunityId[id];},
    registerStoryScene(def){registeredScenes.set(def.sceneId,def);return{success:true,sceneId:def.sceneId};},
    unregisterStoryScene(id){registeredScenes.delete(id);return true;},
    startStoryScene(sceneId,options){
      const def=registeredScenes.get(sceneId);if(!def)return{success:false,reason:"missing_scene"};
      playerData.storySceneRuntime.active={
        instanceId:"scene469-1",sceneId,beatId:options.entryBeatId||def.entryBeatId,
        sourceEventId:options.sourceEventId||null,sourceOpportunityId:options.sourceOpportunityId||null,
        localContext:JSON.parse(JSON.stringify(options.context||{})),processedConsequenceKeys:[],committedChoiceKeys:[]
      };
      return{success:true,sceneId,beatId:playerData.storySceneRuntime.active.beatId};
    },
    renderAlphaKonohaVillageHotspots(){return '<button class="village-golden-halo konoha-v3-anchor" data-village-hotspot-id="KON-P01" aria-label="Hokage Administration. Double-click to enter."><span class="village-golden-halo-label">Hokage Administration</span></button>';},
    activateAlphaKonohaV3PublicLocation(){return{success:false,reason:"base_static"};}
  };
  context.globalThis=context;
  context.__registeredOpportunities=registeredOpportunities;
  context.__registeredScenes=registeredScenes;
  vm.runInContext(SRC,vm.createContext(context),{filename:"alpha-first-live-ce-hotspot-46900.js"});
  return context;
}

const c=makeContext();
const classify=c.classifyMaskedInterceptorHistory46900;
const cases=[
  [{lethalAttempt:true,fieldDispositionState:"ESCAPED"},"lethal_attempt"],
  [{policeTransfer:true,fieldDispositionState:"POLICE_CUSTODY"},"uchiha_police_transfer"],
  [{restraintOrAnbu:true,fieldDispositionState:"ANBU_CUSTODY"},"restraint_anbu_collection"],
  [{deliberateRelease:true,fieldDispositionState:"RELEASED"},"deliberate_release"],
  [{miDefeatedKakashi:true,fieldDispositionState:"ESCAPED"},"mi_defeated_kakashi"],
  [{kakashiDefeatedMI:true,fieldDispositionState:"BATTLE_DEFEATED"},"kakashi_defeated_mi"],
  [{fieldDispositionState:"ENCOUNTERED"},"other_material_encounter"]
];
for(const [input,expected] of cases)assert.strictEqual(classify(input),expected,"history family drifted for "+expected);
assert.strictEqual(classify({lethalAttempt:true,policeTransfer:true}),"lethal_attempt","precedence drift: lethal must beat Police");
assert.strictEqual(classify({policeTransfer:true,restraintOrAnbu:true}),"uchiha_police_transfer","precedence drift: Police must beat ANBU/restraint");

let gate=c.evaluateFirstLiveCEHotspotEligibility46900();
assert.strictEqual(gate.eligible,true,JSON.stringify(gate));
assert.deepStrictEqual(JSON.parse(JSON.stringify(gate.currentTeam.teamVariantIds)),["academy_kakashi","academy_hinata","academy_obito"]);
assert.strictEqual(gate.continuity.currentWorldAvailable,true);

// Historical custody remains history, not automatic current unavailability after hidden review.
const continuity=c.playerData.phase2ChronicleState.originParticipantContinuity.byStableParticipantId.academy_kakashi_origin_masked_interceptor;
continuity.fieldDispositionState="POLICE_CUSTODY";
continuity.survivedOrigin=true;
continuity.rememberedHistoryFamily="uchiha_police_transfer";
gate=c.evaluateFirstLiveCEHotspotEligibility46900();
assert.strictEqual(gate.eligible,true,"historical Police field custody falsely became current unavailability: "+JSON.stringify(gate));

continuity.fieldDispositionState="ANBU_CUSTODY";
continuity.rememberedHistoryFamily="restraint_anbu_collection";
gate=c.evaluateFirstLiveCEHotspotEligibility46900();
assert.strictEqual(gate.eligible,true,"historical ANBU field custody falsely became current unavailability: "+JSON.stringify(gate));

// KILLED is terminal.
continuity.fieldDispositionState="KILLED";continuity.survivedOrigin=false;
gate=c.evaluateFirstLiveCEHotspotEligibility46900();
assert.strictEqual(gate.eligible,false);assert(gate.reasons.includes("masked_interceptor_killed"));

// UNSEEN blocks recognition.
continuity.fieldDispositionState="UNSEEN";continuity.survivedOrigin=true;continuity.encounteredByProtagonist=false;
gate=c.evaluateFirstLiveCEHotspotEligibility46900();
assert.strictEqual(gate.eligible,false);assert(gate.reasons.includes("masked_interceptor_unseen"));

// Restore eligible exact release state.
Object.assign(continuity,{
  fieldDispositionState:"RELEASED",survivedOrigin:true,encounteredByProtagonist:true,
  hiddenPostTestReviewReached:true,protagonistKnowsTestTruth:false,rememberedHistoryFamily:"deliberate_release"
});
gate=c.evaluateFirstLiveCEHotspotEligibility46900();
assert.strictEqual(gate.eligible,true);

// Later explicit unavailability blocks; remove it afterward.
c.playerData.activityHistory.push({
  id:"later-mi-unavailable",occurrenceId:"later-mi-unavailable",committed:true,timestamp:2000,type:"world_participant_state",
  data:{stableParticipantId:"academy_kakashi_origin_masked_interceptor",worldAvailabilityState:"UNAVAILABLE"}
});
gate=c.evaluateFirstLiveCEHotspotEligibility46900();
assert.strictEqual(gate.eligible,false);assert(gate.reasons.includes("masked_interceptor_later_unavailable"));
c.playerData.activityHistory=[];

// Build the actual scene from exact current team.
const started=c.startFirstLiveCEHotspot46900();
assert.strictEqual(started.success,true,JSON.stringify(started));
const scene=c.__registeredScenes.get("konoha_ce_kakashi_masked_interceptor_admin_crossing_v1__scene");
assert(scene,"#469 Story scene was not registered");
const choice=scene.beats.find(row=>row.beatId==="kakashi_choice");
assert(choice);
assert.deepStrictEqual(JSON.parse(JSON.stringify(choice.choices.map(row=>row.label))),[
  "Tell her you remember her.","Ask what she is doing here.","Watch her pass.","Keep moving."
]);
assert(!choice.choices.some(row=>/ATTACK/i.test(row.label)));
assert(scene.beats.some(row=>row.text&&row.text.includes("A small inclination of her head is the only acknowledgement.")),"release-history MI reaction missing");
assert(scene.beats.some(row=>row.speakerName==="HINATA"&&row.text==="She recognised you."),"Hinata exact current-team reaction missing");
assert(scene.beats.some(row=>row.text&&row.text.includes("Obito's eyebrows climb high enough")),"redundant Obito recognition line was not replaced by authored fallback");
const firstTeam=scene.beats.findIndex(row=>row.speakerName==="HINATA"||String(row.text||"").includes("Hinata shifts"));
const secondTeam=scene.beats.findIndex(row=>row.speakerName==="OBITO"||String(row.text||"").includes("Obito's eyebrows"));
assert(firstTeam>=0&&secondTeam>firstTeam,"current-team participant reaction order does not follow committed team order");

// Commit ASK intent through the actual authored choice resolver, then close once.
const ask=choice.choices.find(row=>row.choiceId==="ask_why_here");
const intentResult=ask.consequenceRequests[0].resolve();
assert.strictEqual(intentResult.success,true);
const closure=c.commitFirstLiveCEHotspotClosure46900();
assert.strictEqual(closure.success,true,JSON.stringify(closure));
const records=c.playerData.activityHistory.filter(row=>row&&row.id==="konoha_ce_hotspot_masked_interceptor_admin_crossing::1::shinobi_record");
assert.strictEqual(records.length,1);
const record=records[0];
assert.strictEqual(record.title,"Hokage Administration Crossing");
assert.strictEqual(record.outcome,"Seen leaving Hokage Administration after a document handoff. Administration staff did not challenge her presence.");
assert.strictEqual(record.data.knownPerson,"Masked Interceptor");
assert.strictEqual(record.data.priorConnection,"Previously encountered during the Academy package incident.");
assert.strictEqual(record.data.properName,"Unknown");
assert.strictEqual(record.data.noHiddenTestTruth,true);
assert(!JSON.stringify(record).includes("staged_konoha_test_participant"),"hidden test truth leaked into observer-facing history");
assert(!JSON.stringify(record).toLowerCase().includes("anbu membership"),"ANBU inference leaked into observer-facing history");

const secondClosure=c.commitFirstLiveCEHotspotClosure46900();
assert.strictEqual(secondClosure.success,true);
assert.strictEqual(c.playerData.activityHistory.filter(row=>row&&row.id===record.id).length,1,"reopen/recommit duplicated Shinobi Record history");
const resolution=c.playerData.worldEventRuntime.resolutionByOpportunityId.konoha_ce_kakashi_masked_interceptor_admin_crossing_v1;
assert.strictEqual(resolution.everClosed,true);
assert.strictEqual(resolution.protagonistIntent,"ASK_WHY_SHE_IS_HERE");
assert.strictEqual(resolution.rememberedHistoryFamily,"deliberate_release");
assert.deepStrictEqual(resolution.currentTeamRefs,["academy_kakashi","academy_hinata","academy_obito"]);
gate=c.evaluateFirstLiveCEHotspotEligibility46900();
assert.strictEqual(gate.eligible,false);assert(gate.reasons.includes("hotspot_occurrence_already_resolved"));

// Exact Origin completion boundary capture writes hidden continuity, not activityHistory.
const c2=makeContext();
c2.playerData.phase2ChronicleState.originParticipantContinuity.byStableParticipantId={};
c2.playerData.acquisition.chronicleOrigin={variantId:"academy_kakashi",prologueCompleted:false};
c2.__activeKakashiState={
  participants:{MI:{state:"RELEASED",disposition:"RELEASE",lethalIntent:false}},
  battles:{mi_stop:{outcome:"victory",encounterId:"academy_kakashi_origin_battle_mi_1v1"}},
  terminal:{hiddenTestReviewReached:true}
};
c2.playerData.storySceneRuntime.active={instanceId:"origin-live-469",sceneId:"academy_kakashi_v2_origin",localContext:{},processedConsequenceKeys:[],committedChoiceKeys:[]};
const beforeHistory=c2.playerData.activityHistory.length;
const completed=c2.completeChronicleOriginPrologue("academy_kakashi",["qa469"]);
assert.strictEqual(completed.success,true);
const captured=c2.playerData.phase2ChronicleState.originParticipantContinuity.byStableParticipantId.academy_kakashi_origin_masked_interceptor;
assert(captured,"Origin completion did not capture participant continuity");
assert.strictEqual(captured.fieldDispositionState,"RELEASED");
assert.strictEqual(captured.hiddenPostTestReviewReached,true);
assert.strictEqual(captured.protagonistKnowsTestTruth,false);
assert.strictEqual(captured.rememberedHistoryFamily,"deliberate_release");
assert.strictEqual(c2.playerData.activityHistory.length,beforeHistory,"hidden continuity capture leaked into observer-facing activityHistory");

console.log(JSON.stringify({
  pass:true,issue:469,
  sevenHistoryFamilies:true,
  killedTerminal:true,
  unseenBlocked:true,
  historicalCustodyNotCurrentUnavailability:true,
  laterUnavailabilityBlocks:true,
  exactCurrentTeam:true,
  participantFirstReactionPlan:true,
  exactFourChoices:true,
  attackAbsent:true,
  observerSafeSingleRecord:true,
  hiddenContinuityOutsideActivityHistory:true,
  finiteNoRerollClosure:true,
  browserGoldenClaimed:false
},null,2));
