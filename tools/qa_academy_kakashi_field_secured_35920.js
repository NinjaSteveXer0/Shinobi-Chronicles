#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
function load(rel){vm.runInThisContext(fs.readFileSync(path.resolve(process.cwd(),rel),"utf8"),{filename:rel});}

const SCENE="origin_academy_kakashi_anbu_retrieval";
const MI="academy_kakashi_origin_masked_interceptor";
const PS="academy_kakashi_origin_package_smuggler";
const AMT="academy_kakashi_origin_amt";
const PAKKUN="pakkun_origin_unfamiliar_ninken";
const PACKAGE="kakashi_origin_outer_route_packet";
const TERMINAL="kak_seq_debrief_pending";

globalThis.playerData={};
globalThis.savePlayerData=()=>true;
load("runtime/alpha-story-decision-realisation-34000.js");

const store=new Map();
globalThis.SC_ALPHA_ORIGIN_32900={
 commitOccurrence(originId,occurrenceId,fact,links,meta){
  if(store.has(occurrenceId))return{success:true,idempotent:true,record:store.get(occurrenceId)};
  const row={originId,occurrenceId,fact,links,meta};store.set(occurrenceId,row);return{success:true,record:row};
 },
 findOccurrence(id){return store.get(String(id||""))||null;}
};
globalThis.SC_ALPHA_KAKASHI_TERMINAL_DEBRIEF_35100={patchId:"qa-terminal"};

const definition={sceneId:SCENE,beatMap:new Map([[TERMINAL,{beatId:TERMINAL,mode:"narration"}]])};
let active={sceneId:SCENE,instanceId:"qa-field-secured",beatId:"qa-entry",localContext:{},battleResume:null};
globalThis.getStorySceneDefinition=id=>id===SCENE?definition:null;
globalThis.getActiveStorySceneRuntime=()=>active;

load("runtime/alpha-kakashi-field-secured-35920.js");
const MOD=globalThis.SC_ALPHA_KAKASHI_FIELD_SECURED_35920;
assert(MOD,"35920 module missing");
let diag=globalThis.runAcademyKakashiFieldSecured35920Diagnostics();
assert.strictEqual(diag.pass,true,"35920 diagnostics failed: "+JSON.stringify(diag.failed));

// Package is independently secured to Kakashi before collection starts.
let mat=globalThis.SC_STORY_DECISION_REALISATION_34000.recordMaterialState({
 storyUnitRef:"academy_kakashi",materialRef:PACKAGE,resolved:true,stateRef:"qa-package",
 value:{currentHolderClass:"KAKASHI",custodyClass:"KAKASHI",locationClass:"KAKASHI_PERSON"}
});
assert.strictEqual(mat.success,true);

// MI restraint is an immediate Story fact, not a hidden Battle-control check.
let out=MOD.commitFieldSecured(MI,{sourceOccurrenceId:"qa-mi-battle",locationRef:"KAKASHI_SAKURA_TREE_FIGHT_LOCATION"});
assert.strictEqual(out.success,true);
assert.strictEqual(out.stateClass,"FIELD_SECURED_PENDING_COLLECTION");
let snap=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(snap.participantStates[MI].stateClass,"FIELD_SECURED_PENDING_COLLECTION");
let row=store.get(out.occurrenceId);
assert.strictEqual(row.fact.participantState.restraintSkillId,"academy_kakashi_wire_snare");
assert.strictEqual(row.fact.participantState.physicalMethod,"ninja wire");
assert.strictEqual(row.fact.participantState.noPassiveEscapeTimer,true);
assert.strictEqual(row.fact.participantState.noHiddenRestraintReroll,true);
assert.strictEqual(row.fact.worldFacts.pursuitTimingPenaltyAdded,false);

// PS can be independently restrained later. Identity is preserved.
out=MOD.commitFieldSecured(PS,{sourceOccurrenceId:"qa-ps-battle",locationRef:"KAKASHI_PS_ALT_NIGHT_STREET"});
assert.strictEqual(out.success,true);
assert.deepStrictEqual(MOD.fieldSecuredRefs(),[MI,PS]);

// Final AMT live-capture boundary starts a manifest and makes AMT active escort.
out=MOD.beginCollectionFromAmt({sourceOccurrenceId:"qa-amt-battle"});
assert.strictEqual(out.success,true,"collection manifest failed: "+JSON.stringify(out));
assert(out.manifestId);
snap=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(snap.participantStates[AMT].stateClass,"COLLECTED_ACTIVE_ESCORT");
assert.deepStrictEqual(MOD.fieldSecuredRefs(),[MI,PS]);
assert.deepStrictEqual(MOD.escortRefs(),[AMT]);

// Collection visits exact still-secured participants; no numeric captive source truth.
active.beatId=MOD.beats.collectPs;
out=MOD.commitCollected(PS,active.localContext.kakashiKonohaCollectionManifestId);
assert.strictEqual(out.success,true);
assert.strictEqual(out.participantRef,PS);
active.localContext.kakashiKonohaCollectionPsOccurrenceId=out.occurrenceId;
snap=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
assert.strictEqual(snap.participantStates[PS].stateClass,"COLLECTED_ACTIVE_ESCORT");

active.beatId=MOD.beats.collectMi;
out=MOD.commitCollected(MI,active.localContext.kakashiKonohaCollectionManifestId);
assert.strictEqual(out.success,true);
assert.strictEqual(out.participantRef,MI);
active.localContext.kakashiKonohaCollectionMiOccurrenceId=out.occurrenceId;
assert.deepStrictEqual(MOD.fieldSecuredRefs(),[]);
assert.deepStrictEqual(MOD.escortRefs(),[MI,PS,AMT]);

// One group intent -> one parent transaction + one exact custody child per person.
active.beatId=MOD.beats.groupAnbuHandoff;
out=MOD.commitGroupTransfer("ANBU");
assert.strictEqual(out.success,true,"ANBU group transfer failed: "+JSON.stringify(out));
assert.strictEqual(out.childOccurrenceIds.length,3);
assert.strictEqual(new Set(out.childOccurrenceIds).size,3);
snap=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
for(const ref of [MI,PS,AMT])assert.strictEqual(snap.participantStates[ref].stateClass,"ANBU_INSTITUTIONAL_CUSTODY");
assert.strictEqual(snap.participantStates[PAKKUN].stateClass,"DEPARTED");
assert.strictEqual(snap.materialStates[PACKAGE].value.custodyClass,"ANBU");
for(const childId of out.childOccurrenceIds){
 const child=store.get(childId);assert(child&&child.fact&&child.fact.parentTransferOccurrenceId===out.parentOccurrenceId,"group child missing parent provenance");
}

// Police uses the same atomic shape but still commits each participant separately.
for(const ref of [MI,PS,AMT]){
 globalThis.SC_STORY_DECISION_REALISATION_34000.recordParticipantClassification({storyUnitRef:"academy_kakashi",participantRef:ref,stateClass:"COLLECTED_ACTIVE_ESCORT",resultRef:"qa-recollect-"+ref});
}
active={sceneId:SCENE,instanceId:"qa-field-secured-police",beatId:MOD.beats.groupPoliceHandoff,localContext:{kakashiKonohaCollectionManifestId:"qa-police-manifest",kakashiKonohaPakkunPresent:true},battleResume:null};
out=MOD.commitGroupTransfer("UCHIHA_POLICE");
assert.strictEqual(out.success,true,"Police group transfer failed: "+JSON.stringify(out));
assert.strictEqual(out.childOccurrenceIds.length,3);
snap=globalThis.SC_STORY_DECISION_REALISATION_34000.getStoryUnitSnapshot("academy_kakashi");
for(const ref of [MI,PS,AMT])assert.strictEqual(snap.participantStates[ref].stateClass,"UCHIHA_POLICE_INSTITUTIONAL_CUSTODY");
assert.strictEqual(snap.participantStates[PAKKUN].stateClass,"DEPARTED");

diag=globalThis.runAcademyKakashiFieldSecured35920Diagnostics();
assert.strictEqual(diag.pass,true);

console.log("Academy Kakashi field-secured / collection 35920 QA: PASS");
console.log("- MI and PS restraint commit FIELD_SECURED_PENDING_COLLECTION with Wire Snare, exact locations, no passive reroll and no pursuit-time penalty");
console.log("- AMT collection boundary creates COLLECTED_ACTIVE_ESCORT without collapsing earlier captives into a count");
console.log("- PS and MI are collected individually only from current field-secured truth");
console.log("- ANBU and Police group intents create one parent plus one institutional-custody child per exact captive");
console.log("- Pakkun departure is explicit and package custody remains a separate material fact");
console.log("- Browser Golden is intentionally NOT claimed by this headless harness");
